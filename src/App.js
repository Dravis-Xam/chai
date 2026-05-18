import { BrowserRouter, Routes, Route } from 'react-router'
import { CartProvider } from './hooks/CartContext'
import { ThemeProvider } from './hooks/ThemeContext'
import Homepage from './home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
