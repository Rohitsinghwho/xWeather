import React, { useState } from 'react'
import "./App.css"


const apikey='07bfd03d006f4ee9bcb41813252808'
const API=`https://api.weatherapi.com/v1/current.json?key=${apikey}`;
const App = () => {
  const [city,setCity]=useState('');
  const [weather,setWeather]=useState(null);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const fetchWeather=async()=>{
    try {
      setLoading(true);
      const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`);
      if(!response.ok){
        alert("Failed to fetch weather data")
      }
      else{
        const data=await response.json();
        setWeather({
          temperature:data.current.temp_c,
          humidity:data.current.humidity,
          windSpeed:data.current.wind_kph,
          condition:data.current.condition.text
        });
        setError("");
      }
    } catch (error) {
      setWeather(null);
    }finally{
      setLoading(false)
    }
  }
 const handleSearch=(e)=>{
  e.preventDefault();
  if(city.trim()){
    fetchWeather();
  }
 }

  return (
    <div className='Main'>  
      <form onSubmit={handleSearch}>
        <div></div>
        <input type='text' value={city} onChange={(e)=>setCity(e.target.value)}/>
        <button type='submit' >Search</button>
      </form>
      {loading&&<p>loading...</p>}
     {weather!==null&&
     (<div className='weather-cards'>
        <div className='weather-card'>
            <span className='heading'>Temperature</span>
            <span className='subheading'>{weather.temperature} C</span>
        </div>
         <div className='weather-card'>
            <span className='heading'>Humidity</span>
            <span className='subheading'>{weather.humidity}</span>
        </div>
         <div className='weather-card'>
            <span className='heading'>Condition</span>
            <span className='subheading'>{weather.condition}</span>
        </div>
         <div className='weather-card'>
            <span className='heading'>WindSpeed</span>
            <span className='subheading'>{weather.windSpeed} kph</span>
        </div>
      </div>)}
    </div>
  )
}

export default App