import { useState, useEffect } from 'react';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { Loader } from '../components/Loader';
import { FiSave, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface FeatureBox {
  title: string;
  description: string;
}

interface WhyBox {
  title: string;
  description: string;
}

interface EnterpriseServicesContent {
  id: string;
  header_title: string;
  header_subtitle: string;
  header_description: string;
  header_sub_description: string;
  header_extra_description: string;
  header_baseline_text: string;
  features_title: string;
  features_subtitle: string;
  features: FeatureBox[];
  teams_title: string;
  teams_subtitle: string;
  teams_card_tagline: string;
  teams_card_title: string;
  teams_card_subtitle: string;
  teams_card_price: string;
  teams_features: string[];
  why_title: string;
  why_subtitle: string;
  why_boxes: WhyBox[];
  why_tagopay_title: string;
  why_tagopay_security_title: string;
  why_tagopay_security_description: string;
  why_tagopay_support_title: string;
  why_tagopay_support_description: string;
  why_tagopay_scalability_title: string;
  why_tagopay_scalability_description: string;
  ready_title: string;
  ready_description: string;
  ready_button1_text: string;
  ready_button2_text: string;
}

const AdminEnterpriseServicesContent = () => {
  const [content, setContent] = useState<EnterpriseServicesContent | null>(null);
  const [formData, setFormData] = useState<Partial<EnterpriseServicesContent>>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/enterprise-services');
      setContent(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch Enterprise Services content');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const features = formData.features || [];
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    const features = formData.features || [];
    setFormData(prev => ({
      ...prev,
      features: [...features, { title: '', description: '' }]
    }));
  };

  const removeFeature = (index: number) => {
    const features = formData.features || [];
    setFormData(prev => ({
      ...prev,
      features: features.filter((_, i) => i !== index)
    }));
  };

  const handleTeamFeatureChange = (index: number, value: string) => {
    const features = formData.teams_features || [];
    const updated = [...features];
    updated[index] = value;
    setFormData(prev => ({ ...prev, teams_features: updated }));
  };

  const addTeamFeature = () => {
    const features = formData.teams_features || [];
    setFormData(prev => ({ ...prev, teams_features: [...features, ''] }));
  };

  const removeTeamFeature = (index: number) => {
    const features = formData.teams_features || [];
    setFormData(prev => ({
      ...prev,
      teams_features: features.filter((_, i) => i !== index)
    }));
  };

  const handleWhyBoxChange = (index: number, field: string, value: string) => {
    const boxes = formData.why_boxes || [];
    const updated = [...boxes];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, why_boxes: updated }));
  };

  const addWhyBox = () => {
    const boxes = formData.why_boxes || [];
    setFormData(prev => ({
      ...prev,
      why_boxes: [...boxes, { title: '', description: '' }]
    }));
  };

  const removeWhyBox = (index: number) => {
    const boxes = formData.why_boxes || [];
    setFormData(prev => ({
      ...prev,
      why_boxes: boxes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (content?.id) {
        await axiosInstance.put(`/enterprise-services/${content.id}`, formData);
      } else {
        await axiosInstance.post('/enterprise-services', formData);
      }
      toast.success('Enterprise Services content saved successfully');
      await fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save Enterprise Services content');
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Enterprise Services Content</h1>
          <p className="text-gray-600 mb-8">Manage all content for the Enterprise Services page</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Header Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.header_title || ''}
                  onChange={(e) => handleInputChange('header_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.header_subtitle || ''}
                  onChange={(e) => handleInputChange('header_subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.header_description || ''}
                  onChange={(e) => handleInputChange('header_description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub Description</label>
                <textarea
                  value={formData.header_sub_description || ''}
                  onChange={(e) => handleInputChange('header_sub_description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Extra Description</label>
                <textarea
                  value={formData.header_extra_description || ''}
                  onChange={(e) => handleInputChange('header_extra_description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Baseline Text</label>
                <input
                  type="text"
                  value={formData.header_baseline_text || ''}
                  onChange={(e) => handleInputChange('header_baseline_text', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features Section</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features Title</label>
                <input
                  type="text"
                  value={formData.features_title || ''}
                  onChange={(e) => handleInputChange('features_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features Subtitle</label>
                <input
                  type="text"
                  value={formData.features_subtitle || ''}
                  onChange={(e) => handleInputChange('features_subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Feature Boxes</label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                >
                  + Add Feature
                </button>
              </div>
              <div className="space-y-4">
                {(formData.features || []).map((feature, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-700">Feature {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                        placeholder="Feature title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                        placeholder="Feature description"
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* TEAMS Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">TEAMS Section</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TEAMS Title</label>
                <input
                  type="text"
                  value={formData.teams_title || ''}
                  onChange={(e) => handleInputChange('teams_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TEAMS Subtitle</label>
                <input
                  type="text"
                  value={formData.teams_subtitle || ''}
                  onChange={(e) => handleInputChange('teams_subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Card Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.teams_card_tagline || ''}
                  onChange={(e) => handleInputChange('teams_card_tagline', e.target.value)}
                  placeholder="Card tagline"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={formData.teams_card_title || ''}
                  onChange={(e) => handleInputChange('teams_card_title', e.target.value)}
                  placeholder="Card title"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.teams_card_subtitle || ''}
                  onChange={(e) => handleInputChange('teams_card_subtitle', e.target.value)}
                  placeholder="Card subtitle"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={formData.teams_card_price || ''}
                  onChange={(e) => handleInputChange('teams_card_price', e.target.value)}
                  placeholder="Price"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">TEAMS Features</label>
                <button
                  type="button"
                  onClick={addTeamFeature}
                  className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                  + Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {(formData.teams_features || []).map((feature, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleTeamFeatureChange(idx, e.target.value)}
                      placeholder={`Feature ${idx + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeTeamFeature(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Why Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose TEAMS Section</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why Title</label>
                <input
                  type="text"
                  value={formData.why_title || ''}
                  onChange={(e) => handleInputChange('why_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why Subtitle</label>
                <input
                  type="text"
                  value={formData.why_subtitle || ''}
                  onChange={(e) => handleInputChange('why_subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Why Boxes</label>
                <button
                  type="button"
                  onClick={addWhyBox}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  + Add Box
                </button>
              </div>
              <div className="space-y-4">
                {(formData.why_boxes || []).map((box, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-700">Why Box {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeWhyBox(idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={box.title}
                        onChange={(e) => handleWhyBoxChange(idx, 'title', e.target.value)}
                        placeholder="Box title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        value={box.description}
                        onChange={(e) => handleWhyBoxChange(idx, 'description', e.target.value)}
                        placeholder="Box description"
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Why TagoPay Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.28 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why TagoPay Section</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why TagoPay Title</label>
                <input
                  type="text"
                  value={formData.why_tagopay_title || 'Why TagoPay?'}
                  onChange={(e) => handleInputChange('why_tagopay_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Security Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Security & Compliance</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Security Title</label>
                    <input
                      type="text"
                      value={formData.why_tagopay_security_title || 'Security First —> Compliance & Security'}
                      onChange={(e) => handleInputChange('why_tagopay_security_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Security Description</label>
                    <textarea
                      value={formData.why_tagopay_security_description || 'Enterprise-grade security with global and local compliance.'}
                      onChange={(e) => handleInputChange('why_tagopay_security_description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">24/7 Support</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Title</label>
                    <input
                      type="text"
                      value={formData.why_tagopay_support_title || '24/7 Support'}
                      onChange={(e) => handleInputChange('why_tagopay_support_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Description</label>
                    <textarea
                      value={formData.why_tagopay_support_description || 'Dedicated support team available'}
                      onChange={(e) => handleInputChange('why_tagopay_support_description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Scalability Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Scalability</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scalability Title</label>
                    <input
                      type="text"
                      value={formData.why_tagopay_scalability_title || 'Scalability'}
                      onChange={(e) => handleInputChange('why_tagopay_scalability_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scalability Description</label>
                    <textarea
                      value={formData.why_tagopay_scalability_description || 'Accelerate & expand your global reach'}
                      onChange={(e) => handleInputChange('why_tagopay_scalability_description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ready Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ready Title</label>
                <input
                  type="text"
                  value={formData.ready_title || ''}
                  onChange={(e) => handleInputChange('ready_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ready Description</label>
                <textarea
                  value={formData.ready_description || ''}
                  onChange={(e) => handleInputChange('ready_description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button 1 Text</label>
                  <input
                    type="text"
                    value={formData.ready_button1_text || ''}
                    onChange={(e) => handleInputChange('ready_button1_text', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button 2 Text</label>
                  <input
                    type="text"
                    value={formData.ready_button2_text || ''}
                    onChange={(e) => handleInputChange('ready_button2_text', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
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

export default AdminEnterpriseServicesContent;
