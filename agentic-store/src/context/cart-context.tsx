"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/data/products";

type CartItem = {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, options?: { color?: string; size?: string }) => void;
  removeItem: (productId: string, options?: { color?: string; size?: string }) => void;
  updateQuantity: (productId: string, quantity: number, options?: { color?: string; size?: string }) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "agentic-store-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as CartItem[];
      }
    } catch (error) {
      console.error("Failed to load cart", error);
    }
    return [];
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem: CartContextValue["addItem"] = (product, options) => {
    setItems((current) => {
      const existing = current.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === options?.color &&
          item.selectedSize === options?.size,
      );

      if (existing) {
        return current.map((item) =>
          item === existing
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item,
        );
      }

      return [
        ...current,
        {
          product,
          quantity: 1,
          selectedColor: options?.color,
          selectedSize: options?.size,
        },
      ];
    });
  };

  const matches = (item: CartItem, productId: string, options?: { color?: string; size?: string }) =>
    item.product.id === productId && item.selectedColor === options?.color && item.selectedSize === options?.size;

  const removeItem: CartContextValue["removeItem"] = (productId, options) => {
    setItems((current) => current.filter((item) => !matches(item, productId, options)));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (productId, quantity, options) => {
    setItems((current) =>
      current.map((item) =>
        matches(item, productId, options)
          ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.product.stock) }
          : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
