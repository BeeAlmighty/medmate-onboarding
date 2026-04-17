import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { medMateClient } from "../api/client";

interface StepTwoProps {
  phone: string;
  onComplete: (data: any) => void;
}

export const StepTwo = ({ phone, onComplete }: StepTwoProps) => {
  const [name, setName] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      setShowError(true);
      setTimeout(() => setShowError(false), 800);
      return;
    }

    setLoading(true);
    try {
      const data = await medMateClient.registerCustomer({
        phone,
        name,
        dob: `${dobMonth}-${dobDay}`,
        consent: true,
      });

      if (data.success) {
        onComplete({ ...data, fullName: name });
      }
    } catch (err) {
      console.error("MedMate Registration Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-in slide-in-from-bottom-4 duration-700"
    >
      <Input
        label="Full Name"
        required
        placeholder="e.g. Moses Maduakonam"
        onChange={(e) => setName(e.target.value)}
      />

      {/* Bento-Style Birthday Group */}
      <div className="space-y-2 group">
        <label className="text-[11px] font-black text-slate-400 ml-1 uppercase tracking-[0.15em] group-focus-within:text-blue-500 transition-colors">
          Date of Birth
        </label>
        <div className="grid grid-cols-2 gap-3 p-2 bg-slate-100/40 backdrop-blur-md rounded-[2rem] border-2 border-transparent group-focus-within:border-blue-500/10 transition-all">
          <div className="relative">
            <select
              required
              className="appearance-none w-full px-5 py-4 bg-white rounded-[1.4rem] text-slate-900 font-bold text-base outline-none shadow-sm cursor-pointer"
              onChange={(e) => setDobMonth(e.target.value)}
            >
              <option
                value=""
                disabled
                selected
              >
                Month
              </option>
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((m) => (
                <option
                  key={m}
                  value={m}
                >
                  {m}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            placeholder="Day"
            min="1"
            max="31"
            required
            className="w-full px-5 py-4 bg-white rounded-[1.4rem] text-slate-900 font-bold text-base outline-none shadow-sm placeholder:text-slate-300"
            onChange={(e) => setDobDay(e.target.value)}
          />
        </div>
      </div>

      {/* 2026 Validation Card */}
      <div
        onClick={() => {
          setConsent(!consent);
          if (showError) setShowError(false);
        }}
        className={`relative flex items-center gap-4 p-5 rounded-[1.8rem] border-2 transition-all duration-300 cursor-pointer select-none 
          ${showError ? "animate-shake border-red-500/40 bg-red-50/50" : ""}
          ${!showError && consent ? "bg-white border-blue-500/20 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)] scale-[1.02]" : "bg-slate-100/40 border-transparent hover:bg-slate-100/60"}
        `}
      >
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 
            ${showError ? "bg-red-500 text-white" : consent ? "bg-blue-600 shadow-lg shadow-blue-200" : "bg-slate-200"}
          `}
        >
          {showError ? (
            <AlertCircle size={22} />
          ) : (
            <CheckCircle2
              size={22}
              strokeWidth={3}
              className={consent ? "text-white" : "text-slate-400 opacity-40"}
            />
          )}
        </div>
        <div className="flex-1">
          <p
            className={`text-[13px] font-bold ${showError ? "text-red-700" : consent ? "text-slate-900" : "text-slate-500"}`}
          >
            {showError ? "Consent Required" : "WhatsApp Opt-in"}
          </p>
          <p
            className={`text-[11px] font-medium leading-tight ${showError ? "text-red-400" : "text-slate-400"}`}
          >
            {showError
              ? "Please accept terms to claim voucher."
              : "Instant rewards & safety updates."}
          </p>
        </div>
      </div>

      <Button
        variant="success"
        isLoading={loading}
        type="submit"
        className={`w-full py-6 text-lg rounded-[1.8rem] transition-all duration-300 ${!consent ? "opacity-60 grayscale-[0.5]" : ""}`}
      >
        Claim My Voucher <Send size={20} />
      </Button>
    </form>
  );
};
