import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCurrentSong, 
  selectIsPlaying, 
  selectSongs,
  togglePlayPause,
  setCurrentTime,
  setDuration,
  nextSong
} from '../redux/features/songSlice';
import { selectIsLoggedIn } from '../redux/features/userSlice';

const AudioPlayer = () => {
    const audioRef = useRef(null);
    const dispatch = useDispatch();
    const currentSong = useSelector(selectCurrentSong);
    const isPlaying = useSelector(selectIsPlaying);
    const currentTime = useSelector(state => state.songs.currentTime);
    const songs = useSelector(selectSongs);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    
    // Local state to track loading and prevent overlapping requests
    const [isLoading, setIsLoading] = useState(false);
    const [currentSongId, setCurrentSongId] = useState(null);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [reloadKey, setReloadKey] = useState(Date.now());

    // Handle play/pause when isPlaying state changes
    useEffect(() => {
        if (!isLoggedIn) return;
        if (audioRef.current && !isLoading && hasInitialized) {
            if (isPlaying) {
                // console.log('Attempting to play audio:', currentSong?.audio);
                
                // Check if this is the correct song loaded
                if (audioRef.current.src === currentSong?.audio) {
                    // Check if audio is ready to play
                    if (audioRef.current.readyState >= 2) { // HAVE_CURRENT_DATA
                        audioRef.current.play().catch(error => {
                           
                            // Only reset state if it's a serious error
                            if (error.name === 'NotAllowedError') {
                                // User interaction required
                                // console.log('User interaction required to play audio');
                            } else if (error.name === 'AbortError') {
                                // This is expected when changing songs, don't reset state
                                // console.log('Play request aborted due to song change');
                            } else {
                                dispatch(togglePlayPause()); // Reset state if play fails
                            }
                        });
                    } 
                } 
            } else {
                // console.log('Pausing audio');
                audioRef.current.pause();
            }
        }
    }, [isPlaying, dispatch, currentSong, isLoading, hasInitialized, isLoggedIn]);

    // Handle song change
    useEffect(() => {
        if (!isLoggedIn) return;
      
        
        if (audioRef.current && currentSong && currentSong.audio) {
     
            const isNewSong = currentSongId !== currentSong._id;
            const isNewAudioSource = audioRef.current.src !== currentSong.audio;
            
            if (!isNewSong && !isNewAudioSource) {
               
                return;
            }
         
            
            // Set loading state to prevent overlapping play requests
            setIsLoading(true);
            setCurrentSongId(currentSong._id);
            setHasInitialized(true);
            
            // Pause current audio before loading new one
            audioRef.current.pause();
            
            // Set the new source
            audioRef.current.src = currentSong.audio;
            
            // Load the audio
            audioRef.current.load();
            
            // If we should be playing, start playing when ready
            if (isPlaying) {
                const playWhenReady = () => {
                    setIsLoading(false);
                    audioRef.current.play().catch(error => {
                  
                        if (error.name === 'NotAllowedError') {
                            // console.log('User interaction required to play audio');
                        } else if (error.name === 'AbortError') {
                            // console.log('Play request aborted due to song change');
                        } else {
                            dispatch(togglePlayPause());
                        }
                    });
                };

                // If audio is already ready, play immediately
                if (audioRef.current.readyState >= 2) {
                    playWhenReady();
                } else {
                    // Wait for audio to be ready
                    audioRef.current.addEventListener('canplay', playWhenReady, { once: true });
                }
            } else {
                // If not playing, just clear loading state
                setIsLoading(false);
            }
        } else {
           
            setIsLoading(false);
        }
    }, [currentSong, dispatch, isPlaying, currentSongId, isLoggedIn]);

    // Handle seeking when currentTime changes from Redux
    useEffect(() => {
        if (!isLoggedIn) return;
        if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 0.5) {
            audioRef.current.currentTime = currentTime;
        }
    }, [currentTime, isLoggedIn]);

    // Handle audio ended event - Auto play next song
    const handleAudioEnded = () => {
        if (!isLoggedIn) return;
        // console.log('Audio ended - Auto playing next song');
        
        // Check if there are songs available
        if (songs && songs.length > 0) {
            // Auto play next song
            dispatch(nextSong());
        } else {
            // If no songs available, just stop playing
            dispatch(togglePlayPause());
        }
    };

    // Handle audio error
    const handleAudioError = () => {
        if (!isLoggedIn) return;
     
        setIsLoading(false);
        // On error, try to play next song
        if (songs && songs.length > 0) {
            // console.log('Audio error - Trying next song');
            dispatch(nextSong());
        } else {
            dispatch(togglePlayPause());
        }
    };

    // Handle audio load start
    const handleLoadStart = () => {
        if (!isLoggedIn) return;
        // console.log('Audio loading started');
        setIsLoading(true);
    };

    // Handle audio can play
    const handleCanPlay = () => {
        if (!isLoggedIn) return;
        // console.log('Audio can play');
        setIsLoading(false);
        if (audioRef.current) {
            dispatch(setDuration(audioRef.current.duration));
        }
    };

    // Handle time update
    const handleTimeUpdate = () => {
        if (!isLoggedIn) return;
        if (audioRef.current) {
            dispatch(setCurrentTime(audioRef.current.currentTime));
        }
    };

    // Handle loaded metadata
    const handleLoadedMetadata = () => {
        if (!isLoggedIn) return;
        // console.log('Audio metadata loaded');
        if (audioRef.current) {
            dispatch(setDuration(audioRef.current.duration));
        }
    };

    // Handle loaded data
    const handleLoadedData = () => {
        if (!isLoggedIn) return;
        // console.log('Audio data loaded');
    };

    // Cleanup effect
    useEffect(() => {
        if (!isLoggedIn) return;
        const audio = audioRef.current;
        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [isLoggedIn]);

    // Pause audio if user logs out
    useEffect(() => {
        if (!isLoggedIn && audioRef.current) {
            audioRef.current.pause();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn) return;
        // On mount or when song changes, update reloadKey
        setReloadKey(Date.now());
    }, [currentSong, isLoggedIn]);

    if (!isLoggedIn) return null;

    return (
        <audio
            ref={audioRef}
            onEnded={handleAudioEnded}
            onError={handleAudioError}
            onLoadStart={handleLoadStart}
            onCanPlay={handleCanPlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={handleLoadedData}
            preload="metadata"
            crossOrigin="anonymous"
            style={{ display: 'none' }}
            key={reloadKey}
        />
    );
};

export default AudioPlayer; 