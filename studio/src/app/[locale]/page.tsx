import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import { getMessagesForLocale, type Locale } from '@/lib/messages';

export const revalidate = 3600; // Revalidate data at most once per hour

export default async function HomePage({params}: {params: {locale: string}}) {
  const { locale } = params;
  const products: Product[] = await getProducts(locale as Locale);
  const messages = getMessagesForLocale(locale as Locale);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">{messages.Home.allProducts}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
