import { useState, useEffect, useCallback, useMemo, type FormEvent } from 'react';
import Lightbox from '../components/Lightbox';
import { SUPPORT_EMAIL, TERMS_VERSION } from '../legal';

const TARGET_DATE = new Date('2026-11-28T18:00:00+01:00');
const SHOTS = [
    { src: '/pic2.png', w: 1320, h: 2868, alt: 'Ořezávání profilové fotky v aplikaci QeroChat', title: 'Profilovka podle tebe', text: 'Fotku si upravíš přímo v aplikaci.' },
    { src: '/pic1.png', w: 1320, h: 2868, alt: 'Chat #pr*ce v aplikaci QeroChat', title: 'Více chatů s jedním člověkem', text: 'Rozděl své chaty podle toho, co v nich řešíte a tvořte přehlednou historii zpráv.' },
    { src: '/pic3.png', w: 1320, h: 2868, alt: 'Nastavení profilu v aplikaci QeroChat', title: 'Upravení profilu', text: 'Nechybí změna profilovky, banneru, jména a to vše na jednom místě.' },
];

/* Hlavní ukázka: na desktopu uprostřed, na mobilu (posuvný pás) první */
const MAIN_SHOT = 1;
const MOBILE_SHOTS_QUERY = '(max-width: 760px)';

