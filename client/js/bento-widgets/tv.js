// tv.js - Modular widget definition
export default {
  type: 'tv',
  label: 'TV Guide',
  getSize: () => [2, 2],
  create: function ({ isEditMode, onRemove, onDragStart, onDragEnd }) {
    const widget = document.createElement('div');
    widget.className = 'widget tv-widget';
    widget.innerHTML = `
      <div class="b-wrapper b-wrapper-tv">
        <div class="b-afisha">
          <div class="b-content-item__title"><a href="#" class="b-link">Programme</a></div>
          <div class="b-afisha__content">
            <ul class="b-tv-list">
              <li class="b-content_list__item">
                <table class="b-tv-list__item__table">
                  <tbody>
                    <tr>
                      <td class="b-tv-list__item__td">
                        <div class="b-tv-list__time">
                          <i class="b-ico b-ico-tv__film"></i>
                          12:00
                        </div>
                      </td>
                      <td class="b-tv-list__item__td">
                        <a href="#" title="Movie">Movie</a>&#32;
                        <span class="b-tv-list__channel">
                          <a href="#" class="b-link_black_novisit">Channel 1</a>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
    widget.draggable = true;
    widget.dataset.type = 'tv';
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
