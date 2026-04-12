 import { useState, useEffect, useRef } from "react";
/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;70
    :root {
      --bg-from:#EEE9FF; --bg-to:#E0EDFF;
      --glass:rgba(255,255,255,0.65); --glass-b:rgba(255,255,255,0.9);
      --border:rgba(255,255,255,0.6); --border-s:rgba(0,0,0,0.07);
      --emerald:#2A7A5A; --emerald-l:#3DAA7F; --emerald-glow:rgba(42,122,90,0.13);
      --mint:#A8EED4; --gold:#C49A3C; --heart:#E06B8B;
      --ink:#1C1C2E; --ink-s:#4A4A6A; --ink-m:#9090B0;
      --card:rgba(255,255,255,0.72); --shadow:0 4px 24px rgba(80,60,180,0.10);
      --shadow-l:0 8px 32px rgba(80,60,180,0.16);
}
.dark {
      --bg-from:#0D0E1C; --bg-to:#121828;
      --glass:rgba(22,26,44,0.80); --glass-b:rgba(28,32,52,0.95);
      --border:rgba(255,255,255,0.08); --border-s:rgba(255,255,255,0.06);
      --emerald:#3DAA7F; --emerald-l:#5BCCA0; --emerald-glow:rgba(61,170,127,0.12);
      --mint:#2A6E55; --gold:#D4AA62; --heart:#F08CA8;
      --ink:#E8E4F8; --ink-s:#A8A4C8; --ink-m:#6A6888;
      --card:rgba(28,32,52,0.82); --shadow:0 4px 24px rgba(0,0,0,0.30);
      --shadow-l:0 8px 32px rgba(0,0,0,0.40);
}
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent
    body{font-family:'Nunito',sans-serif;overflow:hidden;background:var(--bg-from);}
    .app{
      max-width:430px;margin:0 auto;height:100svh;
      background:linear-gradient(160deg,var(--bg-from),var(--bg-to));
      position:relative;display:flex;flex-direction:column;overflow:hidden;
    }
    ::-webkit-scrollbar{width:0;}
    .arabic{font-family:'Amiri',serif;direction:rtl;}
    .serif{font-family:'Playfair Display',serif;}
    /* Glass card */
    .card{
background:var(--card);border-radius:20px;
0&famil
;user-s

   border:1px solid var(--border);box-shadow:var(--shadow);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
}
/* Pill badge */
.pill{display:inline-flex;align-items:center;gap:5px;background:var(--emerald-glow
/* Bottom nav */
.nav-bar{background:var(--glass-b);border-top:1px solid var(--border-s);display:fl
.nav-item{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:poi
.nav-item.active{background:var(--emerald-glow);}
.nav-lbl{font-size:10px;font-weight:700;color:var(--ink-m);}
.nav-item.active .nav-lbl{color:var(--emerald);}
/* Status bar */
.status-bar{
  margin:8px 16px 0;padding:8px 16px;
  background:var(--card);border-radius:99px;
  border:1px solid var(--border);box-shadow:var(--shadow);
  display:flex;justify-content:space-between;align-items:center;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  flex-shrink:0;
}
.stat-chip{display:flex;align-items:center;gap:5px;font-size:12px;font-weight:700;
/* Animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transfor
.fu{animation:fadeUp 0.35s ease both;}
@keyframes flicker{0%,100%{transform:scale(1) rotate(-2deg);}50%{transform:scale(1
.fire{animation:flicker 1.4s ease-in-out infinite;display:inline-block;}
@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{
.toast{position:fixed;bottom:88px;left:50%;transform:translateX(-50%);background:v
/* Heart pop — top-right corner */
@keyframes heartPop{0%{opacity:0;transform:scale(0.5);}20%{opacity:1;transform:sca
.hpop{position:absolute;top:12px;right:16px;font-size:15px;font-weight:800;color:v
@keyframes bump{0%,100%{transform:scale(1);}50%{transform:scale(1.2);}}
.bump{animation:bump 0.18s ease;}
/* Bottom sheet */
@keyframes sheetIn{from{transform:translateY(100%);}to{transform:translateY(0);}}
.sheet-ov{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:200;backdrop-f
.sheet{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-
.sheet-handle{width:40px;height:4px;background:var(--border-s);border-radius:999px
/* Verse slide */
.vslide{position:absolute;inset:0;display:flex;flex-direction:column;align-items:c
.vs-in{transform:translateX(0);opacity:1;}
);color
ex;just
nter;pa
color:v
m:trans
.1) rot
opacity
ar(--em
le(1.2)
ar(--he
ilter:b
width:4
;margin
enter;j

￼    .vs-out-l{transform:translateX(-100%);opacity:0;}
    .vs-out-r{transform:translateX(100%);opacity:0;}
    /* Dot */
    .dot{width:6px;height:6px;border-radius:50%;transition:all 0.25s;cursor:pointer;}
    /* Tab bar */
    .tab-bar{display:flex;background:rgba(0,0,0,0.05);border-radius:12px;padding:3px;g
    .tab{flex:1;padding:7px;border-radius:9px;border:none;cursor:pointer;font-family:'
    .tab.active{background:var(--card);color:var(--emerald);box-shadow:var(--shadow);}
    textarea{font-family:'Nunito',sans-serif;font-size:13px;line-height:1.6;background
    textarea:focus{border-color:var(--emerald);}
    button{font-family:'Nunito',sans-serif;}
    /* Dhikr counter button */
    .dhikr-btn{width:54px;height:54px;border-radius:50%;border:none;cursor:pointer;dis
    /* Category chip */
    .cat-chip{padding:8px 18px;border-radius:99px;border:1.5px solid var(--border-s);b
    .cat-chip.active{background:var(--emerald);color:#fff;border-color:var(--emerald);
    /* Week day */
    .wday{width:36px;height:36px;border-radius:50%;display:flex;flex-direction:column;
    .wday.today{background:var(--emerald);color:#fff;box-shadow:0 4px 14px rgba(42,122
    .wday.done{background:var(--emerald-glow);}
    .wdot{width:5px;height:5px;border-radius:50%;margin-top:2px;}
    /* Gradient goal card */
    .goal-card{border-radius:22px;padding:22px;background:linear-gradient(135deg,#2A7A
    .goal-card::before{content:'';position:absolute;top:-30px;right:-30px;width:100px;
    /* Stat mini card */
    .stat-card{background:var(--card);border-radius:16px;padding:14px;border:1px solid
    /* Reader overlay */
    .reader{position:fixed;inset:0;z-index:200;max-width:430px;margin:0 auto;display:f
  `}</style>
;)
───────────────────────────────────────── */
   DATA
/* ───────────────────────────────────────── constUSER={name:"Youssef",avatar:" "};
const SURAHS = [
  {id:1,name:"Al-Fatiha",arabic:"الفاتحة",verses:7,rev:"Mecquoise"},
￼ap:3px;
Nunito'
:rgba(0
play:fl
ackgrou }
align-i
90,0.3,
5A,#3DA
height:
var(--
lex;fle
￼  {id:2,name:"Al-Baqara",arabic:"البقرة",verses:286,rev:"Médinoise"},
  {id:36,name:"Ya-Sin",arabic:"یس",verses:83,rev:"Mecquoise"},
  {id:55,name:"Ar-Rahman",arabic:"الرحمن",verses:78,rev:"Médinoise"},
  {id:67,name:"Al-Mulk",arabic:"الملك",verses:30,rev:"Mecquoise"},
  {id:112,name:"Al-Ikhlas",arabic:"الإخلاص",verses:4,rev:"Mecquoise"},
  {id:113,name:"Al-Falaq",arabic:"الفلق",verses:5,rev:"Mecquoise"},
  {id:114,name:"An-Nas",arabic:"الناس",verses:6,rev:"Mecquoise"},
;]
const VERSES = [
{id:1,arabic:"ِبِسْمِ ٱل َّلھِ ٱلر َّحْمَٰنِ ٱلر َّحِیم",phonetic:"Bismi llāhi r-raḥmāni r-raḥīm",fr:"A {id:2,arabic:"َٱْلحَْمُد ِل َّلھِ رَب ِّ ٱْلعََٰلمِین",phonetic:"Al-ḥamdu lillāhi rabbi l-ʿālamīn",fr:" {id:3,arabic:"ِٱلر َّحْمَٰنِ ٱلر َّحِیم",phonetic:"Ar-raḥmāni r-raḥīm",fr:"le Tout Miséricordieu {id:4,arabic:"َِٰملِكِ َیوْمِ ٱل ِّدین",phonetic:"Māliki yawmi d-dīn",fr:"Maître du Jour de la {id:5,arabic:"ُإِ َّیاكَ َنعْبُُد وَإِ َّیاكَ َنسْتَعِین",phonetic:"Iyyāka naʿbudu wa-iyyāka nastaʿīn",f {id:6,arabic:"َٱْھدَِنا ٱلص ِّرَٰطَ ٱْلمُسْتَقِیم",phonetic:"Ihdinā ṣ-ṣirāṭa l-mustaqīm",fr:"Guide-
َ
{id:7,arabic:"َصِرَٰطَ ٱ َّلذِینَ أْنعَْمتَ عََلیْھِمْ غَیْرِ ٱْلمَغْضُوبِ عََلیْھِمْ وَلاَ ٱلض َّآ ِّلین",phonetic:"Ṣirāṭa l
;]
const DHIKR_DB = {
  Matin: [
{id:1,arabic:"ِأَصْبَحْنَا وَأَصْبَحَ اْلمُْلكُ ِل َّلھ",phonetic:"Aṣbaḥnā wa aṣbaḥa l-mulku lillāh", {id:2,arabic:"ِسُبْحَاَن ال َّلھِ وَبِحَْمدِه",phonetic:"Subḥāna llāhi wa biḥamdih",fr:"Gloire à {id:3,arabic:"ال َّلُھم َّ بِكَ أَصْبَحْنَا",phonetic:"Allāhumma bika aṣbaḥnā",fr:"Ô Allah, c'es {id:4,arabic:"ِأَعُوذُ بِال َّلھِ مِنَ الش َّیْطَانِ الر َّجِیم",phonetic:"Aʿūḏu billāhi mina š-šayṭāni
,] Soir: [
{id:5,arabic:"ِأَْمسَیْنَا وَأَْمسَى اْلمُْلكُ ِل َّلھ",phonetic:"Amsaynā wa amsa l-mulku lillāh",fr {id:6,arabic:"ال َّلُھم َّ بِكَ أَْمسَیْنَا",phonetic:"Allāhumma bika amsaynā",fr:"Ô Allah, c'es {id:7,arabic:"َحَسْبِيَ ال َّلُھ لاَ إَِلَھ إِلا َّ ُھو",phonetic:"Ḥasbiya llāhu lā ilāha illā hū",fr:
,]  
  Protection: [
{id:8,arabic:"بِسْمِ ال َّلھِ ا َّلذِي لاَ َیضُر ُّ َمعَ اسْمِھِ شَيٌْء",phonetic:"Bismi llāhi llaḏī lā yaḍu {id:9,arabic:"آَیُة اْلكُرْسِي ِّ",phonetic:"Āyatu l-kursī",fr:"Le verset du Trône (Al-Baqa {id:10,arabic:"قُلْ ُھوَ ال َّلُھ أَحٌَد",phonetic:"Qul huwa llāhu aḥad",fr:"Dis : Il est All
,] Sommeil: [
{id:11,arabic:"بِاسْمِكَ ال َّلُھم َّ أَُموتُ وَأَحْیَا",phonetic:"Bismika llāhumma amūtu wa aḥyā",f
{id:12,arabic:"سُبْحَاَن ال َّلھِ — ٣٣x | اْلحَْمُد ِل َّلھِ — ٣٣x | ال َّلُھ أَكْبَرُ — ٣٤x",phonetic:"Sub ,]
Prière: [
{id:13,arabic:"رَب ِّ اغْفِرْ ِلي وَِلوَاِلَدي َّ",phonetic:"Rabbi ghfir lī wa liwālidayya",fr:"Se {id:14,arabic:"رَ َّبنَا آتِنَا فِي ال ُّدْنیَا حَسَنًَة",phonetic:"Rabbanā ātinā fi d-dunyā ḥasana
,] ;}
const AYAH_DU_JOUR = { arabic:"وََمن َیت َّقِ ال َّلَھ َیجْعَل  َّلُھ َمخْرَجًا", fr:"Celui qui craint Allah
u nom d
Louange
x, le T
rétribu
r:"C'es
nous da
laḏīna
fr:"Nou
 Allah
t grâce
r-rajī
:"Nous
t grâce
"Allah
rru maʿ
ra 2:25
ah, l'U
r:"En T
ḥānallā
igneur,
tan",fr
, Il lu
 /* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function Sheet({ onClose, children }) {
return ( <>
      <div className="sheet-ov" onClick={onClose} />
      <div className="sheet"><div className="sheet-handle" />{children}</div>
    </>
); }
function fmtTime(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}
/* ─────────────────────────────────────────
   VERSE READER
───────────────────────────────────────── */
// Échantillons Tafsir Ibn Kathir (sera chargé depuis Supabase en prod)
const TAFSIR_SAMPLES = {
  1: "Ibn Kathir dit : « Bismi llāh » est la clé de tout acte béni. Al-Basmala contien
  2: "Ibn Kathir explique que « Al-hamdu lillāh » est la louange la plus complète et l
  5: "Ce verset est le cœur de la sourate Al-Fatiha et de tout le Coran. Ibn Kathir di
};
function VerseReader({ surah, onClose, onAddH, notes, setNotes, goalSecs, onTimeSpent,
  const [idx, setIdx] = useState(0);
  const [cls, setCls] = useState("vs-in");
  const [readSet, setReadSet] = useState(new Set());
  const [showPop, setShowPop] = useState(false);
  const [hassanatesCount, setHassanatesCount] = useState(0); // local display count
  const [sheet, setSheet] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [phonetic, setPhonetic] = useState(true);
  const [fs, setFs] = useState(28);
  const [elapsed, setElapsed] = useState(0);
  const anim = useRef(false);
  const touchX = useRef(null);
  const timerRef = useRef(null);
  const total = VERSES.length;
  const v = VERSES[idx];
  const remaining = Math.max(0, goalSecs - elapsed);
  const pct = Math.min(1, elapsed / goalSecs);
t les d a plus t:«I
isPrem

 // Auto timer
useEffect(() => {
  timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
  return () => { clearInterval(timerRef.current); };
}, []);
const vibrate = () => { if (navigator.vibrate) navigator.vibrate(40); };
const goTo = (next, dir) => {
  if (anim.current || next < 0 || next >= total) return;
  anim.current = true;
  vibrate();
  setCls(dir === "l" ? "vs-out-l" : "vs-out-r");
  setTimeout(() => {
    setIdx(next);
    setCls(dir === "l" ? "vs-out-r" : "vs-out-l");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setCls("vs-in");
      anim.current = false;
    }));
    if (dir === "l" && !readSet.has(idx)) {
      setReadSet(p => new Set([...p, idx]));
      onAddH(10);
      setHassanatesCount(c => c + 10);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 900);
    }
}, 280); };
// "J'ai fini" → marque le verset et retourne à l'accueil
const markDone = () => {
  if (!readSet.has(idx)) {
    onAddH(10);
    setHassanatesCount(c => c + 10);
  }
  clearInterval(timerRef.current);
  onTimeSpent(elapsed);
  onClose();
};
const onTS = e => { touchX.current = e.touches[0].clientX; };
const onTE = e => {
  if (!touchX.current) return;
  const dx = touchX.current - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 44) dx > 0 ? goTo(idx + 1, "l") : goTo(idx - 1, "r");

   touchX.current = null;
};
useEffect(() => {
  setNoteText(notes[`${surah.id}-${v.id}`] || "");
}, [idx]);
const saveNote = () => { setNotes(p => ({ ...p, [`${surah.id}-${v.id}`]: noteText })
const APP_TAG = "☽ Hassanates — Compagnon spirituel";
const shareText = `${v.arabic}\n\n« ${v.fr} »\n\n— ${surah.name} ${surah.id}:${v.id}
const share = () => {
  if (navigator.share) navigator.share({ title: `${surah.name} — Verset ${v.id}`, te
  else navigator.clipboard?.writeText(shareText);
  setSheet(null);
};
return (
  <div className="reader" onTouchStart={onTS} onTouchEnd={onTE}>
    {/* Header */}
    <div style={{ padding: "48px 18px 12px", display: "flex", alignItems: "center",
      <button onClick={markDone} style={{ background: "none", border: "none", cursor
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--emerald)" }}>{surah
        <p style={{ fontSize: 11, color: "var(--ink-m)" }}>{v.id} / {total}</p>
        {/* Hassanates counter visible during reading */}
        {hassanatesCount > 0 && (
          <div style={{ display:"inline-flex", alignItems:"center", gap:4, backgroun
            <span style={{ fontSize:11, fontWeight:800, color:"var(--heart)" }}>+{ha
</div> )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setPhonetic(!phonetic)} style={{ background: phonetic
        <div style={{ display: "flex", alignItems: "center", gap: 3, background: "rg
          <button onClick={() => setFs(f => Math.max(18, f - 2))} style={{ backgroun
          <span style={{ fontSize: 9, color: "var(--ink-m)", fontWeight: 700 }}>Aa</
          <button onClick={() => setFs(f => Math.min(42, f + 2))} style={{ backgroun
        </div>
      </div>
</div>
    {/* Goal progress bar */}
    <div style={{ margin: "0 18px 10px", flexShrink: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom:
        <span style={{ fontSize: 11, color: "var(--ink-m)", fontWeight: 600 }}>Objec
); setS
\n\n${A
xt: sha
justify
: "poin
.name}<
d:"rgba
ssanate
 ? "var
ba(0,0,
d: "non
span>
d: "non
4 }}> tif ses

     <span style={{ fontSize: 11, color: remaining === 0 ? "var(--gold)" : "var(-
  </div>
  <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 999, height: 5, ov
    <div style={{ width: `${pct * 100}%`, height: "100%", background: pct >= 1 ?
  </div>
</div>
{/* Verse area */}
<div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
  <div className={`vslide ${cls}`}>
    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "var(-
      <span style={{ fontSize: 13, fontWeight: 800, color: "var(--emerald)" }}>{
    </div>
    <p className="arabic" style={{ fontSize: fs, lineHeight: 2.4, textAlign: "ce
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%",
<div style={{ flex: 1, height: 1, background: "var(--border-s)" }} /> <span style={{ color: "var(--gold)", fontSize: 13 }}>✦</span>
<div style={{ flex: 1, height: 1, background: "var(--border-s)" }} />
    </div>
    {phonetic && <p style={{ fontSize: 12, color: "var(--ink-m)", fontStyle: "it
    <p style={{ fontSize: 15, color: "var(--ink-s)", lineHeight: 1.9, textAlign:
    {notes[`${surah.id}-${v.id}`] && (
      <div style={{ marginTop: 18, background: "var(--emerald-glow)", borderRadi
        <p style={{ fontSize: 12, color: "var(--emerald)", fontWeight: 600 }}>
</div> )}
</div>
  {showPop && <div className="hpop">+10 ♥</div>}
</div>
{/* Dots */}
<div style={{ display: "flex", gap: 5, justifyContent: "center", padding: "8px 0
  {VERSES.map((_, i) => (
    <div key={i} className="dot" onClick={() => goTo(i, i > idx ? "l" : "r")}
      style={{ background: i === idx ? "var(--emerald)" : readSet.has(i) ? "var(
  ))}
</div>
{/* Action buttons — Note · Tafsir · Partager */}
<div style={{ padding: "6px 16px", display: "flex", gap: 8, flexShrink: 0 }}>
  <button onClick={() => setSheet("note")} style={{ flex: 1, background: "var(--
  <button onClick={() => setSheet("tafsir")} style={{ flex: 1, background: "line
  <button onClick={() => setSheet("share")} style={{ flex: 1, background: "var(-
</div>
{/* Navigation row */}
<div style={{ padding: "6px 18px 32px", display: "flex", alignItems: "center", g
-emeral
erflow:
 "var(-
-emeral
v.id}</
nter",
 margin
alic",
 "cente
us: 12, {note
6px",
--emera
card)",
ar-grad
-card)"
ap: 12,
 s

   <button onClick={() => goTo(idx - 1, "r")} disabled={idx === 0}
    style={{ width: 50, height: 50, borderRadius: "50%", border: "1px solid var(
  {/* J'ai fini — big central button */}
  <button onClick={markDone}
    style={{ flex: 1, height: 50, borderRadius: 16, border: "none", background:
J'ai fini ✓ </button>
  <button onClick={() => goTo(idx + 1, "l")} disabled={idx === total - 1}
    style={{ width: 50, height: 50, borderRadius: "50%", border: "none", backgro
</div>
{/* TAFSIR SHEET */}
{sheet === "tafsir" && (
  <Sheet onClose={() => setSheet(null)}>
    {isPremium ? (
      /* ── VUE PREMIUM ── */
      <>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBott
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "li
          <div>
            <p style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)" }}>Ta
<p style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700 }}>★ </div>
        </div>
        <p style={{ fontSize: 12, color: "var(--ink-m)", marginBottom: 12 }}>{su
        <p className="arabic" style={{ fontSize: 19, textAlign: "right", lineHei
        <div style={{ background: "rgba(0,0,0,0.03)", borderRadius: 14, padding:
          <p style={{ fontSize: 13, color: "var(--ink-s)", lineHeight: 1.9 }}>
            {TAFSIR_SAMPLES[v.id] || "Ibn Kathir dit à propos de ce verset : All
</p> </div>
</> ):(
      /* ── VUE GRATUIT — VERROUILLÉ ── */
      <>
        {/* Glassmorphism premium teaser */}
        <div style={{ background: "linear-gradient(135deg,rgba(124,106,232,0.15)
          {/* Reflets décoratifs */}
          <div style={{ position: "absolute", top: -20, right: -20, width: 80, h
          <div style={{ position: "absolute", bottom: -15, left: -15, width: 60,
<divstyle={{fontSize:44,marginBottom:12}}> </div>
<p style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)", margin <p style={{ fontSize: 12, color: "var(--ink-s)", lineHeight: 1.7, marg
 Accédez à l'explication complète de chaque verset par l'un des plus
--borde
"linear
und: id
om: 14
near-gr
fsir Ib
 Premiu
rah.nam
ght: 2,
 "14px"
ah le T
,rgba(1
eight:
 height
Bottom:
inBotto
grands

             <span style={{ color: "var(--gold)", fontWeight: 700 }}>Fonctionnali
          </p>
          {/* Aperçu flouté */}
          <div style={{ background: "rgba(0,0,0,0.04)", borderRadius: 12, paddin
            <p style={{ fontSize: 12, color: "var(--ink-s)", lineHeight: 1.7 }}>
              Ibn Kathir dit à propos de ce verset : Allah le Très-Haut nous ens
</p> </div>
          <button onClick={() => { setSheet(null); onOpenPremium(); }} style={{
               Devenir Premium
          </button>
        </div>
        <p style={{ fontSize: 11, color: "var(--ink-m)", textAlign: "center" }}>
      </>
)} </Sheet>
)}
{/* NOTE SHEET */}
{sheet === "note" && (
  <Sheet onClose={() => setSheet(null)}>
    <h3 style={{ fontSize: 17, marginBottom: 4, color: "var(--ink)" }}>Note priv
    <p style={{ fontSize: 12, color: "var(--ink-m)", marginBottom: 12 }}>{surah.
    <p className="arabic" style={{ fontSize: 20, textAlign: "right", lineHeight:
    <textarea rows={4} placeholder="Réflexion, mémorisation, sens personnel..."
    <button onClick={saveNote} style={{ marginTop: 10, width: "100%", background
</Sheet> )}
{/* SHARE SHEET */}
{sheet === "share" && (
  <Sheet onClose={() => setSheet(null)}>
    <h3 style={{ fontSize: 17, marginBottom: 12, color: "var(--ink)" }}>Partager
    <div style={{ background: "rgba(0,0,0,0.04)", borderRadius: 14, padding: "16
      <p className="arabic" style={{ fontSize: 20, textAlign: "right", lineHeigh
      <div style={{ height: 1, background: "var(--border-s)", marginBottom: 10 }
      <p style={{ fontSize: 13, color: "var(--ink-s)", lineHeight: 1.7, fontStyl
      <p style={{ fontSize: 11, color: "var(--ink-m)", marginTop: 8, textAlign:
      {/* Branding */}
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--b
        <div style={{ width: 20, height: 20, borderRadius: 6, background: "var(-
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--emerald)" }}
        <span style={{ fontSize: 10, color: "var(--ink-m)" }}>— Compagnon spirit
</div>
 té Prem
g: "12p
eigne i
width:
7 jours
ée</h3>
name} —
 2, mar
value={
: "var(
 ce ver
px", ma
t: 2, m
} />
e: "ita
"right"
order-s
-emeral
>Hassan
uel</sp

           </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={share} style={{ flex: 1, background: "var(--emerald)", co
            <button onClick={() => { navigator.clipboard?.writeText(shareText); setShe
          </div>
</Sheet> )}
</div> );
}
/* ─────────────────────────────────────────
   HOME — Dashboard
───────────────────────────────────────── */
const DAYS = ["L","M","M","J","V","S","D"];
const todayRaw = new Date().getDay();
const todayIdx = todayRaw === 0 ? 6 : todayRaw - 1;
// Mock data par jour : { hassanates, versets, mins }
const WEEK_DATA = [
{ done: true, h: 320, v: 28, m: 18 }, { done: true, h: 210, v: 15, m: 12 }, { done: true, h: 480, v: 42, m: 25 }, {done:false,h:90, v:8, m:5 }, {done:false,h:0, v:0, m:0 }, {done:false,h:0, v:0, m:0 }, {done:false,h:0, v:0, m:0 },
];
// Membres du cercle (mock — sera Supabase plus tard)
const CIRCLE = [
{ name: "Amina",
{ name: "Karim",
{ name: "Fatima",
{ name: "Ibrahim",
avatar: "   ", h: 2840 }, avatar: "   ", h: 1920 }, avatar: " ", h: 3100 }, avatar: " ", h: 650 },
  ];
const CIRCLE_GOAL = 10000;
const circleTotal = CIRCLE.reduce((a, m) => a + m.h, 0);
function HomeScreen({ hassanates, streak, readingMins, onStart }) {
  const [selectedDay, setSelectedDay] = useState(todayIdx);
  const [animKey, setAnimKey] = useState(0);
  const [circleH, setCircleH] = useState(circleTotal);
  const dayData = WEEK_DATA[selectedDay] || WEEK_DATA[todayIdx];
  const isToday = selectedDay === todayIdx;
lor: "#
et(null

 const handleDayClick = (i) => {
  if (i > todayIdx) return; // jours futurs non cliquables
  setSelectedDay(i);
  setAnimKey(k => k + 1);
};
// Stats qui changent selon le jour sélectionné
const statsGrid = [
{ icon: "♥", label: "Hassanates", val: isToday ? hassanates.toLocaleString() : day { icon: " ", label: "Versets lus", val: isToday ? "142" : dayData.v, color: "var {icon:" ",label:"Minslecture",val:isToday?readingMins:dayData.m,color {icon:" ",label:"Pagesfinies",val:"3",color:"var(--gold)"},
];
return (
  <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
    {/* ── Header ── */}
    <div className="fu" style={{ display: "flex", justifyContent: "space-between", a
<div>
<p style={{ fontSize: 13, color: "var(--ink-m)", fontWeight: 600 }}>Assalam <p style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", fontFamily: <div className="pill" style={{ marginTop: 5 }}> {streak} jours de suite</d
      </div>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-
        {USER.avatar}
      </div>
</div>
    {/* ── Sélecteur de semaine intelligent ── */}
    <div className="fu card" style={{ padding: "12px 14px", marginBottom: 14, animat
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "c
        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-m)" }}>Cette se
        {!isToday && (
          <button onClick={() => handleDayClick(todayIdx)}
            style={{ fontSize: 10, fontWeight: 700, color: "var(--emerald)", backgro
            Aujourd'hui
</button> )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {DAYS.map((d, i) => {
          const data = WEEK_DATA[i];
          const isSelected = i === selectedDay;
          const isT = i === todayIdx;
          const isFuture = i > todayIdx;
          return (
    Data.h.
(--eme
: "#7C
lignIte
Alaykum
"'Playf
iv> gradien
ionDela
enter",
maine</
und: "v
r 6

￼        <div key={i} onClick={() => handleDayClick(i)}
          style={{ cursor: isFuture ? "default" : "pointer", display: "flex", fl
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: isSelected ? "var(--emerald)" : isT ? "var(--emerald-glo
            border: isT && !isSelected ? "2px solid var(--emerald)" : "2px solid
            display: "flex", flexDirection: "column", alignItems: "center", just
            transition: "all 0.2s",
            opacity: isFuture ? 0.35 : 1,
>}}          
            <span style={{ fontSize: 11, fontWeight: 800, color: isSelected ? "#
          </div>
          {/* Point doré si objectif atteint */}
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: da
</div> ;)
})} </div>
  {/* Label du jour sélectionné */}
  {!isToday && (
    <p style={{ fontSize: 11, color: "var(--ink-m)", textAlign: "center", margin
      {["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"][selec
</p> })
</div>
{/* ── Carte objectif ── */}
<div className="fu goal-card" style={{ marginBottom: 14, animationDelay: "0.07s"
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "f
    <div>
      <p style={{ fontSize: 12, opacity: 0.8, fontWeight: 600, marginBottom: 4 }
      <p style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Playfair Display'
      <p style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>6 versets restants
</div>
    <p className="arabic" style={{ fontSize: 28, opacity: 0.85 }}>الفاتحة</p>
  </div>
  <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 999, height:
    <div style={{ width: "14%", height: "100%", background: "#fff", borderRadius
  </div>
  <button onClick={onStart} style={{ background: "rgba(255,255,255,0.92)", color
    Continuer la lecture →
  </button>
</div>
{/* ── Grille de stats animée ── */}
<div key={animKey} className="fu" style={{ display: "grid", gridTemplateColumns:
{statsGrid.map((s, i) => (
exDirec
w)" : "
 transp
ifyCont
fff" :
ta.done
Top: 6,
tedDay]
>}} lex-sta
}>En co
,serif"
</p>
6, ove } 999 :
: "var(
"1fr 1
     <div key={i} className="stat-card" style={{ backdropFilter: "blur(12px)", We
      <span style={{ fontSize: 20, color: s.color }}>{s.icon}</span>
      <p style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", fontFamily
      <p style={{ fontSize: 11, color: "var(--ink-m)", marginTop: 2, fontWeight:
</div> ))}
</div>
{/* ── Cercle de motivation ── */}
<div className="fu card" style={{ padding: "18px", marginBottom: 14, animationDe
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "c
    <div>
<p style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)" }}> Mon C
      <p style={{ fontSize: 11, color: "var(--ink-m)", marginTop: 2 }}>Progressi
    </div>
    <div style={{ textAlign: "right" }}>
      <p style={{ fontSize: 16, fontWeight: 800, color: "var(--heart)", fontFami
      <p style={{ fontSize: 10, color: "var(--ink-m)" }}>/ {CIRCLE_GOAL.toLocale
    </div>
  </div>
  {/* Barre de progression commune */}
  <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 999, height: 8, ov
    <div style={{ width: `${Math.min(100, (circleH / CIRCLE_GOAL) * 100)}%`, hei
  </div>
  {/* Avatars membres */}
  <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 14
    {CIRCLE.map((m, i) => (
      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: `linear-gradient(135deg, hsl(${i * 60},60%,75%), hsl(${i *
          border: "2px solid var(--border)", display: "flex", alignItems: "cente
          fontSize: 20, boxShadow: "var(--shadow)",
        }}>{m.avatar}</div>
        <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-s)", margin
        <p style={{ fontSize: 9, color: "var(--heart)", fontWeight: 700 }}>{m.h.
</div> ))}
    {/* Bouton inviter */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"
      <button style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "var(--emerald-glow)", border: "2px dashed rgba(42,122,90,0.
        cursor: "pointer", fontSize: 20, color: "var(--emerald)",
 bkitBac
: "'Pla 600 }}
lay: "0
enter",
ercle<
on coll
ly: "'P
String(
erflow:
ght: "1
}}>
: "cent
60 + 3 r", jus
Top: 4
toLocal
, margi
4)",
/

               display: "flex", alignItems: "center", justifyContent: "center",
            }}>+</button>
            <p style={{ fontSize: 10, fontWeight: 700, color: "var(--emerald)", margin
          </div>
        </div>
        {/* Bouton simuler gain — pour test */}
        <button
          onClick={() => setCircleH(h => Math.min(CIRCLE_GOAL, h + 50))}
          style={{ width: "100%", background: "rgba(0,0,0,0.04)", border: "1px dashed
             Simuler +50 ♥ au groupe
        </button>
</div>
      {/* ── Ayah du jour ── */}
      <div className="fu card" style={{ padding: "16px", marginBottom: 12, animationDe
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "c <p style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)" }}> Ayah du <span style={{ fontSize: 11, color: "var(--ink-m)", fontWeight: 600 }}>{AYAH
        </div>
        <p className="arabic" style={{ fontSize: 20, textAlign: "right", lineHeight: 2
        <p style={{ fontSize: 13, color: "var(--ink-s)", lineHeight: 1.7, fontStyle: "
</div>
      {/* ── Défi du jour ── */}
      <div className="fu" style={{ background: "linear-gradient(135deg,#7C6AE8,#A08CF5
        <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: 12 }}>
        <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 999, height:
          <div style={{ width: "33%", height: "100%", background: "#fff", borderRadius
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>1 /
      </div>
</div> );
}
/* ─────────────────────────────────────────
   CORAN — Surah list
───────────────────────────────────────── */
function QuranScreen({ onOpen }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
      <h2 style={{ fontSize: 24, marginBottom: 4, color: "var(--ink)" }}>Le Saint Cora
      <p style={{ fontSize: 13, color: "var(--ink-m)", marginBottom: 16 }}>114 sourate
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
  {SURAHS.map((s, i) => (
Top: 4
var(--b
lay: "0
enter",
 jour<
_DU_JOU
, color
italic"
)", bor Défi
Lis 3 s
 6, ove
: 999 }
3 compl
n</h2> s — cho
 /

 <div key={s.id} className={`card fu`} onClick={() => onOpen(s)}
  style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap:
  <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--
    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--emerald)" }}
  </div>
  <div style={{ flex: 1 }}>
    <p style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{s.nam
    <p style={{ fontSize: 11, color: "var(--ink-m)", marginTop: 2 }}>{s.vers
</div>
  <p className="arabic" style={{ fontSize: 20, color: "var(--gold)" }}>{s.ar
</div>
))} </div>
</div> );
}
/* ─────────────────────────────────────────
   DHIKR & DOUA — v2
───────────────────────────────────────── */
// Catégories grille : Essentiels
const ESSENTIELS = [
 { key:"Salah",
{ key:"Salawat",
{ key:"Louanges",
{ key:"Noms",
label:"Salah",
label:"Salawat",
label:"Louanges d'Allah",
label:"Noms d'Allah",
icon:" ",grad:["#4A90D9","#6FB3F5"], icon:"   ", grad:["#E06B8B","#F09AAF"], icon:"   ", grad:["#C49A3C","#E8C060"], icon:"   ", grad:["#2A7A5A","#3DAA7F"],
icon:" ",grad:["#E06B8B","#C04060" icon:" ",grad:["#7C6AE8","#A08CF icon:" ",grad:["#C49A3C","#3DAA7 icon:" ",grad:["#4A90D9","#2A7A5 icon:"   ", grad:["#E06B8B","#7C6AE
];
// Catégories grille : Par Thème
const PAR_THEME = [
  { key:"Rouqyah",   label:"Rouqyah & Maladie",
  { key:"Istighfar", label:"Istighfar",
  { key:"MatinSoir", label:"Matin & Soir",
  { key:"Pardon",    label:"Pardon & Repentir",
  { key:"Oummah",    label:"Pour la Oummah",
    ];
function DhikrScreen({ onAddH, toast }) {
  const [mainTab, setMainTab]   = useState("essentiels"); // "essentiels" | "theme"
  const [selected, setSelected] = useState(null);         // catégorie ouverte
const [search, setSearch]
const [ctrs, setCtrs]
const [bump, setBump]
= useState("");
= useState({});
= useState(null);
const categories = mainTab === "essentiels" ? ESSENTIELS : PAR_THEME;
 14, cu
emerald
>{s.id}
e}</p>
es} ver
abic}</
items:
 items
 items
 items
], ite
5"], i
F"], i
A"], i
8"], i
: : :
m t t t t

 const tap = d => {
  const cur = ctrs[d.id] || 0;
  if (cur >= d.count) return;
  const next = cur + 1;
  setCtrs(p => ({ ...p, [d.id]: next }));
  setBump(d.id); setTimeout(() => setBump(null), 180);
  if (next === d.count) { onAddH(d.h); toast(`+${d.h} ♥`); }
};
// Vue liste d'invocations d'une catégorie
if (selected) {
  const items = search
    ? selected.items.filter(d =>
        d.arabic.includes(search) ||
        d.fr.toLowerCase().includes(search.toLowerCase()) ||
        d.phonetic.toLowerCase().includes(search.toLowerCase()))
    : selected.items;
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
      {/* Header catégorie */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16
        <button onClick={() => { setSelected(null); setSearch(""); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize:
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: `linear-gradient(135deg,${selected.grad[0]},${selected.grad[1]
          display: "flex", alignItems: "center", justifyContent: "center", fontSize:
        }}>{selected.icon}</div>
        <div>
          <p style={{ fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>{selecte
          <p style={{ fontSize: 11, color: "var(--ink-m)" }}>{selected.items.length}
        </div>
</div>
      {/* Barre de recherche */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "trans
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher une invocation..."
          style={{ width: "100%", padding: "10px 12px 10px 34px", borderRadius: 12,
/> </div>
      {/* Cartes invocations */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
}}> 22, col
})`, 20,
d.label
 invoca
lateY(-
border:

  {items.map((d, i) => {
  const cur = ctrs[d.id] || 0, done = cur >= d.count;
  return (
    <div key={d.id} className="card fu" style={{ padding: "16px", animationD
      {/* Arabique */}
      <p className="arabic" style={{ fontSize: 21, textAlign: "right", lineH
      {/* Séparateur décoratif */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBot
<div style={{ flex: 1, height: 1, background: "var(--border-s)" }} / <span style={{ fontSize: 10, color: "var(--gold)" }}>✦</span>
<div style={{ flex: 1, height: 1, background: "var(--border-s)" }} /
</div>
      {/* Phonétique */}
      <p style={{ fontSize: 12, color: "var(--ink-m)", fontStyle: "italic",
      {/* Traduction */}
      <p style={{ fontSize: 13, color: "var(--ink-s)", lineHeight: 1.6, marg
      {/* Footer : source + compteur */}
      <div style={{ display: "flex", justifyContent: "space-between", alignI
        <div>
          <span style={{ fontSize: 10, color: "var(--ink-m)", display: "bloc
          <span style={{ fontSize: 11, fontWeight: 700, color: done ? "var(-
        </div>
        <button
          className={`dhikr-btn${bump === d.id ? " bump" : ""}`}
          onClick={() => tap(d)} disabled={done}
          style={{
            background: done ? "rgba(0,0,0,0.05)" : `linear-gradient(135deg,
            color: done ? "var(--ink-m)" : "#fff",
            boxShadow: done ? "none" : `0 4px 14px ${selected.grad[0]}55`,
}}> {done
? <span style={{ fontSize: 20 }}>✓</span>
            : <><span style={{ fontSize: 15, fontWeight: 800, lineHeight: 1
        </button>
</div>
      {/* Barre de progression */}
      <div style={{ background: "rgba(0,0,0,0.05)", borderRadius: 999, heigh
        <div style={{
          width: `${Math.round((cur / d.count) * 100)}%`, height: "100%",
          background: done ? "var(--gold)" : `linear-gradient(90deg,${select
          borderRadius: 999, transition: "width 0.25s",
}} />
elay: `
eight:
tom: 8 >
>
lineHei
inBotto
tems: "
k" }}>
-gold)"
${selec
}}>{cur
t: 3, o
ed.grad

               </div>
            </div>
); })}
        {items.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-m)
<pstyle={{fontSize:28,marginBottom:8}}> </p>
            <p style={{ fontSize: 13 }}>Aucun résultat pour « {search} »</p>
          </div>
)} </div>
</div> );
}
// Vue grille des catégories
return (
  <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 16px" }}>
    {/* Header + recherche globale */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "cen
<h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>Dhikr & Dou <buttononClick={()=>setSelected({label:"Tous",icon:" ",grad:["var(-- style={{ background: "var(--card)", border: "1px solid var(--border-s)", bor
           Chercher
      </button>
</div>
    {/* Onglets Essentiels / Par Thème */}
    <div className="tab-bar" style={{ marginBottom: 18 }}>
      <button className={`tab${mainTab === "essentiels" ? " active" : ""}`} onClick=
      <button className={`tab${mainTab === "theme" ? " active" : ""}`} onClick={() =
    </div>
    {/* Grille de catégories */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {categories.map((cat, i) => (
        <div key={cat.key} className="fu" onClick={() => setSelected(cat)}
          style={{
            borderRadius: 20, overflow: "hidden", cursor: "pointer",
            background: `linear-gradient(135deg,${cat.grad[0]}CC,${cat.grad[1]}CC)`,
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: `0 6px 24px ${cat.grad[0]}44`,
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            padding: "18px 16px", minHeight: 110,
            display: "flex", flexDirection: "column", justifyContent: "space-between
   " }}>
ter", m
a</h2>
emeral
derRadi
{() => > setMa
",
d

￼              animationDelay: `${i * 0.05}s`,
              position: "relative",
>}}            
            {/* Icon décoratif en fond */}
            <span style={{ position: "absolute", right: 12, bottom: 8, fontSize: 40, o
            <div>
              <span style={{ fontSize: 26, display: "block", marginBottom: 8 }}>{cat.i
              <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.
</div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 8 }}
          </div>
})) </div>
      {/* Citation du bas */}
      <div style={{ marginTop: 20, padding: "16px", background: "var(--emerald-glow)",
<p className="arabic" style={{ fontSize: 18, color: "var(--emerald)", lineHeig وَاذْكُر ر َّ َّبكَ كَثِیرًا
</p>
        <p style={{ fontSize: 12, color: "var(--ink-s)", fontStyle: "italic" }}>« Invo
      </div>
</div> ;)
}
───────────────────────────────────────── */
   ONBOARDING CAROUSEL
/* ─────────────────────────────────────────
const ONBOARDING_SLIDES = [
{
bg: ["#1A2E1A","#0D1F0D"],
orb1: "rgba(42,122,90,0.25)",
orb2: "rgba(61,170,127,0.12)",
icon: "☽",
iconBg: "linear-gradient(135deg,#2A7A5A,#3DAA7F)",
title: "Bienvenue sur\nHassanates",
accent: "#3DAA7F",
sub: "Ton compagnon de progression spirituelle. Lis, invoque et grandis chaque cta: null,
,} {
bg: ["#1A1A2E","#0D0D1F"], orb1: "rgba(124,106,232,0.2)", orb2: "rgba(160,140,245,0.1)", icon: " ",
iconBg:  "linear-gradient(135deg,#7C6AE8,#A08CF5)",
￼pacity:
con}</s
3 }}>{c
>{cat.i
border ht: 2,
que ton
jour."
     title:   "Progresse en\nCommunauté",
    accent:  "#A08CF5",
    sub:     "Rejoins un cercle de motivation, partage ta progression et inspire ceux
    cta:     null,
}, {
}, ];
function Onboarding({ onDone }) {
bg: ["#1F1A0D","#2E2410"], orb1: "rgba(196,154,60,0.2)", orb2: "rgba(232,192,96,0.1)", icon: " ",
iconBg:  "linear-gradient(135deg,#C49A3C,#E8C060)",
title:   "Trouve ta\nSérénité",
accent:  "#E8C060",
sub:     "Des espaces de calme, des sons apaisants et des exercices pour recentrer
cta:     "Commencer →",
 const [idx, setIdx]
const [cls, setCls]
const anim
const touchX
const s
= useState(0);
= useState("vs-in");
= useRef(false);
= useRef(null);
= ONBOARDING_SLIDES[idx];
const goTo = (next) => {
  if (anim.current || next < 0 || next >= ONBOARDING_SLIDES.length) return;
  anim.current = true;
  const dir = next > idx ? "l" : "r";
  setCls(dir === "l" ? "vs-out-l" : "vs-out-r");
  setTimeout(() => {
    setIdx(next);
    setCls(dir === "l" ? "vs-out-r" : "vs-out-l");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setCls("vs-in"); anim.current = false;
    }));
}, 280); };
const onTS = e => { touchX.current = e.touches[0].clientX; };
const onTE = e => {
  if (!touchX.current) return;
  const dx = touchX.current - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 44) dx > 0 ? goTo(idx + 1) : goTo(idx - 1);
  touchX.current = null;
};
qui t'e
ton cœ

 return (
  <div style={{ position:"fixed", inset:0, zIndex:500, maxWidth:430, margin:"0 auto"
    onTouchStart={onTS} onTouchEnd={onTE}>
    {/* Orbes décoratifs */}
    <div style={{ position:"absolute", top:-80, right:-80, width:260, height:260, bo
    <div style={{ position:"absolute", bottom:120, left:-60, width:180, height:180,
    {/* Skip */}
    {idx < ONBOARDING_SLIDES.length - 1 && (
      <button onClick={onDone} style={{ position:"absolute", top:52, right:20, backg
        Passer
</button> )}
    {/* Slide animé */}
    <div className={`vslide ${cls}`} style={{ padding:"0 32px", gap:0 }}>
      {/* Icône centrale */}
      <div style={{ width:100, height:100, borderRadius:28, background:s.iconBg, dis
        {s.icon}
      </div>
      {/* Titre */}
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:70
        {s.title.split("\n").map((line, i) => (
          <span key={i}>
            {i === 1
              ? <span style={{ background:`linear-gradient(90deg,${s.accent},#fff)`,
              : line}
            {i === 0 && <br />}
          </span>
))} </h1>
      {/* Sous-titre */}
      <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", textAlign:"center", l
    </div>
    {/* Bas : dots + bouton */}
    <div style={{ position:"absolute", bottom:52, left:0, right:0, display:"flex", f
      {/* Dots */}
      <div style={{ display:"flex", gap:8 }}>
        {ONBOARDING_SLIDES.map((_,i) => (
          <div key={i} onClick={() => goTo(i)} style={{ height:6, width: i===idx ? 2
))} </div>
, overf
rderRad
borderR
round:"
play:"f
0, colo
Webkit
ineHeig
lexDire
4 : 6,

         {/* Bouton */}
        {s.cta ? (
          <button onClick={onDone} style={{ width:"100%", padding:"16px", borderRadius
            {s.cta}
</button> ):(
          <button onClick={() => goTo(idx + 1)} style={{ width:"100%", padding:"16px",
            Suivant →
</button> )}
      </div>
    </div>
); }
/* ─────────────────────────────────────────
   SÉRÉNITÉ — Mixeur audio
───────────────────────────────────────── */
const SOUNDS = [
{ id:"pluie",
{ id:"ocean",
{ id:"foret",
{ id:"vent",
{id:"riviere",label:"Rivière", icon:"   ",emoji:"   "}, {id:"feu", label:"Feucrépitant",icon:"   ",emoji:"   "},
label:"Pluie douce",
label:"Océan",
label:"Forêt",
label:"Vent de l'aube",icon:"   ", emoji:"   "},
icon:"   ", emoji:"   "}, icon:"   ", emoji:"   "}, icon:"   ", emoji:"   "},
];
const PRESETS = [
{name:"OcéandePaix", icon:" ",color:"#4A90D9",volumes:{ocean:80,pluie:2 {name:"PluiedeMiséricorde",icon:" ",color:"#7C6AE8",volumes:{pluie:75,foret:
   ];
{ name:"Vent de l'Aube",
icon:" ", color:"#2A7A5A", volumes:{ vent:70, foret:4
function SereniteScreen() {
  const [volumes, setVolumes]
  const [playing, setPlaying]
  const [activePreset, setActivePreset] = useState(null);
  const [wave, setWave]         = useState(0);
= useState({ pluie:0, ocean:0, foret:0, vent:0, rivier
= useState(false);
// Animation vague au rythme du "son"
useEffect(() => {
  if (!playing) return;
  const t = setInterval(() => setWave(w => (w + 1) % 100), 50);
  return () => clearInterval(t);
}, [playing]);
:16, bo
border
0, for
30, oc
0, oce
e:0, fe
e e a

 const applyPreset = (p, i) => {
  setVolumes(p.volumes);
  setActivePreset(i);
  setPlaying(true);
};
const totalVol = Object.values(volumes).reduce((a, v) => a + v, 0);
const isActive = totalVol > 0;
// Génère les barres de la vague
const waveBars = Array.from({ length: 28 }, (_, i) => {
  const base = 8 + Math.sin((i / 28) * Math.PI * 2) * 6;
  const live = playing ? Math.abs(Math.sin((wave / 100 * Math.PI * 2) + i * 0.4)) *
  return base + live;
});
return (
  <div style={{ flex:1, overflowY:"auto", padding:"10px 16px 20px" }}>
    {/* Hero */}
    <div style={{ background:"linear-gradient(135deg,#0D1F14,#1A3020)", borderRadius
      <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100,
      <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:6, fontWe
      <h2 style={{ fontSize:22, color:"#fff", fontFamily:"'Playfair Display',serif",
      <p style={{ fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.7, margi
        « Et dans le souvenir d'Allah, les cœurs trouvent la tranquillité. »<br/>
        <span style={{ color:"rgba(255,255,255,0.4)", fontSize:11 }}>— Ar-Ra'd 13:28
      </p>
      {/* Visualiseur de vague */}
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"center",
        {waveBars.map((h, i) => (
          <div key={i} style={{ width:4, height:`${h}px`, borderRadius:2, background
))} </div>
      {/* Bouton play/pause */}
      <button onClick={() => setPlaying(!playing)} disabled={!isActive}
        style={{ width:56, height:56, borderRadius:"50%", border:"none", cursor: isA
{playing?" ":"▶"} </button>
</div>
    {/* Presets */}
    <p style={{ fontSize:12, fontWeight:800, color:"var(--ink)", marginBottom:10 }}>
    <div style={{ display:"flex", gap:10, marginBottom:18 }}>
 {PRESETS.map((p, i) => (
20 : 0;
:22, pa
borderR
ight:60
 margin
nBottom
</span>
gap:3,
: isAct
ctive ?
Pre
 s

     <button key={i} onClick={() => applyPreset(p, i)}
      style={{ flex:1, padding:"10px 6px", borderRadius:14, border:`1.5px solid
      <span style={{ fontSize:22 }}>{p.icon}</span>
      <span style={{ fontSize:10, fontWeight:700, color: activePreset === i ? p.
    </button>
  ))}
</div>
{/* Mixeur — sliders */}
<p style={{ fontSize:12, fontWeight:800, color:"var(--ink)", marginBottom:10 }}>
<div className="card" style={{ padding:"16px", marginBottom:16 }}>
  {SOUNDS.map(snd => (
    <div key={snd.id} style={{ display:"flex", alignItems:"center", gap:12, marg
      <div style={{ width:36, height:36, borderRadius:10, background:"var(--emer
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBott
          <span style={{ fontSize:12, fontWeight:700, color:"var(--ink-s)" }}>{s
          <span style={{ fontSize:11, color:"var(--emerald)", fontWeight:700 }}>
        </div>
        <div style={{ position:"relative", height:4, background:"rgba(0,0,0,0.08
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100)
            setVolumes(v => ({ ...v, [snd.id]: Math.max(0, Math.min(100, pct)) }
            setActivePreset(null);
          }}>
          <div style={{ width:`${volumes[snd.id]}%`, height:"100%", background:"
          <div style={{ position:"absolute", top:"50%", left:`${volumes[snd.id]}
        </div>
      </div>
</div> ))}
  <button onClick={() => { setVolumes({ pluie:0, ocean:0, foret:0, vent:0, rivie
    style={{ width:"100%", marginTop:4, padding:"8px", borderRadius:10, border:"
    Tout réinitialiser
  </button>
</div>
{/* Méditation guidée */}
<p style={{ fontSize:12, fontWeight:800, color:"var(--ink)", marginBottom:10 }}>
<div style={{ display:"flex", flexDirection:"column", gap:10 }}>
{[
{icon:" ",title:"Respiration4-7-8", sub:"4min·Apaiselesystèm {icon:" ",title:"MéditationsurAl-Fatiha",sub:"8min·Connexionspirit {icon:" ",title:"Routineducoucher", sub:"10min·Adhkar+relax {icon:" ",title:"Éveilspirituel", sub:"5min·Commencerlajo
  ].map((it, i) => (
    ${activ
color :
Mix
inBotto
ald-glo
om:5 }}
nd.labe
{volume
)", bor
; ));
linear-
%`, tra
re:0, f
1px das
Méd
e nerv
uelle
ation"
urnée
  e
i
e p , a

 <div key={i} className="card fu" style={{ padding:"14px 16px", display:"flex
  <div style={{ width:44, height:44, borderRadius:14, background:`${it.color
  <div style={{ flex:1 }}>
    <p style={{ fontWeight:700, fontSize:13, color:"var(--ink)" }}>{it.title
    <p style={{ fontSize:11, color:"var(--ink-m)", marginTop:2 }}>{it.sub}</
  </div>
  <div style={{ width:32, height:32, borderRadius:"50%", background:`${it.co
</div>
))} </div>
</div> );
}
/* ─────────────────────────────────────────
   PROFIL
───────────────────────────────────────── */
const BADGES = [
{id:"fajr", icon:" ",name:"Lève-tôt", { id:"murabit", icon:" ", name:"Murabit", {id:"tadabbur",icon:" ",name:"Tadabbur", { id:"hafidh", icon:"   ", name:"Hafidh",
{ id:"mukhlis", icon:"♥", name:"Mukhlis",
desc:"LisaprèsFajr7jours", desc:"30 jours de streak",
desc:"100notesdelecture", desc:"Lis 1 sourate en entier",
  desc:"1 000 Hassanates",
  desc:"5 000 Hassanates",
  desc:"Termine tous les Adhkar",
  desc:"Abonnement Premium activé"
   { id:"sabir",
{ id:"dhakir",
{ id:"gold",
icon:"   ", name:"Sabir", icon:"   ", name:"Dhakir", icon:"★", name:"Gold Member",
];
// Toggle switch component
function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 999, backgro
      <div style={{ position: "absolute", top: 3, left: on ? 20 : 3, width: 20, height
    </div>
); }
function ProfilScreen({ hassanates, streak, readingMins, goalMins, setGoalMins, onOpen
const [notifFajr,
const [notifSoir,
const [notifDhikr,
const [darkPref,
const [search,
const stats = [
  { l:"Hassanates",
setNotifFajr]
setNotifSoir]
setNotifDhikr]
setDarkPref]
setSearch]
= useState(true);
= useState(true);
= useState(false);
= useState(false);
= useState("");
v: hassanates.toLocaleString(), i:"♥",  c:"var(--heart)"    }
", alig
}22`, b
}</p> p>
lor}22`
cond: cond
   con
   con
   cond
   con
   con
, cond
und: on : 20, b
Premium
,
( : d d
d d

 ];
{ l:"Streak",
{ l:"Versets lus",
{ l:"Sourates",
{ l:"Mins lecture",
{ l:"Notes",
v: `${streak}j`,
v: "142",
v: "3",
v: readingMins,
v: "7",
i:"   ", c:"var(--gold)" } i:" ", c:"var(--emerald)" } i:"   ", c:"#7C6AE8" } i:"   ", c:"var(--emerald-l)"} i:"   ", c:"var(--gold)" }
 const earnedBadges = BADGES.filter(b => b.cond(streak, hassanates, isPremium));
const lockedBadges = BADGES.filter(b => !b.cond(streak, hassanates, isPremium));
const settingsGroups = [
  {
    title: "Contenu sauvegardé",
    items: [
{icon:" ",label:"Mesfavoris", {icon:" ",label:"Mesnotes",
{ icon:" ", label:"Historique lecture", ...(isPremium ? [
sub:"Versetsmisenfavoris"}, sub:"7notesdelecture"}, sub:"Progression sourate par sourate
    ], },
{ icon:" ", label:"Tafsir Ibn Kathir", sub:"★ Accès illimité à toutes les
sub:"★ Méditations & sons exclusifs
toggle: true, val: notifFajr, set: toggle: true, val: notifSoir, set: toggle:true,val:notifDhikr,set:
{icon:" ",label:"Moncompte",
{icon:" ",label:"Confidentialité",
{icon:" ",label:"Suggéreruneamélioration",sub:"Votreaviscompte"}, {icon:" ",label:"Signaleruneerreur",sub:"Nousaideràcorriger"}, {icon:" ",label:"Conditionsd'utilisation",sub:"CGU&politique"},
], },
];
return (
  <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 20px" }}>
{ icon:"   ", label:"Séances Sérénité", ] : []),
], },
{
  title: "Notifications",
  items: [
{ icon:" ", label:"Rappel Fajr", { icon:" ", label:"Rappel soir", {icon:" ",label:"RappelDhikr",
{
  title: "Compte & Support",
  items: [
    sub:"Modifierleprofil"}, sub:"Données&permissions"},
    {/* ── Header profil ── */}
, , , , ,
" },
exégès ",
setNot
 setNo
 setNo
e
i t t

 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", ma
  <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-
  <p style={{ fontSize: 20, fontWeight: 800, color: "var(--ink)", fontFamily: "'
  <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
    <span className="pill">Récitant ♥</span>
    {isPremium && <span style={{ display:"inline-flex", alignItems:"center", gap
  </div>
</div>
{/* Barre de recherche settings */}
<div style={{ position: "relative", marginBottom: 16 }}>
  <span style={{ position: "absolute", left: 12, top: "50%", transform: "transla
  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="R
    style={{ width:"100%", padding:"10px 12px 10px 34px", borderRadius:12, borde
</div>
{/* ── Bannière Premium ── */}
{!isPremium && (
  <div onClick={onOpenPremium} style={{ background:"linear-gradient(135deg,#1A10
    <div style={{ width:42, height:42, borderRadius:12, background:"linear-gradi
    <div style={{ flex:1 }}>
      <p style={{ fontSize:13, fontWeight:800, color:"#E8C060" }}>Devenir Premiu
      <p style={{ fontSize:11, color:"rgba(255,255,255,0.6)", marginTop:2 }}>Taf
    </div>
    <span style={{ color:"rgba(196,154,60,0.7)", fontSize:18 }}>›</span>
  </div>
)}
{/* ── Hassanates highlight ── */}
<div style={{ background:"linear-gradient(135deg,#E06B8B,#F09AAF)", borderRadius
  <div>
    <p style={{ color:"rgba(255,255,255,0.85)", fontSize:12, fontWeight:600 }}>T
    <p style={{ color:"#fff", fontSize:26, fontWeight:800, fontFamily:"'Playfair
</div>
<pstyle={{fontSize:40}}> </p> </div>
{/* ── Grille de stats ── */}
<div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBo
  {stats.map((s,i) => (
    <div key={i} className="fu" style={{ background:"var(--card)", borderRadius:
      <span style={{ fontSize:18, color:s.c }}>{s.i}</span>
      <p style={{ fontSize:16, fontWeight:800, color:"var(--ink)", fontFamily:"'
      <p style={{ fontSize:9, color:"var(--ink-m)", marginTop:1, fontWeight:600
</div> ))}
 </div>
rginBot
gradien
Playfai
:4, bac
teY(-50
echerch
r:"1px
35,#2D1
ent(135
m Gold< sir · S
:18, pa
otal Ha
 Displa
ttom:18
14, pad
Playfai
}}>{s.l

 {/* ── Objectif de lecture ── */}
<div className="card" style={{ padding:"14px 16px", marginBottom:14, display:"fl
<spanstyle={{fontSize:20}}> </span> <div style={{ flex:1 }}>
    <p style={{ fontSize:14, fontWeight:700, color:"var(--ink)" }}>Objectif de l
    <p style={{ fontSize:11, color:"var(--ink-m)" }}>par session quotidienne</p>
  </div>
  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
    <button onClick={() => setGoalMins(m => Math.max(5, m-5))} style={{ width:28
    <span style={{ fontSize:14, fontWeight:800, color:"var(--emerald)", minWidth
    <button onClick={() => setGoalMins(m => Math.min(120, m+5))} style={{ width:
  </div>
</div>
{/* ── Mes Succès (Badges) ── */}
<div style={{ marginBottom:18 }}>
  <p style={{ fontSize:13, fontWeight:800, color:"var(--ink)", marginBottom:4 }}
  <p style={{ fontSize:11, color:"var(--ink-m)", marginBottom:12 }}>{earnedBadge
  {/* Badges obtenus */}
  {earnedBadges.length > 0 && (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, m
      {earnedBadges.map(b => (
        <div key={b.id} className="fu" style={{ display:"flex", flexDirection:"c
          <div style={{ width:56, height:56, borderRadius:16, background:`linear
            {b.icon}
          </div>
          <p style={{ fontSize:10, fontWeight:700, color:"var(--ink-s)", textAli
        </div>
))} </div>
)}
  {/* Badges verrouillés */}
  <p style={{ fontSize:11, color:"var(--ink-m)", marginBottom:10, fontWeight:600
  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
    {lockedBadges.map(b => (
      <div key={b.id} className="fu" style={{ display:"flex", flexDirection:"col
        <div style={{ width:56, height:56, borderRadius:16, background:"rgba(0,0
          {b.icon}
</div>
        <p style={{ fontSize:10, color:"var(--ink-m)", textAlign:"center", lineH
      </div>
))} </div>
 </div>
ex", al
ecture<
, heigh
:46, te
28, hei
> Me s.lengt
arginBo
olumn",
-gradie
gn:"cen
}}>
umn", a
,0,0.05
eight:1
  s

       {/* ── Settings groupés ── */}
      {settingsGroups.map((group, gi) => {
        const filtered = search
          ? group.items.filter(it => it.label.toLowerCase().includes(search.toLowerCas
          : group.items;
        if (filtered.length === 0) return null;
        return (
          <div key={gi} style={{ marginBottom:14 }}>
            <p style={{ fontSize:11, fontWeight:700, color:"var(--ink-m)", textTransfo
            <div className="card" style={{ overflow:"hidden" }}>
              {filtered.map((it, ii) => (
                <div key={ii} style={{ padding:"13px 16px", borderBottom: ii < filtere
                  <div style={{ width:34, height:34, borderRadius:10, background: it.g
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <p style={{ fontSize:13, fontWeight:700, color:"var(--ink)" }}>{
                      {it.gold && <span style={{ fontSize:10, fontWeight:700, color:"v
</div>
                    {it.sub && <p style={{ fontSize:11, color:"var(--ink-m)", marginTo
                  </div>
                  {it.toggle
                    ? <Toggle on={it.val} onToggle={() => it.set(v => !v)} />
                    : <span style={{ color:"var(--ink-m)", fontSize:16 }}>›</span>}
</div> ))}
            </div>
          </div>
); })}
      {/* Version */}
      <p style={{ fontSize:11, color:"var(--ink-m)", textAlign:"center", marginTop:8 }
    </div>
); }
/* ─────────────────────────────────────────
   PAGE PREMIUM
───────────────────────────────────────── */
const PREMIUM_FEATURES = [
{icon:"   ",title:"TafsirIbnKathircomplet",
{ icon: "   ", title: "Séances Sérénité exclusives",
{icon:"   ",title:"Statistiquesdegroupeavancées",sub:"SuividétailléduCerc
sub:"Explicationsavantedec sub: "Méditations guidées, son
{icon:"   ",title:"Badges&défispremium", {icon:"   ",title:"Rappelsintelligents",
{ icon: "   ", title: "Sauvegarde cloud illimitée",
sub:"Accomplissementsexclusi sub:"Personnalisésselonvos sub: "Notes, signets, progress
e()))
rm:"upp
d.lengt
old ? "
it.labe
ar(--go
p:1 }}>
}>Hassa
haque
s de l
le de
fs et
temps
ion sy
v a m r d n

 ];
const COMPARE = [
  { feat: "Lecture du Coran",       free: true,  gold: true  },
  { feat: "Dhikr & Doua essentiels",free: true,  gold: true  },
{ feat: "Hassanates & Streak",
{ feat: "Tafsir Ibn Kathir",
{ feat: "Séances Sérénité",
{ feat: "Stats groupe avancées",  free: false, gold: true  },
{ feat: "Badges premium",         free: false, gold: true  },
free: true,  gold: true  },
free: false, gold: true  },
free: false, gold: true  },
];
function PremiumPage({ onClose, onActivate }) {
  const [activated, setActivated] = useState(false);
  const handleActivate = () => {
    setActivated(true);
    setTimeout(() => { onActivate(); onClose(); }, 1200);
};
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 250, maxWidth: 430, margin: "0 auto",
      background: "linear-gradient(160deg,#1A1035,#0D1B2A)",
      display: "flex", flexDirection: "column", overflowY: "auto",
    }}>
      {/* Cercles décoratifs d'ambiance */}
      <div style={{ position: "fixed", top: -60, right: -60, width: 200, height: 200,
      <div style={{ position: "fixed", bottom: 100, left: -40, width: 150, height: 150
      {/* Header */}
      <div style={{ padding: "52px 20px 0", flexShrink: 0 }}>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border
      </div>
      {/* Hero */}
      <div style={{ padding: "28px 24px 0", textAlign: "center" }}>
<div style={{ display: "inline-flex", alignItems: "center", gap: 8, background <span style={{ fontSize: 14 }}>★</span>
<span style={{ fontSize: 12, fontWeight: 700, color: "#E8C060" }}>Hassanates
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "'Playf
          Élève ta pratique<br />
          <span style={{ background: "linear-gradient(90deg,#C49A3C,#E8C060)", WebkitB
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, max
          Accède au Tafsir complet, aux séances de sérénité exclusives et à des outils
borderR
, borde
: "1px
: "rgba
 Gold</
air Dis
ackgrou
Width:
 avancé

 </p> </div>
{/* Features list */}
<div style={{ padding: "24px 20px 0" }}>
  <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", tex
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {PREMIUM_FEATURES.map((f, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, back
        <div style={{ width: 38, height: 38, borderRadius: 11, background: "line
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{f.title}<
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2
        </div>
        <span style={{ marginLeft: "auto", color: "#E8C060", fontSize: 16, flexS
      </div>
))} </div>
</div>
{/* Comparatif Gratuit vs Gold */}
<div style={{ padding: "24px 20px 0" }}>
  <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", tex
  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow
    {/* En-tête */}
    <div style={{ display: "flex", padding: "10px 16px", borderBottom: "1px soli
      <div style={{ flex: 1 }} />
      <div style={{ width: 64, textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)
      </div>
<div style={{ width: 64, textAlign: "center" }}>
<p style={{ fontSize: 11, fontWeight: 700, color: "#E8C060" }}>★ Gold</p
      </div>
    </div>
    {COMPARE.map((row, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", padding: "11p
        <p style={{ flex: 1, fontSize: 12, color: "rgba(255,255,255,0.7)", fontW
        <div style={{ width: 64, textAlign: "center", fontSize: 15 }}>{row.free
        <div style={{ width: 64, textAlign: "center", fontSize: 15 }}>{row.gold
</div> ))}
  </div>
</div>
{/* CTA */}
<div style={{ padding: "24px 20px 40px" }}>
{/* Prix */}
tTransf
ground:
ar-grad
/p> }}>{f.
hrink:
tTransf
: "hidd
d rgba(
" }}>Gr
>
x 16px"
eight:
? <span
? <span

         <div style={{ textAlign: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textDecoration: "l
          <p style={{ fontSize: 28, fontWeight: 800, color: "#E8C060", fontFamily: "'P
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>ou
</div>
        {/* Bouton glow */}
        <button
          onClick={handleActivate}
          style={{
            width: "100%", padding: "16px", borderRadius: 16, border: "none", cursor:
            background: activated ? "linear-gradient(135deg,#2A7A5A,#3DAA7F)" : "linea
            color: "#fff", fontSize: 16, fontWeight: 800,
            fontFamily: "'Nunito',sans-serif",
            boxShadow: activated ? "0 0 30px rgba(61,170,127,0.5)" : "0 0 30px rgba(19
            transition: "all 0.4s",
            animation: !activated ? "goldGlow 2s ease-in-out infinite" : "none",
}}>
{activated ? "✓ Premium activé !" : " Commencer mon essai gratuit · 7 jour </button>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "center"
          Sans engagement · Annulation à tout moment
</p> </div>
</div> );
}
/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function App() {
  const [onboarded, setOnboarded] = useState(false); // false = affiche l'onboarding
  const [tab, setTab] = useState("home");
  const [dark, setDark] = useState(false);
  const [hassanates, setH] = useState(1240);
  const [streak] = useState(7);
  const [readingMins, setReadingMins] = useState(12);
  const [goalMins, setGoalMins] = useState(15);
  const [notes, setNotes] = useState({});
  const [toast, setToast] = useState(null);
  const [reader, setReader] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const tRef = useRef(null);
 ine-thr
layfair
 39,99
"pointe
r-gradi
6,154,6
s"}
, margi

 const showToast = m => { setToast(m); clearTimeout(tRef.current); tRef.current = set
const addH = n => setH(p => p + n);
const openPremium = () => setShowPremium(true);
const nav = [
{ id: "home",
{ id: "quran",
{ id: "dhikr",
{id:"serenite",icon:"   ",label:"Sérénité"}, { id: "profil", icon: "   ", label: "Profil" },
icon: "   ", label: "Accueil" }, icon: "   ", label: "Coran" }, icon: "   ", label: "Dhikr" },
];
// Affiche l'onboarding au premier lancement
if (!onboarded) return <Onboarding onDone={() => setOnboarded(true)} />;
return ( <>
    <Styles />
    <style>{`
      @keyframes goldGlow {
        0%,100% { box-shadow: 0 0 30px rgba(196,154,60,0.5), 0 0 60px rgba(196,154,6
        50%      { box-shadow: 0 0 44px rgba(196,154,60,0.7), 0 0 80px rgba(196,154,
} `}</style>
    <div className={`app${dark ? " dark" : ""}`}>
      {/* ── TOP BAR ── */}
      {!reader && !showPremium && (
        <div style={{ padding: "10px 16px 0", flexShrink: 0 }}>
          <div className="status-bar">
<div className="stat-chip"><span style={{ color: "var(--heart)" }}>♥</sp <divclassName="stat-chip"><span> </span><spanclassName="fire"> </spa <divclassName="stat-chip"><span> </span>{readingMins}min</div> {isPremium
              ? <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)" }
              : <button onClick={openPremium} style={{ background: "linear-gradient(
            }
            <button onClick={() => setDark(!dark)} style={{ background: "none", bord
          </div>
   </div> )}
{/* ── SCREENS ── */}
{!reader && !showPremium && tab === "home"
{!reader && !showPremium && tab === "quran"
{!reader && !showPremium && tab === "dhikr"
&& <HomeScreen hassanates={hass
&& <QuranScreen onOpen={s => se
&& <DhikrScreen onAddH={addH} t
Timeout
0,0.2);
60,0.35
an>{has
n>{str
}>★ Gol 135deg,
er: "no
anates}
tReader
oast={s
e

 {!reader && !showPremium && tab === "serenite" && <SereniteScreen />}
{!reader && !showPremium && tab === "profil"
{/* ── READER ── */}
{reader && (
&& <ProfilScreen hassanates={ha
          <VerseReader
            surah={reader}
            onClose={() => setReader(null)}
            onAddH={addH}
            notes={notes} setNotes={setNotes}
            goalSecs={goalMins * 60}
            onTimeSpent={s => setReadingMins(m => m + Math.round(s / 60))}
            isPremium={isPremium}
            onOpenPremium={openPremium}
/> )}
        {/* ── PAGE PREMIUM ── */}
        {showPremium && (
<PremiumPage
onClose={() => setShowPremium(false)}
onActivate={() => { setIsPremium(true); showToast("★ Premium Gold activé !
/> )}
        {/* ── TOAST ── */}
        {toast && <div className="toast">{toast}</div>}
        {/* ── NAV ── */}
        {!reader && !showPremium && (
          <nav className="nav-bar">
            {nav.map(it => (
              <div key={it.id} className={`nav-item${tab === it.id ? " active" : ""}`}
                <span style={{ fontSize: 20 }}>{it.icon}</span>
                <span className="nav-lbl">{it.label}</span>
</div> ))}
</nav> )}
</div> </>
); }
ssanate
"); }}
onClic
