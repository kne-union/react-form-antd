(self.webpackChunk_kne_components_react_form_antd=self.webpackChunk_kne_components_react_form_antd||[]).push([[328],{32328:(e,r,t)=>{"use strict";t.r(r),t.d(r,{createWithRemoteLoader:()=>N,default:()=>C,getOrLoadRemote:()=>h,getPublicPath:()=>A,loadComponent:()=>w,loadModule:()=>j,parseToken:()=>g,preset:()=>_,useLoader:()=>O,withRemoteLoader:()=>M});var o=t(45040),n=t.n(o),a=t(64016),u=t.n(a),s=t(6940),l=t.n(s),i=t(90756),c=t(49256),p=t.n(c),f=t(72048),m=t.n(f),d=t(52928),v=t.n(d);const b={remotes:{},remoteEntryFileName:"remoteEntry.js",error:null,fallback:null},_=e=>Object.assign(b,e),g=e=>{const{url:r,remote:t,version:o}=(e=>{const r=(e=>{const r=e.match(/^(.*):.+/);return r&&r[1]?n()(r[1]):null})(e);if(!r)return{url:null,remote:null,version:null};const{addressList:t,origin:o}=(()=>{if(/^https?:\/\//.test(r)){const e=window.document.createElement("a");return e.href=r,{addressList:e.pathname.split("/").filter((e=>!!e)),origin:e.origin}}return{addressList:r.split("/").filter((e=>!!e)),origin:null}})();return 1===t.length?{url:/^https?:\/\//.test(r)?o:null,remote:t[0],version:null}:2===t.length&&/^https?:\/\//.test(r)?{url:o,remote:t[0],version:t[1]}:{url:/^https?:\/\//.test(r)?o:null,remote:t[t.length-2],version:t[t.length-1]}})(e),a=(e=>{const r=e.replace(/^.*:/,""),[t,o]=r.split("@").map((e=>{const[r,t]=e.split(".");return{name:r,propName:t}})),n={moduleName:t.name,modulePropName:t.propName};return o&&Object.assign(n,{subModuleName:o.name,subModulePropName:o.propName}),n})(e);return{url:r,remote:t,version:o,module:a}},h=function(e,r){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return new Promise(((n,a)=>{if(window[e])n();else{const l=document.querySelector('[data-webpack="'.concat(e,'"]')),i=async o=>{o.setAttribute("data-status","success"),window[e].__initialized||(r&&t.S[r]&&await window[e].init(t.S[r]),window[e].__initialized=!0),n()},c=(e,r)=>{r.parentNode.removeChild(r),a(e.message)};if(l){if("success"===l.getAttribute("data-status"))return void i(l);l.addEventListener("load",(()=>{i(l)})),l.addEventListener("error",(e=>{c(e,l)}))}else if(o){var u=document,s=u.createElement("script");s.type="text/javascript",s.setAttribute("data-webpack","".concat(e)),s.async=!0,s.addEventListener("error",(e=>{c(e,s)})),s.addEventListener("load",(()=>{i(s)})),s.src=o,u.getElementsByTagName("head")[0].appendChild(s)}else a("Cannot Find Remote ".concat(e," to inject"))}}))},w=(e,r,t,o)=>async()=>{await h(e,r,o);const n=window[e];return(await n.get(t))()},y=e=>{let{url:r,remote:t,version:o,tpl:a}=e;const s=u()(a||"{{url}}/{{remote}}/{{version}}",{interpolate:/{{([\s\S]+?)}}/g});return n()(s({url:n()(r||""),remote:t||"",version:o||""}))},j=e=>{const r=b.remotes,t=b.remoteEntryFileName,o=g(e),{url:a,remote:u}=((e,r)=>{const t=e=>y(Object.assign({},e,{tpl:l()(r,"[".concat(e.remote||"default","].tpl"))}));return e.url&&e.remote&&e.version?{url:t({url:e.url,remote:e.remote,version:e.version}),remote:e.remote+"_"+e.version}:e.url&&e.remote?{url:t({url:e.url,remote:e.remote}),remote:e.remote}:e.remote&&r[e.remote]&&e.version?{url:t({url:r[e.remote].url,remote:r[e.remote].remote,version:e.version}),remote:r[e.remote].remote+"_"+e.version}:e.remote&&r[e.remote]&&r[e.remote].defaultVersion?{url:t({url:r[e.remote].url,remote:r[e.remote].remote,version:r[e.remote].defaultVersion}),remote:r[e.remote].remote+"_"+r[e.remote].defaultVersion}:e.remote&&r[e.remote]?{url:t({url:r[e.remote].url,remote:r[e.remote].remote}),remote:r[e.remote].remote}:r.default.defaultVersion?{url:t({url:r.default.url,remote:r.default.remote,version:r.default.defaultVersion}),remote:r.default.remote+"_"+r.default.defaultVersion}:{url:t({url:r.default.url,remote:r.default.remote}),remote:r.default.remote}})(o,r);return w((e=>e.replace(/[-/.@]/g,"_"))(u),"default","./"+o.module.moduleName,n()(a)+"/"+t)().then((e=>{const r=((e,r)=>e.subModuleName&&e.subModulePropName?r[e.subModuleName][e.subModulePropName]:e.subModuleName?r[e.subModuleName]:!e.subModuleName&&e.modulePropName?r.default[e.modulePropName]:r.default)(o.module,e);return{default:r}}))},x=new Map,O=e=>{let{modules:r,onLoadComplete:t}=e;const[o,n]=(0,c.useState)(!r.every((e=>x.has(e)))),[a,u]=(0,c.useState)(!1),s=(0,i.c)(t),[l,p]=(0,c.useState)((()=>o?[]:r.map((e=>x.get(e))))),f=(0,c.useRef)(l);return f.current=l,(0,c.useEffect)((()=>{Promise.all(r.map((async e=>{if(x.has(e))return x.get(e);const{default:r}=await j(e);return x.set(e,r),r}))).then((e=>(s&&s(e),m()(f.current,e)||p(e),n(!1),e)),(e=>{console.error(e),u(!0)}))}),[r]),{loading:o,error:a,remoteModules:l}};function E(){return E=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},E.apply(this,arguments)}function k(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}const L=["modules","remoteError","onLoadComplete","fallback"],M=e=>(0,c.forwardRef)(((r,t)=>{let{modules:o,remoteError:n,onLoadComplete:a,fallback:u}=r,s=k(r,L);const{loading:l,error:i,remoteModules:c}=O({modules:o,onLoadComplete:a});return l?u||b.fallback:i?n||b.error:p().createElement(e,E({},s,{ref:t,remoteModules:c}))})),N=e=>r=>{const t=M(r);return(0,c.forwardRef)(((r,o)=>p().createElement(t,E({},v()({},e,r),{ref:o}))))},P=["remoteModules"],S=["module"],R=M((0,c.forwardRef)(((e,r)=>{let{remoteModules:t}=e,o=k(e,P);const[n]=t;return p().createElement(n,E({},o,{ref:r}))}))),C=(0,c.forwardRef)(((e,r)=>{let{module:t}=e,o=k(e,S);const n=(0,c.useMemo)((()=>[t]),[t]);return p().createElement(R,E({},o,{modules:n,ref:r}))})),A=(e,r)=>{const{remotes:t,version:o}=Object.assign({},{remotes:b.remotes},r),n=e&&t[e]||t.default,a=o||n.defaultVersion;return y({url:n.url,remote:n.remote,version:a,tpl:n.tpl})}},90756:(e,r,t)=>{"use strict";t.d(r,{c:()=>n});var o=t(49256);const n=function(e){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const t=(0,o.useRef)(e);return r||(t.current=e),(0,o.useCallback)((function(){return t.current&&t.current(...arguments)}),[])}},66220:(e,r,t)=>{var o=t(31640)(t(74480),"DataView");e.exports=o},39836:(e,r,t)=>{var o=t(31640)(t(74480),"Promise");e.exports=o},64520:(e,r,t)=>{var o=t(31640)(t(74480),"Set");e.exports=o},11268:(e,r,t)=>{var o=t(17720),n=t(86792),a=t(55080);function u(e){var r=-1,t=null==e?0:e.length;for(this.__data__=new o;++r<t;)this.add(e[r])}u.prototype.add=u.prototype.push=n,u.prototype.has=a,e.exports=u},74156:(e,r,t)=>{var o=t(31640)(t(74480),"WeakMap");e.exports=o},92500:e=>{e.exports=function(e,r){for(var t=-1,o=null==e?0:e.length,n=0,a=[];++t<o;){var u=e[t];r(u,t,e)&&(a[n++]=u)}return a}},20228:e=>{e.exports=function(e,r){for(var t=-1,o=null==e?0:e.length;++t<o;)if(r(e[t],t,e))return!0;return!1}},51184:(e,r,t)=>{var o=t(63728),n=t(13804);e.exports=function(e,r,t){var a=r(e);return n(e)?a:o(a,t(e))}},18480:(e,r,t)=>{var o=t(93336),n=t(74552);e.exports=function e(r,t,a,u,s){return r===t||(null==r||null==t||!n(r)&&!n(t)?r!==r&&t!==t:o(r,t,a,u,e,s))}},93336:(e,r,t)=>{var o=t(56716),n=t(9720),a=t(28788),u=t(39500),s=t(8548),l=t(13804),i=t(73476),c=t(80680),p="[object Arguments]",f="[object Array]",m="[object Object]",d=Object.prototype.hasOwnProperty;e.exports=function(e,r,t,v,b,_){var g=l(e),h=l(r),w=g?f:s(e),y=h?f:s(r),j=(w=w==p?m:w)==m,x=(y=y==p?m:y)==m,O=w==y;if(O&&i(e)){if(!i(r))return!1;g=!0,j=!1}if(O&&!j)return _||(_=new o),g||c(e)?n(e,r,t,v,b,_):a(e,r,w,t,v,b,_);if(!(1&t)){var E=j&&d.call(e,"__wrapped__"),k=x&&d.call(r,"__wrapped__");if(E||k){var L=E?e.value():e,M=k?r.value():r;return _||(_=new o),b(L,M,t,v,_)}}return!!O&&(_||(_=new o),u(e,r,t,v,b,_))}},28304:(e,r,t)=>{var o=t(77652),n=t(23464),a=Object.prototype.hasOwnProperty;e.exports=function(e){if(!o(e))return n(e);var r=[];for(var t in Object(e))a.call(e,t)&&"constructor"!=t&&r.push(t);return r}},87072:e=>{e.exports=function(e){return function(r){return null==e?void 0:e[r]}}},91460:(e,r,t)=>{var o=t(14248);e.exports=function(e,r){return o(r,(function(r){return e[r]}))}},25652:e=>{e.exports=function(e,r){return e.has(r)}},18395:(e,r,t)=>{var o=t(75240),n=Object.prototype,a=n.hasOwnProperty;e.exports=function(e,r,t,u){return void 0===e||o(e,n[t])&&!a.call(u,t)?r:e}},9720:(e,r,t)=>{var o=t(11268),n=t(20228),a=t(25652);e.exports=function(e,r,t,u,s,l){var i=1&t,c=e.length,p=r.length;if(c!=p&&!(i&&p>c))return!1;var f=l.get(e),m=l.get(r);if(f&&m)return f==r&&m==e;var d=-1,v=!0,b=2&t?new o:void 0;for(l.set(e,r),l.set(r,e);++d<c;){var _=e[d],g=r[d];if(u)var h=i?u(g,_,d,r,e,l):u(_,g,d,e,r,l);if(void 0!==h){if(h)continue;v=!1;break}if(b){if(!n(r,(function(e,r){if(!a(b,r)&&(_===e||s(_,e,t,u,l)))return b.push(r)}))){v=!1;break}}else if(_!==g&&!s(_,g,t,u,l)){v=!1;break}}return l.delete(e),l.delete(r),v}},28788:(e,r,t)=>{var o=t(15816),n=t(23276),a=t(75240),u=t(9720),s=t(89916),l=t(34979),i=o?o.prototype:void 0,c=i?i.valueOf:void 0;e.exports=function(e,r,t,o,i,p,f){switch(t){case"[object DataView]":if(e.byteLength!=r.byteLength||e.byteOffset!=r.byteOffset)return!1;e=e.buffer,r=r.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=r.byteLength||!p(new n(e),new n(r)));case"[object Boolean]":case"[object Date]":case"[object Number]":return a(+e,+r);case"[object Error]":return e.name==r.name&&e.message==r.message;case"[object RegExp]":case"[object String]":return e==r+"";case"[object Map]":var m=s;case"[object Set]":var d=1&o;if(m||(m=l),e.size!=r.size&&!d)return!1;var v=f.get(e);if(v)return v==r;o|=2,f.set(e,r);var b=u(m(e),m(r),o,i,p,f);return f.delete(e),b;case"[object Symbol]":if(c)return c.call(e)==c.call(r)}return!1}},39500:(e,r,t)=>{var o=t(4708),n=Object.prototype.hasOwnProperty;e.exports=function(e,r,t,a,u,s){var l=1&t,i=o(e),c=i.length;if(c!=o(r).length&&!l)return!1;for(var p=c;p--;){var f=i[p];if(!(l?f in r:n.call(r,f)))return!1}var m=s.get(e),d=s.get(r);if(m&&d)return m==r&&d==e;var v=!0;s.set(e,r),s.set(r,e);for(var b=l;++p<c;){var _=e[f=i[p]],g=r[f];if(a)var h=l?a(g,_,f,r,e,s):a(_,g,f,e,r,s);if(!(void 0===h?_===g||u(_,g,t,a,s):h)){v=!1;break}b||(b="constructor"==f)}if(v&&!b){var w=e.constructor,y=r.constructor;w==y||!("constructor"in e)||!("constructor"in r)||"function"==typeof w&&w instanceof w&&"function"==typeof y&&y instanceof y||(v=!1)}return s.delete(e),s.delete(r),v}},56008:(e,r,t)=>{var o=t(87072)({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"});e.exports=o},93532:e=>{var r={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"};e.exports=function(e){return"\\"+r[e]}},4708:(e,r,t)=>{var o=t(51184),n=t(98604),a=t(62523);e.exports=function(e){return o(e,a,n)}},98604:(e,r,t)=>{var o=t(92500),n=t(10436),a=Object.prototype.propertyIsEnumerable,u=Object.getOwnPropertySymbols,s=u?function(e){return null==e?[]:(e=Object(e),o(u(e),(function(r){return a.call(e,r)})))}:n;e.exports=s},8548:(e,r,t)=>{var o=t(66220),n=t(37304),a=t(39836),u=t(64520),s=t(74156),l=t(33343),i=t(56264),c="[object Map]",p="[object Promise]",f="[object Set]",m="[object WeakMap]",d="[object DataView]",v=i(o),b=i(n),_=i(a),g=i(u),h=i(s),w=l;(o&&w(new o(new ArrayBuffer(1)))!=d||n&&w(new n)!=c||a&&w(a.resolve())!=p||u&&w(new u)!=f||s&&w(new s)!=m)&&(w=function(e){var r=l(e),t="[object Object]"==r?e.constructor:void 0,o=t?i(t):"";if(o)switch(o){case v:return d;case b:return c;case _:return p;case g:return f;case h:return m}return r}),e.exports=w},89916:e=>{e.exports=function(e){var r=-1,t=Array(e.size);return e.forEach((function(e,o){t[++r]=[o,e]})),t}},23464:(e,r,t)=>{var o=t(93456)(Object.keys,Object);e.exports=o},24172:e=>{e.exports=/<%-([\s\S]+?)%>/g},51636:e=>{e.exports=/<%([\s\S]+?)%>/g},74248:e=>{e.exports=/<%=([\s\S]+?)%>/g},86792:e=>{e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},55080:e=>{e.exports=function(e){return this.__data__.has(e)}},34979:e=>{e.exports=function(e){var r=-1,t=Array(e.size);return e.forEach((function(e){t[++r]=e})),t}},56324:(e,r,t)=>{var o=t(10680),n=t(42136),a=t(79720),u=n((function(e,r,t,n){o(r,a(r),e,n)}));e.exports=u},54625:(e,r,t)=>{var o=t(62768),n=t(65288),a=t(90240),u=n((function(e,r){try{return o(e,void 0,r)}catch(t){return a(t)?t:new Error(t)}}));e.exports=u},45080:(e,r,t)=>{var o=t(56008),n=t(26992),a=/[&<>"']/g,u=RegExp(a.source);e.exports=function(e){return(e=n(e))&&u.test(e)?e.replace(a,o):e}},72048:(e,r,t)=>{var o=t(18480);e.exports=function(e,r){return o(e,r)}},90240:(e,r,t)=>{var o=t(33343),n=t(74552),a=t(39840);e.exports=function(e){if(!n(e))return!1;var r=o(e);return"[object Error]"==r||"[object DOMException]"==r||"string"==typeof e.message&&"string"==typeof e.name&&!a(e)}},62523:(e,r,t)=>{var o=t(99032),n=t(28304),a=t(36492);e.exports=function(e){return a(e)?o(e):n(e)}},10436:e=>{e.exports=function(){return[]}},64016:(e,r,t)=>{var o=t(56324),n=t(54625),a=t(91460),u=t(18395),s=t(93532),l=t(90240),i=t(55752),c=t(62523),p=t(74248),f=t(95208),m=t(26992),d=/\b__p \+= '';/g,v=/\b(__p \+=) '' \+/g,b=/(__e\(.*?\)|\b__t\)) \+\n'';/g,_=/[()=,{}\[\]\/\s]/,g=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,h=/($^)/,w=/['\n\r\u2028\u2029\\]/g,y=Object.prototype.hasOwnProperty;e.exports=function(e,r,t){var j=f.imports._.templateSettings||f;t&&i(e,r,t)&&(r=void 0),e=m(e),r=o({},r,j,u);var x,O,E=o({},r.imports,j.imports,u),k=c(E),L=a(E,k),M=0,N=r.interpolate||h,P="__p += '",S=RegExp((r.escape||h).source+"|"+N.source+"|"+(N===p?g:h).source+"|"+(r.evaluate||h).source+"|$","g"),R=y.call(r,"sourceURL")?"//# sourceURL="+(r.sourceURL+"").replace(/\s/g," ")+"\n":"";e.replace(S,(function(r,t,o,n,a,u){return o||(o=n),P+=e.slice(M,u).replace(w,s),t&&(x=!0,P+="' +\n__e("+t+") +\n'"),a&&(O=!0,P+="';\n"+a+";\n__p += '"),o&&(P+="' +\n((__t = ("+o+")) == null ? '' : __t) +\n'"),M=u+r.length,r})),P+="';\n";var C=y.call(r,"variable")&&r.variable;if(C){if(_.test(C))throw new Error("Invalid `variable` option passed into `_.template`")}else P="with (obj) {\n"+P+"\n}\n";P=(O?P.replace(d,""):P).replace(v,"$1").replace(b,"$1;"),P="function("+(C||"obj")+") {\n"+(C?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(x?", __e = _.escape":"")+(O?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+P+"return __p\n}";var A=n((function(){return Function(k,R+"return "+P).apply(void 0,L)}));if(A.source=P,l(A))throw A;return A}},95208:(e,r,t)=>{var o=t(45080),n={escape:t(24172),evaluate:t(51636),interpolate:t(74248),variable:"",imports:{_:{escape:o}}};e.exports=n}}]);
//# sourceMappingURL=328.04b3504d.chunk.js.map