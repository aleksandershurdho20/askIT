import Head from 'next/head'
import React, { FormEvent, useState } from 'react'
import useSWR from 'swr'
import { sub } from '../../../interfaces/Sub'
import { useRouter } from 'next/router'
import { apiInstance } from '../../../utils/apiInstance'
import Loading from '../../../common/Loading'
import { Post } from '../../../interfaces/postInterface'
import Modal from '../../../common/Modal'

export default function Submit() {
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState('')
    const [hasErrors, setHasErrors] = useState<boolean>(false)
    const router = useRouter()
    const [onSuccess, setOnSucces] = useState<boolean>(false)
    const { sub: subName } = router.query


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setHasErrors(true)
            return;
        }
        try {
            const { data: post } = await apiInstance.post<Post>('posts/create', {
                title: title.trim(),
                body,
                sub: subName
            })
            setTitle("")
            setBody("")
            setOnSucces(true)

        } catch (error) {
            console.log(error)
            setOnSucces(false)

        }

    }
    return (

        <>


            <div className="flex justify-center min-h-screen bg-gray-100 antialiased">
                <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white ">

                    <div className="m-6">
                        <form className="mb-4" >

                            <div className="mb-6">
                                <label htmlFor={"title"} className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Title</label>
                                <input type="text" name={"title"} value={title} onChange={(e) => {
                                    setTitle(e.target.value)
                                    setHasErrors(false)
                                }} placeholder={"Enter title"} className={`w-full px-3 py-2 placeholder-gray-300 border ${hasErrors ? ` border-red-500` : `border-gray-300 `} rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`} />
                            </div>
                            {hasErrors && <span className='text-sm text-red-500 mb-6'>Title cannot be empty!</span>}

                            <div className="mb-6">
                                <label htmlFor={"text"} className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Text</label>
                                <textarea rows={4} name={"body"} value={body} onChange={(e) => {
                                    setBody(e.target.value)
                                }} placeholder={"Enter title"} className={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300  rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`} />
                            </div>

                            <div className="mb-6">
                                <button type="button" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out" onClick={handleSubmit}>Create</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>)
            {onSuccess && <Modal

                title='Post created succesfully!'
                type='confirm'
                onCancel={() => setOnSucces(false)}
                showConfirmButton={false}
            />}

        </>


    )
}
