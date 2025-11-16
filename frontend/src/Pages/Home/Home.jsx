import Categories from '../../Components/Categories/Categories'
import Products from '../Products/Products'
import Banner from '../../Components/Banner/Banner'
import TrustUs from '../../Components/CustomersTrust/TrustUs'
import WhyChoose from '../../Components/WhyChoose/WhyChoose'
import './Home.css'

function Home() {


  return (
    <>
      <Banner />
      <Categories />
      <Products />
      <span className='home-whychoose-page'><WhyChoose/></span>
    </>
  )
}

export default Home