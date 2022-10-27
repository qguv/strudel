"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var t=require("react"),te=require("@uiw/react-codemirror"),C=require("@codemirror/view"),A=require("@codemirror/state"),ae=require("@codemirror/lang-javascript"),l=require("@lezer/highlight"),re=require("@uiw/codemirror-themes"),oe=require("react-hook-inview"),se=require("@strudel.cycles/eval"),y=require("@strudel.cycles/tone"),j=require("@strudel.cycles/core"),ne=require("@strudel.cycles/webaudio"),E=require("@strudel.cycles/midi");function $(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var g=$(t),ce=$(te),ie=re.createTheme({theme:"dark",settings:{background:"#222",foreground:"#75baff",caret:"#ffcc00",selection:"rgba(128, 203, 196, 0.5)",selectionMatch:"#036dd626",lineHighlight:"#8a91991a",gutterBackground:"transparent",gutterForeground:"#676e95"},styles:[{tag:l.tags.keyword,color:"#c792ea"},{tag:l.tags.operator,color:"#89ddff"},{tag:l.tags.special(l.tags.variableName),color:"#eeffff"},{tag:l.tags.typeName,color:"#f07178"},{tag:l.tags.atom,color:"#f78c6c"},{tag:l.tags.number,color:"#ff5370"},{tag:l.tags.definition(l.tags.variableName),color:"#82aaff"},{tag:l.tags.string,color:"#c3e88d"},{tag:l.tags.special(l.tags.string),color:"#f07178"},{tag:l.tags.comment,color:"#7d8799"},{tag:l.tags.variableName,color:"#f07178"},{tag:l.tags.tagName,color:"#ff5370"},{tag:l.tags.bracket,color:"#a2a1a4"},{tag:l.tags.meta,color:"#ffcb6b"},{tag:l.tags.attributeName,color:"#c792ea"},{tag:l.tags.propertyName,color:"#c792ea"},{tag:l.tags.className,color:"#decb6b"},{tag:l.tags.invalid,color:"#ffffff"}]});const P=A.StateEffect.define(),le=A.StateField.define({create(){return C.Decoration.none},update(e,o){try{for(let s of o.effects)if(s.is(P))if(s.value){const u=C.Decoration.mark({attributes:{style:"background-color: #FFCA2880"}});e=C.Decoration.set([u.range(0,o.newDoc.length)])}else e=C.Decoration.set([]);return e}catch(s){return console.warn("flash error",s),e}},provide:e=>C.EditorView.decorations.from(e)}),K=e=>{e.dispatch({effects:P.of(!0)}),setTimeout(()=>{e.dispatch({effects:P.of(!1)})},200)},L=A.StateEffect.define(),ue=A.StateField.define({create(){return C.Decoration.none},update(e,o){try{for(let s of o.effects)if(s.is(L)){const u=s.value.map(d=>(d.context.locations||[]).map(({start:i,end:c})=>{const f=d.context.color||"#FFCA28";let r=o.newDoc.line(i.line).from+i.column,a=o.newDoc.line(c.line).from+c.column;const w=o.newDoc.length;return r>w||a>w?void 0:C.Decoration.mark({attributes:{style:`outline: 1.5px solid ${f};`}}).range(r,a)})).flat().filter(Boolean)||[];e=C.Decoration.set(u,!0)}return e}catch{return C.Decoration.set([])}},provide:e=>C.EditorView.decorations.from(e)}),de=[ae.javascript(),ie,ue,le];function Q({value:e,onChange:o,onViewChanged:s,onSelectionChange:u,options:d,editorDidMount:i}){const c=t.useCallback(a=>{o?.(a)},[o]),f=t.useCallback(a=>{s?.(a)},[s]),r=t.useCallback(a=>{a.selectionSet&&u&&u?.(a.state.selection)},[u]);return g.default.createElement(g.default.Fragment,null,g.default.createElement(ce.default,{value:e,onChange:c,onCreateEditor:f,onUpdate:r,extensions:de}))}function J(e){const{onEvent:o,onQuery:s,onSchedule:u,ready:d=!0,onDraw:i}=e,[c,f]=t.useState(!1),r=1,a=()=>Math.floor(y.Tone.getTransport().seconds/r),w=(b=a())=>{const S=new j.TimeSpan(b,b+1),q=s?.(new j.State(S))||[];u?.(q,b);const R=S.begin.valueOf();y.Tone.getTransport().cancel(R);const M=(b+1)*r-.5,N=Math.max(y.Tone.getTransport().seconds,M)+.1;y.Tone.getTransport().schedule(()=>{w(b+1)},N),q?.filter(p=>p.part.begin.equals(p.whole?.begin)).forEach(p=>{y.Tone.getTransport().schedule(v=>{o(v,p,y.Tone.getContext().currentTime),y.Tone.Draw.schedule(()=>{i?.(v,p)},v)},p.part.begin.valueOf())})};t.useEffect(()=>{d&&w()},[o,u,s,i,d]);const k=async()=>{f(!0),await y.Tone.start(),y.Tone.getTransport().start("+0.1")},T=()=>{y.Tone.getTransport().pause(),f(!1)};return{start:k,stop:T,onEvent:o,started:c,setStarted:f,toggle:()=>c?T():k(),query:w,activeCycle:a}}function G(e){return t.useEffect(()=>(window.addEventListener("message",e),()=>window.removeEventListener("message",e)),[e]),t.useCallback(o=>window.postMessage(o,"*"),[])}let fe=()=>Math.floor((1+Math.random())*65536).toString(16).substring(1);const ge=e=>encodeURIComponent(btoa(e));function X({tune:e,defaultSynth:o,autolink:s=!0,onEvent:u,onDraw:d}){const i=t.useMemo(()=>fe(),[]),[c,f]=t.useState(e),[r,a]=t.useState(),[w,k]=t.useState(""),[T,_]=t.useState(),[b,S]=t.useState(!1),[q,R]=t.useState(""),[M,N]=t.useState(),p=t.useMemo(()=>c!==r||T,[c,r,T]),v=t.useCallback(m=>k(n=>n+`${n?`

