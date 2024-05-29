import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stockPrices: [],
  stockDetails: {},
};

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setStockPrices(state, action) {
      state.stockPrices = action.payload;
    },
    addStockPrices(state, action) {
      state.stockPrices = [...state.stockPrices, ...action.payload];
    },
    setStockDetails(state, action) {
      state.stockDetails[action.payload.symbol] = action.payload.data;
    },
  },
});

export const { setStockPrices, addStockPrices, setStockDetails } =
  stockSlice.actions;

export default stockSlice.reducer;
