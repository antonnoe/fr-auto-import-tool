import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateRoute } from '../src/rules/routeEngine';
import { IntakeAnswers } from '../src/lib/types';

const completeAnswers: IntakeAnswers = {
  vehicleType: 'personenauto',
  euOrigin: true,
  above35t: false,
  hasQuitusFiscal: true,
  hasControleTechniqueValid: true,
  hasProofOfAddress: true,
  hasConformityDoc: true,
  nameAddressMatch: true,
  wantsProfessionalHelp: false
};

test('naam- of documentmismatch geeft een specifieke vervolgstap', () => {
  const result = evaluateRoute({
    ...completeAnswers,
    nameAddressMatch: false
  });

  assert.equal(result.route, 'X');
  assert.deepEqual(result.currentStepIds, ['nameAddressMismatch']);
});

test('ontbrekend Frans adresbewijs geeft een specifieke vervolgstap', () => {
  const result = evaluateRoute({
    ...completeAnswers,
    hasProofOfAddress: false
  });

  assert.equal(result.route, 'X');
  assert.deepEqual(result.currentStepIds, ['missingProofOfAddress']);
});

test('twee dossierproblemen tonen twee verschillende vervolgstappen', () => {
  const result = evaluateRoute({
    ...completeAnswers,
    nameAddressMatch: false,
    hasProofOfAddress: false
  });

  assert.equal(result.route, 'X');
  assert.deepEqual(result.currentStepIds, [
    'nameAddressMismatch',
    'missingProofOfAddress'
  ]);
});
