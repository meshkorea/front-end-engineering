(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"0lfv":function(t,e,r){"use strict";r.d(e,"a",(function(){return a})),r.d(e,"b",(function(){return p}));var n=r("rePB");function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var a=function(t){return c(c({},t),{},{author:t.parent.frontmatter.author})};function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var p=function(t){var e=t.nodes,r=t.edges;return e.map((function(t){var e,n=t.id,o=null===(e=r.find((function(t){return t.node.id===n})))||void 0===e?void 0:e.node;return u(u({},t),{},{author:(null==o?void 0:o.parent.frontmatter.author)||""})}))}},"4Gv4":function(t,e,r){"use strict";r.r(e);var n=r("q1tI"),o=r.n(n),c=r("0lfv"),a=r("2A+t"),i=r("izhR"),u=r("A2+M"),p=r("Q3iF"),s=r("GIzu"),f=r("HsYx"),l=["32px","16px","8px","4px"].map((function(t){return"rgba(0, 0, 0, 0.15) 0px "+t+" "+t+" 0px"})),b=function(t){var e,r,n,c=t.post;return Object(a.c)(p.a,null,Object(a.c)(s.a,{title:c.title,description:null!==(e=c.description)&&void 0!==e?e:c.excerpt,image:null!==(r=null===(n=c.banner)||void 0===n?void 0:n.childImageSharp.resize.src)&&void 0!==r?r:void 0,pathname:c.slug,canonicalUrl:c.canonicalUrl}),Object(a.c)(i.d,{as:"h1",variant:"styles.h1"},c.title),Object(a.c)("p",{sx:{color:"secondary",mt:3,a:{color:"secondary"},fontSize:[1,1,2]}},Object(a.c)("time",null,c.date),c.author&&" — ",c.author&&Object(a.c)("span",null,c.author),c.tags&&Object(a.c)(o.a.Fragment,null," — ",Object(a.c)(f.a,{tags:c.tags}))),Object(a.c)("section",{sx:{my:5,".gatsby-resp-image-wrapper":{my:[4,4,5],boxShadow:l.join(", ")},variant:"layout.content"}},Object(a.c)(u.MDXRenderer,null,c.body)))};e.default=function(t){var e=Object.assign({},t),r=Object(c.a)(e.data.post);return o.a.createElement(b,Object.assign({post:r},e))}},"A2+M":function(t,e,r){var n=r("X8hv");t.exports={MDXRenderer:n}},Bnag:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},HsYx:function(t,e,r){"use strict";var n=r("2A+t"),o=r("q1tI"),c=r.n(o),a=r("Wbzz"),i=r("n/Q7"),u=r("dq5L");e.a=function(t){var e=t.tags,r=Object(u.a)(),o=r.tagsPath,p=r.basePath;return Object(n.c)(c.a.Fragment,null,e.map((function(t,e){return Object(n.c)(c.a.Fragment,{key:t.slug},!!e&&" ",Object(n.c)(a.Link,{sx:{opacity:"0.7",textDecoration:"none"},to:Object(i.a)("/"+p+"/"+o+"/"+t.slug)},"#"+t.name))})))}},Ijbi:function(t,e,r){var n=r("WkPL");t.exports=function(t){if(Array.isArray(t))return n(t)}},RIqP:function(t,e,r){var n=r("Ijbi"),o=r("EbDI"),c=r("ZhPi"),a=r("Bnag");t.exports=function(t){return n(t)||o(t)||c(t)||a()}},SksO:function(t,e){function r(e,n){return t.exports=r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(e,n)}t.exports=r},WkPL:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}},X8hv:function(t,e,r){var n=r("sXyB"),o=r("RIqP"),c=r("lSNA"),a=r("8OQS");function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var p=r("q1tI"),s=r("7ljp").mdx,f=r("BfwJ").useMDXScope;t.exports=function(t){var e=t.scope,r=t.children,c=a(t,["scope","children"]),i=f(e),l=p.useMemo((function(){if(!r)return null;var t=u({React:p,mdx:s},i),e=Object.keys(t),c=e.map((function(e){return t[e]}));return n(Function,["_fn"].concat(o(e),[""+r])).apply(void 0,[{}].concat(o(c)))}),[r,e]);return p.createElement(l,u({},c))}},ZhPi:function(t,e,r){var n=r("WkPL");t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}},b48C:function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},sXyB:function(t,e,r){var n=r("SksO"),o=r("b48C");function c(e,r,a){return o()?t.exports=c=Reflect.construct:t.exports=c=function(t,e,r){var o=[null];o.push.apply(o,e);var c=new(Function.bind.apply(t,o));return r&&n(c,r.prototype),c},c.apply(null,arguments)}t.exports=c}}]);
//# sourceMappingURL=component---src-lekoarts-gatsby-theme-minimal-blog-core-templates-post-query-tsx-e1737df1024ee9a5ef05.js.map