import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { apiInstance } from '../../../utils/apiInstance'
import { Post } from "../../../interfaces/postInterface"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
export default function UpdatePost() {
    const router = useRouter()
    const { query: { id: params } } = router
    const [data, setData] = useState({})
    if (typeof params == undefined) return <h1>Loading</h1>
    useEffect(() => {

        apiInstance.get<Post>(`posts/${params && params[1]}/${params && params[0]}`).then((res) => {
            setData(res.data)
        }).catch(err => console.log(err))
    }, [])

    dayjs.extend(relativeTime);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }
    return (

        <div className="max-w-2xl mx-auto bg-white p-16 rounded mt-6">
            <div className="grid  gap-8 grid-cols-1">
                <div className="flex flex-col ">
                    <div className="flex flex-col sm:flex-row items-center">
                        <h2 className="font-semibold text-lg mr-auto">Post Info</h2>
                        <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0" />
                    </div>
                    <div className="mt-5">
                        <div className="form">

                            <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className="font-semibold text-gray-600 py-2">Title <abbr title="required">*</abbr></label>
                                    <input placeholder="Company Name" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-slate-200  rounded-lg h-10 px-4 hover:border-indigo-500" type="text" name="title" onChange={handleChange} value={data.title} />
                                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                                </div>
                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className="font-semibold text-gray-600 py-2">Community  Name <abbr title="required">*</abbr></label>
                                    <input placeholder="Email ID" className="appearance-none block w-full bg-grey-lighter text-grey-darker border  border-slate-200 rounded-lg h-10 px-4 cursor-not-allowed " type="text" value={data.subName} disabled={true} />
                                    <p className="text-red text-xs hidden">Please fill out this field.</p>
                                </div>
                            </div>

                            <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className="font-semibold text-gray-600 py-2">Created At </label>
                                    <input placeholder="Email ID" className="appearance-none block w-full bg-grey-lighter text-grey-darker border  border-slate-200 rounded-lg h-10 px-4 cursor-not-allowed " type="text" value={dayjs(data.createAt).format('DD/MM/YYYY')} disabled={true} />
                                </div>
                                <div className="mb-3 space-y-2 w-full text-xs">
                                    <label className="font-semibold text-gray-600 py-2">Updated At </label>
                                    <input placeholder="Email ID" className="appearance-none block w-full bg-grey-lighter text-grey-darker border  border-slate-200 rounded-lg h-10 px-4 cursor-not-allowed " type="text" value={dayjs(data.updatedAt).format('DD/MM/YYYY')} disabled={true} />
                                </div>
                            </div>
                            <div className="flex-auto w-full mb-1 text-xs space-y-2">
                                <label className="font-semibold text-gray-600 py-2">Description</label>
                                <textarea required className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-slate-200 rounded-lg  py-4 px-4 hover:border-indigo-500" placeholder="Enter description" name="body" value={data.body} onChange={handleChange} />
                                <p className="text-xs text-gray-400 text-left my-3">{data.body.length}/200</p>
                            </div>
                            <p className="text-xs text-red-500 text-right my-3">Required fields are marked with an
                                asterisk <abbr title="Required field">*</abbr></p>
                            <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border  text-gray-600 border-slate-200 rounded-full hover:shadow-lg hover:border-indigo-400"> Cancel </button>
                                <button className="mb-2 md:mb-0 bg-indigo-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-500">Save</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>)
}
