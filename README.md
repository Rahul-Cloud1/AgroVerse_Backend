# AgroVerse Backend

A Node.js REST API backend for the AgroVerse agricultural platform. This service manages equipment, assets, orders, rent requests, user authentication, and file uploads for an intelligent farming marketplace.

## ?? Key Features

- JWT-based authentication and authorization
- Equipment CRUD and inventory management
- Asset tracking and metadata support
- Rental request workflow for farm equipment
- Order creation, update, and retrieval
- Secure file upload support for images
- Localization-ready structure for multiple languages
- Health check endpoint for uptime monitoring

## ?? Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for auth
- bcryptjs for password hashing
- Multer for file uploads
- CORS for cross-origin support

## ?? Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rahul-Cloud1/AgroVerse_Backend.git
   cd AgroVerse_Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   > Note: `.env` is ignored by git. Never commit secrets or private credentials.

4. Start the server:
   ```bash
   npm start
   ```

5. Visit the API at:
   ```
   http://localhost:5000
   ```

## ?? API Endpoints

### Authentication
- `POST /api/auth/register` � register a new user
- `POST /api/auth/login` � login and receive a JWT token

### Equipment
- `GET /api/equipment` � list all equipment
- `POST /api/equipment` � add new equipment
- `PUT /api/equipment/:id` � update equipment
- `DELETE /api/equipment/:id` � delete equipment

### Assets
- `GET /api/assets` � list assets
- `POST /api/assets` � create an asset
- `PUT /api/assets/:id` � update an asset
- `DELETE /api/assets/:id` � remove an asset

### Rent Requests
- `GET /api/rent-requests` � list rent requests
- `POST /api/rent-requests` � request equipment rental
- `PUT /api/rent-requests/:id` � update a rent request

### Orders
- `GET /api/orders` � list orders
- `POST /api/orders` � create an order
- `PUT /api/orders/:id` � update an order

### File Uploads
- `POST /api/upload` � upload image files

### Health Check
- `GET /health` � service health status

## ??? Project Structure

```
+-- controllers/          # Request handlers
+-- middleware/           # Authentication and request middleware
+-- models/               # MongoDB schemas
+-- routes/               # API route definitions
+-- config/               # Configuration helpers
+-- locales/              # Localization resources
+-- uploads/              # Uploaded file storage
+-- server.js             # App entry point
+-- package.json          # Dependencies and scripts
+-- README.md             # Project documentation
```

## ?? Deployment Notes

- Use environment variables for sensitive values.
- Do not commit `.env` files.
- For production, use managed secrets or cloud environment config.
- Replace file upload storage with cloud storage (S3, Cloudinary) for reliability.

## ?? Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes with a clear message
4. Open a pull request

## ?? License

This project is licensed under the ISC License.

## ?? Thanks

Thanks for contributing to AgroVerse! Build better agriculture software with reliable backend APIs.
