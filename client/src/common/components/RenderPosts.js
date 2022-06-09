import { ThumbUpIcon } from "@heroicons/react/solid";
import React from "react";
import { Divider } from "./elements/Divider";
import { Links } from "./elements/links";
import { Tags } from "./elements/Tags";
import { H3, H5, P } from "./elements/Text";
import Image from "next/image";

export const RenderPosts = ({ posts, tag }) => {
  function stringifyBlogContent(text) {
    if (text.length > 200) {
      var stringifyText = text.slice(0, 200) + "...";
      return stringifyText;
    } else {
      return text;
    }
  }

  return (
    <>
      {posts.map((post, index) => {
        return (
          <Links
            href={`/post/${post._id}`}
            key={post._id}
            className="bg-[#111] sm:border-b-2 rounded-md my-4 p-5 w-11/12 flex justify-center items-center sm:justify-between flex-col-reverse sm:flex-row duration-300 group hover:bg-[#111] hover:rounded-2xl"
          >
            <div className="flex flex-col justify-center sm:justify-between w-full h-auto text-white">
              <div className="md:break-all sm:mr-16 flex justify-center items-center sm:block mt-5 sm:mt-0 flex-col">
                <div className="flex items-center mb-2">
                  <img
                    loading="lazy"
                    className="w-8 h-8 hidden sm:block sm:w-10 sm:h-10 rounded-full mr-2"
                    src={post.authorImage}
                  />
                  <H5 className="text-center font-normal flex">
                    {post.author + " · "}
                    <p className="text-zinc-400">
                      &nbsp;{post.createdAt.split("-")[0]}
                    </p>
                  </H5>
                </div>
                <Divider className="my-1 sm:hidden" />
                <H3 className="text-lg sm:text-xl text-center sm:text-left duration-300 group-hover:text-2xl">
                  {post.title}
                </H3>
                <Divider className="mt-2 sm:hidden" />
                <P className="mt-2 block text-center sm:text-left">
                  {stringifyBlogContent(post.message)}
                </P>
              </div>
              {post.tags.length != 0 && (
                <div className="hidden sm:flex justify-center sm:justify-start mt-5 flex-wrap">
                  {post.tags.map((ele) => {
                    return (
                      <Tags
                        key={post._id + ele}
                        className={
                          tag === ele
                            ? "!bg-indigo-600 !text-white"
                            : "hover:!bg-white !text-black"
                        }
                      >
                        {ele}
                      </Tags>
                    );
                  })}
                </div>
              )}
              <div className="flex items-center justify-center sm:justify-start flex-row mt-2 md:mt-5">
                <ThumbUpIcon width={20} height={20} />
                <p>&nbsp;{post.likeCount.length}</p>
              </div>
            </div>
            <div className="w-full flex justify-center items-center sm:w-[500px]">
              <Image
                width="400"
                height="250"
                className="w-11/12 md:w-full rounded-xl duration-300 group-hover:scale-105"
                src={post.blogImage}
              />
            </div>
          </Links>
        );
      })}
    </>
  );
};
