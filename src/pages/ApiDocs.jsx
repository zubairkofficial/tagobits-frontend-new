import React, { useState, useEffect } from 'react';
import tagocashaxiosinstance from '../utils/tagocashaxiosinstance';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBook, FiCode, FiLayers, FiCheckCircle, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';

const ApiDocs = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [error, setError] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fetch all products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Use the configured axios instance which points to the correct environment
                const response = await tagocashaxiosinstance.get('/api-docs/products');
                const productsData = response.data;

                if (Array.isArray(productsData)) {
                    setProducts(productsData);
                    // If products exist, fetch the first one automatically
                    if (productsData.length > 0) {
                        fetchProductDetails(productsData[0].slug);
                    } else {
                        setLoading(false);
                    }
                } else {
                    console.error("API response is not an array:", productsData);
                    setProducts([]);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error fetching documentation products:", err);
                setError("Failed to load documentation. Please try again later.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const fetchProductDetails = async (slug) => {
        setLoadingProduct(true);
        try {
            const response = await tagocashaxiosinstance.get(`/api-docs/products/${slug}`);
            setSelectedProduct(response.data);
            setMobileMenuOpen(false); // Close mobile menu on selection
        } catch (err) {
            console.error(`Error fetching product details for ${slug}:`, err);
            // Don't set global error, just maybe show a toast or local error
        } finally {
            setLoading(false);
            setLoadingProduct(false);
        }
    };

    // Scroll to section helper
    const scrollToSection = (slug) => {
        const element = document.getElementById(slug);
        if (element) {
            // Offset for fixed header if needed
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    if (loading && !selectedProduct) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading Documentation...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20 px-4 text-center">
                <div className="bg-red-50 p-6 rounded-2xl max-w-md w-full border border-red-100">
                    <div className="text-red-500 text-5xl mb-4 flex justify-center">
                        <FiBook />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Documentation Not Found</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBFDFF] pt-20">
            {/* Header / Hero */}
            <div className="bg-white border-b border-gray-100 shadow-sm relative z-20">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 mb-2">
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                    Developer Resources
                                </span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-4xl mt-5 font-bold text-gray-900"
                            >
                                API Documentation
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-500 mt-5 max-w-xl text-lg">
                                Integate TagoBits services into your applications seamlessly with our comprehensive API reference.
                            </motion.p>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 border rounded-md text-gray-600 hover:bg-gray-50"
                            >
                                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 flex items-start gap-8 relative">
                {/* Left Sidebar - Products List */}
                <aside
                    className={`
                        fixed md:sticky top-[100px] left-0 bottom-0 w-[280px] bg-white md:bg-transparent z-40
                        transform transition-transform duration-300 ease-in-out border-r md:border-r-0 border-gray-200
                        md:translate-x-0 p-4 md:p-0 overflow-y-auto h-[calc(100vh-100px)]
                        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
                    `}
                >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
                            Products
                        </h3>
                        {products.length > 0 ? (
                            <div className="space-y-1">
                                {products.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => fetchProductDetails(product.slug)}
                                        className={`
                                            w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200
                                            ${selectedProduct?.id === product.id
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }
                                        `}
                                    >
                                        <FiBook className={selectedProduct?.id === product.id ? 'text-white' : 'text-gray-400'} />
                                        <span className="font-medium text-sm">{product.name}</span>
                                        {selectedProduct?.id === product.id && (
                                            <FiChevronRight className="ml-auto opacity-75" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-sm text-gray-400 px-2 py-4 italic">
                                No documentation found
                            </div>
                        )}
                    </div>

                    {/* Table of Contents for Current Product */}
                    {selectedProduct && selectedProduct.sections && selectedProduct.sections.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hidden md:block">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
                                On this page
                            </h3>
                            <div className="space-y-1 relative">
                                {/* Vertical line track */}
                                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gray-100 rounded-full"></div>

                                {selectedProduct.sections.map((section, index) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.slug)}
                                        className="w-full text-left pl-6 pr-2 py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-r-lg relative block transition-colors border-l-2 border-transparent hover:border-blue-300 -ml-[2px]"
                                    >
                                        <span className="truncate block">{section.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 w-full md:w-[calc(100%-320px)] min-h-[60vh] pb-20">
                    <AnimatePresence mode="wait">
                        {loadingProduct ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                            </motion.div>
                        ) : selectedProduct ? (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-10"
                            >
                                {/* Product Intro */}
                                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-[100px] -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">{selectedProduct.name}</h2>
                                    {selectedProduct.description && (
                                        <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                                            {selectedProduct.description}
                                        </p>
                                    )}
                                </div>

                                {/* Sections */}
                                {selectedProduct.sections && selectedProduct.sections.map((section) => (
                                    <div
                                        key={section.id}
                                        id={section.slug}
                                        className="scroll-mt-32 border-b border-gray-100 pb-12 last:border-0"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="h-8 w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {section.title}
                                            </h3>
                                        </div>

                                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                                            {/* Text Content */}
                                            <div className="prose prose-lg prose-blue text-gray-600 max-w-none">
                                                {section.content && (
                                                    <div dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />
                                                )}
                                            </div>

                                            {/* Code Block */}
                                            {section.code_example && (
                                                <div className="bg-[#1E293B] rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10 mt-4 lg:mt-0 sticky top-32">
                                                    <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-gray-700/50">
                                                        <div className="flex gap-2">
                                                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                                        </div>
                                                        <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                                                            {section.code_language || 'JAVASCRIPT'}
                                                        </div>
                                                    </div>
                                                    <div className="p-6 overflow-x-auto custom-scrollbar">
                                                        <pre className="font-mono text-sm leading-relaxed text-blue-100/90 whitespace-pre">
                                                            <code>{section.code_example}</code>
                                                        </pre>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {selectedProduct.sections?.length === 0 && (
                                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                        <p className="text-gray-400 text-lg">No sections available for this product yet.</p>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center">
                                <span className="bg-gray-100 p-4 rounded-full mb-4 text-gray-400">
                                    <FiLayers size={32} />
                                </span>
                                <h3 className="text-xl font-bold text-gray-900">Select a Product</h3>
                                <p className="text-gray-500 mt-2 max-w-sm">
                                    Choose a product from the sidebar to view its documentation and code examples.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default ApiDocs;
