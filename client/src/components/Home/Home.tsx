import Hero from'../Hero/Hero'
import ProductList from '../ProductList/ProductList'
import './home.css'

const Home = () => {
  console.log("home")
  
  return (
    <div>
      <Hero />
      <ProductList />
    </div>
  )
}

export default Home