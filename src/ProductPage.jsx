import { Component, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { P, TH } from "../data";
import { PD } from "../productData";
import "./ProductPage.css";

// Shows the error on screen (instead of a blank page) if something goes wrong
class Guard extends Component {
  state = { err: null };
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <div className="wrap" style={{ padding: "80px 24px", color: "#fff" }}>
        <h2>This page hit an error</h2>
        <p style={{ color: "#ff8a9b", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{String(this.state.err?.stack || this.state.err)}</p>
        <p style={{ color: "#a0a8bf" }}>Send this message to your developer or to Claude.</p>
      </div>
    );
  }
}

// One template, used by all 7 product pages. Content comes from src/productData.js
export default function ProductPage({ id }) {
  return <Guard key={id}><ProductView id={id} /></Guard>;
}

function ProductView({ id }) {
  const [tab, setTab] = useState(0);
  const modRef = useRef(null);

  const idx = P.findIndex((x) => x.id === id);
  const p = P[idx];
  const d = PD[id];
  const th = TH.find((t) => t[3] === id);
  if (!p || !d || !th) return <Navigate to="/" replace />;

  const [word, dark, neon] = th;
  const others = [1, 2, 3].map((n) => P[(idx + n) % P.length]);
  const mods = d.modules || [];
  const m = mods[tab] || ["", "", []];
  const feats = p.f || [];

  return (
    <div className="pp" key={id} style={{ "--pc": neon, "--pd": dark }}>
      {/* ---------- Banner ---------- */}
      <section className="pp-hero">
        <div className="pp-word" aria-hidden="true">{word}</div>
        <div className="wrap">
          <p className="crumb"><Link to="/">Home</Link> / Products / {p.name}</p>
          <span className="pp-pill"><i>{p.icon}</i>{p.name}</span>
          <h1>{d.head}</h1>
          <p className="lead">{p.tag}</p>
          <div className="btns">
            <Link className="btn pri" to="/contact">Request a demo</Link>
            <button className="btn pp-ghost" onClick={() => modRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              See what is inside ↓
            </button>
          </div>
        </div>
      </section>

      {/* ---------- What is it ---------- */}
      <section className="sec">
        <div className="wrap split">
          <div>
            <h2>What is {p.name}?</h2>
            {(d.what || []).map((t) => <p className="sub" style={{ margin: "0 0 14px" }} key={t}>{t}</p>)}
          </div>
          <div className="pp-glance">
            <div className="pp-gi">{p.icon}</div>
            <h3>At a glance</h3>
            <p>{p.tag}</p>
            <ul>{feats.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* ---------- Problems -> fixes ---------- */}
      <section className="sec alt">
        <div className="wrap">
          <h2>Problems it solves</h2>
          <p className="sub">What goes wrong today, and how {p.name} fixes it.</p>
          <div className="pp-fixes">
            {(d.fixes || []).map(([bad, good]) => (
              <div className="pp-fix" key={bad}>
                <div className="pp-bad"><b>Today</b><span>{bad}</span></div>
                <div className="pp-arrow" aria-hidden="true">→</div>
                <div className="pp-good"><b>With {p.name.split(" ")[0]}</b><span>{good}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Modules (tabs) ---------- */}
      <section className="sec" ref={modRef}>
        <div className="wrap">
          <h2>What is inside</h2>
          <p className="sub">Pick a module to see what it does.</p>
          <div className="pp-mods">
            <div className="pp-tabs" role="tablist" aria-label="Modules">
              {mods.map((x, i) => (
                <button key={x[0]} role="tab" aria-selected={i === tab} className={i === tab ? "on" : ""} onClick={() => setTab(i)}>
                  <em>{String(i + 1).padStart(2, "0")}</em>{x[0]}
                </button>
              ))}
            </div>
            <div className="pp-mpanel" role="tabpanel" key={tab}>
              <h3>{m[0]}</h3>
              <p>{m[1]}</p>
              <ul className="ticks">{(m[2] || []).map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="sec alt">
        <div className="wrap">
          <h2>How it works</h2>
          <p className="sub">From first call to go-live, in four steps.</p>
          <div className="steps">
            {(d.steps || []).map(([t, x], i) => (
              <div className="step" key={t}><span>{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{x}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Built for ---------- */}
      <section className="sec">
        <div className="wrap">
          <h2>Built for</h2>
          <p className="sub">Businesses where {p.name} makes the biggest difference.</p>
          <div className="grid">
            {(d.who || []).map(([t, x]) => (
              <div className="card" key={t}><div className="ic2">{p.icon}</div><h3>{t}</h3><p>{x}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What changes ---------- */}
      <section className="sec alt">
        <div className="wrap">
          <h2>What changes for you</h2>
          <div className="pp-wins">
            {(d.wins || []).map(([t, x], i) => (
              <div className="pp-win" key={t}><b>{String(i + 1).padStart(2, "0")}</b><h3>{t}</h3><p>{x}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="sec">
        <div className="wrap pp-narrow">
          <h2>Frequently asked questions</h2>
          <div className="pp-faq">
            {(d.faq || []).map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Other products ---------- */}
      <section className="sec alt">
        <div className="wrap">
          <h2>Other products</h2>
          <p className="sub">Each product works on its own, and they connect when you use more than one.</p>
          <div className="grid">
            {others.map((o) => (
              <Link className="card" to={"/" + o.id} key={o.id}>
                <div className="ic2">{o.icon}</div><h3>{o.name}</h3><p>{o.tag}</p><span className="more">View product →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 76, paddingTop: 76 }}>
        <div className="cta">
          <h2>Ready to see {p.name} in action?</h2>
          <p>Tell us about your business and we will get back to you.</p>
          <Link className="btn pri" to="/contact">Contact us</Link>
        </div>
      </div>
    </div>
  );
}
