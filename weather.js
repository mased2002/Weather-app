const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const apiKey = '045e49d76baa6441a82f4cf96620cbd7'
const temp = document.querySelector('.temperature')
const humid =document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const weather = document.querySelector('.weather')
const submit = document.querySelector('#weatherForm button')
const city = document.querySelector('#locationInput')
const cityName = document.createElement("p") 
const container = document.querySelector('#weatherInfo')
const adviceElement = document.querySelector('.advice')
const cont_all = document.querySelector(".display-cont")
let error = null;

cont_all.style.display = "none"

async function getWeather(){
  const result = await fetch(apiUrl + `&appid=${apiKey}&q=${city.value}`)
  console.log(result.ok)  
if(!result.ok){
if(!error){
  error = document.createElement("p")
  error.textContent = "wrong error check spelling and check if that city exists."
  const weatherForm = document.querySelector("#weatherForm")
  cont_all.style.display = "none"
  weatherForm.appendChild(error)}

}else{
      if (error) { // Check if the error element exists
      const weatherForm = document.querySelector("#weatherForm");
      weatherForm.removeChild(error); // Remove the error element if it exists
      error = null; // Reset the error variable to null
    }
  var real = await result.json();
  console.log(real);

temp.textContent = real.main.temp + "°C";
cityName.textContent = city.value.toUpperCase()
temp.appendChild(cityName)
const temperature = real.main.temp
console.log(temperature)
  if (temperature < 10) {
    adviceElement.textContent = "It's cold outside. Wear a warm coat.";
  } else if (temperature >= 10 && temperature < 20) {
    adviceElement.textContent = "It's a bit chilly. Consider wearing a light jacket.";
  } else {
    adviceElement.textContent = "Enjoy the weather!";
  }
  
humid.textContent = "Humidity: " + real.main.humidity + "%";
weather.textContent = "Weather: " + real.weather[0].main;
wind.textContent = "Wind Speed: " + real.wind.speed + " km/h";
cont_all.style.display = "block"
}
}

submit.addEventListener("click", getWeather)
