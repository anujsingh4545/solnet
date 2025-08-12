import { createAsyncThunk } from "@reduxjs/toolkit";
import { LAMPORTS_PER_SOL, PublicKey, Connection } from "@solana/web3.js";

export const fetchUserBalance = createAsyncThunk<
  number,
  { publicKey: PublicKey; connection: Connection },
  { rejectValue: string }
>("user/fetchUserBalance", async ({ publicKey, connection }, { rejectWithValue}) => {
  try {
    const lamports = await connection.getBalance(publicKey);
    return lamports / LAMPORTS_PER_SOL;
  } catch (err) {
    console.error("Failed to fetch balance:", err);
    return rejectWithValue("Failed to fetch balance");
  }
});
