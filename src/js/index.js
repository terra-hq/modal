import "./../scss/style.scss";
import Modal from "./Modal";



const modal1 = new Modal({
  selector: document.getElementById('modal-1'),
  debug: true,
  onShow: (modal, trigger) => console.log(`Modal ${modal.id} is now visible`, trigger),
  onClose: (modal, trigger) => console.log(`Modal ${modal.id} is now hidden`, trigger),
});

const modal2 = new Modal({
  selector: document.getElementById('modal-2'),
  debug: true,
  onShow: (modal, trigger) => console.log(`Modal ${modal.id} is now visible`, trigger),
  onClose: (modal, trigger) => console.log(`Modal ${modal.id} is now hidden`, trigger),
});


const busyModal = new Modal({
  selector: document.getElementById('busy'),
  debug: true,
  onShow: (modal, trigger) => console.log(`Modal ${modal.id} is now visible`, trigger),
  onClose: (modal, trigger) => console.log(`Modal ${modal.id} is now hidden`, trigger),
});

const btn = document.querySelector('.js--advanced');
btn.addEventListener("click", (e) => {
  e.preventDefault();
  busyModal.open(document.getElementById("busy"));
});


const programatic = new Modal({
  selector: document.getElementById('modal-programmatic'),
  debug: true,
  onShow: (modal, trigger) => console.log(`Modal ${modal.id} is now visible`, trigger),
  onClose: (modal, trigger) => console.log(`Modal ${modal.id} is now hidden`, trigger),
});


document.addEventListener('DOMContentLoaded', () => {
  const fireLink = document.querySelector('.js--fire');
  if (fireLink) {
    fireLink.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Custom event triggered!');
      
      const programmaticModal = document.getElementById('modal-programmatic');

      // Create custom trigger info for this programmatic call
      const customTrigger = {
        type: 'custom',
        element: fireLink,
        source: 'js--fire',
        method: 'custom event'
      };

      programatic.open(programmaticModal, customTrigger);
    });
  }
})



const toggleModal = new Modal({
  selector: document.getElementById('toggle'),
  debug: true,
  onShow: (modal, trigger) => console.log(`Modal ${modal.id} is now visible`, trigger),
  onClose: (modal, trigger) => console.log(`Modal ${modal.id} is now hidden`, trigger),
});

document.addEventListener('DOMContentLoaded', () => {
  const fireLink = document.querySelector('.js--toggle-btn');
  if (fireLink) {
    fireLink.addEventListener('click', (e) => {
      e.preventDefault();
      toggleModal.toggle();
    });
  }
})
