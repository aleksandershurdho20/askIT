import React, { FormEvent, useState } from "react"
import InputGroup from "../common/InputGroup/InputGroup"
import { useAuthDispatch, useAuthState } from "../context/auth"
import { apiInstance } from "../utils/apiInstance"
import { useRouter } from 'next/router'
import Link from "next/link"

export default function Login() {
    const [authFields, setAuthFields] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<any>({})
    const dispatch = useAuthDispatch()
    const router = useRouter()
    const { authenticated } = useAuthState()
    if (authenticated) router.push('/')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthFields({
            ...authFields,
            [name]: value
        })
        setErrors("")
    }

    const emailSvg = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke={errors.email ? "red" : "currentColor"}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
    const passwordSvg = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!authFields.email) {
                setErrors({ email: "Email cannot be empty!" })
                return;
            }
            else if (!authFields.password) {
                setErrors({ password: "Password cannot be empty!" })
                return;

            }
            const { data } = await apiInstance.post('auth/login', authFields)
            dispatch('LOGIN', data)
            router.push('/')
        } catch (error) {
            setErrors(error)

        }
    }
    return (

        <div className="h-screen flex">
            <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">AskIT</h1>
                    <p className="text-white mt-1">The most popular peer to peer lending at SEA</p>
                    <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
                </div>
            </div>
            <div className="flex w-1/2 justify-center items-center bg-white">
                <form className="bg-white">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                    <InputGroup
                        type="email"
                        placeholder="Email"
                        value={authFields.email}
                        name="email"
                        handleChange={handleChange}
                        Svg={emailSvg}
                        erorrMessage={errors.email}

                    />
                    <InputGroup
                        type="password"
                        placeholder="Password"
                        value={authFields.password}
                        name="password"
                        handleChange={handleChange}
                        Svg={passwordSvg}
                        erorrMessage={errors.password}

                    />

                    <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2" onClick={handleSubmit}>Login</button>
                    <Link href="/auth/forgot-password">
                        <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>

                    </Link>
                </form>
            </div>
        </div>
    )
}