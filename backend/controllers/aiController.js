import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export const generateEmail = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const prompt = "Write a professional email to a client.";

    const result = await model.generateContent(
      `You are an assistant that writes professional, polite emails.\n\n${prompt}`
    );
    console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY?.slice(0, 8) + "...");

    const emailContent = result.response.text();
    res.json({ emailContent });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to generate email via Gemini" });
  }
};



