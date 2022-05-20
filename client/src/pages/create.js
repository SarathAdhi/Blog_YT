import React, { useEffect, useState } from 'react'
import { Layout } from '../common/layouts/Layout'
import { Input, Textarea } from '../common/components/elements/inputField'
import { format } from 'date-fns';
import axios from 'axios';
import { Button } from '../common/components/elements/button';
import { create } from 'ipfs-http-client'
import Router from 'next/router';
require('dotenv').config()

const client = create('https://ipfs.infura.io:5001/api/v0')

export default function CreateBlog() {

    const [author, setAuthor] = useState('')
    const [authorImage, setAuthorImage] = useState('')
    const [blogTitle, setBlogTitle] = useState('')
    const [blogImage, setBlogImage] = useState('')
    const [blogMessage, setBlogMessage] = useState('')
    const [blogTags, setBlogTags] = useState([])
    const [blogCreatedAt, setBlogCreatedAt] = useState('')


    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('user-details'))
        setAuthor(userDetails.username)
        setAuthorImage(userDetails.userImage)
        var date = format(new Date(), 'dd MMMMMM yyyy-p');
        setBlogCreatedAt(date)
    }, [])

    async function uploadImageToIPFS(event) {
        const file = event.target.files[0];
        if (!file) return alert("Please upload a image")
        try {
            const addFile = await client.add(file)
            const ipfsUrl = `https://ipfs.infura.io/ipfs/${addFile.path}`
            setBlogImage(ipfsUrl)
        } catch (error) {
            alert('Error uploading file: ', error)
        }
    }

    const postBlog = async () => {

        if (!blogTitle) {
            alert('Enter the Blog Title !!');
        }
        else if (!blogImage) {
            alert('Upload an image !!');
        }
        else if (!blogMessage) {
            alert('Fill up the Blog Content !!');
        }
        else if (!blogTags) {
            alert('Fill up the Tags !!');
        }
        else {
            var request = await axios.post("http://localhost:5000/createPost", {
                tokenID: process.env.SECURITY_KEY_FOR_AUTH,
                author: author,
                authorImage: authorImage,
                title: blogTitle,
                blogImage: blogImage,
                message: blogMessage,
                tags: blogTags,
                createdAt: blogCreatedAt
            })

            if (request.status === 200) {
                alert('Blog posted Successful');
                Router.push("/")
            } else {
                alert('Error while posting');
            }
        }
    };

    return (
        <Layout title="Create" navbar={true} className="md:ml-20">
            <Input label="Title" name="title" placeholder="Enter a blog title" onChange={(event) => setBlogTitle(event.target.value)} />
            <Input type="file" name="image" className="text-white" margin="mt-5" label="Image" onChange={(event) => uploadImageToIPFS(event)} />
            <Textarea label="Content" name="contents" placeholder="Enter the blog" margin="mt-5" onChange={(event) => setBlogMessage(event.target.value)} />
            <Input label="Tags" margin="mt-5" type='text' name='tags' placeholder="Enter the Tags saperated with comma's"
                onChange={(e) => setBlogTags((e.target.value).split(","))}
            />
            <Button className="mt-5" onClick={postBlog}>Post</Button>
        </Layout>
    )
}
