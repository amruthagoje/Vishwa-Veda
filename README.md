# 🌿 Vishwa Veda

AI-Powered Ayurvedic Healthcare Platform
Vishwa Veda is a modern digital platform designed to streamline Panchakarma and Ayurvedic healthcare services. It integrates AI-driven assistance with real-time cloud infrastructure powered by Firebase.
🚀 Features
🤖 AI Chat Assistant (Veda AI)
Smart conversational assistant for symptom guidance and therapy suggestions.
📅 Real-Time Appointment Booking
Book consultations with live availability updates.
📊 Therapy Progress Tracking
Monitor treatment progress with interactive dashboards.
🔐 Secure Authentication (Firebase Auth)
User login & signup with secure cloud authentication.
☁️ Cloud Database (Firestore)
Real-time storage of appointments, user data, and chat interactions.
🚀 Fast Deployment (Firebase Hosting)
Production-ready deployment with global CDN.
🛠 Tech Stack
Frontend
React + Vite
Tailwind CSS
Framer Motion
Lucide React
Recharts
Backend / Cloud
Firebase Authentication
Cloud Firestore
Firebase Hosting
📦 Installation
git clone https://github.com/your-username/vishwa-veda.git
cd vishwa-veda
npm install
npm run dev
🔥 Firebase Setup
Create project on Firebase Console
Enable:
Authentication
Firestore Database
Add your Firebase config inside:
src/firebase.js
Example:
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
🚀 Deployment (Firebase Hosting)
npm run build
firebase login
firebase init
firebase deploy
🌍 Vision
To digitize Ayurvedic healthcare infrastructure and build India’s most advanced Panchakarma management ecosystem powered by AI and cloud technology.
