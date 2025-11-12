import { User, Store, Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"
import logo from "../assets/vendor.png";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAccount = () => {
  const [selectedRole, setSelectedRole] = useState("customer");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // vendor form state
  const [vendorForm, setVendorForm] = useState({
    vendorName: "",
    businessName: "",
    businessCategory: "",
    businessLocation: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // customer form state
  const [customerForm, setCustomerForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setVendorForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm(prev => ({ ...prev, [name]: value }));
  };

  const handleVendorSubmit = async (e) => {
    e.preventDefault();

    if (vendorForm.password !== vendorForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (vendorForm.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    console.log('Submitting vendor signup', vendorForm);
    setLoading(true);
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        vendorForm.email,
        vendorForm.password
      );

      const user = userCredential.user;
      console.log('Firebase user created:', user.uid);

      // Add vendor data to Firestore
      await setDoc(doc(db, "vendors", user.uid), {
        uid: user.uid,
        vendorName: vendorForm.vendorName,
        businessName: vendorForm.businessName,
        businessCategory: vendorForm.businessCategory,
        businessLocation: vendorForm.businessLocation,
        email: vendorForm.email,
        role: "vendor",
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log('Vendor data saved to Firestore');

      // Save user info to localStorage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        role: 'vendor',
        vendorName: vendorForm.vendorName,
        businessName: vendorForm.businessName
      }));

      toast.success("Vendor account created successfully!");
      
      // Navigate to vendor dashboard
      setTimeout(() => {
        navigate('/VendorDashboard');
      }, 1500);
    } catch (err) {
      console.error('vendor signup error', err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error("Email already in use. Please use a different email.");
      } else if (err.code === 'auth/weak-password') {
        toast.error("Password is too weak. Please use a stronger password.");
      } else if (err.code === 'auth/invalid-email') {
        toast.error("Invalid email address.");
      } else {
        toast.error(err.message || 'An error occurred during signup');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();

    if (customerForm.password !== customerForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (customerForm.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    console.log('Submitting customer signup', customerForm);
    setLoading(true);
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        customerForm.email,
        customerForm.password
      );

      const user = userCredential.user;
      console.log('Firebase user created:', user.uid);

      // Add customer data to Firestore
      await setDoc(doc(db, "customers", user.uid), {
        uid: user.uid,
        fullName: customerForm.fullName,
        email: customerForm.email,
        phoneNumber: customerForm.phoneNumber,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log('Customer data saved to Firestore');

      // Save user info to localStorage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        role: 'customer',
        fullName: customerForm.fullName,
        phoneNumber: customerForm.phoneNumber
      }));

      toast.success("Customer account created successfully!");
      
      // Navigate to product page
      setTimeout(() => {
        navigate('/product');
      }, 1500);
    } catch (err) {
      console.error('customer signup error', err);
      if (err.code === 'auth/email-already-in-use') {
        toast.error("Email already in use. Please use a different email.");
      } else if (err.code === 'auth/weak-password') {
        toast.error("Password is too weak. Please use a stronger password.");
      } else if (err.code === 'auth/invalid-email') {
        toast.error("Invalid email address.");
      } else {
        toast.error(err.message || 'An error occurred during signup');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2fcf6] flex items-center justify-center px-4">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
          Join JOS Vendor's Hub today
        </p>

        
                {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 bg-[#e8f9f0] rounded-full p-1 w-full max-w-md mx-auto">
        <button
            onClick={() => setSelectedRole("customer")}
            className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-l-full text-sm font-medium transition-all duration-300 ${
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
            className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-r-full text-sm font-medium transition-all duration-300 ${
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
          <form onSubmit={handleVendorSubmit} className="text-left space-y-4 animate-fadeIn">
            <div>
              <label className="block text-sm text-gray-700 mb-1 font-bold">
               Vendor Name
              </label>
              <input
                type="text"
                name="vendorName"
                value={vendorForm.vendorName}
                onChange={handleVendorChange}
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
                name="businessName"
                value={vendorForm.businessName}
                onChange={handleVendorChange}
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
                name="businessCategory"
                value={vendorForm.businessCategory}
                onChange={handleVendorChange}
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
                name="businessLocation"
                value={vendorForm.businessLocation}
                onChange={handleVendorChange}
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
                name="email"
                value={vendorForm.email}
                onChange={handleVendorChange}
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
                name="password"
                value={vendorForm.password}
                onChange={handleVendorChange}
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
                name="confirmPassword"
                value={vendorForm.confirmPassword}
                onChange={handleVendorChange}
                required
                placeholder="Confirm your password"
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-2 rounded-md mt-4 transition flex items-center justify-center gap-2"
            >
              {loading && <Loader size={16} className="animate-spin" />}
              {loading ? 'Creating Account...' : 'Create Vendor Account'}
            </button>
          </form>
        ) : (
          // ---------- Customer Form ----------
          <form onSubmit={handleCustomerSubmit} className="text-left space-y-4 animate-fadeIn">
            <div>
              <label className="block font-bold text-sm text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={customerForm.fullName}
                onChange={handleCustomerChange}
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
                name="email"
                value={customerForm.email}
                onChange={handleCustomerChange}
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
                name="phoneNumber"
                value={customerForm.phoneNumber}
                onChange={handleCustomerChange}
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
                name="password"
                value={customerForm.password}
                onChange={handleCustomerChange}
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
                name="confirmPassword"
                value={customerForm.confirmPassword}
                onChange={handleCustomerChange}
                required
                placeholder="Confirm your password"
                className="w-full px-4 py-1  bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-2 rounded-md mt-4 transition flex items-center justify-center gap-2"
            >
              {loading && <Loader size={16} className="animate-spin" />}
              {loading ? 'Creating Account...' : 'Create Customer Account'}
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="text-base text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/sign-up" className="text-green-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
