// Dark Mode Initialization & Controller
let isDarkMode = localStorage.getItem('theme') === 'dark';

if (isDarkMode) {
    document.documentElement.classList.add('dark');
}

document.addEventListener('DOMContentLoaded', () => {
    updateThemeIcon(isDarkMode);

    // Mobile Menu Controller
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // Initialize Typewriter Effect
    setTimeout(typeEffect, 500);

    // Initialize Orbital Skills Diagram
    initSkillsAnimation();

    // Initialize Experience Timeline Animation
    initExperienceAnimation();

    // Initialize Journey Timeline Animation
    initJourneyAnimation();

    // Initialize Project Cards Animation
    initProjectsAnimation();

    // Initialize Paper Page Transition System
    initPaperTransitions();

    // Initialize Social Media Escape Micro-Animations
    initSocialMicroAnimations();
});

// Typewriter Animation Logic
const words = [
    "Python Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Data Analyst"
];

let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typewriterTimeout = null;

function typeEffect() {
    const typedTextSpan = document.getElementById("typed-text") || document.getElementById("typewriterText");
    if (!typedTextSpan) return;

    const currentWord = words[wordIdx];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typedTextSpan.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 1800; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 400; // Pause before next word
    }

    clearTimeout(typewriterTimeout);
    typewriterTimeout = setTimeout(typeEffect, typeSpeed);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(true);
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(false);
    }
}

function updateThemeIcon(dark) {
    const icon = document.getElementById('themeIcon');
    const btn = document.getElementById('themeToggle');
    if (!icon) return;

    if (btn) {
        btn.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease';
        btn.style.transform = 'scale(1.2) rotate(180deg)';
        setTimeout(() => {
            btn.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }

    if (dark) {
        // Sun Icon for Dark Mode (indicating switch to light)
        icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></line>`;
    } else {
        // Moon Icon for Light Mode (indicating switch to dark)
        icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    }
}

// Resume Modal Controllers
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll
    }
}

// Close Modal when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeResumeModal();
    }
});

// Interactive Orbital Skills Diagram Controller
function initSkillsAnimation() {
    const container = document.querySelector('.skills-container');
    if (!container) return;

    const pills = container.querySelectorAll('.skill-pill');

    // 1. Entrance / Coming Animation via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                container.classList.add('loaded');
                pills.forEach((pill, idx) => {
                    pill.style.transitionDelay = `${0.06 + idx * 0.045}s`;
                });
                setTimeout(() => {
                    pills.forEach((pill) => {
                        pill.style.transitionDelay = '0s';
                    });
                }, 1100);
                observer.unobserve(container);
            }
        });
    }, { threshold: 0.15 });

    observer.observe(container);

    // 2. Mouse Repel & Auto-Return Physics
    const repelRadius = 135;
    const maxRepelDist = 48;

    container.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        pills.forEach((pill) => {
            const rect = pill.getBoundingClientRect();
            const pillCenterX = rect.left + rect.width / 2;
            const pillCenterY = rect.top + rect.height / 2;

            const dx = pillCenterX - mouseX;
            const dy = pillCenterY - mouseY;
            const distance = Math.hypot(dx, dy);

            if (distance < repelRadius && distance > 0) {
                const force = Math.pow(1 - distance / repelRadius, 1.15);
                const moveX = (dx / distance) * force * maxRepelDist;
                const moveY = (dy / distance) * force * maxRepelDist;

                pill.classList.add('repelled');
                pill.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;

                // Auto return timer: returns to original position after mouse pauses
                clearTimeout(pill._returnTimer);
                pill._returnTimer = setTimeout(() => {
                    pill.style.transform = 'translate(0px, 0px) scale(1)';
                    pill.classList.remove('repelled');
                }, 700);
            } else if (pill.classList.contains('repelled')) {
                pill.style.transform = 'translate(0px, 0px) scale(1)';
                pill.classList.remove('repelled');
            }
        });
    });

    // Reset when mouse leaves container
    container.addEventListener('mouseleave', () => {
        pills.forEach((pill) => {
            clearTimeout(pill._returnTimer);
            pill.style.transform = 'translate(0px, 0px) scale(1)';
            pill.classList.remove('repelled');
        });
    });
}

// Contact Form Handler for contact.html
async function handleContactSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const alertBox = document.getElementById('formStatusAlert');
    const nameInput = document.getElementById('senderName');
    const emailInput = document.getElementById('senderEmail');
    const subjectInput = document.getElementById('messageSubject');
    const messageInput = document.getElementById('messageText');

    if (!btn || !alertBox || !nameInput || !emailInput || !messageInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput ? subjectInput.value.trim() : 'Data Science / Portfolio Contact Inquiry';
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
        alertBox.className = 'form-status-alert active error';
        alertBox.style.display = 'block';
        alertBox.innerHTML = '<span>⚠️ Please fill in all required fields.</span>';
        return;
    }

    // Button sending state
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';
    alertBox.className = 'form-status-alert active';
    alertBox.style.display = 'block';
    alertBox.innerHTML = '<span>⏳ Delivering message to Sachin\'s email...</span>';

    try {
        const response = await fetch('https://formsubmit.co/ajax/kumarsachin8207548606@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                _subject: subject || `New Portfolio Contact Message from ${name}`,
                message: message,
                _template: 'table'
            })
        });

        const data = await response.json();

        if (response.ok || data.success === 'true' || data.success === true) {
            alertBox.className = 'form-status-alert active success';
            alertBox.innerHTML = `<span>✓ Thank you, <strong>${name}</strong>! Your message has been sent directly to Sachin's inbox.</span>`;
            
            const form = document.getElementById('contactForm');
            if (form) form.reset();
        } else {
            throw new Error(data.message || 'Failed to send message.');
        }
    } catch (err) {
        console.error('Email submission error:', err);
        alertBox.className = 'form-status-alert active error';
        alertBox.innerHTML = `<span>❌ Delivery failed. You can email directly at <a href="mailto:kumarsachin8207548606@gmail.com" style="color: inherit; text-decoration: underline;">kumarsachin8207548606@gmail.com</a>.</span>`;
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<span>Send Message</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>`;
    }
}


/* ==========================================================================
   PREMIUM PAPER PAGE TRANSITION & 3D STACK SYSTEM
   ========================================================================== */

let isTransitioning = false;

function initPaperTransitions() {
    // 1. Ensure Paper Transition Overlay exists in the DOM
    let overlay = document.getElementById('paperTransitionOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'paperTransitionOverlay';
        overlay.className = 'paper-transition-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = `
            <div class="paper-panel" id="paperPanel">
                <div class="paper-panel-content">
                    <span class="paper-panel-label" id="paperTransitionLabel"></span>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // 2. Global Link Click Listener for smooth page transitions
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Skip external links, hashes, mailto, javascript, or target="_blank"
        if (
            href.startsWith('http://') ||
            href.startsWith('https://') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('#') ||
            href.startsWith('javascript:') ||
            link.getAttribute('target') === '_blank' ||
            link.hasAttribute('download') ||
            link.classList.contains('btn-download-pdf')
        ) {
            return;
        }

        // Check if it's an internal .html or root route
        const cleanHref = href.split('#')[0].split('?')[0];
        if (!cleanHref.endsWith('.html') && cleanHref !== '/' && cleanHref !== '') {
            return;
        }

        const currentPath = getCurrentPageName();
        const targetPath = getTargetPageName(cleanHref);

        // Check if clicking SK Logo to go Home
        const isSKLogo = link.classList.contains('logo-circle') || link.closest('.logo-wrapper');

        if (isSKLogo) {
            e.preventDefault();
            if (currentPath === 'index.html' || currentPath === 'home.html' || currentPath === '') {
                // Already on Home: smooth scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            if (isTransitioning) return;
            executeSKFallingPaperTransition('home.html');
            return;
        }

        // If clicking link to currently active page
        if (currentPath === targetPath) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const navMenu = document.getElementById('navMenu');
            if (navMenu) navMenu.classList.remove('open');
            return;
        }

        // Standard Page Link Transition (Smooth Paper Slide Left -> Right)
        e.preventDefault();
        if (isTransitioning) return;

        const destinationLabel = getDestinationLabel(targetPath, link.textContent);
        executePaperSlideTransition(cleanHref, destinationLabel);
    });

    // 3. Handle Browser Back & Forward Buttons (popstate)
    window.addEventListener('popstate', (e) => {
        const targetPage = getCurrentPageName();
        const destinationLabel = getDestinationLabel(targetPage, '');
        executePaperSlideTransition(targetPage, destinationLabel, false);
    });
}

