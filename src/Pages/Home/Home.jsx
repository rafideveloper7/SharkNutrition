import Categories from '../../Components/Categories/Categories'
import Products from '../Products/Products'
import Banner from '../../Components/Banner/Banner'
import TrustUs from '../../Components/CustomersTrust/TrustUs'
import WhyChoose from '../../Components/WhyChoose/WhyChoose'

function Home() {


  return (
    <>
      <Banner />
      <Categories />
      <Products />
      <WhyChoose/>
    </>
  )
}

export default Home