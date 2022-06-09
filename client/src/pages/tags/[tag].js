import React from "react";
import Layout from "../../common/layouts/Layout";
import { RenderPosts } from "../../common/components/RenderPosts.js";
import Url from "../../constants/Url";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { tag } = context.query;
  const response = await fetch(`${Url}/post/tags/${tag}`);
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
