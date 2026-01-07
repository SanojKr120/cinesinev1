# Project Documentation: CineSine

## 1. Project Overview
**Project Name:** CineSine  
**Description:** CineSine is a premium web application designed for a cinematography and photography startup. It mirrors the service offerings of high-end international companies (similar to "The Wedding Story"), specializing in wedding videography/photography, pre-wedding shoots, and event coverage.
**Objective:** To establish a digital presence that rivals international standards, featuring a rich, cinematic user interface. The platform will showcase portfolios through dedicated pages (Home, Stories, Photobooks, Images, Films, Pre-wedding, Music, FAQ, Contact) with specific interactive functionalities.

### Key Pages & Functionalities:
*   **Homepage:** Full-screen aesthetic background (image/video), brand introduction, and "likes" counter. 
    *   *Navbar:* Logo, scalable page navigation.
    *   *Footer:* Social media links (Instagram, YouTube, Facebook).
*   **Stories Page:** Curated stories featuring titles and cover images. Clicking a story reveals related details (weddings, engagements).
*   **Photobooks Page:** Digital coffee-table book experience displaying images with the subjects' names.
*   **Images Page:** Gallery format organized by album types.
*   **Films Page:** Showcase of cinematic wedding films with titles, client names, and unique taglines.
*   **Pre-weddings Page:** 
    *   Embedded YouTube videos (watch-only, strictly no external links/redirection).
    *   Pre-wedding card: Image, Name, City/Address.
    *   *Read More:* Opens a detailed person-page with a full image gallery.
    *   *Navigation:* "Next/Previous" arrow controls to seamless cycle through different client details.
*   **Music Page:** Library of effective music tracks used in films, with titles, descriptions, and themed video backgrounds.
*   **FAQ Page:** "Beauty of Life" detailed headings, followed by expandable Questions & Answers.
*   **Contacts Page:** Attractive tagline, address, contact numbers, and a "Beautiful Memory" photo/video section to encourage inquiries.

**Target Audience:** ~5,000 daily visitors looking for premium event documentation.

---

## 2. Functional Requirements
### User Roles
*   **Visitor/User:** Can browse all portfolios, view videos, read stories, and contact the admin.
*   **Admin (Implicit):** Manages content (stories, videos, images) via a dashboard (to be implemented).

### Core Features
*   **Portfolio Browsing:** High-resolution image galleries and optimized video streaming.
*   **Interactive Navigation:** Seamless transitions between pre-wedding profiles.
*   **Inquiry System:** Integrated WhatsApp chat, Email forms, and direct contact details.
*   **Content Consumption:** "Read-only" video player restraints (preventing user drop-off to YouTube).

---

## 3. Non-Functional Requirements
*   **Performance:** < 2s Time-to-Interactive. content delivery via CDN (Cloudinary) for global speed. Lazy loading for heavy assets.
*   **Security:** 
    *   HTTPS encryption (SSL/TLS).
    *   Input sanitization (prevention of SQL Injection/XSS).
    *   Secure API key management (Environment variables).
*   **Scalability:** Microservices-ready structure. Database indexing for fast queries as user base grows.
*   **Availability:** 99.9% Uptime SLA target using reliable hosting (Vercel/AWS).

---

## 4. Technology Stack
*   **Frontend:** 
    *   **Framework:** React (with JSX).
    *   **Styling:** Tailwind CSS (for custom design systems), Vanilla CSS (for specific animations).
    *   **Validation:** Formik & Yup (for robust form handling).
    *   **UI Library:** (Optional) Framer Motion for cinematic animations.
*   **Backend:** 
    *   **Runtime:** Node.js.
    *   **Framework:** Express.js.
    *   **Real-time:** Socket.io (for live chat/notifications).
    *   **Middleware:** CORS, WhatsApp Kit.
*   **Database:** 
    *   **Primary:** MongoDB (Atlas).
*   **Third-Party Services:** 
    *   **Media Storage:** Cloudinary (Images/Videos).
    *   **Communication:** EmailJS (Contact forms), WhatsApp Business API.

---

## 5. System Architecture
*   **High-Level Architecture:** 
    *   **Client-Side:** Single Page Application (SPA) hosted on Vercel.
    *   **Server-Side:** RESTful API server (Node/Express).
    *   **Database:** Document-based storage (MongoDB) for flexible content schemas.
*   **Data Flow:**
    1.  User requests page -> CDM serves React App.
    2.  App requests media -> Cloudinary optimized delivery.
    3.  User submits inquiry -> Node API -> EmailJS/WhatsApp integration.

---

## 6. Database Design
**Database Name:** `CineSine`

### Collections (Proposed schema based on requirements):
1.  **`Stories`**: `{ id, title, coverImage, type (wedding/engagement), description, images[] }`
2.  **`Films`**: `{ id, title, videoUrl, coupleName, tagline, description }`
3.  **`PreWeddings`**: `{ id, coupleName, city, videoId, mainImage, galleryImages[], description }`
4.  **`Photobooks`**: `{ id, title, personName, images[] }`
5.  **`Music`**: `{ id, title, description, videoThemeUrl, audioUrl }`
6.  **`Inquiries`**: `{ id, userEmail, phone, message, date }`

---

## 7. User Interface Details
*   **Theme Color:** `#f8f4ed` (Cream/Off-White) - Creating a warm, premium paper-like feel.
*   **Typography:** 
    *   **Primary:** Serif Family (e.g., *Playfair Display*, *Cinzel*) for Titles/Headings to evoke elegance.
    *   **Secondary:** Sans-Serif (e.g., *Lato*, *Inter*) for body text legibility.
*   **Design Language:** Minimalist, generous whitespace, large imagery, smooth fade-in animations.

---

## 8. Environment Variables
*   `MONGODB_URI`: Connection string for production database.
*   `CLOUDINARY_CLOUD_NAME`: Media hosting config.
*   `CLOUDINARY_API_KEY`: Secure upload access.
*   `EMAILJS_SERVICE_ID`: For contact form routing.
*   `WHATSAPP_API_TOKEN`: For integration with chat services.

---

## 9. Security Implementation
*   **Data Protection:** 
    *   All API routes secured with proper validation middleware.
    *   Sensitive data (passwords, tokens) hashed or encrypted.
    *   Strict CORS policy to allow requests only from the frontend domain.

---

## 10. Deployment Details
*   **Hosting Platform:** Vercel (Frontend & Serverless Backend functions).
*   **Build Process:** 
    *   Current: `npm run build`
    *   CI/CD: Automatic deployments upon Git push.
*   **Environment Variables:** Configured in Vercel Project Settings.

---

## 11. Testing Strategies
*   **Unit Testing:** Jest/React Testing Library for testing individual components (Navbar, Contact Form).
*   **Integration Testing:** Testing full flows (e.g., "Clicked Read More -> Pre-wedding Detail Page loads correctly").
*   **Cross-Browser Testing:** Ensuring compatibility with Chrome, Safari, Firefox, and Edge.

---

## 12. Future Enhancements
*   **Client Login Portal:** Allow clients to log in and select photos for their album.
*   **E-commerce:** "Add to Cart" functionality for purchasing printed photobooks directly.
*   **Blog Section:** SEO-driven articles about wedding planning tips.

---

## 13. Conclusion
CineSine aims to replicate the "international standard" of reliability and aesthetic excellence found in industry leaders like *The Wedding Story*. By utilizing a robust MERN stack and focusing heavily on a "Serif + Cream" #f8f4ed design language, the platform will offer an immersive experience for its 5,000+ daily visitors.
