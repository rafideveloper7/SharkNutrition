import products from '../../products'

function Home() {
  return (
    <div className=''>
      <div className="flex">
        {products?.map((product) => (
          <div key={product?.id}>
            <img src={product?.image} alt="" />
            <h3>{product?.name}</h3>
            <h4>{product?.category}</h4>
            <p className="text-yellow-500">⭐ {product.rating}</p>
            <p>{product?.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home