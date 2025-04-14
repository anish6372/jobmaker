import React, { useState, useEffect } from "react";
import { FaUsers, FaMapMarkerAlt, FaBriefcase, FaSearch } from "react-icons/fa";
import { Slider } from "@mui/material";
import homeImage from "./assets/home.png";
import amazonImage from "./assets/amazon.png";
import teslaImage from "./assets/tesla.png";
import swiggyImage from "./assets/swiggy.png";
// import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";

const jobs = [
  {
    id: 1,
    logo: amazonImage,
    title: "Full Stack Developer",
    company: "Amazon",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12LPA",
  },
  {
    id: 2,
    logo: teslaImage,
    title: "Node Js Developer",
    company: "Tesla",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12LPA",
  },
  {
    id: 3,
    logo: swiggyImage,
    title: "UX/UI Designer",
    company: "Swiggy",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12LPA",
  },
  {
    id: 4,
    logo: amazonImage,
    title: "Full Stack Developer",
    company: "Amazon",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12LPA",
  },
  {
    id: 5,
    logo: teslaImage,
    title: "Node Js Developer",
    company: "Tesla",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12LPA",
  },
  {
    id: 6,
    logo: swiggyImage,
    title: "UX/UI Designer",
    company: "Swiggy",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12LPA",
  },
  {
    id: 7,
    logo: amazonImage,
    title: "Full Stack Developer",
    company: "Amazon",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12LPA",
  },
  {
    id: 8,
    logo: teslaImage,
    title: "Node Js Developer",
    company: "Tesla",
    experience: "1-3 yr Exp",
    location: "Onsite",
    salary: "12LPA",
  },
];

