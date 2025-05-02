// news.js - Modular widget definition
export default {
  type: 'news',
  label: 'News',
  getSize: () => [3, 2],
  create: function ({ isEditMode, onRemove, onDragStart, onDragEnd }) {
    const widget = document.createElement('div');
    widget.className = 'widget news-widget';
    widget.innerHTML = `
      <div class="b-wrapper b-wrapper-topnewsblogs">
        <div class="b-news b-news-complex">
          <div class="b-tabs">
            <div class="b-tabs__head b-tabs__head_3">
              <ul class="b-tabs__names">
                <li class="b-tabs__selected b-inline"><a class="b-link b-inline" href="#">News</a></li>
              </ul>
            </div>
            <div class="b-tabs__items">
              <div>
                <ul class="b-news-list">
                  <li class="b-news-list__item"><span class="b-news-list__item_num">1.</span><a class="b-news-list__item-link" href="#">Index 0.3 - a fire release</a></li>
                  <li class="b-news-list__item"><span class="b-news-list__item_num">2.</span><a class="b-news-list__item-link" href="#">Introducing OpenAI o3 and o4-mini</a></li>
                  <li class="b-news-list__item"><span class="b-news-list__item_num">3.</span><a class="b-news-list__item-link" href="#">Here’s everything new in Android 16 Beta 4</a></li>
                  <li class="b-news-list__item"><span class="b-news-list__item_num">4.</span><a class="b-news-list__item-link" href="#">The newest Ubuntu version ushers in ARM64 support for early adopters</a></li>
                  <li class="b-news-list__item"><span class="b-news-list__item_num">5.</span><a class="b-news-list__item-link" href="#">I finally started using NotebookLM and I should have sooner</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    widget.draggable = true;
    widget.dataset.type = 'news';
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
