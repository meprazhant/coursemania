"use client";
import React from "react";

function ErMeeting({ live, meetLink, isTeacher, setActive }) {
  return (
    <div>
      {live ? (
        <div className="flex h-[80vh] justify-center items-center flex-col gap-5">
          <h2 className="text-2xl font-semibold">
            Meeting is live. Click the link below to join.
          </h2>
          <a
            href={meetLink}
            target="_blank"
            className="text-blue-500 underline"
          >
            {meetLink}
          </a>

          {isTeacher && (
            <button
              onClick={() => setActive("edit")}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Edit Meeting
            </button>
          )}
        </div>
      ) : (
        <div className="h-[70vh] justify-center items-center flex flex-col">
          <h2 className="text-2xl font-semibold">Meeting</h2>
          <p>There is no meeting scheduled for this course.</p>
          {isTeacher && (
            <button
              onClick={() => setActive("edit")}
              className="bg-blue-500 text-white p-2 rounded-md mt-4"
            >
              Schedule a Meeting
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ErMeeting;
