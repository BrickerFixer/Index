// map.js - Modular widget definition
export default {
  type: 'map',
  label: 'Map',
  getSize: () => [2, 2],
  create: function ({ isEditMode, onRemove, onDragStart, onDragEnd }) {
    const widget = document.createElement('div');
    widget.className = 'widget map-widget center_widget';
    widget.innerHTML = `
      <div class="b-wrapper b-wrapper-geo">
        <div class="b-region b-region_map b-region_map-on-links">
          <div class="">
            <div class="b-content-item__title b-region__title b-region_city"><span class="b-region__cityname"><span class="b-region__cityname_text">Moscow</span><a class="b-inline b-region__setup b-region__setup_icon" href="#" title="Изменить город"><i class="b-ico b-ico-setup_g"></i><i class="b-ico b-ico-setup_b b-icon_color"></i></a></span></div>
            <div class="b-region__map"><a href="#" class="b-link">My town</a></div>
          </div>
          <div class="b-region__links">
            <div class="b-region__links__item b-region__links__item_0 b-inline"><a class="b-link" href="#">Panoramas of Russia</a></div>
          </div>
        </div>
      </div>
    `;
    widget.draggable = true;
    widget.dataset.type = 'map';
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
