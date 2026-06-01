import { useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ScrollToTop } from '../components/ScrollToTop';
import { MainScrollContext } from '../context/MainScrollContext';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  const isSystemDesignActive =
    location.pathname === '/system-design' || location.pathname.startsWith('/system-design/');

  return (
    <MainScrollContext.Provider value={mainRef}>
      <div className="app-shell">
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-brand">
            <span>ReactTeacher</span>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/get-started" end className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden>
                  ✦
                </span>
                <span className="nav-label">Get Started</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/challenges" className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden>
                  &lt;&gt;
                </span>
                <span className="nav-label">React Challenges</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/flashcards" className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden>
                  🗂
                </span>
                <span className="nav-label">Flashcards</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/system-design" className={isSystemDesignActive ? 'active' : ''}>
                <span className="nav-icon" aria-hidden>
                  ⎇
                </span>
                <span className="nav-label">System Design</span>
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            className="collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
          >
            {collapsed ? '→' : '← Collapse Menu'}
          </button>
        </aside>
        <main ref={mainRef} className="main-content">
          <ScrollToTop />
          <Outlet />
        </main>
      </div>
    </MainScrollContext.Provider>
  );
}
