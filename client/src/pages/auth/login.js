import React, { useEffect, useState } from "react";
import Layout from "../../common/layouts/Layout";
import axios from "axios";
import { Input } from "../../common/components/elements/inputField";
import Button from "../../common/components/elements/button.tsx";
import Router from "next/router";
import { P } from "../../common/components/elements/Text";
import { Links } from "../../common/components/elements/links";
import { Url } from "../../constants/url";

export default function login() {
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("user-details");
    if (isUserLoggedIn) {
      Router.push("/");
    }
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginUser = async () => {
    if (!userEmail) {
      alert("Enter the Email");
    } else if (!userPassword) {
      alert("Enter the Password");
    } else {
      await axios
        .post(Url + "/login", {
          email: userEmail,
          password: userPassword,
        })
        .then((response) => {
          if (response.data.status === 400) {
            alert(response.data.error);
          } else {
            localStorage.setItem("user-details", JSON.stringify(response.data));
            alert("Login Successfull");
            Router.push("/");
          }
        });
    }
  };

  return (
    <Layout title="Login" className="mt-36">
      <div className="w-11/12 flex flex-col justify-center items-center md:w-2/5">
        <Input
          type="email"
          name="email"
          margin="mt-5"
          placeholder="Enter your Email"
          label="Email"
          onChange={(event) => setUserEmail(event.target.value)}
        />
        <Input
          type="password"
          name="password"
          margin="mt-5"
          placeholder="Enter your Password"
          label="Password"
          className="mt-5"
          onChange={(event) => setUserPassword(event.target.value)}
        />
        <div className="mt-5 flex">
          <P>New user?</P>&nbsp;
          <Links href="/auth/signup" className="text-sky-500 underline">
            Create an account
          </Links>
        </div>
        <Button className="mt-5" onClick={loginUser}>
          Login
        </Button>
      </div>
    </Layout>
  );
}
