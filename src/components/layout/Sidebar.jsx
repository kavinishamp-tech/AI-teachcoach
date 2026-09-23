import { NavLink, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Mic,
  Route,
  NotebookPen,
  MessageCircle,
  Target,
  Settings,
  Flame,
  Sparkles,
  School,
  GraduationCap,
  ShieldCheck,
  User,
  ChevronRight,
} from 'lucide-react'
import { streakData } from '../../data/mockData'

const NAV = [
  { to: '/',            label: 'Dashboard',             icon: LayoutDashboard, section: 'Workspace' },
  { to: '/planner',     label: 'Daily Planner & Prep',   icon: Calendar,        section: 'Workspace', badge: 'New' },
  { to: '/students',    label: 'Student Hub & Feedback',icon: MessageSquare,   section: 'Classroom', badge: 'Direct' },
  { to: '/skills',      label: 'Teaching & Speech Skills',icon: Mic,           section: 'Classroom' },
  { to: '/pathways',    label: 'Pedagogy Pathways',     icon: Route,           section: 'Growth' },
  { to: '/reflections', label: 'Reflection Journal',    icon: NotebookPen,     section: 'Growth' },
  { to: '/coach',       label: 'AI Teaching Mentor',    icon: MessageCircle,   section: 'Growth', badge: 'AI' },
  { to: '/settings',    label: 'Settings & Profile',    icon: Settings,        section: 'Account' },
]

export default function Sidebar({ onOpenProfile, educatorProfile, onOpenOnboarding }) {
  const sections = [...new Set(NAV.map(n => n.section))]
  const isProfessor = educatorProfile?.role === 'college_professor'

  return (
    <nav className="w-64 bg-white border-r border-[#EAE3D9] flex flex-col shrink-0 h-screen sticky top-0 z-20 select-none shadow-soft">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE3D9]">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-pastel-sage to-pastel-pink flex items-center justify-center text-white shadow-sage relative group-hover:scale-105 transition-transform">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-pastel-ink text-base font-extrabold tracking-tight">TeachCoach</span>
            </div>
            <p className="text-[11px] text-pastel-inkMuted font-medium">Pedagogy & Speech Hub</p>
          </div>
        </Link>
      </div>

      {/* Role Switcher Pill */}
      <div className="px-3.5 pt-3">
        <button
          onClick={onOpenOnboarding}
          className="w-full p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-pastel-sageLight/50 border border-[#EAE3D9] flex items-center justify-between text-left transition-all cursor-pointer group"
          title="Click to switch between School Teacher and Professor role"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-pastel-sageSoft text-pastel-sageDark flex items-center justify-center">
              {isProfessor ? <GraduationCap size={14} /> : <School size={14} />}
            </div>
            <div>
              <p className="text-xs font-bold text-pastel-ink">
                {isProfessor ? 'College Professor' : 'School Teacher'}
              </p>
              <p className="text-[10px] text-pastel-inkMuted">{educatorProfile?.subject?.split('&')[0] || 'Science'}</p>
            </div>
          </div>
          <span className="text-[10px] text-pastel-sageDark font-semibold group-hover:underline">Switch</span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4">
        {sections.map(section => (
          <div key={section} className="space-y-1">
            <p className="text-[10px] font-bold text-pastel-inkSubtle uppercase tracking-wider px-3 mb-1.5">
              {section}
            </p>
            {NAV.filter(n => n.section === section).map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between px-3 py-2 rounded-xl text-[12.5px] font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-pastel-sageLight text-pastel-sageDark shadow-sm'
                      : 'text-pastel-inkMuted hover:text-pastel-ink hover:bg-[#FAF8F5]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        size={16}
                        className={`transition-colors ${
                          isActive ? 'text-pastel-sageDark' : 'text-pastel-inkMuted group-hover:text-pastel-ink'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-md ${
                        item.badge === 'New'
                          ? 'bg-pastel-pinkLight text-pastel-pinkDark border border-pastel-pinkSoft'
                          : 'bg-pastel-peachLight text-pastel-peachDark border border-pastel-peachSoft'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-pastel-sage rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}

        {/* Quick Streak Box */}
        <div className="pt-1">
          <div className="bg-gradient-to-br from-pastel-peachLight/60 to-white border border-pastel-peachSoft rounded-xl p-3 shadow-soft">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Flame size={14} className="text-pastel-peachDark" />
                <span className="text-xs font-bold text-pastel-ink">Daily Streak</span>
              </div>
              <span className="text-xs font-bold text-pastel-peachDark">{streakData.current} Days</span>
            </div>
            <p className="text-[10.5px] text-pastel-inkMuted mb-2">
              {streakData.thisWeekCompleted} of {streakData.thisWeekGoal} reflections logged this week
            </p>
            <div className="w-full h-1.5 bg-[#EAE3D9] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-pastel-peach transition-all"
                style={{ width: `${(streakData.thisWeekCompleted / streakData.thisWeekGoal) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Profile Trigger */}
      <div className="p-3 border-t border-[#EAE3D9] bg-[#FAF8F5]">
        <button
          type="button"
          onClick={onOpenProfile}
          className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#EAE3D9] hover:border-pastel-sage transition-all cursor-pointer group text-left shadow-soft"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pastel-sage to-pastel-pink flex items-center justify-center text-white text-xs font-bold shrink-0">
            {educatorProfile?.initials || 'PS'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-pastel-ink truncate group-hover:text-pastel-sageDark">
              {educatorProfile?.name || 'Dr. Priya Sharma'}
            </p>
            <p className="text-[10.5px] text-pastel-inkMuted truncate">
              {educatorProfile?.institution || 'Delhi Public School'}
            </p>
          </div>
          <ChevronRight size={13} className="text-pastel-inkSubtle group-hover:text-pastel-sageDark" />
        </button>
      </div>
    </nav>
  )
}