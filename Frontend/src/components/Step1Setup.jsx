import { motion } from "motion/react";
import { useState } from "react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import { serverUrl } from "../App";
import { linkWithCredential } from "firebase/auth";
import axios from "axios";

function Step1Setup() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);


  const handleUploadResume = async () => {
    if(!resumeFile || analyzing) return;
    setAnalyzing(true)

    const formdata = new FormData()
    formdata.append("resume", resumeFile)

    try {
      const result = await axios.post(serverUrl + "/api/interview/resume", formdata, {withCredentials : true})

      console.log(result.data)

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || [])
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);
    } catch (error) {
      console.log(error)
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4"
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        <motion.div className="relative bg-gradient-to-br from-blue-100 to-blue-200 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Start Your AI Interview
          </h2>

          <p className="text-gray-600 mb-10">
            Practice real interview scenarios powered by AI. Improve
            communication, technical skills, and confidence.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: <FaUserTie className="text-blue-600 text-xl" />,
                text: "Choose Role & Experience",
              },
              {
                icon: <FaMicrophoneAlt className="text-blue-600 text-xl" />,
                text: "Smart Voice Interview",
              },
              {
                icon: <FaChartLine className="text-blue-600 text-xl" />,
                text: "Performance Analytics",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer"
              >
                {item.icon}

                <span className="text-gray-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-12 bg-white"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Interview SetUp
          </h2>

          <div className="space-y-6">
            <div className="relative">
              <FaUserTie className="absolute top-4 left-4 text-gray-400" />

              <input
                type="text"
                placeholder="Enter role"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>

            <div className="relative">
              <FaBriefcase className="absolute top-4 left-4 text-gray-400" />

              <input
                type="text"
                placeholder="Experience Level"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>

            <div>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
              >
                <option value="Technical">Technical</option>
                <option value="HR">HR Interview</option>
              </select>
            </div>
            {analysisDone ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-2 border-blue-200 bg-blue-50 rounded-xl p-8 text-center flex flex-col items-center justify-center"
              >
                <FaFileUpload className="text-blue-600 text-2xl mb-4" />
                <p className="text-blue-700 font-semibold">Analysis Done</p>
                {resumeFile && (
                  <p className="text-gray-500 text-sm mt-2">{resumeFile.name}</p>
                )}
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => document.getElementById("resume-input").click()}
                className="border-2 bg-blue-50 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-600 transition flex flex-col items-center justify-center"
              >
                <FaFileUpload className="text-blue-600 text-2xl mb-4 flex items-center justify-center" />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="hidden"
                  id="resume-input"
                />
                <p className="text-gray-600 font-medium">
                  {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                </p>

                {resumeFile && !analyzing && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Analyze Resume
                  </motion.button>
                )}

                {analyzing && (
                  <p className="mt-4 text-gray-600 font-medium">Analyzing...</p>
                )}
              </motion.div>
            )}

            <motion.button className="w-full disabled:bg-gray-600 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md">
              Start Interview
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Step1Setup;
