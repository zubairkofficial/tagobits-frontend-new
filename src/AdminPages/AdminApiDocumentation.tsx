import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { 
  FiPlus, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp, 
  FiSave, FiX, FiEye, FiEyeOff, FiCode, FiFileText,
  FiArrowUp, FiArrowDown
} from 'react-icons/fi';

interface ApiSection {
  id: string;
  product_id: string;
  title: string;
  slug: string;
  content: string | null;
  code_example: string | null;
  code_language: string;
  order: number;
}

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  order: number;
  is_published: boolean;
  sections?: ApiSection[];
}

const iconOptions = [
  { value: 'code', label: 'Code' },
  { value: 'credit-card', label: 'Credit Card' },
  { value: 'dollar', label: 'Dollar' },
  { value: 'shield', label: 'Shield' },
  { value: 'database', label: 'Database' },
  { value: 'server', label: 'Server' },
  { value: 'layers', label: 'Layers' },
  { value: 'zap', label: 'Zap' },
];

const languageOptions = [
  'javascript', 'python', 'bash', 'curl', 'json', 'typescript', 'php', 'ruby', 'java', 'csharp', 'go'
];

const AdminApiDocumentation: React.FC = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  
  // Product form state
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    description: '',
    icon: 'code',
    order: 0,
    is_published: false,
  });

  // Section form state
  const [showSectionForm, setShowSectionForm] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<ApiSection | null>(null);
  const [sectionForm, setSectionForm] = useState({
    title: '',
    slug: '',
    content: '',
    code_example: '',
    code_language: 'javascript',
    order: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/api-docs/admin/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load API documentation');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductWithSections = async (productId: string) => {
    try {
      const response = await axiosInstance.get(`/api-docs/admin/products/${productId}`);
      setProducts(prev => prev.map(p => p.id === productId ? response.data : p));
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Product handlers
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axiosInstance.put(`/api-docs/admin/products/${editingProduct.id}`, productForm);
        toast.success('Product updated successfully');
      } else {
        await axiosInstance.post('/api-docs/admin/products', productForm);
        toast.success('Product created successfully');
      }
      resetProductForm();
      fetchProducts();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      toast.error(err.response?.data?.detail || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axiosInstance.delete(`/api-docs/admin/products/${productId}`);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const togglePublish = async (product: ApiProduct) => {
    try {
      await axiosInstance.put(`/api-docs/admin/products/${product.id}`, {
        is_published: !product.is_published
      });
      toast.success(product.is_published ? 'Product unpublished' : 'Product published');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const resetProductForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      slug: '',
      description: '',
      icon: 'code',
      order: 0,
      is_published: false,
    });
  };

  const editProduct = (product: ApiProduct) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      icon: product.icon || 'code',
      order: product.order,
      is_published: product.is_published,
    });
    setShowProductForm(true);
  };

  // Section handlers
  const handleSectionSubmit = async (e: React.FormEvent, productId: string) => {
    e.preventDefault();
    try {
      if (editingSection) {
        await axiosInstance.put(`/api-docs/admin/sections/${editingSection.id}`, sectionForm);
        toast.success('Section updated successfully');
      } else {
        await axiosInstance.post('/api-docs/admin/sections', {
          ...sectionForm,
          product_id: productId
        });
        toast.success('Section created successfully');
      }
      resetSectionForm();
      fetchProductWithSections(productId);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      toast.error(err.response?.data?.detail || 'Failed to save section');
    }
  };

  const handleDeleteSection = async (sectionId: string, productId: string) => {
    try {
      await axiosInstance.delete(`/api-docs/admin/sections/${sectionId}`);
      toast.success('Section deleted successfully');
      fetchProductWithSections(productId);
    } catch (error) {
      toast.error('Failed to delete section');
    }
  };

  const resetSectionForm = () => {
    setShowSectionForm(null);
    setEditingSection(null);
    setSectionForm({
      title: '',
      slug: '',
      content: '',
      code_example: '',
      code_language: 'javascript',
      order: 0,
    });
  };

  const editSection = (section: ApiSection, productId: string) => {
    setEditingSection(section);
    setSectionForm({
      title: section.title,
      slug: section.slug,
      content: section.content || '',
      code_example: section.code_example || '',
      code_language: section.code_language,
      order: section.order,
    });
    setShowSectionForm(productId);
  };

  const toggleExpand = async (productId: string) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
      await fetchProductWithSections(productId);
    }
  };

  const moveSectionOrder = async (section: ApiSection, direction: 'up' | 'down', productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product?.sections) return;
    
    const sortedSections = [...product.sections].sort((a, b) => a.order - b.order);
    const currentIndex = sortedSections.findIndex(s => s.id === section.id);
    
    if (direction === 'up' && currentIndex > 0) {
      const swapSection = sortedSections[currentIndex - 1];
      await axiosInstance.put(`/api-docs/admin/sections/${section.id}`, { order: swapSection.order });
      await axiosInstance.put(`/api-docs/admin/sections/${swapSection.id}`, { order: section.order });
    } else if (direction === 'down' && currentIndex < sortedSections.length - 1) {
      const swapSection = sortedSections[currentIndex + 1];
      await axiosInstance.put(`/api-docs/admin/sections/${section.id}`, { order: swapSection.order });
      await axiosInstance.put(`/api-docs/admin/sections/${swapSection.id}`, { order: section.order });
    }
    
    fetchProductWithSections(productId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">API Documentation Management</h1>
          <p className="text-gray-600 mt-1">Create and manage API documentation for your products</p>
        </div>
        <button
          onClick={() => setShowProductForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-200 shadow-md"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showProductForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-primary-dark">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={resetProductForm} className="text-gray-500 hover:text-gray-700">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="e.g., TagoPay API"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL-friendly)</label>
                  <input
                    type="text"
                    value={productForm.slug}
                    onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="e.g., tagopay-api (auto-generated if empty)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    rows={3}
                    placeholder="Brief description of the API..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      value={productForm.icon}
                      onChange={(e) => setProductForm({ ...productForm, icon: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {iconOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                    <input
                      type="number"
                      value={productForm.order}
                      onChange={(e) => setProductForm({ ...productForm, order: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={productForm.is_published}
                    onChange={(e) => setProductForm({ ...productForm, is_published: e.target.checked })}
                    className="w-4 h-4 text-primary-dark rounded focus:ring-primary"
                  />
                  <label htmlFor="is_published" className="text-sm text-gray-700">Publish immediately</label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetProductForm}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    <FiSave /> {editingProduct ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products List */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <FiFileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No API Documentation Yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first API product</p>
          <button
            onClick={() => setShowProductForm(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow-md"
          >
            <FiPlus /> Add First Product
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Product Header */}
              <div className="p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => toggleExpand(product.id)}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${product.is_published ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                    <FiCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">/{product.slug}</p>
                  </div>
                  {expandedProduct === product.id ? <FiChevronUp className="text-primary" /> : <FiChevronDown className="text-primary" />}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(product)}
                    className={`p-2 rounded-lg transition ${product.is_published ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    title={product.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {product.is_published ? <FiEye /> : <FiEyeOff />}
                  </button>
                  <button
                    onClick={() => editProduct(product)}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              {/* Expanded Sections */}
              <AnimatePresence>
                {expandedProduct === product.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-700">Documentation Sections</h4>
                        <button
                          onClick={() => setShowSectionForm(product.id)}
                          className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                        >
                          <FiPlus /> Add Section
                        </button>
                      </div>

                      {/* Section Form */}
                      {showSectionForm === product.id && (
                        <motion.form
                          onSubmit={(e) => handleSectionSubmit(e, product.id)}
                          className="bg-gray-50 rounded-lg p-4 mb-4 space-y-4"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                              <input
                                type="text"
                                value={sectionForm.title}
                                onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="e.g., Authentication"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                              <input
                                type="text"
                                value={sectionForm.slug}
                                onChange={(e) => setSectionForm({ ...sectionForm, slug: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Auto-generated if empty"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea
                              value={sectionForm.content}
                              onChange={(e) => setSectionForm({ ...sectionForm, content: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                              rows={4}
                              placeholder="Documentation content..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code Example</label>
                            <textarea
                              value={sectionForm.code_example}
                              onChange={(e) => setSectionForm({ ...sectionForm, code_example: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-primary focus:border-primary bg-[#1e1e2e] text-gray-100"
                              rows={6}
                              placeholder="// Your code example here..."
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Code Language</label>
                              <select
                                value={sectionForm.code_language}
                                onChange={(e) => setSectionForm({ ...sectionForm, code_language: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                              >
                                {languageOptions.map(lang => (
                                  <option key={lang} value={lang}>{lang}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                              <input
                                type="number"
                                value={sectionForm.order}
                                onChange={(e) => setSectionForm({ ...sectionForm, order: parseInt(e.target.value) || 0 })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              type="button"
                              onClick={resetSectionForm}
                              className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="flex items-center gap-1 px-4 py-2 text-sm bg-gradient-to-r from-[#1952A8] to-primary-dark text-white rounded-lg hover:opacity-90 transition"
                            >
                              <FiSave /> {editingSection ? 'Update' : 'Add'} Section
                            </button>
                          </div>
                        </motion.form>
                      )}

                      {/* Sections List */}
                      {product.sections && product.sections.length > 0 ? (
                        <div className="space-y-2">
                          {product.sections.sort((a, b) => a.order - b.order).map((section, index) => (
                            <div
                              key={section.id}
                              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-mono text-gray-400">{index + 1}</span>
                                <div>
                                  <p className="font-medium text-gray-800">{section.title}</p>
                                  <p className="text-xs text-gray-500">/{section.slug}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => moveSectionOrder(section, 'up', product.id)}
                                  className="p-1 text-gray-500 hover:text-primary"
                                  disabled={index === 0}
                                >
                                  <FiArrowUp />
                                </button>
                                <button
                                  onClick={() => moveSectionOrder(section, 'down', product.id)}
                                  className="p-1 text-gray-500 hover:text-primary"
                                  disabled={index === product.sections!.length - 1}
                                >
                                  <FiArrowDown />
                                </button>
                                <button
                                  onClick={() => editSection(section, product.id)}
                                  className="p-1 text-primary hover:text-primary-dark"
                                >
                                  <FiEdit2 />
                                </button>
                                <button
                                  onClick={() => handleDeleteSection(section.id, product.id)}
                                  className="p-1 text-red-600 hover:text-red-700"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-4">No sections yet. Add your first section!</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminApiDocumentation;
