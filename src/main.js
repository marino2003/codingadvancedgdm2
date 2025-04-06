import { updateCityTemperatures } from './aarde.js';

const apiKey = import.meta.env.VITE_WEER_API;
const steden = ["Parijs", "Tokyo", "New York", "Kaapstad", "Buenos Aires"];

async function fetchWeather(stad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${stad}&appid=${apiKey}&units=metric`;
    console.log("Fetching:", url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} for ${stad}`);
        }
        const json = await response.json();
        return { name: stad, temp: Math.round(json.main.temp) };
    } catch(error) {
        console.error("Fout bij ophalen weerdata voor", stad, ":", error);
        return { name: stad, temp: null };
    }
}

async function loadAllWeatherData() {
    console.log("Loading all weather data...");
    const weatherResults = await Promise.all(steden.map(stad => fetchWeather(stad)));
    const validWeatherData = weatherResults.filter(data => data.temp !== null);
    updateCityTemperatures(validWeatherData);
    console.log("Weather data passed to aarde.js");
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllWeatherData);
} else {
    loadAllWeatherData();
}

export { fetchWeather };
console.log("main.js loaded");