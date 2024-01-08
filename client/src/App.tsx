import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import { ProductProvider } from './context/ProductContext';
import Main from "./components/Main/Main";



const App = () => {
  return (
    <div>

      <Router>
        <Navbar />
        <ProductProvider>
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
        </ProductProvider>
      </Router>

    </div>
  )
}

export default App
