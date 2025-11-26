import { GoogleGenAI } from "@google/genai";
import { FormData } from '../types';

export const generateGameCode = async (formData: FormData): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please configure process.env.API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Prompt Engineering based on user role requirements
  const prompt = `
    ROLE: Expert Game Development Programmer.
    
    OBJECTIVE: Generate complete, functional, optimized, and high-quality game code based on the following specifications.
    
    USER SPECIFICATIONS:
    1. PROGRAMMING LANGUAGE: ${formData.language}
    2. ENGINE/FRAMEWORK: ${formData.engine}
    3. GAME CONCEPT: ${formData.concept}
    4. SPECIFIC TASK: ${formData.task}
    5. CONSTRAINTS: ${formData.constraints}
    
    OUTPUT RULES:
    1. Clarity: Include explanatory comments.
    2. Completeness: Provide the full script. No placeholders.
    3. Format: Enclose code in markdown code blocks (e.g., \`\`\`csharp ... \`\`\`).
    4. Explanation: Precede code with a brief 1-2 sentence summary.
    
    Execute.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
        throw new Error("No content generated.");
    }
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate code. Please try again.");
  }
};