import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Route {
  routes:string[],
  route_internal?:string,
  name_route?:string
  

}

const initialState: Route = {
    routes: [],
    route_internal:"",
    name_route:""
    
};

const RouteSlice = createSlice({
  name: "RouteStore",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Route>) => {
      return {
        ...state,
        ...action.payload,
        
      };
    },
    resetRoute: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export default RouteSlice.reducer;

export const { setRoute, resetRoute } = RouteSlice.actions;