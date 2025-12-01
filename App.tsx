import React from 'react';
import Header from './components/Header';
import CVUploadSection from './components/CVUploadSection';
import FeatureCard from './components/FeatureCard';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { ServiceCardItem } from './types';

const serviceItems: ServiceCardItem[] = [
  {
    id: 1,
    title: "Quét template tìm việc",
    description: "Hệ thống AI quét và phân tích CV để tìm ra các cơ hội việc làm khớp nhất với kỹ năng của bạn.",
    icon: "🔍",
    color: "bg-cyan-500",
    isNew: true
  },
  {
    id: 2,
    title: "Tìm kinh nghiệm",
    description: "Kết nối thực tập sinh và fresher với các dự án thực tế để tích lũy kinh nghiệm chuyên môn.",
    icon: "📈",
    color: "bg-indigo-500"
  },
  {
    id: 3,
    title: "Mentoring",
    description: "Kết nối 1:1 với các chuyên gia đầu ngành để được hướng dẫn và định hướng phát triển sự nghiệp.",
    icon: "🎓",
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Khóa học",
    description: "Nâng cao năng lực cạnh tranh với các khóa học kỹ năng và chuyên môn được tuyển chọn.",
    icon: "📚",
    color: "bg-orange-500"
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e1b4b] to-[#06b6d4] pt-12 pb-24 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 opacity-20 rounded-full transform -translate-x-1/4 translate-y-1/4 blur-2xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Title & Search */}
            <div className="lg:col-span-5 text-white space-y-6">
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Upload CV tìm việc <br />
                <span className="text-cyan-200 opacity-90 text-3xl font-bold mt-2 block">
                  Nền tảng kết nối sinh viên và cơ hội
                </span>
              </h1>
              
              <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2 max-w-2xl">
                <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                  <Search className="text-gray-400 mr-3" size={20} />
                  <input 
                    type="text" 
                    placeholder="Vị trí tuyển dụng..." 
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <div className="md:w-48 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="text-gray-400 mr-3" size={20} />
                  <select className="w-full outline-none text-gray-700 bg-transparent cursor-pointer">
                    <option>Tất cả địa điểm</option>
                    <option>Hồ Chí Minh</option>
                    <option>Hà Nội</option>
                    <option>Đà Nẵng</option>
                  </select>
                </div>
                <button className="bg-[#06b6d4] hover:bg-[#0891b2] text-white font-bold py-3 px-8 rounded-md transition-colors shadow-md shadow-cyan-800/20">
                  Tìm kiếm
                </button>
              </div>

              {/* Quick Stats Ticker */}
              <div className="flex items-center gap-6 text-sm font-medium bg-black bg-opacity-20 inline-flex p-3 rounded-lg backdrop-blur-sm border border-white border-opacity-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  <span className="text-cyan-100">Việc làm đang tuyển:</span>
                  <span className="text-white font-bold text-lg">51.773</span>
                </div>
                <div className="h-4 w-px bg-white opacity-20"></div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-100">Hôm nay:</span>
                  <span className="text-white font-bold text-lg">2.819</span>
                </div>
              </div>
            </div>

            {/* Right Column: Upload Component (Replacing the Image) */}
            <div className="lg:col-span-7 relative mt-8 lg:mt-0">
               <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
               <CVUploadSection />
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceItems.map((item) => (
            <FeatureCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Featured Jobs Section (Mock) */}
      <section className="container mx-auto px-4 py-12 bg-white rounded-t-3xl border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             <div className="p-2 bg-cyan-50 rounded-lg text-[#06b6d4]">
                <Briefcase size={24} />
             </div>
             Việc làm hấp dẫn
           </h2>
           <a href="#" className="text-[#06b6d4] font-semibold hover:underline">Xem tất cả</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all hover:border-[#06b6d4] cursor-pointer bg-white group">
                <div className="flex gap-4">
                   <div className="w-16 h-16 rounded border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/64/64?random=${i}`} alt="Company Logo" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1">
                      <h3 className="font-bold text-gray-800 group-hover:text-[#06b6d4] line-clamp-2">Senior Frontend Developer (React/NextJS)</h3>
                      <p className="text-gray-500 text-sm mt-1">Voltria Tech Solutions</p>
                      <div className="flex items-center gap-3 mt-3">
                         <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Hà Nội</span>
                         <span className="text-[#06b6d4] font-bold text-sm">Up to $2500</span>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p>&copy; 2025 Voltria. Powered by React, Tailwind & Gemini API.</p>
      </footer>

    </div>
  );
};

export default App;