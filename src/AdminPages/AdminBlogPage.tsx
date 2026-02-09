import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Loader } from '../components/Loader';
import BlogForm from '../components/BlogForm';

interface BlogData {
  id: string;
  title: string;
  slug: string;
  author: string;
  publish_date: string;
  created_at: string;
  updated_at: string;
  category?: string;
  content: string;
  image_url?: string;
  include_in_knowledge_base?: boolean;
}

interface PaginatedResponse {
  blogs: BlogData[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

const AdminBlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newBlogModal, setNewBlogModal] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogData | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalBlogs, setTotalBlogs] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>(['all']);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchQuery, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/blogs/categories');
      setCategories(['all', ...res.data]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '10' // Show 10 blogs per page in admin
      });

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      const response = await axiosInstance.get(`/blogs/paginated?${params}`);
      const data: PaginatedResponse = response.data;

      setBlogs(data.blogs);
      setTotalPages(data.total_pages);
      setTotalBlogs(data.total);
      setHasNext(data.has_next);
      setHasPrev(data.has_prev);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: BlogData) => {
    setSelectedBlog(blog);
    setNewBlogModal(true);
  };

  const handleDelete = async (blogId: string) => {
    try {
      setIsDeleting(blogId);
      await axiosInstance.delete(`/blogs/${blogId}`);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (err) {
      toast.error('Failed to delete blog');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleCreateNewBlog = () => {
    setSelectedBlog(null);
    setNewBlogModal(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">Blog Management</h1>
          <button
            onClick={handleCreateNewBlog}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#1952A8] to-primary-dark text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-200 shadow-md cursor-pointer"
          >
            <FaPlus className="text-sm" />
            <span>Create New Blog</span>
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {blogs.length} of {totalBlogs} blogs
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {blogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No blogs available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">Title</th>
                    <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">Author</th>
                    <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">Category</th>
                    <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">Publish Date</th>
                    <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">Updated Date</th>
                    <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">Knowledge Base</th>
                    <th className="px-3 sm:px-6 py-4 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">{blog.title}</td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-gray-600 max-w-xs truncate">{blog.author}</td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-gray-600 max-w-xs truncate">{blog.category || 'Uncategorized'}</td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-gray-600 max-w-xs truncate">
                        {new Date(blog.publish_date).toLocaleDateString()}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-gray-600 max-w-xs truncate">
                        {new Date(blog.updated_at).toLocaleDateString()}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-gray-600 max-w-xs truncate">
                        {blog.include_in_knowledge_base ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Included
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Not Included
                          </span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleEdit(blog)}
                          disabled={isDeleting === blog.id}
                          className={`inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mr-2 sm:mr-4 cursor-pointer ${isDeleting === blog.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <FaEdit className="text-sm" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          disabled={isDeleting === blog.id}
                          className={`inline-flex items-center gap-1 text-red-600 hover:text-red-800 cursor-pointer ${isDeleting === blog.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isDeleting === blog.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                              <span className="hidden sm:inline">Deleting...</span>
                            </>
                          ) : (
                            <>
                              <FaTrash className="text-sm" />
                              <span className="hidden sm:inline">Delete</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrev}
              className={`px-4 py-2 rounded-lg border cursor-pointer ${hasPrev
                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-lg border ${currentPage === pageNum
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNext}
              className={`px-4 py-2 rounded-lg border cursor-pointer ${hasNext
                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {newBlogModal && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center p-2 sm:p-4 z-5 lg:pl-[250px]">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl xl:max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                {selectedBlog ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              <BlogForm
                blog={selectedBlog}
                onClose={() => setNewBlogModal(false)}
                refreshBlogs={fetchBlogs}
                isSaving={isSaving}
                setIsSaving={setIsSaving}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;