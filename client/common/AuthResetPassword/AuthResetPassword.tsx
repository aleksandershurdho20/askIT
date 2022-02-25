import React from 'react'
import { forgotPassword } from '../../interfaces/forgotPassword'

export default function AuthResetPassword({ title, description, name, placeholder, label, isSettingUpNewPassword, type, buttonTitle, icon: Icon, hasErrors, errorMessage, value, onChange, handleClick, hideInput }: forgotPassword) {
    return (
        <div className="flex justify-center min-h-screen bg-gray-100 antialiased">
            <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white ">
                <div className="flex items-center justify-center">
                    <div className="rounded-full w-20 h-20" style={{ background: '#F8F5FE' }}>
                        <div className="rounded-full w-14 h-14 flex justify-center content-center  mt-3 mx-auto" style={{ background: "#F4EBFF" }}>
                            {Icon}
                        </div>

                    </div>

                </div>
                {/* header */}
                <div className="text-center m-6">
                    <h1 className="text-3xl font-semibold text-gray-700">{title}</h1>
                    <p className="text-gray-500">{description}</p>
                </div>
                {/* sign-in */}
                <div className="m-6">
                    <form className="mb-4">
                        {!hideInput && <div className="mb-6">
                            <label htmlFor={label} className="block mb-2 text-sm text-gray-600 dark:text-gray-400">{label}</label>
                            <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`w-full px-3 py-2 placeholder-gray-300 border ${hasErrors ? ` border-red-500` : `border-gray-300 `} rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`} />
                        </div>}

                        {isSettingUpNewPassword &&
                            <div className="mb-6">
                                <label htmlFor={"Confirm Password"} className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirm Password</label>

                                <input type={type} name={name} placeholder={placeholder} className={`w-full px-3 py-2 placeholder-gray-300 border ${hasErrors ? ` border-red-500` : `border-gray-300 `} rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`} />
                            </div>}
                        {hasErrors && <span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 mb-3'>{errorMessage}</span>}
                        <div className="mb-6">
                            <button type="button" onClick={handleClick} className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out">{buttonTitle}</button>
                        </div>
                        <p className="text-sm text-center text-gray-400">

                            <a href="/login" className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline">Back to Login</a>.
                        </p>
                    </form>

                </div>
            </div>
        </div>)
}
