// Unique island ID
export const id = "quick-fact";
// Display name of your island
export const name = "Test";
// Trigger that makes your island appear (query, domain, content, self, external)
export const trigger_type = "query";
// keyword that triggers island's appearance
export const keywords = ["test island block"];
// Does island need something to narrow the information shown?
// For example, if you are making a weather island, context wildcard is the city where you want the weather to be pulled from
export const require_context_wildcard = false;
// Is information manually curated by a person or automatically pulled from certain sources?
export const manually_curated = true;
// Column where island will display at (main/supporting)
export const column = "supporting";

export function renderIsland(container, params) {

  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">${name}</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix">
        <h1>Test Island</h1>
        What triggered: ${trigger_type}
        <br>
        Thing that triggered it: "${params.keyword}"
      </div></div>
    </div>
  `;
}
