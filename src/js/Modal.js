/**
 * Class representing a configurable modal dialog.
 * Handles opening, closing, and managing modal dialogs with support for callbacks, debug messages, and dynamic selectors.
 */

class Modal {
  /**
   * @param {Object} options - Configuration options for the modal.
   * @param {Element} options.selector - Modal DOM element (Element only, no strings).
   * @param {Function} [options.onShow]
   * @param {Function} [options.onClose]
   * @param {Function} [options.beforeOpen]
   * @param {Function} [options.beforeClose]
   * @param {string} [options.openTrigger='data-modal-open']
   * @param {string} [options.closeTrigger='data-modal-close']
   * @param {string} [options.openClass='c--modal-a--is-open']
   * @param {boolean} [options.disableScroll=true]
   * @param {boolean} [options.debug=false]
   */
  constructor(options = {}) {
    // (1) Only accept Element. If not, disable instance and warn.
    if (!(options.selector instanceof Element)) {
      console.warn('[Modal] selector must be a DOM Element. Modal not initialized.');
      this._disabled = true;
      return;
    }

    const defaults = {
      onShow: (modal) => {
        if (options.debug) console.info(`${modal.id || '[no-id]'} is shown`);
      },
      onClose: (modal) => {
        if (options.debug) console.info(`${modal.id || '[no-id]'} is hidden`);
      },
      beforeOpen: () => {},
      beforeClose: () => {},
      onError: null,
      openTrigger: 'data-modal-open',
      closeTrigger: 'data-modal-close',
      openClass: 'c--modal-a--is-open',
      disableScroll: true,
      debug: false,
    };

    this.settings = { ...defaults, ...options };

    // (2) Safe callback wrapper
    this._safe = (fn, ...args) => {
      if (typeof fn !== 'function') return;
      try {
        fn(...args);
      } catch (e) {
        console.error('[Modal callback error]', e);
        if (typeof this.settings.onError === 'function') {
          try {
            this.settings.onError(e, { args });
          } catch {}
        }
      }
    };

    // (3) Simple error reporter
    this._report = (method, msg, meta = {}) => {
      console.error(`[Modal] ${msg}`, meta);
      if (typeof this.settings?.onError === 'function') {
        try {
          this.settings.onError(new Error(msg), { method, ...meta });
        } catch {}
      }
    };

    this.DOM = {
      modal: this.settings.selector,
      openTriggers: document.querySelectorAll(
        `[${this.settings.openTrigger}="${this.settings.selector.id}"]`
      ),
      closeTriggers: this.settings.selector.querySelectorAll(
        `[${this.settings.closeTrigger}]`
      ),
    };

    this._busy = false;
    this._destroyed = false;
    this._attachEsc = null;
    this._disabled = false;
    this.eventListeners = [];

    this.init();
    this.events();
  }

  logDebug(message) {
    if (this.settings.debug) console.debug(`[Modal Debug]: ${message}`);
  }

  init() {
    if (!this.DOM.modal) {
      throw new Error(`No modal found with selector "${this.settings.selector}".`);
    }
    this.logDebug(`Found modal with selector "${this.settings.selector}".`);
  }

  events() {
    this.addEventListeners(this.DOM.modal);
  }

  addEventListeners(modal) {
    const modalId = modal.id;

    // Open triggers
    this.DOM.openTriggers.forEach((trigger) => {
      if (trigger.getAttribute(this.settings.openTrigger) === modalId) {
        const openListener = (event) => {
          event.preventDefault();
          const triggerInfo = {
            type: 'element',
            element: trigger,
            tagName: trigger.tagName.toLowerCase(),
            text: trigger.textContent?.trim() || '',
            id: trigger.id || null,
          };
          this.open(modal, triggerInfo);
        };
        trigger.addEventListener('click', openListener);
        this.eventListeners.push({ element: trigger, type: 'click', listener: openListener });
      }
    });

    // Close triggers inside modal
    modal.querySelectorAll(`[${this.settings.closeTrigger}]`).forEach((trigger) => {
      const closeListener = (event) => {
        event.preventDefault();
        this.logDebug(`Close trigger clicked for modal ID: ${modalId}`);

        const triggerInfo = {
          type: 'element',
          element: trigger,
          tagName: trigger.tagName.toLowerCase(),
          text: trigger.textContent?.trim() || '',
          id: trigger.id || null,
          action: 'close',
        };

        this.close(modal, triggerInfo);
      };
      trigger.addEventListener('click', closeListener);
      this.eventListeners.push({ element: trigger, type: 'click', listener: closeListener });
    });

    // Overlay click
    const overlay = modal.querySelector('[data-modal-overlay], .c--modal-a__overlay');
    if (overlay) {
      const onOverlayClick = (event) => {
        if (event.target === overlay) {
          this.logDebug(`Overlay clicked for modal ID: ${modalId}`);
          const triggerInfo = { type: 'overlay', element: overlay, action: 'close' };
          this.close(modal, triggerInfo);
        }
      };
      overlay.addEventListener('click', onOverlayClick);
      this.eventListeners.push({ element: overlay, type: 'click', listener: onOverlayClick });
    }
  }

