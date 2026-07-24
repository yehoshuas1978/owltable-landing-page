export const CATALOG_CONTRACT_VERSION = '1.0';

export const BILLING_PERIODS = ['MONTHLY', 'YEARLY', 'ONE_TIME'] as const;

export type BillingPeriod = (typeof BILLING_PERIODS)[number];

export const PRODUCT_CODES = [
  'owltable',
  'owlmask-sdk',
  'owlmask-llm',
  'owlmask-code',
  'owlmask-complete',
] as const;

export type ProductCode = (typeof PRODUCT_CODES)[number];

export interface CatalogPlanDto {
  code: string;
  name: string;
  priceMonthlyCents: number | null;
  billingPeriod: BillingPeriod;
  trialDays: number | null;
  features: Record<string, unknown>;
  limits: Record<string, unknown>;
}

export interface CatalogProductDto {
  code: string;
  name: string;
  description: string | null;
  bundleOf: string[] | null;
  plans: CatalogPlanDto[];
}

export interface CatalogResponseDto {
  contractVersion: string;
  products: CatalogProductDto[];
}

export interface CatalogProduct {
  code: ProductCode;
  name: string;
  description: string;
  priceMonthlyCents: number;
  billingPeriod: BillingPeriod;
  trialDays: number;
}

// Keep this deployment-safe fallback in lockstep with the portal's
// V2__seed_catalog.sql. A valid live response replaces all five entries.
export const FALLBACK_CATALOG: readonly CatalogProduct[] = [
  {
    code: 'owltable',
    name: 'OwlTable Data Provisioning Platform',
    description: 'The operational home for data teams: plan Jobs, assess readiness, provision targets, mask sensitive values, subset relational data, and review validation evidence.',
    priceMonthlyCents: 49900,
    billingPeriod: 'YEARLY',
    trialDays: 30,
  },
  {
    code: 'owlmask-sdk',
    name: 'OwlMask SDK',
    description: 'Embeddable data-masking capabilities for teams that want to put privacy controls directly into their own services and pipelines.',
    priceMonthlyCents: 4900,
    billingPeriod: 'YEARLY',
    trialDays: 30,
  },
  {
    code: 'owlmask-llm',
    name: 'OwlMask LLM',
    description: 'Core masking tools with local generative capabilities for sensitive, unstructured free-text data.',
    priceMonthlyCents: 9900,
    billingPeriod: 'YEARLY',
    trialDays: 30,
  },
  {
    code: 'owlmask-code',
    name: 'OwlMask Code',
    description: 'Automation to inspect schemas, identify sensitive-data candidates, and accelerate masking configuration work.',
    priceMonthlyCents: 14900,
    billingPeriod: 'YEARLY',
    trialDays: 30,
  },
  {
    code: 'owlmask-complete',
    name: 'OwlMask Complete Suite',
    description: 'OwlTable for data operations, plus the headless SDKs, local AI masking capabilities, and engineering automation tools in the broader OwlMask ecosystem.',
    priceMonthlyCents: 64900,
    billingPeriod: 'YEARLY',
    trialDays: 30,
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNullableInteger(value: unknown): value is number | null {
  return value === null || (Number.isInteger(value) && (value as number) >= 0);
}

export function isBillingPeriod(value: unknown): value is BillingPeriod {
  return value === 'MONTHLY' || value === 'YEARLY' || value === 'ONE_TIME';
}

function isCatalogPlan(value: unknown): value is CatalogPlanDto {
  if (!isRecord(value)) return false;

  return typeof value.code === 'string'
    && typeof value.name === 'string'
    && isNullableInteger(value.priceMonthlyCents)
    && isBillingPeriod(value.billingPeriod)
    && isNullableInteger(value.trialDays)
    && isRecord(value.features)
    && isRecord(value.limits);
}

function isCatalogProduct(value: unknown): value is CatalogProductDto {
  if (!isRecord(value)) return false;

  return typeof value.code === 'string'
    && typeof value.name === 'string'
    && (typeof value.description === 'string' || value.description === null)
    && (value.bundleOf === null
      || (Array.isArray(value.bundleOf) && value.bundleOf.every((code) => typeof code === 'string')))
    && Array.isArray(value.plans)
    && value.plans.every(isCatalogPlan);
}

export function parseCatalogResponse(value: unknown): CatalogResponseDto | null {
  if (!isRecord(value)
    || value.contractVersion !== CATALOG_CONTRACT_VERSION
    || !Array.isArray(value.products)
    || !value.products.every(isCatalogProduct)) {
    return null;
  }

  return {
    contractVersion: value.contractVersion,
    products: value.products,
  };
}

export function mapCatalogResponse(value: unknown): CatalogProduct[] | null {
  const response = parseCatalogResponse(value);
  if (!response) return null;

  const mapped: CatalogProduct[] = [];
  for (const code of PRODUCT_CODES) {
    const matches = response.products.filter((product) => product.code === code);
    if (matches.length !== 1) return null;

    const product = matches[0];
    const standardPlans = product.plans.filter((plan) => plan.code === 'standard');
    const trialPlans = product.plans.filter((plan) => plan.code === 'trial');
    if (standardPlans.length !== 1 || trialPlans.length !== 1) return null;

    const standard = standardPlans[0];
    const trial = trialPlans[0];
    if (!product.name.trim()
      || !product.description?.trim()
      || standard.priceMonthlyCents === null
      || standard.billingPeriod !== 'YEARLY'
      || standard.trialDays !== null
      || trial.priceMonthlyCents !== null
      || trial.billingPeriod !== 'ONE_TIME'
      || trial.trialDays === null) {
      return null;
    }

    mapped.push({
      code,
      name: product.name,
      description: product.description,
      priceMonthlyCents: standard.priceMonthlyCents,
      billingPeriod: standard.billingPeriod,
      trialDays: trial.trialDays,
    });
  }

  return mapped;
}

export function resolveCatalog(value: unknown): readonly CatalogProduct[] {
  return mapCatalogResponse(value) ?? FALLBACK_CATALOG;
}

export function getCatalogProduct(
  catalog: readonly CatalogProduct[],
  code: ProductCode,
): CatalogProduct {
  const product = catalog.find((candidate) => candidate.code === code);
  if (!product) throw new Error(`Catalog product ${code} is missing`);
  return product;
}

export function formatMonthlyPrice(priceMonthlyCents: number): string {
  const dollars = priceMonthlyCents / 100;
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`;
}

function unsupportedBillingPeriod(billingPeriod: never): never {
  throw new Error(`Unsupported billing period: ${String(billingPeriod)}`);
}

export function formatPricePeriod(billingPeriod: BillingPeriod): string {
  switch (billingPeriod) {
    case 'YEARLY':
      return '/ month equivalent';
    case 'MONTHLY':
      return '/ month';
    case 'ONE_TIME':
      return '';
    default:
      return unsupportedBillingPeriod(billingPeriod);
  }
}

export function formatBillingTerms(billingPeriod: BillingPeriod): string {
  switch (billingPeriod) {
    case 'YEARLY':
      return 'Billed annually per installation';
    case 'MONTHLY':
      return 'Billed monthly per installation';
    case 'ONE_TIME':
      return 'One-time price per installation';
    default:
      return unsupportedBillingPeriod(billingPeriod);
  }
}

export function formatCatalogTerms(product: CatalogProduct): string {
  const price = formatMonthlyPrice(product.priceMonthlyCents);
  switch (product.billingPeriod) {
    case 'YEARLY':
      return `${price}/month equivalent, billed annually per installation`;
    case 'MONTHLY':
      return `${price}/month, billed monthly per installation`;
    case 'ONE_TIME':
      return `${price}, one-time per installation`;
    default:
      return unsupportedBillingPeriod(product.billingPeriod);
  }
}

export function normalizePortalOrigin(value: string | undefined): string | null {
  if (!value?.trim()) return null;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return url.origin;
  } catch {
    return null;
  }
}
