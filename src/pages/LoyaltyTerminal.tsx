import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Phone,
  Banknote,
  Send,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const LoyaltyTerminal = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  // Form States
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  /**
   * STAGE 1: PIN VERIFICATION
   * Checks the daily deterministic PIN against the n8n generator
   */
  const handleVerifyAccess = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://n8n.geotech.agency/webhook/verify-terminal-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: passcode }),
        },
      );

      if (!response.ok) throw new Error("Server communication failed");

      const data = await response.json();

      if (data && data.authorized === true) {
        setIsAuthorized(true);
        setStatus("IDLE");
      } else {
        setIsAuthorized(false);
        alert("Invalid Daily PIN. Access Denied.");
      }
    } catch (err) {
      console.error("Auth Error:", err);
      alert("Connection Error. Please check if n8n is online.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * STAGE 2: TRANSACTION SUBMISSION
   * Sends the cleaned data to n8n and waits for a "success" JSON status
   */
  const handleSubmitPoints = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("IDLE");
    setErrorMessage("");

    try {
      const cleanPhone = phone.replace(/\D/g, "");

      const response = await fetch(
        "https://n8n.geotech.agency/webhook/record-transaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: cleanPhone,
            amount: Number(amount),
            timestamp: new Date().toISOString(),
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setStatus("SUCCESS");
        setAmount("");
        setPhone("");

        // Added: 2-second delay before navigating home
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        setStatus("ERROR");
        setErrorMessage(
          data.message || "Patient not found. Register them first.",
        );
      }
    } catch (error) {
      setStatus("ERROR");
      setErrorMessage("Network Error: Could not reach the GeoTech server.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDER: LOCK SCREEN ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-blue-600 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Pharmacist Access Only
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Enter daily terminal PIN for Divine Options Pharmacy.
          </p>

          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="••••"
            className="w-full text-center text-3xl tracking-[0.5em] font-bold p-5 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 mb-6"
          />

          <Button
            onClick={handleVerifyAccess}
            disabled={isLoading}
            className="w-full py-4 rounded-2xl font-bold"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Unlock Terminal"
            )}
          </Button>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-8 flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>
      </div>
    );
  }

  // --- RENDER: POINTS TERMINAL ---
  return (
    <div className="min-h-screen bg-white p-6 md:p-12 animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Points Terminal
              </h1>
              <p className="text-slate-500 font-medium">
                Divine Options Pharmacy
              </p>
            </div>
          </div>
          <div className="self-start md:self-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            Live Connection
          </div>
        </div>

        <form
          onSubmit={handleSubmitPoints}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                <Phone size={14} /> Customer Phone
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08103157367"
                className="w-full bg-transparent text-xl font-bold outline-none text-slate-800"
              />
            </div>

            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                <Banknote size={14} /> Amount (₦)
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="5000"
                className="w-full bg-transparent text-xl font-bold outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Success Notification */}
          {status === "SUCCESS" && (
            <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-2xl border border-green-100 animate-in slide-in-from-top-2">
              <CheckCircle2
                size={20}
                className="shrink-0"
              />
              <span className="text-sm font-bold">
                Transaction Recorded. Points updated!
              </span>
            </div>
          )}

          {/* Red Alert Notification */}
          {status === "ERROR" && (
            <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 animate-in slide-in-from-top-2">
              <XCircle
                size={20}
                className="shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-tight">
                  Record Failed
                </span>
                <span className="text-[11px] font-medium opacity-80">
                  {errorMessage}
                </span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-8 rounded-[2rem] text-xl font-black shadow-xl shadow-blue-100"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send size={20} /> Submit Transaction
              </span>
            )}
          </Button>
        </form>

        <button
          onClick={() => setIsAuthorized(false)}
          className="w-full mt-8 text-slate-300 text-[10px] font-bold uppercase tracking-widest hover:text-red-400 transition-colors"
        >
          Lock Terminal
        </button>
      </div>
    </div>
  );
};
