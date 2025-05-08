// search.js - Modular widget definition
export default {
    type: 'search-fullsize',
    label: 'Full-size search',
    getSize: () => [6, 1],
    create: function ({ isEditMode, onRemove, onDragStart, onDragEnd }) {
      const widget = document.createElement('div');
      widget.className = 'widget search-widget';
      widget.innerHTML = `
        <div class="arrow">
            <form action="/indsearch.html" method="get" class="search suggest2-form suggest2-counter search_suggest_yes "><input name="q" type="hidden" name="lr" value="90"/>
              <table class="search__table suggest2-form__node">
                <tr class="search__row">
                  <td class="search__cell search__input"><span class="input suggest2-form__input input_size_m input_theme_normal input_ahead_yes input_keyboard_yes"><span class="input__box"><input class="input__control input__input" tabindex="1" autocomplete="yes" id="text" maxlength="400" name="text" />
                  </td>
                  <td class="search__cell search__button"><button type="submit" class="search-button button suggest2-form__button button_size_m " role="button" tabindex="2" type="submit"><span class="button__text">Go</span></button></td>
                </tr>
              </table>
            </form>
        </div>
      `;
      widget.draggable = true;
      widget.dataset.type = 'search';
      widget.dataset.colSpan = 6;
      widget.dataset.rowSpan = 1;
      // Remove button
      const removeBtn = document.createElement('div');
      removeBtn.className = 'remove-btn';
      removeBtn.innerHTML = '×';
      removeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        onRemove(widget.parentNode);
      });
      widget.appendChild(removeBtn);
      // Drag logic
      widget.addEventListener('dragstart', function(e) {
        if (!isEditMode()) { e.preventDefault(); return; }
        onDragStart(widget);
      });
      widget.addEventListener('dragend', function(e) {
        if (!isEditMode()) return;
        onDragEnd();
      });
      // Prevent input field from triggering drag
      const input = widget.querySelector('.arrow');
      if (input) {
        input.addEventListener('mousedown', function(e) { e.stopPropagation(); });
      }
      // Form submit logic
      const form = widget.querySelector('form');
      if (form) {
        form.addEventListener('submit', e => {
          e.preventDefault();
          const q = form.querySelector('input[name="text"]').value;
          window.location.href = `/indsearch.html?q=${encodeURIComponent(q)}`;
        });
      }
      return widget;
    }
  };
  