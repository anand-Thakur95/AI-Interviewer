import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { jsPDF } from 'jspdf'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { BsDownload, BsArrowLeft } from 'react-icons/bs'
import { serverUrl } from '../App'
import Navbar from './Navbar'
import Footer from './Footer'

function ScoreRing({ value, label, color }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-24 h-24">
        <CircularProgressbar
          value={value}
          maxValue={10}
          text={`${value}`}
          styles={buildStyles({
            textSize: '28px',
            pathColor: color,
            textColor: '#111',
            trailColor: '#e5e7eb',
          })}
        />
      </div>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  )
}

function InterviewReport() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/interview/report/" + id,
          { withCredentials: true }
        )
        setReportData(result.data)
      } catch (err) {
        console.error(err)
        setError("Failed to load report. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [id])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const downloadPDF = () => {
    if (!reportData) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let y = 20

    const addLine = (text, size = 11, bold = false) => {
      if (y > 270) {
        doc.addPage()
        y = 20
      }
      doc.setFontSize(size)
      doc.setFont("helvetica", bold ? "bold" : "normal")
      const lines = doc.splitTextToSize(text, pageWidth - 40)
      doc.text(lines, 20, y)
      y += lines.length * (size * 0.45) + 4
    }

    addLine("InterviewIQ.AI — Interview Report", 18, true)
    y += 4
    addLine(`Role: ${reportData.role}`, 12)
    addLine(`Experience: ${reportData.experience}`, 12)
    addLine(`Mode: ${reportData.mode}`, 12)
    if (reportData.createdAt) {
      addLine(`Date: ${formatDate(reportData.createdAt)}`, 12)
    }
    y += 6

    addLine("Overall Performance", 14, true)
    addLine(`Final Score: ${reportData.finalScore}/10`, 12)
    addLine(`Confidence: ${reportData.confidence}/10`, 12)
    addLine(`Communication: ${reportData.communication}/10`, 12)
    addLine(`Correctness: ${reportData.correctness}/10`, 12)
    y += 6

    addLine("Question-wise Analysis", 14, true)

    reportData.questions?.forEach((q, i) => {
      y += 4
      addLine(`Q${i + 1}: ${q.question}`, 11, true)
      if (q.answer) addLine(`Answer: ${q.answer}`, 10)
      addLine(`Score: ${q.score}/10 | Confidence: ${q.confidence} | Communication: ${q.communication} | Correctness: ${q.correctness}`, 10)
      if (q.feedback) addLine(`Feedback: ${q.feedback}`, 10)
    })

    const fileName = `interview-report-${reportData.role?.replace(/\s+/g, "-").toLowerCase() || id}.pdf`
    doc.save(fileName)
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition mb-6 text-sm"
          >
            <BsArrowLeft size={16} />
            Back to History
          </button>

          {loading && (
            <p className="text-gray-500 text-center py-12">Loading report...</p>
          )}

          {error && (
            <p className="text-red-500 text-center py-12">{error}</p>
          )}

          {!loading && !error && reportData && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-semibold">Interview Report</h1>
                  <p className="text-gray-500 mt-1">
                    {reportData.role} · {reportData.experience} · {reportData.mode} Mode
                  </p>
                  {reportData.createdAt && (
                    <p className="text-gray-400 text-sm mt-1">
                      {formatDate(reportData.createdAt)}
                    </p>
                  )}
                </div>
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition text-sm"
                >
                  <BsDownload size={16} />
                  Download PDF
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-6">
                <h2 className="text-lg font-semibold mb-6">Overall Performance</h2>
                <div className="flex flex-wrap justify-center gap-8">
                  <ScoreRing value={reportData.finalScore} label="Final Score" color="#2563eb" />
                  <ScoreRing value={reportData.confidence} label="Confidence" color="#7c3aed" />
                  <ScoreRing value={reportData.communication} label="Communication" color="#059669" />
                  <ScoreRing value={reportData.correctness} label="Correctness" color="#d97706" />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-lg font-semibold mb-6">Question-wise Analysis</h2>
                <div className="flex flex-col gap-6">
                  {reportData.questions?.map((q, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-2xl p-5 bg-gray-50"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <p className="font-medium text-gray-800">
                          Q{index + 1}. {q.question}
                        </p>
                        <span className="text-blue-600 font-semibold text-sm shrink-0">
                          {q.score}/10
                        </span>
                      </div>

                      {q.answer && (
                        <p className="text-sm text-gray-600 mb-3">
                          <span className="font-medium text-gray-700">Your answer: </span>
                          {q.answer}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                        <span className="bg-white px-3 py-1 rounded-full border border-gray-200">
                          Confidence: {q.confidence}
                        </span>
                        <span className="bg-white px-3 py-1 rounded-full border border-gray-200">
                          Communication: {q.communication}
                        </span>
                        <span className="bg-white px-3 py-1 rounded-full border border-gray-200">
                          Correctness: {q.correctness}
                        </span>
                      </div>

                      {q.feedback && (
                        <p className="text-sm text-gray-600 bg-white rounded-xl p-3 border border-gray-100">
                          <span className="font-medium text-gray-700">Feedback: </span>
                          {q.feedback}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default InterviewReport
