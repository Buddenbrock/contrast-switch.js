![layout][logo-contrast-switch]

[logo-contrast-switch]: demo/Images/logo.svg

# ContrastSwitch.js
![GitHub licenze](https://img.shields.io/github/license/Buddenbrock/contrast-switch.js?style=for-the-badge)
![GitHub release](https://img.shields.io/github/package-json/version/Buddenbrock/contrast-switch.js?style=for-the-badge)
![Last commit](https://img.shields.io/github/last-commit/buddenbrock/contrast-switch.js?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/Buddenbrock/contrast-switch.js?style=for-the-badge)

This javascript includes a solution for adding accessibility styles for official acceccibility guidelines (`WCAG 2.1`, `EN 301 549 V3.1.1` or `BITV 2.0`) on a user interaction button click.
User select will be saved inside users local storage so if you switch pages, your settings will be honored and the additional stylesheet loaded again.

## How to Install
### Add package by using npm
```sh
npm -i @buddenbrock/contrast-switch.js --save
```

### Add package by using yarn
```sh
yarn add @buddenbrock/contrast-switch.js
```

### Add the styles bundle to your head block
#### Using NPM or Yarn
```html
<link href="./src/contrast-switch.min.css" rel="stylesheet" />
```

#### Using CDN
```html
<link href="https://unpkg.com/@buddenbrock/contrast-switch.js@0.1.4/src/contrast-switch.min.css" rel="stylesheet" />
```

### Add the script bundle to your footer script block
#### Using NPM or Yarn
```html
<link href="https://unpkg.com/@buddenbrock/contrast-switch.js@0.1.4/src/contrast-switch.min.css" rel="stylesheet" />
```

## How to use
### Add a button to your DOM
```html
<button role="button" class="btn btn-a11y"></button>
```

### Init class and add options
Define your options. These given options are defaults.

```javascript
let contrastButton = document.querySelector('.btn.btn-a11y');
let contrastSwitch = new ContrastSwitch(contrastButton, {
    toggleClass: 'increased',
    activeTitle: 'Reset the contrasts of the page',
    activeText: 'Reset contrasts',
    inactiveTitle: 'Increase the contrast of the page',
    inactiveText: 'Increase contrasts',
    localStorageKey: 'contrast-key',
    accessibilityFileProd: './Public/Css/accessibility.min.css',
    accessibilityFileLocal: './Css/accessibility.css',
    activeButtonAlertText: 'The contrast of the page has been increased for you. Use cookies to save the setting for the complete experience.',
    inactiveButtonAlertText: 'The contrast of the page is back to normal.',
    localhostName: 'localhost',
    localhostInfoMessage: 'Localhost detected. Change contrast switch to local file path',
});
```

## Donation
This is free, open-source software. If you'd like to support the development of future projects, or say thanks for this one, you can [donate](https://www.paypal.me/buddenbrock).

## License
GPL-3.0 &copy; [@buddenbrock/contrast-switch.js](https://github.com/Buddenbrock/contrast-switch.js/blob/master/LICENSE)