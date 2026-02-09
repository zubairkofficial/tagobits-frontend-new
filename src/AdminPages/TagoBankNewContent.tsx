import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import axiosInstance from '../helper/axios';
import {
  FaRocket, FaCheckCircle, FaGlobe, FaMoneyBillWave, FaCreditCard, FaPlus, FaTrash,
  FaGem, FaStar, FaMobileAlt, FaHandshake
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
  isDynamic?: boolean;
  dynamicType?: 'features' | 'accessLocalCurrencies' | 'bankAccountFeatures' | 'quadrantFeatures';
}

const sections: Section[] = [
  {
    id: 'tagobank-hero',
    name: 'Hero Section',
    icon: FaRocket,
    fields: [
      { name: 'subtitle', type: 'text', label: 'Borderless Digital Wallet', placeholder: 'Borderless Digital Wallet', required: false },
      { name: 'andSymbol', type: 'text', label: 'And Symbol', placeholder: '&', required: false },
      { name: 'assignedUSBankRoutingNumber', type: 'text', label: 'Assigned US Bank Routing Number', placeholder: 'Assigned US Bank Routing Number', required: false },
      { name: 'worldFirstDigitalWallet', type: 'text', label: 'World First Digital Wallet', placeholder: 'The world\'s first true digital wallet with a bank account number', required: false },
      { name: 'usRegulatedFinancialInstitution', type: 'text', label: 'US Regulated Financial Institution', placeholder: '(US regulated financial institution)', required: false },
      { name: 'fdicText', type: 'text', label: 'FDIC Insured', placeholder: 'FDIC Insured', required: false },
    ],
  },
  {
    id: 'tagobank-features-section',
    name: 'Bank Account Features Section',
    icon: FaCreditCard,
    fields: [
      { name: 'introText', type: 'text', label: 'Introduction Text', placeholder: 'TagoCash can now offer a Bank Account Number (ABA) Routing Number to citizens of more than 150 countries', required: false },
    ],
    isDynamic: true,
    dynamicType: 'bankAccountFeatures'
  },
  {
    id: 'tagobank-benefits',
    name: 'Benefits Section',
    icon: FaCheckCircle,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Benefits:', required: true },
      { 
        name: 'benefits', 
        type: 'textarea', 
        label: 'Benefits (one per line or JSON array)', 
        placeholder: 'Enter benefits, one per line', 
        required: true 
      },
    ],
  },
  {
    id: 'tagobank-crossborder',
    name: 'Cross-Border Transfer Section',
    icon: FaGlobe,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Cross-Border Transfer in GBP, EUR, & More', required: true },
      { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Enter description', required: true },
    ],
  },
  {
    id: 'tagobank-access-local-currencies',
    name: 'Access Local Currencies Section',
    icon: FaMoneyBillWave,
    fields: [],
    isDynamic: true,
    dynamicType: 'accessLocalCurrencies'
  },
  {
    id: 'tagobank-features',
    name: 'Features Section',
    icon: FaCreditCard,
    fields: [],
    isDynamic: true,
    dynamicType: 'features'
  },
  {
    id: 'tagobank-quadrant-features',
    name: 'Quadrant Features Section',
    icon: FaCreditCard,
    fields: [
      { name: 'heading', type: 'text', label: 'Left Side Heading', placeholder: 'TAGOCASH DELIVERS WHAT OTHERS CAN\'T', required: false },
      { name: 'subheading', type: 'text', label: 'Left Side Subheading', placeholder: 'Make moving money feel like sending an email', required: false },
    ],
    isDynamic: true,
    dynamicType: 'quadrantFeatures'
  },
  {
    id: 'tagobridge-hero',
    name: 'TagoBridge Hero Section',
    icon: FaRocket,
    fields: [
      { name: 'mainHeading', type: 'text', label: 'Main Heading', placeholder: 'Enter main heading', required: true },
    ],
  },
  {
    id: 'tagobridge-hero2',
    name: 'TagoBridge Hero 2 Section',
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
    id: 'tagobridge-contactwithus',
    name: 'TagoBridge Contact With Us Section',
    icon: FaHandshake,
    fields: [
      { name: 'buttonText', type: 'text', label: 'Button Text', placeholder: 'Enter button text', required: true },
    ],
  },
  {
    id: 'tagobridge-features',
    name: 'TagoBridge Features Section',
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
    id: 'tagobridge-how',
    name: 'TagoBridge How It Works Section',
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
    id: 'tagobridge-usecase',
    name: 'TagoBridge Why TagoBridge Section',
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
    id: 'tagobridge-wallet',
    name: 'TagoBridge Wallet Section',
    icon: FaMoneyBillWave,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'sectionSubtitle', type: 'text', label: 'Section Sub Title', placeholder: 'Enter section sub title', required: true },
      { name: 'payinTitle', type: 'text', label: 'Payin Title', placeholder: 'Enter payin title', required: true },
      { name: 'payoutTitle', type: 'text', label: 'Payout Title', placeholder: 'Enter payout title', required: true },
    ],
  },
  {
    id: 'tagobridge-transaction-section',
    name: 'TagoBridge Transaction Section',
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
    id: 'tagobridge-mobile',
    name: 'TagoBridge Mobile App Section',
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
    id: 'tagobridge-getstarted',
    name: 'TagoBridge Get Started Section',
    icon: FaPlus,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: true },
      { name: 'sectionDescription', type: 'text', label: 'Section Description', placeholder: 'Enter section description', required: true },
      { name: 'buttonText', type: 'text', label: 'Button Text', placeholder: 'Enter button text', required: true },
    ],
  },
  {
    id: 'tagobridge-countries',
    name: 'TagoBridge Countries Section',
    icon: FaGlobe,
    fields: [
      { name: 'sectionTitle', type: 'text', label: 'Section Title', placeholder: 'Enter section title', required: false },
    ],
  },
];

