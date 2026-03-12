import { frenchHelpers } from '@/content/helpers';

export function FrenchHelpersPanel() {
  return (
    <section className="card">
      <h2>3) Franse hulptemplates</h2>
      <div className="grid">
        {frenchHelpers.map((helper) => (
          <article key={helper.title} className="card" style={{ marginBottom: 0, background: '#f9fafb' }}>
            <h3>{helper.title}</h3>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{helper.body}</pre>
          </article>
        ))}
      </div>
    </section>
  );
}
