import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

async function runGenAI(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text;
}

export default runGenAI;