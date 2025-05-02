// weather.js - Modular widget definition
export default {
  type: 'weather',
  label: 'Weather',
  getSize: () => [2, 2],
  create: function ({ isEditMode, onRemove, onDragStart, onDragEnd }) {
    const widget = document.createElement('div');
    widget.className = 'widget weather-widget center_widget';
    widget.innerHTML = `
      <div class="b-wrapper b-wrapper-weather">
        <div class="b-weather">
          <div class="b-content-item__title">
            <a href="#" class="b-link">Weather</a>
            <a href="#" title="облачно" class="b-weather__icon_link">
              <i class="b-inline b-weather__icon b-weather__icon_ovc"></i>
            </a>
            <a href="#" class="b-link_black_novisit">+16 °C</a>
          </div>
          <div class="b-weather__info"><a href="#" class="b-link_black_novisit">+21&nbsp;this day</a>,&#32;&nbsp;<a href="#" class="b-link_black_novisit">+17&nbsp;this evening</a></div>
        </div>
      </div>
    `;
    widget.draggable = true;
    widget.dataset.type = 'weather';
    widget.dataset.colSpan = 2;
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
