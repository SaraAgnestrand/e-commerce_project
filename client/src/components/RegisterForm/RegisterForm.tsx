import React, { useState } from 'react';
import '../LoginForm/LoginForm.css'; 

const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Skapa konto</h2>
                <div className="form-control">
                    <input 
                        type="text" 
                        id="firstName" 
                        placeholder="Förnamn"
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-control">
                    <input 
                        type="text" 
                        id="lastName" 
                        placeholder="Efternamn"
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                </div>
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
                <button type="submit" className="login-button">Registrera</button>
            </form>
        </div>
    );
};

export default RegisterForm;