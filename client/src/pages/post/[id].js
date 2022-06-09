import React, { useState, useEffect } from "react";
import { Divider } from "../../common/components/elements/Divider";
import { H2, H5, P } from "../../common/components/elements/Text";
import Layout from "../../common/layouts/Layout";
import { ThumbUpIcon, ChatIcon, PencilAltIcon } from "@heroicons/react/solid";
import axios from "axios";
import Router from "next/router";
import { Tags } from "../../common/components/elements/Tags";
import { Links } from "../../common/components/elements/links";
import Url from "../../constants/Url";

require("dotenv").config();

export async function getServerSideProps(context) {
  const postId = context.query.id;
  const request = await fetch(`${Url}/post/getPost`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tokenID: process.env.SECURITY_KEY_FOR_AUTH,
      id: postId,
    }),
  });
  const post = await request.json();

  const request2 = await fetch(`${Url}/getFollowers/${post.authorId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const authorFollowers = await request2.json();

  return {
    props: {
      post: post,
      authorFollowers: authorFollowers,
    },
  };
}

export default function Post({ post, authorFollowers }) {
  const [displayPost, setDisplayPost] = useState([]);
  const [isUserFollowing, setIsUserFollowing] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user-details")) {
      const userDetails = JSON.parse(localStorage.getItem("user-details"));
      setUserDetails(userDetails);
    } else {
      alert("Login First");
      Router.push("/auth/login");
    }
    if (post === "Invalid post id") {
      alert(post);
      Router.push("/");
    } else {
      setDisplayPost(post);
    }
  }, []);

  async function isUserFollowingAuthor() {
    if (!isUserFollowing) {
      const following = await authorFollowers.includes(userDetails._id);
      setIsUserFollowing(following);
    }
    return true;
  }

  async function followAuthor() {
    const response = await axios.post(`${Url}/follow/user`, {
      tokenID: process.env.SECURITY_KEY_FOR_AUTH,
      myId: userDetails._id,
      authorId: displayPost.authorId,
    });
    setIsUserFollowing(response.data);
  }

  async function updateLike() {
    var response = await axios.post(`${Url}/post/updateLike`, {
      tokenID: process.env.SECURITY_KEY_FOR_AUTH,
      id: displayPost._id,
      username: userDetails.username,
    });
    // Updating the post on real time without refreshing
    // console.log(response)
    setDisplayPost(response.data);
  }

  async function submitUserComment() {
    if (userComment === "") {
      alert("Empty comments");
      return false;
    }
    var response = await axios.post(`${Url}/post/Comment`, {
      tokenID: process.env.SECURITY_KEY_FOR_AUTH,
      id: displayPost._id,
      username: userDetails.username,
      comment: userComment,
      userImage: userDetails.userImage,
    });
    // console.log(response)
    // Updating the post on real time without refreshing
    setDisplayPost(response.data);
    setUserComment("");
  }

  console.log(displayPost);

  return (
    <Layout title={displayPost.title}>
      <div className="sticky top-16 flex items-center mb-5">
        <img
          loading="lazy"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2"
          src={displayPost.authorImage}
        />
        <H5 className="text-center font-normal flex">
          {displayPost.author + " · "}
          <p className="text-zinc-400">&nbsp;{displayPost.createdAt}</p>
        </H5>
        {isUserFollowingAuthor() && isUserFollowing === false && (
          <button
            onClick={followAuthor}
            className="ml-5 px-2 bg-green-700 rounded-md border-none"
          >
            Follow
          </button>
        )}
      </div>
      <div className="w-11/12 md:w-2/5 text-center">
        <img className="w-full rounded-lg" src={displayPost.blogImage} />
      </div>
      <div className="w-11/12">
        <P className="my-8 text-lg">{displayPost.message}</P>
      </div>
      <Divider className="md:mr-2 w-full" />
      <div className="w-11/12 flex flex-wrap my-2">
        {displayPost.tags &&
          displayPost.tags.map((tag, index) => {
            return (
              <Links key={tag + index} href={`/tags/${tag}`}>
                <Tags>{tag}</Tags>
              </Links>
            );
          })}
        {!displayPost.tags && <Tags>No Tags</Tags>}
      </div>

      <Divider className="md:mr-2 w-full" />

      <div
        className="my-5 w-11/12 flex items-center justify-between"
        id="comments"
      >
        <H2>
          Comments&nbsp;{displayPost.comments && displayPost.comments.length}
        </H2>
        <PencilAltIcon
          className="cursor-pointer"
          width={30}
          height={30}
          onClick={submitUserComment}
        />
      </div>

      <Divider className="w-11/12 -mt-4" />

      <div className="w-11/12 flex justify-center flex-col mb-20">
        <div className="w-full mt-2">
          <textarea
            rows={5}
            // value={userComment}
            className="text-black mt-1 px-2 py-1 w-full rounded focus:outline-none"
            placeholder="Add a comment... Ctrl+Enter to submit the comment"
            // onKeyDown={(e) => {
            //   if (e.ctrlKey && e.key === "Enter") {
            //     submitUserComment();
            //   }
            // }}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></textarea>
        </div>
        {displayPost.comments && (
          <div className="flex justify-center flex-col mt-5 w-full">
            {displayPost.comments.map((details, index) => {
              return (
                <div
                  key={index}
                  className="my-1 bg-gray-700 rounded-xl p-3 mb-5 flex flex-col"
                >
                  <div className="flex items-center">
                    <img
                      className="w-5 h-5 rounded-full"
                      src={details.userImage}
                    />
                    <P className="ml-1">{details.username}</P>
                  </div>
                  <P className="ml-6">{details.comment}</P>
                  {/* <P>{details.likeCount.length === 0 ? "0" : details.likeCount}</P> */}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="fixed bottom-0 bg-white cursor-pointer px-3 py-1 rounded flex items-center justify-between w-auto flex-row my-2">
        <div
          className="flex items-center text-slate-600 hover:text-black"
          onClick={updateLike}
        >
          <ThumbUpIcon width={30} height={30} />
          {/* {!displayPost.likeCount && 0} */}
          {displayPost.likeCount && displayPost.likeCount.length}
        </div>
        <a href="#comments" className="ml-5">
          <ChatIcon
            width={30}
            height={30}
            className="text-slate-600 hover:text-black"
          />
        </a>
      </div>
    </Layout>
  );
}
