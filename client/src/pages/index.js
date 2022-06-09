import { useEffect, useState } from "react";
import Layout from "../common/layouts/Layout";
import Url from "../constants/Url";
import { RenderPosts } from "../common/components/RenderPosts";

export async function getServerSideProps(context) {
  const response = await fetch(`${Url}/getPosts`);
  const posts = await response.json();
  return {
    props: { posts },
  };
}

export default function Home({ posts }) {
  const [getPosts, setGetPosts] = useState([]);
  useEffect(() => {
    setGetPosts(posts);
  }, []);

  return (
    <Layout title="Home">
      <RenderPosts posts={getPosts} />
    </Layout>
  );
}
