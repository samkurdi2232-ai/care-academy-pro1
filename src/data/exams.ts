export type QuestionFormat = 'mcq' | 'sata' | 'scenario';

export type NclexCategory =
  | 'pharmacology'
  | 'med_surg'
  | 'fundamentals'
  | 'pediatrics'
  | 'emergency';

export interface ExamQuestion {
  id: string;
  type: QuestionFormat;
  category: NclexCategory;
  questionKu: string;
  questionEn: string;
  scenarioKu?: string;
  scenarioEn?: string;
  optionsKu: string[];
  optionsEn: string[];
  correctIndex?: number; // for mcq & scenario
  correctIndices?: number[]; // for sata (Select All That Apply)
  explanationKu: string;
  explanationEn: string;
  clinicalPearlKu?: string;
  clinicalPearlEn?: string;
}

export interface NursingExam {
  id: string;
  code: string;
  titleKu: string;
  titleEn: string;
  descriptionKu: string;
  descriptionEn: string;
  timeLimitMinutes: number;
  totalQuestions: number;
  passingScore: number;
  difficultyKu: string;
  difficultyEn: string;
  questions: ExamQuestion[];
}

export const NCLEX_CATEGORIES: { id: NclexCategory; nameEn: string; nameKu: string }[] = [
  { id: 'pharmacology', nameEn: 'Pharmacology & Parenteral Therapy', nameKu: 'دەرمانناسی و رێکارێن دەرزیان' },
  { id: 'med_surg', nameEn: 'Medical-Surgical Nursing (Med-Surg)', nameKu: 'پەرستاریا نەشتەرگەری و ناڤخۆیی' },
  { id: 'fundamentals', nameEn: 'Fundamentals of Nursing & Patient Safety', nameKu: 'بنەمایێن پەرستاریێ و پاراستنا نەخۆشی' },
  { id: 'pediatrics', nameEn: 'Pediatric & Maternal-Child Nursing', nameKu: 'پەرستاریا زارۆک و دایکایەتیێ' },
  { id: 'emergency', nameEn: 'Emergency, Trauma & Critical Care (ICU)', nameKu: 'تەنگاڤی، تروما و چاڤدێریا چڕ (ICU)' }
];

export const ALL_NCLEX_QUESTIONS: ExamQuestion[] = [
  // --- 1. PHARMACOLOGY ---
  {
    id: 'pharm_1',
    type: 'mcq',
    category: 'pharmacology',
    questionEn: 'Prior to administering Digoxin to an adult patient with heart failure, which nursing action is mandatory?',
    questionKu: 'پەرستار بەری دانا دەرمانێ دیجۆکسین (Digoxin) بۆ نەخۆشەکێ پەککەفتنا دلی، کیژان ژ ڤان گاڤان پێدڤیە بجهـ بینیت؟',
    optionsEn: [
      'Auscultate apical pulse for a full 60 seconds; withhold drug if heart rate is < 60 bpm',
      'Measure axillary core body temperature',
      'Administer tablet with citrus juice prior to breakfast',
      'Obtain postprandial afternoon body weight'
    ],
    optionsKu: [
      'گوهداریکرنا لێدانا دلی (Apical pulse) بۆ ٦٠ چرکەیێن تەمام و راگرتنا دەرمانی ئەگەر کێمتر بوو ژ ٦٠',
      'پێڤانا پلەیا گەرمێ د بنباڵێ را',
      'دانا دەرمانی دگەل پەرداخەکێ شەربەتا پرتەقاڵێ بەری نانی',
      'پێڤانا کێشا لەشی پشتی نیڤرۆ'
    ],
    correctIndex: 0,
    explanationEn: 'Digoxin exerts negative chronotropic effects. Apical pulse must be counted for 60 seconds. Withhold if HR < 60 bpm in adults (< 70 in children, < 90 in infants) to prevent severe bradycardia and heart block.',
    explanationKu: 'دیجۆکسین لێدانا دلی هێواش دکەت؛ پێدڤیە لێدانا دلی بۆ ٦٠ چرکەیێن تەمام بهێتە هژمارتن و ئەگەر ژ ٦٠ کێمتر بوو دەرمان ناهێتە دان دا دل رانەوستیت.',
    clinicalPearlEn: 'Hypokalemia (low serum potassium < 3.5 mEq/L) dramatically increases digoxin toxicity risk.',
    clinicalPearlKu: 'کێمبوونا پۆتاسیۆمێ ژەهراویبوونا دیجۆکسینێ زۆر زێدە دکەت.'
  },
  {
    id: 'pharm_2_sata',
    type: 'sata',
    category: 'pharmacology',
    questionEn: 'A nurse is preparing to administer intravenous Potassium Chloride (KCl) 20 mEq. Which safety principles MUST the nurse follow? (Select All That Apply)',
    questionKu: 'پەرستار خۆ ئامادە دکەت بۆ دانا پۆتاسیۆم کلۆراید (KCl) ب رێکا دەماری. کیژان ژ ڤان پرەنسیپێن پاراستنێ پێدڤیە بجهـ بهێن؟ (هەمی بەرسڤێن راست هەلبژێرە)',
    optionsEn: [
      'NEVER administer KCl as direct IV push or bolus (it causes fatal cardiac arrest)',
      'Infuse peripheral peripheral lines at a maximum rate of 10 mEq/hr',
      'Verify that patient hourly urine output is > 30 mL/hr before infusing',
      'Rapidly bolus over 5 minutes if serum potassium is < 2.5 mEq/L',
      'Continuously monitor cardiac rhythm with ECG telemetry during central line infusion'
    ],
    optionsKu: [
      'ب چو رەنگان راستەوخۆ (IV Push) نەدە چونکی دەستبەجێ دل رادوەستیت',
      'خێراییا دانا دەرمانی د دەمارێ دەستێ دا نابیت ژ ١٠ mEq د دەمژمێرەکێ دا زێدەتر بیت',
      'پشتڕاستبە کو میزکرنا نەخۆشی پترە ژ ٣٠ مل د دەمژمێرەکێ دا بەری موغەزیێ',
      'ب لەز د ٥ خولەکان دا لێ بدە ئەگەر پۆتاسیۆم زۆر نزم بوو',
      'چاڤدێریا بەردەوام یا لێدانا دلی ب مۆنیتەرێ ECG بکە'
    ],
    correctIndices: [0, 1, 2, 4],
    explanationEn: 'KCl is a High-Alert electrolyte. Rapid IV push causes lethal ventricular fibrillation/asystole. Peripheral max is 10 mEq/hr (central up to 20 mEq/hr with telemetry). Adequate renal excretion (urine > 30 mL/hr) is mandatory to prevent hyperkalemia.',
    explanationKu: 'پۆتاسیۆم کلۆراید مەترسیدارترین ماددەیە. دانا لەزگین دەستبەجێ دل ڕادوەستینیت. پێدڤیە تەنێ ب دڵۆپ د ناڤ موغەزیێ دا بهێتە دان و گورچیلک میزێ بکەن.',
    clinicalPearlEn: 'If a patient reports burning at peripheral IV site, check for phlebitis and dilute/slow the rate; never give IV push.',
    clinicalPearlKu: 'ئەگەر دەمارێ نەخۆشی سۆت، موغەزیێ هێواش بکە و پشکنینا برینداربوونا دەماری بکە.'
  },
  {
    id: 'pharm_3_scenario',
    type: 'scenario',
    category: 'pharmacology',
    scenarioEn: 'A 58-year-old patient with deep vein thrombosis is receiving continuous IV Heparin infusion at 1,200 units/hr. The morning laboratory report reveals an aPTT of 135 seconds (Reference baseline: 30 seconds; Target therapeutic range: 60-80 seconds). The patient notes epistaxis (nosebleed).',
    scenarioKu: 'نەخۆشەکێ ٥٨ ساڵی ب کێشا مەیینا خوینێ د دەمارێن پییان دا، دەرمانێ هێپارین (Heparin IV) وەردگریت. پشکنینا خوینێ دەما خەستیێ (aPTT) ب ١٣٥ چرکە دیار دکەت (نورمال: ٦٠-٨٠ چرکە). نەخۆش خوین ژ لڤیکی دهێت.',
    questionEn: 'Which nursing intervention is the IMMEDIATE clinical priority?',
    questionKu: 'کیژان رێکارا پەرستاریێ پێشینەیا هەرە لەزگین و سەرەکی یە؟',
    optionsEn: [
      'Stop the heparin infusion immediately and prepare Protamine Sulfate antidote',
      'Increase the infusion rate by 100 units/hr to clear the thrombus',
      'Administer Vitamin K intramuscularly',
      'Document findings and recheck aPTT in 12 hours'
    ],
    optionsKu: [
      'راگرتنا دەستبەجێ یا موغەزییا هێپارینێ و ئامادەکرنا دژەدەرمانێ پڕۆتامین سەلفەیت',
      'زێدەکرنا خێراییا هێپارینێ',
      'لێدانا ڤیتامین K د ناڤ ماسوولکەی دا',
      'تومارکرن و دووبارە پشکنین پشتی ١٢ دەمژمێران'
    ],
    correctIndex: 0,
    explanationEn: 'An aPTT of 135 seconds is critically prolonged (> 2.5x control) and active bleeding (epistaxis) is present. The infusion must be stopped immediately. Protamine Sulfate is the specific chemical reversal agent for unfractionated heparin.',
    explanationKu: 'دەما aPTT یا گەلەک بەرز بوویە و خوینبەربوون چێبوویە. دەستبەجێ پێدڤیە هێپارین بهێتە راگرتن و پڕۆتامین سەلفەیت (Protamine Sulfate) بهێتە دان.',
    clinicalPearlEn: 'Remember: Protamine Sulfate reverses Heparin; Vitamin K reverses Warfarin (Coumadin).',
    clinicalPearlKu: 'پڕۆتامین سەلفەیت دژەدەرمانێ هێپارینێ یە؛ ڤیتامین K دژەدەرمانێ وارفاڕینێ یە.'
  },

  // --- 2. MED-SURG NURSING ---
  {
    id: 'medsurg_1_scenario',
    type: 'scenario',
    category: 'med_surg',
    scenarioEn: 'On post-operative day 2 following an exploratory laparotomy, an obese patient sneezes violently and shouts: "Something popped open in my stomach!" On inspection, the nurse observes surgical wound separation with pink loop of small bowel protruding onto the sterile dressing.',
    scenarioKu: 'ل رۆژا دووێ پشتی نەشتەرگەرییا زکی، نەخۆشەک ب توندی دپژمیت و هاوار دکەت: "تشتەک د زکێ من دا تەقی!" پەرستار دبینیت تەقەڵێن زکی ڤەبووینە و پشکەک ژ رۆڤیان هاتیە دەرڤەی زکی.',
    questionEn: 'Which emergency nursing action must the nurse perform FIRST?',
    questionKu: 'پەرستار پێدڤیە چ بکەت وەک هەنگاڤا ئێکێ یا بەپەل؟',
    optionsEn: [
      'Cover protruding bowel with sterile gauze soaked in warm normal saline; call surgeon immediately',
      'Gently push the loop of bowel back inside the abdominal cavity',
      'Apply an abdominal binder tightly over the open incision',
      'Instruct patient to cough to clear secretions'
    ],
    optionsKu: [
      'داپۆشینا رۆڤیێن دەرکەفتی ب قوماشێ ستێریل یێ تەڕ ب ئاڤا سەلاینێ و گازیکرنا نوژداری',
      'زڤڕاندن و پالپێوەنانا رۆڤیان بۆ ناڤ زکی ب دەستان',
      'بەستنا قایشەکا توند ل سەر برینێ',
      'گۆتنا نەخۆشی کۆ بکوخیت'
    ],
    correctIndex: 0,
    explanationEn: 'This is wound evisceration. Never attempt to push organs back inside (causes perforation/strangulation). Immediately cover the exposed viscera with sterile gauze soaked in warm sterile saline to prevent tissue drying and necrosis, place patient in low-Fowler position with knees flexed, and call the surgical team stat.',
    explanationKu: 'ڤەبوونا برینێ و دەرکەفتنا رۆڤیان (Evisceration) پێدڤی ب داپۆشینێ یە ب قوماشێ تەڕێ سەلاینێ دا رۆڤی هشک نەبن و نەمڕن. ب چو رەنگان رۆڤیان نەپاڵە ناڤ زکی.',
    clinicalPearlEn: 'Position patient Low-Fowler with knees bent to relieve tension on the abdominal wall.',
    clinicalPearlKu: 'نەخۆشی دانە ل سەر پشتا نزم و ئەژنۆیان بنوشتێنە دا فشار ل سەر زکی کێم ببیت.'
  },
  {
    id: 'medsurg_2',
    type: 'mcq',
    category: 'med_surg',
    questionEn: 'A patient with severe chronic obstructive pulmonary disease (COPD) has SpO2 of 88% and respiratory rate of 22 bpm. Why must supplemental oxygen be titrated with caution (target SpO2 88-92%)?',
    questionKu: 'نەخۆشەکێ نەخۆشیا سیهان یا درێژخایەن (COPD) ئۆکسجینا وی ٨٨٪ یە. بۆچی نابیت ئۆکسجینەکا زۆر ب رێژەیا بلند بۆ بهێتە دان (ئارمانج ٨٨-٩٢٪ یە)؟',
    optionsEn: [
      'High PaO2 diminishes the hypoxic respiratory drive, provoking severe hypercapnic hypoventilation',
      'Oxygen causes acute gastrointestinal bleeding in COPD',
      'High oxygen causes instant cardiac asystole',
      'COPD patients convert oxygen to carbon monoxide'
    ],
    optionsKu: [
      'ئۆکسجینا زۆر هاندەرێ هەناسەدانا نەخۆشی کز دکەت و دبیتە ئەگەرێ کۆمبوونا ژەهراوی یا گازی (CO2)',
      'ئۆکسجین دبیتە ئەگەرێ خوینبەربوونا گەدەی',
      'ئۆکسجین دەستبەجێ دل رادوەستینیت',
      'سیهێن نەخۆشی ئۆکسجینێ دگوهۆڕن بۆ گازا ژەهراوی'
    ],
    correctIndex: 0,
    explanationEn: 'Chronic hypercapnia in end-stage COPD desensitizes central chemoreceptors. The primary respiratory stimulus becomes low PaO2 (hypoxic drive). Excessive FiO2 removes this drive, causing CO2 narcosis and acute respiratory arrest.',
    explanationKu: 'نەخۆشێن COPD مێشکێ وان فێری گازی بوویە و هەناسەدانا وان ل سەر کێمبوونا ئۆکسجینێ بەندە؛ دانا ئۆکسجینا زۆر هەناسێ ڕادوەستینیت.',
    clinicalPearlEn: 'Target SpO2 for COPD exacerbation is 88 - 92%, typically utilizing a calibrated Venturi mask.',
    clinicalPearlKu: 'تێربوونا ئۆکسجینێ بۆ نەخۆشێن COPD پێدڤیە ل ناڤبەرا ٨٨ بۆ ٩٢٪ بهێتە راگرتن.'
  },

  // --- 3. FUNDAMENTALS OF NURSING & SAFETY ---
  {
    id: 'fund_1_sata',
    type: 'sata',
    category: 'fundamentals',
    questionEn: 'Which actions are mandatory elements of the Five Rights of Medication Administration and Patient Identification? (Select All That Apply)',
    questionKu: 'کیژان ژ ڤان گاڤان بەشن ژ ٥ یاسایێن زێڕین یێن دانا دەرمانان و ناسیننامەیا نەخۆشی؟ (هەمی بەرسڤێن راست هەلبژێرە)',
    optionsEn: [
      'Verify patient identity using at least two independent identifiers (Full Name and Medical Record Number/DOB)',
      'Check the medication label 3 times against the MAR before administration',
      'Confirm the Right Drug, Right Dose, Right Patient, Right Route, and Right Time',
      'Leave medications on the bedside table if patient is asleep to take later',
      'Document administration immediately AFTER (never before) the drug is given'
    ],
    optionsKu: [
      'پشتڕاستکرنا ناسنامەیا نەخۆشی ب دوو نیشانێن جودا (ناڤێ سێقۆلی و بەروارێ ژدایکبوونێ)',
      'سێ جاران سەحکرنا ناڤێ دەرمانی بەرامبەر پەڕا دکتۆری',
      'پشتڕاستکرنا نەخۆشێ دروست، دەرمانێ دروست، دۆزێ دروست، رێکا دروست و دەمێ دروست',
      'هێلانا دەرمانی ل سەر مێزێ بۆ نەخۆشی دا پشتی هشیاربوونێ بخۆت',
      'تومارکرنا دەستبەجێ پشتی دانا دەرمانی (نەکو بەری دانا دەرمانی)'
    ],
    optionsKu: [
      'پشتڕاستکرنا ناسنامەیا نەخۆشی ب دوو نیشانێن جودا (ناڤێ سێقۆلی و بەروارێ ژدایکبوونێ)',
      'سێ جاران سەحکرنا ناڤێ دەرمانی بەرامبەر پەڕا دکتۆری',
      'پشتڕاستکرنا نەخۆشێ دروست، دەرمانێ دروست، دۆزێ دروست، رێکا دروست و دەمێ دروست',
      'هێلانا دەرمانی ل سەر مێزێ بۆ نەخۆشی دا پشتی هشیاربوونێ بخۆت',
      'تومارکرنا دەستبەجێ پشتی دانا دەرمانی (نەکو بەری دانا دەرمانی)'
    ],
    correctIndices: [0, 1, 2, 4],
    explanationEn: 'Never leave medications unattended at bedside. Two identifiers (name, MRN/DOB), 3 label checks, the 5 rights, and immediate post-administration documentation are core patient safety imperatives.',
    explanationKu: 'نابیت دەرمان ل تەنشت نەخۆشی بهێتە هێلان. پشتڕاستکرنا دوو نیشانێن ناسنامێ و پێداچوونا سێ قۆناغی یا دەرمانی یا فەرزە.',
    clinicalPearlEn: 'Never use room number or bed number as a patient identifier.',
    clinicalPearlKu: 'چ جاران ژمارەیا ژوورێ یان تەختی وەک ناسنامەیا نەخۆشی بکار نەئینە.'
  },
  {
    id: 'fund_2',
    type: 'mcq',
    category: 'fundamentals',
    questionEn: 'What is the correct sequence for DONNING (putting on) Personal Protective Equipment (PPE)?',
    questionKu: 'رێزبەندیا دروست بۆ لەبەرکرنا کەرەستەیێن پاراستنێ (PPE) کیژانە؟',
    optionsEn: [
      'Gown -> Mask/Respirator -> Goggles/Face Shield -> Gloves',
      'Gloves -> Mask -> Gown -> Goggles',
      'Goggles -> Gown -> Gloves -> Mask',
      'Mask -> Gloves -> Goggles -> Gown'
    ],
    optionsKu: [
      'جلك (Gown) -> دەمامک (Mask) -> چاڤیلکە (Goggles) -> دەستکێش (Gloves)',
      'دەستکێش -> دەمامک -> جلك -> چاڤیلکە',
      'چاڤیلکە -> جلك -> دەستکێش -> دەمامک',
      'دەمامک -> دەستکێش -> چاڤیلکە -> جلك'
    ],
    correctIndex: 0,
    explanationEn: 'CDC Donning Sequence: 1. Gown, 2. Mask/Respirator, 3. Goggles/Face shield, 4. Gloves (pulled over wrist cuffs of gown). Doffing is: Gloves -> Goggles -> Gown -> Mask.',
    explanationKu: 'رێزبەندیا دروست یا CDC: ئێکەم جلك دهێتە لەبەرکرن، پاشان دەمامک، پاشان چاڤیلکە، و داویێ دەستکێش دهێنە دەستکرن ل سەر قۆلپێ جلكی.',
    clinicalPearlEn: 'Gloves are always put on LAST when donning, but taken off FIRST when doffing (most contaminated).',
    clinicalPearlKu: 'دەستکێش ل داویێ دهێنە دەستکرن، بەلێ د دەمێ داکەندنی دا ئێکەم تشت دەستکێش دهێنە داکەندین.'
  },

  // --- 4. PEDIATRICS & MATERNAL-CHILD ---
  {
    id: 'peds_1_scenario',
    type: 'scenario',
    category: 'pediatrics',
    scenarioEn: 'A 3-year-old child presents to the emergency department sitting forward in "tripod position", drooling saliva, with inspiratory stridor, high fever (39.5°C), and marked anxiety. Acute Epiglottitis is suspected.',
    scenarioKu: 'زارۆکەکێ ٣ ساڵی دهێنە فریاکەوتنێ کو بەرەڤ پێش دانیشتیە (Tripod position)، ئاڤ ژ دەڤی دهێتە خوارێ، دەنگێ زیقەیا هەناسێ (Stridor) و تایەکا بلند (٣٩.٥) هەیە. گومانا هەوکرنا توند یا زمانچکێ گەرووی (Epiglottitis) دهێتە کرن.',
    questionEn: 'Which nursing intervention is STRICTLY CONTRAINDICATED?',
    questionKu: 'کیژان کریارا پەرستاریێ ب چو رەنگان نابیت بهێتە ئەنجامدان (قەدەغەیا توندە)؟',
    optionsEn: [
      'Visualizing the posterior pharynx using a tongue depressor / blade',
      'Keeping the child calm and allowing parent to hold the child',
      'Administering humidified blow-by oxygen',
      'Preparing equipment for emergency endotracheal intubation / tracheostomy'
    ],
    optionsKu: [
      'سەحکرنا ناڤ دەڤی و گەرووی ب تەختکێ پشکنینا دەڤی (Tongue depressor)',
      'هێلانا زارۆکی ب ئارامی د باوەشا دایک یان بابێ وی دا',
      'دانا ئۆکسجینێ ب هێواشی نێزیک دەڤێ وی',
      'ئامادەکرنا کەرەستەیێن سۆندا هەناسێ یا لەزگین'
    ],
    correctIndex: 0,
    explanationEn: 'In suspected acute epiglottitis, NEVER inspect the throat with a tongue depressor or swab. Physical irritation can trigger sudden, fatal laryngospasm and complete airway obstruction. Keep the child calm and prepare for immediate OR intubation.',
    explanationKu: 'د دەمێ هەوکرنا زمانچکێ گەرووی دا (Epiglottitis)، چ جاران تەختکێ ناڤ دەڤی بکار نەئینە چونکی دەستبەجێ قڕک گەپ دکەت و زارۆک دەستبەجێ دخنکیت!',
    clinicalPearlEn: 'Classic signs of epiglottitis: Dysphagia, Dysphonia, Drooling, Distressed breathing (The 4 Ds).',
    clinicalPearlKu: '٤ نیشانێن سەرەکی: زەحمەتییا داویرانێ، تێکچوونا دەنگی، ئاڤهاتنا دەڤی، و تەنگاڤییا هەناسێ.'
  },
  {
    id: 'peds_2',
    type: 'mcq',
    category: 'pediatrics',
    questionEn: 'Which clinical findings are hallmark indicators of SEVERE dehydration in an 8-month-old infant?',
    questionKu: 'کیژان نیشانێن سەرەکی دبنە بەلگەیێ ووشکبوونا دژوار یا لەشێ ساڤایەکێ ٨ هەیڤی؟',
    optionsEn: [
      'Sunken anterior fontanelle, absence of tears when crying, dry mucous membranes, and capillary refill > 3 seconds',
      'Bulging anterior fontanelle and brisk urine output',
      'Flushed moist skin and hyperactive reflexes',
      'Bradycardia with peripheral bounding pulses'
    ],
    optionsKu: [
      'کەفتنەخوارێ و قۆپبوونا تەپکێ سەرێ زارۆکی، نەبوونا رۆندکان د دەمێ گریێ دا، دەڤێ ووشک، و هێواشبوونا گەهشتنا خوینێ بۆ نینۆکان',
      'ئاوسان و بلندبوونا تەپکێ سەری و میزکرنا زۆر',
      'پیستێ گەرم و تەڕ',
      'هێواشبوونا لێدانا دلی دگەل لێدانا ب هێز'
    ],
    correctIndex: 0,
    explanationEn: 'Severe dehydration in infants manifests as a sunken anterior fontanelle, sunken eyes, absence of tears, parched lips/mucosa, delayed capillary refill (> 3s), tachycardia, and lethargy.',
    explanationKu: 'ووشکبوونا مەترسیدار نیشان ددەت ب: قۆپبوونا تەپکێ سەری (Fontanelle)، گریانا بێ رۆندک، لێڤێن قەڵشتی و هشک، و کێمبوونا میزێ.',
    clinicalPearlEn: 'In infants, weigh diapers precisely: 1 gram of diaper weight increase = 1 mL of urine output.',
    clinicalPearlKu: 'کێشانا حەفازەیێن ساڤای: هەر ١ گرام زێدەبوون وەک ١ مل یا میزێ دهێتە هەژمارتن.'
  },

  // --- 5. EMERGENCY & CRITICAL CARE ---
  {
    id: 'emerg_1_scenario',
    type: 'scenario',
    category: 'emergency',
    scenarioEn: 'During telemetry monitoring in the coronary care unit, an adult patient collapses. The monitor displays chaotic, irregular waveform without identifiable QRS complexes or P waves. The nurse rushes to bedside and confirms the patient is unresponsive, pulseless, and apneic.',
    scenarioKu: 'د ناڤ بەشێ چاڤدێریا چڕ یا دلی دا، نەخۆشەک ژنشکێڤە دکەڤیتە عەردی. مۆنیتەر لێدانەکا تێکچووی یا بێ سەروبەر نیشان ددەت بێ هەبوونا شەپۆلێن دلی. پەرستار لێدانا دلی و هەناسێ دپشکنیت و چو نینە.',
    questionEn: 'What is the rhythm diagnosis and the FIRST MANDATORY intervention?',
    questionKu: 'دەستنیشانکرنا ڤێ لێدانێ چیە و گاڤا ئێکێ یا فەرز چیە؟',
    optionsEn: [
      'Ventricular Fibrillation (VF); immediately call Code Blue, begin CPR, and perform immediate unsynchronized Defibrillation',
      'Asystole; administer immediate IV Atropine 1 mg',
      'Normal Sinus Rhythm; elevate patient legs and offer water',
      'Atrial Fibrillation; prepare for synchronized cardioversion in 30 minutes'
    ],
    optionsKu: [
      'لەرزینا ژوورکێن دلی (Ventricular Fibrillation - VF)؛ دەستبەجێ دەستپێکرنا CPR و دانا شۆکا کارەبایی یا لەزگین (Defibrillation)',
      'وەستانا دلی؛ دانا دەرزییا ئەترۆپین د دەمار دا',
      'لێدانا ئاسایی؛ بلندکرنا پێیان و دانا ئاڤێ',
      'لەرزینا گوهچکان؛ دەستپێکرنا شۆکێ پشتی نیڤ سەعەت'
    ],
    correctIndex: 0,
    explanationEn: 'VF is a shockable cardiac arrest rhythm. Immediate unsynchronized defibrillation (120-200 J biphasic or 360 J monophasic) combined with high-quality CPR (100-120 compressions/min) is the sole proven intervention to restore life.',
    explanationKu: 'لەرزینا ژوورکان (VF) مەترسیدارترین جۆرێ وەستانا دلی یە. ئێکەم و گرنگترین چارەسەری شۆکا کارەبایی یا دەستبەجێ یە (Defibrillation) دگەل بووژاندنەوەیا دلی (CPR).',
    clinicalPearlEn: 'Every 1-minute delay in defibrillation reduces cardiac arrest survival by 7 to 10%.',
    clinicalPearlKu: 'هەر ئێک خولەک گیرۆبوون د شۆکا کارەبایی دا، چانسا مان ب ساخی ب ٧ بۆ ١٠٪ کێم دکەت.'
  },
  {
    id: 'emerg_2_sata',
    type: 'sata',
    category: 'emergency',
    questionEn: 'A patient presents with severe acute anaphylaxis following an intravenous antibiotic injection (stridor, lip angioedema, BP 76/40 mmHg). Which emergency interventions must be executed immediately? (Select All That Apply)',
    questionKu: 'نەخۆشەک تووشی هەستیارییا مەترسیدار و شۆکێ بوویە (Anaphylaxis) پشتی دەرزییا ئەنتیبیۆتیکی (ئاوسانا لێڤان، هەناسەتەنگی، پەستان ٧٦/٤٠). کیژان رێکارێن لەزگین پێدڤیە دەستبەجێ بهێنە ئەنجامدان؟ (هەمی بەرسڤێن راست هەلبژێرە)',
    optionsEn: [
      'Administer Epinephrine (1:1,000) 0.3 - 0.5 mg Intramuscularly into anterolateral thigh immediately',
      'Discontinue the offending antibiotic infusion line immediately',
      'Apply high-flow Oxygen 100% via non-rebreather mask',
      'Administer rapid IV crystalloid bolus (1 - 2 Liters Normal Saline) for hypotension',
      'Place patient in upright standing position and encourage walking'
    ],
    optionsKu: [
      'دانا دەرزییا ئەدرینالین (Epinephrine 1:1,000) ب قیاسێ ٠.٣ - ٠.٥ مگم د ناڤ ماسوولکەیا رانی دا دەستبەجێ',
      'راگرتنا دەستبەجێ یا موغەزییا ئەنتیبیۆتیکێ کو بوویە ئەگەرێ هەستیاریێ',
      'دانانا ئۆکسجینا زۆر ب ماسکێ تایبەت (١٠٠٪)',
      'دانا بلەز یا موغەزییا ئاڤا سەلاینێ (١ بۆ ٢ لیتر) بۆ بەرزکرنا پەستانێ',
      'راوستاندنا نەخۆشی ل سەر پێیان و پیاسەپێکرن'
    ],
    correctIndices: [0, 1, 2, 3],
    explanationEn: 'Epinephrine IM is the first-line lifesaving drug in anaphylaxis. Stop offending allergen immediately, give 100% O2, position recumbent with legs elevated (never stand or sit up abruptly, which precipitates empty ventricle syndrome and death), and infuse rapid crystalloid fluids.',
    explanationKu: 'ئەدرینالین دەرمانێ ژمارە ئێکێ یە بۆ رزگارکرنا ژیانێ. راگرتنا دەرمانی ئەگەر، دانا ئۆکسجینێ و موغەزیێ. چ جاران نەخۆشی ڕانەوەستینە چونکی دەستبەجێ دل ژ خوینێ ڤالا دبیت و دمریت.',
    clinicalPearlEn: 'Repeat Epinephrine IM every 5 to 15 minutes if respiratory distress or hypotension persists.',
    clinicalPearlKu: 'دەرزییا ئەدرینالینێ هەر ٥ بۆ ١٥ خولەکان دووبارە بکە ئەگەر نیشانێن تەنگاڤیێ بەردەوام بوون.'
  }
];

export const EXAMS: NursingExam[] = [
  {
    id: 'exam_standard_2026',
    code: 'NURSE2026',
    titleKu: 'ئەزموونا نیشتمانی یا باوەرپێکری یا پەرستاریێ ٢٠٢٦',
    titleEn: 'Kurdistan Nursing Board Licensure Exam 2026',
    descriptionKu: 'ئەزموونا گشتی بۆ هەلسەنگاندنا لێهاتییا کلینیکی، لەشناسی، دەرمانناسی و چاڤدێریا نەخۆشخانێ بۆ قوتابیێن پەیمانگەها تەکنیکی یا پەرستاریێ.',
    descriptionEn: 'Comprehensive board certification examination covering human anatomy, pharmacology, aseptic nursing protocols, and patient safety standards.',
    timeLimitMinutes: 15,
    totalQuestions: ALL_NCLEX_QUESTIONS.length,
    passingScore: 70,
    difficultyKu: 'پێشکەفتی / مۆڵەتا نۆشداری',
    difficultyEn: 'Advanced / Licensure',
    questions: ALL_NCLEX_QUESTIONS
  }
];
