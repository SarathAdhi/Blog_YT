import React, { useState, useEffect } from 'react';
import { Divider } from '../../common/components/elements/Divider';
import { H1, H2, H3, H5, P } from '../../common/components/elements/Text';
import Layout from '../../common/layouts/Layout.tsx';
import { ThumbUpIcon, ChatIcon, PencilAltIcon } from "@heroicons/react/solid";
import axios from 'axios';
import Router from 'next/router';
import { Textarea } from '../../common/components/elements/inputField';
import { Tags } from '../../common/components/elements/Tags';
import { Links } from '../../common/components/elements/links';
require('dotenv').config()

export async function getServerSideProps(context) {

    const postId = context.query.id;
    const request = await fetch('http://localhost:5000/post/getPost', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tokenID: process.env.SECURITY_KEY_FOR_AUTH, id: postId })
    });
    const post = await request.json();

    return {
        props: {
            post: post
        }
    }
}


export default function Post({ post }) {

    const [displayPost, setDisplayPost] = useState([])
    const [userComment, setUserComment] = useState('')
    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        if (localStorage.getItem('user-details')) {
            const userDetails = JSON.parse(localStorage.getItem('user-details'))
            setUserDetails(userDetails)

        } else {
            alert("Login First");
            Router.push('/auth/login')
        }
        setDisplayPost(post)
    }, [])

    async function updateLike() {
        var response = await axios.post("http://localhost:5000/post/updateLike",
            { tokenID: process.env.SECURITY_KEY_FOR_AUTH, id: displayPost._id, username: userDetails.username }
        )
        // Updating the post on real time without refreshing
        // console.log(response)
        setDisplayPost(response.data)
    }

    async function submitUserComment() {
        if(userComment === '') {
            alert("Empty comments");
            return false
        }
        var response = await axios.post("http://localhost:5000/post/Comment",
            {
                tokenID: process.env.SECURITY_KEY_FOR_AUTH,
                id: displayPost._id,
                username: userDetails.username,
                comment: userComment,
                userImage: userDetails.userImage,
            }
        )
        // console.log(response)
        // Updating the post on real time without refreshing
        setDisplayPost(response.data)
    }


    return (
        <Layout title={displayPost.title} className="mt-5 md:ml-20">
            <H5 className="mb-5 text-center font-normal flex">{displayPost.author + " · "}<p className='text-zinc-400'>&nbsp;{displayPost.createdAt}</p></H5>
            <div className='w-11/12 md:w-2/5 text-center'>
                <img className='w-full rounded-lg' src={displayPost.blogImage} />
            </div>
            <div className='w-11/12'>
                <P className="my-8 text-lg">{displayPost.message}</P>
            </div>
            <Divider className="md:mr-2 w-full" />
            <div className='w-11/12 flex flex-wrap my-2'>
                {
                    displayPost.tags &&
                    displayPost.tags.map((tag, index) => {
                        return (
                            <Links  key={tag + index} href={`/tags/${tag}`}>
                                <Tags>{tag}</Tags>
                            </Links>
                        )
                    })
                }
                {
                    !displayPost.tags &&
                    <Tags>No Tags</Tags>

                }
            </div>

            <Divider className="md:mr-2 w-full" />

            <div className='my-5 w-11/12 flex items-center justify-between' id='comments'>
                <H2>Comments&nbsp;{displayPost.comments && displayPost.comments.length}</H2>
                <PencilAltIcon className='cursor-pointer' width={30} height={30} onClick={submitUserComment} />
            </div>

            <Divider className="w-11/12 -mt-4" />

            <div className='w-11/12 flex justify-center flex-col mb-20'>
                <div className='w-full mt-2'>
                    <Textarea placeholder="Add a comment..."
                        onChange={(event) => {
                            setUserComment(event.target.value)
                        }} />
                </div>
                {
                    displayPost.comments &&
                    <div className='flex justify-center flex-col mt-5 w-full'>
                        {
                            displayPost.comments.map((details, index) => {
                                return (
                                    <div key={index} className="my-1 bg-gray-700 rounded-xl p-3 mb-5 flex flex-col" >
                                        <div className='flex items-center'>
                                            <img className='w-8 h-8 rounded-full' src={details.userImage} />
                                            <P className="ml-2">{details.username}</P>
                                        </div>
                                        <P className="ml-10">{details.comment}</P>
                                    </div>
                                )
                            })
                        }
                    </div>

                }
            </div>
            <div className='fixed bottom-0 bg-white cursor-pointer px-3 py-1 rounded flex items-center justify-between w-auto flex-row my-2'>
                <div className='flex items-center text-slate-600 hover:text-black' onClick={updateLike}>
                    <ThumbUpIcon width={30} height={30} />
                    {/* {!displayPost.likeCount && 0} */}
                    {displayPost.likeCount && displayPost.likeCount.length}
                </div>
                <a href='#comments' className='ml-5'><ChatIcon width={30} height={30} className="text-slate-600 hover:text-black" /></a>
            </div>

        </Layout>
    )
}
