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

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
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
        description: 'A modern, battery-optimized location coordination app designed for families and group travel with OpenStreetMap, foreground GPS tracking, and incognito privacy controls.',
        features: [
            'Precision live location streaming with background Android foreground services',
            'Incognito & Ghost Mode: Fuzz exact radius or pause reporting with one tap',
            'Auto-expiring session links to share with friends without permanent access',
            'Zero proprietary vendor lock-in with open-source OpenStreetMap integration'
        ],
        downloadUrl: 'APKs/Navixo.apk',
        filename: 'Navixo.apk'
    },
    tasbih: {
        title: 'Digital Tasbih',
        subtitle: 'Distraction-free Android Dhikr & Tasbih Counter',
        logo: 'Images/Digi_Tasbih_logo.webp',
        version: 'v1.1',
        size: '15.3 MB',
        android: 'Android 8.0+',
        license: 'Free / No Ads',
        description: 'A clean, lightweight Android application designed for mindful daily Ibadat. Built with battery efficiency, offline durability, and zero distractions in mind.',
        features: [
            'Persistent state: Count never resets unexpectedly across restarts or app switches',
            'Tactile haptic feedback: Subtle vibration cues for counting without looking at the screen',
            'OLED Dark Mode: Optimized dark aesthetic to conserve battery during extended sessions',
            'Privacy first: 100% offline functionality with zero analytics or internet permissions required'
        ],
        downloadUrl: 'APKs/Digi%20Tasbih.apk',
        filename: 'Digital_Tasbih.apk'
    },
    motometrics: {
        title: 'MotoMetrics',
        subtitle: 'Automotive Fuel Economy & EV Trip Companion',
        logo: 'Images/MotoMetrics_logo.webp',
        version: 'v1.0',
        size: '8.4 MB',
        android: 'Android 8.0+',
        license: 'Free / Utility',
        description: 'An intuitive automotive companion app tailored for modern drivers. Calculate real-time fuel efficiency, electric vehicle kWh consumption, and total journey travel costs with precision.',
        features: [
            'Dual fuel & EV calculator: Seamlessly compare combustion mileage with electric kWh range',
            'Trip expense projection: Accurate cost breakdowns based on customizable fuel and toll rates',
            'Local logbook: Store previous trip logs securely on your device without signing up',
            'High-contrast dashboard: Clear, distraction-free interface engineered for glanceability'
        ],
        downloadUrl: 'APKs/MotoMetrics.apk',
        filename: 'MotoMetrics.apk'
    }
};

const appModal = document.getElementById('app-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

function openAppModal(appKey) {
    const data = appDetails[appKey];
    if (!data || !appModal || !modalBody) return;

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
                <small>Requirement</small>
                <span>${data.android}</span>
            </div>
            <div class="spec-item">
                <small>License</small>
                <span>${data.license}</span>
            </div>
        </div>

        <h4 class="modal-section-title">Key Highlights</h4>
        <ul class="modal-features">
            ${data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('')}
        </ul>

        <div class="modal-actions">
            <a href="${data.downloadUrl}" download="${data.filename}" class="btn-primary">
                <i class="fa-solid fa-download"></i> Download APK (${data.version})
            </a>
            <button type="button" class="btn-secondary" onclick="closeAppModal()">Close</button>
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
const projectCards = document.querySelectorAll('.works-grid .work-card[data-category]');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

const contactForm = document.getElementById('form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

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
                    showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (err) {
                showFormStatus('Could not send message automatically. Opening your email app instead...', 'info');
                openMailClient(name, email, message);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                }
            }
        } else {
            showFormStatus('Opening your default email app to send message...', 'info');
            openMailClient(name, email, message);
            contactForm.reset();
        }
    });
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
