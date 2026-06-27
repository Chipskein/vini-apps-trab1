import React, { createContext, useContext, useMemo, useState } from 'react';
import { Product, products } from '../data/products';

type CartItem = { product: Product; quantity: number; selected: boolean };

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  toggleSelected: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    { product: products[2], quantity: 1, selected: true }
  ]);

  const addToCart = (product: Product) => {
    setItems(current => {
      const existing = current.find(item => item.product.id === product.id);
      if (existing) {
        return current.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1, selected: true } : item);
      }
      return [...current, { product, quantity: 1, selected: true }];
    });
  };

  const increment = (id: string) => setItems(current => current.map(item => item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const decrement = (id: string) => setItems(current => current.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item));
  const remove = (id: string) => setItems(current => current.filter(item => item.product.id !== id));
  const toggleSelected = (id: string) => setItems(current => current.map(item => item.product.id === id ? { ...item, selected: !item.selected } : item));

  const value = useMemo(() => {
    const selected = items.filter(item => item.selected);
    return {
      items,
      totalItems: selected.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: selected.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      addToCart,
      increment,
      decrement,
      remove,
      toggleSelected
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
