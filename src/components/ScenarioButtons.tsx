import { sampleScenarios } from '@/content/scenarios';
import { IntakeAnswers } from '@/lib/types';

export function ScenarioButtons({ onPick }: { onPick: (answers: IntakeAnswers) => void }) {
  return (
    <section className="card">
      <h2>Snelle demo-scenario's</h2>
      <div className="grid">
        {sampleScenarios.map((scenario) => (
          <button key={scenario.name} type="button" className="secondary" onClick={() => onPick(scenario.answers)}>
            {scenario.name}
          </button>
        ))}
      </div>
    </section>
  );
}
