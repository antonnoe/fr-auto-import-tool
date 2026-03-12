import { sampleScenarios } from '@/content/scenarios';
import { IntakeAnswers } from '@/lib/types';

export function ScenarioButtons({
  onPick
}: {
  onPick: (answers: IntakeAnswers) => void;
}) {
  return (
    <section className="card">
      <span className="badge">Snelle start</span>
      <h2>Voorbeeldsituaties</h2>
      <p className="muted">
        Kies een voorbeeld om de tool direct met een realistische situatie te vullen.
        U kunt de antwoorden daarna nog aanpassen.
      </p>

      <div className="grid" style={{ marginTop: '14px' }}>
        {sampleScenarios.map((scenario) => (
          <button
            key={scenario.name}
            type="button"
            className="secondary"
            onClick={() => onPick(scenario.answers)}
            style={{ textAlign: 'left' }}
          >
            {scenario.name}
          </button>
        ))}
      </div>
    </section>
  );
}
