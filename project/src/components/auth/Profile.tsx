import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../ToastContext';
import { CheckCircle2 } from 'lucide-react'; // Ensure this is imported for the icon

interface ProfileData {
  name: string;
  address: string;
  linkedin: string;
  github: string;
  email: string;
  phone: string;
  resume: string | null;
  photo: string | null;
  tenth: { school: string; year: string; percentage: string };
  twelfth: { school: string; year: string; percentage: string };
  graduation: { college: string; degree: string; year: string; cgpa: string };
  additionalInfo: string;
}

const Profile: React.FC = () => {
  const { setToast } = useToast();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('userProfile');
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    } else {
      setToast({
        message: 'No profile data found. Please sign up or sign in.',
        icon: null,
      });
      navigate('/signin');
    }
  }, [setToast, navigate]);

  if (!profileData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleSignOut = () => {
    localStorage.removeItem('userProfile');
    setToast({
      message: 'Signed out successfully!',
      icon: <CheckCircle2 className="text-green-500" />,
    });
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
          <button
            onClick={handleSignOut}
            className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign Out
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700">Personal Details</h3>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Phone:</strong> {profileData.phone}</p>
              <p><strong>Address:</strong> {profileData.address || 'N/A'}</p>
              <p><strong>LinkedIn:</strong> {profileData.linkedin ? <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{profileData.linkedin}</a> : 'N/A'}</p>
              <p><strong>GitHub:</strong> {profileData.github ? <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{profileData.github}</a> : 'N/A'}</p>
              <p><strong>Resume:</strong> {profileData.resume || 'N/A'}</p>
              <p><strong>Photo:</strong> {profileData.photo || 'N/A'}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Education Details</h3>
            <div className="mt-2 space-y-4">
              <div>
                <h4 className="text-md font-medium text-gray-600">10th Class</h4>
                <p><strong>School:</strong> {profileData.tenth.school || 'N/A'}</p>
                <p><strong>Year:</strong> {profileData.tenth.year || 'N/A'}</p>
                <p><strong>Percentage:</strong> {profileData.tenth.percentage || 'N/A'}%</p>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-600">12th Class</h4>
                <p><strong>School:</strong> {profileData.twelfth.school || 'N/A'}</p>
                <p><strong>Year:</strong> {profileData.twelfth.year || 'N/A'}</p>
                <p><strong>Percentage:</strong> {profileData.twelfth.percentage || 'N/A'}%</p>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-600">Graduation</h4>
                <p><strong>College:</strong> {profileData.graduation.college || 'N/A'}</p>
                <p><strong>Degree:</strong> {profileData.graduation.degree || 'N/A'}</p>
                <p><strong>Year:</strong> {profileData.graduation.year || 'N/A'}</p>
                <p><strong>CGPA:</strong> {profileData.graduation.cgpa || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Additional Information</h3>
            <p className="mt-2">{profileData.additionalInfo || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;