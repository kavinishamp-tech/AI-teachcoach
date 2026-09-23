import { useState } from 'react'
import {
  Search,
  Plus,
  X,
  Sparkles,
  BookOpen,
  Calendar,
  Smile,
  Copy,
  Check,
  Tag,
  ArrowUpDown,
  Lock,
} from 'lucide-react'
import { reflections as initialReflections } from '../data/mockData'
import { analyseMood } from '../hooks/useMoodAnalysis'

const DAILY_PROMPTS = [
  'When did students seem most curious today?',
  'What was your biggest classroom win this week?',
  'What is one thing you would change about today’s lesson?',
  'How did you support a struggling student today?',
  'What was the most effective question you asked in class?',
  'How did today\'s lesson pacing feel across different periods?',
]

const ALL_TAGS = [
  'Student engagement',
  'Lesson pacing',
  'Inquiry moments',
  'Classroom management',
  'Differentiated instruction',
]

function NewEntryModal({ onClose, onSave }) {
  const [prompt, setPrompt] = useState(DAILY_PROMPTS[0])
  const [response, setResponse] = useState('')
  const [tag, setTag] = useState('Student engagement')

  const liveMood = analyseMood(response)

  function handleSave() {
    if (!response.trim()) return
    onSave({ prompt, response, tag })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-pastel-ink/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-[#EAE3D9] rounded-3xl w-full max-w-xl shadow-soft-lg flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pastel-sageLight flex items-center justify-center text-pastel-sageDark">
              <Sparkles size={16} />
            </div>
            <h3 className="text-base font-bold text-pastel-ink">Log Daily Reflection</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-pastel-inkMuted hover:text-pastel-ink">
            <X size={16} />
          </button>
        </div>

        <div>
          <label className="text-xs font-bold text-pastel-ink mb-1.5 block">Reflection Prompt</label>
          <select
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="input text-xs sm:text-sm cursor-pointer"
          >
            {DAILY_PROMPTS.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-pastel-ink block">Your Teaching Reflection</label>
            <span className="text-[11px] text-pastel-inkMuted flex items-center gap-1">
              <Lock size={10} className="text-pastel-sageDark" /> 100% Private to you
            </span>
          </div>
          <textarea
            value={response}
            onChange={e => setResponse(e.target.value)}
            rows={5}
            placeholder="Write authentically about what happened in class, what worked, or what felt challenging..."
            className="input resize-none text-xs sm:text-sm leading-relaxed"
          />
        </div>

        {/* Real-time Mood Preview */}
        {response.trim().length > 10 && (
          <div className="bg-[#FAF8F5] border border-[#EAE3D9] rounded-2xl p-3.5 flex items-start gap-3 animate-in fade-in duration-200">
            <span className="text-2xl shrink-0">{liveMood.emoji}</span>
            <div className="min-w-0 flex-1 text-xs">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-bold text-pastel-sageDark">Tone Detected: {liveMood.mood}</span>
              </div>
              <p className="text-pastel-inkMuted leading-relaxed">{liveMood.message}</p>
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-pastel-ink mb-1.5 block">Category Tag</label>
          <div className="flex flex-wrap gap-1.5">
            {ALL_TAGS.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  tag === t
                    ? 'bg-pastel-sage text-white border-pastel-sage shadow-sage'
                    : 'bg-white border-[#EAE3D9] text-pastel-inkMuted hover:bg-[#FAF8F5]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EAE3D9]">
          <button onClick={onClose} className="btn-secondary text-xs px-4 py-2">
            Cancel
          </button>
          <button onClick={handleSave} disabled={!response.trim()} className="btn-primary text-xs px-5 py-2 shadow-sage disabled:opacity-40">
            Save Reflection
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ReflectionsPage() {
  const [reflectionsList, setReflectionsList] = useState(initialReflections)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [copiedId, setCopiedId] = useState(null)

  function handleAdd({ prompt, response, tag }) {
    const entry = {
      id: `r${Date.now()}`,
      prompt,
      response,
      date: 'Just now',
      tag,
      ts: Date.now(),
    }
    setReflectionsList([entry, ...reflectionsList])
  }

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filtered = reflectionsList
    .filter(r => {
      const matchTag = selectedTag === 'All' || r.tag === selectedTag
      const matchSearch =
        r.prompt.toLowerCase().includes(search.toLowerCase()) ||
        r.response.toLowerCase().includes(search.toLowerCase()) ||
        r.tag.toLowerCase().includes(search.toLowerCase())
      return matchTag && matchSearch
    })
    .sort((a, b) => (sortOrder === 'newest' ? b.ts - a.ts : a.ts - b.ts))

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 bg-pastel-bg text-pastel-ink max-w-7xl mx-auto w-full">
      {showModal && <NewEntryModal onClose={() => setShowModal(false)} onSave={handleAdd} />}

      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-pastel-pinkLight via-white to-pastel-sageLight p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-pastel-pink flex items-center justify-center text-white shadow-pink shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-pastel-ink">Classroom Reflection Journal</h1>
                <span className="badge badge-pink text-[10px]">Confidential</span>
              </div>
              <p className="text-xs text-pastel-inkMuted mt-0.5">
                Capture daily observations and turn fleeting classroom moments into lasting pedagogical wisdom.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-sage"
          >
            <Plus size={14} />
            <span>New Reflection</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', ...ALL_TAGS].map(t => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all cursor-pointer ${
                selectedTag === t
                  ? 'bg-pastel-sage text-white border-pastel-sage shadow-sage'
                  : 'bg-white text-pastel-inkMuted border-[#EAE3D9] hover:bg-[#FAF8F5]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-56">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search reflections..."
              className="input text-xs pl-8"
            />
            <Search size={14} className="absolute left-2.5 top-3 text-pastel-inkMuted" />
          </div>

          <button
            onClick={() => setSortOrder(o => (o === 'newest' ? 'oldest' : 'newest'))}
            className="btn-secondary text-xs px-3 py-2 flex items-center gap-1 shrink-0"
            title="Sort reflections"
          >
            <ArrowUpDown size={13} />
            <span className="hidden sm:inline capitalize">{sortOrder}</span>
          </button>
        </div>
      </div>

      {/* Reflections Feed */}
      <div className="space-y-3.5">
        {filtered.map(r => {
          const mood = analyseMood(r.response)
          return (
            <div key={r.id} className="card p-5 space-y-3 hover:border-pastel-sage transition-all shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="badge badge-sage text-[10px]">{r.tag}</span>
                  <span className="text-xs font-bold text-pastel-ink">{r.prompt}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-pastel-inkMuted">
                  <span className="badge badge-beige text-[9.5px]">{mood.emoji} {mood.mood}</span>
                  <span>·</span>
                  <span>{r.date}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-pastel-ink leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE3D9]">
                {r.response}
              </p>

              <div className="flex items-center justify-between pt-1 text-xs text-pastel-inkMuted">
                <span className="text-[11px]">Private educator record</span>
                <button
                  onClick={() => handleCopy(r.id, r.response)}
                  className="btn-secondary text-[11px] px-2.5 py-1 flex items-center gap-1"
                >
                  {copiedId === r.id ? <Check size={12} className="text-pastel-sageDark" /> : <Copy size={12} />}
                  <span>{copiedId === r.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
