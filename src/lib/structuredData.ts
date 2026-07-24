import {
  FALLBACK_CATALOG,
  formatCatalogTerms,
  type BillingPeriod,
  type CatalogProduct,
} from './catalog';

const SITE_URL = 'https://www.owltable.net';

function formatUsd(cents: number): string {
  return (cents / 100).toFixed(2);
}

interface OfferSchedule {
  priceCents: number;
  billingDuration?: string;
  unitText: string;
}

function getOfferSchedule(priceMonthlyCents: number, billingPeriod: BillingPeriod): OfferSchedule {
  switch (billingPeriod) {
    case 'YEARLY':
      return {
        priceCents: priceMonthlyCents * 12,
        billingDuration: 'P1Y',
        unitText: 'installation-year',
      };
    case 'MONTHLY':
      return {
        priceCents: priceMonthlyCents,
        billingDuration: 'P1M',
        unitText: 'installation-month',
      };
    case 'ONE_TIME':
      return {
        priceCents: priceMonthlyCents,
        unitText: 'installation',
      };
    default:
      throw new Error(`Unsupported billing period: ${String(billingPeriod)}`);
  }
}

export function buildProductJsonLd(
  catalog: readonly CatalogProduct[] = FALLBACK_CATALOG,
): Record<string, unknown>[] {
  return catalog.map((product) => {
    const schedule = getOfferSchedule(product.priceMonthlyCents, product.billingPeriod);
    const terms = formatCatalogTerms(product);

    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#${product.code}`,
      name: product.name,
      description: product.description,
      url: `${SITE_URL}/#pricing`,
      applicationCategory: product.code === 'owltable'
        ? 'DatabaseApplication'
        : 'DeveloperApplication',
      operatingSystem: 'Linux, Windows, macOS',
      author: {
        '@type': 'Organization',
        name: 'OwlMask',
      },
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/#pricing`,
        price: formatUsd(schedule.priceCents),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitText: 'installation',
        },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: formatUsd(schedule.priceCents),
          priceCurrency: 'USD',
          ...(schedule.billingDuration ? { billingDuration: schedule.billingDuration } : {}),
          billingIncrement: 1,
          unitText: schedule.unitText,
          description: terms,
        },
        description: `${terms}. A ${product.trialDays}-day trial is available.`,
      },
    };
  });
}
