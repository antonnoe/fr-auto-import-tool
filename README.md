# fr-auto-import-tool

Guided web tool for Dutch-speaking users who want to import and register a Dutch/EU vehicle in France.

## Purpose

This project is not an article site.

It is a guided dossier tool that helps users complete the French vehicle registration process step by step, either:
- by themselves via ANTS / France Titres, or
- through a local French garage or other authorised professional.

The tool must always show the user the **next required step**, based on their answers.

## Product language

- User interface: Dutch
- Helper texts: Dutch + short functional French output where needed
- Internal code/comments: English is acceptable

## Scope v1

Included:
- Passenger cars from Netherlands / EU
- Campers up to and including 3.5 tons
- Trailers / caravans with PTAC > 500 kg

Excluded:
- Non-EU / USA imports
- Campers above 3.5 tons
- Collection vehicles
- OCR / AI document reading
- Direct ANTS integration
- Accounts / login
- Payments
- Full legal automation

## Core user routes

The tool must support these outcome routes:

- Route A — Self-service via ANTS / France Titres
- Route B — Via a French garage / authorised professional
- Route C — First obtain quitus fiscal
- Route D — First obtain contrôle technique
- Route E — First obtain conformity document
- Route X — Outside scope / manual help needed

## Main functional blocks

### 1. Intake
Collect the minimum information needed to place the user in the correct route.

Examples:
- vehicle type
- EU or non-EU
- new or used
- older than 4 years or not
- COC available or not
- self-service or garage route

### 2. Decision engine
Translate user answers into one concrete route and next step.

### 3. Document checklist
Show only the documents relevant for the user’s exact situation.

Examples:
- foreign registration document
- proof of identity
- proof of address
- Cerfa 13750
- quitus fiscal
- contrôle technique
- COC / conformity document
- purchase invoice / transfer proof

### 4. Step-by-step action plan
For each step, the UI must answer:
1. What to do now
2. Where to do it
3. What documents are needed
4. Common mistake to avoid

### 5. French helper texts
Generate short, practical French texts such as:
- email to a garage
- email to request a COC
- short phone script for contrôle technique
- short explanation for a French garage or desk employee

### 6. Blocking diagnostics
Help the user understand why the dossier is incomplete or likely to be rejected.

Examples:
- missing quitus fiscal
- outdated contrôle technique
- missing proof of address
- missing conformity document
- mismatch in name or address

## UX principles

- Clear
- Minimal
- Non-technical
- Mobile-friendly
- No long legal essays
- No fake official output
- No invented legal certainty
- Always one clear next action

## Source policy

This project must stay strict on factual reliability.

Preferred official sources for future content/rules:
- Service-Public.fr
- ANTS / France Titres
- impots.gouv.fr
- official French administrative sources

The UI must not pretend to replace official validation.

## Suggested tech direction

Preferred stack:
- Next.js
- TypeScript
- Simple local rules engine
- No database for v1 unless clearly necessary

Important:
- keep logic modular
- separate UI, content, and rules
- avoid overengineering

## Recommended initial structure

```text
src/
  app/
  components/
  lib/
  rules/
  content/

public/
docs/
