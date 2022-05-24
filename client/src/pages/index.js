import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Links } from '../common/components/elements/links'
import { H5, H3, H4, H6, P, H2 } from '../common/components/elements/Text'
import { ThumbUpIcon } from "@heroicons/react/solid";
import Layout from '../common/layouts/Layout.tsx';
import { Tags } from '../common/components/elements/Tags';
import { Divider } from '../common/components/elements/Divider'
import Url from '../constants/Url'

export async function getServerSideProps(context) {
  const response = await fetch(`${Url}/getPosts`)
  const posts = await response.json()
  return {
    props: { posts }
  }
}

export default function Home({ posts }) {
  const [getPosts, setGetPosts] = useState([])
  useEffect(() => {
    setGetPosts(posts)
  }, [])

  function stringifyBlogContent(text) {
    if (text.length > 200) {
      var stringifyText = text.slice(0, 200) + "...";
      return (stringifyText)
    } else {
      return text
    }
  }

  return (
    <Layout title="Home" className="md:ml-20">
      {getPosts.map((post, index) => {
        return (
          <Links href={`/post/${post._id}`} key={post._id} className='bg-[#27282b] rounded-lg p-0 my-4 p-5 w-11/12 flex justify-center items-center sm:justify-between flex-col-reverse sm:flex-row'>
            <div className='flex flex-col justify-center sm:justify-between w-full h-auto text-white'>
              <div className='md:break-all sm:mr-16 flex justify-center items-center sm:block mt-5 sm:mt-0 flex-col'>
                <div className='flex items-center mb-2'>
                  <img loading='lazy' className='w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2' src={post.authorImage} />
                  <H5 className="text-center font-normal flex">{post.author + " · "}<p className='text-zinc-400'>&nbsp;{post.createdAt.split("-")[0]}</p></H5>
                </div>
                <Divider className="my-1 sm:hidden" />
                <H3 className='text-center sm:text-left'>{post.title}</H3>
                <Divider className="mt-2 sm:hidden" />
                <P className='mt-2 block text-center sm:text-left'>{stringifyBlogContent(post.message)}</P>
              </div>
              {post.tags.length != 0 && (
                <div className='hidden sm:flex justify-center sm:justify-start mt-5 flex-wrap'>
                  {post.tags.map(ele => {
                    return (
                      <Tags key={post._id + ele}>{ele}&nbsp;</Tags>
                    )
                  })}
                </div>
              )}
              <div className='flex items-center justify-center sm:justify-start flex-row mt-2 md:mt-5'>
                <ThumbUpIcon width={20} height={20} />
                <p>&nbsp;{post.likeCount.length}</p>
              </div>

            </div>
            <div className='w-full flex justify-center items-center sm:w-[500px]'>
              <img loading='lazy' className='w-11/12 md:w-full h-full rounded-lg' src={post.blogImage} />
            </div>
          </Links>

        )
      })}
    </Layout>
  )
}
