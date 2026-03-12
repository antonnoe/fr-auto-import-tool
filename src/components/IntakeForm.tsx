'use client';

import { IntakeAnswers, VehicleType } from '@/lib/types';

type YesNoField = Exclude<keyof IntakeAnswers, 'vehicleType'>;

type Question = {
  key: YesNoField;
  label: string;
  help?: string;
};

const vehicleOptions: Array<{ value: VehicleType; label: string; help: string }> = [
  {
    value: 'personenauto',
    label: 'Personenauto',
    help: 'Voor een gewone personenwagen op Nederlands of ander EU-kenteken.'
  },
  {
    value: 'camper_tot_35t',
    label: 'Camper tot en met 3,5 ton',
    help: 'Voor campers tot en met 3,5 ton totaalgewicht.'
  },
  {
    value: 'aanhanger_caravan',
    label: 'Aanhanger / caravan (PTAC > 500 kg)',
    help: 'Alleen voor aanhangers of caravans met een eigen registratieplicht.'
  }
];

const questions: Record<YesNoField, Question> = {
  euOrigin: {
    key: 'euOrigin',
    label: 'Komt het voertuig uit Nederland of een ander EU-land?',
    help: 'Deze tool is alleen bedoeld voor voertuigen uit Nederland of een ander EU-land.'
  },
  above35t: {
    key: 'above35t',
    label: 'Is het voertuig zwaarder dan 3,5 ton?',
    help: 'Voertuigen boven 3,5 ton vallen buiten deze eerste versie.'
  },
  hasQuitusFiscal: {
    key: 'hasQuitusFiscal',
    label: 'Beschikt u al over een quitus fiscal?',
    help: 'Dit fiscale document is vaak nodig vóór de aanvraag van de carte grise.'
  },
  hasControleTechniqueValid: {
    key: 'hasControleTechniqueValid',
    label: 'Beschikt u al over een geldige contrôle technique, indien die vereist is?',
    help: 'Voor bepaalde voertuigen is een geldige Franse keuring nodig.'
  },
  hasProofOfAddress: {
    key: 'hasProofOfAddress',
    label: 'Beschikt u al over een Frans bewijs van adres?',
    help: 'Bijvoorbeeld een recente energierekening of ander aanvaard adresbewijs.'
  },
  hasConformityDoc: {
    key: 'hasConformityDoc',
    label: 'Beschikt u al over een COC of ander conformiteitsdocument?',
    help: 'Bijvoorbeeld een certificat de conformité of een gelijkwaardig technisch document.'
  },
  nameAddressMatch: {
    key: 'nameAddressMatch',
    label: 'Komen naam en adres op alle documenten exact overeen?',
    help: 'Afwijkingen in naam- of adresgegevens veroorzaken vaak vertraging of weigering.'
  },
  wantsProfessionalHelp: {
    key: 'wantsProfessionalHelp',
    label: 'Wilt u de indiening laten verzorgen door een garage of professionnel habilité?',
    help: 'U kunt de voorbereiding zelf doen en de formele indiening laten afhandelen.'
  }
};

const questionSets: Record<VehicleType, YesNoField[]> = {
  personenauto: [
    'euOrigin',
    'above35t',
    'hasQuitusFiscal',
    'hasControleTechniqueValid',
    'hasProofOfAddress',
    'hasConformityDoc',
    'nameAddressMatch',
    'wantsProfessionalHelp'
  ],
  camper_tot_35t: [
    'euOrigin',
    'above35t',
    'hasQuitusFiscal',
    'hasControleTechniqueValid',
    'hasProofOfAddress',
    'hasConformityDoc',
    'nameAddressMatch',
    'wantsProfessionalHelp'
  ],
  aanhanger_caravan: [
    'euOrigin',
    'above35t',
    'hasProofOfAddress',
    'hasConformityDoc',
    'nameAddressMatch',
    'wantsProfessionalHelp'
  ]
};

function resetIrrelevantAnswers(nextVehicleType: VehicleType, answers: IntakeAnswers): IntakeAnswers {
  const relevant = new Set(questionSets[nextVehicleType]);

  const next: IntakeAnswers = {
    ...answers,
    vehicleType: nextVehicleType
  };

  (Object.keys(questions) as YesNoField[]).forEach((key) => {
    if (!relevant.has(key)) {
      next[key] = null;
    }
  });

  return next;
}

export function IntakeForm({
  answers,
  onChange
}: {
  answers: IntakeAnswers;
  onChange: (next: IntakeAnswers) => void;
}) {
  const activeQuestions = answers.vehicleType ? questionSets[answers.vehicleType] : [];

  return (
    <section>
      <h2>Uw situatie</h2>
      <p className="muted">
        Beantwoord de vragen zo volledig mogelijk. De tool bepaalt daarna welke stap u het best eerst zet.
      </p>

      <div style={{ marginTop: '18px' }}>
        <h3>Type voertuig</h3>
        <div className="grid">
          {vehicleOptions.map((option) => (
            <label key={option.value} className="option" style={{ marginBottom: 0 }}>
              <input
                type="radio"
                name="vehicleType"
                checked={answers.vehicleType === option.value}
                onChange={() => onChange(resetIrrelevantAnswers(option.value, answers))}
              />
              <strong>{option.label}</strong>
              <div className="muted" style={{ marginTop: '6px' }}>
                {option.help}
              </div>
            </label>
          ))}
        </div>
      </div>

      {!answers.vehicleType ? (
        <div
          style={{
            marginTop: '18px',
            padding: '14px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(128, 0, 0, 0.14)',
            background: 'rgba(128, 0, 0, 0.03)'
          }}
        >
          Kies eerst het voertuigtype.
        </div>
      ) : (
        <div style={{ marginTop: '22px' }}>
          {activeQuestions.map((key) => {
            const question = questions[key];

            return (
              <div key={question.key} style={{ marginTop: '0.9rem' }}>
                <h3 style={{ marginBottom: '8px' }}>{question.label}</h3>

                {question.help ? (
                  <p className="muted" style={{ marginBottom: '10px' }}>
                    {question.help}
                  </p>
                ) : null}

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
                  <label className="option" style={{ marginBottom: 0 }}>
                    <input
                      type="radio"
                      name={question.key}
                      checked={answers[question.key] === true}
                      onChange={() => onChange({ ...answers, [question.key]: true })}
                    />
                    Ja
                  </label>

                  <label className="option" style={{ marginBottom: 0 }}>
                    <input
                      type="radio"
                      name={question.key}
                      checked={answers[question.key] === false}
                      onChange={() => onChange({ ...answers, [question.key]: false })}
                    />
                    Nee
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
