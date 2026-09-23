import { useState } from 'react'
import {
  Calendar,
  Clock,
  CheckCircle2,
  Plus,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Ticket,
  Copy,
  Check,
  Search,
  Trash2,
  Layers,
  ChevronRight,
  ListTodo,
  Columns,
  School,
  GraduationCap,
} from 'lucide-react'
import { todaySchedule, initialTodos, topicBasicsBank, teacher } from '../data/mockData'

export default function PlannerPage() {
  const [scheduleList, setScheduleList] = useState(todaySchedule)
  const [todos, setTodos] = useState(initialTodos)
  const [newTodoText, setNewTodoText] = useState('')
  const [newTodoCategory, setNewTodoCategory] = useState('Prep')
  const [selectedTopicKey, setSelectedTopicKey] = useState('photosynthesis')
  const [customTopicInput, setCustomTopicInput] = useState('')
  const [copiedKey, setCopiedKey] = useState(false)
  const [activeView, setActiveView] = useState('split') // 'split' | 'schedule' | 'topicPrep' | 'todos'

  const currentTopic = topicBasicsBank[selectedTopicKey] || {
    title: customTopicInput || 'Custom Lesson Topic',
    subject: teacher.subject,
    coreFundamentals: [
      `Introduce primary definition and 2 real-world applications of ${customTopicInput || 'the topic'}.`,
      'Break down core formula / mechanism into step-by-step observable stages.',
      'Check understanding with active pair-share questioning before progressing to exercises.',
    ],
    commonMisconceptions: [
      `Students frequently memorize terminology of ${customTopicInput || 'this topic'} without understanding the causal mechanism.`,
    ],
    engagingHook: `Ask a provocative starter question: "How would the world look if we did not have ${customTopicInput || 'this phenomenon'}?"`,
    exitTicketPrompt: `Summarize the single most critical rule of ${customTopicInput || 'today\'s concept'} in your own words.`,
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const addTodo = (e) => {
    e.preventDefault()
    if (!newTodoText.trim()) return
    const newTask = {
      id: `t${Date.now()}`,
      title: newTodoText,
      category: newTodoCategory,
      done: false,
      priority: 'medium',
    }
    setTodos([newTask, ...todos])
    setNewTodoText('')
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const copyLessonPlan = () => {
    const text = `LESSON PREP: ${currentTopic.title}
----------------------------------------
CORE FUNDAMENTALS:
${currentTopic.coreFundamentals.map((f, i) => `${i + 1}. ${f}`).join('\n')}

COMMON MISCONCEPTIONS:
${currentTopic.commonMisconceptions.map(m => `• ${m}`).join('\n')}

ENGAGING HOOK:
${currentTopic.engagingHook}

EXIT TICKET PROMPT:
${currentTopic.exitTicketPrompt}`

    navigator.clipboard.writeText(text)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 bg-[#FAF8F5] text-[#2D2824] max-w-7xl mx-auto w-full">
      {/* 1. Spacious Header Banner */}
      <div className="card p-6 bg-gradient-to-r from-pastel-sageLight via-white to-pastel-pinkLight shadow-soft flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#6EA685] flex items-center justify-center text-white shadow-sm shrink-0">
              <Calendar size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#2D2824]">Daily Planner & Lesson Prep</h1>
                <span className="badge badge-sage text-[10px]">Today's Teaching Hub</span>
              </div>
              <p className="text-xs sm:text-sm text-[#6E645D] mt-0.5">
                Organize your class periods, track task to-dos, and generate must-cover topic fundamentals before class.
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width Navigation Tabs (Never Cut Off) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EAE3D9]">
          <button
            onClick={() => setActiveView('split')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'split'
                ? 'bg-[#6EA685] text-white shadow-sm'
                : 'bg-white text-[#6E645D] border border-[#EAE3D9] hover:bg-[#FAF8F5]'
            }`}
          >
            <Columns size={14} />
            <span>Side-by-Side Overview</span>
          </button>

          <button
            onClick={() => setActiveView('schedule')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'schedule'
                ? 'bg-[#6EA685] text-white shadow-sm'
                : 'bg-white text-[#6E645D] border border-[#EAE3D9] hover:bg-[#FAF8F5]'
            }`}
          >
            <Clock size={14} />
            <span>Class Schedule ({scheduleList.length})</span>
          </button>

          <button
            onClick={() => setActiveView('topicPrep')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'topicPrep'
                ? 'bg-[#E07A8B] text-white shadow-sm'
                : 'bg-white text-[#6E645D] border border-[#EAE3D9] hover:bg-[#FAF8F5]'
            }`}
          >
            <Lightbulb size={14} />
            <span>Key Basics Topic Prep ✨</span>
          </button>

          <button
            onClick={() => setActiveView('todos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeView === 'todos'
                ? 'bg-[#6EA685] text-white shadow-sm'
                : 'bg-white text-[#6E645D] border border-[#EAE3D9] hover:bg-[#FAF8F5]'
            }`}
          >
            <ListTodo size={14} />
            <span>To-Do Checklist ({todos.filter(t => !t.done).length} Remaining)</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN EXPANSIVE CONTENT SECTION */}

      {/* VIEW A: SPLIT (Side by Side) or Dedicated Views */}
      <div className={`grid gap-6 ${activeView === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        
        {/* SCHEDULE SECTION (Left in Split, or Full Width) */}
        {(activeView === 'split' || activeView === 'schedule') && (
          <div className={`${activeView === 'split' ? 'lg:col-span-6' : 'w-full'} space-y-4`}>
            <div className="card p-6 space-y-4 shadow-soft">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EDF6F0] flex items-center justify-center text-[#38664D]">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2D2824]">Today's Class Schedule</h3>
                    <p className="text-xs text-[#6E645D]">{scheduleList.length} Sessions scheduled for today</p>
                  </div>
                </div>
                <span className="badge badge-sage text-[10px]">Active Academic Term</span>
              </div>

              <div className="space-y-3">
                {scheduleList.map(item => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      item.status === 'active'
                        ? 'bg-[#EDF6F0] border-[#6EA685] shadow-sm'
                        : item.status === 'completed'
                        ? 'bg-[#FAF8F5] border-[#EAE3D9] opacity-80'
                        : 'bg-white border-[#EAE3D9] hover:border-[#D8CEBE]'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="badge badge-sage text-[10px] font-bold">{item.period}</span>
                        <h4 className="text-sm font-bold text-[#2D2824]">{item.title}</h4>
                      </div>
                      <p className="text-xs text-[#6E645D] flex flex-wrap items-center gap-2.5">
                        <span>🕒 {item.time}</span>
                        <span>·</span>
                        <span>📍 {item.room}</span>
                        <span>·</span>
                        <span>👥 {item.studentsCount} Students</span>
                      </p>
                      <div className="inline-block px-2.5 py-1 rounded-lg bg-white/80 border border-[#EAE3D9] text-xs font-semibold text-[#38664D]">
                        Topic: {item.topic}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 pt-2 sm:pt-0">
                      <button
                        onClick={() => {
                          setSelectedTopicKey(
                            item.topic.toLowerCase().includes('photosynthesis')
                              ? 'photosynthesis'
                              : item.topic.toLowerCase().includes('cell')
                              ? 'cell structure'
                              : 'newtons laws'
                          )
                          if (activeView !== 'split') setActiveView('topicPrep')
                        }}
                        className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5"
                        title="Load topic fundamentals for this lecture"
                      >
                        <Sparkles size={13} className="text-[#E07A8B]" />
                        <span>Prep Basics</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* To-Do Quick Snapshot in Split View */}
            {activeView === 'split' && (
              <div className="card p-6 space-y-4 shadow-soft">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
                  <div className="flex items-center gap-2">
                    <ListTodo size={16} className="text-[#6EA685]" />
                    <h3 className="text-base font-bold text-[#2D2824]">Educator Task Checklist</h3>
                  </div>
                  <span className="badge badge-sage text-[10px]">
                    {todos.filter(t => t.done).length}/{todos.length} Done
                  </span>
                </div>

                {/* Inline Add Task */}
                <form onSubmit={addTodo} className="flex gap-2">
                  <input
                    type="text"
                    value={newTodoText}
                    onChange={e => setNewTodoText(e.target.value)}
                    placeholder="Add a new task (e.g. Upload homework sheet, reply to parent)..."
                    className="input text-xs sm:text-sm"
                  />
                  <button type="submit" className="btn-primary text-xs px-4 py-2 shrink-0">
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </form>

                {/* Task Items */}
                <div className="space-y-2">
                  {todos.slice(0, 4).map(todo => (
                    <div
                      key={todo.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        todo.done ? 'bg-[#FAF8F5] border-[#EAE3D9] opacity-60' : 'bg-white border-[#EAE3D9]'
                      }`}
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="flex items-center gap-3 text-left cursor-pointer flex-1"
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          todo.done ? 'bg-[#6EA685] text-white' : 'border-2 border-[#D8CEBE]'
                        }`}>
                          {todo.done && <Check size={12} className="stroke-[3]" />}
                        </div>
                        <span className={`text-xs sm:text-sm font-medium ${todo.done ? 'line-through text-[#6E645D]' : 'text-[#2D2824]'}`}>
                          {todo.title}
                        </span>
                      </button>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="badge badge-beige text-[9.5px]">{todo.category}</span>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-1 text-[#9C9289] hover:text-[#B84E62]"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* KEY BASICS PREP SECTION (Right in Split, or Full Width) */}
        {(activeView === 'split' || activeView === 'topicPrep') && (
          <div className={`${activeView === 'split' ? 'lg:col-span-6' : 'w-full'} space-y-4`}>
            <div className="card p-6 space-y-5 bg-gradient-to-b from-white via-white to-[#FDF2F4]/30 border-[#F8D7DA] shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAE3D9]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#F8D7DA] flex items-center justify-center text-[#B84E62]">
                    <Lightbulb size={17} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2D2824]">Key Basics to Cover</h3>
                    <p className="text-xs text-[#6E645D]">AI Lecture Prep & Fundamental Concepts Assistant</p>
                  </div>
                </div>

                <button
                  onClick={copyLessonPlan}
                  className="btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5 self-start sm:self-auto"
                >
                  {copiedKey ? <Check size={13} className="text-[#38664D]" /> : <Copy size={13} />}
                  <span>{copiedKey ? 'Copied to Clipboard!' : 'Copy Lesson Plan'}</span>
                </button>
              </div>

              {/* Topic Selector Chips (Spacious & Clean) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2D2824] block">Select or enter today's lecture topic:</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'photosynthesis', label: '🌱 Plant Photosynthesis' },
                    { key: 'newtons laws', label: '🚀 Newton\'s 3 Laws of Motion' },
                    { key: 'cell structure', label: '🔬 Cell Organelles & Transport' },
                    { key: 'microeconomics', label: '📈 Supply & Demand Equilibrium' },
                  ].map(t => (
                    <button
                      key={t.key}
                      onClick={() => {
                        setSelectedTopicKey(t.key)
                        setCustomTopicInput('')
                      }}
                      className={`text-xs px-3.5 py-1.5 rounded-full border font-bold transition-all cursor-pointer ${
                        selectedTopicKey === t.key && !customTopicInput
                          ? 'bg-[#E07A8B] text-white border-[#E07A8B] shadow-sm'
                          : 'bg-white border-[#EAE3D9] text-[#6E645D] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Custom Search Box */}
                <div className="pt-1">
                  <input
                    type="text"
                    value={customTopicInput}
                    onChange={e => {
                      setCustomTopicInput(e.target.value)
                      setSelectedTopicKey('custom')
                    }}
                    placeholder="Or type a custom topic (e.g. Organic Chemistry Reactions, Microeconomics)..."
                    className="input text-xs sm:text-sm py-2.5"
                  />
                </div>
              </div>

              {/* Topic Breakdown Blocks (Larger, High-Contrast & Readable) */}
              <div className="space-y-4 pt-1">
                {/* 1. Core Fundamentals */}
                <div className="p-4 rounded-2xl bg-[#EDF6F0] border border-[#D3E8DC] space-y-2.5">
                  <span className="text-xs font-bold text-[#38664D] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>Must-Cover Core Fundamentals (Non-Negotiables):</span>
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#2D2824] pl-1">
                    {currentTopic.coreFundamentals.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="font-bold text-[#38664D] mt-0.5">{idx + 1}.</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Misconceptions */}
                <div className="p-4 rounded-2xl bg-[#FDF2F4] border border-[#F8D7DA] space-y-2">
                  <span className="text-xs font-bold text-[#B84E62] uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle size={15} />
                    <span>Common Student Misconceptions to Avoid:</span>
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#2D2824] pl-1">
                    {currentTopic.commonMisconceptions.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-[#B84E62] font-bold">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Engaging Hook */}
                <div className="p-4 rounded-2xl bg-[#FEF3EB] border border-[#FBD7BE] space-y-1.5">
                  <span className="text-xs font-bold text-[#A65522] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={15} />
                    <span>1-Minute Engaging Lecture Hook / Puzzle:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-[#2D2824] leading-relaxed italic">
                    "{currentTopic.engagingHook}"
                  </p>
                </div>

                {/* 4. Exit Ticket */}
                <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-1.5 shadow-sm">
                  <span className="text-xs font-bold text-[#2D2824] uppercase tracking-wider flex items-center gap-1.5">
                    <Ticket size={15} className="text-[#6EA685]" />
                    <span>2-Minute Quick Exit Ticket Prompt:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-[#6E645D] leading-relaxed">
                    {currentTopic.exitTicketPrompt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FULL-WIDTH DEDICATED TO-DO VIEW */}
        {activeView === 'todos' && (
          <div className="w-full card p-6 space-y-4 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
              <div className="flex items-center gap-2">
                <ListTodo size={18} className="text-[#6EA685]" />
                <h3 className="text-lg font-bold text-[#2D2824]">Full Educator Task Checklist</h3>
              </div>
              <span className="badge badge-sage text-xs font-bold">
                {todos.filter(t => t.done).length} of {todos.length} Completed
              </span>
            </div>

            <form onSubmit={addTodo} className="flex gap-2">
              <input
                type="text"
                value={newTodoText}
                onChange={e => setNewTodoText(e.target.value)}
                placeholder="Add a new task (e.g. Grade Assignment 3, prepare lab glassware)..."
                className="input text-sm"
              />
              <select
                value={newTodoCategory}
                onChange={e => setNewTodoCategory(e.target.value)}
                className="px-3 py-2 border border-[#EAE3D9] rounded-xl text-xs bg-white text-[#2D2824] font-semibold"
              >
                <option value="Prep">Prep</option>
                <option value="Assignment">Assignment</option>
                <option value="Feedback">Feedback</option>
                <option value="Communication">Communication</option>
              </select>
              <button type="submit" className="btn-primary text-xs px-5 py-2.5 shrink-0">
                <Plus size={14} />
                <span>Add Task</span>
              </button>
            </form>

            <div className="space-y-2.5 pt-2">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    todo.done ? 'bg-[#FAF8F5] border-[#EAE3D9] opacity-60' : 'bg-white border-[#EAE3D9] hover:border-[#D8CEBE]'
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex items-center gap-3 text-left cursor-pointer flex-1"
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      todo.done ? 'bg-[#6EA685] text-white' : 'border-2 border-[#D8CEBE]'
                    }`}>
                      {todo.done && <Check size={14} className="stroke-[3]" />}
                    </div>
                    <span className={`text-sm font-semibold ${todo.done ? 'line-through text-[#6E645D]' : 'text-[#2D2824]'}`}>
                      {todo.title}
                    </span>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="badge badge-beige text-xs font-semibold">{todo.category}</span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1.5 text-[#9C9289] hover:text-[#B84E62] rounded"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
