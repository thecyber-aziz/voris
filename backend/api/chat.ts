// for Vercel Only
// otherwise run main file /src/index.ts

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { chatController } from '../src/controllers/chat.controller'

export default function handler(req: VercelRequest, res: VercelResponse) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Your actual logic
  return chatController(req as any, res as any);
}