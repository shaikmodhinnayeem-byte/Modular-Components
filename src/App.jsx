import { useState, useCallback, useEffect } from 'react';
import './App.css';
import { AppContext } from './core/utils/constants';
import AppRoutes from './routes/AppRoutes';

const STUDENT_ROUTES = [
  { id: 'dashboard', label: 'Dashboard', icon: 'DB' },
  { id: 'attendance', label: 'Attendance', icon: 'AT' },
  { id: 'timetable', label: 'Timetable', icon: 'TT' },
  { id: 'issues', label: 'Issues', icon: 'IS' },
  { id: 'announcements', label: 'Notices', icon: 'NT' },
];

const ADMIN_ROUTES = [{ id: 'admin', label: 'Admin', icon: 'AD' }];
const PROFESSOR_ROUTES = [
  { id: 'attendance', label: 'Attendance', icon: 'AT' },
  { id: 'timetable', label: 'Timetable', icon: 'TT' },
  { id: 'issues', label: 'Issues', icon: 'IS' },
  { id: 'announcements', label: 'Notices', icon: 'NT' },
];

const USERS = [
  { role: 'admin', username: 'admin', password: 'admin@123', name: 'System Admin', avatar: 'AD' },
  { role: 'student', username: 'student01', password: 'stud@123', name: 'Arjun Mehta', avatar: 'ST', studentId: 'CS001' },
  { role: 'student', username: 'student02', password: 'stud@456', name: 'Priya Sharma', avatar: 'ST', studentId: 'CS002' },
  { role: 'professor', username: 'prof01', password: 'prof@123', name: 'Dr. Nidhi Rao', avatar: 'PR', facultyId: 'FAC-101' },
  { role: 'professor', username: 'prof02', password: 'prof@456', name: 'Prof. Rajesh Iyer', avatar: 'PR', facultyId: 'FAC-102' },
  { role: 'professor', username: 'prof03', password: 'prof@789', name: 'Dr. Meenal Das', avatar: 'PR', facultyId: 'FAC-103' },
];

let toastId = 0;

