import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BsClock, BsBarChart } from 'react-icons/bs'

function InterviewHistory() {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/interview/get-interview",
          { withCredentials: true }
        )
        setInterviews(result.data.interviews ?? [])
      } catch (err) {
        console.error(err)
        setError("Failed to load interview history. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    getInterviews()
  }, [])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-2">Interview History</h1>
          <p className="text-gray-500 mb-8">Review your past interviews and performance reports.</p>

          {loading && (
            <p className="text-gray-500 text-center py-12">Loading interviews...</p>
          )}

          {error && (
            <p className="text-red-500 text-center py-12">{error}</p>
          )}

          {!loading && !error && interviews.length === 0 && (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500 mb-4">No interviews yet.</p>
              <button
                onClick={() => navigate("/inter")}
                className="bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition"
              >
                Start Your First Interview
              </button>
            </div>
          )}

          {!loading && !error && interviews.length > 0 && (
            <div className="flex flex-col gap-4">
              {interviews.map((interview) => (
                <div
                  key={interview._id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{interview.role}</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {interview.experience} · {interview.mode} Mode
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <BsClock size={14} />
                          {formatDate(interview.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <BsBarChart size={14} />
                          {interview.questions?.length ?? 0} questions
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-blue-600">
                          {interview.finalScore ?? 0}
                        </p>
                        <p className="text-xs text-gray-400">Score</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          interview.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {interview.status}
                      </span>
                      {interview.status === "completed" && (
                        <button
                          onClick={() => navigate(`/report/${interview._id}`)}
                          className="bg-black text-white px-5 py-2 rounded-full text-sm hover:opacity-90 transition"
                        >
                          View Report
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default InterviewHistory
