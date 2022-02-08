import { useRouter } from "next/router";
import useSWR from "swr";
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { Post } from "../../interfaces/postInterface";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default function Sub() {
    const router = useRouter()
    dayjs.extend(relativeTime)
    console.log(router.query);
    const subName = router.query.sub
    const { data: sub, error } = useSWR(subName ? `sub/${subName}` : null)
    if (error) router.push('/')
    const subs: Post[] = sub?.posts
    const handleVote = (d: any, a: number) => d
    return (
        <div className="container flex pt-5">
            <div className="w-160">
                {subs?.map(post => <div key={post.identifier} className='flex mb-4 bg-white rounded divide-y divide-slate-200"'>
                    <div className="w-10 text-center bg-gray-200 rounded-1">
                        <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500">
                            <ArrowUpIcon onClick={() => handleVote(post, 1)} className={`${post.voteScore === 1 ? `text-red-500` : ''}`} />
                        </div>
                        <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500">
                            <ArrowDownIcon onClick={() => handleVote(post, -1)} className={`${post.voteScore === -1 ? `text-blue-500` : ''}`} />
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


                                </>
                            </Link>
                            <Link href={`/r/${post.subName}`}>
                                <>

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
        </div>
    )
}