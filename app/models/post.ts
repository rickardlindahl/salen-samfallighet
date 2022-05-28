import type { Post } from "~/types/post";
import { db } from "~/utils/firebase-admin.server";

export const getPosts = async (): Promise<Post[]> => {
  const querySnapshot = await db.posts.get();

  return querySnapshot.docs.map<Post>(doc => doc.data());
};

export const createPost = async (post: Post) => db.posts.add(post);
