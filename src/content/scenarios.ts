import { IntakeAnswers } from '@/lib/types';

export const sampleScenarios: Array<{ name: string; answers: IntakeAnswers }> = [
  {
    name: 'Scenario 1: Personenauto, alles compleet, zelf indienen',
    answers: {
      vehicleType: 'personenauto',
      euOrigin: true,
      above35t: false,
      hasQuitusFiscal: true,
      hasControleTechniqueValid: true,
      hasProofOfAddress: true,
      hasConformityDoc: true,
      nameAddressMatch: true,
      wantsProfessionalHelp: false
    }
  },
  {
    name: 'Scenario 2: Camper <=3.5t zonder quitus',
    answers: {
      vehicleType: 'camper_tot_35t',
      euOrigin: true,
      above35t: false,
      hasQuitusFiscal: false,
      hasControleTechniqueValid: true,
      hasProofOfAddress: true,
      hasConformityDoc: true,
      nameAddressMatch: true,
      wantsProfessionalHelp: false
    }
  },
  {
    name: 'Scenario 3: Caravan >500kg zonder geldig CT en zonder COC',
    answers: {
      vehicleType: 'aanhanger_caravan',
      euOrigin: true,
      above35t: false,
      hasQuitusFiscal: true,
      hasControleTechniqueValid: false,
      hasProofOfAddress: true,
      hasConformityDoc: false,
      nameAddressMatch: true,
      wantsProfessionalHelp: true
    }
  }
];
