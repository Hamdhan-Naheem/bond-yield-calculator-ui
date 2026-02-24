export type CouponFrequency = 'ANNUAL' | 'SEMI_ANNUAL';

export interface BondCalculatorInput {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: CouponFrequency;
}

export type PriceRelativeToFace = 'DISCOUNT' | 'AT_PAR' | 'PREMIUM';

export interface CashFlowPeriod {
  period: number;
  paymentDate: string;
  couponPayment: number;
  principalPayment: number;
  totalCashFlow: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface BondSummary {
  currentYield: number;
  yieldToMaturity: number;
  totalInterestEarned: number;
  priceRelativeToFace: PriceRelativeToFace;
}

export interface BondYieldResponse {
  inputs: BondCalculatorInput;
  summary: BondSummary;
  cashFlows: CashFlowPeriod[];
}

