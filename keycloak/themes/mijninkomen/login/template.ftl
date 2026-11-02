<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="utf-8">
    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="/img/favicon-mijninkomen.png" />
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <script type="importmap">
        {
            "imports": {
                "rfc4648": "${url.resourcesCommonPath}/vendor/rfc4648/rfc4648.js"
            }
        }
    </script>
    <script type="module">
        import { startSessionPolling } from "${url.resourcesPath}/js/authChecker.js";

        startSessionPolling("${url.ssoLoginInOtherTabsUrl?no_esc}");
    </script>
    <#if authenticationSession??>
        <script type="module">
            import { checkAuthSession } from "${url.resourcesPath}/js/authChecker.js";

            checkAuthSession("${authenticationSession.authSessionIdHash}");
        </script>
    </#if>
</head>
<body data-page-id="login-${pageId}">
    <a class="mi-skiplink" href="#inhoud">${msg("miNaarInhoud")}</a>
    <header class="mi-kop">
        <div class="mi-container mi-kop__inhoud">
            <a class="mi-kop__logo" href="/"><img src="/img/logo-mijninkomen.png" alt="MijnInkomen: naar de homepage" /></a>
            <nav aria-label="Hoofdmenu">
                <ul class="mi-menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/ontwikkelingen/">Ontwikkelingen</a></li>
                    <li><a href="/meer-weten/">Meer weten</a></li>
                    <li><a href="/initiatief-melden/">Initiatief melden</a></li>
                    <li><a href="/contact/">Contact</a></li>
                </ul>
            </nav>
        </div>
        <div class="mi-container" aria-hidden="true"><div class="mi-streep"></div></div>
    </header>

    <main id="inhoud" class="mi-container mi-inhoud">
        <p class="mi-bovenkop"><#nested "bovenkop"></p>
        <h1 id="kc-page-title"><#nested "header"></h1>
        <#nested "intro">

        <#if auth?has_content && auth.showUsername() && !auth.showResetCredentials()>
            <p class="mi-gebruiker">
                <strong>${auth.attemptedUsername}</strong>
                <a href="${url.loginRestartFlowUrl}">${msg("miAndereGebruiker")}</a>
            </p>
        </#if>

        <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
            <div class="mi-melding mi-melding--${message.type}" role="alert">${kcSanitize(message.summary)?no_esc}</div>
        </#if>

        <#nested "form">

        <#if auth?has_content && auth.showTryAnotherWayLink()>
            <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post">
                <input type="hidden" name="tryAnotherWay" value="on"/>
                <button class="mi-knop mi-knop--secundair" type="submit">${msg("doTryAnotherWay")}</button>
            </form>
        </#if>

        <#if displayInfo><#nested "info"></#if>
    </main>

    <footer class="mi-voet">
        <div class="mi-container mi-voet__inhoud">
            <div>
                <img class="mi-voet__logo" src="/img/logo-mijninkomen.png" alt="MijnInkomen" />
                <p>${msg("miVoetTekst")}</p>
            </div>
            <nav aria-label="Contact">
                <h2>Contact</h2>
                <p>Vragen over MijnInkomen?</p>
                <ul>
                    <li><a href="/contact/">Neem contact op</a></li>
                    <li><a href="https://www.linkedin.com/">Volg ons op LinkedIn</a></li>
                </ul>
            </nav>
            <nav aria-label="Menu">
                <h2>Menu</h2>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/ontwikkelingen/">Ontwikkelingen</a></li>
                    <li><a href="/meer-weten/">Meer weten</a></li>
                    <li><a href="/initiatief-melden/">Initiatief melden</a></li>
                    <li><a href="/contact/">Contact</a></li>
                    <li><a href="/privacy/">Privacyverklaring</a></li>
                </ul>
            </nav>
        </div>
    </footer>
</body>
</html>
</#macro>
