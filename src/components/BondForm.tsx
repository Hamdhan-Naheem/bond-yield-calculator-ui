import { useState } from 'react';
import { useBondFormValidation } from './useBondFormValidations';
import type { BondCalculatorInput, CouponFrequency } from '../types/bondTypes';

interface BondFormProps {
  onSubmit: (input: BondCalculatorInput) => void;
  loading?: boolean;
}

export function BondForm({ onSubmit, loading }: BondFormProps) {
  const [faceValue, setFaceValue] = useState('1000');
  const [annualCouponRate, setAnnualCouponRate] = useState('5');
  const [marketPrice, setMarketPrice] = useState('950');
  const [yearsToMaturity, setYearsToMaturity] = useState('5');
  const [couponFrequency, setCouponFrequency] =
    useState<CouponFrequency>('ANNUAL');

  const { clearFieldError, errors, validateAll, validateField } = useBondFormValidation();


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const isValid = validateAll({
      faceValue,
      annualCouponRate,
      marketPrice,
      yearsToMaturity,
    });

    if (!isValid) {
      return;
    }


    const parsed: BondCalculatorInput = {
      faceValue: Number(faceValue),
      annualCouponRate: Number(annualCouponRate),
      marketPrice: Number(marketPrice),
      yearsToMaturity: Number(yearsToMaturity),
      couponFrequency,
    };

    onSubmit(parsed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        Bond Parameters
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-700">
            Face Value
          </label>
          <input
            type="number"
            min={0}
            value={faceValue}
            onChange={(e) => {
              setFaceValue(e.target.value);
              if (errors.faceValue) {
                clearFieldError('faceValue');
              }
            }}
            onBlur={(e) =>
              validateField('faceValue', e.target.value, { min: 0 })
            }
            className={`rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
              errors.faceValue ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.faceValue && (
            <p className="mt-1 text-xs text-red-600">{errors.faceValue}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-700">
            Annual Coupon Rate (%)
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={annualCouponRate}
            onChange={(e) => {
              setAnnualCouponRate(e.target.value);
              if (errors.annualCouponRate) {
                clearFieldError('annualCouponRate');
              }
            }}
            onBlur={(e) =>
              validateField('annualCouponRate', e.target.value, {
                min: 0,
                allowZero: true,
              })
            }
            className={`rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
              errors.annualCouponRate ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.annualCouponRate && (
            <p className="mt-1 text-xs text-red-600">
              {errors.annualCouponRate}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-700">
            Market Price
          </label>
          <input
            type="number"
            min={0}
            value={marketPrice}
            onChange={(e) => {
              setMarketPrice(e.target.value);
              if (errors.marketPrice) {
                clearFieldError('marketPrice');
              }
            }}
            onBlur={(e) =>
              validateField('marketPrice', e.target.value, { min: 0 })
            }
            className={`rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
              errors.marketPrice ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.marketPrice && (
            <p className="mt-1 text-xs text-red-600">{errors.marketPrice}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-700">
            Years to Maturity
          </label>
          <input
            type="number"
            min={0}
            step="0.25"
            value={yearsToMaturity}
            onChange={(e) => {
              setYearsToMaturity(e.target.value);
              if (errors.yearsToMaturity) {
                clearFieldError('yearsToMaturity');
              }
            }}
            onBlur={(e) =>
              validateField('yearsToMaturity', e.target.value, { min: 0 })
            }
            className={`rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
              errors.yearsToMaturity ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.yearsToMaturity && (
            <p className="mt-1 text-xs text-red-600">
              {errors.yearsToMaturity}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-slate-700">
            Coupon Frequency
          </label>
          <select
            value={couponFrequency}
            onChange={(e) =>
              setCouponFrequency(e.target.value as CouponFrequency)
            }
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="ANNUAL">Annual</option>
            <option value="SEMI_ANNUAL">Semi-Annual</option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </div>
    </form>
  );
}

