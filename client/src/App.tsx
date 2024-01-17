import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext';
import Main from "./components/Main/Main";



const App = () => {
  return (
    <div>

      <Router>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            
              <Routes>
                <Route path="/*" element={<Main />} />
              </Routes>
            <Footer />
          </CartProvider>
        </ProductProvider>
      </Router>

    </div>
  )
}

export default App
