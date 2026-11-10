const themeToggle = document.getElementById('theme-toggle');

function getInitialTheme() {
    const savedTheme = localStorage.getItem('wk_theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches 
        ? 'light' 
        : 'dark';
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fa-regular fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        }
    }
    localStorage.setItem('wk_theme', theme);
}

applyTheme(getInitialTheme());

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        applyTheme(isLight ? 'dark' : 'light');
    });
}

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.innerHTML = isOpen 
            ? '<i class="fa-solid fa-xmark"></i>' 
            : '<i class="fa-solid fa-bars"></i>';
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY || window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

const backToTopBtn = document.getElementById('back-to-top');
const progressCircle = document.querySelector('.progress-ring-circle');
const circleRadius = 20;
const circumference = 2 * Math.PI * circleRadius;

if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
}

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        if (progressCircle) {
            const offset = circumference - (progress * circumference);
            progressCircle.style.strokeDashoffset = offset;
        }

        if (scrollTop > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const appDetails = {
    navixo: {
        title: 'Navixo',
        subtitle: 'Real-Time Location Sharing & Circle Safety Companion',
        logo: 'Images/Navixo_logo.webp',
        version: 'v1.0',
        size: '23.3 MB',
        android: 'Android 8.0+',
        license: 'Free / Privacy-First',
        description: 'A modern, battery-optimized location coordination app designed for families and group travel with OpenStreetMap, foreground GPS tracking, and granular incognito privacy controls.',
        screenshots: [
            'Screenshots/Navixo/NavixoSS1.webp',
            'Screenshots/Navixo/NavixoSS2.webp',
            'Screenshots/Navixo/NavixoSS3.webp'
        ],
        features: [
            'Precision live location streaming with background Android foreground services',
            'Incognito & Ghost Mode: Fuzz exact radius or pause reporting with one tap',
            'Auto-expiring session links to share with friends without permanent access',
            'Zero proprietary vendor lock-in with open-source OpenStreetMap integration'
        ],
        downloadUrl: 'APKs/Navixo.apk',
        filename: 'Navixo.apk',
        pageUrl: 'navixo.html'
    },
    motometrics: {
        title: 'MotoMetrics',
        subtitle: 'Automotive Fuel Economy & EV Trip Companion',
        logo: 'Images/MotoMetrics_logo.webp',
        version: 'v1.0',
        size: '8.8 MB',
        android: 'Android 8.0+',
        license: 'Free / Utility',
        description: 'An intuitive automotive companion app tailored for modern drivers. Calculate real-time fuel efficiency, electric vehicle kWh consumption, and total journey travel costs with precision.',
        screenshots: [
            'Screenshots/MotoMetrics/MotoMetricsSS1.webp',
            'Screenshots/MotoMetrics/MotoMetricsSS2.webp',
            'Screenshots/MotoMetrics/MotoMetricsSS3.webp'
        ],
        features: [
            'Dual fuel & EV calculator: Seamlessly compare combustion mileage with electric kWh range',
            'Trip expense projection: Accurate cost breakdowns based on customizable fuel and toll rates',
            'Local logbook: Store previous trip logs securely on your device without signing up',
            'High-contrast dashboard: Clear, distraction-free interface engineered for glanceability'
        ],
        downloadUrl: 'APKs/MotoMetrics.apk',
        filename: 'MotoMetrics.apk',
        pageUrl: 'motometrics.html'
    },
    budgetry: {
        title: 'Budgetry',
        subtitle: 'Personal Allowance & Spending Discipline Manager',
        logo: 'Images/Budgetry_logo.webp',
        version: 'v1.0',
        size: '19.6 MB',
        android: 'Android 8.0+',
        license: 'Free / Privacy-First',
        description: 'Take control of your allowance. Lock fixed bills upfront, track daily spending limits, and stay guilt-free with 100% offline security and zero third-party telemetry.',
        screenshots: [
            'Screenshots/Budgetry/BudgetrySS1.webp',
            'Screenshots/Budgetry/BudgetrySS2.webp',
            'Screenshots/Budgetry/BudgetrySS3.webp'
        ],
        features: [
            'Fixed upfront bill locking: Lock rent and essential expenses before spending',
            'Dynamic daily discretionary spend limit calculated automatically',
            'Zero tracking, zero analytics: All financial data stays strictly on-device',
            'Modern Material 3 interface built using Jetpack Compose'
        ],
        downloadUrl: 'APKs/Budgetry.apk',
        filename: 'Budgetry.apk',
        pageUrl: 'budgetry.html'
    },
    tasbih: {
        title: 'Digital Tasbih',
        subtitle: 'Distraction-free Android Dhikr & Tasbih Counter',
        logo: 'Images/Digi_Tasbih_logo.webp',
        version: 'v1.1',
        size: '16.0 MB',
        android: 'Android 8.0+',
        license: 'Free / No Ads',
        description: 'A clean, lightweight Android application designed for mindful daily Ibadat. Built with battery efficiency, offline durability, and zero distractions in mind.',
        screenshots: [
            'Screenshots/DigiTasbih/DigiTasbihSS1.webp',
            'Screenshots/DigiTasbih/DigiTasbihSS2.webp'
        ],
        features: [
            'Persistent state: Count never resets unexpectedly across restarts or app switches',
            'Tactile haptic feedback: Subtle vibration cues for counting without looking at the screen',
            'OLED Dark Mode: Optimized dark aesthetic to conserve battery during extended sessions',
            'Privacy first: 100% offline functionality with zero analytics or internet permissions required'
        ],
        downloadUrl: 'APKs/Digi%20Tasbih.apk',
        filename: 'Digital_Tasbih.apk',
        pageUrl: 'digital-tasbih.html'
    },
    transmute: {
        title: 'Transmute',
        subtitle: 'High-Speed Client-Side File Format Converter',
        logo: 'Images/Transmute.webp',
        version: 'Live Web App',
        size: 'In-Browser',
        android: 'Modern Browsers',
        license: 'Free / Client-Side',
        description: 'A fast, client-side file conversion web application that converts files directly in your browser without uploading to any remote server.',
        screenshots: [],
        features: [
            '100% Client-Side: Files never leave your browser, ensuring absolute privacy',
            'Fast processing using Web Workers and HTML5 Canvas API',
            'Drag-and-drop workflow with instant local downloads',
            'Completely free with zero ads and no registration'
        ],
        downloadUrl: '',
        filename: '',
        pageUrl: 'https://wasifahmedkhan1-web.github.io/Transmute'
    }
};

const appModal = document.getElementById('app-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function openAppModal(appKey) {
    const data = appDetails[appKey];
    if (!data || !appModal || !modalBody) return;

    let screenshotsHtml = '';
    if (data.screenshots && data.screenshots.length > 0) {
        screenshotsHtml = `
            <h4 class="modal-section-title"><i class="fa-solid fa-images"></i> Screenshots</h4>
            <div class="modal-screenshots-scroll">
                ${data.screenshots.map(ss => `
                    <img src="${ss}" alt="${data.title} screenshot" class="modal-screenshot-thumb" onclick="window.open('${ss}', '_blank')" loading="lazy">
                `).join('')}
            </div>
        `;
    }

    let actionButtons = '';
    if (data.downloadUrl) {
        actionButtons = `
            <a href="${data.downloadUrl}" download="${data.filename}" class="btn-primary">
                <i class="fa-solid fa-download"></i> Download APK (${data.version})
            </a>
            ${data.pageUrl ? `<a href="${data.pageUrl}" class="btn-secondary">Full Details</a>` : ''}
            <button type="button" class="btn-secondary" onclick="closeAppModal()">Close</button>
        `;
    } else {
        const isExternal = data.pageUrl && data.pageUrl.startsWith('http');
        const targetAttrs = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
        actionButtons = `
            <a href="${data.pageUrl}" ${targetAttrs} class="btn-primary">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Project
            </a>
            <button type="button" class="btn-secondary" onclick="closeAppModal()">Close</button>
        `;
    }

    modalBody.innerHTML = `
        <div class="modal-header-meta">
            <img src="${data.logo}" alt="${data.title} icon" class="modal-app-logo" width="56" height="56">
            <div class="modal-title">
                <h3>${data.title}</h3>
                <p>${data.subtitle}</p>
            </div>
        </div>

        <p class="description" style="margin-bottom: 16px;">${data.description}</p>

        <div class="modal-specs">
            <div class="spec-item">
                <small>Package Size</small>
                <span>${data.size}</span>
            </div>
            <div class="spec-item">
                <small>Platform</small>
                <span>${data.android}</span>
            </div>
            <div class="spec-item">
                <small>Privacy</small>
                <span>${data.license}</span>
            </div>
        </div>

        ${screenshotsHtml}

        <h4 class="modal-section-title">Key Highlights</h4>
        <ul class="modal-features">
            ${data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('')}
        </ul>

        <div class="modal-actions">
            ${actionButtons}
        </div>
    `;

    appModal.classList.add('active');
    appModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeAppModal() {
    if (!appModal) return;
    appModal.classList.remove('active');
    appModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

window.openAppModal = openAppModal;
window.closeAppModal = closeAppModal;

document.querySelectorAll('[data-app]').forEach(btn => {
    btn.addEventListener('click', () => {
        openAppModal(btn.getAttribute('data-app'));
    });
});

if (modalClose) {
    modalClose.addEventListener('click', closeAppModal);
}

if (appModal) {
    appModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            closeAppModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && appModal.classList.contains('active')) {
            closeAppModal();
        }
    });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.works-grid .work-card');

if (filterButtons.length > 0 && workCards.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            workCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter || !category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = btn.getAttribute('data-email') || 'wasifahmedkhan1@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email copied to clipboard!');
        }).catch(() => {
            showToast(`Email: ${email}`);
        });
    });
});

