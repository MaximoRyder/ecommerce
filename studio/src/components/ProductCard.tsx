"use client";

import Image from 'next/image';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { t } = useI18n();
  const itemInCart = cartItems.find(item => item.id === product.id);
  const [isAlertOpen, setIsAlertOpen] = useState(false);


  const handleQuantityChange = (amount: number) => {
    if (itemInCart) {
      const newQuantity = itemInCart.quantity + amount;
      if (newQuantity <= 0) {
        setIsAlertOpen(true);
      } else {
        updateQuantity(product.id, newQuantity);
      }
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    setIsAlertOpen(false);
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
        <Link href={`/item/${product.id}`} className="block">
          <CardHeader className="p-0">
            <div className="aspect-[4/3] relative w-full overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={product.imageHint}
              />
            </div>
          </CardHeader>
        </Link>
        <CardContent className="p-4 flex-grow">
          <Link href={`/item/${product.id}`} className="block">
            <CardTitle className="text-lg font-medium leading-tight hover:text-primary transition-colors">{product.name}</CardTitle>
          </Link>
          <p className="text-sm text-muted-foreground mt-1 capitalize">{product.category}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-xl font-semibold text-primary">{formatPrice(product.price)}</p>
          {itemInCart ? (
              <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)}>
                      <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-center w-6 font-medium">{itemInCart.quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)} disabled={itemInCart.quantity >= product.stock}>
                      <Plus className="h-4 w-4" />
                  </Button>
                   <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
              </div>
          ) : (
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => addToCart(product, 1)} disabled={product.stock === 0}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.stock > 0 ? t('ProductCard.add') : t('ProductCard.outOfStock')}
              </Button>
          )}
        </CardFooter>
      </Card>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('ProductCard.areYouSure')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('ProductCard.removeItemConfirmation', { productName: product.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('ProductCard.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} className="bg-destructive hover:bg-destructive/90">{t('ProductCard.remove')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
