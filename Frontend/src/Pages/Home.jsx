import { HiSparkles } from "react-icons/hi";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BsBarChart, BsClock, BsFileEarmarkText, BsMic, BsRobot } from "react-icons/bs";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();
  return (
    
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
    <Navbar/>
      <div className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
        <div className="flex justify-center">
          <div className="bg-gray-100 text-gray-600 text-sm px-2 py-4 rounded-full flex items-center gap-2">
            <HiSparkles size={16} className="text-blue-600" />
            AI Powered Smart Interview Platform
          </div>
        </div>

        <div className="text-center mb-2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
          >
            Practice Interviews with{" "}
            <span className="inline-flex items-center bg-blue-100 text-blue-600 px-5 py-1 rounded-full align-middle">
              AI Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg"
          >
            Role-base mock interviews with smart follow-ups, adaptive difficulty
            and real-time performance evaluation.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {userData && (
              <motion.button
                onClick={() => navigate("/interview")}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className="bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md shadow-gray-600"
              >
                Start Interview
              </motion.button>
            )}

            {userData && (
              <motion.button
                onClick={() => navigate("/interview")}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className="bg-gray-200 text-black px-10 py-3 rounded-full hover:opacity-90 transition shadow-md shadow-gray-400"
              >
                View History
              </motion.button>
            )}
          </div>
        </div>

<div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">

  {

    [
      {
        icon: <BsRobot size={24} />,
        step: "STEP 1",
        title: "Role & Exprience Selection",
        desc: "AI adjusts difficulty based on selected job role."
      },
      {
        icon: <BsMic size={24} />,
        step: "STEP 2",
        title: "Smart Voice Interview",
        desc: "Dynamic follow-up questions based on ypur answers."
      },
      {
        icon: <BsClock size={24} />,
        step: "STEP 3",
        title: "Time Based Simulation",
        desc: "Real interview pressure with time tracking"
      },
    ].map((item, index)=>(
      <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{opacity: 1, y: 0}}
      transition={{ duration: 0.9 + index * 0.2 }}
      whileHover={{rotate: 0, scale: 1.06}}

      key={index}
      className={`relative bg-white rounded-3xl border-2 border-blue-100 hover:border-blue-500 p-6 pt-14 mt-16 w-80 max-w-[90%] shadow-md hover:shadow-2xl transition-all duration-300
        ${index === 0 ? "rotate-[-4deg]" : ""}
        ${index === 1 ? "rotate-[-3deg] md:mt-8 shadow-xl" : ""}
        ${index === 2 ? "rotate-[3deg]" : ""}
      `}>
      
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-blue-500 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
        {item.icon}
      </div>

      <div className="text-center">
        <div className="text-xs text-blue-600 font-semibold mb-2 tracking-wider">{item.step}</div>
        <h3 className="font-semibold mb-3 text-lg">{item.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
      </div>
      </motion.div>

    ))
  }
</div>

<div className="mb-32">

  <motion.h2
   initial={{ opacity: 0, y: 20 }}
   whileInView={{opacity: 1, y: 0}}
   transition={{ duration: 0.6 }}
  className="text-4xl font-semibold text-center mb-16"
  >

    Advanced AI{" "}
    <span className="text-blue-600">Capabilities</span>
  </motion.h2>

  <div className="grid md:grid-cols-2 gap-10">

    {
[
  {
    image: "https://res.cloudinary.com/dgmoa4vas/image/upload/v1782044726/ai-ans_sozs17.png",
    icon: <BsBarChart size={20} />,
    title: "AI Answer Evalution",
    desc: "Scores communication, technical accuracy and confidence"
  },
  {
    image: "https://res.cloudinary.com/dgmoa4vas/image/upload/v1782044723/resume_e1konv.png",
    icon: <BsFileEarmarkText size={20} />,
    title: "Resume Based Interview",
    desc: "Project-specific question based on uploaded resume."
  },
  {
    image: "https://res.cloudinary.com/dgmoa4vas/image/upload/v1782044723/pdf_ur0ci7.png",
    icon: <BsFileEarmarkText size={20} />,
    title: "Downloadable PDF Report",
    desc: "Detailed strengths, weaknesses and improvement insights."
  },
  {
    image: "https://res.cloudinary.com/dgmoa4vas/image/upload/v1782044724/history_f3yvo2.png",
    icon: <BsBarChart size={20} />,
    title: "History & Analytics",
    desc: "Track progress with performance graphs and topic analysis."
  }
].map((item, index)=>(
  <motion.div key={index}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{opacity: 1, y: 0}}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  whileHover={{scale: 1.02}}
  className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-all">

    <div className="flex flex-col md:flex-row items-center gap-8 m-3">

      <div className="w-full md:w-1/2 flex justify-center">
      <img src={item.image} alt={item.title} className="w-full h-auto object-contain max-h-64" />
      </div>

      <div className="w-full md:w-1/2">
      <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
        {item.icon}
      </div>
      <h3 className="font-semibold mb-3 text-xl">{item.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </div>

  </motion.div>
))

    }
  </div>
</div>

<div className="mb-32">

  <motion.h2
   initial={{ opacity: 0, y: 20 }}
   whileInView={{opacity: 1, y: 0}}
   transition={{ duration: 0.6 }}
  className="text-4xl font-semibold text-center mb-16"
  >

    Multiple Interview{" "}
    <span className="text-blue-600">Modes</span>
  </motion.h2>

  <div className="grid md:grid-cols-2 gap-10">

    {
[
  {
    image: "https://res.cloudinary.com/dgmoa4vas/image/upload/v1782044724/HR_tois32.png",
    title: "Hr Interview Mode",
    desc: "Behavioral and communication based avaluation"
  },
  {
    image: "https://res.cloudinary.com/dgmoa4vas/image/upload/v1782044724/tech_cu5n9d.png",
    title: "Technical Mode",
    desc: "Deep technical questioning based on selected role."
  },
  {
    image: "https://res.cloudinary.com/dgmoa4vas/image/upload/v1782044724/confi_ohuyzt.png",
    title: "Confidence Detection",
    desc: "Basic tone and voice analysis insights"
  },
  {
    image: "https://res.cloudinary.com/dgmoa4vas/image/upload/v1782044726/credit_zw2msx.png",
    title: "Credit System",
    desc: "Unlock premium interview sessions easily."
  }
].map((mode, index)=>(
  <motion.div key={index}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{opacity: 1, y: 0}}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  whileHover={{y: -6}}
  className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all">

    <div className="flex justify-between items-center gap-6">

    <div className="w-1/2">
    <h3 className="font-semibold text-xl mb-3">
      {mode.title}
    </h3>

    <p className="text-gray-500 text-sm leading-relaxed">
      {mode.desc}
    </p>
    </div>

    <div className="w-1/2 flex justify-end">
     
     <img src={mode.image} alt={mode.title}
     className = "w-28 h-28 object-contain"
     
     />


    </div>
    </div>

  </motion.div>
))

    }
  </div>
</div>
      </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default Home;
