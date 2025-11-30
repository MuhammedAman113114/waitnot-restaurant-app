// API Configuration
// Can be overridden in Settings page (stored in localStorage)

// Get from localStorage or use defaults (Local Development)
export const API_URL = localStorage.getItem('apiUrl') || 'http://localhost:5000/api';
export const SOCKET_URL = localStorage.getItem('socketUrl') || 'http://localhost:5000';

// Default values:
// - For mobile device: http://YOUR_COMPUTER_IP:5000/api
// - For browser (localhost): http://localhost:5000/api
// 
// Change these in the Settings page (accessible from navbar)

// For production (when you deploy backend to cloud)
// export const API_URL = 'https://your-backend-url.herokuapp.com/api';
// export const SOCKET_URL = 'https://your-backend-url.herokuapp.com';

// IMPORTANT: 
// - Make sure your phone is connected to the same WiFi network
// - Start your backend server before testing: cd server && npm run dev
// - If your IP changes, update it here and rebuild the app
