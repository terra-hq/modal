# 🪟 Modal.js — by Terra

A lightweight and extensible modal library designed for modern front-end workflows.  
It provides **simple configuration**, **robust callbacks**, and **debugging tools** out of the box.

---

## ✨ Features

- 🧩 **Plug & Play:** Works with minimal setup and clean HTML attributes.
- ⚙️ **Configurable:** Customize triggers, class names, and behaviors.
- 🔁 **Lifecycle Hooks:** Use callbacks (`beforeOpen`, `onShow`, `beforeClose`, `onClose`, `onExpand`, `onCollapse`) to extend functionality.
- ⛶ **Fullscreen (optional):** Opt-in expand button that grows the modal to the full viewport, with mobile-safe dynamic viewport (`dvh`) sizing.
- 🔒 **Scroll Locking:** Prevent background scroll when modals are open.
- 🪶 **Lightweight:** No dependencies, framework-agnostic.
- 🐞 **Debug Mode:** Console feedback for easy testing and troubleshooting.

---

## 📦 Installation

### Using npm

```bash
npm install @terrahq/modal
```

### Or via CDN

```js
<script src="https://unpkg.com/@terrahq/modal/dist/modal.umd.js"></script>
```

## 🚀 Quick Start

```html
<!-- Trigger -->
<button data-modal-open="my-modal">Open Modal</button>

<!-- Modal -->
<div id="my-modal" class="c--modal-a" aria-hidden="true">
  <div class="c--modal-a__overlay" data-modal-close></div>
  <div class="c--modal-a__item" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">Basic Modal</h2>
    <p>This is a simple modal example.</p>
    <button data-modal-close>Close</button>
  </div>
</div>
```
## JS

```js
import Modal from "@terrahq/modal";

const modal = new Modal({
  selector: document.getElementById('my-modal'),
  debug: true,
  onShow: (modal, trigger) => console.log(`Modal ${modal.id} is now visible`, trigger),
  onClose: (modal, trigger) => console.log(`Modal ${modal.id} is now hidden`, trigger),
});
```

## ⚙️ Constructor Parameters

| Option          | Type               | Default               | Description                                                                     |
| --------------- | ------------------ | --------------------- | ------------------------------------------------------------------------------- |
| `selector`      | `HTMLElement`      | — (required)          | The DOM element representing the modal container (Element only, no strings).    |
| `onShow`        | `Function \| null` | `null`                | Callback executed **after** the modal is opened. `(modal, triggerInfo) => void` |
| `onClose`       | `Function \| null` | `null`                | Callback executed **after** the modal is closed. `(modal, triggerInfo) => void` |
| `beforeOpen`    | `Function \| null` | `null`                | Callback executed **before** opening. `(modal, triggerInfo) => boolean \| void` |
| `beforeClose`   | `Function \| null` | `null`                | Callback executed **before** closing. `(modal, triggerInfo) => boolean \| void` |
| `openTrigger`   | `string`           | `data-modal-open`     | Attribute used on buttons/links that **open** the modal.                        |
| `closeTrigger`  | `string`           | `data-modal-close`    | Attribute used on buttons/links that **close** the modal.                       |
| `openClass`     | `string`           | `c--modal-a--is-open` | Class added to the modal element when it is open.                               |
| `disableScroll` | `boolean`          | `true`                | Prevents `<body>` scrolling while the modal is open.                            |
| `expandable`    | `boolean`          | `false`               | Enables the fullscreen toggle. When `true`, `[data-modal-expand]` buttons inside the modal toggle the expanded state. |
| `expandTrigger` | `string`           | `data-modal-expand`   | Attribute used on buttons that **toggle fullscreen**.                           |
| `expandedClass` | `string`           | `c--modal-a--is-expanded` | Class added to the modal element while it is expanded to fullscreen.        |
| `onExpand`      | `Function \| null` | `null`                | Callback executed when the modal **enters** fullscreen. `(modal, triggerInfo) => void` |
| `onCollapse`    | `Function \| null` | `null`                | Callback executed when the modal **leaves** fullscreen. `(modal, triggerInfo) => void` |
| `debug`         | `boolean`          | `false`               | Enables helpful console logs for debugging and testing.                         |


