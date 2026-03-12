'use client';

import { IntakeAnswers, VehicleType } from '@/lib/types';

type YesNoField = Exclude<keyof IntakeAnswers, 'vehicleType'>;

const questionOrder: Array<{ key: YesNoField; label: string }> = [
  { key: 'euOrigin', label: 'Komt het voertuig uit Nederland of een ander EU-land?' },
  { key: 'above35t', label: 'Is het voertuig zwaarder dan 3.5 ton?' },
  { key: 'hasQuitusFiscal', label: 'Heb je al een quitus fiscal?' },
  { key: 'hasControleTechniqueValid', label: 'Heb je een geldige contrôle technique (indien van toepassing)?' },
  { key: 'hasProofOfAddress', label: 'Heb je een Frans adresbewijs?' },
  { key: 'hasConformityDoc', label: 'Heb je een COC of ander conformiteitsdocument?' },
  { key: 'nameAddressMatch', label: 'Komen naam en adres op alle documenten exact overeen?' },
  { key: 'wantsProfessionalHelp', label: 'Wil je dat een garage/professional het dossier indient?' }
];

const vehicleOptions: Array<{ value: VehicleType; label: string }> = [
  { value: 'personenauto', label: 'Personenauto' },
  { value: 'camper_tot_35t', label: 'Camper tot en met 3.5 ton' },
  { value: 'aanhanger_caravan', label: 'Aanhanger / caravan (PTAC > 500 kg)' }
];

export function IntakeForm({
  answers,
  onChange
}: {
  answers: IntakeAnswers;
  onChange: (next: IntakeAnswers) => void;
}) {
  return (
    <section className="card">
      <h2>1) Intake</h2>
      <p className="muted">Beantwoord de vragen. De tool toont meteen jouw volgende verplichte stap.</p>

      <h3>Type voertuig</h3>
      {vehicleOptions.map((option) => (
        <label key={option.value} className="option">
          <input
            type="radio"
            name="vehicleType"
            checked={answers.vehicleType === option.value}
            onChange={() => onChange({ ...answers, vehicleType: option.value })}
          />
          {option.label}
        </label>
      ))}

      {questionOrder.map((q) => (
        <div key={q.key} style={{ marginTop: '0.8rem' }}>
          <h3>{q.label}</h3>
          <label className="option">
            <input
              type="radio"
              name={q.key}
              checked={answers[q.key] === true}
              onChange={() => onChange({ ...answers, [q.key]: true })}
            />
            Ja
          </label>
          <label className="option">
            <input
              type="radio"
              name={q.key}
              checked={answers[q.key] === false}
              onChange={() => onChange({ ...answers, [q.key]: false })}
            />
            Nee
          </label>
        </div>
      ))}
    </section>
  );
}
