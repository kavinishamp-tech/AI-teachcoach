import { useState } from 'react'
import {
  X,
  Edit3,
  Download,
  Check,
  Flame,
  BookOpen,
  Layers,
  Award,
  Shield,
  Sparkles,
  School,
  Calendar,
  Save,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { streakData, pathways } from '../../data/mockData'

const BADGES = [
  {
    id: 'b1',
    title: '5E Inquiry Pioneer',
    category: 'Pedagogy',
    desc: 'Demonstrated inquiry-led lesson structuring.',
    icon: '🌟',
    earned: true,
  },
  {
    id: 'b2',
    title: 'Habit Master (21+ Days)',
    category: 'Consistency',
    desc: 'Maintained 3+ weeks of reflective journaling.',
    icon: '🔥',
    earned: true,
  },
  {
    id: 'b3',
    title: 'Curiosity Catalyst',
    category: 'Engagement',
    desc: 'Logged 10+ student curiosity observations.',
    icon: '💡',
    earned: true,
  },
  {
    id: 'b4',
    title: '30-Day Master Streak',
    category: 'Consistency',
    desc: '1 month of daily reflections.',
    icon: '🏆',
    earned: false,
    progress: '23 / 30 Days',
  },
]

export default function ProfileDrawer({ isOpen, onClose, educatorProfile, setEducatorProfile }) {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [editName, setEditName] = useState(educatorProfile?.name || 'Dr. Priya Sharma')
  const [editSchool, setEditSchool] = useState(educatorProfile?.institution || 'Delhi Public School')
  const [editSubject, setEditSubject] = useState(educatorProfile?.subject || 'Integrated Science')
  const [editGrade, setEditGrade] = useState(educatorProfile?.grade || 'Grade 8')
  const [savedToast, setSavedToast] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    setEducatorProfile({
      ...educatorProfile,
      name: editName,
      institution: editSchool,
      subject: editSubject,
      grade: editGrade,
    })
    setIsEditing(false)
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-pastel-ink/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#EAE3D9] shadow-soft-lg flex flex-col justify-between overflow-y-auto">
          {/* Drawer Header */}
          <div className="p-6 bg-gradient-to-r from-pastel-sageLight via-white to-pastel-pinkLight border-b border-[#EAE3D9] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="badge badge-sage text-[10px]">
                  {educatorProfile?.role === 'college_professor' ? 'Professor Portfolio' : 'Educator Portfolio'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-secondary text-xs px-2.5 py-1.5 flex items-center gap-1"
                >
                  <Edit3 size={12} />
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-pastel-inkMuted hover:text-pastel-ink"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Profile Avatar & Info */}
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pastel-sage to-pastel-pink flex items-center justify-center text-white text-lg font-bold shadow-sage shrink-0">
                {educatorProfile?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || 'PS'}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-pastel-ink truncate">
                  {educatorProfile?.name || 'Dr. Priya Sharma'}
                </h2>
                <p className="text-xs text-pastel-inkMuted truncate">
                  {educatorProfile?.institution || 'Delhi Public School'}
                </p>
                <p className="text-[11px] text-pastel-sageDark font-semibold mt-0.5">
                  {educatorProfile?.grade} · {educatorProfile?.subject}
                </p>
              </div>
            </div>

            {/* 3 Quick KPIs */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#EAE3D9] text-center shadow-soft">
                <span className="text-xs font-bold text-pastel-ink block">{streakData.current} Days</span>
                <span className="text-[9.5px] text-pastel-inkMuted">Streak 🔥</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EAE3D9] text-center shadow-soft">
                <span className="text-xs font-bold text-pastel-ink block">4.8★</span>
                <span className="text-[9.5px] text-pastel-inkMuted">Student Score</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EAE3D9] text-center shadow-soft">
                <span className="text-xs font-bold text-pastel-ink block">4 Tracks</span>
                <span className="text-[9.5px] text-pastel-inkMuted">Pathways</span>
              </div>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="p-6 space-y-5 flex-1">
            {isEditing ? (
              <div className="space-y-3 animate-in fade-in duration-150">
                <h3 className="text-xs font-bold text-pastel-ink uppercase tracking-wider">Edit Profile Details</h3>
                <div>
                  <label className="text-xs font-semibold text-pastel-ink block mb-1">Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-pastel-ink block mb-1">Institution</label>
                  <input
                    type="text"
                    value={editSchool}
                    onChange={e => setEditSchool(e.target.value)}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-pastel-ink block mb-1">Subject</label>
                  <input
                    type="text"
                    value={editSubject}
                    onChange={e => setEditSubject(e.target.value)}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-pastel-ink block mb-1">Grade / Level</label>
                  <input
                    type="text"
                    value={editGrade}
                    onChange={e => setEditGrade(e.target.value)}
                    className="input text-xs"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button onClick={() => setIsEditing(false)} className="btn-secondary text-xs px-3 py-1.5">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="btn-primary text-xs px-4 py-1.5 shadow-sage">
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="section-title">Pedagogical Badges & Achievements</h3>
                <div className="space-y-2.5">
                  {BADGES.map(badge => (
                    <div
                      key={badge.id}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                        badge.earned ? 'bg-pastel-sageLight/50 border-pastel-sageSoft' : 'bg-[#FAF8F5] border-[#EAE3D9]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{badge.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-pastel-ink">{badge.title}</p>
                          <p className="text-[10.5px] text-pastel-inkMuted">{badge.desc}</p>
                        </div>
                      </div>

                      <span className={`badge text-[9px] ${badge.earned ? 'badge-sage' : 'badge-beige'}`}>
                        {badge.earned ? 'Unlocked' : badge.progress}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE3D9] flex items-center justify-between">
            <span className="text-xs text-pastel-inkMuted">100% encrypted & private</span>
            <button onClick={onClose} className="btn-secondary text-xs px-4 py-2">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
