import { useState } from 'react'
import {
  Mic,
  Volume2,
  HelpCircle,
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react'
import { communicationGuides, simulationScenarios, teacher } from '../data/mockData'

export default function CommunicationSkillsPage() {
  const [activeTab, setActiveTab] = useState('guides') // 'guides' | 'simulator'
  const [selectedGuide, setSelectedGuide] = useState(communicationGuides[0])
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)

  const currentScenario = simulationScenarios[activeScenarioIdx]

  const handleSelectOption = (idx) => {
    setSelectedOption(idx)
    if (currentScenario.options[idx].rating === 'Masterful') {
      setScore(s => s + 10)
    }
  }

  const handleNextScenario = () => {
    setSelectedOption(null)
    setActiveScenarioIdx(i => (i + 1) % simulationScenarios.length)
  }

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 bg-pastel-bg text-pastel-ink max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="card bg-gradient-to-r from-pastel-sageLight via-white to-pastel-pinkLight p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-pastel-sage flex items-center justify-center text-white shadow-sage shrink-0">
              <Mic size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-pastel-ink">Teaching & Communication Skills Hub</h1>
                <span className="badge badge-sage text-[10px]">Verbal Mastery</span>
              </div>
              <p className="text-xs text-pastel-inkMuted mt-0.5">
                Refine your lecture delivery, voice modulation, Socratic questioning, and practice challenging classroom scenarios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/80 p-1 rounded-xl border border-[#EAE3D9] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'guides' ? 'bg-pastel-sage text-white shadow-sm' : 'text-pastel-inkMuted hover:text-pastel-ink'
              }`}
            >
              <BookOpen size={13} />
              <span>Communication Guides</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'simulator' ? 'bg-pastel-pink text-white shadow-sm' : 'text-pastel-inkMuted hover:text-pastel-ink'
              }`}
            >
              <Sparkles size={13} />
              <span>Interactive Scenario Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: COMMUNICATION GUIDES */}
      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Guide Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="section-title">Core Speaking Frameworks</h3>
            <div className="space-y-2">
              {communicationGuides.map(guide => (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    selectedGuide.id === guide.id
                      ? 'bg-pastel-sageLight/70 border-pastel-sage shadow-soft'
                      : 'bg-white border-[#EAE3D9] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="badge badge-sage text-[9.5px]">{guide.category}</span>
                    <span className="text-[10.5px] text-pastel-inkMuted">{guide.duration}</span>
                  </div>
                  <h4 className="text-xs font-bold text-pastel-ink">{guide.title}</h4>
                </button>
              ))}
            </div>

            {/* Quick Practice Pill */}
            <div className="p-4 rounded-2xl bg-pastel-pinkLight/60 border border-pastel-pinkSoft space-y-2">
              <span className="text-xs font-bold text-pastel-pinkDark flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>Today's Vocal Tip</span>
              </span>
              <p className="text-xs text-pastel-ink leading-relaxed">
                Take a 3-second sip of water when transitioning between concepts. It resets classroom attention and prevents vocal strain.
              </p>
            </div>
          </div>

          {/* Guide Detail View (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="card p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
                <div>
                  <span className="badge badge-sage text-[10px] mb-1">{selectedGuide.category}</span>
                  <h2 className="text-lg font-bold text-pastel-ink">{selectedGuide.title}</h2>
                </div>
                <div className="w-10 h-10 rounded-xl bg-pastel-sageSoft flex items-center justify-center text-pastel-sageDark">
                  <Volume2 size={20} />
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-pastel-ink uppercase tracking-wider">Key Pedagogical Rules:</h4>
                <div className="space-y-2">
                  {selectedGuide.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-pastel-sage text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-pastel-ink leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Exercise Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pastel-peachLight/80 to-white border border-pastel-peachSoft space-y-1.5">
                <span className="text-xs font-bold text-pastel-peachDark flex items-center gap-1.5">
                  <Play size={13} />
                  <span>Classroom Action Exercise:</span>
                </span>
                <p className="text-xs text-pastel-ink leading-relaxed">
                  {selectedGuide.exercise}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('simulator')}
                  className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-sage"
                >
                  <span>Practice In Scenario Simulator</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE SCENARIO SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="card bg-gradient-to-b from-white to-[#FAF8F5] p-6 space-y-5 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
              <div className="flex items-center gap-2">
                <span className="badge badge-pink text-[10px]">Scenario {activeScenarioIdx + 1} of {simulationScenarios.length}</span>
                <span className="text-xs text-pastel-inkMuted">Classroom Communication Simulation</span>
              </div>
              <span className="text-xs font-bold text-pastel-sageDark">Communication XP: {score}</span>
            </div>

            {/* Scenario Prompt */}
            <div className="p-5 rounded-2xl bg-pastel-pinkLight/50 border border-pastel-pinkSoft space-y-2">
              <span className="text-xs font-bold text-pastel-pinkDark uppercase tracking-wider">Classroom Situation:</span>
              <p className="text-sm font-semibold text-pastel-ink leading-relaxed">
                "{currentScenario.scenario}"
              </p>
            </div>

            {/* Response Options */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-pastel-ink">How would you respond as an educator?</p>
              {currentScenario.options.map((opt, idx) => {
                const isSelected = selectedOption === idx
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? opt.rating === 'Masterful'
                          ? 'bg-pastel-sageLight border-pastel-sage shadow-sage/20'
                          : 'bg-pastel-pinkLight border-pastel-pink shadow-pink/20'
                        : 'bg-white border-[#EAE3D9] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? opt.rating === 'Masterful' ? 'bg-pastel-sage text-white' : 'bg-pastel-pink text-white'
                          : 'bg-[#F5EFEB] text-pastel-ink'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <p className="text-xs text-pastel-ink font-medium leading-relaxed">{opt.text}</p>
                    </div>

                    {/* Feedback Explanation after selection */}
                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-[#EAE3D9] pl-9 space-y-1 animate-in fade-in duration-150">
                        <span className={`badge text-[9.5px] ${
                          opt.rating === 'Masterful' ? 'badge-sage' : opt.rating === 'Suboptimal' ? 'badge-peach' : 'badge-pink'
                        }`}>
                          Rating: {opt.rating}
                        </span>
                        <p className="text-xs text-pastel-inkMuted leading-relaxed">{opt.feedback}</p>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Next Button */}
            {selectedOption !== null && (
              <div className="flex justify-end pt-3">
                <button
                  onClick={handleNextScenario}
                  className="btn-primary text-xs px-5 py-2 flex items-center gap-1.5 shadow-sage"
                >
                  <span>Next Classroom Scenario</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
