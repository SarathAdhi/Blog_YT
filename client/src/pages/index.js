import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Links } from '../common/components/elements/links'
import { H5, H3, H4, H6 } from '../common/components/elements/Text'
import { ThumbUpIcon } from "@heroicons/react/solid";
import Layout from '../common/layouts/Layout.tsx';

export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:5000/getPosts")
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
    <Layout title="Home" navbar={true} className="md:ml-20">
      {getPosts.map((post, index) => {
        return (
          <Links href={`/post/${post._id}`} key={post._id} className='bg-zinc-700 rounded-lg p-0 my-4 p-5 w-11/12 flex justify-center items-center sm:justify-between flex-col-reverse sm:flex-row'>
            <div className='flex flex-col justify-center sm:justify-between w-full h-auto text-white'>
              <div className='md:break-all sm:mr-16 flex justify-center items-center sm:block mt-5 sm:mt-0 flex-col'>
                <div className='flex items-center mb-2'>
                  <img className='w-10 h-10 rounded-full mr-2' src={post.authorImage} />
                  <H5 className="text-center font-normal flex">{post.author + " · "}<p className='text-zinc-400'>&nbsp;{post.createdAt.split("-")[0]}</p></H5>
                </div>
                <H3 className='text-center sm:text-left'>{post.title}</H3>
                <p className='mt-2 hidden sm:block'>{stringifyBlogContent(post.message)}</p>
              </div>
              {post.tags.length != 0 && (
                <div className='flex justify-center sm:justify-start mt-5 flex-wrap'>
                  {post.tags.map(ele => {
                    return (
                      <H6 key={post._id + ele} className='text-black my-1 text-center rounded-2xl px-2 py-1 mr-2 bg-white'>{ele}&nbsp;</H6>
                    )
                  })}
                </div>
              )}
              <div className='flex items-center justify-center sm:justify-start flex-row mt-2 md:mt-5'>
                <ThumbUpIcon width={20} height={20} />
                <p>&nbsp;{post.likeCount.length}</p>
              </div>

            </div>
            <div className='w-full flex justify-center sm:w-60'>
              <img className='w-11/12 md:w-full h-full rounded-lg' src={post.blogImage} />
            </div>
          </Links>

        )
      })}
    </Layout>
  )
}
