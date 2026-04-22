import { useNavigate } from "react-router-dom";
import { Lock, HeartPulse, ShieldCheck } from "lucide-react";

export const AppFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full flex flex-col items-center gap-8 pb-12">
      {/* Brand Badge */}
      <div className="flex items-center gap-3 px-5 py-2 bg-slate-100 rounded-full border border-slate-200/50">
        <HeartPulse
          size={12}
          className="text-blue-600 animate-pulse"
        />
        <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.25em]">
          MedMate Wellness Hub • Lagos
        </p>
      </div>

      {/* Terminal Access - High Aesthetic Visibility */}
      <div className="w-full max-w-[280px] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="flex flex-col items-center gap-4">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          Authorized Personnel Only
        </p>
        <button
          onClick={() => navigate("/terminal")}
          className="group flex items-center gap-4 px-8 py-4 bg-white hover:bg-slate-900 border border-slate-200 rounded-3xl transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-slate-200"
        >
          <div className="p-2 bg-slate-50 group-hover:bg-slate-800 rounded-xl transition-colors">
            <Lock
              size={16}
              className="text-slate-400 group-hover:text-blue-500 transition-colors"
            />
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-white transition-colors">
              Access Terminal
            </span>
            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
              Secure Pharmacy Login
            </span>
          </div>
        </button>
      </div>

      {/* Agency Credit */}
      <div className="flex items-center gap-2 mt-4 opacity-50 hover:opacity-100 transition-opacity">
        <ShieldCheck
          size={10}
          className="text-slate-400"
        />
        <p className="text-[8px] text-slate-400 font-medium uppercase tracking-[0.3em]">
          Engineered by{" "}
          <span className="text-slate-900 font-black">Geotech Solutions</span>
        </p>
      </div>
    </footer>
  );
};
