export const id = "unit-converter";
export const name = "Unit Converter";
export const trigger = "search_query";
export const keywords = ["convert", "unit converter", "conversion", "конвертер", "перевести", "to km", "to miles", "to kg", "to lbs"];
export const manually_curated = false;
export const require_context_wildcard = true;
export const context_wildcard = null;
export const column = "main";

const conversions = [
  { from: 'km', to: 'miles', factor: 0.621371 },
  { from: 'miles', to: 'km', factor: 1.60934 },
  { from: 'kg', to: 'lbs', factor: 2.20462 },
  { from: 'lbs', to: 'kg', factor: 0.453592 },
  { from: 'cm', to: 'in', factor: 0.393701 },
  { from: 'in', to: 'cm', factor: 2.54 },
  { from: 'c', to: 'f', factor: 1.8, offset: 32 },
  { from: 'f', to: 'c', factor: 5/9, offset: -32 },
];

function parseConversion(input) {
  const match = input.match(/([\d.]+)\s*(\w+)\s*(to|in|в|->)\s*(\w+)/i);
  if (!match) return null;
  const value = parseFloat(match[1]);
  const from = match[2].toLowerCase();
  const to = match[4].toLowerCase();
  return { value, from, to };
}

function convert({ value, from, to }) {
  for (const conv of conversions) {
    if (conv.from === from && conv.to === to) {
      if (conv.offset !== undefined) {
        if (from === 'c') return value * conv.factor + conv.offset;
        if (from === 'f') return (value + conv.offset) * conv.factor;
      }
      return value * conv.factor;
    }
  }
  return null;
}

export async function renderIsland(container, params) {
  let input = params.context_wildcard || '';
  let result = '';
  let error = '';
  const parsed = parseConversion(input);
  if (parsed) {
    const output = convert(parsed);
    if (output !== null) {
      result = `${parsed.value} ${parsed.from} = ${output.toFixed(4)} ${parsed.to}`;
    } else {
      error = 'Conversion not supported';
    }
  } else {
    error = 'Try e.g. "10 km to miles" or "32 f to c"';
  }
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Unit Converter</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix unit-converter-island-container">
        <input type="text" value="${input}" style="width:100%;font-size:1.1em;padding:8px;border-radius:8px;border:1px solid #ccc;" placeholder="e.g. 10 km to miles">
        <div style="margin:1em 0;"><button id="unit-convert-btn">Convert</button></div>
        <div style="font-size:1.2em;">${error ? error : result}</div>
      </div></div>
    </div>
    <style>
      .unit-converter-island-container {
        font-family: 'Inter', monospace, sans-serif;
        padding: 24px;
      }
    </style>
  `;
  setTimeout(() => {
    const btn = document.getElementById('unit-convert-btn');
    if (btn) {
      btn.onclick = () => {
        const inp = btn.parentElement.parentElement.querySelector('input');
        let val = inp.value;
        const parsed = parseConversion(val);
        let result = '';
        let error = '';
        if (parsed) {
          const output = convert(parsed);
          if (output !== null) {
            result = `${parsed.value} ${parsed.from} = ${output.toFixed(4)} ${parsed.to}`;
          } else {
            error = 'Conversion not supported';
          }
        } else {
          error = 'Try e.g. "10 km to miles" or "32 f to c"';
        }
        btn.parentElement.parentElement.querySelector('div[style*="font-size:1.2em;"]').textContent = error ? error : result;
      };
    }
  }, 100);
}
