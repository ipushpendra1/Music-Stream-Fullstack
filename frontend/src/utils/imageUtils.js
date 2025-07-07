// Default poster image URL
export const DEFAULT_POSTER_URL = "https://discussions.apple.com/content/attachment/592590040";

// Function to get poster URL with fallback to default
export const getPosterUrl = (posterUrl) => {
    if (!posterUrl || posterUrl.trim() === '') {
        return DEFAULT_POSTER_URL;
    }
    return posterUrl;
};

// Function to handle image error and fallback to default
export const handleImageError = (event) => {
    event.target.src = DEFAULT_POSTER_URL;
    event.target.onerror = null; // Prevent infinite loop
}; 