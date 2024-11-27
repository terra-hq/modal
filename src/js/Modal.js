class Modal {
    constructor(options = {}) {
      const defaults = {
        onShow: (modal) => {
            if (options.debug) console.info(`${modal.id} is shown`);
          },
          onClose: (modal) => {
            if (options.debug) console.info(`${modal.id} is hidden`);
          },
        beforeOpen: (modal) => {}, // Acción antes de abrir el modal
        beforeClose: (modal) => {}, // Acción antes de cerrar el modal
        openTrigger: 'data-modal-open',
        closeTrigger: 'data-modal-close',
        openClass: 'c--modal-a--is-open',
        disableScroll: true,
        debug: false, // Nueva opción para habilitar/inhabilitar mensajes de depuración
      };
  
      this.settings = { ...defaults, ...options };
  
      this.DOM = {
        modals: document.querySelectorAll('.c--modal-a'),
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
        console.error('No modals found.');
        return;
      }
  
      this.logDebug(`Found ${this.DOM.modals.length} modals.`);
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
            this.logDebug(`Open trigger clicked for modal ID: ${modalId}`);
            if (typeof this.settings.beforeOpen === 'function') {
              this.settings.beforeOpen(modal);
            }
            this.open(modal);
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
          if (typeof this.settings.beforeClose === 'function') {
            this.settings.beforeClose(modal);
          }
          this.close(modal);
        };
        trigger.addEventListener('click', closeListener);
        this.eventListeners.push({ element: trigger, type: 'click', listener: closeListener });
      });
  
      // Cerrar el modal al hacer clic en la superposición
      const overlayListener = (event) => {
        if (event.target === modal.querySelector('.c--modal-a__overlay')) {
          this.logDebug(`Overlay clicked for modal ID: ${modalId}`);
          if (typeof this.settings.beforeClose === 'function') {
            this.settings.beforeClose(modal);
          }
          this.close(modal);
        }
      };
      modal.addEventListener('click', overlayListener);
      this.eventListeners.push({ element: modal, type: 'click', listener: overlayListener });
  
      // Cerrar el modal con la tecla Escape
      const escapeListener = (event) => {
        if (event.key === 'Escape' && this.isOpen(modal)) {
          this.logDebug(`Escape key pressed for modal ID: ${modalId}`);
          if (typeof this.settings.beforeClose === 'function') {
            this.settings.beforeClose(modal);
          }
          this.close(modal);
        }
      };
      document.addEventListener('keydown', escapeListener);
      this.eventListeners.push({ element: document, type: 'keydown', listener: escapeListener });
    }
  
    open(modal) {
      this.logDebug(`Opening modal ID: ${modal.id}`);
      modal.classList.add(this.settings.openClass);
      modal.setAttribute('aria-hidden', 'false');
  
      if (this.settings.disableScroll) {
        document.body.style.overflow = 'hidden';
      }
  
      if (typeof this.settings.onShow === 'function') {
        this.settings.onShow(modal);
      }
    }
  
    close(modal) {
      this.logDebug(`Closing modal ID: ${modal.id}`);
      modal.classList.remove(this.settings.openClass);
      modal.setAttribute('aria-hidden', 'true');
  
      if (this.settings.disableScroll) {
        document.body.style.overflow = '';
      }
  
      if (typeof this.settings.onClose === 'function') {
        this.settings.onClose(modal);
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
  