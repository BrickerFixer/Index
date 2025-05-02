export const id = "color-picker";
export const name = "Color Picker";
export const trigger = "search_query";
export const keywords = ["color", "hex color", "pantone", "color picker"];
export const require_context_wildcard = false; // or false
export const manually_curated = true;

// Color Picker Island
export function renderIsland(container, params) {
  // HTML structure for the enhanced color picker
  container.innerHTML = `
    <div class="serp-block">
      <div class="serp-block__head"><div class="serp-block__head-wrap">Colorpicker</div></div>
      <div class="serp-item"><div class="island island-interactive i-clearfix">
        <style>
          .color-picker-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
            padding: 0;
          }
          
          .color-picker-wrapper::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 20px;
            background: linear-gradient(to bottom, rgba(255,255,255,1), transparent);
            pointer-events: none;
            z-index: 2;
          }
          
          .color-picker-wrapper::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 20px;
            background: linear-gradient(to top, rgba(255,255,255,1), transparent);
            pointer-events: none;
            z-index: 2;
          }
          
          .color-picker {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin: 0 auto;
            transition: transform 0.3s ease;
          }
          
          .color-item {
            display: flex;
            align-items: stretch;
            margin: 0;
            position: relative;
            height: 40px;
          }
          
          .subtones {
            display: flex;
            padding: 0;
            margin: 0;
          }
          
          .subtone {
            width: 40px;
            height: 40px;
            margin: 0;
            padding: 0;
            cursor: pointer;
            display: block;
          }
          
          .color-container {
            display: flex;
            align-items: center;
            padding: 0;
            height: 40px;
            color: #333;
            position: relative;
            flex-grow: 1;
            cursor: pointer;
            transition: box-shadow 0.2s ease;
            border: none;
            margin: 0;
          }
          
          .color-name {
            padding-left: 16px;
          }
          
          .color-container:hover {
            box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
          }
          
          .color-container.active {
            box-shadow: 0 0 0 2px rgba(0,0,0,0.3);
          }
          
          .hex-value {
            display: flex;
            align-items: center;
            position: absolute;
            right: 16px;
            z-index: 1;
          }
          
          .hex-label {
            margin-right: 5px;
          }
          
          .hex-input {
            width: 80px;
            padding: 4px 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: white;
          }
          
          .format-toggle {
            display: flex;
            flex-direction: column;
            margin-left: 8px;
            font-size: 10px;
          }
          
          .format-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: #555;
            padding: 2px;
            text-align: center;
          }
        </style>
        
        <div class="color-picker-wrapper">
          <div class="color-picker">
            <div class="color-item">
              <div class="subtones left-tones">
                <div class="subtone" style="background-color: #fadfff;"></div>
                <div class="subtone" style="background-color: #f5c8ff;"></div>
              </div>
              <div class="color-container" style="background-color: #F8D3FF;">
                <div class="color-name">Очень светлый фиолетовый</div>
              </div>
              <div class="subtones right-tones">
                <div class="subtone" style="background-color: #fbe7ff;"></div>
                <div class="subtone" style="background-color: #f0c0fa;"></div>
              </div>
            </div>
            
            <div class="color-item">
              <div class="subtones left-tones">
                <div class="subtone" style="background-color: #c9b0f5;"></div>
                <div class="subtone" style="background-color: #e0d0ff;"></div>
              </div>
              <div class="color-container" style="background-color: #D5C0FF;">
                <div class="color-name">Светлая мальва</div>
              </div>
              <div class="subtones right-tones">
                <div class="subtone" style="background-color: #c0b0ff;"></div>
                <div class="subtone" style="background-color: #e5d5ff;"></div>
              </div>
            </div>
            
            <div class="color-item">
              <div class="subtones left-tones">
                <div class="subtone" style="background-color: #b8b8fa;"></div>
                <div class="subtone" style="background-color: #d6d6ff;"></div>
              </div>
              <div class="color-container" style="background-color: #CCCCFF;">
                <div class="color-name">Барвинок, первоцвет</div>
              </div>
              <div class="subtones right-tones">
                <div class="subtone" style="background-color: #c0c0f0;"></div>
                <div class="subtone" style="background-color: #dbdbff;"></div>
              </div>
            </div>
            
            <div class="color-item">
              <div class="subtones left-tones">
                <div class="subtone" style="background-color: #8ca5f5;"></div>
                <div class="subtone" style="background-color: #b9caff;"></div>
              </div>
              <div class="color-container" style="background-color: #A3B9FF;">
                <div class="color-name">Синий-синий иней</div>
              </div>
              <div class="subtones right-tones">
                <div class="subtone" style="background-color: #99b0fa;"></div>
                <div class="subtone" style="background-color: #b8c9ff;"></div>
              </div>
            </div>
            
            <div class="color-item">
              <div class="subtones left-tones">
                <div class="subtone" style="background-color: #9cd5f5;"></div>
                <div class="subtone" style="background-color: #c8edff;"></div>
              </div>
              <div class="color-container" style="background-color: #B3E3FF;">
                <div class="color-name">Светло-синий</div>
              </div>
              <div class="subtones right-tones">
                <div class="subtone" style="background-color: #a5daff;"></div>
                <div class="subtone" style="background-color: #c5ecff;"></div>
              </div>
            </div>
          </div>
        </div>
      </div></div>
    </div>
  `;

  // Initialize the color picker functionality
  initColorPicker(container);
}

