# Modal.js

A lightweight, configurable modal library for managing modals with support for dynamic triggers, callbacks, and debugging.

## Features

- Easy to integrate and configure.
- Supports callbacks for modal events (`onShow`, `onClose`, `beforeOpen`, `beforeClose`).
- Configurable CSS classes and attributes.
- Debugging mode for development.
- Dynamically handles open and close triggers.

## Installation

### Using npm:
```bash
npm install @terrahq/modal
```


## Usage Example

### Javascript
```javascript
import Modal from "@terrahq/modal";

const modal = new Modal({
    selector: '#my-modal',
    debug: true,
    onShow: (modal) => console.log(`Modal ${modal.id} is now visible`),
    onClose: (modal) => console.log(`Modal ${modal.id} is now hidden`),
  });

// Additional methods
counter.play(); // Start the animation manually
counter.update(); // Update the ScrollTrigger position
counter.destroy(); // Clean up the instance and stop animations
```
### HTML
```html
<!-- Open trigger -->
<button data-modal-open="my-modal">Open Modal</button>

<!-- Modal -->
<div id="my-modal" class="c--modal-a" aria-hidden="true">
  <div class="c--modal-a__overlay"></div>
  <div class="c--modal-a__content">
    <button data-modal-close>×</button>
    <p>This is a modal</p>
  </div>
</div>
```



### Constructor Parameters

### Configuration Options

| Option         | Type       | Default                | Description                                                       |
|-----------------|------------|------------------------|-------------------------------------------------------------------|
| `selector`      | `string`   | `.c--modal-a`          | CSS selector for the modal container.                            |
| `onShow`        | `Function` | `null`                 | Callback after the modal is shown. Receives the modal element.    |
| `onClose`       | `Function` | `null`                 | Callback after the modal is hidden. Receives the modal element.   |
| `beforeOpen`    | `Function` | `null`                 | Callback before the modal is opened. Receives the modal element.  |
| `beforeClose`   | `Function` | `null`                 | Callback before the modal is closed. Receives the modal element.  |
| `openTrigger`   | `string`   | `data-modal-open`      | Attribute for open buttons.                                       |
| `closeTrigger`  | `string`   | `data-modal-close`     | Attribute for close buttons.                                      |
| `openClass`     | `string`   | `c--modal-a--is-open`  | Class added to the modal when it is open.                         |
| `disableScroll` | `boolean`  | `true`                 | If true, disables body scrolling when the modal is open.          |
| `debug`         | `boolean`  | `false`                | Enables debug messages in the console.                           |

---

### Public Methods

| Method          | Description                                           |
|------------------|-------------------------------------------------------|
| `open(modal)`    | Opens the specified modal programmatically.           |
| `close(modal)`   | Closes the specified modal programmatically.          |
| `isOpen(modal)`  | Returns `true` if the modal is currently open.         |
| `destroy()`      | Removes all event listeners and cleans up resources.  |

