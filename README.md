# Je Nederlandse auto importeren en immatriculeren in Frankrijk (MVP)

Een eenvoudige Next.js MVP die Nederlandstalige gebruikers stap-voor-stap begeleidt bij import/inschrijving van specifieke voertuigen in Frankrijk.

## Wat is geïmplementeerd

- Guided intake flow in het Nederlands.
- Centrale route-engine met één bewerkbaar regelsbestand.
- Route-uitkomsten: A, B, C, D, E en X.
- Blokkeringsdiagnostiek voor:
  - ontbrekende quitus fiscal
  - ontbrekende/verlopen contrôle technique
  - ontbrekend adresbewijs
  - ontbrekend conformiteitsdocument
  - mismatch naam/adres/documenten
- Actieplan per stap met:
  - wat nu te doen
  - waar dit te doen
  - benodigde documenten
  - veelgemaakte fout
- Franse helperteksten:
  - korte mail aan garage
  - korte mail voor COC
  - kort telefoonscript voor CT
  - korte uitleg voor garage/balie
- Voorbeeldscenario’s om snel routes te demonstreren.

## Scope in deze MVP

Ondersteund:
- Personenauto’s uit Nederland / EU
- Campers t/m 3.5 ton
- Aanhangers/caravans met PTAC > 500 kg

Buiten scope:
- Niet-EU/USA import
- Campers > 3.5 ton
- Voertuigen in collection-categorie
- Authenticatie, database, OCR/AI documentverwerking
- Directe ANTS-koppeling, betalingen, admin-dashboard

## Techniek

- Next.js (App Router)
- TypeScript
- ESLint via `next lint`
- Gescheiden structuur:
  - `src/app`
  - `src/components`
  - `src/lib`
  - `src/rules`
  - `src/content`

Belangrijk: de beslislogica staat centraal in `src/rules/routeEngine.ts`.

## Lokaal draaien

Vereisten:
- Node.js 18.17+ (of 20 LTS)
- npm 9+

Installeren en starten:

```bash
npm install
npm run dev
```

Open daarna: `http://localhost:3000`

Checks:

```bash
npm run lint
npm run build
```

## Bekende omgevingsbeperking in Codex-runner

In sommige afgeschermde omgevingen kan `npm install` falen met `403 Forbidden` door registry/security policy. In dat geval is alleen een statische code-audit mogelijk; op een normale lokale machine met toegang tot `registry.npmjs.org` zouden install/lint/build moeten werken.

## Beperkingen / volgende stappen

- Geen juridische garantie; gebruiker moet altijd officiële validatie doen.
- Regels zijn vereenvoudigd voor MVP-doeleinden.
- Nog geen persistente opslag of dossier-export (PDF/print).
- Nog geen meertalige UI-instellingen (nu: Nederlands met Franse templates).
