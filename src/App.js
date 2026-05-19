import { BrowserRouter, Routes, Route } from 'react-router'
import { CartProvider } from './hooks/CartContext'
import { AuthProvider } from './hooks/AuthContext'
import { NotificationsProvider } from './hooks/NotificationsContext'
import { ThemeProvider } from './hooks/ThemeContext'
import { LanguageProvider } from './hooks/LanguageContext'
import Homepage from './home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'
import Checkout from './pages/Checkout'
import PaymentQr from './pages/PaymentQr'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <NotificationsProvider>
              <CartProvider>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment-qr" element={<PaymentQr />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </CartProvider>
            </NotificationsProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
