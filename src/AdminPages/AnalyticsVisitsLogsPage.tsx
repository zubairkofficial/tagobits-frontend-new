import React, { useEffect, useState } from 'react';
import axiosInstance from '../helper/axios';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdFirstPage, MdLastPage } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { motion } from 'framer-motion';
import { FcRefresh } from 'react-icons/fc';
import { Loader } from '../components/Loader';

interface PageVisit {
  id: string;
  user_id?: string;
  page_path: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  session_id?: string;
  duration?: number;
  visit_time: string;
}

interface PageVisitResponse {
  success: boolean;
  data: PageVisit[];
  detail: string;
  page_count: number;
  total_visits: number;
  page: number;
  visit_dates: string[];
  country_visit_counts: { [key: string]: number };
}

const AnalyticsVisitsLogsPage: React.FC = () => {
  const [pageVisits, setPageVisits] = useState<PageVisit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [visitDates, setVisitDates] = useState<string[]>([]);
  const [visitCountries, setVisitCountries] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchPageVisits();
  }, [currentPage]);

  const fetchPageVisits = async (page: number = currentPage) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<PageVisitResponse>(`/get-page-visits?page=${page}&limit=10`);
      if (response.data.success) {
        setPageVisits(response.data.data);
        setPageCount(response.data.page_count);
        setVisitDates(response.data.visit_dates);
        setTotalEntries(response.data.total_visits);
        setCurrentPage(response.data.page);
        setVisitCountries(response.data.country_visit_counts);
      } else {
        setError(response.data.detail || 'Failed to fetch page visits');
      }
    } catch (error) {
      setError('Error fetching page visits data');
      console.error('Error fetching page visits:', error);
    } finally {
      setLoading(false);
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="p-6 bg-red-50 text-red-800 rounded-lg border border-red-200 mx-auto max-w-4xl mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-red-100 p-1.5 rounded-full">
            <FiFileText className="text-red-600" />
          </span>
          Error
        </h2>
        <p className="mt-2">{error}</p>
        <button 
          onClick={() => fetchPageVisits()}
          className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
        >
          <FiFileText className="text-red-600" /> Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-gray-50 min-h-screen space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold text-primary-dark">
            Visit Logs
          </h1>
          <p className="text-gray-500">Monitor your website visitor activity</p>
        </motion.div>
          
        <motion.div 
          className="bg-white shadow-sm rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Page Visit Logs</h3>
                <p className="text-sm text-gray-500">Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalEntries)} of {totalEntries} visits</p>
              </div>
              <button 
                onClick={() => fetchPageVisits()}
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-600 transition-colors"
              >
                <FcRefresh />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ip Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pageVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(visit.visit_time).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className="text-primary hover:text-primary-dark truncate block max-w-[200px]">
                        {visit.page_path}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {visit.user_id || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {visit.ip_address || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {visit.duration ? `${visit.duration.toFixed(1)}s` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="truncate block max-w-[150px]">
                        {visit.referrer || 'Direct'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-white border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalEntries)} of {totalEntries} entries
              </div>
              
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-gray-100"
                    aria-label="First page"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdFirstPage size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-gray-100"
                    aria-label="Previous page"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdKeyboardArrowLeft size={20} />
                  </motion.button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                      let pageNumber;
                      if (pageCount <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= pageCount - 2) {
                        pageNumber = pageCount - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <motion.button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer ${
                            currentPage === pageNumber
                              ? 'bg-primary-dark text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {pageNumber}
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    className="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-gray-100"
                    aria-label="Next page"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdKeyboardArrowRight size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => paginate(pageCount)}
                    disabled={currentPage === pageCount}
                    className="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-gray-100"
                    aria-label="Last page"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MdLastPage size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalyticsVisitsLogsPage;

