import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFiscalHorsepower,
  calculateVehicleCosts
} from '../src/lib/vehicleCosts';

test('berekent fiscale pk als CO₂ en kW aanwezig zijn', () => {
  assert.equal(
    calculateFiscalHorsepower({
      powerKw: 110,
      co2GramsPerKm: 130
    }),
    7
  );
});

test('laat fiscale pk leeg als CO₂ of kW ontbreekt', () => {
  assert.equal(
    calculateFiscalHorsepower({
      powerKw: 110,
      co2GramsPerKm: null
    }),
    null
  );
  assert.equal(
    calculateFiscalHorsepower({
      powerKw: null,
      co2GramsPerKm: 130
    }),
    null
  );
});

test('toont een btw-waarschuwing voor een voertuig dat nog als nieuw kan gelden', () => {
  const estimate = calculateVehicleCosts({
    calculationDate: '2026-05-20',
    firstRegistrationDate: '2026-02-01',
    mileageKm: 7000,
    hasValidControleTechnique: true
  });

  assert.match(estimate.warnings.join(' '), /btw-aandachtspunt/i);
});

test('toont een CT-waarschuwing voor oudere voertuigen zonder geldige keuring', () => {
  const estimate = calculateVehicleCosts({
    calculationDate: '2026-05-20',
    firstRegistrationDate: '2020-01-10',
    hasValidControleTechnique: false
  });

  assert.match(estimate.warnings.join(' '), /contrôle technique/i);
});

test('berekent geen regionale belasting voor een onbekende regio', () => {
  const estimate = calculateVehicleCosts({
    calculationDate: '2026-05-20',
    firstRegistrationDate: '2022-05-20',
    powerKw: 110,
    co2GramsPerKm: 130,
    region: 'Atlantis',
    hasValidControleTechnique: true
  });

  assert.equal(estimate.regionalCvRate, null);
  assert.equal(estimate.regionalTax, null);
});

test('berekent de regionale belasting met het 2026-tarief van Hauts-de-France', () => {
  const estimate = calculateVehicleCosts({
    calculationDate: '2026-05-20',
    firstRegistrationDate: '2022-05-20',
    powerKw: 110,
    co2GramsPerKm: 130,
    region: 'Hauts-de-France',
    hasValidControleTechnique: true
  });

  assert.equal(estimate.fiscalHorsepower, 7);
  assert.equal(estimate.regionalCvRate, 43);
  assert.equal(estimate.regionalTax, 301);
});
