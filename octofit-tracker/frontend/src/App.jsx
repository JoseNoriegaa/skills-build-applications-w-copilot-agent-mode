import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl, hasCodespaceApi } from './api';
import './App.css';

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
];

function Overview() {
  return (
    <section className="overview page-section">
      <p className="eyebrow">OctoFit Tracker / control room</p>
      <h1>Make today<br /><em>count.</em></h1>
      <p className="intro">A shared place to keep your movement visible, your teams close, and your next workout within reach.</p>
      <div className="overview-links">
        <NavLink className="primary-action" to="/activities">Log activity <span>↗</span></NavLink>
        <NavLink className="text-action" to="/leaderboard">See the leaderboard</NavLink>
      </div>
      <div className="api-status">
        <span className={hasCodespaceApi ? 'status-dot online' : 'status-dot'} />
        <span>{hasCodespaceApi ? 'Connected to Codespaces API' : 'Using local API fallback'}</span>
        <code>{apiBaseUrl}</code>
      </div>
    </section>
  );
}

function NotFound() {
  return <section className="page-section"><p className="eyebrow">404</p><h1>That page wandered off.</h1><NavLink className="primary-action" to="/">Back to overview</NavLink></section>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <NavLink className="brand" to="/" aria-label="OctoFit home"><span className="brand-mark">O</span><span>OctoFit <small>TRACKER</small></span></NavLink>
          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map((item) => <NavLink key={item.path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={item.path}>{item.label}</NavLink>)}
          </nav>
          <div className="live-indicator"><span className="status-dot online" />Live</div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer><span>OCTOFIT / 2026</span><span>Move together, go further.</span></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
