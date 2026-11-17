// import React, { createContext, useContext, useEffect, useRef, useState } from "react";
// import factoryimage from './Images/logo.png'
// /* ---------- Theme ---------- */
// const C = {
//     navy: "#14224a",
//     orange: "#f26b21",
//     soft: "#f1f5fb",
//     text: "#5b6478",
//     line: "#e6eaf2",
// };
// const HEAD = "'Barlow Condensed', sans-serif";
// const BODY = "'Barlow', sans-serif";

// /* ---------- Data ---------- */
// const WHY = [
//     ["Stops corrosion", "Concrete cover keeps moisture, air and chlorides away from the steel, so rebar is far less likely to rust, swell and crack the concrete."],
//     ["Fire protection", "The cover layer insulates the bars from heat, helping the structure keep its strength for longer in a fire."],
//     ["Longer service life", "Correct cover is a core part of durable design. It cuts repair costs and extends the life of slabs, beams, columns and footings."],
//     ["Proper bond", "Steel fully surrounded by concrete bonds well and carries load together with it, as the designer intended."],
//     ["Same material as the structure", "Concrete blocks bond and behave like the surrounding concrete, leaving no weak spots or gaps."],
//     ["Accurate and quick on site", "Moulded sizes (20, 25, 40, 50 mm) make correct cover easy to set and easy for engineers to check before the pour."],
// ];
// const COVER = [
//     ["Slab", "20 mm", "Type 01 (20) · Type 02"],
//     ["Beam", "25 mm", "Type 01 (25) · Round 25"],
//     ["Wall / moderate exposure", "30 mm", "Round 30"],
//     ["Column", "40 mm", "Round 40 · Type 02"],
//     ["Footing / raft", "50 mm", "Footing 50 · Round 50"],
// ];
// const STEPS = [
//     ["Read the drawing", "Confirm the required cover for each element."],
//     ["Pick the block", "Match the size and shape: cubic for slabs and beams, round for vertical faces, footing block for foundations."],
//     ["Place and tie", "Set blocks under or beside the bars and tie them to the steel so they do not shift while pouring."],
//     ["Space them evenly", "Spread blocks across the bar mat as your site engineer specifies so bars cannot sag between supports."],
//     ["Check before the pour", "Inspect cover and block position once the steel is fixed and before concrete goes in."],
// ];
// const RANGE = [
//     ["TYPE 01", "20 & 25 mm", "Dual-size cube for slabs and beams.", "cube", "25 20"],
//     ["TYPE 02", "Multi 20/25/40/50", "One block, four covers. Stock less, cover more.", "cube", "50 40"],
//     ["TYPE 03", "Round 25 mm", "Wheel spacer with centre hole for tying.", "round", "25"],
//     ["TYPE 04", "Round 40 mm", "For columns and vertical faces.", "round", "40"],
//     ["TYPE 05", "Footing 50 mm", "Wide stable base for footings and rafts.", "footing", "50"],
//     ["TYPE 06", "Round 30 mm", "Wall and beam side cover.", "round", "30"],
//     ["TYPE 07", "Round 50 mm", "Heavy cover for foundations.", "round", "50"],
// ];
// const SPECS = [
//     ["cube", "SG-CB-2025", "Type 01 · Dual size", "20 & 25 mm", "100 / 250 pcs"],
//     ["cube", "SG-CB-MULTI", "Type 02 · Multi", "20, 25, 40, 50 mm", "100 / 250 pcs"],
//     ["round", "SG-CB-R25", "Type 03 · Round", "25 mm", "200 pcs"],
//     ["round", "SG-CB-R30", "Type 06 · Round", "30 mm", "150 pcs"],
//     ["round", "SG-CB-R40", "Type 04 · Round", "40 mm", "100 pcs"],
//     ["round", "SG-CB-R50", "Type 07 · Round", "50 mm", "50 pcs"],
//     ["footing", "SG-CB-F50", "Type 05 · Footing", "50 mm", "100 pcs"],
// ];
// const FRAMES = [
//     ["SG-DF-P25", "Plain frame (4-inch section)", "7 ft", "2.5 ft"],
//     ["SG-DF-P30", "Plain frame (4-inch section)", "7 ft", "3 ft"],
//     ["SG-DF-P325", "Plain frame (4-inch section)", "7 ft", "3.25 ft"],
//     ["SG-DF-P35", "Plain frame (4-inch section)", "7 ft", "3.5 ft"],
//     ["SG-DF-M30", "Maharaja frame (5-inch section)", "7 ft", "3 ft"],
//     ["SG-DF-M35", "Maharaja frame (5-inch section)", "7 ft", "3.5 ft"],
// ];
// const FEATURES = ["Weatherproof", "Corrosion resistant", "Termite free", "Great finish", "Custom colours and finishes", "Easy to construct", "Fast, bulk manufacturing", "Easy to stock"];

// /* ---------- Helpers ---------- */
// function useViewport() {
//     const get = () => (typeof window === "undefined" ? { w: 1280, h: 800 } : { w: window.innerWidth, h: window.innerHeight });
//     const [v, setV] = useState(get);
//     useEffect(() => {
//         const on = () => setV(get());
//         window.addEventListener("resize", on);
//         window.addEventListener("orientationchange", on);
//         return () => { window.removeEventListener("resize", on); window.removeEventListener("orientationchange", on); };
//     }, []);
//     return v;
// }

// /* Design stage: a fixed "virtual screen" that is scaled to fit any device with no scrolling */
// function useStage() {
//     const vp = useViewport();
//     const pad = vp.w < 700 ? 8 : 16;
//     const availW = vp.w - pad * 2;
//     const availH = vp.h - pad * 2 - 56; // room for the controls
//     const aspect = availW / availH;
//     const portrait = aspect < 0.95;
//     const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
//     const H = portrait ? 860 : 900;
//     const W = portrait ? clamp(H * aspect, 360, 760) : clamp(H * aspect, 1100, 1700);
//     const k = Math.min(availW / W, availH / H);
//     return { W, H, k, vp };
// }

// const StageCtx = createContext({ H: 900 });

// const PageCtx = createContext("active"); // "active" | "past" | "future"
// const FLIP = 1.1; // seconds

// function Reveal({ children, delay = 0, style }) {
//     const st = useContext(PageCtx);
//     const [shown, setShown] = useState(false);
//     useEffect(() => {
//         if (st !== "future") return setShown(true);
//         const t = setTimeout(() => setShown(false), FLIP * 1000 + 200);
//         return () => clearTimeout(t);
//     }, [st]);
//     return (
//         <div className="sg-reveal" style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(24px)", transition: shown ? `opacity .7s ease ${delay + 0.15}s, transform .7s ease ${delay + 0.15}s` : "none", ...style }}>
//             {children}
//         </div>
//     );
// }

// function Shape({ kind, label = "", size = 90 }) {
//     const [a, b] = label.split(" ");
//     if (kind === "round")
//         return (
//             <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
//                 <ellipse cx="54" cy="56" rx="40" ry="40" fill="#6b6a66" />
//                 <circle cx="50" cy="50" r="40" fill="#a8a7a2" />
//                 <circle cx="50" cy="50" r="30" fill="none" stroke="#8d8c87" strokeWidth="2" />
//                 <circle cx="50" cy="50" r="7" fill="#2d2d2d" />
//                 <text x="50" y="30" textAnchor="middle" fontSize="9" fill="#6d6c68">{a} mm</text>
//             </svg>
//         );
//     if (kind === "footing")
//         return (
//             <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
//                 <polygon points="30,12 70,12 92,88 8,88" fill="#9b9a95" />
//                 <polygon points="70,12 92,88 82,92 62,16" fill="#7b7a76" />
//                 <circle cx="50" cy="66" r="7" fill="#2d2d2d" />
//                 <text x="42" y="38" fontSize="16" fill="#5f5e5a" fontFamily={HEAD}>{a}</text>
//             </svg>
//         );
//     return (
//         <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
//             <polygon points="12,34 50,18 88,34 50,52" fill="#d7d6d0" />
//             <polygon points="12,34 50,52 50,92 12,72" fill="#bdbcb6" />
//             <polygon points="88,34 50,52 50,92 88,72" fill="#a9a8a2" />
//             <rect x="40" y="26" width="20" height="8" rx="4" fill="#8f8e89" />
//             <text x="20" y="68" fontSize="14" fill="#6d6c68" fontFamily={HEAD}>{a}</text>
//             <text x="64" y="72" fontSize="14" fill="#6d6c68" fontFamily={HEAD}>{b}</text>
//         </svg>
//     );
// }

// function Frame({ ornate, h = 220 }) {
//     return (
//         <svg height={h} viewBox="0 0 60 200" aria-hidden="true">
//             <rect x="14" y="8" width="30" height="184" fill="#e9ecea" />
//             <rect x="8" y="30" width="12" height="160" fill="#f6f7f6" />
//             <rect x="22" y="2" width="14" height="10" fill="#dfe3e1" />
//             <rect x="20" y="30" width="24" height="160" fill="#eef0ef" stroke="#d5d9d7" />
//             {ornate && (
//                 <g fill="none" stroke="#c9cfcc" strokeWidth="1.5">
//                     <path d="M32 50 L40 70 L32 90 L24 70 Z" />
//                     <path d="M32 120 L40 140 L32 160 L24 140 Z" />
//                 </g>
//             )}
//         </svg>
//     );
// }

// /* ---------- Layout pieces ---------- */
// function Page({ children, n, mobile }) {
//     const { H } = useContext(StageCtx);
//     return (
//         <section style={{ position: "relative", minHeight: H, display: "flex", flexDirection: "column", background: "#fff", padding: mobile ? "28px 18px 14px" : "44px 56px 16px", borderTop: `10px solid ${C.navy}`, boxSizing: "border-box" }}>
//             <div style={{ position: "absolute", top: -10, right: 0, width: "30%", height: 10, background: C.orange }} />
//             <div style={{ flex: 1 }}>{children}</div>
//             <footer style={{ marginTop: mobile ? 16 : 28, paddingTop: 16, borderTop: `1px solid ${C.line}`, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", fontSize: 13, color: C.text }}>
//                 <span>StructGuard Infra Products &amp; Services LLP</span>
//                 <span>www.structguard.in · 8956134733 · info@structguard.com</span>
//                 {n && <span>{n}</span>}
//             </footer>
//         </section>
//     );
// }

