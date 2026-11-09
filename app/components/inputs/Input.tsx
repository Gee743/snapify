"use client";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
   id: string;
   label: string;
   type?: string;
   disabled?: boolean;
   formatPrice?: boolean;
   required?: boolean;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors;
}

/**
 * Form field.
 *
 * Was a white input with a floating label on a dark page. A plain label above
 * the field also keeps the question visible while typing, which a label that
 * shrinks into the border does not.
 */
const Input: React.FC<InputProps> = ({
   id,
   label,
   type = "text",
   disabled,
   formatPrice,
   required,
   register,
   errors,
}) => {
   const invalid = Boolean(errors[id]);

   return (
      <div className="w-full">
         <label
            htmlFor={id}
            className="mb-1.5 block text-[13px] font-medium text-cream-soft"
         >
            {label}
         </label>
         <div className="relative">
            {formatPrice && (
               <span
                  aria-hidden="true"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-cream-muted"
               >
                  Rs
               </span>
            )}
            <input
               id={id}
               disabled={disabled}
               type={type}
               aria-invalid={invalid}
               aria-describedby={invalid ? `${id}-error` : undefined}
               {...register(id, { required })}
               className={`w-full rounded-xl border bg-ink px-4 py-3 text-[15px] text-cream outline-none transition-colors duration-200 placeholder:text-cream-faint disabled:cursor-not-allowed disabled:opacity-55 ${
                  formatPrice ? "pl-11" : ""
               } ${
                  invalid
                     ? "border-signal-stop focus:border-signal-stop"
                     : "border-ink-lineStrong focus:border-lime"
               }`}
            />
         </div>
         {invalid && (
            <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12.5px] text-signal-stop">
               {label} is required.
            </p>
         )}
      </div>
   );
};
export default Input;
