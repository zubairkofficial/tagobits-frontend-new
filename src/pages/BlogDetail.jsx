import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogsData } from '../data/blogsData';

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const blog = blogsData.find(b => b.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FBFDFF]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
                    <button
                        onClick={() => navigate('/blogs')}
                        className="text-primary font-bold hover:underline"
                    >
                        Return to Blogs
                    </button>
                </div>
            </div>
        );
    }

    const relatedBlogs = blogsData.filter(b => b.slug !== slug && b.category === blog.category).slice(0, 3);

    return (
        <div className="bg-[#FBFDFF] min-h-screen pb-20">
            {/* Header / Hero */}
            <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
                <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-[1900px] mx-auto lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl mb-6 uppercase tracking-wider">
                            {blog.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-6 text-gray-200 text-sm md:text-base">
                            <span className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
                                    {blog.author.charAt(0)}
                                </div>
                                {blog.author}
                            </span>
                            <span>{blog.date}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-[1900px] mx-auto px-4 lg:px-20 -mt-10 relative z-10 flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full lg:w-2/3 bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 border border-gray-100"
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
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
                    `}} />
                    <div
                        className="blog-content prose prose-lg prose-primary max-w-none text-gray-700 leading-relaxed overflow-hidden tiptap-content"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/blogs')}
                                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-medium border border-gray-100 px-6 py-3 rounded-2xl cursor-pointer"
                            >
                                ← Back to Feed
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400 font-medium">Share:</span>
                            {['Twitter', 'LinkedIn', 'Facebook'].map(social => (
                                <button key={social} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-400 text-xs font-bold cursor-pointer">
                                    {social.charAt(0)}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar */}
                <div className="w-full lg:w-1/3">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 mb-8">
                            <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                            <div className="flex flex-col gap-6">
                                {relatedBlogs.length > 0 ? relatedBlogs.map(rel => (
                                    <div
                                        key={rel.id}
                                        className="flex gap-4 group cursor-pointer"
                                        onClick={() => {
                                            navigate(`/blogs/${rel.slug}`);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                                            <img src={rel.image_url} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                                {rel.title}
                                            </h4>
                                            <p className="text-xs text-gray-400 mt-2">{rel.date}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-gray-400">No related articles in this category.</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1952A8] to-[#0D2447] rounded-3xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">Don't carry cash, TagoCash!</h3>
                            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                                Experience the future of payments with our secure digital wallet. Available worldwide.
                            </p>
                            <button className="w-full bg-white text-primary py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors shadow-lg shadow-black/10">
                                Download App
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
