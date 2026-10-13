export type DrugForm =
  | 'tablet'
  | 'syrup'
  | 'injection'
  | 'capsule'
  | 'inhaler'
  | 'suppository'
  | 'iv_infusion'
  | 'ointment'
  | 'drops';

export type PregnancySafety = 'safe' | 'caution' | 'unsafe';

export type DrugCategory =
  | 'analgesics'
  | 'antibiotics'
  | 'cardiovascular'
  | 'emergency'
  | 'respiratory'
  | 'gastrointestinal'
  | 'endocrine'
  | 'cns'
  | 'cns_psychiatric'
  | 'iv_fluids'
  | 'topical'
  | 'vitamins';

export interface DrugInteraction {
  withDrugId: string;
  withDrugName: string;
  severity: 'safe' | 'caution' | 'dangerous';
  noteKu: string;
  noteEn: string;
}

export interface NursingAdpieNotes {
  assessmentEn?: string;
  assessmentKu?: string;
  diagnosisEn?: string;
  diagnosisKu?: string;
  planningEn?: string;
  planningKu?: string;
  interventionsEn?: string;
  interventionsKu?: string;
  evaluationEn?: string;
  evaluationKu?: string;
}

export interface DrugData {
  id: string;
  name: string;
  nameKu: string;
  nameAr?: string;
  brandNamesKu?: string;
  brandNamesEn?: string;
  category: DrugCategory;
  form: DrugForm;
  strength: string;
  availableStrengths?: string[];
  route?: string;
  color: string;
  secondaryColor?: string;
  shapeType: 'tablet' | 'capsule' | 'vial' | 'bottle' | 'inhaler' | 'tube' | 'dropper';
  useKu: string;
  useEn: string;
  whenKu: string;
  whenEn: string;
  standardDoseKu: string;
  standardDoseEn: string;
  maxDose24h: string;
  contraindicationsKu?: string[];
  contraindicationsEn?: string[];
  adpie?: NursingAdpieNotes;
  // Pediatric & Adult Dose calculation properties
  calculator: {
    mgPerKg: number;
    frequencyHours: number;
    maxSingleDoseMg: number;
    maxDailyDoseMg: number;
    formulaDescKu: string;
    formulaDescEn: string;
  };
  sideEffectsKu: string[];
  sideEffectsEn: string[];
  criticalWarningsKu?: string[];
  criticalWarningsEn?: string[];
  nursingConsiderationsKu?: string | string[];
  nursingConsiderationsEn?: string | string[];
  pregnancyStatus: PregnancySafety;
  pregnancyDescKu: string;
  pregnancyDescEn: string;
  explanationKu?: string;
  explanationEn?: string;
  relatedOrganIds?: string[];
  interactions?: DrugInteraction[];
}

export interface CategoryInfo {
  id: DrugCategory;
  nameEn: string;
  nameKu: string;
  descriptionEn: string;
  descriptionKu: string;
  color: string;
}

