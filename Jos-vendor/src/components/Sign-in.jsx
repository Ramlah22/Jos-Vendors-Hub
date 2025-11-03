import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';


const SignInPage = () => {
  return (
    <div className="min-h-screen bg-[#f2fcf6] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-3xl border border-green-200 p-8 w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-700 p-4 rounded-md">
            <Mail className="text-white" size={32} />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-base text-gray-500 mb-8">Sign in to continue shopping</p>

        <form className="text-left">
          <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            required
            className="w-full mb-6 px-4 bg-gray-100 py-1 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="block font-bold text-sm text-gray-700 mb-2">Password</label>
          <input
            type="password"
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
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md transition"
          >
            Sign In
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
