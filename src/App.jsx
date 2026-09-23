import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import ProfileDrawer from './components/profile/ProfileDrawer'
import EducatorOnboardingModal from './components/auth/EducatorOnboardingModal'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import PlannerPage from './pages/PlannerPage'
import StudentHubPage from './pages/StudentHubPage'
import CommunicationSkillsPage from './pages/CommunicationSkillsPage'
import PathwaysPage from './pages/PathwaysPage'
import ReflectionsPage from './pages/ReflectionsPage'
import CoachPage from './pages/CoachPage'
import GoalsPage from './pages/GoalsPage'
import SettingsPage from './pages/SettingsPage'
import { teacher as initialTeacher } from './data/mockData'

function AppLayout({ educatorProfile, setEducatorProfile, onOpenOnboarding }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-pastel-bg text-pastel-ink selection:bg-pastel-sage selection:text-white relative">
      <Sidebar
        onOpenProfile={() => setIsProfileOpen(true)}
        educatorProfile={educatorProfile}
        onOpenOnboarding={onOpenOnboarding}
      />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Topbar
          onOpenProfile={() => setIsProfileOpen(true)}
          educatorProfile={educatorProfile}
          onOpenOnboarding={onOpenOnboarding}
        />
        <Outlet context={{ educatorProfile, setEducatorProfile, onOpenProfile: () => setIsProfileOpen(true) }} />
      </div>

      {/* Interactive Clickable Profile Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        educatorProfile={educatorProfile}
        setEducatorProfile={setEducatorProfile}
      />
    </div>
  )
}

export default function App() {
  const [educatorProfile, setEducatorProfile] = useState(() => {
    const saved = localStorage.getItem('teachcoach_profile')
    return saved ? JSON.parse(saved) : initialTeacher
  })
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('teachcoach_profile', JSON.stringify(educatorProfile))
  }, [educatorProfile])

  return (
    <BrowserRouter>
      {/* Role Setup & Login Questionnaire Modal */}
      <EducatorOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSave={setEducatorProfile}
        initialProfile={educatorProfile}
      />

      <Routes>
        {/* Dedicated Standalone Marketing Landing Page */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Authenticated Workspace App Layout */}
        <Route
          element={
            <AppLayout
              educatorProfile={educatorProfile}
              setEducatorProfile={setEducatorProfile}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
            />
          }
        >
          <Route path="/" element={<DashboardPage educatorProfile={educatorProfile} />} />
          <Route path="/dashboard" element={<DashboardPage educatorProfile={educatorProfile} />} />
          <Route path="/planner" element={<PlannerPage educatorProfile={educatorProfile} />} />
          <Route path="/students" element={<StudentHubPage educatorProfile={educatorProfile} />} />
          <Route path="/skills" element={<CommunicationSkillsPage educatorProfile={educatorProfile} />} />
          <Route path="/pathways" element={<PathwaysPage />} />
          <Route path="/reflections" element={<ReflectionsPage />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/settings" element={<SettingsPage educatorProfile={educatorProfile} setEducatorProfile={setEducatorProfile} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
