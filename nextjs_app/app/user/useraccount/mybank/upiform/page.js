import React from 'react'
import Navbar from '@/components/Navbar';
import Upiform from './UpiformJsx';

const upiFormPage = () => {
  return (
   <>
 <Navbar title={"UPI Details"} />
<Upiform/>
   </>
  )
}

export default upiFormPage