import { useEffect, useRef, useState } from "react";
import { HashRouter, Routes, Route, Link, NavLink, Navigate, useLocation, useParams } from "react-router-dom";
import { SERVICES, P, STATS, ABOUT, WHY, TH, ABOUT_HOME, STORY, MISSION, VISION, VALUES, STEPS } from "./data";
import { PD } from "./productData";
import ServicePage from "./pages/ServicePage";
import ErpPage from "./pages/ErpPage";
import HrmsPage from "./pages/HrmsPage";
import AccountingPage from "./pages/AccountingPage";
import ChatbotPage from "./pages/ChatbotPage";
import ProjectManagementPage from "./pages/ProjectManagementPage";
import TaskManagementPage from "./pages/TaskManagementPage";
import ProSolutionsPage from "./pages/ProSolutionsPage";

// CONTACT FORM: paste your Formspree link here to receive the messages by email (example: "https://formspree.io/f/abcdwxyz").
// While this is empty the form runs in demo mode: it shows the success message but does not send anything.
const FORM_ENDPOINT = "";
const PHONE = "+91 8891904007";
const WA = "918891904007";

const cn = (base) => ({ isActive }) => base + (isActive ? " on" : "");

// Scrolling animation: sections fade/slide in as you scroll, plus a top progress bar
function ScrollFx() {
  const { pathname } = useLocation();
  const bar = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, p)})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sel = ".sec .wrap > h2, .sec .wrap > .sub, .sec .wrap > .grid > *, .sec .wrap > .pcx-grid > *, .sec .wrap > .cards4 > *, .sec .wrap > .steps > *, .sec .wrap > .mv > *, .sec .split > *, .sec .mv1 > *, .cta, .abhero .wrap > *";
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("in");
      io.unobserve(el);
      setTimeout(() => { el.classList.remove("rv", "in"); el.style.removeProperty("--d"); }, 1500);
    }), { threshold: 0.12 });
    const t = setTimeout(() => {
      document.querySelectorAll(sel).forEach((el) => {
        const k = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.setProperty("--d", Math.min(k, 6) * 0.09 + "s");
        el.classList.add("rv");
        io.observe(el);
      });
    }, 60);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [pathname]);
  return <div className="sprog" ref={bar} />;
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(null);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(null); setMenu(false); }, [pathname]);
  useEffect(() => {
    const close = (e) => { if (!e.target.closest(".dd")) setOpen(null); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  const dd = (k, label, items) => (
    <div className={"dd" + (open === k ? " open" : "")}>
      <button className="l" onClick={() => setOpen(open === k ? null : k)}>{label} <span className="cr">⌄</span></button>
      <div className="menu">{items}</div>
    </div>
  );
  return (
    <>
      <header><div className="wrap bar">
        {/* Replace with: <img src="/logo.png" alt="Mosbee" height="40" /> */}
        <Link className="logo" to="/"><i>M</i>MOSBEE</Link>
        <button className="burger" aria-expanded={menu} onClick={() => setMenu(!menu)}>Menu</button>
        <nav className={menu ? "show" : ""}>
          <NavLink className={cn("l")} to="/" end>Home</NavLink>
          <NavLink className={cn("l")} to="/about">About us</NavLink>
          {dd("s", "Our services", SERVICES.map((s) => <Link key={s.id} to={"/services/" + s.id}>{s.name}</Link>))}
          {dd("p", "Products", P.map((p) => <NavLink key={p.id} to={"/" + p.id} className={cn("")}>{p.name}</NavLink>))}
          <NavLink className={cn("l")} to="/contact">Contact us</NavLink>
        </nav>
      </div></header>
    </>
  );
}

// Home intro: hero + dashboard image + content + hexagon diagram + demo form, all on ONE continuous white page.
// Photos go in /public: demo.png (dashboard shot). Optional per product: erp.png, hrms.png, chatbot.png ...
// All styles are inside this file (classes start with hi-), so no other file is needed.
const HI_CSS = `
.hi{position:relative;overflow:hidden;background:#fff;color:#0a0a0a;--hb:#0b46d6;--hn:#0a1a4a;--hy:#ffc800;--hm:#4b5575;--hl:#dbe3f5;--hs:#f3f6ff}
.hi-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(720px 420px at 18% 0%,rgba(255,200,0,.20),transparent 70%),radial-gradient(820px 480px at 88% 6%,rgba(11,70,214,.15),transparent 70%),radial-gradient(900px 520px at 6% 70%,rgba(11,70,214,.08),transparent 70%)}
.hi-w{position:relative;max-width:1200px;margin:0 auto;padding:0 24px}
.hi-hero{text-align:center;padding-top:76px}
.hi-eyebrow{display:block;font-size:13px;font-weight:600;letter-spacing:.28em;color:var(--hm)}
.hi .hi-hero h1{font-size:clamp(38px,6vw,76px);line-height:1.05;letter-spacing:-.025em;margin:18px auto 20px;max-width:900px;color:var(--hn);font-weight:800}
.hi-hl{position:relative;background:linear-gradient(90deg,#0b46d6,#5b8dff);-webkit-background-clip:text;background-clip:text;color:transparent;z-index:0}
.hi-hl::after{content:"";position:absolute;left:0;right:0;bottom:3px;height:9px;background:var(--hy);opacity:.55;border-radius:4px;z-index:-1}
.hi-lead{font-size:19px;color:var(--hm);max-width:620px;margin:0 auto;min-height:30px;animation:hifade .5s ease}
@keyframes hifade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.hi-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:30px}
.hi-btn{display:inline-block;padding:15px 28px;border-radius:10px;font-weight:700;font-size:16px;text-decoration:none;border:1.5px solid transparent;transition:.2s;font-family:"Sora","Plus Jakarta Sans",system-ui,sans-serif;cursor:pointer}
.hi-pri{background:var(--hy);color:#0a0a0a;box-shadow:0 8px 22px rgba(255,200,0,.35)}
.hi-pri:hover{transform:translateY(-2px);background:#ffd633}
.hi-ghost{background:#fff;color:var(--hb);border-color:var(--hb)}
.hi-ghost:hover{background:var(--hs)}
.hi-tabs{list-style:none;margin:40px auto 0;padding:0;display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:920px}
.hi-tabs button{cursor:pointer;font:600 14px "Plus Jakarta Sans",system-ui,sans-serif;padding:9px 16px;border-radius:999px;border:1px solid var(--hl);background:#fff;color:var(--hm);transition:.2s}
.hi-tabs em{font-style:normal;font-size:12px;color:var(--hb);margin-right:6px}
.hi-tabs button:hover,.hi-tabs button.on{border-color:var(--hb);color:var(--hb);background:var(--hs)}

/* dashboard image in the middle */
.hi-demo{margin:36px auto 0;max-width:1040px;background:#fff;border:1px solid var(--hl);border-radius:18px;box-shadow:0 30px 80px rgba(11,70,214,.18);overflow:hidden}
.hi-shot{position:relative;aspect-ratio:16/8.6;background:linear-gradient(180deg,#f7f9ff,#eaf0ff);display:grid;place-items:center}
.hi-shot img{width:100%;height:100%;object-fit:cover;object-position:top left;display:block;animation:hifade .5s ease}
.hi-ph{width:86%;display:grid;grid-template-columns:1fr 2fr;gap:14px}
.hi-ph div{background:#fff;border:1px solid var(--hl);border-radius:12px;height:110px}
.hi-ph div:nth-child(2){grid-row:span 2;height:auto}
.hi-ph span{position:absolute;right:18px;bottom:14px;font-size:12px;color:var(--hm);background:#fff;border:1px solid var(--hl);padding:4px 10px;border-radius:999px}

/* content block */
.hi-copy{max-width:1100px;margin:0 auto;padding-top:90px}
.hi-copy p{font-size:18px;line-height:1.85;color:var(--hm);margin:0 0 20px}
.hi-copy p b{color:#1c2340;font-weight:600}
.hi-choose{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:34px 0 6px}
.hi-choose div{position:relative;background:#fff;border:1px solid var(--hl);border-radius:16px;padding:22px 24px 22px 70px;box-shadow:0 8px 24px rgba(11,70,214,.08)}
.hi-choose em{position:absolute;left:22px;top:22px;width:34px;height:34px;border-radius:10px;background:var(--hb);color:#fff;font-style:normal;font-weight:800;font-size:13px;display:grid;place-items:center}
.hi-choose h3{margin:0 0 6px;font-size:20px;color:var(--hn)}
.hi-choose p{margin:0;font-size:15px;line-height:1.6}
.hi-ticks{list-style:none;margin:38px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:14px 60px}
.hi-ticks li{display:flex;align-items:center;gap:14px;font-size:18px;color:#1c2340}
.hi-ticks li::before{content:"✓";flex:none;width:26px;height:26px;border-radius:50%;background:var(--hb);color:#fff;display:grid;place-items:center;font-size:14px;font-weight:800}

/* hexagons + form */
.hi-two{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;padding-top:100px;padding-bottom:110px}
.hi-hexbox{background:#0b0b0d;border-radius:24px;padding:36px 20px 40px;box-shadow:0 30px 70px rgba(10,26,74,.28)}
.hi-hexrow{display:flex;justify-content:center;gap:8px;margin-top:-12px}
.hi-hexrow:first-child{margin-top:0}
.hi-hex{position:relative;width:138px;height:160px;display:block;text-decoration:none;color:#fff;transition:transform .25s}
.hi-hex:hover{transform:translateY(-3px)}
.hi-hex::before,.hi-hex i{content:"";position:absolute;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)}
.hi-hex::before{inset:0;background:#3b3b40;transition:.3s}
.hi-hex i{inset:2px;background:#0f0f12;transition:.3s}
.hi-hex div{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:1;padding:0 12px}
.hi-hex em{font-style:normal;font-size:22px;color:#3d7bff;line-height:1;margin-bottom:7px;transition:.3s}
.hi-hex b{font:700 15px/1.1 "Sora",sans-serif}
.hi-hex span{font-size:12px;color:#9aa0b4;margin-top:3px;transition:.3s}
.hi-more{margin:22px 0 0;text-align:center;font-size:13px;letter-spacing:.12em;color:#8b92a8;text-transform:uppercase}
.hi-hex.on::before{background:#2563eb}
.hi-hex.on i{background:#2563eb}
.hi-hex.on em,.hi-hex.on span{color:#fff}
.hi-hex.core::before{background:#2563eb}
.hi-hex.core i{background:#0f0f12}
.hi-hex.core b{font-size:16px;letter-spacing:.02em}

.hi-form{background:#fff;border:1px solid var(--hl);border-radius:22px;padding:38px 36px;box-shadow:0 24px 60px rgba(11,70,214,.12)}
.hi .hi-form h2{font-size:clamp(30px,3.4vw,42px);color:var(--hb);margin:0 0 10px;font-weight:700;letter-spacing:-.01em}
.hi-form p.hi-fs{color:var(--hm);margin:0 0 22px;font-size:16px}
.hi-fg{display:grid;grid-template-columns:1fr 1fr;gap:6px 26px}
.hi-fg label{display:block;font-size:14px;color:#1c2340;padding-top:10px}
.hi-fg label i{color:#e53935;font-style:normal}
.hi-fg input,.hi-fg select{width:100%;border:0;border-bottom:1.5px solid var(--hl);padding:8px 0 10px;font:16px "Plus Jakarta Sans",system-ui,sans-serif;background:transparent;outline:none;color:#0a0a0a;border-radius:0}
.hi-fg input:focus,.hi-fg select:focus{border-bottom-color:var(--hb)}
.hi-chk{display:flex;gap:12px;align-items:flex-start;margin:22px 0;font-size:14px;color:var(--hm);line-height:1.5}
.hi-chk input{margin-top:3px;width:18px;height:18px;flex:none}
.hi-err{color:#c62828;font-size:14px;margin:0 0 12px}
.hi-ok{text-align:center;padding:30px 0}
.hi-ok h3{font-size:26px;color:var(--hb);margin:0 0 10px}
.hi-ok p{color:var(--hm);margin:0 0 20px}

@media (max-width:900px){
  .hi-hero{padding-top:48px}
  .hi-copy{padding-top:60px}
  .hi-ticks,.hi-choose{grid-template-columns:1fr}
  .hi-two{grid-template-columns:1fr;padding-top:70px}
  .hi-fg{grid-template-columns:1fr}
  .hi-hex{width:30%;height:auto;aspect-ratio:138/160}
}
`;

const HEX = [
  [["acc", "Accounts", "Finance", "₹", "/accounting"], ["erp", "ERP", "Operations", "▦", "/erp"], ["hrms", "HRMS", "People", "☺", "/hrms"]],
  [["crm", "CRM", "Sales", "↗", ""], ["core", "MOSBEE", "1 Shared DB", "", ""], ["pro", "PRO", "Power Tier", "★", "/pro-solutions"]],
  [["prj", "Projects", "Delivery", "◫", "/project-management"], ["bot", "Chatbot", "Support", "✉", "/chatbot"], ["tsk", "Tasks", "Delivery", "☑", "/task-management"]],
];
const HEX_ORDER = ["erp", "hrms", "acc", "crm", "pro", "tsk", "bot", "prj"];

function HexMap() {
  const [a, setA] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setA((n) => (n + 1) % HEX_ORDER.length), 2200);
    return () => clearInterval(t);
  }, []);
  const on = HEX_ORDER[a];
  return (
    <div className="hi-hexbox">
      {HEX.map((row, r) => (
        <div className="hi-hexrow" key={r}>
          {row.map(([k, name, sub, ic, to]) => {
            const cls = "hi-hex" + (k === "core" ? " core" : "") + (k === on ? " on" : "");
            const inner = <><i /><div>{ic && <em>{ic}</em>}<b>{name}</b><span>{sub}</span></div></>;
            return to
              ? <Link key={k} className={cls} to={to} onMouseEnter={() => setA(HEX_ORDER.indexOf(k))}>{inner}</Link>
              : <span key={k} className={cls}>{inner}</span>;
          })}
        </div>
      ))}
      <p className="hi-more">More modules coming soon</p>
    </div>
  );
}

