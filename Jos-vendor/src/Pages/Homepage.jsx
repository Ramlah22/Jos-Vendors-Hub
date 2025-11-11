import React from "react";
import { ShoppingBag, ArrowRight, Store, Sparkles, ShoppingCart, Mail } from "lucide-react";
import logo from "../assets/vendor.png";
import { Link } from "react-router-dom";
import productsData from "../data/products";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Video from "../assets/Video.mp4"

export default function LandingPage() {
  const { addToCart, items } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(productsData.map((p) => p.category)))]
  return (
    <div className="w-full font-sans">
      {/* Hero Section */}
    <section className="h-[580px] flex flex-col items-center justify-center text-white px-6 text-center relative overflow-hidden">

  {/* BACKGROUND VIDEO (added, your code not changed) */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
    src={Video}   // <---- replace with your video path or link
  ></video>

  {/* Top bar inside hero (logo left, contact right) */}
  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
    <Link to="/" className="flex items-center gap-3">
      <div className="w-40 h-18  rounded-lg overflow-hidden">
        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
      </div>
    </Link>
    <Link to="/contact" className="flex items-center gap-2 bg-emerald-950 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition">
      <Mail size={16} />
      <span className="text-base hidden md:inline">Contact Us</span>
    </Link>
  </div>

  {/* Dark overlay to improve text visibility (optional, remove if not needed) */}
  <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

  {/* Your original content (not modified) */}

  <h1 className="text-5xl font-semibold mb-4 relative z-10">
   Join easily, discover trusted <span className="text-emerald-900">VENDORS</span> instantly.
  </h1>

  <p className="max-w-2xl text-xl text-gray-200 mb-8 relative z-10">
    Your one-stop marketplace connecting vendors and customers. Shop with
    confidence and grow your business with ease.
  </p>

  <div className="flex flex-wrap justify-center gap-4 relative z-10">
    <Link
      to="/Product"
      className="flex items-center border-2 border-emerald-900 gap-2 bg-white text-[#016e52] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
    >
      <Sparkles size={18} />
      Start Shopping
    </Link>

    <Link
      to="/sign-in"
      className="flex items-center gap-2 border-2 border-emerald-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition"
    >
      Sign In
    </Link>
  </div>
</section>


      {/* Shop section - categories sidebar + product grid */}
      <section className="py-12 bg-gray-50 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shop popular products</h2>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Categories sidebar */}
            <aside className="w-full lg:w-64 bg-white border border-gray-100 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="flex flex-col gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`text-left px-3 py-2 rounded-md ${selectedCategory===c ? 'bg-emerald-600 text-white' : 'hover:bg-gray-50'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsData
                  .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                  .slice(0, 9)
                  .map((product) => (
                    <div key={product.id} className="bg-white border border-green-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="relative h-48">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded-md">{product.badge}</span>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="text-emerald-800 font-medium">{product.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-yellow-400">★</span>
                          <span>{product.rating}</span>
                          <span className="text-gray-400">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-emerald-700 font-semibold">{product.price}</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => addToCart(product)} className="bg-emerald-600 text-white px-3 py-1 rounded-md flex items-center gap-2">
                              <ShoppingCart size={16} />
                              Add
                            </button>
                            <Link to={`/product/${product.id}`} className="text-sm px-2 py-1 border rounded">View</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-50 text-gray-900 px-4 md:px-16 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Why Choose JOS Vendor's Hub?
        </h2>
        <p className="text-gray-600 mb-12">
          Join thousands of happy customers and vendors in our thriving
          marketplace
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Customer */}
          <div className="border-2 border-green-200 hover:border-2 hover:border-green-300 rounded-xl p-8 shadow-md hover:shadow-lg text-left transition">
            <div className="w-12 h-12  bg-green-100 text-green-700  rounded-lg mb-4 ">
              <img src={logo} alt=""  />
            </div>
            <h3 className="text-lg font-semibold mb-2">Find a vendor</h3>
            <p className="text-gray-600 mb-6">
              Browse thousands of premium products from verified vendors
            </p>
            <Link to="/create-account" className="bg-green-50 w-full border border-green-200 text-green-700 px-6 py-2 rounded-md font-medium hover:bg-green-100 transition">
              Sign Up as Customer
            </Link>
          </div>

          {/* Vendor */}
          <div className="border-2 border-green-200 hover:border-2 hover:border-green-300 text-left rounded-xl p-8 shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 text-green-700 flex items-center justify-center rounded-lg mb-4 ">
              <img src={logo} alt="" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Become a Vendor</h3>
            <p className="text-gray-600 mb-6">
              Grow your business and reach millions of potential customers
            </p>
            <Link to="/create-account" className="bg-green-50  border border-green-200 text-green-700 px-6 py-2 rounded-md font-medium hover:bg-green-100 transition">
              Sign Up as Vendor
            </Link>
          </div>

          {/* Premium */}
          <div className="border-2 border-green-200 hover:border-2 hover:border-green-300 text-left rounded-xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-green-100 text-green-700 flex items-center justify-center rounded-lg mb-4">
              <Store />
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Experience</h3>
            <p className="text-gray-600 mb-6">
              Enjoy seamless shopping with secure payments and fast delivery
            </p>
            <Link to="/VendorDashboard" className="bg-green-50 border border-green-200 text-green-700 px-6 py-2 rounded-md font-medium hover:bg-green-100 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#016e52] text-white text-center py-16 px-6">
        <h3 className="text-lg font-semibold mb-4">Ready to Get Started?</h3>
        <p className="text-gray-200 mb-8">
          Join our community today and experience the future of online shopping
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/create-account" className="bg-white text-[#016e52] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            Create Account
          </Link>
          <Link to="/vendor-profile" className="border border-gray-300 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition">
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}
