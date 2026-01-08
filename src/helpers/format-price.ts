/**
 * Currency type definition
 */
export type CurrencyCode = "USD" | "EUR" | "COP" | "MXN";

/**
 * Currency configuration
 */
interface CurrencyConfig {
  symbol: string;
  code: string;
  locale: string;
  position: "before" | "after";
}

const currencyConfigs: Record<CurrencyCode, CurrencyConfig> = {
  USD: { symbol: "$", code: "USD", locale: "en-US", position: "before" },
  EUR: { symbol: "€", code: "EUR", locale: "es-ES", position: "after" },
  COP: { symbol: "$", code: "COP", locale: "es-CO", position: "before" },
  MXN: { symbol: "$", code: "MXN", locale: "es-MX", position: "before" },
};

/**
 * Default currency for the application
 */
export const DEFAULT_CURRENCY: CurrencyCode = "USD";

/**
 * Format a price with currency symbol
 * @param price - The price value to format
 * @param currency - The currency code (default: USD)
 * @param showCurrencyCode - Whether to show the currency code after the amount
 * @returns Formatted price string
 */
export function formatPrice(
  price: number,
  currency: CurrencyCode = DEFAULT_CURRENCY,
  showCurrencyCode: boolean = false
): string {
  const config = currencyConfigs[currency];

  const formattedNumber = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  let result: string;
  if (config.position === "before") {
    result = `${config.symbol}${formattedNumber}`;
  } else {
    result = `${formattedNumber} ${config.symbol}`;
  }

  if (showCurrencyCode) {
    result += ` ${config.code}`;
  }

  return result;
}

/**
 * Format a price range
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @param currency - The currency code
 * @returns Formatted price range string
 */
export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  currency: CurrencyCode = DEFAULT_CURRENCY
): string {
  return `${formatPrice(minPrice, currency)} - ${formatPrice(maxPrice, currency)}`;
}
