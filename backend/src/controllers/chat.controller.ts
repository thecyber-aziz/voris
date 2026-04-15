import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { chatSchema } from "../validation/chat.schema";

export const chatController = async (req: Request, res: Response) => {
  try {
    const result = chatSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ success: false, message: result.error.issues[0].message });

    const { message, history, model, systemPrompt, apiKey } = result.data;
    const finalApiKey = apiKey || process.env.GEMINI_API_KEY;

    // console.log("apiKey",apiKey)
    // console.log("finalApiKey",finalApiKey)
    
    const ai = new GoogleGenAI({ apiKey: finalApiKey });
    
    // if Model is GEMINI set systemInstruction and tools, else {}
    let config = {};
    const isGEMINI = model?.split("-")[0] === "gemini";
    if(isGEMINI) config = { systemInstruction: systemPrompt, tools: [{ googleSearch: {} }] }

    const stream = await ai.models.generateContentStream({
      model: model ?? "gemini-2.5-flash-lite",
      config,
      contents: [
        ...history.slice(-5).map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        { role: "user", parts: [{ text: message }] },
      ],
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.flushHeaders();

    for await (const chunk of stream) if (chunk.text) res.write(chunk.text);
    res.end();
  } catch (err: any) {
    //console.log(err);
    if (err.name === "ApiError" && err.status === 429) return res.status(err.status).json({ success: false, message: "API rate limit exceeded" });
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const validateKey = async (req: Request, res: Response) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey?.trim()) return res.status(400).json({ message: "API key required" });
    
    const ai = new GoogleGenAI({ apiKey });

    await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
    });

    res.json({ success: true, message: "API key is valid" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: "Invalid API key" });
  }
};