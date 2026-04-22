import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "success";
}

export const Button = ({
  children,
  isLoading,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/10",
    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300/50",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/10",
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      className={`
        w-full px-8 py-5 rounded-[2rem] font-black cursor-pointer flex items-center justify-center gap-3 
        transition-all duration-300 active:scale-[0.98] disabled:opacity-50 
        uppercase tracking-widest text-xs
        ${variants[variant]} ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-3">
          <Loader2
            className="animate-spin"
            size={18}
          />
          <span className="opacity-80">Processing...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
