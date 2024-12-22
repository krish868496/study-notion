import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItem: localStorage.getItem("totalItem")
    ? JSON.parse(localStorage.getItem("totalItem"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    //add to cart
    addToCart: (state, action) => {
      console.log(state)
      console.log(action)
      const course = action.payload;
      console.log(course)
      const index = state.cart.findIndex((c) => c?._id === course?._id);
      if (index >= 0) {
        // if course is already in the cart do not modify the quantity
        toast.error("Course already added to the cart");
        return;
      }
      // if the course is not in the cart, add it to the cart
      state.cart.push(course);
      state.totalItem++;
      state.total = course.price;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItem", JSON.stringify(state.totalItem));
      toast.success("Course added to cart");
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((c) => c._id === courseId);
      console.log(index)
      if (index >= 0) {
        state.cart.splice(index, 1);
        state.total -= state.cart[index].price;
        state.totalItem--;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setTotalItems: (state, value) => {
      state.user = value.payload;
    },

    //remove from cart
    //resetCart
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItem = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItem");
    },
  },
});
export const { setTotalItems, removeFromCart, resetCart, addToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
