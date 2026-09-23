import { useState } from 'react'
import {
  GraduationCap,
  School,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  User,
  Building,
  Target,
  MessageCircle,
  Clock,
  Layers,
  HelpCircle,
  X,
  Check,
  CheckSquare,
  Square,
} from 'lucide-react'

const FOCUS_OPTIONS = [
  { id: 'f1', title: 'Communication & Clarity', desc: 'Voice modulation, Socratic questioning, reducing monotone' },
  { id: 'f2', title: 'Lesson Pacing & Key Basics', desc: 'Daily essentials generator, misconception avoidance' },
  { id: 'f3', title: 'Student Feedback', desc: 'Anonymous student feedback vault & complaints resolution' },
  { id: 'f4', title: 'Assignment & Broadcasts', desc: 'Publishing deadlines, rubrics, and quick updates' },
  { id: 'f5', title: 'Classroom Engagement', desc: 'Think-pair-share, active learning, 5E inquiry models' },
  { id: 'f6', title: 'Reflective Consistency', desc: '2-minute daily journaling and habit streak tracking' },
]

export default function EducatorOnboardingModal({ isOpen, onClose, onSave, initialProfile }) {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState(initialProfile?.role || 'school_teacher')
  const [name, setName] = useState(initialProfile?.name || 'Dr. Priya Sharma')
  const [institution, setInstitution] = useState(initialProfile?.institution || 'Delhi Public School')
  const [subject, setSubject] = useState(initialProfile?.subject || 'Integrated Science & Biology')
  const [grade, setGrade] = useState(initialProfile?.grade || 'Grade 8')
  const [selectedFocus, setSelectedFocus] = useState([])

  if (!isOpen) return null

  const toggleFocus = (title) => {
    setSelectedFocus(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const selectAll = () => {
    setSelectedFocus(FOCUS_OPTIONS.map(o => o.title))
  }

  const clearAll = () => {
    setSelectedFocus([])
  }

  const handleFinish = () => {
    const updated = {
      ...initialProfile,
      name,
      role,
      roleTitle: role === 'college_professor' ? `Professor of ${subject.split('&')[0]}` : `${grade} ${subject.split('&')[0]} Specialist`,
      institution,
      subject,
      grade,
      focusAreas: selectedFocus,
    }
    onSave(updated)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-pastel-ink/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#EAE3D9] rounded-3xl w-full max-w-xl shadow-soft-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-pastel-sageLight via-[#FAF8F5] to-pastel-pinkLight p-6 border-b border-[#EAE3D9] relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#6EA685] flex items-center justify-center text-white shadow-sm">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#2D2824]">Welcome to TeachCoach</h2>
                <p className="text-xs text-[#6E645D]">Personalize your teaching & communication workspace</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#6E645D] hover:text-[#2D2824] flex items-center justify-center border border-[#EAE3D9] transition-all cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2 mt-4">
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-[#6EA685]' : 'bg-[#EAE3D9]'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-[#6EA685]' : 'bg-[#EAE3D9]'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 3 ? 'bg-[#6EA685]' : 'bg-[#EAE3D9]'}`} />
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: ROLE */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-[#38664D] uppercase tracking-wider">Step 1 of 3</span>
                <h3 className="text-lg font-bold text-[#2D2824] mt-0.5">What is your teaching role?</h3>
                <p className="text-xs text-[#6E645D] mt-1">
                  We tailor your daily planner, communication tips, and topic fundamentals to your educational level.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRole('school_teacher')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    role === 'school_teacher'
                      ? 'bg-[#EDF6F0] border-[#6EA685] shadow-sm'
                      : 'bg-white border-[#EAE3D9] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#D3E8DC] flex items-center justify-center text-[#38664D]">
                      <School size={20} />
                    </div>
                    {role === 'school_teacher' && <CheckCircle2 size={18} className="text-[#38664D]" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2D2824]">School Teacher (K-12)</h4>
                    <p className="text-xs text-[#6E645D] mt-0.5">
                      Middle & High School classes, parent communications, active engagement & lesson pacing.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('college_professor')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    role === 'college_professor'
                      ? 'bg-[#FDF2F4] border-[#E07A8B] shadow-sm'
                      : 'bg-white border-[#EAE3D9] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F8D7DA] flex items-center justify-center text-[#B84E62]">
                      <GraduationCap size={20} />
                    </div>
                    {role === 'college_professor' && <CheckCircle2 size={18} className="text-[#B84E62]" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2D2824]">College / University Professor</h4>
                    <p className="text-xs text-[#6E645D] mt-0.5">
                      Undergraduate/Graduate lectures, office hours, anonymous student feedback & course broadcasts.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PROFILE DETAILS */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-bold text-[#38664D] uppercase tracking-wider">Step 2 of 3</span>
                <h3 className="text-lg font-bold text-[#2D2824] mt-0.5">Your Educational Profile</h3>
                <p className="text-xs text-[#6E645D] mt-1">
                  Tell us a bit about where and what you teach.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-semibold text-[#2D2824] block mb-1">Full Name & Title</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="input"
                    placeholder="e.g. Dr. Priya Sharma, Prof. Marcus Chen"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#2D2824] block mb-1">
                      {role === 'college_professor' ? 'University / College' : 'School Name'}
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={e => setInstitution(e.target.value)}
                      className="input"
                      placeholder={role === 'college_professor' ? 'e.g. Delhi University' : 'e.g. Delhi Public School'}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#2D2824] block mb-1">
                      {role === 'college_professor' ? 'Department / Subject' : 'Primary Subject'}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="input"
                      placeholder="e.g. Physics, Biology, Economics"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2D2824] block mb-1">
                    {role === 'college_professor' ? 'Semester / Degree Level' : 'Grade / Sections'}
                  </label>
                  <input
                    type="text"
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    className="input"
                    placeholder={role === 'college_professor' ? 'e.g. B.Sc Year 2 / Semester 4' : 'e.g. Grade 8 (Sections A & B)'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MULTI-CHOOSABLE FOCUS AREAS */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-[#38664D] uppercase tracking-wider">Step 3 of 3</span>
                  <h3 className="text-lg font-bold text-[#2D2824] mt-0.5">What would you like to improve most?</h3>
                  <p className="text-xs text-[#6E645D] mt-0.5">
                    Click to select multiple focus areas ({selectedFocus.length} selected).
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={selectAll}
                    className="text-[11px] font-bold text-[#38664D] hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                  <span className="text-[#EAE3D9]">·</span>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-[11px] font-bold text-[#6E645D] hover:underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Multi-Select Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {FOCUS_OPTIONS.map(item => {
                  const isSelected = selectedFocus.includes(item.title)
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleFocus(item.title)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isSelected
                          ? 'bg-[#EDF6F0] border-[#6EA685] shadow-sm'
                          : 'bg-white border-[#EAE3D9] hover:border-[#D8CEBE] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {/* Interactive Custom Checkbox */}
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                          isSelected
                            ? 'bg-[#6EA685] text-white shadow-xs'
                            : 'bg-white border-2 border-[#D8CEBE] text-transparent hover:border-[#6EA685]'
                        }`}
                      >
                        <Check size={13} className={isSelected ? 'opacity-100 stroke-[3]' : 'opacity-0'} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-bold ${isSelected ? 'text-[#38664D]' : 'text-[#2D2824]'}`}>
                            {item.title}
                          </p>
                          {isSelected && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#D3E8DC] text-[#38664D]">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6E645D] leading-tight mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#FAF8F5] border-t border-[#EAE3D9] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="btn-secondary text-xs px-4 py-2"
            >
              Back
            </button>
          ) : (
            <div className="text-[11px] text-[#6E645D]">Step 1 of 3</div>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2"
            >
              <Sparkles size={14} />
              <span>Enter Educator Workspace</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
