import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Map from "./pages/Map";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/market" element={<Market/>}/>
      <Route path="/map" element={<Map/>}/>
    </Routes>
  );
}

export default App;
