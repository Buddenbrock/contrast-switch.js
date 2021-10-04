![layout][logo-contrast-switch]

[logo-contrast-switch]: src/logo.svg

# ContrastSwitch.js
![GitHub licenze](https://img.shields.io/github/license/Buddenbrock/contrast-switch.js?style=for-the-badge)
![GitHub release](https://img.shields.io/github/package-json/version/Buddenbrock/contrast-switch.js?style=for-the-badge)
![Last commit](https://img.shields.io/github/last-commit/buddenbrock/contrast-switch.js?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/Buddenbrock/contrast-switch.js?style=for-the-badge)

Javascript for adding additional stylesheet for accessibility styles on button click

## INSTALLATION
### Using npm
```sh
npm -i @buddenbrock/contrast-switch.js --save
```

### Using yarn
```sh
yarn add @buddenbrock/contrast-switch.js
```

## HOW TO USE
Take a look at the small example in the demo folder

### Add the script bundle to your footer script block
```html
<script src="./src/contrast-switch.js"></script>
```

### Add options
Define your options. These given options are defaults.

```javascript
let contrastButton = document.querySelector('.btn.contrast');
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

## DONATION
This is free, open-source software. If you'd like to support the development of future projects, or say thanks for this one, you can [donate](https://www.paypal.me/buddenbrock).

## LICENSE
GPL-3.0 &copy; [@buddenbrock/contrast-switch.js](https://github.com/Buddenbrock/contrast-switch.js/blob/master/LICENSE)