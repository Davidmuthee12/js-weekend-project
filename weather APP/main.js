document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("cityInput");
  const send = document.getElementById("getWeatherBtn");
  const name = document.getElementById("h2");
  const temp = document.getElementById("temp");
  const description = document.getElementById("Description");
  const icon = document.getElementById("weatherIcon");

  send.addEventListener("click", () => {
    getWeather();
  });

  async function getWeather() {
    const value = input.value.trim();
    // Used WeatherAPI.com
    // try to hard code apiKey for testing purposes
    const apiKey = "";
    const url = `https://api.weatherapi.com/v1/current.json?q=${value}&key=${apiKey}`;

    try {
      const res = await fetch(url);
      const response = await res.json();
      name.innerHTML = response.location.name;
      temp.innerHTML = `Temperature: ${response.current.temp_c}°C`;
      description.innerHTML = response.current.condition.text;
      const iconUrl = response.current.condition.icon;
      icon.src = iconUrl;
      console.log("weather", response);
    } catch (error) {
      console.log(error);
    }
  }
});
