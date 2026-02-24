// Custom Cursor Logic
function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const hoverElements = document.querySelectorAll('.cursor-hover, a, button, input, textarea');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.transform = `translate(-50%, -50%)`;
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.backgroundColor = '#FBFF48';
            cursor.style.mixBlendMode = 'normal';
            cursor.style.border = '2px solid black';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '24px';
            cursor.style.height = '24px';
            cursor.style.backgroundColor = '#fff';
            cursor.style.mixBlendMode = 'difference';
            cursor.style.border = 'none';
        });
    });
}

// Scroll Reveal Logic
function initReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// Scroll Progress Bar
function initProgressBar() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;

    window.onscroll = function () {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + "%";
    };
}

// GitHub API Integration
async function fetchGitHubStats() {
    try {
        const response = await fetch('https://api.github.com/users/babaygo', {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        const setEl = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        setEl('repos-count', data.public_repos || '0');
        setEl('followers-count', data.followers || '0');

        if (data.created_at) {
            const date = new Date(data.created_at);
            setEl('created-at', date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' }));
        }

        const contribValue = `${(data.public_repos * 20) + (data.followers * 5)}+`;
        setEl('total-contributions', contribValue);
        setEl('total-contributions-grid', contribValue);

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        const setErr = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };
        setErr('repos-count', 'ERR');
        setErr('followers-count', 'ERR');
        setErr('created-at', 'N/A');
        setErr('total-contributions', 'API Error');
    }
}

// Contact Form with Web3Forms
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Inject API key from config.js
    const keyField = document.getElementById('web3forms-key');
    if (keyField && typeof CONFIG !== 'undefined' && CONFIG.WEB3FORMS_KEY) {
        keyField.value = CONFIG.WEB3FORMS_KEY;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'ENVOI EN COURS...';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                form.innerHTML = `
                    <div class="py-20 text-center form-success">
                        <i class="ri-checkbox-circle-fill text-6xl text-neo-green mb-4 block"></i>
                        <h3 class="text-2xl font-black uppercase">Transmission Reçue</h3>
                        <p class="font-mono text-sm mt-2">Message envoyé avec succès ! Je vous recontacte bientôt.</p>
                    </div>`;
            } else {
                throw new Error(data.message || 'Erreur lors de l\'envoi');
            }
        } catch (error) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showToast('Erreur: ' + error.message, 'error');
        }
    });
}

// Toast notification
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast font-mono text-sm px-6 py-4 border-4 border-black shadow-hard ${type === 'error' ? 'bg-neo-red text-white' : 'bg-neo-green text-black'
        }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// Init all
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initReveal();
    initProgressBar();
    initContactForm();

    if (document.getElementById('repos-count')) {
        fetchGitHubStats();
    }
});
