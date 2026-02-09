import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../helper/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdFirstPage, MdLastPage } from "react-icons/md";
import { FiSettings, FiEdit, FiPieChart, FiBarChart2, FiUsers, FiClock, FiEye, FiFileText } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';

import { FcRefresh } from 'react-icons/fc';
import { getBrowserName, getCountryFromIP } from '../utils/PageVisitTracker';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PageVisit {
  id: string;
  user_id?: string;
  page_path: string;
  ip_address?: string;
  user_agent?: string;
  browser_name?: string;
  referrer?: string;
  session_id?: string;
  duration?: number;
  total_visits?: number;
  visit_time: string;
  country?: string;
}

interface PageCount {
  page_path: string;
  count: number;
}

interface VisitDate {
  visit_time: string;
  count: number;
}

interface VisitCountry {
  country: string;
  count: number;
}

interface PageVisitResponse {
  success: boolean;
  data: PageVisit[];
  detail: string;
  total_visits: number;
  page: number;
  page_count: PageCount[];
  visit_dates: VisitDate[];
}

const AdminDashboardPage = () => {
  const [pageVisits, setPageVisits] = useState<PageVisit[]>([]);
  const [pageCounts, setPageCounts] = useState<PageCount[]>([]);
  const [visitDates, setVisitDates] = useState<VisitDate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState<'overview' | 'logs'>('overview');
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredCoordinates, setHoveredCoordinates] = useState<[number, number] | null>(null);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [visitCountries, setVisitCountries] = useState<VisitCountry[]>([]);

  useEffect(() => {
    fetchPageVisits();
    fetchCountryVisits();
  }, []);

  const fetchPageVisits = async (page: number = currentPage) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<PageVisitResponse>(`/get-page-visits?page=${page}&limit=10`);
      if (response.data.success) {
        setPageVisits(response.data.data);
        setPageCounts(response.data.page_count);
        setVisitDates(response.data.visit_dates);
        setTotalEntries(response.data.total_visits);
        setCurrentPage(response.data.page);
        // console.log(response.data.country_visit_counts);
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

  const fetchCountryVisits = async () => {
    try {
      const response = await axiosInstance.get('/get-country-visits');
      if (response.data.success) {
        // Convert the country_counts object to VisitCountry array format
        const countryArray = Object.entries(response.data.country_visit_counts).map(([country, count]) => ({
          country,
          count: count as number
        }));
        setVisitCountries(countryArray);
      }
    } catch (error) {
      console.error('Error fetching country visits:', error);
    }
  };

  // Calculate metrics for overview
  const calculateMetrics = () => {
    if (!pageVisits.length) return null;

    const totalVisits = pageVisits.length;
    const uniqueSessionIds = new Set(pageVisits.map(visit => visit.session_id)).size;

    const pageVisitCounts: { [key: string]: number } = {};
    pageVisits.forEach(visit => {
      pageVisitCounts[visit.page_path] = (pageVisitCounts[visit.page_path] || 0) + 1;
    });

    const visitsWithDuration = pageVisits.filter(visit => visit.duration);
    const averageDuration = visitsWithDuration.length
      ? visitsWithDuration.reduce((acc, visit) => acc + (visit.duration || 0), 0) / visitsWithDuration.length
      : 0;

    return {
      totalVisits,
      uniqueSessionIds,
      pageVisitCounts,
      averageDuration: averageDuration.toFixed(2)
    };
  };

  const metrics = calculateMetrics() || {
    totalVisits: 0,
    uniqueSessionIds: 0,
    pageVisitCounts: {},
    averageDuration: "0.00"
  };

  // Prepare chart data
  const prepareChartData = () => {
    // Sort pages by count and get top 5
    const sortedPages = pageCounts
      .sort((a: PageCount, b: PageCount) => b.count - a.count)
      .slice(0, 5);

    const pieData = {
      labels: sortedPages.map((page: PageCount) => page.page_path),
      datasets: [
        {
          data: sortedPages.map((page: PageCount) => page.count),
          backgroundColor: [
            'rgba(46, 50, 147, 0.9)', // primary-dark
            'rgba(75, 192, 192, 0.9)', // teal
            'rgba(255, 159, 64, 0.9)', // orange
            'rgba(153, 102, 255, 0.9)', // purple
            'rgba(255, 99, 132, 0.9)', // pink
          ],
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };

    // Aggregate visits by day
    const visitsByDay = visitDates.reduce((acc: { [key: string]: number }, curr: VisitDate) => {
      const date = new Date(curr.visit_time).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + curr.count;
      return acc;
    }, {});

    // Convert to array and sort by date
    const sortedVisitDates = Object.entries(visitsByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const barData = {
      labels: sortedVisitDates.map(item =>
        new Date(item.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      ),
      datasets: [
        {
          label: 'Daily Visits',
          data: sortedVisitDates.map(item => item.count),
          backgroundColor: 'rgba(46, 50, 147, 0.8)', // primary-dark
          borderRadius: 6,
          hoverBackgroundColor: 'rgba(46, 50, 147, 1)', // primary-dark
        },
      ],
    };

    return { pieData, barData };
  };

  const chartData = prepareChartData();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pageVisits;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchPageVisits(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
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
            <FiEdit className="text-red-600" />
          </span>
          Error
        </h2>
        <p className="mt-2">{error}</p>
        <button
          onClick={() => fetchPageVisits()}
          className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
        >
          <FiEdit className="text-red-600" /> Try Again
        </button>
      </motion.div>
    );
  }

  // Function to handle mouse enter event
  const handleMouseEnter = (geo: any) => {
    const { name } = geo.properties;
    console.log(visitCountries)
    const countryData = visitCountries.find(country => country.country === name);
    const visitCount = countryData ? countryData.count : 0;
    setHoveredCountry(`${name} : ${visitCount} Visits`);
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  return (
    <motion.div
      className="bg-gray-50 min-h-screen p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* <h1 className="text-2xl font-bold text-primary-dark">
              Analytics Dashboard
            </h1>
            <p className="text-gray-500">Monitor your website performance and visitor activity</p> */}
          </motion.div>

          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'overview'
                ? 'bg-primary-dark text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              onClick={() => setActiveTab('overview')}
            >
              <FiPieChart /> Overview
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'logs'
                ? 'bg-primary-dark text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              onClick={() => setActiveTab('logs')}
            >
              <FiFileText /> Visit Logs
            </button>
          </motion.div>
        </div>

        {activeTab === 'overview' && (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-gray-600 text-sm font-medium">Total Visits</div>
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <FiEye className="text-primary-dark" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-dark">{totalEntries}</div>
                <div className="text-sm text-gray-500 mt-1">All-time page views</div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-gray-600 text-sm font-medium">Unique Visitors</div>
                  <div className="bg-violet-100 p-2 rounded-lg">
                    <FiUsers className="text-primary-dark" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-dark">{metrics.uniqueSessionIds}</div>
                <div className="text-sm text-gray-500 mt-1">Distinct user sessions</div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-gray-600 text-sm font-medium">Most Visited Page</div>
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <FiBarChart2 className="text-primary-dark" />
                  </div>
                </div>
                <div className="text-lg font-medium text-primary-dark truncate">
                  {Object.entries(metrics.pageVisitCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                </div>
                <div className="text-sm text-gray-500 mt-1">Highest traffic page</div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-gray-600 text-sm font-medium">Avg. Visit Duration</div>
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <FiClock className="text-primary-dark" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-dark">{metrics.averageDuration}s</div>
                <div className="text-sm text-gray-500 mt-1">Time spent per visit</div>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800">Top Pages</h3>
                  <div className="bg-gray-100 p-1.5 rounded-lg">
                    <FiPieChart className="text-gray-600" />
                  </div>
                </div>
                <div className="h-64">
                  {chartData && <Pie data={chartData.pieData} options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          usePointStyle: true,
                          padding: 15,
                          font: {
                            size: 11
                          }
                        }
                      }
                    }
                  }} />}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800">Visits Over Time</h3>
                  <div className="bg-gray-100 p-1.5 rounded-lg">
                    <FiBarChart2 className="text-gray-600" />
                  </div>
                </div>
                <div className="h-64">
                  {chartData && (
                    <Bar
                      data={chartData.barData}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              color: 'rgba(243, 244, 246, 0.8)'
                            }
                          },
                          x: {
                            grid: {
                              display: false
                            }
                          }
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>

            {/* World Map */}
            <motion.div
              className="xl:h-[670px] bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-800">Visitor Locations</h3>
                <div className="bg-gray-100 p-1.5 rounded-lg">
                  <FiUsers className="text-gray-600" />
                </div>
              </div>

              <div className='h-10'>
                {/* Country name and count display at the top left of the main div */}
                {hoveredCountry && (
                  <div className="text-lg font-semibold text-gray-700">
                    {hoveredCountry}
                  </div>
                )}
              </div>

              <div className="xl:h-[700px] w-full overflow-hidden rounded-lg">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 100,
                    center: [0, 0]
                  }}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Geographies geography="/world-110m.json">
                    {({ geographies, projection }) =>
                      geographies.map((geo) => {
                        if (geo.properties.name === "Antarctica") return null;
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#EAEAEC"
                            stroke="#D6D6DA"
                            onMouseEnter={() => handleMouseEnter(geo)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                              default: {
                                outline: "none"
                              },
                              hover: {
                                fill: "#2E3293",
                                outline: "none"
                              },
                              pressed: {
                                fill: "#2E3293",
                                outline: "none"
                              }
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'logs' && (
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
                  <p className="text-sm text-gray-500">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, pageVisits.length)} of {totalEntries} visits</p>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((visit) => (
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
                        {visit.browser_name || (visit.user_agent ? getBrowserName(visit.user_agent) : 'Unknown')}
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
                  Showing {currentPage} to {currentPage + 9} of {totalEntries} entries
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => paginate(1)}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-50  transition-colors rounded-md hover:bg-gray-100"
                      aria-label="First page"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MdFirstPage size={20} />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        paginate(currentPage - 1)
                        fetchPageVisits(currentPage - 1)
                      }}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-50  transition-colors rounded-md hover:bg-gray-100 cursor-pointer"
                      aria-label="Previous page"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MdKeyboardArrowLeft size={20} />
                    </motion.button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }

                        return (
                          <motion.button
                            key={pageNumber}
                            onClick={() => {
                              paginate(pageNumber)
                              fetchPageVisits(pageNumber)
                            }}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer ${currentPage === pageNumber
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
                      onClick={() => {
                        paginate(currentPage + 1)
                        fetchPageVisits(currentPage + 1)
                      }}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-50  transition-colors rounded-md hover:bg-gray-100 cursor-pointer"
                      aria-label="Next page"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MdKeyboardArrowRight size={20} />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        paginate(totalPages)
                        fetchPageVisits(totalPages)
                      }}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-50  transition-colors rounded-md hover:bg-gray-100 cursor-pointer"
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
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;

