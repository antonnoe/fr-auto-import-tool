import { IntakeAnswers, RouteResult, VehicleType } from '@/lib/types';

type IntakeField = keyof Omit<IntakeAnswers, 'vehicleType'>;

type ScenarioConfig = {
  requiredBooleanFields: IntakeField[];
  checkQuitus: boolean;
  checkControleTechnique: boolean;
  checkConformity: boolean;
};

const baseRequiredFields: IntakeField[] = [
  'euOrigin',
  'above35t',
  'hasProofOfAddress',
  'nameAddressMatch',
  'wantsProfessionalHelp'
];

const scenarioConfigByVehicleType: Record<VehicleType, ScenarioConfig> = {
  personenauto: {
    requiredBooleanFields: [
      ...baseRequiredFields,
      'hasQuitusFiscal',
      'hasControleTechniqueValid',
      'hasConformityDoc'
    ],
    checkQuitus: true,
    checkControleTechnique: true,
    checkConformity: true
  },
  camper_tot_35t: {
    requiredBooleanFields: [
      ...baseRequiredFields,
      'hasQuitusFiscal',
      'hasControleTechniqueValid',
      'hasConformityDoc'
    ],
    checkQuitus: true,
    checkControleTechnique: true,
    checkConformity: true
  },
  aanhanger_caravan: {
    requiredBooleanFields: [
      ...baseRequiredFields,
      'hasConformityDoc'
    ],
    checkQuitus: false,
    checkControleTechnique: false,
    checkConformity: true
  }
};

function createIncompleteResult(): RouteResult {
  return {
    route: 'X',
    title: 'Route X — Onvolledige intake',
    reason: 'Nog niet alle verplichte vragen zijn ingevuld.',
    blockers: ['Onvolledige intake'],
    currentStepIds: []
  };
}

function createOutOfScopeResult(): RouteResult {
  return {
    route: 'X',
    title: 'Route X — Buiten deze toolversie',
    reason:
      'Deze eerste toolversie ondersteunt alleen voertuigen uit Nederland of een ander EU-land binnen de gedefinieerde categorieën.',
    blockers: ['Buiten scope'],
    currentStepIds: ['outscope']
  };
}

export function evaluateRoute(answers: IntakeAnswers): RouteResult {
  const blockers: string[] = [];
  const currentStepIds: string[] = [];

  if (!answers.vehicleType) {
    return createIncompleteResult();
  }

  const scenarioConfig = scenarioConfigByVehicleType[answers.vehicleType];

  const hasIncompleteAnswers = scenarioConfig.requiredBooleanFields.some(
    (field) => answers[field] === null
  );

  if (hasIncompleteAnswers) {
    return createIncompleteResult();
  }

  if (!answers.euOrigin || answers.above35t) {
    return createOutOfScopeResult();
  }

  if (answers.nameAddressMatch === false) {
    blockers.push('Naam-, adres- of documentgegevens komen niet overeen');
    currentStepIds.push('mismatch');
  }

  if (answers.hasProofOfAddress === false) {
    blockers.push('Frans bewijs van adres ontbreekt');
    currentStepIds.push('mismatch');
  }

  if (scenarioConfig.checkQuitus && answers.hasQuitusFiscal === false) {
    blockers.push('Quitus fiscal ontbreekt');
    currentStepIds.push('quitus');
  }

  if (
    scenarioConfig.checkControleTechnique &&
    answers.hasControleTechniqueValid === false
  ) {
    blockers.push('Geldige contrôle technique ontbreekt of is verlopen');
    currentStepIds.push('ct');
  }

  if (scenarioConfig.checkConformity && answers.hasConformityDoc === false) {
    blockers.push('Conformiteitsdocument ontbreekt');
    currentStepIds.push('conformity');
  }

  if (blockers.length > 0) {
    const firstStep = currentStepIds[0];

    const routeMap: Record<string, RouteResult> = {
      quitus: {
        route: 'C',
        title: 'Route C — Eerst quitus fiscal regelen',
        reason: 'Zonder quitus fiscal kunt u de aanvraag meestal niet afronden.',
        blockers,
        currentStepIds
      },
      ct: {
        route: 'D',
        title: 'Route D — Eerst contrôle technique regelen',
        reason: 'U hebt eerst een geldige technische keuring nodig.',
        blockers,
        currentStepIds
      },
      conformity: {
        route: 'E',
        title: 'Route E — Eerst conformiteitsdocument regelen',
        reason:
          'Zonder COC of ander passend conformiteitsdocument kan het dossier worden geweigerd.',
        blockers,
        currentStepIds
      },
      mismatch: {
        route: 'X',
        title: 'Route X — Eerst dossierconsistentie herstellen',
        reason:
          'Naam, adres of andere dossiergegevens zijn nog niet volledig consistent.',
        blockers,
        currentStepIds
      }
    };

    return routeMap[firstStep] ?? routeMap.mismatch;
  }

  if (answers.wantsProfessionalHelp) {
    return {
      route: 'B',
      title: 'Route B — Voorbereiding zelf, indiening via professional',
      reason:
        'Uw dossier lijkt voldoende compleet om de indiening te laten verzorgen door een erkende professional.',
      blockers: [],
      currentStepIds: ['pro', 'ants']
    };
  }

  return {
    route: 'A',
    title: 'Route A — Zelf online indienen via France Titres / ANTS',
    reason:
      'Op basis van uw antwoorden lijkt uw dossier voldoende compleet om zelf online in te dienen.',
    blockers: [],
    currentStepIds: ['ants']
  };
}
