import express from "express";
import { createServer as createViteServer } from "vite";
import twilio from "twilio";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// Twilio setup
const MessagingResponse = twilio.twiml.MessagingResponse;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize Twilio Client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// WhatsApp Webhook
app.all("/api/whatsapp", async (req, res) => {
  const incomingMsg = req.method === 'POST' ? req.body.Body : req.query.Body;
  const from = req.method === 'POST' ? req.body.From : req.query.From;

  if (!incomingMsg) {
    return res.status(200).send("WhatsApp Webhook is active. Please send a POST request with a Body.");
  }

  console.log(`Received message from ${from}: ${incomingMsg}`);

  const twiml = new MessagingResponse();

  try {
    // Generate response using Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: incomingMsg,
      config: {
        systemInstruction: "You are a helpful agricultural assistant for farmers. Keep it simple and practical. Respond in the language the user is using (English or Hindi).",
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't process that.";
    twiml.message(replyText);
  } catch (error) {
    console.error("Gemini Error:", error);
    twiml.message("Sorry, I'm having trouble thinking right now. Please try again later.");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

// WhatsApp Status Callback
app.post("/api/whatsapp/status", (req, res) => {
  const messageSid = req.body.MessageSid;
  const messageStatus = req.body.MessageStatus;
  console.log(`Message ${messageSid} status: ${messageStatus}`);
  res.sendStatus(200);
});

// Send WhatsApp Template Message
app.post("/api/whatsapp/send-template", async (req, res) => {
  const { to, contentSid, contentVariables } = req.body;

  if (!to || !contentSid) {
    return res.status(400).json({ error: "Missing 'to' or 'contentSid'" });
  }

  try {
    const message = await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER || '+14155238886'}`,
      to: `whatsapp:${to}`,
      contentSid: contentSid,
      contentVariables: JSON.stringify(contentVariables || {}),
    });

    console.log(`Template message sent: ${message.sid}`);
    res.json({ success: true, sid: message.sid });
  } catch (error: any) {
    console.error("Twilio Template Error:", error);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
