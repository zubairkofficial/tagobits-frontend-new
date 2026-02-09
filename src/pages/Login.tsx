import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../helper/axios';
import signupImage from '/tagobit-image.jpg';
import { Loader } from '../components/Loader';
import { motion } from 'framer-motion';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import ReCaptcha from '../components/ReCaptcha';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      !errors.email &&
      !errors.password;

    setFormValid(isValid);
  }, [formData, errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email is required.';
      } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
        errorMsg = 'Please enter a valid email address.';
      }
    }
    if (name === 'password') {
      if (!value.trim()) {
        errorMsg = 'Password is required.';
      } else if (value.length < 6) {
        errorMsg = 'Password must be at least 6 characters long.';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateField('email', formData.email);
    validateField('password', formData.password);
    if (!formValid) return;

    setStatus(true);
    try {
      const response = await axiosInstance.post('/signin', formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      setFormData({ email: '', password: '' });
      if (user.role === 'ticket_handler') {
        navigate('/control-center/tickets');
      } else if (user.role === 'admin') {
        navigate('/control-center/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        password: err.response?.data?.detail || 'Login failed',
      }));
    } finally {
      setStatus(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="mx-auto flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row"
      >
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-center text-primary">Welcome Back</h2>
              <p className="text-center text-gray-500 mt-2">Sign in to your account</p>
            </motion.div>
            <motion.form onSubmit={handleSubmit} variants={containerVariants} className="space-y-5">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-10`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoMdEye size={18} /> : <IoMdEyeOff size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </motion.div>
              <motion.div variants={itemVariants}>
                <ReCaptcha onVerify={setIsCaptchaVerified} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={!formValid || status}
                  className={`w-full px-4 py-3 text-white font-semibold rounded-lg shadow-sm transition-all ${formValid ? 'bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
                    } flex items-center justify-center`}
                >
                  {status ? <Loader /> : 'Sign In'}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10"></div>
          <img src={signupImage} alt="Login" className="w-full h-full object-cover" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Login as an admin</h3>
            <p className="text-white/90">Manage and customize TogoCash</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;