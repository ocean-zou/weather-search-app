const apikey = "5d50cb77a4d850371ce5a430e31c9b24";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

const getWeatherData=async(cityValue)=>{
    console.log("cityValue",cityValue)
    const url=`${baseUrl}?q=${cityValue}&appid=${apikey}&units=metric`;
    try {
        const response=await fetch(url);
        if(!response.ok){
            throw new Error("Weather data not available");
        }
        const data=await response.json();
        console.log("data",data);
        const temperature=Math.round(data.main.temp);
        const description=data.weather[0].description;
        const icon=data.weather[0].icon;
        const details=[`Feels like: ${Math.round(data.main.feels_like)}°C`,`Humidity: ${data.main.humidity}%`,`Wind speed: ${data.wind.speed}m/s`];
        weatherDataEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weathericon">`;
        weatherDataEl.querySelector(".temperature").textContent=`${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent=description;
        weatherDataEl.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("");
    } catch (error) {
        console.log("error",error);
        weatherDataEl.querySelector('.icon').innerHTML='';
        weatherDataEl.querySelector('.temperature').textContent='';
        weatherDataEl.querySelector('.description').textContent=' An error occurred,please try again later';
        weatherDataEl.querySelector('.details').innerHTML='';
    }
}