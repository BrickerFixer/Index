export const id = "timestamp-converter";
export const name = "Timestamp Converter";
export const trigger = "search_query";
export const keywords = ["timestamp", "unix time", "epoch", "convert timestamp", "timestamp tool"];
export const manually_curated = false;
export const require_context_wildcard = true;
export const context_wildcard = null;
export const column = "main";

export async function renderIsland(container, params) {
  let input = params.context_wildcard || '';
  let output = '';
  let error = '';
  if (/^\d{10,13}$/.test(input.trim())) {
    // Convert timestamp to date
    let ts = parseInt(input.trim());
    if (input.length === 13) ts = Math.floor(ts / 1000);
    const date = new Date(ts * 1000);
    output = date.toLocaleString();
  } else {
    // Try to parse as date
    let d = new Date(input);
    if (!isNaN(d.getTime())) {
      output = Math.floor(d.getTime() / 1000).toString();
    } else {
      error = 'Invalid timestamp or date';
    }
  }
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Timestamp Converter</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix timestamp-converter-island-container">
        <input type="text" value="${input}" style="width:100%;font-size:1.1em;padding:8px;border-radius:8px;border:1px solid #ccc;" placeholder="Enter timestamp or date">
        <div style="margin:1em 0;"><button id="timestamp-convert-btn">Convert</button></div>
        <div style="font-size:1.2em;">${error ? error : output}</div>
      </div></div>
    </div>
    <style>
      .timestamp-converter-island-container {
        font-family: 'Inter', monospace, sans-serif;
        padding: 24px;
      }
    </style>
  `;
  setTimeout(() => {
    const btn = document.getElementById('timestamp-convert-btn');
    if (btn) {
      btn.onclick = () => {
        const inp = btn.parentElement.parentElement.querySelector('input');
        let val = inp.value;
        let out = '';
        let err = '';
        if (/^\d{10,13}$/.test(val.trim())) {
          let ts = parseInt(val.trim());
          if (val.length === 13) ts = Math.floor(ts / 1000);
          const date = new Date(ts * 1000);
          out = date.toLocaleString();
        } else {
          let d = new Date(val);
          if (!isNaN(d.getTime())) {
            out = Math.floor(d.getTime() / 1000).toString();
          } else {
            err = 'Invalid timestamp or date';
          }
        }
        btn.parentElement.parentElement.querySelector('div[style*="font-size:1.2em;"]').textContent = err ? err : out;
      };
    }
  }, 100);
}
