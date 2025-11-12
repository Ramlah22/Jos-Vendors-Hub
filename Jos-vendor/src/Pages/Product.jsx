import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/vendor.png";
import { Filter, MessageCircle, LogOut, User, Search, Shirt, Gem, Headphones, Home, Smartphone, Coffee, Heart, Dumbbell, BookOpen, Gamepad2, Store, Grid3X3 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

export default function Product() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to handle contacting vendor
  const handleContactVendor = (product) => {
    // Create vendor object with available data
    const vendorInfo = {
      id: product.vendorId || 'unknown-vendor',
      name: product.vendorName || 'Unknown Vendor',
      email: product.vendorEmail || '',
      phone: product.vendorPhone || '',
      location: product.vendorLocation || 'Location not specified',
      image: product.vendorImage || '/placeholder-vendor.jpg',
      rating: product.vendorRating || 4.5,
      reviews: product.vendorReviews || Math.floor(Math.random() * 100) + 10
    };

    // Navigate to order page with product and vendor data
    navigate('/order', {
      state: {
        product: product,
        vendor: vendorInfo
      }
    });
  };

  // All available categories with icons
  const allCategories = [
    { name: "All Categories", icon: Grid3X3 },
    { name: "Clothing", icon: Shirt },
    { name: "Jewelry", icon: Gem }, 
    { name: "Accessories", icon: Headphones },
    { name: "Home Decor", icon: Home },
    { name: "Electronics", icon: Smartphone },
    { name: "Food & Beverages", icon: Coffee },
    { name: "Beauty & Health", icon: Heart },
    { name: "Sports & Fitness", icon: Dumbbell },
    { name: "Books & Media", icon: BookOpen },
    { name: "Toys & Games", icon: Gamepad2 },
    { name: "Other", icon: Store }
  ];

  // Fetch all products from Firestore
  useEffect(() => {
    const q = query(
      collection(db, "products"), 
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        productsList.push({ 
          id: doc.id, 
          ...data,
          // Convert price to display format
          price: `₦${data.price?.toLocaleString() || '0'}`,
          // Use imageUrl from Firestore (base64 or URL)
          image: data.imageUrl || '/placeholder-image.jpg',
          // Default rating if not available
          rating: data.rating || 4.5,
          reviews: data.reviews || Math.floor(Math.random() * 100) + 10,
          // Add badge for new products (created within last 7 days)
          badge: data.createdAt && data.createdAt.toDate && 
                 (new Date() - data.createdAt.toDate()) < 7 * 24 * 60 * 60 * 1000 
                 ? "New" : null
        });
      });
      setProducts(productsList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter products based on search and category
  const filtered = products.filter((p) => {
    const matchesSearch = !search || 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.vendorName?.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

        {/* Banner */}
      <div className="bg-emerald-700 py-8 sm:py-10 lg:py-14 text-center text-white px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Discover All Products</h2>
        <p className="opacity-90 text-sm sm:text-base mt-2">
          Browse our complete collection of high-quality products from verified vendors
        </p>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, vendors, or categories..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <span className="text-gray-400 hover:text-gray-600 text-lg">×</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                <Filter size={16} />
                <span className="text-sm">Toggle Filters</span>
              </button>
            </div>
            
            {/* Desktop Categories - Always visible */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {allCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.name;
                  const productCount = category.name === 'All Categories' 
                    ? products.length 
                    : products.filter(p => p.category === category.name).length;
                  
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        isSelected 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                          : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                      }`}
                    >
                      <Icon size={20} className={`mx-auto mb-2 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                      <div className="text-xs font-medium">{category.name}</div>
                      {productCount > 0 && (
                        <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                          ({productCount})
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Categories - Collapsible */}
            {showFilters && (
              <div className="lg:hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allCategories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.name;
                    
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`p-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${
                          isSelected 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <Icon size={16} />
                        <span className="truncate">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              {search ? (
                <span>Search results for <strong>"{search}"</strong></span>
              ) : (
                <span>
                  {selectedCategory === 'All Categories' ? 'All Products' : selectedCategory}
                </span>
              )}
            </div>
            <div>
              <span className="font-medium">{filtered.length}</span> products found
            </div>
          </div>
        </div>
      </div>

    

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <span className="ml-4 text-gray-600 text-lg">Loading products...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <Store size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {search ? "No products found" : "No products available"}
              </h3>
              <p className="text-gray-500">
                {search 
                  ? `Try adjusting your search term or browse other categories`
                  : `No products available in ${selectedCategory}`
                }
              </p>
            </div>
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All Categories");
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="rounded-xl overflow-hidden bg-white shadow border border-green-200 hover:shadow-xl hover:border-green-300 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded-md">
                      {product.badge}
                    </span>
                  )}

                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Heart icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                    <span>♡</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="text-lg text-emerald-800 font-medium line-clamp-2 mb-1">
                      {product.name}
                    </h4>
                    {product.vendorName && (
                      <p className="text-xs text-gray-500">by {product.vendorName}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="text-gray-700">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-emerald-700 text-lg font-semibold">{product.price}</span>
                      {product.stock && (
                        <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button 
                      onClick={() => handleContactVendor(product)}
                      className="flex-1 flex items-center justify-center gap-1 text-sm px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                      <MessageCircle size={14} />
                      Contact Vendor
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="px-3 py-2 border border-emerald-600 text-emerald-600 rounded-lg text-sm hover:bg-emerald-50 transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
