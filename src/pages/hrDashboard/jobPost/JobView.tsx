import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Calendar, Users, FileText } from 'lucide-react';
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
  responsibilities?: string[];
  required_qualifications?: string[];
  preferred_skills?: string[];
}

const JobView = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError('Invalid job ID');
      setLoading(false);
      return;
    }
    const fetchJob = async () => {
      try {
        const response = await axios.get<Job>(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
      } catch (err: any) {
        console.error('Error fetching job:', err);
        setError('Failed to load job details. Please try again.');
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Job not found'}</h2>
          <Link
            to="/hr/applied-jobs"
            className="flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Back to Jobs"
          >
            <ArrowLeft size={20} />
            <span>Back to Jobs</span>
          </Link>
        </div>
      </div>
    );
  }

  const isExpired = new Date(job.application_deadline) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Gradient */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/hr/applied-jobs"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              aria-label="Back to Jobs"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Jobs</span>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold text-white">Job Details</h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto transform transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{job.job_title}</h1>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                isExpired ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
              }`}
            >
              {isExpired ? 'Expired' : 'Active'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-700">
            <div className="flex items-center space-x-2">
              <Briefcase className="text-blue-500" size={18} />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-500" size={18} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-500" size={18} />
              <span className="capitalize">{job.job_type.toLowerCase()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="text-blue-500" size={18} />
              <span>{job.salary_range}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-blue-500" size={18} />
              <span>Experience: {job.experience_level} years</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-500" size={18} />
              <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Summary</h2>
              <p className="text-gray-700 leading-relaxed">{job.job_summary}</p>
            </div>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Responsibilities</h2>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.required_qualifications && job.required_qualifications.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Required Qualifications</h2>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  {job.required_qualifications.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.preferred_skills && job.preferred_skills.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Preferred Skills</h2>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  {job.preferred_skills.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Equal Opportunity Statement</h2>
              <p className="text-gray-700 leading-relaxed">{job.equal_opportunity_statement}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">How to Apply</h2>
              <p className="text-gray-700 leading-relaxed">{job.how_to_apply}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Posted On</h2>
              <p className="text-gray-700">{new Date(job.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to="/hr/applied-jobs"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Back to Jobs"
            >
              <ArrowLeft size={20} />
              <span>Back to Jobs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobView;