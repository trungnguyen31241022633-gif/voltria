import React, { useState } from 'react';
import { 
  Menu, ChevronDown, Globe, Users, Search, Bookmark, FileText, ThumbsUp, 
  Building, Star, Layout, PenTool, Award, Briefcase, GraduationCap, 
  Calculator, DollarSign, PiggyBank, Smartphone, Shield, Brain, PieChart,
  Compass, Lightbulb, Wallet, Book, TrendingUp, FileCheck, Upload, File
} from 'lucide-react';

// Menu Data Structure
const menuData = {
  jobs: {
    id: 'jobs',
    leftTitle: 'VIỆC LÀM',
    left: [
      { title: 'Tìm việc làm', icon: <Search size={18} /> },
      { title: 'Việc làm đã lưu', icon: <Bookmark size={18} /> },
      { title: 'Việc làm đã ứng tuyển', icon: <FileCheck size={18} /> },
      { title: 'Việc làm phù hợp', icon: <ThumbsUp size={18} /> },
    ],
    rightTitle: 'VIỆC LÀM THEO VỊ TRÍ',
    right: [
      'Việc làm Nhân viên kinh doanh', 'Việc làm Lao động phổ thông',
      'Việc làm Kế toán', 'Việc làm Senior',
      'Việc làm Marketing', 'Việc làm Kỹ sư xây dựng',
      'Việc làm Hành chính nhân sự', 'Việc làm Thiết kế đồ họa',
      'Việc làm Chăm sóc khách hàng', 'Việc làm Bất động sản',
      'Việc làm Ngân hàng', 'Việc làm Giáo dục',
      'Việc làm IT', 'Việc làm Telesales',
    ]
  },
  create_cv: {
    id: 'create_cv',
    groups: [
      {
        title: 'Mẫu CV theo style',
        items: [
          { title: 'Mẫu CV Đơn giản', icon: <Layout size={16} /> },
          { title: 'Mẫu CV Ấn tượng', icon: <Star size={16} /> },
          { title: 'Mẫu CV Chuyên nghiệp', icon: <Award size={16} /> },
          { title: 'Mẫu CV Hiện đại', icon: <PenTool size={16} /> },
        ]
      },
      {
        title: 'Mẫu CV theo vị trí ứng tuyển',
        items: [
          { title: 'Nhân viên kinh doanh', icon: <Briefcase size={16} /> },
          { title: 'Lập trình viên', icon: <Briefcase size={16} /> },
          { title: 'Nhân viên kế toán', icon: <Briefcase size={16} /> },
          { title: 'Chuyên viên marketing', icon: <Briefcase size={16} /> },
        ]
      }
    ],
    right: [
      { title: 'Quản lý CV', icon: <FileText size={18} /> },
      { title: 'Tải CV lên', icon: <Upload size={18} /> },
      { title: 'Hướng dẫn viết CV', icon: <PenTool size={18} /> },
      { title: 'Quản lý Cover Letter', icon: <File size={18} /> },
      { title: 'Mẫu Cover Letter', icon: <Layout size={18} /> },
    ]
  },
  tools: {
    id: 'tools',
    leftTitle: 'KHÁM PHÁ VÀ NÂNG CẤP BẢN THÂN',
    left: [
      { title: 'Trắc nghiệm MBTI', icon: <Brain size={18} /> },
      { title: 'Trắc nghiệm MI', icon: <Brain size={18} /> },
      { title: 'Voltria Skills', icon: <Award size={18} /> },
      { title: 'Khóa học', icon: <GraduationCap size={18} /> },
    ],
    rightTitle: 'CÔNG CỤ',
    right: [
      { title: 'Tính lương Gross - Net', icon: <Calculator size={18} /> },
      { title: 'Tính bảo hiểm xã hội một lần', icon: <Shield size={18} /> },
      { title: 'Tính thuế thu nhập cá nhân', icon: <DollarSign size={18} /> },
      { title: 'Lập kế hoạch tiết kiệm', icon: <PiggyBank size={18} /> },
      { title: 'Tính lãi suất kép', icon: <PieChart size={18} /> },
      { title: 'Mobile App Voltria', icon: <Smartphone size={18} /> },
      { title: 'Tính bảo hiểm thất nghiệp', icon: <Shield size={18} /> },
    ]
  },
  handbook: {
    id: 'handbook',
    left: [
      { title: 'Định hướng nghề nghiệp', icon: <Compass size={18} /> },
      { title: 'Bí kíp tìm việc', icon: <Lightbulb size={18} /> },
      { title: 'Chế độ lương thưởng', icon: <Wallet size={18} /> },
      { title: 'Kiến thức chuyên ngành', icon: <Book size={18} /> },
      { title: 'Hành trang nghề nghiệp', icon: <Briefcase size={18} /> },
      { title: 'Thị trường & xu hướng tuyển dụng', icon: <TrendingUp size={18} /> },
    ],
    rightTitle: 'Bài viết nổi bật',
    featured: [
      {
        title: 'Tải mẫu đơn xin nghỉ việc/thôi việc mới nhất',
        desc: 'Đơn xin nghỉ việc là mẫu văn bản chuẩn được sử dụng để hoàn tất thủ tục.',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop'
      },
      {
        title: 'Tải miễn phí các mẫu đơn xin nghỉ phép chuẩn',
        desc: 'Tổng hợp các mẫu đơn xin nghỉ phép đúng chuẩn như Mẫu đơn xin nghỉ phép năm.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&fit=crop'
      }
    ]
  }
};

