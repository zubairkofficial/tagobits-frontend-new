import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { blogsData } from '../../data/blogsData';

const HomeBlogs = () => {
    const navigate = useNavigate();

    // Show only the first 4 blogs on the home page
    const recentBlogs = blogsData.slice(0, 4);

    return (
        <div className="flex flex-col items-center justify-center bg-[#FBFDFF] py-16 px-4">
            <div className="max-w-[1900px] w-full mx-auto lg:px-20">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center md:text-left w-full"
                    >
                        <h2 className="text-[32px] md:text-[40px] font-bold text-[#111827] mb-4">
                            Latest Insights & Updates
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto md:mx-0">
                        Stay connected and updated. News, tips, and relevant stories about TagoCash and the industry
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {recentBlogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                transition: { duration: 0.4, ease: "easeOut" }
                            }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl cursor-pointer group flex flex-col h-full border border-gray-100 transition-all duration-500"
                            onClick={() => navigate(`/blogs/${blog.slug}`)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <motion.img
                                    src={blog.image_url}
                                    alt={blog.title}
                                    whileHover={{ scale: 1.15 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full backdrop-blur-sm z-10">
                                    {blog.category}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-xs text-gray-500 mb-2 font-medium">
                                    {blog.date} • {blog.author}
                                </div>
                                <h3 className="text-lg font-bold text-[#111827] mb-3 line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors duration-500 text-left">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow text-left">
                                    {blog.excerpt}
                                </p>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="text-primary font-semibold text-sm flex items-center transition-all duration-500"
                                >
                                    Read More <span className="ml-1">→</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-end pr-2">
                    <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => navigate('/blogs')}
                        className="text-primary font-bold text-lg flex items-center gap-2 hover:opacity-80 transition-all cursor-pointer"
                    >
                        See More <span className="text-2xl">→</span>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default HomeBlogs;