## 🧪 Programmatic Control

### Open / Close / Toggle
```js
const myModal = new Modal({ selector: document.getElementById('my-modal') });

// Using the instance’s own element:
myModal.open();
myModal.close();
myModal.toggle();
```

### With custom trigger info (analytics/debug)
```js
document.querySelector('.js--fire').addEventListener('click', (e) => {
  e.preventDefault();
  myModal.open(undefined, {
    type: 'custom',
    element: e.currentTarget,
    source: 'js--fire',
    method: 'click'
  });
});
```
## 🔁 Lifecycle Hooks (quick examples)

```js
new Modal({
  selector: document.getElementById('modal-hooks'),
  beforeOpen: (modal, trigger) => {
    console.log('beforeOpen', trigger);
  },
  onShow: (modal, trigger) => {
    console.log('onShow', trigger);
  },
  beforeClose: (modal, trigger) => {
    console.log('beforeClose', trigger);
  },
  onClose: (modal, trigger) => {
    console.log('onClose', trigger);
  },
});
```
Callbacks are wrapped safely. If a callback throws, it logs an error but won’t break the modal.

## ⛶ Fullscreen (expandable)

Set `expandable: true` and add a button with `data-modal-expand` inside the modal. Clicking it toggles the modal between its default size and the full viewport.

```html
<div id="my-modal" class="c--modal-a" aria-hidden="true">
  <div class="c--modal-a__overlay" data-modal-close></div>
  <div class="c--modal-a__item" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">Expandable Modal</h2>
    <button aria-label="Toggle fullscreen" data-modal-expand>⤢</button>
    <button aria-label="Close modal" data-modal-close>×</button>
    <p>Click ⤢ to expand to the full viewport, then again to collapse.</p>
  </div>
</div>
```

```js
new Modal({
  selector: document.getElementById('my-modal'),
  expandable: true,
  onExpand: (modal, trigger) => console.log('expanded', trigger),
  onCollapse: (modal, trigger) => console.log('collapsed', trigger),
});
```

```scss
.c--modal-a--is-expanded .c--modal-a__item {
  max-width: 100%;
  width: 100%;
  max-height: 100vh;   // fallback
  max-height: 100dvh;  // dynamic viewport
  height: 100dvh;
  border-radius: 0;
}
```

## 🧯 Destroy (SPA / transitions)

```js
const m = new Modal({ selector: document.getElementById('modal-spa') });
// ...
m.destroy(); // removes all listeners, ESC binding, etc.
// Safe to call multiple times; subsequent calls do nothing.
```

## 🧱 Minimal CSS (example)

```scss
.c--modal-a {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease;
  display: grid;
  place-items: center;
}
.c--modal-a--is-open {
  opacity: 1;
  pointer-events: auto;
}
.c--modal-a__overlay {
  position: absolute;
  inset: 0;
}
.c--modal-a__item {
  position: relative;
  background: #fff;
  padding: 1.25rem;
  border-radius: .5rem;
  max-width: 560px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
  max-height: 80vh;
  overflow: auto;
}
```


### ChangeLog
**0.0.09** – Enhanced Error Handling & Stability

- Added safe error handling when opening or closing modals. The instance no longer throws runtime errors if the selector is invalid or `null`; instead, a clear console message is displayed  (e.g., “No modal Element found...”).
- Added internal `_report()` helper to produce readable error messages and optionally trigger `onError`.
- Added `_disabled` flag to safely prevent actions when initialization fails.
- `open()` and `close()` now validate the provided modal element before accessing its properties.
- All logic remains backward-compatible with previous versions.
- Refactored Escape key handling so that the listener is only attached while the modal is open, improving performance and preventing leaks.

**0.0.08** - All callback functions (onShow, onClose, beforeOpen, beforeClose) receive two parameters:

 - modal: The modal element
- triggerInfo: Object containing information about what triggered the modal action

**0.0.07** - Refactor doc

**0.0.05** - Refactor callbacks 

**0.0.04** - Version update

**0.0.03** - Update dist from custom triggers

**0.0.02** - Update callbacks when using custom triggers

**0.0.01** - First Release


