"use client";

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { t } = useI18n();

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      if (newQuantity > product.stock) return product.stock;
      return newQuantity;
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
        value = 1;
    }
    if (value > product.stock) {
        value = product.stock;
    }
    setQuantity(value);
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded-md">
        <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input 
          type="number"
          value={quantity}
          onChange={handleInputChange}
          className="h-10 w-16 text-center border-0 focus-visible:ring-0"
          min="1"
          max={product.stock}
        />
        <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button size="lg" className="flex-grow bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleAddToCart} disabled={product.stock === 0}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        {product.stock > 0 ? t('Product.addToCart') : t('Product.outOfStock')}
      </Button>
    </div>
  );
}
