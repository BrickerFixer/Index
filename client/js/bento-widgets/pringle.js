// logo.js - Modular widget definition
export default {
  type: 'pringle',
  label: 'Pringle',
  getSize: () => [1, 1],
  create: function ({ isEditMode, onRemove, onDragStart, onDragEnd }) {
    const widget = document.createElement('div');
    widget.className = 'widget pringle-widget';
    widget.innerHTML = `<img src="https://images.kglobalservices.com/www.pringles.com_ca_en/en_ca/product/product_6843199/prod_img-6860014_party_orig.png"></img>`;
    widget.draggable = true;
    widget.dataset.type = 'pringle';
    widget.dataset.colSpan = 1;
    widget.dataset.rowSpan = 1;
    // Remove button
    const removeBtn = document.createElement('div');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '×';
    removeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      onRemove();
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
