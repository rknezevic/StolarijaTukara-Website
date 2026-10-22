// Pretvara fotografije iz img/ u lagane WebP verzije za web.
// Pokretanje: npm run images
// Za svaku sliku nastaju:
//   ime.webp     – velika verzija (max 1600 px) za lightbox / pozadine
//   ime-sm.webp  – mala verzija (600 px) za galerije i kartice
// Originali ostaju netaknuti. Postojeće .webp datoteke se preskaču.
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("img");
const SKIP_DIRS = new Set(["favicon_io"]);
const PHOTO_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function exists(file) {
    try {
        await stat(file);
        return true;
    } catch {
        return false;
    }
}

async function* walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (!SKIP_DIRS.has(entry.name)) yield* walk(full);
        } else if (PHOTO_EXT.has(path.extname(entry.name).toLowerCase())) {
            yield full;
        }
    }
}

async function convert(src) {
    const base = src.slice(0, -path.extname(src).length);
    const name = path.basename(base);
    const isHero = name.startsWith("bg_");
    const isLogo = name.includes("logo");

    const large = `${base}.webp`;
    if (!(await exists(large))) {
        const width = isHero ? 1920 : isLogo ? 400 : 1600;
        await sharp(src).rotate()
            .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
            .webp({ quality: isLogo ? 90 : 72 })
            .toFile(large);
        console.log("✓", path.relative(".", large));
    }

    if (isHero || isLogo) return;
    const small = `${base}-sm.webp`;
    if (!(await exists(small))) {
        await sharp(src).rotate()
            .resize({ width: 600, withoutEnlargement: true })
            .webp({ quality: 70 })
            .toFile(small);
        console.log("✓", path.relative(".", small));
    }
}

// Slika za dijeljenje na društvenim mrežama (Facebook, WhatsApp) – 1200×630 JPG
async function ogImage() {
    const out = path.join(ROOT, "og-image.jpg");
    if (await exists(out)) return;
    await sharp(path.join(ROOT, "preview.png"))
        .resize(1200, 630, { fit: "cover" })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(out);
    console.log("✓", path.relative(".", out));
}

for await (const file of walk(ROOT)) {
    if (path.basename(file) === "preview.png" || path.basename(file) === "og-image.jpg") continue;
    await convert(file);
}
await ogImage();
