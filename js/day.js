const dayData = {
  dayNumber: 12,
  totalDays: 60,
  title: 'Build a REST API with Express.js',
  track: 'Full Stack Web Dev',
  difficulty: 'Intermediate',
  estimatedTime: '2-3 hours',
  xpReward: 250,
  skills: ['Node.js', 'Express.js', 'REST APIs', 'Error Handling', 'Validation'],
  description: `Today you'll build a complete REST API for a todo application using Express.js. This is one of the most common interview tasks — being able to design and implement clean API endpoints.`,
  objectives: [
    'Set up an Express.js server with proper project structure',
    'Implement CRUD endpoints (GET, POST, PUT, DELETE) for todos',
    'Add input validation using a library like Joi or express-validator',
    'Implement proper error handling with meaningful error messages',
    'Test your endpoints using Postman or Thunder Client',
  ],
  resources: [
    { title: 'Express.js Official Guide', url: '#', type: 'docs', icon: '📄' },
    { title: 'REST API Best Practices', url: '#', type: 'article', icon: '📰' },
    { title: 'Building APIs - Video Tutorial', url: '#', type: 'video', icon: '🎥' },
  ],
  bonusChallenge: 'Add pagination to your GET /todos endpoint and rate limiting to prevent abuse.',
  submission: {
    githubUrl: '',
    linkedinUrl: '',
    notes: '',
    submitted: false,
  },
  previousDay: { number: 11, title: 'Authentication System', completed: true },
  nextDay: { number: 13, title: 'Database Integration with MongoDB', locked: true },
};

