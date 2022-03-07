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



    return (
        <>
            <Head>
                <title>{data?.user.username}</title>
            </Head>
            {data && (
                <div className="container flex pt-5">
                    <div className="w-160">
                        {data.submissions.map((submission: any) => {
                            if (submission.type === 'Post') {
                                const post: Post = submission
                                return (
                                    <div key={post.identifier} className="flex mb-4 bg-white rounded">
                                        <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
                                            <div
                                                className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                                            >

                                            </div>
                                            <p className="text-xs font-bold">{post.voteScore}</p>
                                            <div
                                                className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                                            >

                                            </div>
                                        </div>
                                        <div className="w-full p-2">
                                            <div className="flex items-center">
                                                <Link href={`/r/${post.subName}`}>
                                                    <img
                                                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                                        className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                                                    />
                                                </Link>
                                                <Link href={`/r/${post.subName}`}>
                                                    <a className="text-xs font-bold cursor-pointer hover:underline">
                                                        /r/{post.subName}
                                                    </a>
                                                </Link>
                                                <p className="text-xs text-gray-500">
                                                    <span className="mx-1">•</span>
                                                    Posted by
                                                    <Link href={`/u/${post.username}`}>
                                                        <a className="mx-1 hover:underline">/u/{post.username}</a>
                                                    </Link>
                                                    <Link href={post.url}>
                                                        <a className="mx-1 hover:underline">
                                                            {dayjs(post.createAt).fromNow()}
                                                        </a>
                                                    </Link>
                                                </p>
                                            </div>
                                            <Link href={post.url}>
                                                <a className="my-1 text-lg font-medium">{post.title}</a>
                                            </Link>
                                            {post.body && <p className="my-1 text-sm">{post.body}</p>}

                                            <div className="flex">
                                                <Link href={post.url}>
                                                    <a>
                                                        <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                                                        <span className="font-bold">{post.commentCount} Comments</span>

                                                    </a>
                                                </Link>
                                                <i className="mr-1 fas fa-share fa-xs"></i>
                                                <span className="font-bold">Share</span>


                                                <i className="mr-1 fas fa-bookmark fa-xs"></i>
                                                <span className="font-bold">Save</span>

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
                    </div>
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
                </div>
            )}





        </>
    )
}

export default User