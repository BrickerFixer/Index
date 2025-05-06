export const id = "expose";
export const name = "Exposé";
export const trigger_type = "self";
export const require_context_wildcard = false;
export const manually_curated = false;
export const column = "supporting";

// Self-trigger: always request Wikipedia for the query
export async function shouldRender({ query }) {
  const title = query.trim();
  if (!title) return { shouldRender: false };
  try {
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const resp = await fetch(apiUrl);
    if (!resp.ok) throw new Error('No summary');
    const data = await resp.json();
    if (data.type === 'standard' || data.type === 'disambiguation') {
      return {
        shouldRender: true,
        keyword: title,
        context: {
          summary: data.extract || '',
          image: (data.thumbnail && data.thumbnail.source) || null,
          title: data.title || title
        }
      };
    }
  } catch (e) {
    return { shouldRender: false };
  }
  return { shouldRender: false };
}

export function renderIsland(container, params) {
  const ctx = params.context_wildcard || {};
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head">
        <div class="serp-block__head-wrap">Exposé: ${ctx.title || ''}</div>
      </div>
      <div class="serp-item serp-item_first_yes">
        <div class="island island-interactive i-clearfix">
          <div class="expose-island">
            <div class="image-container">
              ${ctx.image ? `<img src="${ctx.image}" alt="${ctx.title}" class="expose-image">` : ''}
            </div>
            <div class="content">
              <h1>${ctx.title || ''}</h1>
              <p>${ctx.summary || ''}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
