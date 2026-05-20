'use client';

import { useMemo, useState } from 'react';
import { IntakeForm } from '@/components/IntakeForm';
import { RouteResultPanel } from '@/components/RouteResultPanel';
import { FrenchHelpersPanel } from '@/components/FrenchHelpersPanel';
import { ScenarioButtons } from '@/components/ScenarioButtons';
import { ApplicationRouteLinks } from '@/components/ApplicationRouteLinks';
import { VehicleDataForm } from '@/components/VehicleDataForm';
import { initialAnswers, initialVehicleData } from '@/content/intake';
import { RouteAdviceKey, VehicleDataFormValues } from '@/lib/types';
import { calculateVehicleCosts } from '@/lib/vehicleCosts';
import { evaluateRoute } from '@/rules/routeEngine';

const currencyFormatter = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR'
});

const dateFormatter = new Intl.DateTimeFormat('nl-NL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

function parseOptionalNumber(value: string) {
  if (value.trim() === '') {
    return null;
  }

  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatCurrency(value: number | null) {
  return value === null ? 'niet berekend' : currencyFormatter.format(value);
}

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed);
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function getRecommendedAdvice(route: string): RouteAdviceKey {
  if (route === 'A') {
    return 'zelf_indienen';
  }

  if (route === 'B') {
    return 'zelf_voorbereiden_professional';
  }

  return 'eerst_specialist';
}

export default function HomePage() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [vehicleData, setVehicleData] = useState<VehicleDataFormValues>(initialVehicleData);
  const result = useMemo(() => evaluateRoute(answers), [answers]);
  const recommendedAdvice = useMemo(
    () => getRecommendedAdvice(result.route),
    [result.route]
  );
  const costEstimate = useMemo(
    () =>
      calculateVehicleCosts({
        calculationDate: getTodayIsoDate(),
        region: vehicleData.region,
        firstRegistrationDate: vehicleData.firstRegistrationDate,
        powerKw: parseOptionalNumber(vehicleData.powerKw),
        co2GramsPerKm: parseOptionalNumber(vehicleData.co2GramsPerKm),
        mileageKm: parseOptionalNumber(vehicleData.mileageKm),
        hasValidControleTechnique: answers.hasControleTechniqueValid
      }),
    [answers.hasControleTechniqueValid, vehicleData]
  );

  return (
    <main>
      <section className="card">
        <span className="badge">MVP-tool</span>
        <h1>Je Nederlandse auto importeren en immatriculeren in Frankrijk</h1>
        <p className="muted">
          Deze tool ondersteunt vooral de doe-het-zelver. U krijgt stap voor stap
          te zien wat u eerst moet regelen, welke documenten nodig zijn en welke
          route het meest logisch is: zelf indienen, voorbereiding zelf doen en
          indiening via een professional, of hulp zoeken bij een begeleidingspunt.
        </p>
        <div className="alert">
          Deze tool geeft richting, maar vervangt geen officiële controle. De
          uiteindelijke beoordeling van uw dossier blijft afhankelijk van de Franse
          instanties en de juistheid van uw documenten.
        </div>
        <small className="muted">
          Verifieer altijd via officiële bronnen zoals <code>immatriculation.ants.gouv.fr</code>,
          de belastingdienst en erkende controlecentra.
        </small>
      </section>

      <ScenarioButtons onPick={setAnswers} />

      <section className="card">
        <h2>Stap 1 — Vul uw situatie in</h2>
        <p className="muted">
          Beantwoord de vragen zo volledig mogelijk. Op basis daarvan bepaalt de
          tool welke stap u eerst moet zetten.
        </p>
        <IntakeForm answers={answers} onChange={setAnswers} />
      </section>

      <section className="card">
        <h2>Stap 2 — Uw eerstvolgende route</h2>
        <p className="muted">
          Hieronder ziet u welke route nu het meest logisch is en welke blokkades
          eerst moeten worden opgelost.
        </p>
        <RouteResultPanel result={result} />
      </section>

      <section className="card">
        <h2>Stap 3 — Vul uw voertuiggegevens aan</h2>
        <p className="muted">
          Deze extra gegevens zijn alleen bedoeld voor een voorzichtige
          kostenschatting. Als CO₂, vermogen of regio ontbreken, blijft het
          betreffende onderdeel bewust op niet berekend staan.
        </p>
        <VehicleDataForm values={vehicleData} onChange={setVehicleData} />
      </section>

      <section className="card">
        <h2>Stap 4 — Voorzichtige kostenschatting</h2>
        <p className="muted">
          Hieronder ziet u alleen posten die lokaal en voorzichtig kunnen worden
          benaderd met de momenteel opgenomen 2026-gegevens.
        </p>

        <div
          style={{
            overflowX: 'auto',
            marginTop: '16px',
            borderRadius: '14px',
            border: '1px solid rgba(128, 0, 0, 0.12)'
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: '#ffffff'
            }}
          >
            <thead>
              <tr style={{ background: 'rgba(128, 0, 0, 0.05)' }}>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>Onderdeel</th>
                <th style={{ padding: '12px 14px', textAlign: 'left' }}>Uitkomst</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: 'Fiscale pk (CV)',
                  value:
                    costEstimate.fiscalHorsepower === null
                      ? 'niet berekend'
                      : String(costEstimate.fiscalHorsepower)
                },
                {
                  label: 'Regio',
                  value: costEstimate.selectedRegionLabel ?? 'niet opgegeven'
                },
                {
                  label: 'Regionaal tarief per CV',
                  value: formatCurrency(costEstimate.regionalCvRate)
                },
                {
                  label: 'Regionale belasting',
                  value: formatCurrency(costEstimate.regionalTax)
                },
                {
                  label: 'Vaste behandelkosten',
                  value: formatCurrency(costEstimate.fixedManagementFee)
                },
                {
                  label: 'Verzendkosten kentekenbewijs',
                  value: formatCurrency(costEstimate.deliveryFee)
                },
                {
                  label: 'CO₂-malus',
                  value: 'niet berekend'
                },
                {
                  label: 'Gewichts-malus',
                  value: 'niet berekend'
                },
                {
                  label: 'Totaal van bekende posten',
                  value: formatCurrency(costEstimate.knownTotal)
                }
              ].map((row) => (
                <tr key={row.label} style={{ borderTop: '1px solid rgba(128, 0, 0, 0.08)' }}>
                  <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>{row.label}</td>
                  <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {costEstimate.warnings.length > 0 ? (
          <div style={{ marginTop: '18px' }}>
            <h3>Belangrijke aandachtspunten</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {costEstimate.warnings.map((warning) => (
                <div key={warning} className="alert">
                  {warning}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div
          style={{
            marginTop: '18px',
            padding: '16px 18px',
            borderRadius: '14px',
            border: '1px solid rgba(128, 0, 0, 0.14)',
            background: 'rgba(128, 0, 0, 0.03)'
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>Belangrijke disclaimers</h3>
          <ul>
            <li>Deze kosten blijven schattingen en geen officiële vaststelling.</li>
            <li>Praktische kosten kunnen afwijken door dossierdetails, uitzonderingen en timing.</li>
            <li>
              De definitieve beoordeling blijft bij France Titres / ANTS en andere
              bevoegde instanties.
            </li>
          </ul>
        </div>

        <div style={{ marginTop: '18px' }}>
          <h3>Bronnen en controledata</h3>
          <div className="grid" style={{ marginTop: '12px' }}>
            {[
              {
                label: '2026 regionale CV-tarieven',
                source: costEstimate.sources.regionalRates
              },
              {
                label: '2026 vaste kosten',
                source: costEstimate.sources.fixedFees
              }
            ].map((item) => (
              <article
                key={item.label}
                style={{
                  padding: '16px 18px',
                  borderRadius: '14px',
                  border: '1px solid rgba(128, 0, 0, 0.12)',
                  background: '#ffffff'
                }}
              >
                <h3 style={{ marginBottom: '10px' }}>{item.label}</h3>
                <p>
                  <strong>Bron:</strong>{' '}
                  <a href={item.source.sourceUrl} target="_blank" rel="noreferrer">
                    {item.source.sourceName}
                  </a>
                </p>
                <p>
                  <strong>Jaar:</strong> {item.source.year}
                </p>
                <p style={{ marginBottom: 0 }}>
                  <strong>Laatst gecontroleerd:</strong> {formatDate(item.source.lastChecked)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ApplicationRouteLinks recommendedAdvice={recommendedAdvice} />

      <section className="card">
        <h2>Franse voorbeeldteksten</h2>
        <p className="muted">
          Gebruik deze teksten als startpunt voor contact met een garage,
          constructeur of controlepunt.
        </p>
        <FrenchHelpersPanel />
      </section>
    </main>
  );
}
