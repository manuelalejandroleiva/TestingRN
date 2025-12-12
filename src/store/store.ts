import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import RouteSlice from "./Route.store";



export const store = configureStore({
    reducer: {
        RouteSlice,
        
     
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