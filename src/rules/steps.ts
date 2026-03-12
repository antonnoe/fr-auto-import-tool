import { ActionStep } from '@/lib/types';

export const actionSteps: Record<string, ActionStep> = {
  quitus: {
    id: 'quitus',
    title: 'Vraag eerst uw quitus fiscal aan',
    doNow:
      'Neem contact op met het bevoegde belastingkantoor en vraag de quitus fiscal aan voordat u de immatriculatie voortzet.',
    where:
      'Bij het bevoegde Franse belastingkantoor voor uw situatie.',
    neededDocs: [
      'Identiteitsbewijs',
      'Koopfactuur of koopovereenkomst',
      'Buitenlands kentekenbewijs',
      'Frans bewijs van adres'
    ],
    commonMistake:
      'Een onvolledig dossier indienen, bijvoorbeeld zonder duidelijke gegevens van koper, verkoper of voertuig.'
  },
  ct: {
    id: 'ct',
    title: 'Regel eerst een geldige contrôle technique',
    doNow:
      'Maak een afspraak bij een erkend Frans controlecentrum en laat het voertuig keuren, als die keuring voor uw situatie vereist is.',
    where:
      'Bij een erkend centre de contrôle technique in Frankrijk.',
    neededDocs: [
      'Voertuigpapieren',
      'Buitenlands kentekenbewijs',
      'Eventuele eerdere keuringsrapporten',
      'Identiteitsbewijs'
    ],
    commonMistake:
      'Een rapport gebruiken dat te oud is of niet past bij de Franse aanvraagvoorwaarden.'
  },
  conformity: {
    id: 'conformity',
    title: 'Vraag eerst een conformiteitsdocument aan',
    doNow:
      'Vraag een COC of een ander passend conformiteitsdocument aan bij de constructeur, importeur of bevoegde instantie.',
    where:
      'Bij de constructeur, diens vertegenwoordiger of een andere bevoegde technische instantie.',
    neededDocs: [
      'VIN of chassisnummer',
      'Kopie van het kentekenbewijs',
      'Identiteitsbewijs',
      'Eventuele aanvullende voertuiggegevens'
    ],
    commonMistake:
      'Een verkeerd VIN of onvolledige voertuiggegevens doorgeven, waardoor het document niet bruikbaar is.'
  },
  ants: {
    id: 'ants',
    title: 'Dien uw dossier in via France Titres / ANTS',
    doNow:
      'Controleer uw dossier nog één keer, upload de stukken en doorloop vervolgens de online aanvraag stap voor stap.',
    where:
      'Online via France Titres / ANTS.',
    neededDocs: [
      'Quitus fiscal indien vereist',
      'Conformiteitsdocument',
      'Geldige contrôle technique indien vereist',
      'Frans bewijs van adres',
      'Identiteitsbewijs',
      'Buitenlands kentekenbewijs'
    ],
    commonMistake:
      'Onduidelijke scans uploaden of documenten indienen met afwijkende naam- of adresgegevens.'
  },
  pro: {
    id: 'pro',
    title: 'Laat de indiening verzorgen door een erkende professional',
    doNow:
      'Bereid uw dossier volledig voor en laat de formele indiening daarna uitvoeren door een professionnel habilité of garagebedrijf.',
    where:
      'Bij een garagebedrijf of andere professional met habilitation voor immatriculatie.',
    neededDocs: [
      'Volledig documentendossier',
      'Eventuele volmacht of opdrachtbevestiging',
      'Identiteitsbewijs',
      'Frans bewijs van adres'
    ],
    commonMistake:
      'Aannemen dat de professional ontbrekende stukken wel zal oplossen, terwijl het dossier inhoudelijk nog onvolledig is.'
  },
  mismatch: {
    id: 'mismatch',
    title: 'Herstel eerst de inconsistentie in naam of adres',
    doNow:
      'Controleer alle documenten en zorg dat naam, adres en voertuiggegevens overal exact overeenkomen.',
    where:
      'Bij de instantie of partij die het foutieve document heeft afgegeven.',
    neededDocs: [
      'Identiteitsbewijs',
      'Correct bewijs van adres',
      'Juiste factuur of overeenkomst',
      'Eventuele gecorrigeerde voertuigdocumenten'
    ],
    commonMistake:
      'Kleine afwijkingen negeren, zoals een oud adres, ontbrekende tweede naam of een andere schrijfwijze.'
  },
  outscope: {
    id: 'outscope',
    title: 'Deze situatie valt buiten deze eerste toolversie',
    doNow:
      'Laat uw dossier beoordelen door een specialist voordat u verdergaat met de standaardprocedure.',
    where:
      'Bij een gespecialiseerde importdienst, technisch adviseur of andere bevoegde deskundige.',
    neededDocs: [
      'Volledige voertuigdocumentatie',
      'Buitenlands kentekenbewijs',
      'Technische voertuiggegevens',
      'Eventuele aankoopdocumenten'
    ],
    commonMistake:
      'Toch doorgaan met de standaardstappen terwijl uw dossier een afwijkende of complexere behandeling nodig heeft.'
  }
};
