import React, { useState } from "react";
import { FaUsers, FaMapMarkerAlt, FaBriefcase, FaSearch } from "react-icons/fa";
import { Slider } from "@mui/material";
import homeImage from "./assets/home.png";
import amazonImage from "./assets/amazon.png";
import teslaImage from "./assets/tesla.png";
import swiggyImage from "./assets/swiggy.png";
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
  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-5">
      <div className="w-full">
        <header className="bg-white shadow-md rounded-full p-3 flex justify-between items-center px-4 sm:px-6 w-full sm:w-[90%] lg:w-[50%] mx-auto fixed top-5 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-4 sm:space-x-10 items-center overflow-x-auto">
            <img src={homeImage} alt="Logo" className="w-8 h-8 flex-shrink-0" />
            <nav className="flex space-x-6 text-sm sm:space-x-8 sm:text-base">
              <a href="#" className="text-black font-medium whitespace-nowrap">
                Home
              </a>
              <a href="#" className="text-black font-medium whitespace-nowrap">
                Find Jobs
              </a>
              <a href="#" className="text-black font-medium whitespace-nowrap">
                Find Talents
              </a>
              <a href="#" className="text-black font-medium whitespace-nowrap">
                About us
              </a>
              <a href="#" className="text-black font-medium whitespace-nowrap">
                Testimonials
              </a>
            </nav>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold shadow-md ml-4"
          >
            Create Jobs
          </button>
        </header>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[rgba(60,60,60,0.5)] z-20 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-2xl h-[90%] sm:h-[70%] shadow-lg relative overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Create Job Opening
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-xl"
            >
              &times;
            </button>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="jobTitle" className="mb-1 font-medium">
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  type="text"
                  placeholder="Job Title"
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="companyName" className="mb-1 font-medium">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Company Name"
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="location" className="mb-1 font-medium">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Choose Prefered Location"
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="jobType" className="mb-1 font-medium">
                  Job Type
                </label>
                <select id="jobType" className="border p-2 rounded-lg w-full">
                  <option>Full Time</option>
                  <option>Internship</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="salaryRange" className="mb-1 font-medium">
                  Salary Range
                </label>
                <div className="flex gap-4">
                  <div className="relative w-full">
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                      <button
                        type="button"
                        className="text-gray-500 text-xs leading-none"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        className="text-gray-500 text-xs leading-none"
                      >
                        ▼
                      </button>
                    </div>

                    <input
                      id="minSalary"
                      type="number"
                      placeholder="0"
                      className="border p-2 rounded-lg w-full  pr-20 text-gray-700 text-right"
                    />
                  </div>

                  <div className="relative w-full">
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                      <button
                        type="button"
                        className="text-gray-500 text-xs leading-none"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        className="text-gray-500 text-xs leading-none"
                      >
                        ▼
                      </button>
                    </div>

                    <input
                      id="maxSalary"
                      type="number"
                      placeholder="12,00,000"
                      className="border p-2 rounded-lg w-full pl-10 pr-4 text-gray-700 text-right"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="applicationDeadline"
                  className="mb-1 font-medium"
                >
                  Application Deadline
                </label>
                <input
                  id="applicationDeadline"
                  type="date"
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label htmlFor="jobDescription" className="mb-1 font-medium">
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  placeholder="Please share a description to let the candidate know more about the job role"
                  className="border p-2 rounded-lg w-full"
                  rows="6"
                ></textarea>
              </div>

              <div className="col-span-2 flex justify-between mt-2">
                <button type="button" className="border p-2 rounded-lg px-6">
                  Save Draft &#9660;
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg px-8"
                >
                  Publish &raquo;
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
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-md border border-blue-300"
          >
            <div className="flex items-center justify-between">
              <img
                src={job.logo}
                alt={job.company}
                className="w-14 h-14 object-contain"
              />
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md text-xs">
                24h Ago
              </span>
            </div>
            <h2 className="mt-3 font-semibold text-lg">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2 text-gray-600 text-sm mt-1">
              <FaUsers />
              <span>{job.experience}</span>
              <FaMapMarkerAlt />
              <span>{job.location}</span>
              <FaBriefcase />
              <span>{job.salary}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-bold text-2xl mr-2">.</span>A user-friendly
              interface lets you browse stunning photos and videos...
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-2xl mr-2">.</span>Filter
              destinations based on interests and travel style, and create
              personalized
            </p>
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
