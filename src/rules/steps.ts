import { ActionStep } from '@/lib/types';

export const actionSteps: Record<string, ActionStep> = {
  quitus: {
    id: 'quitus',
    title: 'Vraag eerst je quitus fiscal aan',
    doNow: 'Maak een afspraak of stuur je dossier naar het lokale belastingkantoor (SIE) voor de quitus fiscal.',
    where: 'Service des Impôts des Entreprises (SIE) van jouw woonplaats in Frankrijk.',
    neededDocs: ['ID', 'Koopfactuur of contract', 'Nederlands kentekenbewijs', 'Adresbewijs Frankrijk'],
    commonMistake: 'Een onvolledige factuur indienen zonder duidelijke verkoper/kopergegevens.'
  },
  ct: {
    id: 'ct',
    title: 'Regel een geldig contrôle technique',
    doNow: 'Plan een controle bij een erkend Frans controlecentrum.',
    where: 'Erkend centre de contrôle technique in Frankrijk.',
    neededDocs: ['Voertuigpapieren', 'Eventuele oude keuringsrapporten', 'Identiteit'],
    commonMistake: 'Een te oud keuringsrapport gebruiken dat niet meer geldig is.'
  },
  conformity: {
    id: 'conformity',
    title: 'Vraag het conformiteitsdocument aan',
    doNow: 'Vraag een COC of attest bij fabrikant/importeur aan.',
    where: 'Officiële klantenservice van fabrikant of erkende importeur.',
    neededDocs: ['VIN/chassisnummer', 'Kopie kentekenbewijs', 'Identiteitsbewijs'],
    commonMistake: 'Verkeerd VIN doorgeven waardoor het document niet bruikbaar is.'
  },
  ants: {
    id: 'ants',
    title: 'Dien je dossier in via ANTS / France Titres',
    doNow: 'Upload alle documenten en volg de online stappen voor immatriculation.',
    where: 'ants.gouv.fr / France Titres.',
    neededDocs: ['Quitus fiscal', 'Conformiteitsdocument', 'Geldige CT (indien vereist)', 'Adresbewijs', 'Identiteit'],
    commonMistake: 'Bestanden uploaden met onleesbare scans of afwijkende namen.'
  },
  pro: {
    id: 'pro',
    title: 'Schakel een erkende professional in',
    doNow: 'Laat een garage of geautoriseerde dienstverlener je dossier indienen.',
    where: 'Garage/mandataire met habilitation SIV.',
    neededDocs: ['Volmacht indien gevraagd', 'Volledig documentendossier'],
    commonMistake: 'Aannemen dat de professional ontbrekende documenten voor je kan vervangen.'
  },
  mismatch: {
    id: 'mismatch',
    title: 'Herstel naam/adres inconsistentie',
    doNow: 'Controleer dat naam en adres exact gelijk zijn op alle documenten.',
    where: 'Bij uitgevende instanties of via nieuw adresbewijs.',
    neededDocs: ['ID', 'Nieuw adresbewijs', 'Correcte factuur/contract'],
    commonMistake: 'Afwijkingen zoals tweede voornaam of oud adres negeren.'
  },
  outscope: {
    id: 'outscope',
    title: 'Buiten scope: vraag handmatige hulp',
    doNow: 'Neem contact op met een specialist voor jouw specifieke situatie.',
    where: 'Gespecialiseerde importdienst of juridisch adviseur.',
    neededDocs: ['Volledige voertuigdocumentatie'],
    commonMistake: 'Doorgaan in standaardproces terwijl je case buiten de regels valt.'
  }
};
