import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AlertState {
  message: string | null;
}

const initialState: AlertState = {
  message: null
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    hideMessage: (state) => {
      state.message = null;
    }
  }
});

export const { hideMessage, showMessage } = alertSlice.actions;
export default alertSlice.reducer;
