import "./../scss/style.scss";
import Modal from "./Modal";

document.addEventListener("DOMContentLoaded", () => {
    

    // Initialize the Modal library
    const modalInstance = new Modal({
        onShow: (modal) => console.info(`${modal.id} se ha mostrado`),
        onClose: (modal) => console.info(`${modal.id} se ha ocultado`),
        beforeOpen: (modal) => console.info(`Antes de abrir ${modal.id}`),
        beforeClose: (modal) => console.info(`Antes de cerrar ${modal.id}`),
        openTrigger: 'data-modal-open',
        closeTrigger: 'data-modal-close',
        openClass: 'c--modal-a--is-open',
        disableScroll: true,
        disableFocus: false,
        awaitOpenAnimation: false,
        awaitCloseAnimation: false,
        debugMode: true,
      });
      
      
  

      
});
