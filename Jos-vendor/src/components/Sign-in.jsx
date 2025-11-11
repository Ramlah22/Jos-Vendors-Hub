import { Mail, Lock, Loader, User, Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const SignInPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log('Submitting login', loginForm, 'as', selectedRole);
    setLoading(true);
    try {
      const res = await fetch("https://vending-n63r.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
          role: selectedRole
        })
      });

      console.log(res);

      const data = await res.json();
      console.log('login response', res.status, data);
      if (!res.ok) {
        setError(data.message || (data.errors && data.errors[0] && data.errors[0].msg) || 'Login failed');
        setLoading(false);
        return;
      }

      // Save token and user to localStorage
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

      // Role-based redirect - check selected role or returned role
      const userRole = data.user?.role || selectedRole;
      if (userRole === 'vendor') {
        console.log('Redirecting to vendor dashboard');
        navigate('/VendorDashboard');
      } else {
        console.log('Redirecting to product page');
        navigate('/product');
      }
    } catch (err) {
      console.error('login error', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2fcf6] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-3xl border border-green-200 p-8 w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-700 p-4 rounded-md">
            <Mail className="text-white" size={32} />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-base text-gray-500 mb-6">Sign in to continue shopping</p>

        {/* Role Toggle Buttons */}
        <div className="flex justify-center mb-6 bg-[#e8f9f0] rounded-full p-1 w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setSelectedRole("customer")}
            className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedRole === "customer"
                ? "bg-green-700 text-white"
                : "text-gray-600"
            }`}
          >
            <User size={16} />
            Customer
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("vendor")}
            className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedRole === "vendor"
                ? "bg-green-700 text-white"
                : "text-gray-600"
            }`}
          >
            <Store size={16} />
            Vendor
          </button>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="text-left">
          <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={loginForm.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="w-full mb-6 px-4 bg-gray-100 py-1 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block font-bold text-sm text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full mb-6 px-4 py-1 bg-gray-100 border border-green-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2 border-2 border-green-200 bg-gray-100" />
              Remember me
            </label>
            <a href="#" className="text-sm text-green-700 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-2 rounded-md transition flex items-center justify-center gap-2"
          >
            {loading && <Loader size={16} className="animate-spin" />}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-base text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link to="/create-account" className="text-green-700 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
