import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  AlertCircle,
  RefreshCw,
  FastForward,
  CheckCircle,
  Film,
  MonitorPlay,
  Stethoscope,
  Activity,
  Layers,
  ChevronRight,
  ChevronLeft,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Radio
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CustomVideoPlayerProps {
  moduleId: string;
  videoTitle: string;
  videoDuration: string;
}

interface ClinicalProcedureConfig {
  titleEn: string;
  titleKu: string;
  youtubeId: string;
  durationString: string;
  poster: string;
  chapters: {
    timeSec: number;
    titleEn: string;
    titleKu: string;
    descriptionEn: string;
    descriptionKu: string;
    equipmentEn: string[];
    equipmentKu: string[];
    criticalPearlEn: string;
    criticalPearlKu: string;
  }[];
}

const CLINICAL_PROCEDURES: Record<string, ClinicalProcedureConfig> = {
  vital_signs: {
    titleEn: 'Comprehensive Vital Signs & Auscultation Masterclass',
    titleKu: 'راهێنانا تەمام یا پێڤانا نیشانێن ژیانی و گوهداریکرنا دلی',
    youtubeId: 'V9n_mFqfN3Y', // Full Clinical Vital Signs & Manual BP
    durationString: '18:45 Min HD',
    poster: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        timeSec: 0,
        titleEn: 'Patient Rest, Posture & Artery Palpation',
        titleKu: '١. ئامادەکرنا نەخۆشی و دەستنیشانکرنا خوینبەرێ بازوویی',
        descriptionEn: 'Allow patient 5 minutes of seated rest with feet flat on the floor uncrossed. Palpate the brachial artery medial to biceps tendon.',
        descriptionKu: 'نەخۆش پێدڤیە ٥ خولەکان روونشتێ بیت بێی پییان ل سەر ئێک دانێت. خوینبەرێ بازوویی (Brachial) ب دوو تلکان دیار بکە.',
        equipmentEn: ['Aneroid Sphygmomanometer', 'Properly fitted Adult Cuff (40% width, 80% length)', 'Alcohol swabs'],
        equipmentKu: ['ئامێرێ پەستانپێڤێ', 'کەفێ گونجایی بۆ کەسێ مەزن', 'پەمبیێ کهولێ'],
        criticalPearlEn: 'Crossing legs artificially raises systolic pressure by 5-8 mmHg due to increased venous return.',
        criticalPearlKu: 'دانانا پێیان ل سەر ئێک پەستانا خوێنێ ب ٥ بۆ ٨ ملم جیوە بلند دکەت ب شاشی.'
      },
      {
        timeSec: 180,
        titleEn: 'Cuff Inflation & Korotkoff Sounds Auscultation',
        titleKu: '٢. پفکرنا کەفی و گوهداریکرنا دەنگێن کۆرۆتکۆڤ (Korotkoff)',
        descriptionEn: 'Estimate systolic by obliteration of radial pulse + 30 mmHg. Deflate cuff at 2-3 mmHg per second. Phase I marks Systolic; Phase V (silence) marks Diastolic.',
        descriptionKu: 'کەفی پف بکە تا ٣٠ ملم جیوە ل سەر بەرزەبوونا نەبزێ. هەوای ب رێژەیا ٢-٣ ملم د هەر چرکەیەکێ دا بەردە. دەنگێ ئێکێ پەستانا بلنده، و نەمامانا دەنگی پەستانا نزمه.',
        equipmentEn: ['Acoustic Stethoscope (Diaphragm & Bell)', 'Measurement Record Sheet'],
        equipmentKu: ['سەماعەیا نۆشداری (Stethoscope)', 'کاغەزا تۆمارکرنا داتایان'],
        criticalPearlEn: 'Deflating cuff too quickly causes false low systolic and false high diastolic readings.',
        criticalPearlKu: 'بەردانا لەزگین یا هەوای دەنگان بەرزە دکەت و نمرەیان ب شاشی ددەت.'
      },
      {
        timeSec: 360,
        titleEn: 'Apical Pulse Full 60-Second Auscultation',
        titleKu: '٣. لێدانا لوتکەیا دلی (Apical Pulse) بۆ ٦٠ چرکەیێن تەمام',
        descriptionEn: 'Locate 5th intercostal space at left midclavicular line (PMI). Listen to S1 (Lub) and S2 (Dub) for one full minute.',
        descriptionKu: 'دەفێ سەماعێ دانێ ل سەر پێراسویا ٥ێ و هێلا ناڤەندا چەڵەمەیێ چەپێ و بۆ ٦٠ چرکەیێن تەواو لێدانان بژمێرە.',
        equipmentEn: ['Stethoscope', 'Watch with second hand or digital timer'],
        equipmentKu: ['سەماعەیا نۆشداری', 'دەمژمێرا چرکەدار'],
        criticalPearlEn: 'Required before administering cardiac medications such as Digoxin or Beta-Blockers (hold if HR < 60).',
        criticalPearlKu: 'فەرزە بەری دانا دەرمانێ دیجۆکسین بهێتە پێڤان؛ ئەگەر کێمتر ژ ٦٠ بیت دەرمانی مەدە.'
      },
      {
        timeSec: 540,
        titleEn: 'Stealth Respiration & Pulse Oximetry (SpO2)',
        titleKu: '٤. ژمارتنا هەناسێ ب دزیڤە و پێڤانا ئۆکسجینێ',
        descriptionEn: 'Count respirations immediately after radial pulse while pretending to continue pulse check. Place pulse oximeter on warm, unpolished finger.',
        descriptionKu: 'دەستێ خوە ژ سەر نەبزێ لادە لێ هۆسا نیشان بدە کو هێشتا نەبزێ دپێڤی تا نەخۆش هەناسەدانا خوە نەگوهۆڕیت. ئۆکسیمیترێ بدە تلا پاقژ.',
        equipmentEn: ['Pulse Oximeter Probe', 'Wristwatch'],
        equipmentKu: ['ئامێرێ پێڤانا ئۆکسجینێ SpO2', 'دەمژمێر'],
        criticalPearlEn: 'Patients alter their breathing rate consciously if they know you are counting their respirations.',
        criticalPearlKu: 'ئەگەر نەخۆش بزانیت تو هەناسێن وی دژمێری، ب هۆشیاری ریتما هەناسەدانا خوە دگوهۆڕیت.'
      }
    ]
  },

  injection_techniques: {
    titleEn: 'Sterile Injection Techniques & Z-Track Masterclass',
    titleKu: 'راهێنانا تەمام یا لێدانا دەرزیان ب رێکا Z-Track و ستانداردێن ستێرایل',
    youtubeId: 'bHh3_j4R9Zc', // Full IM Injection & Z-Track
    durationString: '14:20 Min HD',
    poster: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        timeSec: 0,
        titleEn: 'Ventrogluteal & Deltoid Anatomical Landmarks',
        titleKu: '١. دیارکرنا جهێن ئەندامی (Ventrogluteal و Deltoid)',
        descriptionEn: 'Locate Greater Trochanter with palm, index finger on Anterior Superior Iliac Spine (ASIS), spread middle finger along iliac crest. Inject in V-triangle.',
        descriptionKu: 'کەفا دەستی دانێ سەر سەری هەستیێ حەوزێ، تلا شادێ دانێ سەر ASIS و تلا ناڤین ڤەکە بۆ دروستکرنا پیتا V.',
        equipmentEn: ['21-23G 1.5-inch safety needle', '3mL syringe', '70% Isopropyl alcohol swab'],
        equipmentKu: ['دەرزییا قەبارە ٢١-٢٣ درێژیا ١.٥ ئینج', 'سڕنجا ٣ مل', 'پەمبیێ کهولێ ٧٠٪'],
        criticalPearlEn: 'Ventrogluteal is the safest site: free of major nerves and large blood vessels with thick muscle mass.',
        criticalPearlKu: 'جهێ Ventrogluteal ئێمنترین جهە: چ دەمار و خوینبەرێن مەزن تێدا نینن و ماسوولکێ وێ قایمە.'
      },
      {
        timeSec: 180,
        titleEn: 'The Z-Track Technique Execution',
        titleKu: '٢. بجهئینانا تەکنیکا Z-Track ب گۆشەیا ٩٠ پلە',
        descriptionEn: 'Displace skin laterally 2.5-3.5 cm with non-dominant hand. Insert needle quickly at 90° angle into deep muscle.',
        descriptionKu: 'پێستێ نەخۆشی ب دەستێ چەپێ ب قەبارێ ٢.٥ تا ٣.٥ سم رابکێشە. دەرزیێ ب گۆشەیا ٩٠ پلە داخیل بکە.',
        equipmentEn: ['Loaded medication syringe', 'Sterile 2x2 gauze pad'],
        equipmentKu: ['سڕنجا پڕکری ژ دەرمانی', 'گۆزی ستێرایل'],
        criticalPearlEn: 'Z-Track prevents medication leakage into subcutaneous tissue, reducing severe irritation and skin staining.',
        criticalPearlKu: 'تەکنیکا Z-Track رێگریێ ل زڤڕینا دەرمانی بۆ بن پێستی دکەت و ژانێ کێم دکەت.'
      },
      {
        timeSec: 360,
        titleEn: 'Controlled Injection Rate & Needle Withdrawal',
        titleKu: '٣. هاڤێتنا هێدی یا دەرمانی و کێشانا دەرزیێ',
        descriptionEn: 'Inject medication slowly at 10 seconds per mL. Wait 10 seconds before smooth withdrawal, then release displaced skin to seal channel.',
        descriptionKu: 'دەرمانی ب هێواشی بڕێژە (١٠ چرکە بۆ هەر یەک مل). ١٠ چرکەیان بوەستە پاشان دەستێ خوە بەردە تا رێکا دەرمانی بگرێت.',
        equipmentEn: ['Sharps disposal container (OSHA approved)', 'Sterile adhesive bandage'],
        equipmentKu: ['قوتیا تایبەت یا دەرزیا (Safety Box)', 'لەزگێ برینێ'],
        criticalPearlEn: 'Never massage the site after Z-Track injection to avoid forcing medication into subcutaneous tissue.',
        criticalPearlKu: 'چ جاران پشتی لێدانا Z-Track جهێ دەرزیێ مەشێلە تا دەرمان نەچیتە بن پێستی.'
      },
      {
        timeSec: 540,
        titleEn: 'Subcutaneous Insulin/Heparin & Intradermal Wheal',
        titleKu: '٤. لێدانا ژێر پێستی (ئەنسۆلین) و ناو پێستی (تێست)',
        descriptionEn: 'Pinch 2-inch skin fold for SC at 90° or 1-inch fold at 45°. For intradermal (PPD), inject bevel-up at 10-15° until 6-10 mm wheal forms.',
        descriptionKu: 'بۆ ئەنسۆلینێ پێستی بگرە و ب ٤٥ یان ٩٠ پلە لێدە. بۆ تێستی (ID) ب گۆشەیا ١٠-١٥ پلە تا دندکەکا سپی دروست دبیت.',
        equipmentEn: ['Insulin syringe with 29-31G needle', 'TB syringe 27G 0.5-inch'],
        equipmentKu: ['سڕنجا ئەنسۆلینێ ٢٩-٣١G', 'سڕنجا توبرکۆلینێ ٢٧G'],
        criticalPearlEn: 'Do NOT aspirate for subcutaneous heparin or insulin injections.',
        criticalPearlKu: 'د دەمێ لێدانا ئەنسۆلین و هیپارینێ دا پشکنینا خوینێ (Aspiration) مەکە.'
      }
    ]
  },

  cpr_resuscitation: {
    titleEn: 'Adult & Child BLS Resuscitation & AED Masterclass (AHA 2026)',
    titleKu: 'راهێنانا بووژاندنەوەیا دلی و سیهان (CPR) و ئامێرێ AED ب ستانداردێ AHA',
    youtubeId: 'cosVEh_a4pY', // AHA Full CPR & AED
    durationString: '16:50 Min HD',
    poster: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        timeSec: 0,
        titleEn: 'Scene Safety, Responsiveness & Pulse Check',
        titleKu: '١. پشتڕاستبوون ژ ئێمناهییا جهی و پشکنینا نەبزێ',
        descriptionEn: 'Check scene safety. Tap shoulders and shout. Check carotid pulse and chest breathing simultaneously for 5-10 seconds.',
        descriptionKu: 'ژ ئێمناهییا جهی پشتڕاست بە. بانگی نەخۆشی بکە. نەبزا Carotid ل ستۆیی و هەناسەدانێ ب هەڤڕا بۆ ٥-١٠ چرکەیان بپشکنە.',
        equipmentEn: ['PPE (Gloves & Face Shield)', 'Emergency Call Alert System'],
        equipmentKu: ['دەستکێش و دەمامک', 'تەلەفۆنا فریاکەوتنێ (١٢٢)'],
        criticalPearlEn: 'Agonal gasps are NOT normal breathing; begin chest compressions immediately if no pulse is felt within 10 seconds.',
        criticalPearlKu: 'هەناسەدانا سەکەراتێ (Agonal gasps) هەناسەدان نینە؛ ئەگەر نەبز نەبوو دەستبەجێ گوشینا سنگی دەستپێبکە.'
      },
      {
        timeSec: 180,
        titleEn: 'High-Quality Chest Compressions (30:2 Ratio)',
        titleKu: '٢. گوشینا سنگی ب کوالێتییا بلند (٣٠ گوشین و ٢ هەناسە)',
        descriptionEn: 'Interlock hands on lower half of sternum. Compress at rate of 100-120 bpm, depth of 2-2.4 inches (5-6 cm). Allow full chest recoil.',
        descriptionKu: 'دەستێن خوە بکە د ناڤ ئێک دا ل سەر نیڤا خوارێ یا سنگی. ب خێراییا ١٠٠-١٢٠ لێدان د خولەکەکێ دا و ب کویراتیا ٥-٦ سم بگۆشە.',
        equipmentEn: ['Firm flat surface (CPR backboard)', 'CPR Metronome (110 bpm)'],
        equipmentKu: ['تەختەکێ رەق ل بن نەخۆشی', 'مێترۆنۆما خێراییێ (١١٠ لێدان)'],
        criticalPearlEn: 'Incomplete chest recoil reduces coronary perfusion and decreases survival significantly.',
        criticalPearlKu: 'رێدان ب زڤڕینا تەمام یا سنگی ژیانێ رزگار دکەت و خوێنێ دگەهینیتە مێشکی.'
      },
      {
        timeSec: 360,
        titleEn: 'Airway Management & Bag-Valve-Mask Ventilations',
        titleKu: '٣. ڤەکرنا رێکا هەوای و هەناسەدانا ب کیسکی (BVM)',
        descriptionEn: 'Perform Head-Tilt Chin-Lift. Apply pocket mask or BVM using E-C clamp technique. Deliver 2 gentle breaths (1 second each) seeing chest rise.',
        descriptionKu: 'سەری بەرەڤ پاش ببە و چەناگەی بلند بکە. ب تەکنیکا E-C ماسکی بگرە و ٢ هەناسێن هێمن د ماوێ ١ چرکەدا بدێ.',
        equipmentEn: ['Bag-Valve-Mask with oxygen reservoir', 'Oropharyngeal Airway (OPA)'],
        equipmentKu: ['کیسکێ هەوای (Ambu Bag)', 'لوولپێچێ هەوای یێ دەڤی'],
        criticalPearlEn: 'Avoid excessive ventilation; hyperventilation increases intrathoracic pressure and impedes venous return to heart.',
        criticalPearlKu: 'زێدەتر ژ پێدڤی پف مەکە د سیهان دا تا پەستان ل سەر دلی زێدە نەبیت.'
      },
      {
        timeSec: 540,
        titleEn: 'Automated External Defibrillator (AED) Operation',
        titleKu: '٤. بکارئینانا ئامێرێ کارەبایا دلی (AED)',
        descriptionEn: 'Power ON AED. Attach pads: Right upper sternum and Left lateral rib cage. Clear patient during rhythm analysis and shock delivery.',
        descriptionKu: 'ئامێرێ AED هەلبکە. لەزگەیان دانێ: ئێک ل سەر سینگی ل دەستێ راستێ و ئێک ل تەنشتا چەپێ. کاتێ شۆکێ بدوورکەوە.',
        equipmentEn: ['Automated External Defibrillator (AED)', 'Pediatric attenuator if child < 8 years'],
        equipmentKu: ['ئامێرێ کارەبایا دلی یێ ئۆتۆماتیک', 'لەزگەیێن تایبەت'],
        criticalPearlEn: 'Resume high-quality compressions IMMEDIATELY after shock delivery without pausing to check pulse.',
        criticalPearlKu: 'دەستبەجێ پشتی کارەبایێ گوشینا سنگی دەستپێبکە بێی راوەستیان بۆ پشکنینا نەبزێ.'
      }
    ]
  },

  wound_care: {
    titleEn: 'Sterile Wound Care & Aseptic Non-Touch Technique (ANTT)',
    titleKu: 'راهێنانا تەمام یا پاکژکرنا برینێ ب شێوازێ ستێرایل و تەکنیکا ANTT',
    youtubeId: 'e8vYk5xX4r8', // ANTT Wound Dressing Change
    durationString: '12:30 Min HD',
    poster: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=1200&q=80',
    chapters: [
      {
        timeSec: 0,
        titleEn: 'Preparation & 5 Moments of Hand Hygiene',
        titleKu: '١. ئامادەکرن و دەستشووشتنا ستاندارد یا نۆشداری',
        descriptionEn: 'Perform WHO 6-step hand hygiene with antiseptic soap for 40-60 seconds or alcohol rub for 20-30 seconds. Disinfect dressing trolley.',
        descriptionKu: 'دەستێن خوە ب رێنمایا WHO بۆ ماوێ ٤٠-٦٠ چرکەیان ب سابینا دژە-بەکتریا بشۆ. مێزا برینپێچانێ پاقژ بکە.',
        equipmentEn: ['Chlorhexidine/alcohol handrub', 'Dressing trolley', 'Surface disinfectant wipes'],
        equipmentKu: ['جێلێ کهولیێ دەستان', 'مێزۆکا دەرمانان', 'پەڕێن پاقژکەر'],
        criticalPearlEn: 'Hand hygiene is the single most effective intervention to prevent healthcare-associated infections (HAIs).',
        criticalPearlKu: 'دەستشووشتن گرنگترین رێکارە بۆ پاراستنا نەخۆشی ژ میکرۆبێن نەخۆشخانێ.'
      },
      {
        timeSec: 180,
        titleEn: 'Removing Soiled Dressing & REEDA Wound Assessment',
        titleKu: '٢. لادانا پێچانا کەڤن و هەلسەنگاندنا برینێ ب REEDA',
        descriptionEn: 'Wear clean gloves to remove old dressing. Inspect wound for Redness, Edema, Ecchymosis, Discharge, and Approximation (REEDA).',
        descriptionKu: 'دەستکێشێن پاقژ لەبەر بکە و پێچانا کەڤن لادە. بەرێخوە بدە سۆربوون، وەرم، رەنگ، کێم و چاکبوونا دەڤێ برینێ.',
        equipmentEn: ['Clean exam gloves', 'Clinical waste bag (Yellow bin)', 'Wound measurement ruler'],
        equipmentKu: ['دەستکێشێن پاقژ', 'زبلدانا زەرد یا تایبەت', 'مسەتەرا پێڤانا برینێ'],
        criticalPearlEn: 'Never touch inside of soiled dressing; fold inward and discard immediately in designated biohazard bin.',
        criticalPearlKu: 'دەست ل کێما پێچانا کەڤن مەدە و ئێکسەر ب هاڤێژە ناڤ زبلدانا زەرد دا.'
      },
      {
        timeSec: 360,
        titleEn: 'Sterile Field Setup & Saline Cleansing Technique',
        titleKu: '٣. دانانا دەڤەرا ستێرایل و پاقژکرن ب سەلاینێ ٠.٩٪',
        descriptionEn: 'Don sterile gloves without touching exterior. Open sterile dressing pack. Clean wound from cleanest area (center) to dirtiest (periphery) using 0.9% Normal Saline.',
        descriptionKu: 'دەستکێشێن ستێرایل لەبەر بکە بێی دەست بدەی دەورێن وێ. برینێ ژ ناڤەڕاستێ بەرەڤ دەرڤە ب سەلاینێ پاقژ بکە.',
        equipmentEn: ['Sterile gloves', 'Sterile dressing pack (forceps, gauze swabs)', 'Normal Saline 0.9% (warmed)'],
        equipmentKu: ['دەستکێشێن ستێرایل', 'پاکێتا برینپێچانێ یا ستێرایل', 'دەرمانێ سەلاینێ ٠.٩٪'],
        criticalPearlEn: 'Use one gauze swab per stroke and discard immediately. Never cross sterile field with unsterile hands.',
        criticalPearlKu: 'بۆ هەر جڕکەکێ تەنێ ئێک پارچەیا گۆزی بکاربینە و دەستێ نەستێرایل مەبەرە سەر مێزێ.'
      },
      {
        timeSec: 540,
        titleEn: 'Sterile Dressing Application & Date/Time Labeling',
        titleKu: '٤. دانانا پێچانا ستێرایل و نڤیسینا دەم و مێژوویێ',
        descriptionEn: 'Apply primary sterile absorbent pad, secure with breathable adhesive border. Write date, time, and nurse initials on the dressing edge.',
        descriptionKu: 'گۆزێ ستێرایل دانێ سەر برینێ و ب لەزگەکێ باش بیپێچە. مێژوو، دەمژمێر و ناڤێ خوە ل سەر لەزگەی بنڤیسە.',
        equipmentEn: ['Sterile non-adherent dressing', 'Medical adhesive tape / film', 'Permanent marker'],
        equipmentKu: ['گۆزێ تایبەت یێ برینێ', 'لەزگێ نۆشداری', 'پێنووس'],
        criticalPearlEn: 'Documenting date and time prevents unnecessary early dressing changes, preserving granulation tissue.',
        criticalPearlKu: 'نڤیسینا دەمی ناهێلیت پەرستارێن دی پێچانێ ب زووی لابدەن و برینێ بریندار بکەن.'
      }
    ]
  }
};

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  moduleId,
  videoTitle,
  videoDuration
}) => {
  const { lang, t } = useLanguage();
  const config = CLINICAL_PROCEDURES[moduleId] || CLINICAL_PROCEDURES.vital_signs;

  const [playerMode, setPlayerMode] = useState<'stream' | 'simulation'>('stream');
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(false);
  const [simSecondsElapsed, setSimSecondsElapsed] = useState<number>(0);
  const [cprBpmRate, setCprBpmRate] = useState<number>(110);
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);

  const activeChapter = config.chapters[activeChapterIndex] || config.chapters[0];

  // Auto-advance timer in simulation mode when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimPlaying) {
      interval = setInterval(() => {
        setSimSecondsElapsed((prev) => {
          if (prev >= 60) {
            // Advance to next chapter
            setActiveChapterIndex((curr) => {
              if (curr < config.chapters.length - 1) {
                return curr + 1;
              }
              setIsSimPlaying(false);
              return curr;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimPlaying, config.chapters.length]);

  // Audio Metronome for CPR / Korotkoff sounds
  useEffect(() => {
    if (!isMetronomeActive) return;

    let timer: NodeJS.Timeout;
    const intervalMs = (60 / cprBpmRate) * 1000;

    const playBeep = () => {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = moduleId === 'cpr_resuscitation' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(
          moduleId === 'cpr_resuscitation' ? 880 : 180,
          ctx.currentTime
        );

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
      } catch {}
    };

    timer = setInterval(playBeep, intervalMs);
    return () => clearInterval(timer);
  }, [isMetronomeActive, cprBpmRate, moduleId]);

  const toggleMetronome = () => {
    setIsMetronomeActive((prev) => !prev);
  };

  return (
    <div className="w-full relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col">
      {/* Top Header & Mode Switcher */}
      <div className="p-3 sm:p-4 bg-slate-900/95 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <MonitorPlay className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                {lang === 'ku' ? config.titleKu : config.titleEn}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold border border-teal-500/30">
                {config.durationString}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'ku'
                ? 'راهێنانا کلینیکی یا پەرستاری - بێ راوەستان و ب کوالێتییا بەرز'
                : 'Complete Uninterrupted Clinical Procedure & Step-by-Step Training'}
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setPlayerMode('stream')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              playerMode === 'stream'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>{lang === 'ku' ? 'ڤیدیۆیا تەمام (Full HD)' : 'Full Video Stream'}</span>
          </button>
          <button
            onClick={() => setPlayerMode('simulation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              playerMode === 'simulation'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{lang === 'ku' ? 'شیکاریا کلینیکی (Simulation)' : 'Interactive Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Main Player Display Area */}
      {playerMode === 'stream' ? (
        /* MODE 1: Full-Length Clinical Video Stream (Uninterrupted 1080p Stream) */
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${config.youtubeId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`}
            title={config.titleEn}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        /* MODE 2: Interactive 3D Clinical Procedure Simulation & Walkthrough */
        <div className="relative w-full bg-slate-950 flex flex-col p-4 sm:p-6 min-h-[420px]">
          {/* Active Chapter Header Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-950/40 border border-slate-800 space-y-3 mb-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 font-mono text-xs font-black flex items-center justify-center border border-teal-500/30">
                  {activeChapterIndex + 1}/{config.chapters.length}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {lang === 'ku' ? activeChapter.titleKu : activeChapter.titleEn}
                </h3>
              </div>

              {/* Audio Metronome & Sound Assistant Toggle */}
              <button
                onClick={toggleMetronome}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  isMetronomeActive
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
                title={
                  moduleId === 'cpr_resuscitation'
                    ? 'CPR Metronome 110 bpm'
                    : 'Korotkoff Auscultation Sound Guide'
                }
              >
                <Radio className="w-3.5 h-3.5" />
                <span>
                  {isMetronomeActive
                    ? lang === 'ku'
                      ? 'دەنگێ چاڤدێریێ کاردکەت'
                      : 'Clinical Audio Active'
                    : moduleId === 'cpr_resuscitation'
                    ? lang === 'ku'
                      ? 'مێترۆنۆمێ لێدانا دلی (110 BPM)'
                      : 'CPR Metronome (110 BPM)'
                    : lang === 'ku'
                      ? 'دەنگێ لێدانا دلی'
                      : 'Heartbeat Audio Guide'}
                </span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === 'ku' ? activeChapter.descriptionKu : activeChapter.descriptionEn}
            </p>

            {/* Critical Nursing Pearl Alert */}
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-bold mb-0.5">
                  {lang === 'ku' ? 'تێبینیا زێڕین یا پەرستاری (Clinical Pearl):' : 'Critical Nursing Pearl:'}
                </strong>
                <span>
                  {lang === 'ku' ? activeChapter.criticalPearlKu : activeChapter.criticalPearlEn}
                </span>
              </div>
            </div>
          </div>

          {/* Procedural Equipment Checklist for this Step */}
          <div className="mb-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{lang === 'ku' ? 'ئامرازێن پێدڤی بۆ ڤێ گاڤێ (Required Equipment):' : 'Required Clinical Equipment:'}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {(lang === 'ku' ? activeChapter.equipmentKu : activeChapter.equipmentEn).map((eq, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-teal-300 font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-teal-400" />
                  <span>{eq}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Step Controls Bar */}
          <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => setActiveChapterIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeChapterIndex === 0}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-800 flex items-center gap-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'ku' ? 'گاڤا بەرێ' : 'Previous Step'}</span>
            </button>

            <button
              onClick={() => setIsSimPlaying((prev) => !prev)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md hover:brightness-110 active:scale-95 transition flex items-center gap-2"
            >
              {isSimPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>
                {isSimPlaying
                  ? lang === 'ku'
                    ? 'راگرتنا دەمژمێرێ'
                    : 'Pause Walkthrough'
                  : lang === 'ku'
                    ? 'دەستپێکرنا رێبەرێ هێمن'
                    : 'Auto-Advance Simulation'}
              </span>
            </button>

            <button
              onClick={() => setActiveChapterIndex((prev) => Math.min(config.chapters.length - 1, prev + 1))}
              disabled={activeChapterIndex === config.chapters.length - 1}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-800 flex items-center gap-1.5 transition"
            >
              <span>{lang === 'ku' ? 'گاڤا دووڤدا' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Chapters Strip: Quick Navigation through all procedure milestones */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Film className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'ku' ? 'بەشێن کلینیکی یێن یەکەیێ:' : 'Procedural Milestones:'}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {config.chapters.map((ch, idx) => {
            const isSelected = activeChapterIndex === idx;
            return (
              <button
                key={ch.timeSec}
                onClick={() => {
                  setActiveChapterIndex(idx);
                  setSimSecondsElapsed(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition border ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{lang === 'ku' ? ch.titleKu : ch.titleEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
