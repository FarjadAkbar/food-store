// store/slices/checkoutSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutDetails {
  email: string;
  address: string;
  phone: string;
}

interface CheckoutState {
  details: CheckoutDetails | null;
}

const initialState: CheckoutState = {
  details: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutDetails(state, action: PayloadAction<CheckoutDetails>) {
      state.details = action.payload;
    },
    clearCheckoutDetails(state) {
        state.details = null;
      },
  },
});

export const { setCheckoutDetails, clearCheckoutDetails } = checkoutSlice.actions;
export default checkoutSlice.reducer;
