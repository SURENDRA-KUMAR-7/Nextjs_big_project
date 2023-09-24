import React from 'react'
import Navbar from '@/components/Navbar';
import BankformJsx from './BankformJsx'

const bankFormPage = () => {
  return (
   <>
 <Navbar title={"Bank Details"} />
<BankformJsx/>
   </>
  )
}

export default bankFormPage