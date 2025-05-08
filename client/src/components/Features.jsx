import React from "react";
import img1 from "../assets/features/feature1.png";
import img2 from "../assets/features/feature2.png";

const Features = () => {
  return (
    <section className="max-padd-container pt-14 pb-20">
      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_2fr] gap-10 rounded-xl">
        {/* Images */}
        <div className="flex items-center justify-center gap-6">
          <img
            src={img1}
            alt="Quality Fabric"
            className="rounded-full w-[222px] h-[77px] object-cover"
          />
          <img
            src={img2}
            alt="Modern Style"
            className="rounded-full w-[222px] h-[77px] object-cover"
          />
        </div>

        {/* Text Blocks */}
        <div className="flex flex-wrap sm:flex-nowrap gap-6 justify-center sm:justify-start">
          {[
            {
              title: "Quality Product",
              desc: "Crafted with attention to detail and superior materials.",
            },
            {
              title: "Fast Delivery",
              desc: "Quick and reliable shipping across the country.",
            },
            {
              title: "Secure Payment",
              desc: "Your transactions are safe with industry-standard encryption.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-4 rounded-3xl bg-gray-50 hover:bg-white transition"
            >
              <h4 className="h4 capitalize mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
