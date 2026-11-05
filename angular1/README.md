# gllCursor
gllCursor is an angularJS module that add to your website a beautiful cursor that
changes according to the element pointed.
## Installation
Clone the module in your project. You can use git
Setting up your development environment on your local machine :
```bash
$ git clone https://github.com/sossiogll/gllCursor.git
```
or add it to your ```package.json``` file
```
{
  "dependencies": {
    ...
    "gllCursor": "sossiogll/gllCursor"
    ...
  }
}

```
and then run
```bash
yarn install
```
##Configuration
Add the script to your head
```html
<head>
    ...
    <script src="./release/GllCursor.js"></script>
    ...
</head>
```
And the following snippet to your stylesheet, or create a new one.
```css
body,
.gllText,
.gllBlock,
.gllText > *,
.gllBlock > *,
.gllText:hover,
.gllBlock:hover
{
cursor:none;
}
```
Add the dipencency injection to your angularJS app
```JavaScript
(function () {
'use strict';

    angular
        .module('app', [..., 'gllCursor'])
        .config(config)
        .run(run);

    ...

})();
```
Add the ```$cursorProvider``` to your ```app.config()``` and configurate it according to your preferences
```JavaScript
(function () {
    'use strict';    

    config.$inject = [...,'$cursorProvider'];
    function config(..., $cursorProvider) {
        
        $cursorProvider.cursorTheme("Theme name");
        $cursorProvider.cursorLazyness(Integer value);
        
    ...
        
    }

})();    

```
Implemented themes (use them as ```"Theme name"```):
* BLUE
* BLACK
* WHITE

If not, the default theme is BLACK.

Add the ```$gllCursorService``` to your ```controller()``` that manages the ```body``` container and configurate it according to your preferences. You need to inject into your controller also ```$scope```. In this way, the cursor works also with dinamically loaded view. 
```JavaScript
(function () {
'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = [..., '$scope', 'gllCursorService'];
    function AppController(..., $scope, gllCursorService){

        $scope.$on('$viewContentLoaded', function () {

            gllCursorService.findTriggeringElements();

        });
        
    ...

    }
    
})();
```
As we said, we suppose the controller ```AppController``` (or whatever you prefer) is used as ```ng-controller``` of the ```body``` container
```HTML
<body ng-controller="AppController">
    ...
</body>
```
## Usage
The cursor changes based on two types of elements:
* Text
* Block

To use them, add ```gllText``` or ```gllBlock``` to your HTML document.
###gllBlock example
```HTML
<button class="yourClass gllBlock">Button name</button>
```
or
```HTML
<a class="yourClass gllBlock" href="#!/path">Link name</a>
```
###gllText example
```HTML
<h2 class = "gllText" > Title </h2>
<p class = "gllText" > Paragraph </p>
```
## Examples
### White cursor

![Alt Text](https://media.giphy.com/media/4pvRgyJmMfcNMTkR1N/giphy.gif)

### Black cursor

![Alt Text](https://media.giphy.com/media/i2ttLXs3dDl4TBRTla/giphy.gif)

##Credits
This module is ispired by [SmartCursor](https://github.com/Fenn3c/SmartCursor) by Fenn3c