import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { ReservationProvider } from './context/ReservationContext';
import { FoodProvider } from './context/FoodContext';

import Layout from './layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';
import Spinner from './components/Spinner';

import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import FoodDetail from './pages/FoodDetail';
import Categories from './pages/Categories';
import SpecialOffers from './pages/SpecialOffers';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Chefs from './pages/Chefs';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import Reservation from './pages/Reservation';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ErrorBoundary>
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <FoodProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <ReservationProvider>
                    <BrowserRouter>
                      <Suspense fallback={<Spinner fullPage />}>
                        <Routes>
                          {/* Auth pages — no layout */}
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          <Route path="/forgot-password" element={<ForgotPassword />} />

                          {/* Admin — no standard layout */}
                          <Route path="/admin" element={
                            <ProtectedRoute adminOnly>
                              <AdminDashboard />
                            </ProtectedRoute>
                          } />
                          <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/food/:id" element={<FoodDetail />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/offers" element={<SpecialOffers />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route path="/chefs" element={<Chefs />} />
                            <Route path="/testimonials" element={<Testimonials />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:id" element={<Blog />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={
                              <ProtectedRoute><Checkout /></ProtectedRoute>
                            } />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/orders" element={
                              <ProtectedRoute><OrderHistory /></ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                              <ProtectedRoute><Profile /></ProtectedRoute>
                            } />
                            <Route path="/reservation" element={<Reservation />} />
                          </Route>

                          {/* 404 */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </BrowserRouter>
                  </ReservationProvider>
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </FoodProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}