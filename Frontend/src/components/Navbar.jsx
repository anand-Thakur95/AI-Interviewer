import { motion } from 'motion/react'
import { useSelector } from 'react-redux'
import { BsRobot,BsCoin } from 'react-icons/bs'

import { HiOutlineLogout } from 'react-icons/hi'
import { FaUserAstronaut } from 'react-icons/fa'
import { useState } from 'react'
import { div } from 'motion/react-client'


export default function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)

  return (
    <div className='fixed top-0 left-0 w-full flex justify-center px-4 pt-6'>
        <motion.div
        initial={{opacity:0, y:-40}}
        animate={{opacity:1, y:0}}
        transition={{duration:1.05}}
        className= "w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-6 py-2 flex justify-between items-center relative">
          
        <div className='flex items-center gap-3 cursor-pointer'>

            <div className='bg-black text-white p-2 rounded-lg'>
                <BsRobot size={18}/>
            </div>
            <h1 className='font-semibold hidden md:block'>InterviewIQ.AI</h1>
        </div>

        <div className='flex items-center gap-6 relative'>
            <div className='relative'>
                <button
                onClick={()=>setShowCreditPopup(true)}
                className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition'>
                    <BsCoin size={20}/>
                    {userData?.credit || 0}
                </button>

                {showCreditPopup && (
                  <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>

                    <p className=''>Need more credits to continue interview ? </p>

                  </div>

                )}
            </div>

            <div className='relative'>
                <button className='w-9 h-9 bg-black text-white rounded-full flrx item-center justify-center font-semibold'>
            
                    {userData ?  userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16}/>}
                </button>
            </div>

        </div>
        </motion.div>
      
    </div>
  )
}
