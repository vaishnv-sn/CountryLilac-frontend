import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../constants/axios";

const CountryPage = () => {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        console.log(cca3);

        const res = await instance.get(`/api/country/${cca3}`);
        console.log(res.data);

        setCountry(res.data);
      } catch (error) {
        console.error("Error fetching country data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [cca3]);

  if (loading) return <h2>Loading country details...</h2>;
  if (!country) return <h2>Country not found!</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{country.name.common}</h1>
      <img
        src={country.flags.png}
        alt={country.name.common}
        className="w-40 my-4"
      />
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      <p>
        <strong>Subregion:</strong> {country.subregion}
      </p>
      <p>
        <strong>Population:</strong> {country.population.toLocaleString()}
      </p>
      <p>
        <strong>Timezones:</strong> {country.timezones.join(", ")}
      </p>
    </div>
  );
};

export default CountryPage;
