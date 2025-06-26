/**
 * Class representing a configurable modal dialog.
 * Handles opening, closing, and managing modal dialogs with support for callbacks, debug messages, and dynamic selectors.
 */

class Modal {
    /**
   * Creates an instance of Modal.
   * @param {Object} options - Configuration options for the modal.
   * @param {string} [options.selector='.c--modal-a'] - Selector for the modal container. Default is `.c--modal-a`.
   * @param {Function} [options.onShow] - Callback invoked after the modal is shown. Receives the modal element and trigger info as parameters.
   * @param {Function} [options.onClose] - Callback invoked after the modal is hidden. Receives the modal element and trigger info as parameters.
   * @param {Function} [options.beforeOpen] - Callback invoked before the modal is opened. Receives the modal element and trigger info as parameters.
   * @param {Function} [options.beforeClose] - Callback invoked before the modal is closed. Receives the modal element and trigger info as parameters.
   * @param {string} [options.openTrigger='data-modal-open'] - Attribute for open buttons. Default is `data-modal-open`.
   * @param {string} [options.closeTrigger='data-modal-close'] - Attribute for close buttons. Default is `data-modal-close`.
   * @param {string} [options.openClass='c--modal-a--is-open'] - Class added to the modal when it is open. Default is `c--modal-a--is-open`.
   * @param {boolean} [options.disableScroll=true] - If true, disables body scrolling when the modal is open. Default is `true`.
   * @param {boolean} [options.debug=false] - If true, enables debug messages in the console. Default is `false`.
   */

    constructor(options = {}) {
      const defaults = {
        selector: '.c--modal-a', // Selector configurable para el modal
        onShow: (modal) => {
          if (options.debug) console.info(`${modal.id} is shown`);
        },
        
        onClose: (modal) => {
          if (options.debug) console.info(`${modal.id} is hidden`);
        },
        beforeOpen: (modal) => {if (options.debug) console.info(`${modal.id} is hidden`);}, // Acción antes de abrir el modal
        beforeClose: (modal) => {}, // Acción antes de cerrar el modal
        openTrigger: 'data-modal-open',
        closeTrigger: 'data-modal-close',
        openClass: 'c--modal-a--is-open',
        disableScroll: true,
        debug: false, // Nueva opción para habilitar/inhabilitar mensajes de depuración
      };
  
      this.settings = { ...defaults, ...options };
  
      this.DOM = {
        modals: document.querySelectorAll(this.settings.selector), // Selector dinámico
        openTriggers: document.querySelectorAll(`[${this.settings.openTrigger}]`),
        closeTriggers: document.querySelectorAll(`[${this.settings.closeTrigger}]`),
      };
  
      this.eventListeners = [];
  
      this.init();
      this.events();
    }
  
    logDebug(message) {
      if (this.settings.debug) {
        console.debug(`[Modal Debug]: ${message}`);
      }
    }
  
    init() {
      if (this.DOM.modals.length === 0) {
        console.error(`No modals found with selector "${this.settings.selector}".`);
        return;
      }
  
      this.logDebug(`Found ${this.DOM.modals.length} modals with selector "${this.settings.selector}".`);
    }
  
    events() {
      this.DOM.modals.forEach((modal) => this.addEventListeners(modal));
    }
  
    addEventListeners(modal) {
      const modalId = modal.id;
  
      // Botones para abrir el modal
      this.DOM.openTriggers.forEach((trigger) => {
        if (trigger.getAttribute(this.settings.openTrigger) === modalId) {
          const openListener = (event) => {
            event.preventDefault();
            
            const triggerInfo = {
              type: 'element',
              element: trigger,
              tagName: trigger.tagName.toLowerCase(),
              text: trigger.textContent?.trim() || '',
              id: trigger.id || null
            };
            
            this.open(modal, triggerInfo);
          };
          trigger.addEventListener('click', openListener);
          this.eventListeners.push({ element: trigger, type: 'click', listener: openListener });
        }
      });
  
      // Botones para cerrar el modal
      modal.querySelectorAll(`[${this.settings.closeTrigger}]`).forEach((trigger) => {
        const closeListener = (event) => {
          event.preventDefault();
          this.logDebug(`Close trigger clicked for modal ID: ${modalId}`);
          
          const triggerInfo = {
            type: 'element',
            element: trigger,
            tagName: trigger.tagName.toLowerCase(),
            text: trigger.textContent?.trim() || '',
            id: trigger.id || null,
            action: 'close'
          };
          
          this.close(modal, triggerInfo);
        };
        trigger.addEventListener('click', closeListener);
        this.eventListeners.push({ element: trigger, type: 'click', listener: closeListener });
      });
  
      // Cerrar el modal al hacer clic en la superposición
      const overlayListener = (event) => {
        if (event.target === modal.querySelector(`${this.settings.selector}__overlay`)) {
          this.logDebug(`Overlay clicked for modal ID: ${modalId}`);
          
          const triggerInfo = {
            type: 'overlay',
            element: event.target,
            action: 'close'
          };
          
          this.close(modal, triggerInfo);
        }
      };
      modal.addEventListener('click', overlayListener);
      this.eventListeners.push({ element: modal, type: 'click', listener: overlayListener });
  
      // Cerrar el modal con la tecla Escape
      const escapeListener = (event) => {
        if (event.key === 'Escape' && this.isOpen(modal)) {
          this.logDebug(`Escape key pressed for modal ID: ${modalId}`);
          
          const triggerInfo = {
            type: 'keyboard',
            key: event.key,
            action: 'close'
          };
          
          this.close(modal, triggerInfo);
        }
      };
      document.addEventListener('keydown', escapeListener);
      this.eventListeners.push({ element: document, type: 'keydown', listener: escapeListener });
    }
  
    open(modal, triggerInfo = null) {
      // If no trigger info provided, assume programmatic call
      const trigger = triggerInfo || {
        type: 'programmatic',
        source: 'manual',
        method: 'open()'
      };

      if (typeof this.settings.beforeOpen === 'function') {
        this.settings.beforeOpen(modal, trigger);
      }
    
      this.logDebug(`Opening modal ID: ${modal.id}`);
      modal.classList.add(this.settings.openClass);
      modal.setAttribute('aria-hidden', 'false');
    
      if (this.settings.disableScroll) {
        document.body.style.overflow = 'hidden';
      }
    
      if (typeof this.settings.onShow === 'function') {
        this.settings.onShow(modal, trigger);
      }
    }
    async close(modal, triggerInfo = null) {
      // If no trigger info provided, assume programmatic call
      const trigger = triggerInfo || {
        type: 'programmatic',
        source: 'manual',
        method: 'close()',
        action: 'close'
      };

      if (typeof this.settings.beforeClose === 'function') {
        await this.settings.beforeClose(modal, trigger);
      }
    
      this.logDebug(`Closing modal ID: ${modal.id}`);
      modal.classList.remove(this.settings.openClass);
      modal.setAttribute('aria-hidden', 'true');
    
      if (this.settings.disableScroll) {
        document.body.style.overflow = '';
      }
    
      if (typeof this.settings.onClose === 'function') {
        this.settings.onClose(modal, trigger);
      }
    }
  
    isOpen(modal) {
      return modal.classList.contains(this.settings.openClass);
    }
  
    destroy() {
      this.logDebug('Destroying all event listeners.');
      // Eliminar todos los event listeners
      this.eventListeners.forEach(({ element, type, listener }) => {
        element.removeEventListener(type, listener);
      });
      this.eventListeners = [];
      console.info('All modal event listeners have been removed.');
    }
  }
  
  export default Modal;
