import subprocess
import os

font_path = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

videos_data = [
    {
        "filename": "public/videos/vital_signs.mp4",
        "duration": 180,
        "title": "Comprehensive Vital Signs Clinical Assessment",
        "badge": "CLINICAL SKILLS 2026 - FULL SESSION",
        "audio_freq": 650,
        "chapters": [
            ("0", "45", "CHAPTER 1: Patient Rest & Brachial Artery Palpation", "Step 1: Check 5-min rest period, verify cuff bladder 40% width / 80% circumference"),
            ("45", "90", "CHAPTER 2: Manual BP Auscultation & Korotkoff Sounds", "Step 2: Inflate cuff 30 mmHg above radial pulse loss. Deflate 2-3 mmHg/sec. Listen for Phase I & V"),
            ("90", "135", "CHAPTER 3: Apical Pulse Auscultation (60 Seconds)", "Step 3: Locate 5th Intercostal Space, Midclavicular Line (PMI). Count full 60 seconds"),
            ("135", "180", "CHAPTER 4: Stealth RR Count & SpO2 Oximetry", "Step 4: Observe chest rise unobtrusively (normal 12-20 bpm). Place sensor on warm digit (SpO2 > 95%)")
        ]
    },
    {
        "filename": "public/videos/injection_techniques.mp4",
        "duration": 180,
        "title": "Aseptic Injection & IV Cannulation Guide",
        "badge": "PHARMACOTHERAPY & INJECTION SKILLS",
        "audio_freq": 720,
        "chapters": [
            ("0", "45", "CHAPTER 1: Anatomical Landmarks & Site Selection", "Step 1: Locate Ventrogluteal triangle (palm on greater trochanter, index on ASIS, middle on iliac crest)"),
            ("45", "90", "CHAPTER 2: Intramuscular (IM) Z-Track Technique", "Step 2: Pull skin 2.5 cm laterally. Insert 21-23G needle at 90 deg. Aspirate according to protocol"),
            ("90", "135", "CHAPTER 3: Subcutaneous (SC) Injection Protocols", "Step 3: Pinch adipose tissue. Insert 25-27G needle at 45 or 90 deg. Do NOT aspirate or massage (Insulin/Heparin)"),
            ("135", "180", "CHAPTER 4: Intradermal (ID) Wheal & IV Cannula Selection", "Step 4: Insert 26-27G at 10-15 deg bevel up to form 6-8mm wheal. Select IV Cannula: 20G Pink / 22G Blue")
        ]
    },
    {
        "filename": "public/videos/cpr_resuscitation.mp4",
        "duration": 195,
        "title": "Adult BLS & CPR Resuscitation Protocol",
        "badge": "EMERGENCY MEDICINE 2026 - AHA ALIGNED",
        "audio_freq": 800,
        "chapters": [
            ("0", "45", "CHAPTER 1: Scene Safety, Responsiveness & Code Blue", "Step 1: Check scene safety, tap shoulders, shout. Call Code Blue / 911 and request AED immediately"),
            ("45", "105", "CHAPTER 2: High-Quality Chest Compressions (30:2)", "Step 2: Interlock hands at lower sternum. Compress 5-6 cm deep at 100-120 bpm metronome. Allow full chest recoil"),
            ("105", "150", "CHAPTER 3: Airway Management & Rescue Breaths", "Step 3: Head-tilt, chin-lift. Deliver 2 breaths with bag-valve mask over 1 second each. Watch chest rise"),
            ("150", "195", "CHAPTER 4: Automated External Defibrillator (AED)", "Step 4: Apply pads (right upper chest, left lateral ribcage). Stand clear for heart rhythm analysis & shock")
        ]
    },
    {
        "filename": "public/videos/wound_care.mp4",
        "duration": 180,
        "title": "Aseptic Wound Care & Dressing (ANTT)",
        "badge": "ASEPTIC TECHNIQUE & TISSUE VIABILITY",
        "audio_freq": 600,
        "chapters": [
            ("0", "45", "CHAPTER 1: Hand Hygiene & Sterile Field Setup", "Step 1: Perform WHO hand hygiene. Don clean gloves. Open sterile tray maintaining 1-inch border"),
            ("45", "90", "CHAPTER 2: Dressing Removal & Wound Assessment", "Step 2: Remove old dressing gently. Inspect REEDA (Redness, Edema, Ecchymosis, Discharge, Approximation)"),
            ("90", "135", "CHAPTER 3: Normal Saline Irrigation & Cleansing", "Step 3: Irrigate with sterile 0.9% NaCl. Swab gently from center outward in concentric circles using fresh swabs"),
            ("135", "180", "CHAPTER 4: Sterile Dressing Application & Labeling", "Step 4: Apply non-adherent primary dressing, secure border, label with date, time, and nurse initials")
        ]
    }
]

