import { useState } from 'react';

type ErrorState = {
  faceValue?: string;
  annualCouponRate?: string;
  marketPrice?: string;
  yearsToMaturity?: string;
};

type ValidateOptions = { min?: number; allowZero?: boolean };

const validateNumberField = (
  raw: string,
  options: ValidateOptions = {},
): string | undefined => {
  const trimmed = raw.trim();
  if (!trimmed) return 'This field is required';

  const value = Number(trimmed);
  if (Number.isNaN(value)) return 'Please enter a valid number';

  const min = options.min ?? 0;
  const allowZero = options.allowZero ?? false;

  if (!allowZero && value <= min) return `Value must be greater than ${min}`;
  if (allowZero && value < min) return `Value must be at least ${min}`;

  return undefined;
};

export function useBondFormValidation() {
  const [errors, setErrors] = useState<ErrorState>({});

  const validateAll = (values: {
    faceValue: string;
    annualCouponRate: string;
    marketPrice: string;
    yearsToMaturity: string;
  }) => {
    const nextErrors: ErrorState = {
      faceValue: validateNumberField(values.faceValue, { min: 0 }),
      annualCouponRate: validateNumberField(values.annualCouponRate, {
        min: 0,
        allowZero: true,
      }),
      marketPrice: validateNumberField(values.marketPrice, { min: 0 }),
      yearsToMaturity: validateNumberField(values.yearsToMaturity, { min: 0 }),
    };

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const validateField = (
    key: keyof ErrorState,
    raw: string,
    options: ValidateOptions,
  ) => {
    const message = validateNumberField(raw, options);
    setErrors((prev) => ({ ...prev, [key]: message }));
  };

  const clearFieldError = (key: keyof ErrorState) => {
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return { errors, validateAll, validateField, clearFieldError };
}