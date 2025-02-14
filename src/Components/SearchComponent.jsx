import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchParams } from "../Redux/countriesSlice";
import "./SearchComponent.css";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState({
    name: "",
    capital: "",
    region: "",
    timezone: "",
  });

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    dispatch(setSearchParams(query));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        name="name"
        placeholder="Country Name"
        value={query.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="capital"
        placeholder="Capital"
        value={query.capital}
        onChange={handleChange}
      />
      <input
        type="text"
        name="region"
        placeholder="Region"
        value={query.region}
        onChange={handleChange}
      />
      <input
        type="text"
        name="timezone"
        placeholder="Timezone"
        value={query.timezone}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
