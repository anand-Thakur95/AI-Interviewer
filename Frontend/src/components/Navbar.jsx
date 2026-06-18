import React from 'react'
import { motion } from 'motion/react'
export default function Navbar() {
    const {userData} = useSelector((state) => state.user)
  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
        <motion.div
        initial={{opacity:0, y:-40}}
        animate={{opacity:1, y:0}}
        transition={{duration:1.05}}
        className= "w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative">


        </motion.div>
      
    </div>
  )
}
