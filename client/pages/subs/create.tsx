import React, { FormEvent, useState } from 'react'
import { createSub } from '../../interfaces/Sub'

import Head from 'next/head'
import { apiInstance } from '../../utils/apiInstance'
import Loading from '../../common/Loading'

export default function Create() {
    const [subData, setSubData] = useState<createSub>({
        name: '',
        description: '',
        title: '',
        loading: false
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSubData({
            ...subData,
            [name]: value
        })
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubData({
            ...subData,
            loading: true
        })
        try {
            apiInstance.post('sub/create', subData)
            setSubData({
                ...subData,
                name: '',
                description: '',
                title: '',
                loading: false
            })

        } catch (error) {
            setSubData({
                ...subData,

                loading: true
            })
        }
    }
    return (
        <>
            <Head>
                <title>Create a Community</title>
            </Head>
            {subData.loading ? <Loading /> : <div className="min-h-screen bg-indigo-400 flex justify-center items-center">
                <div className="absolute w-60 h-60 rounded-xl bg-indigo-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block overflow-hidden">
                </div>
                <div className="absolute w-48 h-48 rounded-xl bg-indigo-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
                </div>
                <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Create a Community</h1>
                        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Lorem Ipsum is simply dummy text of the  </p>
                    </div>

                    <div className="space-y-4 ">
                        <input type="text" placeholder="Name" name="name" value={subData.name} onChange={handleChange} className="block text-sm py-3 px-4  border-gray-200 focus:border-indigo-500 rounded-lg w-full border outline-none" />

                        <input type="text" placeholder="Title" name="title" value={subData.title} onChange={handleChange} className="block text-sm py-3 px-4  border-gray-200 focus:border-indigo-500 rounded-lg w-full border outline-none" />
                        <textarea rows={4} placeholder="Description" name="description" value={subData.description} onChange={(e) => setSubData({ ...subData, description: e.target.value })} className="block text-sm py-3 px-4 border-gray-200 focus:border-indigo-500 rounded-lg w-full border outline-none" />
                    </div>

                    <div className="text-center mt-6">
                        <button className="py-3 w-64 text-xl text-white bg-indigo-400 rounded-2xl" onClick={handleSubmit}>Create </button>

                    </div>
                </div>
                <div className="w-40 h-40 absolute bg-indigo-300 rounded-full top-0 right-12 hidden md:block" />
                <div className="w-20 h-40 absolute bg-indigo-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
                </div>
            </div>}
        </>
    )
}
