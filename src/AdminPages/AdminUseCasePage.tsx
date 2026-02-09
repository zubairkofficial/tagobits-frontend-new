import React, { useState, useEffect } from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import axiosInstance from '../helper/axios';
import { Loader } from '../components/Loader';

interface useCaseData {
  id?: string;
  title: string;
  description: string;
  youtube_url?: string;
  wistia_url?: string;
  created_at?: string;
  updated_at?: string;
}

const AdminUseCasePage: React.FC = () => {
  const [formData, setFormData] = useState<useCaseData>({
    title: '',
    description: '',
    youtube_url: '',
    wistia_url: ''
  });
  const [useCases, setUseCases] = useState<useCaseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<useCaseData | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getWistiaEmbedUrl = (url: string): string => {
    if (!url) return '';
    const match = url.match(/wistia\.com\/embed\/(?:medias\/)?([^/?]+?)(?:\.js)?$/);
    const embedUrl = match ? `https://fast.wistia.net/embed/iframe/${match[1]}` : '';
    return embedUrl;
  };

  const getVideoEmbedUrl = (useCase: useCaseData): string => {
    if (useCase.youtube_url) {
      const youtubeId = extractYouTubeId(useCase.youtube_url);
      return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : '';
    }
    if (useCase.wistia_url) {
      return getWistiaEmbedUrl(useCase.wistia_url);
    }
    return '';
  };

  const fetchUseCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/use-case');
      console.log('Use Cases API Response:', response.data);
      if (response.data && Array.isArray(response.data)) {
        setUseCases(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        setUseCases([]);
      }
    } catch (err: unknown) {
      console.error('Error fetching Use Cases:', err);
      setError('Failed to fetch Use Cases');
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { detail?: string }; statusText?: string } };
        if (axiosError.response) {
          console.error('Error response:', axiosError.response.data);
          setError(`Failed to fetch Use Cases: ${axiosError.response.data?.detail || axiosError.response.statusText || 'Unknown error'}`);
        }
      }
      setUseCases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUseCases();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Validate that at least one video URL is provided
    if (!formData.youtube_url && !formData.wistia_url) {
      toast.error('Please provide either a YouTube URL or Wistia URL');
      setIsSaving(false);
      return;
    }
    // Normalize Wistia URL to medias .js format if provided
    const normalizeWistiaUrl = (input?: string) => {
      if (!input) return '';
      const trimmed = input.trim();
      // Allow raw ID or any wistia URL; take last path/segment-like token
      const idMatch = trimmed.match(/([A-Za-z0-9]{8,})$/);
      const wistiaId = idMatch ? idMatch[1] : '';
      return wistiaId ? `https://fast.wistia.com/embed/medias/${wistiaId}` : '';
    };

    const payload = {
      ...formData,
      wistia_url: normalizeWistiaUrl(formData.wistia_url),
    };

    try {
      if (selectedItem?.id) {
        await axiosInstance.put(`/use-case/${selectedItem.id}`, payload);
        toast.success('Use Case updated successfully');
      } else {
        await axiosInstance.post('/use-case', payload);
        toast.success('Use Case created successfully');
      }
      setFormData({
        title: '',
        description: '',
        youtube_url: '',
        wistia_url: ''
      });
      setSelectedItem(null);
      setIsModalOpen(false);
      fetchUseCases();
    } catch {
      toast.error(selectedItem ? 'Failed to update Use Case' : 'Failed to create Use Case');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (useCase: useCaseData) => {
    setSelectedItem(useCase);
    setFormData(useCase);
    setIsModalOpen(true);
    setShowMenu(null);
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await axiosInstance.delete(`/use-case/${id}`);
      toast.success('Use Case deleted successfully');
      fetchUseCases();
      setShowMenu(null);
    } catch {
      toast.error('Failed to delete Use Case');
    } finally {
      setIsDeleting(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">Use Case Management</h1>
          <button
            onClick={() => {
              setSelectedItem(null);
              setFormData({ title: '', description: '', youtube_url: '', wistia_url: '' });
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-200 shadow-md"
          >
            <FaPlus className="text-sm" />
            <span>Upload Video</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {useCases.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No Use Cases available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Video Preview</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {useCases.map((useCase) => (
                    <tr key={useCase.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{useCase.title}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {useCase.description.length > 100 
                          ? `${useCase.description.substring(0, 100)}...` 
                          : useCase.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-[200px] h-[120px]">
                          {getVideoEmbedUrl(useCase) ? (
                            <iframe
                              src={getVideoEmbedUrl(useCase)}
                              title={useCase.title}
                              className="w-full h-full rounded-lg"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 text-sm">
                              {useCase.youtube_url || useCase.wistia_url ? 'Invalid Video URL' : 'No Video URL'}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="relative">
                          <button
                            onClick={() => setShowMenu(showMenu === useCase.id ? null : useCase.id || null)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                          >
                            <FaEllipsisV className="text-gray-600" />
                          </button>
                          {showMenu === useCase.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 transform transition-all duration-200 origin-top-right scale-100">
                              <div className="py-1">
                                <button
                                  onClick={() => handleEdit(useCase)}
                                  disabled={isDeleting === useCase.id}
                                  className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 ${isDeleting === useCase.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                                <button
                                  onClick={() => useCase.id && handleDelete(useCase.id)}
                                  disabled={isDeleting === useCase.id}
                                  className={`w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2 ${isDeleting === useCase.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  {isDeleting === useCase.id ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                      <span>Deleting...</span>
                                    </>
                                  ) : (
                                    <>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                      Delete
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl transform transition-all duration-300 scale-100">
            <h2 className="text-xl font-bold mb-4">
              {selectedItem ? 'Edit Use Case' : 'Upload New Video'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1952A8] focus:border-transparent"
                  placeholder="Enter title"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1952A8] focus:border-transparent"
                  placeholder="Enter description"
                  required
                />
              </div>

              <div>
                <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube Link (Optional)
                </label>
                <input
                  type="url"
                  id="youtube_url"
                  name="youtube_url"
                  value={formData.youtube_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1952A8] focus:border-transparent"
                  placeholder="Enter YouTube video link"
                />
              </div>

              <div>
                <label htmlFor="wistia_url" className="block text-sm font-medium text-gray-700 mb-1">
                  Wistia Link (Optional)
                </label>
                <input
                  type="url"
                  id="wistia_url"
                  name="wistia_url"
                  value={formData.wistia_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1952A8] focus:border-transparent"
                  placeholder="Enter Wistia video link"
                />
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <p className="font-medium mb-1">Note:</p>
                <p>Please provide either a YouTube URL or Wistia URL (or both). At least one video URL is required.</p>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedItem(null);
                    setFormData({ title: '', description: '', youtube_url: '', wistia_url: '' });
                  }}
                  disabled={isSaving}
                  className={`px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-200 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{selectedItem ? 'Updating...' : 'Uploading...'}</span>
                    </div>
                  ) : (
                    <span>{selectedItem ? 'Update' : 'Upload'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUseCasePage;
