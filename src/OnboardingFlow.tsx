import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { SuccessMessage } from "./components/SuccessMessage";
import {
  Activity,
  Sparkles,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { AppFooter } from "./components/AppFooter";

type AppView = "CHECK" | "REGISTER" | "ALREADY_IN";

interface UserContext {
  greeting: string;
  firstName: string;
  fullName?: string;
  isNewUser: boolean;
}

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [view, setView] = useState<AppView>("CHECK");
  const [phone, setPhone] = useState<string>("");
  const [userContext, setUserContext] = useState<UserContext>({
    greeting: "",
    firstName: "",
    isNewUser: false,
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden text-[#1A1A1A] font-sans selection:bg-blue-100 flex flex-col antialiased">
      {/* 1. SLIM TOP NAV */}
      <nav className="fixed top-0 z-50 w-full bg-white/40 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-slate-200/20">
        <div className="flex items-center gap-2">
          <Activity
            size={16}
            className="text-blue-600"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
            Portal
          </span>
        </div>
        <button
          onClick={() => navigate("/voucher")}
          className="group flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 hover:border-blue-400 rounded-full transition-all duration-500 shadow-sm"
        >
          <Sparkles className="text-blue-500 w-3 h-3" />
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-600">
            Privileges
          </span>
        </button>
      </nav>

      {/* Ambient Background Accents */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 blur-[120px] rounded-full" />
      </div>

      {/* CENTERED PORTAL CONTAINER */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-[420px] mx-auto px-6 py-20">
        {/* Activity Logo & Header */}
        <header className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center justify-center p-3.5 bg-white rounded-[2rem] shadow-sm border border-slate-100 mb-6 group transition-all active:scale-95">
            <Activity className="text-blue-600 w-8 h-8 group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <h1 className="text-[44px] font-black tracking-[-0.05em] leading-none text-slate-900">
              MedMate<span className="text-blue-600">.</span>
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-3">
              GeoTech <span className="text-slate-200 mx-1">|</span> Wellness
              Uplink
            </p>
          </div>
        </header>

        {/* Main Interaction Card - Glassmorphism */}
        <main className="w-full">
          <div className="w-full bg-white/80 backdrop-blur-3xl rounded-[3rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-white/80 ring-1 ring-slate-200/40">
            {view === "CHECK" && (
              <StepOne
                onRegistered={(data) => {
                  setUserContext({
                    greeting: data.greeting || "Welcome back",
                    firstName: data.firstName || "Member",
                    isNewUser: false,
                  });
                  setView("ALREADY_IN");
                }}
                onNotRegistered={(validatedPhone) => {
                  setPhone(validatedPhone);
                  setView("REGISTER");
                }}
              />
            )}

            {view === "REGISTER" && (
              <StepTwo
                phone={phone}
                onComplete={(data) => {
                  setUserContext({
                    greeting: data.greeting || "Welcome",
                    firstName: data.firstName || "New Patient",
                    fullName: data.fullName,
                    isNewUser: true,
                  });
                  setView("ALREADY_IN");
                }}
              />
            )}

            {view === "ALREADY_IN" && (
              <SuccessMessage
                greeting={userContext.greeting}
                firstName={userContext.firstName}
                fullName={userContext.fullName}
                type={userContext.isNewUser ? "NEW" : "RETURNING"}
              />
            )}
          </div>

          {/* Aesthetic Bento Info Buttons */}
          {view === "CHECK" && (
            <div className="grid grid-cols-2 gap-4 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {/* Safety Card */}
              <div className="bg-white p-5 rounded-[2.2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center min-h-[120px] hover:shadow-md transition-all active:scale-[0.98]">
                <ShieldCheck
                  className="text-blue-500 w-6 h-6 mb-2"
                  strokeWidth={1.5}
                />
                <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                  Safety
                </h3>
                <p className="text-[12px] font-bold text-slate-800">
                  Verified Records
                </p>
              </div>

              {/* Rewards Card */}
              <div className="bg-white p-5 rounded-[2.2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center min-h-[120px] hover:shadow-md transition-all active:scale-[0.98]">
                <Heart
                  className="text-pink-500 w-6 h-6 mb-2"
                  strokeWidth={1.5}
                />
                <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                  Rewards
                </h3>
                <p className="text-[12px] font-bold text-slate-800">
                  Instantly Earned
                </p>
              </div>
            </div>
          )}
        </main>

        <footer className="w-full mt-12 opacity-60">
          <AppFooter />
        </footer>
      </div>
    </div>
  );
}
