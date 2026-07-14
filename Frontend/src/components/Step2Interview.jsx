import React, { useState } from 'react'
import maleVideo from '../assets/male-ai.mp4'
import femaleVideo from '../assets/female-ai.mp4'
import Timer from './Timer'
import { motion } from 'motion/react'
import { FaMicrophone } from 'react-icons/fa'


function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, question, userName } = interviewData;
  const [isInteroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null)
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTime] = useState(questions[0]?.timeLimit || 60);

  

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-7xl min-h-[580px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
        {/* video section */}
        <div className="w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <video
              src={femaleVideo}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            ></video>
          </div>

          {/* subtitle pending */}

          {/* timer Area */}
          <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>
<div className='flex justify-between items-center'>
<span className='text-sm text-gray-500'>
  Interview Status
</span>

<span className='text-sm font-semibold text-blue-600'>
  AI speaking
</span>
</div>

<div className='h-px bg-gray-200'></div>

<div className='flex justify-center'>

  <Timer timeLeft="30" totalTime="60" />
</div>

<div className='h-px bg-grat-200'></div>

<div className='grid grid-cols-2 gap-6 text-center'>
  <div>
    <span className='text-2xl font-bold text-blue-500'>1</span>
    <span className='text-xs text-gray-400'>Current Question</span>
  </div>

  <div>
    <span className='text-2xl font-bold text-blue-500'>5</span>
    <span className='text-xs text-gray-400'>Total Questions</span>
  </div>
</div>
          </div>
        </div>

        {/* Text section */}
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative'>
          <h2 className='text-xl sm:text-2xl font-bold text-blue-600 mb-6'>
            AI Smart Interview
          </h2>

          <div className='relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm'>
            <p className='text-xs sm:text-sm text-gray-400 mb-2'>
              Question 1 of 5
            </p>
            <div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed '> Firsy Question</div>
          </div>

          <textarea placeholder='Type your answer here...' className='flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-blue-500 transition text-gray-800'></textarea>

          <div className='flex items-center gap-4 mt-6'>
<motion.button className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg'
whileTap={{scale:0.9}}

>
  <FaMicrophone  size={20}/>

</motion.button>

<motion.button
whileTap={{scale: 0.9}}
className='flex-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold'>
  Submit Answer

</motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2Interview