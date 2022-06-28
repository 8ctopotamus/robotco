/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (() => {

eval("$(document).ready(function() {\r\n  $('.tlt').textillate()\r\n  \r\n  ScrollReveal({ \r\n    reset: true,\r\n    origin: 'left',\r\n    viewOffset: {\r\n      top: 100,\r\n    },\r\n    beforeReveal: function beforeReveal(el) {\r\n      el.children[0].classList.add('animate__animated', 'animate__fadeInLeft')\r\n    },\r\n    afterReveal: function beforeReveal(el) {\r\n      el.classList.remove('animate__animated animate__fadeInLeft')\r\n    },\r\n  }).reveal('.reveal-left')\r\n\r\n  ScrollReveal({ \r\n    reset: true,\r\n    origin: 'right',\r\n    viewOffset: {\r\n      top: 100,\r\n    },\r\n    beforeReveal: function beforeReveal(el) {\r\n      el.classList.add('animate__animated', 'animate__fadeInRight')\r\n    },\r\n    afterReveal: function beforeReveal(el) {\r\n      el.classList.remove('animate__animated','animate__fadeInRight')\r\n    },\r\n  }).reveal('.reveal-right')\r\n\r\n  particlesJS.load('hero', './src/js/particles.json', function() {\r\n    console.log('callback - particles.js config loaded');\r\n  });\r\n})\n\n//# sourceURL=webpack://robotco/./src/js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/script.js"]();
/******/ 	
/******/ })()
;