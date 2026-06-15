import type { BondSummary } from '../types/bondTypes';

interface BondSummaryProps {
  summary: BondSummary | null;
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '-';
  return `${(value * 100).toFixed(2)}%`;
}

function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return '-';
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 2,
  });
}

export function BondSummaryView({ summary }: BondSummaryProps) {
  if (!summary) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500">
        Enter bond parameters and click Calculate to see results
      </div>
    );
  }

  const badgeColor =
    summary.priceRelativeToFace === 'PREMIUM'
      ? 'bg-red-100 text-red-700'
      : summary.priceRelativeToFace === 'DISCOUNT'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-slate-100 text-slate-700';

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Current Yield
        </p>
        <p className="mt-2 text-xl font-semibold text-slate-900">
          {formatPercent(summary.currentYield)}
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Yield to Maturity
        </p>
        <p className="mt-2 text-xl font-semibold text-slate-900">
          {formatPercent(summary.yieldToMaturity)}
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Total Interest Earned
        </p>
        <p className="mt-2 text-xl font-semibold text-slate-900">
          {formatCurrency(summary.totalInterestEarned)}
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Price vs Face
        </p>
        <span
          className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badgeColor}`}
        >
          {summary.priceRelativeToFace}
        </span>
      </div>
    </div>
  );
}

