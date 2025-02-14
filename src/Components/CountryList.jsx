import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import CountryCard from "./CountryCard";
import { fetchCountries } from "../Redux/countriesSlice";
import SearchComponent from "./SearchComponent";

const CountryList = () => {
  const dispatch = useDispatch();
  const { filteredCountries, loading } = useSelector(
    (state) => state.countries
  );

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const loadMoreCountries = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    if (filteredCountries.length <= nextPage * limit) {
      setHasMore(false);
    }
  };

  const displayedCountries = filteredCountries.slice(0, page * limit);

  return (
    <div>
      <SearchComponent />
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <InfiniteScroll
          dataLength={displayedCountries.length}
          next={loadMoreCountries}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {displayedCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default CountryList;
