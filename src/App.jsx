import { useState, useEffect, useRef } from "react";

const MEDIA_LOGOS = [
  { name: "CTV News", img: "/logos/ctv-news.svg" },
  { name: "CBC News", img: "/logos/cbc-news.png" },
  { name: "Forbes", img: "/logos/forbes.png" },
  { name: "The Logic", img: "/logos/the-logic.png" },
  { name: "Bloomberg", img: "/logos/bloomberg.png" },
  { name: "The Globe and Mail", img: "/logos/globe-and-mail.png" },
  { name: "BNN Bloomberg", img: "/logos/bnn-bloomberg.png" },
  { name: "Financial Post", img: "/logos/financial-post.png" },
  { name: "BetaKit", img: "/logos/betakit.png" },
  { name: "Cointelegraph", img: "/logos/cointelegraph.png" },
  { name: "American Banker", img: "/logos/american-banker.png" },
  { name: "The Defiant", img: "/logos/the-defiant.png" },
];

const TETRA_HEADLINES = [
  { outlet: "BetaKit", text: "Tetra Trust parent secures backing from banks, FinTechs to launch Canadian stablecoin", url: "https://betakit.com" },
  { outlet: "Forbes", text: "Banks Push To Block Stablecoin Yields", url: "https://forbes.com" },
  { outlet: "The Globe and Mail", text: "Federal budget 2025: Plan for stablecoin rules to usher in Canada's 'digital dollar era,' advocates say", url: "https://theglobeandmail.com" },
  { outlet: "American Banker", text: "Inside a Canadian stablecoin consortium", url: "https://americanbanker.com" },
  { outlet: "CBC News", text: "A digital dollar? Why this Alberta company wants to launch a Canadian stablecoin", url: "https://cbc.ca" },
  { outlet: "BNN Bloomberg", text: "Digital currency could ensure the Canadian dollar remains relevant: Lavallée on Canadian stablecoin", url: "https://bnnbloomberg.ca" },
];

const SYMBIOTIC_HEADLINES = [
  { outlet: "Bloomberg", text: "Canadian Crypto Firms Struggle to Create First Local Stablecoin", url: "https://bloomberg.com" },
  { outlet: "CTV News", text: "'Massive innovation opportunity': Expert on stablecoins' regulatory framework", url: "https://ctvnews.ca" },
  { outlet: "Cointelegraph", text: "Op-ed: Canada will be left behind in the global crypto race", url: "https://cointelegraph.com" },
  { outlet: "The Defiant", text: "Symbiotic Partners with Chainlink and Lombard for Cross-Chain LBTC Transfers", url: "https://thedefiant.io" },
  { outlet: "Thinking Crypto", text: "Symbiotic is Revolutionizing Crypto Staking!", url: "https://thinkingcrypto.com" },
  { outlet: "BNN Bloomberg", text: "U.S. Senate passes stablecoin bill for crypto industry", url: "https://bnnbloomberg.ca" },
];

const SERVICES = [
  { title: "Messaging & Positioning", desc: "We refine your story through a journalist's lens, identifying the angle that captures attention, communicates your expertise, and resonates with the audience.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="#c8102e" strokeWidth="1.5"/>
        <circle cx="20" cy="18" r="5" stroke="#c8102e" strokeWidth="1.5"/>
        <path d="M12 28l4-4m12 4l-4-4" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="12" x2="26" y2="12" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    )},
  { title: "Media Relations", desc: "We help clients earn meaningful coverage in top-tier outlets by understanding how decisions are made in newsrooms and aligning your story with what matters most.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12h24v18a2 2 0 01-2 2H10a2 2 0 01-2-2V12z" stroke="#c8102e" strokeWidth="1.5"/>
        <path d="M8 12l12 9 12-9" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="30" cy="10" r="5" fill="#c8102e" opacity="0.15" stroke="#c8102e" strokeWidth="1.5"/>
        <path d="M28.5 10l1 1 2-2.5" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
  { title: "Media Training", desc: "We prepare executives for high-stakes interviews, helping them communicate with confidence, deliver concise messages, and navigate interviews with precision.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="6" width="20" height="14" rx="2" stroke="#c8102e" strokeWidth="1.5"/>
        <circle cx="20" cy="13" r="3" stroke="#c8102e" strokeWidth="1.5"/>
        <path d="M14 24h12" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 20v4" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 30c0-3 3.6-5.5 8-5.5s8 2.5 8 5.5" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 10v6m0 0l-2-2m2 2l2-2" stroke="#c8102e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        <path d="M33 10v6m0 0l-2-2m2 2l2-2" stroke="#c8102e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      </svg>
    )},
  { title: "Thought Leadership", desc: "From bylines and op-eds to podcasts and speaking engagements, we turn expertise into opportunities that establish credibility and position leaders as trusted authorities.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6c-5.5 0-10 4-10 9 0 3.3 1.8 6.2 4.5 7.8V28h11v-5.2C28.2 21.2 30 18.3 30 15c0-5-4.5-9-10-9z" stroke="#c8102e" strokeWidth="1.5"/>
        <path d="M16 28h8v3a1 1 0 01-1 1h-6a1 1 0 01-1-1v-3z" stroke="#c8102e" strokeWidth="1.5"/>
        <path d="M17 18h6M17 21h6" stroke="#c8102e" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
        <path d="M20 6v-2m8.5 5.5l1.5-1.5M30 15h2M11.5 9.5L10 8M10 15H8" stroke="#c8102e" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
      </svg>
    )},
];

