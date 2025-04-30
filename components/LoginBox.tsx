'use client' // This tells Next.js this is a client-side component

import { useState } from 'react'
import { supabase } from '@/supabaseClient' // Ensure supabaseClient is set up correctly
import Image from 'next/image'

export default function LoginButton() {
    const handleLogin = async (event) => { // i know this says its wrong.... but its not. It fixed everything!                                  
        event.preventDefault();            // please dont try to fix unless it messes with your code, if it does then good luck
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: "http://localhost:3000/searchMap",
            },
    })

        if (error) {
            console.error('Error logging in:', error.message)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            
            <h1 className="text-3xl font-bold text-center mb-10 bg-black text-white p-4 rounded-2xl border border-gray-500">
                Welcome to Trailwise
            </h1>
            <form className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-md w-full max-w-xs" action="/authenticate" method="POST">
                <input
                    type="text"
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded-2xl text-gray-700"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 border border-gray-300 rounded-2xl text-gray-700"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
                >
                    Log In
                </button>

                <p className="p-2  text-center text-gray-700" >OR</p>

                <button
                    onClick={handleLogin}
                    className="flex justify-center items-center px-4 py-2 bg-white text-white rounded hover:bg-white"
                >
                    <Image
                    src="/Google-Symbol.png"
                    alt="Google logo"
                    width={40}
                    height={40}
                    className="inline-block mr-2"
                    />
                    
                </button>
            </form>
        </div>
    )
}