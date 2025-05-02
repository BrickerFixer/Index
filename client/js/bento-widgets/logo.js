// logo.js - Modular widget definition
export default {
  type: 'logo',
  label: 'Logo',
  getSize: () => [1, 1],
  create: function ({ isEditMode, onRemove, onDragStart, onDragEnd }) {
    const widget = document.createElement('div');
    widget.className = 'widget logo-widget';
    widget.innerHTML = `<div class="b-logo"><div class="b-logo__image_bg"></div></div>`;
    widget.draggable = true;
    widget.dataset.type = 'logo';
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