const LOGO_IMG_MAP = {
  "CTV News": "/logos/ctv-news.svg",
  "CBC News": "/logos/cbc-news.png",
  "Forbes": "/logos/forbes.png",
  "The Logic": "/logos/the-logic.png",
  "Bloomberg": "/logos/bloomberg.png",
  "The Globe and Mail": "/logos/globe-and-mail.png",
  "BNN Bloomberg": "/logos/bnn-bloomberg.png",
  "Financial Post": "/logos/financial-post.png",
  "BetaKit": "/logos/betakit.png",
  "Cointelegraph": "/logos/cointelegraph.png",
  "American Banker": "/logos/american-banker.png",
  "The Defiant": "/logos/the-defiant.png",
  "Thinking Crypto": "/logos/thinking-crypto.png",
};

function PressLogo({ name }) {
  const src = LOGO_IMG_MAP[name];
  if (!src) return <span style={{ fontFamily: "Georgia,serif", fontWeight: 700, fontSize: "0.85rem", color: "#1a1a1a" }}>{name}</span>;
  return <img src={src} alt={name} style={{ height: "24px", maxWidth: "150px", objectFit: "contain", borderRadius: "2px" }} />;
}

function Marquee() {
  const items = [...MEDIA_LOGOS, ...MEDIA_LOGOS, ...MEDIA_LOGOS];
  return (
    <div style={{ overflow: "hidden", padding: "40px 0", background: "#fafafa", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
      <p style={{ textAlign: "center", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#999", marginBottom: "24px", fontWeight: 600 }}>Positioned for Real Coverage</p>
      <div style={{ display: "flex", alignItems: "center", animation: "marquee 35s linear infinite", width: "fit-content" }}>
        {items.map((logo, i) => (
          <div key={i} style={{ flex: "0 0 auto", padding: "0 36px", display: "flex", alignItems: "center" }}>
            <img src={logo.img} alt={logo.name} style={{ height: "28px", maxWidth: "160px", objectFit: "contain", borderRadius: "3px" }} />
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

function HeadlineCard({ item }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      style={{
        display: "block", background: "#fff", borderRadius: "10px", padding: "20px 22px",
        textDecoration: "none", color: "#0a0a0a", transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #eee",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
    >
      <div style={{ marginBottom: "12px" }}><PressLogo name={item.outlet} /></div>
      <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.55, fontWeight: 500, color: "#1a1a1a" }}>{item.text}</p>
      <span style={{ display: "inline-block", marginTop: "10px", fontSize: "0.75rem", color: "#c8102e", fontWeight: 600, letterSpacing: "0.03em" }}>Read Article →</span>
    </a>
  );
}

const INTRO_WORDS = ["Strategic.", "Precise.", "Earned.", "Credible.", "Trusted."];

function IntroAnimation({ onComplete }) {
  const [logoIn, setLogoIn] = useState(false);
  const [wordsShown, setWordsShown] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reduced = typeof window !== "undefined"
      && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (reduced) {
      const t = setTimeout(() => {
        document.body.style.overflow = prevOverflow;
        onComplete();
      }, 300);
      return () => { clearTimeout(t); document.body.style.overflow = prevOverflow; };
    }

    const timers = [];
    const LOGO_DELAY = 150;
    const WORDS_START = 1100;
    const WORD_STAGGER = 260;
    const EXIT_HOLD = 500;
    const EXIT_DURATION = 800;

    timers.push(setTimeout(() => setLogoIn(true), LOGO_DELAY));
    INTRO_WORDS.forEach((_, i) => {
      timers.push(setTimeout(() => setWordsShown(n => Math.max(n, i + 1)),
        WORDS_START + i * WORD_STAGGER));
    });
    const wordsDoneAt = WORDS_START + INTRO_WORDS.length * WORD_STAGGER;
    timers.push(setTimeout(() => setExiting(true), wordsDoneAt + EXIT_HOLD));
    timers.push(setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      onComplete();
    }, wordsDoneAt + EXIT_HOLD + EXIT_DURATION));

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div aria-hidden="true" style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "#0a0a0a",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
      transform: exiting ? "translateY(-100%)" : "translateY(0)",
      transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
      willChange: "transform"
    }}>
      <img src="/logo-light.png" alt="" style={{
        height: "clamp(44px, 9vw, 80px)", objectFit: "contain", marginBottom: "48px",
        opacity: logoIn ? 1 : 0,
        transform: logoIn ? "scale(1)" : "scale(0.9)",
        transition: "opacity 0.9s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "opacity, transform"
      }} />
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(1.6rem, 4.4vw, 3rem)",
        fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15,
        textAlign: "center"
      }}>
        {INTRO_WORDS.map((w, i) => (
          <span key={w} style={{
            opacity: wordsShown > i ? 1 : 0,
            transform: wordsShown > i ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "opacity, transform"
          }}>{w}</span>
        ))}
      </div>
    </div>
  );
}

function Nav({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    if (mobileOpen) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);
  const links = [
    { label: "About", target: "about" }, { label: "Services", target: "services" },
    { label: "Work", target: "work" }, { label: "Contact", target: "contact" },
  ];
  const handleClick = (target) => {
    setMobileOpen(false);
    if (target === "contact") { onNavigate("contact"); return; }
    if (currentPage !== "home") { onNavigate("home", target); }
    else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || mobileOpen ? "rgba(10,10,10,0.97)" : "transparent",
        backdropFilter: scrolled || mobileOpen ? "blur(12px)" : "none",
        transition: "all 0.4s ease", padding: "0 clamp(16px, 4vw, 60px)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <div onClick={() => { setMobileOpen(false); onNavigate("home"); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <img src="/logo-light.png" alt="Free Reign Media" className="nav-logo-img" style={{ height: "32px", objectFit: "contain" }} />
          </div>
          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {links.map(l => (
              <span key={l.target} onClick={() => handleClick(l.target)} style={{
                cursor: "pointer", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.7)", fontWeight: 500, transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
              >{l.label}</span>
            ))}
          </div>
          {/* Hamburger button */}
          <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)} style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            padding: "8px", flexDirection: "column", gap: mobileOpen ? "0px" : "5px",
            alignItems: "center", justifyContent: "center", width: "40px", height: "40px", position: "relative"
          }}>
            <span style={{
              display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "1px",
              transition: "all 0.3s ease",
              transform: mobileOpen ? "rotate(45deg) translateY(0px)" : "rotate(0) translateY(0)",
              position: mobileOpen ? "absolute" : "relative"
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "1px",
              transition: "all 0.3s ease",
              opacity: mobileOpen ? 0 : 1,
              position: mobileOpen ? "absolute" : "relative"
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px", background: "#fff", borderRadius: "1px",
              transition: "all 0.3s ease",
              transform: mobileOpen ? "rotate(-45deg) translateY(0px)" : "rotate(0) translateY(0)",
              position: mobileOpen ? "absolute" : "relative"
            }} />
          </button>
        </div>
      </nav>
      {/* Mobile drawer */}
      <div className="nav-mobile-drawer" style={{
        position: "fixed", top: "64px", left: 0, right: 0, bottom: 0, zIndex: 99,
        background: "rgba(10,10,10,0.98)", backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
        opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "all" : "none",
        transition: "opacity 0.3s ease"
      }}>
        {links.map((l, i) => (
          <span key={l.target} onClick={() => handleClick(l.target)} style={{
            cursor: "pointer", fontSize: "1.3rem", textTransform: "uppercase", letterSpacing: "0.15em",
            color: "#fff", fontWeight: 600, padding: "16px 24px", transition: "color 0.2s",
            opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(10px)",
            transitionDelay: mobileOpen ? `${i * 0.06}s` : "0s",
            transitionProperty: "opacity, transform, color",
            transitionDuration: "0.4s"
          }}
            onMouseEnter={e => e.target.style.color = "#c8102e"}
            onMouseLeave={e => e.target.style.color = "#fff"}
          >{l.label}</span>
        ))}
        <div style={{ width: "40px", height: "1px", background: "#c8102e", margin: "8px 0", opacity: mobileOpen ? 0.5 : 0, transition: "opacity 0.4s ease 0.3s" }} />
        <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", opacity: mobileOpen ? 1 : 0, transition: "opacity 0.4s ease 0.35s" }}>We Engineer Credibility</span>
      </div>
      <style>{`
        .nav-logo-img { height: 32px; }
        .nav-desktop-links { display: flex !important; }
        .nav-hamburger { display: none !important; }
        .nav-mobile-drawer { display: none !important; }
        @media (max-width: 768px) {
          .nav-logo-img { height: 26px !important; }
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-mobile-drawer { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function Hero({ onNavigate }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
      position: "relative", overflow: "hidden", padding: "80px 24px"
    }}>
      <div style={{
        position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(200,16,46,0.06) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        textAlign: "center", maxWidth: "800px", opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "#c8102e", marginBottom: "20px", fontWeight: 600 }}>Strategic Communications</p>
        <img src="/logo-light.png" alt="Free Reign Media" style={{ height: "50px", objectFit: "contain", marginBottom: "20px" }} />
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.4rem, 7vw, 5rem)",
          color: "#fff", fontWeight: 700, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: "-0.02em"
        }}>We Engineer<br />Credibility.</h1>
        <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "620px", margin: "0 auto 36px" }}>
          Built on nearly two decades inside Canada's most demanding newsrooms, we guide clients in navigating the media with clarity and focus, helping them build trust, demonstrate expertise, and make an impact where it counts.
        </p>
        <button onClick={() => onNavigate("contact")} style={{
          background: "#c8102e", color: "#fff", border: "none", padding: "14px 36px",
          fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600,
          cursor: "pointer", borderRadius: "2px", transition: "all 0.3s ease"
        }}
          onMouseEnter={e => { e.target.style.background = "#a00d24"; }}
          onMouseLeave={e => { e.target.style.background = "#c8102e"; }}
        >Start the Conversation</button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{
      background: "linear-gradient(170deg, #0a0a0a 0%, #141414 40%, #1a1a1a 100%)",
      padding: "100px clamp(20px, 5vw, 60px)", color: "#fff"
    }}>
      <div className="about-grid" style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "60px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 280px", textAlign: "center" }}>
          <div style={{
            width: "220px", height: "280px", borderRadius: "8px", margin: "0 auto",
            overflow: "hidden"
          }}>
            <img src="/headshot.jpg" alt="Gina Chung" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <p style={{ marginTop: "16px", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.1rem", fontWeight: 600 }}>Gina Chung</p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>Founder & Lead Strategist</p>
        </div>
        <div style={{ flex: 1, minWidth: "300px" }}>
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "#c8102e", marginBottom: "16px", fontWeight: 600 }}>Who We Are</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 24px", letterSpacing: "-0.01em" }}>
            Real Editorial Experience.<br />Real Results.
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>
            Free Reign Media is founded on nearly two decades inside Canada's most demanding newsrooms. Led by Gina Chung—a communications strategist, former reporter, and veteran news producer—our work is grounded in real editorial decision-making and execution.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
            We don't just understand media. We've lived it. From the assignment desk to the anchor chair, we know how stories get made—and how to position yours for maximum impact.
          </p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding: "100px clamp(20px, 5vw, 60px)", background: "#fff" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "#c8102e", marginBottom: "12px", fontWeight: 600 }}>What We Do</p>
        <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "28px", marginTop: "40px" }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{
              padding: "36px 32px", borderRadius: "8px", border: "1px solid #eee",
              transition: "all 0.3s ease", background: "#fff"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8102e"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(200,16,46,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ marginBottom: "18px" }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", fontWeight: 700, color: "#0a0a0a", margin: "0 0 14px" }}>{s.title}</h3>
              <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#555", margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkPreview({ onNavigate }) {
  return (
    <section id="work" style={{ padding: "100px clamp(20px, 5vw, 60px)", background: "#fafafa" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "#c8102e", marginBottom: "12px", fontWeight: 600 }}>Selected Work</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#0a0a0a", margin: "0 0 50px" }}>Case Studies</h2>
        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
          {[
            { name: "Tetra Digital Group", desc: "Shifted the conversation from speculation to infrastructure. 30+ earned media stories in 4 months.", page: "tetra", logoText: "TETRA", logoBg: "#0a2540" },
            { name: "Symbiotic", desc: "Elevated a technical startup to an essential partner for global capital. 3 national TV appearances.", page: "symbiotic", logoImg: "/symbiotic-logo.jpg" },
          ].map((c, i) => (
            <div key={i} onClick={() => onNavigate(c.page)} style={{
              background: "#0a0a0a", borderRadius: "12px", padding: "40px 32px", cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease", color: "#fff"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ marginBottom: "16px" }}>
                {c.logoImg ? (
                  <img src={c.logoImg} alt={c.name} style={{ height: "36px", width: "36px", borderRadius: "6px", objectFit: "cover" }} />
                ) : (
                  <div style={{ display: "inline-flex", background: c.logoBg, padding: "8px 14px", borderRadius: "6px" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#fff", letterSpacing: "0.1em" }}>{c.logoText}</span>
                  </div>
                )}
              </div>
              <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#c8102e", marginBottom: "8px", fontWeight: 600 }}>Case Study</p>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 14px" }}>{c.name}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(255,255,255,0.55)", margin: "0 0 20px" }}>{c.desc}</p>
              <span style={{ fontSize: "0.75rem", color: "#c8102e", fontWeight: 600, letterSpacing: "0.05em" }}>View Case Study →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section style={{ padding: "80px clamp(20px, 5vw, 60px)", background: "#fff" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#c8102e" style={{ marginBottom: "20px", opacity: 0.3 }}>
          <path d="M3 13h2a4 4 0 014 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-5zm10 0h2a4 4 0 014 4v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-5zM3 13V8a5 5 0 015-5h1m5 10V8a5 5 0 015-5h1"/>
        </svg>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", lineHeight: 1.7, color: "#333", fontStyle: "italic", margin: "0 0 24px" }}>
          Gina is a highly professional media and communications expert who deeply understands both the crypto ecosystem and the broader news cycle. She's excellent at media coaching and helping to shape a narrative that resonates globally while helping to maintain an authentic voice. A true partner—always sharp, reliable, and on top of every detail.
        </p>
        <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0a0a0a" }}>Jillian Friedman</p>
        <p style={{ fontSize: "0.75rem", color: "#999" }}>COO, Symbiotic</p>
      </div>
    </section>
  );
}

function ContactCTA({ onNavigate }) {
  return (
    <section id="contact" style={{
      padding: "100px clamp(20px, 5vw, 60px)",
      background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 100%)", color: "#fff", textAlign: "center"
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "#c8102e", marginBottom: "12px", fontWeight: 600 }}>Get in Touch</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, margin: "0 0 16px" }}>Let's Build Your Story</h2>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "32px" }}>
          Ready to position your brand for meaningful coverage? Let's discuss how we can help you navigate the media landscape with clarity and purpose.
        </p>
        <button onClick={() => onNavigate("contact")} style={{
          background: "#c8102e", color: "#fff", border: "none", padding: "14px 36px",
          fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600,
          cursor: "pointer", borderRadius: "2px", transition: "all 0.3s ease"
        }}
          onMouseEnter={e => e.target.style.background = "#a00d24"}
          onMouseLeave={e => e.target.style.background = "#c8102e"}
        >Start Your Inquiry</button>
      </div>
    </section>
  );
}

function CaseStudyPage({ data, onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ paddingTop: "64px" }}>
      <section style={{
        background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 100%)",
        padding: "80px clamp(20px, 5vw, 60px)", color: "#fff"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <span onClick={() => onNavigate("home", "work")} style={{
            fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", cursor: "pointer",
            textTransform: "uppercase", letterSpacing: "0.1em", display: "inline-block", marginBottom: "24px"
          }}
            onMouseEnter={e => e.target.style.color = "#c8102e"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
          >← Back to Work</span>
          {data.clientLogo && (
            <div style={{ marginBottom: "16px" }}>
              {data.clientLogo}
            </div>
          )}
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "#c8102e", marginBottom: "12px", fontWeight: 600 }}>Case Study</p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, margin: "0 0 24px", letterSpacing: "-0.02em" }}>{data.title}</h1>
        </div>
      </section>

      <section style={{ padding: "60px clamp(20px, 5vw, 60px)", background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", fontWeight: 700, color: "#0a0a0a", margin: "0 0 16px" }}>The Assignment</h3>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#555", marginBottom: "16px" }}>{data.assignment1}</p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#555" }}>{data.assignment2}</p>
        </div>
      </section>

      <section style={{ padding: "60px clamp(20px, 5vw, 60px)", background: "#0a0a0a" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", fontWeight: 700, color: "#fff", margin: "0 0 36px" }}>By the Numbers</h3>
          <div className="stats-row" style={{ display: "flex", gap: "48px", flexWrap: "wrap", marginBottom: "0" }}>
            {data.stats.map((s, i) => (
              <div key={i} style={{ borderLeft: "3px solid #c8102e", paddingLeft: "20px" }}>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.8rem", fontWeight: 700, color: "#c8102e", lineHeight: 1 }}>{s.number}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", maxWidth: "220px", lineHeight: 1.5, marginTop: "8px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px clamp(20px, 5vw, 60px)", background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", fontWeight: 700, color: "#0a0a0a", margin: "0 0 28px" }}>The Rundown</h3>
          <div className="headline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {data.headlines.map((h, i) => <HeadlineCard key={i} item={h} />)}
          </div>
        </div>
      </section>

      <ContactCTA onNavigate={onNavigate} />
    </div>
  );
}

function ContactPage({ onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [form, setForm] = useState({
    name: "", email: "", company: "", website: "", linkedin: "",
    services: [], otherService: "", startDate: "", context: "", hearAbout: "", hearOther: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const serviceOptions = ["Media Relations", "Media Training", "Narrative Building", "Crisis Communications", "Thought Leadership"];
  const hearOptions = ["LinkedIn", "Referral", "Google Search", "Conference"];

  const toggleService = (s) => {
    setForm(f => ({
      ...f, services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s]
    }));
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", fontSize: "0.9rem", border: "1px solid #ddd",
    borderRadius: "6px", outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
    background: "#fff", boxSizing: "border-box"
  };
  const labelStyle = { display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#333", marginBottom: "6px" };

  if (submitted) {
    return (
      <div style={{ paddingTop: "64px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa" }}>
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✓</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.8rem", margin: "0 0 12px" }}>Thank You</h2>
          <p style={{ color: "#666", lineHeight: 1.7 }}>We've received your inquiry and will be in touch within 24 hours.</p>
          <button onClick={() => onNavigate("home")} style={{
            marginTop: "24px", background: "#0a0a0a", color: "#fff", border: "none",
            padding: "12px 28px", fontSize: "0.8rem", cursor: "pointer", borderRadius: "4px"
          }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "64px" }}>
      <section style={{
        background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 100%)",
        padding: "60px clamp(20px, 5vw, 60px) 40px", color: "#fff"
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <span onClick={() => onNavigate("home")} style={{
            fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", cursor: "pointer",
            textTransform: "uppercase", letterSpacing: "0.1em", display: "inline-block", marginBottom: "24px"
          }}
            onMouseEnter={e => e.target.style.color = "#c8102e"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
          >← Back to Home</span>
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "#c8102e", marginBottom: "12px", fontWeight: 600 }}>Get in Touch</p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 700, margin: "0 0 12px" }}>Start Your Inquiry</h1>
          <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontSize: "0.95rem" }}>Tell us about your project and we'll get back to you within 24 hours.</p>
        </div>
      </section>

      <section style={{ padding: "48px clamp(20px, 5vw, 60px) 80px", background: "#fafafa" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="contact-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Your Name *</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" onFocus={e => e.target.style.borderColor = "#c8102e"} onBlur={e => e.target.style.borderColor = "#ddd"} />
            </div>
            <div>
              <label style={labelStyle}>Your Email *</label>
              <input type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" onFocus={e => e.target.style.borderColor = "#c8102e"} onBlur={e => e.target.style.borderColor = "#ddd"} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Company Name *</label>
            <input style={inputStyle} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your company" onFocus={e => e.target.style.borderColor = "#c8102e"} onBlur={e => e.target.style.borderColor = "#ddd"} />
          </div>

          <div className="contact-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Company Website</label>
              <input style={inputStyle} value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://" onFocus={e => e.target.style.borderColor = "#c8102e"} onBlur={e => e.target.style.borderColor = "#ddd"} />
            </div>
            <div>
              <label style={labelStyle}>Company LinkedIn *</label>
              <input style={inputStyle} value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="linkedin.com/company/..." onFocus={e => e.target.style.borderColor = "#c8102e"} onBlur={e => e.target.style.borderColor = "#ddd"} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>What services are you looking for? (Select all that apply)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
              {serviceOptions.map(s => (
                <button key={s} onClick={() => toggleService(s)} style={{
                  padding: "8px 16px", fontSize: "0.8rem", border: form.services.includes(s) ? "1px solid #c8102e" : "1px solid #ddd",
                  borderRadius: "20px", cursor: "pointer", transition: "all 0.2s",
                  background: form.services.includes(s) ? "#c8102e" : "#fff",
                  color: form.services.includes(s) ? "#fff" : "#555", fontWeight: 500
                }}>{s}</button>
              ))}
            </div>
            <div style={{ marginTop: "10px" }}>
              <input style={{ ...inputStyle, maxWidth: "300px" }} value={form.otherService}
                onChange={e => setForm({ ...form, otherService: e.target.value })}
                placeholder="Other (please specify)" onFocus={e => e.target.style.borderColor = "#c8102e"} onBlur={e => e.target.style.borderColor = "#ddd"} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>When are you looking to start?</label>
            <input type="date" style={{ ...inputStyle, maxWidth: "240px" }} value={form.startDate}
              onChange={e => setForm({ ...form, startDate: e.target.value })}
              onFocus={e => e.target.style.borderColor = "#c8102e"} onBlur={e => e.target.style.borderColor = "#ddd"} />
          </div>

          <div>
            <label style={labelStyle}>Please share any additional context that would help us understand your needs</label>
            <textarea rows={4} style={{ ...inputStyle, resize: "vertical" }} value={form.context}
              onChange={e => setForm({ ...form, context: e.target.value })}
              placeholder="Tell us about your goals, challenges, and timeline..."
              onFocus={e => e.target.style.borderColor = "#c8102e"} onBlur={e => e.target.style.borderColor = "#ddd"} />
          </div>

          <div>
            <label style={labelStyle}>How did you hear about us?</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
              {hearOptions.map(h => (
                <button key={h} onClick={() => setForm({ ...form, hearAbout: h })} style={{
                  padding: "8px 16px", fontSize: "0.8rem",
                  border: form.hearAbout === h ? "1px solid #c8102e" : "1px solid #ddd",
                  borderRadius: "20px", cursor: "pointer", transition: "all 0.2s",
                  background: form.hearAbout === h ? "#c8102e" : "#fff",
                  color: form.hearAbout === h ? "#fff" : "#555", fontWeight: 500
                }}>{h}</button>
              ))}
            </div>
            <div style={{ marginTop: "10px" }}>
              <input style={{ ...inputStyle, maxWidth: "300px" }} value={form.hearOther}
                onChange={e => setForm({ ...form, hearOther: e.target.value })}
                placeholder="Other (please specify)" onFocus={e => e.target.style.borderColor = "#c8102e"} onBlur={e => e.target.style.borderColor = "#ddd"} />
            </div>
          </div>

          <button onClick={() => setSubmitted(true)} style={{
            background: "#c8102e", color: "#fff", border: "none", padding: "14px 40px",
            fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600,
            cursor: "pointer", borderRadius: "4px", alignSelf: "flex-start", transition: "background 0.3s"
          }}
            onMouseEnter={e => e.target.style.background = "#a00d24"}
            onMouseLeave={e => e.target.style.background = "#c8102e"}
          >Submit Inquiry</button>
        </div>
      </section>
    </div>
  );
}

function PrivacyPage({ onNavigate }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ paddingTop: "64px" }}>
      <section style={{ background: "#0a0a0a", padding: "60px clamp(20px, 5vw, 60px) 40px", color: "#fff" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <span onClick={() => onNavigate("home")} style={{
            fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", cursor: "pointer",
            textTransform: "uppercase", letterSpacing: "0.1em", display: "inline-block", marginBottom: "24px"
          }}>← Back to Home</span>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 700 }}>Privacy Policy</h1>
        </div>
      </section>
      <section style={{ padding: "48px clamp(20px, 5vw, 60px) 80px", background: "#fff" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", fontSize: "0.9rem", lineHeight: 1.8, color: "#555" }}>
          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p>Free Reign Media ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or submit an inquiry through our contact form.</p>
          <h3 style={{ color: "#0a0a0a", fontFamily: "'Playfair Display', Georgia, serif", marginTop: "28px" }}>Information We Collect</h3>
          <p>When you submit an inquiry through our contact form, we may collect your name, email address, company name, company website, LinkedIn URL, service interests, preferred start date, and how you heard about us. We may also collect technical data such as your browser type, IP address, and pages visited through standard analytics tools.</p>
          <h3 style={{ color: "#0a0a0a", fontFamily: "'Playfair Display', Georgia, serif", marginTop: "28px" }}>How We Use Your Information</h3>
          <p>We use the information we collect to respond to your inquiries and provide requested services, communicate with you about our services, improve our website and user experience, and comply with legal obligations.</p>
          <h3 style={{ color: "#0a0a0a", fontFamily: "'Playfair Display', Georgia, serif", marginTop: "28px" }}>Information Sharing</h3>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist in operating our website or conducting our business, provided they agree to keep this information confidential.</p>
          <h3 style={{ color: "#0a0a0a", fontFamily: "'Playfair Display', Georgia, serif", marginTop: "28px" }}>Data Retention</h3>
          <p>We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
          <h3 style={{ color: "#0a0a0a", fontFamily: "'Playfair Display', Georgia, serif", marginTop: "28px" }}>Your Rights</h3>
          <p>You may request access to, correction of, or deletion of your personal data by contacting us at gina@freereignmedia.com.</p>
          <h3 style={{ color: "#0a0a0a", fontFamily: "'Playfair Display', Georgia, serif", marginTop: "28px" }}>Contact</h3>
          <p>If you have questions about this Privacy Policy, please contact us at gina@freereignmedia.com.</p>
        </div>
      </section>
    </div>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer style={{
      background: "#0a0a0a", padding: "40px clamp(20px, 5vw, 60px)", borderTop: "1px solid #1a1a1a"
    }}>
      <div className="footer-inner" style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <img src="/logo-light.png" alt="Free Reign Media" style={{ height: "28px", objectFit: "contain" }} />
          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", marginTop: "6px" }}>Built to Last</p>
        </div>
        <div className="footer-right" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span onClick={() => onNavigate("privacy")} style={{
            fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", cursor: "pointer", transition: "color 0.2s"
          }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
          >Privacy Policy</span>
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)" }}>© 2026 Free Reign Media. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

const TETRA_DATA = {
  title: "Tetra Digital Group",
  clientLogo: (<div style={{ display: "inline-flex", background: "#0a2540", padding: "10px 18px", borderRadius: "8px" }}><span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff", letterSpacing: "0.12em", fontFamily: "system-ui, sans-serif" }}>TETRA</span></div>),
  assignment1: "Canada's digital asset sector has long operated without a unified regulatory framework, creating fragmentation and uncertainty. Against this backdrop, Tetra Digital Group faced a dual challenge: navigating an evolving regulatory environment while building the credibility required to engage sophisticated financial players.",
  assignment2: "Our goal was to shift the conversation from speculation to infrastructure. By positioning Tetra as a trusted, regulated partner for institutional investors, we helped anchor the brand's reputation, demonstrating stability and reliability, while establishing a benchmark for institutional engagement in Canada's digital asset ecosystem.",
  stats: [
    { number: "30+", label: "Earned media stories in 4 months" },
    { number: "18K+", label: "Targeted North American views across two core announcements" },
  ],
  headlines: TETRA_HEADLINES,
};

const SYMBIOTIC_DATA = {
  title: "Symbiotic",
  clientLogo: (<img src="/symbiotic-logo.jpg" alt="Symbiotic" style={{ height: "48px", width: "48px", borderRadius: "8px", objectFit: "cover" }} />),
  assignment1: "The digital asset sector is currently defined by fragmented markets and trapped liquidity. Symbiotic entered the market to unlock this capital, providing the infrastructure to mobilize underutilized assets as institutional-grade security for the broader financial ecosystem.",
  assignment2: "We were tasked with elevating Symbiotic from a technical startup to an essential partner for global capital. Using real editorial execution, we pivoted the narrative from technical design to institutional opportunity—positioning leadership as the definitive voices for how traditional institutions safely navigate decentralized technology.",
  stats: [
    { number: "5K+", label: "Organic views on Cointelegraph op-ed" },
    { number: "3", label: "National TV appearances with 1M+ weekly broadcast reach" },
    { number: "5K+", label: "Digital views across appearances" },
  ],
  headlines: SYMBIOTIC_HEADLINES,
};

export default function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window === "undefined") return false;
    try { return sessionStorage.getItem("fr_intro_played") === "1"; }
    catch { return false; }
  });
  const [page, setPage] = useState("home");
  const [scrollTarget, setScrollTarget] = useState(null);

  const finishIntro = () => {
    try { sessionStorage.setItem("fr_intro_played", "1"); } catch {}
    setIntroComplete(true);
  };

  const navigate = (p, target) => {
    if (p === "contact") { setPage("contact"); return; }
    if (p === "privacy") { setPage("privacy"); return; }
    if (p === "tetra") { setPage("tetra"); return; }
    if (p === "symbiotic") { setPage("symbiotic"); return; }
    setPage("home");
    if (target) setScrollTarget(target);
  };

  useEffect(() => {
    if (page === "home" && scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setScrollTarget(null);
      }, 100);
    }
  }, [page, scrollTarget]);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", margin: 0, padding: 0, background: "#0a0a0a", color: "#0a0a0a" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #c8102e; color: #fff; }
        input:focus, textarea:focus { border-color: #c8102e !important; }
        @media (max-width: 768px) {
          .about-grid { flex-direction: column !important; gap: 32px !important; text-align: center; }
          .about-grid > div:first-child { flex: none !important; }
          .about-bio { text-align: center !important; }
          .work-grid { grid-template-columns: 1fr !important; }
          .contact-2col { grid-template-columns: 1fr !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
          .footer-right { flex-direction: column !important; gap: 8px !important; align-items: center !important; }
          .stats-row { justify-content: center !important; }
          .headline-grid { grid-template-columns: 1fr !important; }
          .case-hero h1 { font-size: 1.8rem !important; }
        }
        @media (max-width: 480px) {
          .service-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {!introComplete && <IntroAnimation onComplete={finishIntro} />}

      <Nav currentPage={page} onNavigate={navigate} />

      {page === "home" && (
        <>
          <Hero onNavigate={navigate} />
          <Marquee />
          <About />
          <Services />
          <WorkPreview onNavigate={navigate} />
          <Testimonial />
          <ContactCTA onNavigate={navigate} />
        </>
      )}

      {page === "tetra" && <CaseStudyPage data={TETRA_DATA} onNavigate={navigate} />}
      {page === "symbiotic" && <CaseStudyPage data={SYMBIOTIC_DATA} onNavigate={navigate} />}
      {page === "contact" && <ContactPage onNavigate={navigate} />}
      {page === "privacy" && <PrivacyPage onNavigate={navigate} />}

      <Footer onNavigate={navigate} />
    </div>
  );
}
