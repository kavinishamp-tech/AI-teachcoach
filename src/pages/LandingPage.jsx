import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Flame,
  Shield,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  MessageCircle,
  Layers,
  Smile,
  Lock,
  Clock,
  Lightbulb,
  HeartHandshake,
  Check,
  Calendar,
  MessageSquare,
  School,
  GraduationCap,
} from 'lucide-react'
import { analyseMood } from '../hooks/useMoodAnalysis'

export default function LandingPage() {
  const [demoInput, setDemoInput] = useState(
    "Students loved the group science experiment today! Everyone was engaged, but our warm-up took too long and we rushed the ending."
  )

  const demoMood = analyseMood(demoInput)

  return (
    <div className="min-h-screen bg-pastel-bg text-pastel-ink selection:bg-pastel-sage selection:text-white font-sans antialiased">
      {/* Background Decorative Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pastel-sageLight rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-pastel-pinkLight rounded-full blur-[100px]" />
      </div>

      {/* Clean Minimal Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#EAE3D9]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pastel-sage to-pastel-pink flex items-center justify-center shadow-sage text-white font-bold">
              <Sparkles size={16} />
            </div>
            <span className="text-pastel-ink text-base font-extrabold tracking-tight">TeachCoach</span>
          </div>

          <Link
            to="/dashboard"
            className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-sage"
          >
            <span>Open Workspace</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-14 pb-8 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#EAE3D9] text-xs font-semibold text-pastel-sageDark mb-5 shadow-soft">
          <Sparkles size={13} className="text-pastel-sage" />
          <span>The smart daily companion for teachers & professors</span>
        </div>

        {/* Clear Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-pastel-ink tracking-tight leading-tight max-w-3xl mb-4">
          Reflect on your day in 2 minutes.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-sageDark to-pastel-pinkDark">
            Grow your teaching every week.
          </span>
        </h1>

        {/* Intuitive Subhead */}
        <p className="text-sm sm:text-base text-pastel-inkMuted max-w-xl leading-relaxed mb-7">
          Log quick classroom notes, organize daily lectures, review anonymous student feedback, and generate topic fundamentals with zero stress.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Link
            to="/dashboard"
            className="btn-primary text-xs sm:text-sm px-6 py-3 flex items-center gap-2 shadow-sage"
          >
            <span>Enter Teaching Workspace</span>
            <ArrowRight size={15} />
          </Link>
          <a
            href="#demo"
            className="btn-secondary text-xs sm:text-sm px-5 py-3"
          >
            See Live Demo ↓
          </a>
        </div>

        {/* 3 Clear Promises */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-pastel-inkMuted border-t border-[#EAE3D9] pt-5 w-full max-w-2xl">
          <span className="flex items-center gap-1.5 font-medium">
            <Shield size={14} className="text-pastel-sageDark" />
            <span>100% Private (No Admins Can See)</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock size={14} className="text-pastel-pinkDark" />
            <span>Takes Under 2 Mins a Day</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Lightbulb size={14} className="text-amber-500" />
            <span>Practical, Instant Teaching Tips</span>
          </span>
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section id="demo" className="relative z-10 py-6 px-6 max-w-4xl mx-auto">
        <div className="card p-5 sm:p-6 shadow-soft-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-pastel-ink">Try it now: How did class go today?</h3>
              <p className="text-[11px] text-pastel-inkMuted">Type a quick note below to see how TeachCoach helps you reflect</p>
            </div>
            <span className="badge badge-sage text-[9.5px]">Live Demo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* Input Side */}
            <div className="md:col-span-7 space-y-2">
              <textarea
                value={demoInput}
                onChange={e => setDemoInput(e.target.value)}
                rows={3}
                className="input text-xs sm:text-[13px] leading-relaxed py-2.5"
                placeholder="Write a quick sentence about today's lesson..."
              />
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-pastel-inkMuted">
                <span>Try an example:</span>
                <button
                  onClick={() => setDemoInput("The hands-on lab went great! Students asked thoughtful questions and worked well in pairs.")}
                  className="text-pastel-sageDark font-semibold hover:underline cursor-pointer"
                >
                  "Great class"
                </button>
                <span>·</span>
                <button
                  onClick={() => setDemoInput("The warm-up ran 10 minutes over and I had to rush through the main activity.")}
                  className="text-pastel-pinkDark font-semibold hover:underline cursor-pointer"
                >
                  "Rushed timing"
                </button>
              </div>
            </div>

            {/* Smart Output Side */}
            <div className="md:col-span-5 bg-[#FAF8F5] border border-[#EAE3D9] rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#EAE3D9]">
                <span className="text-[11px] font-bold text-pastel-ink">TeachCoach Insights</span>
                <span className="badge badge-sage text-[9px]">{demoMood.emoji} {demoMood.mood}</span>
              </div>

              <p className="text-xs text-pastel-ink leading-relaxed">{demoMood.message}</p>

              <div className="p-2.5 rounded-xl bg-white border border-[#EAE3D9] text-[11px] text-pastel-ink space-y-0.5 shadow-soft">
                <span className="font-bold text-pastel-sageDark block">💡 Quick tip for tomorrow:</span>
                <p className="text-pastel-inkMuted leading-relaxed">{demoMood.tip}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Clean Feature Cards */}
      <section className="relative z-10 py-10 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-7">
          <h2 className="text-xl sm:text-2xl font-bold text-pastel-ink">Everything an educator needs in one gentle place</h2>
          <p className="text-xs text-pastel-inkMuted mt-1">Built specifically for school teachers and college professors.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-pastel-sageLight text-pastel-sageDark flex items-center justify-center">
              <Calendar size={16} />
            </div>
            <h3 className="text-sm font-bold text-pastel-ink">Daily Planner & Key Basics Prep</h3>
            <p className="text-xs text-pastel-inkMuted leading-relaxed">
              Schedule lectures, manage your task checklist, and instantly generate core topic essentials and misconception warnings.
            </p>
          </div>

          <div className="card p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-pastel-pinkLight text-pastel-pinkDark flex items-center justify-center">
              <MessageSquare size={16} />
            </div>
            <h3 className="text-sm font-bold text-pastel-ink">Student Hub & Anonymous Feedback</h3>
            <p className="text-xs text-pastel-inkMuted leading-relaxed">
              Broadcast assignment guidelines and receive candid, confidential student ratings without names attached.
            </p>
          </div>

          <div className="card p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-pastel-peachLight text-pastel-peachDark flex items-center justify-center">
              <BookOpen size={16} />
            </div>
            <h3 className="text-sm font-bold text-pastel-ink">2-Minute Reflection Journal</h3>
            <p className="text-xs text-pastel-inkMuted leading-relaxed">
              Quick rotating prompts that turn daily dismissal thoughts into enduring pedagogical growth and streak milestones.
            </p>
          </div>

          <div className="card p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-pastel-sageLight text-pastel-sageDark flex items-center justify-center">
              <MessageCircle size={16} />
            </div>
            <h3 className="text-sm font-bold text-pastel-ink">Speech & Communication Skills</h3>
            <p className="text-xs text-pastel-inkMuted leading-relaxed">
              Vocal modulation tips, Socratic questioning guides, and an interactive scenario simulator for tough classroom moments.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#EAE3D9] py-6 px-6 bg-white text-pastel-inkMuted text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px]">
          <div className="flex items-center gap-2">
            <span className="text-pastel-ink font-bold">TeachCoach</span>
            <span>· The daily companion for teachers & professors</span>
          </div>

          <div className="flex items-center gap-5 text-pastel-inkMuted">
            <Link to="/dashboard" className="hover:text-pastel-sageDark">Dashboard</Link>
            <Link to="/planner" className="hover:text-pastel-sageDark">Planner</Link>
            <Link to="/students" className="hover:text-pastel-sageDark">Student Hub</Link>
            <Link to="/skills" className="hover:text-pastel-sageDark">Speech Skills</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
