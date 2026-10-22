// Generira statične stranice proizvoda (pvc-prozori.html, alu-vrata.html, ...).
// Pokretanje: npm run pages
// Sadržaj (tekst, slike, SEO) uređuje se u PAGES ispod, a zatim se skripta ponovno pokrene.
// Prije toga pokreni `npm run images` ako si dodao nove fotografije.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const SITE = "https://www.stolarija-tukara.hr";

const PAGES = [
    {
        slug: "pvc-prozori",
        name: "PVC prozori",
        title: "PVC prozori po mjeri – Slavonija | Stolarija Tukara",
        description:
            "PVC prozori po mjeri od GEALAN S8000 i S9000 profila. Izrada i montaža u Slavoniji i cijeloj Hrvatskoj – toplinska i zvučna izolacija, troslojno staklo.",
        intro: [
            "Naši <strong>PVC prozori</strong> izrađuju se po mjeri od njemačkih <strong>GEALAN</strong> profila. Sustav <strong>S8000</strong> je pouzdan 6-komorni profil izvrsne stabilnosti i toplinske izolacije, a premium sustav <strong>S9000</strong> nudi trostruko brtvljenje i podršku za troslojna stakla.",
            "Za prozore u boji koristimo <strong>acrylcolor</strong> tehnologiju površine koja je otporna na UV zrake i ogrebotine, pa boja ostaje postojana godinama. Svaki prozor sami mjerimo, izrađujemo i ugrađujemo – u Babinoj Gredi, diljem Slavonije i u cijeloj Hrvatskoj.",
        ],
        features: [
            "GEALAN S8000 i S9000 profili",
            "Dvoslojno ili troslojno staklo",
            "Nagibno-otklopno okovljenje",
            "Montaža i završni elementi (klupice, komarnici, žaluzine)",
        ],
        schemaType: "Service",
        images: [
            ["prozori/IMG-20251015-WA0040", "Ugrađeni PVC prozori visoke energetske učinkovitosti"],
            ["prozori/IMG-20251015-WA0009", "PVC prozori izrađeni po mjeri s GEALAN profilima"],
            ["prozori/IMG-20251015-WA0021", "Bijeli PVC prozor s troslojnim staklom"],
            ["prozori/IMG-20251015-WA0022", "PVC prozori s visokom toplinskom izolacijom"],
            ["prozori/IMG-20251015-WA0023", "Moderna PVC stolarija ugrađena u obiteljskoj kući"],
            ["prozori/IMG-20251015-WA0025", "PVC prozori s nagibno-otklopnim sustavom"],
            ["prozori/IMG-20251015-WA0028", "Ugradnja PVC prozora s GEALAN S8000 profilom"],
            ["prozori/IMG-20251015-WA0030", "PVC prozor s modernim okvirom i troslojnim staklom"],
            ["prozori/IMG-20251015-WA0032", "PVC stolarija u dnevnom boravku s velikim prozorima"],
            ["prozori/prozori11_03_1", "Veliki PVC prozori ugrađeni u obiteljskoj kući"],
            ["prozori/prozori11_03_2", "PVC prozori s bijelim okvirima i troslojnim staklom"],
            ["prozori/prozori11_03_3", "Ugradnja PVC prozora visoke energetske učinkovitosti"],
            ["prozori/prozori11_03_4", "PVC prozori velikih dimenzija za dnevni boravak"],
            ["prozori/prozori11_03_5", "Bijeli PVC prozori s kvalitetnom toplinskom izolacijom"],
            ["prozori/prozori11_03_6", "PVC prozori ugrađeni u novogradnji obiteljske kuće"],
            ["prozori/prozori11_03_7", "Moderan PVC prozor s velikom staklenom površinom"],
            ["prozori/prozori11_03_8", "PVC prozori s kvalitetnim GEALAN profilima"],
            ["prozori/prozori11_03_9", "PVC stolarija s velikim prozorima i puno prirodnog svjetla"],
        ],
    },
    {
        slug: "alu-vrata",
        name: "ALU vrata",
        title: "ALU vrata po mjeri – Slavonija | Stolarija Tukara",
        description:
            "Ulazna aluminijska (ALU) vrata po mjeri za kuće i poslovne prostore. Izrada i ugradnja u Slavoniji i cijeloj Hrvatskoj – čvrsta, sigurna i moderna.",
        intro: [
            "<strong>Aluminijska vrata</strong> spajaju eleganciju i čvrstoću. Idealna su kao ulazna vrata obiteljskih kuća, ali i za poslovne prostore gdje se traži izdržljivost i sigurnost.",
            "Svaka vrata izrađujemo po mjeri – birate dizajn panela, staklo, boju i okov, a mi se brinemo za precizno mjerenje i ugradnju. Radimo u Slavoniji i diljem Hrvatske.",
        ],
        features: [
            "Ulazna i vanjska vrata po mjeri",
            "Izbor panela, stakla, boje i okova",
            "Za stambene i poslovne objekte",
            "Ugradnja na terenu",
        ],
        schemaType: "Service",
        images: [
            ["vrata/IMG-20251015-WA0037", "Smeđa aluminijska vrata po mjeri"],
            ["vrata/IMG-20251015-WA0005", "Aluminijska ulazna vrata modernog dizajna"],
            ["vrata/IMG-20251015-WA0006", "Siva ALU vrata s dekorativnim staklom"],
            ["vrata/IMG-20251015-WA0007", "Aluminijska vrata izrađena po mjeri s bočnim staklom"],
            ["vrata/IMG-20251015-WA0018", "Moderna aluminijska vrata za obiteljsku kuću"],
            ["vrata/IMG-20251015-WA0019", "ALU vrata s elegantnim metalnim okvirom"],
            ["vrata/IMG-20251015-WA0020", "Vanjska aluminijska vrata s mat staklom"],
            ["vrata/IMG-20251015-WA0026", "Ugradnja aluminijskih vrata u poslovnom prostoru"],
            ["vrata/IMG-20251015-WA0039", "ALU vrata s drvenim efektom"],
            ["vrata/IMG-20251015-WA0044", "Ulazna aluminijska vrata izrađena po narudžbi"],
            ["vrata/vrata11_03_1", "Ulazna vrata modernog dizajna za obiteljsku kuću"],
            ["vrata/vrata11_03_2", "Aluminijska ulazna vrata s dekorativnim staklom"],
            ["vrata/vrata11_03_3", "ALU vrata izrađena po mjeri za stambeni objekt"],
            ["vrata/vrata11_03_4", "Moderna aluminijska vrata tamne boje"],
            ["vrata/vrata11_03_5", "Ulazna vrata s kvalitetnim aluminijskim okvirom"],
            ["vrata/vrata11_03_6", "Aluminijska vrata s modernom kvakom i staklom"],
            ["vrata/vrata11_03_7", "Ulazna ALU vrata minimalističkog dizajna"],
            ["vrata/vrata11_03_8", "Siva aluminijska vrata ugrađena u obiteljsku kuću"],
            ["vrata/vrata11_03_9", "Aluminijska vrata modernog izgleda"],
            ["vrata/vrata11_03_10", "Ulazna vrata izrađena po mjeri za moderan dom"],
            ["vrata/vrata11_03_11", "ALU vrata s dekorativnim panelom i staklom"],
            ["vrata/vrata11_03_12", "Aluminijska vrata s čvrstim okvirom"],
            ["vrata/vrata11_03_13", "Elegantna ulazna aluminijska vrata za stambeni objekt"],
        ],
    },
    {
        slug: "klizne-stijene",
        name: "Klizne stijene",
        title: "Klizne stijene po mjeri – Slavonija | Stolarija Tukara",
        description:
            "Klizne stijene po mjeri – HST podizno-klizne, PSK i GEALAN Smoovio bez praga. Više svjetla i prostora uz montažu u Slavoniji i cijeloj Hrvatskoj.",
        intro: [
            "<strong>Klizne stijene</strong> otvaraju prostor prema terasi ili vrtu i unose maksimalno prirodnog svjetla. Nudimo tri sustava, ovisno o veličini otvora i budžetu.",
            "<strong>HST</strong> podizno-klizni sustav idealan je za velike otvore i terase. <strong>PSK</strong> je povoljnija varijanta s nagibno-kliznim otvaranjem, a <strong>Smoovio</strong> je novija GEALAN tehnologija bez pragova i s iznimnom lakoćom klizanja. Izrađujemo ih po mjeri i ugrađujemo u Slavoniji i cijeloj Hrvatskoj.",
        ],
        features: [
            "HST – podizno-klizni sustav za velike otvore",
            "PSK – nagibno-klizno otvaranje",
            "Smoovio – bez praga, lagano klizanje",
            "Plisse komarnici za klizne stijene",
        ],
        schemaType: "Service",
        images: [
            ["klizne_stijene/IMG-20251015-WA0010", "Klizna stijena HST sustava za terasu"],
            ["klizne_stijene/IMG-20251015-WA0013", "Velika PVC klizna stijena s panoramskim pogledom"],
            ["klizne_stijene/IMG-20251015-WA0017", "Staklena klizna stijena u dnevnom boravku"],
            ["klizne_stijene/IMG-20251015-WA0024", "HST klizne stijene izrađene od GEALAN profila"],
            ["klizne_stijene/IMG-20251015-WA0027", "PVC klizne stijene s niskim pragom"],
            ["klizne_stijene/IMG-20251015-WA0031", "Moderna PSK klizna stijena"],
            ["klizne_stijene/IMG-20251015-WA0033", "Smoovio klizne stijene bez praga"],
            ["klizne_stijene/klizna_stijena_1", "Velika staklena klizna stijena za izlaz na terasu"],
            ["klizne_stijene/klizna_stijena_2", "PVC klizna stijena s panoramskim pogledom"],
            ["klizne_stijene/klizna_stijena_3", "Klizna stijena s velikim staklenim površinama"],
            ["klizne_stijene/klizna_stijena_4", "Klizna stijena za dnevni boravak s puno prirodnog svjetla"],
            ["klizne_stijene/klizna_stijena_5", "PVC klizna stijena ugrađena u obiteljskoj kući"],
        ],
    },
    {
        slug: "zavrseni-projekti",
        name: "Završeni projekti",
        title: "Završeni projekti stolarije – Slavonija | Stolarija Tukara",
        description:
            "Pogledajte završene projekte Stolarije Tukara – obiteljske kuće i stambene zgrade opremljene PVC i ALU stolarijom po mjeri u Slavoniji i Hrvatskoj.",
        intro: [
            "Naši <strong>završeni projekti</strong> prikazuju kvalitetu i preciznost izvedbe u stvarnim objektima – od obiteljskih kuća do višestambenih zgrada.",
            "U projektima su korišteni PVC i ALU sustavi te drvena stolarija: prozori, vrata i klizne stijene izrađeni po mjeri, koji spajaju funkcionalnost, estetiku i dugotrajnost.",
        ],
        features: [
            "Obiteljske kuće i novogradnja",
            "Stambene zgrade",
            "Kompletna izmjena stolarije",
            "Unikatna stolarija u boji",
        ],
        schemaType: "CollectionPage",
        images: [
            ["kompletne_kuce/IMG-20251015-WA0042", "Moderna kuća s ugrađenom PVC i ALU stolarijom"],
            ["kompletne_kuce/IMG-20251015-WA0016", "Kuća opremljena PVC prozorima i vratima Stolarije Tukara"],
            ["kompletne_kuce/IMG-20251015-WA0041", "Završeni projekt s drvenom stolarijom – prozori i vrata"],
            ["kompletne_kuce/zgrada11_03_1", "Stambena zgrada s ugrađenim PVC prozorima"],
            ["kompletne_kuce/zgrada11_03_2", "Zgrada s modernom fasadom i PVC stolarijom"],
            ["kompletne_kuce/zgrada11_03_3", "PVC prozori ugrađeni na višestambenoj zgradi"],
            ["kompletne_kuce/zgrada11_03_4", "Završeni projekt ugradnje prozora na stambenom objektu"],
            ["kompletne_kuce/zgrada11_03_5", "Nova fasada s ugrađenim PVC prozorima"],
            ["kompletne_kuce/zgrada11_03_6", "Stambena zgrada s modernom PVC stolarijom"],
            ["plava_stolarija/IMG-20251015-WA0004", "Plava stolarija izrađena po mjeri – unikatni prozori i vrata"],
            ["plava_stolarija/IMG-20251015-WA0036", "Stolarija plave boje u završenom projektu"],
            ["plava_stolarija/IMG-20251015-WA0038", "Unikatna plava stolarija na stambenom objektu"],
        ],
    },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const stripTags = (s) => s.replace(/<[^>]+>/g, "");

async function render(page) {
    const url = `${SITE}/${page.slug}`;
    const images = await Promise.all(
        page.images.map(async ([path, alt]) => {
            const { width, height } = await sharp(`img/${path}-sm.webp`).metadata();
            return { small: `/img/${path}-sm.webp`, large: `/img/${path}.webp`, alt, width, height };
        })
    );
    const others = PAGES.filter((p) => p !== page);
    // Za dijeljenje (WhatsApp, Facebook) koristi originalni JPG naslovne fotografije
    const cover = page.images[0][0];
    const ogImage = `/img/${cover}${existsSync(`img/${cover}.jpg`) ? ".jpg" : ".jpeg"}`;

    const schema = [
        {
            "@context": "https://schema.org",
            "@type": page.schemaType,
            name: page.name,
            description: page.description,
            url,
            image: images.slice(0, 5).map((i) => SITE + i.large),
            ...(page.schemaType === "Service"
                ? {
                      serviceType: page.name,
                      provider: { "@id": `${SITE}/#business` },
                      areaServed: [
                          { "@type": "AdministrativeArea", name: "Slavonija" },
                          { "@type": "Country", name: "Hrvatska" },
                      ],
                  }
                : { about: { "@id": `${SITE}/#business` } }),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Početna", item: `${SITE}/` },
                { "@type": "ListItem", position: 2, name: "Proizvodi", item: `${SITE}/#products` },
                { "@type": "ListItem", position: 3, name: page.name, item: url },
            ],
        },
    ];

    const gallery = images
        .map(
            (img, i) => `                <li>
                    <a href="${img.large}" data-index="${i}">
                        <img src="${img.small}" alt="${esc(img.alt)}" width="${img.width}" height="${img.height}"${i < 3 ? "" : ' loading="lazy"'} decoding="async">
                    </a>
                </li>`
        )
        .join("\n");

    return `<!DOCTYPE html>
<!-- Ova stranica je generirana skriptom tools/generate-product-pages.mjs – mijenjaj sadržaj tamo. -->
<html lang="hr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.description)}">
    <link rel="canonical" href="${url}">

    <!-- Open Graph -->
    <meta property="og:title" content="${esc(page.title)}">
    <meta property="og:description" content="${esc(page.description)}">
    <meta property="og:image" content="${SITE}${ogImage}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="hr_HR">
    <meta property="og:site_name" content="Stolarija Tukara">
    <meta name="twitter:card" content="summary_large_image">

    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon_io/favicon-32x32.png">
    <link rel="apple-touch-icon" href="/img/favicon_io/apple-touch-icon.png">
    <link rel="manifest" href="/img/favicon_io/site.webmanifest">
    <meta name="theme-color" content="#7a6c1a">

    <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Fontovi se učitavaju asinkrono da ne blokiraju prikaz stranice -->
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;700&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;700&display=swap" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;700&display=swap"></noscript>
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/proizvodi.css">
</head>

<body class="product-page">
    <nav class="navbar" aria-label="Glavna navigacija">
        <a href="/" class="logo">Stolarija Tukara</a>
        <ul class="nav-links" id="navLinks">
            <li><a href="/#home">Početna</a></li>
            <li><a href="/#services">Usluge</a></li>
            <li><a href="/#products">Proizvodi</a></li>
            <li><a href="/#about">O nama</a></li>
            <li><a href="/#contact">Kontakt</a></li>
        </ul>
        <button class="hamburger" type="button" aria-label="Otvori izbornik" aria-controls="navLinks" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
    </nav>

    <main class="product-detail">
        <nav class="breadcrumbs" aria-label="Putanja">
            <a href="/">Početna</a> <span aria-hidden="true">›</span>
            <a href="/#products">Proizvodi</a> <span aria-hidden="true">›</span>
            <span aria-current="page">${page.name}</span>
        </nav>

        <h1>${page.name}</h1>

        <div class="product-intro">
${page.intro.map((p) => `            <p>${p}</p>`).join("\n")}
            <ul class="product-features">
${page.features.map((f) => `                <li>${f}</li>`).join("\n")}
            </ul>
        </div>

        <section aria-label="Galerija – ${page.name}">
            <ul class="product-gallery">
${gallery}
            </ul>
        </section>

        <section class="product-cta">
            <h2>Trebate ponudu?</h2>
            <p>Pošaljite nam mjere ili okvirni opis projekta i javit ćemo vam se s ponudom.</p>
            <a href="/#contact" class="offer-btn">Zatraži ponudu</a>
        </section>

        <nav class="other-products" aria-label="Ostali proizvodi">
            <h2>Pogledajte i</h2>
            <ul>
${others.map((p) => `                <li><a href="/${p.slug}">${p.name}</a></li>`).join("\n")}
            </ul>
        </nav>
    </main>

    <!-- LIGHTBOX -->
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Pregled slike" hidden>
        <button class="close-btn" id="closeBtn" type="button" aria-label="Zatvori">&times;</button>
        <button class="lightbox-arrow prev" id="prevBtn" type="button" aria-label="Prethodna slika">❮</button>
        <img id="lightboxImg" src="" alt="">
        <button class="lightbox-arrow next" id="nextBtn" type="button" aria-label="Sljedeća slika">❯</button>
    </div>

${FOOTER}

    <a href="/#contact" class="mobile-cta">Zatraži ponudu</a>

    <script src="/proizvodi.js" defer></script>
</body>

</html>
`;
}