const Job = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editJobId, setEditJobId] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [dynamicJobs, setDynamicJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setDynamicJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = async (data) => {
    try {
      const salaryRange = `${data.minSalary}-${data.maxSalary}`;
      const jobData = { ...data, salaryRange };
      delete jobData.minSalary;
      delete jobData.maxSalary;

      if (editJobId) {
        const response = await axios.put(
          `http://localhost:5000/api/jobs/${editJobId}`,
          jobData
        );
        setDynamicJobs((prevJobs) =>
          prevJobs.map((job) => (job._id === editJobId ? response.data : job))
        );
        setEditJobId(null);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/jobs/upload",
          jobData
        );
        setDynamicJobs((prevJobs) => [...prevJobs, response.data]);
      }

      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error creating/updating job:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setDynamicJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = (job) => {
    setEditJobId(job._id);
    const [minSalary, maxSalary] = job.salaryRange.split("-");
    setValue("title", job.title);
    setValue("company", job.company);
    setValue("location", job.location);
    setValue("jobType", job.jobType);
    setValue("minSalary", minSalary);
    setValue("maxSalary", maxSalary);
    setValue("applicationDeadline", job.applicationDeadline);
    setValue("description", job.description);
    setIsModalOpen(true);
  };

  const allJobs = [...jobs, ...dynamicJobs];
  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-5">
     <header className="bg-white shadow-sm rounded-full p-3 px-4 sm:px-6 w-full sm:w-[65%] lg:w-[50%] mx-auto fixed top-5 left-1/2 transform -translate-x-1/2 z-10">
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
    
   
    <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
      <img src={homeImage} alt="Logo" className="w-8 h-8 flex-shrink-0" />
      <nav
        className="flex flex-wrap gap-8 text-sm sm:text-base"
        style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
      >
        <a href="#" className="text-black font-medium">Home</a>
        <a href="#" className="text-black font-medium">Find Jobs</a>
        <a href="#" className="text-black font-medium">Find Talents</a>
        <a href="#" className="text-black font-medium">About us</a>
        <a href="#" className="text-black font-medium">Testimonials</a>
      </nav>
    </div>

   
    <div className="flex justify-center sm:justify-end w-full sm:w-auto">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold shadow-md whitespace-nowrap"
        style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
      >
        Create Jobs
      </button>
    </div>
  </div>
</header>


      {isModalOpen && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[rgba(60,60,60,0.5)] z-20 p-2 sm:p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-3xl max-h-[90vh] shadow-lg relative overflow-y-auto ">
            <h2
              className="text-lg sm:text-2xl font-bold mb-11 text-center text-[#222222]"
              style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700 }}
            >
              {editJobId ? "Edit Job" : "Create Job Opening"}
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-xl"
            >
              &times;
            </button>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              <div
                className="flex flex-col"
                style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 600 }}
              >
                <label
                  htmlFor="title"
                  className="mb-1 font-medium text-[#222222]"
                >
                  Job Title
                </label>
                <input
                  id="title"
                  {...register("title", { required: "Job title is required" })}
                  placeholder="Job Title"
                  className="border p-2 rounded-lg w-full text-[#222222]"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="company"
                  className="mb-1 font-medium text-[#636363]"
                  style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 600 }}
                >
                  Company Name
                </label>
                <input
                  id="company"
                  {...register("company", {
                    required: "Company name is required",
                  })}
                  placeholder="Amazon, Microsoft, Swiggy"
                  className="border p-2 rounded-lg w-full"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm">
                    {errors.company.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className="mb-1 font-medium text-[#636363]"
                  style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
                >
                  Location
                </label>
                <input
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="Choose Preferred Location"
                  className="border p-2 rounded-lg w-full text-[#636363]"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="jobType"
                  className="mb-1 font-medium text-[#636363]"
                  style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
                >
                  Job Type
                </label>
                <select
                  id="jobType"
                  {...register("jobType", { required: "Job type is required" })}
                  className="border p-2 rounded-lg w-full text-[#636363]"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm">
                    {errors.jobType.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:col-span-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="salaryRange"
                    className="mb-1 font-medium text-[#636363]"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Salary Range
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1 flex items-center border rounded-lg p-2 text-[#636363]">
                      <span className="absolute left-2 text-gray-500">↕</span>
                      <span className="absolute left-6 text-gray-500">₹</span>
                      <input
                        id="minSalary"
                        {...register("minSalary", {
                          required: "Min salary required",
                        })}
                        placeholder="0"
                        className="pl-10 pr-2 w-full text-gray-500 outline-none"
                        type="number"
                      />
                    </div>
                    <div className="relative flex-1 flex items-center border rounded-lg p-2">
                      <span className="absolute left-2 text-gray-500">↕</span>
                      <span className="absolute left-6 text-gray-500">₹</span>
                      <input
                        id="maxSalary"
                        {...register("maxSalary", {
                          required: "Max salary required",
                        })}
                        placeholder="12,00,000"
                        className="pl-10 pr-2 w-full text-gray-500 outline-none"
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="applicationDeadline"
                    className="mb-1 font-medium text-sm sm:text-base text-[#636363]"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Application Deadline
                  </label>
                  <input
                    id="applicationDeadline"
                    type="date"
                    {...register("applicationDeadline", {
                      required: "Deadline is required",
                    })}
                    className="border p-2 rounded-lg w-full text-sm"
                  />
                  {errors.applicationDeadline && (
                    <p className="text-red-500 text-sm">
                      {errors.applicationDeadline.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-1 font-medium text-[#636363]"
                  style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
                >
                  Job Description
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Please share a description to let the candidate know more about the job role"
                  className="border p-2 rounded-lg w-full"
                  rows="5"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-between mt-4">
                <button
                  type="button"
                  className="border border-gray-400 text-gray-700 p-2 rounded-lg px-4 sm:px-6"
                  style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 600 }}
                  onClick={() => console.log("Draft saved")}
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="bg-sky-500 text-white p-2 rounded-lg px-6 sm:px-8"
                  style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 600 }}
                >
                  {editJobId ? "Update" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        className="pt-[140px] sm:pt-[100px] bg-white p-6 rounded-lg flex flex-wrap items-center gap-6 w-full min-h-[120px]"
        style={{ color: "#686868" }}
      >
        <div className="flex items-center gap-2 flex-grow basis-[200px] border-b sm:border-b-0 sm:border-r pr-4">
          <FaSearch className="text-[#686868]" />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            className="border-none outline-none placeholder-[#686868] text-sm w-full"
            style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
          />
        </div>

        <div className="flex items-center gap-2 flex-grow basis-[160px] border-b sm:border-b-0 sm:border-r pr-4">
          <FaMapMarkerAlt className="text-[#686868]" />
          <input
            type="text"
            placeholder="Preferred Location"
            className="border-none outline-none placeholder-[#686868] text-sm w-full"
            style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
          />
        </div>

        <div className="flex items-center gap-2 flex-grow basis-[140px] border-b sm:border-b-0 sm:border-r pr-4">
          <FaUsers className="text-[#686868]" />
          <input
            type="text"
            placeholder="Job Type"
            className="border-none outline-none placeholder-[#686868] text-sm w-full"
            style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
          />
        </div>

        <div className="flex flex-col flex-grow basis-[50px] gap-2">
          <div className="flex items-center justify-between px-2">
            <span
              className="text-sm text-[#222222] font-bold"
              style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
            >
              Salary Per Month
            </span>
            <span
              className="text-sm text-[#222222] font-bold"
              style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
            >
              ₹50k - ₹80k
            </span>
          </div>
          <div className="w-full px-2">
            {" "}
           
            <Slider
              defaultValue={[50, 80]}
              aria-label="Salary Range"
              valueLabelDisplay="auto"
              min={15}
              max={200}
              sx={{
                color: "black",
                "& .MuiSlider-track": {
                  backgroundColor: "black",
                  border: "none",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#b0b0b0",
                  opacity: 1,
                },
                "& .MuiSlider-thumb": {
                  width: 16,
                  height: 16,
                  backgroundColor: "#000",
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1400px] gap-5 w-full max-w-7xl mx-auto">
        {allJobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <img
                src={job.logo || homeImage}
                alt={job.experience || "Experience"}
                className="w-14 h-14 object-contain"
              />
              <span
                className="bg-blue-200 text-black px-3 py-1.5 rounded-md text-xs"
                style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
              >
                {job.applicationDeadline
                  ? new Date(job.applicationDeadline).toLocaleDateString()
                  : "24h Ago"}
              </span>
            </div>

            <h2
              className="mt-3 font-semibold text-lg"
              style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700 }}
            >
              {job.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mt-2">
              <div className="flex items-center gap-1">
                <FaUsers />
                <span
                  style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
                >
                  {job.experience || "1-3 yrs Exp"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt />
                <span
                  style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
                >
                  {job.location}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaBriefcase />
                <span
                  style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
                >
                  {job.salaryRange || job.salary || "Negotiable"}
                </span>
              </div>
            </div>

            {job.description ? (
              <p
                className="text-sm text-gray-600 mt-3"
                style={{ fontFamily: "Satoshi, sans-serif" }}
              >
                {job.description}
              </p>
            ) : (
              <>
                <div className="mt-3 ">
                  <p
                    className="text-sm text-gray-600"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    <span className="font-bold text-2xl mr-2">.</span>A
                    user-friendly interface lets you browse stunning photos and
                    videos
                  </p>
                  <p
                    className="text-sm text-gray-600"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    <span className="font-bold text-2xl mr-2">.</span>
                    Filter destinations based on interests and travel style, and
                    create personalized
                  </p>
                </div>
              </>
            )}

            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white mt-4 py-2 rounded-md transition-colors duration-300">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;
