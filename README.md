# CineSine V1

A premium wedding photography and cinematography portfolio web application built with React (Vite) frontend and Node.js/Express backend.

## 🚀 Live URLs

- **Frontend:** [https://cinesinev1f.vercel.app](https://cinesinev1f.vercel.app)
- **Backend API:** [https://cinesinev1.vercel.app/api](https://cinesinev1.vercel.app/api)

## 📁 Project Structure

```
CineSineV1/
├── backend/               # Express.js API server
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   ├── .env.example      # Environment variables template
│   └── vercel.json       # Vercel deployment config
│
├── frontend/             # React + Vite application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── api.js        # API service layer
│   │   └── App.jsx       # Main app component
│   ├── .env.example      # Environment variables template
│   └── vercel.json       # Vercel deployment config
│
└── PROJECT_DOCUMENTATION.md
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd CineSineV1/backend
cp .env.example .env
# Edit .env with your values
npm install
npm run dev
```

### Frontend Setup

```bash
cd CineSineV1/frontend
cp .env.example .env
# Edit .env with your values
npm install
npm run dev
```

## 🌐 Vercel Deployment

### Backend Environment Variables (Vercel Dashboard)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://cinesinev1f.vercel.app` |
| `EMAIL_USERNAME` | Gmail for contact form | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail App Password | `xxxx xxxx xxxx xxxx` |
| `NODE_ENV` | Environment | `production` |

### Frontend Environment Variables (Vercel Dashboard)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://cinesinev1.vercel.app/api` |

> ⚠️ **CRITICAL:** The `VITE_API_URL` **MUST** include `/api` at the end!
> - ✅ Correct: `https://cinesinev1.vercel.app/api`
> - ❌ Wrong: `https://cinesinev1.vercel.app`
> - ❌ Wrong: `https://cinesinev1.vercel.app/api/`

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stories` | Get all stories |
| GET | `/api/stories/:id` | Get story by ID |
| POST | `/api/stories` | Create new story |
| PUT | `/api/stories/:id` | Update story |
| DELETE | `/api/stories/:id` | Delete story |
| GET | `/api/films` | Get all films |
| GET | `/api/pre-weddings` | Get all pre-weddings |
| GET | `/api/photobooks` | Get all photobooks |
| GET | `/api/images` | Get all gallery images |
| POST | `/api/contact` | Submit contact form |

## 📄 License

MIT
