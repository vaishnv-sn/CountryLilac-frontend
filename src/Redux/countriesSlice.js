import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../constants/axios";

const initialState = {
  allCountries: [],
  filteredCountries: [],
  loading: false,
  error: null,
  searchParams: { name: "", capital: "", region: "", timezone: "" },
};

// Async thunk to fetch countries
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/countries`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;

      // Filter countries based on search criteria
      const { name, capital, region, timezone } = action.payload;

      state.filteredCountries = state.allCountries.filter((country) => {
        return (
          (!name ||
            country.name.common.toLowerCase().includes(name.toLowerCase())) &&
          (!capital ||
            country.capital?.some((cap) =>
              cap.toLowerCase().includes(capital.toLowerCase())
            )) &&
          (!region || country.region.toLowerCase() === region.toLowerCase()) &&
          (!timezone ||
            country.timezones?.some(
              (tz) => tz.toLowerCase() === timezone.toLowerCase()
            ))
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.allCountries = action.payload;
        state.filteredCountries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchParams } = countrySlice.actions;
export default countrySlice.reducer;
