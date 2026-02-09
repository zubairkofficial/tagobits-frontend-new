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

interface MasterServiceData {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  data: MasterServiceData;
  detail?: string;
  knowledge_base?: string;
  knowledge_base_error?: string;
}

const AdminMasterService: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [originalContent, setOriginalContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Create default content for new policy
const createDefaultContent = () => {
  const defaultDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return `<h1>Master Service Agreement</h1>
<p><strong>Last updated:</strong> ${defaultDate}</p>
<p>This Master Service Agreement ("Agreement") is entered into by and between you ("Client") and TagoCash. By using our services, you agree to the terms and conditions outlined below. Please read this Agreement carefully before accessing or using our services.</p>
<h2>Scope of Services</h2>
<p>TagoCash agrees to provide the services described in one or more statements of work ("SOW") executed by both parties. Each SOW will outline the specific deliverables, timelines, and pricing applicable to the services.</p>
<h2>Client Responsibilities</h2>
<p>The Client agrees to:</p>
<ul>
  <li>Provide timely access to necessary information, personnel, and systems</li>
  <li>Ensure all information provided to TagoCash is accurate and complete</li>
  <li>Comply with all applicable laws and regulations</li>
  <li>Make payments as specified in the relevant SOW</li>
</ul>
<h2>Payment Terms</h2>
<p>Fees for services will be detailed in each SOW. Unless otherwise stated, payments are due within 30 days of the invoice date. Late payments may incur interest charges as permitted by law.</p>
<h2>Intellectual Property</h2>
<p>Unless otherwise specified in an SOW, TagoCash retains all rights, title, and interest in any intellectual property used or developed in connection with the services. The Client is granted a non-exclusive, non-transferable license to use any deliverables for its internal business purposes only.</p>
<h2>Confidentiality</h2>
<p>Each party agrees to keep confidential all non-public information disclosed by the other party that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure.</p>
<h2>Limitation of Liability</h2>
<p>To the maximum extent permitted by law, TagoCash shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to this Agreement or the services provided, even if advised of the possibility of such damages.</p>
<h2>Termination</h2>
<p>Either party may terminate this Agreement or any SOW with written notice if the other party materially breaches any of its obligations and fails to cure the breach within 30 days of receiving notice.</p>
<h2>Governing Law</h2>
<p>This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction where TagoCash is incorporated, without regard to its conflict of law principles.</p>`;
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
        placeholder: 'Enter Master Service Agreement content here...',
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
      const response = await axiosInstance.get<ApiResponse>('/master-service');
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
        setError('Failed to load Master Service Agreement Content');
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        // Policy not found - show a message and allow creation
        setError('No Master Service Agreement found. You can create a new one.');
        const defaultContent = createDefaultContent();
        setContent(defaultContent);
        if (editor) {
          editor.commands.setContent(defaultContent);
        }
        setOriginalContent('');
      } else {
        setError('Failed to load Master Service Agreement. Please try again later.');
        console.error('Error fetching Master Service Agreement:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error('Master Service Agreement cannot be empty');
      return;
    }

    try {
      setSaving(true);
      
      // If originalContent is empty, it means we're creating a new policy
      const isCreating = originalContent === '';
      
      const endpoint = '/master-service';
      const method = isCreating ? 'post' : 'put';
      
      const response = await axiosInstance[method]<ApiResponse>(endpoint, {
        content: content
      });

      if (response.data.success) {
        // Show success message with knowledge base status
        let successMessage = isCreating ? 'Master Service Agreement created successfully' : 'Master Service Agreement updated successfully';
        
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
        toast.error(response.data.detail || 'Failed to update Master Service Agreement');
      }
    } catch (err: any) {
      console.error('Error updating Master Service Agreement:', err);
      toast.error(err.response?.data?.detail || 'An error occurred while updating Master Service Agreement');
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
  const isNewMasterService = originalContent === '';

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
          {isNewMasterService ? 'Create Master Service Agreement' : 'Manage Master Service Agreement'}
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
                {isNewMasterService ? 'Creating...' : 'Saving...'}
              </>
            ) : (
              <>
                <FaSave /> {isNewMasterService ? 'Create Master Service' : 'Save Changes'}
              </>
            )}
          </button>
        </div>
      </div>

      {error && !isNewMasterService ? (
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
              {isNewMasterService ? 'Create New Master Service Agreement' : 'Edit Master Service Agreement'}
            </h2>
            {!isNewMasterService && (
              <span className="text-sm text-gray-500">Last Updated: {lastUpdated}</span>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded mb-4 text-sm text-gray-600">
            <p className="font-semibold mb-1">Editing Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the formatting toolbar below to style your text</li>
              <li>Changes won't be saved until you click "{isNewMasterService ? 'Create Master Service' : 'Save Changes'}"</li>
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

export default AdminMasterService; 