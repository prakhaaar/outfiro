import React from "react";
import Title from "./Title";
import { blogs } from "../assets/data";

const Blog = () => {
  return (
    <section className="max-padd-container py-16">
      <Title
        title1="Our Expert"
        title2="Blog"
        titleStyles="pb-10"
        paraStyles="!block"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.title}
            className="relative overflow-hidden rounded-3xl border-[10px] border-primary group transition-transform hover:scale-[1.02]"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-4 left-4 text-white text-sm">
              <h3 className="font-semibold text-base leading-snug pr-4">
                {blog.title}
              </h3>
              <h4 className="medium-14 py-1">{blog.category}</h4>
              <button className="btn-light px-3 py-1 text-sm">
                Continue Reading
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
