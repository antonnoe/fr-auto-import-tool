import { ReactNode } from 'react';
import { frenchHelpers } from '@/content/helpers';

const termGlossary = [
  {
    term: 'quitus fiscal',
    description:
      'Fiscale verklaring waaruit blijkt dat het voertuig voor de Franse registratie fiscaal is beoordeeld.'
  },
  {
    term: 'contrôle technique',
    description:
      'De Franse technische keuring. Die is niet in elk dossier vereist, maar vaak wel bij gebruikte voertuigen.'
  },
  {
    term: 'COC',
    description:
      'Certificat de conformité: conformiteitsbewijs van de constructeur.'
  },
  {
    term: 'conformiteitsdocument',
    description:
      'Verzamelterm voor COC of een ander technisch document waaruit blijkt dat het voertuig kan worden geïdentificeerd of toegelaten.'
  },
  {
    term: 'professionnel habilité',
    description:
      'Erkende professional die een immatriculatieaanvraag in het SIV kan indienen.'
  },
  {
    term: 'carte grise',
    description:
      'Gebruikelijke benaming voor het Franse kentekenbewijs.'
  },
  {
    term: 'bewijs van adres',
    description:
      'Frans justificatif de domicile, bijvoorbeeld een recente energierekening of ander aanvaard adresbewijs.'
  }
];

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const sortedTerms = [...termGlossary].sort((a, b) => b.term.length - a.term.length);

const combinedPattern = new RegExp(
  sortedTerms.map((item) => escapeRegex(item.term)).join('|'),
  'gi'
);

function findDescription(match: string) {
  const found = termGlossary.find(
    (item) => item.term.toLowerCase() === match.toLowerCase()
  );
  return found?.description ?? '';
}

function InfoMarker({ description }: { description: string }) {
  return (
    <details
      style={{
        display: 'inline-block',
        position: 'relative',
        marginLeft: '6px',
        verticalAlign: 'middle'
      }}
    >
      <summary
        style={{
          listStyle: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '22px',
          height: '22px',
          borderRadius: '999px',
          border: '1px solid rgba(128, 0, 0, 0.22)',
          background: 'rgba(128, 0, 0, 0.08)',
          color: '#800000',
          fontSize: '0.78rem',
          fontWeight: 800,
          lineHeight: 1
        }}
      >
        [i]
      </summary>

      <div
        style={{
          position: 'absolute',
          top: '30px',
          left: 0,
          zIndex: 20,
          width: '280px',
          padding: '12px 14px',
          borderRadius: '12px',
          border: '1px solid rgba(128, 0, 0, 0.16)',
          background: '#ffffff',
          boxShadow: '0 12px 28px rgba(17, 17, 17, 0.10)',
          color: '#111111',
          fontSize: '0.92rem',
          lineHeight: 1.6
        }}
      >
        {description}
      </div>
    </details>
  );
}

function annotateInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  text.replace(combinedPattern, (match, _capture, offset: number) => {
    if (offset > lastIndex) {
      parts.push(text.slice(lastIndex, offset));
    }

    const description = findDescription(match);

    parts.push(
      <span
        key={`${match}-${offset}`}
        style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}
      >
        <span>{match}</span>
        {description ? <InfoMarker description={description} /> : null}
      </span>
    );

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function annotateMultiline(text: string) {
  const lines = text.split('\n');

  return lines.map((line, index) => {
    const isEmpty = line.trim() === '';

    return (
      <p
        key={`line-${index}`}
        style={{
          margin: isEmpty ? '0 0 10px 0' : '0 0 12px 0',
          whiteSpace: 'normal'
        }}
      >
        {isEmpty ? '\u00A0' : annotateInline(line)}
      </p>
    );
  });
}

export function FrenchHelpersPanel() {
  return (
    <section>
      <span className="badge">Franse voorbeeldteksten</span>
      <h2>Franse hulptemplates</h2>
      <p className="muted">
        Gebruik deze voorbeeldteksten als vertrekpunt voor contact met een garage,
        constructeur of controlepunt. Moeilijke termen hebben een klikbare
        toelichting.
      </p>

      <div
        style={{
          marginTop: '16px',
          marginBottom: '20px',
          padding: '16px 18px',
          borderRadius: '14px',
          border: '1px solid rgba(128, 0, 0, 0.14)',
          background: 'rgba(128, 0, 0, 0.03)'
        }}
      >
        <h3 style={{ marginBottom: '10px' }}>Belangrijke termen</h3>
        <div className="grid">
          {termGlossary.map((item) => (
            <div
              key={item.term}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(128, 0, 0, 0.12)',
                background: '#ffffff'
              }}
            >
              <strong>{item.term}</strong>
              <p className="muted" style={{ margin: '8px 0 0 0' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid">
        {frenchHelpers.map((helper) => (
          <article
            key={helper.title}
            className="card"
            style={{
              marginBottom: 0,
              background: 'rgba(128, 0, 0, 0.03)',
              border: '1px solid rgba(128, 0, 0, 0.12)'
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>{annotateInline(helper.title)}</h3>

            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid rgba(128, 0, 0, 0.10)'
              }}
            >
              {annotateMultiline(helper.body)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
