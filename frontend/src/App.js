
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Products from "./components/Products"
import Login from "./components/Login"
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
     <Routes>
      <Route  path="/" element={<Login/>}/>
      <Route exact path="/product" element={<Products/>} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
