export interface VitalSignAgeGroup {
  id: string;
  ageGroupEn: string;
  ageGroupKu: string;
  ageSpan: string;
  heartRateBpm: { min: number; max: number; noteEn: string; noteKu: string };
  respiratoryRateBpm: { min: number; max: number; noteEn: string; noteKu: string };
  bloodPressureSystolic: { min: number; max: number; target: string };
  bloodPressureDiastolic: { min: number; max: number; target: string };
  temperatureC: { min: number; max: number; target: string };
  spO2Percent: { min: number; target: string };
  clinicalAlertEn: string;
  clinicalAlertKu: string;
}

export const VITAL_SIGNS_REFERENCE: VitalSignAgeGroup[] = [
  {
    id: 'adult',
    ageGroupEn: 'Adult (18 - 64 years)',
    ageGroupKu: 'کەسێ مەزن (١٨ - ٦٤ ساڵی)',
    ageSpan: '18 - 64 yrs',
    heartRateBpm: { min: 60, max: 100, noteEn: 'Bradycardia < 60; Tachycardia > 100', noteKu: 'کێمبوون < ٦٠؛ لەزبوون > ١٠٠ لێدان' },
    respiratoryRateBpm: { min: 12, max: 20, noteEn: 'Bradypnea < 12; Tachypnea > 20', noteKu: 'هێواش < ١٢؛ خێرا > ٢٠ هەناسە' },
    bloodPressureSystolic: { min: 90, max: 120, target: '< 120 mmHg' },
    bloodPressureDiastolic: { min: 60, max: 80, target: '< 80 mmHg' },
    temperatureC: { min: 36.5, max: 37.5, target: '37.0°C (Oral)' },
    spO2Percent: { min: 95, target: '95 - 100% on room air' },
    clinicalAlertEn: 'Hypertension Stage 1 starts at 130/80 mmHg; Hypertensive Crisis > 180/120 mmHg requiring urgent intervention.',
    clinicalAlertKu: 'قۆناغا ئێکێ یا پەستانێ ژ ١٣٠/٨٠ دەستپێدکەت؛ پەستانا لەزگین و مەترسیدار > ١٨٠/١٢٠ پێدڤی ب فریاکەوتنێ یە دەستبەجێ.'
  },
  {
    id: 'older_adult',
    ageGroupEn: 'Older Adult (≥ 65 years)',
    ageGroupKu: 'ب تەمەن (≥ ٦٥ ساڵی)',
    ageSpan: '65+ yrs',
    heartRateBpm: { min: 60, max: 100, noteEn: 'Pacemaker threshold often 60', noteKu: 'پێدڤیە لێدان ژ ٦٠ کێمتر نەبیت' },
    respiratoryRateBpm: { min: 14, max: 22, noteEn: 'Slightly higher resting baseline', noteKu: 'رەنگە کێمەک بەرزتر بیت ژ گەنجان' },
    bloodPressureSystolic: { min: 100, max: 140, target: '< 130 - 140 mmHg' },
    bloodPressureDiastolic: { min: 60, max: 90, target: '< 80 - 90 mmHg' },
    temperatureC: { min: 36.0, max: 37.2, target: '36.6°C (blunted febrile response)' },
    spO2Percent: { min: 94, target: '94 - 98%' },
    clinicalAlertEn: 'Older adults may NOT mount a fever in severe sepsis! Watch for acute confusion, delirium, and sudden tachypnea.',
    clinicalAlertKu: 'کەسێن ب تەمەن رەنگە تایێ نەگرن د دەمێ هەوکرنێ دا! ئاگەهداری گێژبوون، تێکچوونا هۆشی و لەزبوونا هەناسێ بە.'
  },
  {
    id: 'child',
    ageGroupEn: 'Child (1 - 12 years)',
    ageGroupKu: 'زارۆک (١ - ١٢ ساڵی)',
    ageSpan: '1 - 12 yrs',
    heartRateBpm: { min: 75, max: 120, noteEn: 'Faster baseline cardiac rate', noteKu: 'لێدانا دلی خێراترە ژ کەسێ مەزن' },
    respiratoryRateBpm: { min: 18, max: 30, noteEn: 'Higher oxygen consumption', noteKu: 'هەناسەدانا زارۆکی لەزترە' },
    bloodPressureSystolic: { min: 85, max: 115, target: 'Age formula: 90 + (2 x age)' },
    bloodPressureDiastolic: { min: 50, max: 75, target: '55 - 70 mmHg' },
    temperatureC: { min: 36.6, max: 37.6, target: '37.2°C (Tympanic/Axillary)' },
    spO2Percent: { min: 95, target: '95 - 100%' },
    clinicalAlertEn: 'Children compensate for hypovolemia for a long time by tachycardia; once BP drops, arrest is imminent!',
    clinicalAlertKu: 'زارۆک بۆ دەمەکێ درێژ کێمبوونا خوێنێ ب لەزکرنا لێدانا دلی قەرەبوو دکەن؛ ئەگەر پەستان کەفت، مەترسیا وەستانا دلی زۆر نێزیکە!'
  },
  {
    id: 'infant',
    ageGroupEn: 'Infant (1 - 12 months)',
    ageGroupKu: 'شیرخۆر (١ - ١٢ هەیڤی)',
    ageSpan: '1 - 12 mos',
    heartRateBpm: { min: 100, max: 160, noteEn: 'Apical pulse auscultation strictly', noteKu: 'تەنێ ب گوهداریکرنا دلی دهێتە پێڤان' },
    respiratoryRateBpm: { min: 30, max: 50, noteEn: 'Abdominal breathing is normal', noteKu: 'هەناسەدانا ب زکی یا ئاسایی یە' },
    bloodPressureSystolic: { min: 70, max: 100, target: '75 - 95 mmHg' },
    bloodPressureDiastolic: { min: 45, max: 65, target: '50 - 60 mmHg' },
    temperatureC: { min: 36.8, max: 37.8, target: '37.5°C (Axillary/Rectal)' },
    spO2Percent: { min: 95, target: '95 - 100%' },
    clinicalAlertEn: 'Count apical heart rate and respirations for a FULL 60 seconds due to periodic infant breathing.',
    clinicalAlertKu: 'پێدڤیە لێدانا دل و هەناسێ بۆ ٦٠ چرکەیێن تەمام بهێتە ژمارتن چونکی هەناسەیا ساڤایان ناڕێکە.'
  },
  {
    id: 'neonate',
    ageGroupEn: 'Neonate (0 - 28 days)',
    ageGroupKu: 'ساڤایێ نوی ژدایکبووی (٠ - ٢٨ رۆژی)',
    ageSpan: '0 - 28 days',
    heartRateBpm: { min: 110, max: 170, noteEn: 'Can reach 180 when crying', noteKu: 'دەمێ گریێ دگەهیتە ١٨٠ لێدان' },
    respiratoryRateBpm: { min: 35, max: 60, noteEn: 'Irregular rate with periodic pauses', noteKu: '٣٥ بۆ ٦٠ جاران ل دەقەکێ' },
    bloodPressureSystolic: { min: 60, max: 85, target: '65 - 75 mmHg' },
    bloodPressureDiastolic: { min: 35, max: 55, target: '40 - 50 mmHg' },
    temperatureC: { min: 36.5, max: 37.5, target: '37.0°C (Axillary with probe)' },
    spO2Percent: { min: 95, target: '95 - 100%' },
    clinicalAlertEn: 'Hypothermia (< 36.5°C) in neonates precipitates metabolic acidosis, hypoglycemia, and respiratory distress syndrome.',
    clinicalAlertKu: 'تەزینا ساڤای (< ٣٦.٥ پلە) دەستبەجێ شەکرێ دادبەزینیت و دبیتە هۆکارێ وەستانا هەناسێ!'
  }
];

