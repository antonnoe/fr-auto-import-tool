import { IntakeAnswers } from '@/lib/types';

export const sampleScenarios: Array<{ name: string; answers: IntakeAnswers }> = [
  {
    name: 'Personenauto — dossier compleet, zelf online indienen',
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
    name: 'Personenauto — voorbereiding zelf, indiening via professional',
    answers: {
      vehicleType: 'personenauto',
      euOrigin: true,
      above35t: false,
      hasQuitusFiscal: true,
      hasControleTechniqueValid: true,
      hasProofOfAddress: true,
      hasConformityDoc: true,
      nameAddressMatch: true,
      wantsProfessionalHelp: true
    }
  },
  {
    name: 'Camper tot en met 3,5 ton — quitus fiscal ontbreekt',
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
    name: 'Aanhanger / caravan — conformiteitsdocument ontbreekt',
    answers: {
      vehicleType: 'aanhanger_caravan',
      euOrigin: true,
      above35t: false,
      hasQuitusFiscal: null,
      hasControleTechniqueValid: null,
      hasProofOfAddress: true,
      hasConformityDoc: false,
      nameAddressMatch: true,
      wantsProfessionalHelp: true
    }
  }
];
