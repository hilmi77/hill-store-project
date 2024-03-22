import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";
import FavoritesPage from "./pages/FavoritesPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
