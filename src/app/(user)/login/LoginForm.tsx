"use client";

import ButtonSpinner from '@/components/ButtonSpinner';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "") return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");

        try {
            setIsLoading(true);
            const res = await fetch(`${DOMAIN}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.status === 200) {
                toast.success(data.message);
                router.replace("/");
                router.refresh();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error)
            toast.error("Internal Server Error")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="mb-4 border rounded p-2 text-xl"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoading} type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">
                {isLoading ? <ButtonSpinner /> : "Login"}
            </button>
        </form>
    )
}

export default LoginForm