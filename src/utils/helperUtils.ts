export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && typeof error.message === 'string') {
    return error.message;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  ) {
    return (error as Record<string, unknown>).message as string;
  }

  return 'An unexpected error occurred';
};

export function formatInternationalPhoneNumber(raw: string): string {
  if (!raw) return '';

  // Allow only digits, +, and spaces
  const cleaned = raw
    .replace(/[^\d+\s]/g, '') // keep only +, digits, and spaces
    .replace(/(?!^)\+/g, ''); // remove any extra + beyond the first

  const digitsOnly = cleaned.replace(/[^\d]/g, '');

  // Case 1: Starts with +1 and has exactly 10 digits → US format
  if (/^\+1\d{10}$/.test(cleaned.replace(/\s/g, ''))) {
    const number = digitsOnly.slice(1);
    return `+1 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
  }

  // Case 2: Exactly 10 digits → assume US format
  if (/^\d{10}$/.test(digitsOnly)) {
    return `+1 (${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }

  // Case 3: Starts with + but NOT +1 → return as-is, preserving first space if any
  if (cleaned.startsWith('+')) {
    return cleaned.replace(/\s+/g, ' '); // collapse multiple spaces
  }

  // Fallback: just return digits
  return digitsOnly;
}

export function parsePhoneNumberInput(raw: string): string {
  return raw.replace(/[^\d+\s]/g, '');
}

export function formatDate(value?: string | Date | null): string {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString();
}

export function formatCurrency(value?: number | null): string {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}
