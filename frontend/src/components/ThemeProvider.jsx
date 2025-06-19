import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/features/themeSlice';

const ThemeProvider = ({ children }) => {
    const theme = useSelector(selectTheme);

    useEffect(() => {
        // Apply theme to document element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Also set a class on body for additional styling if needed
        document.body.className = `theme-${theme}`;
    }, [theme]);

    return <>{children}</>;
};

export default ThemeProvider; 