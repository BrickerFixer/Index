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

  // --- Background Preference Persistence ---
  function saveBackgroundPreference(type, url) {
    const bgPref = { type, url };
    localStorage.setItem('bentoBgPref', JSON.stringify(bgPref));
  }

  function loadBackgroundPreference() {
    const type = localStorage.getItem('bentoBgType') || 'none';
    const url = localStorage.getItem('bentoBgUrl') || '';
    console.log('[BG] loadBackgroundPreference', { type, url }); // DEBUG
    applyBackground(type, url);
  }

  function applyBackground(type, url) {
    const bgImage = document.querySelector('.bg-image');
    const bgVideo = document.querySelector('.bg-video');
    console.log('[BG] applyBackground', { type, url, bgImage, bgVideo }); // DEBUG
    if (!bgImage || !bgVideo) return;
    bgImage.style.display = 'none';
    bgVideo.style.display = 'none';
    document.body.style.background = '';
    if (type === 'image' && url) {
      bgImage.style.backgroundImage = `url('${url}')`;
      bgImage.style.display = '';
    } else if (type === 'video' && url) {
      bgVideo.src = url;
      bgVideo.style.display = '';
      bgVideo.play();
    } else {
      // None
      bgImage.style.backgroundImage = '';
      bgVideo.src = '';
    }
  }

  loadBackgroundPreference();

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
            saveBackgroundPreference(bgType, '');
            applyBackground(bgType, '');
        }
    });
  });

  const applyBgBtn = document.getElementById('apply-bg');
  if (applyBgBtn) {
    applyBgBtn.addEventListener('click', () => {
      const url = document.getElementById('bg-url').value;
      const bgType = document.body.getAttribute('data-bg');
      saveBackgroundPreference(bgType, url);
      applyBackground(bgType, url);
    });
  }

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