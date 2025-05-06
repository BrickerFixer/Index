document.addEventListener('DOMContentLoaded', function() {

  // Customization Panel
  const servicesBtn = document.querySelector('.header__action_type_srv');
  const customizationPanel = document.querySelector('.customization-panel');
  let isPanelOpen = false;

  servicesBtn.addEventListener('click', function(e) {
    e.preventDefault();
    isPanelOpen = !isPanelOpen;
    
    if (isPanelOpen) {
      customizationPanel.classList.add('expanded');
      servicesBtn.classList.add('header__action_pressed_yes');
    } else {
      customizationPanel.classList.remove('expanded');
      servicesBtn.classList.remove('header__action_pressed_yes');
    }
  });

  // Theme buttons (now by id)
  const themeLightBtn = document.getElementById('theme-btn-light');
  const themeDarkBtn = document.getElementById('theme-btn-dark');
  const themeSystemBtn = document.getElementById('theme-btn-system');
  if (themeLightBtn) themeLightBtn.addEventListener('click', function() {
    document.body.classList.remove('theme_dark');
    document.body.classList.add('theme_light');
    localStorage.setItem('theme', 'light');
  });
  if (themeDarkBtn) themeDarkBtn.addEventListener('click', function() {
    document.body.classList.remove('theme_light');
    document.body.classList.add('theme_dark');
    localStorage.setItem('theme', 'dark');
  });
  if (themeSystemBtn) themeSystemBtn.addEventListener('click', function() {
    document.body.classList.remove('theme_light', 'theme_dark');
    localStorage.setItem('theme', 'system');
  });

  // --- Background Preference Persistence ---
  function saveBackgroundPreference(type, url) {
    localStorage.setItem('bentoBgType', type);
    localStorage.setItem('bentoBgUrl', url);
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
      bgImage.style.display = 'none';
      bgVideo.src = '';
      bgVideo.style.display = 'none';
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
    }
  });

  // Custom CSS logic
  const cssInput = document.getElementById('custom-css-url');
  const cssBtn = document.getElementById('apply-custom-css');
  // Add reset button logic
  const cssResetBtn = document.getElementById('reset-custom-css');
  if (cssInput && cssBtn) {
    cssInput.value = loadCustomCssUrl();
    cssBtn.addEventListener('click', () => {
      const url = cssInput.value.trim();
      saveCustomCssUrl(url);
      applyCustomCss(url);
    });
  }
  if (cssResetBtn) {
    cssResetBtn.addEventListener('click', () => {
      resetCustomCss();
      if (cssInput) cssInput.value = '';
    });
  }
  // Apply on load if present
  const savedCssUrl = loadCustomCssUrl();
  if (savedCssUrl) applyCustomCss(savedCssUrl);
});

// Custom CSS functions
function saveCustomCssUrl(url) {
  localStorage.setItem('customCssUrl', url);
}

function loadCustomCssUrl() {
  return localStorage.getItem('customCssUrl') || '';
}

function applyCustomCss(url) {
  if (!url) return;
  let link = document.getElementById('custom-css-link');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'custom-css-link';
    document.head.appendChild(link);
  }
  link.href = url;
}

function resetCustomCss() {
  localStorage.removeItem('customCssUrl');
  const link = document.getElementById('custom-css-link');
  if (link) link.remove();
  // Optionally, reload the page to fully reset styles
  // location.reload();
}