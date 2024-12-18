import './App.css';
import { AuthProvider } from './auth/Autentication'; 
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Productlist from './components/Productlist';
import Login from './components/Login';
import Product from './components/Product';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Productlist/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Productlist/>} />
          <Route path='/p/:id' element={<Product/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