// /* Scales a page down (never up) if its content is taller than the stage, so nothing ever scrolls */
// function Fit({ H, children }) {
//     const ref = useRef(null);
//     const [k, setK] = useState(1);
//     useEffect(() => {
//         const el = ref.current;
//         if (!el) return;
//         const m = () => setK(Math.min(1, H / el.scrollHeight));
//         m();
//         const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(m) : null;
//         ro && ro.observe(el);
//         if (document.fonts && document.fonts.ready) document.fonts.ready.then(m);
//         return () => ro && ro.disconnect();
//     }, [H]);
//     return (
//         <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#fff" }}>
//             <div ref={ref} style={{ transform: `scale(${k})`, transformOrigin: "top center" }}>{children}</div>
//         </div>
//     );
// }

// /* Single-page flipbook: the top page curls over its LEFT edge and sweeps off to the left */
// function Book({ mobile, stage, children }) {
//     const { W, H, k } = stage;
//     const pages = React.Children.toArray(children);
//     const total = pages.length;
//     const [cur, setCur] = useState(0);
//     const [turn, setTurn] = useState({ i: -1, n: 0 });
//     const [hover, setHover] = useState(false);
//     const touch = useRef(null);
//     const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     const D = reduce ? 0.01 : FLIP;

//     const goTo = (n) => {
//         n = Math.max(0, Math.min(total - 1, n));
//         if (n === cur) return;
//         setTurn({ i: n > cur ? cur : n, n: turn.n + 1 });
//         setCur(n);
//     };
//     useEffect(() => {
//         const kd = (e) => {
//             if (e.key === "ArrowRight") goTo(cur + 1);
//             if (e.key === "ArrowLeft") goTo(cur - 1);
//         };
//         window.addEventListener("keydown", kd);
//         return () => window.removeEventListener("keydown", kd);
//     });

//     const face = { position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: "#fff" };
//     const s = hover ? (mobile ? 64 : 100) : mobile ? 36 : 56;
//     const btn = (off) => ({ background: off ? "#cfd5e2" : C.navy, color: "#fff", border: 0, borderRadius: 999, padding: mobile ? "10px 16px" : "12px 22px", fontFamily: BODY, fontWeight: 600, fontSize: 14, cursor: off ? "default" : "pointer" });

//     return (
//         <div style={{ height: "100dvh", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, overflow: "hidden", background: "#eef1f6" }}>
//             <div
//                 onTouchStart={(e) => (touch.current = [e.touches[0].clientX, e.touches[0].clientY])}
//                 onTouchEnd={(e) => {
//                     if (!touch.current) return;
//                     const dx = e.changedTouches[0].clientX - touch.current[0];
//                     const dy = e.changedTouches[0].clientY - touch.current[1];
//                     touch.current = null;
//                     if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(cur + (dx < 0 ? 1 : -1));
//                 }}
//                 style={{ position: "relative", width: W * k, height: H * k, overflow: "hidden", borderRadius: 8, background: "#dfe4ee", boxShadow: "0 20px 50px rgba(20,34,74,.25)", flex: "none" }}
//             >
//                 <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${k})`, transformOrigin: "top left", perspective: 2600, perspectiveOrigin: "20% 50%" }}>
//                     {pages.map((p, i) => {
//                         const flipped = i < cur;
//                         const shade = turn.i === i ? <div key={turn.n} className="sg-shade" style={{ animationDuration: `${D}s` }} /> : null;
//                         return (
//                             <div key={p.key} style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transformOrigin: "left center", transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)", transition: `transform ${D}s cubic-bezier(.6,.05,.25,1), visibility 0s linear ${flipped ? D : 0}s`, visibility: flipped ? "hidden" : "visible", zIndex: flipped ? total + i : total - i }}>
//                                 <div className={i === cur ? "sg-on" : ""} style={face}>
//                                     <PageCtx.Provider value={i === cur ? "active" : i < cur ? "past" : "future"}>
//                                         <Fit H={H}>{p}</Fit>
//                                     </PageCtx.Provider>
//                                     {shade}
//                                     {i === cur && i < total - 1 && (
//                                         <button aria-label="Next page" onClick={() => goTo(cur + 1)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
//                                             style={{ position: "absolute", right: 0, bottom: 0, width: s, height: s, border: 0, padding: 0, cursor: "pointer", background: `linear-gradient(315deg, ${C.navy} 0 50%, #c9cfdb 50%, #fafbfd 100%)`, filter: "drop-shadow(-3px -3px 5px rgba(0,0,0,.3))", transition: "width .3s ease, height .3s ease" }} />
//                                     )}
//                                 </div>
//                                 <div style={{ ...face, transform: "rotateY(180deg)", background: "linear-gradient(90deg,#dfe3ea,#f6f7fa 45%,#e3e6ed)" }}>{shade}</div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: mobile ? 10 : 18, height: 44, flex: "none" }}>
//                 <button style={btn(cur === 0)} disabled={cur === 0} onClick={() => goTo(cur - 1)}>‹ Prev</button>
//                 <div style={{ display: "flex", gap: 6, alignItems: "center" }} role="tablist" aria-label="Pages">
//                     {pages.map((p, i) => (
//                         <button key={p.key} aria-label={`Page ${i + 1}`} aria-selected={i === cur} onClick={() => goTo(i)}
//                             style={{ width: i === cur ? 24 : 9, height: 9, borderRadius: 9, border: 0, padding: 0, cursor: "pointer", background: i === cur ? C.orange : "#b8c0d2", transition: "width .3s ease, background .3s ease" }} />
//                     ))}
//                 </div>
//                 <button style={btn(cur === total - 1)} disabled={cur === total - 1} onClick={() => goTo(cur + 1)}>Next ›</button>
//             </div>
//         </div>
//     );
// }

// const Eyebrow = ({ children }) => (
//     <div style={{ color: C.orange, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>{children}</div>
// );
// const H2 = ({ children, mobile }) => (
//     <h2 style={{ fontFamily: HEAD, fontWeight: 800, color: C.navy, fontSize: mobile ? 30 : 46, lineHeight: 1.1, margin: "0 0 16px" }}>{children}</h2>
// );
// const hoverLift = {
//     onMouseEnter: (e) => (e.currentTarget.style.transform = "translateY(-4px)"),
//     onMouseLeave: (e) => (e.currentTarget.style.transform = "none"),
// };
// const card = { background: C.soft, borderRadius: 18, padding: 24, transition: "transform .25s ease" };

// const Scroll = ({ children }) => <div>{children}</div>;

// /* ---------- Main ---------- */
// export default function StructGuardBrochure({ heroImage }) {
//     const stage = useStage();
//     const mobile = stage.W < 700;
//     const tablet = stage.W < 1000;

//     return (
//         <div style={{ fontFamily: BODY, color: C.navy, background: "#eef1f6", WebkitFontSmoothing: "antialiased" }}>
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800&display=swap');
//         @keyframes sgRise { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:none } }
//         @keyframes sgWipe { from { clip-path: circle(0% at 100% 100%) } to { clip-path: circle(150% at 100% 100%) } }
//         @keyframes sgBar { from { transform: scaleX(0) } to { transform: scaleX(1) } }
//         @keyframes sgFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
//         .sg-on .sg-hero-line { animation: sgRise .8s cubic-bezier(.2,.7,.2,1) both }
//         .sg-on .sg-hero-img { animation: sgWipe 1.4s cubic-bezier(.6,.05,.2,1) .2s both }
//         .sg-bar { transform-origin: left }
//         .sg-on .sg-bar { animation: sgBar 1s ease .1s both }
//         @keyframes sgShade { 0% { opacity: 0 } 50% { opacity: .55 } 100% { opacity: 0 } }
//         .sg-shade { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, rgba(20,34,74,.6), rgba(20,34,74,0) 75%); animation: sgShade 1.1s ease-in-out both }
//         button:focus-visible { outline: 3px solid ${C.orange}; outline-offset: 2px }
//         .sg-float { animation: sgFloat 4s ease-in-out infinite }
//         .sg-row { transition: background .2s ease }
//         .sg-row:hover { background: ${C.soft} }
//         @media (prefers-reduced-motion: reduce) {
//           .sg-hero-line,.sg-hero-img,.sg-bar,.sg-float { animation: none !important }
//           .sg-reveal { transition: none !important; opacity: 1 !important; transform: none !important }
//         }
//       `}</style>

//             <StageCtx.Provider value={stage}>
//                 <Book mobile={mobile} stage={stage}>
//                     {/* ---------- 1. Hero ---------- */}
//                     <Page mobile={mobile}>
//                         <div className="sg-bar" style={{ position: "absolute", top: -10, left: 0, right: "30%", height: 10, background: C.navy }} />
//                         <div style={{ display: "flex", flexDirection: tablet ? "column" : "row", gap: tablet ? 28 : 40, alignItems: "stretch" }}>
//                             <div style={{ flex: "1 1 50%", minWidth: 0 }}>
//                                 <div className="sg-hero-line" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 26, letterSpacing: 1 }}>
//                                     Struct<span style={{ color: C.orange }}>Guard</span>{" "}
//                                     <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.2em", color: C.text }}>INFRA PRODUCTS &amp; SERVICES LLP</span>
//                                 </div>
//                                 <div className="sg-hero-line" style={{ animationDelay: ".1s", marginTop: mobile ? 20 : 32 }}><Eyebrow>Precast concrete products</Eyebrow></div>
//                                 {["Cover blocks", "& door", "frames, built", "to last."].map((t, i) => (
//                                     <div key={t} className="sg-hero-line" style={{ animationDelay: `${0.2 + i * 0.12}s`, fontFamily: HEAD, fontWeight: 800, fontSize: mobile ? 46 : 76, lineHeight: 1.0 }}>{t}</div>
//                                 ))}
//                                 <p className="sg-hero-line" style={{ animationDelay: ".8s", color: C.text, fontSize: mobile ? 16 : 19, lineHeight: 1.6, maxWidth: 480, margin: "24px 0" }}>
//                                     High-strength precast concrete cover blocks, spacers and door frames, made at our 30,000 sq ft Pune facility and supplied across India.
//                                 </p>
//                                 <div className="sg-hero-line" style={{ animationDelay: ".95s", display: "flex", flexWrap: "wrap", gap: 8 }}>
//                                     {[["MAKE IN INDIA", C.navy, "#fff"], ["ISO 9001:2015", C.orange, "#fff"], ["GRADE M40 DOOR FRAMES", C.soft, C.navy]].map(([t, bg, fg]) => (
//                                         <span key={t} style={{ background: bg, color: fg, fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", padding: "12px 16px" }}>{t}</span>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div style={{ flex: "1 1 50%", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
//                                 <div className="sg-hero-line" style={{ animationDelay: ".3s", fontFamily: HEAD, fontWeight: 800, fontSize: mobile ? 44 : 64, textAlign: tablet ? "left" : "right", color: C.navy }}>
//                                     <span style={{ color: C.orange }}>&#8734;</span>StructGuard
//                                 </div>
//                                 <div className="sg-hero-img" style={{ flex: 1, minHeight: mobile ? 170 : 340, borderRadius: tablet ? 24 : "60% 0 0 0", overflow: "hidden", background: heroImage ? `url(${heroImage}) center/cover` : `linear-gradient(135deg,#b9c6d8,#e5e9ef 50%,#8f8a7a)` }}>
//                                     {!heroImage && <div style={{ padding: 24, color: C.navy, opacity: 0.6, fontSize: 13 }}>Pass a <code>heroImage</code> prop (factory photo URL)</div>}
//                                 </div>
//                             </div>
//                         </div>
//                     </Page>

