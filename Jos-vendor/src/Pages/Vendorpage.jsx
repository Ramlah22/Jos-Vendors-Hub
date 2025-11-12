import React, { useState, useEffect } from "react";
import logo from "../assets/vendor.png";
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
  Phone,
  Mail,
  Calendar,
  Star,
  User,
  Building,
  Loader
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const VendorsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategories, setShowCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [badgeFilter, setBadgeFilter] = useState('All');
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, items } = useCart();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  // Fetch vendors from Firestore
  useEffect(() => {
    const q = query(collection(db, "vendors"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const vendorsList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        vendorsList.push({ 
          id: doc.id, 
          ...data,
          // Generate default rating and reviews if not available
          rating: data.rating || (4.0 + Math.random() * 1.0).toFixed(1),
          reviews: data.reviews || Math.floor(Math.random() * 200) + 50,
          // Use businessCategory as category or generate one based on business type
          category: data.businessCategory || data.category || 'General',
          // Format business name
          name: data.businessName || data.vendorName || 'Unknown Business',
          // Use business description or create one
          description: data.businessDescription || data.description || 'Quality products and services',
          // Use business location
          location: data.businessLocation || data.location || 'Jos, Nigeria',
          // Generate badge based on created date or set default
          badge: data.badge || (data.createdAt && data.createdAt.toDate && 
                 (new Date() - data.createdAt.toDate()) < 30 * 24 * 60 * 60 * 1000 
                 ? "New" : "Verified"),
          // Use photoData as image
          image: data.photoData || '/placeholder-vendor.jpg',
          // Format join date
          joinDate: data.createdAt ? data.createdAt.toDate().toLocaleDateString() : 'Recently Joined',
          // Contact information
          email: data.email || '',
          phone: data.phone || '',
          // Additional vendor details
          uid: data.uid || doc.id
        });
      });
      setVendors(vendorsList);
      setLoading(false);
      console.log("Fetched vendors:", vendorsList);
    }, (error) => {
      console.error("Error fetching vendors:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Get unique categories from vendors with some defaults
  const vendorCategories = Array.from(new Set((vendors || []).map(v => v.category).filter(Boolean)));
  const defaultCategories = ['General', 'Clothing', 'Electronics', 'Food & Beverages', 'Beauty & Health', 'Home Decor'];
  const categories = ['All', 'Favorites', ...new Set([...vendorCategories, ...defaultCategories])];

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Header */}
      <Header />

                 {/* Hero Banner */}
      <div className="bg-emerald-700 py-12 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Discover Amazing Vendors</h1>
          <p className="text-xl opacity-90">
            Connect with verified vendors across different categories and find exactly what you need
          </p>
          {searchTerm && (
            <p className="mt-4 text-lg">
              Showing results for <span className="font-semibold">"{searchTerm}"</span>
            </p>
          )}
        </div>
      </div>

      {/* Additional Vendor Page Actions */}
      <div className="w-full flex items-center justify-end pt-4 pr-6 gap-4">
        <Link to="/product" className="border border-green-300 text-green-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 text-sm">
          My Orders
        </Link>

        <button onClick={() => setSelectedCategory('Favorites')} className="border border-green-300 text-green-800 font-semibold px-4 py-2 rounded-lg flex gap-2 items-center hover:bg-gray-100 text-sm">
          <Heart size={16} /> Favorites ({favorites.length})
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search vendors by name, location, or business type..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <span className="text-gray-400 hover:text-gray-600 text-lg">×</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                <Filter size={16} />
                <span className="text-sm">Filters</span>
              </button>
              
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
              >
                <Grid size={16} />
                <span className="text-sm">Categories</span>
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">View:</span>
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('rows')} 
                className={`p-2 rounded-lg transition ${viewMode === 'rows' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Rows size={16} />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilterPanel && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Minimum Rating</label>
                  <select 
                    value={minRating} 
                    onChange={(e) => setMinRating(Number(e.target.value))} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Badge</label>
                  <select 
                    value={badgeFilter} 
                    onChange={(e) => setBadgeFilter(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="All">All Badges</option>
                    <option value="Verified">Verified</option>
                    <option value="Top Seller">Top Seller</option>
                    <option value="Featured">Featured</option>
                    <option value="New">New</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button 
                  onClick={() => { 
                    setMinRating(0); 
                    setBadgeFilter('All'); 
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }} 
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setShowFilterPanel(false)} 
                  className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Categories */}
          {showCategories && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { key: 'All', icon: Grid },
                  { key: 'Clothing', icon: ShoppingBag },
                  { key: 'Electronics', icon: Smartphone },
                  { key: 'Home Decor', icon: Home },
                  { key: 'Beauty & Health', icon: Droplet },
                  { key: 'Sports & Fitness', icon: Activity },
                  { key: 'Books & Media', icon: Book },
                  { key: 'Food & Beverages', icon: Coffee },
                  { key: 'Toys & Games', icon: Gift },
                ].map((c) => {
                  const Icon = c.icon;
                  const count = c.key === 'All' ? (vendors || []).length : (vendors || []).filter(v => v.category === c.key).length;
                  return (
                    <button 
                      key={c.key} 
                      onClick={() => { 
                        setSelectedCategory(c.key);
                        setShowCategories(false);
                      }} 
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg text-center transition ${
                        selectedCategory === c.key 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                      }`}
                    >
                      <Icon size={20} />
                      <div className="text-xs font-medium">{c.key}</div>
                      {count > 0 && <div className="text-xs opacity-75">({count})</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader className="animate-spin h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Loading vendors...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {selectedCategory === 'All' ? 'All Vendors' : `${selectedCategory} Vendors`}
              </h2>
              <p className="text-gray-600">
                {(vendors || []).filter(vendor => {
                  const matchesSearch = !searchTerm || 
                    vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vendor.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vendor.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vendor.category?.toLowerCase().includes(searchTerm.toLowerCase());
                  
                  const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
                  const matchesRating = !minRating || vendor.rating >= minRating;
                  const matchesBadge = badgeFilter === 'All' || vendor.badge === badgeFilter;
                  const matchesFavorites = selectedCategory !== 'Favorites' || isFavorite(vendor.id);
                  
                  return matchesSearch && matchesCategory && matchesRating && matchesBadge && matchesFavorites;
                }).length} vendors found
              </p>
            </div>

            {/* Vendors Grid/List */}
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
              {(vendors || [])
                .filter(vendor => {
                  const matchesSearch = !searchTerm || 
                    vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vendor.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vendor.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vendor.category?.toLowerCase().includes(searchTerm.toLowerCase());
                  
                  const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
                  const matchesRating = !minRating || vendor.rating >= minRating;
                  const matchesBadge = badgeFilter === 'All' || vendor.badge === badgeFilter;
                  const matchesFavorites = selectedCategory !== 'Favorites' || isFavorite(vendor.id);
                  
                  return matchesSearch && matchesCategory && matchesRating && matchesBadge && matchesFavorites;
                })
                .map((vendor) => (
                  viewMode === 'grid' ? (
                    <div key={vendor.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Vendor Image */}
                      <div className="relative h-48">
                        <img 
                          src={vendor.image} 
                          alt={vendor.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-vendor.jpg';
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                            <BadgeCheck size={12} />
                            {vendor.badge}
                          </span>
                        </div>
                        <button 
                          onClick={() => toggleFavorite(vendor.id)} 
                          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
                        >
                          <Heart 
                            size={16} 
                            className={`${isFavorite(vendor.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                          />
                        </button>
                      </div>

                      {/* Vendor Info */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{vendor.name}</h3>
                          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                            {vendor.category}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium text-gray-700">{vendor.rating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{vendor.reviews} reviews</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-600">{vendor.location}</span>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 mb-4">
                          {vendor.email && (
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600">{vendor.email}</span>
                            </div>
                          )}
                          {vendor.phone && (
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600">{vendor.phone}</span>
                            </div>
                          )}
                          {vendor.joinDate && (
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-sm text-gray-600">Joined {vendor.joinDate}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {vendor.description}
                        </p>

                        {/* Action Button */}
                        <Link
                          to={`/vendor/${vendor.id}`}
                          className="block w-full bg-emerald-600 text-white text-center py-2 px-4 rounded-lg hover:bg-emerald-700 transition font-medium"
                        >
                          Visit Store
                        </Link>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div key={vendor.id} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="p-6">
                        <div className="flex gap-6">
                          {/* Vendor Image */}
                          <div className="relative">
                            <img 
                              src={vendor.image} 
                              alt={vendor.name} 
                              className="w-24 h-24 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.src = '/placeholder-vendor.jpg';
                              }}
                            />
                            <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                              {vendor.badge}
                            </span>
                          </div>

                          {/* Vendor Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{vendor.name}</h3>
                                <div className="flex items-center gap-4 mb-2">
                                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                                    {vendor.category}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Star size={14} className="text-yellow-400 fill-current" />
                                    <span className="text-sm font-medium text-gray-700">{vendor.rating}</span>
                                    <span className="text-sm text-gray-500">({vendor.reviews})</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 mb-2">
                                  <MapPin size={14} className="text-gray-400" />
                                  <span className="text-sm text-gray-600">{vendor.location}</span>
                                </div>

                                <p className="text-gray-600 text-sm mb-3 line-clamp-2 max-w-md">
                                  {vendor.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm">
                                  {vendor.email && (
                                    <div className="flex items-center gap-1">
                                      <Mail size={12} className="text-gray-400" />
                                      <span className="text-gray-600">{vendor.email}</span>
                                    </div>
                                  )}
                                  {vendor.phone && (
                                    <div className="flex items-center gap-1">
                                      <Phone size={12} className="text-gray-400" />
                                      <span className="text-gray-600">{vendor.phone}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex flex-col items-end gap-3">
                                <button 
                                  onClick={() => toggleFavorite(vendor.id)} 
                                  className={`p-2 rounded-full transition ${
                                    isFavorite(vendor.id) ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                  }`}
                                >
                                  <Heart size={16} className={isFavorite(vendor.id) ? 'fill-current' : ''} />
                                </button>

                                <Link
                                  to={`/vendor/${vendor.id}`}
                                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-medium"
                                >
                                  Visit Store
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
            </div>

            {/* Empty State */}
            {(vendors || []).filter(vendor => {
              const matchesSearch = !searchTerm || 
                vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.category?.toLowerCase().includes(searchTerm.toLowerCase());
              
              const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
              const matchesRating = !minRating || vendor.rating >= minRating;
              const matchesBadge = badgeFilter === 'All' || vendor.badge === badgeFilter;
              const matchesFavorites = selectedCategory !== 'Favorites' || isFavorite(vendor.id);
              
              return matchesSearch && matchesCategory && matchesRating && matchesBadge && matchesFavorites;
            }).length === 0 && (
              <div className="text-center py-16">
                <User size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No vendors found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? `No vendors match your search for "${searchTerm}"`
                    : `No vendors available in ${selectedCategory === 'Favorites' ? 'your favorites' : selectedCategory}`
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setMinRating(0);
                    setBadgeFilter("All");
                  }}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VendorsPage;
