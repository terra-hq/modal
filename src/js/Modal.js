class Modal {
    constructor(config = {}) {
      const defaults = {
        onShow: (modal, trigger) => console.info(`${modal.id} is shown`),
        onClose: (modal, trigger) => console.info(`${modal.id} is hidden`),
        openTrigger: 'modal-open',
        closeTrigger: 'modal-close',
        openClass: 'is-open',
        disableScroll: true,
        disableFocus: false,
        awaitOpenAnimation: false,
        awaitCloseAnimation: true, // Habilitar espera por animación de cierre
        debugMode: false,
      };
  
      this.config = { ...defaults, ...config };
      this.modals = {};
      this.init();
    }
  
    init() {
      document.querySelectorAll(`[${this.config.openTrigger}]`).forEach(trigger => {
        const modalId = trigger.getAttribute(this.config.openTrigger);
        const modal = document.getElementById(modalId);
  
        if (!modal) {
          if (this.config.debugMode) console.warn(`Modal with id ${modalId} not found`);
          return;
        }
  
        this.modals[modalId] = modal;
  
        const openListener = () => this.show(modalId, trigger);
        trigger.addEventListener('click', openListener);
      });
  
      document.querySelectorAll(`[${this.config.closeTrigger}]`).forEach(closeBtn => {
        const closeListener = () => {
          const modal = closeBtn.closest('.modal');
          if (modal) this.close(modal.id, closeBtn);
        };
  
        closeBtn.addEventListener('click', closeListener);
      });

      document.addEventListener('keydown', event => {
        if (event.key === "Escape") {
          Object.keys(this.modals).forEach(modalId => {
            const modal = this.modals[modalId];
            if (modal && modal.getAttribute('aria-hidden') === 'false') {
              this.close(modalId);
            }
          });
        }
      });
    }
  
    show(modalId, trigger) {
      const modal = this.modals[modalId];
      if (!modal) return;
  
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add(this.config.openClass);
  
      if (this.config.disableScroll) document.body.style.overflow = 'hidden';
  
      this.config.onShow(modal, trigger);
    }
  
    close(modalId, trigger) {
      const modal = this.modals[modalId];
      if (!modal) return;
  
      modal.classList.add('is-closing'); // Añadir clase que inicia la animación de cierre
  
      const endAnimation = () => {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove(this.config.openClass, 'is-closing');
        if (this.config.disableScroll) document.body.style.overflow = '';
  
        this.config.onClose(modal, trigger);
        modal.removeEventListener('animationend', endAnimation);
      };
  
      modal.addEventListener('animationend', endAnimation);
    }
  
    destroy() {
      Object.values(this.modals).forEach(modal => {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove(this.config.openClass, 'is-closing');
      });
      this.modals = {};
    }
}

export default Modal;
