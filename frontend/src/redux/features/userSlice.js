import { createSlice } from '@reduxjs/toolkit';

const getInitialUserState = () => {
  const savedUser = localStorage.getItem('user');
  const savedAuthState = localStorage.getItem('isLoggedIn');
  
  if (savedUser && savedAuthState === 'true') {
    try {
      const parsedUser = JSON.parse(savedUser);
      return {
        user: parsedUser,
        isLoggedIn: true,
        isLoading: false,
        error: null
      };
    } catch (error) {
      console.error('Error parsing saved user data:', error);
      // Clear invalid data
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }
  
  return {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
  };
};

const initialState = getInitialUserState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    registerUser: (state, action) => {
      const { name, email, _password } = action.payload;
      
      // Validate input
      if (!name || !email) {
        state.error = 'Name and email are required';
        return;
      }
      
      if (name.length < 2 || name.length > 50) {
        state.error = 'Name must be between 2 and 50 characters';
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        state.error = 'Please enter a valid email address';
        return;
      }
      
      const newUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        avatar: `https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=${name.charAt(0).toUpperCase()}`,
        joinDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }),
        totalSongs: 0,
        totalPlaylists: 0
      };
      
      state.user = newUser;
      state.isLoggedIn = true;
      state.error = null;
      
      // Save to localStorage
      try {
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', 'true');
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
        state.error = 'Failed to save user data locally';
      }
    },
    
    loginUser: (state, action) => {
      const { email, _password } = action.payload;
      
      // Validate email
      if (!email) {
        state.error = 'Email is required';
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        state.error = 'Please enter a valid email address';
        return;
      }
      
      // In a real app, you'd validate credentials here
      // For now, we'll just set a mock user
      const mockUser = {
        name: "John Doe",
        email: email.trim().toLowerCase(),
        avatar: "https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=JD",
        joinDate: "January 2024",
        totalSongs: 15,
        totalPlaylists: 3
      };
      
      state.user = mockUser;
      state.isLoggedIn = true;
      state.error = null;
      
      try {
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isLoggedIn', 'true');
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
        state.error = 'Failed to save user data locally';
      }
    },
    
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    },
    
    updateUserStats: (state, action) => {
      if (state.user) {
        const updatedUser = { ...state.user, ...action.payload };
        state.user = updatedUser;
        state.error = null;
        
        try {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
          console.error('Error updating user stats in localStorage:', error);
          state.error = 'Failed to save user data locally';
        }
      }
    },
    
    updateUserProfile: (state, action) => {
      if (!state.user) {
        state.error = 'No user data available';
        return;
      }
      
      const { name, email, avatar } = action.payload;
      
      // Validate input
      if (!name || !email) {
        state.error = 'Name and email are required';
        return;
      }
      
      if (name.length < 2 || name.length > 50) {
        state.error = 'Name must be between 2 and 50 characters';
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        state.error = 'Please enter a valid email address';
        return;
      }
      
      const updatedUser = {
        ...state.user,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        ...(avatar && { avatar })
      };
      
      state.user = updatedUser;
      state.error = null;
      
      try {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating user profile in localStorage:', error);
        state.error = 'Failed to save profile changes';
      }
    }
  },
});

export const { 
  setLoading, 
  setError, 
  clearError, 
  registerUser, 
  loginUser, 
  logoutUser, 
  updateUserStats, 
  updateUserProfile 
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer; 