// Isti footer kao na index.html
const FOOTER = `    <footer class="site-footer">
        <div class="footer-grid">
            <div>
                <p class="footer-brand">Stolarija Tukara</p>
                <p>Obrt za proizvodnju i ugradnju PVC i ALU stolarije.<br>Babina Greda – radimo diljem Slavonije i cijele Hrvatske.</p>
            </div>
            <div>
                <p class="footer-heading">Kontakt</p>
                <p>Kralja Tomislava 21A<br>32276 Babina Greda</p>
                <p><a href="mailto:drago.tukara95@gmail.com">drago.tukara95@gmail.com</a></p>
                <p><a href="tel:+385996806531">+385 99 680 6531</a></p>
                <p>Pon – Pet: 08:00 – 16:00</p>
            </div>
            <div>
                <p class="footer-heading">Proizvodi</p>
                <ul>
${PAGES.map((p) => `                    <li><a href="/${p.slug}">${p.name}</a></li>`).join("\n")}
                </ul>
            </div>
            <div>
                <p class="footer-heading">Pratite nas</p>
                <p><a href="https://www.instagram.com/dragotukara/" target="_blank" rel="noopener">Instagram</a></p>
                <p><a href="/privatnost">Pravila privatnosti</a></p>
            </div>
        </div>
        <p class="footer-copy">© Stolarija Tukara · OIB: 39756036925</p>
    </footer>`;

for (const page of PAGES) {
    await writeFile(`${page.slug}.html`, await render(page));
    console.log("✓", `${page.slug}.html`);
}
