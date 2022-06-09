import React from "react";
import Layout from "../../common/layouts/Layout";
import { RenderPosts } from "../../common/components/RenderPosts.js";
import { useRouter } from "next/router";
import url from "../../common/constants/backendUrl";

export async function getStaticProps (context) {
  const { tag } = context.query;
  const response = await fetch(`${url}/post/tags/${tag}`);
  const posts = await response.json();
  return {
    props: { posts },
  };
}

export default function TagsFilter({ posts }) {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <Layout title={`Tag - ${tag}`}>
      <RenderPosts posts={posts} tag={tag} />
    </Layout>
  );
}
