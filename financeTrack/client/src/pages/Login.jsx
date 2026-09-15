import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(){
        try{
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: email,
            password: password
        });
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
    }catch(error){
        setError('Invalid Email or Password')
    }
    }
    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
          
          type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleSubmit}>LogIn</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;