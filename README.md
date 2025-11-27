# 🍽️ WaitNot - Restaurant Discovery & Smart Ordering System

A complete full-stack web and mobile application for restaurant discovery, ordering, and management with Instagram-style food reels.

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://your-demo-url.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📱 Features

### Customer App
- 🔍 Restaurant search with filters
- 🛒 Shopping cart & checkout
- 📱 QR code table ordering
- 🎬 Instagram-style food reels
- 🌍 Multi-language support
- 🚚 Home delivery tracking

### Restaurant Dashboard
- 📊 Real-time order management
- 🍕 Menu management (CRUD)
- 📱 QR code generation
- 🔔 Live order notifications
- 📈 Order status workflow

## 🚀 Live Demo

- **Website:** [https://your-demo-url.vercel.app](https://your-demo-url.vercel.app)
- **API:** [https://your-backend.onrender.com](https://your-backend.onrender.com)
- **APK:** [Download](https://github.com/YOUR_USERNAME/waitnot-restaurant-app/releases)

A complete full-stack web application for restaurant discovery, ordering, and management with Instagram-style food reels.

## Features

### User Side
- **Restaurant Search**: Search restaurants by name, cuisine, or dishes with delivery filter
- **Home Delivery**: Browse menu, add to cart, checkout with address and payment
- **Food Reels**: Vertical scroll Instagram-style reels with auto-play videos
- **QR Table Ordering**: Scan QR code at restaurant table to order without waiter

### Restaurant Side
- **POS Dashboard**: Manage menu items (add/edit/delete)
- **Live Orders**: Real-time order notifications with status workflow
- **Order Management**: Track orders from pending → preparing → delivery → completed
- **QR Code Generation**: Generate QR codes for each table
- **Authentication**: Secure login/register for restaurant owners

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Socket.IO client for real-time updates
- Lucide React for icons

**Backend:**
- Node.js + Express
- Local JSON file storage (no database required!)
- Socket.IO for real-time communication
- JWT authentication
- Bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v16 or higher)
- No database installation needed!

### Setup

1. **Clone and install dependencies:**
```bash
npm run install-all
```

2. **Seed sample data:**
```bash
cd server
npm run seed
```

3. **Start development servers:**
```bash
# From root directory
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

**Note:** All data is stored locally in `server/data/` folder as JSON files. No database setup required!

## Usage

### Customer Flow
1. Visit http://localhost:3000
2. Search for restaurants or browse all
3. Click on a restaurant to view menu
4. Add items to cart
5. Proceed to checkout
6. Enter delivery details and payment method
7. Confirm order

### QR Table Ordering
1. Scan QR code at restaurant table (or visit `/qr/:restaurantId/:tableNumber`)
2. Browse menu and add items
3. Enter name and phone
4. Select payment method
5. Place order - goes directly to restaurant dashboard

### Restaurant Dashboard
1. Visit http://localhost:3000/restaurant-login
2. Login with sample credentials:
   - Email: `spice@example.com`
   - Password: `password123`
3. View live orders with real-time updates
4. Manage menu items
5. Generate QR codes for tables

### Food Reels
1. Click "Reels" in navigation
2. Swipe up/down to browse food videos
3. Click "Order Now" to visit restaurant

## API Endpoints

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/search?q=query&delivery=true` - Search restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants/:id/menu` - Add menu item
- `PUT /api/restaurants/:id/menu/:menuId` - Update menu item
- `DELETE /api/restaurants/:id/menu/:menuId` - Delete menu item

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/restaurant/:restaurantId` - Get restaurant orders
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/payment` - Update payment status

### Reels
- `GET /api/reels` - Get all reels
- `POST /api/reels` - Create reel
- `PATCH /api/reels/:id/view` - Increment views
- `PATCH /api/reels/:id/like` - Increment likes

### Auth
- `POST /api/auth/login` - Restaurant login
- `POST /api/auth/register` - Restaurant registration

## Project Structure

```
waitnot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context (Cart)
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── server.js         # Express server
│   ├── seed.js           # Database seeder
│   └── package.json
└── package.json          # Root package.json
```

## Features Implemented

✅ Restaurant search with filters
✅ Menu browsing with categories
✅ Shopping cart functionality
✅ Checkout with delivery/dine-in options
✅ Mock payment gateway (UPI/Card)
✅ QR code table ordering
✅ Real-time order updates (Socket.IO)
✅ Restaurant POS dashboard
✅ Menu management (CRUD)
✅ Order status workflow
✅ Instagram-style food reels
✅ Restaurant authentication
✅ Responsive design

## Sample Credentials

**Restaurant Login:**
- Spice Garden: `spice@example.com` / `password123`
- Pizza Paradise: `pizza@example.com` / `password123`
- Burger Hub: `burger@example.com` / `password123`

## Notes

- Payment is mocked (no real transactions)
- Video URLs in reels are placeholders
- For production, add proper authentication middleware
- Configure CORS and environment variables properly
- Add image upload functionality for menu items and reels

## License

MIT
