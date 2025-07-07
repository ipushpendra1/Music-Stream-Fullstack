import React from 'react'
import NowPlaying from '../components/NowPlaying'
import Navigation from '../components/Navigation'
import './Profile.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
    } catch {
      // Optionally handle error, but always clear local state
    }
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <Navigation />
      <div className="profile-content">
        <div className="profile-header">
          <img
            
            className="profile-photo"
            style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16 }}
          />
          <h2 className="profile-username">{user?.username || user?.name || 'User'}</h2>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <NowPlaying />
    </div>
  )
}

export default Profile
