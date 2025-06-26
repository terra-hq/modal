import "./../scss/style.scss";
import Modal from "./Modal";

document.addEventListener('DOMContentLoaded', () => {
    // Simple modal instance with all callbacks for demonstration
    const modal = new Modal({
        debug: true,
        
        beforeOpen: (modal, trigger) => {
            console.log(`Before opening modal: ${modal.id}`);
            console.log('Triggered by:', trigger);
        },
        
        onShow: (modal, trigger) => {
            console.log(`Modal opened: ${modal.id}`);
            console.log('Opened by:', trigger);
        },
        
        beforeClose: (modal, trigger) => {
            console.log(`Before closing modal: ${modal.id}`);
            console.log('Close triggered by:', trigger);
        },
        
        onClose: (modal, trigger) => {
            console.log(`Modal closed: ${modal.id}`);
            console.log('Closed by:', trigger);
        }
    });

    // Custom event for the js--fire link
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
                source: 'js--fire link',
                method: 'custom event'
            };
            
            modal.open(programmaticModal, customTrigger);
        });
    }

    console.log('Modal initialized with debug enabled - check console for events');
    console.log('Now callbacks receive both modal and trigger information!');
});
