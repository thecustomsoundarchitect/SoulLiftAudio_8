import { Router, Route, Switch, useLocation } from 'wouter'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import DefinePage from './pages/DefinePage'
import GatherPage from './pages/GatherPage'
import CraftPage from './pages/CraftPage'
import AudioHugPage from './pages/AudioHugPage'
import MyHugsPage from './pages/MyHugsPage'

function AppContent() {
  const [location] = useLocation()
  const showNavigation = location !== '/'

  return (
    <>
      {showNavigation && <Navigation />}
      <main>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/define" component={DefinePage} />
          <Route path="/gather" component={GatherPage} />
          <Route path="/craft" component={CraftPage} />
          <Route path="/audio-hug" component={AudioHugPage} />
          <Route path="/my-hugs" component={MyHugsPage} />
          <Route>
            <div className="flex items-center justify-center min-h-screen">
              <div className="soul-card text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
                <p className="text-gray-600">The page you're looking for doesn't exist.</p>
              </div>
            </div>
          </Route>
        </Switch>
      </main>
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300">
      <Router>
        <AppContent />
      </Router>
    </div>
  )
}

export default App