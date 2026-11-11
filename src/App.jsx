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

// FIXED hero picture area (does not change, no tabs):
//   middle image : /public/hero-main.png  (.jpg / .jpeg also work)
//   4 side images: /public/hero-side-1.png ... hero-side-4.png  (.jpg / .jpeg also work)
// Until you add them, the middle shows demo.png / erp.png and the sides show soft shaded cards.
const SIDE_FIX = [
  ["▦", "ERP", "Operations", "#0b46d6"],
  ["☺", "HRMS", "People", "#0b46d6"],
  ["₹", "Accounts", "Finance", "#0b46d6"],
  ["✉", "Chatbot", "Support", "#0b46d6"],
];
const DOTS = [6, 14, 22, 31, 40, 49, 58, 67, 76, 84, 92];
function Pic({ names, fallback, alt = "" }) {
  const [k, setK] = useState(0);
  if (k >= names.length) return fallback;
  return <img src={names[k]} alt={alt} onError={() => setK(k + 1)} />;
}
const exts = (base) => [base + ".png", base + ".jpg", base + ".jpeg"];

function HomeIntro() {
  return (
    <section className="hi">
      <div className="hi-glow" aria-hidden="true" />

      {/* 1. HERO + fixed picture area */}
      <div className="hi-w hi-hero">
        <span className="hi-eyebrow">ONE INTEGRATED BUSINESS MANAGEMENT SOLUTION</span>
        <h1>Software that handles the <span className="hi-hl">busywork.</span></h1>
        <p className="hi-lead">Use the complete Mosbee solution, or only the modules your business needs.</p>
        <div className="hi-btns">
          <Link className="hi-btn hi-pri" to="/services">Explore Solutions →</Link>
          <Link className="hi-btn hi-ghost" to="/contact">Contact Us</Link>
        </div>
        <div className="hi-stage">
          <div className="hi-orb hi-orb1" aria-hidden="true" /><div className="hi-orb hi-orb2" aria-hidden="true" /><div className="hi-orb hi-orb3" aria-hidden="true" />
          <div className="hi-floor" aria-hidden="true" />
          {DOTS.map((x, i) => <span key={i} className="hi-dot" aria-hidden="true" style={{ "--x": x + "%", "--d": 8 + (i % 4) * 1.6 + "s", "--dl": -(i * 1.3) + "s" }} />)}
          {SIDE_FIX.map(([ic, name, sub, col], k) => (
            <div key={name} className={"hi-sc hi-sc" + k} style={{ color: col }} aria-hidden="true">
              <Pic names={exts("/hero-side-" + (k + 1))} fallback={<><i className="hi-sci">{ic}</i><b>{name}</b><small>{sub}</small></>} />
            </div>
          ))}
          <div className="hi-main">
            <Pic
              names={[...exts("/hero-main"), "/demo.png", "/erp.png"]}
              alt="Mosbee"
              fallback={<div className="hi-ph"><div /><div /><div /><div /><span>Add /hero-main.png</span></div>}
            />
          </div>
        </div>
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

const SVC_COL = {
  "ai-solutions": ["#e8f0ff", "#0b46d6"],
  "software-development": ["#e8f0ff", "#0b46d6"],
  "web-and-app": ["#e8f0ff", "#0b46d6"],
  "digital-solutions": ["#e8f0ff", "#0b46d6"],
};
function ServiceCards() {
  const [a, setA] = useState(0);
  const x = SERVICES[a];
  const [t, c] = SVC_COL[x.id] || ["#e8f0ff", "#0b46d6"];
  const num = (i) => String(i + 1).padStart(2, "0");
  return (
    <div className="sx" style={{ "--t": t, "--c": c }}>
      <ul className="sx-list">
        {SERVICES.map((sv, i) => (
          <li key={sv.id}>
            <button className={i === a ? "on" : ""} style={{ "--c": (SVC_COL[sv.id] || [0, "#0b46d6"])[1] }}
              onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)}>
              <em>{num(i)}</em><span>{sv.name}</span><i aria-hidden="true">→</i>
            </button>
          </li>
        ))}
      </ul>
      <div className="sx-panel" key={x.id}>
        <span className="sx-n" aria-hidden="true">{num(a)}</span>
        <div className="sx-orb sx-o1" /><div className="sx-orb sx-o2" />
        <div className="sx-ic">{x.icon}</div>
        <h3>{x.name}</h3>
        <p>{x.d}</p>
        <ul className="sx-pts">{(x.pts || []).map((pt) => <li key={pt}>{pt}</li>)}</ul>
        <Link className="sx-go" to={"/services/" + x.id}>Learn more →</Link>
      </div>
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
function ModuleGrid() {
  return (
    <section className="hp">
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
      <div className="bn-w">
        <h2>Benefits of Mosbee</h2>
        <p className="bn-sub">One integrated product that is simple to use, flexible to buy and built to grow with your business.</p>
        <BenefitRow start={0} />
        <BenefitRow start={5} />
      </div>
    </section>
  );
}

// ---------- Product stack: big cards that stack as you scroll ----------
// Right-side photo for each card (put in /public; .jpg .png .jpeg all work):
//   stack-erp, stack-accounts, stack-hrms, stack-crm, stack-pro, stack-chatbot, stack-projects, stack-tasks
const PSTACK = [
  { k: "erp", n: "ERP", ic: "▦", c: "#2f6bff", t: "#e4edff", to: "/erp", img: "/erp.png",
    h: "Run every branch from one place",
    d: "Run every branch, factory and warehouse from one command centre, with a single view of stock, purchasing and production.",
    b: ["Multi-branch inventory with live reorder alerts", "Procurement, GRN and vendor scorecards", "Job, batch and shop-floor production control", "Reports and dashboards for every branch"],
    s: [["Multi-branch", "inventory and reorder alerts"], ["GRN", "goods receipt and vendor scorecards"], ["Production", "job, batch and shop-floor"]] },
  { k: "accounts", n: "Accounts & POS", ic: "₹", c: "#10a36a", t: "#e1f5ea", to: "/accounting", img: "/accounting.png",
    h: "Accounting and billing, together",
    d: "Accounting and POS billing in one system: fast counter checkout, GST invoicing, ledgers and reconciliation built in.",
    b: ["POS counter billing, barcode scan and instant receipts", "Double-entry ledgers, GST invoices, e-invoice and e-way bill", "Cash register, UPI and bank reconciliation", "TDS and a complete audit trail"],
    s: [["POS", "barcode scan and receipts"], ["GST", "invoice, e-invoice, e-way bill"], ["Ledgers", "double-entry and reconciliation"]] },
  { k: "hrms", n: "HRMS", ic: "☺", c: "#7c4dff", t: "#ece6ff", to: "/hrms", img: "/hrms.png",
    h: "Payroll day without the panic",
    d: "From attendance to PF, ESI and TDS, keep every people process accurate and on time.",
    b: ["Attendance, shifts, leave and holiday calendars", "Payslips, PF, ESI and TDS with self-service", "Onboarding, appraisals and org charts", "Recruitment in the same place"],
    s: [["Attendance", "shifts and leave"], ["Payroll", "PF, ESI and TDS"], ["Self-service", "payslips for staff"]] },
  { k: "crm", n: "CRM", ic: "↗", c: "#e8457a", t: "#ffe6ee", to: "/contact", img: "",
    h: "Every lead, followed up",
    d: "Every lead captured, scored and followed up automatically, with a clear pipeline from first enquiry to closed deal.",
    b: ["Lead capture from web, ads and WhatsApp", "Visual pipeline with revenue forecast", "Quotes, handoffs and automated follow-ups", "Complete customer history in one place"],
    s: [["Leads", "web, ads and WhatsApp"], ["Pipeline", "visual, with forecast"], ["Follow-ups", "automated"]] },
  { k: "pro", n: "PRO", ic: "★", c: "#e89a00", t: "#fff0d2", to: "/pro-solutions", img: "",
    h: "Never miss a renewal",
    d: "The power tier for document tracking and renewals, so licences, IDs and permits are always planned ahead.",
    b: ["Document and expiry tracking", "Renewal reminders for licences, IDs and permits", "Clear status: valid, expiring soon, expired", "Plan upcoming renewals in advance"],
    s: [["Expiry", "tracking and alerts"], ["Renewals", "planned ahead"], ["Documents", "licences, IDs and permits"]] },
  { k: "chatbot", n: "Chatbot", ic: "✉", c: "#0aa5c8", t: "#dff4fa", to: "/chatbot", img: "/chatbot.png",
    h: "Answer customers instantly",
    d: "Answer customers instantly on your website and apps, capture leads and hand over to your team when it matters.",
    b: ["Smart replies on your website and apps", "Lead capture and customer details", "Integrations with the tools you already use", "Smooth hand-over to your team"],
    s: [["Smart replies", "on web and apps"], ["Leads", "captured in chat"], ["Integrations", "with your tools"]] },
  { k: "projects", n: "Projects", ic: "◫", c: "#14a89a", t: "#dcf5f1", to: "/project-management", img: "",
    h: "Deliver projects on time",
    d: "Plan, track and deliver projects on time, with timelines, team collaboration and progress reports.",
    b: ["Timelines and milestones", "Team collaboration in one place", "Progress reports at a glance", "A clear view of every project"],
    s: [["Timelines", "plan and track"], ["Teams", "work together"], ["Reports", "progress at a glance"]] },
  { k: "tasks", n: "Tasks", ic: "☑", c: "#f0742a", t: "#ffe9db", to: "/task-management", img: "",
    h: "Finish the day's work",
    d: "Assign, follow up and finish daily work, with reminders, priorities and a clear view of who is doing what.",
    b: ["Assign and follow up tasks", "Reminders and priorities", "A simple board for the whole team", "Status of every task at a glance"],
    s: [["Assign", "to your team"], ["Reminders", "never miss a task"], ["Priorities", "know what is next"]] },
];
function ProductStack() {
  const refs = useRef([]);
  useEffect(() => {
    const els = refs.current.filter(Boolean);
    let raf = 0;
    const update = () => {
      raf = 0;
      els.forEach((el, i) => {
        const nx = els[i + 1];
        if (!nx) return;
        const stuck = parseFloat(getComputedStyle(nx).top) || 0;
        const d = nx.getBoundingClientRect().top - stuck;
        const p = Math.max(0, Math.min(1, 1 - d / el.offsetHeight));
        el.style.setProperty("--p", p.toFixed(3));
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="ps2">
      <div className="ps2-w">
        <div className="ps2-head">
          <span className="ps2-k">THE MOSBEE PLATFORM</span>
          <h2>One product. Every module. Built to work together.</h2>
          <p className="ps2-sub">Run the complete solution, or choose only the modules your business needs today.</p>
        </div>
        <div className="ps2-list">
          {PSTACK.map((m, i) => (
            <article key={m.k} ref={(el) => (refs.current[i] = el)} className="ps2-card" style={{ "--i": i, "--c": "#0b46d6", "--t": "#f6f7fb" }}>
              <div className="ps2-img" aria-hidden="true">
                <Pic names={[...exts("/stack-" + m.k), ...(m.img ? [m.img] : [])]} fallback={<div className="ps2-fb"><span>Add photo: stack-{m.k}.jpg</span></div>} />
              </div>
              <div className="ps2-body">
                <span className="ps2-kick">{m.n}</span>
                <h3>{m.h}</h3>
                <p>{m.d}</p>
                <ul>{m.b.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="ps2-tiles">
                  {m.s.map(([a, b], j) => <div key={a} className={"ps2-tile t" + (j + 1)}><b>{a}</b><span>{b}</span></div>)}
                </div>
              </div>
              <div className="ps2-cta">
                {m.to !== "/contact" && <Link className="ps2-btn alt" to={m.to}>Explore {m.n}</Link>}
                <Link className="ps2-btn" to="/contact">Request a demo</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const dsvg = (d) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const DRIVE_VALUES = [
  ["01", dsvg(<><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></>), "Innovation", "Fresh ideas that turn into real results."],
  ["02", dsvg(<><circle cx="12" cy="9" r="5" /><path d="M8.5 13.5 7 21l5-3 5 3-1.5-7.5" /></>), "Quality", "Built carefully, tested before it ships."],
  ["03", dsvg(<><path d="M4 18a8 8 0 1 1 16 0" /><path d="M12 18l4-6" /></>), "Performance", "Fast, smooth systems that keep up with you."],
  ["04", dsvg(<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="m9 12 2 2 4-4" /></>), "Reliability", "Dependable software you can count on daily."],
  ["05", dsvg(<><path d="M3 12l4-4 4 3 4-3 6 5" /><path d="m7 16 3 3 2-2 3 2 3-3" /></>), "Partnership", "We grow with you, long after launch."],
];
function DriveSection() {
  return (
    <section className="dr">
      <div className="dr-w">
        <div className="dr-grid">
          <div className="dr-text">
            <h2>One platform for<br /><span>every part of your business</span></h2>
            <p>Mosbee is a leading business software company serving clients across the globe. We help businesses transform their operations through one integrated management solution.</p>
            <p>We specialize in ERP, accounting and POS, HR, CRM, PRO services, chatbots, project and task management. Our solutions are seamless, efficient, and tailored to meet specific business needs.</p>
            <p>Driven by innovation, quality, and performance, we deliver intelligent, tailored digital systems that support sustainable growth and help organizations stay ahead in competitive markets.</p>
          </div>
          <div className="dr-img">
            <div className="dr-fx">
              <Pic names={exts("/drive-side")} fallback={<div className="dr-fb"><span>Add image: drive-side.png</span></div>} />
              <svg className="dr-bolt" viewBox="0 0 1017 1016" aria-hidden="true">
                <defs>
                  <clipPath id="drScr"><rect x="119" y="26" width="765" height="471" /></clipPath>
                  <linearGradient id="drShine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#9fd0ff" stopOpacity=".38" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* screen glow + light sweep */}
                <rect className="dr-edge" x="117" y="24" width="769" height="475" rx="6" />
                <g clipPath="url(#drScr)"><rect className="dr-sweep" x="-260" y="0" width="240" height="1016" fill="url(#drShine)" transform="skewX(-18)" /></g>
                {/* power running through the blue cable */}
                <path className="dr-cable" d="M578 872 L576 930 L582 1000" />
                <path className="dr-cable dr-cable2" d="M578 872 L576 930 L582 1000" />
                {/* electric arcs on the hand and wrist */}
                <polyline className="dr-arc a1" points="470,640 488,655 480,668 505,682 497,696 522,708" />
                <polyline className="dr-arc a2" points="640,606 628,626 640,640 626,660 638,676 624,698" />
                <polyline className="dr-arc a3" points="545,790 560,806 548,820 568,834 556,850 576,862" />
                <polyline className="dr-arc a4" points="410,610 424,626 414,640 432,654 424,668" />
                <polyline className="dr-arc a5" points="520,596 540,606 532,618 556,626 548,638 572,646" />
                {/* sparks on the joints */}
                <circle className="dr-spark s1" cx="632" cy="648" r="7" />
                <circle className="dr-spark s2" cx="520" cy="690" r="6" />
                <circle className="dr-spark s3" cx="550" cy="712" r="6" />
                <circle className="dr-spark s4" cx="624" cy="736" r="7" />
                <circle className="dr-spark s5" cx="576" cy="868" r="6" />
              </svg>
            </div>
          </div>
        </div>
        <div className="dr-bar">
          {DRIVE_VALUES.map(([n, ic, t, d]) => (
            <div className="dr-val" key={t}>
              <span className="dr-n">{n}</span>
              <i>{ic}</i>
              <b>{t}</b>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HELP = [
  ["Business Consulting", <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    "Not sure which modules your business really needs? We start by listening. Our team studies how your branches, people and accounts work today, then recommends the right mix of ERP, accounting, HR, CRM and the other Mosbee modules, so you invest only in what will make a difference."],
  ["Setup & Implementation", <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    "We configure Mosbee around your way of working, not the other way round. Your data is moved across safely, your users and approvals are set up, and every module is tested before go-live, so your team starts with a system that already fits."],
  ["Training & Support", <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    "New software only helps when people are comfortable using it. We train your staff on the screens they use every day, share simple guides, and stay available by phone and email, so questions get answered quickly and nobody is left guessing."],
  ["Updates & Maintenance", <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    "Your business keeps changing, and your software should too. We keep Mosbee updated and secure, check performance regularly, and add custom reports, fields and features whenever your needs grow."],
];
function HelpSection() {
  return (
    <section className="hp">
      <div className="hp-w">
        <h2>How Mosbee Can Help <span>Your Business</span></h2>
        <p className="hp-sub">From the first conversation to everyday support, one team is with you at every step.</p>
        <div className="hp-grid">
          {HELP.map(([t, ic, d], i) => (
            <article className="hp-card" key={t}>
              <div className="hp-top">
                <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ic}</svg>
                <h3>{t}</h3>
              </div>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const METHOD = [
  ["Project Initiation", "During the project initiation phase, we conduct an in-depth system study to thoroughly understand your requirements. Our primary goal is to analyze and document all your needs to develop a tailored solution that ensures project success and delivers positive results."],
  ["Project Planning", "In the project planning phase, we utilize the requirements identified during the initiation phase to create a comprehensive plan. Our team meticulously crafts this plan to ensure the project achieves its optimal target results, setting a clear roadmap for successful development and implementation."],
  ["Project Execution", "In the project execution phase, we develop and integrate multiple crucial modules into the ERP system, tailored to meet the client\u2019s specific requirements. This step ensures that all necessary functions are effectively incorporated to achieve the project\u2019s goals and ensure its success."],
  ["Monitoring, QA, and Controlling", "Our experienced developers carry out the implementation phase, encoding and developing the project based on client specifications. At the end of this phase, the project undergoes rigorous testing and evaluation to ensure all requirements are met, perfecting and finalizing the solution."],
  ["Closing Project and Handing Over", "After thorough testing and development, we transfer all deliverables to the client. We provide comprehensive support, including user interface introduction, training, and implementation. Additionally, we offer ongoing customization services to meet future requirements, ensuring continuous support and adaptability for your business."],
  ["Future Requirements and Customization Services", "We offer highly customizable ERP software solutions tailored to meet your business goals and increase ROI. Our all-in-one turnkey solutions foster long-term relationships with customers, driving disruptive innovation and continuous improvement."],
];
function Methodology() {
  const [open, setOpen] = useState(0);
  const item = (i) => {
    const [t, d] = METHOD[i];
    const on = open === i;
    return (
      <div className={"mt-item" + (on ? " on" : "")} key={t}>
        <button type="button" className="mt-q" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}>
          <span className="mt-n">{String(i + 1).padStart(2, "0")}</span>
          <span className="mt-t">{t}</span>
          <span className="mt-pl" aria-hidden="true" />
        </button>
        <div className="mt-a"><div><p>{d}</p></div></div>
      </div>
    );
  };
  return (
    <section className="mt">
      <div className="mt-w">
        <h2>Our <span>Methodology</span></h2>
        <p className="mt-sub">A clear six-step process, from the first conversation to long-term support.</p>
        <div className="mt-grid">
          <div>{[0, 1, 2].map(item)}</div>
          <div>{[3, 4, 5].map(item)}</div>
        </div>
      </div>
    </section>
  );
}

function HappyBanner() {
  return (
    <section className="hc">
      <svg className="hc-wave" viewBox="0 0 1440 170" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0H1440V30C1100 40 560 100 0 165Z" fill="#fff" />
      </svg>
      <div className="hc-w">
        <div>
          <h2>Your success is our biggest goal</h2>
          <p>Let&rsquo;s grow your business together.</p>
          <Link className="hc-btn" to="/contact">Talk to our team &rarr;</Link>
        </div>
        <div className="hc-img">
          <Pic names={["png","jpg","jpeg","webp","avif","PNG","JPG","JPEG"].map((e) => "/happy-clients." + e)} alt="Happy clients" fallback={<span className="hc-fb">Add image: happy-clients.jpg</span>} />
        </div>
      </div>
    </section>
  );
}

const PARTNERS = [
  ["jio", "Jio"], ["meta", "Meta"], ["google", "Google"], ["linkedin", "LinkedIn"], ["tiktok", "TikTok"],
  ["microsoft", "Microsoft"], ["godaddy", "GoDaddy"], ["hostinger", "Hostinger"], ["zoho", "Zoho"], ["facebook", "Facebook"],
  ["whatsapp", "WhatsApp"], ["instagram", "Instagram"], ["x", "X"], ["emiratesnbd", "Emirates NBD"], ["rakbank", "RAKBANK"],
  ["razorpay", "Razorpay"], ["gpay", "GPay"], ["upi", "UPI"], ["tally", "Tally"], ["odoo", "Odoo"],
  ["samsung", "Samsung"], ["xiaomi", "Xiaomi"], ["apple", "Apple"], ["hikvision", "Hikvision"], ["synology", "Synology"],
];
const partnerImgs = (k) => [".svg", ".png", ".webp", ".jpg", ".jpeg"].map((e) => "/partners/" + k + e);
function PartnersMarquee() {
  const row = (suffix) => PARTNERS.map(([k, n]) => (
    <div className="pm-item" key={k + suffix}>
      <Pic names={partnerImgs(k)} alt={n} fallback={<span className="pm-name">{n}</span>} />
    </div>
  ));
  return (
    <section className="pm">
      <div className="pm-head">
        <h2>Our <span>Technology Partners</span></h2>
        <p>Collaborating with industry leaders to deliver the best solutions.</p>
      </div>
      <div className="pm-view">
        <div className="pm-track">{row("a")}{row("b")}</div>
      </div>
    </section>
  );
}

const Home = () => (
  <div className="soft">
    <HomeIntro />
    <DriveSection />
    <ProductStack />
    <HelpSection />
    <Methodology />
    <HappyBanner />
    <PartnersMarquee />
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

const SOCIAL = [
  ["Facebook", "https://facebook.com/", <path key="f" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />],
  ["YouTube", "https://youtube.com/", <path key="y" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.7 2 12 2 12s0 3.300.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.700 19 12 19 12 19s6.300 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800C22 15.300 22 12 22 12s0-3.300-.4-4.800zM10 15V9l5.200 3z" />],
  ["Instagram", "https://instagram.com/", <g key="i" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.500" cy="6.500" r="1" fill="currentColor" stroke="none" /></g>],
  ["LinkedIn", "https://linkedin.com/", <path key="l" d="M4.980 3.500a2.500 2.500 0 1 1 0 5 2.500 2.500 0 0 1 0-5zM3 9.500h4V21H3zM9.500 9.500h3.800v1.600h.1c.5-1 1.800-1.900 3.700-1.900 4 0 4.700 2.600 4.700 6V21h-4v-5c0-1.200 0-2.800-1.700-2.800s-2 1.300-2 2.700V21h-4z" />],
];
const Footer = () => (
  <footer className="ft2"><div className="ft2-w">
    <div className="ft2-grid">
      <div className="ft2-brand">
        <Link className="ft-logo" to="/"><i>M</i>MOSBEE</Link>
        <p>{ABOUT}</p>
      </div>
      <div>
        <h4>Our Address</h4>
        {/* Replace with your full office address */}
        <p className="ft2-addr">Dubai<br />United Arab Emirates</p>
        <a className="ft2-ct" href="tel:+918891904007">+91 8891904007</a>
        <a className="ft2-ct" href="mailto:info@mostech.ae">info@mostech.ae</a>
      </div>
      <div>
        <h4>Quick Links</h4>
        <Link to="/">Home</Link><Link to="/about">About us</Link><Link to="/services">Our services</Link><Link to="/contact">Contact us</Link>
        {P.map((p) => <Link key={p.id} to={"/" + p.id}>{p.name}</Link>)}
      </div>
      <div>
        <h4>Follow Us</h4>
        <div className="ft2-soc">
          {SOCIAL.map(([n, href, ic]) => (
            <a key={n} href={href} target="_blank" rel="noreferrer" aria-label={n}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">{ic}</svg>
            </a>
          ))}
        </div>
        <iframe className="ft2-map" title="Mosbee location" loading="lazy" src="https://www.google.com/maps?q=Dubai%2C%20United%20Arab%20Emirates&output=embed" />
      </div>
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