// FAQ – <details name="faq"> u novijim preglednicima sam zatvara ostala pitanja,
// a ovo osigurava isto ponašanje i u starijima.
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("toggle", () => {
        if (!item.open) return;
        document.querySelectorAll(".faq-item[open]").forEach(other => {
            if (other !== item) other.open = false;
        });
    });
});

// Fade-in efekt sekcija pri scrollu
const faders = document.querySelectorAll('.section');
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
    faders.forEach(fader => {
        fader.classList.add('fade-in');
        appearOnScroll.observe(fader);
    });
}

// HAMBURGER MENU (mobilni izbornik)
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

function setMenu(open) {
    hamburger.classList.toggle("active", open);
    navLinks.classList.toggle("show", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Zatvori izbornik" : "Otvori izbornik");
}

if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        setMenu(!navLinks.classList.contains("show"));
    });

    // klik na link zatvara meni
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));

    // klik izvan menija ili Escape zatvara meni
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-links") && !e.target.closest(".hamburger")) setMenu(false);
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
    });
}

// SCROLL HIGHLIGHT AKTIVNE SEKCIJE + smanjenje navigacije
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector(".navbar");
const mobileHeader = document.querySelector(".mobile-header");
const mobileCta = document.querySelector(".mobile-cta");
const contactSection = document.getElementById("contact");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop && scrollY < sectionTop + section.clientHeight) {
        if (scrollY >= sectionTop && scrollY < sectionTop + section.clientHeight) {
            current = section.getAttribute("id");
        }
    });
    navLinksAll.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });

    const scrolled = window.scrollY > 50;
    if (navbar) navbar.classList.toggle("scrolled", scrolled);
    if (mobileHeader) mobileHeader.classList.toggle("scrolled", scrolled);

    if (mobileCta && contactSection) {
        const pastHero = window.scrollY > window.innerHeight * 0.8;
        const atContact = contactSection.getBoundingClientRect().top < window.innerHeight;
        mobileCta.classList.toggle("visible", pastHero && !atContact);
    }
}, { passive: true });

// PRODUCT CAROUSEL
let currentIndex = 0;
const products = document.querySelectorAll('.product');
const grid = document.getElementById('productsGrid');

function getItemsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
}

function updateCarousel() {
    if (products.length > 0) {
        const offset = currentIndex * products[0].clientWidth;
        const offset = currentIndex * products[0].clientWidth;
        grid.style.transform = `translateX(-${offset}px)`;
    }
}

function scrollProducts(direction) {
    const maxIndex = Math.max(0, products.length - getItemsPerView());
    currentIndex += direction;
    if (currentIndex > maxIndex) currentIndex = 0;
    else if (currentIndex < 0) currentIndex = maxIndex;
    updateCarousel();
}

if (grid && products.length > 0) {
    updateCarousel();
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
}

// Kartice usluga – otvaranje detalja klikom ili tipkovnicom (Enter / razmak)
const serviceCards = document.querySelectorAll('.service-card');

function toggleCard(card) {
    const open = !card.classList.contains('active');
    serviceCards.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-expanded', 'false');
    });
    if (open) {
        card.classList.add('active');
        card.setAttribute('aria-expanded', 'true');
    }
}

serviceCards.forEach(card => {
    card.addEventListener('click', () => toggleCard(card));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCard(card);
        }
    });
});

// === PAGE RESET ON BACK NAVIGATION ===
window.addEventListener("pageshow", () => {
    // Ako se korisnik vrati natrag, osiguraj da je sve u normalnom stanju
    if (hamburger && navLinks) setMenu(false);
});


/* SLANJE MAILA */
const contactForm = document.getElementById('contactForm');
const statusMsg = document.getElementById('statusMsg');
const formStartedAt = Date.now();

function setStatus(text, kind) {
    statusMsg.textContent = text;
    statusMsg.className = `status-msg ${kind}`;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
        website: form.website.value, // zamka za spam robote
        elapsed: Date.now() - formStartedAt
    };

    setStatus("Šaljem poruku...", "pending");
    button.disabled = true;

    try {
        const res = await fetch('/api/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            setStatus("✅ Poruka je uspješno poslana! Javit ćemo vam se uskoro.", "ok");
            form.reset();
        } else {
            const body = await res.json().catch(() => ({}));
            setStatus(`❌ ${body.error || "Došlo je do greške pri slanju."} Možete nam pisati i na drago.tukara95@gmail.com.`, "error");
        }
    } catch (error) {
        console.error(error);
        setStatus("⚠️ Neuspjelo slanje. Provjerite internetsku vezu i pokušajte ponovno.", "error");
    } finally {
        button.disabled = false;
    }
});
