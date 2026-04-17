import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
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
      alert("Could not complete registration. Please try again.");
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
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg
                width="10"
                height="6"
                viewBox="0 0 12 8"
                fill="none"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
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

      {/* Haptic Consent Card */}
      <div
        onClick={() => setConsent(!consent)}
        className={`relative flex items-center gap-4 p-5 rounded-[1.8rem] border-2 transition-all duration-500 cursor-pointer select-none ${
          consent
            ? "bg-white border-blue-500/20 shadow-xl scale-[1.02]"
            : "bg-slate-100/40 border-transparent hover:bg-slate-100/60"
        }`}
      >
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-500 ${consent ? "bg-blue-600 shadow-lg shadow-blue-200" : "bg-slate-200"}`}
        >
          <CheckCircle2
            size={20}
            strokeWidth={3}
            className={`transition-opacity ${consent ? "text-white opacity-100" : "text-slate-400 opacity-40"}`}
          />
        </div>
        <div className="flex-1">
          <p
            className={`text-[13px] font-bold ${consent ? "text-slate-900" : "text-slate-500"}`}
          >
            WhatsApp Opt-in
          </p>
          <p className="text-[11px] text-slate-400 font-medium leading-tight">
            Instant rewards & safety updates.
          </p>
        </div>
      </div>

      <Button
        variant="success"
        isLoading={loading}
        type="submit"
        className="w-full py-6 text-lg rounded-[1.8rem]"
      >
        Claim My Voucher <Send size={20} />
      </Button>
    </form>
  );
};
