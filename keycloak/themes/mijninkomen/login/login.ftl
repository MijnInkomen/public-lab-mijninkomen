<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password'); section>
    <#if section = "bovenkop">
        ${msg("miBovenkop")}
    <#elseif section = "header">
        ${msg("loginAccountTitle")}
    <#elseif section = "intro">
        <p class="mi-intro">${msg("miIntro")}</p>
    <#elseif section = "form">
        <div class="mi-inloggen">
            <section class="mi-kaart" aria-labelledby="formulier-titel">
                <h2 id="formulier-titel">${msg("miFormulierTitel")}</h2>
                <p>${msg("miFormulierUitleg")}</p>
                <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                    <div class="mi-veld">
                        <label class="mi-label" for="username">${msg("email")}</label>
                        <p class="mi-omschrijving" id="username-uitleg">${msg("miVoorbeeld")}</p>
                        <input class="mi-invoer" id="username" name="username" type="email" value="${(login.username!'')}"
                               autofocus autocomplete="username" aria-describedby="username-uitleg"
                               <#if messagesPerField.existsError('username','password')>aria-invalid="true"</#if> />
                    </div>
                    <div class="mi-veld">
                        <label class="mi-label" for="password">${msg("password")}</label>
                        <div class="${properties.kcInputGroup!}" dir="ltr">
                            <input class="mi-invoer" id="password" name="password" type="password" autocomplete="current-password"
                                   <#if messagesPerField.existsError('username','password')>aria-invalid="true" aria-describedby="input-error"</#if> />
                            <button class="${properties.kcFormPasswordVisibilityButtonClass!}" type="button" aria-label="${msg('showPassword')}"
                                    aria-controls="password" data-password-toggle
                                    data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                                    data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                                <i class="${properties.kcFormPasswordVisibilityIconShow!}" aria-hidden="true"></i>
                            </button>
                        </div>
                        <#if messagesPerField.existsError('username','password')>
                            <p class="mi-fout" id="input-error" aria-live="polite">${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}</p>
                        </#if>
                    </div>
                    <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                    <button class="mi-knop mi-knop--primair" name="login" id="kc-login" type="submit">${msg("doLogIn")} <span aria-hidden="true">→</span></button>
                </form>
                <p class="mi-klein">${msg("miTweestaps")}</p>
            </section>

            <aside class="mi-geen-lid" aria-labelledby="geen-lid-titel">
                <h2 id="geen-lid-titel">${msg("miGeenLidTitel")}</h2>
                <p>${msg("miGeenLidTekst")}</p>
                <p><a href="/meer-weten/communitylid/">${msg("miGeenLidLink")} <span aria-hidden="true">→</span></a></p>
                <hr />
                <h2>${msg("miToegangTitel")}</h2>
                <p>${msg("miToegangTekst")}</p>
                <a class="mi-knop mi-knop--secundair" href="/toegang-aanvragen/">${msg("miToegangKnop")}</a>
            </aside>
        </div>
        <script type="module" src="${url.resourcesPath}/js/passwordVisibility.js"></script>
    </#if>
</@layout.registrationLayout>
