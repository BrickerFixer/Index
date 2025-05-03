export const id = "my-town";
export const name = "My Town";
export const trigger_type = "query";
export const keywords = ["my town", "outage", "hot water", "downtown", "westside", "мой город", "отключение", "горячая вода"];
export const manually_curated = true;
export const require_context_wildcard = true; // or false
export const context_wildcard = null;

export function renderIsland(container, params) {
  container.innerHTML = `
    <div class="serp-block serp-adv__block serp-adv__block_premium_yes">
      <div class="serp-block__head"><div class="serp-block__head-wrap">My Town</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix">
        <h2 style="margin-top: 8px; color: #cc5500;">🚧 Upcoming Hot Water Outage (Preview UI)</h2>
        <p style="margin-top: 16px; font-size: 16px;">
          <strong>Date:</strong> May 2, 2025<br>
          <strong>Time:</strong> 8:00 AM – 6:00 PM<br>
          <strong>Area Affected:</strong> Downtown and Westside
        </p></div></div>
    </div>
  `;
}
