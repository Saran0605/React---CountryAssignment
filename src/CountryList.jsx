import Flag from "./assets/flag.jpeg"
import { useNavigate } from "react-router-dom";
//Card component for every country
function CountryList({flags,name,currency,timezones}){
    const navigate = useNavigate();
//View map functionality
    function openMap(name){
        console.log("map");
        const url = `https://www.google.com/maps/search/?api=1&query=${name}`;
        window.open(url,"_blank");
    }
    return (
        <div className="cList">
        <div className="outer-box">
            <img src={flags} alt="" />
            <div className="text-cont">
              <h2 id="cname">{name}</h2>
              <p>Currency : {currency}</p>
              <p>Current date and time : {timezones}</p>
              <button type="button" onClick={()=>openMap(name)}  className="btn map">Show Map</button>
              <button type="button" onClick={()=>navigate("/detail",{state:{cname:name}})} className="btn detail">Detail</button>
            </div>
        </div>
        </div>

    );
}
export default CountryList;