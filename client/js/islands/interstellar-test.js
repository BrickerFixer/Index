// client/js/islands/interstellar.js
export const id = "interstellar";
export const name = "Interstellar Movie";
export const trigger_type = "self";
export const keywords = ["interstellar"];
export const column = "supporting";
export async function shouldRender({ query }) {
  if (query.toLowerCase().includes("interstellar")) {
    // Could fetch from Wikipedia API here
    return { shouldRender: true, keyword: "interstellar", context: "Interstellar" };
  }
  return { shouldRender: false };
}
export function renderIsland(container, params) {
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Interstellar (2014)</div></div>
      <div class="serp-item"><div class="island island-interactive i-clearfix">
        <div><strong>Director:</strong> Christopher Nolan<br>
        <strong>Plot:</strong> A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.</div>
      </div></div>
    </div>
  `;
}