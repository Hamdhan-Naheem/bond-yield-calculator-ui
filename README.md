Frontend (UI) – Key Points

Stack: React + TypeScript + Vite + Tailwind
Project folder: bond-yield-calculator-ui

Setup
npm install

Create .env.local:

VITE_API_BASE_URL=http://localhost:3000

Start development server:

npm run dev

Open in browser: http://localhost:5173

Core Pieces

App.tsx
Owns state (summary, cashFlows, loading, error) and coordinates the app flow.

BondForm.tsx + useBondFormValidation
Handles user input and performs form validation.

bondCalculatorApi.ts
Sends POST /bonds/yield to the backend and returns typed results.

BondSummary.tsx + CashFlowTable.tsx
Presentational components: show summary metrics and detailed cash flow schedule.