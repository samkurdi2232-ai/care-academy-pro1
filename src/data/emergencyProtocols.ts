export interface EmergencyDrug {
  id: string;
  genericNameEn: string;
  genericNameKu: string;
  brandNames: string;
  categoryEn: string;
  categoryKu: string;
  primaryIndicationEn: string;
  primaryIndicationKu: string;
  concentrationEn: string;
  concentrationKu: string;
  emergencyDoses: {
    indicationEn: string;
    indicationKu: string;
    doseRouteEn: string;
    doseRouteKu: string;
    frequencyEn: string;
    frequencyKu: string;
  }[];
  mechanismEn: string;
  mechanismKu: string;
  criticalAlertsEn: string[];
  criticalAlertsKu: string[];
  antidoteOrReversal?: string;
}

export interface EmergencyAlgorithmStep {
  stepNumber: number;
  titleEn: string;
  titleKu: string;
  actionEn: string;
  actionKu: string;
  priority: 'critical' | 'urgent' | 'supportive';
  clinicalPearlEn: string;
  clinicalPearlKu: string;
}

export interface EmergencyProtocol {
  id: string;
  titleEn: string;
  titleKu: string;
  subtitleEn: string;
  subtitleKu: string;
  triggerConditionEn: string;
  triggerConditionKu: string;
  timeframeAlertEn: string;
  timeframeAlertKu: string;
  steps: EmergencyAlgorithmStep[];
  primaryMeds: string[];
}

export const EMERGENCY_DRUGS: EmergencyDrug[] = [
  {
    id: 'adrenaline',
    genericNameEn: 'Adrenaline (Epinephrine)',
    genericNameKu: 'ئەدرینالین (ئەپینێفرین)',
    brandNames: 'EpiPen, Adrenaclick',
    categoryEn: 'Sympathomimetic / Alpha & Beta Agonist',
    categoryKu: 'چالاککەرێ دەمارێن سیمپاساوی (ئالفا و بێتا)',
    primaryIndicationEn: 'First-line life saving agent for Anaphylaxis and Cardiac Arrest (VF, pVT, Asystole, PEA)',
    primaryIndicationKu: 'دەرمانێ ئێکەم و رزگارکەرێ ژیانێ د هەستیارییا مەترسیدار (Anaphylaxis) و وەستانا دلی دا',
    concentrationEn: 'Anaphylaxis: 1:1,000 (1 mg/mL); Cardiac Arrest: 1:10,000 (0.1 mg/mL)',
    concentrationKu: 'بۆ هەستیاریێ: ١:١٠٠٠ (١ مگم د ١ مل دا)؛ بۆ وەستانا دلی: ١:١٠٠٠٠ (٠.١ مگم د ١ مل دا)',
    emergencyDoses: [
      {
        indicationEn: 'Severe Anaphylaxis (Adult)',
        indicationKu: 'هەستیارییا مەترسیدار و شۆک (کەسێ مەزن)',
        doseRouteEn: '0.3 to 0.5 mg (0.3 to 0.5 mL of 1:1,000) IM into anterolateral thigh',
        doseRouteKu: '٠.٣ بۆ ٠.٥ مگم ب دەرزیێ د ناڤ ماسوولکەیا رانی دا (IM)',
        frequencyEn: 'Repeat every 5 to 15 minutes if symptoms persist',
        frequencyKu: 'دوبارەکرن هەر ٥ بۆ ١٥ دەقان ئەگەر نیشان نەچوون'
      },
      {
        indicationEn: 'Cardiac Arrest (Adult ACLS)',
        indicationKu: 'وەستانا توند یا لێدانا دلی (ACLS)',
        doseRouteEn: '1 mg (10 mL of 1:10,000) IV / IO push followed by 20 mL saline flush',
        doseRouteKu: '١ مگم د ناڤ دەمار دا (IV) دگەل شووشتنا ٢٠ مل یا ئاڤا سەلاینێ',
        frequencyEn: 'Every 3 to 5 minutes during resuscitation cycle',
        frequencyKu: 'هەر ٣ بۆ ٥ دەقەیان د دەمێ بووژاندنەوەیا دلی دا'
      }
    ],
    mechanismEn: 'Potent alpha-1 vasoconstriction reverses hypotension; beta-1 inotropy/chronotropy elevates cardiac output; beta-2 relaxes bronchial smooth muscle and halts mast cell mediator release.',
    mechanismKu: 'فشارێ بەرز دکەت ژ رێکا تەسککرنا دەماران؛ لێدانا دلی ب هێز دکەت؛ سیهان ڤەدکەت و رێگریێ ل دەرکەفتنا ماددەیێن هەستیاریێ دگریت.',
    criticalAlertsEn: [
      'NEVER give 1:1,000 concentration IV as a bolus push (causes lethal cerebral hemorrhage or ventricular fibrillation)!',
      'Intramuscular (IM) in vastus lateralis produces significantly faster and higher plasma concentrations than subcutaneous injection.'
    ],
    criticalAlertsKu: [
      'هەرگیز قەستییا ١:١٠٠٠ ب خێرایی د ناڤ دەمار دا لێنەدە (دبیتە ئەگەرێ خوینبەربوونا مێشکی یان وەستانا دەستبەجێ یا دلی)!',
      'لێدانا دەرزیێ د ناڤ ماسوولکەیا رانی دا گەلەک ب خێراتر کاریگەرییا خوە دکەت ژ لێدانا ژێر پێستی.'
    ]
  },
  {
    id: 'atropine',
    genericNameEn: 'Atropine Sulfate',
    genericNameKu: 'ئەترۆپین سۆلفات',
    brandNames: 'Atropen',
    categoryEn: 'Anticholinergic / Parasympatholytic',
    categoryKu: 'دژە کۆلینێرجیک / هێواشکەرێ پاراسیمپاساوی',
    primaryIndicationEn: 'Symptomatic Bradycardia (Heart Rate < 50 bpm with hypotension/shock); Organophosphate poisoning',
    primaryIndicationKu: 'کێمبوونا لێدانا دلی دگەل دابەزینا پەستان و گێژبوونێ (HR < 50)؛ ژەهراویبوون ب دەرمانێن قڕکەر',
    concentrationEn: '0.5 mg/mL or 1 mg/mL ampoules',
    concentrationKu: 'ئەمپۆلێن ٠.٥ مگم د ١ مل دا یان ١ مگم د ١ مل دا',
    emergencyDoses: [
      {
        indicationEn: 'Symptomatic Sinus Bradycardia (Adult)',
        indicationKu: 'هێواشبوونا نیشانەدار یا لێدانا دلی',
        doseRouteEn: '1 mg IV push rapidly, followed by 20 mL flush',
        doseRouteKu: '١ مگم ب خێرایی د ناڤ دەمار دا (IV) دگەل ئاڤا سەلاینێ',
        frequencyEn: 'Repeat every 3 to 5 minutes; Maximum total dose: 3 mg',
        frequencyKu: 'دوبارەکرن هەر ٣ بۆ ٥ دەقان؛ بلندترین ئاست: ٣ مگم'
      },
      {
        indicationEn: 'Organophosphate Insecticide Toxicity',
        indicationKu: 'ژەهراویبوون ب دەرمانێن مێرووکوژ',
        doseRouteEn: '2 to 4 mg IV push, titrate until bronchial secretions dry',
        doseRouteKu: '٢ بۆ ٤ مگم د دەمار دا، بەردەوامبوون هەتا دەردراوێن سیهان هشک دبن',
        frequencyEn: 'Every 5 to 10 minutes as required',
        frequencyKu: 'هەر ٥ بۆ ١٠ دەقان ب پێی پێدڤی'
      }
    ],
    mechanismEn: 'Competitively blocks acetylcholine muscarinic receptors at the SA and AV nodes, accelerating AV conduction and raising sinus rate.',
    mechanismKu: 'رێگریێ ل بەربەستکرنا سیستەمێ پاراسیمپاساوی دگریت ل سەر دلی، و لێدانا دلی لەزگین و بهێز دکەت.',
    criticalAlertsEn: [
      'Doses under 0.5 mg are CONTRAINDICATED (causes paradoxical worsening bradycardia)!',
      'Ineffective in Mobitz Type II or Third-Degree (Complete) Heart Block with wide QRS complex (transcutaneous pacing required).'
    ],
    criticalAlertsKu: [
      'دۆزا کێمتر ژ ٠.٥ مگم قەدەغەیە چونکی دلی پتر هێواش دکەت ب شێوەیەکێ مەترسیدار!',
      'د جۆرێن پێشکەفتی یێن بەربەستبوونا لێدانا دلی دا (3rd degree AV block) مفای ناکەت و پێدڤی ب پەیستەرێ کارەبایی یە.'
    ]
  },
  {
    id: 'amiodarone',
    genericNameEn: 'Amiodarone HCl',
    genericNameKu: 'ئامیۆدارۆن',
    brandNames: 'Cordarone, Pacerone',
    categoryEn: 'Class III Antiarrhythmic',
    categoryKu: 'دەرمانێ رێکخستنا لێدانا دلی (Class III)',
    primaryIndicationEn: 'Shock-refractory Ventricular Fibrillation (VF) and pulseless Ventricular Tachycardia (pVT)',
    primaryIndicationKu: 'لەرزینا ماسوولکەیا ژوورکێن دلی (VF) و لێدانا مەترسیدارا بێ نبز (pVT)',
    concentrationEn: '150 mg in 3 mL vial (50 mg/mL)',
    concentrationKu: '١٥٠ مگم د ٣ مل دا',
    emergencyDoses: [
      {
        indicationEn: 'Cardiac Arrest (Refractory VF / pVT)',
        indicationKu: 'وەستانا دلی پشتی کارەبالێدانا دووێ',
        doseRouteEn: '300 mg IV / IO push after 3rd shock; second dose 150 mg IV push after 5th shock',
        doseRouteKu: '٣٠٠ مگم دەستبەجێ د دەمار دا، دۆزا دووێ ١٥٠ مگم پشتی کارەبالێدانا پێنجێ',
        frequencyEn: 'Single second dose after 3 to 5 minutes',
        frequencyKu: 'ئێک دۆزا دووێ پشتی ٣ بۆ ٥ دەقەیان'
      }
    ],
    mechanismEn: 'Prolongs phase 3 cardiac action potential, blocks potassium, sodium, and calcium channels.',
    mechanismKu: 'دەمێ گەهاندنا کارەبایا دلی درێژ دکەت داکو لێدانێن شێت یێن ژوورکێن دلی ئارام ببن.',
    criticalAlertsEn: [
      'Monitor continuously for severe hypotension and prolonged QT interval leading to Torsades de Pointes.'
    ],
    criticalAlertsKu: [
      'پێدڤیە بەردەوام چاڤدێریا پەستانێ بهێتە کرن دا پەستان ژ نشکێڤە نەکەڤیت.'
    ]
  },
  {
    id: 'naloxone',
    genericNameEn: 'Naloxone HCl',
    genericNameKu: 'نالۆکسۆن (دژە ژەهرا ئۆپیۆیدان)',
    brandNames: 'Narcan',
    categoryEn: 'Pure Opioid Receptor Antagonist',
    categoryKu: 'دژە کارتێکەرا ئۆپیۆید و مۆرفینێ',
    primaryIndicationEn: 'Acute opioid overdose with respiratory depression (RR < 10 breaths/min, pinpoint pupils, cyanosis)',
    primaryIndicationKu: 'ژەهراویبوون ب ماددەیێن بێهۆشکەر و مۆرفین دگەل وەستان یان هێواشبوونا هەناسەدانێ',
    concentrationEn: '0.4 mg/mL ampoule or 4 mg nasal spray',
    concentrationKu: 'ئەمپۆلا ٠.٤ مگم یان سپرایا دفنێ ٤ مگم',
    emergencyDoses: [
      {
        indicationEn: 'Suspected Opioid-Induced Respiratory Arrest',
        indicationKu: 'وەستانا هەناسێ ژ بەر دەرمانێن سڕکەر',
        doseRouteEn: '0.4 to 2.0 mg IV, IM, Sub-Q, or 4 mg single nasal spray into one nostril',
        doseRouteKu: '٠.٤ بۆ ٢ مگم د دەمار، ماسوولکە، یان سپرای د دفنێ دا',
        frequencyEn: 'Repeat every 2 to 3 minutes until adequate spontaneous ventilation returns',
        frequencyKu: 'دوبارەکرن هەر ٢ بۆ ٣ دەقان هەتا هەناسەدان دزڤڕیتە ئاستێ نورمال'
      }
    ],
    mechanismEn: 'Displaces opioids from mu, kappa, and delta receptors in the CNS, reversing central respiratory drive depression.',
    mechanismKu: 'ماددەیێ بێهۆشکەر ژ وەرگرێن مێشکی ددەتە پاش و دەستبەجێ ناوەندا هەناسەدانێ ل مێشکی هشیار دکەت.',
    criticalAlertsEn: [
      'Half-life of Naloxone (30-90 min) is much shorter than most opioids (Methadone, Morphine); patient CAN re-lapse into coma! Continuous monitoring required.'
    ],
    criticalAlertsKu: [
      'تەمەنێ نالۆکسۆنی کورتە (٣٠ بۆ ٩٠ دەقە)؛ نەخۆش پشتی هشیاربوونێ رەنگە دوبارە بچیتە هۆشخوەچوونێ ڤە، چاڤدێریا بەردەوام پێدڤیە!'
    ]
  },
  {
    id: 'nitroglycerin',
    genericNameEn: 'Nitroglycerin (Glyceryl Trinitrate)',
    genericNameKu: 'نایترۆگلیسرین (حەبا ژێر ئەزمانی)',
    brandNames: 'Nitrostat, Nitrolingual',
    categoryEn: 'Organic Nitrate / Potent Vasodilator',
    categoryKu: 'فراوانکەرێ لولپێچێن خوینێ',
    primaryIndicationEn: 'Acute Coronary Syndrome (ACS), acute angina chest pain, acute cardiogenic pulmonary edema',
    primaryIndicationKu: 'ئێشا سنگی یا جەڵتەیا دلی (Angina)، و کۆمبوونا لەزگین یا ئاڤێ د سیهان دا',
    concentrationEn: '0.4 mg sublingual tablet or spray',
    concentrationKu: 'حەبکێن ژێر ئەزمانی یێن ٠.٤ مگم',
    emergencyDoses: [
      {
        indicationEn: 'Acute Anginal Chest Pain (Adult)',
        indicationKu: 'ئێشا سنگی یا توند یا نەخۆشیا دلی',
        doseRouteEn: '0.4 mg sublingual tablet dissolved under tongue; DO NOT CHEW or swallow',
        doseRouteKu: '٠.٤ مگم دانێ ل ژێر ئەزمانی؛ نابیت نەخۆش بجوت یان داعویریت',
        frequencyEn: 'Every 5 minutes, maximum 3 doses. Call emergency services if pain persists after 1st dose',
        frequencyKu: 'هەر ٥ دەقان جارەک، زۆرترین حەد: ٣ حەبک'
      }
    ],
    mechanismEn: 'Releases nitric oxide producing venous smooth muscle relaxation, lowering preload and reducing myocardial oxygen demand.',
    mechanismKu: 'گازی نایتریک ئۆکساید بەرهەم دئینیت و دەماران ڤەدکەت، بارێ سەر دلی سوک دکەت و ئۆکسجینێ دگەهینیتە ماسوولکەی.',
    criticalAlertsEn: [
      'STRICT CONTRAINDICATION: Phosphodiesterase-5 (PDE-5) inhibitors (Sildenafil/Viagra within 24h, Tadalafil/Cialis within 48h) causes fatal refractory hypotension!',
      'Check systolic blood pressure before EACH dose; HOLD if SBP < 90 mmHg or HR < 50 bpm.'
    ],
    criticalAlertsKu: [
      'قەدەغەیەکا توند: ئەگەر نەخۆشی حەبا ڤیاگرا (Viagra) یان سیالیس د ماوێ ٢٤-٤٨ دەمژمێرێن بۆری دا خواربیت، چونکی دبیتە ئەگەرێ کەفتنا کوشندە یا پەستانێ!',
      'بەری هەر حەبکەکێ پەستانێ بپێڤە؛ ئەگەر پەستان کێمتر بوو ژ ٩٠ ملم جیوە دەستبەجێ راگرە!'
    ]
  },
  {
    id: 'salbutamol',
    genericNameEn: 'Salbutamol (Albuterol)',
    genericNameKu: 'سالبوتامۆل (ڤێنتۆلین)',
    brandNames: 'Ventolin, ProAir',
    categoryEn: 'Short-Acting Beta-2 Agonist (SABA)',
    categoryKu: 'ڤەکەرێ سیهان یێ بلەز',
    primaryIndicationEn: 'Acute bronchospasm, asthma exacerbation, anaphylactic bronchoconstriction, hyperkalemia adjunct',
    primaryIndicationKu: 'تەسکبوونا لەزگین یا سیهان، تەنگەنەفەسییا تەنگەژەیا رەبۆیێ، و زێدەبوونا پۆتاسیۆمێ',
    concentrationEn: 'Nebulizer solution 2.5 mg / 2.5 mL (0.1%) or 5 mg / 2.5 mL',
    concentrationKu: 'گیراوەیا ئامێرێ تەمی (Nebulizer) ٢.٥ مگم یان ٥ مگم',
    emergencyDoses: [
      {
        indicationEn: 'Acute Severe Bronchospasm',
        indicationKu: 'تەسکبوونا توند یا بۆریێن هەناسێ',
        doseRouteEn: '2.5 to 5.0 mg via jet nebulizer driven by 6-8 L/min oxygen flow',
        doseRouteKu: '٢.٥ بۆ ٥ مگم د ناڤ ئامێرێ نەبولایزەر دا ب ئۆکسجینا ٦-٨ لیتر/دەقە',
        frequencyEn: 'Every 20 minutes for 3 doses, or continuous nebulization in critical status asthmaticus',
        frequencyKu: 'هەر ٢٠ دەقان بۆ ماوێ ٣ جاران، یان بەردەوام د بارودۆخێ دژوار دا'
      }
    ],
    mechanismEn: 'Selectively stimulates beta-2 adrenergic receptors on airway smooth muscles, inducing adenylyl cyclase and bronchodilation.',
    mechanismKu: 'ماسوولکێن تەسکبووی یێن سیهان خاڤ دکەت و بۆریێن هەناسەدانێ بەرفرەهـ دکەت داکو هەوا ب ساناهی بچیتە ژوور.',
    criticalAlertsEn: [
      'Causes transient tachycardia and skeletal muscle tremors. In hyperkalemia, shifts potassium into cells temporarily.'
    ],
    criticalAlertsKu: [
      'دبیتە ئەگەرێ لەزبوونا لێدانا دلی و لەرزینا دەستان. پۆتاسیۆمێ د ناڤ خوێنێ دا بەرەڤ ناڤ خانان دهاڤێژیت.'
    ]
  }
];

