"use client";
import React from "react";
import ErTabs from "./ErTabs";
import ErEditCourse from "./ErEditCourse";
import ErCourseInfo from "./ErCourseInfo";
import ErMembers from "./ErMembers";
import ErMeeting from "./ErMeeting";

function MainPage({ data }) {
  const [activeTab, setActiveTab] = React.useState("meeting");
  return (
    <div>
      <ErTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        teacher={data?.isTeacher}
      />
      {activeTab === "edit" && <ErEditCourse course={data?.course} />}
      {activeTab === "info" && <ErCourseInfo course={data?.course} />}
      {activeTab === "members" && <ErMembers courseId={data?.course._id} />}
      {activeTab === "meeting" && (
        <ErMeeting
          live={data?.course?.isLive}
          isTeacher={data?.isTeacher}
          setActive={setActiveTab}
          meetLink={data?.course?.meetLink}
        />
      )}
    </div>
  );
}

export default MainPage;
