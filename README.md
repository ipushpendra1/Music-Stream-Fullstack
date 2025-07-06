# Stream2 - Music Streaming Application

A full-stack music streaming application with user authentication and profile management.

## Features

### Profile Page
- **User Profile Display**: Shows user information including avatar, name, username, email, and account statistics
- **Profile Editing**: Edit profile information through a modal interface
- **Avatar Upload**: Upload and change profile pictures with validation
- **Statistics Display**: Shows total songs, playlists, and join date
- **Responsive Design**: Works on desktop and mobile devices

### Backend API
- **User Authentication**: JWT-based authentication with login/register
- **Profile Management**: GET and PUT endpoints for user profile data
- **Database Integration**: MongoDB with Mongoose for data persistence
- **File Upload**: Support for profile image uploads

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with:
   ```
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (requires authentication)
- `PUT /auth/profile` - Update user profile (requires authentication)

### Profile Data Structure
```json
{
  "id": "user_id",
  "username": "username",
  "name": "Display Name",
  "email": "user@example.com",
  "avatar": "avatar_url",
  "joinDate": "January 2024",
  "totalSongs": 0,
  "totalPlaylists": 0
}
```

## Profile Page Features

### Display Information
- **Profile Avatar**: Circular profile picture with fallback to initials
- **User Name**: Display name or username as fallback
- **Username**: @username format
- **Statistics**: Songs count, playlists count, and join date
- **Contact Information**: Email and username
- **Account Information**: Member since date and account ID

### Edit Profile
- **Modal Interface**: Clean modal for editing profile information
- **Image Upload**: Drag and drop or click to upload new avatar
- **Validation**: File type, size, and dimension validation
- **Real-time Preview**: See changes before saving
- **Form Validation**: Client-side validation for name and email

### Responsive Design
- **Mobile Optimized**: Responsive layout for all screen sizes
- **Touch Friendly**: Optimized for touch interactions
- **Accessible**: Proper ARIA labels and keyboard navigation

## Technologies Used

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- multer for file uploads
- cors for cross-origin requests

### Frontend
- React with Vite
- Redux Toolkit for state management
- CSS with CSS variables for theming
- Responsive design with CSS Grid and Flexbox

## File Structure

```
Stream2/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   ├── models/
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   └── auth.routes.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   └── app.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Profile.jsx
    │   │   └── Profile.css
    │   ├── components/
    │   │   ├── EditProfileModal.jsx
    │   │   └── EditProfileModal.css
    │   └── redux/
    │       └── features/
    │           └── userSlice.js
    └── vite.config.js
```

## Usage

1. Start both backend and frontend servers
2. Register a new account or login with existing credentials
3. Navigate to the profile page
4. View your profile information
5. Click "Edit Profile" to modify your information
6. Upload a new avatar, update name/email, and save changes

The profile page integrates seamlessly with the existing authentication system and provides a complete user profile management experience. 