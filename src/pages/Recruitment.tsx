const FORMS = {
    frontend: 'https://forms.gle/VGY2eQsWvxZMUAtC6',
    grafik: 'https://forms.gle/DD2jc8ywdcaYaMT9A',
    moderator: 'https://forms.gle/BYrRHC21vgT3cmdc9',
    marketing: 'https://forms.gle/TChXKDZ7jwRMLbLHA',
} as const;

function ApplyLink({ href }: { href: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-form">
            Poslat přihlášku →
        </a>
    );
}

export default function Recruitment() {
    return (
        <>
            <header className="hero recruitment-hero">
                <p className="eyebrow">Přidej se k nám</p>
                <h1>Otevřené nábory<span>.</span></h1>
                <p>Chceš se stát součástí našeho týmu? Hledáme nové talenty, které chtějí růst a pomáhat nám budovat naši vizi.</p>
            </header>

            <div className="recruitment-grid">
                <div className="recruitment-card">
                    <div className="card-header">
                        <div className="card-title">
                            <h3>Frontend Developer</h3>
                            <span>Otevřený nábor</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>Zajímáš se o vývoj webových aplikací? Máš cit pro grafiku a vizuál? Pak hledáme přímo tebe!</p>
                        <ul>
                            <li>Odměny za odvedenou práci</li>
                            <li>Možnost realizovat své nápady</li>
                            <li>Odznak a zmínění v sekci tým</li>
                            <li>Kariérní růst v týmu</li>
                            <li>Rozvoj dovedností</li>
                            <li>Přátelský kolektiv</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <ApplyLink href={FORMS.frontend} />
                    </div>
                </div>

                <div className="recruitment-card">
                    <div className="card-header">
                        <div className="card-title">
                            <h3>2D Grafik</h3>
                            <span>Otevřený nábor</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>Zajímáš se o digitální grafiku? Máš cit pro vizuál? Pak hledáme přímo tebe!</p>
                        <ul>
                            <li>Odměny za odvedenou práci</li>
                            <li>Možnost realizovat své nápady</li>
                            <li>Odznak a zmínění v sekci tým</li>
                            <li>Kariérní růst v týmu</li>
                            <li>Rozvoj dovedností</li>
                            <li>Přátelský kolektiv</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <ApplyLink href={FORMS.grafik} />
                    </div>
                </div>

                <div className="recruitment-card">
                    <div className="card-header">
                        <div className="card-title">
                            <h3>Moderátor</h3>
                            <span>Otevřený nábor</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>Jsi komunikativní povaha a rád pomáháš? Pokud ano, budeme moc rádi, když se k nám přidáš.</p>
                        <ul>
                            <li>Odměny za odvedenou práci</li>
                            <li>Kariérní růst v týmu</li>
                            <li>Odznak a zmínění v sekci tým</li>
                            <li>Rozvoj dovedností</li>
                            <li>Přátelský kolektiv</li>
                            <li>Online akce a teambuildingy</li>
                        </ul>
                    </div>
                    <div className="card-footer">QeroChat/landing-pag
                        <ApplyLink href={FORMS.moderator} />
                    </div>
                </div>

                <div className="recruitment-card">
                    <div className="card-header">
                        <div className="card-title">
                            <h3>Marketingový specialista</h3>
                            <span>Otevřený nábor</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>Nebojíš se čísel a grafů? Umíš promovat a sociální sítě Ti nejsou cizí? Pokud ano, jsi ten správný typ uchazeče, kterého hledáme.</p>
                        <ul>
                            <li>Odměny za odvedenou práci</li>
                            <li>Kariérní růst v týmu</li>
                            <li>Odznak a zmínění v sekci tým</li>
                            <li>Rozvoj dovedností</li>
                            <li>Přátelský kolektiv</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <ApplyLink href={FORMS.marketing} />
                    </div>
                </div>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, margin: '0 16px 40px' }}>
                Přihláška se otevře v novém panelu jako formulář Google. Údaje z ní použijeme jen k vyřízení náboru a po jeho skončení je smažeme.
            </p>
        </>
    );
}