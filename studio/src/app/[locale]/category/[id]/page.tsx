'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductsByCategory } from '@/lib/data';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import type { Locale } from '@/lib/messages';
import { useI18n } from '@/context/I18nContext';
import { Loader2 } from 'lucide-react';

export default function CategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();
  const params = useParams();
  const id = params.id as string;
  const locale = params.locale as Locale;

  useEffect(() => {
    async function fetchData() {
      if (!id || !locale) return;
      setLoading(true);
      const fetchedProducts = await getProductsByCategory(id, locale);
       if (fetchedProducts.length === 0) {
        // We show a "No products" message instead of 404
        // to handle valid but empty categories.
      }
      setProducts(fetchedProducts);
      setLoading(false);
    }
    fetchData();
  }, [id, locale]);

  const categoryName = products.length > 0 ? products[0].category : id.charAt(0).toUpperCase() + id.slice(1);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-250px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">{t('Category.title', { categoryName })}</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">{t('Category.noProducts')}</h2>
          <p className="mt-2 text-muted-foreground">{t('Category.noProductsDescription')}</p>
        </div>
      )}
    </div>
  );
}
