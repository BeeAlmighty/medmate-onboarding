import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react'; // Using the lock icon for the staff portal

export const AppFooter = () => {
  // 1. Initialize the navigate function
  const navigate = useNavigate();

  const goToTerminal = () => {
    // 2. Trigger navigation to the /terminal route
    navigate('/terminal');
  };

  return (
    <footer className="py-8 flex flex-col items-center gap-4">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        © 2026 MedMate Wellness
      </p>

      {/* 3. The "Secret" Staff Access Button */}
      <button 
        onClick={goToTerminal}
        className="opacity-5 hover:opacity-100 transition-all duration-500 p-4 text-slate-300 group flex items-center gap-2"
        title="Staff Portal"
      >
        <Lock size={12} className="group-hover:text-blue-500" />
        <span className="text-[10px] font-bold hidden group-hover:block">Terminal Access</span>
      </button>
    </footer>
  );
};