function DemoForm() {
  const blank = { n: "", e: "", p: "", c: "", h: "", b: "" };
  const [f, setF] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (FORM_ENDPOINT) {
        const r = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ form: "Book a demo", name: f.n, email: f.e, phone: f.p, company: f.c, heard_from: f.h, main_business: f.b }),
        });
        if (!r.ok) throw new Error("send failed");
      } else {
        await new Promise((ok) => setTimeout(ok, 900)); // demo mode until FORM_ENDPOINT is set
      }
      setSent(f.n);
      setF(blank);
    } catch (x) {
      setErr("Sorry, we could not send your request. Please call or WhatsApp us instead.");
    } finally {
      setBusy(false);
    }
  };
  if (sent) {
    return (
      <div className="hi-form"><div className="hi-ok">
        <h3>Thank you, {sent}!</h3>
        <p>We have received your demo request and will contact you soon.</p>
        <button className="hi-btn hi-pri" type="button" onClick={() => setSent(null)}>Book another demo</button>
      </div></div>
    );
  }
  return (
    <form className="hi-form" onSubmit={send}>
      <h2>Book The Demo!</h2>
      <p className="hi-fs">To book your free product demo, please complete the form.</p>
      <div className="hi-fg">
        <div><label>Full Name <i>*</i></label><input required value={f.n} onChange={set("n")} /></div>
        <div><label>Email <i>*</i></label><input type="email" required value={f.e} onChange={set("e")} /></div>
        <div><label>Phone <i>*</i></label><input type="tel" required value={f.p} onChange={set("p")} /></div>
        <div><label>Company</label><input value={f.c} onChange={set("c")} /></div>
        <div><label>How did you hear about us?</label><input value={f.h} onChange={set("h")} /></div>
        <div><label>Main business?</label><input value={f.b} onChange={set("b")} /></div>
      </div>
      <label className="hi-chk"><input type="checkbox" /> Yes, send me updates about Mosbee products, services and events</label>
      {err && <p className="hi-err">{err}</p>}
      <button className="hi-btn hi-pri" type="submit" disabled={busy} style={{ cursor: busy ? "wait" : "pointer" }}>{busy ? "Sending..." : "Book my demo"}</button>
    </form>
  );
}

