export type NandaDomain =
  | 'cardiovascular'
  | 'respiratory'
  | 'neurological'
  | 'gastrointestinal'
  | 'surgical'
  | 'infection_control'
  | 'endocrine';

export interface CarePlanIntervention {
  actionEn: string;
  actionKu: string;
  rationaleEn: string;
  rationaleKu: string;
  type: 'independent' | 'collaborative';
}

export interface NursingCarePlan {
  id: string;
  conditionEn: string;
  conditionKu: string;
  categoryEn: string;
  categoryKu: string;
  domain: NandaDomain;
  nandaDiagnosisEn: string;
  nandaDiagnosisKu: string;
  nandaBreakdown?: {
    problemEn: string;
    problemKu: string;
    etiologyEn: string;
    etiologyKu: string;
    signsSymptomsEn: string;
    signsSymptomsKu: string;
  };
  definitionEn: string;
  definitionKu: string;
  assessment: {
    subjectiveEn: string[];
    subjectiveKu: string[];
    objectiveEn: string[];
    objectiveKu: string[];
    vitalSignsBaseline?: {
      bp?: string;
      hr?: string;
      rr?: string;
      spO2?: string;
      temp?: string;
    };
  };
  goals: {
    shortTermEn: string;
    shortTermKu: string;
    longTermEn: string;
    longTermKu: string;
  };
  interventions: CarePlanIntervention[];
  evaluation: {
    outcomeCriteriaEn: string;
    outcomeCriteriaKu: string;
    targetResponseEn: string;
    targetResponseKu: string;
  };
}

export const NANDA_DOMAINS: { id: NandaDomain; nameEn: string; nameKu: string; iconName: string }[] = [
  { id: 'cardiovascular', nameEn: 'Cardiovascular Nursing', nameKu: 'پەرستاریا دڵ و دەماران', iconName: 'Heart' },
  { id: 'respiratory', nameEn: 'Respiratory Nursing', nameKu: 'پەرستاریا سیهـ و هەناسێ', iconName: 'Wind' },
  { id: 'neurological', nameEn: 'Neurological Nursing', nameKu: 'پەرستاریا مێشک و دەماران', iconName: 'Activity' },
  { id: 'gastrointestinal', nameEn: 'Gastrointestinal Nursing', nameKu: 'پەرستاریا کۆئەندامێ هەرسی', iconName: 'Stethoscope' },
  { id: 'surgical', nameEn: 'Surgical & Perioperative', nameKu: 'نەشتەرگەری و برینکاری', iconName: 'Scissors' },
  { id: 'infection_control', nameEn: 'Infection Control & Sepsis', nameKu: 'کۆنترۆلا هەوکرنێ و پەتایێ', iconName: 'ShieldAlert' },
  { id: 'endocrine', nameEn: 'Endocrine & Metabolic', nameKu: 'رژێن و نەخۆشیێن شەکرێ', iconName: 'Droplets' }
];

