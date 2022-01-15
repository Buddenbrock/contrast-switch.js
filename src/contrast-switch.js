class ContrastSwitch {
    constructor(contrastButton, options = {}) {
        this.options = {
            head: document.getElementsByTagName('head'),

            // button
            button: contrastButton,
            toggleClass: options.toggleClass || 'increased',
            activeTitle: options.activeTitle || 'Reset the contrasts of the page',
            activeText: options.activeText || 'Reset contrasts',
            inactiveTitle: options.inactiveTitle || 'Increase the contrast of the page',
            inactiveText: options.inactiveText || 'Increase contrasts',

            // save settings
            localStorageKey: options.localStorageKey || 'contrast-key',

            // files
            accessibilityFileProd: options.accessibilityFileProd || './Public/Css/accessibility.min.css',
            accessibilityFileLocal: options.accessibilityFileLocal || './Css/accessibility.css',

            // alert
            activeButtonAlertText: options.activeButtonAlertText || 'The contrast of the page has been increased for you. Use cookies to save the setting for the complete experience.',
            inactiveButtonAlertText: options.inactiveButtonAlertText || 'The contrast of the page is back to normal.',
            disableWindowAlert: options.disableWindowAlert || false,

            // localhost
            localhostName: options.localhostName || 'localhost',
            localhostInfoMessage: options.localhostInfoMessage || 'Localhost detected. Change contrast switch to local file path',
        }


        //  switch loaded styles file if localhost is detected
        if(window.location.hostname === this.options.localhostName) {
            console.info(this.options.localhostInfoMessage);
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
     * @desc save value to local storage
     * @param cname
     * @param cvalue
     */
    saveToLocalStorage = (cname, cvalue) => {
        localStorage.setItem(cname, cvalue);
    }

    /**
     * @desc get value from local storage
     * @param cname
     */
    getFromLocalStorage = cname => {
        return localStorage.getItem(cname) || '';
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
            ariaCookie = this.getFromLocalStorage(this.options.localStorageKey),
            link = this.buildAccessibilityLinkElement();

        document.addEventListener('DOMContentLoaded', () => {
            if (ariaCookie === '1') {
                accessibilityStatus = 1;
                this.addElementInsideHead(link);
                this.activateContrastButton();
            }
        });

        this.options.button.addEventListener('click', () => {
            ariaCookie = this.getFromLocalStorage(this.options.localStorageKey);

            if (accessibilityStatus === 0 && (ariaCookie === '' || ariaCookie === '0')) {
                accessibilityStatus = 1;
                this.addElementInsideHead(link);

                if (!this.options.disableWindowAlert) {
                    this.showAlert(this.options.activeButtonAlertText);
                }

                this.saveToLocalStorage(this.options.localStorageKey, accessibilityStatus);
                this.activateContrastButton();

            } else {
                accessibilityStatus = 0;
                this.removeElement('link[href="' + this.options.accessibilityFile + '"]');

                if (!this.options.disableWindowAlert) {
                    this.showAlert(this.options.inactiveButtonAlertText);
                }

                this.saveToLocalStorage(this.options.localStorageKey, accessibilityStatus);
                this.inactivateContrastButton();
            }
        })
    }
}
