import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronDown, Clock3, Instagram, MapPin, Music, Phone, Share2, VolumeX, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const ASSETS = "/assets";
const entryCard = `${ASSETS}/entry-card.jpg`;
const footerCard = `${ASSETS}/footer-card.jpg`;
const heroPoster = `${ASSETS}/hero-poster.jpg`;
const ceremonyCornerUrl = `${ASSETS}/ceremony-corner.png`;
const cornerBlUrl = `${ASSETS}/corner-bl.png`;
const cornerBrUrl = `${ASSETS}/corner-br.png`;
const cornerTlUrl = `${ASSETS}/corner-tl.png`;
const cornerTrUrl = `${ASSETS}/corner-tr.png`;
const railBottomUrl = `${ASSETS}/rail-bottom.png`;
const railLeftUrl = `${ASSETS}/rail-left.png`;
const railRightUrl = `${ASSETS}/rail-right.png`;
const railTopUrl = `${ASSETS}/rail-top.png`;
const templeSceneryUrl = `${ASSETS}/temple-scenery.png`;
const countdownWallUrl = `${ASSETS}/countdown-wall.webp`;
const bridePortraitUrl = `${ASSETS}/bride-portrait-close.webp`;
const groomPortraitUrl = `${ASSETS}/groom-portrait-wide.webp`;
const coupleMomentsUrls = [
  `${ASSETS}/couple-moments-1.webp`,
  `${ASSETS}/couple-moments-2.webp`,
  `${ASSETS}/couple-moments-3.webp`,
];
const musicUrl = "/Kalyanam_Vibhogam.mp3";

const WEDDING_DATE = new Date("2026-11-26T09:31:00+05:30");

const pad2 = (value: number) => String(value).padStart(2, "0");

function useCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(WEDDING_DATE.getTime() - Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = Math.max(0, remaining ?? 0);
  return {
    days: remaining === null ? "--" : String(Math.floor(total / 86_400_000)),
    hours: remaining === null ? "--" : pad2(Math.floor(total / 3_600_000) % 24),
    minutes: remaining === null ? "--" : pad2(Math.floor(total / 60_000) % 60),
    seconds: remaining === null ? "--" : pad2(Math.floor(total / 1_000) % 60),
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nanubala Kunadruthi & Surya Teja — Wedding Invitation" },
      {
        name: "description",
        content: "The wedding invitation of Nanubala Kunadruthi and Surya Teja at Sri Sai Baba Kalyana Mandapam, Bethamcherla, Nandyal District.",
      },
      { property: "og:title", content: "Nanubala Kunadruthi & Surya Teja — Wedding Invitation" },
      {
        property: "og:description",
        content: "Join Nanubala Kunadruthi and Surya Teja for their wedding celebration on 26 November 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingHero,
});

const splitName = (name: string) =>
  name.split("").map((character, index) => (
    <span className="hero-character" style={{ animationDelay: `${0.46 + index * 0.07}s` }} key={`${character}-${index}`}>
      {character}
    </span>
  ));

const borderTiles = (source: string, count: number) =>
  Array.from({ length: count }, (_, index) => <img src={source} alt="" key={index} />);

function BrandingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`branding-section ${isVisible ? "branding-section--visible" : ""}`}
      aria-labelledby="branding-title"
    >
      <div className="branding-card">
        <div className="branding-ornament" aria-hidden="true"><i /><span>◆</span><i /></div>
        <p className="branding-label branding-reveal">Wedding Photography</p>
        <h2 id="branding-title" className="branding-name branding-reveal">Passion Photography</h2>
        <a className="branding-email branding-reveal" href="mailto:Passionphotography7878@gmail.com">Passionphotography7878@gmail.com</a>
        <div className="branding-social branding-reveal">
          <a className="branding-social-link" href="tel:+919959990503">
            <Phone aria-hidden="true" /> 99599 90503
          </a>
        </div>
        <div className="branding-social branding-reveal">
          <a className="branding-social-link" href="https://www.instagram.com/passionphotography_in_kurnool" target="_blank" rel="noreferrer">
            <Instagram aria-hidden="true" /> Instagram
          </a>
          <span className="branding-social-divider" aria-hidden="true" />
          <a className="branding-social-link" href="https://www.youtube.com/@PassionPhotographyy" target="_blank" rel="noreferrer">
            <Youtube aria-hidden="true" /> YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

function WeddingHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const [coupleVisible, setCoupleVisible] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const coupleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const video = videoRef.current;
    video?.play().catch(() => undefined);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.6;
      audio.play().then(() => setMusicPlaying(true)).catch(() => undefined);
    }
    const timer = window.setTimeout(() => setCoverGone(true), 1250);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const section = coupleRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCoupleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const openInvitation = () => {
    if (!isOpen) setIsOpen(true);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setMusicPlaying(true)).catch(() => undefined);
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  return (
    <main className="wedding-experience">
      <audio ref={audioRef} src={musicUrl} loop preload="auto" aria-hidden="true" />
      {coverGone && (
        <button
          type="button"
          className={`music-toggle ${musicPlaying ? "music-toggle--playing" : ""}`}
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? <Music aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        </button>
      )}
      <section className={`wedding-hero ${isOpen ? "wedding-hero--revealed" : ""}`} aria-label="Wedding invitation hero">
        <video
          ref={videoRef}
          className="hero-procession"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          aria-hidden="true"
        >
          <source src="/hero-procession.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" />

        <div className="hero-content">
          <p className="hero-invocation">|| Srirasthu Shubhamasthu ||</p>
          <p className="hero-invite">Together with our families, you are invited to celebrate the wedding of</p>
          <h1 className="hero-name">{splitName("Kunadruthi")}</h1>
          <p className="hero-ampersand">&</p>
          <p className="hero-name">{splitName("Surya Teja")}</p>
          <p className="hero-date">Thursday, November 26, 2026</p>
          <p className="hero-venue">
            <span className="hero-at">at</span>{" "}
            <span className="hero-location">Sri Sai Baba Kalyana Mandapam, Bethamcherla</span>
          </p>
          <div className="hero-scroll" aria-hidden="true">
            <span className="hero-scroll-label">Scroll Down</span>
            <ChevronDown className="hero-scroll-chevron" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section
        ref={coupleRef}
        className={`couple-section ${coupleVisible ? "couple-section--visible" : ""}`}
        aria-labelledby="couple-title"
      >
        <img className="couple-scenery" src={templeSceneryUrl} alt="" aria-hidden="true" />
        <div className="couple-frame" aria-hidden="true">
          <div className="couple-rail couple-rail--top">{borderTiles(railTopUrl, 16)}</div>
          <div className="couple-rail couple-rail--right">{borderTiles(railRightUrl, 14)}</div>
          <div className="couple-rail couple-rail--bottom">{borderTiles(railBottomUrl, 16)}</div>
          <div className="couple-rail couple-rail--left">{borderTiles(railLeftUrl, 14)}</div>
          <img className="couple-corner couple-corner--tl" src={cornerTlUrl} alt="" />
          <img className="couple-corner couple-corner--tr" src={cornerTrUrl} alt="" />
          <img className="couple-corner couple-corner--bl" src={cornerBlUrl} alt="" />
          <img className="couple-corner couple-corner--br" src={cornerBrUrl} alt="" />
        </div>
        <div className="couple-inner">
          <header className="couple-heading couple-reveal">
            <span className="couple-flourish" aria-hidden="true">◆</span>
            <h2 id="couple-title">The Couple</h2>
            <p>Two families, many blessings, one timeless celebration.</p>
          </header>

          <div className="couple-details">
            <article className="couple-person couple-person--bride couple-reveal">
              <img
                className="couple-portrait"
                src={bridePortraitUrl}
                alt="Kunadruthi in a green silk saree with gold jewellery"
                loading="lazy"
              />
              <p className="couple-role">The Bride</p>
              <h3>Kunadruthi</h3>
              <p className="couple-profession">Software Engineer</p>
              <span className="couple-relation">Daughter of</span>
              <p className="couple-parents">Smt. Nanubala Leela Vathi <span>&</span> Sri. Nanubala Guru Sekhar</p>
            </article>

            <div className="couple-union couple-reveal" aria-hidden="true">
              <span className="couple-union-line" />
              <span className="couple-union-mark">&</span>
              <span className="couple-union-line" />
            </div>

            <article className="couple-person couple-person--groom couple-reveal">
              <img
                className="couple-portrait couple-portrait--groom"
                src={groomPortraitUrl}
                alt="Surya Teja in a cream embroidered kurta"
                loading="lazy"
              />
              <p className="couple-role">The Groom</p>
              <h3>Surya Teja</h3>
              <p className="couple-profession">Software Engineer</p>
              <span className="couple-relation">Son of</span>
              <p className="couple-parents">Smt. Gadugu Rajani Kumari <span>&</span> Late Sri. Gadugu Nagendra Prasad</p>
            </article>
          </div>

          <div className="couple-closing couple-reveal" aria-hidden="true">
            <span />
            <i>शुभ विवाह</i>
            <span />
          </div>
        </div>
      </section>

      <GallerySection />
      <CountdownSection />
      <AuspiciousHourSection />
      <VenueSection />
      <InvitationFooter />
      <BrandingSection />

      {!coverGone && (
        <div
          className={`invitation-cover ${isOpen ? "invitation-cover--opening" : ""}`}
          onClick={openInvitation}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") openInvitation();
          }}
          role="button"
          tabIndex={isOpen ? -1 : 0}
          aria-label="Open invitation"
        >
          <div className="cover-veil" />
          <div className="cover-card">
            <img className="cover-art" src={entryCard} alt="Traditional South Indian wedding illustration" />
            <div className="cover-bloom" />
            <div className="cover-content">
              <div className="cover-group">
                <p className="cover-label">The Wedding Of</p>
                <p className="cover-names">
                  <span>Kunadruthi</span>
                  <span className="cover-amp"><i>&</i></span>
                  <span>Surya Teja</span>
                </p>
              </div>

              <div className="cover-group cover-meta">
                <p className="cover-date">26 November 2026</p>
                <p className="cover-city">Sri Sai Baba Kalyana Mandapam, Bethamcherla</p>
              </div>

              <button className="cover-cta" type="button" onClick={openInvitation}>
                <span>Open Invitation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function GallerySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`gallery-section ${isVisible ? "gallery-section--visible" : ""}`}
      aria-labelledby="gallery-title"
    >
      <header className="gallery-heading gallery-reveal">
        <span className="couple-flourish" aria-hidden="true">◆</span>
        <h2 id="gallery-title">Our Moments</h2>
        <p>Stealing smiles, sharing joy — a glimpse of us together.</p>
      </header>
      <div className="gallery-track" role="list">
        {coupleMomentsUrls.map((photoUrl, index) => (
          <figure
            className="gallery-item gallery-reveal"
            role="listitem"
            key={photoUrl}
            style={{ animationDelay: `${index * 0.16}s` }}
          >
            <img src={photoUrl} alt={`Kunadruthi and Surya Teja together, moment ${index + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown();
  const cells = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <section className="countdown-section" aria-labelledby="countdown-title">
      <h2 id="countdown-title" className="countdown-sr">Our Muhurtham In</h2>
      <div className="countdown-wall" role="timer" aria-label="Countdown to the wedding">
        <img className="countdown-art" src={countdownWallUrl} alt="" aria-hidden="true" />
        <div className="countdown-cells">
          {cells.map((cell) => (
            <div className="countdown-cell" key={cell.label}>
              <span className="countdown-value">{cell.value}</span>
              <span className="countdown-label">{cell.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuspiciousHourSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`muhurtham-section ceremonial-section ${isVisible ? "ceremonial-section--visible" : ""}`}
      aria-labelledby="muhurtham-title"
    >
      <img className="muhurtham-art" src={ceremonyCornerUrl} alt="Traditional brass lamp, kalash and flowers" />
      <div className="muhurtham-content">
        <header className="ceremonial-heading ceremonial-reveal">
          <p>Auspicious Hour</p>
          <h2 id="muhurtham-title">Sumuhurtham</h2>
          <span className="ceremonial-divider" aria-hidden="true"><i />◆<i /></span>
        </header>

        <div className="muhurtham-timeline ceremonial-reveal">
          <span className="muhurtham-marker" aria-hidden="true"><i /></span>
          <article className="muhurtham-card">
            <span className="muhurtham-ribbon">Muhurtham</span>
            <h3>Sumuhurtham — Dhanur Lagnam</h3>
            <p className="muhurtham-description">The sacred vows, followed by a traditional lunch.</p>
            <div className="muhurtham-meta">
              <p><CalendarDays aria-hidden="true" /> Thursday, 26th November 2026</p>
              <p><Clock3 aria-hidden="true" /> 9:31 AM</p>
              <p><MapPin aria-hidden="true" /> Sri Sai Baba Kalyana Mandapam, Bethamcherla, Nandyal District</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function VenueSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const venueName = "Sri Sai Baba Kalyana Mandapam, Bethamcherla";
  const mapsUrl = "https://maps.app.goo.gl/dh1AHLzq58BtKHkA7?g_st=iw";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const shareLocation = async () => {
    const shareData = { title: "Kunadruthi & Surya Teja's Wedding Venue", text: venueName, url: mapsUrl };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(mapsUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      return;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`venue-section ceremonial-section ${isVisible ? "ceremonial-section--visible" : ""}`}
      aria-labelledby="venue-title"
    >
      <div className="venue-inner">
        <header className="ceremonial-heading ceremonial-reveal">
          <p>The Venue</p>
          <h2 id="venue-title">{venueName}</h2>
          <span className="ceremonial-divider" aria-hidden="true"><i />◆<i /></span>
        </header>

        <div className="venue-map ceremonial-reveal">
          <iframe
            title="Map showing Sri Sai Baba Kalyana Mandapam, Bethamcherla"
            src="https://www.google.com/maps?q=F565%2BH3J+Shirdi+sai+convention+hall,+Bethamcherla+-+Kurnool+Rd,+Betamcherla,+Andhra+Pradesh+518599&ftid=0x3bb4331550fc39b7:0x29c497ddffab946e&output=embed"
            width="100%"
            height="320"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="venue-actions ceremonial-reveal">
          <Button asChild variant="outline" className="venue-button venue-button--outline">
            <a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /> Open in maps</a>
          </Button>
          <Button className="venue-button venue-button--solid" onClick={shareLocation}>
            <Share2 aria-hidden="true" /> {copied ? "Location copied" : "Share location"}
          </Button>
        </div>

        <div className="venue-contacts ceremonial-reveal" aria-label="Call the wedding hosts">
          <a className="venue-contact" href="tel:+919440769128"><Phone aria-hidden="true" /> 94407 69128</a>
          <a className="venue-contact" href="tel:+919441621649"><Phone aria-hidden="true" /> 94416 21649</a>
          <a className="venue-contact" href="tel:+919491858446"><Phone aria-hidden="true" /> 94918 58446</a>
        </div>
      </div>
    </section>
  );
}

function InvitationFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className={`invitation-footer ${isVisible ? "invitation-footer--visible" : ""}`}>
      <div className="footer-card">
        <img className="footer-art" src={footerCard} alt="Traditional wedding ceremony at a South Indian temple" loading="lazy" />

        <div className="footer-greeting">
          <p className="footer-lead footer-reveal">We solicit your gracious presence</p>
          <p className="footer-blessings footer-reveal">with family and friends</p>
          <p className="footer-telugu footer-reveal">శుభమస్తు</p>

          <div className="footer-hosts footer-reveal" aria-label="Cordially invited by Smt. Nanubala Leela Vathi and Sri. Nanubala Guru Sekhar">
            <span className="footer-hosts-label">Cordially invited by</span>
            <span className="footer-hosts-name">Smt. Nanubala Leela Vathi</span>
            <span className="footer-hosts-join">and</span>
            <span className="footer-hosts-name">Sri. Nanubala Guru Sekhar</span>
            <span className="footer-hosts-place">Bethamcherla Vill & Mdl, Nandyal Dist.</span>
          </div>

          <div className="footer-compliments footer-reveal" aria-hidden="true">
            <span className="footer-compliments-label">With best compliments from</span>
            <span className="footer-compliments-name">Near &amp; Dear</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
