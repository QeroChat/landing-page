import { SUPPORT_EMAIL, TERMS_UPDATED_CS, TERMS_VERSION } from '../legal';

export default function Conditions() {
    return (
        <div className="conditions-container">
            <h1>Podmínky používání</h1>
            <p className="updated">Poslední aktualizace: {TERMS_UPDATED_CS} (verze {TERMS_VERSION})</p>

            <h2>1. Úvod</h2>
            <p>Správcem osobních údajů a těchto podmínek používání („Podmínky") ve smyslu Nařízení GDPR je <b>Robert Darvaš</b>, e-mail: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>, tel.: <a href="tel:+420606419436">+420 606 419 436</a> (dále jen „správce", „my" nebo „nám").</p>
            <p>Registrací do beta programu s podmínkami souhlasíte a zavazujete se jimi řídit. Pokud s něčím zde nesouhlasíte, neregistrujte se.</p>

            <div className="warning">
                <b>⚠️ Důležité upozornění pro beta verzi:</b> Služba je ve vývoji a je poskytována „jak je". Data mohou být kdykoliv smazána, služba může být nedostupná a mohou se vyskytnout chyby. Nepoužívejte citlivé údaje ani hesla, která používáte jinde. Pokud se aplikace dokončí a dočká oficiálního vydání, všechna data z beta verze budou smazána (o tom vás budeme informovat e-mailem).
            </div>

            <h2 id="gdpr">2. Zpracování osobních údajů (GDPR)</h2>
            <h3>2.1 Jaké údaje zpracováváme?</h3>
            <p>Při zápisu do beta programu (formulář na webu) zpracováváme:</p>
            <ul>
                <li><b>E-mail</b> - abychom vám mohli poslat potvrzení a pozvánku do aplikace.</li>
                <li><b>Volbu zasílání novinek</b> - zda chcete dostávat e-maily o vývoji projektu.</li>
                <li><b>Informace o souhlasu</b> - zda jste souhlasil s podmínkami, potvrdil, že splňujete nároky na věk a s jakou verzí podmínek jste souhlasil.</li>
            </ul>
            <p>Při používání účtu v aplikaci se jedná o tyto údaje:</p>
            <ul>
                <li><b>E-mail</b> - slouží k identifikaci vlastníka účtu, v případě ztráty hesla a i jako prostředek k přidávání lidí do přátel v samotné aplikaci.</li>
                <li><b>Jméno/Přezdívka</b> - slouží k identifikaci uživatele, tak aby všichni ostatní věděli, s kým si zrovna píšou.</li>
                <li><b>Heslo</b> - slouží jako přístupový údaj k účtu. Heslo ukládáme jenom v hashované podobě a ani my se k jeho původní podobě nedostaneme.</li>
                <li><b>IP adresu</b> - používáme ji jen krátkodobě v paměti serveru k ochraně proti zneužití (omezení počtu pokusů o přihlášení). Do databáze ani logů ji neukládáme.</li>
                <li><b>Záznamy o činnosti účtu</b> - například registrace, přihlášení a změny účtu. Slouží k zabezpečení služby a k řešení incidentů.</li>
            </ul>
            <p>Dále při běžném používání aplikace:</p>
            <ul>
                <li><b>Profilová fotka</b> - slouží k odlišení vašeho účtu od ostatních. Není povinné nahrávat, pokud nic nenahrajete, systém využije předpřipravenou.</li>
                <li><b>Bannerová fotka</b> - slouží k odlišení vašeho účtu od ostatních. Není povinné nahrávat, pokud nic nenahrajete, systém využije předpřipravenou.</li>
                <li><b>Stav a textový status</b> - zda jste online a text, který si sami nastavíte. Vidí ho vaši přátelé v aplikaci.</li>
                <li><b>Vámi vytvořený obsah</b> - v našem případě se jedná o vámi napsané zprávy v chatech, nahrané obrázky a informace o kanálech, které jste vytvořili.</li>
            </ul>

            <h3>2.2 Právní základ zpracování</h3>
            <p>Zpracování vašich osobních údajů probíhá na základě následujících právních titulů:</p>
            <ul>
                <li><b>Souhlas (čl. 6(1)(a) GDPR)</b> - zasílání e-mailů s novinkami (jen pokud jste ho zaškrtli).</li>
                <li><b>Plnění smlouvy (čl. 6(1)(b) GDPR)</b> - zápis do bety a zaslání pozvánky, provoz účtu, autentizace, zasílání zpráv a dobrovolně nahrané profilové a bannerové fotky.</li>
                <li><b>Oprávněný zájem (čl. 6(1)(f) GDPR)</b> - zajištění bezpečnosti služby, prevence zneužití, technická údržba a ochrana před útoky.</li>
            </ul>

            <h3>2.3 Doba uchování vašich dat</h3>
            <p>Údaje účtu ukládáme do doby, než požádáte o odstranění účtu.</p>
            <p>Zápis do beta programu (e-mail a volbu novinek) uchováváme do konce beta testu, nebo dokud nás nepožádáte o jeho smazání. Souhlas se zasíláním novinek můžete odvolat kdykoli a po odvolání vám je přestaneme posílat.</p>
            <p>Záznamy o činnosti účtu uchováváme jen po dobu nezbytnou pro zabezpečení služby a pak je mažeme.</p>
            <p>E-maily, které nám pošlete na podporu, uchováváme po dobu vyřízení vaší žádosti a poté nejdéle 1 rok (kdyby se problém opakoval). Pak je mažeme.</p>
            <p>Pamatujte ale na jednu věc: když si smažete účet, vaše odeslané zprávy ve společných chatech zůstanou (aby dávala konverzace ostatním dál smysl). Váš profil od nich ale bude trvale odpojen a zobrazíte se u nich pouze jako „Smazaný uživatel“.</p>
            <p>V případě beta testu budou data smazána také tehdy, pokud se aplikace dočká oficiálního vydání. O této akci bychom vás však dostatečně předem upozornili pomocí e-mailu, nebo v samotné aplikaci.</p>

            <h3>2.4 Kdo má k údajům přístup?</h3>
            <p>K údajům má přístup pouze náš tým. Údaje jsou uloženy na našich serverech v ČR. Výjimkou jsou e-maily, které pro nás jako zpracovatelé podle čl. 28 GDPR zajišťují externí poskytovatelé:</p>
            <ul>
                <li><b>Mailgun</b> - odesílá automatické e-maily. Dostává jen adresu příjemce a obsah e-mailu.</li>
                <li><b>Seznam.cz</b> - provozuje naši schránku podpory {SUPPORT_EMAIL}. Ukládá e-maily, které nám pošlete, a naše odpovědi.</li>
            </ul>
            <p>Další výjimkou jsou přihlášky do týmu, které sbíráme přes Google Forms (viz 2.10.).</p>

            <h3>2.5 Vaše práva</h3>
            <p>Vy jakožto uživatel aplikace QeroChat máte právo na:</p>
            <ul>
                <li><b>Přístup:</b> kdykoliv si můžete vyžádat kopii vašich dat.</li>
                <li><b>Opravu:</b> můžete chtít změnit své údaje a to i u těch, které nejsou snadno změnitelné v rozhraní aplikace.</li>
                <li><b>Výmaz:</b> kdykoliv si můžete požádat odstranit všechna data, co o vás uschováváme.</li>
                <li><b>Omezení zpracovávání:</b> máte právo "zmrazit" svá data. To znamená, že zůstanou na našich serverech, ale nebudou se zobrazovat v aplikaci a nebudeme s nimi činit žádné úkony.</li>
                <li><b>Přenositelnost:</b> můžete požádat o zaslání všech dat, která o vás máme ve strojově čitelném formátu (nejčastěji .json). Včetně obrázků, které jste během používání služby nahráli.</li>
                <li><b>Námitku (čl. 21 GDPR):</b> kdykoliv můžete vznést námitku proti zpracování, které provádíme na základě oprávněného zájmu (zabezpečení služby). Zpracování pak ukončíme, pokud nedoložíme závažné důvody, které převažují nad vašimi zájmy.</li>
                <li><b>Odvolání souhlasu:</b> souhlas se zasíláním novinek můžete kdykoliv odvolat e-mailem. Odvolání nemá vliv na váš účet. Pokud chcete ukončit i účet, požádejte o jeho smazání (právo na výmaz).</li>
                <li><b>Podání stížnosti:</b> máte právo podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ), pokud se domníváte, že zpracování vašich dat probíhá v rozporu se zákonem.</li>
            </ul>

            <h3>2.6 Jak mohu svá práva uplatnit?</h3>
            <p>Svá práva můžete uplatnit kontaktováním našeho týmu na e-mailu <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Pro ušetření našeho i vašeho času, vždy piště z e-mailu, který máte u účtu uvedený.</p>
            <p>Na žádosti nejčastěji odpovídáme do 2 až 3 dnů, nejpozději však do zákonné lhůty 30 dnů.</p>
            <p>Pokud by nastal případ, kdy by data musela být smazána manuálně, informujeme vás o tom a data smažeme také v této lhůtě.</p>

            <h3>2.7 Zabezpečení</h3>
            <p>Vaši bezpečnost při používání našich služeb řešíme standardními postupy jako je HTTPS, ukládání hesla v hashované podobě a rate limiting.</p>
            <p>Ovšem nikdo vám nemůže zaručit 100% bezpečí, a tedy ani my ne.</p>

            <h3>2.8 Cookies a úložiště v prohlížeči</h3>
            <p>Naše služby neobsahují žádné cookies třetí strany pro monitorování návštěvnosti, nebo zobrazování reklam.</p>
            <p>Pro fungování aplikace využíváme následující úložiště v prohlížeči:</p>
            <ul>
                <li><b>Session storage</b> - přihlašovací token a základní údaje vašeho profilu pro aktuální relaci (data jsou smazána po zavření prohlížeče).</li>
                <li><b>Local storage</b> - přihlašovací token a základní údaje profilu (jen při volbě „Zapamatuj si mě") a zvolený motiv vzhledu (data přetrvávají i po zavření prohlížeče, token a profil smaže odhlášení).</li>
            </ul>
            <p>Webová stránka qero.chat sama nic neukládá. Úložiště v aplikaci je technicky nezbytné pro její fungování (§ 89 odst. 3 zákona o elektronických komunikacích), a proto k němu váš souhlas nepotřebujeme.</p>

            <h3>2.9 Předávání mimo EU</h3>
            <p>Naše servery běží přímo v České republice. E-mailový poskytovatel Mailgun nabízí evropský region, a tedy ani vaše e-maily neopouští EU. Schránka podpory u Seznam.cz je také v ČR. Jediná výjimka jsou náborové formuláře, které zpracovává společnost Google.</p>

            <h3>2.10 Přihlášky do týmu</h3>
            <p>Pokud se hlásíte do našeho týmu, vyplňujete formulář služby <b>Google Forms</b>. Zpracováváme jen to, co do přihlášky sami napíšete (např. jméno nebo přezdívku, kontakt, informace o zkušenostech a odkazy na ukázky práce).</p>
            <ul>
                <li><b>Účel a právní základ:</b> vyřízení vaší přihlášky a domluva spolupráce, tedy kroky před uzavřením dohody na vaši žádost (čl. 6(1)(b) GDPR).</li>
                <li><b>Doba uchování:</b> po skončení náboru přihlášky smažeme. Pokud se k nám přidáte, ponecháme si jen údaje potřebné ke spolupráci.</li>
                <li><b>Kdo má přístup:</b> členové týmu, kteří nábor vyřizují, a společnost Google jako zpracovatel podle čl. 28 GDPR. Google může údaje zpracovávat i mimo EU, a to se zárukami podle kapitoly V GDPR (rámec EU-USA pro ochranu osobních údajů a standardní smluvní doložky).</li>
                <li><b>Vaše práva:</b> o přístup, opravu nebo smazání přihlášky můžete kdykoli požádat na <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</li>
            </ul>
            <p>Do přihlášky prosím nevyplňujte citlivé údaje (např. o zdraví) ani hesla. Pokud vám ještě nebylo 15 let, přihlášku podejte jen se souhlasem zákonného zástupce.</p>

            <h2>3. Podmínky používání</h2>
            <h3>3.1 Co je QeroChat?</h3>
            <p>QeroChat je moderní chatovací platforma od hráčů pro hráče, která vznikla primárně za účelem rozšíření portfolia autorů a nemá za cíl stát se globální platformou.</p>
            <p>Zaměřujeme se na jednoduchost, originální funkce a možnost mít vše na jednom místě.</p>

            <h3>3.2 Kdo může službu používat?</h3>
            <p>Služba je tvořená primárně pro Čechy a Slováky, ale může ji používat prakticky kdokoliv, kdo neporušuje zákony své země ani zákony na ochranu dětí a mladistvých.</p>
            <p>Souhlas se zpracováním osobních údajů můžete v ČR sami bez zákonných zástupců dát od 15+ let, na Slovensku od 16+, takže to jsou i věkové hranice pro tyto země. V ostatních zemích platí věková hranice podle místního práva, nejméně však 16 let. Pokud zjistíme, že tenhle věk nesplňujete a nemáte k tomu doložitelný souhlas rodičů, vyhrazujeme si právo takový účet okamžitě smazat.</p>

            <h3>3.3 Pravidla chování</h3>
            <p>V celé síti webů, které jsou spravovány pod doménou qero.chat musíte dodržovat zákony ČR a také námi stanovená pravidla, konkrétně se jedná o:</p>
            <p><b>3.3.1 Zodpovědnost uživatele:</b> Uživatel je zodpovědný za zabezpečení svého účtu. Jedná se zejména o to nastavit silné heslo, které nepoužíváte jinde.</p>
            <p><b>3.3.2</b> Uživatel musí dodržovat pravidla slušného chování a neporušovat zákony ČR: Je zakázána jakákoliv forma obtěžování, vydírání, zesměšňování, vyhrožování a měli byste se vyhnout vulgaritám na konkrétní osobu. Nabádání k sebevraždě, nebo propagace sebepoškozování je vysoce trestaná!</p>
            <p><b>3.3.3</b> Je zakázaná jakákoliv forma propagace nacismu, rasismu či xenofobie.</p>
            <p><b>3.3.4</b> Je zakázáno zneužívat chyby systému. Uživatel je povinen chyby nahlásit například prostřednictvím nahlašovacího systému v aplikaci a to jak v beta verzi, tak i při oficiálním vydání.</p>
            <p><b>3.3.5</b> Je zakázáno jakkoliv záměrně zatěžovat náš systém. Jedná se zejména o spam, DOS/DDOS či jiné útoky s cílem shodit náš systém. Útoky typu DOS/DDOS jsou v České republice trestné! Jako spam je považováno psání neustále stejných zpráv dokola.</p>
            <p><b>3.3.6</b> Je zakázáno záměrně sdělovat nepravdivé informace, nebo sdílet deepfake videa.</p>
            <p><b>3.3.7</b> Je zakázáno obcházet udělené permanentní či časově omezené tresty jako například vytvářením nových účtů.</p>
            <p><b>3.3.8</b> Je zakázáno šířit osobní údaje o sobě, nebo jiných uživatelech. Myslete na své soukromí i soukromí jiných.</p>
            <p><b>3.3.9</b> Je zakázáno nahrávat nevhodný obsah. Profilovka/banner obsahující 18+ (zejména pornografický) obsah, nebo znázornující násilí a to platí i pro nevhodné přezdívky.</p>
            <p><b>3.3.10</b> Je zakázáno navádět jiné uživatele k porušování pravidel.</p>
            <p><b>3.3.11</b> Je zakázáno posílat závadné odkazy (zejména se jedná o malware, scam, nebo stránky zobrazující nahotu a 18+ obsah).</p>
            <p><b>3.3.12</b> Je zakázáno zneužívat díry v těchto pravidlech. Nalezené díry je nutné nahlásit stejně jako chyby systému.</p>
            <p><b>3.3.13</b> Je zakázáno svůj účet dále přeprodávat, nebo předávat ostatním za účelem obcházení trestu, nebo za účelem obcházení omezeného přístupu beta verze.</p>

            <h3>3.4 Odpovědnost a záruky</h3>
            <p>Služba je poskytovaná tak, „jak je". V rámci beta verze neručíme za případné výpadky, ztrátu dat či chyby z naší strany a ani za obsah tvořen uživateli.</p>
            <p>Za vše co u nás publikujete včetně (obrázků, profilových fotek, bannerů, samotných zpráv) nesete plnou odpovědnost vy. Neručíme za případné zneužití vámi nahraných dat.</p>

            <h3>3.5 Ukončení účtu</h3>
            <p>Vy máte právo svůj účet smazat kdykoliv a my si vyhrazujeme právo váš účet pozastavit (zabanovat) kdykoliv, pokud porušíte tyto podmínky. Proti tomu se můžete odvolat pomocí e-mailové komunikace.</p>

            <h3>3.6 Duševní vlastnictví</h3>
            <p>Vše od kódu po loga a texty patří nám. Tím, že nahrajete svoji profilovou fotku, banner, nebo ikonku chatu, nám dáváte bezúplatnou licenci tento obsah uložit a zobrazovat ostatním uživatelům, a to jen pro účely provozu služby a jen do doby, než ho smažete nebo zrušíte účet.</p>

            <h3>3.7 Změny podmínek</h3>
            <p>Vyhrazujeme si právo podmínky kdykoliv změnit. Vás na to upozorníme prostřednictvím e-mailu, ale doporučujeme, abyste si sami udržovali pravidelný přehled.</p>

            <h3>3.8 Řešení sporů</h3>
            <p>Jakékoliv spory řešte zejména prostřednictvím e-mailové komunikace s námi. Tyto podmínky se řídí právem České republiky, a tak v případě nouze máte plné právo využít soudní cestu.</p>
        </div>
    );
}