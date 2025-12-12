import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Bank {
  id:number| string
  

}

const initialState: Bank = {
   id:0
    
};

const BanckSlice = createSlice({
  name: "BankStore",
  initialState,
  reducers: {
    setBank: (state, action: PayloadAction<Bank>) => {
      return {
        ...state,
        ...action.payload,
        
      };
    },
    resetBanck: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export default BanckSlice.reducer;

export const { setBank, resetBanck } = BanckSlice.actions;