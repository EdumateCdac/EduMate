
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InstructorSidebar from "../../components/Instructor/InstructorSidebar";

function AddCourse({ instructorId = "valid_instructor_id", instructorName = "Valid Instructor" }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    videoLink: "",
    tags: "",
    isPublished: true,
    payment: "",
    discount: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentValue = Number(form.payment);
    const discountValue = Number(form.discount);

    if (isNaN(paymentValue) || isNaN(discountValue)) {
      alert("Please enter valid numeric values for Payment and Discount.");
      return;
    }

    if (!image) {
      alert("Please select an image for the course.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("duration", form.duration);
      formData.append("videoLink", form.videoLink);
      formData.append("tags", JSON.stringify(form.tags.split(",").map((tag) => tag.trim())));
      formData.append("isPublished", form.isPublished);
      formData.append("payment", paymentValue);
      formData.append("discount", discountValue);
      formData.append("image", image);
      formData.append("instructor[id]", instructorId); // Use actual instructor ID
      formData.append("instructor[name]", instructorName);   // Use actual instructor name

      await axios.post("http://localhost:5000/api/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/instructor-dashboard");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <InstructorSidebar />
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-10"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 text-center mb-8 flex items-center justify-center gap-2">
            📘 Add New Course
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Course Title *"
                required
                className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration (e.g. 4 weeks) *"
                required
                className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="videoLink"
                value={form.videoLink}
                onChange={handleChange}
                placeholder="Video URL"
                className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="payment"
                value={form.payment}
                onChange={handleChange}
                placeholder="Course Price (e.g. 5000) *"
                required
                className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="Discount % (e.g. 50) *"
                required
                className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="p-4 border border-gray-300 rounded-xl w-full"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Course Description *"
              rows={4}
              required
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600"
              />
              <label htmlFor="isPublished" className="text-gray-800 font-medium">
                Publish Immediately
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-xl font-bold transition duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Creating Course..." : "Create Course"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddCourse;
