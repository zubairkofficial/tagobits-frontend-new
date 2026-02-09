import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../helper/axios';
import {
  FaRocket, FaGem, FaQuestionCircle, FaStar,
  FaPlus, FaMobileAlt, FaHandshake, FaGlobe,
  FaMoneyBillWave, FaCheckCircle, FaNewspaper, FaIdCard
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
    id: 'hero',
    name: 'Hero Section',
    icon: FaRocket,
    fields: [
      { name: 'mainHeading', type: 'text', label: 'Main Heading', placeholder: 'Enter main heading', required: true },
    ],
  },
  {
    id: 'hero2',
    name: 'Hero 2 Section',
    icon: FaRocket,
    fields: [
      { name: 'mainHeading', type: 'text', label: 'Main Heading', placeholder: 'Enter main heading', required: false },
      { name: 'actioncurrencymain', type: 'text', label: 'Action Currency Main', placeholder: 'Enter action currency main', required: true },
      { name: 'actiontransaction', type: 'text', label: 'Action Transaction', placeholder: 'Enter action transaction', required: true },
      { name: 'actionamount', type: 'text', label: 'Action Amount', placeholder: 'Enter action amount', required: true },
      { name: 'actioncurrency', type: 'text', label: 'Action Currency', placeholder: 'Enter action currency', required: true },
      { name: 'actiontransaction2', type: 'text', label: 'Action Transaction 2', placeholder: 'Enter action transaction 2', required: true },
      { name: 'actionamount2', type: 'text', label: 'Action Amount 2', placeholder: 'Enter action amount 2', required: true },
      { name: 'actioncurrency2', type: 'text', label: 'Action Currency 2', placeholder: 'Enter action currency 2', required: true },
      { name: 'actioncurrencymain2', type: 'text', label: 'Action Currency Main 2', placeholder: 'Enter action currency main 2', required: true },
    ],
  },
  {
    id: 'contactwithus',
    name: 'Contact With Us Section',
    icon: FaHandshake,
    fields: [
      { name: 'buttonText', type: 'text', label: 'Button Text', placeholder: 'Enter button text', required: true },
    ],
  },
  {
    id: 'features',
    name: 'Features Section',
    icon: FaStar,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'feature1Title', type: 'text', label: 'Feature 1 Title', placeholder: 'Enter feature 1 title', required: true },
      { name: 'feature1Description', type: 'text', label: 'Feature 1 Description', placeholder: 'Enter feature 1 description', required: true },
      { name: 'feature2Title', type: 'text', label: 'Feature 2 Title', placeholder: 'Enter feature 2 title', required: true },
      { name: 'feature2Description', type: 'text', label: 'Feature 2 Description', placeholder: 'Enter feature 2 description', required: true },
      { name: 'feature3Title', type: 'text', label: 'Feature 3 Title', placeholder: 'Enter feature 3 title', required: true },
      { name: 'feature3Description', type: 'text', label: 'Feature 3 Description', placeholder: 'Enter feature 3 description', required: true },
      { name: 'feature4Title', type: 'text', label: 'Feature 4 Title', placeholder: 'Enter feature 4 title', required: true },
      { name: 'feature4Description', type: 'text', label: 'Feature 4 Description', placeholder: 'Enter feature 4 description', required: true },
      { name: 'feature5Title', type: 'text', label: 'Feature 5 Title', placeholder: 'Enter feature 5 title', required: false },
      { name: 'feature5Description', type: 'text', label: 'Feature 5 Description', placeholder: 'Enter feature 5 description', required: false },
      { name: 'feature6Title', type: 'text', label: 'Feature 6 Title', placeholder: 'Enter feature 6 title', required: false },
      { name: 'feature6Description', type: 'text', label: 'Feature 6 Description', placeholder: 'Enter feature 6 description', required: false },
    ],
  },
  {
    id: 'how',
    name: 'How It Works Section',
    icon: FaGem,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'step1Title', type: 'text', label: 'Step 1 Title', placeholder: 'Enter step 1 title', required: true },
      { name: 'step1Description', type: 'text', label: 'Step 1 Description', placeholder: 'Enter step 1 description', required: true },
      { name: 'step2Title', type: 'text', label: 'Step 2 Title', placeholder: 'Enter step 2 title', required: true },
      { name: 'step2Description', type: 'text', label: 'Step 2 Description', placeholder: 'Enter step 2 description', required: true },
      { name: 'step3Title', type: 'text', label: 'Step 3 Title', placeholder: 'Enter step 3 title', required: true },
      { name: 'step3Description', type: 'text', label: 'Step 3 Description', placeholder: 'Enter step 3 description', required: true },
      { name: 'step4Title', type: 'text', label: 'Step 4 Title', placeholder: 'Enter step 4 title', required: true },
      { name: 'step4Description', type: 'text', label: 'Step 4 Description', placeholder: 'Enter step 4 description', required: true },
      { name: 'step5Title', type: 'text', label: 'Step 5 Title', placeholder: 'Enter step 5 title', required: true },
      { name: 'step5Description', type: 'text', label: 'Step 5 Description', placeholder: 'Enter step 5 description', required: true },
    ],
  },
  {
    id: 'usecase',
    name: 'Why TagoBridge Section',
    icon: FaCheckCircle,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'case1Title', type: 'text', label: 'Case 1 Title', placeholder: 'Enter case 1 title', required: true },
      { name: 'case1Description', type: 'text', label: 'Case 1 Description', placeholder: 'Enter case 1 description', required: true },
      { name: 'case2Title', type: 'text', label: 'Case 2 Title', placeholder: 'Enter case 2 title', required: true },
      { name: 'case2Description', type: 'text', label: 'Case 2 Description', placeholder: 'Enter case 2 description', required: true },
      { name: 'case3Title', type: 'text', label: 'Case 3 Title', placeholder: 'Enter case 3 title', required: true },
      { name: 'case3Description', type: 'text', label: 'Case 3 Description', placeholder: 'Enter case 3 description', required: true },
      { name: 'case4Title', type: 'text', label: 'Case 4 Title', placeholder: 'Enter case 4 title', required: true },
      { name: 'case4Description', type: 'text', label: 'Case 4 Description', placeholder: 'Enter case 4 description', required: true },
    ],
  },
  {
    id: 'wallet',
    name: 'Wallet Section',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'sectionSubtitle', type: 'text', label: 'Section Sub Title', placeholder: 'Enter section sub title', required: true },
      { name: 'payinTitle', type: 'text', label: 'Payin Title', placeholder: 'Enter payin title', required: true },
      { name: 'payoutTitle', type: 'text', label: 'Payout Title', placeholder: 'Enter payout title', required: true },
    ],
  },
  {
    id: 'transaction-section',
    name: 'Transaction Section',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'depositTitle', type: 'text', label: 'Deposit Title', placeholder: 'Enter deposit title', required: true },
      { name: 'depositDescription1', type: 'text', label: 'Deposit Description 1', placeholder: 'Enter deposit description 1', required: true },
      { name: 'depositDescription2', type: 'text', label: 'Deposit Description 2', placeholder: 'Enter deposit description 2', required: true },
      { name: 'withdrawTitle', type: 'text', label: 'Withdraw Title', placeholder: 'Enter withdraw title', required: true },
      { name: 'withdrawDescription1', type: 'text', label: 'Withdraw Description 1', placeholder: 'Enter withdraw description 1', required: true },
      { name: 'withdrawDescription2', type: 'text', label: 'Withdraw Description 2', placeholder: 'Enter withdraw description 2', required: true },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile App Section',
    icon: FaMobileAlt,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'sectionSubtitle', type: 'text', label: 'Section Sub Title', placeholder: 'Enter section sub title', required: true },
      { name: 'sectionDescription', type: 'text', label: 'Section Description', placeholder: 'Enter section description', required: true },
      { name: 'iosButtonText', type: 'text', label: 'iOS Button Text', placeholder: 'Enter iOS button text', required: true },
      { name: 'androidButtonText', type: 'text', label: 'Android Button Text', placeholder: 'Enter Android button text', required: true },
    ],
  },
  {
    id: 'getstarted',
    name: 'Get Started Section',
    icon: FaPlus,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'sectionDescription', type: 'text', label: 'Section Description', placeholder: 'Enter section description', required: true },
      { name: 'buttonText', type: 'text', label: 'Button Text', placeholder: 'Enter button text', required: true },
    ],
  },
  {
    id: 'countries',
    name: 'Countries Section',
    icon: FaGlobe,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: false },
    ],
  },
];

