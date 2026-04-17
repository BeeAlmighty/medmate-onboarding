// import {
//   CheckCircle2,
//   ShoppingBag,
//   MessageSquare,
//   HeartPulse,
//   Sparkles,
//   Gift,
// } from "lucide-react";
// import { Button } from "./ui/Button";

// interface SuccessMessageProps {
//   greeting: string;
//   firstName: string;
//   fullName?: string;
//   type: "RETURNING" | "NEW";
// }

// export const SuccessMessage = ({
//   greeting,
//   firstName,
//   fullName,
//   type,
// }: SuccessMessageProps) => {
//   const isNew = type === "NEW";

//   const handleWhatsAppAction = () => {
//     let message = "";
//     if (isNew) {
//       // Personalized pretext for New Registrants
//       message = encodeURIComponent(
//         `Hi MedMate! I'm ${fullName || firstName}. Just joined the loyalty program!`,
//       );
//     } else {
//       // Contextual pretext for Returning Users
//       message = encodeURIComponent(
//         `Hi MedMate, I'm at the pharmacy and ready to check in!`,
//       );
//     }
//     // Direct link to your business WhatsApp
//     window.location.href = `https://wa.me/2347079797963?text=${message}`;
//   };

//   return (
//     <div className="text-center animate-in zoom-in-95 duration-700 ease-out">
//       {/* Icon Header */}
//       <div className="flex justify-center mb-6">
//         <div
//           className={`p-5 rounded-[2rem] relative shadow-inner ${isNew ? "bg-green-50" : "bg-blue-50"}`}
//         >
//           <CheckCircle2
//             className={`${isNew ? "text-green-500" : "text-blue-500"} w-12 h-12`}
//           />
//           <div className="absolute -top-1 -right-1 bg-white w-6 h-6 rounded-full border-2 border-slate-50 flex items-center justify-center shadow-sm animate-bounce">
//             {isNew ? "🎁" : "⭐"}
//           </div>
//         </div>
//       </div>

//       <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
//         {greeting}, {firstName}!
//       </h2>

//       <p className="text-slate-500 mb-8 leading-relaxed text-sm px-2">
//         {isNew
//           ? "You've officially unlocked MedMate Elite. Your digital wellness journey starts here."
//           : "Great to see you again! Your profile is active and ready for today's rewards."}
//       </p>

//       {/* Structured Perks for Conversion */}
//       <div className="bg-slate-50/50 p-6 rounded-[2.2rem] mb-8 text-left border border-slate-100 ring-1 ring-inset ring-white/50 shadow-sm">
//         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">
//           Member Benefits & Access
//         </p>

//         <ul className="space-y-5">
//           {/* Perk 1: Rewards */}
//           <li className="flex items-start gap-4">
//             <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-50 text-xl shrink-0">
//               <Gift className="w-5 h-5 text-pink-500" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-bold text-slate-800">
//                 Loyalty & Birthday Rewards
//               </span>
//               <span className="text-[11px] text-slate-500 leading-tight">
//                 Earn points on every purchase + exclusive birthday vouchers.
//               </span>
//             </div>
//           </li>

//           {/* Perk 2: AI Healthcare Assistant */}
//           <li className="flex items-start gap-4">
//             <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100 text-xl shrink-0">
//               <HeartPulse className="w-5 h-5 text-blue-500" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-bold text-slate-800">
//                 24/7 Health Assistant
//               </span>
//               <span className="text-[11px] text-slate-500 leading-tight">
//                 Instant answers to medication questions via WhatsApp.
//               </span>
//             </div>
//           </li>

//           {/* Perk 3: Health Content */}
//           <li className="flex items-start gap-4">
//             <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100 text-xl shrink-0">
//               <Sparkles className="w-5 h-5 text-amber-500" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-bold text-slate-800">
//                 Proactive Health Tips
//               </span>
//               <span className="text-[11px] text-slate-500 leading-tight">
//                 Curated content on nutrition and wellness tailored for you.
//               </span>
//             </div>
//           </li>
//         </ul>
//       </div>

//       {/* Call to Action Section */}
//       <div className="space-y-4">
//         <Button
//           variant={isNew ? "success" : "primary"}
//           onClick={handleWhatsAppAction}
//           className="w-full py-5 rounded-[1.6rem] shadow-xl transition-all active:scale-[0.98] font-bold text-lg"
//         >
//           {isNew ? (
//             <MessageSquare
//               size={20}
//               className="fill-current"
//             />
//           ) : (
//             <ShoppingBag size={20} />
//           )}
//           {isNew ? "Connect & Claim Voucher" : "Check In at Counter"}
//         </Button>

//         <div className="flex items-center justify-center gap-2">
//           <span className="h-1 w-1 bg-slate-300 rounded-full" />
//           <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
//             {isNew
//               ? "Voucher valid for 24 hours"
//               : "Verify with the pharmacist"}
//           </p>
//           <span className="h-1 w-1 bg-slate-300 rounded-full" />
//         </div>
//       </div>
//     </div>
//   );
// };

