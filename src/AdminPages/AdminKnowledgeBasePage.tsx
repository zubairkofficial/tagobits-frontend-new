import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaUndo, FaHeading, FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink, FaUnlink, FaUpload, FaPlus, FaEdit, FaTrash, FaFile, FaFileAlt, FaTimes } from 'react-icons/fa';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { Loader } from '../components/Loader';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import '../styles/terms-content.css';

interface KnowledgeBaseEntry {
  id: string;
  name: string;
  content?: string;
  description?: string;
  file_type: 'manual' | 'upload';
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  data: KnowledgeBaseEntry | KnowledgeBaseEntry[];
  detail?: string;
  knowledge_base?: string;
  knowledge_base_error?: string;
}

const AdminKnowledgeBasePage: React.FC = () => {
  const [entries, setEntries] = useState<KnowledgeBaseEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeBaseEntry | null>(null);
  const [formMode, setFormMode] = useState<'manual' | 'upload'>('manual');
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [entryToDelete, setEntryToDelete] = useState<KnowledgeBaseEntry | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        placeholder: 'Enter content here...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (editor && !editor.isDestroyed && formData.content) {
      editor.commands.setContent(formData.content);
    }
  }, [editor, formData.content]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>('/knowledge-base');
      if (response.data.success) {
        setEntries(response.data.data as KnowledgeBaseEntry[]);
      } else {
        setError('Failed to load knowledge base entries');
      }
    } catch (err: any) {
      setError('Failed to load knowledge base entries. Please try again later.');
      console.error('Error fetching knowledge base entries:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      content: '',
      description: ''
    });
    setSelectedFile(null);
    setEditingEntry(null);
    setShowForm(false);
    setFormMode('manual');
    if (editor) {
      editor.commands.setContent('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateManual = () => {
    setFormMode('manual');
    setShowForm(true);
    setEditingEntry(null);
    setFormData({
      name: '',
      content: '',
      description: ''
    });
    if (editor) {
      editor.commands.setContent('');
    }
  };

  const handleCreateUpload = () => {
    setFormMode('upload');
    setShowForm(true);
    setEditingEntry(null);
    setFormData({
      name: '',
      content: '',
      description: ''
    });
    setSelectedFile(null);
  };

  const handleEdit = (entry: KnowledgeBaseEntry) => {
    if (entry.file_type === 'upload') {
      toast.error('Cannot edit uploaded files. Delete and re-upload instead.');
      return;
    }
    
    setEditingEntry(entry);
    setFormMode('manual');
    setShowForm(true);
    setFormData({
      name: entry.name,
      content: entry.content || '',
      description: entry.description || ''
    });
    if (editor) {
      editor.commands.setContent(entry.content || '');
    }
  };

  const handleDelete = (entry: KnowledgeBaseEntry) => {
    setEntryToDelete(entry);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!entryToDelete) return;

    try {
      setDeleting(true);
      const response = await axiosInstance.delete<ApiResponse>(`/knowledge-base/${entryToDelete.id}`);
      if (response.data.success) {
        toast.success('Entry deleted successfully');
        fetchEntries();
      } else {
        toast.error(response.data.detail || 'Failed to delete entry');
      }
    } catch (err: any) {
      console.error('Error deleting entry:', err);
      toast.error(err.response?.data?.detail || 'An error occurred while deleting the entry');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setEntryToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEntryToDelete(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, name: file.name }));
    }
  };

  const handleSave = async () => {
    if (formMode === 'manual') {
      if (!formData.name.trim()) {
        toast.error('Name is required');
        return;
      }
      if (!formData.content.trim()) {
        toast.error('Content is required');
        return;
      }
    } else {
      if (!selectedFile) {
        toast.error('Please select a file');
        return;
      }
    }

    try {
      setSaving(true);
      
      if (formMode === 'manual') {
        const endpoint = editingEntry ? `/knowledge-base/${editingEntry.id}` : '/knowledge-base';
        const method = editingEntry ? 'put' : 'post';
        
        const response = await axiosInstance[method]<ApiResponse>(endpoint, {
          name: formData.name,
          content: formData.content,
          description: formData.description
        });

        if (response.data.success) {
          let successMessage = editingEntry ? 'Entry updated successfully' : 'Entry created successfully';
          
          if (response.data.knowledge_base === 'updated') {
            successMessage += ' (Knowledge base updated)';
          } else if (response.data.knowledge_base === 'not_updated') {
            successMessage += ' (Knowledge base not updated)';
            if (response.data.knowledge_base_error) {
              console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
            }
          }
          
          toast.success(successMessage);
          resetForm();
          fetchEntries();
        } else {
          toast.error(response.data.detail || 'Failed to save entry');
        }
      } else {
        // File upload
        const formDataToSend = new FormData();
        formDataToSend.append('file', selectedFile!);
        if (formData.description) {
          formDataToSend.append('description', formData.description);
        }

        const response = await axiosInstance.post<ApiResponse>('/knowledge-base/upload', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          let successMessage = 'File uploaded successfully';
          
          if (response.data.knowledge_base === 'updated') {
            successMessage += ' (Knowledge base updated)';
          } else if (response.data.knowledge_base === 'not_updated') {
            successMessage += ' (Knowledge base not updated)';
            if (response.data.knowledge_base_error) {
              console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
            }
          }
          
          toast.success(successMessage);
          resetForm();
          fetchEntries();
        } else {
          toast.error(response.data.detail || 'Failed to upload file');
        }
      }
    } catch (err: any) {
      console.error('Error saving entry:', err);
      toast.error(err.response?.data?.detail || 'An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your knowledge base entries and files
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCreateManual}
                className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#1952A8] to-primary-dark text-white text-sm font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <FaPlus className="w-4 h-4 mr-2" />
                Create Entry
              </button>
              <button
                onClick={handleCreateUpload}
                className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#1952A8] to-primary-dark text-white text-sm font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <FaUpload className="w-4 h-4 mr-2" />
                Upload File
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <button 
                  onClick={fetchEntries} 
                  className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-lg bg-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingEntry ? 'Edit Entry' : formMode === 'manual' ? 'Create Manual Entry' : 'Upload File'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {formMode === 'manual' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter entry name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter description (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    
                    {/* Toolbar */}
                    <div className="mb-3 flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg border">
                      <button 
                        className={`p-2 rounded transition-all duration-200 ease-in-out ${
                          editor?.isActive('heading', { level: 1 }) 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        title="Heading 1"
                      >
                        <FaHeading />
                      </button>
                      <button 
                        className={`p-2 rounded transition-all duration-200 ease-in-out ${
                          editor?.isActive('heading', { level: 2 }) 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        title="Heading 2"
                      >
                        <FaHeading style={{ fontSize: '0.8em' }} />
                      </button>
                      <button 
                        className={`p-2 rounded transition-all duration-200 ease-in-out ${
                          editor?.isActive('bold') 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        title="Bold"
                      >
                        <FaBold />
                      </button>
                      <button 
                        className={`p-2 rounded transition-all duration-200 ease-in-out ${
                          editor?.isActive('italic') 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        title="Italic"
                      >
                        <FaItalic />
                      </button>
                      <button 
                        className={`p-2 rounded transition-all duration-200 ease-in-out ${
                          editor?.isActive('underline') 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                        title="Underline"
                      >
                        <FaUnderline />
                      </button>
                      <button 
                        className={`p-2 rounded transition-all duration-200 ease-in-out ${
                          editor?.isActive('strike') 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                        title="Strikethrough"
                      >
                        <FaStrikethrough />
                      </button>
                      <button 
                        className={`p-2 rounded transition-all duration-200 ease-in-out ${
                          editor?.isActive('bulletList') 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        title="Bullet List"
                      >
                        <FaListUl />
                      </button>
                      <button 
                        className={`p-2 rounded transition-all duration-200 ease-in-out ${
                          editor?.isActive('orderedList') 
                            ? 'bg-blue-100 text-blue-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        title="Numbered List"
                      >
                        <FaListOl />
                      </button>
                    </div>
                    
                    <div 
                      className="border border-gray-300 rounded-lg bg-white" 
                      style={{
                        minHeight: '300px',
                        padding: '16px',
                        fontFamily: 'sans-serif',
                        fontSize: '16px',
                        lineHeight: '1.5'
                      }}>
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File *
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 ease-in-out">
                        <div className="space-y-1 text-center">
                          <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors">
                              <span>Upload a file</span>
                              <input
                                ref={fileInputRef}
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.txt,.md"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT, MD up to 10MB</p>
                        </div>
                      </div>
                      {selectedFile && (
                        <div className="mt-2 flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <FaFile className="w-5 h-5 text-blue-500 mr-3" />
                          <span className="text-sm text-blue-700">{selectedFile.name}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter description (optional)"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1952A8] to-primary-dark border border-transparent rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? (
                    <>
                      <span className="loader" style={{ width: '16px', height: '16px' }}></span>
                      <span className="ml-2">{editingEntry ? 'Updating...' : 'Saving...'}</span>
                    </>
                  ) : (
                    <>
                      <FaSave className="w-4 h-4 mr-2" />
                      {editingEntry ? 'Update Entry' : 'Save Entry'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
              <div className="flex items-center mb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <FaTrash className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Delete Entry
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete <span className="font-medium text-gray-900">"{entryToDelete?.name}"</span>? 
                  This action cannot be undone.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={cancelDelete}
                    disabled={deleting}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleting}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deleting ? (
                      <>
                        <span className="loader" style={{ width: '16px', height: '16px' }}></span>
                        <span className="ml-2">Deleting...</span>
                      </>
                    ) : (
                      <>
                        <FaTrash className="w-4 h-4 mr-2" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Knowledge Base Entries</h2>
            <p className="mt-1 text-sm text-gray-600">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'} found
            </p>
          </div>
          
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <FaFileAlt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No entries</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first knowledge base entry.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleCreateManual}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg bg-gradient-to-r from-[#1952A8] to-primary-dark text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <FaPlus className="w-4 h-4 mr-2" />
                  Create Entry
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {entries.map((entry) => (
                <div key={entry.id} className="p-6 hover:bg-blue-50 transition-all duration-200 ease-in-out border-l-4 border-transparent hover:border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {entry.file_type === 'upload' ? (
                          <FaFile className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        ) : (
                          <FaFileAlt className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        )}
                        <h3 className="text-lg font-medium text-gray-900 truncate">{entry.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          entry.file_type === 'upload' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {entry.file_type}
                        </span>
                      </div>
                      
                      {entry.description && (
                        <p className="text-sm text-gray-600 mb-3">{entry.description}</p>
                      )}
                      
                      {entry.content && entry.file_type === 'manual' && (
                        <div 
                          className="text-sm text-gray-700 mb-3 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: entry.content }}
                        />
                      )}
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Created: {formatDate(entry.created_at)}</span>
                        <span className="mx-2">•</span>
                        <span>Updated: {formatDate(entry.updated_at)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {entry.file_type === 'manual' && (
                        <button
                          onClick={() => handleEdit(entry)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 ease-in-out"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(entry)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ease-in-out"
                        title="Delete"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminKnowledgeBasePage; 