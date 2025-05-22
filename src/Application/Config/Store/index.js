import { configureStore } from '@reduxjs/toolkit';
import reducers from './../../Actions'
import rootSaga from './../../../infrastructure/service';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableStateInvariant: false,
      thunk: false,
      serializableCheck: {
        ignoredActionPaths: [],
      },
    }).concat(sagaMiddleware),
  reducer: reducers
});

sagaMiddleware.run(rootSaga);