import {
  CheckCircle2,
  ShoppingBag,
  MessageSquare,
  HeartPulse,
  Sparkles,
  Gift,
  History,
  BellRing,
} from "lucide-react";
import { Button } from "./ui/Button";

interface SuccessMessageProps {
  greeting: string;
  firstName: string;
  fullName?: string;
  type: "RETURNING" | "NEW";
}

export const SuccessMessage = ({
  greeting,
  firstName,
  fullName,
  type,
}: SuccessMessageProps) => {
  const isNew = type === "NEW";

  const handleWhatsAppAction = () => {
    const message = isNew
      ? encodeURIComponent(
          `Hi MedMate! I'm ${fullName || firstName}. I just joined the loyalty program and I'm ready for my welcome voucher!`,
        )
      : encodeURIComponent(
          `Hi MedMate, I'm ${firstName}. I'm at the pharmacy and ready to check in for my points!`,
        );

    window.location.href = `https://wa.me/2347079797963?text=${message}`;
  };

  return (
    <div className="text-center animate-in zoom-in-95 duration-700 ease-out">
      {/* Icon Header */}
      <div className="flex justify-center mb-6">
        <div
          className={`p-5 rounded-[2rem] relative shadow-inner transition-colors duration-500 ${
            isNew ? "bg-green-50" : "bg-blue-50"
          }`}
        >
          <CheckCircle2
            className={`${isNew ? "text-green-500" : "text-blue-500"} w-12 h-12`}
          />
          <div className="absolute -top-1 -right-1 bg-white w-6 h-6 rounded-full border-2 border-slate-50 flex items-center justify-center shadow-sm animate-bounce">
            {isNew ? "🎁" : "⭐"}
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
        {greeting}, {firstName}!
      </h2>

      <p className="text-slate-500 mb-8 leading-relaxed text-sm px-2">
        {isNew
          ? "You've officially unlocked MedMate Elite. Your digital wellness journey starts here."
          : "Great to see you again! Your Elite Status is active and ready for today's rewards. Let's make the most of your visit today."}
      </p>

      {/* Dynamic Perks Section */}
      <div className="bg-slate-50/50 p-6 rounded-[2.2rem] mb-8 text-left border border-slate-100 ring-1 ring-inset ring-white/50 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {isNew ? "Member Benefits" : "Elite Member Perks"}
          </p>
          {!isNew && (
            <span className="text-[9px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">
              Level 1 Active
            </span>
          )}
        </div>

        <ul className="space-y-5">
          {/* Perk 1: Rewards (New) vs Refills (Returning) */}
          <li className="flex items-start gap-4">
            <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-50 text-xl shrink-0">
              {isNew ? (
                <Gift className="w-5 h-5 text-pink-500" />
              ) : (
                <BellRing className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">
                {isNew
                  ? "Birthday & Loyalty Rewards"
                  : "Smart Refill Reminders"}
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                {isNew
                  ? "Earn points on every purchase + exclusive annual birthday gifts."
                  : "We'll alert you via WhatsApp 3 days before your medication runs out."}
              </span>
            </div>
          </li>

          {/* Perk 2: AI Assistant (Both, but different flavor) */}
          <li className="flex items-start gap-4">
            <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100 text-xl shrink-0">
              <HeartPulse className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">
                24/7 Health Assistant
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                {isNew
                  ? "Instant answers to dosage and medication safety questions via WhatsApp."
                  : "Priority access to drug-interaction checks and pharmacist support."}
              </span>
            </div>
          </li>

          {/* Perk 3: Content (New) vs History (Returning) */}
          <li className="flex items-start gap-4">
            <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100 text-xl shrink-0">
              {isNew ? (
                <Sparkles className="w-5 h-5 text-amber-500" />
              ) : (
                <History className="w-5 h-5 text-indigo-500" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">
                {isNew ? "Proactive Health Tips" : "Digital Purchase History"}
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                {isNew
                  ? "Weekly nutrition and wellness content curated specifically for your profile."
                  : "Access your verified medication records anytime for doctor consultations."}
              </span>
            </div>
          </li>
        </ul>
      </div>

      {/* Call to Action Section */}
      <div className="space-y-4">
        <Button
          variant={isNew ? "success" : "primary"}
          onClick={handleWhatsAppAction}
          className="w-full py-5 rounded-[1.6rem] shadow-xl transition-all active:scale-[0.98] font-bold text-lg"
        >
          {isNew ? (
            <MessageSquare
              size={20}
              className="fill-current"
            />
          ) : (
            <ShoppingBag size={20} />
          )}
          {isNew ? "Connect & Claim Voucher" : "Check In at Counter"}
        </Button>

        <div className="flex items-center justify-center gap-2">
          <span className="h-1 w-1 bg-slate-300 rounded-full" />
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            {isNew ? "Voucher valid for 24 hours" : "Points updated instantly"}
          </p>
          <span className="h-1 w-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