function initColorPicker(container) {
  const colorContainers = container.querySelectorAll('.color-container');
  const colorItems = container.querySelectorAll('.color-item');
  const colorPicker = container.querySelector('.color-picker');
  const wrapper = container.querySelector('.color-picker-wrapper');
  
  // Function to center a color item in the viewport
  function centerColorItem(item) {
    const wrapperRect = wrapper.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    
    const wrapperCenter = wrapperRect.top + wrapperRect.height / 2;
    const itemCenter = itemRect.top + itemRect.height / 2;
    
    const offset = itemCenter - wrapperCenter;
    
    // Calculate current translateY value
    const style = window.getComputedStyle(colorPicker);
    let currentTranslateY = 0;
    if (style.transform && style.transform !== 'none') {
      const matrix = new DOMMatrixReadOnly(style.transform);
      currentTranslateY = matrix.m42 || 0;
    }
    
    // Apply the new translation
    colorPicker.style.transform = `translateY(${currentTranslateY - offset}px)`;
  }
  
  // Add click handling for color selection and centering
  colorContainers.forEach((container, index) => {
    container.addEventListener('click', () => {
      // Remove active class from all containers
      colorContainers.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked container
      container.classList.add('active');
      
      // Center the color item
      centerColorItem(colorItems[index]);
      
      // Remove hex input from all containers
      container.closest('.color-picker').querySelectorAll('.hex-value').forEach(el => {
        el.remove();
      });
      
      // Create new hex input
      const hexValue = document.createElement('div');
      hexValue.className = 'hex-value';
      
      // Get background color and convert to hex
      const bgColor = getComputedStyle(container).backgroundColor;
      const hexColor = rgbToHex(bgColor);
      
      hexValue.innerHTML = `
        <div class="hex-label">#</div>
        <input type="text" class="hex-input" value="${hexColor.replace('#', '')}">
        <div class="format-toggle">
          <button class="format-btn">HEX</button>
        </div>
      `;
      
      container.appendChild(hexValue);
    });
  });
  
  // Make subtones clickable too
  const subtones = container.querySelectorAll('.subtone');
  subtones.forEach(subtone => {
    subtone.addEventListener('click', () => {
      // Get the color from the subtone
      const bgColor = getComputedStyle(subtone).backgroundColor;
      const hexColor = rgbToHex(bgColor);
      
      // Find parent color-item
      const colorItem = subtone.closest('.color-item');
      const colorContainer = colorItem.querySelector('.color-container');
      
      // Set the main color container to this color
      colorContainer.style.backgroundColor = bgColor;
      
      // Trigger a click on the container to select it
      colorContainer.click();
    });
  });
  
  // Convert RGB to HEX
  function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues || rgbValues.length !== 3) return '000000';
    
    const r = parseInt(rgbValues[0]).toString(16).padStart(2, '0');
    const g = parseInt(rgbValues[1]).toString(16).padStart(2, '0');
    const b = parseInt(rgbValues[2]).toString(16).padStart(2, '0');
    
    return `${r}${g}${b}`;
  }
  
  // Make the third color active by default (Барвинок, первоцвет)
  if (colorContainers.length > 2) {
    colorContainers[2].click();
  }
}