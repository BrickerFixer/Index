document.addEventListener('DOMContentLoaded', function() {

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