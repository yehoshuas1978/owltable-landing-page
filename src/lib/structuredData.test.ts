import { describe, expect, it } from 'vitest';
import { FALLBACK_CATALOG, type CatalogProduct } from './catalog';
import { buildProductJsonLd } from './structuredData';

function offerFor(product: CatalogProduct): Record<string, unknown> {
  const [data] = buildProductJsonLd([product]);
  return data.offers as Record<string, unknown>;
}

describe('product JSON-LD', () => {
  it('publishes qualified annual per-installation offers for the canonical catalog', () => {
    const products = buildProductJsonLd();

    expect(products).toHaveLength(5);
    products.forEach((data, index) => {
      const product = FALLBACK_CATALOG[index];
      const offer = data.offers as Record<string, unknown>;
      const specification = offer.priceSpecification as Record<string, unknown>;

      expect(data.name).toBe(product.name);
      expect(data.description).toBe(product.description);
      expect(offer.price).toBe(((product.priceMonthlyCents * 12) / 100).toFixed(2));
      expect(offer.priceCurrency).toBe('USD');
      expect(offer.description).toContain(`${product.trialDays}-day trial`);
      expect(specification).toMatchObject({
        '@type': 'UnitPriceSpecification',
        price: ((product.priceMonthlyCents * 12) / 100).toFixed(2),
        priceCurrency: 'USD',
        billingDuration: 'P1Y',
        billingIncrement: 1,
        unitText: 'installation-year',
      });
      expect(specification.description).toBe(
        `$${product.priceMonthlyCents / 100}/month equivalent, billed annually per installation`,
      );
    });
  });

  it('does not annualize a supported monthly offer', () => {
    const offer = offerFor({
      ...FALLBACK_CATALOG[0],
      priceMonthlyCents: 12345,
      billingPeriod: 'MONTHLY',
    });

    expect(offer.price).toBe('123.45');
    expect(offer.priceSpecification).toMatchObject({
      price: '123.45',
      billingDuration: 'P1M',
      billingIncrement: 1,
      unitText: 'installation-month',
      description: '$123.45/month, billed monthly per installation',
    });
  });

  it('does not annualize or add a recurring duration to a one-time offer', () => {
    const offer = offerFor({
      ...FALLBACK_CATALOG[0],
      priceMonthlyCents: 12345,
      billingPeriod: 'ONE_TIME',
    });
    const specification = offer.priceSpecification as Record<string, unknown>;

    expect(offer.price).toBe('123.45');
    expect(specification).toMatchObject({
      price: '123.45',
      billingIncrement: 1,
      unitText: 'installation',
      description: '$123.45, one-time per installation',
    });
    expect(specification).not.toHaveProperty('billingDuration');
  });

  it('rejects an unsupported period at runtime instead of annualizing it', () => {
    const malformedProduct = {
      ...FALLBACK_CATALOG[0],
      billingPeriod: 'WEEKLY',
    } as unknown as CatalogProduct;

    expect(() => buildProductJsonLd([malformedProduct]))
      .toThrow('Unsupported billing period: WEEKLY');
  });
});
