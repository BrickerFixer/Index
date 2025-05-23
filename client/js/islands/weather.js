export const id = "weather";
export const name = "Weather";
export const trigger = "search_query";
export const keywords = ["weather", "forecast", "temperature", "погода", "прогноз"];
export const manually_curated = false;
export const require_context_wildcard = false; // or false
export const context_wildcard = null; // will be set dynamically
export const column = "main"; // or "main"

// Weather Island Example
export async function renderIsland(container, params) {
  // params: { trigger, keyword, context_wildcard }
  let location = params.context_wildcard || "Moscow";
  location = location.replace(/^in\s+/i, '').replace(/^в\s+/i, '');
  location = location.charAt(0).toUpperCase() + location.slice(1);

  let weatherHtml = '';
  try {
    // Fetch API key from backend
    const keyResp = await fetch('/api/weather-key');
    const keyData = await keyResp.json();
    const apiKey = keyData.key || ""; // Set blank if not present
    if (!apiKey) {
      container.innerHTML = `
        <div class="serp-block serp-adv__block serp-adv__block_premium_yes">
          <div class="serp-block__head"><div class="serp-block__head-wrap">Weather</div></div>
          <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix weather-island-container">
            <h1>Weather API key is missing.</h1>
            <div>Ask admin to get an openweather API key or have a key proxy for usage</div>
          </div></div>
        </div>
      `;
      return;
    }
    // Fetch geocoding to get lat/lon
    const geoResp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${apiKey}`);
    const geoData = await geoResp.json();
    if (!geoData.length) throw new Error('Location not found');
    const { lat, lon, name: cityName, country } = geoData[0];
    // Fetch weather
    const weatherResp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const weatherData = await weatherResp.json();
    const temp = Math.round(weatherData.main.temp);
    const desc = weatherData.weather[0].main;
    weatherHtml = `
      <h1>${cityName}${country ? ', ' + country : ''}</h1>
      <div class="weather-temperature"><h1>${temp}°</h1></div>
      <h1>${desc}</h1>
    `;
  } catch (e) {
    weatherHtml = `<h1>${location}</h1><div class='weather-temperature'><h1>?</h1></div><h1>Not found</h1>`;
  }

  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Weather in ${location}</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix weather-island-container">
          ${weatherHtml}
      </div></div>
    </div>
    <style>
      .weather-island-container {
        font-family: "Inter", sans-serif;
        color: white;
        background: url("resources/backgrounds/plasma/Castilla_Sky/contents/screenshot.png"); 
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
      }
      .weather-island-container > h1 {
        font-weight: 300;
      }
      .weather-temperature {
        align-content: center;
        height: 96px;
        font-size: 64px;
        text-align: end;
      }
      .weather-temperature > h1 {
        font-weight: 300;
      }
    </style>
  `;
}
