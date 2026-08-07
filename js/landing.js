export function renderLandingPage() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <style>
            .landing-page {
                font-family: var(--font-primary, system-ui, -apple-system, sans-serif);
                color: var(--text-primary, #ffffff);
                background-color: var(--bg-primary, #0f172a);
                overflow-x: hidden;
            }
            .hero-gradient-text {
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .gradient-border-card {
                position: relative;
                border-radius: var(--radius-lg, 16px);
                background: var(--bg-secondary, #1e293b);
                padding: 1px;
                z-index: 1;
            }
            .gradient-border-card::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: var(--radius-lg, 16px);
                padding: 2px;
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                z-index: -1;
            }
            
            /* Animations */
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: fadeInUp 0.8s ease-out forwards;
                opacity: 0;
            }
            .delay-100 { animation-delay: 100ms; }
            .delay-200 { animation-delay: 200ms; }
            .delay-300 { animation-delay: 300ms; }
            
            /* Track Scroll */
            .tracks-container {
                display: flex;
                overflow-x: auto;
                gap: 1rem;
                padding-bottom: 1rem;
                scrollbar-width: none;
                -ms-overflow-style: none;
                scroll-snap-type: x mandatory;
            }
            .tracks-container::-webkit-scrollbar {
                display: none;
            }
            .track-card {
                min-width: 280px;
                flex-shrink: 0;
                scroll-snap-align: start;
                background: var(--bg-secondary, #1e293b);
                border-radius: var(--radius-lg, 16px);
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border: 1px solid var(--border-color, #334155);
            }
            
            /* FAQ Accordion */
            .faq-item {
                border-bottom: 1px solid var(--border-color, #334155);
                padding: 1rem 0;
            }
            .faq-question {
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                font-weight: 600;
            }
            .faq-answer {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease-out, margin-top 0.3s;
                color: var(--text-secondary, #94a3b8);
            }
            .faq-item.active .faq-answer {
                max-height: 200px;
                margin-top: 0.5rem;
            }
            .faq-item.active .faq-icon {
                transform: rotate(45deg);
            }
            .faq-icon {
                transition: transform 0.3s ease;
            }

            /* Floating Streak */
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0px); }
            }
            .floating-streak {
                animation: float 4s ease-in-out infinite;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 0.75rem 1.5rem;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                margin-top: 2rem;
            }
            
            /* General Utilities */
            .text-transparent { color: transparent; }
            .bg-clip-text { background-clip: text; -webkit-background-clip: text; }
            .glow-button {
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                transition: box-shadow 0.3s ease;
            }
            .glow-button:hover {
                box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
            }
        </style>
        
        <div class="landing-page min-h-screen">
            <!-- Navigation -->
            <nav class="flex justify-between items-center p-4 container mx-auto">
                <div class="font-bold text-xl flex items-center">
                    <span class="hero-gradient-text text-2xl mr-1">AB</span>Talks
                </div>
            </nav>

            <!-- 1. HERO SECTION -->
            <section class="section container mx-auto px-4 pt-12 pb-20 text-center flex flex-col items-center">
                <h1 class="text-5xl font-bold mb-4 animate-fade-in-up leading-tight">
                    <span class="hero-gradient-text">60 Days.</span><br/>
                    One Habit.<br/>
                    Career Changed.
                </h1>
                <p class="text-secondary text-lg mb-8 max-w-md animate-fade-in-up delay-100">
                    Join 10,000+ Indian college students who code daily, post publicly, and get noticed by recruiters.
                </p>
                <a href="#/dashboard" class="btn-primary w-full max-w-sm py-4 rounded-xl font-bold text-lg mb-4 glow-button animate-fade-in-up delay-200" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6);">
                    Start Your Challenge &rarr;
                </a>
                <a href="#how-it-works" id="scroll-to-how" class="text-secondary text-sm font-medium animate-fade-in-up delay-300">
                    See how it works &darr;
                </a>
                
                <div class="floating-streak animate-fade-in-up delay-300">
                    <span class="text-2xl">🔥</span>
                    <div class="text-left">
                        <div class="text-xs text-secondary font-medium uppercase tracking-wider">Current Streak</div>
                        <div class="font-bold text-white">Day 24 / 60</div>
                    </div>
                </div>
            </section>

            <!-- 2. TRUST BAR -->
            <section class="border-y border-slate-800 bg-slate-900/50 py-6">
                <div class="container mx-auto px-4 text-center">
                    <p class="text-xs text-secondary font-medium uppercase tracking-widest mb-4">Trusted by students from</p>
                    <div class="flex flex-wrap justify-center gap-4 text-slate-400 font-bold opacity-70">
                        <span>IIT Delhi</span> &bull; 
                        <span>BITS Pilani</span> &bull; 
                        <span>VIT</span> &bull; 
                        <span>SRM</span> &bull; 
                        <span>DTU</span>
                    </div>
                    <p class="text-sm text-blue-400 mt-4 font-medium">10,847 students enrolled</p>
                </div>
            </section>

            <!-- 3. HOW IT WORKS SECTION -->
            <section id="how-it-works" class="section container mx-auto px-4 py-20">
                <h2 class="text-3xl font-bold text-center mb-10">How it works</h2>
                <div class="flex flex-col gap-6">
                    <div class="card p-6 glass">
                        <div class="text-4xl mb-4">🎯</div>
                        <h3 class="text-xl font-bold mb-2">Step 1: Pick Your Track</h3>
                        <p class="text-secondary">Choose from Web Dev, Backend, AI/ML, or Mobile. Each track has 60 curated daily tasks.</p>
                    </div>
                    <div class="card p-6 glass">
                        <div class="text-4xl mb-4">💻</div>
                        <h3 class="text-xl font-bold mb-2">Step 2: Build Daily</h3>
                        <p class="text-secondary">Every day, you get a focused task. Build it. Commit to GitHub. Post on LinkedIn.</p>
                    </div>
                    <div class="card p-6 glass">
                        <div class="text-4xl mb-4">🔥</div>
                        <h3 class="text-xl font-bold mb-2">Step 3: Stay Visible</h3>
                        <p class="text-secondary">Your public streak makes recruiters notice you. Consistency &gt; credentials.</p>
                    </div>
                </div>
            </section>

            <!-- 4. TRACKS SECTION -->
            <section class="section container mx-auto pl-4 py-16">
                <h2 class="text-3xl font-bold mb-8">Choose your battlefield</h2>
                <div class="tracks-container">
                    <div class="track-card" style="border-top: 4px solid #3b82f6;">
                        <div>
                            <div class="text-3xl mb-3">🌐</div>
                            <h3 class="text-xl font-bold mb-1">Full Stack Web Dev</h3>
                            <p class="text-sm text-secondary mb-4">React, Node, DB</p>
                        </div>
                        <div>
                            <p class="text-xs text-slate-400 mb-3">3,247 enrolled</p>
                            <a href="#/dashboard" class="btn-secondary w-full py-2 rounded-lg text-center font-medium block">Join Track</a>
                        </div>
                    </div>
                    <div class="track-card" style="border-top: 4px solid #10b981;">
                        <div>
                            <div class="text-3xl mb-3">⚙️</div>
                            <h3 class="text-xl font-bold mb-1">Backend Engineering</h3>
                            <p class="text-sm text-secondary mb-4">APIs, System Design</p>
                        </div>
                        <div>
                            <p class="text-xs text-slate-400 mb-3">2,891 enrolled</p>
                            <a href="#/dashboard" class="btn-secondary w-full py-2 rounded-lg text-center font-medium block">Join Track</a>
                        </div>
                    </div>
                    <div class="track-card" style="border-top: 4px solid #f97316;">
                        <div>
                            <div class="text-3xl mb-3">🧠</div>
                            <h3 class="text-xl font-bold mb-1">AI / ML</h3>
                            <p class="text-sm text-secondary mb-4">Python, Models, Data</p>
                        </div>
                        <div>
                            <p class="text-xs text-slate-400 mb-3">2,456 enrolled</p>
                            <a href="#/dashboard" class="btn-secondary w-full py-2 rounded-lg text-center font-medium block">Join Track</a>
                        </div>
                    </div>
                    <div class="track-card" style="border-top: 4px solid #d946ef;">
                        <div>
                            <div class="text-3xl mb-3">📱</div>
                            <h3 class="text-xl font-bold mb-1">Mobile Dev</h3>
                            <p class="text-sm text-secondary mb-4">React Native, Flutter</p>
                        </div>
                        <div>
                            <p class="text-xs text-slate-400 mb-3">2,253 enrolled</p>
                            <a href="#/dashboard" class="btn-secondary w-full py-2 rounded-lg text-center font-medium block">Join Track</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 5. SOCIAL PROOF SECTION -->
            <section class="section container mx-auto px-4 py-16">
                <h2 class="text-3xl font-bold text-center mb-10">Real students.<br/>Real results.</h2>
                <div class="flex flex-col gap-6">
                    <div class="card p-5 glass">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">PS</div>
                                <div>
                                    <div class="font-bold">Priya S.</div>
                                    <div class="text-xs text-secondary">VIT</div>
                                </div>
                            </div>
                            <div class="badge bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded">🔥 Day 47</div>
                        </div>
                        <p class="text-sm text-slate-300 italic">"I got 3 interview calls in week 4 just from my LinkedIn streak posts. Companies actually DM you."</p>
                    </div>
                    <div class="card p-5 glass">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">AM</div>
                                <div>
                                    <div class="font-bold">Arjun M.</div>
                                    <div class="text-xs text-secondary">DTU</div>
                                </div>
                            </div>
                            <div class="badge bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">🏆 Completed</div>
                        </div>
                        <p class="text-sm text-slate-300 italic">"Day 1 I could barely write a for loop. Day 30 I deployed my first API. This challenge changed my perspective."</p>
                    </div>
                    <div class="card p-5 glass">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">SR</div>
                                <div>
                                    <div class="font-bold">Sneha R.</div>
                                    <div class="text-xs text-secondary">BITS</div>
                                </div>
                            </div>
                            <div class="badge bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded">🔥 Day 38</div>
                        </div>
                        <p class="text-sm text-slate-300 italic">"The community keeps you going when motivation dies. Best decision of my semester."</p>
                    </div>
                </div>
            </section>

            <!-- 6. STATS SECTION -->
            <section class="section container mx-auto px-4 py-12">
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center p-4 bg-slate-800/50 rounded-xl">
                        <div class="text-3xl font-bold hero-gradient-text mb-1">10,847</div>
                        <div class="text-xs text-secondary">Students enrolled</div>
                    </div>
                    <div class="text-center p-4 bg-slate-800/50 rounded-xl">
                        <div class="text-3xl font-bold hero-gradient-text mb-1">4.3L+</div>
                        <div class="text-xs text-secondary">GitHub commits</div>
                    </div>
                    <div class="text-center p-4 bg-slate-800/50 rounded-xl">
                        <div class="text-3xl font-bold hero-gradient-text mb-1">2.1L+</div>
                        <div class="text-xs text-secondary">LinkedIn posts</div>
                    </div>
                    <div class="text-center p-4 bg-slate-800/50 rounded-xl">
                        <div class="text-3xl font-bold hero-gradient-text mb-1">1,200+</div>
                        <div class="text-xs text-secondary">Placement offers</div>
                    </div>
                </div>
            </section>

            <!-- 7. THE STAKES SECTION -->
            <section class="section container mx-auto px-4 py-16">
                <div class="gradient-border-card p-6">
                    <h2 class="text-2xl font-bold mb-6 text-center text-red-400">Why most students never get hired</h2>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-center gap-3"><span class="text-red-500">❌</span> No projects on GitHub</li>
                        <li class="flex items-center gap-3"><span class="text-red-500">❌</span> No public presence</li>
                        <li class="flex items-center gap-3"><span class="text-red-500">❌</span> Resume looks like everyone else's</li>
                        <li class="flex items-center gap-3"><span class="text-red-500">❌</span> Can't prove they can build</li>
                    </ul>
                    <div class="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-800/50">
                        <p class="font-bold text-blue-400">ABTalks fixes all four.</p>
                        <p class="text-xl font-bold mt-1">In 60 days.</p>
                    </div>
                </div>
            </section>

            <!-- 8. FAQ SECTION -->
            <section class="section container mx-auto px-4 py-16">
                <h2 class="text-3xl font-bold text-center mb-8">FAQ</h2>
                <div class="flex flex-col gap-2" id="faq-container">
                    <div class="faq-item glass px-4 rounded-lg">
                        <div class="faq-question">
                            <span>Is this free?</span>
                            <span class="faq-icon text-xl">+</span>
                        </div>
                        <div class="faq-answer">
                            Yes. Completely free. No hidden charges. No premium tier.
                        </div>
                    </div>
                    <div class="faq-item glass px-4 rounded-lg">
                        <div class="faq-question">
                            <span>I'm a complete beginner. Can I join?</span>
                            <span class="faq-icon text-xl">+</span>
                        </div>
                        <div class="faq-answer">
                            Absolutely. Each track starts from basics. You'll be surprised what you can build in 60 days.
                        </div>
                    </div>
                    <div class="faq-item glass px-4 rounded-lg">
                        <div class="faq-question">
                            <span>What if I miss a day?</span>
                            <span class="faq-icon text-xl">+</span>
                        </div>
                        <div class="faq-answer">
                            Your streak pauses, not resets. You can pick up the next day. Life happens. We get it.
                        </div>
                    </div>
                    <div class="faq-item glass px-4 rounded-lg">
                        <div class="faq-question">
                            <span>How does this help with placements?</span>
                            <span class="faq-icon text-xl">+</span>
                        </div>
                        <div class="faq-answer">
                            Recruiters search GitHub and LinkedIn. 60 days of consistent commits and posts makes you impossible to ignore.
                        </div>
                    </div>
                </div>
            </section>

            <!-- 9. FINAL CTA SECTION -->
            <section class="section container mx-auto px-4 py-20 text-center">
                <div class="inline-block bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold mb-6">
                    ⏳ Your batchmates are already on Day 23.
                </div>
                <h2 class="text-4xl font-bold mb-4">Don't start tomorrow.<br/>Start today.</h2>
                <a href="#/dashboard" class="btn-primary w-full max-w-sm py-4 rounded-xl font-bold text-lg mt-6 inline-block glow-button" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6);">
                    Join the Challenge — It's Free
                </a>
            </section>

            <!-- 10. FOOTER -->
            <footer class="border-t border-slate-800 bg-slate-950 py-10 mt-10">
                <div class="container mx-auto px-4 text-center flex flex-col items-center">
                    <div class="font-bold text-xl flex items-center mb-6">
                        <span class="hero-gradient-text text-2xl mr-1">AB</span>Talks
                    </div>
                    <div class="flex gap-6 text-sm text-secondary mb-8">
                        <a href="#" class="hover:text-white transition">About</a>
                        <a href="#" class="hover:text-white transition">Community</a>
                        <a href="#" class="hover:text-white transition">GitHub</a>
                        <a href="#" class="hover:text-white transition">Contact</a>
                    </div>
                    <p class="text-xs text-slate-500">© 2026 ABTalks. Built for Indian students, by Indian students.</p>
                </div>
            </footer>
        </div>
    `;

    // Event Listeners

    // Smooth scroll for "See how it works"
    const scrollBtn = document.getElementById('scroll-to-how');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = scrollBtn.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // FAQ Accordion logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}
