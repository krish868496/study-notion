import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

const initialState = {
        totalItem: localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItem")) : 0
}

const cartSlice = createSlice({
        name: "cart",
        initialState: initialState,
        reducers: {
                setTotalItems: (state, value) => {
                        state.user = value.payload
                }
                //add to cart
                //remove from cart
                //resetCart
        }

})
export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;