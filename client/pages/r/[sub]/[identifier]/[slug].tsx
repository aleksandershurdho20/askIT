import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Post } from "../../../../interfaces/postInterface";
import { useAuthState } from "../../../../context/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { Comment } from "../../../../interfaces/commentInterface";
import { sub as Sub } from "../../../../interfaces/Sub"
import { CakeIcon } from '@heroicons/react/solid'
import Comments from "../../../../containers/Posts/Comments";
export default function PostPAge() {
    const router = useRouter();
    const { identifier, sub, slug } = router.query;

    const { data: post, error } = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null);
    const { data: comments } = useSWR<Comment[]>(
        identifier && slug ? `/posts/${identifier}/${slug}/comments` : null
    )

    dayjs.extend(relativeTime);

    const { authenticated, user } = useAuthState();
    const vote = (nr: number) => nr;
    return (
        <>
            <Head>
                <title>{post?.title}</title>
            </Head>
            <Link href={`/r/${sub}`}>
                <a>
                    <div className="flex items-center w-full h-20 p-8 bg-indigo-500">
                        <div className="container flex">
                            {post && (
                                <div className="w-8 h-8 mr-2 overflow-hidden rounded-full">
                                    <Image
                                        src={post!.sub!.imageUrl}
                                        height={(8 * 16) / 4}
                                        width={(8 * 16) / 4}
                                    />
                                </div>
                            )}
                            <p className="text-xl font-semibold text-white">/r/{sub}</p>
                        </div>
                    </div>
                </a>
            </Link>
            <div className="container flex pt-5 mx-auto">
                {/* Post */}
                <div className="w-160">
                    <div className="bg-white rounded">
                        {post && (
                            <>
                                <div className="flex">
                                    {/* Vote section */}
                                    <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
                                        {/* Upvote */}
                                        <div
                                            className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                                            onClick={() => vote(1)}
                                        >

                                        </div>
                                        <p className="text-xs font-bold">{post.voteScore}</p>
                                        {/* Downvote */}
                                        <div
                                            className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                                            onClick={() => vote(-1)}
                                        >

                                        </div>
                                    </div>
                                    <div className="py-2 pr-2">
                                        <div className="flex items-center">
                                            <p className="text-xs text-gray-500">
                                                Posted by
                                                <Link href={`/u/${post.username}`}>
                                                    <a className="mx-1 hover:underline">
                                                        /u/{post.username}
                                                    </a>
                                                </Link>
                                                <Link href={post.url}>
                                                    <a className="mx-1 hover:underline">
                                                        {dayjs(post.createAt).fromNow()}
                                                    </a>
                                                </Link>
                                            </p>
                                        </div>
                                        {/* Post title */}
                                        <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                                        {/* Post body */}
                                        <p className="my-3 text-sm">{post.body}</p>
                                        {/* Actions */}
                                        <div className="flex">
                                            <Link href={post.url}>
                                                <a>
                                                    <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                                                    <span className="font-bold">
                                                        {post.commentCount} Comments
                                                    </span>
                                                </a>
                                            </Link>
                                            <i className="mr-1 fas fa-share fa-xs"></i>
                                            <span className="font-bold">Share</span>

                                            <i className="mr-1 fas fa-bookmark fa-xs"></i>
                                            <span className="font-bold">Save</span>
                                        </div>
                                    </div>
                                </div>

                                <Comments
                                    identifier={identifier}
                                    slug={slug}

                                />
                            </>
                        )}
                    </div>
                </div>
                {/* Sidebar */}
                {post && <div className="ml-6 w-80">
                    <div className="bg-white rounded">
                        <div className="p-3 bg-indigo-500 rounded-t">
                            <p className="font-semibold text-white">About Community</p>
                        </div>
                        <div className="p-3">
                            <p className="mb-3 text-md">{post!.sub!.name}</p>
                            <div className="flex mb-3 text-sm font-medium">
                                <div className="w-1/2">
                                    <p>5.2k</p>
                                    <p>members</p>
                                </div>
                                <div className="w-1/2">
                                    <p>150</p>
                                    <p>online</p>
                                </div>
                            </div>
                            <p className="my-3">
                                <CakeIcon className="mr-2 w-7 h-7 " />
                                Created
                            </p>
                            {authenticated && (
                                <Link href={`/r/${post.name}/submit`}>
                                    <a className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded py-1 text-sm blue button">Create Post</a>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
}
