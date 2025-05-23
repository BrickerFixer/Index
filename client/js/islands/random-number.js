export const id = "random-number";
export const name = "Random Number";
export const trigger = "search_query";
export const keywords = ["random number", "случайное число", "roll", "dice", "рандом"];
export const manually_curated = false;
export const require_context_wildcard = true;
export const context_wildcard = null;
export const column = "main";

export async function renderIsland(container, params) {
  let min = 1;
  let max = 100;
  let input = params.context_wildcard || '';
  // Try to parse input for min/max or dice notation
  let match;
  if ((match = input.match(/(\d+)\s*[-–—]\s*(\d+)/))) {
    min = parseInt(match[1], 10);
    max = parseInt(match[2], 10);
  } else if ((match = input.match(/(\d+)\s*to\s*(\d+)/i))) {
    min = parseInt(match[1], 10);
    max = parseInt(match[2], 10);
  } else if ((match = input.match(/d(\d+)/i))) {
    min = 1;
    max = parseInt(match[1], 10);
  } else if ((match = input.match(/(\d+)d(\d+)/i))) {
    // e.g. 3d6: roll 3 dice, each 1-6
    let rolls = parseInt(match[1], 10);
    let sides = parseInt(match[2], 10);
    let results = [];
    for (let i = 0; i < rolls; i++) {
      results.push(Math.floor(Math.random() * sides) + 1);
    }
    container.innerHTML = `
      <div class="serp-block">
        <div class="serp-block__head"><div class="serp-block__head-wrap">Random Number</div></div>
        <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix random-number-island-container">
          <h1>${results.join(' , ')}</h1>
          <div style="font-size:1em;">(${rolls}d${sides})</div>
        </div></div>
      </div>
      <style>
        .random-number-island-container {
          font-family: 'Inter', sans-serif;
          color: #fff;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 32px;
          text-align: center;
        }
        .random-number-island-container h1 {
          font-size: 3em;
          font-weight: 700;
        }
      </style>
    `;
    return;
  }
  if (min > max) [min, max] = [max, min];
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Random Number</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix random-number-island-container">
        <h1>${num}</h1>
        <div style="font-size:1em;">(between ${min} and ${max})</div>
      </div></div>
    </div>
    <style>
      .random-number-island-container {
        font-family: 'Inter', sans-serif;
        color: #fff;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 32px;
        text-align: center;
      }
      .random-number-island-container h1 {
        font-size: 3em;
        font-weight: 700;
      }
    </style>
  `;
}
