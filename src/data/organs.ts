export interface NursingCareItem {
  id: string;
  actionKu: string;
  actionEn: string;
  priority: 'high' | 'medium' | 'low';
}

export interface OrganDisease {
  nameKu: string;
  nameEn: string;
  symptomsKu: string;
  symptomsEn: string;
  severity: 'critical' | 'moderate' | 'mild';
}

export interface OrganData {
  id: string;
  nameKu: string;
  nameEn: string;
  nameAr: string;
  latin: string;
  system: 'circulatory' | 'nervous' | 'respiratory' | 'digestive' | 'skeletal' | 'muscular' | 'urinary' | 'immune';
  position: [number, number, number]; // [x, y, z] for 3D placement
  color: string;
  emissiveColor: string;
  meshType: 'heart' | 'brain' | 'lungs' | 'liver' | 'stomach' | 'kidneys' | 'intestines' | 'pancreas' | 'spleen' | 'bladder' | 'skin' | 'bones';
  descriptionKu: string;
  descriptionEn: string;
  functionsKu: string[];
  functionsEn: string[];
  diseases: OrganDisease[];
  nursingCare: NursingCareItem[];
  drugs: string[]; // references drug IDs or names
  vitals: {
    hr?: string;
    bp?: string;
    rr?: string;
    temp?: string;
    spO2?: string;
    targetNoteKu: string;
    targetNoteEn: string;
  };
}

