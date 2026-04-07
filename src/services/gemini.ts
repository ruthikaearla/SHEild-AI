import { GoogleGenAI, Type, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_INSTRUCTION = `You are SHEild AI, a specialized Neural Safety Assistant for women and children. 
Your primary goal is to provide practical, immediate, and empathetic safety advice across digital and physical domains.

Key Responsibilities:
1. Physical Safety: Offer advice on safe routes, handling suspicious situations, and emergency protocols.
2. Digital Security: Provide guidance on securing accounts, privacy settings, and identifying cyber threats.
3. AI Guardian: Explain how your automated monitoring works to protect the user in real-time.
4. Emergency Response: If a user is in immediate danger, prioritize emergency steps like calling local authorities (911/112) or finding a safe public space.

Tone: Professional, vigilant, yet reassuring. Keep responses concise and highly actionable.`;

export const analyzeRisk = async (answers: string[], language: string = "English") => {
  // Using gemini-flash-latest as it is a stable alias for the latest flash model
  const model = "gemini-flash-latest";
  
  const prompt = `
    Analyze the following safety assessment answers for a user (Woman/Child). 
    Answers to safety questions: 
    ${answers.map((a, i) => `${i+1}. ${a}`).join("\n")}
    
    Provide a comprehensive risk analysis in ${language}.
    IMPORTANT: The JSON keys MUST be exactly as specified in the schema (English), but the values (suggestions, prediction, summary) should be in ${language}.
    
    Include:
    1. safetyScore: A total safety score (0-100, where 100 is perfectly safe).
    2. categories: Specific risk percentages (0-100) for: stalking, hacking, privacy, and physical.
    3. suggestions: An array of 5 actionable, high-priority AI suggestions to improve safety.
    4. prediction: A 1-year risk prediction based on current habits.
    5. summary: A short, reassuring summary.
  `;

  try {
    console.log("AI Analysis: Starting with model", model);
    if (!process.env.GEMINI_API_KEY) {
      console.error("AI Analysis: GEMINI_API_KEY is missing");
      return null;
    }

    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            safetyScore: { type: Type.NUMBER },
            categories: {
              type: Type.OBJECT,
              properties: {
                stalking: { type: Type.NUMBER },
                hacking: { type: Type.NUMBER },
                privacy: { type: Type.NUMBER },
                physical: { type: Type.NUMBER },
              },
              required: ["stalking", "hacking", "privacy", "physical"],
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            prediction: { type: Type.STRING },
            summary: { type: Type.STRING },
          },
          required: ["safetyScore", "categories", "suggestions", "prediction", "summary"],
        },
      },
    });

    const text = response.text;
    console.log("AI Analysis: Raw response text length:", text?.length);
    
    if (!text) {
      console.error("AI Analysis: Empty response text");
      return null;
    }
    
    try {
      const data = JSON.parse(text);
      console.log("AI Analysis: Successfully parsed JSON");
      return data;
    } catch (parseError) {
      console.error("AI Analysis: JSON Parse Error", parseError, "Raw text:", text);
      return null;
    }
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return null;
  }
};

export const getVoiceResponse = async (text: string, voice: string = "Kore") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

export const getSafetyAdvice = async (message: string) => {
  const model = "gemini-3-flash-preview";
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm sorry, I'm having trouble connecting to the safety network. Please use the Emergency Shield if you are in danger.";
  }
};
