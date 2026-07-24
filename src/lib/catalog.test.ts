import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  FALLBACK_CATALOG,
  mapCatalogResponse,
  normalizePortalOrigin,
  parseCatalogResponse,
  resolveCatalog,
  type CatalogResponseDto,
} from './catalog';

const PORTAL_FIXTURE_URL = new URL(
  './fixtures/portal-catalog-v1.0-04542061.json',
  import.meta.url,
);

function loadPortalFixture(): unknown {
  return JSON.parse(readFileSync(PORTAL_FIXTURE_URL, 'utf8'));
}

function parsedPortalFixture(): CatalogResponseDto {
  const parsed = parseCatalogResponse(loadPortalFixture());
  if (!parsed) throw new Error('The pinned portal catalog fixture is invalid');
  return parsed;
}

function replacePlan(
  productCode: string,
  planCode: string,
  overrides: Record<string, unknown>,
): unknown {
  const response = parsedPortalFixture();
  return {
    ...response,
    products: response.products.map((product) => product.code === productCode
      ? {
          ...product,
          plans: product.plans.map((plan) => plan.code === planCode
            ? { ...plan, ...overrides }
            : plan),
        }
      : product),
  };
}

describe('catalog contract', () => {
  it('runtime parses the pinned portal v1.0 five-product response', () => {
    const response = parsedPortalFixture();

    expect(response.contractVersion).toBe('1.0');
    expect(response.products.map((product) => [
      product.code,
      product.name,
      product.description,
    ])).toEqual([
      [
        'owltable',
        'OwlTable Data Provisioning Platform',
        'The operational home for data teams: plan Jobs, assess readiness, provision targets, mask sensitive values, subset relational data, and review validation evidence.',
      ],
      [
        'owlmask-sdk',
        'OwlMask SDK',
        'Embeddable data-masking capabilities for teams that want to put privacy controls directly into their own services and pipelines.',
      ],
      [
        'owlmask-llm',
        'OwlMask LLM',
        'Core masking tools with local generative capabilities for sensitive, unstructured free-text data.',
      ],
      [
        'owlmask-code',
        'OwlMask Code',
        'Automation to inspect schemas, identify sensitive-data candidates, and accelerate masking configuration work.',
      ],
      [
        'owlmask-complete',
        'OwlMask Complete Suite',
        'OwlTable for data operations, plus the headless SDKs, local AI masking capabilities, and engineering automation tools in the broader OwlMask ecosystem.',
      ],
    ]);
    expect(response.products.map((product) => [product.code, product.bundleOf])).toEqual([
      ['owltable', null],
      ['owlmask-sdk', null],
      ['owlmask-llm', null],
      ['owlmask-code', null],
      ['owlmask-complete', ['owltable', 'owlmask-sdk', 'owlmask-llm', 'owlmask-code']],
    ]);
  });

  it('pins every price, billing period, and 30-day trial from the portal response', () => {
    const response = parsedPortalFixture();

    expect(response.products.map((product) => ({
      code: product.code,
      plans: product.plans.map((plan) => ({
        code: plan.code,
        name: plan.name,
        priceMonthlyCents: plan.priceMonthlyCents,
        billingPeriod: plan.billingPeriod,
        trialDays: plan.trialDays,
      })),
    }))).toEqual([
      {
        code: 'owltable',
        plans: [
          { code: 'trial', name: 'Trial', priceMonthlyCents: null, billingPeriod: 'ONE_TIME', trialDays: 30 },
          { code: 'standard', name: 'Standard', priceMonthlyCents: 49900, billingPeriod: 'YEARLY', trialDays: null },
        ],
      },
      {
        code: 'owlmask-sdk',
        plans: [
          { code: 'trial', name: 'Trial', priceMonthlyCents: null, billingPeriod: 'ONE_TIME', trialDays: 30 },
          { code: 'standard', name: 'Standard', priceMonthlyCents: 4900, billingPeriod: 'YEARLY', trialDays: null },
        ],
      },
      {
        code: 'owlmask-llm',
        plans: [
          { code: 'trial', name: 'Trial', priceMonthlyCents: null, billingPeriod: 'ONE_TIME', trialDays: 30 },
          { code: 'standard', name: 'Standard', priceMonthlyCents: 9900, billingPeriod: 'YEARLY', trialDays: null },
        ],
      },
      {
        code: 'owlmask-code',
        plans: [
          { code: 'trial', name: 'Trial', priceMonthlyCents: null, billingPeriod: 'ONE_TIME', trialDays: 30 },
          { code: 'standard', name: 'Standard', priceMonthlyCents: 14900, billingPeriod: 'YEARLY', trialDays: null },
        ],
      },
      {
        code: 'owlmask-complete',
        plans: [
          { code: 'trial', name: 'Trial', priceMonthlyCents: null, billingPeriod: 'ONE_TIME', trialDays: 30 },
          { code: 'standard', name: 'Standard', priceMonthlyCents: 64900, billingPeriod: 'YEARLY', trialDays: null },
        ],
      },
    ]);
  });

  it('pins every plan feature and limit from the portal response', () => {
    const response = parsedPortalFixture();

    expect(response.products.map((product) => ({
      code: product.code,
      features: Object.fromEntries(product.plans.map((plan) => [plan.code, plan.features])),
      limits: Object.fromEntries(product.plans.map((plan) => [plan.code, plan.limits])),
    }))).toEqual([
      {
        code: 'owltable',
        features: {
          trial: { engines: ['postgresql', 'mysql', 'sqlserver'], scheduling: true, validation_evidence: true },
          standard: { engines: ['postgresql', 'mysql', 'sqlserver'], scheduling: true, validation_evidence: true },
        },
        limits: {
          trial: { seats: 10, installations: 1, max_source_connections: 5 },
          standard: { seats: 10, installations: 1, max_source_connections: 5 },
        },
      },
      {
        code: 'owlmask-sdk',
        features: {
          trial: { algorithm_packs: 'all', pdf_redaction: true },
          standard: { algorithm_packs: 'all', pdf_redaction: true },
        },
        limits: { trial: { installations: 1 }, standard: { installations: 1 } },
      },
      {
        code: 'owlmask-llm',
        features: {
          trial: { local_llm_masking: true },
          standard: { local_llm_masking: true },
        },
        limits: { trial: { installations: 1 }, standard: { installations: 1 } },
      },
      {
        code: 'owlmask-code',
        features: {
          trial: { schema_automation: true },
          standard: { schema_automation: true },
        },
        limits: { trial: { installations: 1 }, standard: { installations: 1 } },
      },
      {
        code: 'owlmask-complete',
        features: { trial: {}, standard: {} },
        limits: { trial: { installations: 1 }, standard: { installations: 1 } },
      },
    ]);
  });

  it('keeps the deployment fallback aligned with the independently pinned portal response', () => {
    expect(mapCatalogResponse(loadPortalFixture())).toEqual(FALLBACK_CATALOG);
  });

  it.each([
    ['wrong contract version', { ...parsedPortalFixture(), contractVersion: '2.0' }],
    ['missing product', {
      ...parsedPortalFixture(),
      products: parsedPortalFixture().products.slice(1),
    }],
    ['malformed plan shape', replacePlan('owltable', 'standard', { limits: null })],
    ['unsupported billing period', replacePlan('owltable', 'standard', { billingPeriod: 'WEEKLY' })],
    ['malformed billing period', replacePlan('owltable', 'standard', { billingPeriod: 'yearly' })],
    ['missing standard plan', {
      ...parsedPortalFixture(),
      products: parsedPortalFixture().products.map((product) => product.code === 'owltable'
        ? { ...product, plans: product.plans.filter((plan) => plan.code !== 'standard') }
        : product),
    }],
  ])('uses the complete static fallback for a %s', (_label, response) => {
    expect(resolveCatalog(response)).toBe(FALLBACK_CATALOG);
  });

  it.each(['MONTHLY', 'ONE_TIME'])('rejects a supported but non-yearly canonical standard plan (%s)', (billingPeriod) => {
    const response = replacePlan('owltable', 'standard', { billingPeriod });

    expect(parseCatalogResponse(response)).not.toBeNull();
    expect(resolveCatalog(response)).toBe(FALLBACK_CATALOG);
  });

  it('rejects a supported but non-one-time canonical trial plan', () => {
    const response = replacePlan('owltable', 'trial', { billingPeriod: 'MONTHLY' });

    expect(parseCatalogResponse(response)).not.toBeNull();
    expect(resolveCatalog(response)).toBe(FALLBACK_CATALOG);
  });
});

describe('portal origin', () => {
  it('normalizes whitespace, paths, and trailing slashes to an origin', () => {
    expect(normalizePortalOrigin('  https://portal.example.com/some/path/  '))
      .toBe('https://portal.example.com');
    expect(normalizePortalOrigin('http://localhost:9080/')).toBe('http://localhost:9080');
  });

  it('rejects missing, malformed, and non-http URLs', () => {
    expect(normalizePortalOrigin(undefined)).toBeNull();
    expect(normalizePortalOrigin('not a URL')).toBeNull();
    expect(normalizePortalOrigin('file:///tmp/portal')).toBeNull();
  });
});
