# Quick Start Guide

Get the CEEP website up and running in 5 minutes!

## Prerequisites Check

- ✅ Node.js installed (check with `node --version`)
- ✅ MongoDB running locally OR MongoDB Atlas account

## Step-by-Step Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Backend

Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ceep
NODE_ENV=development
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Start MongoDB

**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - MongoDB Atlas (Cloud):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Update `MONGODB_URI` in `backend/.env`

### 5. Seed Initial Data (Optional)

```bash
cd backend
npm run seed
```

This populates the database with sample data.

### 6. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend running on http://localhost:3000

### 7. Open in Browser

Navigate to: **http://localhost:3000**

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `backend/.env`
- For local MongoDB: `mongodb://localhost:27017/ceep`
- For Atlas: `mongodb+srv://username:password@cluster.mongodb.net/ceep`

### Port Already in Use
- Change `PORT` in `backend/.env` to a different port (e.g., 5001)
- Update frontend API calls if needed

### Frontend Can't Connect to Backend
- Make sure backend is running on port 5000
- Check browser console for CORS errors
- Verify API URL in frontend code

## Next Steps

1. Add your logo image to `frontend/public/logo.png`
2. Add gallery images to `frontend/public/images/`
3. Customize content through API or database
4. Add more team members, services, clients, etc.

## Need Help?

Check the main [README.md](README.md) for detailed documentation.


