// === FAQ TOGGLE ===
document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
        const answer = q.nextElementSibling;
        const isOpen = answer.classList.contains("show");

        // Close all
        document.querySelectorAll(".faq-answer").forEach(a => {
            a.classList.remove("show");
            a.style.display = "none";
        });

        // Toggle clicked
        if (!isOpen) {
            answer.classList.add("show");
            answer.style.display = "block";
        }
    });
});

// === FADE-IN ON SCROLL ===
const faders = document.querySelectorAll('.section, .info-banner');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.2, rootMargin: "0px 0px -100px 0px" });

faders.forEach(fader => {
    fader.classList.add('fade-in');
    appearOnScroll.observe(fader);
});

// === HAMBURGER MENU ===
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("show");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("show");
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-links") && !e.target.closest(".hamburger")) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("show");
        }
    });
}

// === SCROLL HIGHLIGHT ACTIVE SECTION ===
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop && scrollY < sectionTop + section.clientHeight) {
            current = section.getAttribute("id");
        }
    });
    navLinksAll.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });

    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    const mobileHeader = document.querySelector(".mobile-header");
    if (mobileHeader) {
        mobileHeader.classList.toggle("scrolled", window.scrollY > 50);
    }
});

// === PRODUCT CAROUSEL ===
let currentIndex = 0;
const products = document.querySelectorAll('.product');
const grid = document.getElementById('productsGrid');

function getItemsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function updateCarousel() {
    if (products.length > 0) {
        const offset = currentIndex * products[0].clientWidth;
        grid.style.transform = `translateX(-${offset}px)`;
    }
}

function scrollProducts(direction) {
    const itemsPerView = getItemsPerView();
    currentIndex += direction;

    if (currentIndex > products.length - itemsPerView) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = products.length - itemsPerView;
    }

    updateCarousel();
}

if (grid && products.length > 0) {
    updateCarousel();
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
}

// === MOBILE PRODUCT OVERLAY ===
if (window.innerWidth <= 768) {
    document.querySelectorAll('.product').forEach(product => {
        const overlay = product.querySelector('.product-overlay');
        product.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
            document.querySelectorAll('.product-overlay').forEach(o => {
                if (o !== overlay) o.style.opacity = 0;
            });
            overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.product')) {
            document.querySelectorAll('.product-overlay').forEach(o => o.style.opacity = 0);
        }
    });
}

// === SERVICE CARD TOGGLE (mobile) ===
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            return;
        }
        document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

// === PAGE RESET ON BACK NAVIGATION ===
window.addEventListener("pageshow", () => {
    document.querySelectorAll(".lightbox").forEach(l => l.style.display = "none");
    document.querySelectorAll(".nav-links").forEach(n => n.classList.remove("show"));
    document.querySelectorAll(".hamburger").forEach(h => h.classList.remove("active"));
});

// === CONTACT FORM ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = e.target;
        const data = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        const statusMsg = document.getElementById('statusMsg');
        statusMsg.textContent = "Šaljem poruku...";
        statusMsg.style.color = "#d4c58a";

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                statusMsg.textContent = "✅ Poruka je uspješno poslana!";
                statusMsg.style.color = "lightgreen";
                form.reset();
            } else {
                statusMsg.textContent = "❌ Došlo je do greške pri slanju.";
                statusMsg.style.color = "red";
            }
        } catch (error) {
            console.error(error);
            statusMsg.textContent = "⚠️ Neuspjelo slanje. Provjerite vezu.";
            statusMsg.style.color = "orange";
        }
    });
}
