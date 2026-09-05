import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: `<div class="container">
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
  styleUrl: './home.css'
})
export class HomeComponent { }
