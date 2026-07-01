//#region src/js/Modal.js
var e = class {
	constructor(e = {}) {
		if (!(e.selector instanceof Element)) {
			console.warn("[Modal] selector must be a DOM Element. Modal not initialized."), this._disabled = !0;
			return;
		}
		this.settings = {
			onShow: (t) => {
				e.debug && console.info(`${t.id || "[no-id]"} is shown`);
			},
			onClose: (t) => {
				e.debug && console.info(`${t.id || "[no-id]"} is hidden`);
			},
			beforeOpen: () => {},
			beforeClose: () => {},
			onError: null,
			openTrigger: "data-modal-open",
			closeTrigger: "data-modal-close",
			openClass: "c--modal-a--is-open",
			overlaySelector: "[data-modal-overlay]",
			disableScroll: !0,
			plugins: [],
			debug: !1,
			...e
		}, this._safe = (e, ...t) => {
			if (typeof e == "function") try {
				e(...t);
			} catch (e) {
				if (console.error("[Modal callback error]", e), typeof this.settings.onError == "function") try {
					this.settings.onError(e, { args: t });
				} catch {}
			}
		}, this._report = (e, t, n = {}) => {
			if (console.error(`[Modal] ${t}`, n), typeof this.settings?.onError == "function") try {
				this.settings.onError(Error(t), {
					method: e,
					...n
				});
			} catch {}
		}, this.DOM = { modal: this.settings.selector }, this._busy = !1, this._destroyed = !1, this._attachEsc = null, this._trapTabHandler = null, this._previousActiveElement = null, this._disabled = !1, this.eventListeners = [], this._delegatedOpen = null, this.init(), this.events(), this._installPlugins();
	}
	_installPlugins() {
		(this.settings.plugins || []).forEach((e) => {
			if (!e || typeof e.install != "function") {
				console.warn("[Modal] Ignoring invalid plugin (missing install()).", e);
				return;
			}
			try {
				e.install(this), this.logDebug(`Plugin "${e.name || "anonymous"}" installed.`);
			} catch (t) {
				this._report("plugin", `Plugin "${e.name || "anonymous"}" failed to install.`, { error: t });
			}
		});
	}
	logDebug(e) {
		this.settings.debug && console.debug(`[Modal Debug]: ${e}`);
	}
	init() {
		if (!this.DOM.modal) throw Error(`No modal found with selector "${this.settings.selector}".`);
		this.logDebug(`Found modal with selector "${this.settings.selector}".`);
	}
	events() {
		this.addOrDefineEventListeners(this.DOM.modal);
	}
	addOrDefineEventListeners(e) {
		let t = e.id;
		this._delegatedOpen = (n) => {
			let r = n.target.closest(`[${this.settings.openTrigger}="${t}"]`);
			if (!r) return;
			n.preventDefault();
			let i = {
				type: "element",
				element: r,
				tagName: r.tagName.toLowerCase(),
				text: r.textContent?.trim() || "",
				id: r.id || null
			};
			this.open(e, i);
		}, document.addEventListener("click", this._delegatedOpen), e.querySelectorAll(`[${this.settings.closeTrigger}]`).forEach((n) => {
			let r = (r) => {
				r.preventDefault(), this.logDebug(`Close trigger clicked for modal ID: ${t}`);
				let i = {
					type: "element",
					element: n,
					tagName: n.tagName.toLowerCase(),
					text: n.textContent?.trim() || "",
					id: n.id || null,
					action: "close"
				};
				this.close(e, i);
			};
			n.addEventListener("click", r), this.eventListeners.push({
				element: n,
				type: "click",
				listener: r
			});
		});
		let n = e.querySelector(this.settings.overlaySelector);
		if (n) {
			let r = (r) => {
				if (r.target === n) {
					this.logDebug(`Overlay clicked for modal ID: ${t}`);
					let r = {
						type: "overlay",
						element: n,
						action: "close"
					};
					this.close(e, r);
				}
			};
			n.addEventListener("click", r), this.eventListeners.push({
				element: n,
				type: "click",
				listener: r
			});
		} else {
			let n = (n) => {
				if (n.target === e) {
					this.logDebug(`Root clicked (fallback) for modal ID: ${t}`);
					let n = {
						type: "overlay-fallback",
						element: e,
						action: "close"
					};
					this.close(e, n);
				}
			};
			e.addEventListener("click", n), this.eventListeners.push({
				element: e,
				type: "click",
				listener: n
			});
		}
		this._trapTabHandler = (e) => {
			if (e.key !== "Tab" || !this.isOpen(this.DOM.modal)) return;
			let t = this._getFocusableElements(this.DOM.modal);
			if (t.length === 0) {
				e.preventDefault();
				return;
			}
			let n = t[0], r = t[t.length - 1], i = document.activeElement;
			if (!this.DOM.modal.contains(i)) {
				e.preventDefault(), n.focus();
				return;
			}
			e.shiftKey ? i === n && (e.preventDefault(), r.focus()) : i === r && (e.preventDefault(), n.focus());
		};
	}
	_isTabbable(e) {
		if (!(e instanceof HTMLElement) || e.disabled || e.getAttribute("tabindex") === "-1" || !e.offsetWidth && !e.offsetHeight && e.getClientRects().length === 0) return !1;
		let t = getComputedStyle(e);
		return !(t.visibility === "hidden" || t.display === "none");
	}
	_getFocusableElements(e) {
		let t = [
			"a[href]",
			"button:not([disabled])",
			"textarea:not([disabled])",
			"input:not([disabled])",
			"select:not([disabled])",
			"[tabindex]:not([tabindex=\"-1\"])"
		].join(",");
		return e instanceof Element ? Array.from(e.querySelectorAll(t)).filter((e) => this._isTabbable(e)) : [];
	}
	_focusModalContent(e) {
		let t = this._getFocusableElements(e);
		if (t.length > 0) {
			t[0].focus();
			return;
		}
	}
	_removeTabTrap() {
		document.removeEventListener("keydown", this._trapTabHandler, !0);
	}
	_addTabTrap() {
		document.addEventListener("keydown", this._trapTabHandler, !0), this.eventListeners.push({
			element: this.DOM.modal,
			type: "keydown",
			listener: this._trapTabHandler
		});
	}
	_ensureEscAttached() {
		this._attachEsc || (this._attachEsc = (e) => {
			e.key === "Escape" && this.isOpen(this.DOM.modal) && this.close(this.DOM.modal, {
				type: "keyboard",
				key: "Escape",
				action: "close"
			});
		}, document.addEventListener("keydown", this._attachEsc));
	}
	_removeEsc() {
		this._attachEsc &&= (document.removeEventListener("keydown", this._attachEsc), null);
	}
	open(e, t = null) {
		if (this._disabled) {
			this._report("open", "Instance is disabled (invalid selector on init).");
			return;
		}
		let n = e instanceof Element ? e : this.DOM?.modal;
		if (!(n instanceof Element)) {
			this._report("open", "No modal Element found. Pass a DOM Element or ensure this instance was initialized with a valid selector.", { passed: e });
			return;
		}
		if (this._busy || this.isOpen(n)) return;
		this._busy = !0;
		let r = t || {
			type: "programmatic",
			source: "manual",
			method: "open()"
		};
		this._safe(this.settings.beforeOpen, n, r), this.logDebug(`Opening modal ID: ${n.id}`), this._previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null, n.classList.add(this.settings.openClass), n.setAttribute("aria-hidden", "false"), this.settings.disableScroll && (document.body.style.overflow = "hidden"), this._ensureEscAttached(), this._addTabTrap(), this._safe(this.settings.onShow, n, r), requestAnimationFrame(() => {
			this.isOpen(n) && this._focusModalContent(n);
		}), this._busy = !1;
	}
	close(e, t = null) {
		if (this._disabled) {
			this._report("close", "Instance is disabled (invalid selector on init).");
			return;
		}
		let n = e instanceof Element ? e : this.DOM?.modal;
		if (!(n instanceof Element)) {
			this._report("close", "No modal Element found. Pass a DOM Element or ensure this instance was initialized with a valid selector.", { passed: e });
			return;
		}
		if (this._busy || !this.isOpen(n)) return;
		this._busy = !0;
		let r = t || {
			type: "programmatic",
			source: "manual",
			method: "close()",
			action: "close"
		};
		this._safe(this.settings.beforeClose, n, r), this.logDebug(`Closing modal ID: ${n.id}`), n.classList.remove(this.settings.openClass), n.setAttribute("aria-hidden", "true"), this.settings.disableScroll && (document.body.style.overflow = ""), this._removeEsc(), this._removeTabTrap(), this._previousActiveElement.focus({ preventScroll: !0 }), this._previousActiveElement = null, this._safe(this.settings.onClose, n, r), this._busy = !1;
	}
	isOpen(e) {
		return e.classList.contains(this.settings.openClass);
	}
	toggle() {
		if (!this.DOM?.modal) {
			this._report("toggle", "No modal element found.");
			return;
		}
		this.isOpen(this.DOM.modal) ? this.close(this.DOM.modal) : this.open(this.DOM.modal);
	}
	destroy() {
		this._destroyed || (this.logDebug("Destroying all event listeners."), this._delegatedOpen &&= (document.removeEventListener("click", this._delegatedOpen), null), this.eventListeners.forEach(({ element: e, type: t, listener: n }) => {
			e.removeEventListener(t, n);
		}), this.eventListeners = [], this._removeEsc(), this._destroyed = !0, console.info("All modal event listeners have been removed."));
	}
};
//#endregion
export { e as default };
