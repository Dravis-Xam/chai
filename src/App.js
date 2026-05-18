import Homepage from "./home";
import { CartProvider } from "./hooks/CartContext";
import { ThemeProvider } from "./hooks/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="App">
          <Homepage />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
