import "./currentWeather.css";
import direction from "../Assets/direction.png";

function CurrentWeather({ data }) {
  const formattedTime = (time) => {
    let t = new Date(time * 1000).toLocaleTimeString("default");
    return t;
  };

  return (
    <div className="weather-container">
      <div className="mainitem">
        <div className="mainitem-info">
          <h3>{data.city}</h3>
          <div className="temp">
            <h1>{Math.round(data.main.temp)}°C</h1>
            <span> Min {Math.round(data.main.temp_min)}°C</span>
          </div>
          <div>feels like {Math.round(data.main.feels_like)}°C</div>
        </div>

        <div className="icon-container">
          <img src={`${data.weather[0].icon}.png`} alt="icon" />
          <div>{data.weather[0].description}</div>
        </div>
      </div>

      <div className="subitems">
        <div className="items pressure">
          <div className="items-title">Pressure</div>
          {data.main.pressure}mb
        </div>
        <div className="items visibility">
          <div className="items-title">Visibility</div>
          {data.visibility / 1000}km
        </div>
        <div className="items humadity">
          <div className="items-title">Humadity</div>
          {data.main.humidity}%
        </div>
        <div className="items Sun">
          <div className="items-title">Sunrise</div>
          {formattedTime(data.sys.sunrise)}
        </div>
        <div className="items Sun">
          <div className="items-title">SunSet</div>
          {formattedTime(data.sys.sunset)}
        </div>
        <div className=" items wind-direction">
          <div className="items-title">Wind Speed</div>
          <div className="items-direction">
            <img
              className="direction"
              src={direction}
              style={{ transform: `rotate(${data.wind.deg}deg)` }}
            />
            {data.wind.speed} miles/h
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
