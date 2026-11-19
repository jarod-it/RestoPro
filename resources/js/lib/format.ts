const HOURLY_RATE = new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

/**
 * Formats an hourly rate as a dollar amount, for example 21,25 $.
 */
export function formatHourlyRate(value: number): string {
    return HOURLY_RATE.format(value);
}
