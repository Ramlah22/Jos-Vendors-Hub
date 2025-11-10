import React from "react";
import logo from "../assets/vendor.png";
import Vendor1 from "../assets/vendor1.jpeg";
import Vendor2 from "../assets/vendor2.jpeg";
import Vendor3 from "../assets/vendor3.jpeg";
import {
    MapPin,
  Search,
  Filter,
  ShoppingCart,
  Heart,
  Grid,
  Rows,
  BadgeCheck,
} from "lucide-react";

const VendorsPage = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between pt-4 px-6 ">
        <img
          src={logo}
          alt="logo"
          className="h-14 ml-24 w-14 rounded-lg  bg-gray-100"
        />

        <div className="flex items-center gap-4">
          <button className="border border-green-300 text-green-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 text-sm">
            My Orders
          </button>

          <button className="border  border-green-300 text-green-800 font-semibold px-4 py-2 rounded-lg flex gap-2 items-center hover:bg-gray-100 text-sm">
            <Heart size={16} /> Favorites (0)
          </button>

          <button className="border   bg-emerald-700 border-green-300 text-white font-semibold px-4 py-2 rounded-lg flex gap-2 items-center hover:bg-gray-100 text-sm">
            <ShoppingCart size={16} /> Cart (0)
          </button>
        </div>
      </header>

      {/* Search bar */}
    <div className="w-full flex mt-6 justify-center">
  <div className="w-3/4 flex items-center bg-gray-100 border border-green-300 rounded-lg px-4 h-12">
    <Search size={18} className="opacity-50" />
    <input
      type="text"
      placeholder="Search vendors, products, categories..."
      className="w-full ml-2 outline-none bg-transparent"
    />
  </div>

  <button className="ml-4 flex items-center gap-2 px-4 h-12 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 border border-green-200 cursor-pointer">
    <Filter size={18} /> Filters
  </button>
</div>


      {/* Green Header */}
      <div className="w-full bg-[#017143] text-white py-10 px-6 mt-6">
        <h1 className="text-3xl font-bold">Browse Vendors & Products</h1>
        <p className="opacity-90 mt-1 text-lg">
          Discover amazing vendors across different categories. Save your
          favorites for quick access.
        </p>

        {/* View toggle */}
        <div className="flex justify-end gap-3 mt-4 mr-10">
          <button className="bg-white text-[#017143] p-2 rounded-lg shadow-sm">
            <Grid size={18} />
          </button>
          <button className="bg-emerald-900  text-white p-2 rounded-lg shadow-sm">
            <Rows size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-6 mt-8">
        <button className="px-4 py-2 border border-green-300 bg-[#017143] text-white rounded-full text-sm">
          Browse Vendors
        </button>
        <button className="px-4 py-2 border border-green-300 text-sm rounded-full">
          Shop by Category
        </button>
        <button className="px-4 py-2 text-sm border border-green-300 rounded-full flex items-center gap-2">
          My Favorites (0)
        </button>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-12 py-10">
        {/* CARD 1 */}
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="relative">
            <img
              src={Vendor1}
              alt="Vendor"
              className="rounded-lg w-full h-96 object-cover"
            />
            <span className="absolute top-3 left-3 bg-[#017143] text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <BadgeCheck size={14} /> Verified
            </span>
            <Heart size={18} className="absolute top-3 right-3 cursor-pointer" />
          </div>

          <p className="text-base sm:text-lg text-emerald-800 font-medium pb-2 pl-6 mt-10">AfrikStyle Storefront</p>
          <p className="text-gray-700 lg:text-base pl-6">
            <span className="text-yellow-500">★</span>
            4.9 (214 reviews)</p>

          <div className="flex gap-2 mt-1 items-center">
            <span className=" pl-6 pb-2 text-base px-3 py-1 flex items-center gap-1">
                <MapPin size={14} className="text-emerald-700" />
                Lagos, Nigeria
            </span>
            </div>
                <span className="bg-gray-100 rounded-full text-xs px-3 py-1">
                Fashion & Wears
            </span>


          <button className="w-full bg-[#017143] text-white rounded-lg py-2 text-sm mt-4">
            View Vendor Page
          </button>
        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="relative">
            <img
              src={Vendor2}
              alt="Vendor"
              className="rounded-lg w-full h-56 object-cover"
            />
            <span className="absolute top-3 left-3 bg-[#017143] text-white text-xs px-2 py-1 rounded-md">
              Top Seller
            </span>
            <Heart size={18} className="absolute top-3 right-3 cursor-pointer" />
          </div>

          <p className="font-semibold mt-3">TechLink Africa</p>
          <p className="text-xs text-gray-500">4.7 (162 reviews)</p>

          <button className="w-full bg-[#017143] text-white rounded-lg py-2 text-sm mt-4">
            View Vendor Page
          </button>
        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="relative">
            <img
              src={Vendor3}
              alt="Vendor"
              className="rounded-lg w-full h-56 object-cover"
            />
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
              New
            </span>
            <Heart size={18} className="absolute top-3 right-3 cursor-pointer" />
          </div>

          <p className="font-semibold mt-3">InnovateCreate Hub</p>
          <p className="text-xs text-gray-500">4.6 (102 reviews)</p>

          <button className="w-full bg-[#017143] text-white rounded-lg py-2 text-sm mt-4">
            View Vendor Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorsPage;
