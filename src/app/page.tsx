'use client';

import { useMemo, useState } from 'react';
import { IntakeForm } from '@/components/IntakeForm';
import { RouteResultPanel } from '@/components/RouteResultPanel';
import { FrenchHelpersPanel } from '@/components/FrenchHelpersPanel';
import { ScenarioButtons } from '@/components/ScenarioButtons';
import { initialAnswers } from '@/content/intake';
import { evaluateRoute } from '@/rules/routeEngine';

export default function HomePage() {
  const [answers, setAnswers] = useState(initialAnswers);
  const result = useMemo(() => evaluateRoute(answers), [answers]);

  return (
    <main>
      <h1>Je Nederlandse auto importeren en immatriculeren in Frankrijk</h1>
      <p className="muted">
        Begeleide MVP-tool voor Nederlandse/EU voertuigen. Deze tool geeft richting, maar officiële controle blijft nodig bij Franse instanties.
      </p>
      <small className="muted">
        Disclaimer: regels kunnen wijzigen. Verifieer altijd via officiële bronnen zoals <code>ants.gouv.fr</code>,
        belastingdienst en erkende controlecentra.
      </small>

      <ScenarioButtons onPick={setAnswers} />
      <IntakeForm answers={answers} onChange={setAnswers} />
      <RouteResultPanel result={result} />
      <FrenchHelpersPanel />
    </main>
  );
}
