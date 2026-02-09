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
    id: 'platformsecurity',
    name: 'Hero Section',
    icon: FaLock,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Heading Text', placeholder: 'TagoCash Platform', required: false },
      { name: 'sectionSubtitle', type: 'text', label: 'Subtitle Text', placeholder: 'Secure, fast, and global payment solutions', required: false },
      { name: 'videoUrl', type: 'text', label: 'Wistia Video URL', placeholder: 'Enter Wistia video URL', required: false },
      { name: 'videoHeader', type: 'text', label: 'Video Top Heading', placeholder: 'Enter heading to show above video', required: false },
      { name: 'videoDescription', type: 'textarea', label: 'Video Bottom Description', placeholder: 'Enter description to show below video', required: false },
      { name: 'featuresList', type: 'textarea', label: 'Description Lines (one per line)', placeholder: 'Enter description lines, one per line. You can add up to 6 lines now, more can be added later.', required: false },
      { name: 'securityTitle', type: 'text', label: 'Bottom Heading', placeholder: 'Risk Intolerant Security Suite', required: false },
    ],
  },
  {
    id: 'money',
    name: 'Money Section',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'moneyTitle', type: 'text', label: 'Money Title', placeholder: 'Enter Money Title (e.g., MONEY)', required: false },
      { name: 'whatIsIt', type: 'text', label: 'What is it Text', placeholder: 'Enter text (e.g., What is it?)', required: false },
      { name: 'heading', type: 'text', label: 'Heading', placeholder: 'Enter heading (e.g., Send to friends & Family, where ever they are...)', required: false },
      { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Enter description', required: false },
    ],
  },
  {
    id: 'hero',
    name: 'Send to Friends & Family',
    icon: FaRocket,
    fields: [
      { name: 'mainHeading', type: 'text', label: 'Main Heading', placeholder: 'Enter main heading', required: true },
      { name: 'mainHeading2', type: 'text', label: 'Main Heading 2', placeholder: 'Enter main heading 2', required: true },
      { name: 'tagline', type: 'text', label: 'Tagline', placeholder: 'Enter tagline', required: true },
      { name: 'subHeading', type: 'text', label: 'Sub Heading', placeholder: 'Enter sub heading', required: true },
      { name: 'sloganTitle', type: 'text', label: 'Slogan Title', placeholder: 'Enter slogan title', required: true },
      { name: 'block1', type: 'text', label: 'Block 1', placeholder: 'Enter block 1', required: false },
      { name: 'block2', type: 'text', label: 'Block 2', placeholder: 'Enter block 2', required: false },
      { name: 'block3', type: 'text', label: 'Block 3', placeholder: 'Enter block 3', required: false },
      { name: 'block4', type: 'text', label: 'Block 4', placeholder: 'Enter block 4', required: false },
      { name: 'block5', type: 'text', label: 'Block 5', placeholder: 'Enter block 5', required: false },
      { name: 'block6', type: 'text', label: 'Block 6', placeholder: 'Enter block 6', required: false },
      { name: 'sloganSubTitle', type: 'text', label: 'Slogan Sub Title', placeholder: 'Enter slogan sub title', required: true },
    ],
  },
  {
    id: 'withdraw',
    name: 'TagoCash Instant',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'heading', type: 'text', label: 'Heading', placeholder: 'Enter heading', required: false },
      { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Enter description', required: false },
      { name: 'secondDescription', type: 'textarea', label: 'Second Description (Smaller)', placeholder: 'Enter second description (smaller size)', required: false },
    ],
  },
  {
    id: 'depositswithdrawals',
    name: 'Deposits & Withdraw',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'card1Heading', type: 'text', label: 'Card 1 - Heading', placeholder: 'Enter card 1 heading', required: false },
      { name: 'card1SubHeading', type: 'text', label: 'Card 1 - Sub Heading (Smaller)', placeholder: 'Enter card 1 sub heading', required: false },
      { name: 'card1SmallHeading', type: 'text', label: 'Card 1 - Small Heading (Even Smaller)', placeholder: 'Enter card 1 small heading', required: false },
      { name: 'card1Description', type: 'textarea', label: 'Card 1 - Description', placeholder: 'Enter card 1 description', required: false },
      { name: 'card2Heading', type: 'text', label: 'Card 2 - Heading', placeholder: 'Enter card 2 heading', required: false },
      { name: 'card2Point1', type: 'text', label: 'Card 2 - Point 1', placeholder: 'Enter point 1', required: false },
      { name: 'card2Point2', type: 'text', label: 'Card 2 - Point 2', placeholder: 'Enter point 2', required: false },
      { name: 'card2Point3', type: 'text', label: 'Card 2 - Point 3', placeholder: 'Enter point 3', required: false },
      { name: 'card2Point4', type: 'text', label: 'Card 2 - Point 4', placeholder: 'Enter point 4', required: false },
    ],
  },
  {
    id: 'nosurprises',
    name: 'No Surprises',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'heading', type: 'text', label: 'Heading', placeholder: 'Enter heading (e.g., No surprises)', required: false },
      { name: 'subHeading', type: 'text', label: 'Sub Heading (Smaller)', placeholder: 'Enter sub heading', required: false },
      { name: 'point1', type: 'text', label: 'Point 1', placeholder: 'Enter point 1 (e.g., $0 to sign up)', required: false },
      { name: 'point2', type: 'text', label: 'Point 2', placeholder: 'Enter point 2 (e.g., $0 to send money*)', required: false },
      { name: 'point3', type: 'text', label: 'Point 3', placeholder: 'Enter point 3 (e.g., $0 monthly fees)', required: false },
      { name: 'learnMore', type: 'text', label: 'Learn More Text', placeholder: 'Enter learn more text', required: false },
      { name: 'footnote1', type: 'textarea', label: 'Footnote 1', placeholder: 'Enter first footnote', required: false },
      { name: 'footnote2', type: 'textarea', label: 'Footnote 2', placeholder: 'Enter second footnote', required: false },
    ],
  },
  {
    id: 'tagobanksection',
    name: 'TagoCash F.A.S.T',
    icon: FaChartLine,
    fields: [
      { name: 'title', type: 'text', label: 'Title', placeholder: 'Enter Title (e.g., TagoBank)', required: true },
      { name: 'subtitle', type: 'text', label: 'Subtitle', placeholder: 'Enter Subtitle (e.g., Bank Account Number)', required: true },
      { name: 'availableText', type: 'text', label: 'Available Text', placeholder: 'Enter Available Text (e.g., Available to Residents 150+ countries)', required: true },
      { name: 'tagline', type: 'text', label: 'Tagline', placeholder: 'Enter Tagline (e.g., The World First Digital Bank)', required: true },
      { name: 'fdicText', type: 'text', label: 'FDIC Insured Text', placeholder: 'Enter FDIC Text (e.g., FDIC Insured)', required: true },
      { name: 'buttontext', type: 'text', label: 'Button Text', placeholder: 'Enter Button Text (e.g., Enter)', required: true },
      { name: 'fastSectionTitle', type: 'text', label: 'FAST Section Title', placeholder: 'Enter FAST Section Title (e.g., TagoCash is :F.A.S.T)', required: false },
      { name: 'fastHeading', type: 'text', label: 'Fast Heading', placeholder: 'Enter Fast Heading (e.g., Fast)', required: false },
      { name: 'fastDescription', type: 'text', label: 'Fast Description', placeholder: 'Enter Fast Description (e.g., Real Time Transactions)', required: false },
      { name: 'affordableHeading', type: 'text', label: 'Affordable Heading', placeholder: 'Enter Affordable Heading (e.g., Affordable)', required: false },
      { name: 'affordableDescription', type: 'text', label: 'Affordable Description', placeholder: 'Enter Affordable Description (e.g., Free Transfer to partners)', required: false },
      { name: 'secureHeading', type: 'text', label: 'Secure Heading', placeholder: 'Enter Secure Heading (e.g., Secure)', required: false },
      { name: 'secureDescription', type: 'text', label: 'Secure Description', placeholder: 'Enter Secure Description (e.g., Encrypted blockchain transmitted and access by your biometric)', required: false },
      { name: 'transparentHeading', type: 'text', label: 'Transparent Heading', placeholder: 'Enter Transparent Heading (e.g., Transparent)', required: false },
      { name: 'transparentDescription', type: 'text', label: 'Transparent Description', placeholder: 'Enter Transparent Description (e.g., No Hidden fees, what you see is what you pay)', required: false },
    ],
  },
  {
    id: 'valueandbenefits',
    name: 'Value & Benefits',
    icon: FaGem,
    fields: [
      { name: 'heading', type: 'text', label: 'Heading', placeholder: 'Enter heading', required: false },
      { name: 'subPoint1', type: 'text', label: 'Sub Point 1', placeholder: 'e.g. Individuals', required: false },
      { name: 'subPoint2', type: 'text', label: 'Sub Point 2', placeholder: 'e.g. Merchants', required: false },
      { name: 'subPoint3', type: 'text', label: 'Sub Point 3', placeholder: 'e.g. Enterprises', required: false },
      { name: 'individualTitle', type: 'text', label: 'Individual Title', placeholder: 'Enter individual title', required: true },
      { name: 'individualTagline', type: 'text', label: 'Individual Tagline', placeholder: 'Enter individual tagline', required: true },
      { name: 'individualDescription', type: 'text', label: 'Individual Description', placeholder: 'Enter individual description', required: true },
      { name: 'individualHighlight', type: 'text', label: 'Individual Highlight', placeholder: 'Enter individual highlight', required: true },
      { name: 'individualVideoLink', type: 'text', label: 'Individual Video Link', placeholder: 'Enter individual video link', required: false },
      { name: 'merchantTitle', type: 'text', label: 'Merchant Title', placeholder: 'Enter merchant title', required: true },
      { name: 'merchantTagline', type: 'text', label: 'Merchant Tagline', placeholder: 'Enter merchant tagline', required: true },
      { name: 'merchantDescription', type: 'text', label: 'Merchant Description', placeholder: 'Enter merchant description', required: true },
      { name: 'merchantHighlight', type: 'text', label: 'Merchant Highlight', placeholder: 'Enter merchant highlight', required: true },
      { name: 'merchantVideoLink', type: 'text', label: 'Merchant Video Link', placeholder: 'Enter merchant video link', required: false },
      { name: 'enterpriseTitle', type: 'text', label: 'Enterprise Title', placeholder: 'Enter enterprise title', required: true },
      { name: 'enterpriseTagline', type: 'text', label: 'Enterprise Tagline', placeholder: 'Enter enterprise tagline', required: true },
      { name: 'enterpriseDescription', type: 'text', label: 'Enterprise Description', placeholder: 'Enter enterprise description', required: true },
      { name: 'enterpriseHighlight', type: 'text', label: 'Enterprise Highlight', placeholder: 'Enter enterprise highlight', required: true },
      { name: 'enterpriseVideoLink', type: 'text', label: 'Enterprise Video Link', placeholder: 'Enter enterprise video link', required: false },
    ],
  },
  {
    id: 'tagoenough',
    name: 'TagoCash +',
    icon: FaStar,
    fields: [
      { name: 'videoUrl', type: 'text', label: 'Main Video URL', placeholder: 'Enter Wistia or video file URL' },
      // Card 1
      { name: 'card1Title', type: 'text', label: 'Card 1 Title', placeholder: 'e.g. TagoCash+ Bank Account' },
      { name: 'card1DescHeader', type: 'text', label: 'Card 1 Description Header', placeholder: 'e.g. Borderless Digital Wallet...' },
      { name: 'card1Desc', type: 'textarea', label: 'Card 1 Description', placeholder: 'Enter card 1 description' },
      { name: 'card1FdicText', type: 'text', label: 'Card 1 FDIC Text', placeholder: 'e.g. FDIC INSURED' },
      // Card 2
      { name: 'card2Title', type: 'text', label: 'Card 2 Title', placeholder: 'e.g. TagoBridge & HifiTago Global' },
      { name: 'card2Desc', type: 'textarea', label: 'Card 2 Description', placeholder: 'Enter card 2 description' },
      // Card 3
      { name: 'card3Title', type: 'text', label: 'Card 3 Title', placeholder: 'e.g. Integrated Traditional Banking Rails' },
      { name: 'card3Subtitle', type: 'text', label: 'Card 3 Subtitle', placeholder: 'e.g. (ACH, RTP, IBAN, SWIFT, FedNow)' },
      // Card 4
      { name: 'card4Title', type: 'text', label: 'Card 4 Title', placeholder: 'Enter card 4 title (optional)' },
      { name: 'card4Desc', type: 'textarea', label: 'Card 4 Description', placeholder: 'Enter card 4 description (optional)' },
      // Card 5
      { name: 'card5Title', type: 'text', label: 'Card 5 Title', placeholder: 'Enter card 5 title (optional)' },
      { name: 'card5Desc', type: 'textarea', label: 'Card 5 Description', placeholder: 'Enter card 5 description (optional)' },
      // Card 6
      { name: 'card6Title', type: 'text', label: 'Card 6 Title', placeholder: 'Enter card 6 title (optional)' },
      { name: 'card6Desc', type: 'textarea', label: 'Card 6 Description', placeholder: 'Enter card 6 description (optional)' },
    ],
  },
  {
    id: 'newFeatures',
    name: 'TagoCash Financial Transactions',
    icon: FaGem,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'sectionSubtitle', type: 'text', label: 'Section Subtitle', placeholder: 'Enter section subtitle', required: true },
      { name: 'feature1Title', type: 'text', label: 'Feature 1 Title', placeholder: 'Enter feature 1 title', required: true },
      { name: 'feature1Description', type: 'text', label: 'Feature 1 Description', placeholder: 'Enter feature 1 description', required: true },
      { name: 'feature2Title', type: 'text', label: 'Feature 2 Title', placeholder: 'Enter feature 2 title', required: true },
      { name: 'feature2Description', type: 'text', label: 'Feature 2 Description', placeholder: 'Enter feature 2 description', required: true },
      { name: 'feature3Title', type: 'text', label: 'Feature 3 Title', placeholder: 'Enter feature 3 title', required: true },
      { name: 'feature3Description', type: 'text', label: 'Feature 3 Description', placeholder: 'Enter feature 3 description', required: true },
      { name: 'feature4Title', type: 'text', label: 'Feature 4 Title', placeholder: 'Enter feature 4 title', required: true },
      { name: 'feature4Description', type: 'text', label: 'Feature 4 Description', placeholder: 'Enter feature 4 description', required: true },
    ]
  },
  {
    id: 'sendmony',
    name: 'Instant Global Payouts',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'sectionDescription', type: 'text', label: 'Section Description', placeholder: 'Enter section description', required: true },
    ],
  },
  {
    id: 'whyuse',
    name: 'TagoCash For You?',
    icon: FaQuestionCircle,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'sectionSubtitle', type: 'text', label: 'Subtitle', placeholder: 'Enter subtitle', required: true },
      { name: 'feature1Title', type: 'text', label: 'Feature 1 Title', placeholder: 'Enter feature 1 title', required: true },
      { name: 'feature1Description', type: 'text', label: 'Feature 1 Description', placeholder: 'Enter feature 1 description', required: true },
      { name: 'feature2Title', type: 'text', label: 'Feature 2 Title', placeholder: 'Enter feature 2 title', required: true },
      { name: 'feature2Description', type: 'text', label: 'Feature 2 Description', placeholder: 'Enter feature 2 description', required: true },
      { name: 'feature3Title', type: 'text', label: 'Feature 3 Title', placeholder: 'Enter feature 3 title', required: true },
      { name: 'feature3Description', type: 'text', label: 'Feature 3 Description', placeholder: 'Enter feature 3 description', required: true },
      { name: 'feature4Title', type: 'text', label: 'Feature 4 Title', placeholder: 'Enter feature 4 title', required: true },
      { name: 'feature4Description', type: 'text', label: 'Feature 4 Description', placeholder: 'Enter feature 4 description', required: true },
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
