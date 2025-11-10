import React, { useState } from "react";
import Vendor1 from "../assets/vendor1.jpeg";
import {
  Heart,
  Share2,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
} from "lucide-react";

const VendorPage = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-[#F7FFF9] w-full">
      {/* ================= HEADER SECTION =============== */}
      <div className="pt-6 px-8 flex items-center justify-between">
        <button className="px-4 py-2 rounded-lg border hover:bg-gray-100 text-sm">
          Back to Browse
        </button>

        <button className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100 text-sm">
          Cart (0)
        </button>
      </div>

      {/* Vendor Banner */}
      <div className="w-full bg-emerald-700 h-[230px] mt-4 rounded-b-3xl relative">
        <div className="flex gap-6 items-center px-10 py-6">
          {/* Vendor Image */}
          <img
            src={Vendor1}// <-- replace with your vendor image
            alt="Vendor"
            className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg"
          />

          <div className="text-white">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
              ✅ Verified Vendor
            </span>

            <h2 className="text-2xl font-semibold mt-2">
              AfriStyle Boutique
            </h2>

            <p className="opacity-90 mt-1 text-sm max-w-xl">
              Premium African fashion and accessories. Authentic designs,
              handcrafted quality, and cultural expressions for the modern
              African wardrobe.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1">
                <Star size={16} /> 4.8 Rating
              </span>
              <span>234 Reviews</span>
              <span>1,245 Products</span>
            </div>
          </div>

          {/* Icons Right side */}
          <div className="absolute right-10 flex gap-4">
            <Heart className="cursor-pointer text-white" size={22} />
            <Share2 className="cursor-pointer text-white" size={22} />
          </div>
        </div>
      </div>

      {/* ================= PAGE BODY ================= */}
      <div className="grid grid-cols-3 gap-6 px-10 mt-10">

        {/* LEFT SIDEBAR: CONTACT */}
        <div className="col-span-1 space-y-6">
          {/* Contact Info */}
          <div className="bg-white shadow-sm rounded-xl p-6 border">
            <h3 className="font-semibold mb-4">Contact Information</h3>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2"><MapPin size={16} /> 123 Fashion Street, Victoria Island, Lagos, Nigeria</p>
              <p className="flex items-center gap-2"><Phone size={16} /> +234 123 456 7890</p>
              <p className="flex items-center gap-2"><Mail size={16} /> hello@afristyle.com</p>
              <p className="flex items-center gap-2"><Globe size={16} /> www.afristyle.com</p>
              <p className="flex items-start gap-2"><Clock size={16} /> Mon-Fri 9am – 6pm <br /> Sat: 10am – 4pm <br /> Sun: Closed</p>
            </div>

            <button className="w-full bg-emerald-700 text-white rounded-lg py-2 mt-4">
              Contact Vendor
            </button>
          </div>

          {/* Location Google Map */}
          <div className="bg-white shadow-sm rounded-xl p-4 border">
            <h3 className="font-semibold mb-2">Location</h3>
            <img
              src="/vendor-location.jpg" // <-- replace with your map image
              alt="map"
              className="rounded-lg w-full"
            />
          </div>
        </div>

        {/* RIGHT CONTENT: TABS + DETAILS */}
        <div className="col-span-2">

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            {["products", "about", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm border ${
                  activeTab === tab
                    ? "bg-emerald-700 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3 text-lg">
                About AfriStyle Boutique
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                AfriStyle Boutique was founded in 2018 with a mission to celebrate African culture through contemporary fashion. We specialize in handcrafted Ankara designs, traditional accessories, and modern interpretations of classic African attire.
                <br /><br />
                Every piece tells a story and supports local artisans.
              </p>

              <div className="grid grid-cols-3 text-center mt-6">
                <div>
                  <h4 className="font-bold text-emerald-700">5+</h4>
                  <p className="text-xs">Years in Business</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-700">10K+</h4>
                  <p className="text-xs">Happy Customers</p>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-700">98%</h4>
                  <p className="text-xs">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === "products" && (
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <img src="/product1.jpg" alt="product" className="rounded-lg w-full h-52 object-cover" />
                <p className="font-medium mt-2">Premium Ankara Dress</p>
                <div className="flex justify-between mt-1 text-sm">
                  <span>4.9 ★</span>
                  <span>$89.99</span>
                </div>
                <button className="w-full bg-emerald-700 text-white mt-3 py-2 rounded-lg">Add</button>
              </div>

              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <img src="/product2.jpg" alt="product" className="rounded-lg w-full h-52 object-cover" />
                <p className="font-medium mt-2">Handcrafted Jewelry Set</p>
                <div className="flex justify-between mt-1 text-sm">
                  <span>4.8 ★</span>
                  <span>$129.99</span>
                </div>
                <button className="w-full bg-emerald-700 text-white mt-3 py-2 rounded-lg">Add</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default VendorPage;
