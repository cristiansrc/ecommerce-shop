import { productActions } from "./../../Application/Actions/product";
import msproduct from "../agent/msproduct";
import { put, spawn, takeLatest } from 'redux-saga/effects';

function* getProducts({ payload }) {

    let url = '';

    if(payload.categoryId !== 0){
        url += `categoryId=${payload.categoryId}&`;
    }
    
    if(payload.minPrice > 0){
        url += `minPrice=${payload.minPrice}&`;
    }

    if(payload.minPrice > 0 && payload.maxPrice > 0){
        url += `maxPrice=${payload.maxPrice}`;
    }

    const paramsUrl = url !== '' ? `?${url}` : '';

    yield put(productActions.getProductsPending());
    const { data, error } = yield msproduct.get(`/shopping/${payload.gender}${paramsUrl}`);
    
    if (error.code !== 200) {
        yield put(productActions.getProductsError());
    } else {
        yield put(productActions.getProductsSuccess(data));
    }
}

function* getProduct({ payload }) {
    yield put(productActions.getProductPending());
    const { data, error } = yield msproduct.get(`/shopping/id/${payload}`);
    if (error.code !== 200) {
        yield put(productActions.getProductError());
    } else {
        yield put(productActions.getProductSuccess(data));
    }
}

function* watchGetProducts() {
    yield takeLatest(productActions.getProducts.type, getProducts);
}

function* watchGetProduct() {
    yield takeLatest(productActions.getProduct.type, getProduct);
}

export default function* rootSaga() {
    yield spawn(watchGetProducts);
    yield spawn(watchGetProduct);
}