//                     {/* ---------- 2. Why cover blocks ---------- */}
//                     <Page n={2} mobile={mobile}>
//                         <Reveal>
//                             <Eyebrow>Why cover blocks</Eyebrow>
//                             <H2 mobile={mobile}>A few millimetres of concrete decide how long a structure lasts.</H2>
//                             <p style={{ color: C.text, fontSize: mobile ? 14 : 17, lineHeight: 1.5, maxWidth: 820, margin: 0 }}>
//                                 Cover blocks hold reinforcement at the exact distance from the formwork, so concrete fully surrounds every bar once poured. Without them, bars sag, touch the shuttering or end up exposed.
//                             </p>
//                         </Reveal>
//                         <div style={{ display: "grid", gridTemplateColumns: mobile || tablet ? "1fr 1fr" : "repeat(3,1fr)", gap: mobile ? 10 : 14, marginTop: 16 }}>
//                             {WHY.map(([t, d], i) => (
//                                 <Reveal key={t} delay={(i % 3) * 0.08}>
//                                     <div style={{ ...card, padding: mobile ? 12 : 20, height: "100%", boxSizing: "border-box" }} {...hoverLift}>
//                                         <div style={{ fontFamily: HEAD, fontWeight: 800, color: C.orange, fontSize: mobile ? 28 : 36 }}>{String(i + 1).padStart(2, "0")}</div>
//                                         <h3 style={{ fontFamily: HEAD, fontSize: mobile ? 20 : 25, margin: "2px 0 6px" }}>{t}</h3>
//                                         <p style={{ color: C.text, lineHeight: 1.5, margin: 0, fontSize: mobile ? 12.5 : 14.5 }}>{d}</p>
//                                     </div>
//                                 </Reveal>
//                             ))}
//                         </div>
//                         <Reveal>
//                             <div style={{ background: C.navy, color: "#fff", borderRadius: 16, padding: "18px 24px", marginTop: 16, fontSize: 15, lineHeight: 1.5 }}>
//                                 <b style={{ color: "#ffb48a" }}>Without proper cover:</b> exposed or poorly covered steel rusts early, concrete spalls, repair costs rise and the building's life and safety are at risk.
//                             </div>
//                         </Reveal>
//                     </Page>

//                     {/* ---------- 3. Cover guide ---------- */}
//                     <Page n={3} mobile={mobile}>
//                         <Reveal>
//                             <Eyebrow>Cover guide &amp; how to use</Eyebrow>
//                             <H2 mobile={mobile}>Choose the right block, place it right.</H2>
//                         </Reveal>
//                         <div style={{ display: "flex", flexDirection: tablet ? "column" : "row", gap: 40, marginTop: 16 }}>
//                             <Reveal style={{ flex: 1, minWidth: 0 }}>
//                                 <Scroll min={420}>
//                                     <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1.6fr", background: C.navy, color: "#fff", fontWeight: 600, padding: "16px 18px" }}>
//                                         <span>Element</span><span>Typical cover</span><span>Our block</span>
//                                     </div>
//                                     {COVER.map(([a, b, c]) => (
//                                         <div key={a} className="sg-row" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1.6fr", padding: "16px 18px", borderBottom: `1px solid ${C.line}`, fontWeight: 500 }}>
//                                             <span>{a}</span><span style={{ color: C.text }}>{b}</span><span style={{ color: C.orange, fontWeight: 700 }}>{c}</span>
//                                         </div>
//                                     ))}
//                                 </Scroll>
//                                 <p style={{ color: C.text, fontSize: 13, lineHeight: 1.6, marginTop: 16 }}>
//                                     Indicative values for mild exposure, in line with common practice under IS 456. Always follow the cover specified in your structural drawings and project code for the element and exposure condition.
//                                 </p>
//                             </Reveal>
//                             <div style={{ flex: 1, minWidth: 0 }}>
//                                 <Reveal><h3 style={{ fontFamily: HEAD, fontSize: 30, margin: "0 0 16px" }}>Using cover blocks correctly</h3></Reveal>
//                                 {STEPS.map(([t, d], i) => (
//                                     <Reveal key={t} delay={i * 0.08}>
//                                         <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
//                                             <div style={{ flex: "0 0 40px", height: 40, borderRadius: "50%", background: C.orange, color: "#fff", fontFamily: HEAD, fontWeight: 800, fontSize: 22, display: "grid", placeItems: "center" }}>{i + 1}</div>
//                                             <div>
//                                                 <div style={{ fontWeight: 600, fontSize: 17 }}>{t}</div>
//                                                 <div style={{ color: C.text, lineHeight: 1.5, fontSize: 15 }}>{d}</div>
//                                             </div>
//                                         </div>
//                                     </Reveal>
//                                 ))}
//                             </div>
//                         </div>
//                     </Page>

//                     {/* ---------- 4. Product range ---------- */}
//                     <Page n={4} mobile={mobile}>
//                         <Reveal>
//                             <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
//                                 <div><Eyebrow>Product range</Eyebrow><H2 mobile={mobile}>Concrete cover blocks &amp; spacers</H2></div>
//                                 <div style={{ color: C.text, fontSize: 15, maxWidth: 240 }}>Excellent strength, consistent size, custom sizes on request.</div>
//                             </div>
//                         </Reveal>
//                         <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : tablet ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: mobile ? 10 : 14, marginTop: 12 }}>
//                             {RANGE.map(([t, n, d, k, l], i) => (
//                                 <Reveal key={t} delay={(i % 4) * 0.07}>
//                                     <div style={{ ...card, textAlign: "center", padding: mobile ? 14 : 24, height: "100%", boxSizing: "border-box" }} {...hoverLift}>
//                                         <div style={{ height: mobile ? 72 : 96, display: "grid", placeItems: "center" }}><div className="sg-float" style={{ animationDelay: `${i * 0.3}s` }}><Shape kind={k} label={l} size={mobile ? 66 : 92} /></div></div>
//                                         <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", marginTop: 12 }}>{t}</div>
//                                         <div style={{ fontFamily: HEAD, fontSize: mobile ? 20 : 26, fontWeight: 800 }}>{n}</div>
//                                         <div style={{ color: C.text, fontSize: 14, lineHeight: 1.5 }}>{d}</div>
//                                     </div>
//                                 </Reveal>
//                             ))}
//                             <Reveal delay={0.3}>
//                                 <div style={{ ...card, background: C.navy, color: "#fff", height: "100%", boxSizing: "border-box", padding: mobile ? 16 : 24 }} {...hoverLift}>
//                                     <h3 style={{ fontFamily: HEAD, fontSize: mobile ? 22 : 30, margin: "0 0 10px", lineHeight: 1.1 }}>Why StructGuard blocks</h3>
//                                     <p style={{ lineHeight: 1.6, margin: 0, fontSize: 14, color: "#dbe2f1" }}>Quality-checked raw material, periodic concrete cube testing at partner labs, and bulk supply with on-time delivery.</p>
//                                 </div>
//                             </Reveal>
//                         </div>
//                     </Page>

//                     {/* ---------- 5. Product specifications ---------- */}
//                     <Page n={5} mobile={mobile}>
//                         <Reveal><Eyebrow>Technical data · Cover blocks</Eyebrow><H2 mobile={mobile}>Product specifications</H2></Reveal>
//                         <Reveal>
//                             {mobile ? (
//                                 <div>
//                                     <div style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 10, background: C.navy, color: "#fff", fontWeight: 600, fontSize: 13, padding: "12px 10px" }}>
//                                         <span>Photo</span><span>Code · Product · Size</span><span>Per bag</span>
//                                     </div>
//                                     {SPECS.map(([k, code, p, sz, pk]) => (
//                                         <div key={code} className="sg-row" style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 10, alignItems: "center", padding: "6px 10px", borderBottom: `1px solid ${C.line}` }}>
//                                             <Shape kind={k} size={42} />
//                                             <div><div style={{ color: C.orange, fontWeight: 700, fontSize: 14 }}>{code}</div><div style={{ fontSize: 12.5 }}><b>{p}</b> · {sz}</div></div>
//                                             <b style={{ fontSize: 12.5 }}>{pk}</b>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <Scroll>
//                                     <div style={{ display: "grid", gridTemplateColumns: "90px 1.2fr 1.4fr 1.3fr 1.2fr 1fr 1.2fr", background: C.navy, color: "#fff", fontWeight: 600, fontSize: 14, padding: "14px 12px", gap: 8 }}>
//                                         <span>Photo</span><span>Product code</span><span>Product</span><span>Size</span><span>Max rebar dia. (mm)</span><span>Min breaking load (N)</span><span style={{ textAlign: "center" }}>Packaging per bag</span>
//                                     </div>
//                                     {SPECS.map(([k, code, p, sz, pk]) => (
//                                         <div key={code} className="sg-row" style={{ display: "grid", gridTemplateColumns: "90px 1.2fr 1.4fr 1.3fr 1.2fr 1fr 1.2fr", alignItems: "center", padding: "6px 12px", gap: 8, borderBottom: `1px solid ${C.line}`, fontSize: 15 }}>
//                                             <Shape kind={k} size={52} />
//                                             <span style={{ color: C.orange, fontWeight: 700 }}>{code}</span>
//                                             <b>{p}</b><span>{sz}</span><span>–</span><span>–</span>
//                                             <b style={{ textAlign: "center" }}>{pk}</b>
//                                         </div>
//                                     ))}
//                                 </Scroll>
//                             )}
//                         </Reveal>
//                         <p style={{ color: C.text, fontSize: 13, marginTop: 12 }}>Specifications are subject to batch and manufacturing tolerances. Contact us for test certificates and custom requirements.</p>
//                     </Page>

