// 853rsbTX80DCkfCo28v9TCD8E94yQ5z9
let body = document.querySelector('body');
let searchVal = document.getElementById('search');
let cardTemp = document.getElementById('card-temp');
let cardHumidity = document.getElementById('card-Humidity');
let cardWind = document.getElementById('card-wind');
let cardPressure = document.getElementById('card-pressure');

let weatherCity = document.querySelector('.weather-city');
let weatherDateTime = document.querySelector('.weather-date-time');
let weatherProperty = document.querySelector('.weather-property');
let weatherIcon = document.querySelector('.weather-icon');
let weatherMin = document.querySelector('.weather-min');
let weatherMax = document.querySelector('.weather-max');
let weatherTemp = document.querySelector('.weather-temp');

let city = "London";

let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    date: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'

}

const backgroud = {
    'Clear': './/images/clear_sky.jpg',
    'few clouds': './/images/few_clouds.jpg',
    'scattered clouds': './/images/scattered_clouds.jpg',
    'Clouds': './/images/broken_clouds.jpg',
    'Drizzle': './/images/Thunderstorm.jpg',
    'Rain': './/images/rain.jpg',
    'Thunderstorm': './/images/shower_rain.jpg',
    'Snow': './/images/snow.jpg',
    'Fog': './/images/mist.jpg',
    'Smoke': './/images/smoky.jpg',
    'Haze': './/images/mist.jpg',
    'Sand': './/images/mist.jpg',
    'Dust': './/images/mist.jpg',
    'Ash': './/images/mist.jpg',
    'Squall': './/images/mist.jpg',
}

document.querySelector(".search-form").addEventListener('submit', (e)=>{
    e.preventDefault();
    city = searchVal.value;
    getWeather();
    searchVal.value = "";
})



const getWeather = async () =>{
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=360e693514fe597f43f4c9e3a8d2a756`;
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const {weather, main, wind, dt, sys} = data;

        console.log(weather[0].description);
        let date = new Date(dt*1000);

        document.querySelector('body').style.backgroundImage = `url(${backgroud[weather[0].main]})`;

        weatherCity.innerHTML = `${data.name}, ${new Intl.DisplayNames(['en'], { type: 'region' }).of(sys.country)}`;

        weatherDateTime.innerHTML = `${new Intl.DateTimeFormat("en-US", options).format(date)}&#176;`;

        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].main}">`
        weatherTemp.innerHTML = `${(main.temp - 273.15).toFixed()}&#176;`;
        weatherMin.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed()}&#176;`;
        weatherMax.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed()}&#176;`;
        weatherProperty.innerHTML = `${weather[0].main}`


        cardTemp.innerHTML = `${(main.feels_like - 273.15).toFixed()}&#176;`;
        cardPressure.innerHTML = `${main.pressure} hPa`;
        cardWind.innerHTML = `${wind.speed} m/s`;
        cardHumidity.innerHTML = `${main.humidity}%`;
        
    } catch (error) {
        alert(error.message);
    }
}

document.body.addEventListener('load', getWeather());