export const ORGANS: OrganData[] = [
  {
    id: 'heart',
    nameKu: 'دل',
    nameEn: 'Heart',
    nameAr: 'القلب',
    latin: 'Cor / Cardia',
    system: 'circulatory',
    position: [0.05, 0.42, 0.15],
    color: '#DC2626',
    emissiveColor: '#7F1D1D',
    meshType: 'heart',
    descriptionKu: 'دل ئەندامەکێ ماسوولکەییە یێ سەرەکی د کوئەندامێ سوڕا خوێنێ دا. کارێ وی پەمپکرنا خوێنێیە بۆ هەمی بەشێن لەشی ب رێکا دەمارێن خوێنێ (شەریان و وەریدان). پێکدهێت ژ ٤ ژووران: دوو گوهک (Atria) و دوو زکۆک (Ventricles).',
    descriptionEn: 'The heart is a muscular organ in the circulatory system responsible for pumping blood throughout the body via systemic and pulmonary circulation. It comprises four distinct chambers: left and right atria, and left and right ventricles.',
    functionsKu: [
      'پەمپکرنا خوێنا تژی ئۆکسجین بۆ هەمی بەشێن لەشی',
      'وەرگرتنا خوێنا کێم ئۆکسجین ژ لەشی و فرێکرنا وێ بۆ سیهان',
      'پاراستنا پەستانی خوێنێ یا بەردەوام د بۆریێن خوێنێ دا',
      'گولاندن و دابەشکرنا هۆرمۆن و خوارنێن پێدڤی د ناڤ لەشیدا'
    ],
    functionsEn: [
      'Pumps oxygen-rich arterial blood to systemic peripheral tissues',
      'Receives deoxygenated venous return and directs it to pulmonary bed',
      'Maintains systemic arterial blood pressure gradients',
      'Facilitates transport of regulatory hormones and critical metabolic nutrients'
    ],
    diseases: [
      {
        nameKu: 'جەلتەیا دلی (Acute Myocardial Infarction)',
        nameEn: 'Myocardial Infarction (Heart Attack)',
        symptomsKu: 'ئێشا گران یا سینگی، بەلاڤبوونا ئێشێ بۆ ملی و باسکێ چەپێ، تەنگەنەفەسی، ئارەقکرنا سار',
        symptomsEn: 'Crushing retrosternal chest pain radiating to left arm/jaw, diaphoresis, dyspnea',
        severity: 'critical'
      },
      {
        nameKu: 'سستبوونا دلی (Congestive Heart Failure)',
        nameEn: 'Heart Failure',
        symptomsKu: 'ئاوسانا پییان، زوو وەستیان، تەنگەنەفەسی دەمێ پالدانێ (Orthopnea)',
        symptomsEn: 'Peripheral edema, orthopnea, paroxysmal nocturnal dyspnea, fatigue',
        severity: 'moderate'
      },
      {
        nameKu: 'تێکچوونا ریتما دلی (Arrhythmias / AFib)',
        nameEn: 'Cardiac Arrhythmias',
        symptomsKu: 'لێدانا زێدە یا بێ سەربەست، سەرسوڕان، بێهۆشبوون',
        symptomsEn: 'Palpitations, irregular rhythm, dizziness, pre-syncope',
        severity: 'moderate'
      }
    ],
    nursingCare: [
      {
        id: 'nc_heart_1',
        actionKu: 'بەستنا نەخۆشی ب مۆنیتەری ١٢-لید ECG و چاڤدێریا بەردەوام یا ST-segment',
        actionEn: 'Attach continuous 12-lead cardiac telemetry and monitor ST segments',
        priority: 'high'
      },
      {
        id: 'nc_heart_2',
        actionKu: 'پێدانا ئۆکسجینێ دەمێ SpO2 ژ ٩٠٪ کێمتر بیت و دانانا دوو کانیۆلایێن ژمارە ١٨',
        actionEn: 'Deliver supplemental oxygen if SpO2 < 90% and secure dual large-bore IV access',
        priority: 'high'
      },
      {
        id: 'nc_heart_3',
        actionKu: 'تۆمارکرنا بەردەوام یا لێدانا دلی، پەستان، و فەحسا Troponin I/T',
        actionEn: 'Serial measurement of vitals, blood pressure, and cardiac enzymes (Troponin)',
        priority: 'high'
      },
      {
        id: 'nc_heart_4',
        actionKu: 'کێشانا رۆژانە یا کێشا لەشی ژ بۆ زانینا کومبوونا شلەمەنیان (Fluid overload)',
        actionEn: 'Daily weight measurement at same time to evaluate fluid retention',
        priority: 'medium'
      }
    ],
    drugs: ['digoxin', 'lisinopril', 'aspirin', 'heparin'],
    vitals: {
      hr: '60 - 100 bpm',
      bp: '120/80 mmHg',
      rr: '12 - 20 bpm',
      temp: '36.5 - 37.5 °C',
      spO2: '95 - 100%',
      targetNoteKu: 'ئەگەر HR ژ ٦٠ کێمتر بوو یان BP ژ ٩٠ کێمتر بوو پێدڤیە نۆشدار بهێتە ئاگەهدارکرن.',
      targetNoteEn: 'Notify physician if HR < 60 bpm or systolic BP < 90 mmHg before administering blockers.'
    }
  },
  {
    id: 'brain',
    nameKu: 'مێشک',
    nameEn: 'Brain',
    nameAr: 'الدماغ / المخ',
    latin: 'Encephalon / Cerebrum',
    system: 'nervous',
    position: [0, 1.48, 0.05],
    color: '#D8BFD8',
    emissiveColor: '#581C87',
    meshType: 'brain',
    descriptionKu: 'مێشک سەنتەرێ سەرەکیێ کۆنترۆلا لەشییە. ژ مەزنەمێشک (Cerebrum)، مێشکۆکە (Cerebellum)، و قەدی مێشکی (Brainstem) پێکدهێت. بەرپرسە ژ هزر، بیردانک، هەست، هەناسەدان، و هەماهەنگیا تەڤگەران.',
    descriptionEn: 'The brain serves as the central command console of the nervous system. Enclosed within the cranium, it encompasses cerebrum, cerebellum, and brainstem, directing voluntary actions, sensory integration, autonomic homeostatic drive, and cognition.',
    functionsKu: [
      'کۆنترۆلکرنا هزرین، زمان، و بڕیاردانێ د بەرێ پێشینێ مێشکیدا',
      'رێکخستنا تەڤگەران و هەڤسەنگیێ ب رێکا مێشکۆکەیێ (Cerebellum)',
      'سەرپەرشتیا کاریگەرێن ژیانی (هەناسەدان و لێدانا دلی) د قەدی مێشکیدا',
      'وەرگرتن و شرۆڤەکرنا هەستێن دیتن، بیستن، دەستلێدان، و چەشتنێ'
    ],
    functionsEn: [
      'Higher cognitive executive reasoning and language comprehension in cerebrum',
      'Fine motor control, precision trajectory, and somatic balance in cerebellum',
      'Cardiorespiratory and basic life-support autonomic nuclei in brainstem',
      'Sensory processing, somatosensory integration, and neural reflexes'
    ],
    diseases: [
      {
        nameKu: 'جەلتەیا مێشکی (Ischemic / Hemorrhagic Stroke)',
        nameEn: 'Cerebrovascular Accident (Stroke)',
        symptomsKu: 'خواربوونا دەڤی (Facial droop)، لەرزین یان ئیفلیجبوونا باسکەکی، تێکچوونا ئاخڤتنێ (FAST)',
        symptomsEn: 'Facial asymmetry, sudden unilateral hemiplegia, expressive/receptive aphasia',
        severity: 'critical'
      },
      {
        nameKu: 'زێدەبوونا پەستانی ناڤ سەرێ (Increased ICP)',
        nameEn: 'Elevated Intracranial Pressure (ICP)',
        symptomsKu: 'سەرئێشا گران، دلرابوون و رەشاندن، تێکچوونا ئاستێ هۆشیاریێ (Cushing Triad)',
        symptomsEn: 'Projectile vomiting, headache, papilledema, bradycardia with widened pulse pressure',
        severity: 'critical'
      },
      {
        nameKu: 'فێ (Epilepsy / Seizures)',
        nameEn: 'Epileptic Seizures',
        symptomsKu: 'گرژبوونا ماسوولکان ب لەرز، لەدەستدانا هۆشێ، کەف دەڤی',
        symptomsEn: 'Tonic-clonic convulsions, transient loss of consciousness, postictal confusion',
        severity: 'moderate'
      }
    ],
    nursingCare: [
      {
        id: 'nc_brain_1',
        actionKu: 'هەلسەنگاندنا بەردەوام یا پیڤەری هۆشیاریێ Glasgow Coma Scale (GCS) هەر ١ دەمژمێر جارەکێ',
        actionEn: 'Hourly neurological checks using Glasgow Coma Scale (GCS) and pupillary light reactivity',
        priority: 'high'
      },
      {
        id: 'nc_brain_2',
        actionKu: 'بلندکرنا سەری تەختێ نەخۆشی ب گۆشەیا ٣٠ پلە ژ بۆ کێمکرنا پەستانا سەرێ (ICP)',
        actionEn: 'Elevate head of bed 30 degrees and maintain neutral midline neck alignment to lower ICP',
        priority: 'high'
      },
      {
        id: 'nc_brain_3',
        actionKu: 'چاڤدێریا هێمایێن Cushing Triad (بلندبوونا BP، هێدیبوونا لێدانا دلی، هەناسەدانا نەڕێک)',
        actionEn: 'Monitor for Cushing triad: widening pulse pressure, severe bradycardia, irregular respirations',
        priority: 'high'
      },
      {
        id: 'nc_brain_4',
        actionKu: 'دانانا رێکارێن پاراستن ژ کەفتنێ و پێداویستیێن فێبوونێ (Seizure precautions)',
        actionEn: 'Initiate seizure safety precautions: padded side rails, bedside suction, and oxygen cannula',
        priority: 'medium'
      }
    ],
    drugs: ['mannitol', 'diazepam', 'aspirin', 'phenytoin'],
    vitals: {
      hr: '60 - 90 bpm',
      bp: '110/70 - 130/85 mmHg',
      rr: '12 - 18 bpm',
      temp: '36.5 - 37.2 °C',
      targetNoteKu: 'ئەگەر خالێن GCS ببنە کێمتر ژ ٨ پێدڤیە نەخۆش بهێتە ئینتیۆبیتکرن (Intubation).',
      targetNoteEn: 'GCS score <= 8 mandates urgent airway protection and endotracheal intubation.'
    }
  },
  {
    id: 'lungs',
    nameKu: 'سیهـ',
    nameEn: 'Lungs',
    nameAr: 'الرئتان',
    latin: 'Pulmones',
    system: 'respiratory',
    position: [0, 0.45, 0.05],
    color: '#FF9A8A',
    emissiveColor: '#991B1B',
    meshType: 'lungs',
    descriptionKu: 'سیهـ ئەندامێ سەرەکیێ هەناسەدانێ نە. سیها راستێ ژ ٣ بەشان (Lobes) و یا چەپێ ژ ٢ بەشان پێکدهێت (ژبەر جهێ دلی). ئاڵوگۆڕا غازان د ناڤ کیسکێن هەوایێ (Alveoli) دا ئەنجام ددەن.',
    descriptionEn: 'The lungs are the paired organs of respiration. The right lung possesses three lobes (superior, middle, inferior) and the left possesses two lobes with a cardiac notch. Oxygen and carbon dioxide diffusion transpires across alveoli.',
    functionsKu: [
      'وەرگرتنا ئۆکسجینێ ژ هەوای و گەیاندنا وێ بۆ ناڤ دەمارێن خوێنێ',
      'دەرکرنا غازا کاربۆن دایۆکساید (CO2) ژ لەشی ب رێکا دانەڤەیا هەناسێ',
      'رێکخستنا ترشی و بیسیاتی یا خوێنێ (Acid-Base Balance / pH)',
      'فلتەرکرنا کڵۆکێن بچووک یێن خوێنێ و تەنۆلکەیێن زەرەربەخش ژ هەوای'
    ],
    functionsEn: [
      'Alveolar-capillary gas exchange: systemic oxygenation of erythrocytes',
      'Elimination of metabolic byproduct carbon dioxide (CO2)',
      'Critical systemic acid-base balance maintenance (arterial blood pH 7.35-7.45)',
      'Filtration of microemboli and ciliated clearing of inhaled particulates'
    ],
    diseases: [
      {
        nameKu: 'تەنگەنەفەسی یان تەنگا هەناسێ (Asthma / COPD Exacerbation)',
        nameEn: 'Bronchial Asthma / COPD',
        symptomsKu: 'فیکەفیکا سیهان (Wheezing)، تەنگەنەفەسی، کۆخکا ب کێم یا گرژ، بەستنا سینگی',
        symptomsEn: 'Expiratory wheezes, tachypnea, prolonged expiratory phase, intercostal retractions',
        severity: 'critical'
      },
      {
        nameKu: 'سیپەلکبوون (Pneumonia)',
        nameEn: 'Bacterial/Viral Pneumonia',
        symptomsKu: 'تای یا بەرز، بەڵغەما کەسک یان زەرد، ئێشا تیژ یا سینگی دەمێ هەناسە کێشانێ',
        symptomsEn: 'Productive purulent cough, febrile state, pleuritic chest discomfort, localized crackles',
        severity: 'moderate'
      },
      {
        nameKu: 'جەلتەیا سیهان (Pulmonary Embolism)',
        nameEn: 'Pulmonary Embolism (PE)',
        symptomsKu: 'تەنگەنەفەسیا دەستبەجێ یا گران، کۆخکا خوێناوی، تێکچوونا رەنگێ لێڤان (Cyanosis)',
        symptomsEn: 'Sudden onset dyspnea, hemoptysis, tachypnea, pleuritic pain, acute hypoxia',
        severity: 'critical'
      }
    ],
    nursingCare: [
      {
        id: 'nc_lung_1',
        actionKu: 'دانانا نەخۆشی د جهێ دانیشتنا بەرز یان پۆزیشنێ Fowler (٦٠-٩٠ پلە) بۆ ئاسانکرنا هەناسێ',
        actionEn: 'Position patient in High-Fowler position (60-90 degrees) to optimize lung excursion',
        priority: 'high'
      },
      {
        id: 'nc_lung_2',
        actionKu: 'گوێگرتن ل دەنگێ سیهان ب ستەتۆسکۆپێ بۆ دەنگێن نائاسایی (Crackles, Wheezing, Rhonchi)',
        actionEn: 'Auscultate bilateral lung sounds across all lobes for crackles, wheezes, or absent breath sounds',
        priority: 'high'
      },
      {
        id: 'nc_lung_3',
        actionKu: 'بەردەوام پشکنینا تێربوونا ئۆکسجینێ (SpO2) و ڕاگرتنا وێ لسەرووی ٩٤٪ (بۆ نەخۆشێن COPD ٨٨-٩٢٪)',
        actionEn: 'Maintain pulse oximetry target >= 94% (or 88-92% in chronic hypercapnic COPD patients)',
        priority: 'high'
      },
      {
        id: 'nc_lung_4',
        actionKu: 'فێرکرنا نەخۆشی ل سەر هەناسەدانا کویر و کۆخینا کارتێکەر و ئامیرێ Spirometry',
        actionEn: 'Coach patient on deep breathing, incentive spirometry, and cough hygiene protocols',
        priority: 'medium'
      }
    ],
    drugs: ['salbutamol', 'amoxicillin', 'corticosteroids', 'heparin'],
    vitals: {
      hr: '65 - 95 bpm',
      bp: '120/80 mmHg',
      rr: '12 - 20 bpm',
      temp: '36.6 - 37.2 °C',
      spO2: '95 - 100%',
      targetNoteKu: 'ئەگەر رێژەیا هەناسەدانێ (RR) ژ ٢٨ دەربازبوو یان ژ ١٠ کێمتر بوو پێدڤیە دەستبەجێ هاریکاری بهێتە خواستن.',
      targetNoteEn: 'Tachypnea RR > 28 or bradypnea RR < 10 represents respiratory distress requiring rapid response.'
    }
  },
  {
    id: 'liver',
    nameKu: 'مێلاک (جگەر)',
    nameEn: 'Liver',
    nameAr: 'الكبد',
    latin: 'Hepar',
    system: 'digestive',
    position: [0.12, 0.18, 0.12],
    color: '#8B4513',
    emissiveColor: '#451A03',
    meshType: 'liver',
    descriptionKu: 'مێلاک مەزنترین رژێن و ئەندامێ ناڤخۆیی یێ لەشییە، د لایێ راستێ یێ ژووریا زکی دا جێگیرە. نێزیکی ٥٠٠ ئەرکێن گرنگ یێن زیندەیی ئەنجام ددەت، ژ وان ژەهرلابردن، دروستکرنا زەرداڤێ، و دروستکرنا پڕۆتینێن خەستکرنا خوێنێ.',
    descriptionEn: 'The liver is the heaviest internal metabolic organ, situated in the right upper abdominal quadrant beneath the diaphragm. It executes over 500 physiological activities, including chemical detoxification, bile synthesis, and clotting factor formation.',
    functionsKu: [
      'ژەهرلابردن ژ دەرمان و ماددەیێن بیانی د خوێنێ دا',
      'دروستکرنا زەرداڤێ (Bile) ژ بۆ هەرسکرنا چەوریان',
      'دروستکرنا پرۆتینێن خەستبوونا خوێنێ (وەکی پرۆترۆمبین و فیبرینۆجین)',
      'کۆگەهکرنا گلایکۆجین، ڤیتامینان (A, D, B12)، و ئاسنی'
    ],
    functionsEn: [
      'Metabolic detoxification of xenobiotics, circulating toxins, and pharmaceuticals',
      'Synthesis and secretion of bile acids required for enteral lipid emulsification',
      'Biosynthesis of essential plasma coagulation factors and serum albumin',
      'Storage of glycogen, ferritin, and fat-soluble vitamins (A, D, E, K, B12)'
    ],
    diseases: [
      {
        nameKu: 'سیرۆزیس یان وشکبوونا مێلاکێ (Liver Cirrhosis)',
        nameEn: 'Hepatic Cirrhosis',
        symptomsKu: 'زەردبوونا چاڤ و پێستی (Jaundice)، کۆمبوونا ئاڤێ د زکیدا (Ascites)، خوینبەربوون ژ گەدە و سورێنچکێ',
        symptomsEn: 'Scleral icterus, jaundice, severe abdominal ascites, esophageal variceal hemorrhage',
        severity: 'critical'
      },
      {
        nameKu: 'هەوکرنا ڤایرۆسی یا مێلاکێ (Hepatitis B/C)',
        nameEn: 'Viral Hepatitis',
        symptomsKu: 'تای یا کێم، زەردوویی، میزێ رەنگی تاری (وەکی چایێ)، بێ تاقەتی و نەمامانا ئارەزوویا خارنێ',
        symptomsEn: 'Anorexia, dark tea-colored urine, hepatomegaly with right upper quadrant tenderness',
        severity: 'moderate'
      }
    ],
    nursingCare: [
      {
        id: 'nc_liv_1',
        actionKu: 'چاڤدێریا هوور یا رێژەیا پرۆترۆمبین (PT/INR) و هێمایێن خوینبەربوونێ د پووکا دانان و پێستیدا',
        actionEn: 'Monitor coagulation profile (PT/INR/Platelets) and assess for mucosal bleeding or petechiae',
        priority: 'high'
      },
      {
        id: 'nc_liv_2',
        actionKu: 'پێڤانا دەوروبەرێن زکی (Abdominal girth) رۆژانە ژ بۆ زانینا ئاستێ کۆمبوونا ئاڤێ د زکی دا (Ascites)',
        actionEn: 'Measure abdominal girth daily at umbilicus to monitor progression of ascites fluid retention',
        priority: 'medium'
      },
      {
        id: 'nc_liv_3',
        actionKu: 'چاڤدێریا ئاستێ هوشیاریێ ژ ترسا ژەهراویبوونا مێشکی ب ئەمونیا (Hepatic Encephalopathy)',
        actionEn: 'Assess orientation and asterixis flap tremor due to toxic systemic ammonia accumulation',
        priority: 'high'
      }
    ],
    drugs: ['lactulose', 'vitamin_k', 'spironolactone'],
    vitals: {
      hr: '65 - 85 bpm',
      bp: '115/75 mmHg',
      rr: '14 - 18 bpm',
      temp: '36.5 - 37.3 °C',
      targetNoteKu: 'ل دەمێ نیشاندانا زەردووییێ و پەڕەشبوونا هۆشیاریێ، پێدڤیە دەستبەجێ ئاستێ ئەمونیا بێتە پشکنین.',
      targetNoteEn: 'Altered mentation in chronic liver patients demands serum ammonia assay and lactulose titration.'
    }
  },
  {
    id: 'stomach',
    nameKu: 'گەدە (مەعیدە)',
    nameEn: 'Stomach',
    nameAr: 'المعدة',
    latin: 'Gaster / Ventriculus',
    system: 'digestive',
    position: [-0.08, 0.16, 0.14],
    color: '#F472B6',
    emissiveColor: '#831843',
    meshType: 'stomach',
    descriptionKu: 'گەدە ئەندامەکێ شێوە-J یە د سیستەمێ هەرسێ دا، دکەڤیتە لایێ چەپێ یێ زکی. ترشێ هایدرۆکلۆریک (HCl) و ئەنزیمێ پێپسین دەرددەت ژ بۆ شیکرن و کوتانا خارنێ بۆ شلەیەکێ ب ناڤێ چایم (Chyme).',
    descriptionEn: 'The stomach is a hollow J-shaped muscular reservoir positioned in the upper left quadrant. It secretes hydrochloric acid and pepsinogen to initiate chemical breakdown of dietary proteins into semi-fluid chyme.',
    functionsKu: [
      'کۆگەهکرنا دەمکی یا خارنێ و هەرسکرنا میکانیکی ب گرژبوونا ماسوولکان',
      'دەرکرنا ترشێ گەدەی (HCl) ژ بۆ ژناڤبرنا بەکتریایان',
      'دەستپێکرنا هەرسا پڕۆتینان ب رێکا ئەنزیمێ پێپسین',
      'دەرکرنا ماددەیێ ناڤخۆیی (Intrinsic factor) بۆ مژینا ڤیتامین B12'
    ],
    functionsEn: [
      'Temporary alimentary reservoir with mechanical churning into liquid chyme',
      'Hydrochloric acid production lowering pH to 1.5-2.0 to destroy ingested pathogens',
      'Enzymatic digestion of dietary peptide bonds via activated pepsin',
      'Secretion of gastric intrinsic factor essential for ileal cyanocobalamin (B12) absorption'
    ],
    diseases: [
      {
        nameKu: 'برینا گەدەی (Peptic Ulcer Disease)',
        nameEn: 'Peptic Ulcer Disease (PUD)',
        symptomsKu: 'ئێش و سۆتنا زکی تایبەت دەمێ برسیبوونێ، دلتێکچوون، ڕەشاندنا قاوەیی (Coffee-ground emesis)',
        symptomsEn: 'Epigastric burning pain aggravated on empty stomach, hematemesis, melena dark stools',
        severity: 'critical'
      },
      {
        nameKu: 'هەوکرنا گەدەی (Gastritis)',
        nameEn: 'Acute Gastritis',
        symptomsKu: 'ئاوسانی زک، دلتێکچوون، هەست ب پێزانینا قورسیێ پشتی خارنێ',
        symptomsEn: 'Postprandial fullness, nausea, belching, diffuse epigastric discomfort',
        severity: 'mild'
      }
    ],
    nursingCare: [
      {
        id: 'nc_stom_1',
        actionKu: 'دانانا بۆریێ گەدەی (NG Tube) دەمێ خوینبەربوونا گەدەی هەبیت و پشکنینا دەردراوان',
        actionEn: 'Insert and manage nasogastric (NG) tube for gastric decompression or suspected upper GI bleed',
        priority: 'high'
      },
      {
        id: 'nc_stom_2',
        actionKu: 'پێدانا دەرمانێن ترشێن گەدەی (PPIs وەکی ئۆمیپرازۆل) ٣٠ دەقە بەری خارنێ',
        actionEn: 'Administer proton pump inhibitors (e.g., Omeprazole) on an empty stomach 30 mins before meals',
        priority: 'medium'
      },
      {
        id: 'nc_stom_3',
        actionKu: 'چاڤدێریا رەنگی پیسایی (Stool) ژ بۆ دیتنا خوینا رەش (Melena)',
        actionEn: 'Inspect stool consistency and color for occult blood or characteristic tarry black melena',
        priority: 'high'
      }
    ],
    drugs: ['omeprazole', 'metoclopramide', 'antacids'],
    vitals: {
      hr: '65 - 85 bpm',
      bp: '120/80 mmHg',
      rr: '14 - 18 bpm',
      temp: '36.6 - 37.1 °C',
      targetNoteKu: 'ئەگەر ئێشا زکی ناگهان بوو ب ئێشەکا توندا تەختەیی (Rigid abdomen) پێدڤیە ب لەز نۆشدار ببینیت (ترسا قەیتانێ).',
      targetNoteEn: 'Board-like rigid abdomen signifies visceral perforation, requiring immediate surgical consult.'
    }
  },
  {
    id: 'kidneys',
    nameKu: 'گولچیسک (گورچیلە)',
    nameEn: 'Kidneys',
    nameAr: 'الكليتان',
    latin: 'Renes / Nephros',
    system: 'urinary',
    position: [0, 0.05, -0.06],
    color: '#9F1239',
    emissiveColor: '#4C0519',
    meshType: 'kidneys',
    descriptionKu: 'گولچیسک دوو ئەندامێن شێوە-لۆبیایینە د پشتی لەشیدا ل دەورەبەری بڕبڕا پشتێ جێگیرن. فلتەرکەرێن سەرەکینە یێن خوێنێ، بەرپرسن ژ دروستکرنا میزێ، رێکخستنا شلەمەنیان، و هاوسەنگییا ئایۆنێن خوێنێ (سۆدیۆم و پۆتاسیۆم).',
    descriptionEn: 'The kidneys are paired retroperitoneal bean-shaped organs flanking the vertebral column. Housing approximately 1 million nephrons each, they clear nitrogenous waste, modulate extracellular volume, and orchestrate electrolyte balance.',
    functionsKu: [
      'فلتەرکرنا خوینێ و دەرئینانا یوریا و ماددەیێن ژەهراوی ب رێکا میزێ',
      'رێکخستنا بڕ و پەستانا شلەیان د ناڤ دەمارێن لەشی دا ب رێکا سیستەمێ RAAS',
      'هاوسەنگکرنا پۆتاسیۆم، سۆدیۆم، کالسیۆم، و فۆسفاتی د خوینێ دا',
      'دەرکرنا هۆرمۆنێ ئەریترۆپۆیتین (EPO) بۆ دروستکرنا خڕۆکێن سوور یێن خوینێ'
    ],
    functionsEn: [
      'Glomerular filtration of systemic waste products and clearance of urea/creatinine',
      'Extracellular fluid volume and systemic pressure control via RAAS axis',
      'Precision electrolyte regulation (sodium, potassium, bicarbonate, hydrogen)',
      'Endocrine production of erythropoietin stimulating bone marrow erythropoiesis'
    ],
    diseases: [
      {
        nameKu: 'سستبوونا ناگهانی یا گورچیلان (Acute Kidney Injury - AKI)',
        nameEn: 'Acute Kidney Injury (AKI)',
        symptomsKu: 'کێمبوونا بڕێ میزێ (Oliguria)، ئاوسانا دەست و پییان، بەرزبوونا کۆریا و کریاتینین',
        symptomsEn: 'Abrupt decline in urine output (< 0.5 mL/kg/h), azotemia, rising creatinine, fluid overload',
        severity: 'critical'
      },
      {
        nameKu: 'بەردێ گولچیسکێ (Renal Calculi / Nephrolithiasis)',
        nameEn: 'Nephrolithiasis (Kidney Stones)',
        symptomsKu: 'ئێشا زۆر یا گران یا کێلەکێ (Flank pain) کۆ دەچێتە بەرپێ، خوین د ناڤ میزێ دا (Hematuria)',
        symptomsEn: 'Excruciating spasmodic flank colic radiating to groin, micro/gross hematuria, dysuria',
        severity: 'moderate'
      }
    ],
    nursingCare: [
      {
        id: 'nc_kid_1',
        actionKu: 'پیڤان و تۆمارکرنا هوور یا میزێ (Urine Output) دەمژمێری، ئاگەهدارکرن ئەگەر کێمتر ژ 30ml/hr بوو',
        actionEn: 'Strict hourly intake and output (I&O) recording; alert provider if urine output falls < 30 mL/h',
        priority: 'high'
      },
      {
        id: 'nc_kid_2',
        actionKu: 'پشکنینا بەردەوام یا پۆتاسیۆمی (Potassium K+) ژ ترسا تێکچوونا ریتما دلی و لێدانی (Arrhythmia)',
        actionEn: 'Continuous monitoring of serum potassium (K+) to prevent fatal hyperkalemic cardiac dysrhythmias',
        priority: 'high'
      },
      {
        id: 'nc_kid_3',
        actionKu: 'چاڤدێریا کریاتینین و شیکارییا میزێ (Urine Analysis) بەری پێدانا دەرمانێن گولچیسک سستکەر (NSAIDs)',
        actionEn: 'Review serum creatinine and eGFR clearance prior to administering nephrotoxic agents',
        priority: 'medium'
      }
    ],
    drugs: ['furosemide', 'lisinopril', 'sodium_bicarbonate'],
    vitals: {
      hr: '65 - 80 bpm',
      bp: '120/80 mmHg',
      rr: '14 - 18 bpm',
      temp: '36.5 - 37.2 °C',
      targetNoteKu: 'ئاستێ پۆتاسیۆمی پێدڤیە د ناڤبەرا 3.5 - 5.0 mEq/L دا بمینیت، بەرزبوونی مەترسیدارە.',
      targetNoteEn: 'Serum potassium must be tightly maintained within 3.5 - 5.0 mEq/L range.'
    }
  },
  {
    id: 'intestines',
    nameKu: 'روویڤیک',
    nameEn: 'Intestines',
    nameAr: 'الأمعاء',
    latin: 'Intestinum (Enteron)',
    system: 'digestive',
    position: [0, -0.05, 0.12],
    color: '#D97706',
    emissiveColor: '#78350F',
    meshType: 'intestines',
    descriptionKu: 'روویڤیک پێکدهێن ژ روویڤیکا زراڤ (Small Intestine: درێژیا وێ ٦ مەترە) و روویڤیکا ئەستوور (Colon: درێژیا وێ ١.٥ مەترە). بەرپرسن ژ مژینا ماددەیێن خارنێ و ئاڤێ و دەرهاڤێتنا پاشمایان ژ لەشی.',
    descriptionEn: 'The intestinal tract consists of the small intestine (duodenum, jejunum, ileum) providing primary nutrient absorption, and the large intestine (colon and rectum) handling water recovery and fecal consolidation.',
    functionsKu: [
      'مژینا ٩٠٪ ژ ماددەیێن خوارنێ (پڕۆتین، گلوکۆز، چەوری) د روویڤیکا زراڤ دا',
      'مژینا ئاڤ و خوێیان د روویڤیکا ئەستوور دا بۆ دروستکرنا پاشمایی (پیساتی)',
      'حەواندنا مایکرۆبایۆمێ لەشی (بەکتریایێن مفادار) بۆ بەرهەمئینانا ڤیتامین K',
      'تەڤگەرا پاڵدەر (Peristalsis) بۆ پاڵدانا خارنێ بەرەڤ پێش'
    ],
    functionsEn: [
      'Primary systemic absorption of 90% digestible nutrients via microvilli brush border',
      'Fluid and electrolyte reabsorption and stool consolidation in colon segments',
      'Host to human gut microbiome synthesizing essential vitamin K and short-chain fatty acids',
      'Coordinated smooth muscle peristalsis advancing luminal contents caudally'
    ],
    diseases: [
      {
        nameKu: 'گرتنا روویڤیکان (Intestinal Bowel Obstruction)',
        nameEn: 'Bowel Obstruction',
        symptomsKu: 'ئاوسانا توند یا زکی، نەماما پیساتی و با، دلڤەڕێشانا پیساتی-شێوە، ئێشا کرژ',
        symptomsEn: 'Hyperactive tinkling early sounds, severe colicky pain, feculent emesis, absolute constipation',
        severity: 'critical'
      },
      {
        nameKu: 'هەوکرنا ڕویڤیکەکۆرێ (Appendicitis)',
        nameEn: 'Acute Appendicitis',
        symptomsKu: 'ئێش د دەوروبەرێن نافکێ دا دەستپێدکەت پاشان دچیتە لایێ راستێ یێ خوارێ یێ زکی (McBurney point)',
        symptomsEn: 'Periumbilical pain migrating to right lower quadrant (McBurney point), rebound tenderness',
        severity: 'critical'
      }
    ],
    nursingCare: [
      {
        id: 'nc_int_1',
        actionKu: 'گوێگرتن ل دەنگێ روویڤیکان (Bowel Sounds) د هەر چار پارچەیێن زکی دا بۆ دەمێ ٥ خولەکان',
        actionEn: 'Auscultate bowel sounds across all 4 abdominal quadrants for hypoactive or high-pitched tinkling sounds',
        priority: 'high'
      },
      {
        id: 'nc_int_2',
        actionKu: 'پاراستنا رەوشا NPO (قەدەغەکرنا خارن و ڤەخوارنێ ب تەمامی) دەمێ گومانا نشترگەریێ یان گیرانێ هەبیت',
        actionEn: 'Enforce strict NPO status and fluid resuscitation in suspected acute abdomen or obstruction',
        priority: 'high'
      },
      {
        id: 'nc_int_3',
        actionKu: 'چاڤدێریا پیساتیێ و پێدانا شلە و ئاڤێ دەمێ زکچوونا توند هەبیت بۆ پاراستن ژ زوهاوبوونێ',
        actionEn: 'Monitor hydration status and replenish electrolyte losses in profuse secretory diarrhea',
        priority: 'medium'
      }
    ],
    drugs: ['metronidazole', 'loperamide', 'bisacodyl'],
    vitals: {
      hr: '65 - 85 bpm',
      bp: '120/80 mmHg',
      rr: '14 - 18 bpm',
      temp: '36.6 - 37.4 °C',
      targetNoteKu: 'ئەگەر ئێکسەر دەنگێ روویڤیکان نەما (Silent abdomen) دکتۆری ئاگەهدار بکە.',
      targetNoteEn: 'Absence of bowel sounds after surgery or obstruction may indicate paralytic ileus.'
    }
  },
  {
    id: 'pancreas',
    nameKu: 'پەنکریاس',
    nameEn: 'Pancreas',
    nameAr: 'البنكرياس',
    latin: 'Pancreas',
    system: 'digestive',
    position: [0.02, 0.12, 0.04],
    color: '#FBBF24',
    emissiveColor: '#78350F',
    meshType: 'pancreas',
    descriptionKu: 'پەنکریاس رژێنەکێ هەمەکی یە د پشتا گەدەی دا. هەم دەردانی دەرەکی (Exocrine: ئەنزیمێن هەرسێ) و هەم دەردانی ناوەکی (Endocrine: هۆرمۆنێن ئەنسۆلین و گلۆکاگۆن بۆ رێکخستنا شەکرا خوێنێ) هەیە.',
    descriptionEn: 'The pancreas is a retroperitoneal dual gland situated posterior to the stomach. It performs exocrine digestion by producing pancreatic juice and endocrine regulation through islets releasing insulin and glucagon.',
    functionsKu: [
      'بەرهەمئینانا ئەنسۆلینێ ژ خانەیێن Beta بۆ کێمکرنا شەکرا خوینێ',
      'بەرهەمئینانا گلۆکاگۆنێ ژ خانەیێن Alpha بۆ بلندکرنا شەکرا خوینێ د دەمێ برسیبوونێ دا',
      'دەرکرنا ئەنزیمێن ئامیلەیز، لایپەیز و ترپسیۆجین بۆ هەرسکرنا بەز و نیشاستەیی',
      'دەرکرنا بیکاربۆنات بۆ پووچەڵکرنا ترشێ گەدەی د روویڤیکا دوازدەگرێ دا'
    ],
    functionsEn: [
      'Insulin secretion by islet beta cells facilitating cellular uptake of blood glucose',
      'Glucagon secretion by islet alpha cells mobilizing hepatic glycogen stores during fasting',
      'Synthesis of pancreatic amylase, lipase, and trypsinogen for duodenal macromolecule digestion',
      'Secretion of bicarbonate ions buffering acidic gastric secretions'
    ],
    diseases: [
      {
        nameKu: 'هەوکرنا دژوار یا پەنکریاسی (Acute Pancreatitis)',
        nameEn: 'Acute Pancreatitis',
        symptomsKu: 'ئێشەکا زۆر دژوار ل سەرێ زکی بەرەڤ پشتی دچیت، دلرابوون و بلندبوونا ئەنزیمێ Amylase/Lipase',
        symptomsEn: 'Severe epigastric pain boring through to back, nausea, marked elevation of serum lipase',
        severity: 'critical'
      },
      {
        nameKu: 'شەکرە (Diabetes Mellitus Type 1 & 2)',
        nameEn: 'Diabetes Mellitus',
        symptomsKu: 'زۆر میزکرن (Polyuria)، زۆر تینووبوون (Polydipsia)، کێمبوونا کێشێ، شەکەتبوون',
        symptomsEn: 'Polyuria, polydipsia, unexplained weight loss, elevated glycated hemoglobin HbA1c',
        severity: 'moderate'
      }
    ],
    nursingCare: [
      {
        id: 'nc_panc_1',
        actionKu: 'پشکنینا بەردەوام یا شەکرا خوینێ ب رێکا گلوکۆمیتەر (Accu-Chek) بەری نانخوارنێ و بەری نڤستنێ',
        actionEn: 'Frequent point-of-care capillary blood glucose monitoring before meals and bedtime',
        priority: 'high'
      },
      {
        id: 'nc_panc_2',
        actionKu: 'هایداربوون ژ نزمبوونا ژنکافکا یا شەکرا خوینێ (Hypoglycemia < 70 mg/dL) و پێدانا گلوکۆز ب لەز',
        actionEn: 'Screen for hypoglycemia triad: diaphoresis, tremor, tachycardia; treat promptly with Rule of 15',
        priority: 'high'
      },
      {
        id: 'nc_panc_3',
        actionKu: 'پێدانا رێنمایی و چاڤدێری ل سەر رێکێ لێدانا دەرزییا ئەنسۆلینێ د بن پێستی دا (Subcutaneous)',
        actionEn: 'Educate patient on rotation of subcutaneous insulin injection sites to prevent lipodystrophy',
        priority: 'medium'
      }
    ],
    drugs: ['insulin', 'metformin', 'glucagon'],
    vitals: {
      hr: '65 - 85 bpm',
      bp: '120/80 mmHg',
      rr: '14 - 18 bpm',
      temp: '36.5 - 37.2 °C',
      targetNoteKu: 'شەکرا خوینێ یا نورمال بەری خارنێ 70 - 100 mg/dL و پشتی خارنێ کێمتر ژ 140 mg/dL بیت.',
      targetNoteEn: 'Fasting glucose target 70-100 mg/dL; postprandial ceiling < 140 mg/dL.'
    }
  },
  {
    id: 'spleen',
    nameKu: 'سپڵ',
    nameEn: 'Spleen',
    nameAr: 'الطحال',
    latin: 'Lien / Splen',
    system: 'immune',
    position: [-0.18, 0.22, 0.08],
    color: '#7C3AED',
    emissiveColor: '#3B0764',
    meshType: 'spleen',
    descriptionKu: 'سپڵ ئەندامەکێ گرنگێ سیستەمێ لیمفاوی و بەرگریێ یە، د لایێ چەپێ سەرێ زکی د پشتا پەراسیێن ٩-١١ دایە. فلتەرکەرێ خوینێ یە و ژناڤبەرێ خڕۆکێن سوورێن کەڤنە.',
    descriptionEn: 'The spleen is an encapsulated lymphoid organ in the left upper quadrant under ribs 9-11. It filters systemic blood, phagocytoses senescent erythrocytes, and mounts adaptive immune responses against encapsulated bacteria.',
    functionsKu: [
      'فلتەرکرنا خوینێ و ژناڤبرنا خڕۆکێن سوورێن پیر و شکەستی',
      'کۆگەها پلاکتێن خوینێ و خڕۆکێن سپی',
      'دروستکرنا بەرگریێ دژی بەکتریایێن دیواردار (Encapsulated bacteria)',
      'بەرهەمئینانا خوینێ د دەمێ زارۆکبوونێ دا'
    ],
    functionsEn: [
      'Immunological blood surveillance and destruction of senescent red blood cells',
      'Platelet reservoir harboring up to one-third of peripheral platelets',
      'Production of specific IgM antibodies countering encapsulated pathogens',
      'Extramedullary hematopoiesis reserve capacity'
    ],
    diseases: [
      {
        nameKu: 'تەقینا سپڵێ (Splenic Rupture)',
        nameEn: 'Splenic Rupture',
        symptomsKu: 'ئێش ل لایێ چەپێ سەرێ زکی بەرەڤ ملێ چەپ دچیت (Kehr sign)، دابەزینا زۆرا پەستانێ (Hypotension)',
        symptomsEn: 'Trauma with severe LUQ pain radiating to left shoulder tip (Kehr sign), hypovolemic shock',
        severity: 'critical'
      },
      {
        nameKu: 'مەزنبوونا سپڵێ (Splenomegaly)',
        nameEn: 'Splenomegaly',
        symptomsKu: 'تێربوونا ب لەز پشتی خارنێ، کێمخوینی، خوینبەربوون ژ بەر کێمیا پلاکتان',
        symptomsEn: 'Early satiety due to gastric impingement, cytopenias, thrombocytopenic petechiae',
        severity: 'moderate'
      }
    ],
    nursingCare: [
      {
        id: 'nc_spl_1',
        actionKu: 'چاڤدێریا توند یا پەستانا خوینێ و لێدانا دلی پشتی رویدان یان لێدانێ (مەترسیا خوینبەربوونا ناڤخۆیی)',
        actionEn: 'Urgent hemodynamics evaluation for tachycardia and hypotension indicating internal rupture',
        priority: 'high'
      },
      {
        id: 'nc_spl_2',
        actionKu: 'ئامۆژگاری بۆ وەرگرتنا کوتانێ دژی بەکتریایێ (Pneumococcal, Meningococcal) ئەگەر سپڵ هاتبیتە لادان',
        actionEn: 'Ensure post-splenectomy immunization against encapsulated pathogens (Pneumococcus, Hib)',
        priority: 'medium'
      }
    ],
    drugs: ['amoxicillin', 'vaccines', 'analgesics'],
    vitals: {
      hr: '65 - 85 bpm',
      bp: '120/80 mmHg',
      rr: '14 - 18 bpm',
      temp: '36.5 - 37.2 °C',
      targetNoteKu: 'ئەگەر لێدانا دلی ژ 100 خێراتر بوو دگەل دابەزینا پەستانێ، گومانا شۆکا خوینبەربوونێ بکە.',
      targetNoteEn: 'Tachycardia and hypotension following blunt trauma indicate hypovolemic hemorrhage.'
    }
  },
  {
    id: 'bladder',
    nameKu: 'میزڵدان (میسڵدان)',
    nameEn: 'Urinary Bladder',
    nameAr: 'المثانة البولية',
    latin: 'Vesica Urinaria',
    system: 'urinary',
    position: [0, -0.32, 0.12],
    color: '#F59E0B',
    emissiveColor: '#92400E',
    meshType: 'bladder',
    descriptionKu: 'میزڵدان ئەندامەکێ ماسوولکەیی کشایە د ناڤ حەوزێ دا. میزێ ژ گولچیسکان وەردگریت ب رێکا حالبی و کۆم دکەت هەتا دەمێ میزکرنێ (شیناییا هەلگرتنا نێزیکی ٤٠٠-٦٠٠ مل هەیە).',
    descriptionEn: 'The urinary bladder is an expandable musculo-membranous reservoir situated on the pelvic floor. It receives urine continuously from both ureters and stores up to 400-600 mL until micturition is initiated.',
    functionsKu: [
      'کۆمکرن و راگرتنا دەمکی یا میزێ بێی زڤڕین بۆ گورچیلکان',
      'گرژبوونا ماسوولکەیێ Detrusor بۆ دەرهاڤێتنا میزێ ل دەمێ پێدڤی',
      'کۆنترۆلکرنا دەرئینانا میزێ ب رێکا ماسوولکەیێ دەڕگەهی (Sphincters)',
      'پاراستنا پاقژیا سیستەمێ میزەڕۆیێ ب هاریکاریا تەبەقەیا دژە بەکتریا'
    ],
    functionsEn: [
      'Storage of urine at low intravesical pressure without retrograde ureteral reflux',
      'Coordinated detrusor muscle contraction during somatic voluntary voiding',
      'Urethral sphincter competence preventing stress or urge incontinence',
      'Urothelial barrier defense resisting microbial adherence'
    ],
    diseases: [
      {
        nameKu: 'هەوکرنا میزڵدانێ (Cystitis / UTI)',
        nameEn: 'Urinary Tract Infection (Cystitis)',
        symptomsKu: 'سۆتنا میزێ (Dysuria)، زۆر چوونا سەرئاڤێ، میزەکا نەپاقژ یان بێهن پیس، ئێشا ژێر زکی',
        symptomsEn: 'Dysuria, urinary frequency, urgency, suprapubic tenderness, cloudy malodorous urine',
        severity: 'moderate'
      },
      {
        nameKu: 'مانا میزێ د میزڵدانێ دا (Urinary Retention)',
        nameEn: 'Acute Urinary Retention',
        symptomsKu: 'نەشێیان ل سەر میزکرنێ، پفبوونا توند یا بەشێ خوارێ یێ زکی، ئێشا گران',
        symptomsEn: 'Inability to void despite full bladder sensation, palpable suprapubic fullness, agony',
        severity: 'critical'
      }
    ],
    nursingCare: [
      {
        id: 'nc_bld_1',
        actionKu: 'دانانا سۆندەیا میزێ (Foley Catheter) ب رێکا ستێرایل یا تەمام (Aseptic Technique) بۆ بەتاڵکرنێ',
        actionEn: 'Strict aseptic technique during urinary Foley catheterization to prevent CAUTI infections',
        priority: 'high'
      },
      {
        id: 'nc_bld_2',
        actionKu: 'پشکنینا پاشمایێ میزێ ب ئامێرێ Bladder Scanner پشتی میزکرنێ (PVR)',
        actionEn: 'Utilize portable ultrasound bladder scan to measure Post-Void Residual (PVR) volume',
        priority: 'medium'
      },
      {
        id: 'nc_bld_3',
        actionKu: 'هاندانا نەخۆشی بۆ ڤەخوارنا ئاڤەکا زۆر (٢-٣ لیتر د رۆژێ دا) بۆ شووشتنا بەکتریایان',
        actionEn: 'Promote hydration with 2-3 liters fluid intake daily to dilute and flush urinary pathogens',
        priority: 'low'
      }
    ],
    drugs: ['ciprofloxacin', 'ceftriaxone', 'phenazopyridine'],
    vitals: {
      hr: '65 - 80 bpm',
      bp: '120/80 mmHg',
      rr: '14 - 18 bpm',
      temp: '36.5 - 37.3 °C',
      targetNoteKu: 'ئەگەر د دەمێ هەبوونا سۆندەیا میزێ دا تایێ ل نەخۆشی دا، گومانا هەوکرنا سۆندێ بکە.',
      targetNoteEn: 'Catheterized fever signifies CAUTI needing urine culture before catheter exchange.'
    }
  },
  {
    id: 'skin',
    nameKu: 'پێست',
    nameEn: 'Integumentary (Skin)',
    nameAr: 'الجلد',
    latin: 'Cutis / Integumentum',
    system: 'immune',
    position: [0, 0.1, 0.28],
    color: '#E8C4A8',
    emissiveColor: '#78350F',
    meshType: 'skin',
    descriptionKu: 'پێست مەزنترین ئەندامێ دەرڤەیێ لەشێ مرۆڤیە. پێکدهێت ژ سێ چینان: Epidermis, Dermis, و Hypodermis. دیوارێ پارێزەرێ سەرەکییە دژی میکرۆبان و زوهاکەفتنێ، و پلەیا گەرمیا لەشی رێکدئێخیت.',
    descriptionEn: 'The skin is the largest organ of the human body, providing an expansive protective envelope consisting of epidermis, dermis, and subcutaneous hypodermis. It arbitrates thermoregulation, tactile sensation, and innate barrier defense.',
    functionsKu: [
      'بەربەستێ سەرەکیێ فیزیکی دژی میکرۆبان و تیشکا زیانبەخش یا خۆرێ',
      'رێکخستنا پلەیا گەرمیا لەشی ب رێکا ئارەقکرن و فرەهبوونا دەماران',
      'بەرهەمئینانا ڤیتامین D د بن تیشکا خۆرێ دا',
      'هەستکرن ب ئێش، پلەیا گەرمی، پەستان، و دەستلێدانێ'
    ],
    functionsEn: [
      'Primary physical immune shield against environmental microorganisms and ultraviolet damage',
      'Thermoregulation via eccrine perspiration evaporation and cutaneous vasodilatation',
      'Endogenous synthesis of previtamin D upon ultraviolet-B cutaneous stimulation',
      'Dense mechanoreceptor network detecting nociceptive pain, vibration, and thermal change'
    ],
    diseases: [
      {
        nameKu: 'برینا تەختی (Pressure Ulcers / Bedsores)',
        nameEn: 'Pressure Injury (Decubitus)',
        symptomsKu: 'سووربوونا بەردەوام، برینداربوونا پێستی ل سەر ئێسکان (بۆ نموونە ساکرۆم و کەپۆکێن پییان)',
        symptomsEn: 'Non-blanchable erythema, epidermal breakdown, deep tissue pressure injury stages 1-4',
        severity: 'moderate'
      },
      {
        nameKu: 'سۆتنا دژوار (Severe Burns)',
        nameEn: 'Extensive Thermal Burns',
        symptomsKu: 'ژدەستدانا پێستی، تێکچوونا شلەیێن لەشی، دروستبوونا پەرپۆچان، ئاوسانا مەزن',
        symptomsEn: 'Loss of cutaneous barrier, intense fluid shift, hypovolemia, high infection susceptibility',
        severity: 'critical'
      }
    ],
    nursingCare: [
      {
        id: 'nc_skn_1',
        actionKu: 'گوهۆڕینا جهـ و شێوازێ رونشتنا نەخۆشی (Q2H Position Change) هەر دوو دەمژمێران جارەکێ بۆ رێگریێ ل برینا تەختی',
        actionEn: 'Reposition bedbound patients at least every 2 hours with 30-degree lateral tilting',
        priority: 'high'
      },
      {
        id: 'nc_skn_2',
        actionKu: 'هەلسەنگاندنا رۆژانە یا پێستی ب پێوەرێ Braden Scale بۆ زانینا مەترسیا دروستبوونا برینان',
        actionEn: 'Calculate daily Braden Scale score to stratify pressure injury vulnerability',
        priority: 'medium'
      },
      {
        id: 'nc_skn_3',
        actionKu: 'پاقژکرن و پێچانا تەندروست یا برینان ب شێوازێ ستێرایل ب مەڵحەم و پانسمانا تایبەت',
        actionEn: 'Perform sterile dressing changes with hydrocolloid or silver antimicrobials as prescribed',
        priority: 'medium'
      }
    ],
    drugs: ['silver_sulfadiazine', 'hydrocortisone', 'mupirocin'],
    vitals: {
      hr: '65 - 80 bpm',
      bp: '120/80 mmHg',
      rr: '14 - 18 bpm',
      temp: '36.5 - 37.2 °C',
      targetNoteKu: 'ئەگەر برین رەنگێ سۆرێ نەگوهۆڕ بیت یان بێهن هەبیت، نیشانا دەستپێکرنا هەوکرنێ یە.',
      targetNoteEn: 'Non-blanchable redness over bony prominences signifies Stage 1 pressure ulcer.'
    }
  },
  {
    id: 'bones',
    nameKu: 'هەیکەلێ لەشی (ئێسک)',
    nameEn: 'Skeletal System (Bones)',
    nameAr: 'الجهاز الهيكلي (العظام)',
    latin: 'Systema Skeletale (206 Ossa)',
    system: 'skeletal',
    position: [0, 0.2, 0],
    color: '#E2E8F0',
    emissiveColor: '#334155',
    meshType: 'bones',
    descriptionKu: 'هەیکەلێ لەشێ مرۆڤی ژ ٢٠٦ ئێسکان پێکدهێت. چوارچێوەیا سەرەکی یا لەشی یە، ئەندامێن نازک وەکی مێشک و دلی دپارێزیت، و جهێ دروستبوونا خڕۆکێن خوینێ یە د مۆخێ ئێسکی دا.',
    descriptionEn: 'The adult human skeletal framework comprises 206 articulated bones. It establishes internal mechanical architecture, shields delicate viscera (cranium, thoracic cage), provides locomotion levers, and houses hematopoietic bone marrow.',
    functionsKu: [
      'راگرتن و دانا شێوەی بۆ لەشی و کارکرن دگەل ماسوولکان بۆ لڤینێ',
      'پاراستنا ئەندامێن هەستیار (کەللۆخێ سەری بۆ مێشکی، قەفەسا سنگی بۆ دل و سیهان)',
      'بەرهەمئینانا هەمی جۆرێن خڕۆکێن خوینێ د مۆخێ ئێسکی دا (Hematopoiesis)',
      'کۆگەها کانزایێن کالسیۆم و فۆسفاتی د لەشی دا'
    ],
    functionsEn: [
      'Rigid biomechanical framework partnering with skeletal muscles for locomotion',
      'Internal protective shields for vital organs (cranium, ribcage, vertebral canal)',
      'Hematopoiesis within red marrow producing erythrocytes, leukocytes, and platelets',
      'Mineral homeostatic reservoir sequestering 99% of total bodily calcium'
    ],
    diseases: [
      {
        nameKu: 'شکەستنا ئێسکی (Bone Fractures)',
        nameEn: 'Fractures (Open / Closed)',
        symptomsKu: 'ئێشا دژوار، نەشێیانا لڤینێ، تێکچوونا شێوێ پەلەکان، ئاوسان و شینبوون',
        symptomsEn: 'Deformity, crepitus on palpation, acute localized pain, inability to bear weight',
        severity: 'critical'
      },
      {
        nameKu: 'سستبوونا ئێسکی (Osteoporosis)',
        nameEn: 'Osteoporosis',
        symptomsKu: 'کێمبوونا چڕییا ئێسکی، شکەستنا ب لەز د دەمێ کەفتنێ دا (ب تایبەت حەوز و مەچەک)',
        symptomsEn: 'Silent decrease in bone mineral density leading to fragility fractures of hip/wrist',
        severity: 'moderate'
      }
    ],
    nursingCare: [
      {
        id: 'nc_bon_1',
        actionKu: 'هەلسەنگاندنا دەمار و سوڕا خوینێ یا پەلەکان (Neurovascular Assessment: 5 Ps - Pain, Pulse, Pallor, Paresthesia, Paralysis)',
        actionEn: 'Frequent 5-P neurovascular checks: Pain, Pulse, Pallor, Paresthesia, Paralysis distal to fracture',
        priority: 'high'
      },
      {
        id: 'nc_bon_2',
        actionKu: 'بەستن و بێلڤینکرنا جهێ شکەستنێ (Splinting & Immobilization) بێی لڤاندنا زێدە',
        actionEn: 'Immobilize joints above and below fracture with anatomical splint prior to transport',
        priority: 'high'
      },
      {
        id: 'nc_bon_3',
        actionKu: 'چاڤدێری بۆ نیشانێن نیشتنا بەزی (Fat Embolism Syndrome) د شکەستنێن مەزن دا',
        actionEn: 'Monitor for petechial rash and acute hypoxia indicating fat embolism syndrome after long bone fracture',
        priority: 'high'
      }
    ],
    drugs: ['calcium_d3', 'alendronate', 'tramadol', 'ketorolac'],
    vitals: {
      hr: '65 - 80 bpm',
      bp: '120/80 mmHg',
      rr: '14 - 18 bpm',
      temp: '36.5 - 37.2 °C',
      targetNoteKu: 'ئەگەر د پەلێ شکەستی دا لێدانا دەماری (Pulse) نەما، دەستبەجێ دکتۆری ئاگەهدار بکە.',
      targetNoteEn: 'Loss of distal peripheral pulse constitutes an orthopaedic emergency (Compartment syndrome).'
    }
  }
];

export const SYSTEM_CATEGORIES = [
  { id: 'all', nameKu: 'هەمی کوئەندام', nameEn: 'All Systems', count: 12 },
  { id: 'circulatory', nameKu: 'سوڕا خوێنێ (Circulatory)', nameEn: 'Circulatory System', count: 1 },
  { id: 'nervous', nameKu: 'دەماران (Nervous)', nameEn: 'Nervous System', count: 1 },
  { id: 'respiratory', nameKu: 'هەناسەدانێ (Respiratory)', nameEn: 'Respiratory System', count: 1 },
  { id: 'digestive', nameKu: 'هەرسی (Digestive)', nameEn: 'Digestive System', count: 4 },
  { id: 'skeletal', nameKu: 'هەیکەل (Skeletal 206 Bones)', nameEn: 'Skeletal System', count: 1 },
  { id: 'urinary', nameKu: 'میزەڕۆ (Urinary)', nameEn: 'Urinary System', count: 2 },
  { id: 'immune', nameKu: 'بەرگری و پێست (Immune/Skin)', nameEn: 'Immune & Integumentary', count: 2 },
];