export interface PracticeQuizQuestion {
  id: string;
  questionEn: string;
  questionKu: string;
  optionsEn: string[];
  optionsKu: string[];
  correctIndex: number;
  rationaleEn: string;
  rationaleKu: string;
  categoryEn: string;
  categoryKu: string;
}

export const CLINICAL_MCQS: PracticeQuizQuestion[] = [
  {
    id: 'mcq_1',
    categoryEn: 'Pharmacology & Medication Safety',
    categoryKu: 'دەرمانناسی و ئێمناهییا دەرمانان',
    questionEn: 'Before administering Digoxin (Lanoxin), which assessment MUST the registered nurse prioritize?',
    questionKu: 'بەری دانا دەرمانێ دیجۆکسین (Digoxin)، پەرستار پێدڤیە گرنگیێ ب کیژان پشکنینێ بدەت؟',
    optionsEn: [
      'Measure apical pulse for a full 60 seconds; hold if < 60 bpm',
      'Assess respiratory rate for 15 seconds; hold if < 12 bpm',
      'Check peripheral blood glucose level',
      'Record axillary temperature for 3 minutes'
    ],
    optionsKu: [
      'گوهداریکرنا لێدانا دلی بۆ ٦٠ چرکەیێن تەواو؛ راگرتن ئەگەر کێمتر بوو ژ ٦٠',
      'پێڤانا هەناسێ بۆ ١٥ چرکان؛ راگرتن ئەگەر کێمتر بوو ژ ١٢',
      'پشکنینا شەکرا خوینێ',
      'پێڤانا پلەیا گەرمێ بنباڵێ'
    ],
    correctIndex: 0,
    rationaleEn: 'Digoxin slows atrioventricular (AV) conduction. Administering it when apical heart rate is already < 60 bpm risks life-threatening heart block or cardiac arrest.',
    rationaleKu: 'دیجۆکسین لێدانا دلی هێواش دکەت؛ ئەگەر لێدان ژ ٦٠ کێمتر بیت و دەرمان بهێتە دان، دڵ دکەڤیتە د مەترسیا راوەستانێ دا.'
  },
  {
    id: 'mcq_2',
    categoryEn: 'Emergency Resuscitation & Anaphylaxis',
    categoryKu: 'فریاکەوتن و شۆکا هەستیاریێ',
    questionEn: 'A patient develops acute stridor, lip angioedema, and wheezing following an IV antibiotic. What is the immediate first-line nursing intervention?',
    questionKu: 'نەخۆشەک تووشی تەنگەنەفەسیەکا توند و ئەستویربوونا لێڤان بوو پشتی دەرزییا ئەنتی بایۆتیکێ. ئێکەمین کاریگەرترین کارێ پەرستاری چییە؟',
    optionsEn: [
      'Inject Epinephrine 1:1,000 (0.3 - 0.5 mg) IM into the anterolateral thigh',
      'Administer oral Diphenhydramine (Benadryl) 50 mg with water',
      'Give IV Hydrocortisone 100 mg slow push',
      'Place patient in high-sitting Fowler position and wait 20 minutes'
    ],
    optionsKu: [
      'لێدانا دەرزییا ئەدرینالین (٠.٣ بۆ ٠.٥ مگم) د ماسوولکەیا رانی دا (IM)',
      'دانا حەبا ئەنتی هیستامین ب ئاڤێ',
      'لێدانا دەرزییا هایدرۆکۆرتیزۆن د دەمار دا',
      'دانانا نەخۆشی ل سەر تەختی و چاڤەڕێبوون بۆ ٢٠ دەقان'
    ],
    correctIndex: 0,
    rationaleEn: 'Intramuscular Epinephrine into the vastus lateralis is the ONLY first-line medication proven to halt progression and reduce mortality in anaphylaxis.',
    rationaleKu: 'ئەدرینالین د ناڤ ماسوولکەیا رانی دا تەنیا دەرمانێ سەرەکی و رزگارکەرێ دەستبەجێ یێ ژیانێ یە د شۆکا هەستیاریێ دا.'
  },
  {
    id: 'mcq_3',
    categoryEn: 'Injections & Parenteral Routes',
    categoryKu: 'رێکێن لێدانا دەرزیان',
    questionEn: 'Which anatomical landmark defines the safest adult Intramuscular (IM) Ventrogluteal injection site?',
    questionKu: 'کیژان نیشانێن لەشی جهێ دروست و هەرە ئێمنێ دەرزییا ماسوولکەیێ (Ventrogluteal) دیار دکەن ل دەف کەسێ مەزن؟',
    optionsEn: [
      'Center of the "V" between index finger on ASIS and middle finger along iliac crest, with palm on greater trochanter',
      'Two fingerbreadths below the acromion process of the shoulder',
      'Upper outer quadrant of the buttock near sciatic notch',
      'Directly into the center of the abdomen 2 cm from umbilicus'
    ],
    optionsKu: [
      'ناڤەڕاستا پیتا "V" د ناڤبەرا قامکێ دووێ ل سەر ASIS و قامکێ سێیێ ل سەر حەوزێ، دگەل لەپ ل سەر سەرێ رانی',
      'دوو قامکان خوارتر ژ سەرێ هەستیێ شانێ',
      'پشکا ژووری یا کلاخی نێزیک دەمارێ سیاتیک',
      'ناڤەڕاستا زکی ٢ سم دویر ژ نافکێ'
    ],
    correctIndex: 0,
    rationaleEn: 'The ventrogluteal site utilizes the gluteus medius/minimus muscle, safely away from major nerves (sciatic) and vascular trunks.',
    rationaleKu: 'جهێ ڤێنترۆگلوتیال ئێمن ترین ماسوولکەیە و دویرە ژ دەمارێ مەزنێ سیاتیک و خوینبەران.'
  },
  {
    id: 'mcq_4',
    categoryEn: 'IV Infusions & Drip Rates',
    categoryKu: 'شلەیێن ناڤ دەمار و حیسابکرنا دلۆپان',
    questionEn: 'Physician orders 1,000 mL Normal Saline to infuse over 8 hours. The IV tubing has a drop factor of 20 gtt/mL. What is the correct drip rate in drops per minute (gtt/min)?',
    questionKu: 'نۆشداری فەرمانا دانا ١,٠٠٠ مل یا سەلاینێ کریە د ماوێ ٨ دەمژمێران دا. رێژەیا سۆندەیێ ٢٠ دلۆپ/مل (Drop factor 20). چەند دلۆپ د دەقەکێ دا پێدڤینە؟',
    optionsEn: [
      '42 gtt/min (Formula: [1,000 mL x 20] / [8 hrs x 60 min] = 41.67 ≈ 42)',
      '25 gtt/min',
      '60 gtt/min',
      '125 gtt/min'
    ],
    optionsKu: [
      '٤٢ دلۆپ د دەقەکێ دا (هاوکێشە: [١,٠٠٠ × ٢٠] دابەشی [٨ × ٦٠] = ٤١.٦٧ نێزیکی ٤٢)',
      '٢٥ دلۆپ د دەقەکێ دا',
      '٦٠ دلۆپ د دەقەکێ دا',
      '١٢٥ دلۆپ د دەقەکێ دا'
    ],
    correctIndex: 0,
    rationaleEn: 'Calculation: (Volume in mL x Drop Factor) / (Time in Hours x 60 min). (1000 x 20) / (480) = 20,000 / 480 = 41.67 drops/min, rounded to 42 gtt/min.',
    rationaleKu: 'هاوکێشەیا دلۆپان: (قەبارە ب مل × ژمارەیا دلۆپان) دابەشی (دەمژمێر × ٦٠). ئەنجام دبیتە ٤١.٦٧ کو دهێتە نێزیککرن بۆ ٤٢ دلۆپ د هەر دەقەکێ دا.'
  },
  {
    id: 'mcq_5',
    categoryEn: 'Basic Life Support (BLS)',
    categoryKu: 'بووژاندنەوەیا دلی (BLS & CPR)',
    questionEn: 'According to AHA 2026 guidelines, what are the target rate and depth for high-quality adult chest compressions?',
    questionKu: 'ب پێی رێنمایێن ستانداردێن جیهانی یێن CPR، چەندێتی و کویراتییا دروست یا گوشینا سنگی چەندە؟',
    optionsEn: [
      'Rate 100 - 120 compressions/min; Depth 5 to 6 cm (2 to 2.4 inches)',
      'Rate 60 - 80 compressions/min; Depth 3 cm',
      'Rate 140 - 160 compressions/min; Depth 7 cm',
      'Rate 80 - 100 compressions/min; Depth 4 cm without recoil'
    ],
    optionsKu: [
      'خێرایی ١٠٠ بۆ ١٢٠ لێدان د دەقەێ دا؛ کویراتی ٥ بۆ ٦ سم',
      'خێرایی ٦٠ بۆ ٨٠ لێدان د دەقەێ دا؛ کویراتی ٣ سم',
      'خێرایی ١٤٠ بۆ ١٦٠ لێدان د دەقەێ دا؛ کویراتی ٧ سم',
      'خێرایی ٨٠ بۆ ١٠٠ لێدان بێی راوەستان'
    ],
    correctIndex: 0,
    rationaleEn: 'Compressions between 100-120/min at 5-6 cm depth with full chest recoil maximize coronary and cerebral perfusion pressure while minimizing thoracic trauma.',
    rationaleKu: 'خێراییا ١٠٠-١٢٠ دگەل کویراتیا ٥-٦ سم زۆرترین خوێنێ دگەهینیتە مێشک و دلی بێی شکاندنا هەستیێن سنگی.'
  }
];
