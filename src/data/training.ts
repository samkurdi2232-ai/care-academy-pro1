export interface LessonStep {
  stepNumber: number;
  titleKu: string;
  titleEn: string;
  descKu: string;
  descEn: string;
  clinicalTipKu: string;
  clinicalTipEn: string;
}

export interface TrainingModule {
  id: string;
  titleKu: string;
  titleEn: string;
  categoryKu: string;
  categoryEn: string;
  durationMinutes: number;
  levelKu: string;
  levelEn: string;
  overviewKu: string;
  overviewEn: string;
  videoTitle: string;
  videoDuration: string;
  steps: LessonStep[];
  quizQuestionCount?: number;
  relatedOrganId?: string;
  badge: string;
}

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'vital_signs',
    titleKu: 'پێڤانا نیشانێن ژیانی (Vital Signs)',
    titleEn: 'Comprehensive Vital Signs Assessment',
    categoryKu: 'بنەمایێن کلینیکی',
    categoryEn: 'Fundamental Clinical Skills',
    durationMinutes: 45,
    levelKu: 'سەرەتایی / پێشکەفتی',
    levelEn: 'Foundational to Intermediate',
    overviewKu: 'فێربوونا پێڤانا تەواو یا نیشانێن ژیانی: پەستانا خوێنێ ب دەستی و گوهداریکرن، لێدانا دلی بۆ ٦٠ چرکەیێن تەواو، چاڤدێریا هەناسەدانێ ب هێمنی بێی نەخۆش هەست پێ بکەت، پلەیا گەرمێ، و رێژەیا ئۆکسجینێ SpO2 ب ستانداردێ ٢٠٢٦.',
    overviewEn: 'Master standardized measurement of blood pressure via manual auscultation, apical pulse auscultation for 60 seconds, stealth respiratory rate observation, core temperature profiling, and peripheral pulse oximetry.',
    videoTitle: 'Clinical Auscultation & Korotkoff Sound Identification 2026',
    videoDuration: '3:00 Min HD',
    badge: 'BP & Pulse Master',
    relatedOrganId: 'heart',
    steps: [
      {
        stepNumber: 1,
        titleKu: 'ئامادەکرنا نەخۆشی و شێوازێ رونشتنێ',
        titleEn: 'Patient Rest & Posture Optimization',
        descKu: 'دڵنیابە نەخۆش لانیکەم ٥ دەقان بەری پێڤانێ پشوودابیت، پێیێن وی ل سەر عەردی بن و ل سەر ئێک نەبن، و دەستێ وی ل ئاستێ دلی هاتبیتە راگرتن.',
        descEn: 'Ensure patient rests quietly for 5 minutes prior to assessment. Feet flat on floor uncrossed; test arm fully supported at heart level.',
        clinicalTipKu: 'دانانا پییان ل سەر ئێک پەستانا خوێنێ ب شێوەیەکێ دەستکرد ب ٥ بۆ ٨ ملم جیوە بلند دکەت.',
        clinicalTipEn: 'Crossing legs artificially elevates systolic blood pressure by up to 5-8 mmHg.'
      },
      {
        stepNumber: 2,
        titleKu: 'هەلبژارتنا قەبارێ دروستێ کەفێ پەستانپێڤێ (Cuff Sizing)',
        titleEn: 'Accurate Blood Pressure Cuff Selection',
        descKu: 'پانییا کەفی پێدڤیە ٤٠٪ یا دەورێ قۆلی دابپۆشیت و درێژاهیا وی ٨٠٪ یا دەوری بیت. کەفێ بچووک پەستانێ ب شاشی بەرز دکەت.',
        descEn: 'The cuff bladder width must encircle 40% of mid-arm circumference and length 80%. An undersized cuff causes falsely elevated readings.',
        clinicalTipKu: 'هەمیشە دەفێ سەماعێ دانێ ل سەر خوینبەرێ بازوویی (Brachial) نەک د بن کەفی دا بشاریتەڤە.',
        clinicalTipEn: 'Place stethoscope diaphragm over brachial artery without tucking underneath cuff border.'
      },
      {
        stepNumber: 3,
        titleKu: 'پێڤانا لێدانا دلی یا لوتکە (Apical Pulse) ب تەمامی',
        titleEn: 'Apical Pulse Full-Minute Auscultation',
        descKu: 'د ناڤبەرا پێراسویا ٥ێ و هێلا ناڤەندا چەڵەمەیێ سەماعێ دانێ و لێدانا دلی (Lub-Dub) بۆ ٦٠ چرکەیێن تەمام بژمێرە بۆ نەخۆشێن دەرمانێ دیجۆکسین و ناڕێکییا لێدانێ.',
        descEn: 'Locate 5th intercostal space at midclavicular line (PMI) and auscultate S1/S2 rhythm for full 60 seconds.',
        clinicalTipKu: 'هەرگیز د نەخۆشێن ناڕێکییا لێدانا دلی دا دەمێ ژمارتنێ کورت نەکە بۆ ١٥ چرکان!',
        clinicalTipEn: 'Never extrapolate 15-second counts in patients with arrhythmias or taking cardiac glycosides.'
      },
      {
        stepNumber: 4,
        titleKu: 'پشکنینا هەناسەدانێ ب شێوازێ زیرەک (Stealth RR Count)',
        titleEn: 'Unobtrusive Respiratory Rate Assessment',
        descKu: 'د دەمێ گرتنا مەچەکێ نەخۆشی ب بیانوویا پێڤانا نەبزی، بەرێخوە بدە بەرزبوون و نزمبوونا سنگێ نەخۆشی داکو هەناسەیا خوە نەگۆڕیت.',
        descEn: 'Maintain grip on radial artery while discreetly observing thoracic excursion to prevent voluntary breathing alterations.',
        clinicalTipKu: 'رێژەیا هەناسەدانا نورمال د کەسێ مەزن دا ١٢ بۆ ٢٠ جارانە د هەر دەقەکێ دا.',
        clinicalTipEn: 'Adult resting eupnea is strictly 12 to 20 respirations per minute.'
      }
    ]
  },
  {
    id: 'injection_techniques',
    titleKu: 'رێکێن لێدانا دەرزیان و بەستنا کانیۆلایێ (Injections & IV)',
    titleEn: 'Injections & Peripheral IV Cannulation',
    categoryKu: 'کارامەییا دەرمانبەخشینێ',
    categoryEn: 'Pharmacotherapy & Infusion',
    durationMinutes: 60,
    levelKu: 'پێشکەفتی',
    levelEn: 'Intermediate to Advanced',
    overviewKu: 'شارەزابوون د لێدانا دەرزیێن ژێر پێست (Subcutaneous 45°/90°)، ناڤ ماسوولکە (IM Z-track 90° ل Ventrogluteal)، ناڤ پێست (Intradermal 15°)، و بەستنا کانیۆلا IV بێ ئێش.',
    overviewEn: 'Master intramuscular Z-track technique targeting ventrogluteal safety landmarks, subcutaneous injections (insulin/heparin), intradermal PPD testing, and aseptic peripheral vein cannulation.',
    videoTitle: 'Aseptic Ventrogluteal Z-Track Injection Guide 2026',
    videoDuration: '3:00 Min HD',
    badge: 'Injection Specialist',
    relatedOrganId: 'skin',
    steps: [
      {
        stepNumber: 1,
        titleKu: 'دەستنیشانکرنا جهێ ماسوولکەیا Ventrogluteal',
        titleEn: 'Ventrogluteal Anatomical Landmark Location',
        descKu: 'لەپێ دەستی دانێ ل سەر سەرێ رانی، تلییا دووێ بەرەڤ حەوزێ پێشڤە، تلییا سێیێ بەرەڤ حەوزێ پاشڤە؛ ناڤەڕاستا "V" یێ جهێ دروستە.',
        descEn: 'Place palm on greater trochanter, index finger on anterior superior iliac spine, middle finger along iliac crest. Center of triangle is the target.',
        clinicalTipKu: 'ئەڤ جهە زۆر ئێمنە چونکی دویرە ژ دەمارێ سیاتیک و خوینبەرێن مەزن.',
        clinicalTipEn: 'The ventrogluteal site prevents inadvertent sciatic nerve injection.'
      },
      {
        stepNumber: 2,
        titleKu: 'لێدانا دەرزیێ ب رێکا Z-Track ٩٠ پلە',
        titleEn: 'Executing Z-Track Intramuscular Injection',
        descKu: 'پێستی ب تەنیشتێ رابکێشە، دەرزیێ ب گۆشەیا ٩٠ پلە لێبدە، ب هێدی دەرمانی پاڵپێڤە بدە (١٠ چرکه بۆ هەر ١ مل)، دەرزیێ دەربینە و پێستی بەردە.',
        descEn: 'Displace skin laterally 2.5 cm, insert needle firmly at 90 degrees, inject slowly at 10 seconds per mL, withdraw, release skin.',
        clinicalTipKu: 'رێکا Z-track ناهێلیت دەرمان بزڤڕیتە ناڤ تەخا ژێرپێستی و ببیتە ئەگەرێ برینداربوون یان سۆربوونێ.',
        clinicalTipEn: 'Z-track seals medication inside deep muscle layer preventing painful tracking into subcutaneous tissue.'
      },
      {
        stepNumber: 3,
        titleKu: 'لێدانا دەرزیێن ئەنسۆلین و کلێکسان (Subcutaneous)',
        titleEn: 'Subcutaneous Insulin & Enoxaparin Technique',
        descKu: 'پێستێ زکی بگریت (لانیکەم ٥ سم دویر ژ نافکێ)، دەرزیێ ب گۆشەیا ٤٥ یان ٩٠ پلە لێبدە. هەرگیز پشتی دەرزیێ شوونا وێ مەگۆشە و مەساج نەکە!',
        descEn: 'Pinch subcutaneous skin fold on abdomen at least 2 inches away from umbilicus. Never massage injection site after heparin or enoxaparin.',
        clinicalTipKu: 'مەساجکرنا جهێ دەرزییا کلێکسان دەستبەجێ خوێنبەربوون و شینبوونا زکی چێدکەت.',
        clinicalTipEn: 'Massaging enoxaparin sites damages fragile capillaries causing extensive bruising.'
      }
    ]
  },
  {
    id: 'cpr_resuscitation',
    titleKu: 'بووژاندنەوەیا دڵ و هەناسێ (BLS CPR & AED)',
    titleEn: 'Basic Life Support & Cardiopulmonary Resuscitation',
    categoryKu: 'فریاکەوتنا لەزگین',
    categoryEn: 'Emergency Resuscitation',
    durationMinutes: 50,
    levelKu: 'پێشکەفتی / ستاندارد',
    levelEn: 'Critical Life-Saving Protocol',
    overviewKu: 'پرۆتۆکۆلێ رزگارکرنا کەسێ وەستیایێ دلی: پشکنینا خێراییا نەبزێ ل خوینبەرێ ملێ، گوشینا سنگی ٣٠:٢ ب خێراییا ١٠٠-١٢٠ د دەقەکێ دا، و بکارئینانا دەستبەجێ یا ئامێرێ کارەبالێدانێ AED ب ستانداردێ AHA ٢٠٢٦.',
    overviewEn: 'Master AHA 2026 Adult Basic Life Support: immediate recognition of arrest, chest compressions at 100-120 bpm at 5-6 cm depth, 30:2 ratio, and rapid AED defibrillation.',
    videoTitle: 'Adult BLS CPR High-Quality Compressions & AED Protocol',
    videoDuration: '3:15 Min HD',
    badge: 'BLS Certified',
    relatedOrganId: 'heart',
    steps: [
      {
        stepNumber: 1,
        titleKu: 'پشکنینا ئێمناهییا جهی و گازیکرنا هاریکاریێ',
        titleEn: 'Scene Safety Assessment & Code Activation',
        descKu: 'دڵنیابە جهـ ئێمنە. دەست ل سەر ملێن نەخۆشی بدە و بێژێ: "تو باشی؟". هاوار بکە بۆ هاریکاریێ و فەرمانێ بدە ئامێرێ AED و تیمی بانگ کەن.',
        descEn: 'Verify scene safety. Tap patient shoulders firmly and shout: "Are you okay?". Call for Code Blue and demand an AED immediately.',
        clinicalTipKu: 'ئەگەر دوو کەس بن، ئێک دەست ب گوشینێ دکەت و یێ دووێ ب لەز دچیت ئامێرێ AED دئینیت.',
        clinicalTipEn: 'Minimize hands-off time to strictly under 10 seconds during the resuscitation sequence.'
      },
      {
        stepNumber: 2,
        titleKu: 'پشکنینا نەبزێ ل خوینبەرێ ملێ (Carotid Pulse)',
        titleEn: 'Carotid Pulse & Breathing Evaluation (< 10 Seconds)',
        descKu: 'دوو قامکان دانێ ل سەر خوینبەرێ ملێ و بەرێخوە بدە سنگی بۆ ماوەیا ٥ هەتا زۆرترین ١٠ چرکان. ئەگەر نەبز نەبوو یان نەخۆش دخنکا، راستەوخۆ دەست ب CPR بکە!',
        descEn: 'Palpate carotid artery while scanning chest for absence of normal breathing. Do not spend more than 10 seconds looking for pulse.',
        clinicalTipKu: 'هەناسەیا پرتوکاو (Agonal gasps) هەناسەدان نینە و نیشانا وەستانا دلی یە!',
        clinicalTipEn: 'Agonal gasping is a sign of cardiac arrest requiring instant compressions.'
      },
      {
        stepNumber: 3,
        titleKu: 'دەستپێکرنا گوشینا سنگی ب رێژەیا ٣٠:٢',
        titleEn: 'Delivering High-Quality 30:2 Compressions',
        descKu: 'لەپێ دەستی دانێ نیڤا خوارێ یا ئێسکا سنگی، دەستێ دووێ ل سەر جفت بکە، ئانیشکێن خوە راست بکە، ب کویراتیا ٥ تا ٦ سم پاڵپێڤە بدە ب خێراییا ١٠٠ بۆ ١٢٠ لێدان د دەقەەکێ دا.',
        descEn: 'Position heel of hand on lower sternum, interlock fingers, lock elbows, compress 5 to 6 cm at rate of 100-120 per minute allowing full chest recoil.',
        clinicalTipKu: 'خێراییا ١٠٠-١٢٠ لێدان زۆرترین خوێنێ دگەهینیتە مێشک و دلی بێی شکاندنا ئێسکی.',
        clinicalTipEn: 'Compressing at 100-120 bpm maintains critical coronary perfusion pressure.'
      }
    ]
  },
  {
    id: 'wound_care',
    titleKu: 'چاڤدێریا برینان و پێچان ب ستێرایل (ANTT)',
    titleEn: 'Aseptic Wound Care & Dressing Management',
    categoryKu: 'پەرستاریا نەشتەرگەریێ',
    categoryEn: 'Tissue Viability & Wound Care',
    durationMinutes: 40,
    levelKu: 'ناڤین / پێشکەفتی',
    levelEn: 'Core Clinical Practice',
    overviewKu: 'پرۆتۆکۆلێ پاقژکرنا برینێن نەشتەرگەریێ ب شێوازێ ستێرایل (ANTT)، بکارئینانا سەلاینا پاقژ، هەلسەنگاندنا قەبارێ برینێ و قۆناغێن برینێن جهی (Stages 1-4).',
    overviewEn: 'Standardized Aseptic Non-Touch Technique (ANTT), surgical wound cleansing with sterile 0.9% Normal Saline, exudate profiling, and pressure injury staging.',
    videoTitle: 'Clinical ANTT Wound Cleansing & Sterile Dressing Protocol',
    videoDuration: '3:00 Min HD',
    badge: 'Wound Care Certified',
    relatedOrganId: 'skin',
    steps: [
      {
        stepNumber: 1,
        titleKu: 'رێکارێن خاوێنکرن و دانانا سینییا ستێرایل (ANTT)',
        titleEn: 'Aseptic Non-Touch Technique (ANTT) Setup',
        descKu: 'دەستێن خوە ب مەرجێن WHO بشۆ، پێشگرک و دەستکێشان بکاربینە. سینییا ستێرایل ڤەکە بێی کو دەست ل بەشێن ناڤخۆیی بدەی.',
        descEn: 'Perform WHO hand hygiene, don clean apron and gloves. Open sterile field touching only outer borders.',
        clinicalTipKu: 'بەشێ ١ ئینج (٢.٥ سم) ل دەوری پەڕۆیا ستێرایل ب نەپاقژ دهێتە هژمارتن و نابیت کەرەستە ل سەر بهێنە دانان.',
        clinicalTipEn: 'The 1-inch border of a sterile drape is non-sterile.'
      },
      {
        stepNumber: 2,
        titleKu: 'پاقژکرنا برینێ ب سەلاینێ ژ ناڤەڕاستێ بەرەڤ دەرڤە',
        titleEn: 'Sterile Normal Saline Irrigation & Swabbing',
        descKu: 'برینێ ب ئاڤا سەلاینێ ٠.٩٪ بشۆ. ب لۆکا ستێرایل ب شێوازێ بازنەیی ژ ناڤەڕاستێ بەرەڤ دەرڤە پاقژ بکە و بۆ هەر جارەکێ لۆکەکا نوی بکاربینە.',
        descEn: 'Cleanse wound gently with sterile saline using concentric circular motions starting from the cleanest center moving toward the periphery.',
        clinicalTipKu: 'هەرگیز لۆکا بکارئینای مەزڤڕینەڤە ناڤ دڵی برینێ دا میکرۆب نەچنە ناڤدا.',
        clinicalTipEn: 'Clean from least contaminated to most contaminated zone using fresh swabs for each pass.'
      },
      {
        stepNumber: 3,
        titleKu: 'هەلسەنگاندنا نیشانێن هەوکرنا برینێ (REEDA)',
        titleEn: 'Wound Infection Evaluation (REEDA Framework)',
        descKu: 'هەمی رۆژان بەرێخوە بدە برینێ بۆ: سۆربوون (Redness)، ئاوسان (Edema)، شینبوون (Ecchymosis)، دەردراو و کێم (Discharge)، و داخستنا لێواران (Approximation).',
        descEn: 'Inspect incision daily for Redness, Edema, Ecchymosis, Discharge, and Approximation of wound borders.',
        clinicalTipKu: 'دەرکەفتنا کێما زەرد یان بێهنەکا خراب نیشانا پێدڤیبوونا ئەنتی بایۆتیکێ یە دەستبەجێ.',
        clinicalTipEn: 'Purulent drainage or foul odor signals immediate physician notification for culture sampling.'
      }
    ]
  }
];
