import "./../scss/style.scss";
import Modal from "./Modal";

document.addEventListener("DOMContentLoaded", () => {
    

    // Initialize the Modal library
    const modal = new Modal({
        onShow: (modal, trigger) => console.info(`Modal "${modal.id}" opened by`, trigger),
        onClose: (modal, trigger) => console.info(`Modal "${modal.id}" closed by`, trigger),
        openTrigger: 'modal-open',
        closeTrigger: 'modal-close',
        openClassSuffix: '--is-active',
        closeClassSuffix: '--is-closing',
        disableScroll: true,
        debugMode: true,
    });
  

      
});
