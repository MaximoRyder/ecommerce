import { getProductById, getProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import AddToCart from '@/components/AddToCart';
import { getMessagesForLocale, type Locale } from '@/lib/messages';

export const revalidate = 3600;

export async function generateStaticParams() {
    const products = await getProducts('en'); // Use a default locale to get IDs
    const locales = ['en', 'es', 'pt'];
    const params: { locale: string, id: string }[] = [];
    locales.forEach(locale => {
        products.forEach(product => {
            params.push({ locale, id: product.id });
        });
    });
    return params;
}

export default async function ItemDetailPage({ params }: { params: { id:string, locale: string } }) {
  const { id, locale } = params;
  const product = await getProductById(id, locale as Locale);
  const messages = getMessagesForLocale(locale as Locale);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="aspect-square relative w-full bg-muted/30">
             <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-8"
              data-ai-hint={product.imageHint}
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col h-full">
            <div className="flex-grow">
              <Badge variant="secondary" className="capitalize text-sm">{product.category}</Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mt-2">{product.name}</h1>
              <p className="text-muted-foreground mt-4 text-base">{product.description}</p>
              <div className="mt-6">
                <p className="text-4xl font-bold text-primary">{formatPrice(product.price)}</p>
                <p className={`text-sm mt-1 font-medium ${product.stock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {product.stock > 0 ? messages.Product.available.replace('{stock}', product.stock.toString()) : messages.Product.outOfStock}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
