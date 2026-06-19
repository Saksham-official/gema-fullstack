import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { enquirySchema } from './validators/enquiry.validator.js';
import { saveEnquiryToDb, getEnquiriesFromDb } from './models/enquiry.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kidrove_enquiries';

app.use(cors());
app.use(express.json());

async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.warn('Could not connect to MongoDB. Falling back to local JSON file db.');
  }
}

connectDb();

app.get('/api/status', (req: Request, res: Response) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'online',
    database: isMongoConnected ? 'mongodb' : 'local-json-fallback',
    timestamp: new Date()
  });
});
app.get('/api/enquiries', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const enquiries = await getEnquiriesFromDb();
    res.json({
      success: true,
      data: enquiries
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    next(error);
  }
});

app.post('/api/enquiry', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parseResult = enquirySchema.safeParse(req.body);
    
    if (!parseResult.success) {
      const formattedErrors = parseResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formattedErrors
      });
      return;
    }

    const savedRecord = await saveEnquiryToDb(parseResult.data);
    
    res.status(201).json({
      success: true,
      message: 'Enquiry registered successfully!',
      data: savedRecord
    });
  } catch (error) {
    console.error('Error handling enquiry:', error);
    next(error);
  }
});

app.post('/api/chat', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ success: false, message: 'Messages array is required' });
      return;
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
      let reply = "Hi! I am the Kidrove assistant. Ask me anything about the Summer Workshop!";
      
      if (userMessage.includes('price') || userMessage.includes('fee') || userMessage.includes('cost') || userMessage.includes('money') || userMessage.includes('pay') || userMessage.includes('rupees') || userMessage.includes('charge')) {
        reply = "The workshop fee is ₹2,999. This is a one-time fee that covers the entire 4-week course, certificates, and coding platform access.";
      } else if (userMessage.includes('age') || userMessage.includes('years') || userMessage.includes('kid') || userMessage.includes('old') || userMessage.includes('child')) {
        reply = "The workshop is designed for kids aged 8 to 14 years old. The curriculum starts from scratch and is very beginner-friendly.";
      } else if (userMessage.includes('date') || userMessage.includes('start') || userMessage.includes('when') || userMessage.includes('schedule')) {
        reply = "We start on 15 July 2026. The camp runs for 4 weeks with online live interactive sessions twice a week (weekends).";
      } else if (userMessage.includes('online') || userMessage.includes('mode') || userMessage.includes('where') || userMessage.includes('remote') || userMessage.includes('live')) {
        reply = "The workshop is fully online. Classes are held live with active 1:1 interaction, Q&A, and mentorship.";
      } else if (userMessage.includes('learn') || userMessage.includes('syllabus') || userMessage.includes('outcome') || userMessage.includes('what') || userMessage.includes('topics')) {
        reply = "Kids will learn the basics of robotics, computational logic using blocks, and train computer vision AI models (like face/gesture detection).";
      }

      res.json({ success: true, message: reply });
      return;
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant for Kidrove's 'AI & Robotics Summer Workshop' for kids.
Use these details to answer queries:
- Target age: 8-14 years.
- Duration: 4 weeks (starting 15 July 2026).
- Mode: Online live interactive sessions twice a week (1.5 hours each).
- Course Fee: ₹2,999 (one-time fee).
- Content: Robotics basics, logic blocks, and training webcam AI models.
Keep your answers brief (1-3 sentences), child-friendly, polite, and directly related to the workshop.`
          },
          ...messages
        ],
        temperature: 0.5,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', errorText);
      res.status(502).json({ success: false, message: 'Could not connect to AI service' });
      return;
    }

    const data: any = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    res.json({ success: true, message: reply });
  } catch (error) {
    console.error('Error handling chat request:', error);
    next(error);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
