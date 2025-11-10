import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SignInPage from "./components/Sign-in";
import Login from "./components/login";
import Product from "./Pages/Product";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from "./Pages/Checkout";
import VendorProfilePage from "./Pages/Vendorpage";


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

      </Routes>
    </Router>
  );
}

export default App;
