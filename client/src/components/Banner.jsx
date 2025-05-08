import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import banner from "../assets/banner.png";

const Banner = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-sm">
        {/* Left Side */}
        <div className="flex flex-col justify-center gap-4 flex-1 p-6 lg:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold uppercase text-gray-800">
            Affordable Style, Timeless Appeal
          </h2>
          <h3 className="text-xl sm:text-2xl uppercase text-gray-600">
            Transform Your Closet Today
          </h3>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 bg-tertiary text-white px-6 py-3 rounded-full hover:bg-tertiary/90 transition-all group w-fit"
          >
            Explore Collection
            <FaArrowRight className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-300" />
          </Link>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1">
          <img
            src={banner}
            alt="Fashionable banner promoting clothing collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
