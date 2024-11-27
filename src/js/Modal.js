class Modal {
    constructor(options = {}) {
      const defaults = {
        onShow: (modal) => console.info(`${modal.id} is shown`),
        onClose: (modal) => console.info(`${modal.id} is hidden`),
        beforeOpen: (modal) => {},
        beforeClose: (modal) => {},
        openTrigger: 'data-modal-open',
        closeTrigger: 'data-modal-close',
        openClass: 'c--modal-a--is-open',
        disableScroll: true,
        disableFocus: false,
        awaitOpenAnimation: false,
        awaitCloseAnimation: false,
        debugMode: false,
      };
  
      this.settings = { ...defaults, ...options };
      this.modals = document.querySelectorAll('.c--modal-a');
      this.init();
    }
  
    init() {
      if (this.modals.length === 0) {
        if (this.settings.debugMode) {
          console.error('No modals found in the document.');
        }
        return;
      }
  
      this.modals.forEach((modal) => {
        this.addEventListeners(modal);
      });
    }
  
    addEventListeners(modal) {
      const modalId = modal.id;
  
      document.querySelectorAll(`[${this.settings.openTrigger}="${modalId}"]`).forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
          event.preventDefault();
          this.open(modal);
        });
      });
  
      modal.querySelectorAll(`[${this.settings.closeTrigger}]`).forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
          event.preventDefault();
          this.close(modal);
        });
      });
  
      modal.addEventListener('click', (event) => {
        if (event.target === modal && this.settings.closeOnOverlayClick) {
          this.close(modal);
        }
      });
  
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.isOpen(modal)) {
          this.close(modal);
        }
      });
    }
  
    open(modal) {
      if (typeof this.settings.beforeOpen === 'function') {
        this.settings.beforeOpen(modal);
      }
  
      modal.classList.add(this.settings.openClass);
      modal.setAttribute('aria-hidden', 'false');
  
      if (this.settings.disableScroll) {
        document.body.style.overflow = 'hidden';
      }
  
      if (!this.settings.disableFocus) {
        modal.focus();
      }
  
      if (typeof this.settings.onShow === 'function') {
        this.settings.onShow(modal);
      }
    }
  
    close(modal) {
      if (typeof this.settings.beforeClose === 'function') {
        this.settings.beforeClose(modal);
      }
  
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
  }

  export default Modal;