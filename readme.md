# 🪟 Modal.js — by Terra

A lightweight and extensible modal library designed for modern front-end workflows.  
It provides **simple configuration**, **robust callbacks**, and **debugging tools** out of the box.

---

## ✨ Features

- 🧩 **Plug & Play:** Works with minimal setup and clean HTML attributes.
- ⚙️ **Configurable:** Customize triggers, class names, and behaviors.
- 🔁 **Lifecycle Hooks:** Use callbacks (`beforeOpen`, `onShow`, `beforeClose`, `onClose`) to extend functionality.
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
  <div class="c--modal-a__overlay" data-modal-close>
    <div class="c--modal-a__item" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">Basic Modal</h2>
      <p>This is a simple modal example.</p>
      <button data-modal-close>Close</button>
    </div>
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

| Option          | Type                    | Default               | Description                                                         |
| --------------- | ----------------------- | --------------------- | ------------------------------------------------------------------- |
| `selector`      | `string \| HTMLElement` | `.c--modal-a`         | Selector CSS o elemento DOM del contenedor del modal.               |
| `onShow`        | `Function \| null`      | `null`                | Callback después de abrir. `(modal, triggerInfo) => void`           |
| `onClose`       | `Function \| null`      | `null`                | Callback después de cerrar. `(modal, triggerInfo) => void`          |
| `beforeOpen`    | `Function \| null`      | `null`                | Callback antes de abrir. `(modal, triggerInfo) => boolean \| void`  |
| `beforeClose`   | `Function \| null`      | `null`                | Callback antes de cerrar. `(modal, triggerInfo) => boolean \| void` |
| `openTrigger`   | `string`                | `data-modal-open`     | Atributo para los botones/enlaces que **abren** el modal.           |
| `closeTrigger`  | `string`                | `data-modal-close`    | Atributo para los botones/enlaces que **cierran** el modal.         |
| `openClass`     | `string`                | `c--modal-a--is-open` | Clase añadida al modal cuando está abierto.                         |
| `disableScroll` | `boolean`               | `true`                | Bloquea el scroll del `<body>` mientras el modal está abierto.      |
| `debug`         | `boolean`               | `false`               | Activa logs útiles en consola para depuración.                      |

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
  display: none;
  position: fixed; inset: 0;
  justify-content: center; align-items: center;
  background: rgba(0,0,0,.5);
  opacity: 0; pointer-events: none;
  transition: opacity .2s ease;
  display: grid; place-items: center;
}
.c--modal-a--is-open { opacity: 1; pointer-events: auto; }
.c--modal-a__overlay { position: absolute; inset: 0; }
.c--modal-a__item {
  position: relative; background: #fff; padding: 1.25rem;
  border-radius: .5rem; max-width: 560px; width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
}
```


