"use client";
import { useCallback, useEffect, useRef } from "react";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import Button from "../Button";

interface ModalProps {
   isOpen?: boolean;
   onClose: () => void;
   onSubmit: () => void;
   title?: string;
   body?: React.ReactElement;
   footer?: React.ReactElement;
   actionLabel: string;
   disabled?: boolean;
   secondaryAction?: () => void;
   secondaryActionLabel?: string;
}

/**
 * Dialog shell.
 *
 * Was a white panel with light-grey borders opening over a black site -- a full
 * theme inversion mid-interaction. It also had no Escape key, no scroll lock
 * and no focus management, and animated from `translate-y-full` (the whole
 * sheet flying up from below the fold) on every open.
 */
const Modal: React.FC<ModalProps> = ({
   isOpen,
   onClose,
   onSubmit,
   title,
   body,
   footer,
   actionLabel,
   disabled,
   secondaryAction,
   secondaryActionLabel,
}) => {
   const panelRef = useRef<HTMLDivElement>(null);

   const handleClose = useCallback(() => {
      if (disabled) return;
      onClose();
   }, [disabled, onClose]);

   useEffect(() => {
      if (!isOpen) return;
      const onKey = (event: KeyboardEvent) => {
         if (event.key === "Escape") handleClose();
      };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      // Move focus into the dialog so the keyboard does not stay behind it.
      panelRef.current?.focus();
      return () => {
         document.removeEventListener("keydown", onKey);
         document.body.style.overflow = "";
      };
   }, [isOpen, handleClose]);

   if (!isOpen) return null;

   return (
      <div
         className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
         onMouseDown={(event) => {
            // Backdrop click closes; a drag that starts inside the panel does not.
            if (event.target === event.currentTarget) handleClose();
         }}
      >
         <div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="animate-sheet flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-panel bg-ink-raised shadow-lifted outline-none sm:max-w-lg sm:rounded-panel"
         >
            <div className="flex items-center justify-between gap-4 border-b border-ink-line px-6 py-5">
               <h2 className="text-[17px] font-semibold tracking-[-0.015em] text-cream">
                  {title}
               </h2>
               <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-cream-muted transition-colors duration-200 hover:bg-white/[0.07] hover:text-cream"
               >
                  <IoMdClose size={18} />
               </button>
            </div>

            <div className="flex-auto overflow-y-auto px-6 py-6">{body}</div>

            <div className="flex flex-col gap-3 border-t border-ink-line px-6 py-5">
               <div className="flex w-full flex-row items-center gap-3">
                  {secondaryAction && secondaryActionLabel && (
                     <Button
                        outline
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={secondaryAction}
                     />
                  )}
                  <Button
                     disabled={disabled}
                     loading={disabled}
                     label={actionLabel}
                     onClick={onSubmit}
                  />
               </div>
               {footer}
            </div>
         </div>
      </div>
   );
};
export default Modal;
