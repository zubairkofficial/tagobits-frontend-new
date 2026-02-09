import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { Loader } from '../components/Loader';
import AdminMembershipPage from './AdminMembershipPage';

interface FeesHeader {
    id: string;
    title: string | null;
    subtitle: string | null;
    page_heading: string | null;
    page_subheading: string | null;
    show_tago_fan: boolean;
    show_tago_hero: boolean;
    show_tago_business: boolean;
}

interface FeeEntry {
    id: string;
    activity: string;
    tago_fan: string;
    tago_hero: string;
    tago_business: string;
    created_at: string;
}

interface MembershipCard {
    id: string;
    free_plan_title: string;
    free_plan_discount_text: string | null;
    free_plan_button_text: string;
    free_plan_feature1: string;
    free_plan_feature2: string;
    free_plan_feature3: string;
    free_plan_feature4: string;
    free_plan_feature5: string;
    free_plan_feature6: string;
    free_plan_feature7: string;
    free_plan_feature8: string;
    free_plan_feature9: string;
    hero_plan_title: string;
    hero_plan_discount_text: string;
    hero_plan_button_text: string;
    hero_plan_feature1: string;
    hero_plan_feature2: string;
    hero_plan_feature3: string;
    hero_plan_feature4: string;
    hero_plan_feature5: string;
    hero_plan_feature6: string;
    hero_plan_feature7: string;
    hero_plan_feature8: string;
    created_at: string;
    updated_at: string;
}

interface GlobalFees {
    id: string;
    monthly_fee_tago_fan: string;
    monthly_fee_tago_hero: string;
    monthly_fee_tago_business: string;
    created_at: string;
    updated_at: string;
}

const AdminFeesPage = () => {
    const [header, setHeader] = useState<FeesHeader | null>(null);
    const [entries, setEntries] = useState<FeeEntry[]>([]);
    const [membershipCard, setMembershipCard] = useState<MembershipCard | null>(null);
    const [globalFees, setGlobalFees] = useState<GlobalFees | null>(null);
    const [isEditingHeader, setIsEditingHeader] = useState(false);
    const [isEditingEntry, setIsEditingEntry] = useState<string | null>(null);
    const [isEditingMembership, setIsEditingMembership] = useState(false);
    const [isEditingGlobalFees, setIsEditingGlobalFees] = useState(false);
    const [isEditingFeesEntry, setIsEditingFeesEntry] = useState(false);
    const [newEntry, setNewEntry] = useState<Partial<FeeEntry>>({});
    const [loading, setLoading] = useState(true);
    const [showEntryModal, setShowEntryModal] = useState(false);
    const [isSavingHeader, setIsSavingHeader] = useState(false);
    const [isSavingEntry, setIsSavingEntry] = useState(false);
    const [isSavingMembership, setIsSavingMembership] = useState(false);
    const [isSavingGlobalFees, setIsSavingGlobalFees] = useState(false);
    const [isDeletingEntry, setIsDeletingEntry] = useState<string | null>(null);

    // Header form state
    const [headerForm, setHeaderForm] = useState({
        title: '',
        subtitle: '',
        page_heading: '',
        page_subheading: '',
        show_tago_fan: true,
        show_tago_hero: true,
        show_tago_business: true
    });

    // Entry form state
    const [entryForm, setEntryForm] = useState({
        activity: '',
        tago_fan: '',
        tago_hero: '',
        tago_business: ''
    });

    // Membership card form state
    const [membershipForm, setMembershipForm] = useState({
        free_plan_title: '',
        free_plan_discount_text: '',
        free_plan_button_text: '',
        free_plan_feature1: '',
        free_plan_feature2: '',
        free_plan_feature3: '',
        free_plan_feature4: '',
        free_plan_feature5: '',
        free_plan_feature6: '',
        free_plan_feature7: '',
        free_plan_feature8: '',
        free_plan_feature9: '',
        hero_plan_title: '',
        hero_plan_discount_text: '',
        hero_plan_button_text: '',
        hero_plan_feature1: '',
        hero_plan_feature2: '',
        hero_plan_feature3: '',
        hero_plan_feature4: '',
        hero_plan_feature5: '',
        hero_plan_feature6: '',
        hero_plan_feature7: '',
        hero_plan_feature8: ''
    });

    // Global fees form state
    const [globalFeesForm, setGlobalFeesForm] = useState({
        monthly_fee_tago_fan: '',
        monthly_fee_tago_hero: '',
        monthly_fee_tago_business: ''
    });

    useEffect(() => {
        fetchHeader();
        fetchEntries();
        fetchMembershipCard();
        fetchGlobalFees();
    }, []);

    const fetchHeader = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/fees/header');
            setHeader(response.data);
            setHeaderForm(response.data);
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
            const response = await axiosInstance.get('/fees/entries');
            // Sort entries by created_at in ascending order
            const sortedEntries = response.data.sort((a: FeeEntry, b: FeeEntry) => 
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
            setEntries(sortedEntries);
        } catch (error) {
            console.error('Error fetching entries:', error);
            toast.error('Failed to fetch entries');
        } finally {
            setLoading(false);
        }
    };

    const fetchMembershipCard = async () => {
        try {
            const response = await axiosInstance.get('/fees/membership-card');
            setMembershipCard(response.data);
            setMembershipForm(response.data);
        } catch (error) {
            console.error('Error fetching membership card:', error);
            toast.error('Failed to fetch membership card');
        }
    };

    const fetchGlobalFees = async () => {
        try {
            const response = await axiosInstance.get('/fees/global-fees');
            setGlobalFees(response.data);
            setGlobalFeesForm(response.data);
        } catch (error) {
            console.error('Error fetching global fees:', error);
            toast.error('Failed to fetch global fees');
        }
    };

    const handleHeaderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingHeader(true);
        try {
            if (header) {
                await axiosInstance.put('/fees/header', headerForm);
                toast.success('Header updated successfully');
            } else {
                await axiosInstance.post('/fees/header', headerForm);
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

    const handleEntrySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingEntry(true);
        try {
            let response;
            if (isEditingEntry) {
                response = await axiosInstance.put(`/fees/entries/${isEditingEntry}`, entryForm);
                
                // Show success message with knowledge base status
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
                response = await axiosInstance.post('/fees/entries', entryForm);
                
                // Show success message with knowledge base status
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
            setEntryForm({
                activity: '',
                tago_fan: '',
                tago_hero: '',
                tago_business: ''
            });
        } catch (error) {
            console.error('Error updating entry:', error);
            toast.error('Failed to update entry');
        } finally {
            setIsSavingEntry(false);
        }
    };

    const handleDeleteEntry = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            try {
                setIsDeletingEntry(id);
                const response = await axiosInstance.delete(`/fees/entries/${id}`);
                
                // Show success message with knowledge base status
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

    const handleMembershipSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingMembership(true);
        try {
            await axiosInstance.put('/fees/membership-card', membershipForm);
            toast.success('Membership card updated successfully');
            await fetchMembershipCard();
            setIsEditingMembership(false);
        } catch (error) {
            console.error('Error updating membership card:', error);
            toast.error('Failed to update membership card');
        } finally {
            setIsSavingMembership(false);
        }
    };

    const handleGlobalFeesSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSavingGlobalFees(true);
        try {
            await axiosInstance.put('/fees/global-fees', globalFeesForm);
            toast.success('Global fees updated successfully');
            await fetchGlobalFees();
            await fetchEntries(); // Refresh entries to show updated first row
            setIsEditingGlobalFees(false);
        } catch (error) {
            console.error('Error updating global fees:', error);
            toast.error('Failed to update global fees');
        } finally {
            setIsSavingGlobalFees(false);
        }
    };

    const startEditingEntry = (entry: FeeEntry) => {
        setIsEditingEntry(entry.id);
        // Determine if this is the special fees entry (second row)
        const secondEntryId = entries[1]?.id;
        setIsEditingFeesEntry(entry.id === secondEntryId);
        setEntryForm({
            activity: entry.activity,
            tago_fan: entry.tago_fan,
            tago_hero: entry.tago_hero,
            tago_business: entry.tago_business
        });
        setShowEntryModal(true);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto mb-20">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">Manage Fees Page</h1>
                </div>

                {/* Column Visibility Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Column Visibility Settings</h2>
                        <button
                            onClick={() => setIsEditingHeader(!isEditingHeader)}
                            className="bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition duration-200"
                        >
                            {isEditingHeader ? 'Cancel' : 'Edit Settings'}
                        </button>
                    </div>

                    {isEditingHeader ? (
                        <form onSubmit={handleHeaderSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={headerForm.show_tago_fan}
                                            onChange={(e) => setHeaderForm({ ...headerForm, show_tago_fan: e.target.checked })}
                                            className="h-5 w-5 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <div>
                                            <span className="text-lg font-medium text-gray-900">Tago Fan</span>
                                            <p className="text-sm text-gray-500">Show/hide Tago Fan column</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={headerForm.show_tago_hero}
                                            onChange={(e) => setHeaderForm({ ...headerForm, show_tago_hero: e.target.checked })}
                                            className="h-5 w-5 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <div>
                                            <span className="text-lg font-medium text-gray-900">Tago Hero</span>
                                            <p className="text-sm text-gray-500">Show/hide Tago Hero column</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={headerForm.show_tago_business}
                                            onChange={(e) => setHeaderForm({ ...headerForm, show_tago_business: e.target.checked })}
                                            className="h-5 w-5 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <div>
                                            <span className="text-lg font-medium text-gray-900">Tago Business</span>
                                            <p className="text-sm text-gray-500">Show/hide Tago Business column</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSavingHeader}
                                    className={`bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-200 ${isSavingHeader ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSavingHeader ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Saving...</span>
                                        </div>
                                    ) : (
                                        'Save Visibility Settings'
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={`p-4 rounded-lg ${header?.show_tago_fan ? 'bg-green-50' : 'bg-red-50'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Tago Fan</h3>
                                        <p className="text-sm text-gray-500">Column visibility status</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${header?.show_tago_fan ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {header?.show_tago_fan ? 'Visible' : 'Hidden'}
                                    </span>
                                </div>
                            </div>
                            <div className={`p-4 rounded-lg ${header?.show_tago_hero ? 'bg-green-50' : 'bg-red-50'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Tago Hero</h3>
                                        <p className="text-sm text-gray-500">Column visibility status</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${header?.show_tago_hero ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {header?.show_tago_hero ? 'Visible' : 'Hidden'}
                                    </span>
                                </div>
                            </div>
                            <div className={`p-4 rounded-lg ${header?.show_tago_business ? 'bg-green-50' : 'bg-red-50'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Tago Business</h3>
                                        <p className="text-sm text-gray-500">Column visibility status</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${header?.show_tago_business ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {header?.show_tago_business ? 'Visible' : 'Hidden'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Header Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Page Header</h2>
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
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={headerForm.title || ''}
                                    onChange={(e) => setHeaderForm({ ...headerForm, title: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                                <input
                                    type="text"
                                    value={headerForm.subtitle || ''}
                                    onChange={(e) => setHeaderForm({ ...headerForm, subtitle: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
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
                            <p><span className='font-semibold'>Title:</span> {header?.title || 'Not set'}</p>
                            <p><span className='font-semibold'>Subtitle:</span> {header?.subtitle || 'Not set'}</p>
                            <p><span className='font-semibold'>Page Heading:</span> {header?.page_heading || 'Not set'}</p>
                            <p><span className='font-semibold'>Page Subheading:</span> {header?.page_subheading || 'Not set'}</p>
                        </div>
                    )}
                </div>

                {/* Global Fees Section - moved above tables */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Global Fees</h2>
                        <button
                            onClick={() => setIsEditingGlobalFees(!isEditingGlobalFees)}
                            className="bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition duration-200"
                        >
                            {isEditingGlobalFees ? 'Cancel' : 'Edit Global Fees'}
                        </button>
                    </div>

                    {isEditingGlobalFees ? (
                        <form onSubmit={handleGlobalFeesSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tago Fan Monthly Fee</label>
                                    <input
                                        type="text"
                                        value={globalFeesForm.monthly_fee_tago_fan}
                                        onChange={(e) => setGlobalFeesForm({ ...globalFeesForm, monthly_fee_tago_fan: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., Free"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tago Hero Monthly Fee</label>
                                    <input
                                        type="text"
                                        value={globalFeesForm.monthly_fee_tago_hero}
                                        onChange={(e) => setGlobalFeesForm({ ...globalFeesForm, monthly_fee_tago_hero: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., $17.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tago Business Monthly Fee</label>
                                    <input
                                        type="text"
                                        value={globalFeesForm.monthly_fee_tago_business}
                                        onChange={(e) => setGlobalFeesForm({ ...globalFeesForm, monthly_fee_tago_business: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., $50.00"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSavingGlobalFees}
                                    className={`bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-200 ${isSavingGlobalFees ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSavingGlobalFees ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Saving...</span>
                                        </div>
                                    ) : (
                                        'Save Global Fees'
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tago Fan</h3>
                                <p className="text-2xl font-bold text-gray-900">{globalFees?.monthly_fee_tago_fan || 'Free'}</p>
                                <p className="text-sm text-gray-500 mt-1">Monthly Fee</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tago Hero</h3>
                                <p className="text-2xl font-bold text-gray-900">{globalFees?.monthly_fee_tago_hero || '$17.00'}</p>
                                <p className="text-sm text-gray-500 mt-1">Monthly Fee</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tago Business</h3>
                                <p className="text-2xl font-bold text-gray-900">{globalFees?.monthly_fee_tago_business || '$50.00'}</p>
                                <p className="text-sm text-gray-500 mt-1">Monthly Fee</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Membership Cards Section - moved above tables */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Membership Cards</h2>
                        <button
                            onClick={() => setIsEditingMembership(!isEditingMembership)}
                            className="bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition duration-200"
                        >
                            {isEditingMembership ? 'Cancel' : 'Edit Cards'}
                        </button>
                    </div>

                    {isEditingMembership ? (
                        <form onSubmit={handleMembershipSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Tago Fan Card */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tago Fan Card</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Title</label>
                                            <input
                                                type="text"
                                                value={membershipForm.free_plan_title}
                                                onChange={(e) => setMembershipForm({ ...membershipForm, free_plan_title: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Text</label>
                                            <input
                                                type="text"
                                                value={membershipForm.free_plan_discount_text}
                                                onChange={(e) => setMembershipForm({ ...membershipForm, free_plan_discount_text: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Optional - leave empty if not needed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                                            <input
                                                type="text"
                                                value={membershipForm.free_plan_button_text}
                                                onChange={(e) => setMembershipForm({ ...membershipForm, free_plan_button_text: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                                <input
                                                    key={num}
                                                    type="text"
                                                    value={membershipForm[`free_plan_feature${num}` as keyof typeof membershipForm]}
                                                    onChange={(e) => setMembershipForm({ ...membershipForm, [`free_plan_feature${num}`]: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                                                    placeholder={`Feature ${num}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Tago Hero Card */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tago Hero Card</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Title</label>
                                            <input
                                                type="text"
                                                value={membershipForm.hero_plan_title}
                                                onChange={(e) => setMembershipForm({ ...membershipForm, hero_plan_title: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Text</label>
                                            <input
                                                type="text"
                                                value={membershipForm.hero_plan_discount_text}
                                                onChange={(e) => setMembershipForm({ ...membershipForm, hero_plan_discount_text: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                                            <input
                                                type="text"
                                                value={membershipForm.hero_plan_button_text}
                                                onChange={(e) => setMembershipForm({ ...membershipForm, hero_plan_button_text: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                <input
                                                    key={num}
                                                    type="text"
                                                    value={membershipForm[`hero_plan_feature${num}` as keyof typeof membershipForm]}
                                                    onChange={(e) => setMembershipForm({ ...membershipForm, [`hero_plan_feature${num}`]: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                                                    placeholder={`Feature ${num}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSavingMembership}
                                    className={`bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-200 ${isSavingMembership ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSavingMembership ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Saving...</span>
                                        </div>
                                    ) : (
                                        'Save Membership Cards'
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Tago Fan Card Preview */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tago Fan Card</h3>
                                <div className="space-y-2">
                                    <p><span className="font-medium">Title:</span> {membershipCard?.free_plan_title || 'Not set'}</p>
                                    <p><span className="font-medium">Discount Text:</span> {membershipCard?.free_plan_discount_text || 'Not set'}</p>
                                    <p><span className="font-medium">Button Text:</span> {membershipCard?.free_plan_button_text || 'Not set'}</p>
                                    <div className="mt-4">
                                        <p className="font-medium mb-2">Features:</p>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                                <li key={num}>{membershipCard?.[`free_plan_feature${num}` as keyof typeof membershipCard] || `Feature ${num} not set`}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Tago Hero Card Preview */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tago Hero Card</h3>
                                <div className="space-y-2">
                                    <p><span className="font-medium">Title:</span> {membershipCard?.hero_plan_title || 'Not set'}</p>
                                    <p><span className="font-medium">Discount Text:</span> {membershipCard?.hero_plan_discount_text || 'Not set'}</p>
                                    <p><span className="font-medium">Button Text:</span> {membershipCard?.hero_plan_button_text || 'Not set'}</p>
                                    <div className="mt-4">
                                        <p className="font-medium mb-2">Features:</p>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                <li key={num}>{membershipCard?.[`hero_plan_feature${num}` as keyof typeof membershipCard] || `Feature ${num} not set`}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Fee Entries Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Fee Entries</h2>
                        <button
                            onClick={() => setShowEntryModal(true)}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition duration-200 shadow-md"
                        >
                            <FaPlus className="text-sm" />
                            <span>Add New Entry</span>
                        </button>
                    </div>
                    
                    {/* Entries Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tago Fan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tago Hero</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tago Business</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {entries.map((entry, index) => {
                                    // The second entry in the table is the fees entry
                                    const isFeesEntry = index === 1;
                                    
                                    return (
                                        <tr key={entry.id} className={`hover:bg-gray-50 ${isFeesEntry ? 'bg-blue-50' : ''}`}>
                                            <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                                {entry.activity}
                                                {isFeesEntry && (
                                                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                        Synced with Global Fees
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                                {isFeesEntry ? (
                                                    <span className="font-semibold text-blue-700">{globalFees?.monthly_fee_tago_fan || entry.tago_fan}</span>
                                                ) : (
                                                    entry.tago_fan
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                                {isFeesEntry ? (
                                                    <span className="font-semibold text-blue-700">{globalFees?.monthly_fee_tago_hero || entry.tago_hero}</span>
                                                ) : (
                                                    entry.tago_hero
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
                                                {isFeesEntry ? (
                                                    <span className="font-semibold text-blue-700">{globalFees?.monthly_fee_tago_business || entry.tago_business}</span>
                                                ) : (
                                                    entry.tago_business
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    isFeesEntry ? (
                                                        // No delete button for the fees entry; allow edit only
                                                        <button
                                                            onClick={() => startEditingEntry(entry)}
                                                            disabled={isDeletingEntry === entry.id}
                                                            className={`text-blue-600 hover:text-blue-900 ${isDeletingEntry === entry.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    ) : (
                                                        <>
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
                                                        </>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
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
                                <div className={`grid gap-6 ${isEditingFeesEntry ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 lg:grid-cols-4'}`}>
                                    <div className={`flex flex-col ${isEditingFeesEntry ? 'w-full max-w-2xl' : ''}`}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Activity</label>
                                        <textarea
                                            value={entryForm.activity}
                                            onChange={(e) => setEntryForm({ ...entryForm, activity: e.target.value })}
                                            className="block w-full rounded-md border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px] p-3"
                                            required
                                        />
                                    </div>
                                    {!isEditingFeesEntry && (
                                        <>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Tago Fan</label>
                                                <textarea
                                                    value={entryForm.tago_fan}
                                                    onChange={(e) => setEntryForm({ ...entryForm, tago_fan: e.target.value })}
                                                    className="block w-full rounded-md border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px] p-3"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Tago Hero</label>
                                                <textarea
                                                    value={entryForm.tago_hero}
                                                    onChange={(e) => setEntryForm({ ...entryForm, tago_hero: e.target.value })}
                                                    className="block w-full rounded-md border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px] p-3"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Tago Business</label>
                                                <textarea
                                                    value={entryForm.tago_business}
                                                    onChange={(e) => setEntryForm({ ...entryForm, tago_business: e.target.value })}
                                                    className="block w-full rounded-md border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px] p-3"
                                                    required
                                                />
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
                                            setEntryForm({
                                                activity: '',
                                                tago_fan: '',
                                                tago_hero: '',
                                                tago_business: ''
                                            });
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

            {/* moved sections above */}
            
            <AdminMembershipPage />

        </div>
    );
};

export default AdminFeesPage;