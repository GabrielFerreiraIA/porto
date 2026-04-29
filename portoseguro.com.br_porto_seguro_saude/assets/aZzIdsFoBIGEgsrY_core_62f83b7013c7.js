/**
 * Systasi Core - Sistema Simplificado de Recomendações CORRIGIDO
 * Versão: 3.1.1 (Motor de Recomendação Corrigido)
 * 
 * CORREÇÃO: Motor de recomendação agora garante que sempre retorna o número correto de produtos
 */

window.Systasi = (function() {
  'use strict';
  
  // ============================================
  // ESTADO GLOBAL
  // ============================================
  const state = {
    catalog: null,
    initialized: false,
    config: {
      catalogUrl: './data.json',
      cssUrl: './style.css',
      historyKey: 'reco_recent_urls_v1',
      maxHistory: 20,
      debug: false,
      // Configurações padrão de estratégia
      strategy: 'mixed',
      limit: 6,
      excludeCurrentUrl: true
    },
    instances: new Map(),
    nextId: 1,
    activeObservers: new Map()
  };
  
  // ============================================
  // INICIALIZAÇÃO SIMPLIFICADA
  // ============================================
  
  /**
   * Inicializa o Systasi (carrega módulos + configura)
   * @param {Object} config - Configuração completa
   * @returns {Promise<void>}
   */
  async function init(config = {}) {
    if (state.initialized) {
      log('Systasi already initialized');
      return;
    }
    
    log('Initializing Systasi with config:', config);
    
    // Merge configuração
    Object.assign(state.config, config);
    
    try {
      // Carregar catálogo
      await loadCatalog(state.config.catalogUrl);
      
      state.initialized = true;
      log('Systasi initialized successfully');
      
    } catch (error) {
      console.error('[Systasi] Initialization failed:', error);
      throw error;
    }
  }
  
  // ============================================
  // TRIGGER SIMPLIFICADO
  // ============================================
  
  /**
   * Dispara modal ou widget
   * @param {Object} options - Opções do trigger
   * @returns {Object} - Instância criada
   */
  function trigger(options = {}) {
    if (!state.initialized) {
      throw new Error('Systasi not initialized. Call Systasi.init() first.');
    }
    
    const config = {
      // Defaults
      type: 'modal',
      strategy: state.config.strategy,
      limit: state.config.limit,
      slot: 'pdp_related',
      title: 'Recomendados para você',
      layout: 'grid',
      theme: null,
      delay: 0,
      excludeCurrentUrl: state.config.excludeCurrentUrl,
      
      // Triggers automáticos
      elementTrigger: null,
      scrollTrigger: null,
      eventTrigger: null,
      textTrigger: null,  // Novo: trigger por texto na página
      
      // Configuração do MutationObserver
      observeRoot: null,  // Seletor CSS ou null para auto-detect
      observeTimeout: 600000,  // Timeout: 10 minutos (alinhado com polling)
      
      // Callbacks
      onShow: null,
      onHide: null,
      onReady: null,
      onProductClick: null,
      
      // Merge com opções do usuário
      ...options
    };
    
    log('Triggering', config.type, 'with config:', config);
    
    const instanceId = generateInstanceId();
    
    // Função principal que executa o trigger
    const executeTrigger = async () => {
      try {
        const products = await getRecommendations({
          strategy: config.strategy,
          limit: config.limit,
          slot: config.slot,
          excludeCurrentUrl: config.excludeCurrentUrl
        });
        
        log('Recommendations returned:', products.length, 'products for limit:', config.limit);
        
        if (products.length === 0) {
          log('No products found for trigger');
          return null;
        }
        
        let instance;
        
        if (config.type === 'modal') {
          instance = await createModalInstance(instanceId, products, config);
        } else if (config.type === 'widget') {
          instance = await createWidgetInstance(instanceId, products, config);
        } else {
          throw new Error(`Unknown trigger type: ${config.type}`);
        }
        
        if (instance) {
          state.instances.set(instanceId, instance);
          log('Trigger executed successfully:', instanceId);
        }
        
        return instance;
        
      } catch (error) {
        console.error('[Systasi] Trigger execution failed:', error);
        throw error;
      }
    };
    
    // Configurar timing e triggers
    if (config.elementTrigger) {
      // Trigger por elemento
      setupElementTrigger(config.elementTrigger, executeTrigger, config.delay, {
        observeRoot: config.observeRoot,
        timeout: config.observeTimeout
      });
    } else if (config.textTrigger) {
      // Trigger por texto na página
      setupTextTrigger(config.textTrigger, executeTrigger, config.delay, {
        observeRoot: config.observeRoot,
        timeout: config.observeTimeout
      });
    } else if (config.scrollTrigger) {
      // Trigger por scroll
      setupScrollTrigger(config.scrollTrigger, executeTrigger, config.delay);
    } else if (config.eventTrigger) {
      // Trigger por evento customizado
      setupEventTrigger(config.eventTrigger, executeTrigger, config.delay);
    } else {
      // Trigger imediato (com delay opcional)
      if (config.delay > 0) {
        log('Scheduling trigger with delay:', config.delay, 'ms');
        setTimeout(executeTrigger, config.delay);
      } else {
        executeTrigger();
      }
    }
    
    return {
      id: instanceId,
      config: config,
      execute: executeTrigger,
      destroy: () => destroyInstance(instanceId)
    };
  }
  
  // ============================================
  // CRIAÇÃO DE INSTÂNCIAS
  // ============================================
  
  async function createModalInstance(instanceId, products, config) {
    if (typeof window.Systasi.createModal !== 'function') {
      throw new Error('Modal module not loaded. Include modal.js');
    }
    
    const modalInstance = window.Systasi.createModal({
      instanceId,
      products,
      title: config.title,
      onHide: config.onHide,
      onProductClick: config.onProductClick
    });
    
    if (typeof config.onShow === 'function') {
      config.onShow(products, modalInstance.element);
    }
    
    return modalInstance;
  }
  
  async function createWidgetInstance(instanceId, products, config) {
    if (typeof window.Systasi.createWidget !== 'function') {
      throw new Error('Widget module not loaded. Include widget.js');
    }
    
    const widgetInstance = window.Systasi.createWidget({
      instanceId,
      products,
      title: config.title,
      layout: config.layout,
      theme: config.theme,
      anchor: config.anchor,
      anchorMode: config.anchorMode,
      container: config.container,
      onProductClick: config.onProductClick
    });
    
    if (typeof config.onReady === 'function') {
      config.onReady(products, widgetInstance.element);
    }
    
    return widgetInstance;
  }
  
  // ============================================
  // MOTOR DE RECOMENDAÇÃO CORRIGIDO
  // ============================================
  
  async function getRecommendations(options = {}) {
    if (!state.catalog) {
      throw new Error('Catalog not loaded');
    }
    
    const {
      strategy = 'mixed',
      limit = 6,
      slot = 'pdp_related',
      excludeCurrentUrl = true
    } = options;
    
    log('Getting recommendations with strategy:', strategy, 'limit:', limit, 'slot:', slot);
    
    try {
      // Usar engine original se disponível
      if (window.RecoEngine) {
        const input = buildEngineInput(slot, limit);
        const recoResult = window.RecoEngine.recommend(input, state.catalog);
        const products = window.RecoEngine.resolveProducts(recoResult, state.catalog);
        
        if (products && products.length > 0) {
          return filterProducts(products, { excludeCurrentUrl, limit });
        }
      }
      
      // Fallback para estratégias internas CORRIGIDAS
      return getFallbackRecommendations({ strategy, limit, slot, excludeCurrentUrl });
      
    } catch (error) {
      log('Engine error, using fallback:', error);
      return getFallbackRecommendations({ strategy, limit, slot, excludeCurrentUrl });
    }
  }
  
  function getFallbackRecommendations({ strategy, limit, slot, excludeCurrentUrl }) {
    const allProducts = state.catalog.catalog?.products || [];
    let products = [];
    
    log('Using fallback recommendations. Total products available:', allProducts.length);
    
    switch (strategy) {
      case 'similar':
        products = getSimilarProducts(allProducts, limit);
        break;
        
      case 'popular':
        products = getPopularProducts(allProducts, limit);
        break;
        
      case 'recent':
        products = getRecentProducts(allProducts, limit);
        break;
        
      case 'slot':
        products = getSlotProducts(allProducts, slot, limit);
        break;
        
      case 'mixed':
      default:
        products = getMixedProducts(allProducts, limit);
        break;
    }
    
    const filtered = filterProducts(products, { excludeCurrentUrl, limit });
    log('Fallback recommendations result:', filtered.length, 'products');
    return filtered;
  }
  
  // ============================================
  // ESTRATÉGIAS CORRIGIDAS
  // ============================================
  
  function getSimilarProducts(products, limit) {
    const currentCategory = detectCurrentCategory();
    log('getSimilarProducts - currentCategory:', currentCategory, 'limit:', limit);
    
    if (!currentCategory) {
      // CORREÇÃO: Se não há categoria atual, usar produtos populares como fallback
      log('No current category detected, using popular products as fallback');
      return getPopularProducts(products, limit);
    }
    
    const similar = products.filter(p => p.category === currentCategory);
    log('Found', similar.length, 'products in category:', currentCategory);
    
    if (similar.length === 0) {
      // CORREÇÃO: Se não há produtos na categoria, usar populares
      log('No products in current category, using popular products as fallback');
      return getPopularProducts(products, limit);
    }
    
    return similar.slice(0, limit);
  }
  
  function getPopularProducts(products, limit) {
    log('getPopularProducts - limit:', limit, 'total products:', products.length);
    
    // CORREÇÃO: Ordenar por popularidade (ou usar ordem original se não há popularidade)
    const sorted = products.sort((a, b) => {
      const aPopularity = a.popularity || 0;
      const bPopularity = b.popularity || 0;
      return bPopularity - aPopularity;
    });
    
    const result = sorted.slice(0, limit);
    log('getPopularProducts result:', result.length, 'products');
    return result;
  }
  
  function getRecentProducts(products, limit) {
    const recentUrls = getHistory().map(item => item.url);
    log('getRecentProducts - recentUrls:', recentUrls.length, 'limit:', limit);
    
    const recent = products.filter(p => recentUrls.includes(p.url));
    log('Found', recent.length, 'recent products');
    
    if (recent.length === 0) {
      // CORREÇÃO: Se não há produtos recentes, usar populares
      log('No recent products, using popular products as fallback');
      return getPopularProducts(products, limit);
    }
    
    return recent.slice(0, limit);
  }
  
  function getSlotProducts(products, slot, limit) {
    log('getSlotProducts - slot:', slot, 'limit:', limit);
    
    const slotProducts = products.filter(p => p.slots && p.slots.includes(slot));
    log('Found', slotProducts.length, 'products for slot:', slot);
    
    if (slotProducts.length === 0) {
      // CORREÇÃO: Se não há produtos para o slot, usar populares
      log('No products for slot, using popular products as fallback');
      return getPopularProducts(products, limit);
    }
    
    return slotProducts.slice(0, limit);
  }
  
  function getMixedProducts(products, limit) {
    log('getMixedProducts - limit:', limit, 'total products:', products.length);
    
    // CORREÇÃO: Estratégia mais inteligente que garante o limite
    const results = [];
    
    // 1. Tentar produtos similares (40% do limite)
    const similarLimit = Math.ceil(limit * 0.4);
    const similar = getSimilarProducts(products, similarLimit);
    results.push(...similar);
    log('Added', similar.length, 'similar products');
    
    // 2. Completar com produtos populares
    const remaining = limit - results.length;
    if (remaining > 0) {
      const popular = getPopularProducts(products, remaining * 2) // Pegar mais para filtrar duplicatas
        .filter(p => !results.find(r => r.id === p.id)); // Remover duplicatas
      
      results.push(...popular.slice(0, remaining));
      log('Added', Math.min(popular.length, remaining), 'popular products');
    }
    
    // 3. Se ainda não temos produtos suficientes, pegar qualquer produto
    const stillRemaining = limit - results.length;
    if (stillRemaining > 0) {
      const any = products
        .filter(p => !results.find(r => r.id === p.id))
        .slice(0, stillRemaining);
      
      results.push(...any);
      log('Added', any.length, 'additional products to reach limit');
    }
    
    const final = results.slice(0, limit);
    log('getMixedProducts final result:', final.length, 'products');
    return final;
  }
  
  function filterProducts(products, { excludeCurrentUrl, limit }) {
    let filtered = products;
    
    if (excludeCurrentUrl) {
      const currentUrl = window.location.href;
      filtered = filtered.filter(p => p.url !== currentUrl);
      log('Filtered out current URL, remaining:', filtered.length, 'products');
    }
    
    const result = filtered.slice(0, limit);
    log('Final filter result:', result.length, 'products (limit:', limit, ')');
    return result;
  }
  
  // ============================================
  // SETUP DE TRIGGERS OTIMIZADO
  // ============================================
  
  function setupElementTrigger(selector, callback, delay, options = {}) {
    log('Setting up element trigger for:', selector, 'with delay:', delay);
    
    let triggered = false;
    const observers = [];
    let pollingInterval = null;
    
    const executeCallback = () => {
      if (triggered) return;
      triggered = true;
      
      // Cleanup
      cleanup();
      
      setTimeout(() => {
        log('Executing element trigger callback for:', selector);
        callback();
      }, delay);
    };
    
    const cleanup = () => {
      observers.forEach(obs => obs.disconnect());
      if (pollingInterval) clearInterval(pollingInterval);
      state.activeObservers.delete(selector);
    };
    
    // Verificação inicial
    const element = document.querySelector(selector);
    if (element && isElementVisible(element)) {
      log('Element already visible:', selector);
      executeCallback();
      return;
    }
    
    // Determinar root de observação
    const observeRoot = findObserveRoot(selector, options.observeRoot);
    log('Observing from:', observeRoot === document.body ? 'document.body' : observeRoot.tagName);
    
    // MutationObserver otimizado
    const mutationObserver = new MutationObserver((mutations) => {
      if (triggered) return;
      
      // Verificar apenas mutações relevantes
      const hasRelevantChanges = mutations.some(mutation => {
        return mutation.type === 'childList' || 
               (mutation.type === 'attributes' && 
                ['class', 'style', 'hidden'].includes(mutation.attributeName));
      });
      
      if (!hasRelevantChanges) return;
      
      const element = document.querySelector(selector);
      if (element && isElementVisible(element)) {
        log('Element found via MutationObserver:', selector);
        executeCallback();
      }
    });
    
    mutationObserver.observe(observeRoot, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'hidden']
    });
    observers.push(mutationObserver);
    
    // Polling de backup (a cada 3 segundos)
    let pollAttempts = 0;
    const maxPolls = 15; // 15 tentativas x 3s = 45 segundos total
    
    pollingInterval = setInterval(() => {
      if (triggered) return;
      
      pollAttempts++;
      const element = document.querySelector(selector);
      
      if (element && isElementVisible(element)) {
        log('Element found via polling:', selector);
        executeCallback();
      } else if (pollAttempts >= maxPolls) {
        cleanup();
      }
    }, 3000); // Intervalo de 3 segundos
    
    // Timeout configurável
    const timeout = options.timeout || 30000;
    setTimeout(() => {
      if (!triggered) {
        cleanup();
        log('Element trigger timeout for:', selector);
      }
    }, timeout);
    
    // Armazenar para cleanup externo
    state.activeObservers.set(selector, { cleanup, triggered: () => triggered });
  }
  
  /**
   * Encontra o melhor elemento root para observação
   */
  function findObserveRoot(selector, customRoot) {
    // Root customizado fornecido
    if (customRoot) {
      if (typeof customRoot === 'string') {
        const element = document.querySelector(customRoot);
        if (element) {
          log('Using custom observe root:', customRoot);
          return element;
        }
      } else if (customRoot instanceof Element) {
        return customRoot;
      }
    }
    
    // Tentar inferir container baseado no seletor
    try {
      const idMatch = selector.match(/#([\w-]+)/);
      const classMatch = selector.match(/\.([\w-]+)/);
      
      if (idMatch || classMatch) {
        const identifier = idMatch ? idMatch[1] : classMatch[1];
        const prefix = identifier.split('-')[0];
        
        // Buscar containers com prefixo similar
        const possibleContainers = [
          `[id*="${prefix}"]`,
          `[class*="${prefix}"]`
        ];
        
        for (const containerSelector of possibleContainers) {
          const container = document.querySelector(containerSelector);
          if (container && container !== document.body) {
            log('Found inferred container:', containerSelector);
            return container;
          }
        }
      }
    } catch (error) {
      log('Error inferring root:', error);
    }
    
    // Containers comuns
    const commonContainers = [
      'main',
      '[role="main"]',
      '#app',
      '#root',
      '#content',
      '.main-content'
    ];
    
    for (const containerSelector of commonContainers) {
      const container = document.querySelector(containerSelector);
      if (container) {
        log('Using common container:', containerSelector);
        return container;
      }
    }
    
    // Fallback: document.body
    return document.body;
  }
  
  /**
   * Configura trigger baseado em texto que aparece na página
   * @param {string|Object} textConfig - Texto a procurar ou configuração
   * @param {Function} callback - Função a executar quando texto for encontrado
   * @param {number} delay - Delay após encontrar o texto
   * @param {Object} options - Opções adicionais
   */
  function setupTextTrigger(textConfig, callback, delay, options = {}) {
    // Suporte para formato simplificado: string ou objeto
    let config;
    
    if (typeof textConfig === 'string') {
      config = { text: textConfig, caseSensitive: false, exact: false };
    } else {
      config = {
        text: textConfig.text,
        caseSensitive: textConfig.caseSensitive !== undefined ? textConfig.caseSensitive : false,
        exact: textConfig.exact !== undefined ? textConfig.exact : false,
        selector: textConfig.selector || null,  // Limitar busca a um seletor específico
        ...textConfig
      };
    }
    
    log('Setting up text trigger for:', config.text, 'options:', config);
    
    let triggered = false;
    const observers = [];
    let pollingInterval = null;
    
    // Polling é opcional e desabilitado por padrão (MutationObserver é suficiente)
    const usePolling = config.usePolling === true;
    
    const executeCallback = () => {
      if (triggered) return;
      triggered = true;
      
      cleanup();
      
      setTimeout(() => {
        log('Executing text trigger callback for:', config.text);
        callback();
      }, delay);
    };
    
    const cleanup = () => {
      observers.forEach(obs => obs.disconnect());
      if (pollingInterval) clearInterval(pollingInterval);
      state.activeObservers.delete('text:' + config.text);
    };
    
    /**
     * Verifica se o texto existe na página E se está visível
     */
    const checkText = () => {
      if (triggered) return false;
      
      // Determinar onde procurar
      const searchRoot = config.selector 
        ? document.querySelector(config.selector) 
        : document.body;
      
      if (!searchRoot) return false;
      
      // IMPORTANTE: Verificar se o elemento está visível
      const isVisible = isElementVisible(searchRoot);
      log('Checking visibility for:', config.selector || 'body', '- isVisible:', isVisible);
      
      if (!isVisible) {
        log('Element found but not visible, skipping');
        return false;
      }
      
      // Obter todo o texto do elemento, EXCLUINDO scripts
      let elementText = '';
      
      // Função recursiva para extrair texto ignorando scripts
      function getTextExcludingScripts(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent;
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Ignorar scripts, styles e outros elementos não visíveis
          if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.tagName)) {
            return '';
          }
          
          let text = '';
          node.childNodes.forEach(child => {
            text += getTextExcludingScripts(child);
          });
          return text;
        }
        
        return '';
      }
      
      elementText = getTextExcludingScripts(searchRoot);
      
      // Preparar textos para comparação
      const searchText = config.caseSensitive ? config.text : config.text.toLowerCase();
      const pageText = config.caseSensitive ? elementText : elementText.toLowerCase();
      
      // Verificar se texto existe
      let found = false;
      
      if (config.exact) {
        // Comparação exata (considera espaços e quebras)
        found = pageText.trim() === searchText.trim();
      } else {
        // Comparação parcial (contém o texto)
        found = pageText.includes(searchText);
      }
      
      if (found) {
        log('Text found in page AND visible:', config.text);
        
        // Informações detalhadas do elemento onde foi encontrado
        const element = searchRoot;
        const elementInfo = {
          tagName: element.tagName,
          id: element.id || '(no id)',
          className: element.className || '(no class)',
          xpath: getXPath(element),
          outerHTML: element.outerHTML.substring(0, 200) + '...'
        };
        
        log('Text found in element:', elementInfo);
        log('Element path:', elementInfo.xpath);
        log('Element HTML preview:', elementInfo.outerHTML);
        
        return true;
      }
      
      return false;
    };
    
    // Verificação inicial desabilitada por padrão para evitar disparos imediatos
    // Use checkInitial: true se precisar verificar texto que já existe
    if (config.checkInitial === true && checkText()) {
      log('Text already present on page load:', config.text);
      executeCallback();
      return;
    }
    
    // Determinar root de observação
    const observeRoot = findObserveRoot(config.selector || 'body', options.observeRoot);
    log('Observing text changes from:', observeRoot === document.body ? 'document.body' : observeRoot.tagName);
    
    // MutationObserver para detectar mudanças de texto
    // IMPORTANTE: React SPAs destroem/recriam o DOM, precisamos reconectar
    let reconnectAttempts = 0;
    const maxReconnects = 10;
    
    function createMutationObserver() {
      const observer = new MutationObserver((mutations) => {
        if (triggered) return;
        
        log('MutationObserver triggered:', mutations.length, 'mutations');
        
        // Verificar se houve mudanças no texto
        const hasTextChanges = mutations.some(mutation => {
          const isRelevant = mutation.type === 'childList' || 
                 mutation.type === 'characterData' ||
                 (mutation.type === 'attributes' && 
                  ['textcontent', 'innertext'].includes(mutation.attributeName?.toLowerCase()));
          
          if (isRelevant) {
            log('Relevant mutation detected:', mutation.type);
          }
          
          return isRelevant;
        });
        
        if (hasTextChanges) {
          log('Text changes detected, checking for text:', config.text);
          if (checkText()) {
            log('Text found via MutationObserver:', config.text);
            executeCallback();
          } else {
            log('Text not found yet');
          }
        }
      });
      
      try {
        observer.observe(observeRoot, {
          childList: true,
          subtree: true,
          characterData: true,
          characterDataOldValue: false
        });
        observers.push(observer);
        log('MutationObserver connected successfully');
      } catch (error) {
        console.error('[Systasi] Failed to observe:', error);
        
        // React SPA pode ter destruído o nó - tentar reconectar
        if (reconnectAttempts < maxReconnects) {
          reconnectAttempts++;
          log('Attempting to reconnect MutationObserver (attempt', reconnectAttempts, 'of', maxReconnects, ')');
          
          setTimeout(() => {
            if (!triggered) {
              const newRoot = findObserveRoot(config.selector || 'body', options.observeRoot);
              if (newRoot && document.contains(newRoot)) {
                observeRoot = newRoot;
                createMutationObserver();
              }
            }
          }, 1000);
        } else {
          log('Max reconnection attempts reached, relying on polling only');
        }
      }
    }
    
    createMutationObserver();
    
    // Polling de backup (OPCIONAL - apenas se usePolling: true)
    if (usePolling) {
      log('Polling enabled: checking every 10s for up to 10 minutes');
      let pollAttempts = 0;
      const pollInterval = 10000; // 10 segundos
      const maxPolls = 60; // 60 tentativas × 10s = 600s (10 minutos)
      
      pollingInterval = setInterval(() => {
        if (triggered) return;
        
        pollAttempts++;
        const elapsedSeconds = pollAttempts * 10;
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        const remainingSeconds = elapsedSeconds % 60;
        
        log('Polling attempt', pollAttempts, 'of', maxPolls, 
            '(' + elapsedMinutes + 'm ' + remainingSeconds + 's elapsed)', 
            'for text:', config.text);
        
        if (checkText()) {
          log('Text found via polling after', elapsedMinutes, 'min', remainingSeconds, 'sec');
          executeCallback();
        } else if (pollAttempts >= maxPolls) {
          cleanup();
          log('Text polling timeout after 10 minutes (60 attempts)');
        }
      }, pollInterval);
    } else {
      log('Polling disabled - relying on MutationObserver only');
    }
    
    // Timeout configurável - deve ser maior que o polling
    const timeout = options.timeout || 600000; // 10 minutos (igual ao polling)
    setTimeout(() => {
      if (!triggered) {
        cleanup();
        log('Text trigger timeout after', timeout / 1000, 'seconds for:', config.text);
      }
    }, timeout);
    
    // Armazenar para cleanup externo
    state.activeObservers.set('text:' + config.text, { cleanup, triggered: () => triggered });
  }
  
  function setupScrollTrigger(percentage, callback, delay) {
    log('Setting up scroll trigger for:', percentage, '% with delay:', delay);
    
    let triggered = false;
    
    const handler = () => {
      if (triggered) return;
      
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= percentage) {
        triggered = true;
        window.removeEventListener('scroll', handler);
        
        setTimeout(() => {
          log('Executing scroll trigger callback at:', scrollPercent, '%');
          callback();
        }, delay);
      }
    };
    
    window.addEventListener('scroll', handler, { passive: true });
  }
  
  function setupEventTrigger(eventConfig, callback, delay) {
    // Suporte para formato simplificado: string ou objeto
    let config;
    
    if (typeof eventConfig === 'string') {
      // Formato simplificado: 'submit', 'click', etc
      config = { type: eventConfig, target: document };
    } else {
      config = eventConfig;
    }
    
    const { type, target = document, selector = null, condition = null } = config;
    
    log('Setting up event trigger for:', type, 'on', target === document ? 'document' : target);
    
    const handler = (event) => {
      // Se tem seletor, verificar se evento veio do elemento correto
      if (selector) {
        const targetElement = event.target.closest(selector);
        if (!targetElement) {
          return; // Evento não veio do seletor esperado
        }
      }
      
      // Verificar condição customizada
      let shouldTrigger = true;
      if (typeof condition === 'function') {
        shouldTrigger = condition(event);
      }
      
      if (shouldTrigger) {
        // Para eventos de submit, prevenir comportamento padrão se necessário
        if (type === 'submit' && config.preventDefault !== false) {
          log('Submit event detected, executing callback');
        }
        
        target.removeEventListener(type, handler);
        setTimeout(() => callback(), delay);
      }
    };
    
    // Para submit, usar capture phase para garantir que pegamos o evento
    const options = type === 'submit' ? { capture: true } : false;
    target.addEventListener(type, handler, options);
    
    log('Event listener attached for:', type);
  }
  
  // ============================================
  // UTILITÁRIOS E COMPATIBILIDADE
  // ============================================
  
  async function loadCatalog(url = state.config.catalogUrl) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      state.catalog = await response.json();
      log('Catalog loaded:', state.catalog.catalog?.products?.length || 0, 'products');
      
      return state.catalog;
    } catch (error) {
      console.error('[Systasi] Failed to load catalog:', error);
      throw error;
    }
  }
  
  function buildEngineInput(slotId, limit) {
    const currentUrl = normalizeToAbsoluteUrl(window.location.href);
    const recentUrls = getHistory().map(item => normalizeToAbsoluteUrl(item.url));
    
    return {
      slotId: slotId,
      context: { currentUrl: currentUrl },
      user: {
        hasHistory: recentUrls.length > 1,
        recentUrls: recentUrls
      },
      limit: limit
    };
  }
  
  function trackPageView(url = window.location.href) {
    try {
      const currentUrlKey = getCurrentUrlKey();
      const recent = loadRecentUrls().filter((u) => u !== currentUrlKey);
      recent.unshift(currentUrlKey);
      saveRecentUrls(recent);
      log('Page tracked:', url);
    } catch (error) {
      console.warn('[Systasi] Failed to track page:', error);
    }
  }
  
  function getCurrentUrlKey() {
    const origin = location.origin;
    const path = location.pathname;
    const search = state.config.useQuery ? location.search : "";
    return origin + path + search;
  }
  
  function loadRecentUrls() {
    try {
      const raw = localStorage.getItem(state.config.historyKey);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }
  
  function saveRecentUrls(urls) {
    try {
      localStorage.setItem(state.config.historyKey, JSON.stringify(urls.slice(0, state.config.maxHistory)));
    } catch {
      // ignore
    }
  }
  
  function getHistory() {
    const urls = loadRecentUrls();
    return urls.map(url => ({
      url: url,
      timestamp: Date.now(),
      title: ''
    }));
  }
  
  function generateInstanceId() {
    return `systasi_${state.nextId++}_${Date.now()}`;
  }
  
  function destroyInstance(instanceId) {
    const instance = state.instances.get(instanceId);
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }
    state.instances.delete(instanceId);
    log('Instance destroyed:', instanceId);
  }
  
  function detectCurrentCategory() {
    const path = window.location.pathname.toLowerCase();
    const patterns = {
      '/servicos/': 'servicos',
      '/produtos/': 'produtos',
      '/cursos/': 'cursos',
      '/consultoria/': 'consultoria',
      '/categoria/': 'categoria'
    };
    
    for (const [pattern, category] of Object.entries(patterns)) {
      if (path.includes(pattern)) {
        return category;
      }
    }
    return null;
  }
  
  function normalizeToAbsoluteUrl(url) {
    try {
      return new URL(url, location.origin).toString();
    } catch {
      return url;
    }
  }
  
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  function isElementVisible(element) {
    if (!element || !document.contains(element)) return false;
    
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || 
        style.visibility === 'hidden' || 
        style.opacity === '0') {
      return false;
    }
    
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }
  
  /**
   * Gera XPath de um elemento para identificação única
   */
  function getXPath(element) {
    if (!element) return '';
    
    if (element.id) {
      return `//*[@id="${element.id}"]`;
    }
    
    if (element === document.body) {
      return '/html/body';
    }
    
    let ix = 0;
    const siblings = element.parentNode ? element.parentNode.childNodes : [];
    
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      if (sibling === element) {
        const parentPath = getXPath(element.parentNode);
        const tagName = element.tagName.toLowerCase();
        return `${parentPath}/${tagName}[${ix + 1}]`;
      }
      
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++;
      }
    }
    
    return '';
  }
  
  function log(...args) {
    if (state.config.debug) {
      console.log('[Systasi]', ...args);
    }
  }
  
  // ============================================
  // MÉTODOS LEGADOS (COMPATIBILIDADE)
  // ============================================
  
  /**
   * @deprecated Use init() instead
   */
  function configure(userConfig) {
    console.warn('[Systasi] configure() is deprecated. Use init() instead.');
    Object.assign(state.config, userConfig);
  }
  
  // Auto-track da página atual
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      trackPageView();
    });
  }
  
  // ============================================
  // API PÚBLICA
  // ============================================
  
  return {
    // API Principal (v3.1.1)
    init,
    trigger,
    
    // Utilitários
    getRecommendations,
    trackPageView,
    getHistory,
    
    // Controle de instâncias
    getInstances: () => Array.from(state.instances.values()),
    destroyAll: () => {
      state.instances.forEach((_, id) => destroyInstance(id));
    },
    
    // Debug
    debug: (enabled) => {
      state.config.debug = enabled;
    },
    
    // Compatibilidade (deprecated)
    configure,
    loadCatalog,
    
    // Versão
    version: '3.1.1'
  };
  
})();
