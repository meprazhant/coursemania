import Link from "next/link";
import React from "react";
import {
  AiOutlineBook,
  AiOutlineDashboard,
  AiOutlinePaperClip,
  AiOutlineProfile,
  AiOutlineSetting,
} from "react-icons/ai";

const activeClass =
  "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-b-black rounded-t-lg dark:border-gray-600 dark:text-gray-900 dark:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100 cursor-pointer";
const normalClass =
  "flex items-center flex-shrink-0 px-5 py-3 space-x-2 dark:border-gray-600 dark:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100 rounded-t-lg cursor-pointer";

function MStab({ setActiveTab, activeTab }) {
  return (
    <div className="flex items-center border-b overflow-x-auto overflow-y-hidden  flex-nowrap dark:bg-gray-100 dark:text-gray-800 w-full">
      <div
        onClick={() => {
          setActiveTab("notice");
        }}
        className={activeTab === "notice" ? activeClass : normalClass}
      >
        <AiOutlinePaperClip />
        <span>Notice Board</span>
      </div>
      <div
        onClick={() => {
          setActiveTab("enrolled");
        }}
        className={activeTab === "enrolled" ? activeClass : normalClass}
      >
        <AiOutlineBook className="w-4 h-4" />
        <span>Enrolled Courses</span>
      </div>
      <div
        onClick={() => {
          setActiveTab("profile");
        }}
        className={activeTab === "profile" ? activeClass : normalClass}
      >
        <AiOutlineProfile className="w-4 h-4" />
        <span>Profile</span>
      </div>
    </div>
  );
}

export default MStab;