function renderDayPage() {
  const app = document.getElementById('app');
  
  // Calculate contextual banner based on time
  const currentHour = new Date().getHours();
  let timeBanner = '';
  if (currentHour >= 22 || currentHour < 5) {
    timeBanner = '🌙 Night owl mode — You\'re not alone. 847 students are building right now.';
  } else if (currentHour >= 6 && currentHour < 10) {
    timeBanner = '🌅 Early bird! Only 12% of students submit before 10 AM.';
  } else {
    timeBanner = '☀️ 2,341 students have already submitted today. Your turn.';
  }

  const html = `
    <style>
      :root {
        --bg-dark: #0f1115;
        --bg-card: #1a1d24;
        --bg-input: #232730;
        --text-main: #f3f4f6;
        --text-muted: #9ca3af;
        --primary: #3b82f6;
        --primary-glow: rgba(59, 130, 246, 0.5);
        --success: #10b981;
        --warning: #f59e0b;
        --danger: #ef4444;
        --border: #2d3748;
      }
      
      .day-page {
        background-color: var(--bg-dark);
        color: var(--text-main);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        min-height: 100vh;
        padding-bottom: 40px;
      }
      
      /* Navigation */
      .top-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        position: sticky;
        top: 0;
        background: rgba(15, 17, 21, 0.9);
        backdrop-filter: blur(10px);
        z-index: 50;
        border-bottom: 1px solid var(--border);
      }
      .nav-btn {
        background: none;
        border: none;
        color: var(--text-main);
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: background 0.2s;
      }
      .nav-btn:hover { background: rgba(255,255,255,0.1); }
      .nav-title {
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 1px;
        color: var(--text-muted);
      }
      .progress-bar-container {
        height: 2px;
        background: var(--border);
        width: 100%;
      }
      .progress-bar {
        height: 100%;
        background: var(--primary);
        width: ${(dayData.dayNumber / dayData.totalDays) * 100}%;
      }
      
      /* Header section */
      .header-section {
        padding: 24px 20px;
      }
      .day-number {
        font-size: 42px;
        font-weight: 800;
        margin: 0 0 8px 0;
        background: linear-gradient(135deg, #60a5fa, #a78bfa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .task-title {
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 16px 0;
        line-height: 1.3;
      }
      .badge-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 16px;
      }
      .badge {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 100px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .badge.track { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
      .badge.difficulty { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
      .badge.time { background: rgba(156, 163, 175, 0.15); color: #e5e7eb; }
      .badge.xp { background: rgba(16, 185, 129, 0.15); color: #34d399; }
      
      /* Skills */
      .skills-scroll {
        display: flex;
        overflow-x: auto;
        padding: 0 20px 16px;
        gap: 8px;
        scrollbar-width: none;
      }
      .skills-scroll::-webkit-scrollbar { display: none; }
      .skill-chip {
        background: var(--bg-card);
        border: 1px solid var(--border);
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 13px;
        white-space: nowrap;
        color: #d1d5db;
      }
      
      /* Section common */
      .section {
        padding: 24px 20px;
        border-top: 1px solid var(--border);
      }
      .section-title {
        font-size: 18px;
        font-weight: 700;
        margin: 0 0 16px 0;
        color: white;
      }
      .description {
        color: var(--text-muted);
        line-height: 1.6;
        font-size: 15px;
      }
      
      /* Objectives */
      .objective-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 0;
        cursor: pointer;
      }
      .checkbox {
        width: 22px;
        height: 22px;
        border: 2px solid var(--border);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 2px;
        transition: all 0.2s;
      }
      .checkbox svg {
        width: 14px;
        height: 14px;
        fill: none;
        stroke: white;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0;
        transform: scale(0.5);
        transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .objective-item.checked .checkbox {
        background: var(--primary);
        border-color: var(--primary);
      }
      .objective-item.checked .checkbox svg {
        opacity: 1;
        transform: scale(1);
      }
      .objective-item.checked .objective-text {
        text-decoration: line-through;
        color: var(--text-muted);
      }
      .objective-text {
        font-size: 15px;
        line-height: 1.5;
        transition: color 0.2s;
      }
      .progress-counter {
        font-size: 13px;
        color: var(--text-muted);
        margin-left: auto;
        font-weight: 500;
      }
      .obj-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      
      /* Resources */
      .resource-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 16px;
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s;
      }
      .resource-card:active { transform: scale(0.98); }
      .resource-icon { font-size: 24px; }
      .resource-info { flex: 1; }
      .resource-title { font-weight: 600; font-size: 15px; margin-bottom: 4px; }
      .resource-type { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
      
      /* Bonus */
      .bonus-card {
        background: linear-gradient(var(--bg-dark), var(--bg-dark)) padding-box,
                    linear-gradient(135deg, #f59e0b, #ec4899) border-box;
        border: 2px solid transparent;
        border-radius: 16px;
        padding: 20px;
        margin: 24px 20px;
      }
      .bonus-title {
        color: #fbbf24;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
      }
      .bonus-desc { font-size: 14px; color: #d1d5db; line-height: 1.5; }
      
      /* Context Banner */
      .context-banner {
        background: rgba(59, 130, 246, 0.1);
        border-left: 4px solid var(--primary);
        padding: 12px 16px;
        margin: 20px;
        border-radius: 0 8px 8px 0;
        font-size: 13px;
        color: #93c5fd;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      /* Submission Section */
      .submission-section {
        background: var(--bg-card);
        border-radius: 20px 20px 0 0;
        padding: 24px 20px;
        margin-top: 20px;
        position: relative;
        overflow: hidden;
      }
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255,255,255,0.1);
        padding: 6px 12px;
        border-radius: 100px;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .status-badge.submitted {
        background: rgba(16, 185, 129, 0.15);
        color: var(--success);
      }
      
      .input-group {
        margin-bottom: 16px;
      }
      .input-label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: #d1d5db;
        margin-bottom: 8px;
      }
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      .input-icon {
        position: absolute;
        left: 12px;
        font-size: 16px;
        color: var(--text-muted);
      }
      .form-input {
        width: 100%;
        background: var(--bg-input);
        border: 1px solid var(--border);
        color: white;
        padding: 14px 14px 14px 40px;
        border-radius: 12px;
        font-size: 14px;
        transition: all 0.2s;
        box-sizing: border-box;
      }
      textarea.form-input {
        padding-left: 14px;
        min-height: 100px;
        resize: vertical;
      }
      .form-input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px var(--primary-glow);
      }
      .form-input.valid {
        border-color: var(--success);
      }
      .form-input.invalid {
        border-color: var(--danger);
      }
      .validation-icon {
        position: absolute;
        right: 12px;
        display: none;
      }
      .form-input.valid + .validation-icon {
        display: block;
        color: var(--success);
      }
      .error-msg {
        color: var(--danger);
        font-size: 12px;
        margin-top: 6px;
        display: none;
      }
      
      .char-count {
        text-align: right;
        font-size: 12px;
        color: var(--text-muted);
        margin-top: 6px;
      }
      
      .submit-btn {
        width: 100%;
        background: var(--primary);
        color: white;
        border: none;
        padding: 16px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 700;
        margin-top: 10px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
      }
      .submit-btn:disabled {
        background: var(--bg-input);
        color: var(--text-muted);
        cursor: not-allowed;
      }
      .submit-btn:not(:disabled):active {
        transform: scale(0.98);
      }
      
      /* Success State */
      .success-state {
        display: none;
        text-align: center;
        padding: 40px 20px;
        animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .check-circle {
        width: 80px;
        height: 80px;
        background: rgba(16, 185, 129, 0.15);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        color: var(--success);
      }
      .check-circle svg {
        width: 40px;
        height: 40px;
      }
      .success-title {
        font-size: 28px;
        font-weight: 800;
        margin-bottom: 8px;
        background: linear-gradient(135deg, #34d399, #3b82f6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .success-stats {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin: 20px 0;
      }
      .stat-pill {
        background: var(--bg-input);
        padding: 8px 16px;
        border-radius: 100px;
        font-weight: 600;
        font-size: 14px;
      }
      
      /* Nav footer */
      .day-nav-footer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 24px 20px;
        background: var(--bg-dark);
      }
      .nav-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 12px;
        text-decoration: none;
        color: var(--text-main);
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .nav-card.locked {
        opacity: 0.6;
        pointer-events: none;
      }
      .nav-card-label {
        font-size: 11px;
        color: var(--text-muted);
        text-transform: uppercase;
      }
      .nav-card-title {
        font-size: 13px;
        font-weight: 600;
        line-height: 1.3;
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .confetti {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none;
        z-index: 100;
      }
    </style>
    
    <div class="day-page">
      <nav class="top-nav">
        <button class="nav-btn" id="backBtn">←</button>
        <div class="nav-title">DAY ${dayData.dayNumber} / ${dayData.totalDays}</div>
        <button class="nav-btn" id="bookmarkBtn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        </button>
      </nav>
      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
      
      <header class="header-section">
        <h1 class="day-number">Day ${dayData.dayNumber}</h1>
        <h2 class="task-title">${dayData.title}</h2>
        <div class="badge-row">
          <span class="badge track">${dayData.track}</span>
          <span class="badge difficulty">⚡ ${dayData.difficulty}</span>
          <span class="badge time">⏱️ ${dayData.estimatedTime}</span>
          <span class="badge xp">⭐ ${dayData.xpReward} XP</span>
        </div>
      </header>
      
      <div class="skills-scroll">
        ${dayData.skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
      </div>
      
      <section class="section">
        <h3 class="section-title">What you'll build</h3>
        <p class="description">${dayData.description}</p>
      </section>
      
      <section class="section" id="objectives-section">
        <div class="obj-header">
          <h3 class="section-title" style="margin:0;">Objectives</h3>
          <span class="progress-counter" id="obj-counter">0/${dayData.objectives.length} completed</span>
        </div>
        <div class="objectives-list">
          ${dayData.objectives.map((obj, i) => `
            <div class="objective-item" data-index="${i}">
              <div class="checkbox">
                <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div class="objective-text">${obj}</div>
            </div>
          `).join('')}
        </div>
      </section>
      
      <section class="section">
        <h3 class="section-title">Resources</h3>
        <div>
          ${dayData.resources.map(res => `
            <a href="${res.url}" class="resource-card">
              <span class="resource-icon">${res.icon}</span>
              <div class="resource-info">
                <div class="resource-title">${res.title}</div>
                <div class="resource-type">${res.type}</div>
              </div>
              <span style="color:var(--text-muted)">→</span>
            </a>
          `).join('')}
        </div>
      </section>
      
      <div class="bonus-card">
        <div class="bonus-title">⭐ Bonus Challenge (+50 XP)</div>
        <div class="bonus-desc">${dayData.bonusChallenge}</div>
      </div>
      
      <div class="context-banner">
        ${timeBanner}
      </div>
      
      <section class="submission-section" id="submission-form">
        <div class="status-badge" id="statusBadge">
          <span id="statusIcon">⚪</span> <span id="statusText">Not yet submitted</span>
        </div>
        <h3 class="section-title">Submit Your Work</h3>
        
        <div class="input-group">
          <label class="input-label">GitHub Repository / Commit URL</label>
          <div class="input-wrapper">
            <span class="input-icon">💻</span>
            <input type="url" id="githubUrl" class="form-input" placeholder="https://github.com/username/repo/..." />
            <span class="validation-icon">✓</span>
          </div>
          <div class="error-msg" id="ghError">Please enter a valid GitHub URL.</div>
        </div>
        
        <div class="input-group">
          <label class="input-label">LinkedIn Post URL</label>
          <div class="input-wrapper">
            <span class="input-icon">🔗</span>
            <input type="url" id="linkedinUrl" class="form-input" placeholder="https://linkedin.com/posts/..." />
            <span class="validation-icon">✓</span>
          </div>
          <div class="error-msg" id="liError">Please enter a valid LinkedIn URL.</div>
        </div>
        
        <div class="input-group">
          <label class="input-label">Notes (optional)</label>
          <textarea id="notes" class="form-input" placeholder="What did you learn today? Any blockers?" maxlength="500"></textarea>
          <div class="char-count" id="charCount">0/500</div>
        </div>
        
        <button id="submitBtn" class="submit-btn" disabled>Submit Day ${dayData.dayNumber} 🚀</button>
      </section>
      
      <div class="success-state" id="successState">
        <div class="check-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 class="success-title">Day ${dayData.dayNumber} Complete! 🎉</h2>
        <p style="color: var(--text-muted)">Great job pushing through.</p>
        <div class="success-stats">
          <div class="stat-pill" style="color: #34d399">+${dayData.xpReward} XP earned</div>
          <div class="stat-pill" style="color: #fbbf24">Streak: 8 days 🔥</div>
        </div>
        <button class="submit-btn" id="previewNextBtn" style="margin-top:20px">Preview Day 13 →</button>
      </div>
      
      <div class="day-nav-footer">
        <a href="#" class="nav-card">
          <span class="nav-card-label">← Day ${dayData.previousDay.number}</span>
          <span class="nav-card-title">${dayData.previousDay.title} ${dayData.previousDay.completed ? '✓' : ''}</span>
        </a>
        <a href="#" class="nav-card ${dayData.nextDay.locked ? 'locked' : ''}">
          <span class="nav-card-label">Day ${dayData.nextDay.number} →</span>
          <span class="nav-card-title">${dayData.nextDay.title} ${dayData.nextDay.locked ? '🔒' : ''}</span>
        </a>
      </div>
    </div>
  `;

  app.innerHTML = html;
  
  bindEvents();
}

