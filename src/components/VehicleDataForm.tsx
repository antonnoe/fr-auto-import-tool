'use client';

import { VehicleDataFormValues } from '@/lib/types';
import { getSupportedRegions } from '@/lib/vehicleCosts';

const supportedRegions = getSupportedRegions();

const fieldStyle = {
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid rgba(128, 0, 0, 0.16)',
  background: '#ffffff'
} as const;

export function VehicleDataForm({
  values,
  onChange
}: {
  values: VehicleDataFormValues;
  onChange: (next: VehicleDataFormValues) => void;
}) {
  const updateField = (key: keyof VehicleDataFormValues, value: string) => {
    onChange({
      ...values,
      [key]: value
    });
  };

  return (
    <section>
      <div className="grid" style={{ marginTop: '18px' }}>
        <label>
          <strong>Datum eerste toelating</strong>
          <p className="muted" style={{ margin: '6px 0 8px 0' }}>
            Gebruik de eerste registratiedatum om btw- en CT-waarschuwingen te tonen.
          </p>
          <input
            style={fieldStyle}
            type="date"
            value={values.firstRegistrationDate}
            onChange={(event) => updateField('firstRegistrationDate', event.target.value)}
          />
        </label>

        <label>
          <strong>Regio van aanvraag</strong>
          <p className="muted" style={{ margin: '6px 0 8px 0' }}>
            De regionale belasting wordt alleen berekend voor bekende 2026-regio&apos;s.
          </p>
          <select
            style={fieldStyle}
            value={values.region}
            onChange={(event) => updateField('region', event.target.value)}
          >
            <option value="">Kies een regio</option>
            {supportedRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
            <option value="Onbekende regio">Onbekende regio / niet in lijst</option>
          </select>
        </label>

        <label>
          <strong>Vermogen in kW</strong>
          <p className="muted" style={{ margin: '6px 0 8px 0' }}>
            Nodig voor de fiscale pk-berekening.
          </p>
          <input
            style={fieldStyle}
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            placeholder="Bijvoorbeeld 110"
            value={values.powerKw}
            onChange={(event) => updateField('powerKw', event.target.value)}
          />
        </label>

        <label>
          <strong>CO₂-uitstoot in g/km</strong>
          <p className="muted" style={{ margin: '6px 0 8px 0' }}>
            Zonder CO₂ en kW blijft de fiscale pk bewust op niet berekend staan.
          </p>
          <input
            style={fieldStyle}
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            placeholder="Bijvoorbeeld 130"
            value={values.co2GramsPerKm}
            onChange={(event) => updateField('co2GramsPerKm', event.target.value)}
          />
        </label>

        <label>
          <strong>Kilometerstand</strong>
          <p className="muted" style={{ margin: '6px 0 8px 0' }}>
            Alleen gebruikt voor een waarschuwing over mogelijke btw-behandeling.
          </p>
          <input
            style={fieldStyle}
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            placeholder="Bijvoorbeeld 12000"
            value={values.mileageKm}
            onChange={(event) => updateField('mileageKm', event.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
