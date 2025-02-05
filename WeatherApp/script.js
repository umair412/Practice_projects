let body = document.querySelector("body");
let dateData = new Date();
let city = document.querySelector(".city");
let temperature = document.querySelectorAll(".temp");
let extraInfo = document.querySelectorAll(".extra-info");
let condition = document.querySelectorAll(".condition");
let nextDay = document.querySelectorAll(".next-day");
let nextTemp = document.querySelectorAll(".next-temp");
let nextCondition = document.querySelectorAll(".next-condition");
let searchBox = document.querySelector("#search");
let searchBtn = document.querySelector("#search-btn");
let suggestionBox = document.querySelector(".suggestion-box");
let currentTime = document.querySelector(".time");
let feelsLike = document.querySelector(".feels-like");
let hourTIme = document.querySelectorAll(".hour-time");
let hourTemp = document.querySelectorAll(".hour-temp");
let hourCondition = document.querySelectorAll(".hour-condition");

setTimeout(() => {
    body.style.display = "flex";
}, 1000);
let address;
let apiKey = "de35d613bbfd40e98e0191854252201";

let date = dateData.getDate();
let month = dateData.getMonth();
let year = dateData.getFullYear();
let day = dateData.getDay();

let currentDate = document.querySelector(".date");

currentDate.innerText = `${date}/${month + 1}/${year}`;

async function success(cityName) {
    address = cityName;
    let weatherApi = `https://api.weatherapi.com/v1/current.json?q=${address}&aqi=yes&key=${apiKey}`;
    city.innerText = "Loading...";
    let result = await fetch(weatherApi);
    let finalResult = await result.json();
    city.innerText = address;
    for (let i = 0; i < 2; i++) {
        temperature[i].innerText = `${Math.round(finalResult.current.temp_c)}°`;

        extraInfo[i].innerHTML = `<i class="fa-solid fa-wind"></i> ${finalResult.current.wind_kph} km/h<br />
    <i class="fa-solid fa-droplet humidity"></i> ${finalResult.current.humidity}%`;

        condition[i].innerText = finalResult.current.condition.text;
    }

    feelsLike.innerText = `Feels like ${Math.round(finalResult.current.feelslike_c)}°`;
    nextDaysWeather();
}
async function nextDaysWeather() {
    for (let i = 0; i < 5; i++) {
        let newDate = new Date();
        newDate.setDate(newDate.getDate() + i + 1);

        let nextDate = newDate.getDate();
        let nextMonth = newDate.getMonth();
        let nextYear = newDate.getFullYear();

        let newNextDay = (day + i) % 7;
        let daysArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        let forecastApi = `https://api.weatherapi.com/v1/forecast.json?q=${address}&dt=${nextYear}-${nextMonth + 1}-${nextDate}&key=${apiKey}`;
        let forecastResult = await fetch(forecastApi);
        let finalForecastResult = await forecastResult.json();
        nextDay[i].innerText = `${daysArray[newNextDay]}`;
        nextTemp[i].innerText = `${Math.round(finalForecastResult.forecast.forecastday[0].day.avgtemp_c)}°`;
        nextCondition[i].innerText = finalForecastResult.forecast.forecastday[0].day.condition.text;
    }
}

function searchWeather() {
    address = searchBox.value;
    address = address.charAt(0).toUpperCase() + address.slice(1);
    success(address);
    hourlyWeather(address);
}

async function searchWeatherApi(key) {
    let searchApi = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchBox.value}`;
    let result = await fetch(searchApi);
    let finalResult = await result.json();
    let name = finalResult[0].name;
    let state = finalResult[0].region;
    let country = finalResult[0].country;
    let id = finalResult[0].id;
    if (id != "") {
        suggestionBox.style.display = "flex";
        suggestionBox.innerHTML = `<button class="suggested-city"><strong class="btn-city">${name}</strong> <br />${name}, ${state}, ${country}</button>`;
        console.log(finalResult);
        let suggestedCityBtn = document.querySelector(".suggested-city");
        suggestedCityBtn.addEventListener("click", () => {
            success(name);
            hourlyWeather(name);
            suggestionBox.style.display = "none";
            searchBox.value = "";
        });
    }
    if (key === "Backspace" || key === "Delete") {
        suggestionBox.style.display = "none";
    }
    if (key === "Enter") {
        searchWeather();
        searchBox.value = "";
        suggestionBox.style.display = "none";
    }
}
searchBox.addEventListener("keyup", (e) => {
    searchWeatherApi(e.key);
});
searchBtn.addEventListener("click", searchWeather);

async function IPLookUp() {
    let ipApi = `https://api.weatherapi.com/v1/ip.json?q=auto:ip&key=${apiKey}`;
    let result = await fetch(ipApi);
    let finalResult = await result.json();
    let city = finalResult.region;

    success(city);
    hourlyWeather(city);
}
IPLookUp();

setInterval(displayTime, 1000);
function displayTime() {
    const date = new Date();
    let time = date.toLocaleTimeString();
    currentTime.innerText = time;
}
async function hourlyWeather(city) {
    let date = new Date();
    let hour = date.getHours();
    let nextHour;
    for (let i = 0; i < 6; i++) {
        if (hour + i + 1 == 24) {
            nextHour = 0;
        } else if (hour + i + 1 > 24) {
            nextHour++;
        } else {
            nextHour = hour + i + 1;
        }
        let hourlyApi = `https://api.weatherapi.com/v1/forecast.json?q=${city}&hour=${nextHour}&key=${apiKey}`;
        let result = await fetch(hourlyApi);
        let finalResult = await result.json();
        if (nextHour < 12) {
            hourTIme[i].innerText = `${nextHour} AM`;
        } else if (nextHour === 12) {
            hourTIme[i].innerText = `${nextHour} PM`;
        } else if (nextHour > 12) {
            hourTIme[i].innerText = `${nextHour - 12} PM`;
        } else if (nextHour === 0) {
            hourTIme[i].innerText = `12 AM`;
        }
        hourTemp[i].innerText = `${Math.round(finalResult.forecast.forecastday[0].hour[0].temp_c)}°`;
        hourCondition[i].innerText = finalResult.forecast.forecastday[0].hour[0].condition.text;
    }
}
