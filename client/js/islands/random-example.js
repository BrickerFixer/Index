export const id = "randomtest";
export const name = "Random test";
export const trigger_type = "self";
export const column = "supporting";
export async function shouldRender({ query }) {
  var randomTrigger = Math.random()
  if (randomTrigger > 0.5) {
    return { shouldRender: true };
  }
  return { shouldRender: false };
}
export function renderIsland(container, params) {
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Random trigger test</div></div>
      <div class="serp-item"><div class="serp-item__wrap island island-interactive i-clearfix">
        <h1>Random trigger test Island</h1>
        If you're seeing this, you had 1/2 chance of this Island not appearing. this is a test of Island's self-trigger ability.</div>
      </div></div>
    </div>
  `;
}