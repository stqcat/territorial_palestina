# Territoris Catalans amb Palestina

Lloc web de la coordinadora d'entitats de solidaritat amb Palestina dels Països Catalans. Fet amb [Astro](https://astro.build), sense JavaScript al client.

Quatre pàgines: portada, **Boicot** (les empreses de la campanya), **Manifest** (la Declaració de Terrassa) i **Qui som** (les entitats que formen la coordinadora), més una pàgina d'error.

## Posar-lo en marxa

Cal Node 22.12 o superior. El fitxer `.tool-versions` fixa la versió exacta per a qui faci servir asdf o mise; és la mateixa amb què es construeix el lloc al desplegament.

```sh
npm install
npm run dev
```

El servidor s'arrenca en segon pla amb `npm run dev -- --background`, i es gestiona amb `npx astro dev stop`, `npx astro dev status` i `npx astro dev logs`.

| Ordre                  | Què fa                                         |
| :--------------------- | :--------------------------------------------- |
| `npm run dev`          | Servidor de desenvolupament a `localhost:4321` |
| `npm run build`        | Genera el lloc estàtic a `dist/`               |
| `npm run preview`      | Serveix el resultat del build per comprovar-lo |
| `npm run format`       | Formata el codi amb Prettier                   |
| `npm run format:check` | Comprova el format sense tocar res             |

## Estructura

```text
src/
├── pages/            una pàgina per ruta, només embolcalls prims
├── layouts/Base.astro  l'únic layout: capçalera, menú i peu
├── components/       el marcatge de cada pàgina i les consultes de contingut
├── content/          els textos i les dades (vegeu més avall)
├── styles/           base.css (reinici) i label.css (el sistema visual)
└── assets/           logos i imatges, servits amb astro:assets
public/               fitxers servits tal qual: CNAME, robots.txt, favicons,
                      el cartell en PDF i les propostes de disseny
```

## Contingut

Les dues col·leccions es defineixen a `src/content.config.ts`.

**Marques** (`src/content/brands/*.md`) — una per empresa boicotejada. Cal `name`, `order`, `sector` i `summary`; opcionalment `alternatives` i `sources`. S'ordenen pel camp `order`, no pel nom del fitxer, i l'identificador de l'entrada és l'àncora que hi enllaça la portada (`/boicot/#teva`).

**Organitzacions** (`src/content/organizations.json`) — les entitats de la coordinadora. Cada entrada necessita `id` i `name`; `url` i `logo` són opcionals, i sense `url` la fitxa es dibuixa com una caixa sense enllaç. El camí del logo es resol respecte del fitxer JSON: `../assets/logos/<id>.png`.

Les tres marques tenen el text revisat i les fonts documentades al camp `sources`, que es mostren al final de cada fitxa.

El manifest (`src/content/manifest.md`) no és una col·lecció; `manifest.astro` l'importa directament. És la Declaració de Terrassa del 22 de febrer de 2026, amb les signatures incloses. La llista de signants es manté al dia amb la coordinadora: si una entitat se'n va, s'esborra tant d'`organizations.json` com del manifest.

## Desplegament

El lloc es publica a GitHub Pages amb el domini `territorisambpalestina.cat`. El flux `.github/workflows/deploy.yml` construeix i desplega a cada push a `main`, i també es pot llançar a mà des de la pestanya Actions. El domini es declara a `public/CNAME` i ha de coincidir amb el camp `site` d'`astro.config.mjs`, que serveix per generar els enllaços canònics, les targetes socials i el `sitemap-index.xml`.

## Propostes de disseny

La carpeta `public/alternative-styles/` conté quatre maquetes estàtiques (A Onada, B Cartell, C Etiqueta i D Lletres) per revisar entre els membres de la coordinadora. Es publiquen a `/alternative-styles/` però no s'hi enllaça des d'enlloc, porten `noindex` i `robots.txt` les exclou. No formen part del lloc: quan s'hagi triat una direcció, es porta a `label.css` i la carpeta s'esborra.

## Convencions

Tot el que llegeix qui visita el lloc va en català: els textos, els títols, els textos alternatius de les imatges i el contingut de les col·leccions. Tot el que és tècnic va en anglès: les classes CSS, els components i les seves propietats, les variables, els comentaris, els noms de les col·leccions i dels camps, i els missatges de commit. Les rutes i els identificadors de les entrades són l'excepció —es veuen a les URL— i van en català i sense accents (`/qui-som/`, `comite-de-solidaritat-del-baix-llobregat`).

Els estils són CSS global, sense Tailwind ni blocs `<style>` locals. `base.css` només és un reinici; tot el sistema visual viu a `label.css`, amb els colors i les tipografies com a variables a `:root`. Feu servir les variables (`--ink`, `--coral`, `--yellow`…) en comptes de valors literals. Les classes segueixen la convenció BEM (`.header__logo`, `.brand__body`).

No hi ha tests ni linter. `npm run build` és l'única comprovació: els errors d'esquema del contingut surten en construir el lloc.
