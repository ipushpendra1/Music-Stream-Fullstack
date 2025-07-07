import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCurrentSong, 
  selectIsPlaying, 
  selectCurrentTime,
  selectDuration,
  togglePlayPause,
  nextSong,
  previousSong,
  seekTo
} from '../redux/features/songSlice';
import './NowPlaying.css';
import { getPosterUrl, handleImageError } from '../utils/imageUtils';

// Component accepts props for flexibility, but can also use Redux directly if no props provided
const NowPlaying = ({ currentSong: songProp, isPlaying: isPlayingProp, togglePlayPause: togglePlayPauseProp }) => {
    const dispatch = useDispatch();
    const reduxCurrentSong = useSelector(selectCurrentSong);
    const reduxIsPlaying = useSelector(selectIsPlaying);
    const currentTime = useSelector(selectCurrentTime);
    const duration = useSelector(selectDuration);
    
    // Use props if provided, otherwise use Redux state
    const currentSong = songProp || reduxCurrentSong;
    const isPlaying = isPlayingProp !== undefined ? isPlayingProp : reduxIsPlaying;
    
    const [isDragging, setIsDragging] = useState(false);
    
    const handleTogglePlayPause = () => {
        if (togglePlayPauseProp) {
            togglePlayPauseProp();
        } else {
            dispatch(togglePlayPause());
        }
    };

    const handleNextSong = () => {
        dispatch(nextSong());
    };

    const handlePreviousSong = () => {
        dispatch(previousSong());
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Function to get progress bar color based on current time
    const getProgressColor = () => {
        if (!duration || duration === 0) return 'var(--primary-color)';
        
        const percentage = (currentTime / duration) * 100;
        
        // Color changes based on time segments
        if (percentage < 25) {
            return '#ff6b6b'; // Red for first quarter
        } else if (percentage < 50) {
            return '#ffa726'; // Orange for second quarter
        } else if (percentage < 75) {
            return '#66bb6a'; // Green for third quarter
        } else {
            return '#42a5f5'; // Blue for last quarter
        }
    };

    const handleProgressClick = (e) => {
        if (!duration) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const newTime = percentage * duration;
        dispatch(seekTo(newTime));
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        handleProgressClick(e);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !duration) return;
        
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const newTime = percentage * duration;
        dispatch(seekTo(newTime));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Add global mouse event listeners for dragging
    useEffect(() => {
        if (isDragging) {
            const handleGlobalMouseMove = (e) => {
                const progressBar = document.querySelector('.progress-bar');
                if (progressBar && duration) {
                    const rect = progressBar.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
                    const newTime = percentage * duration;
                    dispatch(seekTo(newTime));
                }
            };

            const handleGlobalMouseUp = () => {
                setIsDragging(false);
            };

            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove);
                document.removeEventListener('mouseup', handleGlobalMouseUp);
            };
        }
    }, [isDragging, duration, dispatch]);

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    const progressColor = getProgressColor();

    return (
        <div className="now-playing">
            <img 
                src={getPosterUrl(currentSong.poster)} 
                alt={currentSong.title} 
                className="now-playing-image" 
                onError={handleImageError}
            />
            <div className="now-playing-details">
                <div className="now-playing-title">{currentSong.title}</div>
                <div className="now-playing-artist">{currentSong.artist}</div>
                
                {/* Progress Bar */}
                <div className="progress-container">
                    <span className="time-display">{formatTime(currentTime)}</span>
                    <div 
                        className="progress-bar" 
                        onClick={handleProgressClick}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    >
                        <div 
                            className="progress-fill" 
                            style={{ 
                                width: `${progressPercentage}%`,
                                backgroundColor: progressColor
                            }}
                        ></div>
                        <div 
                            className="progress-thumb"
                            style={{ 
                                left: `${progressPercentage}%`,
                                backgroundColor: progressColor
                            }}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                handleMouseDown(e);
                            }}
                        ></div>
                    </div>
                    <span className="time-display">{formatTime(duration)}</span>
                </div>
            </div>
            
            <div className="controls">
                <button className="control-button" onClick={handlePreviousSong}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="19 20 9 12 19 4 19 20"></polygon>
                        <line x1="5" y1="19" x2="5" y2="5"></line>
                    </svg>
                </button>
                
                <button className="play-button" onClick={handleTogglePlayPause}>
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    )}
                </button>
                
                <button className="control-button" onClick={handleNextSong}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 4 15 12 5 20 5 4"></polygon>
                        <line x1="19" y1="5" x2="19" y2="19"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default NowPlaying;