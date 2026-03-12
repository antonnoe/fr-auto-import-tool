import { MailTemplate } from '@/lib/types';

export const frenchHelpers: MailTemplate[] = [
  {
    title: 'Korte mail aan garage (dossierhulp)',
    body: `Bonjour,\n\nJe souhaite immatriculer en France un véhicule venant des Pays-Bas.\nPouvez-vous m’aider avec la procédure ANTS et vérifier mon dossier ?\n\nMerci d’avance.\nCordialement,`
  },
  {
    title: 'Korte mail om COC / conformiteitsdocument te vragen',
    body: `Bonjour,\n\nJe vous contacte pour obtenir le certificat de conformité (COC) de mon véhicule importé.\nMerci de me préciser les documents nécessaires et le délai.\n\nCordialement,`
  },
  {
    title: 'Kort telefoonscript voor contrôle technique',
    body: `Bonjour, je voudrais prendre rendez-vous pour un contrôle technique en vue d’une immatriculation française d’un véhicule importé des Pays-Bas. Quels documents dois-je apporter ?`
  },
  {
    title: 'Korte uitleg in het Frans voor garage/balie',
    body: `Je suis en train d’immatriculer en France un véhicule néerlandais. Je dois compléter mon dossier (quitus fiscal, contrôle technique, conformité) avant la demande de carte grise.`
  }
];
