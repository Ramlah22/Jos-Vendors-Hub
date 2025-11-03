import { User, Store } from "lucide-react";
import { useState } from "react";
import "../index.css"
import logo from "../assets/vendor.png";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [selectedRole, setSelectedRole] = useState("customer");

  return (
    <div className="min-h-screen bg-[#f2fcf6] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg border border-green-200 rounded-lg my-20 p-8 w-full max-w-2xl text-center transition-all duration-500">
        {/* Top Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-green-700 p-4 rounded-md">
            <Store className="text-white" size={32} />
          </div>
        </div>

        {/* Headings */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Create Account
        </h2>
        <p className="text-base text-gray-500 mb-6">
          Join JOS Vendor’s Hub today
        </p>

        
                {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 bg-[#e8f9f0] rounded-full p-1 w-full max-w-md mx-auto">
        <button
            onClick={() => setSelectedRole("customer")}
            className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedRole === "customer"
                ? "bg-green-700 text-white"
                : "text-gray-600"
            }`}
        >

            <User size={16} />
            Customer
        </button>
        
        <button
            onClick={() => setSelectedRole("vendor")}
            className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedRole === "vendor"
                ? "bg-green-700 text-white"
                : "text-gray-600"
            }`}
        >
            <Store size={16} />
            Vendor
        </button>
        </div>


        {/* FORMS */}
        {selectedRole === "vendor" ? (
          // ---------- Vendor Form ----------
          <form className="text-left space-y-4 animate-fadeIn">
            <div>
              <label className="block text-sm text-gray-700 mb-1 font-bold">
               Vendor Name
              </label>
              <input
                type="text"
                required
                placeholder="Jane Smith"
                className="w-full px-4 py-2  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

             <div>
              <label className="block text-sm text-gray-700 mb-1 font-bold">
                Business Name
              </label>
              <input
                type="text"
                required
                placeholder="Your Store Name"
                className="w-full px-4 py-2  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1 font-bold">
                Business Category
              </label>
              <input
                type="text"
                placeholder="Your business category"
                required
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

              <div>
              <label className="block text-sm text-gray-700 mb-1 font-bold">
                Business Location
              </label>
              <input
                type="text"
                placeholder="Your business location"
                required
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-bold">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-bold">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="Confirm your password"
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md mt-4 transition"
            >
              Create Vendor Account
            </button>
          </form>
        ) : (
          // ---------- Customer Form ----------
          <form className="text-left space-y-4 animate-fadeIn">
            <div>
              <label className="block font-bold text-sm text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                required
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-bold">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-bold">
                Phone Number
              </label>
              <input
                type="text"
                required
                placeholder="+234 801 234 5678"
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-bold">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="Confirm your password"
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md mt-4 transition"
            >
             Create Customer Account
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="text-base text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-green-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
