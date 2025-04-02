export default function AutoPartsDashboard() {
    return (
      <div className="layout">
        {/* Sidebar */}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-button">
          <span></span>
          <span></span>
          <span></span>
        </label>
  
        <aside className="sidebar">
          <div className="logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            <h1>AutoParts</h1>
          </div>
          <nav className="menu">
            <a href="#dashboard" className="menu-item active" data-tab="dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3v18h18"></path>
                <path d="m19 9-5 5-4-4-3 3"></path>
              </svg>
              Dashboard
            </a>
            {/* Other menu items */}
          </nav>
        </aside>
  
        {/* Main content */}
        <main className="main-content">
          <div className="tab-content active" id="dashboard">
            <h2>Dashboard Content</h2>
            {/* Dashboard content */}
          </div>
        </main>
  
        {/* Popup overlay */}
        <div id="popup-overlay" className="popup-overlay">
          {/* Popups */}
        </div>
      </div>
    )
  }
  
  