export default function App() {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [alertHistory, setAlertHistory] = useState([]);

  const routes =
    user?.role === 'admin'
      ? ADMIN_ROUTES
      : user?.role === 'professor'
        ? PROFESSOR_ROUTES
        : STUDENT_ROUTES;

  const addAlert = useCallback((type, msg) => {
    const id = ++toastId;
    const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    setToasts(t => [...t, { id, type, msg }]);
    setAlertHistory(h => [{ id, type, msg, time }, ...h]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const clearAlerts = useCallback(() => setAlertHistory([]), []);

  const login = useCallback(({ role, username, password }) => {
    const matched = USERS.find(
      u => u.role === role && u.username === username.trim() && u.password === password
    );

    if (!matched) return false;

    setUser(matched);
    setCollapsed(false);
    setAlertHistory([]);
    if (matched.role === 'admin') {
      setRoute('admin');
    } else if (matched.role === 'professor') {
      setRoute('attendance');
    } else {
      setRoute('dashboard');
    }
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRoute('dashboard');
    setCollapsed(false);
    setAlertHistory([]);
    setToasts([]);
  }, []);

  useEffect(() => {
    if (!user) return;
    const available = routes.some(r => r.id === route);
    if (!available) setRoute(routes[0].id);
  }, [route, routes, user]);

  if (!user) {
    return <HomeLogin onLogin={login} />;
  }

  return (
    <AppContext.Provider value={{ addAlert, route, setRoute, user }}>
      <div className="app-shell">
        <Sidebar
          active={route}
          setRoute={setRoute}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          routes={routes}
          role={user.role}
        />

        <div className="app-main-col">
          <TopBar
            route={route}
            routes={routes}
            alerts={alertHistory}
            clearAlerts={clearAlerts}
            user={user}
            onLogout={logout}
          />

          <main className="app-content">
            <div className="app-content-inner" key={route}>
              <AppRoutes route={route} />
            </div>
          </main>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </AppContext.Provider>
  );
}

function HomeLogin({ onLogin }) {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = e => {
    e.preventDefault();
    const ok = onLogin({ role, username, password });
    if (!ok) {
      setError('Invalid credentials. Please use one of the listed demo accounts.');
      return;
    }
    setError('');
  };

  return (
    <div className="home-page">
      <div className="home-page__aurora home-page__aurora--one" />
      <div className="home-page__aurora home-page__aurora--two" />

      <div className="home-page__grid">
        <section className="home-page__intro fade-up">
          <p className="home-page__tag">Campus Management Suite</p>
          <h1>Welcome to the Portal</h1>
          <p>
            Choose a role and login. Student and professor accounts open their
            respective portals, while admin credentials open the management dashboard.
          </p>
        </section>

        <section className="home-page__card fade-up">
          <h2>Sign In</h2>

          <form onSubmit={submit}>
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={e => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="professor">Professor</option>
              <option value="admin">Admin</option>
            </select>

            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder={role === 'admin' ? 'admin' : role === 'professor' ? 'prof01' : 'student01'}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={role === 'admin' ? 'admin@123' : role === 'professor' ? 'prof@123' : 'stud@123'}
            />

            {error && <p className="home-page__error">{error}</p>}

            <button type="submit" className="home-page__login-btn">
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function Sidebar({ active, setRoute, collapsed, setCollapsed, routes, role }) {
  const isAdmin = role === 'admin';
  const isProfessor = role === 'professor';

  return (
    <aside className="sidebar" style={{ width: collapsed ? 64 : 220 }}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">{isAdmin ? 'AD' : isProfessor ? 'PR' : 'ST'}</div>
        {!collapsed && (
          <div className="sidebar-logo-text">
            <div className="sidebar-logo-title">PS-30</div>
            <div className="sidebar-logo-sub">
              {isAdmin ? 'Admin Console' : isProfessor ? 'Faculty Portal' : 'Student Portal'}
            </div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {routes.map(r => (
          <button
            key={r.id}
            className={`sidebar-nav-btn ${active === r.id ? 'sidebar-nav-btn--active' : ''}`}
            onClick={() => setRoute(r.id)}
            title={collapsed ? r.label : undefined}
          >
            <span className="sidebar-nav-icon">{r.icon}</span>
            {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>}
          </button>
        ))}
      </nav>

      <button
        className="sidebar-collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
        style={{ justifyContent: collapsed ? 'center' : undefined }}
      >
        <span className="sidebar-collapse-arrow" style={{ transform: collapsed ? 'scaleX(-1)' : undefined }}>
          {'<'}
        </span>
        {!collapsed && 'Collapse'}
      </button>
    </aside>
  );
}

function TopBar({ route, routes, alerts, clearAlerts, user, onLogout }) {
  const [showAlerts, setShowAlerts] = useState(false);
  const r = routes.find(x => x.id === route);
  const portalName =
    user.role === 'admin' ? 'Admin Portal' : user.role === 'professor' ? 'Faculty Portal' : 'Student Portal';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-icon">{r?.icon}</span>
        <span className="topbar-label">{r?.label}</span>
        <span className="topbar-course">/ {portalName}</span>
      </div>

      <div className="topbar-right">
        <LiveClock />

        <div style={{ position: 'relative' }}>
          <button className="notif-btn" onClick={() => setShowAlerts(!showAlerts)}>
            N
            {alerts.length > 0 && <span className="notif-badge">{alerts.length}</span>}
          </button>

          {showAlerts && (
            <div className="notif-panel">
              <div className="notif-panel-header">
                <span className="notif-panel-title">Notifications</span>
                {alerts.length > 0 && (
                  <button className="notif-panel-clear" onClick={clearAlerts}>
                    Clear all
                  </button>
                )}
              </div>

              {alerts.length === 0 ? (
                <div className="notif-panel-empty">No notifications</div>
              ) : (
                <div className="notif-panel-list">
                  {alerts.slice(0, 8).map(a => (
                    <div key={a.id} className="notif-panel-item">
                      <div
                        className={`notif-panel-msg notif-panel-msg--${
                          a.type === 'success' ? 'success' : a.type === 'danger' ? 'danger' : 'info'
                        }`}
                      >
                        {a.type === 'success' ? '[ok]' : a.type === 'danger' ? '[x]' : '[i]'} {a.msg}
                      </div>
                      <div className="notif-panel-time">{a.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="user-chip">
          <div className="user-avatar">{user.avatar}</div>
          <span className="user-name">{user.name}</span>
        </div>

        <button className="topbar-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="live-clock">
      <span className="live-clock-dot">*</span>
      {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </div>
  );
}

function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast-item toast-item--${t.type}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
