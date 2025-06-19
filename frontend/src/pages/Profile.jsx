import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import NowPlaying from '../components/NowPlaying'
import ThemeToggle from '../components/ThemeToggle'
import EditProfileModal from '../components/EditProfileModal'
import './Profile.css'
import { togglePlayPause, selectCurrentSong, selectIsPlaying } from '../redux/features/songSlice'
import { selectUser, selectIsLoggedIn, logoutUser } from '../redux/features/userSlice'

const Profile = () => {
    const dispatch = useDispatch();
    const currentSong = useSelector(selectCurrentSong);
    const isPlaying = useSelector(selectIsPlaying);
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState('');

    const handleLogout = async () => {
        setIsLoggingOut(true);
        setLogoutError('');
        
        try {
            // Simulate logout process
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(logoutUser());
        } catch (error) {
            console.error('Logout error:', error);
            setLogoutError('Failed to logout. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleEditProfile = () => {
        if (!user) {
            console.error('No user data available for editing');
            return;
        }
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleProfileUpdateSuccess = () => {
        // You could add a success notification here
        console.log('Profile updated successfully');
    };

    return (
        <section className="profile-section">
            {/* Header with Profile title and theme toggle */}
            <div className="profile-header">
                <h1 className="profile-title">Profile</h1>
                <ThemeToggle />
            </div>

            {/* Profile content */}
            <div className="profile-content">
                {isLoggedIn && user ? (
                    <>
                        {/* User info card */}
                        <div className="profile-card">
                            <div className="profile-avatar" onClick={handleEditProfile}>
                                <img 
                                    src={user.avatar || 'https://via.placeholder.com/100x100/6B7280/FFFFFF?text=?'} 
                                    alt={user.name || 'User'} 
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/100x100/6B7280/FFFFFF?text=?';
                                    }}
                                />
                                <div className="avatar-overlay">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="profile-info">
                                <h2 className="user-name">{user.name || 'User'}</h2>
                                <p className="user-email">{user.email || 'No email provided'}</p>
                                <p className="user-join-date">
                                    Member since {user.joinDate || 'Unknown'}
                                </p>
                            </div>
                            <button 
                                className="edit-profile-btn" 
                                onClick={handleEditProfile}
                                title="Edit Profile"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Stats section */}
                        <div className="profile-stats">
                            <div className="stat-item">
                                <div className="stat-number">{user.totalSongs || 0}</div>
                                <div className="stat-label">Songs</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">{user.totalPlaylists || 0}</div>
                                <div className="stat-label">Playlists</div>
                            </div>
                        </div>

                        {/* Logout section with error handling */}
                        <div className="logout-section">
                            {logoutError && (
                                <div className="error-message profile-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                    {logoutError}
                                </div>
                            )}
                            <button 
                                className="logout-button" 
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? (
                                    <>
                                        <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 12a9 9 0 11-6.219-8.56"/>
                                        </svg>
                                        Logging out...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16,17 21,12 16,7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        Logout
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Guest user message */}
                        <div className="guest-message">
                            <h2>Welcome to Stream</h2>
                            <p>Login or register to access your profile and music</p>
                        </div>

                        {/* Auth options */}
                        <div className="auth-options">
                            <Link to="/login" className="auth-button login-btn">
                                Login
                            </Link>
                            <Link to="/register" className="auth-button register-btn">
                                Register
                            </Link>
                        </div>
                    </>
                )}
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal 
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                user={user}
                onSuccess={handleProfileUpdateSuccess}
            />

            {/* Now Playing bar at the bottom */}
            <NowPlaying 
                currentSong={currentSong} 
                isPlaying={isPlaying} 
                togglePlayPause={() => dispatch(togglePlayPause())} 
            />

            {/* Navigation bar */}
            <Navigation />
        </section>
    )
}

export default Profile
