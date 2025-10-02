
"use client";

import { ShoppingCart, Package2, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useUser } from '@/firebase';
import UserMenu from './UserMenu';
import { useI18n } from '@/context/I18nContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Separator } from './ui/separator';

const categories = [
  { name: 'electronics', id: 'electronics' },
  { name: 'accessories', id: 'accessories' },
  { name: 'books', id: 'books' },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, isUserLoading } = useUser();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [animateCart, setAnimateCart] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart('animate-bounce');
      const timer = setTimeout(() => setAnimateCart(''), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <SheetClose asChild>
      <Link href={href} className={className} onClick={() => setIsMobileMenuOpen(false)}>
        {children}
      </Link>
    </SheetClose>
  );
  
  const AuthButtons = () => (
     isClient && !isUserLoading && (
        user ? <UserMenu /> : <Button asChild><Link href="/login">{t('Navbar.login')}</Link></Button>
      )
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
               <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <NavLink href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Package2 className="h-6 w-6 text-primary" />
                  <span className="sr-only">eStoreFront</span>
                </NavLink>
                {categories.map((category) => {
                    const categoryPath = `/category/${category.id}`;
                    const isActive = pathname.endsWith(categoryPath);
                    return (
                        <NavLink
                            key={category.id}
                            href={categoryPath}
                            className={cn(
                                "text-muted-foreground transition-colors hover:text-foreground",
                                isActive && "text-foreground"
                            )}
                        >
                            {t(`Navbar.${category.name}`)}
                        </NavLink>
                    );
                })}
              </nav>
              <div className="mt-auto space-y-4">
                <Separator />
                 <div className="flex items-center justify-between">
                    <AuthButtons />
                    <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">eStoreFront</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          {categories.map((category) => {
            const categoryPath = `/category/${category.id}`;
            const isActive = pathname.endsWith(categoryPath);
            return (
              <Link
                key={category.id}
                href={categoryPath}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t(`Navbar.${category.name}`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                {isClient && cartCount > 0 && (
                  <span className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground ${animateCart}`}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="sr-only">{t('Navbar.shoppingCart')}</span>
            </Link>
          </Button>
          <div className="hidden md:block">
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
