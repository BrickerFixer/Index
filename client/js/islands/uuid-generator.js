export const id = "uuid-generator";
export const name = "UUID Generator";
export const trigger = "search_query";
export const keywords = ["uuid", "uuid generator", "generate uuid", "guid", "uuid tool"];
export const manually_curated = false;
export const require_context_wildcard = false;
export const context_wildcard = null;
export const column = "main";

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function renderIsland(container, params) {
  const uuid = generateUUID();
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">UUID Generator</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix uuid-generator-island-container">
        <h1 style="font-family:monospace;font-size:2em;">${uuid}</h1>
        <div style="margin-top:1em;"><button id="uuid-generate-btn">Generate New</button></div>
      </div></div>
    </div>
    <style>
      .uuid-generator-island-container {
        font-family: 'Inter', monospace, sans-serif;
        padding: 24px;
        text-align: center;
      }
    </style>
  `;
  setTimeout(() => {
    const btn = document.getElementById('uuid-generate-btn');
    if (btn) btn.onclick = () => {
      location.reload();
    };
  }, 100);
}
