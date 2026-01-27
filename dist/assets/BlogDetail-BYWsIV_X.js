import{a as i,u as c,j as e,m as o}from"./index-Bfqovemm.js";import{b as n}from"./blogsData-BTY9zSzp.js";const x=()=>{const{slug:a}=i(),s=c(),l=n.find(t=>t.slug===a);if(!l)return e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-[#FBFDFF]",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold mb-4",children:"Blog Not Found"}),e.jsx("button",{onClick:()=>s("/blogs"),className:"text-primary font-bold hover:underline",children:"Return to Blogs"})]})});const r=n.filter(t=>t.slug!==a&&t.category===l.category).slice(0,3);return e.jsxs("div",{className:"bg-[#FBFDFF] min-h-screen pb-20",children:[e.jsxs("div",{className:"relative h-[400px] md:h-[600px] w-full overflow-hidden",children:[e.jsx("img",{src:l.image_url,alt:l.title,className:"w-full h-full object-cover"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80"}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-[1900px] mx-auto lg:px-20",children:e.jsxs(o.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},className:"max-w-4xl",children:[e.jsx("span",{className:"inline-block bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl mb-6 uppercase tracking-wider",children:l.category}),e.jsx("h1",{className:"text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight",children:l.title}),e.jsxs("div",{className:"flex items-center gap-6 text-gray-200 text-sm md:text-base",children:[e.jsxs("span",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold",children:l.author.charAt(0)}),l.author]}),e.jsx("span",{children:l.date})]})]})})]}),e.jsxs("div",{className:"max-w-[1900px] mx-auto px-4 lg:px-20 -mt-10 relative z-10 flex flex-col lg:flex-row gap-12",children:[e.jsxs(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},className:"w-full lg:w-2/3 bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 border border-gray-100",children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:`
                        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
                            font-weight: 800 !important;
                            color: #111827;
                            margin-top: 2rem;
                            margin-bottom: 1rem;
                            line-height: 1.2;
                        }
                        .blog-content h1 { font-size: 2.5rem; }
                        .blog-content h2 { font-size: 2rem; }
                        .blog-content h3 { font-size: 1.75rem; }
                        .blog-content h4 { font-size: 1.5rem; }
                        .blog-content p {
                            font-size: 1.15rem;
                            line-height: 1.8;
                            margin-bottom: 1.5rem;
                            color: #374151;
                        }
                        .blog-content ul, .blog-content ol {
                            margin-bottom: 1.5rem;
                            padding-left: 1.5rem;
                        }
                        .blog-content li {
                            font-size: 1.15rem;
                            margin-bottom: 0.5rem;
                            list-style: disc;
                        }
                        .blog-content strong {
                            font-weight: 700;
                            color: #111827;
                        }
                    `}}),e.jsx("div",{className:"blog-content prose prose-lg prose-primary max-w-none text-gray-700 leading-relaxed overflow-hidden tiptap-content",dangerouslySetInnerHTML:{__html:l.content}}),e.jsxs("div",{className:"mt-16 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6",children:[e.jsx("div",{className:"flex items-center gap-4",children:e.jsx("button",{onClick:()=>s("/blogs"),className:"flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-medium border border-gray-100 px-6 py-3 rounded-2xl cursor-pointer",children:"← Back to Feed"})}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("span",{className:"text-gray-400 font-medium",children:"Share:"}),["Twitter","LinkedIn","Facebook"].map(t=>e.jsx("button",{className:"w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-400 text-xs font-bold cursor-pointer",children:t.charAt(0)},t))]})]})]}),e.jsx("div",{className:"w-full lg:w-1/3",children:e.jsxs("div",{className:"sticky top-24",children:[e.jsxs("div",{className:"bg-white rounded-3xl p-8 border border-gray-100 mb-8",children:[e.jsx("h3",{className:"text-xl font-bold mb-6",children:"Related Articles"}),e.jsx("div",{className:"flex flex-col gap-6",children:r.length>0?r.map(t=>e.jsxs("div",{className:"flex gap-4 group cursor-pointer",onClick:()=>{s(`/blogs/${t.slug}`),window.scrollTo({top:0,behavior:"smooth"})},children:[e.jsx("div",{className:"w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm",children:e.jsx("img",{src:t.image_url,alt:t.title,className:"w-full h-full object-cover group-hover:scale-110 transition-transform"})}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug",children:t.title}),e.jsx("p",{className:"text-xs text-gray-400 mt-2",children:t.date})]})]},t.id)):e.jsx("p",{className:"text-gray-400",children:"No related articles in this category."})})]}),e.jsxs("div",{className:"bg-gradient-to-br from-[#1952A8] to-[#0D2447] rounded-3xl p-8 text-white",children:[e.jsx("h3",{className:"text-2xl font-bold mb-4",children:"Don't carry cash, TagoCash!"}),e.jsx("p",{className:"text-gray-300 text-sm mb-8 leading-relaxed",children:"Experience the future of payments with our secure digital wallet. Available worldwide."}),e.jsx("button",{className:"w-full bg-white text-primary py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors shadow-lg shadow-black/10",children:"Download App"})]})]})})]})]})};export{x as default};
