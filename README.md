# CEEP Website - MERN Stack Application

A modern, responsive website for the Centre for Energy, Environment and Productivity (CEEP) built with React and Express (static backend).

## Features

- **Home Page**: Hero section with description and image gallery
- **Our Team**: Display team members with their details
- **Services**: List of consulting services, in-house training programs (with PDF links), and service videos
- **Clients**: Showcase client information and testimonials
- **Case Studies**: Video gallery of successful projects
- **Contact**: Contact form and company information

## Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Data**: Static in-memory data served by Express (no database required)
- **Styling**: CSS3 with modern responsive design

## Project Structure

```
CEEPweb/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd CEEPweb
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ceep
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ceep
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - no local setup needed
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

## API Endpoints

### Team
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get single team member
- `POST /api/team` - Create team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Delete team member

### Services
- `GET /api/services` - Get all services
- `GET /api/services/training` - Get all training programs
- `GET /api/services/videos` - Get all service videos
- `POST /api/services` - Create service
- `POST /api/services/training` - Create training program
- `POST /api/services/videos` - Create service video

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Case Studies
- `GET /api/case-studies` - Get all case studies
- `GET /api/case-studies/:id` - Get single case study
- `POST /api/case-studies` - Create case study
- `PUT /api/case-studies/:id` - Update case study
- `DELETE /api/case-studies/:id` - Delete case study

### Contact
- `GET /api/contact` - Get all contact messages
- `POST /api/contact` - Submit contact form
- `PUT /api/contact/:id` - Update message status
- `DELETE /api/contact/:id` - Delete message

## Adding Content

You can add content to the website in two ways:

### 1. Using API (Recommended for production)

Use tools like Postman, curl, or create an admin panel to POST data to the API endpoints.

Example - Adding a team member:
```bash
curl -X POST http://localhost:5000/api/team \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Tall Kumar",
    "position": "Founder & Director",
    "bio": "Expert in energy management...",
    "email": "tallkumar@gmail.com"
  }'
```

### 2. Using MongoDB directly

Connect to MongoDB and insert documents directly into the collections:
- `teammembers`
- `services`
- `trainingprograms`
- `servicevideos`
- `clients`
- `casestudies`
- `contacts`

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## Production Build

### Frontend
```bash
cd frontend
npm run build
```
This creates an optimized production build in the `build` folder.

### Backend
```bash
cd backend
npm start
```

## Features to Add

- [ ] Admin authentication panel
- [ ] Image upload functionality
- [ ] Email notifications for contact form
- [ ] Search functionality
- [ ] Blog/News section
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

© 2024 by CEEP Creative team. All rights reserved.

## Contact

**Centre for Energy, Environment and Productivity**

1039, 26th St, H Block, Ponni Colony  
Anna Nagar, Chennai 600040, INDIA

Tel: 91-44 26163483  
Mobile: 9444882553, 8668115663  
Email: tallkumar@gmail.com

---

*"The world has enough for everyone's need, but not enough for everyone's greed." - M.K. Gandhi*
# CEEPweb
