import { GoogleGenAI, Type } from "@google/genai";
import { CVAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCVContent = async (
  fileData: { data: string; mimeType: string } | null,
  text: string | null,
  desiredIndustry?: string
): Promise<CVAnalysis> => {
  try {
    const promptText = `Bạn là một chuyên gia tuyển dụng (HR) hàng đầu tại Việt Nam. Nhiệm vụ của bạn là trích xuất thông tin và phân tích CV/Sơ yếu lý lịch được cung cấp dưới đây.

      ${desiredIndustry ? `LƯU Ý QUAN TRỌNG: Ứng viên mong muốn ứng tuyển vào ngành: "${desiredIndustry}".` : ""}

      Yêu cầu xử lý:
      1. ĐỌC KỸ tài liệu được cung cấp (File PDF hoặc Text).
      2. TRÍCH XUẤT chính xác Họ và Tên ứng viên từ tài liệu.
      3. TÓM TẮT quá trình làm việc/kinh nghiệm thực tế ghi trong CV.
      4. ĐÁNH GIÁ điểm mạnh, điểm yếu và gợi ý công việc dựa trên dữ liệu thực tế trong CV.

      Tuyệt đối KHÔNG được bịa đặt thông tin không có trong CV. Nếu không tìm thấy tên, trả về "Không xác định".

      Trả về kết quả định dạng JSON với các trường sau (Tiếng Việt):
      - fullName: Họ và tên ứng viên trích xuất từ CV.
      - experience: Đoạn văn ngắn tóm tắt các vị trí và công ty ứng viên đã làm việc (dựa trên dữ liệu scan được).
      - score: Điểm số 0-100 đánh giá chất lượng CV${desiredIndustry ? ` cho ngành ${desiredIndustry}` : ""}.
      - summary: Nhận xét tổng quan 2 câu về năng lực.
      - strengths: 3 điểm mạnh nổi bật tìm thấy trong CV.
      - weaknesses: 3 điểm yếu hoặc kỹ năng còn thiếu${desiredIndustry ? ` so với yêu cầu ngành ${desiredIndustry}` : ""}.
      - suggestedRoles: 3 vị trí công việc phù hợp nhất. Kèm "suitability" giải thích lý do dựa trên kinh nghiệm có trong CV.
      `;

    const parts: any[] = [];
    
    // Add file content if available
    if (fileData) {
        parts.push({
            inlineData: {
                data: fileData.data,
                mimeType: fileData.mimeType
            }
        });
    }

    // Add text instructions (and text content if provided instead of file)
    parts.push({
        text: fileData ? promptText : `${promptText}\n\nNội dung văn bản CV:\n"${text}"`
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fullName: { type: Type.STRING },
            experience: { type: Type.STRING },
            score: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedRoles: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT,
                properties: {
                    role: { type: Type.STRING },
                    suitability: { type: Type.STRING }
                },
                required: ["role", "suitability"]
              } 
            },
          },
          required: ["fullName", "experience", "score", "summary", "strengths", "weaknesses", "suggestedRoles"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as CVAnalysis;
    }
    throw new Error("Không nhận được phản hồi từ AI");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};