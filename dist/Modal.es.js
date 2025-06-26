class h {
  /**
  * Creates an instance of Modal.
  * @param {Object} options - Configuration options for the modal.
  * @param {string} [options.selector='.c--modal-a'] - Selector for the modal container. Default is `.c--modal-a`.
  * @param {Function} [options.onShow] - Callback invoked after the modal is shown. Receives the modal element and trigger info as parameters.
  * @param {Function} [options.onClose] - Callback invoked after the modal is hidden. Receives the modal element and trigger info as parameters.
  * @param {Function} [options.beforeOpen] - Callback invoked before the modal is opened. Receives the modal element and trigger info as parameters.
  * @param {Function} [options.beforeClose] - Callback invoked before the modal is closed. Receives the modal element and trigger info as parameters.
  * @param {string} [options.openTrigger='data-modal-open'] - Attribute for open buttons. Default is `data-modal-open`.
  * @param {string} [options.closeTrigger='data-modal-close'] - Attribute for close buttons. Default is `data-modal-close`.
  * @param {string} [options.openClass='c--modal-a--is-open'] - Class added to the modal when it is open. Default is `c--modal-a--is-open`.
  * @param {boolean} [options.disableScroll=true] - If true, disables body scrolling when the modal is open. Default is `true`.
  * @param {boolean} [options.debug=false] - If true, enables debug messages in the console. Default is `false`.
  */
  constructor(e = {}) {
    const i = {
      selector: ".c--modal-a",
      // Selector configurable para el modal
      onShow: (s) => {
        e.debug && console.info(`${s.id} is shown`);
      },
      onClose: (s) => {
        e.debug && console.info(`${s.id} is hidden`);
      },
      beforeOpen: (s) => {
        e.debug && console.info(`${s.id} is hidden`);
      },
      // Acción antes de abrir el modal
      beforeClose: (s) => {
      },
      // Acción antes de cerrar el modal
      openTrigger: "data-modal-open",
      closeTrigger: "data-modal-close",
      openClass: "c--modal-a--is-open",
      disableScroll: !0,
      debug: !1
      // Nueva opción para habilitar/inhabilitar mensajes de depuración
    };
    this.settings = { ...i, ...e }, this.DOM = {
      modals: document.querySelectorAll(this.settings.selector),
      // Selector dinámico
      openTriggers: document.querySelectorAll(`[${this.settings.openTrigger}]`),
      closeTriggers: document.querySelectorAll(`[${this.settings.closeTrigger}]`)
    }, this.eventListeners = [], this.init(), this.events();
  }
  logDebug(e) {
    this.settings.debug && console.debug(`[Modal Debug]: ${e}`);
  }
  init() {
    if (this.DOM.modals.length === 0) {
      console.error(`No modals found with selector "${this.settings.selector}".`);
      return;
    }
    this.logDebug(`Found ${this.DOM.modals.length} modals with selector "${this.settings.selector}".`);
  }
  events() {
    this.DOM.modals.forEach((e) => this.addEventListeners(e));
  }
  addEventListeners(e) {
    const i = e.id;
    this.DOM.openTriggers.forEach((t) => {
      if (t.getAttribute(this.settings.openTrigger) === i) {
        const n = (l) => {
          var o;
          l.preventDefault();
          const r = {
            type: "element",
            element: t,
            tagName: t.tagName.toLowerCase(),
            text: ((o = t.textContent) == null ? void 0 : o.trim()) || "",
            id: t.id || null
          };
          this.open(e, r);
        };
        t.addEventListener("click", n), this.eventListeners.push({ element: t, type: "click", listener: n });
      }
    }), e.querySelectorAll(`[${this.settings.closeTrigger}]`).forEach((t) => {
      const n = (l) => {
        var o;
        l.preventDefault(), this.logDebug(`Close trigger clicked for modal ID: ${i}`);
        const r = {
          type: "element",
          element: t,
          tagName: t.tagName.toLowerCase(),
          text: ((o = t.textContent) == null ? void 0 : o.trim()) || "",
          id: t.id || null,
          action: "close"
        };
        this.close(e, r);
      };
      t.addEventListener("click", n), this.eventListeners.push({ element: t, type: "click", listener: n });
    });
    const s = (t) => {
      if (t.target === e.querySelector(`${this.settings.selector}__overlay`)) {
        this.logDebug(`Overlay clicked for modal ID: ${i}`);
        const n = {
          type: "overlay",
          element: t.target,
          action: "close"
        };
        this.close(e, n);
      }
    };
    e.addEventListener("click", s), this.eventListeners.push({ element: e, type: "click", listener: s });
    const c = (t) => {
      if (t.key === "Escape" && this.isOpen(e)) {
        this.logDebug(`Escape key pressed for modal ID: ${i}`);
        const n = {
          type: "keyboard",
          key: t.key,
          action: "close"
        };
        this.close(e, n);
      }
    };
    document.addEventListener("keydown", c), this.eventListeners.push({ element: document, type: "keydown", listener: c });
  }
  open(e, i = null) {
    const s = i || {
      type: "programmatic",
      source: "manual",
      method: "open()"
    };
    typeof this.settings.beforeOpen == "function" && this.settings.beforeOpen(e, s), this.logDebug(`Opening modal ID: ${e.id}`), e.classList.add(this.settings.openClass), e.setAttribute("aria-hidden", "false"), this.settings.disableScroll && (document.body.style.overflow = "hidden"), typeof this.settings.onShow == "function" && this.settings.onShow(e, s);
  }
  async close(e, i = null) {
    const s = i || {
      type: "programmatic",
      source: "manual",
      method: "close()",
      action: "close"
    };
    typeof this.settings.beforeClose == "function" && await this.settings.beforeClose(e, s), this.logDebug(`Closing modal ID: ${e.id}`), e.classList.remove(this.settings.openClass), e.setAttribute("aria-hidden", "true"), this.settings.disableScroll && (document.body.style.overflow = ""), typeof this.settings.onClose == "function" && this.settings.onClose(e, s);
  }
  isOpen(e) {
    return e.classList.contains(this.settings.openClass);
  }
  destroy() {
    this.logDebug("Destroying all event listeners."), this.eventListeners.forEach(({ element: e, type: i, listener: s }) => {
      e.removeEventListener(i, s);
    }), this.eventListeners = [], console.info("All modal event listeners have been removed.");
  }
}
export {
  h as default
};
