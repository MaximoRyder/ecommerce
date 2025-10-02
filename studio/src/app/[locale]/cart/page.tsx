
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/CartItem";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
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
import Link from "next/link";
import { useI18n } from "@/context/I18nContext";

export default function CartPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);
  const { t } = useI18n();

  const handleClearCart = () => {
    clearCart();
    setIsClearAlertOpen(false);
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-6 text-2xl font-bold">{t('Cart.emptyTitle')}</h2>
        <p className="mt-2 text-muted-foreground">{t('Cart.emptyDescription')}</p>
        <Button asChild className="mt-6">
          <Link href="/">{t('Cart.startShopping')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <AlertDialog open={isClearAlertOpen} onOpenChange={setIsClearAlertOpen}>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight mb-6">{t('Cart.title', { count: cartItems.length })}</h1>
          <Card>
            <CardContent className="p-0 divide-y">
                {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </CardContent>
          </Card>
        </div>
        <div className="lg:sticky lg:top-24">
          <Card>
            <CardHeader>
              <CardTitle>{t('Cart.orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-muted-foreground">
                <span>{t('Cart.subtotal')}</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between mt-2 text-muted-foreground">
                <span>{t('Cart.shipping')}</span>
                <span className="text-primary">{t('Cart.free')}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>{t('Cart.total')}</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 items-stretch">
              <Button size="lg" className="w-full">{t('Cart.checkout')}</Button>
              <AlertDialogTrigger asChild>
                <Button size="lg" variant="outline" className="w-full">{t('Cart.clearCart')}</Button>
              </AlertDialogTrigger>
            </CardFooter>
          </Card>
        </div>
      </div>
       <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Cart.clearCartConfirmationTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('Cart.clearCartConfirmationDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('Cart.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleClearCart} className="bg-destructive hover:bg-destructive/90">{t('Cart.confirmClear')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
