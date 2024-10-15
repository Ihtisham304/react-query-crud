import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { postValidation } from "../validation/post-validation";
import { PostsContext } from "../store/posts-context";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const EditPosts = () => {
  const { id } = useParams(); // Get the post ID from URL
  const { posts, updatePost } = useContext(PostsContext);
  const navigate = useNavigate();

  // Find the post to edit
  const postToEdit = posts.find((post) => post.id === parseInt(id));

  const formik = useFormik({
    initialValues: {
      title: postToEdit ? postToEdit.title : "", // Set initial value for the title
    },
    validationSchema: postValidation,
    onSubmit: (values) => {
      mutation.mutate({ id: parseInt(id), updatedPost: values });
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, updatedPost }) => {
      return new Promise((resolve) => {
        // Simulating a successful update
        updatePost(id, updatedPost);
        resolve();
      });
    },
    onSuccess: () => {
      navigate("/"); // Navigate to home page after successful update
    },
    onError: (error) => {
      console.error("Error updating post:", error);
    },
  });

  useEffect(() => {
    if (postToEdit) {
      formik.setValues({ title: postToEdit.title }); // Set form values if post exists
    }
  }, [postToEdit]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 ${
              formik.errors.title && formik.touched.title
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.title}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ${
              mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {mutation.isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPosts;
