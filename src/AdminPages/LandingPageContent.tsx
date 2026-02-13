import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import axiosInstance from '../helper/axios';
import {
  FaRocket, FaGem, FaQuestionCircle, FaStar,
  FaPlus, FaMobileAlt, FaHandshake, FaGlobe,
  FaMoneyBillWave, FaCheckCircle, FaIdCard,
  FaChartLine, FaLock
} from 'react-icons/fa';
import { Loader } from '../components/Loader';

interface ContentField {
  id: string;
  name: string;
  field_type: string;
  value: any;
  content_id?: string;
}

interface Content {
  id: string;
  page_id: string;
  title: string;
  description: string;
  fields: ContentField[];
  created_at?: string;
  updated_at?: string;
}

interface Section {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
  }[];
}

const sections: Section[] = [
  {
    id: 'money',
    name: 'Hero Section',
    icon: FaLock,
    fields: [
      { name: 'moneyTitle', type: 'text', label: 'Money Title', placeholder: 'Enter Money Title (e.g., MONEY)', required: false },
      { name: 'whatIsIt', type: 'text', label: 'What is it Text', placeholder: 'Enter text (e.g., What is it?)', required: false },
      { name: 'heading', type: 'text', label: 'Heading', placeholder: 'Enter heading (e.g., Send to friends & Family, where ever they are...)', required: false },
      { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Enter description', required: false },
    ],
  },
  {
    id: 'moneyTrust',
    name: 'Money: Digital Wallet',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'sectionHeading', type: 'text', label: 'Section Heading', placeholder: 'Borderless digital wallet for instant payments', required: true },
      { name: 'card1Title', type: 'text', label: 'Card 1 Title', placeholder: 'Digital Wallet', required: true },
      { name: 'card1Description', type: 'textarea', label: 'Card 1 Description', placeholder: 'Enter description...', required: true },
      { name: 'card1VideoUrl', type: 'text', label: 'Card 1 Video URL (Wistia)', placeholder: 'Enter Wistia URL', required: false },
      { name: 'card2Title', type: 'text', label: 'Card 2 Title', placeholder: 'Subtle', required: true },
      { name: 'card2Description', type: 'textarea', label: 'Card 2 Description', placeholder: 'Enter description...', required: true },
      { name: 'card2ImageUrl', type: 'text', label: 'Card 2 Image Path', placeholder: '/Card_2.png', required: false },
      { name: 'card3Title', type: 'text', label: 'Card 3 Title', placeholder: 'Essential', required: true },
      { name: 'card3Description', type: 'textarea', label: 'Card 3 Description', placeholder: 'Enter description...', required: true },
      { name: 'card3ImageUrl', type: 'text', label: 'Card 3 Image Path', placeholder: '/Card_3.png', required: false },
      { name: 'card4Title', type: 'text', label: 'Card 4 Title', placeholder: 'Global', required: true },
      { name: 'card4Description', type: 'textarea', label: 'Card 4 Description', placeholder: 'Enter description...', required: true },
      { name: 'card4ImageUrl', type: 'text', label: 'Card 4 Image Path', placeholder: '/Card_4Global.png', required: false },
    ],
  },
  {
    id: 'tagobanksection',
    name: 'TagoCash F.A.S.T',
    icon: FaChartLine,
    fields: [
      { name: 'fastSectionTitle', type: 'text', label: 'Main Section Title', placeholder: 'TagoCash is', required: true },
      { name: 'fastHeading', type: 'text', label: 'Card 1 - Heading', placeholder: 'Fast', required: true },
      { name: 'fastDescription', type: 'text', label: 'Card 1 - Description', placeholder: 'Real time transactions', required: true },
      { name: 'affordableHeading', type: 'text', label: 'Card 2 - Heading', placeholder: 'Affordable', required: true },
      { name: 'affordableDescription', type: 'text', label: 'Card 2 - Description', placeholder: 'Free transfer to partners', required: true },
      { name: 'secureHeading', type: 'text', label: 'Card 3 - Heading', placeholder: 'Secure', required: true },
      { name: 'secureDescription', type: 'text', label: 'Card 3 - Description', placeholder: 'Encrypted blockchain transmitted...', required: true },
      { name: 'transparentHeading', type: 'text', label: 'Card 4 - Heading', placeholder: 'Transparent', required: true },
      { name: 'transparentDescription', type: 'text', label: 'Card 4 - Description', placeholder: 'No Hidden fees...', required: true },
      { name: 'videoUrl', type: 'text', label: 'F.A.S.T Section Video URL', placeholder: '/TagoCash_fast_section_video.webm', required: false },
    ],
  },
  {
    id: 'tagoenough',
    name: 'TagoCash +',
    icon: FaStar,
    fields: [
      { name: 'videoUrl', type: 'text', label: 'Main Video URL', placeholder: 'Enter Wistia or video file URL' },
      { name: 'card1Title', type: 'text', label: 'Card 1 Title', placeholder: 'e.g. TagoCash+ Bank Account' },
      { name: 'card1DescHeader', type: 'text', label: 'Card 1 Description Header', placeholder: 'e.g. Borderless Digital Wallet...' },
      { name: 'card1Desc', type: 'textarea', label: 'Card 1 Description', placeholder: 'Enter card 1 description' },
      { name: 'card1FdicText', type: 'text', label: 'Card 1 FDIC Text', placeholder: 'e.g. FDIC INSURED' },
    ],
  },
  {
    id: 'videoSection',
    name: 'Video Section',
    icon: FaRocket,
    fields: [
      { name: 'videoTitle', type: 'text', label: 'Heading', placeholder: 'Send Love with TagoCash❤️', required: true },
      { name: 'videoDescription', type: 'textarea', label: 'Description Lines', placeholder: 'Enter description lines...', required: true },
      { name: 'videoUrl', type: 'text', label: 'Wistia Video URL', placeholder: 'https://fast.wistia.com/embed/medias/...', required: false },
    ],
  },
  {
    id: 'newFeatures',
    name: 'TagoCash Financial Transactions',
    icon: FaGem,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'TagoCash', required: true },
      { name: 'sectionSubtitle', type: 'text', label: 'Section Subtitle', placeholder: 'The end of obscurity...', required: true },
      { name: 'feature1Title', type: 'text', label: 'Feature 1 Title', placeholder: 'Financial toolbox...', required: true },
      { name: 'feature1Description', type: 'text', label: 'Feature 1 Description', placeholder: 'Manage treasury...', required: true },
      { name: 'feature2Title', type: 'text', label: 'Feature 2 Title', placeholder: 'Compliance + Speed...', required: true },
      { name: 'feature2Description', type: 'text', label: 'Feature 2 Description', placeholder: 'Move money with confidence...', required: true },
      { name: 'feature3Title', type: 'text', label: 'Feature 3 Title', placeholder: 'Trusted Infrastructure', required: true },
      { name: 'feature3Description', type: 'text', label: 'Feature 3 Description', placeholder: 'Built on blockchain...', required: true },
      { name: 'feature4Title', type: 'text', label: 'Feature 4 Title', placeholder: 'Reliable Infrastructure', required: true },
      { name: 'feature4Description', type: 'text', label: 'Feature 4 Description', placeholder: 'MPW wallet...', required: true },
    ]
  },
  {
    id: 'sendmony',
    name: 'Instant Global Payouts',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Instant Global Payouts', required: true },
      { name: 'sectionDescription', type: 'text', label: 'Section Description', placeholder: '...everyday payments made seamlessly', required: true },
    ],
  },
  {
    id: 'whyuse',
    name: 'Why Tago Section',
    icon: FaQuestionCircle,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Is TagoCash for you ? YES!', required: true },
      { name: 'sectionSubtitle', type: 'text', label: 'Section Subtitle', placeholder: 'Here is why:', required: true },
      { name: 'feature1Title', type: 'text', label: 'Feature 1 Title', placeholder: 'Fast', required: true },
      { name: 'feature1Description', type: 'text', label: 'Feature 1 Description', placeholder: 'Settled in seconds', required: true },
      { name: 'feature2Title', type: 'text', label: 'Feature 2 Title', placeholder: 'Free', required: true },
      { name: 'feature2Description', type: 'text', label: 'Feature 2 Description', placeholder: 'Free transfers...', required: true },
      { name: 'feature3Title', type: 'text', label: 'Feature 3 Title', placeholder: 'Affordable & Transparent', required: true },
      { name: 'feature3Description', type: 'text', label: 'Feature 3 Description', placeholder: 'No hidden fees', required: true },
      { name: 'feature4Title', type: 'text', label: 'Feature 4 Title', placeholder: 'Secure & Compliant', required: true },
      { name: 'feature4Description', type: 'text', label: 'Feature 4 Description', placeholder: 'Biometric authentication...', required: true },
    ],
  },
  {
    id: 'getmore',
    name: 'Get More Section',
    icon: FaPlus,
    fields: [
      { name: 'heading1', type: 'text', label: 'Heading Line 1', placeholder: 'Wherever you go, Tago', required: true },
      { name: 'heading2', type: 'text', label: 'Heading Line 2', placeholder: 'Get More with TagoCash', required: true },
      { name: 'feature1Title', type: 'text', label: 'Feature 1 Title', placeholder: 'Deposit & Withdrawal...', required: true },
      { name: 'feature1Description', type: 'text', label: 'Feature 1 Description', placeholder: 'Add or withdraw funds...', required: true },
      { name: 'feature2Title', type: 'text', label: 'Feature 2 Title', placeholder: 'Payments & Local Cash...', required: true },
      { name: 'feature2Description', type: 'text', label: 'Feature 2 Description', placeholder: 'Embedded QuickPay...', required: true },
      { name: 'feature3Title', type: 'text', label: 'Feature 3 Title', placeholder: 'Next Gen Tools...', required: true },
      { name: 'feature3Description', type: 'text', label: 'Feature 3 Description', placeholder: 'TagoMe, GetPaid...', required: true },
      { name: 'feature4Title', type: 'text', label: 'Feature 4 Title', placeholder: 'Borderless Global...', required: true },
      { name: 'feature4Description', type: 'text', label: 'Feature 4 Description', placeholder: 'Financial border barriers...', required: true },
    ],
  },
  {
    id: 'mobileapp',
    name: 'Mobile App Download',
    icon: FaMobileAlt,
    fields: [
      { name: 'smallTitle', type: 'text', label: 'Small Title', placeholder: 'Free TagoCash Wallet', required: true },
      { name: 'mainHeading', type: 'text', label: 'Main Heading', placeholder: "Don't carry cash, TagoCash!", required: true },
      { name: 'playStoreUrl', type: 'text', label: 'Play Store URL', placeholder: 'https://play.google.com/...', required: true },
      { name: 'appStoreUrl', type: 'text', label: 'App Store URL', placeholder: 'https://apps.apple.com/...', required: true },
    ],
  },
  {
    id: 'jurisdictions',
    name: 'Jurisdictions Section',
    icon: FaGlobe,
    fields: [
      { name: 'heading', type: 'text', label: 'Section Heading', placeholder: 'Where & How can I use TagoCash?', required: true },
    ],
  },
  {
    id: 'partnership',
    name: 'Partners Section',
    icon: FaHandshake,
    fields: [
      { name: 'heading', type: 'text', label: 'Section Heading', placeholder: 'Our Partners', required: true },
    ],
  },
];

