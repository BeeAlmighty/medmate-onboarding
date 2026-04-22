import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  Tag,
  AlertTriangle,
  Search,
  History,
  Lock,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import type { MedMatePrivilege } from "../types";

type TerminalStatus = "IDLE" | "VERIFYING" | "REDEEMING" | "SUCCESS" | "ERROR";

export const RedemptionTerminal = () => {
  const navigate = useNavigate();

  // --- Auth & UI State ---
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [status, setStatus] = useState<TerminalStatus>("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  // --- Logic States ---
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherData, setVoucherData] = useState<MedMatePrivilege | null>(null);

  // Clear errors on input change
  useEffect(() => {
    if (status === "ERROR") {
      setStatus("IDLE");
      setErrorMessage("");
    }
  }, [passcode, voucherCode]);

  /**
   * STAGE 1: TERMINAL AUTHORIZATION
   */
  const handleVerifyAccess = async () => {
    setStatus("VERIFYING");
    try {
      const response = await fetch(
        "https://n8n.geotech.agency/webhook/verify-terminal-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: passcode }),
        },
      );
      const data = await response.json();

      if (data?.authorized) {
        setIsAuthorized(true);
        setStatus("IDLE");
      } else {
        throw new Error("ACCESS DENIED: Invalid Terminal PIN.");
      }
    } catch (err: any) {
      setStatus("ERROR");
      setErrorMessage(err.message || "Connection to Geotech Uplink failed.");
    }
  };

  /**
   * STAGE 2: VOUCHER LOOKUP
   */
  const handleLookupVoucher = async () => {
    if (!voucherCode) return;
    setStatus("VERIFYING");
    setVoucherData(null);

    try {
      const response = await fetch(
        "https://n8n.geotech.agency/webhook/verify-code-medmate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ privilegeCode: voucherCode }),
        },
      );
      const data = await response.json();

      // Flexible mapping to ensure the UI catches the record
      const record = data.privilege || data.voucher || data;

      if (response.ok && (data.found || record.id)) {
        setVoucherData(record);
        setStatus("IDLE");
      } else {
        throw new Error(data.message || "Voucher code not found or invalid.");
      }
    } catch (err: any) {
      setStatus("ERROR");
      setErrorMessage(err.message);
    }
  };

  /**
   * STAGE 3: REDEMPTION ACTION
   */
  const handleRedeemAction = async () => {
    if (!voucherData) return;
    setStatus("REDEEMING");

    try {
      const response = await fetch(
        "https://n8n.geotech.agency/webhook/medmate-redeem-action",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recordId: voucherData.id,
            code: voucherData.code,
          }),
        },
      );

      if (response.ok) {
        setStatus("SUCCESS");
        setVoucherCode("");
        // Reset terminal after success
        setTimeout(() => {
          setVoucherData(null);
          setStatus("IDLE");
        }, 5000);
      } else {
        throw new Error("Redemption failed in registry. Try again.");
      }
    } catch (err: any) {
      setStatus("ERROR");
      setErrorMessage(err.message);
    }
  };

  // --- RENDER: TERMINAL LOCK SCREEN ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-200 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-blue-100">
            <Lock
              className={status === "ERROR" ? "text-red-500" : "text-blue-600"}
              size={40}
            />
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1">
            Redemption Terminal
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
            Secure Access Required
          </p>

          {status === "ERROR" && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 animate-in zoom-in-95">
              <AlertTriangle size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {errorMessage}
              </span>
            </div>
          )}

          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="••••"
            className="w-full text-center text-4xl tracking-[0.6em] font-black p-6 bg-slate-50 rounded-[2rem] border border-slate-200 text-blue-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all mb-6"
          />
          <Button
            onClick={handleVerifyAccess}
            className="w-full py-8 rounded-[2rem] font-black uppercase tracking-widest bg-blue-600 text-white"
          >
            {status === "VERIFYING" ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Unlock Terminal"
            )}
          </Button>
        </div>
      </div>
    );
  }

  // --- RENDER: MAIN INTERFACE ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 font-sans relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsAuthorized(false)}
              className="p-4 bg-white rounded-[1.5rem] text-slate-400 hover:text-blue-600 shadow-sm border border-slate-200 transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900">
                Voucher <span className="text-blue-600">Verification</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
                  Registry Uplink: Online
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
            <ShieldCheck
              className="text-blue-600"
              size={18}
            />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">
              Terminal 04
            </span>
          </div>
        </header>

        <div className="grid gap-8">
          {/* Lookup Section */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Search
                size={14}
                className="text-blue-600"
              />{" "}
              Voucher Lookup
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                placeholder="VCH-0000-0000"
                className="flex-1 bg-slate-50 text-xl font-black p-6 rounded-[1.8rem] border border-slate-200 focus:bg-white outline-none transition-all"
              />
              <Button
                onClick={handleLookupVoucher}
                disabled={status === "VERIFYING"}
                className="px-12 py-6 rounded-[1.8rem] bg-blue-600 text-white font-black"
              >
                {status === "VERIFYING" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Verify Code"
                )}
              </Button>
            </div>
          </section>

          {/* Result Section */}
          {voucherData && status !== "SUCCESS" && (
            <div
              className={`p-10 rounded-[3rem] border-2 animate-in slide-in-from-bottom-6 transition-all duration-500 ${
                voucherData.status === "USED"
                  ? "bg-red-50/30 border-red-100"
                  : "bg-white border-emerald-100 shadow-xl shadow-emerald-500/5"
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
                <div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-3 inline-block ${
                      voucherData.status === "USED"
                        ? "bg-red-100 text-red-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    Voucher Status: {voucherData.status}
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                    {voucherData.benefitType}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-slate-500">
                    <Tag
                      size={14}
                      className="text-blue-500"
                    />
                    <p className="text-xs font-bold">
                      Beneficiary:{" "}
                      <span className="text-slate-900">
                        {voucherData.patientName}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {voucherData.status === "UNUSED" ? (
                <Button
                  onClick={handleRedeemAction}
                  className="w-full py-8 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20"
                >
                  {status === "REDEEMING" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span className="flex items-center gap-3 justify-center">
                      <Ticket size={22} /> Confirm & Redeem Voucher
                    </span>
                  )}
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-3 text-red-500 p-6 bg-red-50 rounded-[2rem] border border-red-100">
                  <History size={20} />
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    This voucher has already been redeemed
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Feedback Messages */}
          {status === "SUCCESS" && (
            <div className="flex flex-col items-center gap-6 bg-emerald-600 text-white p-12 rounded-[3.5rem] shadow-2xl animate-in zoom-in-95 text-center">
              <CheckCircle2 size={64} />
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">
                  Redemption Successful
                </h2>
                <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest mt-2">
                  Voucher Voided. Transaction Securely Logged.
                </p>
              </div>
            </div>
          )}

          {status === "ERROR" && !voucherData && (
            <div className="flex items-center gap-4 bg-red-50 text-red-600 p-6 rounded-[2rem] border border-red-100 animate-in zoom-in-95">
              <XCircle size={24} />
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest">
                  Verification Failed
                </span>
                <span className="text-[10px] font-bold opacity-70 uppercase">
                  {errorMessage}
                </span>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-20 flex flex-col items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-slate-300 text-[9px] font-black uppercase tracking-[0.5em] hover:text-blue-600 transition-all"
          >
            Lock Terminal
          </button>
          <p className="text-slate-200 text-[8px] font-bold uppercase tracking-widest">
            Engineered by Geotech Solutions • Lagos
          </p>
        </footer>
      </div>
    </div>
  );
};
