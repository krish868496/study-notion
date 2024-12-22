
import React from 'react'
import { useSelector } from 'react-redux'
import RenderTotalAmount from './RenderTotalAmount'
import RenderCartCourses from './RenderCartCourses'

const Cart = () => {
        const {total, totalItems} = useSelector((state) => state.cart)
        console.log(total, totalItems)
  return (
    <div>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5 '>Your Cart</h1>
        <p className='border-b border-b-richblack-400 pb-2 font-semibold text-richblue-400'>{totalItems} Courses in Cart</p>
        {
                total > 0 ?
               (
                <div className='mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6'>
                <RenderCartCourses />
                {/* <RenderTotalAmount /> */}
                </div>
               ) : 
               (<p>Your Cart is Empty</p>)
        }
    </div>
  )
}

export default Cart