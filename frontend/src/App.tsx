import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import HomeReset from './pages/HomeReset'
import ChatScreen from './pages/ChatScreen'
import SideBar from './components/SideBar'

export default function App() {
  const location = useLocation()
  const showSidebar = location.pathname !== '/';
  const hasVisited = localStorage.getItem("hasVisited")

  return (
    <div className='h-screen flex flex-col md:flex-row'>
      {showSidebar && <SideBar />}

      <div className='flex-1'>
        <Routes>
          <Route path="/" element={hasVisited ? <Navigate to="/chat" /> : <Home />}/>
          <Route path="/home" element={<HomeReset />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
        </Routes>
      </div>
    </div>
  )
}