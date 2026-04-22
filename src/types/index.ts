// src/types/index.ts

/**
 * Valid statuses for a MedMate privilege/voucher
 */
export type PrivilegeStatus = "UNUSED" | "USED" | "EXPIRED";

export interface Patient {
  name: string;
  phone: string;
  dob: string;
  consent: boolean;
  registrationDate?: string;
}

export interface MedMatePrivilege {
  id: string;
  code: string;
  benefitType: string;
  status: PrivilegeStatus; // Now correctly defined above
  patientName: string;
  expiryDate?: string;
}

export interface TerminalAuthResponse {
  authorized: boolean;
  staffName?: string;
}

export interface LoyaltyCheckResponse {
  exists: boolean;
  name?: string;
  tier?: "Silver" | "Gold" | "Platinum";
}

export interface StepOneProps {
  onRegistered: (data: { greeting?: string; firstName?: string }) => void;
  onNotRegistered: (phone: string) => void;
}

export interface StepTwoProps {
  phone: string;
  onComplete: (data: {
    greeting?: string;
    firstName?: string;
    fullName?: string;
  }) => void;
}

export interface ApiError {
  message: string;
  status?: number;
}
