// AdminMembershipPage.tsx
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { Loader } from '../components/Loader';

interface MembershipHeader {
    id: string;
    page_heading: string | null;
    page_subheading: string | null;
}

interface MembershipEntry {
    id: string;
    is_section: boolean;
    activity: string;
    tago_fan: string | null;
    tago_hero: string | null;
    created_at: string;
}

const AdminMembershipPage = () => {
    const [header, setHeader] = useState<MembershipHeader | null>(null);
    const [entries, setEntries] = useState<MembershipEntry[]>([]);
    const [isEditingHeader, setIsEditingHeader] = useState(false);
    const [isEditingEntry, setIsEditingEntry] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [showEntryModal, setShowEntryModal] = useState(false);
    const [isSavingHeader, setIsSavingHeader] = useState(false);
    const [isSavingEntry, setIsSavingEntry] = useState(false);
    const [isDeletingEntry, setIsDeletingEntry] = useState<string | null>(null);

    // Header form state
    const [headerForm, setHeaderForm] = useState({
        page_heading: '',
        page_subheading: '',
    });

    // Entry form state
    const [entryForm, setEntryForm] = useState({
        is_section: false,
        activity: '',
        tago_fan: null as string | null,
        tago_hero: null as string | null,
    });

    // States for input types
    const [fanInputType, setFanInputType] = useState<'text' | 'check' | 'cross'>('text');
    const [heroInputType, setHeroInputType] = useState<'text' | 'check' | 'cross'>('text');
    const [fanText, setFanText] = useState('');
    const [heroText, setHeroText] = useState('');

    useEffect(() => {
        fetchHeader();
        fetchEntries();
    }, []);

    const fetchHeader = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/membership/header');
            setHeader(response.data);
            setHeaderForm({
                page_heading: response.data.page_heading || '',
                page_subheading: response.data.page_subheading || '',
            });
        } catch (error) {
            console.error('Error fetching header:', error);
            toast.error('Failed to fetch header data');
        } finally {
            setLoading(false);
        }
    };

    const fetchEntries = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/membership/entries');
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
            toast.error('Failed to fetch entries');
        } finally {
            setLoading(false);
        }
    };

    const handleHeaderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingHeader(true);
        try {
            if (header) {
                await axiosInstance.put('/membership/header', headerForm);
                toast.success('Header updated successfully');
            } else {
                await axiosInstance.post('/membership/header', headerForm);
                toast.success('Header created successfully');
            }
            await fetchHeader();
            setIsEditingHeader(false);
        } catch (error) {
            console.error('Error updating header:', error);
            toast.error('Failed to update header');
        } finally {
            setIsSavingHeader(false);
        }
    };

    const prepareEntryData = () => {
        let tago_fan = null;
        if (!entryForm.is_section) {
            if (fanInputType === 'check') tago_fan = 'check';
            else if (fanInputType === 'cross') tago_fan = 'cross';
            else tago_fan = fanText;
        }

        let tago_hero = null;
        if (!entryForm.is_section) {
            if (heroInputType === 'check') tago_hero = 'check';
            else if (heroInputType === 'cross') tago_hero = 'cross';
            else tago_hero = heroText;
        }

        return {
            is_section: entryForm.is_section,
            activity: entryForm.activity,
            tago_fan,
            tago_hero,
        };
    };

    const handleEntrySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingEntry(true);
        const data = prepareEntryData();
        try {
            let response;
            if (isEditingEntry) {
                response = await axiosInstance.put(`/membership/entries/${isEditingEntry}`, data);
                
                let successMessage = 'Entry updated successfully';
                if (response.data.knowledge_base === 'updated') {
                    successMessage += ' (Knowledge base updated)';
                } else if (response.data.knowledge_base === 'not_updated') {
                    successMessage += ' (Knowledge base not updated)';
                    if (response.data.knowledge_base_error) {
                        console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
                    }
                }
                toast.success(successMessage);
            } else {
                response = await axiosInstance.post('/membership/entries', data);
                
                let successMessage = 'Entry added successfully';
                if (response.data.knowledge_base === 'updated') {
                    successMessage += ' (Knowledge base updated)';
                } else if (response.data.knowledge_base === 'not_updated') {
                    successMessage += ' (Knowledge base not updated)';
                    if (response.data.knowledge_base_error) {
                        console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
                    }
                }
                toast.success(successMessage);
            }
            await fetchEntries();
            setIsEditingEntry(null);
            setShowEntryModal(false);
            resetEntryForm();
        } catch (error) {
            console.error('Error updating entry:', error);
            toast.error('Failed to update entry');
        } finally {
            setIsSavingEntry(false);
        }
    };

    const resetEntryForm = () => {
        setEntryForm({
            is_section: false,
            activity: '',
            tago_fan: null,
            tago_hero: null,
        });
        setFanInputType('text');
        setHeroInputType('text');
        setFanText('');
        setHeroText('');
    };

    const handleDeleteEntry = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            try {
                setIsDeletingEntry(id);
                const response = await axiosInstance.delete(`/membership/entries/${id}`);
                
                let successMessage = 'Entry deleted successfully';
                if (response.data.knowledge_base === 'updated') {
                    successMessage += ' (Knowledge base updated)';
                } else if (response.data.knowledge_base === 'not_updated') {
                    successMessage += ' (Knowledge base not updated)';
                    if (response.data.knowledge_base_error) {
                        console.warn('Knowledge base update failed:', response.data.knowledge_base_error);
                    }
                }
                toast.success(successMessage);
                
                await fetchEntries();
            } catch (error) {
                console.error('Error deleting entry:', error);
                toast.error('Failed to delete entry');
            } finally {
                setIsDeletingEntry(null);
            }
        }
    };

    const startEditingEntry = (entry: MembershipEntry) => {
        setIsEditingEntry(entry.id);
        setEntryForm({
            is_section: entry.is_section,
            activity: entry.activity,
            tago_fan: entry.tago_fan,
            tago_hero: entry.tago_hero,
        });

        if (entry.tago_fan === 'check') setFanInputType('check');
        else if (entry.tago_fan === 'cross') setFanInputType('cross');
        else {
            setFanInputType('text');
            setFanText(entry.tago_fan || '');
        }

        if (entry.tago_hero === 'check') setHeroInputType('check');
        else if (entry.tago_hero === 'cross') setHeroInputType('cross');
        else {
            setHeroInputType('text');
            setHeroText(entry.tago_hero || '');
        }

        setShowEntryModal(true);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">Manage Membership Page</h1>
                    <button
                        onClick={() => setShowEntryModal(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-200 shadow-md"
                    >
                        <FaPlus className="text-sm" />
                        <span>Add New Entry</span>
                    </button>
                </div>

                {/* Header Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Page Header Settings</h2>
                        <button
                            onClick={() => setIsEditingHeader(!isEditingHeader)}
                            className="bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition duration-200"
                        >
                            {isEditingHeader ? 'Cancel' : 'Edit Header'}
                        </button>
                    </div>

                    {isEditingHeader ? (
                        <form onSubmit={handleHeaderSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Page Heading</label>
                                <input
                                    type="text"
                                    value={headerForm.page_heading || ''}
                                    onChange={(e) => setHeaderForm({ ...headerForm, page_heading: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Page Subheading</label>
                                <input
                                    type="text"
                                    value={headerForm.page_subheading || ''}
                                    onChange={(e) => setHeaderForm({ ...headerForm, page_subheading: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSavingHeader}
                                className={`bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition duration-200 ${isSavingHeader ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSavingHeader ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Saving...</span>
                                    </div>
                                ) : (
                                    'Save Header'
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-2">
                            <p><span className='font-semibold'>Page Heading:</span> {header?.page_heading || 'Not set'}</p>
                            <p><span className='font-semibold'>Page Subheading:</span> {header?.page_subheading || 'Not set'}</p>
                        </div>
                    )}
                </div>

                {/* Membership Entries Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Membership Entries</h2>
                    
                    {/* Entries Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tago Fan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tago Hero</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {entries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.is_section ? 'Section' : 'Entry'}</td>
                                        <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">{entry.activity}</td>
                                        <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">{entry.tago_fan || '-'}</td>
                                        <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">{entry.tago_hero || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => startEditingEntry(entry)}
                                                disabled={isDeletingEntry === entry.id}
                                                className={`text-blue-600 hover:text-blue-900 mr-3 ${isDeletingEntry === entry.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEntry(entry.id)}
                                                disabled={isDeletingEntry === entry.id}
                                                className={`text-red-600 hover:text-red-900 ${isDeletingEntry === entry.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {isDeletingEntry === entry.id ? (
                                                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <FaTrash />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Entry Modal */}
            {showEntryModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center p-2 sm:p-4 z-5 lg:pl-[250px]">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl xl:max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-4 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                                {isEditingEntry ? 'Edit Entry' : 'Add New Entry'}
                            </h2>
                            <form onSubmit={handleEntrySubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={entryForm.is_section}
                                            onChange={(e) => setEntryForm({ ...entryForm, is_section: e.target.checked })}
                                            className="h-5 w-5 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <label className="text-sm font-medium text-gray-700">Is Section Header</label>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Activity / Title</label>
                                        <textarea
                                            value={entryForm.activity}
                                            onChange={(e) => setEntryForm({ ...entryForm, activity: e.target.value })}
                                            className="block w-full rounded-md border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px] p-3"
                                            required
                                        />
                                    </div>
                                    {!entryForm.is_section && (
                                        <>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Tago Fan</label>
                                                <select
                                                    value={fanInputType}
                                                    onChange={(e) => setFanInputType(e.target.value as 'text' | 'check' | 'cross')}
                                                    className="mb-2 block w-full rounded-md border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                >
                                                    <option value="text">Text</option>
                                                    <option value="check">Check (✓)</option>
                                                    <option value="cross">Cross (×)</option>
                                                </select>
                                                {fanInputType === 'text' && (
                                                    <textarea
                                                        value={fanText}
                                                        onChange={(e) => setFanText(e.target.value)}
                                                        className="block w-full rounded-md border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px] p-3"
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Tago Hero</label>
                                                <select
                                                    value={heroInputType}
                                                    onChange={(e) => setHeroInputType(e.target.value as 'text' | 'check' | 'cross')}
                                                    className="mb-2 block w-full rounded-md border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                                >
                                                    <option value="text">Text</option>
                                                    <option value="check">Check (✓)</option>
                                                    <option value="cross">Cross (×)</option>
                                                </select>
                                                {heroInputType === 'text' && (
                                                    <textarea
                                                        value={heroText}
                                                        onChange={(e) => setHeroText(e.target.value)}
                                                        className="block w-full rounded-md border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px] p-3"
                                                        required
                                                    />
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEntryModal(false);
                                            setIsEditingEntry(null);
                                            resetEntryForm();
                                        }}
                                        disabled={isSavingEntry}
                                        className={`bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200 ${isSavingEntry ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSavingEntry}
                                        className={`bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition duration-200 ${isSavingEntry ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isSavingEntry ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>{isEditingEntry ? 'Updating...' : 'Adding...'}</span>
                                            </div>
                                        ) : (
                                            isEditingEntry ? 'Update Entry' : 'Add Entry'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMembershipPage;