export function formatNumber(value: number): string {
  if (isNaN(value) || value === null || value === undefined) {
    return "0.00";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}