const TICKS = [
  "One unified product, many modules", "Use the full suite or single modules",
  "ERP and Accounts management", "HRMS and payroll",
  "CRM for customers and sales", "PRO for advanced business needs",
  "AI chatbot for customer support", "Project and task management",
  "One shared database across modules", "New modules added over time",
];

function HomeIntro() {
  const [i, setI] = useState(0);
  const [miss, setMiss] = useState({});
  // auto-change every 4 s, timer restarts when a tab is clicked
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % TH.length), 4000);
    return () => clearInterval(t);
  }, [i]);
  const id = TH[i][3];
  const p = P[i];
  // image order: /<id>.png  ->  /demo.png  ->  placeholder
  const step = miss[id] || 0;
  const src = step === 0 ? "/" + id + ".png" : step === 1 ? "/demo.png" : "";
  return (
    <section className="hi">
      <style>{HI_CSS}</style>
      <div className="hi-glow" aria-hidden="true" />

      {/* 1. HERO + image in the middle */}
      <div className="hi-w hi-hero">
        <span className="hi-eyebrow">ONE INTEGRATED BUSINESS MANAGEMENT SOLUTION</span>
        <h1>Software that handles the <span className="hi-hl">busywork.</span></h1>
        <p className="hi-lead" key={id}>{p.tag}</p>
        <div className="hi-btns">
          <Link className="hi-btn hi-pri" to={"/" + id}>Explore Solutions →</Link>
          <Link className="hi-btn hi-ghost" to="/contact">Contact Us</Link>
        </div>
        <ul className="hi-tabs">
          {TH.map((t, k) => (
            <li key={t[3]}>
              <button className={k === i ? "on" : ""} onClick={() => setI(k)}><em>{String(k + 1).padStart(2, "0")}</em>{t[4]}</button>
            </li>
          ))}
        </ul>
        <div className="hi-demo"><div className="hi-shot">
          {src ? (
            <img key={src} src={src} alt={p.name} onError={() => setMiss((m) => ({ ...m, [id]: (m[id] || 0) + 1 }))} />
          ) : (
            <div className="hi-ph"><div /><div /><div /><div /><span>Add /demo.png</span></div>
          )}
        </div></div>
      </div>

      {/* 2. ONE PRODUCT, MANY MODULES */}
      <div className="hi-w hi-copy">
        <p><b>Mosbee</b> is an integrated business management solution that brings multiple business modules together under a single product. Choosing the right software is not just about comparing features: the system needs to fit the way your company <b>actually works</b> and grow with you.</p>
        <p>It connects <b>ERP, Accounts, HRMS, CRM, PRO, Chatbot, Project Management and Task Management</b> on one shared database, so every team sees the same information and nobody enters the same data twice. More business modules will be added over time.</p>
        <div className="hi-choose">
          <div><em>01</em><h3>Complete solution</h3><p>Run your whole business on all Mosbee modules working together.</p></div>
          <div><em>02</em><h3>Individual modules</h3><p>Buy and use only the modules you need today, and add more when you grow.</p></div>
        </div>
        <ul className="hi-ticks">{TICKS.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>

      {/* 3. HEXAGON DIAGRAM + FORM */}
      <div className="hi-w hi-two">
        <HexMap />
        <DemoForm />
      </div>
    </section>
  );
}

const PageHead = ({ crumb, title, lead }) => (
  <section className="hero ph"><div className="wrap">
    <p className="crumb"><Link to="/">Home</Link> / {crumb}</p>
    <h1>{title}</h1>{lead && <p className="lead">{lead}</p>}
  </div></section>
);

const Cta = ({ t }) => (
  <div className="wrap" style={{ paddingBottom: 76 }}><div className="cta">
    <h2>{t}</h2><p>Tell us about your business and we will get back to you.</p>
    <div className="btns" style={{ justifyContent: "center" }}>
      <Link className="btn pri" to="/contact">Contact us</Link>
      <a className="btn cta-ghost" href="tel:+918891904007">Call +91 8891904007</a>
    </div>
  </div></div>
);

