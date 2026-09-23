import { useState } from 'react'
import {
  User,
  Mail,
  School,
  BookOpen,
  Calendar,
  Award,
  Flame,
  CheckCircle2,
  Sparkles,
  Edit3,
  Share2,
  Download,
  Shield,
  Layers,
  Clock,
  Heart,
  Quote,
  Target,
  FileText,
  Star,
  Zap,
  X,
  Check,
} from 'lucide-react'
import { teacher, streakData, pathways, reflections, goals, gapAnalysis } from '../data/mockData'

const BADGES = [
  {
    id: 'b1',
    title: '5E Inquiry Pioneer',
    category: 'Pedagogy',
    desc: 'Demonstrated exceptional inquiry-led lesson structuring.',
    icon: '🌟',
    earned: true,
    date: 'Earned June 2026',
  },
  {
    id: 'b2',
    title: 'Habit Master (21+ Days)',
    category: 'Consistency',
    desc: 'Maintained 3+ weeks of uninterrupted reflective journaling.',
    icon: '🔥',
    earned: true,
    date: 'Earned July 2026',
  },
  {
    id: 'b3',
    title: 'Curiosity Catalyst',
    category: 'Engagement',
    desc: 'Logged 10+ spontaneous student inquiry observations.',
    icon: '💡',
    earned: true,
    date: 'Earned July 2026',
  },
  {
    id: 'b4',
    title: 'Pacing Strategist',
    category: 'Classroom',
    desc: 'Completed all foundational time-boxing & warm-up modules.',
    icon: '⏱️',
    earned: true,
    date: 'Earned May 2026',
  },
  {
    id: 'b5',
    title: 'Differentiated Champion',
    category: 'Inclusion',
    desc: 'Applied tiered assignments and multi-modal student outputs.',
    icon: '🤝',
    earned: false,
    progress: '75% Complete (6/8 modules)',
  },
  {
    id: 'b6',
    title: '30-Day Master Streak',
    category: 'Consistency',
    desc: 'Reach one full month of intentional daily reflections.',
    icon: '🏆',
    earned: false,
    progress: '23 / 30 Days (7 to go)',
  },
]

const CERTIFICATIONS = [
  {
    title: 'Advanced 5E Inquiry Instructional Design',
    issuer: 'TeachCoach Pedagogy Academy',
    year: '2026',
    status: 'Verified Credential',
    badgeColor: 'badge-cyan',
  },
  {
    title: 'Differentiated Assessment in Secondary STEM',
    issuer: 'National Council of Science Educators',
    year: '2025',
    status: 'Certified',
    badgeColor: 'badge-indigo',
  },
  {
    title: 'Active Learning & Peer-Instruction Specialist',
    issuer: 'Delhi Public School Teacher Institute',
    year: '2024',
    status: 'Completed',
    badgeColor: 'badge-emerald',
  },
]

