import { useEffect, useRef, useState } from "react";
import { HashRouter, Routes, Route, Link, NavLink, Navigate, useLocation, useParams } from "react-router-dom";
import { SERVICES, P, STATS, ABOUT, WHY, TH, ABOUT_HOME, STORY, MISSION, VISION, VALUES, STEPS } from "./data";
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
    const sel = ".sec .wrap > h2, .sec .wrap > .sub, .sec .wrap > .grid > *, .sec .wrap > .cards4 > *, .sec .wrap > .steps > *, .sec .wrap > .mv > *, .sec .split > *, .sec .mv1 > *, .cta, .abhero .wrap > *";
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

const hueOf = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), d = mx - Math.min(r, g, b);
  if (!d) return 0;
  const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (h * 60 + 360) % 360;
};

function Hero() {
  const [i, setI] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  // changes every 4 seconds; the timer restarts when someone clicks a name
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % TH.length), 4000);
    return () => clearInterval(t);
  }, [i]);
  const [word, c1, c2, id, , fg, rot] = TH[i];
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  return (
    <section className="shoe" style={{ "--c1": c1, "--c2": c2, "--fg": fg, "--rot": `${rot}deg` }} onMouseMove={move}>
      <div className="sw">
        <div className="stx"><h1>Software that handles the busywork.</h1><p>{P[i].tag}</p></div>
        <div className="wd" style={{ transform: `translate(${-pos.x * 46}px,${-pos.y * 14}px)` }}>
          <div className="word" key={word}>{word}</div>
        </div>
        <ul className="plist">
          {TH.map((t, k) => (
            <li key={t[3]}>
              <button className={k === i ? "on" : ""} style={{ "--pc": t[2] }} onClick={() => setI(k)}><em>{String(k + 1).padStart(2, "0")}</em><span>{t[4]}</span>{k === i && <u key={i} />}</button>
            </li>
          ))}
        </ul>
        <div className="sb">
          <Link className="btn dark" to={"/" + id}>Explore Solutions →</Link>
          <Link className="btn line" to="/contact">Contact Us</Link>
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

const Home = () => (
  <>
    <Hero />
    <section className="sec mix"><div className="wrap split">
      <div>
        <span className="tag">Who we are</span>
        <h2 className="bigh">About <span>us</span></h2>
        {ABOUT_HOME.paras.map((t) => <p className="sub" style={{ margin: "0 0 14px" }} key={t}>{t}</p>)}
        <div className="ab-stats">
          {[1, 2, 0].map((i) => <div key={STATS[i][2]}><b>{STATS[i][1]}</b><span>{STATS[i][2]}</span></div>)}
        </div>
        <div className="btns">
          <Link className="btn pri" to="/about">Learn more</Link>
          <Link className="btn line" to="/services">Our services</Link>
        </div>
      </div>
      <div className="abwrap">
        <div className="abimg" />
        <div className="abbadge"><b>1,000+</b><span>clients served across 25+ countries</span></div>
      </div>
    </div></section>
    <section className="sec alt"><div className="wrap"><h2>Our services</h2><p className="sub">What we build for your business.</p><ServiceCards /></div></section>
    <section className="sec"><div className="wrap"><h2>Our products</h2><p className="sub">Seven ready-to-use products. Open one to see what it does.</p><ProductShowcase /></div></section>
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
  </>
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

const About = () => {
  const [termRef, termSeen] = useInView();
  const [tlRef, tlSeen] = useInView();
  return (
    <div className="ab2">
      {/* ---------- hero ---------- */}
      <section className="ab2-hero">
        <div className="ab2-floor" /><div className="ab2-orb o1" /><div className="ab2-orb o2" /><div className="ab2-scan" />
        {["</>", "{ }", "01", "AI", "10", "=>"].map((g, k) => (
          <span className="ab2-gl" key={k} aria-hidden="true" style={{ left: 8 + k * 16 + "%", animationDelay: k * 1.4 + "s" }}>{g}</span>
        ))}
        <div className="wrap">
          <p className="crumb"><Link to="/">Home</Link> / About us</p>
          <h1>About us</h1>
          <p className="ab2-line">We make <Rotator /> simple.</p>
          <p className="lead" style={{ margin: "0 auto", maxWidth: 680 }}>{ABOUT}</p>
          <div className="ab2-stats">
            {STATS.map((x) => <div key={x[2]}><b><Count value={x[1]} /></b><span>{x[2]}</span></div>)}
          </div>
        </div>
      </section>

      {/* ---------- who we are + mission / vision ---------- */}
      <section className="ab2-s"><div className="wrap">
        <div className="ab2-who">
          <div>
            <Rv><span className="tag">Who we are</span><h2>Built by people who like simple, working technology</h2></Rv>
            {STORY.map((t, k) => <Rv d={0.1 * (k + 1)} key={t}><p className="sub" style={{ margin: "0 0 14px" }}>{t}</p></Rv>)}
          </div>
          <div ref={termRef} className={"ab2-term" + (termSeen ? " go" : "")}>
            <div className="ab2-tb"><i /><i /><i /><span>mosbee.config</span></div>
            <div className="ab2-code">
              {CODE.map(([k, v], i) => (
                <div key={k} style={{ "--i": i, "--n": 15 + v.length }}>
                  <b>&gt;</b> {k.padEnd(9)} : <em>{v}</em>{i === CODE.length - 1 && <span className="ab2-cur" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ab2-mvs">
          <Rv><div className="ab2-mv"><div><div className="ab2-ic">◎</div><h3>Our mission</h3><p>{MISSION}</p></div></div></Rv>
          <Rv d={0.15}><div className="ab2-mv"><div><div className="ab2-ic">✦</div><h3>Our vision</h3><p>{VISION}</p></div></div></Rv>
        </div>
      </div></section>

      {/* ---------- technology strip ---------- */}
      <div className="ab2-mq" aria-hidden="true">
        <div className="ab2-mqt">{[...TECH, ...TECH].map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>

      {/* ---------- values ---------- */}
      <section className="ab2-s"><div className="wrap">
        <Rv><span className="tag">What we stand for</span><h2>Our values</h2></Rv>
        <div className="ab2-vals">
          {VALUES.map((v, i) => (
            <Rv d={0.1 * i} key={v[1]} className="ab2-vw">
              <div className="ab2-val" onMouseMove={spot}>
                <span className="ab2-vn">{String(i + 1).padStart(2, "0")}</span>
                <div className="ab2-hex">{v[0]}</div>
                <h3>{v[1]}</h3>
                <p>{v[2]}</p>
              </div>
            </Rv>
          ))}
        </div>
      </div></section>

      {/* ---------- how we work ---------- */}
      <section className="ab2-s"><div className="wrap">
        <Rv><span className="tag">How we work</span><h2>From idea to launch in four steps</h2></Rv>
        <div ref={tlRef} className={"ab2-tl" + (tlSeen ? " go" : "")}>
          {STEPS.map((x, i) => (
            <div className="ab2-st" key={x[0]} style={{ "--i": i }}>
              <div className="ab2-dot">{x[0]}</div>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
      </div></section>

      <Cta t="Let us build your next idea" />
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