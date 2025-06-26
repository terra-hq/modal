declare class Modal {
  constructor(options?: {
    selector?: string;
    onShow?: (modal: HTMLElement, trigger?: any) => void;
    onClose?: (modal: HTMLElement, trigger?: any) => void;
    beforeOpen?: (modal: HTMLElement, trigger?: any) => void;
    beforeClose?: (modal: HTMLElement, trigger?: any) => void;
    openTrigger?: string;
    closeTrigger?: string;
    openClass?: string;
    disableScroll?: boolean;
    debug?: boolean;
  });
  
  open(modal: HTMLElement | null, triggerInfo?: any): void;
  close(modal: HTMLElement | null, triggerInfo?: any): Promise<void>;
  isOpen(modal: HTMLElement | null): boolean;
  destroy(): void;
}

export default Modal;
