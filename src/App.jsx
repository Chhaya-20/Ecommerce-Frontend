
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/User/Login'
// import Login from '../components/login';
 import Signup from './pages/User/SignUp';
 import Cart from './pages/User/Cart'
 import Home from './pages/Home';
 
 import Order from './pages/User/Orders';
 import WishList from './pages/User/Wishlist'
 import Seller from './pages/Seller/SellerLogin'
 import SellerSign from './pages/Seller/SellerSignUp';
 import SellerPage from './pages/Seller/Sellerpage'
import AddProduct from './pages/Seller/AddProduct';
import Product  from './pages/User/Product';
import SellerOrder from './pages/Seller/SellerOrder'

function App() {
  return (
   
    <Router>
     
      <Routes>
     
      <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/order" element={<Order />} />
        <Route exact path="/wishlist" element={<WishList />} />
        <Route exact path="/seller" element={<Seller />} />
        <Route exact path="/sellersignup" element={<SellerSign />} />
        <Route exact path="/sellerpage" element={<SellerPage />} />
        <Route exact path="/sellerorder" element={<SellerOrder />} />
        <Route exact path="/addproduct" element={<AddProduct />} />
        <Route exact path="/products" element={<Product />} />
        


       

        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
}

export default App;