const LandingPageContent: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>(sections[0].id);
  const [contents, setContents] = useState<{ [key: string]: Content }>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/content');
      if (response.data.success) {
        const contentMap: { [key: string]: Content } = {};
        response.data.data.forEach((content: Content) => {
          contentMap[content.page_id] = content;
        });
        setContents(contentMap);
      }
    } catch (error) {
      console.error('Error fetching contents:', error);
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async () => {
    setSaving(true);
    const section = sections.find(s => s.id === selectedSection);
    if (!section) return;

    try {
      const formData = new FormData(document.querySelector('form') as HTMLFormElement);
      const fields = section.fields.map(field => ({
        name: field.name,
        field_type: field.type,
        value: formData.get(field.name) as string || '',
      }));

      const newContent = {
        page_id: selectedSection,
        title: section.name,
        description: section.name,
        fields: fields,
      };

      const response = await axiosInstance.post('/content', newContent);

      if (response.data.success) {
        toast.success('Content saved successfully!');
        fetchContents();
      }
    } catch (error: any) {
      console.error('Error saving content:', error);
      toast.error(error.response?.data?.detail || 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const getFieldValue = (fieldName: string): string => {
    const content = contents[selectedSection];
    if (!content) return '';
    const field = content.fields.find(f => f.name === fieldName);
    return field?.value || '';
  };

  const currentSection = sections.find(s => s.id === selectedSection);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-8"
        >
          Landing Page Content Management
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Sections List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sections</h2>
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${selectedSection === section.id
                        ? 'bg-blue-50 text-blue-600 border-2 border-blue-500'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium text-left">{section.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader />
                </div>
              ) : currentSection ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveSection(); }}>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentSection.name}
                    </h2>
                    <p className="text-gray-600">
                      Manage content for this section
                    </p>
                  </div>

                  <div className="space-y-6">
                    {currentSection.fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            placeholder={field.placeholder}
                            defaultValue={getFieldValue(field.name)}
                            required={field.required}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            defaultValue={getFieldValue(field.name)}
                            required={field.required}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={fetchContents}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                      {saving ? (
                        <>
                          <Loader />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageContent;
