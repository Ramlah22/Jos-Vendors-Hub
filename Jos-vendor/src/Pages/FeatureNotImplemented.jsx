import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Construction } from "lucide-react";
import Header from "../components/Header";

export default function FeatureNotImplemented() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 sm:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <Construction className="w-10 h-10 text-yellow-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Feature Not Implemented Yet
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-2">
              The "Add to Cart" feature is currently under development.
            </p>
            <p className="text-gray-600 mb-8">
              We're working hard to bring you this functionality soon!
            </p>

            {/* Shopping Cart Icon */}
            <div className="flex justify-center mb-8">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
            </div>

            {/* Back Button */}
            <button
              onClick={handleGoBack}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition shadow-md hover:shadow-lg"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>

            {/* Alternative Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                In the meantime, you can:
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Contact the vendor directly</p>
                <p>• View product details</p>
                <p>• Browse other products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

