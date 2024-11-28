import "./../scss/style.scss";
import Modal from "./Modal";

document.addEventListener('DOMContentLoaded', () => {
    var modal = new Modal({
        // onShow: (modal) => console.log(`${modal.id} abierto`),
        // onClose: (modal) => console.log(`${modal.id} cerrado`),
        debug: false, 
        beforeOpen: (modal) => {
            document.getElementById('modal-1-title').innerHTML = `hola`
        }, // Acción antes de abrir el modal
    });



    document.querySelector('.js--fire').addEventListener('click', (e) => {
        e.preventDefault();
        modal.open(document.querySelector('#modal-1'));
    });


});
