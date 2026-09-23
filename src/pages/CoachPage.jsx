import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Sparkles,
  RotateCcw,
  Mic,
  MicOff,
  Lightbulb,
  CheckCircle2,
  Shield,
  Bot,
  User,
} from 'lucide-react'

const INITIAL_COACH_MESSAGES = [
  {
    id: 'c1',
    from: 'coach',
    text: "Hello Dr. Sharma! I reviewed your recent reflection notes and anonymous student ratings. Your **5E inquiry scaffolding** in Grade 8 Science is going very well. What would you like to brainstorm today?",
    time: '10:00 AM',
  },
]

function formatText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-pastel-sageDark font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-pastel-ink font-medium">$1</em>')
}

const SUGGESTED_PROMPTS = [
  'How do I structure a 5-minute lesson hook for photosynthesis?',
  'Tips for managing lesson pacing during group lab work',
  'How to respond constructively to anonymous student pacing feedback',
  'Ideas for differentiating tasks without lowering academic rigor',
]

export default function CoachPage() {
  const [messages, setMessages] = useState(INITIAL_COACH_MESSAGES)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const RESPONSES = [
    "That is a great teaching inquiry. Based on your recent student feedback, I'd suggest introducing **structured inquiry scaffolds** — begin each segment with an overarching investigative question and assign team roles (Timer, Scribe, Speaker). This keeps peer energy focused and prevents pacing drift.",
    "Your observation on pacing is spot-on. A proven tactic is **timed sprints**: set a visible 7-minute timer on your board for pair-share discussions. When students see the clock, conversations become immediately sharper.",
    "For **differentiated classroom activities**, consider tiered output menus: Group A completes a conceptual flow-chart, Group B writes an analytical paragraph, and Group C designs an experiment hypothesis.",
    "Looking at your reflection data, your standout superpower is **fostering organic student curiosity**. To systematically build on this, try dedicating the last 4 minutes of class to an 'unanswered question exit slip'.",
  ]

  async function handleSend(textToSend) {
    const text = textToSend || input
    if (!text.trim() || loading) return

    const userMsg = {
      id: `u${Date.now()}`,
      from: 'teacher',
      text: text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 1000))

    const reply = RESPONSES[messages.length % RESPONSES.length]
    const coachMsg = {
      id: `c${Date.now()}`,
      from: 'coach',
      text: reply,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, coachMsg])
    setLoading(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      setTimeout(() => {
        setIsRecording(false)
        setInput("My lesson opener went over time today. How can I keep the hook under 5 minutes without losing student excitement?")
      }, 2000)
    } else {
      setIsRecording(false)
    }
  }

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5 bg-pastel-bg text-pastel-ink max-w-5xl mx-auto w-full">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-pastel-sageLight via-white to-pastel-pinkLight p-5 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-pastel-sage flex items-center justify-center text-white shadow-sage shrink-0">
            <Bot size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-pastel-ink">AI Teaching Mentor</h1>
              <span className="badge badge-sage text-[10px]">Confidential Mentor</span>
            </div>
            <p className="text-xs text-pastel-inkMuted">Pedagogical strategy, 5E inquiry frameworks & lesson troubleshooting</p>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_COACH_MESSAGES)}
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
          title="Reset conversation"
        >
          <RotateCcw size={13} />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-pastel-inkMuted mr-1">Suggested:</span>
        {SUGGESTED_PROMPTS.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="text-xs px-3 py-1 rounded-full bg-white border border-[#EAE3D9] text-pastel-inkMuted hover:text-pastel-sageDark hover:border-pastel-sage transition-all shadow-soft cursor-pointer text-left"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="card bg-white p-5 flex-1 min-h-[420px] flex flex-col justify-between shadow-soft overflow-hidden">
        <div className="space-y-4 overflow-y-auto max-h-[480px] pr-2">
          {messages.map(m => {
            const isCoach = m.from === 'coach'
            return (
              <div
                key={m.id}
                className={`flex gap-3 items-start ${isCoach ? '' : 'flex-row-reverse'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCoach
                      ? 'bg-pastel-sageLight text-pastel-sageDark border border-pastel-sageSoft'
                      : 'bg-pastel-pinkLight text-pastel-pinkDark border border-pastel-pinkSoft'
                  }`}
                >
                  {isCoach ? <Sparkles size={14} /> : <User size={14} />}
                </div>

                <div
                  className={`p-4 rounded-2xl max-w-[82%] text-xs leading-relaxed ${
                    isCoach
                      ? 'bg-[#FAF8F5] border border-[#EAE3D9] text-pastel-ink'
                      : 'bg-pastel-sage text-white shadow-sage'
                  }`}
                >
                  <p
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
                  />
                  <span className={`text-[9.5px] block mt-1.5 ${isCoach ? 'text-pastel-inkSubtle' : 'text-white/80'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            )
          })}

          {loading && (
            <div className="flex gap-3 items-start animate-in fade-in duration-150">
              <div className="w-8 h-8 rounded-xl bg-pastel-sageLight text-pastel-sageDark flex items-center justify-center">
                <Sparkles size={14} />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pastel-sage animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-pastel-sage animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-pastel-sage animate-bounce delay-200" />
                <span className="text-xs text-pastel-inkMuted ml-1">AI Mentor analyzing...</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-[#EAE3D9] mt-3">
          <div className="relative flex items-center gap-2">
            <button
              onClick={toggleRecording}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isRecording
                  ? 'bg-pastel-pink text-white border-pastel-pink animate-pulse'
                  : 'bg-[#FAF8F5] border-[#EAE3D9] text-pastel-inkMuted hover:text-pastel-ink'
              }`}
              title={isRecording ? 'Listening...' : 'Voice input simulation'}
            >
              <Mic size={16} />
            </button>

            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask your AI Teaching Mentor anything about lesson pacing, engagement, or differentiation..."
              className="input text-xs sm:text-sm py-2.5 flex-1"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="btn-primary text-xs px-4 py-2.5 flex items-center gap-1.5 shadow-sage disabled:opacity-40 shrink-0"
            >
              <Send size={13} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