const PAGE_ORDER = [
    'home.html',
    'about.html',
    'projects.html',
    'journey.html',
    'experience.html',
    'contact.html'
];

function getPageIndex(pageName) {
    const clean = (pageName || '').toLowerCase();
    if (clean.includes('index') || clean.includes('home') || clean === '' || clean === '/') return 0;
    if (clean.includes('about')) return 1;
    if (clean.includes('project')) return 2;
    if (clean.includes('journey')) return 3;
    if (clean.includes('experience') || clean.includes('article')) return 4;
    if (clean.includes('contact')) return 5;
    return 0;
}

function getCurrentPageName() {
    const path = window.location.pathname.split('/').pop();
    return (path === '' || path === '/' || !path) ? 'home.html' : path;
}

function getTargetPageName(href) {
    const path = href.split('/').pop();
    return (path === '' || path === '/' || !path) ? 'home.html' : path;
}

function getDestinationLabel(pageName, linkText) {
    const clean = (pageName || '').toLowerCase();
    if (clean.includes('index') || clean.includes('home') || clean === '') return 'HOME';
    if (clean.includes('about')) return 'ABOUT';
    if (clean.includes('project')) return 'PROJECTS';
    if (clean.includes('journey')) return 'JOURNEY';
    if (clean.includes('experience') || clean.includes('article')) return 'EXPERIENCE';
    if (clean.includes('contact')) return 'CONTACT';
    if (clean.includes('resume')) return 'RESUME';

    const trimmed = (linkText || '').trim().toUpperCase();
    if (trimmed && trimmed.length < 20) return trimmed;
    return clean.replace('.html', '').toUpperCase();
}

