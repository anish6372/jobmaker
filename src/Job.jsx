import React, { useState, useEffect } from "react";
import { FaUsers, FaMapMarkerAlt, FaBriefcase, FaSearch } from "react-icons/fa";
import { Slider } from "@mui/material";
import homeImage from "./assets/home.png";
import amazonImage from "./assets/amazon.png";
import teslaImage from "./assets/tesla.png";
import swiggyImage from "./assets/swiggy.png";
import { FaEdit, FaTrash } from "react-icons/fa";
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
      <div className="w-full">
        <header className="bg-white shadow-md rounded-full p-3 px-4 sm:px-6 w-full sm:w-[90%] lg:w-[66%] mx-auto fixed top-5 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 ">
            <div className="flex items-center space-x-17 overflow-x-auto flex-1 min-w-0">
              <img
                src={homeImage}
                alt="Logo"
                className="w-8 h-8 flex-shrink-0"
              />
              <nav className="flex space-x-8 sm:space-x-6 text-sm sm:text-base whitespace-nowrap overflow-x-auto">
                <a href="#" className="text-black font-medium">
                  Home
                </a>
                <a href="#" className="text-black font-medium">
                  Find Jobs
                </a>
                <a href="#" className="text-black font-medium">
                  Find Talents
                </a>
                <a href="#" className="text-black font-medium">
                  About us
                </a>
                <a href="#" className="text-black font-medium">
                  Testimonials
                </a>
              </nav>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold shadow-md whitespace-nowrap"
              >
                Create Jobs
              </button>
            </div>
          </div>
        </header>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[rgba(60,60,60,0.5)] z-20 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-3xl h-full sm:h-[80%] shadow-lg relative overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              {editJobId ? "Edit Job" : "Create Job"}
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-xl"
            >
              &times;
            </button>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="flex flex-col">
                <label htmlFor="title" className="mb-1 font-medium">
                  Job Title
                </label>
                <input
                  id="title"
                  {...register("title", { required: "Job title is required" })}
                  placeholder="Job Title"
                  className="border p-2 rounded-lg w-full"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="company" className="mb-1 font-medium">
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
                <label htmlFor="location" className="mb-1 font-medium">
                  Location
                </label>
                <input
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="Choose Prefered Location"
                  className="border p-2 rounded-lg w-full"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="jobType" className="mb-1 font-medium">
                  Job Type
                </label>
                <select
                  id="jobType"
                  {...register("jobType", { required: "Job type is required" })}
                  className="border p-2 rounded-lg w-full"
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
              <div className="flex flex-col sm:w-[99%]">
                <label htmlFor="salaryRange" className="mb-1 font-medium">
                  Salary Range
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1 flex items-center border rounded-lg p-2">
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

              <div className="flex flex-col sm:col-span-1">
                <label
                  htmlFor="applicationDeadline"
                  className="mb-1 font-medium"
                >
                  Application Deadline
                </label>
                <input
                  id="applicationDeadline"
                  type="date"
                  {...register("applicationDeadline", {
                    required: "Deadline is required",
                  })}
                  className="border p-2 rounded-lg w-full"
                />
                {errors.applicationDeadline && (
                  <p className="text-red-500 text-sm">
                    {errors.applicationDeadline.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="description" className="mb-1 font-medium">
                  Job Description
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Please share a description to let the candidate know more about the job role"
                  className="border p-2 rounded-lg w-full"
                  rows="6"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 flex justify-between mt-4">
                <button
                  type="button"
                  className="border border-gray-400 text-gray-700 p-2 rounded-lg px-6"
                  onClick={() => console.log("Draft saved")}
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg px-8"
                >
                  {editJobId ? "Update" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-21 bg-white shadow-md p-6 rounded-lg flex flex-col sm:flex-row justify-between items-center w-full mx-auto gap-3 sm:gap-3 min-h-[120px]">
        <div className="flex items-center space-x-2 border-b sm:border-r sm:border-b-0 sm:pr-3 w-full sm:w-auto">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            className="border-none outline-none p-2 w-full"
          />
        </div>

        <div className="flex items-center space-x-2 border-b sm:border-r sm:border-b-0 sm:pr-3 cursor-pointer w-full sm:w-auto">
          <FaMapMarkerAlt className="text-gray-500" />
          <span className="text-gray-700">Preferred Location</span>
        </div>

        <div className="flex items-center space-x-2 border-b sm:border-r sm:border-b-0 sm:pr-3 cursor-pointer w-full sm:w-auto">
          <FaUsers className="text-gray-500" />
          <span className="text-gray-700">Job Type</span>
        </div>

        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-700 font-medium">Salary Per Month</span>
            <span className="text-gray-700 text-sm">₹50k - ₹80k</span>
          </div>
          <div className="w-full sm:w-64">
            <Slider
              defaultValue={[50, 80]}
              aria-label="Salary Range"
              valueLabelDisplay="auto"
              min={15}
              max={200}
              sx={{ color: "black" }}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1400px] gap-5 w-full max-w-7xl mx-auto">
        {allJobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-md border border-blue-300"
          >
            <div className="flex items-center justify-between">
              <img
                src={job.logo || homeImage}
                alt={job.company || "Company"}
                className="w-14 h-14 object-contain"
              />
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md text-xs">
                {job.applicationDeadline
                  ? new Date(job.applicationDeadline).toLocaleDateString()
                  : "24h Ago"}
              </span>
            </div>
            <h2 className="mt-3 font-semibold text-lg">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2 text-gray-600 text-sm mt-1">
              <FaUsers />
              <span>{job.company}</span>
              <FaMapMarkerAlt />
              <span>{job.location}</span>
              <FaBriefcase />
              <span>{job.salaryRange || job.salary}</span>
            </div>

            {job.description ? (
              <p className="text-sm text-gray-600 mt-2">{job.description}</p>
            ) : (
              <>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-bold text-2xl mr-2">.</span>A
                  user-friendly interface lets you browse stunning photos and
                  videos...
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-2xl mr-2">.</span>Filter
                  destinations based on interests and travel style, and create
                  personalized
                </p>
              </>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(job)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <FaEdit />
                Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <FaTrash />
                Delete
              </button>
            </div>

            <button className="w-full bg-sky-500 text-white mt-4 py-2 rounded-md">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;
