document.addEventListener('DOMContentLoaded', () => {
  // --- SPLASH SCREEN ---
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    window.addEventListener('load', () => {
      splashScreen.classList.add('fade-out');
      splashScreen.addEventListener('transitionend', () => splashScreen.remove());
    });
  }
  
  // --- TESTIMONIAL CAROUSEL ---
  const carousel = document.querySelector('.testimonial-list');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const cards = document.querySelectorAll('.depo-card');

  if (!carousel || !leftArrow || !rightArrow || cards.length === 0) {
    console.warn('⚠️ Carrossel ou setas não encontrados.');
  } else {
    const gap = parseFloat(getComputedStyle(carousel).gap || '80');
    const cardWidth = cards[0].offsetWidth;
    const scrollAmount = cardWidth + gap;

    const scrollCarousel = (direction) => {
      carousel.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
    };

    rightArrow.addEventListener('click', () => scrollCarousel(1));
    leftArrow.addEventListener('click', () => scrollCarousel(-1));

    // --- CARD CENTRAL ---
    let debounceTimer = null;

    const updateCentralCard = () => {
      const carouselCenter = carousel.scrollLeft + carousel.offsetWidth / 2;
      let closestCard = null;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(carouselCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      cards.forEach((card) => {
        card.classList.toggle('is-central', card === closestCard);
      });
    };

    carousel.addEventListener('scroll', () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updateCentralCard, 100);
    });

    // --- CARD INICIAL ---
    const initialCard = cards[2] || cards[0];
    requestAnimationFrame(() => {
      if (initialCard) {
        const centerPosition =
          initialCard.offsetLeft - carousel.offsetWidth / 2 + initialCard.offsetWidth / 2;
        carousel.scrollTo({ left: centerPosition, behavior: 'auto' });
      }
      updateCentralCard();
    });
  }

  // --- RESPONSIVE IMAGES ---
  const updateResponsiveImages = () => {
    const isMobile = window.innerWidth <= 850;
    const images = document.querySelectorAll('.responsive-img');
    images.forEach((img) => {
      const mobileSrc = img.getAttribute('data-mobile');
      const desktopSrc = img.getAttribute('data-desktop');
      const newSrc = isMobile ? mobileSrc : desktopSrc;
      if (newSrc && img.src !== newSrc) img.src = newSrc;
    });
  };

  updateResponsiveImages();
  window.addEventListener('resize', updateResponsiveImages);

  // --- FAQ TOGGLE ---
  document.querySelectorAll('.faq-question').forEach((q) => {
    q.addEventListener('click', () => {
      q.classList.toggle('active');
      const answer = q.nextElementSibling;
      if (answer) answer.classList.toggle('open');
    });
  });

  // --- OPTION CARDS ---
  const optionCards = document.querySelectorAll('.option-card');
  optionCards.forEach((card) => {
    card.addEventListener('click', () => {
      optionCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Mantém o estado selecionado no load
  const checkedRadio = document.querySelector('.option-card input[type="radio"]:checked');
  if (checkedRadio) checkedRadio.closest('.option-card')?.classList.add('selected');

  // --- MOCKUP iPHONE CAROUSEL ---
  const carouselSlide = document.querySelector('.carousel-slide');
  const carouselImages = document.querySelectorAll('.carousel-slide img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (carouselSlide && carouselImages.length && prevBtn && nextBtn) {
    let counter = 0;
    let size = carouselImages[0].clientWidth;

    const updateSlide = () => {
      carouselSlide.style.transition = 'transform 0.5s ease-in-out';
      carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    };

    nextBtn.addEventListener('click', () => {
      if (counter < carouselImages.length - 1) {
        counter++;
        updateSlide();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (counter > 0) {
        counter--;
        updateSlide();
      }
    });

    window.addEventListener('resize', () => {
      size = carouselImages[0].clientWidth;
      updateSlide();
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const optionsWrapper = document.getElementById('checkout-options');
    
    if (optionsWrapper) {
        // Pega todos os 'headers' clicáveis
        const allHeaders = optionsWrapper.querySelectorAll('.checkout-option-header');

        allHeaders.forEach(header => {
            header.addEventListener('click', function() {
                
                const clickedCard = this.closest('.checkout-option-card');
                
                // Pega o card que está aberto atualmente
                const currentOpenCard = optionsWrapper.querySelector('.checkout-option-card.is-open');
                
                // Se houver um card aberto E não for o que eu cliquei, fecha ele
                if (currentOpenCard && currentOpenCard !== clickedCard) {
                    currentOpenCard.classList.remove('is-open');
                }
                
                // Abre ou fecha o card clicado
                clickedCard.classList.toggle('is-open');
                
                // Marca o radio button de dentro do card
                const radio = clickedCard.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                }
            });
        });
    }
});
