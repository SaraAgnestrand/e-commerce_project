import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";


const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Main />} />
        </Routes>
        
      </Router>

    </div>
  )
}

export default App
