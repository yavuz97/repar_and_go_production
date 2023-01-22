/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import './styles/style.css';
import './styles/clesMinute.css';
import './styles/computerReparation.css';
import './styles/tabletteReparation.css';
import './styles/scrollPhones.css';


// start the Stimulus application
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';
import $ from 'jquery'

import peScrollChange from './peScroll'



/*
 Copyright 2014 Google Inc. All rights reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

(function(window) {

    if (!!window.cookieChoices) {
        return window.cookieChoices;
    }

    var document = window.document;
    // IE8 does not support textContent, so we should fallback to innerText.
    var supportsTextContent = 'textContent' in document.body;

    var cookieChoices = (function() {

        var cookieName = 'displayCookieConsent';
        var cookieConsentId = 'cookieChoiceInfo';
        var dismissLinkId = 'cookieChoiceDismiss';

        function _createHeaderElement(cookieText, dismissText, linkText, linkHref) {
            var butterBarStyles = 'position:fixed;width:100%;background-color:rgb(56 56 56);color:#F5F5F5;' +
                'margin:0; left:0; bottom:0; padding:5px;z-index:1000;text-align:center;font-size: 14px;';

            var cookieConsentElement = document.createElement('div');
            cookieConsentElement.id = cookieConsentId;
            cookieConsentElement.style.cssText = butterBarStyles;
            cookieConsentElement.appendChild(_createConsentText(cookieText));

            if (!!linkText && !!linkHref) {
                cookieConsentElement.appendChild(_createInformationLink(linkText, linkHref));
            }
            cookieConsentElement.appendChild(_createDismissLink(dismissText));

            return cookieConsentElement;
        }

        function _createDialogElement(cookieText, dismissText, linkText, linkHref) {
            var glassStyle = 'position:fixed;width:100%;height:100%;z-index:999;' +
                'top:0;left:0;opacity:0.5;filter:alpha(opacity=50);' +
                'background-color:#ccc;';
            var dialogStyle = 'z-index:1000;position:fixed;left:50%;top:50%';
            var contentStyle = 'position:relative;left:-50%;margin-top:-25%;' +
                'background-color:#fff;padding:20px;box-shadow:4px 4px 25px #888;';

            var cookieConsentElement = document.createElement('div');
            cookieConsentElement.id = cookieConsentId;

            var glassPanel = document.createElement('div');
            glassPanel.style.cssText = glassStyle;

            var content = document.createElement('div');
            content.style.cssText = contentStyle;

            var dialog = document.createElement('div');
            dialog.style.cssText = dialogStyle;

            var dismissLink = _createDismissLink(dismissText);
            dismissLink.style.display = 'block';
            dismissLink.style.textAlign = 'right';
            dismissLink.style.marginTop = '8px';

            content.appendChild(_createConsentText(cookieText));
            if (!!linkText && !!linkHref) {
                content.appendChild(_createInformationLink(linkText, linkHref));
            }
            content.appendChild(dismissLink);
            dialog.appendChild(content);
            cookieConsentElement.appendChild(glassPanel);
            cookieConsentElement.appendChild(dialog);
            return cookieConsentElement;
        }

        function _setElementText(element, text) {
            if (supportsTextContent) {
                element.textContent = text;
            } else {
                element.innerText = text;
            }
        }

        function _createConsentText(cookieText) {
            var consentText = document.createElement('span');
            _setElementText(consentText, cookieText);
            return consentText;
        }

        function _createDismissLink(dismissText) {
            var dismissLink = document.createElement('a');
            _setElementText(dismissLink, dismissText);
            dismissLink.id = dismissLinkId;
            dismissLink.href = '#';
            dismissLink.style.marginLeft = '15px';
            dismissLink.style.color = '#F5F5F5';
            return dismissLink;
        }

        function _createInformationLink(linkText, linkHref) {
            var infoLink = document.createElement('a');
            _setElementText(infoLink, linkText);
            infoLink.href = linkHref;
            infoLink.target = '_blank';
            infoLink.style.marginLeft = '15px';
            infoLink.style.fontsize = '12px';
            infoLink.style.color = '#F5F5F5';
            return infoLink;
        }

        function _dismissLinkClick() {
            _saveUserPreference();
            _removeCookieConsent();
            return false;
        }

        function _showCookieConsent(cookieText, dismissText, linkText, linkHref, isDialog) {
            if (_shouldDisplayConsent()) {
                _removeCookieConsent();
                var consentElement = (isDialog) ?
                    _createDialogElement(cookieText, dismissText, linkText, linkHref) :
                    _createHeaderElement(cookieText, dismissText, linkText, linkHref);
                var fragment = document.createDocumentFragment();
                fragment.appendChild(consentElement);
                document.body.appendChild(fragment.cloneNode(true));
                document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
            }
        }

        function showCookieConsentBar(cookieText, dismissText, linkText, linkHref) {
            _showCookieConsent(cookieText, dismissText, linkText, linkHref, false);
        }

        function showCookieConsentDialog(cookieText, dismissText, linkText, linkHref) {
            _showCookieConsent(cookieText, dismissText, linkText, linkHref, true);
        }

        function _removeCookieConsent() {
            var cookieChoiceElement = document.getElementById(cookieConsentId);
            if (cookieChoiceElement != null) {
                cookieChoiceElement.parentNode.removeChild(cookieChoiceElement);
            }
        }

        function _saveUserPreference() {
            // Set the cookie expiry to one year after today.
            var expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 6);
            document.cookie = cookieName + '=y; path=/; expires=' + expiryDate.toGMTString();
        }

        function _shouldDisplayConsent() {
            // Display the header only if the cookie has not been set.
            return !document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
        }

        var exports = {};
        exports.showCookieConsentBar = showCookieConsentBar;
        exports.showCookieConsentDialog = showCookieConsentDialog;
        return exports;
    })();

    window.cookieChoices = cookieChoices;
    return cookieChoices;
})(this);

document.getElementById("id_responsiveMenuBar").onclick = function openNav() {
    document.getElementById("mySidenav").style.width = "60%";
    document.getElementById("id_responsiveMenuBar").style.display = "none";
};
document.getElementById("closeNavBar").onclick = function openNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("id_responsiveMenuBar").style.display = "block";

};



