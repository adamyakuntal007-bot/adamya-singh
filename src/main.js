import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  setupWorksFilter();
  setupAboutReadMore();
  setupContactForm();
  setupMockupFrameToggle();
  setupSmoothScroll();
  setupDoodlesDolphin();
});

// Category works filter setup
function setupWorksFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active btn styles
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#00DFD8]', 'text-black', 'font-semibold');
        b.classList.add('bg-[#1F2128]', 'text-gray-400');
      });
      btn.classList.add('bg-[#00DFD8]', 'text-black', 'font-semibold');
      btn.classList.remove('bg-[#1F2128]', 'text-gray-400');

      const filterValue = btn.getAttribute('data-filter') || 'all';

      // Animate and show/hide grid items
      workCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category') || '';

        if (filterValue === 'all' || itemCategory.toLowerCase() === filterValue.toLowerCase()) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// About me expandable description
function setupAboutReadMore() {
  const readMoreBtn = document.getElementById('read-more-btn');
  const expandableText = document.getElementById('expandable-text');

  if (readMoreBtn && expandableText) {
    readMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = expandableText.classList.contains('hidden');
      
      if (isExpanded) {
        expandableText.classList.remove('hidden');
        readMoreBtn.innerHTML = 'Read less <span class="ml-1">↑</span>';
      } else {
        expandableText.classList.add('hidden');
        readMoreBtn.innerHTML = 'Read more <span class="ml-1">↓</span>';
      }
    });
  }
}

// Contact Form interactive validation and response toast
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showStatus('Please fill in all form fields.', 'error');
        return;
      }

      if (!validateEmail(emailInput.value.trim())) {
        showStatus('Please provide a valid email address.', 'error');
        return;
      }

      // Simulate a beautiful sending state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="animate-spin inline-block w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full"></span>Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showStatus('Your message was sent successfully! Saul will get back to you shortly.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `p-4 rounded-lg text-sm font-medium transition-all ${
      type === 'success' 
        ? 'bg-teal-900/30 text-[#00DFD8] border border-teal-500/20' 
        : 'bg-red-900/30 text-red-400 border border-red-500/20'
    }`;
    formStatus.style.opacity = '1';

    setTimeout(() => {
      formStatus.style.opacity = '0';
    }, 7000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// Toggle layout framing presentation look exactly like mockup
function setupMockupFrameToggle() {
  const toggleBtn = document.getElementById('toggle-mockup-frame');
  const viewportFrame = document.getElementById('viewport-frame');
  const presentationContainer = document.getElementById('presentation-container');

  if (toggleBtn && viewportFrame && presentationContainer) {
    toggleBtn.addEventListener('click', () => {
      const isFramed = presentationContainer.classList.contains('bg-[#008F85]');
      if (isFramed) {
        // Switch to pure standard web view
        presentationContainer.classList.remove('bg-[#008F85]', 'p-4', 'sm:p-8', 'md:p-12', 'min-h-screen', 'flex', 'items-center', 'justify-center');
        viewportFrame.classList.remove('max-w-[1440px]', 'rounded-3xl', 'shadow-[0_25px_100px_rgba(0,0,0,0.8)]', 'border-8', 'border-stone-900/40', 'overflow-hidden');
        toggleBtn.innerHTML = '<span class="mr-1.5">📱</span> Mockup View';
      } else {
        // Switch back to screenshot style presentations
        presentationContainer.classList.add('bg-[#008F85]', 'p-4', 'sm:p-8', 'md:p-12', 'min-h-screen', 'flex', 'items-center', 'justify-center');
        viewportFrame.classList.add('max-w-[1440px]', 'rounded-3xl', 'shadow-[0_25px_100px_rgba(0,0,0,0.8)]', 'border-8', 'border-stone-900/40', 'overflow-hidden');
        toggleBtn.innerHTML = '<span class="mr-1.5">💻</span> Fullscreen View';
      }
    });
  }
}

// Intercept clicks to do beautiful scroll behavior
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Dynamic interactive mouse cursor float effect for floating doodles
function setupDoodlesDolphin() {
  const floaters = document.querySelectorAll('.mouse-tracker');
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    floaters.forEach(floater => {
      const parent = floater.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const x = (mouseX - rect.left - rect.width / 2) * 0.04;
      const y = (mouseY - rect.top - rect.height / 2) * 0.04;
      floater.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}
