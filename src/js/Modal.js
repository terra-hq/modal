class Modal {
    constructor(options = {}) {
      const defaults = {
        onShow: (modal) => console.info(`${modal.id} is shown`),
        onClose: (modal) => console.info(`${modal.id} is hidden`),
        openTrigger: 'data-modal-open',
        closeTrigger: 'data-modal-close',
        openClass: 'c--modal-a--is-open',
        disableScroll: true,
      };
  
      this.settings = { ...defaults, ...options };
      this.modals = document.querySelectorAll('.c--modal-a');
      this.init();
    }
  
    init() {
      if (this.modals.length === 0) {
        console.error('No modals found.');
        return;
      }
  
      this.modals.forEach((modal) => this.addEventListeners(modal));
    }
  
    addEventListeners(modal) {
      const modalId = modal.id;
  
      // Botones para abrir el modal
      document.querySelectorAll(`[${this.settings.openTrigger}="${modalId}"]`).forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
          event.preventDefault();
          this.open(modal);
        });
      });
  
      // Botones para cerrar el modal
      modal.querySelectorAll(`[${this.settings.closeTrigger}]`).forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
          event.preventDefault();
          this.close(modal);
        });
      });
  
      // Cerrar el modal al hacer clic en la superposición
      modal.addEventListener('click', (event) => {
        if (event.target === modal.querySelector('.c--modal-a__overlay')) {
          this.close(modal);
        }
      });
  
      // Cerrar el modal con la tecla Escape
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.isOpen(modal)) {
          this.close(modal);
        }
      });
    }
  
    open(modal) {
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
  