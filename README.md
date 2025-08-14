# 🩺 CliNote - AI Medical Scribe

CliNote is a modern AI-powered web application for doctors to record, transcribe, and generate structured medical notes from patient consultations.

## 🚀 Features
- 🎙️ **Audio Recording**: Record doctor-patient conversations.
- 📝 **AI Transcription**: Convert speech to text using advanced speech-to-text models.
- 🧠 **SOAP Note Generation**: Automatically generate **Subjective, Objective, Assessment, Plan** notes with Gemini AI.
- 📂 **Patient Templates**: Organize notes by patient profiles.
- ☁️ **Cloud Storage**: Audio stored in Cloudinary, notes stored in MongoDB.
- 🔐 **Secure Access**: JWT authentication, role-based access.

## 🛠️ Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI/ML**: Google Gemini API
- **Storage**: Cloudinary

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/adityakmrtiwari/CliNote.git
cd clinote

# Install backend dependencies
cd clinote-backend
npm install

# Install frontend dependencies
cd ../clinote-frontend
npm install
```

## ▶️ Running the App
```bash
# Start backend (from clinote-backend)
npm run dev

# Start frontend (from clinote-frontend)
npm run dev
```

## ⚠️ Environment Variables
Create a `.env` file in both `clinote-backend` and `clinote-frontend` directories with:
```
# Backend
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## 📄 License
This project is licensed under the MIT License.
