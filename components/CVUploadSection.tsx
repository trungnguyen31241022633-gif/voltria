import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, Loader2, AlertCircle, Briefcase, Sparkles, Target } from 'lucide-react';
import { analyzeCVContent } from '../services/geminiService';
import { AnalysisState, CVAnalysis } from '../types';

const INDUSTRIES = [
  "Công nghệ thông tin (IT / Phần mềm)",
  "Kinh doanh / Bán hàng (Sales)",
  "Marketing / Truyền thông / Quảng cáo",
  "Hành chính / Nhân sự (HR)",
  "Kế toán / Kiểm toán",
  "Tài chính / Ngân hàng",
  "Thiết kế / Sáng tạo / Kiến trúc",
  "Giáo dục / Đào tạo",
  "Logistics / Xuất nhập khẩu",
  "Chăm sóc khách hàng",
  "Sản xuất / Kỹ thuật",
  "Khác"
];

const CVUploadSection: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [desiredIndustry, setDesiredIndustry] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isLoading: false,
    result: null,
    error: null,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    setFile(file);
    setAnalysis({ isLoading: false, result: null, error: null });
    // In a real app, we would parse the PDF here. 
    // For this demo, we'll prompt the user to use text if they can't upload a readable file, 
    // or simulate reading if it's a text file.
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => setTextInput(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!textInput && !file) {
      setAnalysis(prev => ({ ...prev, error: "Vui lòng nhập nội dung hoặc tải lên CV." }));
      return;
    }

    setAnalysis({ isLoading: true, result: null, error: null });

    try {
        // If we have text input, use it. If we have a file but no text input (and it's not a text file),
        // we will simulate the content for the demo since we can't do client-side PDF parsing easily here.
        // In a real production app, you'd use a server or a heavier client lib.
        let contentToAnalyze = textInput;
        
        if (!contentToAnalyze && file) {
             // Fallback for demo purposes if they upload a PDF/Word doc without text body
             contentToAnalyze = `
                CV Mẫu (Mô phỏng cho Demo):
                Họ tên: Nguyễn Văn A
                Kinh nghiệm: 2 năm làm Lập trình viên Frontend (ReactJS).
                Kỹ năng: JavaScript, TypeScript, Tailwind CSS, HTML5.
                Học vấn: Tốt nghiệp Đại học Bách Khoa, chuyên ngành CNTT.
                Mong muốn: Tìm môi trường năng động, cơ hội thăng tiến.
             `;
        }

      const result = await analyzeCVContent(contentToAnalyze, desiredIndustry);
      setAnalysis({ isLoading: false, result, error: null });
    } catch (err) {
      setAnalysis({ isLoading: false, result: null, error: "Có lỗi xảy ra khi phân tích. Vui lòng thử lại." });
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[400px]">
      {/* Left: Upload Area */}
      <div className="p-8 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload CV của bạn</h2>
        <p className="text-gray-500 mb-6 text-sm">Để <span className="text-[#06b6d4] font-bold">Voltria</span> gợi ý việc làm phù hợp nhất với hồ sơ của bạn.</p>

        {!analysis.result ? (
          <>
            {/* Drag & Drop Zone */}
            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer
                ${dragActive ? 'border-[#06b6d4] bg-cyan-50' : 'border-gray-300 hover:border-[#06b6d4] hover:bg-cyan-50'}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.txt"
              />
              
              {file ? (
                <div className="text-center">
                  <FileText size={48} className="mx-auto text-[#06b6d4] mb-3" />
                  <p className="font-semibold text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-400 mt-1">Click để thay đổi file</p>
                </div>
              ) : (
                <div className="text-center">
                  <UploadCloud size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="font-semibold text-gray-700">Kéo thả CV vào đây</p>
                  <p className="text-xs text-gray-400 mt-1">hoặc click để chọn file (PDF, DOC, DOCX)</p>
                </div>
              )}
            </div>

            {/* Text Area Fallback */}
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2 font-medium">Hoặc dán nội dung CV:</p>
              <textarea 
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent outline-none resize-none h-20"
                placeholder="Dán nội dung sơ yếu lý lịch của bạn vào đây..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </div>

            {/* Industry Selection */}
            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-2 font-medium flex items-center gap-1">
                <Target size={14} className="text-[#06b6d4]" /> Ngành nghề mong muốn (Tuỳ chọn):
              </label>
              <select 
                value={desiredIndustry}
                onChange={(e) => setDesiredIndustry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent outline-none bg-white text-gray-700 cursor-pointer hover:border-[#06b6d4] transition-colors"
              >
                <option value="">-- Để AI tự gợi ý phù hợp nhất --</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleAnalyze}
              disabled={analysis.isLoading || (!file && !textInput)}
              className="mt-6 w-full py-3 bg-[#06b6d4] text-white rounded-lg font-bold hover:bg-[#0891b2] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-200"
            >
              {analysis.isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Đang phân tích...
                </>
              ) : (
                "Phân tích & Tìm việc"
              )}
            </button>
            
            {analysis.error && (
              <div className="mt-3 text-red-500 text-sm flex items-center gap-2">
                <AlertCircle size={14} /> {analysis.error}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
               <CheckCircle size={32} className="text-[#06b6d4]" />
             </div>
             <h3 className="text-xl font-bold text-gray-800">Phân tích hoàn tất!</h3>
             <p className="text-gray-500 text-sm mt-2">Đã tìm thấy các cơ hội phù hợp với bạn.</p>
             <button 
                onClick={() => setAnalysis({ isLoading: false, result: null, error: null })}
                className="mt-6 text-[#06b6d4] font-semibold hover:underline text-sm"
             >
                Upload CV khác
             </button>
          </div>
        )}
      </div>

      {/* Right: Results / Promo */}
      <div className="md:w-1/2 bg-gray-50 p-8 flex flex-col overflow-y-auto max-h-[600px]">
        {analysis.result ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-700">Kết quả đánh giá AI</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                analysis.result.score >= 80 ? 'bg-green-100 text-green-700' : 
                analysis.result.score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                Điểm: {analysis.result.score}/100
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#06b6d4]">
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Tóm tắt chuyên môn</h4>
              <p className="text-sm text-gray-700 italic">"{analysis.result.summary}"</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
               <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                  <h4 className="text-sm font-bold text-cyan-800 mb-2 flex items-center gap-2">
                    Điểm mạnh
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {analysis.result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
               </div>
               <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <h4 className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
                    Cần cải thiện {desiredIndustry ? `cho ngành ${desiredIndustry.split('(')[0].trim()}` : ""}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {analysis.result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
               </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Briefcase size={18} className="text-[#06b6d4]" />
                Công việc gợi ý & Mức độ phù hợp
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {analysis.result.suggestedRoles.map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:border-cyan-300 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1.5 bg-cyan-50 rounded text-cyan-600">
                        <Sparkles size={14} />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 text-sm">{item.role}</h5>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.suitability}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-center opacity-60">
             <img src="https://picsum.photos/200/200?grayscale" alt="AI Waiting" className="w-32 h-32 rounded-full mb-6 opacity-50 border-4 border-gray-200" />
             <h3 className="text-lg font-bold text-gray-400">AI đang chờ dữ liệu</h3>
             <p className="text-sm text-gray-400 max-w-xs mt-2">
               Chọn ngành nghề mong muốn và tải CV để nhận phân tích chi tiết về cơ hội việc làm của bạn.
             </p>
             <div className="mt-8 grid grid-cols-3 gap-2 w-full max-w-sm">
                <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded col-span-2 animate-pulse delay-75"></div>
                <div className="h-2 bg-gray-200 rounded col-span-2 animate-pulse delay-100"></div>
                <div className="h-2 bg-gray-200 rounded animate-pulse delay-150"></div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVUploadSection;