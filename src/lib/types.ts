export type VehicleType =
  | 'personenauto'
  | 'camper_tot_35t'
  | 'aanhanger_caravan';

export type IntakeAnswers = {
  vehicleType: VehicleType | null;
  euOrigin: boolean | null;
  above35t: boolean | null;
  hasQuitusFiscal: boolean | null;
  hasControleTechniqueValid: boolean | null;
  hasProofOfAddress: boolean | null;
  hasConformityDoc: boolean | null;
  nameAddressMatch: boolean | null;
  wantsProfessionalHelp: boolean | null;
};

export type RouteAdviceKey =
  | 'zelf_indienen'
  | 'zelf_voorbereiden_professional'
  | 'eerst_specialist';

export type VehicleDataFormValues = {
  firstRegistrationDate: string;
  powerKw: string;
  co2GramsPerKm: string;
  mileageKm: string;
  region: string;
};

export type RouteCode = 'A' | 'B' | 'C' | 'D' | 'E' | 'X';

export type ActionStepId =
  | 'quitus'
  | 'ct'
  | 'conformity'
  | 'ants'
  | 'pro'
  | 'mismatch'
  | 'outscope';

export type RouteResult = {
  route: RouteCode;
  title: string;
  reason: string;
  blockers: string[];
  currentStepIds: ActionStepId[];
};

export type ActionStep = {
  id: ActionStepId;
  title: string;
  doNow: string;
  where: string;
  neededDocs: string[];
  commonMistake: string;
};

export type MailTemplate = {
  title: string;
  body: string;
};
