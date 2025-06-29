import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define TypeScript interface for Candidate
interface Candidate {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  alternateContactNumber?: string;
  currentCity: string;
  homeTown: string;
  dateOfBirth: string;
  gender: string;
  willingToRelocate: boolean;
  preferredLocations: string[];
  languages: string[];
  linkedinLink?: string;
  githubLink?: string;
  resumePath?: string;
  academicDocsPath?: string;
  highestQualification: string;
  courseName: string;
  collegeUniversity: string;
  affiliatedUniversity: string;
  yearOfPassing: number;
  aggregateMarks: number;
  allSemestersCleared: boolean;
  skills: string[];
  internshipProjectExperience: boolean;
  projectDescription?: string;
  preferredRole: string;
  expectedCTC?: number;
  immediateJoining: boolean;
  openToShifts: boolean;
  opportunitySource: string;
  availableForOnlineTests: boolean;
  hasLaptopInternet: boolean;
  aadharNumber?: string;
  panNo?: string;
  passportAvailable: boolean;
  certificateName?: string;
}

// Define interface for API response
interface ApiResponse {
  success: boolean;
  data: Candidate;
}

const CandidateDetail: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!candidateId) {
      setError('No candidate ID provided in the URL.');
      setLoading(false);
      return;
    }
    const fetchCandidate = async () => {
      try {
        const response = await axios.get<ApiResponse>(`http://localhost:5000/api/candidates/${candidateId}`);
        if (response.data.success) {
          setCandidate(response.data.data);
          setLoading(false);
        } else {
          setError('Candidate not found');
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch candidate');
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [candidateId]);

  // Function to handle all external link clicks
  const handleExternalLinkClick = (url: string | undefined) => {
    if (!url) return;

    // Ensure the link has https:// prefix
    let formattedUrl = url;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto my-8 text-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <h2 className="text-2xl font-bold">{error}</h2>
        </div>
        <button
          onClick={() => navigate('/hr/enquiry')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
        >
          Back to Candidates List
        </button>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto my-8 text-center">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <h2 className="text-2xl font-bold">No candidate found</h2>
        </div>
        <button
          onClick={() => navigate('/hr/enquiry')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
        >
          Back to Candidates List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{candidate.fullName}</h1>
              <p className="text-blue-100 mt-1">{candidate.preferredRole}</p>
            </div>
            <span className="bg-white text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              ID: {candidateId}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Contact & Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-gray-700">Email:</span> {candidate.email}</p>
                <p><span className="font-medium text-gray-700">Mobile:</span> {candidate.mobileNumber}</p>
                <p><span className="font-medium text-gray-700">Alternate Contact:</span> {candidate.alternateContactNumber || 'N/A'}</p>
                <p><span className="font-medium text-gray-700">Current City:</span> {candidate.currentCity}</p>
                <p><span className="font-medium text-gray-700">Home Town:</span> {candidate.homeTown}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Personal Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-gray-700">Date of Birth:</span> {new Date(candidate.dateOfBirth).toLocaleDateString()}</p>
                <p><span className="font-medium text-gray-700">Gender:</span> {candidate.gender}</p>
                <p><span className="font-medium text-gray-700">Willing to Relocate:</span> {candidate.willingToRelocate ? 'Yes' : 'No'}</p>
                <p><span className="font-medium text-gray-700">Preferred Locations:</span> {candidate.preferredLocations.join(', ')}</p>
                <p><span className="font-medium text-gray-700">Languages:</span> {candidate.languages.join(', ')}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Professional Links</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-700">LinkedIn:</span>
                  {candidate.linkedinLink ? (
                    <button
                      onClick={() => handleExternalLinkClick(candidate.linkedinLink)}
                      className="text-blue-600 hover:underline ml-2 bg-transparent border-none cursor-pointer p-0"
                    >
                      View Profile
                    </button>
                  ) : (
                    'N/A'
                  )}
                </p>
                <p>
                  <span className="font-medium text-gray-700">GitHub:</span>
                  {candidate.githubLink ? (
                    <button
                      onClick={() => handleExternalLinkClick(candidate.githubLink)}
                      className="text-blue-600 hover:underline ml-2 bg-transparent border-none cursor-pointer p-0"
                    >
                      View Profile
                    </button>
                  ) : (
                    'N/A'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="font-medium text-gray-700">Resume:</span>
                  {candidate.resumePath ? (
                    <button
                      onClick={() => handleExternalLinkClick(candidate.resumePath)}
                      className="text-blue-600 hover:underline ml-2 bg-transparent border-none cursor-pointer p-0"
                    >
                      Download Resume
                    </button>
                  ) : (
                    'N/A'
                  )}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium text-gray-700">Academic Documents:</span>
                  {candidate.academicDocsPath ? (
                    <button
                      onClick={() => handleExternalLinkClick(candidate.academicDocsPath)}
                      className="text-blue-600 hover:underline ml-2 bg-transparent border-none cursor-pointer p-0"
                    >
                      View Documents
                    </button>
                  ) : (
                    'N/A'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Education & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Education Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-gray-700">Highest Qualification:</span> {candidate.highestQualification}</p>
                <p><span className="font-medium text-gray-700">Course:</span> {candidate.courseName}</p>
                <p><span className="font-medium text-gray-700">College/University:</span> {candidate.collegeUniversity}</p>
                <p><span className="font-medium text-gray-700">Affiliated University:</span> {candidate.affiliatedUniversity}</p>
                <p><span className="font-medium text-gray-700">Year of Passing:</span> {candidate.yearOfPassing}</p>
                <p><span className="font-medium text-gray-700">Aggregate Marks:</span> {candidate.aggregateMarks}%</p>
                <p><span className="font-medium text-gray-700">All Semesters Cleared:</span> {candidate.allSemestersCleared ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Skills & Experience</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-700">Skills:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {candidate.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Project Experience:</span>{' '}
                  {candidate.internshipProjectExperience ? 'Yes' : 'No'}
                </p>
                {candidate.projectDescription && (
                  <p>
                    <span className="font-medium text-gray-700">Project Description:</span>{' '}
                    {candidate.projectDescription}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Job Preferences & Other Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Job Preferences</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-gray-700">Preferred Role:</span> {candidate.preferredRole}</p>
                <p><span className="font-medium text-gray-700">Expected CTC:</span> ₹{candidate.expectedCTC || 'N/A'}</p>
                <p><span className="font-medium text-gray-700">Immediate Joining:</span> {candidate.immediateJoining ? 'Yes' : 'No'}</p>
                <p><span className="font-medium text-gray-700">Open to Shifts:</span> {candidate.openToShifts ? 'Yes' : 'No'}</p>
                <p><span className="font-medium text-gray-700">Opportunity Source:</span> {candidate.opportunitySource}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Other Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-gray-700">Available for Online Tests:</span> {candidate.availableForOnlineTests ? 'Yes' : 'No'}</p>
                <p><span className="font-medium text-gray-700">Has Laptop/Internet:</span> {candidate.hasLaptopInternet ? 'Yes' : 'No'}</p>
                <p><span className="font-medium text-gray-700">Aadhar Number:</span> {candidate.aadharNumber || 'N/A'}</p>
                <p><span className="font-medium text-gray-700">PAN Number:</span> {candidate.panNo || 'N/A'}</p>
                <p><span className="font-medium text-gray-700">Passport Available:</span> {candidate.passportAvailable ? 'Yes' : 'No'}</p>
                {candidate.certificateName && (
                  <p><span className="font-medium text-gray-700">Certificate Name:</span> {candidate.certificateName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate('/hr/enquiry')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
            >
              Back to Candidates List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;