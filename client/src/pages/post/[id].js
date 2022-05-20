import React, { useState, useEffect } from 'react';
import { Divider } from '../../common/components/elements/Divider';
import { H1, H2, H5, P } from '../../common/components/elements/Text';
import { Layout } from '../../common/layouts/Layout';
import { ThumbUpIcon, ChatIcon, PencilAltIcon } from "@heroicons/react/solid";
import { Links } from '../../common/components/elements/links';
import axios from 'axios';
import { useRouter } from 'next/router';
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
    const router = useRouter();

    useEffect(() => {
        setDisplayPost(JSON.parse(post.message)[0])
    }, [])

    async function updateLike() {
        var response = await axios.post("http://localhost:5000/post/updateLike",
        { tokenID: process.env.SECURITY_KEY_FOR_AUTH, id: displayPost._id }
        )
        if(response)
            router.reload(router.asPath)
    }

    return (
        <Layout title={displayPost.title} navbar={true} className="mt-5 md:ml-20">
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
                        return <P key={tag + index} className="my-1 md:my-5 text-lg text-black text-center rounded-2xl px-2 mr-2 bg-white">{tag}</P>
                    })
                }
                {
                    !!displayPost.tags &&
                    <P className="my-1 md:my-5 text-lg text-black text-center rounded-2xl px-2 mr-2 bg-white">No Tags</P>

                }
            </div>

            <Divider className="md:mr-2 w-full" />
            <div className='my-5 w-11/12 flex items-center justify-between' id='comments'>
                <H2>Comments&nbsp;</H2>
                <Links href="#">
                    <PencilAltIcon width={30} height={30} />
                </Links>
            </div>
            <Divider className="w-11/12 -mt-4" />
            <div className='w-full'>
                {
                    displayPost.comments && displayPost.comments.map(comment => {
                        return <P key={comment}>{comment}</P>
                    })
                }
            </div>
            <div className='fixed bottom-0 bg-white cursor-pointer px-3 py-1 rounded flex items-center justify-between w-auto flex-row my-2'>
                <div className='flex items-center text-slate-600 hover:text-black' onClick={updateLike}>
                    <ThumbUpIcon width={30} height={30} />
                    <p>&nbsp;{displayPost.likeCount}</p>
                </div>
                <a href='#comments' className='ml-5'><ChatIcon width={30} height={30} className="text-slate-600 hover:text-black" /></a>
            </div>

        </Layout>
    )
}
