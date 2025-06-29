import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, ChevronLeft, ChevronRight, ArrowLeft, Mail, MapPin, FileText, Download, Eye } from 'lucide-react';

// Define TypeScript interfaces
interface Candidate {
  id: number;
  fullName: string;
  email: string;
  preferredRole: string;
  skills: string[];
  preferredLocations: string[];
  languages: string[];
  resumePath?: string;
  academicDocsPath?: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCandidates: number;
  limit: number;
}

interface Filters {
  email: string;
  fullName: string;
}

interface ApiResponse {
  data: Candidate[];
  pagination: Pagination;
}

const EnquiryDashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalCandidates: 0,
    limit: 10,
  });
  const [filters, setFilters] = useState<Filters>({ email: '', fullName: '' });
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const navigate = useNavigate();

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: pagination.currentPage,
        limit: pagination.limit,
        email: filters.email,
        fullName: filters.fullName,
      };
      if (startDate) params.createdAt_gte = new Date(startDate).toISOString();
      if (endDate) params.createdAt_lte = new Date(endDate).toISOString();

      console.log('Fetching candidates with params:', params);

      const response = await axios.get<ApiResponse>('http://localhost:5000/api/candidates', {
        params,
        // Comment out Cache-Control to avoid CORS preflight issues
        // headers: {
        //   'Cache-Control': 'no-cache',
        // },
      });

      console.log('API response:', response.data);

      setCandidates(response.data.data);
      setPagination(response.data.pagination);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching candidates:', err);
      const errorMessage = err.response?.data?.error
        ? typeof err.response.data.error === 'string'
          ? err.response.data.error
          : JSON.stringify(err.response.data.error)
        : 'Failed to fetch candidates';
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
    // Optional: Add debouncing if needed (requires lodash.debounce)
    // import { debounce } from 'lodash';
    // const debouncedFetchCandidates = debounce(fetchCandidates, 500);
    // debouncedFetchCandidates();
    // return () => debouncedFetchCandidates.cancel();
  }, [pagination.currentPage, filters, startDate, endDate]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') setStartDate(value);
    if (type === 'end') setEndDate(value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleViewMore = (candidateId: number) => {
    navigate(`/hr/candidate/${candidateId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600">{error || 'An error occurred'}</h2>
          <Link
            to="/hr"
            className="mt-4 flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Back to HR Dashboard"
          >
            <ArrowLeft size={20} />
            <span>Back to HR Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/hr"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Back to HR Dashboard"
              >
                <ArrowLeft size={20} />
                <span>Back to HR Dashboard</span>
              </Link>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900">Candidate Enquiries</h1>
              <p className="text-gray-600">View all candidate enquiries and applications</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{pagination.totalCandidates}</p>
              </div>
              <User className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Page</p>
                <p className="text-2xl font-bold text-green-600">{pagination.currentPage}</p>
              </div>
              <FileText className="text-green-500" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Pages</p>
                <p className="text-2xl font-bold text-purple-600">{pagination.totalPages}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Candidates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Filter by Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={filters.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('email', e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email..."
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Filter by Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={filters.fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('fullName', e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter name..."
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                max={endDate || undefined}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={startDate || undefined}
              />
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-6">
          {candidates.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <User className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
              <p className="text-gray-600">No candidates match your current filters.</p>
            </div>
          ) : (
            candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <User className="text-blue-600" size={20} />
                      <h3 className="text-xl font-semibold text-gray-900">{candidate.fullName}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        ID: {candidate.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail size={16} />
                        <span>{candidate.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin size={16} />
                        <span>{candidate.preferredLocations.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FileText size={16} />
                        <span>{candidate.preferredRole}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-600 mb-2">
                        <strong>Skills:</strong> {candidate.skills.join(', ')}
                      </p>
                      <p className="text-gray-600">
                        <strong>Languages:</strong> {candidate.languages.join(', ')}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {candidate.resumePath && (
                        <a
                          href={candidate.resumePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition-colors"
                        >
                          <Download size={14} />
                          <span>Resume</span>
                        </a>
                      )}
                      {candidate.academicDocsPath && (
                        <a
                          href={candidate.academicDocsPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                        >
                          <FileText size={14} />
                          <span>Academic Docs</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-6">
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleViewMore(candidate.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedCandidate.fullName}</h2>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Email:</strong> {selectedCandidate.email}
                    </div>
                    <div>
                      <strong>ID:</strong> {selectedCandidate.id}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Professional Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Preferred Role:</strong> {selectedCandidate.preferredRole}
                    </div>
                    <div>
                      <strong>Preferred Locations:</strong>{' '}
                      {selectedCandidate.preferredLocations.join(', ')}
                    </div>
                    <div>
                      <strong>Languages:</strong> {selectedCandidate.languages.join(', ')}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t">
                  {selectedCandidate.resumePath && (
                    <a
                      href={selectedCandidate.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Download size={16} />
                      <span>View Resume</span>
                    </a>
                  )}
                  {selectedCandidate.academicDocsPath && (
                    <a
                      href={selectedCandidate.academicDocsPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <FileText size={16} />
                      <span>View Academic Docs</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryDashboard;