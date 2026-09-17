import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Movies from "./pages/Movies";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
    </Routes>
  );
}

export default App;