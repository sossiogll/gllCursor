/*
 * gllCursor script by Sossio Giallaurito
 * based on SmartCursor by Maxim Dobrovolsky
 * https://github.com/sossiogll
 * Choose the theme WHITE or BLACK
 * Choose the LAZINESS
 */



/*************** Module definition ***************/


(function (ng) {
    'use strict';

    ng.module('gllCursor', []);

}(angular));

/*************** Provider definition ***************/

(function (ng) {
    'use strict';

    var app = ng.module('gllCursor');

    /**
     * An angular service to wrap the reCaptcha API
     */
    app.provider('$cursor', function(){

        console.log(app);

        function setTheme(){}

        var provider = this;

        provider.theme = "";
        provider.lazyness = 0,

        provider.$get = function(){

            return {
                customize : function(theme, lazyness){
                    provider.theme = theme;
                    provider.lazyness = lazyness;
                }
            };
        };
    });

}(angular));


/*************** Factory definition ***************/

(function (ng) {
    'use strict';

    var app = ng.module('gllCursor');
    app.factory('gllCursorFactory', function(){

        var lazyness;
        var theme;

        return {
            getTheme: function () {
                return theme;
            },
            getLazyness: function () {
                return lazyness;
            },
            setTheme: function(data) {
                theme = data;
            },
            setLazyness: function(data) {
                lazyness = data;
            }

        };

    });

    /**
     * An angular service to wrap the reCaptcha API
     */




}(angular));


/*************** Controller definition ***************/


(function (ng) {
    'use strict';

    var app = ng.module('gllCursor');

app.controller('gllCursorController', function ($scope, $cursor, gllCursorService) {

    function test(){
        alert("test controller");
    }

});

}(angular));


/*************** Service definition ***************/


(function (ng) {
    'use strict';

    var app = ng.module('gllCursor');

    app.service('gllCursorService', function($cursor){

        var service = this;
        service.theme="";
        service.lazyness=0;

        function setTheme(theme){
            service.theme = theme;
        }

        function setTheme(lazyness){
            service.lazyness = lazyness;
        }

    });

}(angular));


/*************** Provider definition ***************/

(function (ng) {
    'use strict';

    var app = ng.module('gllCursor');
    app.run(function(){



    });

/**
 * An angular service to wrap the reCaptcha API
 */




}(angular));





/*


.

const THEME = 'BLACK';
const LAZINESS = 200;


const cursor = document.createElement('div');
const elements = document.querySelectorAll('*');
cursor.id = 'SmartCursor';
document.body.append(cursor);
cursorDefaults();
let IS_LOCKED = false;


function cursorDefaults() {
    let style = cursor.style;
    style.height = '19pt';
    style.width = '19pt';
    style.transform = 'translate(-50%,-50%)';
    style.borderRadius = '50%';
    style.position = 'fixed';
    style.top = '0';
    style.left = '0';
    style.transition = `all ${LAZINESS}ms ease-out`;
    style.zIndex = '2';
    style.pointerEvents = 'none';

    switch (THEME) {
        case 'BLACK':
            style.background = 'rgba(0,0,0,0.2)';
            style.border = '1px solid rgba(20,20,20,0.5)';
            break;
        case 'WHITE':
            style.background = 'rgba(255,255,255,0.2)';
            style.border = '1px solid rgba(230,230,230,0.5)';
            break;
        default:
            style.background = 'rgba(0,0,0,0.2)';
            style.border = '1px solid rgba(20,20,20,0.5)';
            break;
    }

}

function cursorText(targetS) {
    let style = cursor.style;
    style.height = targetS;
    style.width = '1px';
    cursor.style.borderRadius = '2pt';
}

function cursorBlock(targetX, targetY, targetH, targetW) {
    let style = cursor.style;
    style.left = `${targetX}px`;
    style.top = `${targetY}px`;
    style.width = `${targetW + 5}px`;
    style.height = `${targetH + 5}px`;
    style.borderRadius = '2pt';
    style.background = 'rgba(0,0,0,0)';

    switch (THEME) {
        case 'BLACK':
            style.border = '1px solid rgba(20,20,20,0.5)';
            break;
        case 'WHITE':
            style.border = '1px solid rgba(230,230,230,0.5)';
            break;
        default:
            style.border = '1px solid rgba(20,20,20,0.5)';
            break;


    }

}

function lockOnElem(elem) {
    let targetW = elem.getBoundingClientRect().width;
    let targetH = elem.getBoundingClientRect().height;
    let targetX = targetW / 2 + elem.getBoundingClientRect().left;
    let targetY = targetH / 2 + elem.getBoundingClientRect().top;

    if (elem.classList.contains('SC-block')) {
        IS_LOCKED = true;
        cursorBlock(targetX, targetY, targetH, targetW);
    } else if (elem.classList.contains('SC-text')) {
        let targetS = window.getComputedStyle(elem).fontSize;
        cursorText(targetS);
    }
}

$( document ).ready(function() {

    var all = $(".SC-block").map(function() {
        return this.innerHTML;
    }).get();

    console.log(all.join());

    for (let i = 0; i < elements.length; i++) {

        console.log(elements[i].classList);

        elements[i].style.cursor = 'none';
        elements[i].onmouseenter = (event => {
            if (elements[i].tagName !== 'HTML' && elements[i].tagName !== 'BODY') {
                lockOnElem(elements[i]);
            }
        })

        elements[i].onmouseout = (event => {
            if (elements[i].tagName !== 'HTML' && elements[i].tagName !== 'BODY') {
                IS_LOCKED = false;
                cursorDefaults();
            }
        })

        document.onmousemove = (event => {
            let cursorX = event.x;
            let cursorY = event.y;

            if (!IS_LOCKED) {
                cursor.style.top = `${cursorY}px`;
                cursor.style.left = `${cursorX}px`;
            }
        });

    }
});


*/