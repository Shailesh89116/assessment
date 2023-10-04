import Image from 'next/image'
import React from 'react'
import ContentfulImage from '../ui/ContentfulImage'

interface productHeaderProps{
    product:any
}

const ProductHeader : React.FC<productHeaderProps> = ({product}) => {

    const {title, productImg} = product.fields

    console.log(productImg);
    
  return (
    <div>
        <div>
            <h2>{title}</h2>
            <ContentfulImage
          alt={`Cover Image for ${title}`}
          src={productImg.fields.file.url}
          width={productImg.fields.file.details.image.width}
          height={productImg.fields.file.details.image.height}
        />
        </div>
      
    </div>
  )
}

export default ProductHeader
