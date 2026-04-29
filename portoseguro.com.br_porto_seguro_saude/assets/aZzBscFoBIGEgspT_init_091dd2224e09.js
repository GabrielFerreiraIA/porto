/**
 * Systasi Init - Loader e Auto-inicializador
 * Version: 3.1.2
 * 
 * Compatível com Systasi Core v3.1.1
 * Suporta: elementTrigger, textTrigger, eventTrigger, scrollTrigger
 * Browsers: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
 * 
 * Uso via window.SystasiConfig:
 *   <script>
 *     window.SystasiConfig = {
 *       coreUrl: 'https://cdn.com/core.js',
 *       modalUrl: 'https://cdn.com/modal.js',
 *       widgetUrl: 'https://cdn.com/widget.js',
 *       cssUrl: 'https://cdn.com/style.css',
 *       dataUrl: 'https://cdn.com/data.json',
 *       
 *       // Trigger config
 *       type: 'modal',
 *       textTrigger: 'Recebemos seu contato',
 *       delay: 2000,
 *       limit: 3,
 *       
 *       // Debug
 *       debug: true
 *     };
 *   </script>
 *   <script src="init.js"></script>
 */

(function(window, document) {
  'use strict';
  
  var DEBUG_PREFIX = '[Systasi Init]';
  
  /**
   * Log helper
   */
  function log() {
    if (window.SYSTASI_DEBUG || (window.SystasiConfig && window.SystasiConfig.debug)) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(DEBUG_PREFIX);
      console.log.apply(console, args);
    }
  }
  
  /**
   * Error log helper
   */
  function logError() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(DEBUG_PREFIX);
    console.error.apply(console, args);
  }
  
  /**
   * Load script dynamically
   */
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (document.querySelector(`script[src="${url}"]`)) {
        log('Script already loaded:', url);
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      
      script.onload = () => {
        log('✅ Loaded:', url);
        resolve();
      };
      
      script.onerror = () => {
        console.error(DEBUG_PREFIX, '❌ Failed to load:', url);
        reject(new Error(`Failed to load script: ${url}`));
      };
      
      document.head.appendChild(script);
    });
  }
  
  /**
   * Load CSS dynamically
   */
  function loadCSS(url) {
    return new Promise((resolve) => {
      // Check if already loaded
      if (document.querySelector(`link[href="${url}"]`)) {
        log('CSS already loaded:', url);
        resolve();
        return;
      }
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      
      link.onload = () => {
        log('✅ CSS loaded:', url);
        resolve();
      };
      
      link.onerror = () => {
        console.warn(DEBUG_PREFIX, '⚠️ Failed to load CSS:', url);
        resolve(); // Continue mesmo se CSS falhar
      };
      
      document.head.appendChild(link);
    });
  }
  
  /**
   * Wait for Systasi core to be available
   */
  function waitForSystasi(timeout) {
    timeout = timeout || 10000; // 10 segundos default
    
    return new Promise(function(resolve, reject) {
      var startTime = Date.now();
      var attempts = 0;
      
      function check() {
        attempts++;
        
        if (window.Systasi && typeof window.Systasi.init === 'function') {
          log('Systasi ready after', attempts, 'attempts');
          resolve(window.Systasi);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout waiting for Systasi after ' + timeout + 'ms'));
        } else {
          setTimeout(check, 100);
        }
      }
      
      check();
    });
  }
  
  /**
   * Main initialization function
   */
  function initialize() {
    log('Starting Systasi initialization...');
    log('User Agent:', navigator.userAgent);
    
    // Get config from window.SystasiConfig
    var config = window.SystasiConfig || {};
    log('Config:', JSON.stringify(config, null, 2));
    
    // Validation
    if (!config.coreUrl) {
      logError('FATAL: coreUrl is required in SystasiConfig');
      return;
    }
    
    // 1. Load CSS first (non-blocking)
    if (config.cssUrl) {
      loadCSS(config.cssUrl).catch(function(err) {
        console.warn(DEBUG_PREFIX, 'CSS load error:', err);
      });
    }
    
    // 2. Load core.js
    loadScript(config.coreUrl)
      .then(function() {
        // 3. Load modal.js or widget.js based on type
        if (config.type === 'modal' && config.modalUrl) {
          return loadScript(config.modalUrl);
        } else if (config.type === 'widget' && config.widgetUrl) {
          return loadScript(config.widgetUrl);
        }
        return Promise.resolve();
      })
      .then(function() {
        // 4. Wait for Systasi to be ready
        return waitForSystasi(config.timeout);
      })
      .then(function(Systasi) {
        log('Initializing Systasi core...');
        
        // 5. Initialize Systasi Core
        return Systasi.init({
          catalogUrl: config.dataUrl || config.catalogUrl,
          debug: config.debug || false,
          strategy: config.strategy || 'mixed',
          limit: config.limit || 6
        }).then(function() {
          return Systasi;
        });
      })
      .then(function(Systasi) {
        log('Setting up trigger...');
        
        // 6. Setup trigger with ALL parameters
        var triggerConfig = {
          type: config.type || 'modal',
          strategy: config.strategy,
          limit: config.limit,
          slot: config.slot,
          title: config.title,
          layout: config.layout,
          theme: config.theme,
          delay: config.delay || 0,
          excludeCurrentUrl: config.excludeCurrentUrl,
          
          // Triggers
          elementTrigger: config.elementTrigger,
          textTrigger: config.textTrigger,
          eventTrigger: config.eventTrigger,
          scrollTrigger: config.scrollTrigger,
          
          // MutationObserver options
          observeRoot: config.observeRoot,
          observeTimeout: config.observeTimeout,
          
          // Widget-specific
          anchor: config.anchor,
          anchorMode: config.anchorMode,
          container: config.container,
          
          // Callbacks
          onShow: config.onShow,
          onHide: config.onHide,
          onReady: config.onReady,
          onProductClick: config.onProductClick
        };
        
        // Remove undefined values
        Object.keys(triggerConfig).forEach(function(key) {
          if (triggerConfig[key] === undefined) {
            delete triggerConfig[key];
          }
        });
        
        log('Trigger config:', triggerConfig);
        
        // 7. Trigger
        var instance = Systasi.trigger(triggerConfig);
        
        log('Systasi initialized successfully');
        
        // Expose globally for debugging
        window.SYSTASI_INSTANCE = instance;
        window.SYSTASI_CORE = Systasi;
        
        return instance;
      })
      .catch(function(error) {
        logError('Initialization failed:', error);
        logError('Error stack:', error.stack);
        
        // Call error callback if provided
        if (config.onError && typeof config.onError === 'function') {
          try {
            config.onError(error);
          } catch (callbackError) {
            logError('Error callback failed:', callbackError);
          }
        }
      });
  }
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM already loaded
    initialize();
  }
  
})(window, document);