import React from "react";
import {
  AiOutlineBook,
  AiOutlineCodepenCircle,
  AiOutlineDashboard,
  AiOutlinePaperClip,
  AiOutlineProfile,
  AiOutlineSetting,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { SiGooglemeet } from "react-icons/si";

const activeClass =
  "flex items-center flex-shrink-0 px-5 py-3 space-x-2  rounded-t-lg border-gray-600 text-gray-900 bg-white hover:bg-gray-700 hover:text-gray-100 cursor-pointer";
const normalClass =
  "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-gray-600 text-gray-600 hover:bg-gray-200 hover:bg-gray-700 hover:text-gray-100 rounded-t-lg cursor-pointer";

function ErTabs({ setActiveTab, activeTab, teacher }) {
  return (
    <div className="flex items-center border-b overflow-x-auto overflow-y-hidden  flex-nowrap bg-gray-100 text-gray-800 w-full">
      <div
        onClick={() => {
          setActiveTab("meeting");
        }}
        className={activeTab === "meeting" ? activeClass : normalClass}
      >
        <SiGooglemeet className="w-4 h-4" />
        <span>Meeting</span>
      </div>
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
          setActiveTab("info");
        }}
        className={activeTab === "info" ? activeClass : normalClass}
      >
        <AiOutlineBook className="w-4 h-4" />
        <span>Course Info</span>
      </div>

      {teacher && (
        <div
          onClick={() => {
            setActiveTab("edit");
          }}
          className={activeTab === "edit" ? activeClass : normalClass}
        >
          <AiOutlineCodepenCircle className="w-4 h-4" />
          <span>Edit Course</span>
        </div>
      )}

      {teacher && (
        <div
          onClick={() => {
            setActiveTab("members");
          }}
          className={activeTab === "members" ? activeClass : normalClass}
        >
          <AiOutlineUsergroupAdd className="w-4 h-4" />
          <span>Members</span>
        </div>
      )}
    </div>
  );
}

export default ErTabs;
