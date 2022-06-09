import { useEffect, useState } from "react";
import Layout from "../common/layouts/Layout";
import { RenderPosts } from "../common/components/RenderPosts";
import url from "../common/constants/backendUrl";

export async function getServerSideProps(context) {
  const response = await fetch(`${url}/getPosts`);
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
