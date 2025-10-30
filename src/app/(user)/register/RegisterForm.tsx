"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ButtonSpinner from '@/components/ButtonSpinner';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    console.log(setIsLoading)

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "") return toast.error("Username is required");
        if (email === "") return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");

        try {
            setIsLoading(true);
            const res = await fetch(`${DOMAIN}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            })
            console.log("RES", res)
            const data = await res.json();
            console.log("DATA", data)
            if (res.status === 201) {
                toast.success(data.message)
                router.replace("/");
                router.refresh();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Internal Server Error")
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                className="mb-4 border rounded p-2 text-xl"
                name='username'
                type="text"
                placeholder="Enter Your Username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="mb-4 border rounded p-2 text-xl"
                name='email'
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="mb-4 border rounded p-2 text-xl"
                name='password'
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoading} type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">
                {isLoading ? <ButtonSpinner /> : "Register"}
            </button>
        </form>
    )
}

export default RegisterForm