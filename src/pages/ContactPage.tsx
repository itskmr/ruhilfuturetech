import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, Send, Phone, MessageSquare, MapPin, Building, Calendar, FileText, CheckCircle, ChevronLeft, ChevronRight, Upload, GraduationCap, Briefcase, Globe, Layers, ListChecks, ClipboardCheck, FilePlus, LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config/api';

// --- User Interface ---
interface User {
  name: string;
  email: string;
}

// --- AuthModal ---
const AuthModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}> = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!isLoginMode) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (isLoginMode) {
        onLogin(formData.email, formData.password);
      } else {
        onSignup(formData.name, formData.email, formData.password);
      }
      onClose();
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLoginMode ? 'Sign in to submit your queries' : 'Join us to get started'}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Create Account')}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setErrors({});
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                {isLoginMode ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Header ---
const Header: React.FC<{
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
}> = ({ user, onAuthClick, onLogout }) => (
  <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <img
                src="/logo1.jpg"
                alt="Ruhil Future Technologies Logo"
                className="w-12 h-12 object-contain rounded-full border-4 border-blue-600 bg-white shadow-md"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 ml-3">Ruhil Future Technologies</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="text-blue-600" size={16} />
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  </header>
);

// --- ContactForm ---
interface ContactFormProps {
  user: { name: string; email: string } | null;
}

const initialFormData = {
  fullName: '',
  dob: '',
  gender: '',
  mobile: '',
  altMobile: '',
  email: '',
  currentCity: '',
  homeTown: '',
  willingToRelocate: '',
  qualification: '',
  course: '',
  college: '',
  affiliatedUniv: '',
  graduationYear: '',
  marks: '',
  allSemCleared: '',
  techSkills: [] as string[],
  otherTechSkills: '',
  certifications: '',
  hasInternship: '',
  projectDesc: '',
  github: '',
  linkedin: '',
  preferredRole: '',
  preferredLocations: [] as string[],
  joining: '',
  shifts: '',
  expectedCTC: '',
  source: '',
  onlineTest: '',
  laptop: '',
  resume: null as File | null,
  academics: null as File | null,
  languages: [] as string[],
  aadhar: '',
  pan: '',
  passport: '',
  agree: false,
};

const steps = [
  'Personal Details',
  'Location Details',
  'Education',
  'Skills',
  'Experience',
  'Preferences',
  'General',
  'Documents',
  'Declaration',
];

const techSkillOptions = [
  'Python', 'Java', 'C++', 'JavaScript', 'Web Development', 'SQL/Databases',
  'Data Structures & Algorithms', 'Cloud/DevOps', 'Machine Learning/AI', 'Cybersecurity', 'Others'
];
const qualificationOptions = [
  'Diploma', 'B.Tech', 'B.Sc', 'B.Com', 'BA', 'M.Tech', 'M.Sc', 'MBA', 'Others'
];
const genderOptions = ['Male', 'Female', 'Other'];
const yesNoOptions = ['Yes', 'No'];
const shiftOptions = ['Yes', 'No'];
const joiningOptions = ['Yes', 'No', 'Notice Period'];
const locationOptions = [
  'Rohtak', 'Gurgaon', 'North India', 'East India', 'Central India', 'West India', 'South India', 'All over India'

];
const languageOptions = [
  'English', 'Hindi'
];

const ContactForm: React.FC<ContactFormProps> = ({ user }) => {
  const [formData, setFormData] = useState<
    typeof initialFormData & { [key: string]: any }
  >({
    ...initialFormData,
    fullName: user?.name || '',
    email: user?.email || '',
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let loaded = { ...initialFormData };
    if (user && user.email) {
      const saved = localStorage.getItem(`formData_${user.email}`);
      if (saved) {
        loaded = { ...loaded, ...JSON.parse(saved) };
      }
      loaded.fullName = user.name;
      loaded.email = user.email;
    }
    setFormData(loaded);
  }, [user]);

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`formData_${user.email}`,
        JSON.stringify({ ...formData, resume: undefined, academics: undefined })
      );
    }
  }, [formData, user]);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.dob) newErrors.dob = 'Date of Birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile Number is required';
      if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Enter valid 10-digit number';
      if (formData.altMobile && !/^\d{10}$/.test(formData.altMobile)) newErrors.altMobile = 'Enter valid 10-digit number';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    }
    if (step === 1) {
      if (!formData.currentCity.trim()) newErrors.currentCity = 'Current City is required';
      if (!formData.homeTown.trim()) newErrors.homeTown = 'Home Town is required';
      if (!formData.willingToRelocate) newErrors.willingToRelocate = 'This field is required';
    }
    if (step === 2) {
      if (!formData.qualification) newErrors.qualification = 'Qualification is required';
      if (!formData.course.trim()) newErrors.course = 'Course Name is required';
      if (!formData.college.trim()) newErrors.college = 'College/University is required';
      if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Year of Passing is required';
      else if (!/^\d{4}$/.test(formData.graduationYear) || parseInt(formData.graduationYear) < 1050 || parseInt(formData.graduationYear) > 2025)
        newErrors.graduationYear = 'Year must be between 1050 and 2025';
      if (!formData.marks.trim()) newErrors.marks = 'Aggregate Marks/CGPA is required';
      else if (!/^\d{1,2}(\.\d{1,2})?$/.test(formData.marks) || parseFloat(formData.marks) < 0 || parseFloat(formData.marks) > 100)
        newErrors.marks = 'Marks must be between 0 and 100';
      if (!formData.allSemCleared) newErrors.allSemCleared = 'This field is required';
    }
    if (step === 3) {
      if (formData.techSkills.length === 0) newErrors.techSkills = 'Select at least one skill';
    }
    if (step === 4) {
      if (!formData.hasInternship) newErrors.hasInternship = 'This field is required';
      if (formData.hasInternship === 'Yes' && !formData.projectDesc.trim()) newErrors.projectDesc = 'Description required';
    }
    if (step === 5) {
      if (!formData.preferredRole.trim()) newErrors.preferredRole = 'Preferred Role is required';
      if (formData.preferredLocations.length === 0) newErrors.preferredLocations = 'Select at least one location';
      if (!formData.joining) newErrors.joining = 'This field is required';
      if (!formData.shifts) newErrors.shifts = 'This field is required';
      if (formData.expectedCTC && (!/^\d+$/.test(formData.expectedCTC) || parseInt(formData.expectedCTC) < 0 || parseInt(formData.expectedCTC) > 10000000))
        newErrors.expectedCTC = 'CTC must be an integer between 0 and 1,00,00,000';
    }
    if (step === 6) {
      if (!formData.source.trim()) newErrors.source = 'This field is required';
      if (!formData.onlineTest) newErrors.onlineTest = 'This field is required';
      if (!formData.laptop) newErrors.laptop = 'This field is required';
      if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) newErrors.aadhar = 'Aadhar must be 12 digits';
      if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) newErrors.pan = 'PAN must be 10 characters (e.g., ABCDE1234F)';
      if (formData.passport && !/^[A-Z0-9]{8,9}$/i.test(formData.passport)) newErrors.passport = 'Passport should be 8-9 alphanumeric characters';
    }
    if (step === 7) {
      if (!formData.resume) newErrors.resume = 'Resume is required';
    }
    if (step === 8) {
      if (!formData.agree) newErrors.agree = 'You must agree to the declaration';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => s - 1);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSubmitted(false);
    navigate('/');
    setFormData({ ...initialFormData, fullName: user?.name || '', email: user?.email || '' });
    setStep(0);
    if (user && user.email) {
      localStorage.removeItem(`formData_${user.email}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      if (formData.resume) formDataToSend.append('resume', formData.resume);
      if (formData.academics) formDataToSend.append('academics', formData.academics);
      const { resume, academics, ...fieldsToSend } = formData;
      formDataToSend.append('data', JSON.stringify(fieldsToSend));
      const response = await axios.post(getApiUrl('/upload'), formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitted(true);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        handleClosePopup();
      }, 3000);
    } catch (error) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      console.error('Submission error:', error);
      alert('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && !showPopup) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="text-green-600" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Form Submitted Successfully!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your enquiry. We will get back to you soon.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(0);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Fill Another Form
        </button>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><User className="mr-2" />Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-900">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="As per Aadhaar or ID"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={e => handleInputChange('dob', e.target.value)}
                  max="2020-12-31"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={e => handleInputChange('gender', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                >
                  <option value="">Select</option>
                  {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Mobile Number *</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                    handleInputChange('mobile', value);
                  }}
                  onKeyDown={e => {
                    if (formData.mobile.length >= 10 && e.key !== 'Backspace' && e.key !== 'Tab') {
                      e.preventDefault();
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="Primary Mobile"
                  maxLength={10}
                />
                {formData.mobile.length === 10 && (
                  <p className="text-yellow-500 text-sm mt-1" aria-live="polite">Maximum 10 digits allowed</p>
                )}
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Alternate Contact Number</label>
                <input
                  type="tel"
                  value={formData.altMobile}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                    handleInputChange('altMobile', value);
                  }}
                  onKeyDown={e => {
                    if (formData.altMobile.length >= 10 && e.key !== 'Backspace' && e.key !== 'Tab') {
                      e.preventDefault();
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="Optional"
                  maxLength={10}
                />
                {formData.altMobile.length === 10 && (
                  <p className="text-yellow-500 text-sm mt-1" aria-live="polite">Maximum 10 digits allowed</p>
                )}
                {errors.altMobile && <p className="text-red-500 text-sm">{errors.altMobile}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="Official / Personal"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><MapPin className="mr-2" />Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-900">Current City *</label>
                <input
                  type="text"
                  value={formData.currentCity}
                  onChange={e => handleInputChange('currentCity', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                />
                {errors.currentCity && <p className="text-red-500 text-sm">{errors.currentCity}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Home Town / Permanent Address *</label>
                <input
                  type="text"
                  value={formData.homeTown}
                  onChange={e => handleInputChange('homeTown', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                />
                {errors.homeTown && <p className="text-red-500 text-sm">{errors.homeTown}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Willing to Relocate? *</label>
                <select
                  value={formData.willingToRelocate}
                  onChange={e => handleInputChange('willingToRelocate', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.willingToRelocate && <p className="text-red-500 text-sm">{errors.willingToRelocate}</p>}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><GraduationCap className="mr-2" />Educational Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-900">Highest Qualification *</label>
                <select
                  value={formData.qualification}
                  onChange={e => handleInputChange('qualification', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                >
                  <option value="">Select</option>
                  {qualificationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Course Name & Specialization *</label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={e => handleInputChange('course', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                />
                {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">College/Institute Name *</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={e => handleInputChange('college', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                />
                {errors.college && <p className="text-red-500 text-sm">{errors.college}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Affiliated University (if applicable)</label>
                <input
                  type="text"
                  value={formData.affiliatedUniv}
                  onChange={e => handleInputChange('affiliatedUniv', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Year of Passing / Expected Graduation *</label>
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                    handleInputChange('graduationYear', value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="YYYY"
                  maxLength={4}
                />
                {errors.graduationYear && <p className="text-red-500 text-sm">{errors.graduationYear}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Aggregate Marks / CGPA (Till Now) *</label>
                <input
                  type="text"
                  value={formData.marks}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    handleInputChange('marks', value);
                  }}
                  onBlur={() => {
                    if (formData.marks && (!/^\d{1,2}(\.\d{1,2})?$/.test(formData.marks) || parseFloat(formData.marks) < 0 || parseFloat(formData.marks) > 100)) {
                      setErrors(prev => ({ ...prev, marks: 'Marks must be between 0 and 100' }));
                    } else if (errors.marks) {
                      setErrors(prev => ({ ...prev, marks: '' }));
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="e.g., 85 or 8.5"
                />
                {errors.marks && <p className="text-red-500 text-sm">{errors.marks}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Are all semesters cleared? *</label>
                <select
                  value={formData.allSemCleared}
                  onChange={e => handleInputChange('allSemCleared', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                >
                  <option value="">Select</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.allSemCleared && <p className="text-red-500 text-sm">{errors.allSemCleared}</p>}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><Layers className="mr-2" />Technical / Domain Skills</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-900">Which technical skills do you possess? *</label>
              <div className="flex flex-wrap gap-3">
                {techSkillOptions.map(skill => (
                  <label key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.techSkills.includes(skill)}
                      onChange={() => handleCheckboxChange('techSkills', skill)}
                      className="accent-blue-600"
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
              {errors.techSkills && <p className="text-red-500 text-sm">{errors.techSkills}</p>}
            </div>
            {formData.techSkills.includes('Others') && (
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-900">Other Technical Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.otherTechSkills}
                  onChange={e => handleInputChange('otherTechSkills', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="e.g., TypeScript, React Native, AWS"
                />
              </div>
            )}
            <div>
              <label className="block mb-1 font-medium text-gray-900">Any certification courses completed? (Optional)</label>
              <input
                type="text"
                value={formData.certifications}
                onChange={e => handleInputChange('certifications', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><Briefcase className="mr-2" />Internship or Project Experience</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-900">Have you done any internship or major project? *</label>
              <select
                value={formData.hasInternship}
                onChange={e => handleInputChange('hasInternship', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
              >
                <option value="">Select</option>
                {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {errors.hasInternship && <p className="text-red-500 text-sm">{errors.hasInternship}</p>}
            </div>
            {formData.hasInternship === 'Yes' && (
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-900">Brief Description of Project / Internship *</label>
                <textarea
                  value={formData.projectDesc}
                  onChange={e => handleInputChange('projectDesc', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  rows={4}
                />
                {errors.projectDesc && <p className="text-red-500 text-sm">{errors.projectDesc}</p>}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-900">GitHub Profile (Optional)</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={e => handleInputChange('github', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">LinkedIn Profile (Optional)</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={e => handleInputChange('linkedin', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><ClipboardCheck className="mr-2" />Job Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-900">Preferred Role / Function Area *</label>
                <input
                  type="text"
                  value={formData.preferredRole}
                  onChange={e => handleInputChange('preferredRole', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="e.g., Software Developer"
                />
                {errors.preferredRole && <p className="text-red-500 text-sm">{errors.preferredRole}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Preferred Job Location(s) *</label>
                <div className="flex flex-wrap gap-3">
                  {locationOptions.map(loc => (
                    <label key={loc} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.preferredLocations.includes(loc)}
                        onChange={() => handleCheckboxChange('preferredLocations', loc)}
                        className="accent-blue-600"
                      />
                      <span>{loc}</span>
                    </label>
                  ))}
                </div>
                {errors.preferredLocations && <p className="text-red-500 text-sm">{errors.preferredLocations}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Immediate Joining Availability? *</label>
                <select
                  value={formData.joining}
                  onChange={e => handleInputChange('joining', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                >
                  <option value="">Select</option>
                  {joiningOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.joining && <p className="text-red-500 text-sm">{errors.joining}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Open to work in rotational/night shifts? *</label>
                <select
                  value={formData.shifts}
                  onChange={e => handleInputChange('shifts', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                >
                  <option value="">Select</option>
                  {shiftOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.shifts && <p className="text-red-500 text-sm">{errors.shifts}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Expected CTC (if applicable)</label>
                <input
                  type="text"
                  value={formData.expectedCTC}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
                    handleInputChange('expectedCTC', value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="e.g., 500000"
                />
                {errors.expectedCTC && <p className="text-red-500 text-sm">{errors.expectedCTC}</p>}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><ListChecks className="mr-2" />General Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-900">How did you hear about this opportunity? *</label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={e => handleInputChange('source', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                />
                {errors.source && <p className="text-red-500 text-sm">{errors.source}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Are you available for online tests and interviews? *</label>
                <select
                  value={formData.onlineTest}
                  onChange={e => handleInputChange('onlineTest', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                >
                  <option value="">Select</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.onlineTest && <p className="text-red-500 text-sm">{errors.onlineTest}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Do you have a working laptop and stable internet connection? *</label>
                <select
                  value={formData.laptop}
                  onChange={e => handleInputChange('laptop', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                >
                  <option value="">Select</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.laptop && <p className="text-red-500 text-sm">{errors.laptop}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Languages Known (Optional)</label>
                <div className="flex flex-wrap gap-3">
                  {languageOptions.map(lang => (
                    <label key={lang} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(lang)}
                        onChange={() => handleCheckboxChange('languages', lang)}
                        className="accent-blue-600"
                      />
                      <span>{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Aadhar Number (Optional)</label>
                <input
                  type="text"
                  value={formData.aadhar}
                  onChange={e => handleInputChange('aadhar', e.target.value.replace(/[^0-9]/g, '').slice(0, 12))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="12-digit Aadhar"
                  maxLength={12}
                />
                {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">PAN Number (Optional)</label>
                <input
                  type="text"
                  value={formData.pan}
                  onChange={e => handleInputChange('pan', e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 10))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
                {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-900">Passport Number (Optional)</label>
                <input
                  type="text"
                  value={formData.passport}
                  onChange={e => handleInputChange('passport', e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 9))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
                  placeholder="8-9 alphanumeric"
                  maxLength={9}
                />
                {errors.passport && <p className="text-red-500 text-sm">{errors.passport}</p>}
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><FilePlus className="mr-2" />Resume & Documents</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-900">Upload Resume (PDF) *</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={e => handleFileChange('resume', e.target.files ? e.target.files[0] : null)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-900">Upload Academic Documents (Optional, PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={e => handleFileChange('academics', e.target.files ? e.target.files[0] : null)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        );
      case 8:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center"><CheckCircle className="mr-2" />Declaration</h2>
            <div className="mb-4">
              <p className="mb-2">“I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that any misrepresentation may lead to disqualification.”</p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={e => handleInputChange('agree', e.target.checked)}
                  className="accent-blue-600"
                />
                <span>I agree to be contacted via phone, WhatsApp, and email regarding this hiring process.</span>
              </label>
              {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-xl shadow-2xl z-50 text-lg font-semibold flex items-center animate-bounce">
          <span>🎉 Your form was submitted successfully!</span>
          <button
            onClick={handleClosePopup}
            className="ml-4 p-1 bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label="Close popup"
          >
            <X size={20} />
          </button>
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-gray-900">Enquiry Form</h2>
            <span className="text-gray-500">Step {step + 1} of {steps.length}</span>
          </div>
          <div className="flex space-x-2 mb-6">
            {steps.map((s, i) => (
              <div key={s} className={`flex-1 h-2 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {renderStep()}
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button 
                type="button" 
                onClick={handleBack} 
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="mr-2" /> Back
              </button>
            )}
            <div className="flex-1"></div>
            {step < steps.length - 1 && (
              <button 
                type="button" 
                onClick={handleNext} 
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors ml-auto disabled:opacity-50"
              >
                Next <ChevronRight className="ml-2" />
              </button>
            )}
            {step === steps.length - 1 && (
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors ml-auto disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" /> Submit
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

// --- ContactPage ---
const ContactPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    const newUser = { name: 'John Doe', email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    setSuccessMessage('Successfully signed in!');
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    setSuccessMessage('Account created and signed in!');
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Candidate Enquiry Form
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please fill out the form below to submit your enquiry.
          </p>
        </div>
        <ContactForm user={user} />
      </main>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
      {showSuccessPopup && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all animate-bounce">
          {successMessage}
        </div>
      )}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 Ruhil Future Technologies. All rights reserved. Ready to innovate?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Let's Connect
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;