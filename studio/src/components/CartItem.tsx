"use client";

import Image from 'next/image';
import { useState } from 'react';
import type { CartItemType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
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

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { t } = useI18n();

  const handleQuantityChange = (amount: number) => {
    const newQuantity = item.quantity + amount;
    if (newQuantity <= 0) {
      setIsAlertOpen(true);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
        value = 1;
    }
    if (value <= 0) {
      setIsAlertOpen(true);
    } else {
      updateQuantity(item.id, value);
    }
  }

  const handleRemove = () => {
    removeFromCart(item.id);
    setIsAlertOpen(false);
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <div className="flex items-start sm:items-center p-4 gap-4">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-md overflow-hidden flex-shrink-0">
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
        </div>
        <div className="flex-grow grid sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-1">
            <Link href={`/item/${item.id}`} className="font-medium hover:text-primary">{item.name}</Link>
            <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
          </div>
          
          <div className="flex items-center sm:col-span-1 sm:justify-center">
              <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)}>
                      <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                      type="number"
                      value={item.quantity}
                      onChange={handleInputChange}
                      className="h-8 w-12 text-center border-0 focus-visible:ring-0"
                      min="1"
                      max={item.stock}
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)} disabled={item.quantity >= item.stock}>
                      <Plus className="h-4 w-4" />
                  </Button>
              </div>
          </div>

          <div className="flex items-center justify-between sm:col-span-1 sm:justify-end">
            <p className="font-medium sm:mr-4">{formatPrice(item.price * item.quantity)}</p>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">{t('Cart.removeItem')}</span>
              </Button>
            </AlertDialogTrigger>
          </div>
        </div>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Cart.areYouSure')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('Cart.removeItemConfirmation', { productName: item.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('Cart.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} className="bg-destructive hover:bg-destructive/90">{t('Cart.remove')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