//                     {/* ---------- 6. Door frames ---------- */}
//                     <Page n={6} mobile={mobile}>
//                         <div style={{ display: "flex", flexDirection: tablet ? "column" : "row", gap: 32 }}>
//                             <div style={{ flex: 1.3, minWidth: 0 }}>
//                                 <Reveal>
//                                     <Eyebrow>Concrete door frames</Eyebrow>
//                                     <H2 mobile={mobile}>Strong, termite-free frames for your home.</H2>
//                                     <p style={{ color: C.text, fontSize: mobile ? 14 : 17, lineHeight: 1.5, margin: 0 }}>High-strength Grade M40 precast frames, fast to fit, with no loss or damage in storage.</p>
//                                 </Reveal>
//                                 <Reveal>
//                                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: mobile ? "6px 12px" : "10px 24px", margin: "12px 0 18px", fontSize: mobile ? 13.5 : 16, fontWeight: 500 }}>
//                                         {FEATURES.map((f) => <div key={f}><span style={{ color: C.orange, marginRight: 8 }}>✓</span>{f}</div>)}
//                                     </div>
//                                 </Reveal>
//                                 <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: mobile ? 10 : 16 }}>
//                                     <Reveal><div style={{ ...card, padding: mobile ? 12 : 20 }}><h3 style={{ fontFamily: HEAD, fontSize: mobile ? 19 : 24, margin: "0 0 6px" }}>Plain frame · 4-inch width</h3>{["2.5", "3", "3.25", "3.5"].map((x) => <div key={x} style={{ color: C.text, lineHeight: 1.8 }}>7 ft × {x} ft</div>)}</div></Reveal>
//                                     <Reveal delay={0.1}><div style={{ ...card, padding: mobile ? 12 : 20 }}><h3 style={{ fontFamily: HEAD, fontSize: mobile ? 19 : 24, margin: "0 0 6px" }}>Maharaja frame · 5-inch width</h3>{["3", "3.5"].map((x) => <div key={x} style={{ color: C.text, lineHeight: 1.8 }}>7 ft × {x} ft</div>)}</div></Reveal>
//                                 </div>
//                             </div>
//                             <div style={{ flex: 1, minWidth: 0, display: "flex", gap: 16, justifyContent: "center" }}>
//                                 {[["Plain", false], ["Maharaja", true]].map(([n, o], i) => (
//                                     <Reveal key={n} delay={i * 0.15}>
//                                         <div style={{ textAlign: "center" }}>
//                                             <div style={{ ...card, display: "grid", placeItems: "center", padding: mobile ? "10px 16px" : "20px 28px" }} {...hoverLift}><Frame ornate={o} h={mobile ? 130 : 280} /></div>
//                                             <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 22, marginTop: 10 }}>{n}</div>
//                                         </div>
//                                     </Reveal>
//                                 ))}
//                             </div>
//                         </div>
//                         <Reveal>
//                             <div style={{ background: C.navy, color: "#fff", borderRadius: 18, padding: mobile ? "14px 16px" : "20px 28px", marginTop: mobile ? 16 : 24, display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: mobile ? 10 : 20, fontSize: mobile ? 12.5 : 14, lineHeight: 1.6 }}>
//                                 <div><b style={{ color: "#ffb48a" }}>Pune Office</b><br />418, Platinum 9, Pashan-Sus Road, Baner, Pune MH-411045</div>
//                                 <div><b style={{ color: "#ffb48a" }}>Factory</b><br />Sr no 715, Satavwadi, Lavale, Mulshi, Pune MH-412115</div>
//                                 <div><b style={{ color: "#ffb48a" }}>Contact</b><br />Mob 8956134733 · Office 8956134732<br />GSTN 27AFBFS2382B1Z8</div>
//                             </div>
//                         </Reveal>
//                     </Page>

//                     {/* ---------- 7. Door frame specs ---------- */}
//                     <Page n={7} mobile={mobile}>
//                         <Reveal><Eyebrow>Technical data · Door frames</Eyebrow><H2 mobile={mobile}>Door frame specifications</H2></Reveal>
//                         <div style={{ display: "flex", flexDirection: tablet ? "column" : "row", gap: 32, alignItems: "flex-start" }}>
//                             <Reveal style={{ flex: 1, minWidth: 0, width: "100%" }}>
//                                 {mobile ? (
//                                     <div>
//                                         <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.8fr 1fr", background: C.navy, color: "#fff", fontWeight: 600, fontSize: 13, padding: "12px 10px", gap: 8 }}>
//                                             <span>Code</span><span>Product</span><span>H × W</span>
//                                         </div>
//                                         {FRAMES.map(([c, pr, h, wd]) => (
//                                             <div key={c} className="sg-row" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.8fr 1fr", padding: "9px 10px", gap: 8, borderBottom: `1px solid ${C.line}`, fontSize: 12.5 }}>
//                                                 <span style={{ color: C.orange, fontWeight: 700 }}>{c}</span><b>{pr.replace(" section", "")}</b><span>{h} × {wd}</span>
//                                             </div>
//                                         ))}
//                                         <p style={{ color: C.text, fontSize: 12.5, margin: "10px 0 0" }}>Grade M40 · 1 pc per pack</p>
//                                     </div>
//                                 ) : (
//                                     <Scroll>
//                                         <div style={{ display: "grid", gridTemplateColumns: "1.1fr 2.2fr .7fr .8fr .6fr 1fr", background: C.navy, color: "#fff", fontWeight: 600, fontSize: 14, padding: "14px 12px", gap: 8 }}>
//                                             <span>Product code</span><span>Product</span><span>Height</span><span>Width</span><span>Grade</span><span style={{ textAlign: "center" }}>Packaging</span>
//                                         </div>
//                                         {FRAMES.map(([c, pr, h, wd]) => (
//                                             <div key={c} className="sg-row" style={{ display: "grid", gridTemplateColumns: "1.1fr 2.2fr .7fr .8fr .6fr 1fr", padding: "10px 12px", gap: 8, borderBottom: `1px solid ${C.line}`, fontSize: 15 }}>
//                                                 <span style={{ color: C.orange, fontWeight: 700 }}>{c}</span><b>{pr}</b><span>{h}</span><span>{wd}</span><span>M40</span><b style={{ textAlign: "center" }}>1 pc</b>
//                                             </div>
//                                         ))}
//                                     </Scroll>
//                                 )}
//                                 <p style={{ color: C.text, fontSize: 13, marginTop: 24 }}>Weatherproof, corrosion resistant, termite free. Custom colours and finishes available on request.</p>
//                             </Reveal>
//                             <div style={{ display: "flex", gap: 16, alignSelf: tablet ? "center" : "flex-start" }}>
//                                 {[false, true].map((o) => <div key={String(o)} style={{ ...card, padding: "16px 22px" }}><Frame ornate={o} h={mobile ? 150 : 230} /></div>)}
//                             </div>
//                         </div>
//                     </Page>
//                 </Book>
//             </StageCtx.Provider>
//         </div>
//     );
// }


import React, { createContext, useContext, useEffect, useRef, useState } from "react";

/* ---------- Real photos: put these files in ./Images next to this component ---------- */
import imgFactory from "./Images/factoryimg.webp";
import imgLogo from "./Images/logo.png";
import imgCube2025 from "./Images/20-25mm new.png";
import imgCubeMulti from "./Images/multibgremove.png";
import imgRound25 from "./Images/round25mm.png";
import imgRound30 from "./Images/30mm round bgremove.png";
import imgRound40 from "./Images/round40mm.png";
import imgRound50 from "./Images/50mm round bgremove.png";
import imgFooting50 from "./Images/footing50mmnewsharp-removebg-preview.png";
import imgDoorPlain from "./Images/plaindoorframe.png";
import imgDoorMaharaja from "./Images/maharajadoorframe.png";
import HTMLFlipBook from "react-pageflip";
const IMG = {
    factory: imgFactory,
    logo: imgLogo,
    cube: { "25 20": imgCube2025, "50 40": imgCubeMulti },
    round: { "25": imgRound25, "30": imgRound30, "40": imgRound40, "50": imgRound50 },
    footing: imgFooting50,
    doorPlain: imgDoorPlain,
    doorMaharaja: imgDoorMaharaja,
};

/* ---------- Theme ---------- */
const C = {
    navy: "#14224a",
    orange: "#f26b21",
    soft: "#f1f5fb",
    text: "#5b6478",
    line: "#e6eaf2",
};
const HEAD = "'Barlow Condensed', sans-serif";
const BODY = "'Barlow', sans-serif";

/* ---------- Data ---------- */
const WHY = [
    ["Stops corrosion", "Concrete cover keeps moisture, air and chlorides away from the steel, so rebar is far less likely to rust, swell and crack the concrete."],
    ["Fire protection", "The cover layer insulates the bars from heat, helping the structure keep its strength for longer in a fire."],
    ["Longer service life", "Correct cover is a core part of durable design. It cuts repair costs and extends the life of slabs, beams, columns and footings."],
    ["Proper bond", "Steel fully surrounded by concrete bonds well and carries load together with it, as the designer intended."],
    ["Same material as the structure", "Concrete blocks bond and behave like the surrounding concrete, leaving no weak spots or gaps."],
    ["Accurate and quick on site", "Moulded sizes (20, 25, 40, 50 mm) make correct cover easy to set and easy for engineers to check before the pour."],
];
const COVER = [
    ["Slab", "20 mm", "Type 01 (20) · Type 02"],
    ["Beam", "25 mm", "Type 01 (25) · Round 25"],
    ["Wall / moderate exposure", "30 mm", "Round 30"],
    ["Column", "40 mm", "Round 40 · Type 02"],
    ["Footing / raft", "50 mm", "Footing 50 · Round 50"],
];
const STEPS = [
    ["Read the drawing", "Confirm the required cover for each element."],
    ["Pick the block", "Match the size and shape: cubic for slabs and beams, round for vertical faces, footing block for foundations."],
    ["Place and tie", "Set blocks under or beside the bars and tie them to the steel so they do not shift while pouring."],
    ["Space them evenly", "Spread blocks across the bar mat as your site engineer specifies so bars cannot sag between supports."],
    ["Check before the pour", "Inspect cover and block position once the steel is fixed and before concrete goes in."],
];
const RANGE = [
    ["TYPE 01", "20 & 25 mm", "Dual-size cube for slabs and beams.", "cube", "25 20"],
    ["TYPE 02", "Multi 20/25/40/50", "One block, four covers. Stock less, cover more.", "cube", "50 40"],
    ["TYPE 03", "Round 25 mm", "Wheel spacer with centre hole for tying.", "round", "25"],
    ["TYPE 04", "Round 40 mm", "For columns and vertical faces.", "round", "40"],
    ["TYPE 05", "Footing 50 mm", "Wide stable base for footings and rafts.", "footing", "50"],
    ["TYPE 06", "Round 30 mm", "Wall and beam side cover.", "round", "30"],
    ["TYPE 07", "Round 50 mm", "Heavy cover for foundations.", "round", "50"],
];
const SPECS = [
    ["cube", "SG-CB-2025", "Type 01 · Dual size", "20 & 25 mm", "100 / 250 pcs", "25 20"],
    ["cube", "SG-CB-MULTI", "Type 02 · Multi", "20, 25, 40, 50 mm", "100 / 250 pcs", "50 40"],
    ["round", "SG-CB-R25", "Type 03 · Round", "25 mm", "200 pcs", "25"],
    ["round", "SG-CB-R30", "Type 06 · Round", "30 mm", "150 pcs", "30"],
    ["round", "SG-CB-R40", "Type 04 · Round", "40 mm", "100 pcs", "40"],
    ["round", "SG-CB-R50", "Type 07 · Round", "50 mm", "50 pcs", "50"],
    ["footing", "SG-CB-F50", "Type 05 · Footing", "50 mm", "100 pcs", "50"],
];
const FRAMES = [
    ["SG-DF-P25", "Plain frame (4-inch section)", "7 ft", "2.5 ft"],
    ["SG-DF-P30", "Plain frame (4-inch section)", "7 ft", "3 ft"],
    ["SG-DF-P325", "Plain frame (4-inch section)", "7 ft", "3.25 ft"],
    ["SG-DF-P35", "Plain frame (4-inch section)", "7 ft", "3.5 ft"],
    ["SG-DF-M30", "Maharaja frame (5-inch section)", "7 ft", "3 ft"],
    ["SG-DF-M35", "Maharaja frame (5-inch section)", "7 ft", "3.5 ft"],
];
const FEATURES = ["Weatherproof", "Corrosion resistant", "Termite free", "Great finish", "Custom colours and finishes", "Easy to construct", "Fast, bulk manufacturing", "Easy to stock"];

