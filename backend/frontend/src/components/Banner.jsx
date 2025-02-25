// import React from 'react'
import banner from "/image/image-product.png"
import { FaShoppingBag } from 'react-icons/fa'

const Banner = () => {
  return (
    <div className='bg-primaryBG py-10 mt-6 xl:px-24 px-4'>
      <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-14'>
      <div className='md:w-1/2'>
            <img src={banner} alt="" />
        </div>
        <div className='md:w-1/2'>
            <h1 className=' text-5xl text-black font-light mb-5'>Collections</h1>
            <p className='text-xl text-gray-700 mb-7'>you can explore any shop for many different collection from various <br />
                 brands here.</p>
           <a href="/shop"> <button className='bg-black hover:bg-gray-700 px-6 py-2 text-white font-semibold rounded-sm flex items-center gap-2'> <FaShoppingBag className='inline-flex'/>Shop Now</button></a>
        </div>
        
      </div>
    </div>
  )
}

export default Banner
