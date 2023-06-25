import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [weather, newWeather] = useState("");
  const [loading, NewLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleOnClick = (event) => {
    event.preventDefault();
    getWeather(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async (location) => {
    try {
      const data = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=0abee3621b254576ade42853232506&q=${location}&aqi=yes`
      );
      if (data.ok) {
        const dataWeather = await data.json();
        NewLoading(true);
        newWeather(dataWeather);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Error fething data", error);
    } finally {
      NewLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Enter Location </h1>
      <form>
        <input type="text" onChange={handleOnChange} />
        <button onClick={handleOnClick}>Submit</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        weather && (
          <div>
            <h2>{weather.location.name}</h2>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
          </div>
        )
      )}
    </div>
  );
}
