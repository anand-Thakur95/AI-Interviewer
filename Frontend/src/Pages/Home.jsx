import { HiSparkles } from "react-icons/hi";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BsClock, BsMic, BsRobot } from "react-icons/bs";
import Navbar from "../components/Navbar";

function Home() {
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();
  return (
    
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
    <Navbar/>
      <div className="flex-1 px-6 py-8">
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

      </div>
    </div>
    
  );
}

export default Home;
