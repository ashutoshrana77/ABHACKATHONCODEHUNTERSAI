const student = {
  name: 'Aarav Sharma',
  avatar: null,
  college: 'DTU, Delhi',
  track: 'Full Stack Web Dev',
  currentDay: 12,
  totalDays: 60,
  currentStreak: 7,
  longestStreak: 7,
  xp: 2450,
  rank: 342,
  totalStudents: 10847,
  completedDays: [1,2,3,4,5,6,7,8,9,10,11],
  missedDays: [],
  todaySubmitted: false,
  badges: [
    { name: 'First Commit', icon: '🚀', earned: true },
    { name: '7-Day Streak', icon: '🔥', earned: true },
    { name: 'First LinkedIn Post', icon: '📝', earned: true },
    { name: '14-Day Streak', icon: '⚡', earned: false },
    { name: 'Halfway There', icon: '🏔️', earned: false },
    { name: 'Full Stack Hero', icon: '🦸', earned: false },
  ],
  recentActivity: [
    { day: 11, title: 'Authentication System', status: 'completed', time: 'Yesterday' },
    { day: 10, title: 'Database Schema Design', status: 'completed', time: '2 days ago' },
    { day: 9, title: 'Express.js Middleware', status: 'completed', time: '3 days ago' },
  ]
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function renderDashboard() {
  const app = document.getElementById('app');
  
  const greeting = `${getGreeting()}, ${student.name.split(' ')[0]} 👋`;
  const initials = getInitials(student.name);
  
  const streakPercent = (student.currentStreak / student.totalDays) * 100;
  const dashArray = 2 * Math.PI * 45; // radius is 45
  const dashOffset = dashArray - (dashArray * streakPercent) / 100;

  // Render grid
  let gridHtml = '';
  for (let i = 1; i <= student.totalDays; i++) {
    let classes = 'grid-day';
    if (student.completedDays.includes(i)) {
      classes += ' completed';
    } else if (i === student.currentDay) {
      classes += ' today';
    } else if (student.missedDays.includes(i)) {
      classes += ' missed';
    }
    gridHtml += `<div class="${classes}" title="Day ${i}"></div>`;
  }

  // Momentum meter
  const milestones = [7, 14, 21, 30, 45, 60];
  const progressPercent = (student.currentDay / student.totalDays) * 100;

  const html = `
    <style>
      :root {
        --bg: #0f172a;
        --card-bg: rgba(30, 41, 59, 0.7);
        --text-primary: #f8fafc;
        --text-secondary: #94a3b8;
        --accent: #3b82f6;
        --accent-glow: rgba(59, 130, 246, 0.5);
        --success: #22c55e;
        --warning: #f59e0b;
        --danger: #ef4444;
      }
      
      body {
        margin: 0;
        padding: 0;
        background-color: var(--bg);
        color: var(--text-primary);
        font-family: 'Inter', -apple-system, sans-serif;
        padding-bottom: 80px;
      }

      .dashboard-container {
        padding: 20px;
        max-width: 480px;
        margin: 0 auto;
        overflow-x: hidden;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        animation: fadeInDown 0.5s ease-out;
      }

      .header h1 {
        font-size: 1.25rem;
        margin: 0 0 4px 0;
        font-weight: 600;
      }

      .header p {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin: 0;
      }

      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
      }

      .card {
        background: var(--card-bg);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 20px;
        backdrop-filter: blur(10px);
        animation: fadeInUp 0.5s ease-out backwards;
      }

      .card:nth-child(2) { animation-delay: 0.1s; }
      .card:nth-child(3) { animation-delay: 0.2s; }
      .card:nth-child(4) { animation-delay: 0.3s; }
      .card:nth-child(5) { animation-delay: 0.4s; }

      .streak-card {
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .streak-card::before {
        content: '';
        position: absolute;
        top: -2px; left: -2px; right: -2px; bottom: -2px;
        background: linear-gradient(45deg, #f59e0b, #ef4444, #f59e0b);
        z-index: -1;
        border-radius: 18px;
        animation: borderGlow 3s linear infinite;
        opacity: 0.5;
      }

      .streak-ring {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto 16px;
      }

      .streak-ring svg {
        transform: rotate(-90deg);
        width: 100%;
        height: 100%;
      }

      .streak-ring circle {
        fill: none;
        stroke-width: 8;
        stroke-linecap: round;
      }

      .streak-ring .bg {
        stroke: rgba(255, 255, 255, 0.1);
      }

      .streak-ring .progress {
        stroke: url(#streakGradient);
        stroke-dasharray: ${dashArray};
        stroke-dashoffset: ${dashArray};
        animation: drawRing 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.5s;
      }

      .streak-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .streak-number {
        font-size: 2.5rem;
        font-weight: 800;
        line-height: 1;
        background: linear-gradient(135deg, #f59e0b, #ef4444);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .streak-stats {
        display: flex;
        justify-content: space-around;
        margin-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 16px;
      }

      .stat-item {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }

      .stat-item span {
        display: block;
        color: var(--text-primary);
        font-weight: 600;
        font-size: 1rem;
        margin-top: 4px;
      }

      .today-task {
        border-color: rgba(59, 130, 246, 0.3);
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
      }

      .status-badge {
        display: inline-flex;
        align-items: center;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(245, 158, 11, 0.1);
        color: var(--warning);
        margin-bottom: 12px;
      }

      .status-badge::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--warning);
        margin-right: 6px;
        animation: pulse 2s infinite;
      }

      .task-title {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0 0 8px 0;
      }
      
      .task-desc {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin: 0 0 16px 0;
        line-height: 1.5;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .tag {
        font-size: 0.7rem;
        padding: 2px 8px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        color: var(--text-secondary);
      }

      .btn {
        display: block;
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        color: white;
        text-align: center;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      .btn:active {
        transform: scale(0.98);
      }

      .momentum-meter {
        position: relative;
        padding: 20px 0;
      }

      .meter-line {
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        position: relative;
        margin-bottom: 24px;
      }

      .meter-progress {
        position: absolute;
        top: 0; left: 0; height: 100%;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        border-radius: 2px;
        width: ${progressPercent}%;
      }
      
      .meter-dot {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--card-bg);
        border: 2px solid var(--text-secondary);
        z-index: 2;
      }

      .meter-dot.reached {
        border-color: #8b5cf6;
        background: #8b5cf6;
      }

      .meter-dot.current {
        width: 16px;
        height: 16px;
        border-color: white;
        background: #3b82f6;
        box-shadow: 0 0 10px #3b82f6;
      }
      
      .meter-label {
        position: absolute;
        top: 16px;
        transform: translateX(-50%);
        font-size: 0.7rem;
        color: var(--text-secondary);
      }

      .momentum-text {
        font-size: 0.875rem;
        color: var(--text-secondary);
        text-align: center;
        line-height: 1.5;
      }
      
      .momentum-text span {
        color: var(--text-primary);
        font-weight: 600;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        gap: 6px;
        margin-bottom: 12px;
      }

      .grid-day {
        aspect-ratio: 1;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.05);
      }

      .grid-day.completed {
        background: var(--success);
        box-shadow: 0 0 5px rgba(34, 197, 94, 0.3);
      }

      .grid-day.today {
        background: var(--warning);
        animation: pulse 2s infinite;
      }
      
      .grid-day.missed {
        border: 1px solid var(--danger);
      }

      .section-title {
        font-size: 1rem;
        font-weight: 600;
        margin: 24px 0 16px 0;
      }

      .achievements {
        display: flex;
        overflow-x: auto;
        gap: 16px;
        padding-bottom: 12px;
        scrollbar-width: none;
      }
      
      .achievements::-webkit-scrollbar {
        display: none;
      }

      .badge {
        flex: 0 0 auto;
        width: 80px;
        text-align: center;
        opacity: 0.5;
        filter: grayscale(1);
        transition: all 0.3s;
      }

      .badge.earned {
        opacity: 1;
        filter: grayscale(0);
      }

      .badge-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin: 0 auto 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .badge.earned .badge-icon {
        background: rgba(59, 130, 246, 0.1);
        border-color: rgba(59, 130, 246, 0.3);
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
      }

      .badge-name {
        font-size: 0.7rem;
        color: var(--text-secondary);
        line-height: 1.2;
      }

      .badge.earned .badge-name {
        color: var(--text-primary);
        font-weight: 500;
      }

      .activity-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .activity-item {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        text-decoration: none;
        color: inherit;
      }

      .activity-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(34, 197, 94, 0.1);
        color: var(--success);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
      }

      .activity-details {
        flex: 1;
      }

      .activity-title {
        font-size: 0.875rem;
        font-weight: 500;
        margin: 0 0 4px 0;
      }

      .activity-meta {
        font-size: 0.75rem;
        color: var(--text-secondary);
      }
      
      .quick-stats {
        display: flex;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.03);
        padding: 16px;
        border-radius: 12px;
        margin-bottom: 24px;
      }
      
      .quick-stat {
        text-align: center;
      }
      
      .quick-stat-val {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      
      .quick-stat-label {
        font-size: 0.7rem;
        color: var(--text-secondary);
        margin-top: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .leaderboard-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .lb-item {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
      }
      
      .lb-item.highlight {
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.3);
      }
      
      .lb-rank {
        width: 24px;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-secondary);
      }
      
      .lb-info {
        flex: 1;
        margin-left: 12px;
      }
      
      .lb-name {
        font-size: 0.875rem;
        font-weight: 500;
      }
      
      .lb-college {
        font-size: 0.7rem;
        color: var(--text-secondary);
      }
      
      .lb-xp {
        font-size: 0.875rem;
        font-weight: 600;
        color: #f59e0b;
      }

      .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(15, 23, 42, 0.85);
        backdrop-filter: blur(12px);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-around;
        padding: 12px 0 calc(12px + env(safe-area-inset-bottom));
        z-index: 50;
      }

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.65rem;
        gap: 4px;
      }

      .nav-item.active {
        color: var(--accent);
      }

      .nav-item svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }

      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
      }
      
      @keyframes borderGlow {
        0% { opacity: 0.3; }
        50% { opacity: 0.7; }
        100% { opacity: 0.3; }
      }

      @keyframes drawRing {
        to { stroke-dashoffset: ${dashOffset}; }
      }
    </style>

    <div class="dashboard-container">
      <header class="header">
        <div>
          <h1>${greeting}</h1>
          <p>Day ${student.currentDay} of ${student.totalDays} • ${student.track}</p>
        </div>
        <div class="avatar">${initials}</div>
      </header>

      <div class="card streak-card">
        <div class="streak-ring">
          <svg viewBox="0 0 100 100">
            <defs>
              <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f59e0b" />
                <stop offset="100%" stop-color="#ef4444" />
              </linearGradient>
            </defs>
            <circle class="bg" cx="50" cy="50" r="45" />
            <circle class="progress" cx="50" cy="50" r="45" />
          </svg>
          <div class="streak-content">
            <span class="streak-number">${student.currentStreak}</span>
          </div>
        </div>
        <h2 style="margin: 0 0 4px; font-size: 1.25rem;">${student.currentStreak} Day Streak</h2>
        <p style="margin: 0; color: var(--text-secondary); font-size: 0.875rem;">Your longest streak yet!</p>
        
        <div class="streak-stats">
          <div class="stat-item">
            Longest Streak
            <span>${student.longestStreak} days</span>
          </div>
          <div class="stat-item">
            XP Earned
            <span>${student.xp.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div class="card today-task">
        <div class="status-badge">NOT SUBMITTED</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px; font-weight: 600;">DAY ${student.currentDay}</div>
        <h3 class="task-title">Build a REST API with Express.js</h3>
        <p class="task-desc">Create CRUD endpoints for a todo application with proper error handling and input validation.</p>
        
        <div class="tags">
          <span class="tag">Node.js</span>
          <span class="tag">Express</span>
          <span class="tag">REST APIs</span>
          <span class="tag">Error Handling</span>
        </div>
        
        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 16px;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #ef4444; margin-right: 4px;"></span>
          Due by midnight
        </p>
        
        <a href="#day/12" class="btn">Start Today's Task →</a>
      </div>

      <div class="card">
        <h3 class="section-title" style="margin-top: 0;">Momentum Meter</h3>
        <div class="momentum-meter">
          <div class="meter-line">
            <div class="meter-progress"></div>
            ${milestones.map(m => {
              const pos = (m / student.totalDays) * 100;
              let classes = 'meter-dot';
              if (m < student.currentDay) classes += ' reached';
              if (m === 14) classes += ' current'; // Just to highlight
              return `
                <div class="${classes}" style="left: ${pos}%">
                  <div class="meter-label">${m}</div>
                </div>
              `;
            }).join('')}
            
            <div class="meter-dot current" style="left: ${progressPercent}%"></div>
          </div>
        </div>
        <p class="momentum-text">You're in the consistency zone. <span>78%</span> of students who reach Day 14 complete the full challenge.</p>
      </div>

      <div class="card">
        <h3 class="section-title" style="margin-top: 0;">Progress Overview</h3>
        <div class="grid-container">
          ${gridHtml}
        </div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); text-align: center; margin: 12px 0 0;">
          Day ${student.completedDays.length} of ${student.totalDays} completed • ${Math.round((student.completedDays.length/student.totalDays)*100)}% done
        </p>
      </div>
      
      <div class="quick-stats">
        <div class="quick-stat">
          <div class="quick-stat-val">#${student.rank}</div>
          <div class="quick-stat-label">of ${student.totalStudents.toLocaleString()}</div>
        </div>
        <div class="quick-stat">
          <div class="quick-stat-val">${student.totalDays - student.completedDays.length}</div>
          <div class="quick-stat-label">Days Left</div>
        </div>
        <div class="quick-stat">
          <div class="quick-stat-val">${Math.round((student.completedDays.length/student.totalDays)*100)}%</div>
          <div class="quick-stat-label">Completion</div>
        </div>
      </div>

      <h3 class="section-title">Achievements</h3>
      <div class="achievements">
        ${student.badges.map(b => `
          <div class="badge ${b.earned ? 'earned' : ''}">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-name">${b.name}</div>
          </div>
        `).join('')}
      </div>

      <h3 class="section-title">Recent Activity</h3>
      <div class="activity-list">
        ${student.recentActivity.map(a => `
          <a href="#day/${a.day}" class="activity-item">
            <div class="activity-icon">✓</div>
            <div class="activity-details">
              <h4 class="activity-title">Day ${a.day}: ${a.title}</h4>
              <div class="activity-meta">${a.time}</div>
            </div>
          </a>
        `).join('')}
      </div>

      <h3 class="section-title">Leaderboard</h3>
      <div class="card" style="padding: 12px;">
        <div class="leaderboard-list">
          <div class="lb-item">
            <div class="lb-rank">1</div>
            <div class="avatar" style="width:32px;height:32px;font-size:0.8rem;">MK</div>
            <div class="lb-info">
              <div class="lb-name">Meera K.</div>
              <div class="lb-college">IIT Bombay • 12-day streak</div>
            </div>
            <div class="lb-xp">4,200 XP</div>
          </div>
          <div class="lb-item">
            <div class="lb-rank">2</div>
            <div class="avatar" style="width:32px;height:32px;font-size:0.8rem;background:linear-gradient(135deg, #10b981, #059669);">RP</div>
            <div class="lb-info">
              <div class="lb-name">Rahul P.</div>
              <div class="lb-college">BITS Pilani • 11-day streak</div>
            </div>
            <div class="lb-xp">3,890 XP</div>
          </div>
          <div class="lb-item">
            <div class="lb-rank">3</div>
            <div class="avatar" style="width:32px;height:32px;font-size:0.8rem;background:linear-gradient(135deg, #ec4899, #be185d);">DS</div>
            <div class="lb-info">
              <div class="lb-name">Divya S.</div>
              <div class="lb-college">NIT Trichy • 11-day streak</div>
            </div>
            <div class="lb-xp">3,650 XP</div>
          </div>
          <div class="lb-item highlight" style="margin-top: 8px;">
            <div class="lb-rank">${student.rank}</div>
            <div class="avatar" style="width:32px;height:32px;font-size:0.8rem;">${initials}</div>
            <div class="lb-info">
              <div class="lb-name">You</div>
              <div class="lb-college">${student.college} • ${student.currentStreak}-day streak</div>
            </div>
            <div class="lb-xp">${student.xp.toLocaleString()} XP</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 16px;">
          <a href="#leaderboard" style="color: var(--accent); text-decoration: none; font-size: 0.875rem; font-weight: 500;">View Full Leaderboard</a>
        </div>
      </div>
      
      <!-- padding for fixed nav -->
      <div style="height: 20px;"></div>
    </div>

    <nav class="bottom-nav">
      <a href="#dashboard" class="nav-item active">
        <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        Home
      </a>
      <a href="#calendar" class="nav-item">
        <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
        Calendar
      </a>
      <a href="#leaderboard" class="nav-item">
        <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
        Leaderboard
      </a>
      <a href="#profile" class="nav-item">
        <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        Profile
      </a>
    </nav>
  `;
  
  app.innerHTML = html;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', renderDashboard);

// Mock router handler for demo purposes
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  console.log('Navigated to:', hash);
  // Add active state to nav based on hash
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('href') === hash) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});
