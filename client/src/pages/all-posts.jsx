import { useContext } from "react";
import { PostsContext } from "../store/posts-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllPosts = () => {
  const { posts, deletePost } = useContext(PostsContext);
  const queryClient = useQueryClient();
  const {
    data: postsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(posts), 500);
      });
    },
    initialData: posts,
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          deletePost(id);
          resolve();
        }, 500); // Simulate an API call delay
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id); 
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <Link to="/add-post">Add Post</Link>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {postsData.map((post) => (
            <tr key={post.id} className="border-b">
              <td className="py-2 px-4">{post.id}</td>
              <td className="py-2 px-4">{post.title}</td>
              <td className="py-2 px-4">
                <Link
                  to={`/edit/${post.id}`}
                  className="mr-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPosts;
