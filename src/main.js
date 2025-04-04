import './style.css'
import './reset.css'
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './aarde.js';
import * as THREE from 'three';

//API key en seden const om op te halen
const apiKey = import.meta.env.VITE_WEER_API;
const steden = ["Parijs", "Tokyo", "New York", "Kaapstad", "Buenos Aires"];

async function fetchWeather(stad) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${stad}&appid=${apiKey}&units=metric`;
  console.log(url);

  try {
  const response = await fetch(url);
  const json = await response.json();
  return Math.round(json.main.temp);
  } catch(error) {
    console.log(error);
  }
}

//verschillende steden oproepen
steden.forEach(stad => fetchWeather(stad));

//loader
async function updateWeather() {
  const slides = document.querySelectorAll('.swiper-slide');

  slides.forEach(async (slide, index) => {
    const tempElement = document.createElement('h3');
    tempElement.classList.add('temperatuur');
    tempElement.innerHTML = "🌡️ Laden..."; 
    slide.querySelector('.card-content').appendChild(tempElement);

    const temperatuur = await fetchWeather(steden[index]); 
    tempElement.innerHTML = `🌡️ ${temperatuur}°C`; // Weer tonen
  });
}

//start
updateWeather();


function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


new Swiper('.swiper', {
  modules: [Navigation, Pagination],
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
});