function EditProfileModal({ profile, onClose, onSave }) {
  const [formData, setFormData] = useState(profile)

  const handleSubmit = e => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-750 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-200"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Edit3 size={16} />
          </div>
          <h3 className="text-base font-bold text-slate-100">Edit Educator Profile</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="input text-xs sm:text-sm bg-slate-950/80"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="input text-xs sm:text-sm bg-slate-950/80"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Grade Level</label>
              <input
                type="text"
                value={formData.grade}
                onChange={e => setFormData({ ...formData, grade: e.target.value })}
                className="input text-xs sm:text-sm bg-slate-950/80"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">School / Institution</label>
            <input
              type="text"
              value={formData.school}
              onChange={e => setFormData({ ...formData, school: e.target.value })}
              className="input text-xs sm:text-sm bg-slate-950/80"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Teaching Philosophy & Bio</label>
            <textarea
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="input text-xs sm:text-sm leading-relaxed bg-slate-950/80 resize-none"
            />
          </div>

          <div className="flex gap-2.5 pt-3 border-t border-slate-800">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 text-xs py-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1 text-xs py-2">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    ...teacher,
    email: 'priya.sharma@dps-delhi.edu.in',
    title: 'Senior Middle School Science Specialist',
    bio: 'Passionate about inquiry-based science education, student curiosity modeling, and active formative assessment. Committed to turning every science class into an experimental playground.',
    domains: ['Inquiry Science', 'Cell Biology', 'Chemical Reactions', '5E Instructional Model', 'Differentiated Learning'],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const totalDoneModules = pathways.reduce((a, p) => a + p.modulesCompleted, 0)
  const totalReflectionsCount = 85 // Cumulative reflections

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleDownloadPortfolio = () => {
    const portfolioPayload = {
      educator: profileData,
      stats: {
        totalReflections: totalReflectionsCount,
        currentStreak: streakData.current,
        longestStreak: streakData.longest,
        modulesMastered: totalDoneModules,
      },
      badges: BADGES,
      certifications: CERTIFICATIONS,
      strengths: gapAnalysis.strengths,
      growthAreas: gapAnalysis.gaps,
      generatedAt: new Date().toISOString(),
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioPayload, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `${profileData.name.replace(/\s+/g, '_')}_Pedagogical_Portfolio.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 bg-slate-950 text-slate-100 flex flex-col gap-6 max-w-6xl mx-auto w-full">
      {isEditing && (
        <EditProfileModal
          profile={profileData}
          onClose={() => setIsEditing(false)}
          onSave={data => setProfileData(data)}
        />
      )}

      {/* Hero Profile Banner Card */}
      <div className="card bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border-slate-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative group">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shadow-xl shadow-indigo-500/20"
                style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)' }}
              >
                {profileData.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white" title="Active Verified Educator">
                <Check size={12} strokeWidth={3} />
              </div>
            </div>

            {/* Identity Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100">{profileData.name}</h1>
                <span className="badge badge-cyan text-[10px]">Verified Educator</span>
                <span className="badge badge-amber text-[10px] flex items-center gap-1">
                  <Flame size={11} className="text-amber-400" />
                  <span>{streakData.current}-Day Streak</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cyan-300 font-medium">{profileData.title}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-0.5">
                <span className="flex items-center gap-1.5">
                  <School size={13} className="text-slate-400" />
                  <span>{profileData.school}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={13} className="text-slate-400" />
                  <span>{profileData.grade} · {profileData.subject}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-slate-400" />
                  <span>Member since {profileData.joinedDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5 flex-1 sm:flex-none justify-center"
            >
              <Edit3 size={14} className="text-cyan-400" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={handleDownloadPortfolio}
              className="btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5 flex-1 sm:flex-none justify-center shadow-glow-cyan"
            >
              <Download size={14} />
              <span>Export Portfolio</span>
            </button>
            <button
              onClick={handleShare}
              className="btn-secondary text-xs p-2 flex items-center justify-center"
              title="Share Public Link"
            >
              {copiedLink ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Reflections</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen size={14} />
            </div>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-100">{totalReflectionsCount}</span>
            <span className="text-xs text-slate-400 ml-1.5">entries</span>
          </div>
          <p className="text-[11px] text-cyan-400">Top topic: Student engagement</p>
        </div>

        <div className="card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Current Habit Streak</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame size={14} />
            </div>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-100">{streakData.current}</span>
            <span className="text-xs text-amber-400 font-semibold ml-1.5">days</span>
          </div>
          <p className="text-[11px] text-slate-400">Longest streak record: {streakData.longest} days</p>
        </div>

        <div className="card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Curriculum Mastery</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Layers size={14} />
            </div>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-100">{totalDoneModules}</span>
            <span className="text-xs text-indigo-300 font-semibold ml-1.5">modules</span>
          </div>
          <p className="text-[11px] text-slate-400">Across 4 upskilling pathways</p>
        </div>

        <div className="card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Badges Unlocked</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award size={14} />
            </div>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-100">4 / 6</span>
            <span className="text-xs text-emerald-400 font-semibold ml-1.5">achievements</span>
          </div>
          <p className="text-[11px] text-slate-400">2 in progress</p>
        </div>
      </div>

      {/* Philosophy & Pedagogical Domains */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Philosophy Card (2 cols) */}
        <div className="card lg:col-span-2 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-3">
              <Quote size={16} className="text-cyan-400" />
              <h3 className="section-title">Teaching Philosophy & Methodology</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-4">
              "{profileData.bio}"
            </p>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Pedagogical Domains</p>
              <div className="flex flex-wrap gap-1.5">
                {profileData.domains.map(d => (
                  <span key={d} className="badge badge-cyan text-xs px-3 py-1">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Primary Focus: Active Student Inquiry</span>
            <span className="text-emerald-400 font-medium">✓ Evaluated via 5E Model</span>
          </div>
        </div>

        {/* Strengths & Growth Areas */}
        <div className="card flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-3">
              <Sparkles size={16} className="text-indigo-400" />
              <h3 className="section-title">AI Pedagogy Profile</h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5">Validated Strengths</p>
                <div className="flex flex-wrap gap-1.5">
                  {gapAnalysis.strengths.map(s => (
                    <span key={s} className="badge badge-emerald text-[10.5px]">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1.5">Target Growth Areas</p>
                <div className="flex flex-wrap gap-1.5">
                  {gapAnalysis.gaps.map(g => (
                    <span key={g} className="badge badge-cyan text-[10.5px]">
                      🎯 {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
            Next recommended module: <strong className="text-slate-200">Differentiated Assessment</strong>
          </div>
        </div>
      </div>

      {/* Pedagogical Badges & Milestone Showcase */}
      <div className="card">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-amber-400" />
            <h3 className="section-title">Pedagogical Badges & Achievements</h3>
          </div>
          <span className="text-xs text-slate-400">4 Unlocked · 2 In Progress</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES.map(b => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                b.earned
                  ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40 hover:shadow-glow-cyan'
                  : 'bg-slate-950/50 border-slate-850 opacity-75'
              }`}
            >
              <div className="text-2xl shrink-0 p-2 rounded-xl bg-slate-950 border border-slate-800">
                {b.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-bold text-slate-100 truncate">{b.title}</h4>
                  <span className={`badge text-[9px] py-0.2 ${b.earned ? 'badge-emerald' : 'badge-slate'}`}>
                    {b.earned ? 'Unlocked' : 'In Progress'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-2">{b.desc}</p>
                <p className="text-[10px] font-semibold text-cyan-400">
                  {b.earned ? b.date : b.progress}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Development Certifications */}
      <div className="card">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <h3 className="section-title">Professional Development Credentials</h3>
          </div>
          <span className="text-xs text-slate-400">Continuous Professional Development (CPD)</span>
        </div>

        <div className="space-y-3">
          {CERTIFICATIONS.map((c, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Award size={16} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200">{c.title}</h4>
                  <p className="text-[11px] text-slate-400">{c.issuer} · Issued {c.year}</p>
                </div>
              </div>
              <span className={`badge ${c.badgeColor} text-[10px] self-start sm:self-auto`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Confidentiality & Security Reassurance */}
      <div className="card bg-gradient-to-r from-slate-900 to-emerald-950/20 border-emerald-900/40 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-200">Private Professional Portfolio</p>
            <p className="text-[11px] text-slate-400">All profile statistics and reflection insights are strictly under your control.</p>
          </div>
        </div>
        <button
          onClick={handleDownloadPortfolio}
          className="btn-secondary text-xs px-3 py-1.5 shrink-0 hidden sm:flex items-center gap-1.5"
        >
          <Download size={13} />
          <span>Download Record</span>
        </button>
      </div>
    </main>
  )
}
