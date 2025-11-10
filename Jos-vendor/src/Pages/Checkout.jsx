import React from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-white p-6 rounded shadow">Your cart is empty.</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl mb-4">Checkout</h2>
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.product.id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={it.product.image} alt={it.product.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <div className="font-semibold">{it.product.name}</div>
                  <div className="text-sm text-gray-600">{it.product.price}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={it.quantity}
                  onChange={(e) => updateQuantity(it.product.id, Math.max(1, Number(e.target.value || 1)))}
                  className="w-16 p-1 border rounded"
                />
                <button onClick={() => removeFromCart(it.product.id)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <button onClick={clearCart} className="px-4 py-2 bg-gray-200 rounded">Clear Cart</button>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
            <button className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
