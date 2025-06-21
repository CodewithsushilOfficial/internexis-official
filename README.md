# Internexis Official - MERN Stack Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for Internexis with three different form submission types: Campus Ambassador, Career Applications, and Internship Applications.

## 🏗️ Project Structure

```
internexis-official/
├── frontend/               # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AmbassadorForm.tsx
│   │   │   ├── CareerForm.tsx
│   │   │   └── InternshipApplication.tsx
│   │   └── lib/
│   │       └── services/
│   │           └── index.ts
│   ├── package.json
│   └── vite.config.ts
└── backend/                # Node.js + Express backend
    ├── models/
    │   ├── AmbassadorModel.js
    │   ├── CareerModel.js
    │   └── InternshipModel.js
    ├── routes/
    │   ├── ambassadorRoute.js
    │   ├── careerRoute.js
    │   └── internshipRoute.js
    ├── server.js
    ├── package.json
    └── .env
```

## 🚀 Features

### Frontend (React + TypeScript + Vite)
- **Ambassador Form**: Name, Email, Phone, College, Why You Want to Join
- **Career Form**: Name, Email, Phone, Position, Resume Link  
- **Internship Form**: Name, Email, Phone, Domain, College
- Axios for API calls with proper error handling
- Success/error alerts after form submission
- Responsive design with Tailwind CSS
- TypeScript for type safety

### Backend (Node.js + Express + MongoDB)
- **RESTful API** with separate routes for each form type
- **MongoDB Atlas** integration with Mongoose
- **Data validation** and sanitization
- **Error handling** with detailed error messages
- **CORS** configuration for frontend integration
- **Production-ready** with static file serving

### API Endpoints
- `POST /api/ambassador` - Submit Campus Ambassador application
- `POST /api/career` - Submit Career application  
- `POST /api/internship` - Submit Internship application
- `GET /health` - Health check endpoint

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

## 🛠️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/internexis-official.git
cd internexis-official
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://internexis_user:internexis_user@cluster0.b9dwnfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGO_URI=mongodb+srv://internexis_user:internexis_user@cluster0.b9dwnfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Start the backend server:
```bash
npm run dev
# or for production
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Test the Application
1. Open `http://localhost:5173` in your browser
2. Navigate to the form components to test submissions
3. Check backend logs for successful form submissions
4. Verify data is saved in MongoDB Atlas

## 🌐 Production Deployment (Render)

### Single Full-Stack Web Service Deployment

1. **Create New Web Service on Render**
   - Connect your GitHub repository
   - Set **Root Directory**: `backend`
   - Set **Build Command**: `npm install && npm run build --prefix ../frontend`
   - Set **Start Command**: `node server.js`

2. **Environment Variables in Render Dashboard**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://internexis_user:internexis_user@cluster0.b9dwnfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   MONGO_URI=mongodb+srv://internexis_user:internexis_user@cluster0.b9dwnfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

3. **Deploy**
   - Push your code to GitHub
   - Render will automatically build and deploy
   - Your app will be available at `https://your-app-name.onrender.com`

### Build Process Explanation
1. Render runs `npm install` in the backend directory
2. Runs `npm run build --prefix ../frontend` to build the React app
3. Express serves the built React app from `../frontend/dist`
4. API routes are available at `/api/*`
5. All other routes serve the React app (SPA routing support)

## 🔧 Scripts

### Backend Scripts
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm run build    # Build frontend (called during deployment)
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📊 Database Schema

### Ambassador Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  college: String (required),
  whyYouWantToJoin: String (required),
  submittedAt: Date (auto),
  status: String (enum: pending, reviewed, accepted, rejected)
}
```

### Career Collection
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  position: String (required),
  resumeLink: String (required, URL),
  experience: String (enum),
  submittedAt: Date (auto),
  status: String (enum: pending, reviewed, shortlisted, interviewed, hired, rejected)
}
```

### Internship Collection
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  domain: String (required, enum),
  college: String (required),
  year: String (enum),
  duration: String (enum),
  submittedAt: Date (auto),
  status: String (enum: pending, reviewed, accepted, rejected, completed)
}
```

## 🔐 Environment Variables

### Backend Development (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Frontend Development (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_secure_password
```

### Production (Render Dashboard)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## 🔧 Admin Configuration

### Setting Up Admin Access
1. Copy `.env.example` to `.env` in the frontend directory
2. Set secure admin credentials:
   ```env
   VITE_ADMIN_USERNAME=your_chosen_username
   VITE_ADMIN_PASSWORD=your_secure_password
   ```
3. Access admin panel at `/admin` or `/admin-login`
4. Use your configured credentials to login

**Security Note**: Never commit actual credentials to version control. The demo credentials have been removed for security.

## 🧪 Testing

### Test Form Submissions
1. Start both frontend and backend servers
2. Fill out and submit each form type
3. Check backend console for success messages
4. Verify data in MongoDB Atlas dashboard

### Health Check
```bash
curl http://localhost:5000/health
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is in CORS configuration
   - Check if ports match between frontend and backend

2. **MongoDB Connection Issues**
   - Verify MONGODB_URI is correct
   - Check if IP is whitelisted in MongoDB Atlas
   - Ensure network access is configured

3. **Build Failures on Render**
   - Check if all dependencies are in package.json
   - Verify build command is correct
   - Check build logs for specific errors

4. **Form Submission Errors**
   - Check browser network tab for API errors
   - Verify backend routes are working
   - Check validation error messages

## 📝 API Usage Examples

### Submit Ambassador Application
```bash
curl -X POST http://localhost:5000/api/ambassador \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com", 
    "phone": "+1234567890",
    "college": "XYZ University",
    "whyYouWantToJoin": "I want to represent Internexis at my college"
  }'
```

### Submit Career Application
```bash
curl -X POST http://localhost:5000/api/career \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890", 
    "position": "Software Engineer",
    "resumeLink": "https://drive.google.com/resume-link"
  }'
```

### Submit Internship Application
```bash
curl -X POST http://localhost:5000/api/internship \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "phone": "+1234567890",
    "domain": "Web Development", 
    "college": "ABC College"
  }'
```

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

**Ready to deploy!** 🚀 Push to GitHub and deploy to Render in one click!
