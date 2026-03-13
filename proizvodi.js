// === HAMBURGER ===
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

// === PRODUCT DATA ===
const productData = {
    prozori: {
        title: "PVC Prozori",
        description: "PVC prozori izrađeni od GEALAN profila pružaju izvrsnu toplinsku i zvučnu izolaciju, dugotrajnost i moderan dizajn.",
        images: [
            { src: "./img/prozori/IMG-20251015-WA0009.jpg", alt: "PVC prozori izrađeni po mjeri s GEALAN profilima" },
            { src: "./img/prozori/IMG-20251015-WA0021.jpg", alt: "Bijeli PVC prozor s troslojnim staklom" },
            { src: "./img/prozori/IMG-20251015-WA0022.jpg", alt: "PVC prozori s visokom toplinskom izolacijom" },
            { src: "./img/prozori/IMG-20251015-WA0023.jpg", alt: "Moderna PVC stolarija ugrađena u obiteljskoj kući" },
            { src: "./img/prozori/IMG-20251015-WA0025.jpg", alt: "PVC prozori s nagibno-otklopnim sustavom" },
            { src: "./img/prozori/IMG-20251015-WA0028.jpg", alt: "Ugradnja PVC prozora s Gealan S8000 profilom" },
            { src: "./img/prozori/IMG-20251015-WA0030.jpg", alt: "PVC prozor s modernim okvirom i troslojnim staklom" },
            { src: "./img/prozori/IMG-20251015-WA0032.jpg", alt: "PVC stolarija u dnevnom boravku s velikim prozorima" },
            { src: "./img/prozori/IMG-20251015-WA0040.jpg", alt: "Ugrađeni PVC prozori visoke energetske učinkovitosti" },
            { src: "./img/prozori/prozori11_03_1.jpeg", alt: "Veliki PVC prozori ugrađeni u obiteljskoj kući" },
            { src: "./img/prozori/prozori11_03_2.jpeg", alt: "PVC prozori s modernim bijelim okvirima i troslojnim staklom" },
            { src: "./img/prozori/prozori11_03_3.jpeg", alt: "Ugradnja PVC prozora visoke energetske učinkovitosti" },
            { src: "./img/prozori/prozori11_03_4.jpeg", alt: "PVC prozori velikih dimenzija za dnevni boravak" },
            { src: "./img/prozori/prozori11_03_5.jpeg", alt: "Bijeli PVC prozori s kvalitetnom toplinskom izolacijom" },
            { src: "./img/prozori/prozori11_03_6.jpeg", alt: "PVC prozori ugrađeni u novogradnji obiteljske kuće" },
            { src: "./img/prozori/prozori11_03_7.jpeg", alt: "Moderan PVC prozor s velikom staklenom površinom" },
            { src: "./img/prozori/prozori11_03_8.jpeg", alt: "PVC prozori s kvalitetnim Gealan profilima" },
            { src: "./img/prozori/prozori11_03_9.jpeg", alt: "PVC stolarija s velikim prozorima i puno prirodnog svjetla" },
        ]
    },
    vrata: {
        title: "Drvena i ALU Vrata",
        description: "Drvena vrata, kao i aluminijska kombiniraju eleganciju i čvrstoću, idealna su za moderne domove i poslovne prostore.",
        images: [
            { src: "./img/vrata/IMG-20251015-WA0005.jpg", alt: "Aluminijska ulazna vrata modernog dizajna" },
            { src: "./img/vrata/IMG-20251015-WA0006.jpg", alt: "Siva ALU vrata s dekorativnim staklom" },
            { src: "./img/vrata/IMG-20251015-WA0007.jpg", alt: "Aluminijska vrata izrađena po mjeri s bočnim staklom" },
            { src: "./img/vrata/IMG-20251015-WA0018.jpg", alt: "Moderna aluminijska vrata za obiteljsku kuću" },
            { src: "./img/vrata/IMG-20251015-WA0019.jpg", alt: "ALU vrata s elegantnim metalnim okvirom" },
            { src: "./img/vrata/IMG-20251015-WA0020.jpg", alt: "Vanjska aluminijska vrata s mat staklom" },
            { src: "./img/vrata/IMG-20251015-WA0026.jpg", alt: "Ugradnja aluminijskih vrata u poslovnom prostoru" },
            { src: "./img/vrata/IMG-20251015-WA0037.jpg", alt: "Smeđa aluminijska vrata po mjeri" },
            { src: "./img/vrata/IMG-20251015-WA0039.jpg", alt: "ALU vrata s drvenim efektom i visokom izdržljivošću" },
            { src: "./img/vrata/IMG-20251015-WA0044.jpg", alt: "Ulazna aluminijska vrata izrađena po narudžbi" },
            { src: "./img/vrata/vrata11_03_1.jpeg", alt: "Ulazna vrata modernog dizajna za obiteljsku kuću" },
            { src: "./img/vrata/vrata11_03_2.jpeg", alt: "Aluminijska ulazna vrata s dekorativnim staklom" },
            { src: "./img/vrata/vrata11_03_3.jpeg", alt: "ALU vrata izrađena po mjeri za stambeni objekt" },
            { src: "./img/vrata/vrata11_03_4.jpeg", alt: "Moderna aluminijska vrata tamne boje" },
            { src: "./img/vrata/vrata11_03_5.jpeg", alt: "Ulazna vrata s kvalitetnim aluminijskim okvirom" },
            { src: "./img/vrata/vrata11_03_6.jpeg", alt: "Aluminijska vrata s modernom kvakom i staklom" },
            { src: "./img/vrata/vrata11_03_7.jpeg", alt: "Ulazna ALU vrata s elegantnim minimalističkim dizajnom" },
            { src: "./img/vrata/vrata11_03_8.jpeg", alt: "Siva aluminijska vrata ugrađena u obiteljsku kuću" },
            { src: "./img/vrata/vrata11_03_9.jpeg", alt: "Aluminijska vrata s visokom izdržljivošću i modernim izgledom" },
            { src: "./img/vrata/vrata11_03_10.jpeg", alt: "Ulazna vrata izrađena po mjeri za moderan dom" },
            { src: "./img/vrata/vrata11_03_11.jpeg", alt: "ALU vrata s dekorativnim panelom i staklom" },
            { src: "./img/vrata/vrata11_03_12.jpeg", alt: "Aluminijska vrata s modernim dizajnom i čvrstim okvirom" },
            { src: "./img/vrata/vrata11_03_13.jpeg", alt: "Elegantna ulazna aluminijska vrata za stambeni objekt" }
        ]
    },
    klizne_stijene: {
        title: "Klizne stijene",
        description: "Klizne stijene u HST, PSK i Smoovio sustavima omogućuju prostranost i maksimalno svjetlo u prostoru.",
        images: [
            { src: "./img/klizne_stijene/IMG-20251015-WA0010.jpg", alt: "Klizna stijena HST sustava za terasu" },
            { src: "./img/klizne_stijene/IMG-20251015-WA0013.jpg", alt: "Velika PVC klizna stijena s panoramskim pogledom" },
            { src: "./img/klizne_stijene/IMG-20251015-WA0017.jpg", alt: "Staklena klizna stijena u dnevnom boravku" },
            { src: "./img/klizne_stijene/IMG-20251015-WA0024.jpg", alt: "HST klizne stijene izrađene od Gealan profila" },
            { src: "./img/klizne_stijene/IMG-20251015-WA0027.jpg", alt: "PVC klizne stijene s niskim pragom" },
            { src: "./img/klizne_stijene/IMG-20251015-WA0031.jpg", alt: "Moderna PSK klizna stijena s aluminijskim okvirom" },
            { src: "./img/klizne_stijene/IMG-20251015-WA0033.jpg", alt: "Smoovio klizne stijene bez praga – energetski učinkovite" },
            { src: "./img/klizne_stijene/klizna_stijena_1.jpeg", alt: "Velika staklena klizna stijena za izlaz na terasu" },
            { src: "./img/klizne_stijene/klizna_stijena_2.jpeg", alt: "PVC klizna stijena s panoramskim pogledom" },
            { src: "./img/klizne_stijene/klizna_stijena_3.jpeg", alt: "Moderna klizna stijena s velikim staklenim površinama" },
            { src: "./img/klizne_stijene/klizna_stijena_4.jpeg", alt: "Klizna stijena za dnevni boravak s puno prirodnog svjetla" },
            { src: "./img/klizne_stijene/klizna_stijena_5.jpeg", alt: "PVC klizna stijena ugrađena u obiteljskoj kući" }
        ]
    },
    zavrseni_projekti: {
        title: "Završeni projekti",
        description: "Naši završeni projekti prikazuju kvalitetu i preciznost izvedbe u stvarnim objektima. U projektima su korišteni sustavi PVC i drvene stolarije – prozori i vrata izrađeni po mjeri, koji kombiniraju funkcionalnost, estetiku i dugotrajnost.",
        images: [
            { src: "./img/kompletne_kuce/IMG-20251015-WA0016.jpg", alt: "Kuća opremljena PVC prozorima i vratima Stolarije Tukara" },
            { src: "./img/kompletne_kuce/IMG-20251015-WA0041.jpg", alt: "Završeni projekt s drvenom stolarijom – prozori i vrata" },
            { src: "./img/kompletne_kuce/IMG-20251015-WA0042.jpg", alt: "Moderna kuća s ugrađenom PVC i ALU stolarijom" },
            { src: "./img/kompletne_kuce/zgrada11_03_1.jpeg", alt: "Stambena zgrada s ugrađenim PVC prozorima" },
            { src: "./img/kompletne_kuce/zgrada11_03_2.jpeg", alt: "Zgrada s modernom fasadom i PVC stolarijom" },
            { src: "./img/kompletne_kuce/zgrada11_03_3.jpeg", alt: "PVC prozori ugrađeni na višestambenoj zgradi" },
            { src: "./img/kompletne_kuce/zgrada11_03_4.jpeg", alt: "Završeni projekt ugradnje prozora na stambenom objektu" },
            { src: "./img/kompletne_kuce/zgrada11_03_5.jpeg", alt: "Nova fasada s ugrađenim PVC prozorima" },
            { src: "./img/kompletne_kuce/zgrada11_03_6.jpeg", alt: "Stambena zgrada s modernom PVC stolarijom" },
            { src: "./img/plava_stolarija/IMG-20251015-WA0004.jpg", alt: "Plava stolarija izrađena po mjeri – unikatni prozori i vrata" },
            { src: "./img/plava_stolarija/IMG-20251015-WA0004.jpg", alt: "Drvena stolarija plave boje u završnom projektu" },
            { src: "./img/plava_stolarija/IMG-20251015-WA0004.jpg", alt: "Unikatna plava stolarija u stambenom objektu" }
        ]
    }
};

