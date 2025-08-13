import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUserBalance } from "../thunk/userBalanceTHunks";

interface ErrorState {
  [key: string]: { message: string };
}

interface UserState {
  userBalance: number;
  userBalanceLoading: boolean;
  userBalanceError: string | null;
  errors: ErrorState;
}

const initialState: UserState = {
  userBalance: 0,
  userBalanceLoading: false,
  userBalanceError: null,
  errors: {},
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<ErrorState>) => {
      state.errors = action.payload;
    },
    addError: (state, action: PayloadAction<{ key: string; message: string }>) => {
      const { key, message } = action.payload;
      state.errors[key] = { message };
    },
    removeError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
    removeErrorByPrefix: (state, action: PayloadAction<string>) => {
      const prefix = action.payload;

      Object.keys(state.errors).forEach((key) => {
        if (key.startsWith(prefix)) delete state.errors[key];
      });
    },
  },
  selectors: {
    checkErrorExists: (state) => (prefix: string) => Object.keys(state.errors).some((key) => key.startsWith(prefix)),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBalance.pending, (state) => {
        state.userBalanceLoading = true;
        state.userBalanceError = null;
      })
      .addCase(fetchUserBalance.fulfilled, (state, action) => {
        state.userBalance = action.payload;
        state.userBalanceLoading = false;
      })
      .addCase(fetchUserBalance.rejected, (state, action) => {
        state.userBalanceLoading = false;
        state.userBalanceError = action.payload || "Unknown error";
      });
  },
});

export const { setErrors, addError, removeError, removeErrorByPrefix } = userDataSlice.actions;

export const { checkErrorExists } = userDataSlice.selectors;

export default userDataSlice.reducer;
