import { GoogleGenAI, Type } from "@google/genai";
import { CVAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCVContent = async (text: string, desiredIndustry?: string): Promise<CVAnalysis> => {
  try {
    const prompt = `Phân tích nội dung CV/Sơ yếu lý lịch dưới đây. Đóng vai trò là chuyên gia tuyển dụng (HR) chuyên nghiệp tại Việt Nam.
      
      ${desiredIndustry ? `LƯU Ý QUAN TRỌNG: Ứng viên đang có mong muốn ứng tuyển vào ngành/lĩnh vực: "${desiredIndustry}". Hãy tập trung đánh giá mức độ phù hợp của CV với ngành này.` : ""}

      Nội dung CV: "${text.substring(0, 10000)}"
      
      Trả về kết quả định dạng JSON với các thông tin sau (bắt buộc dùng Tiếng Việt):
      - score: Điểm số từ 0-100 đánh giá chất lượng CV${desiredIndustry ? ` đối với vị trí trong ngành ${desiredIndustry}` : ""}.
      - summary: Tóm tắt 2 câu về chuyên môn của ứng viên.
      - strengths: Mảng gồm 3 điểm mạnh nổi bật nhất của ứng viên${desiredIndustry ? ` liên quan đến ngành ${desiredIndustry}` : ""}.
      - weaknesses: Mảng gồm 3 điểm yếu hoặc kỹ năng cần bổ sung/cải thiện${desiredIndustry ? ` để làm việc tốt trong ngành ${desiredIndustry}. Nếu CV không phù hợp ngành này, hãy nêu rõ lý do.` : ""}.
      - suggestedRoles: Mảng gồm 3 vị trí công việc phù hợp nhất. ${desiredIndustry ? `Ưu tiên các vị trí trong ngành ${desiredIndustry} nếu có thể, hoặc các vị trí liên quan.` : ""} Với mỗi vị trí, bắt buộc cung cấp thuộc tính "suitability" giải thích lý do phù hợp.
      `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
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
          required: ["score", "summary", "strengths", "weaknesses", "suggestedRoles"],
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