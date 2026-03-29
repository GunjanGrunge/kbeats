# K Beats Landing Page - Product Requirements Document

## Original Problem Statement
Build a premium, futuristic landing page for K Beats music channel (Instagram, YouTube, SoundCloud) that:
- Showcases their music mixing and trending song remix services
- Provides custom music services for vlogs, events, weddings, and special moments
- Supports individual artists in mixing and music production
- Includes a conversational AI chatbot to understand requirements and collect client info
- Features premium design inspired by landonorris.com with smooth animations and CTAs
- Has a polished K BEATS logo/branding
- Sends email notifications to artists@kebeatsofficial.com when leads come in

## User Personas
1. **Content Creators** - Need custom music for vlogs and videos
2. **Event Planners** - Looking for wedding and event music services
3. **Independent Artists** - Seeking production and mixing support
4. **Music Enthusiasts** - Interested in trending remixes and custom edits

## Core Architecture

### Frontend (React)
- **Components:**
  - `LandingPage.jsx` - Main container with Lenis smooth scroll
  - `Navbar.jsx` - Fixed navigation with glassmorphism
  - `HeroSection.jsx` - Hero with massive K BEATS logo, stats, CTAs
  - `MarqueeSection.jsx` - Infinite scrolling text marquee
  - `ServicesSection.jsx` - 6 service cards with CTA buttons (Chat/Email)
  - `AboutSection.jsx` - Brand story with signature element
  - `SocialSection.jsx` - Large social platform links
  - `FooterSection.jsx` - Footer with K BEATS logo marquee and email
  - `ChatbotWidget.jsx` - AI-powered chat interface with headphones icon

- **Styling:** 
  - Electric lime (#ccff00) on pure black (#050505)
  - Unbounded font for headings, Outfit for body
  - Framer Motion for scroll animations
  - Lenis for smooth scrolling
  - react-fast-marquee for infinite scrollers
  - Music-themed icons (headphones) for chat button and avatar

### Backend (FastAPI + MongoDB)
- **Models:**
  - `ChatMessage` - Stores user/assistant messages per session
  - `MusicInquiry` - Stores client inquiries with contact info and conversation history
  - `ContactForm` - Direct contact submissions

- **Routes:**
  - `/api/chat/message` - Send message to Claude chatbot and get SSE response
  - `/api/chat/history/{session_id}` - Retrieve conversation history
  - `/api/chat/inquiry/{session_id}/update` - Update inquiry with contact details
  - `/api/contact/submit` - Submit contact form
  - `/api/contact/inquiries` - Get all inquiries (admin)

- **Services:**
  - `chatbot.py` - Claude Sonnet 4.5 integration
  - `email_service.py` - SendGrid integration for lead notifications

## What's Been Implemented (Dec 29, 2025)

### ✅ Complete Frontend Redesign
1. **Premium Hero Section**
   - K BEATS massive logo with lime/white styling
   - Neon abstract background image
   - Primary/secondary CTAs
   - Stats: 500+ Projects, 3 Platforms, 24/7 Support
   - Side social links (YT, IG, SC)

2. **Marquee Section**
   - Two-track infinite scrolling marquee
   - Alternating solid/outline typography

3. **Services Grid with CTAs**
   - 6 detailed service cards
   - Feature bullet points for each service
   - "Chat with K Beats AI" CTA button
   - "artists@kebeatsofficial.com" email CTA button

4. **About Section**
   - Abstract image with lime border accent
   - "2024 Crafting Sound" tag
   - Signature element and quote

5. **Social Section**
   - Large typography social links

6. **Footer**
   - "Ready to Create?" CTA with email button
   - K BEATS logo marquee with headphones icons
   - Email: artists@kebeatsofficial.com
   - Full service list in footer

7. **Chatbot Widget**
   - Music-themed headphones icon (not overlapping with Emergent badge)
   - Headphones avatar in chat header
   - Small headphones next to AI messages
   - "Or email us directly: artists@kebeatsofficial.com" link
   - Rounded chat bubbles

### ✅ Backend Implementation
- Claude Sonnet 4.5 chatbot integration
- Lead capture to MongoDB (9+ leads captured)
- SendGrid email service (pending sender verification)
- Background task for email notifications

## Contact Information
- **Email:** artists@kebeatsofficial.com
- **YouTube:** https://www.youtube.com/@Kbeats_official
- **Instagram:** https://www.instagram.com/kbeatsofficial/
- **SoundCloud:** https://soundcloud.com/k-beats-291187445

## Environment Variables

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://audio-canvas-40.preview.emergentagent.com
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

### Backend (.env)
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
EMERGENT_LLM_KEY=sk-emergent-xxx
SENDGRID_API_KEY=SG.xxx
KBEATS_EMAIL=artists@kebeatsofficial.com
```

## Action Required: Email Verification

The SendGrid email notifications are coded and ready, but the sender email needs verification:

1. Log into SendGrid at https://app.sendgrid.com
2. Go to Settings → Sender Authentication
3. Either:
   - **Option A:** Verify the domain `kebeatsofficial.com` (recommended)
   - **Option B:** Create a Single Sender and verify `artists@kebeatsofficial.com`
4. Once verified, emails will automatically start sending

**Note:** Leads are still being captured in the database regardless of email status.

## Prioritized Backlog

### P0 (Completed)
- [x] Premium landing page redesign
- [x] Music-themed chatbot with headphones icon
- [x] Service CTAs with email/chat options
- [x] Lead capture to database
- [x] SendGrid integration (pending verification)

### P1 (Next)
- [ ] Admin dashboard to view leads
- [ ] Music sample player integration
- [ ] Portfolio/gallery of past work

### P2 (Future)
- [ ] Testimonials section
- [ ] Dark/light theme toggle
- [ ] Multi-language support

## File Structure
```
/app
├── backend
│   ├── .env
│   ├── server.py
│   ├── chatbot.py
│   ├── models.py
│   ├── email_service.py
│   └── routes
│       ├── __init__.py
│       ├── chat.py
│       └── contact.py
├── frontend
│   ├── .env
│   └── src
│       ├── App.js
│       ├── index.css
│       └── components
│           ├── LandingPage.jsx / .css
│           ├── Navbar.jsx / .css
│           ├── HeroSection.jsx / .css
│           ├── MarqueeSection.jsx / .css
│           ├── ServicesSection.jsx / .css
│           ├── AboutSection.jsx / .css
│           ├── SocialSection.jsx / .css
│           ├── FooterSection.jsx / .css
│           └── ChatbotWidget.jsx / .css
├── memory
│   └── PRD.md
└── design_guidelines.json
```
