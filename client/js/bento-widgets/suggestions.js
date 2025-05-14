// suggestions.js - Modular widget definition
const SUGGESTIONS = [
  {
    img: '/resources/images/ludskoye.png',
    title: 'Index is for, and developed by people like you',
    link: 'https://github.com/brickerfixer/bentoui/',
    description: 'Contribute to our search!'
  },
  {
    img: '/resources/images/image.png',
    title: 'Index 0.3 - Acacia',
    link: '#',
    description: 'Find out what changed'
  },
  {
    img: '/resources/images/twelve.png',
    title: 'Minutes since index didn\'t crash',
    link: '#',
    description: 'That\'s an achievement...'
  },
  {
    img: '/resources/images/customizable.png',
    title: 'Customizable',
    link: '#',
    description: 'Index is more customizable than the most search engines.'
  },
  {
    img: "/resources/images/onegin.png",
    title: "Eugene Onegin",
    link: "/indsearch.html?q=Eugene%20Onegin&client=fusion",
    description: "Learn why it's considered to be a visualisation of a fallen era"
  },
  {
    img: "/resources/images/readabook.png",
    title: "Poems about Summer",
    link: "/indsearch.html?q=Poems%20about%20Summer&client=fusion",
    description: "Immerse yourself into a divine world of art"
  },
  {
    img: "/resources/images/rightnow.png",
    title: "Look out of the window",
    link: "#",
    description: "Touch grass"
  },
  {
    img: "/resources/images/shells.png",
    title: "Divine creatures of sea",
    link: "/indsearch.html?q=Seashells",
    description: "Find out how they make natural life better"
  }
];

function getRandomSuggestion() {
  const arr = [...SUGGESTIONS];
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

export default {
  type: 'suggestions',
  label: 'Suggestions',
  getSize: () => [3, 2],
  create: function ({ isEditMode, onRemove, onDragStart, onDragEnd }) {
    const widget = document.createElement('div');
    widget.className = 'widget suggestions-widget';
    // Pick only one random suggestion
    const s = getRandomSuggestion();
    widget.innerHTML = `
      <div class="b-wrapper b-wrapper-teaser">
        <div class="b-promo">
          <img src="${s.img}" alt="" height="90" />
          <h2 class="b-promo__title">
            <a href="${s.link}" target="_blank">
              <span class="b-promo__nowrap">${s.title}</span>
            </a>
          </h2>
          <div class="b-promo__description">
            <span class="b-promo__nowrap">${s.description}</span>
          </div>
        </div>
      </div>
    `;
    widget.draggable = true;
    widget.dataset.type = 'suggestions';
    widget.dataset.colSpan = 3;
    widget.dataset.rowSpan = 2;
    const removeBtn = document.createElement('div');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '×';
    removeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      onRemove(widget.parentNode);
    });
    widget.appendChild(removeBtn);
    widget.addEventListener('dragstart', function(e) {
      if (!isEditMode()) { e.preventDefault(); return; }
      onDragStart(widget);
    });
    widget.addEventListener('dragend', function(e) {
      if (!isEditMode()) return;
      onDragEnd();
    });
    return widget;
  }
};
