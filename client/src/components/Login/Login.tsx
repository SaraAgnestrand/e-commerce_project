import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Login.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
      <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
              <h2>Logga in</h2>
              <div className="form-control">
                  <input 
                      type="email" 
                      id="email" 
                      placeholder="Ange din e-post" // Lägg till placeholder här
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