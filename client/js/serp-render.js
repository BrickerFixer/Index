// Helper to get query param
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// --- Dynamic Search Client Navigation ---
function renderClientNav(clients, selectedClient, q) {
  const nav = document.querySelector('.navigation');
  nav.innerHTML = clients.map(client => `
    <div class="navigation__item navigation__item_service_yes navigation__item_name_${client.id} ${client.id === selectedClient ? 'navigation__item_selected_yes' : ''}" data-client="${client.id}">
      <div class="service service_hoverable_yes service service_name_${client.id}">
        <img src="${client.icon}" style="height:40px" class="service__icon service__icon_self_40">
        <div class="service__name">${client.name}</div>
      </div>
    </div>
  `).join('');
  // Add event listeners
  nav.querySelectorAll('.navigation__item[data-client]').forEach(item => {
    item.addEventListener('click', function() {
      const client = item.getAttribute('data-client');
      window.location.href = '/indsearch.html?q=' + encodeURIComponent(q) + '&client=' + encodeURIComponent(client);
    });
  });
}

function getSelectedClient(clients) {
  const urlParam = getQueryParam('client');
  if (urlParam && clients.some(c => c.id === urlParam)) return urlParam;
  return clients.length ? clients[0].id : 'google';
}

function renderSpecialBlock(block) {
  switch(block.type) {
    case 'images':
      return `
        <div class="serp-block">
          <div class="serp-block__head">
            <div class="serp-block__head-wrap">${block.title}</div>
          </div>
          <div class="serp-item serp-item_first_yes">
            <div class="serp-item__wrap island i-clearfix">
              <div class="images-preview-container">
                <div class="images-preview">
                  ${block.items.map(img => `
                    <a href="${img.url}" class="images-preview__thumb">
                      <img src="${img.thumbnail}" alt="${img.title}" loading="lazy">
                    </a>
                  `).join('')}
                </div>
                <button class="images-preview__nav images-preview__nav--prev" aria-label="Previous images">‹</button>
                <button class="images-preview__nav images-preview__nav--next" aria-label="Next images">›</button>
              </div>
            </div>
          </div>
        </div>
      `;
  }
}

