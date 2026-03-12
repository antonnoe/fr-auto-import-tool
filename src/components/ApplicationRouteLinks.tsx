const options = [
  {
    title: 'Zelf online indienen via France Titres / ANTS',
    description:
      'Dien uw aanvraag zelf online in zodra uw dossier volledig en correct is samengesteld.',
    subtext:
      'Geschikt voor gebruikers die de hele procedure zelf willen afhandelen.',
    href: 'https://immatriculation.ants.gouv.fr/',
    cta: 'Naar France Titres / ANTS'
  },
  {
    title: 'Voorbereiding zelf, indiening via professional',
    description:
      'U verzamelt en controleert zelf de documenten. Een professionnel habilité dient daarna de aanvraag voor u in.',
    subtext:
      'Praktisch als u grip wilt houden op het dossier, maar de formele indiening liever uitbesteedt.',
    href: 'https://immatriculation.ants.gouv.fr/services-et-formulaires/geolocaliser-des-professionnels-habilites-a-limmatriculation',
    cta: 'Zoek een erkende professional'
  },
  {
    title: 'Volledig laten doen door een erkende professional',
    description:
      'Zoek een garagebedrijf of andere erkende professional die u kan begeleiden bij voorbereiding en indiening.',
    subtext:
      'Geschikt als u zo weinig mogelijk zelf wilt regelen en bereid bent voor die dienstverlening te betalen.',
    href: 'https://immatriculation.ants.gouv.fr/services-et-formulaires/geolocaliser-des-professionnels-habilites-a-limmatriculation',
    cta: 'Open de officiële annuaire'
  },
  {
    title: 'Hulp zoeken bij France Services',
    description:
      'Krijg ondersteuning bij de digitale aanvraag zonder de procedure volledig uit handen te geven.',
    subtext:
      'Nuttig als u de aanvraag zelf wilt doen, maar hulp nodig hebt bij formulieren, scans of online stappen.',
    href: 'https://www.france-services.gouv.fr/le-reseau',
    cta: 'Zoek een France Services-punt'
  }
];

export function ApplicationRouteLinks() {
  return (
    <section className="card">
      <span className="badge">Officiële routes en hulp</span>
      <h2>Waar wilt u uw aanvraag regelen?</h2>
      <p className="muted">
        Kies de route die het best past bij uw situatie. U kunt zelf online
        indienen, de voorbereiding zelf doen en de indiening laten verzorgen,
        alles uitbesteden aan een erkende professional, of hulp zoeken bij een
        France Services-punt.
      </p>

      <div className="route-link-list">
        {options.map((option) => (
          <article key={option.title} className="route-link-card">
            <h3>{option.title}</h3>
            <p>{option.description}</p>
            <p className="muted">{option.subtext}</p>
            <a
              className="route-link-button"
              href={option.href}
              target="_blank"
              rel="noreferrer"
              aria-label={option.title}
            >
              {option.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
