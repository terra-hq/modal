import "./../scss/style.scss";
import Modal from "./Modal";

document.addEventListener('DOMContentLoaded', () => {
    var modal = new Modal({
        // onShow: (modal) => console.log(`${modal.id} abierto`),
        // onClose: (modal) => console.log(`${modal.id} cerrado`),
        debug: false, 
    });



    document.querySelector('.js--fire').addEventListener('click', (e) => {
        e.preventDefault();
        modal.open(document.querySelector('#modal-1'));
    });


});
