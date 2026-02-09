// import { useState, useEffect } from 'react';
// import axiosInstance from '../helper/axios';
// import { toast } from 'react-hot-toast';
// import { Loader } from '../components/Loader';
// import { FiSave, FiX } from 'react-icons/fi';
// import { motion } from 'framer-motion';

// interface BusinessServicesContent {
//   id: string;
//   header_title: string;
//   header_description: string;
//   header_subtitle: string; // NEW FIELD
//   hero_title: string;
//   hero_subtitle: string;
//   left_title: string;
//   left_description: string;
//   left_bullets: string[];
//   left_button_text: string;
//   left_icontext: string;
//   right_title: string;
//   right_description: string;
//   right_bullets: string[];
//   right_button_text: string;
//   right_icontext: string;
//   why_title: string;
//   why_box1_title: string;
//   why_box1_description: string;
//   why_box2_title: string;
//   why_box2_description: string;
//   why_box3_title: string;
//   why_box3_description: string;
//   ready_title: string;
//   ready_description: string;
//   ready_button_text: string;
// }

// const AdminBusinessServicesContent = () => {
//   const [content, setContent] = useState<BusinessServicesContent | null>(null);
//   const [formData, setFormData] = useState<Partial<BusinessServicesContent>>({});
//   const [loading, setLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get('/business-services');
//       setContent(response.data);
//       setFormData(response.data);
//     } catch (error) {
//       console.error('Error fetching content:', error);
//       toast.error('Failed to fetch Business Services content');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleBulletChange = (section: 'left' | 'right', index: number, value: string) => {
//     const bullets = section === 'left' ? formData.left_bullets || [] : formData.right_bullets || [];
//     const updatedBullets = [...bullets];
//     updatedBullets[index] = value;
//     setFormData(prev => ({
//       ...prev,
//       [section === 'left' ? 'left_bullets' : 'right_bullets']: updatedBullets
//     }));
//   };

//   const addBullet = (section: 'left' | 'right') => {
//     const bullets = section === 'left' ? formData.left_bullets || [] : formData.right_bullets || [];
//     setFormData(prev => ({
//       ...prev,
//       [section === 'left' ? 'left_bullets' : 'right_bullets']: [...bullets, '']
//     }));
//   };