// Four panels in a row; the one you hover (or tap) opens up to show the details
function ServiceCards() {
  const [a, setA] = useState(0);
  return (
    <div className="sv">
      {SERVICES.map((x, i) => (
        <div key={x.id} className={"sv-i" + (i === a ? " on" : "")} style={{ "--sc": x.c }} tabIndex={0}
          onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)}>
          <span className="sv-n">{String(i + 1).padStart(2, "0")}</span>
          <div className="sv-ic">{x.icon}</div>
          <h3>{x.name}</h3>
          <div className="sv-more">
            <p>{x.d}</p>
            <ul>{(x.pts || []).map((t) => <li key={t}>{t}</li>)}</ul>
            <Link className="sv-go" to={"/services/" + x.id}>Learn more →</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

const ProductCards = ({ list = P }) => (
  <div className="grid">{list.map((p) => (
    <Link className="card" to={"/" + p.id} key={p.id}>
      <div className="ic2">{p.icon}</div><h3>{p.name}</h3><p>{p.tag}</p><span className="more">View product →</span>
    </Link>
  ))}</div>
);

// Product list on the left, big preview of the hovered product on the right
function ProductShowcase() {
  const [a, setA] = useState(0);
  const colourOf = (id, i) => (TH.find((t) => t[3] === id) || TH[i] || ["", "#04061a", "#3d9bff"]);
  const p = P[a];
  const [word, dark, neon] = colourOf(p.id, a);
  return (
    <div className="ps" style={{ "--pc": neon, "--pd": dark }}>
      <ul className="ps-list">
        {P.map((x, i) => (
          <li key={x.id}>
            <button className={i === a ? "on" : ""} style={{ "--pc": colourOf(x.id, i)[2] }}
              onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)}>
              <em>{String(i + 1).padStart(2, "0")}</em><span>{x.name}</span><i aria-hidden="true">→</i>
            </button>
          </li>
        ))}
      </ul>
      <div className="ps-view" key={p.id}>
        <div className="ps-word" aria-hidden="true">{word}</div>
        <div className="ps-ic">{p.icon}</div>
        <h3>{p.name}</h3>
        <p>{p.tag}</p>
        <ul>{(p.f || []).map((f) => <li key={f}>{f}</li>)}</ul>
        <div className="btns">
          <Link className="btn pri" to={"/" + p.id}>View product →</Link>
          <Link className="btn ps-ghost" to="/contact">Request a demo</Link>
        </div>
      </div>
    </div>
  );
}

// Big product cards: icon + name, description, "Explore ... ->" strip
function ProductBigCards() {
  const colourOf = (id, i) => (TH.find((t) => t[3] === id) || TH[i] || ["", "#04061a", "#3d9bff"])[2];
  return (
    <div className="pcx-grid">
      {P.map((p, i) => {
        const w = PD[p.id] && PD[p.id].what;
        const text = (Array.isArray(w) ? w[0] : w) || p.tag;
        return (
          <Link className="pcx" to={"/" + p.id} key={p.id} style={{ "--pc": colourOf(p.id, i) }}>
            <div className="pcx-top"><div className="pcx-ic">{p.icon}</div><h3>{p.name}</h3></div>
            <div className="pcx-body"><p>{text}</p></div>
            <div className="pcx-foot"><span>Explore <b>{p.name}</b></span><i aria-hidden="true">→</i></div>
          </Link>
        );
      })}
    </div>
  );
}

// "Our Products" grid: one Mosbee product, eight modules (card layout)
const MODULES = [
  { n: "ERP", t: "#e8f0ff", a: "#2f6bff", ic: "▦", to: "/erp", d: "Run every branch, factory and warehouse from one command centre. Multi-branch inventory, procurement, GRN and production control." },
  { n: "Accounts & POS", t: "#fff6d6", a: "#f5a400", ic: "₹", to: "/accounting", d: "Accounting and POS billing in one: fast counter checkout, GST invoicing, ledgers and reconciliation built in." },
  { n: "HRMS", t: "#e6f8ef", a: "#10a36a", ic: "☺", to: "/hrms", d: "Payroll day without the panic: attendance, leave, payslips, PF, ESI and TDS, onboarding and appraisals." },
  { n: "CRM", t: "#ffe9ef", a: "#e8457a", ic: "↗", to: "/contact", d: "Every lead captured, scored and followed up automatically, with a visual pipeline, quotes and handoffs." },
  { n: "PRO", t: "#efe9ff", a: "#7c4dff", ic: "★", to: "/pro-solutions", d: "The power tier for document tracking and renewals, so licences, IDs and permits are always planned ahead." },
  { n: "Chatbot", t: "#e3f6fb", a: "#0aa5c8", ic: "✉", to: "/chatbot", d: "Answer customers instantly on your website and apps, capture leads and hand over to your team when needed." },
  { n: "Projects", t: "#fff0e2", a: "#f07a1a", ic: "◫", to: "/project-management", d: "Plan, track and deliver projects on time with timelines, team collaboration and progress reports." },
  { n: "Tasks", t: "#f0f7dc", a: "#7aa80f", ic: "☑", to: "/task-management", d: "Assign, follow up and finish daily work with reminders, priorities and a clear view of who is doing what." },
];
const MOD_CSS = `
.hp{position:relative;background:transparent;padding:90px 0 100px}
.hp-w{max-width:1240px;margin:0 auto;padding:0 24px}
.hp h2{text-align:center;color:#0b46d6;font-size:clamp(32px,4vw,46px);margin:0 0 12px;font-weight:700;letter-spacing:-.01em}
.hp-sub{text-align:center;color:#4b5575;font-size:18px;max-width:700px;margin:0 auto 48px}
.hp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:26px}
.hp-card{background:linear-gradient(165deg,var(--t,#fff) 0%,#fff 62%)!important;display:flex;flex-direction:column;align-items:center;text-align:center;background:#fff;border-radius:16px;padding:34px 24px 26px;text-decoration:none;color:inherit;border:1px solid #eef1fa;box-shadow:0 6px 22px rgba(15,30,80,.12);transition:.25s}
.hp-card:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(11,70,214,.2);border-color:var(--a,#cfdcff)}
.hp-logo{display:flex;align-items:center;gap:10px;margin-bottom:22px;min-height:54px}
.hp-logo i{width:50px;height:50px;border-radius:14px;background:var(--a,#0b46d6);color:#fff;display:grid;place-items:center;font-style:normal;font-size:24px;box-shadow:0 8px 18px rgba(11,70,214,.3)}
.hp-logo b{font:800 22px/1 "Sora",sans-serif;color:#0a1a4a;letter-spacing:-.01em}
.hp-logo b span{color:#0b46d6}
.hp-card p{margin:0;font-size:16px;line-height:1.8;color:#4b5575;flex:1}
.hp-go{margin-top:18px;font-weight:700;font-size:14px;color:var(--a,#0b46d6)}
@media (max-width:1100px){.hp-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:600px){.hp-grid{grid-template-columns:1fr}}
`;
function ModuleGrid() {
  return (
    <section className="hp">
      <style>{MOD_CSS}</style>
      <div className="hp-w">
        <h2>Our Products</h2>
        <p className="hp-sub">One Mosbee product, eight modules. Use the complete solution or choose only the modules your business needs.</p>
        <div className="hp-grid">
          {MODULES.map((m) => (
            <Link className="hp-card" to={m.to} key={m.n} style={{ "--t": m.t, "--a": m.a }}>
              <div className="hp-logo"><i>{m.ic}</i><b>Mos<span>bee</span> {m.n}</b></div>
              <p>{m.d}</p>
              <span className="hp-go">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// "Benefits of Mosbee": two rows of 5; in each row one card is open (image + text), the others are narrow tabs
// Images: /public/benefit-1.jpg ... benefit-10.jpg (a gradient shows until you add them)
const BENEFITS = [
  ["User-friendly design", "We keep every screen simple and easy to navigate. Your team learns Mosbee quickly, needs less training and spends its time on real work instead of figuring out the software."],
  ["Use only what you need", "Mosbee is one product made of separate modules. Start with ERP, HRMS or any single module, or run the complete solution, and add more modules as your business grows."],
  ["Integration with your tools", "Connect Mosbee with the apps you already use, such as payments, messaging, e-commerce and third-party systems, so information flows without retyping."],
  ["Built-in business intelligence", "Dashboards and reports are part of every module. See sales, stock, people and project numbers in one place and make decisions from facts, not guesses."],
  ["Real-time data", "Everything your team does updates instantly across modules. Managers always see the current position of stock, accounts, leads and tasks, not last week's."],
  ["One shared database", "All modules work on the same data, so a customer, an item or an employee is entered once and used everywhere. Fewer errors, no duplicate work."],
  ["Enhanced productivity", "Automated workflows, reminders and approvals take repetitive tasks off your team. People focus on work that grows the business and spend less time on manual routines."],
  ["Reduce operating costs", "Fewer manual steps, fewer mistakes and one connected system instead of many separate tools help bring your running costs down."],
  ["Robust security", "Role-based access and careful handling of your data keep sensitive information protected, so each person sees only what they should."],
  ["Continuous support", "We train your team and stay with you after launch with updates, maintenance and help whenever you need it."],
];
const BEN_CSS = `
.bn{position:relative;padding:100px 0 110px;background:linear-gradient(180deg,#fff 0%,#eef4ff 18%,#eef4ff 82%,#fff 100%)}
.bn-w{max-width:1240px;margin:0 auto;padding:0 24px}
.bn h2{text-align:center;font-size:clamp(32px,4.2vw,52px);color:#0a1a4a;margin:0 0 12px;font-weight:800;letter-spacing:-.02em}
.bn-sub{text-align:center;color:#4b5575;font-size:18px;max-width:680px;margin:0 auto 44px}
.bn-row{display:flex;gap:18px;height:520px;margin-bottom:26px}
.bn-it{position:relative;overflow:hidden;background:#fff;border-radius:44px;border:2px solid #dbe8ff;box-shadow:0 8px 26px rgba(11,70,214,.08);cursor:pointer;transition:flex-basis .55s cubic-bezier(.3,.7,.2,1),box-shadow .3s;flex:0 0 78px}
.bn-it:hover{box-shadow:0 14px 34px rgba(11,70,214,.18)}
.bn-it.on{flex:1 1 0;cursor:default;border-radius:44px}
.bn-tab{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:18px;padding:0 0 18px;transition:opacity .25s}
.bn-tab span{writing-mode:vertical-rl;transform:rotate(180deg);font:700 19px "Sora","Plus Jakarta Sans",sans-serif;color:#0b46d6;white-space:nowrap}
.bn-n{flex:none;width:48px;height:48px;border-radius:50%;background:#f1f3f8;color:#0a1a4a;display:grid;place-items:center;font:700 18px "Sora",sans-serif}
.bn-it.on .bn-tab{opacity:0;pointer-events:none}
.bn-open{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;opacity:0;pointer-events:none;transition:opacity .35s ease}
.bn-it.on .bn-open{opacity:1;pointer-events:auto;transition-delay:.25s}
.bn-img{background-size:cover;background-position:center;border-radius:42px 0 0 42px;position:relative}
.bn-img b{position:absolute;left:20px;top:20px;width:46px;height:46px;border-radius:50%;background:#fff;color:#0b46d6;display:grid;place-items:center;font:800 17px "Sora",sans-serif;box-shadow:0 6px 16px rgba(0,0,0,.18)}
.bn-txt{display:flex;flex-direction:column;justify-content:center;padding:30px 44px 30px 38px;min-width:0}
.bn .bn-txt h3{margin:0 0 14px;font-size:clamp(24px,2.4vw,32px);color:#0b46d6;font-weight:700;line-height:1.2}
.bn-txt p{margin:0;font-size:17px;line-height:1.85;color:#1c2340}
@media (max-width:860px){
  .bn-row{flex-direction:column;height:auto}
  .bn-it{flex:0 0 66px!important;border-radius:33px;transition:flex-basis .5s}
  .bn-it.on{flex:0 0 auto!important}
  .bn-tab{flex-direction:row-reverse;justify-content:flex-end;align-items:center;padding:0 9px;gap:14px}
  .bn-tab span{writing-mode:horizontal-tb;transform:none;font-size:17px}
  .bn-n{width:46px;height:46px}
  .bn-it.on{height:auto}
  .bn-open{position:relative;grid-template-columns:1fr}
  .bn-img{min-height:210px;border-radius:30px 30px 0 0}
  .bn-txt{padding:24px 22px 28px}
}
`;
function BenefitRow({ start }) {
  const [a, setA] = useState(0);
  const items = BENEFITS.slice(start, start + 5);
  return (
    <div className="bn-row">
      {items.map((b, k) => {
        const n = start + k + 1;
        return (
          <div key={b[0]} className={"bn-it" + (k === a ? " on" : "")} onMouseEnter={() => setA(k)} onClick={() => setA(k)} tabIndex={0} onFocus={() => setA(k)}>
            <div className="bn-tab"><div className="bn-n">{n}</div><span>{b[0]}</span></div>
            <div className="bn-open">
              <div className="bn-img" style={{ backgroundImage: "url(/benefit-" + n + ".jpg), url(/benefit-" + n + ".jpeg), url(/benefit-" + n + ".png), linear-gradient(135deg,#bcd3ff,#e8f0ff)" }}><b>{n}</b></div>
              <div className="bn-txt"><h3>{b[0]}</h3><p>{b[1]}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function Benefits() {
  return (
    <section className="bn">
      <style>{BEN_CSS}</style>
      <div className="bn-w">
        <h2>Benefits of Mosbee</h2>
        <p className="bn-sub">One integrated product that is simple to use, flexible to buy and built to grow with your business.</p>
        <BenefitRow start={0} />
        <BenefitRow start={5} />
      </div>
    </section>
  );
}

const SOFT_CSS = `
.soft{position:relative;background:
  radial-gradient(640px 520px at 6% 7%,rgba(255,200,0,.13),transparent 70%),
  radial-gradient(720px 600px at 96% 13%,rgba(47,107,255,.12),transparent 70%),
  radial-gradient(680px 560px at 4% 36%,rgba(124,77,255,.10),transparent 70%),
  radial-gradient(720px 600px at 97% 50%,rgba(16,163,106,.09),transparent 70%),
  radial-gradient(680px 560px at 3% 68%,rgba(232,69,122,.08),transparent 70%),
  radial-gradient(720px 600px at 95% 88%,rgba(10,165,200,.11),transparent 70%),#fff}
.soft .hi{background:transparent}
.soft .bn{background:linear-gradient(180deg,rgba(255,255,255,0),rgba(236,243,255,.75) 20%,rgba(236,243,255,.75) 80%,rgba(255,255,255,0))}
.soft .sec,.soft .sec.alt{background:transparent!important}
`;
const Home = () => (
  <div className="soft">
    <style>{SOFT_CSS}</style>
    <HomeIntro />
    <Benefits />
    <section className="sec alt"><div className="wrap"><h2>Our services</h2><p className="sub">What we build for your business.</p><ServiceCards /></div></section>
    <ModuleGrid />
    <section className="sec alt wy"><div className="wrap">
      <div className="wy-top">
        <div>
          <span className="tag">Why Mosbee</span>
          <h2>Why choose Mosbee</h2>
          <p className="sub" style={{ margin: 0 }}>Technology that is simple to use, quick to set up and backed by people who stay with you after launch.</p>
        </div>
        <div className="wy-stats">{STATS.map((x) => <div key={x[2]}><b>{x[1]}</b><span>{x[2]}</span></div>)}</div>
      </div>
      <div className="wy-grid">
        {WHY.map((w, i) => (
          <div className="wy-c" key={w[0]}>
            <span className="wy-n">{String(i + 1).padStart(2, "0")}</span>
            <div className="wy-ic">{w[2]}</div>
            <h3>{w[0]}</h3>
            <p>{w[1]}</p>
          </div>
        ))}
      </div>
    </div></section>
    <Cta t="Ready to grow your business?" />
  </div>
);

// ----- small helpers used by the About page -----
function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

// number that counts up when it scrolls into view ("1,000+" -> 0 ... 1,000+)
function Count({ value }) {
  const m = String(value).match(/^([\d,]+)(.*)$/);
  const target = m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
  const suffix = m ? m[2] : "";
  const [ref, seen] = useInView();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return undefined;
    let raf = 0;
    let t0 = 0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 1600);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, target]);
  return <span ref={ref}>{n.toLocaleString("en-US")}{suffix}</span>;
}

const WORDS = ["automation", "software", "AI tools", "growth"];
function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return <span className="ab2-rot" key={i}>{WORDS[i]}</span>;
}

// fades + slides its content in when it scrolls into view
function Rv({ children, d = 0, className = "" }) {
  const [ref, seen] = useInView();
  return <div ref={ref} className={"ab2-rv " + (seen ? "in " : "") + className} style={{ "--d": d + "s" }}>{children}</div>;
}

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
};

const CODE = [
  ["company", "\"Mosbee\""],
  ["focus", "[\"AI\", \"Software\", \"Digital\"]"],
  ["products", "7"],
  ["clients", "1,000+"],
  ["countries", "25+"],
  ["status", "\"ready to build with you\""],
];
const TECH = ["AI and chatbots", "ERP", "HRMS", "Accounting", "Project management", "Task management", "Web apps", "Mobile apps", "Automation", "Dashboards", "Cloud", "Integrations"];

const AP_CSS = `
.ap{position:relative;overflow:hidden;background:radial-gradient(640px 520px at 94% 30%,rgba(124,77,255,.09),transparent 70%),radial-gradient(680px 560px at 4% 48%,rgba(16,163,106,.08),transparent 70%),radial-gradient(700px 560px at 95% 70%,rgba(255,200,0,.11),transparent 70%),radial-gradient(680px 560px at 5% 88%,rgba(232,69,122,.07),transparent 70%),#fff;color:#0a0a0a;--hb:#0b46d6;--hn:#0a1a4a;--hy:#ffc800;--hm:#4b5575;--hl:#dbe3f5;--hs:#f3f6ff}
.ap-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(720px 420px at 15% 0%,rgba(255,200,0,.18),transparent 70%),radial-gradient(820px 480px at 90% 4%,rgba(11,70,214,.14),transparent 70%),radial-gradient(900px 520px at 8% 60%,rgba(11,70,214,.07),transparent 70%)}
.ap-w{position:relative;max-width:1200px;margin:0 auto;padding:0 24px}
.ap-crumb{font-size:14px;color:var(--hm);margin:0 0 14px}
.ap-crumb a{color:var(--hb);text-decoration:none;font-weight:600}
.ap-head{text-align:center;padding-top:80px}
.ap .ap-head h1{font-size:clamp(46px,7vw,92px);line-height:1;letter-spacing:-.03em;margin:0 0 14px;color:var(--hn);font-weight:800}
.ap .ap-head h1 span{background:linear-gradient(90deg,#0b46d6,#5b8dff);-webkit-background-clip:text;background-clip:text;color:transparent}
.ap-tag{font:700 clamp(22px,2.6vw,32px)/1.2 "Sora",sans-serif;color:var(--hn);margin:0 0 16px}
.ap-tag b{position:relative;color:var(--hb);z-index:0}
.ap-tag b::after{content:"";position:absolute;left:0;right:0;bottom:2px;height:9px;background:var(--hy);opacity:.55;border-radius:4px;z-index:-1}
.ap-lead{font-size:19px;line-height:1.7;color:var(--hm);max-width:700px;margin:0 auto}
.ap-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:46px auto 0;max-width:980px}
.ap-stats div{background:#fff;border:1px solid var(--hl);border-radius:16px;padding:22px 12px;box-shadow:0 8px 24px rgba(11,70,214,.09)}
.ap-stats b{display:block;font:800 clamp(28px,3.4vw,40px)/1.1 "Sora",sans-serif;color:var(--hb)}
.ap-stats span{font-size:14px;color:var(--hm)}

.ap-sec{padding-top:100px}
.ap .ap-sec h2.ap-h{text-align:center;font-size:clamp(34px,4.4vw,56px);letter-spacing:-.02em;margin:0 0 12px;color:var(--hn);font-weight:800}
.ap-sub{text-align:center;color:var(--hm);font-size:18px;max-width:680px;margin:0 auto 44px}

/* who we are: photo + dark card */
.ap-who{display:grid;grid-template-columns:1.35fr 1fr;gap:24px;margin-top:44px}
.ap-photo{min-height:470px;border-radius:30px;box-shadow:0 24px 60px rgba(11,70,214,.18);background:url(/about-side.jpg) center/cover no-repeat,url(/about-side.jpeg) center/cover no-repeat,url(/about-side.png) center/cover no-repeat,linear-gradient(135deg,#dfe8ff,#f1f5ff)}
.ap-card{border-radius:30px;background:linear-gradient(160deg,#0a1a4a,#0b2a7a);color:#fff;padding:46px 40px;display:flex;flex-direction:column;justify-content:center;box-shadow:0 24px 60px rgba(10,26,74,.3)}
.ap .ap-card h3{font-size:clamp(26px,2.8vw,36px);line-height:1.2;margin:0 0 20px;font-weight:700;color:#fff}
.ap-card p{font-size:17px;line-height:1.8;color:#c9d6f5;margin:0 0 14px}
.ap-card p:last-child{margin:0}

/* one product, many modules */
.ap-mods{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.ap-mod{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--hl);border-radius:14px;padding:16px 18px;text-decoration:none;color:var(--hn);font:700 16px "Sora",sans-serif;box-shadow:0 6px 18px rgba(11,70,214,.07);transition:.2s}
.ap-mod:hover{transform:translateY(-3px);border-color:var(--hb);box-shadow:0 14px 30px rgba(11,70,214,.16)}
.ap-mod i{flex:none;width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#2f7bff,#0b46d6);color:#fff;display:grid;place-items:center;font-style:normal;font-size:18px}
.ap-note{text-align:center;color:var(--hm);margin:22px 0 0;font-size:15px}

/* mission vision */
.ap-mv{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:44px}
.ap-mvc{position:relative;background:#fff;border:1px solid var(--hl);border-radius:22px;padding:34px 34px 34px 100px;box-shadow:0 12px 34px rgba(11,70,214,.1)}
.ap-mvc i{position:absolute;left:30px;top:34px;width:48px;height:48px;border-radius:14px;background:var(--hy);color:#0a0a0a;display:grid;place-items:center;font-style:normal;font-size:22px;font-weight:800}
.ap .ap-mvc h3{margin:0 0 8px;font-size:24px;color:var(--hn)}
.ap-mvc p{margin:0;font-size:17px;line-height:1.7;color:var(--hm)}

/* values */
.ap-vals{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.ap-val{position:relative;background:var(--hs);border:1px solid var(--hl);border-radius:20px;padding:28px 24px;transition:.25s}
.ap-val:hover{transform:translateY(-5px);background:#fff;box-shadow:0 18px 40px rgba(11,70,214,.16)}
.ap-val em{position:absolute;right:20px;top:16px;font:800 14px "Sora",sans-serif;color:#b6c4ec;font-style:normal}
.ap-val i{width:52px;height:52px;border-radius:15px;background:var(--hb);color:#fff;display:grid;place-items:center;font-style:normal;font-size:24px;margin-bottom:18px}
.ap .ap-val h3{margin:0 0 8px;font-size:20px;color:var(--hn)}
.ap-val p{margin:0;color:var(--hm);font-size:15.5px;line-height:1.65}

/* steps */
.ap-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;position:relative}
.ap-steps::before{content:"";position:absolute;left:8%;right:8%;top:30px;height:2px;background:linear-gradient(90deg,var(--hb),var(--hy));opacity:.4}
.ap-step{position:relative;text-align:center;padding:0 8px}
.ap-step b{width:60px;height:60px;border-radius:50%;background:#fff;border:2px solid var(--hb);color:var(--hb);display:grid;place-items:center;font:800 18px "Sora",sans-serif;margin:0 auto 18px;position:relative;box-shadow:0 8px 20px rgba(11,70,214,.18)}
.ap .ap-step h3{margin:0 0 8px;font-size:20px;color:var(--hn)}
.ap-step p{margin:0;color:var(--hm);font-size:15.5px;line-height:1.65}

.ap-cta{margin:100px auto 0;max-width:1100px;border-radius:28px;background:linear-gradient(135deg,#0a1a4a,#0b46d6);color:#fff;text-align:center;padding:56px 24px;box-shadow:0 24px 60px rgba(10,26,74,.3)}
.ap .ap-cta h2{color:#fff;margin:0 0 10px;font-size:clamp(28px,3.6vw,44px);font-weight:800}
.ap-cta p{color:#c9d6f5;margin:0 0 26px;font-size:18px}
.ap-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.ap-btn{display:inline-block;padding:15px 28px;border-radius:10px;font:700 16px "Sora",sans-serif;text-decoration:none;border:1.5px solid transparent;transition:.2s}
.ap-pri{background:var(--hy);color:#0a0a0a}.ap-pri:hover{transform:translateY(-2px);background:#ffd633}
.ap-ghost{color:#fff;border-color:rgba(255,255,255,.7)}.ap-ghost:hover{background:rgba(255,255,255,.12)}
.ap-bot{height:110px}

.ap-rv{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease;transition-delay:var(--d,0s)}
.ap-rv.in{opacity:1;transform:none}

@media (max-width:1000px){.ap-stats,.ap-vals,.ap-steps,.ap-mods{grid-template-columns:repeat(2,1fr)}.ap-steps::before{display:none}.ap-who,.ap-mv{grid-template-columns:1fr}.ap-photo{min-height:300px}}
@media (max-width:560px){.ap-stats,.ap-vals,.ap-steps,.ap-mods{grid-template-columns:1fr}.ap-head{padding-top:50px}.ap-card{padding:34px 26px}.ap-mvc{padding:90px 26px 28px}}
`;

function ApRv({ children, d = 0 }) {
  const [ref, seen] = useInView();
  return <div ref={ref} className={"ap-rv" + (seen ? " in" : "")} style={{ "--d": d + "s" }}>{children}</div>;
}

const About = () => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setW((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ap">
      <style>{AP_CSS}</style>
      <div className="ap-glow" aria-hidden="true" />

      {/* intro */}
      <div className="ap-w ap-head">
        <p className="ap-crumb"><Link to="/">Home</Link> / About us</p>
        <h1>About <span>us</span></h1>
        <p className="ap-tag">We make <b key={w}>{WORDS[w]}</b> simple.</p>
        <p className="ap-lead">{ABOUT}</p>
        <div className="ap-stats">
          {STATS.map((x) => <div key={x[2]}><b><Count value={x[1]} /></b><span>{x[2]}</span></div>)}
        </div>
      </div>

      {/* who we are */}
      <div className="ap-w ap-sec">
        <ApRv><h2 className="ap-h">Who we are</h2></ApRv>
        <div className="ap-who">
          <ApRv><div className="ap-photo" role="img" aria-label="The Mosbee team" /></ApRv>
          <ApRv d={0.12}>
            <div className="ap-card">
              <h3>Your partner in smarter business management</h3>
              {STORY.map((t) => <p key={t}>{t}</p>)}
              <p>Mosbee is one integrated product. Use the complete solution, or pick only the modules your business needs today.</p>
            </div>
          </ApRv>
        </div>
      </div>

      {/* one product, many modules */}
      <div className="ap-w ap-sec">
        <ApRv><h2 className="ap-h">One product, many modules</h2><p className="ap-sub">Every module works on its own and works even better together.</p></ApRv>
        <ApRv d={0.1}>
          <div className="ap-mods">
            {MODULES.map((m) => <Link className="ap-mod" to={m.to} key={m.n}><i>{m.ic}</i>{m.n}</Link>)}
          </div>
          <p className="ap-note">More business modules will be added over time.</p>
        </ApRv>
      </div>

      {/* mission + vision */}
      <div className="ap-w ap-sec">
        <ApRv><h2 className="ap-h">Mission and vision</h2></ApRv>
        <div className="ap-mv">
          <ApRv><div className="ap-mvc"><i>◎</i><h3>Our mission</h3><p>{MISSION}</p></div></ApRv>
          <ApRv d={0.12}><div className="ap-mvc"><i>✦</i><h3>Our vision</h3><p>{VISION}</p></div></ApRv>
        </div>
      </div>

      {/* values */}
      <div className="ap-w ap-sec">
        <ApRv><h2 className="ap-h">What we stand for</h2><p className="ap-sub">The values behind every product we build.</p></ApRv>
        <div className="ap-vals">
          {VALUES.map((v, i) => (
            <ApRv d={0.08 * i} key={v[1]}>
              <div className="ap-val"><em>{String(i + 1).padStart(2, "0")}</em><i>{v[0]}</i><h3>{v[1]}</h3><p>{v[2]}</p></div>
            </ApRv>
          ))}
        </div>
      </div>

      {/* how we work */}
      <div className="ap-w ap-sec">
        <ApRv><h2 className="ap-h">From idea to launch in four steps</h2></ApRv>
        <div className="ap-steps" style={{ marginTop: 50 }}>
          {STEPS.map((x, i) => (
            <ApRv d={0.1 * i} key={x[0]}>
              <div className="ap-step"><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>
            </ApRv>
          ))}
        </div>
      </div>

      {/* call to action */}
      <div className="ap-w">
        <div className="ap-cta">
          <h2>Let us build your next idea</h2>
          <p>Tell us about your business and we will get back to you.</p>
          <div className="ap-btns">
            <Link className="ap-btn ap-pri" to="/contact">Contact us</Link>
            <a className="ap-btn ap-ghost" href="tel:+918891904007">Call +91 8891904007</a>
          </div>
        </div>
      </div>
      <div className="ap-bot" />
    </div>
  );
};

function ServiceRoute() {
  const { id } = useParams();
  return <ServicePage key={id} id={id} />;
}

const Services = () => (
  <>
    <PageHead crumb="Our services" title="Our services" lead="AI, software and digital solutions for your business." />
    <section className="sec"><div className="wrap"><ServiceCards /></div></section>
    <Cta t="Need a custom solution?" />
  </>
);

function Contact() {
  const blank = { n: "", e: "", s: "General enquiry", m: "" };
  const [f, setF] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (FORM_ENDPOINT) {
        const r = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name: f.n, email: f.e, subject: f.s, message: f.m }),
        });
        if (!r.ok) throw new Error("send failed");
      } else {
        // demo mode: no server yet, so just wait a moment and show the success message
        await new Promise((ok) => setTimeout(ok, 900));
      }
      setSent({ ...f });
      setF(blank);
    } catch (x) {
      setErr("Sorry, we could not send your message. Please call or WhatsApp us instead.");
    } finally {
      setBusy(false);
    }
  };
  const waText = encodeURIComponent("Hello Mosbee, I would like to know more about " + (sent ? sent.s : "your services") + ".");
  return (
    <>
      <PageHead crumb="Contact us" title="Contact us" lead={"Call " + PHONE + " or send us a message."} />
      <section className="sec"><div className="wrap cx">
        {sent ? (
          <div className="cx-ok">
            <svg className="cx-tick" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg>
            <h2>Message sent successfully</h2>
            <p>Thank you, {sent.n}. We have received your message about <b>{sent.s}</b> and will reply to <b>{sent.e}</b> soon.</p>
            <div className="btns">
              <button className="btn pri" type="button" style={{ cursor: "pointer" }} onClick={() => setSent(null)}>Send another message</button>
              <a className="btn line" href={"https://wa.me/" + WA + "?text=" + waText} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            </div>
          </div>
        ) : (
          <form onSubmit={send}>
            <input placeholder="Your name" required value={f.n} onChange={set("n")} />
            <input type="email" placeholder="Email" required value={f.e} onChange={set("e")} />
            <select value={f.s} onChange={set("s")}><option>General enquiry</option>{P.map((p) => <option key={p.id}>{p.name}</option>)}</select>
            <textarea rows="5" placeholder="Message" value={f.m} onChange={set("m")} />
            {err && <p className="cx-err">{err}</p>}
            <button className="btn pri" type="submit" disabled={busy} style={{ cursor: busy ? "wait" : "pointer" }}>{busy ? "Sending..." : "Send message"}</button>
          </form>
        )}
        <div className="cx-side">
          <a className="cx-i" href={"tel:" + PHONE.replace(/ /g, "")}><i>✆</i><div><b>Call us</b><span>{PHONE}</span></div></a>
          <a className="cx-i" href={"https://wa.me/" + WA} target="_blank" rel="noreferrer"><i>💬</i><div><b>WhatsApp</b><span>Chat with us</span></div></a>
          <a className="cx-i" href="mailto:info@mostech.ae"><i>@</i><div><b>Email</b><span>info@mostech.ae</span></div></a>
        </div>
      </div></section>
    </>
  );
}

const Footer = () => (
  <footer><div className="wrap">
    <div className="fg">
      <div>
        <Link className="ft-logo" to="/"><i>M</i>MOSBEE</Link>
        <p>{ABOUT}</p>
      </div>
      <div><h4>Company</h4><Link to="/">Home</Link><Link to="/about">About us</Link><Link to="/services">Our services</Link><Link to="/contact">Contact us</Link></div>
      <div><h4>Products</h4>{P.map((p) => <Link key={p.id} to={"/" + p.id}>{p.name}</Link>)}</div>
      <div><h4>Contact</h4><a href="tel:+918891904007">+91 8891904007</a><a href="mailto:info@mostech.ae">info@mostech.ae</a></div>
    </div>
    <div className="copy">
      <span>© Mosbee. All rights reserved.</span>
      <button className="ft-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
    </div>
  </div></footer>
);

export default function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <ScrollFx />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceRoute />} />
          <Route path="/contact" element={<Contact />} />
          {/* 7 separate product pages */}
          <Route path="/erp" element={<ErpPage />} />
          <Route path="/hrms" element={<HrmsPage />} />
          <Route path="/accounting" element={<AccountingPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/project-management" element={<ProjectManagementPage />} />
          <Route path="/task-management" element={<TaskManagementPage />} />
          <Route path="/pro-solutions" element={<ProSolutionsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}