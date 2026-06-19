import mongoose, { Schema, Document } from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  age?: number;
  createdAt: Date;
}

const EnquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export const EnquiryModel = mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const FILE_PATH = path.join(DATA_DIR, 'enquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Fallback utility to save local JSON file if mongo isn't available
export async function saveEnquiryToDb(data: { name: string; email: string; phone: string; age?: number }): Promise<any> {
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (isMongoConnected) {
    try {
      const newEnquiry = new EnquiryModel(data);
      return await newEnquiry.save();
    } catch (error) {
      console.error('MongoDB save failed, switching to local storage:', error);
    }
  }

  let enquiries = [];
  
  if (fs.existsSync(FILE_PATH)) {
    try {
      const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
      enquiries = JSON.parse(fileData);
    } catch (e) {
      console.error('Error parsing local enquiries file:', e);
    }
  }

  const record = {
    _id: new mongoose.Types.ObjectId().toString(),
    ...data,
    createdAt: new Date()
  };

  enquiries.push(record);
  fs.writeFileSync(FILE_PATH, JSON.stringify(enquiries, null, 2), 'utf-8');
  return record;
}

export async function getEnquiriesFromDb(): Promise<any[]> {
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (isMongoConnected) {
    try {
      return await EnquiryModel.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error('MongoDB fetch failed, switching to local storage:', error);
    }
  }

  if (fs.existsSync(FILE_PATH)) {
    try {
      const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
      const enquiries = JSON.parse(fileData);
      return [...enquiries].reverse();
    } catch (e) {
      console.error('Error parsing local enquiries file:', e);
    }
  }

  return [];
}
