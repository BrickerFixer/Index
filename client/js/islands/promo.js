export const id = "promo";
export const name = "Promo";
export const manually_curated = true;
export const require_context_wildcard = false;
export const context_wildcard = null;
export const trigger_type = "self";
export const column = "supporting";

const promoExamples = [
  { query: "weather in Tokyo", desc: "Weather forecast" },
  { query: "color picker", desc: "Color Picker tool" },
  { query: "random number 1-1000", desc: "Random Number generator" },
  { query: "base64 encode hello", desc: "Base64 Encoder" },
  { query: "10 km to miles", desc: "Unit Converter" },
  { query: "timestamp 1680000000", desc: "Timestamp Converter" },
  { query: "uuid", desc: "UUID Generator" },
  { query: "lorem ipsum", desc: "Lorem Ipsum Generator" }
];

export async function shouldRender({ query }) {
  // 1/3 chance to show promo
  return { shouldRender: Math.random() < 0.33 };
}

export async function renderIsland(container, params) {
  const example = promoExamples[Math.floor(Math.random() * promoExamples.length)];
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Try this search!</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix promo-island-container">
        <h1 style="margin-bottom:0.5em;">${example.desc}</h1>
        <div style="font-size:1.3em;margin-bottom:1em;"><b>${example.query}</b></div>
        <div style="margin-top:1em;font-size:1em;">Index: Everything found.</div>
      </div></div>
    </div>
    <style>
      .promo-island-container {
        font-family: "Inter", sans-serif;
        color: #fff;
        background: url("resources/backgrounds/plasma/Azul/contents/screenshot.png");
        background-size: cover;
        background-position: bottom;
        padding: 24px;
        text-align: center;
        min-height: 240px;
        align-content: center;
      }
      .promo-island-container h1 {
        font-weight: 700;
        margin-bottom: 16px;
      }
    </style>
  `;
}
