import { useState } from "react";
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()
    
    const handleLogin = async(e) => {
        e.preventDefault()

        await login(email, password)

    }

    return (
        <form className='login' onSubmit={handleLogin}>
            <h3>Log In</h3>

            <label>Email:</label>
            <input 
                type="email" 
                onChange={(e) => {setEmail(e.target.value)}}
                value={email}   
                required={true}
            />

            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => {setPassword(e.target.value)}}
                value={password}   
                required={true}
            />
            <button disabled={isLoading}>Log In</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
}
 
export default Login;