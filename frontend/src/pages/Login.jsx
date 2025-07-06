import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "../components/ThemeToggle";
import "./Login.css";
import axios from "axios";
import { loginUser, setError, setLoading, selectUserError, selectUserLoading } from "../redux/features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const isLoading = useSelector(selectUserLoading);
 
  const handleGoBack = () => {
    navigate(-1);
  };

  async function handleLogin(event) {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Validate inputs
    if (!username || !password) {
      dispatch(setError('Username and password are required'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await axios.post("http://localhost:3000/auth/login",
        {
          username, 
          password
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      
      // Extract user data from response and dispatch to Redux
      const userData = {
        username: response.data.newUser.username,
        id: response.data.newUser.id,
        name: response.data.newUser.username, // Use username as name for display
        email: `${response.data.newUser.username}@example.com`, // Mock email since backend doesn't provide it
        avatar: `https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=${response.data.newUser.username.charAt(0).toUpperCase()}`,
        joinDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }),
        totalSongs: 0,
        totalPlaylists: 0
      };

      dispatch(loginUser(userData));
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <section className="login-section">
      <div className="login-header">
        <button onClick={handleGoBack} className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg"width="20" height="20" viewBox="0 0 24 24" fill="none"stroke="currentColor" strokeWidth="2"strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1>Sound stream</h1>
        <ThemeToggle />
      </div>

      <div className="middle">
        <h1>Welcome back</h1>

        <form onSubmit={handleLogin}>
          <input id="username" type="text" placeholder="username"/>
          <input id="password" type="password" placeholder="Password"/>
          {error && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {error}
            </div>
          )}
          <input 
            type="submit" 
            value={isLoading ? "Logging in..." : "Login"}
            disabled={isLoading}
          />
        </form>
      </div>

      <p>
        create an account <Link to="/register">register</Link>
      </p>
    </section>
  );
};

export default Login;
