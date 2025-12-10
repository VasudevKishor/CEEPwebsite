# CEEP Frontend

React frontend application for the CEEP website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Environment Variables

If you need to change the API URL, create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

Then update `src/pages/*.js` files to use `process.env.REACT_APP_API_URL` instead of hardcoded URLs.


