import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getMessagesForLocale, type Locale, type Messages } from '@/lib/messages';

const getProductTranslations = (messages: Messages) => {
  return (id: string) => ({
    name: (messages.Products as any)[id]?.name || id,
    description: (messages.Products as any)[id]?.description || 'No description available.',
    category: (messages.Navbar as any)[id] || id,
  });
}

const getProductData = async (locale: Locale) => {
  const messages = getMessagesForLocale(locale);
  const t = getProductTranslations(messages);
  
  const productsData: Omit<Product, 'imageUrl' | 'imageHint' | 'description' | 'name' | 'category'> & { category: string }[] = [
    { id: 'laptop-pro-x', category: 'electronics', price: 1200, stock: 15 },
    { id: 'smartphone-z', category: 'electronics', price: 850, stock: 25 },
    { id: 'wireless-mouse', category: 'accessories', price: 49.99, stock: 50 },
    { id: 'mechanical-keyboard', category: 'accessories', price: 129.99, stock: 30 },
    { id: 'react-handbook', category: 'books', price: 35.50, stock: 100 },
    { id: 'clean-code', category: 'books', price: 45.00, stock: 80 }
  ];

  return productsData.map(p => {
    const imageData = PlaceHolderImages.find(img => img.id === p.id);
    const translations = t(p.id);
    const categoryTranslation = t(p.category);
    return {
        ...p,
        name: translations.name,
        description: translations.description,
        category: categoryTranslation.category,
        imageUrl: imageData?.imageUrl || 'https://picsum.photos/seed/default/600/400',
        imageHint: imageData?.imageHint || 'product image',
    }
  });
}

// Simulate Firestore API
export const getProducts = async (locale: Locale): Promise<Product[]> => {
  const products = await getProductData(locale);
  return new Promise(resolve => setTimeout(() => resolve(products), 200));
};

export const getProductById = async (id: string, locale: Locale): Promise<Product | undefined> => {
  const products = await getProductData(locale);
  return new Promise(resolve =>
    setTimeout(() => resolve(products.find(p => p.id === id)), 200)
  );
};

export const getProductsByCategory = async (category: string, locale: Locale): Promise<Product[]> => {
  const products = await getProductData(locale);
  const messages = getMessagesForLocale(locale);
  const translatedCategories = {
    electronics: messages.Navbar.electronics,
    accessories: messages.Navbar.accessories,
    books: messages.Navbar.books,
  };
  const internalCategory = Object.keys(translatedCategories).find(key => (translatedCategories as any)[key].toLowerCase() === category.toLowerCase());
  const finalCategory = internalCategory || category;

  const categoryName = (messages.Navbar as any)[finalCategory] || finalCategory;

  return new Promise(resolve =>
    setTimeout(() => resolve(products.filter(p => p.category === categoryName)), 200)
  );
};

export const getCategories = async (): Promise<string[]> => {
    return new Promise(resolve => setTimeout(() => resolve(['electronics', 'accessories', 'books']), 100));
}
