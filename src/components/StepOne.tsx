import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import { medMateClient } from "../api/client";

interface StepOneProps {
  onRegistered: (data: any) => void;
  onNotRegistered: (phone: string) => void;
}

export const StepOne = ({ onRegistered, onNotRegistered }: StepOneProps) => {
  const [inputNumber, setInputNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputNumber || loading) return;

    setLoading(true);
    try {
      const data = await medMateClient.checkCustomer(inputNumber);

      if (data.exists) {
        onRegistered(data);
      } else {
        const finalNumber = data.formattedNumber || `234${inputNumber}`;
        onNotRegistered(finalNumber);
      }
    } catch (err) {
      alert("Connectivity issue. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCheck}
      className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700"
    >
      <div className="space-y-2 group">
        <label className="text-[11px] font-black text-blue-400 ml-1 uppercase tracking-[0.15em] group-focus-within:text-blue-600 transition-colors">
          WhatsApp Number
        </label>

        <div className="flex gap-3 p-2 bg-slate-100/40 backdrop-blur-md rounded-[2rem] border-2 border-transparent group-focus-within:border-blue-500/10 transition-all">
          <div className="flex items-center justify-center px-5 bg-white rounded-[1.4rem] text-slate-900 font-black text-base shadow-sm">
            +234
          </div>
          <input
            required
            type="tel"
            placeholder="812 345 6789"
            className="flex-1 px-4 py-4 bg-transparent text-blue-900 font-bold text-lg outline-none placeholder:text-blue-300"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>
      <Button
        type="submit"
        isLoading={loading}
        className="w-full py-6 text-lg rounded-[1.8rem] bg-blue-600 hover:bg-blue-700 shadow-xl transition-all"
      >
        <span className="tracking-tight flex items-center gap-2">
          Claim Welcome Voucher <ArrowRight size={20} />
        </span>
      </Button>
    </form>
  );
};
