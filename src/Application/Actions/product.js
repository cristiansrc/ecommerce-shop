import { createAction, createSlice } from '@reduxjs/toolkit';
import initialState from './../../domain/entities/product'

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: () => initialState,
        getProductsPending: (state) => {
            state.isFetchingGetProducts = true;
            state.isSuccessGetProducts = false;
            state.isErrorGetProducts = false;
            state.products = [];
        },
        getProductsSuccess: (state, { payload }) => {
            state.isFetchingGetProducts = false;
            state.isSuccessGetProducts = true;
            state.isErrorGetProducts = false;
            state.products = payload;
        },
        getProductsError: (state) => {
            state.isFetchingGetProducts = false;
            state.isSuccessGetProducts = false;
            state.isErrorGetProducts = true;
            state.products = [];
        },
        getProductPending: (state) => {
            state.isFetchingGetProduct = true;
            state.isSuccessGetProducts = false;
            state.isErrorGetProducts = false;
            state.product = {
                id: 0,
                name: '',
                description: '',
                gender: '',
                categoryId: '',
                price: 10000,
                genderName: '',
                categoryName: '',
                productImages: [
                    {
                        id: 0,
                        name: '',
                        image: '',
                        productId: 0
                    }
                ],
            }
        },
        getProductSuccess: (state, { payload }) => {
            state.isFetchingGetProduct = false;
            state.isSuccessGetProduct = true;
            state.isErrorGetProduct = false;
            state.product = payload;
        },
        getProductError: (state) => {
            state.isFetchingGetProduct = false;
            state.isSuccessGetProduct = false;
            state.isErrorGetProduct = true;
            state.product = {
                id: 0,
                name: '',
                description: '',
                gender: '',
                categoryId: '',
                price: 10000,
                genderName: '',
                categoryName: '',
                productImages: [
                    {
                        id: 0,
                        name: '',
                        image: '',
                        productId: 0
                    }
                ],
            }
        },
    },
});

export default productSlice.reducer;
export const productActions = {
    ...productSlice.actions,
    getProducts: createAction('product/getProducts'),
    getProduct: createAction('product/getProduct'),
}