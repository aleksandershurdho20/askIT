import React from 'react'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { apiInstance } from '../../utils/apiInstance'
import { Post } from '../../interfaces/postInterface'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid'

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([])
    useEffect(() => {
        apiInstance.get('posts/get').then(res => setPosts(res.data)).catch(err => console.log(err))
    }, [])
    dayjs.extend(relativeTime)

    const handleVote = async (params: Post, value: number) => {
        const { identifier, slug } = params
        const body = {
            identifier,
            slug,
            value

        }
        try {
            const { data } = await apiInstance.post('votes/vote', body)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-160">
            {posts.map(post => <div key={post.identifier} className='flex mb-4 bg-white rounded'>
                <div className="w-10 text-center bg-gray-200 rounded-1">
                    <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500">
                        <ArrowUpIcon onClick={() => handleVote(post, 1)} />
                    </div>
                    <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-00">
                        <ArrowDownIcon onClick={() => handleVote(post, -1)} />
                    </div>
                    <p className='text-xs font-bold'>{post.voteScore}</p>
                </div>
                <div className="w-full p-2">
                    <div className="flex items-center">
                        <Link href={`/r/${post.subName}`}>
                            <>
                                <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                    className='w-6 h-6  mr-1 rounded-full cursor-pointer'
                                />
                                <a className='text-xs font-bold hover:underline cursor-pointer'>
                                    /r/{post.subName}
                                </a>

                            </>
                        </Link>
                        <p className="text-xs text-gray-500">
                            <span className="mx-1">
                                *
                            </span>
                            Posted by
                            <Link href={`/u/${post.username}`}>
                                <a className='mx-1 hover:underline'>
                                    {post.username || "user"}
                                </a>
                            </Link>
                            <Link href={`/r/${post.subName}/${post.identifier}/${post.slug}`}>
                                <a className='mx-1 hover:underline'>
                                    {dayjs(post.createAt).fromNow()}
                                </a>
                            </Link>
                        </p>
                    </div>
                    <Link href={post.url}>
                        <a className='my-1 text-lg font-medium'>{post.title}</a>
                    </Link>
                    {post.body && <p className='my-1 text-sm'>{post.body}</p>}
                    <div className="flex">
                        <Link href={post.url}>
                            <a>
                                <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                                    <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                                    <span className="font-bold">{post.commentCount} Comments</span>
                                </div>
                            </a>
                        </Link>
                        <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                            <i className="mr-1 fas fa-share fa-xs"></i>
                            <span className="font-bold">Share</span>
                        </div>
                        <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                            <i className="mr-1 fas fa-bookmark fa-xs"></i>
                            <span className="font-bold">Save</span>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}


// export const getServerSideProps:GetServerSideProps = async () =>{
//     try {
//         const {data} = await apiInstance.get('posts/get')
//         return {props:{posts:data}}
//     } catch (error) {
//         return {props:{error:"Something went"}}
//     }
// }