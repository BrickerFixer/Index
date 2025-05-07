                                          document.addEventListener('DOMContentLoaded', () => {
                                            const colorContainers = document.querySelectorAll('.color-container');
                                            const colorItems = document.querySelectorAll('.color-item');
                                            const colorPicker = document.querySelector('.color-picker');
                                            const wrapper = document.querySelector('.color-picker-wrapper');
                                            
                                            // Function to center a color item in the viewport
                                            function centerColorItem(item) {
                                              const wrapperRect = wrapper.getBoundingClientRect();
                                              const itemRect = item.getBoundingClientRect();
                                              
                                              const wrapperCenter = wrapperRect.top + wrapperRect.height / 2;
                                              const itemCenter = itemRect.top + itemRect.height / 2;
                                              
                                              const offset = itemCenter - wrapperCenter;
                                              
                                              // Calculate current translateY value
                                              const style = window.getComputedStyle(colorPicker);
                                              const matrix = new DOMMatrixReadOnly(style.transform);
                                              const currentTranslateY = matrix.m42 || 0;
                                              
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
                                                document.querySelectorAll('.hex-value').forEach(el => {
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
                                            const subtones = document.querySelectorAll('.subtone');
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
                                            
                                            // Make the first color active by default
                                            colorContainers[2].click();
                                          });