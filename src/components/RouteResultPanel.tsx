import { actionSteps } from '@/rules/steps';
import { RouteResult } from '@/lib/types';

export function RouteResultPanel({ result }: { result: RouteResult }) {
  const steps = result.currentStepIds
    .map((stepId) => actionSteps[stepId])
    .filter(Boolean);

  const hasBlockers = result.blockers.length > 0;
  const hasSteps = steps.length > 0;

  return (
    <section className="card">
      <span className="badge">Uw route-uitkomst</span>
      <h2>{result.title}</h2>
      <p className="muted">{result.reason}</p>

      {hasBlockers ? (
        <div style={{ marginTop: '18px' }}>
          <h3>Wat eerst moet worden opgelost</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {result.blockers.map((blocker) => (
              <div key={blocker} className="alert">
                <strong>Blokkade:</strong> {blocker}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: '18px',
            padding: '14px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(128, 0, 0, 0.14)',
            background: 'rgba(128, 0, 0, 0.04)'
          }}
        >
          <strong>Goed nieuws:</strong> er zijn op basis van uw huidige invoer geen directe blokkades zichtbaar.
        </div>
      )}

      <div style={{ marginTop: '22px' }}>
        <h3>Uw eerstvolgende stappen</h3>
        <p className="muted">
          Werk deze stappen in volgorde af. Per stap ziet u wat u nu moet doen,
          waar u dat doet, welke documenten nodig zijn en welke fout vaak wordt gemaakt.
        </p>

        {hasSteps ? (
          <div style={{ display: 'grid', gap: '14px', marginTop: '14px' }}>
            {steps.map((step, idx) => (
              <article
                key={step.id}
                style={{
                  background: 'rgba(128, 0, 0, 0.03)',
                  border: '1px solid rgba(128, 0, 0, 0.12)',
                  borderRadius: '16px',
                  padding: '18px'
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    marginBottom: '10px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: 'rgba(128, 0, 0, 0.08)',
                    color: '#800000',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  Stap {idx + 1}
                </div>

                <h3 style={{ marginBottom: '10px' }}>{step.title}</h3>

                <p>
                  <strong>Wat nu:</strong> {step.doNow}
                </p>

                <p>
                  <strong>Waar:</strong> {step.where}
                </p>

                <p style={{ marginBottom: '8px' }}>
                  <strong>Benodigde documenten:</strong>
                </p>

                {step.neededDocs.length > 0 ? (
                  <ul>
                    {step.neededDocs.map((doc) => (
                      <li key={doc}>{doc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="muted">Geen extra documenten opgegeven voor deze stap.</p>
                )}

                <div
                  style={{
                    marginTop: '14px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: '#ffffff',
                    border: '1px solid rgba(128, 0, 0, 0.12)'
                  }}
                >
                  <strong>Veelgemaakte fout:</strong> {step.commonMistake}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            style={{
              marginTop: '14px',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(128, 0, 0, 0.14)',
              background: '#ffffff'
            }}
          >
            <strong>Nog geen vervolgstappen zichtbaar.</strong>
            <p className="muted" style={{ margin: '8px 0 0 0' }}>
              Vul eerst uw situatie volledig in. Daarna toont de tool automatisch
              welke route en welke concrete stappen voor u gelden.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
