import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderState = {
  flowerId: string;
  flowerName: string;
  price: number;
  quantity: number;
  deliveryDate: string;
  address: string;
  phone: string;
  totalPrice: number;
};

const initialState: OrderState = {
  flowerId: "",
  flowerName: "",
  price: 0,
  quantity: 1,
  deliveryDate: "",
  address: "",
  phone: "",
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {

    setFlower(state, action: PayloadAction<{id:string,name:string,price:number}>) {
      state.flowerId = action.payload.id;
      state.flowerName = action.payload.name;
      state.price = action.payload.price;
      state.totalPrice = state.price * state.quantity;
    },

    setQuantity(state, action: PayloadAction<number>) {
      state.quantity = action.payload;
      state.totalPrice = state.price * state.quantity;
    },

    setDeliveryDate(state, action: PayloadAction<string>) {
      state.deliveryDate = action.payload;
    },

    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },

    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },

    resetOrder() {
      return initialState;
    }

  },
});

export const {
  setFlower,
  setQuantity,
  setDeliveryDate,
  setAddress,
  setPhone,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;