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
| `onShow`        | `Function` | `null`                 | Callback after the modal is shown. Receives the modal element and trigger info. |
| `onClose`       | `Function` | `null`                 | Callback after the modal is hidden. Receives the modal element and trigger info. |
| `beforeOpen`    | `Function` | `null`                 | Callback before the modal is opened. Receives the modal element and trigger info. |
| `beforeClose`   | `Function` | `null`                 | Callback before the modal is closed. Receives the modal element and trigger info. |
| `openTrigger`   | `string`   | `data-modal-open`      | Attribute for open buttons.                                       |
| `closeTrigger`  | `string`   | `data-modal-close`     | Attribute for close buttons.                                      |
| `openClass`     | `string`   | `c--modal-a--is-open`  | Class added to the modal when it is open.                         |
| `disableScroll` | `boolean`  | `true`                 | If true, disables body scrolling when the modal is open.          |
| `debug`         | `boolean`  | `false`                | Enables debug messages in the console.                           |

---

### Callback Trigger Information

All callback functions (`onShow`, `onClose`, `beforeOpen`, `beforeClose`) receive two parameters:
1. **modal**: The modal element
2. **triggerInfo**: Object containing information about what triggered the modal action

#### Trigger Info Types

**Element Trigger (buttons, links):**
```javascript
{
  type: 'element',
  element: buttonElement,
  tagName: 'button',
  text: 'Open Modal',
  id: 'button-id'
}
```

**Programmatic Trigger:**
```javascript
{
  type: 'programmatic',
  source: 'manual',
  method: 'open()'
}
```

**Close Triggers:**
- **Close button**: `{ type: 'element', action: 'close', ... }`
- **Overlay click**: `{ type: 'overlay', action: 'close' }`
- **Escape key**: `{ type: 'keyboard', key: 'Escape', action: 'close' }`

#### Example Usage:
```javascript
const modal = new Modal({
    onShow: (modal, trigger) => {
        console.log(`Modal ${modal.id} opened by:`, trigger.type);
        if (trigger.type === 'element') {
            console.log(`Triggered by: ${trigger.text}`);
        }
    },
    
    onClose: (modal, trigger) => {
        console.log(`Modal ${modal.id} closed by:`, trigger.type);
        if (trigger.type === 'keyboard') {
            console.log(`Closed with ${trigger.key} key`);
        }
    }
});

// Custom programmatic call with trigger info
modal.open(modalElement, {
    type: 'custom',
    source: 'my-action',
    data: { userId: 123 }
});
```

---

### Public Methods

| Method          | Description                                           |
|------------------|-------------------------------------------------------|
| `open(modal, triggerInfo)`    | Opens the specified modal programmatically. Optional triggerInfo parameter. |
| `close(modal, triggerInfo)`   | Closes the specified modal programmatically. Optional triggerInfo parameter. |
| `isOpen(modal)`  | Returns `true` if the modal is currently open.         |
| `destroy()`      | Removes all event listeners and cleans up resources.  |


### ChangeLog

**0.0.06** - Recent update 

**0.0.05** - Refactor callbacks 

**0.0.04** - Version update

**0.0.03** - Update dist from custom triggers

**0.0.02** - Update callbacks when using custom triggers

**0.0.01** - First Release
