
// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is an Elite Member
  const isEliteMember = localStorage.getItem('eliteChipMember') === 'true';
  const eliteChipBtn = document.querySelector('.elite-chip-btn');
  
  // Setup Elite Chip button state based on membership
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
  document.addEventListener('click', function(e) {
    if (e.target.closest('.exit-btn')) {
      e.stopPropagation();
      localStorage.removeItem('eliteChipMember');
      localStorage.removeItem('eliteChipUserDetails');
      alert('Elite Membership Cancelled');
      window.location.reload();
    }
  });

  // Navigation Links - Make all buttons work
  const navLinks = {
    'home': '/',
    'flights': '/flights.html',
    'charter': '/charter.html',
    'deals': '/deals.html',
    'about': '/about.html',
    'contact': '/contact.html'
  };

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      if (page && navLinks[page]) {
        window.location.href = navLinks[page];
      }
    });
  });

  // Make mobile menu work
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
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
      if (jetGalleryModal) jetGalleryModal.style.display = 'none';
      if (charterModal) charterModal.style.display = 'none';
      if (eliteChipModal) eliteChipModal.style.display = 'none';
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
  
  // Sample Jet Gallery Data - expanded with more jets
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
    ],
    'Phenom 300': [
      'https://images.unsplash.com/photo-1583498772179-bdc44b3cbbf2?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583498771835-a4a697c5ebc7?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588006853708-62549578e883?q=80&w=1700&auto=format&fit=crop',
    ],
    'Legacy 500': [
      'https://images.unsplash.com/photo-1599199948930-3db1ca247ed7?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499063078284-f78f7d89616a?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599200188300-eaa5169da561?q=80&w=1700&auto=format&fit=crop',
    ],
    'Falcon 8X': [
      'https://images.unsplash.com/photo-1595733139928-a19211eb3818?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597218364308-3f9ad53fc8a3?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599200033854-d393dbe27e76?q=80&w=1700&auto=format&fit=crop',
    ],
    'Learjet 75': [
      'https://images.unsplash.com/photo-1598027575809-c13b45fc5872?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596394147449-2e26ce9ff427?q=80&w=1700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525449635671-112ffa6b5412?q=80&w=1700&auto=format&fit=crop',
    ]
  };

  if (galleryButtons) {
    galleryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const jetCard = button.closest('.jet-card');
        const jetTitle = jetCard.querySelector('.jet-title').textContent;
        
        currentJet = jetTitle;
        currentImageIndex = 0;
        openGallery(currentJet, currentImageIndex);
      });
    });
  }

  function openGallery(jetName, imageIndex) {
    if (!jetGalleries[jetName]) return;
    
    const images = jetGalleries[jetName];
    const mainImage = document.querySelector('.gallery-main-image');
    const jetNameEl = document.querySelector('.jet-name');
    const imageCountEl = document.querySelector('.image-count');
    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
    
    // Set main image
    if (mainImage) mainImage.src = images[imageIndex];
    if (mainImage) mainImage.alt = `${jetName} - image ${imageIndex + 1}`;
    
    // Set caption
    if (jetNameEl) jetNameEl.textContent = jetName;
    if (imageCountEl) imageCountEl.textContent = `Image ${imageIndex + 1} of ${images.length}`;
    
    // Create thumbnails
    if (thumbnailsContainer) {
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
    }
    
    // Show modal
    if (jetGalleryModal) {
      jetGalleryModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function updateGallery() {
    if (!currentJet) return;
    
    const images = jetGalleries[currentJet];
    const mainImage = document.querySelector('.gallery-main-image');
    const imageCountEl = document.querySelector('.image-count');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    
    // Update main image
    if (mainImage) {
      mainImage.src = images[currentImageIndex];
      mainImage.alt = `${currentJet} - image ${currentImageIndex + 1}`;
    }
    
    // Update caption
    if (imageCountEl) {
      imageCountEl.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
    }
    
    // Update thumbnails
    thumbnails.forEach((thumbnail, idx) => {
      if (idx === currentImageIndex) {
        thumbnail.classList.add('active');
      } else {
        thumbnail.classList.remove('active');
      }
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (!currentJet) return;
      const images = jetGalleries[currentJet];
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      updateGallery();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (!currentJet) return;
      const images = jetGalleries[currentJet];
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateGallery();
    });
  }

  // Charter Booking Modal
  const charterButtons = document.querySelectorAll('.charter-button');
  const charterForm = document.querySelector('.charter-form');
  const cancelButton = document.querySelector('.cancel-button');
  
  if (charterButtons) {
    charterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const jetCard = button.closest('.jet-card');
        const jetTitle = jetCard.querySelector('.jet-title').textContent;
        const jetPrice = jetCard.querySelector('.jet-price').textContent;
        const jetImage = jetCard.querySelector('.jet-image img').src;
        const jetCapacityText = jetCard.querySelector('.jet-features li:first-child').textContent.trim();
        
        // Update charter modal with jet info
        const modalTitle = document.querySelector('#charterModal .jet-title');
        const modalPrice = document.querySelector('#charterModal .jet-price');
        const modalCapacity = document.querySelector('#charterModal .jet-capacity');
        const modalThumbnail = document.querySelector('#charterModal .jet-thumbnail');
        
        if (modalTitle) modalTitle.textContent = jetTitle;
        if (modalPrice) modalPrice.textContent = jetPrice;
        if (modalCapacity) modalCapacity.textContent = jetCapacityText;
        if (modalThumbnail) modalThumbnail.src = jetImage;
        
        // Show modal
        if (charterModal) {
          charterModal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      if (charterModal) {
        charterModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (charterForm) {
    charterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Charter booking submitted! This would process the booking in a real application.');
      if (charterModal) {
        charterModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
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
      if (eliteChipModal) {
        eliteChipModal.style.display = 'flex';
        if (step1) step1.style.display = 'block';
        if (step2) step2.style.display = 'none';
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (continueButton) {
    continueButton.addEventListener('click', () => {
      if (step1) step1.style.display = 'none';
      if (step2) step2.style.display = 'block';
    });
  }

  if (backButton) {
    backButton.addEventListener('click', () => {
      if (step1) step1.style.display = 'block';
      if (step2) step2.style.display = 'none';
    });
  }

  if (maybeLaterButton) {
    maybeLaterButton.addEventListener('click', () => {
      if (eliteChipModal) {
        eliteChipModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (eliteForm) {
    eliteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const firstName = eliteForm.querySelector('input[placeholder="John"]').value;
      const lastName = eliteForm.querySelector('input[placeholder="Doe"]').value;
      const email = eliteForm.querySelector('input[placeholder="john.doe@example.com"]').value;
      const phone = eliteForm.querySelector('input[placeholder="1234567890"]').value;
      
      const formData = { firstName, lastName, email, phone };
      
      // Save to localStorage
      localStorage.setItem('eliteChipUserDetails', JSON.stringify(formData));
      localStorage.setItem('eliteChipMember', 'true');
      
      alert('Welcome to Elite Chip! You\'ve successfully joined our premium loyalty program.');
      if (eliteChipModal) {
        eliteChipModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
      window.location.reload();
    });
  }

  // Flight Search Functionality
  const fromInput = document.querySelector('#from');
  const toInput = document.querySelector('#to');
  const fromSuggestionsList = document.querySelector('#fromSuggestions');
  const toSuggestionsList = document.querySelector('#toSuggestions');
  const searchButton = document.querySelector('.search-button');

  // Sample airports data
  const airports = [
    { code: 'DEL', city: 'New Delhi', country: 'India' },
    { code: 'BOM', city: 'Mumbai', country: 'India' },
    { code: 'MAA', city: 'Chennai', country: 'India' },
    { code: 'BLR', city: 'Bengaluru', country: 'India' },
    { code: 'HYD', city: 'Hyderabad', country: 'India' },
    { code: 'CCU', city: 'Kolkata', country: 'India' },
    { code: 'COK', city: 'Kochi', country: 'India' },
    { code: 'PNQ', city: 'Pune', country: 'India' },
    { code: 'JFK', city: 'New York', country: 'United States' },
    { code: 'LHR', city: 'London', country: 'United Kingdom' },
    { code: 'CDG', city: 'Paris', country: 'France' },
    { code: 'HND', city: 'Tokyo', country: 'Japan' },
    { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates' },
    { code: 'SIN', city: 'Singapore', country: 'Singapore' },
    { code: 'SYD', city: 'Sydney', country: 'Australia' },
    { code: 'YYZ', city: 'Toronto', country: 'Canada' },
    { code: 'HKG', city: 'Hong Kong', country: 'China' },
    { code: 'FRA', city: 'Frankfurt', country: 'Germany' },
    { code: 'AMS', city: 'Amsterdam', country: 'Netherlands' },
    { code: 'BCN', city: 'Barcelona', country: 'Spain' },
    { code: 'ICN', city: 'Seoul', country: 'South Korea' },
  ];

  // Handle input in the from field
  if (fromInput) {
    fromInput.addEventListener('input', () => {
      const value = fromInput.value.toLowerCase();
      
      if (value.length > 1 && fromSuggestionsList) {
        // Filter airports based on input
        const filtered = airports.filter(airport => 
          airport.city.toLowerCase().includes(value) || 
          airport.code.toLowerCase().includes(value)
        );
        
        // Display suggestions
        fromSuggestionsList.innerHTML = '';
        fromSuggestionsList.classList.remove('hidden');
        
        filtered.forEach(airport => {
          const div = document.createElement('div');
          div.className = 'p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100';
          div.innerHTML = `
            <div class="font-medium text-gray-800">${airport.city} (${airport.code})</div>
            <div class="text-sm text-gray-500">${airport.country}</div>
          `;
          
          div.addEventListener('click', () => {
            fromInput.value = `${airport.city} (${airport.code})`;
            fromInput.dataset.code = airport.code;
            fromSuggestionsList.classList.add('hidden');
          });
          
          fromSuggestionsList.appendChild(div);
        });
      } else if (fromSuggestionsList) {
        fromSuggestionsList.classList.add('hidden');
      }
    });
  }

  // Handle input in the to field
  if (toInput) {
    toInput.addEventListener('input', () => {
      const value = toInput.value.toLowerCase();
      
      if (value.length > 1 && toSuggestionsList) {
        // Filter airports based on input
        const filtered = airports.filter(airport => 
          airport.city.toLowerCase().includes(value) || 
          airport.code.toLowerCase().includes(value)
        );
        
        // Display suggestions
        toSuggestionsList.innerHTML = '';
        toSuggestionsList.classList.remove('hidden');
        
        filtered.forEach(airport => {
          const div = document.createElement('div');
          div.className = 'p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100';
          div.innerHTML = `
            <div class="font-medium text-gray-800">${airport.city} (${airport.code})</div>
            <div class="text-sm text-gray-500">${airport.country}</div>
          `;
          
          div.addEventListener('click', () => {
            toInput.value = `${airport.city} (${airport.code})`;
            toInput.dataset.code = airport.code;
            toSuggestionsList.classList.add('hidden');
          });
          
          toSuggestionsList.appendChild(div);
        });
      } else if (toSuggestionsList) {
        toSuggestionsList.classList.add('hidden');
      }
    });
  }

  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (fromSuggestionsList && !fromInput.contains(e.target) && !fromSuggestionsList.contains(e.target)) {
      fromSuggestionsList.classList.add('hidden');
    }
    
    if (toSuggestionsList && !toInput.contains(e.target) && !toSuggestionsList.contains(e.target)) {
      toSuggestionsList.classList.add('hidden');
    }
  });

  // Swap locations
  const swapButton = document.querySelector('.swap-button');
  if (swapButton && fromInput && toInput) {
    swapButton.addEventListener('click', () => {
      const fromValue = fromInput.value;
      const fromCode = fromInput.dataset.code;
      const toValue = toInput.value;
      const toCode = toInput.dataset.code;
      
      fromInput.value = toValue;
      fromInput.dataset.code = toCode;
      toInput.value = fromValue;
      toInput.dataset.code = fromCode;
    });
  }

  // Search button functionality
  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get search form data
      const fromCode = fromInput ? fromInput.dataset.code : '';
      const toCode = toInput ? toInput.dataset.code : '';
      const departureDate = document.querySelector('#departure') ? document.querySelector('#departure').value : '';
      const returnDate = document.querySelector('#return') ? document.querySelector('#return').value : '';
      const passengersInput = document.querySelector('#passengers') ? document.querySelector('#passengers').value : '1 Adult, Economy';
      
      // Validate form
      if (!fromCode || !toCode) {
        alert('Please select departure and destination airports');
        return;
      }
      
      if (!departureDate) {
        alert('Please select a departure date');
        return;
      }
      
      // Store search data in localStorage
      const searchData = {
        from: fromInput.value,
        fromCode,
        to: toInput.value,
        toCode,
        departureDate,
        returnDate,
        passengers: passengersInput
      };
      
      localStorage.setItem('flightSearchData', JSON.stringify(searchData));
      
      // Redirect to flights page
      window.location.href = '/flights.html';
    });
  }

  // Check if we're on the flights page and should display search results
  const flightResultsContainer = document.querySelector('#flightResults');
  if (flightResultsContainer) {
    const searchData = JSON.parse(localStorage.getItem('flightSearchData') || '{}');
    
    // Display search summary
    const searchSummary = document.querySelector('#searchSummary');
    if (searchSummary && searchData.from) {
      searchSummary.innerHTML = `
        <div class="bg-white rounded-lg shadow p-4 mb-6">
          <h2 class="text-lg font-semibold mb-2">Your Search</h2>
          <div class="flex flex-wrap gap-y-2">
            <div class="flex items-center mr-6">
              <span class="text-gray-500 mr-1">From:</span>
              <span class="font-medium">${searchData.from || ''}</span>
            </div>
            <div class="flex items-center mr-6">
              <span class="text-gray-500 mr-1">To:</span>
              <span class="font-medium">${searchData.to || ''}</span>
            </div>
            <div class="flex items-center mr-6">
              <span class="text-gray-500 mr-1">Date:</span>
              <span class="font-medium">${searchData.departureDate || ''}</span>
              ${searchData.returnDate ? `<span class="font-medium"> - ${searchData.returnDate}</span>` : ''}
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 mr-1">Passengers:</span>
              <span class="font-medium">${searchData.passengers || '1 Adult, Economy'}</span>
            </div>
          </div>
        </div>
      `;
    }
    
    // Generate 100+ flights
    const generateRandomFlights = (count) => {
      const airlines = ['FlyElite Airways', 'IndiaAir', 'SkyConnect', 'BlueSky Airlines', 'Velocity Air', 'AirAsia', 'Indigo', 'SpiceJet', 'Vistara', 'Air India'];
      const flights = [];
      
      for (let i = 0; i < count; i++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const flightNo = airline.substring(0, 2).toUpperCase() + Math.floor(Math.random() * 900 + 100);
        
        // Random departure time (6 AM to 11 PM)
        const deptHour = Math.floor(Math.random() * 18 + 6);
        const deptMin = Math.floor(Math.random() * 60);
        const departureTime = `${deptHour.toString().padStart(2, '0')}:${deptMin.toString().padStart(2, '0')}`;
        
        // Random duration (1h to 4h)
        const durationHours = Math.floor(Math.random() * 3 + 1);
        const durationMins = Math.floor(Math.random() * 60);
        
        // Calculate arrival time
        let arrHour = deptHour + durationHours;
        let arrMin = deptMin + durationMins;
        if (arrMin >= 60) {
          arrHour += 1;
          arrMin -= 60;
        }
        if (arrHour >= 24) {
          arrHour -= 24;
        }
        const arrivalTime = `${arrHour.toString().padStart(2, '0')}:${arrMin.toString().padStart(2, '0')}`;
        
        // Random price (3000 to 10000)
        const price = Math.floor(Math.random() * 7000 + 3000);
        
        // Random stops (0, 1, or 2)
        const stops = Math.floor(Math.random() * 3);
        
        // Create flight object
        const flight = {
          id: i + 1,
          airline,
          flightNo,
          departure: {
            city: searchData.from ? searchData.from.split(' (')[0] : 'Mumbai',
            code: searchData.fromCode || 'BOM',
            time: departureTime,
            date: searchData.departureDate || '2025-04-15'
          },
          arrival: {
            city: searchData.to ? searchData.to.split(' (')[0] : 'Delhi',
            code: searchData.toCode || 'DEL',
            time: arrivalTime,
            date: searchData.departureDate || '2025-04-15'
          },
          duration: `${durationHours}h ${durationMins}m`,
          price,
          stops,
          stopInfo: stops > 0 ? {
            city: stops === 1 ? 'Pune' : 'Pune, Bangalore',
            duration: stops === 1 ? '45m' : '1h 30m'
          } : null,
          currency: '₹'
        };
        
        flights.push(flight);
      }
      
      // Sort by price (lowest first)
      flights.sort((a, b) => a.price - b.price);
      
      return flights;
    };
    
    // Generate 100+ flights
    const flights = generateRandomFlights(100);
    
    // Format time (24h to 12h)
    const formatTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };
    
    // Display flights
    if (flights.length > 0) {
      let flightsHTML = '';
      
      flights.forEach((flight) => {
        flightsHTML += `
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 transition-all duration-300 hover:shadow-md">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div class="flex items-center mb-4 md:mb-0">
                <div class="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mr-4">
                  <span class="text-primary-700 font-semibold">${flight.airline.substring(0, 2)}</span>
                </div>
                <div>
                  <p class="font-medium">${flight.airline}</p>
                  <p class="text-sm text-gray-500">${flight.flightNo}</p>
                </div>
              </div>
              
              <div class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 w-full md:w-auto mb-4 md:mb-0">
                <div class="text-center">
                  <p class="text-xl font-semibold">${formatTime(flight.departure.time)}</p>
                  <p class="text-sm text-gray-500">${flight.departure.code}</p>
                </div>
                
                <div class="flex flex-col items-center">
                  <p class="text-xs text-gray-500 mb-1">${flight.duration}</p>
                  <div class="relative w-24 md:w-32">
                    <div class="absolute top-1/2 w-full h-px bg-gray-300"></div>
                    <div class="absolute left-0 -mt-1 w-2 h-2 rounded-full bg-gray-400"></div>
                    <div class="absolute right-0 -mt-1 w-2 h-2 rounded-full bg-gray-400"></div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">
                    ${flight.stops === 0 ? 'Direct' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                  </p>
                </div>
                
                <div class="text-center">
                  <p class="text-xl font-semibold">${formatTime(flight.arrival.time)}</p>
                  <p class="text-sm text-gray-500">${flight.arrival.code}</p>
                </div>
              </div>
              
              <div class="flex flex-col items-end w-full md:w-auto">
                <p class="text-2xl font-bold text-primary-600">${flight.currency}${flight.price}</p>
                <button
                  class="mt-2 px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-all duration-300 w-full md:w-auto flex items-center justify-center"
                >
                  <span>Select</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
            
            ${flight.stops > 0 && flight.stopInfo ? `
              <div class="mt-3 pt-3 border-t border-gray-200">
                <p class="text-sm text-gray-600">
                  <span class="font-medium">Stops:</span> ${flight.stopInfo.city} (${flight.stopInfo.duration} layover)
                </p>
              </div>
            ` : ''}
          </div>
        `;
      });
      
      flightResultsContainer.innerHTML = flightsHTML;
    }
  }
});

