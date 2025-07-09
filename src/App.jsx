import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Header from "./components/Header";

function App() {
  return (
    <Router>
    <Header />
      <AppRouter />
    </Router>
  );
}

export default App;
