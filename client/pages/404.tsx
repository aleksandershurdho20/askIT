import React from 'react'
import { useRouter } from 'next/router'
export default function NotFound() {
    const router = useRouter()
    const handleRedirect = () => router.push('/')
    return (
        <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
            <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
                <div className="w-full md:w-1/2">
                    <div className="mb-10 lg:mb-20">
                        <img src="https://i.ibb.co/G9DC8S0/404-2.pngg" />
                    </div>
                    <div className="mb-10 md:mb-20 text-gray-600 font-light">
                        <h1 className="font-black uppercase text-3xl lg:text-5xl text-indigo-700 mb-10">
                            {/* 그런 앱은
                            <br />
                            없어 보이네요 */}
                            Looks like you've found the doorway to the great nothing

                        </h1>
                        <p>Sorry about that! Please visit our hompage to get where you need to go.</p>
                    </div>
                    <div className="mb-20 md:mb-0">
                        <button className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-blue-500 hover:text-blue-600"
                            onClick={handleRedirect}
                        >
                            Take me there!
                        </button>
                    </div>
                </div>
                {/* <div className="w-full md:w-1/2 text-center">
                    <img
                        src="https://i.ibb.co/G9DC8S0/404-2.pngg"
                        className="w-64 h-64"
                    />
                </div> */}
            </div>
            <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform" />
            <div className="w-96 h-full bg-indigo-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform" />
        </div>

    )
}
