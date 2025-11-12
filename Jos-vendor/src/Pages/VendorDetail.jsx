import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Heart, 
  ShoppingCart, 
  Grid, 
  List, 
  Search,
  Filter,
  BadgeCheck,
  Clock,
  Users,
  Award,
  Share2,
  MessageCircle,
  Calendar,
  Building,
  Loader
} from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import Header from '../components/Header';

const VendorDetail = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Fetch vendor details
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const vendorDoc = await getDoc(doc(db, 'vendors', vendorId));
        if (vendorDoc.exists()) {
          const vendorData = {
            id: vendorDoc.id,
            ...vendorDoc.data(),
            // Format the data similar to how we did in VendorPage
            name: vendorDoc.data().businessName || vendorDoc.data().vendorName || 'Unknown Business',
            description: vendorDoc.data().businessDescription || vendorDoc.data().description || 'Quality products and services',
            location: vendorDoc.data().businessLocation || vendorDoc.data().location || 'Jos, Nigeria',
            image: vendorDoc.data().photoData || '/placeholder-vendor.jpg',
            joinDate: vendorDoc.data().createdAt ? vendorDoc.data().createdAt.toDate().toLocaleDateString() : 'Recently Joined',
            rating: vendorDoc.data().rating || (4.0 + Math.random() * 1.0).toFixed(1),
            reviews: vendorDoc.data().reviews || Math.floor(Math.random() * 200) + 50,
            totalProducts: vendorDoc.data().totalProducts || 0,
            totalSales: vendorDoc.data().totalSales || Math.floor(Math.random() * 1000) + 100,
            badge: vendorDoc.data().badge || 'Verified'
          };
          setVendor(vendorData);
        } else {
          console.error('Vendor not found');
          navigate('/vendors');
        }
      } catch (error) {
        console.error('Error fetching vendor:', error);
        navigate('/vendors');
      } finally {
        setLoading(false);
      }
    };

    if (vendorId) {
      fetchVendor();
    }
  }, [vendorId, navigate]);

  // Fetch vendor's products
  useEffect(() => {
    if (!vendorId) return;

    const q = query(
      collection(db, 'products'),
      where('vendorId', '==', vendorId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsList = [];
      snapshot.forEach((doc) => {
        productsList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setProducts(productsList);
      setProductsLoading(false);
    }, (error) => {
      console.error('Error fetching vendor products:', error);
      setProductsLoading(false);
    });

    return () => unsubscribe();
  }, [vendorId]);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm || 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return a.name?.localeCompare(b.name || '') || 0;
    }
  });

  // Get product categories
  const productCategories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <Loader className="animate-spin h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading vendor details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">Vendor not found</p>
          <Link to="/vendors" className="text-emerald-600 hover:text-emerald-700 mt-4 inline-block">
            Back to Vendors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <button 
          onClick={() => navigate('/vendors')}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Vendors</span>
        </button>
      </div>

      {/* Vendor Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Vendor Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-vendor.jpg';
                  }}
                />
              </div>
            </div>

            {/* Vendor Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{vendor.name}</h1>
                    {vendor.badge && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        vendor.badge === 'Verified' ? 'bg-blue-100 text-blue-800' :
                        vendor.badge === 'Top Seller' ? 'bg-yellow-100 text-yellow-800' :
                        vendor.badge === 'Featured' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        <BadgeCheck size={12} />
                        {vendor.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{vendor.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} className="text-emerald-600" />
                      <span>{vendor.location}</span>
                    </div>
                    
                    {vendor.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} className="text-emerald-600" />
                        <span>{vendor.phone}</span>
                      </div>
                    )}
                    
                    {vendor.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} className="text-emerald-600" />
                        <span>{vendor.email}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} className="text-emerald-600" />
                      <span>Joined {vendor.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => toggleFavorite(vendor.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                      isFavorite(vendor.id) 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600'
                    }`}
                  >
                    <Heart size={16} fill={isFavorite(vendor.id) ? 'currentColor' : 'none'} />
                    <span>{isFavorite(vendor.id) ? 'Favorited' : 'Add to Favorites'}</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                    <MessageCircle size={16} />
                    <span>Contact Vendor</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition">
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{vendor.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{vendor.reviews} Reviews</p>
                </div>

                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-1">{products.length}</div>
                  <p className="text-sm text-gray-600">Products</p>
                </div>

                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-1">{vendor.totalSales}+</div>
                  <p className="text-sm text-gray-600">Sales</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award size={16} className="text-emerald-600" />
                    <span className="font-semibold text-gray-900">4.8</span>
                  </div>
                  <p className="text-sm text-gray-600">Service Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'products'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'about'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'reviews'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({vendor.reviews})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'products' && (
            <div>
              {/* Products Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Vendor Products</h2>
                  <p className="text-gray-600">{filteredProducts.length} products available</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {productCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition ${
                        viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition ${
                        viewMode === 'list' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Loading */}
              {productsLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-center">
                    <Loader className="animate-spin h-8 w-8 text-emerald-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading products...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Products Grid/List */}
                  {filteredProducts.length > 0 ? (
                    <div className={viewMode === 'grid' 
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                      : 'space-y-4'
                    }>
                      {filteredProducts.map(product => (
                        <div 
                          key={product.id} 
                          className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden ${
                            viewMode === 'list' ? 'flex gap-4 p-4' : ''
                          }`}
                        >
                          {/* Product Image */}
                          <div className={viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square'}>
                            <img
                              src={product.image || '/placeholder-product.jpg'}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/placeholder-product.jpg';
                              }}
                            />
                          </div>

                          {/* Product Info */}
                          <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-lg font-bold text-emerald-600">
                                  ₦{(product.price || 0).toLocaleString()}
                                </span>
                                {product.originalPrice && product.originalPrice > product.price && (
                                  <span className="text-sm text-gray-500 line-through ml-2">
                                    ₦{product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              
                              <button
                                onClick={() => addToCart(product)}
                                className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition"
                              >
                                <ShoppingCart size={16} />
                              </button>
                            </div>

                            {product.rating && (
                              <div className="flex items-center gap-1 mt-2">
                                <Star size={14} className="text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">{product.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="text-gray-400 mb-4">
                        <ShoppingCart size={48} className="mx-auto" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
                      <p className="text-gray-600">
                        {searchTerm || selectedCategory !== 'All' 
                          ? 'Try adjusting your search or filters' 
                          : 'This vendor hasn\'t added any products yet'
                        }
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {vendor.name}</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{vendor.description}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-gray-700">{vendor.location}</span>
                      </div>
                      {vendor.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-gray-700">{vendor.phone}</span>
                        </div>
                      )}
                      {vendor.email && (
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-gray-700">{vendor.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Business Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-700">Joined {vendor.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-gray-400" />
                        <span className="text-gray-700">{vendor.category || 'General Business'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-gray-700">{vendor.totalSales}+ satisfied customers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h2>
              
              {/* Review Summary */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{vendor.rating}</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${i < Math.floor(vendor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">{vendor.reviews} reviews</div>
                </div>

                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-4">{rating}</span>
                      <Star size={12} className="text-gray-300" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ 
                            width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                {[
                  {
                    name: "Sarah Johnson",
                    rating: 5,
                    date: "2 days ago",
                    comment: "Excellent service and high-quality products! Fast delivery and great customer support.",
                    verified: true
                  },
                  {
                    name: "Mike Chen",
                    rating: 4,
                    date: "1 week ago", 
                    comment: "Good products overall. Delivery was a bit delayed but the quality made up for it.",
                    verified: true
                  },
                  {
                    name: "Emma Davis",
                    rating: 5,
                    date: "2 weeks ago",
                    comment: "Amazing experience! Will definitely order again. Highly recommended!",
                    verified: false
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 font-semibold text-sm">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{review.name}</span>
                            {review.verified && (
                              <BadgeCheck size={14} className="text-emerald-600" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={12} 
                                  className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDetail;