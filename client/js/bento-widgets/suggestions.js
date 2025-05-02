// suggestions.js - Modular widget definition
const SUGGESTIONS = [
  {
    img: '/resources/images/ludskoye.png',
    title: 'Index is for, and developed by people like you',
    link: 'https://github.com/brickerfixer/bentoui/',
    description: 'Contribute to our search!'
  },
  {
    img: '/resources/images/ohno.png',
    title: 'THEY\'RE STEALING MY DIPLOMA NOO',
    link: '#',
    description: 'We gotta return it, i guess'
  },
  {
    img: '/resources/images/yougotmail.png',
    title: 'You got spam',
    link: '#',
    description: 'Open anyway? Y/N'
  },
  {
    img: '/resources/images/whatdidtheydotolinux.png',
    title: 'What did they do to Linux?',
    link: '#',
    description: 'Oh wait they put index there'
  },
  {
    img: '/resources/images/deezducks.png',
    title: 'Deez Ducks',
    link: '#',
    description: 'Quack productivity, not just memes.'
  },
  {
    img: '/resources/images/ohno3.png',
    title: 'Now they\'re stealing grammar :(',
    link: '#',
    description: 'Halp'
  },
  {
    img: '/resources/service-icons/mini-transport.png',
    title: 'Know when your bus arrives',
    link: '#',
    description: 'So you don\'t skip it. Use Index Transport!'
  },
  {
    img: '/resources/service-icons/mini-weather.png',
    title: 'Weather for your city',
    link: '#',
    description: 'Always up-to-date, always free.'
  },
  {
    img: '/resources/service-icons/mini-islands.png',
    title: 'Index 0.3',
    link: '#',
    description: 'Find out what changed'
  },
  {
    img: '/resources/images/twelve.png',
    title: 'Thirty',
    link: '#',
    description: 'Fifty one'
  },
  {
    img: '/resources/images/malware.png',
    title: 'Don\'t use Yandex Browser',
    link: '#',
    description: 'It sends your microphone data to authorities'
  },
  {
    img: '/resources/images/malwareone.png',
    title: 'We don\'t recommend Opera',
    link: '#',
    description: 'It is a professional malware made to track you'
  },
  {
    img: '/resources/images/customizable.png',
    title: 'Index will soon be customizable',
    link: '#',
    description: 'Just wait a lil for good themes and persistence'
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
