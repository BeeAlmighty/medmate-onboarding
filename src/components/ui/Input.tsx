import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="group space-y-2 w-full animate-in fade-in duration-500">
      <label className="text-[11px] font-black text-slate-400 ml-1 uppercase tracking-[0.15em] transition-colors group-focus-within:text-blue-600">
        {label}
      </label>
      <div className="relative w-full">
        <input
          className={`
            w-full px-6 py-5
            bg-slate-100/40 backdrop-blur-md
            border-2 border-transparent 
            rounded-[1.8rem] 
            text-slate-900 font-bold text-lg
            placeholder:text-slate-300 placeholder:font-medium
            outline-none transition-all duration-300
            focus:bg-white 
            focus:border-blue-500/20 
            focus:ring-[10px] focus:ring-blue-500/5 
            focus:shadow-2xl
          `}
          {...props}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[4px] bg-blue-500 rounded-full transition-all duration-500 group-focus-within:w-1/3 opacity-30" />
      </div>
    </div>
  );
};
