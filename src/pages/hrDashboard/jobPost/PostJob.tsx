import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Users, Send, Plus, X, Check } from 'lucide-react';

const PostJob = () => {
  const [formData, setFormData] = useState({
    job_title: '',
    company: 'Ruhil Future Technologies',
    department: '',
    job_type: 'Full-time',
    location: '',
    salary_range: '',
    job_summary: '',
    experience_level: '',
    application_deadline: '',
    equal_opportunity_statement: '',
    how_to_apply: '',
    responsibilities: [''],
    required_qualifications: [''],
    preferred_skills: [''],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          responsibilities: formData.responsibilities.filter(item => item.trim() !== ''),
          required_qualifications: formData.required_qualifications.filter(item => item.trim() !== ''),
          preferred_skills: formData.preferred_skills.filter(item => item.trim() !== ''),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post job');
      }

      setPopupMessage('Job posted successfully!');
      setShowPopup(true);
      setFormData({
        job_title: '',
        company: 'Ruhil Future Technologies',
        department: '',
        job_type: 'Full-time',
        location: '',
        salary_range: '',
        job_summary: '',
        experience_level: '',
        application_deadline: '',
        equal_opportunity_statement: '',
        how_to_apply: '',
        responsibilities: [''],
        required_qualifications: [''],
        preferred_skills: [''],
      });
    } catch (error) {
      setPopupMessage('Failed to post job: ' + error.message);
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300">
          <div className={`bg-white rounded-xl shadow-2xl p-6 max-w-md w-full transform transition-all duration-300 ${showPopup ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
                {popupMessage.includes('successfully') ? (
                  <Check className="w-8 h-8 text-green-600" />
                ) : (
                  <X className="w-8 h-8 text-red-600" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {popupMessage.includes('successfully') ? 'Success!' : 'Oops!'}
              </h3>
              <p className="text-gray-600 mb-6">{popupMessage}</p>
              <button
                onClick={closePopup}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${popupMessage.includes('successfully') ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with Gradient */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/hr"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">HR Dashboard</span>
            </Link>
            <div className="text-right text-white">
              <h1 className="text-3xl font-bold">Post New Job</h1>
              <p className="text-blue-100">Create exciting opportunities for your team</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Card with Floating Effect */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <Briefcase className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Job Details</h2>
                  <p className="text-blue-600">Fill in the details for your new position</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Basic Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Job Title *</label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Senior React Developer"
                  />
                </div>

                {/* Department */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Location *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="text-gray-400" size={20} />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Rohtak, Haryana"
                    />
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Job Type *</label>
                  <select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                {/* Salary Range */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Salary Range</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="text-gray-400" size={20} />
                    </div>
                    <input
                      type="text"
                      name="salary_range"
                      value={formData.salary_range}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., ₹5-7 LPA"
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Experience (Years)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="text-gray-400" size={20} />
                    </div>
                    <input
                      type="number"
                      name="experience_level"
                      value={formData.experience_level}
                      onChange={handleChange}
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 3"
                    />
                  </div>
                </div>

                {/* Application Deadline */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Deadline</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="application_deadline"
                      value={formData.application_deadline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Job Summary */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Job Summary *</label>
                <textarea
                  name="job_summary"
                  value={formData.job_summary}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                />
              </div>

              {/* Dynamic Fields Section */}
              <div className="space-y-6">
                {/* Responsibilities */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Responsibilities</label>
                  <div className="space-y-3">
                    {formData.responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={responsibility}
                            onChange={(e) => handleArrayChange(index, 'responsibilities', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder={`Responsibility ${index + 1}`}
                          />
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 font-bold">{index + 1}.</span>
                        </div>
                        {formData.responsibilities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('responsibilities', index)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove responsibility"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('responsibilities')}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors mt-2"
                    >
                      <Plus size={16} />
                      <span>Add Responsibility</span>
                    </button>
                  </div>
                </div>

                {/* Required Qualifications */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Required Qualifications</label>
                  <div className="space-y-3">
                    {formData.required_qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={qualification}
                            onChange={(e) => handleArrayChange(index, 'required_qualifications', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder={`Qualification ${index + 1}`}
                          />
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 font-bold">{index + 1}.</span>
                        </div>
                        {formData.required_qualifications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('required_qualifications', index)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove qualification"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('required_qualifications')}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors mt-2"
                    >
                      <Plus size={16} />
                      <span>Add Qualification</span>
                    </button>
                  </div>
                </div>

                {/* Preferred Skills */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Preferred Skills</label>
                  <div className="space-y-3">
                    {formData.preferred_skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleArrayChange(index, 'preferred_skills', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder={`Skill ${index + 1}`}
                          />
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 font-bold">{index + 1}.</span>
                        </div>
                        {formData.preferred_skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('preferred_skills', index)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove skill"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('preferred_skills')}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors mt-2"
                    >
                      <Plus size={16} />
                      <span>Add Skill</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Equal Opportunity */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">Equal Opportunity Statement</label>
                <textarea
                  name="equal_opportunity_statement"
                  value={formData.equal_opportunity_statement}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Our company is an equal opportunity employer..."
                />
              </div>

              {/* How to Apply */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">How to Apply</label>
                <textarea
                  name="how_to_apply"
                  value={formData.how_to_apply}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Provide application instructions or link..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
                <Link
                  to="/hr"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Posting...' : 'Post Job'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;