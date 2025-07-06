import React from 'react'
import NowPlaying from '../components/NowPlaying'
import Navigation from '../components/Navigation'
import './Profile.css'

const Profile = () => {
  return (
    <div className="profile-container">
      <Navigation />
      <div className="profile-content">
        {/* Main content area - empty for now */}
      </div>
      <NowPlaying />
    </div>
  )
}

export default Profile