/* ---------- Helpers ---------- */
function useViewport() {
    const get = () => (typeof window === "undefined" ? { w: 1280, h: 800 } : { w: window.innerWidth, h: window.innerHeight });
    const [v, setV] = useState(get);
    useEffect(() => {
        const on = () => setV(get());
        window.addEventListener("resize", on);
        window.addEventListener("orientationchange", on);
        return () => { window.removeEventListener("resize", on); window.removeEventListener("orientationchange", on); };
    }, []);
    return v;
}

/* Design stage: a fixed "virtual screen" that is scaled to fit any device with no scrolling */
function useStage() {
    const vp = useViewport();
    const pad = vp.w < 700 ? 8 : 16;
    const availW = vp.w - pad * 2;
    const availH = vp.h - pad * 2 - 56; // room for the controls
    const aspect = availW / availH;
    const portrait = aspect < 0.95;
    const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
    const H = portrait ? 860 : 900;
    const W = portrait ? clamp(H * aspect, 360, 760) : clamp(H * aspect, 1100, 1700);
    const k = Math.min(availW / W, availH / H);
    return { W, H, k, vp };
}

const StageCtx = createContext({ H: 900 });

const PageCtx = createContext("active"); // "active" | "past" | "future"
const FLIP = 1.1; // seconds

function Reveal({ children, delay = 0, style }) {
    const st = useContext(PageCtx);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        if (st !== "future") return setShown(true);
        const t = setTimeout(() => setShown(false), FLIP * 1000 + 200);
        return () => clearTimeout(t);
    }, [st]);
    return (
        <div className="sg-reveal" style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(24px)", transition: shown ? `opacity .7s ease ${delay + 0.15}s, transform .7s ease ${delay + 0.15}s` : "none", ...style }}>
            {children}
        </div>
    );
}

function Shape({ kind, label = "", size = 90 }) {
    const src = kind === "round" ? IMG.round[label] : kind === "footing" ? IMG.footing : IMG.cube[label];
    if (src) return <img src={src} alt="" width={size} height={size} draggable={false} style={{ display: "block", width: size, height: size, objectFit: "contain" }} />;
    const [a, b] = label.split(" ");
    if (kind === "round")
        return (
            <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
                <ellipse cx="54" cy="56" rx="40" ry="40" fill="#6b6a66" />
                <circle cx="50" cy="50" r="40" fill="#a8a7a2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#8d8c87" strokeWidth="2" />
                <circle cx="50" cy="50" r="7" fill="#2d2d2d" />
                <text x="50" y="30" textAnchor="middle" fontSize="9" fill="#6d6c68">{a} mm</text>
            </svg>
        );
    if (kind === "footing")
        return (
            <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
                <polygon points="30,12 70,12 92,88 8,88" fill="#9b9a95" />
                <polygon points="70,12 92,88 82,92 62,16" fill="#7b7a76" />
                <circle cx="50" cy="66" r="7" fill="#2d2d2d" />
                <text x="42" y="38" fontSize="16" fill="#5f5e5a" fontFamily={HEAD}>{a}</text>
            </svg>
        );
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
            <polygon points="12,34 50,18 88,34 50,52" fill="#d7d6d0" />
            <polygon points="12,34 50,52 50,92 12,72" fill="#bdbcb6" />
            <polygon points="88,34 50,52 50,92 88,72" fill="#a9a8a2" />
            <rect x="40" y="26" width="20" height="8" rx="4" fill="#8f8e89" />
            <text x="20" y="68" fontSize="14" fill="#6d6c68" fontFamily={HEAD}>{a}</text>
            <text x="64" y="72" fontSize="14" fill="#6d6c68" fontFamily={HEAD}>{b}</text>
        </svg>
    );
}

function Frame({ ornate, h = 220 }) {
    const src = ornate ? IMG.doorMaharaja : IMG.doorPlain;
    if (src) return <img src={src} alt={ornate ? "Maharaja door frame" : "Plain door frame"} draggable={false} style={{ display: "block", height: h, width: "auto", filter: "drop-shadow(0 6px 8px rgba(20,34,74,.2))" }} />;
    return (
        <svg height={h} viewBox="0 0 60 200" aria-hidden="true">
            <rect x="14" y="8" width="30" height="184" fill="#e9ecea" />
            <rect x="8" y="30" width="12" height="160" fill="#f6f7f6" />
            <rect x="22" y="2" width="14" height="10" fill="#dfe3e1" />
            <rect x="20" y="30" width="24" height="160" fill="#eef0ef" stroke="#d5d9d7" />
            {ornate && (
                <g fill="none" stroke="#c9cfcc" strokeWidth="1.5">
                    <path d="M32 50 L40 70 L32 90 L24 70 Z" />
                    <path d="M32 120 L40 140 L32 160 L24 140 Z" />
                </g>
            )}
        </svg>
    );
}

/* ---------- Layout pieces ---------- */
function Page({ children, n, mobile }) {
    const { H } = useContext(StageCtx);
    return (
        <section style={{ position: "relative", minHeight: H, display: "flex", flexDirection: "column", background: "#fff", padding: mobile ? "28px 18px 14px" : "44px 56px 16px", borderTop: `10px solid ${C.navy}`, boxSizing: "border-box" }}>
            <div style={{ position: "absolute", top: -10, right: 0, width: "30%", height: 10, background: C.orange }} />
            <div style={{ flex: 1 }}>{children}</div>
            <footer style={{ marginTop: mobile ? 16 : 28, paddingTop: 16, borderTop: `1px solid ${C.line}`, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", fontSize: 13, color: C.text }}>
                <span>StructGuard Infra Products &amp; Services LLP</span>
                <span>www.structguard.in · 8956134733 · info@structguard.com</span>
                {n && <span>{n}</span>}
            </footer>
        </section>
    );
}

/* Scales a page down (never up) if its content is taller than the stage, so nothing ever scrolls */
function Fit({ H, children }) {
    const ref = useRef(null);
    const [k, setK] = useState(1);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const m = () => setK(Math.min(1, H / el.scrollHeight));
        m();
        const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(m) : null;
        ro && ro.observe(el);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(m);
        return () => ro && ro.disconnect();
    }, [H]);
    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#fff" }}>
            <div ref={ref} style={{ transform: `scale(${k})`, transformOrigin: "top center" }}>{children}</div>
        </div>
    );
}

/* Single-page flipbook: the top page curls over its LEFT edge and sweeps off to the left */
// function Book({ mobile, stage, children }) {
//     const { W, H, k } = stage;
//     const pages = React.Children.toArray(children);
//     const total = pages.length;
//     const [cur, setCur] = useState(0);
//     const [turn, setTurn] = useState({ i: -1, n: 0 });
//     const [hover, setHover] = useState(false);
//     const touch = useRef(null);
//     const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     const D = reduce ? 0.01 : FLIP;

//     const goTo = (n) => {
//         n = Math.max(0, Math.min(total - 1, n));
//         if (n === cur) return;
//         setTurn({ i: n > cur ? cur : n, n: turn.n + 1 });
//         setCur(n);
//     };
//     useEffect(() => {
//         const kd = (e) => {
//             if (e.key === "ArrowRight") goTo(cur + 1);
//             if (e.key === "ArrowLeft") goTo(cur - 1);
//         };
//         window.addEventListener("keydown", kd);
//         return () => window.removeEventListener("keydown", kd);
//     });

//     const face = { position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: "#fff" };
//     const s = hover ? (mobile ? 64 : 100) : mobile ? 36 : 56;
//     const btn = (off) => ({ background: off ? "#cfd5e2" : C.navy, color: "#fff", border: 0, borderRadius: 999, padding: mobile ? "10px 16px" : "12px 22px", fontFamily: BODY, fontWeight: 600, fontSize: 14, cursor: off ? "default" : "pointer" });

