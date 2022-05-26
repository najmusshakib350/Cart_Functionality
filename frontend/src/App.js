import React from "react";
import { Routes, Route } from "react-router-dom";
//protect component
import PrivateRoute from "./protectroutes/PrivateRoute";
//Login component
import Login from "./components/pages/Login";
//Product component
import Product from "./components/pages/Product";
import Sales from "./components/pages/Sales";
import Cart from "./components/pages/Cart";
import Report from "./components/pages/Report";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Authenticate Route Start */}
      <Route path="/*" element={<PrivateRoute />}>
        <Route path="product" element={<Product />} />
        <Route path="sales" element={<Sales />} />
        <Route path="cart" element={<Cart />} />
        <Route path="report" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default App;
