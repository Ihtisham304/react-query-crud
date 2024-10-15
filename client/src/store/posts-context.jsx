import { createContext, useState } from "react";
import { POSTS as initialPosts } from "../data/data";

export const PostsContext = createContext();

export const Store = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (newPost) => {
    setPosts([...posts, { id: posts.length + 1, ...newPost }]);
  };

  const updatePost = (id, updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
    );
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
