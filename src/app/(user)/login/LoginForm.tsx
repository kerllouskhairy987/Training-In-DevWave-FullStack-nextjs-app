"use client";

import ButtonSpinner from '@/components/ButtonSpinner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(setLoading)

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "") return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");

        console.log({ email, password })
        router.replace("/")
    }

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loading} type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">
                {loading ? <ButtonSpinner /> : "Login"}
            </button>
        </form>
    )
}

export default LoginForm