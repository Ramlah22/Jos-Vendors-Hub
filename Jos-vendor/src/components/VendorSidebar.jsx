import { useState } from "react";
import { Menu, Home, ShoppingBag, ShoppingCart, MessageSquare, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function VendorSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/sign-up');
    toast.info("Logged out successfully");
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: Home, path: "/vendor/overview" },
    { id: "products", label: "Products", icon: ShoppingBag, path: "/vendor/products" },
    { id: "orders", label: "Orders", icon: ShoppingCart, path: "/vendor/orders" },
    { id: "messages", label: "Messages", icon: MessageSquare, path: "/vendor/messages" },
    { id: "settings", label: "Settings", icon: Settings, path: "/vendor/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-emerald-900 min-h-screen transition-all duration-300 fixed left-0 top-0 z-40`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && <h2 className="text-white text-xl font-bold">Vendor Hub</h2>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-white p-2 hover:bg-emerald-800 rounded"
          >
            <Menu size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-emerald-700 text-white'
                    : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
