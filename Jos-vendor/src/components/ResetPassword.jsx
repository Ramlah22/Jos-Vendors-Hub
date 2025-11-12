import { Mail, Loader, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      
      console.log('Password reset email sent to:', email);
      setEmailSent(true);
      toast.success("Password reset email sent! Check your inbox.");
      
      // Optionally redirect to sign-in after a delay
      setTimeout(() => {
        navigate('/sign-up');
      }, 5000);
    } catch (err) {
      console.error('password reset error', err);
      if (err.code === 'auth/user-not-found') {
        toast.error("No account found with this email address.");
      } else if (err.code === 'auth/invalid-email') {
        toast.error("Invalid email address.");
      } else if (err.code === 'auth/too-many-requests') {
        toast.error("Too many attempts. Please try again later.");
      } else {
        toast.error(err.message || 'Failed to send reset email');
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
      <div className="bg-white shadow-lg rounded-3xl border border-green-200 p-8 w-full max-w-md text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-green-700 p-4 rounded-md">
            <Mail className="text-white" size={32} />
          </div>
        </div>

        {/* Headings */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {emailSent ? "Check Your Email" : "Reset Password"}
        </h2>
        <p className="text-base text-gray-500 mb-6">
          {emailSent 
            ? `We've sent a password reset link to ${email}` 
            : "Enter your email address and we'll send you a link to reset your password"}
        </p>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="text-left">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="w-full mb-6 px-4 bg-gray-100 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-2 rounded-md transition flex items-center justify-center gap-2 mb-4"
            >
              {loading && <Loader size={16} className="animate-spin" />}
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <Link 
              to="/sign-in" 
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-md transition flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 text-left">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Next steps:</strong>
              </p>
              <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                <li>Check your email inbox</li>
                <li>Click the reset link in the email</li>
                <li>Create a new password</li>
                <li>Sign in with your new password</li>
              </ol>
            </div>

            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={() => setEmailSent(false)}
                className="text-green-700 hover:underline font-medium"
              >
                try again
              </button>
            </p>

            <Link 
              to="/sign-ip" 
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md transition flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>
        )}

        <p className="text-base text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/create-account" className="text-green-700 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
