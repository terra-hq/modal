(function(n,l){typeof exports=="object"&&typeof module<"u"?module.exports=l():typeof define=="function"&&define.amd?define(l):(n=typeof globalThis<"u"?globalThis:n||self,n.Modal=l())})(this,function(){"use strict";class n{constructor(e={}){const i={selector:".c--modal-a",onShow:s=>{e.debug&&console.info(`${s.id} is shown`)},onClose:s=>{e.debug&&console.info(`${s.id} is hidden`)},beforeOpen:s=>{},beforeClose:s=>{},openTrigger:"data-modal-open",closeTrigger:"data-modal-close",openClass:"c--modal-a--is-open",disableScroll:!0,debug:!1};this.settings={...i,...e},this.DOM={modals:document.querySelectorAll(this.settings.selector),openTriggers:document.querySelectorAll(`[${this.settings.openTrigger}]`),closeTriggers:document.querySelectorAll(`[${this.settings.closeTrigger}]`)},this.eventListeners=[],this.init(),this.events()}logDebug(e){this.settings.debug&&console.debug(`[Modal Debug]: ${e}`)}init(){if(this.DOM.modals.length===0){console.error(`No modals found with selector "${this.settings.selector}".`);return}this.logDebug(`Found ${this.DOM.modals.length} modals with selector "${this.settings.selector}".`)}events(){this.DOM.modals.forEach(e=>this.addEventListeners(e))}addEventListeners(e){const i=e.id;this.DOM.openTriggers.forEach(t=>{if(t.getAttribute(this.settings.openTrigger)===i){const o=r=>{r.preventDefault(),this.logDebug(`Open trigger clicked for modal ID: ${i}`),typeof this.settings.beforeOpen=="function"&&this.settings.beforeOpen(e),this.open(e)};t.addEventListener("click",o),this.eventListeners.push({element:t,type:"click",listener:o})}}),e.querySelectorAll(`[${this.settings.closeTrigger}]`).forEach(t=>{const o=r=>{r.preventDefault(),this.logDebug(`Close trigger clicked for modal ID: ${i}`),typeof this.settings.beforeClose=="function"&&this.settings.beforeClose(e),this.close(e)};t.addEventListener("click",o),this.eventListeners.push({element:t,type:"click",listener:o})});const s=t=>{t.target===e.querySelector(`${this.settings.selector}__overlay`)&&(this.logDebug(`Overlay clicked for modal ID: ${i}`),typeof this.settings.beforeClose=="function"&&this.settings.beforeClose(e),this.close(e))};e.addEventListener("click",s),this.eventListeners.push({element:e,type:"click",listener:s});const c=t=>{t.key==="Escape"&&this.isOpen(e)&&(this.logDebug(`Escape key pressed for modal ID: ${i}`),typeof this.settings.beforeClose=="function"&&this.settings.beforeClose(e),this.close(e))};document.addEventListener("keydown",c),this.eventListeners.push({element:document,type:"keydown",listener:c})}open(e){this.logDebug(`Opening modal ID: ${e.id}`),e.classList.add(this.settings.openClass),e.setAttribute("aria-hidden","false"),this.settings.disableScroll&&(document.body.style.overflow="hidden"),typeof this.settings.onShow=="function"&&this.settings.onShow(e)}close(e){this.logDebug(`Closing modal ID: ${e.id}`),e.classList.remove(this.settings.openClass),e.setAttribute("aria-hidden","true"),this.settings.disableScroll&&(document.body.style.overflow=""),typeof this.settings.onClose=="function"&&this.settings.onClose(e)}isOpen(e){return e.classList.contains(this.settings.openClass)}destroy(){this.logDebug("Destroying all event listeners."),this.eventListeners.forEach(({element:e,type:i,listener:s})=>{e.removeEventListener(i,s)}),this.eventListeners=[],console.info("All modal event listeners have been removed.")}}return n});