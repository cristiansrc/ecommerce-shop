import { createAction, createSlice } from '@reduxjs/toolkit';
import initialState from './../../domain/entities/category';


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getCategoriesPending: (state) => {
            state.isFetchingGetCategories = true;
            state.isSuccessGetCategories = false;
            state.isErrorGetCategories = false;
        },
        getCategoriesSuccess: (state, { payload }) => {
            state.isFetchingGetCategories = false;
            state.isSuccessGetCategories = true;
            state.isErrorGetCategories = false;
            state.categories = payload;
        },
        getCategoriesError: (state) => {
            state.isFetchingGetCategories = false;
            state.isSuccessGetCategories = false;
            state.isErrorGetCategories = true;
        },
        reset: () => initialState,
    },
});

export default categorySlice.reducer;
export const categoryActions = {
    ...categorySlice.actions,
    getCategories: createAction('category/getCategories'),
};