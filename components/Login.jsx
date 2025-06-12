import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');         // to store username input
  const [password, setPassword] = useState('');         // to store password input
  const [isRegistering, setIsRegistering] = useState(false); // to toggle between login/register mode
  const [error, setError] = useState('');               // to show error messages

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {}; // get existing users

    if (isRegistering) {
      // REGISTRATION LOGIC
      if (users[username]) {
        setError('❌ Username already exists');
      } else {
        users[username] = password; // add new user
        localStorage.setItem('users', JSON.stringify(users)); // save to localStorage
        localStorage.setItem('typingUser', username); // store logged-in user
        onLogin(username); // inform App that user logged in
      }
    } else {
      // LOGIN LOGIC
      if (users[username] && users[username] === password) {
        localStorage.setItem('typingUser', username); // set logged-in user
        onLogin(username); // inform App
      } else {
        setError('❌ Invalid username or password');
      }
    }
  };

  return (
    <div className="login-box">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // update username
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // update password
      />

      <button onClick={handleLogin}>
        {isRegistering ? 'Register' : 'Login'}
      </button>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Toggle between Login and Register */}
      <p>
        {isRegistering ? 'Already have an account?' : 'New user?'}{' '}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login here' : 'Register here'}
        </button>
      </p>
    </div>
  );
};

export default Login;
