import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryList from "./Components/CountryList";
import CountryPage from "./Components/CountryDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:cca3" element={<CountryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
