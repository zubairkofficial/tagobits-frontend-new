import React, { useEffect, useState } from 'react';
import axiosInstance from '../helper/axios';
import { Loader } from '../components/Loader';
import { toast } from 'react-hot-toast';
import { FiHelpCircle, FiPlus, FiRefreshCw, FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaHeading, FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink, FaUnlink } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import '../styles/faq-accordion.css';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface ApiResponse {
  success: boolean;
  data: FAQ[];
  knowledge_base?: string;
  knowledge_base_error?: string;
}

const FAQAdminPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Enter FAQ answer here...',
      }),
    ],
    content: formData.answer,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setFormData(prev => ({ ...prev, answer: html }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  // Effect to update editor content when formData changes
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      if (formData.answer !== editor.getHTML()) {
        editor.commands.setContent(formData.answer);
      }
    }
  }, [editor, formData.answer]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>('/faqs');
      if (response.data.success) {
        setFaqs(response.data.data);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to fetch FAQs');
      toast.error('Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleAddFAQ = async () => {
    try {
      setIsSaving(true);
      const response = await axiosInstance.post('/faq', formData);
      setFaqs([...faqs, response.data.data]);
      setShowAddModal(false);
      setFormData({ question: '', answer: '' });
      if (editor) {
        editor.commands.setContent('');
      }
      
      // Show success message with knowledge base status
      let successMessage = 'FAQ added successfully';
      if (response.data.knowledge_base === 'updated') {
        successMessage += ' (Knowledge base updated)';
      } else if (response.data.knowledge_base === 'not_updated') {
        successMessage += ' (Knowledge base not updated)';
        if (response.data.knowledge_base_error) {
          console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
        }
      }
      
      toast.success(successMessage);
    } catch (error) {
      toast.error('Failed to add FAQ');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateFAQ = async () => {
    if (!currentFaq) return;
    try {
      setIsSaving(true);
      const response = await axiosInstance.patch(`/faq`, { ...formData, id: currentFaq.id });
      setFaqs(faqs.map(f => f.id === currentFaq.id ? response.data.data : f));
      setShowEditModal(false);
      
      // Show success message with knowledge base status
      let successMessage = 'FAQ updated successfully';
      if (response.data.knowledge_base === 'updated') {
        successMessage += ' (Knowledge base updated)';
      } else if (response.data.knowledge_base === 'not_updated') {
        successMessage += ' (Knowledge base not updated)';
        if (response.data.knowledge_base_error) {
          console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
        }
      }
      
      toast.success(successMessage);
    } catch (error) {
      toast.error('Failed to update FAQ');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteFAQ = async () => {
    if (!currentFaq) return;
    try {
      setIsDeleting(true);
      const response = await axiosInstance.delete(`/faq/${currentFaq.id}`);
      setFaqs(faqs.filter(f => f.id !== currentFaq.id));
      setShowDeleteModal(false);
      
      // Show success message with knowledge base status
      let successMessage = 'FAQ deleted successfully';
      if (response.data.knowledge_base === 'updated') {
        successMessage += ' (Knowledge base updated)';
      } else if (response.data.knowledge_base === 'not_updated') {
        successMessage += ' (Knowledge base not updated)';
        if (response.data.knowledge_base_error) {
          console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
        }
      }
      
      toast.success(successMessage);
    } catch (error) {
      toast.error('Failed to delete FAQ');
    } finally {
      setIsDeleting(false);
    }
  };

  const openEditModal = (faq: FAQ) => {
    setCurrentFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    if (editor) {
      editor.commands.setContent(faq.answer);
    }
    setShowEditModal(true);
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderEditorToolbar = () => (
    <div className="mb-4 flex flex-wrap gap-2">
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('heading', { level: 1 }) 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={!editor?.can().toggleHeading({ level: 1 })}
        title="Heading 1"
      >
        <FaHeading />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('heading', { level: 2 }) 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={!editor?.can().toggleHeading({ level: 2 })}
        title="Heading 2"
      >
        <FaHeading style={{ fontSize: '0.8em' }} />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('bold') 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor?.can().toggleBold()}
        title="Bold"
      >
        <FaBold />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('italic') 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editor?.can().toggleItalic()}
        title="Italic"
      >
        <FaItalic />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('underline') 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        disabled={!editor?.can().toggleUnderline()}
        title="Underline"
      >
        <FaUnderline />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('strike') 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        disabled={!editor?.can().toggleStrike()}
        title="Strikethrough"
      >
        <FaStrikethrough />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('bulletList') 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        disabled={!editor?.can().toggleBulletList()}
        title="Bullet List"
      >
        <FaListUl />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('orderedList') 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        disabled={!editor?.can().toggleOrderedList()}
        title="Numbered List"
      >
        <FaListOl />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive({ textAlign: 'left' }) 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
        disabled={!editor?.can().setTextAlign('left')}
        title="Align Left"
      >
        <FaAlignLeft />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive({ textAlign: 'center' }) 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
        disabled={!editor?.can().setTextAlign('center')}
        title="Align Center"
      >
        <FaAlignCenter />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive({ textAlign: 'right' }) 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
        disabled={!editor?.can().setTextAlign('right')}
        title="Align Right"
      >
        <FaAlignRight />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('link') 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => {
          const url = window.prompt('Enter the URL');
          if (url) {
            editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }
        }}
        disabled={!editor?.can().setLink({ href: '' })}
        title="Add Link"
      >
        <FaLink />
      </button>
      <button 
        type="button"
        className={`px-3 py-1 rounded ${
          editor?.isActive('link') 
            ? 'bg-gray-300 text-gray-800' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => editor?.chain().focus().unsetLink().run()}
        disabled={!editor?.isActive('link')}
        title="Remove Link"
      >
        <FaUnlink />
      </button>
    </div>
  );

  return (
    <motion.div className="p-6 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiHelpCircle className="text-primary" /> FAQ Management
          </h2>
          <p className="text-gray-500">Manage frequently asked questions</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors duration-200 shadow-sm"
            onClick={() => setShowAddModal(true)}
          >
            <FiPlus /> Add FAQ
          </button>
          <button 
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 shadow-sm"
            onClick={fetchFAQs}
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium">FAQ List ({faqs.length})</h3>
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="p-6 flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Question</th>
                  <th className="px-6 py-3 text-left">Answer</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredFAQs.map(faq => (
                  <tr key={faq.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 max-w-xs truncate">{faq.question}</td>
                    <td className="px-6 py-4 max-w-prose truncate" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openEditModal(faq)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setCurrentFaq(faq);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-xs flex items-center justify-center lg:justify-end lg:pr-30 xl:justify-center xl:pr-0 overflow-y-auto">
          <motion.div 
            className="bg-white sm:border border-gray-300 rounded-lg p-6 w-full max-w-lg lg:max-w-xl xl:max-w-3xl z-50 my-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Add New FAQ</h3>
            <div className="space-y-4">
              <div>
                <label>Question</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                />
              </div>
              <div>
                <label>Answer</label>
                {renderEditorToolbar()}
                <div 
                  className="border border-gray-300 rounded-md" 
                  style={{
                    minHeight: '72px',
                    maxHeight: '400px',
                    padding: '16px',
                    fontFamily: 'sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    resize: 'vertical',
                    overflow: 'auto'
                  }}
                >
                  <EditorContent editor={editor} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className={`py-3 px-4 cursor-pointer ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} 
                  onClick={() => setShowAddModal(false)}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button 
                  className={`flex gap-3 items-center py-3 px-4 rounded-lg transition-all bg-primary-dark text-white shadow-sm ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
                  onClick={handleAddFAQ}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding...</span>
                    </div>
                  ) : (
                    'Add FAQ'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {showEditModal && currentFaq && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center overflow-y-auto">
          <motion.div 
            className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-md z-50 my-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Edit FAQ</h3>
            <div className="space-y-4">
              <div>
                <label>Question</label>
                <input
                  className="w-full p-2 border rounded"
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                />
              </div>
              <div>
                <label>Answer</label>
                {renderEditorToolbar()}
                <div 
                  className="border border-gray-300 rounded-md" 
                  style={{
                    minHeight: '72px',
                    maxHeight: '400px',
                    padding: '16px',
                    fontFamily: 'sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    resize: 'vertical',
                    overflow: 'auto'
                  }}
                >
                  <EditorContent editor={editor} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className={`py-3 px-4 cursor-pointer ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`} 
                  onClick={() => setShowEditModal(false)}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button 
                  className={`flex gap-3 items-center py-3 px-4 rounded-lg transition-all bg-primary-dark text-white shadow-sm ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
                  onClick={handleUpdateFAQ}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </div>
                  ) : (
                    'Update FAQ'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentFaq && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center overflow-y-auto">
          <motion.div 
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-md my-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Delete FAQ</h3>
            <p>Are you sure you want to delete this FAQ?</p>
            <div className="mt-6 flex justify-end gap-2">
              <button 
                className={`py-3 px-4 cursor-pointer ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className={`flex gap-3 items-center py-3 px-4 rounded-lg transition-all bg-primary-dark text-white shadow-sm ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
                onClick={handleDeleteFAQ}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </div>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default FAQAdminPage;