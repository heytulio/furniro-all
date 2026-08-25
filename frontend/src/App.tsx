import { BrowserRouter, Route, Routes } from "react-router";
import { RootLayout } from "./layout";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Cart } from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import { Shop } from "./pages/Shop/Shop";
import { SingleProduct } from "./pages/SingleProduct/SingleProduct";
import { NotFound } from "./components/NotFound";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/product/slug/:slug" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
