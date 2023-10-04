import Navbar from '@/components/navbar/Navbar'
import ProductCard from '@/components/products/ProductCard';
import { client } from '@/lib/contentful/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

import React from 'react'

interface productsProps{
    products:any
}


const Products : React.FC<productsProps> = ({products}) => {


    const router = useRouter();

    const {data : session} = useSession();

    useEffect(() => {
        async function checkSessionAndRedirect() {
          const session = await getSession();
    
          if (!session) {
            router.push('/auth'); // Redirect to the authentication page
          }
        }
    
        checkSessionAndRedirect();
      }, [session, router]);
    
  return (
    <>
    <Navbar/>
    <div style={{display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", margin:"10px", padding:"10px"}}>
      {
        products.map((product:any)=>(
            
            
            <ProductCard key={product.fields.productId} product={product}/>
        ))
      }
    </div>
    </>
  )
}

export const getStaticProps = async () => {
    const response = await client.getEntries({ content_type: 'products' })
  
    return {
      props: {
        products: response.items,
        revalidate: 60
      }
    }
  }

export default Products
