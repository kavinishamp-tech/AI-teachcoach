import { useState } from 'react'
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle2,
  Circle,
  BookOpen,
  Sparkles,
  Search,
  Check,
  Play,
  RotateCcw,
  Layers,
  Award,
  X,
} from 'lucide-react'
import { pathways as initialPathways } from '../data/mockData'
import ProgressRing from '../components/layout/ProgressRing'

function ModulePlayerModal({ module, pathway, onClose, onToggleComplete }) {
  if (!module) return null

  return (
    <div className="fixed inset-0 bg-pastel-ink/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-[#EAE3D9] rounded-3xl w-full max-w-xl shadow-soft-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#FAF8F5] text-pastel-inkMuted hover:text-pastel-ink"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-sage text-[10px]">{pathway.title}</span>
          <span className="text-xs text-pastel-inkMuted flex items-center gap-1">
            <Clock size={11} /> {module.mins} mins
          </span>
        </div>

        <h3 className="text-lg font-bold text-pastel-ink mb-2">{module.title}</h3>

        <div className="bg-[#FAF8F5] border border-[#EAE3D9] rounded-2xl p-4 space-y-3 mb-5">
          <p className="text-xs font-bold text-pastel-sageDark uppercase tracking-wider">Module Overview & Pedagogical Practice</p>
          <p className="text-xs sm:text-sm text-pastel-ink leading-relaxed">
            In this micro-module, you'll explore evidence-based strategies to implement <strong>{module.title}</strong> directly in your next lesson. Focus on observing student engagement and concept retention when applying this approach.
          </p>
          <div className="p-3 rounded-xl bg-white border border-[#EAE3D9] text-xs text-pastel-ink space-y-1 shadow-soft">
            <p className="font-bold text-pastel-sageDark">🎯 Classroom Takeaway:</p>
            <p className="text-pastel-inkMuted">Shift 20% of passive lecture time into collaborative peer reflection using structured prompts.</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#EAE3D9]">
          <button
            onClick={() => {
              onToggleComplete(module.id)
              onClose()
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              module.done
                ? 'btn-secondary text-pastel-inkMuted'
                : 'btn-primary shadow-sage'
            }`}
          >
            {module.done ? (
              <>
                <RotateCcw size={14} />
                <span>Mark as Uncompleted</span>
              </>
            ) : (
              <>
                <Check size={14} />
                <span>Mark as Complete & Finish</span>
              </>
            )}
          </button>

          <button onClick={onClose} className="btn-secondary text-xs px-4 py-2">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function ModuleListView({ pathway, onBack, onToggleModule }) {
  const [activeLesson, setActiveLesson] = useState(null)
  const pct = Math.round((pathway.modulesCompleted / pathway.totalModules) * 100)

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto w-full">
      {activeLesson && (
        <ModulePlayerModal
          module={activeLesson}
          pathway={pathway}
          onClose={() => setActiveLesson(null)}
          onToggleComplete={(mId) => onToggleModule(pathway.id, mId)}
        />
      )}

      {/* Back Button & Pathway Overview Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft size={14} />
          <span>All Pathways</span>
        </button>
      </div>

      <div className="card p-6 bg-gradient-to-r from-pastel-sageLight/50 via-white to-pastel-pinkLight/30 border-[#EAE3D9] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="badge badge-sage text-[10px]">{pathway.tag}</span>
            <span className="text-xs text-pastel-inkMuted">{pathway.minutesLeft} mins total</span>
          </div>
          <h2 className="text-xl font-bold text-pastel-ink">{pathway.title}</h2>
          <p className="text-xs sm:text-sm text-pastel-inkMuted leading-relaxed">{pathway.description}</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#EAE3D9] shadow-soft shrink-0">
          <ProgressRing pct={pct} color={pathway.color} trackColor="#EAE3D9" size={56} strokeWidth={5} />
          <div>
            <p className="text-base font-bold text-pastel-ink">{pct}%</p>
            <p className="text-xs text-pastel-inkMuted">{pathway.modulesCompleted}/{pathway.totalModules} Completed</p>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        <h3 className="section-title">Pathway Curriculum Modules</h3>
        <div className="space-y-2.5">
          {pathway.modules.map((m, idx) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                m.done ? 'bg-[#FAF8F5] border-[#EAE3D9]' : 'bg-white border-[#EAE3D9] hover:border-pastel-sage shadow-soft'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => onToggleModule(pathway.id, m.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    m.done ? 'bg-pastel-sage text-white' : 'border border-[#EAE3D9] text-transparent hover:border-pastel-sage'
                  }`}
                  title={m.done ? 'Mark uncomplete' : 'Mark complete'}
                >
                  <Check size={12} />
                </button>
                <div>
                  <p className={`text-xs sm:text-sm font-bold ${m.done ? 'line-through text-pastel-inkMuted' : 'text-pastel-ink'}`}>
                    {idx + 1}. {m.title}
                  </p>
                  <p className="text-[11px] text-pastel-inkMuted flex items-center gap-1.5 mt-0.5">
                    <Clock size={11} /> {m.mins} mins micro-lesson
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveLesson(m)}
                  className="btn-primary text-xs px-3.5 py-1.5 flex items-center gap-1.5 shadow-sage"
                >
                  <Play size={12} />
                  <span>{m.done ? 'Review' : 'Start Lesson'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PathwaysPage() {
  const [pathwaysList, setPathwaysList] = useState(initialPathways)
  const [selectedPathway, setSelectedPathway] = useState(null)
  const [filterTag, setFilterTag] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const handleToggleModule = (pathwayId, moduleId) => {
    setPathwaysList(prev =>
      prev.map(p => {
        if (p.id !== pathwayId) return p
        const updatedModules = p.modules.map(m =>
          m.id === moduleId ? { ...m, done: !m.done } : m
        )
        const completedCount = updatedModules.filter(m => m.done).length
        return {
          ...p,
          modules: updatedModules,
          modulesCompleted: completedCount,
        }
      })
    )
    if (selectedPathway && selectedPathway.id === pathwayId) {
      setSelectedPathway(prev => {
        const updatedModules = prev.modules.map(m =>
          m.id === moduleId ? { ...m, done: !m.done } : m
        )
        return {
          ...prev,
          modules: updatedModules,
          modulesCompleted: updatedModules.filter(m => m.done).length,
        }
      })
    }
  }

  const tags = ['All', ...new Set(initialPathways.map(p => p.tag))]

  const filtered = pathwaysList.filter(p => {
    const matchesTag = filterTag === 'All' || p.tag === filterTag
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesQuery
  })

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 bg-pastel-bg text-pastel-ink max-w-7xl mx-auto w-full">
      {selectedPathway ? (
        <ModuleListView
          pathway={selectedPathway}
          onBack={() => setSelectedPathway(null)}
          onToggleModule={handleToggleModule}
        />
      ) : (
        <>
          {/* Header Banner */}
          <div className="card bg-gradient-to-r from-pastel-sageLight via-white to-pastel-pinkLight p-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-pastel-sage flex items-center justify-center text-white shadow-sage shrink-0">
                  <Layers size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-pastel-ink">Pedagogy & Upskilling Pathways</h1>
                    <span className="badge badge-sage text-[10px]">Accredited CPD</span>
                  </div>
                  <p className="text-xs text-pastel-inkMuted mt-0.5">
                    Structured micro-learning modules designed for immediate classroom application.
                  </p>
                </div>
              </div>

              {/* Search input */}
              <div className="w-full md:w-64 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search pathways..."
                  className="input text-xs pl-8"
                />
                <Search size={14} className="absolute left-2.5 top-3 text-pastel-inkMuted" />
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-pastel-inkMuted mr-1">Categories:</span>
            {tags.map(t => (
              <button
                key={t}
                onClick={() => setFilterTag(t)}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all cursor-pointer ${
                  filterTag === t
                    ? 'bg-pastel-sage text-white border-pastel-sage shadow-sage'
                    : 'bg-white text-pastel-inkMuted border-[#EAE3D9] hover:bg-[#FAF8F5]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Pathways Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(p => {
              const pct = Math.round((p.modulesCompleted / p.totalModules) * 100)
              return (
                <div
                  key={p.id}
                  className="card p-6 flex flex-col justify-between gap-4 hover:border-pastel-sage transition-all shadow-soft"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="badge badge-sage text-[10px]">{p.tag}</span>
                      <span className="text-xs text-pastel-inkMuted font-medium">~{p.minutesLeft} mins left</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-pastel-ink mb-1">{p.title}</h3>
                      <p className="text-xs text-pastel-inkMuted leading-relaxed line-clamp-2">{p.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#EAE3D9]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-pastel-inkMuted">{p.modulesCompleted} of {p.totalModules} modules finished</span>
                      <span className="font-bold text-pastel-sageDark">{pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#EAE3D9] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-pastel-sage transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => setSelectedPathway(p)}
                        className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-sage"
                      >
                        <span>Open Pathway Curriculum</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </main>
  )
}
