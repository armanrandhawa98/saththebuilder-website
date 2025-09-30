# SathTheBuilder - Custom Woodworking Portfolio

A professional portfolio website for custom woodworking services, built with Next.js 15 and modern web technologies.

## Features

- 🎨 **Modern Design**: Clean, professional woodworking-focused design theme
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🖼️ **Gallery**: Project showcase with filtering and pagination
- 🛠️ **Services**: Detailed pricing and service information
- 📝 **Contact**: Project inquiry form with admin management
- 👤 **About**: Craftsman story and philosophy
- 🔐 **Admin Panel**: Project management and content editing
- ☁️ **Cloud Ready**: Deployed on Vercel with MongoDB Atlas

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Database**: MongoDB with Mongoose
- **Images**: Cloudinary for optimized image handling
- **Authentication**: JWT-based admin authentication
- **Deployment**: Vercel
- **Languages**: TypeScript, JavaScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or Atlas)
- Cloudinary account for image uploads

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/saththebuilder-website.git
cd saththebuilder-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your actual values:
- MongoDB connection string
- JWT secret key
- Cloudinary credentials
- Site URL

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
