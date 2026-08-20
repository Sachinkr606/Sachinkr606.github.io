// ==========================================
// SACHIN KUMAR - DATA SCIENCE PORTFOLIO JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // WEBSITE PRELOADER ANIMATION
    // ==========================================
    const preloader = document.getElementById("preloader");
    if (preloader) {
        const dismissPreloader = () => {
            if (!preloader.classList.contains("fade-out")) {
                preloader.classList.add("fade-out");
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 600);
            }
        };

        // Dismiss only when ALL resources (images, fonts, scripts) have fully loaded
        window.addEventListener("load", () => {
            setTimeout(dismissPreloader, 300);
        });
    }

    // ==========================================
    // TOAST NOTIFICATIONS
    // ==========================================
    const toastContainer = document.getElementById("toast-container");

    function showToast(message, type = "info") {
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;

        const iconClass = type === "success" ? "fa-circle-check" :
                          type === "error" ? "fa-circle-xmark" : "fa-circle-info";

        toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 10);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 350);
        }, 4000);
    }


    // Clean up any legacy light theme saved in localStorage
    localStorage.removeItem("portfolio-theme");
    document.documentElement.removeAttribute("data-theme");



    // ==========================================
    // MOBILE MENU
    // ==========================================
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            const icon = menuBtn.querySelector("i");
            const isExpanded = navLinks.classList.contains("show");
            menuBtn.setAttribute("aria-expanded", isExpanded);

            if (isExpanded) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        // Close menu on link click
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                menuBtn.setAttribute("aria-expanded", "false");
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }


    // ==========================================
    // ACTIVE NAVIGATION (SCROLL SPY)
    // ==========================================
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {
        let currentSection = "";
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50)) {
            currentSection = sections[sections.length - 1]?.getAttribute("id") || currentSection;
        }

        navItems.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();


    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }, { passive: true });
    }


    // ==========================================
    // PROJECT FILTERING WITH SMOOTH ANIMATION
    // ==========================================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.getAttribute("data-filter");

                projectCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    if (filter === "all" || category === filter) {
                        card.style.display = "block";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translate3d(0, 0, 0) scale(1)";
                        }, 20);
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.94)";
                        setTimeout(() => {
                            if (card.style.opacity === "0") {
                                card.style.display = "none";
                            }
                        }, 280);
                    }
                });
            });
        });
    }


    // ==========================================
    // MODAL SYSTEM (PROJECT DETAILS & RESUME)
    // ==========================================
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");
    const modalClose = document.getElementById("modal-close");
    const openResumeBtn = document.getElementById("open-resume-btn");
    const modalOpenBtns = document.querySelectorAll(".open-modal-btn");

    const projectData = {
        p1: {
            title: "Personal Portfolio Website",
            category: "Web Application / Portfolio",
            tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            description: `
                <p>A modern, high-performance Data Science personal portfolio website built with clean HTML5, custom CSS3 variables, and vanilla JavaScript.</p>
                <h4>Key Features</h4>
                <ul>
                    <li><strong>Interactive Modals & Filters:</strong> Category filtering and detail popups.</li>
                    <li><strong>Printable Resume:</strong> Clean 1-page PDF printable CV viewer.</li>
                    <li><strong>Dynamic UI:</strong> Typing effect animation and responsive mobile drawer menu.</li>
                </ul>
            `,
            github: "https://github.com/Sachinkr606/Sachinkr606.github.io"
        },
        p2: {
            title: "Phone Book Management System",
            category: "C++ Desktop Application",
            tech: ["C++", "Object-Oriented Programming", "File I/O", "Data Structures"],
            description: `
                <p>A fast, robust desktop contact manager built from scratch in modern C++ utilizing Object-Oriented Programming principles and persistent file storage.</p>
                <h4>Key Features</h4>
                <ul>
                    <li><strong>CRUD Operations:</strong> Instant contact creation, search by name/number, updating, and deletion.</li>
                    <li><strong>Data Persistence:</strong> Efficient binary file I/O for saving contacts between sessions.</li>
                    <li><strong>Fast Search:</strong> Optimized string searching algorithm for low latency response.</li>
                </ul>
            `,
            github: "https://github.com/Sachinkr606/PhoneBook-Management-System"
        },
        p3: {
            title: "Data Analytics Dashboard (Sales & Performance)",
            category: "Data Analytics",
            tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI"],
            description: `
                <p>An end-to-end data analytics project uncovering key business metrics, revenue patterns, customer segmentation, and visual dashboards.</p>
                <h4>Key Highlights</h4>
                <ul>
                    <li><strong>Data Cleaning & Transformation:</strong> Cleaned nulls, normalized fields, and built custom aggregations in Pandas.</li>
                    <li><strong>Exploratory Data Analysis:</strong> Statistical distribution analysis and correlation heatmaps.</li>
                    <li><strong>Power BI Dashboard:</strong> Interactive visual reports with dynamic KPIs and slicers.</li>
                </ul>
            `,
            github: "https://github.com/Sachinkr606"
        },
        p4: {
            title: "Machine Learning Predictive Modeling",
            category: "Machine Learning",
            tech: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
            description: `
                <p>Supervised Machine Learning models built for predictive analysis, regression estimation, and classification benchmarking.</p>
                <h4>Key Highlights</h4>
                <ul>
                    <li><strong>Feature Engineering:</strong> One-hot encoding, feature scaling (StandardScaler), and train-test splits.</li>
                    <li><strong>Algorithms:</strong> Linear Regression, Decision Trees, and Random Forest Classifier.</li>
                    <li><strong>Model Evaluation:</strong> Evaluation using Accuracy Score, Confusion Matrix, and Mean Squared Error.</li>
                </ul>
            `,
            github: "https://github.com/Sachinkr606"
        }
    };

    function openModal(htmlContent) {
        if (!modalOverlay || !modalContent) return;
        modalContent.innerHTML = htmlContent;
        modalOverlay.classList.add("active");
        modalOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove("active");
        modalOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay?.classList.contains("active")) {
            closeModal();
        }
    });

    // Project Modal triggers
    modalOpenBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const projectId = btn.getAttribute("data-project");
            const data = projectData[projectId];
            if (!data) return;

            const techBadges = data.tech.map(t => `<span>${t}</span>`).join(" ");

            const content = `
                <h3 class="modal-title">${data.title}</h3>
                <p style="color:var(--primary);font-size:13px;font-weight:600;margin-bottom:15px;">${data.category}</p>
                <div class="project-tech" style="margin-bottom:20px;">${techBadges}</div>
                <div class="modal-body">${data.description}</div>
                <div class="modal-actions">
                    <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <i class="fa-brands fa-github"></i> View GitHub Repository
                    </a>
                    <button class="btn btn-outline" onclick="document.getElementById('modal-close').click()">
                        Close
                    </button>
                </div>
            `;
            openModal(content);
        });
    });

    // Resume Modal trigger
    if (openResumeBtn) {
        openResumeBtn.addEventListener("click", () => {
            const resumeContent = `
                <div style="text-align:center;margin-bottom:20px;">
                    <h3 class="modal-title" style="margin-bottom:5px;padding-right:0;">SACHIN KUMAR</h3>
                    <p style="color:var(--primary);font-weight:600;font-size:13px;">DATA SCIENCE INTERN | ASPIRING DATA SCIENTIST | PYTHON | SQL | POWER BI | DATA ANALYSIS</p>
                    <p style="font-size:12px;color:var(--text-secondary);">Jamshedpur, Jharkhand | +91 8207548606 | kumarsachin8207548606@gmail.com</p>
                    <p style="font-size:12px;color:var(--text-secondary);">GitHub: <a href="https://github.com/Sachinkr606" target="_blank" rel="noopener noreferrer" style="color:var(--primary);">github.com/Sachinkr606</a> &nbsp;|&nbsp; LinkedIn: <a href="https://linkedin.com/in/sachinkr606/" target="_blank" rel="noopener noreferrer" style="color:var(--primary);">linkedin.com/in/sachinkr606/</a></p>
                </div>
                <div class="modal-body">
                    <h4><i class="fa-solid fa-user" style="color:var(--primary);margin-right:8px;"></i> About Me</h4>
                    <p>BCA student and Data Science Intern with hands-on expertise in Python, SQL, Machine Learning, Power BI, Excel, and data analytics. Demonstrated experience in data cleaning, exploratory data analysis (EDA), predictive modeling, and interactive visualization. Focused on applying data-driven strategies and AI/ML algorithms to address complex business challenges and deliver actionable insights.</p>

                    <h4><i class="fa-solid fa-user-graduate" style="color:var(--primary);margin-right:8px;"></i> Education</h4>
                    <ul>
                        <li><strong>Bachelor of Computer Applications (BCA)</strong> — Srinath University, Jamshedpur | 2024–Present | Score: 69.05%</li>
                        <li><strong>Senior Secondary (Class XII) – Science Stream</strong> — Punyark Vidya Mandir, Bihar | 2022–2024 | Score: 48.9%</li>
                        <li><strong>Secondary (Class X)</strong> — Vidya Jyoti School, Jamshedpur | 2017–2022 | Score: 64.75%</li>
                    </ul>

                    <h4><i class="fa-solid fa-briefcase" style="color:var(--primary);margin-right:8px;"></i> Experience</h4>
                    <p style="margin-bottom:4px;"><strong>Data Science Intern</strong> — Vizztal Academy, Adityapur, Jamshedpur | July 2026–Present | 6-Month Internship</p>
                    <ul>
                        <li>Processed, cleaned, and transformed 50,000+ rows of raw unstructured data using Python (Pandas, NumPy) and SQL, improving data quality and pipeline efficiency by 35%.</li>
                        <li>Trained and evaluated 4+ Machine Learning classification & regression models using Scikit-Learn, achieving up to 88% model accuracy on benchmark test datasets.</li>
                        <li>Built 3+ interactive Power BI dashboards and optimized SQL queries, tracking 10+ key performance metrics to deliver actionable visual insights.</li>
                        <li>Collaborated in an agile team of 5+ members to present key data findings, helping streamline workflow decisions by 25%.</li>
                    </ul>
                    <p style="margin-bottom:4px;"><strong>Data Analytics Workshop</strong> — Venturing Digitally | 7-Day Intensive Program</p>
                    <ul>
                        <li>Analyzed 5+ complex real-world datasets containing 10,000+ customer records using advanced exploratory data analysis (EDA) techniques.</li>
                        <li>Leveraged Microsoft Excel (Pivot Tables, VLOOKUP/XLOOKUP, Dynamic Charts) to automate data cleaning workflows, cutting report prep time by 30%.</li>
                        <li>Completed 100% of hands-on data analytics assignments and real-world case studies, deriving 15+ actionable business insights.</li>
                    </ul>

                    <h4><i class="fa-solid fa-laptop-code" style="color:var(--primary);margin-right:8px;"></i> Projects</h4>
                    <ul>
                        <li><strong>Personal Portfolio Website</strong> (HTML5, CSS3, JavaScript | Deployed on GitHub Pages) — Designed and deployed a high-performance personal portfolio website with 98%+ PageSpeed score, serving 100+ visitors across 8 interactive sections. Integrated responsive UI components and modal popups, reducing average page load time to under 1.2 seconds.</li>
                        <li><strong>Phone Book Management System</strong> (C++ | File Handling | CRUD Operations) — Developed a high-speed console-based contact management application in C++ using binary file handling, supporting search & CRUD operations for 1,000+ records. Optimized memory structures and file search algorithms, achieving zero data corruption and improving lookup response time by 40%.</li>
                    </ul>

                    <h4><i class="fa-solid fa-code" style="color:var(--primary);margin-right:8px;"></i> Technical Skills</h4>
                    <ul>
                        <li><strong>Programming:</strong> Python, C, C++</li>
                        <li><strong>Data &amp; Analytics:</strong> Data Analysis, EDA, Statistical Analysis, Data Cleaning, Data Processing</li>
                        <li><strong>Databases:</strong> SQL, MySQL</li>
                        <li><strong>Visualization &amp; BI:</strong> Power BI, Microsoft Excel, Data Visualization</li>
                        <li><strong>AI / ML:</strong> Artificial Intelligence, Machine Learning, Scikit-Learn, Predictive Modeling</li>
                        <li><strong>Core Competencies:</strong> Data Wrangling, Quantitative Reasoning, Team Collaboration, Technical Writing</li>
                    </ul>

                    <h4><i class="fa-solid fa-certificate" style="color:var(--primary);margin-right:8px;"></i> Certifications &amp; Courses</h4>
                    <ul>
                        <li>AWS AI Practitioner Challenge — Amazon Web Services</li>
                        <li>Microsoft Excel with AI Masterclass — Skill Course (Self-Learning)</li>
                        <li>Basic Data Science and Artificial Intelligence — Feuchr School of Excellence</li>
                    </ul>
                </div>
                <div class="modal-actions" style="justify-content:center;gap:12px;">
                    <a href="Sachinkr606resume.pdf" download="Sachinkr606resume.pdf" class="btn btn-primary">
                        <i class="fa-solid fa-download"></i> Download PDF
                    </a>
                    <button class="btn btn-outline" onclick="document.getElementById('modal-close').click()">
                        Close
                    </button>
                </div>
            `;
            openModal(resumeContent);


        });
    }



    // ==========================================
    // TYPING EFFECT
    // ==========================================
    const typedTextEl = document.getElementById("typed-text");

    if (typedTextEl) {
        const words = [
            "Aspiring Data Scientist",
            "Python Developer",
            "Data Analytics Enthusiast",
            "Machine Learning Learner"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeRhythm() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 85;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1800; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; // Pause before new word
            }

            setTimeout(typeRhythm, typeSpeed);
        }

        typeRhythm();
    }


    // ==========================================
    // CONTACT FORM VALIDATION & HANDLING
    // ==========================================
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nameInput = document.querySelector("#name");
            const emailInput = document.querySelector("#email");
            const messageInput = document.querySelector("#message");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name) {
                showToast("Please enter your name.", "error");
                nameInput?.focus();
                return;
            }

            if (!email || !emailRegex.test(email)) {
                showToast("Please enter a valid email address.", "error");
                emailInput?.focus();
                return;
            }

            if (!message || message.length < 5) {
                showToast("Please enter a message (at least 5 characters).", "error");
                messageInput?.focus();
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `Sending... <i class="fa-solid fa-spinner fa-spin"></i>`;
            }

            try {
                const response = await fetch("https://formsubmit.co/ajax/kumarsachin8207548606@gmail.com", {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: `New Portfolio Message from ${name}`,
                        _captcha: "false"
                    })
                });

                const data = await response.json();

                if (response.ok && (data.success === "true" || data.success === true)) {
                    showToast(`Thank you, ${name}! Your message was delivered directly to Sachin's inbox.`, "success");
                    contactForm.reset();
                } else if (data.message && data.message.toLowerCase().includes("activation")) {
                    showToast("FormSubmit requires a 1-time setup! Check your inbox (kumarsachin8207548606@gmail.com) & click 'Activate Form'.", "info");
                } else {
                    throw new Error(data.message || "Form submission failed");
                }
            } catch (err) {
                console.error("Contact Form Error:", err);
                showToast("Unable to send message automatically. Please email directly at kumarsachin8207548606@gmail.com", "error");
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `Send Message <i class="fa-solid fa-paper-plane"></i>`;
                }
            }
        });
    }


    // ==========================================
    // DYNAMIC FOOTER YEAR
    // ==========================================
    const footerP = document.querySelector(".footer p");
    if (footerP) {
        footerP.innerHTML = `© ${new Date().getFullYear()} Sachin Kumar. All Rights Reserved.`;
    }


    // ==========================================
    // SCROLL REVEAL ENGINE (INTERSECTION OBSERVER)
    // ==========================================
    function initScrollReveal() {
        const autoTargets = document.querySelectorAll(
            ".section-heading, .about-text, .about-highlights, .skills-grid, .projects-grid, .timeline, .education-grid, .roadmap, .contact-info, .contact-form"
        );
        autoTargets.forEach(el => {
            if (!el.classList.contains("reveal") &&
                !el.classList.contains("reveal-up") &&
                !el.classList.contains("reveal-left") &&
                !el.classList.contains("reveal-right") &&
                !el.classList.contains("reveal-scale") &&
                !el.classList.contains("reveal-fade")) {
                el.classList.add("reveal-up");
            }
        });

        const revealElements = document.querySelectorAll(
            ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .section-heading"
        );

        if (!revealElements.length) return;

        if ("IntersectionObserver" in window) {
            const observerOptions = {
                root: null,
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            };

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed", "active");
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach(el => revealObserver.observe(el));
        } else {
            revealElements.forEach(el => el.classList.add("revealed", "active"));
        }
    }

    initScrollReveal();

    console.log("%cSachin Kumar Portfolio Loaded Successfully! 🚀", "color:#4f8cff;font-size:16px;font-weight:bold;");
});