"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Product, CartItemType } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { useI18n } from './I18nContext';


interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { toast } = useToast();
  const { t } = useI18n();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('eStoreFrontCart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      localStorage.removeItem('eStoreFrontCart');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('eStoreFrontCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          toast({
            title: t('Toast.stockError.title'),
            description: t('Toast.stockError.description', { stock: product.stock }),
            variant: "destructive",
          });
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        if (quantity > product.stock) {
           toast({
            title: t('Toast.stockError.title'),
            description: t('Toast.stockError.description', { stock: product.stock }),
            variant: "destructive",
          });
          return prevItems;
        }
        return [...prevItems, { id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, stock: product.stock, quantity }];
      }
    });
    toast({
      title: t('Toast.productAdded.title'),
      description: t('Toast.productAdded.description', { productName: product.name }),
    });
  }, [toast, t]);

  const removeFromCart = useCallback((productId: string) => {
    const itemToRemove = cartItems.find(item => item.id === productId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
     toast({
      title: t('Toast.productRemoved.title'),
      description: t('Toast.productRemoved.description', { productName: itemToRemove?.name }),
      variant: 'destructive'
    });
  }, [cartItems, toast, t]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems(prevItems => {
        const itemToUpdate = prevItems.find(item => item.id === productId);
        if (!itemToUpdate) return prevItems;

        if (quantity <= 0) {
            // This case is now handled by confirmation dialogs in components
            return prevItems;
        }
        if(quantity > itemToUpdate.stock) {
            toast({
                title: t('Toast.stockError.title'),
                description: t('Toast.stockError.available', { stock: itemToUpdate.stock }),
                variant: "destructive"
            });
            return prevItems.map(item => item.id === productId ? {...item, quantity: itemToUpdate.stock} : item);
        }
        return prevItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
    });
  }, [toast, t]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
