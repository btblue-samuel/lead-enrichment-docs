function Kd(s,r){for(var t=0;t<r.length;t++){const o=r[t];if(typeof o!="string"&&!Array.isArray(o)){for(const i in o)if(i!=="default"&&!(i in s)){const n=Object.getOwnPropertyDescriptor(o,i);n&&Object.defineProperty(s,i,n.get?n:{enumerable:!0,get:()=>o[i]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();function Zd(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Ea={exports:{}},jo={},ba={exports:{}},z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ot=Symbol.for("react.element"),Yd=Symbol.for("react.portal"),eh=Symbol.for("react.fragment"),sh=Symbol.for("react.strict_mode"),rh=Symbol.for("react.profiler"),th=Symbol.for("react.provider"),oh=Symbol.for("react.context"),ih=Symbol.for("react.forward_ref"),nh=Symbol.for("react.suspense"),lh=Symbol.for("react.memo"),ah=Symbol.for("react.lazy"),ll=Symbol.iterator;function ch(s){return s===null||typeof s!="object"?null:(s=ll&&s[ll]||s["@@iterator"],typeof s=="function"?s:null)}var Pa={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ka=Object.assign,Sa={};function xr(s,r,t){this.props=s,this.context=r,this.refs=Sa,this.updater=t||Pa}xr.prototype.isReactComponent={};xr.prototype.setState=function(s,r){if(typeof s!="object"&&typeof s!="function"&&s!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,s,r,"setState")};xr.prototype.forceUpdate=function(s){this.updater.enqueueForceUpdate(this,s,"forceUpdate")};function wa(){}wa.prototype=xr.prototype;function hn(s,r,t){this.props=s,this.context=r,this.refs=Sa,this.updater=t||Pa}var un=hn.prototype=new wa;un.constructor=hn;ka(un,xr.prototype);un.isPureReactComponent=!0;var al=Array.isArray,Aa=Object.prototype.hasOwnProperty,xn={current:null},Da={key:!0,ref:!0,__self:!0,__source:!0};function Ta(s,r,t){var o,i={},n=null,l=null;if(r!=null)for(o in r.ref!==void 0&&(l=r.ref),r.key!==void 0&&(n=""+r.key),r)Aa.call(r,o)&&!Da.hasOwnProperty(o)&&(i[o]=r[o]);var c=arguments.length-2;if(c===1)i.children=t;else if(1<c){for(var d=Array(c),h=0;h<c;h++)d[h]=arguments[h+2];i.children=d}if(s&&s.defaultProps)for(o in c=s.defaultProps,c)i[o]===void 0&&(i[o]=c[o]);return{$$typeof:ot,type:s,key:n,ref:l,props:i,_owner:xn.current}}function dh(s,r){return{$$typeof:ot,type:s.type,key:r,ref:s.ref,props:s.props,_owner:s._owner}}function mn(s){return typeof s=="object"&&s!==null&&s.$$typeof===ot}function hh(s){var r={"=":"=0",":":"=2"};return"$"+s.replace(/[=:]/g,function(t){return r[t]})}var cl=/\/+/g;function Fo(s,r){return typeof s=="object"&&s!==null&&s.key!=null?hh(""+s.key):r.toString(36)}function wt(s,r,t,o,i){var n=typeof s;(n==="undefined"||n==="boolean")&&(s=null);var l=!1;if(s===null)l=!0;else switch(n){case"string":case"number":l=!0;break;case"object":switch(s.$$typeof){case ot:case Yd:l=!0}}if(l)return l=s,i=i(l),s=o===""?"."+Fo(l,0):o,al(i)?(t="",s!=null&&(t=s.replace(cl,"$&/")+"/"),wt(i,r,t,"",function(h){return h})):i!=null&&(mn(i)&&(i=dh(i,t+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(cl,"$&/")+"/")+s)),r.push(i)),1;if(l=0,o=o===""?".":o+":",al(s))for(var c=0;c<s.length;c++){n=s[c];var d=o+Fo(n,c);l+=wt(n,r,t,d,i)}else if(d=ch(s),typeof d=="function")for(s=d.call(s),c=0;!(n=s.next()).done;)n=n.value,d=o+Fo(n,c++),l+=wt(n,r,t,d,i);else if(n==="object")throw r=String(s),Error("Objects are not valid as a React child (found: "+(r==="[object Object]"?"object with keys {"+Object.keys(s).join(", ")+"}":r)+"). If you meant to render a collection of children, use an array instead.");return l}function ut(s,r,t){if(s==null)return s;var o=[],i=0;return wt(s,o,"","",function(n){return r.call(t,n,i++)}),o}function uh(s){if(s._status===-1){var r=s._result;r=r(),r.then(function(t){(s._status===0||s._status===-1)&&(s._status=1,s._result=t)},function(t){(s._status===0||s._status===-1)&&(s._status=2,s._result=t)}),s._status===-1&&(s._status=0,s._result=r)}if(s._status===1)return s._result.default;throw s._result}var de={current:null},At={transition:null},xh={ReactCurrentDispatcher:de,ReactCurrentBatchConfig:At,ReactCurrentOwner:xn};function Ra(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:ut,forEach:function(s,r,t){ut(s,function(){r.apply(this,arguments)},t)},count:function(s){var r=0;return ut(s,function(){r++}),r},toArray:function(s){return ut(s,function(r){return r})||[]},only:function(s){if(!mn(s))throw Error("React.Children.only expected to receive a single React element child.");return s}};z.Component=xr;z.Fragment=eh;z.Profiler=rh;z.PureComponent=hn;z.StrictMode=sh;z.Suspense=nh;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xh;z.act=Ra;z.cloneElement=function(s,r,t){if(s==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+s+".");var o=ka({},s.props),i=s.key,n=s.ref,l=s._owner;if(r!=null){if(r.ref!==void 0&&(n=r.ref,l=xn.current),r.key!==void 0&&(i=""+r.key),s.type&&s.type.defaultProps)var c=s.type.defaultProps;for(d in r)Aa.call(r,d)&&!Da.hasOwnProperty(d)&&(o[d]=r[d]===void 0&&c!==void 0?c[d]:r[d])}var d=arguments.length-2;if(d===1)o.children=t;else if(1<d){c=Array(d);for(var h=0;h<d;h++)c[h]=arguments[h+2];o.children=c}return{$$typeof:ot,type:s.type,key:i,ref:n,props:o,_owner:l}};z.createContext=function(s){return s={$$typeof:oh,_currentValue:s,_currentValue2:s,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},s.Provider={$$typeof:th,_context:s},s.Consumer=s};z.createElement=Ta;z.createFactory=function(s){var r=Ta.bind(null,s);return r.type=s,r};z.createRef=function(){return{current:null}};z.forwardRef=function(s){return{$$typeof:ih,render:s}};z.isValidElement=mn;z.lazy=function(s){return{$$typeof:ah,_payload:{_status:-1,_result:s},_init:uh}};z.memo=function(s,r){return{$$typeof:lh,type:s,compare:r===void 0?null:r}};z.startTransition=function(s){var r=At.transition;At.transition={};try{s()}finally{At.transition=r}};z.unstable_act=Ra;z.useCallback=function(s,r){return de.current.useCallback(s,r)};z.useContext=function(s){return de.current.useContext(s)};z.useDebugValue=function(){};z.useDeferredValue=function(s){return de.current.useDeferredValue(s)};z.useEffect=function(s,r){return de.current.useEffect(s,r)};z.useId=function(){return de.current.useId()};z.useImperativeHandle=function(s,r,t){return de.current.useImperativeHandle(s,r,t)};z.useInsertionEffect=function(s,r){return de.current.useInsertionEffect(s,r)};z.useLayoutEffect=function(s,r){return de.current.useLayoutEffect(s,r)};z.useMemo=function(s,r){return de.current.useMemo(s,r)};z.useReducer=function(s,r,t){return de.current.useReducer(s,r,t)};z.useRef=function(s){return de.current.useRef(s)};z.useState=function(s){return de.current.useState(s)};z.useSyncExternalStore=function(s,r,t){return de.current.useSyncExternalStore(s,r,t)};z.useTransition=function(){return de.current.useTransition()};z.version="18.3.1";ba.exports=z;var C=ba.exports;const jn=Zd(C),mh=Kd({__proto__:null,default:jn},[C]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jh=C,ph=Symbol.for("react.element"),fh=Symbol.for("react.fragment"),_h=Object.prototype.hasOwnProperty,gh=jh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,vh={key:!0,ref:!0,__self:!0,__source:!0};function za(s,r,t){var o,i={},n=null,l=null;t!==void 0&&(n=""+t),r.key!==void 0&&(n=""+r.key),r.ref!==void 0&&(l=r.ref);for(o in r)_h.call(r,o)&&!vh.hasOwnProperty(o)&&(i[o]=r[o]);if(s&&s.defaultProps)for(o in r=s.defaultProps,r)i[o]===void 0&&(i[o]=r[o]);return{$$typeof:ph,type:s,key:n,ref:l,props:i,_owner:gh.current}}jo.Fragment=fh;jo.jsx=za;jo.jsxs=za;Ea.exports=jo;var e=Ea.exports,hi={},La={exports:{}},ye={},Oa={exports:{}},Ia={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(s){function r(k,D){var R=k.length;k.push(D);e:for(;0<R;){var $=R-1>>>1,Z=k[$];if(0<i(Z,D))k[$]=D,k[R]=Z,R=$;else break e}}function t(k){return k.length===0?null:k[0]}function o(k){if(k.length===0)return null;var D=k[0],R=k.pop();if(R!==D){k[0]=R;e:for(var $=0,Z=k.length,dt=Z>>>1;$<dt;){var Ns=2*($+1)-1,Io=k[Ns],ys=Ns+1,ht=k[ys];if(0>i(Io,R))ys<Z&&0>i(ht,Io)?(k[$]=ht,k[ys]=R,$=ys):(k[$]=Io,k[Ns]=R,$=Ns);else if(ys<Z&&0>i(ht,R))k[$]=ht,k[ys]=R,$=ys;else break e}}return D}function i(k,D){var R=k.sortIndex-D.sortIndex;return R!==0?R:k.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var n=performance;s.unstable_now=function(){return n.now()}}else{var l=Date,c=l.now();s.unstable_now=function(){return l.now()-c}}var d=[],h=[],p=1,j=null,f=3,v=!1,g=!1,N=!1,E=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(k){for(var D=t(h);D!==null;){if(D.callback===null)o(h);else if(D.startTime<=k)o(h),D.sortIndex=D.expirationTime,r(d,D);else break;D=t(h)}}function _(k){if(N=!1,m(k),!g)if(t(d)!==null)g=!0,Lo(b);else{var D=t(h);D!==null&&Oo(_,D.startTime-k)}}function b(k,D){g=!1,N&&(N=!1,x(A),A=-1),v=!0;var R=f;try{for(m(D),j=t(d);j!==null&&(!(j.expirationTime>D)||k&&!fe());){var $=j.callback;if(typeof $=="function"){j.callback=null,f=j.priorityLevel;var Z=$(j.expirationTime<=D);D=s.unstable_now(),typeof Z=="function"?j.callback=Z:j===t(d)&&o(d),m(D)}else o(d);j=t(d)}if(j!==null)var dt=!0;else{var Ns=t(h);Ns!==null&&Oo(_,Ns.startTime-D),dt=!1}return dt}finally{j=null,f=R,v=!1}}var S=!1,w=null,A=-1,U=5,T=-1;function fe(){return!(s.unstable_now()-T<U)}function pr(){if(w!==null){var k=s.unstable_now();T=k;var D=!0;try{D=w(!0,k)}finally{D?fr():(S=!1,w=null)}}else S=!1}var fr;if(typeof u=="function")fr=function(){u(pr)};else if(typeof MessageChannel<"u"){var nl=new MessageChannel,Xd=nl.port2;nl.port1.onmessage=pr,fr=function(){Xd.postMessage(null)}}else fr=function(){E(pr,0)};function Lo(k){w=k,S||(S=!0,fr())}function Oo(k,D){A=E(function(){k(s.unstable_now())},D)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(k){k.callback=null},s.unstable_continueExecution=function(){g||v||(g=!0,Lo(b))},s.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<k?Math.floor(1e3/k):5},s.unstable_getCurrentPriorityLevel=function(){return f},s.unstable_getFirstCallbackNode=function(){return t(d)},s.unstable_next=function(k){switch(f){case 1:case 2:case 3:var D=3;break;default:D=f}var R=f;f=D;try{return k()}finally{f=R}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(k,D){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var R=f;f=k;try{return D()}finally{f=R}},s.unstable_scheduleCallback=function(k,D,R){var $=s.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?$+R:$):R=$,k){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=R+Z,k={id:p++,callback:D,priorityLevel:k,startTime:R,expirationTime:Z,sortIndex:-1},R>$?(k.sortIndex=R,r(h,k),t(d)===null&&k===t(h)&&(N?(x(A),A=-1):N=!0,Oo(_,R-$))):(k.sortIndex=Z,r(d,k),g||v||(g=!0,Lo(b))),k},s.unstable_shouldYield=fe,s.unstable_wrapCallback=function(k){var D=f;return function(){var R=f;f=D;try{return k.apply(this,arguments)}finally{f=R}}}})(Ia);Oa.exports=Ia;var Nh=Oa.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yh=C,Ne=Nh;function y(s){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+s,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+s+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Fa=new Set,Mr={};function Ls(s,r){ir(s,r),ir(s+"Capture",r)}function ir(s,r){for(Mr[s]=r,s=0;s<r.length;s++)Fa.add(r[s])}var $e=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ui=Object.prototype.hasOwnProperty,Ch=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,dl={},hl={};function Eh(s){return ui.call(hl,s)?!0:ui.call(dl,s)?!1:Ch.test(s)?hl[s]=!0:(dl[s]=!0,!1)}function bh(s,r,t,o){if(t!==null&&t.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return o?!1:t!==null?!t.acceptsBooleans:(s=s.toLowerCase().slice(0,5),s!=="data-"&&s!=="aria-");default:return!1}}function Ph(s,r,t,o){if(r===null||typeof r>"u"||bh(s,r,t,o))return!0;if(o)return!1;if(t!==null)switch(t.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function he(s,r,t,o,i,n,l){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=o,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=s,this.type=r,this.sanitizeURL=n,this.removeEmptyString=l}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(s){te[s]=new he(s,0,!1,s,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(s){var r=s[0];te[r]=new he(r,1,!1,s[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(s){te[s]=new he(s,2,!1,s.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(s){te[s]=new he(s,2,!1,s,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(s){te[s]=new he(s,3,!1,s.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(s){te[s]=new he(s,3,!0,s,null,!1,!1)});["capture","download"].forEach(function(s){te[s]=new he(s,4,!1,s,null,!1,!1)});["cols","rows","size","span"].forEach(function(s){te[s]=new he(s,6,!1,s,null,!1,!1)});["rowSpan","start"].forEach(function(s){te[s]=new he(s,5,!1,s.toLowerCase(),null,!1,!1)});var pn=/[\-:]([a-z])/g;function fn(s){return s[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(s){var r=s.replace(pn,fn);te[r]=new he(r,1,!1,s,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(s){var r=s.replace(pn,fn);te[r]=new he(r,1,!1,s,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(s){var r=s.replace(pn,fn);te[r]=new he(r,1,!1,s,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(s){te[s]=new he(s,1,!1,s.toLowerCase(),null,!1,!1)});te.xlinkHref=new he("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(s){te[s]=new he(s,1,!1,s.toLowerCase(),null,!0,!0)});function _n(s,r,t,o){var i=te.hasOwnProperty(r)?te[r]:null;(i!==null?i.type!==0:o||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(Ph(r,t,i,o)&&(t=null),o||i===null?Eh(r)&&(t===null?s.removeAttribute(r):s.setAttribute(r,""+t)):i.mustUseProperty?s[i.propertyName]=t===null?i.type===3?!1:"":t:(r=i.attributeName,o=i.attributeNamespace,t===null?s.removeAttribute(r):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,o?s.setAttributeNS(o,r,t):s.setAttribute(r,t))))}var Ke=yh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,xt=Symbol.for("react.element"),Us=Symbol.for("react.portal"),qs=Symbol.for("react.fragment"),gn=Symbol.for("react.strict_mode"),xi=Symbol.for("react.profiler"),Ma=Symbol.for("react.provider"),Ba=Symbol.for("react.context"),vn=Symbol.for("react.forward_ref"),mi=Symbol.for("react.suspense"),ji=Symbol.for("react.suspense_list"),Nn=Symbol.for("react.memo"),Ye=Symbol.for("react.lazy"),Ua=Symbol.for("react.offscreen"),ul=Symbol.iterator;function _r(s){return s===null||typeof s!="object"?null:(s=ul&&s[ul]||s["@@iterator"],typeof s=="function"?s:null)}var J=Object.assign,Mo;function Pr(s){if(Mo===void 0)try{throw Error()}catch(t){var r=t.stack.trim().match(/\n( *(at )?)/);Mo=r&&r[1]||""}return`
`+Mo+s}var Bo=!1;function Uo(s,r){if(!s||Bo)return"";Bo=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(h){var o=h}Reflect.construct(s,[],r)}else{try{r.call()}catch(h){o=h}s.call(r.prototype)}else{try{throw Error()}catch(h){o=h}s()}}catch(h){if(h&&o&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),n=o.stack.split(`
`),l=i.length-1,c=n.length-1;1<=l&&0<=c&&i[l]!==n[c];)c--;for(;1<=l&&0<=c;l--,c--)if(i[l]!==n[c]){if(l!==1||c!==1)do if(l--,c--,0>c||i[l]!==n[c]){var d=`
`+i[l].replace(" at new "," at ");return s.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",s.displayName)),d}while(1<=l&&0<=c);break}}}finally{Bo=!1,Error.prepareStackTrace=t}return(s=s?s.displayName||s.name:"")?Pr(s):""}function kh(s){switch(s.tag){case 5:return Pr(s.type);case 16:return Pr("Lazy");case 13:return Pr("Suspense");case 19:return Pr("SuspenseList");case 0:case 2:case 15:return s=Uo(s.type,!1),s;case 11:return s=Uo(s.type.render,!1),s;case 1:return s=Uo(s.type,!0),s;default:return""}}function pi(s){if(s==null)return null;if(typeof s=="function")return s.displayName||s.name||null;if(typeof s=="string")return s;switch(s){case qs:return"Fragment";case Us:return"Portal";case xi:return"Profiler";case gn:return"StrictMode";case mi:return"Suspense";case ji:return"SuspenseList"}if(typeof s=="object")switch(s.$$typeof){case Ba:return(s.displayName||"Context")+".Consumer";case Ma:return(s._context.displayName||"Context")+".Provider";case vn:var r=s.render;return s=s.displayName,s||(s=r.displayName||r.name||"",s=s!==""?"ForwardRef("+s+")":"ForwardRef"),s;case Nn:return r=s.displayName||null,r!==null?r:pi(s.type)||"Memo";case Ye:r=s._payload,s=s._init;try{return pi(s(r))}catch{}}return null}function Sh(s){var r=s.type;switch(s.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return s=r.render,s=s.displayName||s.name||"",r.displayName||(s!==""?"ForwardRef("+s+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return pi(r);case 8:return r===gn?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function js(s){switch(typeof s){case"boolean":case"number":case"string":case"undefined":return s;case"object":return s;default:return""}}function qa(s){var r=s.type;return(s=s.nodeName)&&s.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function wh(s){var r=qa(s)?"checked":"value",t=Object.getOwnPropertyDescriptor(s.constructor.prototype,r),o=""+s[r];if(!s.hasOwnProperty(r)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,n=t.set;return Object.defineProperty(s,r,{configurable:!0,get:function(){return i.call(this)},set:function(l){o=""+l,n.call(this,l)}}),Object.defineProperty(s,r,{enumerable:t.enumerable}),{getValue:function(){return o},setValue:function(l){o=""+l},stopTracking:function(){s._valueTracker=null,delete s[r]}}}}function mt(s){s._valueTracker||(s._valueTracker=wh(s))}function Va(s){if(!s)return!1;var r=s._valueTracker;if(!r)return!0;var t=r.getValue(),o="";return s&&(o=qa(s)?s.checked?"true":"false":s.value),s=o,s!==t?(r.setValue(s),!0):!1}function Ut(s){if(s=s||(typeof document<"u"?document:void 0),typeof s>"u")return null;try{return s.activeElement||s.body}catch{return s.body}}function fi(s,r){var t=r.checked;return J({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??s._wrapperState.initialChecked})}function xl(s,r){var t=r.defaultValue==null?"":r.defaultValue,o=r.checked!=null?r.checked:r.defaultChecked;t=js(r.value!=null?r.value:t),s._wrapperState={initialChecked:o,initialValue:t,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function Ja(s,r){r=r.checked,r!=null&&_n(s,"checked",r,!1)}function _i(s,r){Ja(s,r);var t=js(r.value),o=r.type;if(t!=null)o==="number"?(t===0&&s.value===""||s.value!=t)&&(s.value=""+t):s.value!==""+t&&(s.value=""+t);else if(o==="submit"||o==="reset"){s.removeAttribute("value");return}r.hasOwnProperty("value")?gi(s,r.type,t):r.hasOwnProperty("defaultValue")&&gi(s,r.type,js(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(s.defaultChecked=!!r.defaultChecked)}function ml(s,r,t){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var o=r.type;if(!(o!=="submit"&&o!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+s._wrapperState.initialValue,t||r===s.value||(s.value=r),s.defaultValue=r}t=s.name,t!==""&&(s.name=""),s.defaultChecked=!!s._wrapperState.initialChecked,t!==""&&(s.name=t)}function gi(s,r,t){(r!=="number"||Ut(s.ownerDocument)!==s)&&(t==null?s.defaultValue=""+s._wrapperState.initialValue:s.defaultValue!==""+t&&(s.defaultValue=""+t))}var kr=Array.isArray;function Ys(s,r,t,o){if(s=s.options,r){r={};for(var i=0;i<t.length;i++)r["$"+t[i]]=!0;for(t=0;t<s.length;t++)i=r.hasOwnProperty("$"+s[t].value),s[t].selected!==i&&(s[t].selected=i),i&&o&&(s[t].defaultSelected=!0)}else{for(t=""+js(t),r=null,i=0;i<s.length;i++){if(s[i].value===t){s[i].selected=!0,o&&(s[i].defaultSelected=!0);return}r!==null||s[i].disabled||(r=s[i])}r!==null&&(r.selected=!0)}}function vi(s,r){if(r.dangerouslySetInnerHTML!=null)throw Error(y(91));return J({},r,{value:void 0,defaultValue:void 0,children:""+s._wrapperState.initialValue})}function jl(s,r){var t=r.value;if(t==null){if(t=r.children,r=r.defaultValue,t!=null){if(r!=null)throw Error(y(92));if(kr(t)){if(1<t.length)throw Error(y(93));t=t[0]}r=t}r==null&&(r=""),t=r}s._wrapperState={initialValue:js(t)}}function Ha(s,r){var t=js(r.value),o=js(r.defaultValue);t!=null&&(t=""+t,t!==s.value&&(s.value=t),r.defaultValue==null&&s.defaultValue!==t&&(s.defaultValue=t)),o!=null&&(s.defaultValue=""+o)}function pl(s){var r=s.textContent;r===s._wrapperState.initialValue&&r!==""&&r!==null&&(s.value=r)}function Wa(s){switch(s){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ni(s,r){return s==null||s==="http://www.w3.org/1999/xhtml"?Wa(r):s==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":s}var jt,$a=function(s){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,t,o,i){MSApp.execUnsafeLocalFunction(function(){return s(r,t,o,i)})}:s}(function(s,r){if(s.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in s)s.innerHTML=r;else{for(jt=jt||document.createElement("div"),jt.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=jt.firstChild;s.firstChild;)s.removeChild(s.firstChild);for(;r.firstChild;)s.appendChild(r.firstChild)}});function Br(s,r){if(r){var t=s.firstChild;if(t&&t===s.lastChild&&t.nodeType===3){t.nodeValue=r;return}}s.textContent=r}var Ar={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ah=["Webkit","ms","Moz","O"];Object.keys(Ar).forEach(function(s){Ah.forEach(function(r){r=r+s.charAt(0).toUpperCase()+s.substring(1),Ar[r]=Ar[s]})});function Ga(s,r,t){return r==null||typeof r=="boolean"||r===""?"":t||typeof r!="number"||r===0||Ar.hasOwnProperty(s)&&Ar[s]?(""+r).trim():r+"px"}function Qa(s,r){s=s.style;for(var t in r)if(r.hasOwnProperty(t)){var o=t.indexOf("--")===0,i=Ga(t,r[t],o);t==="float"&&(t="cssFloat"),o?s.setProperty(t,i):s[t]=i}}var Dh=J({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function yi(s,r){if(r){if(Dh[s]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(y(137,s));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(y(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(y(61))}if(r.style!=null&&typeof r.style!="object")throw Error(y(62))}}function Ci(s,r){if(s.indexOf("-")===-1)return typeof r.is=="string";switch(s){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ei=null;function yn(s){return s=s.target||s.srcElement||window,s.correspondingUseElement&&(s=s.correspondingUseElement),s.nodeType===3?s.parentNode:s}var bi=null,er=null,sr=null;function fl(s){if(s=lt(s)){if(typeof bi!="function")throw Error(y(280));var r=s.stateNode;r&&(r=vo(r),bi(s.stateNode,s.type,r))}}function Xa(s){er?sr?sr.push(s):sr=[s]:er=s}function Ka(){if(er){var s=er,r=sr;if(sr=er=null,fl(s),r)for(s=0;s<r.length;s++)fl(r[s])}}function Za(s,r){return s(r)}function Ya(){}var qo=!1;function ec(s,r,t){if(qo)return s(r,t);qo=!0;try{return Za(s,r,t)}finally{qo=!1,(er!==null||sr!==null)&&(Ya(),Ka())}}function Ur(s,r){var t=s.stateNode;if(t===null)return null;var o=vo(t);if(o===null)return null;t=o[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(s=s.type,o=!(s==="button"||s==="input"||s==="select"||s==="textarea")),s=!o;break e;default:s=!1}if(s)return null;if(t&&typeof t!="function")throw Error(y(231,r,typeof t));return t}var Pi=!1;if($e)try{var gr={};Object.defineProperty(gr,"passive",{get:function(){Pi=!0}}),window.addEventListener("test",gr,gr),window.removeEventListener("test",gr,gr)}catch{Pi=!1}function Th(s,r,t,o,i,n,l,c,d){var h=Array.prototype.slice.call(arguments,3);try{r.apply(t,h)}catch(p){this.onError(p)}}var Dr=!1,qt=null,Vt=!1,ki=null,Rh={onError:function(s){Dr=!0,qt=s}};function zh(s,r,t,o,i,n,l,c,d){Dr=!1,qt=null,Th.apply(Rh,arguments)}function Lh(s,r,t,o,i,n,l,c,d){if(zh.apply(this,arguments),Dr){if(Dr){var h=qt;Dr=!1,qt=null}else throw Error(y(198));Vt||(Vt=!0,ki=h)}}function Os(s){var r=s,t=s;if(s.alternate)for(;r.return;)r=r.return;else{s=r;do r=s,r.flags&4098&&(t=r.return),s=r.return;while(s)}return r.tag===3?t:null}function sc(s){if(s.tag===13){var r=s.memoizedState;if(r===null&&(s=s.alternate,s!==null&&(r=s.memoizedState)),r!==null)return r.dehydrated}return null}function _l(s){if(Os(s)!==s)throw Error(y(188))}function Oh(s){var r=s.alternate;if(!r){if(r=Os(s),r===null)throw Error(y(188));return r!==s?null:s}for(var t=s,o=r;;){var i=t.return;if(i===null)break;var n=i.alternate;if(n===null){if(o=i.return,o!==null){t=o;continue}break}if(i.child===n.child){for(n=i.child;n;){if(n===t)return _l(i),s;if(n===o)return _l(i),r;n=n.sibling}throw Error(y(188))}if(t.return!==o.return)t=i,o=n;else{for(var l=!1,c=i.child;c;){if(c===t){l=!0,t=i,o=n;break}if(c===o){l=!0,o=i,t=n;break}c=c.sibling}if(!l){for(c=n.child;c;){if(c===t){l=!0,t=n,o=i;break}if(c===o){l=!0,o=n,t=i;break}c=c.sibling}if(!l)throw Error(y(189))}}if(t.alternate!==o)throw Error(y(190))}if(t.tag!==3)throw Error(y(188));return t.stateNode.current===t?s:r}function rc(s){return s=Oh(s),s!==null?tc(s):null}function tc(s){if(s.tag===5||s.tag===6)return s;for(s=s.child;s!==null;){var r=tc(s);if(r!==null)return r;s=s.sibling}return null}var oc=Ne.unstable_scheduleCallback,gl=Ne.unstable_cancelCallback,Ih=Ne.unstable_shouldYield,Fh=Ne.unstable_requestPaint,G=Ne.unstable_now,Mh=Ne.unstable_getCurrentPriorityLevel,Cn=Ne.unstable_ImmediatePriority,ic=Ne.unstable_UserBlockingPriority,Jt=Ne.unstable_NormalPriority,Bh=Ne.unstable_LowPriority,nc=Ne.unstable_IdlePriority,po=null,Be=null;function Uh(s){if(Be&&typeof Be.onCommitFiberRoot=="function")try{Be.onCommitFiberRoot(po,s,void 0,(s.current.flags&128)===128)}catch{}}var ze=Math.clz32?Math.clz32:Jh,qh=Math.log,Vh=Math.LN2;function Jh(s){return s>>>=0,s===0?32:31-(qh(s)/Vh|0)|0}var pt=64,ft=4194304;function Sr(s){switch(s&-s){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return s&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return s&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return s}}function Ht(s,r){var t=s.pendingLanes;if(t===0)return 0;var o=0,i=s.suspendedLanes,n=s.pingedLanes,l=t&268435455;if(l!==0){var c=l&~i;c!==0?o=Sr(c):(n&=l,n!==0&&(o=Sr(n)))}else l=t&~i,l!==0?o=Sr(l):n!==0&&(o=Sr(n));if(o===0)return 0;if(r!==0&&r!==o&&!(r&i)&&(i=o&-o,n=r&-r,i>=n||i===16&&(n&4194240)!==0))return r;if(o&4&&(o|=t&16),r=s.entangledLanes,r!==0)for(s=s.entanglements,r&=o;0<r;)t=31-ze(r),i=1<<t,o|=s[t],r&=~i;return o}function Hh(s,r){switch(s){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Wh(s,r){for(var t=s.suspendedLanes,o=s.pingedLanes,i=s.expirationTimes,n=s.pendingLanes;0<n;){var l=31-ze(n),c=1<<l,d=i[l];d===-1?(!(c&t)||c&o)&&(i[l]=Hh(c,r)):d<=r&&(s.expiredLanes|=c),n&=~c}}function Si(s){return s=s.pendingLanes&-1073741825,s!==0?s:s&1073741824?1073741824:0}function lc(){var s=pt;return pt<<=1,!(pt&4194240)&&(pt=64),s}function Vo(s){for(var r=[],t=0;31>t;t++)r.push(s);return r}function it(s,r,t){s.pendingLanes|=r,r!==536870912&&(s.suspendedLanes=0,s.pingedLanes=0),s=s.eventTimes,r=31-ze(r),s[r]=t}function $h(s,r){var t=s.pendingLanes&~r;s.pendingLanes=r,s.suspendedLanes=0,s.pingedLanes=0,s.expiredLanes&=r,s.mutableReadLanes&=r,s.entangledLanes&=r,r=s.entanglements;var o=s.eventTimes;for(s=s.expirationTimes;0<t;){var i=31-ze(t),n=1<<i;r[i]=0,o[i]=-1,s[i]=-1,t&=~n}}function En(s,r){var t=s.entangledLanes|=r;for(s=s.entanglements;t;){var o=31-ze(t),i=1<<o;i&r|s[o]&r&&(s[o]|=r),t&=~i}}var O=0;function ac(s){return s&=-s,1<s?4<s?s&268435455?16:536870912:4:1}var cc,bn,dc,hc,uc,wi=!1,_t=[],ns=null,ls=null,as=null,qr=new Map,Vr=new Map,ss=[],Gh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function vl(s,r){switch(s){case"focusin":case"focusout":ns=null;break;case"dragenter":case"dragleave":ls=null;break;case"mouseover":case"mouseout":as=null;break;case"pointerover":case"pointerout":qr.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":Vr.delete(r.pointerId)}}function vr(s,r,t,o,i,n){return s===null||s.nativeEvent!==n?(s={blockedOn:r,domEventName:t,eventSystemFlags:o,nativeEvent:n,targetContainers:[i]},r!==null&&(r=lt(r),r!==null&&bn(r)),s):(s.eventSystemFlags|=o,r=s.targetContainers,i!==null&&r.indexOf(i)===-1&&r.push(i),s)}function Qh(s,r,t,o,i){switch(r){case"focusin":return ns=vr(ns,s,r,t,o,i),!0;case"dragenter":return ls=vr(ls,s,r,t,o,i),!0;case"mouseover":return as=vr(as,s,r,t,o,i),!0;case"pointerover":var n=i.pointerId;return qr.set(n,vr(qr.get(n)||null,s,r,t,o,i)),!0;case"gotpointercapture":return n=i.pointerId,Vr.set(n,vr(Vr.get(n)||null,s,r,t,o,i)),!0}return!1}function xc(s){var r=bs(s.target);if(r!==null){var t=Os(r);if(t!==null){if(r=t.tag,r===13){if(r=sc(t),r!==null){s.blockedOn=r,uc(s.priority,function(){dc(t)});return}}else if(r===3&&t.stateNode.current.memoizedState.isDehydrated){s.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}s.blockedOn=null}function Dt(s){if(s.blockedOn!==null)return!1;for(var r=s.targetContainers;0<r.length;){var t=Ai(s.domEventName,s.eventSystemFlags,r[0],s.nativeEvent);if(t===null){t=s.nativeEvent;var o=new t.constructor(t.type,t);Ei=o,t.target.dispatchEvent(o),Ei=null}else return r=lt(t),r!==null&&bn(r),s.blockedOn=t,!1;r.shift()}return!0}function Nl(s,r,t){Dt(s)&&t.delete(r)}function Xh(){wi=!1,ns!==null&&Dt(ns)&&(ns=null),ls!==null&&Dt(ls)&&(ls=null),as!==null&&Dt(as)&&(as=null),qr.forEach(Nl),Vr.forEach(Nl)}function Nr(s,r){s.blockedOn===r&&(s.blockedOn=null,wi||(wi=!0,Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority,Xh)))}function Jr(s){function r(i){return Nr(i,s)}if(0<_t.length){Nr(_t[0],s);for(var t=1;t<_t.length;t++){var o=_t[t];o.blockedOn===s&&(o.blockedOn=null)}}for(ns!==null&&Nr(ns,s),ls!==null&&Nr(ls,s),as!==null&&Nr(as,s),qr.forEach(r),Vr.forEach(r),t=0;t<ss.length;t++)o=ss[t],o.blockedOn===s&&(o.blockedOn=null);for(;0<ss.length&&(t=ss[0],t.blockedOn===null);)xc(t),t.blockedOn===null&&ss.shift()}var rr=Ke.ReactCurrentBatchConfig,Wt=!0;function Kh(s,r,t,o){var i=O,n=rr.transition;rr.transition=null;try{O=1,Pn(s,r,t,o)}finally{O=i,rr.transition=n}}function Zh(s,r,t,o){var i=O,n=rr.transition;rr.transition=null;try{O=4,Pn(s,r,t,o)}finally{O=i,rr.transition=n}}function Pn(s,r,t,o){if(Wt){var i=Ai(s,r,t,o);if(i===null)Yo(s,r,o,$t,t),vl(s,o);else if(Qh(i,s,r,t,o))o.stopPropagation();else if(vl(s,o),r&4&&-1<Gh.indexOf(s)){for(;i!==null;){var n=lt(i);if(n!==null&&cc(n),n=Ai(s,r,t,o),n===null&&Yo(s,r,o,$t,t),n===i)break;i=n}i!==null&&o.stopPropagation()}else Yo(s,r,o,null,t)}}var $t=null;function Ai(s,r,t,o){if($t=null,s=yn(o),s=bs(s),s!==null)if(r=Os(s),r===null)s=null;else if(t=r.tag,t===13){if(s=sc(r),s!==null)return s;s=null}else if(t===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;s=null}else r!==s&&(s=null);return $t=s,null}function mc(s){switch(s){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Mh()){case Cn:return 1;case ic:return 4;case Jt:case Bh:return 16;case nc:return 536870912;default:return 16}default:return 16}}var ts=null,kn=null,Tt=null;function jc(){if(Tt)return Tt;var s,r=kn,t=r.length,o,i="value"in ts?ts.value:ts.textContent,n=i.length;for(s=0;s<t&&r[s]===i[s];s++);var l=t-s;for(o=1;o<=l&&r[t-o]===i[n-o];o++);return Tt=i.slice(s,1<o?1-o:void 0)}function Rt(s){var r=s.keyCode;return"charCode"in s?(s=s.charCode,s===0&&r===13&&(s=13)):s=r,s===10&&(s=13),32<=s||s===13?s:0}function gt(){return!0}function yl(){return!1}function Ce(s){function r(t,o,i,n,l){this._reactName=t,this._targetInst=i,this.type=o,this.nativeEvent=n,this.target=l,this.currentTarget=null;for(var c in s)s.hasOwnProperty(c)&&(t=s[c],this[c]=t?t(n):n[c]);return this.isDefaultPrevented=(n.defaultPrevented!=null?n.defaultPrevented:n.returnValue===!1)?gt:yl,this.isPropagationStopped=yl,this}return J(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=gt)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=gt)},persist:function(){},isPersistent:gt}),r}var mr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(s){return s.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sn=Ce(mr),nt=J({},mr,{view:0,detail:0}),Yh=Ce(nt),Jo,Ho,yr,fo=J({},nt,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wn,button:0,buttons:0,relatedTarget:function(s){return s.relatedTarget===void 0?s.fromElement===s.srcElement?s.toElement:s.fromElement:s.relatedTarget},movementX:function(s){return"movementX"in s?s.movementX:(s!==yr&&(yr&&s.type==="mousemove"?(Jo=s.screenX-yr.screenX,Ho=s.screenY-yr.screenY):Ho=Jo=0,yr=s),Jo)},movementY:function(s){return"movementY"in s?s.movementY:Ho}}),Cl=Ce(fo),eu=J({},fo,{dataTransfer:0}),su=Ce(eu),ru=J({},nt,{relatedTarget:0}),Wo=Ce(ru),tu=J({},mr,{animationName:0,elapsedTime:0,pseudoElement:0}),ou=Ce(tu),iu=J({},mr,{clipboardData:function(s){return"clipboardData"in s?s.clipboardData:window.clipboardData}}),nu=Ce(iu),lu=J({},mr,{data:0}),El=Ce(lu),au={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cu={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},du={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function hu(s){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(s):(s=du[s])?!!r[s]:!1}function wn(){return hu}var uu=J({},nt,{key:function(s){if(s.key){var r=au[s.key]||s.key;if(r!=="Unidentified")return r}return s.type==="keypress"?(s=Rt(s),s===13?"Enter":String.fromCharCode(s)):s.type==="keydown"||s.type==="keyup"?cu[s.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wn,charCode:function(s){return s.type==="keypress"?Rt(s):0},keyCode:function(s){return s.type==="keydown"||s.type==="keyup"?s.keyCode:0},which:function(s){return s.type==="keypress"?Rt(s):s.type==="keydown"||s.type==="keyup"?s.keyCode:0}}),xu=Ce(uu),mu=J({},fo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bl=Ce(mu),ju=J({},nt,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wn}),pu=Ce(ju),fu=J({},mr,{propertyName:0,elapsedTime:0,pseudoElement:0}),_u=Ce(fu),gu=J({},fo,{deltaX:function(s){return"deltaX"in s?s.deltaX:"wheelDeltaX"in s?-s.wheelDeltaX:0},deltaY:function(s){return"deltaY"in s?s.deltaY:"wheelDeltaY"in s?-s.wheelDeltaY:"wheelDelta"in s?-s.wheelDelta:0},deltaZ:0,deltaMode:0}),vu=Ce(gu),Nu=[9,13,27,32],An=$e&&"CompositionEvent"in window,Tr=null;$e&&"documentMode"in document&&(Tr=document.documentMode);var yu=$e&&"TextEvent"in window&&!Tr,pc=$e&&(!An||Tr&&8<Tr&&11>=Tr),Pl=" ",kl=!1;function fc(s,r){switch(s){case"keyup":return Nu.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _c(s){return s=s.detail,typeof s=="object"&&"data"in s?s.data:null}var Vs=!1;function Cu(s,r){switch(s){case"compositionend":return _c(r);case"keypress":return r.which!==32?null:(kl=!0,Pl);case"textInput":return s=r.data,s===Pl&&kl?null:s;default:return null}}function Eu(s,r){if(Vs)return s==="compositionend"||!An&&fc(s,r)?(s=jc(),Tt=kn=ts=null,Vs=!1,s):null;switch(s){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return pc&&r.locale!=="ko"?null:r.data;default:return null}}var bu={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Sl(s){var r=s&&s.nodeName&&s.nodeName.toLowerCase();return r==="input"?!!bu[s.type]:r==="textarea"}function gc(s,r,t,o){Xa(o),r=Gt(r,"onChange"),0<r.length&&(t=new Sn("onChange","change",null,t,o),s.push({event:t,listeners:r}))}var Rr=null,Hr=null;function Pu(s){Ac(s,0)}function _o(s){var r=Ws(s);if(Va(r))return s}function ku(s,r){if(s==="change")return r}var vc=!1;if($e){var $o;if($e){var Go="oninput"in document;if(!Go){var wl=document.createElement("div");wl.setAttribute("oninput","return;"),Go=typeof wl.oninput=="function"}$o=Go}else $o=!1;vc=$o&&(!document.documentMode||9<document.documentMode)}function Al(){Rr&&(Rr.detachEvent("onpropertychange",Nc),Hr=Rr=null)}function Nc(s){if(s.propertyName==="value"&&_o(Hr)){var r=[];gc(r,Hr,s,yn(s)),ec(Pu,r)}}function Su(s,r,t){s==="focusin"?(Al(),Rr=r,Hr=t,Rr.attachEvent("onpropertychange",Nc)):s==="focusout"&&Al()}function wu(s){if(s==="selectionchange"||s==="keyup"||s==="keydown")return _o(Hr)}function Au(s,r){if(s==="click")return _o(r)}function Du(s,r){if(s==="input"||s==="change")return _o(r)}function Tu(s,r){return s===r&&(s!==0||1/s===1/r)||s!==s&&r!==r}var Oe=typeof Object.is=="function"?Object.is:Tu;function Wr(s,r){if(Oe(s,r))return!0;if(typeof s!="object"||s===null||typeof r!="object"||r===null)return!1;var t=Object.keys(s),o=Object.keys(r);if(t.length!==o.length)return!1;for(o=0;o<t.length;o++){var i=t[o];if(!ui.call(r,i)||!Oe(s[i],r[i]))return!1}return!0}function Dl(s){for(;s&&s.firstChild;)s=s.firstChild;return s}function Tl(s,r){var t=Dl(s);s=0;for(var o;t;){if(t.nodeType===3){if(o=s+t.textContent.length,s<=r&&o>=r)return{node:t,offset:r-s};s=o}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Dl(t)}}function yc(s,r){return s&&r?s===r?!0:s&&s.nodeType===3?!1:r&&r.nodeType===3?yc(s,r.parentNode):"contains"in s?s.contains(r):s.compareDocumentPosition?!!(s.compareDocumentPosition(r)&16):!1:!1}function Cc(){for(var s=window,r=Ut();r instanceof s.HTMLIFrameElement;){try{var t=typeof r.contentWindow.location.href=="string"}catch{t=!1}if(t)s=r.contentWindow;else break;r=Ut(s.document)}return r}function Dn(s){var r=s&&s.nodeName&&s.nodeName.toLowerCase();return r&&(r==="input"&&(s.type==="text"||s.type==="search"||s.type==="tel"||s.type==="url"||s.type==="password")||r==="textarea"||s.contentEditable==="true")}function Ru(s){var r=Cc(),t=s.focusedElem,o=s.selectionRange;if(r!==t&&t&&t.ownerDocument&&yc(t.ownerDocument.documentElement,t)){if(o!==null&&Dn(t)){if(r=o.start,s=o.end,s===void 0&&(s=r),"selectionStart"in t)t.selectionStart=r,t.selectionEnd=Math.min(s,t.value.length);else if(s=(r=t.ownerDocument||document)&&r.defaultView||window,s.getSelection){s=s.getSelection();var i=t.textContent.length,n=Math.min(o.start,i);o=o.end===void 0?n:Math.min(o.end,i),!s.extend&&n>o&&(i=o,o=n,n=i),i=Tl(t,n);var l=Tl(t,o);i&&l&&(s.rangeCount!==1||s.anchorNode!==i.node||s.anchorOffset!==i.offset||s.focusNode!==l.node||s.focusOffset!==l.offset)&&(r=r.createRange(),r.setStart(i.node,i.offset),s.removeAllRanges(),n>o?(s.addRange(r),s.extend(l.node,l.offset)):(r.setEnd(l.node,l.offset),s.addRange(r)))}}for(r=[],s=t;s=s.parentNode;)s.nodeType===1&&r.push({element:s,left:s.scrollLeft,top:s.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<r.length;t++)s=r[t],s.element.scrollLeft=s.left,s.element.scrollTop=s.top}}var zu=$e&&"documentMode"in document&&11>=document.documentMode,Js=null,Di=null,zr=null,Ti=!1;function Rl(s,r,t){var o=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Ti||Js==null||Js!==Ut(o)||(o=Js,"selectionStart"in o&&Dn(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),zr&&Wr(zr,o)||(zr=o,o=Gt(Di,"onSelect"),0<o.length&&(r=new Sn("onSelect","select",null,r,t),s.push({event:r,listeners:o}),r.target=Js)))}function vt(s,r){var t={};return t[s.toLowerCase()]=r.toLowerCase(),t["Webkit"+s]="webkit"+r,t["Moz"+s]="moz"+r,t}var Hs={animationend:vt("Animation","AnimationEnd"),animationiteration:vt("Animation","AnimationIteration"),animationstart:vt("Animation","AnimationStart"),transitionend:vt("Transition","TransitionEnd")},Qo={},Ec={};$e&&(Ec=document.createElement("div").style,"AnimationEvent"in window||(delete Hs.animationend.animation,delete Hs.animationiteration.animation,delete Hs.animationstart.animation),"TransitionEvent"in window||delete Hs.transitionend.transition);function go(s){if(Qo[s])return Qo[s];if(!Hs[s])return s;var r=Hs[s],t;for(t in r)if(r.hasOwnProperty(t)&&t in Ec)return Qo[s]=r[t];return s}var bc=go("animationend"),Pc=go("animationiteration"),kc=go("animationstart"),Sc=go("transitionend"),wc=new Map,zl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function fs(s,r){wc.set(s,r),Ls(r,[s])}for(var Xo=0;Xo<zl.length;Xo++){var Ko=zl[Xo],Lu=Ko.toLowerCase(),Ou=Ko[0].toUpperCase()+Ko.slice(1);fs(Lu,"on"+Ou)}fs(bc,"onAnimationEnd");fs(Pc,"onAnimationIteration");fs(kc,"onAnimationStart");fs("dblclick","onDoubleClick");fs("focusin","onFocus");fs("focusout","onBlur");fs(Sc,"onTransitionEnd");ir("onMouseEnter",["mouseout","mouseover"]);ir("onMouseLeave",["mouseout","mouseover"]);ir("onPointerEnter",["pointerout","pointerover"]);ir("onPointerLeave",["pointerout","pointerover"]);Ls("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ls("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ls("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ls("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ls("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ls("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Iu=new Set("cancel close invalid load scroll toggle".split(" ").concat(wr));function Ll(s,r,t){var o=s.type||"unknown-event";s.currentTarget=t,Lh(o,r,void 0,s),s.currentTarget=null}function Ac(s,r){r=(r&4)!==0;for(var t=0;t<s.length;t++){var o=s[t],i=o.event;o=o.listeners;e:{var n=void 0;if(r)for(var l=o.length-1;0<=l;l--){var c=o[l],d=c.instance,h=c.currentTarget;if(c=c.listener,d!==n&&i.isPropagationStopped())break e;Ll(i,c,h),n=d}else for(l=0;l<o.length;l++){if(c=o[l],d=c.instance,h=c.currentTarget,c=c.listener,d!==n&&i.isPropagationStopped())break e;Ll(i,c,h),n=d}}}if(Vt)throw s=ki,Vt=!1,ki=null,s}function F(s,r){var t=r[Ii];t===void 0&&(t=r[Ii]=new Set);var o=s+"__bubble";t.has(o)||(Dc(r,s,2,!1),t.add(o))}function Zo(s,r,t){var o=0;r&&(o|=4),Dc(t,s,o,r)}var Nt="_reactListening"+Math.random().toString(36).slice(2);function $r(s){if(!s[Nt]){s[Nt]=!0,Fa.forEach(function(t){t!=="selectionchange"&&(Iu.has(t)||Zo(t,!1,s),Zo(t,!0,s))});var r=s.nodeType===9?s:s.ownerDocument;r===null||r[Nt]||(r[Nt]=!0,Zo("selectionchange",!1,r))}}function Dc(s,r,t,o){switch(mc(r)){case 1:var i=Kh;break;case 4:i=Zh;break;default:i=Pn}t=i.bind(null,r,t,s),i=void 0,!Pi||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(i=!0),o?i!==void 0?s.addEventListener(r,t,{capture:!0,passive:i}):s.addEventListener(r,t,!0):i!==void 0?s.addEventListener(r,t,{passive:i}):s.addEventListener(r,t,!1)}function Yo(s,r,t,o,i){var n=o;if(!(r&1)&&!(r&2)&&o!==null)e:for(;;){if(o===null)return;var l=o.tag;if(l===3||l===4){var c=o.stateNode.containerInfo;if(c===i||c.nodeType===8&&c.parentNode===i)break;if(l===4)for(l=o.return;l!==null;){var d=l.tag;if((d===3||d===4)&&(d=l.stateNode.containerInfo,d===i||d.nodeType===8&&d.parentNode===i))return;l=l.return}for(;c!==null;){if(l=bs(c),l===null)return;if(d=l.tag,d===5||d===6){o=n=l;continue e}c=c.parentNode}}o=o.return}ec(function(){var h=n,p=yn(t),j=[];e:{var f=wc.get(s);if(f!==void 0){var v=Sn,g=s;switch(s){case"keypress":if(Rt(t)===0)break e;case"keydown":case"keyup":v=xu;break;case"focusin":g="focus",v=Wo;break;case"focusout":g="blur",v=Wo;break;case"beforeblur":case"afterblur":v=Wo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Cl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=su;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=pu;break;case bc:case Pc:case kc:v=ou;break;case Sc:v=_u;break;case"scroll":v=Yh;break;case"wheel":v=vu;break;case"copy":case"cut":case"paste":v=nu;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=bl}var N=(r&4)!==0,E=!N&&s==="scroll",x=N?f!==null?f+"Capture":null:f;N=[];for(var u=h,m;u!==null;){m=u;var _=m.stateNode;if(m.tag===5&&_!==null&&(m=_,x!==null&&(_=Ur(u,x),_!=null&&N.push(Gr(u,_,m)))),E)break;u=u.return}0<N.length&&(f=new v(f,g,null,t,p),j.push({event:f,listeners:N}))}}if(!(r&7)){e:{if(f=s==="mouseover"||s==="pointerover",v=s==="mouseout"||s==="pointerout",f&&t!==Ei&&(g=t.relatedTarget||t.fromElement)&&(bs(g)||g[Ge]))break e;if((v||f)&&(f=p.window===p?p:(f=p.ownerDocument)?f.defaultView||f.parentWindow:window,v?(g=t.relatedTarget||t.toElement,v=h,g=g?bs(g):null,g!==null&&(E=Os(g),g!==E||g.tag!==5&&g.tag!==6)&&(g=null)):(v=null,g=h),v!==g)){if(N=Cl,_="onMouseLeave",x="onMouseEnter",u="mouse",(s==="pointerout"||s==="pointerover")&&(N=bl,_="onPointerLeave",x="onPointerEnter",u="pointer"),E=v==null?f:Ws(v),m=g==null?f:Ws(g),f=new N(_,u+"leave",v,t,p),f.target=E,f.relatedTarget=m,_=null,bs(p)===h&&(N=new N(x,u+"enter",g,t,p),N.target=m,N.relatedTarget=E,_=N),E=_,v&&g)s:{for(N=v,x=g,u=0,m=N;m;m=Bs(m))u++;for(m=0,_=x;_;_=Bs(_))m++;for(;0<u-m;)N=Bs(N),u--;for(;0<m-u;)x=Bs(x),m--;for(;u--;){if(N===x||x!==null&&N===x.alternate)break s;N=Bs(N),x=Bs(x)}N=null}else N=null;v!==null&&Ol(j,f,v,N,!1),g!==null&&E!==null&&Ol(j,E,g,N,!0)}}e:{if(f=h?Ws(h):window,v=f.nodeName&&f.nodeName.toLowerCase(),v==="select"||v==="input"&&f.type==="file")var b=ku;else if(Sl(f))if(vc)b=Du;else{b=wu;var S=Su}else(v=f.nodeName)&&v.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(b=Au);if(b&&(b=b(s,h))){gc(j,b,t,p);break e}S&&S(s,f,h),s==="focusout"&&(S=f._wrapperState)&&S.controlled&&f.type==="number"&&gi(f,"number",f.value)}switch(S=h?Ws(h):window,s){case"focusin":(Sl(S)||S.contentEditable==="true")&&(Js=S,Di=h,zr=null);break;case"focusout":zr=Di=Js=null;break;case"mousedown":Ti=!0;break;case"contextmenu":case"mouseup":case"dragend":Ti=!1,Rl(j,t,p);break;case"selectionchange":if(zu)break;case"keydown":case"keyup":Rl(j,t,p)}var w;if(An)e:{switch(s){case"compositionstart":var A="onCompositionStart";break e;case"compositionend":A="onCompositionEnd";break e;case"compositionupdate":A="onCompositionUpdate";break e}A=void 0}else Vs?fc(s,t)&&(A="onCompositionEnd"):s==="keydown"&&t.keyCode===229&&(A="onCompositionStart");A&&(pc&&t.locale!=="ko"&&(Vs||A!=="onCompositionStart"?A==="onCompositionEnd"&&Vs&&(w=jc()):(ts=p,kn="value"in ts?ts.value:ts.textContent,Vs=!0)),S=Gt(h,A),0<S.length&&(A=new El(A,s,null,t,p),j.push({event:A,listeners:S}),w?A.data=w:(w=_c(t),w!==null&&(A.data=w)))),(w=yu?Cu(s,t):Eu(s,t))&&(h=Gt(h,"onBeforeInput"),0<h.length&&(p=new El("onBeforeInput","beforeinput",null,t,p),j.push({event:p,listeners:h}),p.data=w))}Ac(j,r)})}function Gr(s,r,t){return{instance:s,listener:r,currentTarget:t}}function Gt(s,r){for(var t=r+"Capture",o=[];s!==null;){var i=s,n=i.stateNode;i.tag===5&&n!==null&&(i=n,n=Ur(s,t),n!=null&&o.unshift(Gr(s,n,i)),n=Ur(s,r),n!=null&&o.push(Gr(s,n,i))),s=s.return}return o}function Bs(s){if(s===null)return null;do s=s.return;while(s&&s.tag!==5);return s||null}function Ol(s,r,t,o,i){for(var n=r._reactName,l=[];t!==null&&t!==o;){var c=t,d=c.alternate,h=c.stateNode;if(d!==null&&d===o)break;c.tag===5&&h!==null&&(c=h,i?(d=Ur(t,n),d!=null&&l.unshift(Gr(t,d,c))):i||(d=Ur(t,n),d!=null&&l.push(Gr(t,d,c)))),t=t.return}l.length!==0&&s.push({event:r,listeners:l})}var Fu=/\r\n?/g,Mu=/\u0000|\uFFFD/g;function Il(s){return(typeof s=="string"?s:""+s).replace(Fu,`
`).replace(Mu,"")}function yt(s,r,t){if(r=Il(r),Il(s)!==r&&t)throw Error(y(425))}function Qt(){}var Ri=null,zi=null;function Li(s,r){return s==="textarea"||s==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var Oi=typeof setTimeout=="function"?setTimeout:void 0,Bu=typeof clearTimeout=="function"?clearTimeout:void 0,Fl=typeof Promise=="function"?Promise:void 0,Uu=typeof queueMicrotask=="function"?queueMicrotask:typeof Fl<"u"?function(s){return Fl.resolve(null).then(s).catch(qu)}:Oi;function qu(s){setTimeout(function(){throw s})}function ei(s,r){var t=r,o=0;do{var i=t.nextSibling;if(s.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(o===0){s.removeChild(i),Jr(r);return}o--}else t!=="$"&&t!=="$?"&&t!=="$!"||o++;t=i}while(t);Jr(r)}function cs(s){for(;s!=null;s=s.nextSibling){var r=s.nodeType;if(r===1||r===3)break;if(r===8){if(r=s.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return s}function Ml(s){s=s.previousSibling;for(var r=0;s;){if(s.nodeType===8){var t=s.data;if(t==="$"||t==="$!"||t==="$?"){if(r===0)return s;r--}else t==="/$"&&r++}s=s.previousSibling}return null}var jr=Math.random().toString(36).slice(2),Me="__reactFiber$"+jr,Qr="__reactProps$"+jr,Ge="__reactContainer$"+jr,Ii="__reactEvents$"+jr,Vu="__reactListeners$"+jr,Ju="__reactHandles$"+jr;function bs(s){var r=s[Me];if(r)return r;for(var t=s.parentNode;t;){if(r=t[Ge]||t[Me]){if(t=r.alternate,r.child!==null||t!==null&&t.child!==null)for(s=Ml(s);s!==null;){if(t=s[Me])return t;s=Ml(s)}return r}s=t,t=s.parentNode}return null}function lt(s){return s=s[Me]||s[Ge],!s||s.tag!==5&&s.tag!==6&&s.tag!==13&&s.tag!==3?null:s}function Ws(s){if(s.tag===5||s.tag===6)return s.stateNode;throw Error(y(33))}function vo(s){return s[Qr]||null}var Fi=[],$s=-1;function _s(s){return{current:s}}function M(s){0>$s||(s.current=Fi[$s],Fi[$s]=null,$s--)}function I(s,r){$s++,Fi[$s]=s.current,s.current=r}var ps={},le=_s(ps),me=_s(!1),As=ps;function nr(s,r){var t=s.type.contextTypes;if(!t)return ps;var o=s.stateNode;if(o&&o.__reactInternalMemoizedUnmaskedChildContext===r)return o.__reactInternalMemoizedMaskedChildContext;var i={},n;for(n in t)i[n]=r[n];return o&&(s=s.stateNode,s.__reactInternalMemoizedUnmaskedChildContext=r,s.__reactInternalMemoizedMaskedChildContext=i),i}function je(s){return s=s.childContextTypes,s!=null}function Xt(){M(me),M(le)}function Bl(s,r,t){if(le.current!==ps)throw Error(y(168));I(le,r),I(me,t)}function Tc(s,r,t){var o=s.stateNode;if(r=r.childContextTypes,typeof o.getChildContext!="function")return t;o=o.getChildContext();for(var i in o)if(!(i in r))throw Error(y(108,Sh(s)||"Unknown",i));return J({},t,o)}function Kt(s){return s=(s=s.stateNode)&&s.__reactInternalMemoizedMergedChildContext||ps,As=le.current,I(le,s),I(me,me.current),!0}function Ul(s,r,t){var o=s.stateNode;if(!o)throw Error(y(169));t?(s=Tc(s,r,As),o.__reactInternalMemoizedMergedChildContext=s,M(me),M(le),I(le,s)):M(me),I(me,t)}var Ve=null,No=!1,si=!1;function Rc(s){Ve===null?Ve=[s]:Ve.push(s)}function Hu(s){No=!0,Rc(s)}function gs(){if(!si&&Ve!==null){si=!0;var s=0,r=O;try{var t=Ve;for(O=1;s<t.length;s++){var o=t[s];do o=o(!0);while(o!==null)}Ve=null,No=!1}catch(i){throw Ve!==null&&(Ve=Ve.slice(s+1)),oc(Cn,gs),i}finally{O=r,si=!1}}return null}var Gs=[],Qs=0,Zt=null,Yt=0,Ee=[],be=0,Ds=null,Je=1,He="";function Cs(s,r){Gs[Qs++]=Yt,Gs[Qs++]=Zt,Zt=s,Yt=r}function zc(s,r,t){Ee[be++]=Je,Ee[be++]=He,Ee[be++]=Ds,Ds=s;var o=Je;s=He;var i=32-ze(o)-1;o&=~(1<<i),t+=1;var n=32-ze(r)+i;if(30<n){var l=i-i%5;n=(o&(1<<l)-1).toString(32),o>>=l,i-=l,Je=1<<32-ze(r)+i|t<<i|o,He=n+s}else Je=1<<n|t<<i|o,He=s}function Tn(s){s.return!==null&&(Cs(s,1),zc(s,1,0))}function Rn(s){for(;s===Zt;)Zt=Gs[--Qs],Gs[Qs]=null,Yt=Gs[--Qs],Gs[Qs]=null;for(;s===Ds;)Ds=Ee[--be],Ee[be]=null,He=Ee[--be],Ee[be]=null,Je=Ee[--be],Ee[be]=null}var ve=null,ge=null,B=!1,Re=null;function Lc(s,r){var t=Pe(5,null,null,0);t.elementType="DELETED",t.stateNode=r,t.return=s,r=s.deletions,r===null?(s.deletions=[t],s.flags|=16):r.push(t)}function ql(s,r){switch(s.tag){case 5:var t=s.type;return r=r.nodeType!==1||t.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(s.stateNode=r,ve=s,ge=cs(r.firstChild),!0):!1;case 6:return r=s.pendingProps===""||r.nodeType!==3?null:r,r!==null?(s.stateNode=r,ve=s,ge=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(t=Ds!==null?{id:Je,overflow:He}:null,s.memoizedState={dehydrated:r,treeContext:t,retryLane:1073741824},t=Pe(18,null,null,0),t.stateNode=r,t.return=s,s.child=t,ve=s,ge=null,!0):!1;default:return!1}}function Mi(s){return(s.mode&1)!==0&&(s.flags&128)===0}function Bi(s){if(B){var r=ge;if(r){var t=r;if(!ql(s,r)){if(Mi(s))throw Error(y(418));r=cs(t.nextSibling);var o=ve;r&&ql(s,r)?Lc(o,t):(s.flags=s.flags&-4097|2,B=!1,ve=s)}}else{if(Mi(s))throw Error(y(418));s.flags=s.flags&-4097|2,B=!1,ve=s}}}function Vl(s){for(s=s.return;s!==null&&s.tag!==5&&s.tag!==3&&s.tag!==13;)s=s.return;ve=s}function Ct(s){if(s!==ve)return!1;if(!B)return Vl(s),B=!0,!1;var r;if((r=s.tag!==3)&&!(r=s.tag!==5)&&(r=s.type,r=r!=="head"&&r!=="body"&&!Li(s.type,s.memoizedProps)),r&&(r=ge)){if(Mi(s))throw Oc(),Error(y(418));for(;r;)Lc(s,r),r=cs(r.nextSibling)}if(Vl(s),s.tag===13){if(s=s.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(y(317));e:{for(s=s.nextSibling,r=0;s;){if(s.nodeType===8){var t=s.data;if(t==="/$"){if(r===0){ge=cs(s.nextSibling);break e}r--}else t!=="$"&&t!=="$!"&&t!=="$?"||r++}s=s.nextSibling}ge=null}}else ge=ve?cs(s.stateNode.nextSibling):null;return!0}function Oc(){for(var s=ge;s;)s=cs(s.nextSibling)}function lr(){ge=ve=null,B=!1}function zn(s){Re===null?Re=[s]:Re.push(s)}var Wu=Ke.ReactCurrentBatchConfig;function Cr(s,r,t){if(s=t.ref,s!==null&&typeof s!="function"&&typeof s!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(y(309));var o=t.stateNode}if(!o)throw Error(y(147,s));var i=o,n=""+s;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===n?r.ref:(r=function(l){var c=i.refs;l===null?delete c[n]:c[n]=l},r._stringRef=n,r)}if(typeof s!="string")throw Error(y(284));if(!t._owner)throw Error(y(290,s))}return s}function Et(s,r){throw s=Object.prototype.toString.call(r),Error(y(31,s==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":s))}function Jl(s){var r=s._init;return r(s._payload)}function Ic(s){function r(x,u){if(s){var m=x.deletions;m===null?(x.deletions=[u],x.flags|=16):m.push(u)}}function t(x,u){if(!s)return null;for(;u!==null;)r(x,u),u=u.sibling;return null}function o(x,u){for(x=new Map;u!==null;)u.key!==null?x.set(u.key,u):x.set(u.index,u),u=u.sibling;return x}function i(x,u){return x=xs(x,u),x.index=0,x.sibling=null,x}function n(x,u,m){return x.index=m,s?(m=x.alternate,m!==null?(m=m.index,m<u?(x.flags|=2,u):m):(x.flags|=2,u)):(x.flags|=1048576,u)}function l(x){return s&&x.alternate===null&&(x.flags|=2),x}function c(x,u,m,_){return u===null||u.tag!==6?(u=ai(m,x.mode,_),u.return=x,u):(u=i(u,m),u.return=x,u)}function d(x,u,m,_){var b=m.type;return b===qs?p(x,u,m.props.children,_,m.key):u!==null&&(u.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ye&&Jl(b)===u.type)?(_=i(u,m.props),_.ref=Cr(x,u,m),_.return=x,_):(_=Bt(m.type,m.key,m.props,null,x.mode,_),_.ref=Cr(x,u,m),_.return=x,_)}function h(x,u,m,_){return u===null||u.tag!==4||u.stateNode.containerInfo!==m.containerInfo||u.stateNode.implementation!==m.implementation?(u=ci(m,x.mode,_),u.return=x,u):(u=i(u,m.children||[]),u.return=x,u)}function p(x,u,m,_,b){return u===null||u.tag!==7?(u=ws(m,x.mode,_,b),u.return=x,u):(u=i(u,m),u.return=x,u)}function j(x,u,m){if(typeof u=="string"&&u!==""||typeof u=="number")return u=ai(""+u,x.mode,m),u.return=x,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case xt:return m=Bt(u.type,u.key,u.props,null,x.mode,m),m.ref=Cr(x,null,u),m.return=x,m;case Us:return u=ci(u,x.mode,m),u.return=x,u;case Ye:var _=u._init;return j(x,_(u._payload),m)}if(kr(u)||_r(u))return u=ws(u,x.mode,m,null),u.return=x,u;Et(x,u)}return null}function f(x,u,m,_){var b=u!==null?u.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return b!==null?null:c(x,u,""+m,_);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case xt:return m.key===b?d(x,u,m,_):null;case Us:return m.key===b?h(x,u,m,_):null;case Ye:return b=m._init,f(x,u,b(m._payload),_)}if(kr(m)||_r(m))return b!==null?null:p(x,u,m,_,null);Et(x,m)}return null}function v(x,u,m,_,b){if(typeof _=="string"&&_!==""||typeof _=="number")return x=x.get(m)||null,c(u,x,""+_,b);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case xt:return x=x.get(_.key===null?m:_.key)||null,d(u,x,_,b);case Us:return x=x.get(_.key===null?m:_.key)||null,h(u,x,_,b);case Ye:var S=_._init;return v(x,u,m,S(_._payload),b)}if(kr(_)||_r(_))return x=x.get(m)||null,p(u,x,_,b,null);Et(u,_)}return null}function g(x,u,m,_){for(var b=null,S=null,w=u,A=u=0,U=null;w!==null&&A<m.length;A++){w.index>A?(U=w,w=null):U=w.sibling;var T=f(x,w,m[A],_);if(T===null){w===null&&(w=U);break}s&&w&&T.alternate===null&&r(x,w),u=n(T,u,A),S===null?b=T:S.sibling=T,S=T,w=U}if(A===m.length)return t(x,w),B&&Cs(x,A),b;if(w===null){for(;A<m.length;A++)w=j(x,m[A],_),w!==null&&(u=n(w,u,A),S===null?b=w:S.sibling=w,S=w);return B&&Cs(x,A),b}for(w=o(x,w);A<m.length;A++)U=v(w,x,A,m[A],_),U!==null&&(s&&U.alternate!==null&&w.delete(U.key===null?A:U.key),u=n(U,u,A),S===null?b=U:S.sibling=U,S=U);return s&&w.forEach(function(fe){return r(x,fe)}),B&&Cs(x,A),b}function N(x,u,m,_){var b=_r(m);if(typeof b!="function")throw Error(y(150));if(m=b.call(m),m==null)throw Error(y(151));for(var S=b=null,w=u,A=u=0,U=null,T=m.next();w!==null&&!T.done;A++,T=m.next()){w.index>A?(U=w,w=null):U=w.sibling;var fe=f(x,w,T.value,_);if(fe===null){w===null&&(w=U);break}s&&w&&fe.alternate===null&&r(x,w),u=n(fe,u,A),S===null?b=fe:S.sibling=fe,S=fe,w=U}if(T.done)return t(x,w),B&&Cs(x,A),b;if(w===null){for(;!T.done;A++,T=m.next())T=j(x,T.value,_),T!==null&&(u=n(T,u,A),S===null?b=T:S.sibling=T,S=T);return B&&Cs(x,A),b}for(w=o(x,w);!T.done;A++,T=m.next())T=v(w,x,A,T.value,_),T!==null&&(s&&T.alternate!==null&&w.delete(T.key===null?A:T.key),u=n(T,u,A),S===null?b=T:S.sibling=T,S=T);return s&&w.forEach(function(pr){return r(x,pr)}),B&&Cs(x,A),b}function E(x,u,m,_){if(typeof m=="object"&&m!==null&&m.type===qs&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case xt:e:{for(var b=m.key,S=u;S!==null;){if(S.key===b){if(b=m.type,b===qs){if(S.tag===7){t(x,S.sibling),u=i(S,m.props.children),u.return=x,x=u;break e}}else if(S.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ye&&Jl(b)===S.type){t(x,S.sibling),u=i(S,m.props),u.ref=Cr(x,S,m),u.return=x,x=u;break e}t(x,S);break}else r(x,S);S=S.sibling}m.type===qs?(u=ws(m.props.children,x.mode,_,m.key),u.return=x,x=u):(_=Bt(m.type,m.key,m.props,null,x.mode,_),_.ref=Cr(x,u,m),_.return=x,x=_)}return l(x);case Us:e:{for(S=m.key;u!==null;){if(u.key===S)if(u.tag===4&&u.stateNode.containerInfo===m.containerInfo&&u.stateNode.implementation===m.implementation){t(x,u.sibling),u=i(u,m.children||[]),u.return=x,x=u;break e}else{t(x,u);break}else r(x,u);u=u.sibling}u=ci(m,x.mode,_),u.return=x,x=u}return l(x);case Ye:return S=m._init,E(x,u,S(m._payload),_)}if(kr(m))return g(x,u,m,_);if(_r(m))return N(x,u,m,_);Et(x,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,u!==null&&u.tag===6?(t(x,u.sibling),u=i(u,m),u.return=x,x=u):(t(x,u),u=ai(m,x.mode,_),u.return=x,x=u),l(x)):t(x,u)}return E}var ar=Ic(!0),Fc=Ic(!1),eo=_s(null),so=null,Xs=null,Ln=null;function On(){Ln=Xs=so=null}function In(s){var r=eo.current;M(eo),s._currentValue=r}function Ui(s,r,t){for(;s!==null;){var o=s.alternate;if((s.childLanes&r)!==r?(s.childLanes|=r,o!==null&&(o.childLanes|=r)):o!==null&&(o.childLanes&r)!==r&&(o.childLanes|=r),s===t)break;s=s.return}}function tr(s,r){so=s,Ln=Xs=null,s=s.dependencies,s!==null&&s.firstContext!==null&&(s.lanes&r&&(xe=!0),s.firstContext=null)}function Se(s){var r=s._currentValue;if(Ln!==s)if(s={context:s,memoizedValue:r,next:null},Xs===null){if(so===null)throw Error(y(308));Xs=s,so.dependencies={lanes:0,firstContext:s}}else Xs=Xs.next=s;return r}var Ps=null;function Fn(s){Ps===null?Ps=[s]:Ps.push(s)}function Mc(s,r,t,o){var i=r.interleaved;return i===null?(t.next=t,Fn(r)):(t.next=i.next,i.next=t),r.interleaved=t,Qe(s,o)}function Qe(s,r){s.lanes|=r;var t=s.alternate;for(t!==null&&(t.lanes|=r),t=s,s=s.return;s!==null;)s.childLanes|=r,t=s.alternate,t!==null&&(t.childLanes|=r),t=s,s=s.return;return t.tag===3?t.stateNode:null}var es=!1;function Mn(s){s.updateQueue={baseState:s.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Bc(s,r){s=s.updateQueue,r.updateQueue===s&&(r.updateQueue={baseState:s.baseState,firstBaseUpdate:s.firstBaseUpdate,lastBaseUpdate:s.lastBaseUpdate,shared:s.shared,effects:s.effects})}function We(s,r){return{eventTime:s,lane:r,tag:0,payload:null,callback:null,next:null}}function ds(s,r,t){var o=s.updateQueue;if(o===null)return null;if(o=o.shared,L&2){var i=o.pending;return i===null?r.next=r:(r.next=i.next,i.next=r),o.pending=r,Qe(s,t)}return i=o.interleaved,i===null?(r.next=r,Fn(o)):(r.next=i.next,i.next=r),o.interleaved=r,Qe(s,t)}function zt(s,r,t){if(r=r.updateQueue,r!==null&&(r=r.shared,(t&4194240)!==0)){var o=r.lanes;o&=s.pendingLanes,t|=o,r.lanes=t,En(s,t)}}function Hl(s,r){var t=s.updateQueue,o=s.alternate;if(o!==null&&(o=o.updateQueue,t===o)){var i=null,n=null;if(t=t.firstBaseUpdate,t!==null){do{var l={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};n===null?i=n=l:n=n.next=l,t=t.next}while(t!==null);n===null?i=n=r:n=n.next=r}else i=n=r;t={baseState:o.baseState,firstBaseUpdate:i,lastBaseUpdate:n,shared:o.shared,effects:o.effects},s.updateQueue=t;return}s=t.lastBaseUpdate,s===null?t.firstBaseUpdate=r:s.next=r,t.lastBaseUpdate=r}function ro(s,r,t,o){var i=s.updateQueue;es=!1;var n=i.firstBaseUpdate,l=i.lastBaseUpdate,c=i.shared.pending;if(c!==null){i.shared.pending=null;var d=c,h=d.next;d.next=null,l===null?n=h:l.next=h,l=d;var p=s.alternate;p!==null&&(p=p.updateQueue,c=p.lastBaseUpdate,c!==l&&(c===null?p.firstBaseUpdate=h:c.next=h,p.lastBaseUpdate=d))}if(n!==null){var j=i.baseState;l=0,p=h=d=null,c=n;do{var f=c.lane,v=c.eventTime;if((o&f)===f){p!==null&&(p=p.next={eventTime:v,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var g=s,N=c;switch(f=r,v=t,N.tag){case 1:if(g=N.payload,typeof g=="function"){j=g.call(v,j,f);break e}j=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=N.payload,f=typeof g=="function"?g.call(v,j,f):g,f==null)break e;j=J({},j,f);break e;case 2:es=!0}}c.callback!==null&&c.lane!==0&&(s.flags|=64,f=i.effects,f===null?i.effects=[c]:f.push(c))}else v={eventTime:v,lane:f,tag:c.tag,payload:c.payload,callback:c.callback,next:null},p===null?(h=p=v,d=j):p=p.next=v,l|=f;if(c=c.next,c===null){if(c=i.shared.pending,c===null)break;f=c,c=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(!0);if(p===null&&(d=j),i.baseState=d,i.firstBaseUpdate=h,i.lastBaseUpdate=p,r=i.shared.interleaved,r!==null){i=r;do l|=i.lane,i=i.next;while(i!==r)}else n===null&&(i.shared.lanes=0);Rs|=l,s.lanes=l,s.memoizedState=j}}function Wl(s,r,t){if(s=r.effects,r.effects=null,s!==null)for(r=0;r<s.length;r++){var o=s[r],i=o.callback;if(i!==null){if(o.callback=null,o=t,typeof i!="function")throw Error(y(191,i));i.call(o)}}}var at={},Ue=_s(at),Xr=_s(at),Kr=_s(at);function ks(s){if(s===at)throw Error(y(174));return s}function Bn(s,r){switch(I(Kr,r),I(Xr,s),I(Ue,at),s=r.nodeType,s){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:Ni(null,"");break;default:s=s===8?r.parentNode:r,r=s.namespaceURI||null,s=s.tagName,r=Ni(r,s)}M(Ue),I(Ue,r)}function cr(){M(Ue),M(Xr),M(Kr)}function Uc(s){ks(Kr.current);var r=ks(Ue.current),t=Ni(r,s.type);r!==t&&(I(Xr,s),I(Ue,t))}function Un(s){Xr.current===s&&(M(Ue),M(Xr))}var q=_s(0);function to(s){for(var r=s;r!==null;){if(r.tag===13){var t=r.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if(r.flags&128)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===s)break;for(;r.sibling===null;){if(r.return===null||r.return===s)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var ri=[];function qn(){for(var s=0;s<ri.length;s++)ri[s]._workInProgressVersionPrimary=null;ri.length=0}var Lt=Ke.ReactCurrentDispatcher,ti=Ke.ReactCurrentBatchConfig,Ts=0,V=null,X=null,Y=null,oo=!1,Lr=!1,Zr=0,$u=0;function oe(){throw Error(y(321))}function Vn(s,r){if(r===null)return!1;for(var t=0;t<r.length&&t<s.length;t++)if(!Oe(s[t],r[t]))return!1;return!0}function Jn(s,r,t,o,i,n){if(Ts=n,V=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,Lt.current=s===null||s.memoizedState===null?Ku:Zu,s=t(o,i),Lr){n=0;do{if(Lr=!1,Zr=0,25<=n)throw Error(y(301));n+=1,Y=X=null,r.updateQueue=null,Lt.current=Yu,s=t(o,i)}while(Lr)}if(Lt.current=io,r=X!==null&&X.next!==null,Ts=0,Y=X=V=null,oo=!1,r)throw Error(y(300));return s}function Hn(){var s=Zr!==0;return Zr=0,s}function Fe(){var s={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Y===null?V.memoizedState=Y=s:Y=Y.next=s,Y}function we(){if(X===null){var s=V.alternate;s=s!==null?s.memoizedState:null}else s=X.next;var r=Y===null?V.memoizedState:Y.next;if(r!==null)Y=r,X=s;else{if(s===null)throw Error(y(310));X=s,s={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},Y===null?V.memoizedState=Y=s:Y=Y.next=s}return Y}function Yr(s,r){return typeof r=="function"?r(s):r}function oi(s){var r=we(),t=r.queue;if(t===null)throw Error(y(311));t.lastRenderedReducer=s;var o=X,i=o.baseQueue,n=t.pending;if(n!==null){if(i!==null){var l=i.next;i.next=n.next,n.next=l}o.baseQueue=i=n,t.pending=null}if(i!==null){n=i.next,o=o.baseState;var c=l=null,d=null,h=n;do{var p=h.lane;if((Ts&p)===p)d!==null&&(d=d.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),o=h.hasEagerState?h.eagerState:s(o,h.action);else{var j={lane:p,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};d===null?(c=d=j,l=o):d=d.next=j,V.lanes|=p,Rs|=p}h=h.next}while(h!==null&&h!==n);d===null?l=o:d.next=c,Oe(o,r.memoizedState)||(xe=!0),r.memoizedState=o,r.baseState=l,r.baseQueue=d,t.lastRenderedState=o}if(s=t.interleaved,s!==null){i=s;do n=i.lane,V.lanes|=n,Rs|=n,i=i.next;while(i!==s)}else i===null&&(t.lanes=0);return[r.memoizedState,t.dispatch]}function ii(s){var r=we(),t=r.queue;if(t===null)throw Error(y(311));t.lastRenderedReducer=s;var o=t.dispatch,i=t.pending,n=r.memoizedState;if(i!==null){t.pending=null;var l=i=i.next;do n=s(n,l.action),l=l.next;while(l!==i);Oe(n,r.memoizedState)||(xe=!0),r.memoizedState=n,r.baseQueue===null&&(r.baseState=n),t.lastRenderedState=n}return[n,o]}function qc(){}function Vc(s,r){var t=V,o=we(),i=r(),n=!Oe(o.memoizedState,i);if(n&&(o.memoizedState=i,xe=!0),o=o.queue,Wn(Wc.bind(null,t,o,s),[s]),o.getSnapshot!==r||n||Y!==null&&Y.memoizedState.tag&1){if(t.flags|=2048,et(9,Hc.bind(null,t,o,i,r),void 0,null),ee===null)throw Error(y(349));Ts&30||Jc(t,r,i)}return i}function Jc(s,r,t){s.flags|=16384,s={getSnapshot:r,value:t},r=V.updateQueue,r===null?(r={lastEffect:null,stores:null},V.updateQueue=r,r.stores=[s]):(t=r.stores,t===null?r.stores=[s]:t.push(s))}function Hc(s,r,t,o){r.value=t,r.getSnapshot=o,$c(r)&&Gc(s)}function Wc(s,r,t){return t(function(){$c(r)&&Gc(s)})}function $c(s){var r=s.getSnapshot;s=s.value;try{var t=r();return!Oe(s,t)}catch{return!0}}function Gc(s){var r=Qe(s,1);r!==null&&Le(r,s,1,-1)}function $l(s){var r=Fe();return typeof s=="function"&&(s=s()),r.memoizedState=r.baseState=s,s={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Yr,lastRenderedState:s},r.queue=s,s=s.dispatch=Xu.bind(null,V,s),[r.memoizedState,s]}function et(s,r,t,o){return s={tag:s,create:r,destroy:t,deps:o,next:null},r=V.updateQueue,r===null?(r={lastEffect:null,stores:null},V.updateQueue=r,r.lastEffect=s.next=s):(t=r.lastEffect,t===null?r.lastEffect=s.next=s:(o=t.next,t.next=s,s.next=o,r.lastEffect=s)),s}function Qc(){return we().memoizedState}function Ot(s,r,t,o){var i=Fe();V.flags|=s,i.memoizedState=et(1|r,t,void 0,o===void 0?null:o)}function yo(s,r,t,o){var i=we();o=o===void 0?null:o;var n=void 0;if(X!==null){var l=X.memoizedState;if(n=l.destroy,o!==null&&Vn(o,l.deps)){i.memoizedState=et(r,t,n,o);return}}V.flags|=s,i.memoizedState=et(1|r,t,n,o)}function Gl(s,r){return Ot(8390656,8,s,r)}function Wn(s,r){return yo(2048,8,s,r)}function Xc(s,r){return yo(4,2,s,r)}function Kc(s,r){return yo(4,4,s,r)}function Zc(s,r){if(typeof r=="function")return s=s(),r(s),function(){r(null)};if(r!=null)return s=s(),r.current=s,function(){r.current=null}}function Yc(s,r,t){return t=t!=null?t.concat([s]):null,yo(4,4,Zc.bind(null,r,s),t)}function $n(){}function ed(s,r){var t=we();r=r===void 0?null:r;var o=t.memoizedState;return o!==null&&r!==null&&Vn(r,o[1])?o[0]:(t.memoizedState=[s,r],s)}function sd(s,r){var t=we();r=r===void 0?null:r;var o=t.memoizedState;return o!==null&&r!==null&&Vn(r,o[1])?o[0]:(s=s(),t.memoizedState=[s,r],s)}function rd(s,r,t){return Ts&21?(Oe(t,r)||(t=lc(),V.lanes|=t,Rs|=t,s.baseState=!0),r):(s.baseState&&(s.baseState=!1,xe=!0),s.memoizedState=t)}function Gu(s,r){var t=O;O=t!==0&&4>t?t:4,s(!0);var o=ti.transition;ti.transition={};try{s(!1),r()}finally{O=t,ti.transition=o}}function td(){return we().memoizedState}function Qu(s,r,t){var o=us(s);if(t={lane:o,action:t,hasEagerState:!1,eagerState:null,next:null},od(s))id(r,t);else if(t=Mc(s,r,t,o),t!==null){var i=ce();Le(t,s,o,i),nd(t,r,o)}}function Xu(s,r,t){var o=us(s),i={lane:o,action:t,hasEagerState:!1,eagerState:null,next:null};if(od(s))id(r,i);else{var n=s.alternate;if(s.lanes===0&&(n===null||n.lanes===0)&&(n=r.lastRenderedReducer,n!==null))try{var l=r.lastRenderedState,c=n(l,t);if(i.hasEagerState=!0,i.eagerState=c,Oe(c,l)){var d=r.interleaved;d===null?(i.next=i,Fn(r)):(i.next=d.next,d.next=i),r.interleaved=i;return}}catch{}finally{}t=Mc(s,r,i,o),t!==null&&(i=ce(),Le(t,s,o,i),nd(t,r,o))}}function od(s){var r=s.alternate;return s===V||r!==null&&r===V}function id(s,r){Lr=oo=!0;var t=s.pending;t===null?r.next=r:(r.next=t.next,t.next=r),s.pending=r}function nd(s,r,t){if(t&4194240){var o=r.lanes;o&=s.pendingLanes,t|=o,r.lanes=t,En(s,t)}}var io={readContext:Se,useCallback:oe,useContext:oe,useEffect:oe,useImperativeHandle:oe,useInsertionEffect:oe,useLayoutEffect:oe,useMemo:oe,useReducer:oe,useRef:oe,useState:oe,useDebugValue:oe,useDeferredValue:oe,useTransition:oe,useMutableSource:oe,useSyncExternalStore:oe,useId:oe,unstable_isNewReconciler:!1},Ku={readContext:Se,useCallback:function(s,r){return Fe().memoizedState=[s,r===void 0?null:r],s},useContext:Se,useEffect:Gl,useImperativeHandle:function(s,r,t){return t=t!=null?t.concat([s]):null,Ot(4194308,4,Zc.bind(null,r,s),t)},useLayoutEffect:function(s,r){return Ot(4194308,4,s,r)},useInsertionEffect:function(s,r){return Ot(4,2,s,r)},useMemo:function(s,r){var t=Fe();return r=r===void 0?null:r,s=s(),t.memoizedState=[s,r],s},useReducer:function(s,r,t){var o=Fe();return r=t!==void 0?t(r):r,o.memoizedState=o.baseState=r,s={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:s,lastRenderedState:r},o.queue=s,s=s.dispatch=Qu.bind(null,V,s),[o.memoizedState,s]},useRef:function(s){var r=Fe();return s={current:s},r.memoizedState=s},useState:$l,useDebugValue:$n,useDeferredValue:function(s){return Fe().memoizedState=s},useTransition:function(){var s=$l(!1),r=s[0];return s=Gu.bind(null,s[1]),Fe().memoizedState=s,[r,s]},useMutableSource:function(){},useSyncExternalStore:function(s,r,t){var o=V,i=Fe();if(B){if(t===void 0)throw Error(y(407));t=t()}else{if(t=r(),ee===null)throw Error(y(349));Ts&30||Jc(o,r,t)}i.memoizedState=t;var n={value:t,getSnapshot:r};return i.queue=n,Gl(Wc.bind(null,o,n,s),[s]),o.flags|=2048,et(9,Hc.bind(null,o,n,t,r),void 0,null),t},useId:function(){var s=Fe(),r=ee.identifierPrefix;if(B){var t=He,o=Je;t=(o&~(1<<32-ze(o)-1)).toString(32)+t,r=":"+r+"R"+t,t=Zr++,0<t&&(r+="H"+t.toString(32)),r+=":"}else t=$u++,r=":"+r+"r"+t.toString(32)+":";return s.memoizedState=r},unstable_isNewReconciler:!1},Zu={readContext:Se,useCallback:ed,useContext:Se,useEffect:Wn,useImperativeHandle:Yc,useInsertionEffect:Xc,useLayoutEffect:Kc,useMemo:sd,useReducer:oi,useRef:Qc,useState:function(){return oi(Yr)},useDebugValue:$n,useDeferredValue:function(s){var r=we();return rd(r,X.memoizedState,s)},useTransition:function(){var s=oi(Yr)[0],r=we().memoizedState;return[s,r]},useMutableSource:qc,useSyncExternalStore:Vc,useId:td,unstable_isNewReconciler:!1},Yu={readContext:Se,useCallback:ed,useContext:Se,useEffect:Wn,useImperativeHandle:Yc,useInsertionEffect:Xc,useLayoutEffect:Kc,useMemo:sd,useReducer:ii,useRef:Qc,useState:function(){return ii(Yr)},useDebugValue:$n,useDeferredValue:function(s){var r=we();return X===null?r.memoizedState=s:rd(r,X.memoizedState,s)},useTransition:function(){var s=ii(Yr)[0],r=we().memoizedState;return[s,r]},useMutableSource:qc,useSyncExternalStore:Vc,useId:td,unstable_isNewReconciler:!1};function De(s,r){if(s&&s.defaultProps){r=J({},r),s=s.defaultProps;for(var t in s)r[t]===void 0&&(r[t]=s[t]);return r}return r}function qi(s,r,t,o){r=s.memoizedState,t=t(o,r),t=t==null?r:J({},r,t),s.memoizedState=t,s.lanes===0&&(s.updateQueue.baseState=t)}var Co={isMounted:function(s){return(s=s._reactInternals)?Os(s)===s:!1},enqueueSetState:function(s,r,t){s=s._reactInternals;var o=ce(),i=us(s),n=We(o,i);n.payload=r,t!=null&&(n.callback=t),r=ds(s,n,i),r!==null&&(Le(r,s,i,o),zt(r,s,i))},enqueueReplaceState:function(s,r,t){s=s._reactInternals;var o=ce(),i=us(s),n=We(o,i);n.tag=1,n.payload=r,t!=null&&(n.callback=t),r=ds(s,n,i),r!==null&&(Le(r,s,i,o),zt(r,s,i))},enqueueForceUpdate:function(s,r){s=s._reactInternals;var t=ce(),o=us(s),i=We(t,o);i.tag=2,r!=null&&(i.callback=r),r=ds(s,i,o),r!==null&&(Le(r,s,o,t),zt(r,s,o))}};function Ql(s,r,t,o,i,n,l){return s=s.stateNode,typeof s.shouldComponentUpdate=="function"?s.shouldComponentUpdate(o,n,l):r.prototype&&r.prototype.isPureReactComponent?!Wr(t,o)||!Wr(i,n):!0}function ld(s,r,t){var o=!1,i=ps,n=r.contextType;return typeof n=="object"&&n!==null?n=Se(n):(i=je(r)?As:le.current,o=r.contextTypes,n=(o=o!=null)?nr(s,i):ps),r=new r(t,n),s.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Co,s.stateNode=r,r._reactInternals=s,o&&(s=s.stateNode,s.__reactInternalMemoizedUnmaskedChildContext=i,s.__reactInternalMemoizedMaskedChildContext=n),r}function Xl(s,r,t,o){s=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(t,o),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(t,o),r.state!==s&&Co.enqueueReplaceState(r,r.state,null)}function Vi(s,r,t,o){var i=s.stateNode;i.props=t,i.state=s.memoizedState,i.refs={},Mn(s);var n=r.contextType;typeof n=="object"&&n!==null?i.context=Se(n):(n=je(r)?As:le.current,i.context=nr(s,n)),i.state=s.memoizedState,n=r.getDerivedStateFromProps,typeof n=="function"&&(qi(s,r,n,t),i.state=s.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(r=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),r!==i.state&&Co.enqueueReplaceState(i,i.state,null),ro(s,t,i,o),i.state=s.memoizedState),typeof i.componentDidMount=="function"&&(s.flags|=4194308)}function dr(s,r){try{var t="",o=r;do t+=kh(o),o=o.return;while(o);var i=t}catch(n){i=`
Error generating stack: `+n.message+`
`+n.stack}return{value:s,source:r,stack:i,digest:null}}function ni(s,r,t){return{value:s,source:null,stack:t??null,digest:r??null}}function Ji(s,r){try{console.error(r.value)}catch(t){setTimeout(function(){throw t})}}var ex=typeof WeakMap=="function"?WeakMap:Map;function ad(s,r,t){t=We(-1,t),t.tag=3,t.payload={element:null};var o=r.value;return t.callback=function(){lo||(lo=!0,en=o),Ji(s,r)},t}function cd(s,r,t){t=We(-1,t),t.tag=3;var o=s.type.getDerivedStateFromError;if(typeof o=="function"){var i=r.value;t.payload=function(){return o(i)},t.callback=function(){Ji(s,r)}}var n=s.stateNode;return n!==null&&typeof n.componentDidCatch=="function"&&(t.callback=function(){Ji(s,r),typeof o!="function"&&(hs===null?hs=new Set([this]):hs.add(this));var l=r.stack;this.componentDidCatch(r.value,{componentStack:l!==null?l:""})}),t}function Kl(s,r,t){var o=s.pingCache;if(o===null){o=s.pingCache=new ex;var i=new Set;o.set(r,i)}else i=o.get(r),i===void 0&&(i=new Set,o.set(r,i));i.has(t)||(i.add(t),s=mx.bind(null,s,r,t),r.then(s,s))}function Zl(s){do{var r;if((r=s.tag===13)&&(r=s.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return s;s=s.return}while(s!==null);return null}function Yl(s,r,t,o,i){return s.mode&1?(s.flags|=65536,s.lanes=i,s):(s===r?s.flags|=65536:(s.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(r=We(-1,1),r.tag=2,ds(t,r,1))),t.lanes|=1),s)}var sx=Ke.ReactCurrentOwner,xe=!1;function ae(s,r,t,o){r.child=s===null?Fc(r,null,t,o):ar(r,s.child,t,o)}function ea(s,r,t,o,i){t=t.render;var n=r.ref;return tr(r,i),o=Jn(s,r,t,o,n,i),t=Hn(),s!==null&&!xe?(r.updateQueue=s.updateQueue,r.flags&=-2053,s.lanes&=~i,Xe(s,r,i)):(B&&t&&Tn(r),r.flags|=1,ae(s,r,o,i),r.child)}function sa(s,r,t,o,i){if(s===null){var n=t.type;return typeof n=="function"&&!sl(n)&&n.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(r.tag=15,r.type=n,dd(s,r,n,o,i)):(s=Bt(t.type,null,o,r,r.mode,i),s.ref=r.ref,s.return=r,r.child=s)}if(n=s.child,!(s.lanes&i)){var l=n.memoizedProps;if(t=t.compare,t=t!==null?t:Wr,t(l,o)&&s.ref===r.ref)return Xe(s,r,i)}return r.flags|=1,s=xs(n,o),s.ref=r.ref,s.return=r,r.child=s}function dd(s,r,t,o,i){if(s!==null){var n=s.memoizedProps;if(Wr(n,o)&&s.ref===r.ref)if(xe=!1,r.pendingProps=o=n,(s.lanes&i)!==0)s.flags&131072&&(xe=!0);else return r.lanes=s.lanes,Xe(s,r,i)}return Hi(s,r,t,o,i)}function hd(s,r,t){var o=r.pendingProps,i=o.children,n=s!==null?s.memoizedState:null;if(o.mode==="hidden")if(!(r.mode&1))r.memoizedState={baseLanes:0,cachePool:null,transitions:null},I(Zs,_e),_e|=t;else{if(!(t&1073741824))return s=n!==null?n.baseLanes|t:t,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:s,cachePool:null,transitions:null},r.updateQueue=null,I(Zs,_e),_e|=s,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},o=n!==null?n.baseLanes:t,I(Zs,_e),_e|=o}else n!==null?(o=n.baseLanes|t,r.memoizedState=null):o=t,I(Zs,_e),_e|=o;return ae(s,r,i,t),r.child}function ud(s,r){var t=r.ref;(s===null&&t!==null||s!==null&&s.ref!==t)&&(r.flags|=512,r.flags|=2097152)}function Hi(s,r,t,o,i){var n=je(t)?As:le.current;return n=nr(r,n),tr(r,i),t=Jn(s,r,t,o,n,i),o=Hn(),s!==null&&!xe?(r.updateQueue=s.updateQueue,r.flags&=-2053,s.lanes&=~i,Xe(s,r,i)):(B&&o&&Tn(r),r.flags|=1,ae(s,r,t,i),r.child)}function ra(s,r,t,o,i){if(je(t)){var n=!0;Kt(r)}else n=!1;if(tr(r,i),r.stateNode===null)It(s,r),ld(r,t,o),Vi(r,t,o,i),o=!0;else if(s===null){var l=r.stateNode,c=r.memoizedProps;l.props=c;var d=l.context,h=t.contextType;typeof h=="object"&&h!==null?h=Se(h):(h=je(t)?As:le.current,h=nr(r,h));var p=t.getDerivedStateFromProps,j=typeof p=="function"||typeof l.getSnapshotBeforeUpdate=="function";j||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==o||d!==h)&&Xl(r,l,o,h),es=!1;var f=r.memoizedState;l.state=f,ro(r,o,l,i),d=r.memoizedState,c!==o||f!==d||me.current||es?(typeof p=="function"&&(qi(r,t,p,o),d=r.memoizedState),(c=es||Ql(r,t,c,o,f,d,h))?(j||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(r.flags|=4194308)):(typeof l.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=o,r.memoizedState=d),l.props=o,l.state=d,l.context=h,o=c):(typeof l.componentDidMount=="function"&&(r.flags|=4194308),o=!1)}else{l=r.stateNode,Bc(s,r),c=r.memoizedProps,h=r.type===r.elementType?c:De(r.type,c),l.props=h,j=r.pendingProps,f=l.context,d=t.contextType,typeof d=="object"&&d!==null?d=Se(d):(d=je(t)?As:le.current,d=nr(r,d));var v=t.getDerivedStateFromProps;(p=typeof v=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==j||f!==d)&&Xl(r,l,o,d),es=!1,f=r.memoizedState,l.state=f,ro(r,o,l,i);var g=r.memoizedState;c!==j||f!==g||me.current||es?(typeof v=="function"&&(qi(r,t,v,o),g=r.memoizedState),(h=es||Ql(r,t,h,o,f,g,d)||!1)?(p||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(o,g,d),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(o,g,d)),typeof l.componentDidUpdate=="function"&&(r.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof l.componentDidUpdate!="function"||c===s.memoizedProps&&f===s.memoizedState||(r.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===s.memoizedProps&&f===s.memoizedState||(r.flags|=1024),r.memoizedProps=o,r.memoizedState=g),l.props=o,l.state=g,l.context=d,o=h):(typeof l.componentDidUpdate!="function"||c===s.memoizedProps&&f===s.memoizedState||(r.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===s.memoizedProps&&f===s.memoizedState||(r.flags|=1024),o=!1)}return Wi(s,r,t,o,n,i)}function Wi(s,r,t,o,i,n){ud(s,r);var l=(r.flags&128)!==0;if(!o&&!l)return i&&Ul(r,t,!1),Xe(s,r,n);o=r.stateNode,sx.current=r;var c=l&&typeof t.getDerivedStateFromError!="function"?null:o.render();return r.flags|=1,s!==null&&l?(r.child=ar(r,s.child,null,n),r.child=ar(r,null,c,n)):ae(s,r,c,n),r.memoizedState=o.state,i&&Ul(r,t,!0),r.child}function xd(s){var r=s.stateNode;r.pendingContext?Bl(s,r.pendingContext,r.pendingContext!==r.context):r.context&&Bl(s,r.context,!1),Bn(s,r.containerInfo)}function ta(s,r,t,o,i){return lr(),zn(i),r.flags|=256,ae(s,r,t,o),r.child}var $i={dehydrated:null,treeContext:null,retryLane:0};function Gi(s){return{baseLanes:s,cachePool:null,transitions:null}}function md(s,r,t){var o=r.pendingProps,i=q.current,n=!1,l=(r.flags&128)!==0,c;if((c=l)||(c=s!==null&&s.memoizedState===null?!1:(i&2)!==0),c?(n=!0,r.flags&=-129):(s===null||s.memoizedState!==null)&&(i|=1),I(q,i&1),s===null)return Bi(r),s=r.memoizedState,s!==null&&(s=s.dehydrated,s!==null)?(r.mode&1?s.data==="$!"?r.lanes=8:r.lanes=1073741824:r.lanes=1,null):(l=o.children,s=o.fallback,n?(o=r.mode,n=r.child,l={mode:"hidden",children:l},!(o&1)&&n!==null?(n.childLanes=0,n.pendingProps=l):n=Po(l,o,0,null),s=ws(s,o,t,null),n.return=r,s.return=r,n.sibling=s,r.child=n,r.child.memoizedState=Gi(t),r.memoizedState=$i,s):Gn(r,l));if(i=s.memoizedState,i!==null&&(c=i.dehydrated,c!==null))return rx(s,r,l,o,c,i,t);if(n){n=o.fallback,l=r.mode,i=s.child,c=i.sibling;var d={mode:"hidden",children:o.children};return!(l&1)&&r.child!==i?(o=r.child,o.childLanes=0,o.pendingProps=d,r.deletions=null):(o=xs(i,d),o.subtreeFlags=i.subtreeFlags&14680064),c!==null?n=xs(c,n):(n=ws(n,l,t,null),n.flags|=2),n.return=r,o.return=r,o.sibling=n,r.child=o,o=n,n=r.child,l=s.child.memoizedState,l=l===null?Gi(t):{baseLanes:l.baseLanes|t,cachePool:null,transitions:l.transitions},n.memoizedState=l,n.childLanes=s.childLanes&~t,r.memoizedState=$i,o}return n=s.child,s=n.sibling,o=xs(n,{mode:"visible",children:o.children}),!(r.mode&1)&&(o.lanes=t),o.return=r,o.sibling=null,s!==null&&(t=r.deletions,t===null?(r.deletions=[s],r.flags|=16):t.push(s)),r.child=o,r.memoizedState=null,o}function Gn(s,r){return r=Po({mode:"visible",children:r},s.mode,0,null),r.return=s,s.child=r}function bt(s,r,t,o){return o!==null&&zn(o),ar(r,s.child,null,t),s=Gn(r,r.pendingProps.children),s.flags|=2,r.memoizedState=null,s}function rx(s,r,t,o,i,n,l){if(t)return r.flags&256?(r.flags&=-257,o=ni(Error(y(422))),bt(s,r,l,o)):r.memoizedState!==null?(r.child=s.child,r.flags|=128,null):(n=o.fallback,i=r.mode,o=Po({mode:"visible",children:o.children},i,0,null),n=ws(n,i,l,null),n.flags|=2,o.return=r,n.return=r,o.sibling=n,r.child=o,r.mode&1&&ar(r,s.child,null,l),r.child.memoizedState=Gi(l),r.memoizedState=$i,n);if(!(r.mode&1))return bt(s,r,l,null);if(i.data==="$!"){if(o=i.nextSibling&&i.nextSibling.dataset,o)var c=o.dgst;return o=c,n=Error(y(419)),o=ni(n,o,void 0),bt(s,r,l,o)}if(c=(l&s.childLanes)!==0,xe||c){if(o=ee,o!==null){switch(l&-l){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(o.suspendedLanes|l)?0:i,i!==0&&i!==n.retryLane&&(n.retryLane=i,Qe(s,i),Le(o,s,i,-1))}return el(),o=ni(Error(y(421))),bt(s,r,l,o)}return i.data==="$?"?(r.flags|=128,r.child=s.child,r=jx.bind(null,s),i._reactRetry=r,null):(s=n.treeContext,ge=cs(i.nextSibling),ve=r,B=!0,Re=null,s!==null&&(Ee[be++]=Je,Ee[be++]=He,Ee[be++]=Ds,Je=s.id,He=s.overflow,Ds=r),r=Gn(r,o.children),r.flags|=4096,r)}function oa(s,r,t){s.lanes|=r;var o=s.alternate;o!==null&&(o.lanes|=r),Ui(s.return,r,t)}function li(s,r,t,o,i){var n=s.memoizedState;n===null?s.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:o,tail:t,tailMode:i}:(n.isBackwards=r,n.rendering=null,n.renderingStartTime=0,n.last=o,n.tail=t,n.tailMode=i)}function jd(s,r,t){var o=r.pendingProps,i=o.revealOrder,n=o.tail;if(ae(s,r,o.children,t),o=q.current,o&2)o=o&1|2,r.flags|=128;else{if(s!==null&&s.flags&128)e:for(s=r.child;s!==null;){if(s.tag===13)s.memoizedState!==null&&oa(s,t,r);else if(s.tag===19)oa(s,t,r);else if(s.child!==null){s.child.return=s,s=s.child;continue}if(s===r)break e;for(;s.sibling===null;){if(s.return===null||s.return===r)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}o&=1}if(I(q,o),!(r.mode&1))r.memoizedState=null;else switch(i){case"forwards":for(t=r.child,i=null;t!==null;)s=t.alternate,s!==null&&to(s)===null&&(i=t),t=t.sibling;t=i,t===null?(i=r.child,r.child=null):(i=t.sibling,t.sibling=null),li(r,!1,i,t,n);break;case"backwards":for(t=null,i=r.child,r.child=null;i!==null;){if(s=i.alternate,s!==null&&to(s)===null){r.child=i;break}s=i.sibling,i.sibling=t,t=i,i=s}li(r,!0,t,null,n);break;case"together":li(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function It(s,r){!(r.mode&1)&&s!==null&&(s.alternate=null,r.alternate=null,r.flags|=2)}function Xe(s,r,t){if(s!==null&&(r.dependencies=s.dependencies),Rs|=r.lanes,!(t&r.childLanes))return null;if(s!==null&&r.child!==s.child)throw Error(y(153));if(r.child!==null){for(s=r.child,t=xs(s,s.pendingProps),r.child=t,t.return=r;s.sibling!==null;)s=s.sibling,t=t.sibling=xs(s,s.pendingProps),t.return=r;t.sibling=null}return r.child}function tx(s,r,t){switch(r.tag){case 3:xd(r),lr();break;case 5:Uc(r);break;case 1:je(r.type)&&Kt(r);break;case 4:Bn(r,r.stateNode.containerInfo);break;case 10:var o=r.type._context,i=r.memoizedProps.value;I(eo,o._currentValue),o._currentValue=i;break;case 13:if(o=r.memoizedState,o!==null)return o.dehydrated!==null?(I(q,q.current&1),r.flags|=128,null):t&r.child.childLanes?md(s,r,t):(I(q,q.current&1),s=Xe(s,r,t),s!==null?s.sibling:null);I(q,q.current&1);break;case 19:if(o=(t&r.childLanes)!==0,s.flags&128){if(o)return jd(s,r,t);r.flags|=128}if(i=r.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),I(q,q.current),o)break;return null;case 22:case 23:return r.lanes=0,hd(s,r,t)}return Xe(s,r,t)}var pd,Qi,fd,_d;pd=function(s,r){for(var t=r.child;t!==null;){if(t.tag===5||t.tag===6)s.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===r)break;for(;t.sibling===null;){if(t.return===null||t.return===r)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Qi=function(){};fd=function(s,r,t,o){var i=s.memoizedProps;if(i!==o){s=r.stateNode,ks(Ue.current);var n=null;switch(t){case"input":i=fi(s,i),o=fi(s,o),n=[];break;case"select":i=J({},i,{value:void 0}),o=J({},o,{value:void 0}),n=[];break;case"textarea":i=vi(s,i),o=vi(s,o),n=[];break;default:typeof i.onClick!="function"&&typeof o.onClick=="function"&&(s.onclick=Qt)}yi(t,o);var l;t=null;for(h in i)if(!o.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var c=i[h];for(l in c)c.hasOwnProperty(l)&&(t||(t={}),t[l]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(Mr.hasOwnProperty(h)?n||(n=[]):(n=n||[]).push(h,null));for(h in o){var d=o[h];if(c=i!=null?i[h]:void 0,o.hasOwnProperty(h)&&d!==c&&(d!=null||c!=null))if(h==="style")if(c){for(l in c)!c.hasOwnProperty(l)||d&&d.hasOwnProperty(l)||(t||(t={}),t[l]="");for(l in d)d.hasOwnProperty(l)&&c[l]!==d[l]&&(t||(t={}),t[l]=d[l])}else t||(n||(n=[]),n.push(h,t)),t=d;else h==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,c=c?c.__html:void 0,d!=null&&c!==d&&(n=n||[]).push(h,d)):h==="children"?typeof d!="string"&&typeof d!="number"||(n=n||[]).push(h,""+d):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(Mr.hasOwnProperty(h)?(d!=null&&h==="onScroll"&&F("scroll",s),n||c===d||(n=[])):(n=n||[]).push(h,d))}t&&(n=n||[]).push("style",t);var h=n;(r.updateQueue=h)&&(r.flags|=4)}};_d=function(s,r,t,o){t!==o&&(r.flags|=4)};function Er(s,r){if(!B)switch(s.tailMode){case"hidden":r=s.tail;for(var t=null;r!==null;)r.alternate!==null&&(t=r),r=r.sibling;t===null?s.tail=null:t.sibling=null;break;case"collapsed":t=s.tail;for(var o=null;t!==null;)t.alternate!==null&&(o=t),t=t.sibling;o===null?r||s.tail===null?s.tail=null:s.tail.sibling=null:o.sibling=null}}function ie(s){var r=s.alternate!==null&&s.alternate.child===s.child,t=0,o=0;if(r)for(var i=s.child;i!==null;)t|=i.lanes|i.childLanes,o|=i.subtreeFlags&14680064,o|=i.flags&14680064,i.return=s,i=i.sibling;else for(i=s.child;i!==null;)t|=i.lanes|i.childLanes,o|=i.subtreeFlags,o|=i.flags,i.return=s,i=i.sibling;return s.subtreeFlags|=o,s.childLanes=t,r}function ox(s,r,t){var o=r.pendingProps;switch(Rn(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ie(r),null;case 1:return je(r.type)&&Xt(),ie(r),null;case 3:return o=r.stateNode,cr(),M(me),M(le),qn(),o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),(s===null||s.child===null)&&(Ct(r)?r.flags|=4:s===null||s.memoizedState.isDehydrated&&!(r.flags&256)||(r.flags|=1024,Re!==null&&(tn(Re),Re=null))),Qi(s,r),ie(r),null;case 5:Un(r);var i=ks(Kr.current);if(t=r.type,s!==null&&r.stateNode!=null)fd(s,r,t,o,i),s.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!o){if(r.stateNode===null)throw Error(y(166));return ie(r),null}if(s=ks(Ue.current),Ct(r)){o=r.stateNode,t=r.type;var n=r.memoizedProps;switch(o[Me]=r,o[Qr]=n,s=(r.mode&1)!==0,t){case"dialog":F("cancel",o),F("close",o);break;case"iframe":case"object":case"embed":F("load",o);break;case"video":case"audio":for(i=0;i<wr.length;i++)F(wr[i],o);break;case"source":F("error",o);break;case"img":case"image":case"link":F("error",o),F("load",o);break;case"details":F("toggle",o);break;case"input":xl(o,n),F("invalid",o);break;case"select":o._wrapperState={wasMultiple:!!n.multiple},F("invalid",o);break;case"textarea":jl(o,n),F("invalid",o)}yi(t,n),i=null;for(var l in n)if(n.hasOwnProperty(l)){var c=n[l];l==="children"?typeof c=="string"?o.textContent!==c&&(n.suppressHydrationWarning!==!0&&yt(o.textContent,c,s),i=["children",c]):typeof c=="number"&&o.textContent!==""+c&&(n.suppressHydrationWarning!==!0&&yt(o.textContent,c,s),i=["children",""+c]):Mr.hasOwnProperty(l)&&c!=null&&l==="onScroll"&&F("scroll",o)}switch(t){case"input":mt(o),ml(o,n,!0);break;case"textarea":mt(o),pl(o);break;case"select":case"option":break;default:typeof n.onClick=="function"&&(o.onclick=Qt)}o=i,r.updateQueue=o,o!==null&&(r.flags|=4)}else{l=i.nodeType===9?i:i.ownerDocument,s==="http://www.w3.org/1999/xhtml"&&(s=Wa(t)),s==="http://www.w3.org/1999/xhtml"?t==="script"?(s=l.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild)):typeof o.is=="string"?s=l.createElement(t,{is:o.is}):(s=l.createElement(t),t==="select"&&(l=s,o.multiple?l.multiple=!0:o.size&&(l.size=o.size))):s=l.createElementNS(s,t),s[Me]=r,s[Qr]=o,pd(s,r,!1,!1),r.stateNode=s;e:{switch(l=Ci(t,o),t){case"dialog":F("cancel",s),F("close",s),i=o;break;case"iframe":case"object":case"embed":F("load",s),i=o;break;case"video":case"audio":for(i=0;i<wr.length;i++)F(wr[i],s);i=o;break;case"source":F("error",s),i=o;break;case"img":case"image":case"link":F("error",s),F("load",s),i=o;break;case"details":F("toggle",s),i=o;break;case"input":xl(s,o),i=fi(s,o),F("invalid",s);break;case"option":i=o;break;case"select":s._wrapperState={wasMultiple:!!o.multiple},i=J({},o,{value:void 0}),F("invalid",s);break;case"textarea":jl(s,o),i=vi(s,o),F("invalid",s);break;default:i=o}yi(t,i),c=i;for(n in c)if(c.hasOwnProperty(n)){var d=c[n];n==="style"?Qa(s,d):n==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&$a(s,d)):n==="children"?typeof d=="string"?(t!=="textarea"||d!=="")&&Br(s,d):typeof d=="number"&&Br(s,""+d):n!=="suppressContentEditableWarning"&&n!=="suppressHydrationWarning"&&n!=="autoFocus"&&(Mr.hasOwnProperty(n)?d!=null&&n==="onScroll"&&F("scroll",s):d!=null&&_n(s,n,d,l))}switch(t){case"input":mt(s),ml(s,o,!1);break;case"textarea":mt(s),pl(s);break;case"option":o.value!=null&&s.setAttribute("value",""+js(o.value));break;case"select":s.multiple=!!o.multiple,n=o.value,n!=null?Ys(s,!!o.multiple,n,!1):o.defaultValue!=null&&Ys(s,!!o.multiple,o.defaultValue,!0);break;default:typeof i.onClick=="function"&&(s.onclick=Qt)}switch(t){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}}o&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return ie(r),null;case 6:if(s&&r.stateNode!=null)_d(s,r,s.memoizedProps,o);else{if(typeof o!="string"&&r.stateNode===null)throw Error(y(166));if(t=ks(Kr.current),ks(Ue.current),Ct(r)){if(o=r.stateNode,t=r.memoizedProps,o[Me]=r,(n=o.nodeValue!==t)&&(s=ve,s!==null))switch(s.tag){case 3:yt(o.nodeValue,t,(s.mode&1)!==0);break;case 5:s.memoizedProps.suppressHydrationWarning!==!0&&yt(o.nodeValue,t,(s.mode&1)!==0)}n&&(r.flags|=4)}else o=(t.nodeType===9?t:t.ownerDocument).createTextNode(o),o[Me]=r,r.stateNode=o}return ie(r),null;case 13:if(M(q),o=r.memoizedState,s===null||s.memoizedState!==null&&s.memoizedState.dehydrated!==null){if(B&&ge!==null&&r.mode&1&&!(r.flags&128))Oc(),lr(),r.flags|=98560,n=!1;else if(n=Ct(r),o!==null&&o.dehydrated!==null){if(s===null){if(!n)throw Error(y(318));if(n=r.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(y(317));n[Me]=r}else lr(),!(r.flags&128)&&(r.memoizedState=null),r.flags|=4;ie(r),n=!1}else Re!==null&&(tn(Re),Re=null),n=!0;if(!n)return r.flags&65536?r:null}return r.flags&128?(r.lanes=t,r):(o=o!==null,o!==(s!==null&&s.memoizedState!==null)&&o&&(r.child.flags|=8192,r.mode&1&&(s===null||q.current&1?K===0&&(K=3):el())),r.updateQueue!==null&&(r.flags|=4),ie(r),null);case 4:return cr(),Qi(s,r),s===null&&$r(r.stateNode.containerInfo),ie(r),null;case 10:return In(r.type._context),ie(r),null;case 17:return je(r.type)&&Xt(),ie(r),null;case 19:if(M(q),n=r.memoizedState,n===null)return ie(r),null;if(o=(r.flags&128)!==0,l=n.rendering,l===null)if(o)Er(n,!1);else{if(K!==0||s!==null&&s.flags&128)for(s=r.child;s!==null;){if(l=to(s),l!==null){for(r.flags|=128,Er(n,!1),o=l.updateQueue,o!==null&&(r.updateQueue=o,r.flags|=4),r.subtreeFlags=0,o=t,t=r.child;t!==null;)n=t,s=o,n.flags&=14680066,l=n.alternate,l===null?(n.childLanes=0,n.lanes=s,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=l.childLanes,n.lanes=l.lanes,n.child=l.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=l.memoizedProps,n.memoizedState=l.memoizedState,n.updateQueue=l.updateQueue,n.type=l.type,s=l.dependencies,n.dependencies=s===null?null:{lanes:s.lanes,firstContext:s.firstContext}),t=t.sibling;return I(q,q.current&1|2),r.child}s=s.sibling}n.tail!==null&&G()>hr&&(r.flags|=128,o=!0,Er(n,!1),r.lanes=4194304)}else{if(!o)if(s=to(l),s!==null){if(r.flags|=128,o=!0,t=s.updateQueue,t!==null&&(r.updateQueue=t,r.flags|=4),Er(n,!0),n.tail===null&&n.tailMode==="hidden"&&!l.alternate&&!B)return ie(r),null}else 2*G()-n.renderingStartTime>hr&&t!==1073741824&&(r.flags|=128,o=!0,Er(n,!1),r.lanes=4194304);n.isBackwards?(l.sibling=r.child,r.child=l):(t=n.last,t!==null?t.sibling=l:r.child=l,n.last=l)}return n.tail!==null?(r=n.tail,n.rendering=r,n.tail=r.sibling,n.renderingStartTime=G(),r.sibling=null,t=q.current,I(q,o?t&1|2:t&1),r):(ie(r),null);case 22:case 23:return Yn(),o=r.memoizedState!==null,s!==null&&s.memoizedState!==null!==o&&(r.flags|=8192),o&&r.mode&1?_e&1073741824&&(ie(r),r.subtreeFlags&6&&(r.flags|=8192)):ie(r),null;case 24:return null;case 25:return null}throw Error(y(156,r.tag))}function ix(s,r){switch(Rn(r),r.tag){case 1:return je(r.type)&&Xt(),s=r.flags,s&65536?(r.flags=s&-65537|128,r):null;case 3:return cr(),M(me),M(le),qn(),s=r.flags,s&65536&&!(s&128)?(r.flags=s&-65537|128,r):null;case 5:return Un(r),null;case 13:if(M(q),s=r.memoizedState,s!==null&&s.dehydrated!==null){if(r.alternate===null)throw Error(y(340));lr()}return s=r.flags,s&65536?(r.flags=s&-65537|128,r):null;case 19:return M(q),null;case 4:return cr(),null;case 10:return In(r.type._context),null;case 22:case 23:return Yn(),null;case 24:return null;default:return null}}var Pt=!1,ne=!1,nx=typeof WeakSet=="function"?WeakSet:Set,P=null;function Ks(s,r){var t=s.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(o){H(s,r,o)}else t.current=null}function Xi(s,r,t){try{t()}catch(o){H(s,r,o)}}var ia=!1;function lx(s,r){if(Ri=Wt,s=Cc(),Dn(s)){if("selectionStart"in s)var t={start:s.selectionStart,end:s.selectionEnd};else e:{t=(t=s.ownerDocument)&&t.defaultView||window;var o=t.getSelection&&t.getSelection();if(o&&o.rangeCount!==0){t=o.anchorNode;var i=o.anchorOffset,n=o.focusNode;o=o.focusOffset;try{t.nodeType,n.nodeType}catch{t=null;break e}var l=0,c=-1,d=-1,h=0,p=0,j=s,f=null;s:for(;;){for(var v;j!==t||i!==0&&j.nodeType!==3||(c=l+i),j!==n||o!==0&&j.nodeType!==3||(d=l+o),j.nodeType===3&&(l+=j.nodeValue.length),(v=j.firstChild)!==null;)f=j,j=v;for(;;){if(j===s)break s;if(f===t&&++h===i&&(c=l),f===n&&++p===o&&(d=l),(v=j.nextSibling)!==null)break;j=f,f=j.parentNode}j=v}t=c===-1||d===-1?null:{start:c,end:d}}else t=null}t=t||{start:0,end:0}}else t=null;for(zi={focusedElem:s,selectionRange:t},Wt=!1,P=r;P!==null;)if(r=P,s=r.child,(r.subtreeFlags&1028)!==0&&s!==null)s.return=r,P=s;else for(;P!==null;){r=P;try{var g=r.alternate;if(r.flags&1024)switch(r.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var N=g.memoizedProps,E=g.memoizedState,x=r.stateNode,u=x.getSnapshotBeforeUpdate(r.elementType===r.type?N:De(r.type,N),E);x.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var m=r.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(y(163))}}catch(_){H(r,r.return,_)}if(s=r.sibling,s!==null){s.return=r.return,P=s;break}P=r.return}return g=ia,ia=!1,g}function Or(s,r,t){var o=r.updateQueue;if(o=o!==null?o.lastEffect:null,o!==null){var i=o=o.next;do{if((i.tag&s)===s){var n=i.destroy;i.destroy=void 0,n!==void 0&&Xi(r,t,n)}i=i.next}while(i!==o)}}function Eo(s,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var t=r=r.next;do{if((t.tag&s)===s){var o=t.create;t.destroy=o()}t=t.next}while(t!==r)}}function Ki(s){var r=s.ref;if(r!==null){var t=s.stateNode;switch(s.tag){case 5:s=t;break;default:s=t}typeof r=="function"?r(s):r.current=s}}function gd(s){var r=s.alternate;r!==null&&(s.alternate=null,gd(r)),s.child=null,s.deletions=null,s.sibling=null,s.tag===5&&(r=s.stateNode,r!==null&&(delete r[Me],delete r[Qr],delete r[Ii],delete r[Vu],delete r[Ju])),s.stateNode=null,s.return=null,s.dependencies=null,s.memoizedProps=null,s.memoizedState=null,s.pendingProps=null,s.stateNode=null,s.updateQueue=null}function vd(s){return s.tag===5||s.tag===3||s.tag===4}function na(s){e:for(;;){for(;s.sibling===null;){if(s.return===null||vd(s.return))return null;s=s.return}for(s.sibling.return=s.return,s=s.sibling;s.tag!==5&&s.tag!==6&&s.tag!==18;){if(s.flags&2||s.child===null||s.tag===4)continue e;s.child.return=s,s=s.child}if(!(s.flags&2))return s.stateNode}}function Zi(s,r,t){var o=s.tag;if(o===5||o===6)s=s.stateNode,r?t.nodeType===8?t.parentNode.insertBefore(s,r):t.insertBefore(s,r):(t.nodeType===8?(r=t.parentNode,r.insertBefore(s,t)):(r=t,r.appendChild(s)),t=t._reactRootContainer,t!=null||r.onclick!==null||(r.onclick=Qt));else if(o!==4&&(s=s.child,s!==null))for(Zi(s,r,t),s=s.sibling;s!==null;)Zi(s,r,t),s=s.sibling}function Yi(s,r,t){var o=s.tag;if(o===5||o===6)s=s.stateNode,r?t.insertBefore(s,r):t.appendChild(s);else if(o!==4&&(s=s.child,s!==null))for(Yi(s,r,t),s=s.sibling;s!==null;)Yi(s,r,t),s=s.sibling}var se=null,Te=!1;function Ze(s,r,t){for(t=t.child;t!==null;)Nd(s,r,t),t=t.sibling}function Nd(s,r,t){if(Be&&typeof Be.onCommitFiberUnmount=="function")try{Be.onCommitFiberUnmount(po,t)}catch{}switch(t.tag){case 5:ne||Ks(t,r);case 6:var o=se,i=Te;se=null,Ze(s,r,t),se=o,Te=i,se!==null&&(Te?(s=se,t=t.stateNode,s.nodeType===8?s.parentNode.removeChild(t):s.removeChild(t)):se.removeChild(t.stateNode));break;case 18:se!==null&&(Te?(s=se,t=t.stateNode,s.nodeType===8?ei(s.parentNode,t):s.nodeType===1&&ei(s,t),Jr(s)):ei(se,t.stateNode));break;case 4:o=se,i=Te,se=t.stateNode.containerInfo,Te=!0,Ze(s,r,t),se=o,Te=i;break;case 0:case 11:case 14:case 15:if(!ne&&(o=t.updateQueue,o!==null&&(o=o.lastEffect,o!==null))){i=o=o.next;do{var n=i,l=n.destroy;n=n.tag,l!==void 0&&(n&2||n&4)&&Xi(t,r,l),i=i.next}while(i!==o)}Ze(s,r,t);break;case 1:if(!ne&&(Ks(t,r),o=t.stateNode,typeof o.componentWillUnmount=="function"))try{o.props=t.memoizedProps,o.state=t.memoizedState,o.componentWillUnmount()}catch(c){H(t,r,c)}Ze(s,r,t);break;case 21:Ze(s,r,t);break;case 22:t.mode&1?(ne=(o=ne)||t.memoizedState!==null,Ze(s,r,t),ne=o):Ze(s,r,t);break;default:Ze(s,r,t)}}function la(s){var r=s.updateQueue;if(r!==null){s.updateQueue=null;var t=s.stateNode;t===null&&(t=s.stateNode=new nx),r.forEach(function(o){var i=px.bind(null,s,o);t.has(o)||(t.add(o),o.then(i,i))})}}function Ae(s,r){var t=r.deletions;if(t!==null)for(var o=0;o<t.length;o++){var i=t[o];try{var n=s,l=r,c=l;e:for(;c!==null;){switch(c.tag){case 5:se=c.stateNode,Te=!1;break e;case 3:se=c.stateNode.containerInfo,Te=!0;break e;case 4:se=c.stateNode.containerInfo,Te=!0;break e}c=c.return}if(se===null)throw Error(y(160));Nd(n,l,i),se=null,Te=!1;var d=i.alternate;d!==null&&(d.return=null),i.return=null}catch(h){H(i,r,h)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)yd(r,s),r=r.sibling}function yd(s,r){var t=s.alternate,o=s.flags;switch(s.tag){case 0:case 11:case 14:case 15:if(Ae(r,s),Ie(s),o&4){try{Or(3,s,s.return),Eo(3,s)}catch(N){H(s,s.return,N)}try{Or(5,s,s.return)}catch(N){H(s,s.return,N)}}break;case 1:Ae(r,s),Ie(s),o&512&&t!==null&&Ks(t,t.return);break;case 5:if(Ae(r,s),Ie(s),o&512&&t!==null&&Ks(t,t.return),s.flags&32){var i=s.stateNode;try{Br(i,"")}catch(N){H(s,s.return,N)}}if(o&4&&(i=s.stateNode,i!=null)){var n=s.memoizedProps,l=t!==null?t.memoizedProps:n,c=s.type,d=s.updateQueue;if(s.updateQueue=null,d!==null)try{c==="input"&&n.type==="radio"&&n.name!=null&&Ja(i,n),Ci(c,l);var h=Ci(c,n);for(l=0;l<d.length;l+=2){var p=d[l],j=d[l+1];p==="style"?Qa(i,j):p==="dangerouslySetInnerHTML"?$a(i,j):p==="children"?Br(i,j):_n(i,p,j,h)}switch(c){case"input":_i(i,n);break;case"textarea":Ha(i,n);break;case"select":var f=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!n.multiple;var v=n.value;v!=null?Ys(i,!!n.multiple,v,!1):f!==!!n.multiple&&(n.defaultValue!=null?Ys(i,!!n.multiple,n.defaultValue,!0):Ys(i,!!n.multiple,n.multiple?[]:"",!1))}i[Qr]=n}catch(N){H(s,s.return,N)}}break;case 6:if(Ae(r,s),Ie(s),o&4){if(s.stateNode===null)throw Error(y(162));i=s.stateNode,n=s.memoizedProps;try{i.nodeValue=n}catch(N){H(s,s.return,N)}}break;case 3:if(Ae(r,s),Ie(s),o&4&&t!==null&&t.memoizedState.isDehydrated)try{Jr(r.containerInfo)}catch(N){H(s,s.return,N)}break;case 4:Ae(r,s),Ie(s);break;case 13:Ae(r,s),Ie(s),i=s.child,i.flags&8192&&(n=i.memoizedState!==null,i.stateNode.isHidden=n,!n||i.alternate!==null&&i.alternate.memoizedState!==null||(Kn=G())),o&4&&la(s);break;case 22:if(p=t!==null&&t.memoizedState!==null,s.mode&1?(ne=(h=ne)||p,Ae(r,s),ne=h):Ae(r,s),Ie(s),o&8192){if(h=s.memoizedState!==null,(s.stateNode.isHidden=h)&&!p&&s.mode&1)for(P=s,p=s.child;p!==null;){for(j=P=p;P!==null;){switch(f=P,v=f.child,f.tag){case 0:case 11:case 14:case 15:Or(4,f,f.return);break;case 1:Ks(f,f.return);var g=f.stateNode;if(typeof g.componentWillUnmount=="function"){o=f,t=f.return;try{r=o,g.props=r.memoizedProps,g.state=r.memoizedState,g.componentWillUnmount()}catch(N){H(o,t,N)}}break;case 5:Ks(f,f.return);break;case 22:if(f.memoizedState!==null){ca(j);continue}}v!==null?(v.return=f,P=v):ca(j)}p=p.sibling}e:for(p=null,j=s;;){if(j.tag===5){if(p===null){p=j;try{i=j.stateNode,h?(n=i.style,typeof n.setProperty=="function"?n.setProperty("display","none","important"):n.display="none"):(c=j.stateNode,d=j.memoizedProps.style,l=d!=null&&d.hasOwnProperty("display")?d.display:null,c.style.display=Ga("display",l))}catch(N){H(s,s.return,N)}}}else if(j.tag===6){if(p===null)try{j.stateNode.nodeValue=h?"":j.memoizedProps}catch(N){H(s,s.return,N)}}else if((j.tag!==22&&j.tag!==23||j.memoizedState===null||j===s)&&j.child!==null){j.child.return=j,j=j.child;continue}if(j===s)break e;for(;j.sibling===null;){if(j.return===null||j.return===s)break e;p===j&&(p=null),j=j.return}p===j&&(p=null),j.sibling.return=j.return,j=j.sibling}}break;case 19:Ae(r,s),Ie(s),o&4&&la(s);break;case 21:break;default:Ae(r,s),Ie(s)}}function Ie(s){var r=s.flags;if(r&2){try{e:{for(var t=s.return;t!==null;){if(vd(t)){var o=t;break e}t=t.return}throw Error(y(160))}switch(o.tag){case 5:var i=o.stateNode;o.flags&32&&(Br(i,""),o.flags&=-33);var n=na(s);Yi(s,n,i);break;case 3:case 4:var l=o.stateNode.containerInfo,c=na(s);Zi(s,c,l);break;default:throw Error(y(161))}}catch(d){H(s,s.return,d)}s.flags&=-3}r&4096&&(s.flags&=-4097)}function ax(s,r,t){P=s,Cd(s)}function Cd(s,r,t){for(var o=(s.mode&1)!==0;P!==null;){var i=P,n=i.child;if(i.tag===22&&o){var l=i.memoizedState!==null||Pt;if(!l){var c=i.alternate,d=c!==null&&c.memoizedState!==null||ne;c=Pt;var h=ne;if(Pt=l,(ne=d)&&!h)for(P=i;P!==null;)l=P,d=l.child,l.tag===22&&l.memoizedState!==null?da(i):d!==null?(d.return=l,P=d):da(i);for(;n!==null;)P=n,Cd(n),n=n.sibling;P=i,Pt=c,ne=h}aa(s)}else i.subtreeFlags&8772&&n!==null?(n.return=i,P=n):aa(s)}}function aa(s){for(;P!==null;){var r=P;if(r.flags&8772){var t=r.alternate;try{if(r.flags&8772)switch(r.tag){case 0:case 11:case 15:ne||Eo(5,r);break;case 1:var o=r.stateNode;if(r.flags&4&&!ne)if(t===null)o.componentDidMount();else{var i=r.elementType===r.type?t.memoizedProps:De(r.type,t.memoizedProps);o.componentDidUpdate(i,t.memoizedState,o.__reactInternalSnapshotBeforeUpdate)}var n=r.updateQueue;n!==null&&Wl(r,n,o);break;case 3:var l=r.updateQueue;if(l!==null){if(t=null,r.child!==null)switch(r.child.tag){case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}Wl(r,l,t)}break;case 5:var c=r.stateNode;if(t===null&&r.flags&4){t=c;var d=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&t.focus();break;case"img":d.src&&(t.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var h=r.alternate;if(h!==null){var p=h.memoizedState;if(p!==null){var j=p.dehydrated;j!==null&&Jr(j)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(y(163))}ne||r.flags&512&&Ki(r)}catch(f){H(r,r.return,f)}}if(r===s){P=null;break}if(t=r.sibling,t!==null){t.return=r.return,P=t;break}P=r.return}}function ca(s){for(;P!==null;){var r=P;if(r===s){P=null;break}var t=r.sibling;if(t!==null){t.return=r.return,P=t;break}P=r.return}}function da(s){for(;P!==null;){var r=P;try{switch(r.tag){case 0:case 11:case 15:var t=r.return;try{Eo(4,r)}catch(d){H(r,t,d)}break;case 1:var o=r.stateNode;if(typeof o.componentDidMount=="function"){var i=r.return;try{o.componentDidMount()}catch(d){H(r,i,d)}}var n=r.return;try{Ki(r)}catch(d){H(r,n,d)}break;case 5:var l=r.return;try{Ki(r)}catch(d){H(r,l,d)}}}catch(d){H(r,r.return,d)}if(r===s){P=null;break}var c=r.sibling;if(c!==null){c.return=r.return,P=c;break}P=r.return}}var cx=Math.ceil,no=Ke.ReactCurrentDispatcher,Qn=Ke.ReactCurrentOwner,ke=Ke.ReactCurrentBatchConfig,L=0,ee=null,Q=null,re=0,_e=0,Zs=_s(0),K=0,st=null,Rs=0,bo=0,Xn=0,Ir=null,ue=null,Kn=0,hr=1/0,qe=null,lo=!1,en=null,hs=null,kt=!1,os=null,ao=0,Fr=0,sn=null,Ft=-1,Mt=0;function ce(){return L&6?G():Ft!==-1?Ft:Ft=G()}function us(s){return s.mode&1?L&2&&re!==0?re&-re:Wu.transition!==null?(Mt===0&&(Mt=lc()),Mt):(s=O,s!==0||(s=window.event,s=s===void 0?16:mc(s.type)),s):1}function Le(s,r,t,o){if(50<Fr)throw Fr=0,sn=null,Error(y(185));it(s,t,o),(!(L&2)||s!==ee)&&(s===ee&&(!(L&2)&&(bo|=t),K===4&&rs(s,re)),pe(s,o),t===1&&L===0&&!(r.mode&1)&&(hr=G()+500,No&&gs()))}function pe(s,r){var t=s.callbackNode;Wh(s,r);var o=Ht(s,s===ee?re:0);if(o===0)t!==null&&gl(t),s.callbackNode=null,s.callbackPriority=0;else if(r=o&-o,s.callbackPriority!==r){if(t!=null&&gl(t),r===1)s.tag===0?Hu(ha.bind(null,s)):Rc(ha.bind(null,s)),Uu(function(){!(L&6)&&gs()}),t=null;else{switch(ac(o)){case 1:t=Cn;break;case 4:t=ic;break;case 16:t=Jt;break;case 536870912:t=nc;break;default:t=Jt}t=Dd(t,Ed.bind(null,s))}s.callbackPriority=r,s.callbackNode=t}}function Ed(s,r){if(Ft=-1,Mt=0,L&6)throw Error(y(327));var t=s.callbackNode;if(or()&&s.callbackNode!==t)return null;var o=Ht(s,s===ee?re:0);if(o===0)return null;if(o&30||o&s.expiredLanes||r)r=co(s,o);else{r=o;var i=L;L|=2;var n=Pd();(ee!==s||re!==r)&&(qe=null,hr=G()+500,Ss(s,r));do try{ux();break}catch(c){bd(s,c)}while(!0);On(),no.current=n,L=i,Q!==null?r=0:(ee=null,re=0,r=K)}if(r!==0){if(r===2&&(i=Si(s),i!==0&&(o=i,r=rn(s,i))),r===1)throw t=st,Ss(s,0),rs(s,o),pe(s,G()),t;if(r===6)rs(s,o);else{if(i=s.current.alternate,!(o&30)&&!dx(i)&&(r=co(s,o),r===2&&(n=Si(s),n!==0&&(o=n,r=rn(s,n))),r===1))throw t=st,Ss(s,0),rs(s,o),pe(s,G()),t;switch(s.finishedWork=i,s.finishedLanes=o,r){case 0:case 1:throw Error(y(345));case 2:Es(s,ue,qe);break;case 3:if(rs(s,o),(o&130023424)===o&&(r=Kn+500-G(),10<r)){if(Ht(s,0)!==0)break;if(i=s.suspendedLanes,(i&o)!==o){ce(),s.pingedLanes|=s.suspendedLanes&i;break}s.timeoutHandle=Oi(Es.bind(null,s,ue,qe),r);break}Es(s,ue,qe);break;case 4:if(rs(s,o),(o&4194240)===o)break;for(r=s.eventTimes,i=-1;0<o;){var l=31-ze(o);n=1<<l,l=r[l],l>i&&(i=l),o&=~n}if(o=i,o=G()-o,o=(120>o?120:480>o?480:1080>o?1080:1920>o?1920:3e3>o?3e3:4320>o?4320:1960*cx(o/1960))-o,10<o){s.timeoutHandle=Oi(Es.bind(null,s,ue,qe),o);break}Es(s,ue,qe);break;case 5:Es(s,ue,qe);break;default:throw Error(y(329))}}}return pe(s,G()),s.callbackNode===t?Ed.bind(null,s):null}function rn(s,r){var t=Ir;return s.current.memoizedState.isDehydrated&&(Ss(s,r).flags|=256),s=co(s,r),s!==2&&(r=ue,ue=t,r!==null&&tn(r)),s}function tn(s){ue===null?ue=s:ue.push.apply(ue,s)}function dx(s){for(var r=s;;){if(r.flags&16384){var t=r.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var o=0;o<t.length;o++){var i=t[o],n=i.getSnapshot;i=i.value;try{if(!Oe(n(),i))return!1}catch{return!1}}}if(t=r.child,r.subtreeFlags&16384&&t!==null)t.return=r,r=t;else{if(r===s)break;for(;r.sibling===null;){if(r.return===null||r.return===s)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function rs(s,r){for(r&=~Xn,r&=~bo,s.suspendedLanes|=r,s.pingedLanes&=~r,s=s.expirationTimes;0<r;){var t=31-ze(r),o=1<<t;s[t]=-1,r&=~o}}function ha(s){if(L&6)throw Error(y(327));or();var r=Ht(s,0);if(!(r&1))return pe(s,G()),null;var t=co(s,r);if(s.tag!==0&&t===2){var o=Si(s);o!==0&&(r=o,t=rn(s,o))}if(t===1)throw t=st,Ss(s,0),rs(s,r),pe(s,G()),t;if(t===6)throw Error(y(345));return s.finishedWork=s.current.alternate,s.finishedLanes=r,Es(s,ue,qe),pe(s,G()),null}function Zn(s,r){var t=L;L|=1;try{return s(r)}finally{L=t,L===0&&(hr=G()+500,No&&gs())}}function zs(s){os!==null&&os.tag===0&&!(L&6)&&or();var r=L;L|=1;var t=ke.transition,o=O;try{if(ke.transition=null,O=1,s)return s()}finally{O=o,ke.transition=t,L=r,!(L&6)&&gs()}}function Yn(){_e=Zs.current,M(Zs)}function Ss(s,r){s.finishedWork=null,s.finishedLanes=0;var t=s.timeoutHandle;if(t!==-1&&(s.timeoutHandle=-1,Bu(t)),Q!==null)for(t=Q.return;t!==null;){var o=t;switch(Rn(o),o.tag){case 1:o=o.type.childContextTypes,o!=null&&Xt();break;case 3:cr(),M(me),M(le),qn();break;case 5:Un(o);break;case 4:cr();break;case 13:M(q);break;case 19:M(q);break;case 10:In(o.type._context);break;case 22:case 23:Yn()}t=t.return}if(ee=s,Q=s=xs(s.current,null),re=_e=r,K=0,st=null,Xn=bo=Rs=0,ue=Ir=null,Ps!==null){for(r=0;r<Ps.length;r++)if(t=Ps[r],o=t.interleaved,o!==null){t.interleaved=null;var i=o.next,n=t.pending;if(n!==null){var l=n.next;n.next=i,o.next=l}t.pending=o}Ps=null}return s}function bd(s,r){do{var t=Q;try{if(On(),Lt.current=io,oo){for(var o=V.memoizedState;o!==null;){var i=o.queue;i!==null&&(i.pending=null),o=o.next}oo=!1}if(Ts=0,Y=X=V=null,Lr=!1,Zr=0,Qn.current=null,t===null||t.return===null){K=1,st=r,Q=null;break}e:{var n=s,l=t.return,c=t,d=r;if(r=re,c.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var h=d,p=c,j=p.tag;if(!(p.mode&1)&&(j===0||j===11||j===15)){var f=p.alternate;f?(p.updateQueue=f.updateQueue,p.memoizedState=f.memoizedState,p.lanes=f.lanes):(p.updateQueue=null,p.memoizedState=null)}var v=Zl(l);if(v!==null){v.flags&=-257,Yl(v,l,c,n,r),v.mode&1&&Kl(n,h,r),r=v,d=h;var g=r.updateQueue;if(g===null){var N=new Set;N.add(d),r.updateQueue=N}else g.add(d);break e}else{if(!(r&1)){Kl(n,h,r),el();break e}d=Error(y(426))}}else if(B&&c.mode&1){var E=Zl(l);if(E!==null){!(E.flags&65536)&&(E.flags|=256),Yl(E,l,c,n,r),zn(dr(d,c));break e}}n=d=dr(d,c),K!==4&&(K=2),Ir===null?Ir=[n]:Ir.push(n),n=l;do{switch(n.tag){case 3:n.flags|=65536,r&=-r,n.lanes|=r;var x=ad(n,d,r);Hl(n,x);break e;case 1:c=d;var u=n.type,m=n.stateNode;if(!(n.flags&128)&&(typeof u.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(hs===null||!hs.has(m)))){n.flags|=65536,r&=-r,n.lanes|=r;var _=cd(n,c,r);Hl(n,_);break e}}n=n.return}while(n!==null)}Sd(t)}catch(b){r=b,Q===t&&t!==null&&(Q=t=t.return);continue}break}while(!0)}function Pd(){var s=no.current;return no.current=io,s===null?io:s}function el(){(K===0||K===3||K===2)&&(K=4),ee===null||!(Rs&268435455)&&!(bo&268435455)||rs(ee,re)}function co(s,r){var t=L;L|=2;var o=Pd();(ee!==s||re!==r)&&(qe=null,Ss(s,r));do try{hx();break}catch(i){bd(s,i)}while(!0);if(On(),L=t,no.current=o,Q!==null)throw Error(y(261));return ee=null,re=0,K}function hx(){for(;Q!==null;)kd(Q)}function ux(){for(;Q!==null&&!Ih();)kd(Q)}function kd(s){var r=Ad(s.alternate,s,_e);s.memoizedProps=s.pendingProps,r===null?Sd(s):Q=r,Qn.current=null}function Sd(s){var r=s;do{var t=r.alternate;if(s=r.return,r.flags&32768){if(t=ix(t,r),t!==null){t.flags&=32767,Q=t;return}if(s!==null)s.flags|=32768,s.subtreeFlags=0,s.deletions=null;else{K=6,Q=null;return}}else if(t=ox(t,r,_e),t!==null){Q=t;return}if(r=r.sibling,r!==null){Q=r;return}Q=r=s}while(r!==null);K===0&&(K=5)}function Es(s,r,t){var o=O,i=ke.transition;try{ke.transition=null,O=1,xx(s,r,t,o)}finally{ke.transition=i,O=o}return null}function xx(s,r,t,o){do or();while(os!==null);if(L&6)throw Error(y(327));t=s.finishedWork;var i=s.finishedLanes;if(t===null)return null;if(s.finishedWork=null,s.finishedLanes=0,t===s.current)throw Error(y(177));s.callbackNode=null,s.callbackPriority=0;var n=t.lanes|t.childLanes;if($h(s,n),s===ee&&(Q=ee=null,re=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||kt||(kt=!0,Dd(Jt,function(){return or(),null})),n=(t.flags&15990)!==0,t.subtreeFlags&15990||n){n=ke.transition,ke.transition=null;var l=O;O=1;var c=L;L|=4,Qn.current=null,lx(s,t),yd(t,s),Ru(zi),Wt=!!Ri,zi=Ri=null,s.current=t,ax(t),Fh(),L=c,O=l,ke.transition=n}else s.current=t;if(kt&&(kt=!1,os=s,ao=i),n=s.pendingLanes,n===0&&(hs=null),Uh(t.stateNode),pe(s,G()),r!==null)for(o=s.onRecoverableError,t=0;t<r.length;t++)i=r[t],o(i.value,{componentStack:i.stack,digest:i.digest});if(lo)throw lo=!1,s=en,en=null,s;return ao&1&&s.tag!==0&&or(),n=s.pendingLanes,n&1?s===sn?Fr++:(Fr=0,sn=s):Fr=0,gs(),null}function or(){if(os!==null){var s=ac(ao),r=ke.transition,t=O;try{if(ke.transition=null,O=16>s?16:s,os===null)var o=!1;else{if(s=os,os=null,ao=0,L&6)throw Error(y(331));var i=L;for(L|=4,P=s.current;P!==null;){var n=P,l=n.child;if(P.flags&16){var c=n.deletions;if(c!==null){for(var d=0;d<c.length;d++){var h=c[d];for(P=h;P!==null;){var p=P;switch(p.tag){case 0:case 11:case 15:Or(8,p,n)}var j=p.child;if(j!==null)j.return=p,P=j;else for(;P!==null;){p=P;var f=p.sibling,v=p.return;if(gd(p),p===h){P=null;break}if(f!==null){f.return=v,P=f;break}P=v}}}var g=n.alternate;if(g!==null){var N=g.child;if(N!==null){g.child=null;do{var E=N.sibling;N.sibling=null,N=E}while(N!==null)}}P=n}}if(n.subtreeFlags&2064&&l!==null)l.return=n,P=l;else e:for(;P!==null;){if(n=P,n.flags&2048)switch(n.tag){case 0:case 11:case 15:Or(9,n,n.return)}var x=n.sibling;if(x!==null){x.return=n.return,P=x;break e}P=n.return}}var u=s.current;for(P=u;P!==null;){l=P;var m=l.child;if(l.subtreeFlags&2064&&m!==null)m.return=l,P=m;else e:for(l=u;P!==null;){if(c=P,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Eo(9,c)}}catch(b){H(c,c.return,b)}if(c===l){P=null;break e}var _=c.sibling;if(_!==null){_.return=c.return,P=_;break e}P=c.return}}if(L=i,gs(),Be&&typeof Be.onPostCommitFiberRoot=="function")try{Be.onPostCommitFiberRoot(po,s)}catch{}o=!0}return o}finally{O=t,ke.transition=r}}return!1}function ua(s,r,t){r=dr(t,r),r=ad(s,r,1),s=ds(s,r,1),r=ce(),s!==null&&(it(s,1,r),pe(s,r))}function H(s,r,t){if(s.tag===3)ua(s,s,t);else for(;r!==null;){if(r.tag===3){ua(r,s,t);break}else if(r.tag===1){var o=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(hs===null||!hs.has(o))){s=dr(t,s),s=cd(r,s,1),r=ds(r,s,1),s=ce(),r!==null&&(it(r,1,s),pe(r,s));break}}r=r.return}}function mx(s,r,t){var o=s.pingCache;o!==null&&o.delete(r),r=ce(),s.pingedLanes|=s.suspendedLanes&t,ee===s&&(re&t)===t&&(K===4||K===3&&(re&130023424)===re&&500>G()-Kn?Ss(s,0):Xn|=t),pe(s,r)}function wd(s,r){r===0&&(s.mode&1?(r=ft,ft<<=1,!(ft&130023424)&&(ft=4194304)):r=1);var t=ce();s=Qe(s,r),s!==null&&(it(s,r,t),pe(s,t))}function jx(s){var r=s.memoizedState,t=0;r!==null&&(t=r.retryLane),wd(s,t)}function px(s,r){var t=0;switch(s.tag){case 13:var o=s.stateNode,i=s.memoizedState;i!==null&&(t=i.retryLane);break;case 19:o=s.stateNode;break;default:throw Error(y(314))}o!==null&&o.delete(r),wd(s,t)}var Ad;Ad=function(s,r,t){if(s!==null)if(s.memoizedProps!==r.pendingProps||me.current)xe=!0;else{if(!(s.lanes&t)&&!(r.flags&128))return xe=!1,tx(s,r,t);xe=!!(s.flags&131072)}else xe=!1,B&&r.flags&1048576&&zc(r,Yt,r.index);switch(r.lanes=0,r.tag){case 2:var o=r.type;It(s,r),s=r.pendingProps;var i=nr(r,le.current);tr(r,t),i=Jn(null,r,o,s,i,t);var n=Hn();return r.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,je(o)?(n=!0,Kt(r)):n=!1,r.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Mn(r),i.updater=Co,r.stateNode=i,i._reactInternals=r,Vi(r,o,s,t),r=Wi(null,r,o,!0,n,t)):(r.tag=0,B&&n&&Tn(r),ae(null,r,i,t),r=r.child),r;case 16:o=r.elementType;e:{switch(It(s,r),s=r.pendingProps,i=o._init,o=i(o._payload),r.type=o,i=r.tag=_x(o),s=De(o,s),i){case 0:r=Hi(null,r,o,s,t);break e;case 1:r=ra(null,r,o,s,t);break e;case 11:r=ea(null,r,o,s,t);break e;case 14:r=sa(null,r,o,De(o.type,s),t);break e}throw Error(y(306,o,""))}return r;case 0:return o=r.type,i=r.pendingProps,i=r.elementType===o?i:De(o,i),Hi(s,r,o,i,t);case 1:return o=r.type,i=r.pendingProps,i=r.elementType===o?i:De(o,i),ra(s,r,o,i,t);case 3:e:{if(xd(r),s===null)throw Error(y(387));o=r.pendingProps,n=r.memoizedState,i=n.element,Bc(s,r),ro(r,o,null,t);var l=r.memoizedState;if(o=l.element,n.isDehydrated)if(n={element:o,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},r.updateQueue.baseState=n,r.memoizedState=n,r.flags&256){i=dr(Error(y(423)),r),r=ta(s,r,o,t,i);break e}else if(o!==i){i=dr(Error(y(424)),r),r=ta(s,r,o,t,i);break e}else for(ge=cs(r.stateNode.containerInfo.firstChild),ve=r,B=!0,Re=null,t=Fc(r,null,o,t),r.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(lr(),o===i){r=Xe(s,r,t);break e}ae(s,r,o,t)}r=r.child}return r;case 5:return Uc(r),s===null&&Bi(r),o=r.type,i=r.pendingProps,n=s!==null?s.memoizedProps:null,l=i.children,Li(o,i)?l=null:n!==null&&Li(o,n)&&(r.flags|=32),ud(s,r),ae(s,r,l,t),r.child;case 6:return s===null&&Bi(r),null;case 13:return md(s,r,t);case 4:return Bn(r,r.stateNode.containerInfo),o=r.pendingProps,s===null?r.child=ar(r,null,o,t):ae(s,r,o,t),r.child;case 11:return o=r.type,i=r.pendingProps,i=r.elementType===o?i:De(o,i),ea(s,r,o,i,t);case 7:return ae(s,r,r.pendingProps,t),r.child;case 8:return ae(s,r,r.pendingProps.children,t),r.child;case 12:return ae(s,r,r.pendingProps.children,t),r.child;case 10:e:{if(o=r.type._context,i=r.pendingProps,n=r.memoizedProps,l=i.value,I(eo,o._currentValue),o._currentValue=l,n!==null)if(Oe(n.value,l)){if(n.children===i.children&&!me.current){r=Xe(s,r,t);break e}}else for(n=r.child,n!==null&&(n.return=r);n!==null;){var c=n.dependencies;if(c!==null){l=n.child;for(var d=c.firstContext;d!==null;){if(d.context===o){if(n.tag===1){d=We(-1,t&-t),d.tag=2;var h=n.updateQueue;if(h!==null){h=h.shared;var p=h.pending;p===null?d.next=d:(d.next=p.next,p.next=d),h.pending=d}}n.lanes|=t,d=n.alternate,d!==null&&(d.lanes|=t),Ui(n.return,t,r),c.lanes|=t;break}d=d.next}}else if(n.tag===10)l=n.type===r.type?null:n.child;else if(n.tag===18){if(l=n.return,l===null)throw Error(y(341));l.lanes|=t,c=l.alternate,c!==null&&(c.lanes|=t),Ui(l,t,r),l=n.sibling}else l=n.child;if(l!==null)l.return=n;else for(l=n;l!==null;){if(l===r){l=null;break}if(n=l.sibling,n!==null){n.return=l.return,l=n;break}l=l.return}n=l}ae(s,r,i.children,t),r=r.child}return r;case 9:return i=r.type,o=r.pendingProps.children,tr(r,t),i=Se(i),o=o(i),r.flags|=1,ae(s,r,o,t),r.child;case 14:return o=r.type,i=De(o,r.pendingProps),i=De(o.type,i),sa(s,r,o,i,t);case 15:return dd(s,r,r.type,r.pendingProps,t);case 17:return o=r.type,i=r.pendingProps,i=r.elementType===o?i:De(o,i),It(s,r),r.tag=1,je(o)?(s=!0,Kt(r)):s=!1,tr(r,t),ld(r,o,i),Vi(r,o,i,t),Wi(null,r,o,!0,s,t);case 19:return jd(s,r,t);case 22:return hd(s,r,t)}throw Error(y(156,r.tag))};function Dd(s,r){return oc(s,r)}function fx(s,r,t,o){this.tag=s,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pe(s,r,t,o){return new fx(s,r,t,o)}function sl(s){return s=s.prototype,!(!s||!s.isReactComponent)}function _x(s){if(typeof s=="function")return sl(s)?1:0;if(s!=null){if(s=s.$$typeof,s===vn)return 11;if(s===Nn)return 14}return 2}function xs(s,r){var t=s.alternate;return t===null?(t=Pe(s.tag,r,s.key,s.mode),t.elementType=s.elementType,t.type=s.type,t.stateNode=s.stateNode,t.alternate=s,s.alternate=t):(t.pendingProps=r,t.type=s.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=s.flags&14680064,t.childLanes=s.childLanes,t.lanes=s.lanes,t.child=s.child,t.memoizedProps=s.memoizedProps,t.memoizedState=s.memoizedState,t.updateQueue=s.updateQueue,r=s.dependencies,t.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},t.sibling=s.sibling,t.index=s.index,t.ref=s.ref,t}function Bt(s,r,t,o,i,n){var l=2;if(o=s,typeof s=="function")sl(s)&&(l=1);else if(typeof s=="string")l=5;else e:switch(s){case qs:return ws(t.children,i,n,r);case gn:l=8,i|=8;break;case xi:return s=Pe(12,t,r,i|2),s.elementType=xi,s.lanes=n,s;case mi:return s=Pe(13,t,r,i),s.elementType=mi,s.lanes=n,s;case ji:return s=Pe(19,t,r,i),s.elementType=ji,s.lanes=n,s;case Ua:return Po(t,i,n,r);default:if(typeof s=="object"&&s!==null)switch(s.$$typeof){case Ma:l=10;break e;case Ba:l=9;break e;case vn:l=11;break e;case Nn:l=14;break e;case Ye:l=16,o=null;break e}throw Error(y(130,s==null?s:typeof s,""))}return r=Pe(l,t,r,i),r.elementType=s,r.type=o,r.lanes=n,r}function ws(s,r,t,o){return s=Pe(7,s,o,r),s.lanes=t,s}function Po(s,r,t,o){return s=Pe(22,s,o,r),s.elementType=Ua,s.lanes=t,s.stateNode={isHidden:!1},s}function ai(s,r,t){return s=Pe(6,s,null,r),s.lanes=t,s}function ci(s,r,t){return r=Pe(4,s.children!==null?s.children:[],s.key,r),r.lanes=t,r.stateNode={containerInfo:s.containerInfo,pendingChildren:null,implementation:s.implementation},r}function gx(s,r,t,o,i){this.tag=r,this.containerInfo=s,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Vo(0),this.expirationTimes=Vo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Vo(0),this.identifierPrefix=o,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function rl(s,r,t,o,i,n,l,c,d){return s=new gx(s,r,t,c,d),r===1?(r=1,n===!0&&(r|=8)):r=0,n=Pe(3,null,null,r),s.current=n,n.stateNode=s,n.memoizedState={element:o,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Mn(n),s}function vx(s,r,t){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Us,key:o==null?null:""+o,children:s,containerInfo:r,implementation:t}}function Td(s){if(!s)return ps;s=s._reactInternals;e:{if(Os(s)!==s||s.tag!==1)throw Error(y(170));var r=s;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(je(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(y(171))}if(s.tag===1){var t=s.type;if(je(t))return Tc(s,t,r)}return r}function Rd(s,r,t,o,i,n,l,c,d){return s=rl(t,o,!0,s,i,n,l,c,d),s.context=Td(null),t=s.current,o=ce(),i=us(t),n=We(o,i),n.callback=r??null,ds(t,n,i),s.current.lanes=i,it(s,i,o),pe(s,o),s}function ko(s,r,t,o){var i=r.current,n=ce(),l=us(i);return t=Td(t),r.context===null?r.context=t:r.pendingContext=t,r=We(n,l),r.payload={element:s},o=o===void 0?null:o,o!==null&&(r.callback=o),s=ds(i,r,l),s!==null&&(Le(s,i,l,n),zt(s,i,l)),l}function ho(s){if(s=s.current,!s.child)return null;switch(s.child.tag){case 5:return s.child.stateNode;default:return s.child.stateNode}}function xa(s,r){if(s=s.memoizedState,s!==null&&s.dehydrated!==null){var t=s.retryLane;s.retryLane=t!==0&&t<r?t:r}}function tl(s,r){xa(s,r),(s=s.alternate)&&xa(s,r)}function Nx(){return null}var zd=typeof reportError=="function"?reportError:function(s){console.error(s)};function ol(s){this._internalRoot=s}So.prototype.render=ol.prototype.render=function(s){var r=this._internalRoot;if(r===null)throw Error(y(409));ko(s,r,null,null)};So.prototype.unmount=ol.prototype.unmount=function(){var s=this._internalRoot;if(s!==null){this._internalRoot=null;var r=s.containerInfo;zs(function(){ko(null,s,null,null)}),r[Ge]=null}};function So(s){this._internalRoot=s}So.prototype.unstable_scheduleHydration=function(s){if(s){var r=hc();s={blockedOn:null,target:s,priority:r};for(var t=0;t<ss.length&&r!==0&&r<ss[t].priority;t++);ss.splice(t,0,s),t===0&&xc(s)}};function il(s){return!(!s||s.nodeType!==1&&s.nodeType!==9&&s.nodeType!==11)}function wo(s){return!(!s||s.nodeType!==1&&s.nodeType!==9&&s.nodeType!==11&&(s.nodeType!==8||s.nodeValue!==" react-mount-point-unstable "))}function ma(){}function yx(s,r,t,o,i){if(i){if(typeof o=="function"){var n=o;o=function(){var h=ho(l);n.call(h)}}var l=Rd(r,o,s,0,null,!1,!1,"",ma);return s._reactRootContainer=l,s[Ge]=l.current,$r(s.nodeType===8?s.parentNode:s),zs(),l}for(;i=s.lastChild;)s.removeChild(i);if(typeof o=="function"){var c=o;o=function(){var h=ho(d);c.call(h)}}var d=rl(s,0,!1,null,null,!1,!1,"",ma);return s._reactRootContainer=d,s[Ge]=d.current,$r(s.nodeType===8?s.parentNode:s),zs(function(){ko(r,d,t,o)}),d}function Ao(s,r,t,o,i){var n=t._reactRootContainer;if(n){var l=n;if(typeof i=="function"){var c=i;i=function(){var d=ho(l);c.call(d)}}ko(r,l,s,i)}else l=yx(t,r,s,i,o);return ho(l)}cc=function(s){switch(s.tag){case 3:var r=s.stateNode;if(r.current.memoizedState.isDehydrated){var t=Sr(r.pendingLanes);t!==0&&(En(r,t|1),pe(r,G()),!(L&6)&&(hr=G()+500,gs()))}break;case 13:zs(function(){var o=Qe(s,1);if(o!==null){var i=ce();Le(o,s,1,i)}}),tl(s,1)}};bn=function(s){if(s.tag===13){var r=Qe(s,134217728);if(r!==null){var t=ce();Le(r,s,134217728,t)}tl(s,134217728)}};dc=function(s){if(s.tag===13){var r=us(s),t=Qe(s,r);if(t!==null){var o=ce();Le(t,s,r,o)}tl(s,r)}};hc=function(){return O};uc=function(s,r){var t=O;try{return O=s,r()}finally{O=t}};bi=function(s,r,t){switch(r){case"input":if(_i(s,t),r=t.name,t.type==="radio"&&r!=null){for(t=s;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<t.length;r++){var o=t[r];if(o!==s&&o.form===s.form){var i=vo(o);if(!i)throw Error(y(90));Va(o),_i(o,i)}}}break;case"textarea":Ha(s,t);break;case"select":r=t.value,r!=null&&Ys(s,!!t.multiple,r,!1)}};Za=Zn;Ya=zs;var Cx={usingClientEntryPoint:!1,Events:[lt,Ws,vo,Xa,Ka,Zn]},br={findFiberByHostInstance:bs,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ex={bundleType:br.bundleType,version:br.version,rendererPackageName:br.rendererPackageName,rendererConfig:br.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ke.ReactCurrentDispatcher,findHostInstanceByFiber:function(s){return s=rc(s),s===null?null:s.stateNode},findFiberByHostInstance:br.findFiberByHostInstance||Nx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var St=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!St.isDisabled&&St.supportsFiber)try{po=St.inject(Ex),Be=St}catch{}}ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Cx;ye.createPortal=function(s,r){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!il(r))throw Error(y(200));return vx(s,r,null,t)};ye.createRoot=function(s,r){if(!il(s))throw Error(y(299));var t=!1,o="",i=zd;return r!=null&&(r.unstable_strictMode===!0&&(t=!0),r.identifierPrefix!==void 0&&(o=r.identifierPrefix),r.onRecoverableError!==void 0&&(i=r.onRecoverableError)),r=rl(s,1,!1,null,null,t,!1,o,i),s[Ge]=r.current,$r(s.nodeType===8?s.parentNode:s),new ol(r)};ye.findDOMNode=function(s){if(s==null)return null;if(s.nodeType===1)return s;var r=s._reactInternals;if(r===void 0)throw typeof s.render=="function"?Error(y(188)):(s=Object.keys(s).join(","),Error(y(268,s)));return s=rc(r),s=s===null?null:s.stateNode,s};ye.flushSync=function(s){return zs(s)};ye.hydrate=function(s,r,t){if(!wo(r))throw Error(y(200));return Ao(null,s,r,!0,t)};ye.hydrateRoot=function(s,r,t){if(!il(s))throw Error(y(405));var o=t!=null&&t.hydratedSources||null,i=!1,n="",l=zd;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),r=Rd(r,null,s,1,t??null,i,!1,n,l),s[Ge]=r.current,$r(s),o)for(s=0;s<o.length;s++)t=o[s],i=t._getVersion,i=i(t._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[t,i]:r.mutableSourceEagerHydrationData.push(t,i);return new So(r)};ye.render=function(s,r,t){if(!wo(r))throw Error(y(200));return Ao(null,s,r,!1,t)};ye.unmountComponentAtNode=function(s){if(!wo(s))throw Error(y(40));return s._reactRootContainer?(zs(function(){Ao(null,null,s,!1,function(){s._reactRootContainer=null,s[Ge]=null})}),!0):!1};ye.unstable_batchedUpdates=Zn;ye.unstable_renderSubtreeIntoContainer=function(s,r,t,o){if(!wo(t))throw Error(y(200));if(s==null||s._reactInternals===void 0)throw Error(y(38));return Ao(s,r,t,!1,o)};ye.version="18.3.1-next-f1338f8080-20240426";function Ld(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ld)}catch(s){console.error(s)}}Ld(),La.exports=ye;var bx=La.exports,ja=bx;hi.createRoot=ja.createRoot,hi.hydrateRoot=ja.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function rt(){return rt=Object.assign?Object.assign.bind():function(s){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(s[o]=t[o])}return s},rt.apply(this,arguments)}var is;(function(s){s.Pop="POP",s.Push="PUSH",s.Replace="REPLACE"})(is||(is={}));const pa="popstate";function Px(s){s===void 0&&(s={});function r(i,n){let{pathname:l="/",search:c="",hash:d=""}=Is(i.location.hash.substr(1));return!l.startsWith("/")&&!l.startsWith(".")&&(l="/"+l),on("",{pathname:l,search:c,hash:d},n.state&&n.state.usr||null,n.state&&n.state.key||"default")}function t(i,n){let l=i.document.querySelector("base"),c="";if(l&&l.getAttribute("href")){let d=i.location.href,h=d.indexOf("#");c=h===-1?d:d.slice(0,h)}return c+"#"+(typeof n=="string"?n:uo(n))}function o(i,n){Do(i.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(n)+")")}return Sx(r,t,o,s)}function W(s,r){if(s===!1||s===null||typeof s>"u")throw new Error(r)}function Do(s,r){if(!s){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function kx(){return Math.random().toString(36).substr(2,8)}function fa(s,r){return{usr:s.state,key:s.key,idx:r}}function on(s,r,t,o){return t===void 0&&(t=null),rt({pathname:typeof s=="string"?s:s.pathname,search:"",hash:""},typeof r=="string"?Is(r):r,{state:t,key:r&&r.key||o||kx()})}function uo(s){let{pathname:r="/",search:t="",hash:o=""}=s;return t&&t!=="?"&&(r+=t.charAt(0)==="?"?t:"?"+t),o&&o!=="#"&&(r+=o.charAt(0)==="#"?o:"#"+o),r}function Is(s){let r={};if(s){let t=s.indexOf("#");t>=0&&(r.hash=s.substr(t),s=s.substr(0,t));let o=s.indexOf("?");o>=0&&(r.search=s.substr(o),s=s.substr(0,o)),s&&(r.pathname=s)}return r}function Sx(s,r,t,o){o===void 0&&(o={});let{window:i=document.defaultView,v5Compat:n=!1}=o,l=i.history,c=is.Pop,d=null,h=p();h==null&&(h=0,l.replaceState(rt({},l.state,{idx:h}),""));function p(){return(l.state||{idx:null}).idx}function j(){c=is.Pop;let E=p(),x=E==null?null:E-h;h=E,d&&d({action:c,location:N.location,delta:x})}function f(E,x){c=is.Push;let u=on(N.location,E,x);t&&t(u,E),h=p()+1;let m=fa(u,h),_=N.createHref(u);try{l.pushState(m,"",_)}catch(b){if(b instanceof DOMException&&b.name==="DataCloneError")throw b;i.location.assign(_)}n&&d&&d({action:c,location:N.location,delta:1})}function v(E,x){c=is.Replace;let u=on(N.location,E,x);t&&t(u,E),h=p();let m=fa(u,h),_=N.createHref(u);l.replaceState(m,"",_),n&&d&&d({action:c,location:N.location,delta:0})}function g(E){let x=i.location.origin!=="null"?i.location.origin:i.location.href,u=typeof E=="string"?E:uo(E);return u=u.replace(/ $/,"%20"),W(x,"No window.location.(origin|href) available to create URL for href: "+u),new URL(u,x)}let N={get action(){return c},get location(){return s(i,l)},listen(E){if(d)throw new Error("A history only accepts one active listener");return i.addEventListener(pa,j),d=E,()=>{i.removeEventListener(pa,j),d=null}},createHref(E){return r(i,E)},createURL:g,encodeLocation(E){let x=g(E);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:f,replace:v,go(E){return l.go(E)}};return N}var _a;(function(s){s.data="data",s.deferred="deferred",s.redirect="redirect",s.error="error"})(_a||(_a={}));function wx(s,r,t){return t===void 0&&(t="/"),Ax(s,r,t)}function Ax(s,r,t,o){let i=typeof r=="string"?Is(r):r,n=ur(i.pathname||"/",t);if(n==null)return null;let l=Od(s);Dx(l);let c=null;for(let d=0;c==null&&d<l.length;++d){let h=qx(n);c=Bx(l[d],h)}return c}function Od(s,r,t,o){r===void 0&&(r=[]),t===void 0&&(t=[]),o===void 0&&(o="");let i=(n,l,c)=>{let d={relativePath:c===void 0?n.path||"":c,caseSensitive:n.caseSensitive===!0,childrenIndex:l,route:n};d.relativePath.startsWith("/")&&(W(d.relativePath.startsWith(o),'Absolute route path "'+d.relativePath+'" nested under path '+('"'+o+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),d.relativePath=d.relativePath.slice(o.length));let h=ms([o,d.relativePath]),p=t.concat(d);n.children&&n.children.length>0&&(W(n.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),Od(n.children,r,p,h)),!(n.path==null&&!n.index)&&r.push({path:h,score:Fx(h,n.index),routesMeta:p})};return s.forEach((n,l)=>{var c;if(n.path===""||!((c=n.path)!=null&&c.includes("?")))i(n,l);else for(let d of Id(n.path))i(n,l,d)}),r}function Id(s){let r=s.split("/");if(r.length===0)return[];let[t,...o]=r,i=t.endsWith("?"),n=t.replace(/\?$/,"");if(o.length===0)return i?[n,""]:[n];let l=Id(o.join("/")),c=[];return c.push(...l.map(d=>d===""?n:[n,d].join("/"))),i&&c.push(...l),c.map(d=>s.startsWith("/")&&d===""?"/":d)}function Dx(s){s.sort((r,t)=>r.score!==t.score?t.score-r.score:Mx(r.routesMeta.map(o=>o.childrenIndex),t.routesMeta.map(o=>o.childrenIndex)))}const Tx=/^:[\w-]+$/,Rx=3,zx=2,Lx=1,Ox=10,Ix=-2,ga=s=>s==="*";function Fx(s,r){let t=s.split("/"),o=t.length;return t.some(ga)&&(o+=Ix),r&&(o+=zx),t.filter(i=>!ga(i)).reduce((i,n)=>i+(Tx.test(n)?Rx:n===""?Lx:Ox),o)}function Mx(s,r){return s.length===r.length&&s.slice(0,-1).every((o,i)=>o===r[i])?s[s.length-1]-r[r.length-1]:0}function Bx(s,r,t){let{routesMeta:o}=s,i={},n="/",l=[];for(let c=0;c<o.length;++c){let d=o[c],h=c===o.length-1,p=n==="/"?r:r.slice(n.length)||"/",j=nn({path:d.relativePath,caseSensitive:d.caseSensitive,end:h},p),f=d.route;if(!j)return null;Object.assign(i,j.params),l.push({params:i,pathname:ms([n,j.pathname]),pathnameBase:$x(ms([n,j.pathnameBase])),route:f}),j.pathnameBase!=="/"&&(n=ms([n,j.pathnameBase]))}return l}function nn(s,r){typeof s=="string"&&(s={path:s,caseSensitive:!1,end:!0});let[t,o]=Ux(s.path,s.caseSensitive,s.end),i=r.match(t);if(!i)return null;let n=i[0],l=n.replace(/(.)\/+$/,"$1"),c=i.slice(1);return{params:o.reduce((h,p,j)=>{let{paramName:f,isOptional:v}=p;if(f==="*"){let N=c[j]||"";l=n.slice(0,n.length-N.length).replace(/(.)\/+$/,"$1")}const g=c[j];return v&&!g?h[f]=void 0:h[f]=(g||"").replace(/%2F/g,"/"),h},{}),pathname:n,pathnameBase:l,pattern:s}}function Ux(s,r,t){r===void 0&&(r=!1),t===void 0&&(t=!0),Do(s==="*"||!s.endsWith("*")||s.endsWith("/*"),'Route path "'+s+'" will be treated as if it were '+('"'+s.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+s.replace(/\*$/,"/*")+'".'));let o=[],i="^"+s.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,c,d)=>(o.push({paramName:c,isOptional:d!=null}),d?"/?([^\\/]+)?":"/([^\\/]+)"));return s.endsWith("*")?(o.push({paramName:"*"}),i+=s==="*"||s==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?i+="\\/*$":s!==""&&s!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,r?void 0:"i"),o]}function qx(s){try{return s.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return Do(!1,'The URL path "'+s+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+r+").")),s}}function ur(s,r){if(r==="/")return s;if(!s.toLowerCase().startsWith(r.toLowerCase()))return null;let t=r.endsWith("/")?r.length-1:r.length,o=s.charAt(t);return o&&o!=="/"?null:s.slice(t)||"/"}const Vx=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Jx=s=>Vx.test(s);function Hx(s,r){r===void 0&&(r="/");let{pathname:t,search:o="",hash:i=""}=typeof s=="string"?Is(s):s,n;if(t)if(Jx(t))n=t;else{if(t.includes("//")){let l=t;t=t.replace(/\/\/+/g,"/"),Do(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+t))}t.startsWith("/")?n=va(t.substring(1),"/"):n=va(t,r)}else n=r;return{pathname:n,search:Gx(o),hash:Qx(i)}}function va(s,r){let t=r.replace(/\/+$/,"").split("/");return s.split("/").forEach(i=>{i===".."?t.length>1&&t.pop():i!=="."&&t.push(i)}),t.length>1?t.join("/"):"/"}function di(s,r,t,o){return"Cannot include a '"+s+"' character in a manually specified "+("`to."+r+"` field ["+JSON.stringify(o)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Wx(s){return s.filter((r,t)=>t===0||r.route.path&&r.route.path.length>0)}function Fd(s,r){let t=Wx(s);return r?t.map((o,i)=>i===t.length-1?o.pathname:o.pathnameBase):t.map(o=>o.pathnameBase)}function Md(s,r,t,o){o===void 0&&(o=!1);let i;typeof s=="string"?i=Is(s):(i=rt({},s),W(!i.pathname||!i.pathname.includes("?"),di("?","pathname","search",i)),W(!i.pathname||!i.pathname.includes("#"),di("#","pathname","hash",i)),W(!i.search||!i.search.includes("#"),di("#","search","hash",i)));let n=s===""||i.pathname==="",l=n?"/":i.pathname,c;if(l==null)c=t;else{let j=r.length-1;if(!o&&l.startsWith("..")){let f=l.split("/");for(;f[0]==="..";)f.shift(),j-=1;i.pathname=f.join("/")}c=j>=0?r[j]:"/"}let d=Hx(i,c),h=l&&l!=="/"&&l.endsWith("/"),p=(n||l===".")&&t.endsWith("/");return!d.pathname.endsWith("/")&&(h||p)&&(d.pathname+="/"),d}const ms=s=>s.join("/").replace(/\/\/+/g,"/"),$x=s=>s.replace(/\/+$/,"").replace(/^\/*/,"/"),Gx=s=>!s||s==="?"?"":s.startsWith("?")?s:"?"+s,Qx=s=>!s||s==="#"?"":s.startsWith("#")?s:"#"+s;function Xx(s){return s!=null&&typeof s.status=="number"&&typeof s.statusText=="string"&&typeof s.internal=="boolean"&&"data"in s}const Bd=["post","put","patch","delete"];new Set(Bd);const Kx=["get",...Bd];new Set(Kx);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function tt(){return tt=Object.assign?Object.assign.bind():function(s){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(s[o]=t[o])}return s},tt.apply(this,arguments)}const To=C.createContext(null),Ud=C.createContext(null),vs=C.createContext(null),Ro=C.createContext(null),Fs=C.createContext({outlet:null,matches:[],isDataRoute:!1}),qd=C.createContext(null);function Zx(s,r){let{relative:t}=r===void 0?{}:r;ct()||W(!1);let{basename:o,navigator:i}=C.useContext(vs),{hash:n,pathname:l,search:c}=zo(s,{relative:t}),d=l;return o!=="/"&&(d=l==="/"?o:ms([o,l])),i.createHref({pathname:d,search:c,hash:n})}function ct(){return C.useContext(Ro)!=null}function Ms(){return ct()||W(!1),C.useContext(Ro).location}function Vd(s){C.useContext(vs).static||C.useLayoutEffect(s)}function Jd(){let{isDataRoute:s}=C.useContext(Fs);return s?hm():Yx()}function Yx(){ct()||W(!1);let s=C.useContext(To),{basename:r,future:t,navigator:o}=C.useContext(vs),{matches:i}=C.useContext(Fs),{pathname:n}=Ms(),l=JSON.stringify(Fd(i,t.v7_relativeSplatPath)),c=C.useRef(!1);return Vd(()=>{c.current=!0}),C.useCallback(function(h,p){if(p===void 0&&(p={}),!c.current)return;if(typeof h=="number"){o.go(h);return}let j=Md(h,JSON.parse(l),n,p.relative==="path");s==null&&r!=="/"&&(j.pathname=j.pathname==="/"?r:ms([r,j.pathname])),(p.replace?o.replace:o.push)(j,p.state,p)},[r,o,l,n,s])}function zo(s,r){let{relative:t}=r===void 0?{}:r,{future:o}=C.useContext(vs),{matches:i}=C.useContext(Fs),{pathname:n}=Ms(),l=JSON.stringify(Fd(i,o.v7_relativeSplatPath));return C.useMemo(()=>Md(s,JSON.parse(l),n,t==="path"),[s,l,n,t])}function em(s,r){return sm(s,r)}function sm(s,r,t,o){ct()||W(!1);let{navigator:i}=C.useContext(vs),{matches:n}=C.useContext(Fs),l=n[n.length-1],c=l?l.params:{};l&&l.pathname;let d=l?l.pathnameBase:"/";l&&l.route;let h=Ms(),p;if(r){var j;let E=typeof r=="string"?Is(r):r;d==="/"||(j=E.pathname)!=null&&j.startsWith(d)||W(!1),p=E}else p=h;let f=p.pathname||"/",v=f;if(d!=="/"){let E=d.replace(/^\//,"").split("/");v="/"+f.replace(/^\//,"").split("/").slice(E.length).join("/")}let g=wx(s,{pathname:v}),N=nm(g&&g.map(E=>Object.assign({},E,{params:Object.assign({},c,E.params),pathname:ms([d,i.encodeLocation?i.encodeLocation(E.pathname).pathname:E.pathname]),pathnameBase:E.pathnameBase==="/"?d:ms([d,i.encodeLocation?i.encodeLocation(E.pathnameBase).pathname:E.pathnameBase])})),n,t,o);return r&&N?C.createElement(Ro.Provider,{value:{location:tt({pathname:"/",search:"",hash:"",state:null,key:"default"},p),navigationType:is.Pop}},N):N}function rm(){let s=dm(),r=Xx(s)?s.status+" "+s.statusText:s instanceof Error?s.message:JSON.stringify(s),t=s instanceof Error?s.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return C.createElement(C.Fragment,null,C.createElement("h2",null,"Unexpected Application Error!"),C.createElement("h3",{style:{fontStyle:"italic"}},r),t?C.createElement("pre",{style:i},t):null,null)}const tm=C.createElement(rm,null);class om extends C.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,t){return t.location!==r.location||t.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:t.error,location:t.location,revalidation:r.revalidation||t.revalidation}}componentDidCatch(r,t){console.error("React Router caught the following error during render",r,t)}render(){return this.state.error!==void 0?C.createElement(Fs.Provider,{value:this.props.routeContext},C.createElement(qd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function im(s){let{routeContext:r,match:t,children:o}=s,i=C.useContext(To);return i&&i.static&&i.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=t.route.id),C.createElement(Fs.Provider,{value:r},o)}function nm(s,r,t,o){var i;if(r===void 0&&(r=[]),t===void 0&&(t=null),o===void 0&&(o=null),s==null){var n;if(!t)return null;if(t.errors)s=t.matches;else if((n=o)!=null&&n.v7_partialHydration&&r.length===0&&!t.initialized&&t.matches.length>0)s=t.matches;else return null}let l=s,c=(i=t)==null?void 0:i.errors;if(c!=null){let p=l.findIndex(j=>j.route.id&&(c==null?void 0:c[j.route.id])!==void 0);p>=0||W(!1),l=l.slice(0,Math.min(l.length,p+1))}let d=!1,h=-1;if(t&&o&&o.v7_partialHydration)for(let p=0;p<l.length;p++){let j=l[p];if((j.route.HydrateFallback||j.route.hydrateFallbackElement)&&(h=p),j.route.id){let{loaderData:f,errors:v}=t,g=j.route.loader&&f[j.route.id]===void 0&&(!v||v[j.route.id]===void 0);if(j.route.lazy||g){d=!0,h>=0?l=l.slice(0,h+1):l=[l[0]];break}}}return l.reduceRight((p,j,f)=>{let v,g=!1,N=null,E=null;t&&(v=c&&j.route.id?c[j.route.id]:void 0,N=j.route.errorElement||tm,d&&(h<0&&f===0?(um("route-fallback"),g=!0,E=null):h===f&&(g=!0,E=j.route.hydrateFallbackElement||null)));let x=r.concat(l.slice(0,f+1)),u=()=>{let m;return v?m=N:g?m=E:j.route.Component?m=C.createElement(j.route.Component,null):j.route.element?m=j.route.element:m=p,C.createElement(im,{match:j,routeContext:{outlet:p,matches:x,isDataRoute:t!=null},children:m})};return t&&(j.route.ErrorBoundary||j.route.errorElement||f===0)?C.createElement(om,{location:t.location,revalidation:t.revalidation,component:N,error:v,children:u(),routeContext:{outlet:null,matches:x,isDataRoute:!0}}):u()},null)}var Hd=function(s){return s.UseBlocker="useBlocker",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s}(Hd||{}),Wd=function(s){return s.UseBlocker="useBlocker",s.UseLoaderData="useLoaderData",s.UseActionData="useActionData",s.UseRouteError="useRouteError",s.UseNavigation="useNavigation",s.UseRouteLoaderData="useRouteLoaderData",s.UseMatches="useMatches",s.UseRevalidator="useRevalidator",s.UseNavigateStable="useNavigate",s.UseRouteId="useRouteId",s}(Wd||{});function lm(s){let r=C.useContext(To);return r||W(!1),r}function am(s){let r=C.useContext(Ud);return r||W(!1),r}function cm(s){let r=C.useContext(Fs);return r||W(!1),r}function $d(s){let r=cm(),t=r.matches[r.matches.length-1];return t.route.id||W(!1),t.route.id}function dm(){var s;let r=C.useContext(qd),t=am(),o=$d();return r!==void 0?r:(s=t.errors)==null?void 0:s[o]}function hm(){let{router:s}=lm(Hd.UseNavigateStable),r=$d(Wd.UseNavigateStable),t=C.useRef(!1);return Vd(()=>{t.current=!0}),C.useCallback(function(i,n){n===void 0&&(n={}),t.current&&(typeof i=="number"?s.navigate(i):s.navigate(i,tt({fromRouteId:r},n)))},[s,r])}const Na={};function um(s,r,t){Na[s]||(Na[s]=!0)}function xm(s,r){s==null||s.v7_startTransition,s==null||s.v7_relativeSplatPath}function ln(s){W(!1)}function mm(s){let{basename:r="/",children:t=null,location:o,navigationType:i=is.Pop,navigator:n,static:l=!1,future:c}=s;ct()&&W(!1);let d=r.replace(/^\/*/,"/"),h=C.useMemo(()=>({basename:d,navigator:n,static:l,future:tt({v7_relativeSplatPath:!1},c)}),[d,c,n,l]);typeof o=="string"&&(o=Is(o));let{pathname:p="/",search:j="",hash:f="",state:v=null,key:g="default"}=o,N=C.useMemo(()=>{let E=ur(p,d);return E==null?null:{location:{pathname:E,search:j,hash:f,state:v,key:g},navigationType:i}},[d,p,j,f,v,g,i]);return N==null?null:C.createElement(vs.Provider,{value:h},C.createElement(Ro.Provider,{children:t,value:N}))}function jm(s){let{children:r,location:t}=s;return em(an(r),t)}new Promise(()=>{});function an(s,r){r===void 0&&(r=[]);let t=[];return C.Children.forEach(s,(o,i)=>{if(!C.isValidElement(o))return;let n=[...r,i];if(o.type===C.Fragment){t.push.apply(t,an(o.props.children,n));return}o.type!==ln&&W(!1),!o.props.index||!o.props.children||W(!1);let l={id:o.props.id||n.join("-"),caseSensitive:o.props.caseSensitive,element:o.props.element,Component:o.props.Component,index:o.props.index,path:o.props.path,loader:o.props.loader,action:o.props.action,errorElement:o.props.errorElement,ErrorBoundary:o.props.ErrorBoundary,hasErrorBoundary:o.props.ErrorBoundary!=null||o.props.errorElement!=null,shouldRevalidate:o.props.shouldRevalidate,handle:o.props.handle,lazy:o.props.lazy};o.props.children&&(l.children=an(o.props.children,n)),t.push(l)}),t}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function xo(){return xo=Object.assign?Object.assign.bind():function(s){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(s[o]=t[o])}return s},xo.apply(this,arguments)}function Gd(s,r){if(s==null)return{};var t={},o=Object.keys(s),i,n;for(n=0;n<o.length;n++)i=o[n],!(r.indexOf(i)>=0)&&(t[i]=s[i]);return t}function pm(s){return!!(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey)}function fm(s,r){return s.button===0&&(!r||r==="_self")&&!pm(s)}const _m=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],gm=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],vm="6";try{window.__reactRouterVersion=vm}catch{}const Nm=C.createContext({isTransitioning:!1}),ym="startTransition",ya=mh[ym];function Cm(s){let{basename:r,children:t,future:o,window:i}=s,n=C.useRef();n.current==null&&(n.current=Px({window:i,v5Compat:!0}));let l=n.current,[c,d]=C.useState({action:l.action,location:l.location}),{v7_startTransition:h}=o||{},p=C.useCallback(j=>{h&&ya?ya(()=>d(j)):d(j)},[d,h]);return C.useLayoutEffect(()=>l.listen(p),[l,p]),C.useEffect(()=>xm(o),[o]),C.createElement(mm,{basename:r,children:t,location:c.location,navigationType:c.action,navigator:l,future:o})}const Em=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",bm=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Pm=C.forwardRef(function(r,t){let{onClick:o,relative:i,reloadDocument:n,replace:l,state:c,target:d,to:h,preventScrollReset:p,viewTransition:j}=r,f=Gd(r,_m),{basename:v}=C.useContext(vs),g,N=!1;if(typeof h=="string"&&bm.test(h)&&(g=h,Em))try{let m=new URL(window.location.href),_=h.startsWith("//")?new URL(m.protocol+h):new URL(h),b=ur(_.pathname,v);_.origin===m.origin&&b!=null?h=b+_.search+_.hash:N=!0}catch{}let E=Zx(h,{relative:i}),x=Sm(h,{replace:l,state:c,target:d,preventScrollReset:p,relative:i,viewTransition:j});function u(m){o&&o(m),m.defaultPrevented||x(m)}return C.createElement("a",xo({},f,{href:g||E,onClick:N||n?o:u,ref:t,target:d}))}),mo=C.forwardRef(function(r,t){let{"aria-current":o="page",caseSensitive:i=!1,className:n="",end:l=!1,style:c,to:d,viewTransition:h,children:p}=r,j=Gd(r,gm),f=zo(d,{relative:j.relative}),v=Ms(),g=C.useContext(Ud),{navigator:N,basename:E}=C.useContext(vs),x=g!=null&&wm(f)&&h===!0,u=N.encodeLocation?N.encodeLocation(f).pathname:f.pathname,m=v.pathname,_=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;i||(m=m.toLowerCase(),_=_?_.toLowerCase():null,u=u.toLowerCase()),_&&E&&(_=ur(_,E)||_);const b=u!=="/"&&u.endsWith("/")?u.length-1:u.length;let S=m===u||!l&&m.startsWith(u)&&m.charAt(b)==="/",w=_!=null&&(_===u||!l&&_.startsWith(u)&&_.charAt(u.length)==="/"),A={isActive:S,isPending:w,isTransitioning:x},U=S?o:void 0,T;typeof n=="function"?T=n(A):T=[n,S?"active":null,w?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let fe=typeof c=="function"?c(A):c;return C.createElement(Pm,xo({},j,{"aria-current":U,className:T,ref:t,style:fe,to:d,viewTransition:h}),typeof p=="function"?p(A):p)});var cn;(function(s){s.UseScrollRestoration="useScrollRestoration",s.UseSubmit="useSubmit",s.UseSubmitFetcher="useSubmitFetcher",s.UseFetcher="useFetcher",s.useViewTransitionState="useViewTransitionState"})(cn||(cn={}));var Ca;(function(s){s.UseFetcher="useFetcher",s.UseFetchers="useFetchers",s.UseScrollRestoration="useScrollRestoration"})(Ca||(Ca={}));function km(s){let r=C.useContext(To);return r||W(!1),r}function Sm(s,r){let{target:t,replace:o,state:i,preventScrollReset:n,relative:l,viewTransition:c}=r===void 0?{}:r,d=Jd(),h=Ms(),p=zo(s,{relative:l});return C.useCallback(j=>{if(fm(j,t)){j.preventDefault();let f=o!==void 0?o:uo(h)===uo(p);d(s,{replace:f,state:i,preventScrollReset:n,relative:l,viewTransition:c})}},[h,d,p,o,i,t,s,n,l,c])}function wm(s,r){r===void 0&&(r={});let t=C.useContext(Nm);t==null&&W(!1);let{basename:o}=km(cn.useViewTransitionState),i=zo(s,{relative:r.relative});if(!t.isTransitioning)return!1;let n=ur(t.currentLocation.pathname,o)||t.currentLocation.pathname,l=ur(t.nextLocation.pathname,o)||t.nextLocation.pathname;return nn(i.pathname,l)!=null||nn(i.pathname,n)!=null}const Am=s=>{if(!s)return"";const r=["def","class","return","if","else","elif","for","while","try","except","finally","with","as","import","from","raise","pass","break","continue","in","not","and","or","is","None","True","False","self","async","await","yield","lambda","global","nonlocal","assert","del"],t=["print","len","str","int","float","bool","list","dict","set","tuple","type","isinstance","hasattr","getattr","setattr","range","enumerate","zip","map","filter","sorted","sum","max","min","any","all","open","super"],o=["Optional","Dict","List","Any","Tuple","Union","Set","Callable","str","int","float","bool"];return s.split(`
`).map((i,n)=>{const l=[];let c=i,d=0;const h=c.indexOf("#");let p="";h!==-1&&(p=c.substring(h),c=c.substring(0,h));const j=/(["'`])(?:(?!\1)[^\\]|\\.)*?\1|f(["'])(?:(?!\2)[^\\]|\\.)*?\2/g;let f=0,v;const g=[];for(;(v=j.exec(c))!==null;)v.index>f&&g.push({type:"code",text:c.substring(f,v.index)}),g.push({type:"string",text:v[0]}),f=v.index+v[0].length;return f<c.length&&g.push({type:"code",text:c.substring(f)}),g.forEach((N,E)=>{if(N.type==="string")l.push(e.jsx("span",{className:"string",children:N.text},`${n}-${d++}`));else{let x=N.text;if(x.trim().startsWith("@")){const _=x.match(/^(\s*)(@\w+)/);_&&(l.push(e.jsx("span",{children:_[1]},`${n}-${d++}`)),l.push(e.jsx("span",{className:"decorator",children:_[2]},`${n}-${d++}`)),x=x.substring(_[0].length))}const u=/(\b\w+\b|[^\w\s]+|\s+)/g;let m;for(;(m=u.exec(x))!==null;){const _=m[0];r.includes(_)?l.push(e.jsx("span",{className:"keyword",children:_},`${n}-${d++}`)):t.includes(_)?l.push(e.jsx("span",{className:"builtin",children:_},`${n}-${d++}`)):o.includes(_)?l.push(e.jsx("span",{className:"class-name",children:_},`${n}-${d++}`)):/^\d+\.?\d*$/.test(_)?l.push(e.jsx("span",{className:"number",children:_},`${n}-${d++}`)):/^[=+\-*/<>!&|%^~]+$/.test(_)?l.push(e.jsx("span",{className:"operator",children:_},`${n}-${d++}`)):/^[()[\]{},.:;]+$/.test(_)?l.push(e.jsx("span",{className:"punctuation",children:_},`${n}-${d++}`)):l.push(e.jsx("span",{children:_},`${n}-${d++}`))}}}),p&&l.push(e.jsx("span",{className:"comment",children:p},`${n}-${d++}`)),e.jsxs(jn.Fragment,{children:[l,n<s.split(`
`).length-1&&`
`]},n)})},a=({code:s,language:r="python",className:t=""})=>e.jsx("pre",{className:`code-snippet ${t}`,children:r==="python"?Am(s):s}),Dm=()=>e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: CNAClient"}),e.jsx("p",{className:"doc-subtitle",children:"Cliente especializado para API do CNA (Cadastro Nacional de Advogados) com observabilidade."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsxs("p",{children:["A classe ",e.jsx("code",{className:"code-block",children:"CNAClient"})," encapsula toda a lógica de comunicação com a API do CNA da OAB, fornecendo métodos para consultar advogados e sociedades com instrumentação completa de métricas, logging estruturado e tratamento robusto de erros."]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Classe CNAClient"}),e.jsx("p",{children:e.jsx("code",{className:"code-block",children:"clients/cna_client.py"})}),e.jsx(a,{code:"class CNAClient:"}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Consulta de advogados no Cadastro Nacional da OAB"}),e.jsx("li",{children:"Consulta de sociedades/escritórios"}),e.jsx("li",{children:"Instrumentação com métricas de performance"}),e.jsx("li",{children:"Logging estruturado com correlation_id"}),e.jsx("li",{children:"Tratamento robusto de erros de rede"}),e.jsx("li",{children:"Estatísticas de uso e sucesso"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Inicialização"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{id:"__init__",children:"__init__"}),e.jsx(a,{code:"def __init__(self, timeout: int = None, session: requests.Session = None):"}),e.jsx("p",{children:"Inicializa o cliente CNA com configuração e observabilidade."}),e.jsx("h4",{children:"Args"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"timeout"})}),e.jsx("td",{children:e.jsx("code",{children:"Optional[int]"})}),e.jsx("td",{children:"Timeout em segundos (usa config.TIMEOUT se None)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"session"})}),e.jsx("td",{children:e.jsx("code",{children:"Optional[requests.Session]"})}),e.jsx("td",{children:"Sessão HTTP reutilizável"})]})]})]}),e.jsx("h4",{children:"Configuração automática"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Fonte"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"timeout"})}),e.jsx("td",{children:e.jsx("code",{children:"config.TIMEOUT"})}),e.jsx("td",{children:"Timeout padrão para requisições"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"base_url"})}),e.jsx("td",{children:e.jsx("code",{children:"config.CNA_BASE_URL"})}),e.jsx("td",{children:"URL base da API CNA"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"search_url"})}),e.jsx("td",{children:e.jsx("code",{children:"config.CNA_SEARCH_URL"})}),e.jsx("td",{children:"URL específica para buscas"})]})]})]}),e.jsx("h4",{children:"Observabilidade inicializada"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Registry de métricas específico para CNA"}),e.jsx("li",{children:"Contadores de requisições (total, sucesso, erro)"}),e.jsx("li",{children:"Sistema de correlation_id para rastreamento"})]}),e.jsx("h4",{children:"Log de inicialização"}),e.jsx(a,{code:"[abc123] CNAClient inicializado - Base URL: https://cna.oab.org.br/api",language:"text"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos de Consulta"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{id:"consultar_advogado",children:"consultar_advogado"}),e.jsx(a,{code:`def consultar_advogado(
    self, nome: str = "", oab: str = "", uf: Optional[str] = None
) -> Optional[Dict[str, Any]]:`}),e.jsx("p",{children:"Consulta a API do CNA para obter informações do advogado."}),e.jsx("h4",{children:"Args"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"nome"})}),e.jsx("td",{children:e.jsx("code",{children:"str"})}),e.jsx("td",{children:"Nome do advogado (opcional)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"oab"})}),e.jsx("td",{children:e.jsx("code",{children:"str"})}),e.jsx("td",{children:"Número da OAB (opcional)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"uf"})}),e.jsx("td",{children:e.jsx("code",{children:"Optional[str]"})}),e.jsx("td",{children:"UF da OAB (opcional)"})]})]})]}),e.jsx("h4",{children:"Returns"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Optional[Dict[str, Any]]"})}),e.jsx("td",{children:"Dados do advogado ou None"})]})})]}),e.jsx("h4",{children:"Validações de entrada"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Pelo menos ",e.jsx("code",{className:"code-block",children:"nome"})," ou"," ",e.jsx("code",{className:"code-block",children:"oab"})," deve ser fornecido"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"oab"})," deve ser string se fornecido"]}),e.jsx("li",{children:"Parâmetros são automaticamente trimmed"})]}),e.jsx("h4",{children:"Payload da requisição"}),e.jsx(a,{code:`{
    "NomeAdvo": nome.strip() if nome else "",
    "Insc": oab.strip() if oab else "",
    "UF": uf.strip() if uf else ""
}`}),e.jsx("h4",{children:"Exceções"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Exceção"}),e.jsx("th",{children:"Cenário"}),e.jsx("th",{children:"Tratamento"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ValidationError"})}),e.jsx("td",{children:"Parâmetros inválidos"}),e.jsx("td",{children:"Validação prévia"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"CNAAPIError"})}),e.jsx("td",{children:"Erros de rede/HTTP"}),e.jsx("td",{children:"Log + métricas + reraise"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Timeout"})}),e.jsx("td",{children:"Timeout excedido"}),e.jsx("td",{children:"Log específico + métricas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"ConnectionError"})}),e.jsx("td",{children:"Falha de conexão"}),e.jsx("td",{children:"Log específico + métricas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"HTTPError"})}),e.jsx("td",{children:"Erro HTTP (4xx, 5xx)"}),e.jsx("td",{children:"Log com status code"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{id:"consultar_sociedade",children:"consultar_sociedade"}),e.jsx(a,{code:`def consultar_sociedade(
    self, nome_advogado: str, url: str
) -> Optional[Dict[str, Any]]:`}),e.jsx("p",{children:"Consulta a API do CNA para obter informações da sociedade."}),e.jsx("h4",{children:"Args"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"nome_advogado"})}),e.jsx("td",{children:e.jsx("code",{children:"str"})}),e.jsx("td",{children:"Nome do advogado (para contexto de logs)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"url"})}),e.jsx("td",{children:e.jsx("code",{children:"str"})}),e.jsx("td",{children:"URL específica para consulta da sociedade"})]})]})]}),e.jsx("h4",{children:"Returns"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"Optional[Dict[str, Any]]"})}),e.jsx("td",{children:"Dados da sociedade ou None"})]})})]}),e.jsx("h4",{children:"Uso típico"}),e.jsx(a,{code:`# URL obtida de consulta anterior
detail_url = "https://cna.oab.org.br/api/sociedade/123"
sociedade = client.consultar_sociedade("João Silva", detail_url)`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos de Observabilidade"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{id:"obter_estatisticas",children:"obter_estatisticas"}),e.jsx(a,{code:"def obter_estatisticas(self) -> Dict[str, Any]:"}),e.jsx("p",{children:"Retorna estatísticas completas de uso do cliente CNA."}),e.jsx("h4",{children:"Estrutura de retorno"}),e.jsx(a,{code:`{
    "total_requests": 247,           # Total de requisições feitas
    "success_count": 230,            # Requisições bem-sucedidas
    "error_count": 17,               # Requisições com erro
    "success_rate": 0.931,           # Taxa de sucesso (0.0-1.0)
    "average_latency_ms": 245.3      # Latência média em ms
}`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{id:"reset_estatisticas",children:"reset_estatisticas"}),e.jsx(a,{code:"def reset_estatisticas(self) -> None:"}),e.jsx("p",{children:"Reseta todas as estatísticas de uso."})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Sistema de Observabilidade"}),e.jsx("h3",{children:"Correlation ID Tracking"}),e.jsx(a,{code:`correlation = get_correlation_id()  # UUID único por operação

# Logs estruturados
logger.info(f"[{correlation}] 🔍 CNA #{request_count}: Nome: João Silva")
logger.debug(f"[{correlation}] ✓ CNA Response (245ms): Nome: João Silva")`}),e.jsx("h3",{children:"Métricas de Performance"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Métrica"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"operation_count"})}),e.jsx("td",{children:"Counter"}),e.jsx("td",{children:"Número de operações por tipo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"operation_duration_ms"})}),e.jsx("td",{children:"Histogram"}),e.jsx("td",{children:"Latência por operação"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"operation_success_rate"})}),e.jsx("td",{children:"Gauge"}),e.jsx("td",{children:"Taxa de sucesso"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"error_count_by_type"})}),e.jsx("td",{children:"Counter"}),e.jsx("td",{children:"Erros categorizados"})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Tratamento de Erros"}),e.jsx("h3",{children:"Categorização por Tipo"}),e.jsx(a,{code:`except requests.exceptions.Timeout as e:
    error_msg = f"Timeout ao consultar advogado no CNA ({nome}, {oab})"
    logger.error(f"[{correlation}] ⏱️ {error_msg}")
    raise CNAAPIError(f"{error_msg}: {e}")

except requests.exceptions.ConnectionError as e:
    error_msg = f"Erro de conexão ao consultar advogado no CNA ({nome}, {oab})"
    logger.error(f"[{correlation}] 🔌 {error_msg}")
    raise CNAAPIError(f"{error_msg}: {e}")

except requests.exceptions.HTTPError as e:
    logger.error(f"[{correlation}] ❌ {error_msg}: Status {e.response.status_code}")
    raise CNAAPIError(f"{error_msg}: {e}", e.response.status_code)`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Consulta Básica de Advogado"}),e.jsx(a,{code:`# Inicialização
client = CNAClient(timeout=30)

# Consulta por nome
resultado = client.consultar_advogado(nome="João Silva Santos")
if resultado:
    print(f"Advogado encontrado: {resultado.get('Nome')}")
    print(f"OAB: {resultado.get('Inscricao')}")

# Consulta por OAB e UF
resultado = client.consultar_advogado(oab="123456", uf="MG")
if resultado:
    print(f"Nome: {resultado.get('Nome')}")
    print(f"Status: {resultado.get('Status')}")`}),e.jsx("h3",{children:"Consulta de Sociedade"}),e.jsx(a,{code:`# Primeiro, encontrar o advogado
advogado = client.consultar_advogado(nome="João Silva", oab="MG123456")

if advogado and 'DeatilUrl' in advogado:
    sociedade = client.consultar_sociedade(
        nome_advogado="João Silva",
        url=advogado['DeatilUrl']
    )

    if sociedade:
        print(f"Escritório: {sociedade.get('NomeEscritorio')}")
        print(f"CNPJ: {sociedade.get('CNPJ')}")`}),e.jsx("h3",{children:"Monitoramento de Performance"}),e.jsx(a,{code:`# Múltiplas consultas
advogados = ["João Silva", "Maria Santos", "Pedro Oliveira"]

for nome in advogados:
    try:
        resultado = client.consultar_advogado(nome=nome)
        print(f"✅ {nome}: {'Encontrado' if resultado else 'Não encontrado'}")
    except CNAAPIError as e:
        print(f"❌ {nome}: Erro - {e}")

# Verificar estatísticas
stats = client.obter_estatisticas()
print(f"Total de consultas: {stats['total_requests']}")
print(f"Taxa de sucesso: {stats['success_rate']:.1%}")
print(f"Latência média: {stats['average_latency_ms']:.1f}ms")`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Configuração e Ambiente"}),e.jsx(a,{code:`# config.py
CNA_BASE_URL = "https://cna.oab.org.br"
CNA_SEARCH_URL = "https://cna.oab.org.br/api/consulta"
TIMEOUT = 30  # segundos`})]})]});function Tm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: CNPJScraper"}),e.jsx("p",{className:"doc-subtitle",children:"Scraper especializado para busca de CNPJs com suporte a múltiplos providers."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsxs("p",{children:["A classe ",e.jsx("code",{className:"code-block",children:"CNPJScraper"})," realiza web scraping para encontrar CNPJs de empresas usando diferentes providers com fallback automático, cache inteligente e observabilidade completa."]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Classe CNPJScraper"}),e.jsx(a,{code:"class CNPJScraper:"}),e.jsx("p",{children:"Scraper especializado para busca de CNPJs com múltiplos providers."}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Web scraping de CNPJs em múltiplos sites"}),e.jsx("li",{children:"Fallback automático entre providers"}),e.jsx("li",{children:"Cache inteligente de resultados"}),e.jsx("li",{children:"Rate limiting e comportamento anti-detecção"}),e.jsx("li",{children:"Retry com backoff exponencial"}),e.jsx("li",{children:"Métricas de sucesso por provider"})]}),e.jsx("h3",{children:"Providers suportados"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"EMPRESA_DOIS"}),": empresadois.com.br (HTTP requests)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"EMPRESA_BIZZ"}),": cnpj.biz (Selenium/JavaScript)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"AUTO"}),": Fallback automático (EMPRESA_DOIS → EMPRESA_BIZZ)"]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Enum CNPJProvider"}),e.jsx(a,{code:`class CNPJProvider(Enum):
    EMPRESA_DOIS = "empresa_dois"
    EMPRESA_BIZZ = "empresa_bizz"
    AUTO = "auto"`}),e.jsx("p",{children:"Providers disponíveis para consulta de CNPJ."}),e.jsx("h3",{children:"Estratégias"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"EMPRESA_DOIS"}),": Rápido via HTTP, sem JavaScript"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"EMPRESA_BIZZ"}),": Selenium para sites que requerem JavaScript"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"AUTO"}),": Tenta EMPRESA_DOIS primeiro, fallback para EMPRESA_BIZZ"]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Inicialização"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:`def __init__(
    self,
    timeout: int = 10,
    session: requests.Session = None,
    max_retries: int = 3,
    provider: CNPJProvider = CNPJProvider.AUTO,
):`}),e.jsx("p",{children:"Inicializa o scraper de CNPJ com configuração otimizada."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"timeout"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Timeout para requisições HTTP"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"session"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[Session]"})}),e.jsx("td",{children:"Sessão HTTP reutilizável"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"max_retries"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Máximo de tentativas por provider"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"provider"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"CNPJProvider"})}),e.jsx("td",{children:"Provider padrão a usar"})]})]})]}),e.jsx("h4",{children:"Headers anti-detecção"}),e.jsx(a,{code:`{
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif...",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Cache-Control": "max-age=0"
}`}),e.jsx("h4",{children:"Estratégias inicializadas"}),e.jsx(a,{code:`self.strategies = {
    CNPJProvider.EMPRESA_DOIS: EmpresaDoisStrategy(config.EMPRESA_DOIS_URL),
    CNPJProvider.EMPRESA_BIZZ: EmpresaBizzStrategy(config.EMPRESA_BIZZ_URL),
}`}),e.jsx("h4",{children:"Cache de sessão"}),e.jsx(a,{code:"self.cnpj_cache: Dict[str, CNPJResult] = {}"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Principais de Consulta"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"consultar_cnpj",children:"consultar_cnpj"}),e.jsx(a,{code:`def consultar_cnpj(
    self,
    nome_empresa: str,
    use_cache: bool = True,
    provider_override: Optional[CNPJProvider] = None,
    uf_advogado: Optional[str] = None,
) -> Optional[str]:`}),e.jsx("p",{children:"Consulta o CNPJ de uma empresa pelo nome (retorna apenas CNPJ)."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"nome_empresa"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome da empresa a consultar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"use_cache"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"Se deve usar cache de resultados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"provider_override"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[CNPJProvider]"})}),e.jsx("td",{children:"Provider específico para esta consulta"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"uf_advogado"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[str]"})}),e.jsx("td",{children:"UF para critério de desempate"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[str]"})}),e.jsx("td",{children:"CNPJ encontrado (formato XX.XXX.XXX/XXXX-XX) ou None"})]})})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`cnpj = scraper.consultar_cnpj("Silva & Associados Advogados")
print(cnpj)  # "12.345.678/0001-99"`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"consultar_cnpj_com_nome",children:"consultar_cnpj_com_nome"}),e.jsx(a,{code:`def consultar_cnpj_com_nome(
    self,
    nome_empresa: str,
    use_cache: bool = True,
    provider_override: Optional[CNPJProvider] = None,
    uf_advogado: Optional[str] = None,
) -> CNPJResult:`}),e.jsx("p",{children:"Consulta CNPJ e retorna também o nome oficial da empresa."}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"CNPJResult"})}),e.jsx("td",{children:"Objeto com CNPJ e nome oficial (razão social)"})]})})]}),e.jsx("h4",{children:"Vantagens"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Retorna nome oficial conforme Receita Federal"}),e.jsx("li",{children:"Pode diferir do nome fornecido (acentos, hífens, etc.)"}),e.jsx("li",{children:"Útil para padronização de dados"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`result = scraper.consultar_cnpj_com_nome("Silva Advogados")
if result.cnpj:
    print(f"CNPJ: {result.cnpj}")
    print(f"Razão Social: {result.nome_oficial}")
    # CNPJ: 12.345.678/0001-99
    # Razão Social: Silva & Associados Advocacia Ltda`}),e.jsx("h4",{children:"Cache com UF"}),e.jsx(a,{code:`# Cache diferenciado por UF quando fornecida
cache_key = nome_empresa.lower()
if uf_advogado:
    cache_key = f"{cache_key}_{uf_advogado.upper()}"`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Sistema de Fallback Automático"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_try_provider",children:"_try_provider"}),e.jsx(a,{code:`def _try_provider(
    self,
    provider: CNPJProvider,
    nome_empresa: str,
    uf_advogado: Optional[str] = None,
) -> CNPJResult:`}),e.jsx("p",{children:"Tenta consultar CNPJ usando provider específico (método privado)."}),e.jsx("h4",{children:"Fluxo com retry"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Delay inicial"}),": Entre tentativas para simular comportamento humano"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Requisição"}),": HTTP ou Selenium dependendo do provider"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Error handling"}),": Categorizado por tipo de erro"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Backoff"}),": Delay exponencial entre tentativas"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Logging"}),": Detalhado por tentativa e resultado"]})]}),e.jsx("h4",{children:"Rate limiting inteligente"}),e.jsx(a,{code:`if attempt > 0:
    wait_time = 2 + attempt  # 2s, 3s, 4s...
    logger.debug(f"Aguardando {wait_time}s antes da requisição...")
    time.sleep(wait_time)`}),e.jsx("h4",{children:"Tratamento de erros específicos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Erro HTTP"}),e.jsx("th",{children:"Estratégia"}),e.jsx("th",{children:"Wait Time"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"403 Forbidden"}),e.jsx("td",{children:"Anti-bot detectado"}),e.jsx("td",{children:"5 * (attempt + 1)s"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"429 Rate Limit"}),e.jsx("td",{children:"Quota excedida"}),e.jsx("td",{children:"4 * (attempt + 1)s"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Timeout"}),e.jsx("td",{children:"Rede lenta"}),e.jsx("td",{children:"Retry imediato"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Connection"}),e.jsx("td",{children:"Rede instável"}),e.jsx("td",{children:"2 * (attempt + 1)s"})]})]})]})]}),e.jsx("h3",{children:"Fallback Automático (AUTO mode)"}),e.jsx(a,{code:`if provider == CNPJProvider.AUTO:
    # Tentar EMPRESA_DOIS primeiro (mais rápido)
    result = self._try_provider(CNPJProvider.EMPRESA_DOIS, nome_empresa, uf_advogado)

    # Fallback para EMPRESA_BIZZ se necessário
    if not result.cnpj:
        logger.info("Tentando provider alternativo (EmpresaBizz/Selenium)")
        result = self._try_provider(CNPJProvider.EMPRESA_BIZZ, nome_empresa, uf_advogado)`}),e.jsx("h4",{children:"Logs informativos"}),e.jsx(a,{code:`logger.info("[EmpresaDois] Consultando CNPJ para: Silva Advogados (tentativa 1/3)")
logger.info("[EmpresaDois] ❌ CNPJ não encontrado")
logger.info("Tentando provider alternativo (EmpresaBizz/Selenium)")
logger.info("[EmpresaBizz] ✅ CNPJ encontrado: 12.345.678/0001-99")`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos de Cache"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"limpar_cache",children:"limpar_cache"}),e.jsx(a,{code:"def limpar_cache(self) -> None:"}),e.jsx("p",{children:"Limpa o cache de CNPJs consultados."}),e.jsx(a,{code:"scraper.limpar_cache()  # Reset para nova sessão"})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"obter_estatisticas_cache",children:"obter_estatisticas_cache"}),e.jsx(a,{code:"def obter_estatisticas_cache(self) -> Dict[str, int]:"}),e.jsx("p",{children:"Retorna estatísticas detalhadas do cache."}),e.jsx(a,{code:`{
    "total_consultas": 150,      # Total de itens no cache
    "sucessos": 128,             # Consultas que encontraram CNPJ
    "falhas": 22,                # Consultas sem resultado
    "taxa_sucesso": 85.33,       # Percentual de sucesso
    "total_requisicoes": 180     # Total de requisições HTTP feitas
}`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"obter_cnpj_do_cache"}),e.jsx(a,{code:"def obter_cnpj_do_cache(self, nome_empresa: str) -> Optional[str]:"}),e.jsx("p",{children:"Obtém CNPJ do cache sem fazer nova consulta."}),e.jsx(a,{code:`# Verificar se já consultado
cnpj = scraper.obter_cnpj_do_cache("Silva Advogados")
if cnpj:
    print(f"CNPJ em cache: {cnpj}")
else:
    # Fazer nova consulta
    cnpj = scraper.consultar_cnpj("Silva Advogados")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"obter_resultado_do_cache"}),e.jsx(a,{code:"def obter_resultado_do_cache(self, nome_empresa: str) -> Optional[CNPJResult]:"}),e.jsx("p",{children:"Obtém resultado completo (CNPJ + nome oficial) do cache."})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Limpeza de Recursos"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"cleanup",children:"cleanup"}),e.jsx(a,{code:"def cleanup(self) -> None:"}),e.jsx("p",{children:"Limpa recursos (fecha drivers Selenium, etc.)."}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Chama ",e.jsx("code",{className:"code-block",children:"cleanup()"})," em todas as estratégias"]}),e.jsx("li",{children:"Fecha drivers Selenium se iniciados"}),e.jsx("li",{children:"Libera recursos de rede"}),e.jsx("li",{children:"Log de confirmação"})]}),e.jsx(a,{code:`try:
    result = scraper.consultar_cnpj("Empresa")
finally:
    scraper.cleanup()  # Sempre limpar recursos`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"__del__"}),e.jsx(a,{code:"def __del__(self):"}),e.jsx("p",{children:"Destrutor que garante cleanup ao finalizar objeto."}),e.jsxs("ul",{children:[e.jsx("li",{children:"Cleanup automático ao sair de escopo"}),e.jsx("li",{children:"Silencia erros durante shutdown do interpretador"}),e.jsx("li",{children:"Prevenção de vazamentos de recursos"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Tratamento de Erros Avançado"}),e.jsx("h3",{children:"Categorização por Provider"}),e.jsx("h4",{children:"EMPRESA_DOIS (HTTP)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Timeout: Rede lenta, retry imediato"}),e.jsx("li",{children:"403: Site detectou bot, delay maior"}),e.jsx("li",{children:"429: Rate limit, aguardar mais tempo"}),e.jsx("li",{children:"Connection: Problemas de rede, delay progressivo"})]}),e.jsx("h4",{children:"EMPRESA_BIZZ (Selenium)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"WebDriverException: Problema com browser"}),e.jsx("li",{children:"TimeoutException: JavaScript não carregou"}),e.jsx("li",{children:"ElementNotFound: Estrutura da página mudou"})]}),e.jsx("h3",{children:"Logs Estruturados"}),e.jsx(a,{code:`# Por provider e tentativa
logger.info(f"[{strategy.get_name()}] Consultando CNPJ para: {nome_empresa} "
           f"(tentativa {attempt + 1}/{max_retries})")

# Resultados detalhados
if result.cnpj:
    logger.info(f"[{strategy.get_name()}] ✅ CNPJ encontrado: {result.cnpj}")
else:
    logger.warning(f"[{strategy.get_name()}] ❌ CNPJ não encontrado")`}),e.jsx("h3",{children:"Retry Inteligente"}),e.jsx(a,{code:`# Delay baseado no tipo de erro
if response.status_code == 403:
    wait_time = 5 * (attempt + 1)  # Maior delay para anti-bot
elif response.status_code == 429:
    wait_time = 4 * (attempt + 1)  # Delay para rate limit
else:
    wait_time = 2 * (attempt + 1)  # Delay padrão`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Uso Básico com Fallback"}),e.jsx(a,{code:`# Inicialização com fallback automático
scraper = CNPJScraper(
    timeout=15,
    max_retries=3,
    provider=CNPJProvider.AUTO
)

# Consulta simples
cnpj = scraper.consultar_cnpj("Silva & Associados Advogados")
if cnpj:
    print(f"✅ CNPJ encontrado: {cnpj}")
else:
    print("❌ CNPJ não encontrado")

# Limpeza
scraper.cleanup()`}),e.jsx("h3",{children:"Consulta com Nome Oficial"}),e.jsx(a,{code:`# Obter dados completos
result = scraper.consultar_cnpj_com_nome("Silva Advogados")

if result.cnpj:
    print(f"CNPJ: {result.cnpj}")
    print(f"Razão Social: {result.nome_oficial}")

    # Comparar nomes
    if result.nome_oficial != "Silva Advogados":
        print(f"Nome divergente detectado!")`}),e.jsx("h3",{children:"Provider Específico"}),e.jsx(a,{code:`# Forçar uso de Selenium (para sites complexos)
result = scraper.consultar_cnpj_com_nome(
    nome_empresa="Empresa Complexa Ltd",
    provider_override=CNPJProvider.EMPRESA_BIZZ
)

# Forçar uso de HTTP (para velocidade)
result = scraper.consultar_cnpj_com_nome(
    nome_empresa="Empresa Simples",
    provider_override=CNPJProvider.EMPRESA_DOIS
)`}),e.jsx("h3",{children:"Critério de Desempate por UF"}),e.jsx(a,{code:`# UF do advogado para melhor precisão
result = scraper.consultar_cnpj_com_nome(
    nome_empresa="Silva Advogados",
    uf_advogado="MG"  # Prioriza resultados de MG
)

# Útil quando há várias empresas com nome similar`}),e.jsx("h3",{children:"Processamento em Lote"}),e.jsx(a,{code:`empresas = ["Silva Advogados", "Santos & Associados", "Oliveira Ltda"]
resultados = {}

for empresa in empresas:
    try:
        result = scraper.consultar_cnpj_com_nome(empresa)
        resultados[empresa] = result

        if result.cnpj:
            print(f"✅ {empresa}: {result.cnpj}")
        else:
            print(f"❌ {empresa}: Não encontrado")

    except ValidationError as e:
        print(f"⚠️ {empresa}: Dados inválidos - {e}")

# Estatísticas finais
stats = scraper.obter_estatisticas_cache()
print(f"\\n📊 Taxa de sucesso: {stats['taxa_sucesso']:.1f}%")
print(f"📊 Total de requisições: {stats['total_requisicoes']}")`}),e.jsx("h3",{children:"Monitoramento e Cache"}),e.jsx(a,{code:`# Verificar cache antes de consultar
def consultar_com_cache_check(scraper, empresa):
    # Tentar cache primeiro
    cached = scraper.obter_cnpj_do_cache(empresa)
    if cached:
        print(f"📋 Cache: {empresa} -> {cached}")
        return cached

    # Fazer nova consulta
    print(f"🔍 Consultando: {empresa}")
    result = scraper.consultar_cnpj(empresa)
    return result

# Monitorar performance
def relatorio_performance(scraper):
    stats = scraper.obter_estatisticas_cache()

    print(f"📈 Relatório de Performance:")
    print(f"   Total consultas: {stats['total_consultas']}")
    print(f"   Sucessos: {stats['sucessos']}")
    print(f"   Falhas: {stats['falhas']}")
    print(f"   Taxa de sucesso: {stats['taxa_sucesso']:.1f}%")
    print(f"   Requisições HTTP: {stats['total_requisicoes']}")

    # Eficiência do cache
    if stats['total_requisicoes'] > 0:
        cache_efficiency = 1 - (stats['total_requisicoes'] / stats['total_consultas'])
        print(f"   Eficiência cache: {cache_efficiency:.1%}")`}),e.jsx("h3",{children:"Context Manager"}),e.jsx(a,{code:`# Uso com contexto (cleanup automático)
class CNPJScraperContext:
    def __init__(self, **kwargs):
        self.scraper = CNPJScraper(**kwargs)

    def __enter__(self):
        return self.scraper

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.scraper.cleanup()

# Uso com context manager
with CNPJScraperContext(provider=CNPJProvider.AUTO) as scraper:
    cnpj = scraper.consultar_cnpj("Minha Empresa")
    print(f"CNPJ: {cnpj}")
# Cleanup automático`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Configuração Avançada"}),e.jsx("h3",{children:"Sessão Customizada"}),e.jsx(a,{code:`# Configurar sessão com proxy
session = requests.Session()
session.proxies = {
    'http': 'http://proxy.exemplo.com:8080',
    'https': 'https://proxy.exemplo.com:8080'
}

# Headers customizados
session.headers.update({
    'X-Custom-Header': 'valor-personalizado'
})

# Scraper com sessão customizada
scraper = CNPJScraper(session=session, timeout=30)`}),e.jsx("h3",{children:"Configuração por Provider"}),e.jsx(a,{code:`# URLs customizadas
config.EMPRESA_DOIS_URL = "https://empresadois-custom.com.br"
config.EMPRESA_BIZZ_URL = "https://cnpj-custom.biz"

# Inicialização com configuração específica
scraper = CNPJScraper(
    timeout=20,
    max_retries=5,
    provider=CNPJProvider.EMPRESA_BIZZ  # Apenas Selenium
)`})]})]})}function Rm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Estratégias de Scraping CNPJ"}),e.jsx("p",{className:"doc-subtitle",children:"Estratégias especializadas para diferentes providers de CNPJ com anti-detecção."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsx("p",{children:"Este módulo implementa o padrão Strategy para scraping de CNPJs, permitindo múltiplos providers com diferentes tecnologias (HTTP requests e Selenium) e técnicas anti-detecção específicas para cada site."})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Classe Base: CNPJScraperStrategy"}),e.jsx(a,{code:"class CNPJScraperStrategy(ABC):"}),e.jsx("p",{children:"Interface abstrata para estratégias de scraping de CNPJ."}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Definir contrato comum para providers"}),e.jsx("li",{children:"Construção de URLs de busca"}),e.jsx("li",{children:"Extração de dados do HTML/JavaScript"}),e.jsx("li",{children:"Limpeza de recursos quando necessário"})]}),e.jsx("h3",{children:"Métodos Abstratos"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{children:"get_url"}),e.jsx(a,{code:`@abstractmethod
def get_url(self, nome_empresa: str) -> str:`}),e.jsx("p",{children:"Constrói a URL de busca para o nome da empresa."})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{children:"extract_cnpj"}),e.jsx(a,{code:`@abstractmethod
def extract_cnpj(
    self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None
) -> CNPJResult:`}),e.jsx("p",{children:"Extrai CNPJ e nome oficial do conteúdo HTML."})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{children:"get_name"}),e.jsx(a,{code:`@abstractmethod
def get_name(self) -> str:`}),e.jsx("p",{children:"Retorna o nome do provider para logs."})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{children:"cleanup (opcional)"}),e.jsx(a,{code:"def cleanup(self) -> None:"}),e.jsx("p",{children:"Limpa recursos (drivers Selenium, etc.)."})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Classe de Resultado: CNPJResult"}),e.jsx(a,{code:`@dataclass
class CNPJResult:
    cnpj: Optional[str] = None
    nome_oficial: Optional[str] = None

    def __bool__(self) -> bool:
        return self.cnpj is not None`}),e.jsx("p",{children:"Resultado da busca de CNPJ com dados estruturados."}),e.jsx("h3",{children:"Campos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"cnpj"}),": CNPJ no formato XX.XXX.XXX/XXXX-XX"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"nome_oficial"}),": Razão social conforme Receita Federal"]})]}),e.jsx("h3",{children:"Uso como boolean"}),e.jsx(a,{code:`result = strategy.extract_cnpj(html, "Empresa")
if result:  # True se cnpj não é None
    print(f"CNPJ: {result.cnpj}")`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{id:"EmpresaDoisStrategy",children:"Estratégia: EmpresaDoisStrategy"}),e.jsx(a,{code:"class EmpresaDoisStrategy(CNPJScraperStrategy):"}),e.jsx("p",{children:"Estratégia para busca via empresadois.com.br usando HTTP requests."}),e.jsx("h3",{children:"Características"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Rápido (apenas HTTP)"}),e.jsx("li",{children:"Não requer JavaScript"}),e.jsx("li",{children:"Parsing com BeautifulSoup"}),e.jsx("li",{children:"Fuzzy matching para melhor precisão"}),e.jsx("li",{children:"Critério de desempate por data de abertura"})]}),e.jsx("h3",{children:"Métodos Implementados"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{children:"get_url"}),e.jsx(a,{code:`def get_url(self, nome_empresa: str) -> str:
    nome_encoded = quote_plus(nome_empresa)
    return f"{self.base_url}?q={nome_encoded}&sf=widget_search"`}),e.jsx("p",{children:"Constrói URL com encoding seguro para caracteres especiais."})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{children:"extract_cnpj"}),e.jsx(a,{code:`def extract_cnpj(
    self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None
) -> CNPJResult:`}),e.jsx("h5",{children:"Algoritmo de extração"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Parse HTML"}),": BeautifulSoup para estrutura DOM"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Busca resultados"}),":"," ",e.jsx("code",{className:"code-block",children:"div.city_comp"})," para cada empresa"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Extração dados"}),": Nome, CNPJ, data de abertura"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fuzzy matching"}),": Score de similaridade entre nomes"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Critério desempate"}),": Data de abertura mais recente"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Retorno"}),": Melhor match encontrado"]})]}),e.jsx("h5",{children:"Estrutura HTML esperada"}),e.jsx(a,{code:`<div class="city_comp">
    <a>Nome da Empresa</a>
    <p class="city_info">12.345.678/0001-99 | Outras informações</p>
    <p class="city_info">Data de abertura: 15/03/2010</p>
</div>`}),e.jsx("h5",{children:"Regex patterns"}),e.jsx(a,{code:`padrao_cnpj = re.compile(r"\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}")
match_data = re.search(r"(\\d{2}/\\d{2}/\\d{4})", texto)`}),e.jsx("h5",{children:"Scoring algorithm"}),e.jsx(a,{code:`score = fuzz.ratio(nome_empresa_normalizado, nome_resultado_normalizado)

if score > best_match["score"]:
    best_match = {
        "cnpj": cnpj_encontrado,
        "nome": nome_original,
        "score": score,
        "data_abertura": data_abertura
    }
elif score == best_match["score"]:
    # Desempate por data mais recente
    if data_abertura > best_match["data_abertura"]:
        best_match = novo_resultado`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{id:"EmpresaBizzStrategy",children:"Estratégia: EmpresaBizzStrategy"}),e.jsx(a,{code:"class EmpresaBizzStrategy(CNPJScraperStrategy):"}),e.jsx("p",{children:"Estratégia para busca via cnpj.biz usando Selenium (site requer JavaScript)."}),e.jsx("h3",{children:"Características"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Selenium WebDriver (Chrome headless)"}),e.jsx("li",{children:"Configurações anti-detecção avançadas"}),e.jsx("li",{children:"Critério de desempate por UF quando fornecida"}),e.jsx("li",{children:"Parsing dinâmico de JavaScript"}),e.jsx("li",{children:"Timeout inteligente e retry"})]}),e.jsx("h3",{children:"Inicialização Selenium"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{children:"_init_driver"}),e.jsx(a,{code:"def _init_driver(self):"}),e.jsx("p",{children:"Inicializa Chrome WebDriver com configurações anti-detecção."}),e.jsx("h5",{children:"Configurações Chrome"}),e.jsx(a,{code:`chrome_options = Options()
chrome_options.add_argument("--headless=new")        # Modo headless
chrome_options.add_argument("--no-sandbox")          # Bypass sandbox
chrome_options.add_argument("--disable-dev-shm-usage") # Uso de memória

# Anti-detecção
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option("useAutomationExtension", False)
chrome_options.add_argument("--disable-blink-features=AutomationControlled")

# User agent realista
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64)...")`}),e.jsx("h5",{children:"Script anti-detecção"}),e.jsx(a,{code:`Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
});

window.navigator.chrome = {
    runtime: {},
};

Object.defineProperty(navigator, 'plugins', {
    get: () => [1, 2, 3, 4, 5],
});`})]}),e.jsx("h3",{children:"Extração com Selenium"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h4",{children:"extract_cnpj"}),e.jsx(a,{code:`def extract_cnpj(
    self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None
) -> CNPJResult:`}),e.jsx("h5",{children:"Fluxo de extração"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Inicialização"}),": Driver Selenium com anti-detecção"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Navegação"}),": Acesso à URL de busca"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Wait"}),": Aguarda carregamento do JavaScript"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Parse"}),": Extração de elementos dinâmicos"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Análise"}),": Scoring e desempate com UF"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Retorno"}),": Melhor resultado encontrado"]})]}),e.jsx("h5",{children:"Seletores CSS"}),e.jsx(a,{code:`# Lista de resultados
'div.shadow ul[role="list"] > li'

# Nome da empresa
"p.text-lg.font-medium.text-blue-600"

# Informações (CNPJ, localização)
'.//p[@class="flex items-center text-sm text-gray-500"]'

# Data de abertura
"time"  # com atributo datetime`}),e.jsx("h5",{children:"Wait conditions"}),e.jsx(a,{code:`WebDriverWait(driver, 15).until(
    EC.presence_of_element_located(
        (By.CSS_SELECTOR, 'div.shadow ul[role="list"]')
    )
)`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Algoritmo de Desempate Avançado"}),e.jsx("h3",{children:"Critério por UF (quando fornecida)"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Prioridade máxima"}),": Resultados com UF correspondente"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fallback"}),": Melhor score geral se nenhum match de UF"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Warning"}),": Log quando não há correspondência de UF"]})]}),e.jsx(a,{code:`if uf_advogado:
    # Filtra resultados com UF correspondente
    uf_matches = [r for r in all_results if r["uf_match"]]

    if uf_matches:
        # Melhor entre os que batem UF
        best_match = max(uf_matches, key=lambda x: (x["score"], x["date"]))
        logger.info(f"✓ Match com UF correspondente ({best_match['uf']})")
    else:
        # Nenhum com UF correspondente
        best_match = max(all_results, key=lambda x: (x["score"], x["date"]))
        logger.warning(f"⚠ Nenhum resultado com UF={uf_advogado}")`}),e.jsx("h3",{children:"Penalização por traço"}),e.jsx(a,{code:`# Empresa buscada: "Silva Advogados"
# Resultado: "Silva - Advogados Ltda"
# Aplica pequena penalização se resultado tem traço e busca não tem

has_dash_in_search = "-" in nome_empresa
has_dash_in_result = "-" in company_name_result

if not has_dash_in_search and has_dash_in_result:
    dash_penalty = 2  # Penalização leve
    score = max(0, score - dash_penalty)`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Limpeza de Recursos"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"cleanup"}),e.jsx(a,{code:"def cleanup(self):"}),e.jsx("p",{children:"Fecha driver Selenium de forma segura."}),e.jsx(a,{code:`if self._driver:
    try:
        self._driver.quit()
        logger.info("Driver Selenium fechado")
    except Exception as e:
        logger.error(f"Erro ao fechar driver: {e}")
    finally:
        self._driver = None
        self._driver_initialized = False`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Comparação entre Estratégias"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Aspecto"}),e.jsx("th",{children:"EmpresaDoisStrategy"}),e.jsx("th",{children:"EmpresaBizzStrategy"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Tecnologia"})}),e.jsx("td",{children:"HTTP + BeautifulSoup"}),e.jsx("td",{children:"Selenium + Chrome"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Velocidade"})}),e.jsx("td",{children:"Rápido (~200ms)"}),e.jsx("td",{children:"Lento (~3-5s)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"JavaScript"})}),e.jsx("td",{children:"Não suporta"}),e.jsx("td",{children:"Suporta totalmente"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Anti-detecção"})}),e.jsx("td",{children:"Headers HTTP"}),e.jsx("td",{children:"Configuração completa"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Recursos"})}),e.jsx("td",{children:"Baixo consumo"}),e.jsx("td",{children:"Alto consumo (RAM/CPU)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Confiabilidade"})}),e.jsx("td",{children:"Pode quebrar com mudanças"}),e.jsx("td",{children:"Mais resiliente"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Desempate UF"})}),e.jsx("td",{children:"Não implementado"}),e.jsx("td",{children:"Implementado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Data abertura"})}),e.jsx("td",{children:"Sim"}),e.jsx("td",{children:"Sim"})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Uso Direto das Estratégias"}),e.jsx(a,{code:`# Estratégia HTTP (rápida)
strategy = EmpresaDoisStrategy("https://empresadois.com.br")

result = strategy.extract_cnpj(html_content, "Silva Advogados")
if result:
    print(f"CNPJ: {result.cnpj}")
    print(f"Nome: {result.nome_oficial}")

# Limpeza (não necessária para HTTP)
strategy.cleanup()`}),e.jsx(a,{code:`# Estratégia Selenium (JavaScript)
strategy = EmpresaBizzStrategy("https://cnpj.biz")

# Não precisa passar html_content (Selenium faz própria requisição)
result = strategy.extract_cnpj(None, "Silva Advogados", uf_advogado="MG")

if result:
    print(f"CNPJ: {result.cnpj}")
    print(f"Nome oficial: {result.nome_oficial}")

# Limpeza obrigatória (fechar browser)
strategy.cleanup()`}),e.jsx("h3",{children:"Factory Pattern (Uso Recomendado)"}),e.jsx(a,{code:`def create_strategy(provider_type: str) -> CNPJScraperStrategy:
    strategies = {
        "empresa_dois": EmpresaDoisStrategy(config.EMPRESA_DOIS_URL),
        "empresa_bizz": EmpresaBizzStrategy(config.EMPRESA_BIZZ_URL)
    }
    return strategies.get(provider_type)

# Uso
strategy = create_strategy("empresa_dois")
result = strategy.extract_cnpj(html, "Empresa")`}),e.jsx("h3",{children:"Context Manager para Selenium"}),e.jsx(a,{code:`class SeleniumStrategy:
    def __init__(self):
        self.strategy = EmpresaBizzStrategy(config.EMPRESA_BIZZ_URL)

    def __enter__(self):
        return self.strategy

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.strategy.cleanup()

# Uso seguro
with SeleniumStrategy() as strategy:
    result = strategy.extract_cnpj(None, "Empresa", uf_advogado="SP")
    print(f"Resultado: {result.cnpj}")
# Cleanup automático`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Tratamento de Erros"}),e.jsx("h3",{children:"EmpresaDoisStrategy"}),e.jsx("p",{children:e.jsx("strong",{children:"Erros comuns:"})}),e.jsxs("ul",{children:[e.jsx("li",{children:"HTML structure changed: Seletores CSS não encontram elementos"}),e.jsx("li",{children:"Invalid date format: Parse de data falha"}),e.jsxs("li",{children:["No results: Nenhum ",e.jsx("code",{className:"code-block",children:"div.city_comp"})," ","encontrado"]})]}),e.jsx(a,{code:`try:
    resultados = soup.find_all("div", class_="city_comp")
    if not resultados:
        logger.warning(f"Nenhum resultado encontrado para: {nome_empresa}")
        return CNPJResult()
except Exception as e:
    logger.error(f"Erro no parsing HTML: {e}")
    return CNPJResult()`}),e.jsx("h3",{children:"EmpresaBizzStrategy"}),e.jsx("p",{children:e.jsx("strong",{children:"Erros específicos:"})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"WebDriverException"}),": Problema com Chrome/Selenium"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"TimeoutException"}),": Página não carregou JavaScript"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"ElementNotFound"}),": Seletores não encontram elementos"]})]}),e.jsx(a,{code:`try:
    driver.get(url)
    WebDriverWait(driver, 15).until(condition)
    # ... extração ...
except TimeoutException:
    logger.error(f"Timeout ao carregar página para: {nome_empresa}")
    return CNPJResult()
except WebDriverException as e:
    logger.error(f"Erro no WebDriver: {e}")
    return CNPJResult()`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Configuração e Customização"}),e.jsx("h3",{children:"URLs por Environment"}),e.jsx(a,{code:`# config.py
EMPRESA_DOIS_URL = os.getenv("EMPRESA_DOIS_URL", "https://empresadois.com.br")
EMPRESA_BIZZ_URL = os.getenv("EMPRESA_BIZZ_URL", "https://cnpj.biz")`}),e.jsx("h3",{children:"Headers Customizados"}),e.jsx(a,{code:`# EmpresaDoisStrategy usa session do CNPJScraper
# Headers configurados no scraper principal

# EmpresaBizzStrategy usa User-Agent no Chrome
chrome_options.add_argument(f"user-agent={custom_user_agent}")`}),e.jsx("h3",{children:"Timeouts Configuráveis"}),e.jsx(a,{code:`# Selenium timeouts
driver.implicitly_wait(10)
WebDriverWait(driver, 15).until(condition)

# HTTP timeout configurado no scraper principal`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Extensibilidade"}),e.jsx("h3",{children:"Adicionando Nova Estratégia"}),e.jsx(a,{code:`class NovaEstrategiaStrategy(CNPJScraperStrategy):
    def get_url(self, nome_empresa: str) -> str:
        # Implementar construção de URL
        pass

    def extract_cnpj(self, html_content: str, nome_empresa: str, uf_advogado: Optional[str] = None) -> CNPJResult:
        # Implementar extração específica
        pass

    def get_name(self) -> str:
        return "NovaEstrategia"

    def cleanup(self) -> None:
        # Limpar recursos se necessário
        pass`}),e.jsx("h3",{children:"Registro no CNPJScraper"}),e.jsx(a,{code:`# Adicionar ao enum
class CNPJProvider(Enum):
    NOVA_ESTRATEGIA = "nova_estrategia"

# Adicionar ao strategies dict
self.strategies[CNPJProvider.NOVA_ESTRATEGIA] = NovaEstrategiaStrategy(url)`})]})]})}function zm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Contact Mappers"}),e.jsx("p",{className:"doc-subtitle",children:"Transformação de dados de domínio em payloads formatados para a API do Ploomes."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Visão Geral"}),e.jsxs("p",{children:["O módulo ",e.jsx("code",{className:"code-block",children:"contact_mapper"})," é responsável por transformar dados de domínio em payloads formatados para a API do Ploomes. Utiliza o padrão ",e.jsx("strong",{children:"Factory"})," para criar mappers especializados."]}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Responsabilidade"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Transformação"}),e.jsx("td",{children:"Converte DTOs de domínio para formato Ploomes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Validação"}),e.jsx("td",{children:"Valida e formata CPF, CNPJ, telefones"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Mapeamento"}),e.jsx("td",{children:"Mapeia campos customizados (OtherProperties)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Factory"}),e.jsx("td",{children:"Cria instâncias de mappers especializados"})]})]})]}),e.jsx("h3",{children:"Hierarquia de Classes"}),e.jsx(a,{code:`ContactMapperBase (classe base)
├── EscritorioMapper (escritórios/empresas)
├── AdvogadoMapper (advogados/pessoas)
├── ReclamanteMapper (reclamantes/pessoas)
└── DealMapper (negócios/deals)

ContactMapperFactory (factory)`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"ContactMapperBase"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:"def __init__(self, field_mappings: Dict[str, Any], logger):"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Inicializa a classe base de mapeamento."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"field_mappings"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict[str, Any]"})}),e.jsx("td",{children:"Mapeamentos de campos do JSON"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger para operações"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"create_base_contact",children:"create_base_contact"}),e.jsx(a,{code:`def create_base_contact(
    self,
    name: str,
    type_id: int,
    register: str = None,
    company_id: Optional[int] = None
) -> Dict[str, Any]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Cria estrutura base de contato do Ploomes."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do contato"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"type_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Tipo (1=Empresa, 2=Pessoa)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"register"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"CPF/CNPJ (opcional)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"company_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID da empresa associada (opcional)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsx(a,{code:`{
    "Name": str,
    "TypeId": int,
    "Register": str,
    "CompanyId": int,
    "OriginId": int,
    "Phones": [],
    "OtherProperties": [],
}`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"add_other_property",children:"add_other_property"}),e.jsx(a,{code:`def add_other_property(
    self,
    other_props: List[Dict],
    field_key: str,
    value: Any,
    value_type: str = "StringValue"
) -> None`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Adiciona propriedade personalizada à lista de OtherProperties."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"other_props"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[Dict]"})}),e.jsx("td",{children:"Lista a ser modificada (in-place)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"field_key"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Chave do campo personalizado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"value"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Any"})}),e.jsx("td",{children:"Valor a ser adicionado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"value_type"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:'Tipo do valor (padrão: "StringValue")'})]})]})]}),e.jsx("h4",{children:"Tipos Suportados"}),e.jsxs("ul",{children:[e.jsx("li",{children:'"StringValue" - Strings'}),e.jsx("li",{children:'"BoolValue" - Booleanos'}),e.jsx("li",{children:'"IntValue" / "IntegerValue" - Inteiros'}),e.jsx("li",{children:'"DecimalValue" - Decimais'}),e.jsx("li",{children:'"DateValue" - Datas'})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`other_props = []
self.add_other_property(
    other_props,
    "contact_ABC123",
    "Valor do Campo",
    "StringValue"
)
# other_props agora contém:
# [{"FieldKey": "contact_ABC123", "StringValue": "Valor do Campo"}]`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"process_conditional_fields",children:"process_conditional_fields"}),e.jsx(a,{code:`def process_conditional_fields(
    self,
    other_props: List[Dict],
    data: Dict[str, Any],
    config: Dict[str, Any],
    field_mappings: List[str]
) -> None`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Processa campos condicionais baseados na configuração."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"process_phone_fields",children:"process_phone_fields"}),e.jsx(a,{code:`def process_phone_fields(
    self,
    contact: Dict[str, Any],
    data: Dict[str, Any],
    phone_fields: List[str],
) -> None`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Processa campos de telefone e adiciona ao contato."]}),e.jsx("h4",{children:"Estrutura de Telefone"}),e.jsx(a,{code:`{
    "PhoneNumber": str,  # Formatado
    "SearchPhoneNumber": int,
    "TypeId": 1,
    "CountryId": 0
}`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"process_email_fields",children:"process_email_fields"}),e.jsx(a,{code:`def process_email_fields(
    self,
    other_props: List[Dict],
    data: Dict[str, Any],
    config: Dict[str, Any],
    email_fields: List[str],
) -> None`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Processa campos de email e adiciona às propriedades."]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"EscritorioMapper"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"map_to_ploomes_escritorio",children:"map_to_ploomes"}),e.jsx(a,{code:"def map_to_ploomes(self, escritorio_data: Dict[str, Any]) -> Tuple[Dict[str, Any], int]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Mapeia dados do escritório para formato do Ploomes."]}),e.jsx("h4",{children:"Campos Obrigatórios"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Nome"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do escritório"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Pessoa_Física"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:'"Sim"/"Não"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CNPJ"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"CNPJ (se PJ)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CPF"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"CPF (se PF)"})]})]})]}),e.jsx("h4",{children:"Lógica"}),e.jsxs("ol",{children:[e.jsxs("li",{children:["Detecta se é Pessoa Física",e.jsxs("ul",{children:[e.jsx("li",{children:'Se Pessoa_Física in ["sim", "true", "1", "yes"] → PF'}),e.jsx("li",{children:"Caso contrário → PJ"})]})]}),e.jsx("li",{children:"Se PF: register = None"}),e.jsx("li",{children:"Se PJ: register = CNPJ formatado"}),e.jsx("li",{children:"Adiciona flag booleana (É Pessoa Física)"}),e.jsx("li",{children:"Adiciona LegalName = Nome"})]}),e.jsx("h4",{children:"Tag Retornada"}),e.jsx("p",{children:e.jsx("code",{className:"code-block",children:"ContactTags.ESCRITORIO"})})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"AdvogadoMapper"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"map_to_ploomes_advogado",children:"map_to_ploomes"}),e.jsx(a,{code:`def map_to_ploomes(
    self,
    advogado_data: Dict[str, Any],
    company_id: Optional[int] = None
) -> Tuple[Dict[str, Any], int]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Mapeia dados do advogado para formato do Ploomes."]}),e.jsx("h4",{children:"Campos Obrigatórios"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"Nome"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do advogado"})]})})]}),e.jsx("h4",{children:"Campos Opcionais"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"CPF"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"CPF do advogado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Empresa"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome da empresa"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"OAB"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Número OAB"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Cidade"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Cidade"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"E-mail 1"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Email principal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"E-mail 2"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Email secundário"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"E-mail 3"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Email terciário"})]})]})]}),e.jsx("h4",{children:"TypeId"}),e.jsx("p",{children:"2 (Pessoa)"}),e.jsx("h4",{children:"Tag Retornada"}),e.jsx("p",{children:e.jsx("code",{className:"code-block",children:"ContactTags.ADVOGADO"})})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"ReclamanteMapper"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"map_to_ploomes_reclamante",children:"map_to_ploomes"}),e.jsx(a,{code:"def map_to_ploomes(self, reclamante_data: dict[str, Any]) -> tuple[dict[str, Any], int]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Mapeia dados do reclamante para formato do Ploomes."]}),e.jsx("h4",{children:"Campos Obrigatórios"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"Nome"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do reclamante"})]})})]}),e.jsx("h4",{children:"Campos Opcionais"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"CPF"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"CPF (validação desabilitada)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Telefones"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"list[str]"})}),e.jsx("td",{children:"Lista de telefones"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"UF"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"UF do reclamante"})]})]})]}),e.jsx("h4",{children:"Validação de CPF"}),e.jsxs("ul",{children:[e.jsx("li",{children:"validate_first=False → Não valida dígitos verificadores"}),e.jsx("li",{children:"Permite CPFs inválidos (dados LEMIT podem ter CPFs inconsistentes)"})]}),e.jsx("h4",{children:"TypeId"}),e.jsx("p",{children:"2 (Pessoa)"}),e.jsx("h4",{children:"Tag Retornada"}),e.jsx("p",{children:e.jsx("code",{className:"code-block",children:"ContactTags.RECLAMANTE"})})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_create_phones_list",children:"_create_phones_list"}),e.jsx(a,{code:"def _create_phones_list(self, telefones: list[str]) -> list[dict[str, Any]]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Cria lista de telefones no formato esperado pelo Ploomes."]}),e.jsx("h4",{children:"Estrutura de Telefone"}),e.jsx(a,{code:`{
    "PhoneNumber": str,  # Formatado
    "SearchPhoneNumber": int,
    "TypeId": 1,
    "CountryId": None
}`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"DealMapper"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"map_to_ploomes_deal",children:"map_to_ploomes"}),e.jsx(a,{code:`def map_to_ploomes(
    self,
    deal_data: PloomesImportModel,
    reclamante_id: Optional[int],
    escritorio_id: Optional[int],
    advogado_id: Optional[int]
) -> Dict[str, Any]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Mapeia dados do negócio para formato do Ploomes."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"deal_data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesImportModel"})}),e.jsx("td",{children:"Dados do negócio"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"reclamante_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do reclamante (opcional)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"escritorio_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do escritório (opcional)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"advogado_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do advogado (opcional)"})]})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"ContactMapperFactory"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"factory_get_escritorio_mapper",children:"get_escritorio_mapper"}),e.jsx(a,{code:"def get_escritorio_mapper(self) -> EscritorioMapper"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Retorna instância de EscritorioMapper."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"factory_get_advogado_mapper",children:"get_advogado_mapper"}),e.jsx(a,{code:"def get_advogado_mapper(self) -> AdvogadoMapper"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Retorna instância de AdvogadoMapper."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"factory_get_reclamante_mapper",children:"get_reclamante_mapper"}),e.jsx(a,{code:"def get_reclamante_mapper(self) -> ReclamanteMapper"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Retorna instância de ReclamanteMapper."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"factory_get_deal_mapper",children:"get_deal_mapper"}),e.jsx(a,{code:"def get_deal_mapper(self) -> DealMapper"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Retorna instância de DealMapper."]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Exemplo 1: Mapper de Escritório"}),e.jsx(a,{code:`mapper = factory.get_escritorio_mapper()

# Pessoa Jurídica
escritorio_pj = {
    "Nome": "Silva Advogados",
    "CNPJ": "12345678000190",
    "Pessoa_Física": "Não",
    "Origem": "Site"
}
contact, tag_id = mapper.map_to_ploomes(escritorio_pj)

# Pessoa Física
escritorio_pf = {
    "Nome": "Dr. João Silva",
    "Pessoa_Física": "Sim",
    "CPF": "12345678900"
}
contact, tag_id = mapper.map_to_ploomes(escritorio_pf)`}),e.jsx("h3",{children:"Exemplo 2: Mapper de Advogado"}),e.jsx(a,{code:`mapper = factory.get_advogado_mapper()

advogado_data = {
    "Nome": "Dr. João Silva",
    "CPF": "12345678900",
    "OAB": "SP123456",
    "Cidade": "São Paulo",
    "E-mail 1": "joao@silva.com"
}

contact, tag_id = mapper.map_to_ploomes(
    advogado_data,
    company_id=12345
)`}),e.jsx("h3",{children:"Exemplo 3: Mapper de Reclamante"}),e.jsx(a,{code:`mapper = factory.get_reclamante_mapper()

reclamante_data = {
    "Nome": "Maria Santos",
    "CPF": "98765432100",
    "Telefones": ["11987654321", "11912345678"],
    "UF": "SP"
}

contact, tag_id = mapper.map_to_ploomes(reclamante_data)`})]})]})}function Lm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: ContactService"}),e.jsx("p",{className:"doc-subtitle",children:"Orquestração de alto nível de contatos no Ploomes, incluindo criação, atualização e aplicação de tags."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Visão Geral"}),e.jsxs("p",{children:["O módulo ",e.jsx("code",{className:"code-block",children:"ContactService"})," é responsável pela orquestração de alto nível de contatos no Ploomes, incluindo criação, atualização e aplicação de tags."]}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Responsabilidade"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Upsert"}),e.jsx("td",{children:"Cria ou atualiza contatos com retry"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Mapeamento"}),e.jsx("td",{children:"Transforma DTOs de domínio em payloads Ploomes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Tagging"}),e.jsx("td",{children:"Aplica e gerencia tags de contatos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Validação"}),e.jsx("td",{children:"Verifica campos preenchidos antes de atualizar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Observabilidade"}),e.jsx("td",{children:"Métricas e logging estruturado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"B2B Check"}),e.jsx("td",{children:"Verifica existência de deals no pipeline B2B"})]})]})]}),e.jsx("h3",{children:"Dependências"}),e.jsx(a,{code:`from __future__ import annotations

import logging
import time
from typing import Any, Dict, Optional, Tuple

from src.utils.human_behavior import HumanBehavior
from src.utils.metrics import get_metrics_registry
from src.utils.logger import get_correlation_id

from ..api import PloomesAPI
from ..exceptions import ContactCreationError, PloomesAPIError
from src.utils.validator import ValidationError
from ..utils.contact_mapper import ContactMapperFactory
from ..models import AdvogadoData, EscritorioData, ReclamanteData`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Públicos"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:`def __init__(
    self,
    api: PloomesAPI,
    mapper_factory: ContactMapperFactory,
    logger: logging.Logger,
):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Inicializa o serviço de contatos."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"api"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesAPI"})}),e.jsx("td",{children:"Cliente da API Ploomes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"mapper_factory"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ContactMapperFactory"})}),e.jsx("td",{children:"Factory de mappers"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger configurado"})]})]})]}),e.jsx("h4",{children:"Atributos Inicializados"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"self.api"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesAPI"})}),e.jsx("td",{children:"Cliente API"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self.mapper_factory"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ContactMapperFactory"})}),e.jsx("td",{children:"Factory de mappers"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self.logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self.human_behavior"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"HumanBehavior"})}),e.jsx("td",{children:"Helper para delays"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self._metrics"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ServiceMetrics"})}),e.jsx("td",{children:"Registro de métricas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self._created_count"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Contador de criações"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self._updated_count"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Contador de atualizações"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self._skipped_count"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Contador de skips"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_stats",children:"get_stats"}),e.jsx(a,{code:"def get_stats(self) -> Dict[str, Any]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Retorna estatísticas do serviço de contatos."]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Dict[str, Any]"})," - Estatísticas de operações"]}),e.jsx("h4",{children:"Estrutura do Retorno"}),e.jsx(a,{code:`{
    "created_count": int,
    "updated_count": int,
    "skipped_count": int,
    "total_operations": int,
    "success_rate": float,
    "average_latency_ms": float,
}`}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`stats = service.get_stats()
print(f"Criados: {stats['created_count']}")
print(f"Taxa de sucesso: {stats['success_rate']*100:.1f}%")
print(f"Latência média: {stats['average_latency_ms']:.2f}ms")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"upsert_contact",children:"upsert_contact"}),e.jsx(a,{code:"def upsert_contact(self, body: Dict, max_retries: int = 3) -> Dict"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Cria ou atualiza um contato no Ploomes."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"body"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Dados do contato"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"max_retries"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"3"}),e.jsx("td",{children:"Número máximo de tentativas"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Dict"})," - Dados do contato com flags adicionais"]}),e.jsx("h4",{children:"Flags Adicionais no Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Flag"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"_was_updated"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"True se atualizado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"_was_created"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"True se criado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"_was_skipped"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"True se pulado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"_skip_reason"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Motivo do skip"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"_has_b2b_deal"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"True se tem deal B2B (apenas type_id=1)"})]})]})]}),e.jsx("h4",{children:"Exceções"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"ValidationError"})," - Dados inválidos"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"ContactCreationError"})," - Falha na criação após retries"]})]}),e.jsx("h4",{children:"Workflow"}),e.jsx(a,{code:`1. Valida body (não None, Name obrigatório)
2. Busca contato existente por (Name, TypeId)
3. Se existir:
   a. Verifica campos preenchidos
   b. Se campos OK: atualiza
   c. Se campos NOK: skip
4. Se não existir:
   a. Cria novo contato
5. Se type_id=1 (Escritório):
   a. Verifica deal B2B
6. Retorna contato com flags`}),e.jsx("h4",{children:"Validações de Skip"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"TypeId"}),e.jsx("th",{children:"Campo Verificado"}),e.jsx("th",{children:"Motivo de Skip"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"1 (Escritório)"}),e.jsx("td",{children:"Register (CNPJ/CPF)"}),e.jsx("td",{children:'"Register (CNPJ/CPF) já preenchido"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"2 (Advogado)"}),e.jsx("td",{children:"contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F (OAB)"}),e.jsx("td",{children:'"OAB já preenchida"'})]})]})]}),e.jsx("h4",{children:"Retry Strategy"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Retry em status codes: 408, 429, 500, 502, 503, 504"}),e.jsx("li",{children:"Backoff exponencial: 2^attempt segundos"}),e.jsx("li",{children:"Delay com HumanBehavior.human_like_delay()"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`body = {
    "Name": "Silva Advogados",
    "TypeId": 1,
    "Register": "12345678000190",
    "OtherProperties": []
}

result = service.upsert_contact(body, max_retries=3)

if result.get("_was_created"):
    print(f"✅ Criado: ID {result['Id']}")
elif result.get("_was_updated"):
    print(f"🔄 Atualizado: ID {result['Id']}")
elif result.get("_was_skipped"):
    print(f"⏭️ Pulado: {result['_skip_reason']}")

if result.get("_has_b2b_deal"):
    print("📋 Já possui deal B2B")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"apply_tag",children:"apply_tag"}),e.jsx(a,{code:"def apply_tag(self, contact_id: int, tag_id: int) -> None"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Aplica uma tag ao contato."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"contact_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do contato"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tag_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID da tag"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from ..models import ContactTags

service.apply_tag(
    contact_id=12345,
    tag_id=ContactTags.ESCRITORIO
)`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"apply_tag_if_missing",children:"apply_tag_if_missing"}),e.jsx(a,{code:"def apply_tag_if_missing(self, contact: Dict, tag_id: int) -> bool"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Aplica uma tag ao contato apenas se ele ainda não a possui."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"contact"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict"})}),e.jsx("td",{children:"Dados do contato (deve incluir Tags se expandido)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tag_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID da tag a aplicar"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"bool"})," - True se tag foi aplicada, False se já existia"]}),e.jsx("h4",{children:"Validações"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Se tag_id é None: retorna False"}),e.jsx("li",{children:"Se contact_id não existe: retorna False"}),e.jsx("li",{children:"Se Tags expandido e tag já existe: retorna False"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Busca contato com Tags expandido
contact = api.get_contact_by_name_and_type(
    "Silva Advogados",
    type_id=1,
    expand_tags=True
)

# Aplica tag apenas se necessário
applied = service.apply_tag_if_missing(
    contact,
    ContactTags.ESCRITORIO
)

if applied:
    print("✅ Tag aplicada")
else:
    print("ℹ️ Tag já existia")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"map_escritorio",children:"map_escritorio"}),e.jsx(a,{code:"def map_escritorio(self, data: EscritorioData) -> Tuple[Dict, int]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Mapeia dados do escritório para formato Ploomes."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"EscritorioData"})}),e.jsx("td",{children:"Dados do escritório"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Tuple[Dict, int]"})," - (payload, tag_id)"]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"map_advogado",children:"map_advogado"}),e.jsx(a,{code:`def map_advogado(
    self,
    data: AdvogadoData,
    company_id: Optional[int] = None
) -> Tuple[Dict, int]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Mapeia dados do advogado para formato Ploomes."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"AdvogadoData"})}),e.jsx("td",{children:"Dados do advogado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"company_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID da empresa (opcional)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Tuple[Dict, int]"})," - (payload, tag_id)"]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"map_reclamante",children:"map_reclamante"}),e.jsx(a,{code:"def map_reclamante(self, data: ReclamanteData) -> Tuple[Dict, int]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Mapeia dados do reclamante para formato Ploomes."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ReclamanteData"})}),e.jsx("td",{children:"Dados do reclamante"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Tuple[Dict, int]"})," - (payload, tag_id)"]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_check_b2b_deal",children:"_check_b2b_deal"}),e.jsx(a,{code:"def _check_b2b_deal(self, contact_id: int) -> bool"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Verifica se o contato já possui um deal no pipeline 'B2B - Escritórios BT BLUE'."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"contact_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do contato"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"bool"})," - True se possui deal B2B"]}),e.jsx("h4",{children:"Lógica"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Busca deals do contato via api.get_deals_by_contact_id()"}),e.jsxs("li",{children:["Para cada deal:",e.jsxs("ul",{children:[e.jsx("li",{children:"Extrai Pipeline.Name"}),e.jsx("li",{children:'Compara case-insensitive com "b2b - escritórios bt blue"'})]})]}),e.jsx("li",{children:"Retorna True se encontrar match"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Observabilidade"}),e.jsx("h3",{children:"Métricas Coletadas"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Métrica"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"created_count"}),e.jsx("td",{children:"Counter"}),e.jsx("td",{children:"Total de contatos criados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"updated_count"}),e.jsx("td",{children:"Counter"}),e.jsx("td",{children:"Total de contatos atualizados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"skipped_count"}),e.jsx("td",{children:"Counter"}),e.jsx("td",{children:"Total de contatos pulados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"total_operations"}),e.jsx("td",{children:"Counter"}),e.jsx("td",{children:"Total de operações"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"success_rate"}),e.jsx("td",{children:"Gauge"}),e.jsx("td",{children:"Taxa de sucesso (0.0-1.0)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"average_latency_ms"}),e.jsx("td",{children:"Gauge"}),e.jsx("td",{children:"Latência média em ms"})]})]})]}),e.jsx("h3",{children:"Logging Estruturado"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Correlation ID:"})," Todas as operações incluem correlation_id para rastreamento"]}),e.jsx("h4",{children:"Exemplos de Logs"}),e.jsx(a,{code:`[abc123] ➕ Criando novo contato: Silva Advogados…
[abc123] ✓ Contato criado: Silva Advogados (ID 12345) (123.45ms)
[abc123] 🔄 Atualizando contato existente: Dr. João Silva (ID 67890)…
[abc123] ✓ Contato atualizado: Dr. João Silva (98.76ms)
[abc123] ⏭️ Pulando atualização de Silva Advogados (ID 12345): Register (CNPJ/CPF) já preenchido
[abc123] ✅ Contato Silva Advogados já possui deal no pipeline B2B
[abc123] 🔄 Retentando em 2s (tentativa 1/3) — HTTP 429: Rate limit exceeded`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Exemplo 1: Criar Escritório"}),e.jsx(a,{code:`from src.ploomes_integration.services import ContactService
from src.ploomes_integration.api import PloomesAPI
from src.ploomes_integration.utils.contact_mapper import ContactMapperFactory

api = PloomesAPI(...)
mapper_factory = ContactMapperFactory(field_mappings, logger)
service = ContactService(api, mapper_factory, logger)

# Mapear dados
escritorio_data = {
    "Nome": "Silva & Associados",
    "CNPJ": "12345678000190",
    "Pessoa_Física": "Não",
    "Origem": "Site"
}
payload, tag_id = service.map_escritorio(escritorio_data)

# Criar/atualizar
result = service.upsert_contact(payload)

# Aplicar tag se criado
if result.get("_was_created"):
    service.apply_tag(result["Id"], tag_id)`}),e.jsx("h3",{children:"Exemplo 2: Criar Advogado com Empresa"}),e.jsx(a,{code:`advogado_data = {
    "Nome": "Dr. João Silva",
    "CPF": "12345678900",
    "OAB": "SP123456",
    "Cidade": "São Paulo",
    "E-mail 1": "joao@silva.com.br"
}

# Buscar ID do escritório
escritorio = api.get_contact_by_name_and_type("Silva Advogados", 1)
company_id = escritorio.get("Id") if escritorio else None

# Mapear e criar
payload, tag_id = service.map_advogado(advogado_data, company_id)
result = service.upsert_contact(payload)

if result.get("_was_created"):
    service.apply_tag(result["Id"], tag_id)`}),e.jsx("h3",{children:"Exemplo 3: Tratamento de Skips"}),e.jsx(a,{code:`# Escritório com CNPJ já preenchido
escritorio_data = {
    "Nome": "Silva Advogados",  # Já existe
    "CNPJ": "12345678000190",
    "Pessoa_Física": "Não"
}

payload, tag_id = service.map_escritorio(escritorio_data)
result = service.upsert_contact(payload)

if result.get("_was_skipped"):
    print(f"⏭️ Skip: {result['_skip_reason']}")
    # Output: "Register (CNPJ/CPF) já preenchido"

# Verificar se tem deal B2B
if result.get("_has_b2b_deal"):
    print("📋 Já possui deal B2B, não criar novo")`})]})]})}function Om(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: DealService"}),e.jsx("p",{className:"doc-subtitle",children:"Gerenciamento de negócios (deals) no Ploomes com suporte a operações CRUD."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Visão Geral"}),e.jsxs("p",{children:["O módulo ",e.jsx("code",{className:"code-block",children:"DealService"})," fornece uma camada de abstração para gerenciar negócios (deals) no Ploomes, incluindo criação, atualização, busca e validação."]}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Responsabilidade"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Criação"}),e.jsx("td",{children:"Cria novos deals no Ploomes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Atualização"}),e.jsx("td",{children:"Atualiza deals existentes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Busca"}),e.jsx("td",{children:"Busca deals por CNJ ou ID"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Validação"}),e.jsx("td",{children:"Valida dados antes de criar/atualizar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Mapeamento"}),e.jsx("td",{children:"Mapeia dados de domínio para API"})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Públicos"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:`def __init__(
    self,
    api: PloomesAPI,
    mapper_factory: ContactMapperFactory,
    logger: logging.Logger
):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Inicializa o serviço de deals."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"api"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesAPI"})}),e.jsx("td",{children:"Cliente da API Ploomes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"mapper_factory"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ContactMapperFactory"})}),e.jsx("td",{children:"Factory de mappers"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger configurado"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"create_deal",children:"create_deal"}),e.jsx(a,{code:`def create_deal(
    self,
    deal_data: PloomesImportModel,
    reclamante_id: Optional[int] = None,
    escritorio_id: Optional[int] = None,
    advogado_id: Optional[int] = None
) -> Dict[str, Any]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Cria um novo deal no Ploomes."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"deal_data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesImportModel"})}),e.jsx("td",{children:"Dados do deal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"reclamante_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do reclamante (opcional)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"escritorio_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do escritório (opcional)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"advogado_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do advogado (opcional)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Dict[str, Any]"})," - Dados do deal criado"]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`deal_data = {
    "escritorio": "Silva Advogados",
    "negociador": "João Silva",
    "origem": "Site",
    "uf": "SP",
    "produto": "Consultoria",
    "stage_id": 1,
    "tags_id": [10, 20]
}

deal = service.create_deal(
    deal_data,
    reclamante_id=123,
    escritorio_id=456,
    advogado_id=789
)

print(f"Deal criado: ID {deal['Id']}")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"update_deal",children:"update_deal"}),e.jsx(a,{code:`def update_deal(
    self,
    deal_id: int,
    update_data: Dict[str, Any]
) -> Dict[str, Any]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Atualiza um deal existente."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"deal_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do deal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"update_data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict[str, Any]"})}),e.jsx("td",{children:"Dados a atualizar"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Dict[str, Any]"})," - Dados do deal atualizado"]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_deal_by_cnj",children:"get_deal_by_cnj"}),e.jsx(a,{code:"def get_deal_by_cnj(self, cnj: str) -> Dict[str, Any] | None"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Busca um deal pelo número CNJ."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"cnj"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Número CNJ do processo"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Dict[str, Any] | None"})," - Dados do deal ou None se não encontrado"]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`deal = service.get_deal_by_cnj("0001234-56.2024.8.26.0100")
if deal:
    print(f"Deal encontrado: {deal['Title']}")
else:
    print("Deal não encontrado")`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Exemplo 1: Criar Deal Completo"}),e.jsx(a,{code:`from src.ploomes_integration.services import DealService
from src.ploomes_integration.api import PloomesAPI

api = PloomesAPI(...)
service = DealService(api, mapper_factory, logger)

# Dados do deal
deal_data = {
    "escritorio": "Silva & Associados",
    "negociador": "Dr. João Silva",
    "origem": "Indicação",
    "uf": "SP",
    "produto": "Trabalhista",
    "stage_id": 1,
    "tags_id": [10, 20, 30]
}

# Criar deal
deal = service.create_deal(
    deal_data,
    reclamante_id=123,
    escritorio_id=456,
    advogado_id=789
)

print(f"✅ Deal criado: {deal['Title']} (ID {deal['Id']})")`}),e.jsx("h3",{children:"Exemplo 2: Buscar e Atualizar Deal"}),e.jsx(a,{code:`# Buscar deal por CNJ
cnj = "0001234-56.2024.8.26.0100"
deal = service.get_deal_by_cnj(cnj)

if deal:
    # Atualizar stage
    updated = service.update_deal(
        deal['Id'],
        {"StageId": 2}
    )
    print(f"✅ Deal atualizado para stage {updated['StageId']}")
else:
    print("❌ Deal não encontrado")`}),e.jsx("h3",{children:"Exemplo 3: Verificar Duplicidade"}),e.jsx(a,{code:`# Verificar se deal já existe antes de criar
cnj = "0001234-56.2024.8.26.0100"
existing = service.get_deal_by_cnj(cnj)

if existing:
    print(f"⚠️ Deal já existe: ID {existing['Id']}")
else:
    # Criar novo deal
    deal = service.create_deal(deal_data, ...)
    print(f"✅ Deal criado: ID {deal['Id']}")`})]})]})}function Im(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: EscritorioNormalizer"}),e.jsx("p",{className:"doc-subtitle",children:"Normalização de nomes de escritórios usando mapeamento JSON e fuzzy matching."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsxs("p",{children:["A classe ",e.jsx("code",{className:"code-block",children:"EscritorioNormalizer"})," ","fornece funcionalidades avançadas para normalização de nomes de escritórios, utilizando mapeamento JSON predefinido e algoritmos de fuzzy matching (Levenshtein) para encontrar correspondências similares."]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Classe EscritorioNormalizer"}),e.jsx(a,{code:"class EscritorioNormalizer:"}),e.jsx("p",{children:"Normaliza nomes de escritórios usando mapeamento JSON e fuzzy matching."}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Carregar mapeamento de nomes de escritórios de arquivo JSON"}),e.jsx("li",{children:"Normalizar nomes usando correspondência exata ou fuzzy matching"}),e.jsx("li",{children:"Fornecer estatísticas de normalização"}),e.jsx("li",{children:"Logging detalhado do processo de normalização"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos da Classe"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:`def __init__(
    self,
    logger: logging.Logger = None,
    enable_normalization: bool = False,
    mapping_path: str = None,
):`}),e.jsx("p",{children:"Inicializa o normalizador de escritórios."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger para mensagens"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enable_normalization"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"Se True, ativa a normalização"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"mapping_path"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho para arquivo JSON de mapeamento"})]})]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Arquivo de mapeamento padrão:"})," ",e.jsx("code",{className:"code-block",children:"../res/parceiros_escritorios.json"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"normalize",children:"normalize"}),e.jsx(a,{code:"def normalize(self, name: str) -> tuple[str, str, float]:"}),e.jsx("p",{children:"Normaliza nome do escritório usando o mapeamento JSON."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome original do escritório"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"tuple[str, str, float]"})}),e.jsx("td",{children:"(nome_final, status, score)"})]})})]}),e.jsx("h4",{children:"Status possíveis"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Score"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"normalized"})}),e.jsx("td",{children:"1.0"}),e.jsx("td",{children:"Nome normalizado com sucesso"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"not_found"})}),e.jsx("td",{children:"0.0"}),e.jsx("td",{children:"Nome não encontrado no JSON"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"skipped"})}),e.jsx("td",{children:"0.0"}),e.jsx("td",{children:"Valor especial que não deve ser normalizado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"disabled"})}),e.jsx("td",{children:"0.0"}),e.jsx("td",{children:"Normalização está desativada"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"fuzzy_matched"})}),e.jsx("td",{children:"0.95-1.0"}),e.jsx("td",{children:"Nome encontrado via Levenshtein"})]})]})]}),e.jsx("h4",{children:"Valores especiais (sempre skipped)"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("code",{className:"code-block",children:"N/A"})}),e.jsx("li",{children:e.jsx("code",{className:"code-block",children:"ERRO AO PROCESSAR"})}),e.jsx("li",{children:e.jsx("code",{className:"code-block",children:"Erro ao processar linha"})})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"normalize_for_output",children:"normalize_for_output"}),e.jsx(a,{code:"def normalize_for_output(self, name: str) -> str:"}),e.jsx("p",{children:"Normaliza nome para saída (retorna apenas o nome final)."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome original do escritório"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome normalizado ou original"})]})})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Propriedades"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"is_enabled",children:"is_enabled"}),e.jsx(a,{code:`@property
def is_enabled(self) -> bool:`}),e.jsx("p",{children:"Retorna se a normalização está habilitada."})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"mapping_count"}),e.jsx(a,{code:`@property
def mapping_count(self) -> int:`}),e.jsx("p",{children:"Retorna o número de mapeamentos carregados do arquivo JSON."})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Privados"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_load_mapping",children:"_load_mapping"}),e.jsx(a,{code:"def _load_mapping(self) -> dict[str, str]:"}),e.jsx("p",{children:"Carrega mapeamento de nomes de escritórios do JSON."}),e.jsx("h4",{children:"Estrutura esperada do JSON"}),e.jsx(a,{code:`{
    "escritorios": {
        "Nome Original 1": "Nome Normalizado 1",
        "Nome Original 2": "Nome Normalizado 2"
    }
}`}),e.jsx("h4",{children:"Tratamento de erros"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"FileNotFoundError"}),": Arquivo não encontrado (retorna dict vazio)"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"json.JSONDecodeError"}),": Erro de parsing JSON (retorna dict vazio)"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"Exception"}),": Outros erros (retorna dict vazio)"]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_find_best_match",children:"_find_best_match"}),e.jsx(a,{code:`def _find_best_match(
    self, input_name: str, valid_names: list, threshold: float = 0.95
) -> tuple[Optional[str], float]:`}),e.jsx("p",{children:"Encontra o melhor match usando distância Levenshtein."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"input_name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome a ser procurado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"valid_names"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"list"})}),e.jsx("td",{children:"Lista de nomes válidos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"threshold"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"float"})}),e.jsx("td",{children:"Limiar mínimo de similaridade (0-1)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"tuple[Optional[str], float]"})}),e.jsx("td",{children:"(nome_válido, score) ou (None, 0.0)"})]})})]}),e.jsx("h4",{children:"Algoritmo"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Normaliza nomes para lowercase"}),e.jsx("li",{children:"Calcula similaridade Levenshtein para cada nome válido"}),e.jsx("li",{children:"Retorna o melhor match se score >= threshold"}),e.jsx("li",{children:"Caso contrário, retorna None"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Threshold padrão:"})," 0.95 (95% de similaridade)"]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Uso Básico"}),e.jsx(a,{code:`# Inicializar com normalização ativa
normalizer = EscritorioNormalizer(
    logger=logger,
    enable_normalization=True
)

# Normalizar nome
nome_final, status, score = normalizer.normalize("Escritório XYZ Ltda")
print(f"Original: Escritório XYZ Ltda")
print(f"Normalizado: {nome_final}")
print(f"Status: {status}")
print(f"Score: {score}")`}),e.jsx("h3",{children:"Uso com Arquivo JSON Customizado"}),e.jsx(a,{code:`normalizer = EscritorioNormalizer(
    logger=logger,
    enable_normalization=True,
    mapping_path="/caminho/para/meu_mapeamento.json"
)

# Verificar se carregou corretamente
if normalizer.is_enabled:
    print(f"Carregados {normalizer.mapping_count} mapeamentos")`}),e.jsx("h3",{children:"Normalização para Saída"}),e.jsx(a,{code:`# Apenas o nome final (simplificado)
nome_normalizado = normalizer.normalize_for_output("Escritório ABC")`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Observabilidade"}),e.jsx("h3",{children:"Logging"}),e.jsx("p",{children:"A classe registra informações detalhadas sobre:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Inicialização e carregamento de mapeamentos"}),e.jsx("li",{children:"Resultados de fuzzy matching com scores"}),e.jsx("li",{children:"Erros de carregamento do arquivo JSON"}),e.jsx("li",{children:"Estatísticas de normalização"})]}),e.jsx("h3",{children:"Métricas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Número de mapeamentos carregados"}),e.jsx("li",{children:"Status de habilitação da normalização"}),e.jsx("li",{children:"Scores de similaridade para fuzzy matching"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Tratamento de Erros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Situação"}),e.jsx("th",{children:"Comportamento"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Arquivo JSON não encontrado"}),e.jsx("td",{children:"Warning + retorna dict vazio"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Erro de parsing JSON"}),e.jsx("td",{children:"Error + retorna dict vazio"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Nome vazio/None"}),e.jsx("td",{children:"Retorna valor original com status apropriado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Normalização desabilitada"}),e.jsx("td",{children:'Retorna nome original com status "disabled"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Sem match encontrado"}),e.jsx("td",{children:'Retorna nome original com status "not_found"'})]})]})]})]})]})}function Fm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Exceções: Sistema de Tratamento de Erros"}),e.jsx("p",{className:"doc-subtitle",children:"Hierarquia completa de exceções personalizadas para tratamento robusto de erros."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsx("p",{children:"Este módulo define uma hierarquia abrangente de exceções personalizadas para o sistema, permitindo tratamento específico e granular de diferentes tipos de erros que podem ocorrer durante o processamento."})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Hierarquia de Exceções"}),e.jsx(a,{code:`PloomesClientError (base)
├── InvalidUserKeyError
├── PloomesAPIError
├── FileProcessingError
│   ├── MissingColumnError
│   └── FileSecurityError
├── CNAAPIError
├── LemitAPIError
├── ValidationError
├── ConfigurationError
├── CacheError
├── ContactCreationError
├── DataExtractionError
└── NetworkError`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exceções Base"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"PloomesClientError",children:"PloomesClientError"}),e.jsx(a,{code:"class PloomesClientError(Exception):"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Classe base para todas as exceções do sistema."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Uso:"})," Herança para exceções específicas e catch genérico."]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    # operação do sistema
    pass
except PloomesClientError as e:
    # Captura qualquer erro do sistema
    logger.error(f"Erro no sistema: {e}")`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exceções de API e Autenticação"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"InvalidUserKeyError",children:"InvalidUserKeyError"}),e.jsx(a,{code:`class InvalidUserKeyError(PloomesClientError):
    def __init__(self, message="A User-Key fornecida é inválida."):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," User-Key do Ploomes inválida ou expirada."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"message"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Mensagem de erro personalizada"})]})})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    api.test_connection()
except InvalidUserKeyError:
    print("🔑 User-Key inválida - verifique configuração")
    # Solicitar nova user-key ou reconfigurar`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"PloomesAPIError",children:"PloomesAPIError"}),e.jsx(a,{code:`class PloomesAPIError(PloomesClientError):
    def __init__(self, status_code, response_text):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Erros gerais da API do Ploomes."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"status_code"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Código HTTP do erro"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"response_text"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Texto da resposta de erro"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    contact = api.create_contact(data)
except PloomesAPIError as e:
    if e.status_code == 429:
        # Rate limit - aguardar e tentar novamente
        time.sleep(60)
    elif e.status_code == 400:
        # Dados inválidos - revisar payload
        logger.error(f"Dados inválidos: {e.response_text}")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"CNAAPIError"}),e.jsx(a,{code:`class CNAAPIError(PloomesClientError):
    def __init__(self, message, status_code=None, response_text=None):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Erros específicos da API do CNA (Cadastro Nacional de Advogados)."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"message"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Mensagem de erro"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"status_code"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[int]"})}),e.jsx("td",{children:"Código HTTP (se aplicável)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"response_text"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[str]"})}),e.jsx("td",{children:"Resposta da API"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    advogado = cna_client.consultar_advogado(nome="João Silva")
except CNAAPIError as e:
    if "timeout" in str(e).lower():
        # Timeout - tentar com parâmetros diferentes
        logger.warning("CNA timeout - tentando busca simplificada")
    else:
        logger.error(f"Erro CNA: {e}")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"LemitAPIError"}),e.jsx(a,{code:`class LemitAPIError(PloomesClientError):
    def __init__(self, message, status_code=None, response_text=None):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Erros específicos da API do LEMIT."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"message"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Mensagem de erro"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"status_code"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[int]"})}),e.jsx("td",{children:"Código HTTP (se aplicável)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"response_text"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[str]"})}),e.jsx("td",{children:"Resposta da API"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"NetworkError",children:"NetworkError"}),e.jsx(a,{code:`class NetworkError(PloomesClientError):
    def __init__(self, operation, attempts, last_error):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Falhas de rede que esgotaram todas as tentativas de retry."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"operation"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome da operação que falhou"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"attempts"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Número de tentativas realizadas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"last_error"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Último erro capturado"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    result = retry_with_backoff(api_call, max_retries=3)
except NetworkError as e:
    logger.critical(f"Falha de rede após {e.attempts} tentativas: {e.last_error}")
    # Notificar administrador ou usar modo offline`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exceções de Arquivo e Dados"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"FileProcessingError",children:"FileProcessingError"}),e.jsx(a,{code:"class FileProcessingError(PloomesClientError):"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Classe base para erros de processamento de arquivos."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Uso:"})," Herança para erros específicos de arquivo."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"MissingColumnError",children:"MissingColumnError"}),e.jsx(a,{code:`class MissingColumnError(FileProcessingError):
    def __init__(self, column_name, available_columns):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Coluna esperada não encontrada no arquivo."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"column_name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome da coluna que faltou"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"available_columns"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"Colunas disponíveis no arquivo"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    df = processar_excel("advogados.xlsx")
    nome_col = encontrar_coluna(df, "Nome")
except MissingColumnError as e:
    print(f"❌ Coluna '{e.column_name}' não encontrada")
    print(f"📋 Colunas disponíveis: {', '.join(e.available_columns)}")
    # Sugerir mapeamento de colunas ou mostrar UI para seleção`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"FileSecurityError"}),e.jsx(a,{code:`class FileSecurityError(FileProcessingError):
    def __init__(self, file_path, reason):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Problemas de segurança com arquivos (path traversal, extensões perigosas)."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"file_path"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho do arquivo problemático"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"reason"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Motivo da rejeição"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    validar_arquivo("../../../etc/passwd")
except FileSecurityError as e:
    logger.security_alert(f"Tentativa de path traversal: {e.file_path}")
    # Registrar tentativa suspeita e bloquear`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exceções de Validação e Configuração"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"ValidationError",children:"ValidationError"}),e.jsx(a,{code:`class ValidationError(PloomesClientError):
    def __init__(self, field_name, value, reason):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Erros de validação de dados de entrada."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"field_name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do campo inválido"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"value"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Any"})}),e.jsx("td",{children:"Valor que falhou na validação"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"reason"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Motivo da falha"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`def validar_cpf(cpf):
    if not cpf_valido(cpf):
        raise ValidationError("CPF", cpf, "Dígitos verificadores inválidos")

try:
    validar_cpf("123.456.789-00")
except ValidationError as e:
    print(f"⚠️ {e.field_name}: {e.reason}")
    print(f"Valor fornecido: '{e.value}'")
    # Solicitar correção do usuário`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"ConfigurationError",children:"ConfigurationError"}),e.jsx(a,{code:`class ConfigurationError(PloomesClientError):
    def __init__(self, message):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Erros de configuração do sistema."]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    client = PloomesClient()
except ConfigurationError as e:
    logger.error(f"Configuração inválida: {e}")
    # Guiar usuário para configuração correta
    print("🔧 Execute: python setup.py configure")`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exceções de Cache e Operações"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"CacheError"}),e.jsx(a,{code:`class CacheError(PloomesClientError):
    def __init__(self, operation, key=None, reason=None):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Erros relacionados ao sistema de cache."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"operation"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Operação que falhou (get, set, delete)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"key"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[str]"})}),e.jsx("td",{children:"Chave do cache (se aplicável)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"reason"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[str]"})}),e.jsx("td",{children:"Motivo da falha"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    cache.set("advogado_123", data)
except CacheError as e:
    logger.warning(f"Cache falhou: {e.operation} - continuando sem cache")
    # Operar sem cache, mas registrar para investigação`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"ContactCreationError"}),e.jsx(a,{code:`class ContactCreationError(PloomesClientError):
    def __init__(self, contact_type, contact_name, reason):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Erro na criação de contatos no Ploomes."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"contact_type"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Tipo do contato (escritório, advogado)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"contact_name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do contato"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"reason"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Motivo da falha"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    escritorio_id = criar_escritorio(dados_escritorio)
except ContactCreationError as e:
    logger.error(f"Falha ao criar {e.contact_type} '{e.contact_name}': {e.reason}")

    if "duplicado" in e.reason.lower():
        # Tentar atualizar em vez de criar
        escritorio_id = atualizar_escritorio(dados_escritorio)`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"DataExtractionError"}),e.jsx(a,{code:`class DataExtractionError(PloomesClientError):
    def __init__(self, operation, target, reason):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Erro na extração de dados de advogados/sociedades."]}),e.jsx("h4",{children:"Atributos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"operation"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Operação de extração"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"target"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Alvo da extração"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"reason"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Motivo da falha"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    socios = extrair_socios_sociedade(cnpj)
except DataExtractionError as e:
    logger.warning(f"Não foi possível extrair {e.operation} de {e.target}: {e.reason}")
    # Continuar com dados parciais ou buscar fonte alternativa`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Padrões de Uso"}),e.jsx("h3",{children:"Tratamento Hierárquico"}),e.jsx(a,{code:`def processar_advogado(nome, oab):
    try:
        return executar_processamento(nome, oab)

    except ValidationError as e:
        # Erro de dados - pode ser corrigido
        logger.warning(f"Dados inválidos: {e}")
        return None

    except CNAAPIError as e:
        # Erro de API - pode ser temporário
        logger.error(f"Falha na API CNA: {e}")
        if "timeout" in str(e):
            # Tentar novamente com timeout maior
            return tentar_novamente_com_timeout(nome, oab)
        return None

    except NetworkError as e:
        # Erro crítico de rede
        logger.critical(f"Falha de rede: {e}")
        raise  # Repassar para nível superior

    except PloomesClientError as e:
        # Qualquer outro erro do sistema
        logger.error(f"Erro geral: {e}")
        return None`}),e.jsx("h3",{children:"Retry com Exceções Específicas"}),e.jsx(a,{code:`def operacao_com_retry():
    for tentativa in range(3):
        try:
            return executar_operacao()

        except (NetworkError, CNAAPIError) as e:
            if tentativa < 2:  # Não é a última tentativa
                delay = 2 ** tentativa  # Backoff exponencial
                logger.info(f"Tentativa {tentativa + 1} falhou, aguardando {delay}s")
                time.sleep(delay)
                continue
            else:
                raise  # Última tentativa - repassar exceção

        except ValidationError:
            # Erro de validação não deve ser retentado
            raise`}),e.jsx("h3",{children:"Logging Estruturado com Exceções"}),e.jsx(a,{code:`def log_exception(e: PloomesClientError, context: dict = None):
    """Registra exceção com contexto estruturado."""

    log_data = {
        "exception_type": type(e).__name__,
        "exception_message": str(e),
        "context": context or {}
    }

    # Adicionar atributos específicos da exceção
    if hasattr(e, 'status_code'):
        log_data["http_status"] = e.status_code

    if hasattr(e, 'field_name'):
        log_data["field_name"] = e.field_name
        log_data["field_value"] = e.value

    logger.error("Exceção capturada", extra=log_data)`}),e.jsx("h3",{children:"Conversão de Exceções Externas"}),e.jsx(a,{code:`def consultar_api_externa():
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        raise NetworkError("consulta_api", 1, "Timeout de 30s excedido")

    except requests.exceptions.ConnectionError:
        raise NetworkError("consulta_api", 1, "Falha de conexão")

    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 401:
            raise InvalidUserKeyError("Credenciais inválidas na API externa")
        else:
            raise PloomesAPIError(e.response.status_code, e.response.text)`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Observabilidade e Monitoramento"}),e.jsx("h3",{children:"Métricas por Tipo de Exceção"}),e.jsx(a,{code:`exception_counter = {
    "ValidationError": 0,
    "NetworkError": 0,
    "CNAAPIError": 0,
    # ... outros tipos
}

def track_exception(e: Exception):
    exception_type = type(e).__name__
    exception_counter[exception_type] = exception_counter.get(exception_type, 0) + 1

    # Alertas baseados em thresholds
    if exception_counter["NetworkError"] > 10:
        send_alert("Alta frequência de erros de rede")`}),e.jsx("h3",{children:"Dashboard de Erros"}),e.jsx(a,{code:`def get_error_summary():
    return {
        "total_exceptions": sum(exception_counter.values()),
        "by_type": dict(exception_counter),
        "error_rate": calculate_error_rate(),
        "top_errors": sorted(exception_counter.items(), key=lambda x: x[1], reverse=True)[:5]
    }`})]})]})}function Mm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: LemitClient"}),e.jsx("p",{className:"doc-subtitle",children:"Automação de consultas no sistema LEMIT utilizando API REST e Selenium."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Visão Geral"}),e.jsxs("p",{children:["O módulo ",e.jsx("code",{className:"code-block",children:"LemitClient"})," é responsável por automatizar consultas no sistema LEMIT, utilizando tanto API REST quanto automação via Selenium para operações que requerem interface web."]}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Responsabilidade"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Consulta API"}),e.jsx("td",{children:"Consulta pessoas e empresas via API REST"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Enriquecimento"}),e.jsx("td",{children:"Enriquece dados com telefones e emails"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Automação Web"}),e.jsx("td",{children:"Login, upload de CSV e download de resultados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Processamento Batch"}),e.jsx("td",{children:"Upload de lotes de CPFs para processamento"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Validação"}),e.jsx("td",{children:"Valida e formata dados (CPF, CNPJ, telefones)"})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos de API REST"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"consultar_pessoa_por_cpf",children:"consultar_pessoa_por_cpf"}),e.jsx(a,{code:"def consultar_pessoa_por_cpf(self, cpf: str) -> dict | None"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Consulta dados de uma pessoa por CPF via API LEMIT."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"cpf"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"CPF (apenas números)"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"dict | None"})," - Dados da pessoa ou None em caso de erro"]}),e.jsx("h4",{children:"Endpoint"}),e.jsx("p",{children:"POST /api/v1/consulta/pessoa/"}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`dados = client.consultar_pessoa_por_cpf("14821139456")
if dados:
    print(f"Nome: {dados.get('nome')}")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_advogados_socios",children:"get_advogados_socios"}),e.jsx(a,{code:"def get_advogados_socios(self, cnpj: str) -> list[dict]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Consulta advogados sócios de um escritório via API LEMIT."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"cnpj"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"CNPJ (apenas números)"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"list[dict]"})," - Lista de sócios (vazia se erro)"]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`socios = client.get_advogados_socios("07617044000104")
for socio in socios:
    print(f"{socio['nome']} - CPF: {socio['cpf']}")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"consultar_pessoa_por_nome",children:"consultar_pessoa_por_nome"}),e.jsx(a,{code:`def consultar_pessoa_por_nome(
    self,
    nome: str,
    uf: str = None,
    enriched: bool = False
) -> dict | None`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Consulta dados de uma pessoa por nome via API LEMIT."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"nome"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Nome completo ou parcial"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"uf"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"None"}),e.jsx("td",{children:"UF para filtrar resultados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"enriched"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"False"}),e.jsx("td",{children:"(Não utilizado)"})]})]})]}),e.jsx("h4",{children:"Endpoint"}),e.jsxs("p",{children:["GET /api/v1/consulta/nome/","{nome}"]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Sem filtro de UF
dados = client.consultar_pessoa_por_nome("João da Silva")

# Com filtro de UF
dados = client.consultar_pessoa_por_nome("João da Silva", uf="RS")`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos de Enriquecimento"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"enriquecer_contato_com_cpf",children:"enriquecer_contato_com_cpf"}),e.jsx(a,{code:"def enriquecer_contato_com_cpf(self, cpf: str) -> dict"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Enriquece dados de contato consultando CPF na API LEMIT."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"cpf"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"CPF (números ou formatado)"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsx(a,{code:`{
    "telefones": ["11987654321", "11912345678"],  # Máximo 4
    "emails": ["email@example.com"],  # Máximo 3
    "dados_completos": {...},  # Resposta completa da API
}`}),e.jsx("h4",{children:"Comportamento"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Se não encontrado: ",'{"telefones": ["Não encontrado"], "emails": ["Não encontrado"]}']}),e.jsx("li",{children:"Telefones ordenados por: WhatsApp primeiro, depois por ranking"}),e.jsx("li",{children:"Emails ordenados por: ranking (menor = melhor)"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`dados = client.enriquecer_contato_com_cpf("12345678900")
print(dados['telefones'])  # ['11987654321', '11912345678']
print(dados['emails'])  # ['email@example.com']`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"enriquecer_contato_com_nome",children:"enriquecer_contato_com_nome"}),e.jsx(a,{code:`def enriquecer_contato_com_nome(
    self,
    nome: str,
    uf: str = None,
    expand: bool = True
) -> dict`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Enriquece dados de contato consultando nome na API LEMIT."]}),e.jsx("h4",{children:"Estratégia em 2 etapas"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Consulta por nome para obter CPF"}),e.jsx("li",{children:"Se houver exatamente 1 resultado, consulta por CPF para obter telefones/emails"})]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"nome"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Nome completo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"uf"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"None"}),e.jsx("td",{children:"UF para filtrar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"expand"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"True"}),e.jsx("td",{children:"Se False, retorna apenas CPF"})]})]})]}),e.jsx("h4",{children:"Retorno - Sucesso (1 resultado)"}),e.jsx(a,{code:`{
    "telefones": ["11987654321"],
    "emails": ["email@example.com"],
    "cpf": "12345678900",
    "dados_completos": {...},
}`}),e.jsx("h4",{children:"Retorno - Não encontrado"}),e.jsx(a,{code:`{
    "telefones": ["Não encontrado"],
    "emails": ["Não encontrado"],
    "cpf": "Não encontrado",
}`}),e.jsx("h4",{children:"Retorno - Múltiplos resultados"}),e.jsx(a,{code:`{
    "telefones": ["Múltiplos resultados"],
    "emails": ["Múltiplos resultados"],
    "cpf": "Múltiplos resultados",
}`}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Caso encontre 1 resultado
dados = client.enriquecer_contato_com_nome("João Silva", uf="SP")
print(dados['cpf'])  # '12345678900'
print(dados['telefones'])  # ['11987654321']

# Caso não encontrado
dados = client.enriquecer_contato_com_nome("Nome Inexistente")
print(dados['telefones'])  # ['Não encontrado']

# Caso múltiplos resultados
dados = client.enriquecer_contato_com_nome("João Silva")
print(dados['cpf'])  # 'Múltiplos resultados'`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"consultar",children:"consultar"}),e.jsx(a,{code:"def consultar(self, chave_consulta: str) -> dict"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Interface unificada para consulta (CPF ou nome)."]}),e.jsx("h4",{children:"Detecção Automática"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Se apenas dígitos e 11 caracteres → CPF"}),e.jsx("li",{children:"Caso contrário → Nome"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Consulta por CPF
dados = client.consultar("12345678900")
print(dados['telefones'])  # ['11987654321']

# Consulta por nome
dados = client.consultar("João Silva")
print(dados['cpf'])  # '12345678900'`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos de Automação Web"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"setup_driver",children:"setup_driver"}),e.jsx(a,{code:"def setup_driver(self) -> bool"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Configura o WebDriver Selenium com ChromeOptions."]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"bool"})," - True se sucesso, False se erro"]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"login",children:"login"}),e.jsx(a,{code:"def login(self) -> bool"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Realiza login no sistema LEMIT via Selenium."]}),e.jsx("h4",{children:"Workflow"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Navega para página de login"}),e.jsx("li",{children:"Preenche username"}),e.jsx("li",{children:"Preenche password"}),e.jsx("li",{children:'Clica em "Entrar"'}),e.jsx("li",{children:"Aguarda redirecionamento"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"navigate_to_cpf_query_page",children:"navigate_to_cpf_query_page"}),e.jsx(a,{code:"def navigate_to_cpf_query_page(self) -> bool"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Navega até a página de consulta de CPF."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"upload_cpf_file",children:"upload_cpf_file"}),e.jsx(a,{code:"def upload_cpf_file(self, file_path: str) -> bool"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Faz upload de arquivo CSV com CPFs."]}),e.jsx("h4",{children:"Validações"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Arquivo existe"}),e.jsx("li",{children:"Extensão .csv"}),e.jsx("li",{children:"Formato válido"})]}),e.jsx("h4",{children:"Workflow"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Localiza input de arquivo"}),e.jsx("li",{children:"Envia caminho do arquivo"}),e.jsx("li",{children:"Aguarda upload"}),e.jsx("li",{children:'Clica em "Processar"'})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"wait_for_processing_and_download",children:"wait_for_processing_and_download"}),e.jsx(a,{code:`def wait_for_processing_and_download(
    self,
    timeout: int = None,
    check_interval: int = None
) -> str | None`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Aguarda processamento e baixa resultados."]}),e.jsx("h4",{children:"Workflow"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Aguarda processamento concluir (polling)"}),e.jsx("li",{children:'Clica em "Download"'}),e.jsx("li",{children:"Aguarda arquivo ser baixado"}),e.jsx("li",{children:"Retorna caminho do arquivo"})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"str | None"})," - Caminho do arquivo baixado ou None"]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"close",children:"close"}),e.jsx(a,{code:"def close(self) -> None"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Fecha o WebDriver e limpa recursos."]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`try:
    client.setup_driver()
    client.login()
    # ... operações
finally:
    client.close()`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Exemplo 1: Consulta Simples por CPF"}),e.jsx(a,{code:`from src.lemit_automation import LemitClient

client = LemitClient()

# Consulta por CPF
dados = client.consultar_pessoa_por_cpf("14821139456")
if dados:
    print(f"Nome: {dados['pessoa']['nome']}")
    print(f"Telefones: {dados['pessoa']['celulares']}")`}),e.jsx("h3",{children:"Exemplo 2: Enriquecimento de Contato"}),e.jsx(a,{code:`client = LemitClient()

# Enriquecer com CPF
dados = client.enriquecer_contato_com_cpf("12345678900")
print(f"Telefones: {dados['telefones']}")
print(f"Emails: {dados['emails']}")

# Enriquecer com nome
dados = client.enriquecer_contato_com_nome("João Silva", uf="SP")
print(f"CPF: {dados['cpf']}")`}),e.jsx("h3",{children:"Exemplo 3: Automação Web Completa"}),e.jsx(a,{code:`from src.lemit_automation import LemitClient

client = LemitClient()

try:
    # Setup e login
    if not client.setup_driver():
        raise Exception("Falha ao configurar driver")
    
    if not client.login():
        raise Exception("Falha no login")
    
    # Navegar e fazer upload
    if client.navigate_to_cpf_query_page():
        if client.upload_cpf_file("cpfs.csv"):
            # Aguardar e baixar
            result_file = client.wait_for_processing_and_download()
            if result_file:
                print(f"✅ Arquivo baixado: {result_file}")
finally:
    client.close()`}),e.jsx("h3",{children:"Exemplo 4: Consulta de Sócios"}),e.jsx(a,{code:`client = LemitClient()

cnpj = "07617044000104"
socios = client.get_advogados_socios(cnpj)

print(f"Escritório possui {len(socios)} sócios:")
for socio in socios:
    print(f"  - {socio['nome']}")
    print(f"    CPF: {socio['cpf']}")
    print(f"    Qualificação: {socio['qualificacao']}")`})]})]})}function Bm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: LemitProcessor"}),e.jsx("p",{className:"doc-subtitle",children:"Processador especializado para dados exportados do LEMIT."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsxs("p",{children:["A classe ",e.jsx("code",{className:"code-block",children:"LemitProcessor"})," é responsável por processar e limpar dados CSV exportados do sistema LEMIT, normalizando telefones, emails e estruturando os dados em formato padronizado."]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Classe LemitProcessor"}),e.jsx(a,{code:"class LemitProcessor:"}),e.jsx("p",{children:"Processador especializado para dados exportados do LEMIT."}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Processar arquivos CSV do LEMIT"}),e.jsx("li",{children:"Normalizar telefones (adicionar código do país +55)"}),e.jsx("li",{children:"Estruturar emails em colunas separadas"}),e.jsx("li",{children:"Limpar e validar dados de entrada"}),e.jsx("li",{children:"Gerar saídas em formato padronizado"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Constantes"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"CSV_DELIMITER"}),e.jsx(a,{code:'CSV_DELIMITER = ";"'}),e.jsx("p",{children:"Delimitador padrão para arquivos CSV do LEMIT."})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos da Classe"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:"def __init__(self, logger: logging.Logger = None):"}),e.jsx("p",{children:"Inicializa o processador LEMIT."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger para mensagens"})]})})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"clean_lemit_result",children:"clean_lemit_result"}),e.jsx(a,{code:`def clean_lemit_result(
    self,
    entrada: Optional[str | Dict] = None,
    arquivo_entrada: Optional[str] = None,
    arquivo_saida: Optional[str] = None,
) -> Optional[Dict[str, Any]]:`}),e.jsx("p",{children:"Limpa e normaliza um CSV exportado do LEMIT."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"entrada"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str/Dict"})}),e.jsx("td",{children:"Conteúdo do CSV ou caminho do arquivo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"arquivo_entrada"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho (deprecated - use entrada)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"arquivo_saida"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho do arquivo de saída (opcional)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[Dict[str, Any]]"})}),e.jsx("td",{children:"Dados processados se arquivo_saida=None"})]})})]}),e.jsx("h4",{children:"Estrutura de retorno"}),e.jsx(a,{code:`{
    "headers": [
        "nome", "cpf",
        "telefone_1", "telefone_2", "telefone_3", "telefone_4",
        "email_1", "email_2", "email_3"
    ],
    "linhas": [
        {
            "nome": str,
            "cpf": str,
            "telefone_1": str,  # Com prefixo +55
            "telefone_2": str,
            "telefone_3": str,
            "telefone_4": str,
            "email_1": str,
            "email_2": str,
            "email_3": str
        }
    ]
}`}),e.jsx("h4",{children:"Exceções"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Exceção"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ValidationError"})}),e.jsx("td",{children:"Dados de entrada inválidos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"FileProcessingError"})}),e.jsx("td",{children:"Erro ao processar arquivo"})]})]})]}),e.jsx("h4",{children:"Processamento realizado"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Normalização do conteúdo CSV"}),e.jsx("li",{children:"Extração e validação de headers"}),e.jsx("li",{children:"Processamento linha por linha"}),e.jsx("li",{children:"Normalização de telefones (+55 prefix)"}),e.jsx("li",{children:"Estruturação de emails"}),e.jsx("li",{children:"Geração de headers dinâmicos baseados no conteúdo"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Privados"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_normalizar_entrada_csv",children:"_normalizar_entrada_csv"}),e.jsx(a,{code:"def _normalizar_entrada_csv(self, entrada: str | Dict[str, Any]) -> str:"}),e.jsx("p",{children:"Normaliza entrada CSV para string."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"entrada"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str/Dict"})}),e.jsx("td",{children:"Conteúdo ou dicionário com 'conteudo'"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Conteúdo CSV como string"})]})})]}),e.jsx("h4",{children:"Formatos aceitos"}),e.jsxs("ul",{children:[e.jsx("li",{children:"String direta com conteúdo CSV"}),e.jsxs("li",{children:["Dicionário:"," ",e.jsx("code",{className:"code-block",children:'{"conteudo": "csv_content_here"}'})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_extrair_dados_linha",children:"_extrair_dados_linha"}),e.jsx(a,{code:`def _extrair_dados_linha(
    self, headers: List[str], valores: List[str]
) -> Dict[str, str]:`}),e.jsx("p",{children:"Extrai dados de uma linha do CSV LEMIT."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"headers"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"Lista de cabeçalhos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"valores"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"Lista de valores da linha"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict[str, str]"})}),e.jsx("td",{children:"Dados extraídos e normalizados"})]})})]}),e.jsx("h4",{children:"Processamento por campo"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Nome"}),": Primeiro valor se separado por vírgula"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"CPF"}),': Extraído de colunas "cpf" ou "CPF"']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Telefones"}),": Até 4 telefones com prefixo +55"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Emails"}),": Até 3 emails estruturados"]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"_first"}),e.jsx(a,{code:"def _first(self, value: str) -> str:"}),e.jsx("p",{children:"Retorna o primeiro valor de uma string separada por vírgula."}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`>>> _first("João Silva, Maria Santos")
"João Silva"
>>> _first("Escritório ABC")
"Escritório ABC"`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_escrever_csv",children:"_escrever_csv"}),e.jsx(a,{code:`def _escrever_csv(
    self, arquivo_saida: str, headers: List[str], linhas: List[Dict[str, str]]
) -> None:`}),e.jsx("p",{children:"Escreve CSV de saída com encoding UTF-8."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"arquivo_saida"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho do arquivo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"headers"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"Lista de cabeçalhos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"linhas"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[Dict]"})}),e.jsx("td",{children:"Lista de dados"})]})]})]}),e.jsx("h4",{children:"Configurações de escrita"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Encoding"}),": UTF-8"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Delimitador"}),": ; (ponto e vírgula)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Quoting"}),": Mínimo necessário"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Newline"}),": Padrão do sistema"]})]}),e.jsx("h4",{children:"Exceções"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Exceção"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"FileProcessingError"})}),e.jsx("td",{children:"Erro de permissão ou I/O"})]})})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Processamento Básico"}),e.jsx(a,{code:`# Inicializar processador
processor = LemitProcessor(logger=logger)

# Processar CSV em memória
csv_content = """nome;cpf;telefone1;email1
João Silva;12345678901;11987654321;joao@email.com
Maria Santos;98765432100;21876543210;maria@email.com"""

resultado = processor.clean_lemit_result(entrada=csv_content)
print(f"Headers: {resultado['headers']}")
print(f"Linhas processadas: {len(resultado['linhas'])}")`}),e.jsx("h3",{children:"Processamento com Arquivo"}),e.jsx(a,{code:`# Processar e salvar diretamente
processor.clean_lemit_result(
    entrada="dados_lemit.csv",
    arquivo_saida="dados_processados.csv"
)`}),e.jsx("h3",{children:"Processamento com Dicionário"}),e.jsx(a,{code:`dados = {
    "conteudo": "nome;cpf;telefone1\\nJoão;123;11999"
}
resultado = processor.clean_lemit_result(entrada=dados)`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Formato de Dados"}),e.jsx("h3",{children:"Headers Dinâmicos"}),e.jsx("p",{children:"O processador gera headers baseados no conteúdo:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Fixos"}),": ",e.jsx("code",{className:"code-block",children:"nome"}),","," ",e.jsx("code",{className:"code-block",children:"cpf"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Telefones"}),":"," ",e.jsx("code",{className:"code-block",children:"telefone_1"})," até"," ",e.jsx("code",{className:"code-block",children:"telefone_4"})," (baseado no máximo encontrado)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Emails"}),": ",e.jsx("code",{className:"code-block",children:"email_1"})," ","até ",e.jsx("code",{className:"code-block",children:"email_3"})," (máximo fixo)"]})]}),e.jsx("h3",{children:"Normalização de Telefones"}),e.jsxs("p",{children:["Todos os telefones recebem automaticamente o prefixo"," ",e.jsx("code",{className:"code-block",children:"55"}),":"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Input: ",e.jsx("code",{className:"code-block",children:"11987654321"})]}),e.jsxs("li",{children:["Output: ",e.jsx("code",{className:"code-block",children:"5511987654321"})]})]}),e.jsx("h3",{children:"Estrutura de Linha Processada"}),e.jsx(a,{code:`{
    "nome": "JOÃO SILVA",
    "cpf": "12345678901",
    "telefone_1": "5511987654321",
    "telefone_2": "5511876543210",
    "telefone_3": "",
    "telefone_4": "",
    "email_1": "joao@email.com",
    "email_2": "joao.silva@empresa.com",
    "email_3": ""
}`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Tratamento de Erros"}),e.jsx("h3",{children:"Validações de Entrada"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Condição"}),e.jsx("th",{children:"Exceção"}),e.jsx("th",{children:"Mensagem"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"entrada é None"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ValidationError"})}),e.jsx("td",{children:"Parâmetro 'entrada' é obrigatório"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Headers vazios"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ValidationError"})}),e.jsx("td",{children:"Headers CSV não podem estar vazios"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CSV sem dados válidos"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ValidationError"})}),e.jsx("td",{children:"CSV não contém dados válidos"})]})]})]}),e.jsx("h3",{children:"Tratamento de Linhas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Linhas vazias são ignoradas"}),e.jsx("li",{children:"Erros de parsing em linhas individuais geram warning e continuam processamento"}),e.jsx("li",{children:"Log detalhado de número de linhas processadas vs. ignoradas"})]}),e.jsx("h3",{children:"Tratamento de Arquivo"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Erro"}),e.jsx("th",{children:"Exceção"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Sem permissão"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"FileProcessingError"})}),e.jsx("td",{children:"Erro de escrita no arquivo"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Erro de I/O"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"FileProcessingError"})}),e.jsx("td",{children:"Problemas de sistema de arquivos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Erro inesperado"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"FileProcessingError"})}),e.jsx("td",{children:"Outros erros durante processamento"})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Observabilidade"}),e.jsx("h3",{children:"Logging"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Info"}),": Número de linhas e colunas processadas"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Warning"}),": Erros em linhas específicas (com número da linha)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Debug"}),": Detalhes do processamento"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Error"}),": Erros críticos que impedem processamento"]})]}),e.jsx("h3",{children:"Métricas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Total de linhas processadas"}),e.jsx("li",{children:"Linhas com erro (ignoradas)"}),e.jsx("li",{children:"Número de headers gerados"}),e.jsx("li",{children:"Máximo de telefones/emails por linha"})]})]})]})}function Um(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: PloomesAPI"}),e.jsx("p",{className:"doc-subtitle",children:"Cliente HTTP especializado para comunicação direta com a API do Ploomes."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsxs("p",{children:["A classe ",e.jsx("code",{className:"code-block",children:"PloomesAPI"})," é responsável exclusivamente pelas chamadas HTTP diretas para os endpoints do Ploomes. Implementa observabilidade completa com métricas, logging estruturado e tratamento robusto de erros, mantendo-se livre de lógica de negócio ou orquestração."]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Classe PloomesAPI"}),e.jsx(a,{code:"class PloomesAPI:"}),e.jsx("p",{children:"Cliente HTTP especializado para interações diretas com a API Ploomes."}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Chamadas HTTP diretas aos endpoints Ploomes"}),e.jsx("li",{children:"Autenticação e configuração de sessão"}),e.jsx("li",{children:"Instrumentação com métricas de observabilidade"}),e.jsx("li",{children:"Logging estruturado com correlation_id"}),e.jsx("li",{children:"Tradução robusta de erros HTTP"}),e.jsx("li",{children:"Cache estratégico para consultas frequentes"})]}),e.jsx("h3",{children:"Princípios"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Single Responsibility"}),": Apenas interações HTTP"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Stateless"}),": Sem lógica de negócio ou fluxo"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Observable"}),": Todas as operações instrumentadas"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Resilient"}),": Tratamento robusto de erros de rede"]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Inicialização"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:"def __init__(self, environment: Optional[str], logger: logging.Logger) -> None:"}),e.jsx("p",{children:"Inicializa cliente API com configuração e observabilidade."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"environment"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[str]"})}),e.jsx("td",{children:"Ambiente (prod/sandbox)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger para instrumentação"})]})]})]}),e.jsx("h4",{children:"Configuração automática"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Fonte"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"base_url"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"config.get_base_url()"})}),e.jsx("td",{children:"URL base da API"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"user_key"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"config.PLOOMES_USER_KEY"})}),e.jsx("td",{children:"Chave de autenticação"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"timeout"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"config.TIMEOUT"})}),e.jsx("td",{children:"Timeout para requisições"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"rate_limit_delay"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"config.RATE_LIMIT_DELAY"})}),e.jsx("td",{children:"Delay entre requests"})]})]})]}),e.jsx("h4",{children:"Sessão HTTP otimizada"}),e.jsx(a,{code:`# Configuração de pool de conexões
adapter = HTTPAdapter(
    pool_connections=config.HTTP_ADAPTER_POOL_CONNECTIONS,
    pool_maxsize=config.HTTP_ADAPTER_POOL_MAXSIZE,
    max_retries=config.HTTP_ADAPTER_MAX_RETRIES,
)`}),e.jsx("h4",{children:"Headers padrão"}),e.jsx(a,{code:`{
    "User-Key": "sua_user_key_aqui",
    "Content-Type": "application/json"
}`}),e.jsx("h4",{children:"Observabilidade inicializada"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Registry de métricas específico para API"}),e.jsx("li",{children:"Contador de requisições"}),e.jsx("li",{children:"Cache para escritórios com advogado principal"})]}),e.jsx("h4",{children:"Validação na inicialização"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Testa user-key via endpoint"," ",e.jsx("code",{className:"code-block",children:"/Contacts?$top=1"})]}),e.jsxs("li",{children:["Levanta ",e.jsx("code",{className:"code-block",children:"InvalidUserKeyError"})," se inválida"]}),e.jsx("li",{children:"Log de confirmação da inicialização"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Sistema de Observabilidade"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_handle_request",children:"_handle_request"}),e.jsx(a,{code:"def _handle_request(self, method: str, url: str, **kwargs) -> requests.Response:"}),e.jsx("p",{children:"Executa requisição HTTP com instrumentação completa de observabilidade."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"method"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Método HTTP (GET, POST, PATCH)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"url"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"URL da requisição"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"**kwargs"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Any"})}),e.jsx("td",{children:"Argumentos para requests"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"requests.Response"})}),e.jsx("td",{children:"Resposta HTTP validada"})]})})]}),e.jsx("h4",{children:"Instrumentação automática"}),e.jsx("h5",{children:"1. Correlation tracking"}),e.jsx(a,{code:"correlation = get_correlation_id()  # UUID único para rastreamento"}),e.jsx("h5",{children:"2. Métricas de performance"}),e.jsx(a,{code:`operation_name = f"{method}_{url.split('/')[-1].split('(')[0]}"
start_time = time.perf_counter()
duration_ms = (time.perf_counter() - start_time) * 1000`}),e.jsx("h5",{children:"3. Contadores de requisições"}),e.jsx(a,{code:"self._request_count += 1"}),e.jsx("h5",{children:"4. Logging estruturado"}),e.jsx(a,{code:'logger.debug(f"[{correlation}] 🔗 {method} {url} ({duration_ms:.2f}ms)")'}),e.jsx("h5",{children:"5. Registro de métricas"}),e.jsx(a,{code:"self._metrics.record_operation(operation_name, success, duration_ms)"}),e.jsx("h4",{children:"Tratamento de erros específicos"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Exceção"}),e.jsx("th",{children:"Tratamento"}),e.jsx("th",{children:"Nova Exceção"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Timeout"}),e.jsx("td",{children:"Log + métricas"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesAPIError"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"ConnectionError"}),e.jsx("td",{children:"Log + métricas"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesAPIError"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"HTTPError"}),e.jsx("td",{children:"Status code analysis"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesAPIError"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"RequestException"}),e.jsx("td",{children:"Log genérico"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesAPIError"})})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_metrics_summary",children:"get_metrics_summary"}),e.jsx(a,{code:"def get_metrics_summary(self) -> Dict:"}),e.jsx("p",{children:"Retorna resumo completo das métricas de API."}),e.jsx("h4",{children:"Estrutura de retorno"}),e.jsx(a,{code:`{
    "total_requests": 1247,           # Total de requisições
    "success_rate": 0.982,           # Taxa de sucesso (0.0-1.0)
    "average_duration_ms": 245.3,    # Latência média
    "operations": {                  # Métricas por operação
        "GET_Contacts": {
            "count": 450,
            "success_rate": 0.995,
            "avg_duration_ms": 180.2
        },
        "POST_Contacts": {
            "count": 200,
            "success_rate": 0.970,
            "avg_duration_ms": 320.1
        }
        # ... outras operações
    }
}`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Operações de Contatos"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_contact_by_name_and_type",children:"get_contact_by_name_and_type"}),e.jsx(a,{code:`def get_contact_by_name_and_type(
    self, name: str, type_id: int, expand_tags: bool = False
) -> Optional[Dict]:`}),e.jsx("p",{children:"Obtém contato pelo nome e tipo com filtros OData."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do contato"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"type_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do tipo (1=Empresa, 2=Pessoa)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"expand_tags"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"Se expande tags do contato"})]})]})]}),e.jsx("h4",{children:"Construção de filtros"}),e.jsx(a,{code:`# Escaping de caracteres especiais
escaped_name = name.replace("'", "''").replace("&", "%26")

# Filtro OData
params = {"$filter": f"Name eq '{escaped_name}' and TypeId eq {type_id}"}

# Expansão opcional
if expand_tags:
    params["$expand"] = "Tags"`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Endpoint:"})," ",e.jsx("code",{className:"code-block",children:"GET /Contacts"})," com filtros"]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"check_contact_field_filled",children:"check_contact_field_filled"}),e.jsx(a,{code:"def check_contact_field_filled(self, contact_id: int, field_key: str) -> bool:"}),e.jsx("p",{children:"Verifica se campo específico do contato está preenchido."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"contact_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"ID do contato"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"field_key"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Chave do campo personalizado"})]})]})]}),e.jsx("h4",{children:"Exemplo de field_key"}),e.jsx(a,{code:`# Campo OAB
field_key = "contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F"`}),e.jsx("h4",{children:"Lógica de verificação"}),e.jsxs("ol",{children:[e.jsxs("li",{children:["Busca contato por ID com"," ",e.jsx("code",{className:"code-block",children:"$select"})," do campo específico"]}),e.jsxs("li",{children:["Verifica se campo existe em"," ",e.jsx("code",{className:"code-block",children:"OtherProperties"})]}),e.jsx("li",{children:"Valida se valor não está vazio/None"}),e.jsx("li",{children:"Retorna boolean indicando preenchimento"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"check_contact_register_filled"}),e.jsx(a,{code:"def check_contact_register_filled(self, contact_id: int) -> bool:"}),e.jsx("p",{children:"Verifica se campo Register (CPF/CNPJ) está preenchido."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Especialização"})," do"," ",e.jsx("code",{className:"code-block",children:"check_contact_field_filled"})," para campo Register."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"create_contact",children:"create_contact"}),e.jsx(a,{code:"def create_contact(self, body: Dict) -> Dict:"}),e.jsx("p",{children:"Cria novo contato via POST."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"body"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict"})}),e.jsx("td",{children:"Dados do contato no formato Ploomes"})]})})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Endpoint:"})," ",e.jsx("code",{className:"code-block",children:"POST /Contacts"})]}),e.jsx("h4",{children:"Validação automática"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Status 201 esperado para criação"}),e.jsx("li",{children:"Parsing da resposta JSON"}),e.jsx("li",{children:"Tratamento de erros específicos"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"patch_contact",children:"patch_contact"}),e.jsx(a,{code:"def patch_contact(self, contact_id: int, body: Dict) -> Dict:"}),e.jsx("p",{children:"Atualiza contato existente via PATCH."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Endpoint:"})," ",e.jsx("code",{className:"code-block",children:"PATCH /Contacts({contact_id})"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"apply_tag",children:"apply_tag"}),e.jsx(a,{code:"def apply_tag(self, contact_id: int, tag_id: int) -> None:"}),e.jsx("p",{children:"Aplica tag a um contato."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Endpoint:"})," ",e.jsx("code",{className:"code-block",children:"POST /Contacts({contact_id})/Tags"})]}),e.jsx("h4",{children:"Payload"}),e.jsx(a,{code:'{"TagId": tag_id}'})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"contact_has_tag",children:"contact_has_tag"}),e.jsx(a,{code:"def contact_has_tag(self, contact: Dict, tag_id: int) -> bool:"}),e.jsx("p",{children:"Verifica se contato possui tag específica."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Pré-requisito:"})," Contato deve ter sido obtido com"," ",e.jsx("code",{className:"code-block",children:"$expand=Tags"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Operações de Deals/Negócios"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_deal_by_cnj",children:"get_deal_by_cnj"}),e.jsx(a,{code:"def get_deal_by_cnj(self, cnj: str) -> Optional[Dict]:"}),e.jsx("p",{children:"Busca negócio pelo número CNJ."}),e.jsx("h4",{children:"Filtro OData"}),e.jsx(a,{code:`$filter = f"OtherProperties/any(p: p/FieldKey eq 'deal_20E8290A-809B-4CF1-9345-6B264AED7830' and p/StringValue eq '{cnj}')"`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Endpoint:"})," ",e.jsx("code",{className:"code-block",children:"GET /Deals"})," com filtro"]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"create_deal",children:"create_deal"}),e.jsx(a,{code:"def create_deal(self, body: Dict) -> Dict:"}),e.jsx("p",{children:"Cria novo negócio/deal."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Endpoint:"})," ",e.jsx("code",{className:"code-block",children:"POST /Deals"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"patch_deal",children:"patch_deal"}),e.jsx(a,{code:"def patch_deal(self, deal_id: int, body: Dict) -> None:"}),e.jsx("p",{children:"Atualiza negócio existente."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Endpoint:"})," ",e.jsx("code",{className:"code-block",children:"PATCH /Deals({deal_id})"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"get_stage_by_pipeline_and_name"}),e.jsx(a,{code:`def get_stage_by_pipeline_and_name(
    self, pipeline_name: str, stage_name: str
) -> Optional[Dict]:`}),e.jsx("p",{children:"Busca estágio por pipeline e nome."}),e.jsx("h4",{children:"Filtro complexo"}),e.jsx(a,{code:`$filter = f"Pipeline/Name eq '{pipeline_name}' and Name eq '{stage_name}'"
$expand = "Pipeline"`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_deals_by_contact_id",children:"get_deals_by_contact_id"}),e.jsx(a,{code:"def get_deals_by_contact_id(self, contact_id: int) -> list[Dict]:"}),e.jsx("p",{children:"Busca todos os negócios de um contato."}),e.jsx(a,{code:'$filter = f"ContactId eq {contact_id}"'})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Operações Especializadas"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"get_escritorio_with_advogado_principal"}),e.jsx(a,{code:`def get_escritorio_with_advogado_principal(
    self, escritorio_name: str
) -> Optional[Dict]:`}),e.jsx("p",{children:"Busca escritório que possui advogado principal com nome específico."}),e.jsx("h4",{children:"Funcionalidade"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Busca escritório"})," por nome"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Busca advogado principal"})," associado ao escritório"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Validação"})," se nome do advogado corresponde"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cache"})," de resultados para otimização"]})]}),e.jsx("h4",{children:"Cache strategy"}),e.jsx(a,{code:`self._escritorio_cache: Dict[str, Optional[Dict]] = {}
cache_key = escritorio_name.lower().strip()`}),e.jsx("h4",{children:"Fluxo de busca"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Check cache por nome do escritório"}),e.jsx("li",{children:"Se não cached, busca escritório via API"}),e.jsx("li",{children:"Se encontrado, busca advogado principal"}),e.jsx("li",{children:"Valida correspondência de nomes"}),e.jsx("li",{children:"Armazena resultado no cache"}),e.jsx("li",{children:"Retorna escritório + advogado principal"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_office_by_name",children:"get_office_by_name"}),e.jsx(a,{code:"def get_office_by_name(self, escritorio_name: str) -> Optional[Dict]:"}),e.jsx("p",{children:"Busca escritório apenas pelo nome (sem advogado principal)."}),e.jsx(a,{code:`$filter = f"Name eq '{escaped_name}' and TypeId eq 1"  # TypeId=1 para empresas`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"_find_principal_lawyer"}),e.jsx(a,{code:`def _find_principal_lawyer(
    self, escritorio: Dict, escritorio_name: str
) -> Optional[Dict]:`}),e.jsx("p",{children:"Encontra advogado principal de um escritório (método privado)."}),e.jsx("h4",{children:"Lógica"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Busca pessoas (TypeId=2) associadas ao escritório"}),e.jsx("li",{children:"Filtra por correspondência de nome fuzzy"}),e.jsx("li",{children:"Retorna primeiro match válido"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Sistema de Cache"}),e.jsx("h3",{children:"Cache de Escritórios"}),e.jsx(a,{code:"self._escritorio_cache: Dict[str, Optional[Dict]] = {}"}),e.jsx("h4",{children:"Estratégia"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Chave"}),": Nome do escritório (lowercase, trimmed)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Valor"}),": Dados completos do escritório + advogado principal"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"TTL"}),": Sem expiração (cache de sessão)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Invalidação"}),": Manual ou reinicialização"]})]}),e.jsx("h4",{children:"Benefícios"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Reduz consultas duplicadas durante processamento"}),e.jsx("li",{children:"Acelera verificações de escritórios existentes"}),e.jsx("li",{children:"Otimiza operações de deduplicação"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Tratamento de Erros"}),e.jsx("h3",{children:"Tradução de Exceções HTTP"}),e.jsx(a,{code:`try:
    response = self.session.get(url, **kwargs)
    response.raise_for_status()
    return response
except requests.exceptions.Timeout as e:
    raise PloomesAPIError(f"Timeout na requisição: {e}")
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 401:
        raise InvalidUserKeyError("User-Key inválida ou expirada")
    else:
        raise PloomesAPIError(e.response.status_code, e.response.text)`}),e.jsx("h3",{children:"Categorização por Status Code"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Status Code"}),e.jsx("th",{children:"Interpretação"}),e.jsx("th",{children:"Ação"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"401"}),e.jsx("td",{children:"Unauthorized"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"InvalidUserKeyError"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"403"}),e.jsx("td",{children:"Forbidden"}),e.jsxs("td",{children:["Log + ",e.jsx("code",{className:"code-block",children:"PloomesAPIError"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"404"}),e.jsx("td",{children:"Not Found"}),e.jsx("td",{children:"Retorno None (para gets)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"429"}),e.jsx("td",{children:"Rate Limit"}),e.jsxs("td",{children:["Log + ",e.jsx("code",{className:"code-block",children:"PloomesAPIError"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"500+"}),e.jsx("td",{children:"Server Error"}),e.jsxs("td",{children:["Log + ",e.jsx("code",{className:"code-block",children:"PloomesAPIError"})]})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Observabilidade Avançada"}),e.jsx("h3",{children:"Métricas por Endpoint"}),e.jsx(a,{code:`# Tracking automático por operação
"GET_Contacts": {"count": 450, "success_rate": 0.995}
"POST_Contacts": {"count": 200, "success_rate": 0.970}
"PATCH_Contacts": {"count": 150, "success_rate": 0.980}
"GET_Deals": {"count": 100, "success_rate": 1.000}`}),e.jsx("h3",{children:"Correlation ID Tracking"}),e.jsx(a,{code:`# Cada requisição tem correlation_id único
logger.debug(f"[{correlation_id}] 🔗 GET /Contacts (245ms) - Success")`}),e.jsx("h3",{children:"Performance Monitoring"}),e.jsx(a,{code:`# Latência por tipo de operação
average_latency = {
    "GET": 180ms,    # Consultas rápidas
    "POST": 320ms,   # Criações mais lentas
    "PATCH": 290ms   # Atualizações médias
}`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Busca e Criação de Contato"}),e.jsx(a,{code:`api = PloomesAPI(environment="prod", logger=logger)

# Buscar contato existente
contact = api.get_contact_by_name_and_type(
    name="João Silva Advogados",
    type_id=1,
    expand_tags=True
)

if not contact:
    # Criar novo contato
    contact_data = {
        "Name": "João Silva Advogados",
        "TypeId": 1,
        "Register": "12345678000199"
    }
    contact = api.create_contact(contact_data)
    print(f"✅ Contato criado: ID {contact['Id']}")
else:
    print(f"📋 Contato existente: ID {contact['Id']}")`}),e.jsx("h3",{children:"Verificação de Campos"}),e.jsx(a,{code:`# Verificar se OAB está preenchida
oab_filled = api.check_contact_field_filled(
    contact_id=123,
    field_key="contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F"
)

if not oab_filled:
    # Atualizar com OAB
    api.patch_contact(123, {
        "OtherProperties": [{
            "FieldKey": "contact_C40CB3B4-F8DA-4A92-8F96-93F27DA1516F",
            "StringValue": "MG123456"
        }]
    })`}),e.jsx("h3",{children:"Operações com Deals"}),e.jsx(a,{code:`# Buscar deal por CNJ
deal = api.get_deal_by_cnj("1234567-89.2023.8.13.0001")

if deal:
    # Atualizar estágio
    stage = api.get_stage_by_pipeline_and_name("Processos", "Ganho")
    if stage:
        api.patch_deal(deal['Id'], {"StageId": stage['Id']})`}),e.jsx("h3",{children:"Monitoramento de Performance"}),e.jsx(a,{code:`# Métricas da sessão
metrics = api.get_metrics_summary()
print(f"📊 Total de requests: {metrics['total_requests']}")
print(f"✅ Taxa de sucesso: {metrics['success_rate']:.1%}")
print(f"⚡ Latência média: {metrics['average_duration_ms']:.0f}ms")

# Análise por operação
for op, stats in metrics['operations'].items():
    if stats['success_rate'] < 0.9:
        print(f"⚠️ {op}: baixa taxa de sucesso ({stats['success_rate']:.1%})")`})]})]})}function qm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: PloomesClient"}),e.jsx("p",{className:"doc-subtitle",children:"Facade principal para integração com Ploomes, compondo camadas especializadas."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsxs("p",{children:["A classe ",e.jsx("code",{className:"code-block",children:"PloomesClient"})," é o ponto de entrada principal para integração com o Ploomes. Atua como facade que compõe as novas camadas especializadas, mantendo compatibilidade com a interface pública existente."]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Classe PloomesClient"}),e.jsx(a,{code:"class PloomesClient:"}),e.jsx("p",{children:"Facade compatível que compõe as camadas especializadas do sistema."}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Interface pública unificada para o sistema"}),e.jsx("li",{children:"Composição de serviços especializados (API, Processing, Contacts, Deals)"}),e.jsx("li",{children:"Manutenção de compatibilidade com código legado"}),e.jsx("li",{children:"Orquestração de operações complexas"}),e.jsx("li",{children:"Delegação para camadas apropriadas"})]}),e.jsx("h3",{children:"Arquitetura em Camadas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"PloomesAPI"}),": Chamadas HTTP diretas"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Processing"}),": Lógica complexa e coordenação externa"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ContactService"}),": Operações de contatos"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"DealService"}),": Operações de negócios/deals"]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Inicialização"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:"def __init__(self, environment: Optional[str] = None) -> None:"}),e.jsx("p",{children:"Inicializa o cliente compondo todas as camadas especializadas."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"environment"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[str]"})}),e.jsx("td",{children:"Ambiente Ploomes (prod/sandbox)"})]})})]}),e.jsx("h4",{children:"Componentes inicializados"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Componente"}),e.jsx("th",{children:"Classe"}),e.jsx("th",{children:"Responsabilidade"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"api"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"PloomesAPI"})}),e.jsx("td",{children:"Chamadas HTTP diretas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"processing"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Processing"})}),e.jsx("td",{children:"Coordenação externa e lógica complexa"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"contacts"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ContactService"})}),e.jsx("td",{children:"Operações de contatos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"deals"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"DealService"})}),e.jsx("td",{children:"Operações de negócios"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"mapper_factory"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ContactMapperFactory"})}),e.jsx("td",{children:"Factory para mapeadores"})]})]})]}),e.jsx("h4",{children:"Configurações carregadas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Mapeamentos de campos do JSON de configuração"}),e.jsx("li",{children:"Cliente LEMIT para integração"}),e.jsx("li",{children:"Comportamento humano simulado"}),e.jsx("li",{children:"Rate limiting configurado"})]}),e.jsx("h4",{children:"Log de inicialização"}),e.jsx(a,{code:"PloomesClient inicializado - Ambiente: prod, Base URL: https://api2.ploomes.com"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos de Mapeamento"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"map_escritorio_to_ploomes",children:"map_escritorio_to_ploomes"}),e.jsx(a,{code:"def map_escritorio_to_ploomes(self, data: EscritorioData) -> Tuple[Dict, int]:"}),e.jsx("p",{children:"Mapeia dados de escritório para formato Ploomes."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"EscritorioData"})}),e.jsx("td",{children:"Dados do escritório"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Tuple[Dict, int]"})}),e.jsx("td",{children:"(dados_mapeados, tag_id)"})]})})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.contacts.map_escritorio(data)"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"map_advogado_to_ploomes",children:"map_advogado_to_ploomes"}),e.jsx(a,{code:`def map_advogado_to_ploomes(
    self, data: AdvogadoData, company_id: Optional[int] = None
) -> Tuple[Dict, int]:`}),e.jsx("p",{children:"Mapeia dados de advogado para formato Ploomes."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"AdvogadoData"})}),e.jsx("td",{children:"Dados do advogado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"company_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[int]"})}),e.jsx("td",{children:"ID da empresa associada"})]})]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.contacts.map_advogado(data, company_id)"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Operações de Contatos"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"create_complete_contact_set",children:"create_complete_contact_set"}),e.jsx(a,{code:`def create_complete_contact_set(
    self, escritorio_data: EscritorioData, advogado_data: AdvogadoData
) -> Dict:`}),e.jsx("p",{children:"Cria ou atualiza um conjunto completo de contatos (escritório + advogado)."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"escritorio_data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"EscritorioData"})}),e.jsx("td",{children:"Dados do escritório"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"advogado_data"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"AdvogadoData"})}),e.jsx("td",{children:"Dados do advogado"})]})]})]}),e.jsx("h4",{children:"Estrutura de retorno"}),e.jsx(a,{code:`{
    "escritorio": Dict | None,     # Resultado da criação do escritório
    "advogado": Dict | None,       # Resultado da criação do advogado
    "success": bool,               # Status geral da operação
    "errors": List[str]            # Lista de erros ocorridos
}`}),e.jsx("h4",{children:"Fluxo de processamento"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Processamento escritório"}),": Chama"," ",e.jsx("code",{className:"code-block",children:"_process_escritorio()"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Processamento advogado"}),": Chama"," ",e.jsx("code",{className:"code-block",children:"_process_advogado()"})," com company_id"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Agregação resultados"}),": Combina resultados em estrutura unificada"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Error handling"}),": Captura e categoriza exceções"]})]}),e.jsx("h4",{children:"Exceções tratadas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"ValidationError"}),": Dados de entrada inválidos"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"PloomesAPIError"}),": Erros da API Ploomes"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"ContactCreationError"}),": Falhas na criação de contatos"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"Exception"}),": Erros gerais não categorizados"]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos de Processamento Interno"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_process_escritorio",children:"_process_escritorio"}),e.jsx(a,{code:"def _process_escritorio(self, escritorio_data: EscritorioData) -> Dict[str, Any]:"}),e.jsx("p",{children:"Processa a criação/atualização de um escritório (método privado)."}),e.jsx("h4",{children:"Fluxo"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Mapeamento"}),": Converte dados para formato Ploomes"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Criação/atualização"}),": Via ContactService"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Aplicação de tags"}),": Se especificado no mapeamento"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Retorno estruturado"}),": Dados do escritório criado"]})]}),e.jsx("h4",{children:"Estrutura de retorno"}),e.jsx(a,{code:`{
    "contact_data": Dict,     # Dados do contato criado
    "operation": str,         # "created" ou "updated"
    "contact_id": int         # ID do contato no Ploomes
}`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_process_advogado",children:"_process_advogado"}),e.jsx(a,{code:`def _process_advogado(
    self, advogado_data: AdvogadoData, company_id: Optional[int]
) -> Dict[str, Any]:`}),e.jsx("p",{children:"Processa a criação/atualização de um advogado (método privado)."}),e.jsx("h4",{children:"Funcionalidades"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Mapeamento com associação à empresa"}),e.jsx("li",{children:"Criação/atualização via ContactService"}),e.jsx("li",{children:"Aplicação de tags apropriadas"}),e.jsx("li",{children:"Retorno estruturado com metadados"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Importação Principal"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"import_to_ploomes",children:"import_to_ploomes"}),e.jsx(a,{code:"def import_to_ploomes(self, type_id: int = 1) -> List[Dict[str, Any]]:"}),e.jsx("p",{children:"Executa importação completa para o Ploomes com processamento em lotes."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"type_id"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Tipo de contato (1=Empresa, 2=Pessoa)"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[Dict[str, Any]]"})}),e.jsx("td",{children:"Lista de resultados por registro"})]})})]}),e.jsx("h4",{children:"Pré-requisito"}),e.jsx(a,{code:`# Deve ser chamado após processamento
client.create_model_from_data("arquivo.xlsx")
result = client.import_to_ploomes()`}),e.jsx("h4",{children:"Fluxo completo"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Validação"}),": Verifica se contact_groups foi populado"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Processamento lotes"}),": Itera sobre grupos únicos"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Progress tracking"}),": Log de progresso a cada grupo"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Rate limiting"}),": Aplica delays entre operações"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Error handling"}),": Captura e registra erros detalhados"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Deduplicação"}),": Evita processamento de duplicatas"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Expansão resultados"}),": Mapeia de volta para linhas originais"]})]}),e.jsx("h4",{children:"Métricas coletadas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Total de grupos processados"}),e.jsx("li",{children:"Sucessos, falhas e ignorados"}),e.jsx("li",{children:"Criações vs. atualizações"}),e.jsx("li",{children:"Tempo total de processamento"})]}),e.jsx("h4",{children:"Log de resumo"}),e.jsx(a,{code:"Resumo: lidos=150 ignorados=5 tentados=145 sucessos=140 falhas=5"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Expansão de Resultados"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_expand_results_to_original_rows",children:"_expand_results_to_original_rows"}),e.jsx(a,{code:`def _expand_results_to_original_rows(
    self, unique_results: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:`}),e.jsx("p",{children:"Expande resultados únicos de volta para linhas originais com duplicatas."}),e.jsx("h4",{children:"Funcionalidade"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Usa mapeamento"," ",e.jsx("code",{className:"code-block",children:"tuple_to_indices"})," para encontrar linhas originais"]}),e.jsxs("li",{children:["Aplica atualizações de nomes do"," ",e.jsx("code",{className:"code-block",children:"nome_updates"})]}),e.jsx("li",{children:"Propaga resultados para todas as duplicatas"}),e.jsx("li",{children:"Mantém consistência com formato de entrada"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Entrada original: 3 linhas com mesmo advogado
# Processamento único: 1 resultado
# Expansão: 3 resultados (um para cada linha original)`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos de Processamento de Dados"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"create_model_from_data",children:"create_model_from_data"}),e.jsx(a,{code:"def create_model_from_data(self, file_path: str) -> ProcessingResult:"}),e.jsx("p",{children:"Cria modelo de dados a partir de planilha Excel."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.processing.build_contact_groups_from_excel(file_path)"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Efeito:"})," Popula"," ",e.jsx("code",{className:"code-block",children:"self.contact_groups"})," para posterior importação."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"process_advogados_to_csv",children:"process_advogados_to_csv"}),e.jsx(a,{code:`def process_advogados_to_csv(
    self, file_path: str, output_path: str = "output/advogados_escritorios.csv"
) -> bool:`}),e.jsx("p",{children:"Processa advogados e exporta para CSV."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.processing.export_advogados_to_csv(file_path, output_path)"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"processar_cnjs_excel",children:"processar_cnjs_excel"}),e.jsx(a,{code:`def processar_cnjs_excel(
    self, arquivo_excel_entrada: str, arquivo_csv_saida: str
) -> None:`}),e.jsx("p",{children:"Processa planilha de CNJs para integração específica."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.processing.process_cnjs_excel(...)"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Operações de Deals/Negócios"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"create_deal",children:"create_deal"}),e.jsx(a,{code:`def create_deal(
    self, model: PloomesImportModel, max_retries: int = 3
) -> Optional[dict]:`}),e.jsx("p",{children:"Cria negócio no Ploomes."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.deals.create_deal(model, max_retries)"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"update_deal",children:"update_deal"}),e.jsx(a,{code:`def update_deal(
    self, deal_cnj: str, ploomes_stage: DealService.PloomesStage
) -> bool:`}),e.jsx("p",{children:"Atualiza estágio de negócio por CNJ."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.deals.update_deal(deal_cnj, ploomes_stage)"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_deal_by_cnj",children:"get_deal_by_cnj"}),e.jsx(a,{code:"def get_deal_by_cnj(self, deal_cnj: str):"}),e.jsx("p",{children:"Obtém negócio pelo CNJ."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.deals.get_deal_by_cnj(deal_cnj)"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_stage_id_by_pipeline_and_name",children:"get_stage_id_by_pipeline_and_name"}),e.jsx(a,{code:"def get_stage_id_by_pipeline_and_name(self, pipeline_name: str, stage_name: str):"}),e.jsx("p",{children:"Obtém ID do estágio por pipeline e nome."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.api.get_stage_by_pipeline_and_name(...)"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Auxiliares"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_load_field_mappings",children:"_load_field_mappings"}),e.jsx(a,{code:"def _load_field_mappings(self) -> Dict:"}),e.jsx("p",{children:"Carrega mapeamentos de campos do arquivo JSON de configuração."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Arquivo:"})," ",e.jsx("code",{className:"code-block",children:"resources/fields_completo.json"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Validação:"})," Verifica se dados carregados são um dicionário válido."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_estatisticas_cna",children:"_estatisticas_cna"}),e.jsx(a,{code:"def _estatisticas_cna(self) -> Dict[str, Any]:"}),e.jsx("p",{children:"Obtém estatísticas do cliente CNA."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Delegação:"})," Chama"," ",e.jsx("code",{className:"code-block",children:"self.processing._estatisticas_cna()"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_init_lemit",children:"_init_lemit"}),e.jsx(a,{code:"def _init_lemit(self):"}),e.jsx("p",{children:"Inicializa cliente LEMIT com tratamento de erros robusto."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Error handling:"})," Captura exceções e retorna None em caso de falha."]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Padrões de Uso"}),e.jsx("h3",{children:"Uso Básico - Processamento Completo"}),e.jsx(a,{code:`# Inicialização
client = PloomesClient(environment="prod")

# Processamento de dados
result = client.create_model_from_data("advogados.xlsx")
print(f"Processados: {result.processed_records}/{result.total_records}")

# Importação para Ploomes
import_results = client.import_to_ploomes(type_id=1)

# Análise de resultados
success_count = sum(1 for r in import_results if r.get('success'))
print(f"Importados com sucesso: {success_count}/{len(import_results)}")`}),e.jsx("h3",{children:"Criação Individual de Contatos"}),e.jsx(a,{code:`# Dados do escritório e advogado
escritorio = EscritorioData(nome="Escritório Silva & Associados", cnpj="12345678000199")
advogado = AdvogadoData(nome="João Silva", cpf="12345678901", oab="MG123456")

# Criação do conjunto completo
result = client.create_complete_contact_set(escritorio, advogado)

if result['success']:
    print(f"✅ Escritório criado: ID {result['escritorio']['contact_id']}")
    print(f"✅ Advogado criado: ID {result['advogado']['contact_id']}")
else:
    print(f"❌ Erros: {result['errors']}")`}),e.jsx("h3",{children:"Exportação para CSV"}),e.jsx(a,{code:`# Processamento e exportação
success = client.process_advogados_to_csv(
    file_path="entrada.xlsx",
    output_path="output/resultado.csv"
)

if success:
    print("📊 Dados exportados com sucesso")`}),e.jsx("h3",{children:"Operações de Deals"}),e.jsx(a,{code:`# Criar negócio
model = PloomesImportModel(
    titulo="Caso João vs Empresa",
    cnj="1234567-89.2023.8.13.0001",
    # ... outros campos
)

deal = client.create_deal(model)
if deal:
    print(f"🤝 Deal criado: ID {deal['Id']}")

# Atualizar estágio
success = client.update_deal(
    deal_cnj="1234567-89.2023.8.13.0001",
    ploomes_stage=DealService.PloomesStage.WON
)`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Observabilidade"}),e.jsx("h3",{children:"Logs Estruturados"}),e.jsx(a,{code:`# Logs de inicialização
logger.info("PloomesClient inicializado", extra={
    "environment": environment,
    "base_url": self.api.base_url,
    "components_loaded": ["api", "processing", "contacts", "deals"]
})

# Logs de processamento
logger.info("Importação concluída", extra={
    "total_groups": len(self.contact_groups),
    "success_count": success_count,
    "failed_count": failed_count,
    "processing_time_seconds": processing_time
})`}),e.jsx("h3",{children:"Métricas Agregadas"}),e.jsx(a,{code:`def get_processing_summary():
    return {
        "processing_stats": client.processing.get_stats(),
        "api_metrics": client.api.get_metrics_summary(),
        "cna_statistics": client._estatisticas_cna()
    }`}),e.jsx("h3",{children:"Monitoramento de Performance"}),e.jsx(a,{code:`# Rate limiting configurado
client.rate_limit_delay = 2.0  # 2 segundos entre operações

# Comportamento humano simulado
client.human_behavior.random_delay(1, 3)  # Delay aleatório

# Progress tracking automático
# Logs gerados automaticamente durante import_to_ploomes()`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Compatibilidade e Migração"}),e.jsx("h3",{children:"Interface Legada"}),e.jsxs("p",{children:["O ",e.jsx("code",{className:"code-block",children:"PloomesClient"})," mantém todos os métodos públicos da versão anterior:"]}),e.jsx(a,{code:`# Métodos mantidos para compatibilidade
client.create_model_from_data()      # ✅ Compatível
client.import_to_ploomes()           # ✅ Compatível
client.create_deal()                 # ✅ Compatível
client.process_advogados_to_csv()    # ✅ Compatível`}),e.jsx("h3",{children:"Migração Gradual"}),e.jsx(a,{code:`# Código antigo (ainda funciona)
client = PloomesClient()
result = client.import_to_ploomes()

# Novo código (acesso às camadas)
client = PloomesClient()
api_stats = client.api.get_metrics_summary()
processing_stats = client.processing.get_stats()`}),e.jsx("h3",{children:"Extensibilidade"}),e.jsx(a,{code:`# Extensão personalizada
class CustomPloomesClient(PloomesClient):
    def custom_import_workflow(self):
        # Usa componentes internos
        result = self.processing.build_contact_groups_from_excel("file.xlsx")
        return self.contacts.bulk_create(result.contact_groups)`})]})]})}function Vm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: Processing"}),e.jsx("p",{className:"doc-subtitle",children:"Núcleo de coordenação do sistema de importação Ploomes-Lemit, orquestrando múltiplas fontes de dados externas."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsxs("p",{children:["A classe ",e.jsx("code",{className:"code-block",children:"Processing"})," é o núcleo de coordenação do sistema de importação Ploomes-Lemit. Ela orquestra múltiplas fontes de dados externas (CNA, CNPJ, LEMIT) para construir grupos de contatos estruturados contendo informações de escritórios de advocacia e seus advogados."]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Características Principais"}),e.jsx("h3",{children:"Funcionalidades Core"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Processamento em Lote"}),": Processa arquivos Excel com listas de advogados"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Enriquecimento Automático"}),": Busca dados de escritórios, CNPJs e sócios automaticamente"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cache Inteligente"}),": Sistema multicamadas de cache para otimizar consultas"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Detecção de Duplicatas"}),": Remove advogados duplicados automaticamente"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Busca de Sócios"}),": Opcional - busca advogados sócios via LEMIT quando habilitado"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fallback Strategies"}),": Múltiplas estratégias de busca quando dados não são encontrados"]})]}),e.jsx("h3",{children:"Observabilidade"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Métricas de processamento em tempo real"}),e.jsx("li",{children:"Progress tracking com estimativa de tempo (ETA)"}),e.jsx("li",{children:"Rastreamento de cache hits/misses"}),e.jsx("li",{children:"Logging estruturado com correlation_id"}),e.jsx("li",{children:"Estatísticas detalhadas por batch"})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Arquitetura"}),e.jsx("h3",{children:"Clientes Integrados"}),e.jsx(a,{code:`┌─────────────────────────────────────────────┐
│           Processing Class                  │
├─────────────────────────────────────────────┤
│ • CNAClient      → Consultas OAB/CNA        │
│ • CNPJScraper    → Validação de CNPJs       │
│ • LemitClient    → Enriquecimento de dados  │
│ • ExcelProcessor → Leitura/Escrita Excel    │
└─────────────────────────────────────────────┘`}),e.jsx("h3",{children:"Fluxo de Processamento"}),e.jsx(a,{code:`1. Leitura do Excel
   ├─ Extração de colunas (Nome, OAB)
   └─ Remoção de duplicatas

2. Processamento por Advogado
   ├─ Consulta CNA (dados do advogado)
   ├─ Consulta Sociedade (escritório)
   ├─ Validação CNPJ
   └─ Busca Sócios (opcional)

3. Construção de Grupos
   ├─ Escritório (com CNPJ)
   ├─ Advogado Principal
   └─ Advogados Sócios (se habilitado)

4. Retorno Estruturado
   └─ ProcessingResult com métricas`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Inicialização"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:"def __init__(self, logger: logging.Logger, fetch_socios: bool = True) -> None:"}),e.jsx("p",{children:"Inicializa a classe Processing com configurações de logging e busca de sócios."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Logger para mensagens (obrigatório)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"fetch_socios"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"True"}),e.jsx("td",{children:"Habilita busca de sócios via LEMIT"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from src.ploomes_integration.processing import Processing
import logging

logger = logging.getLogger(__name__)

# Com busca de sócios habilitada
processor = Processing(logger=logger, fetch_socios=True)

# Sem busca de sócios (mais rápido)
processor = Processing(logger=logger, fetch_socios=False)`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Principais"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"build_contact_groups_from_excel",children:"build_contact_groups_from_excel"}),e.jsx(a,{code:"def build_contact_groups_from_excel(self, file_path: str) -> ProcessingResult:"}),e.jsx("p",{children:"Processa um arquivo Excel e constrói grupos de contatos estruturados."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"file_path"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho para o arquivo Excel de entrada"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ProcessingResult"})}),e.jsx("td",{children:"Resultado com grupos de contatos e métricas"})]})})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Processar arquivo Excel
result = processor.build_contact_groups_from_excel(
    file_path="input/advogados.xlsx"
)

# Verificar resultado
if result.success:
    print(f"✅ Processados: {result.processed_records}")
    print(f"❌ Falhas: {result.failed_records}")
    print(f"📊 Taxa de sucesso: {result.success_rate:.1%}")
    print(f"⏱️ Duração: {result.duration_seconds:.2f}s")
else:
    print("❌ Processamento falhou")
    for error in result.errors:
        print(f"  - {error}")`}),e.jsx("h4",{children:"Acessando Grupos de Contatos"}),e.jsx(a,{code:`# Grupos de contatos gerados
for grupo in result.contact_groups:
    escritorio = grupo["escritorio"]
    advogados = grupo["advogados"]

    print(f"Escritório: {escritorio['Nome']}")
    print(f"CNPJ: {escritorio['CNPJ']}")
    print(f"Advogados: {len(advogados)}")

    for adv in advogados:
        print(f"  - {adv['Nome']} (OAB: {adv['OAB']})")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_stats",children:"get_stats"}),e.jsx(a,{code:"def get_stats(self) -> Dict[str, Any]:"}),e.jsx("p",{children:"Retorna estatísticas detalhadas do processamento."}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"batch_count"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Número de batches processados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"cache_hits"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Consultas atendidas pelo cache"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"cache_misses"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Consultas que precisaram buscar dados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"cache_hit_rate"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"float"})}),e.jsx("td",{children:"Taxa de cache hit (0.0 a 1.0)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"cnpj_cache_size"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Tamanho atual do cache de CNPJs"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Obter estatísticas detalhadas
stats = processor.get_stats()

print(f"Batches processados: {stats['batch_count']}")
print(f"Cache hits: {stats['cache_hits']}")
print(f"Cache misses: {stats['cache_misses']}")
print(f"Taxa de cache hit: {stats['cache_hit_rate']:.1%}")
print(f"Tamanho cache CNPJ: {stats['cnpj_cache_size']}")`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Internos (Private Methods)"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_process_one_advogado",children:"_process_one_advogado"}),e.jsx(a,{code:"def _process_one_advogado(self, nome: str, oab: str) -> list[ConjuntoContatoDict]:"}),e.jsx("p",{children:"Processa um advogado completo: consulta CNA, obtém escritório e retorna conjunto(s) de contatos."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"nome"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do advogado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"oab"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:'OAB do advogado (formatada, ex: "SP123456")'})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"list[ConjuntoContatoDict]"}),": Lista com 1 conjunto contendo escritório e advogados (principal + sócios).",e.jsx("strong",{children:" SEMPRE"})," retorna uma lista (nunca"," ",e.jsx("code",{className:"code-block",children:"None"}),")."]}),e.jsx("h4",{children:"Fluxo de Processamento"}),e.jsx(a,{code:`1. Verifica Cache de Processamento
   └─ Existe? → Retorna resultado cacheado

2. Verifica Cache de Advogados (sócios)
   └─ Já foi processado como sócio?
      → Retorna conjunto com _skip_import=True

3. Consulta CNA com nome + OAB
   │
   ├─ Não encontrado?
   │  └─ Retenta consulta apenas com OAB + UF
   │     ├─ Encontrado → Atualiza nome
   │     └─ Não encontrado → Retorna _skip_import=True
   │
   └─ Encontrado → Continua

4. Chama _get_or_create_escritorio()
   └─ Obtém escritório + lista de sócios

5. Cria Advogado Principal
   └─ AdvogadoData(Empresa=..., Nome=..., OAB=...)

6. Filtra Sócios Duplicados
   └─ Remove sócio se nome == advogado principal

7. Monta Lista de Advogados
   └─ [advogado_principal] + socios_filtrados

8. Retorna Conjunto e adiciona ao Cache`}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Caso 1: Advogado com escritório e sócios
conjuntos = self._process_one_advogado("João Silva", "SP123456")
# conjuntos = [
#     {
#         "escritorio": {"Nome": "Silva Advogados", "CNPJ": "12345678000190", ...},
#         "advogados": [
#             {"Nome": "João Silva", "OAB": "SP123456", ...},      # Principal
#             {"Nome": "Maria Santos", "OAB": "SP789012", ...},    # Sócia
#         ]
#     }
# ]

# Caso 2: Advogado pessoa física (sem sócios)
conjuntos = self._process_one_advogado("José Souza", "RJ987654")
# conjuntos = [
#     {
#         "escritorio": {"Nome": "José Souza", "Pessoa_Física": "Sim", ...},
#         "advogados": [{"Nome": "José Souza", "OAB": "RJ987654", ...}]
#     }
# ]`}),e.jsx("h4",{children:"Edge Cases"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Cenário"}),e.jsx("th",{children:"Ação"}),e.jsx("th",{children:"Resultado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Advogado no cache de processamento"}),e.jsx("td",{children:"Retorna resultado cacheado"}),e.jsx("td",{children:"Cache hit (rápido)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Advogado no cache de sócios"}),e.jsx("td",{children:"Retorna com _skip_import=True"}),e.jsx("td",{children:"Evita duplicata"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Nome não encontrado no CNA"}),e.jsx("td",{children:"Retenta com apenas OAB+UF"}),e.jsx("td",{children:"Fallback ou skip"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Sócio com mesmo nome do principal"}),e.jsx("td",{children:"Remove da lista de sócios"}),e.jsx("td",{children:"Evita duplicata"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_get_or_create_escritorio",children:"_get_or_create_escritorio"}),e.jsx(a,{code:`def _get_or_create_escritorio(
    self, nome_adv: str, detail_url: str, uf: Optional[str]
) -> tuple[EscritorioData, list[AdvogadoData]]:`}),e.jsx("p",{children:"Obtém ou cria um escritório baseado na consulta CNA, incluindo advogados sócios."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"nome_adv"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do advogado (para consultar sociedade)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"detail_url"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"URL de detalhes da consulta CNA"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"uf"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[str]"})}),e.jsx("td",{children:"Unidade Federativa (para buscar sócios)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"tuple[EscritorioData, list[AdvogadoData]]"}),": Tupla com dados do escritório e lista de advogados sócios.",e.jsx("strong",{children:" SEMPRE"})," retorna um tuple. Se houver problemas, retorna escritório com"," ",e.jsx("code",{className:"code-block",children:"_skip_import=True"}),"."]}),e.jsx("h4",{children:"Fluxo de Processamento"}),e.jsx(a,{code:`1. Consulta Sociedade no CNA
   │
   ├─ Não encontrada → Pessoa Física
   │  └─ Consulta CPF via LEMIT
   │     └─ Retorna (EscritorioData com Pessoa_Física="Sim", [])
   │
   └─ Encontrada → Escritório
      ├─ Nome sociedade vazio?
      │  └─ Sim → Retorna (_skip_import=True, [])
      │
      ├─ Consulta CNPJ via CNPJScraper
      │  ├─ CNPJ não encontrado → Retorna (_skip_import=True, [])
      │  └─ CNPJ encontrado → Continua
      │
      ├─ Verifica Cache por CNPJ
      │  └─ Existe? (e fetch_socios=True)
      │     └─ Retorna (_skip_import=True, advogados_cached)
      │
      ├─ Cria EscritorioData
      │
      └─ Busca Sócios (se fetch_socios=True)
         ├─ Chama _buscar_advogados_socios()
         └─ Cacheia resultado por CNPJ`}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Caso 1: Escritório com CNPJ e sócios
escritorio, socios = self._get_or_create_escritorio(
    nome_adv="João Silva",
    detail_url="https://cna.oab.org.br/...",
    uf="SP"
)
# escritorio = {"Nome": "Silva Advogados", "CNPJ": "12345678000190", ...}
# socios = [{"Nome": "Maria Santos", "OAB": "SP789012", ...}, ...]

# Caso 2: Pessoa Física (sem sociedade)
escritorio, socios = self._get_or_create_escritorio(
    nome_adv="José Souza",
    detail_url="https://cna.oab.org.br/...",
    uf="RJ"
)
# escritorio = {"Nome": "José Souza", "Pessoa_Física": "Sim", "CPF": "12345678901", ...}
# socios = []`}),e.jsx("h4",{children:"Edge Cases"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Cenário"}),e.jsx("th",{children:"Ação"}),e.jsx("th",{children:"Resultado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Sociedade não encontrada"}),e.jsx("td",{children:"Consulta CPF via LEMIT"}),e.jsx("td",{children:"Pessoa Física com CPF"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Nome sociedade vazio"}),e.jsx("td",{children:"Marca para skip"}),e.jsx("td",{children:"_skip_import=True"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CNPJ não encontrado"}),e.jsx("td",{children:"Marca para skip"}),e.jsx("td",{children:"_skip_import=True"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Escritório já no cache"}),e.jsx("td",{children:"Retorna cache (se fetch_socios=True)"}),e.jsx("td",{children:"_skip_import=True"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Busca sócios desabilitada"}),e.jsx("td",{children:"Pula busca de sócios"}),e.jsx("td",{children:"Lista vazia"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_buscar_advogados_socios",children:"_buscar_advogados_socios"}),e.jsx(a,{code:`def _buscar_advogados_socios(
    self, cnpj: str, nome_escritorio: str, uf: str
) -> list[AdvogadoData]:`}),e.jsx("p",{children:"Busca advogados sócios de um escritório via API LEMIT usando o CNPJ."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"cnpj"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"CNPJ do escritório (apenas números)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"nome_escritorio"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do escritório (usado para logs)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"uf"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Unidade Federativa (usada para buscar OAB dos sócios)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"list[AdvogadoData]"}),": Lista de advogados sócios encontrados. Lista vazia se: CNPJ inválido, nenhum sócio encontrado, ou erro na consulta."]}),e.jsx("h4",{children:"Comportamento"}),e.jsxs("ol",{children:[e.jsx("li",{children:'Valida CNPJ (ignora se vazio ou "Não encontrado")'}),e.jsx("li",{children:"Consulta API LEMIT para obter lista de sócios"}),e.jsxs("li",{children:["Para cada sócio:",e.jsxs("ul",{children:[e.jsx("li",{children:"Extrai CPF e nome"}),e.jsxs("li",{children:["Busca OAB via"," ",e.jsx("code",{className:"code-block",children:"_buscar_oab_socio()"})]}),e.jsx("li",{children:"Cria AdvogadoData com empresa, nome, OAB e CPF"})]})]}),e.jsx("li",{children:"Aplica rate limiting entre consultas"}),e.jsx("li",{children:"Retorna lista de advogados ou lista vazia em caso de erro"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`socios = self._buscar_advogados_socios(
    cnpj="12345678000190",
    nome_escritorio="Silva & Associados",
    uf="SP"
)
# socios = [
#     {"Empresa": "Silva & Associados", "Nome": "João Silva", "OAB": "SP123456", "CPF": "12345678901"},
#     {"Empresa": "Silva & Associados", "Nome": "Maria Santos", "OAB": "SP789012", "CPF": "98765432109"}
# ]`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_buscar_oab_socio",children:"_buscar_oab_socio"}),e.jsx(a,{code:"def _buscar_oab_socio(self, nome: str, uf: str) -> str:"}),e.jsx("p",{children:"Busca o número da OAB de um sócio consultando a API CNA."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"nome"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome completo do sócio"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"uf"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Unidade Federativa para filtrar resultados"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"str"}),': OAB completa formatada (ex: "SP123456") ou string vazia se não encontrada.']}),e.jsx("h4",{children:"Comportamento"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Consulta CNA com nome e UF (sem número OAB)"}),e.jsxs("li",{children:["Filtra resultados para"," ",e.jsx("code",{className:"code-block",children:'TipoInscOab == "ADVOGADO"'})," ou"," ",e.jsx("code",{className:"code-block",children:'"ADVOGADA"'})]}),e.jsxs("li",{children:["Extrai ",e.jsx("code",{className:"code-block",children:"Inscricao"})," e"," ",e.jsx("code",{className:"code-block",children:"UF"})," do primeiro resultado válido"]}),e.jsxs("li",{children:["Formata como"," ",e.jsx("code",{className:"code-block",children:"{UF}{Inscricao}"}),' (ex: "SP123456")']}),e.jsx("li",{children:"Aplica rate limiting de 1 segundo"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`oab = self._buscar_oab_socio(nome="João Silva", uf="SP")
# oab = "SP123456"

oab = self._buscar_oab_socio(nome="Nome Inexistente", uf="RJ")
# oab = ""`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_clean_advogado",children:"_clean_advogado"}),e.jsx(a,{code:"def _clean_advogado(self, nome: str, oab: str) -> tuple[str, str]:"}),e.jsx("p",{children:"Normaliza e limpa os dados de entrada de um advogado para processamento consistente."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"nome"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Nome do advogado (pode conter espaços extras)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"oab"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"OAB do advogado (pode conter formatação inconsistente)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"tuple[str, str]"}),": Tupla com (nome_normalizado, oab_normalizada)."]}),e.jsx("h4",{children:"Transformações Aplicadas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Remove espaços em branco no início e fim"}),e.jsx("li",{children:"Normaliza múltiplos espaços para espaço único"}),e.jsx("li",{children:"Converte para maiúsculas (padronização)"}),e.jsx("li",{children:"Remove caracteres especiais da OAB"}),e.jsx("li",{children:'Formata OAB no padrão UF+Número (ex: "SP123456")'})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Entrada com formatação inconsistente
nome, oab = self._clean_advogado(
    nome="  joão   silva  ",
    oab="sp-123.456"
)
# nome = "JOÃO SILVA"
# oab = "SP123456"`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Tratamento de Edge Cases"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"edge_case_not_found",children:"Advogado Não Encontrado no CNA"}),e.jsx(a,{code:`# Cenário: Nome/OAB incorretos ou advogado não cadastrado
# Ação: Marca escritório com _skip_import=True
# Resultado: Registro ignorado na importação`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"edge_case_pessoa_fisica",children:"Pessoa Física (Sem Escritório)"}),e.jsx(a,{code:`# Cenário: Advogado sem sociedade registrada
# Ação: Consulta CPF via LEMIT
# Resultado: Escritório marcado como "Pessoa_Física"`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"edge_case_cnpj",children:"CNPJ Não Encontrado"}),e.jsx(a,{code:`# Cenário: Nome do escritório não retorna CNPJ válido
# Ação: Marca escritório com _skip_import=True
# Resultado: Registro ignorado (evita dados inválidos)`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"edge_case_cna_nome",children:"Consulta CNA por Nome Falha"}),e.jsx(a,{code:`# Cenário: Nome do advogado não encontrado
# Ação: Retenta consulta apenas com OAB + UF
# Resultado: Nome atualizado se encontrado`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"edge_case_socio_duplicado",children:"Sócio Duplicado"}),e.jsx(a,{code:`# Cenário: Sócio já está na lista principal de advogados
# Ação: Cache detecta e pula processamento
# Resultado: Evita duplicatas no resultado final`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Estruturas de Dados"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"EscritorioData",children:"EscritorioData"}),e.jsx(a,{code:`{
    "Nome": str,              # Nome do escritório
    "Pessoa_Física": str,     # "Sim" ou "Não"
    "Razão_social": str,      # Razão social oficial
    "CNPJ": str,              # CNPJ (apenas números)
    "CPF": str,               # CPF (pessoa física)
    "_skip_import": bool,     # Flag para pular importação
    "_skip_reason": str       # Motivo do skip (se aplicável)
}`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"AdvogadoData",children:"AdvogadoData"}),e.jsx(a,{code:`{
    "Empresa": str,  # Nome do escritório
    "Nome": str,     # Nome completo do advogado
    "OAB": str,      # OAB formatada (ex: "SP123456")
    "CPF": str       # CPF do advogado (se disponível)
}`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"ConjuntoContatoDict",children:"ConjuntoContatoDict"}),e.jsx(a,{code:`{
    "escritorio": EscritorioData,
    "advogados": list[AdvogadoData]  # Lista com 1+ advogados
}`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"ProcessingResult",children:"ProcessingResult"}),e.jsx("h4",{children:"Atributos"}),e.jsx(a,{code:`result.success: bool                           # Sucesso geral
result.total_records: int                      # Total de registros
result.processed_records: int                  # Processados com sucesso
result.failed_records: int                     # Falhas
result.errors: list[str]                       # Lista de erros
result.contact_groups: list[ConjuntoContatoDict]  # Grupos gerados
result.duration_seconds: float                 # Tempo total`}),e.jsx("h4",{children:"Propriedades Calculadas"}),e.jsx(a,{code:`result.success_rate: float        # Taxa de sucesso (0.0 a 1.0)
result.records_per_second: float  # Velocidade de processamento`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Performance"}),e.jsx("h3",{children:"Otimizações Implementadas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Cache Multicamadas"}),": Reduz consultas duplicadas em ~70%"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Batch Processing"}),": Processa em lotes para gerenciar memória"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Rate Limiting"}),": Human-like delays evitam bloqueios"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Lazy Loading"}),": Sócios são buscados apenas se"," ",e.jsx("code",{className:"code-block",children:"fetch_socios=True"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Sistema de Cache"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"cnpj_cache",children:"Cache por CNPJ (Escritórios)"}),e.jsx(a,{code:`# Evita consultas duplicadas para o mesmo escritório
# Key: CNPJ (string numérica)
# Value: (EscritorioData, list[AdvogadoData])`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Benefício:"})," Quando múltiplos advogados pertencem ao mesmo escritório, apenas uma consulta CNPJ é feita."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"processing_cache",children:"Cache de Processamento (Advogados)"}),e.jsx(a,{code:`# Evita reprocessar o mesmo advogado
# Key: "{nome_normalizado}|{oab_normalizada}"
# Value: list[ConjuntoContatoDict]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Benefício:"})," Advogados duplicados na planilha são processados uma única vez."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"advogado_cache",children:"Cache de Sócios"}),e.jsx(a,{code:`# Evita processar sócios que já apareceram na lista principal
# Key: (nome_normalizado, oab_normalizada)
# Value: True`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Benefício:"})," Sócios que já estão na planilha não são duplicados."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"clear_cache",children:"Limpeza de Cache"}),e.jsx(a,{code:`# Limpar caches manualmente entre batches
processor.cnpj_cache.clear()
processor.processing_cache.clear()
processor.advogado_cache.clear()`}),e.jsx("p",{children:"Útil para processamentos muito grandes onde o cache pode consumir muita memória."})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Troubleshooting"}),e.jsxs("p",{children:["Ajustar ",e.jsx("code",{className:"code-block",children:"SLEEP_TIME"})," em"," ",e.jsx("code",{className:"code-block",children:"config.py"}),":"]}),e.jsx(a,{code:"SLEEP_TIME = 20.0  # Aumentar para 20 segundos"}),e.jsx("h3",{children:"Problema: Muitos registros com _skip_import"}),e.jsx("p",{children:e.jsx("strong",{children:"Causas comuns:"})}),e.jsxs("ul",{children:[e.jsx("li",{children:"Nomes/OABs incorretos na planilha"}),e.jsx("li",{children:"Advogados não cadastrados no CNA"}),e.jsx("li",{children:"CNPJs não encontrados"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Solução:"})," Verificar logs detalhados para identificar padrão:"]}),e.jsx(a,{code:`for error in result.errors:
    if "_skip_reason" in error:
        print(error)`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos Avançados"}),e.jsx("h3",{children:"Processar com Filtros"}),e.jsx(a,{code:`# Pré-filtrar Excel antes de processar
df = pd.read_excel("input/advogados.xlsx")
df_filtered = df[df['OAB'].str.startswith('SP')]  # Apenas OAB de SP
df_filtered.to_excel("input/advogados_sp.xlsx", index=False)

result = processor.build_contact_groups_from_excel("input/advogados_sp.xlsx")`}),e.jsx("h3",{children:"Exportar Estatísticas"}),e.jsx(a,{code:`import json

result = processor.build_contact_groups_from_excel("input/advogados.xlsx")
stats = processor.get_stats()

# Salvar estatísticas
with open("output/stats.json", "w") as f:
    json.dump(stats, f, indent=2)

# Salvar resultado
with open("output/result.json", "w") as f:
    json.dump({
        "success": result.success,
        "processed": result.processed_records,
        "failed": result.failed_records,
        "duration": result.duration_seconds
    }, f, indent=2)`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Configuração"}),e.jsx("h3",{children:"Variáveis de Ambiente (config.py)"}),e.jsx(a,{code:`CNA_BASE_URL: str       # URL base da API CNA
TIMEOUT: int            # Timeout para requisições HTTP
SLEEP_TIME: float       # Delay entre requisições`})]})]})}function Jm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: ResultExporter"}),e.jsx("p",{className:"doc-subtitle",children:"Exporta resultados de processamento para arquivos Excel com múltiplas abas e métricas detalhadas."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Visão Geral"}),e.jsxs("p",{children:["O módulo ",e.jsx("code",{className:"code-block",children:"ResultExporter"})," é responsável por exportar resultados de processamento para arquivos Excel com múltiplas abas e métricas detalhadas. Ele consolida informações de escritórios, advogados, reclamantes e LEMIT em um relatório completo."]}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Responsabilidade"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Exportação Excel"}),e.jsx("td",{children:"Gera arquivos .xlsx com múltiplas abas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Métricas Agregadas"}),e.jsx("td",{children:"Calcula estatísticas de processamento"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Normalização"}),e.jsx("td",{children:"Integra log de normalização de escritórios"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Validação"}),e.jsx("td",{children:"Valida dados de entrada antes da exportação"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Logging"}),e.jsx("td",{children:"Registra resumo de operações"})]})]})]}),e.jsx("h3",{children:"Dependências"}),e.jsx(a,{code:`import logging
import os
from datetime import datetime
from typing import Any, Dict, List

import pandas as pd

from ...exceptions import FileProcessingError, ValidationError
from .escritorio_normalizer import EscritorioNormalizer
from .tabular_io import TabularIO`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Constantes de Classe"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"OPERATION_MAP_PT"}),e.jsx(a,{code:`OPERATION_MAP_PT = {
    "created": "Criado",
    "updated": "Atualizado",
    "mixed": "Misto (Criado/Atualizado)",
    "failed": "Falha",
    "skipped": "Pulado",
    "unknown": "Desconhecido",
}`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Mapeamento de operações em inglês para português para o relatório."]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"RESULT_HEADERS"}),e.jsx(a,{code:`RESULT_HEADERS = [
    "Escritório",
    "Pessoa Física",
    "CNPJ",
    "CPF",
    "Advogado",
    "OAB",
    "É Sócio",
    "Sócios",
    "Operação",
    "Status",
    "Possui Deal B2B",
    "Motivo do Skip",
]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"}),' Headers da aba "Escritório e Advogado".']}),e.jsxs("p",{children:[e.jsx("strong",{children:"Total:"})," 12 campos"]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Públicos"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:`def __init__(
    self,
    logger: logging.Logger = None,
    normalizer: EscritorioNormalizer = None,
):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Inicializa o exportador de resultados."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger (usa __name__ se None)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"normalizer"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"EscritorioNormalizer"})}),e.jsx("td",{children:"Normalizador de escritórios (opcional)"})]})]})]}),e.jsx("h4",{children:"Atributos Inicializados"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"self.logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger configurado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self._normalizer"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"EscritorioNormalizer"})}),e.jsx("td",{children:"Normalizador (pode ser None)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self._tabular_io"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"TabularIO"})}),e.jsx("td",{children:"Helper para I/O de arquivos"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"export_results_to_excel",children:"export_results_to_excel"}),e.jsx(a,{code:`def export_results_to_excel(
    self,
    results: List[Dict[str, Any]],
    output_path: str = None,
    workflow_type: str = "advogado_escritorio",
    lemit_stats: Dict[str, Any] = None,
) -> str`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Exporta resultados para arquivo Excel com múltiplas abas."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"results"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[Dict]"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Lista de resultados do processamento"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"output_path"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"None"}),e.jsx("td",{children:"Caminho de saída (gera automático se None)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"workflow_type"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:'"advogado_escritorio"'}),e.jsx("td",{children:"Tipo de workflow"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"lemit_stats"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict"})}),e.jsx("td",{children:"None"}),e.jsx("td",{children:"Estatísticas LEMIT"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho do arquivo Excel gerado"})]})})]}),e.jsx("h4",{children:"Exceções"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"ValidationError"})," - Se resultados inválidos"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"FileProcessingError"})," - Se erro na exportação"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"PermissionError"})," - Se sem permissão para escrever"]})]}),e.jsx("h4",{children:"Workflow"}),e.jsx(a,{code:`1. _validate_results() → Valida entrada
2. _prepare_output_path() → Prepara caminho
3. _process_results() → Processa dados
4. Calcular métricas (total, sucessos, falhas)
5. _build_reclamantes_data() → Dados da aba 2
6. _write_excel() → Escreve arquivo
7. _log_summary() → Loga resumo`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Privados"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_validate_results",children:"_validate_results"}),e.jsx(a,{code:`def _validate_results(
    self,
    results: List[Dict[str, Any]],
    lemit_stats: Dict[str, Any]
) -> None`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Valida os resultados de entrada."]}),e.jsx("h4",{children:"Validações"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"results"})," deve ser lista"]}),e.jsxs("li",{children:["Se ",e.jsx("code",{className:"code-block",children:"results"})," vazio,"," ",e.jsx("code",{className:"code-block",children:"lemit_stats"})," deve existir"]})]}),e.jsx("h4",{children:"Exceções"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"ValidationError"})," se validação falhar"]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_prepare_output_path",children:"_prepare_output_path"}),e.jsx(a,{code:"def _prepare_output_path(self, output_path: str) -> str"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Prepara e valida o caminho de saída."]}),e.jsx("h4",{children:"Operações"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Se output_path é None: gera nome com timestamp"}),e.jsx("li",{children:"Cria diretórios se não existirem"}),e.jsx("li",{children:"Garante extensão .xlsx"}),e.jsx("li",{children:"Adiciona timestamp ao nome"})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"str"})," - Caminho completo com timestamp"]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Input: None
# Output: "output/reports/processamento_ploomes_20260128_143522.xlsx"

# Input: "relatorio.csv"
# Output: "relatorio_20260128_143522.xlsx"`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_process_results",children:"_process_results"}),e.jsx(a,{code:`def _process_results(
    self,
    results: List[Dict[str, Any]]
) -> tuple[List[Dict[str, Any]], List[Dict[str, Any]]]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Processa resultados e retorna dados e log de normalização."]}),e.jsx("h4",{children:"Retorno"}),e.jsx("p",{children:e.jsx("code",{className:"code-block",children:"tuple[List[Dict], List[Dict]]"})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"rows_data"})," - Dados formatados para Excel"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"normalization_log"})," - Log de normalizações"]})]}),e.jsx("h4",{children:"Comportamento"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Para cada resultado: chama _process_single_result()"}),e.jsx("li",{children:"Se erro: adiciona linha de erro via _create_error_row()"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_process_single_result",children:"_process_single_result"}),e.jsx(a,{code:`def _process_single_result(
    self,
    result: Dict[str, Any]
) -> tuple[Dict[str, Any], Dict[str, Any] | None]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Processa um único resultado."]}),e.jsx("h4",{children:"Retorno"}),e.jsx("p",{children:e.jsx("code",{className:"code-block",children:"tuple[Dict, Dict | None]"})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"row"})," - Dicionário com 12 campos (RESULT_HEADERS)"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"norm_entry"})," - Entrada de log de normalização (ou None)"]})]}),e.jsx("h4",{children:"Processamento"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Extrair escritorio_original e advogado_original"}),e.jsx("li",{children:"Normalizar nome do escritório via _normalize_name()"}),e.jsx("li",{children:"Criar entrada de log se normalização aplicada"}),e.jsx("li",{children:"Coletar motivos de skip via _collect_skip_reasons()"}),e.jsx("li",{children:'Formatar lista de sócios (separado por ";")'}),e.jsx("li",{children:"Construir dicionário row com todos os campos"}),e.jsx("li",{children:"Traduzir operação via OPERATION_MAP_PT"})]}),e.jsx("h4",{children:"Campos Gerados"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campo"}),e.jsx("th",{children:"Fonte"}),e.jsx("th",{children:"Transformação"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Escritório"}),e.jsx("td",{children:"esc.Nome"}),e.jsx("td",{children:"Normalizado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Pessoa Física"}),e.jsx("td",{children:"esc.Pessoa_Física"}),e.jsx("td",{children:"Direto"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CNPJ"}),e.jsx("td",{children:"esc.CNPJ"}),e.jsx("td",{children:"Se PJ"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CPF"}),e.jsx("td",{children:"esc.CPF"}),e.jsx("td",{children:"Se PF"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Advogado"}),e.jsx("td",{children:"adv.Nome"}),e.jsx("td",{children:"Direto"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"OAB"}),e.jsx("td",{children:"adv.OAB"}),e.jsx("td",{children:"Direto"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"É Sócio"}),e.jsx("td",{children:"result.is_socio"}),e.jsx("td",{children:'"Sim"/"Não"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Sócios"}),e.jsx("td",{children:"result.socios"}),e.jsx("td",{children:'Join com ";"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Operação"}),e.jsx("td",{children:"result.operation"}),e.jsx("td",{children:"Traduzido PT"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Status"}),e.jsx("td",{children:"result.success"}),e.jsx("td",{children:'"Sucesso"/"Falha"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Possui Deal B2B"}),e.jsx("td",{children:"result.has_b2b_deal"}),e.jsx("td",{children:'"Sim"/"Não"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Motivo do Skip"}),e.jsx("td",{children:"Múltiplas fontes"}),e.jsx("td",{children:"Concatenado"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_normalize_name",children:"_normalize_name"}),e.jsx(a,{code:"def _normalize_name(self, name: str) -> tuple[str, str, float]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Normaliza nome usando o normalizer se disponível."]}),e.jsx("h4",{children:"Retorno"}),e.jsx("p",{children:e.jsx("code",{className:"code-block",children:"tuple[str, str, float]"})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"normalized_name"})," - Nome normalizado"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"status"})," - Status da normalização"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"score"})," - Score de similaridade (0.0-1.0)"]})]}),e.jsx("h4",{children:"Status Possíveis"}),e.jsxs("ul",{children:[e.jsx("li",{children:'"normalized" - Match exato'}),e.jsx("li",{children:'"fuzzy_matched" - Match por similaridade'}),e.jsx("li",{children:'"not_found" - Não encontrado'}),e.jsx("li",{children:'"disabled" - Normalizer desabilitado'})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_collect_skip_reasons",children:"_collect_skip_reasons"}),e.jsx(a,{code:"def _collect_skip_reasons(self, result: Dict[str, Any]) -> str"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Coleta motivos de skip de um resultado."]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"str"}),' - Motivos concatenados por " | " ou string vazia']}),e.jsx("h4",{children:"Fontes"}),e.jsxs("ol",{children:[e.jsx("li",{children:'result.errors se operation == "skipped"'}),e.jsx("li",{children:"escritorio._skip_reason se _was_skipped"}),e.jsx("li",{children:"advogado._skip_reason se _was_skipped"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:'"Escritório: Já possui Deal B2B | Advogado: Não encontrado no CNA"'})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_create_error_row",children:"_create_error_row"}),e.jsx(a,{code:"def _create_error_row(self) -> Dict[str, Any]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Cria linha de erro padrão."]}),e.jsx("h4",{children:"Retorno"}),e.jsx("p",{children:"Dicionário com todos os campos preenchidos com valores de erro:"}),e.jsxs("ul",{children:[e.jsx("li",{children:'Textos: "ERRO AO PROCESSAR", "N/A"'}),e.jsx("li",{children:'Status: "Erro"'}),e.jsx("li",{children:'Motivo: "Erro ao processar linha"'})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_count_operations",children:"_count_operations"}),e.jsx(a,{code:"def _count_operations(self, results: List[Dict[str, Any]]) -> Dict[str, int]"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Conta operações por tipo."]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Dict[str, int]"})," - Contagem de cada operação"]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`{
    "created": 10,
    "updated": 5,
    "skipped": 3,
    "failed": 2,
}`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_build_reclamantes_data",children:"_build_reclamantes_data"}),e.jsx(a,{code:`def _build_reclamantes_data(
    self,
    workflow_type: str,
    total: int,
    success_count: int,
    failed_count: int,
    operations_count: Dict[str, int],
    lemit_stats: Dict[str, Any],
) -> List[Dict[str, Any]]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"}),' Constrói dados da aba "Reclamantes".']}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"List[Dict[str, Any]]"})," - Lista de dicionários ",'{"Métrica": str, "Valor": Any}']}),e.jsx("h4",{children:"Seções"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Header:"})," Timestamp e tipo de workflow"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Reclamantes:"})," Estatísticas LEMIT (se disponível)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ploomes:"})," Estatísticas escritório/advogado (se total > 0)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Breakdown:"})," Operações por tipo"]})]}),e.jsx("h4",{children:"Estrutura"}),e.jsx(a,{code:`Timestamp: 2026-01-28 14:35:22
Tipo de Workflow: combined

--- PROCESSAMENTO DE RECLAMANTES ---
Total de Reclamantes: 150
Sucessos: 142
Falhas: 8
Taxa de Sucesso (%): 94.7

--- IMPORTAÇÃO PLOOMES (ESCRITÓRIO/ADVOGADO) ---
Total de Registros: 20
Sucessos: 18
Falhas: 2
Taxa de Sucesso (%): 90.0

--- BREAKDOWN POR OPERAÇÃO ---
  Criado: 10
  Atualizado: 8
  Falha: 2`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_write_excel",children:"_write_excel"}),e.jsx(a,{code:`def _write_excel(
    self,
    output_path: str,
    df_importacao: pd.DataFrame,
    df_reclamantes: pd.DataFrame,
    normalization_log: List[Dict[str, Any]],
    total: int,
) -> None`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Escreve o arquivo Excel com múltiplas abas."]}),e.jsx("h4",{children:"Abas Criadas"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Nome"}),e.jsx("th",{children:"Condição"}),e.jsx("th",{children:"Conteúdo"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"1"}),e.jsx("td",{children:'"Escritório e Advogado"'}),e.jsx("td",{children:"Sempre"}),e.jsx("td",{children:"Dados de importação ou mensagem"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"2"}),e.jsx("td",{children:'"Reclamantes"'}),e.jsx("td",{children:"Sempre"}),e.jsx("td",{children:"Estatísticas LEMIT e Ploomes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"3"}),e.jsx("td",{children:'"Log de Normalização"'}),e.jsx("td",{children:"Se normalizer ativo e log não vazio"}),e.jsx("td",{children:"Log de normalizações"})]})]})]}),e.jsx("h4",{children:"Comportamento Especial"}),e.jsxs("ul",{children:[e.jsx("li",{children:'Se total == 0: Aba 1 mostra mensagem "Este workflow não processa escritórios/advogados"'}),e.jsx("li",{children:"Se normalização ativa mas log vazio: loga informação"})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_log_summary",children:"_log_summary"}),e.jsx(a,{code:`def _log_summary(
    self,
    output_path: str,
    total: int,
    success_count: int,
    lemit_stats: Dict[str, Any],
) -> None`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Loga resumo da exportação."]}),e.jsx("h4",{children:"Log Gerado"}),e.jsx(a,{code:`✅ Arquivo Excel gerado: output/reports/importacao_relatorio_20260128_143522.xlsx
📊 Escritório e Advogado: 18/20 sucessos
📊 Reclamantes: 142/150 sucessos`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Estrutura de Dados"}),e.jsx("h3",{children:"Estrutura de results (Input)"}),e.jsx(a,{code:`results = [
    {
        "success": bool,
        "operation": str,  # "created", "updated", "skipped", "failed"
        "has_b2b_deal": bool,
        "is_socio": bool,
        "socios": List[str],
        "errors": List[str],
        "escritorio_original": {
            "Nome": str,
            "CNPJ": str,
            "CPF": str,
            "Pessoa_Física": str,  # "Sim", "Não", "N/A"
        },
        "advogado_original": {
            "Nome": str,
            "OAB": str,
        },
        "escritorio": {
            "_was_skipped": bool,
            "_skip_reason": str,
        },
        "advogado": {
            "_was_skipped": bool,
            "_skip_reason": str,
        },
    },
]`}),e.jsx("h3",{children:"Estrutura de lemit_stats (Input)"}),e.jsx(a,{code:`lemit_stats = {
    "total": int,
    "sucesso": int,
    "falha": int,
}`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Estrutura do Excel Gerado"}),e.jsx("h3",{children:'Aba 1: "Escritório e Advogado"'}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Coluna"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Exemplo"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Escritório"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"SILVA & ASSOCIADOS"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Pessoa Física"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Não"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CNPJ"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"12.345.678/0001-90"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CPF"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'""'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Advogado"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Dr. João Silva"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"OAB"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"SP123456"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"É Sócio"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Sim"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Sócios"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Dr. João Silva; Dra. Maria Santos"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Operação"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Criado"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Status"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Sucesso"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Possui Deal B2B"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Sim"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Motivo do Skip"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'""'})]})]})]}),e.jsx("h3",{children:'Aba 2: "Reclamantes"'}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Coluna"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Métrica"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:"Nome da métrica"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Valor"}),e.jsx("td",{children:"str/int"}),e.jsx("td",{children:"Valor da métrica"})]})]})]}),e.jsx("h3",{children:'Aba 3: "Log de Normalização"'}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Coluna"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Exemplo"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Nome Original"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Silva e Associados Advogados Ltda."'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Nome Normalizado"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"SILVA & ASSOCIADOS"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Score Similaridade"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"95.50%"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Status"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Fuzzy Match (Levenshtein)"'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Advogado"}),e.jsx("td",{children:"str"}),e.jsx("td",{children:'"Dr. João Silva"'})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Básico (Apenas Ploomes)"}),e.jsx(a,{code:`from src.ploomes_integration.clients.processors import ResultExporter

exporter = ResultExporter(logger=logger)

results = [
    {
        "success": True,
        "operation": "created",
        "has_b2b_deal": False,
        "is_socio": False,
        "socios": [],
        "escritorio_original": {
            "Nome": "Silva Advogados",
            "CNPJ": "12.345.678/0001-90",
            "Pessoa_Física": "Não",
        },
        "advogado_original": {
            "Nome": "Dr. João Silva",
            "OAB": "SP123456",
        },
    },
]

output = exporter.export_results_to_excel(
    results=results,
    workflow_type="ploomes-only",
)`}),e.jsx("h3",{children:"Com LEMIT Stats"}),e.jsx(a,{code:`lemit_stats = {
    "total": 150,
    "sucesso": 142,
    "falha": 8,
}

output = exporter.export_results_to_excel(
    results=results,
    workflow_type="combined",
    lemit_stats=lemit_stats,
)`}),e.jsx("h3",{children:"Com Normalização"}),e.jsx(a,{code:`from src.ploomes_integration.clients.processors import (
    ResultExporter,
    EscritorioNormalizer,
)

normalizer = EscritorioNormalizer()
normalizer.load_normalization_map("config/escritorios.json")

exporter = ResultExporter(logger=logger, normalizer=normalizer)

output = exporter.export_results_to_excel(
    results=results,
    output_path="output/reports/custom_report.xlsx",
)`}),e.jsx("h3",{children:"Tratamento de Erros"}),e.jsx(a,{code:`from ...exceptions import ValidationError, FileProcessingError

exporter = ResultExporter(logger=logger)

try:
    output = exporter.export_results_to_excel(
        results=results,
        workflow_type="combined",
        lemit_stats=lemit_stats,
    )
    print(f"✅ Relatório: {output}")
except ValidationError as e:
    logger.error(f"❌ Dados inválidos: {e}")
except FileProcessingError as e:
    logger.error(f"❌ Erro ao gerar Excel: {e}")
except PermissionError:
    logger.error("❌ Sem permissão para escrever arquivo")`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Integração com Outros Componentes"}),e.jsx("h3",{children:"Com ExcelProcessor"}),e.jsx(a,{code:`# No ExcelProcessor
from .processors import ResultExporter

class ExcelProcessor:
    def __init__(self, ...):
        self._result_exporter = ResultExporter(
            logger=self.logger,
            normalizer=self._normalizer,
        )

    def export_results_to_excel(self, results, output_path, workflow_type, lemit_stats):
        return self._result_exporter.export_results_to_excel(
            results=results,
            output_path=output_path,
            workflow_type=workflow_type,
            lemit_stats=lemit_stats,
        )`}),e.jsx("h3",{children:"Com EscritorioNormalizer"}),e.jsx(a,{code:`normalizer = EscritorioNormalizer()
normalizer.load_normalization_map("config/escritorios.json")

exporter = ResultExporter(logger=logger, normalizer=normalizer)
# Normalização aplicada automaticamente + log na 3ª aba`}),e.jsx("h3",{children:"Com TabularIO"}),e.jsx(a,{code:`# TabularIO usado internamente para:
# - Adicionar timestamp aos nomes de arquivo
# - Criar diretórios automaticamente
# - Garantir extensões corretas`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Melhores Práticas"}),e.jsx("h3",{children:"1. Sempre Passe lemit_stats em Workflows Combinados"}),e.jsx(a,{code:`# ✅ BOM
output = exporter.export_results_to_excel(
    results=results,
    lemit_stats=lemit_stats,
    workflow_type="combined",
)

# ❌ EVITE
output = exporter.export_results_to_excel(
    results=results,
    workflow_type="combined",
)`}),e.jsx("h3",{children:"2. Use Normalizer para Consistência"}),e.jsx(a,{code:`# ✅ BOM
normalizer = EscritorioNormalizer()
exporter = ResultExporter(logger=logger, normalizer=normalizer)

# ❌ EVITE (nomes inconsistentes)
exporter = ResultExporter(logger=logger)`}),e.jsx("h3",{children:"3. Especifique workflow_type Corretamente"}),e.jsx(a,{code:`workflow_types = [
    "lemit-cpf",
    "lemit-nome",
    "ploomes-only",
    "advogados",
    "escritorio-only",
    "cpf",
    "nome",
    "combined",
    "advogado_escritorio",  # legacy
]`})]})]})}function Hm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Classe: RowBuilder"}),e.jsx("p",{className:"doc-subtitle",children:"Construção de linhas de saída para planilhas no formato padronizado do Ploomes CRM."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Visão Geral"}),e.jsxs("p",{children:["A classe ",e.jsx("code",{className:"code-block",children:"RowBuilder"})," é responsável por construir linhas de saída para planilhas no formato padronizado do Ploomes CRM. Ela combina dados de múltiplas fontes (LEMIT, Ploomes, entrada do usuário) e gera linhas formatadas prontas para exportação."]}),e.jsx("h3",{children:"Responsabilidades"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Responsabilidade"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Formatação"}),e.jsx("td",{children:"Padroniza formato de saída para Ploomes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Headers Dinâmicos"}),e.jsx("td",{children:"Gera headers baseado no número de marcadores"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Normalização"}),e.jsx("td",{children:"Normaliza nomes de escritórios e CPFs"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Agregação de Tags"}),e.jsx("td",{children:"Combina marcadores de múltiplas fontes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Validação"}),e.jsx("td",{children:"Formata CPFs de forma segura"})]})]})]}),e.jsx("h3",{children:"Dependências"}),e.jsx(a,{code:`import logging
from typing import Any, Dict, List, Optional

from src.utils.validator import CPFValidator
from .escritorio_normalizer import EscritorioNormalizer`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Constantes de Classe"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"OUTPUT_HEADERS_BASE"}),e.jsx(a,{code:`OUTPUT_HEADERS_BASE = [
    "(Negócio) Estágio",
    "(Negócio) Título",
    "(Negócio) Responsável",
    "(Negócio) Origem",
    "(Negócio) Produto",
    "(Negócio) CNJ",
    "(Negócio) Resumo",
    "(Negócio) Escritório",
    "(Negócio) Usuários Colaboradores",
    "(Cliente) Tipo",
    "(Cliente) Responsável",
]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Headers base relacionados aos dados de"," ",e.jsx("strong",{children:"Negócio"})," e parte inicial dos dados de"," ",e.jsx("strong",{children:"Cliente"}),"."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Total de Campos:"})," 11 campos"]}),e.jsx("h4",{children:"Categorias"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Negócio (9 campos):"})," Informações do deal/processo"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cliente (2 campos):"})," Tipo e responsável"]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"OUTPUT_HEADERS_FINAL"}),e.jsx(a,{code:`OUTPUT_HEADERS_FINAL = [
    "(Cliente) Nome",
    "(Cliente) CPF",
    "(Cliente) Advogado Principal",
    "(Cliente) Telefones1",
    "(Cliente) Telefones2",
    "(Cliente) Telefones3",
    "(Cliente) Telefones4",
    "(Cliente) E-mail",
    "(Cliente) E-mail2",
    "(Cliente) E-mail3",
]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Headers finais relacionados aos dados do"," ",e.jsx("strong",{children:"Cliente"})," (contatos)."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Total de Campos:"})," 10 campos"]}),e.jsx("h4",{children:"Categorias"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Identificação (3 campos):"})," Nome, CPF, Advogado"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Telefones (4 campos):"})," Até 4 telefones"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"E-mails (3 campos):"})," Até 3 e-mails"]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"Estrutura Completa de Headers"}),e.jsx(a,{code:`┌──────────────────────────────────────────────────────────────┐
│               ESTRUTURA DE HEADERS DE SAÍDA                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  OUTPUT_HEADERS_BASE (11 campos)                             │
│       │                                                      │
│       ├─► Negócio: Estágio, Título, Responsável, Origem,    │
│       │           Produto, CNJ, Resumo, Escritório,         │
│       │           Usuários Colaboradores                    │
│       │                                                      │
│       └─► Cliente: Tipo, Responsável                         │
│       │                                                      │
│       ▼                                                      │
│  MARCADORES (N campos dinâmicos)                             │
│       ├─► Marcadores (campo 1)                               │
│       ├─► Marcadores2 (campo 2)                              │
│       ├─► Marcadores3 (campo 3)                              │
│       └─► ... (até N marcadores)                             │
│       │                                                      │
│       ▼                                                      │
│  OUTPUT_HEADERS_FINAL (10 campos)                            │
│       └─► Cliente: Nome, CPF, Advogado Principal,            │
│                   Telefones1-4, E-mail1-3                    │
│                                                              │
│  TOTAL: 21 + N campos                                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Públicos"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:`def __init__(
    self,
    logger: logging.Logger = None,
    normalizer: EscritorioNormalizer = None,
):`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Inicializa o construtor de linhas."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"None"}),e.jsx("td",{children:"Logger para mensagens (usa __name__ se None)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"normalizer"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"EscritorioNormalizer"})}),e.jsx("td",{children:"None"}),e.jsx("td",{children:"Normalizador de nomes de escritórios"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from src.ploomes_integration.clients.processors import RowBuilder, EscritorioNormalizer

# Sem normalizador
builder = RowBuilder(logger=my_logger)

# Com normalizador
normalizer = EscritorioNormalizer()
builder = RowBuilder(logger=my_logger, normalizer=normalizer)`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_output_headers",children:"get_output_headers"}),e.jsx(a,{code:"def get_output_headers(self, num_marcadores: int = 1) -> List[str]:"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Gera lista de headers dinâmica baseado no número de marcadores."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"num_marcadores"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"1"}),e.jsx("td",{children:"Número total de campos de marcadores necessários"})]})})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"List[str]"})," - Lista de headers com campos de marcadores expandidos."]}),e.jsx("h4",{children:"Lógica"}),e.jsxs("ol",{children:[e.jsx("li",{children:'Se num_marcadores >= 1: adiciona campo "Marcadores"'}),e.jsx("li",{children:'Para cada marcador adicional (2 até N): adiciona "Marcadores{i}"'}),e.jsx("li",{children:"Retorna: OUTPUT_HEADERS_BASE + marcadores_headers + OUTPUT_HEADERS_FINAL"})]}),e.jsx("h4",{children:"Estrutura de Saída"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"num_marcadores"}),e.jsx("th",{children:"Campos de Marcadores"}),e.jsx("th",{children:"Total de Campos"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"0"}),e.jsx("td",{children:"Nenhum"}),e.jsx("td",{children:"21"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"1"}),e.jsx("td",{children:"Marcadores"}),e.jsx("td",{children:"22"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"2"}),e.jsx("td",{children:"Marcadores, Marcadores2"}),e.jsx("td",{children:"23"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"3"}),e.jsx("td",{children:"Marcadores, Marcadores2, Marcadores3"}),e.jsx("td",{children:"24"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"N"}),e.jsx("td",{children:"Marcadores, Marcadores2, ..., Marcadores{N}"}),e.jsx("td",{children:"21 + N"})]})]})]}),e.jsx("h4",{children:"Exemplos"}),e.jsx(a,{code:`builder = RowBuilder()

# 1 marcador (padrão)
headers = builder.get_output_headers(1)
# [...OUTPUT_HEADERS_BASE, "Marcadores", ...OUTPUT_HEADERS_FINAL]
# Total: 22 campos

# 3 marcadores
headers = builder.get_output_headers(3)
# [...OUTPUT_HEADERS_BASE, "Marcadores", "Marcadores2", "Marcadores3", ...OUTPUT_HEADERS_FINAL]
# Total: 24 campos`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"build_linha",children:"build_linha"}),e.jsx(a,{code:`def build_linha(
    self,
    ctx: Dict[str, Any],
    output_preset: Dict[str, Any],
    cpf: str,
    telefones: List[str],
    emails: List[str],
    tags: List[str] = None,
    headers: List[str] = None,
    row_marcadores: List[str] = None,
) -> Dict[str, Any]:`}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Cria a linha padrão seguindo OUTPUT_HEADERS e preenchendo faltas com strings vazias."]}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"ctx"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict[str, Any]"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Contexto da linha com dados extraídos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"output_preset"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict[str, Any]"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Preset de saída com valores padrão"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"cpf"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"CPF formatado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"telefones"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Lista de telefones (até 4)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"emails"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Lista de emails (até 3)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tags"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"None"}),e.jsx("td",{children:"Tags da CLI a serem adicionadas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"headers"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"None"}),e.jsx("td",{children:"Headers de saída (calcula automaticamente se None)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"row_marcadores"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"None"}),e.jsx("td",{children:"Marcadores específicos da linha (da planilha)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("p",{children:[e.jsx("code",{className:"code-block",children:"Dict[str, Any]"})," - Dicionário com a linha formatada pronta para exportação."]}),e.jsx("h4",{children:"Estrutura do Parâmetro ctx"}),e.jsx(a,{code:`ctx = {
    "escritorio": str,      # Nome do escritório
    "estágio": str,         # Estágio do negócio
    "negociador": str,      # Responsável/negociador
    "origem": str,          # Origem do lead
    "produto": str,         # Produto/serviço
    "cnj": str,             # Número CNJ
    "nome": str,            # Nome do cliente
    "advogado": str,        # Advogado principal
}`}),e.jsx("h4",{children:"Fluxo de Execução"}),e.jsx(a,{code:`┌──────────────────────────────────────────────────────────────┐
│                    BUILD_LINHA WORKFLOW                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Agregação de Tags                                        │
│       ├── Adicionar row_marcadores (da planilha)             │
│       ├── Adicionar preset marcadores                        │
│       └── Adicionar tags da CLI                              │
│       │                                                      │
│       ▼                                                      │
│  2. Calcular Headers                                         │
│       └── Se headers=None: get_output_headers(len(all_tags)) │
│       │                                                      │
│       ▼                                                      │
│  3. Criar Linha Base                                         │
│       └── {header: "" for header in headers}                 │
│       │                                                      │
│       ▼                                                      │
│  4. Normalizar Escritório                                    │
│       └── _normalize_escritorio(ctx["escritorio"])           │
│       │                                                      │
│       ▼                                                      │
│  5. Preencher Campos de Negócio                              │
│       ├── Estágio (from preset ou ctx)                       │
│       ├── Título (from preset ou escritorio_normalizado)     │
│       ├── Responsável, Origem, Produto, CNJ                  │
│       └── Escritório (normalizado)                           │
│       │                                                      │
│       ▼                                                      │
│  6. Preencher Campos de Cliente                              │
│       ├── Tipo = "Pessoa"                                    │
│       └── Responsável                                        │
│       │                                                      │
│       ▼                                                      │
│  7. Preencher Marcadores                                     │
│       ├── Marcador 1 → "Marcadores"                          │
│       ├── Marcador 2 → "Marcadores2"                         │
│       └── Marcador N → "Marcadores{N}"                       │
│       │                                                      │
│       ▼                                                      │
│  8. Preencher Dados Finais de Cliente                        │
│       ├── Nome (uppercase)                                   │
│       ├── CPF (formatado)                                    │
│       ├── Advogado Principal (uppercase)                     │
│       ├── Telefones 1-4 (_ls helper)                         │
│       └── E-mails 1-3 (_ls helper)                           │
│       │                                                      │
│       ▼                                                      │
│  9. Retornar Linha Completa                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘`}),e.jsx("h4",{children:"Exemplo Completo"}),e.jsx(a,{code:`builder = RowBuilder(logger=logger, normalizer=normalizer)

ctx = {
    "escritorio": "Silva & Associados Advogados",
    "estágio": "Prospecção",
    "negociador": "João Silva",
    "origem": "Website",
    "produto": "Consultoria Jurídica",
    "cnj": "0001234-56.2024.5.01.0001",
    "nome": "Maria Santos",
    "advogado": "Dr. João Silva",
}

output_preset = {
    "estagio": "Lead",
    "titulo": None,
    "marcadores": "Prospect",
}

linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf="12345678901",
    telefones=["11987654321", "1133334444"],
    emails=["maria@example.com", "maria.santos@company.com"],
    tags=["Lote 1", "Prioritário"],
    row_marcadores=["Janeiro 2024"],
)

# Resultado com 24 campos (11 base + 4 marcadores + 10 final)`}),e.jsx("h4",{children:"Prioridade de Marcadores"}),e.jsxs("ol",{children:[e.jsx("li",{children:"row_marcadores (marcadores da planilha de entrada)"}),e.jsx("li",{children:'output_preset["marcadores"] (marcador do preset)'}),e.jsx("li",{children:"tags (tags da CLI)"})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Métodos Privados"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_normalize_escritorio",children:"_normalize_escritorio"}),e.jsx(a,{code:"def _normalize_escritorio(self, name: str) -> str:"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Normaliza nome do escritório se normalizer estiver configurado."]}),e.jsx("h4",{children:"Comportamento"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Se self._normalizer está configurado:"})," Chama normalizer.normalize_for_output(name)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Se self._normalizer é None:"})," Retorna o nome original sem modificações"]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`# Com normalizador
builder = RowBuilder(normalizer=EscritorioNormalizer())
normalized = builder._normalize_escritorio("Silva & Associados Advogados")
# "SILVA & ASSOCIADOS"

# Sem normalizador
builder = RowBuilder()
normalized = builder._normalize_escritorio("Silva & Associados Advogados")
# "Silva & Associados Advogados"`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_format_cpf_safe",children:"_format_cpf_safe"}),e.jsx(a,{code:"def _format_cpf_safe(self, cpf: str) -> str:"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Formata CPF de forma segura, tratando erros silenciosamente."]}),e.jsx("h4",{children:"Comportamento"}),e.jsx(a,{code:`┌──────────────────────────────────────────────────────────────┐
│                    _FORMAT_CPF_SAFE LOGIC                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  cpf está vazio/None?                                        │
│       │                                                      │
│       ├─► SIM: retorna ""                                    │
│       │                                                      │
│       └─► NÃO: tenta formatar                                │
│             │                                                │
│             ├─► Sucesso: retorna CPF formatado               │
│             │           (XXX.XXX.XXX-XX)                     │
│             │                                                │
│             └─► Exceção: retorna CPF original                │
│                         (sem formatação)                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘`}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`builder = RowBuilder()

# CPF válido
formatted = builder._format_cpf_safe("12345678901")
# "123.456.789-01"

# CPF inválido (não quebra)
formatted = builder._format_cpf_safe("invalid")
# "invalid"

# CPF vazio
formatted = builder._format_cpf_safe("")
# ""`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"_ls",children:"_ls"}),e.jsx(a,{code:"def _ls(self, itens: List[Any], idx: int) -> str:"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Descrição:"})," Retorna item da lista por índice ou string vazia (list safe accessor)."]}),e.jsx("h4",{children:"Comportamento"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Se lista é None ou vazia:"}),' Retorna ""']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Se índice está fora dos limites:"}),' Retorna ""']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Se índice é válido:"})," Retorna itens[idx]"]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`builder = RowBuilder()

telefones = ["11987654321", "1133334444"]

tel1 = builder._ls(telefones, 0)  # "11987654321"
tel2 = builder._ls(telefones, 1)  # "1133334444"
tel3 = builder._ls(telefones, 2)  # ""
tel4 = builder._ls(telefones, 3)  # ""`}),e.jsx("h4",{children:"Uso no build_linha"}),e.jsx(a,{code:`base["(Cliente) Telefones1"] = self._ls(telefones, 0)
base["(Cliente) Telefones2"] = self._ls(telefones, 1)
base["(Cliente) Telefones3"] = self._ls(telefones, 2)
base["(Cliente) Telefones4"] = self._ls(telefones, 3)
base["(Cliente) E-mail"] = self._ls(emails, 0)
base["(Cliente) E-mail2"] = self._ls(emails, 1)
base["(Cliente) E-mail3"] = self._ls(emails, 2)`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Uso Básico"}),e.jsx(a,{code:`from src.ploomes_integration.clients.processors import RowBuilder

logger = logging.getLogger(__name__)
builder = RowBuilder(logger=logger)

# Dados mínimos
ctx = {
    "escritorio": "Silva Advogados",
    "nome": "João Silva",
    "cnj": "0001234-56.2024.5.01.0001",
    "negociador": "Ana Costa",
    "advogado": "Dr. Silva",
}

output_preset = {
    "estagio": "Lead",
}

linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf="12345678901",
    telefones=["11987654321"],
    emails=["joao@example.com"],
)`}),e.jsx("h3",{children:"Uso com Normalização"}),e.jsx(a,{code:`from src.ploomes_integration.clients.processors import (
    RowBuilder,
    EscritorioNormalizer,
)

# Configurar normalização
normalizer = EscritorioNormalizer()
builder = RowBuilder(logger=logger, normalizer=normalizer)

ctx = {
    "escritorio": "Silva & Associados Sociedade de Advogados Ltda.",
    # ... outros campos
}

linha = builder.build_linha(ctx, output_preset, cpf, telefones, emails)
# "(Negócio) Escritório" será "SILVA & ASSOCIADOS"`}),e.jsx("h3",{children:"Uso com Múltiplos Marcadores"}),e.jsx(a,{code:`# Marcadores de diferentes fontes
row_marcadores = ["Janeiro 2024", "Escritório X"]  # da planilha
output_preset = {"marcadores": "Prospect"}          # do preset
tags = ["Lote 1", "Alta Prioridade"]               # da CLI

linha = builder.build_linha(
    ctx=ctx,
    output_preset=output_preset,
    cpf=cpf,
    telefones=telefones,
    emails=emails,
    tags=tags,
    row_marcadores=row_marcadores,
)

# Resultado:
# "Marcadores": "Janeiro 2024"      (row_marcadores[0])
# "Marcadores2": "Escritório X"     (row_marcadores[1])
# "Marcadores3": "Prospect"         (preset)
# "Marcadores4": "Lote 1"           (tags[0])
# "Marcadores5": "Alta Prioridade"  (tags[1])`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Integração com Outros Componentes"}),e.jsx("h3",{children:"Com ExcelProcessor"}),e.jsx(a,{code:`# No ExcelProcessor
from .processors import RowBuilder

class ExcelProcessor:
    def __init__(self, ...):
        self._row_builder = RowBuilder(
            logger=self.logger,
            normalizer=self._normalizer,
        )

    def _construir_linha_saida(self, ctx, ...):
        return self._row_builder.build_linha(
            ctx=ctx,
            output_preset=self.output_preset,
            cpf=cpf,
            telefones=telefones,
            emails=emails,
            tags=self.tags_cli,
            row_marcadores=row_marcadores,
        )`})]})]})}function Wm(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Módulo: tabular_io"}),e.jsx("p",{className:"doc-subtitle",children:"Operações de leitura e escrita de arquivos tabulares com validação e segurança."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Descrição"}),e.jsxs("p",{children:["O módulo ",e.jsx("code",{className:"code-block",children:"tabular_io"})," fornece funções para leitura e escrita segura de arquivos tabulares (Excel, CSV), incluindo validação de dados, verificação de segurança e tratamento de erros robusto."]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Funções de Leitura"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"read_excel",children:"read_excel"}),e.jsx(a,{code:`def read_excel(
    file_path: str,
    sheet_name: Union[str, int] = 0,
    required_columns: Optional[List[str]] = None,
    dtype: Optional[Dict[str, type]] = None,
    **kwargs
) -> pd.DataFrame:`}),e.jsx("p",{children:"Lê arquivo Excel com validação e tratamento de erros."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"file_path"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho do arquivo Excel"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"sheet_name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Union[str, int]"})}),e.jsx("td",{children:"Nome ou índice da aba (padrão: 0)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"required_columns"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[List[str]]"})}),e.jsx("td",{children:"Colunas obrigatórias"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"dtype"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[Dict[str, type]]"})}),e.jsx("td",{children:"Tipos de dados por coluna"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"**kwargs"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Argumentos adicionais para pd.read_excel"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"pd.DataFrame"})}),e.jsx("td",{children:"DataFrame com dados do arquivo"})]})})]}),e.jsx("h4",{children:"Exceções"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"FileNotFoundError"}),": Arquivo não existe"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"MissingColumnError"}),": Coluna obrigatória ausente"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"FileProcessingError"}),": Erro na leitura do arquivo"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"FileSecurityError"}),": Falha na validação de segurança"]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import read_excel

# Leitura básica
df = read_excel("dados.xlsx")

# Com validação de colunas
df = read_excel(
    "advogados.xlsx",
    required_columns=["Nome", "OAB", "Escritório"],
    dtype={"OAB": str, "CPF": str}
)

# Aba específica
df = read_excel("dados.xlsx", sheet_name="Cadastro")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"read_csv",children:"read_csv"}),e.jsx(a,{code:`def read_csv(
    file_path: str,
    required_columns: Optional[List[str]] = None,
    encoding: str = "utf-8",
    separator: str = ";",
    dtype: Optional[Dict[str, type]] = None,
    **kwargs
) -> pd.DataFrame:`}),e.jsx("p",{children:"Lê arquivo CSV com validação e tratamento de encoding."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"file_path"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho do arquivo CSV"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"required_columns"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[List[str]]"})}),e.jsx("td",{children:"Colunas obrigatórias"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"encoding"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Encoding do arquivo (padrão: utf-8)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"separator"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:'Separador de campos (padrão: ";")'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"dtype"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Optional[Dict[str, type]]"})}),e.jsx("td",{children:"Tipos de dados por coluna"})]})]})]}),e.jsx("h4",{children:"Detecção automática de encoding"}),e.jsx("p",{children:"Se a leitura com encoding especificado falhar, tenta automaticamente:"}),e.jsxs("ol",{children:[e.jsx("li",{children:"utf-8"}),e.jsx("li",{children:"utf-8-sig (com BOM)"}),e.jsx("li",{children:"latin-1"}),e.jsx("li",{children:"cp1252 (Windows)"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import read_csv

# Leitura básica
df = read_csv("dados.csv")

# Com separador e encoding específicos
df = read_csv(
    "export.csv",
    separator=",",
    encoding="latin-1"
)

# Com validação
df = read_csv(
    "advogados.csv",
    required_columns=["Nome", "OAB"]
)`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"read_file",children:"read_file"}),e.jsx(a,{code:`def read_file(
    file_path: str,
    required_columns: Optional[List[str]] = None,
    **kwargs
) -> pd.DataFrame:`}),e.jsx("p",{children:"Lê arquivo tabular detectando automaticamente o formato."}),e.jsx("h4",{children:"Formatos suportados"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:".xlsx"}),","," ",e.jsx("code",{className:"code-block",children:".xls"}),": Excel"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:".csv"}),": CSV"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:".tsv"}),": TSV (tab-separated)"]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import read_file

# Detecção automática
df = read_file("dados.xlsx")  # Lê como Excel
df = read_file("dados.csv")   # Lê como CSV`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Funções de Escrita"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"write_excel",children:"write_excel"}),e.jsx(a,{code:`def write_excel(
    df: pd.DataFrame,
    file_path: str,
    sheet_name: str = "Dados",
    index: bool = False,
    **kwargs
) -> str:`}),e.jsx("p",{children:"Escreve DataFrame para arquivo Excel."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"df"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"pd.DataFrame"})}),e.jsx("td",{children:"DataFrame a ser escrito"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"file_path"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho de saída"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"sheet_name"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:'Nome da aba (padrão: "Dados")'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"index"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"Incluir índice (padrão: False)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho absoluto do arquivo criado"})]})})]}),e.jsx("h4",{children:"Comportamento"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Cria diretórios intermediários se necessário"}),e.jsx("li",{children:"Sobrescreve arquivo existente"}),e.jsx("li",{children:"Valida permissões de escrita"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import write_excel

# Escrita básica
output_path = write_excel(df, "output/resultado.xlsx")

# Com aba nomeada
output_path = write_excel(
    df,
    "relatorios/mensal.xlsx",
    sheet_name="Janeiro 2024"
)`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"write_csv",children:"write_csv"}),e.jsx(a,{code:`def write_csv(
    df: pd.DataFrame,
    file_path: str,
    encoding: str = "utf-8-sig",
    separator: str = ";",
    index: bool = False,
    **kwargs
) -> str:`}),e.jsx("p",{children:"Escreve DataFrame para arquivo CSV."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"df"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"pd.DataFrame"})}),e.jsx("td",{children:"DataFrame a ser escrito"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"file_path"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho de saída"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"encoding"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Encoding (padrão: utf-8-sig para Excel)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"separator"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:'Separador (padrão: ";")'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"index"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"Incluir índice (padrão: False)"})]})]})]}),e.jsx("h4",{children:"Nota sobre encoding"}),e.jsxs("p",{children:["O encoding padrão ",e.jsx("code",{className:"code-block",children:"utf-8-sig"})," ","inclui BOM (Byte Order Mark), garantindo compatibilidade com Microsoft Excel que pode interpretar incorretamente UTF-8 puro."]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import write_csv

# Escrita para compatibilidade com Excel
output_path = write_csv(df, "output/dados.csv")

# CSV puro UTF-8
output_path = write_csv(
    df,
    "output/dados.csv",
    encoding="utf-8",
    separator=","
)`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"write_excel_multiple_sheets"}),e.jsx(a,{code:`def write_excel_multiple_sheets(
    dataframes: Dict[str, pd.DataFrame],
    file_path: str,
    **kwargs
) -> str:`}),e.jsx("p",{children:"Escreve múltiplos DataFrames como abas em um único arquivo Excel."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"dataframes"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"Dict[str, pd.DataFrame]"})}),e.jsx("td",{children:"Mapeamento nome_aba → DataFrame"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"file_path"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho de saída"})]})]})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import write_excel_multiple_sheets

dataframes = {
    "Resumo": df_resumo,
    "Sucesso": df_sucesso,
    "Erros": df_erros,
    "Ignorados": df_ignorados
}

output_path = write_excel_multiple_sheets(
    dataframes,
    "output/relatorio_completo.xlsx"
)`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Funções de Validação"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"validate_columns",children:"validate_columns"}),e.jsx(a,{code:`def validate_columns(
    df: pd.DataFrame,
    required_columns: List[str],
    raise_on_missing: bool = True
) -> List[str]:`}),e.jsx("p",{children:"Valida presença de colunas obrigatórias no DataFrame."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"df"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"pd.DataFrame"})}),e.jsx("td",{children:"DataFrame a validar"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"required_columns"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"Lista de colunas obrigatórias"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"raise_on_missing"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:"Lançar exceção se faltar coluna"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:"Lista de colunas faltantes (vazia se todas presentes)"})]})})]}),e.jsx("h4",{children:"Exceção"}),e.jsx(a,{code:"MissingColumnError: Colunas obrigatórias ausentes: ['OAB', 'CPF']"}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import validate_columns
from exceptions import MissingColumnError

# Com exceção automática
try:
    validate_columns(df, ["Nome", "OAB", "CPF"])
except MissingColumnError as e:
    print(f"Colunas faltando: {e.missing_columns}")

# Sem exceção (retorna lista)
missing = validate_columns(df, ["Nome", "OAB"], raise_on_missing=False)
if missing:
    print(f"Colunas não encontradas: {missing}")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"validate_file_path"}),e.jsx(a,{code:`def validate_file_path(
    file_path: str,
    must_exist: bool = True,
    allowed_extensions: Optional[List[str]] = None
) -> str:`}),e.jsx("p",{children:"Valida caminho de arquivo e retorna caminho absoluto normalizado."}),e.jsx("h4",{children:"Validações realizadas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Existência do arquivo (se must_exist=True)"}),e.jsx("li",{children:"Extensão permitida (se allowed_extensions fornecido)"}),e.jsx("li",{children:"Caminho não é diretório"}),e.jsx("li",{children:"Verificação de segurança contra path traversal"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import validate_file_path

# Validação básica
path = validate_file_path("dados.xlsx")

# Com extensões permitidas
path = validate_file_path(
    "dados.xlsx",
    allowed_extensions=[".xlsx", ".xls", ".csv"]
)

# Para escrita (arquivo não precisa existir)
path = validate_file_path(
    "output/novo.xlsx",
    must_exist=False
)`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"validate_dataframe"}),e.jsx(a,{code:`def validate_dataframe(
    df: pd.DataFrame,
    min_rows: int = 1,
    max_rows: Optional[int] = None,
    required_columns: Optional[List[str]] = None
) -> bool:`}),e.jsx("p",{children:"Valida estrutura e conteúdo do DataFrame."}),e.jsx("h4",{children:"Validações"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Número mínimo de linhas"}),e.jsx("li",{children:"Número máximo de linhas (opcional)"}),e.jsx("li",{children:"Presença de colunas obrigatórias"}),e.jsx("li",{children:"DataFrame não é None"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import validate_dataframe

# Validação com mínimo de linhas
if validate_dataframe(df, min_rows=10):
    print("DataFrame válido para processamento")

# Validação completa
is_valid = validate_dataframe(
    df,
    min_rows=1,
    max_rows=10000,
    required_columns=["Nome", "OAB"]
)`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Segurança"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"validate_file_security",children:"validate_file_security"}),e.jsx(a,{code:"def validate_file_security(file_path: str) -> bool:"}),e.jsx("p",{children:"Valida segurança do arquivo antes de processamento."}),e.jsx("h4",{children:"Verificações realizadas"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Verificação"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Path Traversal"}),e.jsx("td",{children:"Detecta tentativas de acesso fora do diretório"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Extensão"}),e.jsx("td",{children:"Valida se extensão é permitida"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Tamanho máximo"}),e.jsx("td",{children:"Verifica se arquivo não excede limite"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Caracteres inválidos"}),e.jsx("td",{children:"Detecta caracteres suspeitos no caminho"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Links simbólicos"}),e.jsx("td",{children:"Impede seguir symlinks maliciosos"})]})]})]}),e.jsx("h4",{children:"Exceção"}),e.jsx(a,{code:"FileSecurityError: Tentativa de path traversal detectada: ../../../etc/passwd"}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import validate_file_security
from exceptions import FileSecurityError

try:
    validate_file_security(user_provided_path)
    df = read_excel(user_provided_path)
except FileSecurityError as e:
    print(f"⚠️ Arquivo rejeitado por segurança: {e}")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"sanitize_filename"}),e.jsx(a,{code:"def sanitize_filename(filename: str) -> str:"}),e.jsx("p",{children:"Sanitiza nome de arquivo removendo caracteres perigosos."}),e.jsx("h4",{children:"Caracteres removidos/substituídos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:".."})," (path traversal)"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"/"})," e"," ",e.jsx("code",{className:"code-block",children:"\\"})," (separadores)"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:":"})," (drive letter/ADS)"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:"*"}),","," ",e.jsx("code",{className:"code-block",children:"?"}),","," ",e.jsx("code",{className:"code-block",children:'"'}),","," ",e.jsx("code",{className:"code-block",children:"<"}),","," ",e.jsx("code",{className:"code-block",children:">"}),","," ",e.jsx("code",{className:"code-block",children:"|"})," (inválidos Windows)"]}),e.jsx("li",{children:"Caracteres de controle"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import sanitize_filename

safe_name = sanitize_filename("../../../etc/passwd")
# Resultado: "etc_passwd"

safe_name = sanitize_filename("arquivo<teste>.xlsx")
# Resultado: "arquivo_teste_.xlsx"`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"Constantes de segurança"}),e.jsx(a,{code:`# Extensões permitidas para leitura
ALLOWED_READ_EXTENSIONS = [".xlsx", ".xls", ".csv", ".tsv"]

# Extensões permitidas para escrita
ALLOWED_WRITE_EXTENSIONS = [".xlsx", ".csv"]

# Tamanho máximo de arquivo (50MB)
MAX_FILE_SIZE = 50 * 1024 * 1024

# Número máximo de linhas por arquivo
MAX_ROWS = 100000`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Funções Auxiliares"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"get_file_info"}),e.jsx(a,{code:"def get_file_info(file_path: str) -> Dict[str, Any]:"}),e.jsx("p",{children:"Obtém informações sobre um arquivo tabular."}),e.jsx("h4",{children:"Retorno"}),e.jsx(a,{code:`{
    "path": str,              # Caminho absoluto
    "filename": str,          # Nome do arquivo
    "extension": str,         # Extensão (.xlsx, .csv, etc)
    "size_bytes": int,        # Tamanho em bytes
    "size_human": str,        # Tamanho legível ("1.5 MB")
    "modified": datetime,     # Data de modificação
    "created": datetime,      # Data de criação
    "num_sheets": int,        # Número de abas (Excel)
    "sheet_names": List[str]  # Nomes das abas (Excel)
}`}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import get_file_info

info = get_file_info("dados.xlsx")
print(f"Arquivo: {info['filename']}")
print(f"Tamanho: {info['size_human']}")
print(f"Abas: {info['sheet_names']}")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"preview_file"}),e.jsx(a,{code:`def preview_file(
    file_path: str,
    num_rows: int = 5,
    sheet_name: Union[str, int] = 0
) -> pd.DataFrame:`}),e.jsx("p",{children:"Lê primeiras linhas de um arquivo para preview."}),e.jsx("h4",{children:"Uso"}),e.jsx(a,{code:`from tabular_io import preview_file

# Preview das primeiras 5 linhas
preview = preview_file("dados.xlsx")
print(preview)

# Preview de 10 linhas de aba específica
preview = preview_file("dados.xlsx", num_rows=10, sheet_name="Cadastro")`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"detect_encoding"}),e.jsx(a,{code:"def detect_encoding(file_path: str) -> str:"}),e.jsx("p",{children:"Detecta encoding de arquivo de texto/CSV."}),e.jsx("h4",{children:"Método"}),e.jsxs("p",{children:["Usa biblioteca ",e.jsx("code",{className:"code-block",children:"chardet"})," para detecção automática com fallback para encodings comuns em caso de baixa confiança."]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import detect_encoding

encoding = detect_encoding("dados.csv")
# Resultado: "utf-8", "latin-1", "cp1252", etc

df = read_csv("dados.csv", encoding=encoding)`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{children:"normalize_column_names"}),e.jsx(a,{code:"def normalize_column_names(df: pd.DataFrame) -> pd.DataFrame:"}),e.jsx("p",{children:"Normaliza nomes de colunas do DataFrame."}),e.jsx("h4",{children:"Normalizações aplicadas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Remove espaços extras"}),e.jsx("li",{children:"Converte para lowercase"}),e.jsx("li",{children:"Remove acentos"}),e.jsx("li",{children:"Substitui espaços por underscore"}),e.jsx("li",{children:"Remove caracteres especiais"})]}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`from tabular_io import normalize_column_names

# Antes: ["Nome Completo", "E-mail", "Nº OAB"]
df = normalize_column_names(df)
# Depois: ["nome_completo", "email", "no_oab"]`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Leitura Segura de Arquivo"}),e.jsx(a,{code:`from tabular_io import read_excel, validate_file_security
from exceptions import FileSecurityError, MissingColumnError, FileProcessingError

def process_user_file(file_path: str) -> pd.DataFrame:
    """Processa arquivo fornecido pelo usuário de forma segura."""
    try:
        # Validação de segurança
        validate_file_security(file_path)
        
        # Leitura com validação de colunas
        df = read_excel(
            file_path,
            required_columns=["Nome", "OAB", "Escritório"],
            dtype={"OAB": str, "CPF": str, "CNPJ": str}
        )
        
        return df
        
    except FileSecurityError as e:
        print(f"⚠️ Arquivo rejeitado: {e}")
        raise
    except MissingColumnError as e:
        print(f"❌ Colunas faltando: {e.missing_columns}")
        raise
    except FileProcessingError as e:
        print(f"❌ Erro ao ler arquivo: {e}")
        raise`}),e.jsx("h3",{children:"Exportação com Múltiplas Abas"}),e.jsx(a,{code:`from tabular_io import write_excel_multiple_sheets
import pandas as pd

def export_results(results: List[Dict], original_df: pd.DataFrame) -> str:
    """Exporta resultados para Excel com múltiplas abas."""
    
    # Separa por status
    success = [r for r in results if r.get("success")]
    errors = [r for r in results if r.get("error")]
    ignored = [r for r in results if r.get("ignored")]
    
    # Cria métricas
    metrics = pd.DataFrame([{
        "Total": len(results),
        "Sucesso": len(success),
        "Erros": len(errors),
        "Ignorados": len(ignored),
        "Taxa de Sucesso": f"{len(success)/len(results)*100:.1f}%"
    }])
    
    # Exporta
    dataframes = {
        "Métricas": metrics,
        "Sucesso": pd.DataFrame(success),
        "Erros": pd.DataFrame(errors),
        "Ignorados": pd.DataFrame(ignored),
        "Dados Originais": original_df
    }
    
    return write_excel_multiple_sheets(
        dataframes,
        "output/resultado_completo.xlsx"
    )`}),e.jsx("h3",{children:"Pipeline Completo de Processamento"}),e.jsx(a,{code:`from tabular_io import (
    read_file,
    write_excel,
    validate_dataframe,
    normalize_column_names
)

def pipeline(input_path: str, output_path: str) -> bool:
    """Pipeline completo de leitura, processamento e escrita."""
    
    # 1. Leitura
    df = read_file(input_path)
    print(f"📥 Lidos {len(df)} registros")
    
    # 2. Validação
    if not validate_dataframe(df, min_rows=1, max_rows=10000):
        raise ValueError("DataFrame inválido")
    
    # 3. Normalização
    df = normalize_column_names(df)
    
    # 4. Processamento
    df["processado"] = True
    df["data_processamento"] = pd.Timestamp.now()
    
    # 5. Escrita
    output = write_excel(df, output_path)
    print(f"📤 Salvo em: {output}")
    
    return True`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Tratamento de Erros"}),e.jsx("h3",{children:"Hierarquia de Exceções"}),e.jsx(a,{code:`# Exceções específicas do módulo
from exceptions import (
    FileProcessingError,    # Erro geral de processamento de arquivo
    MissingColumnError,     # Coluna obrigatória ausente
    FileSecurityError       # Falha na validação de segurança
)

# Uso em try/except
try:
    df = read_excel("dados.xlsx", required_columns=["Nome", "OAB"])
except FileNotFoundError:
    print("Arquivo não encontrado")
except MissingColumnError as e:
    print(f"Colunas faltando: {e.missing_columns}")
except FileSecurityError as e:
    print(f"Problema de segurança: {e}")
except FileProcessingError as e:
    print(f"Erro de processamento: {e}")`}),e.jsx("h3",{children:"Logging Integrado"}),e.jsx(a,{code:`# O módulo usa logging estruturado
import logging
logger = logging.getLogger("tabular_io")

# Logs gerados automaticamente:
# DEBUG: Iniciando leitura de arquivo: dados.xlsx
# INFO: Arquivo lido com sucesso: 150 linhas, 12 colunas
# WARNING: Encoding detectado com baixa confiança: latin-1
# ERROR: Coluna obrigatória não encontrada: 'OAB'`})]})]})}function $m(){return e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Módulo: workflows"}),e.jsx("p",{className:"doc-subtitle",children:"Sistema de automação LEMIT → Ploomes com orquestração de fluxos de trabalho."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Visão Geral"}),e.jsx("p",{children:"O sistema oferece diferentes pipelines de processamento para atender a diferentes necessidades de negócio:"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Workflow"}),e.jsx("th",{children:"Descrição"}),e.jsx("th",{children:"LEMIT"}),e.jsx("th",{children:"Ploomes"}),e.jsx("th",{children:"Uso Principal"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"lemit-cpf"})}),e.jsx("td",{children:"Enriquecimento apenas via CPF"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"Buscar telefones/emails por CPF"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"lemit-nome"})}),e.jsx("td",{children:"Enriquecimento apenas via Nome"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"Buscar telefones/emails por nome"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ploomes-only"})}),e.jsx("td",{children:"Importação apenas para CRM"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"Criar advogados/escritórios"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"advogados"})}),e.jsx("td",{children:"Alias para ploomes-only"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"Compatibilidade retroativa"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"escritorio-only"})}),e.jsx("td",{children:"Busca escritório + enriquecimento"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"Quando só tem nome do escritório"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"cpf"})}),e.jsx("td",{children:"Pipeline completo via CPF"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"Fluxo completo com CPF"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"nome"})}),e.jsx("td",{children:"Pipeline completo via Nome"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"Fluxo completo sem CPF"})]})]})]}),e.jsx("h3",{children:"Arquitetura de Módulos"}),e.jsx(a,{code:`src/workflows/
├── __init__.py              # Exporta todas as funções de workflow
├── workflow_router.py       # Detecção automática e validação
├── lemit_workflows.py       # Workflows apenas LEMIT
├── ploomes_workflows.py     # Workflows apenas Ploomes
├── combined_workflows.py    # Pipelines completos
└── escritorio_workflow.py   # Workflow de escritório`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Classe WorkflowRouter"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Arquivo:"})," ",e.jsx("code",{className:"code-block",children:"src/workflows/workflow_router.py"})]}),e.jsx(a,{code:`class WorkflowRouter:
    """
    Decide qual fluxo rodar baseado nos cabeçalhos:
    - OAB/Advogado presente? -> Pipeline com Integração Ploomes.
    - Apenas Reclamante/CPF? -> Apenas Enriquecimento Lemit.
    """`}),e.jsx("p",{children:"Responsável pela detecção automática de workflow baseado nos cabeçalhos do arquivo de entrada e validação de colunas obrigatórias."}),e.jsx("h3",{children:"Observability Features"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["📝 Logging estruturado com"," ",e.jsx("code",{className:"code-block",children:"correlation_id"})]}),e.jsx("li",{children:"⏱️ Métricas de detecção de workflow"}),e.jsx("li",{children:"📊 Análise detalhada de colunas detectadas"}),e.jsx("li",{children:"📈 Tracking de workflows detectados"})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"__init__",children:"__init__"}),e.jsx(a,{code:"def __init__(self, logger: logging.Logger)"}),e.jsx("p",{children:"Inicializa o roteador de workflows."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger configurado para registrar operações"})]})})]}),e.jsx("h4",{children:"Atributos Inicializados"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Atributo"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"self.logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"Logger para operações"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self._metrics"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"MetricsRegistry"})}),e.jsx("td",{children:"Registry de métricas"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self._detection_count"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"int"})}),e.jsx("td",{children:"Contador de detecções"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"self._workflow_counts"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"dict[str, int]"})}),e.jsx("td",{children:"Contagem por tipo de workflow"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"get_stats",children:"get_stats"}),e.jsx(a,{code:"def get_stats(self) -> dict"}),e.jsx("p",{children:"Retorna estatísticas de detecção de workflows."}),e.jsx("h4",{children:"Retorno"}),e.jsx(a,{code:`{
    "total_detections": int,      # Total de detecções realizadas
    "workflow_counts": dict,      # Contagem por tipo de workflow
    "metrics": dict               # Métricas de performance
}`}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`router = WorkflowRouter(logger)
stats = router.get_stats()
# {
#     "total_detections": 15,
#     "workflow_counts": {"cpf": 8, "nome": 5, "ploomes-only": 2},
#     "metrics": {"average_duration_ms": 45.2, ...}
# }`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"detect_workflow",children:"detect_workflow"}),e.jsx(a,{code:"def detect_workflow(self, input_file: str) -> Optional[str]"}),e.jsx("p",{children:"Detecta automaticamente o workflow baseado nas colunas do arquivo."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:"input_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"Caminho para o arquivo de entrada (Excel/CSV)"})]})})]}),e.jsx("h4",{children:"Workflows Possíveis"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:'"cpf"'})," - Pipeline completo com CPF"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:'"nome"'})," - Pipeline completo com Nome"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:'"ploomes-only"'})," - Apenas importação Ploomes"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:'"escritorio-only"'})," - Escritório + enriquecimento"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:'"lemit-cpf"'})," - Apenas LEMIT por CPF"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-block",children:'"lemit-nome"'})," - Apenas LEMIT por Nome"]})]}),e.jsx("h4",{children:"Lógica de Detecção"}),e.jsx(a,{code:`┌─────────────────────────────────────────────────────────────┐
│                    DETECÇÃO DE WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tem OAB/Advogado com valores?                              │
│       │                                                     │
│       ├── SIM ──┬── Tem CPF com valores? ─── → "cpf"        │
│       │         │                                           │
│       │         ├── Tem Nome (sem CPF)? ──── → "nome"       │
│       │         │                                           │
│       │         └── Sem dados reclamante ─── → "ploomes-    │
│       │                                           only"     │
│       │                                                     │
│       └── NÃO ──┬── Tem Escritório + (CPF ou Nome)?         │
│                 │        └───────────────────→ "escritorio- │
│                 │                                  only"    │
│                 │                                           │
│                 ├── Tem CPF com valores? ─── → "lemit-cpf"  │
│                 │                                           │
│                 └── Tem Nome com valores? ── → "lemit-nome" │
│                                                             │
│  ⚠️ Se nenhuma condição: retorna None                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`router = WorkflowRouter(logger)
workflow = router.detect_workflow("dados.xlsx")
# "cpf" - se arquivo tem OAB + CPF preenchidos`})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"validate_required_columns",children:"validate_required_columns"}),e.jsx(a,{code:"def validate_required_columns(self, input_file: str, workflow: str = None) -> dict"}),e.jsx("p",{children:"Valida se as colunas obrigatórias estão preenchidas antes do processamento."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"input_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho para o arquivo de entrada"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"workflow"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"None"})}),e.jsx("td",{children:"Nome do workflow (para validação condicional)"})]})]})]}),e.jsx("h4",{children:"Retorno"}),e.jsx(a,{code:`{
    "valid": bool,           # True se validação passou
    "errors": list[str],     # Lista de erros encontrados
    "warnings": list[str],   # Lista de avisos
    "missing_rows": dict     # Linhas com valores faltantes por coluna
}`}),e.jsx("h4",{children:"Regras de Validação por Workflow"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Workflow"}),e.jsx("th",{children:"CNJ"}),e.jsx("th",{children:"Reclamante"}),e.jsx("th",{children:"CPF"}),e.jsx("th",{children:"Escritório"}),e.jsx("th",{children:"Advogado"}),e.jsx("th",{children:"OAB"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"lemit-cpf"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"⚠️"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"lemit-nome"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"ploomes-only"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"advogados"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"escritorio-only"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"❌"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"cpf"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"⚠️"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"nome"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"})]})]})]}),e.jsx("p",{children:e.jsx("small",{children:"✅ = Obrigatório | ⚠️ = Recomendado (warn) | ❌ = Não necessário | = Escritório OU (Advogado + OAB)"})}),e.jsx("h4",{children:"Exemplo"}),e.jsx(a,{code:`router = WorkflowRouter(logger)
result = router.validate_required_columns("dados.xlsx", workflow="cpf")

if not result["valid"]:
    for error in result["errors"]:
        print(error)
    # ❌ Coluna obrigatória não encontrada: CNJ
    # ❌ Coluna 'Reclamante' tem 5 linha(s) vazia(s): linhas 2, 5, 8, 12, 15`})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Workflows LEMIT"}),e.jsx("p",{children:"Workflows que executam apenas enriquecimento de dados via LEMIT, sem integração com Ploomes."}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"executar_fluxo_lemit_cpf",children:"executar_fluxo_lemit_cpf"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Arquivo:"})," ",e.jsx("code",{className:"code-block",children:"src/workflows/lemit_workflows.py"})]}),e.jsx(a,{code:`def executar_fluxo_lemit_cpf(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None
) -> int`}),e.jsx("p",{children:"Executa apenas o enriquecimento de dados via LEMIT usando CPF como identificador."}),e.jsx("h4",{children:"Pipeline"}),e.jsx(a,{code:`┌─────────────────────────────────────────────────────────────┐
│                    LEMIT-CPF WORKFLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 📥 Inicializar clientes (ExcelProcessor, LemitClient)   │
│       │                                                     │
│       ▼                                                     │
│  2. 🔍 Processar fluxo com CPF                              │
│       ├── Ler planilha de entrada                           │
│       ├── Para cada linha com CPF:                          │
│       │    └── Buscar no LEMIT                              │
│       └── Enriquecer com telefones/emails                   │
│       │                                                     │
│       ▼                                                     │
│  3. 💾 Gerar arquivo CSV de saída                           │
│       │                                                     │
│       ▼                                                     │
│  4. 📊 Gerar relatório Excel de processamento               │
│       │                                                     │
│       ▼                                                     │
│  5. ✅ Retornar 0 (sucesso) ou 1 (falha)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"input_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo Excel de entrada"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"output_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo CSV de saída"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Logger configurado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tags"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"list"})}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"None"})}),e.jsx("td",{children:"Lista de tags/marcadores a adicionar"})]})]})]}),e.jsx("h4",{children:"Colunas Obrigatórias"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Coluna"}),e.jsx("th",{children:"Aliases"}),e.jsx("th",{children:"Obrigatório"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"CNJ"}),e.jsxs("td",{children:[e.jsx("code",{className:"code-block",children:"cnj"}),","," ",e.jsx("code",{className:"code-block",children:"processo"})]}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Reclamante"}),e.jsxs("td",{children:[e.jsx("code",{className:"code-block",children:"reclamante"}),","," ",e.jsx("code",{className:"code-block",children:"nome"})]}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CPF"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"cpf"})}),e.jsx("td",{children:"⚠️ (recomendado)"})]})]})]}),e.jsx("h4",{children:"Arquivos Gerados"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Arquivo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"{output_file}"})}),e.jsx("td",{children:"Dados enriquecidos (CSV)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("code",{className:"code-block",children:["{output_file}","_relatorio.xlsx"]})}),e.jsx("td",{children:"Relatório de processamento"})]})]})]})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"executar_fluxo_lemit_nome",children:"executar_fluxo_lemit_nome"}),e.jsx(a,{code:`def executar_fluxo_lemit_nome(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None
) -> int`}),e.jsx("p",{children:"Executa apenas o enriquecimento de dados via LEMIT usando Nome como identificador."}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"input_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo Excel de entrada"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"output_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo CSV de saída"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Logger configurado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tags"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"list"})}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"None"})}),e.jsx("td",{children:"Lista de tags/marcadores a adicionar"})]})]})]}),e.jsx("h4",{children:"Colunas Obrigatórias"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Coluna"}),e.jsx("th",{children:"Aliases"}),e.jsx("th",{children:"Obrigatório"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"CNJ"}),e.jsxs("td",{children:[e.jsx("code",{className:"code-block",children:"cnj"}),","," ",e.jsx("code",{className:"code-block",children:"processo"})]}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Reclamante"}),e.jsxs("td",{children:[e.jsx("code",{className:"code-block",children:"reclamante"}),","," ",e.jsx("code",{className:"code-block",children:"nome"})]}),e.jsx("td",{children:"✅"})]})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Workflows Ploomes"}),e.jsx("p",{children:"Workflows que executam apenas importação para Ploomes CRM, sem enriquecimento LEMIT."}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"executar_fluxo_ploomes_only",children:"executar_fluxo_ploomes_only"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Arquivo:"})," ",e.jsx("code",{className:"code-block",children:"src/workflows/ploomes_workflows.py"})]}),e.jsx(a,{code:`def executar_fluxo_ploomes_only(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None,
    fetch_socios: bool = False,
) -> int`}),e.jsx("p",{children:"Executa apenas a importação para Ploomes CRM. Ideal para criar/atualizar advogados e escritórios."}),e.jsx("h4",{children:"Pipeline"}),e.jsx(a,{code:`┌─────────────────────────────────────────────────────────────┐
│                   PLOOMES-ONLY WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📋 ETAPA 1/3: Criar modelo de advogados/escritórios        │
│       ├── Ler arquivo Excel de entrada                      │
│       ├── Processar cada linha                              │
│       └── Criar modelo de dados                             │
│       │                                                     │
│       ▼                                                     │
│  📤 ETAPA 2/3: Importar contatos para o Ploomes             │
│       ├── Para cada escritório/advogado:                    │
│       │    ├── Verificar se já existe                       │
│       │    ├── Criar ou atualizar                           │
│       │    └── (Opcional) Buscar sócios                     │
│       └── Registrar resultado                               │
│       │                                                     │
│       ▼                                                     │
│  📊 ETAPA 3/3: Gerar relatório de importação                │
│       └── Excel com detalhes de cada operação               │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"input_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo Excel de entrada"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"output_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo CSV de saída"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Logger configurado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tags"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"list"})}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"None"})}),e.jsx("td",{children:"Lista de tags/marcadores"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"fetch_socios"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"False"})}),e.jsx("td",{children:"Buscar advogados sócios via API LEMIT"})]})]})]}),e.jsx("h4",{children:"Colunas Obrigatórias"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Coluna"}),e.jsx("th",{children:"Aliases"}),e.jsx("th",{children:"Obrigatório"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Advogado"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"advogado"})}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"OAB"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"oab"})}),e.jsx("td",{children:"✅"})]})]})]}),e.jsx("p",{children:e.jsx("small",{children:"Escritório OU (Advogado + OAB) são obrigatórios"})})]}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"executar_fluxo_advogados",children:"executar_fluxo_advogados"}),e.jsx(a,{code:`def executar_fluxo_advogados(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: list = None,
    fetch_socios: bool = False,
) -> int`}),e.jsxs("p",{children:["Alias para"," ",e.jsx("code",{className:"code-block",children:"executar_fluxo_ploomes_only"}),". Mantido para compatibilidade retroativa."]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Workflow Escritório"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"executar_fluxo_escritorio_only",children:"executar_fluxo_escritorio_only"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Arquivo:"})," ",e.jsx("code",{className:"code-block",children:"src/workflows/escritorio_workflow.py"})]}),e.jsx(a,{code:`def executar_fluxo_escritorio_only(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    tags: List[str] = None
) -> int`}),e.jsx("p",{children:"Workflow para processar planilhas com Escritório e Reclamantes. Busca o escritório no Ploomes, obtém o advogado principal, e enriquece dados dos reclamantes via LEMIT."}),e.jsx("h4",{children:"Pipeline Detalhado"}),e.jsx(a,{code:`┌─────────────────────────────────────────────────────────────┐
│                ESCRITORIO-ONLY WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 📥 Inicializar clientes                                 │
│       ├── PloomesAPI                                        │
│       ├── ExcelProcessor (enable_normalization=True)        │
│       └── LemitClient                                       │
│       │                                                     │
│       ▼                                                     │
│  2. 📖 Ler planilha de entrada                              │
│       ├── Detectar coluna CPF                               │
│       └── Detectar coluna Escritório                        │
│       │                                                     │
│       ▼                                                     │
│  3. 🏢 Para cada Escritório único:                          │
│       ├── Buscar no Ploomes via API                         │
│       │    └── get_escritorio_with_advogado_principal()     │
│       ├── Obter advogado principal                          │
│       └── Cachear resultado em escritorios_cache{}          │
│       │                                                     │
│       ▼                                                     │
│  4. 📝 Enriquecer DataFrame                                 │
│       ├── Adicionar __temp_escritorio__                     │
│       ├── Adicionar __temp_advogado__                       │
│       └── Salvar arquivo temporário                         │
│       │                                                     │
│       ▼                                                     │
│  5. 🔍 Enriquecer via LEMIT                                 │
│       ├── Tem CPF? → processar_fluxo_com_cpf()              │
│       └── Sem CPF? → processar_fluxo_com_nome()             │
│       │                                                     │
│       ▼                                                     │
│  6. 📊 Preparar dados para relatório                        │
│       │                                                     │
│       ▼                                                     │
│  7. 📋 Gerar relatório Excel                                │
│       │                                                     │
│       ▼                                                     │
│  8. 🧹 Limpar arquivo temporário                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"input_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo Excel/CSV de entrada"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"output_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo CSV de saída"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Logger configurado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tags"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"List[str]"})}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"None"})}),e.jsx("td",{children:"Lista de tags/marcadores a adicionar"})]})]})]}),e.jsx("h4",{children:"Colunas Obrigatórias"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Coluna"}),e.jsx("th",{children:"Aliases"}),e.jsx("th",{children:"Obrigatório"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Escritório"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"escritorio"})}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CNJ"}),e.jsxs("td",{children:[e.jsx("code",{className:"code-block",children:"cnj"}),","," ",e.jsx("code",{className:"code-block",children:"processo"})]}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Reclamante"}),e.jsxs("td",{children:[e.jsx("code",{className:"code-block",children:"reclamante"}),","," ",e.jsx("code",{className:"code-block",children:"nome"})]}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CPF"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"cpf"})}),e.jsx("td",{children:"❌ (usa Nome se ausente)"})]})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Workflows Combinados (Pipeline Completo)"}),e.jsxs("div",{className:"method-block",children:[e.jsx("h3",{id:"executar_pipeline_completo",children:"executar_pipeline_completo"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Arquivo:"})," ",e.jsx("code",{className:"code-block",children:"src/workflows/combined_workflows.py"})]}),e.jsx(a,{code:`def executar_pipeline_completo(
    input_file: str,
    output_file: str,
    logger: logging.Logger,
    fluxo_lemit: str = "cpf",  # ou "nome"
    tags: list = None,
    fetch_socios: bool = False,
) -> int`}),e.jsx("p",{children:"Executa o pipeline completo de processamento LEMIT → Ploomes usando CPF ou Nome como identificador."}),e.jsx("h4",{children:"Pipeline Completo (6 Etapas)"}),e.jsx(a,{code:`┌─────────────────────────────────────────────────────────────┐
│                   PIPELINE COMPLETO                         │
│              (Workflow: cpf ou nome)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📋 ETAPA 1/6: Processar dados do LEMIT                     │
│       ├── fluxo_lemit="cpf" → processar_fluxo_com_cpf()     │
│       └── fluxo_lemit="nome" → processar_fluxo_com_nome()   │
│       │                                                     │
│       ▼                                                     │
│  📋 ETAPA 2/6: Criar modelo de advogados/escritórios        │
│       └── ploomes_client.create_model_from_data()           │
│       │                                                     │
│       ▼                                                     │
│  📤 ETAPA 3/6: Importar contatos para o Ploomes             │
│       └── ploomes_client.import_to_ploomes()                │
│       │                                                     │
│       ▼                                                     │
│  🔄 ETAPA 4/6: Enriquecer com informações do Ploomes        │
│       └── excel_processor.enriquecer_com_resultado_ploomes()│
│       │                                                     │
│       ▼                                                     │
│  💾 ETAPA 5/6: Gerar arquivo CSV final                      │
│       └── excel_processor._escrever_arquivo_saida()         │
│       │                                                     │
│       ▼                                                     │
│  📊 ETAPA 6/6: Gerar relatório de importação                │
│       └── excel_processor.export_results_to_excel()         │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}),e.jsx("h4",{children:"Parâmetros"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Parâmetro"}),e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Padrão"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"input_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo Excel de entrada"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"output_file"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Caminho do arquivo CSV de saída"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"logger"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"logging.Logger"})}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"Logger configurado"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"fluxo_lemit"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"str"})}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:'"cpf"'})}),e.jsx("td",{children:'Tipo de busca LEMIT ("cpf" ou "nome")'})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"tags"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"list"})}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"None"})}),e.jsx("td",{children:"Lista de tags/marcadores"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"fetch_socios"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"bool"})}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"False"})}),e.jsx("td",{children:"Buscar advogados sócios via API LEMIT"})]})]})]}),e.jsx("h4",{children:"Colunas Obrigatórias"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Coluna"}),e.jsx("th",{children:"Aliases"}),e.jsx("th",{children:"cpf"}),e.jsx("th",{children:"nome"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"CNJ"}),e.jsxs("td",{children:[e.jsx("code",{className:"code-block",children:"cnj"}),","," ",e.jsx("code",{className:"code-block",children:"processo"})]}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Reclamante"}),e.jsxs("td",{children:[e.jsx("code",{className:"code-block",children:"reclamante"}),","," ",e.jsx("code",{className:"code-block",children:"nome"})]}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CPF"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"cpf"})}),e.jsx("td",{children:"⚠️"}),e.jsx("td",{children:"❌"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Escritório"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"escritorio"})}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Advogado"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"advogado"})}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"OAB"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"oab"})}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"✅"})]})]})]}),e.jsx("p",{children:e.jsx("small",{children:"scritório OU (Advogado + OAB) são obrigatórios"})}),e.jsx("h4",{children:"Arquivos Gerados"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Arquivo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("code",{className:"code-block",children:["saida_preliminar_lemit_","{cpf|nome}",".csv"]})}),e.jsx("td",{children:"Dados LEMIT intermediários"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"{output_file}"})}),e.jsx("td",{children:"Planilha final com dados enriquecidos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("code",{className:"code-block",children:["output/reports/","{base_name}","_relatorio.xlsx"]})}),e.jsx("td",{children:"Relatório de importação"})]})]})]})]})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Detecção Automática de Workflow"}),e.jsx("p",{children:"O sistema detecta automaticamente o workflow apropriado baseado nas colunas preenchidas no arquivo de entrada."}),e.jsx("h3",{children:"Matriz de Detecção"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Colunas com Valores"}),e.jsx("th",{children:"Workflow Detectado"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"OAB/Advogado + CPF"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"cpf"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"OAB/Advogado + Nome (sem CPF)"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"nome"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"OAB/Advogado (sem dados reclamante)"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ploomes-only"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Escritório + (CPF ou Nome) sem Advogado"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"escritorio-only"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"CPF (sem Advogado/Escritório)"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"lemit-cpf"})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Nome (sem Advogado/Escritório/CPF)"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"lemit-nome"})})]})]})]}),e.jsx("h3",{children:"Uso da Detecção Automática"}),e.jsx(a,{code:`# O sistema detecta automaticamente o melhor workflow
python main.py --input-file dados.xlsx

# Equivalente a especificar manualmente:
python main.py --input-file dados.xlsx --fluxo <workflow_detectado>`}),e.jsx("h3",{children:"Código de Detecção"}),e.jsx(a,{code:`# Em main.py
router = WorkflowRouter(logger)

if not fluxo:
    fluxo = router.detect_workflow(args.input_file)
    if not fluxo:
        logger.error("Não foi possível determinar o workflow automaticamente")
        return 1`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Validação de Colunas"}),e.jsx("p",{children:"Antes de executar qualquer workflow, o sistema valida as colunas obrigatórias."}),e.jsx("h3",{children:"Tipos de Validação"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Tipo"}),e.jsx("th",{children:"Símbolo"}),e.jsx("th",{children:"Descrição"}),e.jsx("th",{children:"Comportamento"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Obrigatório"}),e.jsx("td",{children:"✅"}),e.jsx("td",{children:"Coluna deve existir e ter valores"}),e.jsx("td",{children:"Bloqueia execução"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Recomendado"}),e.jsx("td",{children:"⚠️"}),e.jsx("td",{children:"Coluna pode estar vazia"}),e.jsx("td",{children:"Gera warning"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Opcional"}),e.jsx("td",{children:"❌"}),e.jsx("td",{children:"Coluna não é necessária"}),e.jsx("td",{children:"Ignorado"})]})]})]}),e.jsx("h3",{children:"Mensagens de Erro"}),e.jsx(a,{code:`❌ Coluna obrigatória não encontrada: CNJ
❌ Coluna 'Reclamante' tem 5 linha(s) vazia(s): linhas 2, 5, 8, 12, 15`}),e.jsx("h3",{children:"Mensagens de Warning"}),e.jsx(a,{code:`⚠️ Coluna 'CPF' tem 3 linha(s) vazia(s): linhas 4, 7, 9. Busca será por Nome para essas linhas.
⚠️ Escritório e Advogado/OAB detectados. Prioridade: Escritório`}),e.jsx("h3",{children:"Código de Validação"}),e.jsx(a,{code:`# Em main.py
validation_result = router.validate_required_columns(
    args.input_file,
    workflow=fluxo
)

if not validation_result["valid"]:
    logger.error("❌ VALIDAÇÃO FALHOU")
    for error in validation_result["errors"]:
        logger.error(f"   {error}")
    return 1`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Observabilidade"}),e.jsx("p",{children:"Todos os workflows incluem recursos completos de observabilidade."}),e.jsx("h3",{children:"Recursos Disponíveis"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Recurso"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"📝 Logging estruturado"}),e.jsxs("td",{children:["Com ",e.jsx("code",{className:"code-block",children:"correlation_id"})," para rastreamento"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"⏱️ Métricas de tempo"}),e.jsx("td",{children:"Por operação e total"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"📊 Estatísticas"}),e.jsx("td",{children:"Total, sucesso, falha por workflow"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"📈 Relatórios Excel"}),e.jsx("td",{children:"Detalhamento completo de operações"})]})]})]}),e.jsx("h3",{children:"Métricas Coletadas"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Métrica"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"total_detections"}),e.jsx("td",{children:"Total de workflows detectados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"workflow_counts"}),e.jsx("td",{children:"Contagem por tipo de workflow"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"detect_workflow"}),e.jsx("td",{children:"Tempo de detecção"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"validate_columns"}),e.jsx("td",{children:"Tempo de validação"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"total_records"}),e.jsx("td",{children:"Total de registros processados"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"processed_records"}),e.jsx("td",{children:"Registros processados com sucesso"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"failed_records"}),e.jsx("td",{children:"Registros com falha"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"total_requests"}),e.jsx("td",{children:"Requisições à API CNA"})]})]})]}),e.jsx("h3",{children:"Exemplo de Métricas no Log"}),e.jsx(a,{code:`📊 RESUMO DE MÉTRICAS [ID: abc123]
⏱️  Duração total: 125.30s
📈 Total de operações: 150
✅ Operações bem-sucedidas: 142
❌ Operações com falha: 8
📊 Taxa de sucesso: 94.7%
⚡ Latência média: 835.20ms`})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Exemplos de Uso"}),e.jsx("h3",{children:"Fluxo Básico com Detecção Automática"}),e.jsx(a,{code:"python main.py --input-file entrada.xlsx"}),e.jsx("h3",{children:"Pipeline Completo com Todas as Opções"}),e.jsx(a,{code:`python main.py \\
  --input-file dados.xlsx \\
  --output-file output/resultado.csv \\
  --fluxo cpf \\
  --tags "Lote 1,Prospect,2024" \\
  --fetch-socios \\
  --log-level DEBUG \\
  --config config/settings.ini`}),e.jsx("h3",{children:"Apenas Enriquecimento LEMIT"}),e.jsx(a,{code:`# Por CPF
python main.py --input-file reclamantes.xlsx --fluxo lemit-cpf

# Por Nome
python main.py --input-file reclamantes.xlsx --fluxo lemit-nome`}),e.jsx("h3",{children:"Apenas Importação Ploomes"}),e.jsx(a,{code:"python main.py --input-file advogados.xlsx --fluxo ploomes-only --fetch-socios"}),e.jsx("h3",{children:"Busca de Escritório com Enriquecimento"}),e.jsx(a,{code:'python main.py --input-file escritorios.xlsx --fluxo escritorio-only --tags "Lote 1"'}),e.jsx("h3",{children:"Pipeline Completo por Nome"}),e.jsx(a,{code:"python main.py --input-file dados_sem_cpf.xlsx --fluxo nome"})]}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Referências"}),e.jsxs("table",{className:"params-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Módulo"}),e.jsx("th",{children:"Arquivo"}),e.jsx("th",{children:"Descrição"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Main"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"src/main.py"})}),e.jsx("td",{children:"Script principal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Workflow Router"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"src/workflows/workflow_router.py"})}),e.jsx("td",{children:"Detecção e validação"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"LEMIT Workflows"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"src/workflows/lemit_workflows.py"})}),e.jsx("td",{children:"Fluxos apenas LEMIT"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Ploomes Workflows"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"src/workflows/ploomes_workflows.py"})}),e.jsx("td",{children:"Fluxos apenas Ploomes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Combined Workflows"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"src/workflows/combined_workflows.py"})}),e.jsx("td",{children:"Pipelines completos"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Escritorio Workflow"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"src/workflows/escritorio_workflow.py"})}),e.jsx("td",{children:"Fluxo de escritório"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"ExcelProcessor"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ploomes_integration/clients/excel_processor.py"})}),e.jsx("td",{children:"Processador de Excel"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"PloomesClient"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ploomes_integration/client.py"})}),e.jsx("td",{children:"Cliente Ploomes"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"LemitClient"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"src/lemit_automation/lemit_client.py"})}),e.jsx("td",{children:"Cliente LEMIT"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"PloomesAPI"}),e.jsx("td",{children:e.jsx("code",{className:"code-block",children:"ploomes_integration/api.py"})}),e.jsx("td",{children:"API Ploomes"})]})]})]})]})]})}const dn=[{title:"API Clients",pages:[{path:"cna-client",name:"CNAClient",component:Dm,functions:["__init__","consultar_advogado","consultar_sociedade","obter_estatisticas","reset_estatisticas"]},{path:"ploomes-api",name:"PloomesAPI",component:Um,functions:["__init__","_handle_request","get_metrics_summary","get_contact_by_name_and_type","check_contact_field_filled","create_contact","patch_contact","apply_tag","contact_has_tag","get_deal_by_cnj","create_deal","patch_deal","get_deals_by_contact_id","get_office_by_name"]},{path:"ploomes-client",name:"PloomesClient",component:qm,functions:["__init__","map_escritorio_to_ploomes","map_advogado_to_ploomes","create_complete_contact_set","_process_escritorio","_process_advogado","import_to_ploomes","_expand_results_to_original_rows","create_model_from_data","process_advogados_to_csv","processar_cnjs_excel","create_deal","update_deal","get_deal_by_cnj","get_stage_id_by_pipeline_and_name","_load_field_mappings","_estatisticas_cna","_init_lemit"]},{path:"lemit-client",name:"LemitClient",component:Mm,functions:["consultar_pessoa_por_cpf","get_advogados_socios","consultar_pessoa_por_nome","enriquecer_contato_com_cpf","enriquecer_contato_com_nome","consultar","setup_driver","login","navigate_to_cpf_query_page","upload_cpf_file","wait_for_processing_and_download","close"]}]},{title:"Services",pages:[{path:"contact-service",name:"ContactService",component:Lm,functions:["__init__","get_stats","upsert_contact","apply_tag","apply_tag_if_missing","map_escritorio","map_advogado","map_reclamante","_check_b2b_deal"]},{path:"deal-service",name:"DealService",component:Om,functions:["__init__","create_deal","update_deal","get_deal_by_cnj"]},{path:"processing",name:"Processing",component:Vm,functions:["__init__","build_contact_groups_from_excel","get_stats","cnpj_cache","processing_cache","advogado_cache","clear_cache","_process_one_advogado","_get_or_create_escritorio","_buscar_advogados_socios","_buscar_oab_socio","_clean_advogado","EscritorioData","AdvogadoData","ConjuntoContatoDict","ProcessingResult"]}]},{title:"Mappers",pages:[{path:"contact-mapper",name:"Contact Mappers",component:zm,functions:["__init__","create_base_contact","add_other_property","process_conditional_fields","process_phone_fields","process_email_fields","map_to_ploomes_escritorio","map_to_ploomes_advogado","map_to_ploomes_reclamante","map_to_ploomes_deal","_create_phones_list","factory_get_escritorio_mapper","factory_get_advogado_mapper","factory_get_reclamante_mapper","factory_get_deal_mapper"]}]},{title:"Data Processing",pages:[{path:"cnpj-scraper",name:"CNPJScraper",component:Tm,functions:["__init__","consultar_cnpj","consultar_cnpj_com_nome","_try_provider","limpar_cache","obter_estatisticas_cache","cleanup"]},{path:"cnpj-strategies",name:"CNPJ Strategies",component:Rm,functions:["CNPJStrategy","EmpresaDoisStrategy","EmpresaBizzStrategy"]},{path:"lemit-processor",name:"LemitProcessor",component:Bm,functions:["__init__","clean_lemit_result","_normalizar_entrada_csv","_extrair_dados_linha","_escrever_csv"]},{path:"escritorio-normalizer",name:"EscritorioNormalizer",component:Im,functions:["__init__","normalize","normalize_for_output","is_enabled","_load_mapping","_find_best_match"]}]},{title:"I/O & Export",pages:[{path:"tabular-io",name:"TabularIO",component:Wm,functions:["read_excel","read_csv","read_file","write_excel","write_csv","validate_columns","validate_file_security"]},{path:"result-exporter",name:"ResultExporter",component:Jm,functions:["__init__","export_results_to_excel","_validate_results","_prepare_output_path","_process_results","_process_single_result","_normalize_name","_collect_skip_reasons","_create_error_row","_count_operations","_build_reclamantes_data","_write_excel","_log_summary"]},{path:"row-builder",name:"RowBuilder",component:Hm,functions:["__init__","get_output_headers","build_linha","_normalize_escritorio","_format_cpf_safe","_ls"]}]},{title:"Core",pages:[{path:"workflows",name:"Workflows",component:$m,functions:["__init__","get_stats","detect_workflow","validate_required_columns","executar_fluxo_lemit_cpf","executar_fluxo_lemit_nome","executar_fluxo_ploomes_only","executar_fluxo_advogados","executar_fluxo_escritorio_only","executar_pipeline_completo"]},{path:"exceptions",name:"Exceptions",component:Fm,functions:["PloomesClientError","InvalidUserKeyError","PloomesAPIError","FileProcessingError","MissingColumnError","ValidationError","ConfigurationError","NetworkError"]}]}],Qd=dn.flatMap(s=>s.pages),Gm=Qd.flatMap(s=>{const r=[{page:s.name,path:s.path,function:null}];return s.functions&&s.functions.forEach(t=>{r.push({page:s.name,path:s.path,function:t})}),r});function Qm(){const[s,r]=C.useState(""),[t,o]=C.useState(!1),i=Jd(),n=C.useMemo(()=>{if(!s.trim())return[];const c=s.toLowerCase();return Gm.filter(d=>d.page.toLowerCase().includes(c)||d.function&&d.function.toLowerCase().includes(c)).slice(0,8)},[s]),l=c=>{const d=c.function?`/docs/${c.path}#${c.function}`:`/docs/${c.path}`;i(d),r(""),o(!1),c.function&&setTimeout(()=>{const h=document.getElementById(c.function);h&&h.scrollIntoView({behavior:"smooth",block:"start"})},100)};return e.jsxs("div",{className:"sidebar-search",children:[e.jsxs("div",{className:"search-input-wrapper",children:[e.jsxs("svg",{className:"search-icon",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"M21 21l-4.35-4.35"})]}),e.jsx("input",{type:"text",className:"search-input",placeholder:"Search docs...",value:s,onChange:c=>r(c.target.value),onFocus:()=>o(!0),onBlur:()=>setTimeout(()=>o(!1),150)})]}),t&&s&&e.jsx("div",{className:"search-results",children:n.length>0?n.map((c,d)=>e.jsxs("div",{className:"search-result-item",onMouseDown:()=>l(c),children:[e.jsx("span",{className:"result-page",children:c.page}),c.function&&e.jsxs("span",{className:"result-function",children:["→ ",c.function]})]},`${c.path}-${c.function||"page"}-${d}`)):e.jsx("div",{className:"search-no-results",children:"No results found"})})]})}function Xm({page:s}){const t=Ms().pathname===`/docs/${s.path}`,[o,i]=C.useState(t);C.useEffect(()=>{t&&i(!0)},[t]);const n=l=>{setTimeout(()=>{const c=document.getElementById(l);c&&c.scrollIntoView({behavior:"smooth",block:"start"})},100)};return e.jsxs("li",{className:`nav-item ${t?"active":""}`,children:[e.jsxs(mo,{to:`/docs/${s.path}`,className:`nav-item-link ${t?"active":""}`,onClick:l=>{t&&s.functions&&s.functions.length>0&&(l.preventDefault(),i(!o))},children:[e.jsx("span",{className:"nav-item-name",children:s.name}),s.functions&&s.functions.length>0&&e.jsx("button",{className:`nav-toggle ${o?"open":""}`,onClick:l=>{l.preventDefault(),l.stopPropagation(),i(!o)},"aria-label":"Toggle functions",children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 10 10",children:e.jsx("path",{d:"M2.5 4L5 6.5L7.5 4",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round"})})})]}),s.functions&&s.functions.length>0&&e.jsx("ul",{className:`nav-functions ${o?"open":""}`,children:s.functions.map(l=>e.jsx("li",{children:e.jsx(mo,{to:`/docs/${s.path}#${l}`,className:"nav-function-link",onClick:()=>n(l),children:l})},l))})]})}function Km(){const s=Ms(),r=C.useRef(null);return C.useEffect(()=>{!s.hash&&r.current&&setTimeout(()=>{r.current&&(r.current.scrollTop=0)},0)},[s.pathname]),e.jsxs("div",{className:"app-container",children:[e.jsxs("aside",{className:"sidebar",children:[e.jsx("div",{className:"sidebar-header",children:e.jsxs(mo,{to:"/",className:"sidebar-header-link",children:[e.jsx("span",{className:"sidebar-logo",children:"◆"}),e.jsx("span",{className:"sidebar-title",children:"Documentation"})]})}),e.jsx(Qm,{}),e.jsx("nav",{className:"sidebar-nav",children:dn.map(t=>e.jsxs("div",{className:"nav-category",children:[e.jsx("div",{className:"nav-category-title",children:t.title}),e.jsx("ul",{children:t.pages.map(o=>e.jsx(Xm,{page:o},o.path))})]},t.title))}),e.jsx("div",{className:"sidebar-footer",children:e.jsx("span",{children:"v1.0.0"})})]}),e.jsx("main",{className:"main-content",ref:r,children:e.jsxs(jm,{children:[Qd.map(t=>e.jsx(ln,{path:`/docs/${t.path}`,element:e.jsx(t.component,{})},t.path)),e.jsx(ln,{path:"/",element:e.jsxs("div",{className:"doc-page",children:[e.jsx("h1",{children:"Documentação - Algoritmo de Enriquecimento de Leads"}),e.jsx("p",{className:"doc-subtitle",children:"Selecione um módulo para começar."}),e.jsxs("section",{className:"doc-section",children:[e.jsx("h2",{children:"Navegação Rápida"}),e.jsx("div",{className:"home-grid",children:dn.map(t=>e.jsxs("div",{className:"home-card",children:[e.jsx("h3",{children:t.title}),e.jsx("ul",{children:t.pages.map(o=>e.jsx("li",{children:e.jsx(mo,{to:`/docs/${o.path}`,children:o.name})},o.path))})]},t.title))})]})]})})]})})]})}function Zm(){return e.jsx(Cm,{children:e.jsx(Km,{})})}hi.createRoot(document.getElementById("root")).render(e.jsx(jn.StrictMode,{children:e.jsx(Zm,{})}));
