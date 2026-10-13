export type FlashcardCategory = 'terminology' | 'pharmacology' | 'clinical_normals';

export interface Flashcard {
  id: string;
  category: FlashcardCategory;
  frontTermEn: string;
  frontTermKu: string;
  pronunciation?: string;
  backDefinitionEn: string;
  backDefinitionKu: string;
  clinicalContextEn: string;
  clinicalContextKu: string;
  badgeEn: string;
  badgeKu: string;
}

export const FLASHCARDS_DATA: Flashcard[] = [
  // MEDICAL TERMINOLOGY
  {
    id: 'term_bradycardia',
    category: 'terminology',
    frontTermEn: 'Bradycardia',
    frontTermKu: 'برادیکاردیا (Bradycardia)',
    pronunciation: '/ˌbræd.ɪˈkɑː.di.ə/',
    backDefinitionEn: 'A resting heart rate of less than 60 beats per minute (bpm) in an adult.',
    backDefinitionKu: 'هێواشبوونا لێدانا دلی بۆ کێمتر ژ ٦٠ لێدان د دەقەەکێ دا ل دەف کەسێ مەزن.',
    clinicalContextEn: 'Normal in well-conditioned athletes, but can indicate sick sinus syndrome, hypothermia, or medication toxicity (Digoxin, Beta-blockers). Assess for dizziness and syncope.',
    clinicalContextKu: 'دشێت نورمال بیت ل دەف وەرزشڤانان، لێ دشێت نیشانا تێکچوونا لێدانا دلی یان ژەهراویبوونا دەرمانان بیت. بەرێخوە بدە گێژبوون و پەستانێ.',
    badgeEn: 'Cardiology',
    badgeKu: 'دڵ و دەمار'
  },
  {
    id: 'term_tachycardia',
    category: 'terminology',
    frontTermEn: 'Tachycardia',
    frontTermKu: 'تاکیکاردیا (Tachycardia)',
    pronunciation: '/ˌtæk.ɪˈkɑː.di.ə/',
    backDefinitionEn: 'A resting heart rate greater than 100 beats per minute (bpm) in an adult.',
    backDefinitionKu: 'لەزبوونا لێدانا دلی بۆ زێدەتر ژ ١٠٠ لێدان د دەقەەکێ دا ل دەف کەسێ مەزن.',
    clinicalContextEn: 'Physiological response to fever, pain, anxiety, anemia, dehydration, or hypovolemic shock. Prolonged tachycardia compromises cardiac output and coronary perfusion.',
    clinicalContextKu: 'بەرسڤەکا سروشتی یە بۆ تا، ئێش، ترس، کێمخوینی، یان کێمبوونا شلەیا لەشی. مانەوەیا وێ بارێ سەر دلی گران دکەت.',
    badgeEn: 'Cardiology',
    badgeKu: 'دڵ و دەمار'
  },
  {
    id: 'term_dyspnea',
    category: 'terminology',
    frontTermEn: 'Dyspnea',
    frontTermKu: 'دیسپنیا (Dyspnea - تەنگەنەفەسی)',
    pronunciation: '/dɪspˈniː.ə/',
    backDefinitionEn: 'Subjective feeling of difficult, labored, or uncomfortable breathing (shortness of breath).',
    backDefinitionKu: 'هەستپێکرنا نەخۆشی ب زەحمەتیا هەناسەدانێ و کێمبوونا هەوای د سیهان دا.',
    clinicalContextEn: 'Hallmark of COPD, asthma, heart failure, pulmonary embolism, or pneumothorax. Position patient in High-Fowler (60-90°) immediately.',
    clinicalContextKu: 'نیشانا سەرەکی یا رەبۆ، هەوکرنا سیهان و سستبوونا دلی یە. نەخۆشی دەستبەجێ ل سەر تەختی بەرز بکە (High-Fowler).',
    badgeEn: 'Pulmonology',
    badgeKu: 'هەناسەدان'
  },
  {
    id: 'term_cyanosis',
    category: 'terminology',
    frontTermEn: 'Cyanosis',
    frontTermKu: 'شینبوون (Cyanosis)',
    pronunciation: '/ˌsaɪ.əˈnoʊ.sɪs/',
    backDefinitionEn: 'Bluish or purplish discoloration of skin and mucous membranes caused by high levels of deoxygenated hemoglobin (> 5 g/dL).',
    backDefinitionKu: 'شینبوونا رەنگێ پێست، لێڤ و نینۆکان ژ بەر کێمبوونا دژوار یا ئۆکسجینێ د ناڤ خوێنێ دا.',
    clinicalContextEn: 'Central cyanosis (lips, tongue) indicates severe arterial hypoxemia requiring immediate oxygenation. Peripheral cyanosis indicates cold exposure or vasoconstriction.',
    clinicalContextKu: 'شینبوونا ناڤەندی (لێڤ و ئەزمان) نیشانا خنکانا خانەیانە و پێدڤی ب ئۆکسجینا لەزگینە. شینبوونا دەست و پێیان ژ سەرمایێ یە.',
    badgeEn: 'Physical Exam',
    badgeKu: 'پشکنین'
  },
  {
    id: 'term_oliguria',
    category: 'terminology',
    frontTermEn: 'Oliguria',
    frontTermKu: 'ئۆلیگۆریا (Oliguria - کێم میزکرن)',
    pronunciation: '/ˌɒl.ɪˈɡjʊə.ri.ə/',
    backDefinitionEn: 'Decreased urine production of less than 400 mL/day in adults, or less than 0.5 mL/kg/hour for > 6 hours.',
    backDefinitionKu: 'کێمبوونا بڕێ میزێ بۆ کێمتر ژ ٤٠٠ مل د ٢٤ دەمژمێران دا، یان کێمتر ژ ٣٠ مل د یەک سەعەتێ دا.',
    clinicalContextEn: 'Crucial warning sign of acute kidney injury (AKI), severe dehydration, shock, or urinary tract obstruction. Notify physician immediately.',
    clinicalContextKu: 'نیشانەکا زۆر مەترسیدارە بۆ ژ کارکەفتنا گورچیلکان یان کەفتنا شۆکێ. پێدڤیە دەستبەجێ نۆشدار بهێتە ئاگەهدارکرن.',
    badgeEn: 'Nephrology',
    badgeKu: 'گورچیلک'
  },
  {
    id: 'term_atelectasis',
    category: 'terminology',
    frontTermEn: 'Atelectasis',
    frontTermKu: 'ئاتێلێکتازیا (Atelectasis - متبوونا سیهان)',
    pronunciation: '/ˌæt.əˈlɛk.tə.sɪs/',
    backDefinitionEn: 'Partial or complete collapse of the lung alveoli, leading to impaired gas exchange.',
    backDefinitionKu: 'نوشتین و گرژبوونا کیسکێن هەوای د ناڤ سیهان دا، کو ناهێلیت ئۆکسجین بچیتە ناڤ خوێنێ.',
    clinicalContextEn: 'Most common respiratory complication within 24-48 hours post-surgery. Preventable with Incentive Spirometer (10x/hr), deep breathing, and early ambulation.',
    clinicalContextKu: 'باوترین کێشەیا هەناسەدانێ یە پشتی نەشتەرگەریێ. دهێتە پاراستن ب بکارئینانا ئامێرێ فوولێدانێ و رێڤەچوونا زوو.',
    badgeEn: 'Surgical Nursing',
    badgeKu: 'نەشتەرگەری'
  },

  // PHARMACOLOGY
  {
    id: 'pharm_digoxin',
    category: 'pharmacology',
    frontTermEn: 'Digoxin (Lanoxin)',
    frontTermKu: 'دیجۆکسین (Digoxin)',
    pronunciation: '/dɪˈdʒɒk.sɪn/',
    backDefinitionEn: 'Cardiac glycoside that increases myocardial contractility (positive inotrope) and slows heart rate (negative chronotrope).',
    backDefinitionKu: 'دەرمانێ دلی کو هێزا گرژبوونا ماسوولکەی زێدە دکەت و لێدانا دلی هێواش دکەت.',
    clinicalContextEn: 'NURSING PRIORITY: Count apical pulse for full 60 seconds prior to administration. HOLD if HR < 60 bpm. Monitor for toxicity (nausea, yellow-green visual halos). Hypokalemia potentiates toxicity.',
    clinicalContextKu: 'پێشینەیا پەرستاری: لێدانا دلی بۆ ٦٠ چرکان بپێڤە. ئەگەر کێمتر بوو ژ ٦٠، دەرمانی مەدە! ئاگەهداری دڵرابوون و زەردبوونا چاڤان بە.',
    badgeEn: 'Cardiac Glycoside',
    badgeKu: 'دەرمانێ دلی'
  },
  {
    id: 'pharm_furosemide',
    category: 'pharmacology',
    frontTermEn: 'Furosemide (Lasix)',
    frontTermKu: 'فورۆسێماید (لازیکس)',
    pronunciation: '/fjʊəˈrɒs.ə.maɪd/',
    backDefinitionEn: 'Potent loop diuretic acting on the thick ascending limb of the loop of Henle to inhibit Na+/K+/2Cl- cotransport.',
    backDefinitionKu: 'دەرمانێ بەهێزێ میزکەر کو خوێ و ئاڤا زێدە ژ لەشی دهاڤێژیتە دەر ب رێکا گورچیلکان.',
    clinicalContextEn: 'Used in acute pulmonary edema and heart failure. Side effects: Hypokalemia (check K+ level!), hypotension, and ototoxicity if pushed IV too rapidly (> 4 mg/min).',
    clinicalContextKu: 'بۆ ئاڤا سیهان و سستبوونا دلی دهێتە بکارئینان. کاریگەری: دابەزینا پۆتاسیۆمێ و زیان گەهاندنە گوهان ئەگەر ب لەز بهێتە لێدان.',
    badgeEn: 'Loop Diuretic',
    badgeKu: 'میزکەر'
  },
  {
    id: 'pharm_heparin',
    category: 'pharmacology',
    frontTermEn: 'Heparin & Protamine Sulfate',
    frontTermKu: 'هێپارین و دژە ژەهرا وێ (پڕۆتامین)',
    pronunciation: '/ˈhɛp.ər.ɪn/',
    backDefinitionEn: 'Parenteral anticoagulant that enhances antithrombin III activity. Antidote is Protamine Sulfate.',
    backDefinitionKu: 'رونکەرێ لەزگین یێ خوێنێ کو رێگریێ ل مەینێ دگریت. چارەسەریا زێدەدەربازبوونا وێ دەرمانێ پڕۆتامین سۆلفاتە.',
    clinicalContextEn: 'Monitor aPTT (target 1.5 - 2.5x control). Watch for Heparin-Induced Thrombocytopenia (HIT - drop in platelets > 50%). Assess for occult bleeding (melena, hematuria).',
    clinicalContextKu: 'پشکنینا تاقیگەهێ ya aPTT پێدڤیە. چاڤدێریا پەڕەکانی خوێنێ (پلاتلێت) بکە و ئاگەهداری خوینبەربوونا میزی و پیساتیێ بە.',
    badgeEn: 'Anticoagulant',
    badgeKu: 'رونکەرێ خوێنێ'
  },
  {
    id: 'pharm_metformin',
    category: 'pharmacology',
    frontTermEn: 'Metformin (Glucophage)',
    frontTermKu: 'میتفۆرمین (گلوکۆفەیج)',
    pronunciation: '/mɛtˈfɔːr.mɪn/',
    backDefinitionEn: 'Biguanide oral antidiabetic agent that suppresses hepatic glucose production and enhances peripheral insulin sensitivity.',
    backDefinitionKu: 'حەبا سەرەکی یا چارەسەریا شەکرا جۆرێ ٢ کو بەرهەمهاتنا شەکرێ د جگەری دا کێم دکەت.',
    clinicalContextEn: 'NURSING SAFETY: Must HOLD 48 hours prior to and 48 hours after IV iodinated contrast dye procedures due to lethal risk of Lactic Acidosis and acute renal failure.',
    clinicalContextKu: 'ئێمناهییا پەرستاری: پێدڤیە ٤٨ دەمژمێر بەری پشکنینا وێنەیی یا ماددێ رەنگدار (Contrast) و ٤٨ دەمژمێر پشتی وێ بهێتە راگرتن!',
    badgeEn: 'Oral Antidiabetic',
    badgeKu: 'شەکرە'
  },

  // CLINICAL NORMALS
  {
    id: 'norm_abg',
    category: 'clinical_normals',
    frontTermEn: 'Arterial Blood Gas (ABG) Normal Values',
    frontTermKu: 'پێوانەیێن نورمال یێن غازاتێن خوێنێ (ABG)',
    pronunciation: '/eɪ-biː-dʒiː/',
    backDefinitionEn: 'pH: 7.35 - 7.45 | PaCO2: 35 - 45 mmHg | HCO3-: 22 - 26 mEq/L | PaO2: 80 - 100 mmHg | SaO2: > 95%',
    backDefinitionKu: 'ترشیاتی pH: ٧.٣٥ - ٧.٤٥ | کاربۆن PaCO2: ٣٥ - ٤٥ | بیکاربۆنات HCO3: ٢٢ - ٢٦ | ئۆکسجین: ٨٠ - ١٠٠ ملم جیوە',
    clinicalContextEn: 'ROME method: Respiratory Opposite (pH high = CO2 low), Metabolic Equal (pH high = HCO3 high). Assess for uncompensated vs compensated acid-base disorders.',
    clinicalContextKu: 'یاسایا ROME: هەناسە پێچەوانەیە (ترشیاتی بەرز بیت = کاربۆن نزمە)، میتابۆلیک وەک ئێکە (ترشیاتی بەرز بیت = بیکاربۆنات بەرزە).',
    badgeEn: 'Critical Care',
    badgeKu: 'چاڤدێریا چڕ'
  },
  {
    id: 'norm_electrolytes',
    category: 'clinical_normals',
    frontTermEn: 'Serum Electrolytes Normal Ranges',
    frontTermKu: 'رێژەیێن نورمال یێن ئەلیکترۆلایتان د خوێنێ دا',
    pronunciation: '/ɪˈlɛk.trə.laɪts/',
    backDefinitionEn: 'Sodium (Na+): 135 - 145 mEq/L | Potassium (K+): 3.5 - 5.0 mEq/L | Calcium (Ca2+): 8.5 - 10.5 mg/dL | Magnesium: 1.7 - 2.2 mg/dL',
    backDefinitionKu: 'سۆدیۆم: ١٣٥ - ١٤٥ | پۆتاسیۆم: ٣.٥ - ٥.٠ | کالسیۆم: ٨.٥ - ١٠.٥ | مەگنیسیۆم: ١.٧ - ٢.٢ مگم/دیسیلیتر',
    clinicalContextEn: 'Potassium K+ deviations outside 3.5 - 5.0 range cause life-threatening arrhythmias (tall peaked T-waves in hyperkalemia; U-waves/flat T in hypokalemia).',
    clinicalContextKu: 'گۆڕانکاری د پۆتاسیۆمی دا دبیتە هۆکارێ تێکچوونا کوشندە یا لێدانا دلی. پێدڤیە هەمیشە ئاگەهداری پۆتاسیۆمێ بین.',
    badgeEn: 'Lab Medicine',
    badgeKu: 'تاقیگەهـ'
  },
  {
    id: 'norm_gcs',
    category: 'clinical_normals',
    frontTermEn: 'Glasgow Coma Scale (GCS)',
    frontTermKu: 'پێوانەیا گلاسگۆ یا هۆشیاریێ (GCS)',
    pronunciation: '/ˈɡlæz.ɡoʊ ˈkoʊ.mə skeɪl/',
    backDefinitionEn: 'Standard neurological scoring system: Eye Opening (E: 1-4), Verbal Response (V: 1-5), Motor Response (M: 1-6). Total range: 3 (deep coma) to 15 (fully alert).',
    backDefinitionKu: 'سیستەمێ نێودەوڵەتی یێ پشکنینا مێشکی: چاڤ (١-٤)، ئاخافتن (١-٥)، لڤین (١-٦). کۆم: ژ ٣ (بێهۆشیا کویر) هەتا ١٥ (هشیاریا تەواو).',
    clinicalContextEn: 'CLINICAL RULE: GCS score ≤ 8 indicates severe traumatic brain injury unable to protect airway. "GCS of 8, INTUBATE!" Prepare for endotracheal intubation.',
    clinicalContextKu: 'یاسایا پەرستاری: ئەگەر نمرەیا GCS گەهشتە ٨ یان کێمتر، نەخۆش نەشێت هەناسەیا خوە بپارێزیت و پێدڤی ب دانانا بۆرییا هەناسێ یە (Intubation).',
    badgeEn: 'Neurology',
    badgeKu: 'مێشک و دەمار'
  }
];
