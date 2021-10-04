class ContrastSwitch {
    constructor(contrastButton, options = {}) {
        this.options = {
            head: document.getElementsByTagName('head'),
            button: contrastButton,
            toggleClass: options.toggleClass || 'increased',
            activeTitle: options.activeTitle || 'Reset the contrasts of the page',
            activeText: options.activeText || 'Reset contrasts',
            inactiveTitle: options.inactiveTitle || 'Increase the contrast of the page',
            inactiveText: options.inactiveText || 'Increase contrasts',
            cookieName: options.cookieName || 'contrast-cookie',
            accessibilityFileProd: options.accessibilityFileProd || './Public/Css/accessibility.min.css',
            accessibilityFileLocal: options.accessibilityFileLocal || './Css/accessibility.css',
            activeButtonAlertText: options.activeButtonAlertText || 'The contrast of the page has been increased for you. Use cookies to save the setting for the complete experience.',
            inactiveButtonAlertText: options.inactiveButtonAlertText || 'The contrast of the page is back to normal.',
        }

        if(window.location.hostname === 'localhost') {
            console.log('Change contrast switch to local file path');
            this.options.accessibilityFile = this.options.accessibilityFileLocal;
        } else {
            this.options.accessibilityFile = this.options.accessibilityFileProd;
        }

        this.initContrastSwitch();
        this.switchButtonStyling();
        this.switchContrastStyling();
    }

    initContrastSwitch = () => {
        this.options.button.setAttribute('aria-label', this.options.inactiveText);
        this.options.button.setAttribute('title', this.options.inactiveTitle);
    }

    /**
     * @desc toggling class and content by clicking contrast button
     */
    switchButtonStyling = () => {
        this.options.button.addEventListener('click', () => {
            let containsToggleClass = this.options.button.classList.contains(this.options.toggleClass);

            if(containsToggleClass) {
                this.inactivateContrastButton();
            } else {
                this.activateContrastButton();
            }
        })
    }

    /**
     * @desc set contrast button status to active
     */
    activateContrastButton = () => {
        this.options.button.classList.add(this.options.toggleClass);
        this.options.button.setAttribute('aria-label', this.options.activeText);
        this.options.button.setAttribute('title', this.options.activeTitle);
    }

    /**
     * @desc set contrast button status to inactive
     */
    inactivateContrastButton = () => {
        this.options.button.classList.remove(this.options.toggleClass);
        this.options.button.setAttribute('aria-label', this.options.inactiveText);
        this.options.button.setAttribute('title', this.options.inactiveTitle);
    }

    /**
     * @desc set cookie vei given parameters
     * @param cname
     * @param cvalue
     * @param exdays
     */
    setCookie = (cname, cvalue, exdays) => {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    /**
     * @desc get cookie by given name
     * @param cname
     * @returns {string}
     */
    getCookie = cname => {
        let name = cname + "=",
            decodedCookie = decodeURIComponent(document.cookie),
            ca = decodedCookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return '';
    }

    /**
     * @desc generate css link element
     * @returns {HTMLLinkElement}
     */
    buildAccessibilityLinkElement = () => {
        let link = document.createElement('link');
        link.href = this.options.accessibilityFile;
        link.rel = 'stylesheet';

        return link;
    }

    /**
     * @desc insert element inside head
     * @param element
     */
    addElementInsideHead = element => {
        this.options.head[0].appendChild(element);
    }

    /**
     * @desc remove element
     */
    removeElement = element => {
        document.querySelector(element).remove();
    }

    /**
     * @desc show alert with given message
     * @param message
     */
    showAlert = message => {
        window.alert(message);
    }

    /**
     * @desc AccessibilitySwitch for adding additional css file
     */
    switchContrastStyling = () => {
        let accessibilityStatus = 0,
            ariaCookie = this.getCookie(this.options.cookieName),
            link = this.buildAccessibilityLinkElement();

        document.addEventListener('DOMContentLoaded', () => {
            if (ariaCookie === '1') {
                accessibilityStatus = 1;
                this.addElementInsideHead(link);
                this.activateContrastButton();
            }
        });

        this.options.button.addEventListener('click', () => {
            ariaCookie = this.getCookie(this.options.cookieName);

            if (accessibilityStatus === 0 && (ariaCookie === '' || ariaCookie === '0')) {
                accessibilityStatus = 1;
                this.addElementInsideHead(link);
                this.showAlert(this.options.activeButtonAlertText);
                this.setCookie(this.options.cookieName, accessibilityStatus, 7);
                this.activateContrastButton();

            } else {
                accessibilityStatus = 0;
                this.removeElement('link[href="' + this.options.accessibilityFile + '"]');
                this.showAlert(this.options.inactiveButtonAlertText);
                this.setCookie(this.options.cookieName, accessibilityStatus, 7);
                this.inactivateContrastButton();
            }
        })
    }
}
