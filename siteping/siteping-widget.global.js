var SitePing=(function(exports){'use strict';var Rh=Object.create;var cs=Object.defineProperty;var Oh=Object.getOwnPropertyDescriptor;var Nh=Object.getOwnPropertyNames;var Ph=Object.getPrototypeOf,_h=Object.prototype.hasOwnProperty;var dA=(s,n,i)=>()=>{if(i)throw i[0];try{return s&&(n=s(s=0)),n}catch(a){throw i=[a],a}};var Gh=(s,n)=>()=>{try{return n||s((n={exports:{}}).exports,n),n.exports}catch(i){throw n=0,i}},He=(s,n)=>{for(var i in n)cs(s,i,{get:n[i],enumerable:true});},Vh=(s,n,i,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let l of Nh(n))!_h.call(s,l)&&l!==i&&cs(s,l,{get:()=>n[l],enumerable:!(a=Oh(n,l))||a.enumerable});return s};var Xh=(s,n,i)=>(i=s!=null?Rh(Ph(s)):{},Vh(cs(i,"default",{value:s,enumerable:true}),s));function Ut(s){return Zo.test(s)}var Zo,qo=dA(()=>{"use strict";Zo=/^(?!\.)(?!.*\.\.)[\p{L}\p{N}!#$%&'*+/=?^_`{|}~.-]{0,63}[\p{L}\p{N}!#$%&'*+/=?^_`{|}~-]@(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]{0,61}[\p{L}\p{N}])?\.)+[\p{L}\p{N}-]{2,63}$/u;});var $A,fe,Ht,kt,ds=dA(()=>{"use strict";$A=class extends Error{code;retryable;constructor(n,i,a){super(n),this.code=i,this.retryable=a,this.name="SitepingError";}},fe=class extends $A{constructor(n){super(n,"NETWORK",!0),this.name="SitepingNetworkError";}},Ht=class extends $A{constructor(n){super(n,"VALIDATION",!1),this.name="SitepingValidationError";}},kt=class extends $A{constructor(n){super(n,"AUTH",!1),this.name="SitepingAuthError";}};});function Aa(s){return typeof s=="object"&&s!==null}function ke(s,n){return Aa(s)&&n in s}var ea=dA(()=>{"use strict";});function fA(s){return Dr.includes(s)}function hs(s,n=new Date){return fA(s)?{status:s,resolvedAt:n}:{status:s,resolvedAt:null}}function gs(s){return {cssSelector:s.anchor.cssSelector,xpath:s.anchor.xpath,textSnippet:s.anchor.textSnippet,elementTag:s.anchor.elementTag,elementId:s.anchor.elementId,textPrefix:s.anchor.textPrefix,textSuffix:s.anchor.textSuffix,fingerprint:s.anchor.fingerprint,neighborText:s.anchor.neighborText,anchorKey:s.anchor.anchorKey??null,xPct:s.rect.xPct,yPct:s.rect.yPct,wPct:s.rect.wPct,hPct:s.rect.hPct,scrollX:s.scrollX,scrollY:s.scrollY,viewportW:s.viewportW,viewportH:s.viewportH,devicePixelRatio:s.devicePixelRatio}}var ps,us,Dr,Bs=dA(()=>{"use strict";ps=["en","fr","de","es","it","pt","ru"],us=["open","in_progress","resolved","wont_fix"],Dr=["resolved","wont_fix"];});function fs(s){return (s.split("-")[0]??s).toLowerCase()}function ws(s,n){let i={en:s};function a(l){return l!=="en"&&ps.includes(l)}return {registerLocale(l,d){i[fs(l)]=d;},async loadLocale(l){let d=fs(l),p=i[d];if(p)return p;if(!a(d))return null;let B=await n[d]();return i[d]=B,B},createT(l){let d=fs(l);return d!=="en"&&!i[d]&&!a(d)&&console.warn(`[siteping] Unknown locale "${l}", falling back to "en"`),p=>i[d]?.[p]??s[p]??p}}}function ms(s,n){return s.replace(/\{(\w+)\}/g,(i,a)=>{let l=n[a];return l===void 0?i:String(l)})}function bs(s,n,i){return ms(s(n),i)}var ta=dA(()=>{"use strict";Bs();});function Cs(s){let n=new URLSearchParams({projectName:s.projectName});return s.page&&n.set("page",String(s.page)),s.limit&&n.set("limit",String(s.limit)),s.type&&n.set("type",s.type),s.status&&n.set("status",s.status),s.statuses?.length&&n.set("statuses",s.statuses.join(",")),s.search&&n.set("search",s.search),s.url&&n.set("url",s.url),s.urlPattern&&n.set("urlPattern",s.urlPattern),n}async function Ie(s,n){let i=await s.text().catch(()=>"Unknown error"),a=i?`${s.status} ${i}`:`${s.status}`,l=`${n}: ${a}`;return s.status===401||s.status===403?new kt(l):s.status>=400&&s.status<500?new Ht(l):new $A(l,"SERVER",false)}function Se(s,n){if(s instanceof fe)return s;let i=s instanceof Error?s.message:String(s);return new fe(`${n}: ${i}`)}var ra=dA(()=>{"use strict";ds();});var GA=dA(()=>{"use strict";qo();ds();ta();ea();Bs();ra();});function V(s){let a=document.createRange().createContextualFragment(s).firstElementChild;if(a?.nodeName.toLowerCase()!=="svg")throw new Error("[siteping] Invalid SVG string");for(let l of [...a.attributes])l.name.startsWith("on")&&a.removeAttribute(l.name);for(let l of a.querySelectorAll("*"))for(let d of [...l.attributes])d.name.startsWith("on")&&l.removeAttribute(d.name);return a}function b(s,n){let i=document.createElement(s);if(n)for(let[a,l]of Object.entries(n))a==="class"?i.className=l:a==="style"?i.style.cssText=l:i.setAttribute(a,l);return i}function E(s,n){s.textContent=n;}function Le(s){let n=Array.from(s.childNodes).map(i=>i.cloneNode(true));return s.disabled=true,s.replaceChildren(b("div",{class:"sp-spinner sp-spinner--sm"})),()=>{s.replaceChildren(...n),s.disabled=false;}}function Mr(s,n="en"){let i=Date.now()-new Date(s).getTime(),a=Math.floor(i/1e3);if(a<60)return new Intl.RelativeTimeFormat(n,{numeric:"auto"}).format(0,"second");let l=new Intl.RelativeTimeFormat(n,{numeric:"always",style:"narrow"}),d=Math.floor(a/60);if(d<60)return l.format(-d,"minute");let p=Math.floor(d/60);if(p<24)return l.format(-p,"hour");let B=Math.floor(p/24);return B<7?l.format(-B,"day"):new Date(s).toLocaleDateString(n)}var IA=dA(()=>{"use strict";});var Hs,ks,Is,Rr,ga,Or,Nr,Pr,_r,Gr,Ss,Ba,fa,wa,Ls,ma,ba,Vr=dA(()=>{"use strict";Hs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1" fill="currentColor" stroke="none"/></svg>',ks='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',Is='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',Rr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',ga='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',Or='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',Nr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',Pr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',_r='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 9h2"/><path d="M3 9h2"/><path d="M19 13h2"/><path d="M3 13h2"/><path d="M19 17h2"/><path d="M3 17h2"/><path d="M10 2h4"/></svg>',Gr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',Ss='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',Ba='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></svg>',fa='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',wa='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',Ls='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',ma='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',ba='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>';});function og(s){if(sg.test(s))return s;let n=Ca.test(s)?s.match(Ca):null;return n?`#${n[1]}${n[1]}${n[2]}${n[2]}${n[3]}${n[3]}`:ig.test(s)?s.slice(0,7):(console.warn(`[siteping] Invalid accentColor "${s}" \u2014 only hex colors (#RGB, #RRGGBB, #RRGGBBAA) are supported. Using default.`),va)}function ag(s,n){let i=Math.max(0,Math.round(parseInt(s.slice(1,3),16)*(1-n))),a=Math.max(0,Math.round(parseInt(s.slice(3,5),16)*(1-n))),l=Math.max(0,Math.round(parseInt(s.slice(5,7),16)*(1-n)));return `#${i.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}${l.toString(16).padStart(2,"0")}`}function lg(){return typeof window>"u"?false:window.matchMedia("(prefers-color-scheme: dark)").matches}function cg(s){return s==="dark"||s==="auto"&&lg()?"dark":"light"}function ya(s=va,n){let i=og(s),a=ag(i,.15);return cg(n)==="dark"?{accent:i,accentLight:i+"22",accentDark:a,accentGlow:i+"44",accentGradient:`linear-gradient(135deg, ${i}, ${a})`,bg:"#0f172a",bgHover:"#1e293b",text:"#f1f5f9",textSecondary:"#94a3b8",textTertiary:"#64748b",border:"#334155",shadow:"rgba(0, 0, 0, 0.3)",glassBg:"rgba(15, 23, 42, 0.78)",glassBgHeavy:"rgba(15, 23, 42, 0.88)",glassBorder:"rgba(51, 65, 85, 0.5)",glassBorderSubtle:"rgba(51, 65, 85, 0.3)",typeQuestion:"#60a5fa",typeChange:"#fbbf24",typeBug:"#f87171",typeOther:"#94a3b8",typeQuestionBg:"rgba(59, 130, 246, 0.15)",typeChangeBg:"rgba(245, 158, 11, 0.15)",typeBugBg:"rgba(239, 68, 68, 0.15)",typeOtherBg:"rgba(100, 116, 139, 0.15)",statusOpen:"#4ade80",statusOpenBg:"rgba(74, 222, 128, 0.15)",statusResolved:"#94a3b8",statusResolvedBg:"rgba(148, 163, 184, 0.15)",statusInProgress:"#fbbf24",statusInProgressBg:"rgba(245, 158, 11, 0.15)",statusWontFix:"#94a3b8",statusWontFixBg:"rgba(148, 163, 184, 0.15)"}:{accent:i,accentLight:i+"14",accentDark:a,accentGlow:i+"33",accentGradient:`linear-gradient(135deg, ${i}, ${a})`,bg:"#ffffff",bgHover:"#f8f9fb",text:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",border:"#e2e8f0",shadow:"rgba(0, 0, 0, 0.06)",glassBg:"rgba(255, 255, 255, 0.72)",glassBgHeavy:"rgba(255, 255, 255, 0.85)",glassBorder:"rgba(255, 255, 255, 0.35)",glassBorderSubtle:"rgba(255, 255, 255, 0.18)",typeQuestion:"#3b82f6",typeChange:"#b45309",typeBug:"#ef4444",typeOther:"#64748b",typeQuestionBg:"#eff6ff",typeChangeBg:"#fffbeb",typeBugBg:"#fef2f2",typeOtherBg:"#f8fafc",statusOpen:"#16a34a",statusOpenBg:"#f0fdf4",statusResolved:"#64748b",statusResolvedBg:"#f1f5f9",statusInProgress:"#d97706",statusInProgressBg:"#fffbeb",statusWontFix:"#64748b",statusWontFixBg:"#f1f5f9"}}function DA(s,n){switch(s){case "question":return n.typeQuestion;case "change":return n.typeChange;case "bug":return n.typeBug;default:return n.typeOther}}function Qa(s,n){switch(s){case "in_progress":return n.statusInProgress;case "resolved":return n.statusResolved;case "wont_fix":return n.statusWontFix;default:return n.statusOpen}}function Fa(s,n){switch(s){case "in_progress":return n.statusInProgressBg;case "resolved":return n.statusResolvedBg;case "wont_fix":return n.statusWontFixBg;default:return n.statusOpenBg}}function re(s,n){switch(s){case "question":return n.typeQuestionBg;case "change":return n.typeChangeBg;case "bug":return n.typeBugBg;default:return n.typeOtherBg}}function xa(s){return `
    --sp-accent: ${s.accent};
    --sp-accent-light: ${s.accentLight};
    --sp-accent-dark: ${s.accentDark};
    --sp-accent-glow: ${s.accentGlow};
    --sp-accent-gradient: ${s.accentGradient};
    --sp-bg: ${s.bg};
    --sp-bg-hover: ${s.bgHover};
    --sp-text: ${s.text};
    --sp-text-secondary: ${s.textSecondary};
    --sp-text-tertiary: ${s.textTertiary};
    --sp-border: ${s.border};
    --sp-shadow: ${s.shadow};
    --sp-glass-bg: ${s.glassBg};
    --sp-glass-bg-heavy: ${s.glassBgHeavy};
    --sp-glass-border: ${s.glassBorder};
    --sp-glass-border-subtle: ${s.glassBorderSubtle};
    --sp-type-question: ${s.typeQuestion};
    --sp-type-change: ${s.typeChange};
    --sp-type-bug: ${s.typeBug};
    --sp-type-other: ${s.typeOther};
    --sp-type-question-bg: ${s.typeQuestionBg};
    --sp-type-change-bg: ${s.typeChangeBg};
    --sp-type-bug-bg: ${s.typeBugBg};
    --sp-type-other-bg: ${s.typeOtherBg};
    --sp-radius: 12px;
    --sp-radius-lg: 16px;
    --sp-radius-xl: 20px;
    --sp-radius-full: 9999px;
    --sp-blur: 20px;
    --sp-blur-heavy: 32px;
    --sp-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
    --sp-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04);
    --sp-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
    --sp-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.04);
    --sp-shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06);
    --sp-font: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  `}var va,sg,Ca,ig,we=dA(()=>{"use strict";va="#0066ff",sg=/^#[0-9a-fA-F]{6}$/,Ca=/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/,ig=/^#[0-9a-fA-F]{8}$/;});var Ea=Gh((Ts,Ds)=>{"use strict";(function(s,n){typeof Ts=="object"&&typeof Ds<"u"?Ds.exports=n():typeof define=="function"&&define.amd?define(n):(s=typeof globalThis<"u"?globalThis:s||self,s.html2canvas=n());})(Ts,(function(){"use strict";var s=function(e,A){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t;}||function(r,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(r[o]=t[o]);},s(e,A)};function n(e,A){if(typeof A!="function"&&A!==null)throw new TypeError("Class extends value "+String(A)+" is not a constructor or null");s(e,A);function r(){this.constructor=e;}e.prototype=A===null?Object.create(A):(r.prototype=A.prototype,new r);}var i=function(){return i=Object.assign||function(A){for(var r,t=1,o=arguments.length;t<o;t++){r=arguments[t];for(var c in r)Object.prototype.hasOwnProperty.call(r,c)&&(A[c]=r[c]);}return A},i.apply(this,arguments)};function a(e,A,r,t){function o(c){return c instanceof r?c:new r(function(u){u(c);})}return new(r||(r=Promise))(function(c,u){function g(m){try{f(t.next(m));}catch(v){u(v);}}function h(m){try{f(t.throw(m));}catch(v){u(v);}}function f(m){m.done?c(m.value):o(m.value).then(g,h);}f((t=t.apply(e,A||[])).next());})}function l(e,A){var r={label:0,sent:function(){if(c[0]&1)throw c[1];return c[1]},trys:[],ops:[]},t,o,c,u;return u={next:g(0),throw:g(1),return:g(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function g(f){return function(m){return h([f,m])}}function h(f){if(t)throw new TypeError("Generator is already executing.");for(;r;)try{if(t=1,o&&(c=f[0]&2?o.return:f[0]?o.throw||((c=o.return)&&c.call(o),0):o.next)&&!(c=c.call(o,f[1])).done)return c;switch(o=0,c&&(f=[f[0]&2,c.value]),f[0]){case 0:case 1:c=f;break;case 4:return r.label++,{value:f[1],done:!1};case 5:r.label++,o=f[1],f=[0];continue;case 7:f=r.ops.pop(),r.trys.pop();continue;default:if(c=r.trys,!(c=c.length>0&&c[c.length-1])&&(f[0]===6||f[0]===2)){r=0;continue}if(f[0]===3&&(!c||f[1]>c[0]&&f[1]<c[3])){r.label=f[1];break}if(f[0]===6&&r.label<c[1]){r.label=c[1],c=f;break}if(c&&r.label<c[2]){r.label=c[2],r.ops.push(f);break}c[2]&&r.ops.pop(),r.trys.pop();continue}f=A.call(e,r);}catch(m){f=[6,m],o=0;}finally{t=c=0;}if(f[0]&5)throw f[1];return {value:f[0]?f[1]:void 0,done:!0}}}function d(e,A,r){if(r||arguments.length===2)for(var t=0,o=A.length,c;t<o;t++)(c||!(t in A))&&(c||(c=Array.prototype.slice.call(A,0,t)),c[t]=A[t]);return e.concat(c||A)}for(var p=(function(){function e(A,r,t,o){this.left=A,this.top=r,this.width=t,this.height=o;}return e.prototype.add=function(A,r,t,o){return new e(this.left+A,this.top+r,this.width+t,this.height+o)},e.fromClientRect=function(A,r){return new e(r.left+A.windowBounds.left,r.top+A.windowBounds.top,r.width,r.height)},e.fromDOMRectList=function(A,r){var t=Array.from(r).find(function(o){return o.width!==0});return t?new e(t.left+A.windowBounds.left,t.top+A.windowBounds.top,t.width,t.height):e.EMPTY},e.EMPTY=new e(0,0,0,0),e})(),B=function(e,A){return p.fromClientRect(e,A.getBoundingClientRect())},w=function(e){var A=e.body,r=e.documentElement;if(!A||!r)throw new Error("Unable to get document size");var t=Math.max(Math.max(A.scrollWidth,r.scrollWidth),Math.max(A.offsetWidth,r.offsetWidth),Math.max(A.clientWidth,r.clientWidth)),o=Math.max(Math.max(A.scrollHeight,r.scrollHeight),Math.max(A.offsetHeight,r.offsetHeight),Math.max(A.clientHeight,r.clientHeight));return new p(0,0,t,o)},y=function(e){for(var A=[],r=0,t=e.length;r<t;){var o=e.charCodeAt(r++);if(o>=55296&&o<=56319&&r<t){var c=e.charCodeAt(r++);(c&64512)===56320?A.push(((o&1023)<<10)+(c&1023)+65536):(A.push(o),r--);}else A.push(o);}return A},C=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];if(String.fromCodePoint)return String.fromCodePoint.apply(String,e);var r=e.length;if(!r)return "";for(var t=[],o=-1,c="";++o<r;){var u=e[o];u<=65535?t.push(u):(u-=65536,t.push((u>>10)+55296,u%1024+56320)),(o+1===r||t.length>16384)&&(c+=String.fromCharCode.apply(String,t),t.length=0);}return c},F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Q=typeof Uint8Array>"u"?[]:new Uint8Array(256),U=0;U<F.length;U++)Q[F.charCodeAt(U)]=U;for(var M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",G=typeof Uint8Array>"u"?[]:new Uint8Array(256),R=0;R<M.length;R++)G[M.charCodeAt(R)]=R;for(var j=function(e){var A=e.length*.75,r=e.length,t,o=0,c,u,g,h;e[e.length-1]==="="&&(A--,e[e.length-2]==="="&&A--);var f=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(A):new Array(A),m=Array.isArray(f)?f:new Uint8Array(f);for(t=0;t<r;t+=4)c=G[e.charCodeAt(t)],u=G[e.charCodeAt(t+1)],g=G[e.charCodeAt(t+2)],h=G[e.charCodeAt(t+3)],m[o++]=c<<2|u>>4,m[o++]=(u&15)<<4|g>>2,m[o++]=(g&3)<<6|h&63;return f},k=function(e){for(var A=e.length,r=[],t=0;t<A;t+=2)r.push(e[t+1]<<8|e[t]);return r},O=function(e){for(var A=e.length,r=[],t=0;t<A;t+=4)r.push(e[t+3]<<24|e[t+2]<<16|e[t+1]<<8|e[t]);return r},X=5,_=11,z=2,nA=_-X,aA=65536>>X,sA=1<<X,lA=sA-1,SA=1024>>X,Ke=aA+SA,Vt=Ke,ne=32,fn=Vt+ne,Me=65536>>_,Re=1<<nA,rt=Re-1,Xt=function(e,A,r){return e.slice?e.slice(A,r):new Uint16Array(Array.prototype.slice.call(e,A,r))},nt=function(e,A,r){return e.slice?e.slice(A,r):new Uint32Array(Array.prototype.slice.call(e,A,r))},wn=function(e,A){var r=j(e),t=Array.isArray(r)?O(r):new Uint32Array(r),o=Array.isArray(r)?k(r):new Uint16Array(r),c=24,u=Xt(o,c/2,t[4]/2),g=t[5]===2?Xt(o,(c+t[4])/2):nt(t,Math.ceil((c+t[4])/4));return new st(t[0],t[1],t[2],t[3],u,g)},st=(function(){function e(A,r,t,o,c,u){this.initialValue=A,this.errorValue=r,this.highStart=t,this.highValueIndex=o,this.index=c,this.data=u;}return e.prototype.get=function(A){var r;if(A>=0){if(A<55296||A>56319&&A<=65535)return r=this.index[A>>X],r=(r<<z)+(A&lA),this.data[r];if(A<=65535)return r=this.index[aA+(A-55296>>X)],r=(r<<z)+(A&lA),this.data[r];if(A<this.highStart)return r=fn-Me+(A>>_),r=this.index[r],r+=A>>X&rt,r=this.index[r],r=(r<<z)+(A&lA),this.data[r];if(A<=1114111)return this.data[this.highValueIndex]}return this.errorValue},e})(),Wt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Yt=typeof Uint8Array>"u"?[]:new Uint8Array(256),be=0;be<Wt.length;be++)Yt[Wt.charCodeAt(be)]=be;var S="KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",tA=50,uA=1,wA=2,zA=3,se=4,NA=5,FA=7,ie=8,it=9,VA=10,PA=11,ii=12,mn=13,Kl=14,ot=15,bn=16,Jt=17,at=18,Ml=19,oi=20,Cn=21,lt=22,vn=23,Oe=24,LA=25,ct=26,dt=27,Ne=28,Rl=29,Ce=30,Ol=31,$t=32,jt=33,yn=34,Qn=35,Fn=36,pt=37,xn=38,zt=39,Zt=40,En=41,ai=42,Nl=43,Pl=[9001,65288],li="!",Z="\xD7",qt="\xF7",Un=wn(S),ZA=[Ce,Fn],Hn=[uA,wA,zA,NA],ci=[VA,ie],di=[dt,ct],_l=Hn.concat(ci),pi=[xn,zt,Zt,yn,Qn],Gl=[ot,mn],Vl=function(e,A){A===void 0&&(A="strict");var r=[],t=[],o=[];return e.forEach(function(c,u){var g=Un.get(c);if(g>tA?(o.push(!0),g-=tA):o.push(!1),["normal","auto","loose"].indexOf(A)!==-1&&[8208,8211,12316,12448].indexOf(c)!==-1)return t.push(u),r.push(bn);if(g===se||g===PA){if(u===0)return t.push(u),r.push(Ce);var h=r[u-1];return _l.indexOf(h)===-1?(t.push(t[u-1]),r.push(h)):(t.push(u),r.push(Ce))}if(t.push(u),g===Ol)return r.push(A==="strict"?Cn:pt);if(g===ai||g===Rl)return r.push(Ce);if(g===Nl)return c>=131072&&c<=196605||c>=196608&&c<=262141?r.push(pt):r.push(Ce);r.push(g);}),[t,r,o]},kn=function(e,A,r,t){var o=t[r];if(Array.isArray(e)?e.indexOf(o)!==-1:e===o)for(var c=r;c<=t.length;){c++;var u=t[c];if(u===A)return !0;if(u!==VA)break}if(o===VA)for(var c=r;c>0;){c--;var g=t[c];if(Array.isArray(e)?e.indexOf(g)!==-1:e===g)for(var h=r;h<=t.length;){h++;var u=t[h];if(u===A)return !0;if(u!==VA)break}if(g!==VA)break}return !1},ui=function(e,A){for(var r=e;r>=0;){var t=A[r];if(t===VA)r--;else return t}return 0},Xl=function(e,A,r,t,o){if(r[t]===0)return Z;var c=t-1;if(Array.isArray(o)&&o[c]===!0)return Z;var u=c-1,g=c+1,h=A[c],f=u>=0?A[u]:0,m=A[g];if(h===wA&&m===zA)return Z;if(Hn.indexOf(h)!==-1)return li;if(Hn.indexOf(m)!==-1||ci.indexOf(m)!==-1)return Z;if(ui(c,A)===ie)return qt;if(Un.get(e[c])===PA||(h===$t||h===jt)&&Un.get(e[g])===PA||h===FA||m===FA||h===it||[VA,mn,ot].indexOf(h)===-1&&m===it||[Jt,at,Ml,Oe,Ne].indexOf(m)!==-1||ui(c,A)===lt||kn(vn,lt,c,A)||kn([Jt,at],Cn,c,A)||kn(ii,ii,c,A))return Z;if(h===VA)return qt;if(h===vn||m===vn)return Z;if(m===bn||h===bn)return qt;if([mn,ot,Cn].indexOf(m)!==-1||h===Kl||f===Fn&&Gl.indexOf(h)!==-1||h===Ne&&m===Fn||m===oi||ZA.indexOf(m)!==-1&&h===LA||ZA.indexOf(h)!==-1&&m===LA||h===dt&&[pt,$t,jt].indexOf(m)!==-1||[pt,$t,jt].indexOf(h)!==-1&&m===ct||ZA.indexOf(h)!==-1&&di.indexOf(m)!==-1||di.indexOf(h)!==-1&&ZA.indexOf(m)!==-1||[dt,ct].indexOf(h)!==-1&&(m===LA||[lt,ot].indexOf(m)!==-1&&A[g+1]===LA)||[lt,ot].indexOf(h)!==-1&&m===LA||h===LA&&[LA,Ne,Oe].indexOf(m)!==-1)return Z;if([LA,Ne,Oe,Jt,at].indexOf(m)!==-1)for(var v=c;v>=0;){var x=A[v];if(x===LA)return Z;if([Ne,Oe].indexOf(x)!==-1)v--;else break}if([dt,ct].indexOf(m)!==-1)for(var v=[Jt,at].indexOf(h)!==-1?u:c;v>=0;){var x=A[v];if(x===LA)return Z;if([Ne,Oe].indexOf(x)!==-1)v--;else break}if(xn===h&&[xn,zt,yn,Qn].indexOf(m)!==-1||[zt,yn].indexOf(h)!==-1&&[zt,Zt].indexOf(m)!==-1||[Zt,Qn].indexOf(h)!==-1&&m===Zt||pi.indexOf(h)!==-1&&[oi,ct].indexOf(m)!==-1||pi.indexOf(m)!==-1&&h===dt||ZA.indexOf(h)!==-1&&ZA.indexOf(m)!==-1||h===Oe&&ZA.indexOf(m)!==-1||ZA.concat(LA).indexOf(h)!==-1&&m===lt&&Pl.indexOf(e[g])===-1||ZA.concat(LA).indexOf(m)!==-1&&h===at)return Z;if(h===En&&m===En){for(var D=r[c],H=1;D>0&&(D--,A[D]===En);)H++;if(H%2!==0)return Z}return h===$t&&m===jt?Z:qt},Wl=function(e,A){A||(A={lineBreak:"normal",wordBreak:"normal"});var r=Vl(e,A.lineBreak),t=r[0],o=r[1],c=r[2];(A.wordBreak==="break-all"||A.wordBreak==="break-word")&&(o=o.map(function(g){return [LA,Ce,ai].indexOf(g)!==-1?pt:g}));var u=A.wordBreak==="keep-all"?c.map(function(g,h){return g&&e[h]>=19968&&e[h]<=40959}):void 0;return [t,o,u]},Yl=(function(){function e(A,r,t,o){this.codePoints=A,this.required=r===li,this.start=t,this.end=o;}return e.prototype.slice=function(){return C.apply(void 0,this.codePoints.slice(this.start,this.end))},e})(),Jl=function(e,A){var r=y(e),t=Wl(r,A),o=t[0],c=t[1],u=t[2],g=r.length,h=0,f=0;return {next:function(){if(f>=g)return {done:!0,value:null};for(var m=Z;f<g&&(m=Xl(r,c,o,++f,u))===Z;);if(m!==Z||f===g){var v=new Yl(r,m,h,f);return h=f,{value:v,done:!1}}return {done:!0,value:null}}}},$l=1,jl=2,ut=4,hi=8,Ar=10,gi=47,ht=92,zl=9,Zl=32,er=34,gt=61,ql=35,Ac=36,ec=37,tr=39,rr=40,Bt=41,tc=95,EA=45,rc=33,nc=60,sc=62,ic=64,oc=91,ac=93,lc=61,cc=123,nr=63,dc=125,Bi=124,pc=126,uc=128,fi=65533,In=42,ve=43,hc=44,gc=58,Bc=59,ft=46,fc=0,wc=8,mc=11,bc=14,Cc=31,vc=127,XA=-1,wi=48,mi=97,bi=101,yc=102,Qc=117,Fc=122,Ci=65,vi=69,yi=70,xc=85,Ec=90,QA=function(e){return e>=wi&&e<=57},Uc=function(e){return e>=55296&&e<=57343},Pe=function(e){return QA(e)||e>=Ci&&e<=yi||e>=mi&&e<=yc},Hc=function(e){return e>=mi&&e<=Fc},kc=function(e){return e>=Ci&&e<=Ec},Ic=function(e){return Hc(e)||kc(e)},Sc=function(e){return e>=uc},sr=function(e){return e===Ar||e===zl||e===Zl},ir=function(e){return Ic(e)||Sc(e)||e===tc},Qi=function(e){return ir(e)||QA(e)||e===EA},Lc=function(e){return e>=fc&&e<=wc||e===mc||e>=bc&&e<=Cc||e===vc},oe=function(e,A){return e!==ht?!1:A!==Ar},or=function(e,A,r){return e===EA?ir(A)||oe(A,r):ir(e)?!0:!!(e===ht&&oe(e,A))},Sn=function(e,A,r){return e===ve||e===EA?QA(A)?!0:A===ft&&QA(r):QA(e===ft?A:e)},Tc=function(e){var A=0,r=1;(e[A]===ve||e[A]===EA)&&(e[A]===EA&&(r=-1),A++);for(var t=[];QA(e[A]);)t.push(e[A++]);var o=t.length?parseInt(C.apply(void 0,t),10):0;e[A]===ft&&A++;for(var c=[];QA(e[A]);)c.push(e[A++]);var u=c.length,g=u?parseInt(C.apply(void 0,c),10):0;(e[A]===vi||e[A]===bi)&&A++;var h=1;(e[A]===ve||e[A]===EA)&&(e[A]===EA&&(h=-1),A++);for(var f=[];QA(e[A]);)f.push(e[A++]);var m=f.length?parseInt(C.apply(void 0,f),10):0;return r*(o+g*Math.pow(10,-u))*Math.pow(10,h*m)},Dc={type:2},Kc={type:3},Mc={type:4},Rc={type:13},Oc={type:8},Nc={type:21},Pc={type:9},_c={type:10},Gc={type:11},Vc={type:12},Xc={type:14},ar={type:23},Wc={type:1},Yc={type:25},Jc={type:24},$c={type:26},jc={type:27},zc={type:28},Zc={type:29},qc={type:31},Ln={type:32},Fi=(function(){function e(){this._value=[];}return e.prototype.write=function(A){this._value=this._value.concat(y(A));},e.prototype.read=function(){for(var A=[],r=this.consumeToken();r!==Ln;)A.push(r),r=this.consumeToken();return A},e.prototype.consumeToken=function(){var A=this.consumeCodePoint();switch(A){case er:return this.consumeStringToken(er);case ql:var r=this.peekCodePoint(0),t=this.peekCodePoint(1),o=this.peekCodePoint(2);if(Qi(r)||oe(t,o)){var c=or(r,t,o)?jl:$l,u=this.consumeName();return {type:5,value:u,flags:c}}break;case Ac:if(this.peekCodePoint(0)===gt)return this.consumeCodePoint(),Rc;break;case tr:return this.consumeStringToken(tr);case rr:return Dc;case Bt:return Kc;case In:if(this.peekCodePoint(0)===gt)return this.consumeCodePoint(),Xc;break;case ve:if(Sn(A,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(A),this.consumeNumericToken();break;case hc:return Mc;case EA:var g=A,h=this.peekCodePoint(0),f=this.peekCodePoint(1);if(Sn(g,h,f))return this.reconsumeCodePoint(A),this.consumeNumericToken();if(or(g,h,f))return this.reconsumeCodePoint(A),this.consumeIdentLikeToken();if(h===EA&&f===sc)return this.consumeCodePoint(),this.consumeCodePoint(),Jc;break;case ft:if(Sn(A,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(A),this.consumeNumericToken();break;case gi:if(this.peekCodePoint(0)===In)for(this.consumeCodePoint();;){var m=this.consumeCodePoint();if(m===In&&(m=this.consumeCodePoint(),m===gi))return this.consumeToken();if(m===XA)return this.consumeToken()}break;case gc:return $c;case Bc:return jc;case nc:if(this.peekCodePoint(0)===rc&&this.peekCodePoint(1)===EA&&this.peekCodePoint(2)===EA)return this.consumeCodePoint(),this.consumeCodePoint(),Yc;break;case ic:var v=this.peekCodePoint(0),x=this.peekCodePoint(1),D=this.peekCodePoint(2);if(or(v,x,D)){var u=this.consumeName();return {type:7,value:u}}break;case oc:return zc;case ht:if(oe(A,this.peekCodePoint(0)))return this.reconsumeCodePoint(A),this.consumeIdentLikeToken();break;case ac:return Zc;case lc:if(this.peekCodePoint(0)===gt)return this.consumeCodePoint(),Oc;break;case cc:return Gc;case dc:return Vc;case Qc:case xc:var H=this.peekCodePoint(0),I=this.peekCodePoint(1);return H===ve&&(Pe(I)||I===nr)&&(this.consumeCodePoint(),this.consumeUnicodeRangeToken()),this.reconsumeCodePoint(A),this.consumeIdentLikeToken();case Bi:if(this.peekCodePoint(0)===gt)return this.consumeCodePoint(),Pc;if(this.peekCodePoint(0)===Bi)return this.consumeCodePoint(),Nc;break;case pc:if(this.peekCodePoint(0)===gt)return this.consumeCodePoint(),_c;break;case XA:return Ln}return sr(A)?(this.consumeWhiteSpace(),qc):QA(A)?(this.reconsumeCodePoint(A),this.consumeNumericToken()):ir(A)?(this.reconsumeCodePoint(A),this.consumeIdentLikeToken()):{type:6,value:C(A)}},e.prototype.consumeCodePoint=function(){var A=this._value.shift();return typeof A>"u"?-1:A},e.prototype.reconsumeCodePoint=function(A){this._value.unshift(A);},e.prototype.peekCodePoint=function(A){return A>=this._value.length?-1:this._value[A]},e.prototype.consumeUnicodeRangeToken=function(){for(var A=[],r=this.consumeCodePoint();Pe(r)&&A.length<6;)A.push(r),r=this.consumeCodePoint();for(var t=!1;r===nr&&A.length<6;)A.push(r),r=this.consumeCodePoint(),t=!0;if(t){var o=parseInt(C.apply(void 0,A.map(function(h){return h===nr?wi:h})),16),c=parseInt(C.apply(void 0,A.map(function(h){return h===nr?yi:h})),16);return {type:30,start:o,end:c}}var u=parseInt(C.apply(void 0,A),16);if(this.peekCodePoint(0)===EA&&Pe(this.peekCodePoint(1))){this.consumeCodePoint(),r=this.consumeCodePoint();for(var g=[];Pe(r)&&g.length<6;)g.push(r),r=this.consumeCodePoint();var c=parseInt(C.apply(void 0,g),16);return {type:30,start:u,end:c}}else return {type:30,start:u,end:u}},e.prototype.consumeIdentLikeToken=function(){var A=this.consumeName();return A.toLowerCase()==="url"&&this.peekCodePoint(0)===rr?(this.consumeCodePoint(),this.consumeUrlToken()):this.peekCodePoint(0)===rr?(this.consumeCodePoint(),{type:19,value:A}):{type:20,value:A}},e.prototype.consumeUrlToken=function(){var A=[];if(this.consumeWhiteSpace(),this.peekCodePoint(0)===XA)return {type:22,value:""};var r=this.peekCodePoint(0);if(r===tr||r===er){var t=this.consumeStringToken(this.consumeCodePoint());return t.type===0&&(this.consumeWhiteSpace(),this.peekCodePoint(0)===XA||this.peekCodePoint(0)===Bt)?(this.consumeCodePoint(),{type:22,value:t.value}):(this.consumeBadUrlRemnants(),ar)}for(;;){var o=this.consumeCodePoint();if(o===XA||o===Bt)return {type:22,value:C.apply(void 0,A)};if(sr(o))return this.consumeWhiteSpace(),this.peekCodePoint(0)===XA||this.peekCodePoint(0)===Bt?(this.consumeCodePoint(),{type:22,value:C.apply(void 0,A)}):(this.consumeBadUrlRemnants(),ar);if(o===er||o===tr||o===rr||Lc(o))return this.consumeBadUrlRemnants(),ar;if(o===ht)if(oe(o,this.peekCodePoint(0)))A.push(this.consumeEscapedCodePoint());else return this.consumeBadUrlRemnants(),ar;else A.push(o);}},e.prototype.consumeWhiteSpace=function(){for(;sr(this.peekCodePoint(0));)this.consumeCodePoint();},e.prototype.consumeBadUrlRemnants=function(){for(;;){var A=this.consumeCodePoint();if(A===Bt||A===XA)return;oe(A,this.peekCodePoint(0))&&this.consumeEscapedCodePoint();}},e.prototype.consumeStringSlice=function(A){for(var r=5e4,t="";A>0;){var o=Math.min(r,A);t+=C.apply(void 0,this._value.splice(0,o)),A-=o;}return this._value.shift(),t},e.prototype.consumeStringToken=function(A){var r="",t=0;do{var o=this._value[t];if(o===XA||o===void 0||o===A)return r+=this.consumeStringSlice(t),{type:0,value:r};if(o===Ar)return this._value.splice(0,t),Wc;if(o===ht){var c=this._value[t+1];c!==XA&&c!==void 0&&(c===Ar?(r+=this.consumeStringSlice(t),t=-1,this._value.shift()):oe(o,c)&&(r+=this.consumeStringSlice(t),r+=C(this.consumeEscapedCodePoint()),t=-1));}t++;}while(!0)},e.prototype.consumeNumber=function(){var A=[],r=ut,t=this.peekCodePoint(0);for((t===ve||t===EA)&&A.push(this.consumeCodePoint());QA(this.peekCodePoint(0));)A.push(this.consumeCodePoint());t=this.peekCodePoint(0);var o=this.peekCodePoint(1);if(t===ft&&QA(o))for(A.push(this.consumeCodePoint(),this.consumeCodePoint()),r=hi;QA(this.peekCodePoint(0));)A.push(this.consumeCodePoint());t=this.peekCodePoint(0),o=this.peekCodePoint(1);var c=this.peekCodePoint(2);if((t===vi||t===bi)&&((o===ve||o===EA)&&QA(c)||QA(o)))for(A.push(this.consumeCodePoint(),this.consumeCodePoint()),r=hi;QA(this.peekCodePoint(0));)A.push(this.consumeCodePoint());return [Tc(A),r]},e.prototype.consumeNumericToken=function(){var A=this.consumeNumber(),r=A[0],t=A[1],o=this.peekCodePoint(0),c=this.peekCodePoint(1),u=this.peekCodePoint(2);if(or(o,c,u)){var g=this.consumeName();return {type:15,number:r,flags:t,unit:g}}return o===ec?(this.consumeCodePoint(),{type:16,number:r,flags:t}):{type:17,number:r,flags:t}},e.prototype.consumeEscapedCodePoint=function(){var A=this.consumeCodePoint();if(Pe(A)){for(var r=C(A);Pe(this.peekCodePoint(0))&&r.length<6;)r+=C(this.consumeCodePoint());sr(this.peekCodePoint(0))&&this.consumeCodePoint();var t=parseInt(r,16);return t===0||Uc(t)||t>1114111?fi:t}return A===XA?fi:A},e.prototype.consumeName=function(){for(var A="";;){var r=this.consumeCodePoint();if(Qi(r))A+=C(r);else if(oe(r,this.peekCodePoint(0)))A+=C(this.consumeEscapedCodePoint());else return this.reconsumeCodePoint(r),A}},e})(),xi=(function(){function e(A){this._tokens=A;}return e.create=function(A){var r=new Fi;return r.write(A),new e(r.read())},e.parseValue=function(A){return e.create(A).parseComponentValue()},e.parseValues=function(A){return e.create(A).parseComponentValues()},e.prototype.parseComponentValue=function(){for(var A=this.consumeToken();A.type===31;)A=this.consumeToken();if(A.type===32)throw new SyntaxError("Error parsing CSS component value, unexpected EOF");this.reconsumeToken(A);var r=this.consumeComponentValue();do A=this.consumeToken();while(A.type===31);if(A.type===32)return r;throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one")},e.prototype.parseComponentValues=function(){for(var A=[];;){var r=this.consumeComponentValue();if(r.type===32)return A;A.push(r),A.push();}},e.prototype.consumeComponentValue=function(){var A=this.consumeToken();switch(A.type){case 11:case 28:case 2:return this.consumeSimpleBlock(A.type);case 19:return this.consumeFunction(A)}return A},e.prototype.consumeSimpleBlock=function(A){for(var r={type:A,values:[]},t=this.consumeToken();;){if(t.type===32||ed(t,A))return r;this.reconsumeToken(t),r.values.push(this.consumeComponentValue()),t=this.consumeToken();}},e.prototype.consumeFunction=function(A){for(var r={name:A.value,values:[],type:18};;){var t=this.consumeToken();if(t.type===32||t.type===3)return r;this.reconsumeToken(t),r.values.push(this.consumeComponentValue());}},e.prototype.consumeToken=function(){var A=this._tokens.shift();return typeof A>"u"?Ln:A},e.prototype.reconsumeToken=function(A){this._tokens.unshift(A);},e})(),wt=function(e){return e.type===15},_e=function(e){return e.type===17},iA=function(e){return e.type===20},Ad=function(e){return e.type===0},Tn=function(e,A){return iA(e)&&e.value===A},Ei=function(e){return e.type!==31},Ge=function(e){return e.type!==31&&e.type!==4},WA=function(e){var A=[],r=[];return e.forEach(function(t){if(t.type===4){if(r.length===0)throw new Error("Error parsing function args, zero tokens for arg");A.push(r),r=[];return}t.type!==31&&r.push(t);}),r.length&&A.push(r),A},ed=function(e,A){return A===11&&e.type===12||A===28&&e.type===29?!0:A===2&&e.type===3},ae=function(e){return e.type===17||e.type===15},gA=function(e){return e.type===16||ae(e)},Ui=function(e){return e.length>1?[e[0],e[1]]:[e[0]]},CA={type:17,number:0,flags:ut},Dn={type:16,number:50,flags:ut},le={type:16,number:100,flags:ut},mt=function(e,A,r){var t=e[0],o=e[1];return [cA(t,A),cA(typeof o<"u"?o:t,r)]},cA=function(e,A){if(e.type===16)return e.number/100*A;if(wt(e))switch(e.unit){case "rem":case "em":return 16*e.number;default:return e.number}return e.number},Hi="deg",ki="grad",Ii="rad",Si="turn",lr={name:"angle",parse:function(e,A){if(A.type===15)switch(A.unit){case Hi:return Math.PI*A.number/180;case ki:return Math.PI/200*A.number;case Ii:return A.number;case Si:return Math.PI*2*A.number}throw new Error("Unsupported angle type")}},Li=function(e){return e.type===15&&(e.unit===Hi||e.unit===ki||e.unit===Ii||e.unit===Si)},Ti=function(e){var A=e.filter(iA).map(function(r){return r.value}).join(" ");switch(A){case "to bottom right":case "to right bottom":case "left top":case "top left":return [CA,CA];case "to top":case "bottom":return KA(0);case "to bottom left":case "to left bottom":case "right top":case "top right":return [CA,le];case "to right":case "left":return KA(90);case "to top left":case "to left top":case "right bottom":case "bottom right":return [le,le];case "to bottom":case "top":return KA(180);case "to top right":case "to right top":case "left bottom":case "bottom left":return [le,CA];case "to left":case "right":return KA(270)}return 0},KA=function(e){return Math.PI*e/180},ce={name:"color",parse:function(e,A){if(A.type===18){var r=td[A.name];if(typeof r>"u")throw new Error('Attempting to parse an unsupported color function "'+A.name+'"');return r(e,A.values)}if(A.type===5){if(A.value.length===3){var t=A.value.substring(0,1),o=A.value.substring(1,2),c=A.value.substring(2,3);return pe(parseInt(t+t,16),parseInt(o+o,16),parseInt(c+c,16),1)}if(A.value.length===4){var t=A.value.substring(0,1),o=A.value.substring(1,2),c=A.value.substring(2,3),u=A.value.substring(3,4);return pe(parseInt(t+t,16),parseInt(o+o,16),parseInt(c+c,16),parseInt(u+u,16)/255)}if(A.value.length===6){var t=A.value.substring(0,2),o=A.value.substring(2,4),c=A.value.substring(4,6);return pe(parseInt(t,16),parseInt(o,16),parseInt(c,16),1)}if(A.value.length===8){var t=A.value.substring(0,2),o=A.value.substring(2,4),c=A.value.substring(4,6),u=A.value.substring(6,8);return pe(parseInt(t,16),parseInt(o,16),parseInt(c,16),parseInt(u,16)/255)}}if(A.type===20){var g=qA[A.value.toUpperCase()];if(typeof g<"u")return g}return qA.TRANSPARENT}},de=function(e){return (255&e)===0},bA=function(e){var A=255&e,r=255&e>>8,t=255&e>>16,o=255&e>>24;return A<255?"rgba("+o+","+t+","+r+","+A/255+")":"rgb("+o+","+t+","+r+")"},pe=function(e,A,r,t){return (e<<24|A<<16|r<<8|Math.round(t*255)<<0)>>>0},Di=function(e,A){if(e.type===17)return e.number;if(e.type===16){var r=A===3?1:255;return A===3?e.number/100*r:Math.round(e.number/100*r)}return 0},Ki=function(e,A){var r=A.filter(Ge);if(r.length===3){var t=r.map(Di),o=t[0],c=t[1],u=t[2];return pe(o,c,u,1)}if(r.length===4){var g=r.map(Di),o=g[0],c=g[1],u=g[2],h=g[3];return pe(o,c,u,h)}return 0};function Kn(e,A,r){return r<0&&(r+=1),r>=1&&(r-=1),r<1/6?(A-e)*r*6+e:r<1/2?A:r<2/3?(A-e)*6*(2/3-r)+e:e}var Mi=function(e,A){var r=A.filter(Ge),t=r[0],o=r[1],c=r[2],u=r[3],g=(t.type===17?KA(t.number):lr.parse(e,t))/(Math.PI*2),h=gA(o)?o.number/100:0,f=gA(c)?c.number/100:0,m=typeof u<"u"&&gA(u)?cA(u,1):1;if(h===0)return pe(f*255,f*255,f*255,1);var v=f<=.5?f*(h+1):f+h-f*h,x=f*2-v,D=Kn(x,v,g+1/3),H=Kn(x,v,g),I=Kn(x,v,g-1/3);return pe(D*255,H*255,I*255,m)},td={hsl:Mi,hsla:Mi,rgb:Ki,rgba:Ki},bt=function(e,A){return ce.parse(e,xi.create(A).parseComponentValue())},qA={ALICEBLUE:4042850303,ANTIQUEWHITE:4209760255,AQUA:16777215,AQUAMARINE:2147472639,AZURE:4043309055,BEIGE:4126530815,BISQUE:4293182719,BLACK:255,BLANCHEDALMOND:4293643775,BLUE:65535,BLUEVIOLET:2318131967,BROWN:2771004159,BURLYWOOD:3736635391,CADETBLUE:1604231423,CHARTREUSE:2147418367,CHOCOLATE:3530104575,CORAL:4286533887,CORNFLOWERBLUE:1687547391,CORNSILK:4294499583,CRIMSON:3692313855,CYAN:16777215,DARKBLUE:35839,DARKCYAN:9145343,DARKGOLDENROD:3095837695,DARKGRAY:2846468607,DARKGREEN:6553855,DARKGREY:2846468607,DARKKHAKI:3182914559,DARKMAGENTA:2332068863,DARKOLIVEGREEN:1433087999,DARKORANGE:4287365375,DARKORCHID:2570243327,DARKRED:2332033279,DARKSALMON:3918953215,DARKSEAGREEN:2411499519,DARKSLATEBLUE:1211993087,DARKSLATEGRAY:793726975,DARKSLATEGREY:793726975,DARKTURQUOISE:13554175,DARKVIOLET:2483082239,DEEPPINK:4279538687,DEEPSKYBLUE:12582911,DIMGRAY:1768516095,DIMGREY:1768516095,DODGERBLUE:512819199,FIREBRICK:2988581631,FLORALWHITE:4294635775,FORESTGREEN:579543807,FUCHSIA:4278255615,GAINSBORO:3705462015,GHOSTWHITE:4177068031,GOLD:4292280575,GOLDENROD:3668254975,GRAY:2155905279,GREEN:8388863,GREENYELLOW:2919182335,GREY:2155905279,HONEYDEW:4043305215,HOTPINK:4285117695,INDIANRED:3445382399,INDIGO:1258324735,IVORY:4294963455,KHAKI:4041641215,LAVENDER:3873897215,LAVENDERBLUSH:4293981695,LAWNGREEN:2096890111,LEMONCHIFFON:4294626815,LIGHTBLUE:2916673279,LIGHTCORAL:4034953471,LIGHTCYAN:3774873599,LIGHTGOLDENRODYELLOW:4210742015,LIGHTGRAY:3553874943,LIGHTGREEN:2431553791,LIGHTGREY:3553874943,LIGHTPINK:4290167295,LIGHTSALMON:4288707327,LIGHTSEAGREEN:548580095,LIGHTSKYBLUE:2278488831,LIGHTSLATEGRAY:2005441023,LIGHTSLATEGREY:2005441023,LIGHTSTEELBLUE:2965692159,LIGHTYELLOW:4294959359,LIME:16711935,LIMEGREEN:852308735,LINEN:4210091775,MAGENTA:4278255615,MAROON:2147483903,MEDIUMAQUAMARINE:1724754687,MEDIUMBLUE:52735,MEDIUMORCHID:3126187007,MEDIUMPURPLE:2473647103,MEDIUMSEAGREEN:1018393087,MEDIUMSLATEBLUE:2070474495,MEDIUMSPRINGGREEN:16423679,MEDIUMTURQUOISE:1221709055,MEDIUMVIOLETRED:3340076543,MIDNIGHTBLUE:421097727,MINTCREAM:4127193855,MISTYROSE:4293190143,MOCCASIN:4293178879,NAVAJOWHITE:4292783615,NAVY:33023,OLDLACE:4260751103,OLIVE:2155872511,OLIVEDRAB:1804477439,ORANGE:4289003775,ORANGERED:4282712319,ORCHID:3664828159,PALEGOLDENROD:4008225535,PALEGREEN:2566625535,PALETURQUOISE:2951671551,PALEVIOLETRED:3681588223,PAPAYAWHIP:4293907967,PEACHPUFF:4292524543,PERU:3448061951,PINK:4290825215,PLUM:3718307327,POWDERBLUE:2967529215,PURPLE:2147516671,REBECCAPURPLE:1714657791,RED:4278190335,ROSYBROWN:3163525119,ROYALBLUE:1097458175,SADDLEBROWN:2336560127,SALMON:4202722047,SANDYBROWN:4104413439,SEAGREEN:780883967,SEASHELL:4294307583,SIENNA:2689740287,SILVER:3233857791,SKYBLUE:2278484991,SLATEBLUE:1784335871,SLATEGRAY:1887473919,SLATEGREY:1887473919,SNOW:4294638335,SPRINGGREEN:16744447,STEELBLUE:1182971135,TAN:3535047935,TEAL:8421631,THISTLE:3636451583,TOMATO:4284696575,TRANSPARENT:0,TURQUOISE:1088475391,VIOLET:4001558271,WHEAT:4125012991,WHITE:4294967295,WHITESMOKE:4126537215,YELLOW:4294902015,YELLOWGREEN:2597139199},rd={name:"background-clip",initialValue:"border-box",prefix:!1,type:1,parse:function(e,A){return A.map(function(r){if(iA(r))switch(r.value){case "padding-box":return 1;case "content-box":return 2}return 0})}},nd={name:"background-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},cr=function(e,A){var r=ce.parse(e,A[0]),t=A[1];return t&&gA(t)?{color:r,stop:t}:{color:r,stop:null}},Ri=function(e,A){var r=e[0],t=e[e.length-1];r.stop===null&&(r.stop=CA),t.stop===null&&(t.stop=le);for(var o=[],c=0,u=0;u<e.length;u++){var g=e[u].stop;if(g!==null){var h=cA(g,A);h>c?o.push(h):o.push(c),c=h;}else o.push(null);}for(var f=null,u=0;u<o.length;u++){var m=o[u];if(m===null)f===null&&(f=u);else if(f!==null){for(var v=u-f,x=o[f-1],D=(m-x)/(v+1),H=1;H<=v;H++)o[f+H-1]=D*H;f=null;}}return e.map(function(I,J){var P=I.color;return {color:P,stop:Math.max(Math.min(1,o[J]/A),0)}})},sd=function(e,A,r){var t=A/2,o=r/2,c=cA(e[0],A)-t,u=o-cA(e[1],r);return (Math.atan2(u,c)+Math.PI*2)%(Math.PI*2)},id=function(e,A,r){var t=typeof e=="number"?e:sd(e,A,r),o=Math.abs(A*Math.sin(t))+Math.abs(r*Math.cos(t)),c=A/2,u=r/2,g=o/2,h=Math.sin(t-Math.PI/2)*g,f=Math.cos(t-Math.PI/2)*g;return [o,c-f,c+f,u-h,u+h]},_A=function(e,A){return Math.sqrt(e*e+A*A)},Oi=function(e,A,r,t,o){var c=[[0,0],[0,A],[e,0],[e,A]];return c.reduce(function(u,g){var h=g[0],f=g[1],m=_A(r-h,t-f);return (o?m<u.optimumDistance:m>u.optimumDistance)?{optimumCorner:g,optimumDistance:m}:u},{optimumDistance:o?1/0:-1/0,optimumCorner:null}).optimumCorner},od=function(e,A,r,t,o){var c=0,u=0;switch(e.size){case 0:e.shape===0?c=u=Math.min(Math.abs(A),Math.abs(A-t),Math.abs(r),Math.abs(r-o)):e.shape===1&&(c=Math.min(Math.abs(A),Math.abs(A-t)),u=Math.min(Math.abs(r),Math.abs(r-o)));break;case 2:if(e.shape===0)c=u=Math.min(_A(A,r),_A(A,r-o),_A(A-t,r),_A(A-t,r-o));else if(e.shape===1){var g=Math.min(Math.abs(r),Math.abs(r-o))/Math.min(Math.abs(A),Math.abs(A-t)),h=Oi(t,o,A,r,!0),f=h[0],m=h[1];c=_A(f-A,(m-r)/g),u=g*c;}break;case 1:e.shape===0?c=u=Math.max(Math.abs(A),Math.abs(A-t),Math.abs(r),Math.abs(r-o)):e.shape===1&&(c=Math.max(Math.abs(A),Math.abs(A-t)),u=Math.max(Math.abs(r),Math.abs(r-o)));break;case 3:if(e.shape===0)c=u=Math.max(_A(A,r),_A(A,r-o),_A(A-t,r),_A(A-t,r-o));else if(e.shape===1){var g=Math.max(Math.abs(r),Math.abs(r-o))/Math.max(Math.abs(A),Math.abs(A-t)),v=Oi(t,o,A,r,!1),f=v[0],m=v[1];c=_A(f-A,(m-r)/g),u=g*c;}break}return Array.isArray(e.size)&&(c=cA(e.size[0],t),u=e.size.length===2?cA(e.size[1],o):c),[c,u]},ad=function(e,A){var r=KA(180),t=[];return WA(A).forEach(function(o,c){if(c===0){var u=o[0];if(u.type===20&&u.value==="to"){r=Ti(o);return}else if(Li(u)){r=lr.parse(e,u);return}}var g=cr(e,o);t.push(g);}),{angle:r,stops:t,type:1}},dr=function(e,A){var r=KA(180),t=[];return WA(A).forEach(function(o,c){if(c===0){var u=o[0];if(u.type===20&&["top","left","right","bottom"].indexOf(u.value)!==-1){r=Ti(o);return}else if(Li(u)){r=(lr.parse(e,u)+KA(270))%KA(360);return}}var g=cr(e,o);t.push(g);}),{angle:r,stops:t,type:1}},ld=function(e,A){var r=KA(180),t=[],o=1,c=0,u=3,g=[];return WA(A).forEach(function(h,f){var m=h[0];if(f===0){if(iA(m)&&m.value==="linear"){o=1;return}else if(iA(m)&&m.value==="radial"){o=2;return}}if(m.type===18){if(m.name==="from"){var v=ce.parse(e,m.values[0]);t.push({stop:CA,color:v});}else if(m.name==="to"){var v=ce.parse(e,m.values[0]);t.push({stop:le,color:v});}else if(m.name==="color-stop"){var x=m.values.filter(Ge);if(x.length===2){var v=ce.parse(e,x[1]),D=x[0];_e(D)&&t.push({stop:{type:16,number:D.number*100,flags:D.flags},color:v});}}}}),o===1?{angle:(r+KA(180))%KA(360),stops:t,type:o}:{size:u,shape:c,stops:t,position:g,type:o}},Ni="closest-side",Pi="farthest-side",_i="closest-corner",Gi="farthest-corner",Vi="circle",Xi="ellipse",Wi="cover",Yi="contain",cd=function(e,A){var r=0,t=3,o=[],c=[];return WA(A).forEach(function(u,g){var h=!0;if(g===0){var f=!1;h=u.reduce(function(v,x){if(f)if(iA(x))switch(x.value){case "center":return c.push(Dn),v;case "top":case "left":return c.push(CA),v;case "right":case "bottom":return c.push(le),v}else (gA(x)||ae(x))&&c.push(x);else if(iA(x))switch(x.value){case Vi:return r=0,!1;case Xi:return r=1,!1;case "at":return f=!0,!1;case Ni:return t=0,!1;case Wi:case Pi:return t=1,!1;case Yi:case _i:return t=2,!1;case Gi:return t=3,!1}else if(ae(x)||gA(x))return Array.isArray(t)||(t=[]),t.push(x),!1;return v},h);}if(h){var m=cr(e,u);o.push(m);}}),{size:t,shape:r,stops:o,position:c,type:2}},pr=function(e,A){var r=0,t=3,o=[],c=[];return WA(A).forEach(function(u,g){var h=!0;if(g===0?h=u.reduce(function(m,v){if(iA(v))switch(v.value){case "center":return c.push(Dn),!1;case "top":case "left":return c.push(CA),!1;case "right":case "bottom":return c.push(le),!1}else if(gA(v)||ae(v))return c.push(v),!1;return m},h):g===1&&(h=u.reduce(function(m,v){if(iA(v))switch(v.value){case Vi:return r=0,!1;case Xi:return r=1,!1;case Yi:case Ni:return t=0,!1;case Pi:return t=1,!1;case _i:return t=2,!1;case Wi:case Gi:return t=3,!1}else if(ae(v)||gA(v))return Array.isArray(t)||(t=[]),t.push(v),!1;return m},h)),h){var f=cr(e,u);o.push(f);}}),{size:t,shape:r,stops:o,position:c,type:2}},dd=function(e){return e.type===1},pd=function(e){return e.type===2},Mn={name:"image",parse:function(e,A){if(A.type===22){var r={url:A.value,type:0};return e.cache.addImage(A.value),r}if(A.type===18){var t=Ji[A.name];if(typeof t>"u")throw new Error('Attempting to parse an unsupported image function "'+A.name+'"');return t(e,A.values)}throw new Error("Unsupported image type "+A.type)}};function ud(e){return !(e.type===20&&e.value==="none")&&(e.type!==18||!!Ji[e.name])}var Ji={"linear-gradient":ad,"-moz-linear-gradient":dr,"-ms-linear-gradient":dr,"-o-linear-gradient":dr,"-webkit-linear-gradient":dr,"radial-gradient":cd,"-moz-radial-gradient":pr,"-ms-radial-gradient":pr,"-o-radial-gradient":pr,"-webkit-radial-gradient":pr,"-webkit-gradient":ld},hd={name:"background-image",initialValue:"none",type:1,prefix:!1,parse:function(e,A){if(A.length===0)return [];var r=A[0];return r.type===20&&r.value==="none"?[]:A.filter(function(t){return Ge(t)&&ud(t)}).map(function(t){return Mn.parse(e,t)})}},gd={name:"background-origin",initialValue:"border-box",prefix:!1,type:1,parse:function(e,A){return A.map(function(r){if(iA(r))switch(r.value){case "padding-box":return 1;case "content-box":return 2}return 0})}},Bd={name:"background-position",initialValue:"0% 0%",type:1,prefix:!1,parse:function(e,A){return WA(A).map(function(r){return r.filter(gA)}).map(Ui)}},fd={name:"background-repeat",initialValue:"repeat",prefix:!1,type:1,parse:function(e,A){return WA(A).map(function(r){return r.filter(iA).map(function(t){return t.value}).join(" ")}).map(wd)}},wd=function(e){switch(e){case "no-repeat":return 1;case "repeat-x":case "repeat no-repeat":return 2;case "repeat-y":case "no-repeat repeat":return 3;default:return 0}},Ve;(function(e){e.AUTO="auto",e.CONTAIN="contain",e.COVER="cover";})(Ve||(Ve={}));var md={name:"background-size",initialValue:"0",prefix:!1,type:1,parse:function(e,A){return WA(A).map(function(r){return r.filter(bd)})}},bd=function(e){return iA(e)||gA(e)},ur=function(e){return {name:"border-"+e+"-color",initialValue:"transparent",prefix:!1,type:3,format:"color"}},Cd=ur("top"),vd=ur("right"),yd=ur("bottom"),Qd=ur("left"),hr=function(e){return {name:"border-radius-"+e,initialValue:"0 0",prefix:!1,type:1,parse:function(A,r){return Ui(r.filter(gA))}}},Fd=hr("top-left"),xd=hr("top-right"),Ed=hr("bottom-right"),Ud=hr("bottom-left"),gr=function(e){return {name:"border-"+e+"-style",initialValue:"solid",prefix:!1,type:2,parse:function(A,r){switch(r){case "none":return 0;case "dashed":return 2;case "dotted":return 3;case "double":return 4}return 1}}},Hd=gr("top"),kd=gr("right"),Id=gr("bottom"),Sd=gr("left"),Br=function(e){return {name:"border-"+e+"-width",initialValue:"0",type:0,prefix:!1,parse:function(A,r){return wt(r)?r.number:0}}},Ld=Br("top"),Td=Br("right"),Dd=Br("bottom"),Kd=Br("left"),Md={name:"color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Rd={name:"direction",initialValue:"ltr",prefix:!1,type:2,parse:function(e,A){return A==="rtl"?1:0}},Od={name:"display",initialValue:"inline-block",prefix:!1,type:1,parse:function(e,A){return A.filter(iA).reduce(function(r,t){return r|Nd(t.value)},0)}},Nd=function(e){switch(e){case "block":case "-webkit-box":return 2;case "inline":return 4;case "run-in":return 8;case "flow":return 16;case "flow-root":return 32;case "table":return 64;case "flex":case "-webkit-flex":return 128;case "grid":case "-ms-grid":return 256;case "ruby":return 512;case "subgrid":return 1024;case "list-item":return 2048;case "table-row-group":return 4096;case "table-header-group":return 8192;case "table-footer-group":return 16384;case "table-row":return 32768;case "table-cell":return 65536;case "table-column-group":return 131072;case "table-column":return 262144;case "table-caption":return 524288;case "ruby-base":return 1048576;case "ruby-text":return 2097152;case "ruby-base-container":return 4194304;case "ruby-text-container":return 8388608;case "contents":return 16777216;case "inline-block":return 33554432;case "inline-list-item":return 67108864;case "inline-table":return 134217728;case "inline-flex":return 268435456;case "inline-grid":return 536870912}return 0},Pd={name:"float",initialValue:"none",prefix:!1,type:2,parse:function(e,A){switch(A){case "left":return 1;case "right":return 2;case "inline-start":return 3;case "inline-end":return 4}return 0}},_d={name:"letter-spacing",initialValue:"0",prefix:!1,type:0,parse:function(e,A){return A.type===20&&A.value==="normal"?0:A.type===17||A.type===15?A.number:0}},fr;(function(e){e.NORMAL="normal",e.STRICT="strict";})(fr||(fr={}));var Gd={name:"line-break",initialValue:"normal",prefix:!1,type:2,parse:function(e,A){return A==="strict"?fr.STRICT:fr.NORMAL}},Vd={name:"line-height",initialValue:"normal",prefix:!1,type:4},$i=function(e,A){return iA(e)&&e.value==="normal"?1.2*A:e.type===17?A*e.number:gA(e)?cA(e,A):A},Xd={name:"list-style-image",initialValue:"none",type:0,prefix:!1,parse:function(e,A){return A.type===20&&A.value==="none"?null:Mn.parse(e,A)}},Wd={name:"list-style-position",initialValue:"outside",prefix:!1,type:2,parse:function(e,A){return A==="inside"?0:1}},Rn={name:"list-style-type",initialValue:"none",prefix:!1,type:2,parse:function(e,A){switch(A){case "disc":return 0;case "circle":return 1;case "square":return 2;case "decimal":return 3;case "cjk-decimal":return 4;case "decimal-leading-zero":return 5;case "lower-roman":return 6;case "upper-roman":return 7;case "lower-greek":return 8;case "lower-alpha":return 9;case "upper-alpha":return 10;case "arabic-indic":return 11;case "armenian":return 12;case "bengali":return 13;case "cambodian":return 14;case "cjk-earthly-branch":return 15;case "cjk-heavenly-stem":return 16;case "cjk-ideographic":return 17;case "devanagari":return 18;case "ethiopic-numeric":return 19;case "georgian":return 20;case "gujarati":return 21;case "gurmukhi":return 22;case "hebrew":return 22;case "hiragana":return 23;case "hiragana-iroha":return 24;case "japanese-formal":return 25;case "japanese-informal":return 26;case "kannada":return 27;case "katakana":return 28;case "katakana-iroha":return 29;case "khmer":return 30;case "korean-hangul-formal":return 31;case "korean-hanja-formal":return 32;case "korean-hanja-informal":return 33;case "lao":return 34;case "lower-armenian":return 35;case "malayalam":return 36;case "mongolian":return 37;case "myanmar":return 38;case "oriya":return 39;case "persian":return 40;case "simp-chinese-formal":return 41;case "simp-chinese-informal":return 42;case "tamil":return 43;case "telugu":return 44;case "thai":return 45;case "tibetan":return 46;case "trad-chinese-formal":return 47;case "trad-chinese-informal":return 48;case "upper-armenian":return 49;case "disclosure-open":return 50;case "disclosure-closed":return 51;default:return -1}}},wr=function(e){return {name:"margin-"+e,initialValue:"0",prefix:!1,type:4}},Yd=wr("top"),Jd=wr("right"),$d=wr("bottom"),jd=wr("left"),zd={name:"overflow",initialValue:"visible",prefix:!1,type:1,parse:function(e,A){return A.filter(iA).map(function(r){switch(r.value){case "hidden":return 1;case "scroll":return 2;case "clip":return 3;case "auto":return 4;default:return 0}})}},Zd={name:"overflow-wrap",initialValue:"normal",prefix:!1,type:2,parse:function(e,A){return A==="break-word"?"break-word":"normal"}},mr=function(e){return {name:"padding-"+e,initialValue:"0",prefix:!1,type:3,format:"length-percentage"}},qd=mr("top"),Ap=mr("right"),ep=mr("bottom"),tp=mr("left"),rp={name:"text-align",initialValue:"left",prefix:!1,type:2,parse:function(e,A){switch(A){case "right":return 2;case "center":case "justify":return 1;default:return 0}}},np={name:"position",initialValue:"static",prefix:!1,type:2,parse:function(e,A){switch(A){case "relative":return 1;case "absolute":return 2;case "fixed":return 3;case "sticky":return 4}return 0}},sp={name:"text-shadow",initialValue:"none",type:1,prefix:!1,parse:function(e,A){return A.length===1&&Tn(A[0],"none")?[]:WA(A).map(function(r){for(var t={color:qA.TRANSPARENT,offsetX:CA,offsetY:CA,blur:CA},o=0,c=0;c<r.length;c++){var u=r[c];ae(u)?(o===0?t.offsetX=u:o===1?t.offsetY=u:t.blur=u,o++):t.color=ce.parse(e,u);}return t})}},ip={name:"text-transform",initialValue:"none",prefix:!1,type:2,parse:function(e,A){switch(A){case "uppercase":return 2;case "lowercase":return 1;case "capitalize":return 3}return 0}},op={name:"transform",initialValue:"none",prefix:!0,type:0,parse:function(e,A){if(A.type===20&&A.value==="none")return null;if(A.type===18){var r=cp[A.name];if(typeof r>"u")throw new Error('Attempting to parse an unsupported transform function "'+A.name+'"');return r(A.values)}return null}},ap=function(e){var A=e.filter(function(r){return r.type===17}).map(function(r){return r.number});return A.length===6?A:null},lp=function(e){var A=e.filter(function(h){return h.type===17}).map(function(h){return h.number}),r=A[0],t=A[1];A[2],A[3];var o=A[4],c=A[5];A[6],A[7],A[8],A[9],A[10],A[11];var u=A[12],g=A[13];return A[14],A[15],A.length===16?[r,t,o,c,u,g]:null},cp={matrix:ap,matrix3d:lp},ji={type:16,number:50,flags:ut},dp=[ji,ji],pp={name:"transform-origin",initialValue:"50% 50%",prefix:!0,type:1,parse:function(e,A){var r=A.filter(gA);return r.length!==2?dp:[r[0],r[1]]}},up={name:"visible",initialValue:"none",prefix:!1,type:2,parse:function(e,A){switch(A){case "hidden":return 1;case "collapse":return 2;default:return 0}}},Ct;(function(e){e.NORMAL="normal",e.BREAK_ALL="break-all",e.KEEP_ALL="keep-all";})(Ct||(Ct={}));for(var hp={name:"word-break",initialValue:"normal",prefix:!1,type:2,parse:function(e,A){switch(A){case "break-all":return Ct.BREAK_ALL;case "keep-all":return Ct.KEEP_ALL;default:return Ct.NORMAL}}},gp={name:"z-index",initialValue:"auto",prefix:!1,type:0,parse:function(e,A){if(A.type===20)return {auto:!0,order:0};if(_e(A))return {auto:!1,order:A.number};throw new Error("Invalid z-index number parsed")}},zi={name:"time",parse:function(e,A){if(A.type===15)switch(A.unit.toLowerCase()){case "s":return 1e3*A.number;case "ms":return A.number}throw new Error("Unsupported time type")}},Bp={name:"opacity",initialValue:"1",type:0,prefix:!1,parse:function(e,A){return _e(A)?A.number:1}},fp={name:"text-decoration-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},wp={name:"text-decoration-line",initialValue:"none",prefix:!1,type:1,parse:function(e,A){return A.filter(iA).map(function(r){switch(r.value){case "underline":return 1;case "overline":return 2;case "line-through":return 3;case "none":return 4}return 0}).filter(function(r){return r!==0})}},mp={name:"font-family",initialValue:"",prefix:!1,type:1,parse:function(e,A){var r=[],t=[];return A.forEach(function(o){switch(o.type){case 20:case 0:r.push(o.value);break;case 17:r.push(o.number.toString());break;case 4:t.push(r.join(" ")),r.length=0;break}}),r.length&&t.push(r.join(" ")),t.map(function(o){return o.indexOf(" ")===-1?o:"'"+o+"'"})}},bp={name:"font-size",initialValue:"0",prefix:!1,type:3,format:"length"},Cp={name:"font-weight",initialValue:"normal",type:0,prefix:!1,parse:function(e,A){return _e(A)?A.number:iA(A)&&A.value==="bold"?700:400}},vp={name:"font-variant",initialValue:"none",type:1,prefix:!1,parse:function(e,A){return A.filter(iA).map(function(r){return r.value})}},yp={name:"font-style",initialValue:"normal",prefix:!1,type:2,parse:function(e,A){switch(A){case "oblique":return "oblique";case "italic":return "italic";default:return "normal"}}},mA=function(e,A){return (e&A)!==0},Qp={name:"content",initialValue:"none",type:1,prefix:!1,parse:function(e,A){if(A.length===0)return [];var r=A[0];return r.type===20&&r.value==="none"?[]:A}},Fp={name:"counter-increment",initialValue:"none",prefix:!0,type:1,parse:function(e,A){if(A.length===0)return null;var r=A[0];if(r.type===20&&r.value==="none")return null;for(var t=[],o=A.filter(Ei),c=0;c<o.length;c++){var u=o[c],g=o[c+1];if(u.type===20){var h=g&&_e(g)?g.number:1;t.push({counter:u.value,increment:h});}}return t}},xp={name:"counter-reset",initialValue:"none",prefix:!0,type:1,parse:function(e,A){if(A.length===0)return [];for(var r=[],t=A.filter(Ei),o=0;o<t.length;o++){var c=t[o],u=t[o+1];if(iA(c)&&c.value!=="none"){var g=u&&_e(u)?u.number:0;r.push({counter:c.value,reset:g});}}return r}},Ep={name:"duration",initialValue:"0s",prefix:!1,type:1,parse:function(e,A){return A.filter(wt).map(function(r){return zi.parse(e,r)})}},Up={name:"quotes",initialValue:"none",prefix:!0,type:1,parse:function(e,A){if(A.length===0)return null;var r=A[0];if(r.type===20&&r.value==="none")return null;var t=[],o=A.filter(Ad);if(o.length%2!==0)return null;for(var c=0;c<o.length;c+=2){var u=o[c].value,g=o[c+1].value;t.push({open:u,close:g});}return t}},Zi=function(e,A,r){if(!e)return "";var t=e[Math.min(A,e.length-1)];return t?r?t.open:t.close:""},Hp={name:"box-shadow",initialValue:"none",type:1,prefix:!1,parse:function(e,A){return A.length===1&&Tn(A[0],"none")?[]:WA(A).map(function(r){for(var t={color:255,offsetX:CA,offsetY:CA,blur:CA,spread:CA,inset:!1},o=0,c=0;c<r.length;c++){var u=r[c];Tn(u,"inset")?t.inset=!0:ae(u)?(o===0?t.offsetX=u:o===1?t.offsetY=u:o===2?t.blur=u:t.spread=u,o++):t.color=ce.parse(e,u);}return t})}},kp={name:"paint-order",initialValue:"normal",prefix:!1,type:1,parse:function(e,A){var r=[0,1,2],t=[];return A.filter(iA).forEach(function(o){switch(o.value){case "stroke":t.push(1);break;case "fill":t.push(0);break;case "markers":t.push(2);break}}),r.forEach(function(o){t.indexOf(o)===-1&&t.push(o);}),t}},Ip={name:"-webkit-text-stroke-color",initialValue:"currentcolor",prefix:!1,type:3,format:"color"},Sp={name:"-webkit-text-stroke-width",initialValue:"0",type:0,prefix:!1,parse:function(e,A){return wt(A)?A.number:0}},Lp=(function(){function e(A,r){var t,o;this.animationDuration=K(A,Ep,r.animationDuration),this.backgroundClip=K(A,rd,r.backgroundClip),this.backgroundColor=K(A,nd,r.backgroundColor),this.backgroundImage=K(A,hd,r.backgroundImage),this.backgroundOrigin=K(A,gd,r.backgroundOrigin),this.backgroundPosition=K(A,Bd,r.backgroundPosition),this.backgroundRepeat=K(A,fd,r.backgroundRepeat),this.backgroundSize=K(A,md,r.backgroundSize),this.borderTopColor=K(A,Cd,r.borderTopColor),this.borderRightColor=K(A,vd,r.borderRightColor),this.borderBottomColor=K(A,yd,r.borderBottomColor),this.borderLeftColor=K(A,Qd,r.borderLeftColor),this.borderTopLeftRadius=K(A,Fd,r.borderTopLeftRadius),this.borderTopRightRadius=K(A,xd,r.borderTopRightRadius),this.borderBottomRightRadius=K(A,Ed,r.borderBottomRightRadius),this.borderBottomLeftRadius=K(A,Ud,r.borderBottomLeftRadius),this.borderTopStyle=K(A,Hd,r.borderTopStyle),this.borderRightStyle=K(A,kd,r.borderRightStyle),this.borderBottomStyle=K(A,Id,r.borderBottomStyle),this.borderLeftStyle=K(A,Sd,r.borderLeftStyle),this.borderTopWidth=K(A,Ld,r.borderTopWidth),this.borderRightWidth=K(A,Td,r.borderRightWidth),this.borderBottomWidth=K(A,Dd,r.borderBottomWidth),this.borderLeftWidth=K(A,Kd,r.borderLeftWidth),this.boxShadow=K(A,Hp,r.boxShadow),this.color=K(A,Md,r.color),this.direction=K(A,Rd,r.direction),this.display=K(A,Od,r.display),this.float=K(A,Pd,r.cssFloat),this.fontFamily=K(A,mp,r.fontFamily),this.fontSize=K(A,bp,r.fontSize),this.fontStyle=K(A,yp,r.fontStyle),this.fontVariant=K(A,vp,r.fontVariant),this.fontWeight=K(A,Cp,r.fontWeight),this.letterSpacing=K(A,_d,r.letterSpacing),this.lineBreak=K(A,Gd,r.lineBreak),this.lineHeight=K(A,Vd,r.lineHeight),this.listStyleImage=K(A,Xd,r.listStyleImage),this.listStylePosition=K(A,Wd,r.listStylePosition),this.listStyleType=K(A,Rn,r.listStyleType),this.marginTop=K(A,Yd,r.marginTop),this.marginRight=K(A,Jd,r.marginRight),this.marginBottom=K(A,$d,r.marginBottom),this.marginLeft=K(A,jd,r.marginLeft),this.opacity=K(A,Bp,r.opacity);var c=K(A,zd,r.overflow);this.overflowX=c[0],this.overflowY=c[c.length>1?1:0],this.overflowWrap=K(A,Zd,r.overflowWrap),this.paddingTop=K(A,qd,r.paddingTop),this.paddingRight=K(A,Ap,r.paddingRight),this.paddingBottom=K(A,ep,r.paddingBottom),this.paddingLeft=K(A,tp,r.paddingLeft),this.paintOrder=K(A,kp,r.paintOrder),this.position=K(A,np,r.position),this.textAlign=K(A,rp,r.textAlign),this.textDecorationColor=K(A,fp,(t=r.textDecorationColor)!==null&&t!==void 0?t:r.color),this.textDecorationLine=K(A,wp,(o=r.textDecorationLine)!==null&&o!==void 0?o:r.textDecoration),this.textShadow=K(A,sp,r.textShadow),this.textTransform=K(A,ip,r.textTransform),this.transform=K(A,op,r.transform),this.transformOrigin=K(A,pp,r.transformOrigin),this.visibility=K(A,up,r.visibility),this.webkitTextStrokeColor=K(A,Ip,r.webkitTextStrokeColor),this.webkitTextStrokeWidth=K(A,Sp,r.webkitTextStrokeWidth),this.wordBreak=K(A,hp,r.wordBreak),this.zIndex=K(A,gp,r.zIndex);}return e.prototype.isVisible=function(){return this.display>0&&this.opacity>0&&this.visibility===0},e.prototype.isTransparent=function(){return de(this.backgroundColor)},e.prototype.isTransformed=function(){return this.transform!==null},e.prototype.isPositioned=function(){return this.position!==0},e.prototype.isPositionedWithZIndex=function(){return this.isPositioned()&&!this.zIndex.auto},e.prototype.isFloating=function(){return this.float!==0},e.prototype.isInlineLevel=function(){return mA(this.display,4)||mA(this.display,33554432)||mA(this.display,268435456)||mA(this.display,536870912)||mA(this.display,67108864)||mA(this.display,134217728)},e})(),Tp=(function(){function e(A,r){this.content=K(A,Qp,r.content),this.quotes=K(A,Up,r.quotes);}return e})(),qi=(function(){function e(A,r){this.counterIncrement=K(A,Fp,r.counterIncrement),this.counterReset=K(A,xp,r.counterReset);}return e})(),K=function(e,A,r){var t=new Fi,o=r!==null&&typeof r<"u"?r.toString():A.initialValue;t.write(o);var c=new xi(t.read());switch(A.type){case 2:var u=c.parseComponentValue();return A.parse(e,iA(u)?u.value:A.initialValue);case 0:return A.parse(e,c.parseComponentValue());case 1:return A.parse(e,c.parseComponentValues());case 4:return c.parseComponentValue();case 3:switch(A.format){case "angle":return lr.parse(e,c.parseComponentValue());case "color":return ce.parse(e,c.parseComponentValue());case "image":return Mn.parse(e,c.parseComponentValue());case "length":var g=c.parseComponentValue();return ae(g)?g:CA;case "length-percentage":var h=c.parseComponentValue();return gA(h)?h:CA;case "time":return zi.parse(e,c.parseComponentValue())}break}},Dp="data-html2canvas-debug",Kp=function(e){var A=e.getAttribute(Dp);switch(A){case "all":return 1;case "clone":return 2;case "parse":return 3;case "render":return 4;default:return 0}},On=function(e,A){var r=Kp(e);return r===1||A===r},YA=(function(){function e(A,r){if(this.context=A,this.textNodes=[],this.elements=[],this.flags=0,On(r,3))debugger;this.styles=new Lp(A,window.getComputedStyle(r,null)),qn(r)&&(this.styles.animationDuration.some(function(t){return t>0})&&(r.style.animationDuration="0s"),this.styles.transform!==null&&(r.style.transform="none")),this.bounds=B(this.context,r),On(r,4)&&(this.flags|=16);}return e})(),Mp="AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",Ao="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",vt=typeof Uint8Array>"u"?[]:new Uint8Array(256),br=0;br<Ao.length;br++)vt[Ao.charCodeAt(br)]=br;for(var Rp=function(e){var A=e.length*.75,r=e.length,t,o=0,c,u,g,h;e[e.length-1]==="="&&(A--,e[e.length-2]==="="&&A--);var f=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(A):new Array(A),m=Array.isArray(f)?f:new Uint8Array(f);for(t=0;t<r;t+=4)c=vt[e.charCodeAt(t)],u=vt[e.charCodeAt(t+1)],g=vt[e.charCodeAt(t+2)],h=vt[e.charCodeAt(t+3)],m[o++]=c<<2|u>>4,m[o++]=(u&15)<<4|g>>2,m[o++]=(g&3)<<6|h&63;return f},Op=function(e){for(var A=e.length,r=[],t=0;t<A;t+=2)r.push(e[t+1]<<8|e[t]);return r},Np=function(e){for(var A=e.length,r=[],t=0;t<A;t+=4)r.push(e[t+3]<<24|e[t+2]<<16|e[t+1]<<8|e[t]);return r},ye=5,Nn=11,Pn=2,Pp=Nn-ye,eo=65536>>ye,_p=1<<ye,_n=_p-1,Gp=1024>>ye,Vp=eo+Gp,Xp=Vp,Wp=32,Yp=Xp+Wp,Jp=65536>>Nn,$p=1<<Pp,jp=$p-1,to=function(e,A,r){return e.slice?e.slice(A,r):new Uint16Array(Array.prototype.slice.call(e,A,r))},zp=function(e,A,r){return e.slice?e.slice(A,r):new Uint32Array(Array.prototype.slice.call(e,A,r))},Zp=function(e,A){var r=Rp(e),t=Array.isArray(r)?Np(r):new Uint32Array(r),o=Array.isArray(r)?Op(r):new Uint16Array(r),c=24,u=to(o,c/2,t[4]/2),g=t[5]===2?to(o,(c+t[4])/2):zp(t,Math.ceil((c+t[4])/4));return new qp(t[0],t[1],t[2],t[3],u,g)},qp=(function(){function e(A,r,t,o,c,u){this.initialValue=A,this.errorValue=r,this.highStart=t,this.highValueIndex=o,this.index=c,this.data=u;}return e.prototype.get=function(A){var r;if(A>=0){if(A<55296||A>56319&&A<=65535)return r=this.index[A>>ye],r=(r<<Pn)+(A&_n),this.data[r];if(A<=65535)return r=this.index[eo+(A-55296>>ye)],r=(r<<Pn)+(A&_n),this.data[r];if(A<this.highStart)return r=Yp-Jp+(A>>Nn),r=this.index[r],r+=A>>ye&jp,r=this.index[r],r=(r<<Pn)+(A&_n),this.data[r];if(A<=1114111)return this.data[this.highValueIndex]}return this.errorValue},e})(),ro="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Au=typeof Uint8Array>"u"?[]:new Uint8Array(256),Cr=0;Cr<ro.length;Cr++)Au[ro.charCodeAt(Cr)]=Cr;var eu=1,Gn=2,Vn=3,no=4,so=5,tu=7,io=8,Xn=9,Wn=10,oo=11,ao=12,lo=13,co=14,Yn=15,ru=function(e){for(var A=[],r=0,t=e.length;r<t;){var o=e.charCodeAt(r++);if(o>=55296&&o<=56319&&r<t){var c=e.charCodeAt(r++);(c&64512)===56320?A.push(((o&1023)<<10)+(c&1023)+65536):(A.push(o),r--);}else A.push(o);}return A},nu=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];if(String.fromCodePoint)return String.fromCodePoint.apply(String,e);var r=e.length;if(!r)return "";for(var t=[],o=-1,c="";++o<r;){var u=e[o];u<=65535?t.push(u):(u-=65536,t.push((u>>10)+55296,u%1024+56320)),(o+1===r||t.length>16384)&&(c+=String.fromCharCode.apply(String,t),t.length=0);}return c},su=Zp(Mp),MA="\xD7",Jn="\xF7",iu=function(e){return su.get(e)},ou=function(e,A,r){var t=r-2,o=A[t],c=A[r-1],u=A[r];if(c===Gn&&u===Vn)return MA;if(c===Gn||c===Vn||c===no||u===Gn||u===Vn||u===no)return Jn;if(c===io&&[io,Xn,oo,ao].indexOf(u)!==-1||(c===oo||c===Xn)&&(u===Xn||u===Wn)||(c===ao||c===Wn)&&u===Wn||u===lo||u===so||u===tu||c===eu)return MA;if(c===lo&&u===co){for(;o===so;)o=A[--t];if(o===co)return MA}if(c===Yn&&u===Yn){for(var g=0;o===Yn;)g++,o=A[--t];if(g%2===0)return MA}return Jn},au=function(e){var A=ru(e),r=A.length,t=0,o=0,c=A.map(iu);return {next:function(){if(t>=r)return {done:!0,value:null};for(var u=MA;t<r&&(u=ou(A,c,++t))===MA;);if(u!==MA||t===r){var g=nu.apply(null,A.slice(o,t));return o=t,{value:g,done:!1}}return {done:!0,value:null}}}},lu=function(e){for(var A=au(e),r=[],t;!(t=A.next()).done;)t.value&&r.push(t.value.slice());return r},cu=function(e){var A=123;if(e.createRange){var r=e.createRange();if(r.getBoundingClientRect){var t=e.createElement("boundtest");t.style.height=A+"px",t.style.display="block",e.body.appendChild(t),r.selectNode(t);var o=r.getBoundingClientRect(),c=Math.round(o.height);if(e.body.removeChild(t),c===A)return !0}}return !1},du=function(e){var A=e.createElement("boundtest");A.style.width="50px",A.style.display="block",A.style.fontSize="12px",A.style.letterSpacing="0px",A.style.wordSpacing="0px",e.body.appendChild(A);var r=e.createRange();A.innerHTML=typeof"".repeat=="function"?"&#128104;".repeat(10):"";var t=A.firstChild,o=y(t.data).map(function(h){return C(h)}),c=0,u={},g=o.every(function(h,f){r.setStart(t,c),r.setEnd(t,c+h.length);var m=r.getBoundingClientRect();c+=h.length;var v=m.x>u.x||m.y>u.y;return u=m,f===0?!0:v});return e.body.removeChild(A),g},pu=function(){return typeof new Image().crossOrigin<"u"},uu=function(){return typeof new XMLHttpRequest().responseType=="string"},hu=function(e){var A=new Image,r=e.createElement("canvas"),t=r.getContext("2d");if(!t)return !1;A.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{t.drawImage(A,0,0),r.toDataURL();}catch{return !1}return !0},po=function(e){return e[0]===0&&e[1]===255&&e[2]===0&&e[3]===255},gu=function(e){var A=e.createElement("canvas"),r=100;A.width=r,A.height=r;var t=A.getContext("2d");if(!t)return Promise.reject(!1);t.fillStyle="rgb(0, 255, 0)",t.fillRect(0,0,r,r);var o=new Image,c=A.toDataURL();o.src=c;var u=$n(r,r,0,0,o);return t.fillStyle="red",t.fillRect(0,0,r,r),uo(u).then(function(g){t.drawImage(g,0,0);var h=t.getImageData(0,0,r,r).data;t.fillStyle="red",t.fillRect(0,0,r,r);var f=e.createElement("div");return f.style.backgroundImage="url("+c+")",f.style.height=r+"px",po(h)?uo($n(r,r,0,0,f)):Promise.reject(!1)}).then(function(g){return t.drawImage(g,0,0),po(t.getImageData(0,0,r,r).data)}).catch(function(){return !1})},$n=function(e,A,r,t,o){var c="http://www.w3.org/2000/svg",u=document.createElementNS(c,"svg"),g=document.createElementNS(c,"foreignObject");return u.setAttributeNS(null,"width",e.toString()),u.setAttributeNS(null,"height",A.toString()),g.setAttributeNS(null,"width","100%"),g.setAttributeNS(null,"height","100%"),g.setAttributeNS(null,"x",r.toString()),g.setAttributeNS(null,"y",t.toString()),g.setAttributeNS(null,"externalResourcesRequired","true"),u.appendChild(g),g.appendChild(o),u},uo=function(e){return new Promise(function(A,r){var t=new Image;t.onload=function(){return A(t)},t.onerror=r,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(e));})},vA={get SUPPORT_RANGE_BOUNDS(){var e=cu(document);return Object.defineProperty(vA,"SUPPORT_RANGE_BOUNDS",{value:e}),e},get SUPPORT_WORD_BREAKING(){var e=vA.SUPPORT_RANGE_BOUNDS&&du(document);return Object.defineProperty(vA,"SUPPORT_WORD_BREAKING",{value:e}),e},get SUPPORT_SVG_DRAWING(){var e=hu(document);return Object.defineProperty(vA,"SUPPORT_SVG_DRAWING",{value:e}),e},get SUPPORT_FOREIGNOBJECT_DRAWING(){var e=typeof Array.from=="function"&&typeof window.fetch=="function"?gu(document):Promise.resolve(!1);return Object.defineProperty(vA,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:e}),e},get SUPPORT_CORS_IMAGES(){var e=pu();return Object.defineProperty(vA,"SUPPORT_CORS_IMAGES",{value:e}),e},get SUPPORT_RESPONSE_TYPE(){var e=uu();return Object.defineProperty(vA,"SUPPORT_RESPONSE_TYPE",{value:e}),e},get SUPPORT_CORS_XHR(){var e="withCredentials"in new XMLHttpRequest;return Object.defineProperty(vA,"SUPPORT_CORS_XHR",{value:e}),e},get SUPPORT_NATIVE_TEXT_SEGMENTATION(){var e=!!(typeof Intl<"u"&&Intl.Segmenter);return Object.defineProperty(vA,"SUPPORT_NATIVE_TEXT_SEGMENTATION",{value:e}),e}},yt=(function(){function e(A,r){this.text=A,this.bounds=r;}return e})(),Bu=function(e,A,r,t){var o=mu(A,r),c=[],u=0;return o.forEach(function(g){if(r.textDecorationLine.length||g.trim().length>0)if(vA.SUPPORT_RANGE_BOUNDS){var h=ho(t,u,g.length).getClientRects();if(h.length>1){var f=jn(g),m=0;f.forEach(function(x){c.push(new yt(x,p.fromDOMRectList(e,ho(t,m+u,x.length).getClientRects()))),m+=x.length;});}else c.push(new yt(g,p.fromDOMRectList(e,h)));}else {var v=t.splitText(g.length);c.push(new yt(g,fu(e,t))),t=v;}else vA.SUPPORT_RANGE_BOUNDS||(t=t.splitText(g.length));u+=g.length;}),c},fu=function(e,A){var r=A.ownerDocument;if(r){var t=r.createElement("html2canvaswrapper");t.appendChild(A.cloneNode(!0));var o=A.parentNode;if(o){o.replaceChild(t,A);var c=B(e,t);return t.firstChild&&o.replaceChild(t.firstChild,t),c}}return p.EMPTY},ho=function(e,A,r){var t=e.ownerDocument;if(!t)throw new Error("Node has no owner document");var o=t.createRange();return o.setStart(e,A),o.setEnd(e,A+r),o},jn=function(e){if(vA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var A=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Array.from(A.segment(e)).map(function(r){return r.segment})}return lu(e)},wu=function(e,A){if(vA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var r=new Intl.Segmenter(void 0,{granularity:"word"});return Array.from(r.segment(e)).map(function(t){return t.segment})}return Cu(e,A)},mu=function(e,A){return A.letterSpacing!==0?jn(e):wu(e,A)},bu=[32,160,4961,65792,65793,4153,4241],Cu=function(e,A){for(var r=Jl(e,{lineBreak:A.lineBreak,wordBreak:A.overflowWrap==="break-word"?"break-word":A.wordBreak}),t=[],o,c=function(){if(o.value){var u=o.value.slice(),g=y(u),h="";g.forEach(function(f){bu.indexOf(f)===-1?h+=C(f):(h.length&&t.push(h),t.push(C(f)),h="");}),h.length&&t.push(h);}};!(o=r.next()).done;)c();return t},vu=(function(){function e(A,r,t){this.text=yu(r.data,t.textTransform),this.textBounds=Bu(A,this.text,t,r);}return e})(),yu=function(e,A){switch(A){case 1:return e.toLowerCase();case 3:return e.replace(Qu,Fu);case 2:return e.toUpperCase();default:return e}},Qu=/(^|\s|:|-|\(|\))([a-z])/g,Fu=function(e,A,r){return e.length>0?A+r.toUpperCase():e},go=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this;return o.src=t.currentSrc||t.src,o.intrinsicWidth=t.naturalWidth,o.intrinsicHeight=t.naturalHeight,o.context.cache.addImage(o.src),o}return A})(YA),Bo=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this;return o.canvas=t,o.intrinsicWidth=t.width,o.intrinsicHeight=t.height,o}return A})(YA),fo=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this,c=new XMLSerializer,u=B(r,t);return t.setAttribute("width",u.width+"px"),t.setAttribute("height",u.height+"px"),o.svg="data:image/svg+xml,"+encodeURIComponent(c.serializeToString(t)),o.intrinsicWidth=t.width.baseVal.value,o.intrinsicHeight=t.height.baseVal.value,o.context.cache.addImage(o.svg),o}return A})(YA),wo=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this;return o.value=t.value,o}return A})(YA),zn=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this;return o.start=t.start,o.reversed=typeof t.reversed=="boolean"&&t.reversed===!0,o}return A})(YA),xu=[{type:15,flags:0,unit:"px",number:3}],Eu=[{type:16,flags:0,number:50}],Uu=function(e){return e.width>e.height?new p(e.left+(e.width-e.height)/2,e.top,e.height,e.height):e.width<e.height?new p(e.left,e.top+(e.height-e.width)/2,e.width,e.width):e},Hu=function(e){var A=e.type===ku?new Array(e.value.length+1).join("\u2022"):e.value;return A.length===0?e.placeholder||"":A},vr="checkbox",yr="radio",ku="password",mo=707406591,Zn=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this;switch(o.type=t.type.toLowerCase(),o.checked=t.checked,o.value=Hu(t),(o.type===vr||o.type===yr)&&(o.styles.backgroundColor=3739148031,o.styles.borderTopColor=o.styles.borderRightColor=o.styles.borderBottomColor=o.styles.borderLeftColor=2779096575,o.styles.borderTopWidth=o.styles.borderRightWidth=o.styles.borderBottomWidth=o.styles.borderLeftWidth=1,o.styles.borderTopStyle=o.styles.borderRightStyle=o.styles.borderBottomStyle=o.styles.borderLeftStyle=1,o.styles.backgroundClip=[0],o.styles.backgroundOrigin=[0],o.bounds=Uu(o.bounds)),o.type){case vr:o.styles.borderTopRightRadius=o.styles.borderTopLeftRadius=o.styles.borderBottomRightRadius=o.styles.borderBottomLeftRadius=xu;break;case yr:o.styles.borderTopRightRadius=o.styles.borderTopLeftRadius=o.styles.borderBottomRightRadius=o.styles.borderBottomLeftRadius=Eu;break}return o}return A})(YA),bo=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this,c=t.options[t.selectedIndex||0];return o.value=c&&c.text||"",o}return A})(YA),Co=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this;return o.value=t.value,o}return A})(YA),vo=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this;o.src=t.src,o.width=parseInt(t.width,10)||0,o.height=parseInt(t.height,10)||0,o.backgroundColor=o.styles.backgroundColor;try{if(t.contentWindow&&t.contentWindow.document&&t.contentWindow.document.documentElement){o.tree=Qo(r,t.contentWindow.document.documentElement);var c=t.contentWindow.document.documentElement?bt(r,getComputedStyle(t.contentWindow.document.documentElement).backgroundColor):qA.TRANSPARENT,u=t.contentWindow.document.body?bt(r,getComputedStyle(t.contentWindow.document.body).backgroundColor):qA.TRANSPARENT;o.backgroundColor=de(c)?de(u)?o.styles.backgroundColor:u:c;}}catch{}return o}return A})(YA),Iu=["OL","UL","MENU"],Qr=function(e,A,r,t){for(var o=A.firstChild,c=void 0;o;o=c)if(c=o.nextSibling,Fo(o)&&o.data.trim().length>0)r.textNodes.push(new vu(e,o,r.styles));else if(Xe(o))if(Io(o)&&o.assignedNodes)o.assignedNodes().forEach(function(g){return Qr(e,g,r,t)});else {var u=yo(e,o);u.styles.isVisible()&&(Su(o,u,t)?u.flags|=4:Lu(u.styles)&&(u.flags|=2),Iu.indexOf(o.tagName)!==-1&&(u.flags|=8),r.elements.push(u),o.slot,o.shadowRoot?Qr(e,o.shadowRoot,u,t):!xr(o)&&!xo(o)&&!Er(o)&&Qr(e,o,u,t));}},yo=function(e,A){return es(A)?new go(e,A):Eo(A)?new Bo(e,A):xo(A)?new fo(e,A):Tu(A)?new wo(e,A):Du(A)?new zn(e,A):Ku(A)?new Zn(e,A):Er(A)?new bo(e,A):xr(A)?new Co(e,A):Ho(A)?new vo(e,A):new YA(e,A)},Qo=function(e,A){var r=yo(e,A);return r.flags|=4,Qr(e,A,r,r),r},Su=function(e,A,r){return A.styles.isPositionedWithZIndex()||A.styles.opacity<1||A.styles.isTransformed()||As(e)&&r.styles.isTransparent()},Lu=function(e){return e.isPositioned()||e.isFloating()},Fo=function(e){return e.nodeType===Node.TEXT_NODE},Xe=function(e){return e.nodeType===Node.ELEMENT_NODE},qn=function(e){return Xe(e)&&typeof e.style<"u"&&!Fr(e)},Fr=function(e){return typeof e.className=="object"},Tu=function(e){return e.tagName==="LI"},Du=function(e){return e.tagName==="OL"},Ku=function(e){return e.tagName==="INPUT"},Mu=function(e){return e.tagName==="HTML"},xo=function(e){return e.tagName==="svg"},As=function(e){return e.tagName==="BODY"},Eo=function(e){return e.tagName==="CANVAS"},Uo=function(e){return e.tagName==="VIDEO"},es=function(e){return e.tagName==="IMG"},Ho=function(e){return e.tagName==="IFRAME"},ko=function(e){return e.tagName==="STYLE"},Ru=function(e){return e.tagName==="SCRIPT"},xr=function(e){return e.tagName==="TEXTAREA"},Er=function(e){return e.tagName==="SELECT"},Io=function(e){return e.tagName==="SLOT"},So=function(e){return e.tagName.indexOf("-")>0},Ou=(function(){function e(){this.counters={};}return e.prototype.getCounterValue=function(A){var r=this.counters[A];return r&&r.length?r[r.length-1]:1},e.prototype.getCounterValues=function(A){var r=this.counters[A];return r||[]},e.prototype.pop=function(A){var r=this;A.forEach(function(t){return r.counters[t].pop()});},e.prototype.parse=function(A){var r=this,t=A.counterIncrement,o=A.counterReset,c=!0;t!==null&&t.forEach(function(g){var h=r.counters[g.counter];h&&g.increment!==0&&(c=!1,h.length||h.push(1),h[Math.max(0,h.length-1)]+=g.increment);});var u=[];return c&&o.forEach(function(g){var h=r.counters[g.counter];u.push(g.counter),h||(h=r.counters[g.counter]=[]),h.push(g.reset);}),u},e})(),Lo={integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]},To={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["\u0554","\u0553","\u0552","\u0551","\u0550","\u054F","\u054E","\u054D","\u054C","\u054B","\u054A","\u0549","\u0548","\u0547","\u0546","\u0545","\u0544","\u0543","\u0542","\u0541","\u0540","\u053F","\u053E","\u053D","\u053C","\u053B","\u053A","\u0539","\u0538","\u0537","\u0536","\u0535","\u0534","\u0533","\u0532","\u0531"]},Nu={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["\u05D9\u05F3","\u05D8\u05F3","\u05D7\u05F3","\u05D6\u05F3","\u05D5\u05F3","\u05D4\u05F3","\u05D3\u05F3","\u05D2\u05F3","\u05D1\u05F3","\u05D0\u05F3","\u05EA","\u05E9","\u05E8","\u05E7","\u05E6","\u05E4","\u05E2","\u05E1","\u05E0","\u05DE","\u05DC","\u05DB","\u05D9\u05D8","\u05D9\u05D7","\u05D9\u05D6","\u05D8\u05D6","\u05D8\u05D5","\u05D9","\u05D8","\u05D7","\u05D6","\u05D5","\u05D4","\u05D3","\u05D2","\u05D1","\u05D0"]},Pu={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["\u10F5","\u10F0","\u10EF","\u10F4","\u10EE","\u10ED","\u10EC","\u10EB","\u10EA","\u10E9","\u10E8","\u10E7","\u10E6","\u10E5","\u10E4","\u10F3","\u10E2","\u10E1","\u10E0","\u10DF","\u10DE","\u10DD","\u10F2","\u10DC","\u10DB","\u10DA","\u10D9","\u10D8","\u10D7","\u10F1","\u10D6","\u10D5","\u10D4","\u10D3","\u10D2","\u10D1","\u10D0"]},We=function(e,A,r,t,o,c){return e<A||e>r?Ft(e,o,c.length>0):t.integers.reduce(function(u,g,h){for(;e>=g;)e-=g,u+=t.values[h];return u},"")+c},Do=function(e,A,r,t){var o="";do r||e--,o=t(e)+o,e/=A;while(e*A>=A);return o},hA=function(e,A,r,t,o){var c=r-A+1;return (e<0?"-":"")+(Do(Math.abs(e),c,t,function(u){return C(Math.floor(u%c)+A)})+o)},Qe=function(e,A,r){r===void 0&&(r=". ");var t=A.length;return Do(Math.abs(e),t,!1,function(o){return A[Math.floor(o%t)]})+r},Ye=1,ue=2,he=4,Qt=8,Ae=function(e,A,r,t,o,c){if(e<-9999||e>9999)return Ft(e,4,o.length>0);var u=Math.abs(e),g=o;if(u===0)return A[0]+g;for(var h=0;u>0&&h<=4;h++){var f=u%10;f===0&&mA(c,Ye)&&g!==""?g=A[f]+g:f>1||f===1&&h===0||f===1&&h===1&&mA(c,ue)||f===1&&h===1&&mA(c,he)&&e>100||f===1&&h>1&&mA(c,Qt)?g=A[f]+(h>0?r[h-1]:"")+g:f===1&&h>0&&(g=r[h-1]+g),u=Math.floor(u/10);}return (e<0?t:"")+g},Ko="\u5341\u767E\u5343\u842C",Mo="\u62FE\u4F70\u4EDF\u842C",Ro="\u30DE\u30A4\u30CA\u30B9",ts="\uB9C8\uC774\uB108\uC2A4",Ft=function(e,A,r){var t=r?". ":"",o=r?"\u3001":"",c=r?", ":"",u=r?" ":"";switch(A){case 0:return "\u2022"+u;case 1:return "\u25E6"+u;case 2:return "\u25FE"+u;case 5:var g=hA(e,48,57,!0,t);return g.length<4?"0"+g:g;case 4:return Qe(e,"\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D",o);case 6:return We(e,1,3999,Lo,3,t).toLowerCase();case 7:return We(e,1,3999,Lo,3,t);case 8:return hA(e,945,969,!1,t);case 9:return hA(e,97,122,!1,t);case 10:return hA(e,65,90,!1,t);case 11:return hA(e,1632,1641,!0,t);case 12:case 49:return We(e,1,9999,To,3,t);case 35:return We(e,1,9999,To,3,t).toLowerCase();case 13:return hA(e,2534,2543,!0,t);case 14:case 30:return hA(e,6112,6121,!0,t);case 15:return Qe(e,"\u5B50\u4E11\u5BC5\u536F\u8FB0\u5DF3\u5348\u672A\u7533\u9149\u620C\u4EA5",o);case 16:return Qe(e,"\u7532\u4E59\u4E19\u4E01\u620A\u5DF1\u5E9A\u8F9B\u58EC\u7678",o);case 17:case 48:return Ae(e,"\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D",Ko,"\u8CA0",o,ue|he|Qt);case 47:return Ae(e,"\u96F6\u58F9\u8CB3\u53C3\u8086\u4F0D\u9678\u67D2\u634C\u7396",Mo,"\u8CA0",o,Ye|ue|he|Qt);case 42:return Ae(e,"\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D",Ko,"\u8D1F",o,ue|he|Qt);case 41:return Ae(e,"\u96F6\u58F9\u8D30\u53C1\u8086\u4F0D\u9646\u67D2\u634C\u7396",Mo,"\u8D1F",o,Ye|ue|he|Qt);case 26:return Ae(e,"\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D","\u5341\u767E\u5343\u4E07",Ro,o,0);case 25:return Ae(e,"\u96F6\u58F1\u5F10\u53C2\u56DB\u4F0D\u516D\u4E03\u516B\u4E5D","\u62FE\u767E\u5343\u4E07",Ro,o,Ye|ue|he);case 31:return Ae(e,"\uC601\uC77C\uC774\uC0BC\uC0AC\uC624\uC721\uCE60\uD314\uAD6C","\uC2ED\uBC31\uCC9C\uB9CC",ts,c,Ye|ue|he);case 33:return Ae(e,"\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D","\u5341\u767E\u5343\u842C",ts,c,0);case 32:return Ae(e,"\u96F6\u58F9\u8CB3\u53C3\u56DB\u4E94\u516D\u4E03\u516B\u4E5D","\u62FE\u767E\u5343",ts,c,Ye|ue|he);case 18:return hA(e,2406,2415,!0,t);case 20:return We(e,1,19999,Pu,3,t);case 21:return hA(e,2790,2799,!0,t);case 22:return hA(e,2662,2671,!0,t);case 22:return We(e,1,10999,Nu,3,t);case 23:return Qe(e,"\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066\u3068\u306A\u306B\u306C\u306D\u306E\u306F\u3072\u3075\u3078\u307B\u307E\u307F\u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308A\u308B\u308C\u308D\u308F\u3090\u3091\u3092\u3093");case 24:return Qe(e,"\u3044\u308D\u306F\u306B\u307B\u3078\u3068\u3061\u308A\u306C\u308B\u3092\u308F\u304B\u3088\u305F\u308C\u305D\u3064\u306D\u306A\u3089\u3080\u3046\u3090\u306E\u304A\u304F\u3084\u307E\u3051\u3075\u3053\u3048\u3066\u3042\u3055\u304D\u3086\u3081\u307F\u3057\u3091\u3072\u3082\u305B\u3059");case 27:return hA(e,3302,3311,!0,t);case 28:return Qe(e,"\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F0\u30F1\u30F2\u30F3",o);case 29:return Qe(e,"\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4\u30CD\u30CA\u30E9\u30E0\u30A6\u30F0\u30CE\u30AA\u30AF\u30E4\u30DE\u30B1\u30D5\u30B3\u30A8\u30C6\u30A2\u30B5\u30AD\u30E6\u30E1\u30DF\u30B7\u30F1\u30D2\u30E2\u30BB\u30B9",o);case 34:return hA(e,3792,3801,!0,t);case 37:return hA(e,6160,6169,!0,t);case 38:return hA(e,4160,4169,!0,t);case 39:return hA(e,2918,2927,!0,t);case 40:return hA(e,1776,1785,!0,t);case 43:return hA(e,3046,3055,!0,t);case 44:return hA(e,3174,3183,!0,t);case 45:return hA(e,3664,3673,!0,t);case 46:return hA(e,3872,3881,!0,t);default:return hA(e,48,57,!0,t)}},Oo="data-html2canvas-ignore",No=(function(){function e(A,r,t){if(this.context=A,this.options=t,this.scrolledElements=[],this.referenceElement=r,this.counters=new Ou,this.quoteDepth=0,!r.ownerDocument)throw new Error("Cloned element does not have an owner document");this.documentElement=this.cloneNode(r.ownerDocument.documentElement,!1);}return e.prototype.toIFrame=function(A,r){var t=this,o=_u(A,r);if(!o.contentWindow)return Promise.reject("Unable to find iframe window");var c=A.defaultView.pageXOffset,u=A.defaultView.pageYOffset,g=o.contentWindow,h=g.document,f=Xu(o).then(function(){return a(t,void 0,void 0,function(){var m,v;return l(this,function(x){switch(x.label){case 0:return this.scrolledElements.forEach($u),g&&(g.scrollTo(r.left,r.top),/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&(g.scrollY!==r.top||g.scrollX!==r.left)&&(this.context.logger.warn("Unable to restore scroll position for cloned document"),this.context.windowBounds=this.context.windowBounds.add(g.scrollX-r.left,g.scrollY-r.top,0,0))),m=this.options.onclone,v=this.clonedReferenceElement,typeof v>"u"?[2,Promise.reject("Error finding the "+this.referenceElement.nodeName+" in the cloned document")]:h.fonts&&h.fonts.ready?[4,h.fonts.ready]:[3,2];case 1:x.sent(),x.label=2;case 2:return /(AppleWebKit)/g.test(navigator.userAgent)?[4,Vu(h)]:[3,4];case 3:x.sent(),x.label=4;case 4:return typeof m=="function"?[2,Promise.resolve().then(function(){return m(h,v)}).then(function(){return o})]:[2,o]}})})});return h.open(),h.write(Yu(document.doctype)+"<html></html>"),Ju(this.referenceElement.ownerDocument,c,u),h.replaceChild(h.adoptNode(this.documentElement),h.documentElement),h.close(),f},e.prototype.createElementClone=function(A){if(On(A,2))debugger;if(Eo(A))return this.createCanvasClone(A);if(Uo(A))return this.createVideoClone(A);if(ko(A))return this.createStyleClone(A);var r=A.cloneNode(!1);return es(r)&&(es(A)&&A.currentSrc&&A.currentSrc!==A.src&&(r.src=A.currentSrc,r.srcset=""),r.loading==="lazy"&&(r.loading="eager")),So(r)?this.createCustomElementClone(r):r},e.prototype.createCustomElementClone=function(A){var r=document.createElement("html2canvascustomelement");return rs(A.style,r),r},e.prototype.createStyleClone=function(A){try{var r=A.sheet;if(r&&r.cssRules){var t=[].slice.call(r.cssRules,0).reduce(function(c,u){return u&&typeof u.cssText=="string"?c+u.cssText:c},""),o=A.cloneNode(!1);return o.textContent=t,o}}catch(c){if(this.context.logger.error("Unable to access cssRules property",c),c.name!=="SecurityError")throw c}return A.cloneNode(!1)},e.prototype.createCanvasClone=function(A){var r;if(this.options.inlineImages&&A.ownerDocument){var t=A.ownerDocument.createElement("img");try{return t.src=A.toDataURL(),t}catch{this.context.logger.info("Unable to inline canvas contents, canvas is tainted",A);}}var o=A.cloneNode(!1);try{o.width=A.width,o.height=A.height;var c=A.getContext("2d"),u=o.getContext("2d");if(u)if(!this.options.allowTaint&&c)u.putImageData(c.getImageData(0,0,A.width,A.height),0,0);else {var g=(r=A.getContext("webgl2"))!==null&&r!==void 0?r:A.getContext("webgl");if(g){var h=g.getContextAttributes();h?.preserveDrawingBuffer===!1&&this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false",A);}u.drawImage(A,0,0);}return o}catch{this.context.logger.info("Unable to clone canvas as it is tainted",A);}return o},e.prototype.createVideoClone=function(A){var r=A.ownerDocument.createElement("canvas");r.width=A.offsetWidth,r.height=A.offsetHeight;var t=r.getContext("2d");try{return t&&(t.drawImage(A,0,0,r.width,r.height),this.options.allowTaint||t.getImageData(0,0,r.width,r.height)),r}catch{this.context.logger.info("Unable to clone video as it is tainted",A);}var o=A.ownerDocument.createElement("canvas");return o.width=A.offsetWidth,o.height=A.offsetHeight,o},e.prototype.appendChildNode=function(A,r,t){(!Xe(r)||!Ru(r)&&!r.hasAttribute(Oo)&&(typeof this.options.ignoreElements!="function"||!this.options.ignoreElements(r)))&&(!this.options.copyStyles||!Xe(r)||!ko(r))&&A.appendChild(this.cloneNode(r,t));},e.prototype.cloneChildNodes=function(A,r,t){for(var o=this,c=A.shadowRoot?A.shadowRoot.firstChild:A.firstChild;c;c=c.nextSibling)if(Xe(c)&&Io(c)&&typeof c.assignedNodes=="function"){var u=c.assignedNodes();u.length&&u.forEach(function(g){return o.appendChildNode(r,g,t)});}else this.appendChildNode(r,c,t);},e.prototype.cloneNode=function(A,r){if(Fo(A))return document.createTextNode(A.data);if(!A.ownerDocument)return A.cloneNode(!1);var t=A.ownerDocument.defaultView;if(t&&Xe(A)&&(qn(A)||Fr(A))){var o=this.createElementClone(A);o.style.transitionProperty="none";var c=t.getComputedStyle(A),u=t.getComputedStyle(A,":before"),g=t.getComputedStyle(A,":after");this.referenceElement===A&&qn(o)&&(this.clonedReferenceElement=o),As(o)&&Zu(o);var h=this.counters.parse(new qi(this.context,c)),f=this.resolvePseudoContent(A,o,u,xt.BEFORE);So(A)&&(r=!0),Uo(A)||this.cloneChildNodes(A,o,r),f&&o.insertBefore(f,o.firstChild);var m=this.resolvePseudoContent(A,o,g,xt.AFTER);return m&&o.appendChild(m),this.counters.pop(h),(c&&(this.options.copyStyles||Fr(A))&&!Ho(A)||r)&&rs(c,o),(A.scrollTop!==0||A.scrollLeft!==0)&&this.scrolledElements.push([o,A.scrollLeft,A.scrollTop]),(xr(A)||Er(A))&&(xr(o)||Er(o))&&(o.value=A.value),o}return A.cloneNode(!1)},e.prototype.resolvePseudoContent=function(A,r,t,o){var c=this;if(t){var u=t.content,g=r.ownerDocument;if(!(!g||!u||u==="none"||u==="-moz-alt-content"||t.display==="none")){this.counters.parse(new qi(this.context,t));var h=new Tp(this.context,t),f=g.createElement("html2canvaspseudoelement");rs(t,f),h.content.forEach(function(v){if(v.type===0)f.appendChild(g.createTextNode(v.value));else if(v.type===22){var x=g.createElement("img");x.src=v.value,x.style.opacity="1",f.appendChild(x);}else if(v.type===18){if(v.name==="attr"){var D=v.values.filter(iA);D.length&&f.appendChild(g.createTextNode(A.getAttribute(D[0].value)||""));}else if(v.name==="counter"){var H=v.values.filter(Ge),I=H[0],J=H[1];if(I&&iA(I)){var P=c.counters.getCounterValue(I.value),N=J&&iA(J)?Rn.parse(c.context,J.value):3;f.appendChild(g.createTextNode(Ft(P,N,!1)));}}else if(v.name==="counters"){var eA=v.values.filter(Ge),I=eA[0],$=eA[1],J=eA[2];if(I&&iA(I)){var W=c.counters.getCounterValues(I.value),T=J&&iA(J)?Rn.parse(c.context,J.value):3,q=$&&$.type===0?$.value:"",AA=W.map(function(UA){return Ft(UA,T,!1)}).join(q);f.appendChild(g.createTextNode(AA));}}}else if(v.type===20)switch(v.value){case "open-quote":f.appendChild(g.createTextNode(Zi(h.quotes,c.quoteDepth++,!0)));break;case "close-quote":f.appendChild(g.createTextNode(Zi(h.quotes,--c.quoteDepth,!1)));break;default:f.appendChild(g.createTextNode(v.value));}}),f.className=ns+" "+ss;var m=o===xt.BEFORE?" "+ns:" "+ss;return Fr(r)?r.className.baseValue+=m:r.className+=m,f}}},e.destroy=function(A){return A.parentNode?(A.parentNode.removeChild(A),!0):!1},e})(),xt;(function(e){e[e.BEFORE=0]="BEFORE",e[e.AFTER=1]="AFTER";})(xt||(xt={}));var _u=function(e,A){var r=e.createElement("iframe");return r.className="html2canvas-container",r.style.visibility="hidden",r.style.position="fixed",r.style.left="-10000px",r.style.top="0px",r.style.border="0",r.width=A.width.toString(),r.height=A.height.toString(),r.scrolling="no",r.setAttribute(Oo,"true"),e.body.appendChild(r),r},Gu=function(e){return new Promise(function(A){if(e.complete){A();return}if(!e.src){A();return}e.onload=A,e.onerror=A;})},Vu=function(e){return Promise.all([].slice.call(e.images,0).map(Gu))},Xu=function(e){return new Promise(function(A,r){var t=e.contentWindow;if(!t)return r("No window assigned for iframe");var o=t.document;t.onload=e.onload=function(){t.onload=e.onload=null;var c=setInterval(function(){o.body.childNodes.length>0&&o.readyState==="complete"&&(clearInterval(c),A(e));},50);};})},Wu=["all","d","content"],rs=function(e,A){for(var r=e.length-1;r>=0;r--){var t=e.item(r);Wu.indexOf(t)===-1&&A.style.setProperty(t,e.getPropertyValue(t));}return A},Yu=function(e){var A="";return e&&(A+="<!DOCTYPE ",e.name&&(A+=e.name),e.internalSubset&&(A+=e.internalSubset),e.publicId&&(A+='"'+e.publicId+'"'),e.systemId&&(A+='"'+e.systemId+'"'),A+=">"),A},Ju=function(e,A,r){e&&e.defaultView&&(A!==e.defaultView.pageXOffset||r!==e.defaultView.pageYOffset)&&e.defaultView.scrollTo(A,r);},$u=function(e){var A=e[0],r=e[1],t=e[2];A.scrollLeft=r,A.scrollTop=t;},ju=":before",zu=":after",ns="___html2canvas___pseudoelement_before",ss="___html2canvas___pseudoelement_after",Po=`{
    content: "" !important;
    display: none !important;
}`,Zu=function(e){qu(e,"."+ns+ju+Po+`
         .`+ss+zu+Po);},qu=function(e,A){var r=e.ownerDocument;if(r){var t=r.createElement("style");t.textContent=A,e.appendChild(t);}},_o=(function(){function e(){}return e.getOrigin=function(A){var r=e._link;return r?(r.href=A,r.href=r.href,r.protocol+r.hostname+r.port):"about:blank"},e.isSameOrigin=function(A){return e.getOrigin(A)===e._origin},e.setContext=function(A){e._link=A.document.createElement("a"),e._origin=e.getOrigin(A.location.href);},e._origin="about:blank",e})(),Ah=(function(){function e(A,r){this.context=A,this._options=r,this._cache={};}return e.prototype.addImage=function(A){var r=Promise.resolve();return this.has(A)||(os(A)||nh(A))&&(this._cache[A]=this.loadImage(A)).catch(function(){}),r},e.prototype.match=function(A){return this._cache[A]},e.prototype.loadImage=function(A){return a(this,void 0,void 0,function(){var r,t,o,c,u=this;return l(this,function(g){switch(g.label){case 0:return r=_o.isSameOrigin(A),t=!is(A)&&this._options.useCORS===!0&&vA.SUPPORT_CORS_IMAGES&&!r,o=!is(A)&&!r&&!os(A)&&typeof this._options.proxy=="string"&&vA.SUPPORT_CORS_XHR&&!t,!r&&this._options.allowTaint===!1&&!is(A)&&!os(A)&&!o&&!t?[2]:(c=A,o?[4,this.proxy(c)]:[3,2]);case 1:c=g.sent(),g.label=2;case 2:return this.context.logger.debug("Added image "+A.substring(0,256)),[4,new Promise(function(h,f){var m=new Image;m.onload=function(){return h(m)},m.onerror=f,(sh(c)||t)&&(m.crossOrigin="anonymous"),m.src=c,m.complete===!0&&setTimeout(function(){return h(m)},500),u._options.imageTimeout>0&&setTimeout(function(){return f("Timed out ("+u._options.imageTimeout+"ms) loading image")},u._options.imageTimeout);})];case 3:return [2,g.sent()]}})})},e.prototype.has=function(A){return typeof this._cache[A]<"u"},e.prototype.keys=function(){return Promise.resolve(Object.keys(this._cache))},e.prototype.proxy=function(A){var r=this,t=this._options.proxy;if(!t)throw new Error("No proxy defined");var o=A.substring(0,256);return new Promise(function(c,u){var g=vA.SUPPORT_RESPONSE_TYPE?"blob":"text",h=new XMLHttpRequest;h.onload=function(){if(h.status===200)if(g==="text")c(h.response);else {var v=new FileReader;v.addEventListener("load",function(){return c(v.result)},!1),v.addEventListener("error",function(x){return u(x)},!1),v.readAsDataURL(h.response);}else u("Failed to proxy resource "+o+" with status code "+h.status);},h.onerror=u;var f=t.indexOf("?")>-1?"&":"?";if(h.open("GET",""+t+f+"url="+encodeURIComponent(A)+"&responseType="+g),g!=="text"&&h instanceof XMLHttpRequest&&(h.responseType=g),r._options.imageTimeout){var m=r._options.imageTimeout;h.timeout=m,h.ontimeout=function(){return u("Timed out ("+m+"ms) proxying "+o)};}h.send();})},e})(),eh=/^data:image\/svg\+xml/i,th=/^data:image\/.*;base64,/i,rh=/^data:image\/.*/i,nh=function(e){return vA.SUPPORT_SVG_DRAWING||!ih(e)},is=function(e){return rh.test(e)},sh=function(e){return th.test(e)},os=function(e){return e.substr(0,4)==="blob"},ih=function(e){return e.substr(-3).toLowerCase()==="svg"||eh.test(e)},L=(function(){function e(A,r){this.type=0,this.x=A,this.y=r;}return e.prototype.add=function(A,r){return new e(this.x+A,this.y+r)},e})(),Je=function(e,A,r){return new L(e.x+(A.x-e.x)*r,e.y+(A.y-e.y)*r)},Ur=(function(){function e(A,r,t,o){this.type=1,this.start=A,this.startControl=r,this.endControl=t,this.end=o;}return e.prototype.subdivide=function(A,r){var t=Je(this.start,this.startControl,A),o=Je(this.startControl,this.endControl,A),c=Je(this.endControl,this.end,A),u=Je(t,o,A),g=Je(o,c,A),h=Je(u,g,A);return r?new e(this.start,t,u,h):new e(h,g,c,this.end)},e.prototype.add=function(A,r){return new e(this.start.add(A,r),this.startControl.add(A,r),this.endControl.add(A,r),this.end.add(A,r))},e.prototype.reverse=function(){return new e(this.end,this.endControl,this.startControl,this.start)},e})(),RA=function(e){return e.type===1},oh=(function(){function e(A){var r=A.styles,t=A.bounds,o=mt(r.borderTopLeftRadius,t.width,t.height),c=o[0],u=o[1],g=mt(r.borderTopRightRadius,t.width,t.height),h=g[0],f=g[1],m=mt(r.borderBottomRightRadius,t.width,t.height),v=m[0],x=m[1],D=mt(r.borderBottomLeftRadius,t.width,t.height),H=D[0],I=D[1],J=[];J.push((c+h)/t.width),J.push((H+v)/t.width),J.push((u+I)/t.height),J.push((f+x)/t.height);var P=Math.max.apply(Math,J);P>1&&(c/=P,u/=P,h/=P,f/=P,v/=P,x/=P,H/=P,I/=P);var N=t.width-h,eA=t.height-x,$=t.width-v,W=t.height-I,T=r.borderTopWidth,q=r.borderRightWidth,AA=r.borderBottomWidth,Y=r.borderLeftWidth,BA=cA(r.paddingTop,A.bounds.width),UA=cA(r.paddingRight,A.bounds.width),TA=cA(r.paddingBottom,A.bounds.width),oA=cA(r.paddingLeft,A.bounds.width);this.topLeftBorderDoubleOuterBox=c>0||u>0?pA(t.left+Y/3,t.top+T/3,c-Y/3,u-T/3,rA.TOP_LEFT):new L(t.left+Y/3,t.top+T/3),this.topRightBorderDoubleOuterBox=c>0||u>0?pA(t.left+N,t.top+T/3,h-q/3,f-T/3,rA.TOP_RIGHT):new L(t.left+t.width-q/3,t.top+T/3),this.bottomRightBorderDoubleOuterBox=v>0||x>0?pA(t.left+$,t.top+eA,v-q/3,x-AA/3,rA.BOTTOM_RIGHT):new L(t.left+t.width-q/3,t.top+t.height-AA/3),this.bottomLeftBorderDoubleOuterBox=H>0||I>0?pA(t.left+Y/3,t.top+W,H-Y/3,I-AA/3,rA.BOTTOM_LEFT):new L(t.left+Y/3,t.top+t.height-AA/3),this.topLeftBorderDoubleInnerBox=c>0||u>0?pA(t.left+Y*2/3,t.top+T*2/3,c-Y*2/3,u-T*2/3,rA.TOP_LEFT):new L(t.left+Y*2/3,t.top+T*2/3),this.topRightBorderDoubleInnerBox=c>0||u>0?pA(t.left+N,t.top+T*2/3,h-q*2/3,f-T*2/3,rA.TOP_RIGHT):new L(t.left+t.width-q*2/3,t.top+T*2/3),this.bottomRightBorderDoubleInnerBox=v>0||x>0?pA(t.left+$,t.top+eA,v-q*2/3,x-AA*2/3,rA.BOTTOM_RIGHT):new L(t.left+t.width-q*2/3,t.top+t.height-AA*2/3),this.bottomLeftBorderDoubleInnerBox=H>0||I>0?pA(t.left+Y*2/3,t.top+W,H-Y*2/3,I-AA*2/3,rA.BOTTOM_LEFT):new L(t.left+Y*2/3,t.top+t.height-AA*2/3),this.topLeftBorderStroke=c>0||u>0?pA(t.left+Y/2,t.top+T/2,c-Y/2,u-T/2,rA.TOP_LEFT):new L(t.left+Y/2,t.top+T/2),this.topRightBorderStroke=c>0||u>0?pA(t.left+N,t.top+T/2,h-q/2,f-T/2,rA.TOP_RIGHT):new L(t.left+t.width-q/2,t.top+T/2),this.bottomRightBorderStroke=v>0||x>0?pA(t.left+$,t.top+eA,v-q/2,x-AA/2,rA.BOTTOM_RIGHT):new L(t.left+t.width-q/2,t.top+t.height-AA/2),this.bottomLeftBorderStroke=H>0||I>0?pA(t.left+Y/2,t.top+W,H-Y/2,I-AA/2,rA.BOTTOM_LEFT):new L(t.left+Y/2,t.top+t.height-AA/2),this.topLeftBorderBox=c>0||u>0?pA(t.left,t.top,c,u,rA.TOP_LEFT):new L(t.left,t.top),this.topRightBorderBox=h>0||f>0?pA(t.left+N,t.top,h,f,rA.TOP_RIGHT):new L(t.left+t.width,t.top),this.bottomRightBorderBox=v>0||x>0?pA(t.left+$,t.top+eA,v,x,rA.BOTTOM_RIGHT):new L(t.left+t.width,t.top+t.height),this.bottomLeftBorderBox=H>0||I>0?pA(t.left,t.top+W,H,I,rA.BOTTOM_LEFT):new L(t.left,t.top+t.height),this.topLeftPaddingBox=c>0||u>0?pA(t.left+Y,t.top+T,Math.max(0,c-Y),Math.max(0,u-T),rA.TOP_LEFT):new L(t.left+Y,t.top+T),this.topRightPaddingBox=h>0||f>0?pA(t.left+Math.min(N,t.width-q),t.top+T,N>t.width+q?0:Math.max(0,h-q),Math.max(0,f-T),rA.TOP_RIGHT):new L(t.left+t.width-q,t.top+T),this.bottomRightPaddingBox=v>0||x>0?pA(t.left+Math.min($,t.width-Y),t.top+Math.min(eA,t.height-AA),Math.max(0,v-q),Math.max(0,x-AA),rA.BOTTOM_RIGHT):new L(t.left+t.width-q,t.top+t.height-AA),this.bottomLeftPaddingBox=H>0||I>0?pA(t.left+Y,t.top+Math.min(W,t.height-AA),Math.max(0,H-Y),Math.max(0,I-AA),rA.BOTTOM_LEFT):new L(t.left+Y,t.top+t.height-AA),this.topLeftContentBox=c>0||u>0?pA(t.left+Y+oA,t.top+T+BA,Math.max(0,c-(Y+oA)),Math.max(0,u-(T+BA)),rA.TOP_LEFT):new L(t.left+Y+oA,t.top+T+BA),this.topRightContentBox=h>0||f>0?pA(t.left+Math.min(N,t.width+Y+oA),t.top+T+BA,N>t.width+Y+oA?0:h-Y+oA,f-(T+BA),rA.TOP_RIGHT):new L(t.left+t.width-(q+UA),t.top+T+BA),this.bottomRightContentBox=v>0||x>0?pA(t.left+Math.min($,t.width-(Y+oA)),t.top+Math.min(eA,t.height+T+BA),Math.max(0,v-(q+UA)),x-(AA+TA),rA.BOTTOM_RIGHT):new L(t.left+t.width-(q+UA),t.top+t.height-(AA+TA)),this.bottomLeftContentBox=H>0||I>0?pA(t.left+Y+oA,t.top+W,Math.max(0,H-(Y+oA)),I-(AA+TA),rA.BOTTOM_LEFT):new L(t.left+Y+oA,t.top+t.height-(AA+TA));}return e})(),rA;(function(e){e[e.TOP_LEFT=0]="TOP_LEFT",e[e.TOP_RIGHT=1]="TOP_RIGHT",e[e.BOTTOM_RIGHT=2]="BOTTOM_RIGHT",e[e.BOTTOM_LEFT=3]="BOTTOM_LEFT";})(rA||(rA={}));var pA=function(e,A,r,t,o){var c=4*((Math.sqrt(2)-1)/3),u=r*c,g=t*c,h=e+r,f=A+t;switch(o){case rA.TOP_LEFT:return new Ur(new L(e,f),new L(e,f-g),new L(h-u,A),new L(h,A));case rA.TOP_RIGHT:return new Ur(new L(e,A),new L(e+u,A),new L(h,f-g),new L(h,f));case rA.BOTTOM_RIGHT:return new Ur(new L(h,A),new L(h,A+g),new L(e+u,f),new L(e,f));case rA.BOTTOM_LEFT:default:return new Ur(new L(h,f),new L(h-u,f),new L(e,A+g),new L(e,A))}},Hr=function(e){return [e.topLeftBorderBox,e.topRightBorderBox,e.bottomRightBorderBox,e.bottomLeftBorderBox]},ah=function(e){return [e.topLeftContentBox,e.topRightContentBox,e.bottomRightContentBox,e.bottomLeftContentBox]},kr=function(e){return [e.topLeftPaddingBox,e.topRightPaddingBox,e.bottomRightPaddingBox,e.bottomLeftPaddingBox]},lh=(function(){function e(A,r,t){this.offsetX=A,this.offsetY=r,this.matrix=t,this.type=0,this.target=6;}return e})(),Ir=(function(){function e(A,r){this.path=A,this.target=r,this.type=1;}return e})(),ch=(function(){function e(A){this.opacity=A,this.type=2,this.target=6;}return e})(),dh=function(e){return e.type===0},Go=function(e){return e.type===1},ph=function(e){return e.type===2},Vo=function(e,A){return e.length===A.length?e.some(function(r,t){return r===A[t]}):!1},uh=function(e,A,r,t,o){return e.map(function(c,u){switch(u){case 0:return c.add(A,r);case 1:return c.add(A+t,r);case 2:return c.add(A+t,r+o);case 3:return c.add(A,r+o)}return c})},Xo=(function(){function e(A){this.element=A,this.inlineLevel=[],this.nonInlineLevel=[],this.negativeZIndex=[],this.zeroOrAutoZIndexOrTransformedOrOpacity=[],this.positiveZIndex=[],this.nonPositionedFloats=[],this.nonPositionedInlineLevel=[];}return e})(),Wo=(function(){function e(A,r){if(this.container=A,this.parent=r,this.effects=[],this.curves=new oh(this.container),this.container.styles.opacity<1&&this.effects.push(new ch(this.container.styles.opacity)),this.container.styles.transform!==null){var t=this.container.bounds.left+this.container.styles.transformOrigin[0].number,o=this.container.bounds.top+this.container.styles.transformOrigin[1].number,c=this.container.styles.transform;this.effects.push(new lh(t,o,c));}if(this.container.styles.overflowX!==0){var u=Hr(this.curves),g=kr(this.curves);Vo(u,g)?this.effects.push(new Ir(u,6)):(this.effects.push(new Ir(u,2)),this.effects.push(new Ir(g,4)));}}return e.prototype.getEffects=function(A){for(var r=[2,3].indexOf(this.container.styles.position)===-1,t=this.parent,o=this.effects.slice(0);t;){var c=t.effects.filter(function(h){return !Go(h)});if(r||t.container.styles.position!==0||!t.parent){if(o.unshift.apply(o,c),r=[2,3].indexOf(t.container.styles.position)===-1,t.container.styles.overflowX!==0){var u=Hr(t.curves),g=kr(t.curves);Vo(u,g)||o.unshift(new Ir(g,6));}}else o.unshift.apply(o,c);t=t.parent;}return o.filter(function(h){return mA(h.target,A)})},e})(),as=function(e,A,r,t){e.container.elements.forEach(function(o){var c=mA(o.flags,4),u=mA(o.flags,2),g=new Wo(o,e);mA(o.styles.display,2048)&&t.push(g);var h=mA(o.flags,8)?[]:t;if(c||u){var f=c||o.styles.isPositioned()?r:A,m=new Xo(g);if(o.styles.isPositioned()||o.styles.opacity<1||o.styles.isTransformed()){var v=o.styles.zIndex.order;if(v<0){var x=0;f.negativeZIndex.some(function(H,I){return v>H.element.container.styles.zIndex.order?(x=I,!1):x>0}),f.negativeZIndex.splice(x,0,m);}else if(v>0){var D=0;f.positiveZIndex.some(function(H,I){return v>=H.element.container.styles.zIndex.order?(D=I+1,!1):D>0}),f.positiveZIndex.splice(D,0,m);}else f.zeroOrAutoZIndexOrTransformedOrOpacity.push(m);}else o.styles.isFloating()?f.nonPositionedFloats.push(m):f.nonPositionedInlineLevel.push(m);as(g,m,c?m:r,h);}else o.styles.isInlineLevel()?A.inlineLevel.push(g):A.nonInlineLevel.push(g),as(g,A,r,h);mA(o.flags,8)&&Yo(o,h);});},Yo=function(e,A){for(var r=e instanceof zn?e.start:1,t=e instanceof zn?e.reversed:!1,o=0;o<A.length;o++){var c=A[o];c.container instanceof wo&&typeof c.container.value=="number"&&c.container.value!==0&&(r=c.container.value),c.listValue=Ft(r,c.container.styles.listStyleType,!0),r+=t?-1:1;}},hh=function(e){var A=new Wo(e,null),r=new Xo(A),t=[];return as(A,r,r,t),Yo(A.container,t),r},Jo=function(e,A){switch(A){case 0:return OA(e.topLeftBorderBox,e.topLeftPaddingBox,e.topRightBorderBox,e.topRightPaddingBox);case 1:return OA(e.topRightBorderBox,e.topRightPaddingBox,e.bottomRightBorderBox,e.bottomRightPaddingBox);case 2:return OA(e.bottomRightBorderBox,e.bottomRightPaddingBox,e.bottomLeftBorderBox,e.bottomLeftPaddingBox);default:return OA(e.bottomLeftBorderBox,e.bottomLeftPaddingBox,e.topLeftBorderBox,e.topLeftPaddingBox)}},gh=function(e,A){switch(A){case 0:return OA(e.topLeftBorderBox,e.topLeftBorderDoubleOuterBox,e.topRightBorderBox,e.topRightBorderDoubleOuterBox);case 1:return OA(e.topRightBorderBox,e.topRightBorderDoubleOuterBox,e.bottomRightBorderBox,e.bottomRightBorderDoubleOuterBox);case 2:return OA(e.bottomRightBorderBox,e.bottomRightBorderDoubleOuterBox,e.bottomLeftBorderBox,e.bottomLeftBorderDoubleOuterBox);default:return OA(e.bottomLeftBorderBox,e.bottomLeftBorderDoubleOuterBox,e.topLeftBorderBox,e.topLeftBorderDoubleOuterBox)}},Bh=function(e,A){switch(A){case 0:return OA(e.topLeftBorderDoubleInnerBox,e.topLeftPaddingBox,e.topRightBorderDoubleInnerBox,e.topRightPaddingBox);case 1:return OA(e.topRightBorderDoubleInnerBox,e.topRightPaddingBox,e.bottomRightBorderDoubleInnerBox,e.bottomRightPaddingBox);case 2:return OA(e.bottomRightBorderDoubleInnerBox,e.bottomRightPaddingBox,e.bottomLeftBorderDoubleInnerBox,e.bottomLeftPaddingBox);default:return OA(e.bottomLeftBorderDoubleInnerBox,e.bottomLeftPaddingBox,e.topLeftBorderDoubleInnerBox,e.topLeftPaddingBox)}},fh=function(e,A){switch(A){case 0:return Sr(e.topLeftBorderStroke,e.topRightBorderStroke);case 1:return Sr(e.topRightBorderStroke,e.bottomRightBorderStroke);case 2:return Sr(e.bottomRightBorderStroke,e.bottomLeftBorderStroke);default:return Sr(e.bottomLeftBorderStroke,e.topLeftBorderStroke)}},Sr=function(e,A){var r=[];return RA(e)?r.push(e.subdivide(.5,!1)):r.push(e),RA(A)?r.push(A.subdivide(.5,!0)):r.push(A),r},OA=function(e,A,r,t){var o=[];return RA(e)?o.push(e.subdivide(.5,!1)):o.push(e),RA(r)?o.push(r.subdivide(.5,!0)):o.push(r),RA(t)?o.push(t.subdivide(.5,!0).reverse()):o.push(t),RA(A)?o.push(A.subdivide(.5,!1).reverse()):o.push(A),o},$o=function(e){var A=e.bounds,r=e.styles;return A.add(r.borderLeftWidth,r.borderTopWidth,-(r.borderRightWidth+r.borderLeftWidth),-(r.borderTopWidth+r.borderBottomWidth))},Lr=function(e){var A=e.styles,r=e.bounds,t=cA(A.paddingLeft,r.width),o=cA(A.paddingRight,r.width),c=cA(A.paddingTop,r.width),u=cA(A.paddingBottom,r.width);return r.add(t+A.borderLeftWidth,c+A.borderTopWidth,-(A.borderRightWidth+A.borderLeftWidth+t+o),-(A.borderTopWidth+A.borderBottomWidth+c+u))},wh=function(e,A){return e===0?A.bounds:e===2?Lr(A):$o(A)},mh=function(e,A){return e===0?A.bounds:e===2?Lr(A):$o(A)},ls=function(e,A,r){var t=wh(je(e.styles.backgroundOrigin,A),e),o=mh(je(e.styles.backgroundClip,A),e),c=bh(je(e.styles.backgroundSize,A),r,t),u=c[0],g=c[1],h=mt(je(e.styles.backgroundPosition,A),t.width-u,t.height-g),f=Ch(je(e.styles.backgroundRepeat,A),h,c,t,o),m=Math.round(t.left+h[0]),v=Math.round(t.top+h[1]);return [f,m,v,u,g]},$e=function(e){return iA(e)&&e.value===Ve.AUTO},Tr=function(e){return typeof e=="number"},bh=function(e,A,r){var t=A[0],o=A[1],c=A[2],u=e[0],g=e[1];if(!u)return [0,0];if(gA(u)&&g&&gA(g))return [cA(u,r.width),cA(g,r.height)];var h=Tr(c);if(iA(u)&&(u.value===Ve.CONTAIN||u.value===Ve.COVER)){if(Tr(c)){var f=r.width/r.height;return f<c!=(u.value===Ve.COVER)?[r.width,r.width/c]:[r.height*c,r.height]}return [r.width,r.height]}var m=Tr(t),v=Tr(o),x=m||v;if($e(u)&&(!g||$e(g))){if(m&&v)return [t,o];if(!h&&!x)return [r.width,r.height];if(x&&h){var D=m?t:o*c,H=v?o:t/c;return [D,H]}var I=m?t:r.width,J=v?o:r.height;return [I,J]}if(h){var P=0,N=0;return gA(u)?P=cA(u,r.width):gA(g)&&(N=cA(g,r.height)),$e(u)?P=N*c:(!g||$e(g))&&(N=P/c),[P,N]}var eA=null,$=null;if(gA(u)?eA=cA(u,r.width):g&&gA(g)&&($=cA(g,r.height)),eA!==null&&(!g||$e(g))&&($=m&&v?eA/t*o:r.height),$!==null&&$e(u)&&(eA=m&&v?$/o*t:r.width),eA!==null&&$!==null)return [eA,$];throw new Error("Unable to calculate background-size for element")},je=function(e,A){var r=e[A];return typeof r>"u"?e[0]:r},Ch=function(e,A,r,t,o){var c=A[0],u=A[1],g=r[0],h=r[1];switch(e){case 2:return [new L(Math.round(t.left),Math.round(t.top+u)),new L(Math.round(t.left+t.width),Math.round(t.top+u)),new L(Math.round(t.left+t.width),Math.round(h+t.top+u)),new L(Math.round(t.left),Math.round(h+t.top+u))];case 3:return [new L(Math.round(t.left+c),Math.round(t.top)),new L(Math.round(t.left+c+g),Math.round(t.top)),new L(Math.round(t.left+c+g),Math.round(t.height+t.top)),new L(Math.round(t.left+c),Math.round(t.height+t.top))];case 1:return [new L(Math.round(t.left+c),Math.round(t.top+u)),new L(Math.round(t.left+c+g),Math.round(t.top+u)),new L(Math.round(t.left+c+g),Math.round(t.top+u+h)),new L(Math.round(t.left+c),Math.round(t.top+u+h))];default:return [new L(Math.round(o.left),Math.round(o.top)),new L(Math.round(o.left+o.width),Math.round(o.top)),new L(Math.round(o.left+o.width),Math.round(o.height+o.top)),new L(Math.round(o.left),Math.round(o.height+o.top))]}},vh="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",jo="Hidden Text",yh=(function(){function e(A){this._data={},this._document=A;}return e.prototype.parseMetrics=function(A,r){var t=this._document.createElement("div"),o=this._document.createElement("img"),c=this._document.createElement("span"),u=this._document.body;t.style.visibility="hidden",t.style.fontFamily=A,t.style.fontSize=r,t.style.margin="0",t.style.padding="0",t.style.whiteSpace="nowrap",u.appendChild(t),o.src=vh,o.width=1,o.height=1,o.style.margin="0",o.style.padding="0",o.style.verticalAlign="baseline",c.style.fontFamily=A,c.style.fontSize=r,c.style.margin="0",c.style.padding="0",c.appendChild(this._document.createTextNode(jo)),t.appendChild(c),t.appendChild(o);var g=o.offsetTop-c.offsetTop+2;t.removeChild(c),t.appendChild(this._document.createTextNode(jo)),t.style.lineHeight="normal",o.style.verticalAlign="super";var h=o.offsetTop-t.offsetTop+2;return u.removeChild(t),{baseline:g,middle:h}},e.prototype.getMetrics=function(A,r){var t=A+" "+r;return typeof this._data[t]>"u"&&(this._data[t]=this.parseMetrics(A,r)),this._data[t]},e})(),zo=(function(){function e(A,r){this.context=A,this.options=r;}return e})(),Qh=1e4,Fh=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this;return o._activeEffects=[],o.canvas=t.canvas?t.canvas:document.createElement("canvas"),o.ctx=o.canvas.getContext("2d"),t.canvas||(o.canvas.width=Math.floor(t.width*t.scale),o.canvas.height=Math.floor(t.height*t.scale),o.canvas.style.width=t.width+"px",o.canvas.style.height=t.height+"px"),o.fontMetrics=new yh(document),o.ctx.scale(o.options.scale,o.options.scale),o.ctx.translate(-t.x,-t.y),o.ctx.textBaseline="bottom",o._activeEffects=[],o.context.logger.debug("Canvas renderer initialized ("+t.width+"x"+t.height+") with scale "+t.scale),o}return A.prototype.applyEffects=function(r){for(var t=this;this._activeEffects.length;)this.popEffect();r.forEach(function(o){return t.applyEffect(o)});},A.prototype.applyEffect=function(r){this.ctx.save(),ph(r)&&(this.ctx.globalAlpha=r.opacity),dh(r)&&(this.ctx.translate(r.offsetX,r.offsetY),this.ctx.transform(r.matrix[0],r.matrix[1],r.matrix[2],r.matrix[3],r.matrix[4],r.matrix[5]),this.ctx.translate(-r.offsetX,-r.offsetY)),Go(r)&&(this.path(r.path),this.ctx.clip()),this._activeEffects.push(r);},A.prototype.popEffect=function(){this._activeEffects.pop(),this.ctx.restore();},A.prototype.renderStack=function(r){return a(this,void 0,void 0,function(){var t;return l(this,function(o){switch(o.label){case 0:return t=r.element.container.styles,t.isVisible()?[4,this.renderStackContent(r)]:[3,2];case 1:o.sent(),o.label=2;case 2:return [2]}})})},A.prototype.renderNode=function(r){return a(this,void 0,void 0,function(){return l(this,function(t){switch(t.label){case 0:if(mA(r.container.flags,16))debugger;return r.container.styles.isVisible()?[4,this.renderNodeBackgroundAndBorders(r)]:[3,3];case 1:return t.sent(),[4,this.renderNodeContent(r)];case 2:t.sent(),t.label=3;case 3:return [2]}})})},A.prototype.renderTextWithLetterSpacing=function(r,t,o){var c=this;if(t===0)this.ctx.fillText(r.text,r.bounds.left,r.bounds.top+o);else {var u=jn(r.text);u.reduce(function(g,h){return c.ctx.fillText(h,g,r.bounds.top+o),g+c.ctx.measureText(h).width},r.bounds.left);}},A.prototype.createFontStyle=function(r){var t=r.fontVariant.filter(function(u){return u==="normal"||u==="small-caps"}).join(""),o=kh(r.fontFamily).join(", "),c=wt(r.fontSize)?""+r.fontSize.number+r.fontSize.unit:r.fontSize.number+"px";return [[r.fontStyle,t,r.fontWeight,c,o].join(" "),o,c]},A.prototype.renderTextNode=function(r,t){return a(this,void 0,void 0,function(){var o,c,u,g,h,f,m,v,x=this;return l(this,function(D){return o=this.createFontStyle(t),c=o[0],u=o[1],g=o[2],this.ctx.font=c,this.ctx.direction=t.direction===1?"rtl":"ltr",this.ctx.textAlign="left",this.ctx.textBaseline="alphabetic",h=this.fontMetrics.getMetrics(u,g),f=h.baseline,m=h.middle,v=t.paintOrder,r.textBounds.forEach(function(H){v.forEach(function(I){switch(I){case 0:x.ctx.fillStyle=bA(t.color),x.renderTextWithLetterSpacing(H,t.letterSpacing,f);var J=t.textShadow;J.length&&H.text.trim().length&&(J.slice(0).reverse().forEach(function(P){x.ctx.shadowColor=bA(P.color),x.ctx.shadowOffsetX=P.offsetX.number*x.options.scale,x.ctx.shadowOffsetY=P.offsetY.number*x.options.scale,x.ctx.shadowBlur=P.blur.number,x.renderTextWithLetterSpacing(H,t.letterSpacing,f);}),x.ctx.shadowColor="",x.ctx.shadowOffsetX=0,x.ctx.shadowOffsetY=0,x.ctx.shadowBlur=0),t.textDecorationLine.length&&(x.ctx.fillStyle=bA(t.textDecorationColor||t.color),t.textDecorationLine.forEach(function(P){switch(P){case 1:x.ctx.fillRect(H.bounds.left,Math.round(H.bounds.top+f),H.bounds.width,1);break;case 2:x.ctx.fillRect(H.bounds.left,Math.round(H.bounds.top),H.bounds.width,1);break;case 3:x.ctx.fillRect(H.bounds.left,Math.ceil(H.bounds.top+m),H.bounds.width,1);break}}));break;case 1:t.webkitTextStrokeWidth&&H.text.trim().length&&(x.ctx.strokeStyle=bA(t.webkitTextStrokeColor),x.ctx.lineWidth=t.webkitTextStrokeWidth,x.ctx.lineJoin=window.chrome?"miter":"round",x.ctx.strokeText(H.text,H.bounds.left,H.bounds.top+f)),x.ctx.strokeStyle="",x.ctx.lineWidth=0,x.ctx.lineJoin="miter";break}});}),[2]})})},A.prototype.renderReplacedElement=function(r,t,o){if(o&&r.intrinsicWidth>0&&r.intrinsicHeight>0){var c=Lr(r),u=kr(t);this.path(u),this.ctx.save(),this.ctx.clip(),this.ctx.drawImage(o,0,0,r.intrinsicWidth,r.intrinsicHeight,c.left,c.top,c.width,c.height),this.ctx.restore();}},A.prototype.renderNodeContent=function(r){return a(this,void 0,void 0,function(){var t,o,c,u,g,h,N,N,f,m,v,x,$,D,H,W,I,J,P,N,eA,$,W;return l(this,function(T){switch(T.label){case 0:this.applyEffects(r.getEffects(4)),t=r.container,o=r.curves,c=t.styles,u=0,g=t.textNodes,T.label=1;case 1:return u<g.length?(h=g[u],[4,this.renderTextNode(h,c)]):[3,4];case 2:T.sent(),T.label=3;case 3:return u++,[3,1];case 4:if(!(t instanceof go))return [3,8];T.label=5;case 5:return T.trys.push([5,7,,8]),[4,this.context.cache.match(t.src)];case 6:return N=T.sent(),this.renderReplacedElement(t,o,N),[3,8];case 7:return T.sent(),this.context.logger.error("Error loading image "+t.src),[3,8];case 8:if(t instanceof Bo&&this.renderReplacedElement(t,o,t.canvas),!(t instanceof fo))return [3,12];T.label=9;case 9:return T.trys.push([9,11,,12]),[4,this.context.cache.match(t.svg)];case 10:return N=T.sent(),this.renderReplacedElement(t,o,N),[3,12];case 11:return T.sent(),this.context.logger.error("Error loading svg "+t.svg.substring(0,255)),[3,12];case 12:return t instanceof vo&&t.tree?(f=new A(this.context,{scale:this.options.scale,backgroundColor:t.backgroundColor,x:0,y:0,width:t.width,height:t.height}),[4,f.render(t.tree)]):[3,14];case 13:m=T.sent(),t.width&&t.height&&this.ctx.drawImage(m,0,0,t.width,t.height,t.bounds.left,t.bounds.top,t.bounds.width,t.bounds.height),T.label=14;case 14:if(t instanceof Zn&&(v=Math.min(t.bounds.width,t.bounds.height),t.type===vr?t.checked&&(this.ctx.save(),this.path([new L(t.bounds.left+v*.39363,t.bounds.top+v*.79),new L(t.bounds.left+v*.16,t.bounds.top+v*.5549),new L(t.bounds.left+v*.27347,t.bounds.top+v*.44071),new L(t.bounds.left+v*.39694,t.bounds.top+v*.5649),new L(t.bounds.left+v*.72983,t.bounds.top+v*.23),new L(t.bounds.left+v*.84,t.bounds.top+v*.34085),new L(t.bounds.left+v*.39363,t.bounds.top+v*.79)]),this.ctx.fillStyle=bA(mo),this.ctx.fill(),this.ctx.restore()):t.type===yr&&t.checked&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t.bounds.left+v/2,t.bounds.top+v/2,v/4,0,Math.PI*2,!0),this.ctx.fillStyle=bA(mo),this.ctx.fill(),this.ctx.restore())),xh(t)&&t.value.length){switch(x=this.createFontStyle(c),$=x[0],D=x[1],H=this.fontMetrics.getMetrics($,D).baseline,this.ctx.font=$,this.ctx.fillStyle=bA(c.color),this.ctx.textBaseline="alphabetic",this.ctx.textAlign=Uh(t.styles.textAlign),W=Lr(t),I=0,t.styles.textAlign){case 1:I+=W.width/2;break;case 2:I+=W.width;break}J=W.add(I,0,0,-W.height/2+1),this.ctx.save(),this.path([new L(W.left,W.top),new L(W.left+W.width,W.top),new L(W.left+W.width,W.top+W.height),new L(W.left,W.top+W.height)]),this.ctx.clip(),this.renderTextWithLetterSpacing(new yt(t.value,J),c.letterSpacing,H),this.ctx.restore(),this.ctx.textBaseline="alphabetic",this.ctx.textAlign="left";}if(!mA(t.styles.display,2048))return [3,20];if(t.styles.listStyleImage===null)return [3,19];if(P=t.styles.listStyleImage,P.type!==0)return [3,18];N=void 0,eA=P.url,T.label=15;case 15:return T.trys.push([15,17,,18]),[4,this.context.cache.match(eA)];case 16:return N=T.sent(),this.ctx.drawImage(N,t.bounds.left-(N.width+10),t.bounds.top),[3,18];case 17:return T.sent(),this.context.logger.error("Error loading list-style-image "+eA),[3,18];case 18:return [3,20];case 19:r.listValue&&t.styles.listStyleType!==-1&&($=this.createFontStyle(c)[0],this.ctx.font=$,this.ctx.fillStyle=bA(c.color),this.ctx.textBaseline="middle",this.ctx.textAlign="right",W=new p(t.bounds.left,t.bounds.top+cA(t.styles.paddingTop,t.bounds.width),t.bounds.width,$i(c.lineHeight,c.fontSize.number)/2+1),this.renderTextWithLetterSpacing(new yt(r.listValue,W),c.letterSpacing,$i(c.lineHeight,c.fontSize.number)/2+2),this.ctx.textBaseline="bottom",this.ctx.textAlign="left"),T.label=20;case 20:return [2]}})})},A.prototype.renderStackContent=function(r){return a(this,void 0,void 0,function(){var t,o,P,c,u,P,g,h,P,f,m,P,v,x,P,D,H,P,I,J,P;return l(this,function(N){switch(N.label){case 0:if(mA(r.element.container.flags,16))debugger;return [4,this.renderNodeBackgroundAndBorders(r.element)];case 1:N.sent(),t=0,o=r.negativeZIndex,N.label=2;case 2:return t<o.length?(P=o[t],[4,this.renderStack(P)]):[3,5];case 3:N.sent(),N.label=4;case 4:return t++,[3,2];case 5:return [4,this.renderNodeContent(r.element)];case 6:N.sent(),c=0,u=r.nonInlineLevel,N.label=7;case 7:return c<u.length?(P=u[c],[4,this.renderNode(P)]):[3,10];case 8:N.sent(),N.label=9;case 9:return c++,[3,7];case 10:g=0,h=r.nonPositionedFloats,N.label=11;case 11:return g<h.length?(P=h[g],[4,this.renderStack(P)]):[3,14];case 12:N.sent(),N.label=13;case 13:return g++,[3,11];case 14:f=0,m=r.nonPositionedInlineLevel,N.label=15;case 15:return f<m.length?(P=m[f],[4,this.renderStack(P)]):[3,18];case 16:N.sent(),N.label=17;case 17:return f++,[3,15];case 18:v=0,x=r.inlineLevel,N.label=19;case 19:return v<x.length?(P=x[v],[4,this.renderNode(P)]):[3,22];case 20:N.sent(),N.label=21;case 21:return v++,[3,19];case 22:D=0,H=r.zeroOrAutoZIndexOrTransformedOrOpacity,N.label=23;case 23:return D<H.length?(P=H[D],[4,this.renderStack(P)]):[3,26];case 24:N.sent(),N.label=25;case 25:return D++,[3,23];case 26:I=0,J=r.positiveZIndex,N.label=27;case 27:return I<J.length?(P=J[I],[4,this.renderStack(P)]):[3,30];case 28:N.sent(),N.label=29;case 29:return I++,[3,27];case 30:return [2]}})})},A.prototype.mask=function(r){this.ctx.beginPath(),this.ctx.moveTo(0,0),this.ctx.lineTo(this.canvas.width,0),this.ctx.lineTo(this.canvas.width,this.canvas.height),this.ctx.lineTo(0,this.canvas.height),this.ctx.lineTo(0,0),this.formatPath(r.slice(0).reverse()),this.ctx.closePath();},A.prototype.path=function(r){this.ctx.beginPath(),this.formatPath(r),this.ctx.closePath();},A.prototype.formatPath=function(r){var t=this;r.forEach(function(o,c){var u=RA(o)?o.start:o;c===0?t.ctx.moveTo(u.x,u.y):t.ctx.lineTo(u.x,u.y),RA(o)&&t.ctx.bezierCurveTo(o.startControl.x,o.startControl.y,o.endControl.x,o.endControl.y,o.end.x,o.end.y);});},A.prototype.renderRepeat=function(r,t,o,c){this.path(r),this.ctx.fillStyle=t,this.ctx.translate(o,c),this.ctx.fill(),this.ctx.translate(-o,-c);},A.prototype.resizeImage=function(r,t,o){var c;if(r.width===t&&r.height===o)return r;var u=(c=this.canvas.ownerDocument)!==null&&c!==void 0?c:document,g=u.createElement("canvas");g.width=Math.max(1,t),g.height=Math.max(1,o);var h=g.getContext("2d");return h.drawImage(r,0,0,r.width,r.height,0,0,t,o),g},A.prototype.renderBackgroundImage=function(r){return a(this,void 0,void 0,function(){var t,o,c,u,g,h;return l(this,function(f){switch(f.label){case 0:t=r.styles.backgroundImage.length-1,o=function(m){var v,x,D,BA,HA,kA,oA,yA,AA,H,BA,HA,kA,oA,yA,I,J,P,N,eA,$,W,T,q,AA,Y,BA,UA,TA,oA,yA,ge,HA,kA,Fe,JA,Be,xe,Ee,ee,Ue,te;return l(this,function(ze){switch(ze.label){case 0:if(m.type!==0)return [3,5];v=void 0,x=m.url,ze.label=1;case 1:return ze.trys.push([1,3,,4]),[4,c.context.cache.match(x)];case 2:return v=ze.sent(),[3,4];case 3:return ze.sent(),c.context.logger.error("Error loading background-image "+x),[3,4];case 4:return v&&(D=ls(r,t,[v.width,v.height,v.width/v.height]),BA=D[0],HA=D[1],kA=D[2],oA=D[3],yA=D[4],AA=c.ctx.createPattern(c.resizeImage(v,oA,yA),"repeat"),c.renderRepeat(BA,AA,HA,kA)),[3,6];case 5:dd(m)?(H=ls(r,t,[null,null,null]),BA=H[0],HA=H[1],kA=H[2],oA=H[3],yA=H[4],I=id(m.angle,oA,yA),J=I[0],P=I[1],N=I[2],eA=I[3],$=I[4],W=document.createElement("canvas"),W.width=oA,W.height=yA,T=W.getContext("2d"),q=T.createLinearGradient(P,eA,N,$),Ri(m.stops,J).forEach(function(Et){return q.addColorStop(Et.stop,bA(Et.color))}),T.fillStyle=q,T.fillRect(0,0,oA,yA),oA>0&&yA>0&&(AA=c.ctx.createPattern(W,"repeat"),c.renderRepeat(BA,AA,HA,kA))):pd(m)&&(Y=ls(r,t,[null,null,null]),BA=Y[0],UA=Y[1],TA=Y[2],oA=Y[3],yA=Y[4],ge=m.position.length===0?[Dn]:m.position,HA=cA(ge[0],oA),kA=cA(ge[ge.length-1],yA),Fe=od(m,HA,kA,oA,yA),JA=Fe[0],Be=Fe[1],JA>0&&Be>0&&(xe=c.ctx.createRadialGradient(UA+HA,TA+kA,0,UA+HA,TA+kA,JA),Ri(m.stops,JA*2).forEach(function(Et){return xe.addColorStop(Et.stop,bA(Et.color))}),c.path(BA),c.ctx.fillStyle=xe,JA!==Be?(Ee=r.bounds.left+.5*r.bounds.width,ee=r.bounds.top+.5*r.bounds.height,Ue=Be/JA,te=1/Ue,c.ctx.save(),c.ctx.translate(Ee,ee),c.ctx.transform(1,0,0,Ue,0,0),c.ctx.translate(-Ee,-ee),c.ctx.fillRect(UA,te*(TA-ee)+ee,oA,yA*te),c.ctx.restore()):c.ctx.fill())),ze.label=6;case 6:return t--,[2]}})},c=this,u=0,g=r.styles.backgroundImage.slice(0).reverse(),f.label=1;case 1:return u<g.length?(h=g[u],[5,o(h)]):[3,4];case 2:f.sent(),f.label=3;case 3:return u++,[3,1];case 4:return [2]}})})},A.prototype.renderSolidBorder=function(r,t,o){return a(this,void 0,void 0,function(){return l(this,function(c){return this.path(Jo(o,t)),this.ctx.fillStyle=bA(r),this.ctx.fill(),[2]})})},A.prototype.renderDoubleBorder=function(r,t,o,c){return a(this,void 0,void 0,function(){var u,g;return l(this,function(h){switch(h.label){case 0:return t<3?[4,this.renderSolidBorder(r,o,c)]:[3,2];case 1:return h.sent(),[2];case 2:return u=gh(c,o),this.path(u),this.ctx.fillStyle=bA(r),this.ctx.fill(),g=Bh(c,o),this.path(g),this.ctx.fill(),[2]}})})},A.prototype.renderNodeBackgroundAndBorders=function(r){return a(this,void 0,void 0,function(){var t,o,c,u,g,h,f,m,v=this;return l(this,function(x){switch(x.label){case 0:return this.applyEffects(r.getEffects(2)),t=r.container.styles,o=!de(t.backgroundColor)||t.backgroundImage.length,c=[{style:t.borderTopStyle,color:t.borderTopColor,width:t.borderTopWidth},{style:t.borderRightStyle,color:t.borderRightColor,width:t.borderRightWidth},{style:t.borderBottomStyle,color:t.borderBottomColor,width:t.borderBottomWidth},{style:t.borderLeftStyle,color:t.borderLeftColor,width:t.borderLeftWidth}],u=Eh(je(t.backgroundClip,0),r.curves),o||t.boxShadow.length?(this.ctx.save(),this.path(u),this.ctx.clip(),de(t.backgroundColor)||(this.ctx.fillStyle=bA(t.backgroundColor),this.ctx.fill()),[4,this.renderBackgroundImage(r.container)]):[3,2];case 1:x.sent(),this.ctx.restore(),t.boxShadow.slice(0).reverse().forEach(function(D){v.ctx.save();var H=Hr(r.curves),I=D.inset?0:Qh,J=uh(H,-I+(D.inset?1:-1)*D.spread.number,(D.inset?1:-1)*D.spread.number,D.spread.number*(D.inset?-2:2),D.spread.number*(D.inset?-2:2));D.inset?(v.path(H),v.ctx.clip(),v.mask(J)):(v.mask(H),v.ctx.clip(),v.path(J)),v.ctx.shadowOffsetX=D.offsetX.number+I,v.ctx.shadowOffsetY=D.offsetY.number,v.ctx.shadowColor=bA(D.color),v.ctx.shadowBlur=D.blur.number,v.ctx.fillStyle=D.inset?bA(D.color):"rgba(0,0,0,1)",v.ctx.fill(),v.ctx.restore();}),x.label=2;case 2:g=0,h=0,f=c,x.label=3;case 3:return h<f.length?(m=f[h],m.style!==0&&!de(m.color)&&m.width>0?m.style!==2?[3,5]:[4,this.renderDashedDottedBorder(m.color,m.width,g,r.curves,2)]:[3,11]):[3,13];case 4:return x.sent(),[3,11];case 5:return m.style!==3?[3,7]:[4,this.renderDashedDottedBorder(m.color,m.width,g,r.curves,3)];case 6:return x.sent(),[3,11];case 7:return m.style!==4?[3,9]:[4,this.renderDoubleBorder(m.color,m.width,g,r.curves)];case 8:return x.sent(),[3,11];case 9:return [4,this.renderSolidBorder(m.color,g,r.curves)];case 10:x.sent(),x.label=11;case 11:g++,x.label=12;case 12:return h++,[3,3];case 13:return [2]}})})},A.prototype.renderDashedDottedBorder=function(r,t,o,c,u){return a(this,void 0,void 0,function(){var g,h,f,m,v,x,D,H,I,J,P,N,eA,$,W,T,W,T;return l(this,function(q){return this.ctx.save(),g=fh(c,o),h=Jo(c,o),u===2&&(this.path(h),this.ctx.clip()),RA(h[0])?(f=h[0].start.x,m=h[0].start.y):(f=h[0].x,m=h[0].y),RA(h[1])?(v=h[1].end.x,x=h[1].end.y):(v=h[1].x,x=h[1].y),o===0||o===2?D=Math.abs(f-v):D=Math.abs(m-x),this.ctx.beginPath(),u===3?this.formatPath(g):this.formatPath(h.slice(0,2)),H=t<3?t*3:t*2,I=t<3?t*2:t,u===3&&(H=t,I=t),J=!0,D<=H*2?J=!1:D<=H*2+I?(P=D/(2*H+I),H*=P,I*=P):(N=Math.floor((D+I)/(H+I)),eA=(D-N*H)/(N-1),$=(D-(N+1)*H)/N,I=$<=0||Math.abs(I-eA)<Math.abs(I-$)?eA:$),J&&(u===3?this.ctx.setLineDash([0,H+I]):this.ctx.setLineDash([H,I])),u===3?(this.ctx.lineCap="round",this.ctx.lineWidth=t):this.ctx.lineWidth=t*2+1.1,this.ctx.strokeStyle=bA(r),this.ctx.stroke(),this.ctx.setLineDash([]),u===2&&(RA(h[0])&&(W=h[3],T=h[0],this.ctx.beginPath(),this.formatPath([new L(W.end.x,W.end.y),new L(T.start.x,T.start.y)]),this.ctx.stroke()),RA(h[1])&&(W=h[1],T=h[2],this.ctx.beginPath(),this.formatPath([new L(W.end.x,W.end.y),new L(T.start.x,T.start.y)]),this.ctx.stroke())),this.ctx.restore(),[2]})})},A.prototype.render=function(r){return a(this,void 0,void 0,function(){var t;return l(this,function(o){switch(o.label){case 0:return this.options.backgroundColor&&(this.ctx.fillStyle=bA(this.options.backgroundColor),this.ctx.fillRect(this.options.x,this.options.y,this.options.width,this.options.height)),t=hh(r),[4,this.renderStack(t)];case 1:return o.sent(),this.applyEffects([]),[2,this.canvas]}})})},A})(zo),xh=function(e){return e instanceof Co||e instanceof bo?!0:e instanceof Zn&&e.type!==yr&&e.type!==vr},Eh=function(e,A){switch(e){case 0:return Hr(A);case 2:return ah(A);default:return kr(A)}},Uh=function(e){switch(e){case 1:return "center";case 2:return "right";default:return "left"}},Hh=["-apple-system","system-ui"],kh=function(e){return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)?e.filter(function(A){return Hh.indexOf(A)===-1}):e},Ih=(function(e){n(A,e);function A(r,t){var o=e.call(this,r,t)||this;return o.canvas=t.canvas?t.canvas:document.createElement("canvas"),o.ctx=o.canvas.getContext("2d"),o.options=t,o.canvas.width=Math.floor(t.width*t.scale),o.canvas.height=Math.floor(t.height*t.scale),o.canvas.style.width=t.width+"px",o.canvas.style.height=t.height+"px",o.ctx.scale(o.options.scale,o.options.scale),o.ctx.translate(-t.x,-t.y),o.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized ("+t.width+"x"+t.height+" at "+t.x+","+t.y+") with scale "+t.scale),o}return A.prototype.render=function(r){return a(this,void 0,void 0,function(){var t,o;return l(this,function(c){switch(c.label){case 0:return t=$n(this.options.width*this.options.scale,this.options.height*this.options.scale,this.options.scale,this.options.scale,r),[4,Sh(t)];case 1:return o=c.sent(),this.options.backgroundColor&&(this.ctx.fillStyle=bA(this.options.backgroundColor),this.ctx.fillRect(0,0,this.options.width*this.options.scale,this.options.height*this.options.scale)),this.ctx.drawImage(o,-this.options.x*this.options.scale,-this.options.y*this.options.scale),[2,this.canvas]}})})},A})(zo),Sh=function(e){return new Promise(function(A,r){var t=new Image;t.onload=function(){A(t);},t.onerror=r,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(e));})},Lh=(function(){function e(A){var r=A.id,t=A.enabled;this.id=r,this.enabled=t,this.start=Date.now();}return e.prototype.debug=function(){for(var A=[],r=0;r<arguments.length;r++)A[r]=arguments[r];this.enabled&&(typeof window<"u"&&window.console&&typeof console.debug=="function"?console.debug.apply(console,d([this.id,this.getTime()+"ms"],A)):this.info.apply(this,A));},e.prototype.getTime=function(){return Date.now()-this.start},e.prototype.info=function(){for(var A=[],r=0;r<arguments.length;r++)A[r]=arguments[r];this.enabled&&typeof window<"u"&&window.console&&typeof console.info=="function"&&console.info.apply(console,d([this.id,this.getTime()+"ms"],A));},e.prototype.warn=function(){for(var A=[],r=0;r<arguments.length;r++)A[r]=arguments[r];this.enabled&&(typeof window<"u"&&window.console&&typeof console.warn=="function"?console.warn.apply(console,d([this.id,this.getTime()+"ms"],A)):this.info.apply(this,A));},e.prototype.error=function(){for(var A=[],r=0;r<arguments.length;r++)A[r]=arguments[r];this.enabled&&(typeof window<"u"&&window.console&&typeof console.error=="function"?console.error.apply(console,d([this.id,this.getTime()+"ms"],A)):this.info.apply(this,A));},e.instances={},e})(),Th=(function(){function e(A,r){var t;this.windowBounds=r,this.instanceName="#"+e.instanceCount++,this.logger=new Lh({id:this.instanceName,enabled:A.logging}),this.cache=(t=A.cache)!==null&&t!==void 0?t:new Ah(this,A);}return e.instanceCount=1,e})(),Dh=function(e,A){return A===void 0&&(A={}),Kh(e,A)};typeof window<"u"&&_o.setContext(window);var Kh=function(e,A){return a(void 0,void 0,void 0,function(){var r,t,o,c,u,g,h,f,m,v,x,D,H,I,J,P,N,eA,$,W,q,T,q,AA,Y,BA,UA,TA,oA,yA,ge,HA,kA,Fe,JA,Be,xe,Ee,ee,Ue;return l(this,function(te){switch(te.label){case 0:if(!e||typeof e!="object")return [2,Promise.reject("Invalid element provided as first argument")];if(r=e.ownerDocument,!r)throw new Error("Element is not attached to a Document");if(t=r.defaultView,!t)throw new Error("Document is not attached to a Window");return o={allowTaint:(AA=A.allowTaint)!==null&&AA!==void 0?AA:!1,imageTimeout:(Y=A.imageTimeout)!==null&&Y!==void 0?Y:15e3,proxy:A.proxy,useCORS:(BA=A.useCORS)!==null&&BA!==void 0?BA:!1},c=i({logging:(UA=A.logging)!==null&&UA!==void 0?UA:!0,cache:A.cache},o),u={windowWidth:(TA=A.windowWidth)!==null&&TA!==void 0?TA:t.innerWidth,windowHeight:(oA=A.windowHeight)!==null&&oA!==void 0?oA:t.innerHeight,scrollX:(yA=A.scrollX)!==null&&yA!==void 0?yA:t.pageXOffset,scrollY:(ge=A.scrollY)!==null&&ge!==void 0?ge:t.pageYOffset},g=new p(u.scrollX,u.scrollY,u.windowWidth,u.windowHeight),h=new Th(c,g),f=(HA=A.foreignObjectRendering)!==null&&HA!==void 0?HA:!1,m={allowTaint:(kA=A.allowTaint)!==null&&kA!==void 0?kA:!1,onclone:A.onclone,ignoreElements:A.ignoreElements,inlineImages:f,copyStyles:f},h.logger.debug("Starting document clone with size "+g.width+"x"+g.height+" scrolled to "+-g.left+","+-g.top),v=new No(h,e,m),x=v.clonedReferenceElement,x?[4,v.toIFrame(r,g)]:[2,Promise.reject("Unable to find element in cloned iframe")];case 1:return D=te.sent(),H=As(x)||Mu(x)?w(x.ownerDocument):B(h,x),I=H.width,J=H.height,P=H.left,N=H.top,eA=Mh(h,x,A.backgroundColor),$={canvas:A.canvas,backgroundColor:eA,scale:(JA=(Fe=A.scale)!==null&&Fe!==void 0?Fe:t.devicePixelRatio)!==null&&JA!==void 0?JA:1,x:((Be=A.x)!==null&&Be!==void 0?Be:0)+P,y:((xe=A.y)!==null&&xe!==void 0?xe:0)+N,width:(Ee=A.width)!==null&&Ee!==void 0?Ee:Math.ceil(I),height:(ee=A.height)!==null&&ee!==void 0?ee:Math.ceil(J)},f?(h.logger.debug("Document cloned, using foreign object rendering"),q=new Ih(h,$),[4,q.render(x)]):[3,3];case 2:return W=te.sent(),[3,5];case 3:return h.logger.debug("Document cloned, element located at "+P+","+N+" with size "+I+"x"+J+" using computed rendering"),h.logger.debug("Starting DOM parsing"),T=Qo(h,x),eA===T.styles.backgroundColor&&(T.styles.backgroundColor=qA.TRANSPARENT),h.logger.debug("Starting renderer for element at "+$.x+","+$.y+" with size "+$.width+"x"+$.height),q=new Fh(h,$),[4,q.render(T)];case 4:W=te.sent(),te.label=5;case 5:return (!((Ue=A.removeContainer)!==null&&Ue!==void 0)||Ue)&&(No.destroy(D)||h.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")),h.logger.debug("Finished rendering"),[2,W]}})})},Mh=function(e,A,r){var t=A.ownerDocument,o=t.documentElement?bt(e,getComputedStyle(t.documentElement).backgroundColor):qA.TRANSPARENT,c=t.body?bt(e,getComputedStyle(t.body).backgroundColor):qA.TRANSPARENT,u=typeof r=="string"?bt(e,r):r===null?qA.TRANSPARENT:4294967295;return A===t.documentElement?de(o)?de(c)?u:c:o:u};return Dh}));});var Ma,Ra=dA(()=>{"use strict";Ma={"panel.title":"Feedbacks","panel.ariaLabel":"Siteping feedback panel","panel.feedbackList":"Feedback list","panel.loading":"Loading feedbacks","panel.close":"Close panel","panel.deleteAll":"Delete all","panel.deleteAllConfirmTitle":"Delete all","panel.deleteAllConfirmMessage":"Delete all feedbacks for this project? This action cannot be undone.","panel.search":"Search...","panel.searchAria":"Search feedbacks","panel.filterAll":"All","panel.loadError":"Failed to load","panel.retry":"Retry","panel.empty":"No feedback yet","panel.showMore":"Show more","panel.showLess":"Show less","panel.resolve":"Resolve","panel.reopen":"Reopen","panel.delete":"Delete","panel.cancel":"Cancel","panel.confirmDelete":"Delete","panel.loadMore":"Load more ({remaining} remaining)","panel.statusAll":"All","panel.statusOpen":"Open","panel.statusResolved":"Resolved","panel.statusInProgress":"In progress","panel.statusWontFix":"Won't fix","type.label":"Type","type.question":"Question","type.change":"Change","type.bug":"Bug","type.other":"Other","status.label":"Status","scope.label":"Scope","scope.thisPage":"This page","scope.thisType":"This type","scope.all":"All pages","fab.aria":"Siteping \u2014 Feedback menu","fab.messages":"Show sidebar","fab.annotate":"Create new annotation","fab.annotations":"Show or hide markers","annotator.instruction":"Draw a rectangle on the area to comment \u2014 or press Enter to comment on the last focused element","annotator.instantInstruction":"Comment on the clicked spot","annotator.cancel":"Cancel","popup.ariaLabel":"Feedback form","popup.placeholder":"Describe your feedback...","popup.textareaAria":"Feedback message","popup.submitHintMac":"\u2318+Enter to send","popup.submitHintOther":"Ctrl+Enter to send","popup.cancel":"Cancel","popup.submit":"Send","identity.title":"Identify yourself","identity.nameLabel":"Name","identity.namePlaceholder":"Your name","identity.emailLabel":"Email","identity.emailPlaceholder":"your@email.com","identity.cancel":"Cancel","identity.submit":"Continue","marker.approximate":"Approximate position (confidence: {confidence}%)","marker.aria":"Feedback #{number}: {type} \u2014 {message}","marker.count":"{count} feedback markers displayed","fab.badge":"{count} unresolved feedbacks","feedback.sent.confirmation":"Feedback sent successfully","feedback.error.message":"Failed to send feedback","feedback.deleted.confirmation":"Feedback deleted","badge.count":"{count} unresolved feedbacks","bulk.selectAll":"Select all","bulk.selected":"{count} selected","bulk.resolve":"Resolve","bulk.delete":"Delete","bulk.deselect":"Deselect","sort.newest":"Newest first","sort.oldest":"Oldest first","sort.byType":"By type","sort.openFirst":"Open first","sort.label":"Sort","group.byPage":"By page","group.feedbacks":"{count} feedbacks","stats.open":"Open","stats.resolved":"Resolved","stats.bugs":"Bugs","stats.progress":"{percent}% resolved","detail.back":"Back","detail.title":"Feedback #{number}","detail.status":"Status","detail.message":"Message","detail.screenshot":"Screenshot","detail.screenshotAlt":"Screenshot of the annotated area","detail.metadata":"Details","detail.annotation":"Annotation","detail.page":"Page","detail.author":"Author","detail.date":"Created","detail.viewport":"Viewport","detail.browser":"Browser","detail.resolvedAt":"Resolved at","detail.closedAt":"Closed at","detail.goToAnnotation":"Go to annotation","detail.element":"Element","detail.selector":"Selector","detail.position":"Position","detail.resolve":"Resolve","detail.reopen":"Reopen","detail.delete":"Delete","detail.diagnostics":"Diagnostics","detail.diagnostics.console":"Console","detail.diagnostics.network":"Failed network","detail.diagnostics.expand":"Show diagnostics","detail.diagnostics.collapse":"Hide diagnostics","detail.diagnostics.noEntries":"No entries","shortcuts.title":"Keyboard shortcuts","shortcuts.navigate":"Navigate feedbacks","shortcuts.resolve":"Resolve / Reopen","shortcuts.delete":"Delete","shortcuts.search":"Focus search","shortcuts.select":"Toggle selection","shortcuts.help":"Show shortcuts","shortcuts.close":"Close","shortcuts.hint":"Keyboard shortcuts","export.label":"Export","export.csv":"Export CSV","export.json":"Export JSON"};});var Oa={};He(Oa,{de:()=>Fg});var Fg,Na=dA(()=>{"use strict";Fg={"panel.title":"Feedbacks","panel.ariaLabel":"Siteping-Feedback-Panel","panel.feedbackList":"Feedbackliste","panel.loading":"Feedbacks werden geladen","panel.close":"Panel schlie\xDFen","panel.deleteAll":"Alle l\xF6schen","panel.deleteAllConfirmTitle":"Alle l\xF6schen","panel.deleteAllConfirmMessage":"Alle Feedbacks f\xFCr dieses Projekt l\xF6schen? Diese Aktion kann nicht r\xFCckg\xE4ngig gemacht werden.","panel.search":"Suchen...","panel.searchAria":"Feedbacks suchen","panel.filterAll":"Alle","panel.loadError":"Laden fehlgeschlagen","panel.retry":"Erneut versuchen","panel.empty":"Noch kein Feedback","panel.showMore":"Mehr anzeigen","panel.showLess":"Weniger anzeigen","panel.resolve":"Erledigen","panel.reopen":"Wieder \xF6ffnen","panel.delete":"L\xF6schen","panel.cancel":"Abbrechen","panel.confirmDelete":"L\xF6schen","panel.loadMore":"Mehr laden ({remaining} verbleibend)","panel.statusAll":"Alle","panel.statusOpen":"Offen","panel.statusResolved":"Erledigt","panel.statusInProgress":"In Arbeit","panel.statusWontFix":"Wird nicht behoben","type.label":"Typ","type.question":"Frage","type.change":"\xC4nderung","type.bug":"Fehler","type.other":"Sonstiges","status.label":"Status","scope.label":"Bereich","scope.thisPage":"Diese Seite","scope.thisType":"Dieser Typ","scope.all":"Alle Seiten","fab.aria":"Siteping \u2014 Feedback-Men\xFC","fab.messages":"Seitenleiste anzeigen","fab.annotate":"Neue Anmerkung erstellen","fab.annotations":"Markierungen ein- oder ausblenden","annotator.instruction":"Zeichne ein Rechteck um den Bereich, den du kommentieren m\xF6chtest \u2014 oder dr\xFCcke die Eingabetaste, um das zuletzt fokussierte Element zu kommentieren","annotator.instantInstruction":"Kommentar zur angeklickten Stelle","annotator.cancel":"Abbrechen","popup.ariaLabel":"Feedbackformular","popup.placeholder":"Beschreibe dein Feedback...","popup.textareaAria":"Feedbacknachricht","popup.submitHintMac":"\u2318+Enter zum Senden","popup.submitHintOther":"Strg+Enter zum Senden","popup.cancel":"Abbrechen","popup.submit":"Senden","identity.title":"Identifiziere dich","identity.nameLabel":"Name","identity.namePlaceholder":"Dein Name","identity.emailLabel":"E-Mail","identity.emailPlaceholder":"deine@email.de","identity.cancel":"Abbrechen","identity.submit":"Fortfahren","marker.approximate":"Ungef\xE4hre Position (Konfidenz: {confidence}%)","marker.aria":"Feedback #{number}: {type} \u2014 {message}","marker.count":"{count} Feedback-Markierungen angezeigt","fab.badge":"{count} unerledigte Feedbacks","feedback.sent.confirmation":"Feedback erfolgreich gesendet","feedback.error.message":"Feedback konnte nicht gesendet werden","feedback.deleted.confirmation":"Feedback gel\xF6scht","badge.count":"{count} unerledigte Feedbacks","bulk.selectAll":"Alle ausw\xE4hlen","bulk.selected":"{count} ausgew\xE4hlt","bulk.resolve":"Erledigen","bulk.delete":"L\xF6schen","bulk.deselect":"Abw\xE4hlen","sort.newest":"Neueste zuerst","sort.oldest":"\xC4lteste zuerst","sort.byType":"Nach Typ","sort.openFirst":"Offene zuerst","sort.label":"Sortieren","group.byPage":"Nach Seite","group.feedbacks":"{count} Feedbacks","stats.open":"Offen","stats.resolved":"Erledigt","stats.bugs":"Fehler","stats.progress":"{percent}% erledigt","detail.back":"Zur\xFCck","detail.title":"Feedback #{number}","detail.status":"Status","detail.message":"Nachricht","detail.screenshot":"Screenshot","detail.screenshotAlt":"Screenshot des markierten Bereichs","detail.metadata":"Details","detail.annotation":"Anmerkung","detail.page":"Seite","detail.author":"Autor","detail.date":"Erstellt","detail.viewport":"Viewport","detail.browser":"Browser","detail.resolvedAt":"Erledigt am","detail.closedAt":"Geschlossen am","detail.goToAnnotation":"Zur Anmerkung","detail.element":"Element","detail.selector":"Selektor","detail.position":"Position","detail.resolve":"Erledigen","detail.reopen":"Wieder \xF6ffnen","detail.delete":"L\xF6schen","detail.diagnostics":"Diagnose","detail.diagnostics.console":"Konsole","detail.diagnostics.network":"Fehlgeschlagenes Netzwerk","detail.diagnostics.expand":"Diagnose anzeigen","detail.diagnostics.collapse":"Diagnose ausblenden","detail.diagnostics.noEntries":"Keine Eintr\xE4ge","shortcuts.title":"Tastenk\xFCrzel","shortcuts.navigate":"Feedbacks navigieren","shortcuts.resolve":"Erledigen / Wieder \xF6ffnen","shortcuts.delete":"L\xF6schen","shortcuts.search":"Suche fokussieren","shortcuts.select":"Auswahl umschalten","shortcuts.help":"K\xFCrzel anzeigen","shortcuts.close":"Schlie\xDFen","shortcuts.hint":"Tastenk\xFCrzel","export.label":"Exportieren","export.csv":"CSV exportieren","export.json":"JSON exportieren"};});var Pa={};He(Pa,{es:()=>xg});var xg,_a=dA(()=>{"use strict";xg={"panel.title":"Comentarios","panel.ariaLabel":"Panel de comentarios de Siteping","panel.feedbackList":"Lista de comentarios","panel.loading":"Cargando comentarios","panel.close":"Cerrar panel","panel.deleteAll":"Eliminar todo","panel.deleteAllConfirmTitle":"Eliminar todo","panel.deleteAllConfirmMessage":"\xBFEliminar todos los comentarios de este proyecto? Esta acci\xF3n no se puede deshacer.","panel.search":"Buscar...","panel.searchAria":"Buscar comentarios","panel.filterAll":"Todos","panel.loadError":"No se pudo cargar","panel.retry":"Reintentar","panel.empty":"A\xFAn no hay comentarios","panel.showMore":"Mostrar m\xE1s","panel.showLess":"Mostrar menos","panel.resolve":"Resolver","panel.reopen":"Reabrir","panel.delete":"Eliminar","panel.cancel":"Cancelar","panel.confirmDelete":"Eliminar","panel.loadMore":"Cargar m\xE1s ({remaining} restantes)","panel.statusAll":"Todos","panel.statusOpen":"Abierto","panel.statusResolved":"Resuelto","panel.statusInProgress":"En curso","panel.statusWontFix":"No se corregir\xE1","type.label":"Tipo","type.question":"Pregunta","type.change":"Cambio","type.bug":"Error","type.other":"Otro","status.label":"Estado","scope.label":"\xC1mbito","scope.thisPage":"Esta p\xE1gina","scope.thisType":"Este tipo","scope.all":"Todas las p\xE1ginas","fab.aria":"Siteping \u2014 Men\xFA de comentarios","fab.messages":"Mostrar barra lateral","fab.annotate":"Crear nueva anotaci\xF3n","fab.annotations":"Mostrar u ocultar marcadores","annotator.instruction":"Dibuja un rect\xE1ngulo sobre el \xE1rea que quieres comentar \u2014 o pulsa Intro para comentar el \xFAltimo elemento enfocado","annotator.instantInstruction":"Comentar el punto seleccionado","annotator.cancel":"Cancelar","popup.ariaLabel":"Formulario de comentarios","popup.placeholder":"Describe tu comentario...","popup.textareaAria":"Mensaje de comentario","popup.submitHintMac":"\u2318+Enter para enviar","popup.submitHintOther":"Ctrl+Enter para enviar","popup.cancel":"Cancelar","popup.submit":"Enviar","identity.title":"Identif\xEDcate","identity.nameLabel":"Nombre","identity.namePlaceholder":"Tu nombre","identity.emailLabel":"Correo electr\xF3nico","identity.emailPlaceholder":"tu@email.com","identity.cancel":"Cancelar","identity.submit":"Continuar","marker.approximate":"Posici\xF3n aproximada (confianza: {confidence}%)","marker.aria":"Comentario #{number}: {type} \u2014 {message}","marker.count":"{count} marcadores de feedback mostrados","fab.badge":"{count} comentarios sin resolver","feedback.sent.confirmation":"Comentario enviado correctamente","feedback.error.message":"No se pudo enviar el comentario","feedback.deleted.confirmation":"Comentario eliminado","badge.count":"{count} comentarios sin resolver","bulk.selectAll":"Seleccionar todo","bulk.selected":"{count} seleccionados","bulk.resolve":"Resolver","bulk.delete":"Eliminar","bulk.deselect":"Deseleccionar","sort.newest":"M\xE1s recientes","sort.oldest":"M\xE1s antiguos","sort.byType":"Por tipo","sort.openFirst":"Abiertos primero","sort.label":"Ordenar","group.byPage":"Por p\xE1gina","group.feedbacks":"{count} comentarios","stats.open":"Abiertos","stats.resolved":"Resueltos","stats.bugs":"Errores","stats.progress":"{percent}% resueltos","detail.back":"Atr\xE1s","detail.title":"Comentario #{number}","detail.status":"Estado","detail.message":"Mensaje","detail.screenshot":"Captura","detail.screenshotAlt":"Captura del \xE1rea anotada","detail.metadata":"Detalles","detail.annotation":"Anotaci\xF3n","detail.page":"P\xE1gina","detail.author":"Autor","detail.date":"Creado","detail.viewport":"Viewport","detail.browser":"Navegador","detail.resolvedAt":"Resuelto el","detail.closedAt":"Cerrado el","detail.goToAnnotation":"Ir a la anotaci\xF3n","detail.element":"Elemento","detail.selector":"Selector","detail.position":"Posici\xF3n","detail.resolve":"Resolver","detail.reopen":"Reabrir","detail.delete":"Eliminar","detail.diagnostics":"Diagn\xF3stico","detail.diagnostics.console":"Consola","detail.diagnostics.network":"Red fallida","detail.diagnostics.expand":"Mostrar diagn\xF3stico","detail.diagnostics.collapse":"Ocultar diagn\xF3stico","detail.diagnostics.noEntries":"Sin entradas","shortcuts.title":"Atajos de teclado","shortcuts.navigate":"Navegar comentarios","shortcuts.resolve":"Resolver / Reabrir","shortcuts.delete":"Eliminar","shortcuts.search":"Buscar","shortcuts.select":"Alternar selecci\xF3n","shortcuts.help":"Mostrar atajos","shortcuts.close":"Cerrar","shortcuts.hint":"Atajos de teclado","export.label":"Exportar","export.csv":"Exportar CSV","export.json":"Exportar JSON"};});var Ga={};He(Ga,{fr:()=>Eg});var Eg,Va=dA(()=>{"use strict";Eg={"panel.title":"Feedbacks","panel.ariaLabel":"Panneau de feedback Siteping","panel.feedbackList":"Liste des feedbacks","panel.loading":"Chargement des feedbacks","panel.close":"Fermer le panneau","panel.deleteAll":"Tout supprimer","panel.deleteAllConfirmTitle":"Tout supprimer","panel.deleteAllConfirmMessage":"Supprimer tous les feedbacks de ce projet ? Cette action est irr\xE9versible.","panel.search":"Rechercher...","panel.searchAria":"Rechercher dans les feedbacks","panel.filterAll":"Tous","panel.loadError":"Erreur de chargement","panel.retry":"R\xE9essayer","panel.empty":"Aucun feedback pour le moment","panel.showMore":"Voir plus","panel.showLess":"Voir moins","panel.resolve":"R\xE9soudre","panel.reopen":"Rouvrir","panel.delete":"Supprimer","panel.cancel":"Annuler","panel.confirmDelete":"Supprimer","panel.loadMore":"Voir plus ({remaining} restants)","panel.statusAll":"Tous","panel.statusOpen":"Ouvert","panel.statusResolved":"R\xE9solu","panel.statusInProgress":"En cours","panel.statusWontFix":"Sans suite","type.label":"Type","type.question":"Question","type.change":"Changement","type.bug":"Bug","type.other":"Autre","status.label":"Statut","scope.label":"Port\xE9e","scope.thisPage":"Cette page","scope.thisType":"Ce type","scope.all":"Toutes les pages","fab.aria":"Siteping \u2014 Menu feedback","fab.messages":"Afficher la barre lat\xE9rale","fab.annotate":"Cr\xE9er une nouvelle annotation","fab.annotations":"Afficher ou masquer les marqueurs","annotator.instruction":"Tracez un rectangle sur la zone \xE0 commenter \u2014 ou appuyez sur Entr\xE9e pour commenter le dernier \xE9l\xE9ment actif","annotator.instantInstruction":"Commenter l'endroit cliqu\xE9","annotator.cancel":"Annuler","popup.ariaLabel":"Formulaire de feedback","popup.placeholder":"D\xE9crivez votre retour...","popup.textareaAria":"Message de feedback","popup.submitHintMac":"\u2318+Entr\xE9e pour envoyer","popup.submitHintOther":"Ctrl+Entr\xE9e pour envoyer","popup.cancel":"Annuler","popup.submit":"Envoyer","identity.title":"Identifiez-vous","identity.nameLabel":"Nom","identity.namePlaceholder":"Votre nom","identity.emailLabel":"Email","identity.emailPlaceholder":"votre@email.com","identity.cancel":"Annuler","identity.submit":"Continuer","marker.approximate":"Position approximative (confiance : {confidence}%)","marker.aria":"Feedback n\xB0{number} : {type} \u2014 {message}","marker.count":"{count} marqueurs de feedback affich\xE9s","fab.badge":"{count} feedbacks non r\xE9solus","feedback.sent.confirmation":"Feedback envoy\xE9 avec succ\xE8s","feedback.error.message":"\xC9chec de l'envoi du feedback","feedback.deleted.confirmation":"Feedback supprim\xE9","badge.count":"{count} feedbacks non r\xE9solus","bulk.selectAll":"Tout s\xE9lectionner","bulk.selected":"{count} s\xE9lectionn\xE9(s)","bulk.resolve":"R\xE9soudre","bulk.delete":"Supprimer","bulk.deselect":"D\xE9s\xE9lectionner","sort.newest":"Plus r\xE9cents","sort.oldest":"Plus anciens","sort.byType":"Par type","sort.openFirst":"Ouverts d'abord","sort.label":"Trier","group.byPage":"Par page","group.feedbacks":"{count} feedbacks","stats.open":"Ouverts","stats.resolved":"R\xE9solus","stats.bugs":"Bugs","stats.progress":"{percent}% r\xE9solus","detail.back":"Retour","detail.title":"Feedback n\xB0{number}","detail.status":"Statut","detail.message":"Message","detail.screenshot":"Capture d'\xE9cran","detail.screenshotAlt":"Capture d'\xE9cran de la zone annot\xE9e","detail.metadata":"D\xE9tails","detail.annotation":"Annotation","detail.page":"Page","detail.author":"Auteur","detail.date":"Cr\xE9\xE9 le","detail.viewport":"Viewport","detail.browser":"Navigateur","detail.resolvedAt":"R\xE9solu le","detail.closedAt":"Cl\xF4tur\xE9 le","detail.goToAnnotation":"Aller \xE0 l'annotation","detail.element":"\xC9l\xE9ment","detail.selector":"S\xE9lecteur","detail.position":"Position","detail.resolve":"R\xE9soudre","detail.reopen":"Rouvrir","detail.delete":"Supprimer","detail.diagnostics":"Diagnostics","detail.diagnostics.console":"Console","detail.diagnostics.network":"R\xE9seau en \xE9chec","detail.diagnostics.expand":"Afficher les diagnostics","detail.diagnostics.collapse":"Masquer les diagnostics","detail.diagnostics.noEntries":"Aucune entr\xE9e","shortcuts.title":"Raccourcis clavier","shortcuts.navigate":"Naviguer les feedbacks","shortcuts.resolve":"R\xE9soudre / Rouvrir","shortcuts.delete":"Supprimer","shortcuts.search":"Rechercher","shortcuts.select":"S\xE9lectionner","shortcuts.help":"Raccourcis","shortcuts.close":"Fermer","shortcuts.hint":"Raccourcis clavier","export.label":"Exporter","export.csv":"Exporter CSV","export.json":"Exporter JSON"};});var Xa={};He(Xa,{it:()=>Ug});var Ug,Wa=dA(()=>{"use strict";Ug={"panel.title":"Feedback","panel.ariaLabel":"Pannello feedback di Siteping","panel.feedbackList":"Elenco feedback","panel.loading":"Caricamento feedback","panel.close":"Chiudi pannello","panel.deleteAll":"Elimina tutto","panel.deleteAllConfirmTitle":"Elimina tutto","panel.deleteAllConfirmMessage":"Eliminare tutti i feedback per questo progetto? Questa azione non pu\xF2 essere annullata.","panel.search":"Cerca...","panel.searchAria":"Cerca feedback","panel.filterAll":"Tutti","panel.loadError":"Caricamento non riuscito","panel.retry":"Riprova","panel.empty":"Nessun feedback ancora","panel.showMore":"Mostra di pi\xF9","panel.showLess":"Mostra meno","panel.resolve":"Risolvi","panel.reopen":"Riapri","panel.delete":"Elimina","panel.cancel":"Annulla","panel.confirmDelete":"Elimina","panel.loadMore":"Carica altro ({remaining} rimanenti)","panel.statusAll":"Tutti","panel.statusOpen":"Aperto","panel.statusResolved":"Risolto","panel.statusInProgress":"In corso","panel.statusWontFix":"Non verr\xE0 corretto","type.label":"Tipo","type.question":"Domanda","type.change":"Modifica","type.bug":"Bug","type.other":"Altro","status.label":"Stato","scope.label":"Ambito","scope.thisPage":"Questa pagina","scope.thisType":"Questo tipo","scope.all":"Tutte le pagine","fab.aria":"Siteping \u2014 Menu feedback","fab.messages":"Mostra barra laterale","fab.annotate":"Crea nuova annotazione","fab.annotations":"Mostra o nascondi i marcatori","annotator.instruction":"Disegna un rettangolo sull'area da commentare \u2014 oppure premi Invio per commentare l'ultimo elemento attivo","annotator.instantInstruction":"Commenta il punto selezionato","annotator.cancel":"Annulla","popup.ariaLabel":"Modulo feedback","popup.placeholder":"Descrivi il tuo feedback...","popup.textareaAria":"Messaggio di feedback","popup.submitHintMac":"\u2318+Invio per inviare","popup.submitHintOther":"Ctrl+Invio per inviare","popup.cancel":"Annulla","popup.submit":"Invia","identity.title":"Identificati","identity.nameLabel":"Nome","identity.namePlaceholder":"Il tuo nome","identity.emailLabel":"Email","identity.emailPlaceholder":"tua@email.com","identity.cancel":"Annulla","identity.submit":"Continua","marker.approximate":"Posizione approssimativa (confidenza: {confidence}%)","marker.aria":"Feedback #{number}: {type} \u2014 {message}","marker.count":"{count} marcatori di feedback visualizzati","fab.badge":"{count} feedback non risolti","feedback.sent.confirmation":"Feedback inviato con successo","feedback.error.message":"Invio del feedback non riuscito","feedback.deleted.confirmation":"Feedback eliminato","badge.count":"{count} feedback non risolti","bulk.selectAll":"Seleziona tutto","bulk.selected":"{count} selezionati","bulk.resolve":"Risolvi","bulk.delete":"Elimina","bulk.deselect":"Deseleziona","sort.newest":"Pi\xF9 recenti","sort.oldest":"Pi\xF9 vecchi","sort.byType":"Per tipo","sort.openFirst":"Aperti prima","sort.label":"Ordina","group.byPage":"Per pagina","group.feedbacks":"{count} feedback","stats.open":"Aperti","stats.resolved":"Risolti","stats.bugs":"Bug","stats.progress":"{percent}% risolti","detail.back":"Indietro","detail.title":"Feedback #{number}","detail.status":"Stato","detail.message":"Messaggio","detail.screenshot":"Schermata","detail.screenshotAlt":"Schermata dell'area annotata","detail.metadata":"Dettagli","detail.annotation":"Annotazione","detail.page":"Pagina","detail.author":"Autore","detail.date":"Creato","detail.viewport":"Viewport","detail.browser":"Browser","detail.resolvedAt":"Risolto il","detail.closedAt":"Chiuso il","detail.goToAnnotation":"Vai all'annotazione","detail.element":"Elemento","detail.selector":"Selettore","detail.position":"Posizione","detail.resolve":"Risolvi","detail.reopen":"Riapri","detail.delete":"Elimina","detail.diagnostics":"Diagnostica","detail.diagnostics.console":"Console","detail.diagnostics.network":"Rete fallita","detail.diagnostics.expand":"Mostra diagnostica","detail.diagnostics.collapse":"Nascondi diagnostica","detail.diagnostics.noEntries":"Nessuna voce","shortcuts.title":"Scorciatoie da tastiera","shortcuts.navigate":"Naviga i feedback","shortcuts.resolve":"Risolvi / Riapri","shortcuts.delete":"Elimina","shortcuts.search":"Cerca","shortcuts.select":"Attiva selezione","shortcuts.help":"Mostra scorciatoie","shortcuts.close":"Chiudi","shortcuts.hint":"Scorciatoie da tastiera","export.label":"Esporta","export.csv":"Esporta CSV","export.json":"Esporta JSON"};});var Ya={};He(Ya,{pt:()=>Hg});var Hg,Ja=dA(()=>{"use strict";Hg={"panel.title":"Feedbacks","panel.ariaLabel":"Painel de feedback do Siteping","panel.feedbackList":"Lista de feedbacks","panel.loading":"Carregando feedbacks","panel.close":"Fechar painel","panel.deleteAll":"Excluir tudo","panel.deleteAllConfirmTitle":"Excluir tudo","panel.deleteAllConfirmMessage":"Excluir todos os feedbacks deste projeto? Esta a\xE7\xE3o n\xE3o pode ser desfeita.","panel.search":"Pesquisar...","panel.searchAria":"Pesquisar feedbacks","panel.filterAll":"Todos","panel.loadError":"Falha ao carregar","panel.retry":"Tentar novamente","panel.empty":"Nenhum feedback ainda","panel.showMore":"Mostrar mais","panel.showLess":"Mostrar menos","panel.resolve":"Resolver","panel.reopen":"Reabrir","panel.delete":"Excluir","panel.cancel":"Cancelar","panel.confirmDelete":"Excluir","panel.loadMore":"Carregar mais ({remaining} restantes)","panel.statusAll":"Todos","panel.statusOpen":"Aberto","panel.statusResolved":"Resolvido","panel.statusInProgress":"Em andamento","panel.statusWontFix":"N\xE3o ser\xE1 corrigido","type.label":"Tipo","type.question":"Pergunta","type.change":"Altera\xE7\xE3o","type.bug":"Bug","type.other":"Outro","status.label":"Status","scope.label":"Escopo","scope.thisPage":"Esta p\xE1gina","scope.thisType":"Este tipo","scope.all":"Todas as p\xE1ginas","fab.aria":"Siteping \u2014 Menu de feedback","fab.messages":"Exibir barra lateral","fab.annotate":"Criar nova anota\xE7\xE3o","fab.annotations":"Exibir ou ocultar marcadores","annotator.instruction":"Desenhe um ret\xE2ngulo na \xE1rea que deseja comentar \u2014 ou pressione Enter para comentar o \xFAltimo elemento em foco","annotator.instantInstruction":"Comentar o ponto clicado","annotator.cancel":"Cancelar","popup.ariaLabel":"Formul\xE1rio de feedback","popup.placeholder":"Descreva seu feedback...","popup.textareaAria":"Mensagem de feedback","popup.submitHintMac":"\u2318+Enter para enviar","popup.submitHintOther":"Ctrl+Enter para enviar","popup.cancel":"Cancelar","popup.submit":"Enviar","identity.title":"Identifique-se","identity.nameLabel":"Nome","identity.namePlaceholder":"Seu nome","identity.emailLabel":"E-mail","identity.emailPlaceholder":"seu@email.com","identity.cancel":"Cancelar","identity.submit":"Continuar","marker.approximate":"Posi\xE7\xE3o aproximada (confian\xE7a: {confidence}%)","marker.aria":"Feedback #{number}: {type} \u2014 {message}","marker.count":"{count} marcadores de feedback exibidos","fab.badge":"{count} feedbacks n\xE3o resolvidos","feedback.sent.confirmation":"Feedback enviado com sucesso","feedback.error.message":"Falha ao enviar feedback","feedback.deleted.confirmation":"Feedback exclu\xEDdo","badge.count":"{count} feedbacks n\xE3o resolvidos","bulk.selectAll":"Selecionar tudo","bulk.selected":"{count} selecionados","bulk.resolve":"Resolver","bulk.delete":"Excluir","bulk.deselect":"Desmarcar","sort.newest":"Mais recentes","sort.oldest":"Mais antigos","sort.byType":"Por tipo","sort.openFirst":"Abertos primeiro","sort.label":"Ordenar","group.byPage":"Por p\xE1gina","group.feedbacks":"{count} feedbacks","stats.open":"Abertos","stats.resolved":"Resolvidos","stats.bugs":"Bugs","stats.progress":"{percent}% resolvidos","detail.back":"Voltar","detail.title":"Feedback #{number}","detail.status":"Status","detail.message":"Mensagem","detail.screenshot":"Captura","detail.screenshotAlt":"Captura da \xE1rea anotada","detail.metadata":"Detalhes","detail.annotation":"Anota\xE7\xE3o","detail.page":"P\xE1gina","detail.author":"Autor","detail.date":"Criado","detail.viewport":"Viewport","detail.browser":"Navegador","detail.resolvedAt":"Resolvido em","detail.closedAt":"Fechado em","detail.goToAnnotation":"Ir para anota\xE7\xE3o","detail.element":"Elemento","detail.selector":"Seletor","detail.position":"Posi\xE7\xE3o","detail.resolve":"Resolver","detail.reopen":"Reabrir","detail.delete":"Excluir","detail.diagnostics":"Diagn\xF3stico","detail.diagnostics.console":"Console","detail.diagnostics.network":"Rede com falha","detail.diagnostics.expand":"Mostrar diagn\xF3stico","detail.diagnostics.collapse":"Ocultar diagn\xF3stico","detail.diagnostics.noEntries":"Sem entradas","shortcuts.title":"Atalhos de teclado","shortcuts.navigate":"Navegar feedbacks","shortcuts.resolve":"Resolver / Reabrir","shortcuts.delete":"Excluir","shortcuts.search":"Buscar","shortcuts.select":"Alternar sele\xE7\xE3o","shortcuts.help":"Mostrar atalhos","shortcuts.close":"Fechar","shortcuts.hint":"Atalhos de teclado","export.label":"Exportar","export.csv":"Exportar CSV","export.json":"Exportar JSON"};});var $a={};He($a,{ru:()=>kg});var kg,ja=dA(()=>{"use strict";kg={"panel.title":"\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C","panel.ariaLabel":"\u041F\u0430\u043D\u0435\u043B\u044C \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438 Siteping","panel.feedbackList":"\u0421\u043F\u0438\u0441\u043E\u043A \u043E\u0442\u0437\u044B\u0432\u043E\u0432","panel.loading":"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u0437\u044B\u0432\u043E\u0432","panel.close":"\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C","panel.deleteAll":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0451","panel.deleteAllConfirmTitle":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0451","panel.deleteAllConfirmMessage":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u044D\u0442\u043E\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430? \u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043E\u0431\u0440\u0430\u0442\u0438\u043C\u043E.","panel.search":"\u041F\u043E\u0438\u0441\u043A...","panel.searchAria":"\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043E\u0442\u0437\u044B\u0432\u0430\u043C","panel.filterAll":"\u0412\u0441\u0435","panel.loadError":"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438","panel.retry":"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C","panel.empty":"\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043E\u0442\u0437\u044B\u0432\u043E\u0432","panel.showMore":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435","panel.showLess":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435","panel.resolve":"\u0420\u0435\u0448\u0435\u043D\u043E","panel.reopen":"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E","panel.delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","panel.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","panel.confirmDelete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","panel.loadMore":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451 ({remaining} \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C)","panel.statusAll":"\u0412\u0441\u0435","panel.statusOpen":"\u041E\u0442\u043A\u0440\u044B\u0442","panel.statusResolved":"\u0420\u0435\u0448\u0451\u043D","panel.statusInProgress":"\u0412 \u0440\u0430\u0431\u043E\u0442\u0435","panel.statusWontFix":"\u041D\u0435 \u0431\u0443\u0434\u0435\u0442 \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E","type.label":"\u0422\u0438\u043F","type.question":"\u0412\u043E\u043F\u0440\u043E\u0441","type.change":"\u0423\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0435","type.bug":"\u0411\u0430\u0433","type.other":"\u0414\u0440\u0443\u0433\u043E\u0435","status.label":"\u0421\u0442\u0430\u0442\u0443\u0441","scope.label":"\u041E\u0431\u043B\u0430\u0441\u0442\u044C","scope.thisPage":"\u042D\u0442\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430","scope.thisType":"\u042D\u0442\u043E\u0442 \u0442\u0438\u043F","scope.all":"\u0412\u0441\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B","fab.aria":"Siteping \u2014 \u041C\u0435\u043D\u044E \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438","fab.messages":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C","fab.annotate":"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u044E","fab.annotations":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043B\u0438 \u0441\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u0442\u043A\u0438","annotator.instruction":"\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043B\u044F \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F \u2014 \u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 Enter, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442","annotator.instantInstruction":"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0442\u043E\u0447\u043A\u0435","annotator.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","popup.ariaLabel":"\u0424\u043E\u0440\u043C\u0430 \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438","popup.placeholder":"\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435...","popup.textareaAria":"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435","popup.submitHintMac":"\u2318+Enter \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","popup.submitHintOther":"Ctrl+Enter \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","popup.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","popup.submit":"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","identity.title":"\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u044C\u0442\u0435\u0441\u044C","identity.nameLabel":"\u0418\u043C\u044F","identity.namePlaceholder":"\u0412\u0430\u0448\u0435 \u0438\u043C\u044F","identity.emailLabel":"Email","identity.emailPlaceholder":"\u0432\u0430\u0448@email.com","identity.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","identity.submit":"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C","marker.approximate":"\u041F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u0437\u0438\u0446\u0438\u044F (\u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C: {confidence}%)","marker.aria":"\u041E\u0442\u0437\u044B\u0432 #{number}: {type} \u2014 {message}","marker.count":"\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043E \u043C\u0430\u0440\u043A\u0435\u0440\u043E\u0432 \u043E\u0442\u0437\u044B\u0432\u043E\u0432: {count}","fab.badge":"\u041D\u0435\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u043E\u0442\u0437\u044B\u0432\u043E\u0432: {count}","feedback.sent.confirmation":"\u041E\u0442\u0437\u044B\u0432 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D","feedback.error.message":"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432","feedback.deleted.confirmation":"\u041E\u0442\u0437\u044B\u0432 \u0443\u0434\u0430\u043B\u0451\u043D","badge.count":"\u041D\u0435\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u043E\u0442\u0437\u044B\u0432\u043E\u0432: {count}","bulk.selectAll":"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435","bulk.selected":"\u0412\u044B\u0431\u0440\u0430\u043D\u043E: {count}","bulk.resolve":"\u0420\u0435\u0448\u0438\u0442\u044C","bulk.delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","bulk.deselect":"\u0421\u043D\u044F\u0442\u044C \u0432\u044B\u0431\u043E\u0440","sort.newest":"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u043E\u0432\u044B\u0435","sort.oldest":"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0442\u0430\u0440\u044B\u0435","sort.byType":"\u041F\u043E \u0442\u0438\u043F\u0443","sort.openFirst":"\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0435","sort.label":"\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430","group.byPage":"\u041F\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435","group.feedbacks":"\u041E\u0442\u0437\u044B\u0432\u043E\u0432: {count}","stats.open":"\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0435","stats.resolved":"\u0420\u0435\u0448\u0451\u043D\u043D\u044B\u0435","stats.bugs":"\u0411\u0430\u0433\u0438","stats.progress":"\u0420\u0435\u0448\u0435\u043D\u043E: {percent}%","detail.back":"\u041D\u0430\u0437\u0430\u0434","detail.title":"\u041E\u0442\u0437\u044B\u0432 #{number}","detail.status":"\u0421\u0442\u0430\u0442\u0443\u0441","detail.message":"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435","detail.screenshot":"\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442","detail.screenshotAlt":"\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438","detail.metadata":"\u0414\u0435\u0442\u0430\u043B\u0438","detail.annotation":"\u0410\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u044F","detail.page":"\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430","detail.author":"\u0410\u0432\u0442\u043E\u0440","detail.date":"\u0421\u043E\u0437\u0434\u0430\u043D","detail.viewport":"Viewport","detail.browser":"\u0411\u0440\u0430\u0443\u0437\u0435\u0440","detail.resolvedAt":"\u0420\u0435\u0448\u0451\u043D","detail.closedAt":"\u0417\u0430\u043A\u0440\u044B\u0442","detail.goToAnnotation":"\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0430\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u0438","detail.element":"\u042D\u043B\u0435\u043C\u0435\u043D\u0442","detail.selector":"\u0421\u0435\u043B\u0435\u043A\u0442\u043E\u0440","detail.position":"\u041F\u043E\u0437\u0438\u0446\u0438\u044F","detail.resolve":"\u0420\u0435\u0448\u0438\u0442\u044C","detail.reopen":"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E","detail.delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","detail.diagnostics":"\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430","detail.diagnostics.console":"\u041A\u043E\u043D\u0441\u043E\u043B\u044C","detail.diagnostics.network":"\u0421\u0435\u0442\u0435\u0432\u044B\u0435 \u043E\u0448\u0438\u0431\u043A\u0438","detail.diagnostics.expand":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443","detail.diagnostics.collapse":"\u0421\u043A\u0440\u044B\u0442\u044C \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443","detail.diagnostics.noEntries":"\u041D\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u0435\u0439","shortcuts.title":"\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438","shortcuts.navigate":"\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u043E\u0442\u0437\u044B\u0432\u0430\u043C","shortcuts.resolve":"\u0420\u0435\u0448\u0438\u0442\u044C / \u041F\u0435\u0440\u0435\u043E\u0442\u043A\u0440\u044B\u0442\u044C","shortcuts.delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","shortcuts.search":"\u041F\u043E\u0438\u0441\u043A","shortcuts.select":"\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440","shortcuts.help":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u043B\u0430\u0432\u0438\u0448\u0438","shortcuts.close":"\u0417\u0430\u043A\u0440\u044B\u0442\u044C","shortcuts.hint":"\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438","export.label":"\u042D\u043A\u0441\u043F\u043E\u0440\u0442","export.csv":"\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0432 CSV","export.json":"\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0432 JSON"};});function De(s,n){switch(s){case "question":return n("type.question");case "change":return n("type.change");case "bug":return n("type.bug");case "other":return n("type.other");default:return s}}function qr(s,n){switch(s){case "open":return n("panel.statusOpen");case "in_progress":return n("panel.statusInProgress");case "resolved":return n("panel.statusResolved");case "wont_fix":return n("panel.statusWontFix");default:return s}}var Rs;exports.registerLocale=void 0;exports.loadLocale=void 0;var Zr,xA,jA=dA(()=>{"use strict";GA();Ra();Rs=ws(Ma,{de:()=>Promise.resolve().then(()=>(Na(),Oa)).then(s=>s.de),es:()=>Promise.resolve().then(()=>(_a(),Pa)).then(s=>s.es),fr:()=>Promise.resolve().then(()=>(Va(),Ga)).then(s=>s.fr),it:()=>Promise.resolve().then(()=>(Wa(),Xa)).then(s=>s.it),pt:()=>Promise.resolve().then(()=>(Ja(),Ya)).then(s=>s.pt),ru:()=>Promise.resolve().then(()=>(ja(),$a)).then(s=>s.ru)}),exports.registerLocale=Rs.registerLocale,exports.loadLocale=Rs.loadLocale,Zr=Rs.createT,xA=bs;});function sB(s){let n=/^[=+\-@\t\r]/.test(s)?`'${s}`:s;return n.includes('"')||n.includes(",")||n.includes(`
`)||n.includes("\r")?`"${n.replace(/"/g,'""')}"`:n}function iB(s){let n=pl.join(","),i=s.map(a=>pl.map(l=>{let d=a[l];return sB(d==null?"":String(d))}).join(","));return [n,...i].join(`
`)}function oB(s){return JSON.stringify(s,null,2)}function ul(s,n,i){let a=new Blob([s],{type:i}),l=URL.createObjectURL(a),d=document.createElement("a");d.href=l,d.download=n,d.style.display="none",document.body.appendChild(d),d.click(),requestAnimationFrame(()=>{URL.revokeObjectURL(l),d.remove();});}var tB,rB,nB,hl,pl,an,Ys=dA(()=>{"use strict";IA();tB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',rB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',nB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2"/><path d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"/></svg>',hl=`
  /* ============================
     Export Button & Menu
     ============================ */

  .sp-export-btn {
    padding: 5px 12px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: transparent;
    color: var(--sp-text-tertiary);
    font-family: var(--sp-font);
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s ease;
    position: relative;
  }

  .sp-export-btn svg {
    width: 13px;
    height: 13px;
  }

  .sp-export-btn:hover {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  .sp-export-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .sp-export-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    min-width: 180px;
    padding: 4px;
    border-radius: var(--sp-radius);
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur));
    -webkit-backdrop-filter: blur(var(--sp-blur));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-lg);
    z-index: 10;
    opacity: 0;
    transform: translateY(-4px) scale(0.97);
    transition: opacity 0.15s ease, transform 0.15s ease;
    pointer-events: none;
  }

  .sp-export-menu--open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .sp-export-option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
  }

  .sp-export-option:hover,
  .sp-export-option:focus-visible {
    background: var(--sp-accent-light);
    color: var(--sp-accent);
  }

  .sp-export-option-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .sp-export-option-icon svg {
    width: 16px;
    height: 16px;
  }

  .sp-export-option-label {
    flex: 1;
  }

  @media (forced-colors: active) {
    .sp-export-btn,
    .sp-export-option,
    .sp-export-menu {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-export-btn:focus-visible,
    .sp-export-option:focus-visible {
      outline: 3px solid Highlight !important;
    }
  }
`,pl=["id","type","status","message","url","authorName","authorEmail","createdAt","resolvedAt","viewport"];an=class{constructor(n,i,a){this.getFeedbacks=i;this.element=b("div",{style:"position: relative; display: inline-flex;"});let l=document.createElement("button");l.className="sp-export-btn",l.setAttribute("aria-haspopup","true"),l.setAttribute("aria-expanded","false"),l.appendChild(V(tB));let d=document.createElement("span");E(d,a("export.label")),l.appendChild(d),l.addEventListener("click",w=>{w.stopPropagation(),this.toggle();}),this.menu=b("div",{class:"sp-export-menu"}),this.menu.setAttribute("role","menu");let p=this.createOption(rB,a("export.csv"),()=>{this.exportAs("csv");}),B=this.createOption(nB,a("export.json"),()=>{this.exportAs("json");});this.menu.appendChild(p),this.menu.appendChild(B),this.element.appendChild(l),this.element.appendChild(this.menu),this.onDocumentClick=w=>{this.isOpen&&!this.element.contains(w.target)&&this.close();},document.addEventListener("click",this.onDocumentClick,!0);}getFeedbacks;element;menu;isOpen=!1;onDocumentClick;createOption(n,i,a){let l=document.createElement("button");l.className="sp-export-option",l.setAttribute("role","menuitem");let d=b("span",{class:"sp-export-option-icon"});d.appendChild(V(n));let p=b("span",{class:"sp-export-option-label"});return E(p,i),l.appendChild(d),l.appendChild(p),l.addEventListener("click",B=>{B.stopPropagation(),a(),this.close();}),l}toggle(){this.isOpen?this.close():this.open();}open(){this.isOpen=!0,this.menu.classList.add("sp-export-menu--open"),this.element.querySelector(".sp-export-btn")?.setAttribute("aria-expanded","true");}close(){this.isOpen=!1,this.menu.classList.remove("sp-export-menu--open"),this.element.querySelector(".sp-export-btn")?.setAttribute("aria-expanded","false");}exportAs(n){let i=this.getFeedbacks();if(i.length===0)return;let a=i[0]?.projectName??"feedbacks",l=new Date().toISOString().slice(0,10),d=a.replace(/[^a-zA-Z0-9_-]/g,"_");if(n==="csv"){let p=iB(i);ul(p,`feedbacks-${d}-${l}.csv`,"text/csv;charset=utf-8");}else {let p=oB(i);ul(p,`feedbacks-${d}-${l}.json`,"application/json;charset=utf-8");}}destroy(){document.removeEventListener("click",this.onDocumentClick,!0),this.element.remove();}};});var ln,gl,Bl,cn,Js=dA(()=>{"use strict";IA();jA();ln='<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="1" width="16" height="16" rx="4" stroke="currentColor" stroke-width="2"/></svg>',gl='<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="1" width="16" height="16" rx="4" fill="url(#sp-cb-grad)" stroke="none"/><polyline points="5 9 8 12 13 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="sp-cb-grad" x1="0" y1="0" x2="18" y2="18" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="var(--sp-accent)"/><stop offset="100%" stop-color="var(--sp-accent-dark)"/></linearGradient></defs></svg>',Bl=`
  /* ============================
     Bulk Checkbox
     ============================ */

  .sp-bulk-checkbox {
    position: relative;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 4px;
    color: var(--sp-border);
    opacity: 0;
    transition: opacity 0.15s ease, color 0.15s ease, transform 0.15s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .sp-bulk-checkbox svg {
    width: 16px;
    height: 16px;
    display: block;
  }

  .sp-bulk-checkbox:hover {
    color: var(--sp-accent);
    transform: scale(1.1);
  }

  .sp-bulk-checkbox--checked {
    color: var(--sp-accent);
    opacity: 1 !important;
    filter: drop-shadow(0 0 4px var(--sp-accent-glow));
  }

  /* Show checkboxes when hovering a card */
  .sp-card:hover .sp-bulk-checkbox {
    opacity: 1;
  }

  /* When any card has selection, show ALL checkboxes */
  .sp-list--has-selection .sp-bulk-checkbox {
    opacity: 1;
  }

  /* ============================
     Card Selected State
     ============================ */

  .sp-card--selected {
    border-left: 3px solid var(--sp-accent) !important;
    background: var(--sp-accent-light) !important;
  }

  .sp-card--selected:hover {
    background: var(--sp-accent-light) !important;
  }

  /* ============================
     Select All Bar
     ============================ */

  .sp-bulk-select-all {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    margin-bottom: 4px;
    border-radius: var(--sp-radius);
    background: transparent;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease, background 0.2s ease;
    user-select: none;
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    color: var(--sp-text-secondary);
  }

  .sp-bulk-select-all:hover {
    background: var(--sp-bg-hover);
  }

  /* Show select-all on list hover or when selections exist */
  .sp-list:hover .sp-bulk-select-all,
  .sp-list--has-selection .sp-bulk-select-all {
    opacity: 1;
  }

  .sp-bulk-select-all .sp-bulk-checkbox {
    opacity: 1;
  }

  /* ============================
     Floating Action Bar
     ============================ */

  @keyframes sp-bulk-bar-in {
    from {
      transform: translateY(100%) scale(0.95);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes sp-bulk-bar-out {
    from {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    to {
      transform: translateY(100%) scale(0.95);
      opacity: 0;
    }
  }

  .sp-bulk-bar {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 16px;
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-xl);
    z-index: 10;
    pointer-events: none;
    opacity: 0;
    transform: translateY(100%) scale(0.95);
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                opacity 0.25s ease;
    font-family: var(--sp-font);
  }

  .sp-bulk-bar--visible {
    pointer-events: auto;
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .sp-bulk-bar-count {
    font-size: 13px;
    font-weight: 600;
    color: var(--sp-text);
    white-space: nowrap;
    letter-spacing: -0.01em;
  }

  .sp-bulk-bar-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sp-bulk-btn-resolve,
  .sp-bulk-btn-delete {
    padding: 7px 14px;
    border-radius: var(--sp-radius-full);
    border: 1.5px solid transparent;
    background: transparent;
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .sp-bulk-btn-resolve {
    color: #22c55e;
    border-color: #22c55e;
  }

  .sp-bulk-btn-resolve:hover {
    background: rgba(34, 197, 94, 0.1);
    box-shadow: 0 0 12px rgba(34, 197, 94, 0.15);
  }

  .sp-bulk-btn-resolve:active {
    transform: scale(0.96);
    transition-duration: 0.1s;
  }

  .sp-bulk-btn-delete {
    color: #ef4444;
    border-color: #ef4444;
  }

  .sp-bulk-btn-delete:hover {
    background: rgba(239, 68, 68, 0.1);
    box-shadow: 0 0 12px rgba(239, 68, 68, 0.15);
  }

  .sp-bulk-btn-delete:active {
    transform: scale(0.96);
    transition-duration: 0.1s;
  }

  .sp-bulk-btn-resolve:disabled,
  .sp-bulk-btn-delete:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .sp-bulk-btn-deselect {
    width: 28px;
    height: 28px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: transparent;
    color: var(--sp-text-tertiary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    padding: 0;
  }

  .sp-bulk-btn-deselect:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
    border-color: var(--sp-text-tertiary);
  }

  .sp-bulk-btn-deselect:active {
    transform: scale(0.92);
    transition-duration: 0.1s;
  }

  .sp-bulk-btn-deselect svg {
    width: 12px;
    height: 12px;
  }

  /* Spinner inside bulk bar buttons */
  .sp-bulk-btn-resolve .sp-spinner,
  .sp-bulk-btn-delete .sp-spinner {
    width: 14px;
    height: 14px;
  }

  /* ============================
     Forced Colors / High Contrast
     ============================ */

  @media (forced-colors: active) {
    .sp-bulk-checkbox,
    .sp-bulk-btn-resolve,
    .sp-bulk-btn-delete,
    .sp-bulk-btn-deselect,
    .sp-bulk-bar {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-bulk-checkbox--checked {
      background: Highlight !important;
      color: HighlightText !important;
    }

    .sp-card--selected {
      border-left: 4px solid Highlight !important;
    }
  }

  /* ============================
     Reduced Motion
     ============================ */

  @media (prefers-reduced-motion: reduce) {
    .sp-bulk-bar {
      transition-duration: 0.01ms !important;
    }

    .sp-bulk-checkbox {
      transition-duration: 0.01ms !important;
    }
  }
`,cn=class{constructor(n,i,a){this.callbacks=i;this.t=a,this.barElement=b("div",{class:"sp-bulk-bar"}),this.barElement.setAttribute("role","toolbar"),this.barElement.setAttribute("aria-label","Bulk actions"),this.countLabel=b("span",{class:"sp-bulk-bar-count"}),E(this.countLabel,xA(this.t,"bulk.selected",{count:0}));let l=b("div",{class:"sp-bulk-bar-actions"});this.resolveBtn=document.createElement("button"),this.resolveBtn.className="sp-bulk-btn-resolve",this.resolveBtn.type="button",this.resolveBtn.addEventListener("click",()=>this.handleResolve()),this.deleteBtn=document.createElement("button"),this.deleteBtn.className="sp-bulk-btn-delete",this.deleteBtn.type="button",this.deleteBtn.addEventListener("click",()=>this.handleDelete());let d=document.createElement("button");d.className="sp-bulk-btn-deselect",d.type="button",d.setAttribute("aria-label",this.t("bulk.deselect")),d.appendChild(V('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>')),d.addEventListener("click",()=>this.deselectAll()),l.appendChild(this.resolveBtn),l.appendChild(this.deleteBtn),l.appendChild(d),this.barElement.appendChild(this.countLabel),this.barElement.appendChild(l),this.updateButtonLabels();}callbacks;barElement;selected=new Set;checkboxMap=new Map;countLabel;resolveBtn;deleteBtn;selectAllCheckbox=null;listContainer=null;isProcessing=!1;t;createCheckbox(n){let i=b("div",{class:"sp-bulk-checkbox"});return i.setAttribute("role","checkbox"),i.setAttribute("aria-checked","false"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label",`Select feedback ${n}`),i.appendChild(V(ln)),i.addEventListener("click",a=>{a.stopPropagation(),this.toggle(n);}),i.addEventListener("keydown",a=>{(a.key===" "||a.key==="Enter")&&(a.preventDefault(),a.stopPropagation(),this.toggle(n));}),this.checkboxMap.set(n,i),i}createSelectAllBar(n,i){let a=b("div",{class:"sp-bulk-select-all"}),l=b("div",{class:"sp-bulk-checkbox"});l.appendChild(V(ln)),this.selectAllCheckbox=l;let d=b("span");return E(d,i),a.appendChild(l),a.appendChild(d),a.addEventListener("click",()=>{this.selected.size===n.length&&n.length>0?this.deselectAll():this.selectAll(n);}),a}setListContainer(n){this.listContainer=n;}toggle(n){this.isProcessing||(this.selected.has(n)?this.selected.delete(n):this.selected.add(n),this.updateCheckbox(n),this.updateBar(),this.updateSelectAllCheckbox(),this.updateListSelectionClass(),this.updateCardSelectedState(n));}selectAll(n){if(!this.isProcessing){for(let i of n)this.selected.add(i),this.updateCheckbox(i),this.updateCardSelectedState(i);this.updateBar(),this.updateSelectAllCheckbox(),this.updateListSelectionClass();}}deselectAll(){let n=[...this.selected];this.selected.clear();for(let i of n)this.updateCheckbox(i),this.updateCardSelectedState(i);this.updateBar(),this.updateSelectAllCheckbox(),this.updateListSelectionClass();}get selectedIds(){return [...this.selected]}get count(){return this.selected.size}get hasSelection(){return this.selected.size>0}reset(){this.selected.clear(),this.checkboxMap.clear(),this.selectAllCheckbox=null,this.isProcessing=!1,this.updateBar(),this.updateListSelectionClass();}destroy(){this.selected.clear(),this.checkboxMap.clear(),this.selectAllCheckbox=null,this.listContainer=null,this.barElement.remove();}updateBar(){let n=this.selected.size,i=n>0;this.barElement.classList.toggle("sp-bulk-bar--visible",i),E(this.countLabel,xA(this.t,"bulk.selected",{count:n})),this.updateButtonLabels();}updateButtonLabels(){let n=this.selected.size,i=this.t("bulk.resolve"),a=this.t("bulk.delete");this.resolveBtn.replaceChildren();let l=document.createElement("span");E(l,n>0?`${i} ${n}`:i),this.resolveBtn.appendChild(l),this.deleteBtn.replaceChildren();let d=document.createElement("span");E(d,n>0?`${a} ${n}`:a),this.deleteBtn.appendChild(d);}updateCheckbox(n){let i=this.checkboxMap.get(n);if(!i)return;let a=this.selected.has(n);i.classList.toggle("sp-bulk-checkbox--checked",a),i.setAttribute("aria-checked",String(a)),i.replaceChildren(),i.appendChild(V(a?gl:ln));}updateSelectAllCheckbox(){if(!this.selectAllCheckbox)return;let n=this.selected.size>0&&this.selected.size===this.checkboxMap.size;this.selectAllCheckbox.classList.toggle("sp-bulk-checkbox--checked",n),this.selectAllCheckbox.setAttribute("aria-checked",String(n)),this.selectAllCheckbox.replaceChildren(),this.selectAllCheckbox.appendChild(V(n?gl:ln));}updateListSelectionClass(){this.listContainer&&this.listContainer.classList.toggle("sp-list--has-selection",this.selected.size>0);}updateCardSelectedState(n){if(!this.listContainer)return;let i=CSS.escape(n),a=this.listContainer.querySelector(`[data-feedback-id="${i}"]`);a&&a.classList.toggle("sp-card--selected",this.selected.has(n));}async handleResolve(){if(this.isProcessing||this.selected.size===0)return;this.isProcessing=!0;let n=[...this.selected],i=Le(this.resolveBtn);this.deleteBtn.disabled=!0;try{await this.callbacks.onResolve(n),this.reset();}catch{i(),this.deleteBtn.disabled=!1;}finally{this.isProcessing=!1;}}async handleDelete(){if(this.isProcessing||this.selected.size===0)return;this.isProcessing=!0;let n=[...this.selected],i=Le(this.deleteBtn);this.resolveBtn.disabled=!0;try{await this.callbacks.onDelete(n),this.reset();}catch{i(),this.resolveBtn.disabled=!1;}finally{this.isProcessing=!1;}}};});function fB(s){if(/Edg\//i.test(s)){let n=s.match(/Edg\/([\d.]+)/);return n?`Edge ${n[1]}`:"Edge"}if(/OPR\//i.test(s)||/Opera/i.test(s)){let n=s.match(/OPR\/([\d.]+)/);return n?`Opera ${n[1]}`:"Opera"}if(/Firefox\//i.test(s)){let n=s.match(/Firefox\/([\d.]+)/);return n?`Firefox ${n[1]}`:"Firefox"}if(/Chrome\//i.test(s)&&!/Chromium/i.test(s)){let n=s.match(/Chrome\/([\d.]+)/);return n?`Chrome ${n[1]}`:"Chrome"}if(/Safari\//i.test(s)&&!/Chrome/i.test(s)){let n=s.match(/Version\/([\d.]+)/);return n?`Safari ${n[1]}`:"Safari"}return "Unknown"}function ml(s,n){try{return new Date(s).toLocaleString(n,{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return s}}function wB(s){try{return new URL(s).pathname}catch{return s}}function mB(s){return !!(/^data:image\/(jpeg|png|webp);/i.test(s)||/^https:\/\//i.test(s))}function dn(s,n){return s.length<=n?s:s.slice(0,n-1)+"\u2026"}function bB(s){if(!s)return  false;let n=Array.isArray(s.console)?s.console.length:0,i=Array.isArray(s.network)?s.network.length:0;return n>0||i>0}function CB(s){return !Number.isFinite(s)||s<0?"\u2014":s<1e3?`${Math.round(s)} ms`:`${(s/1e3).toFixed(1)} s`}var aB,$s,lB,cB,dB,pB,js,fl,wl,uB,hB,gB,BB,bl,pn,zs=dA(()=>{"use strict";GA();IA();jA();we();aB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',$s='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',lB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',cB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',dB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',pB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',js='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',fl='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',wl='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',uB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',hB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>',gB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',BB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',bl=`
  /* ============================
     Detail View \u2014 Panel-in-Panel
     ============================ */

  .sp-detail {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    background: var(--sp-glass-bg);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    z-index: 20;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
    overflow: hidden;
  }

  .sp-detail--visible {
    transform: translateX(0);
  }

  /* Fallback for browsers that cannot deliver a readable "frosted glass":
     drop the translucent background to a solid one so the underlying list
     does not bleed through. Two disjoint cohorts:

       1. No backdrop-filter at all (Firefox <=102, legacy Edge / IE,
          older Chromium on Linux).
       2. Safari / iOS Safari where backdrop-filter is detectable only
          via the -webkit- prefix. Empirically this still includes recent
          Safari (observed on macOS Safari 18.6 in 2026, where
          CSS.supports('backdrop-filter', 'blur(...)') returns false even
          though the unprefixed property has shipped). On these builds the
          long-standing nested-backdrop + transform compositing bug
          silently no-ops the blur on .sp-detail (which is transformed and
          lives inside another backdrop-filter ancestor, .sp-panel), so
          the translucent default is unreadable. Detection is a pure
          feature query: prefixed supported AND unprefixed not. No
          user-agent sniffing.

     Browsers where the glass effect renders correctly (most Chromium,
     modern Firefox, any engine that advertises both property names via
     CSS.supports) are unaffected. */
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .sp-detail {
      background: var(--sp-bg);
    }
  }

  @supports (-webkit-backdrop-filter: blur(1px)) and (not (backdrop-filter: blur(1px))) {
    .sp-detail {
      background: var(--sp-bg);
    }
  }

  /* ---- Header ---- */

  .sp-detail-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--sp-border);
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur));
    -webkit-backdrop-filter: blur(var(--sp-blur));
    flex-shrink: 0;
    min-height: 64px;
  }

  .sp-detail-back {
    width: 40px;
    height: 40px;
    border-radius: var(--sp-radius);
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sp-text-tertiary);
    transition: all 0.2s ease;
    flex-shrink: 0;
    padding: 0;
  }

  .sp-detail-back:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
  }

  .sp-detail-back:active {
    transform: scale(0.92);
    transition-duration: 0.1s;
  }

  .sp-detail-back svg {
    width: 18px;
    height: 18px;
  }

  .sp-detail-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--sp-text);
    letter-spacing: -0.02em;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp-detail-header .sp-badge {
    flex-shrink: 0;
  }

  /* ---- Content ---- */

  .sp-detail-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
  }

  .sp-detail-content::-webkit-scrollbar {
    width: 6px;
  }

  .sp-detail-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .sp-detail-content::-webkit-scrollbar-thumb {
    background: var(--sp-border);
    border-radius: var(--sp-radius-full);
  }

  .sp-detail-content::-webkit-scrollbar-thumb:hover {
    background: var(--sp-text-tertiary);
  }

  /* ---- Section ---- */

  .sp-detail-section {
    padding: 20px 24px;
    border-bottom: 1px solid var(--sp-border);
    opacity: 0;
    transform: translateY(8px);
    animation: sp-detail-section-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes sp-detail-section-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sp-detail-section:last-child {
    border-bottom: none;
  }

  .sp-detail-section-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sp-detail-section-title svg {
    width: 14px;
    height: 14px;
    opacity: 0.6;
  }

  /* ---- Status + Actions Section ---- */

  .sp-detail-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .sp-detail-status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: var(--sp-radius-full);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .sp-detail-status-pill--open {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .sp-detail-status-pill--resolved {
    background: rgba(156, 163, 175, 0.1);
    color: #9ca3af;
    border: 1px solid rgba(156, 163, 175, 0.2);
  }

  .sp-detail-status-pill--in-progress {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .sp-detail-status-pill--wont-fix {
    background: rgba(148, 163, 184, 0.1);
    color: #94a3b8;
    border: 1px solid rgba(148, 163, 184, 0.2);
  }

  .sp-detail-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .sp-detail-actions {
    display: flex;
    gap: 8px;
  }

  .sp-detail-actions button {
    flex: 1;
    height: 40px;
    padding: 0 16px;
    border-radius: var(--sp-radius);
    font-family: var(--sp-font);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s ease;
  }

  .sp-detail-actions button svg {
    width: 15px;
    height: 15px;
  }

  .sp-detail-btn-resolve {
    border: 1.5px solid #22c55e;
    background: rgba(34, 197, 94, 0.06);
    color: #22c55e;
  }

  .sp-detail-btn-resolve:hover {
    background: rgba(34, 197, 94, 0.14);
    box-shadow: 0 0 16px rgba(34, 197, 94, 0.12);
    transform: translateY(-1px);
  }

  .sp-detail-btn-resolve:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  .sp-detail-btn-reopen {
    border: 1.5px solid var(--sp-accent);
    background: var(--sp-accent-light);
    color: var(--sp-accent);
  }

  .sp-detail-btn-reopen:hover {
    background: rgba(var(--sp-accent), 0.14);
    box-shadow: 0 0 16px var(--sp-accent-glow);
    transform: translateY(-1px);
  }

  .sp-detail-btn-reopen:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  .sp-detail-btn-delete {
    border: 1.5px solid #ef4444;
    background: rgba(239, 68, 68, 0.06);
    color: #ef4444;
  }

  .sp-detail-btn-delete:hover {
    background: rgba(239, 68, 68, 0.14);
    box-shadow: 0 0 16px rgba(239, 68, 68, 0.12);
    transform: translateY(-1px);
  }

  .sp-detail-btn-delete:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  .sp-detail-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
    box-shadow: none;
  }

  /* ---- Message Section ---- */

  .sp-detail-message {
    font-size: 14px;
    line-height: 1.65;
    color: var(--sp-text);
    padding: 14px 16px;
    border-left: 3px solid var(--sp-accent);
    border-radius: 0 var(--sp-radius) var(--sp-radius) 0;
    background: var(--sp-glass-bg-heavy);
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* ---- Screenshot Section ---- */

  .sp-detail-screenshot {
    display: block;
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: contain;
    border-radius: var(--sp-radius);
    border: 1px solid var(--sp-glass-border);
    background: var(--sp-glass-bg-heavy);
  }

  /* ---- Metadata Section ---- */

  .sp-detail-meta {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .sp-detail-meta-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .sp-detail-meta-row svg {
    width: 14px;
    height: 14px;
    color: var(--sp-text-tertiary);
    flex-shrink: 0;
    margin-top: 1px;
  }

  .sp-detail-meta-content {
    flex: 1;
    min-width: 0;
  }

  .sp-detail-meta-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1;
    margin-bottom: 4px;
  }

  .sp-detail-meta-value {
    font-size: 13px;
    line-height: 1.4;
    color: var(--sp-text);
    word-break: break-all;
  }

  .sp-detail-meta-value--mono {
    font-family: "SF Mono", "Cascadia Code", "Fira Code", "Consolas", monospace;
    font-size: 12px;
    background: var(--sp-glass-bg-heavy);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--sp-glass-border-subtle);
  }

  .sp-detail-meta-value--secondary {
    color: var(--sp-text-secondary);
    font-size: 12px;
  }

  /* ---- Annotation Section ---- */

  .sp-detail-annotation {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sp-detail-annotation-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    border-radius: var(--sp-radius);
    background: var(--sp-glass-bg-heavy);
    border: 1px solid var(--sp-glass-border-subtle);
  }

  .sp-detail-annotation-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .sp-detail-annotation-row svg {
    width: 13px;
    height: 13px;
    color: var(--sp-text-tertiary);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .sp-detail-annotation-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1;
    margin-bottom: 3px;
  }

  .sp-detail-annotation-value {
    font-size: 12px;
    line-height: 1.4;
    color: var(--sp-text);
    word-break: break-all;
  }

  .sp-detail-annotation-value--mono {
    font-family: "SF Mono", "Cascadia Code", "Fira Code", "Consolas", monospace;
    font-size: 11px;
    background: var(--sp-bg-hover);
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp-detail-btn-goto {
    width: 100%;
    height: 44px;
    padding: 0 20px;
    border-radius: var(--sp-radius);
    border: none;
    background: var(--sp-accent-gradient);
    color: #fff;
    font-family: var(--sp-font);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.25s ease;
    box-shadow: 0 2px 12px var(--sp-accent-glow);
  }

  .sp-detail-btn-goto svg {
    width: 16px;
    height: 16px;
  }

  .sp-detail-btn-goto:hover {
    box-shadow: 0 4px 20px var(--sp-accent-glow);
    transform: translateY(-2px);
  }

  .sp-detail-btn-goto:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  /* ---- Forced Colors / High Contrast ---- */

  @media (forced-colors: active) {
    .sp-detail {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
    }

    .sp-detail-back,
    .sp-detail-btn-goto,
    .sp-detail-btn-resolve,
    .sp-detail-btn-reopen,
    .sp-detail-btn-delete {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-detail-back:focus-visible,
    .sp-detail-btn-goto:focus-visible,
    .sp-detail-btn-resolve:focus-visible,
    .sp-detail-btn-reopen:focus-visible,
    .sp-detail-btn-delete:focus-visible {
      outline: 3px solid Highlight !important;
    }

    .sp-detail-status-pill {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-detail-message {
      border-left: 3px solid ButtonText !important;
    }
  }

  /* ---- Diagnostics Section ---- */

  .sp-detail-diag {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sp-detail-diag-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 12px;
    border-radius: var(--sp-radius);
    border: 1px solid var(--sp-glass-border-subtle);
    background: var(--sp-glass-bg-heavy);
    color: var(--sp-text);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .sp-detail-diag-toggle:hover {
    background: var(--sp-bg-hover);
  }

  .sp-detail-diag-toggle svg {
    width: 12px;
    height: 12px;
    transition: transform 0.2s ease;
  }

  .sp-detail-diag-toggle[aria-expanded="true"] svg {
    transform: rotate(90deg);
  }

  .sp-detail-diag-counts {
    display: inline-flex;
    gap: 6px;
    font-weight: 500;
    color: var(--sp-text-tertiary);
  }

  .sp-detail-diag-count {
    padding: 1px 7px;
    border-radius: var(--sp-radius-full);
    background: var(--sp-bg-hover);
    font-variant-numeric: tabular-nums;
  }

  .sp-detail-diag-count--errors {
    background: rgba(239, 68, 68, 0.14);
    color: #ef4444;
  }

  .sp-detail-diag-body {
    display: none;
    flex-direction: column;
    gap: 14px;
  }

  .sp-detail-diag-body--open {
    display: flex;
  }

  .sp-detail-diag-group-title {
    font-size: 10px;
    font-weight: 700;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }

  .sp-detail-diag-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: var(--sp-radius);
    border: 1px solid var(--sp-glass-border-subtle);
    background: var(--sp-glass-bg-heavy);
    max-height: 240px;
    overflow-y: auto;
  }

  .sp-detail-diag-list li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 10px;
    border-bottom: 1px solid var(--sp-glass-border-subtle);
    font-family: "SF Mono", "Cascadia Code", "Fira Code", "Consolas", monospace;
    font-size: 11px;
    line-height: 1.45;
    color: var(--sp-text);
  }

  .sp-detail-diag-list li:last-child {
    border-bottom: none;
  }

  .sp-detail-diag-level {
    flex-shrink: 0;
    font-weight: 700;
    width: 44px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 10px;
  }

  .sp-detail-diag-level--log {
    color: var(--sp-text-tertiary);
  }
  .sp-detail-diag-level--info {
    color: #3b82f6;
  }
  .sp-detail-diag-level--warn {
    color: #f59e0b;
  }
  .sp-detail-diag-level--error {
    color: #ef4444;
  }

  .sp-detail-diag-message {
    flex: 1;
    min-width: 0;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .sp-detail-diag-net {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 8px;
    align-items: center;
  }

  .sp-detail-diag-net-status {
    flex-shrink: 0;
    font-weight: 700;
    color: #ef4444;
    min-width: 32px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .sp-detail-diag-net-method {
    flex-shrink: 0;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    min-width: 44px;
  }

  .sp-detail-diag-net-url {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--sp-text);
  }

  .sp-detail-diag-empty {
    padding: 12px;
    font-style: italic;
    font-size: 11px;
    color: var(--sp-text-tertiary);
    text-align: center;
  }

  /* ---- Reduced Motion ---- */

  @media (prefers-reduced-motion: reduce) {
    .sp-detail {
      transition-duration: 0.01ms !important;
    }

    .sp-detail-section {
      animation-duration: 0.01ms !important;
    }
  }
`;pn=class{constructor(n,i,a,l){this.colors=n;this.callbacks=i;this.t=a,this.locale=l,this.element=b("div",{class:"sp-detail"}),this.element.setAttribute("role","dialog"),this.element.setAttribute("aria-label","Feedback detail"),this.element.setAttribute("aria-hidden","true");let d=b("div",{class:"sp-detail-header"}),p=document.createElement("button");p.type="button",p.className="sp-detail-back",p.setAttribute("aria-label",this.t("detail.back")),p.appendChild(V(aB)),p.addEventListener("click",()=>{this.hide(),this.callbacks.onBack();}),this.element.appendChild(d),d.appendChild(p),this.content=b("div",{class:"sp-detail-content"}),this.element.appendChild(this.content);}colors;callbacks;element;_isVisible=!1;currentFeedback=null;content;t;locale;resolveBtn=null;deleteBtn=null;isProcessing=!1;show(n,i){this.currentFeedback=n,this.isProcessing=!1;let a=this.element.querySelector(".sp-detail-header");if(!a)return;let l=a.querySelector(".sp-detail-back");if(!l)return;a.replaceChildren(l);let d=b("span",{class:"sp-detail-title"});E(d,xA(this.t,"detail.title",{number:i})),a.appendChild(d);let p=b("span",{class:"sp-badge"});p.style.background=re(n.type,this.colors),p.style.color=DA(n.type,this.colors),E(p,n.type),a.appendChild(p),this.content.replaceChildren();let B=0,w=this.buildSection(B++);this.buildStatusActions(w,n),this.content.appendChild(w);let y=this.buildSection(B++),C=b("div",{class:"sp-detail-section-title"});E(C,this.t("detail.message")),y.appendChild(C);let F=b("div",{class:"sp-detail-message"});if(F.style.borderLeftColor=DA(n.type,this.colors),E(F,n.message),y.appendChild(F),this.content.appendChild(y),n.screenshotUrl&&mB(n.screenshotUrl)){let M=this.buildSection(B++),G=b("div",{class:"sp-detail-section-title"});E(G,this.t("detail.screenshot")),M.appendChild(G);let R=document.createElement("img");R.className="sp-detail-screenshot",R.src=n.screenshotUrl,R.alt=this.t("detail.screenshotAlt"),R.loading="lazy",R.referrerPolicy="no-referrer",M.appendChild(R),this.content.appendChild(M);}let Q=this.buildSection(B++),U=b("div",{class:"sp-detail-section-title"});if(E(U,this.t("detail.metadata")),Q.appendChild(U),this.buildMetadata(Q,n),this.content.appendChild(Q),n.annotations.length>0){let M=this.buildSection(B++),G=b("div",{class:"sp-detail-section-title"});G.appendChild(V($s));let R=b("span");E(R,this.t("detail.annotation")),G.appendChild(R),M.appendChild(G),this.buildAnnotation(M,n),this.content.appendChild(M);}if(bB(n.diagnostics)){let M=this.buildSection(B++),G=b("div",{class:"sp-detail-section-title"});G.appendChild(V(BB));let R=b("span");E(R,this.t("detail.diagnostics")),G.appendChild(R),M.appendChild(G),this.buildDiagnostics(M,n),this.content.appendChild(M);}this._isVisible=!0,this.element.setAttribute("aria-hidden","false"),this.element.offsetHeight,this.element.classList.add("sp-detail--visible"),requestAnimationFrame(()=>{l.focus();});}hide(){this._isVisible&&(this._isVisible=!1,this.element.classList.remove("sp-detail--visible"),this.element.setAttribute("aria-hidden","true"),this.currentFeedback=null,this.resolveBtn=null,this.deleteBtn=null);}get isVisible(){return this._isVisible}destroy(){this.hide(),this.element.remove();}buildSection(n){let i=b("div",{class:"sp-detail-section"});return i.style.animationDelay=`${n*40}ms`,i}buildStatusActions(n,i){let a=fA(i.status),l=b("div",{class:"sp-detail-section-title"});E(l,this.t("detail.status")),n.appendChild(l);let d=i.status.replace(/_/g,"-"),p={open:"#22c55e",in_progress:"#f59e0b",resolved:"#9ca3af",wont_fix:"#94a3b8"},B=b("div",{class:"sp-detail-status"}),w=b("span",{class:`sp-detail-status-pill sp-detail-status-pill--${d}`}),y=b("span",{class:"sp-detail-status-dot"});y.style.background=p[i.status]??p.open,w.appendChild(y);let C=b("span");E(C,qr(i.status,this.t)),w.appendChild(C),B.appendChild(w),n.appendChild(B);let F=b("div",{class:"sp-detail-actions"});if(this.resolveBtn=document.createElement("button"),this.resolveBtn.type="button",a){this.resolveBtn.className="sp-detail-btn-reopen",this.resolveBtn.appendChild(V(fl));let U=document.createElement("span");E(U,this.t("detail.reopen")),this.resolveBtn.appendChild(U);}else {this.resolveBtn.className="sp-detail-btn-resolve",this.resolveBtn.appendChild(V(js));let U=document.createElement("span");E(U,this.t("detail.resolve")),this.resolveBtn.appendChild(U);}this.resolveBtn.addEventListener("click",()=>this.handleResolve()),this.deleteBtn=document.createElement("button"),this.deleteBtn.type="button",this.deleteBtn.className="sp-detail-btn-delete",this.deleteBtn.appendChild(V(wl));let Q=document.createElement("span");E(Q,this.t("detail.delete")),this.deleteBtn.appendChild(Q),this.deleteBtn.addEventListener("click",()=>this.handleDelete()),F.appendChild(this.resolveBtn),F.appendChild(this.deleteBtn),n.appendChild(F);}buildMetadata(n,i){let a=b("div",{class:"sp-detail-meta"});if(this.addMetaRow(a,lB,this.t("detail.page"),()=>{let l=b("div",{class:"sp-detail-meta-value"}),d=wB(i.url);return E(l,dn(d,60)),l.title=i.url,l}),this.addMetaRow(a,cB,this.t("detail.author"),()=>{let l=b("div",{class:"sp-detail-meta-value"}),d=i.authorName||"Anonymous",p=i.authorEmail;return E(l,p?`${d} (${p})`:d),l}),this.addMetaRow(a,dB,this.t("detail.date"),()=>{let l=b("div",{class:"sp-detail-meta-value"});return E(l,ml(i.createdAt,this.locale.startsWith("fr")?"fr":"en")),l}),this.addMetaRow(a,pB,this.t("detail.viewport"),()=>{let l=b("div",{class:"sp-detail-meta-value sp-detail-meta-value--mono"});return E(l,i.viewport||"Unknown"),l}),this.addMetaRow(a,'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',this.t("detail.browser"),()=>{let l=b("div",{class:"sp-detail-meta-value"});return E(l,fB(i.userAgent)),l}),i.resolvedAt){let l=i.resolvedAt,d=i.status==="wont_fix"?this.t("detail.closedAt"):this.t("detail.resolvedAt");this.addMetaRow(a,js,d,()=>{let p=b("div",{class:"sp-detail-meta-value sp-detail-meta-value--secondary"});return E(p,ml(l,this.locale.startsWith("fr")?"fr":"en")),p});}n.appendChild(a);}addMetaRow(n,i,a,l){let d=b("div",{class:"sp-detail-meta-row"});d.appendChild(V(i));let p=b("div",{class:"sp-detail-meta-content"}),B=b("div",{class:"sp-detail-meta-label"});E(B,a),p.appendChild(B),p.appendChild(l()),d.appendChild(p),n.appendChild(d);}buildAnnotation(n,i){let a=i.annotations[0];if(!a)return;let l=b("div",{class:"sp-detail-annotation"}),d=b("div",{class:"sp-detail-annotation-info"});this.addAnnotationRow(d,uB,this.t("detail.element"),()=>{let w=b("span",{class:"sp-detail-annotation-value sp-detail-annotation-value--mono"}),y=a.elementId?`<${a.elementTag}#${a.elementId}>`:`<${a.elementTag}>`;return E(w,y),w}),this.addAnnotationRow(d,hB,this.t("detail.selector"),()=>{let w=b("span",{class:"sp-detail-annotation-value sp-detail-annotation-value--mono"});return E(w,dn(a.cssSelector,60)),w.title=a.cssSelector,w}),this.addAnnotationRow(d,$s,this.t("detail.position"),()=>{let w=b("span",{class:"sp-detail-annotation-value"});return E(w,`${a.xPct.toFixed(1)}%, ${a.yPct.toFixed(1)}%`+(a.wPct>0||a.hPct>0?` (${a.wPct.toFixed(1)}% \xD7 ${a.hPct.toFixed(1)}%)`:"")),w}),l.appendChild(d);let p=document.createElement("button");p.type="button",p.className="sp-detail-btn-goto",p.appendChild(V($s));let B=document.createElement("span");E(B,this.t("detail.goToAnnotation")),p.appendChild(B),p.addEventListener("click",()=>{this.currentFeedback&&this.callbacks.onGoToAnnotation(this.currentFeedback);}),l.appendChild(p),n.appendChild(l);}buildDiagnostics(n,i){let a=i.diagnostics;if(!a)return;let l=Array.isArray(a.console)?a.console:[],d=Array.isArray(a.network)?a.network:[],p=l.filter(G=>G.level==="error").length,B=b("div",{class:"sp-detail-diag"}),w=document.createElement("button");w.type="button",w.className="sp-detail-diag-toggle",w.setAttribute("aria-expanded","false"),w.setAttribute("aria-label",this.t("detail.diagnostics.expand"));let y=document.createElement("span"),C=document.createElement("span");C.style.display="inline-flex",C.style.alignItems="center",C.style.gap="8px",C.appendChild(V(gB)),E(y,this.t("detail.diagnostics")),C.appendChild(y),w.appendChild(C);let F=b("span",{class:"sp-detail-diag-counts"}),Q=b("span",{class:`sp-detail-diag-count${p>0?" sp-detail-diag-count--errors":""}`});E(Q,`${l.length} console`);let U=b("span",{class:`sp-detail-diag-count${d.length>0?" sp-detail-diag-count--errors":""}`});E(U,`${d.length} net`),F.appendChild(Q),F.appendChild(U),w.appendChild(F);let M=b("div",{class:"sp-detail-diag-body"});if(l.length>0){let G=document.createElement("div"),R=b("div",{class:"sp-detail-diag-group-title"});E(R,this.t("detail.diagnostics.console")),G.appendChild(R);let j=document.createElement("ul");j.className="sp-detail-diag-list";for(let k of l){let O=document.createElement("li"),X=b("span",{class:`sp-detail-diag-level sp-detail-diag-level--${k.level}`});E(X,k.level);let _=b("span",{class:"sp-detail-diag-message"});E(_,dn(k.message,240)),_.title=k.message,O.appendChild(X),O.appendChild(_),j.appendChild(O);}G.appendChild(j),M.appendChild(G);}if(d.length>0){let G=document.createElement("div"),R=b("div",{class:"sp-detail-diag-group-title"});E(R,this.t("detail.diagnostics.network")),G.appendChild(R);let j=document.createElement("ul");j.className="sp-detail-diag-list";for(let k of d){let O=document.createElement("li");O.classList.add("sp-detail-diag-net");let X=b("span",{class:"sp-detail-diag-net-status"});E(X,k.status===0?"ERR":String(k.status));let _=b("span",{class:"sp-detail-diag-net-method"});E(_,k.method);let z=b("span",{class:"sp-detail-diag-net-url"});E(z,dn(k.url,120)),z.title=`${k.url} \u2014 ${CB(k.durationMs)}`,O.appendChild(X),O.appendChild(_),O.appendChild(z),j.appendChild(O);}G.appendChild(j),M.appendChild(G);}w.addEventListener("click",()=>{let R=!(w.getAttribute("aria-expanded")==="true");w.setAttribute("aria-expanded",String(R)),w.setAttribute("aria-label",R?this.t("detail.diagnostics.collapse"):this.t("detail.diagnostics.expand")),M.classList.toggle("sp-detail-diag-body--open",R);}),B.appendChild(w),B.appendChild(M),n.appendChild(B);}addAnnotationRow(n,i,a,l){let d=b("div",{class:"sp-detail-annotation-row"});d.appendChild(V(i));let p=b("div",{class:"sp-detail-meta-content"}),B=b("div",{class:"sp-detail-annotation-label"});E(B,a),p.appendChild(B),p.appendChild(l()),d.appendChild(p),n.appendChild(d);}async handleResolve(){if(!(this.isProcessing||!this.currentFeedback)){this.isProcessing=!0,this.resolveBtn&&this.setButtonLoading(this.resolveBtn),this.deleteBtn&&(this.deleteBtn.disabled=!0);try{await this.callbacks.onResolve(this.currentFeedback);}catch{this.isProcessing=!1,this.resolveBtn&&this.restoreResolveBtn(this.currentFeedback),this.deleteBtn&&(this.deleteBtn.disabled=!1);}}}async handleDelete(){if(!(this.isProcessing||!this.currentFeedback)){this.isProcessing=!0,this.deleteBtn&&this.setButtonLoading(this.deleteBtn),this.resolveBtn&&(this.resolveBtn.disabled=!0);try{await this.callbacks.onDelete(this.currentFeedback);}catch{this.isProcessing=!1,this.deleteBtn&&this.restoreDeleteBtn(),this.resolveBtn&&(this.resolveBtn.disabled=!1);}}}setButtonLoading(n){n.disabled=!0,n.replaceChildren(b("div",{class:"sp-spinner sp-spinner--sm"}));}restoreResolveBtn(n){if(!this.resolveBtn)return;this.resolveBtn.disabled=!1,this.resolveBtn.replaceChildren();let i=fA(n.status);this.resolveBtn.appendChild(V(i?fl:js));let a=document.createElement("span");E(a,i?this.t("detail.reopen"):this.t("detail.resolve")),this.resolveBtn.appendChild(a);}restoreDeleteBtn(){if(!this.deleteBtn)return;this.deleteBtn.disabled=!1,this.deleteBtn.replaceChildren(),this.deleteBtn.appendChild(V(wl));let n=document.createElement("span");E(n,this.t("detail.delete")),this.deleteBtn.appendChild(n);}};});function yl(s,n){let i=[...s];switch(n){case "newest":i.sort((a,l)=>new Date(l.createdAt).getTime()-new Date(a.createdAt).getTime());break;case "oldest":i.sort((a,l)=>new Date(a.createdAt).getTime()-new Date(l.createdAt).getTime());break;case "by-type":i.sort((a,l)=>{let d=Cl[a.type]??99,p=Cl[l.type]??99;return d!==p?d-p:new Date(l.createdAt).getTime()-new Date(a.createdAt).getTime()});break;case "open-first":i.sort((a,l)=>{let d=fA(a.status)?1:0,p=fA(l.status)?1:0;return d!==p?d-p:new Date(l.createdAt).getTime()-new Date(a.createdAt).getTime()});break}return i}function QB(s){try{return new URL(s).pathname}catch{return s}}function FB(s,n){if(s.length<=n)return s;let i="\u2026",a=Math.floor((n-1)/2);return s.slice(0,a)+i+s.slice(-a)}function Ql(s){let n=new Map;for(let a of s){let l=QB(a.url),d=n.get(l);d?d.push(a):n.set(l,[a]);}return new Map([...n.entries()].sort((a,l)=>l[1].length-a[1].length))}function Fl(s,n,i){let a=b("div",{class:"sp-group-header"});a.setAttribute("role","button"),a.setAttribute("tabindex","0"),a.setAttribute("aria-expanded","true"),a.style.borderBottomColor=i.border;let l=b("span",{class:"sp-group-header-chevron"});l.appendChild(V(yB)),a.appendChild(l);let d=b("span",{class:"sp-group-header-icon"});d.appendChild(V(vl)),a.appendChild(d);let p=b("span",{class:"sp-group-header-path"}),B=FB(s,40);E(p,B),s.length>40&&(p.title=s),a.appendChild(p);let w=b("span",{class:"sp-group-header-count"});w.style.background=i.accentLight,w.style.color=i.accent,E(w,String(n)),a.appendChild(w);let y=()=>{let C=a.getAttribute("aria-expanded")==="true";a.setAttribute("aria-expanded",String(!C)),a.classList.toggle("sp-group-header--collapsed",C);let F=a.nextElementSibling;F?.classList.contains("sp-group-content")&&F.classList.toggle("sp-group-content--collapsed",C);};return a.addEventListener("click",y),a.addEventListener("keydown",C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),y());}),a}var vB,vl,yB,Cl,un,xl,Zs=dA(()=>{"use strict";GA();IA();vB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5h10"/><path d="M11 9h7"/><path d="M11 13h4"/><path d="M3 17l3 3 3-3"/><path d="M6 18V4"/></svg>',vl='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',yB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',Cl={question:0,change:1,bug:2,other:3};un=class{element;_sortMode="newest";_groupByPage=!1;menuEl=null;sortBtn;groupToggle;t;colors;onChange;outsideClickHandler=null;constructor(n,i,a){this.colors=n,this.onChange=i,this.t=a,this.element=b("div",{class:"sp-sort-controls"}),this.sortBtn=document.createElement("button"),this.sortBtn.className="sp-sort-btn",this.sortBtn.setAttribute("aria-haspopup","listbox"),this.sortBtn.setAttribute("aria-expanded","false"),this.sortBtn.setAttribute("aria-label",this.t("sort.label"));let l=V(vB);this.sortBtn.appendChild(l);let d=b("span",{class:"sp-sort-btn-label"});E(d,this.t("sort.newest")),this.sortBtn.appendChild(d),this.sortBtn.addEventListener("click",w=>{w.stopPropagation(),this.toggleMenu();}),this.groupToggle=document.createElement("button"),this.groupToggle.className="sp-group-toggle",this.groupToggle.setAttribute("aria-pressed","false");let p=V(vl);this.groupToggle.appendChild(p);let B=b("span",{class:"sp-group-toggle-label"});E(B,this.t("group.byPage")),this.groupToggle.appendChild(B),this.groupToggle.addEventListener("click",()=>{this._groupByPage=!this._groupByPage,this.groupToggle.classList.toggle("sp-group-toggle--active",this._groupByPage),this.groupToggle.setAttribute("aria-pressed",String(this._groupByPage)),this.onChange();}),this.element.appendChild(this.sortBtn),this.element.appendChild(this.groupToggle);}get sortMode(){return this._sortMode}get groupByPage(){return this._groupByPage}toggleMenu(){if(this.menuEl){this.closeMenu();return}this.openMenu();}openMenu(){this.menuEl=b("div",{class:"sp-sort-menu"}),this.menuEl.setAttribute("role","listbox"),this.menuEl.setAttribute("aria-label",this.t("sort.label")),this.sortBtn.setAttribute("aria-expanded","true");let n=[{mode:"newest",label:this.t("sort.newest")},{mode:"oldest",label:this.t("sort.oldest")},{mode:"by-type",label:this.t("sort.byType")},{mode:"open-first",label:this.t("sort.openFirst")}];for(let i of n){let a=document.createElement("button");a.className=`sp-sort-option${i.mode===this._sortMode?" sp-sort-option--active":""}`,a.setAttribute("role","option"),a.setAttribute("aria-selected",String(i.mode===this._sortMode)),i.mode===this._sortMode&&(a.style.background=this.colors.accentLight,a.style.color=this.colors.accent),E(a,i.label),a.addEventListener("click",l=>{l.stopPropagation(),this._sortMode=i.mode,this.updateSortLabel(),this.closeMenu(),this.onChange();}),this.menuEl.appendChild(a);}this.element.appendChild(this.menuEl),requestAnimationFrame(()=>{this.outsideClickHandler=i=>{this.menuEl&&!this.element.contains(i.target)&&this.closeMenu();},document.addEventListener("click",this.outsideClickHandler,!0);}),this.menuEl.addEventListener("keydown",i=>{i.key==="Escape"&&(this.closeMenu(),this.sortBtn.focus());});}closeMenu(){this.menuEl&&(this.menuEl.remove(),this.menuEl=null),this.sortBtn.setAttribute("aria-expanded","false"),this.outsideClickHandler&&(document.removeEventListener("click",this.outsideClickHandler,!0),this.outsideClickHandler=null);}updateSortLabel(){let n={newest:this.t("sort.newest"),oldest:this.t("sort.oldest"),"by-type":this.t("sort.byType"),"open-first":this.t("sort.openFirst")},i=this.sortBtn.querySelector(".sp-sort-btn-label");i&&E(i,n[this._sortMode]);}destroy(){this.closeMenu();}},xl=`
  /* ============================
     Sort Controls Container
     ============================ */

  .sp-sort-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    padding-top: 8px;
    border-top: 1px solid var(--sp-border);
  }

  /* ============================
     Sort Dropdown Button
     ============================ */

  .sp-sort-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: var(--sp-glass-bg-heavy);
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
    position: relative;
  }

  .sp-sort-btn svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .sp-sort-btn:hover {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  .sp-sort-btn[aria-expanded="true"] {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  /* ============================
     Sort Floating Menu
     ============================ */

  .sp-sort-menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    min-width: 170px;
    padding: 4px;
    border-radius: var(--sp-radius);
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-md);
    z-index: 10;
    animation: sp-sort-menu-in 0.15s ease-out both;
  }

  @keyframes sp-sort-menu-in {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* ============================
     Sort Menu Option
     ============================ */

  .sp-sort-option {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s ease;
  }

  .sp-sort-option:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
  }

  .sp-sort-option--active {
    font-weight: 600;
  }

  .sp-sort-option--active:hover {
    background: var(--sp-accent-light);
    color: var(--sp-accent);
  }

  /* ============================
     Group by Page Toggle
     ============================ */

  .sp-group-toggle {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: var(--sp-glass-bg-heavy);
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .sp-group-toggle svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }

  .sp-group-toggle:hover {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  .sp-group-toggle--active {
    background: var(--sp-accent-gradient);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 2px 8px var(--sp-accent-glow);
  }

  .sp-group-toggle--active:hover {
    background: var(--sp-accent-gradient);
    border-color: transparent;
    color: #fff;
  }

  /* ============================
     Page Group Header
     ============================ */

  .sp-group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--sp-accent-light);
    border-bottom: 1px solid var(--sp-border);
    cursor: pointer;
    user-select: none;
    position: sticky;
    top: 0;
    z-index: 2;
    transition: background 0.2s ease;
  }

  .sp-group-header:hover {
    background: var(--sp-bg-hover);
  }

  .sp-group-header:focus-visible {
    outline: 2px solid var(--sp-accent);
    outline-offset: -2px;
  }

  .sp-group-header-chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
    transform: rotate(90deg);
  }

  .sp-group-header-chevron svg {
    width: 12px;
    height: 12px;
    color: var(--sp-text-tertiary);
  }

  .sp-group-header--collapsed .sp-group-header-chevron {
    transform: rotate(0deg);
  }

  .sp-group-header-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .sp-group-header-icon svg {
    width: 14px;
    height: 14px;
    color: var(--sp-text-tertiary);
  }

  .sp-group-header-path {
    font-size: 12px;
    font-weight: 600;
    color: var(--sp-text-secondary);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp-group-header-count {
    font-size: 11px;
    font-weight: 700;
    padding: 1px 8px;
    border-radius: var(--sp-radius-full);
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  /* ============================
     Page Group Content
     ============================ */

  .sp-group-content {
    overflow: hidden;
    transition: max-height 0.25s ease, opacity 0.2s ease;
    max-height: 5000px;
    opacity: 1;
  }

  .sp-group-content--collapsed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }

  /* ============================
     Forced Colors / High Contrast
     ============================ */

  @media (forced-colors: active) {
    .sp-sort-btn,
    .sp-group-toggle,
    .sp-sort-option,
    .sp-group-header {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-sort-btn:focus-visible,
    .sp-group-toggle:focus-visible,
    .sp-sort-option:focus-visible,
    .sp-group-header:focus-visible {
      outline: 3px solid Highlight !important;
    }

    .sp-sort-menu {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
    }
  }

  /* ============================
     Reduced Motion
     ============================ */

  @media (prefers-reduced-motion: reduce) {
    .sp-sort-menu {
      animation: none;
    }
    .sp-group-header-chevron {
      transition: none;
    }
    .sp-group-content {
      transition: none;
    }
  }
`;});var El,hn,qs=dA(()=>{"use strict";GA();IA();jA();El=`
  .sp-stats-bar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--sp-border);
    user-select: none;
  }

  .sp-stats-bar[hidden] {
    display: none;
  }

  .sp-stats-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .sp-stats-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sp-stats-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .sp-stats-value {
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    color: var(--sp-text);
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    transition: opacity 0.3s ease;
  }

  .sp-stats-label {
    font-size: 11px;
    line-height: 1;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .sp-stats-progress {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sp-stats-progress-track {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: var(--sp-border);
    overflow: hidden;
  }

  .sp-stats-progress-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--sp-accent), #22c55e);
    width: 0%;
    transition: width 0.5s ease;
  }

  .sp-stats-progress-label {
    font-size: 10px;
    line-height: 1;
    color: var(--sp-text-tertiary);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    min-width: 64px;
    text-align: right;
  }
`,hn=class{constructor(n,i){this.colors=n;this.t=i,this.element=b("div",{class:"sp-stats-bar"}),this.element.setAttribute("aria-label","Feedback statistics"),this.element.hidden=!0;let a=b("div",{class:"sp-stats-row"}),l=b("div",{class:"sp-stats-item"}),d=b("span",{class:"sp-stats-dot"});d.style.background="#22c55e",this.valueOpen=b("span",{class:"sp-stats-value"}),E(this.valueOpen,"0");let p=b("span",{class:"sp-stats-label"});E(p,this.t("stats.open")),l.appendChild(d),l.appendChild(this.valueOpen),l.appendChild(p);let B=b("div",{class:"sp-stats-item"}),w=b("span",{class:"sp-stats-dot"});w.style.background="#9ca3af",this.valueResolved=b("span",{class:"sp-stats-value"}),E(this.valueResolved,"0");let y=b("span",{class:"sp-stats-label"});E(y,this.t("stats.resolved")),B.appendChild(w),B.appendChild(this.valueResolved),B.appendChild(y);let C=b("div",{class:"sp-stats-item"}),F=b("span",{class:"sp-stats-dot"});F.style.background=this.colors.typeBug,this.valueBugs=b("span",{class:"sp-stats-value"}),E(this.valueBugs,"0");let Q=b("span",{class:"sp-stats-label"});E(Q,this.t("stats.bugs")),C.appendChild(F),C.appendChild(this.valueBugs),C.appendChild(Q),a.appendChild(l),a.appendChild(B),a.appendChild(C);let U=b("div",{class:"sp-stats-progress"}),M=b("div",{class:"sp-stats-progress-track"});this.progressFill=b("div",{class:"sp-stats-progress-fill"}),M.appendChild(this.progressFill),this.progressLabel=b("span",{class:"sp-stats-progress-label"}),E(this.progressLabel,""),U.appendChild(M),U.appendChild(this.progressLabel),this.element.appendChild(a),this.element.appendChild(U);}colors;element;valueOpen;valueResolved;valueBugs;progressFill;progressLabel;t;update(n,i){if(i===0){this.element.hidden=!0;return}this.element.hidden=!1;let a=0,l=0,d=0;for(let y of n)fA(y.status)?l++:a++,y.type==="bug"&&d++;E(this.valueOpen,String(a)),E(this.valueResolved,String(l)),E(this.valueBugs,String(d));let p=n.length,B=p>0?Math.round(l/p*100):0;requestAnimationFrame(()=>{this.progressFill.style.width=`${B}%`;});let w=xA(this.t,"stats.progress",{percent:B});E(this.progressLabel,w);}};});function Ai(s){let n=s.querySelectorAll(".sp-card");for(let i=0;i<n.length;i++)if(n[i]?.classList.contains("sp-card--focused"))return i;return  -1}function Ul(s,n){let i=s.querySelectorAll(".sp-card");if(i.length===0)return;for(let d of i)d.classList.remove("sp-card--focused");let a=Math.max(0,Math.min(n,i.length-1)),l=i[a];l&&(l.classList.add("sp-card--focused"),l.scrollIntoView({block:"nearest",behavior:"smooth"}),l.focus({preventScroll:true}));}var xB,EB,Hl,UB,gn,ei=dA(()=>{"use strict";IA();xB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M6 12h.01"/><path d="M18 12h.01"/><path d="M8 16h8"/></svg>';EB=[{keys:["J","K"],label:"shortcuts.navigate"},{keys:["R"],label:"shortcuts.resolve"},{keys:["D"],label:"shortcuts.delete"},{keys:["F","/"],label:"shortcuts.search"},{keys:["X"],label:"shortcuts.select"},{keys:["?"],label:"shortcuts.help"},{keys:["Esc"],label:"shortcuts.close"}],Hl=`
  /* ---- Help overlay backdrop ---- */

  .sp-shortcuts-overlay {
    position: fixed;
    inset: 0;
    background: var(--sp-backdrop, rgba(15, 23, 42, 0.2));
    backdrop-filter: blur(var(--sp-blur));
    -webkit-backdrop-filter: blur(var(--sp-blur));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .sp-shortcuts-overlay--visible {
    opacity: 1;
    pointer-events: auto;
  }

  /* ---- Glassmorphism card ---- */

  .sp-shortcuts-card {
    width: 380px;
    max-width: calc(100vw - 32px);
    padding: 24px 28px 20px;
    border-radius: 20px;
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-xl);
    font-family: var(--sp-font);
    position: relative;
    transform: scale(0.92) translateY(8px);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .sp-shortcuts-overlay--visible .sp-shortcuts-card {
    transform: scale(1) translateY(0);
  }

  /* ---- Title row ---- */

  .sp-shortcuts-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 700;
    color: var(--sp-text);
    margin-bottom: 18px;
  }

  .sp-shortcuts-title svg {
    width: 18px;
    height: 18px;
    color: var(--sp-text-secondary);
    flex-shrink: 0;
  }

  /* ---- Close button ---- */

  .sp-shortcuts-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--sp-text-tertiary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .sp-shortcuts-close:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
  }

  .sp-shortcuts-close svg {
    width: 14px;
    height: 14px;
  }

  /* ---- Two-column grid ---- */

  .sp-shortcuts-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sp-shortcuts-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sp-shortcuts-keys {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 80px;
    justify-content: flex-end;
  }

  .sp-shortcuts-separator {
    font-size: 11px;
    color: var(--sp-text-tertiary);
    user-select: none;
  }

  /* ---- Key badge (<kbd> styling) ---- */

  .sp-kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 26px;
    padding: 0 7px;
    border-radius: 6px;
    background: var(--sp-bg-hover);
    border: 1px solid var(--sp-border);
    box-shadow:
      inset 0 -1px 0 rgba(0, 0, 0, 0.08),
      0 1px 2px rgba(0, 0, 0, 0.04);
    font-family: ui-monospace, "SF Mono", "Cascadia Code", "Segoe UI Mono", Menlo, monospace;
    font-size: 12px;
    font-weight: 600;
    color: var(--sp-text);
    text-align: center;
    line-height: 1;
    user-select: none;
  }

  /* ---- Description text ---- */

  .sp-shortcuts-desc {
    font-size: 13px;
    color: var(--sp-text-secondary);
    line-height: 1.3;
  }

  /* ---- Hint button (bottom-right of panel) ---- */

  .sp-shortcuts-hint {
    width: 24px;
    height: 24px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: var(--sp-bg-hover);
    color: var(--sp-text-tertiary);
    font-family: ui-monospace, "SF Mono", "Cascadia Code", "Segoe UI Mono", Menlo, monospace;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    position: absolute;
    bottom: 12px;
    right: 12px;
  }

  .sp-shortcuts-hint:hover {
    background: var(--sp-accent-light);
    color: var(--sp-accent);
    border-color: var(--sp-accent);
  }

  .sp-shortcuts-hint::after {
    content: attr(aria-label);
    position: absolute;
    bottom: calc(100% + 6px);
    right: 0;
    padding: 4px 8px;
    border-radius: 6px;
    background: var(--sp-glass-bg-heavy);
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-sm);
    font-family: var(--sp-font);
    font-size: 11px;
    font-weight: 500;
    color: var(--sp-text-secondary);
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transform: translateY(4px);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .sp-shortcuts-hint:hover::after {
    opacity: 1;
    transform: translateY(0);
  }

  /* ---- Card focus highlight (navigation) ---- */

  .sp-card--focused {
    outline: 2px solid var(--sp-accent);
    outline-offset: -2px;
    border-radius: inherit;
  }

  /* ---- Reduced motion ---- */

  @media (prefers-reduced-motion: reduce) {
    .sp-shortcuts-overlay,
    .sp-shortcuts-card,
    .sp-shortcuts-close,
    .sp-shortcuts-hint,
    .sp-shortcuts-hint::after {
      transition-duration: 0.01ms !important;
    }
  }
`,UB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',gn=class{constructor(n,i,a){this.t=a;this.keyMap=new Map([["j",()=>i.onNavigate("down")],["k",()=>i.onNavigate("up")],["r",()=>i.onResolve()],["d",()=>i.onDelete()],["f",()=>i.onFocusSearch()],["/",()=>i.onFocusSearch()],["x",()=>i.onToggleSelect()],["?",()=>this.toggleHelp()]]),this.helpOverlay=this.buildOverlay(),this.hintButton=this.buildHintButton(),this.boundHandler=l=>this.handleKeydown(l);}t;helpOverlay;hintButton;keyMap;boundHandler;shadowRoot=null;enabled=!1;helpVisible=!1;destroyed=!1;enable(n){if(this.destroyed||this.enabled)return;n&&(this.shadowRoot=n),(this.shadowRoot??document).addEventListener("keydown",this.boundHandler),this.enabled=!0;}disable(){if(!this.enabled)return;(this.shadowRoot??document).removeEventListener("keydown",this.boundHandler),this.enabled=!1,this.helpVisible&&this.hideHelp();}toggleHelp(){this.helpVisible?this.hideHelp():this.showHelp();}destroy(){this.destroyed||(this.disable(),this.helpOverlay.remove(),this.hintButton.remove(),this.destroyed=!0);}handleKeydown(n){if(n.key==="Escape"){this.helpVisible&&(n.preventDefault(),n.stopPropagation(),this.hideHelp());return}if(this.helpVisible)return;let i=n.composedPath()[0];if(i){let l=i.tagName?.toLowerCase();if(l==="input"||l==="textarea"||l==="select"||i.isContentEditable)return}if(n.ctrlKey||n.altKey||n.metaKey)return;let a=this.keyMap.get(n.key);a&&(n.preventDefault(),n.stopPropagation(),a());}showHelp(){this.helpVisible=!0,this.helpOverlay.classList.add("sp-shortcuts-overlay--visible"),this.helpOverlay.querySelector(".sp-shortcuts-close")?.focus();}hideHelp(){this.helpVisible=!1,this.helpOverlay.classList.remove("sp-shortcuts-overlay--visible");}buildOverlay(){let n=b("div",{class:"sp-shortcuts-overlay"});n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label",this.t("shortcuts.title")),n.addEventListener("click",B=>{B.target===n&&this.hideHelp();});let i=b("div",{class:"sp-shortcuts-card"}),a=b("div",{class:"sp-shortcuts-title"});a.appendChild(V(xB));let l=b("span");E(l,this.t("shortcuts.title")),a.appendChild(l),i.appendChild(a);let d=document.createElement("button");d.className="sp-shortcuts-close",d.setAttribute("aria-label",this.t("shortcuts.close")),d.appendChild(V(UB)),d.addEventListener("click",()=>this.hideHelp()),i.appendChild(d);let p=b("div",{class:"sp-shortcuts-grid"});for(let B of EB){let w=b("div",{class:"sp-shortcuts-row"}),y=b("div",{class:"sp-shortcuts-keys"});B.keys.forEach((F,Q)=>{if(Q>0){let M=b("span",{class:"sp-shortcuts-separator"});E(M,"/"),y.appendChild(M);}let U=b("span",{class:"sp-kbd"});E(U,F),y.appendChild(U);});let C=b("span",{class:"sp-shortcuts-desc"});E(C,this.t(B.label)),w.appendChild(y),w.appendChild(C),p.appendChild(w);}return i.appendChild(p),n.appendChild(i),n}buildHintButton(){let n=document.createElement("button");return n.className="sp-shortcuts-hint",n.setAttribute("aria-label",this.t("shortcuts.hint")),E(n,"?"),n.addEventListener("click",i=>{i.stopPropagation(),this.toggleHelp();}),n}};});var Nt,Il=dA(()=>{"use strict";IA();Nt=class{element;current;opts;onChange;datasetKey;constructor(n){this.opts=n.options,this.current=n.value,this.onChange=n.onChange,this.datasetKey=n.datasetKey,this.element=b("div",{class:`sp-segmented${n.extraClass?` ${n.extraClass}`:""}`,role:"radiogroup"}),this.element.setAttribute("aria-label",n.ariaLabel);for(let i of this.opts){let a=document.createElement("button");a.type="button",a.className=n.modifierPrefix!==void 0?`sp-segmented__btn ${n.modifierPrefix}${i.value}`:"sp-segmented__btn",a.dataset[this.datasetKey]=i.value,a.setAttribute("role","radio");let l=this.current===i.value;if(a.setAttribute("aria-checked",String(l)),a.tabIndex=l?0:-1,l&&a.classList.add("sp-segmented__btn--active"),i.color&&a.style.setProperty("--sp-chip-color",i.color),i.bg&&a.style.setProperty("--sp-chip-bg",i.bg),i.icon){let p=b("span",{class:"sp-segmented__icon"});p.appendChild(V(i.icon)),a.appendChild(p);}let d=b("span",{class:"sp-segmented__label"});E(d,i.label),a.appendChild(d),a.addEventListener("click",()=>this.select(i.value)),a.addEventListener("keydown",p=>this.handleKey(p,i.value)),this.element.appendChild(a);}}select(n){this.current=n,this.syncSelection(),this.onChange(n);}syncSelection(){let n=this.element.querySelectorAll(".sp-segmented__btn");for(let i of n){let a=i.dataset[this.datasetKey]===this.current;i.classList.toggle("sp-segmented__btn--active",a),i.setAttribute("aria-checked",String(a)),i.tabIndex=a?0:-1;}}setOptionVisible(n,i){let a=this.element.querySelector(`[data-${this.kebabKey()}="${n}"]`);return a?(a.style.display=i?"":"none",!0):!1}get value(){return this.current}focusOption(n){this.element.querySelector(`[data-${this.kebabKey()}="${n}"]`)?.focus();}handleKey(n,i){let a=this.opts.map(B=>B.value).filter(B=>{let w=this.element.querySelector(`[data-${this.kebabKey()}="${B}"]`);return w!==null&&w.style.display!=="none"}),l=a.indexOf(i);if(l<0)return;let d;switch(n.key){case "ArrowLeft":d=(l-1+a.length)%a.length;break;case "ArrowRight":d=(l+1)%a.length;break;case "Home":d=0;break;case "End":d=a.length-1;break;default:return}n.preventDefault();let p=a[d];p!==void 0&&(this.select(p),this.focusOption(p));}kebabKey(){return this.datasetKey.replace(/[A-Z]/g,n=>`-${n.toLowerCase()}`)}};});var Sl={};He(Sl,{Panel:()=>si});var LB,si,Ll=dA(()=>{"use strict";GA();Il();IA();Ys();jA();Vr();Js();zs();Zs();qs();ei();we();LB=us.filter(s=>!fA(s)),si=class{constructor(n,i,a,l,d,p,B,w,y){this.colors=i;this.bus=a;this.client=l;this.projectName=d;this.markers=p;this.t=B;this.locale=w;this.shadowRoot=n,this.getScope=y?.getScope??(()=>({url:window.location.pathname,urlPattern:null})),this.scopeAnnotationsByUrl=y?.scopeAnnotationsByUrl??!0,this.root=b("div",{class:"sp-panel"}),this.root.setAttribute("role","complementary"),this.root.setAttribute("aria-label",this.t("panel.ariaLabel")),this.root.setAttribute("aria-hidden","true");let C=b("div",{class:"sp-panel-header"}),F=b("span",{class:"sp-panel-title"});E(F,this.t("panel.title")),this.closeBtn=document.createElement("button"),this.closeBtn.className="sp-panel-close",this.closeBtn.setAttribute("aria-label",this.t("panel.close")),this.closeBtn.appendChild(V(Rr)),this.closeBtn.addEventListener("click",()=>this.close()),this.deleteAllBtn=document.createElement("button"),this.deleteAllBtn.className="sp-btn-delete-all",this.deleteAllBtn.setAttribute("aria-label",this.t("panel.deleteAll")),this.deleteAllBtn.appendChild(V(Ls));let Q=document.createElement("span");E(Q,` ${this.t("panel.deleteAll")}`),this.deleteAllBtn.appendChild(Q),this.deleteAllBtn.addEventListener("click",()=>this.confirmDeleteAll()),this.exportBtn=new an(i,()=>this.feedbacks,this.t);let U=b("div",{class:"sp-panel-header-right"});U.appendChild(this.exportBtn.element),U.appendChild(this.deleteAllBtn),U.appendChild(this.closeBtn),C.appendChild(F),C.appendChild(U),this.stats=new hn(i,this.t);let M=b("div",{class:"sp-filters"}),G=b("div",{class:"sp-search-wrap"}),R=V(ga);R.setAttribute("class","sp-search-icon"),this.searchInput=document.createElement("input"),this.searchInput.type="text",this.searchInput.className="sp-search",this.searchInput.placeholder=this.t("panel.search"),this.searchInput.setAttribute("aria-label",this.t("panel.searchAria")),this.searchInput.addEventListener("input",()=>{this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>this.loadFeedbacks().catch(()=>{}),200);}),G.appendChild(R),G.appendChild(this.searchInput);let j=b("div",{class:"sp-filter-bar"});j.appendChild(this.buildTypeDropdown()),j.appendChild(this.buildStatusSegmented()),j.appendChild(this.buildScopeSegmented()),this.sortControls=new un(i,()=>this.renderList(),this.t),M.appendChild(G),M.appendChild(j),M.appendChild(this.sortControls.element),this.listContainer=b("div",{class:"sp-list"}),this.listContainer.setAttribute("role","list"),this.listContainer.setAttribute("aria-label",this.t("panel.feedbackList")),this.bulk=new cn(i,{onResolve:k=>this.bulkResolve(k),onDelete:k=>this.bulkDelete(k)},this.t),this.bulk.setListContainer(this.listContainer),this.detail=new pn(i,{onBack:()=>this.detail.hide(),onResolve:async k=>{try{let O=!fA(k.status);await this.client.resolveFeedback(k.id,O),await this.loadFeedbacks(),this.detail.hide();}catch(O){throw this.bus.emit("feedback:error",O instanceof Error?O:new Error(String(O))),O}},onDelete:async k=>{try{await this.client.deleteFeedback(k.id),this.bus.emit("feedback:deleted",k.id),await this.loadFeedbacks(),this.detail.hide();}catch(O){throw this.bus.emit("feedback:error",O instanceof Error?O:new Error(String(O))),O}},onGoToAnnotation:k=>{if(k.annotations.length>0){let O=k.annotations[0];if(!O)return;window.scrollTo({left:O.scrollX,top:O.scrollY,behavior:"smooth"}),this.markers.pinHighlight(k);}}},this.t,w),this.shortcuts=new gn(i,{onNavigate:k=>{let O=Ai(this.listContainer);Ul(this.listContainer,k==="down"?O+1:O-1);},onResolve:()=>{let k=this.getFocusedFeedback();if(k&&!this.pendingMutations.has(k.id)){let X=this.listContainer.querySelector(`[data-feedback-id="${CSS.escape(k.id)}"]`)?.querySelector('[data-action="resolve"]');X&&this.toggleResolve(k,X).catch(()=>{});}},onDelete:()=>{let k=this.getFocusedFeedback();if(k&&!this.pendingMutations.has(k.id)){let X=this.listContainer.querySelector(`[data-feedback-id="${CSS.escape(k.id)}"]`)?.querySelector('[data-action="delete"]');X&&this.deleteFeedback(k,X).catch(()=>{});}},onFocusSearch:()=>this.searchInput.focus(),onToggleSelect:()=>{let k=this.getFocusedFeedback();k&&this.bulk.toggle(k.id);}},this.t),this.root.appendChild(C),this.root.appendChild(this.stats.element),this.root.appendChild(M),this.root.appendChild(this.listContainer),this.root.appendChild(this.bulk.barElement),this.root.appendChild(this.detail.element),this.root.appendChild(this.shortcuts.helpOverlay),this.root.appendChild(this.shortcuts.hintButton),n.appendChild(this.root),this.onListClick=k=>{let O=k.target;if(O.closest(".sp-bulk-checkbox"))return;let X=O.closest("[data-action]");if(X){k.stopPropagation();let z=X.closest(".sp-card");if(!z)return;let nA=z.dataset.feedbackId,aA=this.feedbacks.find(lA=>lA.id===nA);if(!aA)return;let sA=X.dataset.action;if(sA==="expand"){let lA=z.querySelector(".sp-card-message");if(!lA)return;let SA=lA.classList.toggle("sp-card-message--expanded");E(X,SA?this.t("panel.showLess"):this.t("panel.showMore")),X.setAttribute("aria-expanded",String(SA));}else if(sA==="resolve"){if(this.pendingMutations.has(aA.id))return;let lA=X;this.toggleResolve(aA,lA).catch(()=>{});}else if(sA==="delete"){if(this.pendingMutations.has(aA.id))return;let lA=X;this.deleteFeedback(aA,lA).catch(()=>{});}return}let _=O.closest(".sp-card");if(_){let z=_.dataset.feedbackId,nA=this.feedbacks.find(aA=>aA.id===z);if(nA){let aA=this.feedbacks.indexOf(nA)+1;this.detail.show(nA,aA);}}},this.listContainer.addEventListener("click",this.onListClick),this.onListKeydown=k=>{let O=k;if(O.key!=="Enter"&&O.key!==" ")return;let X=O.target,_=X.closest(".sp-card");if(!_||X!==_)return;O.preventDefault();let z=_.dataset.feedbackId,nA=this.feedbacks.find(aA=>aA.id===z);if(nA){let aA=this.feedbacks.indexOf(nA)+1;this.detail.show(nA,aA);}},this.listContainer.addEventListener("keydown",this.onListKeydown),this.onListMouseover=k=>{let X=k.target.closest(".sp-card");if(!X)return;let _=X.dataset.feedbackId;_&&this.markers.highlight(_);},this.listContainer.addEventListener("mouseover",this.onListMouseover),this.onListMouseout=k=>{let O=k.relatedTarget;O&&this.listContainer.contains(O)||this.markers.highlight("");},this.listContainer.addEventListener("mouseout",this.onListMouseout),this.bus.on("panel:toggle",k=>{k?this.open():this.close();}),n.addEventListener("keydown",k=>{let O=k;if(O.key==="Escape"&&this.isOpen){if(this.detail.isVisible){this.detail.hide();return}this.close();return}if(O.key==="Tab"&&this.isOpen){let X=sA=>{let lA=sA;for(;lA&&lA!==this.root;){if(lA.style.display==="none")return !1;lA=lA.parentElement;}return !0},_=Array.from(this.root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(sA=>X(sA)&&!sA.hasAttribute("disabled"));if(_.length===0)return;let z=_[0],nA=_[_.length-1];if(!z||!nA)return;let aA=n.activeElement;O.shiftKey&&aA===z?(O.preventDefault(),nA.focus()):!O.shiftKey&&aA===nA&&(O.preventDefault(),z.focus());}}),this.onMarkerClick=(k=>{this.scrollToFeedback(k.detail.feedbackId);}),document.addEventListener("sp-marker-click",this.onMarkerClick);}colors;bus;client;projectName;markers;t;locale;root;listContainer;searchInput;closeBtn;deleteAllBtn;activeFilters=new Set(["all"]);typeDropdownBtn;typeDropdownContainer;typeDropdownMenu=null;typeDropdownOutsideHandler=null;statusSegmented;typeOptions;feedbacks=[];currentPage=1;totalFeedbacks=0;isLoadingMore=!1;isOpen=!1;searchTimeout=null;loadController=null;pendingMutations=new Set;stats;sortControls;bulk;exportBtn;shortcuts;detail;shadowRoot;getScope;scopeAnnotationsByUrl;scopeSegmented;initialScopeFilter="this";onMarkerClick;onListClick;onListKeydown;onListMouseover;onListMouseout;async open(){this.isOpen||(this.isOpen=!0,this.root.classList.add("sp-panel--open"),this.root.setAttribute("aria-hidden","false"),this.bus.emit("open"),this.shortcuts.enable(this.shadowRoot),await this.loadFeedbacks(),requestAnimationFrame(()=>{this.searchInput?this.searchInput.focus():this.closeBtn.focus();}));}close(){if(!this.isOpen)return;this.isOpen=!1,this.root.classList.remove("sp-panel--open"),this.root.setAttribute("aria-hidden","true"),this.bus.emit("close"),this.shortcuts.disable(),this.detail.hide(),this.root.getRootNode().querySelector(".sp-fab")?.focus();}showLoading(){this.listContainer.replaceChildren();let n=b("div",{class:"sp-loading"});n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.setAttribute("aria-label",this.t("panel.loading"));let i=b("div",{class:"sp-spinner"});n.appendChild(i),this.listContainer.appendChild(n);}showError(){this.listContainer.replaceChildren();let n=b("div",{class:"sp-empty"});n.setAttribute("role","status"),n.setAttribute("aria-live","polite");let i=b("div",{class:"sp-empty-text"});E(i,this.t("panel.loadError"));let a=document.createElement("button");a.className="sp-btn-ghost",a.style.marginTop="8px",E(a,this.t("panel.retry")),a.addEventListener("click",()=>this.loadFeedbacks().catch(()=>{})),n.appendChild(i),n.appendChild(a),this.listContainer.appendChild(n);}statusBucket(n){if(n!=="all")return fA(n)?Dr:LB}async loadFeedbacks(){this.loadController?.abort(),this.loadController=new AbortController;let{signal:n}=this.loadController;this.currentPage=1;let i=this.searchInput.value.trim()||void 0,a=this.activeFilters.has("all")?void 0:Array.from(this.activeFilters)[0],l=this.statusBucket(this.statusSegmented.value),d=this.getScope();this.syncScopeAvailability();let p=this.scopeSegmented.value,B={page:1,limit:20};a&&(B.type=a),l&&(B.statuses=l),i&&(B.search=i),p==="this"?B.url=d.url:p==="template"&&d.urlPattern&&(B.urlPattern=d.urlPattern);let w=this.feedbacks.length>0;w||this.showLoading();try{let{feedbacks:y,total:C}=await this.client.getFeedbacks(this.projectName,B);if(n.aborted)return;this.feedbacks=y,this.totalFeedbacks=C,this.stats.update(y,C),this.bulk.reset(),this.renderList();let F=this.scopeAnnotationsByUrl?y.filter(Q=>Q.url===d.url):y;this.markers.render(F);}catch(y){if(n.aborted)return;w||this.showError(),this.bus.emit("feedback:error",y instanceof Error?y:new Error(String(y)));}}async loadMoreFeedbacks(){if(this.isLoadingMore)return;this.isLoadingMore=!0;let n=this.loadController,i=this.currentPage+1,a=this.searchInput.value.trim()||void 0,l=this.activeFilters.has("all")?void 0:Array.from(this.activeFilters)[0],d=this.statusBucket(this.statusSegmented.value),p=this.getScope(),B=this.scopeSegmented.value,w={page:i,limit:20};l&&(w.type=l),d&&(w.statuses=d),a&&(w.search=a),B==="this"?w.url=p.url:B==="template"&&p.urlPattern&&(w.urlPattern=p.urlPattern);let y=this.listContainer.querySelector(".sp-btn-load-more"),C;y&&(C=Le(y));try{let{feedbacks:F,total:Q}=await this.client.getFeedbacks(this.projectName,w);if(n!==this.loadController)return;this.currentPage=i,this.totalFeedbacks=Q,this.feedbacks=[...this.feedbacks,...F],this.stats.update(this.feedbacks,Q),this.renderList();let U=this.scopeAnnotationsByUrl?this.feedbacks.filter(M=>M.url===p.url):this.feedbacks;this.markers.render(U);}catch(F){C&&C(),this.bus.emit("feedback:error",F instanceof Error?F:new Error(String(F)));}finally{this.isLoadingMore=!1;}}renderList(){if(this.listContainer.replaceChildren(),this.feedbacks.length===0){let d=b("div",{class:"sp-empty"});d.setAttribute("role","status"),d.setAttribute("aria-live","polite");let p=b("div",{class:"sp-empty-text"});E(p,this.t("panel.empty")),d.appendChild(p),this.listContainer.appendChild(d);return}let n=yl(this.feedbacks,this.sortControls.sortMode),i=n.map(d=>d.id),a=this.bulk.createSelectAllBar(i,this.t("bulk.selectAll"));if(this.listContainer.appendChild(a),this.sortControls.groupByPage){let d=Ql(n),p=0;for(let[B,w]of d){let y=Fl(B,w.length,this.colors);this.listContainer.appendChild(y);let C=b("div",{class:"sp-group-content"});for(let F of w){let Q=this.createCard(F,p+1);Q.style.setProperty("--sp-card-i",String(p)),C.appendChild(Q),p++;}this.listContainer.appendChild(C);}}else n.forEach((d,p)=>{let B=this.createCard(d,p+1);B.style.setProperty("--sp-card-i",String(p)),this.listContainer.appendChild(B);});let l=this.totalFeedbacks-this.feedbacks.length;if(l>0){let d=b("div",{class:"sp-load-more-wrap"}),p=document.createElement("button");p.className="sp-btn-ghost sp-btn-load-more",E(p,xA(this.t,"panel.loadMore",{remaining:l})),p.addEventListener("click",()=>this.loadMoreFeedbacks().catch(()=>{})),d.appendChild(p),this.listContainer.appendChild(d);}}createCard(n,i){let a=fA(n.status),l=DA(n.type,this.colors),d=b("div",{class:`sp-card ${a?"sp-card--resolved":""}`});d.setAttribute("role","listitem"),d.setAttribute("tabindex","0"),d.setAttribute("aria-label",`Feedback #${i}: ${De(n.type,this.t)} \u2014 ${n.message.slice(0,80)}`),d.dataset.feedbackId=n.id;let p=b("div",{class:"sp-card-bar"});p.style.background=a?"#9ca3af":l;let B=b("div",{class:"sp-card-body"}),w=b("div",{class:"sp-card-header"}),y=this.bulk.createCheckbox(n.id);w.appendChild(y);let C=b("span",{class:"sp-card-number"});E(C,`#${i}`);let F=b("span",{class:"sp-badge"}),Q=re(n.type,this.colors);F.style.background=Q,F.style.color=l,E(F,De(n.type,this.t));let U=b("span",{class:"sp-badge sp-badge--status"});U.dataset.status=n.status,U.style.background=Fa(n.status,this.colors),U.style.color=Qa(n.status,this.colors),E(U,qr(n.status,this.t));let M=b("span",{class:"sp-card-date"});E(M,Mr(n.createdAt,this.locale)),w.appendChild(C),w.appendChild(F),w.appendChild(U),w.appendChild(M);let G=b("div",{class:"sp-card-message"});E(G,n.message);let R=document.createElement("button");R.className="sp-card-expand",R.dataset.action="expand",E(R,this.t("panel.showMore")),R.style.display="none",R.setAttribute("aria-expanded","false"),requestAnimationFrame(()=>{G.scrollHeight>G.clientHeight&&(R.style.display="block");});let j=b("div",{class:"sp-card-footer"}),k=document.createElement("button");if(k.className="sp-btn-resolve",k.dataset.action="resolve",a){k.appendChild(V(wa));let _=document.createElement("span");E(_,` ${this.t("panel.reopen")}`),k.appendChild(_);}else {k.appendChild(V(Or));let _=document.createElement("span");E(_,` ${this.t("panel.resolve")}`),k.appendChild(_);}let O=document.createElement("button");O.className="sp-btn-delete",O.dataset.action="delete",O.appendChild(V(Ls));let X=document.createElement("span");return E(X,` ${this.t("panel.delete")}`),O.appendChild(X),j.appendChild(k),j.appendChild(O),B.appendChild(w),B.appendChild(G),B.appendChild(R),B.appendChild(j),d.appendChild(p),d.appendChild(B),d}async bulkResolve(n){try{await Promise.all(n.map(i=>this.client.resolveFeedback(i,!0))),await this.loadFeedbacks();}catch(i){throw this.bus.emit("feedback:error",i instanceof Error?i:new Error(String(i))),i}}async bulkDelete(n){try{await Promise.all(n.map(i=>this.client.deleteFeedback(i)));for(let i of n)this.bus.emit("feedback:deleted",i);await this.loadFeedbacks();}catch(i){throw this.bus.emit("feedback:error",i instanceof Error?i:new Error(String(i))),i}}async confirmDeleteAll(){if(await this.showConfirmDialog(this.t("panel.deleteAllConfirmTitle"),this.t("panel.deleteAllConfirmMessage"))){this.deleteAllBtn.disabled=!0;try{await this.client.deleteAllFeedbacks(this.projectName),this.bus.emit("feedback:all-deleted"),await this.loadFeedbacks();}catch(i){this.bus.emit("feedback:error",i instanceof Error?i:new Error(String(i)));}finally{this.deleteAllBtn.disabled=!1;}}}showConfirmDialog(n,i){return new Promise(a=>{let l=b("div",{class:"sp-confirm-backdrop"}),d=`sp-confirm-title-${Date.now()}`,p=`sp-confirm-msg-${Date.now()}`,B=b("div",{class:"sp-confirm-dialog"});B.setAttribute("role","alertdialog"),B.setAttribute("aria-modal","true"),B.setAttribute("aria-labelledby",d),B.setAttribute("aria-describedby",p);let w=b("div",{class:"sp-confirm-title"});w.id=d,E(w,n);let y=b("div",{class:"sp-confirm-message"});y.id=p,E(y,i);let C=b("div",{class:"sp-confirm-actions"}),F=document.createElement("button");F.type="button",F.className="sp-btn-ghost",E(F,this.t("panel.cancel"));let Q=document.createElement("button");Q.type="button",Q.className="sp-btn-danger",E(Q,this.t("panel.confirmDelete"));let U=!1,M=R=>{U||(U=!0,l.removeEventListener("keydown",G),l.style.opacity="0",B.style.transform="translateY(8px) scale(0.97)",setTimeout(()=>{l.remove(),a(R);},200));},G=R=>{let j=R;if(j.key==="Escape"){M(!1);return}j.key==="Tab"&&(j.preventDefault(),l.getRootNode().activeElement===F?Q.focus():F.focus());};l.addEventListener("keydown",G),F.addEventListener("click",()=>M(!1)),Q.addEventListener("click",()=>M(!0)),l.addEventListener("click",R=>{R.target===l&&M(!1);}),C.appendChild(F),C.appendChild(Q),B.appendChild(w),B.appendChild(y),B.appendChild(C),l.appendChild(B),this.root.getRootNode()instanceof ShadowRoot?this.root.getRootNode().appendChild(l):this.root.appendChild(l),requestAnimationFrame(()=>{l.style.opacity="1",B.style.transform="translateY(0) scale(1)",F.focus();});})}async deleteFeedback(n,i){this.pendingMutations.add(n.id);let a=Le(i);try{await this.client.deleteFeedback(n.id),this.bus.emit("feedback:deleted",n.id),await this.loadFeedbacks();}catch(l){a(),this.bus.emit("feedback:error",l instanceof Error?l:new Error(String(l)));}finally{this.pendingMutations.delete(n.id);}}async toggleResolve(n,i){this.pendingMutations.add(n.id);let a=Le(i);try{let l=!fA(n.status);await this.client.resolveFeedback(n.id,l),await this.loadFeedbacks();}catch(l){a(),this.bus.emit("feedback:error",l instanceof Error?l:new Error(String(l)));}finally{this.pendingMutations.delete(n.id);}}buildTypeDropdown(){return this.typeOptions=[{value:"all",label:this.t("panel.filterAll"),icon:Ss,color:this.colors.accent,bg:this.colors.accentLight},{value:"question",label:this.t("type.question"),icon:Nr,color:this.colors.typeQuestion,bg:this.colors.typeQuestionBg},{value:"change",label:this.t("type.change"),icon:Pr,color:this.colors.typeChange,bg:this.colors.typeChangeBg},{value:"bug",label:this.t("type.bug"),icon:_r,color:this.colors.typeBug,bg:this.colors.typeBugBg},{value:"other",label:this.t("type.other"),icon:Gr,color:this.colors.typeOther,bg:this.colors.typeOtherBg}],this.typeDropdownContainer=b("div",{class:"sp-filter-dropdown"}),this.typeDropdownBtn=document.createElement("button"),this.typeDropdownBtn.type="button",this.typeDropdownBtn.className="sp-filter-dropdown-btn",this.typeDropdownBtn.setAttribute("aria-haspopup","listbox"),this.typeDropdownBtn.setAttribute("aria-expanded","false"),this.renderTypeDropdownTrigger(),this.typeDropdownBtn.addEventListener("click",n=>{n.stopPropagation(),this.typeDropdownMenu?this.closeTypeDropdown():this.openTypeDropdown();}),this.typeDropdownContainer.appendChild(this.typeDropdownBtn),this.typeDropdownContainer}renderTypeDropdownTrigger(){let n=this.typeOptions.find(B=>this.activeFilters.has(B.value))??this.typeOptions[0];if(!n)return;this.typeDropdownBtn.replaceChildren(),this.typeDropdownBtn.style.setProperty("--sp-chip-color",n.color),this.typeDropdownBtn.style.setProperty("--sp-chip-bg",n.bg),this.typeDropdownBtn.dataset.filter=n.value,this.typeDropdownBtn.classList.toggle("sp-filter-dropdown-btn--filtered",n.value!=="all"),this.typeDropdownBtn.setAttribute("aria-label",`${this.t("type.label")}: ${n.label}`);let i=b("span",{class:"sp-filter-dropdown-btn__icon"});i.appendChild(V(n.icon)),this.typeDropdownBtn.appendChild(i);let a=b("span",{class:"sp-filter-dropdown-btn__label"}),l=b("span",{class:"sp-filter-dropdown-btn__prefix"});E(l,this.t("type.label"));let d=b("span",{class:"sp-filter-dropdown-btn__value"});E(d,n.label),a.appendChild(l),a.appendChild(d),this.typeDropdownBtn.appendChild(a);let p=b("span",{class:"sp-filter-dropdown-btn__chevron"});p.appendChild(V(fa)),this.typeDropdownBtn.appendChild(p);}openTypeDropdown(){this.typeDropdownMenu=b("div",{class:"sp-filter-dropdown-menu"}),this.typeDropdownMenu.setAttribute("role","listbox"),this.typeDropdownMenu.setAttribute("aria-label",this.t("type.label")),this.typeDropdownBtn.setAttribute("aria-expanded","true");for(let n of this.typeOptions){let i=document.createElement("button");i.type="button";let a=this.activeFilters.has(n.value);i.className=`sp-filter-dropdown-option${a?" sp-filter-dropdown-option--active":""}`,i.style.setProperty("--sp-chip-color",n.color),i.style.setProperty("--sp-chip-bg",n.bg),i.dataset.filter=n.value,i.setAttribute("role","option"),i.setAttribute("aria-selected",String(a));let l=b("span",{class:"sp-filter-dropdown-option__icon"});l.appendChild(V(n.icon)),i.appendChild(l);let d=b("span",{class:"sp-filter-dropdown-option__label"});if(E(d,n.label),i.appendChild(d),a){let p=b("span",{class:"sp-filter-dropdown-option__check"});p.appendChild(V(Or)),i.appendChild(p);}i.addEventListener("click",p=>{p.stopPropagation(),this.selectTypeFilter(n.value);}),this.typeDropdownMenu.appendChild(i);}this.typeDropdownContainer.appendChild(this.typeDropdownMenu),requestAnimationFrame(()=>{this.typeDropdownOutsideHandler=n=>{this.typeDropdownMenu&&!this.typeDropdownContainer.contains(n.target)&&this.closeTypeDropdown();},document.addEventListener("click",this.typeDropdownOutsideHandler,!0);}),this.typeDropdownMenu.addEventListener("keydown",n=>{n.key==="Escape"&&(this.closeTypeDropdown(),this.typeDropdownBtn.focus());});}closeTypeDropdown(){this.typeDropdownMenu&&(this.typeDropdownMenu.remove(),this.typeDropdownMenu=null),this.typeDropdownBtn.setAttribute("aria-expanded","false"),this.typeDropdownOutsideHandler&&(document.removeEventListener("click",this.typeDropdownOutsideHandler,!0),this.typeDropdownOutsideHandler=null);}selectTypeFilter(n){this.activeFilters.clear(),this.activeFilters.add(n),this.renderTypeDropdownTrigger(),this.closeTypeDropdown(),this.loadFeedbacks().catch(()=>{});}buildStatusSegmented(){return this.statusSegmented=new Nt({options:[{value:"all",label:this.t("panel.statusAll"),icon:Ss,color:this.colors.accent,bg:this.colors.accentLight},{value:"open",label:this.t("panel.statusOpen"),icon:Ba,color:this.colors.statusOpen,bg:this.colors.statusOpenBg},{value:"resolved",label:this.t("panel.statusResolved"),icon:Or,color:this.colors.statusResolved,bg:this.colors.statusResolvedBg}],value:"all",onChange:()=>{this.loadFeedbacks().catch(()=>{});},ariaLabel:this.t("status.label"),datasetKey:"statusFilter",modifierPrefix:"sp-segmented__btn--"}),this.statusSegmented.element}buildScopeSegmented(){return this.scopeSegmented=new Nt({options:[{value:"this",label:this.t("scope.thisPage")},{value:"template",label:this.t("scope.thisType")},{value:"all",label:this.t("scope.all")}],value:this.initialScopeFilter,onChange:()=>{this.loadFeedbacks().catch(()=>{});},ariaLabel:this.t("scope.label"),datasetKey:"scopeFilter",modifierPrefix:"sp-segmented__btn--scope-",extraClass:"sp-segmented--scope"}),this.syncScopeAvailability(),this.scopeSegmented.element}syncScopeAvailability(){if(!this.scopeSegmented)return;let i=!!this.getScope().urlPattern;this.scopeSegmented.setOptionVisible("template",i),!i&&this.scopeSegmented.value==="template"&&this.scopeSegmented.select("this");}getFocusedFeedback(){let n=Ai(this.listContainer);if(n<0)return;let i=this.listContainer.querySelectorAll(".sp-card")[n];if(i)return this.feedbacks.find(a=>a.id===i.dataset.feedbackId)}scrollToFeedback(n){let i=CSS.escape(n),a=this.listContainer.querySelector(`[data-feedback-id="${i}"]`);a&&(a.scrollIntoView({behavior:"smooth",block:"center"}),a.classList.add("sp-anim-flash"),a.addEventListener("animationend",()=>{a.classList.remove("sp-anim-flash");},{once:!0}));}async refresh(){this.isOpen&&await this.loadFeedbacks();}get isCurrentlyOpen(){return this.isOpen}destroy(){this.loadController?.abort(),this.searchTimeout&&clearTimeout(this.searchTimeout),this.listContainer.removeEventListener("click",this.onListClick),this.listContainer.removeEventListener("keydown",this.onListKeydown),this.listContainer.removeEventListener("mouseover",this.onListMouseover),this.listContainer.removeEventListener("mouseout",this.onListMouseout),document.removeEventListener("sp-marker-click",this.onMarkerClick),this.closeTypeDropdown(),this.sortControls.destroy(),this.bulk.destroy(),this.exportBtn.destroy(),this.shortcuts.destroy(),this.detail.destroy(),this.root.remove();}};});GA();var Wh=new Set(["role","name","aria-label","rel","href"]);function Yh(s,n){let i=Wh.has(s);i||=s.startsWith("data-")&&It(s);let a=It(n)&&n.length<100;return a||=n.startsWith("#")&&It(n.slice(1)),i&&a}function Jh(s){return It(s)}function $h(s){return It(s)}function jh(s){return  true}function sa(s,n){if(s.nodeType!==Node.ELEMENT_NODE)throw new Error("Can't generate CSS selector for non-element node type.");if(s.tagName.toLowerCase()==="html")return "html";let i={root:document.body,idName:Jh,className:$h,tagName:jh,attr:Yh,timeoutMs:1e3,seedMinLength:3,optimizedMinLength:2,maxNumberOfPathChecks:1/0},a=new Date,l={...i,...n},d=eg(l.root,i),p,B=0;for(let y of zh(s,l,d)){if(new Date().getTime()-a.getTime()>l.timeoutMs||B>=l.maxNumberOfPathChecks){let F=qh(s,d);if(!F)throw new Error(`Timeout: Can't find a unique selector after ${l.timeoutMs}ms`);return St(F)}if(B++,Qs(y,d)){p=y;break}}if(!p)throw new Error("Selector was not found.");let w=[...aa(p,s,l,d,a)];return w.sort(vs),w.length>0?St(w[0]):St(p)}function*zh(s,n,i){let a=[],l=[],d=s,p=0;for(;d&&d!==i;){let B=Zh(d,n);for(let w of B)w.level=p;if(a.push(B),d=d.parentElement,p++,l.push(...oa(a)),p>=n.seedMinLength){l.sort(vs);for(let w of l)yield w;l=[];}}l.sort(vs);for(let B of l)yield B;}function It(s){if(/^[a-z\-]{3,}$/i.test(s)){let n=s.split(/-|[A-Z]/);for(let i of n)if(i.length<=2||/[^aeiou]{4,}/i.test(i))return  false;return  true}return  false}function Zh(s,n){let i=[],a=s.getAttribute("id");a&&n.idName(a)&&i.push({name:"#"+CSS.escape(a),penalty:0});for(let p=0;p<s.classList.length;p++){let B=s.classList[p];n.className(B)&&i.push({name:"."+CSS.escape(B),penalty:1});}for(let p=0;p<s.attributes.length;p++){let B=s.attributes[p];n.attr(B.name,B.value)&&i.push({name:`[${CSS.escape(B.name)}="${CSS.escape(B.value)}"]`,penalty:2});}let l=s.tagName.toLowerCase();if(n.tagName(l)){i.push({name:l,penalty:5});let p=ys(s,l);p!==void 0&&i.push({name:ia(l,p),penalty:10});}let d=ys(s);return d!==void 0&&i.push({name:Ag(l,d),penalty:50}),i}function St(s){let n=s[0],i=n.name;for(let a=1;a<s.length;a++){let l=s[a].level||0;n.level===l-1?i=`${s[a].name} > ${i}`:i=`${s[a].name} ${i}`,n=s[a];}return i}function na(s){return s.map(n=>n.penalty).reduce((n,i)=>n+i,0)}function vs(s,n){return na(s)-na(n)}function ys(s,n){let i=s.parentNode;if(!i)return;let a=i.firstChild;if(!a)return;let l=0;for(;a&&(a.nodeType===Node.ELEMENT_NODE&&(n===void 0||a.tagName.toLowerCase()===n)&&l++,a!==s);)a=a.nextSibling;return l}function qh(s,n){let i=0,a=s,l=[];for(;a&&a!==n;){let d=a.tagName.toLowerCase(),p=ys(a,d);if(p===void 0)return;l.push({name:ia(d,p),penalty:NaN,level:i}),a=a.parentElement,i++;}if(Qs(l,n))return l}function Ag(s,n){return s==="html"?"html":`${s}:nth-child(${n})`}function ia(s,n){return s==="html"?"html":`${s}:nth-of-type(${n})`}function*oa(s,n=[]){if(s.length>0)for(let i of s[0])yield*oa(s.slice(1,s.length),n.concat(i));else yield n;}function eg(s,n){return s.nodeType===Node.DOCUMENT_NODE?s:s===n.root?s.ownerDocument:s}function Qs(s,n){let i=St(s);switch(n.querySelectorAll(i).length){case 0:throw new Error(`Can't select any node with this selector: ${i}`);case 1:return  true;default:return  false}}function*aa(s,n,i,a,l){if(s.length>2&&s.length>i.optimizedMinLength)for(let d=1;d<s.length-1;d++){if(new Date().getTime()-l.getTime()>i.timeoutMs)return;let B=[...s];B.splice(d,1),Qs(B,a)&&a.querySelector(St(B))===n&&(yield B,yield*aa(B,n,i,a,l));}}var tg=["role","aria-label","type","name","href","src","data-testid","data-id"];function rg(s){let n=5381;for(let i=0;i<s.length;i++)n=(n<<5)+n+s.charCodeAt(i)|0;return (n>>>0).toString(36)}function Fs(s){let n=s.children.length,i=0,a=s.parentElement;if(a)for(let l of a.children){if(l===s)break;l.tagName===s.tagName&&i++;}return `${n}:${i}:${xs(s)}`}function xs(s){let n=[];for(let i of tg){let a=s.getAttribute(i);a&&n.push(`${i}=${a}`);}return n.length>0?rg(n.join(",")):"0"}function la(s,n){let i=n.split(":");if(i.length!==3)return 0;let[a,l,d]=i,p=Number(a),B=Number(l);if(Number.isNaN(p)||Number.isNaN(B))return 0;let w=Fs(s),[y,C,F]=w.split(":"),Q=0,U=Math.abs(Number(y)-p);U===0?Q+=.2:U<=2?Q+=.1:U<=5&&(Q+=.03);let M=Math.abs(Number(C)-B);return M===0?Q+=.4:M===1?Q+=.2:M<=3&&(Q+=.08),F===d&&(Q+=.4),Q}function qe(s,n){let i=n==="before"?"previousElementSibling":"nextElementSibling",a=s[i],l=3;for(;a&&l>0;){let d=n==="before"?ng(a,256).trim():Ze(a,256).trim();if(d)return n==="before"?d.slice(-32):d.slice(0,32);a=a[i],l--;}return ""}function Kr(s){let n=s.previousElementSibling,i=s.nextElementSibling,a=n?Ze(n,256).trim().slice(0,40):"",l=i?Ze(i,256).trim().slice(0,40):"";return [a,l].filter(Boolean).join(" | ")}function Ze(s,n){let i="";if(s.firstElementChild===null){for(let l of s.childNodes)if(l.nodeType===3&&(i+=l.data,i.length>=n))break;return i.length>n?i.slice(0,n):i}let a=s.ownerDocument.createTreeWalker(s,NodeFilter.SHOW_TEXT);for(;i.length<n;){let l=a.nextNode();if(!l)break;i+=l.data;}return i.length>n?i.slice(0,n):i}function ng(s,n){let i="",a=l=>{for(let d=l.lastChild;d;d=d.previousSibling)if(d.nodeType===3){if(i=d.data+i,i.length>=n)return  true}else if(d.nodeType===1&&a(d))return  true;return  false};return a(s),i.length>n?i.slice(-n):i}function ca(s){if(s.id){let a=s.id.includes("'")?`concat('${s.id.replace(/'/g,`',"'",'`)}')`:`'${s.id}'`;return `//${s.localName}[@id=${a}]`}let n=[],i=s;for(;i&&i!==document.body&&n.length<6;){let a=i.localName,l=i.parentElement;if(i.id){let p=i.id.includes("'")?`concat('${i.id.replace(/'/g,`',"'",'`)}')`:`'${i.id}'`;return n.unshift(`/${a}[@id=${p}]`),"/"+n.join("")}let d=1;if(l)for(let p of l.children){if(p===i)break;p.localName===a&&d++;}n.unshift(`/${a}[${d}]`),i=l;}return "/html/body"+n.join("")}var Lt="data-feedback-anchor";function Es(s){let n=sa(s,{className:F=>!/^(css|sc|emotion|styled)-/.test(F)&&!/^[a-z]{1,3}[A-Za-z0-9]{4,8}$/.test(F),attr:F=>["data-testid","data-id","role","aria-label"].includes(F),idName:F=>!F.startsWith("radix-")&&!/^:r[0-9]+:$/.test(F),seedMinLength:3,optimizedMinLength:2}),i=ca(s),l=(s.textContent?.trim()??"").slice(0,120),d=qe(s,"before"),p=qe(s,"after"),B=Fs(s),w=Kr(s),C=s.closest(`[${Lt}]`)?.getAttribute(Lt)??null;return {cssSelector:n,xpath:i,textSnippet:l,textPrefix:d,textSuffix:p,fingerprint:B,neighborText:w,elementTag:s.tagName,elementId:s.id||void 0,anchorKey:C}}function da(s,n){let i=s.getBoundingClientRect();return i.left<=n.x&&i.top<=n.y&&i.right>=n.x+n.width&&i.bottom>=n.y+n.height}function pa(s,n=document.documentElement){let i=s.x+s.width/2,a=s.y+s.height/2,l=document.elementFromPoint(i,a);if(!l||l===n)return document.body;let d=l;for(;d&&d!==document.body;){if(d.hasAttribute(Lt)&&da(d,s))return d;d=d.parentElement;}for(d=l;d&&d!==document.body;){if(da(d,s))return d;d=d.parentElement;}return document.body}function ua(s,n){return n.width<=0||n.height<=0?{xPct:0,yPct:0,wPct:1,hPct:1}:{xPct:(s.x-n.x)/n.width,yPct:(s.y-n.y)/n.height,wPct:s.width/n.width,hPct:s.height/n.height}}IA();function Us(s){return s.tagName==="SITEPING-WIDGET"||s.closest("siteping-widget")!==null||s.closest('[data-siteping-ignore="true"]')!==null||s.closest("#siteping-markers")!==null||s.closest("#sp-tooltip")!==null}function ha(s){let n=null,i=a=>{let l=a.target;l instanceof HTMLElement&&(l===document.body||l===document.documentElement||l===s||Us(l)||(n=l));};return document.addEventListener("focusin",i),{getLastPageFocus(){return n&&!n.isConnected&&(n=null),n},destroy(){document.removeEventListener("focusin",i),n=null;}}}IA();Vr();we();var dg={question:"type.question",change:"type.change",bug:"type.bug",other:"type.other"};function pg(){let s=navigator.userAgentData;return s?s.platform==="macOS":navigator.platform?.includes("Mac")??/Macintosh|Mac OS X/i.test(navigator.userAgent)}var Xr=class{constructor(n,i){this.colors=n;this.t=i;this.root=b("div",{style:`
        position:fixed;
        z-index:${2147483647};
        width:300px;
        padding:16px;
        border-radius:16px;
        background:${this.colors.glassBg};
        backdrop-filter:blur(24px);
        -webkit-backdrop-filter:blur(24px);
        border:1px solid ${this.colors.glassBorder};
        box-shadow:0 8px 32px ${this.colors.shadow}, 0 2px 8px ${this.colors.shadow};
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        opacity:0;
        transform:translateY(8px) scale(0.98);
        transition:opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display:none;
        -webkit-font-smoothing:antialiased;
      `}),this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("data-siteping-ignore","true");let a=[{type:"question",icon:Nr},{type:"change",icon:Pr},{type:"bug",icon:_r},{type:"other",icon:Gr}];this.typeRow=b("div",{style:"display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;"});for(let d of a){let p=document.createElement("button");p.style.cssText=`
        height:44px;
        border-radius:9999px;border:1px solid ${this.colors.border};
        background:${this.colors.glassBg};cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:5px;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        font-size:13px;font-weight:500;color:${this.colors.textTertiary};
        transition:all 0.2s ease;
        padding:0 12px;
      `;let B=V(d.icon);B.setAttribute("style","width:13px;height:13px;flex-shrink:0;"),p.appendChild(B),p.appendChild(document.createElement("span")),p.dataset.type=d.type,p.setAttribute("aria-pressed","false"),p.addEventListener("click",()=>{this.submittingState||this.selectType(d.type,this.typeRow);}),p.addEventListener("mouseenter",()=>{if(!this.submittingState&&p.dataset.type!==this.selectedType){let w=re(p.dataset.type??"",this.colors);p.style.background=w,p.style.borderColor=DA(p.dataset.type??"",this.colors)+"40";}}),p.addEventListener("mouseleave",()=>{this.submittingState||p.dataset.type!==this.selectedType&&(p.style.background=this.colors.glassBg,p.style.borderColor=this.colors.border);}),this.typeRow.appendChild(p);}this.textarea=document.createElement("textarea"),this.textarea.style.cssText=`
      width:100%;min-height:72px;max-height:152px;
      padding:10px 12px;border-radius:12px;
      border:1px solid ${this.colors.border};
      background:${this.colors.glassBgHeavy};
      color:${this.colors.text};font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;line-height:1.5;resize:vertical;
      outline:none;transition:all 0.2s ease;
      box-sizing:border-box;
    `,this.textarea.maxLength=5e3,this.hint=b("div",{style:`
        font-size:11px;color:${this.colors.textTertiary};
        text-align:right;margin-top:4px;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        letter-spacing:0.01em;
      `}),this.textarea.addEventListener("focus",()=>{this.submittingState||(this.textarea.style.borderColor=this.colors.accent,this.textarea.style.boxShadow=`0 0 0 3px ${this.colors.accent}14`,this.textarea.style.background=this.colors.bg);}),this.textarea.addEventListener("blur",()=>{this.submittingState||(this.textarea.style.borderColor=this.colors.border,this.textarea.style.boxShadow="none",this.textarea.style.background=this.colors.glassBgHeavy);}),this.textarea.addEventListener("input",()=>{this.updateSubmitState();}),this.textarea.addEventListener("keydown",d=>{this.submittingState||(d.key==="Enter"&&(d.ctrlKey||d.metaKey)&&(d.preventDefault(),this.submit()),d.key==="Escape"&&this.cancel());});let l=b("div",{style:"display:flex;justify-content:flex-end;gap:8px;margin-top:12px;"});this.cancelBtn=document.createElement("button"),this.cancelBtn.style.cssText=`
      height:34px;padding:0 16px;border-radius:9999px;
      border:1px solid ${this.colors.border};
      background:${this.colors.glassBg};
      color:${this.colors.textTertiary};font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;font-weight:500;cursor:pointer;
      transition:all 0.2s ease;
    `,this.cancelBtn.addEventListener("click",()=>this.cancel()),this.cancelBtn.addEventListener("mouseenter",()=>{this.submittingState||(this.cancelBtn.style.borderColor=this.colors.accent,this.cancelBtn.style.color=this.colors.accent);}),this.cancelBtn.addEventListener("mouseleave",()=>{this.submittingState||(this.cancelBtn.style.borderColor=this.colors.border,this.cancelBtn.style.color=this.colors.textTertiary);}),this.submitBtn=document.createElement("button"),this.submitBtn.style.cssText=`
      height:34px;padding:0 18px;border-radius:9999px;
      border:none;background:${this.colors.accentGradient};
      color:#fff;font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;font-weight:600;cursor:pointer;
      opacity:0.35;pointer-events:none;
      transition:all 0.2s ease;
      box-shadow:0 2px 8px ${this.colors.accentGlow};
      display:inline-flex;align-items:center;justify-content:center;min-width:64px;
    `,this.submitLabel=document.createElement("span"),this.submitBtn.appendChild(this.submitLabel),this.submitBtn.addEventListener("click",()=>this.submit()),l.appendChild(this.cancelBtn),l.appendChild(this.submitBtn),this.root.appendChild(this.typeRow),this.root.appendChild(this.textarea),this.root.appendChild(this.hint),this.root.appendChild(l),document.body.appendChild(this.root),this.applyLabels();}colors;t;root;selectedType=null;textarea;submitBtn;cancelBtn;typeRow;submitLabel;hint;resolve=null;previouslyFocused=null;onKeydownTrap=null;onSubmit=null;submittingState=false;spinnerAnimation=null;get isOpen(){return this.resolve!==null}refreshLabels(){this.applyLabels();}applyLabels(){this.root.setAttribute("aria-label",this.t("popup.ariaLabel"));let n=this.root.querySelectorAll("button[data-type]");for(let i of n){let a=i.dataset.type;if(!a)continue;let l=dg[a];if(!l)continue;let d=i.querySelector("span");d&&E(d,this.t(l));}this.textarea.placeholder=this.t("popup.placeholder"),this.textarea.setAttribute("aria-label",this.t("popup.textareaAria")),E(this.hint,pg()?this.t("popup.submitHintMac"):this.t("popup.submitHintOther")),E(this.cancelBtn,this.t("popup.cancel")),E(this.submitLabel,this.t("popup.submit"));}show(n,i){return new Promise(a=>{this.resolve=a,this.onSubmit=i??null,this.selectedType=null,this.textarea.value="",this.submittingState=false,this.updateSubmitState(),this.resetTypeButtons(),this.previouslyFocused=document.activeElement;let l=220,d=300,p=n.bottom+8,B=n.left;if(p+l>window.innerHeight){let y=n.top-l-8;y>=8?p=y:p=window.innerHeight-l-8;}B+d>window.innerWidth&&(B=n.right-d),B=Math.max(8,B),p=Math.max(8,p),this.root.style.top=`${p}px`,this.root.style.left=`${B}px`,this.root.style.display="block",this.onKeydownTrap=y=>{if(y.key==="Tab"){let C=Array.from(this.root.querySelectorAll('button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'));if(C.length===0)return;let F=C[0],Q=C[C.length-1];if(!F||!Q)return;y.shiftKey?(document.activeElement===F||!this.root.contains(document.activeElement))&&(y.preventDefault(),Q.focus()):(document.activeElement===Q||!this.root.contains(document.activeElement))&&(y.preventDefault(),F.focus());}},this.root.addEventListener("keydown",this.onKeydownTrap);let w=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;this.root.style.transition=w?"none":"",requestAnimationFrame(()=>{this.root.style.opacity="1",this.root.style.transform="translateY(0) scale(1)",this.textarea.focus();});})}selectType(n,i){this.selectedType=n;let a=i.querySelectorAll("button");for(let l of a){let d=l.dataset.type===n,p=DA(l.dataset.type??"",this.colors),B=re(l.dataset.type??"",this.colors);l.style.background=d?B:this.colors.glassBg,l.style.borderColor=d?p+"60":this.colors.border,l.style.color=d?p:this.colors.textTertiary,l.style.fontWeight=d?"600":"500",l.setAttribute("aria-pressed",String(d));}this.updateSubmitState();}resetTypeButtons(){let n=this.root.querySelectorAll("button[data-type]");for(let i of n)i.setAttribute("aria-pressed","false"),i.disabled=false,i.style.background=this.colors.glassBg,i.style.borderColor=this.colors.border,i.style.color=this.colors.textTertiary,i.style.fontWeight="500",i.style.cursor="pointer";}updateSubmitState(){if(this.submittingState)return;let n=this.selectedType!==null&&this.textarea.value.trim().length>0;this.submitBtn.disabled=!n,this.submitBtn.style.opacity=n?"1":"0.35",this.submitBtn.style.pointerEvents=n?"auto":"none";}submit(){if(this.submittingState||!this.selectedType||!this.textarea.value.trim())return;let n={type:this.selectedType,message:this.textarea.value.trim()};if(!this.onSubmit){this.resolve?.(n),this.resolve=null,this.hideElement();return}this.enterSubmittingState();let i=this.onSubmit;i(n).then(()=>{this.resolve?.(n),this.resolve=null,this.hideElement();}).catch(()=>{this.exitSubmittingState();});}cancel(){this.submittingState||(this.resolve?.(null),this.resolve=null,this.hideElement());}enterSubmittingState(){this.submittingState=true,this.submitLabel.style.display="none",this.submitBtn.disabled=true,this.submitBtn.style.cursor="wait",this.submitBtn.style.opacity="0.85",this.submitBtn.setAttribute("aria-busy","true"),this.submitBtn.appendChild(this.buildSpinner()),this.cancelBtn.disabled=true,this.cancelBtn.style.opacity="0.5",this.cancelBtn.style.cursor="not-allowed",this.cancelBtn.style.pointerEvents="none",this.textarea.disabled=true,this.textarea.style.opacity="0.6";let n=this.typeRow.querySelectorAll("button");for(let i of n)i.disabled=true,i.style.cursor="not-allowed",i.style.opacity="0.6";}exitSubmittingState(){this.submittingState=false,this.spinnerAnimation?.cancel(),this.spinnerAnimation=null,this.submitBtn.querySelector('[data-role="sp-popup-spinner"]')?.remove(),this.submitLabel.style.display="",this.submitBtn.removeAttribute("aria-busy"),this.submitBtn.style.cursor="pointer",this.cancelBtn.disabled=false,this.cancelBtn.style.opacity="1",this.cancelBtn.style.cursor="pointer",this.cancelBtn.style.pointerEvents="auto",this.textarea.disabled=false,this.textarea.style.opacity="1";let i=this.typeRow.querySelectorAll("button");for(let a of i)a.disabled=false,a.style.cursor="pointer",a.style.opacity="1";this.updateSubmitState();}buildSpinner(){let n=document.createElement("div");return n.dataset.role="sp-popup-spinner",n.style.cssText=`
      width:14px;height:14px;
      border:2px solid rgba(255,255,255,0.35);
      border-top-color:#fff;
      border-radius:50%;
      box-sizing:border-box;
    `,!(typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)&&typeof n.animate=="function"&&(this.spinnerAnimation=n.animate([{transform:"rotate(0deg)"},{transform:"rotate(360deg)"}],{duration:600,iterations:1/0,easing:"linear"})),n}hideElement(){this.onKeydownTrap&&(this.root.removeEventListener("keydown",this.onKeydownTrap),this.onKeydownTrap=null),this.submittingState&&this.exitSubmittingState(),this.onSubmit=null,this.root.style.opacity="0",this.root.style.transform="translateY(8px) scale(0.98)",this.previouslyFocused?.focus(),this.previouslyFocused=null,setTimeout(()=>{this.root.style.display="none";},250);}destroy(){this.submittingState&&this.exitSubmittingState(),this.resolve?.(null),this.resolve=null,this.onSubmit=null,this.onKeydownTrap&&(this.root.removeEventListener("keydown",this.onKeydownTrap),this.onKeydownTrap=null),this.root.remove();}};var Tt,Ua=false;async function ug(){if(Tt!==void 0)return Tt;try{let s=await Promise.resolve().then(()=>Xh(Ea(),1));return Tt=s.default??s,Tt}catch(s){return Tt=null,Ua||(Ua=true,console.warn("[siteping] html2canvas import failed unexpectedly. Capture is disabled for this session \u2014 feedbacks are still submitted, just without screenshots. Underlying error:",s)),null}}function Ks(s,n,i){return Math.min(i,Math.max(s,n))}function Wr(s){return Ks(0,Math.round(s*1e4)/1e4,1)}async function Ha(s,n){let i=await ug();if(!i)return null;let a=.85,l=1200,d=Ks(48,s.width*.6,280),p=Ks(48,s.height*.6,220),B=window.scrollX+s.x,w=window.scrollY+s.y,y=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),C=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),F=Math.max(0,B-d),Q=Math.max(0,w-p),U=Math.min(y,B+s.width+d)-F,M=Math.min(C,w+s.height+p)-Q;if(U<=0||M<=0)return null;let G={xPct:Wr((B-F)/U),yPct:Wr((w-Q)/M),wPct:Wr(s.width/U),hPct:Wr(s.height/M)};try{let R=await i(document.body,{x:F,y:Q,width:U,height:M,scale:window.devicePixelRatio,useCORS:!0,allowTaint:!0,logging:!1,ignoreElements:z=>z.tagName==="SITEPING-WIDGET"||z.closest?.("siteping-widget")!==null||z.getAttribute?.("data-siteping-ignore")==="true"});if(R.width<=l)return {dataUrl:R.toDataURL("image/jpeg",a),region:G};let j=l/R.width,k=l,O=Math.round(R.height*j),X=document.createElement("canvas");X.width=k,X.height=O;let _=X.getContext("2d");return _?(_.drawImage(R,0,0,k,O),{dataUrl:X.toDataURL("image/jpeg",a),region:G}):null}catch(R){return console.warn("[siteping] Screenshot capture failed:",R),null}}var Yr=class{constructor(n,i,a,l=false,d){this.colors=n;this.bus=i;this.t=a;this.enableScreenshot=l;this.getFallbackTarget=d;this.popup=new Xr(n,a),this.bus.on("annotation:start",()=>this.activate());}colors;bus;t;enableScreenshot;getFallbackTarget;overlay=null;toolbar=null;drawingRect=null;startX=0;startY=0;isDrawing=false;isActive=false;instantMode=false;popup;savedOverflow="";preActiveFocusElement=null;keyboardTarget=null;rafId=null;pendingMoveEvent=null;rejectPendingSubmission=null;get isBusy(){return this.isActive}refreshLabels(){this.popup.refreshLabels();}async maybeCapture(n){return this.enableScreenshot?Ha(n):null}activate(){if(this.isActive)return;this.isActive=true;let n=!this.instantMode;this.preActiveFocusElement=document.activeElement;let i=document.activeElement;if(this.keyboardTarget=i instanceof HTMLElement&&i!==document.body&&i!==document.documentElement&&!Us(i)?i:this.getFallbackTarget?.()??null,this.savedOverflow=document.body.style.overflow,document.body.style.overflow="hidden",this.overlay=b("div",{style:`
        position:fixed;inset:0;
        z-index:${2147483646};
        background:rgba(15, 23, 42, 0.04);
        cursor:${n?"crosshair":"default"};
      `}),this.overlay.setAttribute("role","application"),this.overlay.setAttribute("aria-label",n?this.t("annotator.instruction"):this.t("annotator.instantInstruction")),this.overlay.setAttribute("data-siteping-ignore","true"),n){this.toolbar=b("div",{style:`
          position:fixed;top:0;left:0;right:0;
          z-index:${2147483647};
          height:52px;
          background:${this.colors.glassBg};
          backdrop-filter:blur(24px);
          -webkit-backdrop-filter:blur(24px);
          border-bottom:1px solid ${this.colors.glassBorder};
          display:flex;align-items:center;justify-content:center;gap:16px;
          font-family:"Inter",system-ui,-apple-system,sans-serif;
          font-size:14px;color:${this.colors.text};
          box-shadow:0 4px 16px ${this.colors.shadow};
          -webkit-font-smoothing:antialiased;
        `}),this.toolbar.setAttribute("data-siteping-ignore","true");let a=b("span",{style:`
          width:8px;height:8px;border-radius:50%;
          background:${this.colors.accent};
          box-shadow:0 0 8px ${this.colors.accentGlow};
          animation:pulse 1.5s ease-in-out infinite;
        `}),l=document.createElement("style");l.textContent=["@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}","@media(prefers-reduced-motion:reduce){@keyframes pulse{from,to{opacity:1}}}"].join(""),this.toolbar.appendChild(l);let d=b("span",{style:"font-weight:500;letter-spacing:-0.01em;"});E(d,this.t("annotator.instruction"));let p=document.createElement("button");p.style.cssText=`
        height:34px;padding:0 18px;border-radius:9999px;
        border:1px solid ${this.colors.border};
        background:${this.colors.glassBg};
        color:${this.colors.textTertiary};font-family:"Inter",system-ui,-apple-system,sans-serif;
        font-size:13px;font-weight:500;cursor:pointer;
        transition:all 0.2s ease;
      `,E(p,this.t("annotator.cancel")),p.addEventListener("click",()=>this.deactivate()),p.addEventListener("mouseenter",()=>{p.style.borderColor=this.colors.typeBug,p.style.color=this.colors.typeBug,p.style.background=this.colors.typeBugBg;}),p.addEventListener("mouseleave",()=>{p.style.borderColor=this.colors.border,p.style.color=this.colors.textTertiary,p.style.background=this.colors.glassBg;}),this.toolbar.appendChild(a),this.toolbar.appendChild(d),this.toolbar.appendChild(p);}n&&(this.overlay.addEventListener("mousedown",this.onMouseDown),this.overlay.addEventListener("mousemove",this.onMouseMove),this.overlay.addEventListener("mouseup",this.onMouseUp),this.overlay.addEventListener("touchstart",this.onTouchStart,{passive:false}),this.overlay.addEventListener("touchmove",this.onTouchMove,{passive:false}),this.overlay.addEventListener("touchend",this.onTouchEnd),this.overlay.addEventListener("keydown",this.onOverlayKeyDown)),this.overlay.setAttribute("tabindex","0"),document.addEventListener("keydown",this.onKeyDown),document.body.appendChild(this.overlay),this.toolbar&&document.body.appendChild(this.toolbar),this.overlay.focus({preventScroll:true});}deactivate(){if(!this.isActive)return;this.isActive=false,this.isDrawing=false,this.instantMode=false;let n=this.preActiveFocusElement;this.preActiveFocusElement=null,this.keyboardTarget=null,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.pendingMoveEvent=null,document.body.style.overflow=this.savedOverflow,document.removeEventListener("keydown",this.onKeyDown),this.overlay?.remove(),this.toolbar?.remove(),this.drawingRect?.remove(),this.overlay=null,this.toolbar=null,this.drawingRect=null,n instanceof HTMLElement&&n.isConnected&&n.focus({preventScroll:true}),this.bus.emit("annotation:end");}onKeyDown=n=>{n.key==="Escape"&&this.deactivate();};onOverlayKeyDown=async n=>{if(n.key!=="Enter"||(n.preventDefault(),this.popup.isOpen)||this.isDrawing)return;let i=this.keyboardTarget;if(!i||!(i instanceof HTMLElement))return;let a=i.getBoundingClientRect();if(a.width<=0||a.height<=0)return;let l=new DOMRect(a.x,a.y,a.width,a.height);this.drawingRect?.remove();let d=this.createDrawingRect();d.style.left=`${a.x}px`,d.style.top=`${a.y}px`,d.style.width=`${a.width}px`,d.style.height=`${a.height}px`,this.drawingRect=d,this.overlay?.appendChild(d);let B={anchor:Es(i),rect:{xPct:0,yPct:0,wPct:1,hPct:1},scrollX:window.scrollX,scrollY:window.scrollY,viewportW:window.innerWidth,viewportH:window.innerHeight,devicePixelRatio:window.devicePixelRatio},w={},y=await this.popup.show(l,C=>this.runSubmission(B,C,l,w));this.drawingRect?.remove(),this.drawingRect=null,y&&this.deactivate();};onMouseDown=n=>{this.startDrawing(n.clientX,n.clientY);};onTouchStart=n=>{n.preventDefault();let i=n.touches[0];i&&this.startDrawing(i.clientX,i.clientY);};startDrawing(n,i){this.popup.isOpen||(this.isDrawing=true,this.startX=n,this.startY=i,this.drawingRect?.remove(),this.drawingRect=this.createDrawingRect(),this.overlay?.appendChild(this.drawingRect));}createDrawingRect(){let n=b("div",{style:`
        position:fixed;
        border:2px solid ${this.colors.accent};
        background:${this.colors.accent}12;
        pointer-events:none;
        border-radius:8px;
        box-shadow:0 0 16px ${this.colors.accentGlow};
        transition:box-shadow 0.15s ease;
      `});return n.setAttribute("data-siteping-ignore","true"),n}onMouseMove=n=>{this.scheduleRectUpdate(n);};onTouchMove=n=>{n.preventDefault(),n.touches[0]&&this.scheduleRectUpdate(n.touches[0]);};scheduleRectUpdate(n){!this.isDrawing||!this.drawingRect||(this.pendingMoveEvent=n,this.rafId===null&&(this.rafId=requestAnimationFrame(()=>{this.rafId=null;let i=this.pendingMoveEvent;if(!i||!this.drawingRect)return;let a=Math.min(i.clientX,this.startX),l=Math.min(i.clientY,this.startY),d=Math.abs(i.clientX-this.startX),p=Math.abs(i.clientY-this.startY);this.drawingRect.style.left=`${a}px`,this.drawingRect.style.top=`${l}px`,this.drawingRect.style.width=`${d}px`,this.drawingRect.style.height=`${p}px`;})));}onTouchEnd=async n=>{let i=n.changedTouches[0];i&&await this.finishDrawing(i.clientX,i.clientY);};onMouseUp=async n=>{await this.finishDrawing(n.clientX,n.clientY);};finishDrawing=async(n,i)=>{if(!this.isDrawing||!this.drawingRect)return;this.isDrawing=false;let a=Math.min(n,this.startX),l=Math.min(i,this.startY),d=Math.abs(n-this.startX),p=Math.abs(i-this.startY);if(d<10||p<10){this.drawingRect.remove(),this.drawingRect=null;return}let B=new DOMRect(a,l,d,p),{annotation:w}=this.buildAnnotation(B),y={},C=await this.popup.show(B,F=>this.runSubmission(w,F,B,y));this.drawingRect?.remove(),this.drawingRect=null,C&&this.deactivate();};async startInstantAnnotation(n,i){if(this.isActive)return;this.instantMode=true,this.bus.emit("annotation:start");let a=Math.max(0,Math.min(n-20/2,window.innerWidth-20)),l=Math.max(0,Math.min(i-20/2,window.innerHeight-20)),d=new DOMRect(a,l,20,20),{annotation:p,anchorBounds:B}=this.buildAnnotation(d),w=Math.max(0,B.left),y=Math.max(0,B.top),C=new DOMRect(w,y,Math.max(0,Math.min(B.right,window.innerWidth)-w),Math.max(0,Math.min(B.bottom,window.innerHeight)-y));this.drawingRect?.remove(),this.drawingRect=b("div",{style:`
        position:fixed;
        left:${a}px;
        top:${l}px;
        width:${20}px;
        height:${20}px;
        border:2px solid ${this.colors.accent};
        background:${this.colors.accent}12;
        pointer-events:none;
        border-radius:8px;
        box-shadow:0 0 16px ${this.colors.accentGlow};
      `}),this.drawingRect.setAttribute("data-siteping-ignore","true"),this.overlay?.appendChild(this.drawingRect);let F={};await this.popup.show(d,Q=>this.runSubmission(p,Q,C,F)),this.drawingRect?.remove(),this.drawingRect=null,this.deactivate();}async runSubmission(n,i,a,l){l.value===void 0&&(l.value=await this.maybeCapture(a));let d=l.value;await new Promise((p,B)=>{let w=()=>{y(),C(),F(),this.rejectPendingSubmission=null;},y=this.bus.on("feedback:sent",()=>{w(),p();}),C=this.bus.on("feedback:error",Q=>{w(),B(Q);}),F=this.bus.on("submission:cancelled",()=>{w(),B(new Error("Feedback submission cancelled"));});this.rejectPendingSubmission=Q=>{w(),B(Q);},this.bus.emit("annotation:complete",{annotation:n,type:i.type,message:i.message,screenshotDataUrl:d?.dataUrl??null,screenshotRegion:d?.region??null});});}buildAnnotation(n){this.overlay&&(this.overlay.style.pointerEvents="none");let i=pa(n);this.overlay&&(this.overlay.style.pointerEvents="auto");let a=Es(i),l=i.getBoundingClientRect(),d=ua(n,l);return {annotation:{anchor:a,rect:d,scrollX:window.scrollX,scrollY:window.scrollY,viewportW:window.innerWidth,viewportH:window.innerHeight,devicePixelRatio:window.devicePixelRatio},anchorBounds:l}}destroy(){this.deactivate(),this.rejectPendingSubmission?.(new Error("Annotator destroyed during submission")),this.popup.destroy();}};GA();async function At(s,n){let i={};n&&(i["Content-Type"]="application/json"),s.apiKey&&(i.Authorization=`Bearer ${s.apiKey}`);let a=typeof s.headers=="function"?await s.headers():s.headers;return a&&Object.assign(i,a),i}var hg=3,gg=1e4,Jr="siteping_retry_queue",Bg=20;async function Dt(s,n,i=hg){for(let a=0;a<=i;a++){let l=new AbortController,d=setTimeout(()=>l.abort(),gg);try{let w=await fetch(s,{...n,signal:l.signal});if(clearTimeout(d),w.ok||w.status>=400&&w.status<500||a===i)return w}catch(w){if(clearTimeout(d),a===i)throw w}let p=1e3*2**a,B=Math.random()*1e3-500;await new Promise(w=>setTimeout(w,p+B));}throw new Error("Max retries exceeded")}function fg(s){return s instanceof fe||s instanceof $A&&s.code==="SERVER"}function wg(s){return s>=500}var mg="siteping_retry_queue";async function Sa(s){return typeof navigator<"u"&&navigator.locks?navigator.locks.request(mg,()=>s()):s()}function bg(s){return ke(s,"endpoint")&&typeof s.endpoint=="string"&&ke(s,"payload")&&typeof s.payload=="object"&&s.payload!==null}function La(){let s=localStorage.getItem(Jr);if(!s)return [];let n=JSON.parse(s);return Array.isArray(n)?n.filter(bg):[]}function Cg(s,n){Sa(()=>{try{let i=La();i.length>=Bg&&i.shift(),i.push({endpoint:s,payload:n}),localStorage.setItem(Jr,JSON.stringify(i));}catch{}});}function ka(s){return s.trim()}function Ia(s){return s.trim().toLowerCase()}async function Ta(s,n,i={}){await Sa(async()=>{try{let a=La();if(a.length===0)return;let l=[],d=[],p=0;for(let C of a){if(C.endpoint!==s){d.push(C);continue}!n||ka(C.payload.authorName)===ka(n.name)&&Ia(C.payload.authorEmail)===Ia(n.email)?l.push(C):p+=1;}if(l.length===0&&p===0)return;p>0;let B=[],w=0;if(l.length>0){let C=await At(i,!0);for(let F of l)try{let Q=await fetch(s,{method:"POST",headers:C,body:JSON.stringify(F.payload)});if(Q.ok)continue;wg(Q.status)?B.push(F):w+=1;}catch{B.push(F);}}w>0&&console.warn(`[siteping] flushRetryQueue: dropped ${w} queued feedback(s) the server rejected (4xx) \u2014 they would fail identically on every replay`);let y=d.concat(B);y.length>0?localStorage.setItem(Jr,JSON.stringify(y)):localStorage.removeItem(Jr);}catch{}});}async function Ms(s){return await s.json()}var $r=class{constructor(n,i,a={}){this.endpoint=n;this.projectName=i;this.auth=a;}endpoint;projectName;auth;async sendFeedback(n){let{screenshotRegion:i,...a}=n,l=i?{...a,screenshotRegion:i}:a;try{let d;try{d=await Dt(this.endpoint,{method:"POST",headers:await At(this.auth,!0),body:JSON.stringify(l)});}catch(p){throw Se(p,"Failed to send feedback")}if(!d.ok)throw await Ie(d,"Failed to send feedback");return Ms(d)}catch(d){throw fg(d)&&Cg(this.endpoint,l),d}}async getFeedbacks(n,i){let a=Cs({projectName:n,...i}),l;try{let d=await At(this.auth,!1);l=await Dt(`${this.endpoint}?${a.toString()}`,{method:"GET",cache:"no-store",...Object.keys(d).length>0?{headers:d}:{}});}catch(d){throw Se(d,"Failed to fetch feedbacks")}if(!l.ok)throw await Ie(l,"Failed to fetch feedbacks");return Ms(l)}async resolveFeedback(n,i){let a;try{a=await Dt(this.endpoint,{method:"PATCH",headers:await At(this.auth,!0),body:JSON.stringify({id:n,projectName:this.projectName,status:i?"resolved":"open"})});}catch(l){throw Se(l,"Failed to update feedback")}if(!a.ok)throw await Ie(a,"Failed to update feedback");return Ms(a)}async deleteFeedback(n){let i;try{i=await Dt(this.endpoint,{method:"DELETE",headers:await At(this.auth,!0),body:JSON.stringify({id:n,projectName:this.projectName})});}catch(a){throw Se(a,"Failed to delete feedback")}if(!i.ok)throw await Ie(i,"Failed to delete feedback")}async deleteAllFeedbacks(n){let i;try{i=await Dt(this.endpoint,{method:"DELETE",headers:await At(this.auth,!0),body:JSON.stringify({projectName:n,deleteAll:!0})});}catch(a){throw Se(a,"Failed to delete all feedbacks")}if(!i.ok)throw await Ie(i,"Failed to delete all feedbacks")}};var vg=["log","info","warn","error"];function yg(s){if(s===null)return "null";if(s===void 0)return "undefined";if(typeof s=="string")return s;if(typeof s=="number"||typeof s=="boolean"||typeof s=="bigint")return String(s);if(s instanceof Error)return `${s.name}: ${s.message}${s.stack?`
${s.stack}`:""}`;try{let n=new WeakSet;return JSON.stringify(s,(i,a)=>{if(typeof a=="function")return "[Function]";if(typeof a=="symbol")return a.toString();if(typeof a=="object"&&a!==null){if(n.has(a))return "[Circular]";n.add(a);}return a})}catch{try{return String(s)}catch{return "[Unserializable]"}}}function Qg(s){let n="";for(let i=0;i<s.length&&(i>0&&(n+=" "),n+=yg(s[i]),!(n.length>=500));i++);return n.length>500&&(n=`${n.slice(0,499)}\u2026`),n}var jr=class{maxEntries;entries=[];originals=new Map;wrappers=new Map;disposed=false;constructor(n=50){if(this.maxEntries=Math.min(Math.max(Math.floor(n),0),1e3),!(typeof console>"u"))for(let i of vg){let a=console[i];if(typeof a!="function")continue;this.originals.set(i,a);let l=this,d=function(...p){try{l.push(i,p);}catch{}a.apply(this??console,p);};try{Object.defineProperty(d,"name",{value:i});}catch{}this.wrappers.set(i,d),console[i]=d;}}push(n,i){this.maxEntries!==0&&(this.entries.length>=this.maxEntries&&this.entries.shift(),this.entries.push({level:n,timestamp:new Date().toISOString(),message:Qg(i)}));}getEntries(){return this.entries.slice()}dispose(){if(this.disposed||(this.disposed=true,typeof console>"u"))return;let n=console;for(let[i,a]of this.originals)if(n[i]===this.wrappers.get(i))try{n[i]=a;}catch{}this.originals.clear(),this.wrappers.clear();}};function Da(s){return s.length<=2e3?s:`${s.slice(0,1999)}\u2026`}function Ka(s){if(typeof s=="string")return s;if(s instanceof URL)return s.href;if(typeof s=="object"&&s!==null&&"url"in s){let n=s.url;if(typeof n=="string")return n}try{return String(s)}catch{return "(unknown)"}}var zr=class{maxEntries;entries=[];originalFetch=null;originalXhrOpen=null;originalXhrSend=null;wrappedFetch=null;wrappedXhrOpen=null;wrappedXhrSend=null;disposed=false;constructor(n=20){this.maxEntries=Math.min(Math.max(Math.floor(n),0),500),this.installFetch(),this.installXhr();}push(n){this.maxEntries!==0&&(this.entries.length>=this.maxEntries&&this.entries.shift(),this.entries.push(n));}installFetch(){if(typeof globalThis.fetch!="function")return;let n=globalThis.fetch;this.originalFetch=n;let i=async(a,l)=>{let d=new Date,p=typeof performance<"u"?performance.now():Date.now(),B=Da(Ka(a)),w=(l?.method??(a instanceof Request?a.method:"GET")).toUpperCase();try{let y=await n(a,l);if(!y.ok){let C=typeof performance<"u"?performance.now():Date.now();this.push({url:B,method:w,status:y.status,durationMs:Math.round(C-p),timestamp:d.toISOString()});}return y}catch(y){let C=typeof performance<"u"?performance.now():Date.now();throw this.push({url:B,method:w,status:0,durationMs:Math.round(C-p),timestamp:d.toISOString()}),y}};this.wrappedFetch=i,globalThis.fetch=i;}installXhr(){if(typeof XMLHttpRequest>"u")return;let n=XMLHttpRequest.prototype,i=n.open,a=n.send;this.originalXhrOpen=i,this.originalXhrSend=a;let l=this,d=new WeakMap,p=function(w,y,...C){try{d.set(this,{method:w.toUpperCase(),url:Da(Ka(y)),startedAt:new Date,t0:typeof performance<"u"?performance.now():Date.now()});}catch{}return i.call(this,w,y,...C)},B=function(w){let y=d.get(this);if(y){let C=()=>{try{let F=typeof performance<"u"?performance.now():Date.now(),Q=this.status;(Q===0||Q>=400)&&l.push({url:y.url,method:y.method,status:Q,durationMs:Math.round(F-y.t0),timestamp:y.startedAt.toISOString()});}catch{}};try{this.addEventListener("loadend",C,{once:!0});}catch{try{this.addEventListener("loadend",C);}catch{}}}return a.call(this,w??null)};this.wrappedXhrOpen=p,this.wrappedXhrSend=B,n.open=p,n.send=B;}getEntries(){return this.entries.slice()}dispose(){if(!this.disposed){if(this.disposed=true,this.originalFetch&&globalThis.fetch===this.wrappedFetch)try{globalThis.fetch=this.originalFetch;}catch{}if(typeof XMLHttpRequest<"u")try{let n=XMLHttpRequest.prototype;this.originalXhrOpen&&n.open===this.wrappedXhrOpen&&(n.open=this.originalXhrOpen),this.originalXhrSend&&n.send===this.wrappedXhrSend&&(n.send=this.originalXhrSend);}catch{}}}};var Kt=class{listeners=new Map;on(n,i){let a=this.listeners.get(n);return a||(a=new Set,this.listeners.set(n,a)),a.add(i),()=>{a?.delete(i);}}off(n,i){this.listeners.get(n)?.delete(i);}emit(n,...i){let a=this.listeners.get(n);if(a)for(let l of a)try{l(...i);}catch(d){console.error(`[siteping] Error in event listener for "${String(n)}":`,d);}}removeAll(){this.listeners.clear();}};IA();jA();Vr();var Sg=54,Lg={chat:"fab.messages",annotate:"fab.annotate","toggle-annotations":"fab.annotations"},An=class{constructor(n,i,a,l){this.bus=a;this.t=l;let d=i.position??"bottom-right",p=d==="bottom-right";this.items=[{id:"chat",icon:ma},{id:"annotate",icon:ba}],i.showAnnotationsToggle!==false&&this.items.push({id:"toggle-annotations",icon:ks,iconAlt:Is}),this.fab=document.createElement("button"),this.fab.className=`sp-fab sp-fab--${d} sp-anim-fab-in`,this.fab.style.position="fixed",this.fab.appendChild(V(Hs)),this.fab.setAttribute("aria-expanded","false"),this.fab.addEventListener("click",()=>this.toggle()),this.radialContainer=document.createElement("div"),this.radialContainer.className=`sp-radial sp-radial--${d}`,this.radialContainer.setAttribute("role","menu");for(let y=0;y<this.items.length;y++){let C=this.items[y];if(!C)continue;let F=document.createElement("button");F.className="sp-radial-item",F.style.setProperty("--sp-i",String(y)),F.appendChild(V(C.icon)),F.setAttribute("role","menuitem"),F.dataset.itemId=C.id,F.addEventListener("click",U=>{U.stopPropagation(),this.handleItemClick(C.id);});let Q=document.createElement("span");Q.className="sp-radial-label",Q.style.cssText=p?"position:absolute; right:54px; top:50%; transform:translateY(-50%); white-space:nowrap;":"position:absolute; left:54px; top:50%; transform:translateY(-50%); white-space:nowrap;",F.appendChild(Q),this.radialContainer.appendChild(F);}this.root=document.createElement("div"),this.root.appendChild(this.radialContainer),this.root.appendChild(this.fab),n.appendChild(this.root),this.applyLabels();let B=n.host;this.onDocumentClick=y=>{this.isOpen&&!y.composedPath().includes(B)&&this.close();},document.addEventListener("click",this.onDocumentClick);let w=y=>{y.key==="Escape"&&this.isOpen&&(y.stopPropagation(),this.close());};this.fab.addEventListener("keydown",w),this.radialContainer.addEventListener("keydown",w),this.radialContainer.addEventListener("keydown",y=>{let C=Array.from(this.radialContainer.querySelectorAll(".sp-radial-item"));if(C.length===0||!this.isOpen)return;let F=n.activeElement??document.activeElement,Q=C.indexOf(F);switch(y.key){case "ArrowUp":{y.preventDefault();let U=Q<=0?C.length-1:Q-1;C[U]?.focus();break}case "ArrowDown":{y.preventDefault();let U=Q>=C.length-1?0:Q+1;C[U]?.focus();break}case "Home":{y.preventDefault(),C[0]?.focus();break}case "End":{y.preventDefault(),C[C.length-1]?.focus();break}}});}bus;t;root;fab;radialContainer;badgeEl=null;isOpen=false;annotationsVisible=true;items;onDocumentClick;refreshLabels(){this.applyLabels();}applyLabels(){this.fab.setAttribute("aria-label",this.t("fab.aria"));let n=this.radialContainer.querySelectorAll(".sp-radial-item");for(let i of n){let a=i.dataset.itemId;if(!a)continue;let l=Lg[a];if(!l)continue;let d=this.t(l);i.setAttribute("aria-label",d);let p=i.querySelector(".sp-radial-label");p&&E(p,d);}}updateBadge(n){if(n<=0){this.badgeEl?.remove(),this.badgeEl=null;return}this.badgeEl||(this.badgeEl=document.createElement("span"),this.badgeEl.className="sp-fab-badge",this.badgeEl.setAttribute("role","status"),this.badgeEl.setAttribute("aria-live","polite"),this.fab.appendChild(this.badgeEl));let i=n>99?"99+":String(n);E(this.badgeEl,i),this.badgeEl.setAttribute("aria-label",xA(this.t,"fab.badge",{count:n}));}toggle(){this.isOpen?this.close():this.open();}open(){this.isOpen=true,this.setFabIcon(Rr),this.fab.setAttribute("aria-expanded","true"),this.radialContainer.querySelectorAll(".sp-radial-item").forEach((i,a)=>{let l=-(16+Sg*(a+1));i.style.transform=`translate(0px, ${l}px) scale(1)`,i.classList.add("sp-radial-item--open");}),requestAnimationFrame(()=>{this.radialContainer.querySelector(".sp-radial-item")?.focus();});}close(){this.isOpen=false,this.setFabIcon(Hs),this.fab.setAttribute("aria-expanded","false"),this.radialContainer.querySelectorAll(".sp-radial-item").forEach(i=>{i.style.transform="translate(0, 0) scale(0.8)",i.classList.remove("sp-radial-item--open");}),this.fab.focus();}setFabIcon(n){let i=this.badgeEl;this.fab.replaceChildren(V(n)),i&&this.fab.appendChild(i);}handleItemClick(n){switch(this.close(),n){case "chat":this.bus.emit("panel:toggle",true);break;case "annotate":{let i=this.bus.on("annotation:end",()=>{i(),this.fab.focus();});this.bus.emit("annotation:start");break}case "toggle-annotations":{this.annotationsVisible=!this.annotationsVisible,this.bus.emit("annotations:toggle",this.annotationsVisible);let a=this.radialContainer.querySelector('[data-item-id="toggle-annotations"]')?.querySelector("svg");if(a){let l=V(this.annotationsVisible?ks:Is);a.replaceWith(l);}break}}}destroy(){document.removeEventListener("click",this.onDocumentClick),this.root.remove();}};jA();GA();var za="siteping_identity";function Tg(s){if(!ke(s,"name")||!ke(s,"email"))return  false;let{name:n,email:i}=s;return typeof n=="string"&&typeof i=="string"&&n.length>0&&Ut(i)}function Ns(){try{let s=localStorage.getItem(za);if(!s)return null;let n=JSON.parse(s);return Tg(n)?n:null}catch{return null}}function Za(s){try{localStorage.setItem(za,JSON.stringify(s));}catch{}}GA();function et(s){return s.normalize("NFC").replace(/\s+/g," ").trim()}function qa(s){return s.replace(/\s+/g," ").trim()}function Dg(s,n){if(s===n)return 0;if(s.length===0)return n.length;if(n.length===0)return s.length;if(s.length>n.length){let p=s;s=n,n=p;}let i=s.length,a=n.length,l=new Array(i+1);for(let p=0;p<=i;p++)l[p]=p;let d=new Array(i+1);for(let p=1;p<=a;p++){d[0]=p;for(let w=1;w<=i;w++){let y=l[w-1];d[w]=s[w-1]===n[p-1]?y:1+Math.min(y,l[w],d[w-1]);}let B=l;l=d,d=B;}return l[i]}function Mt(s,n){if(s===n)return 1;let i=Math.max(s.length,n.length);return i===0?1:1-Dg(s,n)/i}function Kg(s,n){let i=n.length,a=new Int32Array(i+1),l=new Int32Array(i+1);for(let p=0;p<=i;p++)a[p]=p;let d=i;for(let p=1;p<=s.length;p++){l[0]=0;let B=s.charCodeAt(p-1);for(let C=1;C<=i;C++){let F=a[C-1]+(n.charCodeAt(C-1)===B?0:1),Q=a[C]+1,U=l[C-1]+1;l[C]=Math.min(F,Q,U);}let w=l[i];w<d&&(d=w);let y=a;a=l,l=y;}return d}function Al(s,n,i=.6){if(!n||!s)return 0;if(s.includes(n))return 1;let a=s.length>500?s.slice(0,500):s;if(n.length>a.length){let d=Mt(a,n);return d>=i?d:0}if(n.length<8&&a.length>64)return 0;let l=1-Kg(a,n)/n.length;return l>=i?l:0}function el(s){let n=new Map;for(let i=0;i<s.length-1;i++){let a=s.charCodeAt(i)<<16|s.charCodeAt(i+1);n.set(a,(n.get(a)??0)+1);}return n}function tl(s,n,i){let a=i.length-1;if(n<=0||a<=0)return 0;let l=0,d=new Map;for(let p=0;p<i.length-1;p++){let B=i.charCodeAt(p)<<16|i.charCodeAt(p+1),w=s.get(B);if(w===void 0)continue;let y=d.get(B)??0;y<w&&(d.set(B,y+1),l++);}return 2*l/(n+a)}function rl(s){let n=new Map,i=s.split(" ");for(let a=0;a<i.length-1;a++){let l=`${i[a]} ${i[a+1]}`;n.set(l,(n.get(l)??0)+1);}return n}function nl(s,n,i){if(n<=0)return 0;let a=i.split(" "),l=a.length-1;if(l<=0)return 0;let d=0,p=new Map;for(let B=0;B<a.length-1;B++){let w=`${a[B]} ${a[B+1]}`,y=s.get(w);if(y===void 0)continue;let C=p.get(w)??0;C<y&&(p.set(w,C+1),d++);}return 2*d/(n+l)}var Mg={checkOpacity:true,opacityProperty:true,checkVisibilityCSS:true,visibilityProperty:true};function Rt(s){if(!s.isConnected)return "hidden";if(typeof s.checkVisibility=="function")return s.checkVisibility(Mg)?"visible":s.checkVisibility()?"soft-hidden":"hidden";if(s.getClientRects().length>0)try{return getComputedStyle(s).visibility==="visible"?"visible":"soft-hidden"}catch{return "visible"}let n=s.firstElementChild;return n&&n.getClientRects().length>0?"visible":s.ownerDocument.documentElement.getClientRects().length===0?"unknown":"hidden"}function sl(s){switch(s){case "hidden":return .3;case "soft-hidden":return .6;default:return 1}}var tt={anchorKey:1,id:1,css:.95,xpath:.9,scan:.85},en=16,Rg=24,Og=1e4,Vs=500,Ng=.5,Ps=.6,Pg=.4,_g=2e3,Gs=.8,_s=.6,Gg=.05;function tn(s,n){return et((s??"").slice(0,_g)).slice(0,n)}function Vg(s){let n=tn(s.textSnippet,Vs),i=rl(n),a=0;for(let l of i.values())a+=l;return {snippet:n,snippetBigrams:el(n),snippetBigramTotal:Math.max(0,n.length-1),snippetWordPairs:i,snippetWordPairTotal:a,prefix:tn(s.textPrefix,128),suffix:tn(s.textSuffix,128),neighbor:tn(s.neighborText,128),fingerprint:(s.fingerprint??"").slice(0,64),tag:typeof s.elementTag=="string"?s.elementTag:""}}function Xg(s,n){let i=Vg(s),a=Wg(s),l=[];for(let[F,Q]of a){let U=il(F,Q,i);U&&l.push(U);}let d=0,p=false;for(let F of l)F.final>d&&(d=F.final),(F.strategy==="id"||F.strategy==="anchorKey")&&F.visibility===1&&(F.signals?.text??0)>=Gs&&(F.signals?.fingerprint===void 0||F.signals.fingerprint>=Gs)&&(p=true);let B=!!(i.snippet||i.fingerprint||i.prefix||i.suffix||i.neighbor),w=n?.scanBudget;if(B&&d<tt.scan&&!p)if(w&&w.remaining<=0)w.starved=true;else {w&&w.remaining--;for(let F of Yg(i,a)){let Q=il(F,"scan",i);Q&&l.push(Q);}}let y=l.filter(Jg);if(y.length===0)return null;y.sort((F,Q)=>Q.final-F.final);let C=jg(y);return {element:C.element,confidence:zg(C),strategy:C.strategy}}function Wg(s){let n=new Map,i=(a,l,d)=>{!a||n.has(a)||d&&a.tagName!==s.elementTag||n.set(a,l);};if(s.anchorKey){let a=s.anchorKey.replace(/\\/g,"\\\\").replace(/"/g,'\\"');try{let l=document.querySelectorAll(`[${Lt}="${a}"]`);for(let d=0;d<Math.min(l.length,en);d++)i(l[d]??null,"anchorKey",!1);}catch{}}if(s.elementId){let a=s.elementId.replace(/\\/g,"\\\\").replace(/"/g,'\\"');try{let l=document.querySelectorAll(`[id="${a}"]`);for(let d=0;d<Math.min(l.length,en);d++)i(l[d]??null,"id",!0);}catch{i(document.getElementById(s.elementId),"id",true);}}try{let a=document.querySelectorAll(s.cssSelector);for(let l=0;l<Math.min(a.length,en);l++)i(a[l]??null,"css",!0);}catch{}try{let a=document.evaluate(s.xpath,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),l=Math.min(a.snapshotLength,en);for(let d=0;d<l;d++){let p=a.snapshotItem(d);p instanceof Element&&i(p,"xpath",!0);}}catch{}return n}function Yg(s,n){let i=s.tag.toLowerCase();if(!i)return [];let a;try{a=document.querySelectorAll(i);}catch{return []}let l=s.fingerprint.split(":"),d=l.length===3?Number(l[0]):Number.NaN,p=l.length===3?l[2]??"":"",B=Math.min(a.length,Og),w=[];for(let y=0;y<B;y++){let C=a[y];if(!C||n.has(C))continue;let F=0;if(s.snippetBigramTotal>0){let Q=qa(Ze(C,Vs)),U=tl(s.snippetBigrams,s.snippetBigramTotal,Q);if(s.snippetWordPairTotal>0){let M=U>0?nl(s.snippetWordPairs,s.snippetWordPairTotal,Q):0;F+=.6*(.5*U+.5*M);}else F+=.6*U;}if(p&&xs(C)===p&&(F+=.25),!Number.isNaN(d)){let Q=Math.abs(C.children.length-d);Q===0?F+=.15:Q<=2&&(F+=.07);}w.push({element:C,cheap:F});}return w.sort((y,C)=>C.cheap-y.cheap),w.slice(0,Rg).map(y=>y.element)}function il(s,n,i){let a=$g(s,i),l=sl(Rt(s));return a===null?n==="scan"?null:{element:s,strategy:n,verification:_s,strongest:_s,visibility:l,final:tt[n]*_s*l,unverified:true}:{element:s,strategy:n,verification:a.blend,strongest:a.strongest,signals:a,visibility:l,final:tt[n]*a.blend*l}}function Jg(s){if(s.strategy==="scan")return s.verification>=Pg;if(s.unverified||!s.signals)return  true;let n=s.signals;return n.text===void 0||n.text>=Ng?true:(n.fingerprint??0)>=Ps||(n.context??0)>=Ps||(n.neighbor??0)>=Ps}function $g(s,n){let i=0,a=0,l={blend:0,strongest:0};if(n.snippet){a+=40;let d=et(Ze(s,Vs));l.text=Al(d,n.snippet,.5),i+=l.text*40;}if(n.fingerprint&&(a+=20,l.fingerprint=la(s,n.fingerprint),i+=l.fingerprint*20),n.prefix||n.suffix){a+=20;let d=0,p=0;if(n.prefix){let B=et(qe(s,"before"));d+=B?Mt(B,n.prefix):0,p++;}if(n.suffix){let B=et(qe(s,"after"));d+=B?Mt(B,n.suffix):0,p++;}p>0&&(l.context=d/p,i+=l.context*20);}if(n.neighbor){a+=20;let d=et(Kr(s));l.neighbor=d?Mt(d,n.neighbor):0,i+=l.neighbor*20;}return a===0?null:(l.blend=i/a,l.strongest=Math.max(l.text??0,l.fingerprint??0,l.context??0,l.neighbor??0),l)}function jg(s){let n=s[0],i=s.filter(l=>n.final-l.final<=Gg&&(l===n||n.element.contains(l.element))),a=n;for(let l of i)l!==a&&a.element.contains(l.element)&&(a=l);return a}function zg(s){return s.strategy==="scan"?Math.min(s.verification,tt.scan):s.unverified?tt[s.strategy]:tt[s.strategy]*Math.min(1,s.strongest/Gs)}function rn(s,n,i){let a=Xg(s,i);if(!a)return null;let l=a.element.getBoundingClientRect(),d=new DOMRect(l.x+n.xPct*l.width,l.y+n.yPct*l.height,n.wPct*l.width,n.hPct*l.height);return {element:a.element,rect:d,confidence:a.confidence,strategy:a.strategy}}IA();jA();we();function Xs(s){return {cssSelector:s.cssSelector,xpath:s.xpath,textSnippet:s.textSnippet,elementTag:s.elementTag,elementId:s.elementId??void 0,textPrefix:s.textPrefix,textSuffix:s.textSuffix,fingerprint:s.fingerprint,neighborText:s.neighborText,anchorKey:s.anchorKey??null}}function nn(s){return {xPct:s.xPct,yPct:s.yPct,wPct:s.wPct,hPct:s.hPct}}var ol=13;function al(s){return {top:s.top+window.scrollY-ol,left:s.right+window.scrollX-ol}}function Ot(s,n){let i=s.entries[n],a=s.elementIndices[n];if(!(!i||a===void 0))return i.elements[a]}var ll=300,cl=200,Zg=3e3,qg=.7,AB=28,dl=32,sn=class{constructor(n,i,a,l,d=null){this.colors=n;this.tooltip=i;this.bus=a;this.t=l;this.liveRegion=d;this.container=b("div",{style:`position:absolute;top:0;left:0;pointer-events:none;z-index:${2147483646};`}),this.container.id="siteping-markers",document.body.appendChild(this.container),this.bus.on("annotations:toggle",p=>{this.container.style.display=p?"block":"none";}),this.resizeHandler=()=>this.scheduleReposition("resize"),window.addEventListener("resize",this.resizeHandler,{passive:true}),this.scrollHandler=()=>this.scheduleReposition("scroll"),window.addEventListener("scroll",this.scrollHandler,{passive:true,capture:true}),this.mutationObserver=new MutationObserver(p=>{let B=false;for(let w of p)if(!(this.container.contains(w.target)||this.tooltip.contains(w.target))){B=true;break}B&&this.scheduleReposition("mutation");}),this.mutationObserver.observe(document.body,{childList:true,subtree:true,attributes:false,characterData:false}),this.onDocumentClickForClusters=p=>{this.container.contains(p.target)||this.collapseAllClusters();},document.addEventListener("click",this.onDocumentClickForClusters);}colors;tooltip;bus;t;liveRegion;container;entries=[];highlightElements=[];pinnedFeedback=null;onDocumentClick=null;repositionTimer=null;mutationObserver=null;scrollHandler=null;resizeHandler=null;anchorCache=new Map;pendingLayoutChange=false;pendingResize=false;hiddenRecheckAt=new Map;clusters=[];onDocumentClickForClusters=null;lastOpenCount=-1;get count(){return this.entries.length}get openCount(){let n=0;for(let i of this.entries)fA(i.feedback.status)||n++;return n}scheduleReposition(n="mutation"){n!=="scroll"&&(this.pendingLayoutChange=true),n==="resize"&&(this.pendingResize=true),!this.repositionTimer&&("requestIdleCallback"in window?this.repositionTimer=window.requestIdleCallback(()=>{this.repositionTimer=null,this.repositionAll();},{timeout:cl+100}):this.repositionTimer=+setTimeout(()=>{this.repositionTimer=null,this.repositionAll();},cl));}repositionAll(){let n=this.pendingLayoutChange,i=this.pendingResize;this.pendingLayoutChange=false,this.pendingResize=false,i&&this.hiddenRecheckAt.clear();let a=Date.now(),l={remaining:2,starved:false},d=new Set;for(let p of this.entries)for(let B=0;B<p.feedback.annotations.length;B++){let w=p.elements[B];if(!w)continue;let y=p.feedback.annotations[B];if(!y)continue;let C=`${p.feedback.id}:${B}`;d.add(C);let Q=this.anchorCache.get(C)?.deref(),U,M=(this.hiddenRecheckAt.get(C)??0)>a,G=Q?.isConnected&&(M||!(n&&Rt(Q)==="hidden"));if(Q&&G){let j=Q.getBoundingClientRect(),k=nn(y);U={element:Q,rect:new DOMRect(j.left+k.xPct*j.width,j.top+k.yPct*j.height,k.wPct*j.width,k.hPct*j.height),confidence:1,strategy:"css"};}else M?U=null:(l.starved=false,U=rn(Xs(y),nn(y),{scanBudget:l}),l.starved||(U?.element&&this.anchorCache.set(C,new WeakRef(U.element)),!U||Rt(U.element)==="hidden"?this.hiddenRecheckAt.set(C,a+Zg):this.hiddenRecheckAt.delete(C)));if(!U){w.style.display="none";continue}let R=al(U.rect);p.baseTop=R.top,p.baseLeft=R.left,w.style.display="flex",this.applyConfidenceStyle(w,U.confidence,p.feedback);}for(let p of this.anchorCache.keys())d.has(p)||this.anchorCache.delete(p);for(let p of this.hiddenRecheckAt.keys())d.has(p)||this.hiddenRecheckAt.delete(p);this.applyClusterPositions(),this.pinnedFeedback&&this.showHighlight(this.pinnedFeedback);}applyClusterPositions(){for(let n of this.clusters)n.expanded?this.applyFanPositions(n):this.applyStackPositions(n);}emitMarkersChanged(){let n=this.openCount;n!==this.lastOpenCount&&(this.lastOpenCount=n,this.bus.emit("markers:changed",n));}render(n){this.clear(),n.forEach((i,a)=>{let l=this.buildEntry(i,a+1);this.entries.push(l);}),this.buildClusters(),this.liveRegion&&this.entries.length>0&&(this.liveRegion.textContent=xA(this.t,"marker.count",{count:this.entries.length})),this.emitMarkersChanged();}addFeedback(n,i){let a=this.buildEntry(n,i);for(let l of a.elements)l.style.animation="sp-marker-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both";this.entries.push(a),this.buildClusters(),this.emitMarkersChanged();}buildEntry(n,i){let a={feedback:n,elements:[],baseTop:0,baseLeft:0};for(let l of n.annotations){let d=rn(Xs(l),nn(l));if(!d)continue;let p=al(d.rect);a.baseTop=p.top,a.baseLeft=p.left;let B=this.createMarker(i,n,p);this.applyConfidenceStyle(B,d.confidence,n),this.container.appendChild(B),a.elements.push(B);}return a}buildClusters(){for(let a of this.container.querySelectorAll(".sp-cluster-badge"))a.remove();let n=[];for(let a of this.entries)for(let l=0;l<a.elements.length;l++)n.push({entry:a,elIdx:l});let i=new Set;this.clusters=[];for(let a=0;a<n.length;a++){if(i.has(a))continue;let l=n[a];if(!l)continue;let d={entries:[l.entry],elementIndices:[l.elIdx],expanded:false};i.add(a);for(let p=a+1;p<n.length;p++){if(i.has(p))continue;let B=l.entry,w=n[p];if(!w)continue;let y=w.entry;Math.sqrt((B.baseLeft-y.baseLeft)**2+(B.baseTop-y.baseTop)**2)<AB&&(d.entries.push(y),d.elementIndices.push(w.elIdx),i.add(p));}this.clusters.push(d);}for(let a of this.clusters)a.entries.length<=1||(this.applyStackPositions(a),this.addClusterBadge(a));}applyStackPositions(n){let i=n.entries[0];if(!i)return;let{baseTop:a,baseLeft:l}=i,d=n.entries.length<=1;for(let p=0;p<n.entries.length;p++){let B=Ot(n,p);B&&(B.style.top=`${a+(d?0:p*3)}px`,B.style.left=`${l+(d?0:p*3)}px`,B.style.zIndex=String(p+1));}}applyFanPositions(n){let i=n.entries[0];if(!i)return;let{baseTop:a,baseLeft:l}=i,d=n.entries.length,p=(d-1)*dl,B=l-p/2;for(let w=0;w<d;w++){let y=Ot(n,w);y&&(y.style.top=`${a}px`,y.style.left=`${B+w*dl}px`,y.style.zIndex=String(10+w));}}addClusterBadge(n){let i=Ot(n,n.entries.length-1);if(!i)return;let a=b("div",{class:"sp-cluster-badge",style:`
        position:absolute;top:-6px;right:-6px;
        min-width:16px;height:16px;padding:0 4px;
        border-radius:9999px;
        background:${this.colors.accent};color:#fff;
        font-size:10px;font-weight:700;
        display:flex;align-items:center;justify-content:center;
        border:1.5px solid #fff;
        pointer-events:none;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        line-height:1;
      `});E(a,String(n.entries.length)),i.appendChild(a);}setBadgesVisible(n,i){for(let a=0;a<n.entries.length;a++){let l=Ot(n,a)?.querySelector(".sp-cluster-badge");l&&(l.style.display=i?"flex":"none");}}findCluster(n){for(let i of this.clusters)if(!(i.entries.length<=1)){for(let a=0;a<i.entries.length;a++)if(Ot(i,a)===n)return i}return null}handleClusterClick(n,i){let a=this.findCluster(n);return a?a.expanded?false:(i.stopPropagation(),this.collapseAllClusters(),a.expanded=true,this.applyFanPositions(a),this.setBadgesVisible(a,false),true):false}collapseCluster(n){n.expanded&&(n.expanded=false,this.applyStackPositions(n),this.setBadgesVisible(n,true));}collapseAllClusters(){for(let n of this.clusters)this.collapseCluster(n);}applyConfidenceStyle(n,i,a){let l=fA(a.status);i<qg&&!l?(n.style.borderStyle="dashed",n.style.opacity="0.7",n.title=xA(this.t,"marker.approximate",{confidence:Math.round(i*100)})):(n.style.borderStyle="solid",n.style.opacity="1",n.title="");}createMarker(n,i,a){let l=DA(i.type,this.colors),d=fA(i.status),p=b("div",{style:`
        position:absolute;
        top:${a.top}px;
        left:${a.left}px;
        width:26px;height:26px;
        border-radius:50%;
        background:${d?"rgba(241,245,249,0.9)":"rgba(255,255,255,0.92)"};
        border:2px solid ${d?"#cbd5e1":l};
        display:flex;align-items:center;justify-content:center;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        font-size:11px;font-weight:700;
        color:${d?"#94a3b8":l};
        cursor:pointer;pointer-events:auto;
        box-shadow:${d?"0 2px 8px rgba(0,0,0,0.06)":`0 2px 12px ${l}25, 0 2px 6px rgba(0,0,0,0.06)`};
        transition:top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease, box-shadow 0.15s ease;
        user-select:none;
        -webkit-font-smoothing:antialiased;
      `});p.dataset.feedbackId=i.id,p.setAttribute("tabindex","0"),p.setAttribute("role","button");let B=i.message.length>60?`${i.message.slice(0,60)}...`:i.message,w=xA(this.t,"marker.aria",{number:n,type:De(i.type,this.t),message:B});p.setAttribute("aria-label",w),p.setAttribute("aria-describedby",this.tooltip.tooltipId),E(p,d?"\u2713":String(n)),p.addEventListener("mouseenter",()=>{p.style.transform="scale(1.2)",p.style.boxShadow=d?"0 4px 16px rgba(0,0,0,0.1)":`0 4px 20px ${l}35, 0 4px 12px rgba(0,0,0,0.08)`,this.tooltip.show(i,p.getBoundingClientRect()),this.pinnedFeedback||this.showHighlight(i);}),p.addEventListener("mouseleave",()=>{p.style.transform="scale(1)",p.style.boxShadow=d?"0 2px 8px rgba(0,0,0,0.06)":`0 2px 12px ${l}25, 0 2px 6px rgba(0,0,0,0.06)`,this.tooltip.scheduleHide(),this.pinnedFeedback||this.clearHighlight();}),p.addEventListener("focus",()=>{this.tooltip.show(i,p.getBoundingClientRect()),this.pinnedFeedback||this.showHighlight(i);}),p.addEventListener("blur",()=>{this.tooltip.scheduleHide(),this.pinnedFeedback||this.clearHighlight();});let y=C=>{C instanceof MouseEvent&&this.handleClusterClick(p,C)||(this.pinHighlight(i),this.bus.emit("panel:toggle",true),p.dispatchEvent(new CustomEvent("sp-marker-click",{detail:{feedbackId:i.id},bubbles:true})));};return p.addEventListener("click",C=>y(C)),p.addEventListener("keydown",C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),y(C));}),p}focusFeedback(n){let i=this.entries.find(l=>l.feedback.id===n);if(!i)return  false;let a=i.elements[0];return a&&a.scrollIntoView({behavior:"smooth",block:"center"}),this.pinHighlight(i.feedback),this.highlight(n),true}highlight(n){for(let i of this.entries)if(i.feedback.id===n)for(let a of i.elements)a.style.animation="sp-pulse-ring 0.7s ease-out",a.addEventListener("animationend",()=>{a.style.animation="";},{once:true});}showHighlight(n){this.removeHighlightElements();for(let i of n.annotations){let a=rn(Xs(i),nn(i));if(!a)continue;let l=DA(n.type,this.colors),d=a.rect,p=b("div",{style:`
          position:absolute;
          top:${d.top+window.scrollY}px;
          left:${d.left+window.scrollX}px;
          width:${d.width}px;height:${d.height}px;
          border:2px solid ${l};
          background:${l}0c;
          border-radius:8px;
          pointer-events:none;z-index:-1;
          opacity:0;
          box-shadow:0 0 16px ${l}20;
          transition:opacity ${ll}ms ease;
        `});this.container.appendChild(p),this.highlightElements.push(p),p.offsetHeight,p.style.opacity="1";}}pinHighlight(n){this.unpinHighlight(),this.showHighlight(n),this.pinnedFeedback=n,this.onDocumentClick=i=>{this.container.contains(i.target)||this.unpinHighlight();},document.addEventListener("click",this.onDocumentClick,{capture:true});}unpinHighlight(){this.onDocumentClick&&(document.removeEventListener("click",this.onDocumentClick,{capture:true}),this.onDocumentClick=null),this.pinnedFeedback=null,this.clearHighlight();}clearHighlight(){for(let n of this.highlightElements)n.style.opacity="0",setTimeout(()=>n.remove(),ll);this.highlightElements=[];}removeHighlightElements(){for(let n of this.highlightElements)n.remove();this.highlightElements=[];}clear(){this.unpinHighlight(),this.container.replaceChildren(),this.entries=[],this.clusters=[],this.anchorCache.clear();}destroy(){this.unpinHighlight(),this.repositionTimer&&("cancelIdleCallback"in window&&window.cancelIdleCallback(this.repositionTimer),clearTimeout(this.repositionTimer)),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.scrollHandler&&window.removeEventListener("scroll",this.scrollHandler,{capture:true}),this.onDocumentClickForClusters&&document.removeEventListener("click",this.onDocumentClickForClusters),this.mutationObserver?.disconnect(),this.container.remove();}};GA();var on=class{constructor(n,i){this.store=n;this.projectName=i;}store;projectName;async sendFeedback(n){let i=await this.store.createFeedback({projectName:n.projectName,type:n.type,message:n.message,status:"open",url:n.url,urlPattern:n.urlPattern??null,viewport:n.viewport,userAgent:n.userAgent,authorName:n.authorName,authorEmail:n.authorEmail,clientId:n.clientId,annotations:n.annotations.map(gs),screenshotDataUrl:n.screenshotDataUrl??null,screenshotRegion:n.screenshotRegion??null,diagnostics:n.diagnostics??null});return Ws(i)}async getFeedbacks(n,i){let{feedbacks:a,total:l}=await this.store.getFeedbacks({projectName:n,page:i?.page,limit:i?.limit,type:i?.type,status:i?.status,statuses:i?.statuses,search:i?.search,url:i?.url,urlPattern:i?.urlPattern});return {feedbacks:a.map(Ws),total:l}}async resolveFeedback(n,i){let a=await this.store.updateFeedback(n,hs(i?"resolved":"open"));return Ws(a)}async deleteFeedback(n){await this.store.deleteFeedback(n);}async deleteAllFeedbacks(n){await this.store.deleteAllFeedbacks(n);}};function Ws(s){return {id:s.id,projectName:s.projectName,type:s.type,message:s.message,status:s.status,url:s.url,urlPattern:s.urlPattern??null,viewport:s.viewport,userAgent:s.userAgent,authorName:s.authorName,authorEmail:s.authorEmail,resolvedAt:s.resolvedAt?.toISOString()??null,createdAt:s.createdAt.toISOString(),updatedAt:s.updatedAt.toISOString(),annotations:s.annotations.map(eB),screenshotUrl:s.screenshotUrl??null,screenshotRegion:s.screenshotRegion??null,diagnostics:s.diagnostics??null}}function eB(s){return {id:s.id,feedbackId:s.feedbackId,cssSelector:s.cssSelector,xpath:s.xpath,textSnippet:s.textSnippet,elementTag:s.elementTag,elementId:s.elementId,textPrefix:s.textPrefix,textSuffix:s.textSuffix,fingerprint:s.fingerprint,neighborText:s.neighborText,anchorKey:s.anchorKey??null,xPct:s.xPct,yPct:s.yPct,wPct:s.wPct,hPct:s.hPct,scrollX:s.scrollX,scrollY:s.scrollY,viewportW:s.viewportW,viewportH:s.viewportH,devicePixelRatio:s.devicePixelRatio,createdAt:s.createdAt.toISOString()}}Ys();Js();zs();Zs();qs();ei();var HB="linear(0, 0.006, 0.025, 0.06, 0.11, 0.17, 0.25, 0.34, 0.45, 0.56, 0.67, 0.78, 0.88, 0.95, 1.01, 1.04, 1.05, 1.04, 1.02, 1, 0.99, 1)",ti="cubic-bezier(0.16, 1, 0.3, 1)",ri="cubic-bezier(0.34, 1.56, 0.64, 1)",kB="cubic-bezier(0.25, 1, 0.5, 1)",kl=`
  /* ---- Keyframes ---- */

  @keyframes sp-fab-in {
    from {
      transform: scale(0) rotate(-180deg);
      opacity: 0;
    }
    to {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes sp-fab-glow {
    0%, 100% { box-shadow: 0 4px 20px var(--sp-accent-glow), 0 2px 8px rgba(0, 0, 0, 0.08); }
    50% { box-shadow: 0 4px 28px var(--sp-accent-glow), 0 2px 12px rgba(0, 0, 0, 0.1); }
  }

  @keyframes sp-marker-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    60% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes sp-pulse-ring {
    0% {
      box-shadow: 0 0 0 0 var(--sp-accent-glow);
    }
    70% {
      box-shadow: 0 0 0 8px transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  @keyframes sp-flash-bg {
    0% { background-color: var(--sp-accent-light); }
    100% { background-color: transparent; }
  }

  @keyframes sp-slide-up {
    from {
      transform: translateY(8px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes sp-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes sp-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* ---- Animation classes ---- */

  .sp-anim-fab-in {
    animation: sp-fab-in 0.5s ${HB} both;
  }

  .sp-anim-marker-in {
    animation: sp-marker-in 0.35s ${ri} both;
  }

  .sp-anim-pulse {
    animation: sp-pulse-ring 0.7s ease-out;
  }

  .sp-anim-flash {
    animation: sp-flash-bg 0.5s ${kB};
  }

  .sp-anim-slide-up {
    animation: sp-slide-up 0.3s ${ti} both;
  }

  .sp-anim-fade-in {
    animation: sp-fade-in 0.2s ease-out both;
  }

  /* ---- Transition utilities ---- */

  .sp-panel {
    transform: translateX(110%);
    transition: transform 0.4s ${ti};
  }

  .sp-panel.sp-panel--open {
    transform: translateX(0);
  }

  .sp-radial-item {
    opacity: 0;
    pointer-events: none;
    transform: translate(0, 0) scale(0.8);
    transition:
      transform 0.35s ${ri},
      opacity 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .sp-radial-item.sp-radial-item--open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Stagger delay via CSS custom property --sp-i */
  .sp-radial-item {
    transition-delay: calc(var(--sp-i, 0) * 50ms);
  }

  /* ---- Card stagger animation ---- */

  @keyframes sp-card-in {
    from {
      transform: translateY(12px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .sp-card {
    animation: sp-card-in 0.35s ${ti} both;
    animation-delay: calc(var(--sp-card-i, 0) * 40ms);
  }

  /* ---- Loading spinner ---- */

  @keyframes sp-spin {
    to { transform: rotate(360deg); }
  }

  .sp-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--sp-border);
    border-top-color: var(--sp-accent);
    border-radius: 50%;
    animation: sp-spin 0.6s linear infinite;
  }

  /* ---- Badge bounce ---- */

  @keyframes sp-badge-in {
    0% { transform: scale(0); }
    60% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  .sp-fab-badge {
    animation: sp-badge-in 0.4s ${ri} both;
  }

  /* ---- Reduced motion ---- */

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

`;we();function ni(s){return `
    :host {
      all: initial;
      position: fixed;
      z-index: ${2147483647};
      font-family: var(--sp-font);
      font-size: 14px;
      line-height: 1.5;
      color: var(--sp-text);
      /* Match native sub-controls (autofill, scrollbars, etc.) to the resolved theme */
      color-scheme: ${s.bg==="#ffffff"?"light":"dark"};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      ${xa(s)}

      /* Identity modal \u2014 theme-aware backdrop + panel */
      --sp-identity-bg: ${s.glassBgHeavy};
      --sp-identity-overlay: ${s.bg==="#ffffff"?"rgba(15, 23, 42, 0.2)":"rgba(0, 0, 0, 0.4)"};
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* ============================
       Focus visible (accessibility)
       ============================ */

    :focus-visible {
      outline: 2px solid var(--sp-accent);
      outline-offset: 2px;
      /* Double-ring against any background colour: the bg-coloured halo
         separates the accent ring from busy host-page surfaces. */
      box-shadow: 0 0 0 4px var(--sp-bg);
    }

    /* ============================
       FAB (Floating Action Button)
       ============================ */

    .sp-fab {
      position: fixed;
      width: 52px;
      height: 52px;
      border-radius: var(--sp-radius-full);
      background: var(--sp-accent-gradient);
      color: #fff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow:
        0 4px 20px var(--sp-accent-glow),
        0 2px 8px rgba(0, 0, 0, 0.08);
      transition:
        transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.3s ease;
      outline: none;
    }

    .sp-fab:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 3px;
    }

    .sp-fab:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow:
        0 8px 28px var(--sp-accent-glow),
        0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .sp-fab:active {
      transform: translateY(0) scale(0.95);
      transition-duration: 0.1s;
    }

    .sp-fab--bottom-right {
      bottom: 24px;
      right: 24px;
    }

    .sp-fab--bottom-left {
      bottom: 24px;
      left: 24px;
    }

    .sp-fab svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* ---- FAB Badge ---- */

    .sp-fab-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: var(--sp-radius-full);
      background: #ef4444;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #fff;
      pointer-events: none;
      font-family: var(--sp-font);
      line-height: 1;
    }

    /* ============================
       Radial Menu
       ============================ */

    .sp-radial {
      position: fixed;
      pointer-events: none;
      width: 52px;
      height: 52px;
    }

    .sp-radial--bottom-right {
      bottom: 24px;
      right: 24px;
    }

    .sp-radial--bottom-left {
      bottom: 24px;
      left: 24px;
    }

    .sp-radial-item {
      position: absolute;
      left: 4px;
      bottom: 4px;
      width: 44px;
      height: 44px;
      border-radius: var(--sp-radius-full);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      color: var(--sp-text);
      border: 1px solid var(--sp-glass-border);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--sp-shadow-md);
      font-size: 12px;
      font-weight: 600;
    }

    .sp-radial-item:hover,
    .sp-radial-item:focus-visible {
      background: rgba(255, 255, 255, 0.95);
      border-color: var(--sp-accent);
      color: var(--sp-accent);
      box-shadow:
        var(--sp-shadow-md),
        0 0 0 3px var(--sp-accent-light);
      outline: none;
    }

    .sp-radial-item svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      stroke: currentColor;
      fill: none;
    }

    .sp-radial-label {
      white-space: nowrap;
      font-size: 12px;
      font-weight: 500;
      color: var(--sp-text);
      pointer-events: none;
      opacity: 0;
      padding: 4px 12px;
      border-radius: var(--sp-radius);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-sm);
      transform: translateX(4px);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .sp-radial-item:hover .sp-radial-label,
    .sp-radial-item:focus-visible .sp-radial-label {
      opacity: 1;
      transform: translateX(0);
    }

    /* ============================
       Panel (Side drawer)
       ============================ */

    .sp-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      max-width: 100vw;
      height: 100vh;
      height: 100dvh;
      background: var(--sp-glass-bg);
      backdrop-filter: blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
      border-left: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-xl);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    @media (max-width: 480px) {
      .sp-panel {
        width: 100vw;
        border-left: none;
      }
    }

    .sp-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      position: relative;
      z-index: 2;
    }

    .sp-panel-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--sp-text);
      letter-spacing: -0.02em;
    }

    .sp-panel-close {
      width: 44px;
      height: 44px;
      border-radius: var(--sp-radius);
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--sp-text-tertiary);
      transition: all 0.2s ease;
    }

    .sp-panel-close:hover {
      background: var(--sp-bg-hover);
      color: var(--sp-text);
    }

    .sp-panel-close svg {
      width: 16px;
      height: 16px;
    }

    /* ============================
       Filters & Search
       ============================ */

    .sp-filters {
      padding: 16px 24px;
      border-bottom: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .sp-search-wrap {
      position: relative;
      margin-bottom: 12px;
    }

    .sp-search {
      width: 100%;
      height: 40px;
      padding: 0 12px 0 38px;
      border-radius: var(--sp-radius);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 13px;
      outline: none;
      transition: all 0.2s ease;
    }

    .sp-search::placeholder {
      color: var(--sp-text-tertiary);
    }

    .sp-search:focus {
      border-color: var(--sp-accent);
      box-shadow: 0 0 0 3px var(--sp-accent-light);
      background: var(--sp-bg);
    }

    .sp-search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--sp-text-tertiary);
      width: 16px;
      height: 16px;
      transition: color 0.2s ease;
    }

    .sp-search:focus ~ .sp-search-icon,
    .sp-search-wrap:focus-within .sp-search-icon {
      color: var(--sp-accent);
    }

    /* ============================
       Filter bar (type dropdown + status segmented)
       ============================ */

    .sp-filter-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    /* ============================
       Type filter dropdown
       ============================ */

    .sp-filter-dropdown {
      position: relative;
      flex: 1 1 auto;
      min-width: 0;
    }

    .sp-filter-dropdown-btn {
      --sp-chip-color: var(--sp-text-secondary);
      --sp-chip-bg: var(--sp-glass-bg-heavy);

      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      height: 32px;
      padding: 0 8px 0 10px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
    }

    .sp-filter-dropdown-btn:hover {
      border-color: var(--sp-chip-color);
      background: var(--sp-chip-bg);
    }

    .sp-filter-dropdown-btn[aria-expanded="true"] {
      border-color: var(--sp-chip-color);
      background: var(--sp-chip-bg);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--sp-chip-color) 14%, transparent);
    }

    .sp-filter-dropdown-btn--filtered {
      border-color: var(--sp-chip-color);
      background: var(--sp-chip-bg);
    }

    .sp-filter-dropdown-btn__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      color: var(--sp-chip-color);
    }

    .sp-filter-dropdown-btn__icon svg {
      width: 14px;
      height: 14px;
    }

    .sp-filter-dropdown-btn__label {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    .sp-filter-dropdown-btn__prefix {
      color: var(--sp-text-tertiary);
      font-weight: 500;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .sp-filter-dropdown-btn__value {
      color: var(--sp-chip-color);
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sp-filter-dropdown-btn__chevron {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      color: var(--sp-text-tertiary);
      transition: transform 0.18s ease, color 0.18s ease;
    }

    .sp-filter-dropdown-btn__chevron svg {
      width: 12px;
      height: 12px;
    }

    .sp-filter-dropdown-btn[aria-expanded="true"] .sp-filter-dropdown-btn__chevron {
      transform: rotate(180deg);
      color: var(--sp-chip-color);
    }

    .sp-filter-dropdown-menu {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      min-width: 180px;
      padding: 4px;
      border-radius: var(--sp-radius);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-md);
      z-index: 10;
      animation: sp-filter-menu-in 0.15s ease-out both;
    }

    @keyframes sp-filter-menu-in {
      from { opacity: 0; transform: translateY(-4px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .sp-filter-dropdown-option {
      --sp-chip-color: var(--sp-text-secondary);
      --sp-chip-bg: transparent;

      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 8px 10px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      transition: background 0.12s ease, color 0.12s ease;
    }

    .sp-filter-dropdown-option__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      border-radius: 6px;
      background: var(--sp-chip-bg);
      color: var(--sp-chip-color);
    }

    .sp-filter-dropdown-option__icon svg {
      width: 13px;
      height: 13px;
    }

    .sp-filter-dropdown-option__label {
      flex: 1;
      min-width: 0;
    }

    .sp-filter-dropdown-option__check {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      color: var(--sp-chip-color);
    }

    .sp-filter-dropdown-option__check svg {
      width: 13px;
      height: 13px;
    }

    .sp-filter-dropdown-option:hover {
      background: var(--sp-bg-hover);
    }

    .sp-filter-dropdown-option--active {
      color: var(--sp-chip-color);
      font-weight: 600;
    }

    .sp-filter-dropdown-option--active:hover {
      background: var(--sp-chip-bg);
    }

    /* ============================
       Status segmented control
       ============================ */

    .sp-segmented {
      display: inline-flex;
      align-items: stretch;
      padding: 2px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      flex-shrink: 0;
    }

    .sp-segmented__btn {
      --sp-chip-color: var(--sp-text-tertiary);
      --sp-chip-bg: transparent;

      display: inline-flex;
      align-items: center;
      gap: 5px;
      height: 26px;
      padding: 0 10px;
      border: none;
      border-radius: var(--sp-radius-full);
      background: transparent;
      color: var(--sp-text-secondary);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
    }

    .sp-segmented__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 13px;
      height: 13px;
      flex-shrink: 0;
      color: var(--sp-chip-color);
      transition: color 0.18s ease, transform 0.18s ease;
    }

    .sp-segmented__icon svg {
      width: 13px;
      height: 13px;
    }

    .sp-segmented__btn:hover {
      color: var(--sp-chip-color);
    }

    .sp-segmented__btn:hover .sp-segmented__icon {
      color: var(--sp-chip-color);
    }

    .sp-segmented__btn--active {
      background: var(--sp-chip-bg);
      color: var(--sp-chip-color);
      font-weight: 600;
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--sp-chip-color) 35%, transparent),
        0 1px 2px rgba(0, 0, 0, 0.04);
    }

    .sp-segmented__btn--active .sp-segmented__icon {
      color: var(--sp-chip-color);
    }

    .sp-segmented__btn--open.sp-segmented__btn--active .sp-segmented__icon {
      animation: sp-segmented-pulse 2.4s ease-in-out infinite;
    }

    @keyframes sp-segmented-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(0.85); }
    }

    @media (prefers-reduced-motion: reduce) {
      .sp-filter-dropdown-btn,
      .sp-filter-dropdown-btn__chevron,
      .sp-filter-dropdown-option,
      .sp-segmented__btn,
      .sp-segmented__icon {
        transition: none;
      }
      .sp-filter-dropdown-menu {
        animation: none;
      }
      .sp-segmented__btn--open.sp-segmented__btn--active .sp-segmented__icon {
        animation: none;
      }
    }

    /* ============================
       Feedback Cards
       ============================ */

    .sp-list {
      flex: 1;
      overflow-y: auto;
      padding: 8px 12px;
    }

    .sp-list::-webkit-scrollbar {
      width: 6px;
    }

    .sp-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .sp-list::-webkit-scrollbar-thumb {
      background: var(--sp-border);
      border-radius: var(--sp-radius-full);
    }

    .sp-list::-webkit-scrollbar-thumb:hover {
      background: var(--sp-text-tertiary);
    }

    .sp-card {
      display: flex;
      padding: 14px 16px;
      margin-bottom: 6px;
      cursor: pointer;
      border-radius: var(--sp-radius);
      background: var(--sp-glass-bg-heavy);
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-xs);
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .sp-card:hover {
      background: var(--sp-bg);
      border-color: var(--sp-border);
      box-shadow: var(--sp-shadow-md);
      transform: translateY(-2px);
    }

    .sp-card:active {
      transform: translateY(0) scale(0.99);
      transition-duration: 0.1s;
    }

    .sp-card-bar {
      width: 3px;
      border-radius: var(--sp-radius-full);
      margin-right: 14px;
      flex-shrink: 0;
    }

    .sp-card-body {
      flex: 1;
      min-width: 0;
    }

    .sp-card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }

    .sp-card-number {
      font-size: 12px;
      font-weight: 700;
      color: var(--sp-text-tertiary);
      font-variant-numeric: tabular-nums;
    }

    .sp-badge {
      padding: 2px 10px;
      border-radius: var(--sp-radius-full);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .sp-card-date {
      font-size: 11px;
      color: var(--sp-text-tertiary);
      margin-left: auto;
    }

    .sp-card-message {
      font-size: 13px;
      line-height: 1.5;
      color: var(--sp-text);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .sp-card-message--expanded {
      -webkit-line-clamp: unset;
    }

    .sp-card-expand {
      font-size: 12px;
      font-weight: 500;
      color: var(--sp-accent);
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px 0;
      font-family: var(--sp-font);
      transition: opacity 0.15s ease;
    }

    .sp-card-expand:hover {
      opacity: 0.8;
    }

    .sp-card-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      margin-top: 10px;
    }

    .sp-btn-resolve,
    .sp-btn-delete {
      padding: 8px 14px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: transparent;
      color: var(--sp-text-secondary);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;
    }

    .sp-btn-resolve svg,
    .sp-btn-delete svg {
      width: 14px;
      height: 14px;
    }

    .sp-btn-resolve:hover {
      border-color: #22c55e;
      color: #22c55e;
      background: rgba(34, 197, 94, 0.06);
    }

    .sp-btn-delete:hover {
      border-color: #ef4444;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.06);
    }

    .sp-btn-resolve:disabled,
    .sp-btn-delete:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .sp-spinner--sm {
      width: 14px;
      height: 14px;
    }

    /* ---- Delete All (header) ---- */

    .sp-panel-header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sp-btn-delete-all {
      padding: 5px 12px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: transparent;
      color: var(--sp-text-tertiary);
      font-family: var(--sp-font);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;
    }

    .sp-btn-delete-all svg {
      width: 13px;
      height: 13px;
    }

    .sp-btn-delete-all:hover {
      border-color: #ef4444;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.06);
    }

    .sp-btn-delete-all:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ---- Confirm Dialog ---- */

    .sp-confirm-backdrop {
      position: fixed;
      inset: 0;
      background: var(--sp-backdrop, rgba(15, 23, 42, 0.2));
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${2147483647};
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .sp-confirm-dialog {
      width: 340px;
      padding: 28px;
      border-radius: 20px;
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-xl);
      font-family: var(--sp-font);
      transform: translateY(8px) scale(0.97);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sp-confirm-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--sp-text);
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }

    .sp-confirm-message {
      font-size: 14px;
      color: var(--sp-text-secondary);
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .sp-confirm-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .sp-btn-danger {
      height: 40px;
      padding: 0 22px;
      border-radius: var(--sp-radius);
      border: none;
      background: #ef4444;
      color: #fff;
      font-family: var(--sp-font);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
    }

    .sp-btn-danger:hover {
      background: #dc2626;
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
      transform: translateY(-1px);
    }

    .sp-btn-danger:active {
      transform: translateY(0) scale(0.98);
      transition-duration: 0.1s;
    }

    .sp-card--resolved {
      opacity: 0.5;
    }

    .sp-card--resolved .sp-card-message {
      text-decoration: line-through;
      text-decoration-color: var(--sp-text-tertiary);
    }

    /* ============================
       Loading State
       ============================ */

    .sp-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
    }

    /* ============================
       Identity Form
       ============================ */

    .sp-identity-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--sp-text);
      letter-spacing: -0.02em;
    }

    .sp-input {
      width: 100%;
      height: 42px;
      padding: 0 14px;
      border-radius: var(--sp-radius);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
    }

    .sp-input::placeholder {
      color: var(--sp-text-tertiary);
    }

    .sp-input:focus {
      border-color: var(--sp-accent);
      box-shadow: 0 0 0 3px var(--sp-accent-light);
      background: var(--sp-bg);
    }

    .sp-input-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--sp-text-secondary);
      margin-bottom: 6px;
      display: block;
    }

    /* ============================
       Buttons
       ============================ */

    .sp-btn-primary {
      height: 40px;
      padding: 0 22px;
      border-radius: var(--sp-radius);
      border: none;
      background: var(--sp-accent-gradient);
      color: #fff;
      font-family: var(--sp-font);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px var(--sp-accent-glow);
    }

    .sp-btn-primary:hover {
      box-shadow: 0 4px 16px var(--sp-accent-glow);
      transform: translateY(-1px);
    }

    .sp-btn-primary:active {
      transform: translateY(0) scale(0.98);
      transition-duration: 0.1s;
    }

    .sp-btn-primary:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .sp-btn-ghost {
      height: 40px;
      padding: 0 22px;
      border-radius: var(--sp-radius);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text-secondary);
      font-family: var(--sp-font);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .sp-btn-ghost:hover {
      border-color: var(--sp-accent);
      color: var(--sp-accent);
      background: var(--sp-accent-light);
    }

    /* ============================
       Empty State
       ============================ */

    .sp-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 56px 24px;
      color: var(--sp-text-tertiary);
      text-align: center;
      gap: 8px;
      animation: sp-fade-in 0.3s ease-out both;
    }

    .sp-empty-text {
      font-size: 14px;
      font-weight: 500;
    }

    /* ============================
       Load More
       ============================ */

    .sp-load-more-wrap {
      display: flex;
      justify-content: center;
      padding: 12px 0 4px;
    }

    .sp-btn-load-more {
      width: 100%;
    }

    /* ============================
       Forced Colors / High Contrast
       ============================ */

    @media (forced-colors: active) {
      .sp-fab,
      .sp-radial-item,
      .sp-filter-dropdown-btn,
      .sp-segmented,
      .sp-segmented__btn,
      .sp-card,
      .sp-panel-close,
      .sp-search,
      .sp-btn-resolve,
      .sp-btn-delete,
      .sp-btn-delete-all,
      .sp-btn-primary,
      .sp-btn-ghost,
      .sp-btn-danger,
      .sp-card-expand,
      .sp-input,
      .sp-confirm-dialog {
        border: 2px solid ButtonText !important;
        background: Canvas !important;
        color: ButtonText !important;
      }

      .sp-segmented__btn--active {
        background: Highlight !important;
        color: HighlightText !important;
      }

      .sp-filter-dropdown-menu {
        border: 2px solid ButtonText !important;
        background: Canvas !important;
      }

      .sp-filter-dropdown-option--active {
        background: Highlight !important;
        color: HighlightText !important;
      }

      .sp-fab:focus-visible,
      .sp-radial-item:focus-visible,
      .sp-filter-dropdown-btn:focus-visible,
      .sp-segmented__btn:focus-visible,
      .sp-filter-dropdown-option:focus-visible,
      .sp-panel-close:focus-visible,
      .sp-btn-resolve:focus-visible,
      .sp-btn-delete:focus-visible,
      .sp-btn-delete-all:focus-visible,
      .sp-btn-primary:focus-visible,
      .sp-btn-ghost:focus-visible,
      .sp-btn-danger:focus-visible,
      .sp-card-expand:focus-visible,
      .sp-input:focus-visible,
      .sp-search:focus-visible {
        outline: 3px solid Highlight !important;
      }

      .sp-panel {
        border: 2px solid ButtonText !important;
      }

      .sp-fab-badge {
        border: 2px solid ButtonText !important;
        background: Canvas !important;
        color: ButtonText !important;
      }

      .sp-card-bar {
        background: ButtonText !important;
      }
    }

    ${kl}
    ${El}
    ${xl}
    ${Bl}
    ${hl}
    ${Hl}
    ${bl}
  `}we();IA();jA();we();var IB=120,SB=80,Bn=class{constructor(n,i="en"){this.colors=n;this.locale=i;this.root=b("div",{style:`
        position: fixed;
        z-index: ${2147483647};
        max-width: 280px;
        padding: 12px 14px;
        border-radius: 14px;
        background: ${this.colors.glassBgHeavy};
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid ${this.colors.glassBorder};
        box-shadow: 0 8px 32px ${this.colors.shadow}, 0 2px 8px ${this.colors.shadow};
        font-family: "Inter", system-ui, -apple-system, sans-serif;
        pointer-events: auto;
        opacity: 0;
        transform: translateY(6px) scale(0.97);
        transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        visibility: hidden;
        -webkit-font-smoothing: antialiased;
      `}),this.root.setAttribute("role","tooltip"),this.root.id=this.tooltipId,this.arrow=b("div",{style:`
        position: absolute;
        width: 12px;
        height: 12px;
        background: ${this.colors.glassBgHeavy};
        border: 1px solid ${this.colors.glassBorder};
        transform: rotate(45deg);
        pointer-events: none;
      `}),this.root.appendChild(this.arrow),this.root.addEventListener("mouseenter",()=>this.cancelHide()),this.root.addEventListener("mouseleave",()=>this.scheduleHide()),document.body.appendChild(this.root);}colors;locale;root;arrow;showTimer=null;hideTimer=null;currentFeedbackId=null;tooltipId="sp-tooltip";show(n,i){this.currentFeedbackId!==n.id&&(this.cancelHide(),this.cancelShow(),this.showTimer=setTimeout(()=>{this.currentFeedbackId=n.id,this.render(n),this.position(i);let a=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;this.root.style.transition=a?"none":"",this.root.style.visibility="visible",this.root.style.opacity="1",this.root.style.transform="translateY(0) scale(1)";},IB));}scheduleHide(){this.cancelHide(),this.hideTimer=setTimeout(()=>this.hide(),SB);}hide(){this.cancelShow(),this.currentFeedbackId=null,this.root.style.opacity="0",this.root.style.transform="translateY(6px) scale(0.97)",setTimeout(()=>{this.currentFeedbackId||(this.root.style.visibility="hidden");},200);}cancelShow(){this.showTimer&&(clearTimeout(this.showTimer),this.showTimer=null);}cancelHide(){this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null);}render(n){let i=Array.from(this.root.children);for(let F of i)F!==this.arrow&&F.remove();let a=DA(n.type,this.colors),l=re(n.type,this.colors),d=Zr(this.locale),p=De(n.type,d),B=b("div",{style:"display:flex;align-items:center;gap:8px;margin-bottom:8px;"}),w=b("span",{style:`
        padding:3px 10px;border-radius:9999px;
        font-size:11px;font-weight:600;
        color:${a};background:${l};
        letter-spacing:0.02em;
      `});E(w,p);let y=b("span",{style:`font-size:11px;color:${this.colors.textSecondary};margin-left:auto;`});E(y,Mr(n.createdAt,this.locale)),B.appendChild(w),B.appendChild(y);let C=b("div",{style:`font-size:13px;line-height:1.55;color:${this.colors.text};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;`});E(C,n.message),this.root.insertBefore(B,this.arrow),this.root.insertBefore(C,this.arrow);}position(n){let i=this.root.getBoundingClientRect(),a=10,l=n.top-i.height-a,d=n.left+n.width/2-i.width/2,p=true;l<8&&(l=n.bottom+a,p=false),d=Math.max(8,Math.min(d,window.innerWidth-i.width-8)),this.root.style.top=`${l}px`,this.root.style.left=`${d}px`;let B=Math.max(16,Math.min(n.left+n.width/2-d-6,i.width-22));p?this.arrow.style.cssText=`
        position:absolute;
        width:12px;height:12px;
        background:${this.colors.glassBgHeavy};
        border-right:1px solid ${this.colors.glassBorder};
        border-bottom:1px solid ${this.colors.glassBorder};
        transform:rotate(45deg);
        pointer-events:none;
        bottom:-6px;
        left:${B}px;
      `:this.arrow.style.cssText=`
        position:absolute;
        width:12px;height:12px;
        background:${this.colors.glassBgHeavy};
        border-left:1px solid ${this.colors.glassBorder};
        border-top:1px solid ${this.colors.glassBorder};
        transform:rotate(45deg);
        pointer-events:none;
        top:-6px;
        left:${B}px;
      `;}contains(n){return this.root.contains(n)}destroy(){this.cancelShow(),this.cancelHide(),this.root.remove();}};var _t=null;function TB(s){return s===void 0||s===false?{console:false,network:false,maxConsoleEntries:50,maxNetworkEntries:20}:s===true?{console:true,network:true,maxConsoleEntries:50,maxNetworkEntries:20}:{console:s.console!==false,network:s.network!==false,maxConsoleEntries:typeof s.maxConsoleEntries=="number"?s.maxConsoleEntries:50,maxNetworkEntries:typeof s.maxNetworkEntries=="number"?s.maxNetworkEntries:20}}function Gt(){let s=()=>{};return {destroy:s,open:s,close:s,refresh:s,focusFeedback:()=>false,on:()=>s,off:s}}function Tl(){try{return process.env.NODE_ENV}catch{return}}function DB(s){return s===void 0||s===false?{enabled:false,param:"siteping"}:s===true?{enabled:true,param:"siteping"}:{enabled:true,param:s.param??"siteping"}}function Dl(s){if(typeof window>"u"||typeof document>"u")return s.onSkip?.("ssr"),Gt();let n=s.debug?(...S)=>console.debug("[siteping]",...S):()=>{};if(_t)return n("initSiteping() called more than once \u2014 returning existing instance"),_t;if(!s.forceShow&&Tl()==="production")return s.onSkip?.("production"),Gt();let i=typeof s.minViewportWidth=="number"&&Number.isFinite(s.minViewportWidth)?s.minViewportWidth:768;if(!s.forceShow&&window.innerWidth<i){let S="mobile";return s.onSkip?.(S),Gt()}if(!s.store&&(!s.endpoint||typeof s.endpoint!="string"))return console.error("[siteping] Missing 'endpoint' or 'store' in config. Provide an endpoint like '/api/siteping' or a SitepingStore instance."),Gt();if(!s.projectName||typeof s.projectName!="string")return console.error("[siteping] Missing or invalid 'projectName' in config. Expected a non-empty string."),Gt();let a=s.locale??"en",l=a==="en"?Promise.resolve():exports.loadLocale(a).catch(()=>{}),d=Zr(a),p=s.scopeAnnotationsByUrl??true,B=()=>{try{let S=s.getPageScope?.();if(S)return S}catch(S){n("getPageScope() threw, falling back to pathname:",S);}return {url:window.location.pathname,urlPattern:null}};n("Initializing widget",{projectName:s.projectName,theme:s.theme??"light",locale:a,scopeAnnotationsByUrl:p});let w=TB(s.captureDiagnostics),y=w.console?new jr(w.maxConsoleEntries):null,C=w.network?new zr(w.maxNetworkEntries):null,F=ya(s.accentColor,s.theme),Q=new Kt,U=new Kt,M=(()=>{if(s.store)return new on(s.store,s.projectName);let S=s.endpoint;if(typeof S!="string"||S.length===0)throw new Error("[siteping] internal invariant: endpoint must be a non-empty string in HTTP mode");return new $r(S,s.projectName,{apiKey:s.apiKey,headers:s.headers})})();s.onOpen&&Q.on("open",s.onOpen),s.onClose&&Q.on("close",s.onClose),s.onFeedbackSent&&Q.on("feedback:sent",s.onFeedbackSent),s.onError&&Q.on("feedback:error",s.onError),s.onAnnotationStart&&Q.on("annotation:start",s.onAnnotationStart),s.onAnnotationEnd&&Q.on("annotation:end",s.onAnnotationEnd);let G={"feedback:sent":()=>Q.on("feedback:sent",S=>U.emit("feedback:sent",S)),"feedback:deleted":()=>Q.on("feedback:deleted",S=>U.emit("feedback:deleted",S)),"feedback:error":()=>Q.on("feedback:error",S=>U.emit("feedback:error",S)),"panel:open":()=>Q.on("open",()=>U.emit("panel:open")),"panel:close":()=>Q.on("close",()=>U.emit("panel:close")),"annotation:start":()=>Q.on("annotation:start",()=>U.emit("annotation:start")),"annotation:end":()=>Q.on("annotation:end",()=>U.emit("annotation:end"))};for(let S of Object.values(G))S();Q.on("open",()=>n("Panel opened")),Q.on("close",()=>n("Panel closed")),Q.on("feedback:sent",S=>n("Feedback sent",S.id)),Q.on("feedback:error",S=>n("Feedback failed",S.message)),Q.on("annotation:start",()=>n("Annotation started")),Q.on("annotation:end",()=>n("Annotation ended"));let R=document.createElement("siteping-widget");R.style.cssText=`position:fixed;z-index:${2147483647};`;let j=Tl()==="test"?"open":"closed",k=R.attachShadow({mode:j});if("adoptedStyleSheets"in ShadowRoot.prototype){let S=new CSSStyleSheet;S.replaceSync(ni(F)),k.adoptedStyleSheets=[S];}else {let S=document.createElement("style");S.textContent=ni(F),k.appendChild(S);}document.body.appendChild(R);let X=ha(R),_=document.createElement("div");_.setAttribute("role","status"),_.setAttribute("aria-live","polite"),_.setAttribute("aria-atomic","true"),_.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;",document.body.appendChild(_);let z=new Bn(F,a),nA=new sn(F,z,Q,d,_),aA=new An(k,s,Q,d);Q.on("markers:changed",S=>aA.updateBadge(S));let sA=null,lA=null,SA=false,Ke=0;async function Vt(){return SA?null:sA||(lA||(lA=Promise.resolve().then(()=>(Ll(),Sl)).then(S=>SA?null:(sA=new S.Panel(k,F,Q,M,s.projectName,nA,d,a,{getScope:B,scopeAnnotationsByUrl:p}),sA))),lA)}if(typeof window<"u"){let S=()=>{SA||Vt();},tA=window.requestIdleCallback;typeof tA=="function"?tA(S):setTimeout(S,200);}let ne=false,fn=Q.on("panel:toggle",S=>{sA||(S?(ne=true,Vt().then(tA=>{tA&&ne&&tA.open(),ne=false;}).catch(tA=>n("Failed to lazy-load panel:",tA))):ne=false);}),Me=new Yr(F,Q,d,s.enableScreenshot??false,()=>X.getLastPageFocus()),Re=null;s.enableRightClickComment&&(Re=S=>{if(S.defaultPrevented)return;let tA=S.pointerType;tA===""||tA===void 0&&S.button!==2||S.shiftKey||S.ctrlKey||S.altKey||S.metaKey||S.composedPath().some(wA=>wA===R||wA instanceof Element&&(wA.hasAttribute("data-siteping-ignore")||wA.id==="siteping-markers"))||Me.isBusy||(S.preventDefault(),Me.startInstantAnnotation(S.clientX,S.clientY).catch(wA=>n("right-click annotation failed",wA)));},document.addEventListener("contextmenu",Re)),a!=="en"&&l.then(()=>{SA||(aA.refreshLabels(),Me.refreshLabels());});let rt=false,Xt=Q.on("annotation:complete",async S=>{if(rt){Q.emit("submission:cancelled");return}rt=true;try{let{annotation:tA,type:uA,message:wA,screenshotDataUrl:zA,screenshotRegion:se}=S,NA=s.identity??Ns();if(!NA){if(NA=await KB(k,d),!NA){Q.emit("submission:cancelled");return}Za(NA);}let FA=(()=>{try{return crypto.randomUUID()}catch{return `${Date.now()}-${Math.random().toString(36).slice(2)}`}})(),ie=B(),it=null;(y||C)&&(it={console:y?.getEntries()??[],network:C?.getEntries()??[]});let VA={projectName:s.projectName,type:uA,message:wA,url:ie.url,urlPattern:ie.urlPattern,viewport:`${window.innerWidth}x${window.innerHeight}`,userAgent:navigator.userAgent,authorName:NA.name,authorEmail:NA.email,annotations:[tA],clientId:FA,screenshotDataUrl:zA??null,screenshotRegion:se??null,diagnostics:it};try{let PA=await M.sendFeedback(VA);Q.emit("feedback:sent",PA),(!p||PA.url===ie.url)&&nA.addFeedback(PA,nA.count+1),_.textContent=d("feedback.sent.confirmation"),sA&&await sA.refresh();}catch(PA){Q.emit("feedback:error",PA instanceof Error?PA:new Error(String(PA))),_.textContent=d("feedback.error.message");}}finally{rt=false;}}),nt=B(),wn=p?{limit:20,url:nt.url}:{limit:20},st=DB(s.deepLink),Wt=++Ke;Promise.all([M.getFeedbacks(s.projectName,wn),l]).then(([{feedbacks:S}])=>{if(SA||Ke!==Wt)return;let tA=p?S.filter(uA=>uA.url===nt.url):S;if(nA.render(tA),st.enabled)try{let uA=new URLSearchParams(window.location.search).get(st.param);if(uA){let wA=nA.focusFeedback(uA);n(`deepLink ?${st.param}=${uA} ${wA?"focused":"did not match a visible feedback"}`);}}catch(uA){n("deepLink parsing failed:",uA);}}).catch(S=>{n("Failed to load initial markers:",S);}),s.endpoint&&Ta(s.endpoint,s.identity??Ns(),{apiKey:s.apiKey,headers:s.headers}).then(()=>n("Retry queue flushed")).catch(()=>{});let Yt=()=>{let S=++Ke;if(sA?.isCurrentlyOpen)return sA.refresh();let tA=B(),uA=p?{limit:20,url:tA.url}:{limit:20};return M.getFeedbacks(s.projectName,uA).then(({feedbacks:wA})=>{if(SA||S!==Ke||sA?.isCurrentlyOpen)return;let zA=p?wA.filter(se=>se.url===tA.url):wA;nA.render(zA);})},be=null;if(s.watchNavigation!==false&&typeof window<"u"&&typeof history<"u"){let S=FA=>`${FA.url}
${FA.urlPattern??""}`,tA=S(nt),uA=()=>{if(SA)return;let FA=S(B());if(FA===tA)return;let ie=tA;tA=FA,n("SPA navigation detected \u2014 refreshing feedbacks for new scope"),Yt().catch(()=>{tA===FA&&(tA=ie);});},wA=history.pushState,zA=history.replaceState,se=function(...FA){wA.apply(this,FA),uA();},NA=function(...FA){zA.apply(this,FA),uA();};history.pushState=se,history.replaceState=NA,window.addEventListener("popstate",uA),window.addEventListener("hashchange",uA),be=()=>{window.removeEventListener("popstate",uA),window.removeEventListener("hashchange",uA),history.pushState===se&&(history.pushState=wA),history.replaceState===NA&&(history.replaceState=zA);};}return _t={destroy:()=>{n("Destroying widget"),Re&&document.removeEventListener("contextmenu",Re),SA=true,ne=false,be?.(),X.destroy(),Xt(),fn(),aA.destroy(),sA?.destroy(),Me.destroy(),nA.destroy(),z.destroy(),y?.dispose(),C?.dispose(),Q.removeAll(),U.removeAll(),_.remove(),R.remove(),_t=null;},open:()=>{Q.emit("panel:toggle",true);},close:()=>{sA?sA.close():ne=false;},focusFeedback:S=>nA.focusFeedback(S),refresh:()=>{Yt().catch(()=>{});},on:(S,tA)=>U.on(S,tA),off:(S,tA)=>{U.off(S,tA);}},_t}function KB(s,n){return new Promise(i=>{let a=s.activeElement??document.activeElement,l=s.host;l.parentNode&&l.parentNode.appendChild(l);let d=document.createElement("div");d.style.cssText=`
      position:fixed;inset:0;
      background:var(--sp-identity-overlay);
      backdrop-filter:blur(8px);
      -webkit-backdrop-filter:blur(8px);
      display:flex;align-items:center;justify-content:center;
      z-index:${2147483647};
      opacity:0;transition:opacity 0.25s ease;
    `;let p=document.createElement("div");p.style.cssText=`
      width:340px;padding:28px;border-radius:var(--sp-radius-xl);
      background:var(--sp-identity-bg);
      backdrop-filter:blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter:blur(var(--sp-blur-heavy));
      border:1px solid var(--sp-glass-border);
      box-shadow:0 16px 48px var(--sp-shadow), 0 8px 16px var(--sp-shadow);
      font-family:var(--sp-font, "Inter",system-ui,-apple-system,sans-serif);
      color:var(--sp-text);
      transform:translateY(12px) scale(0.97);
      transition:transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      -webkit-font-smoothing:antialiased;
    `;let B=`sp-identity-title-${Date.now()}`;p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.setAttribute("aria-labelledby",B);let w=document.createElement("div");w.className="sp-identity-title",w.id=B,w.textContent=n("identity.title"),w.style.marginBottom="20px";let y=`sp-identity-name-${Date.now()}`,C=`sp-identity-email-${Date.now()}`,F=document.createElement("label");F.className="sp-input-label",F.textContent=n("identity.nameLabel"),F.setAttribute("for",y);let Q=document.createElement("input");Q.className="sp-input",Q.id=y,Q.type="text",Q.placeholder=n("identity.namePlaceholder"),Q.style.marginBottom="14px";let U=document.createElement("label");U.className="sp-input-label",U.textContent=n("identity.emailLabel"),U.setAttribute("for",C);let M=document.createElement("input");M.className="sp-input",M.id=C,M.type="email",M.placeholder=n("identity.emailPlaceholder");let G=document.createElement("div");G.style.cssText="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;";let R=_=>{d.removeEventListener("keydown",X),d.style.opacity="0",p.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{d.remove(),a?.focus(),i(_);},250);},j=document.createElement("button");j.className="sp-btn-ghost",j.textContent=n("identity.cancel"),j.addEventListener("click",()=>R(null));let k=document.createElement("button");k.className="sp-btn-primary",k.textContent=n("identity.submit"),k.addEventListener("click",()=>{let _=Q.value.trim(),z=M.value.trim();if(!(!_||!z)){if(!Ut(z)){M.style.borderColor="var(--sp-type-bug, #ef4444)";return}R({name:_,email:z});}});let O='input, button, [tabindex]:not([tabindex="-1"])',X=_=>{let z=_;if(z.key==="Escape"){R(null);return}if(z.key==="Tab"){let nA=Array.from(p.querySelectorAll(O));if(nA.length===0)return;let aA=nA[0],sA=nA[nA.length-1];if(!aA||!sA)return;let lA=s.activeElement;z.shiftKey?(lA===aA||!p.contains(lA))&&(z.preventDefault(),sA.focus()):(lA===sA||!p.contains(lA))&&(z.preventDefault(),aA.focus());}};d.addEventListener("keydown",X),d.addEventListener("click",_=>{_.target===d&&R(null);}),G.appendChild(j),G.appendChild(k),p.appendChild(w),p.appendChild(F),p.appendChild(Q),p.appendChild(U),p.appendChild(M),p.appendChild(G),d.appendChild(p),s.appendChild(d),requestAnimationFrame(()=>{d.style.opacity="1",p.style.transform="translateY(0) scale(1)",Q.focus();});})}jA();function vm(s){return Dl(s)}/*! Bundled license information:

html2canvas/dist/html2canvas.js:
  (*!
   * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   *)
  (*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** *)
*/exports.initSiteping=vm;return exports;})({});
