import { categoryActions } from "../../Application/Actions/category";
import mscategory from "../agent/mscategory";

import { put, spawn, takeLatest } from 'redux-saga/effects';

function* getCategories() {
    yield put(categoryActions.getCategoriesPending());
    const { data, error } = yield mscategory.get('/');
    if (error.code !== 200) {
        yield put(categoryActions.getCategoriesError(error));
    } else {
        yield put(categoryActions.getCategoriesSuccess(data));
    }
}

function* watchGetCategories() {
    yield takeLatest(categoryActions.getCategories.type, getCategories);
}

export default function* rootSaga() {
    yield spawn(watchGetCategories);
}