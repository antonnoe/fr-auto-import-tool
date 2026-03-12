import { describe, expect, it } from 'vitest';
import { evaluateRoute } from '@/rules/routeEngine';
import { IntakeAnswers } from '@/lib/types';

function createCompletePersonenautoAnswers(): IntakeAnswers {
  return {
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
}

describe('evaluateRoute', () => {
  it('returns Route X for incomplete intake', () => {
    const answers = {
      ...createCompletePersonenautoAnswers(),
      hasQuitusFiscal: null
    };

    expect(evaluateRoute(answers).route).toBe('X');
  });

  it('returns Route A for complete personenauto dossier without professional help', () => {
    const result = evaluateRoute(createCompletePersonenautoAnswers());

    expect(result.route).toBe('A');
  });

  it('returns Route B for complete personenauto dossier with professional help', () => {
    const result = evaluateRoute({
      ...createCompletePersonenautoAnswers(),
      wantsProfessionalHelp: true
    });

    expect(result.route).toBe('B');
  });

  it('returns Route C when quitus fiscal is missing for relevant vehicles', () => {
    const result = evaluateRoute({
      ...createCompletePersonenautoAnswers(),
      hasQuitusFiscal: false
    });

    expect(result.route).toBe('C');
  });

  it('returns Route D when contrôle technique is missing for relevant vehicles', () => {
    const result = evaluateRoute({
      ...createCompletePersonenautoAnswers(),
      hasControleTechniqueValid: false
    });

    expect(result.route).toBe('D');
  });

  it('returns Route E when conformity document is missing for relevant vehicles', () => {
    const result = evaluateRoute({
      ...createCompletePersonenautoAnswers(),
      hasConformityDoc: false
    });

    expect(result.route).toBe('E');
  });

  it('does not block aanhanger/caravan on quitus or CT checks', () => {
    const result = evaluateRoute({
      ...createCompletePersonenautoAnswers(),
      vehicleType: 'aanhanger_caravan',
      hasQuitusFiscal: false,
      hasControleTechniqueValid: false,
      hasConformityDoc: true
    });

    expect(result.route).toBe('A');
  });

  it('returns Route X for out-of-scope input', () => {
    const result = evaluateRoute({
      ...createCompletePersonenautoAnswers(),
      euOrigin: false
    });

    expect(result.route).toBe('X');
  });
});
