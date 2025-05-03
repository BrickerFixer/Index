export const id = "quick-fact";
export const name = "Quick Fact";
export const trigger_type = "query";
export const keywords = ["lilac", "bloom"];
export const require_context_wildcard = false;
export const manually_curated = true;
export const column = "supporting";

export function renderIsland(container, params) {
  // Example facts, could be randomized or fetched from an API
  const facts = [
    "Honey never spoils. Archaeologists have found 3000-year-old honey in ancient Egyptian tombs that is still edible.",
    "Bananas are berries, but strawberries are not.",
    "Octopuses have three hearts.",
    "The Eiffel Tower can be 15 cm taller during hot days.",
    "A group of flamingos is called a 'flamboyance'.",
    "The unicorn is the national animal of Scotland.",
    "There are more stars in the universe than grains of sand on Earth."
  ];
  const fact = facts[Math.floor(Math.random() * facts.length)];
  container.innerHTML = `
  <div class="serp-block">
                                <div class="serp-block__head">
                                  <div class="serp-block__head-wrap">Exposé</div>
                                </div>
                                <div class="serp-item serp-item_first_yes">
                                  <div class="island island-interactive i-clearfix">
                                    <div class="expose-body">
                                      <img src="/image.png" alt="Lilac" class="expose-image">
                                      <div class="expose-content">
                                        <h1>April - June</h1>
                                        <p>Lilac is one of the main symbols of spring, but the timing of its flowering depends on the climate. <b> In some regions it blooms already in April, in others only by June. </b> Everything is determined by latitude, temperature fluctuations and the duration of spring.</p>
                                      </div>
                                    </div>
                                    <div class="devmode devmode__island-test">
                                      </div>
                                  </div>
                                </div>
  </div>
  `;
}
