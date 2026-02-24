/**
 * Shared UI components — élimine la duplication HTML entre les pages.
 * 
 * Usage dans chaque page :
 *   <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
 *   <script src="js/components.js"></script>
 *   Puis les éléments avec data-component="navbar" etc. sont auto-remplis.
 */

// ─── TAILWIND THEME (injected synchronously in <head> for v4 Play CDN) ───
(function () {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/tailwindcss');
    style.textContent = `
        @theme {
            --color-neo-yellow: #FBFF48;
            --color-neo-pink: #FF70A6;
            --color-neo-blue: #3B82F6;
            --color-neo-green: #33FF57;
            --color-neo-purple: #A855F7;
            --color-neo-orange: #FF9F1C;
            --color-neo-red: #FF2A2A;
            --color-neo-white: #FFFDF5;
            --color-neo-black: #121212;
            --font-display: "Space Grotesk", sans-serif;
            --font-mono: "JetBrains Mono", monospace;
            --shadow-hard: 4px 4px 0px 0px #000;
            --shadow-hard-sm: 2px 2px 0px 0px #000;
            --shadow-hard-lg: 8px 8px 0px 0px #000;
            --shadow-hard-xl: 12px 12px 0px 0px #000;
        }
    `;
    document.head.appendChild(style);
})();

