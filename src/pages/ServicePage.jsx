import { Link, Navigate } from "react-router-dom";
import { SERVICES, STEPS } from "../data";
import { SD } from "../serviceData";
import "./ProductPage.css";

// One template for all 4 service pages. Content comes from src/serviceData.js
export default function ServicePage({ id }) {
  const idx = SERVICES.findIndex((x) => x.id === id);
  const s = SERVICES[idx];
  const d = SD[id];
  if (!s || !d) return <Navigate to="/services" replace />;
  const others = [1, 2, 3].map((n) => SERVICES[(idx + n) % SERVICES.length]);

  return (
    <div className="pp" style={{ "--pc": s.c, "--pd": "color-mix(in srgb, " + s.c + " 30%, #000)" }}>
      <section className="pp-hero">
        <div className="pp-word" aria-hidden="true">{d.word}</div>
        <div className="wrap">
          <p className="crumb"><Link to="/">Home</Link> / <Link to="/services">Our services</Link> / {s.name}</p>
          <span className="pp-pill"><i>{s.icon}</i>{s.name}</span>
          <h1>{d.head}</h1>
          <p className="lead">{s.d}</p>
          <div className="btns">
            <Link className="btn pri" to="/contact">Talk to us</Link>
            <Link className="btn pp-ghost" to="/services">All services</Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <h2>What we do</h2>
            {d.what.map((t) => <p className="sub" style={{ margin: "0 0 14px" }} key={t}>{t}</p>)}
          </div>
          <div className="pp-glance">
            <div className="pp-gi">{s.icon}</div>
            <h3>At a glance</h3>
            <p>{s.name}</p>
            <ul>{s.pts.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <h2>What you get</h2>
          <p className="sub">The main things we build and look after under {s.name}.</p>
          <div className="grid">
            {d.items.map(([t, x]) => (
              <div className="card" key={t}><div className="ic2">{s.icon}</div><h3>{t}</h3><p>{x}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>How we work</h2>
          <p className="sub">The same simple process on every project.</p>
          <div className="steps">
            {STEPS.map(([n, t, x]) => <div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{x}</p></div>)}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <h2>Who it helps</h2>
          <div className="pp-wins">
            {d.who.map(([t, x], i) => (
              <div className="pp-win" key={t}><b>{String(i + 1).padStart(2, "0")}</b><h3>{t}</h3><p>{x}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap pp-narrow">
          <h2>Frequently asked questions</h2>
          <div className="pp-faq">
            {d.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <h2>Other services</h2>
          <div className="grid">
            {others.map((o) => (
              <Link className="card" to={"/services/" + o.id} key={o.id}>
                <div className="ic2">{o.icon}</div><h3>{o.name}</h3><p>{o.d}</p><span className="more">View service →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 76, paddingTop: 76 }}>
        <div className="cta">
          <h2>Tell us what you need</h2>
          <p>Describe your business and we will suggest where to start.</p>
          <Link className="btn pri" to="/contact">Contact us</Link>
        </div>
      </div>
    </div>
  );
}