export const NURSING_CARE_PLANS: NursingCarePlan[] = [
  // 1. HYPERTENSION
  {
    id: 'hypertension',
    conditionEn: 'Hypertension (High Blood Pressure)',
    conditionKu: 'بەرزبوونا پەستانی خوێنێ (Hypertension)',
    categoryEn: 'Cardiovascular Nursing',
    categoryKu: 'پەرستاریا دڵ و دەماران',
    domain: 'cardiovascular',
    nandaDiagnosisEn: 'Ineffective Health Self-Management related to complex medication regimen and dietary sodium intake as evidenced by blood pressure > 140/90 mmHg and non-adherence.',
    nandaDiagnosisKu: 'نەگونجانا خود-چاڤدێریا ساخلەمیێ پەیوەندیدار ب ئاڵۆزییا چارەسەریێ و زێدەیا سۆدیۆمێ، ب بەلگەیێ پەستانا خوێنێ > ١٤٠/٩٠ ملم جیوە.',
    nandaBreakdown: {
      problemEn: 'Ineffective Health Self-Management',
      problemKu: 'نەگونجانا خود-چاڤدێریا ساخلەمیێ',
      etiologyEn: 'Complex antihypertensive medication regimen and excessive dietary sodium',
      etiologyKu: 'ئاڵۆزییا بەرنامێ دەرمانان و زۆرییا خویێ د خوارنێ دا',
      signsSymptomsEn: 'Persistent systolic BP > 140 mmHg, diastolic BP > 90 mmHg, missed doses',
      signsSymptomsKu: 'پەستانا بەردەوام یا بەرز، ژبیرڤەچوونا دەرمانان، سەرئێشان'
    },
    definitionEn: 'A persistent elevation of systemic arterial blood pressure that imposes chronic strain on the myocardium and vascular bed.',
    definitionKu: 'بەرزبوونا بەردەوام یا پەستانی خوێنێ د ناڤ لولپێچێن خوینبەردان دا، کو بارگرانیێ دئێخیتە سەر ماسوولکێن دلی و ئەندامێن سەرەکی.',
    assessment: {
      subjectiveEn: [
        'Patient reports occipital morning headache, dizziness, and fatigue',
        'Admits to consuming high-sodium canned foods and missing medication doses',
        'Expresses anxiety regarding cardiovascular disease complications'
      ],
      subjectiveKu: [
        'نەخۆش بەحسێ سەرئێشانا پاشەسەری، گێژبوون و ماندیبوونێ دکەت',
        'دبێژیت خوارنێن سوێر و قودیکری د خوت و دەرمانێن خوە ب رێکی ناخوت',
        'دوودل و نیگەرانە ژ مەترسیێن جەڵتەیا دلی یان مێشکی'
      ],
      objectiveEn: [
        'Blood Pressure readings: 158/96 mmHg (Right Arm), 154/94 mmHg (Left Arm)',
        'BMI: 30.2 kg/m² (Class I Obesity)',
        'Fundoscopic exam reveals mild arteriolar narrowing',
        'Normal serum creatinine (0.9 mg/dL) and normal ECG sinus rhythm'
      ],
      objectiveKu: [
        'پێڤانا پەستانێ: ١٥٨/٩٦ ملم جیوە ل دەستێ راستێ، ١٥٤/٩٤ ل دەستێ چەپێ',
        'کێشا زێدە (BMI: 30.2 kg/m²)',
        'تەسکبوونا هویر لولپێچێن چاڤی',
        'کریاتینینا گولیچکان نورمالە (0.9 mg/dL) و شریتێ دلی (ECG) لێدانا نورمال نیشان ددەت'
      ],
      vitalSignsBaseline: {
        bp: '158/96 mmHg',
        hr: '84 bpm',
        rr: '16 bpm',
        spO2: '98%',
        temp: '36.8°C'
      }
    },
    goals: {
      shortTermEn: 'Patient will demonstrate BP < 130/80 mmHg and identify 3 low-sodium food substitutes within 48 hours.',
      shortTermKu: 'پەستانا خوێنێ د دەمێ ٤٨ دەمژمێران دا دێ دابەزیتە ژێر ١٣٠/٨٠ ملم جیوە و نەخۆش دێ ٣ جورێن خوارنا کێم خوی پێناسە کەت.',
      longTermEn: 'Patient will maintain target BP < 130/80 mmHg at 3-month follow-up without adverse antihypertensive symptoms.',
      longTermKu: 'نەخۆش دێ پەستانا خوە یا نورمال < ١٣٠/٨٠ ب پارێزیت پشتی ٣ هەیڤان و دەرمانێن خوە ب دروستی دێ خوت.'
    },
    interventions: [
      {
        actionEn: 'Assess blood pressure in both arms using an appropriately sized cuff; record readings after 5 minutes of rest.',
        actionKu: 'پێڤانا پەستانا خوێنێ ل هەردوو دەستان ب قیاسێ دروست پشتی ٥ خولەکێن بێهنڤەدانێ.',
        rationaleEn: 'An improperly sized cuff causes inaccurate readings; baseline bilateral measurement detects subclavian artery stenosis.',
        rationaleKu: 'قیاسێ نەدروستێ قۆلپێ پەستانێ خەلەت ددەتە دەر؛ پێڤانا هەردوو دەستان رێگریێ ل خەلەتییان دکەت.',
        type: 'independent'
      },
      {
        actionEn: 'Administer prescribed antihypertensive agents (e.g., Amlodipine 5 mg PO daily); observe for orthostatic hypotension.',
        actionKu: 'دانا دەرمانێ دابەزاندنا پەستانێ (وەکی ئەمڵۆدیپین ٥ مگم) و چاڤدێریا گێژبوونێ د دەمێ رابوونێ دا.',
        rationaleEn: 'Calcium channel blockers induce arterial vasodilation; abrupt positional changes can induce reflex orthostasis.',
        rationaleKu: 'دەرمان خوینبەران بەرفرەهـ دکەن؛ گوهۆڕینا لەزگین یا جهێ لەشی دبیتە ئەگەرێ گێژبوون و کەفتنێ.',
        type: 'collaborative'
      },
      {
        actionEn: 'Educate patient and family on Dietary Approaches to Stop Hypertension (DASH diet) limiting sodium to < 2,000 mg/day.',
        actionKu: 'فێرکرنا نەخۆشی ل سەر پارێزا خوارنێ یا DASH و کێمکرنا خویێ بۆ کێمتر ژ ٢٠٠٠ مگم ل رۆژەکێ.',
        rationaleEn: 'Sodium restriction reduces intravascular volume overload and peripheral vascular resistance.',
        rationaleKu: 'کێمکرنا خویێ قەبارەیێ شلەیێ د ناڤ خوینێ دا کێم دکەت و بارێ دلی سڤک دکەت.',
        type: 'independent'
      },
      {
        actionEn: 'Instruct patient to maintain a daily home BP log and teach warning signs of hypertensive emergency (> 180/120 mmHg).',
        actionKu: 'رێنماییکرنا نەخۆشی بۆ تومارکرنا رۆژانە یا پەستانێ و نیاسینا نیشانێن تەنگاڤیا مەترسیدار (> ١٨٠/١٢٠).',
        rationaleEn: 'Empowers self-management and ensures prompt emergency department presentation prior to end-organ damage.',
        rationaleKu: 'رێگریێ ل تێکچوونا گولیچکان و جەڵتەیا مێشکی دگریت ب سەردانا لەزگین یا خەستەخانێ.',
        type: 'independent'
      }
    ],
    evaluation: {
      outcomeCriteriaEn: 'Systolic BP remains between 120-128 mmHg; patient accurately recalls prescribed medication timing and low-sodium choices.',
      outcomeCriteriaKu: 'پەستانا خوێنێ د ناڤبەرا ١٢٠-١٢٨ دایە؛ نەخۆش دەمێن دەرمانێن خوە و خوارنا ساخلەم ب دروستی دزانیت.',
      targetResponseEn: 'Goal met. Morning BP stabilized at 126/78 mmHg. Patient reports zero dizziness and brought completed 7-day log.',
      targetResponseKu: 'ئارمانج ب دەست هات. پەستان ل سەر ١٢٦/٧٨ ملم جیوە جێگیر بوو و نەخۆش راپۆرتا حەفتیانە یا پێڤانێ نیشان دا.'
    }
  },

  // 2. ACUTE MYOCARDIAL INFARCTION (STEMI/NSTEMI)
  {
    id: 'myocardial_infarction',
    conditionEn: 'Acute Myocardial Infarction (STEMI / Heart Attack)',
    conditionKu: 'جەڵتەیا دلی یا توند (Myocardial Infarction / STEMI)',
    categoryEn: 'Cardiovascular Nursing',
    categoryKu: 'پەرستاریا دڵ و دەماران',
    domain: 'cardiovascular',
    nandaDiagnosisEn: 'Acute Pain related to myocardial tissue ischemia and lack of oxygen as evidenced by substernal crushing chest pressure radiating to left arm and diaphoresis.',
    nandaDiagnosisKu: 'ئێشانا توند یا سنگێ پەیوەندیدار ب کێمبوونا ئۆکسجین و خوینێ بۆ ماسوولکەیا دلی، ب بەلگەیێ گوشارێ ل سەر سنگی و ئارەقکرنێ.',
    nandaBreakdown: {
      problemEn: 'Acute Cardiac Pain',
      problemKu: 'ئێشانا توند یا سنگێ',
      etiologyEn: 'Coronary artery occlusion producing acute myocardial ischemia and necrosis',
      etiologyKu: 'گرتن یان تەسکبوونا خوینبەرێن تاجی یێن دلی',
      signsSymptomsEn: 'Substernal pressure rated 9/10, radiating to jaw/left arm, diaphoresis, ST-elevation on ECG',
      signsSymptomsKu: 'گوشارا سنگێ (٩ ژ ١٠)، بەلاڤبوون بۆ ملێ چەپێ، ئارەقکرنا سار، بلندبوونا هێلا ST ل شریتێ دلی'
    },
    definitionEn: 'Necrosis of myocardial tissue caused by acute obstruction of coronary blood flow, requiring rapid reperfusion therapy.',
    definitionKu: 'مرنا پشکەک ژ ماسوولکەیا دلی ژ ئەگەرێ بڕینا لەزگین یا خوینێ د ناڤ لولپێچێن تاجی دا، پێدڤی ب چارەسەریا دەستبەجێ یە.',
    assessment: {
      subjectiveEn: [
        'Crushing retrosternal chest pain (9/10) lasting > 30 minutes, radiating to left shoulder and jaw',
        'Severe nausea, shortness of breath, and feeling of impending doom',
        'Pain unrelieved by rest or sublingual nitroglycerin'
      ],
      subjectiveKu: [
        'ئێشانەکا گەلەک توند ل ناڤەراستا سنگی (٩ ژ ١٠) کو زێدەتر ژ ٣٠ دەقان ڤەکێشایە',
        'دڵرابوون، هەناسەتەنگی و هەستکرن ب نێزیکبوونا مرنێ',
        'ئێشان ب بێهنڤەدانێ یان حەبا بن ئەزمانی نەڕاوەستایە'
      ],
      objectiveEn: [
        '12-Lead ECG: ST-segment elevation ≥ 2 mm in leads II, III, aVF (Inferior STEMI)',
        'Serum Troponin I elevated at 4.2 ng/mL (Normal < 0.04)',
        'Skin cool, clammy, and pale with profuse diaphoresis',
        'Heart Rate: 104 bpm (sinus tachycardia), BP: 146/92 mmHg'
      ],
      objectiveKu: [
        'شریتێ دلی (ECG): بلندبوونا بەرچاڤ یا هێلا ST د بەشێن II, III, aVF دا',
        'پشکنینا ئەنزیمێ دلی (Troponin I) زۆر بەرزە: 4.2 ng/mL',
        'پێست سار و تەڕە ب ئارەقەکا زۆر ڤە',
        'لێدانا دلی ١٠٤ و پەستان ١٤٦/٩٢ ملم جیوە'
      ],
      vitalSignsBaseline: {
        bp: '146/92 mmHg',
        hr: '104 bpm',
        rr: '24 bpm',
        spO2: '93%',
        temp: '37.1°C'
      }
    },
    goals: {
      shortTermEn: 'Patient will report chest pain reduced to 0/10 within 30 minutes of emergency medical and reperfusion protocol.',
      shortTermKu: 'ئێشانا سنگێ دێ دابەزیتە ٠ ژ ١٠ د دەمێ ٣٠ خولەکان دا پشتی دەستپێکرنا پرۆتۆکۆلێ لەزگین یێ بووژاندنەوەیێ.',
      longTermEn: 'Patient will achieve complete myocardial reperfusion without lethal dysrhythmias or heart failure complications.',
      longTermKu: 'ڤەکرنا تەمام یا خوینبەرێن دلی بێ دروستبوونا لێدانا ناڕێک یا مرنبار یا دلی.'
    },
    interventions: [
      {
        actionEn: 'Administer Aspirin 300 mg chewed immediately; administer sublingual Nitroglycerin 0.4 mg q5min (up to 3 doses if SBP > 90).',
        actionKu: 'دانا ئەسپرین ٣٠٠ مگم ب جوین دەستبەجێ؛ دانا نایترۆگلیسرین بن ئەزمانی هەر ٥ دەقان ئەگەر پەستان ژ ٩٠ نزمتر نەبیت.',
        rationaleEn: 'Chewed aspirin rapidly inhibits platelet aggregation; nitroglycerin dilates coronary vessels reducing cardiac preload.',
        rationaleKu: 'جوینا ئەسپرینێ رێگریێ ل مەیینا خوینێ دگریت؛ نایترۆگلیسرین دەمارێن دلی ڤەدکەت و ئێشانێ کێم دکەت.',
        type: 'collaborative'
      },
      {
        actionEn: 'Apply supplemental Oxygen via nasal cannula only if oxygen saturation SpO2 is < 90%.',
        actionKu: 'دانانا ئۆکسجینێ ب کونێن لڤیکی بتنێ ئەگەر تێربوونا ئۆکسجینێ (SpO2) کێمتر بوو ژ ٩٠٪.',
        rationaleEn: 'Hyperoxia in non-hypoxemic STEMI patients induces coronary vasoconstriction and increases myocardial infarct size.',
        rationaleKu: 'زێدە دانا ئۆکسجینێ بێ پێدڤی لولپێچێن دلی تەسک دکەت و زیانێ زێدە دکەت.',
        type: 'independent'
      },
      {
        actionEn: 'Maintain continuous 12-lead ECG telemetry monitoring and prepare defibrillator / crash cart at bedside.',
        actionKu: 'چاڤدێریا بەردەوام یا شریتێ دلی ب مۆنیتەرێ و ئامادەکرنا ئامیرێ شۆکا کارەبایی (Defibrillator) ل تەنشت سەرێ نەخۆشی.',
        rationaleEn: 'Ventricular fibrillation (VF) is the leading cause of sudden cardiac death in the first hour of STEMI.',
        rationaleKu: 'لەرزینا ژوورکێن دلی (VF) مەترسیدارترین هۆکارێ مرنا ژنشکێڤە یە د دەمژمێرا ئێکێ دا.',
        type: 'independent'
      },
      {
        actionEn: 'Establish two large-bore IV lines (18-gauge) and prepare patient for emergency Cardiac Catheterization (PCI door-to-balloon < 90 min).',
        actionKu: 'دانانا دوو کانۆلێن مەزن (قیاس ١٨) و ئامادەکرنا نەخۆشی بۆ قەستەرەیا لەزگین د کێمتر ژ ٩٠ خولەکان دا.',
        rationaleEn: 'Rapid percutaneous coronary intervention restores coronary blood flow and salvages ischemic myocardium.',
        rationaleKu: 'قەستەرەیا لەزگین خوینبەرێ گرتی ڤەدکەت و ماسوولکەیا دلی ژ مرنێ رزگار دکەت.',
        type: 'collaborative'
      }
    ],
    evaluation: {
      outcomeCriteriaEn: 'Chest pain completely resolved (0/10), ST-segment elevation resolved on follow-up ECG, cardiac enzymes trending downward.',
      outcomeCriteriaKu: 'ئێشانا سنگی نەمایە (٠ ژ ١٠)، هێلا ST ل سەر شریتێ دلی ئاسایی بوویە، ئەنزیمێن دلی بەرەڤ دابەزینێ نە.',
      targetResponseEn: 'Goal met. Successful PCI with stent to LAD artery. Patient resting comfortably with pain 0/10 and normal sinus rhythm.',
      targetResponseKu: 'ئارمانج ب دەست هات. قەستەرە سەرکەفتی بوو و تۆڕ (Stent) هاتە دانان. نەخۆش ئارامە و لێدانا دلی یا رێکە.'
    }
  },

  // 3. ACUTE ISCHEMIC STROKE (NEUROLOGICAL)
  {
    id: 'ischemic_stroke',
    conditionEn: 'Acute Ischemic Stroke (Cerebrovascular Accident - CVA)',
    conditionKu: 'جەڵتەیا مێشکی یا توند (Stroke / CVA)',
    categoryEn: 'Neurological Nursing',
    categoryKu: 'پەرستاریا مێشک و دەماران',
    domain: 'neurological',
    nandaDiagnosisEn: 'Ineffective Cerebral Tissue Perfusion related to focal thrombus occlusion of cerebral artery as evidenced by acute right-sided hemiparesis and expressive aphasia.',
    nandaDiagnosisKu: 'کێمبوونا گەهشتنا خوینێ بۆ دەمار و مێشکی پەیوەندیدار ب مەیینا خوینێ د دەمارەکێ مێشکی دا، ب بەلگەیێ شەلەل بوونا لایێ راستێ و گرانبوونا ئاخڤتنێ.',
    nandaBreakdown: {
      problemEn: 'Ineffective Cerebral Tissue Perfusion',
      problemKu: 'کێمبوونا خوینێ بۆ شانەیێن مێشکی',
      etiologyEn: 'Embolic or thrombotic occlusion of middle cerebral artery (MCA)',
      etiologyKu: 'گرتنا خوینبەرا ناڤین یا مێشکی ب تۆپەڵا خوینێ',
      signsSymptomsEn: 'Right facial droop, right arm/leg weakness (0/5), expressive aphasia, NIHSS score 14',
      signsSymptomsKu: 'خواربوونا دەڤی ل لایێ راستێ، سڕبوونا دەست و پێیان، گرانبوونا زمان و ئاخڤتنێ'
    },
    definitionEn: 'Sudden loss of neurological function caused by vascular occlusion in the brain, requiring emergency evaluation and thrombolysis within 4.5 hours.',
    definitionKu: 'ژ دەستدانا ژنشکێڤە یا کاریگەرییا مێشکی ژ ئەگەرێ نەگەهشتنا خوینێ، کو پێدڤی ب چارەسەریا تێکدانا مەیینێ یە د دەمێ ٤.٥ دەمژمێران دا.',
    assessment: {
      subjectiveEn: [
        'Family states patient suddenly lost ability to speak and dropped glass from right hand 45 minutes ago',
        'Patient makes groaning sounds attempting to speak; appears frightened and disoriented',
        'History of untreated atrial fibrillation and hypertension'
      ],
      subjectiveKu: [
        'کەسۆکار دبێژن نەخۆش بەری ٤٥ دەقان ژنشکێڤە زمانێ وی گران بوو و گڵاس ژ دەستێ وی کەفت',
        'نەخۆش ب دەنگ دئاخڤیت بەلێ پەیڤ دەرناکەڤن و ترسیا یە',
        'پێشینەیا ناڕێکییا لێدانا دلی (AFib) و بەرزبوونا پەستانێ هەیە'
      ],
      objectiveEn: [
        'BE-FAST Screen positive: Right facial droop, right arm drift (0/5 strength), slurred unintelligible speech',
        'NIHSS (NIH Stroke Scale) Score: 14 (Moderate-to-Severe Stroke)',
        'Emergency non-contrast Head CT: No intracranial hemorrhage detected',
        'Fingerstick blood glucose: 118 mg/dL (rules out hypoglycemia mimic)'
      ],
      objectiveKu: [
        'پشکنینا BE-FAST: خواربوونا دەڤی، سستبوونا دەستێ راستێ، گرانبوونا ئاخڤتنێ',
        'نمرەیا نیشانێن جەڵتەیێ (NIHSS): ١٤ (قۆناغا ناڤین بۆ دژوار)',
        'تەنوورێ مێشکی (CT Scan بێ دەرزی): خوینبەربوون د ناڤ مێشکی دا نینە',
        'شەکرا خوینێ: ١١٨ (کێمبوونا شەکرێ هاتە رەتکرن)'
      ],
      vitalSignsBaseline: {
        bp: '172/98 mmHg',
        hr: '92 bpm (irregular - AFib)',
        rr: '18 bpm',
        spO2: '97%',
        temp: '37.0°C'
      }
    },
    goals: {
      shortTermEn: 'Patient will undergo door-to-needle thrombolytic therapy within 60 minutes of ED arrival with NIHSS improvement ≥ 4 points within 24 hours.',
      shortTermKu: 'وەرگرتنا دەرمانێ شلوڤەکەری یێ مەیینێ (tPA) د کێمتر ژ ٦٠ خولەکان دا و باشتربوونا نیشانێن جەڵتەیێ د دەمێ ٢٤ سەعەتان دا.',
      longTermEn: 'Patient will regain functional mobility, prevent aspiration pneumonia, and achieve stroke rehabilitation goals.',
      longTermKu: 'زڤڕینا تەڤگەرا دەست و پێیان، رێگری ل خنکاندنا ب خوارنێ (Aspiration) و دەستپێکرنا راهێنانێن فیزیۆتێراپیێ.'
    },
    interventions: [
      {
        actionEn: 'Strictly record exact "Last Known Well" (LKW) time and maintain NPO (nothing by mouth) strictly pending dysphagia screen.',
        actionKu: 'تومارکرنا هویر یا دەمێ دروستێ نەخۆشکەفتنێ و قەدەغەکرنا خوارن و ڤەخوارنێ دەستبەجێ تا پشکنینا داویرانێ دهێتە کرن.',
        rationaleEn: 'IV thrombolytic (rtPA/Alteplase) window is strictly < 4.5 hours from LKW; impaired gag reflex carries massive aspiration risk.',
        rationaleKu: 'دەرمانێ هەلوەشاندنا مەیینێ بتنێ د دەمێ ٤.٥ دەمژمێرێن دەستپێکێ دا دهێتە دان؛ نەخۆش د مەترسیا خنکاندنێ دایە.',
        type: 'independent'
      },
      {
        actionEn: 'Monitor and maintain blood pressure < 185/110 mmHg prior to thrombolytic infusion using IV Labetalol or Nicardipine.',
        actionKu: 'چاڤدێریکرن و راگرتنا پەستانێ ل ژێر ١٨٥/١١٠ ملم جیوە بەری دانا دەرمانێ شلوڤەکەر ب دەرزییا لابیتاڵۆل.',
        rationaleEn: 'Blood pressure exceeding 185/110 mmHg carries high risk of fatal intracranial hemorrhage during thrombolysis.',
        rationaleKu: 'ئەگەر پەستان ژ ١٨٥ بەرزتر بیت و دەرمانێ مەیینێ بهێتە دان، خوینبەربوونا مێشکی چێدبیت و دبیتە ئەگەرێ مرنێ.',
        type: 'collaborative'
      },
      {
        actionEn: 'Perform neurological assessments (pupil reactivity, motor strength, GCS/NIHSS) every 15 minutes during tPA infusion.',
        actionKu: 'پشکنینا هویر یا چاڤان، هۆش و شیانا لەشی هەر ١٥ خولەکان د دەمێ دانا دەرمانی دا.',
        rationaleEn: 'Detects immediate neurological decline indicating hemorrhagic transformation.',
        rationaleKu: 'دەستبەجێ ئاگەهداری گوهۆڕینێن مەترسیدار یێن مێشکی ددەت.',
        type: 'independent'
      },
      {
        actionEn: 'Elevate head of bed 30 degrees and maintain head and neck in neutral alignment.',
        actionKu: 'بلندکرنا سەرێ تەختی ب گۆشەیا ٣٠ پلە و رێکخستنا ستۆی ب دروستی.',
        rationaleEn: 'Promotes venous drainage from the brain and reduces intracranial pressure (ICP).',
        rationaleKu: 'زڤڕینا خوینێ ژ مێشکی ب ساناهی دئێخیت و پەستانا سەر مێشکی کێم دکەت.',
        type: 'independent'
      }
    ],
    evaluation: {
      outcomeCriteriaEn: 'NIHSS score improves to < 6; right motor power improves to 3/5; no signs of bleeding or secondary neurological deficit.',
      outcomeCriteriaKu: 'نمرەیا جەڵتەیێ بەرەڤ باشیێ چوو بۆ کێمتر ژ ٦؛ هێزا دەستێ راستێ باشتر بوو؛ چ نیشانێن خوینبەربوونێ دیار نەبوون.',
      targetResponseEn: 'Goal met. IV Alteplase completed without complications. Patient now moving right arm against gravity and speaking single words.',
      targetResponseKu: 'ئارمانج ب دەست هات. دەرمان هاتە دان ب سەرکەفتی. نەخۆش نۆکە دەستێ خوە بلند دکەت و دشێت پەیڤان بێژیت.'
    }
  },

  // 4. ACUTE GASTROINTESTINAL BLEEDING & PEPTIC ULCER
  {
    id: 'gi_bleed_peptic_ulcer',
    conditionEn: 'Acute Upper GI Bleeding & Peptic Ulcer Disease',
    conditionKu: 'خوێنبەربوونا توند یا گەدەی و برینا مەعیدێ (Upper GI Bleed)',
    categoryEn: 'Gastrointestinal Nursing',
    categoryKu: 'پەرستاریا کۆئەندامێ هەرسی',
    domain: 'gastrointestinal',
    nandaDiagnosisEn: 'Deficient Fluid Volume related to acute gastrointestinal vascular hemorrhage as evidenced by hematemesis, melena, resting tachycardia, and hypotension.',
    nandaDiagnosisKu: 'کێمبوونا شلە و خوینا لەشی پەیوەندیدار ب خوێنبەربوونا د ناڤ گەدەی دا، ب بەلگەیێ رشتنا خوینێ، رەشبوونا پیساتیێ و دابەزینا پەستانێ.',
    nandaBreakdown: {
      problemEn: 'Deficient Fluid Volume / Hemorrhagic Shock Risk',
      problemKu: 'کێمبوونا قەبارەیێ شلە و خوێنێ د لەشی دا',
      etiologyEn: 'Erosion of gastric or duodenal mucosa by peptic ulcer into submucosal blood vessel',
      etiologyKu: 'کۆلبوونا برینا گەدەی و تەقینا لولپێچەکا خوینێ',
      signsSymptomsEn: 'Coffee-ground emesis, black tarry stools (melena), orthostatic BP drop, tachycardia (HR 116)',
      signsSymptomsKu: 'رشتنا خوینا رەش یان قاوەیی، پیساتیا رەش وەک قیرێ، پەستان ٨٨/٥٤ و لەزبوونا لێدانا دلی'
    },
    definitionEn: 'Acute extravasation of blood from the upper gastrointestinal tract proximal to the ligament of Treitz, posing imminent risk of hypovolemic shock.',
    definitionKu: 'خوێنبەربوونا بلەز ژ گەدە یان دوازدەگرێ کو دبیتە هۆکارێ ژدەستدانا لەزگین یا خوێنێ و شۆکا نزمبوونا قەبارەیێ خوێنێ.',
    assessment: {
      subjectiveEn: [
        'Patient reports two episodes of large-volume bright red hematemesis and black tarry stool this morning',
        'Severe burning epigastric pain (7/10) worsened over previous 3 weeks with heavy NSAID (Ibuprofen) use',
        'Complains of severe lightheadedness, cold sweating, and extreme weakness upon standing'
      ],
      subjectiveKu: [
        'نەخۆش دبێژیت دوو جاران خوینا سۆر یا زۆر ڤەڕشاندیە و پیساتیا وی رەش بوویە',
        'ئێشانەکا سۆتنێ ل سەر دلێ وی هەیە پشتی بکارئینانا زۆرا حەبێن ئێشکوژ (Ibuprofen)',
        'هەست ب گێژبوونەکا توند و بێهێزیێ دکەت دەمێ رادبیتە سەر پێیان'
      ],
      objectiveEn: [
        'Blood Pressure: 88/54 mmHg, Heart Rate: 118 bpm (sinus tachycardia)',
        'Hemoglobin: 7.4 g/dL (dropped from 13.5 baseline), Hematocrit: 22%',
        'Nasogastric aspirate returns 400 mL dark red bloody fluid',
        'Skin pale, cold, and diaphoresis with cap refill 4 seconds'
      ],
      objectiveKu: [
        'پەستانا خوێنێ: ٨٨/٥٤ ملم جیوە، لێدانا دلی: ١١٨ ل دەقەکێ (لەزبوونا دلی)',
        'رێژەیا خوێنێ (Hb): 7.4 g/dL (ژ ١٣.٥ دابەزیە)، جامی خوینێ دابەزیە',
        'سۆندا گەدەی (NG Tube) ٤٠٠ مل خوینا سۆر دئینیتە دەر',
        'پێست زەرد و سارە و زڤڕینا خوینێ ل نینۆکان هێواشە (٤ چرکە)'
      ],
      vitalSignsBaseline: {
        bp: '88/54 mmHg',
        hr: '118 bpm',
        rr: '22 bpm',
        spO2: '96%',
        temp: '36.4°C'
      }
    },
    goals: {
      shortTermEn: 'Patient will maintain Mean Arterial Pressure (MAP) ≥ 65 mmHg, urine output > 30 mL/hr, and active hematemesis ceased within 6 hours.',
      shortTermKu: 'پەستانا خوینێ دێ زڤڕیتە ئاستێ پاراستنێ (MAP ≥ ٦٥)، میزکرن پتر ژ ٣٠ مل د دەمژمێرەکێ دا و خوێنبەربوون دێ ڕاوەستیت.',
      longTermEn: 'Hemoglobin stabilized > 9.0 g/dL post-endoscopy and mucosal healing achieved without recurrent hemorrhage.',
      longTermKu: 'رێژەیا خوێنێ دێ جێگیر بیت > ٩ و برینا گەدەی دێ چاک بیت ب رێکا نازوورێ بێ دوبارەبوونا خوێنبەربوونێ.'
    },
    interventions: [
      {
        actionEn: 'Insert two large-bore 16 or 18-gauge IV cannulas and infuse rapid crystalloids (Normal Saline or Ringer Lactate) 1,000 mL bolus.',
        actionKu: 'دانانا دوو کانۆلێن مەزن (قیاس ١٦ یان ١٨) و دانا بلەز یا ١,٠٠٠ مل ئاڤا سەلاینێ یان رینگەر.',
        rationaleEn: 'Rapid intravascular volume expansion prevents circulatory collapse and irreversible organ ischemia.',
        rationaleKu: 'دانا بلەز یا شلەیێ رێگریێ ل وەستانا دلی و ژکارکەفتنا گورچیلکان دگریت ژ ئەگەرێ کێمبوونا خوینێ.',
        type: 'independent'
      },
      {
        actionEn: 'Administer IV high-dose Proton Pump Inhibitor (Pantoprazole / Esomeprazole 80 mg IV bolus followed by 8 mg/hr continuous infusion).',
        actionKu: 'دانا دەرمانێ پاراستنا گەدەی ب دۆزێ بلند (Pantoprazole ٨٠ مگم) دەستبەجێ و پاشان بەردەوام د ناڤ موغەزیێ دا.',
        rationaleEn: 'Raising gastric pH > 6 stabilizes fibrin blood clots over bleeding vessels and prevents clot dissolution by pepsin.',
        rationaleKu: 'بلندکرنا پلەیا ترشییا گەدەی پەرپێچەکێ پارێزەر ل سەر جهێ برینێ دروست دکەت دا خوێنبەربوون ڕاوەستیت.',
        type: 'collaborative'
      },
      {
        actionEn: 'Type and screen / crossmatch 4 units Packed Red Blood Cells (PRBCs); transfuse when Hb < 7-8 g/dL or active hemodynamic instability.',
        actionKu: 'پشکنینا گرۆپێ خوینێ و ئامادەکرنا ٤ بوتڵێن خوینێ (PRBCs) بۆ لێدانێ ب پێدڤیبوونێ.',
        rationaleEn: 'Restores oxygen-carrying capacity in significant blood loss to avert myocardial and cerebral hypoxia.',
        rationaleKu: 'گەهاندنا ئۆکسجینێ بۆ ئەندامێن سەرەکی یێن لەشی دپارێزیت.',
        type: 'collaborative'
      },
      {
        actionEn: 'Maintain patient strict NPO and prepare for emergency esophagogastroduodenoscopy (EGD) within 12-24 hours.',
        actionKu: 'قەدەغەکرنا خوارن و ڤەخوارنێ و ئامادەکرنا نەخۆشی بۆ نازوورا گەدەی (EGD) بۆ گرتنا برینێ.',
        rationaleEn: 'Endoscopic clips, thermal coagulation, or epinephrine injection achieve direct definitive hemostasis.',
        rationaleKu: 'نازوورا بلەز دشێت راستەوخۆ دەمارێ خوێنبەربووی ب گرتن یان دەرزیێ ڕابگریت.',
        type: 'independent'
      }
    ],
    evaluation: {
      outcomeCriteriaEn: 'Vital signs normalized (BP > 110/70, HR < 85 bpm); clear gastric aspirate, hemoglobin stable on repeat CBC, adequate urine output.',
      outcomeCriteriaKu: 'پەستان و لێدانا دلی ئاسایی بوون (BP > ١١٠/٧٠، HR < ٨٥)؛ سۆندا گەدەی پاقژ بوو و خوینا وی جێگیر بوو.',
      targetResponseEn: 'Goal met. EGD placed 2 hemoclips over bleeding duodenal ulcer. Transfused 2 units PRBCs, Hb stable at 9.6 g/dL, vitals stable.',
      targetResponseKu: 'ئارمانج ب دەست هات. ب نازوورێ دوو کلێپس ل سەر برینێ هاتنە دانان و ٢ بوتڵێن خوینێ وەرگرتن. نۆکە رەوشا وی یا جێگیرە.'
    }
  },

  // 5. POST-OPERATIVE SURGICAL CARE & WOUND HEALING
  {
    id: 'post_op',
    conditionEn: 'Post-Operative Abdominal Surgery & Acute Pain',
    conditionKu: 'چاڤدێریا پشتی نەشتەرگەرییا زکی و ئێشانا برینێ (Post-Op Care)',
    categoryEn: 'Surgical & Perioperative',
    categoryKu: 'نەشتەرگەری و برینکاری',
    domain: 'surgical',
    nandaDiagnosisEn: 'Acute Surgical Pain related to mechanical tissue trauma and surgical incision as evidenced by self-report of 8/10 pain, muscle guarding, and reluctance to ambulate.',
    nandaDiagnosisKu: 'ئێشانا توند یا نەشتەرگەریێ پەیوەندیدار ب برینا تیغێ و بریندارییا شانەیان، ب بەلگەیێ سکالایا ٨ ژ ١٠ یا ئێشانێ و نەشیا رێڤەچوونێ.',
    nandaBreakdown: {
      problemEn: 'Acute Surgical Pain & Impaired Mobility',
      problemKu: 'ئێشانا توند یا برینا نەشتەرگەریێ',
      etiologyEn: 'Surgical laparotomy incision and visceral nerve stimulation',
      etiologyKu: 'برینا نەشتەرگەریێ ل سەر پیستی و ماسوولکان',
      signsSymptomsEn: 'Incisional pain rated 8/10, shallow splinted respirations, refusal to cough or deep breathe',
      signsSymptomsKu: 'ئێشانا زکی (٨ ژ ١٠)، نەوێرانا هەناسەدانا کویر ژ ترسا ئێشانێ، گرتنا جهێ برینێ'
    },
    definitionEn: 'The specialized nursing management required following an operative intervention to restore physiological homeostasis and avert postoperative complications.',
    definitionKu: 'چاڤدێریا هویر یا پەرستاریێ پشتی دەرکەفتن ژ هۆلا نەشتەرگەریێ بۆ رێگریکرن ل پەتا و جەڵتەیان و کێمکرنا ئێشانێ.',
    assessment: {
      subjectiveEn: [
        'Patient rates lower abdominal incision pain as 8/10 with sharp throbbing on movement',
        'States: "I can\'t cough or breathe deeply because it feels like my stitches will tear open"',
        'Reports moderate surgical nausea and dry mouth'
      ],
      subjectiveKu: [
        'نەخۆش دبێژیت ئێشانا برینێ ٨ ژ ١٠ یە و دەمێ دلڤیت دئێشیت',
        'دبێژیت: "نەشێم بکوخم یان هەناسەیا کویر بکێشم ژ ترسا ڤەبوونا تەقەڵێن برینێ"',
        'بەحسێ دلڕابوون و هشکبوونا دەڤی دکەت'
      ],
      objectiveEn: [
        'Surgical midline dressing dry, intact with minimal serosanguinous striation',
        'Hypoactive bowel sounds in all 4 quadrants; abdomen soft but guarded',
        'Shallow respirations (rate 22 bpm) and incentive spirometry volume only 500 mL',
        'Incision lines approximated without dehiscence, erythema, or purulent drainage'
      ],
      objectiveKu: [
        'پێچانا سەر برینێ هشک و پاقژە و کێمەک ئاڤا زەرد دگەل دایە',
        'دەنگێن رۆڤیان کێمن؛ زکێ وی کێمەک رەقە ژ ترسا ئێشانێ',
        'هەناسەدانا وی یا تەنکە ژ ترسا ئێشانێ و هەناسەیا کویر ناکێشیت',
        'تەقەڵێن برینێ قایمن و چ سۆربوون یان چڵک ل سەر نینە'
      ],
      vitalSignsBaseline: {
        bp: '132/82 mmHg',
        hr: '90 bpm',
        rr: '22 bpm',
        spO2: '96%',
        temp: '37.3°C'
      }
    },
    goals: {
      shortTermEn: 'Patient will report pain ≤ 3/10 within 30 minutes of analgesic administration and achieve incentive spirometry volume ≥ 1,000 mL.',
      shortTermKu: 'ئێشان دێ دابەزیتە ٣ یان کێمتر پشتی وەرگرتنا دەرمانی و نەخۆش دێ ئامیرێ هەناسێ بۆ پتر ژ ١,٠٠٠ مل کێشیت.',
      longTermEn: 'Patient will ambulate in hallway 3 times daily, tolerate oral diet, and surgical wound heal by primary intention without infection.',
      longTermKu: 'نەخۆش دێ رۆژێ ٣ جاران پیاسێ کەت، خوارنێ خوت و برین دێ ب پاقژی ساڕێژ بیت بێ هەوکرن.'
    },
    interventions: [
      {
        actionEn: 'Administer multimodal analgesia (IV Paracetamol 1 g + prescribed IV opioid e.g. Tramadol or Morphine) 30 min before planned mobilization.',
        actionKu: 'دانا دەرمانێن ئێشکوژ (پاراسیتامۆل دگەل ترامادۆل) ٣٠ خولەکان بەری لڤین و رابوونا نەخۆشی.',
        rationaleEn: 'Pre-emptive multimodal analgesia reduces opioid requirements and enables active deep breathing and ambulation.',
        rationaleKu: 'دانا دەرمانی بەری لڤینێ ئێشانێ کێم دکەت و هاریکارە نەخۆش ب ساناهی راببیتە سەر پێیان.',
        type: 'collaborative'
      },
      {
        actionEn: 'Teach patient wound splinting using a firm pillow pressed against the abdominal incision during coughing and deep breathing.',
        actionKu: 'فێرکرنا نەخۆشی بۆ گرتنا بالیفکەکێ ب توندی ل سەر برینێ د دەمێ کۆخین یان هەناسەدانا کویر دا.',
        rationaleEn: 'Splinting provides external counterpressure, minimizing incisional traction and preventing wound dehiscence.',
        rationaleKu: 'گرتنا بالیفکێ ناهێلیت فشار بکەڤیتە سەر تەقەڵان و ئازارێ گەلەک کێم دکەت.',
        type: 'independent'
      },
      {
        actionEn: 'Instruct and assist with early progressive ambulation starting within 12 hours post-surgery; apply sequential compression devices (SCDs).',
        actionKu: 'هاریکاریکرنا نەخۆشی بۆ پیاسەکرنا زوی د دەمێ ١٢ سەعەتێن دەستپێکێ دا و دانانا ئامیرێ گووشتنا پێیان (SCDs).',
        rationaleEn: 'Early ambulation stimulates gastrointestinal peristalsis (preventing paralytic ileus) and prevents Deep Vein Thrombosis (DVT).',
        rationaleKu: 'پیاسەکرنا زوی رۆڤیان دئێخیتە گەڕ و رێگریێ ل مەیینا خوینێ د دەمارێن پێیان دا (DVT) دگریت.',
        type: 'independent'
      },
      {
        actionEn: 'Inspect surgical dressing and wound every shift for signs of infection (erythema, edema, heat, purulent exudate, foul odor).',
        actionKu: 'پشکنینا رۆژانە یا برینێ بۆ نیشانێن پەتا و هەوکرنێ (سۆربوون، ئاوسان، گەرمبوون، کێم یان بێهنا خراب).',
        rationaleEn: 'Early detection of surgical site infection (SSI) allows immediate wound culture and targeted antimicrobial therapy.',
        rationaleKu: 'نیاسینا زوی یا هەوکرنێ رێگریێ ل پەقینا برینێ و بەلاڤبوونا مایکڕۆبان دگریت.',
        type: 'independent'
      }
    ],
    evaluation: {
      outcomeCriteriaEn: 'Pain maintained between 2-3/10; lungs clear to auscultation, passing flatus/bowel sounds present, surgical incision clean and intact.',
      outcomeCriteriaKu: 'ئێشان د ناڤبەرا ٢-٣ دایە؛ دەنگێن رۆڤیان زڤڕین؛ برینا نەشتەرگەریێ پاقژە و تەقەڵ نەڤەبووینە.',
      targetResponseEn: 'Goal met. Patient ambulated 80 meters in corridor holding splinting pillow. Tolerating clear liquids, incision dry with no erythema.',
      targetResponseKu: 'ئارمانج ب دەست هات. نەخۆشی ب هێمنی پیاسە کر، ئاڤ ڤەخوار و برینا وی یا پاقژ و بێ کێشە یە.'
    }
  },

  // 6. SYSTEMIC SEPSIS & INFECTION CONTROL
  {
    id: 'sepsis_infection',
    conditionEn: 'Severe Sepsis & Septic Shock Management',
    conditionKu: 'هەوکرنا دژوار یا خوینێ و شۆکا بەکتریایی (Systemic Sepsis)',
    categoryEn: 'Infection Control & Sepsis',
    categoryKu: 'کۆنترۆلا هەوکرنێ و پەتایێ',
    domain: 'infection_control',
    nandaDiagnosisEn: 'Deficient Fluid Volume and Risk for Shock related to systemic vasodilation and increased capillary permeability secondary to systemic bacteremia as evidenced by MAP < 65, serum lactate > 4.0 mmol/L, and oliguria.',
    nandaDiagnosisKu: 'کێمبوونا شلەیێ و مەترسیا شۆکا بەکتریایی پەیوەندیدار ب بەرفرەهبوونا دەماران و دەرکەفتنا شلەیێ ژ ئەگەرێ پەتایا خوینێ، ب بەلگەیێ پەستانا نزم و زۆربوونا ترشێ لاکتیک.',
    nandaBreakdown: {
      problemEn: 'Septic Shock / Impaired Tissue Perfusion',
      problemKu: 'شۆکا هەوکرنا خوینێ و کێمبوونا ئۆکسجینێ بۆ ئەندامان',
      etiologyEn: 'Systemic inflammatory cascade triggered by bacterial endotoxins producing profound vasodilation',
      etiologyKu: 'بەلاڤبوونا ژەهرا بەکتریایێ د ناڤ خوینێ دا و سستبوونا لولپێچێن خوینبەردان',
      signsSymptomsEn: 'Hyperthermia (39.2°C), tachycardia (124 bpm), tachypnea (28 bpm), hypotension refractory to initial fluids, elevated lactate (4.8 mmol/L)',
      signsSymptomsKu: 'تایەکا گەلەک بلند (٣٩.٢ پلە)، لێدانا دلی ١٢٤، هەناسەیا لەز، پەستانا نزم (٨٢/٤٦) و ترشێ لاکتیک 4.8 mmol/L'
    },
    definitionEn: 'Life-threatening organ dysfunction caused by a dysregulated host response to infection, requiring Hour-1 Resuscitation Bundle.',
    definitionKu: 'تێکچوونا مەترسیدار یا ئەندامێن سەرەکی یێن لەشی ژ ئەگەرێ بەلاڤبوونا هەوکرنێ د خوینێ دا، کو پێدڤی ب فریاکەوتنا دەستبەجێ یا دەمژمێرا ئێکێ یە.',
    assessment: {
      subjectiveEn: [
        'Family reports patient became severely confused, shaking uncontrollably with high fever, and lethargic over 12 hours',
        'History of indwelling Foley urinary catheter for 14 days and chronic cough',
        'Patient disoriented to time and place, responding only to loud verbal commands'
      ],
      subjectiveKu: [
        'کەسۆکار دبێژن نەخۆش تایەکا گەلەک بلند گرت، لەرزینا توند و هۆشێ وی تێکچوو د دەمێ ١٢ دەمژمێران دا',
        'سۆندا میزێ بۆ ماوێ ١٤ رۆژان پێڤە بوویە و کۆخەکا کەڤن هەبوویە',
        'نەخۆش تێکچوویە و نوزانیت ل کیڤەیە و تەنێ ب هەوارکرنێ بەرسڤێ ددەت'
      ],
      objectiveEn: [
        'Blood Pressure: 82/46 mmHg (MAP 58 mmHg), Heart Rate: 126 bpm',
        'Serum Lactate: 4.8 mmol/L (Normal < 2.0 mmol/L)',
        'White Blood Cell Count: 21,500 /µL with 18% bandemia',
        'Urine output: only 15 mL over last 2 hours (oliguria); urine dark and cloudy',
        'qSOFA Score = 3 (Altered mentation, RR 28, SBP < 100)'
      ],
      objectiveKu: [
        'پەستانا خوێنێ: ٨٢/٤٦ ملم جیوە (MAP 58)، لێدانا دلی: ١٢٦ ل دەقەکێ',
        'پشکنینا لاکتیک (Serum Lactate): 4.8 mmol/L (گەلەک بەرزە)',
        'خڕۆکێن سپی یێن خوینێ: ٢١,٥٠٠ (هەوکرنەکا توند دیار دکەت)',
        'میزکرن زۆر کێمە: تەنێ ١٥ مل د دوو سەعەتان دا (سستبوونا گولیچکان)',
        'نیشانێن شۆکێ: تێکچوونا هۆشی، هەناسە ٢٨، پەستان کێمتر ژ ١٠٠'
      ],
      vitalSignsBaseline: {
        bp: '82/46 mmHg',
        hr: '126 bpm',
        rr: '28 bpm',
        spO2: '92%',
        temp: '39.2°C'
      }
    },
    goals: {
      shortTermEn: 'Complete Sepsis Hour-1 Bundle: Draw 2 blood cultures, start broad-spectrum antibiotics, infuse 30 mL/kg crystalloids, and achieve MAP ≥ 65 mmHg within 3 hours.',
      shortTermKu: 'بجهئینانا بەرنامێ دەمژمێرا ئێکێ: وەرگرتنا خوینێ بۆ چاندنێ (Blood Culture)، دەستپێکرنا ئەنتیبیۆتیکێن بەهێز، دانا شلەیێ ٣٠ مل/کگم و بەرزکرنا پەستانێ بۆ MAP ≥ ٦٥.',
      longTermEn: 'Lactate cleared to < 2.0 mmol/L, infection eradicated, mechanical ventilation avoided, and organ function normalized.',
      longTermKu: 'پاقژبوونا خوینێ ژ ترشێ لاکتیک، نەهێلانا بەکتریایێ و کارکرنا ئاسایی یا گولیچک و سیهان.'
    },
    interventions: [
      {
        actionEn: 'Immediately draw two sets of blood cultures (from two separate venipuncture sites) and urine culture prior to starting antibiotics.',
        actionKu: 'دەستبەجێ کێشانا دوو نموونەیێن خوینێ ژ دوو جهێن جودا و نموونەیا میزێ بۆ چاندنێ (Culture) بەری دانا ئەنتیبیۆتیکی.',
        rationaleEn: 'Blood cultures identify causative pathogen and antibiotic sensitivities; giving antibiotics first sterilizes blood confounding results.',
        rationaleKu: 'چاندنا بەری دەرمانی جۆرێ دروستێ بەکتریایێ دیار دکەت؛ دانا دەرمانی بەری پشکنینێ بەکتریایێ دڤەشێریت.',
        type: 'independent'
      },
      {
        actionEn: 'Administer prescribed broad-spectrum IV antibiotics (e.g. Meropenem 1 g IV + Vancomycin 15-20 mg/kg IV) strictly within Hour-1.',
        actionKu: 'دانا ئەنتیبیۆتیکێن بەهێز ب رێکا دەماری (وەکی میرۆپینیم و ڤانکۆمایسین) ب دروستی د دەمژمێرا ئێکێ دا.',
        rationaleEn: 'Each hour delay in antimicrobial administration increases septic shock mortality by ~7.6%.',
        rationaleKu: 'هەر دەمژمێرەکا گیرۆبوون د دانا ئەنتیبیۆتیک دا، رێژەیا مرنا نەخۆشی ب نێزیکی ٨٪ زێدە دکەت!',
        type: 'collaborative'
      },
      {
        actionEn: 'Initiate rapid IV crystalloid resuscitation with 30 mL/kg (e.g., 2,100 mL for 70 kg patient) infused within 3 hours.',
        actionKu: 'دانا بلەز یا موغەزیێ ب قیاسێ ٣٠ مل بۆ هەر کیلۆیەکێ (نێزیکی ٢,١٠٠ مل بۆ کەسەکێ ٧٠ کگم) د دەمێ ٣ سەعەتان دا.',
        rationaleEn: 'Restores circulating intravascular volume lost to systemic capillary leak, increasing cardiac stroke volume.',
        rationaleKu: 'قەبارەیێ خوینێ پڕ دکەتەڤە و رێگریێ ل وەستانا دلی دگریت.',
        type: 'collaborative'
      },
      {
        actionEn: 'If MAP remains < 65 mmHg despite 30 mL/kg fluid resuscitation, initiate IV Norepinephrine (Levophed) infusion titrated to MAP ≥ 65 mmHg.',
        actionKu: 'ئەگەر پەستان هەر نزم ما سەرەڕای دانا موغەزیێ، دەستپێکرنا دەرزییا نۆرئەدرینالین (Norepinephrine) بۆ بەرزکرنا پەستانێ بۆ MAP ≥ ٦٥.',
        rationaleEn: 'Norepinephrine is first-choice vasopressor to restore vascular tone without excessive tachycardia.',
        rationaleKu: 'نۆرئەدرینالین دەمارێن خوینێ تەسک دکەت و پەستانێ بەرز دکەت بۆ گەهاندنا خوینێ بۆ مێشک و گولیچکان.',
        type: 'collaborative'
      }
    ],
    evaluation: {
      outcomeCriteriaEn: 'Mean arterial pressure maintained ≥ 65 mmHg; serum lactate normalized to < 2.0 mmol/L; urine output > 0.5 mL/kg/hr; mental status cleared.',
      outcomeCriteriaKu: 'پەستانا خوینێ جێگیرە (MAP ≥ ٦٥)؛ ترشێ لاکتیک دابەزی بۆ کێمتر ژ ٢؛ میزکرن گەهشتە ئاستێ نورمال و هۆشێ نەخۆشی زڤڕی.',
      targetResponseEn: 'Goal met. Sepsis bundle executed in 45 mins. MAP stabilized at 68 mmHg on low-dose Norepinephrine. Repeat lactate decreased to 2.1 mmol/L.',
      targetResponseKu: 'ئارمانج ب دەست هات. هەمی فریاکەوتن د ٤٥ خولەکان دا هاتە کرن. پەستان جێگیر بوو و ترشێ لاکتیک بەرەڤ ئاستێ نورمال دابەزی.'
    }
  },

  // 7. PNEUMONIA & IMPAIRED GAS EXCHANGE (RESPIRATORY)
  {
    id: 'pneumonia',
    conditionEn: 'Community-Acquired Pneumonia & Respiratory Failure Risk',
    conditionKu: 'هەوکرنا توند یا سیهان (Pneumonia) و مەترسیا کێمبوونا ئۆکسجینێ',
    categoryEn: 'Respiratory Nursing',
    categoryKu: 'پەرستاریا سیهـ و هەناسێ',
    domain: 'respiratory',
    nandaDiagnosisEn: 'Impaired Gas Exchange related to alveolar-capillary membrane inflammation and purulent exudate as evidenced by hypoxemia (SpO2 88%), bilateral crackles, and tachypnea.',
    nandaDiagnosisKu: 'تێکچوونا ئاڵوگۆڕکرنا هەوا و ئۆکسجینێ پەیوەندیدار ب کۆمبوونا چڵک و هەوکرنێ د ناڤ سیهان دا، ب بەلگەیێ کێمبوونا ئۆکسجینێ (SpO2 88%) و هەناسەیا لەز.',
    nandaBreakdown: {
      problemEn: 'Impaired Gas Exchange & Ineffective Airway Clearance',
      problemKu: 'تێکچوونا گەهشتنا ئۆکسجینێ بۆ خوینێ',
      etiologyEn: 'Inflammatory exudate filling alveolar airspaces reducing diffusion surface area',
      etiologyKu: 'کۆمبوونا بەڵغەم و چڵکێ د ناڤ سیهان دا ژ ئەگەرێ هەوکرنێ',
      signsSymptomsEn: 'Hypoxemia SpO2 88% on room air, bronchial breath sounds, coarse inspiratory crackles, productive green sputum',
      signsSymptomsKu: 'ئۆکسجین ٨٨٪ ل هەوایێ ئاسایی، دەنگێن خڕخڕێ ل سیهان، کۆخەکا توند دگەل بەڵغەمێ کەسک'
    },
    definitionEn: 'Acute infection of the pulmonary parenchymal tissue causing alveolar consolidation, impairing oxygen diffusion into pulmonary capillaries.',
    definitionKu: 'هەوکرنا بەکتریایی یان ڤایرۆسی یا سیهان کو دبیتە هۆکارێ تژیبوونا بوریێن هەوای ب چڵک و کێمبوونا گەهشتنا ئۆکسجینێ بۆ لەشی.',
    assessment: {
      subjectiveEn: [
        'Patient reports 4-day history of shaking chills, fever up to 39.0°C, and severe pleuritic right-sided chest pain on inspiration',
        'Productive cough with thick, tenacious rust-colored sputum',
        'Severe shortness of breath when walking even 5 steps'
      ],
      subjectiveKu: [
        'نەخۆش دبێژیت ٤ رۆژە تایەکا بلند هەیە دگەل لەرزینێ و ئێشانەکا تیژ ل لایێ راستێ یێ سنگی د دەمێ هەناسەکێشانێ دا',
        'کۆخەکا گران دگەل بەڵغەمەکێ خەست یێ کەسک یان قاوەیی',
        'هەناسەتەنگییا توند تەنانەت پشتی پێنگاڤەکا کێم ژی'
      ],
      objectiveEn: [
        'SpO2: 88% on room air; improves to 94% on 3 L/min oxygen via nasal cannula',
        'Respiratory Rate: 28 bpm with intercostal accessory muscle use',
        'Auscultation: Coarse crackles and bronchial breath sounds over right middle and lower lobes',
        'Chest X-Ray: Dense lobar consolidation in right lower lobe'
      ],
      objectiveKu: [
        'ئۆکسجین: ٨٨٪ ل هەوایێ ژوورێ؛ بەرز دبیت بۆ ٩٤٪ ب دانانا ٣ لیترێن ئۆکسجینێ ب کونێن لڤیکی',
        'هەناسەدان لەزە: ٢٨ هەناسە ل دەقەکێ',
        'گوهداریکرنا سیهان ب سەماعێ: دەنگێ خڕخڕا بەڵغەمی ل بەشێ ژێری یێ سیها راستێ',
        'وێنەیێ تیشکێ یێ سنگی (X-Ray): تاریبوون و کۆمبوونا چڵکێ د سیها راستێ دا دیار دکەت'
      ],
      vitalSignsBaseline: {
        bp: '124/76 mmHg',
        hr: '108 bpm',
        rr: '28 bpm',
        spO2: '88%',
        temp: '38.9°C'
      }
    },
    goals: {
      shortTermEn: 'Patient will maintain SpO2 ≥ 93% on minimal supplemental oxygen and expectorate secretions with effective coughing within 24 hours.',
      shortTermKu: 'ئۆکسجینا نەخۆشی دێ ل سەر ٩٣٪ یان بەرزتر مینیت و فێری کۆخینا دروست بیت بۆ دەرئینانا بەڵغەمی د دەمێ ٢٤ سەعەتان دا.',
      longTermEn: 'Lungs clear to auscultation, afebrile for 48 hours, chest X-ray infiltrate resolved, and independent with daily activities without dyspnea.',
      longTermKu: 'سیهـ دێ پاقژ بن ژ دەنگێن نەئاسایی، تا نامینیت و نەخۆش دێ ب ئاسایی بێ هەناسەتەنگی لڤیت.'
    },
    interventions: [
      {
        actionEn: 'Position patient in High-Fowler position (60 to 90 degrees) or place "good lung down" when lying lateral.',
        actionKu: 'دانانا نەخۆشی ل سەر پشتا بلندا تەختی (گۆشەیا ٦٠ بۆ ٩٠ پلە) یان راکێشان ل سەر سیها ساخلەم دا سیها دی باشتر هەناسێ بدەت.',
        rationaleEn: 'Upright positioning promotes maximal diaphragmatic excursion and improves ventilation-perfusion matching.',
        rationaleKu: 'بلندکرنا سەرێ تەختی بوریێن هەوای ڤەدکەت و هاریکارە سیهـ باشتر با بدەن و ئۆکسجین زێدە ببیت.',
        type: 'independent'
      },
      {
        actionEn: 'Administer prescribed supplemental oxygen and monitor continuous pulse oximetry; maintain target SpO2 93-96% (88-92% if COPD).',
        actionKu: 'دانا ئۆکسجینێ و چاڤدێریا بەردەوام یا ئامیرێ پێڤانا ئۆکسجینێ؛ راگرتنا ئۆکسجینێ ل سەر ٩٣ بۆ ٩٦٪.',
        rationaleEn: 'Corrects cellular hypoxemia while preventing oxygen-induced hypercapnia in patients with chronic respiratory compromise.',
        rationaleKu: 'رێگریێ ل کێمبوونا ئۆکسجینا مێشک و دلی دگریت بێ گرانکرنا گازی د ناڤ خوینێ دا.',
        type: 'collaborative'
      },
      {
        actionEn: 'Teach controlled cascade coughing technique and encourage incentive spirometry 10 breaths every waking hour.',
        actionKu: 'فێرکرنا کۆخینا هویر و بکارئینانا ئامیرێ کێشانا هەناسێ (Incentive Spirometer) ١٠ جاران هەر دەمژمێرەکێ.',
        rationaleEn: 'Incentive spirometry prevents atelectasis and recruits collapsed alveoli, mobilizing retained tracheobronchial secretions.',
        rationaleKu: 'رێگریێ ل نووسانا تورەگێن هەوای دگریت و بەڵغەمی ب ساناهی بەرەڤ دەرڤە دهاڤێژیت.',
        type: 'independent'
      },
      {
        actionEn: 'Administer prescribed IV antibiotics (e.g. Ceftriaxone 1 g IV daily + Azithromycin 500 mg IV) and encourage 2-3 L oral/IV hydration.',
        actionKu: 'دانا ئەنتیبیۆتیکێن دیارکری د دەمژمێرێن خوە دا دگەل ڤەخوارنا ٢ بۆ ٣ لیترێن ئاڤ و شلەیا بۆ شلکرنا بەڵغەمی.',
        rationaleEn: 'Adequate systemic hydration thins tenacious mucus secretions, rendering them significantly easier to expectorate.',
        rationaleKu: 'ڤەخوارنا ئاڤێ بەڵغەمی شل دکەت دا ب کۆخکەکا سڤک بهێتە دەرڤە.',
        type: 'collaborative'
      }
    ],
    evaluation: {
      outcomeCriteriaEn: 'SpO2 remains ≥ 94% on room air; sputum thinned and cleared, respiratory rate 14-18 bpm, lungs clear on auscultation.',
      outcomeCriteriaKu: 'ئۆکسجین ل سەر ٩٤٪ یە ل هەوایێ ئاسایی؛ بەڵغەم نەما؛ هەناسەدان ئاسایی بوو بۆ ١٤-١٨ ل دەقەکێ.',
      targetResponseEn: 'Goal met. SpO2 95% on room air. Crackles resolved to faint base sounds. Patient expectorating minimal clear sputum without dyspnea.',
      targetResponseKu: 'ئارمانج ب دەست هات. ئۆکسجین بوو ٩٥٪ بێ ئامیرێ ئۆکسجینێ. نەخۆش ب ئارامی هەناسێ ددەت و کێشە نەمایە.'
    }
  },

  // 8. TYPE 2 DIABETES & HYPERGLYCEMIA (ENDOCRINE)
  {
    id: 'diabetes',
    conditionEn: 'Type 2 Diabetes Mellitus & Severe Hyperglycemia',
    conditionKu: 'نەخۆشیا شەکرێ (Type 2 Diabetes) و بەرزبوونا توند یا شەکرێ',
    categoryEn: 'Endocrine & Metabolic',
    categoryKu: 'رژێن و نەخۆشیێن شەکرێ',
    domain: 'endocrine',
    nandaDiagnosisEn: 'Unstable Blood Glucose Level related to insulin resistance, dietary non-adherence, and infection as evidenced by blood glucose 380 mg/dL, HbA1c 11.2%, and polyuria.',
    nandaDiagnosisKu: 'نەجێگیربوونا ئاستێ شەکرا خوینێ پەیوەندیدار ب بەرگریا لەشی بۆ ئینسیۆلینێ و خوارنا نەگونجای، ب بەلگەیێ شەکرا خوینێ ٣٨٠ مگم و میزکردنا زۆر.',
    nandaBreakdown: {
      problemEn: 'Unstable Blood Glucose / Hyperglycemia',
      problemKu: 'نەجێگیربوون و بەرزبوونا شەکرا خوینێ',
      etiologyEn: 'Impaired peripheral insulin sensitivity, pancreatic beta-cell dysfunction, and excessive carbohydrate consumption',
      etiologyKu: 'کێم کارکرنا ئینسیۆلینا لەشی و خوارنا شەکر و هەویرەمەنیێن زۆر',
      signsSymptomsEn: 'Capillary blood glucose 380 mg/dL, extreme thirst (polydipsia), frequent urination (polyuria), weight loss',
      signsSymptomsKu: 'شەکرا خوینێ ٣٨٠ مگم، تێهنیبوونا زۆر (پەرداخێن ئاڤێ)، میزکردنا بەردەوام و لاوازبوون'
    },
    definitionEn: 'A chronic metabolic disorder characterized by persistent hyperglycemia resulting from defects in insulin secretion, insulin action, or both.',
    definitionKu: 'نەخۆشیەکا بەردەوام یا میتابۆلیزمی کو دبیتە هۆکارێ بەرزبوونا بەردەوام یا شەکرا خوینێ و زیان گەهاندنێ ب لولپێچ و دەمارێن لەشی.',
    assessment: {
      subjectiveEn: [
        'Patient reports drinking > 4 liters of water daily due to unquenchable thirst (polydipsia)',
        'Waking up 5-6 times each night to void large volumes of urine (nocturia/polyuria)',
        'Reports blurred vision, tingling numbness in both feet, and profound lethargy'
      ],
      subjectiveKu: [
        'نەخۆش دبێژیت رۆژێ پتر ژ ٤ لیترێن ئاڤێ ڤەدخوت ژ تێهنیاتیێ',
        'شەڤێ ٥ بۆ ٦ جاران رادبیت بۆ میزکرنێ',
        'تاریبوونا چاڤان، تەزین و مێرووکرنا تلێن پێیان و ماندیبوونا توند'
      ],
      objectiveEn: [
        'Capillary blood glucose on admission: 382 mg/dL; Serum Osmolality: 310 mOsm/kg',
        'Hemoglobin A1c (HbA1c): 11.4% (Target < 7.0%)',
        'Urine dipstick: 3+ glucose, negative for ketones (rules out DKA; suggests HHS trajectory)',
        'Monofilament foot test reveals diminished sensation over plantar metatarsal heads'
      ],
      objectiveKu: [
        'شەکرا دەستپێکێ: ٣٨٢ مگم؛ خەستییا شلەیا خوینێ بەرزە',
        'شەکرا سێ هەیڤی (HbA1c): 11.4% (پێدڤیە ژ ٧ کێمتر بیت)',
        'پشکنینا میزێ: شەکرا زۆر (+++) هەیە بەلێ کێتۆن تێدا نینە',
        'پشکنینا دەمارێن پێیان هەستپێکرنا کێم دیار دکەت (Diabetic Neuropathy)'
      ],
      vitalSignsBaseline: {
        bp: '142/86 mmHg',
        hr: '94 bpm',
        rr: '18 bpm',
        spO2: '97%',
        temp: '36.9°C'
      }
    },
    goals: {
      shortTermEn: 'Patient blood glucose will stabilize between 140 - 180 mg/dL within 24 hours without hypoglycemic episodes (< 70 mg/dL).',
      shortTermKu: 'شەکرا خوینێ دێ دابەزیتە ناڤبەرا ١٤٠ بۆ ١٨٠ مگم د دەمێ ٢٤ سەعەتان دا بێ رویدانا دابەزینا مەترسیدار (< ٧٠).',
      longTermEn: 'Patient will achieve HbA1c < 7.0%, master subcutaneous self-injection technique, and conduct daily foot inspection.',
      longTermKu: 'شەکرا سێ هەیڤی دێ بیتە کێمتر ژ ٧٪ و نەخۆش دێ فێری لێدانا دەرزییا ئینسیۆلینێ و چاڤدێریا پێیێن خوە بیت.'
    },
    interventions: [
      {
        actionEn: 'Administer prescribed subcutaneous Regular or Rapid-acting Insulin per correction sliding scale; recheck capillary glucose in 1-2 hours.',
        actionKu: 'دانا دەرزییا ئینسیۆلینێ د بن پێستی دا ب گۆرەی پلەیا شەکرێ و دووبارە پشکنین پشتی ١ بۆ ٢ دەمژمێران.',
        rationaleEn: 'Correction insulin promotes cellular glucose uptake; post-administration monitoring detects early hypoglycemia.',
        rationaleKu: 'ئینسیۆلین شەکرێ ژ ناڤ خوینێ دئێخیتە ناڤ خانەیێن لەشی؛ چاڤدێری رێگریێ ل نزمبوونا لەزگین دگریت.',
        type: 'collaborative'
      },
      {
        actionEn: 'Educate patient on Rule of 15 for managing hypoglycemia: If blood glucose < 70 mg/dL, take 15 g fast-acting carb, wait 15 min, retest.',
        actionKu: 'فێرکرنا یاسایا ١٥ بۆ نزمبوونا شەکرێ: ئەگەر شەکر ژ ٧٠ کێمتر بوو، ١٥ گرام شەکر/شەربەت بخۆ، ١٥ خولەکان بوەستە، دووبارە پێڤە.',
        rationaleEn: 'Rule of 15 safely raises plasma glucose without triggering severe rebound hyperglycemia.',
        rationaleKu: 'یاسایا ١٥ شەکرێ ب شێوەیەکێ دروست بلند دکەت بێ ئەوەی ژ نشکێڤە بگەهینیتە ئاستێن زۆر بەرز.',
        type: 'independent'
      },
      {
        actionEn: 'Teach comprehensive daily diabetic foot care: Inspect soles daily with mirror, wear seamless cotton socks, never walk barefoot.',
        actionKu: 'فێرکرنا پاقژکرن و چاڤدێریا رۆژانە یا پێیان ب نێڕین ب نەینۆکێ، لەبەرکرنا گۆرەوێن نەرم و نەچوونا سەر پێیێن پەتی.',
        rationaleEn: 'Diabetic neuropathy and peripheral arterial disease predispose to painless skin breakdown, ulcers, and osteomyelitis.',
        rationaleKu: 'نەبوونا هەستپێکرنێ د پێیان دا دبیتە ئەگەرێ برینداربوونا نەهەستیار و دروستبوونا برینێن مەترسیدار.',
        type: 'independent'
      },
      {
        actionEn: 'Collaborate with clinical dietitian to develop an individualized carbohydrate-controlled meal plan tailored to cultural preferences.',
        actionKu: 'هاریکاریکرن دگەل نوژدارێ خوارنێ بۆ دانانا بەرنامەکێ خوارنێ یێ کێم شەکر و کێم برنج ب گۆرەی خوارنێن کوردی.',
        rationaleEn: 'Consistent carbohydrate intake stabilizes postprandial glucose excursions and improves long-term glycemic control.',
        rationaleKu: 'کۆنترۆلا نان و برنجی رێگریێ ل بلندبوونا شەکرا پشتی خوارنێ دگریت.',
        type: 'collaborative'
      }
    ],
    evaluation: {
      outcomeCriteriaEn: 'Fasting blood glucose maintained between 90-130 mg/dL; postprandial glucose < 180 mg/dL; patient demonstrates correct insulin pen priming.',
      outcomeCriteriaKu: 'شەکرا سەرێ سپێدێ د ناڤبەرا ٩٠-١٣٠ دایە؛ پشتی نانی کێمتر ژ ١٨٠ یە؛ نەخۆش ب دروستی دەرزیێ لێددەت.',
      targetResponseEn: 'Goal met. Blood glucose stabilized at 154 mg/dL. Patient successfully demonstrated self-injection of 10 units Glargine into abdomen.',
      targetResponseKu: 'ئارمانج ب دەست هات. شەکر دابەزیە سەر ١٥٤ مگم. نەخۆش فێر بوو ب دەستێ خوە دەرزییا ئینسیۆلینێ ل زکێ خوە بدەت.'
    }
  }
];
