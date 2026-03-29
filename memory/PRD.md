# K Beats Landing Page - Product Requirements Document

## Original Problem Statement
Build a futuristic landing page for K Beats music channel (Instagram, YouTube, SoundCloud) that:
- Showcases their music mixing and trending song remix services
- Provides custom music services for vlogs, events, weddings, and special moments
- Supports individual artists in mixing and music production
- Includes a conversational AI chatbot to understand requirements and collect client info
- Uses the Moon color palette (#E5D5E0, #6667AB, #7B337E, #420D4B, #210635)
- Features futuristic design with glassmorphism effects and smooth animations like landonorris.com

## User Personas
1. **Content Creators** - Need custom music for vlogs and videos
2. **Event Planners** - Looking for wedding and event music services
3. **Independent Artists** - Seeking production and mixing support
4. **Music Enthusiasts** - Interested in trending remixes and custom edits

## Core Architecture

### Frontend (React)
- **Components:**
  - `LandingPage.jsx` - Main container
  - `Header.jsx` - Fixed navigation with glassmorphism on scroll
  - `HeroSection.jsx` - Hero with animated canvas particles, gradient text, CTAs
  - `ServicesSection.jsx` - 6 service cards (Custom Production, Mixing, Events, Artist Support, Remixes, Sound Design)
  - `ShowcaseSection.jsx` - Tabbed interface for YouTube, SoundCloud, Instagram
  - `ChatbotWidget.jsx` - AI-powered chat interface with Claude 4.5 Sonnet
  - `Footer.jsx` - Social links and contact info

- **Styling:** Glassmorphism effects with backdrop-filter blur, gradient overlays, smooth transitions, Moon color palette

### Backend (FastAPI + MongoDB)
- **Models:**
  - `ChatMessage` - Stores user/assistant messages per session
  - `MusicInquiry` - Stores client inquiries with contact info and conversation history
  - `ContactForm` - Direct contact submissions

- **Routes:**
  - `/api/chat/message` - Send message to Claude chatbot and get response
  - `/api/chat/history/{session_id}` - Retrieve conversation history
  - `/api/chat/inquiry/{session_id}/update` - Update inquiry with contact details
  - `/api/contact/submit` - Submit contact form
  - `/api/contact/inquiries` - Get all inquiries (admin)

- **Chatbot Integration:**
  - Uses `emergentintegrations` library with Claude Sonnet 4.5
  - System message trained for K Beats services
  - Maintains conversation context per session
  - Stores all conversations in MongoDB

## Color Palette Updates (Dec 29, 2025)
**New Teal/Orange Theme:**
- Primary Dark: #34596A (dark teal)
- Primary Light: #80B4BF (light teal/cyan)
- Accent Primary: #D97F30 (orange)
- Accent Light: #F2A444 (light orange/gold)
- Accent Subtle: #B5D2D9 (very light cyan)

## Chatbot Improvements (Dec 29, 2025)

### Personality Enhancement
- Changed from robotic corporate assistant to human, casual conversationalist
- Uses natural language: "Yo! What's good?", "I gotchu", "heat for your project"
- No formal "How may I assist you" vibes
- Shows genuine excitement and personality

### Streaming Responses
- Implemented Server-Sent Events (SSE) for real-time streaming
- Users see responses appear word-by-word instead of waiting
- Better user experience with immediate feedback
- Backend uses async generators for efficient streaming

## Design Enhancements (Dec 29, 2025)

### Scroll Animations
- Intersection Observer for reveal-on-scroll effects
- Elements fade in and slide up as user scrolls
- Smooth transitions with staggered delays
- Creates dynamic, engaging experience

### Service Cards with Images
- Added professional studio photography to all 6 service cards
- Images with overlay gradients for text readability
- 3D transform effects on hover
- Detailed descriptions and feature lists
- Makes services tangible and credible

### Futuristic Effects
- Parallax mouse movement on hero background
- Glowing particles with teal/orange colors
- Animated gradient borders
- Glassmorphism with backdrop filters
- Smooth hover transitions throughout
- Rotating background gradients

## What's Been Implemented (Dec 29, 2025)

### ✅ Full-Stack Implementation
1. **Frontend Landing Page**
   - Futuristic hero section with particle animations
   - Glassmorphism cards throughout
   - 6 service cards with hover effects
   - Tabbed showcase for social platforms
   - Floating chatbot button with pulse animation
   - Responsive design for mobile/tablet
   - Moon color palette integration

2. **AI Chatbot Integration**
   - Claude Sonnet 4.5 via Emergent LLM key
   - Session-based conversations
   - Real-time message streaming
   - Conversation history persistence
   - Contact information collection
   - Glassmorphism chat interface

3. **Backend API**
   - FastAPI server with async endpoints
   - MongoDB integration for data persistence
   - Chat message storage and retrieval
   - Inquiry management system
   - CORS configured for frontend access

4. **Design & UX**
   - Glassmorphism effects with 20px backdrop blur
   - Gradient text animations
   - Smooth scroll behavior
   - Hover state transitions on all interactive elements
   - Particle canvas animation in hero
   - Scroll indicator with animation

## API Contracts

### Chat Endpoints

#### POST /api/chat/message
```json
Request:
{
  "session_id": "session-123",
  "message": "I need music for my wedding"
}

Response:
{
  "session_id": "session-123",
  "response": "That's wonderful! I'd love to help...",
  "timestamp": "2025-12-29T18:00:00Z"
}
```

#### GET /api/chat/history/{session_id}
```json
Response:
[
  {
    "id": "msg-1",
    "session_id": "session-123",
    "role": "user",
    "content": "Hello",
    "timestamp": "2025-12-29T18:00:00Z"
  }
]
```

### Contact Endpoints

#### POST /api/contact/submit
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Need music for vlog",
  "project_type": "vlog"
}

Response:
{
  "success": true,
  "message": "Thank you! We'll get back to you soon."
}
```

## Environment Variables

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://sonic-studio-26.preview.emergentagent.com
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

### P0 (Testing Required)
- [ ] Test chatbot conversation flow end-to-end
- [ ] Verify inquiry storage in MongoDB
- [ ] Test all social media embeds
- [ ] Mobile responsive testing

### P1 (Future Enhancements)
- [ ] Admin dashboard to view inquiries
- [ ] Email notifications for new inquiries
- [ ] Music sample player integration
- [ ] Portfolio/gallery of past work
- [ ] Testimonials section
- [ ] Blog/news section

### P2 (Nice to Have)
- [ ] Dark/light theme toggle
- [ ] Animated music visualizer
- [ ] Live chat with human support
- [ ] Multi-language support
- [ ] Advanced contact form with file upload

## Next Tasks
1. Run comprehensive testing using testing_agent_v3
2. Fix any bugs found during testing
3. Optimize performance and loading times
4. Add meta tags for SEO
5. Implement analytics tracking
