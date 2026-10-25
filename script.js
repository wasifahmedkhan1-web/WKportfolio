// =========================================
// THEME MANAGER (Dark / Light Mode with Storage)
// =========================================
const themeToggle = document.getElementById('theme-toggle');

// Determine initial theme: stored preference -> system preference -> default to dark
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

// Initialize theme on load
const currentTheme = getInitialTheme();
applyTheme(currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        applyTheme(isLight ? 'dark' : 'light');
    });
}

// =========================================
// ACTIVE NAVIGATION HIGHLIGHT (SCROLL SPY)
// =========================================
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

// =========================================
// CONTACT FORM HANDLER
// =========================================
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

        // Check for Web3Forms access key
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

// =========================================
// SCROLL REVEAL ANIMATIONS
// =========================================
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target); // Unobserve once animated for better performance
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
} else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('active'));
}
