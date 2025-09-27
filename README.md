# AgroVerse Backend

A Node.js backend API for the AgroVerse agricultural platform, providing endpoints for equipment management, user authentication, asset tracking, and rental requests.

## 🚀 Features

- **User Authentication** - JWT-based auth system
- **Equipment Management** - CRUD operations for agricultural equipment
- **Asset Tracking** - Manage agricultural assets
- **Rental System** - Handle equipment rental requests
- **Order Management** - Process and track orders
- **File Uploads** - Handle image uploads for equipment/assets
- **Health Monitoring** - Health check endpoint for monitoring

## 🛠️ Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose ODM)
- **JWT** - Authentication
- **Multer** - File upload handling
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rahul-Cloud1/AgroVerse_Backend.git
   cd AgroVerse_Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 🌐 Deploy to Render (Free)

### Prerequisites
- GitHub account with this repository
- MongoDB Atlas account (free tier available)

### Step-by-Step Deployment

1. **Set up MongoDB Atlas** (if you haven't already)
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a free cluster
   - Get your connection string

2. **Deploy on Render**
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" → "Web Service"
   - Choose "Build and deploy from a Git repository"
   - Connect your GitHub account and select this repository
   - Configure the service:

   **Basic Settings:**
   - Name: `agroverse-backend`
   - Environment: `Node`
   - Branch: `master`
   - Root Directory: (leave empty)

   **Build & Deploy:**
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables**
   In the Render dashboard, go to Environment and add:
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for the build and deployment to complete
   - Your API will be available at: `https://your-app-name.onrender.com`

### Free Tier Limitations
- **Sleeps after 15 minutes** of inactivity
- **750 hours per month** runtime limit
- **Limited resources** (0.1 CPU, 512MB RAM)
- **No persistent file storage** (uploaded files are temporary)

### Production Considerations
For production use, consider:
- **Cloud Storage** for file uploads (AWS S3, Cloudinary)
- **Paid hosting** for better performance and uptime
- **Database optimization** and connection pooling
- **Logging and monitoring** solutions

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Equipment
- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Create equipment
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

### Assets
- `GET /api/assets` - Get all assets
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Rent Requests
- `GET /api/rent-requests` - Get all rent requests
- `POST /api/rent-requests` - Create rent request
- `PUT /api/rent-requests/:id` - Update rent request

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order

### File Upload
- `POST /api/upload` - Upload files

### Health Check
- `GET /health` - Health status endpoint

## 📁 Project Structure

```
├── controllers/          # Request handlers
│   ├── authController.js
│   ├── equipmentController.js
│   ├── assetController.js
│   ├── orderController.js
│   └── rentRequestController.js
├── middleware/           # Custom middleware
│   └── authMiddleware.js
├── models/              # Database models
│   ├── User.js
│   ├── Equipment.js
│   ├── Asset.js
│   ├── Order.js
│   └── RentRequest.js
├── routes/              # API routes
│   ├── auth.js
│   ├── equipment.js
│   ├── assets.js
│   ├── orders.js
│   ├── rentRequests.js
│   └── upload.js
├── uploads/             # File upload directory
├── server.js           # Main application file
├── package.json        # Project dependencies
└── render.yaml        # Render deployment config
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please open an issue in this repository.

---

**Happy Farming! 🌾**