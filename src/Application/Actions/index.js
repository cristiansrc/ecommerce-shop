/* eslint-disable import/no-anonymous-default-export */
import { combineReducers } from '@reduxjs/toolkit';
import product from './../../Application/Actions/product'
import category from './../../Application/Actions/category';
import cartSlice from './../../Features/Cart/cartSlice'
import wishListSlice from './../../Features/Wishlist/wishListSlice'

export default {
    entities: combineReducers({
        product,
        category,
    }),
    cart: cartSlice,
    wishlist: wishListSlice,
}
