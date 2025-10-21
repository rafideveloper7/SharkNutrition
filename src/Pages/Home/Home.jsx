import { Link } from 'react-router-dom'
import products from '../../products'

function Home() {
  
  
  return (
    <div className=''>
      <div className="flex">
        {products?.map((product) => (
          <Link to={ `/products/${product.id}`}key={product?.id}>
            <div >
              <img src={product?.image} alt="" />
              <h3>{product?.name}</h3>
              <h4>{product?.category}</h4>
              <p className="text-yellow-500">⭐ {product.rating}</p>
              <p>{product?.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home