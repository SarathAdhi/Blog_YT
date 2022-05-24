import React, { useState } from 'react'
import axios from 'axios'
import Button from '../../common/components/elements/button.tsx'
import { Input } from '../../common/components/elements/inputField'
import { Links } from '../../common/components/elements/links'
import { P } from '../../common/components/elements/Text'
import Layout from '../../common/layouts/Layout.tsx'
import { create } from 'ipfs-http-client'
import Router from 'next/router'
require('dotenv').config()

const client = create('https://ipfs.infura.io:5001/api/v0')

export default function signup() {

    const [isLoading, setIsLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userImage, setUserImage] = useState('')


    async function uploadImageToIPFS(event) {
        const file = event.target.files[0];
        if (!file) return alert("Please upload a image")
        try {
            const addFile = await client.add(file)
            const ipfsUrl = `https://ipfs.infura.io/ipfs/${addFile.path}`
            setUserImage(ipfsUrl)
            setIsLoading(false)
        } catch (error) {
            alert('Error uploading file: ', error)
        }
    }

    const createUser = async () => {
        if (!userName) {
            alert('Enter the Username !!');
        }
        else if (!userEmail) {
            alert('Enter the Email !!');
        }
        else if (!userPassword) {
            alert('Enter the Password !!');
        }
        else if (!userImage) {
            alert('Upload a Profile Pic !!');
        }
        else {
            var request = await axios.post("http://localhost:5000/createUser", {
                tokenID: process.env.SECURITY_KEY_FOR_AUTH,
                username: userName,
                email: userEmail,
                password: userPassword,
                userImage: userImage
            })

            if (request.data.status === 200) {
                localStorage.setItem('user-details', JSON.stringify(request.data))
                alert('Registered Successfully');
                Router.push('/');
            } else {
                alert(request.data.message);
            }
        }
    }

    return (
        <Layout title="Sign Up" className="md:ml-20 mt-40">
            <div className='w-11/12 flex flex-col justify-center items-center md:w-2/5'>
                <Input type="text" name="username" placeholder="Enter a username" label="Username" onChange={(event) => setUserName(event.target.value)} />
                <Input type="email" name="email" margin="mt-5" placeholder="Enter your Email" label="Email" onChange={(event) => setUserEmail(event.target.value)} />
                <Input type="password" name="password" margin="mt-5" placeholder="Enter your Password" label="Password" onChange={(event) => setUserPassword(event.target.value)} />
                <Input type="file" label="Image" name="image" className="text-white" margin="mt-5" onChange={(event) => {
                    setIsLoading(true)
                    uploadImageToIPFS(event);
                }} />

                <div className='mt-5 flex'>
                    <P>Existing User?</P>&nbsp;<Links href="/auth/login" className="text-sky-500 underline">Login</Links>
                </div>
                <Button className="mt-5" disable={isLoading ? true : false} onClick={createUser}>{isLoading ? "Loading..." : "Register"}</Button>
            </div>

        </Layout>
    )
}

