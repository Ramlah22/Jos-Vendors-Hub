import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Star,
  Package,
  User,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  Eye,
  List,
  Plus,
  Filter
} from "lucide-react";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, vendor } = location.state || {};
  
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(product ? 'new-order' : 'my-orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    message: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
    preferredContactMethod: "message",
    paymentProof: null,
    paymentProofName: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setOrderDetails(prev => ({
        ...prev,
        customerName: parsedUser.name || "",
        customerEmail: parsedUser.email || ""
      }));
      
      // Load user's orders
      loadUserOrders(parsedUser.uid);
    }
    setLoading(false);
  }, []);

  const loadUserOrders = (userId) => {
    if (!userId) return;
    
    const q = query(
      collection(db, "orders"), 
      where("customerId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        ordersList.push({ 
          id: doc.id, 
          ...data,
          displayDate: data.createdAt ? data.createdAt.toDate().toLocaleDateString() : 'Unknown'
        });
      });
      // Sort by most recent first
      ordersList.sort((a, b) => (b.createdAt?.toDate() || new Date()) - (a.createdAt?.toDate() || new Date()));
      setOrders(ordersList);
    });

    return unsubscribe;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload only images (JPG, PNG, GIF) or PDF files");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setOrderDetails(prev => ({
          ...prev,
          paymentProof: event.target.result,
          paymentProofName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!orderDetails.customerName || !orderDetails.customerEmail) {
      toast.error("Please fill in your contact information");
      return;
    }

    if (!orderDetails.message.trim()) {
      toast.error("Please add a message about your inquiry");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order document in Firestore
      const orderData = {
        ...orderDetails,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category
        },
        vendor: {
          id: vendor.id,
          name: vendor.name,
          email: vendor.email,
          phone: vendor.phone
        },
        status: "inquiry_sent",
        createdAt: serverTimestamp(),
        customerId: user?.uid || null,
        // Include payment proof if uploaded
        paymentProof: orderDetails.paymentProof || null,
        paymentProofName: orderDetails.paymentProofName || null
      };

      await addDoc(collection(db, "orders"), orderData);
      
      toast.success("Your inquiry has been sent to the vendor!");
      
      // Reset form and switch to orders view
      setOrderDetails({
        quantity: 1,
        message: "",
        customerName: user?.name || "",
        customerEmail: user?.email || "",
        customerPhone: "",
        deliveryAddress: "",
        preferredContactMethod: "message",
        paymentProof: null,
        paymentProofName: ""
      });
      
      setActiveTab('my-orders');
      
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('my-orders')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'my-orders'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <List size={16} />
                  My Orders ({orders.length})
                </div>
              </button>
              {product && vendor && (
                <button
                  onClick={() => setActiveTab('new-order')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                    activeTab === 'new-order'
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Plus size={16} />
                    Contact Vendor
                  </div>
                </button>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'my-orders' ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Orders & Inquiries</h2>
                
                {/* Filter Buttons */}
                <div className="flex gap-2">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'inquiry_sent', label: 'New' },
                    { key: 'responded', label: 'Responded' },
                    { key: 'in_progress', label: 'In Progress' },
                    { key: 'completed', label: 'Completed' }
                  ].map((status) => (
                    <button
                      key={status.key}
                      onClick={() => setFilterStatus(status.key)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        filterStatus === status.key
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading your orders...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {filterStatus === 'all' ? 'No orders yet' : `No ${filterStatus} orders`}
                  </h3>
                  <p className="text-gray-600 mb-4">Start browsing products and contact vendors to see your orders here.</p>
                  <button
                    onClick={() => navigate('/product')}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-gray-900">Order #{order.id.slice(0, 8)}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'inquiry_sent' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'responded' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status === 'inquiry_sent' ? 'New Inquiry' : 
                               order.status === 'responded' ? 'Vendor Responded' :
                               order.status === 'in_progress' ? 'In Progress' :
                               order.status === 'completed' ? 'Completed' : order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar size={14} />
                            {order.displayDate}
                          </p>
                        </div>
                      </div>

                      {/* Product Info */}
                      {order.product && (
                        <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                          <img 
                            src={order.product.image} 
                            alt={order.product.name}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.target.src = '/placeholder-image.jpg';
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{order.product.name}</h4>
                            <p className="text-sm text-gray-600">{order.product.category}</p>
                            <p className="text-emerald-600 font-semibold">{order.product.price}</p>
                            {order.quantity > 1 && (
                              <p className="text-xs text-gray-500">Quantity: {order.quantity}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Vendor Info */}
                      {order.vendor && (
                        <div className="mb-4 p-3 bg-blue-50 rounded">
                          <p className="text-sm font-medium text-gray-700 mb-1">Vendor:</p>
                          <p className="text-gray-900 font-medium">{order.vendor.name}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            {order.vendor.email && (
                              <a href={`mailto:${order.vendor.email}`} className="hover:text-emerald-600 flex items-center gap-1">
                                <Mail size={12} />
                                {order.vendor.email}
                              </a>
                            )}
                            {order.vendor.phone && (
                              <a href={`tel:${order.vendor.phone}`} className="hover:text-emerald-600 flex items-center gap-1">
                                <Phone size={12} />
                                {order.vendor.phone}
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Customer Message */}
                      {order.message && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-2">Your Message:</p>
                          <p className="text-gray-800">{order.message}</p>
                        </div>
                      )}

                      {/* Payment Proof */}
                      {order.paymentProof && (
                        <div className="mb-4 p-4 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <FileText size={14} />
                            Payment Proof:
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">{order.paymentProofName}</span>
                            <button 
                              onClick={() => window.open(order.paymentProof, '_blank')}
                              className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm"
                            >
                              <Eye size={14} />
                              View
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="text-xs text-gray-500 pt-3 border-t border-gray-200">
                        Contact: {order.customerName} • {order.customerEmail}
                        {order.customerPhone && ` • ${order.customerPhone}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : product && vendor ? (
            // New Order Tab Content
            <div className="p-6">
              <div className="bg-emerald-600 text-white p-6 rounded-lg mb-6">
                <h1 className="text-2xl font-bold mb-2">Contact Vendor</h1>
                <p className="opacity-90">Send an Order to the vendor</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Information */}
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Package className="text-emerald-600" size={20} />
                      Product Details
                    </h3>
                    
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.target.src = '/placeholder-product.jpg';
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                        <p className="text-lg font-bold text-emerald-600 mt-2">₦{product.price}</p>
                        {product.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Vendor Information */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="text-emerald-600" size={20} />
                      Vendor Details
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-12 h-12 object-cover rounded-full border border-gray-200"
                          onError={(e) => {
                            e.target.src = '/placeholder-vendor.jpg';
                          }}
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-400 fill-current" size={16} />
                            <span className="text-sm text-gray-600">{vendor.rating} ({vendor.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                        {vendor.location && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            {vendor.location}
                          </div>
                        )}
                        {vendor.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={16} />
                            {vendor.email}
                          </div>
                        )}
                        {vendor.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={16} />
                            {vendor.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Form */}
                <div>
                  <form onSubmit={handleSubmitOrder} className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageSquare className="text-emerald-600" size={20} />
                      Your Inquiry
                    </h3>

                    {/* Customer Information */}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          value={orderDetails.customerName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="customerEmail"
                          value={orderDetails.customerEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="customerPhone"
                          value={orderDetails.customerPhone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity Interested In
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={orderDetails.quantity}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Address (Optional)
                      </label>
                      <textarea
                        name="deliveryAddress"
                        value={orderDetails.deliveryAddress}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter delivery address if applicable"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message to Vendor *
                      </label>
                      <textarea
                        name="message"
                        value={orderDetails.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Tell the vendor what you're interested in, ask questions about the product, pricing, availability, etc."
                      />
                    </div>

                    {/* Payment Proof Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Proof (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-400 transition">
                        {orderDetails.paymentProof ? (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-emerald-600">
                              <FileText size={20} />
                              <span className="text-sm font-medium">{orderDetails.paymentProofName}</span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => window.open(orderDetails.paymentProof, '_blank')}
                                className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1"
                              >
                                <Eye size={14} />
                                Preview
                              </button>
                              <button
                                type="button"
                                onClick={() => setOrderDetails(prev => ({ ...prev, paymentProof: null, paymentProofName: "" }))}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <div className="flex flex-col items-center">
                              <label className="cursor-pointer bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                                <span>Choose File</span>
                                <input
                                  type="file"
                                  onChange={handleFileUpload}
                                  accept="image/*,.pdf"
                                  className="hidden"
                                />
                              </label>
                              <p className="text-xs text-gray-500 mt-2">
                                Upload receipt, bank transfer proof, or payment confirmation
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Supports: JPG, PNG, GIF, PDF (Max 5MB)
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        name="preferredContactMethod"
                        value={orderDetails.preferredContactMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="message">Message through platform</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone call</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Sending Inquiry...
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            Send Inquiry to Vendor
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-xs text-gray-500 text-center">
                      By sending this inquiry, you agree to share your contact information with the vendor.
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            // Fallback if no product/vendor data
            <div className="p-6 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Product Selected</h3>
              <p className="text-gray-600 mb-4">Please select a product to contact the vendor.</p>
              <button
                onClick={() => navigate('/product')}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
              >
                Browse Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;