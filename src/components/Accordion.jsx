import { useState } from "react";
import expand from "../Assets/expand.png";
import chevron from "../Assets/chevron.png";
import direction from "../Assets/direction.png";

import "./Accordion.css";

function Accordion({ data }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (index) => {
    if (index === expandedIndex) setExpandedIndex(-1);
    else setExpandedIndex(index);
  };

  const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayinAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayinAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayinAWeek)
  );

  const renderedList = data.list.slice(0, 7).map((element, index) => {
    const isExpanded = index === expandedIndex;
    const content = isExpanded && (
      <div className="item-content">
          <div className="items pressure">
            <div className="items-title">Pressure</div>
            {element.main.pressure}mb
          </div>
          <div className="items visibility">
            <div className="items-title">Visibility</div>
            {element.visibility / 1000}km
          </div>
          <div className="items humadity">
            <div className="items-title">Humadity</div>
            {element.main.humidity}%
          </div>
          <div className=" items wind-direction">
            <div className="items-title">Wind Speed</div>
            <div className="items-direction">
              <img
                className="direction"
                src={direction}
                style={{ transform: `rotate(${element.wind.deg}deg)` }}
              />
              {element.wind.speed} miles/h
            </div>
          </div>
        </div>
    );
    const icon = (
      <div className="icon">
        {isExpanded ? (
          <img alt="expand" src={expand} />
        ) : (
          <img alt="expand" src={chevron} />
        )}
      </div>
    );
    return (
      <div className="item" key={index}>
        <div className="item-title" onClick={() => handleClick(index)}>
          <label className="item-day">{forecastDays[index]}</label>
          <div className="weekforecast">
            <img className="icon-img" src={`${element.weather[0].icon}.png`} />
            <div className="subitems">{element.weather[0].description}</div>
            <div className="subitems">
              {Math.round(element.main.temp_min)}°C/
              {Math.round(element.main.temp_max)}°C
            </div>
          </div>
          {icon}
        </div>
        {content}
      </div>
    );
  });

  return (
    <div className="accordin-container">
      <div className="accordin-title">Daily Forecast for Next 7 Days</div>
      {renderedList}
    </div>
  );
}

export default Accordion;
