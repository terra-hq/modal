import "./../scss/style.scss";
import Modal from "./Modal";

document.addEventListener('DOMContentLoaded', () => {
  new Modal({
    // onShow: (modal) => console.log(`${modal.id} abierto`),
    // onClose: (modal) => console.log(`${modal.id} cerrado`),
    debug: false, 
  });
});
