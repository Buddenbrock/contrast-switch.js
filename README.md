![layout][logo-contrast-switch]

[logo-contrast-switch]: demo/Images/logo.svg

# ContrastSwitch.js
![GitHub licenze](https://img.shields.io/github/license/Buddenbrock/contrast-switch.js?style=for-the-badge)
![GitHub release](https://img.shields.io/github/package-json/version/Buddenbrock/contrast-switch.js?style=for-the-badge)
![Last commit](https://img.shields.io/github/last-commit/buddenbrock/contrast-switch.js?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/Buddenbrock/contrast-switch.js?style=for-the-badge)

Javascript for adding additional stylesheet for accessibility styles on button click

## Installation
### Using npm
```sh
npm -i @buddenbrock/contrast-switch.js --save
```

### Using yarn
```sh
yarn add @buddenbrock/contrast-switch.js
```

## How to use
Take a look at the small example in the demo folder

### Add the styles bundle to your head block
```html
<link href="./src/contrast-switch.min.css" rel="stylesheet" />
```

### Add the script bundle to your footer script block
```html
<script src="./src/contrast-switch.min.js"></script>
```

### Add button to your DOM
```html
<button role="button" class="btn btn-a11y"></button>
```

### Add options
Define your options. These given options are defaults.

```javascript
let contrastButton = document.querySelector('.btn.btn-a11y');
let contrastSwitch = new ContrastSwitch(contrastButton, {
    toggleClass: 'increased',
    activeTitle: 'Reset the contrasts of the page',
    activeText: 'Reset contrasts',
    inactiveTitle: 'Increase the contrast of the page',
    inactiveText: 'Increase contrasts',
    cookieName: 'contrast-cookie',
    accessibilityFileProd: './Public/Css/accessibility.min.css',
    accessibilityFileLocal: './Css/accessibility.css',
    activeButtonAlertText: 'The contrast of the page has been increased for you. Use cookies to save the setting for the complete experience.',
    inactiveButtonAlertText: 'The contrast of the page is back to normal.',
});
```

## Donation
This is free, open-source software. If you'd like to support the development of future projects, or say thanks for this one, you can [donate](https://www.paypal.me/buddenbrock).

## License
GPL-3.0 &copy; [@buddenbrock/contrast-switch.js](https://github.com/Buddenbrock/contrast-switch.js/blob/master/LICENSE)