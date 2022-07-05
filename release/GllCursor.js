/*
 * gllCursor angular module by Sossio Giallaurito sossiogll
 * https://github.com/sossiogll
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

    app.provider('$cursor', function () {

        var provider = this;

        provider._theme = "BLACK";
        provider._lazyness = 100;

        provider.cursorTheme = function (theme) {
            provider._theme = theme;
        };

        provider.cursorLazyness = function (lazyness) {
            provider._lazyness = lazyness;
        }

        provider.$get = function () {
            return {
                customTheme: function () {
                    return provider._theme;
                }, customLazyness: function () {
                    return provider._lazyness;
                }
            };
        };
    });

}(angular));


/*************** Factory definition ***************/

(function (ng) {
    'use strict';

    var app = ng.module('gllCursor');
    app.factory('gllCursorFactory', function () {

        var lazyness = 0;
        var theme = "";
        var triggeringTextElements = null;
        var triggeringBlockElements = null;
        var lockCursor = false;
        var cursor = null;

        return {
            getTheme: function () {
                return theme;
            }, getLazyness: function () {
                return lazyness;
            }, getTriggeringTextElements: function () {
                return triggeringTextElements;
            }, getTriggeringBlockElements: function () {
                return triggeringBlockElements;
            }, getLockCursor: function () {
                return lockCursor;
            }, setTheme: function (data) {
                theme = data;
            }, setLazyness: function (data) {
                lazyness = data;
            }, setTriggeringTextElements: function (data) {
                triggeringTextElements = data;
            }, setTriggeringBlockElements: function (data) {
                triggeringBlockElements = data;
            }, setCursor: function (data) {
                cursor = data;
            }, setLockCursor: function (data) {
                lockCursor = data;
            }, setCursorHeight: function (data) {
                cursor.style.height = data;
            }, setCursorWidth: function (data) {
                cursor.style.width = data;
            }, setCursorTransform: function (data) {
                cursor.style.transform = data;
            }, setCursorBorderRadius: function (data) {
                cursor.style.borderRadius = data;
            }, setCursorPosition: function (data) {
                cursor.style.position = data;
            }, setCursorTop: function (data) {
                cursor.style.top = data;
            }, setCursorLeft: function (data) {
                cursor.style.left = data;
            }, setCursorTransition: function (data) {
                cursor.style.transition = data;
            }, setCursorZIndex: function (data) {
                cursor.style.zIndex = data;
            }, setCursorPointerEvents: function (data) {
                cursor.style.pointerEvents = data;
            }, setCursorBackground: function (data) {
                cursor.style.background = data;
            }, setCursorBorder: function (data) {
                cursor.style.border = data;
            },


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

    app.controller('gllCursorController', function ($scope, $cursor, gllCursorService, $rootScope) {


    });

}(angular));


/*************** Service definition ***************/


(function (ng) {
    'use strict';

    var app = ng.module('gllCursor');

    app.service('gllCursorService', function ($cursor, gllCursorFactory) {

        /**Service variables**/
        var service = this;
        service.theView = angular.element("body");

        /**Factory communications**/
        function createGllCursor() {
            var cursor = document.createElement('div');
            cursor.id = 'gllCursor';
            document.body.append(cursor);
            gllCursorFactory.setCursor(cursor);
        }

        function lockCursor() {
            gllCursorFactory.setLockCursor(true)
        }

        function unlockCursor() {
            gllCursorFactory.setLockCursor(false);
        }

        function isCursorLocked() {
            return gllCursorFactory.getLockCursor();
        }

        /**Cursor behaviours**/
        function cursorDefaults() {
            gllCursorFactory.setCursorHeight('19pt');
            gllCursorFactory.setCursorWidth('19pt');
            gllCursorFactory.setCursorTransform('translate(-50%,-50%)');
            gllCursorFactory.setCursorBorderRadius('50%');
            gllCursorFactory.setCursorPosition('fixed');
            gllCursorFactory.setCursorTransition(`all ${gllCursorFactory.getLazyness()}ms ease-out`);
            gllCursorFactory.setCursorZIndex('1040');
            gllCursorFactory.setCursorPointerEvents('none');

            switch (gllCursorFactory.getTheme()) {
                case 'RED':
                    gllCursorFactory.setCursorBackground('#c11010');
                    gllCursorFactory.setCursorBorder('1px solid #fff');
                    break;
                case 'BLUE':
                    gllCursorFactory.setCursorBackground('#010088');
                    gllCursorFactory.setCursorBorder('1px solid #EFEFEF');
                    break;
                case 'BLACK':
                    gllCursorFactory.setCursorBackground('rgba(0,0,0,0.2)');
                    gllCursorFactory.setCursorBorder('1px solid rgba(20,20,20,0.5)');
                    break;
                case 'WHITE':
                    gllCursorFactory.setCursorBackground('rgba(255,255,255,0.2)');
                    gllCursorFactory.setCursorBorder('1px solid rgba(230,230,230,0.5)');
                    break;
                default:
                    gllCursorFactory.setCursorBackground('rgba(0,0,0,0.2)');
                    gllCursorFactory.setCursorBorder('1px solid rgba(20,20,20,0.5)');
                    break;
            }

        }

        function cursorText(targetS) {
            gllCursorFactory.setCursorHeight(targetS);
            gllCursorFactory.setCursorWidth('3px');
            gllCursorFactory.setCursorBorderRadius('2pt');
            gllCursorFactory.setCursorBorder('1px solid #fff');
        }

        function cursorBlock(targetX, targetY, targetH, targetW) {
            gllCursorFactory.setCursorLeft(`${targetX}px`);
            gllCursorFactory.setCursorTop(`${targetY}px`);
            gllCursorFactory.setCursorWidth(`${targetW + 0}px`);
            gllCursorFactory.setCursorHeight(`${targetH + 0}px`);
            gllCursorFactory.setCursorBorderRadius('0pt');
            gllCursorFactory.setCursorBackground('rgba(0,0,0,0)');
            gllCursorFactory.setCursorZIndex(1040);

            switch (gllCursorFactory.getTheme()) {
                case 'RED':
                    gllCursorFactory.setCursorBorder('2px solid #c11010');
                    break;
                case 'BLUE':
                    gllCursorFactory.setCursorBorder('2px solid #010088');
                    break;
                case 'BLACK':
                    gllCursorFactory.setCursorBorder('1px solid rgba(20,20,20,0.5)');
                    break;
                case 'WHITE':
                    gllCursorFactory.setCursorBorder('1px solid rgba(230,230,230,0.5)');
                    break;
                default:
                    gllCursorFactory.setCursorBorder('1px solid rgba(20,20,20,0.5)');
                    break;
            }

        }

        function lockOnTextElem(elem) {
            let targetS = window.getComputedStyle(elem).fontSize;
            cursorText(targetS);

        }

        function lockOnBlockElem(elem) {
            lockCursor();
            let targetW = elem.getBoundingClientRect().width;
            let targetH = elem.getBoundingClientRect().height;
            let targetX = targetW / 2 + elem.getBoundingClientRect().left;
            let targetY = targetH / 2 + elem.getBoundingClientRect().top;
            cursorBlock(targetX, targetY, targetH, targetW);

        }

        /**Finding triggering elements**/

        function findTriggeringTextElements() {
            var texts = service.theView.find(".gllText");
            gllCursorFactory.setTriggeringTextElements(texts);
            for (var i = 0; i < texts.length; i++) {

                texts[i].identifier = i;
                texts[i].onmouseenter = (event => {
                    var textElement = gllCursorFactory.getTriggeringTextElements()[event.target.identifier];
                    if (textElement.tagName !== 'HTML' && textElement.tagName !== 'BODY') {

                        lockOnTextElem(textElement);

                    }
                })

                texts[i].onmouseout = (event => {
                    var textElement = gllCursorFactory.getTriggeringTextElements()[event.target.identifier];
                    if (textElement.tagName !== 'HTML' && textElement.tagName !== 'BODY') {

                        unlockCursor();
                        cursorDefaults();

                    }
                })

            }
        }

        function findTriggeringBlockElements() {
            var blocks = service.theView.find(".gllBlock");
            gllCursorFactory.setTriggeringBlockElements(blocks);
            for (var i = 0; i < blocks.length; i++) {

                blocks[i].identifier = i;
                blocks[i].onmouseenter = (event => {
                    var blockElement = gllCursorFactory.getTriggeringBlockElements()[event.target.identifier];
                    if (blockElement.tagName !== 'HTML' && blockElement.tagName !== 'BODY') {

                        lockOnBlockElem(blockElement);

                    }
                })

                blocks[i].onmouseout = (event => {
                    var blockElement = gllCursorFactory.getTriggeringBlockElements()[event.target.identifier];
                    if (blockElement.tagName !== 'HTML' && blockElement.tagName !== 'BODY') {

                        unlockCursor();
                        cursorDefaults();

                    }
                })
            }


        }


        /**Exposing functions**/

        function _findTriggeringElements() {

            findTriggeringBlockElements();
            findTriggeringTextElements();


        }

        function _initCursor() {
            gllCursorFactory.setLazyness($cursor.customLazyness());
            gllCursorFactory.setTheme($cursor.customTheme());

            createGllCursor();
            cursorDefaults();

        }


        function _startCursor() {
            document.onmousemove = (event => {
                let cursorX = event.x;
                let cursorY = event.y;

                if (!isCursorLocked()) {
                    gllCursorFactory.setCursorTop(`${cursorY}px`);
                    gllCursorFactory.setCursorLeft(`${cursorX}px`);
                }
            });
        }

        /** Return functions from service **/

        return {

            initCursor: _initCursor, findTriggeringElements: _findTriggeringElements, startCursor: _startCursor

        }


    });

}(angular));


/*************** Run definition ***************/

(function (ng) {
    'use strict';

    var app = ng.module('gllCursor');
    app.run(function (gllCursorService) {

        gllCursorService.initCursor();
        gllCursorService.startCursor();
    });

}(angular));

