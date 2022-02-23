import React from 'react'
import useSWR from 'swr'
import { sub } from '../../interfaces/Sub'
import Image from 'next/image'
import Link from 'next/link'
export default function Sidebar() {
    const { data } = useSWR('sub/popular')
    return (
        <div className='ml-6 w-80'>
            <div className="bg-white rounded">
                <div className="p-4 border-b-2">
                    <p className="text-lg fomnt-semibold text-center">
                        Top Communities
                    </p>
                </div>
                {data ? data.map((el: sub) => (
                    <div key={el.name} className="flex items-center px-4 py-2 text-xs border-b border-slate-200">
                        <div className="rounded-full overflow-hidden">
                            <Image
                                src={el.imageUrl}
                                width={6 * 16 / 4}
                                height={6 * 16 / 4}

                            />
                        </div>
                        <Link href={`/r/${el.name}`}>
                            <a className="font-bold hover:cursor-pointer">
                                /r/${el.name}
                            </a>
                        </Link>
                        <p className="ml-auto font-med">
                            {el.postCount}
                        </p>
                    </div>
                )) : ""}
            </div>
        </div>
    )
}
