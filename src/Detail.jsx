import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Detail() {
  const location = useLocation();
  const name = location.state?.cname || "null";
  const [detail, setDetail] = useState(null);
  const [borders, setBorders] = useState([]);
  const [flags, setFlags] = useState([]);
//function to fetch country detail
  async function fetchCountryByName() {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );
      const data = await res.json();
      setDetail(data[0]);
      setBorders(data[0].borders || []);
    } catch (err) {
      console.error("Error fetching country:", err);
    }
  }
//function to fetch flags of border countries
  async function fetchFlags(borderCodes) {
    if (!borderCodes.length) return; 
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`
      );
      const data = await res.json();
      const flagUrls = data.map((c) => c.flags.png);
      setFlags(flagUrls);
    } catch (err) {
      console.error("Error fetching border flags:", err);
    }
  }
//will be run at inital to fetch country detail
  useEffect(() => {
    fetchCountryByName();
  }, []);
//when state variable borders is updated , the function will fetch out neighbour countries
  useEffect(() => {
    if (borders.length > 0) {
      fetchFlags(borders);
    }
  }, [borders]);

  return (
    <>
      {detail ? (
        <>
          <div className="outer">
            <div className="img">
              <h2>{detail.name?.common}</h2>
              <img src={detail.flags.png} alt={detail.name?.common} />
            </div>
            <div className="text-det">
              
              <p>
                <b>Native Name:</b>{" "}
                {Object.values(detail.name?.nativeName || {})[0]?.common}
              </p>
              <p>
                <b>Capital:</b> {detail.capital?.[0]}
              </p>
              <p>
                <b>Population:</b> {detail.population?.toLocaleString()}
              </p>
              <p>
                <b>Region:</b> {detail.region}
              </p>
              <p>
                <b>Sub-region:</b> {detail.subregion}
              </p>
              <p>
                <b>Area:</b> {detail.area?.toLocaleString()} km²
              </p>
              <p>
                <b>Country Code:</b> {detail.cca2}
              </p>
              <p>
                <b>Languages:</b>{" "}
                {Object.values(detail.languages || {}).join(", ")}
              </p>
              <p>
                <b>Currencies:</b>{" "}
                {Object.values(detail.currencies || {})
                  .map((c) => c.name + " (" + c.symbol + ")")
                  .join(", ")}
              </p>
              <p>
                <b>Timezones:</b> {detail.timezones?.join(", ")}
              </p>
            </div>
          </div>

         <div className="borders">
  <h3>Neighbour Countries</h3>
  <div className="border-flags">
    {flags.length > 0 ? (
      flags.map((img, idx) => (
        <img key={idx} src={img} alt="border flag" />
      ))
    ) : (
      <h2>No border countries</h2>
    )}
  </div>
</div>

        </>
      ) : (
        <h1>Loading.....</h1>
      )}
    </>
  );
}

export default Detail;
