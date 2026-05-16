import Homepage from "./home";
import { ThemeProvider } from "./hooks/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Homepage />
      </div>
    </ThemeProvider>
  );
}

export default App;
