class ContrastSwitch {
    constructor(contrastButton, options = {}) {
        const {
            toggleClass = 'increased',
            activeTitle = 'Reset the contrasts of the page',
            activeText = 'Reset contrasts',
            inactiveTitle = 'Increase the contrast of the page',
            inactiveText = 'Increase contrasts',

            // save settings
            localStorageKey = 'contrast-key',

            // file
            accessibilityFile = './Css/accessibility.css',

            // alert
            activeButtonAlertText = 'The contrast of the page has been increased for you. Use cookies to save the setting for the complete experience.',
            inactiveButtonAlertText = 'The contrast of the page is back to normal.',
            disableWindowAlert = false,
        } = options;

        this.options = {
            head: document.getElementsByTagName('head'),
            button: contrastButton,

            toggleClass,
            activeTitle,
            activeText,
            inactiveTitle,
            inactiveText,
            localStorageKey,
            accessibilityFile,
            activeButtonAlertText,
            inactiveButtonAlertText,
            disableWindowAlert,
        };

        this.accessibilityStatus = parseInt(this.getFromLocalStorage(this.options.localStorageKey)) || 0;
        this.link = this.buildAccessibilityLinkElement();

        this.updateButtonAttributes(this.options.inactiveText, this.options.inactiveTitle);
        this.switchButtonStyling();
        this.switchContrastStyling();
    }

    /**
     * @desc    update attributes on contrast button
     * @param   text
     * @param   title
     */
    updateButtonAttributes(text, title) {
        this.options.button.setAttribute('aria-label', text);
        this.options.button.setAttribute('title', title);
    }

    /**
     * @desc    toggling class and content by clicking contrast button
     */
    switchButtonStyling = () => {
        this.options.button.addEventListener('click', () => {
            if(this.accessibilityStatus === 0) {
                this.toggleContrast(true);
            } else {
                this.toggleContrast(false);
            }
        })
    }

    /**
     * @desc    toggle mode of contrast button
     */
    toggleContrast(activate) {
        this.accessibilityStatus = activate ? 1 : 0;

        const text = activate ? this.options.activeText : this.options.inactiveText;
        const title = activate ? this.options.activeTitle : this.options.inactiveTitle;

        this.updateButtonAttributes(text, title);
        this.options.button.classList.toggle(this.options.toggleClass, activate);
    }

    /**
     * @desc    save value to local storage
     * @param   name
     * @param   value
     */
    saveToLocalStorage = (name, value) => {
        localStorage.setItem(name, value);
    }

    /**
     * @desc    get value from local storage
     * @param   name
     */
    getFromLocalStorage = name => {
        return localStorage.getItem(name) || '';
    }

    /**
     * @desc    generate css link element
     * @returns {HTMLLinkElement}
     */
    buildAccessibilityLinkElement = () => {
        let link = document.createElement('link');
        link.href = this.options.accessibilityFile;
        link.rel = 'stylesheet';

        return link;
    }

    /**
     * @desc    insert element inside head
     * @param   element
     */
    addElementInsideHead = element => {
        this.options.head[0].appendChild(element);
    }

    /**
     * @desc    remove element
     */
    removeElement = element => {
        document.querySelector(element).remove();
    }

    /**
     * @desc    show alert with given message
     * @param   message
     */
    showAlert = message => {
        window.alert(message);
    }

    /**
     * @desc    AccessibilitySwitch for adding additional css file
     */
    switchContrastStyling = () => {
        let accessibilityStatus = 0,
            ariaCookie = this.getFromLocalStorage(this.options.localStorageKey);

        document.addEventListener('DOMContentLoaded', () => {
            if (ariaCookie === '1') {
                accessibilityStatus = 1;
                this.addElementInsideHead(this.link);
                this.toggleContrast(true);
            }
        });

        this.options.button.addEventListener('click', () => {
            ariaCookie = this.getFromLocalStorage(this.options.localStorageKey);

            if (accessibilityStatus === 0 && (ariaCookie === '' || ariaCookie === '0')) {
                accessibilityStatus = 1;
                this.addElementInsideHead(this.link);

                if (!this.options.disableWindowAlert) {
                    this.showAlert(this.options.activeButtonAlertText);
                }

                this.saveToLocalStorage(this.options.localStorageKey, accessibilityStatus);
                this.toggleContrast(true);

            } else {
                accessibilityStatus = 0;
                this.removeElement('link[href="' + this.options.accessibilityFile + '"]');

                if (!this.options.disableWindowAlert) {
                    this.showAlert(this.options.inactiveButtonAlertText);
                }

                this.saveToLocalStorage(this.options.localStorageKey, accessibilityStatus);
                this.toggleContrast(false);
            }
        })
    }
}
