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

interface TermsAndConditionsData {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  data: TermsAndConditionsData;
  detail?: string;
  knowledge_base?: string;
  knowledge_base_error?: string;
}

const AdminTermsPage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [originalContent, setOriginalContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const createDefaultContent = () => {
    const defaultDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `<h1>Terms and Conditions</h1>
<p><strong>Last updated:</strong> ${defaultDate}</p>
<p>Please read these terms and conditions carefully before using our service.</p>
<h2>1. Introduction</h2>
<p>Welcome to TagoCash ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our website and services operated by TagoCash.</p>
<p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>`;
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
        placeholder: 'Enter Terms and Conditions content here...',
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
        // Try parsing as JSON first (for Draft.js legacy content)
        JSON.parse(originalContent);
        // If we get here, it's Draft.js content, so use default
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
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>('/terms-and-conditions');
      if (response.data.success) {
        try {
          // Try to parse the content as JSON (in case it's still in Draft.js format)
          const parsedContent = JSON.parse(response.data.data.content);
          // If we get here, it's in Draft.js format - use a default instead
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
        setError('Failed to load Terms and Conditions');
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        // Terms not found - show a message and allow creation
        setError('No Terms and Conditions found. You can create a new one.');
        const defaultContent = createDefaultContent();
        setContent(defaultContent);
        if (editor) {
          editor.commands.setContent(defaultContent);
        }
        setOriginalContent('');
      } else {
        setError('Failed to load Terms and Conditions. Please try again later.');
        console.error('Error fetching terms and conditions:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('Terms and Conditions cannot be empty');
      return;
    }

    try {
      setSaving(true);

      // If originalContent is empty, it means we're creating a new terms
      const isCreating = originalContent === '';

      const endpoint = isCreating ? '/terms-and-conditions' : '/terms-and-conditions';
      const method = isCreating ? 'post' : 'put';

      const response = await axiosInstance[method]<ApiResponse>(endpoint, {
        content: content
      });

      if (response.data.success) {
        // Show success message with knowledge base status
        let successMessage = isCreating ? 'Terms and Conditions created successfully' : 'Terms and Conditions updated successfully';

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
        toast.error(response.data.detail || 'Failed to update Terms and Conditions');
      }
    } catch (err: any) {
      console.error('Error updating terms and conditions:', err);
      toast.error(err.response?.data?.detail || 'An error occurred while updating Terms and Conditions');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalContent === '') {
      // If we were creating new terms, reset to the default template
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
  const isNewTerms = originalContent === '';

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
          {isNewTerms ? 'Create Terms and Conditions' : 'Manage Terms and Conditions'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={!hasChanges || saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${hasChanges
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            <FaUndo /> Discard Changes
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${hasChanges && !saving
              ? 'bg-gradient-to-r from-[#1952A8] to-primary-dark text-white hover:opacity-90'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {saving ? (
              <>
                <span className="loader" style={{ width: '16px', height: '16px' }}></span>
                {isNewTerms ? 'Creating...' : 'Saving...'}
              </>
            ) : (
              <>
                <FaSave /> {isNewTerms ? 'Create Terms' : 'Save Changes'}
              </>
            )}
          </button>
        </div>
      </div>

      {error && !isNewTerms ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
          <button
            onClick={fetchTerms}
            className="ml-2 text-red-700 hover:text-red-900 underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              {isNewTerms ? 'Create New Terms and Conditions' : 'Edit Terms and Conditions'}
            </h2>
            {!isNewTerms && (
              <span className="text-sm text-gray-500">Last Updated: {lastUpdated}</span>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded mb-4 text-sm text-gray-600">
            <p className="font-semibold mb-1">Editing Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the formatting toolbar below to style your text</li>
              <li>Changes won't be saved until you click "{isNewTerms ? 'Create Terms' : 'Save Changes'}"</li>
            </ul>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded ${editor?.isActive('heading', { level: 1 })
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
              className={`px-3 py-1 rounded ${editor?.isActive('heading', { level: 2 })
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
              className={`px-3 py-1 rounded ${editor?.isActive('bold')
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
              className={`px-3 py-1 rounded ${editor?.isActive('italic')
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
              className={`px-3 py-1 rounded ${editor?.isActive('underline')
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
              className={`px-3 py-1 rounded ${editor?.isActive('strike')
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
              className={`px-3 py-1 rounded ${editor?.isActive('bulletList')
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
              className={`px-3 py-1 rounded ${editor?.isActive('orderedList')
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
              className={`px-3 py-1 rounded ${editor?.isActive({ textAlign: 'left' })
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
              className={`px-3 py-1 rounded ${editor?.isActive({ textAlign: 'center' })
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
              className={`px-3 py-1 rounded ${editor?.isActive({ textAlign: 'right' })
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
              className={`px-3 py-1 rounded ${editor?.isActive('link')
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
              className={`px-3 py-1 rounded ${editor?.isActive('link')
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
            className="border border-gray-300 rounded-md overflow-y-auto"
            style={{
              height: 'calc(100vh - 350px)',
              minHeight: '400px',
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

export default AdminTermsPage;



