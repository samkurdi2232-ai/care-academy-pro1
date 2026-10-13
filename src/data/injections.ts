export type InjectionRoute = 'im' | 'sc' | 'id' | 'iv';

export interface InjectionSite {
  id: string;
  nameEn: string;
  nameKu: string;
  route: InjectionRoute;
  angleDegree: number; // 90, 45, 25, 10-15
  needleGauge: string;
  needleLength: string;
  maxVolumeMl: number;
  anatomicalLandmarksEn: string[];
  anatomicalLandmarksKu: string[];
  clinicalTechniqueEn: string;
  clinicalTechniqueKu: string;
  preferredDrugsEn: string[];
  preferredDrugsKu: string[];
  nursingPrecautionsEn: string[];
  nursingPrecautionsKu: string[];
  diagramPosition: {
    x: number; // percentage on anatomical human map
    y: number;
  };
  safetyRating: 'preferred' | 'standard' | 'high-risk';
}

export interface IVCannulaGauge {
  gauge: number;
  colorNameEn: string;
  colorNameKu: string;
  hexColor: string;
  externalDiameterMm: number;
  lengthMm: number;
  flowRateMlMin: number;
  primaryIndicationsEn: string;
  primaryIndicationsKu: string;
}

export const IV_CANNULA_GAUGES: IVCannulaGauge[] = [
  {
    gauge: 14,
    colorNameEn: 'Orange',
    colorNameKu: 'پرتەقاڵی',
    hexColor: '#EA580C',
    externalDiameterMm: 2.1,
    lengthMm: 45,
    flowRateMlMin: 343,
    primaryIndicationsEn: 'Massive blood transfusion, acute hemorrhagic shock, major emergency trauma resuscitation.',
    primaryIndicationsKu: 'گوهاستنا لەزگین یا خوینێ، شۆکا خوینبەربوونا دژوار، برینداربوونا گران و نەشتەرگەریێن مەزن.'
  },
  {
    gauge: 16,
    colorNameEn: 'Grey',
    colorNameKu: 'رەساسی / بۆر',
    hexColor: '#6B7280',
    externalDiameterMm: 1.8,
    lengthMm: 45,
    flowRateMlMin: 196,
    primaryIndicationsEn: 'Major open abdominal or cardiac surgery, rapid high-volume crystalloid fluid resuscitation.',
    primaryIndicationsKu: 'نەشتەرگەریێن مەزن یێن زک و دلی، دانا لەزگین یا شلەیێن سەلاین و رینگەر بۆ نەخۆشێن شۆکێ.'
  },
  {
    gauge: 18,
    colorNameEn: 'Green',
    colorNameKu: 'سەوز',
    hexColor: '#16A34A',
    externalDiameterMm: 1.3,
    lengthMm: 45,
    flowRateMlMin: 96,
    primaryIndicationsEn: 'Routine blood product transfusion, high-viscosity parenteral infusions, contrast CT scans.',
    primaryIndicationsKu: 'گوهاستنا بەرهەمێن خوێنێ (پلازما و کریاتێن سۆر)، دانانا دەرمانێن خەست، و پشکنینا وێنەیی یا CT ب ماددێ رەنگدار.'
  },
  {
    gauge: 20,
    colorNameEn: 'Pink',
    colorNameKu: 'پەمبەیی',
    hexColor: '#EC4899',
    externalDiameterMm: 1.1,
    lengthMm: 32,
    flowRateMlMin: 61,
    primaryIndicationsEn: 'Most widely used general adult medical-surgical ward cannula for IV fluids and routine medications.',
    primaryIndicationsKu: 'بەرپەلاترین کانیۆلایە بۆ نەخۆشێن مەزن د قاوشان دا بۆ دانا شلەیان، ئەنتی بایۆتیک و دەرمانێن رۆژانە.'
  },
  {
    gauge: 22,
    colorNameEn: 'Blue',
    colorNameKu: 'شین',
    hexColor: '#3B82F6',
    externalDiameterMm: 0.9,
    lengthMm: 25,
    flowRateMlMin: 36,
    primaryIndicationsEn: 'Elderly patients with fragile veins, pediatric infusions, maintenance slow drip medications.',
    primaryIndicationsKu: 'نەخۆشێن ب تەمەن یێن دەمارێن وان تەنک و باریک، زارۆکێن مەزن، و دانا شلەیێن هێدی.'
  },
  {
    gauge: 24,
    colorNameEn: 'Yellow',
    colorNameKu: 'زەرد',
    hexColor: '#EAB308',
    externalDiameterMm: 0.7,
    lengthMm: 19,
    flowRateMlMin: 22,
    primaryIndicationsEn: 'Neonates, young infants, and oncology patients with delicate, sclerosed peripheral veins.',
    primaryIndicationsKu: 'ساڤایێن نوی ژ دایکبووی، شیرخۆر، و ئەو کەسێن دەمارێن وان زۆر زەحمەت بهێنە دیتن.'
  }
];

