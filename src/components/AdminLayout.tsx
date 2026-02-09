import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TbDashboard, TbUsers, TbChartBar, TbSettings, TbMenu2, TbX, TbMessage, TbFileText, TbLock, TbShieldLock, TbBell, TbClock, TbBook } from 'react-icons/tb';
import { FaQ } from 'react-icons/fa6';
import { BiLogOut } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface NavigationItem {
  href: string;
  label: string;
  Icon: IconType;
}

interface NavigationCategory {
  label: string;
  items: NavigationItem[];
}

type NavigationEntry = NavigationCategory | NavigationItem;

const AdminLayout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 1024);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/control-center/login');
  };

  const navigationEntries: NavigationEntry[] = role === 'ticket_handler' ? [
    { href: '/control-center/tickets', label: 'Tickets', Icon: TbMessage },
    { href: '/control-center/settings', label: 'Settings', Icon: TbSettings },
  ] : [
    {
      label: 'General',
      items: [
        { href: '/control-center/dashboard', label: 'TagoDash', Icon: TbDashboard },
        { href: '/control-center/notifications', label: 'Notifications', Icon: TbBell },
        { href: '/control-center/analytics', label: 'Visits Logs', Icon: TbChartBar },
        { href: '/control-center/users', label: 'Users', Icon: TbUsers },
      ],
    },
    {
      label: 'Video Content',
      items: [
        { href: '/control-center/tago-media', label: 'Tago Media', Icon: TbFileText },
      ],
    },
    {
      label: 'Policies',
      items: [
        { href: '/control-center/privacy-policy', label: 'Privacy Policy', Icon: TbLock },
        { href: '/control-center/terms', label: 'Terms & Conditions', Icon: TbFileText },
        { href: '/control-center/personal-data-policy', label: 'Data Policy', Icon: TbShieldLock },
        { href: '/control-center/security-policy', label: 'Security Policy', Icon: TbLock },
        { href: '/control-center/master-service-agreement', label: 'Master Service Agreement', Icon: TbShieldLock },
      ],
    },
    {
      label: 'Support',
      items: [
        { href: '/control-center/tickets', label: 'Tickets', Icon: TbMessage },
        { href: '/control-center/ticket-handler', label: 'Ticket Handlers', Icon: TbMessage },
        { href: '/control-center/customer-care', label: 'Customer Care', Icon: TbMessage },
        { href: '/control-center/api-documentation', label: 'API Documentation', Icon: TbBook },
      ],
    },
    {
      label: 'Website Content',
      items: [
        { href: '/control-center/content', label: 'Content', Icon: TbFileText },
        { href: '/control-center/partnership', label: 'Partnership', Icon: TbChartBar },
        { href: '/control-center/faqs', label: 'FAQs', Icon: FaQ },
        { href: '/control-center/jurisdictions', label: 'Jurisdictions', Icon: TbFileText },
        { href: '/control-center/blog', label: 'Blog', Icon: TbFileText },
      ],
    },
    { href: '/control-center/settings', label: 'Settings', Icon: TbSettings },
  ];

  const handleCategoryToggle = (label: string) => {
    setOpenCategory(openCategory === label ? null : label);
  };

  const isCategory = (entry: NavigationEntry): entry is NavigationCategory => {
    return (entry as NavigationCategory).items !== undefined;
  };

  return (
    <div className="flex h-screen w-screen relative bg-gray-50">
      <motion.div
        className={`fixed lg:relative left-0 z-50 top-0 h-full w-[250px] bg-white p-4 shadow-sm transition-transform duration-300 overflow-x-hidden 
                ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} no-horizontal-scrollbar`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <style>
          {`
            .no-horizontal-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-horizontal-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
        <div className="mb-8 mx-auto flex justify-center">
          <img src="/tagobitslogo.png" alt="logo" className="" />
        </div>
        <div className="space-y-1 max-h-[calc(100vh-150px)] overflow-y-auto pb-4">
          {navigationEntries.map((entry, i) => (
            isCategory(entry) ? (
              <div
                key={i}
                className="mb-2"
                onMouseEnter={() => window.innerWidth >= 1024 && setOpenCategory(entry.label)}
                onMouseLeave={() => window.innerWidth >= 1024 && setOpenCategory(null)}
              >
                <motion.div
                  className="flex items-center justify-between py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer transition-all"
                  onClick={() => handleCategoryToggle(entry.label)}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">{entry.label}</span>
                  <motion.div
                    animate={{ rotate: openCategory === entry.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TbMenu2 className="w-5 h-5" />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openCategory === entry.label ? 'auto' : 0,
                    opacity: openCategory === entry.label ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {entry.items.map((item, j) => (
                    <NavLink
                      to={item.href}
                      key={j}
                      end={item.href === '/control-center/dashboard'}
                      className={({ isActive }) =>
                        `flex gap-3 items-center py-3 px-4 rounded-lg transition-all cursor-pointer
                        ${isActive ? 'bg-primary-dark text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'}`
                      }
                      onClick={() => setShowSidebar(window.innerWidth >= 1024)}
                    >
                      <item.Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  ))}
                </motion.div>
              </div>
            ) : (
              <NavLink
                to={entry.href}
                key={i}
                end={entry.href === '/control-center/dashboard'}
                className={({ isActive }) =>
                  `flex gap-3 items-center py-3 px-4 rounded-lg transition-all cursor-pointer
                  ${isActive ? 'bg-primary-dark text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'}`
                }
                onClick={() => setShowSidebar(window.innerWidth >= 1024)}
              >
                <entry.Icon className="w-5 h-5" />
                <span className="font-medium">{entry.label}</span>
              </NavLink>
            )
          ))}
        </div>
        <motion.div
          onClick={logout}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-primary hover:text-primary-dark cursor-pointer transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BiLogOut className="text-xl" />
          <button className="py-2 px-2 font-medium">Logout</button>
        </motion.div>
      </motion.div>
      {showSidebar && (
        <motion.button
          onClick={() => setShowSidebar(false)}
          className="fixed top-4 z-50 left-4 lg:hidden duration-300 p-2 rounded-lg shadow-sm bg-white text-primary hover:bg-gray-50 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TbX size={24} />
        </motion.button>
      )}
      <motion.div
        className={`w-full transition-all p-6 duration-300 ${showSidebar ? 'lg:w-[calc(100%-250px)]' : 'lg:w-full'} h-screen overflow-auto`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 flex items-center lg:hidden">
          {!showSidebar && (
            <motion.button
              onClick={() => setShowSidebar(true)}
              className="text-primary hover:text-primary-dark cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TbMenu2 size={24} />
            </motion.button>
          )}
        </div>
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AdminLayout;