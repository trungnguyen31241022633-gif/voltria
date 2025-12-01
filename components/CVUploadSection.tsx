import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, Loader2, AlertCircle, Briefcase, Sparkles, Target, User, History } from 'lucide-react';
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
  const [fileBase64, setFileBase64] = useState<{data: string, mimeType: string} | null>(null);
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
    setFileBase64(null);
    setTextInput('');

    // Read file content
    const reader = new FileReader();
    
    if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        reader.onload = (e) => {
            const result = e.target?.result as string;
            // Remove 'data:application/pdf;base64,' prefix
            const base64Data = result.split(',')[1];
            setFileBase64({
                data: base64Data,
                mimeType: file.type
            });
        };
        reader.readAsDataURL(file);
    } else {
        // Fallback for text-based files
        reader.onload = (e) => setTextInput(e.target?.result as string);
        reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!textInput && !fileBase64) {
      setAnalysis(prev => ({ ...prev, error: "Vui lòng nhập nội dung hoặc tải lên CV hợp lệ (PDF, Text)." }));
      return;
    }

    setAnalysis({ isLoading: true, result: null, error: null });

    try {
      const result = await analyzeCVContent(fileBase64, textInput, desiredIndustry);
      setAnalysis({ isLoading: false, result, error: null });
    } catch (err) {
      setAnalysis({ isLoading: false, result: null, error: "Có lỗi xảy ra khi phân tích. Vui lòng thử lại." });
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[650px]">
      {/* Left: Upload Area */}
      <div className="p-8 md:w-5/12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload CV của bạn</h2>
        <p className="text-gray-500 mb-6 text-sm">Để <span className="text-[#06b6d4] font-bold">Voltria</span> quét dữ liệu thực tế từ hồ sơ và gợi ý việc làm chính xác.</p>

        {!analysis.result ? (
          <>
            {/* Drag & Drop Zone */}
            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer flex-1 min-h-[200px]
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
                accept=".pdf,.txt"
              />
              
              {file ? (
                <div className="text-center">
                  <FileText size={48} className="mx-auto text-[#06b6d4] mb-3" />
                  <p className="font-semibold text-gray-700 break-all">{file.name}</p>
                  <p className="text-xs text-gray-400 mt-1">Click để thay đổi file</p>
                </div>
              ) : (
                <div className="text-center">
                  <UploadCloud size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="font-semibold text-gray-700">Kéo thả CV (PDF) vào đây</p>
                  <p className="text-xs text-gray-400 mt-1">hoặc click để chọn file</p>
                </div>
              )}
            </div>

            {/* Text Area Fallback */}
            {!file && (
                <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2 font-medium">Hoặc dán nội dung Text:</p>
                <textarea 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent outline-none resize-none h-32"
                    placeholder="Dán nội dung sơ yếu lý lịch của bạn vào đây..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                </div>
            )}

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
              disabled={analysis.isLoading || (!fileBase64 && !textInput)}
              className="mt-6 w-full py-3 bg-[#06b6d4] text-white rounded-lg font-bold hover:bg-[#0891b2] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-200"
            >
              {analysis.isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Đang đọc CV...
                </>
              ) : (
                "Quét & Phân tích CV"
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
             <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
               <CheckCircle size={32} className="text-[#06b6d4]" />
             </div>
             <h3 className="text-xl font-bold text-gray-800">Đã quét xong CV!</h3>
             <p className="text-gray-500 text-sm mt-2">Dữ liệu đã được trích xuất và phân tích.</p>
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
      <div className="md:w-7/12 bg-gray-50 p-8 flex flex-col overflow-y-auto max-h-[650px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {analysis.result ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Extracted Profile Info */}
            <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-[#06b6d4] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <User size={64} className="text-[#06b6d4]" />
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Hồ sơ ứng viên (Trích xuất từ CV)</h3>
                
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-[#06b6d4]">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Họ và tên</p>
                        <p className="font-bold text-gray-800 text-lg">{analysis.result.fullName || "Không xác định"}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mt-1 shrink-0">
                        <History size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Kinh nghiệm làm việc</p>
                        <p className="text-sm text-gray-700 italic leading-relaxed mt-1">"{analysis.result.experience}"</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold text-gray-700">Kết quả đánh giá chuyên sâu</h3>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                analysis.result.score >= 80 ? 'bg-green-100 text-green-700 ring-1 ring-green-200' : 
                analysis.result.score >= 50 ? 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200' : 'bg-red-100 text-red-700 ring-1 ring-red-200'
              }`}>
                Điểm phù hợp: {analysis.result.score}/100
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
                    Điểm mạnh
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    {analysis.result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
               </div>
               <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <h4 className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
                    Cần cải thiện {desiredIndustry ? `(Ngành ${desiredIndustry.split('(')[0].trim()})` : ""}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    {analysis.result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
               </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2 text-lg">
                <Briefcase size={20} className="text-[#06b6d4]" />
                Công việc gợi ý
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {analysis.result.suggestedRoles.map((item, i) => (
                  <div key={i} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:border-cyan-300 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg text-cyan-600 group-hover:scale-110 transition-transform">
                        <Sparkles size={18} />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-800 text-base group-hover:text-[#06b6d4] transition-colors">{item.role}</h5>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="font-semibold text-xs text-gray-400 uppercase block mb-1">Tại sao phù hợp?</span>
                            {item.suitability}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-center opacity-60">
             <div className="w-32 h-32 relative mb-6">
                 <div className="absolute inset-0 bg-cyan-100 rounded-full opacity-50 blur-xl animate-pulse"></div>
                 <img src="https://picsum.photos/200/200?grayscale" alt="AI Waiting" className="w-full h-full object-cover rounded-full border-4 border-white relative z-10" />
             </div>
             <h3 className="text-lg font-bold text-gray-400">AI đang chờ dữ liệu từ CV</h3>
             <p className="text-sm text-gray-400 max-w-xs mt-2">
               Tải file PDF lên để hệ thống trích xuất thông tin và đánh giá chi tiết.
             </p>
             <div className="mt-8 space-y-3 w-full max-w-sm opacity-50">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>
                <div className="h-24 bg-gray-200 rounded-lg"></div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVUploadSection;