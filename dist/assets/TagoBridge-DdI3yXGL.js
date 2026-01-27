import{r as n,j as a,m as o}from"./index-Bfqovemm.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),b=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,s)=>s?s.toUpperCase():r.toLowerCase()),m=t=>{const e=b(t);return e.charAt(0).toUpperCase()+e.slice(1)},p=(...t)=>t.filter((e,r,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===r).join(" ").trim(),w=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var f={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=n.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:c="",children:i,iconNode:x,...d},h)=>n.createElement("svg",{ref:h,...f,width:e,height:e,stroke:t,strokeWidth:s?Number(r)*24/Number(e):r,className:p("lucide",c),...!i&&!w(d)&&{"aria-hidden":"true"},...d},[...x.map(([g,u])=>n.createElement(g,u)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=(t,e)=>{const r=n.forwardRef(({className:s,...c},i)=>n.createElement(v,{ref:i,iconNode:e,className:p(`lucide-${y(m(t))}`,`lucide-${t}`,s),...c}));return r.displayName=m(t),r};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],j=l("clock",k);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],C=l("dollar-sign",N);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],M=l("eye",_);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4",key:"1nerag"}],["path",{d:"M14 13.12c0 2.38 0 6.38-1 8.88",key:"o46ks0"}],["path",{d:"M17.29 21.02c.12-.6.43-2.3.5-3.02",key:"ptglia"}],["path",{d:"M2 12a10 10 0 0 1 18-6",key:"ydlgp0"}],["path",{d:"M2 16h.01",key:"1gqxmh"}],["path",{d:"M21.8 16c.2-2 .131-5.354 0-6",key:"drycrb"}],["path",{d:"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2",key:"1tidbn"}],["path",{d:"M8.65 22c.21-.66.45-1.32.57-2",key:"13wd9y"}],["path",{d:"M9 6.8a6 6 0 0 1 9 5.2v2",key:"1fr1j5"}]],E=l("fingerprint-pattern",A),R=()=>{const t="TagoCash is",e=[{icon:j,heading:"Fast",description:"Real time transactions"},{icon:C,heading:"Affordable",description:"Free transfer to partners"},{icon:E,heading:"Secure",description:"Encrypted blockchain transmitted and access by your biometric"},{icon:M,heading:"Transparent",description:"No Hidden fees, what you see is what you pay"}];return a.jsx("div",{className:"min-h-screen bg-white relative overflow-hidden",children:a.jsx("div",{className:"container mx-auto px-4 py-12 lg:py-20 relative z-10",children:a.jsxs("div",{className:"w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[a.jsxs(o.h1,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:.6},viewport:{once:!0},className:"text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 tracking-tight",children:[t," ",a.jsx("span",{className:"text-blue-500",children:"F.A.S.T"})]}),a.jsx("div",{className:"w-full",children:a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8 justify-items-center items-stretch",children:e.map((r,s)=>a.jsxs(o.div,{initial:"hidden",whileInView:"visible",whileHover:"hover",viewport:{once:!0},variants:{hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.6,delay:.7+s*.1}},hover:{y:-15,backgroundColor:"rgba(224, 242, 254, 0.4)",boxShadow:"0 25px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",transition:{type:"spring",stiffness:300,damping:20}}},className:`group flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8\r
                    border-2 border-blue-400 rounded-2xl\r
                    bg-gradient-to-br from-blue-50 to-cyan-50\r
                    w-full max-w-[280px] sm:max-w-none min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[240px] xl:min-h-[260px]\r
                    cursor-pointer`,children:[a.jsx(o.div,{className:"mb-2 sm:mb-3 md:mb-4 p-2 sm:p-2.5 md:p-3 rounded-full bg-blue-100",variants:{hover:{scale:1.15,rotate:5,backgroundColor:"#DBEAFE",transition:{type:"spring",stiffness:300,damping:15}}},children:a.jsx(r.icon,{className:"w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-500 group-hover:text-blue-600 transition-colors duration-300",strokeWidth:1.5})}),a.jsx("h3",{className:"text-base sm:text-lg md:text-xl lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-black transition-colors duration-300",children:r.heading}),a.jsx("p",{className:"text-center text-gray-700 text-xs sm:text-sm md:text-sm lg:text-base group-hover:text-black transition-colors duration-300 px-1",children:r.description})]},s))})}),a.jsx(o.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!1,amount:.2},transition:{duration:.7,ease:"easeOut"},className:"flex justify-center items-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 mb-8 sm:mb-10 md:mb-12 lg:mb-16",children:a.jsx("img",{src:"/tago_plus.png",alt:"TagoCash Plus Logo",className:"w-auto h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 object-contain",style:{imageRendering:"crisp-edges",WebkitImageRendering:"-webkit-optimize-contrast",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",transform:"translateZ(0)",willChange:"transform"},loading:"eager",decoding:"async"})}),a.jsx(o.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!1,amount:.2},transition:{duration:.7,delay:.3,ease:"easeOut"},className:"flex flex-col items-center w-full px-2 sm:px-4",children:a.jsx("div",{className:"w-full rounded-2xl shadow-xl max-w-full sm:max-w-[850px] md:max-w-[1050px] lg:max-w-[800px] xl:max-w-[950px] overflow-hidden",style:{aspectRatio:"16/9",border:"1px solid rgba(27, 103, 186, 0.2)",backgroundColor:"black"},children:a.jsx("video",{src:"/TagoCash_fast_section_video.webm",className:"w-full h-full object-cover",autoPlay:!0,muted:!0,loop:!0,playsInline:!0,controls:!0,children:"Your browser does not support the video tag."})})})]})})})};export{R as default};
