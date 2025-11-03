import React from "react";
import { ShoppingBag, ArrowRight, Store, Sparkles } from "lucide-react";
import logo from "../assets/vendor.png";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="w-full font-sans">
      {/* Hero Section */}
      <section className="h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-[#016e52] to-[#005b42] text-white px-6 text-center">
        <div>
          <div className="flex items-center justify-center w-40 h-40 ">
         <img src={logo} alt="" className="w-[100%] h-[100%]" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-4">
          Welcome to JOS Vendor's Hub
        </h1>
        <p className="max-w-2xl text-base text-gray-200 mb-8">
          Your one-stop marketplace connecting vendors and customers. Shop with
          confidence and grow your business with ease.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 bg-white text-[#016e52] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            <Sparkles size={18} />
            Start Shopping
          </button>
          <Link to="/sign-in" className="flex items-center gap-2 border border-gray-300 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition">
            Sign In
          </Link>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white text-gray-900 px-4 md:px-16 text-center">
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
            <button className="bg-green-50 border border-green-200 text-green-700 px-6 py-2 rounded-md font-medium hover:bg-green-100 transition">
              Learn More
            </button>
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
          <button className="border border-gray-300 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition">
            Browse Products
          </button>
        </div>
      </section>
    </div>
  );
}
