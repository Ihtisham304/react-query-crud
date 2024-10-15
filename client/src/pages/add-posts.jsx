import React, { useContext } from "react";
import { useFormik } from "formik";
import { postValidation } from "../validation/post-validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostsContext } from "../store/posts-context";
import { useNavigate } from "react-router-dom";

const AddPosts = () => {
  const { addPost } = useContext(PostsContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          addPost(newPost);
          resolve();
        }, 500);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error adding post:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: postValidation,
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values);
      resetForm();
    },
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Add New Post</h1>
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
            disabled={mutation.isLoading || formik.isSubmitting}
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ${
              mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {mutation.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPosts;
