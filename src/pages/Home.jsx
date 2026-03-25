import React from 'react'
import products from '../product'
import ProductCard from '../components/ProductCard'

const Home = () => {
  return (
    <div className='px-5 scroll-smooth py-5'>
      <h1 className='text-2xl font-semibold mb-2.5'>Recommended Products</h1>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.map((product, key) => (
          <ProductCard key={key} data={product}/>
        ))}
      </div>
    </div>
  )
}

export default Home