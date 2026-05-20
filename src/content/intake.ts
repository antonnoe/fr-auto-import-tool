import { IntakeAnswers, VehicleDataFormValues } from '@/lib/types';

export const initialAnswers: IntakeAnswers = {
  vehicleType: null,
  euOrigin: null,
  above35t: null,
  hasQuitusFiscal: null,
  hasControleTechniqueValid: null,
  hasProofOfAddress: null,
  hasConformityDoc: null,
  nameAddressMatch: null,
  wantsProfessionalHelp: null
};

export const initialVehicleData: VehicleDataFormValues = {
  firstRegistrationDate: '',
  powerKw: '',
  co2GramsPerKm: '',
  mileageKm: '',
  region: ''
};
