import { HiSparkles } from "react-icons/hi";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <div className="flex-1 px-6 py-20">
        <div className="flex justify-center">
          <div className="bg-gray-100 text-gray-600 text-sm px-4 py-8 rounded-full flex items-center gap-2">
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

          <div className="flex flex-wrap justify-cwnter gap-4 mt-10">
          {userData && (
  <motion.button
    onClick={() => navigate("/interview")}
    whileHover={{ opacity: 0.9, scale: 1.03 }}
    whileTap={{ opacity: 1, scale: 0.98 }}
    className="bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md"
  >
    Start Interview
  </motion.button>
)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
