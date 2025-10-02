
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import { I18nProvider } from '@/context/I18nContext';
import { Locale, getMessagesForLocale } from '@/lib/messages';

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = getMessagesForLocale(locale as Locale);
  const t = (key: string, values?: Record<string, string | number>) => {
    const keyParts = key.split('.');
    let result: any = messages;
    for (const part of keyParts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part];
      } else {
        return key;
      }
    }
    if (typeof result === 'string' && values) {
      return Object.entries(values).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        result
      );
    }
    return result;
  };
  
  return (
    <I18nProvider locale={locale as Locale} messages={messages}>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="bg-card border-t mt-12 py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
              <p>{t('Footer.copyright', { year: new Date().getFullYear() })}</p>
            </div>
          </footer>
        </div>
        <Toaster />
      </CartProvider>
    </I18nProvider>
  );
}
