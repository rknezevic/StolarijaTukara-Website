# Implementation Plan: Footer Upgrade

## Overview

Nadogradnja footera na stranicama index.html i proizvodi.html. Implementacija uključuje novu HTML strukturu footera s tri sekcije (kontakt, navigacija, društvene mreže), CSS stilove u style.css s responzivnim dizajnom, te dupliciranje identičnog HTML-a u obje stranice.

## Tasks

- [x] 1. Dodati CSS stilove za novi footer u style.css
  - Ukloniti postojeće minimalne `.site-footer` stilove
  - Dodati stilove za `.site-footer`, `.footer-main` (CSS Grid, 3 kolone), `.footer-contact`, `.footer-nav`, `.footer-social`, `.footer-bottom`, `.footer-hours`, `.footer-partner`
  - Definirati boje: pozadina `linear-gradient(135deg, #3a2e0a, #5c4e01)`, tekst `#e6d9b8`, naslovi `#f6d28a`, copyright traka `rgba(0, 0, 0, 0.2)`
  - Dodati hover efekte na linkove (prijelaz boje na `#f6d28a`)
  - Dodati responzivne breakpointe: 1024px (smanjen padding), 768px (1 kolona, centriran tekst), 480px (minimalan padding)
  - Koristiti Playfair Display za h3 naslove sekcija i Poppins za ostali tekst
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 2. Zamijeniti postojeći footer u index.html novom strukturom
  - Ukloniti postojeći minimalni `<footer>` element
  - Dodati novi `<footer class="site-footer">` s `aria-label="Podnožje stranice"`
  - Dodati `.footer-main` grid s tri sekcije:
    - `.footer-contact`: naziv obrta, adresa, tel link (`+385 99 680 6531`), mailto link (`drago.tukara95@gmail.com`), OIB, vlasnik, radno vrijeme
    - `.footer-nav`: linkovi na `#home`, `#services`, `#products`, `#about`, `#contact`
    - `.footer-social`: Instagram link (nova kartica), GEALAN logo s linkom (nova kartica)
  - Dodati `.footer-bottom` s copyright tekstom
  - Osigurati semantički HTML i ARIA atribute za pristupačnost
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.2, 4.1, 4.2, 6.1, 6.2, 6.3_

- [x] 3. Dodati footer u proizvodi.html
  - Kopirati identičan footer HTML iz index.html
  - Promijeniti navigacijske linkove da koriste format `index.html#home`, `index.html#services`, itd. (redirect na index + anchor)
  - Postaviti footer nakon `<div class="lightbox">` sekcije, prije `<script>` taga
  - _Requirements: 1.1, 3.3_

- [x] 4. Završna provjera — osigurati konzistentnost
  - Provjeriti da su footer HTML strukture identične osim navigacijskih linkova
  - Provjeriti da style.css nema duplikata ili konflikata s proizvodi.css
  - Osigurati da svi linkovi (tel, mailto, Instagram, GEALAN) imaju ispravne URL-ove i atribute (`target="_blank"`, `rel="noopener noreferrer"`)
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Ovo je statička HTML/CSS stranica bez build alata ili frameworka
- Footer HTML se duplicira u obje datoteke jer nema template enginea
- Svi stilovi idu u zajednički style.css koji se koristi na obje stranice
- PBT nije primjenjiv — ovo je čisto UI rendering bez poslovne logike
- Manualno testiranje responzivnosti preporučeno nakon implementacije
