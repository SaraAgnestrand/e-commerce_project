import Footer from'../Footer/Footer'
import Hero from'../Hero/Hero'
import ProductList from '../ProductList/ProductList'
import './home.css'

const Home = () => {
  console.log("home")
  
  return (
    <div>
      <Hero />
      <ProductList />
      <Footer />
    </div>
  )
}

export default Home