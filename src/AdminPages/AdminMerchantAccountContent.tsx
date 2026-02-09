import { useState, useEffect } from 'react';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { Loader } from '../components/Loader';
import { FiSave, FiX, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface PaymentMethod {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

interface PricingFeature {
  icon: string;
  title: string;
  value: string;
  description: string;
  color: string;
  bgColor: string;
}

interface MerchantAccountContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  payment_methods_title: string;
  payment_methods_subtitle?: string;
  payment_methods: PaymentMethod[];
  pricing_title: string;
  pricing_features: PricingFeature[];
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
  cta_button_link: string;
}

const AdminMerchantAccountContent = () => {
  const [content, setContent] = useState<MerchantAccountContent | null>(null);
  const [formData, setFormData] = useState<Partial<MerchantAccountContent>>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/merchant-account');
      setContent(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch Merchant Account content');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (index: number, field: keyof PaymentMethod, value: string) => {
    const methods = formData.payment_methods || [];
    const updatedMethods = [...methods];
    updatedMethods[index] = { ...updatedMethods[index], [field]: value };
    setFormData(prev => ({ ...prev, payment_methods: updatedMethods }));
  };

  const addPaymentMethod = () => {
    const methods = formData.payment_methods || [];
    setFormData(prev => ({
      ...prev,
      payment_methods: [...methods, {
        icon: 'Link2',
        title: '',
        description: '',
        gradient: 'from-blue-500 to-cyan-500'
      }]
    }));
  };

  const removePaymentMethod = (index: number) => {
    const methods = formData.payment_methods || [];
    setFormData(prev => ({
      ...prev,
      payment_methods: methods.filter((_, i) => i !== index)
    }));
  };

  const handlePricingFeatureChange = (index: number, field: keyof PricingFeature, value: string) => {
    const features = formData.pricing_features || [];
    const updatedFeatures = [...features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFormData(prev => ({ ...prev, pricing_features: updatedFeatures }));
  };

  const addPricingFeature = () => {
    const features = formData.pricing_features || [];
    setFormData(prev => ({
      ...prev,
      pricing_features: [...features, {
        icon: 'CreditCard',
        title: '',
        value: '',
        description: '',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      }]
    }));
  };

  const removePricingFeature = (index: number) => {
    const features = formData.pricing_features || [];
    setFormData(prev => ({
      ...prev,
      pricing_features: features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (content?.id) {
        await axiosInstance.put(`/merchant-account/${content.id}`, formData);
      } else {
        await axiosInstance.post('/merchant-account', formData);
      }
      toast.success('Merchant Account content saved successfully');
      await fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save Merchant Account content');
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Merchant Account Content</h1>
          <p className="text-gray-600 mb-8">Manage all content for the Merchant Account page</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={formData.hero_title || ''}
                  onChange={(e) => handleInputChange('hero_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                <input
                  type="text"
                  value={formData.hero_subtitle || ''}
                  onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
                <textarea
                  value={formData.hero_description || ''}
                  onChange={(e) => handleInputChange('hero_description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Payment Methods Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Payment Methods Section</h2>
              <button
                type="button"
                onClick={addPaymentMethod}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <FiPlus size={16} />
                Add Method
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <input
                  type="text"
                  value={formData.payment_methods_title || ''}
                  onChange={(e) => handleInputChange('payment_methods_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Subtitle</label>
                <input
                  type="text"
                  value={formData.payment_methods_subtitle || ''}
                  onChange={(e) => handleInputChange('payment_methods_subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subtitle text (optional)"
                />
              </div>
              <div className="space-y-4">
                {(formData.payment_methods || []).map((method, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-900">Payment Method {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removePaymentMethod(index)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <select
                          value={method.icon}
                          onChange={(e) => handlePaymentMethodChange(index, 'icon', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Link2">Link2</option>
                          <option value="QrCode">QrCode</option>
                          <option value="Coins">Coins</option>
                          <option value="DollarSign">DollarSign</option>
                          <option value="Wallet">Wallet</option>
                          <option value="CreditCard">CreditCard</option>
                          <option value="Zap">Zap</option>
                          <option value="TrendingUp">TrendingUp (Coinbase)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gradient</label>
                        <select
                          value={method.gradient}
                          onChange={(e) => handlePaymentMethodChange(index, 'gradient', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                          <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                          <option value="from-green-500 to-emerald-500">Green to Emerald</option>
                          <option value="from-amber-500 to-orange-500">Amber to Orange</option>
                          <option value="from-indigo-500 to-violet-500">Indigo to Violet</option>
                          <option value="from-red-500 to-pink-500">Red to Pink</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={method.title}
                        onChange={(e) => handlePaymentMethodChange(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={method.description}
                        onChange={(e) => handlePaymentMethodChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pricing Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pricing Features Section</h2>
              <button
                type="button"
                onClick={addPricingFeature}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                <FiPlus size={16} />
                Add Feature
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <input
                  type="text"
                  value={formData.pricing_title || ''}
                  onChange={(e) => handleInputChange('pricing_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-4">
                {(formData.pricing_features || []).map((feature, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-900">Pricing Feature {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removePricingFeature(index)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <select
                          value={feature.icon}
                          onChange={(e) => handlePricingFeatureChange(index, 'icon', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="CreditCard">CreditCard</option>
                          <option value="Zap">Zap</option>
                          <option value="DollarSign">DollarSign</option>
                          <option value="Clock">Clock</option>
                          <option value="Shield">Shield</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                        <select
                          value={feature.color}
                          onChange={(e) => handlePricingFeatureChange(index, 'color', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="text-blue-600">Blue</option>
                          <option value="text-green-600">Green</option>
                          <option value="text-purple-600">Purple</option>
                          <option value="text-red-600">Red</option>
                          <option value="text-yellow-600">Yellow</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                        <select
                          value={feature.bgColor}
                          onChange={(e) => handlePricingFeatureChange(index, 'bgColor', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="bg-blue-50">Blue</option>
                          <option value="bg-green-50">Green</option>
                          <option value="bg-purple-50">Purple</option>
                          <option value="bg-red-50">Red</option>
                          <option value="bg-yellow-50">Yellow</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                        <input
                          type="text"
                          value={feature.value}
                          onChange={(e) => handlePricingFeatureChange(index, 'value', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => handlePricingFeatureChange(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={feature.description}
                        onChange={(e) => handlePricingFeatureChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Call to Action Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
                <input
                  type="text"
                  value={formData.cta_title || ''}
                  onChange={(e) => handleInputChange('cta_title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Description</label>
                <textarea
                  value={formData.cta_description || ''}
                  onChange={(e) => handleInputChange('cta_description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                  <input
                    type="text"
                    value={formData.cta_button_text || ''}
                    onChange={(e) => handleInputChange('cta_button_text', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                  <input
                    type="text"
                    value={formData.cta_button_link || ''}
                    onChange={(e) => handleInputChange('cta_button_link', e.target.value)}
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
            transition={{ duration: 0.3, delay: 0.3 }}
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

export default AdminMerchantAccountContent;