//   const removeBullet = (section: 'left' | 'right', index: number) => {
//     const bullets = section === 'left' ? formData.left_bullets || [] : formData.right_bullets || [];
//     setFormData(prev => ({
//       ...prev,
//       [section === 'left' ? 'left_bullets' : 'right_bullets']: bullets.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSaving(true);
//     try {
//       if (content?.id) {
//         await axiosInstance.put(`/business-services/${content.id}`, formData);
//       } else {
//         await axiosInstance.post('/business-services', formData);
//       }
//       toast.success('Business Services content saved successfully');
//       await fetchContent();
//     } catch (error) {
//       console.error('Error saving content:', error);
//       toast.error('Failed to save Business Services content');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Business Services Content</h1>
//           <p className="text-gray-600 mb-8">Manage all content for the Business Services page</p>
//         </motion.div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Header Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.1 }}
//             className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Page Header</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Header Title</label>
//                 <input
//                   type="text"
//                   value={formData.header_title || ''}
//                   onChange={(e) => handleInputChange('header_title', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Header Description</label>
//                 <textarea
//                   value={formData.header_description || ''}
//                   onChange={(e) => handleInputChange('header_description', e.target.value)}
//                   rows={3}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               {/* NEW FIELD – 3RD LINE */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Header Subtitle</label>
//                 <textarea
//                   value={formData.header_subtitle || ''}
//                   onChange={(e) => handleInputChange('header_subtitle', e.target.value)}
//                   rows={3}
//                   placeholder=""
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* Hero Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.15 }}
//             className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Offerings Section</h2>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
//                   <input
//                     type="text"
//                     value={formData.hero_title || ''}
//                     onChange={(e) => handleInputChange('hero_title', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
//                   <input
//                     type="text"
//                     value={formData.hero_subtitle || ''}
//                     onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Left Offerings Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.2 }}
//             className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Left Offering (Enterprise Services)</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={formData.left_title || ''}
//                   onChange={(e) => handleInputChange('left_title', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea
//                   value={formData.left_description || ''}
//                   onChange={(e) => handleInputChange('left_description', e.target.value)}
//                   rows={3}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
//                 <input
//                   type="text"
//                   value={formData.left_button_text || ''}
//                   onChange={(e) => handleInputChange('left_button_text', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Icon Text</label>
//                 <input
//                   type="text"
//                   value={formData.left_icontext || ''}
//                   onChange={(e) => handleInputChange('left_icontext', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Text to display next to the icon"/>
//               </div>
//               <div>
//                 <div className="flex justify-between items-center mb-3">
//                   <label className="block text-sm font-medium text-gray-700">Bullet Points</label>
//                   <button
//                     type="button"
//                     onClick={() => addBullet('left')}
//                     className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
//                   >
//                     + Add
//                   </button>
//                 </div>
//                 <div className="space-y-2">
//                   {(formData.left_bullets || []).map((bullet, idx) => (
//                     <div key={idx} className="flex gap-2">
//                       <input
//                         type="text"
//                         value={bullet}
//                         onChange={(e) => handleBulletChange('left', idx, e.target.value)}
//                         placeholder={`Bullet point ${idx + 1}`}
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeBullet('left', idx)}
//                         className="p-2 text-red-500 hover:bg-red-50 rounded"
//                       >
//                         <FiX size={20} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Offerings Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.25 }}
//             className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Right Offering (TEAMS Program)</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={formData.right_title || ''}
//                   onChange={(e) => handleInputChange('right_title', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea
//                   value={formData.right_description || ''}
//                   onChange={(e) => handleInputChange('right_description', e.target.value)}
//                   rows={3}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
//                 <input
//                   type="text"
//                   value={formData.right_button_text || ''}
//                   onChange={(e) => handleInputChange('right_button_text', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Icon Text</label>
//                 <input
//                   type="text"
//                   value={formData.right_icontext || ''}
//                   onChange={(e) => handleInputChange('right_icontext', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Text to display next to the icon"
//                 />
//               </div>
//               <div>
//                 <div className="flex justify-between items-center mb-3">
//                   <label className="block text-sm font-medium text-gray-700">Bullet Points</label>
//                   <button
//                     type="button"
//                     onClick={() => addBullet('right')}
//                     className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
//                   >
//                     + Add
//                   </button>
//                 </div>
//                 <div className="space-y-2">
//                   {(formData.right_bullets || []).map((bullet, idx) => (
//                     <div key={idx} className="flex gap-2">
//                       <input
//                         type="text"
//                         value={bullet}
//                         onChange={(e) => handleBulletChange('right', idx, e.target.value)}
//                         placeholder={`Bullet point ${idx + 1}`}
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeBullet('right', idx)}
//                         className="p-2 text-red-500 hover:bg-red-50 rounded"
//                       >
//                         <FiX size={20} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Why Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.3 }}
//             className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Section</h2>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
//                 <input
//                   type="text"
//                   value={formData.why_title || ''}
//                   onChange={(e) => handleInputChange('why_title', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {[1, 2, 3].map((boxNum) => (
//                 <div key={boxNum} className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold text-gray-900 mb-3">Box {boxNum}</h3>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                       <input
//                         type="text"
//                         value={formData[`why_box${boxNum}_title` as keyof BusinessServicesContent] || ''}
//                         onChange={(e) => handleInputChange(`why_box${boxNum}_title`, e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                       <textarea
//                         value={formData[`why_box${boxNum}_description` as keyof BusinessServicesContent] || ''}
//                         onChange={(e) => handleInputChange(`why_box${boxNum}_description`, e.target.value)}
//                         rows={2}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Ready Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.35 }}
//             className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Transform Section</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={formData.ready_title || ''}
//                   onChange={(e) => handleInputChange('ready_title', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea
//                   value={formData.ready_description || ''}
//                   onChange={(e) => handleInputChange('ready_description', e.target.value)}
//                   rows={3}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
//                 <input
//                   type="text"
//                   value={formData.ready_button_text || ''}
//                   onChange={(e) => handleInputChange('ready_button_text', e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           </motion.div>

//           {/* Save Button */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3, delay: 0.4 }}
//             className="flex justify-end gap-3"
//           >
//             <button
//               type="submit"
//               disabled={isSaving}
//               className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <FiSave size={20} />
//               {isSaving ? 'Saving...' : 'Save Changes'}
//             </button>
//           </motion.div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminBusinessServicesContent;





