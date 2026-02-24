import type { CashFlowPeriod } from '../types/bondTypes';

interface CashFlowTableProps {
  rows: CashFlowPeriod[] | null;
}

function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return '-';
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 2,
  });
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
}

export function CashFlowTable({ rows }: CashFlowTableProps) {
  if (!rows || rows.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="max-h-96 overflow-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Period
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Payment Date
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Coupon
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Principal
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total Cash Flow
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Cumulative Interest
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Remaining Principal
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row) => (
              <tr key={row.period}>
                <td className="whitespace-nowrap px-3 py-2 text-slate-700">
                  {row.period}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-slate-700">
                  {formatDate(row.paymentDate)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-slate-700">
                  {formatCurrency(row.couponPayment)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-slate-700">
                  {formatCurrency(row.principalPayment)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-slate-700">
                  {formatCurrency(row.totalCashFlow)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-slate-700">
                  {formatCurrency(row.cumulativeInterest)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-slate-700">
                  {formatCurrency(row.remainingPrincipal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