const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (menuId: string) => {
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans" onMouseLeave={handleMouseLeave}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between relative z-50 bg-white">
        {/* Left Side: Logo & Nav */}
        <div className="flex items-center gap-8">
          {/* Voltria Logo Construction */}
          <div className="flex items-center select-none cursor-pointer group scale-90 origin-left">
            {/* V */}
            <span className="text-[80px] font-black text-black leading-[0.8] tracking-tighter" style={{ fontFamily: 'sans-serif' }}>V</span>
            
            {/* O Container */}
            <div className="relative h-[60px] w-[60px] flex items-center justify-center -ml-3 z-10">
                {/* The O Ring */}
                <div className="w-full h-full rounded-full border-[10px] border-black bg-white flex flex-col items-center justify-start overflow-hidden pt-1 relative shadow-sm">
                   {/* Globe Icon */}
                   <Globe size={28} strokeWidth={1.5} className="text-[#2e1065] mb-[-4px] z-10" />
                   
                   {/* People/Users Icon Group at bottom */}
                   <div className="flex items-end justify-center -mb-1">
                      <Users size={24} strokeWidth={2} className="text-[#2e1065] fill-[#2e1065]" />
                   </div>
                </div>
            </div>

            {/* ltria Container */}
            <div className="relative h-[65px] flex flex-col justify-center -ml-4 pl-6 pr-4 bg-[#1e1b4b] rounded-r-xl rounded-bl-[30px] z-0 mt-2">
                 {/* Text Content */}
                <div className="flex flex-col relative z-10 mt-[-4px]">
                    <span className="text-[#67e8f9] text-[42px] font-bold leading-[0.85] tracking-tight" style={{ fontFamily: 'sans-serif' }}>ltria</span>
                    <span className="text-[#67e8f9] text-[11px] font-medium text-right leading-none tracking-widest mt-1">fanpage</span>
                </div>
                
                {/* Decorative cutout visual fix */}
                <div className="absolute top-0 left-0 w-8 h-8 bg-[#1e1b4b] -z-10 rounded-full"></div>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-700 mt-2 h-20">
            <div 
              className="h-full flex items-center cursor-pointer hover:text-[#06b6d4] transition-colors relative group"
              onMouseEnter={() => handleMouseEnter('jobs')}
            >
              <span className="flex items-center gap-1">Việc làm <ChevronDown size={14} /></span>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-[#06b6d4] transition-all duration-300 ${activeMenu === 'jobs' ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

            <div 
              className="h-full flex items-center cursor-pointer hover:text-[#06b6d4] transition-colors relative"
              onMouseEnter={() => handleMouseEnter('create_cv')}
            >
              <span className="flex items-center gap-1">Tạo CV <ChevronDown size={14} /></span>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-[#06b6d4] transition-all duration-300 ${activeMenu === 'create_cv' ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

            <div 
              className="h-full flex items-center cursor-pointer hover:text-[#06b6d4] transition-colors relative"
              onMouseEnter={() => handleMouseEnter('tools')}
            >
              <span className="flex items-center gap-1">Công cụ <ChevronDown size={14} /></span>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-[#06b6d4] transition-all duration-300 ${activeMenu === 'tools' ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

            <div 
              className="h-full flex items-center cursor-pointer hover:text-[#06b6d4] transition-colors relative"
              onMouseEnter={() => handleMouseEnter('handbook')}
            >
              <span className="flex items-center gap-1">Cẩm nang nghề nghiệp <ChevronDown size={14} /></span>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-[#06b6d4] transition-all duration-300 ${activeMenu === 'handbook' ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

             <div className="h-full flex items-center cursor-pointer">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 text-xs font-extrabold shadow-sm">
                Voltria Pro
              </span>
            </div>
          </nav>
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center gap-3">
          <button className="hidden md:block px-4 py-2 text-[#06b6d4] border border-[#06b6d4] rounded font-semibold hover:bg-cyan-50 transition-colors text-sm">
            Đăng nhập
          </button>
          <button className="px-4 py-2 bg-[#06b6d4] text-white rounded font-semibold hover:bg-[#0891b2] transition-colors text-sm shadow-md shadow-cyan-200">
            Đăng ký
          </button>
          <button className="hidden md:block px-4 py-2 bg-[#1e1b4b] text-gray-200 rounded font-semibold hover:bg-black transition-colors text-sm">
            Đăng tuyển & Tìm hồ sơ
          </button>
          <button className="lg:hidden text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mega Menus Container */}
      {activeMenu && (
        <div 
          className="absolute top-20 left-0 w-full bg-white shadow-xl border-t border-gray-100 z-40 animate-fadeIn"
          onMouseEnter={() => setActiveMenu(activeMenu)} 
          onMouseLeave={handleMouseLeave}
        >
          {/* JOBS MENU */}
          {activeMenu === 'jobs' && (
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column: Quick Actions */}
                <div className="md:w-1/4 border-r border-gray-100 pr-6 space-y-4">
                  <h4 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2">{menuData.jobs.leftTitle}</h4>
                  {menuData.jobs.left.map((item, idx) => (
                    <a key={idx} href="#" className="flex items-center gap-3 text-gray-700 hover:text-[#06b6d4] font-medium transition-colors group">
                      <span className="p-2 bg-gray-50 rounded-full group-hover:bg-cyan-50 group-hover:text-[#06b6d4] transition-colors">
                        {item.icon}
                      </span>
                      {item.title}
                    </a>
                  ))}
                </div>
                
                {/* Right Column: Categories */}
                <div className="md:w-3/4">
                  <h4 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-4">{menuData.jobs.rightTitle}</h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                    {menuData.jobs.right.map((item, idx) => (
                      <a key={idx} href="#" className="text-sm text-gray-600 hover:text-[#06b6d4] hover:underline transition-colors">
                        {item}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                    <a href="#" className="text-[#06b6d4] font-bold text-sm hover:underline flex items-center justify-center gap-1">
                      Xem tất cả việc làm theo ngành nghề <ChevronDown size={14} className="-rotate-90" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CREATE CV MENU */}
          {activeMenu === 'create_cv' && (
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row gap-8">
                 {/* Left Groups */}
                 <div className="md:w-2/3 grid grid-cols-2 gap-8 border-r border-gray-100 pr-6">
                    {menuData.create_cv.groups.map((group, idx) => (
                      <div key={idx}>
                        <h4 className="text-[#06b6d4] font-bold text-sm mb-4 flex items-center gap-2 cursor-pointer hover:underline group">
                          {group.title} <ChevronDown size={14} className="-rotate-90 text-gray-400 group-hover:text-[#06b6d4]" />
                        </h4>
                        <div className="space-y-3">
                          {group.items.map((item, i) => (
                            <a key={i} href="#" className="flex items-center gap-3 text-gray-600 hover:text-[#06b6d4] transition-colors group">
                              <span className="text-gray-400 group-hover:text-[#06b6d4] transition-colors">
                                {item.icon}
                              </span>
                              <span className="text-sm font-medium">{item.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                 </div>
                 
                 {/* Right List */}
                 <div className="md:w-1/3">
                    <div className="space-y-4">
                      {menuData.create_cv.right.map((item, idx) => (
                         <a key={idx} href="#" className="flex items-center gap-3 text-gray-700 hover:text-[#06b6d4] font-medium transition-colors group">
                           <span className="p-2 bg-gray-50 rounded group-hover:bg-cyan-50 group-hover:text-[#06b6d4] transition-colors text-gray-500">
                             {item.icon}
                           </span>
                           {item.title}
                         </a>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* TOOLS MENU */}
          {activeMenu === 'tools' && (
            <div className="container mx-auto px-4 py-6">
               <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 border-r border-gray-100 pr-6">
                     <h4 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-4">{menuData.tools.leftTitle}</h4>
                     <div className="space-y-4">
                        {menuData.tools.left.map((item, idx) => (
                          <a key={idx} href="#" className="flex items-center gap-3 group">
                             <span className="p-2 rounded-lg bg-green-50 text-green-600 group-hover:bg-[#06b6d4] group-hover:text-white transition-colors">
                               {item.icon}
                             </span>
                             <span className="font-semibold text-gray-700 group-hover:text-[#06b6d4] transition-colors">{item.title}</span>
                          </a>
                        ))}
                     </div>
                  </div>
                  <div className="md:w-2/3">
                     <h4 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-4">{menuData.tools.rightTitle}</h4>
                     <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        {menuData.tools.right.map((item, idx) => (
                          <a key={idx} href="#" className="flex items-center gap-3 group">
                             <span className="p-1.5 rounded bg-gray-50 text-gray-500 group-hover:bg-cyan-50 group-hover:text-[#06b6d4] transition-colors">
                               {item.icon}
                             </span>
                             <span className="text-sm font-medium text-gray-700 group-hover:text-[#06b6d4] transition-colors">{item.title}</span>
                          </a>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* HANDBOOK MENU */}
          {activeMenu === 'handbook' && (
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row gap-8">
                 {/* Left List */}
                 <div className="md:w-1/3 border-r border-gray-100 pr-6">
                    <div className="space-y-4">
                      {menuData.handbook.left.map((item, idx) => (
                         <a key={idx} href="#" className="flex items-center gap-3 text-gray-700 hover:text-[#06b6d4] font-medium transition-colors group">
                           <span className="p-2 bg-gray-50 rounded-full group-hover:bg-cyan-50 group-hover:text-[#06b6d4] transition-colors text-gray-500">
                             {item.icon}
                           </span>
                           {item.title}
                         </a>
                      ))}
                    </div>
                 </div>

                 {/* Right Featured */}
                 <div className="md:w-2/3">
                    <h4 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-4">{menuData.handbook.rightTitle}</h4>
                    <div className="space-y-4">
                       {menuData.handbook.featured.map((item, idx) => (
                         <div key={idx} className="flex gap-4 group cursor-pointer">
                            <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                               <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div>
                               <h5 className="font-bold text-gray-800 group-hover:text-[#06b6d4] transition-colors mb-1">{item.title}</h5>
                               <p className="text-xs text-gray-500 line-clamp-2">{item.desc}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                       <a href="#" className="text-[#06b6d4] font-bold text-sm hover:underline flex items-center gap-1">
                         Xem thêm bài viết nổi bật <ChevronDown size={14} className="-rotate-90" />
                       </a>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;