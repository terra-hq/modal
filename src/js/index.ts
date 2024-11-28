import "./../scss/style.scss";
import Modal from "./Modal";

document.addEventListener('DOMContentLoaded', () => {
    var modal = new Modal({
        // onShow: (modal) => console.log(`${modal.id} abierto`),
        // onClose: (modal) => console.log(`${modal.id} cerrado`),
        debug: false, 
        beforeOpen: (modal) => {
            console.log('por abrir')
        }, // Acción antes de abrir el modal
    });



    

});