export const INJECTION_SITES: InjectionSite[] = [
  {
    id: 'im_ventrogluteal',
    nameEn: 'Ventrogluteal Muscle (Gluteus Medius & Minimus)',
    nameKu: 'ماسوولکەیا ڤێنترۆگلوتیال (پەسنێ حەوزێ)',
    route: 'im',
    angleDegree: 90,
    needleGauge: '20 - 23 Gauge',
    needleLength: '1.5 inch (38 mm)',
    maxVolumeMl: 3.5,
    safetyRating: 'preferred',
    diagramPosition: { x: 38, y: 55 },
    anatomicalLandmarksEn: [
      'Place palm of hand over patient greater trochanter of the femur (use right hand for left hip)',
      'Point index finger toward anterior superior iliac spine (ASIS)',
      'Spread middle finger along iliac crest toward the buttock',
      'The injection target center is the middle of the "V" triangle formed by fingers'
    ],
    anatomicalLandmarksKu: [
      'لەپێ دەستی دانێ ل سەر سەرێ هەستیێ رانی (Greater Trochanter)',
      'تلییا دووێ درێژ بکە بەرەڤ پاشکەفتیێ سەریێ حەوزێ (ASIS)',
      'تلییا سێیێ ڤەکە ل درێژاهیا سەرێ حەوزێ (Iliac Crest)',
      'ناڤەڕاستا شێوازێ "V" یا د ناڤبەرا هەردوو تلییان دا دروست دبیت، نیشانا دروستە'
    ],
    clinicalTechniqueEn: 'Use Z-track technique: pull overlying subcutaneous tissue 2.5 cm laterally, insert needle briskly at 90° angle, inject at 10 seconds per mL, wait 10 seconds before smooth withdrawal, release displaced tissue.',
    clinicalTechniqueKu: 'رێکا Z-track بکاربینە: پێستی ب درێژاهیا ٢.٥ سم بەرەڤ تەنیشتێ رابکێشە، دەرزیێ ب گۆشەیا ٩٠ پلە لێبدە، ب هێدی دەرمانی پاڵپێڤە بدە (١٠ چرکه بۆ هەر ١ مل)، ١٠ چرکان بوەستە پاشان دەربینە و پێستی بەردە.',
    preferredDrugsEn: ['Viscous oily injections', 'High-volume antibiotics (Ceftriaxone)', 'Haloperidol decanoate', 'Deep IM pain medications'],
    preferredDrugsKu: ['دەرمانێن زەیتی و خەست', 'ئەنتی بایۆتیکێن قەبارە مەزن (وەک سێفتریاکسۆن)', 'دەرمانێن درێژخایەن یێن دەماری', 'ئێششکێنێن کویر'],
    nursingPrecautionsEn: [
      'Safest site in adults: Free of major nerves and large blood vessels',
      'Never inject in infants under 7 months before walking development',
      'Avoids the high-risk Sciatic nerve and Superior Gluteal Artery'
    ],
    nursingPrecautionsKu: [
      'ئێمن ترین جهە د لەشێ مرۆڤێ مەزن دا: چ دەمارێن سەرەکی یان خوینبەرێن مەزن ل ڤێرە نینن',
      'نابیت بۆ وان ساڤایان بهێتە لێدان یێن ژیێ وان ژ ٧ هەیڤان کێمتر بیت و پێ نەگرتبن',
      'ب تمامی دویرە ژ دەمارێ مەزنێ سیاتیک (Sciatic Nerve - عرق النسا)'
    ]
  },
  {
    id: 'im_deltoid',
    nameEn: 'Deltoid Muscle (Upper Arm)',
    nameKu: 'ماسوولکەیا دەلتۆید (ملێ ژووری)',
    route: 'im',
    angleDegree: 90,
    needleGauge: '22 - 25 Gauge',
    needleLength: '1 inch (25 mm)',
    maxVolumeMl: 1.0,
    safetyRating: 'standard',
    diagramPosition: { x: 26, y: 32 },
    anatomicalLandmarksEn: [
      'Palpate the lower edge of the acromion process (bony shoulder tip)',
      'Measure 2 to 3 fingerbreadths (about 3-5 cm) below the acromion process',
      'Draw an imaginary inverted triangle base at top with apex pointing down to axillary fold',
      'Target is the center of this triangle over the thickest part of deltoid'
    ],
    anatomicalLandmarksKu: [
      'دەست بدە سەرێ هەستیێ شانێ (Acromion Process)',
      '٢ بۆ ٣ قامکان بهێیە خوارێ ژ سەرێ هەستیێ شانێ (نێزیکی ٣ بۆ ٥ سم)',
      'سێگۆشەیەکا بەراڤا بکێشە کو سەرێ وێ بەرەڤ خوارێ بیت بەرامبەر بنباڵێ',
      'ناڤەڕاستا ڤێ سێگۆشەیێ کو ئەستویرترین پشکا ماسوولکەیێ یە، جهێ دروستە'
    ],
    clinicalTechniqueEn: 'Patient relaxes arm with elbow flexed; bunch up the muscle mass if patient is thin, insert needle at 90° directly into the muscle belly.',
    clinicalTechniqueKu: 'نەخۆش دەستێ خوە خاڤ دکەت و ئانیشکێ دچەمینیت؛ دەرزیێ ب گۆشەیا ٩٠ پلە ب لەز د ناڤ دڵی ماسوولکەی دا لێبدە.',
    preferredDrugsEn: ['Routine Adult Vaccines (Influenza, COVID-19, Tdap, Hepatitis B)', 'Low-volume emergency antiemetics'],
    preferredDrugsKu: ['ڤاکسینێن رۆژانە یێن هەڵامەتێ، کڕۆنا، دەردەباریکە و کەزازێ', 'دەرمانێن دڵرابوونێ ب قەبارێ کێم'],
    nursingPrecautionsEn: [
      'Strict maximum volume is 1.0 mL to avoid compartment tension and radial nerve injury',
      'High risk of damage to Radial Nerve and Brachial Artery if placed too low or too posterior'
    ],
    nursingPrecautionsKu: [
      'قەبارێ دەرمانی نابیت ژ ١.٠ مل زێدەتر بیت داکو زیان نەگەهیتە دەمارێ رادیال',
      'مەترسیا بریندارکرنا دەمارێ رادیال و خوینبەری دروست دبیت ئەگەر زۆر بهێتە خوارێ'
    ]
  },
  {
    id: 'im_vastus_lateralis',
    nameEn: 'Vastus Lateralis (Anterolateral Thigh)',
    nameKu: 'ماسوولکەیا ڤاستوس لاتێرالیس (تەنیشتا رانی)',
    route: 'im',
    angleDegree: 90,
    needleGauge: '22 - 25 Gauge',
    needleLength: '1 to 1.25 inch',
    maxVolumeMl: 2.5,
    safetyRating: 'preferred',
    diagramPosition: { x: 36, y: 65 },
    anatomicalLandmarksEn: [
      'Identify greater trochanter at hip and lateral femoral condyle at knee',
      'Divide anterior lateral aspect of thigh into horizontal thirds',
      'Target is the middle third, slightly lateral to the midline of anterior thigh'
    ],
    anatomicalLandmarksKu: [
      'دەستنیشانکرنا سەرێ رانی ل بەشێ ژوور و سەرێ چۆکێ ل بەشێ خوارێ',
      'بەشکرنا پشکا دەرڤە یا رانی بۆ سێ پشکێن یەکسان',
      'پشکا ناڤەڕاستێ (سێیەکا ناڤین) یا بەرەڤ دەرڤە، جهێ ستاندارد و دروستە'
    ],
    clinicalTechniqueEn: 'Grasp body of muscle to stabilize, insert needle at 90° perpendicular to thigh surface. Preferred site for infant immunizations and self-administration of epinephrine auto-injectors.',
    clinicalTechniqueKu: 'ماسوولکەی ب توندی بگرە داکو نەجوولیت، دەرزیێ ب گۆشەیا ٩٠ پلە لێبدە. ئەڤە باشترین جهە بۆ زارۆکان و لێدانا دەرزیێن ئەپینێفرین (EpiPen).',
    preferredDrugsEn: ['Infant & pediatric immunizations', 'Epinephrine auto-injector in Anaphylaxis', 'Patient self-injections'],
    preferredDrugsKu: ['هەمی ڤاکسینێن ساڤا و زارۆکان', 'دەرزییا لەزگین یا ئەپینێفرین (EpiPen) د دەمێ هەستیاریێ دا', 'دەرزیێن نەخۆش بخوە لێددەت'],
    nursingPrecautionsEn: [
      'Number one recommended site for infants under 12 months (thickest developed muscle mass)',
      'Well-developed muscle devoid of major neurovascular bundles'
    ],
    nursingPrecautionsKu: [
      'ئێکەم جهێ پێشنیارکری یە بۆ ساڤایێن کێمتر ژ ئێک ساڵ ژ بەر کو ئەستویرترین ماسوولکەیە',
      'چ دەمارێن مەترسیدار ل ڤی دەڤەری نینن'
    ]
  },
  {
    id: 'sc_subcutaneous',
    nameEn: 'Subcutaneous Adipose Tissue (Abdomen & Arm)',
    nameKu: 'تەخا چەوریێ یا ژێرپێستی (زک و مل)',
    route: 'sc',
    angleDegree: 45, // or 90 depending on needle length
    needleGauge: '25 - 31 Gauge (Ultra-fine)',
    needleLength: '3/8 to 5/8 inch (4-12 mm)',
    maxVolumeMl: 1.0,
    safetyRating: 'preferred',
    diagramPosition: { x: 48, y: 46 },
    anatomicalLandmarksEn: [
      'Abdomen: At least 2 inches (5 cm) away from umbilicus (belly button) on all sides',
      'Outer posterior aspect of upper arm',
      'Anterior aspect of thighs and upper ventrodorsal gluteal areas'
    ],
    anatomicalLandmarksKu: [
      'زک: لانیکەم ٢ ئینج (٥ سم) دویر ژ نافکێ ل هەمی لایان',
      'پشکا پشتێ و دەرڤە یا بازوویێ ملێ',
      'پێشیا رانان و تەخا سەری یا حەوزێ'
    ],
    clinicalTechniqueEn: 'Pinch 1-2 inches of skin fold: inject at 90° for short needles (4-8mm) or 45° if only 1 inch of tissue can be pinched. Release skin after needle insertion. Do NOT aspirate. Do NOT massage site after injection.',
    clinicalTechniqueKu: 'تەخا پێستی ب دوو قامکان بگرە: ئەگەر دەرزی کورت بیت ب گۆشەیا ٩٠ لێبدە، ئەگەر درێژ بیت ب گۆشەیا ٤٥. هەرگیز دەرزیێ پاشڤە رانەکێشە (No Aspiration). پشتی لێدانێ مەساجێ نەکە!',
    preferredDrugsEn: ['Insulin (Regular, NPH, Glargine, Lispro)', 'Low Molecular Weight Heparins (Enoxaparin / Clexane)', 'Fondaparinux'],
    preferredDrugsKu: ['ئەنسۆلین بۆ شەکرێ (خێرا و هێدی)', 'دەرزیێن رونکەرێن خوێنێ وەک کلێکسان (Enoxaparin / Clexane)', 'هۆرمۆنێن گەشەیێ'],
    nursingPrecautionsEn: [
      'CRITICAL: Never aspirate for blood when injecting Heparin or Insulin (causes tissue hematoma and irregular absorption)',
      'CRITICAL: Never rub or massage injection site after Enoxaparin/Clexane (causes extensive ecchymosis and bruising)',
      'Rotate injection sites systematically to prevent lipohypertrophy (lumpy fat deposits)'
    ],
    nursingPrecautionsKu: [
      'زۆر گرنگە: هەرگیز دەمێ کلێکسان یان ئەنسۆلینێ لێددەی دەرزیێ پاشڤە نەزڤڕینە، چونکی خوێنبەربوونێ د ناڤ پێستی دا دروست دکەت',
      'زۆر گرنگە: هەرگیز پشتی دەرزیێ شوونا وێ گوشار مەدە و مەساج نەکە، دێ بیتە ئەگەرێ شینبوونا زکی',
      'هەمی جاران جهێ لێدانێ بگۆڕە داکو گۆڕین و رەقبوونا چەوریێ (Lipohypertrophy) رووینەدەت'
    ]
  },
  {
    id: 'id_intradermal',
    nameEn: 'Intradermal Dermis Layer (Inner Forearm)',
    nameKu: 'تەخا ناڤخۆیی یا پێستی (Intradermal)',
    route: 'id',
    angleDegree: 15,
    needleGauge: '26 - 27 Gauge',
    needleLength: '3/8 to 1/2 inch',
    maxVolumeMl: 0.1,
    safetyRating: 'standard',
    diagramPosition: { x: 28, y: 44 },
    anatomicalLandmarksEn: [
      'Ventral (inner) aspect of the forearm, 3 to 4 fingerbreadths below antecubital space and hand breadth above wrist',
      'Free from lesions, hair, tattoos, and prominent superficial veins'
    ],
    anatomicalLandmarksKu: [
      'بەشێ ناڤخۆیی یێ دەستێ پێشێ (مەچەک)، ٣ بۆ ٤ قامکان خوارتر ژ ئانیشکێ',
      'پێدڤیە جهەکێ پاقژ بیت ژ مووان، تاتۆ و دەمارێن دیار'
    ],
    clinicalTechniqueEn: 'Pull skin taut with non-dominant hand; insert needle at 5 to 15 degree angle with BEVEL UP until resistance is felt (~3 mm). The outline of the bevel should be visible beneath the epidermis. Inject 0.1 mL slowly to form a 6 to 10 mm distinct pale wheal (bleb). Do NOT apply pressure or band-aid.',
    clinicalTechniqueKu: 'پێستی توند رابکێشە؛ دەرزیێ ب گۆشەیا ٥ بۆ ١٥ پلە ب شێوەیەکێ کو سەرێ وێ یێ تیژ بەرەڤ ژوور بیت (Bevel Up) هێدی د ناڤ پێستێ دا دەرباز بکە. دێ بینی بلۆقەکا بچووک (Wheal 6-10 mm) دروست دبیت. لۆکێ ب توندی ل سەر دانەنێ.',
    preferredDrugsEn: ['Tuberculin PPD Mantoux skin test (Purified Protein Derivative)', 'Allergy sensitivity testing', 'Local anesthetic skin wheal'],
    preferredDrugsKu: ['تێستێ سیلێ (Mantoux PPD Test)', 'پشکنینا هەستیارییا دەرمانان (Allergy Test)', 'تەزاندنا دەستپێکی یا پێستی'],
    nursingPrecautionsEn: [
      'If wheal does not appear or bleeding occurs, needle entered subcutaneous layer and test is invalid (must repeat on other arm)',
      'Read Mantoux test strictly at 48 to 72 hours measuring induration (palpable hardness), NOT redness'
    ],
    nursingPrecautionsKu: [
      'ئەگەر بلۆقا سپی دروست نەبوو یان خوین هات، رامانا وێ دەرزی چوو ژێر پێست و تێست خراب بوو، پێدڤیە ل ملێ دی دووبارە بکەی',
      'خاندنا پشکنینا سیلێ دەستنیشان دبیت پشتی ٤٨ بۆ ٧٢ دەمژمێران ب پێڤانا رەقبوونا پێستێ، نەک تەنێ سۆربوونێ'
    ]
  }
];
