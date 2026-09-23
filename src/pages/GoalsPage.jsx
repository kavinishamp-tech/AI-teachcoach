import { useState } from 'react'
import {
  Plus,
  Target,
  X,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  Award,
  Trash2,
  Check,
} from 'lucide-react'
import { goals as initialGoals } from '../data/mockData'

const CATEGORIES = ['Habit', 'Pathway', 'Pedagogy', 'Communication']

function AddGoalModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Habit')
  const [target, setTarget] = useState('7')
  const [unit, setUnit] = useState('days')

  function handleAdd() {
    if (!title.trim() || !target) return
    onAdd({
      id: `g${Date.now()}`,
      title,
      category,
      target: Number(target),
      current: 0,
      unit,
      progress: 0,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-pastel-ink/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-[#EAE3D9] rounded-3xl w-full max-w-md shadow-soft-lg p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pastel-sageLight flex items-center justify-center text-pastel-sageDark">
              <Target size={16} />
            </div>
            <h3 className="text-base font-bold text-pastel-ink">Add Professional Goal</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-pastel-inkMuted hover:text-pastel-ink">
            <X size={16} />
          </button>
        </div>

        <div>
          <label className="text-xs font-bold text-pastel-ink block mb-1">Goal Description</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Incorporate pair-share in all 3 class periods"
            className="input text-xs sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-pastel-ink block mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="input text-xs cursor-pointer"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-pastel-ink block mb-1">Target Number</label>
            <input
              type="number"
              value={target}
              onChange={e => setTarget(e.target.value)}
              placeholder="e.g. 7"
              className="input text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EAE3D9]">
          <button onClick={onClose} className="btn-secondary text-xs px-4 py-2">
            Cancel
          </button>
          <button onClick={handleAdd} disabled={!title.trim()} className="btn-primary text-xs px-5 py-2 shadow-sage disabled:opacity-40">
            Create Goal
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GoalsPage() {
  const [goalsList, setGoalsList] = useState(initialGoals)
  const [showModal, setShowModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')

  const handleIncrement = (id) => {
    setGoalsList(prev =>
      prev.map(g => {
        if (g.id !== id) return g
        const nextCurrent = Math.min(g.target, g.current + 1)
        const nextProgress = Math.round((nextCurrent / g.target) * 100)
        return { ...g, current: nextCurrent, progress: nextProgress }
      })
    )
  }

  const handleDelete = (id) => {
    setGoalsList(prev => prev.filter(g => g.id !== id))
  }

  const filtered = goalsList.filter(
    g => filterCategory === 'All' || g.category === filterCategory
  )

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 bg-pastel-bg text-pastel-ink max-w-7xl mx-auto w-full">
      {showModal && <AddGoalModal onClose={() => setShowModal(false)} onAdd={g => setGoalsList([g, ...goalsList])} />}

      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-pastel-sageLight via-white to-pastel-peachLight p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-pastel-sage flex items-center justify-center text-white shadow-sage shrink-0">
              <Target size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-pastel-ink">Pedagogical Goals & Targets</h1>
                <span className="badge badge-sage text-[10px]">Measurable Outcomes</span>
              </div>
              <p className="text-xs text-pastel-inkMuted mt-0.5">
                Set and track measurable professional development milestones throughout the academic term.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-sage"
          >
            <Plus size={14} />
            <span>New Goal</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-pastel-inkMuted mr-1">Filter:</span>
        {['All', ...CATEGORIES].map(c => (
          <button
            key={c}
            onClick={() => setFilterCategory(c)}
            className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all cursor-pointer ${
              filterCategory === c
                ? 'bg-pastel-sage text-white border-pastel-sage shadow-sage'
                : 'bg-white text-pastel-inkMuted border-[#EAE3D9] hover:bg-[#FAF8F5]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(goal => (
          <div
            key={goal.id}
            className={`card p-5 space-y-3.5 transition-all ${
              goal.progress === 100
                ? 'bg-pastel-sageLight/50 border-pastel-sage'
                : 'bg-white hover:border-pastel-sage'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`badge text-[9.5px] ${
                goal.category === 'Habit'
                  ? 'badge-peach'
                  : goal.category === 'Pathway'
                  ? 'badge-pink'
                  : 'badge-sage'
              }`}>
                {goal.category}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleIncrement(goal.id)}
                  disabled={goal.progress === 100}
                  className="btn-secondary text-[11px] px-2.5 py-1 flex items-center gap-1 disabled:opacity-40"
                  title="Log +1 progress"
                >
                  <Plus size={11} />
                  <span>+1</span>
                </button>
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="p-1 text-pastel-inkSubtle hover:text-pastel-pinkDark rounded"
                  title="Delete goal"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-pastel-ink mb-1">{goal.title}</h3>
              <div className="flex items-center justify-between text-xs text-pastel-inkMuted">
                <span>{goal.current} of {goal.target} {goal.unit}</span>
                <span className="font-bold text-pastel-sageDark">{goal.progress}%</span>
              </div>
            </div>

            <div className="w-full h-2 bg-[#EAE3D9] rounded-full overflow-hidden">
              <div
                className="h-full bg-pastel-sage rounded-full transition-all duration-300"
                style={{ width: `${goal.progress}%` }}
              />
            </div>

            {goal.progress === 100 && (
              <p className="text-xs text-pastel-sageDark font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Goal achieved for this term! 🎉</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
