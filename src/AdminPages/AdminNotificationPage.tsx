import React, { useEffect, useState } from 'react';
import axiosInstance from '../helper/axios';
import { Loader } from '../components/Loader';
import { toast } from 'react-hot-toast';
import { FiBell, FiPlus, FiRefreshCw, FiSearch, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { FaHeading, FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink, FaUnlink } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Editor } from '@tinymce/tinymce-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  image_url: string | null;
  youtube_url: string | null;
  wistia_url: string | null;
  button1_text: string | null;
  button1_link: string | null;
  button2_text: string | null;
  button2_link: string | null;
  is_active: boolean;
  show_once: boolean;
  start_time?: string | null;
  end_time?: string | null;
  created_at: string;
  updated_at: string;
}

function getYoutubeEmbedUrl(url: string): string {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
}

function getWistiaEmbedUrl(url: string): string {
  if (!url) return '';
  // Extract Wistia video ID from various URL formats
  // Handle direct embed URLs like: https://fast.wistia.com/embed/medias/gl8464qvcg
  const directMatch = url.match(/fast\.wistia\.com\/embed\/medias\/([a-zA-Z0-9]+)/);
  if (directMatch) {
    return url; // Already in correct format
  }
  
  // Handle other Wistia URL formats
  const match = url.match(/(?:wistia\.com\/|wistia\.com\/embed\/|wistia\.com\/medias\/)([a-zA-Z0-9]+)/);
  return match ? `https://fast.wistia.com/embed/medias/${match[1]}` : '';
}

const AdminNotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    image: null as File | null,
    youtube_url: '',
    wistia_url: '',
    button1_text: '',
    button1_link: '',
    button2_text: '',
    button2_link: '',
    is_active: true,
    show_once: false,
    existing_image_url: null as string | null,
    start_time: '',
    end_time: ''
  });

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
        placeholder: 'Enter notification message here...',
      }),
    ],
    content: formData.message,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setFormData(prev => ({ ...prev, message: html }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      if (formData.message !== editor.getHTML()) {
        editor.commands.setContent(formData.message);
      }
    }
  }, [editor, formData.message]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/notifications');
      setNotifications(response.data);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch notifications');
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAddNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('is_active', String(formData.is_active));
      formDataToSend.append('show_once', String(formData.show_once));
      
      // Handle datetime values properly
      if (formData.start_time) {
        const startDateTime = new Date(formData.start_time);
        formDataToSend.append('start_time', startDateTime.toISOString());
      }
      if (formData.end_time) {
        const endDateTime = new Date(formData.end_time);
        formDataToSend.append('end_time', endDateTime.toISOString());
      }
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      if (formData.youtube_url) {
        formDataToSend.append('youtube_url', formData.youtube_url);
      }
      if (formData.wistia_url) {
        formDataToSend.append('wistia_url', formData.wistia_url);
      }
      if (formData.button1_text) {
        formDataToSend.append('button1_text', formData.button1_text);
        formDataToSend.append('button1_link', formData.button1_link);
      }
      if (formData.button2_text) {
        formDataToSend.append('button2_text', formData.button2_text);
        formDataToSend.append('button2_link', formData.button2_link);
      }

      const response = await axiosInstance.post('/notifications', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNotifications([...notifications, response.data]);
      setShowAddModal(false);
      setFormData({
        title: '',
        message: '',
        image: null,
        youtube_url: '',
        wistia_url: '',
        button1_text: '',
        button1_link: '',
        button2_text: '',
        button2_link: '',
        is_active: true,
        show_once: false,
        existing_image_url: null,
        start_time: '',
        end_time: ''
      });
      if (editor) {
        editor.commands.setContent('');
      }
      toast.success('Notification added successfully');
    } catch (error) {
      toast.error('Failed to add notification');
    }
  };

  const handleUpdateNotification = async () => {
    if (!currentNotification) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('is_active', String(formData.is_active));
      formDataToSend.append('show_once', String(formData.show_once));
      
      // Handle datetime values properly
      if (formData.start_time) {
        const startDateTime = new Date(formData.start_time);
        formDataToSend.append('start_time', startDateTime.toISOString());
      } else {
        // If start_time is empty, send null to clear it
        formDataToSend.append('start_time', '');
      }
      
      if (formData.end_time) {
        const endDateTime = new Date(formData.end_time);
        formDataToSend.append('end_time', endDateTime.toISOString());
      } else {
        // If end_time is empty, send null to clear it
        formDataToSend.append('end_time', '');
      }
      
      // Handle image upload/removal
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      } else if (formData.existing_image_url === null) {
        // If no new image and existing image was removed
        formDataToSend.append('remove_image', 'true');
      }
      
      if (formData.youtube_url) {
        formDataToSend.append('youtube_url', formData.youtube_url);
      } else {
        formDataToSend.append('youtube_url', '');
      }

      if (formData.wistia_url) {
        formDataToSend.append('wistia_url', formData.wistia_url);
      } else {
        formDataToSend.append('wistia_url', '');
      }
      
      // Only append button data if there's actual content
      if (formData.button1_text?.trim()) {
        formDataToSend.append('button1_text', formData.button1_text);
        formDataToSend.append('button1_link', formData.button1_link || '');
      } else {
        formDataToSend.append('button1_text', '');
        formDataToSend.append('button1_link', '');
      }
      
      if (formData.button2_text?.trim()) {
        formDataToSend.append('button2_text', formData.button2_text);
        formDataToSend.append('button2_link', formData.button2_link || '');
      } else {
        formDataToSend.append('button2_text', '');
        formDataToSend.append('button2_link', '');
      }

      const response = await axiosInstance.put(`/notifications/${currentNotification.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNotifications(notifications.map(n => n.id === currentNotification.id ? response.data : n));
      setShowEditModal(false);
      toast.success('Notification updated successfully');
    } catch (error) {
      toast.error('Failed to update notification');
    }
  };

  const handleDeleteNotification = async () => {
    if (!currentNotification) return;
    try {
      await axiosInstance.delete(`/notifications/${currentNotification.id}`);
      setNotifications(notifications.filter(n => n.id !== currentNotification.id));
      setShowDeleteModal(false);
      toast.success('Notification deleted successfully');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const openEditModal = (notification: Notification) => {
    setCurrentNotification(notification);
    
    // Format datetime values for input fields
    const formatDateTimeForInput = (dateTimeString: string | null | undefined): string => {
      if (!dateTimeString) return '';
      const date = new Date(dateTimeString);
      // Format as YYYY-MM-DDTHH:MM for datetime-local input
      return date.toISOString().slice(0, 16);
    };
    
    setFormData({
      title: notification.title,
      message: notification.message,
      image: null,
      youtube_url: notification.youtube_url || '',
      wistia_url: notification.wistia_url || '',
      button1_text: notification.button1_text || '',
      button1_link: notification.button1_link || '',
      button2_text: notification.button2_text || '',
      button2_link: notification.button2_link || '',
      is_active: notification.is_active,
      show_once: notification.show_once,
      existing_image_url: notification.image_url,
      start_time: formatDateTimeForInput(notification.start_time),
      end_time: formatDateTimeForInput(notification.end_time)
    });
    if (editor) {
      editor.commands.setContent(notification.message);
    }
    setShowEditModal(true);
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0],
        youtube_url: '',
      }));
    }
  };

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
            <FiBell className="text-primary" /> Notification Management
          </h2>
          <p className="text-gray-500">Manage system notifications</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors duration-200 shadow-sm"
            onClick={() => setShowAddModal(true)}
          >
            <FiPlus /> Add Notification
          </button>
          <button 
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 shadow-sm"
            onClick={fetchNotifications}
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium">Notification List ({notifications.length})</h3>
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
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
                  <th className="px-6 py-3 text-left">Message</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Start Time</th>
                  <th className="px-6 py-3 text-left">End Time</th>
                  <th className="px-6 py-3 text-left">Last Updated</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredNotifications.map(notification => (
                  <tr key={notification.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 max-w-prose truncate" dangerouslySetInnerHTML={{ __html: notification.title }} />
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        notification.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {notification.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {notification.start_time ? new Date(notification.start_time).toLocaleString() : 'Now'}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {notification.end_time ? new Date(notification.end_time).toLocaleString() : '—'}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(notification.updated_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openEditModal(notification)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setCurrentNotification(notification);
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

      {/* Add Notification Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <motion.div 
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl shadow-lg my-6 mx-4"
            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Add New Notification</h3>
            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter notification title"
                />
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Image or YouTube Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image or YouTube Video</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-[300px] md:h-[400px] flex flex-col items-center justify-center">
                    {formData.image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : formData.youtube_url ? (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="w-full aspect-video max-h-64">
                          <iframe
                            width="100%"
                            height="100%"
                            src={getYoutubeEmbedUrl(formData.youtube_url)}
                            title="YouTube video preview"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, youtube_url: '' }))}
                          className="mt-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : formData.wistia_url ? (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="w-full aspect-video max-h-64">
                          <iframe
                            width="100%"
                            height="100%"
                            src={getWistiaEmbedUrl(formData.wistia_url)}
                            title="Wistia video preview"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, wistia_url: '' }))}
                          className="mt-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center w-full">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                          disabled={!!formData.youtube_url || !!formData.wistia_url}
                        />
                        <label
                          htmlFor="image-upload"
                          className={`cursor-pointer flex flex-col items-center ${formData.youtube_url || formData.wistia_url ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                          <FiPlus className="text-4xl text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Click to upload image</span>
                        </label>
                        <div className="mt-4 space-y-2">
                          <input
                            type="url"
                            placeholder="Paste YouTube video link here"
                            value={formData.youtube_url}
                            onChange={e => setFormData(prev => ({ ...prev, youtube_url: e.target.value, image: null, wistia_url: '' }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            disabled={!!formData.image || !!formData.wistia_url}
                          />
                          <input
                            type="url"
                            placeholder="Paste Wistia video link here"
                            value={formData.wistia_url}
                            onChange={e => setFormData(prev => ({ ...prev, wistia_url: e.target.value, image: null, youtube_url: '' }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            disabled={!!formData.image || !!formData.youtube_url}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Message Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden h-[300px] md:h-[400px] flex flex-col">
                    <div className="border-b border-gray-300 bg-gray-50 p-2">
                      {renderEditorToolbar()}
                    </div>
                    <div 
                      className="flex-1 overflow-y-auto p-4" 
                      style={{
                        fontFamily: 'sans-serif',
                        fontSize: '16px',
                        lineHeight: '1.5'
                      }}
                    >
                      <style>
                        {`
                          .ProseMirror ul {
                            list-style-type: disc;
                            padding-left: 1.5em;
                            margin: 0.5em 0;
                          }
                          .ProseMirror ol {
                            list-style-type: decimal;
                            padding-left: 1.5em;
                            margin: 0.5em 0;
                          }
                          .ProseMirror li {
                            display: list-item;
                            margin: 0.2em 0;
                          }
                          .ProseMirror li::marker {
                            color: #666;
                          }
                        `}
                      </style>
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Start/End Time Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="datetime-local"
                    value={formData.start_time}
                    onChange={e => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    className="mt-1 text-xs text-primary underline"
                    onClick={() => setFormData(prev => ({ ...prev, start_time: '' }))}
                  >
                    Set to Now
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={e => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    className="mt-1 text-xs text-primary underline"
                    onClick={() => setFormData(prev => ({ ...prev, end_time: '' }))}
                  >
                    No End
                  </button>
                </div>
              </div>

              {/* Button Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button 1 Text</label>
                  <input
                    type="text"
                    value={formData.button1_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, button1_text: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button 1 Link</label>
                  <input
                    type="url"
                    value={formData.button1_link}
                    onChange={(e) => setFormData(prev => ({ ...prev, button1_link: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button 2 Text</label>
                  <input
                    type="text"
                    value={formData.button2_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, button2_text: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button 2 Link</label>
                  <input
                    type="url"
                    value={formData.button2_link}
                    onChange={(e) => setFormData(prev => ({ ...prev, button2_link: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Active Toggle and Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="is_active" className="ml-2">Active</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="show_once"
                      checked={formData.show_once}
                      onChange={(e) => setFormData({...formData, show_once: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="show_once" className="ml-2">Show once</label>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    className="flex-1 sm:flex-none px-4 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    onClick={handleAddNotification}
                  >
                    Add Notification
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Notification Modal */}
      {showEditModal && currentNotification && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <motion.div 
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl shadow-lg my-6 mx-4"
            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Edit Notification</h3>
            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter notification title"
                />
              </div>

              {/* Edit Modal - Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Image or YouTube Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image or YouTube Video</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-[300px] md:h-[400px] flex flex-col items-center justify-center">
                    {formData.image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : formData.youtube_url ? (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="w-full aspect-video max-h-64">
                          <iframe
                            width="100%"
                            height="100%"
                            src={getYoutubeEmbedUrl(formData.youtube_url)}
                            title="YouTube video preview"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, youtube_url: '' }))}
                          className="mt-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : formData.wistia_url ? (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="w-full aspect-video max-h-64">
                          <iframe
                            width="100%"
                            height="100%"
                            src={getWistiaEmbedUrl(formData.wistia_url)}
                            title="Wistia video preview"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, wistia_url: '' }))}
                          className="mt-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center w-full">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                          disabled={!!formData.youtube_url || !!formData.wistia_url}
                        />
                        <label
                          htmlFor="image-upload"
                          className={`cursor-pointer flex flex-col items-center ${formData.youtube_url || formData.wistia_url ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                          <FiPlus className="text-4xl text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Click to upload image</span>
                        </label>
                        <div className="mt-4 space-y-2">
                          <input
                            type="url"
                            placeholder="Paste YouTube video link here"
                            value={formData.youtube_url}
                            onChange={e => setFormData(prev => ({ ...prev, youtube_url: e.target.value, image: null, wistia_url: '' }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            disabled={!!formData.image || !!formData.wistia_url}
                          />
                          <input
                            type="url"
                            placeholder="Paste Wistia video link here"
                            value={formData.wistia_url}
                            onChange={e => setFormData(prev => ({ ...prev, wistia_url: e.target.value, image: null, youtube_url: '' }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            disabled={!!formData.image || !!formData.youtube_url}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Message Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden h-[300px] md:h-[400px] flex flex-col">
                    <div className="border-b border-gray-300 bg-gray-50 p-2">
                      {renderEditorToolbar()}
                    </div>
                    <div 
                      className="flex-1 overflow-y-auto p-4" 
                      style={{
                        fontFamily: 'sans-serif',
                        fontSize: '16px',
                        lineHeight: '1.5'
                      }}
                    >
                      <style>
                        {`
                          .ProseMirror ul {
                            list-style-type: disc;
                            padding-left: 1.5em;
                            margin: 0.5em 0;
                          }
                          .ProseMirror ol {
                            list-style-type: decimal;
                            padding-left: 1.5em;
                            margin: 0.5em 0;
                          }
                          .ProseMirror li {
                            display: list-item;
                            margin: 0.2em 0;
                          }
                          .ProseMirror li::marker {
                            color: #666;
                          }
                        `}
                      </style>
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Start/End Time Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="datetime-local"
                    value={formData.start_time}
                    onChange={e => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    className="mt-1 text-xs text-primary underline"
                    onClick={() => setFormData(prev => ({ ...prev, start_time: '' }))}
                  >
                    Set to Now
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={e => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    className="mt-1 text-xs text-primary underline"
                    onClick={() => setFormData(prev => ({ ...prev, end_time: '' }))}
                  >
                    No End
                  </button>
                </div>
              </div>

              {/* Button Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button 1 Text</label>
                  <input
                    type="text"
                    value={formData.button1_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, button1_text: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button 1 Link</label>
                  <input
                    type="url"
                    value={formData.button1_link}
                    onChange={(e) => setFormData(prev => ({ ...prev, button1_link: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button 2 Text</label>
                  <input
                    type="text"
                    value={formData.button2_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, button2_text: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button 2 Link</label>
                  <input
                    type="url"
                    value={formData.button2_link}
                    onChange={(e) => setFormData(prev => ({ ...prev, button2_link: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Active Toggle and Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="edit_is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="edit_is_active" className="ml-2">Active</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="edit_show_once"
                      checked={formData.show_once}
                      onChange={(e) => setFormData({...formData, show_once: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="edit_show_once" className="ml-2">Show once a day</label>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    className="flex-1 sm:flex-none px-4 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    onClick={handleUpdateNotification}
                  >
                    Update Notification
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentNotification && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <motion.div 
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg my-6 mx-4"
            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Delete Notification</h3>
            <p>Are you sure you want to delete this notification?</p>
            <div className="mt-6 flex justify-end gap-2">
              <button 
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleDeleteNotification}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminNotificationPage;
