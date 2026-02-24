import { useState } from "react";
import { BondForm } from "./components/BondForm";
import { BondSummaryView } from "./components/BondSummary";
import { CashFlowTable } from "./components/CashFlowTable";
import type {
  BondSummary,
  CashFlowPeriod,
  BondCalculatorInput,
} from "./types/bondTypes";
import { calculateBondYield } from "./api/bondCalculatorApi";

function App() {
  const [summary, setSummary] = useState<BondSummary | null>(null);
  const [cashFlows, setCashFlows] = useState<CashFlowPeriod[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (input: BondCalculatorInput) => {
    setLoading(true);
    setError(null);
    try {
      const result = await calculateBondYield(input);
      setSummary(result.summary);
      setCashFlows(result.cashFlows);
    } catch (e) {
      setError(`${e} Failed to calculate bond yield. Please try again.`);
      setSummary(null);
      setCashFlows(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Bond Yield Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter bond parameters to calculate current yield, yield to maturity,
            and view the full cash flow schedule.
          </p>
        </header>

        <main className="space-y-8">
          <BondForm onSubmit={handleCalculate} loading={loading} />

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Results Summary
            </h2>
            <BondSummaryView summary={summary} />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Cash Flow Schedule
            </h2>
            <CashFlowTable rows={cashFlows} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