export const EMERGENCY_PROTOCOLS: EmergencyProtocol[] = [
  {
    id: 'anaphylaxis',
    titleEn: 'Anaphylactic Shock Emergency Protocol',
    titleKu: 'پرۆتۆکۆلێ فریاکەوتنا شۆکا هەستیاریێ (Anaphylaxis)',
    subtitleEn: 'Immediate, rapid action protocol for severe systemic allergic reactions',
    subtitleKu: 'گاڤێن دەستبەجێ بۆ رزگارکرنا ژیانا نەخۆشی ژ هەستیارییا کوشندە',
    triggerConditionEn: 'Sudden onset respiratory distress (wheeze, stridor), facial/lip/tongue angioedema, widespread urticaria, hypotension (SBP < 90 mmHg).',
    triggerConditionKu: 'دەرکەفتنا نیشانێن تەنگەنەفەسیێ، پەقینا پێستی، ئەستویربوونا ئەزمانی و لێڤان، و دابەزینا توند یا پەستانی خوێنێ.',
    timeframeAlertEn: 'GOLDEN WINDOW: Intramuscular Epinephrine must be administered within 5 minutes of symptom onset to prevent cardiac collapse.',
    timeframeAlertKu: 'دەمێ زێڕین: پێدڤیە ئەدرینالین د دەمێ ٥ دەقەێن دەستپێکێ دا بهێتە لێدان داکو دڵ نەوەستیت.',
    primaryMeds: ['adrenaline', 'salbutamol', 'hydrocortisone'],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Stop Exposure & Call for Urgent Resuscitation Code',
        titleKu: 'راگرتنا هۆکارێ هەستیاریێ و گازیکرنا تیمی',
        actionEn: 'Immediately stop IV infusion/trigger. Do NOT leave patient. Shout for emergency assistance and bring Resuscitation Crash Cart + Defibrillator.',
        actionKu: 'دەستبەجێ کانیۆلا دەرمانی رابگرە ئەگەر هۆکار بیت. ب چ رەنگان نەخۆشی ب تەنێ نەهێلە و هاوار بکە بۆ ئامادەکرنا کەرەستەیێن فریاکەوتنێ.',
        priority: 'critical',
        clinicalPearlEn: 'Every second counts; removing the causative allergen prevents progressive intravascular antigen load.',
        clinicalPearlKu: 'راگرتنا دەستبەجێ یا هۆکاری رێگریێ ل زێدەبوونا شۆکێ دگریت.'
      },
      {
        stepNumber: 2,
        titleEn: 'Inject Epinephrine IM in Anterolateral Thigh Immediately',
        titleKu: 'لێدانا دەرزییا ئەدرینالین د ماسوولکەیا رانی دا دەستبەجێ',
        actionEn: 'Administer Epinephrine 1:1,000 (0.3 to 0.5 mg IM in adult) directly into mid-outer vastus lateralis. Do NOT delay for IV access!',
        actionKu: 'لێدانا ئەدرینالین (٠.٣ بۆ ٠.٥ مگم) د ناڤ بەشێ دەرڤە یێ رانی دا ب دەرزیێ (IM). چاڤەڕێی دانانا کانیۆلایێ مەمینە!',
        priority: 'critical',
        clinicalPearlEn: 'Intramuscular vastus lateralis absorption is significantly superior to deltoid or subcutaneous routes in shock.',
        clinicalPearlKu: 'ماسوولکەیا رانی ب خێراترین شێوە ئەدرینالینی دگەهینیتە ناڤ خوینێ د دەمێ شۆکێ دا.'
      },
      {
        stepNumber: 3,
        titleEn: 'Position Patient Supine with Lower Extremities Elevated',
        titleKu: 'دانانا نەخۆشی ل سەر پشتا وی دگەل بەرزکرنا پێیان',
        actionEn: 'Place patient flat on back with legs elevated (Trendelenburg/passive leg raise). If breathing is labored, position upright cautiously ONLY if not hypotensive. NEVER allow patient to stand up!',
        actionKu: 'نەخۆشی ل سەر پشتێ درێژ بکە و پێیێن وی ٣٠ سم بەرز بکە. هەرگیز نەهێلە نەخۆش رابوریتە سەر پێیان!',
        priority: 'critical',
        clinicalPearlEn: 'Standing up suddenly precipitates empty ventricle syndrome, instantaneous cardiac arrest, and pulseless electrical activity.',
        clinicalPearlKu: 'رابوونا ل سەر پێیان خوێنێ ژ دلی دویر دئێخیت و دبیتە هۆی وەستانا دەستبەجێ یا دلی.'
      },
      {
        stepNumber: 4,
        titleEn: 'High-Flow Oxygen & Large-Bore IV Fluid Resuscitation',
        titleKu: 'دانا ئۆکسجینێ بەرز و شلەیێن سەلاین ب کانیۆلا مەزن',
        actionEn: 'Apply non-rebreather mask at 15 L/min (SpO2 > 95%). Insert two 16G or 18G IV cannulas. Rapidly infuse 1 to 2 Liters of warm Normal Saline 0.9%.',
        actionKu: 'دانانا ماسکێ ئۆکسجینێ ب رێژەیا ١٥ لیتر/دەقە. دانانا دوو کانیۆلایێن مەزن (سەوز یان بۆر) و لێدانا ١ بۆ ٢ لیترێن سەلاینێ ب لەز.',
        priority: 'urgent',
        clinicalPearlEn: 'Massive vasodilation pools up to 35% of intravascular volume in periphery within 10 minutes.',
        clinicalPearlKu: 'فرەهبوونا دەماران دبیتە هۆی بەرزەبوونا ٣٥٪ یا قەبارێ خوێنێ د دەمێ دەهـ دەقان دا.'
      },
      {
        stepNumber: 5,
        titleEn: 'Continuous Reassessment & Secondary Medications',
        titleKu: 'چاڤدێریا بەردەوام و دەرمانێن هاریکار',
        actionEn: 'If no clinical response after 5 to 15 minutes, REPEAT Epinephrine IM dose. Administer nebulized Salbutamol for bronchospasm, and IV Hydrocortisone / Antihistamines.',
        actionKu: 'ئەگەر پشتی ٥ بۆ ١٥ دەقان نەخۆش باش نەبوو، دۆزا دووێ یا ئەدرینالینی لێبدە. دانا ڤێنتۆلین ب تەمی و دەرمانێ ئەنتی هیستامین.',
        priority: 'urgent',
        clinicalPearlEn: 'Observe patient for minimum 6 to 12 hours for biphasic anaphylactic recurrence.',
        clinicalPearlKu: 'پێدڤیە نەخۆش لانیکەم ٦ بۆ ١٢ دەمژمێران بمینیتە بن چاڤدێریێ دا چونکی رەنگە هەستیاری دوبارە بیتەڤە.'
      }
    ]
  },
  {
    id: 'cpr_bls',
    titleEn: 'Adult Basic Life Support (BLS CPR & AED)',
    titleKu: 'پرۆتۆکۆلێ بووژاندنەوەیا دڵ و هەناسێ (CPR & AED)',
    subtitleEn: 'Evidence-based Cardiopulmonary Resuscitation Algorithm (AHA Guidelines)',
    subtitleKu: 'رێنمایێن ستانداردێن جیهانی بۆ گوشینا سنگی و کارەبالێدانا دلی',
    triggerConditionEn: 'Unresponsive victim, absent normal breathing (apneic or agonal gasping), no carotid pulse palpable within 10 seconds.',
    triggerConditionKu: 'نەخۆشێ بێهۆش کو چ لێدانا خوینبەری ل ملێ وی نینە د دەمێ دەهـ چرکان دا و هەناسەدان نینە.',
    timeframeAlertEn: 'Permanent brain death begins within 4 to 6 minutes of cardiac standstill without effective compressions.',
    timeframeAlertKu: 'خانەیێن مێشکی دەست ب مرنێ دکەن د ماوێ ٤ بۆ ٦ دەقان دا ئەگەر سنگ نەهێتە گوشین.',
    primaryMeds: ['adrenaline', 'amiodarone'],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Verify Scene Safety & Check Patient Responsiveness',
        titleKu: 'پشکنینا ئێمناهییا جهی و هشیاریا نەخۆشی',
        actionEn: 'Ensure environment is safe for rescuers. Tap victim shoulders firmly and shout loudly: "Are you okay?". Call for Code Blue / AED immediately.',
        actionKu: 'دڵنیابە جهـ ئێمنە. دەستێن خوە ل سەر ملێن نەخۆشی بدە و ب دەنگەکێ بلند بێژێ: "تو باشی؟". دەستبەجێ هاوار بکە بۆ ئامێری AED و تیمی.',
        priority: 'critical',
        clinicalPearlEn: 'Never compromise rescuer safety before touching an unresponsive individual.',
        clinicalPearlKu: 'ئێمناهییا پەرستاری و رزگارکەری ل پێشیا هەمی تشتا یە.'
      },
      {
        stepNumber: 2,
        titleEn: 'Simultaneous Pulse & Breathing Check (< 10 Seconds)',
        titleKu: 'پشکنینا هەڤدەم یا نەبزی و هەناسێ د کێمتر ژ ١٠ چرکان دا',
        actionEn: 'Feel carotid pulse in the groove of the neck while scanning chest for rise and fall for at least 5 but NO MORE than 10 seconds. Agonal gasps are NOT normal breathing!',
        actionKu: 'دوو پەنجەیان دانێ سەر خوینبەرێ ملێ و بەرێخوە بدە سنگی بۆ هەناسێ. زێدەتر ژ ١٠ چرکان چاڤەڕێ مەمینە. هەناسەیا دەڤڤەکری نیشانا وەستانا دلی یە!',
        priority: 'critical',
        clinicalPearlEn: 'If in any doubt regarding pulse presence in an unconscious victim, START chest compressions immediately!',
        clinicalPearlKu: 'ئەگەر شک د نەبزی دا هەبوو، دەستبەجێ دەست ب گوشینا سنگی بکە!'
      },
      {
        stepNumber: 3,
        titleEn: 'High-Quality Chest Compressions (30 Compressions)',
        titleKu: 'گوشینا سنگی ب کویراتی و خێرایی یا دروست (٣٠ لێدان)',
        actionEn: 'Heel of one hand on center of lower sternum, other hand interlocked on top. Arms straight, shoulders directly over patient chest. Push hard (5 to 6 cm depth) and fast (100-120 compressions/min). Allow full recoil.',
        actionKu: 'لەپێ دەستی دانێ ناڤەڕاستا سنگی، دەستێ دووێ ل سەر جفت بکە. بەردەوام بە ب کویراتیا ٥ بۆ ٦ سم و خێراییا ١٠٠ بۆ ١٢٠ د یەک دەقەێ دا. بهێلە سنگ بزڤڕیتە جهێ خوە.',
        priority: 'critical',
        clinicalPearlEn: 'Do not lean on chest between compressions; incomplete recoil impedes coronary blood refill.',
        clinicalPearlKu: 'پشتی هەر گوشینەکێ بارێ خوە ژ سەر سنگی سڤک بکە دا خوین بزڤڕیتە ناڤ دلی.'
      },
      {
        stepNumber: 4,
        titleEn: 'Open Airway & Deliver 2 Rescue Breaths (30:2 Cycle)',
        titleKu: 'ڤەکرنا رێڕەوێ هەوای و دانا ٢ پفکێن هەناسێ',
        actionEn: 'Perform head-tilt chin-lift maneuver. Deliver 2 rescue breaths with pocket mask or bag-valve mask over 1 second each with visible chest rise. Minimize interruptions to < 10 seconds.',
        actionKu: 'سەرێ نەخۆشی بلند بکە و چەناگی راکێشە. دوو هەناسان بدە ب ماسکێ کو سنگ بلند ببیت. راوەستاندنا گوشینێ نابیت ژ ١٠ چرکان زێدەتر بیت.',
        priority: 'urgent',
        clinicalPearlEn: 'Excessive ventilation increases intrathoracic pressure and impairs cardiac output.',
        clinicalPearlKu: 'زێدە هەناسەدان پەستانا ناڤ سنگی بەرز دکەت و زیانێ دگەهینیت.'
      },
      {
        stepNumber: 5,
        titleEn: 'Attach AED / Defibrillator & Follow Audio Prompts',
        titleKu: 'بەستنا ئامێرێ کارەبالێدانێ AED و گوھداریکرنا رێنمایان',
        actionEn: 'Power on AED. Attach pads: Right upper chest beneath clavicle, and Left lateral ribcage below nipple. Stop CPR during rhythm analysis. Shout: "CLEAR!" and press shock button if advised.',
        actionKu: 'ئامێرێ AED هەلبکە. لەزگەیان بلکینە: ل سەرێ سنگی ل دەستێ راستێ و خوارا مەمکێ چەپێ. کەس دەست لێ نەدەت دەمێ پشکنینێ و کارەبالێدانێ.',
        priority: 'critical',
        clinicalPearlEn: 'Resume chest compressions immediately after delivering each shock without waiting to check pulse.',
        clinicalPearlKu: 'دەستبەجێ پشتی کارەبالێدانێ دەست ب گوشینا سنگی بکە بێی راوەستان.'
      }
    ]
  },
  {
    id: 'severe_bleeding',
    titleEn: 'Severe Hemorrhage & Massive Bleeding Control',
    titleKu: 'کۆنترۆلکرنا خوینبەربوونا دژوار و شۆکا خوینێ',
    subtitleEn: 'Stop the Bleed clinical trauma protocol',
    subtitleKu: 'پرۆتۆکۆلێ رزگارکەر بۆ راگرتنا خوینبەربوونا کوشندە',
    triggerConditionEn: 'Pulsatile arterial bleeding, pooling blood on floor (> 250 mL), deep laceration or penetrating wound.',
    triggerConditionKu: 'هاڤێتنا خوینێ ب لێدان وەک کانیاڤێ، کۆمبوونا خوینەکا زۆر ل سەر عەردی، یان برینەکا کویر.',
    timeframeAlertEn: 'Exsanguinating arterial hemorrhage can cause irreversible shock and death within 3 minutes.',
    timeframeAlertKu: 'خوینبەربوونا خوینبەری دشێت مرۆڤی بکوژیت د دەمێ سێ دەقان دا ئەگەر نەهێتە راگرتن.',
    primaryMeds: ['tranexamic_acid', 'normal_saline'],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Direct Firm Pressure with Sterile Gauze / Hemostatic Dressing',
        titleKu: 'گوشارا راستەوخۆ یا توند ب لۆک و پارچا ستێرایل',
        actionEn: 'Apply immediate continuous firm two-handed pressure directly over bleeding site using sterile gauze or clean cloth. Do NOT relieve pressure to check wound.',
        actionKu: 'ب هەردوو دەستان ب توندی گوشارێ بدە سەر جهێ خوینبەربوونێ ب قوماشەکێ پاقژ. هەرگیز دەستی رانەکێشە بۆ دیتنا برینێ.',
        priority: 'critical',
        clinicalPearlEn: 'Consistent focal pressure collapses breached vessel walls, allowing physiological clotting cascade activation.',
        clinicalPearlKu: 'گوشارا بەردەوام لولپێچێن خوینێ دئێخیتە سەر ئێک و رێکێ ددەت خوین بمەیت.'
      },
      {
        stepNumber: 2,
        titleEn: 'Wound Packing for Junctional or Cavitary Bleeding',
        titleKu: 'پڕکرنا ناڤ برینا کویر ب پارچێن تایبەت',
        actionEn: 'For deep wounds in groin, axilla, or neck: tightly pack hemostatic gauze deep into the wound cavity directly against bleeding vessel, maintain continuous manual pressure for 3 full minutes.',
        actionKu: 'بۆ برینێن کویر یێن بنباڵ یان حەوزێ: پارچێن لۆکێ ب کویراتی پاڵپێڤە بدە د ناڤ برینێ دا و ٣ دەقەێن تەواو ب توندی بگرە.',
        priority: 'critical',
        clinicalPearlEn: 'Packing fills dead space and compresses retracted vessels against bony structures.',
        clinicalPearlKu: 'پڕکرنا برینێ جهێن ڤالا دگریت و دەماران دپەستیتە سەر ئێسکی.'
      },
      {
        stepNumber: 3,
        titleEn: 'Apply Combat Tourniquet (CAT) for Extremity Arterial Hemorrhage',
        titleKu: 'بەستنا قایشا توند یا خوینێ (Tourniquet) ل دەست یان پێیان',
        actionEn: 'Apply commercial tourniquet 2 to 3 inches (5-7 cm) proximal to wound on limb (never over a joint). Tighten windlass until bleeding stops and distal pulse vanishes. Lock windlass and write exact time on tourniquet.',
        actionKu: 'قایشێ ٢ بۆ ٣ ئینجان ل سەر برینێ ببەستە (نەک ل سەر جومگەی). با بدە هەتا خوینبەربوون رادوەستیت و دەمێ دروست ل سەر بنڤیسە.',
        priority: 'critical',
        clinicalPearlEn: 'Tourniquets save lives; modern tourniquets can remain safely applied for up to 2 hours without permanent nerve necrosis.',
        clinicalPearlKu: 'قایشا خوینێ دشێت هەتا ٢ دەمژمێران ب سەلامەتی بمینیت بێی زیان گەهاندنە دەماران.'
      },
      {
        stepNumber: 4,
        titleEn: 'Treat for Hemorrhagic Shock & Prevent Hypothermia',
        titleKu: 'چارەسەریا شۆکێ و پاراستنا نەخۆشی ژ سەرما و لەرزێ',
        actionEn: 'Cover patient with warm blankets. Hypothermia impairs clotting factor enzymes. Establish two large-bore IVs (14G or 16G) and initiate warm crystalloids / activate massive transfusion protocol.',
        actionKu: 'نەخۆشی ب بەتەنیێ دابپۆشە؛ تەزین رێگریێ ل مەینا خوینێ دکەت. دانانا دوو کانیۆلایێن گەورە و لێدانا شلە و خوینێ.',
        priority: 'urgent',
        clinicalPearlEn: 'The lethal triad in trauma: Hypothermia, Acidosis, and Coagulopathy.',
        clinicalPearlKu: 'سێگۆشەیا مرنێ د برینداربوونێ دا: سەرما، ترشبوونا خوینێ، و نەمەینا خوینێ.'
      }
    ]
  },
  {
    id: 'choking_heimlich',
    titleEn: 'Acute Choking & Foreign Body Airway Obstruction',
    titleKu: 'خنکان ب تەنەکێ بیانی و مانۆڤرا هایملیک (Heimlich)',
    subtitleEn: 'Universal distress sign management in conscious and unconscious victims',
    subtitleKu: 'دەرهێنانا تەنێ بیانی ژ قورگی بۆ کەسێ هشیار و بێهۆش',
    triggerConditionEn: 'Inability to speak, silent cough, cyanosis around mouth, clutching neck with both hands (universal sign).',
    triggerConditionKu: 'نەخۆش نەشێت باخڤیت، کۆخکا بێ دەنگ، شینبوونا دەڤی و گرتنا گەروی ب هەردوو دەستان.',
    timeframeAlertEn: 'Complete asphyxiation leads to unconsciousness within 60 to 90 seconds.',
    timeframeAlertKu: 'بڕینا تەواو یا هەوای دبیتە ئەگەرێ بێهۆشبوونێ د ماوێ ٦٠ بۆ ٩٠ چرکان دا.',
    primaryMeds: [],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Differentiate Mild vs Severe Airway Obstruction',
        titleKu: 'جوداکرنا خنکانا سڤک و دژوار',
        actionEn: 'Ask: "Are you choking?". If patient can cough forcefully or speak, encourage spontaneous coughing. If silent or nodding yes without sound, intervene immediately!',
        actionKu: 'پرسیار ژێ بکە: "تە خنکاندیە؟". ئەگەر دشێت باخڤیت یان ب توندی بکۆخیت، بهێلە بکۆخیت. ئەگەر چ دەنگ ژێ نەهات، دەستبەجێ دەست پێ بکە!',
        priority: 'critical',
        clinicalPearlEn: 'Vigorous voluntary coughing generates higher air velocities than external chest compressions.',
        clinicalPearlKu: 'کۆخکا ب هێز یا نەخۆشی بخوە، ب خێراترین رێکە بۆ هاڤێتنا پارچێ.'
      },
      {
        stepNumber: 2,
        titleEn: 'Deliver 5 Firm Back Blows',
        titleKu: 'لێدانا ٥ پاشکۆتان ب لەپ ل ناڤبەرا هەردوو شانان',
        actionEn: 'Stand behind patient, support chest with one hand, lean patient forward. Deliver 5 sharp, forceful blows with the heel of the hand between the shoulder blades.',
        actionKu: 'ل پشتی نەخۆشی بوەستە، سنگێ وی بگرە و بەرەڤ پێش بچەمینە. ب لەپێ دەستی ٥ جاران ب توندی ل ناڤبەرا هەردوو شانێن وی بدە.',
        priority: 'critical',
        clinicalPearlEn: 'Gravity assisting combined with percussion dislodges foreign bodies trapped at laryngeal inlet.',
        clinicalPearlKu: 'چەماندنا بەرەڤ پێش دگەل لێدانا پشتا، تەنێ بەرەڤ دەرڤە پالددەت.'
      },
      {
        stepNumber: 3,
        titleEn: 'Perform 5 Abdominal Thrusts (Heimlich Maneuver)',
        titleKu: 'ئەنجامدانا ٥ پاڵدنان ل زکی بەرەڤ ژوور (Heimlich)',
        actionEn: 'Wrap arms around patient waist. Make a fist with thumb side against middle abdomen, slightly above navel and well below xiphoid. Grasp fist with other hand and pull forcefully inward and upward.',
        actionKu: 'دەستێن خوە ل ناڤتەنگا نەخۆشی باڵندە بکە. کۆستەکێ چێکە و قامکا مەزن دانێ ل سەر زکی د ناڤبەرا نافکێ و ئێسکا سنگی دا. ب دەستێ دی ب توندی بەرەڤ ژوور و ناڤڤە راکێشە.',
        priority: 'critical',
        clinicalPearlEn: 'Elevates diaphragm creating an artificial cough that expels the bronchial obstruction.',
        clinicalPearlKu: 'پەردەیا دیفراگمێ بەرەڤ ژوور پالددەت و کۆخکەکا دەستکرد چێدکەت بۆ دەرهاڤێتنا تەنێ.'
      },
      {
        stepNumber: 4,
        titleEn: 'If Victim Becomes Unresponsive: Initiate CPR',
        titleKu: 'ئەگەر نەخۆش بێهۆش بوو: دەست ب CPR بکە',
        actionEn: 'Lower victim safely to floor. Call emergency code. Begin chest compressions immediately (30:2). Each time airway is opened to ventilate, look inside mouth for object; remove ONLY if visible. Never perform blind finger sweeps!',
        actionKu: 'نەخۆشی ب هێدی دانێ ل سەر عەردی. دەست ب گوشینا سنگی بکە (٣٠:٢). هەر جارەکا دەڤێ وی ڤەدکەی سەیری دەڤی بکە ئەگەر تەن دیار بوو دەربینە. هەرگیز ب کوێرانە قامکی مەهاڤێژە د قورگی دا!',
        priority: 'critical',
        clinicalPearlEn: 'Blind finger sweeps risk wedging the foreign object deeper into subglottic space.',
        clinicalPearlKu: 'هاڤێتنا کوێرانە یا قامکان د قورگی دا پارچێ پتر دئێخیتە ناڤ سیهان دا.'
      }
    ]
  },
  {
    id: 'fainting_syncope',
    titleEn: 'Vasovagal Syncope & Fainting Management',
    titleKu: 'چارەسەریا هۆشخوەچوونا سڤک (Vasovagal Syncope)',
    subtitleEn: 'Clinical management of transient cerebral hypoperfusion',
    subtitleKu: 'هشیارکرن و چاڤدێریا نەخۆشی دەمێ ژ نشکێڤە بێهۆش دبیت',
    triggerConditionEn: 'Sudden transient loss of consciousness preceded by pale skin, sweating, tunnel vision, or nausea.',
    triggerConditionKu: 'ژ دەستدانا کاتی یا هۆشی دگەل زەردبوونا دەم وچاڤان، عارەقکرن و گێژبوون.',
    timeframeAlertEn: 'Consciousness typically returns within 20 to 60 seconds once in horizontal position.',
    timeframeAlertKu: 'هۆش دهێتەڤە د ماوێ کێمتر ژ ٦٠ چرکان دا دەمێ نەخۆش درێژ دبیت.',
    primaryMeds: [],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Position Supine with Passive Leg Elevation',
        titleKu: 'درێژکرنا نەخۆشی ل سەر پشتا وی دگەل بلندکرنا پێیان',
        actionEn: 'Safely place patient flat on back on floor or stretcher. Elevate legs 12 inches (30 cm) above heart level to mobilize venous return from lower limbs.',
        actionKu: 'نەخۆشی ل سەر پشتێ درێژ بکە. پێیێن وی ٣٠ سم بەرز بکە ژ ئاستێ دلی داکو خوین ب لەز بزڤڕیتە مێشکی.',
        priority: 'critical',
        clinicalPearlEn: 'Auto-transfuses approximately 300 to 500 mL of venous blood back to central circulation.',
        clinicalPearlKu: 'نێزیکی نیڤ لیتر خوینێ دەستبەجێ دزڤڕینیتەڤە بۆ دڵ و مێشکی.'
      },
      {
        stepNumber: 2,
        titleEn: 'Loosen Restrictive Clothing & Ensure Fresh Air',
        titleKu: 'خاڤکرنا جلوبەرگێن توند و دابینکرنا هەوایێ پاقژ',
        actionEn: 'Loosen tight neck collars, ties, belts, and tight garments. Ensure open ventilation and prevent crowding around victim.',
        actionKu: 'قەمیس، قایش و جلکێن توند خاڤ بکە. خەلکی ژ دەوروبەری دویر بکە داکو هەوایێ ئازاد بگەهیتێ.',
        priority: 'urgent',
        clinicalPearlEn: 'Carotid sinus hypersensitivity can trigger severe vagal bradycardia from a tight collar.',
        clinicalPearlKu: 'توندبوونا دەوری ملێ فشارێ دئێخیتە سەر دەمارێن مل و دلی هێواش دکەت.'
      },
      {
        stepNumber: 3,
        titleEn: 'Check Vitals, Blood Glucose & Neurological Status',
        titleKu: 'پشکنینا نیشانێن ژیانی، شەکرا خوێنێ و هشیاریێ',
        actionEn: 'Assess radial/carotid pulse, blood pressure, and obtain immediate capillary blood glucose to rule out hypoglycemia. Assess pupils and limb symmetry.',
        actionKu: 'پێڤانا پەستان، لێدانا دلی و پشکنینا دەستبەجێ یا شەکرا خوێنێ داکو دڵنیابین ژ بەر دابەزینا شەکرێ نینە.',
        priority: 'urgent',
        clinicalPearlEn: 'Hypoglycemia or cardiac arrhythmias can mimic simple vasovagal syncope.',
        clinicalPearlKu: 'دابەزینا شەکرێ یان ناڕێکییا لێدانا دلی دشێن نیشانێن بێهۆشبوونێ چێکەن.'
      }
    ]
  },
  {
    id: 'hypoglycemia',
    titleEn: 'Acute Severe Hypoglycemia Management (Rule of 15)',
    titleKu: 'چارەسەریا دابەزینا لەزگین یا شەکرا خوێنێ (یاسایا ١٥)',
    subtitleEn: 'Standard clinical hypoglycemia protocol for conscious and unconscious patients',
    subtitleKu: 'پرۆتۆکۆلێ ستانداردێ پەرستاری دەمێ شەکرا نەخۆشی دابەزیتە ژێر ٧٠',
    triggerConditionEn: 'Blood glucose < 70 mg/dL accompanied by diaphoresis, tremors, confusion, tachycardia, or coma.',
    triggerConditionKu: 'شەکرا خوێنێ کێمتر ژ ٧٠ مگم دگەل عارەقکرنا سار، لەرزینا دەستان، گێژبوون یان بێهۆشبوون.',
    timeframeAlertEn: 'Prolonged neuroglycopenia (> 30 min) causes irreversible brain tissue damage.',
    timeframeAlertKu: 'مانەوەیا شەکرێ ب نزمی پتر ژ ٣٠ دەقان زیانەکا نەچارەسەرکری دگەهینیتە مێشکی.',
    primaryMeds: ['dextrose_50', 'glucagon'],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Confirm Blood Glucose Level & Assess Level of Consciousness',
        titleKu: 'پشکنینا شەکرا خوێنێ و دیارکرنا ئاستێ هۆشیاریێ',
        actionEn: 'Immediately perform fingerstick capillary blood glucose. If < 70 mg/dL, rapidly assess ability to swallow and follow verbal commands.',
        actionKu: 'دەستبەجێ شەکرا خوێنێ ب دەست پێ بپێڤە. ئەگەر کێمتر بوو ژ ٧٠، بەرێخوە بدە کا دشێت تشتان داعویریت یان نە.',
        priority: 'critical',
        clinicalPearlEn: 'Never administer oral carbohydrates to a stuporous or unconscious patient due to fatal aspiration risk.',
        clinicalPearlKu: 'هەرگیز خوارن و شەربەتێ مەدە نەخۆشێ بێهۆش چونکی دچیتە د سیهێن وی دا و دەخنکیت.',
      },
      {
        stepNumber: 2,
        titleEn: 'Conscious Patient: Execute the Rule of 15',
        titleKu: 'نەخۆشێ هشیار: بجهئینانا یاسایا ١٥',
        actionEn: 'Administer 15 grams of fast-acting simple carbohydrates: 1/2 cup (120 mL) fruit juice or regular soda, 3-4 glucose tablets, or 3 teaspoons table sugar in water.',
        actionKu: 'دانا ١٥ گرام شەکرا خێرا: نیڤ پەرداخ شەربەت یان سێ کەوچکێن شەکرێ د ناڤ ئاڤێ دا.',
        priority: 'urgent',
        clinicalPearlEn: 'Avoid chocolate or candy bars with high fat; fat slows down gastric emptying and glucose absorption.',
        clinicalPearlKu: 'شۆکۆلاتە و شیریناهیێن چەور مەدە چونکی چەوری رێگریێ ل مژینا لەزگین یا شەکرێ دگریت.'
      },
      {
        stepNumber: 3,
        titleEn: 'Wait 15 Minutes & Retest Capillary Blood Glucose',
        titleKu: '١٥ دەقان بوەستە و دوبارە شەکرا خوێنێ بپێڤە',
        actionEn: 'Recheck blood glucose strictly 15 minutes post-ingestion. If still < 70 mg/dL, REPEAT another 15g fast carbs and re-test in 15 minutes. Once normalized, provide complex carbohydrate snack.',
        actionKu: 'پشتی ١٥ دەقان دوبارە شەکرێ بپێڤە. ئەگەر هێشتا ژێر ٧٠ بوو، ١٥ گرامێن دی یێن شەکرێ بدێ. دەما نورمال بوو، نانەکێ سادە بدێ.',
        priority: 'urgent',
        clinicalPearlEn: 'Protein and complex starch stabilize glucose after simple sugar spike.',
        clinicalPearlKu: 'خوارنا نانی پشتی شەربەتێ ناهێلیت شەکر دوبارە دابەزیتەڤە.'
      },
      {
        stepNumber: 4,
        titleEn: 'Unconscious Patient / NPO: Administer IV Dextrose 50% or IM Glucagon',
        titleKu: 'نەخۆشێ بێهۆش: لێدانا دەرزییا دەرمانی د ناڤ دەمار یان رانی دا',
        actionEn: 'If IV access present: Administer 25 to 50 mL of Dextrose 50% (D50W) slow IV push. If NO IV access: Inject Glucagon 1 mg IM / SQ into vastus lateralis. Turn patient on side (recovery position) to prevent aspiration if vomiting occurs.',
        actionKu: 'ئەگەر کانیۆلا هەبیت: ٢٥ بۆ ٥٠ مل ژ گلوکۆزا خەست ٥٠٪ (D50W) هێدی د ناڤ دەمار دا لێبدە. ئەگەر کانیۆلا نەبیت: دەرزییا گلوکاگۆن ١ مگم د ماسوولکە دا لێبدە. نەخۆشی ل سەر تەنیشتێ دانێ داکو نەخنکیت ئەگەر رەشاند.',
        priority: 'critical',
        clinicalPearlEn: 'D50W is highly hypertonic; extravasation causes tissue necrosis. Always verify vein patency before pushing.',
        clinicalPearlKu: 'شەربەتا D50 زۆر خەستە، دڵنیابە د ناڤ دەمار دایە دا برین ل پێستی چێنەبیت.'
      }
    ]
  },
  {
    id: 'cpr_acls',
    titleEn: 'ACLS Pulseless Cardiac Arrest & Dysrhythmia Protocol (AHA 2026)',
    titleKu: 'پرۆتۆکۆلێ رزگارکرنا وەستانا دلی یا پێشکەفتی (ACLS / Cardiac Arrest)',
    subtitleEn: 'Comprehensive advanced cardiovascular life support for Shockable (VF/pVT) and Non-Shockable (PEA/Asystole) rhythms',
    subtitleKu: 'رێنمایێن دانا شۆکا کارەبایی، ئەدرینالین، ئامیۆدارۆن و چارەسەریا 5Hs & 5Ts',
    triggerConditionEn: 'Adult patient in pulseless cardiac arrest: VF, pulseless VT, Asystole, or Pulseless Electrical Activity (PEA).',
    triggerConditionKu: 'نەخۆشێ وەستانا دلی: بێ هۆش، بێ هەناسە و بێ لێدانا دلی ل سەر دەمارێ مل.',
    timeframeAlertEn: 'GOLDEN ACLS CYCLE: 2-minute CPR intervals between rhythm checks; Epinephrine every 3 to 5 minutes strictly.',
    timeframeAlertKu: 'خولا زێڕین: ٢ خولەکێن بەردەوام یێن گوشینا سنگی بەری پشکنینا دووبارە؛ ئەدرینالین هەر ٣ بۆ ٥ خولەکان.',
    primaryMeds: ['adrenaline', 'amiodarone', 'atropine'],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Start High-Quality CPR & Attach Defibrillator / Pads',
        titleKu: 'دەستپێکرنا گوشینا سنگی و دانانا لەزگین یا لەوحێن شۆکێ',
        actionEn: 'Push hard and fast: 100-120 compressions/min, depth 5-6 cm (2-2.4 in), allow full chest recoil, minimize interruptions (< 10 seconds). Give 30:2 compressions-to-breaths until advanced airway.',
        actionKu: 'سنگی بگوشە: ١٠٠-١٢٠ جاران ل دەقەکێ، کویراتی ٥-٦ سم، بێ راوەستان. لەوحێن شۆکێ پێڤەبکە.',
        priority: 'critical',
        clinicalPearlEn: 'Fatigue degrades compression depth after 2 minutes; switch compressors every 2-minute cycle.',
        clinicalPearlKu: 'وەستیان کویراتییا گوشینێ کێم دکەت؛ هەر ٢ خولەکان کەسێ گوشەر بگوڕە.',
      },
      {
        stepNumber: 2,
        titleEn: 'Rhythm Check: Shockable (VF/pVT) vs Non-Shockable (Asystole/PEA)',
        titleKu: 'پشکنینا لێدانێ: شۆکدار (VF/pVT) بەرامبەر بێ شۆک (Asystole/PEA)',
        actionEn: 'Shockable: Deliver 1 unsynchronized shock (120-200 J biphasic). RESUME CPR IMMEDIATELY for 2 minutes before rechecking pulse. Non-Shockable: DO NOT SHOCK; continue CPR immediately.',
        actionKu: 'ئەگەر لەرزینا ژوورکان بیت: دەستبەجێ شۆکەکێ بدێ و بێ راوەستان زڤڕە سەر گوشینا سنگی بۆ ٢ خولەکان.',
        priority: 'critical',
        clinicalPearlEn: 'Never stop compressions to check pulse immediately after delivering a shock.',
        clinicalPearlKu: 'پشتی شۆکا کارەبایی دەستبەجێ سنگێ نەخۆشی بگوشە بێ چاڤەڕێبوون.',
      },
      {
        stepNumber: 3,
        titleEn: 'Administer Epinephrine 1 mg IV/IO',
        titleKu: 'دانا ئەدرینالین ١ مگم د ناڤ دەمار دا',
        actionEn: 'Administer Epinephrine 1 mg (10 mL of 1:10,000) IV/IO push followed by 20 mL flush and limb elevation. Repeat every 3-5 minutes.',
        actionKu: '١ مگم ئەدرینالین لێبدە دگەل ٢٠ مل ئاڤا سەلاینێ و دەستێ نەخۆشی بلند بکە. هەر ٣ بۆ ٥ خولەکان دوبارە بکە.',
        priority: 'critical',
        clinicalPearlEn: 'In non-shockable rhythms (asystole/PEA), give Epinephrine as soon as feasible.',
        clinicalPearlKu: 'د وەستانا بێ شۆک دا دەستبەجێ دەرمانێ ئەدرینالین بدێ.',
      },
      {
        stepNumber: 4,
        titleEn: 'Refractory VF/pVT: Administer Amiodarone (or Lidocaine)',
        titleKu: 'دانا ئامیۆدارۆن بۆ لەرزینا بەردەوام یا ژوورکان',
        actionEn: 'If VF/pVT persists after 3rd shock: Administer Amiodarone 300 mg IV push. If still refractory, give second dose of 150 mg IV push after 5th shock.',
        actionKu: 'ئەگەر لێدانا شێت یا بەردەوام بوو: ٣٠٠ مگم ئامیۆدارۆن لێبدە، و دۆزا دووێ ١٥٠ مگم پشتی شۆکا پێنجێ.',
        priority: 'urgent',
        clinicalPearlEn: 'Lidocaine (1 - 1.5 mg/kg first dose, then 0.5 - 0.75 mg/kg) is an acceptable alternative to amiodarone.',
        clinicalPearlKu: 'لیدۆکایین جێگرەکێ دروستە بۆ ئامیۆدارۆنی ئەگەر بەردەست نەبوو.',
      },
      {
        stepNumber: 5,
        titleEn: 'Investigate and Treat Reversible Causes (5 Hs & 5 Ts)',
        titleKu: 'گەڕیان ل دووڤ ئەگەرێن چارەسەرکراو (5 Hs & 5 Ts)',
        actionEn: '5 Hs: Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/Hyperkalemia, Hypothermia. 5 Ts: Tension pneumothorax, Tamponade, Toxins, Thrombosis pulmonary (PE), Thrombosis coronary (STEMI).',
        actionKu: 'پشکنینا کێمبوونا ئاڤ و خوینێ، کێمبوونا ئۆکسجینێ، پۆتاسیۆم، سەرما، ژەهر و تەقینا هەوای د سنگی دا.',
        priority: 'urgent',
        clinicalPearlEn: 'PEA is almost always driven by an underlying reversible cause (most commonly hypovolemia or hypoxia).',
        clinicalPearlKu: 'وەستانا PEA زۆربەی جاران ژ ئەگەرێ کێمبوونا خوینێ یان بێ ئۆکسجینیێ یە.',
      }
    ]
  },
  {
    id: 'acs_stemi',
    titleEn: 'Acute STEMI / ACS Emergency Pathway & Reperfusion',
    titleKu: 'پرۆتۆکۆلێ فریاکەوتنا جەڵتەیا دلی يا لەزگین (STEMI / ACS)',
    subtitleEn: 'Standard clinical management for acute coronary occlusion, door-to-balloon time, and antithrombotic therapy',
    subtitleKu: 'رێکارێن لەزگین بۆ ئەسپرین، نایترۆگلیسرین، قەستەرە و هێپارین',
    triggerConditionEn: 'Chest pain or pressure > 20 min, radiation to arm/jaw, ST-elevation ≥ 1 mm in 2 contiguous leads or new LBBB.',
    triggerConditionKu: 'ئێشانا سنگی پتر ژ ٢٠ خولەکان، بەلاڤبوون بۆ ملێ چەپێ، بلندبوونا هێلا ST ل شریتێ دلی.',
    timeframeAlertEn: 'DOOR-TO-BALLOON: Percutaneous coronary intervention (PCI) strictly < 90 min; or Fibrinolysis < 30 min if PCI unavailable.',
    timeframeAlertKu: 'دەمێ گەهاندنا بۆ قەستەرەیێ پێدڤیە کێمتر ژ ٩٠ خولەکان بیت ژ دەمێ گەهشتنا خەستەخانێ.',
    primaryMeds: ['nitroglycerin', 'adrenaline'],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Immediate 12-Lead ECG within 10 Minutes & Vital Signs',
        titleKu: 'کێشانا شریتێ دلی (ECG) د کێمتر ژ ١٠ خولەکان دا',
        actionEn: 'Acquire and interpret 12-lead ECG within 10 minutes of arrival. Place on continuous cardiac telemetry monitor and establish peripheral IV access.',
        actionKu: 'شریتێ دلی بکێشە د ١٠ خولەکان دا. مۆنیتەرێ چاڤدێریێ پێڤەبکە و کانۆلەکا مەزن دانە.',
        priority: 'critical',
        clinicalPearlEn: 'Time is muscle; immediate ECG identifies STEMI candidates for catheterization team activation.',
        clinicalPearlKu: 'دەم وەک ماسوولکەیێ دلی یە؛ کێشانا زوی یا شریتێ دلی ژیانێ رزگار دکەت.',
      },
      {
        stepNumber: 2,
        titleEn: 'Chewed Aspirin 300 mg & Oxygen (if SpO2 < 90%)',
        titleKu: 'دانا ئەسپرین ٣٠٠ مگم ب جوین و ئۆکسجین بتنێ ئەگەر SpO2 < 90%',
        actionEn: 'Administer non-enteric coated Aspirin 162-325 mg chewed stat. Apply supplemental O2 only if SpO2 < 90%, dyspnea, or pulmonary edema is present.',
        actionKu: 'ئەسپرین ٣٠٠ مگم بدێ دا ب دەڤ بجویت. ئۆکسجینێ بدێ تەنێ ئەگەر رێژەیا ئۆکسجینێ کێمتر بوو ژ ٩٠٪.',
        priority: 'critical',
        clinicalPearlEn: 'Routine oxygen in normoxemic patients causes coronary vasoconstriction and worse outcomes.',
        clinicalPearlKu: 'دانا ئۆکسجینێ بێ پێدڤی بۆ نەخۆشێ نورمال خوینبەرێن دلی تەسک دکەت.',
      },
      {
        stepNumber: 3,
        titleEn: 'Sublingual Nitroglycerin (if SBP > 90 mmHg and NO RV Infarction)',
        titleKu: 'دانا نایترۆگلیسرین بن ئەزمانی ئەگەر پەستان > ٩٠ بیت',
        actionEn: 'Administer sublingual Nitroglycerin 0.4 mg every 5 minutes (up to 3 doses). CONTRAINDICATED if SBP < 90, severe bradycardia, RV infarction (leads V4R), or PDE-5 inhibitors (Viagra).',
        actionKu: 'نایترۆگلیسرین بدە ژێر ئەزمانی هەر ٥ خولەکان (تا ٣ جاران). ئەگەر پەستان کێمتر بیت ژ ٩٠ مەدە.',
        priority: 'urgent',
        clinicalPearlEn: 'Inferior STEMIs often involve the right ventricle, making preload vital; nitrates can cause catastrophic hypotension.',
        clinicalPearlKu: 'د جەڵتەیا بەشێ ژێریێ دلی دا نایترۆگلیسرین پەستانێ دئێخیتە عەردی.',
      },
      {
        stepNumber: 4,
        titleEn: 'Anticoagulation & Activate Cardiac Catheterization Lab',
        titleKu: 'دانا هێپارین و ئامادەکرنا ژوورا قەستەرەیێ (Cath Lab)',
        actionEn: 'Administer IV Unfractionated Heparin (bolus 60 units/kg, max 4,000 U, then infusion) and secondary antiplatelet (Ticagrelor or Clopidogrel). Transfer to Cath Lab for primary PCI.',
        actionKu: 'هێپارین ب دەمار لێبدە و نەخۆشی دەستبەجێ ببە ژوورا قەستەرەیێ بۆ ڤەکرنا دەمارێ گرتی.',
        priority: 'critical',
        clinicalPearlEn: 'Door-to-balloon under 90 minutes reduces in-hospital mortality by over 40%.',
        clinicalPearlKu: 'ڤەکرنا دەماری د کێمتر ژ ٩٠ خولەکان دا مرنێ ب رێژەیا ٤٠٪ کێم دکەت.',
      }
    ]
  },
  {
    id: 'stroke_nihss',
    titleEn: 'Acute Ischemic Stroke & Thrombolytic Pathway (BE-FAST)',
    titleKu: 'پرۆتۆکۆلێ جەڵتەیا مێشکی یا لەزگین و دەرمانێ مەیینێ (Stroke / rtPA)',
    subtitleEn: 'Emergency protocol for rapid neurological assessment, head CT, blood pressure control, and IV Alteplase / Tenecteplase',
    subtitleKu: 'پشکنینا مێشکی ب تەنوورێ، کۆنترۆلا پەستانێ و دانا دەرمانێ شلوڤەکەر د ٤.٥ دەمژمێران دا',
    triggerConditionEn: 'Sudden onset facial drooping, arm weakness, slurred speech, acute visual disturbance, ataxia, or confusion.',
    triggerConditionKu: 'خواربوونا دەڤی ژ نشکێڤە، سستبوونا دەست یان پێیان، گرانبوونا ئاخڤتنێ، یان تێکچوونا بالانسی.',
    timeframeAlertEn: 'IV THROMBOLYSIS WINDOW: Administer within 4.5 hours of Last Known Well (LKW); Door-to-CT < 20 minutes.',
    timeframeAlertKu: 'دەمێ زێڕین: دانا دەرمانێ مەیینێ بتنێ د دەمێ ٤.٥ دەمژمێرێن دەستپێکێ دا رێپێدایە؛ تیشکا مێشکی د کێمتر ژ ٢٠ خولەکان دا.',
    primaryMeds: [],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'BE-FAST Screen, Blood Glucose, and Exact Time of Onset (LKW)',
        titleKu: 'پشکنینا BE-FAST، شەکرا خوینێ و دیارکرنا دەمێ دروستێ نەخۆشکەفتنێ',
        actionEn: 'Confirm exact Last Known Well time. Perform fingerstick glucose (rule out hypoglycemia mimic). Calculate initial NIHSS score. Maintain strict NPO.',
        actionKu: 'دەمی تومار بکە. شەکرا خوینێ بپێڤە. نەخۆش نابیت چو بخۆت یان ڤەخۆت ژ ترسا خنکاندنێ.',
        priority: 'critical',
        clinicalPearlEn: 'Hypoglycemia is the most common stroke mimic; always test fingerstick glucose immediately.',
        clinicalPearlKu: 'دابەزینا شەکرێ وەک جەڵتەیا مێشکی خۆ دیار دکەت؛ هەمیشە دەستبەجێ شەکرا خوینێ بپێڤە.',
      },
      {
        stepNumber: 2,
        titleEn: 'Emergency Non-Contrast Head CT within 20 Minutes',
        titleKu: 'ئەنجامدانا تیشکا مێشکی (CT Scan بێ دەرزی) د کێمتر ژ ٢٠ خولەکان دا',
        actionEn: 'Rush to CT scanner. Non-contrast CT rules out intracranial hemorrhage. If no hemorrhage, patient is evaluated for thrombolysis / thrombectomy.',
        actionKu: 'نەخۆشی دەستبەجێ ببە ژوورا تیشکا مێشکی دا دڵنیابین خوینبەربوون د مێشکی دا نینە.',
        priority: 'critical',
        clinicalPearlEn: 'Early ischemic changes may be subtle on CT, but the primary goal is excluding hemorrhage.',
        clinicalPearlKu: 'ئارمانجا سەرەکی یا تیشکێ رەتکرنا خوینبەربوونا مێشکی یە.',
      },
      {
        stepNumber: 3,
        titleEn: 'Control Blood Pressure to < 185/110 mmHg',
        titleKu: 'دابەزاندنا پەستانا خوینێ بۆ کێمتر ژ ١٨٥/١١٠ بەری دەرمانی',
        actionEn: 'If SBP > 185 or DBP > 110: Administer IV Labetalol 10-20 mg over 2 min or Nicardipine infusion. Blood pressure must be lowered before thrombolysis can proceed.',
        actionKu: 'ئەگەر پەستان ژ ١٨٥/١١٠ بەرزتر بیت، دەرزییا لابیتاڵۆل بدێ؛ نابیت دەرمانێ مەیینێ بهێتە دان هەتا پەستان نزم نەبیت.',
        priority: 'critical',
        clinicalPearlEn: 'Giving thrombolytics with BP > 185/110 causes massive intracranial bleeding transformation.',
        clinicalPearlKu: 'دانا دەرمانی دگەل پەستانا بەرز دبیتە هۆی خوینبەربوونا کوشندە د مێشکی دا.',
      },
      {
        stepNumber: 4,
        titleEn: 'Administer IV Alteplase (0.9 mg/kg) or Tenecteplase',
        titleKu: 'دانا دەرمانێ شلوڤەکەرێ مەیینێ (tPA ب قیاسێ ٠.٩ مگم/کگم)',
        actionEn: 'Administer IV Alteplase 0.9 mg/kg (max 90 mg): 10% as direct bolus over 1 min, remaining 90% infused over 60 min. Check neuro status and BP every 15 min.',
        actionKu: 'دەرمانێ مەیینێ لێبدە: ١٠٪ دەستبەجێ و ٩٠٪ د ناڤ ئێک دەمژمێر دا ب موغەزیێ. چاڤدێریا پەستان و هۆشی بکە.',
        priority: 'critical',
        clinicalPearlEn: 'Stop infusion immediately and obtain emergent CT if severe headache, acute hypertension, or vomiting develops.',
        clinicalPearlKu: 'ئەگەر سەرئێشانا توند یان رشتن چێبوو دەستبەجێ دەرمانی راگرە و تیشکێ بکێشە.',
      }
    ]
  },
  {
    id: 'respiratory_failure',
    titleEn: 'Acute Respiratory Distress & Rapid Sequence Intubation (RSI)',
    titleKu: 'پرۆتۆکۆلێ تەنگاڤییا توند یا هەناسێ و دانانا سۆندا قڕکێ (RSI / Intubation)',
    subtitleEn: 'Management of acute hypoxemic/hypercapnic respiratory failure and the 7 Ps of emergency intubation',
    subtitleKu: 'رێکارێن ئۆکسجینا بلەز و ٧ هەنگاڤێن زێڕین یێن دانانا بۆرییا هەناسێ',
    triggerConditionEn: 'Impending respiratory arrest, severe exhaustion, SpO2 < 85% despite high-flow O2, Glasgow Coma Scale ≤ 8, or loss of airway protection.',
    triggerConditionKu: 'ماندیبوونا توند یا هەناسێ، ئۆکسجین کێمتر ژ ٨٥ سەرەڕای ماسکێ، یان بێهۆشبوون (GCS ≤ ٨).',
    timeframeAlertEn: 'Secure definitive cuffed endotracheal airway before complete hypoxic cardiac arrest occurs.',
    timeframeAlertKu: 'پێدڤیە سۆندا قڕکێ بهێتە دانان بەری سیهـ ژ کار بوەستن و دل رابوەستیت.',
    primaryMeds: ['salbutamol', 'adrenaline'],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Preoxygenate with 100% O2 for 3 Minutes (Non-Rebreather / BVM)',
        titleKu: 'تێربوونا لەش ب ئۆکسجینا ١٠٠٪ بۆ ماوێ ٣ خولەکان',
        actionEn: 'Provide 100% FiO2 via non-rebreather mask at 15 L/min or Bag-Valve-Mask (BVM) with PEEP valve. Washes out nitrogen and extends safe apnea time.',
        actionKu: 'ئۆکسجینا زۆر بدە نەخۆشی بۆ ماوێ ٣ خولەکان دا لەش تژی ئۆکسجین بیت و دەمێ دانانا سۆندێ بێ هەناسە نەمینیت.',
        priority: 'critical',
        clinicalPearlEn: 'Avoid aggressive manual bagging if breathing spontaneously; forceful bagging inflates the stomach and induces vomiting.',
        clinicalPearlKu: 'ب هێز هەوای نەئێخە گەدە چونکی زک پف دبیت و نەخۆش دڕێژیت.',
      },
      {
        stepNumber: 2,
        titleEn: 'Execute the 7 Ps of Rapid Sequence Intubation (RSI)',
        titleKu: 'بجهئینانا ٧ هەنگاڤێن زێڕین یێن RSI',
        actionEn: '1. Preparation (equipment, suction, backup airway), 2. Preoxygenation, 3. Pretreatment, 4. Paralysis with induction (e.g. Ketamine/Propofol + Suxamethonium/Rocuronium), 5. Positioning, 6. Placement with proof, 7. Postintubation management.',
        actionKu: 'ئامادەکاری -> ئۆکسجین -> دەرمانێ سڕکرنێ -> دەرمانێ خاڤکرنا ماسوولکان -> دانانا سۆندێ -> پشتڕاستکرن ب کۆخین و دەنگێ هەوای.',
        priority: 'critical',
        clinicalPearlEn: 'Always verify functioning suction catheter (Yankauer) at bedside before administering paralytic.',
        clinicalPearlKu: 'دڵنیابە ئامیرێ مژینا دەلاقی (Suction) کار دکەت بەری دەرمانێ خاڤکەر بدەی.',
      },
      {
        stepNumber: 3,
        titleEn: 'Confirm Tube Position: Waveform Capnography & Bilateral Breath Sounds',
        titleKu: 'پشتڕاستکرنا جهێ سۆندێ ب ئامیرێ گازا CO2 و گوهداریکرنا هەردوو سیهان',
        actionEn: 'Confirm end-tidal CO2 (EtCO2) color change/waveform strictly. Auscultate epigastrium first (ensure silence), then bilateral axillae and apices.',
        actionKu: 'گوهـ بدە سەر گەدەی دا دڵنیابی نەچوویە ناڤ گەدەی، پاشان گوهـ بدە هەردوو سیهان دا هەوا ب یەکسانی بچیتە ژوور.',
        priority: 'critical',
        clinicalPearlEn: 'Waveform capnography is the gold standard for confirming tracheal vs esophageal placement.',
        clinicalPearlKu: 'پێڤانا گازا کاربۆن زێڕینترین رێیە بۆ دڵنیابوون کۆ سۆند د بورییا هەناسێ دایە.',
      }
    ]
  },
  {
    id: 'severe_bleeding',
    titleEn: 'Hemorrhage Control, Tourniquets & Massive Transfusion (MTP)',
    titleKu: 'پرۆتۆکۆلێ راگرتنا خوێنبەربوونا توند، قایشا توند (Tourniquet) و گواستنەوەیا خوینێ (MTP)',
    subtitleEn: 'Evidence-based trauma resuscitation for life-threatening external and internal hemorrhage',
    subtitleKu: 'رێکارێن بەستنا دەماران، گواستنەوەیا لەزگین یا خوینێ (١:١:١) و دەرزییا ترانێکسامیک ئەسید (TXA)',
    triggerConditionEn: 'Exsanguinating external wound, traumatic amputation, pelvic fracture, or internal hemorrhage with SBP < 90 mmHg and heart rate > 120 bpm.',
    triggerConditionKu: 'خوێنبەربوونا بلەز ژ برینەکێ، پەقینا دەمارەکێ مەزن، یان شکەستنا حەوزێ دگەل کەفتنا پەستانێ.',
    timeframeAlertEn: 'Arterial exsanguination causes fatal hypovolemic cardiac arrest in under 3 minutes without immediate mechanical hemostasis.',
    timeframeAlertKu: 'خوێنبەربوونا خوینبەران د کێمتر ژ ٣ خولەکان دا مرنێ چێکەت ئەگەر ب هێز نەهێتە راگرتن.',
    primaryMeds: [],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Direct Firm Pressure & Hemostatic Dressing',
        titleKu: 'گوشینا ب هێز یا سەر برینێ ب قوماشێ تایبەت',
        actionEn: 'Apply uninterrupted direct pressure with both hands using hemostatic gauze packed deeply into the wound cavity. Maintain firm pressure for at least 3 minutes.',
        actionKu: 'ب هەردوو دەستان ب توندی گوشارێ ل سەر ناڤەراستا برینێ دروست بکە و قوماشی د ناڤ کونێ دا تێر بکە.',
        priority: 'critical',
        clinicalPearlEn: 'Packing the wound directly onto the bleeding vessel is key; simply covering the surface fails to control arterial jets.',
        clinicalPearlKu: 'قوماشی ب هێز تێرکە ناڤ برینێ راستەوخۆ ل سەر دەمارێ تەقیای.',
      },
      {
        stepNumber: 2,
        titleEn: 'Apply Arterial Tourniquet 2-3 Inches Above Wound',
        titleKu: 'بەستنا قایشا توند (Tourniquet) ٥-٧ سم ل سەرووی برینێ',
        actionEn: 'If limb hemorrhage is uncontrolled: Place windlass tourniquet 2-3 inches proximal to injury (never over a joint). Tighten until bleeding completely stops and distal pulse vanishes. Write exact TIME of application on tourniquet strap.',
        actionKu: 'قایشێ ب توندی ل سەر برینێ ببەستە هەتا خوین ب تەمامی ڕادوەستیت. دەمژمێر و خولەکی ل سەر قایشێ بنڤیسە.',
        priority: 'critical',
        clinicalPearlEn: 'A correctly applied tourniquet is painful; do NOT loosen it to relieve pain! Loosening leads to fatal re-bleeding.',
        clinicalPearlKu: 'قایشا دروست دئێشیت، بەلێ چ جاران خاڤ نەکە چونکی دەستبەجێ خوین دوبارە دڕژیت.',
      },
      {
        stepNumber: 3,
        titleEn: 'Activate Massive Transfusion Protocol (MTP - 1:1:1 Ratio) & IV Tranexamic Acid (TXA)',
        titleKu: 'دەستپێکرنا بەرنامێ گواستنەوەیا خوینێ ب رێژەیا ١:١:١ و دەرزییا TXA',
        actionEn: 'Administer IV Tranexamic Acid (TXA) 1 g over 10 min (within 3 hours of injury). Transfuse uncrossed O-negative blood, plasma, and platelets in balanced 1:1:1 ratio. Avoid excessive clear crystalloids.',
        actionKu: 'دەرزییا TXA لێبدە بۆ راگرتنا خوینێ دگەل بوتڵێن خوینێ، پلازما و سەفحیاتان ب رێژەیا یەکسان ١:١:١.',
        priority: 'critical',
        clinicalPearlEn: 'Giving large volumes of cold saline dilutes clotting factors and induces fatal trauma triad (hypothermia, acidosis, coagulopathy).',
        clinicalPearlKu: 'دانا موغەزییا سار بەلکو خوینێ رۆن دکەت و نەخۆشی دکوژیت؛ تەنێ خوینا گەرمکری بدێ.',
      }
    ]
  },
  {
    id: 'opioid_overdose',
    titleEn: 'Acute Poisoning, Opioid Overdose & Antidote Protocol',
    titleKu: 'پرۆتۆکۆلێ ژەهراویبوونا توند و دژەژەهر (Opioids / Naloxone)',
    subtitleEn: 'Emergency reversal protocol for opioid-induced respiratory depression and common hospital toxidromes',
    subtitleKu: 'رێنمایێن دانا نالۆکسۆن (Naloxone) و چارەسەریا ژەهراویبوونا مۆرفین و دەرمانێن بێهۆشکەر',
    triggerConditionEn: 'Unresponsive or obtunded patient, bradypnea (RR < 8-10 breaths/min), pinpoint pupils (miosis), cyanosis, and track marks or prescription opioid access.',
    triggerConditionKu: 'نەخۆشێ بێهۆش، هەناسەیا کز (< ٨ هەناسە ل دەقەکێ)، بیلبیلێن چاڤان وەک سەرێ دەرزیێ تەسک بووینە.',
    timeframeAlertEn: 'Hypoxic brain injury accelerates rapidly when respirations drop below 6 per minute; ventilate immediately.',
    timeframeAlertKu: 'مێشک ژ کار دکەڤیت ئەگەر هەناسە کێمتر بیت ژ ٦ جاران د دەقەکێ دا؛ دەستبەجێ هەوای بدێ.',
    primaryMeds: ['naloxone'],
    steps: [
      {
        stepNumber: 1,
        titleEn: 'Stimulate Patient & Support Bag-Valve-Mask Ventilation with O2',
        titleKu: 'هشیارکرنا نەخۆشی و دانا هەوای ب بالۆن و ماسکێ (BVM)',
        actionEn: 'Perform sternal rub. Open airway (head-tilt chin-lift). If apneic or bradypneic, immediately support breathing with Bag-Valve-Mask (BVM) connected to 100% O2 at 1 breath every 5-6 seconds.',
        actionKu: 'سنگی نەخۆشی بلڤینە. ئەگەر هەناسە کز بوو، ب بالۆنێ هەوای بدە نەخۆشی هەر ٥ بۆ ٦ چرکەیان جارەکێ.',
        priority: 'critical',
        clinicalPearlEn: 'Ventilation is the first priority; giving naloxone without bag-mask support leaves the patient hypoxic while the drug absorbs.',
        clinicalPearlKu: 'پێدڤیە ئێکەم هەوای بدەیێ پاشان دەرمانی لێبدەی.',
      },
      {
        stepNumber: 2,
        titleEn: 'Administer Naloxone (Narcan) IV, IM, or Intranasal',
        titleKu: 'دانا نالۆکسۆن ب رێکا دەمار، ماسوولکە یان دفنێ',
        actionEn: 'Administer Naloxone 0.4 to 2.0 mg IV/IM, or 4 mg intranasal spray (into 1 nostril). Repeat every 2 to 3 minutes until spontaneous respiratory rate exceeds 12 breaths/min.',
        actionKu: 'نالۆکسۆن ٠.٤ بۆ ٢ مگم لێبدە یان ٤ مگم ب سپڕای د کونەکا دفنێ دا. هەر ٢ بۆ ٣ خولەکان دووبارە بکە هەتا هەناسە ئاسایی دبیت.',
        priority: 'critical',
        clinicalPearlEn: 'The goal of naloxone is restoring adequate spontaneous breathing, NOT necessarily awakening the patient to full agitation.',
        clinicalPearlKu: 'ئارمانجا سەرەکی زڤڕاندنا هەناسەدانێ یە نەکو وەبکەی نەخۆش شێت ببیت ژ هشیاریێ.',
      },
      {
        stepNumber: 3,
        titleEn: 'Continuous Observation for Recurrent Coma (Naloxone Half-Life Alert)',
        titleKu: 'چاڤدێریا بەردەوام چونکی تەمەنێ دەرمانی کورتە و نەخۆش رەنگە دوبارە بێهۆش بیت',
        actionEn: 'Naloxone duration of action is 30 to 90 minutes, whereas long-acting opioids (Methadone, Fentanyl, Oxycodone) last up to 6-24 hours. Monitor in hospital for at least 4 to 6 hours.',
        actionKu: 'نالۆکسۆن پشتی ٦٠ خولەکان کاریگەرییا وی نامینیت بەلێ ماددەیێ بێهۆشکەر د لەشێ نەخۆشی دا دەمێن درێژ دمینیت، لەوما پێدڤیە نەخۆش چەندین دەمژمێران بمینیتە بن چاڤدێریێ دا.',
        priority: 'urgent',
        clinicalPearlEn: 'If relapse occurs, start continuous IV Naloxone infusion at two-thirds of the initial awakening dose per hour.',
        clinicalPearlKu: 'ئەگەر نەخۆش دوبارە بێهۆش بوو، نالۆکسۆن ب بەردەوامی د ناڤ موغەزیێ دا بدێ.',
      }
    ]
  }
];

