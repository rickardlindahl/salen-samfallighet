import type { PostDocumentData, Post } from "~/types/post";

export const postConverter: FirebaseFirestore.FirestoreDataConverter<Post> = {
  toFirestore: (post: Post): FirebaseFirestore.DocumentData => {
    const { id: _idUnused, publishDate: _unused1, ...rest } = post;
    return { ...rest };
  },
  fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): Post => {
    const data = snapshot.data() as PostDocumentData;

    return {
      ...data,
      publishDate: snapshot.createTime.seconds * 1000,
      id: snapshot.id,
    };
  },
};
