# K Beats Landing Page - Product Requirements Document

## Original Problem Statement
Build a premium, futuristic landing page for K Beats music channel (Instagram, YouTube, SoundCloud) that:
- Showcases their music mixing and trending song remix services
- Provides custom music services for vlogs, events, weddings, and special moments
- Supports individual artists in mixing and music production
- Includes a conversational AI chatbot to understand requirements and collect client info
- Features premium design inspired by landonorris.com with smooth animations and CTAs
- Has a polished K BEATS logo/branding

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
  - `ServicesSection.jsx` - 6 service cards with hover animations
  - `AboutSection.jsx` - Brand story with signature element
  - `SocialSection.jsx` - Large social platform links
  - `FooterSection.jsx` - Footer with K BEATS logo marquee
  - `ChatbotWidget.jsx` - AI-powered chat interface

- **Styling:** 
  - Electric lime (#ccff00) on pure black (#050505)
  - Unbounded font for headings, Outfit for body
  - Framer Motion for scroll animations
  - Lenis for smooth scrolling
  - react-fast-marquee for infinite scrollers

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

- **Chatbot Integration:**
  - Uses `emergentintegrations` library with Claude Sonnet 4.5
  - Session-based conversations
  - Casual, human-like personality

## Design System (Updated Dec 29, 2025)

### Color Palette
- Background: #050505 (pure black)
- Foreground: #FFFFFF
- Primary: #ccff00 (electric lime)
- Primary Hover: #b3e600
- Secondary: #1A1A1C
- Border: #222222 / rgba(255, 255, 255, 0.1)
- Muted: #888888
- Surface: rgba(26, 26, 28, 0.6)

### Typography
- Headings: Unbounded (900 weight for impact)
- Body: Outfit (300-400 weight for elegance)
- Logo: K in lime, BEATS in white with letter-spacing

### Key Design Elements (landonorris.com inspired)
- Massive typography reveals
- Infinite horizontal marquee scrollers
- Sharp 1px borders on dark backgrounds
- Hover state transforms (scale, color changes)
- Staggered scroll animations
- Asymmetric layouts
- Signature/personal elements

## What's Been Implemented (Dec 29, 2025)

### ✅ Complete Frontend Redesign
1. **Premium Hero Section**
   - K BEATS massive logo with lime/white styling
   - Neon abstract background image
   - "Music Production & Mixing" subtitle
   - Primary/secondary CTAs
   - Stats: 500+ Projects, 3 Platforms, 24/7 Support
   - Side social links (YT, IG, SC)
   - Scroll indicator animation

2. **Marquee Section**
   - Two-track infinite scrolling marquee
   - Alternating solid/outline typography
   - Service keywords with lime accents

3. **Services Grid**
   - 6 service cards with professional imagery
   - Hover effects (border glow, image scale)
   - Custom icons from lucide-react
   - Staggered scroll reveal animations

4. **About Section**
   - Abstract image with lime border accent
   - "2024 Crafting Sound" tag
   - Signature element
   - Inspirational quote

5. **Social Section**
   - Large typography social links
   - YouTube, Instagram, SoundCloud
   - Hover transforms with arrow rotation

6. **Footer**
   - "Ready to Create?" CTA section
   - K BEATS logo marquee band (lime background)
   - Navigation, Services, Social links
   - Copyright

7. **Chatbot Widget**
   - Sleek dark theme with lime accents
   - K avatar
   - Framer Motion animations
   - SSE message receiving

### ✅ Backend Fixes
- Fixed chatbot to use `send_message` (not streaming)
- SSE response format maintained for frontend compatibility

### ✅ Animation Libraries
- Framer Motion for scroll reveals
- Lenis for smooth scrolling
- react-fast-marquee for infinite scrollers

## API Contracts

### Chat Endpoints

#### POST /api/chat/message
```json
Request:
{
  "session_id": "session-123",
  "message": "I need music for my wedding"
}

Response: Server-Sent Events stream
data: {"chunk": "Full response text"}
data: {"done": true}
```

#### GET /api/chat/history/{session_id}
```json
Response:
[
  {
    "session_id": "session-123",
    "role": "user",
    "content": "Hello",
    "timestamp": "2025-12-29T18:00:00Z"
  }
]
```

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
EMERGENT_LLM_KEY=your-emergent-key-here
```

## Social Media Links
- YouTube: https://www.youtube.com/@Kbeats_official
- Instagram: https://www.instagram.com/kbeatsofficial/
- SoundCloud: https://soundcloud.com/k-beats-291187445

## Prioritized Backlog

### P0 (Critical - Next Tasks)
- [ ] Lead Capture Notification System (Email/Dashboard)
- [ ] Admin dashboard to view captured leads

### P1 (Important)
- [ ] Email notifications for new inquiries (SendGrid)
- [ ] Music sample player integration
- [ ] Portfolio/gallery of past work
- [ ] Testimonials section

### P2 (Nice to Have)
- [ ] Dark/light theme toggle
- [ ] Animated music visualizer
- [ ] Multi-language support
- [ ] Advanced contact form with file upload

## File Structure
```
/app
├── backend
│   ├── .env
│   ├── server.py
│   ├── chatbot.py
│   ├── models.py
│   └── routes
│       ├── __init__.py
│       ├── chat.py
│       └── contact.py
├── frontend
│   ├── .env
│   └── src
│       ├── App.js
│       ├── App.css
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

## Known Issues
- None currently

## Testing Notes
- Chatbot tested and working with Claude Sonnet 4.5
- Mobile responsive design verified
- All animations and scroll effects working
