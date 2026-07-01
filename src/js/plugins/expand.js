/**
 * Expand — adds an optional fullscreen/expand toggle to a Modal instance.
 *
 * Attach it through the Modal constructor:
 *
 *   import Modal from '@terrahq/modal';
 *   import Expand from '@terrahq/modal/plugins/expand';
 *
 *   new Modal({
 *     selector: document.getElementById('my-modal'),
 *     plugins: [ Expand({ onExpand, onCollapse }) ],
 *   });
 *
 * Clicking an element with the `expandTrigger` attribute (default `data-modal-expand`)
 * inside the modal toggles the `expandedClass` (default `c--modal-a--is-expanded`).
 *
 * The plugin is self-contained: it only needs `install(modal)`. It wires its own
 * listeners and pushes them onto `modal.eventListeners`, so the modal's own
 * `destroy()` removes them — no extra core hooks required.
 *
 * @param {Object} [opts]
 * @param {string} [opts.expandTrigger='data-modal-expand'] - Attribute on the toggle button(s).
 * @param {string} [opts.expandedClass='c--modal-a--is-expanded'] - Class toggled on the modal element.
 * @param {Function} [opts.onExpand] - Called when the modal enters fullscreen. `(modal, triggerInfo) => void`
 * @param {Function} [opts.onCollapse] - Called when the modal leaves fullscreen. `(modal, triggerInfo) => void`
 * @returns {{name: string, install: (modal: object) => void}}
 */
export default function Expand(opts = {}) {
  const expandTrigger = opts.expandTrigger || 'data-modal-expand';
  const expandedClass = opts.expandedClass || 'c--modal-a--is-expanded';

  return {
    name: 'expand',
    install(modal) {
      const el = modal.DOM.modal;
      const openClass = modal.settings.openClass;

      el.querySelectorAll(`[${expandTrigger}]`).forEach((trigger) => {
        const listener = (event) => {
          event.preventDefault();
          const expanded = el.classList.toggle(expandedClass);
          trigger.setAttribute('aria-pressed', String(expanded));
          const info = {
            type: 'element',
            element: trigger,
            action: expanded ? 'expand' : 'collapse',
          };
          modal._safe(expanded ? opts.onExpand : opts.onCollapse, el, info);
        };
        trigger.addEventListener('click', listener);
        modal.eventListeners.push({ element: trigger, type: 'click', listener });
      });

      const onTransitionEnd = () => {
        if (!el.classList.contains(openClass) && el.classList.contains(expandedClass)) {
          el.classList.remove(expandedClass);
        }
      };
      el.addEventListener('transitionend', onTransitionEnd);
      modal.eventListeners.push({ element: el, type: 'transitionend', listener: onTransitionEnd });
    },
  };
}
