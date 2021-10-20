import { useAuth, useLogin } from '../lib/auth.state';
import { useRef } from 'react';
import { Redirect } from 'react-router';


export default function LoginForm() {
    const email = useRef();
    const password = useRef();
    const login = useLogin();
    const auth = useAuth();

    return auth.status === "authenticated" ? <Redirect to="/" /> : (
        <div className="mx-auto max-w-md px-4 py-6 bg-white shadow">
            <p className="font-bold text-center text-3xl tracking-widest">LOGIN</p>
            <div className="mt-8">
                <div>
                    <label htmlFor="emailInput" className="block w-full">Email</label>
                    <input ref={email} id="emailInput" type="email" className="block w-full shadow mt-4 h-10 px-5 border focus:outline-none focus:ring-2 focus:ring-red-300"></input>
                </div>
                <div className="mt-6">
                    <label htmlFor="passwordInput" className="block w-full">Password</label>
                    <input ref={password} id="passwordInput" type="password" className="block w-full shadow mt-4 h-10 px-5 border focus:outline-none focus:ring-2 focus:ring-red-300"></input>
                </div>
                <button className="mx-auto block h-10 w-full bg-red-400 text-white mt-8 hover:bg-red-500" onClick={()=>{login(email.current.value, password.current.value)}}>ENTER</button>
            </div>
        </div>
    )
}