/**
 * Directional Page Transition:
 * If navigating to a page on the right (e.g. Home -> Experience):
 *   Sheet enters from the RIGHT (+100%) and exits to the LEFT (-100%).
 * If navigating to a page on the left (e.g. Experience -> Home):
 *   Sheet enters from the LEFT (-100%) and exits to the RIGHT (+100%).
 */
async function executePaperSlideTransition(targetUrl, destinationLabel, pushToHistory = true) {
    isTransitioning = true;

    const overlay = document.getElementById('paperTransitionOverlay');
    const panel = document.getElementById('paperPanel');
    const label = document.getElementById('paperTransitionLabel');
    const navMenu = document.getElementById('navMenu');

    // Close mobile nav menu if open
    if (navMenu) navMenu.classList.remove('open');

    // Determine navigation direction based on navbar page order
    const currentPath = getCurrentPageName();
    const targetPath = getTargetPageName(targetUrl);
    const currentIdx = getPageIndex(currentPath);
    const targetIdx = getPageIndex(targetPath);

    // True if moving to a page to the right in the menu, false if moving left
    const isMovingRight = targetIdx >= currentIdx;

    // Start position & Exit position:
    // Moving to a page on the RIGHT: slides LEFT -> RIGHT (-100% to 0 to +100%)
    // Moving to a page on the LEFT: slides RIGHT -> LEFT (+100% to 0 to -100%)
    const startTranslate = isMovingRight ? 'translate3d(-100%, 0, 0)' : 'translate3d(100%, 0, 0)';
    const exitTranslate = isMovingRight ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)';
    const shadowDirection = isMovingRight ? '25px 0 70px rgba(0, 0, 0, 0.5)' : '-25px 0 70px rgba(0, 0, 0, 0.5)';

    // Update destination typography
    if (label) label.textContent = destinationLabel;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pre-fetch target HTML
    let targetHtml = null;
    try {
        const response = await fetch(targetUrl);
        if (response.ok) {
            targetHtml = await response.text();
        } else {
            // Fallback to normal navigation if fetch fails
            window.location.href = targetUrl;
            return;
        }
    } catch (err) {
        window.location.href = targetUrl;
        return;
    }

    if (prefersReducedMotion) {
        // Instant/minimal fade for users with reduced motion preference
        applyNewPageContent(targetHtml, targetUrl, pushToHistory);
        isTransitioning = false;
        return;
    }

    // Set initial position based on direction
    overlay.classList.add('active');
    panel.style.boxShadow = shadowDirection;
    panel.style.transition = 'none';
    panel.style.transform = startTranslate;
    panel.classList.remove('show-text', 'hide-text');
    panel.offsetHeight; // Force DOM reflow

    // Phase 1: Slide In covering the screen (460ms)
    panel.style.transition = 'transform 0.46s cubic-bezier(0.65, 0, 0.35, 1)';
    panel.style.transform = 'translate3d(0, 0, 0)';
    panel.classList.add('show-text');

    setTimeout(() => {
        // Phase 2: Swap content under the paper panel
        applyNewPageContent(targetHtml, targetUrl, pushToHistory);

        // Phase 3: Slide Out in the direction of travel revealing the new page (460ms)
        panel.classList.remove('show-text');
        panel.classList.add('hide-text');
        panel.style.transition = 'transform 0.46s cubic-bezier(0.65, 0, 0.35, 1)';
        panel.style.transform = exitTranslate;

        setTimeout(() => {
            // Reset overlay state
            overlay.classList.remove('active');
            panel.style.transition = 'none';
            panel.style.transform = 'translate3d(-100%, 0, 0)';
            panel.classList.remove('hide-text');
            isTransitioning = false;
        }, 470);
    }, 470);
}

/**
 * SK / Center Logo Home Transition:
 * The current page acts as a physical sheet of paper, rotating in 3D perspective
 * and falling downward/away towards the bottom of the screen, while the Home page
 * underneath settles smoothly into place.
 */
