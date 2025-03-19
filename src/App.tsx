import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
        <h1>אפליקציית קניות</h1>
        <Routes>
          <Route path="/" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
    </Router>
  );
};

export default App;
