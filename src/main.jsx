
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  Droplets,
  HeartPulse,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Smartphone
} from "lucide-react";

import ChatWidget from "./components/ChatWidget";
import "./styles.css";

const features = [
  {
    icon: <Droplets />,
    number: "01",
    title: "Un suivi précis",
    text: "Visualisez votre consommation et gardez le cap sur vos objectifs d'hydratation."
  },
  {
    icon: <Bell />,
    number: "02",
    title: "Des rappels intelligents",
    text: "Recevez des rappels utiles pour intégrer naturellement l'hydratation à votre journée."
  },
  {
    icon: <Smartphone />,
    number: "03",
    title: "Un écosystème connecté",
    text: "Retrouvez vos habitudes et vos données dans une expérience pensée pour votre quotidien."
  }
];

const steps = [
  ["01", "Connectez", "Associez votre gourde à votre application en quelques instants."],
  ["02", "Personnalisez", "Définissez vos habitudes et vos objectifs selon votre rythme."],
  ["03", "Progressez", "Suivez votre évolution et recevez des rappels au bon moment."]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
  };

  return (
    <div className="site-shell">

      {/* Announcement */}
      <div className="announcement">
        <span className="announcement-dot" />
        L'hydratation évolue. Découvrez une nouvelle habitude.
        <a href="#concept">
          Explorer <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Header */}
      <header className="header">

        <a className="brand" href="#" aria-label="Onda, accueil">
          <span className="brand-mark">
            <Droplets size={21} />
          </span>
          onda<span className="brand-period">.</span>
        </a>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#concept" onClick={closeMenu}>Le concept</a>
          <a href="#benefices" onClick={closeMenu}>Les bénéfices</a>
          <a href="#experience" onClick={closeMenu}>L'expérience</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>

          <a
            className="nav-mobile-cta"
            href="#contact"
            onClick={closeMenu}
          >
            Être informé <ArrowUpRight size={16} />
          </a>
        </nav>

        <a className="header-cta" href="#contact">
          Rejoindre la liste <ArrowUpRight size={16} />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

      </header>

      <main>

        {/* Hero */}
        <section className="hero" id="concept">

          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />

          <div className="hero-copy">

            <div className="eyebrow">
              <span className="eyebrow-line" />
              LE BIEN-ÊTRE EN MOUVEMENT
            </div>

            <h1>
              Votre journée.
              <br />
              Votre rythme.
              <br />
              <em>Votre hydratation.</em>
            </h1>

            <p className="hero-description">
              Une gourde intelligente qui vous aide à prendre soin de vous,
              un geste après l'autre. La technologie au service d'une
              habitude essentielle.
            </p>

            <div className="hero-actions">

              <a className="button button-dark" href="#contact">
                Découvrir le projet <ArrowRight size={17} />
              </a>

              <a className="text-link" href="#experience">
                <span className="play-icon">↘</span>
                Comment ça marche
              </a>

            </div>

            <div className="hero-proof">

              <div className="proof-avatars">
                <span>S</span>
                <span>O</span>
                <span>+</span>
              </div>

              <p>
                <strong>Une routine plus consciente</strong>
                <br />
                Pensée pour les vies actives.
              </p>

            </div>

          </div>

          <div className="hero-visual">

            <div className="visual-orbit orbit-a" />
            <div className="visual-orbit orbit-b" />

            <div className="visual-label label-top">
              <span className="pulse-dot" />
              <span>
                HYDRATATION
                <br />
                <b>EN ÉQUILIBRE</b>
              </span>
            </div>

            <img
              className="bottle-image"
              src="/smart-bottle.jpg"
              alt="Gourde connectée au design minimaliste"
            />

            <div className="floating-card reminder-card">

              <span className="floating-icon">
                <Bell size={17} />
              </span>

              <span>
                <small>RAPPEL DOUX</small>
                <b>Une petite pause ?</b>
              </span>

              <span className="card-check">
                <Check size={14} />
              </span>

            </div>

            <div className="floating-card stat-card">

              <span className="stat-icon">
                <Droplets size={18} />
              </span>

              <span>
                <small>VOTRE ROUTINE</small>
                <b>Suivez vos progrès</b>
              </span>

              <ArrowUpRight size={16} />

            </div>

            <div className="visual-caption">
              DES GESTES SIMPLES. UN QUOTIDIEN PLUS ÉQUILIBRÉ.
            </div>

          </div>

          <div className="hero-bottom">
            <span>01 / 04</span>
            <span className="bottom-line" />
            <span>LA NOUVELLE FAÇON DE S'HYDRATER</span>
          </div>

        </section>

        {/* Ticker */}
        <section className="ticker">
          <div className="ticker-track">
            <span>BOIRE MIEUX</span>
            <i>✳</i>
            <span>VIVRE PLEINEMENT</span>
            <i>✳</i>
            <span>RESTER À L'ÉCOUTE</span>
            <i>✳</i>
            <span>BOIRE MIEUX</span>
            <i>✳</i>
            <span>VIVRE PLEINEMENT</span>
            <i>✳</i>
          </div>
        </section>

        {/* Features */}
        <section className="intro section-pad" id="benefices">

          <div className="section-kicker">
            01 — LE CONCEPT
          </div>

          <div className="intro-content">

            <h2>
              Plus qu'une gourde.
              <br />
              <span>Une nouvelle habitude.</span>
            </h2>

            <div className="intro-aside">

              <p>
                Nous croyons que prendre soin de soi commence par les gestes
                les plus simples. Onda associe un objet du quotidien à une
                expérience connectée pour rendre l'hydratation plus facile
                à suivre et à adopter.
              </p>

              <a className="under-link" href="#experience">
                Découvrir l'expérience <ArrowUpRight size={16} />
              </a>

            </div>

          </div>

          <div className="feature-grid">

            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>

                <div className="feature-top">
                  <span className="feature-icon">
                    {feature.icon}
                  </span>
                  <span>{feature.number}</span>
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.text}</p>

                <div className="feature-arrow">
                  <ArrowUpRight size={18} />
                </div>

              </article>
            ))}

          </div>

        </section>

        {/* Lifestyle */}
        <section className="manifesto">

          <div className="manifesto-image">

            <img
              src="/lifestyle.jpg"
              alt="Un mode de vie actif accompagné par l'hydratation connectée"
            />

            <div className="image-tag">
              L'ÉQUILIBRE AU QUOTIDIEN <span>✳</span>
            </div>

          </div>

          <div className="manifesto-copy">

            <div className="section-kicker light-kicker">
              02 — POUR VOTRE QUOTIDIEN
            </div>

            <h2>
              Le bon réflexe,
              <br />
              <em>au bon moment.</em>
            </h2>

            <p>
              Au bureau, à la salle de sport ou en déplacement :
              votre hydratation vous accompagne. Une expérience pensée
              pour les étudiants, les actifs et les sportifs qui veulent
              prendre soin d'eux sans compliquer leur journée.
            </p>

            <a className="button button-light" href="#contact">
              Faire partie de l'aventure <ArrowRight size={17} />
            </a>

            <div className="manifesto-note">
              <HeartPulse size={18} />
              Une approche centrée sur vos habitudes, pas sur la pression.
            </div>

          </div>

        </section>

        {/* How it works */}
        <section className="experience section-pad" id="experience">

          <div className="section-kicker">
            03 — COMMENT ÇA MARCHE
          </div>

          <div className="experience-heading">

            <h2>
              Simple à adopter.
              <br />
              <span>Facile à garder.</span>
            </h2>

            <p>
              La technologie s'efface pour laisser place à l'essentiel :
              vous aider à construire une routine qui vous ressemble.
            </p>

          </div>

          <div className="steps-grid">

            {steps.map(([number, title, description]) => (
              <article className="step" key={number}>

                <span className="step-number">{number}</span>

                <div className="step-line" />

                <h3>{title}</h3>

                <p>{description}</p>

              </article>
            ))}

          </div>

          <div className="experience-banner">

            <div className="banner-symbol">
              <Sparkles size={25} />
            </div>

            <div>
              <span>UNE TECHNOLOGIE QUI VOUS RESSEMBLE</span>
              <h3>Moins y penser. Mieux s'hydrater.</h3>
            </div>

            <a href="#contact" aria-label="En savoir plus">
              <ArrowUpRight size={23} />
            </a>

          </div>

        </section>

        {/* FAQ */}
        <section className="faq section-pad" id="faq">

          <div className="section-kicker">
            04 — QUESTIONS FRÉQUENTES
          </div>

          <div className="faq-layout">

            <h2>
              Vous avez
              <br />
              <span>des questions ?</span>
            </h2>

            <div className="faq-list">

              <details>
                <summary>
                  Qu'est-ce que la gourde connectée ?
                  <ChevronDown size={18} />
                </summary>

                <p>
                  Un concept de gourde intelligente associé à une expérience
                  connectée pour suivre ses habitudes d'hydratation
                  et recevoir des rappels.
                </p>
              </details>

              <details>
                <summary>
                  À qui s'adresse le projet ?
                  <ChevronDown size={18} />
                </summary>

                <p>
                  Aux personnes actives qui souhaitent mieux intégrer
                  l'hydratation à leur quotidien : étudiants,
                  professionnels et sportifs.
                </p>
              </details>

              <details>
                <summary>
                  Comment suivre son hydratation ?
                  <ChevronDown size={18} />
                </summary>

                <p>
                  Le concept prévoit un suivi de la consommation,
                  des objectifs personnalisés et des rappels via
                  un écosystème connecté.
                </p>
              </details>

              <details>
                <summary>
                  Quand le produit sera-t-il disponible ?
                  <ChevronDown size={18} />
                </summary>

                <p>
                  Les informations de lancement seront communiquées
                  prochainement. Inscrivez-vous pour suivre les
                  actualités du projet.
                </p>
              </details>

            </div>

          </div>

        </section>

        {/* Contact */}
        <section className="contact" id="contact">

          <div className="contact-glow" />

          <div className="section-kicker light-kicker">
            LE PREMIER GESTE COMMENCE ICI
          </div>

          <h2>
            Et si vous changiez
            <br />
            votre façon de <em>boire ?</em>
          </h2>

          <p>
            Rejoignez la liste d'intérêt et soyez parmi les premiers
            à suivre l'aventure Onda.
          </p>

          {submitted ? (

            <div className="success-message">
              <span><Check size={18} /></span>
              Merci ! Votre intérêt est bien pris en compte dans cette démo.
            </div>

          ) : (

            <form className="signup-form" onSubmit={handleSubmit}>

              <input
                type="email"
                placeholder="Votre adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Adresse e-mail"
              />

              <button type="submit">
                Je rejoins <ArrowRight size={17} />
              </button>

            </form>

          )}

          <small className="form-note">
            <ShieldCheck size={13} />
            Démonstration front-end — aucune donnée n'est envoyée.
          </small>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">

        <a className="brand footer-brand" href="#">
          <span className="brand-mark">
            <Droplets size={19} />
          </span>
          onda<span className="brand-period">.</span>
        </a>

        <span>
          © 2026 ONDA — L'HYDRATATION EN HARMONIE.
        </span>

        <div>
          <a href="#concept">Le concept</a>
          <a href="#contact">Contact</a>
          <a href="#">Instagram ↗</a>
        </div>

      </footer>

      {/* AI CHATBOT */}
      <ChatWidget />

    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
