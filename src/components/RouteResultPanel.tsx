import { actionSteps } from '@/rules/steps';
import { RouteResult } from '@/lib/types';

export function RouteResultPanel({ result }: { result: RouteResult }) {
  return (
    <section className="card">
      <h2>2) Jouw route</h2>
      <span className="badge">{result.title}</span>
      <p>{result.reason}</p>

      {result.blockers.length > 0 && (
        <>
          <h3>Blokkades</h3>
          {result.blockers.map((blocker) => (
            <div key={blocker} className="alert">
              {blocker}
            </div>
          ))}
        </>
      )}

      <h3>Volgende acties</h3>
      {result.currentStepIds.map((stepId, idx) => {
        const step = actionSteps[stepId];
        if (!step) return null;
        return (
          <article key={step.id} className="card" style={{ background: '#f9fafb' }}>
            <strong>Stap {idx + 1}: {step.title}</strong>
            <p><strong>Wat nu:</strong> {step.doNow}</p>
            <p><strong>Waar:</strong> {step.where}</p>
            <p><strong>Benodigde documenten:</strong></p>
            <ul>
              {step.neededDocs.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
            <p><strong>Veelgemaakte fout:</strong> {step.commonMistake}</p>
          </article>
        );
      })}
    </section>
  );
}
