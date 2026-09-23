import { useState } from 'react'
import {
  Sparkles,
  Flame,
  ChevronRight,
  Target,
  ArrowUpRight,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Calendar,
  Layers,
  X,
  Send,
  Check,
  Lightbulb,
  Clock,
  MessageSquare,
  Star,
  Lock,
  School,
  GraduationCap,
  Mic,
  Megaphone,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  streakData,
  pathways,
  reflections as initialReflections,
  weeklyDigest,
  goals,
  todaySchedule,
  anonymousFeedbackList,
  topicBasicsBank,
  communicationGuides,
  studentBroadcasts,
} from '../data/mockData'
import { analyseMood } from '../hooks/useMoodAnalysis'

const PASTEL_HEAT_COLORS = ['#F5EFEB', '#D3E8DC', '#A3CFB4', '#6EA685', '#38664D']

function HeatMap({ data }) {
  const [hoveredCell, setHoveredCell] = useState(null)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[10.5px] text-[#6E645D]">
        <span>13-Week Reflection Activity</span>
        {hoveredCell !== null && (
          <span className="text-[#38664D] font-semibold">
            Day #{hoveredCell.idx + 1}: Level {hoveredCell.val}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1 p-2 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] justify-start">
        {data.slice(0, 42).map((v, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredCell({ val: v, idx: i })}
            onMouseLeave={() => setHoveredCell(null)}
            className="w-3 h-3 rounded-xs transition-all cursor-pointer hover:scale-125 shrink-0"
            style={{ backgroundColor: PASTEL_HEAT_COLORS[v] ?? PASTEL_HEAT_COLORS[0] }}
          />
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage({ educatorProfile }) {
  const [reflectionsList, setReflectionsList] = useState(initialReflections)
  const [quickInput, setQuickInput] = useState('')
  const [showDigestModal, setShowDigestModal] = useState(false)
  const [savedQuick, setSavedQuick] = useState(false)

  const isProfessor = educatorProfile?.role === 'college_professor'
  const focusAreas = educatorProfile?.focusAreas || []

  // Check which focus areas are active
  const hasFocus = (name) => focusAreas.length === 0 || focusAreas.some(f => f.toLowerCase().includes(name.toLowerCase()))

  const showPacingBasics = hasFocus('pacing') || hasFocus('lesson')
  const showStudentFeedback = hasFocus('feedback') || hasFocus('student')
  const showCommunication = hasFocus('communication') || hasFocus('clarity')
  const showBroadcasts = hasFocus('assignment') || hasFocus('broadcast')
  const showHabitStreak = hasFocus('consistency') || hasFocus('reflective') || focusAreas.length === 0

  const currentMood = quickInput.trim() ? analyseMood(quickInput) : analyseMood(reflectionsList[0]?.response || '')

  const handleQuickSave = () => {
    if (!quickInput.trim()) return
    const newEntry = {
      id: `r${Date.now()}`,
      prompt: 'Daily Classroom Reflection',
      response: quickInput,
      date: 'Just now',
      tag: 'Student engagement',
      ts: Date.now(),
    }
    setReflectionsList([newEntry, ...reflectionsList])
    setQuickInput('')
    setSavedQuick(true)
    setTimeout(() => setSavedQuick(false), 2200)
  }

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5 bg-[#FAF8F5] text-[#2D2824] max-w-6xl mx-auto w-full">
      {/* Digest Modal */}
      {showDigestModal && (
        <div className="fixed inset-0 bg-[#2D2824]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-[#EAE3D9] rounded-3xl w-full max-w-lg shadow-soft-lg p-6 relative">
            <button
              onClick={() => setShowDigestModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#FAF8F5] text-[#6E645D] hover:text-[#2D2824]"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#EDF6F0] flex items-center justify-center text-[#38664D]">
                <Sparkles size={16} />
              </div>
              <h3 className="text-base font-bold text-[#2D2824]">Weekly Pedagogical Digest</h3>
            </div>
            <p className="text-xs text-[#38664D] font-bold mb-2">{weeklyDigest.headline}</p>
            <p className="text-xs text-[#2D2824] leading-relaxed mb-4">{weeklyDigest.body}</p>
            <div className="flex justify-end">
              <button onClick={() => setShowDigestModal(false)} className="btn-primary text-xs px-4 py-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Calm, Breathable Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#EAE3D9]/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#2D2824]">
              Good morning, {educatorProfile?.name?.split(' ')[0] || 'Educator'} ✨
            </h1>
            <span className="badge badge-sage text-[10px]">
              {isProfessor ? 'Professor Mode' : 'Teacher Mode'}
            </span>
          </div>
          <p className="text-xs text-[#6E645D] mt-0.5">
            {educatorProfile?.institution} · {educatorProfile?.grade} {educatorProfile?.subject?.split('&')[0]}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {focusAreas.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {focusAreas.slice(0, 3).map((f, i) => (
                <span key={i} className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#EAE3D9] text-[#38664D]">
                  🎯 {f}
                </span>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setShowDigestModal(true)}
              className="text-xs text-[#38664D] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Weekly Digest</span>
              <ArrowUpRight size={13} />
            </button>
          )}
        </div>
      </div>

      {/* 2. Key Stats Strip (Compact & Clean) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3D9] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] text-[#6E645D]">Habit Streak</span>
            <p className="text-base font-bold text-[#2D2824] mt-0.5">{streakData.current} Days 🔥</p>
          </div>
          <span className="text-[10px] text-[#A65522] font-semibold">Active</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3D9] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] text-[#6E645D]">Weekly Target</span>
            <p className="text-base font-bold text-[#2D2824] mt-0.5">{streakData.thisWeekCompleted}/{streakData.thisWeekGoal} Days</p>
          </div>
          <span className="text-[10px] text-[#38664D] font-semibold">71% Done</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3D9] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] text-[#6E645D]">Student Rating</span>
            <p className="text-base font-bold text-[#2D2824] mt-0.5">4.8 / 5.0 ⭐</p>
          </div>
          <span className="text-[10px] text-amber-600 font-semibold">Anonymous</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3D9] flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[11px] text-[#6E645D]">Today's Schedule</span>
            <p className="text-base font-bold text-[#2D2824] mt-0.5">{todaySchedule.length} Sessions</p>
          </div>
          <Link to="/planner" className="text-[10px] text-[#38664D] font-semibold hover:underline">
            View →
          </Link>
        </div>
      </div>

      {/* 3. Main Two-Column Focused Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (6 Cols): Today's Schedule & Personalized Topic Prep */}
        <div className="lg:col-span-6 space-y-4">
          {/* Class Schedule (Minimalist & Clean) */}
          <div className="card p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#38664D]" />
                <h3 className="section-title text-sm">Today's Class Schedule</h3>
              </div>
              <Link to="/planner" className="text-xs font-bold text-[#38664D] hover:underline flex items-center gap-0.5">
                <span>Full Schedule</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="space-y-2">
              {todaySchedule.slice(0, 3).map(item => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    item.status === 'active'
                      ? 'bg-[#EDF6F0] border-[#6EA685]'
                      : 'bg-[#FAF8F5] border-[#EAE3D9]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="badge badge-sage text-[9px] py-0.2">{item.period}</span>
                      <span className="text-xs font-bold text-[#2D2824]">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-[#6E645D]">
                      🕒 {item.time} · 📍 {item.room}
                    </p>
                  </div>

                  <span className={`badge text-[9px] ${item.status === 'active' ? 'badge-sage' : 'badge-beige'}`}>
                    {item.status === 'active' ? 'Active' : item.status === 'completed' ? 'Done' : 'Upcoming'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC FOCUS CARD 1: Key Basics Prep (If selected) */}
          {showPacingBasics && (
            <div className="card p-5 space-y-3 bg-gradient-to-br from-white to-[#FDF2F4]/40 border-[#F8D7DA] shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
                <div className="flex items-center gap-2">
                  <Lightbulb size={15} className="text-[#B84E62]" />
                  <h3 className="section-title text-sm">Today's Key Basics Cue</h3>
                </div>
                <Link to="/planner" className="text-xs font-bold text-[#B84E62] hover:underline flex items-center gap-0.5">
                  <span>Topic Prep</span>
                  <ChevronRight size={13} />
                </Link>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#EAE3D9] space-y-1.5">
                <span className="badge badge-pink text-[9.5px]">Topic: Plant Photosynthesis</span>
                <p className="text-xs text-[#2D2824] leading-relaxed">
                  <strong>Must-Cover:</strong> Chemical formula (CO₂ + H₂O + Light → Glucose + O₂) & Stroma vs Thylakoid light phases.
                </p>
                <p className="text-[11px] text-[#B84E62] italic">
                  ⚠️ Misconception: Clarify that plants respire continuously, not only at night.
                </p>
              </div>
            </div>
          )}

          {/* DYNAMIC FOCUS CARD 2: Assignment Broadcasts (If selected) */}
          {showBroadcasts && (
            <div className="card p-5 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
                <div className="flex items-center gap-2">
                  <Megaphone size={15} className="text-[#D98248]" />
                  <h3 className="section-title text-sm">Active Class Announcement</h3>
                </div>
                <Link to="/students" className="text-xs font-bold text-[#38664D] hover:underline">
                  Broadcasts →
                </Link>
              </div>
              <p className="text-xs font-bold text-[#2D2824]">{studentBroadcasts[0].title}</p>
              <p className="text-[11px] text-[#6E645D] line-clamp-2 leading-relaxed bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EAE3D9]">
                {studentBroadcasts[0].content}
              </p>
            </div>
          )}
        </div>

        {/* Right Column (6 Cols): Quick Reflection & Dynamic Feedback/Speech */}
        <div className="lg:col-span-6 space-y-4">
          {/* Quick 2-Minute Reflection Box */}
          <div className="card p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-[#38664D]" />
                <h3 className="section-title text-sm">2-Minute Daily Reflection</h3>
              </div>
              <span className="badge badge-sage text-[9px]">{currentMood.emoji} {currentMood.mood}</span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={quickInput}
                onChange={e => setQuickInput(e.target.value)}
                placeholder="Log a quick breakthrough, student question, or pacing note..."
                className="input text-xs py-2.5 pr-20"
                onKeyDown={e => {
                  if (e.key === 'Enter') handleQuickSave()
                }}
              />
              <button
                onClick={handleQuickSave}
                disabled={!quickInput.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 btn-primary text-xs px-3 py-1 disabled:opacity-40"
              >
                {savedQuick ? <Check size={12} /> : <Send size={12} />}
                <span>{savedQuick ? 'Saved' : 'Log'}</span>
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] text-xs flex items-start gap-2">
              <Lightbulb size={13} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#2D2824] leading-relaxed">
                <strong className="text-[#38664D]">Mentor Tip: </strong>
                {currentMood.tip}
              </p>
            </div>
          </div>

          {/* DYNAMIC FOCUS CARD 3: Anonymous Student Feedback (If selected) */}
          {showStudentFeedback && (
            <div className="card p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
                <div className="flex items-center gap-2">
                  <Lock size={15} className="text-[#B84E62]" />
                  <h3 className="section-title text-sm">Latest Student Feedback</h3>
                </div>
                <Link to="/students" className="text-xs font-bold text-[#B84E62] hover:underline flex items-center gap-0.5">
                  <span>Student Hub</span>
                  <ChevronRight size={13} />
                </Link>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="badge badge-pink text-[9px]">🔒 Anonymous · Grade 8A</span>
                  <span className="text-amber-500 text-xs font-bold">5.0★</span>
                </div>
                <p className="text-xs text-[#2D2824] leading-relaxed italic">
                  "{anonymousFeedbackList[0].comment}"
                </p>
                <p className="text-[10.5px] text-[#38664D] font-semibold pt-1">
                  💡 AI Action: {anonymousFeedbackList[0].suggestedAction}
                </p>
              </div>
            </div>
          )}

          {/* DYNAMIC FOCUS CARD 4: Communication / Speaking Tip (If selected) */}
          {showCommunication && (
            <div className="card p-5 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
                <div className="flex items-center gap-2">
                  <Mic size={15} className="text-[#38664D]" />
                  <h3 className="section-title text-sm">Today's Speaking Cue</h3>
                </div>
                <Link to="/skills" className="text-xs font-bold text-[#38664D] hover:underline">
                  Speech Hub →
                </Link>
              </div>
              <p className="text-xs font-bold text-[#2D2824]">{communicationGuides[0].title}</p>
              <p className="text-[11px] text-[#6E645D] leading-relaxed">
                {communicationGuides[0].keyTakeaways[0]}
              </p>
            </div>
          )}

          {/* DYNAMIC FOCUS CARD 5: 13-Week Reflection Heatmap (If selected) */}
          {showHabitStreak && (
            <div className="card p-4 space-y-2 shadow-xs">
              <HeatMap data={streakData.calendarData} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
