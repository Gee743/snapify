"use client";

import { IconType } from "react-icons";

interface ButtonProps {
   label: string;
   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
   disabled?: boolean;
   outline?: boolean;
   small?: boolean;
   icon?: IconType;
   /** Shows a spinner and blocks input while an action is in flight. */
   loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
   label,
   onClick,
   disabled,
   outline,
   small,
   icon: Icon,
   loading,
}) => {
   const blocked = disabled || loading;

   return (
      <button
         type="button"
         onClick={onClick}
         disabled={blocked}
         aria-busy={loading || undefined}
         className={`relative flex w-full items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-55 ${
            outline
               ? "border border-ink-lineStrong bg-transparent text-cream hover:border-lime hover:text-lime"
               : "bg-lime text-ink hover:brightness-105 enabled:active:scale-[0.98]"
         } ${small ? "px-4 py-2 text-[13px]" : "px-5 py-3 text-[15px]"}`}
      >
         {loading && (
            <span
               aria-hidden="true"
               className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
         )}
         {label}
         {Icon && !loading && <Icon size={18} aria-hidden="true" />}
      </button>
   );
};

export default Button;
