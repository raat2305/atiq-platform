import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Employment from './pages/Employment'
import Unemployment from './pages/Unemployment'
import Justice from './pages/Justice'
import CNAS from './pages/CNAS'
import CASNOS from './pages/CASNOS'
import ServiceDetail from './pages/ServiceDetail'
import Admin from './pages/Admin'
import Search from './pages/Search'

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employment" element={<Employment />} />
            <Route path="/unemployment" element={<Unemployment />} />
            <Route path="/justice" element={<Justice />} />
            <Route path="/cnas" element={<CNAS />} />
            <Route path="/casnos" element={<CASNOS />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
