import { createSlice } from "@reduxjs/toolkit";

const initialState = { countryDetails: "" };

const countrySlice = createSlice({
  name: "country",
  initialState: initialState,
  reducers: {
    setCountry(state, action) {
      state.countryDetails = action.payload;
    },
  },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
