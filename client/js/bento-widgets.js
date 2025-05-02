document.addEventListener('DOMContentLoaded', function() {
  const editToggleBtn = document.getElementById('edit-toggle');
  const addBlockBtn = document.getElementById('add-block');
  const bentoContainer = document.querySelector('.bento-container');
  const addBlockMenu = document.getElementById('add-block-menu');
  const overlay = document.getElementById('overlay');
  
  let isEditMode = false;
  let draggedItem = null;
  let placeholder = null;
  
  // Toggle edit mode
  editToggleBtn.addEventListener('click', function() {
    isEditMode = !isEditMode;
    
    if (isEditMode) {
      document.body.classList.add('edit-mode');
      editToggleBtn.textContent = 'Save Layout';
      addBlockBtn.style.display = 'inline-block';
      enableDragAndDrop();
    } else {
      document.body.classList.remove('edit-mode');
      editToggleBtn.textContent = 'Edit Layout';
      addBlockBtn.style.display = 'none';
      disableDragAndDrop();
    }
  });
  
  // Open add block menu
  addBlockBtn.addEventListener('click', function() {
    addBlockMenu.classList.add('visible');
    overlay.classList.add('visible');
  });
  
  // Close menu when clicking overlay
  overlay.addEventListener('click', function() {
    addBlockMenu.classList.remove('visible');
    overlay.classList.remove('visible');
  });
  
  // Set up drag and drop functionality
  function enableDragAndDrop() {
    const bentoBlocks = document.querySelectorAll('.bento-block');
    
    bentoBlocks.forEach(block => {
      block.setAttribute('draggable', 'true');
      
      block.addEventListener('dragstart', handleDragStart);
      block.addEventListener('dragend', handleDragEnd);
      block.addEventListener('dragenter', handleDragEnter);
      block.addEventListener('dragleave', handleDragLeave);
      block.addEventListener('dragover', handleDragOver);
      block.addEventListener('drop', handleDrop);
      
      // Remove button functionality
      const removeBtn = block.querySelector('.remove-btn');
      removeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        block.remove();
      });
    });
  }
  
  function disableDragAndDrop() {
    const bentoBlocks = document.querySelectorAll('.bento-block');
    
    bentoBlocks.forEach(block => {
      block.removeAttribute('draggable');
      block.removeEventListener('dragstart', handleDragStart);
      block.removeEventListener('dragend', handleDragEnd);
      block.removeEventListener('dragenter', handleDragEnter);
      block.removeEventListener('dragleave', handleDragLeave);
      block.removeEventListener('dragover', handleDragOver);
      block.removeEventListener('drop', handleDrop);
    });
  }
  
  function handleDragStart(e) {
    draggedItem = this;
    
    // Create a placeholder with the same size as the dragged item
    placeholder = document.createElement('div');
    placeholder.className = this.className + ' drag-placeholder';
    
    // Get all classes that are not size-related or bento-block
    const otherClasses = Array.from(this.classList).filter(cls => 
      !cls.startsWith('size-') && cls !== 'bento-block' && cls !== 'dragging');
    
    // Add those classes to the placeholder
    otherClasses.forEach(cls => placeholder.classList.add(cls));
    
    // Store original element data
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    
    // Add dragging class to original
    this.classList.add('dragging');
    
    // Set timeout to allow the drag image to be set before changing appearance
    setTimeout(() => {
      // You can modify the appearance of the dragged item here
    }, 0);
  }
  
  function handleDragEnd(e) {
    // Remove drag styling
    this.classList.remove('dragging');
    
    // Remove any remaining placeholders
    const placeholders = document.querySelectorAll('.drag-placeholder');
    placeholders.forEach(el => el.remove());
    
    // Remove drag-over styling from all blocks
    const bentoBlocks = document.querySelectorAll('.bento-block');
    bentoBlocks.forEach(block => block.classList.remove('drag-over'));
  }
  
  function handleDragEnter(e) {
    e.preventDefault();
    if (this !== draggedItem) {
      this.classList.add('drag-over');
      
      // Find the position where to insert the placeholder
      const targetPosition = Array.from(bentoContainer.children).indexOf(this);
      
      // Remove any existing placeholders
      const existingPlaceholders = document.querySelectorAll('.drag-placeholder');
      existingPlaceholders.forEach(el => el.remove());
      
      // Insert the placeholder at the appropriate position
      if (targetPosition >= 0) {
        bentoContainer.insertBefore(placeholder, this);
      }
    }
  }
  
  function handleDragLeave(e) {
    this.classList.remove('drag-over');
  }
  
  function handleDragOver(e) {
    e.preventDefault();
    return false;
  }
  
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove drag-over styling
    this.classList.remove('drag-over');
    
    if (draggedItem && this !== draggedItem) {
      // Get the position of the target
      const targetPosition = Array.from(bentoContainer.children).indexOf(this);
      
      // Remove any placeholders
      const placeholders = document.querySelectorAll('.drag-placeholder');
      placeholders.forEach(el => el.remove());
      
      // Remove the dragged item from its current position
      bentoContainer.removeChild(draggedItem);
      
      // Insert it at the target position
      bentoContainer.insertBefore(draggedItem, this);
    }
    
    draggedItem.classList.remove('dragging');
    return false;
  }
  
  // Add new blocks
  const blockOptions = document.querySelectorAll('.block-option');
  
  blockOptions.forEach(option => {
    option.addEventListener('click', function() {
      const blockType = this.getAttribute('data-type');
      const blockSize = this.getAttribute('data-size');
      
      addNewBlock(blockType, blockSize);
      
      addBlockMenu.classList.remove('visible');
      overlay.classList.remove('visible');
    });
  });
  
  function addNewBlock(type, size) {
    const newBlock = document.createElement('div');
    newBlock.className = `bento-block ${size}`;
    newBlock.setAttribute('data-type', type);
    newBlock.setAttribute('draggable', 'true');
    
    // Generate basic content based on block type
    let content = '';
    
    switch(type) {
      case 'news':
        content = `<h3>News</h3><div>Latest news content here</div>`;
        break;
      case 'logo':
        content = `<h3>BENTO</h3>`;
        break;
      case 'search':
        content = `<h3>Search</h3><input type="text" placeholder="Search...">`;
        break;
      case 'weather':
        content = `<h3>Weather</h3><div>22°C Sunny</div>`;
        break;
      case 'map':
        content = `<h3>Map</h3><div>Region suggestions: Taxi, Metro, Roads</div>`;
        break;
      case 'suggestions':
        content = `<h3>Suggestions</h3><div>Content based on your interests</div>`;
        break;
      case 'tv':
        content = `<h3>TV Guide</h3><div>Tonight's programme schedule</div>`;
        break;
      case 'services':
        content = `<h3>Services</h3><div>Banking, Healthcare, Transport</div>`;
        break;
      case 'stocks':
        content = `<h3>Stocks</h3><div>AAPL: +1.2%, MSFT: +0.8%, GOOGL: -0.5%</div>`;
        break;
    }
    
    // Add remove button
    content += '<button class="remove-btn">×</button>';
    
    newBlock.innerHTML = content;
    bentoContainer.appendChild(newBlock);
    
    // Add drag and drop functionality to the new block
    newBlock.addEventListener('dragstart', handleDragStart);
    newBlock.addEventListener('dragend', handleDragEnd);
    newBlock.addEventListener('dragenter', handleDragEnter);
    newBlock.addEventListener('dragleave', handleDragLeave);
    newBlock.addEventListener('dragover', handleDragOver);
    newBlock.addEventListener('drop', handleDrop);
    
    // Add remove functionality
    const removeBtn = newBlock.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      newBlock.remove();
    });
  }

  // Customization Panel
  const servicesBtn = document.querySelector('.header__action_type_srv');
  const customizationPanel = document.querySelector('.customization-panel');
  let isPanelOpen = false;

  servicesBtn.addEventListener('click', function(e) {
    e.preventDefault();
    isPanelOpen = !isPanelOpen;
    customizationPanel.style.display = 'block';
    
    if (isPanelOpen) {
      customizationPanel.classList.add('expanded');
      servicesBtn.classList.add('header__action_pressed_yes');
    } else {
      customizationPanel.classList.remove('expanded');
      servicesBtn.classList.remove('header__action_pressed_yes');
      setTimeout(() => {
        if (!isPanelOpen) customizationPanel.style.display = 'none';
      }, 300);
    }
  });

  // Theme buttons
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.body.className = document.body.className.replace(/theme_[^\s]+/g, '');
      document.body.classList.add(`theme_${btn.dataset.theme}`);
    });
  });

  // Background buttons
  const bgButtons = document.querySelectorAll('.bg-btn');
  bgButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const bgType = btn.getAttribute('data-bg');
        document.body.setAttribute('data-bg', bgType);
        
        if (bgType === 'image' || bgType === 'video') {
            document.querySelector('.bg-options').style.display = 'block';
        } else {
            document.querySelector('.bg-options').style.display = 'none';
        }
    });
  });

  document.getElementById('apply-bg').addEventListener('click', () => {
    const url = document.getElementById('bg-url').value;
    const bgType = document.body.getAttribute('data-bg');
    
    if (bgType === 'image') {
        document.querySelector('.bg-image').style.backgroundImage = `url(${url})`;
    } else if (bgType === 'video') {
        const video = document.querySelector('.bg-video');
        video.src = url;
        video.play();
    }
  });

  // Close panel when clicking outside
  document.addEventListener('click', function(e) {
    if (isPanelOpen && !customizationPanel.contains(e.target) && !servicesBtn.contains(e.target)) {
      isPanelOpen = false;
      customizationPanel.classList.remove('expanded');
      servicesBtn.classList.remove('header__action_pressed_yes');
      setTimeout(() => {
        if (!isPanelOpen) customizationPanel.style.display = 'none';
      }, 300);
    }
  });
});