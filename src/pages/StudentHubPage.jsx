import { useState } from 'react'
import {
  MessageSquare,
  Send,
  Lock,
  Megaphone,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Sparkles,
  Smile,
  ShieldCheck,
  Star,
  Users,
  Eye,
  Paperclip,
  Check,
  MessageCircle,
} from 'lucide-react'
import {
  studentBroadcasts as initialBroadcasts,
  studentInquiries as initialInquiries,
  anonymousFeedbackList as initialAnonymousFeedback,
  teacher,
} from '../data/mockData'

export default function StudentHubPage() {
  const [activeTab, setActiveTab] = useState('anonymous') // 'anonymous' | 'inquiries' | 'broadcasts'
  const [broadcasts, setBroadcasts] = useState(initialBroadcasts)
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [feedbackList, setFeedbackList] = useState(initialAnonymousFeedback)

  // New Broadcast state
  const [showNewBroadcast, setShowNewBroadcast] = useState(false)
  const [broadcastTitle, setBroadcastTitle] = useState('')
  const [broadcastCourse, setBroadcastCourse] = useState('Grade 8 Science (All Sections)')
  const [broadcastContent, setBroadcastContent] = useState('')

  // Inquiry reply state
  const [replyingId, setReplyingId] = useState(null)
  const [replyText, setReplyText] = useState('')

  // Student Simulator state
  const [showSimulator, setShowSimulator] = useState(false)
  const [simRating, setSimRating] = useState(5)
  const [simTopic, setSimTopic] = useState('Photosynthesis Light Phase')
  const [simComment, setSimComment] = useState('')
  const [simSubmitted, setSimSubmitted] = useState(false)

  const handleCreateBroadcast = (e) => {
    e.preventDefault()
    if (!broadcastTitle.trim() || !broadcastContent.trim()) return
    const newB = {
      id: `b${Date.now()}`,
      title: broadcastTitle,
      course: broadcastCourse,
      date: 'Just now',
      views: 1,
      totalStudents: 91,
      content: broadcastContent,
      pinned: true,
    }
    setBroadcasts([newB, ...broadcasts])
    setBroadcastTitle('')
    setBroadcastContent('')
    setShowNewBroadcast(false)
  }

  const handleSendReply = (inquiryId) => {
    if (!replyText.trim()) return
    setInquiries(prev =>
      prev.map(item =>
        item.id === inquiryId
          ? { ...item, status: 'resolved', reply: replyText }
          : item
      )
    )
    setReplyingId(null)
    setReplyText('')
  }

  const handleSimulateAnonymousSubmit = (e) => {
    e.preventDefault()
    if (!simComment.trim()) return
    const newFb = {
      id: `af${Date.now()}`,
      class: 'Grade 8 Science (Student)',
      topic: simTopic,
      sentiment: simRating >= 4 ? 'Positive' : simRating === 3 ? 'Pacing Challenge' : 'Needs Review',
      rating: simRating,
      date: 'Just now',
      comment: simComment,
      aiAnalysis: 'Real-time student feedback detected. Key focus: student comprehension and clarity.',
      suggestedAction: 'Acknowledge this feedback briefly at the start of next class.',
    }
    setFeedbackList([newFb, ...feedbackList])
    setSimComment('')
    setSimSubmitted(true)
    setTimeout(() => {
      setSimSubmitted(false)
      setShowSimulator(false)
    }, 2000)
  }

  // Sentiment calculations
  const avgRating = (
    feedbackList.reduce((a, f) => a + f.rating, 0) / feedbackList.length
  ).toFixed(1)

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 bg-pastel-bg text-pastel-ink max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="card bg-gradient-to-r from-pastel-pinkLight via-white to-pastel-sageLight p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-pastel-pink flex items-center justify-center text-white shadow-pink shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-pastel-ink">Student Communication & Feedback Hub</h1>
                <span className="badge badge-pink text-[10px]">Confidential & Direct</span>
              </div>
              <p className="text-xs text-pastel-inkMuted mt-0.5">
                Broadcast assignment updates, resolve student inquiries, and review anonymous classroom feedback.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/80 p-1 rounded-xl border border-[#EAE3D9] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('anonymous')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'anonymous' ? 'bg-pastel-pink text-white shadow-sm' : 'text-pastel-inkMuted hover:text-pastel-ink'
              }`}
            >
              <Lock size={13} />
              <span>Anonymous Feedback ({feedbackList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inquiries' ? 'bg-pastel-sage text-white shadow-sm' : 'text-pastel-inkMuted hover:text-pastel-ink'
              }`}
            >
              <AlertCircle size={13} />
              <span>Student Inquiries ({inquiries.filter(i => i.status !== 'resolved').length})</span>
            </button>
            <button
              onClick={() => setActiveTab('broadcasts')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'broadcasts' ? 'bg-pastel-peach text-white shadow-sm' : 'text-pastel-inkMuted hover:text-pastel-ink'
              }`}
            >
              <Megaphone size={13} />
              <span>Broadcasts</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: ANONYMOUS STUDENT FEEDBACK VAULT */}
      {activeTab === 'anonymous' && (
        <div className="space-y-6">
          {/* Summary Metric Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-pastel-inkMuted">Average Lesson Rating</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-2xl font-bold text-pastel-ink">{avgRating}</span>
                  <span className="text-xs text-amber-500 font-semibold">/ 5.0 Stars</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                <Star size={20} className="fill-amber-400 text-amber-400" />
              </div>
            </div>

            <div className="card p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-pastel-inkMuted">Privacy Guarantee</span>
                <p className="text-xs font-bold text-pastel-sageDark mt-1">100% Anonymous</p>
                <p className="text-[10.5px] text-pastel-inkMuted">Zero student names recorded</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-pastel-sageLight border border-pastel-sageSoft flex items-center justify-center text-pastel-sageDark">
                <ShieldCheck size={20} />
              </div>
            </div>

            <div className="card p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-pastel-inkMuted">Student Test Simulator</span>
                <p className="text-xs font-bold text-pastel-pinkDark mt-1">Preview Student View</p>
                <button
                  onClick={() => setShowSimulator(!showSimulator)}
                  className="text-[11px] text-pastel-pink underline font-semibold mt-0.5 cursor-pointer"
                >
                  {showSimulator ? 'Close Simulator' : 'Test Submitting Feedback →'}
                </button>
              </div>
              <div className="w-10 h-10 rounded-xl bg-pastel-pinkLight border border-pastel-pinkSoft flex items-center justify-center text-pastel-pinkDark">
                <Sparkles size={20} />
              </div>
            </div>
          </div>

          {/* Interactive Simulator Box */}
          {showSimulator && (
            <div className="card bg-gradient-to-r from-pastel-pinkLight/80 to-[#FAF8F5] border-pastel-pinkSoft p-5 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
                <div className="flex items-center gap-2">
                  <Lock size={15} className="text-pastel-pinkDark" />
                  <h3 className="text-sm font-bold text-pastel-ink">Student View: Submit Anonymous Feedback</h3>
                </div>
                <span className="badge badge-pink text-[9.5px]">Student Simulator</span>
              </div>

              <form onSubmit={handleSimulateAnonymousSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-pastel-ink block mb-1">Lecture Topic</label>
                    <input
                      type="text"
                      value={simTopic}
                      onChange={e => setSimTopic(e.target.value)}
                      className="input text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-pastel-ink block mb-1">Lesson Clarity Rating (1-5)</label>
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setSimRating(star)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            simRating >= star
                              ? 'bg-amber-400 text-white border-amber-500'
                              : 'bg-white border-[#EAE3D9] text-pastel-inkMuted'
                          }`}
                        >
                          {star}★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-pastel-ink block mb-1">
                    Your honest feedback (completely anonymous to Dr. Sharma):
                  </label>
                  <textarea
                    value={simComment}
                    onChange={e => setSimComment(e.target.value)}
                    rows={2}
                    placeholder="e.g. The explanation of cell osmosis was really good, but the whiteboard diagram was hard to see from the back..."
                    className="input text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSimulator(false)}
                    className="btn-secondary text-xs px-3 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pink text-xs px-4 py-1.5 flex items-center gap-1.5"
                  >
                    {simSubmitted ? <Check size={13} /> : <Send size={13} />}
                    <span>{simSubmitted ? 'Feedback Logged!' : 'Send Anonymous Feedback'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Feedback Submissions List */}
          <div className="space-y-4">
            <h3 className="section-title flex items-center gap-2">
              <span>Recent Anonymous Submissions</span>
              <span className="badge badge-pink text-[10px]">{feedbackList.length} Total</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedbackList.map(item => (
                <div key={item.id} className="card p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="badge badge-beige text-[10px]">🔒 Anonymous Student</span>
                        <span className={`badge text-[9.5px] ${
                          item.sentiment === 'Positive'
                            ? 'badge-sage'
                            : item.sentiment === 'Pacing Challenge'
                            ? 'badge-pink'
                            : 'badge-peach'
                        }`}>
                          {item.sentiment}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <span>{item.rating}★</span>
                        <span className="text-pastel-inkSubtle font-normal text-[10.5px]">· {item.date}</span>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-pastel-ink">Topic: {item.topic}</p>
                    <p className="text-xs text-pastel-ink leading-relaxed italic bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE3D9]">
                      "{item.comment}"
                    </p>
                  </div>

                  {/* AI Analysis & Recommended Action */}
                  <div className="space-y-2 pt-2 border-t border-[#EAE3D9]">
                    <div className="p-2.5 rounded-xl bg-pastel-sageLight/70 text-[11.5px] text-pastel-ink space-y-0.5 border border-pastel-sageSoft">
                      <span className="font-bold text-pastel-sageDark flex items-center gap-1">
                        <Sparkles size={12} />
                        <span>AI Reflection & Suggested Action:</span>
                      </span>
                      <p className="text-pastel-inkMuted leading-relaxed">{item.suggestedAction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT INQUIRIES & COMPLAINTS */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="section-title">Direct Student Inquiries & Assistance</h3>
              <p className="section-sub">Student questions, lab makeup requests, and group concerns</p>
            </div>
            <span className="badge badge-sage text-[10px]">
              {inquiries.filter(i => i.status === 'resolved').length}/{inquiries.length} Resolved
            </span>
          </div>

          <div className="space-y-3">
            {inquiries.map(inq => (
              <div
                key={inq.id}
                className={`card p-5 space-y-3 transition-all ${
                  inq.status === 'urgent'
                    ? 'border-pastel-pink shadow-pink/10'
                    : inq.status === 'resolved'
                    ? 'bg-[#FAF8F5]/80 opacity-80'
                    : 'bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-pastel-sageLight text-pastel-sageDark flex items-center justify-center text-xs font-bold">
                      {inq.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-pastel-ink">
                        {inq.studentName} <span className="text-pastel-inkMuted font-normal">({inq.rollNumber}) · {inq.course}</span>
                      </p>
                      <p className="text-[11px] text-pastel-inkMuted">{inq.time}</p>
                    </div>
                  </div>

                  <span className={`badge text-[9.5px] self-start sm:self-auto ${
                    inq.status === 'urgent'
                      ? 'badge-pink'
                      : inq.status === 'resolved'
                      ? 'badge-sage'
                      : 'badge-peach'
                  }`}>
                    {inq.status === 'urgent' ? '⚠️ Urgent Query' : inq.status === 'resolved' ? '✓ Resolved' : 'Pending Response'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-pastel-ink">{inq.subject}</h4>
                  <p className="text-xs text-pastel-inkMuted leading-relaxed">{inq.message}</p>
                </div>

                {/* Reply section */}
                {inq.reply ? (
                  <div className="p-3 rounded-xl bg-pastel-sageLight/50 border border-pastel-sageSoft text-xs text-pastel-ink space-y-0.5">
                    <span className="font-bold text-pastel-sageDark">Your Reply:</span>
                    <p className="text-pastel-inkMuted">{inq.reply}</p>
                  </div>
                ) : replyingId === inq.id ? (
                  <div className="space-y-2 pt-2 border-t border-[#EAE3D9]">
                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      rows={2}
                      placeholder={`Reply to ${inq.studentName}...`}
                      className="input text-xs"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setReplyingId(null)}
                        className="btn-secondary text-xs px-3 py-1"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendReply(inq.id)}
                        className="btn-primary text-xs px-4 py-1 flex items-center gap-1"
                      >
                        <Send size={12} />
                        <span>Send Response</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setReplyingId(inq.id)
                        setReplyText('')
                      }}
                      className="btn-secondary text-xs px-3 py-1 flex items-center gap-1.5"
                    >
                      <MessageCircle size={12} />
                      <span>Reply to Student</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ASSIGNMENTS & BROADCASTS */}
      {activeTab === 'broadcasts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="section-title">Classroom Broadcasts & Assignment Updates</h3>
              <p className="section-sub">Publish guidelines, rubric updates, and schedule reminders</p>
            </div>
            <button
              onClick={() => setShowNewBroadcast(true)}
              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-sage"
            >
              <Plus size={14} />
              <span>New Announcement</span>
            </button>
          </div>

          {/* New Broadcast Modal */}
          {showNewBroadcast && (
            <div className="card bg-gradient-to-r from-pastel-peachLight/60 to-white border-pastel-peachSoft p-5 space-y-3">
              <h4 className="text-xs font-bold text-pastel-ink">Publish New Class Announcement</h4>
              <form onSubmit={handleCreateBroadcast} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-pastel-ink block mb-1">Title</label>
                    <input
                      type="text"
                      value={broadcastTitle}
                      onChange={e => setBroadcastTitle(e.target.value)}
                      placeholder="e.g. Lab Report 2 Deadline Extension"
                      className="input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-pastel-ink block mb-1">Target Class</label>
                    <select
                      value={broadcastCourse}
                      onChange={e => setBroadcastCourse(e.target.value)}
                      className="input text-xs"
                    >
                      <option value="Grade 8 Science (All Sections)">Grade 8 Science (All Sections)</option>
                      <option value="Grade 8A Science">Grade 8A Science</option>
                      <option value="Grade 8B Science">Grade 8B Science</option>
                      <option value="Grade 8C Science">Grade 8C Science</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-pastel-ink block mb-1">Announcement Details</label>
                  <textarea
                    value={broadcastContent}
                    onChange={e => setBroadcastContent(e.target.value)}
                    rows={3}
                    placeholder="Provide details, submission instructions, or rubric updates..."
                    className="input text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewBroadcast(false)}
                    className="btn-secondary text-xs px-3 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs px-4 py-1.5 flex items-center gap-1.5 shadow-sage"
                  >
                    <Send size={12} />
                    <span>Publish Broadcast</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Broadcasts List */}
          <div className="space-y-3">
            {broadcasts.map(b => (
              <div key={b.id} className="card p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      {b.pinned && <span className="badge badge-peach text-[9.5px]">📌 Pinned</span>}
                      <h4 className="text-xs font-bold text-pastel-ink">{b.title}</h4>
                    </div>
                    <p className="text-[11px] text-pastel-inkMuted">{b.course} · Published {b.date}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-pastel-inkMuted">
                    <Eye size={13} className="text-pastel-sage" />
                    <span>{b.views}/{b.totalStudents} Read</span>
                  </div>
                </div>

                <p className="text-xs text-pastel-ink leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE3D9]">
                  {b.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
