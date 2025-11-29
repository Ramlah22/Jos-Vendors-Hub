import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  Package, 
  Truck, 
  Shield, 
  Heart,
  Share2,
  MessageCircle,
  Store,
  Tag,
  Ruler,
  Weight,
  Palette
} from "lucide-react";
import Header from "../components/Header";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({
            id: docSnap.id,
            ...data,
            // Format data for display
            formattedPrice: `₦${data.price?.toLocaleString() || '0'}`,
            rating: data.rating || 4.5,
            reviews: data.reviews || Math.floor(Math.random() * 100) + 10,
            // Handle multiple images (for future enhancement)
            images: data.imageUrl ? [data.imageUrl] : ['/placeholder-image.jpg'],
            // Format tags
            tagsList: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
          });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Navigate to feature not implemented page
    navigate('/feature-not-implemented');
  };

  const handleContactVendor = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Product Navigation */}
      <div className="bg-white border-b top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Back</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition ${
                  isFavorite ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl overflow-hidden border">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </div>
            
            {/* Thumbnail images (for future multiple images feature) */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.category && (
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
                {product.stock > 0 && product.stock <= 10 && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Low Stock
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Vendor Info */}
              {product.vendorName && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Store size={16} />
                  <span>Sold by <span className="font-medium text-emerald-600">{product.vendorName}</span></span>
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  {product.formattedPrice}
                </div>
                {product.stock > 0 && (
                  <div className="text-sm text-gray-600">
                    {product.stock} units available
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {product.brand && (
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Brand: <span className="font-medium">{product.brand}</span></span>
                  </div>
                )}
                
                {product.sku && (
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">SKU: <span className="font-medium">{product.sku}</span></span>
                  </div>
                )}
                
                {product.weight && (
                  <div className="flex items-center gap-2">
                    <Weight size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Weight: <span className="font-medium">{product.weight} kg</span></span>
                  </div>
                )}
                
                {product.dimensions && (
                  <div className="flex items-center gap-2">
                    <Ruler size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Dimensions: <span className="font-medium">{product.dimensions} cm</span></span>
                  </div>
                )}
                
                {product.color && (
                  <div className="flex items-center gap-2">
                    <Palette size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Color: <span className="font-medium">{product.color}</span></span>
                  </div>
                )}
                
                {product.material && (
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Material: <span className="font-medium">{product.material}</span></span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Tags */}
            {product.tagsList && product.tagsList.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tagsList.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Section */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <div className="text-sm text-gray-600">
                  {quantity > 1 && (
                    <span>Total: <span className="font-semibold text-emerald-600">
                      ₦{(product.price * quantity).toLocaleString()}
                    </span></span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || quantity > product.stock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition ${
                    product.stock === 0 || quantity > product.stock
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                
                <button
                  onClick={handleContactVendor}
                  className="flex items-center justify-center gap-2 py-3 px-6 border border-emerald-600 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition"
                >
                  <MessageCircle size={20} />
                  Contact Vendor
                </button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield size={16} className="text-green-500" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck size={16} className="text-blue-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package size={16} className="text-purple-500" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
