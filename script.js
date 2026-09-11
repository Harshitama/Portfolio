document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileNav();
    initTypingEffect();
    initProjectFilters();
    initProjectModals();
    initCopyButtons();
    initStatCounters();
});
/* 1. Navbar Scroll Blur Effect */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
/* 2. Mobile Navigation Drawer Toggle */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
}
/* 3. Typing Text Rotation Effect */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    const roles = [
        "AI & ML Engineer",
        "Hiroshima Univ Research Scholar",
        "Computer Vision Developer",
        "Full-Stack Software Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        let speed = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    type();
}
/* 4. Project Filtering System */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}
/* 5. Project Specs Modal Popup */
const projectDetailsData = {
    'artifact-detector': {
        title: "AI-Generated Video Frame Artifact Detector",
        category: "Computer Vision & AI Security",
        tools: ["Python", "PyTorch", "DinoV2", "EasyOCR", "Scikit-Learn", "Hugging Face"],
        repoUrl: "https://github.com/Harshitama/ai-video-artifact-detector",
        description: `
            <p>Developed a 3-tier hybrid AI architecture designed to flag visual defects—such as collapsed text, mutated hands, and distorted geometry—in AI-generated video frames.</p>
            <br>
            <h4>Key Architectural Highlights:</h4>
            <ul style="padding-left: 1.25rem; margin-top: 0.5rem; color: var(--text-muted);">
                <li><strong>Tier 1: EasyOCR Text Analyzer</strong> – Filters collapsed/garbled text rendered inside synthetic scenes.</li>
                <li><strong>Tier 2: Relative DinoV2 Contrast</strong> – Uses DinoV2 feature similarity to compare test frames against scene clusters.</li>
                <li><strong>Tier 3: DinoV2 RBF SVM Fallback</strong> – Category-balanced SVM classifier trained on 600 synthetic images.</li>
            </ul>
            <br>
            <h4>Performance Metrics:</h4>
            <ul style="padding-left: 1.25rem; margin-top: 0.5rem; color: var(--text-muted);">
                <li><strong>Target-Domain Recall:</strong> 90.91% on unseen test sample pack.</li>
                <li><strong>In-Distribution Validation F1:</strong> 73.44% score across balanced benchmark split.</li>
                <li><strong>Execution Mode:</strong> 100% offline local inference CLI.</li>
            </ul>
        `
    },
    'dreamscribe': {
        title: "Dreamscribe AI Chatbot",
        category: "Generative AI & Web Application",
        tools: ["Python", "Flask", "OpenAI API", "JavaScript", "HTML/CSS"],
        repoUrl: "#",
        description: `
            <p>Full-stack conversational chatbot application developed for the "Build Your Own AI Chatbot 2025" hackathon.</p>
            <br>
            <h4>Key Features & Achievements:</h4>
            <ul style="padding-left: 1.25rem; margin-top: 0.5rem; color: var(--text-muted);">
                <li>Integrated OpenAI API for contextual intelligent conversation.</li>
                <li>Secured <strong>13th position</strong> out of participating developer teams.</li>
                <li>Responsive custom UI with smooth real-time message streaming.</li>
            </ul>
        `
    },
    'turf-booking': {
        title: "Turf Booking Android Application",
        category: "Mobile Application",
        tools: ["Java", "Android Studio", "Firebase Realtime DB", "XML"],
        repoUrl: "#",
        description: `
            <p>Native Android app designed to simplify local sports turf slot reservations with instant synchronization.</p>
            <br>
            <h4>Key Features:</h4>
            <ul style="padding-left: 1.25rem; margin-top: 0.5rem; color: var(--text-muted);">
                <li>Real-time booking schedule updates powered by Firebase.</li>
                <li>User reservation dashboard with automated booking confirmation.</li>
                                <li>Optimized database queries for fast performance on mobile devices.</li>
            </ul>
        `
    },
    'mess-management': {
        title: "Campus Mess Management System",
        category: "IEEE CIS Recognized Hackathon Project",
        tools: ["Python", "Web Stack", "Real-Time DB", "UI Components"],
        repoUrl: "#",
        description: `
            <p>Developed during the <strong>AI Odyssey 2025</strong> hackathon in a 4-member team to tackle campus food waste.</p>
            <br>
            <h4>Key Features & Recognition:</h4>
            <ul style="padding-left: 1.25rem; margin-top: 0.5rem; color: var(--text-muted);">
                <li>Real-time meal tracking, guest order handling, and absence notifications.</li>
                <li>Recognized by <strong>IEEE CIS</strong> for impactful solution design.</li>
                <li>Helped mess management accurately estimate daily meal requirements.</li>
            </ul>
        `
    }
};
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectDetailsData[projectKey];
            if (data && modal && modalBody) {
                modalBody.innerHTML = `
                    <div style="margin-bottom: 1rem;">
                        <span style="font-size: 0.8rem; font-weight: 700; color: var(--cyan); text-transform: uppercase;">${data.category}</span>
                        <h2 style="font-size: 1.75rem; font-weight: 700; margin-top: 0.25rem;">${data.title}</h2>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                        ${data.tools.map(t => `<span class="skill-pill">${t}</span>`).join('')}
                    </div>
                    <div style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 2rem;">
                        ${data.description}
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        ${data.repoUrl !== '#' ? `<a href="${data.repoUrl}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> View GitHub Repo</a>` : ''}
                        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
                    </div>
                `;
                modal.hidden = false;
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
}
function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
    }
}
/* 6. Copy to Clipboard Functionality */
function initCopyButtons() {
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = "harshitamali606@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                showToast("Email address copied to clipboard!");
            });
        });
    }
}
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
        toastMsg.textContent = message;
        toast.hidden = false;
        setTimeout(() => {
            toast.hidden = true;
        }, 3000);
    }
}
/* 7. Contact Form Interactive Handler */
function handleFormSubmit(event) {
    event.preventDefault();
    const status = document.getElementById('form-status');
    const name = document.getElementById('sender-name').value;
    
    if (status) {
        status.className = 'form-status success';
        status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your message has been prepared. You can also reach me directly at harshitamali606@gmail.com.`;
        status.hidden = false;
        document.getElementById('contact-form').reset();
    }
}
/* 8. Animated Stat Counters */
function initStatCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    if (isNaN(target)) return; // If string like '1st'
                    
                    let count = 0;
                    const duration = 1500;
                                      const step = Math.ceil(target / (duration / 30));
                    
                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            num.textContent = target + (num.textContent.includes('+') ? '+' : '');
                            clearInterval(timer);
                        } else {
                            num.textContent = count + (num.textContent.includes('+') ? '+' : '');
                        }
                    }, 30);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    const statsCard = document.querySelector('.hero-stats-card');
    if (statsCard) observer.observe(statsCard);
}

                  