  _ensureEscAttached() {
    if (this._attachEsc) return;
    this._attachEsc = (e) => {
      if (e.key === 'Escape' && this.isOpen(this.DOM.modal)) {
        this.close(this.DOM.modal, { type: 'keyboard', key: 'Escape', action: 'close' });
      }
    };
    document.addEventListener('keydown', this._attachEsc);
  }

  _removeEsc() {
    if (!this._attachEsc) return;
    document.removeEventListener('keydown', this._attachEsc);
    this._attachEsc = null;
  }

  open(modal, triggerInfo = null) {
    if (this._disabled) {
      this._report('open', 'Instance is disabled (invalid selector on init).');
      return;
    }

    const modalEl = modal instanceof Element ? modal : this.DOM?.modal;
    if (!(modalEl instanceof Element)) {
      this._report(
        'open',
        'No modal Element found. Pass a DOM Element or ensure this instance was initialized with a valid selector.',
        { passed: modal }
      );
      return;
    }

    if (this._busy || this.isOpen(modalEl)) return;
    this._busy = true;

    const trigger = triggerInfo || { type: 'programmatic', source: 'manual', method: 'open()' };

    this._safe(this.settings.beforeOpen, modalEl, trigger);
    this.logDebug(`Opening modal ID: ${modalEl.id}`);

    modalEl.classList.add(this.settings.openClass);
    modalEl.setAttribute('aria-hidden', 'false');

    if (this.settings.disableScroll) document.body.style.overflow = 'hidden';

    this._ensureEscAttached();
    this._safe(this.settings.onShow, modalEl, trigger);

    this._busy = false;
  }

  close(modal, triggerInfo = null) {
    if (this._disabled) {
      this._report('close', 'Instance is disabled (invalid selector on init).');
      return;
    }

    const modalEl = modal instanceof Element ? modal : this.DOM?.modal;
    if (!(modalEl instanceof Element)) {
      this._report(
        'close',
        'No modal Element found. Pass a DOM Element or ensure this instance was initialized with a valid selector.',
        { passed: modal }
      );
      return;
    }

    if (this._busy || !this.isOpen(modalEl)) return;
    this._busy = true;

    const trigger =
      triggerInfo || { type: 'programmatic', source: 'manual', method: 'close()', action: 'close' };

    this._safe(this.settings.beforeClose, modalEl, trigger);
    this.logDebug(`Closing modal ID: ${modalEl.id}`);

    modalEl.classList.remove(this.settings.openClass);
    modalEl.setAttribute('aria-hidden', 'true');

    if (this.settings.disableScroll) document.body.style.overflow = '';

    this._removeEsc();
    this._safe(this.settings.onClose, modalEl, trigger);

    this._busy = false;
  }

  isOpen(modal) {
    return modal.classList.contains(this.settings.openClass);
  }

  toggle() {
    if (!this.DOM?.modal) {
      this._report('toggle', 'No modal element found.');
      return;
    }
    this.isOpen(this.DOM.modal) ? this.close(this.DOM.modal) : this.open(this.DOM.modal);
  }

  destroy() {
    if (this._destroyed) return;
    this.logDebug('Destroying all event listeners.');

    this.eventListeners.forEach(({ element, type, listener }) => {
      element.removeEventListener(type, listener);
    });
    this.eventListeners = [];

    this._removeEsc();

    this._destroyed = true;
    console.info('All modal event listeners have been removed.');
  }
}

export default Modal;
