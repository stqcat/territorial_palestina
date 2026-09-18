# Territoris Catalans amb Palestina

Lloc web de la coordinadora d'entitats de solidaritat amb Palestina dels Països
Catalans. Fet amb [Astro](https://astro.build), sense JavaScript al client.

Quatre pàgines: portada, **Boicot** (les empreses de la campanya), **Manifest** i
**Qui som** (les entitats que formen la coordinadora).

> **Atenció:** el contingut actual és esborrany. Els textos de les marques no
> tenen fonts (`fonts: []`), el manifest és un text pendent i totes les adreces
> de les entitats apunten a `example.org`. Cal revisar-ho i documentar-ho abans
> de publicar el lloc.

## Posar-lo en marxa

Cal Node 22.12 o superior.

```sh
npm install
npm run dev
```

El servidor s'arrenca en segon pla amb `npm run dev -- --background`, i es
gestiona amb `npx astro dev stop`, `npx astro dev status` i `npx astro dev logs`.

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
├── styles/           base.css (reinici) i etiqueta.css (el sistema visual)
└── assets/           logos i imatges, servits amb astro:assets
```

## Contingut

Les dues col·leccions es defineixen a `src/content.config.ts`.

**Marques** (`src/content/marques/*.md`) — una per empresa boicotejada. Cal
`nom`, `ordre`, `sector` i `resum`; opcionalment `alternatives` i `fonts`.
S'ordenen pel camp `ordre`, no pel nom del fitxer, i l'identificador de l'entrada
és l'àncora que hi enllaça la portada (`/boicot/#teva`).

**Organitzacions** (`src/content/organitzacions.json`) — les entitats de la
coordinadora. Cada entrada necessita `id`, `nom`, `url` i, si en té, `logo`. El
camí del logo es resol respecte del fitxer JSON: `../assets/logos/<id>.png`.

El manifest (`src/content/manifest.md`) no és una col·lecció; `manifest.astro`
l'importa directament.

## Convencions

Tot s'escriu en català: els textos, els noms de fitxer, les classes CSS, les
propietats dels components i els missatges de commit. Els identificadors van
sense accents (`comite-de-solidaritat-del-baix-llobregat`).

Els estils són CSS global, sense Tailwind ni blocs `<style>` locals.
`base.css` només és un reinici; tot el sistema visual viu a `etiqueta.css`, amb
els colors i les tipografies com a variables a `:root`. Feu servir les variables
(`--tinta`, `--coral`, `--groc`…) en comptes de valors literals. Les classes
segueixen la convenció BEM amb noms catalans (`.capcalera__logo`, `.marca__cos`).

No hi ha tests ni linter. `npm run build` és l'única comprovació: els errors
d'esquema del contingut surten en construir el lloc.
