# Requirements Document

## Uvod

Nadogradnja footera na web stranici Stolarija Tukara. Trenutno index.html ima minimalan footer (samo copyright i adresa), a proizvodi.html uopće nema footer. Cilj je dodati profesionalan, vizualno privlačan footer na obje stranice s kompletnim poslovnim informacijama, navigacijom i društvenim mrežama.

## Pojmovnik

- **Footer**: Podnožje web stranice koje sadrži kontakt informacije, navigaciju i pravne podatke
- **Stranica_Proizvodi**: Stranica proizvodi.html koja prikazuje galeriju proizvoda
- **Stranica_Početna**: Glavna stranica index.html
- **Sustav_Footer**: Komponenta footera koja se prikazuje na svim stranicama

## Zahtjevi

### Zahtjev 1: Struktura footera

**Korisnička priča:** Kao posjetitelj, želim vidjeti profesionalan footer na svim stranicama, kako bih lako pronašao kontakt informacije i navigaciju.

#### Kriteriji prihvaćanja

1. THE Sustav_Footer SHALL prikazivati footer na stranici index.html i stranici proizvodi.html s identičnim sadržajem i izgledom.
2. THE Sustav_Footer SHALL sadržavati tri vizualno odvojene sekcije: kontakt informacije, brza navigacija i društvene mreže.
3. THE Sustav_Footer SHALL prikazivati copyright tekst s trenutnom godinom na dnu footera.

### Zahtjev 2: Kontakt informacije

**Korisnička priča:** Kao potencijalni klijent, želim vidjeti sve kontakt podatke tvrtke u footeru, kako bih mogao brzo stupiti u kontakt.

#### Kriteriji prihvaćanja

1. THE Sustav_Footer SHALL prikazivati naziv obrta "Stolarija Tukara".
2. THE Sustav_Footer SHALL prikazivati adresu "Kralja Tomislava 21A, 32276 Babina Greda".
3. THE Sustav_Footer SHALL prikazivati email adresu "drago.tukara95@gmail.com" kao klikabilni mailto link.
4. THE Sustav_Footer SHALL prikazivati broj telefona "+385 99 680 6531" kao klikabilni tel link.
5. THE Sustav_Footer SHALL prikazivati OIB "39756036925".
6. THE Sustav_Footer SHALL prikazivati ime vlasnika "Drago Tukara".
7. THE Sustav_Footer SHALL prikazivati radno vrijeme: Ponedjeljak – Petak 08:00–16:00, Subota 08:00–12:00.

### Zahtjev 3: Navigacija u footeru

**Korisnička priča:** Kao posjetitelj, želim imati brze linkove u footeru, kako bih mogao navigirati na ključne sekcije bez skrolanja na vrh stranice.

#### Kriteriji prihvaćanja

1. THE Sustav_Footer SHALL sadržavati linkove na sekcije: Početna, Usluge, Proizvodi, O nama i Kontakt.
2. WHEN korisnik klikne na navigacijski link u footeru na stranici index.html, THE Sustav_Footer SHALL skrolati stranicu do odgovarajuće sekcije.
3. WHEN korisnik klikne na navigacijski link u footeru na stranici proizvodi.html, THE Sustav_Footer SHALL preusmjeriti korisnika na index.html s odgovarajućim anchor linkom.

### Zahtjev 4: Društvene mreže i partner

**Korisnička priča:** Kao posjetitelj, želim vidjeti linkove na društvene mreže i partnerski logo, kako bih mogao pratiti tvrtku i saznati više o kvaliteti materijala.

#### Kriteriji prihvaćanja

1. THE Sustav_Footer SHALL prikazivati link na Instagram profil (https://www.instagram.com/dragotukara/) koji se otvara u novom tabu.
2. THE Sustav_Footer SHALL prikazivati GEALAN partnerski logo ili tekst s linkom na GEALAN web stranicu koji se otvara u novom tabu.

### Zahtjev 5: Vizualni dizajn

**Korisnička priča:** Kao vlasnik stranice, želim da footer bude vizualno usklađen s ostatkom stranice, kako bi stranica izgledala profesionalno i cjelovito.

#### Kriteriji prihvaćanja

1. THE Sustav_Footer SHALL koristiti tamnu pozadinu s gradijentom usklađenim s postojećom shemom boja stranice (zlatno-maslinasta paleta: #3a2e0a, #5c4e01, #7a6c1a).
2. THE Sustav_Footer SHALL koristiti font Playfair Display za naslove sekcija i Poppins za ostali tekst.
3. THE Sustav_Footer SHALL koristiti zlatnu boju (#f6d28a) za naglašene elemente i hover efekte na linkovima.
4. THE Sustav_Footer SHALL imati responzivan dizajn koji se prilagođava zaslonima širine 480px, 768px i 1024px.

### Zahtjev 6: Pristupačnost

**Korisnička priča:** Kao korisnik s posebnim potrebama, želim da footer bude pristupačan, kako bih mogao koristiti čitač zaslona za navigaciju.

#### Kriteriji prihvaćanja

1. THE Sustav_Footer SHALL koristiti semantički HTML element `<footer>` s odgovarajućim ARIA atributima.
2. THE Sustav_Footer SHALL osigurati dovoljan kontrast teksta u odnosu na pozadinu (minimalno WCAG AA razina).
3. THE Sustav_Footer SHALL omogućiti navigaciju tipkovnicom kroz sve interaktivne elemente footera.
