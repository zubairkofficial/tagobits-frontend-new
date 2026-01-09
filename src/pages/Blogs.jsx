import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogsData } from '../data/blogsData';
import blogHeaderImage from '../assets/home/worldwide/backimage.png'; // Using existing asset as placeholder or user specific one

const Blogs = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;

    // Filter categories
    const categories = ['all', ...new Set(blogsData.map(blog => blog.category).filter(Boolean))];

    // Filter logic
    const filteredBlogs = blogsData.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#FBFDFF] min-h-screen">
            {/* Header Section */}
            <div className="relative h-[250px] md:h-[350px] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[#1A52A8]">
                    <div
                        className="absolute inset-0 opacity-20 bg-cover bg-center"
                        style={{ backgroundImage: `url(${blogHeaderImage})` }}
                    ></div>
                </div>
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        Tago Blogs
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-100 text-lg max-w-2xl mx-auto"
                    >
                        Insights & Innovation at the Heart of Digital Finance
                    </motion.p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-[1900px] mx-auto px-4 lg:px-20 -mt-10 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:flex-grow">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Blogs Grid */}
            <div className="max-w-[1900px] mx-auto px-4 lg:px-20 py-16">
                {currentBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {currentBlogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.6 }}
                                whileHover={{
                                    y: -15,
                                    scale: 1.03,
                                    transition: { duration: 0.5, ease: "easeOut" }
                                }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group border border-gray-100 flex flex-col h-full cursor-pointer"
                                onClick={() => navigate(`/blogs/${blog.slug}`)}
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <motion.img
                                        src={blog.image_url}
                                        alt={blog.title}
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-primary text-xs font-bold px-4 py-2 rounded-xl shadow-lg z-10">
                                        {blog.category}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                                        <span>{blog.date}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>{blog.author}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#111827] mb-4 group-hover:text-primary transition-colors duration-500 line-clamp-2 leading-tight">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 line-clamp-3 text-[15px] leading-relaxed flex-grow">
                                        {blog.excerpt}
                                    </p>
                                    <motion.div
                                        whileHover={{ x: 8 }}
                                        className="text-primary font-bold flex items-center gap-2 transition-all duration-500"
                                    >
                                        Read Article <span className="text-xl">→</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 grayscale opacity-50">
                        <h3 className="text-2xl font-medium text-gray-400">No blogs found matching your criteria.</h3>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-20 gap-3">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`w-12 h-12 rounded-2xl font-bold transition-all ${currentPage === i + 1
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
