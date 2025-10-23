import React from 'react'
import CategoryProducts from '../../Components/CategoryProducts/CategoryProducts'
import { products } from '../../data'

function Products() {
  return (
    <section id='products' className='py-10'>
      {
        products?.map(product => (
          <CategoryProducts key={product.catId} product={product} catId={product?.catId} />
        ))
      }
    </section>
  )
}

export default Products