export const id = "easter-egg-matrix";
export const name = "Matrix";
export const trigger = "search_query";
export const keywords = ["matrix", "neo", "morpheus", "trinity", "пасхалка", "easter egg"];
export const manually_curated = true;
export const require_context_wildcard = false;
export const context_wildcard = null;
export const column = "main";

export async function renderIsland(container, params) {
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Welcome to the Matrix</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix matrix-egg-island-container">
        <h1>Wake up, Neo...</h1>
        <div style="font-family:monospace;color:#00ff41;font-size:1.5em;margin:1em 0;">The Matrix has you.</div>
        <div style="margin-top:1em;">Follow the white rabbit.</div>
      </div></div>
    </div>
    <style>
      .matrix-egg-island-container {
        font-family: 'Inter', monospace, sans-serif;
        color: #00ff41;
        background: #000 url('https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif') repeat;
        background-size: cover;
        padding: 32px;
        min-height: 120px;
        text-align: center;
      }
      .matrix-egg-island-container h1 {
        font-weight: 700;
      }
    </style>
  `;
}