//     return (
//         <div style={{ height: "100dvh", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, overflow: "hidden", background: "#eef1f6" }}>
//             <div
//                 onTouchStart={(e) => (touch.current = [e.touches[0].clientX, e.touches[0].clientY])}
//                 onTouchEnd={(e) => {
//                     if (!touch.current) return;
//                     const dx = e.changedTouches[0].clientX - touch.current[0];
//                     const dy = e.changedTouches[0].clientY - touch.current[1];
//                     touch.current = null;
//                     if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(cur + (dx < 0 ? 1 : -1));
//                 }}
//                 style={{ position: "relative", width: W * k, height: H * k, overflow: "hidden", borderRadius: 8, background: "#dfe4ee", boxShadow: "0 20px 50px rgba(20,34,74,.25)", flex: "none" }}
//             >
//                 <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${k})`, transformOrigin: "top left", perspective: 2600, perspectiveOrigin: "20% 50%" }}>
//                     {pages.map((p, i) => {
//                         const flipped = i < cur;
//                         const shade = turn.i === i ? <div key={turn.n} className="sg-shade" style={{ animationDuration: `${D}s` }} /> : null;
//                         return (
//                             <div key={p.key} style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transformOrigin: "left center", transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)", transition: `transform ${D}s cubic-bezier(.6,.05,.25,1), visibility 0s linear ${flipped ? D : 0}s`, visibility: flipped ? "hidden" : "visible", zIndex: flipped ? total + i : total - i }}>
//                                 <div className={i === cur ? "sg-on" : ""} style={face}>
//                                     <PageCtx.Provider value={i === cur ? "active" : i < cur ? "past" : "future"}>
//                                         <Fit H={H}>{p}</Fit>
//                                     </PageCtx.Provider>
//                                     {shade}
//                                     {i === cur && i < total - 1 && (
//                                         <button aria-label="Next page" onClick={() => goTo(cur + 1)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
//                                             style={{ position: "absolute", right: 0, bottom: 0, width: s, height: s, border: 0, padding: 0, cursor: "pointer", background: `linear-gradient(315deg, ${C.navy} 0 50%, #c9cfdb 50%, #fafbfd 100%)`, filter: "drop-shadow(-3px -3px 5px rgba(0,0,0,.3))", transition: "width .3s ease, height .3s ease" }} />
//                                     )}
//                                 </div>
//                                 <div style={{ ...face, transform: "rotateY(180deg)", background: "linear-gradient(90deg,#dfe3ea,#f6f7fa 45%,#e3e6ed)" }}>{shade}</div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: mobile ? 10 : 18, height: 44, flex: "none" }}>
//                 <button style={btn(cur === 0)} disabled={cur === 0} onClick={() => goTo(cur - 1)}>‹ Prev</button>
//                 <div style={{ display: "flex", gap: 6, alignItems: "center" }} role="tablist" aria-label="Pages">
//                     {pages.map((p, i) => (
//                         <button key={p.key} aria-label={`Page ${i + 1}`} aria-selected={i === cur} onClick={() => goTo(i)}
//                             style={{ width: i === cur ? 24 : 9, height: 9, borderRadius: 9, border: 0, padding: 0, cursor: "pointer", background: i === cur ? C.orange : "#b8c0d2", transition: "width .3s ease, background .3s ease" }} />
//                     ))}
//                 </div>
//                 <button style={btn(cur === total - 1)} disabled={cur === total - 1} onClick={() => goTo(cur + 1)}>Next ›</button>
//             </div>
//         </div>
//     );
// }



function Book({ mobile, stage, children }) {
    const { W, H, k } = stage;
    const pages = React.Children.toArray(children);
    const total = pages.length;

    const bookRef = useRef(null);
    const [cur, setCur] = useState(0);
    const touch = useRef(null);

    // Navigate to a page
    const goTo = (n) => {
        const next = Math.max(0, Math.min(total - 1, n));

        if (next === cur) return;

        const flipBook = bookRef.current?.pageFlip?.();

        if (flipBook) {
            flipBook.flip(next);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "ArrowRight") goTo(cur + 1);
            if (e.key === "ArrowLeft") goTo(cur - 1);
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [cur, total]);

    // Navigation button styling
    const btn = (disabled) => ({
        background: disabled ? "#cfd5e2" : C.navy,
        color: "#fff",
        border: 0,
        borderRadius: 999,
        padding: mobile ? "10px 15px" : "12px 22px",
        fontFamily: BODY,
        fontWeight: 600,
        fontSize: 14,
        cursor: disabled ? "default" : "pointer",
        whiteSpace: "nowrap",
    });

    return (
        <div
            style={{
                minHeight: "100dvh",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                overflow: "hidden",
                padding: mobile ? "8px 4px" : 16,
                background: "#eef1f6",
            }}
        >
            {/* BOOK AREA */}
            <div
                onTouchStart={(e) => {
                    touch.current = [
                        e.touches[0].clientX,
                        e.touches[0].clientY
                    ];
                }}
                onTouchEnd={(e) => {
                    if (!touch.current) return;

                    const dx =
                        e.changedTouches[0].clientX - touch.current[0];

                    const dy =
                        e.changedTouches[0].clientY - touch.current[1];

                    touch.current = null;

                    if (
                        Math.abs(dx) > 55 &&
                        Math.abs(dx) > Math.abs(dy) * 1.4
                    ) {
                        goTo(cur + (dx < 0 ? 1 : -1));
                    }
                }}
                style={{
                    width: W * k,
                    height: H * k,
                    flex: "none",
                    overflow: "hidden",
                    borderRadius: 5,
                    background: "#fff",
                    boxShadow: "0 20px 55px rgba(20,34,74,.24)",
                }}
            >
                <div
                    style={{
                        width: W,
                        height: H,
                        transform: `scale(${k})`,
                        transformOrigin: "top left",
                    }}
                >
                    <HTMLFlipBook
                        ref={bookRef}
                        width={W}
                        height={H}
                        size="fixed"
                        minWidth={W}
                        maxWidth={W}
                        minHeight={H}
                        maxHeight={H}
                        drawShadow={true}
                        flippingTime={950}
                        usePortrait={true}
                        startPage={0}
                        startZIndex={0}
                        autoSize={false}
                        maxShadowOpacity={0.38}
                        showCover={false}
                        mobileScrollSupport={false}
                        clickEventForward={true}
                        useMouseEvents={true}
                        swipeDistance={28}
                        showPageCorners={true}
                        disableFlipByClick={false}
                        onFlip={(e) => setCur(e.data)}
                        style={{ margin: 0 }}
                        className="structguard-real-flipbook"
                    >
                        {pages.map((page, i) => (
                            <div
                                key={page.key ?? i}
                                className="sg-real-paper-page"
                                style={{
                                    width: W,
                                    height: H,
                                    overflow: "hidden",
                                    background: "#fff",
                                }}
                            >
                                <PageCtx.Provider
                                    value={
                                        i === cur
                                            ? "active"
                                            : i < cur
                                                ? "past"
                                                : "future"
                                    }
                                >
                                    <Fit H={H}>
                                        {page}
                                    </Fit>
                                </PageCtx.Provider>
                            </div>
                        ))}
                    </HTMLFlipBook>
                </div>
            </div>

            {/* PAGE NAVIGATION */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: mobile ? 8 : 18,
                    minHeight: 44,
                    flex: "none",
                    maxWidth: "100%",
                }}
            >
                <button
                    style={btn(cur === 0)}
                    disabled={cur === 0}
                    onClick={() => goTo(cur - 1)}
                >
                    ‹ Prev
                </button>

                {/* PAGE DOTS */}
                <div
                    style={{
                        display: "flex",
                        gap: mobile ? 4 : 6,
                        alignItems: "center",
                    }}
                    role="tablist"
                    aria-label="Brochure pages"
                >
                    {pages.map((page, i) => (
                        <button
                            key={page.key ?? i}
                            aria-label={`Page ${i + 1}`}
                            aria-selected={i === cur}
                            onClick={() => goTo(i)}
                            style={{
                                width: i === cur ? 23 : 8,
                                height: 8,
                                borderRadius: 9,
                                border: 0,
                                padding: 0,
                                cursor: "pointer",
                                background:
                                    i === cur
                                        ? C.orange
                                        : "#b8c0d2",
                                transition:
                                    "width .25s ease, background .25s ease",
                            }}
                        />
                    ))}
                </div>

                <button
                    style={btn(cur === total - 1)}
                    disabled={cur === total - 1}
                    onClick={() => goTo(cur + 1)}
                >
                    Next ›
                </button>


                <a
                    href={`${process.env.PUBLIC_URL}/StructGuard_Brochure.pdf`}
                    download="StructGuard_Brochure.pdf"
                    style={{
                        background: C.orange,
                        color: "#fff",
                        border: "none",
                        borderRadius: 999,
                        padding: mobile ? "10px 14px" : "12px 20px",
                        fontFamily: BODY,
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                    }}
                >
                    <span>↓</span>
                    Download Brochure
                </a>

            </div>

            {/* REAL PAPER FLIP STYLING */}
            <style>{`
                .structguard-real-flipbook {
                    margin: 0 auto !important;
                    overflow: visible !important;
                }

                .structguard-real-flipbook .stf__parent {
                    overflow: visible !important;
                }

                .structguard-real-flipbook .stf__block {
                    box-shadow: none !important;
                }

                .sg-real-paper-page {
                    background: #fff;
                    box-shadow:
                        inset 0 0 1px rgba(20,34,74,.12);
                }

                @media (prefers-reduced-motion: reduce) {
                    .structguard-real-flipbook {
                        scroll-behavior: auto;
                    }
                }
            `}</style>
        </div>
    );
}



