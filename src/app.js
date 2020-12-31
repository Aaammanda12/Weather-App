//1
let dateElement = document.querySelector("#currentDate");
let currentTime = new Date();

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
dateElement.innerHTML = `${days[day]}, ${hours}:${minutes}`;

function showWeather(response) {
  let iconElement = document.querySelector("#icon");

  console.log(response.data);
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    celsiusTemperature = response.data.main.temp;
}

function searchLocation(position) {
  let apiKey = "a462ceb6ee02c282038425b601b572b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=position.coords.latitude&lon=position.coords.longitude&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(city) {
  let apiKey = "a462ceb6ee02c282038425b601b572b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
//2
function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  search(city);
}

function displayFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = ((celsiusTemperature * 9) / 5 + 32 );
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);


search("Seattle");