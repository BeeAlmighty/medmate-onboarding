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
      "bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-900",
    success:
      "bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-500/20",
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      className={`
        w-full px-8 rounded-[2rem] font-black flex items-center justify-center gap-3 
        transition-all duration-300 active:scale-[0.97] disabled:opacity-50 
        ${variants[variant]} ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-3 py-1">
          <Loader2
            className="animate-spin"
            size={22}
          />
          <span className="tracking-wide text-base">Securing Profile...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
