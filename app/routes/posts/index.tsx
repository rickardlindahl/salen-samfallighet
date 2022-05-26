import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post";

interface LoaderData {
  posts: Awaited<ReturnType<typeof getPosts>>;
}

export const loader = async () => {
  const posts = await getPosts();

  return json<LoaderData>({
    posts,
  });
};

export default function Posts() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>All my posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <div>{post.author}</div>
            <div>{new Date(post.publishDate).toLocaleString("sv-SE")}</div>
            <h2>{post.title}</h2>
            <div>{post.content}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
