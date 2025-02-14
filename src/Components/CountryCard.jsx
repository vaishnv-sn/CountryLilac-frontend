import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CountryCard.css";

const CountryCard = ({ country }) => {
  const { name, flags, region, timezones, cca3 } = country;
  const [localTime, setLocalTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      try {
        if (!timezones || timezones.length === 0) {
          setLocalTime("N/A");
          return;
        }

        const offsetString = timezones[0]?.replace("UTC", "").trim();
        if (!offsetString) {
          setLocalTime("N/A");
          return;
        }

        const [hours, minutes = "0"] = offsetString.includes(":")
          ? offsetString.split(":").map(Number)
          : [Number(offsetString), 0];

        const now = new Date();
        now.setUTCHours(now.getUTCHours() + hours);
        now.setUTCMinutes(now.getUTCMinutes() + minutes);

        setLocalTime(
          now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
      } catch (error) {
        console.error("Error calculating local time:", error);
        setLocalTime("Error");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [timezones]);

  return (
    <div
      className="bg-white shadow-md country-card rounded-lg p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/country/${cca3}`)}
    >
      <img src={flags.png} alt={name.common} className="w-20 h-12 rounded" />
      <h2 className="text-lg font-semibold mt-2">{name.common}</h2>
      <p className="text-sm text-gray-600">{region}</p>
      <p className="text-sm font-medium mt-1">🕒 {localTime || "Loading..."}</p>
    </div>
  );
};

export default CountryCard;
