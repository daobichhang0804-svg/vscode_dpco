import express from "express";
import path from "path";
import { processChatRequest } from "./server/chatService";
import { createClient } from "@supabase/supabase-js";

const rawSupabaseUrl = (process.env.VITE_SUPABASE_URL || 'https://ybitklruurxnuoyzusdp.supabase.co').trim();
const SUPABASE_URL = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const SUPABASE_ANON_KEY = (process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6sWO6mHNShTmsMToa8-5Pw_R1RD65dz').trim();
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function startServer() {
  const app = express();
  
  // Detect if running in production (either NODE_ENV=production or running the built server.cjs)
  const isProduction = process.env.NODE_ENV === "production" || Boolean(process.argv[1]?.endsWith("server.cjs"));
  
  // In dev environment, port 3000 is required by the nginx proxy.
  // In Cloud Run production deployment, listen on the port provided by Cloud Run (process.env.PORT, default 8080).
  const PORT = isProduction ? Number(process.env.PORT || 8080) : 3000;

  app.use(express.json({ limit: "10mb" }));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: isProduction ? "production" : "development", port: PORT });
  });

  // AI Sales Assistant Chatbot Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, userLocation } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await processChatRequest(message, history, userLocation);
      return res.json(response);
    } catch (err: any) {
      console.error("Error in /api/chat:", err);
      return res.status(500).json({
        error: "Internal Server Error",
        reply: "Đã có lỗi xảy ra khi xử lý phản hồi. Quý khách vui lòng thử lại hoặc liên hệ hotline kinh doanh 094 828 1881."
      });
    }
  });

  // Lead capture endpoint for quotation requests submitted via Chat
  app.post("/api/lead", async (req, res) => {
    try {
      const { full_name, company_name, email, phone, requirements } = req.body;
      if (!phone && !email) {
        return res.status(400).json({ error: "Phone or email required" });
      }

      const { data, error } = await supabase.from("customers").insert([
        {
          full_name: full_name || "Khách hàng B2B (AI Chat)",
          company_name: company_name || "Chưa cập nhật",
          email: email || null,
          phone: phone || null,
          requirements: requirements || "Yêu cầu báo giá từ trợ lý ảo AI",
          created_at: new Date().toISOString()
        }
      ]);

      if (error) {
        console.warn("Supabase lead insert warning:", error.message);
      }

      return res.json({ success: true, message: "Lead captured successfully" });
    } catch (err: any) {
      console.error("Error capturing lead:", err);
      return res.status(500).json({ error: "Failed to record lead" });
    }
  });

  // Serve Vite in development or static pre-built bundle in production
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (${isProduction ? "production" : "development"})`);
  });
}

startServer();
