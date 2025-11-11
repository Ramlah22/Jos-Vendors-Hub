import React, { useState } from "react";
import logo from "../assets/vendor.png";
import Vendor1 from "../assets/vendor1.jpeg";
import Vendor2 from "../assets/vendor2.jpeg";
import Vendor3 from "../assets/vendor3.jpeg";
import Vendor4 from "../assets/vendor4.jpeg";
import Vendor5 from "../assets/vendor5.jpeg";
import Vendor6 from "../assets/vendor6.jpeg";  
import { Link } from "react-router-dom"; 
import {
  MapPin,
  Search,
  Filter,
  ShoppingCart,
  Heart,
  Grid,
  Rows,
  BadgeCheck,
  Smartphone,
  ShoppingBag,
  Home,
  Droplet,
  Activity,
  Book,
  Coffee,
  Gift,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

const VendorsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategories, setShowCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [badgeFilter, setBadgeFilter] = useState('All');
  const { addToCart, items } = useCart();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const vendors = [
    { id: 1, image: Vendor1, name: 'AfrikStyle Storefront', rating: 4.9, reviews: 214, location: 'Rukuba Road, Jos North', category: 'Fashion & Apparel', badge: 'Verified', description: 'Premium African fashion and accessories.', sample: { id: 'p-v1', name: 'Sample Ankara', price: '$29.99' } },
    { id: 2, image: Vendor2, name: 'TechLink Africa', rating: 4.7, reviews: 162, location: 'Rayfield, Jos North', category: 'Electronics', badge: 'Top Seller', description: 'Latest gadgets and electronics.', sample: { id: 'p-v2', name: 'Sample Gadget', price: '$49.99' } },
    { id: 3, image: Vendor3, name: 'InnovateCreate Hub', rating: 4.6, reviews: 102, location: 'Ahmadu Bello Way, Jos North', category: 'Home & Living', badge: 'New', description: 'Home improvements and decor.', sample: { id: 'p-v3', name: 'Sample Decor', price: '$19.99' } },
    { id: 4, image: Vendor4, name: 'BeautyGlow Nigeria', rating: 4.8, reviews: 189, location: 'Bukuru, Jos South', category: 'Beauty & Care', badge: 'Featured', description: 'Beauty & cosmetics products.', sample: { id: 'p-v4', name: 'Sample Cream', price: '$14.99' } },
    { id: 5, image: Vendor5, name: 'FoodieDelight Market', rating: 4.9, reviews: 235, location: 'Tudun Wada Road, Jos North', category: 'Food & Beverages', badge: 'Verified', description: 'Fresh groceries and packaged foods.', sample: { id: 'p-v5', name: 'Sample Meal', price: '$9.99' } },
    { id: 6, image: Vendor6, name: 'ArtisanCraft Gallery', rating: 4.7, reviews: 156, location: 'Terminus, Jos North', category: 'Toys & Games', badge: 'Top Seller', description: 'Handmade arts and crafts.', sample: { id: 'p-v6', name: 'Sample Art', price: '$24.99' } },
  ];

  const categories = ['All','Electronics','Fashion & Apparel','Home & Living','Beauty & Care','Sports & Fitness','Books & Media','Food & Beverages','Toys & Games'];

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between pt-4 pl-2 ">
        
        <img
          src={logo}
          alt="logo"
          className="h-14 lg:ml-24 md:mr-2 w-14  rounded-lg  bg-gray-100"
        />

        <div className="flex items-center gap-4">
          <Link to="/product" className="border border-green-300 ml-4 text-green-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 text-sm">
            My Orders
          </Link>

          <button onClick={() => setSelectedCategory('Favorites')} className="border border-green-300 text-green-800 font-semibold px-4 py-2  rounded-lg flex gap-2 items-center hover:bg-gray-100 text-sm">
            <Heart size={16} /> Favorites ({favorites.length})
          </button>

          <button onClick={() => window.location.href = '/checkout'} className="border bg-emerald-700 border-green-300 text-white font-semibold px-4 py-2 rounded-lg flex gap-2 items-center hover:bg-emerald-600 text-sm">
            <ShoppingCart size={16} /> Cart ({items.length})
          </button>
        </div>
      </header>

      {/* Search bar */}
    <div className="w-full flex mt-6 justify-center">
  <div className="w-3/4 flex items-center bg-gray-100 border border-green-300 rounded-lg px-4 h-12">
    <Search size={18} className="opacity-50" />
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by vendor name or location..."
      className="w-full ml-2 outline-none bg-transparent"
    />
  </div>

  <div className="ml-4 relative">
    <button onClick={() => setShowFilterPanel((s) => !s)} className="flex items-center gap-2 px-4 h-12 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 border border-green-200 cursor-pointer">
      <Filter size={18} /> Filters
    </button>

    {showFilterPanel && (
      <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded p-4 z-50">
        <div className="mb-3">
          <label className="block text-sm text-gray-600">Minimum rating</label>
          <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="w-full mt-1 p-2 border rounded">
            <option value={0}>Any</option>
            <option value={4}>4+</option>
            <option value={4.5}>4.5+</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm text-gray-600">Badge</label>
          <select value={badgeFilter} onChange={(e) => setBadgeFilter(e.target.value)} className="w-full mt-1 p-2 border rounded">
            <option value="All">All</option>
            <option value="Verified">Verified</option>
            <option value="Top Seller">Top Seller</option>
            <option value="Featured">Featured</option>
            <option value="New">New</option>
          </select>
        </div>

        <div className="flex justify-between gap-2">
          <button onClick={() => { setMinRating(0); setBadgeFilter('All'); setShowFilterPanel(false); }} className="px-3 py-2 text-sm border rounded">Clear</button>
          <button onClick={() => setShowFilterPanel(false)} className="px-3 py-2 text-sm bg-emerald-700 text-white rounded">Apply</button>
        </div>
      </div>
    )}
  </div>
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
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg shadow-sm ${viewMode==='grid' ? 'bg-emerald-900 text-white' : 'bg-gray-100 text-[#017143] '}`}>
            <Grid size={18} />
          </button>
          <button onClick={() => setViewMode('rows')} className={`p-2 rounded-lg shadow-sm ${viewMode==='rows' ? 'bg-emerald-900 text-white' : 'bg-gray-100 text-[#017143]'}`}>
            <Rows size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-6 mt-8">
        <button onClick={() => { setSelectedCategory('All'); setViewMode('grid'); setShowCategories(false); window.scrollTo({top: 200, behavior: 'smooth'}); }} className={`px-4 py-2 border border-green-300 rounded-full text-sm ${selectedCategory==='All' ? 'bg-[#017143] text-white' : ''}`}>
          Browse Vendors
        </button>
        <button onClick={() => { setShowCategories(true); setSelectedCategory('All'); window.scrollTo({top: 400, behavior: 'smooth'}); }} className="px-4 py-2 border border-green-300 text-sm rounded-full">
          Shop by Category
        </button>
        <button onClick={() => setSelectedCategory('Favorites')} className="px-4 py-2 text-sm border border-green-300 rounded-full flex items-center gap-2">
          My Favorites ({favorites.length})
        </button>
      </div>

      {/* Vendors Grid / Rows - show categories only when requested */}
      {showCategories ? (
        <div className="max-w-7xl mx-auto px-12 mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { key: 'Electronics', icon: Smartphone },
              { key: 'Fashion & Apparel', icon: ShoppingBag },
              { key: 'Home & Living', icon: Home },
              { key: 'Beauty & Care', icon: Droplet },
              { key: 'Sports & Fitness', icon: Activity },
              { key: 'Books & Media', icon: Book },
              { key: 'Food & Beverages', icon: Coffee },
              { key: 'Toys & Games', icon: Gift },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <button key={c.key} onClick={() => { setSelectedCategory(c.key); setShowCategories(false); window.scrollTo({top: 600, behavior: 'smooth'}); }} className="flex flex-col items-center gap-2 p-4 bg-white rounded shadow text-center cursor-pointer hover:scale-105 transition">
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-700"><Icon size={20} /></div>
                  <div className="text-sm">{c.key}</div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="max-w-7xl mx-auto px-12 py-10">

        <div className={`${viewMode==='grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10' : 'flex flex-col divide-y'} `}>
          {vendors
            .filter(
              (v) =>
                // category / favorites filtering
                (selectedCategory === 'All' ||
                  (selectedCategory === 'Favorites' ? favorites.includes(v.id) : v.category === selectedCategory))
            )
            .filter((v) => {
              // search by name or location
              if (!searchTerm) return true;
              const q = searchTerm.toLowerCase();
              return (
                v.name.toLowerCase().includes(q) || v.location.toLowerCase().includes(q)
              );
            })
            .filter((v) => {
              // min rating filter
              if (!minRating) return true;
              return v.rating >= minRating;
            })
            .filter((v) => {
              // badge filter
              if (!badgeFilter || badgeFilter === 'All') return true;
              return v.badge === badgeFilter;
            })
            .map((v) => (
            viewMode==='grid' ? (
              <div key={v.id} className=" bg-white rounded-lg shadow border border-green-200 hover:shadow-xl hover:border-green-300 p-3">
                <div className="relative">
                  <img src={v.image} alt={v.name} className="rounded-lg w-full h-96 object-cover" />
                  <span className="absolute top-3 left-3 bg-[#017143] text-white text-xs px-2 py-1 rounded-md flex items-center gap-1"><BadgeCheck size={14} /> {v.badge}</span>
                  <button onClick={() => toggleFavorite(v.id)} className="absolute top-3 right-3">
                    <Heart size={18} className={`${isFavorite(v.id) ? 'text-red-500 fill-current' : ''}`} />
                  </button>
                </div>
                <p className="text-base sm:text-lg text-emerald-800 font-medium pb-2 pl-6 mt-10">{v.name}</p>
                <p className="text-gray-700 lg:text-base pl-6"><span className="text-yellow-500">★</span> {v.rating} ({v.reviews})</p>
                <div className="flex gap-2 mt-1 items-center">
                  <span className="pl-6 pb-2 text-base px-3 py-1 flex items-center gap-1"><MapPin size={14} className="text-emerald-700" />{v.location}</span>
                </div>
                <span className="bg-green-200 border border-green-300 rounded-lg text-xs px-3 py-1 mt-4 ml-6">{v.category}</span>
                <div className="mt-4 pl-6 pr-6">
                  <Link 
                    to={v.id === 1 ? "/Vendorpage1" : `/vendor/${v.id}`}
                    className="block bg-[#017143] text-white rounded-lg py-2 text-sm text-center"
                  >
                    View Vendor Page
                  </Link>
                </div>
              </div>
            ) : (
              <div key={v.id} className="flex gap-6 py-6 items-center">
                <img src={v.image} alt={v.name} className="w-40 h-40 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{v.name}</h3>
                      <p className="text-sm text-gray-600">{v.location} • <span className="text-yellow-500">★</span> {v.rating} ({v.reviews})</p>
                      <p className="mt-2 text-sm text-gray-700">{v.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => toggleFavorite(v.id)} className={`p-2 rounded ${isFavorite(v.id) ? 'bg-red-100 text-red-500' : 'bg-gray-100'}`}><Heart size={16} /></button>
                      <div className="text-emerald-700 font-bold">{v.sample.price}</div>
                      <Link 
                        to={v.id === 1 ? "/Vendorpage1" : `/vendor/${v.id}`}
                        className="bg-[#017143] text-white px-3 py-2 rounded text-sm text-center"
                      >
                        View Vendor Page
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorsPage;
