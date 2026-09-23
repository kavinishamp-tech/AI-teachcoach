import { useState, useRef, useEffect } from 'react'
import { Bell, Calendar, Shield, X, Sparkles, School, GraduationCap } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import { teacher } from '../../data/mockData'

const TITLES = {
  '/':            { title: 'Educator Overview',          sub: 'Daily schedule, quick reflection, active metrics & habit consistency' },
  '/dashboard':   { title: 'Educator Overview',          sub: 'Daily schedule, quick reflection, active metrics & habit consistency' },
  '/planner':     { title: 'Daily Planner & Lesson Prep', sub: 'Class periods, task checklist & Key Basics AI assistant' },
  '/students':    { title: 'Student Hub & Feedback',     sub: 'Assignment updates, direct inquiries & anonymous feedback vault' },
  '/skills':      { title: 'Teaching & Speech Skills',   sub: 'Vocal modulation guides & interactive classroom scenario practice' },
  '/pathways':    { title: 'Upskilling Pathways',        sub: 'Personalized pedagogical mastery modules' },
  '/reflections': { title: 'Reflection Journal',         sub: 'Daily classroom experiences & sentiment tracker' },
  '/coach':       { title: 'AI Teaching Mentor',         sub: 'Confidential strategic guidance & lesson planning' },
  '/settings':    { title: 'System Settings',            sub: 'Account privacy, educator role & preferences' },
}

const NOTIFICATIONS = [
  { id: 1, title: '4 New Anonymous Student Feedback', text: 'Students scored today\'s photosynthesis lab 4.8/5.0 with positive comments.', time: '1 hour ago', unread: true },
  { id: 2, title: 'Student Inquiry Pending', text: 'Aarav Patel asked a question regarding Lab Report 2 submission.', time: '2 hours ago', unread: true },
  { id: 3, title: 'Streak milestone unlocked!', text: 'You completed 23 consecutive days of pedagogical reflection.', time: 'Yesterday', unread: false },
]

export default function Topbar({ onOpenProfile, educatorProfile, onOpenOnboarding }) {
  const { pathname } = useLocation()
  const info = TITLES[pathname] || TITLES['/']
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const dropdownRef = useRef(null)

  const unreadCount = notifications.filter(n => n.unread).length

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const isProfessor = educatorProfile?.role === 'college_professor'

  return (
    <header className="flex items-center justify-between px-6 py-3.5 bg-white/90 backdrop-blur-md border-b border-[#EAE3D9] shrink-0 sticky top-0 z-10 select-none shadow-soft">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-base font-bold text-pastel-ink tracking-tight">{info.title}</h1>
          <span className="h-2 w-2 rounded-full bg-pastel-sage" />
        </div>
        <p className="text-[11.5px] text-pastel-inkMuted mt-0.5">{info.sub}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Date pill */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-pastel-ink bg-[#FAF8F5] border border-[#EAE3D9] px-3 py-1.5 rounded-xl font-medium">
          <Calendar size={13} className="text-pastel-sageDark" />
          <span>{today}</span>
        </div>

        {/* Role Switcher Pill */}
        <button
          onClick={onOpenOnboarding}
          className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-pastel-sageDark bg-pastel-sageLight hover:bg-pastel-sageSoft border border-pastel-sageSoft px-3 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          {isProfessor ? <GraduationCap size={13} /> : <School size={13} />}
          <span>{isProfessor ? 'Professor Mode' : 'Teacher Mode'}</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(v => !v)}
            className="relative p-2 rounded-xl bg-[#FAF8F5] hover:bg-white border border-[#EAE3D9] text-pastel-ink transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pastel-pink text-[9px] font-bold text-white flex items-center justify-center shadow-pink">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#EAE3D9] rounded-2xl shadow-soft-lg p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
                <div className="flex items-center gap-2">
                  <Bell size={15} className="text-pastel-pink" />
                  <span className="text-xs font-bold text-pastel-ink">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-pastel-pinkLight text-pastel-pinkDark border border-pastel-pinkSoft px-1.5 py-0.2 rounded-full font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-pastel-pink font-semibold hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setShowNotifications(false)} className="text-pastel-inkMuted hover:text-pastel-ink">
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-[#EAE3D9] max-h-72 overflow-y-auto my-1">
                {notifications.map(item => (
                  <div
                    key={item.id}
                    className={`py-3 px-2 rounded-xl transition-colors ${item.unread ? 'bg-pastel-pinkLight/40' : 'hover:bg-[#FAF8F5]'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-pastel-ink">{item.title}</p>
                      <span className="text-[10px] text-pastel-inkSubtle shrink-0">{item.time}</span>
                    </div>
                    <p className="text-[11.5px] text-pastel-inkMuted mt-1 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Button */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl bg-[#FAF8F5] hover:bg-white border border-[#EAE3D9] hover:border-pastel-sage transition-all cursor-pointer group"
          title="Open Educator Profile Drawer"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pastel-sage to-pastel-pink flex items-center justify-center text-white text-[10.5px] font-bold shadow-sm">
            {educatorProfile?.initials || 'PS'}
          </div>
          <span className="text-xs font-bold text-pastel-ink group-hover:text-pastel-sageDark transition-colors hidden md:inline">
            {educatorProfile?.name?.split(' ')[0] || 'Dr. Priya'}
          </span>
        </button>
      </div>
    </header>
  )
}