export const DRUG_CATEGORIES: CategoryInfo[] = [
  {
    id: 'analgesics',
    nameEn: 'Analgesics & NSAIDs',
    nameKu: 'ئێششکێن و دژە هەوکرن',
    descriptionEn: 'Pain relievers, antipyretics, opioid analgesics, and NSAIDs',
    descriptionKu: 'دەرمانێن شکاندنا ئێشێ، تایێ، دژە هەوکرن و ئێششکێنێن بەنگکەر',
    color: '#F97316'
  },
  {
    id: 'antibiotics',
    nameEn: 'Antibiotics & Anti-infectives',
    nameKu: 'دژە میکرۆب و بەکتریا',
    descriptionEn: 'Broad-spectrum penicillins, cephalosporins, macrolides, and antifungals',
    descriptionKu: 'دژە بەکتریایێن بەرفرەهـ، سێفالۆسپۆرین، و دژە کهارک',
    color: '#06B6D4'
  },
  {
    id: 'cardiovascular',
    nameEn: 'Cardiovascular Medications',
    nameKu: 'دەرمانێن دلی و بۆریێن خوینێ',
    descriptionEn: 'Antihypertensives, heart failure, antiarrhythmics, anticoagulants',
    descriptionKu: 'دەرمانێن دابەزاندنا پەستانا خوینێ، سستبوونا دلی و رۆهنکەرێن خوینێ',
    color: '#EF4444'
  },
  {
    id: 'emergency',
    nameEn: 'Emergency & Resuscitation',
    nameKu: 'دەرمانێن فریاکەوتن و بووژاندنەوەیێ',
    descriptionEn: 'Crash cart resuscitation agents, anaphylaxis, inotropes, shock medications',
    descriptionKu: 'دەرمانێن ترۆمبێلا فریاکەوتنێ، هەستیارییا کوشندە، و شۆکا دلی',
    color: '#EAB308'
  },
  {
    id: 'respiratory',
    nameEn: 'Respiratory Medications',
    nameKu: 'دەرمانێن کۆئەندامێ هەناسەدانێ',
    descriptionEn: 'Bronchodilators, inhaled corticosteroids, and mucolytics',
    descriptionKu: 'ڤەکرنا بۆریچکێن هەناسێ، کۆرتیکۆستیرۆیدێن بوخار و دەرمانێن بەلغەمی',
    color: '#10B981'
  },
  {
    id: 'gastrointestinal',
    nameEn: 'Gastrointestinal Drugs',
    nameKu: 'دەرمانێن کۆئەندامێ هەرسی',
    descriptionEn: 'Anti-ulcer PPIs, antiemetics, antispasmodics, laxatives',
    descriptionKu: 'دژە برینا گەدەی، دژە دلرابوون، ئارامکەرێ کۆڵنجی و نەرمکەر',
    color: '#8B5CF6'
  },
  {
    id: 'endocrine',
    nameEn: 'Endocrine & Diabetes',
    nameKu: 'دەرمانێن هۆرمۆن و شەکرێ',
    descriptionEn: 'Insulins, oral hypoglycemics, thyroid regulators',
    descriptionKu: 'جۆرێن ئەنسۆلینێ، حەبێن شەکرێ، و رێکخەرێن گلاندێ سایرۆید',
    color: '#EC4899'
  },
  {
    id: 'cns',
    nameEn: 'CNS & Psychiatric Drugs',
    nameKu: 'دەرمانێن کۆئەندامێ دەماری و دەروونی',
    descriptionEn: 'Sedatives, anticonvulsants, antipsychotics, antidepressants',
    descriptionKu: 'ئارامکەر، دژە فێ و گەشکە، دژە شێتی و دڵتەنگی',
    color: '#6366F1'
  },
  {
    id: 'iv_fluids',
    nameEn: 'IV Fluids & Electrolytes',
    nameKu: 'شلەیێن ناڤ دەمار و ئەلەکترۆلایت',
    descriptionEn: 'Crystalloids, colloids, hypertonic saline, potassium, magnesium',
    descriptionKu: 'سەلاین، رینگەر لاکتات، شەکرە، گیراوێن خەست و ئەلەکترۆلایتێن لەزگین',
    color: '#0EA5E9'
  },
  {
    id: 'topical',
    nameEn: 'Topical Preparations & Drops',
    nameKu: 'مەلھەم، کرێم و قەترە',
    descriptionEn: 'Skin ointments, burn creams, antibiotic gels, and ophthalmic/otic drops',
    descriptionKu: 'مەلھەمێن پێستی، کرێمێن سۆتنێ، و قەترەیێن چاڤ و گوهی',
    color: '#14B8A6'
  },
  {
    id: 'vitamins',
    nameEn: 'Vitamins & Minerals',
    nameKu: 'ڤیتامین و موغەزی',
    descriptionEn: 'Vitamins C, D3, B-Complex, Folic Acid, and nutritional supplements',
    descriptionKu: 'ڤیتامین سی، دی٣، بی کۆمپلێکس، فۆلیک ئەسید و هێزکەرێن لەشی',
    color: '#F59E0B'
  }
];

import { ANALGESICS_DRUGS } from './drugs/analgesics';
import { ANTIBIOTICS_DRUGS } from './drugs/antibiotics';
import { CARDIOVASCULAR_DRUGS } from './drugs/cardiovascular';
import { EMERGENCY_RESUSCITATION_DRUGS } from './drugs/emergency';
import { RESPIRATORY_DRUGS } from './drugs/respiratory';
import { GASTROINTESTINAL_DRUGS } from './drugs/gastrointestinal';
import { ENDOCRINE_DRUGS } from './drugs/endocrine';
import { CNS_PSYCHIATRIC_DRUGS } from './drugs/cnsPsychiatric';
import { IV_FLUIDS_DRUGS } from './drugs/ivFluids';
import { TOPICAL_LOCAL_DRUGS } from './drugs/topical';
import { VITAMINS_MINERALS_DRUGS } from './drugs/vitamins';

// MASTER PHARMACEUTICAL DATABASE (98+ ESSENTIAL MEDICATIONS ACROSS 11 CATEGORIES)
export const DRUGS: DrugData[] = [
  ...ANALGESICS_DRUGS,
  ...ANTIBIOTICS_DRUGS,
  ...CARDIOVASCULAR_DRUGS,
  ...EMERGENCY_RESUSCITATION_DRUGS,
  ...RESPIRATORY_DRUGS,
  ...GASTROINTESTINAL_DRUGS,
  ...ENDOCRINE_DRUGS,
  ...CNS_PSYCHIATRIC_DRUGS,
  ...IV_FLUIDS_DRUGS,
  ...TOPICAL_LOCAL_DRUGS,
  ...VITAMINS_MINERALS_DRUGS
];
