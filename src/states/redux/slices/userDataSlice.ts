import { createSlice } from "@reduxjs/toolkit"
import { fetchUserBalance } from "../thunk/userBalanceTHunks";

interface UserState {
    userBalance: number;
    userBalanceLoading: boolean;
    userBalanceError: string | null;
}

const initialState: UserState = {
    userBalance: 0,
    userBalanceLoading: false,
    userBalanceError: null,
};

const userDataSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
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

export default userDataSlice.reducer;
