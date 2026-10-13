export interface ChecklistItem {
  id: string;
  orderNumber: number;
  titleEn: string;
  titleKu: string;
  actionEn: string;
  actionKu: string;
  clinicalStandardEn: string;
  clinicalStandardKu: string;
  isMandatory: boolean;
}

export interface SafetyCategory {
  id: string;
  titleEn: string;
  titleKu: string;
  badgeEn: string;
  badgeKu: string;
  descriptionEn: string;
  descriptionKu: string;
  items: ChecklistItem[];
}

export const SAFETY_CHECKLIST_DATA: SafetyCategory[] = [
  {
    id: 'hand_hygiene',
    titleEn: 'WHO 5 Moments for Hand Hygiene Protocol',
    titleKu: 'پرۆتۆکۆلێ دەستشووشتنا ستاندارد یا رێکخراوا ساخلەمیا جیهانی (WHO)',
    badgeEn: 'Infection Prevention',
    badgeKu: 'پاراستن ژ هەوکرنێ',
    descriptionEn: 'The core defense against healthcare-associated infections (HAIs) and multidrug-resistant organism transmission.',
    descriptionKu: 'بنەمایێ سەرەکی یێ پاراستنا نەخۆشی و پەرستاری ژ میکرۆب و بەکتریایێن نەخۆشخانێ.',
    items: [
      {
        id: 'hh_1',
        orderNumber: 1,
        titleEn: 'Moment 1: Before Touching a Patient',
        titleKu: 'دەما ١: بەری دەست ل نەخۆشی بدەی',
        actionEn: 'Perform alcohol-based hand rub for 20-30 seconds or wash with soap and water for 40-60 seconds when approaching patient zone.',
        actionKu: 'دەستێن خوە ب مەڵحەمێ کحولی بۆ ٢٠-٣٠ چرکەیان ب سڕە یان ب ئاڤ و سابوونێ بشۆ بەری دەستدان ل نەخۆشی.',
        clinicalStandardEn: 'Protects the patient against harmful hospital germs carried on health-care worker hands.',
        clinicalStandardKu: 'نەخۆشی ژ میکرۆبێن ل سەر دەستێن پەرستاری دپارێزیت.',
        isMandatory: true
      },
      {
        id: 'hh_2',
        orderNumber: 2,
        titleEn: 'Moment 2: Before Clean / Aseptic Procedures',
        titleKu: 'دەما ٢: بەری ئەنجامدانا کریارەکا پاقژ یان ستێرایل',
        actionEn: 'Immediately before wound dressing, vascular access insertion, preparing medication, or catheterization.',
        actionKu: 'دەستبەجێ بەری لێدانا دەرزیێ، بەستنا کانیۆلایێ، دەرمانبەخشینێ یان پێچانا برینێ.',
        clinicalStandardEn: 'Prevents entry of pathogenic microbes into sterile patient body sites.',
        clinicalStandardKu: 'ناهێلیت میکرۆب بچنە ناڤ برین یان ناڤ دەمارێن نەخۆشی.',
        isMandatory: true
      },
      {
        id: 'hh_3',
        orderNumber: 3,
        titleEn: 'Moment 3: After Body Fluid Exposure Risk',
        titleKu: 'دەما ٣: دەستبەجێ پشتی بەرکەفتن دگەل شلەیێن لەشی',
        actionEn: 'Immediately after contact with blood, mucous membranes, saliva, urine, wound exudate, or removal of medical gloves.',
        actionKu: 'دەستبەجێ پشتی دەستدان د خوین، میز، دەردراوێن برینێ، یان داکەندنا دەستکێشان.',
        clinicalStandardEn: 'Mandatory soap and water wash if hands are visibly soiled with blood or organic matter.',
        clinicalStandardKu: 'شووشتن ب ئاڤ و سابوونێ فەرزە ئەگەر خوین یان پیساتی ل دەستان دیار بیت.',
        isMandatory: true
      },
      {
        id: 'hh_4',
        orderNumber: 4,
        titleEn: 'Moment 4: After Touching a Patient',
        titleKu: 'دەما ٤: پشتی دەستدان ل نەخۆشی',
        actionEn: 'When leaving the immediate patient bedside after performing vital signs, physical exam, or hygiene support.',
        actionKu: 'دەمێ ب جهـ هێلانا تەختێ نەخۆشی پشتی پێڤانا پەستانێ، لێدانا دلی یان پشکنینێ.',
        clinicalStandardEn: 'Protects the nurse and subsequent clinical environments from cross-contamination.',
        clinicalStandardKu: 'پەرستاری و نەخۆشێن دی دپارێزیت ژ گوهاستنا نەخۆشیان.',
        isMandatory: true
      },
      {
        id: 'hh_5',
        orderNumber: 5,
        titleEn: 'Moment 5: After Touching Patient Surroundings',
        titleKu: 'دەما ٥: پشتی دەستدان ل کەلوپەلێن دەوروبەری نەخۆشی',
        actionEn: 'After touching bed rails, bedside tables, infusion pump controls, or monitoring wires without touching patient directly.',
        actionKu: 'پشتی دەستدان ل تەخت، مێز، دوگمەیێن ئامێری یان تەلێن مۆنیتەری.',
        clinicalStandardEn: 'Hospital inanimate surfaces harbor pathogens like MRSA and VRE for hours to weeks.',
        clinicalStandardKu: 'مێز و ئامێر ژێدەرێ سەرەکی یێ بەکتریایێن بەهێز یێن نەخۆشخانەیێ نە.',
        isMandatory: true
      }
    ]
  },
  {
    id: 'ppe_protocol',
    titleEn: 'Personal Protective Equipment (PPE) Sequences',
    titleKu: 'پرۆتۆکۆلێ بەرکرن و داکەندنا جلوبەرگێن خۆپاراستنێ (PPE)',
    badgeEn: 'CDC Isolation Standard',
    badgeKu: 'ستانداردێ خۆپاراستنێ',
    descriptionEn: 'Strict CDC order for Donning (putting on) and Doffing (removing) personal protective gear to prevent self-contamination.',
    descriptionKu: 'رێزبەندیا دروست یا بەرکرن و داکەندنا جلکێن پاراستنێ داکو پەرستار تووشی ڤایرۆسان نەبیت.',
    items: [
      {
        id: 'ppe_don',
        orderNumber: 1,
        titleEn: 'DONNING SEQUENCE (Putting On PPE)',
        titleKu: 'رێزبەندیا بەرکرنا دروست (Donning)',
        actionEn: '1. GOWN (fasten neck and waist ties) -> 2. MASK or N95 Respirator (secure ties/bands and fit nose wire) -> 3. GOGGLES or FACE SHIELD -> 4. GLOVES (pull over gown cuffs).',
        actionKu: '١. بەرکرنا پێشگرکی (Gown) -> ٢. دانانا ماسکی یان N95 -> ٣. چاڤیلکێن پاراستنێ یان شیلد -> ٤. بەرکرنا دەستکێشان ل سەر قۆڵێن پێشگرکی.',
        clinicalStandardEn: 'Proper sequence prevents gaps in barrier protection before entering patient isolation room.',
        clinicalStandardKu: 'پاراستنەکا تۆکمە دروست دکەت بەری چوونا ناڤ ژوورا نەخۆشی.',
        isMandatory: true
      },
      {
        id: 'ppe_doff',
        orderNumber: 2,
        titleEn: 'DOFFING SEQUENCE (Removing PPE - Highest Contamination Risk)',
        titleKu: 'رێزبەندیا داکەندنا پاراستنێ (Doffing - زۆر هەستیارە)',
        actionEn: '1. GLOVES (glove-in-glove technique) -> 2. GOGGLES/FACE SHIELD (handle by ear piece) -> 3. GOWN (peel down and away from body) -> 4. MASK (touch only back straps, remove AFTER leaving room) -> 5. HAND HYGIENE.',
        actionKu: '١. داکەندنا دەستکێشان -> ٢. داکەندنا چاڤیلکان ژ پاشڤە -> ٣. داکەندنا پێشگرکی بەرەڤ پێش و دویر ژ لەشی -> ٤. لادانا ماسکی تەنێ ب داڤێن پاشەملێ -> ٥. شووشتنا دەستبەجێ یا دەستان.',
        clinicalStandardEn: 'Gloves and gown front are the most heavily contaminated surfaces; never touch front of mask with bare hands!',
        clinicalStandardKu: 'پێشیا دەستکێش و ماسکی پرن ژ میکرۆبان؛ هەرگیز ب دەستێ رویس دەست ل پێشیا ماسکی نەدە!',
        isMandatory: true
      }
    ]
  },
  {
    id: 'ten_rights',
    titleEn: 'The 10 Rights of Medication Administration',
    titleKu: '١٠ ماف و یاسایێن زێڕین یێن دانا دەرمانان ب نەخۆشی',
    badgeEn: 'Patient Safety',
    badgeKu: 'ئێمناهییا نەخۆشی',
    descriptionEn: 'The universal nursing checklist to prevent medication errors, adverse drug events, and patient harm.',
    descriptionKu: 'یاسایێن نەگۆڕ یێن پەرستاری بۆ رێگریکرن ل هەر شاشیەکێ د دانا دەرمانان دا.',
    items: [
      {
        id: 'right_1_patient',
        orderNumber: 1,
        titleEn: '1. Right Patient (Two Identifiers)',
        titleKu: '١. نەخۆشێ دروست (ب دوو نیشانان)',
        actionEn: 'Verify patient identity using TWO independent identifiers: Full legal name AND Date of birth (or medical record number). Check wristband against MAR. Never use room or bed number!',
        actionKu: 'پشتڕاستبە ژ ناڤێ سیانی یێ نەخۆشی و رۆژا ژدایکبوونێ ل سەر باجێ مەچەکی. هەرگیز ژمارەیا تەختی بکارنەئینە بۆ ناسینێ!',
        clinicalStandardEn: 'The Joint Commission Standard: Prevents misidentification errors in multi-bed units.',
        clinicalStandardKu: 'رێگریێ ل دانا دەرمانی ب کەسەکێ دی دگریت.',
        isMandatory: true
      },
      {
        id: 'right_2_drug',
        orderNumber: 2,
        titleEn: '2. Right Drug (Three Checks Rule)',
        titleKu: '٢. دەرمانێ دروست (سێ جاران پشکنین)',
        actionEn: 'Check drug label against physician order at THREE points: 1) When retrieving from pyxis/shelf, 2) When preparing/drawing dose, 3) At bedside immediately before administration.',
        actionKu: 'ناڤێ دەرمانی دگەل رەچەتەیێ بەراورد بکە: ١) دەما ژ دولابی ددەربینی، ٢) دەما ئامادە دکەی، ٣) دەما ل دەف سەرێ نەخۆشی پێش لێدانێ.',
        clinicalStandardEn: 'Prevents sound-alike and look-alike drug errors (LASA).',
        clinicalStandardKu: 'ناهێلیت دەرمانێن ناڤ لێکچوو تێکەڵ ببن.',
        isMandatory: true
      },
      {
        id: 'right_3_dose',
        orderNumber: 3,
        titleEn: '3. Right Dose (Independent Calculation Check)',
        titleKu: '٣. بڕ و دۆزا دروست (حیسابکرنا هویر)',
        actionEn: 'Verify dose calculation carefully. Have a second registered nurse independently double-check high-alert medications (Insulin, Heparin, Potassium, Chemotherapy, Opioids).',
        actionKu: 'دۆزێ ب هویربینی بپێڤە. د دەرمانێن مەترسیدار دا (ئەنسۆلین، هێپارین، پۆتاسیۆم) پێدڤیە پەرستارەکێ دی ژی ب چاڤێ خوە دۆزێ پشتڕاست بکەت.',
        clinicalStandardEn: 'Prevents 10-fold decimal point overdose errors.',
        clinicalStandardKu: 'رێگریێ ل شاشیا خالا دەهێ (Decimal) دگریت کو دەرمان ١٠ بەرامبەر زێدە نەبیت.',
        isMandatory: true
      },
      {
        id: 'right_4_route',
        orderNumber: 4,
        titleEn: '4. Right Route (Verify Delivery Pathway)',
        titleKu: '٤. رێکا دروست یا دانا دەرمانی',
        actionEn: 'Confirm intended route: Oral (PO), Subcutaneous (SC), Intramuscular (IM), Intravenous (IV), Sublingual (SL), Topical, Inhalation. Never inject oral liquids into IV line!',
        actionKu: 'دڵنیابە دەرمان د دەڤ ڕا دهێتە خوارن، ب دەرزیێ یە، د ناڤ دەمار دایە، یان ژێر ئەزمانی. هەرگیز شەربەتا دەڤی مەهاڤێژە د ناڤ دەمار دا!',
        clinicalStandardEn: 'Wrong-route errors (e.g., oral solution into IV) cause instantaneous embolization and cardiac arrest.',
        clinicalStandardKu: 'لێدانا شاشی یا دەرمانی د ناڤ دەمار دا دەستبەجێ نەخۆشی دکوژیت.',
        isMandatory: true
      },
      {
        id: 'right_5_time',
        orderNumber: 5,
        titleEn: '5. Right Time & Frequency',
        titleKu: '٥. دەمێ دروست و سەعەتا دیارکری',
        actionEn: 'Administer within 30 minutes of scheduled time for time-critical medications (Antibiotics, Insulin, STAT emergency orders).',
        actionKu: 'دەرمانێ ل سەعەتا خوە بدە، ب تایبەت ئەنتی بایۆتیک و ئەنسۆلین داکو کاریگەرییا وان لاواز نەبیت.',
        clinicalStandardEn: 'Maintains steady therapeutic plasma drug concentration without toxicity spikes.',
        clinicalStandardKu: 'ئاستێ دەرمانی د ناڤ خوێنێ دا ب جێگیری دپارێزیت.',
        isMandatory: true
      },
      {
        id: 'right_6_safety',
        orderNumber: 6,
        titleEn: '6-10: Documentation, Reason, Response, Refusal, Patient Education',
        titleKu: '٦-١٠: تومارکرن، هۆکار، بەرسڤ، مافێ رەتکرنێ و هوشیارکرنا نەخۆشی',
        actionEn: 'Document immediately AFTER administration (never before). Explain medication purpose to patient in Behdini Kurdish. Respect right to refuse while educating on risks. Assess therapeutic response.',
        actionKu: 'دەستبەجێ پشتی دانا دەرمانی تومار بکە (نەک بەری وێ). مەرەما دەرمانی بۆ نەخۆشی شلوڤە بکە. رێزێ ل مافێ وی بگرە و چاڤدێریا چێبوونا وی بکە.',
        clinicalStandardEn: 'Complete legal and ethical clinical documentation.',
        clinicalStandardKu: 'بنەمایێ یاسایی و ئەخلاقی یێ پەرستاریا پێشکەفتی.',
        isMandatory: true
      }
    ]
  },
  {
    id: 'sharps_safety',
    titleEn: 'OSHA Sharps Safety & Needlestick Prevention',
    titleKu: 'پرۆتۆکۆلێ پاراستن ژ برینداربوونا دەرزیان و سەلکێن زەرد (Sharps Safety)',
    badgeEn: 'Nurse Occupational Safety',
    badgeKu: 'ئێمناهییا پەرستاری',
    descriptionEn: 'Rigid occupational protocols preventing accidental needlestick injury and bloodborne pathogen transmission (HIV, Hepatitis B & C).',
    descriptionKu: 'رێنمایێن ستاندارد بۆ پاراستنا پەرستاری ژ برینداربوون ب دەرزیێن بکارئینای و نەخۆشیێن خوینێ.',
    items: [
      {
        id: 'sharp_1',
        orderNumber: 1,
        titleEn: 'NEVER Recapping Used Needles (Universal Prohibition)',
        titleKu: 'هەرگیز سەرپۆشێ دەرزیێ ب دەستان دانەنێڤە (قەدەغەیە)',
        actionEn: 'NEVER use two hands to recap a contaminated needle after injection. If recapping is unavoidable, use one-handed scoop technique only.',
        actionKu: 'هەرگیز پشتی لێدانا دەرزیێ سەرپۆشێ وێ ب هەردوو دەستان نەئێخە سەر. ئەگەر زۆر نەچار بی تەنێ ب یەک دەست رێکەفە.',
        clinicalStandardEn: 'Recapping is the leading cause of occupational needlestick puncture wounds worldwide.',
        clinicalStandardKu: 'دانانەڤەیا سەرپۆشی سەرەکیترین هۆکارێ کونبوونا دەستێن پەرستارانە ل جیهانێ.',
        isMandatory: true
      },
      {
        id: 'sharp_2',
        orderNumber: 2,
        titleEn: 'Activate Safety Shield Immediately',
        titleKu: 'قوفلکرنا دەستبەجێ یا پارێزەرێ دەرزیێ (Safety Shield)',
        actionEn: 'Engage safety locking mechanism using thumb or hard surface immediately upon withdrawing needle from patient tissue.',
        actionKu: 'دەستبەجێ پشتی دەرکەفتنا دەرزیێ ژ لەشێ نەخۆشی، قوفلا وێ یا پارێزەر دابخە ب قامکێ مەزن.',
        clinicalStandardEn: 'Safety-engineered medical devices dramatically reduce percutaneous exposure incidents.',
        clinicalStandardKu: 'دەرزیێ راستەوخۆ دپارێزیت ژ کونکرنا هەر تشتەکێ دی.',
        isMandatory: true
      },
      {
        id: 'sharp_3',
        orderNumber: 3,
        titleEn: 'Immediate Disposal into Puncture-Resistant Sharps Container',
        titleKu: 'هاڤێتنا دەستبەجێ د ناڤ سەلکا زەرد یا رەق دا (Sharps Bin)',
        actionEn: 'Drop syringe and needle directly into yellow sharps disposal box located within arm reach. NEVER force sharps into a box filled beyond 3/4 full line!',
        actionKu: 'دەرزیێ راستەوخۆ بهاڤێژە د ناڤ سەلکا زەرد یا تایبەت دا. ئەگەر سەلک پڕی سێ لەسەر چار بوو، دەستی پێنەوە و زێدەتر تێدا نەئێخە!',
        clinicalStandardEn: 'Overfilled containers are high-hazard zones for accidental puncture injuries.',
        clinicalStandardKu: 'سەلکێن زێدە پڕ دبنە مەترسی بۆ برینداربوونا هەمی ستافی.',
        isMandatory: true
      }
    ]
  }
];
