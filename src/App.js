import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Products,
  Cart,
  Checkout,
  SingleProduct,
  ErrorPage,
} from "./pages";
import { Navbar, Footer, Sidebar } from "./components";
function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
