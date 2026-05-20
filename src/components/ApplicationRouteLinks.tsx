import { RouteAdviceKey } from '@/lib/types';

const options = [
  {
    key: 'zelf_indienen' as const,
    title: 'Zelf indienen',
    description:
      'Dien uw aanvraag zelf online in zodra uw dossier volledig en correct is samengesteld.',
    subtext:
      'Past het best bij een compleet dossier zonder directe blokkades.',
    links: [
      {
        href: 'https://immatriculation.ants.gouv.fr/',
        label: 'Naar France Titres / ANTS'
      }
    ]
  },
  {
    key: 'zelf_voorbereiden_professional' as const,
    title: 'Zelf voorbereiden + professional laten indienen',
    description:
      'U verzamelt en controleert zelf de documenten. Een professionnel habilité dient daarna de aanvraag voor u in.',
    subtext:
      'Praktisch als u grip wilt houden op het dossier, maar de formele indiening liever uitbesteedt.',
    links: [
      {
        href: 'https://immatriculation.ants.gouv.fr/services-et-formulaires/geolocaliser-des-professionnels-habilites-a-limmatriculation',
        label: 'Zoek een erkende professional'
      }
    ]
  },
  {
    key: 'eerst_specialist' as const,
    title: 'Eerst specialist / DREAL / fiscus / France Services',
    description:
      'Kies eerst specialistische of praktische begeleiding als uw dossier afwijkt, nog blokkades heeft of extra beoordeling nodig heeft.',
    subtext:
      'Denk aan DREAL bij technische twijfel, de fiscus voor quitus-vragen en France Services voor hulp bij digitale stappen.',
    links: [
      {
        href: 'https://www.ecologie.gouv.fr/dreal-et-deal',
        label: 'Zoek DREAL / DEAL'
      },
      {
        href: 'https://www.impots.gouv.fr/accueil',
        label: 'Naar de Franse fiscus'
      },
      {
        href: 'https://www.france-services.gouv.fr/le-reseau',
        label: 'Zoek een France Services-punt'
      }
    ]
  }
];

export function ApplicationRouteLinks({
  recommendedAdvice
}: {
  recommendedAdvice: RouteAdviceKey;
}) {
  return (
    <section className="card">
      <span className="badge">Officiële routes en hulp</span>
      <h2>Praktisch routeadvies</h2>
      <p className="muted">
        Kies de route die het best past bij uw situatie. De kaart met
        aanbeveling sluit aan op de uitkomst van de routechecker hierboven.
      </p>

      <div className="route-link-list">
        {options.map((option) => (
          <article
            key={option.title}
            className="route-link-card"
            style={
              option.key === recommendedAdvice
                ? {
                    borderColor: 'rgba(128, 0, 0, 0.3)',
                    background: 'rgba(128, 0, 0, 0.08)'
                  }
                : undefined
            }
          >
            {option.key === recommendedAdvice ? (
              <span className="badge" style={{ marginBottom: '12px' }}>
                Aanbevolen voor uw huidige situatie
              </span>
            ) : null}
            <h3>{option.title}</h3>
            <p>{option.description}</p>
            <p className="muted">{option.subtext}</p>
            <div
              style={{
                display: 'grid',
                gap: '10px',
                marginTop: 'auto'
              }}
            >
              {option.links.map((link) => (
                <a
                  key={link.href}
                  className="route-link-button"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
