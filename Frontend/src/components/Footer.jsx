import { BsRobot } from 'react-icons/bs'

function Footer() {
  return (
    <div className='bg-[#f3f3f3] flex justify-center px-10 pb-10 py-8 pt-10'>
      <div className='flex flex-col items-center w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 py-6 px-4 text-center'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='bg-black text-white p-2 rounded-lg'>
            <BsRobot size={16} />
          </div>
          <h2 className='font-semibold'>InterviewIQ.AI</h2>
        </div>
        <p className='text-gray-500 text-sm max-w-xl'>
          AI-powered interview preparation platform designed to improve communication skills, technical depth and professional confidence.
        </p>
      </div>
    </div>
  )
}

export default Footer