`:""}${m}`),[]),W=t.useMemo(()=>{if(r&&!r.includes("strudel disable-highlighting"))return(m,n)=>d?.(m,n,r)},[r,d]),O=t.useMemo(()=>r&&r.includes("strudel hide-header"),[r]),H=t.useMemo(()=>r&&r.includes("strudel hide-console"),[r]),h=J({onDraw:W,onEvent:t.useCallback((m,n,ee)=>{try{u?.(n),n.context.logs?.length&&n.context.logs.forEach(v);const{onTrigger:x=ne.webaudioOutputTrigger}=n.context;x(m,n,ee,1)}catch(x){console.warn(x),x.message="unplayable event: "+x?.message,v(x.message)}},[u,v,o]),onQuery:t.useCallback(m=>{try{return M?.query(m)||[]}catch(n){return console.warn(n),n.message="query error: "+n.message,_(n),[]}},[M]),onSchedule:t.useCallback((m,n)=>Z(m),[]),ready:!!M&&!!r}),V=G(({data:{from:m,type:n}})=>{n==="start"&&m!==i&&(h.setStarted(!1),a(void 0))}),B=t.useCallback(async(m=c)=>{if(r&&!p){_(void 0),h.start();return}try{S(!0);const n=await se.evaluate(m);h.start(),V({type:"start",from:i}),N(()=>n.pattern),s&&(window.location.hash="#"+encodeURIComponent(btoa(c))),R(ge(c)),_(void 0),a(m),S(!1)}catch(n){n.message="evaluation error: "+n.message,console.warn(n),_(n)}},[r,p,c,h,s,i,V]),Z=(m,n)=>{m.length};return{hideHeader:O,hideConsole:H,pending:b,code:c,setCode:f,pattern:M,error:T,cycle:h,setPattern:N,dirty:p,log:w,togglePlay:()=>{h.started?h.stop():B()},setActiveCode:a,activateCode:B,activeCode:r,pushLog:v,hash:q}}function z(...e){return e.filter(Boolean).join(" ")}let F=[],I;function Y({view:e,pattern:o,active:s}){t.useEffect(()=>{if(e)if(o&&s){let d=function(){try{const i=y.Tone.getTransport().seconds,f=[Math.max(I||i,i-1/10),i+1/60];I=i+1/60,F=F.filter(a=>a.whole.end>i);const r=o.queryArc(...f).filter(a=>a.hasOnset());F=F.concat(r),e.dispatch({effects:L.of(F)})}catch{e.dispatch({effects:L.of([])})}u=requestAnimationFrame(d)},u=requestAnimationFrame(d);return()=>{cancelAnimationFrame(u)}}else F=[],e.dispatch({effects:L.of([])})},[o,s,e])}const me="_container_3i85k_1",he="_header_3i85k_5",be="_buttons_3i85k_9",pe="_button_3i85k_9",ve="_buttonDisabled_3i85k_17",ye="_error_3i85k_21",we="_body_3i85k_25";var D={container:me,header:he,buttons:be,button:pe,buttonDisabled:ve,error:ye,body:we};function U({type:e}){return g.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"sc-h-5 sc-w-5",viewBox:"0 0 20 20",fill:"currentColor"},{refresh:g.default.createElement("path",{fillRule:"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",clipRule:"evenodd"}),play:g.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"}),pause:g.default.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"})}[e])}function Me({tune:e,defaultSynth:o,hideOutsideView:s=!1,theme:u,init:d,onEvent:i,enableKeyboard:c}){const{code:f,setCode:r,pattern:a,activeCode:w,activateCode:k,evaluateOnly:T,error:_,cycle:b,dirty:S,togglePlay:q,stop:R}=X({tune:e,defaultSynth:o,autolink:!1,onEvent:i});t.useEffect(()=>{d&&T()},[e,d]);const[M,N]=t.useState(),[p,v]=oe.useInView({threshold:.01}),W=t.useRef(),O=t.useMemo(()=>((v||!s)&&(W.current=!0),v||W.current),[v,s]);return Y({view:M,pattern:a,active:b.started&&!w?.includes("strudel disable-highlighting")}),t.useLayoutEffect(()=>{if(c){const H=async h=>{(h.ctrlKey||h.altKey)&&(h.code==="Enter"?(h.preventDefault(),K(M),await k()):h.code==="Period"&&(b.stop(),h.preventDefault()))};return window.addEventListener("keydown",H,!0),()=>window.removeEventListener("keydown",H,!0)}},[c,a,f,k,b,M]),g.default.createElement("div",{className:D.container,ref:p},g.default.createElement("div",{className:D.header},g.default.createElement("div",{className:D.buttons},g.default.createElement("button",{className:z(D.button,b.started?"sc-animate-pulse":""),onClick:()=>q()},g.default.createElement(U,{type:b.started?"pause":"play"})),g.default.createElement("button",{className:z(S?D.button:D.buttonDisabled),onClick:()=>k()},g.default.createElement(U,{type:"refresh"}))),_&&g.default.createElement("div",{className:D.error},_.message)),g.default.createElement("div",{className:D.body},O&&g.default.createElement(Q,{value:f,onChange:r,onViewChanged:N})))}function Ee(e){const{ready:o,connected:s,disconnected:u}=e,[d,i]=t.useState(!0),[c,f]=t.useState(E.WebMidi?.outputs||[]);return t.useEffect(()=>{E.enableWebMidi().then(()=>{E.WebMidi.addListener("connected",a=>{f([...E.WebMidi.outputs]),s?.(E.WebMidi,a)}),E.WebMidi.addListener("disconnected",a=>{f([...E.WebMidi.outputs]),u?.(E.WebMidi,a)}),o?.(E.WebMidi),i(!1)}).catch(a=>{if(a){console.error(a),console.warn("Web Midi could not be enabled..");return}})},[o,s,u,c]),{loading:d,outputs:c,outputByName:a=>E.WebMidi.getOutputByName(a)}}exports.CodeMirror=Q;exports.MiniRepl=Me;exports.cx=z;exports.flash=K;exports.useCycle=J;exports.useHighlighting=Y;exports.usePostMessage=G;exports.useRepl=X;exports.useWebMidi=Ee;
