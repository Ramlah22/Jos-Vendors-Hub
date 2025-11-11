import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vendor.png";
import { Filter, ShoppingCart, LogOut, User } from "lucide-react";
import productsData from "../data/products";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Load user from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/sign-in');
  };

  const categories = ["All", ...Array.from(new Set(productsData.map((p) => p.category)))];

  const filtered = productsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory || (selectedCategory === "Home & Living" && p.category === "Home");
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
        <div className="space-y-3 mx-4 sm:mx-8 lg:mx-14 pt-4 pb-6">
          <div className="flex items-center justify-between">
            <Link to="/vendor-profile" className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-600 rounded">
                <img src={logo} alt="" className="w-[100%] h-[100%]" />
              </div>
              <span className="text-emerald-800 text-sm sm:text-base">JOS Vendor's Hub</span>
            </Link>
            <div className="flex gap-3 items-center">
              <div className="px-3 py-2 bg-emerald-700 border border-green-200 text-white rounded-lg flex items-center gap-2 cursor-pointer" onClick={()=> navigate('/checkout')}>
                <ShoppingCart size={16} />
                <span>Cart ({items.length})</span>
              </div>
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="px-3 py-2 bg-emerald-700 border border-green-200 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-800"
                  >
                    <User size={16} />
                    <span className="hidden sm:inline text-sm">{user.fullName || user.name || 'Profile'}</span>
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-green-200 rounded-lg shadow-lg z-50">
                      <div className="p-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-800">{user.fullName || user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex-1 border border-green-200 rounded p-1 sm:p-2 bg-white flex items-center gap-2">
              <svg className="w-6 h-6 ml-2 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-700 border border-green-200 text-white rounded-lg cursor-pointer" onClick={()=> setShowFilters((s)=>!s)}>
              <Filter size={18} />
              <span className="text-sm">Filters</span>
            </div>
          </div>
          {showFilters && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1 rounded border ${selectedCategory===c ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700'}`}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

      {/* Banner */}
      <div className="bg-emerald-700 py-8 sm:py-10 lg:py-14 text-center text-white px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Discover Premium Products</h2>
        <p className="opacity-90 text-sm sm:text-base mt-2">
          Browse our curated collection of high-quality products from verified vendors
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">

        {filtered.map((product, idx) => (
          <motion.div
            key={idx}
            className="rounded-xl overflow-hidden bg-white shadow border border-green-200 hover:shadow-xl hover:border-green-300 "
          >
            {/* Image */}
            <div className="relative h-48 sm:h-64 lg:h-80">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />

              {product.badge && (
                <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-emerald-600 text-white text-xs px-2 sm:px-3 py-1 rounded-md">
                  {product.badge}
                </span>
              )}

              {/* Heart icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                <span>♡</span>
              </div>
            </div>

            {/* Text */}
            <div className="p-4 sm:p-5 lg:p-6 lg:pt-12 space-y-1">
              <h4 className="text-base sm:text-lg text-emerald-800 font-light">{product.name}</h4>

              <div className="flex items-center gap-1 text-sm sm:text-base">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-700 lg:text-lg">{product.rating}</span>
                <span className="text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-emerald-700 text-base sm:text-lg font-semibold">{product.price}</span>
                <div className="flex items-center gap-2">
                  <button onClick={()=> addToCart(product)} className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base px-2 sm:px-3 py-1 bg-emerald-600 text-white rounded">
                    <ShoppingCart size={14} className="hidden sm:block" />
                    Add to Cart
                  </button>
                  <button onClick={()=> navigate(`/product/${product.id}`)} className="px-2 py-1 border rounded text-sm">View</button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Category Section */}
       <div className="border-2 mt-6 sm:mt-8 lg:mt-20 p-4 sm:p-6 lg:p-8 lg:pt-20 lg:pb-18 bg-emerald-700 text-white space-y-4">
          <h3 className="text-center text-base sm:text-lg lg:text-xl pb-2 sm:pb-4">Shop by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 text-sm sm:text-base lg:text-lg gap-2 sm:gap-3">
            {categories.slice(1).map((cat) => {
              const display = cat === 'Home' ? 'Home & Living' : cat;
              const active = selectedCategory === cat || (selectedCategory === 'Home & Living' && cat === 'Home');
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left border-2 rounded-lg p-3 sm:p-4 lg:p-5 ${active ? 'bg-white/90 text-emerald-800 border-white/90' : 'bg-white/10 border-white/30'}`}>
                  {display}
                </button>
              );
            })}
          </div>
        </div>
    </div>
  );
}
