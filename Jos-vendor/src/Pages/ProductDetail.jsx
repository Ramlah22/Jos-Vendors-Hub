import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);
  if (!product) return <div className="p-8">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-4 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded" />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-emerald-800">{product.name}</h1>
            <div className="text-lg text-emerald-700 font-bold">{product.price}</div>
            <div className="text-sm text-gray-600">{product.rating} • {product.reviews}</div>
            <p className="text-gray-700">This is a short description for {product.name}. You can expand this with real product details.</p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => addToCart(product)}
                className="px-4 py-2 bg-emerald-600 text-white rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border rounded"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
