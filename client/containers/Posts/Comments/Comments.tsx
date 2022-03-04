import React, { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useAuthState } from '../../../context/auth'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from "swr";
import { Comment as C } from '../../../interfaces/commentInterface'
import { apiInstance } from '../../../utils/apiInstance';
import Loading from '../../../common/Loading';
interface Comment {
    identifier: string,
    slug: string

}

const Comments: React.FC<Comment> = ({
    identifier,
    slug,



}) => {
    dayjs.extend(relativeTime);
    const { authenticated, user } = useAuthState();
    const [newComment, setNewComment] = useState<string>("");
    const { data: comments } = useSWR<C[]>(
        identifier && slug ? `/posts/${identifier}/${slug}/comments` : null
    )
    const [loading, setLoading] = useState<boolean>(false)

    const vote = (nr: number) => nr;
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (newComment.trim() === '') return
        apiInstance.post(`/posts/${identifier}/${slug}/comments`, { body: newComment }).then(res => {
            console.log(res)
            setNewComment('')
            setLoading(false)

        })
            .catch(err => {
                console.log(err)
                setLoading(false)

            })
    }


    return (
        <>
            {loading ? <Loading /> :
                <>
                    <div className="pl-10 pr-6 mb-4">
                        {authenticated ? (
                            <div>
                                <p className="mb-1 text-xs">
                                    Comment as{" "}
                                    <Link href={`/u/${user!.username}`}>
                                        <a className="font-semibold text-indigo-500">
                                            {user!.username}
                                        </a>
                                    </Link>
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                                        onChange={(e) => setNewComment(e.target.value)}
                                        value={newComment}
                                    ></textarea>
                                    <div className="flex justify-end">
                                        <button
                                            className="px-3 py-1 blue button"
                                            disabled={newComment.trim() === ""}
                                        >
                                            Comment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between px-2 py-4 border border-gray-200 rounded">
                                <p className="font-semibold text-gray-400">
                                    Log in or sign up to leave a comment
                                </p>
                                <div>
                                    <Link href="/login">
                                        <a className="px-4 py-1 mr-4 hollow blue button">
                                            Login
                                        </a>
                                    </Link>
                                    <Link href="/register">
                                        <a className="px-4 py-1 blue button">Sign Up</a>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='divide-y divide-dashed' />

                    {comments?.map((comment) => (
                        <div className="flex" key={comment.identifier}>
                            <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
                                <div
                                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                                    onClick={() => vote(1)}
                                ></div>
                                <p className="text-xs font-bold">{comment.voteScore}</p>
                                <div
                                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                                    onClick={() => vote(-1)}
                                ></div>
                            </div>
                            <div className="py-2 pr-2">
                                <p className="mb-1 text-xs leading-none">
                                    <Link href={`/u/${comment.username}`}>
                                        <a className="mr-1 font-bold hover:underline">
                                            {comment.username}
                                        </a>
                                    </Link>
                                    <span className="text-gray-600">
                                        {`
                                    ${comment.voteScore}
                                    points •
                                    ${dayjs(comment.createAt).fromNow()}
                                `}
                                    </span>
                                </p>
                                <p>{comment.body}</p>
                            </div>
                        </div>
                    ))}
                </>

            }



        </>

    )

}


export default Comments