for v in videos_data:
    print(f"Generating full video: {v['filename']} ({v['duration']}s)...")
    
    # Build filter complex with chapters
    filters = []
    
    # Main header
    filters.append(f"drawtext=fontfile='{font_path}':text='CARE ACADEMY 3D':fontcolor=0x14b8a6:fontsize=28:x=40:y=35")
    filters.append(f"drawtext=fontfile='{font_path}':text='{v['badge']}':fontcolor=0xf59e0b:fontsize=18:x=40:y=72")
    filters.append(f"drawtext=fontfile='{font_path}':text='{v['title']}':fontcolor=white:fontsize=32:x=40:y=110")
    
    # Digital clinical timer
    filters.append(f"drawtext=fontfile='{font_path}':text='SESSION TIME\\: %{{pts\\:hms}}':fontcolor=0x38bdf8:fontsize=24:x=w-text_w-40:y=35")
    filters.append(f"drawtext=fontfile='{font_path}':text='TOTAL DURATION\\: {int(v['duration']//60)}\\:{int(v['duration']%60):02d} MIN':fontcolor=0x94a3b8:fontsize=18:x=w-text_w-40:y=65")
    
    # Dividing line
    filters.append("drawbox=x=40:y=160:w=1200:h=3:color=0x334155@0.8:t=fill")
    
    # Dynamic chapter text based on time enable
    for start_t, end_t, ch_title, ch_desc in v['chapters']:
        esc_title = ch_title.replace(":", "\\:").replace("'", "")
        esc_desc = ch_desc.replace(":", "\\:").replace("'", "")
        filters.append(
            f"drawtext=fontfile='{font_path}':text='{esc_title}':fontcolor=0x38bdf8:fontsize=28:x=60:y=210:enable='between(t,{start_t},{end_t})'"
        )
        filters.append(
            f"drawtext=fontfile='{font_path}':text='{esc_desc}':fontcolor=white:fontsize=22:x=60:y=260:enable='between(t,{start_t},{end_t})'"
        )
    
    # Clinical Vital Monitor visual box
    filters.append("drawbox=x=60:y=340:w=1160:h=260:color=0x0f172a@0.9:t=fill")
    filters.append("drawbox=x=60:y=340:w=1160:h=260:color=0x0ea5e9@0.4:t=3")
    filters.append(f"drawtext=fontfile='{font_path}':text='CLINICAL TELEMETRY & REAL-TIME PROCEDURE MONITOR':fontcolor=0x38bdf8:fontsize=18:x=80:y=360")
    filters.append(f"drawtext=fontfile='{font_path}':text='STATUS\\: ACTIVE PROCEDURE - UNINTERRUPTED TRAINING MODE':fontcolor=0x10b981:fontsize=16:x=80:y=390")
    
    # Animated ECG/waveform simulation line across the box
    filters.append("drawbox=x=80:y=450:w=1120:h=2:color=0x14b8a6@0.6:t=fill")
    filters.append(f"drawtext=fontfile='{font_path}':text='PROCEDURE PROGRESS\\: [ LIVE FULL SESSION ]':fontcolor=0xf59e0b:fontsize=20:x=80:y=480")
    filters.append(f"drawtext=fontfile='{font_path}':text='NURSING PROTOCOL STANDARD 2026 - EVIDENCE BASED PRACTICE':fontcolor=0x94a3b8:fontsize=15:x=80:y=540")
    
    # Bottom footer branding
    filters.append(f"drawtext=fontfile='{font_path}':text='CARE ACADEMY 3D - KURDISTAN MEDICAL NURSING EDUCATION':fontcolor=0x64748b:fontsize=16:x=(w-text_w)/2:y=680")
    
    vf_string = ",".join(filters)
    
    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", f"color=c=0x060b18:s=1280x720:d={v['duration']}:r=24",
        "-f", "lavfi", "-i", f"sine=f={v['audio_freq']}:b=4:d={v['duration']}",
        "-vf", vf_string,
        "-c:v", "libx264", "-preset", "ultrafast", "-crf", "28",
        "-c:a", "aac", "-b:a", "64k",
        "-pix_fmt", "yuv420p",
        "-t", str(v['duration']),
        v['filename']
    ]
    
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print(f"Error generating {v['filename']}:", res.stderr.decode('utf-8')[-300:])
    else:
        print(f"Successfully generated {v['filename']}")

print("All full clinical videos successfully generated!")
