export const id = "affiche";
export const name = "Affiche";
export const trigger = "search_query";
export const keywords = ["affiche", "cinema", "movie", "кино", "афиша"];
export const manually_curated = true;
export const require_context_wildcard = true; // or false
export const context_wildcard = null;

export function renderIsland(container, params) {
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Affiche</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interative i-clearfix">
        <h1>Now airing in your area (Preview UI)</h1>
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-family: sans-serif;">
          <div style="width: 180px; border: 1px solid #ddd; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <img src=\"poster1.jpg\" alt=\"Movie 1 Poster\" style=\"width: 100%; height: 270px; object-fit: cover;\">
            <div style=\"padding: 8px;\">
              <h3 style=\"margin: 0; font-size: 16px;\">The Intern</h3>
              <p style=\"margin: 4px 0 0 0; font-size: 14px; color: #555;\">Drama | 2h 10m</p>
            </div>
          </div>
          <div style="width: 180px; border: 1px solid #ddd; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <img src=\"poster2.jpg\" alt=\"Movie 2 Poster\" style=\"width: 100%; height: 270px; object-fit: cover;\">
            <div style=\"padding: 8px;\">
              <h3 style=\"margin: 0; font-size: 16px;\">Ford v Ferrari</h3>
              <p style=\"margin: 4px 0 0 0; font-size: 14px; color: #555;\">Action | 1h 45m</p>
            </div>
          </div>
        </div>
    </div>
</div>
    </div>
  `;
}
