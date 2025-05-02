export const id = "weather";
export const name = "Weather";
export const trigger = "search_query";
export const keywords = ["weather", "forecast", "temperature", "погода", "прогноз"];
export const manually_curated = false;
export const require_context_wildcard = false; // or false
export const context_wildcard = null; // will be set dynamically

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
      <div class="serp-item"><div class="island island-interactive i-clearfix">
        <div class="weather-demo">
          <div class="weather-demo__icon">☀️</div>
          <div class="weather-demo__info">
            <div class="weather-demo__temp">+18°C</div>
            <div class="weather-demo__desc">Clear sky</div>
            <div class="weather-demo__location">${location}</div>
          </div>
        </div>
      </div></div>
    </div>
    <style>
      .weather-demo { display: flex; align-items: center; gap: 16px; }
      .weather-demo__icon { font-size: 48px; }
      .weather-demo__info { display: flex; flex-direction: column; }
      .weather-demo__temp { font-size: 32px; font-weight: bold; }
      .weather-demo__desc { color: #666; }
      .weather-demo__location { color: #888; font-size: 14px; }
    </style>
  `;
}
