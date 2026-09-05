import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `<div class="container">
    <nav class="navbar">
        <div class="nav-brand">
            <h2>Finance <span>Tracker</span></h2>
        </div>
        <div class="nav-links">
            <a routerLink="/login">Login</a>
            <a routerLink="/signup" class="btn-outline">Sign Up</a>
        </div>
    </nav>

    <main>
        <section class="hero">
            <div class="background-glow"></div>
            <div class="hero-content">
                <div class="hero-text-wrapper animate-stagger">
                    <h1 class="hero-title">
                        <span class="word-wrapper">Track</span>
                        <span class="word-wrapper">Your</span>
                        <span class="word-wrapper text-gradient">Money</span>
                    </h1>
                    <p class="hero-subtitle">Dominate your finances. Track every dollar.</p>

                    <div class="hero-actions">
                        <a routerLink="/signup" class="btn-primary">
                            <span>Start Now</span>
                            <div class="btn-glow"></div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="hero-visual animate-fade-up">
                <div class="app-window-mockup">
                    <div class="window-header">
                        <div class="dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                    <div class="window-body">
                        <div class="mock-sidebar">
                            <div class="sidebar-item active">
                                <span class="icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                </span>
                                <span class="text">Dashboard</span>
                            </div>
                            <div class="sidebar-item">
                                <span class="icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="18" y1="20" x2="18" y2="10"></line>
                                        <line x1="12" y1="20" x2="12" y2="4"></line>
                                        <line x1="6" y1="20" x2="6" y2="14"></line>
                                    </svg>
                                </span>
                                <span class="text">Analytics</span>
                            </div>
                            <div class="sidebar-item">
                                <span class="icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                        <line x1="1" y1="10" x2="23" y2="10"></line>
                                    </svg>
                                </span>
                                <span class="text">Accounts</span>
                            </div>
                            <div class="sidebar-item">
                                <span class="icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path
                                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                                        </path>
                                    </svg>
                                </span>
                                <span class="text">Settings</span>
                            </div>
                        </div>
                        <div class="mock-content">
                            <div class="mock-header">
                                <div class="mock-title">Overview</div>
                            </div>
                            <div class="mock-card-grid">
                                <div class="mock-card">
                                    <div class="card-label">Total Spent</div>
                                    <div class="card-value">$2,405</div>
                                    <div class="card-trend up">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                        +12%
                                    </div>
                                </div>
                                <div class="mock-card">
                                    <div class="card-label">Monthly Income</div>
                                    <div class="card-value">$8,250</div>
                                    <div class="card-trend up">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                        +5%
                                    </div>
                                </div>
                                <div class="mock-card">
                                    <div class="card-label">Car Loan</div>
                                    <div class="card-value">$14,200</div>
                                    <div class="card-trend down">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <line x1="7" y1="7" x2="17" y2="17"></line>
                                            <polyline points="17 7 17 17 7 17"></polyline>
                                        </svg>
                                        -2%
                                    </div>
                                </div>
                            </div>
                            <div class="mock-graph-placeholder">
                                <!-- Abstract Graph lines -->
                                <div class="graph-line"></div>
                                <div class="graph-line"></div>
                            </div>
                        </div>
                    </div>
                    <div class="floating-badge">
                        <span>$12,450.00</span>
                        <small>In Savings</small>
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>`,
  styles: [`:root {
    --primary-color: #CE1141;
    --bg-dark: #050505;
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-bg: rgba(20, 20, 20, 0.6);
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
}

.container {
    min-height: 100vh;
    background-color: var(--bg-dark);
    color: var(--text-primary);
    font-family: 'Inter', system-ui, sans-serif;
    overflow-x: hidden;
    position: relative;
}

/* --- Animated Background --- */
.container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background:
        radial-gradient(circle at 15% 50%, rgba(206, 17, 65, 0.08), transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(60, 60, 255, 0.05), transparent 25%);
    z-index: 0;
    pointer-events: none;
}

/* --- Navbar --- */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 5%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(5, 5, 5, 0.8);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--glass-border);
    transition: transform 0.3s ease;
}

.nav-brand h2 {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: -0.02em;
}

.nav-brand span {
    color: var(--primary-color);
}

.nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: var(--text-primary);
}

.btn-outline {
    padding: 0.6rem 1.25rem;
    border: 1px solid var(--glass-border);
    border-radius: 99px;
    color: var(--text-primary);
    transition: all 0.3s ease;
}

.btn-outline:hover {
    border-color: var(--primary-color);
    background: rgba(206, 17, 65, 0.1);
}

/* --- Hero Section --- */
.hero {
    position: relative;
    padding: 12rem 5% 4rem;
    /* More breathing room at top */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1;
}

.hero-content {
    max-width: 900px;
    margin: 0 auto 4rem;
    /* Reduced bottom margin to bring visual closer */
}

.hero-title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(3rem, 7vw, 5rem);
    /* Toned down from 6.5rem */
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
}

/* ... title gradient ... */

.hero-subtitle {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* --- Hero Visual Mockup --- */
.hero-visual {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    perspective: 1000px;
    z-index: 10;
}

.app-window-mockup {
    /* Lighter background to pop against #050505 page bg */
    background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    /* Stronger border */
    border-radius: 16px;
    box-shadow:
        0 50px 120px -20px rgba(0, 0, 0, 1),
        /* Deeper shadow */
        0 0 0 1px rgba(255, 255, 255, 0.05) inset;
    overflow: hidden;
    position: relative;
    transform: rotateX(5deg);
    transform-style: preserve-3d;
    /* Simplified, robust floating animation */
    animation: float 8s ease-in-out infinite;
}

/* Ensure inner content is visible */
.mock-sidebar {
    width: 200px;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(30, 30, 30, 0.3);
}

.mock-content {
    flex: 1;
    padding: 2rem;
    /* Dotted pattern for technical feel */
    background:
        radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
}

.mock-row {
    height: 24px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    margin-bottom: 1rem;
}

.width-80 {
    width: 80%;
}

.width-60 {
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.sidebar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.75rem 1rem;
    color: var(--text-secondary);
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: default;
}

.sidebar-item.active {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.sidebar-item .icon {
    opacity: 0.8;
}

.mock-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.mock-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
}

.mock-user {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #CE1141, #ff4b4b);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    color: white;
}

.mock-card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.mock-card {
    background: rgba(40, 40, 40, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.card-label {
    font-size: 0.8rem;
    color: #888;
}

.card-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
}

.card-trend {
    font-size: 0.75rem;
    font-weight: 600;
}

.card-trend.up {
    color: #4ade80;
}

.card-trend.down {
    color: #ef4444;
}

.mock-graph-placeholder {
    flex: 1;
    background: rgba(20, 20, 20, 0.2);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.03);
    position: relative;
    overflow: hidden;
}

.graph-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(90deg, transparent, rgba(206, 17, 65, 0.1), transparent);
    clip-path: polygon(0 100%, 100% 100%, 100% 40%, 80% 60%, 60% 30%, 40% 70%, 20% 50%, 0 80%);
}

.graph-line:nth-child(2) {
    height: 60%;
    background: linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.05), transparent);
    clip-path: polygon(0 100%, 100% 100%, 100% 20%, 75% 50%, 50% 30%, 25% 60%, 0 40%);
}

.floating-badge {
    position: absolute;
    right: -20px;
    top: 100px;
    background: rgba(20, 20, 20, 0.9);
    border: 1px solid var(--glass-border);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transform: translateZ(20px);
}

.floating-badge span {
    color: #4ade80;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
}

.floating-badge small {
    color: var(--text-secondary);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* --- Buttons --- */
.hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

.btn-primary {
    background: var(--primary-color);
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 99px;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.2s;
    position: relative;
    overflow: hidden;
}

.btn-primary:hover {
    transform: translateY(-2px);
}

.btn-secondary {
    color: var(--text-primary);
    padding: 1rem 2.5rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s;
}

.btn-secondary:hover {
    color: var(--primary-color);
}

/* --- Features Section Redesign --- */
.features {
    padding: 6rem 5%;
    background: radial-gradient(circle at center top, #111 0%, #050505 100%);
    border-top: 1px solid var(--glass-border);
    position: relative;
    z-index: 20;
}

.features-header {
    text-align: center;
    margin-bottom: 4rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.features-header h2 {
    font-size: 3.5rem;
    font-family: 'Outfit', sans-serif;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #fff, #999);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 3rem 2rem;
    border-radius: 20px;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    overflow: hidden;
}

/* Hover Glow Effect */
.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.06), transparent 40%);
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s;
}

.feature-card:hover::before {
    opacity: 1;
}

.feature-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    display: inline-block;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.feature-card h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: white;
    position: relative;
    z-index: 1;
}

.feature-card p {
    color: #888;
    line-height: 1.7;
    font-size: 1.05rem;
    position: relative;
    z-index: 1;
}

/* --- Animations --- */
/* --- Animations --- */
.animate-fade-up {
    /* removed initial opacity: 0 to fallback to visible */
    animation: fadeUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

/* Stagger delay for text */
.animate-stagger>* {
    transform: translateY(20px);
    opacity: 0;
    animation: fadeUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-stagger :nth-child(1) {
    animation-delay: 0.1s;
}

.animate-stagger :nth-child(2) {
    animation-delay: 0.2s;
}

/* Features - Auto Play */
.features-header {
    opacity: 0;
    animation: fadeUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards 0.4s;
}

.feature-card {
    opacity: 0;
    animation: fadeUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.features-grid :nth-child(1) {
    animation-delay: 0.6s;
}

.features-grid :nth-child(2) {
    animation-delay: 0.8s;
}

.features-grid :nth-child(3) {
    animation-delay: 1.0s;
}

@keyframes fadeUp {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 3.5rem;
    }

    .mock-card-grid {
        grid-template-columns: 1fr;
    }

    .navbar {
        padding: 1rem;
    }
}`]
})
export class HomeComponent { }
