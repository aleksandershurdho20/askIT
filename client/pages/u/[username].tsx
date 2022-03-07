import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { Comment } from '../../interfaces/commentInterface'
import { Post } from '../../interfaces/postInterface'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import { AnnotationIcon, MailIcon } from '@heroicons/react/solid'
function User() {
    const router = useRouter()
    const { username } = router.query
    const { data, error } = useSWR<any>(username ? `user/${username}` : null)
    const latestPost = data?.submissions.filter((el: any) => el.type === "Post").sort((el: any) => el.createAt - 1)[0]

    console.log(latestPost)
    return (
        <>
            <Head>
                <title>{data?.user.username}</title>
            </Head>






            <div className="px-6 py-8">
                <div className="container flex justify-between mx-auto">
                    <div className="w-full lg:w-8/12">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Posts</h1>
                            <div>
                                <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option>Latest</option>
                                    <option>Last Week</option>
                                </select>
                            </div>
                        </div>
                        {data && (
                            <>

                                {data.submissions.map((submission: any) => {
                                    if (submission.type === 'Post') {
                                        const post: Post = submission
                                        return (
                                            <div className="mt-6" key={post.identifier}>
                                                <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
                                                    <div className="flex items-center justify-between">

                                                        <span className="font-light text-gray-600">{dayjs(post.createAt).fromNow()}</span>
                                                        <Link href={post.url}>
                                                            <span className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">/r/{post.subName}</span>
                                                        </Link>
                                                    </div>
                                                    <div className="mt-2"><Link href={post.url}><span className="text-2xl font-bold text-gray-700 hover:underline">
                                                        {post.title}
                                                    </span></Link>
                                                        {post.body &&
                                                            <p className="mt-2 text-gray-600">
                                                                {post.body}
                                                            </p>
                                                        }
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4"><a href="#" className="text-indigo-500 hover:underline">Posted By</a>
                                                        <div><a href="#" className="flex items-center"><img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="avatar" className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" />
                                                            <h1 className="font-bold text-gray-700 hover:underline">/u/{post.username}</h1>

                                                        </a></div>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    } else {
                                        const comment: Comment = submission
                                        return (
                                            <div
                                                key={comment.identifier}
                                                className="flex my-4 bg-white rounded"
                                            >
                                                <div className="flex-shrink-0 w-10 py-4 text-center bg-gray-200 rounded-l">
                                                    <i className="text-gray-500 fas fa-comment-alt fa-xs"></i>
                                                </div>
                                                <div className="w-full p-2">
                                                    <p className="mb-2 text-xs text-gray-500">
                                                        {comment.username}

                                                        <span> commented on </span>
                                                        <Link href={comment!.post!.url}>
                                                            <a className="font-semibold cursor-pointer hover:underline">
                                                                {comment?.post?.title}
                                                            </a>
                                                        </Link>
                                                        <span className="mx-1">•</span>
                                                        <Link href={`/r/${comment?.post?.subName}`}>
                                                            <a className="text-black cursor-pointer hover:underline">
                                                                /r/{comment?.post?.subName}
                                                            </a>
                                                        </Link>
                                                    </p>
                                                    <div className='divide-y divide-gray-400' />
                                                    <p>{comment.body}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}

                                <div className="ml-6 w-80">
                                    <div className="bg-white rounded">
                                        <div className="p-3 bg-indigo-500 rounded-t">
                                            <img
                                                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                                alt="user profile"
                                                className="w-16 h-16 mx-auto border-2 border-white rounded-full"
                                            />
                                        </div>
                                        <div className="p-3 text-center">
                                            <h1 className="mb-3 text-xl">{data.user.username}</h1>
                                            <div className='divide-y' />
                                            <p className="mt-3">
                                                Joined {dayjs(data.user.createdAt).format('MMM YYYY')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="mt-8">
                            <div className="flex">
                                <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-500 bg-white rounded-md cursor-not-allowed">
                                    previous
                                </a>
                                <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                                    1
                                </a>
                                <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                                    2
                                </a>
                                <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                                    3
                                </a>
                                <a href="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                                    Next
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden w-4/12 -mx-8 lg:block">
                        <div className="px-8">
                            <h1 className="mb-4 text-xl font-bold text-gray-700">User</h1>
                            <div className="ml-6 flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md ">
                                <div className="bg-white rounded">
                                    <div className="p-3 bg-indigo-500 rounded-t">
                                        <img
                                            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                            alt="user profile"
                                            className="w-16 h-16 mx-auto border-2 border-white rounded-full"
                                        />
                                    </div>
                                    <div className="p-3 text-center">
                                        <h1 className="mb-3 text-xl">{data?.user.username}</h1>
                                        <div className='divide-y' />
                                        <p className="mt-3">
                                            Joined {dayjs(data?.user.createdAt).format('MMM YYYY')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="px-8 mt-10">
                            <h1 className="mb-4 text-xl font-bold text-gray-700">Comments</h1>
                            <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
                                <ul>
                                    <li><a href="#" className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                        AWS</a></li>
                                    <li className="mt-2"><a href="#" className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                        Laravel</a></li>
                                    <li className="mt-2"><a href="#" className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">- Vue</a>
                                    </li>
                                    <li className="mt-2"><a href="#" className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                        Design</a></li>
                                    <li className="flex items-center mt-2"><a href="#" className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">-
                                        Django</a></li>
                                    <li className="flex items-center mt-2"><a href="#" className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline">- PHP</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="px-8 mt-10">
                            <h1 className="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
                            <div className="flex flex-col max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
                                <div className="flex items-center justify-center"><a href="#" className="px-2 py-1 text-sm text-green-100 bg-gray-600 rounded hover:bg-gray-500">{latestPost.slug}</a>
                                </div>
                                <div className="mt-4"><a href="#" className="text-lg font-medium text-gray-700 hover:underline">Build
                                    {latestPost.title}</a></div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center"><img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" className="object-cover w-8 h-8 rounded-full" /><a href="#" className="mx-3 text-sm text-gray-700 hover:underline">{latestPost.username}</a></div><span className="text-sm font-light text-gray-600">{dayjs(latestPost.createdAt).format('MMM YYYY')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default User