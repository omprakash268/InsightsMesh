import { GoogleGenAI } from "@google/genai";

// Load API key from environment variables
const apiKey = import.meta.env.VITE_API_KEY;

// Fail fast if API key is missing
if (!apiKey) {
  console.warn("VITE_API_KEY is not defined in your environment.");
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Generate a response from Gemini using the provided prompt.
 * @param {string} prompt - The user input or message to send to the model.
 * @returns {Promise<string>} - The model-generated response.
 */
async function runGenAI(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error("Prompt must be a non-empty string.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response?.text || "No response received from Gemini.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I couldn't generate a response. Please try again later.";
  }
}

export default runGenAI;
