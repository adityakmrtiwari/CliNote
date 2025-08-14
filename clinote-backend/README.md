# 🩺 Clinote Backend – AI Medical Scribe

Clinote is a backend service for a modern AI-powered medical scribe platform. It enables doctors to manage patients, record doctor-patient conversations, and generate structured SOAP notes using LLMs like Gemini.

---

## 🚀 Features

- ✅ Secure JWT Authentication
- ✅ Patient Management (Create, List)
- ✅ Audio Upload to Cloudinary
- ✅ AI-Powered SOAP Note Generation (Gemini 1.5 Flash)
- ✅ Transcription-ready endpoints (Web Speech API / Deepgram-ready)
- ✅ Notes Management (CRUD)
- ✅ MongoDB with Mongoose
- ✅ Error Handling & Modular Structure

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Cloudinary (Audio Storage)**
- **Google Gemini API (LLM)**
- **JWT for Authentication**
- **Postman for Testing**
- **CORS, Helmet (optional)**

---

## 📂 Folder Structure

```
clinote-backend/
│
├── config/           # Cloudinary, DB, Gemini setup
├── controllers/      # Route handler logic
├── models/           # Mongoose schemas (User, Patient, Note)
├── routes/           # Express routers (auth, notes, etc.)
├── middlewares/      # Auth & error middleware
├── utils/            # File upload util
├── .env              # Environment variables
├── server.js         # Entry point
└── README.md
```

---

## 📦 API Endpoints (Base: `/api`)

### Auth
| Method | Endpoint         | Desc             |
|--------|------------------|------------------|
| POST   | `/auth/register` | Register a user  |
| POST   | `/auth/login`    | Login & get token|
| GET    | `/auth/profile`  | Get user profile |

### Patients
| Method | Endpoint        | Desc               |
|--------|-----------------|--------------------|
| POST   | `/patients`     | Add new patient    |
| GET    | `/patients`     | List user patients |

### Audio
| Method | Endpoint           | Desc                     |
|--------|--------------------|--------------------------|
| POST   | `/audio/upload`    | Upload audio to Cloudinary |

### AI (SOAP Notes)
| Method | Endpoint                   | Desc                       |
|--------|----------------------------|----------------------------|
| POST   | `/ai/generate-soap-and-save` | Generate SOAP note from transcript |

### Notes
| Method | Endpoint              | Desc               |
|--------|-----------------------|--------------------|
| POST   | `/notes`              | Create note        |
| GET    | `/notes/:patientId`   | Get notes by patient |
| GET    | `/notes/note/:id`     | Get single note    |
| PUT    | `/notes/note/:id`     | Update note        |
| DELETE | `/notes/note/:id`     | Delete note        |

---

## 🔐 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gemini
GEMINI_API_KEY=your_google_gemini_api_key

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://yourfrontend.com
```

---

## 🧪 Run Locally

```bash
git clone https://github.com/yourusername/clinote-backend.git
cd clinote-backend

npm install
npm run dev
```

Use Postman or your frontend to interact with the APIs.

---

## 🔐 Deployment Notes

- Use **MongoDB Atlas** for cloud DB.
- Add env vars in your deployment platform (Render, Railway, etc.)
- Secure `.env` (never commit).
- Use `pm2` in production if self-hosting.

---

## 🧠 Future Scope

- Deepgram API for accurate audio-to-text
- Admin Panel
- FHIR integration (EMR-ready)
- Billing integration

---

## 👨‍💻 Author

**Aditya Kumar Tiwari**  
[Portfolio](https://adityakmrtiwari-github-io.vercel.app/) · [LinkedIn](https://linkedin.com/in/adityakmrtiwari)