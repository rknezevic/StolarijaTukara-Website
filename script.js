// FAQ toggle (otvaranje i zatvaranje pitanja)
document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
        const currentlyOpen = document.querySelector(".faq-answer.show");
        if (currentlyOpen && currentlyOpen !== q.nextElementSibling) {
            currentlyOpen.classList.remove("show");
            currentlyOpen.style.display = "none";
        }
        const answer = q.nextElementSibling;
        const isOpen = answer.classList.contains("show");
        document.querySelectorAll(".faq-answer").forEach(a => {
            a.classList.remove("show");
            a.style.display = "none";
        });
        if (!isOpen) {
            answer.classList.add("show");
            answer.style.display = "block";
        }
    });
});

// Fade-in efekt sekcija pri scrollu
const faders = document.querySelectorAll('.section, .info-banner');
const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);
faders.forEach(fader => {
    fader.classList.add('fade-in');
    appearOnScroll.observe(fader);
});

// HAMBURGER MENU (mobilni izbornik) - ISPRAVLJENO
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("show");
    });

    // klik na link zatvara meni
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("show");
        });
    });

    // klik izvan menija zatvara meni
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-links") && !e.target.closest(".hamburger")) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("show");
        }
    });
}

// SCROLL HIGHLIGHT AKTIVNE SEKCIJE
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    navLinksAll.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// PRODUCT CAROUSEL (ispravljeno pomicanje u px)
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
        const itemWidth = products[0].clientWidth;
        const offset = currentIndex * itemWidth;
        grid.style.transform = `translateX(-${offset}px)`;
    }
}

function scrollProducts(direction) {
    const itemsPerView = getItemsPerView();
    const totalItems = products.length;

    currentIndex += direction;

    if (currentIndex > totalItems - itemsPerView) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalItems - itemsPerView;
    }

    updateCarousel();
}

// inicijalizacija
if (grid && products.length > 0) {
    updateCarousel();
}

// kod promjene veličine ekrana resetiraj index i ažuriraj
window.addEventListener('resize', () => {
    currentIndex = 0;
    updateCarousel();
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

// Mobilni prikaz overlaya klikom
if (window.innerWidth <= 768) {
    const productElements = document.querySelectorAll('.product');

    productElements.forEach(product => {
        const overlay = product.querySelector('.product-overlay');

        product.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;

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

window.addEventListener("scroll", () => {
    const mobileHeader = document.querySelector(".mobile-header");
    if (mobileHeader) {
        if (window.scrollY > 50) {
            mobileHeader.classList.add("scrolled");
        } else {
            mobileHeader.classList.remove("scrolled");
        }
    }
});

// Klikom otvori info o usluzi na mobitelu
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    // ako je već otvoren — zatvori ga
    if (card.classList.contains('active')) {
      card.classList.remove('active');
      return;
    }

    // zatvori ostale
    document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active'));

    // otvori ovaj
    card.classList.add('active');
  });
});

window.addEventListener("pageshow", () => {
  // Ako se korisnik vrati natrag, osiguraj da je sve u normalnom stanju
  document.querySelectorAll(".lightbox").forEach(l => l.style.display = "none");
  document.querySelectorAll(".nav-links").forEach(n => n.classList.remove("show"));
  document.querySelectorAll(".hamburger").forEach(h => h.classList.remove("active"));
});


/* SLANJE MAILA */

document.getElementById('contactForm').addEventListener('submit', async (e) => {
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