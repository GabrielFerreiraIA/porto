/**
 * Systasi Modal - Componente de Modal CORRIGIDO
 * Versão: 3.3.0 (Close Button Posicionado Corretamente)
 * 
 * Corrigido: Close button como primeiro item, lado direito, com margin-bottom 24px
 */

(function() {
  'use strict';
  
  console.log('[Systasi Modal] Module loading...');
  
  // Aguardar Systasi Core estar disponível
  function waitForSystasiCore() {
    return new Promise(function(resolve) {
      function check() {
        if (window.Systasi && typeof window.Systasi.init === 'function') {
          console.log('[Systasi Modal] Systasi core detected');
          resolve();
        } else {
          setTimeout(check, 50);
        }
      }
      check();
    });
  }
  
  // Inicializar modal quando core estiver pronto
  waitForSystasiCore().then(function() {
    console.log('[Systasi Modal] Core detected, initializing modal module');
    initializeModal();
  }).catch(function(error) {
    console.error('[Systasi Modal] Failed to initialize:', error);
  });
  
  function initializeModal() {
    console.log('[Systasi Modal] Starting modal initialization...');
    
    // ============================================
    // CRIAÇÃO DO MODAL - Estrutura corrigida
    // ============================================
    
    function createModal(config) {
      console.log('[Systasi Modal] Creating modal with config:', config);
      
      const {
        instanceId,
        products,
        title = 'Aproveite também',
        onHide,
        onProductClick
      } = config;
      
      // Validar produtos
      if (!products || !Array.isArray(products) || products.length === 0) {
        console.warn('[Systasi Modal] No products provided or empty array');
        return createEmptyModal(instanceId, title, onHide);
      }
      
      // Remover modal existente
      const existing = document.querySelector('.systasi-modal-overlay');
      if (existing) {
        console.log('[Systasi Modal] Removing existing modal');
        existing.remove();
      }
      
      // Carregar CSS se não existir
      ensureModalCSS();
      
      // Criar HTML do modal usando estrutura corrigida
      const modalHtml = createModalHTML(products, title, instanceId);
      
      // Inserir no DOM
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      const modal = document.querySelector('.systasi-modal-overlay');
      
      if (!modal) {
        console.error('[Systasi Modal] Failed to create modal element');
        return null;
      }
      
      // Setup eventos
      setupModalEvents(modal, { onHide, onProductClick, products });
      
      // Setup carousel no mobile
      setupMobileCarousel(modal, products);
      
      // Animar entrada com efeito profissional
      requestAnimationFrame(() => {
        modal.classList.add('systasi-modal-overlay--open');
      });
      
      console.log('[Systasi Modal] Modal created successfully');
      
      return {
        id: instanceId,
        element: modal,
        destroy: () => {
          console.log('[Systasi Modal] Destroying modal:', instanceId);
          modal.classList.remove('systasi-modal-overlay--open');
          setTimeout(() => {
            if (modal.parentNode) {
              modal.parentNode.removeChild(modal);
            }
          }, 300);
        }
      };
    }
    
    // Função para criar modal vazio (corrigida)
    function createEmptyModal(instanceId, title, onHide) {
      const existing = document.querySelector('.systasi-modal-overlay');
      if (existing) {
        existing.remove();
      }
      
      ensureModalCSS();
      
      const modalHtml = createEmptyModalHTML(title);
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      const modal = document.querySelector('.systasi-modal-overlay');
      
      if (!modal) {
        console.error('[Systasi Modal] Failed to create empty modal element');
        return null;
      }
      
      setupModalEvents(modal, { onHide, onProductClick: null, products: [] });
      
      requestAnimationFrame(() => {
        modal.classList.add('systasi-modal-overlay--open');
      });
      
      return {
        id: instanceId,
        element: modal,
        destroy: () => {
          modal.classList.remove('systasi-modal-overlay--open');
          setTimeout(() => {
            if (modal.parentNode) {
              modal.parentNode.removeChild(modal);
            }
          }, 300);
        }
      };
    }
    
    // ============================================
    // HTML DO MODAL - Close Button Corrigido
    // ============================================
    
    function createModalHTML(products, title, instanceId) {
      if (!products || products.length === 0) {
        return createEmptyModalHTML(title);
      }
      
      console.log('[Systasi Modal] Rendering', products.length, 'products');
      
      // Criar dots para carousel mobile
      const dotsHtml = products.map((_, index) => `
        <div class="systasi-carousel-navigation-dot ${index === 0 ? 'systasi-carousel-navigation-dot--active' : ''}" data-slide="${index}">
          ${index === 0 
            ? '<div class="systasi-carousel-dot-active"></div>' 
            : '<div class="systasi-carousel-dot-inactive"></div>'
          }
        </div>
      `).join('');
      
      return `
        <div class="systasi-modal-overlay">
          <div class="systasi-modal-container">
            <div class="systasi-modal-content">
              <!-- Close Button - PRIMEIRO ITEM, LADO DIREITO -->
              <div class="systasi-modal-close-section">
                <button
                  class="systasi-modal-close-button"
                  aria-label="Fechar modal"
                  data-gtm-type="click"
                  data-gtm-clicktype="self"
                  data-gtm-name="modal-de-recomendacao"
                  data-gtm-subname="fechar-modal-de-recomendacao"
                >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M10.5828 10.0172L17.3828 3.21719C17.5495 3.05052 17.5495 2.78385 17.3828 2.63385C17.2161 2.46719 16.9495 2.46719 16.7995 2.63385L10.0161 9.43385L3.21615 2.61719C3.04948 2.45052 2.78281 2.45052 2.63281 2.61719C2.46615 2.78385 2.46615 3.05052 2.63281 3.20052L9.41615 10.0005L2.64948 16.7839C2.48281 16.9505 2.48281 17.2172 2.64948 17.3672C2.73281 17.4505 2.83281 17.4839 2.94948 17.4839C3.06615 17.4839 3.16615 17.4505 3.24948 17.3672L9.99948 10.6005L16.7495 17.3672C16.7495 17.3672 16.9328 17.4839 17.0495 17.4839C17.1661 17.4839 17.2661 17.4505 17.3495 17.3672C17.5161 17.2005 17.5161 16.9339 17.3495 16.7839L10.5995 10.0172H10.5828Z" fill="black"/>
</svg>
                </button>
              </div>
              
              <!-- Title Section -->
              <div class="systasi-modal-title-section">
                <h2 class="systasi-modal-title">${escapeHtml(title)}</h2>
              </div>
              
              <!-- Products Container -->
              <div class="systasi-modal-products-wrapper">
                <div class="systasi-modal-products-grid" data-carousel-container>
                  ${products.map((product, index) => renderProductCard(product, index)).join('')}
                </div>
                
                <!-- Navigation Dots (Mobile) -->
                <div class="systasi-modal-navigation-dots">
                  ${dotsHtml}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    function createEmptyModalHTML(title) {
      return `
        <div class="systasi-modal-overlay">
          <div class="systasi-modal-container">
            <div class="systasi-modal-content">
              <!-- Close Button - PRIMEIRO ITEM, LADO DIREITO -->
              <div class="systasi-modal-close-section">
                <button class="systasi-modal-close-button" aria-label="Fechar modal">
                  <svg class="systasi-modal-close-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <!-- Title Section -->
              <div class="systasi-modal-title-section">
                <h2 class="systasi-modal-title">${escapeHtml(title)}</h2>
              </div>
              
              <!-- Empty State -->
              <div class="systasi-modal-empty-state">
                <p class="systasi-modal-empty-message">Nenhuma recomendação disponível no momento.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    // ============================================
    // RENDERIZAÇÃO DE CARD DE PRODUTO
    // ============================================
    
    function renderProductCard(product, index) {
      const validatedProduct = validateProduct(product);
      if (!validatedProduct) {
        console.warn('[Systasi Modal] Invalid product skipped:', product);
        return '';
      }
      
      const p = validatedProduct;
      
      // Imagem do produto com estrutura profissional
      const productImage = p.imageUrl 
        ? `<div class="systasi-product-aspect-ratio" style="background: url(${escapeAttr(p.imageUrl)}) center; background-size: cover; background-repeat: no-repeat;">
             <div class="systasi-product-aspect-ratio-overlay">
               <div class="systasi-product-aspect-ratio-keeper">
                 <div class="systasi-product-aspect-ratio-inner"></div>
               </div>
             </div>
           </div>`
        : `<div class="systasi-product-aspect-ratio systasi-product-aspect-ratio--placeholder">
             <div class="systasi-product-aspect-ratio-overlay">
               <div class="systasi-product-aspect-ratio-keeper">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                   <circle cx="8.5" cy="8.5" r="1.5"/>
                   <polyline points="21 15 16 10 5 21"/>
                 </svg>
               </div>
             </div>
           </div>`;
      
      const ctaText = p.cta?.text || 'Agendar agora';
      const productSlug = p.url ? p.url.split('/').pop().replace(/[?#].*$/, '') : p.id

      return `
        <div
          class="systasi-product-card"
          data-product-id="${escapeAttr(p.id)}"
          data-slide-index="${index}"
          data-gtm-type="click"
          data-gtm-clicktype="self"
          data-gtm-name="modal-de-recomendacao"
          data-gtm-subname="${escapeAttr(productSlug)}:modal-de-recomendacao"
        >
          ${productImage}
          
          <div class="systasi-product-frame">
            <div class="systasi-product-upper-info">
              <h3 class="systasi-product-title">${escapeHtml(p.name)}</h3>
            </div>
          </div>
          
          <div class="systasi-product-text-link">
            <div class="systasi-product-text-link-settings">
              <span class="systasi-product-link-text">${escapeHtml(ctaText)}</span>
              <div class="systasi-product-container-icon">
                <div class="systasi-product-arrow-icon">
                  <svg class="systasi-product-arrow-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    // ============================================
    // CAROUSEL MOBILE PROFISSIONAL
    // ============================================
    
    function setupMobileCarousel(modal, products) {
      const container = modal.querySelector('[data-carousel-container]');
      const dots = modal.querySelectorAll('.systasi-carousel-navigation-dot');
      
      if (!container || dots.length === 0) return;
      
      let currentSlide = 0;
      let isScrolling = false;
      
      // Calcular largura do card dinamicamente
      function getCardWidth() {
        const card = container.querySelector('.systasi-product-card');
        if (!card) return 277; // fallback
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const gap = 12; // gap definido no CSS
        return cardRect.width + gap;
      }
      
      // Setup scroll behavior com debounce
      container.addEventListener('scroll', debounce(() => {
        if (isScrolling) return;
        
        const cardWidth = getCardWidth();
        const scrollLeft = container.scrollLeft;
        const newSlide = Math.round(scrollLeft / cardWidth);
        
        if (newSlide !== currentSlide && newSlide >= 0 && newSlide < products.length) {
          currentSlide = newSlide;
          updateDots();
        }
      }, 150));
      
      // Setup dot clicks
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          if (currentSlide === index) return;
          
          currentSlide = index;
          scrollToSlide(currentSlide);
          updateDots();
        });
      });
      
      function scrollToSlide(slideIndex) {
        isScrolling = true;
        const cardWidth = getCardWidth();
        const scrollLeft = slideIndex * cardWidth;
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
        
        // Reset flag após animação
        setTimeout(() => {
          isScrolling = false;
        }, 500);
      }
      
      function updateDots() {
        dots.forEach((dot, index) => {
          const isActive = index === currentSlide;
          
          // Toggle active class
          dot.classList.toggle('systasi-carousel-navigation-dot--active', isActive);
          
          // Update dot content
          if (isActive) {
            dot.innerHTML = '<div class="systasi-carousel-dot-active"></div>';
          } else {
            dot.innerHTML = '<div class="systasi-carousel-dot-inactive"></div>';
          }
        });
      }
      
      // Touch/swipe support melhorado
      let startX = 0;
      let startY = 0;
      let scrollStart = 0;
      let isDragging = false;
      
      container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        scrollStart = container.scrollLeft;
        isDragging = false;
      }, { passive: true });
      
      container.addEventListener('touchmove', (e) => {
        if (!startX) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(startX - currentX);
        const diffY = Math.abs(startY - currentY);
        
        // Só considerar swipe horizontal se movimento horizontal > vertical
        if (diffX > diffY && diffX > 10) {
          isDragging = true;
          const diff = startX - currentX;
          container.scrollLeft = scrollStart + diff;
          e.preventDefault();
        }
      });
      
      container.addEventListener('touchend', () => {
        startX = 0;
        startY = 0;
        scrollStart = 0;
        
        if (isDragging) {
          // Snap to nearest card
          const cardWidth = getCardWidth();
          const scrollLeft = container.scrollLeft;
          const nearestSlide = Math.round(scrollLeft / cardWidth);
          
          if (nearestSlide !== currentSlide) {
            currentSlide = Math.max(0, Math.min(nearestSlide, products.length - 1));
            scrollToSlide(currentSlide);
            updateDots();
          }
        }
        
        isDragging = false;
      }, { passive: true });
    }
    
    // ============================================
    // VALIDAÇÃO DE PRODUTO
    // ============================================
    
    function validateProduct(p) {
      if (!p || typeof p !== 'object') {
        console.warn('[Systasi Modal] Invalid product - not an object:', p);
        return null;
      }
      
      const url = p.url || '';
      const name = p.name || '';
      
      if (!url || !name) {
        console.warn('[Systasi Modal] Invalid product - missing url or name:', p);
        return null;
      }
      
      const id = p.id || url;
      
      return {
        id,
        url,
        name,
        imageUrl: p.imageUrl || null,
        category: p.category || null,
        description: p.description || null,
        cta: normalizeCTA(p.cta),
        price: normalizePrice(p.price),
        badges: normalizeBadges(p.badges),
        meta: p.meta || {},
        source: p.source || null,
        reason: p.reason || null
      };
    }
    
    function normalizeCTA(cta) {
      if (!cta) return { text: 'Saiba mais', style: 'primary' };
      return {
        text: cta.text || 'Saiba mais',
        url: cta.url || null,
        style: cta.style || 'primary'
      };
    }

    function normalizePrice(price) {
      if (!price || typeof price.value !== 'number') return null;
      return {
        value: price.value,
        currency: price.currency || 'BRL',
        originalValue: price.originalValue || null,
        prefix: price.prefix || null
      };
    }

    function normalizeBadges(badges) {
      if (!Array.isArray(badges)) return [];
      return badges
        .filter(b => b && b.text)
        .map(b => ({
          text: b.text,
          variant: b.variant || 'primary'
        }));
    }
    
    // ============================================
    // EVENTOS DO MODAL
    // ============================================
    
    function setupModalEvents(modal, callbacks) {
      const { onHide, onProductClick, products } = callbacks;
      
      // Fechar modal
      const closeModal = () => {
        console.log('[Systasi Modal] Closing modal');
        modal.classList.remove('systasi-modal-overlay--open');
        setTimeout(() => {
          if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        }, 300);
        
        if (typeof onHide === 'function') {
          onHide();
        }
      };
      
      // Event listeners
      const closeBtn = modal.querySelector('.systasi-modal-close-button');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
      }
      
      // Fechar clicando no overlay
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
      
      // Clicks em produtos
      const productCards = modal.querySelectorAll('.systasi-product-card');
      productCards.forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          
          const productId = card.dataset.productId;
          const product = products.find(p => p.id === productId);
          
          console.log('[Systasi Modal] Product clicked:', productId);
          
          if (product) {
            if (typeof onProductClick === 'function') {
              onProductClick(product, e);
            }
            
            // Abrir URL do produto
            if (product.url) {
              window.open(product.url, '_blank', 'noopener,noreferrer');
            }
          }
          
          // Fechar modal após clique
          closeModal();
        });
      });
      
      // ESC para fechar
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    }
    
    // ============================================
    // CSS RESPONSIVO COM CLOSE BUTTON CORRIGIDO
    // ============================================
    
    function ensureModalCSS() {
      if (document.getElementById('systasi-modal-styles')) {
        return;
      }
      
      console.log('[Systasi Modal] Loading corrected responsive CSS');
      
      const css = `
        /* Reset básico */
        .systasi-modal-overlay * {
          box-sizing: border-box;
        }
        
        /* Modal Overlay */
        .systasi-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 16px;
        }
        
        .systasi-modal-overlay--open {
          opacity: 1;
          visibility: visible;
        }
        
        /* Modal Container */
        .systasi-modal-container {
          position: relative;
          width: 100%;
          max-width: 859px;
          max-height: 90vh;
          transform: scale(0.9) translateY(20px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .systasi-modal-overlay--open .systasi-modal-container {
          transform: scale(1) translateY(0);
        }
        
        /* Modal Content - PAI FLEXBOX */
        .systasi-modal-content {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          min-height: 400px;
          padding: 20px 40px 40px 40px;
        }
        
        /* Close Button Section - PRIMEIRO ITEM */
        .systasi-modal-close-section {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 24px;
          flex-shrink: 0;
        }
        
        .systasi-modal-close-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          background: none;
          transition: all 0.2s ease;
          padding: 0;
        }
        
        .systasi-modal-close-icon {
          width: 20px;
          height: 20px;
          color: #666;
          transition: color 0.2s ease;
        }
        
        .systasi-modal-close-button:hover .systasi-modal-close-icon {
          color: #333;
        }
        
        /* Title Section */
        .systasi-modal-title-section {
          flex-shrink: 0;
        }
        
        .systasi-modal-title {
          color: #1f1f1f;
          font-family: "PortoRoobert-SemiBold", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 24px;
          line-height: 28px;
          font-weight: 600;
          margin: 0;
          margin-bottom: 20px;
          text-align: left;
        }
        
        /* Products Wrapper */
        .systasi-modal-products-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 0; /* Importante para flex */
        }
        
        /* Products Grid */
        .systasi-modal-products-grid {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-snap-type: x mandatory;
          flex: 1;
          align-items: flex-start;
        }
        
        .systasi-modal-products-grid::-webkit-scrollbar {
          display: none;
        }
        
        /* Product Card */
        .systasi-product-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #dadbdd;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 253px;
          max-width: 253px;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          scroll-snap-align: start;
        }
        
        .systasi-product-card:hover {
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-color: #bbb;
          transform: translateY(-4px);
        }
        
        /* Product Image */
        .systasi-product-aspect-ratio {
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 155px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        .systasi-product-aspect-ratio--placeholder {
          background: #f8f8f8;
        }
        
        .systasi-product-aspect-ratio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .systasi-product-aspect-ratio-keeper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: #ccc;
        }
        
        /* Product Content */
        .systasi-product-frame {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }
        
        .systasi-product-title {
          color: #000000;
          font-family: "OpenSans-Bold", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 16px;
          line-height: 20px;
          font-weight: 700;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Product CTA */
        .systasi-product-text-link {
          margin-top: auto;
        }
        
        .systasi-product-text-link-settings {
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        
        .systasi-product-card:hover .systasi-product-text-link-settings {
          transform: translateX(2px);
        }
        
        .systasi-product-link-text {
          color: #0046c0;
          font-family: "OpenSans-Regular", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 400;
        }
        
        .systasi-product-arrow-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
        
        .systasi-product-arrow-svg {
          width: 100%;
          height: 100%;
          color: #0046c0;
        }
        
        /* Navigation Dots */
        .systasi-modal-navigation-dots {
          display: none;
          flex-direction: row;
          gap: 8px;
          align-items: center;
          justify-content: center;
          padding: 16px 0;
        }
        
        .systasi-carousel-navigation-dot {
          width: 8px;
          height: 8px;
          position: relative;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .systasi-carousel-navigation-dot:hover {
          transform: scale(1.2);
        }
        
        .systasi-carousel-dot-active {
          background: #2662c9;
          border-radius: 4px;
          width: 8px;
          height: 8px;
        }
        
        .systasi-carousel-dot-inactive {
          background: #e0e0e0;
          border-radius: 50%;
          width: 8px;
          height: 8px;
        }
        
        /* Empty State */
        .systasi-modal-empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          flex: 1;
        }
        
        .systasi-modal-empty-message {
          color: #666;
          font-size: 16px;
          text-align: center;
          margin: 0;
          font-style: italic;
        }
        
        /* ===== RESPONSIVIDADE ===== */
        
        /* Mobile - até 768px */
        @media (max-width: 768px) {
          .systasi-modal-overlay {
            padding: 12px;
          }
          
          .systasi-modal-content {
            min-height: 400px;
            max-height: 90vh;
            padding: 0;
          }
          
          .systasi-modal-close-section {
            padding: 16px 16px 0;
            margin-bottom: 20px;
          }
          
          .systasi-modal-title-section {
            padding: 0 24px;
            margin-bottom: 20px;
          }
          
          .systasi-modal-title {
            font-size: 20px;
            line-height: 24px;
            text-align: left;
            margin: 0;
          }
          
          .systasi-modal-products-wrapper {
            padding: 0 20px 20px;
          }
          
          .systasi-product-card {
            min-width: 253px;
            max-width: 253px;
            height: 315px;
          }
          
          .systasi-product-aspect-ratio {
            height: 140px;
          }
          
          .systasi-modal-navigation-dots {
            display: flex;
          }
        }
        
        /* Tablet - 769px até 1024px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .systasi-modal-products-grid {
            flex-wrap: wrap;
            justify-content: center;
            overflow-x: visible;
          }
          
          .systasi-product-card {
            min-width: 253px;
            max-width: 253px;
          }
          
          .systasi-modal-navigation-dots {
            display: none;
          }
        }
        
        /* Desktop - acima de 1024px */
        @media (min-width: 1025px) {
          .systasi-modal-products-grid {
            justify-content: left;
            overflow-x: visible;
          }
          
          .systasi-product-card {
            min-width: 253px;
            max-width: 253px;
            height: 315px;
          }
          
          .systasi-modal-navigation-dots {
            display: none;
          }
        }
        
        /* Focus states para acessibilidade */
        .systasi-modal-close-button:focus-visible,
        .systasi-product-card:focus-visible,
        .systasi-carousel-navigation-dot:focus-visible {
          outline: 2px solid #0046c0;
          outline-offset: 2px;
        }
        
        /* Smooth scrolling */
        @media (prefers-reduced-motion: no-preference) {
          .systasi-modal-products-grid {
            scroll-behavior: smooth;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `;
      
      const style = document.createElement('style');
      style.id = 'systasi-modal-styles';
      style.textContent = css;
      document.head.appendChild(style);
      
      console.log('[Systasi Modal] Corrected responsive CSS loaded');
    }
    
    // ============================================
    // UTILITÁRIOS
    // ============================================
    
    function escapeHtml(str) {
      if (!str) return '';
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
    
    function escapeAttr(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
    
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
    
    // ============================================
    // ADICIONAR AO SYSTASI CORE
    // ============================================
    
    // Verificar se Systasi ainda existe
    if (!window.Systasi) {
      console.error('[Systasi Modal] Systasi core not available when trying to attach createModal');
      return;
    }
    
    // Adicionar função createModal ao Systasi
    window.Systasi.createModal = createModal;
    console.log('[Systasi Modal] createModal function attached to Systasi');
    
    // Disparar evento customizado para sinalizar que modal está pronto
    if (typeof window.CustomEvent === 'function') {
      const event = new CustomEvent('systasiModalReady', {
        detail: { createModal: createModal }
      });
      window.dispatchEvent(event);
    }
  }
  
})();
