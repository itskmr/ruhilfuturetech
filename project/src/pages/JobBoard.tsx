import React, { useState, useRef } from 'react';
import { FaSearch, FaUserCircle, FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
const jobsData = [
  {
    id: 1,
    title: 'AI/ML Engineer',
    company: 'Ruhil Future Technologies',
    department: 'Technology – Artificial Intelligence',
    location: 'Rohtak',
    applicants: 0,
    posted: '2d',
    tags: ['Full Time', 'Internship'],
    salary: 'Based on experience / industry standards',
    experience: 'Fresher',
    workLevel: 'Entry Level',
    employmentType: 'Full Time / Internship',
    overview: 'We are seeking driven AI/ML Engineers to develop intelligent solutions, build models, and work on machine learning pipelines that solve real-world problems.',
    responsibilities: [
      'Develop and optimize ML models using Python, TensorFlow, PyTorch, etc.',
      'Collaborate on data collection, preprocessing, and exploration',
      'Integrate ML models into production-ready systems',
    ],
    requiredQualifications: [
      "Bachelor's/Master's in Computer Science, Data Science, or related field",
      'Strong foundations in statistics and machine learning',
      'Experience in Python, NumPy, Pandas, Scikit-learn',
    ],
    preferredSkills: [
      'Exposure to NLP, Computer Vision, or Generative AI',
      'Knowledge of MLOps tools (MLflow, Docker, etc.)',
    ],
    applicationDeadline: '',
    equalOpportunityStatement: '',
    image: 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'Ruhil Future Technologies',
    department: 'Design',
    location: 'Rohtak',
    applicants: 0,
    posted: '2d',
    tags: ['Full Time', 'Internship'],
    salary: 'Based on experience / industry standards',
    experience: 'Fresher',
    workLevel: 'Entry Level',
    employmentType: 'Full Time / Internship',
    overview: `We're looking for creative UI/UX Designers to help shape intuitive, user-centered digital interfaces across web and mobile platforms.`,
    responsibilities: [
      'Design wireframes, user flows, and prototypes',
      'Conduct user research and usability testing',
      'Collaborate with product, tech, and marketing teams',
    ],
    requiredQualifications: [
      "Bachelor's degree or certification in Design, HCI, or related field",
      'Proficiency in Figma, Adobe XD, or Sketch',
      'Strong portfolio of UX/UI projects',
    ],
    preferredSkills: [
      'Motion design, micro-interactions',
      'Basic knowledge of HTML/CSS',
    ],
    applicationDeadline: '',
    equalOpportunityStatement: '',
    image: 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png',
  },
  {
    id: 3,
    title: 'Quality Assurance (QA) Engineer',
    company: 'Ruhil Future Technologies',
    department: 'QA & Testing',
    location: 'Rohtak',
    applicants: 0,
    posted: '2d',
    tags: ['Full Time', 'Internship'],
    salary: 'Based on experience / industry standards',
    experience: 'Fresher',
    workLevel: 'Entry Level',
    employmentType: 'Full Time / Internship',
    overview: 'We are looking for meticulous QA Engineers to ensure our applications meet quality standards through manual and automated testing.',
    responsibilities: [
      'Write and execute test cases',
      'Perform regression, functional, and integration testing',
      'Report and document bugs clearly',
    ],
    requiredQualifications: [
      'B.Tech/MCA in relevant field',
      'Basic understanding of testing tools like Selenium or JUnit',
    ],
    preferredSkills: [
      'Knowledge of API testing tools (Postman)',
      'Familiarity with CI/CD pipelines',
    ],
    applicationDeadline: '',
    equalOpportunityStatement: '',
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Ruhil Future Technologies',
    department: 'Cloud Infrastructure',
    location: 'Rohtak',
    applicants: 0,
    posted: '2d',
    tags: ['Full Time', 'Internship'],
    salary: 'Based on experience / industry standards',
    experience: 'Fresher',
    workLevel: 'Entry Level',
    employmentType: 'Full Time / Internship',
    overview: `We're hiring DevOps Engineers to automate deployment pipelines, manage cloud infrastructure, and optimize delivery cycles.`,
    responsibilities: [
      'Build CI/CD pipelines and monitoring tools',
      'Manage server infrastructure using tools like Docker, Kubernetes',
      'Implement security best practices in the DevOps lifecycle',
    ],
    requiredQualifications: [
      'B.Tech/MCA in IT or similar',
      'Hands-on with Git, Jenkins, AWS/GCP',
    ],
    preferredSkills: [
      'Knowledge of Terraform, Ansible',
      'Scripting in Python/Bash',
    ],
    applicationDeadline: '',
    equalOpportunityStatement: '',
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
  },
  {
    id: 5,
    title: 'Mobile App Developer',
    company: 'Ruhil Future Technologies',
    department: 'Mobile Development',
    location: 'Rohtak',
    applicants: 0,
    posted: '2d',
    tags: ['Full Time', 'Internship'],
    salary: 'Based on experience / industry standards',
    experience: 'Fresher',
    workLevel: 'Entry Level',
    employmentType: 'Full Time / Internship',
    overview: 'Join our Mobile App Development team to create engaging applications for Android/iOS platforms.',
    responsibilities: [
      'Build and maintain mobile applications in Flutter/React Native',
      'Collaborate on UI/UX integration',
      'Test and debug mobile features',
    ],
    requiredQualifications: [
      'Knowledge of Dart/Java/Kotlin/Swift',
      'Experience with mobile SDKs and APIs',
    ],
    preferredSkills: [
      'Firebase integration',
      'App deployment to Play Store / App Store',
    ],
    applicationDeadline: '',
    equalOpportunityStatement: '',
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
  },
  {
    id: 6,
    title: 'Logistics Manager',
    company: 'Ruhil Future Technologies',
    department: 'Operations & Logistics',
    location: 'Rohtak',
    applicants: 0,
    posted: '2d',
    tags: ['Full Time', 'Internship'],
    salary: 'Based on experience / industry standards',
    experience: 'Fresher',
    workLevel: 'Entry Level',
    employmentType: 'Full Time / Internship',
    overview: 'Looking for a proactive Logistics Manager to coordinate, plan, and oversee the supply chain and logistics operations.',
    responsibilities: [
      'Manage shipment, storage, and inventory flow',
      'Coordinate with suppliers and clients',
      'Maintain cost-efficient logistics systems',
    ],
    requiredQualifications: [
      'Bachelor\'s degree in Supply Chain, Logistics, or equivalent',
      'Proven 2+ years of logistics experience',
    ],
    preferredSkills: [
      'Use of ERP/logistics software',
      'Leadership and problem-solving',
    ],
    applicationDeadline: '',
    equalOpportunityStatement: '',
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
  },
  {
    id: 7,
    title: 'General Manager',
    company: 'Ruhil Future Technologies',
    department: 'Administration & Strategy',
    location: 'Rohtak',
    applicants: 0,
    posted: '2d',
    tags: ['Full Time', 'Internship'],
    salary: 'Based on experience / industry standards',
    experience: 'Fresher',
    workLevel: 'Entry Level',
    employmentType: 'Full Time / Internship',
    overview: 'Seeking a General Manager to lead operational strategy, manage cross-department collaboration, and oversee day-to-day functions.',
    responsibilities: [
      'Ensure efficient business operations',
      'Lead strategic planning and execution',
      'Monitor team performance and budgets',
    ],
    requiredQualifications: [
      'MBA or equivalent managerial degree',
      '3+ years of leadership experience',
    ],
    preferredSkills: [
      'Strong communication and crisis management',
      'Familiarity with organizational tools (ERP/CRM)',
    ],
    applicationDeadline: '',
    equalOpportunityStatement: '',
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
  },
  {
    id: 8,
    title: 'Content Creator',
    company: 'Ruhil Future Technologies',
    department: 'Marketing & Content',
    location: 'Rohtak',
    applicants: 0,
    posted: '2d',
    tags: ['Full Time', 'Internship'],
    salary: 'Based on experience / industry standards',
    experience: 'Fresher',
    workLevel: 'Entry Level',
    employmentType: 'Full Time / Internship',
    overview: 'We are hiring enthusiastic Content Creators to develop engaging material across digital channels.',
    responsibilities: [
      'Write blogs, social media posts, scripts, and ad copies',
      'Collaborate with design and marketing teams',
      'Track performance of content campaigns',
    ],
    requiredQualifications: [
      "Bachelor's in English, Mass Comm, or relevant field",
      'Excellent writing and storytelling skills',
    ],
    preferredSkills: [
      'SEO knowledge',
      'Basic design/video editing tools',
    ],
    applicationDeadline: '',
    equalOpportunityStatement: '',
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
  },
  {
    id: 9,
    title: 'Social Media Handler',
    company: 'Ruhil Future Technologies',
    department: 'Social Media & PR',
    location: 'Rohtak',
    applicants: 0,
    posted: '2d',
    tags: ['Full Time', 'Internship'],
    salary: 'Based on experience / industry standards',
    experience: 'Fresher',
    workLevel: 'Entry Level',
    employmentType: 'Full Time / Internship',
    overview: 'As a Social Media Handler, you will manage brand presence across platforms and build meaningful engagement.',
    responsibilities: [
      'Post scheduling and content publishing',
      'Analytics tracking and reporting',
      'Engage with followers, run campaigns',
    ],
    requiredQualifications: [
      'Familiarity with Instagram, LinkedIn, Facebook, Twitter',
      'Creativity and fast response capability',
    ],
    preferredSkills: [
      'Canva, Buffer, Hootsuite tools',
      'Trend spotting and content planning',
    ],
    applicationDeadline: '',
    equalOpportunityStatement: '',
    image: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
  },
];
const filters = {
  employment: [
    { label: 'Full Time Jobs', count: 60 },
    { label: 'Part Time Jobs', count: 34 },
    { label: 'Remote Jobs', count: 24 },
    { label: 'Internship Jobs', count: 20 },
    { label: 'Contract', count: 7 },
    { label: 'Training Jobs', count: 28 },
  ],
  seniority: [
    { label: 'Student Level', count: 8 },
    { label: 'Entry Level', count: 40 },
    { label: 'Mid Level', count: 35 },
    { label: 'Senior Level', count: 45 },
    { label: 'Directors', count: 12 },
    { label: 'VP or Above', count: 6 },
  ],
  salary: [
    { label: '$700 - $1000', count: 22 },
    { label: '$1000 - $1200', count: 20 },
    { label: '$1200 - $1400', count: 18 },
    { label: '$1400 - $2000', count: 20 },
    { label: '$2000+', count: 20 },
  ],
};
const MIN_SIDEBAR_WIDTH = 180;
const MAX_SIDEBAR_WIDTH = 400;
const DEFAULT_SIDEBAR_WIDTH = 320;
const MIN_LIST_WIDTH = 220;
const MAX_LIST_WIDTH = 500;
const DEFAULT_LIST_WIDTH = 350;
const JobBoard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(jobsData[0]);
  const [liked, setLiked] = useState<number[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH); // px
  const [listWidth, setListWidth] = useState(DEFAULT_LIST_WIDTH); // px
  const draggingSidebar = useRef(false);
  const draggingList = useRef(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobsData);  // Filter states
  const [selectedDepartment, setSelectedDepartment] = React.useState('');
  const [selectedJobTypes, setSelectedJobTypes] = React.useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = React.useState<string[]>([]);
  const [selectedWorkLevels, setSelectedWorkLevels] = React.useState<string[]>([]);  // Salary LPA ranges
  const salaryLpaRanges = [
    { label: '2 - 5 LPA', min: 2, max: 5 },
    { label: '5 - 10 LPA', min: 5, max: 10 },
    { label: '10 - 20 LPA', min: 10, max: 20 },
    { label: '20 - 35 LPA', min: 20, max: 35 },
    { label: '35 - 50 LPA', min: 35, max: 50 },
  ];  // Standard list of Indian states/UTs and major cities
  const indiaStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
    'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];
  const indiaCities = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun'],
    'Assam': ['Guwahati', 'Dibrugarh', 'Silchar'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur'],
    'Goa': ['Panaji', 'Margao'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    'Haryana': ['Gurugram', 'Faridabad', 'Panipat'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Manipur': ['Imphal'],
    'Meghalaya': ['Shillong'],
    'Mizoram': ['Aizawl'],
    'Nagaland': ['Kohima', 'Dimapur'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
    'Sikkim': ['Gangtok'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Telangana': ['Hyderabad', 'Warangal'],
    'Tripura': ['Agartala'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Noida', 'Ghaziabad'],
    'Uttarakhand': ['Dehradun', 'Haridwar'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
    'Andaman and Nicobar Islands': ['Port Blair'],
    'Chandigarh': ['Chandigarh'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Daman'],
    'Delhi': ['New Delhi', 'Delhi'],
    'Jammu and Kashmir': ['Srinagar', 'Jammu'],
    'Ladakh': ['Leh'],
    'Lakshadweep': ['Kavaratti'],
    'Puducherry': ['Puducherry']
  };
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');  // Flatten all cities for city dropdown
  const allIndiaCities = Object.values(indiaCities).flat();  const toggleLike = (id: number) => {
    setLiked((prev) => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  };  // Sidebar drag handlers
  const onSidebarMouseDown = (e: React.MouseEvent) => {
    draggingSidebar.current = true;
    document.body.style.cursor = 'col-resize';
  };
  const onSidebarMouseMove = (e: MouseEvent) => {
    if (!draggingSidebar.current) return;
    const newWidth = Math.min(Math.max(e.clientX, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH);
    setSidebarWidth(newWidth);
  };
  const onSidebarMouseUp = () => {
    draggingSidebar.current = false;
    document.body.style.cursor = '';
  };  // Job list drag handlers
  const onListMouseDown = (e: React.MouseEvent) => {
    draggingList.current = true;
    document.body.style.cursor = 'col-resize';
  };
  const onListMouseMove = (e: MouseEvent) => {
    if (!draggingList.current) return;
    const newWidth = Math.min(Math.max(e.clientX - sidebarWidth, MIN_LIST_WIDTH), MAX_LIST_WIDTH);
    setListWidth(newWidth);
  };
  const onListMouseUp = () => {
    draggingList.current = false;
    document.body.style.cursor = '';
  };  React.useEffect(() => {
    const moveSidebar = (e: MouseEvent) => onSidebarMouseMove(e);
    const upSidebar = () => onSidebarMouseUp();
    if (draggingSidebar.current) {
      window.addEventListener('mousemove', moveSidebar);
      window.addEventListener('mouseup', upSidebar);
    } else {
      window.removeEventListener('mousemove', moveSidebar);
      window.removeEventListener('mouseup', upSidebar);
    }
    return () => {
      window.removeEventListener('mousemove', moveSidebar);
      window.removeEventListener('mouseup', upSidebar);
    };
  }, [draggingSidebar.current]);  React.useEffect(() => {
    const moveList = (e: MouseEvent) => onListMouseMove(e);
    const upList = () => onListMouseUp();
    if (draggingList.current) {
      window.addEventListener('mousemove', moveList);
      window.addEventListener('mouseup', upList);
    } else {
      window.removeEventListener('mousemove', moveList);
      window.removeEventListener('mouseup', upList);
    }
    return () => {
      window.removeEventListener('mousemove', moveList);
      window.removeEventListener('mouseup', upList);
    };
  }, [draggingList.current, sidebarWidth]);  React.useEffect(() => {
    let filtered = jobsData;
    // Department
    if (selectedDepartment) {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }
    // Job Type
    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter(job => selectedJobTypes.some(type => job.tags.includes(type)));
    }
    // Salary
    if (selectedSalaryRanges.length > 0) {
      filtered = filtered.filter(job => {
        // Try to extract LPA from job.salary string
        const match = job.salary.match(/(\d+)[^\d]+(\d+)/);
        if (match) {
          const min = parseInt(match[1], 10);
          const max = parseInt(match[2], 10);
          return selectedSalaryRanges.some(label => {
            const range = salaryLpaRanges.find(r => r.label === label);
            return range && min <= range.max && max >= range.min;
          });
        }
        return false;
      });
    }
    // Work Level
    if (selectedWorkLevels.length > 0) {
      filtered = filtered.filter(job => selectedWorkLevels.includes(job.workLevel));
    }
    // Search
    const query = searchTitle.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter(job => job.title.toLowerCase().includes(query));
    }
    setFilteredJobs(filtered);
  }, [selectedDepartment, selectedJobTypes, selectedSalaryRanges, selectedWorkLevels, searchTitle]);  // Get unique departments from jobsData
  const departmentOptions = Array.from(new Set(jobsData.map(job => job.department)));  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 md:px-10 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="font-bold text-xl tracking-wide">Milao</span>
        </div>
        <nav className="flex-1 flex justify-center gap-8 text-base font-medium">
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Find Job</a>
          <a href="#" className="hover:text-blue-700">Company Review</a>
          <a href="#" className="hover:text-blue-700">Find Salaries</a>
        </nav>
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl" />
          <span className="hidden md:inline">Suhayol A. Nasim</span>
        </div>
      </header>
      {/* Filters and Content */}
      <main className="flex-1 flex flex-col md:flex-row bg-gray-100 min-w-0 min-h-0 h-full">
        {/* Sidebar */}
        <aside
          className="w-full flex-shrink-0 border-r border-gray-200 flex min-w-[120px] max-w-full md:max-w-xs hidden md:flex h-full min-h-0 bg-white"
          style={{ width: sidebarWidth, transition: 'width 0.2s' }}
        >
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 w-full flex flex-col gap-8">
            {/* Department/Team Filter */}
            <div>
              <h3 className="font-semibold mb-2">Department / Team</h3>
              <select
                className="w-full px-3 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none"
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departmentOptions.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>
            {/* Job Type Filter */}
            <div>
              <h3 className="font-semibold mb-2">Job Type</h3>
              <div className="flex flex-wrap gap-2">
                {['Full Time', 'Part Time', 'Internship', 'Remote', 'On-site', 'Hybrid'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={selectedJobTypes.includes(type)}
                      onChange={e => {
                        setSelectedJobTypes(prev =>
                          e.target.checked ? [...prev, type] : prev.filter(t => t !== type)
                        );
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            {/* Salary Range Filter */}
            <div>
              <h3 className="font-semibold mb-2">Salary Range (LPA)</h3>
              <div className="flex flex-col gap-2">
                {salaryLpaRanges.map(range => (
                  <label key={range.label} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={selectedSalaryRanges.includes(range.label)}
                      onChange={e => {
                        setSelectedSalaryRanges(prev =>
                          e.target.checked ? [...prev, range.label] : prev.filter(l => l !== range.label)
                        );
                      }}
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>
            {/* Work Level / Seniority Filter */}
            <div>
              <h3 className="font-semibold mb-2">Work Level / Seniority</h3>
              <div className="flex flex-wrap gap-2">
                {['Entry Level', 'Mid Level', 'Senior Level', 'Directors', 'VP or Above'].map(level => (
                  <label key={level} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={selectedWorkLevels.includes(level)}
                      onChange={e => {
                        setSelectedWorkLevels(prev =>
                          e.target.checked ? [...prev, level] : prev.filter(l => l !== level)
                        );
                      }}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>
        {/* Sidebar slider (only on md+) */}
        <div
          className="hidden md:block cursor-col-resize bg-[#23263a] hover:bg-blue-500 transition-colors duration-150"
          style={{ width: 6, minWidth: 6, maxWidth: 12, cursor: 'col-resize' }}
          onMouseDown={onSidebarMouseDown}
        />
        {/* Job List and Details with slider */}
        <section className="flex-1 flex flex-col md:flex-row min-w-0">
          {/* Job List */}
          <div
            className="bg-white p-4 flex flex-col gap-2 min-w-[150px] max-w-full md:max-w-md overflow-y-auto h-full min-h-0 scrollbar-thin scrollbar-thumb-blue-700/60 scrollbar-track-transparent"
            style={{ width: listWidth, transition: 'width 0.2s', flexShrink: 0 }}
          >
            {/* Responsive Search Bar for Job Title */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
              <input
                type="text"
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
                placeholder="Search Job Title..."
                className="flex-1 px-3 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none"
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors"
              >
                Search
              </button>
            </div>
            {/* Job List Items */}
            {filteredJobs.length === 0 && (
              <div className="text-gray-400 text-center py-8">No jobs found.</div>
            )}
            {filteredJobs.map(job => (
              <div
                key={job.id}
                className={`rounded-2xl border border-white/30 bg-[#23263a]/40 backdrop-blur-lg shadow-lg p-4 mb-4 cursor-pointer transition-all min-w-0 ${selectedJob.id === job.id ? 'ring-2 ring-blue-400 text-white' : 'text-gray-100 hover:ring-1 hover:ring-blue-400'}`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {job.title.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-base truncate">{job.title}</div>
                    <div className="text-xs text-gray-500 truncate">{job.location}</div>
                  </div>
                  <button className="ml-auto" onClick={e => { e.stopPropagation(); toggleLike(job.id); }}>
                    {liked.includes(job.id) ? <FaHeart className="text-red-500" /> : <FiHeart className="text-gray-400" />}
                  </button>
                </div>
                <div className="flex gap-2 mb-1 flex-wrap">
                  {job.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-[#35395c] text-blue-200 whitespace-nowrap">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Now</span>
                  <span>{job.posted}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Vertical Slider (only on md+) */}
          <div
            className="hidden md:block cursor-col-resize bg-[#23263a] hover:bg-blue-500 transition-colors duration-150"
            style={{ width: 6, minWidth: 6, maxWidth: 12, cursor: 'col-resize' }}
            onMouseDown={onListMouseDown}
          />
          {/* Job Details */}
          <div className="flex-1 h-full flex flex-col min-w-0 min-h-0">
            <div className="rounded-2xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg p-6 h-full flex flex-col overflow-y-auto min-w-0 min-h-0 text-gray-900">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                    {selectedJob.title.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-bold mb-1 truncate">{selectedJob.title}</h2>
                    <div className="text-blue-300 font-semibold truncate">{selectedJob.company} <span className="text-gray-500">• {selectedJob.location}</span></div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{selectedJob.department && (<span>{selectedJob.department} | </span>)}Posted {selectedJob.posted} ago • {selectedJob.applicants} Applicants</div>
                  </div>
                </div>
                <button
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200 text-lg"
                  style={{ alignSelf: 'flex-start' }}
                  onClick={() => alert('Application instructions coming soon!')}
                >
                  Apply
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-xs text-gray-500">Experience</div>
                  <div className="font-semibold text-gray-900">{selectedJob.experience}</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-xs text-gray-500">Work Level</div>
                  <div className="font-semibold text-gray-900">{selectedJob.workLevel}</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-xs text-gray-500">Employee Type</div>
                  <div className="font-semibold text-gray-900">{selectedJob.employmentType}</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-xs text-gray-500">Offer Salary</div>
                  <div className="font-semibold text-gray-900">{selectedJob.salary}</div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-gray-700 text-sm">{selectedJob.overview}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Key Responsibilities</h3>
                <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                  {selectedJob.responsibilities && selectedJob.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Required Qualifications</h3>
                <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                  {selectedJob.requiredQualifications && selectedJob.requiredQualifications.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Preferred Skills</h3>
                <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                  {selectedJob.preferredSkills && selectedJob.preferredSkills.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Application Deadline</h3>
                <p className="text-gray-700 text-sm">{selectedJob.applicationDeadline}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Equal Opportunity Statement</h3>
                <p className="text-gray-700 text-sm">{selectedJob.equalOpportunityStatement}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};export default JobBoard;

