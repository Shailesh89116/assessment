import Navbar from '@/components/navbar/Navbar'
import { client, previewClient } from '@/lib/contentful/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Entry } from 'contentful';
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import ProductBody from '@/components/products/ProductBody';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import ContentfulImage from '@/components/ui/ContentfulImage';


interface Product {
  // Define the structure of your product object
  // Replace this with your actual structure
  slug: string;
  // Add other fields as needed
}

interface ProductProps {
  product?: Entry<any>;
  preview: boolean;
}

interface productProps{
  product: any,
  preview : any
}

const Product : React.FC<productProps> = ({product, preview}) => {

  console.log(product.fields);
  

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
    <div>
    <div>
        <div>
            <h2>{product.fields.title || ""}</h2>
            <ContentfulImage
          alt={`Cover Image for ${product.fields.title || ""}`}
          src={product.fields.productImg.fields.file.url || ""}
          width={product.fields.productImg.fields.file.details.image.width || ""}
          height={product.fields.productImg.fields.file.details.image.height || ""}
        />
        </div>
      
    </div>
      <ProductBody product={product}/>
    </div>
    </>
  )
}


export const getStaticProps: GetStaticProps<ProductProps> = async ({ params, preview = false }) => {
  const cfClient = preview ? previewClient : client;

  const { productId } = params as { productId: any };
  const response = await cfClient.getEntries<any>({
    content_type: 'products',
    'fields.productId': productId || "",
  });

  if (!response?.items?.length) {
    return {
      redirect: {
        destination: '/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product: response?.items?.[0],
      preview,
      revalidate: 60,
    },
  };
};

export const getStaticPaths: GetStaticPaths<any> = async () => {
  const response = await client.getEntries<any>({ content_type: 'products' });
  const paths = response.items.map((item) => ({
    params: { productId: String(item.fields.productId || "") }
  }));

  return {
    paths,
    fallback: true,
  };
};


export default Product

