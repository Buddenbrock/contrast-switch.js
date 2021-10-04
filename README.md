![layout][logo-contrast-switch]

[logo-contrast-switch]: src/logo.svg

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

### Add the script bundle to your footer script block
```html
<script src="./src/contrast-switch.js"></script>
```

### Add options
```javascript
let contrastButton = document.querySelector('.btn.contrast');
let contrastSwitch = new ContrastSwitch(contrastButton, {
    toggleClass: 'increased',
    activeTitle: 'Kontraste der Seite zurücksetzen',
    activeText: 'Kontraste zurücksetzen',
    inactiveTitle: 'Kontraste der Seite erhöhen',
    inactiveText: 'Kontraste erhöhen',
    cookieName: 'contrast-cookie',
    accessibilityFileProd: './Public/accessibility.min.css',
    accessibilityFileLocal: './accessibility.css',
    activeButtonAlertText: 'Der Kontrast der Seite wurde für Sie erhöht. Nutzen Sie Cookies, um die Einstellung für das komplette Erlebnis zu speichern.',
    inactiveButtonAlertText: 'Der Kontrast der Seite ist wieder auf dem normalen Level',
});
```

## LICENSE
GPL-3.0 &copy; [@buddenbrock/contrast-switch.js](https://github.com/Buddenbrock/contrast-switch.js/blob/master/LICENSE)