import{r as l,j as a,m as n}from"./index-B9ijupVs.js";import{u as y}from"./useHomeContent-CiYR-dzc.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),f=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,r)=>r?r.toUpperCase():i.toLowerCase()),m=e=>{const t=f(e);return t.charAt(0).toUpperCase()+t.slice(1)},p=(...e)=>e.filter((t,i,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===i).join(" ").trim(),w=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=l.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:r,className:o="",children:s,iconNode:x,...d},g)=>l.createElement("svg",{ref:g,...v,width:t,height:t,stroke:e,strokeWidth:r?Number(i)*24/Number(t):i,className:p("lucide",o),...!s&&!w(d)&&{"aria-hidden":"true"},...d},[...x.map(([h,u])=>l.createElement(h,u)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=(e,t)=>{const i=l.forwardRef(({className:r,...o},s)=>l.createElement(k,{ref:s,iconNode:t,className:p(`lucide-${b(m(e))}`,`lucide-${e}`,r),...o}));return i.displayName=m(e),i};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],C=c("clock",j);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],_=c("dollar-sign",N);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],A=c("eye",M);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4",key:"1nerag"}],["path",{d:"M14 13.12c0 2.38 0 6.38-1 8.88",key:"o46ks0"}],["path",{d:"M17.29 21.02c.12-.6.43-2.3.5-3.02",key:"ptglia"}],["path",{d:"M2 12a10 10 0 0 1 18-6",key:"ydlgp0"}],["path",{d:"M2 16h.01",key:"1gqxmh"}],["path",{d:"M21.8 16c.2-2 .131-5.354 0-6",key:"drycrb"}],["path",{d:"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2",key:"1tidbn"}],["path",{d:"M8.65 22c.21-.66.45-1.32.57-2",key:"13wd9y"}],["path",{d:"M9 6.8a6 6 0 0 1 9 5.2v2",key:"1fr1j5"}]],H=c("fingerprint-pattern",E),R=()=>{const{getFieldValue:e}=y("tagobanksection"),t=e("fastSectionTitle")||"TagoCash is",i=[{icon:C,heading:e("fastHeading")||"Fast",description:e("fastDescription")||"Real time transactions"},{icon:_,heading:e("affordableHeading")||"Affordable",description:e("affordableDescription")||"Free transfer to partners"},{icon:H,heading:e("secureHeading")||"Secure",description:e("secureDescription")||"Encrypted blockchain transmitted and access by your biometric"},{icon:A,heading:e("transparentHeading")||"Transparent",description:e("transparentDescription")||"No Hidden fees, what you see is what you pay"}],r=e("videoUrl")||"/TagoCash_fast_section_video.webm";return a.jsx("div",{className:"min-h-screen bg-white relative overflow-hidden",children:a.jsx("div",{className:"container mx-auto px-4 py-12 lg:py-20 relative z-10",children:a.jsxs("div",{className:"w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[a.jsxs(n.h1,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:.6},viewport:{once:!0},className:"text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 tracking-tight",children:[t," ",a.jsx("span",{className:"text-blue-500",children:"F.A.S.T"})]}),a.jsx("div",{className:"w-full",children:a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8 justify-items-center items-stretch",children:i.map((o,s)=>a.jsxs(n.div,{initial:"hidden",whileInView:"visible",whileHover:"hover",viewport:{once:!0},variants:{hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.6,delay:.7+s*.1}},hover:{y:-15,backgroundColor:"rgba(224, 242, 254, 0.4)",boxShadow:"0 25px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",transition:{type:"spring",stiffness:300,damping:20}}},className:`group flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8\r
                    border-2 border-blue-400 rounded-2xl\r
                    bg-gradient-to-br from-blue-50 to-cyan-50\r
                    w-full max-w-[280px] sm:max-w-none min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[240px] xl:min-h-[260px]\r
                    cursor-pointer`,children:[a.jsx(n.div,{className:"mb-2 sm:mb-3 md:mb-4 p-2 sm:p-2.5 md:p-3 rounded-full bg-blue-100",variants:{hover:{scale:1.15,rotate:5,backgroundColor:"#DBEAFE",transition:{type:"spring",stiffness:300,damping:15}}},children:a.jsx(o.icon,{className:"w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-500 group-hover:text-blue-600 transition-colors duration-300",strokeWidth:1.5})}),a.jsx("h3",{className:"text-base sm:text-lg md:text-xl lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-black transition-colors duration-300",children:o.heading}),a.jsx("p",{className:"text-center text-gray-700 text-xs sm:text-sm md:text-sm lg:text-base group-hover:text-black transition-colors duration-300 px-1",children:o.description})]},s))})}),a.jsx(n.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!1,amount:.2},transition:{duration:.7,ease:"easeOut"},className:"flex justify-center items-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 mb-8 sm:mb-10 md:mb-12 lg:mb-16",children:a.jsx("img",{src:"/tago_plus.png",alt:"TagoCash Plus Logo",className:"w-auto h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 object-contain",style:{imageRendering:"crisp-edges",WebkitImageRendering:"-webkit-optimize-contrast",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",transform:"translateZ(0)",willChange:"transform"},loading:"eager",decoding:"async"})}),a.jsx(n.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!1,amount:.2},transition:{duration:.7,delay:.3,ease:"easeOut"},className:"flex flex-col items-center w-full px-2 sm:px-4",children:a.jsx("div",{className:"w-full rounded-2xl shadow-xl max-w-full sm:max-w-[850px] md:max-w-[1050px] lg:max-w-[800px] xl:max-w-[950px] overflow-hidden",style:{aspectRatio:"16/9",border:"1px solid rgba(27, 103, 186, 0.2)",backgroundColor:"black"},children:a.jsx("video",{src:r,className:"w-full h-full object-cover",autoPlay:!0,muted:!0,loop:!0,playsInline:!0,controls:!0,children:"Your browser does not support the video tag."})})})]})})})};export{R as default};