// === RENDER GALLERY ===
const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const container = document.getElementById("productDetail");
const product = productData[type];

if (product) {
    container.innerHTML = `
        <a href="index.html#products" class="back-arrow" aria-label="Natrag na proizvode">⟵</a>
        <div class="product-detail-header">
            <h1>${product.title}</h1>
        </div>
        <p>${product.description}</p>
        <div class="product-gallery">
            ${product.images.map((img, i) =>
                `<img src="${img.src}" alt="${img.alt}" data-index="${i}" loading="lazy">`
            ).join("")}
        </div>`;
} else {
    container.innerHTML = `<h1>Proizvod nije pronađen</h1>`;
}

// === LIGHTBOX ===
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = product.images[currentIndex].src;
    lightboxImg.alt = product.images[currentIndex].alt;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
}

function showNext() {
    currentIndex = (currentIndex + 1) % product.images.length;
    lightboxImg.src = product.images[currentIndex].src;
    lightboxImg.alt = product.images[currentIndex].alt;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    lightboxImg.src = product.images[currentIndex].src;
    lightboxImg.alt = product.images[currentIndex].alt;
}

// Gallery click
document.addEventListener("click", (e) => {
    if (e.target.matches(".product-gallery img")) {
        openLightbox(parseInt(e.target.dataset.index));
    }
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
});