const TagoBankNewContent: React.FC = () => {
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
          // Map tagobridge- prefixed IDs to original backend IDs
          const backendId = section.id.startsWith('tagobridge-') 
            ? section.id.replace('tagobridge-', '') 
            : section.id;
          const response = await axiosInstance.get(`/tago-bank/content/${backendId}`);
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

            // Handle dynamic sections
            if (section.isDynamic) {
              const itemsField = content.fields.find((f: ContentField) => f.name === 'items');
              if (itemsField) {
                try {
                  const parsedItems = JSON.parse(itemsField.value || '[]');
                  sectionValues['items'] = parsedItems;
                } catch {
                  sectionValues['items'] = [];
                }
              } else {
                sectionValues['items'] = [];
              }
              // Also handle regular fields for dynamic sections (like introText)
              section.fields.forEach(field => {
                const contentField = content.fields.find((f: ContentField) => f.name === field.name);
                if (contentField) {
                  sectionValues[field.name] = contentField.value;
                  sectionErrors[field.name] = false;
                }
              });
            } else {
              content.fields.forEach((field: ContentField) => {
                sectionValues[field.name] = field.value;
                sectionErrors[field.name] = false;
              });
            }

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

    if (section.isDynamic) {
      // For dynamic sections, we don't require all items to be filled
      // Only validate that at least one item exists if needed
      return true;
    } else {
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
    }

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

  const addDynamicItem = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section || !section.isDynamic) return;

    const currentItems = formValues[sectionId]?.items || [];
    let newItem: any = {};

    if (section.dynamicType === 'features') {
      newItem = { badgeText: '', title: '', description: '' };
    } else if (section.dynamicType === 'accessLocalCurrencies') {
      newItem = { heading: '', subHeading: '', description: '' };
    } else if (section.dynamicType === 'bankAccountFeatures') {
      newItem = { heading: '', description: '' };
    } else if (section.dynamicType === 'quadrantFeatures') {
      newItem = { title: '', description: '' };
    }

    setFormValues(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        items: [...currentItems, newItem]
      }
    }));
  };

  const removeDynamicItem = (sectionId: string, index: number) => {
    const currentItems = formValues[sectionId]?.items || [];
    const updatedItems = currentItems.filter((_: any, i: number) => i !== index);
    
    setFormValues(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        items: updatedItems
      }
    }));
  };

  const updateDynamicItem = (sectionId: string, index: number, field: string, value: string) => {
    const currentItems = formValues[sectionId]?.items || [];
    const updatedItems = [...currentItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    setFormValues(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        items: updatedItems
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
      const section = sections.find(s => s.id === sectionId);
      const sectionValues = formValues[sectionId] || {};

      if (!content) {
        // Create new content
        let fieldsToSave: any[] = [];
        
        if (section?.isDynamic) {
          // For dynamic sections, save items as JSON
          const items = sectionValues.items || [];
          fieldsToSave = [{
            name: 'items',
            field_type: 'json',
            value: JSON.stringify(items)
          }];
        } else {
          fieldsToSave = Object.entries(sectionValues).map(([name, value]) => ({
            name,
            field_type: typeof value === 'object' ? 'json' : typeof value === 'number' ? 'number' : 'text',
            value: typeof value === 'object' ? JSON.stringify(value) : value
          }));
        }

        // Map tagobridge- prefixed IDs to original backend IDs for API calls
        const backendId = sectionId.startsWith('tagobridge-') 
          ? sectionId.replace('tagobridge-', '') 
          : sectionId;
        
        const newContent = {
          page_id: backendId,
          title: section?.name || '',
          description: '',
          fields: fieldsToSave
        };

        const response = await axiosInstance.post(`/tago-bank/content`, newContent);
        if (response.data.success) {
          // Fetch the created content to get the full data including id and fields
          await fetchContents();
          toast.success('Content created successfully');
        } else {
          throw new Error(response.data.message || 'Failed to create content');
        }
      } else {
        // Get field names from form values (new fields being saved)
        const newFieldNames = new Set(Object.keys(sectionValues));
        
        // Delete old fields that are not in the new form values
        for (const oldField of content.fields) {
          if (!newFieldNames.has(oldField.name)) {
            try {
              await axiosInstance.delete(`/tago-bank/content-field/${oldField.id}`);
            } catch (error) {
              console.error(`Failed to delete old field ${oldField.name}:`, error);
              // Continue even if deletion fails
            }
          }
        }

        // Update or create fields from form values
        const updatedFieldsMap = new Map<string, ContentField>();
        
        // First, preserve existing fields that aren't being updated
        content.fields.forEach(field => {
          if (field.name in sectionValues) {
            // Will be updated below
            return;
          }
          updatedFieldsMap.set(field.name, field);
        });

        // Handle dynamic sections
        if (section?.isDynamic) {
          const items = sectionValues.items || [];
          const itemsField = content.fields.find(f => f.name === 'items');
          const itemsValue = JSON.stringify(items);

          if (itemsField) {
            // Update existing items field
            const response = await axiosInstance.put(`/tago-bank/content-field/${itemsField.id}`, {
              value: itemsValue
            });
            if (!response.data.success) {
              throw new Error('Failed to update items field');
            }
            updatedFieldsMap.set('items', {
              id: itemsField.id,
              name: 'items',
              field_type: 'json',
              value: itemsValue,
              content_id: itemsField.content_id
            });
          } else {
            // Create new items field
            const response = await axiosInstance.post(`/tago-bank/content/${content.id}/fields`, {
              name: 'items',
              field_type: 'json',
              value: itemsValue
            });
            if (!response.data.success) {
              throw new Error('Failed to create items field');
            }
            updatedFieldsMap.set('items', {
              id: response.data.data.id,
              name: 'items',
              field_type: 'json',
              value: itemsValue,
              content_id: content.id
            });
          }
          
          // Also save regular fields for dynamic sections (like introText)
          for (const field of section.fields) {
            if (field.name === 'items') continue; // Skip items, already handled above
            
            const fieldValue = sectionValues[field.name];
            if (fieldValue !== undefined && fieldValue !== null) {
              const existingField = content.fields.find(f => f.name === field.name);
              const stringValue = String(fieldValue);

              if (existingField) {
                // Update existing field
                const response = await axiosInstance.put(`/tago-bank/content-field/${existingField.id}`, {
                  value: stringValue
                });
                if (!response.data.success) {
                  throw new Error(`Failed to update field ${field.name}`);
                }
                updatedFieldsMap.set(field.name, {
                  id: existingField.id,
                  name: field.name,
                  field_type: existingField.field_type,
                  value: stringValue,
                  content_id: existingField.content_id
                });
              } else {
                // Create new field
                const response = await axiosInstance.post(`/tago-bank/content/${content.id}/fields`, {
                  name: field.name,
                  field_type: 'text',
                  value: stringValue
                });
                if (!response.data.success) {
                  throw new Error(`Failed to create field ${field.name}`);
                }
                updatedFieldsMap.set(field.name, {
                  id: response.data.data.id,
                  name: field.name,
                  field_type: 'text',
                  value: stringValue,
                  content_id: content.id
                });
              }
            }
          }
        } else {
          // Update or create fields from form values
          for (const [fieldName, value] of Object.entries(sectionValues)) {
            const field = content.fields.find(f => f.name === fieldName);
            const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

            if (field) {
              // Update existing field
              const response = await axiosInstance.put(`/tago-bank/content-field/${field.id}`, {
                value: stringValue
              });
              if (!response.data.success) {
                throw new Error(`Failed to update field ${fieldName}`);
              }
              // Store updated field info
              updatedFieldsMap.set(fieldName, {
                id: field.id,
                name: fieldName,
                field_type: field.field_type,
                value: stringValue,
                content_id: field.content_id
              });
            } else {
              // Add new field
              const response = await axiosInstance.post(`/tago-bank/content/${content.id}/fields`, {
                name: fieldName,
                field_type: typeof value === 'object' ? 'json' : typeof value === 'number' ? 'number' : 'text',
                value: stringValue
              });
              if (!response.data.success) {
                throw new Error(`Failed to create field ${fieldName}`);
              }
              // Store new field info from response
              updatedFieldsMap.set(fieldName, {
                id: response.data.data.id,
                name: fieldName,
                field_type: typeof value === 'object' ? 'json' : typeof value === 'number' ? 'number' : 'text',
                value: stringValue,
                content_id: content.id
              });
            }
          }
        }

        // Update local state immediately with saved values to prevent form revert
        setContents(prev => ({
          ...prev,
          [sectionId]: {
            ...content,
            fields: Array.from(updatedFieldsMap.values())
          }
        }));

        // Preserve form values - they already contain the saved values
        // This ensures the form doesn't revert after fetchContents()
        const preservedFormValues = { ...sectionValues };
        
        // Fetch updated content to get all fields with latest data (for consistency)
        await fetchContents();
        
        // Restore form values after fetch to prevent revert
        setFormValues(prev => ({
          ...prev,
          [sectionId]: preservedFormValues
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

    if (field.type === 'textarea') {
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
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value={fieldValue}
            onChange={(e) => handleFieldChange(section.id, field.name, e.target.value)}
          />
          {hasError && <p className="text-xs text-red-500 mt-1">This field is required</p>}
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
                      {section.isDynamic ? (
                        <div>
                          {section.dynamicType === 'features' && (
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Features</h3>
                                <button
                                  onClick={() => addDynamicItem(section.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-all"
                                >
                                  <FaPlus className="w-4 h-4" />
                                  Add Feature
                                </button>
                              </div>
                              {(formValues[section.id]?.items || []).map((item: any, index: number) => (
                                <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-md font-medium text-gray-700">Feature {index + 1}</h4>
                                    <button
                                      onClick={() => removeDynamicItem(section.id, index)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                      <FaTrash className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                      placeholder="Enter feature title"
                                      value={item.title || ''}
                                      onChange={(e) => updateDynamicItem(section.id, index, 'title', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                      rows={4}
                                      placeholder="Enter feature description"
                                      value={item.description || ''}
                                      onChange={(e) => updateDynamicItem(section.id, index, 'description', e.target.value)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {section.dynamicType === 'quadrantFeatures' && (
                            <div>
                              {/* Regular fields for heading and subheading */}
                              {section.fields && section.fields.length > 0 && (
                                <div className="mb-8 pb-8 border-b border-gray-200">
                                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Left Side Content</h3>
                                  {section.fields.map((field) => (
                                    <div key={field.name} className="mb-4">
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                      </label>
                                      <input
                                        type={field.type}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                        placeholder={field.placeholder}
                                        value={formValues[section.id]?.[field.name] || ''}
                                        onChange={(e) => {
                                          setFormValues(prev => ({
                                            ...prev,
                                            [section.id]: {
                                              ...prev[section.id],
                                              [field.name]: e.target.value
                                            }
                                          }));
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Quadrant Features</h3>
                                <button
                                  onClick={() => addDynamicItem(section.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-all"
                                >
                                  <FaPlus className="w-4 h-4" />
                                  Add Quadrant
                                </button>
                              </div>
                              {(formValues[section.id]?.items || []).map((item: any, index: number) => (
                                <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-md font-medium text-gray-700">Quadrant {index + 1}</h4>
                                    <button
                                      onClick={() => removeDynamicItem(section.id, index)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                      <FaTrash className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Title <span className="text-red-500">*</span> <span className="text-gray-500 text-xs">(e.g., / 100% Instant globally)</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                      placeholder="e.g., / 100% Instant globally"
                                      value={item.title || ''}
                                      onChange={(e) => updateDynamicItem(section.id, index, 'title', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                      rows={4}
                                      placeholder="Enter quadrant description"
                                      value={item.description || ''}
                                      onChange={(e) => updateDynamicItem(section.id, index, 'description', e.target.value)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {section.dynamicType === 'accessLocalCurrencies' && (
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Access Local Currencies Items</h3>
                                <button
                                  onClick={() => addDynamicItem(section.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-all"
                                >
                                  <FaPlus className="w-4 h-4" />
                                  Add Item
                                </button>
                              </div>
                              {(formValues[section.id]?.items || []).map((item: any, index: number) => (
                                <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-md font-medium text-gray-700">Item {index + 1}</h4>
                                    <button
                                      onClick={() => removeDynamicItem(section.id, index)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                      <FaTrash className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Heading <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                      placeholder="ACCESS LOCAL CURRENCIES"
                                      value={item.heading || ''}
                                      onChange={(e) => updateDynamicItem(section.id, index, 'heading', e.target.value)}
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Sub Heading <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                      placeholder="(ACH, RTP, IBAN & SWIFT)"
                                      value={item.subHeading || ''}
                                      onChange={(e) => updateDynamicItem(section.id, index, 'subHeading', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                      rows={4}
                                      placeholder="Access and manage balances in multiple currencies..."
                                      value={item.description || ''}
                                      onChange={(e) => updateDynamicItem(section.id, index, 'description', e.target.value)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {section.dynamicType === 'bankAccountFeatures' && (
                            <div>
                              <div className="mb-6">
                                {section.fields.map((field) => renderField(section, field))}
                              </div>
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Bank Account Features</h3>
                                <button
                                  onClick={() => addDynamicItem(section.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-all"
                                >
                                  <FaPlus className="w-4 h-4" />
                                  Add Feature
                                </button>
                              </div>
                              {(formValues[section.id]?.items || []).map((item: any, index: number) => (
                                <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-md font-medium text-gray-700">Feature {index + 1}</h4>
                                    <button
                                      onClick={() => removeDynamicItem(section.id, index)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                      <FaTrash className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Heading <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                      placeholder="e.g., ACCESS LOCAL CURRENCIES (ACH, RTP, IBAN & SWIFT)"
                                      value={item.heading || ''}
                                      onChange={(e) => updateDynamicItem(section.id, index, 'heading', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary focus:ring-2 focus:outline-none"
                                      rows={4}
                                      placeholder="Enter feature description"
                                      value={item.description || ''}
                                      onChange={(e) => updateDynamicItem(section.id, index, 'description', e.target.value)}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        section.fields.map((field) => renderField(section, field))
                      )}

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

export default TagoBankNewContent;


