import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/axios';
import { toast } from 'react-hot-toast';
import { Loader } from './Loader';

interface BlogFormProps {
    blog: any;
    onClose: () => void;
    refreshBlogs: () => void;
    isSaving: boolean;
    setIsSaving: (saving: boolean) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, onClose, refreshBlogs, isSaving, setIsSaving }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        content: '',
        image_url: '',
        include_in_knowledge_base: false,
    });

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || '',
                author: blog.author || '',
                category: blog.category || '',
                content: blog.content || '',
                image_url: blog.image_url || '',
                include_in_knowledge_base: blog.include_in_knowledge_base || false,
            });
        }
    }, [blog]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData((prev) => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (blog) {
                await axiosInstance.put(`/blogs/${blog.id}`, formData);
                toast.success('Blog updated successfully');
            } else {
                await axiosInstance.post('/blogs', formData);
                toast.success('Blog created successfully');
            }
            refreshBlogs();
            onClose();
        } catch (error: any) {
            console.error('Error saving blog:', error);
            toast.error(error.response?.data?.detail || 'Failed to save blog');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={10}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="include_in_knowledge_base"
                    checked={formData.include_in_knowledge_base}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Include in Knowledge Base</label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
                >
                    {isSaving ? <Loader size={4} color="white" /> : (blog ? 'Update Blog' : 'Create Blog')}
                </button>
            </div>
        </form>
    );
};

export default BlogForm;
