# AI Interviewer

> An AI-powered interview preparation platform designed to help candidates practice realistic interviews, improve their responses, and track their performance.

[![Live Demo](https://img.shields.io/badge/Live-Demo-2563EB?style=for-the-badge)](https://ai-interviewer-silk-five.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/anand-Thakur95/AI-Interviewer)

## Overview

**AI Interviewer** is a full-stack web application that provides an interactive AI-powered mock interview experience.

Users can sign in, select an interview plan, participate in AI-driven interviews, submit responses, and receive performance insights. The platform also includes a **credit-based payment system** for premium interview plans.

The project combines AI integration, authentication, REST APIs, MongoDB, payment processing, and cloud deployment into one production-style application.

## Key Features

- 🤖 AI-powered mock interviews
- 🎤 Interactive interview experience
- ⏱️ Timed interview sessions
- 📊 Interview performance and feedback
- 🔐 Google authentication
- 💳 Credit-based payment plans
- 💰 Premium interview packages
- 📈 Performance analytics
- 📝 Interview history
- 📱 Responsive modern UI

## Screenshots

### 🔐 Google Authentication

Users can securely sign in and start their AI-powered interview journey.

![Google Authentication](./screenshot/ai-1.png)

### 💳 Interview Plans & Pricing

Users can choose between Free, Starter, and Pro plans based on their interview preparation needs.

![Interview Plans](./screenshot/ai-2.png)

### 🤖 AI Smart Interview

The interview interface provides an AI-driven interview session with timed responses and an interactive question-and-answer experience.

![AI Smart Interview](./screenshot/ai-3.png)

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Firebase / Google Authentication |
| AI | AI API Integration |
| Payments | Payment Gateway Integration |
| HTTP Client | Axios |
| Icons | React Icons |
| Deployment | Vercel |

## Core Application Flow

```text
User
 │
 ▼
Google Authentication
 │
 ▼
Dashboard
 │
 ├── Free Plan
 │
 └── Premium Plans
       │
       ▼
   Payment Gateway
       │
       ▼
  Credits Added
       │
       ▼
 AI Smart Interview
       │
       ▼
 Interview Evaluation
       │
       ▼
 Performance Report
```

## Payment & Credit System

The platform uses a credit-based model for interview sessions.

| Plan | Price | Credits |
|---|---:|---:|
| Free | ₹0 | 100 |
| Starter Pack | ₹100 | 150 |
| Pro Pack | ₹500 | 650 |

Premium plans provide additional interview credits and enhanced interview capabilities such as detailed feedback, performance analytics, skill analysis, and priority AI processing.

## Interview Experience

The AI interview screen provides:

- AI interviewer interaction
- Timed response sessions
- Text-based answer input
- Interview status tracking
- Personalized greeting
- AI-powered interview questions
- Performance evaluation

## Security

The application follows common security practices including:

- Google/Firebase authentication
- Protected API routes
- Environment-based secret management
- Secure payment verification
- MongoDB authentication
- CORS configuration
- Sensitive credentials excluded from source control

## Deployment

The application is designed for cloud deployment with:

```text
Frontend  → Vercel
Backend   → Vercel
Database  → MongoDB Atlas
AI        → AI API
Payments  → Payment Gateway
```

Production environment variables should be configured in the deployment platform rather than committed to the repository.

## Future Improvements

- [ ] Resume-based interview generation
- [ ] Advanced AI response evaluation
- [ ] Voice interview improvements
- [ ] Multiple interview categories
- [ ] Difficulty-based interviews
- [ ] Advanced performance analytics
- [ ] Subscription management
- [ ] Email notifications
- [ ] Admin dashboard

## What I Learned

Building this project provided hands-on experience with:

- MERN stack development
- AI API integration
- Google authentication
- REST API architecture
- MongoDB and Mongoose
- Payment gateway integration
- Credit-based product design
- Environment variable management
- Vercel deployment
- Production debugging

## Author

### Anand Thakur

**MERN Stack Developer**

- GitHub: [@anand-Thakur95](https://github.com/anand-Thakur95)
- LinkedIn: [Anand Thakur](https://linkedin.com/in/anand-thakur01)
- Portfolio: [portfolio-anand-72.vercel.app](https://portfolio-anand-72.vercel.app/)

## License

This project is developed for educational and portfolio purposes.

---

⭐ If you find this project useful, consider giving it a star!
