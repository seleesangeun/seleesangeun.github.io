/* ============================================
   nav.js — Sangeun Lee · Shared scripts
   ============================================ */

// ── Language ──────────────────────────────────
// Base nav strings shared by all pages.
// Each page can extend with Object.assign(T.en, {...})
const T = {
    en: {
        nav_current:  'Current',
        nav_works:    'Works',
        nav_projects: 'Projects',
        nav_research: 'Research',
        nav_archive:  'Archive',
        nav_about:    'About',
    },
    ko: {
        nav_current:  '현재 전시',
        nav_works:    '작품',
        nav_projects: '프로젝트',
        nav_research: '연구',
        nav_archive:  '아카이브',
        nav_about:    '소개',
    }
};

let lang = localStorage.getItem('lang') || 'en';

function applyLang() {
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
        const v = T[lang]?.[el.dataset.key];
        if (v !== undefined) el.innerHTML = v;
    });
    const btn = document.getElementById('langBtn');
    if (btn) btn.textContent = lang.toUpperCase();
}

// ── Theme ─────────────────────────────────────
function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
}

// ── Active nav link ───────────────────────────
// Pass the data-nav value of the current section, e.g. setActive('works')
function setActive(key) {
    document.querySelectorAll('.nav-links a[data-nav]').forEach(a => {
        a.classList.toggle('active', a.dataset.nav === key);
    });
}

// ── Mobile menu ───────────────────────────────
function closeMenu() {
    document.getElementById('menuToggle')?.classList.remove('active');
    document.getElementById('mobileMenu')?.classList.remove('open');
}

// ── Filter tabs (Research / Archive) ─────────
// Usage: onclick="filter('research','pub',this)"
function filter(section, cat, btn) {
    document.querySelectorAll(`#${section}-tabs .tab-btn`)
            .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll(`#${section}-list .list-item`).forEach(item => {
        item.classList.toggle('hidden', cat !== 'all' && item.dataset.cat !== cat);
    });
}

// ── Boot ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Theme
    applyTheme(localStorage.getItem('theme') || 'light');
    document.getElementById('themeBtn')?.addEventListener('click', () => {
        applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
    });

    // Language
    applyLang();
    document.getElementById('langBtn')?.addEventListener('click', () => {
        lang = lang === 'en' ? 'ko' : 'en';
        localStorage.setItem('lang', lang);
        applyLang();
    });

    // Mobile menu
    const toggle = document.getElementById('menuToggle');
    const menu   = document.getElementById('mobileMenu');
    toggle?.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
    });
});
