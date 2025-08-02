# Internexis Technologies Official - Frontend Application

A modern frontend application for Internexis Technologies - a self-independent EduTech and digital services platform providing internships, training courses, hackathons, career guidance, freelance projects, and digital solutions for students, professionals, and businesses.

## 🏗️ Project Structure

```
internexis-official/
├── frontend/               # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── features/
│   │   │   │   ├── campus-ambassador/
│   │   │   │   ├── careers/
│   │   │   │   ├── internships/
│   │   │   │   ├── legal/
│   │   │   │   └── services/
│   │   │   ├── layout/
│   │   │   ├── pages/
│   │   │   ├── shared/
│   │   │   └── ui/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.ts
└── package.json            # Root package.json for easy commands
```

## 🚀 Features

### Frontend (React + TypeScript + Vite)
- **Campus Ambassador Program**: Application forms and tracking
- **Career Opportunities**: Job listings and application forms
- **Internship Programs**: Domain-specific internship opportunities
- **Digital Services**: Complete service portfolio
- **Legal Pages**: Terms, Privacy Policy, Refund Policy
- **Interactive UI**: Modern design with Tailwind CSS and Framer Motion
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety and better development experience

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🛠️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/internexis-official.git
cd internexis-official
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will run on `http://localhost:5173`

### 4. Test the Application
1. Open `http://localhost:5173` in your browser
2. Navigate through different pages and features
3. Test form submissions and interactions

## 🌐 Production Deployment

### Static Site Deployment

This is a frontend-only application that can be deployed to any static hosting service:

1. **Build for Production**
```bash
npm run build
```

2. **Deploy to Netlify/Vercel/GitHub Pages**
   - Upload the `frontend/dist` folder to your hosting service
   - Configure redirects for SPA routing if needed

### Netlify Deployment
The project includes a `netlify.toml` file for easy Netlify deployment.

## 🔧 Scripts

### Root Scripts
```bash
npm install      # Install frontend dependencies
npm run dev      # Start frontend development server
npm run build    # Build frontend for production
npm start        # Preview built frontend
npm run lint     # Run linting
npm run deploy   # Build and prepare for deployment
```

### Frontend Scripts (from frontend directory)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **React Router** - Client-side routing
- **Lucide React** - Icons
- **EmailJS** - Contact form integration

## 🧪 Testing

### Test the Application
1. Start the development server with `npm run dev`
2. Navigate through different pages and features
3. Test form submissions and interactions
4. Check responsive design on different devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Support

For support or questions, please contact:
- Email: support@internexis.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/internexis-official/issues)

---

**Ready to deploy!** 🚀 Deploy to Netlify, Vercel, or any static hosting service!
