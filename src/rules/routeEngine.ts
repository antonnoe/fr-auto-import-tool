import { IntakeAnswers, RouteResult } from '@/lib/types';

export function evaluateRoute(answers: IntakeAnswers): RouteResult {
  const blockers: string[] = [];
  const currentStepIds: string[] = [];

  if (!answers.vehicleType || answers.euOrigin === null || answers.above35t === null) {
    return {
      route: 'X',
      title: 'Route X — Onvolledige intake',
      reason: 'Niet alle verplichte intakevragen zijn ingevuld.',
      blockers: ['Onvolledige intake'],
      currentStepIds: ['outscope']
    };
  }

  const inScopeVehicle = ['personenauto', 'camper_tot_35t', 'aanhanger_caravan'].includes(answers.vehicleType);
  if (!inScopeVehicle || !answers.euOrigin || answers.above35t) {
    return {
      route: 'X',
      title: 'Route X — Buiten scope',
      reason: 'Deze MVP ondersteunt alleen EU-voertuigen binnen de gedefinieerde categorieën.',
      blockers: ['Buiten scope'],
      currentStepIds: ['outscope']
    };
  }

  if (answers.nameAddressMatch === false) {
    blockers.push('Mismatch in naam/adres/documenten');
    currentStepIds.push('mismatch');
  }

  if (answers.hasQuitusFiscal === false) {
    blockers.push('Quitus fiscal ontbreekt');
    currentStepIds.push('quitus');
  }

  if (answers.hasControleTechniqueValid === false) {
    blockers.push('Contrôle technique ontbreekt of is verlopen');
    currentStepIds.push('ct');
  }

  if (answers.hasProofOfAddress === false) {
    blockers.push('Adresbewijs ontbreekt');
    currentStepIds.push('mismatch');
  }

  if (answers.hasConformityDoc === false) {
    blockers.push('Conformiteitsdocument ontbreekt');
    currentStepIds.push('conformity');
  }

  if (blockers.length > 0) {
    const first = currentStepIds[0];
    const routeMap: Record<string, RouteResult> = {
      quitus: {
        route: 'C',
        title: 'Route C — Eerst quitus fiscal',
        reason: 'Je kunt niet verder zonder quitus fiscal.',
        blockers,
        currentStepIds
      },
      ct: {
        route: 'D',
        title: 'Route D — Eerst contrôle technique',
        reason: 'Je hebt eerst een geldige controle nodig.',
        blockers,
        currentStepIds
      },
      conformity: {
        route: 'E',
        title: 'Route E — Eerst conformiteitsdocument',
        reason: 'Zonder COC/attest kan je dossier worden geweigerd.',
        blockers,
        currentStepIds
      },
      mismatch: {
        route: 'X',
        title: 'Route X — Eerst dossierconsistentie herstellen',
        reason: 'Naam/adres of dossiergegevens komen niet overeen.',
        blockers,
        currentStepIds
      }
    };

    return routeMap[first] ?? routeMap.mismatch;
  }

  if (answers.wantsProfessionalHelp) {
    return {
      route: 'B',
      title: 'Route B — Via garage / authorised professional',
      reason: 'Je kiest ondersteuning door een erkende professional.',
      blockers: [],
      currentStepIds: ['pro', 'ants']
    };
  }

  return {
    route: 'A',
    title: 'Route A — Zelf via ANTS / France Titres',
    reason: 'Je dossier lijkt compleet voor zelfservice.',
    blockers: [],
    currentStepIds: ['ants']
  };
}
