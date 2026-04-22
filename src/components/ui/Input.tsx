import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
    return (
    <div className="group space-y-2 w-full animate-in fade-in duration-500">
      <label className="text-[10px] font-black text-blue-400 ml-1 uppercase tracking-[0.2em] transition-colors group-focus-within:text-blue-600">
        {label}
      </label>
      <div className="relative w-full">
        <input
          className={`
            w-full px-6 py-5
            bg-white border-2 border-slate-200/60
            rounded-[1.8rem] 
            text-blue-700 font-bold text-lg
            placeholder:text-blue-300 
            outline-none transition-all duration-300
            focus:border-blue-500/30 
            focus:ring-[8px] focus:ring-blue-500/5 
            focus:shadow-xl focus:shadow-blue-500/5
          `}
          {...props}
        />
        {/* Subtle decorative medical line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-blue-500 rounded-full transition-all duration-500 group-focus-within:w-1/4 opacity-20" />
      </div>
    </div>
);
};
