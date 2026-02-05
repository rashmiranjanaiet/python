import { GoogleGenAI, Type, Schema } from "@google/genai";
import { EnvironmentalData, RiskAnalysis } from "../types";

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    riskLevel: {
      type: Type.STRING,
      enum: ["Low", "Medium", "High", "Critical"],
      description: "The overall risk level based on environmental factors."
    },
    probability: {
      type: Type.STRING,
      description: "The percentage probability of an outbreak (e.g., '85%')."
    },
    primaryThreat: {
      type: Type.STRING,
      description: "The most likely disease (Cholera, Typhoid, or Leptospirosis)."
    },
    analysis: {
      type: Type.STRING,
      description: "A 2-sentence biological explanation of why conditions increase risk."
    },
    actionPlan: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 specific bullet points for local health officials."
    },
    citation: {
      type: Type.STRING,
      description: "Relevant health guideline citation (WHO/IDSP)."
    }
  },
  required: ["riskLevel", "probability", "primaryThreat", "analysis", "actionPlan", "citation"]
};

export const generateRiskAssessment = async (data: EnvironmentalData): Promise<RiskAnalysis> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as a Senior Epidemiologist and Data Scientist specializing in water-borne diseases (Cholera, Typhoid, Leptospirosis) in Northeast India.
    
    Analyze the following environmental data:
    - Location: ${data.location}
    - Temperature: ${data.temperature}°C
    - Humidity: ${data.humidity}%
    - Rainfall: ${data.rainfall}mm (Last 24h)

    Provide a structured health risk assessment.
    Tone: Professional, clinical, and urgent.
    
    Context:
    - High rainfall and humidity in NE India often lead to waterlogging, increasing Leptospirosis and Cholera risk.
    - Higher temperatures can accelerate bacterial growth (Salmonella typhi, Vibrio cholerae).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.3, // Low temperature for more analytical/consistent results
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from AI");
    }

    return JSON.parse(resultText) as RiskAnalysis;
  } catch (error) {
    console.error("Error generating assessment:", error);
    throw error;
  }
};
