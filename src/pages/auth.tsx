import { signIn } from 'next-auth/react'
import React from 'react'
import styles from '@/styles/Auth.module.css'
import {FcGoogle} from 'react-icons/fc';

const Auth = () => {
  return (
        <div className={styles.container}>
            <div className={styles.logo_inner}
            onClick={()=>signIn('google',{callbackUrl: '/'})}>
                <FcGoogle/> <span>Login with Google</span>
            </div>
        </div>
  )
}

export default Auth