const typewriterEl = document.getElementById('typewriter-text');
if (typewriterEl) {
    const phrases = [
        "Native Android Developer",
        "Jetpack Compose Specialist",
        "Python Scripting & Tools",
        "Modern Web Developer"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function handleTypewriter() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 45;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(handleTypewriter, typeSpeed);
    }

    setTimeout(handleTypewriter, 600);
}

const canvas = document.getElementById('bg-canvas');
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    let mouse = { x: null, y: null, radius: 130 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.radius = Math.random() * 1.8 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy) || 1;
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    this.x -= directionX * force * 1.6;
                    this.y -= directionY * force * 1.6;
                }
            }
        }

        draw(isLight) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isLight ? 'rgba(37, 99, 235, 0.4)' : 'rgba(59, 130, 246, 0.55)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((width * height) / 19000), 65);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    initParticles();

    let animFrameId = null;

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(isLight);

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);

                if (dist < 105) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const alpha = (1 - dist / 105) * (isLight ? 0.16 : 0.22);
                    ctx.strokeStyle = isLight 
                        ? `rgba(37, 99, 235, ${alpha})` 
                        : `rgba(59, 130, 246, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        animFrameId = requestAnimationFrame(animateCanvas);
    }

    document.addEventListener('visibilitychange', () => {
        cancelAnimationFrame(animFrameId);
        if (!document.hidden) {
            animFrameId = requestAnimationFrame(animateCanvas);
        }
    });

    animateCanvas();
}

const contactForm = document.getElementById('form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    function validateField(input, errorId, validatorFn, errorText) {
        const errorElem = document.getElementById(errorId);
        const isValid = validatorFn(input.value.trim());

        if (!isValid) {
            input.classList.add('is-invalid');
            input.setAttribute('aria-invalid', 'true');
            if (errorElem) {
                errorElem.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${errorText}`;
                errorElem.classList.add('visible');
            }
            return false;
        } else {
            input.classList.remove('is-invalid');
            input.removeAttribute('aria-invalid');
            if (errorElem) {
                errorElem.textContent = '';
                errorElem.classList.remove('visible');
            }
            return true;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const fields = [
        { input: nameInput, id: 'name-error', test: val => val.length >= 2, msg: 'Please enter at least 2 characters' },
        { input: emailInput, id: 'email-error', test: val => emailRegex.test(val), msg: 'Please enter a valid email address' },
        { input: messageInput, id: 'message-error', test: val => val.length >= 10, msg: 'Message must be at least 10 characters long' }
    ];

    fields.forEach(({ input, id, test, msg }) => {
        if (!input) return;
        input.addEventListener('input', () => {
            if (input.classList.contains('is-invalid')) {
                validateField(input, id, test, msg);
            }
        });
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                validateField(input, id, test, msg);
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;
        let firstInvalid = null;

        for (const { input, id, test, msg } of fields) {
            if (input && !validateField(input, id, test, msg)) {
                isValid = false;
                if (!firstInvalid) firstInvalid = input;
            }
        }

        if (!isValid) {
            contactForm.classList.remove('shake');
            void contactForm.offsetWidth;
            contactForm.classList.add('shake');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
        const hasCustomAccessKey = accessKeyInput && 
                                   accessKeyInput.value && 
                                   accessKeyInput.value !== 'YOUR_ACCESS_KEY_HERE';

        if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
        }

        if (hasCustomAccessKey) {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    trackEvent('contact_form_submit', { method: 'web3forms' });
                    renderThankYouState(contactForm, name);
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (err) {
                showFormStatus('Could not send message automatically. Opening your email app instead...', 'info');
                trackEvent('contact_form_fallback', { method: 'mailto' });
                openMailClient(name, email, message);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                }
            }
        } else {
            showFormStatus('Opening your default email app to send message...', 'info');
            trackEvent('contact_form_submit', { method: 'mailto' });
            openMailClient(name, email, message);
            renderThankYouState(contactForm, name);
        }
    });
}

