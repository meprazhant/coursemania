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
  "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-b-black rounded-t-lg dark:border-gray-600 dark:text-gray-900";
const normalClass =
  "flex items-center flex-shrink-0 px-5 py-3 space-x-2 dark:border-gray-600 dark:text-gray-600";

function MStab() {
  return (
    <div className="flex items-center border-b overflow-x-auto overflow-y-hidden  flex-nowrap dark:bg-gray-100 dark:text-gray-800 w-full">
      <Link rel="noopener noreferrer" href="#" className={activeClass}>
        <AiOutlinePaperClip />
        <span>Notice Board</span>
      </Link>
      <a rel="noopener noreferrer" href="#" className={normalClass}>
        <AiOutlineBook className="w-4 h-4" />
        <span>Enrolled Courses</span>
      </a>
      <a rel="noopener noreferrer" href="#" className={normalClass}>
        <AiOutlineProfile className="w-4 h-4" />
        <span>Profile</span>
      </a>
    </div>
  );
}

export default MStab;