const Eyebrow = ({ children }) => (
    <div style={{ color: C.orange, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>{children}</div>
);
const H2 = ({ children, mobile }) => (
    <h2 style={{ fontFamily: HEAD, fontWeight: 800, color: C.navy, fontSize: mobile ? 30 : 46, lineHeight: 1.1, margin: "0 0 16px" }}>{children}</h2>
);
const hoverLift = {
    onMouseEnter: (e) => (e.currentTarget.style.transform = "translateY(-4px)"),
    onMouseLeave: (e) => (e.currentTarget.style.transform = "none"),
};
const card = { background: C.soft, borderRadius: 18, padding: 24, transition: "transform .25s ease" };

const Scroll = ({ children }) => <div>{children}</div>;

/* ---------- Main ---------- */
export default function StructGuardBrochure({ heroImage = IMG.factory }) {
    const stage = useStage();
    const mobile = stage.W < 700;
    const tablet = stage.W < 1000;

    return (
        <div style={{ fontFamily: BODY, color: C.navy, background: "#eef1f6", WebkitFontSmoothing: "antialiased" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800&display=swap');
        @keyframes sgRise { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:none } }
        @keyframes sgWipe { from { clip-path: circle(0% at 100% 100%) } to { clip-path: circle(150% at 100% 100%) } }
        @keyframes sgBar { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes sgFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        .sg-on .sg-hero-line { animation: sgRise .8s cubic-bezier(.2,.7,.2,1) both }
        .sg-on .sg-hero-img { animation: sgWipe 1.4s cubic-bezier(.6,.05,.2,1) .2s both }
        .sg-bar { transform-origin: left }
        .sg-on .sg-bar { animation: sgBar 1s ease .1s both }
        @keyframes sgShade { 0% { opacity: 0 } 50% { opacity: .55 } 100% { opacity: 0 } }
        .sg-shade { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, rgba(20,34,74,.6), rgba(20,34,74,0) 75%); animation: sgShade 1.1s ease-in-out both }
        button:focus-visible { outline: 3px solid ${C.orange}; outline-offset: 2px }
        .sg-float { animation: sgFloat 4s ease-in-out infinite }
        .sg-row { transition: background .2s ease }
        .sg-row:hover { background: ${C.soft} }
        @media (prefers-reduced-motion: reduce) {
          .sg-hero-line,.sg-hero-img,.sg-bar,.sg-float { animation: none !important }
          .sg-reveal { transition: none !important; opacity: 1 !important; transform: none !important }
        }


/* REALISTIC BOOK ENVIRONMENT */

.sg-realbook {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    overflow: hidden;
    background:
        radial-gradient(
            ellipse at center,
            #ffffff 0%,
            #edf0f6 65%,
            #dce2ec 100%
        );
}

/* BOOK STAGE */

.sg-book-stage {
    position: relative;
    isolation: isolate;
    transform-style: preserve-3d;
    perspective: 2500px;
}

/* PAPER FRONT */

.sg-paper-front,
.sg-paper-back {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: white;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

/* PAPER BACK */

.sg-paper-back {
    transform: rotateY(180deg);
}

/* REALISTIC PAGE SHADOW */

.sg-paper-shadow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
        90deg,
        rgba(0,0,0,.32),
        rgba(0,0,0,.12) 12%,
        transparent 45%,
        rgba(0,0,0,.05)
    );
    opacity: .8;
    mix-blend-mode: multiply;
}

.sg-paper-shadow-back {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
        270deg,
        rgba(0,0,0,.22),
        rgba(0,0,0,.06) 25%,
        transparent 70%
    );
}

/* NEXT PAGE: RIGHT TO LEFT */

.sg-turn-next {
    animation: sgRealFlipNext 1s
        cubic-bezier(.645,.045,.355,1) both;
}

/* PREVIOUS PAGE: LEFT TO RIGHT */

.sg-turn-prev {
    animation: sgRealFlipPrev 1s
        cubic-bezier(.645,.045,.355,1) both;
}

@keyframes sgRealFlipNext {
    0% {
        transform: rotateY(0deg);
        filter: brightness(1);
    }

    35% {
        filter: brightness(.82);
    }

    65% {
        filter: brightness(.94);
    }

    100% {
        transform: rotateY(-180deg);
        filter: brightness(1);
    }
}

@keyframes sgRealFlipPrev {
    0% {
        transform: rotateY(0deg);
        filter: brightness(1);
    }

    35% {
        filter: brightness(.82);
    }

    65% {
        filter: brightness(.94);
    }

    100% {
        transform: rotateY(180deg);
        filter: brightness(1);
    }
}

/* NAVIGATION */

.sg-book-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 44px;
}

.sg-book-dots {
    display: flex;
    align-items: center;
    gap: 7px;
}

/* MOBILE */

@media(max-width:600px) {
    .sg-realbook {
        gap: 8px;
        padding: 8px 4px;
        box-sizing: border-box;
    }

    .sg-book-controls {
        gap: 7px;
    }

    .sg-book-controls button {
        font-size: 11px !important;
        padding: 8px 11px !important;
    }
}

/* ACCESSIBILITY */

@media(prefers-reduced-motion:reduce) {
    .sg-turn-next,
    .sg-turn-prev {
        animation-duration: .01ms;
    }
}

      `}</style>

            <StageCtx.Provider value={stage}>
                <Book mobile={mobile} stage={stage}>
                    {/* ---------- 1. Hero ---------- */}
                    <Page mobile={mobile}>
                        <div className="sg-bar" style={{ position: "absolute", top: -10, left: 0, right: "30%", height: 10, background: C.navy }} />
                        <div style={{ display: "flex", flexDirection: tablet ? "column" : "row", gap: tablet ? 28 : 40, alignItems: "stretch" }}>
                            <div style={{ flex: "1 1 50%", minWidth: 0 }}>
                                <div className="sg-hero-line" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 26, letterSpacing: 1 }}>
                                    Struct<span style={{ color: C.orange }}>Guard</span>{" "}
                                    <span style={{ fontFamily: BODY, fontWeight: 500, fontSize: 11, letterSpacing: "0.2em", color: C.text }}>INFRA PRODUCTS &amp; SERVICES LLP</span>
                                </div>
                                <div className="sg-hero-line" style={{ animationDelay: ".1s", marginTop: mobile ? 20 : 32 }}><Eyebrow>Precast concrete products</Eyebrow></div>
                                {["Cover blocks", "& door", "frames, built", "to last."].map((t, i) => (
                                    <div key={t} className="sg-hero-line" style={{ animationDelay: `${0.2 + i * 0.12}s`, fontFamily: HEAD, fontWeight: 800, fontSize: mobile ? 46 : 76, lineHeight: 1.0 }}>{t}</div>
                                ))}
                                <p className="sg-hero-line" style={{ animationDelay: ".8s", color: C.text, fontSize: mobile ? 16 : 19, lineHeight: 1.6, maxWidth: 480, margin: "24px 0" }}>
                                    High-strength precast concrete cover blocks, spacers and door frames, made at our 30,000 sq ft Pune facility and supplied across India.
                                </p>
                                <div className="sg-hero-line" style={{ animationDelay: ".95s", display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {[["MAKE IN INDIA", C.navy, "#fff"], ["ISO 9001:2015", C.orange, "#fff"], ["GRADE M40 DOOR FRAMES", C.soft, C.navy]].map(([t, bg, fg]) => (
                                        <span key={t} style={{ background: bg, color: fg, fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", padding: "12px 16px" }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ flex: "1 1 50%", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                                <img className="sg-hero-line" src={IMG.logo} alt="StructGuard — IAF, Make in India, ISO 9001 certified" draggable={false} style={{ animationDelay: ".3s", display: "block", width: "100%", maxWidth: mobile ? 300 : 440, height: "auto", alignSelf: tablet ? "flex-start" : "flex-end" }} />
                                <div className="sg-hero-img" style={{ flex: 1, minHeight: mobile ? 170 : 340, borderRadius: tablet ? 24 : "60% 0 0 0", overflow: "hidden", background: heroImage ? `url(${heroImage}) center/cover` : `linear-gradient(135deg,#b9c6d8,#e5e9ef 50%,#8f8a7a)` }}>
                                    {!heroImage && <div style={{ padding: 24, color: C.navy, opacity: 0.6, fontSize: 13 }}>Pass a <code>heroImage</code> prop (factory photo URL)</div>}
                                </div>
                            </div>
                        </div>
                    </Page>

                    {/* ---------- 2. Why cover blocks ---------- */}
                    <Page n={2} mobile={mobile}>
                        <Reveal>
                            <Eyebrow>Why cover blocks</Eyebrow>
                            <H2 mobile={mobile}>A few millimetres of concrete decide how long a structure lasts.</H2>
                            <p style={{ color: C.text, fontSize: mobile ? 14 : 17, lineHeight: 1.5, maxWidth: 820, margin: 0 }}>
                                Cover blocks hold reinforcement at the exact distance from the formwork, so concrete fully surrounds every bar once poured. Without them, bars sag, touch the shuttering or end up exposed.
                            </p>
                        </Reveal>
                        <div style={{ display: "grid", gridTemplateColumns: mobile || tablet ? "1fr 1fr" : "repeat(3,1fr)", gap: mobile ? 10 : 14, marginTop: 16 }}>
                            {WHY.map(([t, d], i) => (
                                <Reveal key={t} delay={(i % 3) * 0.08}>
                                    <div style={{ ...card, padding: mobile ? 12 : 20, height: "100%", boxSizing: "border-box" }} {...hoverLift}>
                                        <div style={{ fontFamily: HEAD, fontWeight: 800, color: C.orange, fontSize: mobile ? 28 : 36 }}>{String(i + 1).padStart(2, "0")}</div>
                                        <h3 style={{ fontFamily: HEAD, fontSize: mobile ? 20 : 25, margin: "2px 0 6px" }}>{t}</h3>
                                        <p style={{ color: C.text, lineHeight: 1.5, margin: 0, fontSize: mobile ? 12.5 : 14.5 }}>{d}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                        <Reveal>
                            <div style={{ background: C.navy, color: "#fff", borderRadius: 16, padding: "18px 24px", marginTop: 16, fontSize: 15, lineHeight: 1.5 }}>
                                <b style={{ color: "#ffb48a" }}>Without proper cover:</b> exposed or poorly covered steel rusts early, concrete spalls, repair costs rise and the building's life and safety are at risk.
                            </div>
                        </Reveal>
                    </Page>

                    {/* ---------- 3. Cover guide ---------- */}
                    <Page n={3} mobile={mobile}>
                        <Reveal>
                            <Eyebrow>Cover guide &amp; how to use</Eyebrow>
                            <H2 mobile={mobile}>Choose the right block, place it right.</H2>
                        </Reveal>
                        <div style={{ display: "flex", flexDirection: tablet ? "column" : "row", gap: 40, marginTop: 16 }}>
                            <Reveal style={{ flex: 1, minWidth: 0 }}>
                                <Scroll min={420}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1.6fr", background: C.navy, color: "#fff", fontWeight: 600, padding: "16px 18px" }}>
                                        <span>Element</span><span>Typical cover</span><span>Our block</span>
                                    </div>
                                    {COVER.map(([a, b, c]) => (
                                        <div key={a} className="sg-row" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1.6fr", padding: "16px 18px", borderBottom: `1px solid ${C.line}`, fontWeight: 500 }}>
                                            <span>{a}</span><span style={{ color: C.text }}>{b}</span><span style={{ color: C.orange, fontWeight: 700 }}>{c}</span>
                                        </div>
                                    ))}
                                </Scroll>
                                <p style={{ color: C.text, fontSize: 13, lineHeight: 1.6, marginTop: 16 }}>
                                    Indicative values for mild exposure, in line with common practice under IS 456. Always follow the cover specified in your structural drawings and project code for the element and exposure condition.
                                </p>
                            </Reveal>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <Reveal><h3 style={{ fontFamily: HEAD, fontSize: 30, margin: "0 0 16px" }}>Using cover blocks correctly</h3></Reveal>
                                {STEPS.map(([t, d], i) => (
                                    <Reveal key={t} delay={i * 0.08}>
                                        <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                                            <div style={{ flex: "0 0 40px", height: 40, borderRadius: "50%", background: C.orange, color: "#fff", fontFamily: HEAD, fontWeight: 800, fontSize: 22, display: "grid", placeItems: "center" }}>{i + 1}</div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: 17 }}>{t}</div>
                                                <div style={{ color: C.text, lineHeight: 1.5, fontSize: 15 }}>{d}</div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </Page>

                    {/* ---------- 4. Product range ---------- */}
                    <Page n={4} mobile={mobile}>
                        <Reveal>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
                                <div><Eyebrow>Product range</Eyebrow><H2 mobile={mobile}>Concrete cover blocks &amp; spacers</H2></div>
                                <div style={{ color: C.text, fontSize: 15, maxWidth: 240 }}>Excellent strength, consistent size, custom sizes on request.</div>
                            </div>
                        </Reveal>
                        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : tablet ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: mobile ? 10 : 14, marginTop: 12 }}>
                            {RANGE.map(([t, n, d, k, l], i) => (
                                <Reveal key={t} delay={(i % 4) * 0.07}>
                                    <div style={{ ...card, textAlign: "center", padding: mobile ? 14 : 24, height: "100%", boxSizing: "border-box" }} {...hoverLift}>
                                        <div style={{ height: mobile ? 72 : 96, display: "grid", placeItems: "center" }}><div className="sg-float" style={{ animationDelay: `${i * 0.3}s` }}><Shape kind={k} label={l} size={mobile ? 66 : 92} /></div></div>
                                        <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", marginTop: 12 }}>{t}</div>
                                        <div style={{ fontFamily: HEAD, fontSize: mobile ? 20 : 26, fontWeight: 800 }}>{n}</div>
                                        <div style={{ color: C.text, fontSize: 14, lineHeight: 1.5 }}>{d}</div>
                                    </div>
                                </Reveal>
                            ))}
                            <Reveal delay={0.3}>
                                <div style={{ ...card, background: C.navy, color: "#fff", height: "100%", boxSizing: "border-box", padding: mobile ? 16 : 24 }} {...hoverLift}>
                                    <h3 style={{ fontFamily: HEAD, fontSize: mobile ? 22 : 30, margin: "0 0 10px", lineHeight: 1.1 }}>Why StructGuard blocks</h3>
                                    <p style={{ lineHeight: 1.6, margin: 0, fontSize: 14, color: "#dbe2f1" }}>Quality-checked raw material, periodic concrete cube testing at partner labs, and bulk supply with on-time delivery.</p>
                                </div>
                            </Reveal>
                        </div>
                    </Page>

                    {/* ---------- 5. Product specifications ---------- */}
                    <Page n={5} mobile={mobile}>
                        <Reveal><Eyebrow>Technical data · Cover blocks</Eyebrow><H2 mobile={mobile}>Product specifications</H2></Reveal>
                        <Reveal>
                            {mobile ? (
                                <div>
                                    <div style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 10, background: C.navy, color: "#fff", fontWeight: 600, fontSize: 13, padding: "12px 10px" }}>
                                        <span>Photo</span><span>Code · Product · Size</span><span>Per bag</span>
                                    </div>
                                    {SPECS.map(([k, code, p, sz, pk, lb]) => (
                                        <div key={code} className="sg-row" style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 10, alignItems: "center", padding: "6px 10px", borderBottom: `1px solid ${C.line}` }}>
                                            <Shape kind={k} label={lb} size={42} />
                                            <div><div style={{ color: C.orange, fontWeight: 700, fontSize: 14 }}>{code}</div><div style={{ fontSize: 12.5 }}><b>{p}</b> · {sz}</div></div>
                                            <b style={{ fontSize: 12.5 }}>{pk}</b>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Scroll>
                                    <div style={{ display: "grid", gridTemplateColumns: "90px 1.2fr 1.4fr 1.3fr 1.2fr 1fr 1.2fr", background: C.navy, color: "#fff", fontWeight: 600, fontSize: 14, padding: "14px 12px", gap: 8 }}>
                                        <span>Photo</span><span>Product code</span><span>Product</span><span>Size</span><span>Max rebar dia. (mm)</span><span>Min breaking load (N)</span><span style={{ textAlign: "center" }}>Packaging per bag</span>
                                    </div>
                                    {SPECS.map(([k, code, p, sz, pk, lb]) => (
                                        <div key={code} className="sg-row" style={{ display: "grid", gridTemplateColumns: "90px 1.2fr 1.4fr 1.3fr 1.2fr 1fr 1.2fr", alignItems: "center", padding: "6px 12px", gap: 8, borderBottom: `1px solid ${C.line}`, fontSize: 15 }}>
                                            <Shape kind={k} label={lb} size={52} />
                                            <span style={{ color: C.orange, fontWeight: 700 }}>{code}</span>
                                            <b>{p}</b><span>{sz}</span><span>–</span><span>–</span>
                                            <b style={{ textAlign: "center" }}>{pk}</b>
                                        </div>
                                    ))}
                                </Scroll>
                            )}
                        </Reveal>
                        <p style={{ color: C.text, fontSize: 13, marginTop: 12 }}>Specifications are subject to batch and manufacturing tolerances. Contact us for test certificates and custom requirements.</p>
                    </Page>

                    {/* ---------- 6. Door frames ---------- */}
                    <Page n={6} mobile={mobile}>
                        <div style={{ display: "flex", flexDirection: tablet ? "column" : "row", gap: 32 }}>
                            <div style={{ flex: 1.3, minWidth: 0 }}>
                                <Reveal>
                                    <Eyebrow>Concrete door frames</Eyebrow>
                                    <H2 mobile={mobile}>Strong, termite-free frames for your home.</H2>
                                    <p style={{ color: C.text, fontSize: mobile ? 14 : 17, lineHeight: 1.5, margin: 0 }}>High-strength Grade M40 precast frames, fast to fit, with no loss or damage in storage.</p>
                                </Reveal>
                                <Reveal>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: mobile ? "6px 12px" : "10px 24px", margin: "12px 0 18px", fontSize: mobile ? 13.5 : 16, fontWeight: 500 }}>
                                        {FEATURES.map((f) => <div key={f}><span style={{ color: C.orange, marginRight: 8 }}>✓</span>{f}</div>)}
                                    </div>
                                </Reveal>
                                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: mobile ? 10 : 16 }}>
                                    <Reveal><div style={{ ...card, padding: mobile ? 12 : 20 }}><h3 style={{ fontFamily: HEAD, fontSize: mobile ? 19 : 24, margin: "0 0 6px" }}>Plain frame · 4-inch width</h3>{["2.5", "3", "3.25", "3.5"].map((x) => <div key={x} style={{ color: C.text, lineHeight: 1.8 }}>7 ft × {x} ft</div>)}</div></Reveal>
                                    <Reveal delay={0.1}><div style={{ ...card, padding: mobile ? 12 : 20 }}><h3 style={{ fontFamily: HEAD, fontSize: mobile ? 19 : 24, margin: "0 0 6px" }}>Maharaja frame · 5-inch width</h3>{["3", "3.5"].map((x) => <div key={x} style={{ color: C.text, lineHeight: 1.8 }}>7 ft × {x} ft</div>)}</div></Reveal>
                                </div>
                            </div>
                            <div style={{ flex: 1, minWidth: 0, display: "flex", gap: 16, justifyContent: "center" }}>
                                {[["Plain", false], ["Maharaja", true]].map(([n, o], i) => (
                                    <Reveal key={n} delay={i * 0.15}>
                                        <div style={{ textAlign: "center" }}>
                                            <div style={{ ...card, display: "grid", placeItems: "center", padding: mobile ? "10px 16px" : "20px 28px" }} {...hoverLift}><Frame ornate={o} h={mobile ? 130 : 280} /></div>
                                            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 22, marginTop: 10 }}>{n}</div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                        <Reveal>
                            <div style={{ background: C.navy, color: "#fff", borderRadius: 18, padding: mobile ? "14px 16px" : "20px 28px", marginTop: mobile ? 16 : 24, display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: mobile ? 10 : 20, fontSize: mobile ? 12.5 : 14, lineHeight: 1.6 }}>
                                <div><b style={{ color: "#ffb48a" }}>Pune Office</b><br />418, Platinum 9, Pashan-Sus Road, Baner, Pune MH-411045</div>
                                <div><b style={{ color: "#ffb48a" }}>Factory</b><br />Sr no 715, Satavwadi, Lavale, Mulshi, Pune MH-412115</div>
                                <div><b style={{ color: "#ffb48a" }}>Contact</b><br />Mob 8956134733 · Office 8956134732<br />GSTN 27AFBFS2382B1Z8</div>
                            </div>
                        </Reveal>
                    </Page>

                    {/* ---------- 7. Door frame specs ---------- */}
                    <Page n={7} mobile={mobile}>
                        <Reveal><Eyebrow>Technical data · Door frames</Eyebrow><H2 mobile={mobile}>Door frame specifications</H2></Reveal>
                        <div style={{ display: "flex", flexDirection: tablet ? "column" : "row", gap: 32, alignItems: "flex-start" }}>
                            <Reveal style={{ flex: 1, minWidth: 0, width: "100%" }}>
                                {mobile ? (
                                    <div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.8fr 1fr", background: C.navy, color: "#fff", fontWeight: 600, fontSize: 13, padding: "12px 10px", gap: 8 }}>
                                            <span>Code</span><span>Product</span><span>H × W</span>
                                        </div>
                                        {FRAMES.map(([c, pr, h, wd]) => (
                                            <div key={c} className="sg-row" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.8fr 1fr", padding: "9px 10px", gap: 8, borderBottom: `1px solid ${C.line}`, fontSize: 12.5 }}>
                                                <span style={{ color: C.orange, fontWeight: 700 }}>{c}</span><b>{pr.replace(" section", "")}</b><span>{h} × {wd}</span>
                                            </div>
                                        ))}
                                        <p style={{ color: C.text, fontSize: 12.5, margin: "10px 0 0" }}>Grade M40 · 1 pc per pack</p>
                                    </div>
                                ) : (
                                    <Scroll>
                                        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 2.2fr .7fr .8fr .6fr 1fr", background: C.navy, color: "#fff", fontWeight: 600, fontSize: 14, padding: "14px 12px", gap: 8 }}>
                                            <span>Product code</span><span>Product</span><span>Height</span><span>Width</span><span>Grade</span><span style={{ textAlign: "center" }}>Packaging</span>
                                        </div>
                                        {FRAMES.map(([c, pr, h, wd]) => (
                                            <div key={c} className="sg-row" style={{ display: "grid", gridTemplateColumns: "1.1fr 2.2fr .7fr .8fr .6fr 1fr", padding: "10px 12px", gap: 8, borderBottom: `1px solid ${C.line}`, fontSize: 15 }}>
                                                <span style={{ color: C.orange, fontWeight: 700 }}>{c}</span><b>{pr}</b><span>{h}</span><span>{wd}</span><span>M40</span><b style={{ textAlign: "center" }}>1 pc</b>
                                            </div>
                                        ))}
                                    </Scroll>
                                )}
                                <p style={{ color: C.text, fontSize: 13, marginTop: 24 }}>Weatherproof, corrosion resistant, termite free. Custom colours and finishes available on request.</p>
                            </Reveal>
                            <div style={{ display: "flex", gap: 16, alignSelf: tablet ? "center" : "flex-start" }}>
                                {[false, true].map((o) => <div key={String(o)} style={{ ...card, padding: "16px 22px" }}><Frame ornate={o} h={mobile ? 150 : 230} /></div>)}
                            </div>
                        </div>
                    </Page>
                </Book>
            </StageCtx.Provider>
        </div>
    );
}