'use client';

import { useMemo, useState } from 'react';
import { IntakeForm } from '@/components/IntakeForm';
import { RouteResultPanel } from '@/components/RouteResultPanel';
import { FrenchHelpersPanel } from '@/components/FrenchHelpersPanel';
import { ScenarioButtons } from '@/components/ScenarioButtons';
import { ApplicationRouteLinks } from '@/components/ApplicationRouteLinks';
import { initialAnswers } from '@/content/intake';
import { evaluateRoute } from '@/rules/routeEngine';

export default function HomePage() {
  const [answers, setAnswers] = useState(initialAnswers);
  const result = useMemo(() => evaluateRoute(answers), [answers]);

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

      <ApplicationRouteLinks />

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
