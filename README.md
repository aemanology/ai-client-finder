<img width="470" height="441" alt="home" src="https://github.com/user-attachments/assets/b3e6e45e-5209-4995-8ad8-7198483ec73f" />

<img width="487" height="440" alt="results" src="https://github.com/user-attachments/assets/971242e4-2a24-49b0-9793-f4aa1f6b740f" />

<img width="491" height="438" alt="savedleads" src="https://github.com/user-attachments/assets/1ac4629e-0cf6-46b0-b0e3-71d3d48e3d2a" />


# AI Client Finder

> An AI-powered lead generation web application that helps freelancers discover potential clients in any city within seconds.

## Problem Statement

Finding clients is one of the biggest challenges for freelancers. Most freelancers spend hours manually searching Google Maps, company websites, and business directories before finding businesses that may actually need their services.

AI Client Finder automates this process by combining real Google Maps business data with Artificial Intelligence to generate meaningful lead recommendations. Instead of spending hours searching, users simply enter their profession and target city, and the application instantly generates a list of potential clients along with AI-generated reasons explaining why each business could be a suitable lead.

## Target Users

- Freelance Web Developers
- Graphic Designers
- Digital Marketers
- SEO Specialists
- UI/UX Designers
- Software Developers
- Any freelancer looking for potential clients

---

## 🌐 Live Demo

🔗 **AI Client Finder:**  
https://ai-client-finder-tau.vercel.app/
> Search for a business category (e.g., Restaurants, Hospitals, Dentists) in your target city to discover potential clients with AI-generated recommendations.

---

## ✨ Features

- 🔍 Search real businesses in any city using Google Maps data (SerpAPI).
- 🤖 Generate AI-powered recommendations explaining why each business could be a potential client.
- 📍 Search by business category and city.
- 💾 Save potential leads locally for future reference.
- 📂 View and manage saved leads.
- 📱 Responsive user interface built with React.
- ⚡ Fast serverless backend deployed on Vercel.
- 🔒 Secure API key management using Vercel Environment Variables.

---

## 🤖 AI Feature

AI Client Finder combines real business data with Artificial Intelligence to generate meaningful client recommendations.

### How it Works

1. The user enters a business category and city.
2. The application searches Google Maps using the SerpAPI.
3. Real business information (name, phone number and website) is collected.
4. The business data is sent to an AI model through OpenRouter.
5. The AI analyses each business and generates a short reason explaining why it could be a potential client.

### AI System Prompt

The AI is instructed to:

- Analyse only the businesses returned from Google Maps.
- Generate one short recommendation for each business.
- Base recommendations only on the provided information.
- Never invent facts that are not present.
- Return clean JSON that can be displayed directly in the application.

This ensures the recommendations remain relevant, structured, and easy to present to the user.

---

## 🛠️ Tools & Technologies

### Frontend
- React.js
- Vite
- Axios
- CSS3

### Backend
- Vercel Serverless Functions
- JavaScript (Node.js)

### APIs & Services
- SerpAPI (Google Maps Search)
- OpenRouter API
- Google Gemma 4 26B (AI Model)
- Vercel (Hosting & Deployment)

### Development Tools
- Visual Studio Code
- Git
- GitHub
