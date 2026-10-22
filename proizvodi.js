// === HAMBURGER ===
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

function setMenu(open) {
    hamburger.classList.toggle("active", open);
    navLinks.classList.toggle("show", open);
    hamburger.setAttribute("aria-expanded", String(open));
}

if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        setMenu(!navLinks.classList.contains("show"));
    });

    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-links") && !e.target.closest(".hamburger")) setMenu(false);
    });
}

// === LIGHTBOX ===
// Linkovi u galeriji vode na veliku sliku, pa galerija radi i bez JavaScripta.
const lightbox = document.getElementById("lightbox");
if (lightbox) {
    const links = [...document.querySelectorAll(".product-gallery a")];
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeBtn");
    let currentIndex = 0;
    let lastFocus = null;

    function show(index) {
        currentIndex = (index + links.length) % links.length;
        const link = links[currentIndex];
        lightboxImg.src = link.href;
        lightboxImg.alt = link.querySelector("img").alt;
    }

    function openLightbox(index) {
        lastFocus = document.activeElement;
        show(index);
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    }

    function closeLightbox() {
        lightbox.hidden = true;
        document.body.style.overflow = "";
        if (lastFocus) lastFocus.focus();
    }

    links.forEach((link, i) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            openLightbox(i);
        });
    });

    closeBtn.addEventListener("click", closeLightbox);
    document.getElementById("nextBtn").addEventListener("click", () => show(currentIndex + 1));
    document.getElementById("prevBtn").addEventListener("click", () => show(currentIndex - 1));
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (lightbox.hidden) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") show(currentIndex + 1);
        if (e.key === "ArrowLeft") show(currentIndex - 1);
    });

    // Swipe na mobitelu
    let touchX = null;
    lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) show(currentIndex + (dx < 0 ? 1 : -1));
        touchX = null;
    });

    // Ako se korisnik vrati natrag, osiguraj da je sve u normalnom stanju
    window.addEventListener("pageshow", () => {
        lightbox.hidden = true;
        document.body.style.overflow = "";
        if (hamburger && navLinks) setMenu(false);
    });
}
