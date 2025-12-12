import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import RouteSlice from "./Route.store";
import BanckSlice from "./bankaccount.store";


export const store = configureStore({
    reducer: {
        RouteSlice,
        BanckSlice
     
    },
    
  });


  //Export Types
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;