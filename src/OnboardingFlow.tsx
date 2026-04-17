import { useState } from "react";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { SuccessMessage } from "./components/SuccessMessage";
import { Activity, ShieldCheck, Heart } from "lucide-react";
import { AppFooter } from "./components/AppFooter";

/**
 * 2026 TypeScript Convention: Define explicit View types
 * to ensure state consistency across the application.
 */
type AppView = "CHECK" | "REGISTER" | "ALREADY_IN";

interface UserContext {
  greeting: string;
  firstName: string;
  fullName?: string;
  isNewUser: boolean;
}

export default function OnboardingFlow() {
  const [view, setView] = useState<AppView>("CHECK");
  const [phone, setPhone] = useState<string>("");
  const [userContext, setUserContext] = useState<UserContext>({
    greeting: "",
    firstName: "",
    isNewUser: false,
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* Background Blurs: Optimized for mobile performance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[5%] -left-[10%] w-[60%] h-[40%] bg-blue-400/10 blur-[100px] rounded-full" />
        <div className="absolute top-[60%] -right-[10%] w-[60%] h-[50%] bg-indigo-400/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] mx-auto px-5 pt-10 pb-16 min-h-screen flex flex-col box-border">
        {/* Hero Section */}
        <header className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center justify-center p-3.5 bg-white rounded-[2rem] shadow-sm border border-slate-100 mb-6 group transition-all active:scale-95">
            <Activity className="text-blue-600 w-8 h-8 group-hover:rotate-12 transition-transform" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            MedMate<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-500 max-w-[260px] mx-auto leading-relaxed text-sm">
            Your neighborhood pharmacy,
            <span className="text-slate-900 font-semibold block">
              digitally enhanced.
            </span>
          </p>
        </header>

        {/* Main Interface Card */}
        <main className="flex-1 w-full">
          <div className="w-full bg-white/75 backdrop-blur-2xl rounded-[2.5rem] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-white/60 ring-1 ring-slate-200/40 box-border overflow-hidden">
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
                    firstName: data.firstName || "New Member",
                    fullName: data.fullName, // Capture full name for the WhatsApp pretext
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

          {/* Bento Features: Visible only on initial check to reduce cognitive load */}
          {view === "CHECK" && (
            <div className="grid grid-cols-2 gap-4 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-full box-border">
              <div className="bg-white/50 p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <ShieldCheck className="text-blue-500 mb-2 w-6 h-6" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-1">
                  Safety
                </h3>
                <p className="text-xs font-bold text-slate-700">
                  Verified Records
                </p>
              </div>
              <div className="bg-white/50 p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <Heart className="text-pink-500 mb-2 w-6 h-6" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-1">
                  Rewards
                </h3>
                <p className="text-xs font-bold text-slate-700">
                  Instantly Earned
                </p>
              </div>
            </div>
          )}
        </main>

        {/* GeoTech Footer */}
        <footer className="mt-auto pt-10 text-center w-full">
          <div className="inline-block h-[1px] w-8 bg-slate-200 mb-5" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-2">
            MedMate Digital Experience
          </p>
          <p className="text-[10px] text-slate-300 flex items-center justify-center gap-1.5 font-medium">
            Powered by
            <span className="text-slate-500 font-extrabold hover:text-blue-600 transition-colors cursor-help">
              GeoTech Solutions
            </span>
          </p>
          {/* Inside your Dashboard/Success Page Footer */}
          <AppFooter />
        </footer>
      </div>
    </div>
  );
}
