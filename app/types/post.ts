export interface PostDocumentData {
  author: string;
  content: string;
  title: string;
  timestamp: FirebaseFirestore.Timestamp;
}

export interface Post {
  author: string;
  content: string;
  publishDate: number;
  title: string;
  id: string;
}