const TagoBankContent: React.FC = () => {
  const [contents, setContents] = useState<Record<string, Content>>({});
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [formValues, setFormValues] = useState<Record<string, Record<string, any>>>({});
  const [formErrors, setFormErrors] = useState<Record<string, Record<string, boolean>>>({});

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const contentMap: Record<string, Content> = {};

      for (const section of sections) {
        try {
          const response = await axiosInstance.get(`/tago-bank/content/${section.id}`);
          if (response.data.success && response.data.data) {
            const content = response.data.data;
            contentMap[section.id] = {
              id: content.id,
              page_id: content.page_id,
              title: content.title,
              description: content.description,
              fields: content.fields.map((field: any) => ({
                id: field.id,
                name: field.name,
                field_type: field.field_type,
                value: field.value,
                content_id: field.content_id
              })),
              created_at: content.created_at,
              updated_at: content.updated_at
            };

            const sectionValues: Record<string, any> = {};
            const sectionErrors: Record<string, boolean> = {};

            content.fields.forEach((field: ContentField) => {
              sectionValues[field.name] = field.value;
              sectionErrors[field.name] = false;
            });

            setFormValues(prev => ({
              ...prev,
              [section.id]: sectionValues
            }));

            setFormErrors(prev => ({
              ...prev,
              [section.id]: sectionErrors
            }));
          }
        } catch (error) {
          console.error(`Error fetching content for ${section.id}:`, error);
        }
      }

      setContents(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to fetch content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (sectionId: string): boolean => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return false;

    const errors: Record<string, boolean> = {};
    let isValid = true;

    section.fields.forEach(field => {
      const value = formValues[sectionId]?.[field.name];
      const isEmpty = value === undefined || value === null || value === '';

      if (field.required && isEmpty) {
        errors[field.name] = true;
        isValid = false;
      } else {
        errors[field.name] = false;
      }
    });

    setFormErrors(prev => ({
      ...prev,
      [sectionId]: errors
    }));

    return isValid;
  };

  const handleFieldChange = (sectionId: string, fieldName: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldName]: value
      }
    }));

    setFormErrors(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldName]: false
      }
    }));
  };

  const handleSaveSection = async (sectionId: string) => {
    if (!validateForm(sectionId)) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSaving(prev => ({ ...prev, [sectionId]: true }));

      const content = contents[sectionId];
      const sectionValues = formValues[sectionId] || {};

      if (!content) {
        // Create new content
        const newContent = {
          page_id: sectionId,
          title: sections.find(s => s.id === sectionId)?.name || '',
          description: '', // Add empty description as it's required by the API
          fields: Object.entries(sectionValues).map(([name, value]) => ({
            name,
            field_type: typeof value === 'object' ? 'json' : typeof value === 'number' ? 'number' : 'text',
            value: typeof value === 'object' ? JSON.stringify(value) : value
          }))
        };

        const response = await axiosInstance.post(`/tago-bank/content`, newContent);
        if (response.data.success) {
          // Update local state instead of fetching
          const newContentData: Content = {
            id: response.data.data.id,
            page_id: sectionId,
            title: newContent.title,
            description: newContent.description,
            fields: newContent.fields.map((field: any) => ({
              id: field.id,
              name: field.name,
              field_type: field.field_type,
              value: field.value
            }))
          };

          setContents(prev => ({
            ...prev,
            [sectionId]: newContentData
          }));
          toast.success('Content created successfully');
        } else {
          throw new Error(response.data.message || 'Failed to create content');
        }
      } else {
        // Update existing fields
        const updatedFields: ContentField[] = [];
        console.log("sectionValues: ", sectionValues);
        for (const [fieldName, value] of Object.entries(sectionValues)) {
          const field = content.fields.find(f => f.name === fieldName);

          if (field) {
            // Update existing field
            const response = await axiosInstance.put(`/tago-bank/content-field/${field.id}`, {
              value: typeof value === 'object' ? JSON.stringify(value) : value
            });
            if (!response.data.success) {
              throw new Error(`Failed to update field ${fieldName}`);
            }
            updatedFields.push({
              ...field,
              value: typeof value === 'object' ? JSON.stringify(value) : value
            });
          } else {
            // Add new field
            const response = await axiosInstance.post(`/tago-bank/content/${content.id}/fields`, {
              name: fieldName,
              field_type: typeof value === 'object' ? 'json' : typeof value === 'number' ? 'number' : 'text',
              value: value
            });
            if (!response.data.success) {
              throw new Error(`Failed to create field ${fieldName}`);
            }
            updatedFields.push({
              id: response.data.data.id,
              name: fieldName,
              field_type: typeof value === 'object' ? 'json' : typeof value === 'number' ? 'number' : 'text',
              value: value,
              content_id: content.id
            });
          }
        }

        // Update local state instead of fetching
        setContents(prev => ({
          ...prev,
          [sectionId]: {
            ...prev[sectionId],
            fields: updatedFields
          }
        }));

        toast.success('Content updated successfully');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save content. Please try again.');
    } finally {
      setSaving(prev => ({ ...prev, [sectionId]: false }));
    }
  };

  const renderField = (section: Section, field: { name: string; type: string; label: string; placeholder?: string; required?: boolean }) => {
    const fieldValue = formValues[section.id]?.[field.name] || '';
    const hasError = formErrors[section.id]?.[field.name] || false;
    const isRequired = field.required || false;

    if (field.type === 'array') {
      // Prepare field value for display
      let displayValue = '';
      try {
        if (typeof fieldValue === 'string') {
          // Try to parse the string as JSON first
          try {
            const parsedValue = JSON.parse(fieldValue);
            displayValue = JSON.stringify(parsedValue, null, 2);
          } catch (error) {
            // If it's a single-quoted string format, convert to proper JSON
            if (fieldValue.includes("'")) {
              const fixedValue = fieldValue
                .replace(/'/g, '"')
                .replace(/(\w+):/g, '"$1":');
              try {
                const parsedValue = JSON.parse(fixedValue);
                displayValue = JSON.stringify(parsedValue, null, 2);
              } catch (e) {
                displayValue = fieldValue; // Fallback to original string
              }
            } else {
              displayValue = fieldValue;
            }
          }
        } else if (typeof fieldValue === 'object') {
          // It's already an object, so stringify it
          displayValue = JSON.stringify(fieldValue, null, 2);
        }
      } catch (error) {
        displayValue = typeof fieldValue === 'string' ? fieldValue : '';
      }

      return (
        <div key={field.name} className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <textarea
            className={`w-full p-3 border rounded-lg transition-all ${
              hasError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-primary focus:border-primary'
            } focus:ring-2 focus:outline-none`}
            rows={8}
            placeholder={field.placeholder || 'Enter JSON array'}
            value={displayValue}
            onChange={(e) => {
              try {
                const value = JSON.parse(e.target.value);
                handleFieldChange(section.id, field.name, value);
              } catch (error) {
                // Store as string if not valid JSON yet
                handleFieldChange(section.id, field.name, e.target.value);
              }
            }}
            onBlur={(e) => {
              try {
                // On blur, attempt to parse and save as JSON
                const value = JSON.parse(e.target.value);
                handleFieldChange(section.id, field.name, value);
              } catch (error) {
                // If it's a single-quoted format, try to fix it
                if (e.target.value.includes("'")) {
                  try {
                    const fixedValue = e.target.value
                      .replace(/'/g, '"')
                      .replace(/(\w+):/g, '"$1":');
                    const value = JSON.parse(fixedValue);
                    handleFieldChange(section.id, field.name, value);
                  } catch (e) {
                    toast.error('Invalid JSON format');
                  }
                } else if (e.target.value.trim() === '') {
                  handleFieldChange(section.id, field.name, []);
                } else {
                  toast.error('Invalid JSON format');
                }
              }
            }}
          />
          {hasError && <p className="text-xs text-red-500 mt-1">This field is required</p>}
          {!hasError && (
            <div className="text-xs text-gray-500 mt-1">
              <p>Enter a valid JSON array. Example:</p>
              <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                {JSON.stringify([
                  { name: 'Country Name', code: 'COUNTRY_CODE' }
                ], null, 2)}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={field.name} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          className={`w-full p-3 border rounded-lg transition-all ${
            hasError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-primary focus:border-primary'
          } focus:ring-2 focus:outline-none`}
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          value={fieldValue}
          onChange={(e) => handleFieldChange(section.id, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
        />
        {hasError && <p className="text-xs text-red-500 mt-1">This field is required</p>}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader size={8} color="primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.div
        className="max-w-full mx-auto p-4 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* <div className="bg-primary-dark p-6">
            <h1 className="text-2xl font-bold text-white">Landing Page Content Management</h1>
            <p className="text-white/80 mt-1">Edit and manage content for your landing page sections</p>
          </div> */}

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4 bg-gray-50 p-4 border-r border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Sections</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <motion.li
                    key={section.id}
                    className={`cursor-pointer p-3 flex items-center rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-primary-dark text-white shadow-md'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2">{<section.icon className="w-5 h-5" />}</span>
                    {section.name}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-3/4 p-6">
              {sections
                .filter((section) => section.id === activeSection)
                .map((section) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <span className="text-primary mr-3">{<section.icon className="w-6 h-6" />}</span>
                      <h2 className="text-xl font-semibold text-gray-800">{section.name}</h2>
                      {saving[section.id] && (
                        <span className="ml-auto text-sm text-primary flex items-center">
                          <Loader size={4} color="primary" />
                          <span className="ml-2">Saving...</span>
                        </span>
                      )}
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                      {section.fields.map((field) => renderField(section, field))}

                      <div className="mt-8 flex justify-end">
                        <button
                          className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${
                            saving[section.id]
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-primary-dark hover:opacity-90'
                          }`}
                          onClick={() => handleSaveSection(section.id)}
                          disabled={saving[section.id]}
                        >
                          {saving[section.id] ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TagoBankContent;