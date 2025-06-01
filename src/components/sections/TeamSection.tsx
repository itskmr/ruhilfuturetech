const TeamSection = () => {
  const teamMembers = [
    {
      name: "Sudhanshu",
      position: "General Manager",
      image: "/sudhanshu.jpg",
      bio: "Provides strategic oversight and ensures operational excellence across all departments. Responsible for aligning organizational objectives with client expectations and driving performance through effective leadership and planning."
    },

    {
      name: "Nikhil Sharma",
      position: "Financial Manager",
      image: "/nikhil.jpg",
      bio: "Oversees financial operations including budgeting, forecasting, and fiscal analysis. Ensures sound financial decision-making that supports the company's growth, compliance, and long-term sustainability."
    },
    {
      name: "Sandhaya Ghangas",
      position: "HR ",
      image: "/s1.jpg",
      bio: "Leads HR initiatives focused on talent acquisition, employee relations, and organizational development. Ensures a positive work environment and promotes policies that support employee growth and company values."
    },
   
    
    
  ];

  return (
    <section id="team" className="py-20 bg-gray-50 pt-32 animate-fadeIn">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slideUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            Meet our team of experts who are passionate about delivering innovative technology solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {teamMembers.map((member, index) => (
    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300 animate-slideUp" style={{animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'both'}}>
      <div className="h-64 overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-blue-600 mb-3">{member.position}</p>
        <p className="text-gray-600">{member.bio}</p>
      </div>
    </div>
  ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;