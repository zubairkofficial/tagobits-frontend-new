import { useState, useEffect } from 'react';
import tagocashaxiosinstance from '../utils/tagocashaxiosinstance';

export const useFooterContent = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await tagocashaxiosinstance.get('/content/footer');
      if (response.data.success) {
        setContent(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching footer content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const getFieldValue = (fieldName) => {
    if (!content) return '';
    const field = content.fields.find((f) => f.name === fieldName);
    return field?.value || '';
  };

  return {
    content,
    loading,
    error,
    getFieldValue,
    refetch: fetchContent,
  };
};

