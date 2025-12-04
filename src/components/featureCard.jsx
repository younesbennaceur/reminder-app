

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-3 hover:scale-[1.02] transition-transform duration-300">
    <div className={`p-3 rounded-2xl ${color}`}>
      <Icon size={24} className="text-gray-800" />
    </div>
    <h4 className="font-bold text-[#1D1D1F] text-lg">{title}</h4>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);
export default FeatureCard;