function renderSearchResults(results) {
  console.log('Rendering results:', results); // Debug logging
  
  return Object.entries(results).map(([domain, items]) => `
    <div class="serp-block">
      ${items.map((item, index) => `
        <div class="serp-item serp-item_plain_yes i-bem ${index === 0 ? 'serp-item_first_yes' : ''} ${item.source ? 'serp-item_source_' + item.source : ''}">
          <div class="serp-item__wrap island i-clearfix">
            <h2 class="serp-item__title">
              <a class="serp-item__title-link b-link" href="${item.url}" target="_blank">
                ${item.title}
              </a>
            </h2>
            <div class="serp-item__greenurl serp-url">
              <a class="serp-url__link" href="${item.url}" target="_blank">${domain}</a>
              ${item.source ? `<span class="serp-url__source">[${item.source}]</span>` : ''}
            </div>
            <div class="serp-item__text">${item.snippet || ''}</div>
            ${item.sitelinks ? `
              <div class="serp-sitelinks">
                ${item.sitelinks.map(link => `
                  <a class="serp-sitelinks__link b-link" href="${link.url}" target="_blank">${link.title}</a>
                `).join(' ')}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// --- Island Registry ---
const IslandRegistry = {
  islands: [],
  loaded: false,
  async load() {
    if (this.loaded) return;
    let islandFiles = [];
    try {
      const resp = await fetch('/client/js/islands/manifest.json');
      islandFiles = await resp.json();
    } catch (e) {
      console.error('Failed to load island manifest:', e);
      return;
    }
    for (const file of islandFiles) {
      try {
        const mod = await import(`/client/js/islands/${file}`);
        if (mod && mod.id) {
          this.islands.push(mod);
        }
      } catch (e) {
        console.error('Failed to load island module:', file, e);
      }
    }
    this.loaded = true;
  },
  // Find matching islands for a given trigger, keyword, and context_wildcard
  find(trigger, keyword, context_wildcard) {
    return this.islands.filter(island => {
      if (island.trigger !== trigger) return false;
      if (island.context_wildcard && context_wildcard && island.context_wildcard !== context_wildcard) return false;
      if (island.keywords && Array.isArray(island.keywords)) {
        return island.keywords.some(kw => keyword.toLowerCase().includes(kw.toLowerCase()));
      }
      return false;
    });
  },
  getAll() {
    return this.islands;
  }
};

// --- Render Islands (Client-side only, with column support) ---
async function renderIslands(trigger, query, searchResults, specialBlocks) {
  await IslandRegistry.load();
  const mainIslands = [];
  const supportingIslands = [];
  for (const island of IslandRegistry.islands) {
    const triggerType = island.trigger_type || "query";
    let shouldRender = false;
    let context = null;
    let keyword = null;

    if (triggerType === "query") {
      keyword = island.keywords.find(kw => query.toLowerCase().includes(kw.toLowerCase()));
      shouldRender = !!keyword && (!island.require_context_wildcard || extractContextWildcard(query, island));
      context = extractContextWildcard(query, island);
    } else if (triggerType === "domain") {
      const domains = Object.keys(searchResults || {});
      keyword = island.keywords.find(kw => domains.some(domain => domain.includes(kw)));
      shouldRender = !!keyword;
      context = keyword;
    } else if (triggerType === "content") {
      let found = null;
      for (const [domain, items] of Object.entries(searchResults || {})) {
        for (const item of items) {
          for (const kw of island.keywords) {
            if (
              (item.title && item.title.toLowerCase().includes(kw.toLowerCase())) ||
              (item.snippet && item.snippet.toLowerCase().includes(kw.toLowerCase()))
            ) {
              found = { kw, item };
              break;
            }
          }
          if (found) break;
        }
        if (found) break;
      }
      if (found) {
        shouldRender = true;
        keyword = found.kw;
        context = found.item.title || found.item.snippet;
      }
    } else if (triggerType === "self") {
      if (typeof island.shouldRender === "function") {
        const result = await island.shouldRender({ query, searchResults, specialBlocks });
        shouldRender = !!result.shouldRender;
        keyword = result.keyword;
        context = result.context;
      }
    } else if (triggerType === "external") {
      if (typeof island.externalTrigger === "function") {
        const result = await island.externalTrigger({ query, searchResults, specialBlocks });
        shouldRender = !!result.shouldRender;
        keyword = result.keyword;
        context = result.context;
      }
    }

    if (shouldRender) {
      const container = document.createElement('div');
      container.className = 'island-container';
      await island.renderIsland(container, {
        trigger,
        keyword,
        context_wildcard: context
      });
      if (island.column === 'supporting' || island.column === 'right') {
        supportingIslands.push(container.outerHTML);
      } else {
        mainIslands.push(container.outerHTML);
      }
    }
  }
  return { main: mainIslands.join(''), supporting: supportingIslands.join('') };
}

// Extract context wildcard from query
function extractContextWildcard(query, island) {
  // Lowercase for matching
  const q = query.toLowerCase();
  // Find the first matching keyword
  let found = null;
  for (const kw of island.keywords) {
    const idx = q.indexOf(kw.toLowerCase());
    if (idx !== -1) {
      found = { kw, idx, len: kw.length };
      break;
    }
  }
  if (!found) return null;
  // Context is everything after the keyword (or before, if you want)
  // Example: "weather in Chicago" -> keyword: "weather", context: "in Chicago"
  const after = query.slice(found.idx + found.len).trim();
  return after.length ? after : null;
}

// For debug: expose loaded islands
window.getLoadedIslands = () => IslandRegistry.getAll();

const q = getQueryParam('q') || '';
const page = parseInt(getQueryParam('page') || '1', 10);
const count = parseInt(getQueryParam('count') || '10', 10);
fetch('/api/clients')
  .then(res => res.json())
  .then(data => {
    const clients = Array.isArray(data) ? data : (data && Array.isArray(data.clients) ? data.clients : []);
    const client = getSelectedClient(clients);
    renderClientNav(clients, client, q);
    if(q) {
      document.getElementById('searchInput').value = q;
      fetch(`/api/search?q=${encodeURIComponent(q)}&client=${encodeURIComponent(client)}&page=${page}&count=${count}`)
        .then(res => res.json())
        .then(async data => {
          console.log('Search API response:', data);
          const resultsContainer = document.getElementById('results');
          // Render main content (special blocks + web results)
          const mainContent = [
            ...data.specialBlocks.filter(block => block.type !== 'knowledge').map(block => renderSpecialBlock(block)),
            renderSearchResults(data.webResults)
          ].join('');
          resultsContainer.innerHTML = mainContent;

          // Pagination links
          const paginationDiv = document.createElement('div');
          paginationDiv.style.margin = '16px 0';
          paginationDiv.style.textAlign = 'center';
          const currentPage = page && !isNaN(page) ? page : 1;
          // Only show pagination if supported by backend
          if (data.supports_pagination) {
            if (currentPage > 1) {
              const prev = document.createElement('a');
              prev.href = `/indsearch.html?q=${encodeURIComponent(q)}&client=${encodeURIComponent(client)}&page=${currentPage-1}&count=${count}`;
              prev.textContent = 'Previous';
              paginationDiv.appendChild(prev);
            }
            if (currentPage > 1) paginationDiv.appendChild(document.createTextNode(' | '));
            const next = document.createElement('a');
            next.href = `/indsearch.html?q=${encodeURIComponent(q)}&client=${encodeURIComponent(client)}&page=${currentPage+1}&count=${count}`;
            next.textContent = 'Next';
            paginationDiv.appendChild(next);
            resultsContainer.appendChild(paginationDiv);
          }

          // Only show knowledge blocks if they exist, and render them in the right sidebar
          const rightSidebar = document.querySelector('.content__right .serp-list');
          const knowledgeBlocks = data.specialBlocks.filter(block => block.type === 'knowledge');
          rightSidebar.innerHTML = knowledgeBlocks.length > 0 ? 
            knowledgeBlocks.map(block => `
              <div class="serp-block">
                <div class="serp-block__head">
                  <div class="serp-block__head-wrap">${block.title}</div>
                </div>
                <div class="serp-item serp-item_first_yes">
                  <div class="serp-item__wrap island island-interactive i-clearfix">
                    <h1>${block.content.title}</h1>
                    <p>${block.content.description}</p>
                    <dl>
                      ${(block.content.properties || []).map(prop => `
                        <dt>${prop.key}</dt>
                        <dd>${prop.value}</dd>
                      `).join('')}
                    </dl>
                  </div>
                </div>
              </div>
            `).join('') : '';
          // --- Asynchronous Island Loading ---
          renderIslands('search_query', q, data.webResults, data.specialBlocks).then(({ main, supporting }) => {
            // Append main islands to main results
            resultsContainer.innerHTML = main + resultsContainer.innerHTML;
            // Append supporting islands to right sidebar (after knowledge blocks)
            rightSidebar.innerHTML += supporting;
          });
        });
    }
    // On form submit, redirect to new indsearch page instance with updated query
    document.querySelector('.arrow-search form').addEventListener('submit', function(e) {
      e.preventDefault();
      var newQuery = document.getElementById('searchInput').value;
      window.location.href = '/indsearch.html?q=' + encodeURIComponent(newQuery) + '&client=' + encodeURIComponent(client);
    });
  });

document.addEventListener('click', e => {
  if (e.target.closest('.images-preview__nav')) {
    const nav = e.target.closest('.images-preview__nav');
    const container = nav.closest('.images-preview-container');
    const preview = container.querySelector('.images-preview');
    const scrollAmount = preview.clientWidth / 2;
    
    if (nav.classList.contains('images-preview__nav--prev')) {
      preview.scrollBy({left: -scrollAmount, behavior: 'smooth'});
    } else {
      preview.scrollBy({left: scrollAmount, behavior: 'smooth'});
    }
  }
});