import Accordion from "./components/Accordion";
import CurrentWeather from "./components/currentWeather";
import Search from "./components/search";

import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useState } from "react";
import Footer from "./components/Footer";


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  const formatedBackground =()=>{
    if(currentWeather){
      if(currentWeather.weather[0].icon.includes('n')) return "night-style";
      if(currentWeather.weather[0].icon.includes('d')) return "day-style"
    }
  } 
  // console.log(currentWeather)
  // console.log(forecast)

  return (
    <div className= {`App ${formatedBackground()}`}>
      <div className="Search"><Search onSearchChange={handleOnSearchChange} /></div>
      {currentWeather&&<CurrentWeather data={currentWeather}/>}
      {forecast&&<Accordion data={forecast} />}
      <Footer/>
    </div>
  );
}

export default App;