function bindEvents() {
  // Navigation
  document.getElementById('backBtn').addEventListener('click', () => {
    console.log('Navigate to /dashboard');
    // window.history.back();
  });
  
  const bookmarkBtn = document.getElementById('bookmarkBtn');
  let bookmarked = false;
  bookmarkBtn.addEventListener('click', () => {
    bookmarked = !bookmarked;
    bookmarkBtn.style.color = bookmarked ? '#f59e0b' : 'var(--text-main)';
    if(bookmarked) {
        bookmarkBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>';
    } else {
        bookmarkBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>';
    }
  });

  // Objectives
  const objItems = document.querySelectorAll('.objective-item');
  const objCounter = document.getElementById('obj-counter');
  let completedObjs = 0;
  
  objItems.forEach(item => {
    item.addEventListener('click', () => {
      const isChecked = item.classList.toggle('checked');
      completedObjs += isChecked ? 1 : -1;
      objCounter.textContent = \`\${completedObjs}/\${dayData.objectives.length} completed\`;
    });
  });

  // Form Validation
  const ghInput = document.getElementById('githubUrl');
  const liInput = document.getElementById('linkedinUrl');
  const ghError = document.getElementById('ghError');
  const liError = document.getElementById('liError');
  const submitBtn = document.getElementById('submitBtn');
  
  const isValidGH = (url) => /^https?:\\/\\/(www\\.)?github\\.com\\/.+/i.test(url);
  const isValidLI = (url) => /^https?:\\/\\/(www\\.)?linkedin\\.com\\/.+/i.test(url);

  const validateInputs = () => {
    const ghVal = ghInput.value.trim();
    const liVal = liInput.value.trim();
    
    let ghValid = false;
    if(ghVal.length > 0) {
      ghValid = isValidGH(ghVal);
      ghInput.classList.toggle('valid', ghValid);
      ghInput.classList.toggle('invalid', !ghValid);
      ghError.style.display = ghValid ? 'none' : 'block';
    } else {
      ghInput.classList.remove('valid', 'invalid');
      ghError.style.display = 'none';
    }
    
    let liValid = false;
    if(liVal.length > 0) {
      liValid = isValidLI(liVal);
      liInput.classList.toggle('valid', liValid);
      liInput.classList.toggle('invalid', !liValid);
      liError.style.display = liValid ? 'none' : 'block';
    } else {
      liInput.classList.remove('valid', 'invalid');
      liError.style.display = 'none';
    }
    
    submitBtn.disabled = !(ghValid && liValid);
  };

  ghInput.addEventListener('input', validateInputs);
  liInput.addEventListener('input', validateInputs);
  ghInput.addEventListener('blur', validateInputs);
  liInput.addEventListener('blur', validateInputs);

  // Notes Character Count
  const notes = document.getElementById('notes');
  const charCount = document.getElementById('charCount');
  notes.addEventListener('input', () => {
    charCount.textContent = \`\${notes.value.length}/500\`;
  });

  // Submission
  submitBtn.addEventListener('click', () => {
    // Show Success State
    document.getElementById('submission-form').style.display = 'none';
    document.getElementById('successState').style.display = 'block';
    createConfetti();
  });
}

function createConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti';
  document.body.appendChild(container);
  
  const colors = ['#3b82f6', '#10b981', '#fbbf24', '#ec4899', '#8b5cf6'];
  
  for(let i=0; i<50; i++) {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.width = Math.random() * 8 + 4 + 'px';
    el.style.height = Math.random() * 8 + 4 + 'px';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    el.style.left = '50%';
    el.style.top = '50%';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 15 + Math.random() * 15;
    const tx = Math.cos(angle) * velocity * (Math.random() * 10 + 5);
    const ty = Math.sin(angle) * velocity * (Math.random() * 10 + 5) - 50;
    
    el.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: \`translate(\${tx}px, \${ty}px) scale(0)\`, opacity: 0 }
    ], {
      duration: 1000 + Math.random() * 1000,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    }).onfinish = () => el.remove();
    
    container.appendChild(el);
  }
  
  setTimeout(() => container.remove(), 2000);
}

// Initial render
document.addEventListener('DOMContentLoaded', renderDayPage);
// If testing immediately in an already loaded DOM:
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(renderDayPage, 1);
}
