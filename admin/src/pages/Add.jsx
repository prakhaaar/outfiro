import React, { useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const availableSizes = ["S", "M", "L", "XL", "XXL"];

const Add = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    popular: false,
    sizes: [],
  });

  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const validateImage = (file) =>
    file && file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024;

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Men",
      subCategory: "Topwear",
      popular: false,
      sizes: [],
    });
    setImages([null, null, null, null]);
  };

  const handleImageChange = (index, file) => {
    if (!validateImage(file)) {
      toast.error("Only images under 2MB are allowed.");
      return;
    }
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, sizes } = formData;
    if (!name || !description || !price || sizes.length === 0) {
      toast.error("Fill all fields and select at least one size.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();

      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, key === "sizes" ? JSON.stringify(val) : val);
      });

      images.forEach((img, idx) => {
        if (img) data.append(`image${idx + 1}`, img);
      });

      const res = await axios.post(`${backend_url}/api/product/add`, data, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        resetForm();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-8 mt-4 sm:mt-14 pb-16">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:w-[777px]"
      >
        {/* Product Name */}
        <div>
          <label className="h5">Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Write here..."
            className="input"
          />
        </div>

        {/* Description */}
        <div>
          <label className="h5">Product Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write here..."
            className="input"
          />
        </div>

        {/* Category & SubCategory */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="h5">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>

          <div>
            <label className="h5">Sub Category</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="select"
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>

          <div>
            <label className="h5">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="select"
              placeholder="e.g. 1999"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="h5">Product Sizes</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {availableSizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1 rounded ring-1 transition ${
                  formData.sizes.includes(size)
                    ? "bg-tertiary text-white"
                    : "bg-white text-gray-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="flex gap-2 pt-2">
          {images.map((img, idx) => (
            <label key={idx} htmlFor={`img-${idx}`}>
              <img
                src={img ? URL.createObjectURL(img) : uploadIcon}
                alt="upload"
                className="w-16 h-16 object-cover ring-1 ring-slate-300 rounded-lg"
              />
              <input
                type="file"
                hidden
                id={`img-${idx}`}
                accept="image/*"
                onChange={(e) => handleImageChange(idx, e.target.files[0])}
              />
            </label>
          ))}
        </div>

        {/* Popular checkbox */}
        <div className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            id="popular"
            name="popular"
            checked={formData.popular}
            onChange={handleChange}
          />
          <label htmlFor="popular" className="cursor-pointer">
            Add to popular
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-dark mt-4 w-full sm:w-44"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Add;
