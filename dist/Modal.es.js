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
   * @param {boolean} [options.expandable=false]
   * @param {string} [options.expandTrigger='data-modal-expand']
   * @param {string} [options.expandedClass='c--modal-a--is-expanded']
   * @param {Function} [options.onExpand]
   * @param {Function} [options.onCollapse]
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
      expandable: !1,
      expandTrigger: "data-modal-expand",
      expandedClass: "c--modal-a--is-expanded",
      onExpand: () => {
      },
      onCollapse: () => {
      },
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
    }, this._busy = !1, this._destroyed = !1, this._attachEsc = null, this._trapTabHandler = null, this._previousActiveElement = null, this._disabled = !1, this.eventListeners = [], this._delegatedOpen = null, this.init(), this.events();
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
    this.addOrDefineEventListeners(this.DOM.modal);
  }
  addOrDefineEventListeners(e) {
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
        var a;
        o.preventDefault(), this.logDebug(`Close trigger clicked for modal ID: ${n}`);
        const l = {
          type: "element",
          element: s,
          tagName: s.tagName.toLowerCase(),
          text: ((a = s.textContent) == null ? void 0 : a.trim()) || "",
          id: s.id || null,
          action: "close"
        };
        this.close(e, l);
      };
      s.addEventListener("click", i), this.eventListeners.push({ element: s, type: "click", listener: i });
    }), this.settings.expandable && e.querySelectorAll(`[${this.settings.expandTrigger}]`).forEach((s) => {
      const i = (o) => {
        o.preventDefault();
        const l = e.classList.toggle(this.settings.expandedClass);
        s.setAttribute("aria-pressed", String(l));
        const a = { type: "element", element: s, action: l ? "expand" : "collapse" };
        this._safe(l ? this.settings.onExpand : this.settings.onCollapse, e, a);
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
    this._trapTabHandler = (s) => {
      if (s.key !== "Tab" || !this.isOpen(this.DOM.modal)) return;
      const i = this._getFocusableElements(this.DOM.modal);
      if (i.length === 0) {
        s.preventDefault();
        return;
      }
      const o = i[0], l = i[i.length - 1], a = document.activeElement;
      if (!this.DOM.modal.contains(a)) {
        s.preventDefault(), o.focus();
        return;
      }
      s.shiftKey ? a === o && (s.preventDefault(), l.focus()) : a === l && (s.preventDefault(), o.focus());
    };
  }
  _isTabbable(e) {
    if (!(e instanceof HTMLElement) || e.disabled || e.getAttribute("tabindex") === "-1" || !e.offsetWidth && !e.offsetHeight && e.getClientRects().length === 0) return !1;
    const n = getComputedStyle(e);
    return !(n.visibility === "hidden" || n.display === "none");
  }
  _getFocusableElements(e) {
    let n = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ].join(",");
    return e instanceof Element ? Array.from(e.querySelectorAll(n)).filter(
      (t) => this._isTabbable(t)
    ) : [];
  }
  _focusModalContent(e) {
    const n = this._getFocusableElements(e);
    if (n.length > 0) {
      n[0].focus();
      return;
    }
  }
  _removeTabTrap() {
    document.removeEventListener("keydown", this._trapTabHandler, !0);
  }
  _addTabTrap() {
    document.addEventListener("keydown", this._trapTabHandler, !0), this.eventListeners.push({ element: this.DOM.modal, type: "keydown", listener: this._trapTabHandler });
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
    this._safe(this.settings.beforeOpen, t, s), this.logDebug(`Opening modal ID: ${t.id}`), this._previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null, t.classList.add(this.settings.openClass), t.setAttribute("aria-hidden", "false"), this.settings.disableScroll && (document.body.style.overflow = "hidden"), this._ensureEscAttached(), this._addTabTrap(), this._safe(this.settings.onShow, t, s), requestAnimationFrame(() => {
      this.isOpen(t) && this._focusModalContent(t);
    }), this._busy = !1;
  }
  close(e, n = null) {
    var o;
    if (this._disabled) {
      this._report("close", "Instance is disabled (invalid selector on init).");
      return;
    }
    const t = e instanceof Element ? e : (o = this.DOM) == null ? void 0 : o.modal;
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
    this._safe(this.settings.beforeClose, t, s), this.logDebug(`Closing modal ID: ${t.id}`), t.classList.remove(this.settings.openClass), t.setAttribute("aria-hidden", "true"), t.classList.contains(this.settings.expandedClass) && t.addEventListener(
      "transitionend",
      () => t.classList.remove(this.settings.expandedClass),
      { once: !0 }
    ), this.settings.disableScroll && (document.body.style.overflow = ""), this._removeEsc(), this._removeTabTrap(), this._previousActiveElement.focus({ preventScroll: !0 }), this._previousActiveElement = null, this._safe(this.settings.onClose, t, s), this._busy = !1;
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
