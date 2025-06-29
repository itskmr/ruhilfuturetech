import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Users, Eye, Trash2, Plus, Search, Filter, X } from 'lucide-react';
import axios from 'axios';

interface Job {
  id: number;
  job_title: string;
  department: string;
  job_type: string;
  location: string;
  salary_range: string;
  job_summary: string;
  experience_level: number;
  application_deadline: string;
  equal_opportunity_statement: string;
  how_to_apply: string;
  created_at: string;
}

const JobDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [deleteJobId, setDeleteJobId] = useState<number | null>(null); // State for delete confirmation modal

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('http://localhost:5000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((job) => {
      const isExpired = new Date(job.application_deadline) < new Date();
      if (activeFilter === 'all') return true;
      if (activeFilter === 'active') return !isExpired;
      return isExpired; // inactive filter
    });

  const activeJobsCount = jobs.filter((job) => new Date(job.application_deadline) > new Date()).length;
  const expiredJobsCount = jobs.length - activeJobsCount;

  const handleDeleteJob = async (jobId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
      setJobs((jobs) => jobs.filter((j) => j.id !== jobId));
      setDeleteJobId(null); // Close modal after deletion
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('Failed to delete job.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Gradient */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/hr"
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">HR Dashboard</span>
              </Link>
            </div>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs by title, department or location..."
                  className="w-full pl-10 pr-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-gray-800 placeholder-gray-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/hr/post-job"
                className="px-5 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all flex items-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Plus size={18} />
                <span className="font-medium">Post New Job</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Filter and Stats Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-800">Job Postings</h2>
              <div className="flex items-center space-x-4 bg-white rounded-lg p-2 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-700">Filter:</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      activeFilter === 'all' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All Jobs
                  </button>
                  <button
                    onClick={() => setActiveFilter('active')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      activeFilter === 'active' ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Active Only
                  </button>
                  <button
                    onClick={() => setActiveFilter('inactive')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      activeFilter === 'inactive' ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Inactive Only
                  </button>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredJobs.length}{' '}
              {activeFilter === 'active' ? 'active' : activeFilter === 'inactive' ? 'inactive' : ''} jobs{' '}
              {activeFilter === 'all' && ` (${activeJobsCount} active, ${expiredJobsCount} expired)`}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Total Jobs</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{jobs.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Briefcase className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Active Jobs</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{activeJobsCount}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Clock className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Departments</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {[...new Set(jobs.map((job) => job.department))].length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {jobs.length === 0 ? 'No jobs found' : 'No matching jobs'}
              </h3>
              <p className="text-gray-600 mb-6">
                {jobs.length === 0
                  ? 'No job postings available. Create your first job posting now.'
                  : activeFilter === 'active'
                  ? 'No active jobs match your search criteria.'
                  : activeFilter === 'inactive'
                  ? 'No inactive jobs match your search criteria.'
                  : 'Try adjusting your search to find what you\'re looking for.'}
              </p>
              <Link
                to="/hr/post-job"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <Plus size={18} className="mr-2" />
                {jobs.length === 0 ? 'Post Your First Job' : 'Create New Job'}
              </Link>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isExpired = new Date(job.application_deadline) < new Date();
              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 ${
                    isExpired ? 'border-gray-300' : 'border-blue-500'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="mt-1">
                          <Briefcase className={isExpired ? 'text-gray-400' : 'text-blue-500'} size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{job.job_title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{job.company || 'Ruhil Future Technologies'}</p>
                          {isExpired && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                              Expired
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-700">
                          <MapPin size={16} className={isExpired ? 'text-gray-400' : 'text-blue-500'} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Briefcase size={16} className={isExpired ? 'text-gray-400' : 'text-blue-500'} />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Clock size={16} className={isExpired ? 'text-gray-400' : 'text-blue-500'} />
                          <span className="capitalize">{job.job_type.toLowerCase()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                          <DollarSign size={16} className={isExpired ? 'text-gray-400' : 'text-blue-500'} />
                          <span>{job.salary_range}</span>
                        </div>
                      </div>

                      <p className={`mb-4 line-clamp-2 ${isExpired ? 'text-gray-500' : 'text-gray-600'}`}>
                        {job.job_summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className={`flex items-center space-x-1 ${isExpired ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span>Posted:</span>
                          <span className="font-medium">{new Date(job.created_at).toLocaleDateString()}</span>
                        </span>
                        <span className={`flex items-center space-x-1 ${isExpired ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span>Experience:</span>
                          <span className="font-medium">{job.experience_level} years</span>
                        </span>
                        <span className={`flex items-center space-x-1 ${isExpired ? 'text-red-500' : 'text-green-600'}`}>
                          <span>Deadline:</span>
                          <span className="font-medium">
                            {new Date(job.application_deadline).toLocaleDateString()}
                            {isExpired && ' (Expired)'}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                      <Link
                        to={`/hr/applied-jobs/${job.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-1"
                        title="View Job"
                      >
                        <Eye size={16} />
                        <span className="md:hidden">View</span>
                      </Link>
                      <button
                        onClick={() => setDeleteJobId(job.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-1"
                        title="Delete Job"
                      >
                        <Trash2 size={16} />
                        <span className="md:hidden">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteJobId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Confirm Delete</h3>
              <button
                onClick={() => setDeleteJobId(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the job "
              {jobs.find((job) => job.id === deleteJobId)?.job_title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteJobId(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteJob(deleteJobId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDashboard;