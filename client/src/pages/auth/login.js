import React, { useEffect, useState } from 'react'
import { Layout } from '../../common/layouts/Layout'
import axios from 'axios'
import { Input } from '../../common/components/elements/inputField'
import { Button } from '../../common/components/elements/button'
import Router from 'next/router'
import { P } from '../../common/components/elements/Text'
import { Links } from '../../common/components/elements/links'

export default function login() {
    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('user-details');
        if(isUserLoggedIn.length > 0) {
            Router.push("/")
        }
    }, [])


    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')


    const loginUser = async () => {
        if (!userEmail) {
            alert('Enter the Email');
        }
        else if (!userPassword) {
            alert('Enter the Password');
        }
        else {
            const request = await axios.post("http://localhost:5000/login", {
                email: userEmail,
                password: userPassword,
            })
            if (request.data.status === 200) {
                localStorage.setItem('user-details', JSON.stringify(request.data))
                alert('Login Successful');
                Router.push('/');
            } else {
                alert(request.data.message);
            }
        }
    }

    return (
        <Layout title="Login" navbar={true} className="md:ml-20 mt-40">
            <Input type="email" name="email" margin="mt-5" placeholder="Enter your Email" label="Email" onChange={(event) => setUserEmail(event.target.value)} />
            <Input type="password" name="password" margin="mt-5" placeholder="Enter your Password" label="Password" className="mt-5" onChange={(event) => setUserPassword(event.target.value)} />
            <div className='mt-5 flex'>
                <P>New user?</P>&nbsp;<Links href="/auth/signup" className="text-sky-500 underline">Create an account</Links>
            </div>
            <Button className="mt-5" onClick={loginUser}>Login</Button>
        </Layout>
    )
}