function renderThankYouState(formElement, userName) {
    const parent = formElement.parentElement;
    if (!parent) return;

    const safeName = userName ? ` ${userName}` : '';
    parent.innerHTML = `
        <div class="form-success-card" role="status" aria-live="polite">
            <div class="form-success-icon">
                <i class="fa-solid fa-check"></i>
            </div>
            <h3>Thank You${safeName}!</h3>
            <p>Your message has been dispatched successfully. I will get back to you as soon as possible.</p>
            <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap; justify-content: center;">
                <button type="button" class="btn-primary btn-small" id="btn-reset-form">
                    <i class="fa-solid fa-rotate-left"></i> Send Another
                </button>
                <a href="Resume/WK_Resume.pdf" target="_blank" download class="btn-secondary btn-small">
                    <i class="fa-solid fa-file-arrow-down"></i> Resume
                </a>
            </div>
        </div>
    `;

    const resetBtn = document.getElementById('btn-reset-form');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            window.location.reload();
        });
    }
}

function openMailClient(name, email, message) {
    const recipient = 'wasifahmedkhan1@gmail.com';
    const subject = encodeURIComponent(`Portfolio Message from ${name || 'Visitor'}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}

function showFormStatus(text, type) {
    if (!formStatus) return;
    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

const stickyMobileCta = document.getElementById('mobile-sticky-cta');
const heroSection = document.getElementById('home');
const contactSection = document.getElementById('contact');

if (stickyMobileCta && heroSection) {
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            stickyMobileCta.classList.remove('visible');
            return;
        }

        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 120;
        const scrollPos = window.scrollY || window.pageYOffset;
        
        let nearContact = false;
        if (contactSection) {
            const contactTop = contactSection.offsetTop - 200;
            const contactBottom = contactSection.offsetTop + contactSection.offsetHeight;
            if (scrollPos >= contactTop && scrollPos <= contactBottom) {
                nearContact = true;
            }
        }

        if (scrollPos > heroBottom && !nearContact) {
            stickyMobileCta.classList.add('visible');
        } else {
            stickyMobileCta.classList.remove('visible');
        }
    }, { passive: true });
}

function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
}

document.querySelectorAll('a[download], a[href$=".apk"], a[href$=".pdf"]').forEach(link => {
    link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        const isApk = href.toLowerCase().endsWith('.apk');
        const isPdf = href.toLowerCase().endsWith('.pdf');
        
        if (isApk) {
            trackEvent('apk_download', { file: href.split('/').pop() });
        } else if (isPdf) {
            trackEvent('resume_download', { file: href.split('/').pop() });
        }
    });
});

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
} else {
    revealElements.forEach((el) => el.classList.add('active'));
}
