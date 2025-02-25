import {Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import Shop from "../src/pages/Shop/Shop"


import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Footer from "./components/Footer/Footer";


function App() {
  const { user,checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  if (checkingAuth) return <LoadingSpinner />
  
 

  return (
    <div className="min-h-screen  text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primaryBG" />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/shop" element={<Shop/> } />
           <Route path="/signup" element={!user ? <SignUpPage />: <Navigate to="/" /> } /> 
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />}  />
          <Route path="/secret-dashboard" element={user?.role ==="admin" ? <AdminPage /> : <Navigate to="/login" />}  />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element= {user ? <CartPage /> : <Navigate to="/login" />} />
         
          
        </Routes>
        <Footer/>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
