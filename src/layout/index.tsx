import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import { getSession, signOut, useSession } from 'next-auth/react'
import { NextPageContext } from 'next'

export async function getServerSideProps (context : NextPageContext) {
  const session = await getSession(context);

  if(!session){
    return {
      redirect: {
        destination : '/auth',
        permanent : false,
      }
    }
  }

  return {
    props : {}
  }
}

interface layoutProps{
  children:any
}

const Layout : React.FC<layoutProps> = ({children}) => {
  
  return (
    <>
    <header>
    <Navbar/>
    </header>
    <main>{children}</main>
    <footer></footer>
    </>
  )
}

export default Layout
