import { useState } from 'react'
import {
  Save,
  Shield,
  Download,
  CheckCircle2,
  Sparkles,
  User,
  Sliders,
  Bell,
  Lock,
  School,
  GraduationCap,
} from 'lucide-react'
import { streakData, pathways, reflections, goals } from '../data/mockData'

export default function SettingsPage({ educatorProfile, setEducatorProfile }) {
  const [name, setName] = useState(educatorProfile?.name || 'Dr. Priya Sharma')
  const [role, setRole] = useState(educatorProfile?.role || 'school_teacher')
  const [subject, setSubject] = useState(educatorProfile?.subject || 'Integrated Science & Biology')
  const [grade, setGrade] = useState(educatorProfile?.grade || 'Grade 8')
  const [institution, setInstitution] = useState(educatorProfile?.institution || 'Delhi Public School')
  const [weekGoal, setWeekGoal] = useState(educatorProfile?.weeklyGoalDays || 7)
  const [emailDigest, setEmailDigest] = useState(true)
  const [dailyReminder, setDailyReminder] = useState(true)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    const updated = {
      ...educatorProfile,
      name,
      role,
      roleTitle: role === 'college_professor' ? `Professor of ${subject.split('&')[0]}` : `${grade} ${subject.split('&')[0]} Specialist`,
      subject,
      grade,
      institution,
      weeklyGoalDays: weekGoal,
    }
    setEducatorProfile(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleExportData() {
    const exportPayload = {
      educatorProfile: { name, role, subject, grade, institution, weekGoal },
      streakData,
      pathways,
      reflections,
      goals,
      exportedAt: new Date().toISOString(),
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `teachcoach_backup_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 bg-pastel-bg text-pastel-ink flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Toast Notification */}
      {saved && (
        <div className="fixed bottom-6 right-6 bg-pastel-sageLight border border-pastel-sage text-pastel-sageDark px-4 py-3 rounded-2xl shadow-soft-lg flex items-center gap-2.5 z-50 animate-in fade-in duration-200">
          <CheckCircle2 size={18} />
          <span className="text-xs font-bold">Profile & preferences updated successfully!</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="card p-6 bg-gradient-to-r from-pastel-sageLight via-white to-pastel-pinkLight flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-pastel-ink">Preferences & Educator Settings</h2>
            <span className="badge badge-sage text-[10px]">Synced</span>
          </div>
          <p className="text-xs text-pastel-inkMuted mt-0.5">Manage your educator profile, role mode, and data privacy</p>
        </div>

        <button onClick={handleSave} className="btn-primary text-xs px-4 py-2.5 shadow-sage shrink-0">
          <Save size={15} />
          <span>{saved ? 'Saved ✓' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="card p-6 flex flex-col gap-5 shadow-soft">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
          <div className="flex items-center gap-2">
            <User size={16} className="text-pastel-sageDark" />
            <h3 className="section-title">Educator Profile</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pastel-sage to-pastel-pink flex items-center justify-center text-white text-base font-bold shadow-sage">
            {name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <p className="text-sm font-bold text-pastel-ink">{name}</p>
            <p className="text-xs text-pastel-inkMuted">{institution} · {grade} {subject}</p>
          </div>
        </div>

        {/* Role Toggle Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-pastel-ink block">Educator Role</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('school_teacher')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                role === 'school_teacher'
                  ? 'bg-pastel-sageLight border-pastel-sage shadow-soft'
                  : 'bg-white border-[#EAE3D9]'
              }`}
            >
              <School size={16} className="text-pastel-sageDark shrink-0" />
              <div>
                <p className="text-xs font-bold text-pastel-ink">School Teacher (K-12)</p>
                <p className="text-[10px] text-pastel-inkMuted">Middle/High School</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('college_professor')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                role === 'college_professor'
                  ? 'bg-pastel-pinkLight border-pastel-pink shadow-soft'
                  : 'bg-white border-[#EAE3D9]'
              }`}
            >
              <GraduationCap size={16} className="text-pastel-pinkDark shrink-0" />
              <div>
                <p className="text-xs font-bold text-pastel-ink">College Professor</p>
                <p className="text-[10px] text-pastel-inkMuted">Undergraduate/Graduate</p>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-pastel-ink block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-pastel-ink block mb-1">Institution / School Name</label>
            <input
              type="text"
              value={institution}
              onChange={e => setInstitution(e.target.value)}
              className="input text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-pastel-ink block mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="input text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-pastel-ink block mb-1">Grade / Level</label>
            <input
              type="text"
              value={grade}
              onChange={e => setGrade(e.target.value)}
              className="input text-xs"
            />
          </div>
        </div>
      </div>

      {/* Cadence & Export */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#EAE3D9]">
            <Sliders size={15} className="text-pastel-sageDark" />
            <h3 className="section-title">Weekly Reflection Commitment</h3>
          </div>
          <p className="text-xs text-pastel-inkMuted">Target reflection days per week: <strong className="text-pastel-ink">{weekGoal} days</strong></p>
          <input
            type="range"
            min="1"
            max="7"
            value={weekGoal}
            onChange={e => setWeekGoal(Number(e.target.value))}
            className="w-full accent-pastel-sage"
          />
        </div>

        <div className="card p-5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-2 border-b border-[#EAE3D9]">
            <Download size={15} className="text-pastel-pinkDark" />
            <h3 className="section-title">Export Pedagogical Data</h3>
          </div>
          <p className="text-xs text-pastel-inkMuted">Download a formatted JSON archive of your journal, CPD credentials, and planner records.</p>
          <button
            onClick={handleExportData}
            className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5 self-start"
          >
            <Download size={13} />
            <span>Download Data (.json)</span>
          </button>
        </div>
      </div>
    </main>
  )
}
