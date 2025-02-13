import { configureStore } from "@reduxjs/toolkit";
import countrySlice from "./countriesSlice";

const store = configureStore({
  reducer: {
    countryData: countrySlice,
  },
});

export default store;
