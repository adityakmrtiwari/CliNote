# CliNote Frontend

A modern medical scribe application built with Next.js 13, featuring real-time speech recognition and AI-powered SOAP note generation.

## 🚀 Features

### Core Functionality
- **Real-time Speech Recognition**: Uses Web Speech API for live transcription
- **AI-Powered SOAP Notes**: Automatic generation using Google Gemini AI
- **Patient Management**: Complete CRUD operations for patient records
- **Note Management**: Create, edit, and manage medical notes
- **Authentication**: JWT-based secure login/registration

### User Interface
- **Modern Design**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live transcript display during recording
- **Error Handling**: Comprehensive error states and user feedback

## 🛠 Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Speech Recognition**: Web Speech API
- **State Management**: React hooks
- **HTTP Client**: Fetch API with custom service layer

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser with Web Speech API support (Chrome, Edge, Safari)
- Running CliNote backend server

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clinote-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗 Project Structure

```
clinote-frontend/
├── app/                          # Next.js 13 App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (redirects)
│   ├── login/                   # Authentication
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── dashboard/               # Main dashboard
│   │   └── page.tsx
│   ├── create-note/             # Note creation with speech
│   │   └── page.tsx
│   ├── notes/                   # Notes list
│   │   └── page.tsx
│   ├── note/[id]/              # Individual note view
│   │   └── page.tsx
│   ├── patients/               # Patient management
│   │   ├── page.tsx            # Patients list
│   │   └── [id]/
│   │       └── page.tsx        # Patient details
├── components/                  # Reusable components
│   ├── navigation.tsx          # Main navigation
│   └── ui/                     # shadcn/ui components
├── lib/                        # Utilities and services
│   ├── api.ts                  # API service layer
│   └── utils.ts                # Utility functions
└── hooks/                      # Custom React hooks
    └── use-toast.ts
```

## 🎯 Usage Guide

### 1. Authentication
- **Register**: Create a new doctor account
- **Login**: Access your existing account
- **Auto-redirect**: Automatically redirects based on auth status

### 2. Dashboard
- **Overview**: See recent patients and notes
- **Quick Actions**: Start new note, view patients
- **Statistics**: Patient and note summaries

### 3. Creating Notes
1. **Select Patient**: Choose existing or create new patient
2. **Choose Template**: Select note type (SOAP, Progress, etc.)
3. **Record Speech**: Click "Start Recording" and speak naturally
4. **Live Transcript**: See real-time speech-to-text conversion
5. **AI Processing**: Automatic SOAP note generation
6. **Review & Edit**: Edit generated note if needed

### 4. Patient Management
- **View All Patients**: Browse complete patient list
- **Search & Filter**: Find patients quickly
- **Patient Details**: View patient info and associated notes
- **Create Patients**: Add new patients inline during note creation

### 5. Note Management
- **View All Notes**: Browse all medical notes
- **Filter by Status**: Completed, Processing, Draft
- **Filter by Template**: SOAP, Progress, Consultation, etc.
- **Edit Notes**: Modify SOAP sections as needed

## 🔊 Speech Recognition

### Browser Support
- ✅ **Chrome**: Full support
- ✅ **Edge**: Full support  
- ✅ **Safari**: Full support
- ❌ **Firefox**: Limited support

### Usage Tips
- **Clear Speech**: Speak clearly and at moderate pace
- **Quiet Environment**: Minimize background noise
- **Microphone Permissions**: Allow microphone access when prompted
- **Pause/Resume**: Use controls to manage recording
- **Edit Transcript**: Manually edit transcript before processing

### Troubleshooting
- **No Speech Detected**: Check microphone permissions
- **Poor Recognition**: Ensure quiet environment
- **Browser Issues**: Try Chrome or Edge for best results

## 🔗 API Integration

### Backend Endpoints Used
```typescript
// Authentication
POST /api/auth/register
POST /api/auth/login  
GET  /api/auth/profile

// Patients
GET    /api/patients
POST   /api/patients
GET    /api/patients/:id
DELETE /api/patients/:id

// Notes
GET    /api/notes/all
GET    /api/notes/patient/:patientId
PUT    /api/notes/patient/:patientId
GET    /api/notes/note/:id
DELETE /api/notes/patient/:patientId

// AI Processing
POST   /api/ai/generate-soap-and-save
```

### Data Flow
1. **Speech → Transcript**: Web Speech API converts speech to text
2. **Transcript → AI**: Send transcript to backend AI service
3. **AI → SOAP Note**: Gemini AI generates structured SOAP note
4. **Database**: Note saved with patient association
5. **UI Update**: Real-time display of generated note

## 🎨 UI Components

### Custom Components
- **Navigation**: Main app navigation with logout
- **Speech Interface**: Recording controls and waveform
- **Live Transcript**: Real-time speech display
- **Patient Selector**: Dropdown with inline creation
- **SOAP Editor**: Structured note editing interface

### shadcn/ui Components Used
- Button, Card, Input, Select, Dialog
- Textarea, Label, Badge, Alert
- Navigation Menu, Dropdown Menu
- Toast notifications, Loading states

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Route Protection**: Automatic redirects for unauthenticated users
- **API Security**: Authorization headers on all requests
- **Input Validation**: Client-side form validation
- **Error Handling**: Secure error messages

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js apps
- **Netlify**: Static site deployment
- **Docker**: Container deployment
- **Traditional Hosting**: Build and serve static files

## 🐛 Troubleshooting

### Common Issues

1. **Speech Recognition Not Working**
   - Check browser compatibility
   - Verify microphone permissions
   - Try different browser (Chrome recommended)

2. **API Connection Errors**
   - Verify backend server is running
   - Check NEXT_PUBLIC_API_URL in .env.local
   - Ensure CORS is configured on backend

3. **Authentication Issues**
   - Clear localStorage and try again
   - Check JWT token expiration
   - Verify backend auth endpoints

4. **404 Errors**
   - All routes are properly configured
   - Check for typos in navigation links
   - Verify Next.js app router structure

### Development Tips
- Use browser dev tools for debugging
- Check console for error messages
- Monitor network tab for API calls
- Use React Developer Tools extension

## 📱 Browser Compatibility

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| Core App | ✅ | ✅ | ✅ | ✅ |
| Speech Recognition | ✅ | ✅ | ✅ | ❌ |
| All UI Components | ✅ | ✅ | ✅ | ✅ |
| Responsive Design | ✅ | ✅ | ✅ | ✅ |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section above
- Review browser console for errors
- Ensure backend server is running
- Verify environment configuration

---

**Note**: This frontend application requires the CliNote backend server to be running for full functionality. Make sure both services are properly configured and running.