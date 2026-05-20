import fixedFees2026 from '../data/registrationFees2026.json';
import regionalCvRates2026 from '../data/regionalCvRates2026.json';

type RatePeriod = {
  from: string;
  rate: number;
};

type RegionRateEntry = {
  region: string;
  periods: RatePeriod[];
};

type SourceMetadata = {
  sourceName: string;
  sourceUrl: string;
  lastChecked: string;
  year: number;
};

type RegionalRateSource = SourceMetadata & {
  rates: RegionRateEntry[];
};

type FixedFeeSource = SourceMetadata & {
  fees: {
    managementFee: number;
    deliveryFee: number;
  };
};

export type VehicleCostInput = {
  calculationDate: string;
  firstRegistrationDate?: string | null;
  powerKw?: number | null;
  co2GramsPerKm?: number | null;
  mileageKm?: number | null;
  region?: string | null;
  hasValidControleTechnique?: boolean | null;
};

export type VehicleCostEstimate = {
  fiscalHorsepower: number | null;
  selectedRegionLabel: string | null;
  regionalCvRate: number | null;
  regionalTax: number | null;
  fixedManagementFee: number;
  deliveryFee: number;
  knownTotal: number;
  warnings: string[];
  sources: {
    regionalRates: SourceMetadata;
    fixedFees: SourceMetadata;
  };
};

const regionalRatesSource = regionalCvRates2026 as RegionalRateSource;
const fixedFeesSource = fixedFees2026 as FixedFeeSource;

function normalizeRegionName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/gi, '')
    .toLowerCase();
}

function toDate(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function addMonths(date: Date, months: number) {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + months);
  return copy;
}

function differenceInYears(later: Date, earlier: Date) {
  let years = later.getFullYear() - earlier.getFullYear();
  const monthDelta = later.getMonth() - earlier.getMonth();

  if (monthDelta < 0 || (monthDelta === 0 && later.getDate() < earlier.getDate())) {
    years -= 1;
  }

  return years;
}

function getRegionEntry(region: string | null | undefined) {
  if (!region) {
    return null;
  }

  const normalizedInput = normalizeRegionName(region);

  return (
    regionalRatesSource.rates.find(
      (entry) => normalizeRegionName(entry.region) === normalizedInput
    ) ?? null
  );
}

function getRateForDate(periods: RatePeriod[], calculationDate: Date) {
  const applicable = periods
    .filter((period) => {
      const start = toDate(period.from);
      return start ? start.getTime() <= calculationDate.getTime() : false;
    })
    .sort((a, b) => a.from.localeCompare(b.from));

  return applicable.length > 0 ? applicable[applicable.length - 1].rate : null;
}

export function getSupportedRegions() {
  return regionalRatesSource.rates.map((entry) => entry.region);
}

export function calculateFiscalHorsepower({
  powerKw,
  co2GramsPerKm
}: Pick<VehicleCostInput, 'powerKw' | 'co2GramsPerKm'>) {
  if (
    powerKw === null ||
    powerKw === undefined ||
    co2GramsPerKm === null ||
    co2GramsPerKm === undefined
  ) {
    return null;
  }

  if (powerKw <= 0 || co2GramsPerKm < 0) {
    return null;
  }

  const rawValue = co2GramsPerKm / 45 + Math.pow(powerKw / 40, 1.6);
  return Math.floor(rawValue);
}

export function calculateVehicleCosts(input: VehicleCostInput): VehicleCostEstimate {
  const calculationDate = toDate(input.calculationDate) ?? new Date();
  const firstRegistrationDate = toDate(input.firstRegistrationDate);
  const fiscalHorsepower = calculateFiscalHorsepower(input);
  const regionEntry = getRegionEntry(input.region);
  const trimmedRegion = input.region?.trim() ?? '';
  const regionalCvRate = regionEntry
    ? getRateForDate(regionEntry.periods, calculationDate)
    : null;
  const regionalTax =
    fiscalHorsepower !== null && regionalCvRate !== null
      ? Number((fiscalHorsepower * regionalCvRate).toFixed(2))
      : null;

  const warnings: string[] = [];

  if (
    firstRegistrationDate &&
    (addMonths(firstRegistrationDate, 6).getTime() > calculationDate.getTime() ||
      (input.mileageKm !== null &&
        input.mileageKm !== undefined &&
        input.mileageKm < 6000))
  ) {
    warnings.push(
      'Mogelijk btw-aandachtspunt: voertuigen jonger dan 6 maanden of met minder dan 6.000 km kunnen in Frankrijk nog als nieuw worden behandeld.'
    );
  }

  if (
    firstRegistrationDate &&
    differenceInYears(calculationDate, firstRegistrationDate) >= 4 &&
    input.hasValidControleTechnique !== true
  ) {
    warnings.push(
      'Controleer de contrôle technique: bij voertuigen van 4 jaar of ouder is voor de aanvraag meestal een geldige keuring nodig.'
    );
  }

  const fixedManagementFee = fixedFeesSource.fees.managementFee;
  const deliveryFee = fixedFeesSource.fees.deliveryFee;
  const knownTotal = Number(
    (
      fixedManagementFee +
      deliveryFee +
      (regionalTax ?? 0)
    ).toFixed(2)
  );

  return {
    fiscalHorsepower,
    selectedRegionLabel: regionEntry?.region ?? (trimmedRegion === '' ? null : trimmedRegion),
    regionalCvRate,
    regionalTax,
    fixedManagementFee,
    deliveryFee,
    knownTotal,
    warnings,
    sources: {
      regionalRates: {
        sourceName: regionalRatesSource.sourceName,
        sourceUrl: regionalRatesSource.sourceUrl,
        lastChecked: regionalRatesSource.lastChecked,
        year: regionalRatesSource.year
      },
      fixedFees: {
        sourceName: fixedFeesSource.sourceName,
        sourceUrl: fixedFeesSource.sourceUrl,
        lastChecked: fixedFeesSource.lastChecked,
        year: fixedFeesSource.year
      }
    }
  };
}
