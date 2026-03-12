import React from 'react';

const options = [
  {
    title: 'Zelf online aanvragen via France Titres / ANTS',
    description:
      'Dien uw aanvraag zelf online in zodra uw dossier compleet is.',
    subtext:
      'Voor gebruikers die alle documenten zelf willen uploaden en de aanvraag zelfstandig willen afronden.',
    href: 'https://immatriculation.ants.gouv.fr/'
  },
  {
    title: 'Voorbereiding zelf, indiening via professional',
    description:
      'U verzamelt en controleert zelf de documenten. Een professionnel habilité dient daarna de aanvraag voor u in.',
    subtext:
      'Praktisch als u de voorbereiding zelf wilt doen, maar de formele indiening liever laat afhandelen.',
    href: 'https://immatriculation.ants.gouv.fr/services-et-formulaires/geolocaliser-des-professionnels-habilites-a-limmatriculation'
  },
  {
    title: 'Volledig laten doen door een erkende professional',
    description:
      'Zoek een erkend garagebedrijf of andere professional habilité in uw regio.',
    subtext:
      'Geschikt als u de voorbereiding en indiening liever zo veel mogelijk uit handen geeft.',
    href: 'https://immatriculation.ants.gouv.fr/services-et-formulaires/geolocaliser-des-professionnels-habilites-a-limmatriculation'
  },
  {
    title: 'Hulp zoeken bij France Services',
    description:
      'Krijg hulp bij uw digitale aanvraag zonder de hele procedure uit handen te geven.',
    subtext:
      'Bedoeld voor gebruikers die zelf willen indienen, maar ondersteuning nodig hebben bij formulieren, scans of online stappen.',
    href: 'https://www.france-services.gouv.fr/le-reseau'
  }
];

export function ApplicationRouteLinks() {
  return (
    <section className="card">
      <span className="badge">Loket-finder</span>
      <h2>Waar wilt u uw aanvraag regelen?</h2>
      <p className="muted">
        Kies de route die het best past bij uw situatie. U kunt zelf online
        indienen, de voorbereiding zelf doen en de indiening laten afhandelen,
        alles laten doen door een erkende professional, of hulp zoeken bij een
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
            >
              Open officiële pagina
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