async function executeSKFallingPaperTransition(targetUrl) {
    isTransitioning = true;

    const navMenu = document.getElementById('navMenu');
    if (navMenu) navMenu.classList.remove('open');

    // Pre-fetch Home page HTML
    let homeHtml = null;
    try {
        const response = await fetch(targetUrl);
        if (response.ok) {
            homeHtml = await response.text();
        } else {
            window.location.href = targetUrl;
            return;
        }
    } catch (err) {
        window.location.href = targetUrl;
        return;
    }

    const currentContainer = document.querySelector('.page-container');
    if (!currentContainer) {
        window.location.href = targetUrl;
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        applyNewPageContent(homeHtml, targetUrl, true);
        isTransitioning = false;
        return;
    }

    // Parse incoming Home page
    const parser = new DOMParser();
    const doc = parser.parseFromString(homeHtml, 'text/html');
    const newContainer = doc.querySelector('.page-container');
    if (!newContainer) {
        window.location.href = targetUrl;
        return;
    }

    // Create 3D Stage Wrapper around the main content
    const stage = document.createElement('div');
    stage.className = 'paper-stage-3d';

    // Clone current page container for falling animation
    const currentLayer = currentContainer.cloneNode(true);
    currentLayer.classList.add('paper-page-current', 'falling');

    // Prepare incoming Home page container
    const incomingLayer = newContainer.cloneNode(true);
    incomingLayer.classList.add('paper-page-incoming');

    // Insert layers into 3D stage
    stage.appendChild(incomingLayer);
    stage.appendChild(currentLayer);

    // Replace current container in DOM with the 3D stage
    currentContainer.parentNode.replaceChild(stage, currentContainer);

    // Animate and complete transition
    setTimeout(() => {
        // Clean up: Unwrap stage and leave only the new page container
        const finalContainer = incomingLayer.cloneNode(true);
        finalContainer.classList.remove('paper-page-incoming');

        if (stage.parentNode) {
            stage.parentNode.replaceChild(finalContainer, stage);
        }

        // Update Document Title
        const newTitle = doc.querySelector('title');
        if (newTitle) document.title = newTitle.textContent;

        // Update Nav Active States
        updateActiveNavLinks('home.html');

        // Update URL & Scroll
        history.pushState({ page: 'home.html' }, '', 'home.html');
        window.scrollTo(0, 0);

        // Re-run Home page initializers
        wordIdx = 0;
        charIdx = 0;
        isDeleting = false;
        clearTimeout(typewriterTimeout);
        setTimeout(typeEffect, 300);

        isTransitioning = false;
    }, 1040);
}

/**
 * Injects new page HTML, updates active nav link, title, history, and triggers page scripts.
 */
function applyNewPageContent(htmlText, targetUrl, pushToHistory = true) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const newContainer = doc.querySelector('.page-container');
    const currentContainer = document.querySelector('.page-container');

    if (newContainer && currentContainer) {
        currentContainer.parentNode.replaceChild(newContainer, currentContainer);
    }

    // Update Title
    const newTitle = doc.querySelector('title');
    if (newTitle) {
        document.title = newTitle.textContent;
    }

    // Update Active Nav Link
    const pageName = getTargetPageName(targetUrl);
    updateActiveNavLinks(pageName);

    // Update Browser History
    if (pushToHistory) {
        history.pushState({ page: targetUrl }, '', targetUrl);
    }

    // Scroll to Top
    window.scrollTo(0, 0);

    // Re-initialize page-specific features
    if (pageName.includes('home') || pageName.includes('index') || pageName === '' || pageName === '/') {
        wordIdx = 0;
        charIdx = 0;
        isDeleting = false;
        clearTimeout(typewriterTimeout);
        setTimeout(typeEffect, 300);
    } else if (pageName.includes('about')) {
        initSkillsAnimation();
        initJourneyAnimation();
    } else if (pageName.includes('experience')) {
        initExperienceAnimation();
    } else if (pageName.includes('journey')) {
        initJourneyAnimation();
    } else if (pageName.includes('project')) {
        initProjectsAnimation();
    }
}

/**
 * Initializes staggered reveal animation on Experience page timeline items
 */
function initExperienceAnimation() {
    const expItems = document.querySelectorAll('.exp-item');
    if (!expItems.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        expItems.forEach(el => el.classList.add('visible'));
        return;
    }

    const expObs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 140);
                expObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.05 });

    expItems.forEach((el) => {
        el.classList.remove('visible');
        expObs.observe(el);
    });
}

/**
 * Initializes staggered reveal animation on Journey page timeline items
 */
function initJourneyAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        timelineItems.forEach(el => el.classList.add('visible'));
        return;
    }

    // Safety fallback so items always display even if IntersectionObserver is delayed
    setTimeout(() => {
        timelineItems.forEach(el => el.classList.add('visible'));
    }, 450);

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 120);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.05 });

    timelineItems.forEach((el) => {
        obs.observe(el);
    });
}

/**
 * Initializes staggered reveal and interactive category filtering on Project cards
 */
