import { useEffect, useState } from "react";
import CountryList from "./CountryList";

function Country() {
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState("");


  async function fetchCountry() {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,currencies,timezones"
      );
      const data = await res.json();
      setCountry(data);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  const sortedCountries = [...country].sort((a, b) =>
    a.name?.common?.localeCompare(b.name?.common || "") || 0
  );

  const filteredCountries = sortedCountries.filter((c) =>
    (c.name?.common || "").toLowerCase().includes(search.toLowerCase())
  );

  function getTimeFromTimezone(timezone) {
    if (!timezone) return "N/A";

    const tz = Array.isArray(timezone) ? timezone[0] : timezone;
    const match = tz.match(/UTC([+-])(\d{2}):(\d{2})/);
    if (!match) return "N/A";

    const sign = match[1];
    const hoursOffset = parseInt(match[2], 10);
    const minutesOffset = parseInt(match[3], 10);

    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;

    const totalOffsetMs =
      (sign === "+" ? 1 : -1) * (hoursOffset * 60 + minutesOffset) * 60000;
    const localTime = new Date(utc + totalOffsetMs);

    const day = localTime.getDate();
    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const dayWithSuffix = day + getOrdinal(day);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[localTime.getMonth()];
    const year = localTime.getFullYear();

    const hours = String(localTime.getHours()).padStart(2, "0");
    const minutes = String(localTime.getMinutes()).padStart(2, "0");

    return `${dayWithSuffix} ${month} ${year}, ${hours}:${minutes}`;
  }

  return (
    <>
      <div className="cList">
        <h1 className="head-title">Countries</h1>
        <div className="search-container">
          <input
            type="text"
            id="search-val"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search countries"
          />
<span class="material-symbols-outlined search-icon">
search
</span>        </div>
      </div>

      {filteredCountries.map((c, index) => {
        const name = c.name?.common || "N/A";
        const flags = c.flags?.png || "";
        const currency = c.currencies
          ? Object.values(c.currencies)[0]?.name
          : "N/A";
        const timezone = getTimeFromTimezone(c.timezones);

        return (
          <CountryList
            key={index}
            flags={flags}
            name={name}
            currency={currency}
            timezones={timezone}
          />
        );
      })}
    </>
  );
}

export default Country;
