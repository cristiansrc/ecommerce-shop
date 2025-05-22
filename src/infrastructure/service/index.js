import productSaga from './product';
import categorySaga from './category';
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(productSaga);
    yield fork(categorySaga);
}