import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    },
    reducers: {
        UPDATE_PRODUCTS: (state, action) => {
            // console.log(action.products);
            state.products = [...action.products];
            console.log(state.products);
        },
        ADD_TO_CART: (state, action) => {
            state.cartOpen = true;
            state.cart.push(action.product);
        },
        ADD_MULTIPLE_TO_CART: (state, action) => {
            state.cart.push(...action.products);
        },
        UPDATE_CART_QUANTITY: (state, action) => {
            state.cartOpen = true;
            state.cart = state.cart.map(product => {
                if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity
                }
                return product
            })
        },
        REMOVE_FROM_CART: (state, action) => {
            state.cart = state.cart.filter(product => {
                return product._id !== action._id;
            });
            state.cartOpen = state.cart.length > 0;
        },
        CLEAR_CART: (state, action) => {
            state.cartOpen = false;
            state.cart = [];
        },
        TOGGLE_CART: (state, action) => {
            state.cartOpen = !state.cartOpen;
        },
        UPDATE_CATEGORIES: (state, action) => {
            state.categories = [...action.categories];
        },
        UPDATE_CURRENT_CATEGORY: (state, action) => {
            state.currentCategory = action.currentCategory;
        },
        default: (state) => {return state},
    },
})

export const {  
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
    TOGGLE_CART
} = productSlice.actions;

export default productSlice.reducer;