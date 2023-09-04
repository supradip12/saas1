import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center h-full'>{children}</div>
  )
}

export default AuthLayout;

// /This common Layout file impact both signin and signup layout