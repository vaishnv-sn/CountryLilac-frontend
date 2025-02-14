import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./countriesSlice";

const store = configureStore({
  reducer: {
    countries: countryReducer,
  },
});

export default store;
