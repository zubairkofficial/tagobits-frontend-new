import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../helper/axios';
import { Loader } from '../components/Loader';
import { toast } from 'react-hot-toast';
import { FiGlobe, FiSearch, FiEdit, FiChevronLeft, FiChevronRight, FiRefreshCw, FiSave, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Translation {
    id: string;
    content_hash: string;
    source_text: string;
    target_language: string;
    translated_text: string;
    updated_at: string;
}

interface AllTranslationsResponse {
    success: boolean;
    translations: Translation[];
    total: number;
    page: number;
    pageSize: number;
}

const AdminTranslationsPage: React.FC = () => {
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [pageSize] = useState<number>(20);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const fetchLanguages = async () => {
        try {
            const response = await axiosInstance.get<{ success: boolean; languages: string[] }>('/translate/languages');
            if (response.data.success) {
                setLanguages(response.data.languages);
            }
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };

    const fetchTranslations = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('pageSize', pageSize.toString());
            if (selectedLanguage) params.append('language', selectedLanguage);
            if (searchTerm) params.append('search', searchTerm);

            const response = await axiosInstance.get<AllTranslationsResponse>(`/translate/all?${params.toString()}`);
            if (response.data.success) {
                setTranslations(response.data.translations);
                setTotal(response.data.total);
            }
        } catch (error: any) {
            toast.error('Failed to fetch translations');
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, selectedLanguage, searchTerm]);

    useEffect(() => {
        fetchLanguages();
    }, []);

    useEffect(() => {
        fetchTranslations();
    }, [fetchTranslations]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchTranslations();
    };

    const startEditing = (translation: Translation) => {
        setEditingId(translation.id);
        setEditValue(translation.translated_text);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditValue('');
    };

    const saveTranslation = async (id: string) => {
        try {
            setIsUpdating(true);
            const response = await axiosInstance.post<{ success: boolean; message: string }>('/translate/update', {
                id,
                translatedText: editValue
            });
            if (response.data.success) {
                toast.success('Translation updated successfully');
                setTranslations(prev => prev.map(t => t.id === id ? { ...t, translated_text: editValue } : t));
                setEditingId(null);
            }
        } catch (error) {
            toast.error('Failed to update translation');
        } finally {
            setIsUpdating(false);
        }
    };

    const totalPages = Math.ceil(total / pageSize);

    return (
        <motion.div className="p-6 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FiGlobe className="text-primary" /> Translation Management
                    </h2>
                    <p className="text-gray-500">Manage and edit website translations dynamically</p>
                </div>
                <button
                    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 shadow-sm"
                    onClick={() => {
                        fetchLanguages();
                        fetchTranslations();
                    }}
                >
                    <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by source text..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <select
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1em_1em]"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")' }}
                            value={selectedLanguage}
                            onChange={(e) => {
                                setSelectedLanguage(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="">All Languages</option>
                            {languages.map(lang => (
                                <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                    >
                        Search
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex flex-col items-center justify-center space-y-4">
                        <Loader />
                        <p className="text-gray-500 animate-pulse">Loading translations...</p>
                    </div>
                ) : translations.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                            <FiGlobe className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-500">No translations found matching your criteria</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Source Text</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Translated Text</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {translations.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase">
                                                {t.target_language}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-900 line-clamp-2 max-w-sm" title={t.source_text}>{t.source_text}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingId === t.id ? (
                                                <textarea
                                                    className="w-full p-2 border border-primary rounded-lg text-sm focus:outline-none ring-2 ring-primary/10"
                                                    rows={3}
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-600 line-clamp-2" title={t.translated_text}>
                                                    {t.translated_text || <span className="text-gray-300 italic">No translation</span>}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {editingId === t.id ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        onClick={cancelEditing}
                                                        title="Cancel"
                                                    >
                                                        <FiX size={18} />
                                                    </button>
                                                    <button
                                                        className={`p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors ${isUpdating ? 'opacity-50' : ''}`}
                                                        onClick={() => saveTranslation(t.id)}
                                                        disabled={isUpdating}
                                                        title="Save"
                                                    >
                                                        <FiSave size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                    onClick={() => startEditing(t)}
                                                    title="Edit Translation"
                                                >
                                                    <FiEdit size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(page * pageSize, total)}</span> of{' '}
                            <span className="font-medium">{total}</span> translations
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-white transition-colors"
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                            >
                                <FiChevronLeft />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum = page;
                                    if (totalPages <= 5) pageNum = i + 1;
                                    else if (page <= 3) pageNum = i + 1;
                                    else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                                    else pageNum = page - 2 + i;

                                    return (
                                        <button
                                            key={pageNum}
                                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${page === pageNum
                                                ? 'bg-primary text-white shadow-md'
                                                : 'text-gray-500 hover:bg-white hover:border-gray-300 border border-transparent'
                                                }`}
                                            onClick={() => setPage(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-white transition-colors"
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AdminTranslationsPage;
