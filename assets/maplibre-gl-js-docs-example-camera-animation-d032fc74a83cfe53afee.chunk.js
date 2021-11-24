(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{"162u":function(e,t,n){"use strict";n.r(t),t.default="<style>\n    .map-overlay {\n        font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;\n        position: absolute;\n        width: 200px;\n        top: 0;\n        left: 0;\n        padding: 10px;\n    }\n\n    .map-overlay .map-overlay-inner {\n        background-color: #fff;\n        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n        border-radius: 3px;\n        padding: 10px;\n        margin-bottom: 10px;\n    }\n\n    .map-overlay-inner fieldset {\n        border: none;\n        padding: 0;\n        margin: 0 0 10px;\n    }\n\n    .map-overlay-inner fieldset:last-child {\n        margin: 0;\n    }\n\n    .map-overlay-inner select {\n        width: 100%;\n    }\n\n    .map-overlay-inner p {\n        margin: 0;\n    }\n\n    .map-overlay-inner label {\n        display: block;\n        font-weight: bold;\n    }\n\n    .map-overlay-inner button {\n        background-color: cornflowerblue;\n        color: white;\n        border-radius: 5px;\n        display: inline-block;\n        height: 20px;\n        border: none;\n        cursor: pointer;\n    }\n\n    .map-overlay-inner button:focus {\n        outline: none;\n    }\n\n    .map-overlay-inner button:hover {\n        background-color: blue;\n        box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.1);\n        -webkit-transition: background-color 500ms linear;\n        -ms-transition: background-color 500ms linear;\n        transition: background-color 500ms linear;\n    }\n\n    .offset > label,\n    .offset > input {\n        display: inline;\n    }\n\n    #animateLabel {\n        display: inline-block;\n        min-width: 20px;\n    }\n</style>\n\n<div id=\"map\"></div>\n<div class=\"map-overlay top\">\n    <div class=\"map-overlay-inner\">\n        <fieldset>\n            <label>Select easing function</label>\n            <select id=\"easing\" name=\"easing\">\n                <option value=\"easeInCubic\">Ease In Cubic</option>\n                <option value=\"easeOutQuint\">Ease Out Quint</option>\n                <option value=\"easeInOutCirc\">Ease In/Out Circ</option>\n                <option value=\"easeOutBounce\">Ease Out Bounce</option>\n            </select>\n        </fieldset>\n        <fieldset>\n            <label for=\"duration\">Set animation duration</label>\n            <p id=\"durationValue\"></p>\n            <input\n                type=\"range\"\n                id=\"duration\"\n                name=\"duration\"\n                min=\"0\"\n                max=\"10000\"\n                step=\"500\"\n                value=\"1000\"\n            />\n        </fieldset>\n        <fieldset>\n            <label>Animate camera motion</label>\n            <label for=\"animate\" id=\"animateLabel\">Yes</label>\n            <input type=\"checkbox\" id=\"animate\" name=\"animate\" checked />\n        </fieldset>\n        <fieldset class=\"offset\">\n            <label for=\"offset-x\">Offset-X</label>\n            <input\n                type=\"number\"\n                id=\"offset-x\"\n                name=\"offset-x\"\n                min=\"-200\"\n                max=\"200\"\n                step=\"50\"\n                value=\"0\"\n            />\n        </fieldset>\n        <fieldset class=\"offset\">\n            <label for=\"offset-y\">Offset-Y</label>\n            <input\n                type=\"number\"\n                id=\"offset-y\"\n                name=\"offset-y\"\n                min=\"-200\"\n                max=\"200\"\n                step=\"50\"\n                value=\"0\"\n            />\n            <p>Offsets can be negative</p>\n        </fieldset>\n        <button type=\"button\" id=\"animateButton\" name=\"test-animation\">\n            Test Animation\n        </button>\n    </div>\n</div>\n\n<script>\n    // declare various easing functions.\n    // easing functions mathematically describe\n    // how fast a value changes during an animation.\n    // each function takes a parameter t that represents\n    // the progress of the animation.\n    // t is in a range of 0 to 1 where 0 is the initial\n    // state and 1 is the completed state.\n    var easingFunctions = {\n        // start slow and gradually increase speed\n        easeInCubic: function (t) {\n            return t * t * t;\n        },\n        // start fast with a long, slow wind-down\n        easeOutQuint: function (t) {\n            return 1 - Math.pow(1 - t, 5);\n        },\n        // slow start and finish with fast middle\n        easeInOutCirc: function (t) {\n            return t < 0.5\n                ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2\n                : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;\n        },\n        // fast start with a \"bounce\" at the end\n        easeOutBounce: function (t) {\n            var n1 = 7.5625;\n            var d1 = 2.75;\n\n            if (t < 1 / d1) {\n                return n1 * t * t;\n            } else if (t < 2 / d1) {\n                return n1 * (t -= 1.5 / d1) * t + 0.75;\n            } else if (t < 2.5 / d1) {\n                return n1 * (t -= 2.25 / d1) * t + 0.9375;\n            } else {\n                return n1 * (t -= 2.625 / d1) * t + 0.984375;\n            }\n        }\n    };\n\n    // set up some helpful UX on the form\n    var durationValueSpan = document.getElementById('durationValue');\n    var durationInput = document.getElementById('duration');\n    durationValueSpan.innerHTML = durationInput.value / 1000 + ' seconds';\n    durationInput.addEventListener('change', function (e) {\n        durationValueSpan.innerHTML = e.target.value / 1000 + ' seconds';\n    });\n\n    var animateLabel = document.getElementById('animateLabel');\n    var animateValue = document.getElementById('animate');\n    animateValue.addEventListener('change', function (e) {\n        animateLabel.innerHTML = e.target.checked ? 'Yes' : 'No';\n    });\n\n    var map = new maplibregl.Map({\n        container: 'map',\n        style:\n            'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',\n        center: [-95, 40],\n        zoom: 3\n    });\n\n    map.on('load', function () {\n        // add a layer to display the map's center point\n        map.addSource('center', {\n            'type': 'geojson',\n            'data': {\n                'type': 'Point',\n                'coordinates': [-94, 40]\n            }\n        });\n        map.addLayer({\n            'id': 'center',\n            'type': 'symbol',\n            'source': 'center',\n            'layout': {\n                'icon-image': 'marker-15',\n                'text-field': 'Center: [-94, 40]',\n                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],\n                'text-offset': [0, 0.6],\n                'text-anchor': 'top'\n            }\n        });\n\n        var animateButton = document.getElementById('animateButton');\n        animateButton.addEventListener('click', function () {\n            var easingInput = document.getElementById('easing');\n            var easingFn =\n                easingFunctions[\n                    easingInput.options[easingInput.selectedIndex].value\n                ];\n            var duration = parseInt(durationInput.value, 10);\n            var animate = animateValue.checked;\n            var offsetX = parseInt(\n                document.getElementById('offset-x').value,\n                10\n            );\n            var offsetY = parseInt(\n                document.getElementById('offset-y').value,\n                10\n            );\n\n            var animationOptions = {\n                duration: duration,\n                easing: easingFn,\n                offset: [offsetX, offsetY],\n                animate: animate,\n                essential: true // animation will happen even if user has `prefers-reduced-motion` setting on\n            };\n\n            // Create a random location to fly to by offsetting the map's\n            // initial center point by up to 10 degrees.\n            var center = [\n                -95 + (Math.random() - 0.5) * 20,\n                40 + (Math.random() - 0.5) * 20\n            ];\n\n            // merge animationOptions with other flyTo options\n            animationOptions.center = center;\n\n            map.flyTo(animationOptions);\n            // update 'center' source and layer to show our new map center\n            // compare this center point to where the camera ends up when an offset is applied\n            map.getSource('center').setData({\n                'type': 'Point',\n                'coordinates': center\n            });\n            map.setLayoutProperty(\n                'center',\n                'text-field',\n                'Center: [' +\n                    center[0].toFixed(1) +\n                    ', ' +\n                    center[1].toFixed(1) +\n                    ']'\n            );\n        });\n    });\n<\/script>\n"},M4Oy:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=((r=n("fG8n"))&&r.__esModule?r:{default:r}).default;t.default=a},mOgX:function(e,t,n){"use strict";n.r(t);var r=n("f4rJ");n("yr+R");function a(e,t){return t&&t.local,"https://unpkg.com/maplibre-gl@".concat(r.a,"/dist/maplibre-gl.").concat(e)}t.default={js:function(e){return a("js",e)},css:function(e){return a("css",e)}}},qZvk:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("q1tI")),o=(n("yr+R"),n("cQZ0"),c(n("uLm5"))),i=c(n("162u")),s=c(n("1wO5"));function c(e){return e&&e.__esModule?e:{default:e}}function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=y(e);if(t){var a=y(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return m(this,n)}}function m(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var b={title:"Customize camera animations",description:"Customize camera animations using AnimationOptions.",topics:["User interaction","Camera"],thumbnail:"camera-animation",contentType:"example",layout:"example",hideFeedback:!0,language:["JavaScript"],products:["Mapbox GL JS"],headings:[]},h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(m,e);var t,n,r,c=d(m);function m(){return l(this,m),c.apply(this,arguments)}return t=m,(n=[{key:"render",value:function(){var e=this.props;return a.default.createElement(s.default,u({},e,{frontMatter:b}),a.default.createElement("div",null,a.default.createElement("p",null,"Customize camera animations using ",a.default.createElement("a",{href:"https://maplibre.org/maplibre-gl-js-docs/api/properties/#animationoptions"},a.default.createElement("code",null,"AnimationOptions")),"."),a.default.createElement(o.default,u({html:i.default},this.props))))}}])&&p(t.prototype,n),r&&p(t,r),m}(a.default.PureComponent);t.default=h},uLm5:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return E}));var r=n("q1tI"),a=n.n(r),o=(n("17x9"),n("mOgX")),i=n("v8ZZ"),s=n.n(i),c=n("irdr"),u=n.n(c),l=n("M4Oy"),p=n.n(l),f=n("umIL"),d=n("wdKx");function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){x(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=O(e);if(t){var a=O(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return w(this,n)}}function w(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var j='<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />',S="\tbody { margin: 0; padding: 0; }\n\t#map { position: absolute; top: 0; bottom: 0; width: 100%; }",E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(c,e);var t,n,r,i=v(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e)).state={unsupported:!1},t}return t=c,(n=[{key:"displayHTML",value:function(e){return'<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8" />\n<title>'.concat(this.props.frontMatter.title,"</title>\n").concat(j,'\n<script src="').concat(o.default.js(),'"><\/script>\n<link href="').concat(o.default.css(),'" rel="stylesheet" />\n<style>\n').concat(S,"\n</style>\n</head>\n<body>\n").concat(e,"\n</body>\n</html>")}},{key:"renderHTML",value:function(e){return"<!DOCTYPE html>\n<html>\n<head>\n<meta charset=utf-8 />\n<title>".concat(this.props.frontMatter.title,"</title>\n").concat(j,"\n<script src='https://js.sentry-cdn.com/b4e18cb1943f46289f67ca6a771bd341.min.js' crossorigin=\"anonymous\"><\/script>\n<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-instrumentile/v3.0.0/mapbox-gl-instrumentile.js' crossorigin=\"anonymous\"><\/script>\n\n<script src='").concat(o.default.js({local:!0}),"'><\/script>\n<link href='").concat(o.default.css({local:!0}),"' rel='stylesheet' />\n<style>\n    ").concat(S,"\n</style>\n</head>\n<body>\n").concat(e,"\n</body>\n<script>\nif (window.map instanceof mapboxgl.Map) {\n    var i = new instrumentile(map, {\n        token: '").concat(MapboxPageShell.getMapboxAccessToken(),"',\n        api: 'https://api.tiles.mapbox.com',\n        source: 'docs-examples'\n    });\n}\n<\/script>\n</html>")}},{key:"renderSnippet",value:function(){var e=this.props,t=e.html,n=e.location,r=this.displayHTML(t),o=d.extractor(r);return a.a.createElement("div",{className:"bg-white"},a.a.createElement("div",{id:"code",className:"relative"},a.a.createElement(u.a,{code:this.displayHTML(t),highlighter:function(){return f.highlightHtml},edit:{frontMatter:b(b({},this.props.frontMatter),{},{pathname:n.pathname}),head:j,js:o.js,html:o.html,css:o.css,resources:o.resources}})))}},{key:"render",value:function(){var e=this,t=this.props,n=t.frontMatter,r=t.height;return a.a.createElement("div",{className:"prose"},this.state.unsupported&&a.a.createElement(p.a,{title:"Mapbox GL unsupported",theme:"warning"},"Mapbox GL requires"," ",a.a.createElement("a",{className:"link",href:"https://caniuse.com/#feat=webgl"},"WebGL support"),". Please check that you are using a supported browser and that"," ",a.a.createElement("a",{className:"link",href:"https://get.webgl.org/"},"WebGL is enabled"),"."),s()()&&a.a.createElement("iframe",{id:"demo",style:{height:r},className:"w-full mt18",allowFullScreen:!0,mozallowfullscreen:"true",webkitallowfullscreen:"true",ref:function(t){e.iframe=t},title:"".concat(n.title," example")}),this.props.displaySnippet&&this.renderSnippet())}},{key:"componentDidMount",value:function(){if(s()()||this.setState({unsupported:!0}),this.iframe){var e=this.iframe.contentWindow.document;e.open(),e.write(this.renderHTML(this.props.html)),e.close()}}}])&&h(t.prototype,n),r&&h(t,r),c}(a.a.Component);x(E,"defaultProps",{displaySnippet:!0,height:400})},v8ZZ:function(e,t,n){"use strict";function r(e){return!a(e)}function a(e){return"undefined"==typeof window||"undefined"==typeof document?"not a browser":Array.prototype&&Array.prototype.every&&Array.prototype.filter&&Array.prototype.forEach&&Array.prototype.indexOf&&Array.prototype.lastIndexOf&&Array.prototype.map&&Array.prototype.some&&Array.prototype.reduce&&Array.prototype.reduceRight&&Array.isArray?Function.prototype&&Function.prototype.bind?Object.keys&&Object.create&&Object.getPrototypeOf&&Object.getOwnPropertyNames&&Object.isSealed&&Object.isFrozen&&Object.isExtensible&&Object.getOwnPropertyDescriptor&&Object.defineProperty&&Object.defineProperties&&Object.seal&&Object.freeze&&Object.preventExtensions?"JSON"in window&&"parse"in JSON&&"stringify"in JSON?function(){if(!("Worker"in window&&"Blob"in window&&"URL"in window))return!1;var e,t,n=new Blob([""],{type:"text/javascript"}),r=URL.createObjectURL(n);try{t=new Worker(r),e=!0}catch(t){e=!1}t&&t.terminate();return URL.revokeObjectURL(r),e}()?"Uint8ClampedArray"in window?ArrayBuffer.isView?function(){const e=document.createElement("canvas");e.width=e.height=1;const t=e.getContext("2d");if(!t)return!1;const n=t.getImageData(0,0,1,1);return n&&n.width===e.width}()?function(e){void 0===o[e]&&(o[e]=function(e){const t=function(e){var t=document.createElement("canvas"),n=Object.create(r.webGLContextAttributes);return n.failIfMajorPerformanceCaveat=e,t.probablySupportsContext?t.probablySupportsContext("webgl",n)||t.probablySupportsContext("experimental-webgl",n):t.supportsContext?t.supportsContext("webgl",n)||t.supportsContext("experimental-webgl",n):t.getContext("webgl",n)||t.getContext("experimental-webgl",n)}(e);if(!t)return!1;const n=t.createShader(t.VERTEX_SHADER);if(!n||t.isContextLost())return!1;return t.shaderSource(n,"void main() {}"),t.compileShader(n),!0===t.getShaderParameter(n,t.COMPILE_STATUS)}(e));return o[e]}(e&&e.failIfMajorPerformanceCaveat)?void 0:"insufficient WebGL support":"insufficient Canvas/getImageData support":"insufficient ArrayBuffer support":"insufficient Uint8ClampedArray support":"insufficient worker support":"insufficient JSON support":"insufficient Object support":"insufficient Function support":"insufficent Array support"}e.exports?e.exports=r:window&&(window.mapboxgl=window.mapboxgl||{},window.mapboxgl.supported=r,window.mapboxgl.notSupportedReason=a);var o={};r.webGLContextAttributes={antialias:!1,alpha:!0,stencil:!0,depth:!0}},wF40:function(e,t,n){var r=n("qZvk");r=r.default||r,e.exports={component:r,props:{frontMatter:{title:"Customize camera animations",description:"Customize camera animations using AnimationOptions.",topics:["User interaction","Camera"],thumbnail:"camera-animation",contentType:"example",layout:"example",hideFeedback:!0,language:["JavaScript"],products:["Mapbox GL JS"],prependJs:["import Example from '../../components/example';","import html from './camera-animation.html';"]}}}},wdKx:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.extractor=function(e){var t="",n={js:[],css:[]},r=/src=("|')([^']*?)("|')/g,a=/href=("|')([^']*?)("|')/g,o=/<script>((.|\n)*)<\/script>/,i=/<style\b[^>]*>([\s\S]*?)<\/style>/g,s=/<body[\s\S]*?>((.|\n)*)<\/body>/,c=e.match(i),u="".concat(e.replace(o,"")),l=e.match(o)[1];c&&(c.forEach((function(e){t+=e.replace(/<[^>]*>/g,"")})),u="".concat(u.replace(i,"")));if(e.match(r)){var p=e.match(r).map((function(e){return e.replace("src=","").replace(/["']/g,"")}));n.js=n.js.concat(p),u="".concat(u.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/g,""))}if(e.match(a)){var f=e.match(a).map((function(e){return e.replace("href=","").replace(/["']/g,"")}));n.css=n.css.concat(f),u="".concat(u.replace(/<link[\s\S]*?>/g,""))}u.match(s)&&(u=u.match(s)[1]);return{html:u,css:t,js:l,resources:n}}}}]);
//# sourceMappingURL=maplibre-gl-js-docs-example-camera-animation-d032fc74a83cfe53afee.chunk.js.map