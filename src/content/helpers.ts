import { MailTemplate } from '@/lib/types';

export const frenchHelpers: MailTemplate[] = [
  {
    title: 'Mail aan garage of professionnel habilité',
    body: `Bonjour,

Je souhaite immatriculer en France un véhicule provenant des Pays-Bas.

J’ai déjà rassemblé une partie de mon dossier et je voudrais savoir si vous pouvez :
- vérifier les pièces,
- me signaler les documents manquants,
- et, si nécessaire, déposer la demande d’immatriculation pour mon compte.

Pouvez-vous me préciser :
- les documents à fournir,
- votre tarif pour cette prestation,
- et le délai habituel de traitement ?

Je vous remercie par avance.

Cordialement,`
  },
  {
    title: 'Mail om een COC of ander conformiteitsdocument te vragen',
    body: `Bonjour,

Je vous contacte au sujet de mon véhicule importé des Pays-Bas.

Je souhaite obtenir le certificat de conformité (COC) ou, à défaut, le document approprié permettant l’immatriculation du véhicule en France.

Pouvez-vous m’indiquer :
- quel document peut être délivré pour ce véhicule,
- les pièces à fournir,
- le coût,
- et le délai de traitement ?

Je vous remercie par avance.

Cordialement,`
  },
  {
    title: 'Telefoonscript voor contrôle technique',
    body: `Bonjour,

Je souhaite prendre rendez-vous pour un contrôle technique dans le cadre de l’immatriculation en France d’un véhicule importé des Pays-Bas.

Pouvez-vous me confirmer :
- si le contrôle peut être réalisé dans cette situation,
- quels documents je dois apporter,
- et quel est le premier créneau disponible ?

Merci beaucoup.`
  },
  {
    title: 'Korte uitleg in het Frans voor garage of loket',
    body: `Bonjour,

Je suis en train de faire immatriculer en France un véhicule provenant des Pays-Bas.

Je voudrais vérifier si mon dossier est complet avant le dépôt de la demande.
Selon le cas, je dois encore fournir certains documents, par exemple le quitus fiscal, le contrôle technique ou un document de conformité.

Pouvez-vous m’indiquer ce qu’il manque dans mon dossier ?`
  }
];
