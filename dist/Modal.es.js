class c {
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
   * @param {string} [options.overlaySelector='[data-modal-overlay]']
   * @param {boolean} [options.disableScroll=true]
   * @param {boolean} [options.debug=false]
   */
  constructor(e = {}) {
    if (!(e.selector instanceof Element)) {
      console.warn("[Modal] selector must be a DOM Element. Modal not initialized."), this._disabled = !0;
      return;
    }
    const n = {
      onShow: (t) => {
        e.debug && console.info(`${t.id || "[no-id]"} is shown`);
      },
      onClose: (t) => {
        e.debug && console.info(`${t.id || "[no-id]"} is hidden`);
      },
      beforeOpen: () => {
      },
      beforeClose: () => {
      },
      onError: null,
      openTrigger: "data-modal-open",
      closeTrigger: "data-modal-close",
      openClass: "c--modal-a--is-open",
      overlaySelector: "[data-modal-overlay]",
      disableScroll: !0,
      debug: !1
    };
    this.settings = { ...n, ...e }, this._safe = (t, ...s) => {
      if (typeof t == "function")
        try {
          t(...s);
        } catch (i) {
          if (console.error("[Modal callback error]", i), typeof this.settings.onError == "function")
            try {
              this.settings.onError(i, { args: s });
            } catch {
            }
        }
    }, this._report = (t, s, i = {}) => {
      var o;
      if (console.error(`[Modal] ${s}`, i), typeof ((o = this.settings) == null ? void 0 : o.onError) == "function")
        try {
          this.settings.onError(new Error(s), { method: t, ...i });
        } catch {
        }
    }, this.DOM = {
      modal: this.settings.selector
    }, this._busy = !1, this._destroyed = !1, this._attachEsc = null, this._disabled = !1, this.eventListeners = [], this._delegatedOpen = null, this.init(), this.events();
  }
  logDebug(e) {
    this.settings.debug && console.debug(`[Modal Debug]: ${e}`);
  }
  init() {
    if (!this.DOM.modal)
      throw new Error(`No modal found with selector "${this.settings.selector}".`);
    this.logDebug(`Found modal with selector "${this.settings.selector}".`);
  }
  events() {
    this.addEventListeners(this.DOM.modal);
  }
  addEventListeners(e) {
    const n = e.id;
    this._delegatedOpen = (s) => {
      var l;
      const i = s.target.closest(
        `[${this.settings.openTrigger}="${n}"]`
      );
      if (!i) return;
      s.preventDefault();
      const o = {
        type: "element",
        element: i,
        tagName: i.tagName.toLowerCase(),
        text: ((l = i.textContent) == null ? void 0 : l.trim()) || "",
        id: i.id || null
      };
      this.open(e, o);
    }, document.addEventListener("click", this._delegatedOpen), e.querySelectorAll(`[${this.settings.closeTrigger}]`).forEach((s) => {
      const i = (o) => {
        var r;
        o.preventDefault(), this.logDebug(`Close trigger clicked for modal ID: ${n}`);
        const l = {
          type: "element",
          element: s,
          tagName: s.tagName.toLowerCase(),
          text: ((r = s.textContent) == null ? void 0 : r.trim()) || "",
          id: s.id || null,
          action: "close"
        };
        this.close(e, l);
      };
      s.addEventListener("click", i), this.eventListeners.push({ element: s, type: "click", listener: i });
    });
    const t = e.querySelector(this.settings.overlaySelector);
    if (t) {
      const s = (i) => {
        if (i.target === t) {
          this.logDebug(`Overlay clicked for modal ID: ${n}`);
          const o = { type: "overlay", element: t, action: "close" };
          this.close(e, o);
        }
      };
      t.addEventListener("click", s), this.eventListeners.push({ element: t, type: "click", listener: s });
    } else {
      const s = (i) => {
        if (i.target === e) {
          this.logDebug(`Root clicked (fallback) for modal ID: ${n}`);
          const o = { type: "overlay-fallback", element: e, action: "close" };
          this.close(e, o);
        }
      };
      e.addEventListener("click", s), this.eventListeners.push({ element: e, type: "click", listener: s });
    }
  }
  _ensureEscAttached() {
    this._attachEsc || (this._attachEsc = (e) => {
      e.key === "Escape" && this.isOpen(this.DOM.modal) && this.close(this.DOM.modal, { type: "keyboard", key: "Escape", action: "close" });
    }, document.addEventListener("keydown", this._attachEsc));
  }
  _removeEsc() {
    this._attachEsc && (document.removeEventListener("keydown", this._attachEsc), this._attachEsc = null);
  }
  open(e, n = null) {
    var i;
    if (this._disabled) {
      this._report("open", "Instance is disabled (invalid selector on init).");
      return;
    }
    const t = e instanceof Element ? e : (i = this.DOM) == null ? void 0 : i.modal;
    if (!(t instanceof Element)) {
      this._report(
        "open",
        "No modal Element found. Pass a DOM Element or ensure this instance was initialized with a valid selector.",
        { passed: e }
      );
      return;
    }
    if (this._busy || this.isOpen(t)) return;
    this._busy = !0;
    const s = n || { type: "programmatic", source: "manual", method: "open()" };
    this._safe(this.settings.beforeOpen, t, s), this.logDebug(`Opening modal ID: ${t.id}`), t.classList.add(this.settings.openClass), t.setAttribute("aria-hidden", "false"), this.settings.disableScroll && (document.body.style.overflow = "hidden"), this._ensureEscAttached(), this._safe(this.settings.onShow, t, s), this._busy = !1;
  }
  close(e, n = null) {
    var i;
    if (this._disabled) {
      this._report("close", "Instance is disabled (invalid selector on init).");
      return;
    }
    const t = e instanceof Element ? e : (i = this.DOM) == null ? void 0 : i.modal;
    if (!(t instanceof Element)) {
      this._report(
        "close",
        "No modal Element found. Pass a DOM Element or ensure this instance was initialized with a valid selector.",
        { passed: e }
      );
      return;
    }
    if (this._busy || !this.isOpen(t)) return;
    this._busy = !0;
    const s = n || { type: "programmatic", source: "manual", method: "close()", action: "close" };
    this._safe(this.settings.beforeClose, t, s), this.logDebug(`Closing modal ID: ${t.id}`), t.classList.remove(this.settings.openClass), t.setAttribute("aria-hidden", "true"), this.settings.disableScroll && (document.body.style.overflow = ""), this._removeEsc(), this._safe(this.settings.onClose, t, s), this._busy = !1;
  }
  isOpen(e) {
    return e.classList.contains(this.settings.openClass);
  }
  toggle() {
    var e;
    if (!((e = this.DOM) != null && e.modal)) {
      this._report("toggle", "No modal element found.");
      return;
    }
    this.isOpen(this.DOM.modal) ? this.close(this.DOM.modal) : this.open(this.DOM.modal);
  }
  destroy() {
    this._destroyed || (this.logDebug("Destroying all event listeners."), this._delegatedOpen && (document.removeEventListener("click", this._delegatedOpen), this._delegatedOpen = null), this.eventListeners.forEach(({ element: e, type: n, listener: t }) => {
      e.removeEventListener(n, t);
    }), this.eventListeners = [], this._removeEsc(), this._destroyed = !0, console.info("All modal event listeners have been removed."));
  }
}
export {
  c as default
};
