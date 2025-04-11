
// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is an Elite Member
  const isEliteMember = localStorage.getItem('eliteChipMember') === 'true';
  const eliteChipBtn = document.querySelector('.elite-chip-btn');
  const exitBtn = document.querySelector('.exit-btn');
  
  if (isEliteMember) {
    eliteChipBtn.innerHTML = `
      <svg class="lucide lucide-shield"><use href="#shield"></use></svg>
      <span>Elite Member</span>
      <div class="exit-btn" title="Exit Elite Membership">
        <svg class="lucide lucide-log-out"><use href="#log-out"></use></svg>
      </div>
    `;
  } else {
    eliteChipBtn.innerHTML = `
      <svg class="lucide lucide-shield"><use href="#shield"></use></svg>
      <span>Elite Chip</span>
    `;
  }

  // Handle exit elite membership
  if (exitBtn) {
    exitBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      localStorage.removeItem('eliteChipMember');
      localStorage.removeItem('eliteChipUserDetails');
      alert('Elite Membership Cancelled');
      window.location.reload();
    });
  }

  // Search Tab Functionality
  const searchTabs = document.querySelectorAll('.search-tab');
  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Initialize Modals
  const jetGalleryModal = document.getElementById('jetGalleryModal');
  const charterModal = document.getElementById('charterModal');
  const eliteChipModal = document.getElementById('eliteChipModal');
  
  // Close buttons for modals
  const closeButtons = document.querySelectorAll('.close-button');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      jetGalleryModal.style.display = 'none';
      charterModal.style.display = 'none';
      eliteChipModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  });

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === jetGalleryModal) {
      jetGalleryModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    if (e.target === charterModal) {
      charterModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    if (e.target === eliteChipModal) {
      eliteChipModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Jet Gallery Modal
  const galleryButtons = document.querySelectorAll('.gallery-button');
  const prevButton = document.querySelector('.gallery-nav.prev');
  const nextButton = document.querySelector('.gallery-nav.next');
  let currentJet = null;
  let currentImageIndex = 0;
  
  // Sample Jet Gallery Data
  const jetGalleries = {
    'Citation X': [
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494426383302-7b9d36a1a028?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598016736404-19ff4b2836c5?q=80&w=1700&auto=format&fit=crop',
    ],
    'Gulfstream G650': [
      'https://images.unsplash.com/photo-1604342427263-11a3ab5c68e7?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525006878758-cf233a0932ab?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1480150458580-b97ebc75dbea?q=80&w=1700&auto=format&fit=crop',
    ]
  };

  galleryButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const jetCard = button.closest('.jet-card');
      const jetTitle = jetCard.querySelector('.jet-title').textContent;
      
      currentJet = jetTitle;
      currentImageIndex = 0;
      openGallery(currentJet, currentImageIndex);
    });
  });

  function openGallery(jetName, imageIndex) {
    if (!jetGalleries[jetName]) return;
    
    const images = jetGalleries[jetName];
    const mainImage = document.querySelector('.gallery-main-image');
    const jetNameEl = document.querySelector('.jet-name');
    const imageCountEl = document.querySelector('.image-count');
    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
    
    // Set main image
    mainImage.src = images[imageIndex];
    mainImage.alt = `${jetName} - image ${imageIndex + 1}`;
    
    // Set caption
    jetNameEl.textContent = jetName;
    imageCountEl.textContent = `Image ${imageIndex + 1} of ${images.length}`;
    
    // Create thumbnails
    thumbnailsContainer.innerHTML = '';
    images.forEach((image, idx) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = `gallery-thumbnail ${idx === imageIndex ? 'active' : ''}`;
      thumbnail.innerHTML = `<img src="${image}" alt="${jetName} thumbnail ${idx + 1}">`;
      
      thumbnail.addEventListener('click', () => {
        currentImageIndex = idx;
        updateGallery();
      });
      
      thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Show modal
    jetGalleryModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function updateGallery() {
    if (!currentJet) return;
    
    const images = jetGalleries[currentJet];
    const mainImage = document.querySelector('.gallery-main-image');
    const imageCountEl = document.querySelector('.image-count');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    
    // Update main image
    mainImage.src = images[currentImageIndex];
    mainImage.alt = `${currentJet} - image ${currentImageIndex + 1}`;
    
    // Update caption
    imageCountEl.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
    
    // Update thumbnails
    thumbnails.forEach((thumbnail, idx) => {
      if (idx === currentImageIndex) {
        thumbnail.classList.add('active');
      } else {
        thumbnail.classList.remove('active');
      }
    });
  }

  prevButton.addEventListener('click', () => {
    if (!currentJet) return;
    const images = jetGalleries[currentJet];
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateGallery();
  });

  nextButton.addEventListener('click', () => {
    if (!currentJet) return;
    const images = jetGalleries[currentJet];
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGallery();
  });

  // Charter Booking Modal
  const charterButtons = document.querySelectorAll('.charter-button');
  const charterForm = document.querySelector('.charter-form');
  const cancelButton = document.querySelector('.cancel-button');
  
  charterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const jetCard = button.closest('.jet-card');
      const jetTitle = jetCard.querySelector('.jet-title').textContent;
      const jetPrice = jetCard.querySelector('.jet-price').textContent;
      const jetImage = jetCard.querySelector('.jet-image img').src;
      const jetCapacityText = jetCard.querySelector('.jet-features li:first-child').textContent.trim();
      
      // Update charter modal with jet info
      document.querySelector('.jet-title').textContent = jetTitle;
      document.querySelector('.jet-price').textContent = jetPrice;
      document.querySelector('.jet-capacity').textContent = jetCapacityText;
      document.querySelector('.jet-thumbnail').src = jetImage;
      
      // Show modal
      charterModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      charterModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  if (charterForm) {
    charterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Charter booking submitted! This would process the booking in a real application.');
      charterModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Elite Chip Modal
  const eliteChipButton = document.querySelector('.elite-chip-btn');
  const continueButton = document.querySelector('.continue-button');
  const backButton = document.querySelector('.back-button');
  const maybeLaterButton = document.querySelector('.secondary-button');
  const eliteForm = document.querySelector('.elite-form');
  const step1 = document.querySelector('.step-1');
  const step2 = document.querySelector('.step-2');
  
  if (eliteChipButton && !isEliteMember) {
    eliteChipButton.addEventListener('click', () => {
      eliteChipModal.style.display = 'flex';
      step1.style.display = 'block';
      step2.style.display = 'none';
      document.body.style.overflow = 'hidden';
    });
  }

  if (continueButton) {
    continueButton.addEventListener('click', () => {
      step1.style.display = 'none';
      step2.style.display = 'block';
    });
  }

  if (backButton) {
    backButton.addEventListener('click', () => {
      step1.style.display = 'block';
      step2.style.display = 'none';
    });
  }

  if (maybeLaterButton) {
    maybeLaterButton.addEventListener('click', () => {
      eliteChipModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  if (eliteForm) {
    eliteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        firstName: eliteForm.querySelector('input[placeholder="John"]').value,
        lastName: eliteForm.querySelector('input[placeholder="Doe"]').value,
        email: eliteForm.querySelector('input[placeholder="john.doe@example.com"]').value,
        phone: eliteForm.querySelector('input[placeholder="1234567890"]').value
      };
      
      // Save to localStorage
      localStorage.setItem('eliteChipUserDetails', JSON.stringify(formData));
      localStorage.setItem('eliteChipMember', 'true');
      
      alert('Welcome to Elite Chip! You\'ve successfully joined our premium loyalty program.');
      eliteChipModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      window.location.reload();
    });
  }

  // Search Button Functionality
  const searchButton = document.querySelector('.search-button');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      alert('This would search for flights in a real application!');
    });
  }
});