// === PRELOADER & PAGE RESET ===
window.addEventListener("pageshow", () => {
    document.querySelectorAll(".lightbox").forEach(l => l.style.display = "none");
    document.querySelectorAll(".nav-links").forEach(n => n.classList.remove("show"));
    document.querySelectorAll(".hamburger").forEach(h => h.classList.remove("active"));
});

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    document.body.classList.add("loaded");
    preloader.classList.add("hidden");
    setTimeout(() => preloader.remove(), 600);
});

// === JSON-LD DYNAMIC SCHEMA ===
const schemaData = {
    prozori: {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "PVC Prozori",
        "description": "PVC prozori izrađeni po mjeri od GEALAN profila. Visoka toplinska i zvučna izolacija, moderan dizajn i dugotrajnost.",
        "brand": { "@type": "Brand", "name": "Stolarija Tukara" },
        "image": productData.prozori.images.map(img => `https://stolarija-tukara.hr/${img.src.replace('./', '')}`),
        "material": "PVC",
        "category": "Windows"
    },
    vrata: {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "ALU Vrata",
        "description": "Aluminijska vrata izrađena po mjeri. Spoj elegancije, izdržljivosti i sigurnosti za domove i poslovne prostore.",
        "brand": { "@type": "Brand", "name": "Stolarija Tukara" },
        "image": productData.vrata.images.map(img => `https://stolarija-tukara.hr/${img.src.replace('./', '')}`),
        "material": "Aluminij",
        "category": "Doors"
    },
    klizne_stijene: {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Klizne stijene",
        "description": "Klizne stijene HST, PSK i Smoovio sustava — maksimalno svjetlo i energetska učinkovitost bez pragova.",
        "brand": { "@type": "Brand", "name": "Stolarija Tukara" },
        "image": productData.klizne_stijene.images.map(img => `https://stolarija-tukara.hr/${img.src.replace('./', '')}`),
        "material": "PVC i aluminij",
        "category": "Sliding Doors"
    },
    zavrseni_projekti: {
        "@context": "https://schema.org/",
        "@type": "CreativeWork",
        "name": "Završeni projekti Stolarije Tukara",
        "description": "Pregled završenih projekata Stolarije Tukara koji prikazuju kvalitetu izrade PVC i drvene stolarije u stvarnim objektima.",
        "creator": { "@type": "Organization", "name": "Stolarija Tukara" },
        "image": productData.zavrseni_projekti.images.map(img => `https://stolarija-tukara.hr/${img.src.replace('./', '')}`),
        "url": "https://stolarija-tukara.hr/proizvodi.html?type=zavrseni_projekti"
    }
};

if (schemaData[type]) {
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify(schemaData[type], null, 2);
    document.head.appendChild(ld);
}
