import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'
import './Upload.css'
import axios from 'axios'

const Upload = () => {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('artist', artist);
            formData.append('song', document.querySelector('#_audioFile').files[0]); 
            
            const response = await axios.post('http://localhost:3000/song/upload', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            setIsLoading(false)
            navigate('/')
            
        } catch (error) {
            console.error('Upload failed:', error)
            setIsLoading(false)
            setError(error.response?.data?.message || 'Upload failed. Please try again.')
        }
    }

    return (
        <section className="upload-section">
            <div className="upload-header">
                <div className="upload-header-left">
                    <div className="back-button" onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </div>
                    <h1>Upload Music</h1>
                </div>
                <ThemeToggle />
            </div>
            
            {error && (
                <div className="error-message" style={{ color: 'red', margin: '10px 0', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
                    {error}
                </div>
            )}
            
            <form className="upload-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Song Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <input
                    type="text"
                    placeholder="Artist Name"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <div className="upload-buttons">
                    <label className="upload-button">
                        {isLoading ? 'Uploading...' : 'Upload Audio File'}
                        <input
                          id='_audioFile'
                            type="file"
                            accept="audio/*"
                            required
                            style={{ display: 'none' }}
                            disabled={isLoading}
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload Music'}
                </button>
            </form>
            
            <Navigation />
        </section>
    )
}

export default Upload