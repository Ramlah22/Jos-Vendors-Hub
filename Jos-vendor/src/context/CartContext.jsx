import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    setItems((cur) => {
      const existing = cur.find((i) => i.product.id === product.id);
      if (existing) {
        return cur.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...cur, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((cur) => cur.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems((cur) =>
      cur.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (s, i) => s + parseFloat(i.product.price.replace(/[^0-9.-]+/g, "")) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;
