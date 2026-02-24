Frontend (UI) – key points
Stack: React + TypeScript + Vite + Tailwind; lives in bond-yield-calculator-ui.
Setup:
npm install
.env.local → VITE_API_BASE_URL=http://localhost:3000
npm run dev → open http://localhost:5173
Core pieces:
App.tsx: owns state (summary, cashFlows, loading, error) and glues everything together.
BondForm.tsx + useBondFormValidation: handle user input and all form validation.
bondCalculatorApi.ts: sends POST /bonds/yield to the backend and returns typed results.
BondSummary.tsx + CashFlowTable.tsx: purely presentational, show summary metrics and detailed schedule.