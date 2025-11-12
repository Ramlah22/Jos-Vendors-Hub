import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SignInPage from "./components/Sign-in";
import Login from "./components/login";
import Product from "./Pages/Product";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from "./Pages/Checkout";
import VendorProfilePage from "./Pages/Vendorpage";
import Vendor1 from "./Vendors/Vendor1";
import VendorDashboard from "./Dashboard/Vendordashboard"
import Contact from "./Pages/Contact"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/create-account" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/vendor-profile" element={<VendorProfilePage />} />
        <Route path="/Vendorpage1" element={<Vendor1 />} />
         <Route path="/VendorDashboard"  element={<VendorDashboard/>} />  
         <Route path="/contact" element={<Contact/>} />           
      </Routes>
    </Router>
  );
}

export default App;
