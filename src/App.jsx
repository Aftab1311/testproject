import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './Component/Navbar';
import Footer  from './Component/Footer'
import Product from './Component/HomeComponent/Product'
const App = () => { 
  return (
    <Router>
          <Navbar/>
      <Routes>
        {/* Route Definitions */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product/>} />
        </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
