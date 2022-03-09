

import Link from 'next/link'
import { useAuthDispatch, useAuthState } from '../../context/auth'
import { apiInstance } from '../../utils/apiInstance'
import React, { useState, useEffect } from 'react'
import { sub } from '../../interfaces/Sub'
// import RedditLogo from '../images/reddit.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Navbar: React.FC = () => {
    const { authenticated, loading } = useAuthState()
    const dispatch = useAuthDispatch()
    const [name, setName] = useState<string>("")
    const [subs, setSubs] = useState<sub[]>([])
    const [timer, setTimer] = useState(null)
    const router = useRouter()


    useEffect(() => {
        if (name.trim() === "") {
            setSubs([])
            return;
        }
        searchSubs()
    }, [name])
    const handleLogout = () => {
        apiInstance.get('/auth/logout').then(() => {
            dispatch('LOGOUT')
            window.location.reload()
        })
    }

    const searchSubs = async () => {
        setTimer(
            setTimeout(async () => {
                try {
                    const { data } = await apiInstance.get('sub/search/' + name)
                    setSubs(data)
                    console.log(data)
                } catch (err) {
                    console.log(err)
                }
            }, 250)

        )
        clearTimeout(timer)

    }
    const handleSubRedirect = (sub: string) => {
        router.push(`/r/${sub}`)
        setName("")
    }
    return (
        <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
            {/* Logo and title */}
            <div className="flex items-center">
                <Link href="/">
                    <a>
                        {/* <RedditLogo className="w-8 h-8 mr-2" /> */}
                    </a>
                </Link>
                <span className="text-2xl font-semibold">
                    <Link href="/">readit</Link>
                </span>
            </div>
            {/* Serach Input */}
            <div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white relative">
                <i className="pl-4 pr-3 text-gray-500 fas fa-search "></i>
                <input
                    type="text"
                    className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
                    placeholder="Search"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="absolute left-0 right-0 bg-white" style={{ top: '100%' }}>
                    {subs?.map(sub => (
                        <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200" onClick={() => handleSubRedirect(sub.name)}>
                            <Image
                                src={sub.imageUrl}
                                height={(8 * 16) / 4}
                                width={(8 * 16) / 4}
                                className="rounded-full"

                            />
                            <div className="text-sm ml-4">
                                <p className="font-medium">

                                    {sub.name}
                                </p>
                                <p className='text-gray-600'>
                                    {sub.title}
                                </p>

                            </div>
                            {/* <div className="mr-4 overflow-hidden ">

                            </div> */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Auth buttons */}
            <div className="flex">
                {
                    (!loading && authenticated ? (
                        <button
                            className="w-32 py-1 mr-4 leading-5 hollow blue button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="w-32 py-1 mr-4 leading-5 hollow blue button">
                                    log in
                                </a>
                            </Link>
                            <Link href="/register">
                                <a className="w-32 py-1 leading-5 blue button">sign up</a>
                            </Link>
                        </>
                    ))}
            </div>
        </div>
    )
}

export default Navbar