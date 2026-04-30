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
  // 1. Auto-checked by default for better conversion
  const [consent, setConsent] = useState(true);
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
        placeholder="Enter your first and last name"
        onChange={(e) => setName(e.target.value)}
      />

      {/* Bento-Style Birthday Group */}
      <div className="space-y-2 group">
        <label className="text-[11px] font-black text-blue-500/80 ml-1 uppercase tracking-[0.15em] group-focus-within:text-blue-600 transition-colors">
          Your Birthday
        </label>
        <div className="grid grid-cols-2 gap-3 p-2 bg-blue-50 rounded-[2rem] border border-blue-100 group-focus-within:border-blue-300 transition-all">
          <div className="relative">
            <select
              required
              className="appearance-none w-full px-5 py-4 bg-white rounded-[1.4rem] text-blue-900 font-bold text-base outline-none shadow-sm cursor-pointer border border-transparent focus:border-blue-400"
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
            className="w-full px-5 py-4 bg-white rounded-[1.4rem] text-blue-600 font-bold text-base outline-none shadow-sm border border-transparent focus:border-blue-400 placeholder:text-slate-300"
            onChange={(e) => setDobDay(e.target.value)}
          />
        </div>
      </div>

      {/* Improved Consent Card: More descriptive and trust-focused */}
      <div
        onClick={() => {
          setConsent(!consent);
          if (showError) setShowError(false);
        }}
        className={`relative flex items-center gap-4 p-5 rounded-[2.2rem] border-2 transition-all duration-500 cursor-pointer select-none 
          ${showError ? "animate-shake border-red-500 bg-red-50" : ""}
          ${!showError && consent ? "bg-blue-50/50 border-blue-500/30 shadow-md shadow-blue-500/5" : "bg-slate-50 border-slate-200 opacity-70"}
        `}
      >
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500 shrink-0
            ${showError ? "bg-red-500 text-white" : consent ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-200 text-slate-400"}
          `}
        >
          {showError ? (
            <AlertCircle size={24} />
          ) : (
            <CheckCircle2
              size={24}
              strokeWidth={3}
            />
          )}
        </div>
        <div className="flex-1">
          <p
            className={`text-[14px] font-black tracking-tight ${showError ? "text-red-700" : consent ? "text-blue-900" : "text-slate-500"}`}
          >
            {showError ? "Consent Required" : "Agree to Rewards"}
          </p>
          <p
            className={`text-[11px] font-medium leading-snug ${showError ? "text-red-500" : "text-slate-500"}`}
          >
            {showError
              ? "Please accept terms to claim your benefits."
              : "I want to receive my digital vouchers via WhatsApp."}
          </p>
        </div>
      </div>

      <Button
        variant="success"
        isLoading={loading}
        type="submit"
        className={`w-full py-7 text-xl rounded-[2rem] shadow-xl shadow-green-500/20 transition-all duration-500 active:scale-95 ${!consent ? "opacity-50 pointer-events-none" : ""}`}
      >
        Claim My Rewards{" "}
        <Send
          size={20}
          className="ml-2"
        />
      </Button>
    </form>
  );
};
