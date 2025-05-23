export const id = "lorem-ipsum";
export const name = "Lorem Ipsum Generator";
export const trigger = "search_query";
export const keywords = ["lorem", "lorem ipsum", "dummy text", "lorem generator", "ipsum"];
export const manually_curated = false;
export const require_context_wildcard = false;
export const context_wildcard = null;
export const column = "main";

function generateLorem() {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.`;
}

export async function renderIsland(container, params) {
  const text = generateLorem();
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Lorem Ipsum Generator</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix lorem-ipsum-island-container">
        <textarea style="width:100%;height:80px;">${text}</textarea>
        <div style="margin-top:1em;"><button id="lorem-generate-btn">Generate</button></div>
      </div></div>
    </div>
    <style>
      .lorem-ipsum-island-container {
        font-family: 'Inter', monospace, sans-serif;
        padding: 24px;
      }
      .lorem-ipsum-island-container textarea {
        font-family: monospace;
        font-size: 1em;
        border-radius: 8px;
        border: 1px solid #ccc;
        padding: 8px;
      }
    </style>
  `;
  setTimeout(() => {
    const btn = document.getElementById('lorem-generate-btn');
    if (btn) btn.onclick = () => {
      btn.parentElement.parentElement.querySelector('textarea').value = generateLorem();
    };
  }, 100);
}
