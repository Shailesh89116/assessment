import React from 'react'
import RichText from '../RichText'

interface productBodyProps{
    product:any
}

const ProductBody : React.FC<productBodyProps> = ({product}) => {

    const {productDesc} = product.fields

  return (
    <div>
      <div className='mx-auto prose'>
      <RichText productDesc={productDesc} />
    </div>
    </div>
  )
}

export default ProductBody