function initProjectsAnimation() {
    const cards = document.querySelectorAll('.projects-grid .project-card, .projects-grid .featured-card, .projects-grid .normal-card');
    const filterTabs = document.querySelectorAll('.filter-tab');

    // 1. Interactive Category Filtering
    if (filterTabs.length) {
        filterTabs.forEach((tab) => {
            // Remove previous listener clone to avoid duplicate listeners on re-init
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);

            newTab.addEventListener('click', () => {
                const allTabs = document.querySelectorAll('.filter-tab');
                allTabs.forEach(t => t.classList.remove('active'));
                newTab.classList.add('active');

                const filter = newTab.getAttribute('data-filter') || 'all';

                cards.forEach((card, index) => {
                    const cardCategory = card.getAttribute('data-category');
                    const matches = (filter === 'all' || cardCategory === filter);

                    if (matches) {
                        card.style.display = 'flex';
                        card.style.animation = 'none';
                        void card.offsetHeight; // trigger reflow
                        card.style.animation = `cardAppear 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.04}s forwards`;
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    if (!cards.length) return;

    // 2. Staggered Scroll / Entrance Animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        cards.forEach(el => el.classList.add('visible'));
        return;
    }

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 80);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.05 });

    cards.forEach((el) => {
        obs.observe(el);
    });
}


/**
 * Updates active class on all nav links
 */
function updateActiveNavLinks(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    const normalizedPage = pageName.toLowerCase();

    navLinks.forEach((link) => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (
            ((normalizedPage.includes('home') || normalizedPage.includes('index')) && (href.includes('home') || href === './' || href === '/')) ||
            (normalizedPage.includes('about') && href.includes('about')) ||
            (normalizedPage.includes('project') && href.includes('project')) ||
            (normalizedPage.includes('journey') && href.includes('journey')) ||
            (normalizedPage.includes('experience') && href.includes('experience'))
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ==========================================================================
   SOCIAL MEDIA ESCAPE MICRO-ANIMATIONS ENGINE - PREMIUM CINEMATIC EDITION
   ========================================================================== */

let isSocialFlying = false;

function initSocialMicroAnimations() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.social-link');
        if (!link) return;
        let brand = '';
        if (link.classList.contains('twitter'))       brand = 'twitter';
        else if (link.classList.contains('github'))   brand = 'github';
        else if (link.classList.contains('linkedin')) brand = 'linkedin';
        else if (link.classList.contains('email'))    brand = 'email';
        if (!brand) return;
        const href = link.getAttribute('href');
        if (!href) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        e.preventDefault();
        if (isSocialFlying) return;
        isSocialFlying = true;
        const rect = link.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        const isDark = document.documentElement.classList.contains('dark');
        let brandGlow = 'rgba(29, 106, 255, 0.6)';
        if (brand === 'twitter') brandGlow = 'rgba(29, 161, 242, 0.7)';
        else if (brand === 'github') brandGlow = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(36, 41, 46, 0.6)';
        else if (brand === 'linkedin') brandGlow = 'rgba(10, 102, 194, 0.7)';
        else if (brand === 'email') brandGlow = 'rgba(234, 67, 53, 0.7)';

        link.style.transition = 'transform 0.15s cubic-bezier(0.2,0.8,0.2,1), filter 0.25s ease';
        link.style.transform = 'scale(0.9)';
        link.style.filter = 'drop-shadow(0 0 10px ' + brandGlow + ')';
        setTimeout(() => {
            link.style.transform = 'scale(1.15)';
            link.style.filter = 'drop-shadow(0 0 16px ' + brandGlow + ')';
            setTimeout(() => { 
                link.style.transform = ''; 
                link.style.filter = '';
            }, 240);
        }, 110);
        const stage = createSocialFxStage();
        addAtmosphere(stage, brand, startX, startY);
        if (brand === 'twitter')       launchTwitterEscape(stage, startX, startY, href);
        else if (brand === 'github')   launchGitHubEscape(stage, startX, startY, href);
        else if (brand === 'linkedin') launchLinkedInEscape(stage, startX, startY, href);
        else if (brand === 'email')    launchEmailEscape(stage, startX, startY, href);
    });
}

function createSocialFxStage() {
    let old = document.getElementById('socialFxStage');
    if (old) old.remove();
    const stage = document.createElement('div');
    stage.id = 'socialFxStage';
    stage.className = 'social-fx-stage';
    document.body.appendChild(stage);
    return stage;
}

function addAtmosphere(stage, brand, startX, startY) {
    const isDark = document.documentElement.classList.contains('dark');
    const atm = document.createElement('div');
    atm.className = 'social-atmosphere';
    atm.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;opacity:0;transition:opacity 0.35s ease;backdrop-filter:blur(3.5px);-webkit-backdrop-filter:blur(3.5px);';

    let glowColor = 'rgba(29, 106, 255, 0.25)';
    if (brand === 'twitter') glowColor = 'rgba(29, 161, 242, 0.25)';
    else if (brand === 'github') glowColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(36, 41, 46, 0.2)';
    else if (brand === 'linkedin') glowColor = 'rgba(10, 102, 194, 0.25)';
    else if (brand === 'email') glowColor = 'rgba(234, 67, 53, 0.25)';

    if (isDark) {
        atm.style.background = 'radial-gradient(circle at ' + (startX || window.innerWidth/2) + 'px ' + (startY || window.innerHeight/2) + 'px, ' + glowColor + ' 0%, rgba(8, 10, 20, 0.28) 75%)';
    } else {
        atm.style.background = 'radial-gradient(circle at ' + (startX || window.innerWidth/2) + 'px ' + (startY || window.innerHeight/2) + 'px, ' + glowColor + ' 0%, rgba(240, 245, 255, 0.28) 75%)';
    }

    if (startX !== undefined && startY !== undefined) {
        const blurPulse = document.createElement('div');
        blurPulse.style.cssText = 'position:absolute;left:' + startX + 'px;top:' + startY + 'px;'
            + 'width:50px;height:50px;border-radius:50%;'
            + 'background:' + glowColor + ';'
            + 'filter:blur(12px);transform:translate(-50%,-50%) scale(0.6);pointer-events:none;';
        atm.appendChild(blurPulse);
        blurPulse.animate([
            { transform: 'translate(-50%,-50%) scale(0.6)', opacity: 0.5 },
            { transform: 'translate(-50%,-50%) scale(5)', opacity: 0 }
        ], { duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
    }

    stage.appendChild(atm);
    requestAnimationFrame(function() { requestAnimationFrame(function() { atm.style.opacity = '1'; }); });
}

function spawnParticles(stage, count, startX, startY, styleFn, opts) {
    opts = opts || {};
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'social-particle';
        styleFn(p, i);
        p.style.left = startX + 'px';
        p.style.top  = startY + 'px';
        stage.appendChild(p);
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * (opts.spread || 0.5);
        const dist  = Math.random() * (opts.maxDist || 90) + (opts.minDist || 30);
        const tx    = Math.cos(angle) * dist;
        const ty    = Math.sin(angle) * dist + (opts.gravity || 0);
        p.animate([
            { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
            { transform: 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + ty + 'px)) scale(0.1)', opacity: 0 }
        ], { duration: 550 + Math.random() * 250, easing: 'cubic-bezier(0.16,1,0.3,1)', fill: 'forwards' });
    }
}

function flyHero(hero, startX, startY, keyframes, duration, onDone) {
    hero.style.left = startX + 'px';
    hero.style.top  = startY + 'px';
    hero.animate(keyframes, { duration: duration, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' });
    setTimeout(onDone, duration - 80);
}

function cleanupSocialStage(stage) {
    if (!stage) { isSocialFlying = false; return; }
    const atm = stage.querySelector('.social-atmosphere');
    if (atm) atm.style.opacity = '0';
    setTimeout(function() { stage.remove(); isSocialFlying = false; }, 520);
}

/* ── 1. TWITTER / BIRD ────────────────────────────────────────────────────── */
function launchTwitterEscape(stage, startX, startY, href) {
    const isDark = document.documentElement.classList.contains('dark');
    const brandBlue = '#1DA1F2';
    const BIRD_PATH = 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z';

    // Feather particles bursting on takeoff
    spawnParticles(stage, 18, startX, startY, function(p, i) {
        const size = Math.random() * 7 + 4;
        p.style.width  = size + 'px';
        p.style.height = (size * 1.5) + 'px';
        p.style.backgroundColor = i % 3 === 0 ? brandBlue : (i % 3 === 1 ? '#71c9f8' : (isDark ? '#ffffff' : '#d0e8fc'));
        p.style.borderRadius = '50% 50% 50% 0';
        p.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        p.style.boxShadow = '0 0 8px rgba(29, 161, 242, 0.55)';
    }, { maxDist: 85, gravity: -20, spread: 0.8 });

    // Mini flock birds following the flight
    for (let i = 0; i < 4; i++) {
        const mini = document.createElement('div');
        mini.className = 'social-particle';
        const miniSize = 14 + i * 4;
        mini.innerHTML = '<svg viewBox="0 0 24 24" width="' + miniSize + '" height="' + miniSize + '">'
            + '<path fill="' + brandBlue + '" d="' + BIRD_PATH + '"/></svg>';
        mini.style.left = startX + 'px';
        mini.style.top  = startY + 'px';
        const angle = -Math.PI * 0.45 + (Math.random() - 0.5) * 0.6;
        const dist  = 65 + i * 38;
        mini.animate([
            { transform: 'translate(-50%,-50%) scale(0) rotate(0deg)', opacity: 0 },
            { transform: 'translate(calc(-50% + ' + (Math.cos(angle)*dist) + 'px), calc(-50% + ' + (Math.sin(angle)*dist) + 'px)) scale(1.1) rotate(' + (-15 + i*8) + 'deg)', opacity: 0.85, offset: 0.4 },
            { transform: 'translate(calc(-50% + ' + (Math.cos(angle)*dist*2.2) + 'px), calc(-50% + ' + (Math.sin(angle)*dist*2.2 - 60) + 'px)) scale(0.3) rotate(' + (10 - i*5) + 'deg)', opacity: 0 }
        ], { duration: 750 + i * 130, easing: 'cubic-bezier(0.2,0.9,0.4,1)', fill: 'forwards' });
        stage.appendChild(mini);
    }

    // Main soaring Twitter Bird hero
    const hero = document.createElement('div');
    hero.className = 'social-hero-flying';
    hero.innerHTML = '<svg viewBox="0 0 24 24" width="85" height="85" style="filter:drop-shadow(0 10px 24px rgba(29,161,242,0.7));">'
        + '<path fill="' + brandBlue + '" d="' + BIRD_PATH + '"/></svg>';
    stage.appendChild(hero);

    const vw = window.innerWidth, vh = window.innerHeight;
    const midX = vw * 0.48, midY = vh * 0.28;
    flyHero(hero, startX, startY, [
        { transform: 'translate(-50%,-50%) scale(0.3) rotate(-5deg)', opacity: 0.85, offset: 0 },
        { transform: 'translate(calc(-50% + ' + (midX-startX)*0.4 + 'px), calc(-50% + ' + (midY-startY)*0.4 + 'px)) scale(1.2) rotate(16deg) scaleY(0.9)', opacity: 1, offset: 0.25 },
        { transform: 'translate(calc(-50% + ' + (midX-startX) + 'px), calc(-50% + ' + (midY-startY) + 'px)) scale(1.55) rotate(-14deg) scaleY(1.08)', opacity: 1, offset: 0.55 },
        { transform: 'translate(calc(-50% + ' + (vw*0.85-startX) + 'px), calc(-50% + ' + (-220-startY) + 'px)) scale(2.4) rotate(14deg)', opacity: 0, filter: 'blur(3px)', offset: 1 }
    ], 1150, function() {
        window.open(href, '_blank', 'noopener,noreferrer');
        cleanupSocialStage(stage);
    });
}

/* ── 2. GITHUB ───────────────────────────────────────────────────────────── */
function launchGitHubEscape(stage, startX, startY, href) {
    const isDark = document.documentElement.classList.contains('dark');
    const color = isDark ? '#ffffff' : '#24292e';
    const OCTOPATH = 'M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32Z';
    spawnParticles(stage, 10, startX, startY, function(p) {
        const size = Math.random() * 8 + 5;
        p.style.width  = size + 'px';
        p.style.height = size + 'px';
        p.style.backgroundColor = color;
        p.style.borderRadius = '50%';
    }, { maxDist: 85, gravity: 30, spread: 0.7 });
    for (let i = 0; i < 3; i++) {
        const trail = document.createElement('div');
        trail.className = 'social-particle';
        const trailSize = 14 + i * 8;
        trail.innerHTML = '<svg viewBox="0 0 512 512" width="' + trailSize + '" height="' + trailSize + '">'
            + '<path fill="' + color + '" opacity="' + (0.3 + i * 0.2) + '" d="' + OCTOPATH + '"/></svg>';
        trail.style.left = startX + 'px';
        trail.style.top  = startY + 'px';
        const angle = -Math.PI * 0.7 + (Math.random() - 0.5) * 0.8;
        const d = 50 + i * 40;
        const rot = Math.random() * 30 - 15;
        trail.animate([
            { transform: 'translate(-50%,-50%) scale(0)', opacity: 0 },
            { transform: 'translate(calc(-50% + ' + (Math.cos(angle)*d) + 'px), calc(-50% + ' + (Math.sin(angle)*d) + 'px)) scale(1) rotate(' + rot + 'deg)', opacity: 0.6, offset: 0.45 },
            { transform: 'translate(calc(-50% + ' + (Math.cos(angle)*d*2.2) + 'px), calc(-50% + ' + (Math.sin(angle)*d*2.2) + 'px)) scale(0.3)', opacity: 0 }
        ], { duration: 800 + i * 150, easing: 'cubic-bezier(0.2,0.9,0.4,1)', fill: 'forwards' });
        stage.appendChild(trail);
    }
    const hero = document.createElement('div');
    hero.className = 'social-hero-flying';
    hero.innerHTML = '<svg viewBox="0 0 512 512" width="90" height="90" style="filter:drop-shadow(0 10px 28px rgba(0,0,0,0.42));">'
        + '<path fill="' + color + '" d="' + OCTOPATH + '"/></svg>';
    stage.appendChild(hero);
    const vw = window.innerWidth, vh = window.innerHeight;
    const apexX = vw * 0.46, apexY = vh * 0.17;
    flyHero(hero, startX, startY, [
        { transform: 'translate(-50%,-50%) scale(0.28) rotate(10deg)', opacity: 1, offset: 0 },
        { transform: 'translate(calc(-50% + ' + (apexX-startX) + 'px), calc(-50% + ' + (apexY-startY) + 'px)) scale(1.55) rotate(-18deg)', opacity: 1, offset: 0.38 },
        { transform: 'translate(calc(-50% + ' + (apexX-startX+60) + 'px), calc(-50% + ' + (apexY-startY+50) + 'px)) scale(1.4) rotate(12deg)', opacity: 1, offset: 0.62 },
        { transform: 'translate(calc(-50% + ' + (-200-startX) + 'px), calc(-50% + ' + (vh*0.75-startY) + 'px)) scale(2.2) rotate(-40deg)', opacity: 0, filter: 'blur(4px)', offset: 1 }
    ], 1200, function() {
        window.open(href, '_blank', 'noopener,noreferrer');
        cleanupSocialStage(stage);
    });
}

/* ── 3. LINKEDIN ─────────────────────────────────────────────────────────── */
function launchLinkedInEscape(stage, startX, startY, href) {
    const isDark = document.documentElement.classList.contains('dark');
    const liBlue = '#0A66C2';
    spawnParticles(stage, 14, startX, startY, function(p, i) {
        const size = Math.random() * 8 + 4;
        p.style.width  = size + 'px';
        p.style.height = size + 'px';
        p.style.backgroundColor = i % 2 === 0 ? liBlue : (isDark ? '#ffffff' : '#1b1b1b');
        p.style.borderRadius = '50%';
        p.style.boxShadow = i % 2 === 0 ? '0 0 10px ' + liBlue + '88' : 'none';
    }, { maxDist: 90, spread: 0.5 });
    const hero = document.createElement('div');
    hero.className = 'social-hero-flying';
    hero.innerHTML = '<div style="background:' + liBlue + ';color:#fff;padding:14px 22px;border-radius:14px;'
        + 'font-family:Montserrat,sans-serif;font-weight:800;font-size:1.05rem;'
        + 'display:flex;align-items:center;gap:10px;'
        + 'box-shadow:0 12px 36px ' + liBlue + '66;white-space:nowrap;">'
        + '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">'
        + '<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
        + 'Sachin Kumar \xb7 Connect</div>';
    stage.appendChild(hero);
    const vw = window.innerWidth, vh = window.innerHeight;
    flyHero(hero, startX, startY, [
        { transform: 'translate(-50%, 0%) perspective(900px) rotateX(-55deg) scale(0.35)', opacity: 0.5, filter: 'blur(2px)', offset: 0 },
        { transform: 'translate(-50%, 48px) perspective(900px) rotateX(0deg) scale(1.18)', opacity: 1, filter: 'blur(0px)', offset: 0.30 },
        { transform: 'translate(-50%, 58px) perspective(900px) rotateX(4deg) scale(1.12)', opacity: 1, filter: 'blur(0px)', offset: 0.52 },
        { transform: 'translate(calc(-50% + ' + (vw+220-startX) + 'px), calc(-50% + ' + (vh*0.72-startY) + 'px)) scale(1.7) rotate(22deg)', opacity: 0, filter: 'blur(5px)', offset: 1 }
    ], 1250, function() {
        window.open(href, '_blank', 'noopener,noreferrer');
        cleanupSocialStage(stage);
    });
}

/* ── 4. EMAIL ────────────────────────────────────────────────────────────── */
function launchEmailEscape(stage, startX, startY, href) {
    const isDark = document.documentElement.classList.contains('dark');
    const envBg  = isDark ? '#1b1b1b' : '#ffffff';
    const envBdr = isDark ? '#f5f5f5' : '#1b1b1b';
    const red    = '#EA4335';
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'social-particle';
        const size = Math.random() * 14 + 10;
        p.style.cssText = 'width:' + size + 'px;height:' + (size*0.68) + 'px;'
            + 'border:1.5px solid ' + (i%4===0?red:envBdr) + ';border-radius:3px;'
            + 'background:' + (i%4===0?red+'22':envBg) + ';'
            + 'left:' + startX + 'px;top:' + startY + 'px;';
        stage.appendChild(p);
        const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.35;
        const dist  = Math.random() * 130 + 55;
        const liftY = Math.sin(angle) * dist - Math.random() * 45;
        const rot   = Math.random() * 380 - 190;
        p.animate([
            { transform: 'translate(-50%,-50%) scale(0.5) rotate(0deg)', opacity: 1 },
            { transform: 'translate(calc(-50% + ' + (Math.cos(angle)*dist) + 'px), calc(-50% + ' + liftY + 'px)) scale(1.05) rotate(' + rot + 'deg)', opacity: 0 }
        ], { duration: 750 + Math.random() * 280, easing: 'cubic-bezier(0.16,1,0.3,1)', fill: 'forwards' });
    }
    const hero = document.createElement('div');
    hero.className = 'social-hero-flying';
    hero.innerHTML = '<div style="width:72px;height:50px;background:' + envBg + ';border:2.5px solid ' + envBdr + ';border-radius:7px;position:relative;overflow:hidden;box-shadow:0 10px 28px rgba(0,0,0,0.22);">'
        + '<div style="position:absolute;top:0;left:0;right:0;height:0;border-top:25px solid ' + red + ';border-left:36px solid transparent;border-right:36px solid transparent;opacity:0.88;"></div>'
        + '<div style="position:absolute;inset:5px;border:1.5px dashed ' + envBdr + ';border-radius:3px;opacity:0.35;"></div></div>';
    stage.appendChild(hero);
    const vw = window.innerWidth, vh = window.innerHeight;
    const midX = vw * 0.48, midY = vh * 0.27;
    flyHero(hero, startX, startY, [
        { transform: 'translate(-50%,-50%) scale(0.38) rotate(0deg)', opacity: 1, filter: 'blur(0px)', offset: 0 },
        { transform: 'translate(calc(-50% + ' + (midX-startX) + 'px), calc(-50% + ' + (midY-startY) + 'px)) scale(1.6) rotate(-16deg)', opacity: 1, filter: 'blur(0.5px)', offset: 0.38 },
        { transform: 'translate(calc(-50% + ' + (midX-startX+120) + 'px), calc(-50% + ' + (midY-startY-25) + 'px)) scale(1.45) rotate(18deg)', opacity: 1, filter: 'blur(0.5px)', offset: 0.62 },
        { transform: 'translate(calc(-50% + ' + (vw+180-startX) + 'px), calc(-50% + ' + (-160-startY) + 'px)) scale(2.4) rotate(-28deg)', opacity: 0, filter: 'blur(5px)', offset: 1 }
    ], 1180, function() {
        window.open(href, '_blank', 'noopener,noreferrer');
        cleanupSocialStage(stage);
    });
}
