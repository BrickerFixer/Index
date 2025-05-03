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
  let location = params.context_wildcard || "your location";
  // Strip leading 'in ' or 'в ' (for Russian)
  location = location.replace(/^in\s+/i, '').replace(/^в\s+/i, '');
  // Capitalize first letter
  location = location.charAt(0).toUpperCase() + location.slice(1);
  // For demo, we'll just show a fake weather. In real use, fetch from API using location.
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Weather in ${location}</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix weather-island-container">
          <h1>${location}</h1>
          <div class="weather-temperature"><h1>23°</h1></div>
          <h1>Sunny</h1>
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