import { useState, useEffect } from 'react';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { Loader } from '../components/Loader';
import { FiSave, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface BusinessServicesContent {
  id: string;
  header_title: string;
  header_description: string;
  header_subtitle: string;
  hero_title: string;
  hero_subtitle: string;
  left_title: string;
  left_description: string;
  left_bullets: string[];
  left_button_text: string;
  left_icontext: string;
  left_video_button_text?: string;
  left_video_wistia_url?: string;
  right_title: string;
  right_description: string;
  right_bullets: string[];
  right_button_text: string;
  right_icontext: string;
  right_video_button_text?: string;
  right_video_wistia_url?: string;
  why_title: string;
  why_box1_title: string;
  why_box1_description: string;
  why_box2_title: string;
  why_box2_description: string;
  why_box3_title: string;
  why_box3_description: string;
  ready_title: string;
  ready_description: string;
  ready_button_text: string;
  video_title?: string;
  video_description?: string;
  video_wistia_url?: string;
}

const AdminBusinessServicesContent = () => {
  const [content, setContent] = useState<BusinessServicesContent | null>(null);
  const [formData, setFormData] = useState<Partial<BusinessServicesContent>>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const [contentResponse, headerResponse] = await Promise.all([
        axiosInstance.get('/business-services'),
        axiosInstance.get('/business-services/header'),
      ]);

      const headerSubtitle = headerResponse.data?.header_subtitle ?? '';

      setContent(contentResponse.data);
      setFormData({
        ...contentResponse.data,
        header_subtitle: headerSubtitle,
        left_video_button_text: contentResponse.data.left_video_button_text || '',
        left_video_wistia_url: contentResponse.data.left_video_wistia_url || '',
        video_title: contentResponse.data.video_title || '',
        video_description: contentResponse.data.video_description || '',
        video_wistia_url: contentResponse.data.video_wistia_url || '',
      }); 
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch Business Services content');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBulletChange = (
    section: 'left' | 'right',
    index: number,
    value: string
  ) => {
    const bullets =
      section === 'left'
        ? formData.left_bullets || []
        : formData.right_bullets || [];
    const updatedBullets = [...bullets];
    updatedBullets[index] = value;
    setFormData((prev) => ({
      ...prev,
      [section === 'left' ? 'left_bullets' : 'right_bullets']: updatedBullets,
    }));
  };

  const addBullet = (section: 'left' | 'right') => {
    const bullets =
      section === 'left'
        ? formData.left_bullets || []
        : formData.right_bullets || [];
    setFormData((prev) => ({
      ...prev,
      [section === 'left' ? 'left_bullets' : 'right_bullets']: [
        ...bullets,
        '',
      ],
    }));
  };

  const removeBullet = (section: 'left' | 'right', index: number) => {
    const bullets =
      section === 'left'
        ? formData.left_bullets || []
        : formData.right_bullets || [];
    setFormData((prev) => ({
      ...prev,
      [section === 'left' ? 'left_bullets' : 'right_bullets']: bullets.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Helper to extract Wistia video ID and get thumbnail
  const getWistiaThumbnailUrl = (url: string): string => {
    const match = url.match(/medias\/([a-zA-Z0-9]+)/);
    if (match && match[1]) {
      return `https://fast.wistia.com/embed/medias/${match[1]}/swatch`;
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { header_subtitle, ...contentPayload } = formData;
      
      // Ensure Enterprise video fields are explicitly included in payload
      contentPayload.left_video_button_text = formData.left_video_button_text || '';
      contentPayload.left_video_wistia_url = formData.left_video_wistia_url || '';
      
      // Tago Media Video fields
      contentPayload.video_title = formData.video_title || '';
      contentPayload.video_description = formData.video_description || '';
      contentPayload.video_wistia_url = formData.video_wistia_url || '';
      
      await axiosInstance.post('/business-services/header', {
        header_subtitle: header_subtitle || '',
      });

      if (content?.id) {
        await axiosInstance.put(
          `/business-services/${content.id}`,
          contentPayload
        );
      } else {
        await axiosInstance.post('/business-services', contentPayload);
      }

      toast.success('Business Services content saved successfully');
      await fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save Business Services content');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Business Services Content
          </h1>
          <p className="text-gray-600 mb-8">
            Manage all content for the Business Services page
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Page Header
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Title
                </label>
                <input
                  type="text"
                  value={formData.header_title || ''}
                  onChange={(e) =>
                    handleInputChange('header_title', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Description
                </label>
                <textarea
                  value={formData.header_description || ''}
                  onChange={(e) =>
                    handleInputChange('header_description', e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Subtitle
                </label>
                <textarea
                  value={formData.header_subtitle || ''}
                  onChange={(e) =>
                    handleInputChange('header_subtitle', e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Our Offerings Section
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={formData.hero_title || ''}
                    onChange={(e) =>
                      handleInputChange('hero_title', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.hero_subtitle || ''}
                    onChange={(e) =>
                      handleInputChange('hero_subtitle', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left Offerings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Left Offering (Enterprise Services)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.left_title || ''}
                  onChange={(e) =>
                    handleInputChange('left_title', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.left_description || ''}
                  onChange={(e) =>
                    handleInputChange('left_description', e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.left_button_text || ''}
                  onChange={(e) =>
                    handleInputChange('left_button_text', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon Text
                </label>
                <input
                  type="text"
                  value={formData.left_icontext || ''}
                  onChange={(e) =>
                    handleInputChange('left_icontext', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Text to display next to the icon"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Play Video Button Text
                </label>
                <input
                  type="text"
                  value={formData.left_video_button_text || ''}
                  onChange={(e) =>
                    handleInputChange('left_video_button_text', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Play Video"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Wistia URL
                </label>
                <input
                  type="text"
                  value={formData.left_video_wistia_url || ''}
                  onChange={(e) =>
                    handleInputChange('left_video_wistia_url', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://fast.wistia.com/embed/medias/xxxxx/"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the Wistia video URL. The video will open in a modal when the Play Video button is clicked.
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Bullet Points
                  </label>
                  <button
                    type="button"
                    onClick={() => addBullet('left')}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(formData.left_bullets || []).map((bullet, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) =>
                          handleBulletChange('left', idx, e.target.value)
                        }
                        placeholder={`Bullet point ${idx + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeBullet('left', idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Offerings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Right Offering (TEAMS Program)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.right_title || ''}
                  onChange={(e) =>
                    handleInputChange('right_title', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.right_description || ''}
                  onChange={(e) =>
                    handleInputChange('right_description', e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.right_button_text || ''}
                  onChange={(e) =>
                    handleInputChange('right_button_text', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon Text
                </label>
                <input
                  type="text"
                  value={formData.right_icontext || ''}
                  onChange={(e) =>
                    handleInputChange('right_icontext', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Text to display next to the icon"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Play Video Button Text
                </label>
                <input
                  type="text"
                  value={formData.right_video_button_text || ''}
                  onChange={(e) =>
                    handleInputChange('right_video_button_text', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Play Video"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Wistia URL
                </label>
                <input
                  type="text"
                  value={formData.right_video_wistia_url || ''}
                  onChange={(e) =>
                    handleInputChange('right_video_wistia_url', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://fast.wistia.com/embed/medias/xxxxx/"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the Wistia video URL. The video will open in a modal when the Play Video button is clicked.
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Bullet Points
                  </label>
                  <button
                    type="button"
                    onClick={() => addBullet('right')}
                    className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2">
                  {(formData.right_bullets || []).map((bullet, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) =>
                          handleBulletChange('right', idx, e.target.value)
                        }
                        placeholder={`Bullet point ${idx + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeBullet('right', idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Choose Section
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={formData.why_title || ''}
                  onChange={(e) =>
                    handleInputChange('why_title', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {[1, 2, 3].map((boxNum) => (
                <div key={boxNum} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Box {boxNum}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={
                          (formData[
                            `why_box${boxNum}_title` as keyof BusinessServicesContent
                          ] as string) || ''
                        }
                        onChange={(e) =>
                          handleInputChange(`why_box${boxNum}_title`, e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={
                          (formData[
                            `why_box${boxNum}_description` as keyof BusinessServicesContent
                          ] as string) || ''
                        }
                        onChange={(e) =>
                          handleInputChange(
                            `why_box${boxNum}_description`,
                            e.target.value
                          )
                        }
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Ready Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ready to Transform Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.ready_title || ''}
                  onChange={(e) =>
                    handleInputChange('ready_title', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.ready_description || ''}
                  onChange={(e) =>
                    handleInputChange('ready_description', e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.ready_button_text || ''}
                  onChange={(e) =>
                    handleInputChange('ready_button_text', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Tago Media Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-6 border-2 border-blue-300 shadow-lg"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Tago Media Video Section</h2>
              <p className="text-sm text-gray-600 mt-1">Add a single featured video with thumbnail display</p>
            </div>
            
            {/* Section Title and Description */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={formData.video_title || ''}
                  onChange={(e) =>
                    handleInputChange('video_title', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Send Love with TagoCash"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Description
                </label>
                <textarea
                  value={formData.video_description || ''}
                  onChange={(e) =>
                    handleInputChange('video_description', e.target.value)
                  }
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., because every dollar deserves to arrive home whole."
                />
              </div>
            </div>
            
            {/* Video URL with Thumbnail Preview */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                {/* Thumbnail Preview */}
                <div className="w-48 h-28 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {formData.video_wistia_url && getWistiaThumbnailUrl(formData.video_wistia_url) ? (
                    <img
                      src={getWistiaThumbnailUrl(formData.video_wistia_url)}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Input Field */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wistia Video URL *
                  </label>
                  <input
                    type="text"
                    value={formData.video_wistia_url || ''}
                    onChange={(e) =>
                      handleInputChange('video_wistia_url', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://fast.wistia.com/embed/medias/xxxxx/"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the Wistia video URL. The video thumbnail will be displayed on the frontend. Users can click to play the video inline.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex justify-end gap-3"
          >
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave size={20} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AdminBusinessServicesContent;