
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Instance {
  instance:number
  

}

const initialState: Instance = {
    instance:0
    
};

const InstanceSlice = createSlice({
  name: "InstanceStore",
  initialState,
  reducers: {
    setInstance: (state, action: PayloadAction<Instance>) => {
      return {
        ...state,
        ...action.payload,
        
      };
    },
    resetInstance: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export default InstanceSlice.reducer;

export const { setInstance, resetInstance } = InstanceSlice.actions;