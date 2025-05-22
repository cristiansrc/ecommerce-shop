/* eslint-disable import/no-anonymous-default-export */
export default {
    product: {
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
    },
    products: [],
    isFetchingGetProducts: false,
    isSuccessGetProducts: false,
    isErrorGetProducts: false,
    isFetchingGetProduct: false,
    isSuccessGetProduct: false,
    isErrorGetProduct: false,
}