const Components = (() => {

    // Detect if we're in a subfolder (projects/)
    function getBase() {
        return location.pathname.includes('/projects/') ? '..' : '.';
    }

    const base = getBase();

    // ─── COMMON <head> TAGS ───
    function injectHead() {
        const tags = [
            '<meta name="theme-color" content="#121212">',
            `<link rel="icon" type="image/svg+xml" href="${base}/assets/favicon.svg">`,
            '<link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">',
            '<link rel="preconnect" href="https://fonts.googleapis.com">',
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
            '<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">',
            `<link rel="stylesheet" href="${base}/css/style.css">`,
            `<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>`,
            '<script defer src="/_vercel/insights/script.js"><\/script>',
        ];
        tags.forEach(tag => {
            // avoid duplicates
            const tmp = document.createElement('div');
            tmp.innerHTML = tag;
            const el = tmp.firstElementChild;
            const href = el.getAttribute('href') || el.getAttribute('content');
            if (href && document.head.querySelector(`[href="${href}"],[content="${href}"]`)) return;
            document.head.appendChild(el);
        });
    }

    // ─── CURSOR + PROGRESS BAR ───
    function renderCursor(progressColor = 'neo-green') {
        return `<div id="cursor" class="w-6 h-6 bg-white rounded-full border-2 border-black hidden lg:block"></div>
<div class="fixed top-0 left-0 h-2 bg-${progressColor} z-[60] border-b-2 border-black" id="progressBar" style="width: 0%"></div>`;
    }

    // ─── NAVBAR ───
    function renderNavbar(isSubpage = false) {
        const prefix = isSubpage ? '../index.html' : '';
        const home = isSubpage ? '../index.html' : '#';
        const anchor = (hash) => isSubpage ? `../index.html${hash}` : hash;

        return `<nav class="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none">
    <div class="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        <a href="${home}"
            class="bg-neo-white border-2 border-black px-4 py-1 text-2xl font-black shadow-hard hover:bg-neo-yellow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-hover">
            SIMON.exe
        </a>
        <div class="hidden md:flex gap-4 bg-white border-2 border-black p-2 shadow-hard">
            <a href="${anchor('#about')}" class="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover">/ABOUT</a>
            <a href="${anchor('#skills')}" class="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover">/SKILLS</a>
            <a href="${anchor('#experience')}" class="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover">/EXP</a>
            <a href="${anchor('#education')}" class="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover">/EDU</a>
            <a href="${anchor('#projects')}" class="px-3 py-1 font-mono font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-hover">/WORK</a>
            <a href="${anchor('#contact')}" class="px-3 py-1 font-mono font-bold text-sm bg-neo-yellow border border-black hover:bg-neo-pink transition-colors cursor-hover">CONTACT</a>
        </div>
    </div>
</nav>`;
    }

    // ─── BACK BUTTON (project pages) ───
    function renderBackButton() {
        return `<div class="fixed bottom-6 left-6 z-50">
    <a href="../index.html#projects"
        class="back-btn bg-neo-black text-white border-2 border-black px-4 py-3 font-mono font-bold text-sm shadow-hard hover:bg-neo-orange hover:text-black hover:shadow-none transition-all cursor-hover flex items-center gap-2">
        <i class="ri-arrow-left-line"></i> RETOUR
    </a>
</div>`;
    }

    // ─── FOOTER (full — index page) ───
    function renderFooterFull() {
        return `<footer class="bg-black text-white py-16 px-4 border-t-8 border-neo-green font-mono relative overflow-hidden">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div class="col-span-1 md:col-span-2">
            <h2 class="text-4xl font-black mb-6">SIMON.</h2>
            <p class="text-gray-400 max-w-sm">Concevoir pour le futur avec l'esthétique brute du passé. Pas de cookies, pas de trackers, juste du code.</p>
        </div>
        <div>
            <h3 class="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SITEMAP</h3>
            <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">Accueil</a></li>
                <li><a href="#about" class="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">À propos</a></li>
                <li><a href="#experience" class="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">Expériences</a></li>
                <li><a href="#education" class="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">Formations</a></li>
                <li><a href="#projects" class="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">Projets</a></li>
                <li><a href="#contact" class="hover:text-white hover:underline decoration-neo-pink decoration-2 cursor-hover">Contact</a></li>
            </ul>
        </div>
        <div>
            <h3 class="font-bold text-neo-green mb-4 border-b border-gray-700 pb-2">SOCIALS</h3>
            <div class="flex gap-4">
                <a href="https://github.com/babaygo" class="text-2xl hover:text-neo-yellow transition-colors cursor-hover"><i class="ri-github-fill"></i></a>
                <a href="mailto:slaurent144600@gmail.com" class="text-2xl hover:text-neo-blue transition-colors cursor-hover"><i class="ri-mail-fill"></i></a>
            </div>
        </div>
    </div>
    <div class="text-center mt-16 pt-8 border-t border-gray-800 text-gray-500 text-sm">
        <p>&copy; 2025 SIMON.exe // SYSTEM_END</p>
    </div>
</footer>`;
    }

    // ─── FOOTER (compact — project pages) ───
    function renderFooterCompact() {
        return `<footer class="bg-black text-white py-8 px-4 border-t-4 border-neo-green font-mono">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-sm">&copy; 2025 SIMON.exe // SYSTEM_END</p>
        <div class="flex gap-4">
            <a href="https://github.com/babaygo" class="text-xl hover:text-neo-yellow transition-colors cursor-hover"><i class="ri-github-fill"></i></a>
            <a href="mailto:slaurent144600@gmail.com" class="text-xl hover:text-neo-blue transition-colors cursor-hover"><i class="ri-mail-fill"></i></a>
        </div>
    </div>
</footer>`;
    }

    // ─── AUTO-INIT: fill data-component placeholders ───
    function init() {
        const isSubpage = location.pathname.includes('/projects/');

        // Inject head resources
        injectHead();

        // Fill placeholders
        document.querySelectorAll('[data-component]').forEach(el => {
            const name = el.dataset.component;
            const color = el.dataset.progressColor || 'neo-green';
            switch (name) {
                case 'cursor':
                    el.outerHTML = renderCursor(color);
                    break;
                case 'navbar':
                    el.outerHTML = renderNavbar(isSubpage);
                    break;
                case 'back-button':
                    el.outerHTML = renderBackButton();
                    break;
                case 'footer-full':
                    el.outerHTML = renderFooterFull();
                    break;
                case 'footer-compact':
                    el.outerHTML = renderFooterCompact();
                    break;
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { renderNavbar, renderFooterFull, renderFooterCompact, renderCursor, renderBackButton };
})();
