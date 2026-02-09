import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaUndo, FaHeading, FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink, FaUnlink } from 'react-icons/fa';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { Loader } from '../components/Loader';
import { useEditor, EditorContent, Editor as TiptapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import '../styles/terms-content.css';

interface SecurityPolicyData {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  data: SecurityPolicyData;
  detail?: string;
  knowledge_base?: string;
  knowledge_base_error?: string;
}

const AdminSecurityPolicyPage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [originalContent, setOriginalContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Create default content for new policy
  const createDefaultContent = () => {
    const defaultDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `<h1>Security Policy</h1>
<p><strong>Last updated:</strong> ${defaultDate}</p>
<p>At TagoCash, we respect your security and are committed to protecting your personal data. This Security Policy explains how we collect, use, disclose, and safeguard your information when you use our services.</p>
<h2>Information We Collect</h2>
<p>We may collect several types of information from and about users of our platform, including:</p>
<ul>
  <li>Personal information such as name, email address, phone number, and payment information</li>
  <li>Usage data including how you interact with our platform</li>
  <li>Device information such as IP address, browser type, and operating system</li>
  <li>Transaction data related to your financial activities on our platform</li>
</ul>
<h2>How We Use Your Information</h2>
<p>We use the information we collect to:</p>
<ul>
  <li>Provide, maintain, and improve our services</li>
  <li>Process transactions and send related information</li>
  <li>Respond to your requests, questions, and comments</li>
  <li>Send you technical notices, updates, and security alerts</li>
  <li>Monitor and analyze trends, usage, and activities</li>
  <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
</ul>
<h2>Data Security</h2>
<p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>`;
  };

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
        placeholder: 'Enter Security Policy content here...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // Effect to ensure editor content is updated when data is loaded
  useEffect(() => {
    if (editor && !editor.isDestroyed && originalContent) {
      try {
        // Try parsing as JSON first (for legacy content)
        JSON.parse(originalContent);
        // If we get here, it's old format content, so use default
        const defaultContent = createDefaultContent();
        editor.commands.setContent(defaultContent);
        setContent(defaultContent);
      } catch (e) {
        // Not JSON, assume it's already HTML from Tiptap
        editor.commands.setContent(originalContent);
        setContent(originalContent);
      }
    }
  }, [editor, originalContent]);

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>('/security-policy');
      if (response.data.success) {
        try {
          // Try to parse the content as JSON (in case it's still in old format)
          const parsedContent = JSON.parse(response.data.data.content);
          // If we get here, it's in old format - use a default instead
          const defaultContent = createDefaultContent();
          setContent(defaultContent);
          if (editor) {
            editor.commands.setContent(defaultContent);
          }
        } catch (parseError) {
          // If it's not valid JSON, assume it's HTML content
          setContent(response.data.data.content);
          if (editor) {
            editor.commands.setContent(response.data.data.content);
          }
        }
        
        setOriginalContent(response.data.data.content);
        
        // Format the updated_at date
        const updatedDate = new Date(response.data.data.updated_at);
        setLastUpdated(updatedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }));
      } else {
        setError('Failed to load Security Policy');
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        // Policy not found - show a message and allow creation
        setError('No Security Policy found. You can create a new one.');
        const defaultContent = createDefaultContent();
        setContent(defaultContent);
        if (editor) {
          editor.commands.setContent(defaultContent);
        }
        setOriginalContent('');
      } else {
        setError('Failed to load Security Policy. Please try again later.');
        console.error('Error fetching security policy:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('Security Policy cannot be empty');
      return;
    }

    try {
      setSaving(true);
      
      // If originalContent is empty, it means we're creating a new policy
      const isCreating = originalContent === '';
      
      const endpoint = '/security-policy';
      const method = isCreating ? 'post' : 'put';
      
      const response = await axiosInstance[method]<ApiResponse>(endpoint, {
        content: content
      });

      if (response.data.success) {
        // Show success message with knowledge base status
        let successMessage = isCreating ? 'Security Policy created successfully' : 'Security Policy updated successfully';
        
        if (response.data.knowledge_base === 'updated') {
          successMessage += ' (Knowledge base updated)';
        } else if (response.data.knowledge_base === 'not_updated') {
          successMessage += ' (Knowledge base not updated)';
          if (response.data.knowledge_base_error) {
            console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
          }
        }
        
        toast.success(successMessage);
        setOriginalContent(content);
        setError(null);
        
        // Update last updated date
        const updatedDate = new Date(response.data.data.updated_at);
        setLastUpdated(updatedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }));
      } else {
        toast.error(response.data.detail || 'Failed to update Security Policy');
      }
    } catch (err: any) {
      console.error('Error updating security policy:', err);
      toast.error(err.response?.data?.detail || 'An error occurred while updating Security Policy');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalContent === '') {
      // If we were creating new policy, reset to the default template
      const defaultContent = createDefaultContent();
      setContent(defaultContent);
      if (editor) {
        editor.commands.setContent(defaultContent);
      }
    } else {
      // Otherwise reset to the original content
      setContent(originalContent);
      if (editor) {
        editor.commands.setContent(originalContent);
      }
    }
    toast.success('Changes discarded');
  };

  const hasChanges = originalContent !== content;
  const isNewPolicy = originalContent === '';

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isNewPolicy ? 'Create Security Policy' : 'Manage Security Policy'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={!hasChanges || saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              hasChanges
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaUndo /> Discard Changes
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              hasChanges && !saving
                ? 'bg-gradient-to-r from-[#1952A8] to-primary-dark text-white hover:opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {saving ? (
              <>
                <span className="loader" style={{ width: '16px', height: '16px' }}></span>
                {isNewPolicy ? 'Creating...' : 'Saving...'}
              </>
            ) : (
              <>
                <FaSave /> {isNewPolicy ? 'Create Policy' : 'Save Changes'}
              </>
            )}
          </button>
        </div>
      </div>

      {error && !isNewPolicy ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
          <button 
            onClick={fetchPolicy} 
            className="ml-2 text-red-700 hover:text-red-900 underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              {isNewPolicy ? 'Create New Security Policy' : 'Edit Security Policy'}
            </h2>
            {!isNewPolicy && (
              <span className="text-sm text-gray-500">Last Updated: {lastUpdated}</span>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded mb-4 text-sm text-gray-600">
            <p className="font-semibold mb-1">Editing Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the formatting toolbar below to style your text</li>
              <li>Changes won't be saved until you click "{isNewPolicy ? 'Create Policy' : 'Save Changes'}"</li>
            </ul>
          </div>
          
          <div className="mb-4 flex flex-wrap gap-2">
            <button 
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
          
          <div 
            className="border border-gray-300 rounded-md" 
            style={{
              minHeight: '500px',
              padding: '16px',
              fontFamily: 'sans-serif',
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
            <EditorContent editor={editor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSecurityPolicyPage; 