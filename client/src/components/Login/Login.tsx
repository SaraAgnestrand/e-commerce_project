import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom'; 
import './Login.css';

const LoginForm: React.FC = () => {
    const { login } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (login) {
            await login(email, password);
        } else {
            console.error('Login function is not available');
        }
    };

    return (
      <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
              <h2>Logga in</h2>
              <div className="form-control">
                  <input 
                      type="email" 
                      id="email" 
                      placeholder="Ange din e-post" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                  />
              </div>
              <div className="form-control">
                  <input 
                      type="password" 
                      id="password" 
                      placeholder="Ange ditt lösenord" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                  />
              </div>
              <button type="submit" className="login-button">Logga in</button>
              <Link to="/Register" className="createAcount-button">Skapa konto</Link>
          </form>
      </div>
  );
};

export default LoginForm;