/* Sleduje, jestli je okno v mobilní šířce (stejná hranice jako v CSS) */
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
    useEffect(() => {
        const mq = window.matchMedia(query);
        const onChange = () => setMatches(mq.matches);
        onChange();
        mq.addEventListener('change', onChange);
        // Pojistka: některé prostředí (emulace zařízení, starší WebView) událost change neposílají spolehlivě
        window.addEventListener('resize', onChange);
        return () => {
            mq.removeEventListener('change', onChange);
            window.removeEventListener('resize', onChange);
        };
    }, [query]);
    return matches;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    const [showCountdown, setShowCountdown] = useState(() => TARGET_DATE.getTime() > Date.now());

    const [email, setEmail] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeAge, setAgreeAge] = useState(false);
    const [agreeNews, setAgreeNews] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'ok' | 'err' | ''; text: string }>({ type: '', text: '' });
    const [shotIndex, setShotIndex] = useState<number | null>(null);
    const closeShot = useCallback(() => setShotIndex(null), []);
    const isMobileShots = useMediaQuery(MOBILE_SHOTS_QUERY);
    // Pořadí v galerii i v náhledu je stejné, takže první fotka na mobilu je v náhledu „1 / 3“
    const shots = useMemo(
        () => isMobileShots
            ? [SHOTS[MAIN_SHOT], ...SHOTS.filter((_, i) => i !== MAIN_SHOT)]
            : SHOTS,
        [isMobileShots],
    );
    // Při přechodu mezi mobilem a desktopem se pořadí změní – otevřený náhled zavřeme
    useEffect(() => setShotIndex(null), [isMobileShots]);

    useEffect(() => {
        const tick = () => {
            const diff = TARGET_DATE.getTime() - Date.now();
            if (diff <= 0) {
                setShowCountdown(false);
                clearInterval(timer);
                return;
            }
            setShowCountdown(true);
            setTimeLeft({
                days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
                hours: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
                minutes: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
                seconds: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0'),
            });
        };
        const timer = setInterval(tick, 1000);
        tick();
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        const cleanEmail = email.trim();
        if (!EMAIL_RE.test(cleanEmail)) {
            setMessage({ type: 'err', text: 'Zadej platný e-mail.' });
            return;
        }
        if (!agreeTerms) {
            setMessage({ type: 'err', text: 'Musíš souhlasit s podmínkami používání.' });
            return;
        }
        if (!agreeAge) {
            setMessage({ type: 'err', text: 'Pro registraci musíš mít alespoň 15 let.' });
            return;
        }

        setIsSubmitting(true);
        try {
            const API_BASE = import.meta.env.VITE_API_BASE || '';
            const res = await fetch(`${API_BASE}/v1/beta/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: cleanEmail,
                    agreeNews,
                    agreeTerms,
                    ageConfirmed: agreeAge,
                    termsVersion: TERMS_VERSION,
                }),
            });
            const data: { message?: unknown } = await res.json().catch(() => ({}));
            const serverMsg = typeof data.message === 'string' && data.message.trim() ? data.message : '';
            if (res.status === 429) {
                throw new Error(serverMsg || 'Příliš mnoho pokusů. Zkus to prosím za chvíli.');
            }
            if (res.status >= 500) {
                throw new Error((serverMsg || 'Na serveru se něco pokazilo.')
                    + ' Pokud ti při dalším pokusu web napíše, že je e-mail už zaregistrovaný, jsi na seznamu.');
            }
            if (!res.ok) {
                throw new Error(serverMsg || `Chyba serveru (${res.status}). Zkus to prosím později.`);
            }

            setMessage({ type: 'ok', text: serverMsg || `✔ Jsi na seznamu! Potvrzení jsme poslali na ${cleanEmail}.` });
            setEmail('');
            setAgreeTerms(false);
            setAgreeAge(false);
            setAgreeNews(false);
        } catch (err) {
            setMessage({
                type: 'err',
                text: err instanceof TypeError
                    ? 'Nepodařilo se spojit se serverem. Zkontroluj připojení a zkus to znovu.'
                    : err instanceof Error ? err.message : 'Odeslání selhalo. Zkus to prosím později.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <>
            <header className="hero">
                <p className="eyebrow">Beta · studentský projekt</p>
                <h1>QeroChat<span>.</span></h1>
                <p>Moderní chat od hráčů pro hráče. Soustředíme se na to podstatné: jednoduchost, dobré funkce a vše na jednom místě.</p>

                {showCountdown && (
                    <div className="countdown-wrapper">
                        <div className="countdown-label">Beta se otevře za</div>
                        <div className="countdown">
                            <div className="countdown-box"><div className="num">{timeLeft.days}</div><div className="label">Dní</div></div>
                            <div className="countdown-box"><div className="num">{timeLeft.hours}</div><div className="label">Hodin</div></div>
                            <div className="countdown-box"><div className="num">{timeLeft.minutes}</div><div className="label">Minut</div></div>
                            <div className="countdown-box"><div className="num">{timeLeft.seconds}</div><div className="label">Sekund</div></div>
                        </div>
                    </div>
                )}

                <div className="hero-cta">
                    <button className="btn-gradient" onClick={() => scrollTo('beta')}>Připojit se do bety</button>
                    <button className="btn-ghost" onClick={() => scrollTo('funkce')}>Prozkoumat funkce</button>
                </div>
            </header>

            <section id="beta">
                <h2 className="section-title">Připoj se do <span>bety</span></h2>
                <p className="section-sub">Zadej e-mail a jakmile se uvolní místo, pošleme ti pozvánku s přístupem do aplikace.</p>
                <form className="join-card" onSubmit={handleSubmit} noValidate>
                    <h3>Zajisti si místo ve frontě</h3>
                    <p className="sub">První vlna pozvánek odletí <b>28. listopadu v 18:00</b>. Čím dříve se zapíšeš, tím výše ve frontě budeš.</p>

                    <div className="join-row">
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="tvuj@email.cz"
                            autoComplete="email"
                            required
                        />
                        <button
                            className="btn-gradient"
                            type="submit"
                            disabled={isSubmitting || !agreeTerms || !agreeAge}
                        >
                            {isSubmitting ? 'Odesílám…' : 'Chci early access'}
                        </button>
                    </div>

                    <div className="checkbox-group">
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                id="agree-terms"
                                checked={agreeTerms}
                                onChange={e => setAgreeTerms(e.target.checked)}
                                required
                            />
                            <label htmlFor="agree-terms">
                                Souhlasím s <a href="/conditions" target="_blank" rel="noopener noreferrer">podmínkami používání</a> a beru na vědomí <a href="/conditions#gdpr" target="_blank" rel="noopener noreferrer">zpracování osobních údajů</a>
                            </label>
                        </div>
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                id="agree-age"
                                checked={agreeAge}
                                onChange={e => setAgreeAge(e.target.checked)}
                                required
                            />
                            <label htmlFor="agree-age">Je mi alespoň 15 let (v SR 16 let), nebo mám souhlas zákonného zástupce</label>
                        </div>
                        <div className="checkbox-row">
                            <input
                                type="checkbox"
                                id="agree-news"
                                checked={agreeNews}
                                onChange={e => setAgreeNews(e.target.checked)}
                            />
                            <label htmlFor="agree-news">Chci dostávat e-maily o novinkách a vývoji projektu (nepovinné, odhlásit se můžu kdykoli e-mailem na {SUPPORT_EMAIL})</label>
                        </div>
                    </div>

                    <p className="join-note bonus">
                        Bonus: Pokud se zaregistruješ před skončením odpočtu, získáš doživotní odznak „Podporovatel od počátku“.
                    </p>

                    {message.text && (
                        <div className={`form-msg ${message.type}`} role="status" aria-live="polite">
                            {message.text}
                        </div>
                    )}

                    <p className="join-note">⚠️ Služba je ve vývoji a je poskytována „jak je“. Data mohou být kdykoli smazána, služba může být nedostupná a mohou se vyskytnout chyby. Nepoužívej hesla, která používáš jinde.</p>
                </form>
            </section>

            <section id="funkce">
                <h2 className="section-title">Co <span>umíme?</span></h2>
                <p className="section-sub">Cesta je na začátku, ale něco už umíme a plno věcí se chystá. 👀</p>
                <div className="features">
                    <div className="feature"><b>Více chatů s jednou osobou</b><p>Rozděl si konverzace do kategorií a měj přehlednou historii. Bavíš se o práci? Založ si chat #pr**e.</p></div>
                    <div className="feature"><b>Chaty v reálném čase</b><p>Zprávy, psaní i úpravy se hned ukážou u druhé strany.</p></div>
                    <div className="feature"><b>Odznaky</b><p>Odznaky na profilu? Proč ne? A můžeš je získat i ty.</p></div>
                    <div className="feature"><b>Tmavý i světlý režim</b><p>Prostředí pro noční dravce i ranní ptáky.</p></div>
                    <div className="feature"><b>Offline režim</b><p>Při výpadku se zprávy uloží a odešlou, až budeš zase online.</p></div>
                </div>
            </section>

            <section id="ukazky">
                <h2 className="section-title">Jak to <span>vypadá?</span></h2>
                <p className="section-sub">Pár záběrů přímo z aplikace. Je to beta, takže se vzhled ještě může změnit.</p>
                <div className="shots">
                    {shots.map((shot, i) => (
                        <figure key={shot.src} className={'shot' + (shot === SHOTS[MAIN_SHOT] ? ' shot-main' : '')}>
                            <button type="button" className="phone" onClick={() => setShotIndex(i)} aria-label={'Zvětšit: ' + shot.title}>
                                <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading="lazy" decoding="async" />
                            </button>
                            <figcaption>
                                <b>{shot.title}</b>
                                <span>{shot.text}</span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
                <Lightbox images={shots} index={shotIndex} onClose={closeShot} onChange={setShotIndex} />
            </section>

            <section id="o-projektu">
                <h2 className="section-title">O <span>projektu</span></h2>
                <p className="section-sub">Kdo stojí za QeroChatem a proč vzniká.</p>
                <div className="about-card">
                    <p><b>QeroChat</b> nemá za cíl stát se globální platformou. Jde o studentský projekt, jehož cílem je rozšířit portfolio autorů.</p>
                    <p>Projekt vznikl z nadšení pro vývoj a jako příležitost naučit se něco nového. Pokud tě vývoj zajímá víc, podívej se na náš GitHub: <a href="https://github.com/QeroChat" target="_blank" rel="noopener noreferrer">https://github.com/QeroChat</a><br /><i>– Rob</i></p>
                </div>
            </section>

            <section id="team">
                <h2 className="section-title">Náš <span>tým a podporovatelé ❤️</span></h2>
                <p className="section-sub">Zatím nás není moc, ale to se dá změnit. Právě hledáme nové posily do týmu. 🥳</p>
                <div className="team">
                    <div className="member">
                        <div className="av">R</div>
                        <div className="member-header">
                            <b>Rob</b>
                            <a href="https://www.instagram.com/rob24dev/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram – Rob">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                        </div>
                        <div className="role">Zakladatel</div>
                        <p>Když něco nefunguje, je to jeho chyba.</p>
                        <p>Doufám, že jich bude co nejméně. 🙏</p>
                    </div>
                    <div className="member">
                        <div className="av">P</div>
                        <div className="member-header">
                            <b>Pavel</b>
                            <a href="https://www.instagram.com/x6pavelkalas/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram – Pavel">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                        </div>
                        <div className="role">Správce sítě</div>
                        <p>Web se nenačte?</p>
                        <p>Pravděpodobně jeho práce. 😡</p>
                    </div>
                </div>
            </section>

            <section id="faq">
                <h2 className="section-title">Časté <span>dotazy</span></h2>
                <p className="section-sub">Na co se lidé ptají nejčastěji.</p>
                <div className="faq">
                    <details>
                        <summary>Je QeroChat zdarma?</summary>
                        <p>Během bety je aplikace zdarma. O budoucí podobě rozhodneme později. Případné zpoplatnění oznámíme předem a nikdy nebude nutné pro základní používání.</p>
                    </details>
                    <details>
                        <summary>Jak se dostanu do bety?</summary>
                        <p>Zadej e-mail do formuláře výše a potvrď souhlas s podmínkami. Až bude místo, pošleme ti pozvánku s instrukcemi.</p>
                    </details>
                    <details>
                        <summary>Jsou moje data v bezpečí?</summary>
                        <p>Hesla ukládáme pouze jako hash, komunikace běží přes HTTPS a přístup k údajům máme jen my. Žádná online služba není bez chyb, proto je aplikace zatím v beta testu. Podrobnosti najdeš v <a href="/conditions#gdpr">zpracování osobních údajů</a>.</p>
                    </details>
                    <details>
                        <summary>Co se stane s mými daty po konci bety?</summary>
                        <p>Pokud se projekt dočká oficiálního vydání, data z beta verze budou smazána. Dáme ti o tom předem vědět e-mailem i v aplikaci. Smazání účtu i všech údajů si můžeš kdykoli vyžádat na <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
                    </details>
                    <details>
                        <summary>Kdy vyjde plná verze?</summary>
                        <p>Přesné datum zatím nemáme. Plná verze znamená hodně práce, včetně bezpečnosti a právních náležitostí. Je možné, že nenastane vůbec.</p>
                    </details>
                    <details>
                        <summary>Jak můžu pomoct?</summary>
                        <p>Stačí nám dát šanci a říct o aplikaci kamarádům. Hlášení chyb od beta testerů nám pomáhají nejvíc.</p>
                    </details>
                    <details>
                        <summary>Je web generovaný umělou inteligencí?</summary>
                        <p>Ano, vzhled webu jsme vytvořili s pomocí AI, protože v týmu zatím nemáme frontend specialistu. Texty a logika na serveru jsou psané lidmi. Pokud se projekt rozroste, plánujeme na tuto část zaplatit programátora.</p>
                    </details>
                </div>
            </section>
        </>
    );
}