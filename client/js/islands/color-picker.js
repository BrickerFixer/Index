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

          .color-item:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30%;
            background: linear-gradient(to top, rgba(0,0,0,0.2), transparent);
            pointer-events: none;
            z-index: 2;
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
                                                <div class="color-name">Very Light Violet</div>
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
                                                <div class="color-name">Light Mauve</div>
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
                                                <div class="color-name">Periwinkle, Primrose</div>
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
                                                <div class="color-name">Blue-Blue Frost</div>
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
                                                <div class="color-name">Light-Blue</div>
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
    <script src="color-picker-logic.js"></script>
  `;
}
