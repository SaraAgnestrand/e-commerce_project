import Footer from'../Footer/Footer'
import Hero from'../Hero/Hero'
import ProductList from '../ProductList/ProductList'
import Banner from '../Banner/Banner'
import './home.css'

const Home = () => {
  console.log("home")
  
  return (
    <div>
      <Banner />
      <Hero />
      <ProductList />
      <Footer />
    </div>
  )
}

export default Home